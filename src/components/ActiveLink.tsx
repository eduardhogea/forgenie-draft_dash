'use client';
import { usePathname } from 'next/navigation';
import { ReactNode, FC } from 'react';

interface ActiveLinkProps {
  children: ReactNode;
  href: string;
}

const ActiveLink: FC<ActiveLinkProps> = ({ children, href }) => {
  const pathname = usePathname();
  const style = pathname === href ? 'bg-midnight' : '';

  return <div className={style}>{children}</div>;
};

export default ActiveLink;
