import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  isLoadingSelector,
  errorSelector,
  currentTaskSelector,
} from '../selectors';
import { useSelector, useDispatch } from 'react-redux';
import { loadTaskById, updateTaskThunk } from '../store/actions/tasksActions';

export const UpdatePage = () => {
  const [value, setValue] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const task = useSelector(currentTaskSelector);
  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);

  useEffect(() => {
    dispatch(loadTaskById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (task) {
      setValue(task.title);
    }
  }, [task]);

  const handleSave = async () => {
    if (!value.trim()) {
      return;
    }

    await dispatch(updateTaskThunk(id, value.trim()));
    navigate(`/`);
  };

  return (
    <div>
      {isLoading && <div>Загрузка...</div>}
      {error && <div>{error}</div>}
      <h2>Редактирование</h2>
      <div>
        <button onClick={() => navigate(-1)}>Назад </button>
      </div>

      <textarea value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
};
