/*
https://github.com/vercel/swr/blob/master/examples/infinite-scroll/hooks/useOnScreen.js
*/
import { useState, useEffect } from 'react';
import { MutableRefObject } from 'react-transition-group/node_modules/@types/react';

export default function useOnScreen(ref: MutableRefObject<any>) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));

    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
}
