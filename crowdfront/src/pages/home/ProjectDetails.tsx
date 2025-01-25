import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchProjectById, deleteProject } from '../../features/projectSlice';
import ProjectDescription from '@/components/home/ProjectDescription';
import AuthorInfo from '@/components/home/AuthorsInfo';
import Banner from '@/components/home/Banner';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { getProfile } from '@/features/authSlice';
import EditProjectModal from '@/components/home/EditProjectModal';
import DeleteProjectAlert from '@/components/home/DeleteProjectAlert';

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.projects.loading);
  const error = useAppSelector((state) => state.projects.error);
  const project = useAppSelector((state) => state.projects.currentProject);
  const currentUser = useAppSelector((state) => state.auth.user);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(parseInt(id)));
    }
  }, [dispatch, id]);
  
  if(!currentUser){ 
    dispatch(getProfile());
  }
  const isOwner = currentUser?.id === project?.owner_id;

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    if (!project) return;
    try {
      await dispatch(deleteProject(project.id)).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="min-h-screen text-gray-100 mb-10">
      <Banner image_url={project.image_url} title={project.title} />
      <div className="px-4">
        <div >
          <AuthorInfo author={project.owner} authorId={project.owner_id}/>
        </div>
        {isOwner && (
            <div className="flex gap-2 mt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleEdit}
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          )}
        <ProjectDescription desc={project.description} detailed_desc={project.detailed_description} />
      </div>
      
      {project && (
        <EditProjectModal
          project={project}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      <DeleteProjectAlert 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
}
