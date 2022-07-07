import { useSelector, useDispatch } from "react-redux";
import { toggleAnswered } from "../features/currAnsweredSlice";

import { Link } from "react-router-dom";
const Home = () => {
  const { currUser } = useSelector((store) => store.currUser);
  const { questions } = useSelector((store) => store.questions);
  const { isAnswered } = useSelector((store) => store.currAnswered);

  const dispatch = useDispatch();
  return (
    <div>
      <h1>Employee Polls</h1>
      Welcome back, {currUser.name}
      <button onClick={() => dispatch(toggleAnswered())}>
        {isAnswered ? (
          <span>See Unswered Polls</span>
        ) : (
          <span>See Answered Polls</span>
        )}
      </button>
      <ul>
        {questions.map((ques) => {
          return isAnswered
            ? (ques.optionOne.votes.includes(currUser.id) ||
                ques.optionTwo.votes.includes(currUser.id)) && (
                <div>
                  <p>Would you rather</p>
                  <li key={ques.id}>
                    {ques.optionOne.text} or {ques.optionTwo.text}
                    <Link to={"question/" + ques.id}>View Your Answer</Link>
                  </li>
                </div>
              )
            : !ques.optionOne.votes.includes(currUser.id) &&
                !ques.optionTwo.votes.includes(currUser.id) && (
                  <div>
                    <p>Would you rather</p>
                    <li key={ques.id}>
                      {ques.optionOne.text} or {ques.optionTwo.text}
                      <Link to={"question/" + ques.id}>Answer</Link>
                    </li>
                  </div>
                );
        })}
      </ul>
    </div>
  );
};
export default Home;
