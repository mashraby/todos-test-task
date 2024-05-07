"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { priorities } from "@/constants";
import { usePriorityStore } from "@/store/use-priority";

export function FilterPriority() {
  const { setPriority } = usePriorityStore();

  const onChange = (value: string) => setPriority(value);

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="filter by priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {priorities.map((p) => (
            <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
