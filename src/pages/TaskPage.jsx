import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  currentTaskSelector,
  errorSelector,
  isLoadingSelector,
} from '../selectors';
import { loadTaskById, deleteTaskThunk } from '../store/actions/tasksActions';

export const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const task = useSelector(currentTaskSelector);
  const error = useSelector(errorSelector);
  const isLoading = useSelector(isLoadingSelector);

  useEffect(() => {
    dispatch(loadTaskById(id));
  }, [id, dispatch]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error || !task) {
    return (
      <div>
        <p>Задача не найдена</p>
        <button onClick={() => navigate('/')}>На главную</button>
      </div>
    );
  }

  const deleteTodo = async () => {
    await dispatch(deleteTaskThunk(id));
    navigate('/');
  };

  const handleUpdate = () => {
    navigate(`/task/${id}/edit`);
  };

  return (
    <div>
      <h2>Задача</h2>

      <button onClick={() => navigate(-1)}>Назад</button>

      <p>{task.title}</p>

      <button onClick={handleUpdate}>Редактировать</button>
      <button onClick={deleteTodo}>Удалить</button>
    </div>
  );
};
