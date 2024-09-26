const express = require('express')
const functions = require('firebase-functions')
const cors = require('cors')

const app = express()
app.use(cors({ origin: true }))

let todos = []

app.get('/todos', (req, res) => {
  res.json(todos)
})

app.post('/todos', (req, res) => {
  const newTodo = {
    id: Date.now(),
    text: req.body.text,
    done: false
  }
  todos.push(newTodo)
  res.json(newTodo)
})

app.put('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id)
  const todo = todos.find(t => t.id === todoId)
  if (todo) {
    todo.text = req.body.text || todo.text
    todo.done = req.body.done !== undefined ? req.body.done : todo.done
    res.json(todo)
  } else {
    res.status(404).json({ error: 'Element not found' })
  }
})

app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id))
  res.status(204).send()
})

exports.api = functions.https.onRequest(app)