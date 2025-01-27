import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchProjectById, deleteProject, selectCurrentProject, selectProjectsLoading, selectProjectsError } from '../../features/projectSlice';
import { selectCurrentUser } from '../../features/authSlice';
import ProjectDescription from '@/components/home/ProjectDescription';
import AuthorInfo from '@/components/home/AuthorsInfo';
import Banner from '@/components/home/Banner';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import EditProjectModal from '@/components/home/EditProjectModal';
import DeleteProjectAlert from '@/components/home/DeleteProjectAlert';

export default function ProjectDetails() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const loading = useAppSelector(selectProjectsLoading);
  const error = useAppSelector(selectProjectsError);
  const project = useAppSelector(selectCurrentProject);
  const currentUser = useAppSelector(selectCurrentUser);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(parseInt(id)));
    }
  }, [dispatch, id]);
  
  if (!currentUser) { 
    // Handle case where currentUser is not available
  }
  const isOwner = project ? currentUser?.id === project.owner_id : false;

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
    <div className="min-h-screen text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Title and Author Section */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <AuthorInfo author={project.owner} authorId={project.owner_id} isOwner={isOwner} />
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.looking_for.length > 0 ? <h2 className="text-1xl font-bold mb-4">Looking For 👀</h2> : null}
            {project.looking_for ? project.looking_for.map((item, index) => (
              <div key={index} className="">{item.position}</div>
            )) : null}
          </div>
        </div>

        {/* Banner Section */}
        <Banner image_url={project.image_url} title={project.title} />

        {/* Owner Actions */}
        {isOwner && (
          <div className="flex gap-2 mt-6">
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

        {/* Description Section */}
        <ProjectDescription desc={project.description} detailed_desc={project.detailed_description} />
      </div>

      {/* Modals */}
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
