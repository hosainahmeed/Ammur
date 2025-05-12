import React from 'react';
import { CreateAccountProps } from './create-account';
import { Button, Form, Input, Select, message } from 'antd';

interface PersonalInfoValues {
  profession: string;
  relative: string;
  familySide: string;
  password: string;
  confirmPassword: string;
}

function PersonalInformation({ onContinue }: CreateAccountProps) {
  const [form] = Form.useForm<PersonalInfoValues>();
  const [loading, setLoading] = React.useState(false);

  const professionOptions = [
    { value: 'doctor', label: 'Doctor' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'engineer', label: 'Engineer' },
    { value: 'lawyer', label: 'Lawyer' },
    { value: 'designer', label: 'Designer' },
    { value: 'developer', label: 'Developer' },
    { value: 'other', label: 'Other' },
  ];

  const familySideOptions = [
    { value: 'paternal', label: 'Paternal' },
    { value: 'maternal', label: 'Maternal' },
    { value: 'both', label: 'Both' },
  ];

  const handleSubmit = async (values: PersonalInfoValues) => {
    try {
      setLoading(true);

      // Additional validation
      if (values.password !== values.confirmPassword) {
        form.setFields([{
          name: 'confirmPassword',
          errors: ['Passwords do not match'],
        }]);
        return;
      }

      if (values.password.length < 8) {
        form.setFields([{
          name: 'password',
          errors: ['Password must be at least 8 characters'],
        }]);
        return;
      }

      // Call parent component's continue handler with the form values
      onContinue(values);

      // Optional: Show success message
      message.success('Personal information submitted successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      message.error('Failed to submit personal information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-center mb-2">
        Personal Information
      </h1>
      <p className="text-gray-500 text-center mb-6">
        Complete your profile information.
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-4"
      >
        <Form.Item<PersonalInfoValues>
          label="Profession"
          name="profession"
          rules={[{ required: true, message: 'Please select your profession' }]}
        >
          <Select
            showSearch
            placeholder="Select your profession"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={professionOptions}
          />
        </Form.Item>

        <Form.Item<PersonalInfoValues>
          label="Eldest Relative You Know"
          name="relative"
          rules={[{ required: true, message: 'Please enter relative name' }]}
        >
          <Input placeholder="Enter eldest relative's name" />
        </Form.Item>

        <Form.Item<PersonalInfoValues>
          label="Select your family side"
          name="familySide"
          rules={[{ required: true, message: 'Please select family side' }]}
        >
          <Select
            placeholder="Select your family side"
            options={familySideOptions}
          />
        </Form.Item>

        <Form.Item<PersonalInfoValues>
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 8, message: 'Password must be at least 8 characters' },
          ]}
        >
          <Input.Password
            placeholder="Enter password (min 8 characters)"
          />
        </Form.Item>

        <Form.Item<PersonalInfoValues>
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>

        <div className="pt-4">
          <Button
            type="primary"
            htmlType="submit"
            className="!w-full !bg-[#0D2A59] hover:!bg-[#0a1f42]"
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default PersonalInformation;