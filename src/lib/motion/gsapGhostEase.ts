import gsap from 'gsap';
import { CustomEase } from 'gsap/dist/CustomEase';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(CustomEase);
}

export const GSAP_GHOST_EASE = CustomEase.create('ghostEase', '0.22,1,0.36,1');
