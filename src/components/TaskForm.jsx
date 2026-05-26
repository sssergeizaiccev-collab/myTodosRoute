import { useState } from "react";

export const TaskForm = ({ onCreate }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    onCreate(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите задачу"
      />
      <button type="submit">Добавить</button>
    </form>
  );
};
