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
import { addDoc, collection } from "firebase/firestore";

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

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  priority: z.string(),
});

export function Modal() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const promise = addDoc(collection(db, "todos"), {
      user_id: user?.id,
      title: data.title,
      status: "todo",
      priority: data.priority,
    }).then(() => {
      router.refresh();
      form.reset();
      onClose();
    });

    toast.promise(promise, {
      loading: "Loading...",
      success: "Created a new todo",
      error: "Something went wrong, please try again!",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={onOpen}>
          <span>Add Todo</span> <Plus className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new todo</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
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
              Add todo
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
