export const TODOS_URL = "http://localhost:3005/task";

export const getTask = async () => {
  const res = await fetch(TODOS_URL);

  if (!res.ok) {
    throw new Error("Ошибка запроса");
  }

  return res.json();
};

export const getTaskById = async (id) => {
  const res = await fetch(`${TODOS_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Задача не найдена ");
  }

  return res.json();
};

export const createTask = async (title) => {
  const res = await fetch(TODOS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    throw new Error("Ошибка добавления задачи");
  }

  return res.json();
};

export const updateTask = async (id, title) => {
  const res = await fetch(`${TODOS_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    throw new Error("ОШибка редактирования задачи");
  }

  return res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${TODOS_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Ошибка удаления задачи");
  }

  return res.json();
};
