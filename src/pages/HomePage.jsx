import { Search } from "../components/Search";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { SortButton } from "../components/SortButton";
import { useEffect, useState } from "react";
import { useDebounce } from "../hook/useDebounce";
import { getTask, createTask } from "../api/api/taskApi";

export const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const debounceSearch = useDebounce(search, 500);

  const featchTodos = async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await getTask();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    featchTodos();
  }, []);

  const filteredTasks = tasks.filter((task) =>
    (task.title || '').toLowerCase().includes(debounceSearch.toLowerCase()),
  );

  const displayed = isSorted
    ? [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title))
    : filteredTasks;

  const handleSubmit = async (title) => {
    try {
      setError("");
      setIsLoading(true);

      await createTask(title);

      featchTodos();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TaskForm onCreate={handleSubmit} />
      <Search value={search} onChange={setSearch} />
      <SortButton isSorted={isSorted} onToggle={() => setIsSorted(!isSorted)} />
      {isLoading && <div>Загрузка...</div>}
      {error && <div>{error}</div>}
      <TaskList tasks={displayed} />
    </>
  );
};
