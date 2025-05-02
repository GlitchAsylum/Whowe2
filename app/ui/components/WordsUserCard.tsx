'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { MapPinIcon, ChevronUpIcon, ChevronDownIcon, HeartIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';

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

  // Truncate comment to 500 words for full content
  const words = comment.split(' ');
  const truncatedFullComment = words.length > 500 
    ? words.slice(0, 500).join(' ') + '...' 
    : comment;

  // Truncate to 300 characters for collapsed view
  const collapsedComment = comment.length > 300 
    ? comment.slice(0, 300) + '...' 
    : comment;

  return (
    <div className="bg-white/12 rounded-sm shadow-md flex flex-col">
      <button 
        onClick={handleToggle}
        className="flex items-center justify-between p-6 focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <Image
            src="/Whowe_logo_notext.svg"
            alt="User icon"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">{name}</h2>
            <span className="text-sm text-gray-200">{`${city}, ${state}, ${country}`}</span>
          </div>
        </div>
        <div className="flex items-center gap-6 relative" ref={menuRef}>
          <div className="flex items-center gap-1">
            <button onClick={(e) => {e.stopPropagation(); handleLike();}} className="focus:outline-none">
              <HeartIcon 
                className={`w-6 h-6 ${isLiked ? 'fill-red-500 stroke-red-500' : 'stroke-[#C6E1E7]'}`} 
              />
            </button>
            <span className="text-gray-200 text-sm min-w-[12px] text-right">{likes}</span>
          </div>
          <button 
            onClick={(e) => {e.stopPropagation(); handleLocation();}} 
            className="focus:outline-none"
          >
            <MapPinIcon className="w-6 h-6 text-[#C6E1E7]" />
          </button>
          <div className="flex items-center gap-6">
            <button 
              onClick={(e) => {e.stopPropagation(); handleMenuToggle();}} 
              className="focus:outline-none"
            >
              <EllipsisVerticalIcon className="w-6 h-6 text-[#C6E1E7]" />
            </button>
            {isExpanded ? (
              <ChevronUpIcon className="w-6 h-6 text-[#C6E1E7]" />
            ) : (
              <ChevronDownIcon className="w-6 h-6 text-[#C6E1E7]" />
            )}
          </div>
          {isMenuOpen && (
            <div className="absolute right-0 top-8 bg-white/6 shadow-lg rounded-sm py-2 w-40 z-10">
              <button
                onClick={(e) => {e.stopPropagation(); handleReportIssue();}}
                className="block w-full text-left px-4 py-2 text-sm text-[#C6E1E7] hover:bg-white/6 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                Report Issue
              </button>
            </div>
          )}
        </div>
      </button>
      <div 
        ref={contentRef}
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-[500px] p-6' : 'max-h-40 p-6'
        }`}
      >
        <div 
          className={`h-40 text-gray-200 text-sm ${
            isExpanded ? 'overflow-y-auto' : 'overflow-hidden text-ellipsis'
          }`}
        >
          {isExpanded ? truncatedFullComment : collapsedComment}
        </div>
      </div>
    </div>
  );
}