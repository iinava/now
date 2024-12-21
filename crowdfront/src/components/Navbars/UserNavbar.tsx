import { Link, useLocation } from 'react-router-dom'; 
import { User, Home, FileText, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserNavbar() {
  const { pathname } = useLocation(); 

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/posts', label: 'Posts', icon: FileText },
    { href: '/chats', label: 'Chats', icon: MessageCircle },
  ];

  return (
    <nav className="bg-transparent border-b border-gray-700">
      <div className=" px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white hover:text-blue-300 transition-colors">
              Funda
            </Link>
          </div>
          <div className="flex items-center space-x-4 md:space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center space-x-1 text-white hover:text-blue-300 transition-colors ${
                  pathname === item.href ? 'text-blue-300' : ''
                }`}
              >
                <item.icon className="h-5 w-5" /> 
                <span className="hidden sm:inline">{item.label}</span> 
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-blue-300">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={() => console.log('Logout clicked')} className="w-full text-left">
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
