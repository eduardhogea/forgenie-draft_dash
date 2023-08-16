'use client';
import { NFTOwnedAdapter } from '@/adapter/Adapters';
import { EventWatcher } from '@/components/EventWatcher';
import FunctionInputField from '@/components/FunctionInputField';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { GraphQLClient } from 'graphql-request';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const GET_MINTED_DIAMONDS = `
  query GetMintedDiamonds {
    diamondMinteds {
      tokenId
      diamond
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

const client = new GraphQLClient('https://api.studio.thegraph.com/query/50950/contract/v0.2');

const DashboardComponent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{ diamondMinteds: any[] } | null>(null);

  useEffect(() => {
    client.request(GET_MINTED_DIAMONDS)
      .then(responseData => {
        setData(responseData as { diamondMinteds: any[] });
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err);
        setLoading(false);
      });
  }, []);


  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("GraphQL Error:", error);
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="flex-grow p-8 bg-midnight text-white">
      <EventWatcher />
      <FunctionInputField abiFunction={NFTOwnedAdapter.initializer()} />
      <div className="mt-8 bg-violet rounded-lg overflow-hidden shadow-lg">
        <Table className="min-w-full">
          <TableHead style={{ backgroundColor: '#3A2D6B' }}>
            <TableRow>
              <TableCell style={{ color: 'white', padding: '1rem' }} className="font-bold text-lg">Token ID</TableCell>
              <TableCell style={{ color: 'white', padding: '1rem' }} className="font-bold text-lg">Diamond Address</TableCell>
              <TableCell style={{ color: 'white', padding: '1rem' }} className="font-bold text-lg">Block Number</TableCell>
              <TableCell style={{ color: 'white', padding: '1rem' }} className="font-bold text-lg">Block Timestamp</TableCell>
              <TableCell style={{ color: 'white', padding: '1rem' }} className="font-bold text-lg">Transaction Hash</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="bg-violet">
            {data?.diamondMinteds.map((diamond: any) => (
              <TableRow key={diamond.tokenId} className="hover:bg-sapphire transition-all">
                <TableCell style={{ color: 'white', padding: '1rem' }}>{diamond.tokenId}</TableCell>
                <TableCell style={{ color: 'white', padding: '1rem' }}>{diamond.diamond}</TableCell>
                <TableCell style={{ color: 'white', padding: '1rem' }}>{diamond.blockNumber}</TableCell>
                <TableCell style={{ color: 'white', padding: '1rem' }}>{new Date(diamond.blockTimestamp * 1000).toLocaleString()}</TableCell>
                <TableCell style={{ color: 'white', padding: '1rem' }}>{diamond.transactionHash}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const DashboardPage = dynamic(() => Promise.resolve(DashboardComponent), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

export default DashboardPage;
