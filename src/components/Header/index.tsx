import React from 'react';
import { useMediaQuery } from 'react-responsive';

const Header: React.FC = () => {
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

    return (
        <header className="header">
            {isDesktop ? (
                // Desktop View with WebGL Fluid Glass Effect
                <div className="desktop-header">
                    <Canvas>
                        {/* WebGL implementation for fluid glass effect */}
                    </Canvas>
                    <nav>
                        <ul>
                            <li><a href="#">home</a></li>
                            <li><a href="#">sobre</a></li>
                            <li><a href="#">portfolio showcase</a></li>
                            <li><a href="#">contato</a></li>
                        </ul>
                    </nav>
                </div>
            ) : (
                // Mobile View with Staggered Fullscreen Menu
                <div className="mobile-header">
                    <nav>
                        <ul>
                            <li><a href="#">home</a></li>
                            <li><a href="#">sobre</a></li>
                            <li><a href="#">portfolio showcase</a></li>
                            <li><a href="#">contato</a></li>
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;