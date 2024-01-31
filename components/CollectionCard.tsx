"use client";
import { Task, collection } from "@prisma/client";
import React, { useState, useTransition } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { CaretDownIcon, CaretUpIcon, TrashIcon } from "@radix-ui/react-icons";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import PlusIcon from "./icons/PlusIcon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { toast } from "./ui/use-toast";
import { deleteCollection } from "@/actions/collection";
import { useRouter } from "next/navigation";
import CreateTaskModal from "./CreateTaskModal";

interface Props {
  collection: collection & {
    tasks: Task[];
  };
}

function CollectionCard({ collection }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const [isLoading, startTransition] = useTransition();

  const [showCreateModal, setShowCreateModal] = useState(false);

  const removeCollection = async () => {
    try {
      await deleteCollection(collection.id);
      toast({
        title: "Success",
        description: "Successfully delete collection",
      });
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Cannot delete collection",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <CreateTaskModal
        open={showCreateModal}
        setOpen={setShowCreateModal}
        collection={collection}
      />
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant={"ghost"}
            className={cn(
              "flex w-full justify-between p-6",
              isOpen && "rounded-b-none",
              CollectionColors[collection.color as CollectionColor]
            )}
          >
            <span>{collection.name}</span>
            {!isOpen && <CaretDownIcon className="h-6 w-6" />}
            {isOpen && <CaretUpIcon className="h-6 w-6" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg">
          {collection.tasks.length === 0 && <div>No Tasks</div>}
          {collection.tasks.length > 0 && (
            <>
              <Progress className="rounded-none" value={45} />
              <div className="p-4 gap-3 flex flex-col">
                {collection.tasks.map((task) => (
                  <div key={task.id}>{task.content}</div>
                ))}
              </div>
            </>
          )}
          <Separator />
          <footer className="h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex justify-between items-center">
            <p>Created @ {collection.createdAt.toLocaleDateString("en-US")}</p>
            {isLoading && <div>Deleting...</div>}
            {!isLoading && (
              <div>
                <Button
                  variant={"ghost"}
                  onClick={() => setShowCreateModal(true)}
                >
                  <PlusIcon />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={"ghost"} size={"icon"}>
                      <TrashIcon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    Are you absolutely sure?
                    <AlertDialogDescription>
                      This action will delete your collection permanently and
                      tasks inside it.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => startTransition(removeCollection)}
                      >
                        Proceed
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </footer>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}

export default CollectionCard;
