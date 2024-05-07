"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { db } from "@/firebase/config";
import { useAlertStore } from "@/store/use-alert";
import { ITodo } from "@/types";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AlertDialogDemo({ id }: { id: string | null }) {
  const { open, setOpen } = useAlertStore();
  const { refresh } = useRouter();

  const onDelete = () => {
    const promise = deleteDoc(doc(db, "todos", id as string)).then(() => {
      refresh();
    });

    toast.promise(promise, {
      loading: "deleting...",
      success: "Todo successfully deleted.",
      error: "Something went wrong, please try again.",
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete it, you may not be able to restore it! If you still
            want to delete, click delete!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
