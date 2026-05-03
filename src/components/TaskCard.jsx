import { Link } from "react-router-dom";

export const TaskCard = ({ task }) => {
  return (
    <Link to={`/task/${task.id}`}>
      <div>{task.title}</div>
    </Link>
  );
};
