import React, { useContext, useRef, useEffect } from 'react'

import { Checkbox } from '@mui/material'

import context from '@/context'

import './index.less'

export default (): JSX.Element => {
  const { historyMessages, select, setSelect } = useContext(context)

  const ChatListRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    window.hljs.highlightAll()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      ChatListRef.current?.scrollTo({ top: ChatListRef.current.scrollHeight, behavior: "smooth" })
    })
  }, [historyMessages])

  const handleCheck = (index: number) => {
    const i = select.indexOf(index)
    if (i > -1) {
      const _select = [...select]
      _select.splice(i, 1)
      setSelect([..._select])
    } else {
      setSelect([...select, index])
    }
  }

  return (
    <ul className='chat_list' ref={ChatListRef}>
      {
        historyMessages.map(({ role, content, time }, index) => {
          const classname = role === 'assistant' ? 'assistant' : ''
          return (
            <li key={time} className={classname}>
              <div className='chat_list_box' >
                <Checkbox className='chat_list_check' sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} onClick={() => handleCheck(index)} />
                <div dangerouslySetInnerHTML={{ __html: window.marked.parse(content) }}></div>
              </div>
            </li>
          )
        })
      }
      <li className='chat_list_stack'></li>
    </ul>
  )
}