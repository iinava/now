import { Link } from 'react-router-dom'; 
import { Card} from "@/components/ui/card";
import { Project } from '../../lib/types';
interface ProjectCardProps {
  project: Project;
}
export default function ProjectCard({project}:ProjectCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl">
      <Card className="w-full border-none bg-transparent">
        <div className="relative w-full h-[400px] overflow-hidden">
          <img
            src={project.image_url || ''}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
          
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <div className="space-y-2">
              <div className="text-sm font-medium text-blue-400 uppercase tracking-wider">
                TECHNOLOGY
              </div>
              <Link 
                to={`/projects/${project.id}`} 
                className="block text-2xl font-semibold text-white hover:text-gray-200 transition-colors"
              >
                {project.title}
              </Link>
              <p className="text-gray-300 line-clamp-2">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
