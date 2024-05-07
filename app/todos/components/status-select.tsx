"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { statuses } from "@/constants";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ITodo } from "@/types";

export function StatusSelect({
  defaultValue,
  id,
  item,
}: {
  defaultValue: string;
  id: string;
  item: ITodo;
}) {
  const [selectedStatus, setSelectedStatus] = useState<string>(defaultValue);
  const { refresh } = useRouter();

  const onChangeFn = (value: string) => {
    setSelectedStatus(value);

    const ref = doc(db, "todos", id);

    const promise = setDoc(ref, {
      ...item,
      status: value,
    }).then(() => refresh());

    toast.promise(promise, {
      loading: "loading...",
      success: "Status successfully changed.",
      error: "Something went wrong, please try again.",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {selectedStatus}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedStatus}
          onValueChange={(value) => onChangeFn(value)}
        >
          {statuses.map((status) => (
            <DropdownMenuRadioItem value={status.value}>
              <status.icon className="mr-2 h-4 w-4" />{" "}
              <span>{status.value}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
