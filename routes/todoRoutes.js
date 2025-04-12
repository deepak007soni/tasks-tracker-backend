const express = require("express");
const router = express.Router();
const {
  getTodos,
  addTodo,
  updateTodoStatus,
} = require("../controllers/todoController");

router.get("/", getTodos);
router.post("/", addTodo);
router.put("/:id", updateTodoStatus);

module.exports = router;
