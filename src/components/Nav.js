import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/currUserSlice";

const Nav = () => {
  const dispatch = useDispatch();

  const nonactive = "text-gray-500";

  const active = "text-black font-bold";

  const location = useLocation();

  return (
    <>
      <nav className="flex justify-center pt-2 pb-12 space-x-10 text-md uppercase">
        <Link to="/" className={location.pathname === "/" ? active : nonactive}>
          Home
        </Link>
        <span className="px-.5">|</span>
        <Link
          to="/add"
          className={location.pathname === "/add" ? active : nonactive}
        >
          Add Poll
        </Link>
        <span className="px-.5">|</span>
        <Link
          to="/leaderboard"
          className={location.pathname === "/leaderboard" ? active : nonactive}
        >
          Leaderboard
        </Link>
        <span className="px-.5">|</span>
        <button onClick={() => dispatch(setUser(""))}>
          <span className="text-md uppercase text-gray-500 ">Logout</span>
        </button>
      </nav>
    </>
  );
};
export default Nav;
