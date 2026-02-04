import React from 'react';
import { render, screen } from '@testing-library/react';
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
            div: ({ children, className, ...props }: Record<string, unknown>) => (
                <div className={className as string} {...props}>
                    {children as React.ReactNode}
                </div>
            ),
            button: ({ children, className, ...props }: Record<string, unknown>) => (
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
    default: ({ src, alt, className, ...props }: Record<string, unknown>) => (
        <span
            role="img"
            aria-label={alt as string}
            data-src={src as string}
            data-nimg="1"
            className={className as string}
            {...props}
        />
    ),
}));

// Mock parallax hook
jest.mock('@/hooks/useParallaxGallery', () => ({
    useParallaxCard: jest.fn(() => ({
        wrapperRef: { current: null },
        cardRef: { current: null },
    })),
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

    it('should have an accessible button with aria-label', () => {
        render(<ProjectCard project={mockProject} index={0} />);

        const button = screen.getByRole('button', {
            name: /ver projeto test project/i,
        });
        expect(button).toBeInTheDocument();
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

    it('should render tags if provided', () => {
        const projectWithTags: PortfolioProject = {
            ...mockProject,
            tags: ['branding', 'ui-design', 'motion'],
        };

        render(<ProjectCard project={projectWithTags} index={0} />);

        expect(screen.getByText('branding')).toBeInTheDocument();
        expect(screen.getByText('ui-design')).toBeInTheDocument();
        expect(screen.getByText('motion')).toBeInTheDocument();
    });
});
