import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc,
  doc 
} from 'firebase/firestore';

export const projectService = {
  // Create a new project
  createProject: async (userId, projectData) => {
    try {
      const projectsRef = collection(db, 'projects');
      const newProject = {
        ...projectData,
        userId,
        createdAt: new Date().toISOString()
      };
      const docRef = await addDoc(projectsRef, newProject);
      return { id: docRef.id, ...newProject };
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  // Get all projects for a user
  getUserProjects: async (userId) => {
    try {
      const projectsRef = collection(db, 'projects');
      const q = query(projectsRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Delete a project
  deleteProject: async (projectId) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }
}; 