const port = process.env.PORT ?? 3500;
const express = require("express");
const app = express();

const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// get all todos
app.get("/todos/:userEmail", async (req, res) => {
  const { userEmail } = req.params;
  try {
    const todos = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1",
      [userEmail]
    );

    res.json(todos.rows);
  } catch (error) {
    console.log(error);
  }
});

//create todos

app.post("/todos", async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  const id = uuidv4();
  console.log(user_email, title, progress, date);
  try {
    const newToDo = await pool.query(
      "INSERT INTO todos(id,user_email,title,progress,date) VALUES($1,$2,$3,$4,$5)",
      [id, user_email, title, progress, date]
    );
    res.json(newToDo);
  } catch (error) {
    console.log(error);
  }
});

//edit todos
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;

  try {
    const updatedTodo = await pool.query(
      "UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;"[
        (user_email, title, progress, date, id)
      ]
    );
    res.json(updatedTodo);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`working on port ${port}`);
});
