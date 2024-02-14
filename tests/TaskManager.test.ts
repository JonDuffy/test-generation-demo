import { describe, expect, test, beforeEach } from 'bun:test';
import { TaskManager } from '../taskManager';

describe('TaskManager', () => {
  let taskManager: TaskManager;

  beforeEach(() => {
    taskManager = new TaskManager();
  });

  test('createTask adds a new task', () => {
    const task = taskManager.createTask('Test Task');
    expect(task).toEqual({ id: 1, title: 'Test Task', completed: false });
  });

  test('getTasks returns all tasks', () => {
    taskManager.createTask('Test Task 1');
    taskManager.createTask('Test Task 2');
    const tasks = taskManager.getTasks();
    expect(tasks.length).toBe(2);
    expect(tasks[0].title).toBe('Test Task 1');
    expect(tasks[1].title).toBe('Test Task 2');
  });

  test('updateTask updates a task', () => {
    taskManager.createTask('Test Task');
    const updated = taskManager.updateTask(1, 'Updated Test Task', true);
    expect(updated).toEqual({ id: 1, title: 'Updated Test Task', completed: true });
  });

  test('deleteTask removes a task', () => {
    taskManager.createTask('Test Task');
    const success = taskManager.deleteTask(1);
    expect(success).toBe(true);
    expect(taskManager.getTasks().length).toBe(0);
  });

  test('updateTask returns null for non-existent task', () => {
    const updated = taskManager.updateTask(999, 'Non-existent', false);
    expect(updated).toBeNull();
  });

  test('deleteTask returns false for non-existent task', () => {
    const success = taskManager.deleteTask(999);
    expect(success).toBe(false);
  });
});