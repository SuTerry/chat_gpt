import React, { useState, useRef } from 'react'

import { ListItem, ListItemIcon, ListItemText } from '@mui/material'

import SecondMenu from './SecondMenu'

import TranslateIcon from '@mui/icons-material/Translate'
import TerminalIcon from '@mui/icons-material/Terminal'
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt'
import ChatIcon from '@mui/icons-material/Chat'

import type { SecondMenuData } from './SecondMenu'

const item = {
  px: 3,
  color: 'rgba(255, 255, 255, 1)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  cursor: 'pointer',
}

const list = [
  {
    name: '通用',
    Icon: ChatIcon,
    children: [
      {
        name: '默认',
        topic: '',
        children: [
          {
            name: '通用',
            topic: 'default',
          },
        ],
      },
    ],
  },
  {
    name: '教育',
    Icon: TranslateIcon,
    children: [
      {
        name: '英语助手',
        topic: '',
        children: [
          {
            name: '翻译',
            topic: '1-01-01',
          },
          {
            name: '改写',
            topic: '1-01-02',
          },
        ],
      },
      {
        name: '中文助手',
        topic: '',
        children: [
          {
            name: '翻译',
            topic: '1-02-01',
          },
          {
            name: '改写',
            topic: '1-02-02',
          },
        ],
      },
    ],
  },
  {
    name: '编程',
    Icon: TerminalIcon,
    children: [
      {
        name: '通用',
        topic: '',
        children: [
          {
            name: '代码审查',
            topic: '2-01-01',
          },
        ],
      },
      {
        name: '服务端开发',
        topic: '',
        children: [
          {
            name: '代码提示',
            topic: '2-02-01',
          },
        ],
      },
      {
        name: '前端开发',
        topic: '',
        children: [
          {
            name: '代码提示',
            topic: '2-03-01',
          },
        ],
      },
      {
        name: '移动端开发',
        topic: '',
        children: [
          {
            name: '代码提示',
            topic: '2-04-01',
          },
        ],
      },
      {
        name: '算法',
        topic: '',
        children: [
          {
            name: '代码提示',
            topic: '2-05-01',
          },
        ],
      },
    ],
  },
  {
    name: '内容',
    Icon: PsychologyAltIcon,
    children: [],
  },
]

export default (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [currentList, setCurrentList] = useState<SecondMenuData>([])

  const interval = useRef<NodeJS.Timeout | null>(null)

  const handleClose = () => {
    interval.current = setTimeout(() => {
      setAnchorEl(null)
      setCurrentList([])
    }, 100)
  }

  const handleEnter = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    childern: SecondMenuData
  ) => {
    if (interval.current) clearTimeout(interval.current)
    if (e.currentTarget !== anchorEl) setAnchorEl(null)
    setAnchorEl(e.currentTarget)
    setCurrentList(childern)
  }

  const clearInterval = () => interval.current && clearTimeout(interval.current)

  return (
    <>
      {list.map(({ Icon, name, children }, index) => (
        <ListItem
          key={index}
          onMouseEnter={(e) => handleEnter(e, children)}
          onMouseLeave={handleClose}
          sx={{ ...item }}
        >
          <ListItemIcon>
            <Icon style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      ))}
      <SecondMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        clearInterval={clearInterval}
        nodes={currentList}
      />
    </>
  )
}
