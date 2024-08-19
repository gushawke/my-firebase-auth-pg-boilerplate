import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import useAuth from '../hooks/useAuth';
import { auth } from '../lib/firebase';
import { Typography, Button, Spin, Layout } from 'antd';

const { Title } = Typography;
const { Content } = Layout;

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (loading) {
    return (
      <Layout style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Content style={{ textAlign: 'center' }}>
          <Spin size="large" />
          <div>Loading...</div>
        </Content>
      </Layout>
    );
  }

  if (!user) return null; // Ensure nothing is rendered if the user is not authenticated

  return (
    <Layout style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Content style={{ maxWidth: '500px', width: '100%', padding: '24px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', textAlign: 'center' }}>
        <Title level={2}>Welcome, {user.email}</Title>
        <Button type="primary" onClick={handleSignOut} block>
          Sign Out
        </Button>
      </Content>
    </Layout>
  );
}
