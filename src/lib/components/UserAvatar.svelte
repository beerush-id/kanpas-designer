<script>
  import PopUp from '@components/common/PopUp.svelte';

  let className = '';
  export { className as class };
</script>

<div class="kanpas-user-avatar {className}">
  <PopUp>Profile</PopUp>
</div>

<style lang="scss">
  .kanpas-user-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: var(--kanpas-color-grey-500);
    background-image: url('https://avatars.githubusercontent.com/u/1680665?s=400&v=4');
    background-size: cover;
    cursor: pointer;
  }
</style>
