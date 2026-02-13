/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/jest-globals';
import { PortfolioModal } from '@/components/portfolio/PortfolioModal';
import { PortfolioProject, ProjectCategory } from '@/types/project';
import { useBodyLock } from '@/hooks/useBodyLock';

// Mock dependencies
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    },
    AnimatePresence: ({ children }: any) => children,
    useReducedMotion: () => false,
}));
jest.mock('next/image', () => ({
    __esModule: true,

    // eslint-disable-next-line @next/next/no-img-element
    default: (props: any) => <img {...props} />,
}));
jest.mock('lucide-react', () => ({
    X: () => <span>Close Icon</span>,
}));
jest.mock('@/hooks/useBodyLock', () => ({
    useBodyLock: jest.fn(),
}));
jest.mock('@/components/ui/ErrorBoundary', () => ({
    __esModule: true,
    default: ({ children }: any) => children,
}));
jest.mock('@/components/portfolio/content/TypeAContent', () => ({
    __esModule: true,
    default: () => <div>Type A Content</div>,
}));
jest.mock('@/components/portfolio/content/TypeBContent', () => ({
    __esModule: true,
    default: () => <div>Type B Content</div>,
}));

// Test Portfolio Modal Accessibility & Functionality
describe('PortfolioModal Component', () => {
    const mockProject: PortfolioProject = {
        id: '1',
        slug: 'test-project',
        title: 'Test Project',
        shortDescription: 'A test project description',
        displayCategory: 'Design',
        category: 'branding' as ProjectCategory, // Valid category
        thumbnailMedia: '/img.jpg',
        image: '/img.jpg',
        type: 'A',
        client: 'Client A',
        year: 2024, // Number, not string
        featuredOnPortfolio: false,
        layout: {
            size: 'md',
            objectFit: 'cover',
            cols: 'col-span-12 md:col-span-6', // Required prop
            height: 'h-[400px]', // Required prop
        },
    };

    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly when open', () => {
        render(<PortfolioModal isOpen={true} onClose={mockOnClose} project={mockProject} />);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByLabelText('Fechar modal')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
        const { container } = render(<PortfolioModal isOpen={false} onClose={mockOnClose} project={mockProject} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('locks body scroll when open', () => {
        render(<PortfolioModal isOpen={true} onClose={mockOnClose} project={mockProject} />);
        expect(useBodyLock).toHaveBeenCalledWith(true);
    });

    it('calls onClose when close button is clicked', () => {
        render(<PortfolioModal isOpen={true} onClose={mockOnClose} project={mockProject} />);
        fireEvent.click(screen.getByLabelText('Fechar modal'));
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('calls onClose when Escape key is pressed', () => {
        render(<PortfolioModal isOpen={true} onClose={mockOnClose} project={mockProject} />);
        fireEvent.keyDown(document, { key: 'Escape' });
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('has correct ARIA attributes', () => {
        render(<PortfolioModal isOpen={true} onClose={mockOnClose} project={mockProject} />);
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-modal', 'true');
        // We expect aria-labelledby to point to the title if present, logic depends on implementation details
        // Assuming titleId is generated based on slug. We just check if it has the attribute.
        expect(dialog).toHaveAttribute('aria-labelledby');
    });
});
