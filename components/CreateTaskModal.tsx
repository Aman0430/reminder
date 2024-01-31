"use client";
import { collection } from "@prisma/client";
import React from "react";

interface Props {
  open: boolean;
  collection: collection;
  setOpen: (open: boolean) => void;
}

function CreateTaskModal({ open, collection, setOpen }: Props) {
  return <div>CreateTaskModal</div>;
}

export default CreateTaskModal;
