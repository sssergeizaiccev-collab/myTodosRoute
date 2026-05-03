import { Route, Routes, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { TaskPage } from "./pages/TaskPage";
import { NotFound } from "./pages/NotFoundPage";
import { UpdatePage } from './pages/UpdatePage';
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/task/:id" element={<TaskPage />} />
      <Route path="/task/:id/edit" element={<UpdatePage/>} />
      <Route path="*" element={<Navigate to="/404" replace />} />
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
}

export default App;
