import React from 'react';
import Image from 'next/image';
import DashboardButton from './DashboardButton';
import { BsGrid3X3Gap, BsGem, BsLayers, BsMagic } from 'react-icons/bs';
import ActiveLink from './ActiveLink';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen bg-violet sticky top-0">
      <Image
        className="self-center"
        src="/logo.svg"
        alt="Logo"
        width={150}
        height={100}
      />
      <nav className="flex-1 mt-4">
        <ul>
          <li className="p-2">
            <DashboardButton href="/">
              <BsGrid3X3Gap className="mr-2" />
              Dashboard
            </DashboardButton>
          </li>
          <li className="p-2">
            <DashboardButton href="/diamonds">
              <BsGem className="mr-2" />
              Diamonds
            </DashboardButton>
          </li>
          <li className="p-2">
            <DashboardButton href="/facets">
              <BsLayers className="mr-2" />
              Facets
            </DashboardButton>
          </li>
          <li className="p-2">
            <DashboardButton href="/genie">
              <BsMagic className="mr-2" />
              Genie
            </DashboardButton>
          </li>
        </ul>
      </nav>
      <div className="p-4">
        <button className="w-full bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700">
          Ask for help
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
