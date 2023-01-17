<script lang="ts">
  import Logo from '@components/Logo.svelte';
</script>

<svelte:head>
  <title>Home | Kanpas</title>
</svelte:head>
<div class="flex-column-center flex">
  <div class="logo-wrap">
    <Logo mode="adaptive"></Logo>
  </div>
  <h1>Dashboard</h1>
</div>

<style>
  .logo-wrap {
    width: 256px;
    aspect-ratio: 1/1;
    opacity: 0.2;
  }
</style>
