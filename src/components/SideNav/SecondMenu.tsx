import React, { useState, useContext } from 'react'


import { Popper, Fade, Paper, Box, List, ListItem, ListItemText, ListItemButton, Divider, Typography } from '@mui/material'

import context from '@/context'

import CleanDialog from './Dialog'


interface SecondMenuItem {
  name: string
  topic: string
  children?: SecondMenuItem[]
}


export type SecondMenuData = SecondMenuItem[]

interface SecondMenuProps {
  anchorEl: HTMLElement | null
  nodes: SecondMenuData
  handleClose: () => void
  clearInterval: () => void
}


export default ({ anchorEl, handleClose, clearInterval, nodes }: SecondMenuProps): JSX.Element => {
  const { setHistoryMessages, gptParams, setGptParams } = useContext(context)

  const [cleanDialog, setCleanDialog] = useState(false)
  const [topicid, setTopicid] = useState('')

  const open = Boolean(anchorEl)

  const handleSure = () => {
    setCleanDialog(false)
    setHistoryMessages([])
    setGptParams({ ...gptParams, topicid })
  }

  const handleTopic = ({ topic }: SecondMenuItem) => {
    setCleanDialog(true)
    setTopicid(topic)
  }

  return (
    <>
      <Popper
        placement="right-start"
        transition
        anchorEl={anchorEl}
        open={open}
        onMouseEnter={clearInterval}
        onMouseLeave={handleClose}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              {
                nodes.map(({ name, children }, index) => {
                  return (
                    <Box
                      key={name}
                      sx={{
                        width: 200,
                        backgroundColor: '#f7f7f8',
                      }}
                    >
                      <List component="nav">
                        <ListItem>
                          <ListItemText>
                            <Typography sx={{
                              fontWeight: 700,
                              fontSize: 18,
                              ml: 2,
                            }}>
                              • {name}
                            </Typography>
                          </ListItemText>
                        </ListItem>
                        {
                          children?.map((item) => {
                            return (
                              <ListItemButton key={item.name} onClick={() => handleTopic(item)}>
                                <Typography sx={{ ml: 3.4 }}>{item.name}</Typography>
                              </ListItemButton>
                            )
                          })
                        }
                      </List>
                      {index < (nodes.length - 1) && <Divider />}
                    </Box>
                  )
                })
              }
            </Paper>
          </Fade>
        )}
      </Popper>
      <CleanDialog open={cleanDialog} close={() => setCleanDialog(false)} sure={handleSure} />
    </>
  )
}
