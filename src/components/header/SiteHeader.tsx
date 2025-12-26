import React from 'react';
import DesktopFluidHeader from './DesktopFluidHeader';
import MobileStaggeredMenu from './MobileStaggeredMenu';

export default function SiteHeader() {
  return (
    <>
      <div className="hidden md:block">
        <DesktopFluidHeader />
      </div>

      <div className="md:hidden">
        <MobileStaggeredMenu />
      </div>
    </>
  );
}
