import { createTaskSchemaType } from "@/schemas/createTask";
import React from "react";

interface Props {
  key: number;
  task: createTaskSchemaType;
}

function TaskCard({ key, task }: Props) {
  return <div>TaskCard</div>;
}

export default TaskCard;
