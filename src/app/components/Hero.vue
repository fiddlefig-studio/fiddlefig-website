<template>
  <div ref="heroRef" class="hero">
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
    <div class="main-shape u-relative">
      <HeroBlob />
    </div>
    <div
      class="blob blob-lower-left floating-blob"
      data-floating-blob
      data-bound-x="26"
      data-bound-y="34"
      data-drift-duration="4.3"
    >
      <BlobTwo />
    </div>
    <div
      class="blob blob-lower-left-2 floating-blob"
      data-floating-blob
      data-bound-x="38"
      data-bound-y="42"
      data-drift-duration="5.2"
    >
      <BlobThree />
    </div>
    <div
      class="blob blob-top-right floating-blob"
      data-floating-blob
      data-bound-x="34"
      data-bound-y="34"
      data-motion-min-x="-38"
      data-motion-max-x="8"
      data-motion-min-y="-12"
      data-motion-max-y="36"
      data-drift-duration="3.9"
    >
      <BlobSix />
    </div>
    <div
      class="blob blob-lower-right floating-blob"
      data-floating-blob
      data-bound-x="32"
      data-bound-y="36"
      data-drift-duration="4.5"
    >
      <BlobFive />
    </div>
    <div
      class="blob blob-lower-right-2 floating-blob"
      data-floating-blob
      data-bound-x="28"
      data-bound-y="32"
      data-drift-duration="4.1"
    >
      <BlobFour />
    </div>
  </div>
</template>

<script lang="ts" setup="">
import { ref } from 'vue';
import { useFloatingBlobs } from '~/app/composables/useFloatingBlobs';

const heroRef = ref<HTMLElement | null>(null);

useFloatingBlobs(heroRef);
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
  --blob-width: 165vw;
  color: theme('colors.purple');
  width: 100vw;
  height: auto;
  transform: translateX(-34vw);

  @screen phone-wide {
    --blob-width: 133vw;
    color: #4B418A;
    width: 100vw;
    height: auto;
    transform: translateX(-19vw);
  }

  @screen tablet {
    transform: unset;
    width: var(--blob-width);
    --blob-width: var(--size-ratio);
  }
}

.blob {
  position: absolute;
  z-index: 0;
}

.floating-blob {
  --base-transform: translate3d(0, 0, 0);

  transform: var(--base-transform) translate3d(var(--motion-x, 0px), var(--motion-y, 0px), 0);
  will-change: transform;
}

.blob-left {
  --blob-color: theme('colors.orange');
  --blob-width: calc(0.63 * var(--size-ratio));
  top: calc(50%);
  left: -16vw;
  transform: translateY(-50%);

  @screen phone-wide {
    left: -10vw;
    --blob-width: calc(0.5 * var(--size-ratio));
  }

  @screen tablet {
    --blob-width: calc(0.35 * var(--size-ratio));
    left: 0;
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
  --base-transform: translateX(40%);
  --blob-color: theme('colors.purple-light');
  --blob-width: calc(0.2 * var(--size-ratio));
  bottom: -10px;
  left: calc(0.12 * var(--size-ratio));

  @screen tablet {
    bottom: 0;
    left: calc(0.18 * var(--size-ratio));
    --blob-width: calc(0.135 * var(--size-ratio));
  }
}

.blob-top-right {
  --blob-color: theme('colors.orange');
  --blob-width: calc(0.18 * var(--size-ratio));
  right: calc(-0.04 * var(--size-ratio));
  top: 0;

  @screen tablet {
    --blob-width: calc(0.14 * var(--size-ratio));
    right: calc(0.06 * var(--size-ratio));
    top: 50px;
  }
}

.blob-lower-right {
  --blob-color: theme('colors.blue-light');
  --blob-width: calc(0.12 * var(--size-ratio));
  bottom: -20px;
  right: calc(-0.03 * var(--size-ratio));

  @screen tablet {
    --blob-color: theme('colors.blue-light');
    --blob-width: calc(0.07 * var(--size-ratio));
    bottom: 21%;
    right: calc(0.05 * var(--size-ratio));
  }
}

.blob-lower-right-2 {
  --blob-color: theme('colors.turquoise');
  --blob-width: calc(0.09 * var(--size-ratio));
  bottom: -50px;
  right: calc(0.16 * var(--size-ratio));

  @screen tablet {
    --blob-width: calc(0.06 * var(--size-ratio));
    bottom: -40px;
    right: calc(0.1 * var(--size-ratio));
  }
}

/*
--blob-color: theme('colors.turquoise');
  --blob-width: calc(0.09 * var(--size-ratio));
  bottom: -40px;
  right: calc(0.04 * var(--size-ratio));
 */
</style>
