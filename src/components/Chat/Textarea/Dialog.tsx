import React from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

interface DialogProps {
  open: boolean
  close: () => void
  sure: () => void
}

export default ({ open, close, sure }: DialogProps): JSX.Element => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        确定要删除聊天？
      </DialogTitle>
      <DialogActions>
        <Button onClick={close}>取消</Button>
        <Button onClick={sure} autoFocus>
          确定
        </Button>
      </DialogActions>
    </Dialog>
  )
}