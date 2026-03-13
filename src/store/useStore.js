import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      tasks: [],
      goals: [],
      context: '',
      goalMode: 0,
      currentGoal: {},
      suggestedTasks: [],
      weekCompleted: 0,
      
      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, { ...task, id: Date.now() }]
      })),
      
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),
      
      updateTaskStatus: (id, status) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, status } : t)
      })),
      
      addGoal: (goal) => set((state) => ({
        goals: [...state.goals, { ...goal, id: Date.now(), completed: false }]
      })),
      
      deleteGoal: (id) => set((state) => ({
        goals: state.goals.filter(g => g.id !== id)
      })),
      
      setContext: (ctx) => set({ context: ctx }),
      
      startGoalMode: () => set({ goalMode: 1, currentGoal: {} }),
      
      setGoalStep: (step, data) => set((state) => ({
        goalMode: step,
        currentGoal: { ...state.currentGoal, ...data }
      })),
      
      setSuggestedTasks: (tasks) => set({ suggestedTasks: tasks }),
      
      addSuggestedTasks: () => {
        const { suggestedTasks, addTask } = get()
        suggestedTasks.forEach(task => addTask({ ...task, status: 'todo', goalId: null }))
        set({ suggestedTasks: [], goalMode: 0 })
      },
      
      resetGoalMode: () => set({ goalMode: 0, currentGoal: {}, suggestedTasks: [] }),
      
      getStats: () => {
        const { tasks, goals } = get()
        const counts = { todo: 0, progress: 0, done: 0, archive: 0 }
        tasks.forEach(t => counts[t.status] = counts[t.status] + 1)
        return { counts, tasksCount: tasks.length, goalsCount: goals.length }
      }
    }),
    {
      name: 'mattera-storage'
    }
  )
)

export default useStore
