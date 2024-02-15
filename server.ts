interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const tasks: Task[] = []; // This will act as our in-memory database
let currentId = 0;

const handleRequest = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const path = url.pathname;
  const method = req.method;

  // Create a new task
  if (path === "/tasks" && method === "POST") {
    const { title } = await req.json();
    const newTask: Task = { id: ++currentId, title, completed: false };
    tasks.push(newTask);
    return new Response(JSON.stringify(newTask), { headers: { "Content-Type": "application/json" } });
  }

  // Get all tasks
  if (path === "/tasks" && method === "GET") {
    return new Response(JSON.stringify(tasks), { headers: { "Content-Type": "application/json" } });
  }

  // Update a task
  if (path.startsWith("/tasks/") && method === "PUT") {
    const taskId = parseInt(path.split("/")[2]);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
      return new Response("Task not found", { status: 404 });
    }
    const { title, completed } = await req.json();
    tasks[taskIndex] = { ...tasks[taskIndex], title, completed };
    return new Response(JSON.stringify(tasks[taskIndex]), { headers: { "Content-Type": "application/json" } });
  }

  // Delete a task
  if (path.startsWith("/tasks/") && method === "DELETE") {
    const taskId = parseInt(path.split("/")[2]);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
      return new Response("Task not found", { status: 404 });
    }
    tasks.splice(taskIndex, 1);
    return new Response("Task deleted");
  }

  // Not Found
  return new Response("Not Found", { status: 404 });
};

const server = Bun.serve({
  port: 3000,
  fetch: handleRequest,
});

console.log(`Server running at http://localhost:${server.port}`);