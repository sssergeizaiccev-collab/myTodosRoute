<<<<<<< HEAD
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
=======
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
>>>>>>> fedce30e21e979eb8220974d68c48681a41b37cb
  };

  return (
    <div>
<<<<<<< HEAD
      {isLoading && <div>Загрузка...</div>}
      {error && <div>{error}</div>}
      <h2>Редактирование</h2>
      <div>
        <button onClick={() => navigate(-1)}>Назад </button>
      </div>
=======
      <h2>Редактирование</h2>
>>>>>>> fedce30e21e979eb8220974d68c48681a41b37cb

      <textarea value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
};
