import React from 'react'
import useStore from '../store/useStore'

export default function Goals() {
  const { tasks, goals, deleteGoal } = useStore()
  
  const openGoalModal = () => {
    window.dispatchEvent(new CustomEvent('openGoalModal'))
  }
  
  return (
    <section className="view" id="view-goals">
      <header className="page-header">
        <div>
          <h1 className="page-title">Objetivos</h1>
          <p className="page-subtitle">Define y alcanza tus metas</p>
        </div>
      </header>
      
      <div className="goals">
        {goals.map(goal => {
          const goalTasks = tasks.filter(t => t.goalId === goal.id)
          const completedTasks = goalTasks.filter(t => t.status === 'done').length
          const progress = goalTasks.length > 0 
            ? Math.round((completedTasks / goalTasks.length) * 100) 
            : 0
          
          return (
            <div key={goal.id} className="goal">
              <div className="goal-head">
                <span className="goal-title">{goal.title}</span>
                <button className="del" onClick={() => deleteGoal(goal.id)}>×</button>
              </div>
              <p style={{ fontSize: '0.87rem', color: 'var(--txt2)', marginTop: '8px' }}>
                {goal.description || ''}
              </p>
              <div className="goal-bar">
                <div className="goal-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="goal-meta">
                <span>{completedTasks}/{goalTasks.length} tareas</span>
                <span>{progress}%</span>
              </div>
            </div>
          )
        })}
        
        <div className="new-goal" onClick={openGoalModal}>
          <div className="new-icon">+</div>
          <div>Crear objetivo</div>
        </div>
      </div>
    </section>
  )
}
