import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, toggleisUserSignUp } from "../features/currUserSlice";
import Home from "./Home";
import Signup from "./Signup";

const Login = () => {
  const dispatch = useDispatch();

  const { currUser, users, isUserSignUp } = useSelector(
    (store) => store.currUser
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleSignUp = (event) => {
    dispatch(toggleisUserSignUp());
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username in users && users[username]["password"] === password) {
      setLoginError(false);
   
      dispatch(setUser(users[username]));

      
    } else {
      setLoginError(true);
    }
  };

  if (currUser !== "") {
    return <Home />;
  }

  if (isUserSignUp) {
    return <Signup />;
  }
  return (
    <div>
      <h1 className="font-family: ui-sans-serif text-center text-3xl mb-8 mt-4 font-bold tracking-tight text-gray-900">
        Employee Polls
      </h1>
      <h1 className="text-center text-xl mb-4">Login</h1>

      <form
        className="mx-auto max-w-md space-y-6 bg-white py-8 px-10 rounded-lg shadow"
        onSubmit={handleSubmit}
      >
        {loginError ? (
          <h1 data-testid="er" className="text-center text-xl mb-4 text-red-500 font-semibold">
            Error: Incorrect Username or password.
          </h1>
        ) : (
          <div></div>
        )}
        Username:
        <input
          type="text"
          name="username"
          id="username"
          required
          onChange={handleUsername}
          data-testid="un"
          className="block w-full px-3 py-2 mt-6 border border-gray-300 
        rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
        focus:ring-blue-500 focus:border-blue-500 text-sm mb-4"
        />
        Password:
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={handlePassword}
          data-testid="pa"
          className="block w-full px-3 py-2 border border-gray-300 
        rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
        focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        <input
          type="submit"
          value="Submit"
          data-testid="submit"
          className="w-full flex justify-center mt-5 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
        ></input>
      </form>
      <p className="text-center text-lg mb-4 mt-6 mr-2">
        Don't have an account?
        <button className="px-2"  data-testid="submit2" onClick={handleSignUp}>
          <span className="text-cyan-500"> Sign Up</span>
        </button>
      </p>
    </div>
  );
};
export default Login;
