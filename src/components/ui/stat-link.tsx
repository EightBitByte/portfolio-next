"use client";

import Link from "next/link";
import React from "react";
import { achievements } from "@/utils/achievements";

interface StatLinkProps extends React.ComponentProps<typeof Link> {
  isFunLink?: boolean
}

export const StatLink: React.FC<StatLinkProps> = ({ 
    children, 
    href, 
    onClick, 
    isFunLink,
    ...props 
}) => {
  const isExternal = typeof href === 'string' && (href.startsWith('http://') || href.startsWith('https://'));

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    achievements.trackLinkClicks(isFunLink ?? false);

    // Call the original onClick prop if it exists
    if (onClick) {
      onClick(event);
    }
  };

  if (isExternal) {
    return (
      <a href={href as string} target="_blank" rel="noopener noreferrer" onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};