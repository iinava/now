import { Link, useLocation } from 'react-router-dom';
import { User, Home, MessageCircle } from 'lucide-react';
import { getProfile, selectCurrentUser } from '@/features/authSlice';
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Appname } from '@/lib/constants';
import { useEffect } from 'react';
interface UserNavbarProps {
  variant: 'sidebar' | 'topbar';
}

export function UserNavbar({ variant }: UserNavbarProps) {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser);
  useEffect(()=>{
  if (!user) { dispatch(getProfile())}
  },[dispatch,user])
  const { pathname } = useLocation();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/chats', label: 'Chats', icon: MessageCircle },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  if (variant === 'topbar') {
    return (
      <nav className="bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold text-white hover:text-blue-300 transition-colors">
              {Appname}
            </Link>
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`p-2 rounded-lg transition-colors
                    ${pathname === item.href
                      ? 'text-blue-300'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                    }`}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="h-full flex flex-col py-8">
      {/* Logo */}
      <div className="px-6 mb-8">
        <Link to="/" className="text-2xl font-bold text-white hover:text-blue-300 transition-colors">
          {Appname}
        </Link>
      </div>

      {/* Navigation Items */}
      <div className="flex-1">
        <div className="space-y-2 px-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                ${pathname === item.href
                  ? 'bg-gray-800/50 text-blue-300'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-6 py-4 border-t border-gray-800">
        <Link to="/profile" className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-orange-500" />
          <div className="text-sm text-gray-400">
            <div className="font-medium text-white">{user?.full_name}</div>
            <div>{user?.email}</div>
          </div>
        </Link>
      </div>
    </nav>
  );
}
