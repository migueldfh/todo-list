import './App.css'

const App = () => {

  return (
    <div id="root">
      <h1>ToDo List</h1>
      <div>
        <input
          type="text"
          placeholder="Add new todo"
        />
        <button>Add</button>
      </div>
      <ul>
        <li>
          <input
            type="text"
          />
          <input
            type="checkbox"
          />
          <button>Delete</button>
        </li>
      </ul>
    </div>
  )
}

export default App
