import React, { useEffect } from 'react';
import { Button, Form, Input, Select } from 'antd';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Country, State, City } from 'country-state-city';
import { useUpdateProfileDataMutation } from '@/app/provider/Redux/service/profileApis';
import { toast } from 'sonner';

interface ProfileData {
  fullName: string;
  contactNo: string;
  email: string;
  country?: string;
  state?: string;
  city?: string;
}

interface ProfileEditComponentProps {
  data?: Partial<ProfileData> & { _id?: string };
  image: File | null | string;
}

const ProfileEditComponent: React.FC<ProfileEditComponentProps> = ({
  data,
  image,
}) => {
  const [form] = Form.useForm();

  const countries = Country.getAllCountries();
  const selectedCountry = Form.useWatch('country', form);
  const selectedState = Form.useWatch('state', form);

  const states = selectedCountry
    ? State.getStatesOfCountry(
        countries.find((c) => c.name === selectedCountry)?.isoCode || ''
      )
    : [];

  const cities =
    selectedCountry && selectedState
      ? City.getCitiesOfState(
          countries.find((c) => c.name === selectedCountry)?.isoCode || '',
          states.find((s) => s.name === selectedState)?.isoCode || ''
        )
      : [];

  const [setProfileUpdate, { isLoading: isProfileUpdate }] =
    useUpdateProfileDataMutation();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        fullName: data.fullName,
        contactNo: data.contactNo,
        email: data.email,
        country: data.country,
        state: data.state,
        city: data.city,
      });
    }
  }, [data, form]);

  const onFinish = async (values: ProfileData) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    if (image instanceof File) {
      formData.append('file', image);
    }

    try {
      const res = await setProfileUpdate({
        data: formData,
        id: data?._id,
      }).unwrap();
      if (res?.data?.success) {
        toast.dismiss();
        toast.success(res?.data?.message || 'Profile updated successfully');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Profile update failed');
    }
  };

  return (
    <div>
      <p className="text-[#072A5E] text-3xl text-center">Edit Your Profile</p>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item
          name="fullName"
          label={<span className="text-black">Full Name</span>}
          rules={[{ required: true, message: 'Full name is required' }]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label={<span className="text-black">Email</span>}
        >
          <Input placeholder="Email" disabled />
        </Form.Item>

        <Form.Item
          name="contactNo"
          label={<span className="text-black">Phone Number</span>}
          rules={[{ required: true, message: 'Phone number is required' }]}
        >
          <ReactPhoneInput
            country={'bd'}
            inputStyle={{ width: '100%', height: '40px' }}
            onChange={(value) => form.setFieldsValue({ contactNo: value })}
          />
        </Form.Item>

        <Form.Item
          name="country"
          label={<span className="text-black">Country</span>}
          rules={[{ required: true, message: 'Country is required' }]}
        >
          <Select
            showSearch
            placeholder="Select country"
            optionFilterProp="children"
            options={countries.map((c) => ({
              label: c.name,
              value: c.name, // use name instead of isoCode
            }))}
            onChange={() => {
              form.setFieldsValue({ state: undefined, city: undefined });
            }}
          />
        </Form.Item>

        <Form.Item
          name="state"
          label={<span className="text-black">State/Province</span>}
          rules={[{ required: true, message: 'State is required' }]}
        >
          <Select
            showSearch
            placeholder="Select state"
            optionFilterProp="children"
            disabled={!selectedCountry}
            options={states.map((s) => ({
              label: s.name,
              value: s.name, // use name instead of isoCode
            }))}
            onChange={() => {
              form.setFieldsValue({ city: undefined });
            }}
          />
        </Form.Item>

        <Form.Item
          name="city"
          label={<span className="text-black">City</span>}
          rules={[{ required: true, message: 'City is required' }]}
        >
          <Select
            showSearch
            placeholder="Select city"
            optionFilterProp="children"
            disabled={!selectedState}
            options={cities.map((c) => ({
              label: c.name,
              value: c.name,
            }))}
          />
        </Form.Item>

        <Button
          htmlType="submit"
          loading={isProfileUpdate}
          style={{ backgroundColor: '#072A5E', color: '#fff', height: 40 }}
          className="w-full hover:!bg-[#0a3a7a] transition-colors"
        >
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default ProfileEditComponent;
