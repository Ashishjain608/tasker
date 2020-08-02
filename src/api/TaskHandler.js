import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getAllTasks = () => instance.get("/tasks");

export const updateTask = async (taskId, payload) =>
  instance.put(`/task/${taskId}`, payload);

export const createTask = async (payload) => instance.post("/task", payload);

export const deleteTask = async (taskId) => instance.delete(`/task/${taskId}`);

const TaskHandler = {
  getAllTasks,
  updateTask,
  deleteTask,
  createTask,
};

export default TaskHandler;
