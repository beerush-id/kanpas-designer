<script lang="ts">
  import { reactive } from '@beerush/reactor';

  type Todo = {
    id: number,
    name: string;
    done: boolean;
  }

  const todos = reactive<Todo[], true>([]);

  const add = () => {
    todos.push({ id: new Date().getTime(), name: 'Todo', done: false });
    console.log('Todo added.');
  };

  console.log('Rendering svelte todos...');
</script>

<svelte:head>
  <title>Features | Kanpas</title>
</svelte:head>

<div style="width: 100vw; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center">
  <ul>
    {#each $todos as { name, done }, i}
      {console.log(`${i + 1}. Rendering new todo...`) || ''}
      <li style:text-decoration={done ? 'line-through' : ''}
          on:click={() => done = !done} on:keypress>{i + 1}. {name}{done ? ' - Done' : ''}</li>
    {:else}
      <li>Let's add some todo!</li>
    {/each}
  </ul>
  <form action="">
    {#each $todos as { id, name, done }}
      <input id="{id}" type="checkbox" bind:checked={done}>
      <label for="{id}">{name}</label><br>
    {/each}
  </form>
  <button on:click={add}>Add Todo</button>
</div>
