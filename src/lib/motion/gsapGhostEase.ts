import gsap from 'gsap';
import { CustomEase } from 'gsap/dist/CustomEase';

export const GSAP_GHOST_EASE =
  typeof window !== 'undefined'
    ? (() => {
        gsap.registerPlugin(CustomEase);
        return CustomEase.create('ghostEase', '0.22,1,0.36,1');
      })()
    : 'power4.out';
