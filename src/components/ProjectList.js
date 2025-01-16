import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { projectService } from '../services/projectService';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        if (auth.currentUser) {
          const userProjects = await projectService.getUserProjects(auth.currentUser.uid);
          setProjects(userProjects);
        }
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleCreateProject = async (projectData) => {
    try {
      const newProject = await projectService.createProject(auth.currentUser.uid, {
        title: projectData.title,
        description: projectData.description,
        // Add other project fields as needed
      });
      setProjects([...projects, newProject]);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>My Projects</h2>
      {projects.map(project => (
        <div key={project.id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          {/* Add other project details */}
        </div>
      ))}
    </div>
  );
};

export default ProjectList; 