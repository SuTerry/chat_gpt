import React from 'react'

import List from './List'
import Textarea from './Textarea'

import './index.less'


export default (): JSX.Element => {
  return (
    <div className='chat'>
      <List />
      <Textarea />
    </div>
  )
}