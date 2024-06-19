import * as todos from "@/actions/todo";

import TodoCard from "@/components/TodoCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LayoutGroup from "@/components/animation/layout-group";
import AnimatePresence from "@/components/animation/animate-presence";
import CreateTodoForm from "./CreateTodoForm";

export default async function Home() {
  const results = await todos.find({});

  return (
    <main className="mt-2">
      <h1 className="my-8">Farahty Todo App</h1>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Create Todos</CardTitle>
            <CardDescription>
              This application was implemented using NextJS , Tailwind CSS ,
              Shadcn UI , Drizzle ORM
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-3">
              <CreateTodoForm />
            </div>
          </CardContent>
        </Card>

        <LayoutGroup>
          <AnimatePresence initial={false}>
            {results?.data?.map((i) => (
              <TodoCard key={i.id} todo={i} />
            ))}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </main>
  );
}
