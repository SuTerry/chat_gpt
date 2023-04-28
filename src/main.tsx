import 'core-js/es/map'
import 'core-js/es/set'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import './index.less'


const rootDom = (document.getElementById('root') as Element)

const root = createRoot(rootDom)

root.render(<App />)