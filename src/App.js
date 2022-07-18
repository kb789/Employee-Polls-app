import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Home from "./components/Home";
import Add from "./components/Add";
import Leaderboard from "./components/Leaderboard";
import Login from "./components/Login";
import NotFound from "./components/NotFound";

import Question from "./components/Question";

import { getQuestions } from "./features/questionsSlice";
import { getUsers } from "./features/currUserSlice";
import { useEffect } from "react";

function App() {
  const { currUser } = useSelector((store) => store.currUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getQuestions());
  }, [dispatch]);

  if (currUser === "") {
    return <Login />;
  }

  return (
    <main>
      <Nav />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" on exact element={<Home />}></Route>
        <Route path="/add" exact element={<Add />}></Route>
        <Route path="/leaderboard" exact element={<Leaderboard />}></Route>
        <Route path="/login" exact element={<Login />}></Route>

        <Route path="/questions/:id" element={<Question />}></Route>
      </Routes>
    </main>
  );
}
export default App;
