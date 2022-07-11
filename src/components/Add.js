import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveQuestion, getQuestions } from "../features/questionsSlice";
import { getUsers } from "../features/currUserSlice";

const Add = () => {
  const dispatch = useDispatch();

  const { currUser } = useSelector((store) => store.currUser);

  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const handleOptionOne = (event) => {
    setOptionOne(event.target.value);
  };

  const handleOptionTwo = (event) => {
    setOptionTwo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const question = {
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: currUser.id,
    };

    dispatch(saveQuestion(question));
    dispatch(getQuestions());
    dispatch(getUsers());
  };

  return (
    <>
      <h1 class="text-center text-2xl mb-10 pb-5 font-extrabold tracking-tight text-gray-900">
        Add Employee Poll
      </h1>
      <form
        className="mx-auto max-w-md space-y-6 bg-white py-8 px-10 rounded-lg shadow"
        onSubmit={handleSubmit}
      >
        <h1 className="text-gray-400 font-bold uppercase text-sm pb-10">
          Would you rather:
        </h1>
        Option One:
        <input
          type="text"
          name="optionOneText"
          id="optionOneText"
          required
          onChange={handleOptionOne}
          class="block w-full px-3 py-2 border border-gray-300 
       rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
       focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        Option Two:
        <input
          type="text"
          name="optionTwoText"
          id="optionTwoText"
          required
          onChange={handleOptionTwo}
          class="block w-full px-3 py-2 border border-gray-300 
          rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
          focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        <input
          type="submit"
          value="Submit"
          className="w-full flex justify-center mt-5 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
        ></input>
      </form>
    </>
  );
};
export default Add;
