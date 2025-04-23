// components/Navbar.js

'use client';
import Image from "next/image";
import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

// Make sure the component is properly defined as a function
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className="flex justify-between px-5 py-3">
        <Link href="/" className={styles.logo}>
        <div className="flex pr-4 pl-3 py-2 items-center gap-3 rounded-sm transition-all duration-300 hover:bg-white/6 hover:backdrop-blur-md hover:shadow-lg">
          <Image
            src="/whowe_logo_noText.svg"
            alt="Whowe logo"
            width={16}
            height={16}
            priority
          />
          <p>Whowe</p>
        </div>
        </Link>
        {/* Hamburger Menu Button (Mobile) */}
        <button  
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburger}></span>
        </button>

        {/* Navigation Links */}
        <div className={`${isMobileMenuOpen ? styles.mobileOpen : ''} flex gap-3 items-center`}>
          <Link href="/discover" className="text-sm text-white tracking-wider px-4 py-2 rounded-sm no-underline transition-all duration-300 hover:bg-white/6 active:scale-95" onClick={() => setIsMobileMenuOpen(false)}>
            Discover
          </Link>
          <Link href="/stories" className="text-sm text-white tracking-wider px-4 py-2 rounded-sm no-underline transition-all duration-300 hover:bg-white/6 active:scale-95" onClick={() => setIsMobileMenuOpen(false)}>
            Stories
          </Link>
          <Link href="/library" className="text-sm text-white tracking-wider px-4 py-2 rounded-sm no-underline transition-all duration-300 hover:bg-white/6 active:scale-95" onClick={() => setIsMobileMenuOpen(false)}>
            Library
          </Link>
          <Link href="/words" className="text-sm text-white tracking-wider px-4 py-2 rounded-sm no-underline transition-all duration-300 hover:bg-white/6 active:scale-95" onClick={() => setIsMobileMenuOpen(false)}>
            Words
          </Link>
          <Link href="/more" className="text-sm text-white tracking-wider px-4 py-2 rounded-sm no-underline transition-all duration-300 hover:bg-white/6 active:scale-95" onClick={() => setIsMobileMenuOpen(false)}>
          <EllipsisVerticalIcon className="h-6 w-6 text-white" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
