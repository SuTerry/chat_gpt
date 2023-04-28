
import React, { useState } from 'react'

import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import SecondMenu from './SecondMenu'

import TranslateIcon from '@mui/icons-material/Translate'
import TerminalIcon from '@mui/icons-material/Terminal'
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt'


const item = {
  px: 3,
  color: 'rgba(255, 255, 255, 1)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
}

const list = [
  {
    name: '教育',
    Icon: TranslateIcon,
  },
  {
    name: '编程',
    Icon: TerminalIcon,
  },
  {
    name: '内容',
    Icon: PsychologyAltIcon,
  },
]


export default (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClose = () => setAnchorEl(null)

  return (
    <>
      {
        list.map(({ Icon, name }, index) => (
          <ListItemButton
            key={index}
            onMouseEnter={(e) => {
              if (e.currentTarget !== anchorEl) setAnchorEl(null)
              setAnchorEl(e.currentTarget)
            }}
            onMouseLeave={handleClose}
            sx={{ ...item }}
          >
            <ListItemIcon>
              <Icon style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
        ))
      }
      <SecondMenu anchorEl={anchorEl} handleClose={handleClose} />
    </>
  )
}