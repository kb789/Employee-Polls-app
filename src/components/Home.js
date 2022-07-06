import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../features/questionsSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const { currUser } = useSelector((store) => store.currUser);
  const { isLoadingTwo, questions } = useSelector((store) => store.questions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  if (isLoadingTwo) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>test</h1>
      Welcome back, {currUser}
      <ul>
        {questions.map((ques) => {
          return <li key={ques.id}>{ques.optionOne.text}</li>;
        })}
      </ul>
      <ul>
        {questions.map((ques) => (
          <li>
            <Link to={"question/" + ques.id}>Link</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Home;
