import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/currUserSlice";

const Login = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((store) => store.currUser);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
    console.log(username);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (users[username]["password"] === password) {
      console.log(users[username]["name"]);
      dispatch(setUser(users[username]));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      Username:
      <input
        type="text"
        name="username"
        id="username"
        onChange={handleUsername}
      />
      Password:
      <input
        type="text"
        name="password"
        id="password"
        onChange={handlePassword}
      />
      <input type="submit" value="Submit"></input>
    </form>
  );
};
export default Login;
