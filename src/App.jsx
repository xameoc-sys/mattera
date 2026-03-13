import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Goals from './components/Goals'
import Kanban from './components/Kanban'
import Chat from './components/Chat'
import TaskModal from './components/TaskModal'
import GoalModal from './components/GoalModal'

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  
  return (
    <div className="app">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="main">
        <Dashboard />
        <Goals />
        <Kanban />
      </main>
      
      <Chat />
      <TaskModal />
      <GoalModal />
    </div>
  )
}
