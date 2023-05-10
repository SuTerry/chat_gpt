import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

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
        是否发起新会话？
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{color: '#d32f2f'}}>
          当前页面内容会被清空，请注意保存关键数据
        </DialogContentText>
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