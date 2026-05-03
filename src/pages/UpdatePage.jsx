import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateTask, getTaskById } from "../api/api/taskApi";

export const UpdatePage = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTodo = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getTaskById(id);
        setValue(data.title);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadTodo();
  }, [id]);

  const handleSave = async () => {
    if (!value.trim()) {
      setError("Задача не может быть пустой");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      await updateTask(id, value);

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Редактирование</h2>

      <textarea value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
};
