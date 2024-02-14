import { TaskManager } from "./taskManager";
// Assuming TaskManager and Task interface are defined in TaskManager.ts

const taskManager = new TaskManager();

const handleRequest = async (req: Request, taskManager: TaskManager): Promise<Response> => {
  const url = new URL(req.url);
  const path = url.pathname;
  const method = req.method;

  // Create a new task
  if (path === "/tasks" && method === "POST") {
    const { title } = await req.json();
    const newTask = taskManager.createTask(title);
    return new Response(JSON.stringify(newTask), { headers: { "Content-Type": "application/json" } });
  }

  // Get all tasks
  if (path === "/tasks" && method === "GET") {
    const tasks = taskManager.getTasks();
    return new Response(JSON.stringify(tasks), { headers: { "Content-Type": "application/json" } });
  }

  // Update a task
  if (path.startsWith("/tasks/") && method === "PUT") {
    const taskId = parseInt(path.split("/")[2]);
    const { title, completed } = await req.json();
    const updatedTask = taskManager.updateTask(taskId, title, completed);
    if (!updatedTask) {
      return new Response("Task not found", { status: 404 });
    }
    return new Response(JSON.stringify(updatedTask), { headers: { "Content-Type": "application/json" } });
  }

  // Delete a task
  if (path.startsWith("/tasks/") && method === "DELETE") {
    const taskId = parseInt(path.split("/")[2]);
    const success = taskManager.deleteTask(taskId);
    if (!success) {
      return new Response("Task not found", { status: 404 });
    }
    return new Response("Task deleted");
  }

  // Not Found
  return new Response("Not Found", { status: 404 });
};

const server = Bun.serve({
  port: 3000,
  fetch: (req) => handleRequest(req, taskManager), // Inject taskManager into the request handler
});

console.log(`Server running at http://localhost:${server.port}`);