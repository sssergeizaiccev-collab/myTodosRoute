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

  const filteredTasks = tasks.filter((task) =>
    (task.title || '').toLowerCase().includes(debounceSearch.toLowerCase()),
  );

  const displayed = isSorted
    ? [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title))
    : filteredTasks;

  const handleSubmit = (title) => {
    dispatch(addTask(title));
  };

  return (
    <>
      <TaskForm onCreate={handleSubmit} />
      <Search
        value={search}
        onChange={(value) => dispatch(searchTasks(value))}
      />
      <SortButton
        isSorted={isSorted}
        onToggle={() => dispatch(toggleSorttasks())}
      />
      {isLoading && <div>Загрузка...</div>}
      {error && <div>{error}</div>}
      <TaskList tasks={displayed} />
    </>
  );
};
