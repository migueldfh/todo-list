import './App.css'
import { Todo, useTodos } from './hooks/useTodos'

const App = () => {

  const { todos, loading, error, addTodo, updateTodo, deleteTodo, checkTodo } = useTodos()

  const handleAddTodo = (text: string) => {
    if (text) {
      addTodo(text)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div id="root">
      <h1>ToDo List</h1>
      <div>
        <input type="text" placeholder="Add a todo" onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddTodo(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }} />
      </div>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id}>
            <input
              type="text"
              value={todo.text}
              onChange={e => updateTodo(todo.id, {text: e.target.value})}
            />
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => checkTodo(todo.id)}
            />
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
