<script lang="ts">
  import Canvas from '@components/Canvas.svelte';
  import ImmersiveOption from '@components/common/ImmersiveOption.svelte';

  fetch('', {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  }).then(console.log);
</script>
<ImmersiveOption title="Components"></ImmersiveOption>
<Canvas></Canvas>
