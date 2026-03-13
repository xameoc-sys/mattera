import React from 'react'
import useStore from '../store/useStore'

export default function Dashboard() {
  const { tasks, goals, suggestedTasks, goals: goalsList } = useStore()
  
  const stats = {
    goals: goalsList.length,
    tasks: tasks.length,
    progress: tasks.filter(t => t.status === 'progress').length,
    done: tasks.filter(t => t.status === 'done').length
  }
  
  const tasksDone = tasks.filter(t => t.status === 'done').length
  const tasksTotal = tasks.length || 1
  const goalsDone = goalsList.filter(g => g.completed).length
  const goalsTotal = goalsList.length || 1
  
  const taskPct = Math.round((tasksDone / tasksTotal) * 100)
  const goalPct = Math.round((goalsDone / goalsTotal) * 100)
  
  const recommendedTasks = tasks.filter(t => t.goalId && t.status === 'todo')
  
  return (
    <section className="view active" id="view-dashboard">
      <header className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Tu centro de comando</p>
        </div>
      </header>
      
      <section className="stats">
        <div className="stat">
          <div className="stat-value">{stats.goals}</div>
          <div className="stat-label">Objetivos</div>
        </div>
        <div className="stat">
          <div className="stat-value">{stats.tasks}</div>
          <div className="stat-label">Tareas</div>
        </div>
        <div className="stat">
          <div className="stat-value">{stats.progress}</div>
          <div className="stat-label">En Progreso</div>
        </div>
        <div className="stat">
          <div className="stat-value">{stats.done}</div>
          <div className="stat-label">Completadas</div>
        </div>
      </section>
      
      <section>
        <h2 className="section-title">Progreso</h2>
        <div className="rings">
          <div className="ring-con">
            <div className="ring">
              <svg width="120" height="120">
                <circle className="bg" cx="60" cy="60" r="50" />
                <circle 
                  className="prog" 
                  cx="60" 
                  cy="60" 
                  r="50"
                  style={{ strokeDashoffset: 314 - (314 * goalPct / 100) }}
                />
              </svg>
              <span className="ring-val">{goalPct}%</span>
            </div>
            <span className="ring-label">Objetivos</span>
          </div>
          <div className="ring-con">
            <div className="ring">
              <svg width="120" height="120">
                <circle className="bg" cx="60" cy="60" r="50" />
                <circle 
                  className="prog" 
                  cx="60" 
                  cy="60" 
                  r="50"
                  style={{ strokeDashoffset: 314 - (314 * taskPct / 100) }}
                />
              </svg>
              <span className="ring-val">{taskPct}%</span>
            </div>
            <span className="ring-label">Tareas</span>
          </div>
        </div>
      </section>
      
      {recommendedTasks.length > 0 && (
        <section className="rec-sec">
          <div className="rec-title">🔥 Tareas de Objetivos</div>
          <div>
            {recommendedTasks.slice(0, 5).map(task => {
              const goal = goalsList.find(g => g.id === task.goalId)
              return (
                <div key={task.id} className="rec-task">
                  <div>
                    <span className="rec-src">{goal?.title?.substring(0, 20)}</span>
                    <div className="rec-title-txt">{task.title}</div>
                  </div>
                  <button 
                    className="btn-add"
                    onClick={() => useStore.getState().updateTaskStatus(task.id, 'todo')}
                  >
                    Agregar
                  </button>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </section>
  )
}
