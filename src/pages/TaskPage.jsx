import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTaskById } from "../api/api/taskApi";
import { deleteTask } from "../api/api/taskApi";

export const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTodo = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getTaskById(id);
        setTodo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadTodo();
  }, [id]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error || !todo) {
    return <div>{navigate("/404")}</div>;
  }

  const deleteTodo = async () => {
    try {
      setIsLoading(true);
      setError("");

      await deleteTask(id);

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const hendleUpdate = () => {
    navigate(`/task/${id}/edit`);
  };

  return (
    <div>
      <h2>Задача</h2>

      <button onClick={() => navigate(-1)}>Назад</button>

      <p>{todo.title}</p>

      <button onClick={hendleUpdate}>Редактировать</button>
      <button onClick={() => deleteTodo(id)}>Удалать</button>
    </div>
  );
};
