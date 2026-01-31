'use client';

import Image from 'next/image';
import { ContentBlock } from './data';

interface OriginInfoBlockProps {
  block: ContentBlock & { img: string | undefined };
}

export function OriginInfoBlock({ block }: OriginInfoBlockProps) {
  return (
    <div className="arch__info min-h-screen lg:h-[120vh] flex flex-col justify-center mb-24 lg:mb-0 items-center text-center lg:items-end lg:text-right">
      <div className="content w-full lg:max-w-130 flex flex-col gap-8 lg:transform lg:-translate-y-[15%]">
        <div className="mobile-text-container space-y-6">
          <h2 className="text-h1 font-bold leading-[1.1] text-primary normal-case">
            {block.title}
          </h2>
          <p className="text-[16px] md:text-[18px] lg:text-[20px] font-normal leading-[1.7] text-[#fcffff] opacity-75">
            {block.desc}
          </p>
        </div>

        <div className="mobile-img-container lg:hidden relative mt-8 w-full aspect-square min-h-60 rounded-3xl overflow-hidden bg-[#060018] shadow-2xl">
          <Image
            src={block.img || '/placeholder-image.jpg'}
            alt={block.alt}
            fill
            className="w-full h-full object-cover will-change-transform"
            sizes="(max-width: 1024px) 100vw, 560px"
            priority={block.id === '1'}
          />
        </div>
      </div>
    </div>
  );
}

interface OriginStickyGalleryProps {
  blocks: (ContentBlock & { img: string | undefined })[];
  archRightRef: React.RefObject<HTMLDivElement | null>;
}

export function OriginStickyGallery({
  blocks,
  archRightRef,
}: OriginStickyGalleryProps) {
  return (
    <div
      className="arch__right hidden lg:flex col-span-6 h-screen sticky top-0 items-center justify-center"
      ref={archRightRef}
    >
      <div className="relative w-full aspect-square max-w-140">
        {blocks.map((block) => (
          <div
            key={`desktop-img-${block.id}`}
            className="img-wrapper absolute inset-0 rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] bg-[#040013]"
          >
            <Image
              src={block.img || '/placeholder-image.jpg'}
              alt={block.alt}
              fill
              className="w-full h-full object-cover will-change-transform"
              sizes="(min-width: 1024px) 560px, 100vw"
              priority={block.id === '1'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
