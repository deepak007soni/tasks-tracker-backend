const fs = require("fs");
const path = require("path");
const todosPath = path.join(__dirname, "../data/todos.json");

const readTodos = () => {
  const data = fs.readFileSync(todosPath);
  return JSON.parse(data);
};

const writeTodos = (todos) => {
  fs.writeFileSync(todosPath, JSON.stringify(todos, null, 2));
};

exports.getTodos = (req, res) => {
  try {
    const todos = readTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

exports.addTodo = (req, res) => {
  const { description } = req.body;
  if (!description)
    return res.status(400).json({ error: "Description required" });

  const todos = readTodos();
  const newTodo = { id: Date.now(), description, status: "To Do" };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
};

exports.updateTodoStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["To Do", "In Progress", "Done"];
  if (!validStatuses.includes(status))
    return res.status(400).json({ error: "Invalid status" });

  const todos = readTodos();
  const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
  if (todoIndex === -1)
    return res.status(404).json({ error: "Todo not found" });

  todos[todoIndex].status = status;
  writeTodos(todos);
  res.json(todos[todoIndex]);
};
