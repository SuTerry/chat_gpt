import { useState } from "react"

import { HistoryMessages } from '@/context'

type userUser = [HistoryMessages, (history: HistoryMessages) => void]

// const LOCALHISTORY = 'historys'

export default (): userUser => {
  // const localHistory = localStorage.getItem(LOCALHISTORY)
  // const [history, _setHistory] = useState<HistoryMessages>(localHistory ? [...JSON.parse(localHistory)] : [])
  const [history, _setHistory] = useState<HistoryMessages>([])

  const setHistory = (history: HistoryMessages) => {
    // localStorage.setItem(LOCALHISTORY, JSON.stringify(history))
    _setHistory(history)
  }

  return [history, setHistory]
}