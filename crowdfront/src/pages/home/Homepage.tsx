import { useState } from "react";
import { ProjectCard } from "@/components/home/ProjectCard";
import { productIdeas } from "@/lib/constants";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All"
    ? productIdeas
    : productIdeas.filter(product => product.category === selectedCategory);

  const categories = ["All", "Home Automation", "Health & Wellness", "Software", "Fitness"];

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Product Ideas Showcase</h1>
      
      {/* Category Filter */}
      <div className="text-center mb-8 md:w-72">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="p-2 border rounded">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProjectCard
            key={product.id}
            {...product}
          />
        ))}
      </div>
    </div>
  );
}
