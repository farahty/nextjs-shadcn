"use client";
import { useAction } from "next-safe-action/hooks";
import { Button } from "./ui/button";
import * as todos from "@/actions/todo";
import { FC, useCallback, useState } from "react";
import { Todo } from "@/db/todo";
import { Loader2, X } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import AnimatedDiv from "./animation/animated-div";

const TodoCard: FC<{ todo: Todo }> = ({ todo }) => {
  const [checked, setChecked] = useState(todo.isCompleted ?? false);
  const { execute: removeTodo, status } = useAction(todos.remove);
  const { execute: toggle } = useAction(todos.toggle);
  const onChecked = useCallback(
    function () {
      setChecked(!checked);
      toggle({ id: todo.id, state: !checked });
    },
    [todo.id, checked]
  );

  return (
    <AnimatedDiv
      layout
      initial={{ y: -200, opacity: 0, overflow: "hidden" }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      exit={{
        height: 0,
        opacity: 0,
        marginTop: 0,
      }}
      key={todo.id}
      className="px-2 mt-3 border rounded hover:bg-muted flex items-center"
    >
      <Checkbox checked={checked} onClick={onChecked} id={`check-${todo.id}`} />
      <label
        className={cn("flex-grow mx-2 p-3", {
          "line-through": checked,
        })}
        htmlFor={`check-${todo.id}`}
      >
        {todo.text}
      </label>
      {status === "executing" && <Loader2 className="animate-spin" />}
      <Button
        variant="ghost"
        className="group"
        disabled={status === "executing"}
        onClick={() => {
          removeTodo(todo.id);
        }}
      >
        <X className="group-active:scale-90" />
      </Button>
    </AnimatedDiv>
  );
};

export default TodoCard;
