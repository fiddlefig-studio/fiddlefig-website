// @ts-expect-error CaptainCSS doesn't yet export any types so TypeScript doesn't like it. It wasn't us to write a declaration module, but ideally CaptainCSS would just support types in future
import { pxToRemPair } from '@captaincss/captaincss/helpers';

export const fontFamily = {
  title: ['cooper-black-std', 'sans-serif'],
  body: ['Domine', 'sans-serif'],
};

export const fontSize = {
  // Create map of fonts with px keys and rem values, e.g. { 16: 1rem, 32: 2rem }
  ...pxToRemPair(70),
  ...pxToRemPair(55),
  ...pxToRemPair(45),
  ...pxToRemPair(26),
  ...pxToRemPair(20),
  ...pxToRemPair(18),
  ...pxToRemPair(16),
  ...pxToRemPair(14),
  ...pxToRemPair(12),
  ...pxToRemPair(10),
  ...pxToRemPair(1),
};

export const lineHeight = {
  tight: '1.2',
  normal: '1.6',
};
