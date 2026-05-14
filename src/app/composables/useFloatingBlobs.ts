import type { Ref } from 'vue';
import { onBeforeUnmount, onMounted } from 'vue';

interface FloatingBlobState {
  el: HTMLElement
  currentX: number
  currentY: number
  minX: number
  maxX: number
  minY: number
  maxY: number
  fromX: number
  fromY: number
  targetX: number
  targetY: number
  moveStartTime: number
  moveDuration: number
  baseDuration: number
  hasStarted: boolean
  initialDelay: number
}

interface FloatingBlobOptions {
  selector?: string
  initialDelay?: number
  staggerDelay?: number
  defaultBoundX?: number
  defaultBoundY?: number
  defaultDuration?: number
}

export function useFloatingBlobs(
  rootRef: Ref<HTMLElement | null>,
  options: FloatingBlobOptions = {},
) {
  const selector = options.selector ?? '[data-floating-blob]';
  const initialDelay = options.initialDelay ?? 250;
  const staggerDelay = options.staggerDelay ?? 140;
  const defaultBoundX = options.defaultBoundX ?? 20;
  const defaultBoundY = options.defaultBoundY ?? 24;
  const defaultDuration = options.defaultDuration ?? 5;

  let animationFrame = 0;
  let floatingBlobs: FloatingBlobState[] = [];
  let reducedMotionQuery: MediaQueryList | null = null;

  function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
  }

  function parseMotionNumber(value: string | undefined, fallback: number) {
    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function parseMotionAxisRange(
    symmetricBound: number,
    minStr?: string,
    maxStr?: string,
  ) {
    const hasAsym = minStr !== undefined || maxStr !== undefined;

    if (!hasAsym) {
      return { min: -symmetricBound, max: symmetricBound };
    }

    const fallbackMin = -symmetricBound;
    const fallbackMax = symmetricBound;
    const minCandidate = parseMotionNumber(minStr, fallbackMin);
    const maxCandidate = parseMotionNumber(maxStr, fallbackMax);

    return {
      min: Math.min(minCandidate, maxCandidate),
      max: Math.max(minCandidate, maxCandidate),
    };
  }

  function randomBetween(min: number, max: number) {
    return min + (Math.random() * (max - min));
  }

  function easeInOutSine(progress: number) {
    return -(Math.cos(Math.PI * progress) - 1) / 2;
  }

  function resetFloatingBlobs() {
    floatingBlobs.forEach(({ el }) => {
      el.style.setProperty('--motion-x', '0px');
      el.style.setProperty('--motion-y', '0px');
    });
  }

  function prefersReducedMotion() {
    return reducedMotionQuery?.matches ?? false;
  }

  function animateFloatingBlobs(timestamp: number) {
    if (prefersReducedMotion()) {
      animationFrame = 0;
      resetFloatingBlobs();
      return;
    }

    floatingBlobs.forEach((blob) => {
      if (!blob.hasStarted) {
        if (timestamp < blob.initialDelay) {
          blob.el.style.setProperty('--motion-x', '0px');
          blob.el.style.setProperty('--motion-y', '0px');
          return;
        }

        blob.hasStarted = true;
        blob.moveStartTime = timestamp;
        blob.targetX = randomBetween(blob.minX, blob.maxX);
        blob.targetY = randomBetween(blob.minY, blob.maxY);
      }

      const elapsed = timestamp - blob.moveStartTime;
      const progress = clamp(elapsed / blob.moveDuration, 0, 1);
      const easedProgress = easeInOutSine(progress);

      blob.currentX = blob.fromX + ((blob.targetX - blob.fromX) * easedProgress);
      blob.currentY = blob.fromY + ((blob.targetY - blob.fromY) * easedProgress);

      if (progress >= 1) {
        blob.fromX = blob.currentX;
        blob.fromY = blob.currentY;
        blob.targetX = randomBetween(blob.minX, blob.maxX);
        blob.targetY = randomBetween(blob.minY, blob.maxY);
        blob.moveStartTime = timestamp;
        blob.moveDuration = randomBetween(blob.baseDuration * 0.75, blob.baseDuration * 1.25);
      }

      blob.el.style.setProperty('--motion-x', `${blob.currentX.toFixed(2)}px`);
      blob.el.style.setProperty('--motion-y', `${blob.currentY.toFixed(2)}px`);
    });

    animationFrame = window.requestAnimationFrame(animateFloatingBlobs);
  }

  function stopFloatingBlobMotion() {
    window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;
  }

  function startFloatingBlobMotion() {
    if (!rootRef.value || prefersReducedMotion()) {
      resetFloatingBlobs();
      return;
    }

    const blobElements = rootRef.value.querySelectorAll<HTMLElement>(selector);

    floatingBlobs = Array.from(blobElements).map((el, index) => {
      const boundX = parseMotionNumber(el.dataset.boundX, defaultBoundX);
      const boundY = parseMotionNumber(el.dataset.boundY, defaultBoundY);
      const rangeX = parseMotionAxisRange(boundX, el.dataset.motionMinX, el.dataset.motionMaxX);
      const rangeY = parseMotionAxisRange(boundY, el.dataset.motionMinY, el.dataset.motionMaxY);
      const baseDuration = parseMotionNumber(el.dataset.driftDuration, defaultDuration) * 1000;

      return {
        el,
        currentX: 0,
        currentY: 0,
        minX: rangeX.min,
        maxX: rangeX.max,
        minY: rangeY.min,
        maxY: rangeY.max,
        fromX: 0,
        fromY: 0,
        targetX: 0,
        targetY: 0,
        moveStartTime: 0,
        moveDuration: baseDuration,
        baseDuration,
        hasStarted: false,
        initialDelay: initialDelay + (index * staggerDelay),
      };
    });

    animationFrame = window.requestAnimationFrame(animateFloatingBlobs);
  }

  function handleMotionPreferenceChange() {
    stopFloatingBlobMotion();
    startFloatingBlobMotion();
  }

  onMounted(() => {
    reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    reducedMotionQuery.addEventListener('change', handleMotionPreferenceChange);

    startFloatingBlobMotion();
  });

  onBeforeUnmount(() => {
    stopFloatingBlobMotion();

    if (!reducedMotionQuery) {
      return;
    }

    reducedMotionQuery.removeEventListener('change', handleMotionPreferenceChange);
  });
}
