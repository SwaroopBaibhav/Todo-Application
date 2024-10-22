import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './context'
import { TodoForm, TodoItem } from './components'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prevTodo) => [{id: Date.now(), ...todo}, ...prevTodo])
  }

  const resetTodo = () => {
    setTodos([])
  }

  const updateTodo = (todo, id) => {
    setTodos((prevTodo) => prevTodo.map((e) => (e.id === id ? todo : e)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((e) => e.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((e) => e.id === id ? {...e, completed: !e.completed} : e ))
  }// basic context ends here.

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
     if(todos && todos.length>0){
      setTodos(todos)
     }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleTodo, resetTodo}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
                <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
                {todos.map((e) => 
                <div className='w-full' key={e.id}>
                  <TodoItem todo={e}/>
                </div>
                )}
            </div>
        </div>
        <button onClick={resetTodo} className="flex m-auto rounded-lg px-3 py-1 my-3 bg-red-600 text-white shrink-0">
          Reset
        </button>
      </div>
    </TodoProvider>
  )
}

export default App
