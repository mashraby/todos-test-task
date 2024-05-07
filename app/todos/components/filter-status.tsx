"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statuses } from "@/constants";
import { useStatusStore } from "@/store/use-status";

export function FilterStatus() {
  const { setStatus } = useStatusStore();

  const onChange = (value: string) => setStatus(value);

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statuses.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
