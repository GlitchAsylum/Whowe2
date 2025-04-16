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
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
        <div className="flex items-center gap-6 rounded-sm transition-all duration-300 hover:bg-white/6 hover:backdrop-blur-md hover:shadow-lg">
        <Image
          src="/whowe_logo_noText.svg"
          alt="Whowe logo"
          width={40}
          height={40}
          priority
          className="transition-transform duration-300"
        />
        <p className="transition-colors duration-300">Whowe</p>
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
        <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <Link href="/discover" className={styles.navItem} onClick={() => setIsMobileMenuOpen(false)}>
            Discover
          </Link>
          <Link href="/stories" className={styles.navItem} onClick={() => setIsMobileMenuOpen(false)}>
            Stories
          </Link>
          <Link href="/library" className={styles.navItem} onClick={() => setIsMobileMenuOpen(false)}>
            Library
          </Link>
          <Link href="/words" className={styles.navItem} onClick={() => setIsMobileMenuOpen(false)}>
            Words
          </Link>
          <Link href="/more" className={styles.navItem} onClick={() => setIsMobileMenuOpen(false)}>
          <EllipsisVerticalIcon className="h-8 w-8 text-white hover:text-blue-500" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
