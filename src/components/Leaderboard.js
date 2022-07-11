import { useSelector } from "react-redux";

const Leaderboard = () => {
  const { users } = useSelector((store) => store.currUser);
  const { questions } = useSelector((store) => store.questions);

  const getNumQues = (userid) => {
    const authQues = questions.filter((ques) => {
      return ques.author === userid;
    });
    return authQues.length;
  };

  const getAllUsers = () => {
    const userKeys = Object.keys(users);
    let initUsers = [];
    userKeys.map((userKey) => {
      return initUsers.push(users[userKey]);
    });
    const allUsers = initUsers.map((user) => ({
      ...user,
      numQues: getNumQues(user.id),
      numAns: Object.keys(user.answers).length,
      numTot: getNumQues(user.id) + Object.keys(user.answers).length,
      numStars: "*".repeat(
        getNumQues(user.id) + Object.keys(user.answers).length
      ),
    }));

    return allUsers;
  };

  return (
    <div className="py-2 min-h-screen">
      <h1 class="text-center text-2xl mb-10 font-extrabold tracking-tight text-gray-900">
        Leader Board
      </h1>
      {[...getAllUsers()]
        .sort((a, b) => b.numTot - a.numTot)
        .map((user) => {
          return (
            <div class="mx-auto max-w-xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div class="flex justify-center text-center px-4 pt-4">
                <ul key={user.id}>
                  <li>
                    <img
                      className="mb-3 w-24 h-24 rounded-full shadow-lg mx-auto"
                      src={user.avatarURL}
                      alt="profile"
                    ></img>
                  </li>
                  <li class="mb-2 text-2xl font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </li>

                  <li className="text-sm text-gray-500 dark:text-gray-400">
                    {user.numQues} Question(s)
                  </li>
                  <li className="text-sm text-gray-500 dark:text-gray-400">
                    {user.numAns} Answers(s)
                  </li>

                  <li className="pt-3 pb-2 text-lg font-semibold">
                    {user.numTot} Total point(s)
                  </li>
                  <li className="text-yellow-400 text-3xl font-bold">
                    {user.numStars}
                  </li>

                  <hr />
                </ul>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default Leaderboard;
