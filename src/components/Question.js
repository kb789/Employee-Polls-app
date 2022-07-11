import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { saveQuestionAnswer, getQuestions } from "../features/questionsSlice";
import { getUsers } from "../features/currUserSlice";

const Question = () => {
  //const { currPage } = useSelector((store) => store.currPage);
  const { id } = useParams();
  const { currUser, users } = useSelector((store) => store.currUser);
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

  const handleChoiceOne = () => {
    const data = {
      authedUser: currUser.id,
      qid: id,
      answer: "optionOne",
    };

    dispatch(saveQuestionAnswer(data));
    dispatch(getQuestions());
    dispatch(getUsers());
  };

  const handleChoiceTwo = () => {
    const data = {
      authedUser: currUser.id,
      qid: id,
      answer: "optionTwo",
    };

    dispatch(saveQuestionAnswer(data));
    dispatch(getQuestions());
    dispatch(getUsers());
  };

  if (quesAns) {
    return (
      <div className="py-4 min-h-screen ">
        <h1 class="text-gray-800 text-xl text-center ">
          Poll created by {questions[quesIndex]["author"]} on {quesDateFormat}
        </h1>
        <div class="mt-10 mx-auto text-left max-w-3xl px-10">
          <div className="mb-10 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col ">
            <div className="w-full rounded-lg shadow-lg bg-yellow-50 pl-2">
              <p className="text-center pb-10 bg-yellow-50 pt-2 uppercase">
                Results:
              </p>
              <ul class="divide-y-2 divide-blue-100 bg-yellow-50 pb-2">
                <li class="p-3">
                  {questions[quesIndex]["optionOne"]["votes"].length} voter(s) (
                  {Math.round(
                    (questions[quesIndex]["optionOne"]["votes"].length /
                      (questions[quesIndex]["optionOne"]["votes"].length +
                        questions[quesIndex]["optionTwo"]["votes"].length)) *
                      100
                  )}
                  %) would rather {questions[quesIndex]["optionOne"]["text"]}
                </li>
                <li class="p-3">
                  {questions[quesIndex]["optionTwo"]["votes"].length} voter(s) (
                  {Math.round(
                    (questions[quesIndex]["optionTwo"]["votes"].length /
                      (questions[quesIndex]["optionOne"]["votes"].length +
                        questions[quesIndex]["optionTwo"]["votes"].length)) *
                      100
                  )}
                  %) would rather {questions[quesIndex]["optionTwo"]["text"]}
                </li>
                <li class="p-3">
                  You would rather{" "}
                  {questions[quesIndex]["optionOne"]["votes"].includes(
                    currUser.id
                  )
                    ? questions[quesIndex]["optionOne"]["text"]
                    : questions[quesIndex]["optionTwo"]["text"]}
                </li>
              </ul>
            </div>
            <p className="text-center pt-10 pb-2">Thank you for voting!</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-md space-y-6 bg-white py-8 px-10 rounded-lg shadow">
      <p className="text-gray-400 uppercase text-sm">
        Poll created by {questions[quesIndex]["author"]} on {quesDateFormat}
      </p>
      <p className="text-xl">Would you rather...</p>
      <hr/>
      <p className="text-lg font-bold">{questions[quesIndex]["optionOne"]["text"]}</p>
      <div className="mx-auto text-center">
      <button
        onClick={handleChoiceOne}
        class="mt-5  text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Choose
      </button>
      </div>
      <hr />
      
      <p className="text-lg font-bold">{questions[quesIndex]["optionTwo"]["text"]}</p>
      <div className="mx-auto text-center">
      <button
        onClick={handleChoiceTwo}
        class="mt-5 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Choose
      </button>
      </div>
    </div>
  );
};
export default Question;
