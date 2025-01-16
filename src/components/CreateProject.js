import React, { useState } from 'react';
import { projectService } from '../services/projectService';
import { auth } from '../firebase/config';

const CreateProject = ({ onProjectCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProject = await projectService.createProject(auth.currentUser.uid, {
        title,
        description
      });
      onProjectCreated(newProject);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Project Description"
        required
      />
      <button type="submit">Create Project</button>
    </form>
  );
};

export default CreateProject; 