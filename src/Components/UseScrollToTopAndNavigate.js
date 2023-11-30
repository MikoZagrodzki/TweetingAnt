import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useScrollToTopAndNavigate = () => {
  const navigate = useNavigate();

  const action = (path) => {
    window.scrollTo(0, 0);
    navigate(path, { replace: true });
  };

  useEffect(() => {
    // In this case, there's no need for unlisten
    const cleanup = () => {
      window.scrollTo(0, 0);
    };

    // Run the cleanup on component unmount
    return cleanup;
  }, []);

  return action;
};

export default useScrollToTopAndNavigate;
