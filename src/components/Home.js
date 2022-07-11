import { useSelector, useDispatch } from "react-redux";
import { toggleAnswered } from "../features/currAnsweredSlice";

import { Link } from "react-router-dom";
const Home = () => {
  const { currUser } = useSelector((store) => store.currUser);
  const { questions } = useSelector((store) => store.questions);
  const { isAnswered } = useSelector((store) => store.currAnswered);

  const dispatch = useDispatch();

  return (
    <div py-8 min-h-screen>
      <h1 class="font-family: ui-sans-serif text-center text-3xl mb-8 font-bold tracking-tight text-gray-900">
        Employee Polls
      </h1>
      <div className="mt-10 mx-auto text-center max-w-3xl px-10">
        <div className="text-center mb-4">
          Welcome back,{" "}
          <span class="text-cyan-500 uppercase font-semibold">
            {currUser.name}
          </span>
        </div>
        <div>
          <button
            class="mt-5 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => dispatch(toggleAnswered())}
          >
            {isAnswered ? (
              <span>See Unswered Polls</span>
            ) : (
              <span>See Answered Polls</span>
            )}
          </button>
        </div>
      </div>
      <div class="mt-10 mx-auto text-center max-w-3xl px-10">
        <ul>
          {[...questions]
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((ques) => {
              return isAnswered
                ? (ques.optionOne.votes.includes(currUser.id) ||
                    ques.optionTwo.votes.includes(currUser.id)) && (
                    <div class="mb-10 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
                      <p class="mb-6 text-gray-400 uppercase text-sm text-center">
                        Would you rather
                      </p>
                      <li key={ques.id}>
                        <p class="text-xl font-semibold text-gray-900">
                          {ques.optionOne.text}
                        </p>
                        <span class="mt-6 text-gray-500">or </span>
                        <p class="text-xl font-semibold text-gray-900 pb-10">
                          {ques.optionTwo.text}
                        </p>
                        <Link
                          className="text-cyan-500 bg-white border border-cyan-500 border-2 font-bold rounded mt-4 p-2 py-3 px-4  border-transparent  shadow-sm text-sm hover:text-white hover:bg-cyan-500"
                          to={"question/" + ques.id}
                        >
                          View Your Answer
                        </Link>
                      </li>
                    </div>
                  )
                : !ques.optionOne.votes.includes(currUser.id) &&
                    !ques.optionTwo.votes.includes(currUser.id) && (
                      <div class="mb-10 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
                        <p class="mb-6 text-gray-400 uppercase text-sm">
                          Would you rather
                        </p>
                        <li key={ques.id}>
                          <p class="text-xl font-semibold text-gray-900">
                            {ques.optionOne.text}
                          </p>
                          <span class="mt-6 text-gray-500">or </span>
                          <p class="text-xl font-semibold text-gray-900 pb-10">
                            {ques.optionTwo.text}
                          </p>
                          <Link
                            className="text-cyan-500 bg-white border border-cyan-500 border-2 font-bold rounded mt-4 p-2 py-3 px-4  border-transparent  shadow-sm text-sm hover:text-white hover:bg-cyan-500"
                            to={"question/" + ques.id}
                          >
                            Answer
                          </Link>
                        </li>
                      </div>
                    );
            })}
        </ul>
      </div>
    </div>
  );
};
export default Home;
