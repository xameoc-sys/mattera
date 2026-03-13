import React, { useState } from 'react'
import useStore from '../store/useStore'

function TaskCard({ task, onDelete }) {
  const updateStatus = useStore(state => state.updateTaskStatus)
  
  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id.toString())
  }
  
  return (
    <div 
      className="card" 
      draggable 
      onDragStart={handleDragStart}
    >
      <div className="card-head">
        <span className="card-title">{task.title}</span>
        <span className={`card-prio ${task.prio}`}></span>
      </div>
      {task.desc && <div className="card-desc">{task.desc}</div>}
      <div className="card-meta">
        <span>{task.due || 'Sin fecha'}</span>
        <button className="del" onClick={() => onDelete(task.id)}>×</button>
      </div>
    </div>
  )
}

function KanbanColumn({ status, title, dotClass, tasks, onAdd, onDelete }) {
  const updateStatus = useStore(state => state.updateTaskStatus)
  
  const handleDragOver = (e) => {
    e.preventDefault()
  }
  
  const handleDrop = (e) => {
    e.preventDefault()
    const taskId = parseInt(e.dataTransfer.getData('taskId'))
    if (taskId) {
      updateStatus(taskId, status)
    }
  }
  
  return (
    <div 
      className="kan-col" 
      data-status={status}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="col-header">
        <div className="col-title">
          <span className={`col-dot ${dotClass}`}></span>
          {title}
        </div>
        <span className="col-count">{tasks.length}</span>
      </div>
      <div className="col-cards">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} />
        ))}
      </div>
      <button className="add-btn" onClick={onAdd}>
        + Añadir
      </button>
    </div>
  )
}

export default function Kanban() {
  const { tasks, addTask, deleteTask } = useStore()
  
  const handleAdd = (status) => {
    window.dispatchEvent(new CustomEvent('openTaskModal', { detail: { status } }))
  }
  
  return (
    <section className="view" id="view-kanban">
      <header className="page-header">
        <div>
          <h1 className="page-title">Kanban</h1>
          <p className="page-subtitle">Gestiona tus tareas</p>
        </div>
      </header>
      
      <div className="kanban">
        <KanbanColumn 
          status="todo" 
          title="Por Hacer" 
          dotClass="t"
          tasks={tasks.filter(t => t.status === 'todo')}
          onAdd={() => handleAdd('todo')}
          onDelete={deleteTask}
        />
        <KanbanColumn 
          status="progress" 
          title="En Progreso" 
          dotClass="p"
          tasks={tasks.filter(t => t.status === 'progress')}
          onAdd={() => handleAdd('progress')}
          onDelete={deleteTask}
        />
        <KanbanColumn 
          status="done" 
          title="Hecho" 
          dotClass="d"
          tasks={tasks.filter(t => t.status === 'done')}
          onAdd={() => handleAdd('done')}
          onDelete={deleteTask}
        />
        <KanbanColumn 
          status="archive" 
          title="Archivo" 
          dotClass="a"
          tasks={tasks.filter(t => t.status === 'archive')}
          onAdd={() => handleAdd('archive')}
          onDelete={deleteTask}
        />
      </div>
    </section>
  )
}
