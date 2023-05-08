import React, { useState, useContext, useEffect } from 'react'

import { TextareaAutosize, IconButton, CircularProgress, Chip, Link, Stack } from '@mui/material'

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

  const { user, setLoginOpen, historyMessages, setHistoryMessages, gptParams, select, setSelect } = useContext(context)

  const [message, setMessage] = useState('')

  const [loading, setLoading] = useState(false)

  const [history, setHistory] = useState(true)

  const [deleteDialog, setDeleteDialog] = useState(false)

  useEffect(() => {
    document.addEventListener("keydown", keydown)
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
    if (!message) return enqueueSnackbar('请输入要发送的消息!', { variant: 'warning' })
    if (!user.login) return setLoginOpen(true)

    setLoading(true)

    const messageUser: HistoryMessage = { role: 'user', content: message, time: new Date().getTime() }

    const messages = []

    setHistoryMessages([...historyMessages, messageUser])
    setMessage('')

    if (history) {
      const arr = historyMessages.filter(item => item.role === 'user').map(({ role, content }) => ({ role, content }))
      messages.push(...arr.slice(-3))
    }

    commonApi.chat({
      userid: user.userid,
      messages: [...messages, { role: 'user', content: message }],
      model: gptParams.model,
    }).then(async res => {
      const reader = res.getReader()
      const messagesAssistant: HistoryMessage = { role: 'assistant', content: '', time: new Date().getTime() }
      let done = false
      let content = ''
      setHistoryMessages([...historyMessages, messageUser, messagesAssistant])

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        if (value) {
          content += value
          setHistoryMessages([...historyMessages, messageUser, { ...messagesAssistant, content }])
        }
        done = readerDone
      }
    }).finally(() => {
      setLoading(false)
      window.hljs.highlightAll()
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
    if (select.length === 0) enqueueSnackbar('请勾选要删除的数据', { variant: 'warning' })
    setDeleteDialog(true)
  }

  const deleteChat = () => {
    const _historyMessages = [...historyMessages]
    select.reverse().forEach((index) => {
      _historyMessages.splice(index, 1)
    })
    setHistoryMessages(_historyMessages)
    setSelect([])
    setDeleteDialog(false)
  }

  return (
    <div className='chat_textarea'>
      <Chip
        className='chat_textarea_hisory'
        variant={history ? 'filled' : 'outlined'}
        label="携带历史"
        color="primary"
        size="small"
        deleteIcon={<DoneIcon />}
        onDelete={history ? handleHisory : undefined}
        onClick={handleHisory}
      />
      <IconButton className='chat_textarea_delete' aria-label="delete" color="error" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
      <TextareaAutosize maxRows='5' className='textarea' maxLength={300} placeholder='发送消息给 AI，ctrl+enter发送消息' value={message} onChange={(e) => setMessage(e.target.value)} />
      <IconButton aria-label="delete" className='icon_btn' onClick={handleSend} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : <SendIcon />}
      </IconButton>
      <Stack className='chat_textarea_links' direction="row" spacing={2}>
        <Link href='#'>隐私政策</Link>
        <Link href='#'>用户协议</Link>
      </Stack>
      <DeleteDialog open={deleteDialog} close={() => setDeleteDialog(false)} sure={deleteChat} />
    </div>
  )
}