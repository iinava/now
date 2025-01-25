import { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { fetchProjects } from '../../features/projectSlice';
import ProjectCard from '../../components/home/ProjectCard';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { projects, loading, error } = useAppSelector((state: RootState) => state.projects);

  useEffect(() => {
    if(projects.length === 0){
    dispatch(fetchProjects({}))
  }
  }, [dispatch]);
  if (loading) {
    return (
      <div>
        <h2>Loading projects...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Error loading projects</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {projects && projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
