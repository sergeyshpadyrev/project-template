export type Task = {
  id: string;
  name: string;
  description: string;
  status: "todo" | "in-progress" | "done";
};

export type Project = {
  id: string;
  name: string;
  tasks: Task[];
};
