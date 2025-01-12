import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../components/config/firebase';

export const projectService = {
  // Create a new project
  async createProject(userId, projectData) {
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        userId,
        ...projectData,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      throw new Error('Error creating project: ' + error.message);
    }
  },

  // Get user's projects
  async getUserProjects(userId) {
    try {
      const q = query(collection(db, 'projects'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw new Error('Error fetching projects: ' + error.message);
    }
  }
}; 