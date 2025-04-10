// components/Navbar.js

'use client';
import Image from "next/image";
import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

// Make sure the component is properly defined as a function
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
                <Image
                  src="/whowe_logo.svg"
                  alt="Whowe logo"
                  width={40}
                  height={40}
                  priority
                />
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
          <Link href="/" className={styles.navItem} onClick={() => setIsMobileMenuOpen(false)}>
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
          <Link href="/contact" className={styles.navItem} onClick={() => setIsMobileMenuOpen(false)}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
