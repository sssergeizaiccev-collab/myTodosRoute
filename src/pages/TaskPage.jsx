<<<<<<< HEAD
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  currentTaskSelector,
  errorSelector,
  isLoadingSelector,
} from '../selectors';
import { loadTaskById, deleteTaskThunk } from '../store/actions/tasksActions';
=======
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTaskById } from "../api/api/taskApi";
import { deleteTask } from "../api/api/taskApi";
>>>>>>> fedce30e21e979eb8220974d68c48681a41b37cb

export const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
<<<<<<< HEAD
  const dispatch = useDispatch();

  const task = useSelector(currentTaskSelector);
  const error = useSelector(errorSelector);
  const isLoading = useSelector(isLoadingSelector);

  useEffect(() => {
    dispatch(loadTaskById(id));
  }, [id, dispatch]);
=======

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
>>>>>>> fedce30e21e979eb8220974d68c48681a41b37cb

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

<<<<<<< HEAD
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
=======
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
>>>>>>> fedce30e21e979eb8220974d68c48681a41b37cb
  };

  const hendleUpdate = () => {
    navigate(`/task/${id}/edit`);
  };

  return (
    <div>
      <h2>Задача</h2>

<<<<<<< HEAD
      <button onClick={() => navigate(-1)}>Назад </button>

      <p>{task.title}</p>

      <button onClick={hendleUpdate}>Редактировать</button>
      <button onClick={deleteTodo}>Удалать</button>
=======
      <button onClick={() => navigate(-1)}>Назад</button>

      <p>{todo.title}</p>

      <button onClick={hendleUpdate}>Редактировать</button>
      <button onClick={() => deleteTodo(id)}>Удалать</button>
>>>>>>> fedce30e21e979eb8220974d68c48681a41b37cb
    </div>
  );
};
