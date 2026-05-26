<<<<<<< HEAD
import { Search } from '../components/Search';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { SortButton } from '../components/SortButton';
import { useEffect } from 'react';
import { useDebounce } from '../hook/useDebounce';
import { useSelector, useDispatch } from 'react-redux';
import { loadTasks, addTask } from '../store/actions/tasksActions';
import {
  tasksSelector,
  errorSelector,
  isLoadingSelector,
  filtersIsSortedSelector,
  filtersSearchSelector,
} from '../selectors';
import { searchTasks, toggleSorttasks } from '../store/actions/filterActions';

export const HomePage = () => {
  const search = useSelector(filtersSearchSelector);
  const isSorted = useSelector(filtersIsSortedSelector);
  const tasks = useSelector(tasksSelector);
  const error = useSelector(errorSelector);
  const isLoading = useSelector(isLoadingSelector);

  const dispatch = useDispatch();

  const debounceSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);
=======
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
>>>>>>> fedce30e21e979eb8220974d68c48681a41b37cb

  const filteredTasks = tasks.filter((task) =>
    (task.title || '').toLowerCase().includes(debounceSearch.toLowerCase()),
  );

  const displayed = isSorted
    ? [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title))
    : filteredTasks;

<<<<<<< HEAD
  const handleSubmit = (title) => {
    dispatch(addTask(title));
=======
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
>>>>>>> fedce30e21e979eb8220974d68c48681a41b37cb
  };

  return (
    <>
      <TaskForm onCreate={handleSubmit} />
<<<<<<< HEAD
      <Search
        value={search}
        onChange={(value) => dispatch(searchTasks(value))}
      />
      <SortButton
        isSorted={isSorted}
        onToggle={() => dispatch(toggleSorttasks())}
      />
=======
      <Search value={search} onChange={setSearch} />
      <SortButton isSorted={isSorted} onToggle={() => setIsSorted(!isSorted)} />
>>>>>>> fedce30e21e979eb8220974d68c48681a41b37cb
      {isLoading && <div>Загрузка...</div>}
      {error && <div>{error}</div>}
      <TaskList tasks={displayed} />
    </>
  );
};
