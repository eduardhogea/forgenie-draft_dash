// Import the client from the apolloClient.js file
'use client'
import client from './apolloClient'; // Update the path to the correct location
import { gql } from '@apollo/client';
import { NFTOwnedAdapter } from '@/adapter/Adapters';
import { EventWatcher } from '@/components/EventWatcher';
import FunctionInputField from '@/components/FunctionInputField';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';

const diamondsQuery = `
  query {
    diamonds {
      id
      address
    }
  }
`;

export function DashboardPage() {
  const [diamonds, setDiamonds] = useState([]);

  useEffect(() => {
    client
      .query({
        query: gql(diamondsQuery),
      })
      .then((data) => setDiamonds(data.data.diamonds))
      .catch((err) => {
        console.log('Error fetching data: ', err);
      });
  }, []);

  return (
    <div className="flex-grow p-8 bg-midnight text-white">
      <EventWatcher />
      <FunctionInputField abiFunction={NFTOwnedAdapter.initializer()} />
      <div className="mt-8 bg-violet rounded-lg overflow-hidden shadow-lg">
        <Table className="min-w-full">
          <TableHead className="bg-[#3A2D6B]">
            <TableRow>
              <TableCell className="p-4 text-white font-bold text-lg">ID</TableCell>
              <TableCell className="p-4 text-white font-bold text-lg">Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="bg-violet">
            {diamonds.map((diamond, index) => (
              <TableRow key={index} className="hover:bg-sapphire transition-all">
                <TableCell className="p-4 text-white">{diamond.id}</TableCell>
                <TableCell className="p-4 text-white">{diamond.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DashboardPage;
