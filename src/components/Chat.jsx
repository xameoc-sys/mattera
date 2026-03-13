import React, { useState, useRef, useEffect } from 'react'
import useStore from '../store/useStore'
import { generateSuggestedTasks, getAlfredResponse, alfredGreeting } from '../utils/helpers'

export default function Chat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ text: alfredGreeting, sender: 'alf' }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const { 
    context, 
    setContext, 
    goalMode, 
    startGoalMode, 
    setGoalStep, 
    currentGoal, 
    setSuggestedTasks, 
    addSuggestedTasks, 
    resetGoalMode,
    tasks,
    addTask 
  } = useStore()
  const msgsRef = useRef(null)
  
  useEffect(() => {
    if (msgsRef.current) {
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight
    }
  }, [messages])
  
  const addMessage = (text, sender) => {
    setMessages(prev => [...prev, { text, sender }])
  }
  
  const handleSend = () => {
    if (!input.trim()) return
    const text = input.trim()
    setInput('')
    addMessage(text, 'usr')
    
    if (text.startsWith('/ctx ')) {
      setContext(text.slice(5))
      addMessage('Contexto actualizado.', 'alf')
      return
    }
    
    if (text === '/objetivo') {
      startGoalMode()
      addMessage('Perfecto. ¿Cuál es el objetivo principal?', 'alf')
      return
    }
    
    if (goalMode > 0) {
      handleGoalChat(text)
      return
    }
    
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      addMessage(getAlfredResponse(tasks.length), 'alf')
    }, 1500)
  }
  
  const handleGoalChat = (text) => {
    if (goalMode === 1) {
      setGoalStep(2, { title: text })
      addMessage('¿Por qué es importante?', 'alf')
    } else if (goalMode === 2) {
      setGoalStep(3, { description: text })
      addMessage('¿Fecha límite? (YYYY-MM-DD)', 'alf')
    } else if (goalMode === 3) {
      setGoalStep(4, { dueDate: text })
      const tasks = generateSuggestedTasks(currentGoal.title)
      setSuggestedTasks(tasks)
      let msg = `Para "${currentGoal.title}", te sugiero:\n\n`
      tasks.forEach((t, i) => msg += `${i + 1}. ${t.title}\n`)
      msg += '\n¿Agregar? (sí/no)'
      addMessage(msg, 'alf')
    } else if (goalMode === 4) {
      const lower = text.toLowerCase()
      if (lower.includes('sí') || lower.includes('si') || lower.includes('yes')) {
        addSuggestedTasks()
        addMessage('Tareas agregadas. Ahora crea el objetivo.', 'alf')
        window.dispatchEvent(new CustomEvent('openGoalModal'))
      } else {
        addMessage('Ok.', 'alf')
      }
      resetGoalMode()
    }
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  
  return (
    <>
      <button className="chat-toggle" onClick={() => setOpen(!open)}>
        🤖
      </button>
      
      <div className={`chat-panel ${open ? 'open' : ''}`}>
        <div className="chat-head">
          <span className="chat-title">Alfred</span>
          <button className="chat-close" onClick={() => setOpen(false)}>×</button>
        </div>
        <div className="chat-ctx">
          <lbl>Contexto:</lbl> <span>{context || 'Sin /context'}</span>
        </div>
        <div className="chat-msgs" ref={msgsRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.sender === 'alf' ? 'alf' : 'usr'}`}>
              {msg.text}
            </div>
          ))}
          <div className={`typing ${typing ? 'on' : ''}`}>
            <span className="typ-dot"></span>
            <span className="typ-dot"></span>
            <span className="typ-dot"></span>
          </div>
        </div>
        <div className="chat-inp-area">
          <div className="chat-inp-wrap">
            <textarea 
              className="chat-inp" 
              placeholder="Escribe..." 
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="chat-send" onClick={handleSend}>➤</button>
          </div>
        </div>
      </div>
    </>
  )
}
