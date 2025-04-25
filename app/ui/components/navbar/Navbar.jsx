'use client';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { XMarkIcon, Bars3Icon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    console.log('Toggling menu, new state:', !isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className="flex justify-between items-center px-5 py-3 max-w-7xl mx-auto w-full">
        <Link href="/" className={styles.logo}>
          <div className="flex items-center gap-3 px-4 py-2 rounded-sm text-[#C6E1E7] transition-all duration-300 hover:bg-white/6 hover:backdrop-blur-md hover:shadow-lg hover:text-white">
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
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6 text-[#C6E1E7] hover:bg-white/6 hover:backdrop-blur-md hover:shadow-lg hover:text-white cursor-pointer" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-[#C6E1E7] hover:bg-white/6 hover:backdrop-blur-md hover:shadow-lg hover:text-white cursor-pointer" />
          )}
        </button>
        <div
          className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileOpen : ''} flex gap-x-2 md:gap-x-2 gap-y-4 text-[#C6E1E7] text-sm`}
        >
          <Link
            href="/discover"
            className={`${styles.navLink} px-4 py-2 rounded-sm hover:bg-white/6 hover:text-white transition-all duration-300 active:scale-98`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Discover
          </Link>
          <Link
            href="/stories"
            className={`${styles.navLink} px-4 py-2 rounded-sm hover:bg-white/6 hover:text-white transition-all duration-300 active:scale-98`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Stories
          </Link>
          <Link
            href="/library"
            className={`${styles.navLink} px-4 py-2 rounded-sm hover:bg-white/6 hover:text-white transition-all duration-300 active:scale-98`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Library
          </Link>
          <Link
            href="/words"
            className={`${styles.navLink} px-4 py-2 rounded-sm hover:bg-white/6 hover:text-white transition-all duration-300 active:scale-98`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Words
          </Link>
          <Link
            href="/more"
            className={`${styles.navLink} px-4 py-2 rounded-sm hover:bg-white/6 hover:text-white transition-all duration-300 active:scale-98`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <EllipsisVerticalIcon className="h-5 w-5 text-[#C6E1E7]" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;