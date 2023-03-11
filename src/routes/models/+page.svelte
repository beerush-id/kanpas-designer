<script lang="ts">
  import Canvas from '@components/Canvas.svelte';
  import ImmersiveOption from '@components/common/ImmersiveOption.svelte';
</script>

<ImmersiveOption title="Models"></ImmersiveOption>
<Canvas>
  <div class="device">
    <div class="device-frame">
      <div class="device-front-face"></div>
      <div class="device-back-face"></div>
      <div class="device-left-face"></div>
      <div class="device-right-face"></div>
      <div class="device-top-face"></div>
      <div class="device-bottom-face"></div>
      <div class="device-screen"></div>
    </div>
  </div>
</Canvas>

<style lang="scss">
  .device {
    perspective: 1000px;
    perspective-origin: 50% 50%;
  }

  .device-frame {
    position: relative;
    transform: rotateX(0deg) rotateY(-45deg) rotateZ(0deg);
    transform-style: preserve-3d;
    --device-thickness: 24px;
  }

  .device-front-face,
  .device-back-face,
  .device-left-face,
  .device-top-face,
  .device-bottom-face,
  .device-right-face {
    position: absolute;
  }

  .device-front-face {
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    top: -10px;
    left: -10px;
    background-color: #000;
    border-radius: 36px;
    box-shadow: inset 0 0 1px 3px rgba(255, 255, 255, 0.3);
  }

  .device-left-face {
    width: 100%;
    height: 100%;
  }

  .device-back-face {
    width: calc(100% + 38px);
    height: calc(100% + 38px);
    margin-top: -19px;
    margin-left: -19px;
    transform: translateZ(-24px);
    border-radius: 56px;
    background-color: #111;
    z-index: 0;
  }

  .device-left-face, .device-right-face {
    width: 38px;
    height: calc(100% + 20px);
    top: -10px;
  }

  .device-left-face {
    left: 0;
    transform: translateZ(-24px) rotateY(270deg);
    transform-origin: center left;
  }

  .device-right-face {
    right: 0;
    transform-origin: center right;
    transform: translateZ(-48px) rotateY(-90deg);
    z-index: 1;

    &:before, &:after {
      content: "";
      display: block;
      width: 10px;
      height: 48px;
      border-radius: 2px;
      background-color: #fff;
      position: absolute;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
    }

    &:before {
      top: 20%;
    }

    &:after {
      top: calc(20% + 48px + 24px);
      height: 96px;
    }
  }

  .device-screen {
    width: 320px;
    height: 640px;
    position: relative;
    z-index: 1;
    background-color: rgba(255, 255, 255, 1);
    opacity: 0.9;
    border-radius: 24px;
  }
</style>
