import { NFTOwnedAdapter } from '@/adapter/Adapters';
import { EventWatcher } from '@/components/EventWatcher';
import FunctionInputField from '@/components/FunctionInputField';

export function DashboardPage() {
  return (
    <div className="flex-grow">
      <EventWatcher />
      <FunctionInputField abiFunction={NFTOwnedAdapter.initializer()} />
    </div>
  );
}

export default DashboardPage;
