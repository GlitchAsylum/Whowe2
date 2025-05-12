import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { MapPinIcon, ChevronUpIcon, HeartIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import Button from './buttons/Button';

interface UserCardProps {
  name: string;
  city: string;
  state: string;
  country: string;
  comment: string;
}

export default function UserCard({ name, city, state, country, comment }: UserCardProps) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleLocation = () => {
    console.log('Location button clicked');
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleReportIssue = () => {
    console.log('Report Issue clicked');
    setIsMenuOpen(false);
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle keyboard events for accessibility
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Truncate comment to 500 words for full content (SEO-friendly limit)
  const words = comment.split(' ');
  const truncatedFullComment = words.length > 500 
    ? words.slice(0, 500).join(' ') + '...' 
    : comment;

  // Truncate to 300 characters for collapsed view
  const collapsedComment = comment.length > 300 
    ? comment.slice(0, 300) + '...' 
    : comment;

  return (
    <article className="bg-white/12 rounded-sm shadow-md flex flex-col" role="region" aria-labelledby={`user-${name}`}>
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center gap-8">
          <Image
            src="/Whowe_logo_notext.svg"
            alt={`Profile icon for ${name}`}
            width={40}
            height={40}
            className="rounded-full"
            aria-hidden="true"
          />
          <div className="flex flex-col">
            <h2 id={`user-${name}`} className="text-lg text-left font-semibold">{name}</h2>
            <address className="text-sm text-left text-gray-200 not-italic" aria-label="User location">
              {`${city}, ${state}, ${country}`}
            </address>
          </div>
        </div>
        <div className="flex items-center gap-1 relative" ref={menuRef}>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); handleLike(); }}
              onKeyDown={(e) => handleKeyDown(e, handleLike)}
              className="hover:bg-white/6 p-3 rounded-[50%] cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={isLiked ? `Unlike ${name}'s post` : `Like ${name}'s post`}
              aria-pressed={isLiked}
            >
              <HeartIcon 
                className={`w-6 h-6 ${isLiked ? 'fill-red-500 stroke-red-500' : 'stroke-[#C6E1E7]'}`} 
              />
            </button>
            <span className="text-gray-200 text-sm min-w-[12px] text-right mr-4" aria-label={`${likes} likes`}>
              {likes}
            </span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleLocation(); }}
            onKeyDown={(e) => handleKeyDown(e, handleLocation)}
            className="cursor-pointer rounded-[50%] p-3 hover:text-white hover:bg-white/6 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`View ${name}'s location`}
          >
            <MapPinIcon className="w-6 h-6 text-[#C6E1E7]" />
          </button>
          <div className="flex items-center text-[#C6E1E7] cursor-pointer rounded-[50%] p-3 hover:bg-white/6 transition-all duration-300">
            <button
              onClick={(e) => { e.stopPropagation(); handleMenuToggle(); }}
              onKeyDown={(e) => handleKeyDown(e, handleMenuToggle)}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Open options menu"
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
            >
              <EllipsisVerticalIcon className="w-6 h-6 text-[#C6E1E7] cursor-pointer" />
            </button>
          </div>
          <button
            onClick={handleToggle}
            onKeyDown={(e) => handleKeyDown(e, handleToggle)}
            className="cursor-pointer rounded-[50%] p-3 hover:bg-white/6 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={isExpanded ? `Collapse ${name}'s comment` : `Expand ${name}'s comment`}
            aria-expanded={isExpanded}
          >
            <ChevronUpIcon 
              className={`w-6 h-6 text-[#C6E1E7] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            />
          </button>
          {isMenuOpen && (
            <div
              className="absolute right-0 top-14 bg-white/6 shadow-lg rounded-sm py-2 w-40 z-10"
              role="menu"
              aria-label="Options menu"
            >
              <button
                onClick={(e) => { e.stopPropagation(); handleReportIssue(); }}
                onKeyDown={(e) => handleKeyDown(e, handleReportIssue)}
                className="block w-full text-left px-4 py-2 text-sm text-[#C6E1E7] hover:bg-white/6 hover:text-white transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                role="menuitem"
              >
                Report Issue
              </button>
            </div>
          )}
        </div>
      </header>
      <section
        ref={contentRef}
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[400px] p-6' : 'max-h-32 p-6'}`}
        aria-hidden={!isExpanded}
      >
        <p className={`text-gray-200 text-sm ${isExpanded ? 'overflow-y-visible' : 'overflow-hidden text-ellipsis'}`}>
          {isExpanded ? truncatedFullComment : collapsedComment}
        </p>
      </section>
      <footer className="sr-only" aria-hidden="true">
        End of user card for {name}
      </footer>
    </article>
  );
}