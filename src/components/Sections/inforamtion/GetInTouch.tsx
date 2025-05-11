'use client';
import { Button, Form, Input, message, ConfigProvider } from 'antd';
import { useState } from 'react';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import Head from 'next/head';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomInput = ({ label, name, prefix, placeholder, rules }: any) => (
  <Form.Item label={label} name={name} rules={rules}>
    <Input
      prefix={prefix}
      placeholder={placeholder}
      className="!border-gray-300 !rounded-xl !px-4 !py-3 !text-gray-700 !focus:ring-2 !focus:ring-blue-500"
    />
  </Form.Item>
);

const GetInTouch = () => {
  const [loading, setLoading] = useState(false);

  // Form submit handler
  const onFinish = async (values: {
    name: string;
    email: string;
    message: string;
  }) => {
    setLoading(true);
    try {
      console.log('Form values:', values); // Normally, send this to an API
      message.success(
        'Thank you for getting in touch! We will get back to you soon.'
      );
    } catch (error) {
      console.error(error);
      message.error('Something went wrong, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#072A5E',
        },
      }}
    >
      <div>
        <Head>
          <title>Contact Us</title>
          <meta
            name="description"
            content="Get in touch with us for inquiries or support"
          />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content="Contact Us" />
          <meta
            property="og:description"
            content="Reach out for support or inquiries."
          />
          <meta property="og:type" content="website" />
        </Head>
        <nav className="text-sm text-gray-500 mb-4"></nav>

        <div className="flex items-center md:gap-12 justify-between flex-col md:flex-row">
          <div className="w-full">
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl xl:text-6xl font-semibold text-gray-800 mb-6">
                Contact Us
              </h1>
              <p className="text-lg">
                <strong>Email:</strong> youremail@gmail.com
              </p>
              <p className="text-lg">
                <strong>Phone:</strong> (+1) (888) 750-6866
              </p>
              <p className="text-lg">Ietsialv@gmail.com</p>
              <p className="text-lg">(+1) (888) 785-3986</p>
            </div>
          </div>

          <div className="max-w-4xl w-full mx-auto md:p-6 md:bg-white md:rounded-lg md:mt-0 mt-12 md:shadow-lg">
            <h2 className="text-3xl font-bold md:text-center text-gray-800 mb-6">
              Get in Touch
            </h2>

            <Form
              requiredMark={false}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ remember: true }}
            >
              <CustomInput
                label="Your Name"
                name="name"
                prefix={<UserOutlined />}
                placeholder="Your name"
                rules={[{ required: true, message: 'Please enter your name!' }]}
              />

              <CustomInput
                label="Your Email"
                name="email"
                prefix={<MailOutlined />}
                placeholder="Your email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  {
                    type: 'email',
                    message: 'Please enter a valid email address!',
                  },
                ]}
              />

              <Form.Item
                label="Your Message"
                name="message"
                rules={[
                  { required: true, message: 'Please enter your message!' },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Your message"
                  className="!border-gray-300 !rounded-xl !px-4 !py-3 !text-gray-700 !focus:ring-2 !focus:ring-blue-500"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  className="!bg-[#072A5E] !text-white !rounded-xl !py-3 !hover:!bg-blue-700 !focus:ring-4 !focus:ring-blue-300"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default GetInTouch;
