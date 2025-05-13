'use client';
import { Button, Input, Divider, Typography, Form, Layout, Space } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;

export default function LoginPage() {
  return (
    <Layout className="min-h-screen">
      <Content className="h-screen grid lg:grid-cols-2">
        {/* Left side with illustration */}
        <div className="relative hidden lg:flex flex-col items-center justify-center p-8 bg-[#072a5e] text-white">
          <div className="max-w-md mx-auto text-center">
            <Space direction="vertical" size="large" align="center">
              <Image
                src="/amurphy/20250512_HonoringTheLivesPic2.jpg"
                alt="Decorative bird illustration"
                width={300}
                height={300}
                className="mx-auto"
              />
              <Title level={2} style={{ color: 'white', margin: 0 }}>
                Welcome to Family Legacy
              </Title>
              <Paragraph style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Discover a place where memories are cherished, and legacies are
                honored. Join us in celebrating the stories that connect us all.
              </Paragraph>
            </Space>
          </div>
        </div>

        {/* Right side with login form */}
        <div className="flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-sm">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <Title
                  level={1}
                  style={{
                    fontFamily: 'cursive',
                    marginBottom: 24,
                    fontSize: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                >
                  <Image
                    src={'/icons/IconOnly.svg'}
                    width={48}
                    height={48}
                    alt="icons"
                    className="rounded-full"
                  />
                  Family Legacy
                </Title>
              </div>

              <Form layout="vertical" style={{ width: '100%' }}>
                <Form.Item
                  label={<Text type="secondary">Users name or Email</Text>}
                  style={{ marginBottom: 16 }}
                >
                  <Input
                    placeholder="Please Input Emial or User name"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  label={<Text type="secondary">Password</Text>}
                  style={{ marginBottom: 8 }}
                >
                  <Input.Password
                    placeholder="please Enter password"
                    size="large"
                  />
                </Form.Item>

                <div style={{ textAlign: 'right', marginBottom: 24 }}>
                  <Link href="#" style={{ color: '#666', fontSize: '14px' }}>
                    Forget password?
                  </Link>
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  onClick={() => {
                    localStorage.setItem('login', 'true');
                    toast.success('Sign in Successfully');
                    window.location.href = '/';
                  }}
                  style={{ backgroundColor: '#072a5e' }}
                >
                  Sign in
                </Button>

                <Divider plain>or</Divider>

                <Button
                  size="large"
                  block
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    src="/icons/google.png"
                    alt="Google"
                    width={20}
                    height={20}
                    style={{ marginRight: 8 }}
                  />
                  Sign in with Google
                </Button>

                <div style={{ textAlign: 'center', marginTop: 24 }}>
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    Dont have Account?{' '}
                    <Link href="/auth/sign-up" style={{ color: '#4B5563' }}>
                      Create Account
                    </Link>
                  </Text>
                </div>
              </Form>
            </Space>
          </div>
        </div>
      </Content>
    </Layout>
  );
}
