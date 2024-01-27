import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CreateCollectionSideBar({ open, onOpenChange }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new collection</SheetTitle>
          <SheetDescription>
            Collections are a way to group your tasks
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default CreateCollectionSideBar;
