import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAppDispatch } from '@/store/store'
import { createProject } from '@/features/projectSlice';
import { useToast } from "@/hooks/use-toast"
import { CreateProjectRequest } from '@/lib/project_types';
import { MultiselectDropdown } from '../MultiselectDropdown';


const PostModal = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<{ value: string; label: string }[]>([]);
  
  const [formData, setFormData] = useState<CreateProjectRequest>({
    title: '',
    description: '',
    detailed_description: '',
    image: null
  });

  const initialOptions = [
    { value: "1", label: "Apple" },
    { value: "2", label: "Banana" },
    { value: "3", label: "Cherry" },
    { value: "4", label: "Date" },
    { value: "5", label: "Elderberry" },
  ]

  const [numericValues, setNumericValues] = useState<number[]>([]);

  useEffect(() => {
    const values = selectedOptions.map(option => parseInt(option.value));
    setNumericValues(values);
    console.log(selectedOptions,numericValues);
    
  }, [selectedOptions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuillChange = (value: string) => {
    setFormData({ ...formData, detailed_description: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a FormData object
    const formDataToSend = new FormData();
    
    // Append form data
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('detailed_description', formData.detailed_description);
    if (formData.image) {
        formDataToSend.append('image', formData.image); // Append the image file
    }
    
    // Convert selectedOptions to numeric values and append each as a separate entry
    const numericValues = selectedOptions.map(option => option.value); // Keep as strings
    numericValues.forEach(value => {
        formDataToSend.append('looking_for', value); // Append each value as a separate entry
    });

    console.log("Payload:", formDataToSend); // Log the payload to check values

    await dispatch(createProject(formDataToSend)).unwrap().then(() => {
        toast({
            title: "Success",
            description: "Project created successfully!",
        });
        setFormData({
            title: '',
            description: '',
            detailed_description: '',
            image: null
        });
        setSelectedOptions([]); // Reset selected options
    }).catch((error) => {
        console.log(error);
        toast({
            title: "Error",
            description: error.message ? error.message : "Failed to create project. Please try again.",
            variant: "destructive",
        });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center justify-center hover:bg-blue-100 text-black shadow-lg">
          Post
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              name="title" 
              placeholder="Enter title" 
              value={formData.title} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              placeholder="Enter description" 
              value={formData.description} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <div>
            <Label htmlFor="detailed_description">Detailed Description</Label>
            <div className="min-h-[200px]">
              <ReactQuill
                theme="snow"
                value={formData.detailed_description}
                onChange={handleQuillChange}
                className="h-[150px] mb-12"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="image">Image</Label>
            <Input 
              id="image" 
              name="image" 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>
          <div>
        <Label htmlFor="positions">Positions</Label>
        <MultiselectDropdown 
          options={initialOptions} 
          onChange={setSelectedOptions}
        />
      </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Post Now
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
