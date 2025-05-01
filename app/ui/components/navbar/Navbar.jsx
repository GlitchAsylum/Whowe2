'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { XMarkIcon, Bars3Icon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const firstDropdownItemRef = useRef(null);

  const toggleMobileMenu = () => {
    console.log('Toggling menu, new state:', !isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isDropdownOpen) setIsDropdownOpen(false); // Close dropdown when toggling mobile menu
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen && firstDropdownItemRef.current) {
      // Move focus to the first dropdown item when opening
      setTimeout(() => firstDropdownItemRef.current.focus(), 0);
    }
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    if (dropdownButtonRef.current) {
      dropdownButtonRef.current.focus(); // Return focus to button
    }
  };

  // Handle keyboard navigation for dropdown
  const handleDropdownKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeDropdown();
    }
  };

  // Close dropdown and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle Escape key to close menus
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
        if (dropdownButtonRef.current) {
          dropdownButtonRef.current.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.navbarContainer}>
        <div className="flex justify-between items-center px-5 py-3 mx-auto w-full">
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
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <div className="px-4 py-2 rounded-sm hover:bg-white/6 hover:backdrop-blur-md hover:shadow-lg hover:text-white cursor-pointer">
                <XMarkIcon className="h-6 w-6 text-[#C6E1E7]" />
              </div>
            ) : (
              <div className="px-4 py-2 rounded-sm hover:bg-white/6 hover:backdrop-blur-md hover:shadow-lg hover:text-white cursor-pointer">
                <Bars3Icon className="h-6 w-6 text-[#C6E1E7]" />
              </div>
            )}
          </button>
          <div
            id="mobile-menu"
            className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileOpen : ''} flex gap-x-2 md:gap-x-2 gap-y-4 text-[#C6E1E7] text-sm`}
            ref={mobileMenuRef}
            role={isMobileMenuOpen ? 'menu' : undefined}
          >
            <Link
              href="/discover"
              className={`${styles.navLink} px-4 py-2 rounded-sm hover:bg-white/6 hover:text-white transition-all duration-300 active:scale-98`}
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsDropdownOpen(false);
              }}
              role="menuitem"
            >
              Discover
            </Link>
            <Link
              href="/stories"
              className={`${styles.navLink} px-4 py-2 rounded-sm hover:bg-white/6 hover:text-white transition-all duration-300 active:scale-98`}
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsDropdownOpen(false);
              }}
              role="menuitem"
            >
              Stories
            </Link>
            <Link
              href="/library"
              className={`${styles.navLink} px-4 py-2 rounded-sm hover:bg-white/6 hover:text-white transition-all duration-300 active:scale-98`}
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsDropdownOpen(false);
              }}
              role="menuitem"
            >
              Library
            </Link>
            <Link
              href="/words"
              className={`${styles.navLink} px-4 py-2 rounded-sm hover:bg-white/6 hover:text-white transition-all duration-300 active:scale-98`}
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsDropdownOpen(false);
              }}
              role="menuitem"
            >
              Words
            </Link>
            <div className={styles.dropdownContainer} ref={dropdownRef}>
              <button
                className={`${styles.navLink} px-4 py-2 rounded-sm hover:bg-white/6 hover:text-white transition-all duration-300 active:scale-98 flex items-center cursor-pointer`}
                onClick={toggleDropdown}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleDropdown();
                  }
                }}
                aria-label="More options"
                aria-expanded={isDropdownOpen}
                aria-controls="dropdown-menu"
                aria-haspopup="true"
                ref={dropdownButtonRef}
              >
                <EllipsisVerticalIcon className="h-5 w-5 text-[#C6E1E7]" />
              </button>
              {isDropdownOpen && (
                <div
                  id="dropdown-menu"
                  className={styles.dropdownMenu}
                  role="menu"
                  onKeyDown={handleDropdownKeyDown}
                >
                  <Link
                    href="/contact"
                    className={`${styles.dropdownItem} block px-4 py-2 text-[#C6E1E7] hover:bg-white/10 hover:text-white transition-all duration-300`}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                    role="menuitem"
                    ref={firstDropdownItemRef}
                  >
                    Contact
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;