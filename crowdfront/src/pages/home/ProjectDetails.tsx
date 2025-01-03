import AuthorInfo from "@/components/home/AuthorsInfo";
import Banner from "@/components/home/Banner";
import { ProjectCard } from "@/components/home/ProjectCard";
import ProjectDescription from "@/components/home/ProjectDescription";
import { productIdeas } from "@/lib/constants";

export default function ProjectIdeaPage() {
  return (
    <div className="min-h-screen  text-gray-100 mb-10">
      <Banner />
      <div className="px-4 ">
        <AuthorInfo />
        <ProjectDescription />
        {/* Add more sections here */}
        <h1 className="mt-12 mb-5 text-3xl">Similiar  ideas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {productIdeas.slice(0, 3).map((product) => (
            <ProjectCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
