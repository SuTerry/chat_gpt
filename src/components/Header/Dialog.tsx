import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

interface DialogProps {
  open: boolean
  close: () => void
  sure: () => void
}

export default ({ open, close, sure }: DialogProps): JSX.Element => {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        确定退出登录？
      </DialogTitle>
      <DialogContent>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>取消</Button>
        <Button onClick={sure} autoFocus>
          确定
        </Button>
      </DialogActions>
    </Dialog>
  )
}