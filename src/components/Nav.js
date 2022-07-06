import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  makeHome,
  makeLogin,
  makeLeaderboard,
  makeAdd,
} from "../features/currPageSlice";


const Nav = () => {
  //const { currPage } = useSelector((store) => store.currPage);
  const dispatch = useDispatch();

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={() => dispatch(makeHome)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/add" onClick={() => dispatch(makeAdd)}>
              Add Poll
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" onClick={() => dispatch(makeLeaderboard)}>
              Leaderboard
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={() => dispatch(makeLogin)}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
          
        </ul>
      </nav>
    </div>
  );
};
export default Nav;
