// pages/index.tsx

import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login'); // Redirect to login page by default
  }, [router]);

  return (
    <div>
      <h1>Welcome to the App</h1>
      <p>Redirecting to the login page...</p>
    </div>
  );
}
