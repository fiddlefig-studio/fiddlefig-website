<template>
  <div class="hero">
    <div class="content">
      <h1 class="heading u-main-heading u-mb-[2.5vw]">
        <slot name="title" />
      </h1>
      <p class="subheading">
        <slot />
      </p>
    </div>
    <div class="blob blob-left">
      <BlobOne />
    </div>
    <div class="blob blob-lower-right">
      <BlobFive />
    </div>
    <div class="main-shape u-relative">
      <HeroBlob />
    </div>
    <div class="blob blob-lower-left">
      <BlobTwo />
    </div>
    <div class="blob blob-lower-left-2">
      <BlobThree />
    </div>
    <div class="blob blob-top-right">
      <BlobSix />
    </div>
    <div class="blob blob-lower-right-2">
      <BlobFour />
    </div>
  </div>
</template>

<script lang="ts" setup="">
</script>

<style scoped>
.hero {
  --size-ratio: 95vw;

  position: relative;
}

.content {
  align-items: center;
  color: theme('colors.white');
  display: flex;
  font-size: theme('fontSize.20');
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 53%;
  position: absolute;
  text-align: center;
  transform: translateX(-50%);
  top: 0;
  width: 88%;
  z-index: 2;

  @screen tablet {
    left: 60%;
    width: clamp(22.75rem, 0.474 * var(--size-ratio), 1000rem)
  }
}

.heading {
  text-align: center;
}

.subheading {
  font-size: clamp(14px, 1.4vw, 100px);
  max-width: 26em;
}

.main-shape {
  color: theme('colors.purple');
  width: var(--size-ratio);
  --blob-width: var(--size-ratio);
}

.blob {
  position: absolute;
  z-index: 0;
}

.blob-left {
  --blob-color: theme('colors.orange');
  top: calc(50%);
  height: 100%;
  transform-origin: left center;
  transform: translateY(-50%) scale(0.9);
  > svg {
    height: 100%;
  }
}

.blob-lower-left {
  --blob-color: theme('colors.pink');
  bottom: -10%;
  left: calc(0.06 * var(--size-ratio));
  > svg {
    height: calc(0.088 * var(--size-ratio));
  }
}

.blob-lower-left-2 {
  --blob-color: theme('colors.purple-light');
  left: calc(0.18 * var(--size-ratio));
  bottom: 0;
  > svg {
    height: calc(0.135 * var(--size-ratio));
  }
}

.blob-top-right {
  --blob-color: theme('colors.orange');
  top: 0;
  left: calc(0.82 * var(--size-ratio));
  > svg {
    height: calc(0.09 * var(--size-ratio));
  }
}

.blob-lower-right {
  --blob-color: theme('colors.blue-light');
  bottom: 21%;
  left: calc(0.935 * var(--size-ratio));
  > svg {
    height: calc(0.08 * var(--size-ratio));
  }
}

.blob-lower-right-2 {
  --blob-color: theme('colors.turquoise');
  bottom: 0;
  left: calc(0.9 * var(--size-ratio));
  > svg {
    height: calc(0.06 * var(--size-ratio));
  }
}
</style>
