import { prisma } from '@/db';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function createTodo(data: FormData) {
  'use server';

  const title = data.get('title')?.valueOf();
  if (typeof title !== 'string' || title.length === 0) {
    throw new Error('Invaild title');
  }

  await prisma.todo.create({
    data: { title, complete: false },
  });
  redirect('/');
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">New</h1>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col">
        <input
          type="text"
          name="title"
          className="bg-transparent border rounded"
        ></input>
        <div className="flex gap-1 justify-end my-3">
          <Link
            className="border rounded bg-transparent mx-1 px-2 py-1"
            href=".."
          >
            Cancel
          </Link>
          <button
            className="border rounded bg-transparent px-2 py-1"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
