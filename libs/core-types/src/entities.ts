export type Project = {
  id: string;
  name: string;
  tasks: Task[];
};

export type Task = {
  description: string;
  id: string;
  name: string;
  status: 'done' | 'in-progress' | 'todo';
};
