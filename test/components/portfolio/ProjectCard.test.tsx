import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { PortfolioProject } from '@/types/project';

// Mock Next Router
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
}));

// Mock Framer Motion
jest.mock('framer-motion', () => {
    const mockMotionValue = {
        get: jest.fn(() => 0),
        on: jest.fn(() => () => { }),
        onChange: jest.fn(() => () => { }),
        stop: jest.fn(),
        destroy: jest.fn(),
    };

    return {
        motion: {
            div: ({ children, className, initial: _initial, whileInView: _whileInView, viewport: _viewport, transition: _transition, ...props }: any) => (
                <div className={className as string} {...props}>
                    {children as React.ReactNode}
                </div>
            ),
            button: ({ children, className, initial: _initial, whileInView: _whileInView, viewport: _viewport, transition: _transition, ...props }: any) => (
                <button className={className as string} {...props}>
                    {children as React.ReactNode}
                </button>
            ),
        },
        useScroll: jest.fn(() => ({
            scrollYProgress: mockMotionValue,
        })),
        useTransform: jest.fn(() => mockMotionValue),
        useReducedMotion: jest.fn(() => false),
    };
});

// Mock Next/Image
jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, className, fill: _fill, priority, sizes: _sizes, loader: _loader, ...props }: any) => (
        <span
            role="img"
            aria-label={alt as string}
            data-src={src as string}
            data-nimg="1"
            className={className as string}
            data-priority={priority ? 'true' : undefined}
            {...props}
        />
    ),
}));

const mockProject: PortfolioProject = {
    id: '1',
    slug: 'test-project',
    title: 'Test Project',
    client: 'Test Client',
    category: 'web',
    displayCategory: 'Web Design',
    year: 2024,
    image: '/test-image.jpg',
    type: 'B',
    layout: {
        cols: 'col-span-1',
        height: 'h-[400px]',
    },
};

describe('ProjectCard', () => {
    it('should render the project title and category overlay', () => {
        render(<ProjectCard project={mockProject} index={0} />);

        expect(screen.getByText('Test Project')).toBeInTheDocument();
        expect(screen.getByText('Web Design')).toBeInTheDocument();
    });

    it('should render the client and year in the overlay', () => {
        render(<ProjectCard project={mockProject} index={0} />);

        expect(screen.getByText('Test Client')).toBeInTheDocument();
        expect(screen.getByText('2024')).toBeInTheDocument();
    });

    it('should have an accessible button with name', () => {
        render(<ProjectCard project={mockProject} index={0} />);

        const button = screen.getByRole('button', {
            name: /test project/i,
        });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('id', 'portfolio-card-test-project-0');
    });

    it('should apply priority loading for first 3 items', () => {
        const { rerender } = render(
            <ProjectCard project={mockProject} index={0} priority={true} />
        );

        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('data-nimg');

        rerender(<ProjectCard project={mockProject} index={5} priority={false} />);
        expect(screen.getByRole('img')).toBeInTheDocument();
    });



    it('should prioritize internal landing route click when landingPageSlug exists', () => {
        const onClick = jest.fn();
        const openSpy = jest
            .spyOn(window, 'open')
            .mockImplementation(() => null);

        const landingProject: PortfolioProject = {
            ...mockProject,
            category: 'Landing Page',
            link: 'https://example.com/external-landing',
            landingPageSlug: 'internal-landing',
        };

        render(<ProjectCard project={landingProject} index={0} onClick={onClick} />);

        fireEvent.click(screen.getByRole('button', { name: /test project/i }));

        expect(onClick).toHaveBeenCalledWith(landingProject);
        expect(openSpy).not.toHaveBeenCalled();
        openSpy.mockRestore();
    });

    it('should open external landing links when no internal landingPageSlug exists', () => {
        const onClick = jest.fn();
        const openSpy = jest
            .spyOn(window, 'open')
            .mockImplementation(() => null);

        const externalLandingProject: PortfolioProject = {
            ...mockProject,
            category: 'Landing Page',
            link: 'https://example.com/external-landing',
            landingPageSlug: undefined,
        };

        render(
            <ProjectCard project={externalLandingProject} index={0} onClick={onClick} />
        );

        fireEvent.click(screen.getByRole('button', { name: /test project/i }));

        expect(openSpy).toHaveBeenCalledWith(
            'https://example.com/external-landing',
            '_blank',
            'noopener,noreferrer'
        );
        expect(onClick).not.toHaveBeenCalled();
        openSpy.mockRestore();
    });
});
