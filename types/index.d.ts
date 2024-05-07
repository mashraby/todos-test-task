import { ReactNode } from "react";

type Children = {
  children: ReactNode;
};

type Status = "todo" | "backlog" | "in progress" | "done" | "canceled";
type Priority = "LOW" | "MEDIUM" | "HIGH";

interface ITodo {
  id: any;
  user_id: string;
  title: string;
  status: Status;
  priority: Priority;
}
