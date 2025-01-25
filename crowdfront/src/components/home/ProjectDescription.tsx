import ScrollTop from "../ui/ScrollTop";

interface ProjectDescriptionProps {
  desc: string;
  detailed_desc: string;
}

export default function ProjectDescription({ desc, detailed_desc }: ProjectDescriptionProps) {
  return (
    <div className="mt-8">
      <ScrollTop/>
      <h3 className="text-2xl font-semibold mb-4 text-gray-100">Project Description</h3>
      <div className="space-y-4 text-gray-300">
        <p>{desc}</p>
        
        {detailed_desc && (
          <div className="mt-6">
            <h4 className="text-xl font-semibold mb-2">Detailed Information</h4>
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
  
  