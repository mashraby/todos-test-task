"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVertical,
  Pencil,
  Plus,
  RefreshCcw,
  Trash,
} from "lucide-react";
import { ITodo } from "@/types";
import { Button } from "@/components/ui/button";
import { useAlertStore } from "@/store/use-alert";
import { AlertDialogDemo } from "./warning-modal";
import { useState } from "react";
import { StatusSelect } from "@/app/todos/components/status-select";
import { useModalStore } from "@/store/use-modal";
import { EditModal } from "./edit-modal";
import { useStatusStore } from "@/store/use-status";
import { usePriorityStore } from "@/store/use-priority";

export function TodosTable({ todos }: { todos: ITodo[] }) {
  const { setOpen } = useAlertStore();
  const { setOpen: setEditOpen } = useModalStore();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [todo, setTodo] = useState<ITodo | null>(null);

  const { status } = useStatusStore();
  const { priority } = usePriorityStore();

  const onOpenAlert = (todo: ITodo) => {
    setOpen(true);
    setDeleteId(todo.id);
  };

  const openEditModal = (todo: ITodo) => {
    setEditOpen(true);
    setTodo(todo);
  };

  const filteredArr = todos.filter(
    (todo) => todo.status == status || todo.priority == priority
  );

  return (
    <>
      {!todos.length ? (
        <div className="flex items-center justify-center mt-8 flex-col gap-2">
          <h1 className="text-2xl font-semibold">you have not tasks :(</h1>
          <p className="text-gray-400">
            Add your tasks and make your work easier :)
          </p>
        </div>
      ) : (
        <>
          <EditModal todo={todo} />
          <AlertDialogDemo id={deleteId} />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">№</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(filteredArr.length ? filteredArr : todos).map((todo, i) => (
                <TableRow key={todo.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="font-medium">{todo.title}</TableCell>
                  <TableCell>
                    <StatusSelect
                      item={todo}
                      id={todo.id}
                      defaultValue={todo.status}
                    />
                  </TableCell>
                  <TableCell>{todo.priority}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => openEditModal(todo)}>
                          <Pencil className="mr-2 h-4 w-4" /> <span>Edit</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => onOpenAlert(todo)}>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
}
