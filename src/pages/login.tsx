import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Alert, Typography, Layout } from 'antd';
import dynamic from 'next/dynamic';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';

const { Content } = Layout;
const { Title, Text } = Typography;



export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <Layout style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Content style={{ maxWidth: '500px', width: '100%', padding: '24px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          {/* <LockOutlined style={{ fontSize: '48px', color: '#1890ff' }} /> */}
          <Title level={2}>Sign in</Title>
        </div>
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '24px' }} />}
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input
            //   prefix={<LockOutlined />}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
            //   prefix={<LockOutlined />}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item style={{ marginTop: '16px' }}>
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link href="#">
                <Text>Forgot password?</Text>
              </Link>
              <Link href="/signup">
                <Text>{"Don't have an account? Sign Up"}</Text>
              </Link>
            </div>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}
