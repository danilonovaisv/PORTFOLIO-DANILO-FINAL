/* eslint-disable @next/next/no-img-element */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import PortfolioHeroNew from '@/components/portfolio/PortfolioHeroNew';
import { useMotionGate } from '@/hooks/useMotionGate';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { RESPONSIVE_VIDEOS } from '@/lib/video-assets';


// Mock hooks
jest.mock('@/hooks/useMotionGate');
jest.mock('@/hooks/useMediaQuery');
jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ priority: _priority, unoptimized: _unoptimized, fill: _fill, loader: _loader, quality: _quality, placeholder: _placeholder, blurDataURL: _blurDataURL, ...props }: any) => {
         
        return <img {...props} alt="Next Image Mock" />;
    },
}));
jest.mock('@/components/ui/shared/ResponsiveVideo', () => ({
    ResponsiveVideo: ({ desktopSrc, mobileSrc }: { desktopSrc: string; mobileSrc: string }) => (
        <div data-testid="dynamic-video" data-desktop-src={desktopSrc} data-mobile-src={mobileSrc}>
            Mock Video
        </div>
    ),
}));

describe('PortfolioHeroNew Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders video component when reduced motion is false', () => {
        (useMotionGate as jest.Mock).mockReturnValue(false);
        (useMediaQuery as jest.Mock).mockReturnValue(false); // Desktop

        render(<PortfolioHeroNew />);

        const videoElement = screen.getByTestId('dynamic-video');
        expect(videoElement).toBeInTheDocument();
        expect(videoElement).toHaveAttribute('data-desktop-src', RESPONSIVE_VIDEOS.portfolioHero.desktop);
    });

    it('renders static image when reduced motion is true', () => {
        (useMotionGate as jest.Mock).mockReturnValue(true);
        (useMediaQuery as jest.Mock).mockReturnValue(false);

        render(<PortfolioHeroNew />);

        const img = screen.getByRole('img', { hidden: true }); // aria-hidden="true" is on the image
        expect(img).toBeInTheDocument();
        expect(screen.queryByTestId('dynamic-video')).not.toBeInTheDocument();
    });

    it('uses mobile asset key when isMobile is true', () => {
        (useMotionGate as jest.Mock).mockReturnValue(false);
        (useMediaQuery as jest.Mock).mockReturnValue(true); // Mobile

        render(<PortfolioHeroNew />);

        const videoElement = screen.getByTestId('dynamic-video');
        expect(videoElement).toHaveAttribute('data-mobile-src', RESPONSIVE_VIDEOS.portfolioHero.mobile);
    });

    it('uses desktop asset key when isMobile is false', () => {
        (useMotionGate as jest.Mock).mockReturnValue(false);
        (useMediaQuery as jest.Mock).mockReturnValue(false); // Desktop

        render(<PortfolioHeroNew />);

        const videoElement = screen.getByTestId('dynamic-video');
        expect(videoElement).toHaveAttribute('data-desktop-src', RESPONSIVE_VIDEOS.portfolioHero.desktop);
    });
});
