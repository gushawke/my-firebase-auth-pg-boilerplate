// pages/dashboard.tsx
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import useAuth from '../hooks/useAuth';
import { auth } from '../lib/firebase';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return null; // This ensures that if the user is not authenticated, the component doesn't render anything

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
