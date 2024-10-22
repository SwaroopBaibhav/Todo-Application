import { createContext, useContext } from 'react'

export const TodoContext = createContext({
    todos: [{
        id: 1,  // this is the format.
        todo: "todo message",
        completed: false
    }],
    // yaha bas function declare hota hai, define toh app.jsx me hota hai
    addTodo: (todo) => {},
    updateTodo: (todo, id) => {},
    deleteTodo: (id) => {},
    toggleTodo: (id) => {},
    resetTodo: () => {},
})

export const TodoProvider = TodoContext.Provider

export const useTodo = () => {
    return useContext(TodoContext)
}