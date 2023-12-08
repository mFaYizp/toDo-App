import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";

const App = () => {
  const [tasks, setTasks] = useState(null);
  const userEmail = "user2@example.com";
  
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`http://localhost:3500/todos/${userEmail}`);
        const json = await res.json();
        setTasks(json);
        console.log(json);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  });
  console.log(tasks);

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      <ListHeader listName={"🏝️ Holiday tick list"} />
      {sortedTasks?.map((item) => (
      <ListItem key={item.id} task={item} />
      ))}
    </div>
  );
};

export default App;
