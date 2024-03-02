import * as todos from "@/actions/todo";
import CreateTodoForm from "@/components/CreateTodoForm";
import TodoCard from "@/components/TodoCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LayoutGroup from "@/components/animation/layout-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AnimatePresence from "@/components/animation/animate-presence";

export default async function Home() {
  const { data } = await todos.find({});

  return (
    <main className="mt-2">
      <h1 className="my-8">Farahty Todo App</h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="my-4">Create Todo</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create Todos</SheetTitle>
            <SheetDescription>
              This application was implemented using NextJS , Tailwind CSS ,
              Shadcn UI , Drizzle ORM
            </SheetDescription>
          </SheetHeader>
          <CreateTodoForm />
        </SheetContent>
      </Sheet>
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
          <AnimatePresence mode="popLayout" initial={false}>
            {data?.map((i) => (
              <TodoCard key={i.id} todo={i} />
            ))}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </main>
  );
}
