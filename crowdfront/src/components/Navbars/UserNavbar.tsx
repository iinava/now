import { Link, useLocation } from 'react-router-dom'; 
import { User, Home, MessageCircle } from 'lucide-react';

export function UserNavbar() {
  const { pathname } = useLocation(); 

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/chats', label: 'Chats', icon: MessageCircle },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-transparent border-b border-gray-800 z-50">
      <div className="px-4">
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
          </div>
        </div>
      </div>
    </nav>
  );
}
