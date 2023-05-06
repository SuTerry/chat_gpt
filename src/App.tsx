
import React, { useState, useRef } from 'react'
import { CssBaseline, Box, IconButton } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import { SnackbarProvider } from 'notistack'

import theme from '@/theme'

import Context, { GptParams, initGptParams } from '@/context'

import useUser from '@/hooks/useUser'
import useHistory from '@/hooks/useHistory'

import Header from '@/components/Header'
import SideNav from '@/components/SideNav'
import Chat from '@/components/Chat'
import Login from '@/components/Login'
import Register from '@/components/Register'

import CloseIcon from '@mui/icons-material/Close'

export default (): JSX.Element => {
  // 侧导航开启状态
  const [openSideNav, setOpenSideNav] = useState(true)
  // 用户状态
  const [user, setUser, setLoginOpen, signOut] = useUser()
  // 注册弹窗
  const [registerOpen, setRegisterOpen] = useState(false)
  // 吐丝实例
  const snackbarRef = useRef<SnackbarProvider>(null)
  // 问答内容
  const [historyMessages, setHistoryMessages] = useHistory()
  // gpt请求参数
  const [gptParams, setGptParams] = useState<GptParams>(initGptParams)
  // 选中内容
  const [select, setSelect] = useState<number[]>([])

  return (
    <Context.Provider value={{
      openSideNav,
      setOpenSideNav,
      user,
      setUser,
      setLoginOpen,
      signOut,
      historyMessages,
      setHistoryMessages,
      gptParams,
      setGptParams,
      select,
      setSelect,
      registerOpen,
      setRegisterOpen,
    }}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          ref={snackbarRef}
          maxSnack={3}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          preventDuplicate={true}
          autoHideDuration={2000}
          action={(snackbarId) => (
            <IconButton color="inherit" onClick={() => snackbarRef.current?.closeSnackbar(snackbarId)}>
              <CloseIcon />
            </IconButton>
          )} >
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header />
            <SideNav />
            <Chat />
          </Box>
          <Login />
          <Register />
        </SnackbarProvider>
      </ThemeProvider>
    </Context.Provider>
  )
}
