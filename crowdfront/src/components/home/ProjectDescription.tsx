import ScrollTop from "../ui/ScrollTop";

interface ProjectDescriptionProps {
  desc: string;
  detailed_desc: string;
}

export default function ProjectDescription({ desc, detailed_desc }: ProjectDescriptionProps) {
  return (
    <div className="mt-8">
      <ScrollTop/>
      <div className="prose prose-invert max-w-none">
        <div className="text-lg text-gray-300 mb-8">
          {desc}
        </div>
        
        {detailed_desc && (
          <div className="mt-8">
            <div 
              dangerouslySetInnerHTML={{ __html: detailed_desc }}
              className="quill-content text-gray-300"
            />
          </div>
        )}
      </div>
    </div>
  );
}
  
  