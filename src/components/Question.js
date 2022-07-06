import { useHistory, useParams } from "react-router-dom";

const Question = () => {
  //const { currPage } = useSelector((store) => store.currPage);
  const { id } = useParams();
  return <div>{id}</div>;
};
export default Question;
