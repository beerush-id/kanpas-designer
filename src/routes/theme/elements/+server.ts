import { nanoid } from 'nanoid';

export async function GET() {
  return new Promise(resolve => {
    setTimeout(() => {
      // resolve(new Response(JSON.stringify(groups)));
      resolve(new Response(JSON.stringify([
        {
          id: nanoid(8),
          name: 'Todo 1',
          done: false
        },
        {
          id: nanoid(8),
          name: 'Todo 2',
          done: false
        },
        {
          id: nanoid(8),
          name: 'Todo 3',
          done: false
        },
        {
          id: nanoid(8),
          name: 'Todo 4',
          done: false
        },
        {
          id: nanoid(8),
          name: 'Todo 5',
          done: false
        },
      ])));
    }, 1000);
  });
}
