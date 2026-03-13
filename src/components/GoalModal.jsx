import React, { useState } from 'react'
import useStore from '../store/useStore'

export default function GoalModal() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [due, setDue] = useState('')
  
  const addGoal = useStore(state => state.addGoal)
  const currentGoal = useStore(state => state.currentGoal)
  
  React.useEffect(() => {
    const handleOpen = () => {
      setTitle(currentGoal.title || '')
      setDesc(currentGoal.description || '')
      setDue(currentGoal.dueDate || '')
      setOpen(true)
    }
    window.addEventListener('openGoalModal', handleOpen)
    return () => window.removeEventListener('openGoalModal', handleOpen)
  }, [currentGoal])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    addGoal({ title, description: desc, dueDate: due })
    setTitle('')
    setDesc('')
    setDue('')
    setOpen(false)
  }
  
  return (
    <div className={`modal ${open ? 'on' : ''}`}>
      <div className="modal-box">
        <div className="modal-head">
          <h2 className="modal-title">Nuevo Objetivo</h2>
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
              placeholder="Ej: Lanzar mi SaaS"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Descripción</label>
            <textarea 
              className="form-textarea"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="¿Qué quieres lograr?"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Fecha límite</label>
            <input 
              type="date" 
              className="form-input"
              value={due}
              onChange={(e) => setDue(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-sec" onClick={() => setOpen(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-pri">
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
