// Import the client from the apolloClient.js file
'use client'
import { NFTOwnedAdapter } from '@/adapter/Adapters';
import { EventWatcher } from '@/components/EventWatcher';
import FunctionInputField from '@/components/FunctionInputField';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useQuery, gql } from '@apollo/client';

const GET_MINTED_DIAMONDS = gql`
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

export function DashboardPage() {
  const { loading, error, data } = useQuery(GET_MINTED_DIAMONDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex-grow p-8 bg-midnight text-white">
      <EventWatcher />
      <FunctionInputField abiFunction={NFTOwnedAdapter.initializer()} />
      <div className="mt-8 bg-violet rounded-lg overflow-hidden shadow-lg">
        <Table className="min-w-full">
          <TableHead className="bg-[#3A2D6B]">
            <TableRow>
              <TableCell className="p-4 text-white font-bold text-lg">Token ID</TableCell>
              <TableCell className="p-4 text-white font-bold text-lg">Diamond Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="bg-violet">
            {data.diamondMinteds.map((diamond: any) => (
              <TableRow key={diamond.tokenId} className="hover:bg-sapphire transition-all">
                <TableCell className="p-4 text-white">{diamond.tokenId}</TableCell>
                <TableCell className="p-4 text-white">{diamond.diamond}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DashboardPage;
