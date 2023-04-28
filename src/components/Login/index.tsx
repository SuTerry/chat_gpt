import React, { useState, useContext } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import context from '@/context'

export default (): JSX.Element => {
  const { user, setLoginOpen, setUser } = useContext(context)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const handleClose = () => setLoginOpen(false)

  const handleSubmit = () => {
    if (!username || !password) {
      if (!username) setUsernameError(true)
      if (!password) setPasswordError(true)
      return
    }
    setUser({
      username,
      login: true,
      dialog: false,
    })
  }

  return (
    <Dialog fullWidth open={user.dialog} onClose={handleClose}>
      <DialogTitle>请先登录您的账户</DialogTitle>
      <DialogContent>
        <TextField
          error={usernameError}
          sx={{ mb: 4 }}
          autoFocus
          margin="dense"
          id="username"
          label="用户名"
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => { setUsername(e.target.value), setUsernameError(false) }}
          helperText={usernameError ? "请输入用户名" : ""}
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
        <Button onClick={handleClose}>取消</Button>
        <Button onClick={handleSubmit}>登录</Button>
      </DialogActions>
    </Dialog>
  )
}
