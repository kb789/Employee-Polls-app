import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { saveQuestionAnswer, getQuestions } from "../features/questionsSlice";
import { getUsers } from "../features/currUserSlice";
import Loading from "./Loading";
import NotFound from "./NotFound";

const Question = () => {
  const { id } = useParams();
  const { currUser, users, isLoadingUsers } = useSelector(
    (store) => store.currUser
  );
  const { questions, isLoadingAns, isLoadingQuestions } = useSelector(
    (store) => store.questions
  );
  const dispatch = useDispatch();

  const quesIndex = questions.findIndex((ques) => ques.id === id);

  if (quesIndex === -1) {
    return <NotFound />;
  }

  const quesDate = new Date(questions[quesIndex]["timestamp"]);
  const quesDateFormat =
    quesDate.getMonth() +
    1 +
    "/" +
    quesDate.getDate() +
    "/" +
    quesDate.getFullYear();

  if (typeof users[currUser.id] === "undefined") {
    return <NotFound />;
  }

  const quesAns = users[currUser.id].answers.hasOwnProperty(id);

  const handleChoiceOne = () => {
    const data = {
      authedUser: currUser.id,
      qid: id,
      answer: "optionOne",
    };

    dispatch(saveQuestionAnswer(data)).then(() => {
      dispatch(getQuestions()).then(() => {
        dispatch(getUsers());
      });
    });
  };

  const handleChoiceTwo = () => {
    const data = {
      authedUser: currUser.id,
      qid: id,
      answer: "optionTwo",
    };

    dispatch(saveQuestionAnswer(data)).then(() => {
      dispatch(getQuestions()).then(() => {
        dispatch(getUsers());
      });
    });
  };

  if (isLoadingAns || isLoadingQuestions || isLoadingUsers) {
    return <Loading />;
  }

  if (quesAns) {
    return (
      <div className="py-4 min-h-screen ">
        <img
          className="mb-3 w-24 h-24 rounded-full shadow-lg mx-auto"
          src={users[questions[quesIndex]["author"]]["avatarURL"]}
          alt="profile"
        ></img>
        <h1 className="text-gray-800 text-xl text-center mb-10 mt-5">
          Poll created by {questions[quesIndex]["author"]} on {quesDateFormat}
        </h1>

        <div className="mt-10 pt-5 mx-auto text-left max-w-3xl px-10">
          <div className="mb-10 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col ">
            <div className="w-full rounded-lg shadow-lg bg-yellow-50 pl-2">
              <p className="text-center pb-10 bg-yellow-50 pt-2 uppercase">
                Results:
              </p>
              <ul className="divide-y-2 divide-blue-100 bg-yellow-50 pb-2">
                <li className="p-3">
                  {questions[quesIndex]["optionOne"]["votes"].length} voter(s) (
                  {Math.round(
                    (questions[quesIndex]["optionOne"]["votes"].length /
                      (questions[quesIndex]["optionOne"]["votes"].length +
                        questions[quesIndex]["optionTwo"]["votes"].length)) *
                      100
                  )}
                  %) would rather {questions[quesIndex]["optionOne"]["text"]}
                </li>
                <li className="p-3">
                  {questions[quesIndex]["optionTwo"]["votes"].length} voter(s) (
                  {Math.round(
                    (questions[quesIndex]["optionTwo"]["votes"].length /
                      (questions[quesIndex]["optionOne"]["votes"].length +
                        questions[quesIndex]["optionTwo"]["votes"].length)) *
                      100
                  )}
                  %) would rather {questions[quesIndex]["optionTwo"]["text"]}
                </li>
                <li className="p-3">
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
      <img
        className="mb-3 w-14 h-14 rounded-full shadow-lg mx-auto"
        src={users[questions[quesIndex]["author"]]["avatarURL"]}
        alt="profile"
      ></img>
      <p className="text-gray-400 uppercase text-sm text-center">
        Poll created by {questions[quesIndex]["author"]} on {quesDateFormat}
      </p>
      <p className="text-xl pt-6">{currUser.name}, would you rather...</p>
      <hr />
      <p className="text-lg font-bold">
        {questions[quesIndex]["optionOne"]["text"]}
      </p>
      <div className="mx-auto text-center">
        <button
          onClick={handleChoiceOne}
          className="mt-5  text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Choose
        </button>
      </div>
      <hr />

      <p className="text-lg font-bold">
        {questions[quesIndex]["optionTwo"]["text"]}
      </p>
      <div className="mx-auto text-center">
        <button
          onClick={handleChoiceTwo}
          className="mt-5 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Choose
        </button>
      </div>
    </div>
  );
};
export default Question;
