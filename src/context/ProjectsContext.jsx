import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { projectsService } from '../services/projectsService';

const ProjectsContext = createContext();

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within ProjectsProvider');
  }
  return context;
};

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isFetching = useRef(false);

  // Load projects once on mount
  useEffect(() => {
    // Prevent duplicate fetches from React.StrictMode
    if (isFetching.current) return;
    isFetching.current = true;

    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsService.getActive();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError(err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects().finally(() => {
      isFetching.current = false;
    });
  }, []); // Load only once!

  // Refresh projects (for admin panel after create/update/delete)
  const refreshProjects = async () => {
    try {
      const data = await projectsService.getActive();
      setProjects(data);
    } catch (err) {
      console.error('Error refreshing projects:', err);
    }
  };

  const value = {
    projects,
    loading,
    error,
    refreshProjects,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
