import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const scrollToTopAndNavigate = () => {
  const navigate = useNavigate();

  const action = (path) => {
    window.scrollTo(0, 0);
    navigate(path, { replace: true });
  };

  useEffect(() => {
    const unlisten = navigate(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      unlisten();
    };
  }, [navigate]);

  return action;
};

export default scrollToTopAndNavigate;
