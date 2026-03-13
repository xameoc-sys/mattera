import React, { useState } from 'react'
import useStore from '../store/useStore'

export default function TaskModal() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [prio, setPrio] = useState('m')
  const [due, setDue] = useState('')
  const [status, setStatus] = useState('todo')
  
  const addTask = useStore(state => state.addTask)
  
  React.useEffect(() => {
    const handleOpen = (e) => {
      if (e.detail?.status) setStatus(e.detail.status)
      setOpen(true)
    }
    window.addEventListener('openTaskModal', handleOpen)
    return () => window.removeEventListener('openTaskModal', handleOpen)
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    addTask({ title, desc, prio, due, status, goalId: null })
    setTitle('')
    setDesc('')
    setPrio('m')
    setDue('')
    setOpen(false)
  }
  
  return (
    <div className={`modal ${open ? 'on' : ''}`}>
      <div className="modal-box">
        <div className="modal-head">
          <h2 className="modal-title">Nueva Tarea</h2>
          <button className="modal-close" onClick={() => setOpen(false)}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Título</label>
            <input 
              type="text" 
              className="form-input" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Descripción</label>
            <textarea 
              className="form-textarea"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Prioridad</label>
              <select 
                className="form-input"
                value={prio}
                onChange={(e) => setPrio(e.target.value)}
              >
                <option value="l">Baja</option>
                <option value="m">Media</option>
                <option value="h">Alta</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Fecha</label>
              <input 
                type="date" 
                className="form-input"
                value={due}
                onChange={(e) => setDue(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-sec" onClick={() => setOpen(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-pri">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
