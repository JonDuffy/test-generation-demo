// TaskManager.ts

interface Task {
    id: number;
    title: string;
    completed: boolean;
  }
  
  class TaskManager {
    private tasks: Task[] = [];
    private currentId = 0;
  
    createTask(title: string): Task {
      const newTask: Task = { id: ++this.currentId, title, completed: false };
      this.tasks.push(newTask);
      return newTask;
    }
  
    getTasks(): Task[] {
      return this.tasks;
    }
  
    updateTask(id: number, title: string, completed: boolean): Task | null {
      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) {
        return null;
      }
      this.tasks[taskIndex] = { ...this.tasks[taskIndex], title, completed };
      return this.tasks[taskIndex];
    }
  
    deleteTask(id: number): boolean {
      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) {
        return false;
      }
      this.tasks.splice(taskIndex, 1);
      return true;
    }
  }
  
export { TaskManager };
export type { Task };