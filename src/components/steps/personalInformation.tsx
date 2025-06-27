'use client';
import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
// import { useCreateMemberMutation } from '@/app/provider/Redux/services/memberApi';

interface PersonalInfoValues {
  profession: string;
  eldestRelative: string;
  familySide: string;
  password: string;
  familyName?: string;
}

function PersonalInformation({ onContinue }: { onContinue: () => void }) {
  const [form] = Form.useForm<PersonalInfoValues>();
  const [loading, setLoading] = React.useState(false);
  // const [createMember] = useCreateMemberMutation();
  const registerData = useSelector((state: any) => state.auth);

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
      const finalPayload = {
        fullName: registerData.fullName,
        email: registerData.email,
        contactNo: registerData.contactNo,
        password: values.password,
        preferedContactMethod: 'email',
        address: registerData.address,
        proffession: values.profession,
        eldestRelative: values.eldestRelative,
        familySide: values.familySide,
        familyName: values.familyName || 'Murphy',
        role: 'member',
      };

      toast.success('Member created successfully!');
      console.log('Backend Response:', finalPayload);

      // if (onContinue) onContinue(); // move to next step

    } catch (error: any) {
      console.error('API error:', error);
      toast.error(error?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-center mb-2">Personal Information</h1>
      <p className="text-gray-500 text-center mb-6">Complete your profile information.</p>

      <Form
        requiredMark={false}
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
            options={professionOptions}
          />
        </Form.Item>

        <Form.Item<PersonalInfoValues>
          label="Eldest Relative You Know"
          name="eldestRelative"
          rules={[{ required: true, message: 'Please enter relative name' }]}
        >
          <Input placeholder="Enter eldest relative's name" />
        </Form.Item>

        <Form.Item<PersonalInfoValues>
          label="Select your family side"
          name="familySide"
          rules={[{ required: true, message: 'Please select family side' }]}
        >
          <Select placeholder="Select your family side" options={familySideOptions} />
        </Form.Item>

        <Form.Item<PersonalInfoValues>
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 8, message: 'Password must be at least 8 characters' },
          ]}
        >
          <Input.Password placeholder="Enter password (min 8 characters)" />
        </Form.Item>

        <Form.Item<PersonalInfoValues>
          label="Family Name"
          name="familyName"
        >
          <Input placeholder="Enter family name (optional)" />
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
