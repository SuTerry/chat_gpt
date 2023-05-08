import React, { useState, useEffect, useContext } from 'react'

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material'

import { useSnackbar } from 'notistack'

import { userApi } from '@/api'

import context from '@/context'

const sendVerifycode = '发送验证码'
const timering = '后再次发送'
const timerNum = 60

export default (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar()

  const { registerOpen, setRegisterOpen, setLoginOpen } = useContext(context)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [verifycode, setVerifycode] = useState('')

  const [usernameError, setUsernameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordAgainError, setPasswordAgainError] = useState(false)
  const [verifycodeError, setVerifycodeError] = useState(false)

  const [timer, setTimer] = useState(timerNum)
  const [verifycodeText, setVerifycodeText] = useState(sendVerifycode)

  useEffect(() => {
    setUsername('')
    setEmail('')
    setPassword('')
    setPasswordAgain('')
    setVerifycode('')

    setUsernameError(false)
    setEmailError(false)
    setPasswordError(false)
    setPasswordAgainError(false)
    setVerifycodeError(false)
  }, [registerOpen])

  useEffect(() => {
    if (timer === timerNum) return
    setVerifycodeText(timer + timering)
    if (timer === 0)
      return setTimer(timerNum), setVerifycodeText(sendVerifycode)
    setTimeout(() => {
      setTimer(timer - 1)
    }, 1000)
  }, [timer])

  const handleClose = () => setRegisterOpen(false)

  const handleLogin = () => {
    handleClose()
    setLoginOpen(true)
  }

  const handleVerifycode = () => {
    if (!email) return setEmailError(true)

    userApi
      .verifyemail({ email })
      .then((res) => {
        enqueueSnackbar(res.message, { variant: 'success' })
        setTimer(59)
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const handleSubmit = () => {
    if (!username || !email || !password || !passwordAgain || !verifycode) {
      if (!username) setUsernameError(true)
      if (!email) setPasswordError(true)
      if (!password) setPasswordError(true)
      if (!passwordAgain) setPasswordAgainError(true)
      if (!verifycode) setVerifycodeError(true)
      return
    }

    if (username.length < 2 || username.length > 33)
      return enqueueSnackbar('用户名需要大于2位小于33位!', {
        variant: 'warning',
      })
    if (password.length < 7 || password.length > 65)
      return enqueueSnackbar('密码需要大于7位小于65位!', { variant: 'warning' })
    if (password !== passwordAgain)
      return enqueueSnackbar('两次密码不一致!', { variant: 'warning' })

    userApi.register({ email, username, password, verifycode }).then((res) => {
      enqueueSnackbar(res.message, { variant: 'success' })
      handleLogin()
    }).catch((err) => {
      enqueueSnackbar(err, { variant: 'error' })
    })
  }

  return (
    <Dialog fullWidth open={registerOpen} onClose={handleClose}>
      <DialogTitle>请您注册的账户</DialogTitle>
      <DialogContent>
        <TextField
          error={emailError}
          sx={{ mb: 2 }}
          autoFocus
          margin="dense"
          id="email"
          label="邮箱"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value), setEmailError(false)
          }}
          helperText={emailError ? '请输入邮箱' : ''}
        />
        <TextField
          error={usernameError}
          sx={{ mb: 2 }}
          margin="dense"
          id="username"
          label="用户名"
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value), setUsernameError(false)
          }}
          helperText={usernameError ? '请输入用户名' : ''}
        />
        <TextField
          error={passwordError}
          sx={{ mb: 2 }}
          margin="dense"
          id="password"
          label="密码"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value), setPasswordError(false)
          }}
          helperText={passwordError ? '请输入密码' : ''}
        />
        <TextField
          error={passwordAgainError}
          sx={{ mb: 2 }}
          margin="dense"
          id="passwordAgain"
          label="确认密码"
          type="password"
          fullWidth
          variant="outlined"
          value={passwordAgain}
          onChange={(e) => {
            setPasswordAgain(e.target.value), setPasswordAgainError(false)
          }}
          helperText={passwordAgainError ? '请输再次输入密码' : ''}
        />
        <Stack direction="row">
          <TextField
            error={verifycodeError}
            margin="dense"
            id="code"
            label="邮箱验证码"
            fullWidth
            variant="outlined"
            value={verifycode}
            onChange={(e) => {
              setVerifycode(e.target.value), setVerifycodeError(false)
            }}
            helperText={verifycodeError ? '请输再次输入密码' : ''}
          />
          <Button
            disabled={verifycodeText !== sendVerifycode}
            variant="contained"
            sx={{ width: 200, margin: '8px 0 4px 16px !important' }}
            onClick={handleVerifycode}
          >
            {verifycodeText}
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button sx={{ mr: 'auto', ml: 1.5 }} onClick={handleLogin}>
          返回登录
        </Button>
        <Button onClick={handleClose}>取消</Button>
        <Button onClick={handleSubmit}>注册</Button>
      </DialogActions>
    </Dialog>
  )
}
