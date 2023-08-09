import Link from 'next/link';
import React, { FC, ReactNode } from 'react';
import ActiveLink from './ActiveLink';

interface ButtonProps {
  children: ReactNode;
  href: string;
}

const DashboardButton: FC<ButtonProps> = ({ children, href }) => {
  return (
    <Link href={href}>
      <ActiveLink href={href}>
        <button className="w-full flex items-center text-white py-2 px-4 rounded hover:bg-midnight">
          {children}
        </button>
      </ActiveLink>
    </Link>
  );
};

export default DashboardButton;
