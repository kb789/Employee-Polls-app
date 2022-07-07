import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveQuestionAnswer, getQuestions } from "../features/questionsSlice";
import { getUsers, setUser } from "../features/currUserSlice";

const Question = () => {
  //const { currPage } = useSelector((store) => store.currPage);
  const { id } = useParams();
  const { currUser,users } = useSelector((store) => store.currUser);
  const { questions } = useSelector((store) => store.questions);
  const dispatch = useDispatch();

  const quesIndex = questions.findIndex((ques) => ques.id === id);
  const quesDate = new Date(questions[quesIndex]["timestamp"]);
  const quesDateFormat =
    quesDate.getMonth() +
    1 +
    "/" +
    quesDate.getDate() +
    "/" +
    quesDate.getFullYear();

  const quesAns = users[currUser.id].answers.hasOwnProperty(id);
  console.log(currUser.answers);
  console.log(questions[quesIndex]["optionOne"]["votes"]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("called2");
    const data = { authedUser: currUser.id, qid: id, answer: "optionOne" };
    console.log(data);
    dispatch(saveQuestionAnswer(data));
    dispatch(getQuestions());
    dispatch(getUsers());
    
  };

  if (quesAns) {
    return (
      <div>
        <p>
          Poll created by {questions[quesIndex]["author"]} on {quesDateFormat}
        </p>
        <p>
          {questions[quesIndex]["optionOne"]["votes"].length} voter(s) (
          {Math.round(
            (questions[quesIndex]["optionOne"]["votes"].length /
              (questions[quesIndex]["optionOne"]["votes"].length +
                questions[quesIndex]["optionTwo"]["votes"].length)) *
              100
          )}
          %) would rather {questions[quesIndex]["optionOne"]["text"]}
        </p>
        <p>
          {questions[quesIndex]["optionTwo"]["votes"].length} voter(s) (
          {Math.round(
            (questions[quesIndex]["optionTwo"]["votes"].length /
              (questions[quesIndex]["optionOne"]["votes"].length +
                questions[quesIndex]["optionTwo"]["votes"].length)) *
              100
          )}
          %) would rather {questions[quesIndex]["optionTwo"]["text"]}
        </p>
        <p>
          You would rather{" "}
          {questions[quesIndex]["optionOne"]["votes"].includes(currUser.id)
            ? questions[quesIndex]["optionOne"]["text"]
            : questions[quesIndex]["optionTwo"]["text"]}
        </p>
        <p>Thank you for voting!</p>
      </div>
    );
  }
  return (
    <div>
      <p>
        Poll created by {questions[quesIndex]["author"]} on {quesDateFormat}
      </p>
      <form onSubmit={handleSubmit}>
        <p>Would you rather:</p>
        <input type="radio" id="html" name="fav_language" value="HTML" /> 
        <label for="html">{questions[quesIndex]["optionOne"]["text"]}</label>
        <p>Or</p>
          <input type="radio" id="css" name="fav_language" value="CSS" /> 
        <label for="css">{questions[quesIndex]["optionTwo"]["text"]}</label>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};
export default Question;
