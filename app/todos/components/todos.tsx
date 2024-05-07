import React from "react";
import Container from "../../../components/shared/container";
import { TodosTable } from "./todos-table";
import { Modal } from "./modal";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";
import { auth } from "@clerk/nextjs/server";
import { ITodo } from "@/types";
import { FilterStatus } from "./filter-status";
import { FilterPriority } from "./filter-priority";

const getTodos = async (userId: string) => {
  let todos: ITodo[] = [];

  const q = query(collection(db, "todos"), where("user_id", "==", userId));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    todos.push({ ...doc.data(), id: doc.id } as ITodo);
  });

  return todos;
};

const TodosSection = async () => {
  const { userId } = auth();

  const todos = await getTodos(userId!);

  return (
    <section className="mt-20">
      <Container>
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl">Todos</h1>
          <Modal />
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <FilterStatus />
            <FilterPriority />
          </div>
        </div>
        <TodosTable todos={todos || []} />
      </Container>
    </section>
  );
};

export default TodosSection;
