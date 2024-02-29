import { getTodos } from "@/actions/todo";

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="mt-2">
      <h1>Farahty home page</h1>

      <div>
        <div>test data</div>
        <div>
          {todos.map((i) => (
            <div key={i.id}> {i.text} </div>
          ))}
        </div>
      </div>
    </main>
  );
}
