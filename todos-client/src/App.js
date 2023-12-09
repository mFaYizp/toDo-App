import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookie, setCookie, removeCookie] = useCookies(null);
  const [tasks, setTasks] = useState(null);
  const userEmail = cookie.Email;
  const authToken = cookie.AuthToken;

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
  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);
  console.log(tasks);

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={"🏝️ Holiday tick list"} getData={getData} />
          <p className="user-email">Welcome back {userEmail}</p>
          {sortedTasks?.map((item) => (
            <ListItem key={item.id} task={item} getData={getData} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
