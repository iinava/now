import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Chat/SideBar';

export default function ChatLayout() {
  return (
    <div className="flex h-[90vh] bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}

