export function generateSuggestedTasks(goalTitle) {
  const lower = goalTitle.toLowerCase()
  
  if (lower.includes('saas') || lower.includes('producto') || lower.includes('lanzar')) {
    return [
      { title: 'Definir propuesta de valor', desc: '¿Qué te hace diferente?', prio: 'h' },
      { title: 'Crear landing page', desc: 'Página de captura', prio: 'h' },
      { title: 'Desarrollar MVP', desc: 'Características mínimas', prio: 'h' },
      { title: 'Conseguir usuarios', desc: 'Validar con reales', prio: 'm' },
      { title: 'Configurar pagos', desc: 'Stripe u otra', prio: 'm' }
    ]
  }
  
  if (lower.includes('venta') || lower.includes('cliente')) {
    return [
      { title: 'Identificar cliente ideal', desc: 'Buyer persona', prio: 'h' },
      { title: 'Crear lista prospectos', desc: 'Base de datos', prio: 'h' },
      { title: 'Preparar pitch', desc: 'Presentación', prio: 'm' }
    ]
  }
  
  return [
    { title: 'Definir primer paso', desc: '¿Cuál es la primera acción?', prio: 'h' },
    { title: 'Identificar obstáculos', desc: '¿Qué puede frenarte?', prio: 'm' }
  ]
}

export function getAlfredResponse(tasksCount) {
  const responses = [
    'El éxito no viene de esperar. Haz.',
    `Tienes ${tasksCount} tareas. Ejecuta.`,
    'Bien. ¿Qué sigue?',
    'Ejecuta, aprende, ajusta, repite.'
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

export const alfredGreeting = "Soy Alfred. Escribe /objetivo para crear uno conmigo."
