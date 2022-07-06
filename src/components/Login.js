import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setUser } from "../features/currUserSlice";

const Login = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((store) => store.currUser);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(getUsers()).then(() => {
      if (users[username]["password"] === password) {
        console.log(users[username]["password"]);
        dispatch(setUser(username));
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      Username:
      <input
        type="text"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      Password:
      <input
        type="text"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <input type="submit" value="Submit"></input>
    </form>
  );
};
export default Login;
