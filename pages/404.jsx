import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const NotFound = () => {
  const router = useRouter();
  const [timer, setTimer] = useState(3);

  const SECOND = 1000;

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);

    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, SECOND);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div>
      <h1>Page Not Found: 404</h1>
      <p>Redirecting in: {timer}</p>
    </div>
  );
};

export default NotFound;
