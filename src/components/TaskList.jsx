import { TaskCard } from "./TaskCard";

export const TaskList = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
