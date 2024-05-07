"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase/config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoveDownLeft, MoveLeft, MoveUpLeft, Plus } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/use-modal";
import { ITodo } from "@/types";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  priority: z.string(),
});

export function EditModal({ todo }: { todo: ITodo | null }) {
  const { open, setOpen } = useModalStore();
  const { refresh } = useRouter();

  const onClose = () => setOpen(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: todo?.title,
      priority: todo?.priority,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const ref = doc(db, "todos", todo?.id);

    const promise = setDoc(ref, {
      ...todo,
      title: data.title,
      priority: data.priority,
    }).then(() => {
      refresh();
      onClose();
    });

    toast.promise(promise, {
      loading: "Loading...",
      success: "Updated todo.",
      error: "Something went wrong, please try again!",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit todo</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              defaultValue={todo?.title as string}
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl className="w-full">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              defaultValue={todo?.priority as string}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} {...field}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="flex" value="HIGH">
                          <MoveUpLeft className="w-4 h-4" />
                          <span>HIGH</span>
                        </SelectItem>
                        <SelectItem value="MEDIUM">
                          <MoveLeft className="w-4 h-4" />
                          <span>MEDIUM</span>
                        </SelectItem>
                        <SelectItem value="LOW">
                          <MoveDownLeft className="w-4 h-4" />
                          <span>LOW</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="flex justify-end" type="submit">
              Edit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
