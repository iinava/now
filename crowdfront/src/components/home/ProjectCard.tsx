import { Link } from 'react-router-dom'; 
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export function ProjectCard({ id, title, description, imageUrl }: ProductCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <Link to={`/product/${id}`} className="text-xl font-semibold text-primary hover:underline">
            {title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-48 mb-4">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Learn More</Button>
      </CardFooter>
    </Card>
  );
}
