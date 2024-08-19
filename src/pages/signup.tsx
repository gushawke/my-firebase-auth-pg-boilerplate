import { useState } from 'react';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/router';
import { Form, Input, Button, Select, Typography, notification, Layout, Alert } from 'antd';
import Link from 'next/link';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [googleMaps, setGoogleMaps] = useState('');
  const [instagram, setInstagram] = useState('');
  const [userType, setUserType] = useState('restaurant');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log({
        userId: user.uid,
        email: user.email,
        firstName,
        lastName,
        phoneNumber,
        website,
        googleMaps,
        instagram,
        userType,
      });

      router.push('/dashboard'); // Redirect to dashboard after successful sign-up
    } catch (err) {
      notification.error({
        message: 'Google Sign-In Failed',
        description: (err as Error).message,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log({
        userId: user.uid,
        firstName,
        lastName,
        phoneNumber,
        website,
        googleMaps,
        instagram,
        userType,
      });

      router.push('/dashboard'); // Redirect to dashboard after successful signup
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <Layout style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Content
        style={{
          maxWidth: '500px',
          width: '100%',
          padding: '24px',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title level={2}>Sign Up</Title>
        </div>
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '24px' }} />}
        <Form layout="vertical" onFinish={handleSubmit} initialValues={{ userType: 'restaurant' }}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: 'Please select a user type!' }]}
          >
            <Select value={userType} onChange={(value) => setUserType(value)} placeholder="Select a user type">
              <Option value="restaurant">Restaurant Manager</Option>
              <Option value="promoter">Restaurant Owner</Option>
              <Option value="marketer">Marketer</Option>
              <Option value="artist">Artist</Option>
              <Option value="manager">Business Manager</Option>
              <Option value="generalManager">General Manager</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" />
          </Form.Item>
       
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <Button type="default" onClick={handleGoogleSignIn} block>
          Sign Up with Google
        </Button>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
          <Link href="/login">
            <Text>{"Already have an account? Sign In"}</Text>
          </Link>
        </div>
      </Content>
    </Layout>
  );
}
