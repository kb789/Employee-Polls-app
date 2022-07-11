import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/currUserSlice";
import Home from "./Home";

const Login = () => {
  const dispatch = useDispatch();

  const { currUser, users } = useSelector((store) => store.currUser);

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

  if (currUser !== "") {
    return <Home />;
  }

  return (
    <div>
      <h1 class="font-family: ui-sans-serif text-center text-3xl mb-8 mt-4 font-bold tracking-tight text-gray-900">
        Employee Polls
      </h1>
      <h1 class="text-center text-xl mb-4">Login</h1>
      <form
        className="mx-auto max-w-md space-y-6 bg-white py-8 px-10 rounded-lg shadow"
        onSubmit={handleSubmit}
      >
        Username:
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleUsername}
          className="block w-full px-3 py-2 mt-6 border border-gray-300 
        rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
        focus:ring-blue-500 focus:border-blue-500 text-sm mb-4"
        />
        Password:
        <input
          type="text"
          name="password"
          id="password"
          onChange={handlePassword}
          className="block w-full px-3 py-2 border border-gray-300 
        rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
        focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        <input
          type="submit"
          value="Submit"
          className="w-full flex justify-center mt-5 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
        ></input>
      </form>
    </div>
  );
};
export default Login;
