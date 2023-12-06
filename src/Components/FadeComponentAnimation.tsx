import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import "./FadeComponentAnimation.css"
interface FadeComponentAnimationProps {
    children: React.ReactNode;
    idToTriggerAnimation: string;
  }
function FadeComponentAnimation({ children, idToTriggerAnimation }:FadeComponentAnimationProps) {
  const [inView, setInView] = useState(false);
  const elementRef = useRef(null);

  const handleIntersection = (entries:any) => {
    const entry = entries[0];
    setInView(entry.isIntersecting);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '120px 120px 120px 120px', // Adjust this value based on your needs
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [idToTriggerAnimation]);

  return (
    <div ref={elementRef} className='w-full flex justify-center '>
      <CSSTransition in={inView} classNames='fade' timeout={500}>
        {children}
      </CSSTransition>
    </div>
  );
}

export default FadeComponentAnimation;

