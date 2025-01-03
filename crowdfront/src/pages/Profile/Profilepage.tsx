import { ProjectCard } from "@/components/home/ProjectCard";
import PostModal from "@/components/profile/PostModal";
import { Button } from "@/components/ui/button";
import { productIdeas } from "@/lib/constants";
import { User } from "lucide-react";

export default function Profilepage() {
  return (
    <div className="w-full  flex flex-col items-center pt-20 px-4">
      <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mb-4">
        <User className="w-20 h-20 text-gray-400" />
      </div>
      <h1>Bruce wayne</h1>
      <div className="flex gap-4 m-4">
        <Button>Message</Button>
        <Button>Edit Profile</Button>
        <PostModal/>
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productIdeas.map((product) => (
          <ProjectCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
