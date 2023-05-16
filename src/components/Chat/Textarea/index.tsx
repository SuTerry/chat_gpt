import React, { useState, useContext, useRef, useEffect } from 'react'

import {
  TextareaAutosize,
  IconButton,
  CircularProgress,
  Chip,
  Typography,
} from '@mui/material'

import { useSnackbar } from 'notistack'

import { commonApi } from '@/api'

import context, { HistoryMessage } from '@/context'

import DeleteDialog from './Dialog'

import SendIcon from '@mui/icons-material/Send'
import DoneIcon from '@mui/icons-material/Done'
import DeleteIcon from '@mui/icons-material/Delete'

import './index.less'

export default (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar()

  const {
    user,
    setLoginOpen,
    historyMessages,
    setHistoryMessages,
    gptParams,
    select,
    setSelect,
  } = useContext(context)

  const [message, setMessage] = useState('')

  const [loading, setLoading] = useState(false)

  const [history, setHistory] = useState(true)

  const [deleteDialog, setDeleteDialog] = useState(false)

  const openaiController = useRef<AbortController>()

  useEffect(() => {
    document.addEventListener('keydown', keydown)
    return () => document.removeEventListener('keydown', keydown)
  }, [message])

  const keydown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.keyCode === 13) {
      // ctrl + return 手动触发发送
      handleSend()
      event.preventDefault()
    }
  }

  const handleSend = () => {
    if (loading) return
    if (!message)
      return enqueueSnackbar('请输入要发送的消息!', { variant: 'warning' })
    if (!user.login) return setLoginOpen(true)

    setLoading(true)

    const messageUser: HistoryMessage = {
      role: 'user',
      content: message,
      time: new Date().getTime(),
    }

    const messages = []

    setHistoryMessages([...historyMessages, messageUser])
    setMessage('')

    if (history) {
      const arr = historyMessages
        .map(({ role, content }) => ({ role, content }))
      messages.push(...arr.slice(-6))
    }

    openaiController.current = new AbortController()

    commonApi
      .openai({
        userid: user.userid,
        messages: [...messages, { role: 'user', content: message }],
        ...gptParams,
      }, openaiController.current.signal)
      .then(async (res) => {
        const reader = res.getReader()
        const messagesAssistant: HistoryMessage = {
          role: 'assistant',
          content: '',
          time: new Date().getTime(),
        }
        let done = false
        let content = ''
        setHistoryMessages([...historyMessages, messageUser, messagesAssistant])

        while (!done) {
          const { value, done: readerDone } = await reader.read()

          if (value) {
            content += value
            setHistoryMessages([
              ...historyMessages,
              messageUser,
              { ...messagesAssistant, content },
            ])
          }
          done = readerDone
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleHisory = () => {
    if (history) {
      enqueueSnackbar('当前模式下，发送消息不会携带之前的聊天记录')
    } else {
      enqueueSnackbar('当前模式下，发送消息会携带之前的三条聊天记录')
    }
    setHistory(!history)
  }

  const handleDelete = () => {
    if (select.length === 0)
      return enqueueSnackbar('请勾选要删除的数据', { variant: 'warning' })
    setDeleteDialog(true)
  }

  const handleAbort = () => {
    openaiController.current?.abort()
  }

  const deleteChat = () => {
    const _historyMessages = [...historyMessages]

    select
      .sort((a, b) => b - a)
      .forEach((index) => {
        _historyMessages.splice(index, 1)
      })

    setHistoryMessages(_historyMessages)
    setSelect([])
    setDeleteDialog(false)
  }

  return (
    <div className="chat_textarea">
      <Chip
        className="chat_textarea_hisory"
        variant={history ? 'filled' : 'outlined'}
        label="携带历史"
        color="primary"
        size="small"
        deleteIcon={<DoneIcon />}
        onDelete={history ? handleHisory : undefined}
        onClick={handleHisory}
      />
      {
        loading && <Chip
          className="chat_textarea_abort"
          variant="filled"
          label="终止"
          color="primary"
          size="small"
          onDelete={handleAbort}
          onClick={handleAbort}
        />
      }
      {/* <Button variant="outlined" size='small' className='chat_textarea_abort'>终止</Button> */}
      <IconButton
        className="chat_textarea_delete"
        aria-label="delete"
        color="error"
        onClick={handleDelete}
      >
        <DeleteIcon />
      </IconButton>
      <TextareaAutosize
        maxRows="5"
        className="textarea"
        maxLength={300}
        placeholder="ctrl+enter发送消息"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <IconButton
        aria-label="delete"
        className="icon_btn"
        onClick={handleSend}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : <SendIcon />}
      </IconButton>
      <Typography
        component="p"
        sx={{
          color: '#fff',
          position: 'absolute',
          bottom: -30,
          fontSize: 14
        }}
      >
        此产品基于OpenAI开发，OpenAI可能会回复不准确的信息，请注意甄别
      </Typography>
      {/* <Stack className="chat_textarea_links" direction="row" spacing={2}>
        <Link
          target="_blank_privacypolicy"
          href="https://kuainsight.com/privacypolicy.html"
        >
          隐私政策
        </Link>
        <Link
          target="_blank_userterms"
          href="https://kuainsight.com/userterms.html"
        >
          用户协议
        </Link>
      </Stack> */}
      <Typography component="p" className="chat_textarea_links">contact@kuainsight.com</Typography>
      <DeleteDialog
        open={deleteDialog}
        close={() => setDeleteDialog(false)}
        sure={deleteChat}
      />
    </div>
  )
}
