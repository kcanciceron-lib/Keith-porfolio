import React from 'react';

interface IconProps {
  className?: string;
}

export const LinkedInPixelIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 16 16" 
    className={className} 
    shapeRendering="crispEdges"
  >
    <rect width="16" height="16" rx="2" fill="#0077b5"/>
    <rect x="3" y="6" width="2" height="6" fill="#ffffff"/>
    <rect x="3" y="3" width="2" height="2" fill="#ffffff"/>
    <rect x="7" y="6" width="2" height="6" fill="#ffffff"/>
    <rect x="11" y="8" width="2" height="4" fill="#ffffff"/>
    <rect x="9" y="6" width="3" height="2" fill="#ffffff"/>
  </svg>
);

export const GitHubPixelIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 16 16" 
    className={className} 
    shapeRendering="crispEdges"
  >
    <rect width="16" height="16" rx="2" fill="#24292e"/>
    <rect x="4" y="5" width="8" height="6" fill="#ffffff"/>
    <rect x="3" y="3" width="2" height="2" fill="#ffffff"/>
    <rect x="11" y="3" width="2" height="2" fill="#ffffff"/>
    <rect x="6" y="7" width="1" height="1" fill="#24292e"/>
    <rect x="9" y="7" width="1" height="1" fill="#24292e"/>
    <rect x="6" y="11" width="4" height="3" fill="#ffffff"/>
    <rect x="5" y="12" width="6" height="1" fill="#ffffff"/>
  </svg>
);

export const MailPixelIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 16 16" 
    className={className} 
    shapeRendering="crispEdges"
  >
    <rect width="16" height="16" rx="2" fill="#c41230"/>
    <rect x="2" y="4" width="12" height="8" fill="#ffffff"/>
    <path d="M2 4h12v1H2zm1 1h10v1H3zm1 1h8v1H4zm1 1h6v1H5zm1 1h4v1H6zm1 1h2v1H7z" fill="#000000" opacity="0.15"/>
    <path d="M2 4l6 4 6-4" stroke="#c41230" strokeWidth="1" fill="none"/>
  </svg>
);

export const FacebookPixelIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 16 16" 
    className={className} 
    shapeRendering="crispEdges"
  >
    <rect width="16" height="16" rx="2" fill="#1877f2"/>
    <path d="M9 16V9h2.5l.5-3H9V4.5c0-.8.2-1.1 1-1.1h1.5V1H9.2C7 1 6 2.2 6 4.3V6H4v3h2v7z" fill="#ffffff"/>
  </svg>
);

export const InstagramPixelIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 16 16" 
    className={className} 
    shapeRendering="crispEdges"
  >
    <rect width="16" height="16" rx="2" fill="#e1306c"/>
    <rect x="3" y="3" width="10" height="10" rx="1" fill="none" stroke="#ffffff" strokeWidth="2"/>
    <rect x="6" y="6" width="4" height="4" rx="1" fill="none" stroke="#ffffff" strokeWidth="2"/>
    <rect x="10" y="4" width="2" height="2" fill="#ffffff"/>
  </svg>
);

export const TikTokPixelIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 16 16" 
    className={className} 
    shapeRendering="crispEdges"
  >
    <rect width="16" height="16" rx="2" fill="#000000"/>
    <path d="M9 3v7a2 2 0 1 1-2-2h1V5h-1a4 4 0 1 0 4 4V5a4 4 0 0 0-2-2z" fill="#ffffff"/>
  </svg>
);

export const PhonePixelIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 16 16" 
    className={className} 
    shapeRendering="crispEdges"
  >
    <rect width="16" height="16" rx="2" fill="#4cd964"/>
    <path d="M4 3c.5 0 1 .5 1.2 1l.8 1.8c.2.5 0 1-.4 1.3L4.5 8c.8 1.5 2 2.7 3.5 3.5l.9-1.1c.3-.4.8-.6 1.3-.4l1.8.8c.5.2 1 .7 1 1.2V13c0 .5-.5 1-1 1-6.1 0-11-4.9-11-11 0-.5.5-1 1-1z" fill="#ffffff"/>
  </svg>
);
