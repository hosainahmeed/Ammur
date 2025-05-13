/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { GoogleOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import Link from 'next/link';

const page: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    localStorage.setItem('login', 'true');
    window.location.href = '/';
  };

  return (
    <div className="flex items-center flex-col mx-auto justify-center h-screen max-w-md">
      <h1 className="text-2xl font-semibold text-center mb-2">
        Login to Account
      </h1>
      <p className="text-gray-500 text-center mb-6">
        Please enter your email and password to continue
      </p>
      <Form
        name="login"
        initialValues={{ remember: true }}
        className="!w-full"
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link href="">Forgot password</Link>
          </Flex>
        </Form.Item>
        <Form.Item>
          <Button block className="!bg-[#0D2A59] !text-white" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            icon={<GoogleOutlined />}
            className="w-full mb-3 flex items-center justify-center"
          >
            Sign in with Google
          </Button>
        </Form.Item>
        or <Link href="/auth/sign-up">Register now!</Link>
      </Form>
    </div>
  );
};

export default page;
