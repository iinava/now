// import ProjectCard from "@/components/home/ProjectCard";
import ProjectCard from "@/components/home/ProjectCard";
import { EditProfileButton } from "@/components/profile/EditProfileModal";
import PostModal from "@/components/profile/PostModal";
import { User, LogOut } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchOwnProjects, selectOwnProjects, selectOwnProjectsLoading } from "@/features/projectSlice";
import { getProfile } from "@/features/authSlice";
import { Button } from "@/components/ui/button";
import ConfirmationAlert from "@/components/ui/ConfirmationAlert";
import { useNavigate } from "react-router-dom";

export default function Profilepage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const ownProjects = useAppSelector(selectOwnProjects);
  const isLoading = useAppSelector(selectOwnProjectsLoading);
  const user = useAppSelector((state) => state.auth.user);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchOwnProjects({}));
    dispatch(getProfile());
  }, [dispatch]);

  const handleLogout = () => {
    // Implement your logout logic here
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    navigate('/login');
    window.location.reload(); // Force reload to clear all state
  };
  

  return (
    <div className="w-full flex flex-col items-center pt-20 px-4">
      <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mb-4">
        <User className="w-20 h-20 text-gray-400" />
      </div>
      <h1 className="text-xl font-semibold">{user?.username || 'Loading...'}</h1>
      <p className="text-gray-600 mt-2">{user?.email}</p>
      <div className="flex gap-4 m-4">
        <EditProfileButton/>
        <PostModal/>
        <Button 
          variant="outline"
          onClick={() => setIsLogoutDialogOpen(true)}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
      {isLoading ? (
        <div>Loading projects...</div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ownProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {ownProjects.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              You have not published any projects yet.
            </div>
          )}
        </div>
      )}

      <ConfirmationAlert
        isOpen={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
        onConfirm={handleLogout}
        title="Confirm Logout"
        description="Are you sure you want to logout? You will need to login again to access your account."
        confirmText="Logout"
      />
    </div>
  );
}
