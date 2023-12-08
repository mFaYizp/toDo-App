const port = process.env.PORT ?? 3500;
const express = require("express");
const app = express();

const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json())

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
      `INSERT INTO todos(id,user_email,title,progress,date) VALUES($1,$2,$3,$4,$5)`,
      [id, user_email, title, progress, date]
    );
    console.log("New todo inserted:", newToDo.rows[0]);
    res.json(newToDo)
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`working on port ${port}`);
});
