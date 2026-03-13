import React from 'react'

export default function Sidebar({ currentView, onViewChange }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">A</div>
        <span className="logo-text">Mattera</span>
      </div>
      
      <nav className="nav-section">
        <div className="nav-label">Principal</div>
        <div 
          className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => onViewChange('dashboard')}
        >
          Dashboard
        </div>
        <div 
          className={`nav-item ${currentView === 'goals' ? 'active' : ''}`}
          onClick={() => onViewChange('goals')}
        >
          Objetivos
        </div>
        <div 
          className={`nav-item ${currentView === 'kanban' ? 'active' : ''}`}
          onClick={() => onViewChange('kanban')}
        >
          Kanban
        </div>
      </nav>
      
      <button className="quick-add" onClick={() => window.dispatchEvent(new CustomEvent('openTaskModal'))}>
        + Nueva Tarea
      </button>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">A</div>
          <div className="user-info">
            <div className="user-name">Alexander</div>
            <div className="user-role">Fundador</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
