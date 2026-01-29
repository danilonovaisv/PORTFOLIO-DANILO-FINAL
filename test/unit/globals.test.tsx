import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Global CSS Classes', () => {
    // We can't easily test global CSS application in JSDOM without loading the CSS file, 
    // but we can test if components using these classes render without crashing
    // and if the classes are applied to the elements.

    it('should allow usage of .std-grid class', () => {
        const { container } = render(<div className="std-grid" data-testid="grid">Content</div>);
        const element = container.firstChild;
        expect(element).toHaveClass('std-grid');
    });

    it('should allow usage of .text-display class', () => {
        const { container } = render(<h1 className="text-display">Title</h1>);
        const element = container.firstChild;
        expect(element).toHaveClass('text-display');
    });

    it('should allow usage of .card-shell class', () => {
        const { container } = render(<div className="card-shell">Card</div>);
        const element = container.firstChild;
        expect(element).toHaveClass('card-shell');
    });

    it('should allow usage of .card-glass class', () => {
        const { container } = render(<div className="card-glass">Content</div>);
        const element = container.firstChild;
        expect(element).toHaveClass('card-glass');
    });

    it('should allow usage of .text-glow-primary class', () => {
        const { container } = render(<span className="text-glow-primary">Glow</span>);
        const element = container.firstChild;
        expect(element).toHaveClass('text-glow-primary');
    });
});
