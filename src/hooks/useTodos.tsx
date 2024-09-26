import axios from "axios"
import { useEffect, useState } from "react"

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

interface UseTodos {
  todos: Todo[]
  loading: boolean
  error: string | null
  fetchTodos: () => Promise<void>
  addTodo: (text: string) => Promise<void>
  updateTodo: (id: number, updatedTodo: Partial<Todo>) => Promise<void>
  deleteTodo: (id: number) => Promise<void>
  checkTodo: (id: number) => Promise<void>
}

const apiURL = 'https://us-central1-todo-list-b2e97.cloudfunctions.net/api/todos'

export const useTodos = (): UseTodos => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTodos = async () => {
    try {
      const response = await axios.get(apiURL)
      setTodos(response.data)
      setLoading(false)
    } catch (error) {
      setError('Error fetching To do List')
      console.error('Error fetching todos:', error)
    }
  }

  const addTodo = async (text: string) => {
    try {
      const newTodo = { text, done: false }
      const response = await axios.post(apiURL, newTodo)
      setTodos((prevTodos) => [...prevTodos, response.data])
    } catch (error) {
      setError('Error adding To do')
      console.error('Error adding todo:', error)
    }
  }

  const updateTodo = async (id: number, updatedTodo: Partial<Todo>) => {
    try {
      const response = await axios.put(`${apiURL}/${id}`, updatedTodo)
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? response.data : todo))
      )
    } catch (error) {
      setError('Error updating To Do')
      console.error('Error updating todo:', error)
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`${apiURL}/${id}`)
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    } catch (error) {
      setError('Error deleting To do')
      console.error('Error deleting todo:', error)
    }
  }

  const checkTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id)
    if (todo) {
      await updateTodo(id, { done: !todo.done })
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    checkTodo,
  }
}