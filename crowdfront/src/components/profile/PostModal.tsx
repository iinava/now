import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const PostModal = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    summary: '',
    image: null as File | null,
    category: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <Dialog>
      {/* Round Button */}
      <DialogTrigger asChild>
        <Button className="  flex items-center justify-center  hover:bg-blue-100 text-black  shadow-lg">
          Post
        </Button>
      </DialogTrigger>
      
      {/* Modal Content */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
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
          
          {/* Description Field */}
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

          {/* Summary Field */}
          <div>
            <Label htmlFor="summary">Summary</Label>
            <Textarea 
              id="summary" 
              name="summary" 
              placeholder="Enter a brief summary" 
              value={formData.summary} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          {/* Image Picker */}
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

          {/* Category Field */}
          <div>
            <Label htmlFor="category">Category</Label>
            <Input 
              id="category" 
              name="category" 
              placeholder="Enter category" 
              value={formData.category} 
              onChange={handleInputChange} 
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Post Now
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
