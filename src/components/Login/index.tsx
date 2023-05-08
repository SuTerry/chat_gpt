import React, { useState, useEffect, useContext } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

import { useSnackbar } from 'notistack'

import { userApi } from '@/api'

import context from '@/context'

export default (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar()

  const { user, setLoginOpen, setUser, setRegisterOpen } = useContext(context)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  useEffect(() => {
    setEmail('')
    setPassword('')

    setEmailError(false)
    setPasswordError(false)
  }, [user.dialog])

  const handleClose = () => setLoginOpen(false)

  const handleRegister = () => {
    handleClose()
    setRegisterOpen(true)
  }

  const handleSubmit = () => {
    if (!email || !password) {
      if (!email) setEmailError(true)
      if (!password) setPasswordError(true)
      return
    }

    userApi.login({ email, password }).then((res) => {
      enqueueSnackbar(res.message, { variant: 'success' })
      const {username, userid} = res.data
      setUser({
        userid,
        username,
        login: true,
        dialog: false,
      })
    }).catch((err)=> {
      enqueueSnackbar(err, { variant: 'error' })
    })
  }

  return (
    <Dialog fullWidth open={user.dialog} onClose={handleClose}>
      <DialogTitle>请先登录您的账户</DialogTitle>
      <DialogContent>
        <TextField
          error={emailError}
          sx={{ mb: 4 }}
          autoFocus
          margin="dense"
          id="email"
          label="邮箱"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => { setEmail(e.target.value), setEmailError(false) }}
          helperText={emailError ? "请输入邮箱" : ""}
        />
        <TextField
          error={passwordError}
          margin="dense"
          id="password"
          label="密码"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => { setPassword(e.target.value), setPasswordError(false) }}
          helperText={passwordError ? "请输入密码" : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button sx={{ mr: 'auto', ml: 1.5 }} onClick={handleRegister}>注册账户</Button>
        <Button onClick={handleClose}>取消</Button>
        <Button onClick={handleSubmit}>登录</Button>
      </DialogActions>
    </Dialog>
  )
}
