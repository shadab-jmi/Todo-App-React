import { useEffect, useState } from 'react'
import { TodoProvider } from './Contexts/'
import TodoForm from './Components/TodoForm'
import TodoItem from './Components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    console.log(localStorage.getItem('todos'))
    const todos = JSON.parse(localStorage.getItem('todos'))
    if (todos && todos.length) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
    console.log(localStorage.getItem('todos'))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen py-8 transition-all duration-500">
        <div className="w-full max-w-2xl mx-auto shadow-2xl rounded-2xl px-6 py-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
          <h1 className="text-4xl font-bold text-center mb-10 mt-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Manage Your Todos
          </h1>
          <div className="mb-6">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-4">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
