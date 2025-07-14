'use client';
import type React from 'react';
import { useState, useEffect } from 'react';
import { Button, Input, Form, Select, Divider, Typography } from 'antd';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { IState, ICity } from 'country-state-city';
import { Country, State, City } from 'country-state-city';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { register } from '@/app/provider/Redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';

export interface CreateAccountProps {
  onContinue?: any;
  setValues?: any;
}

interface FormValues {
  fullName: string;
  email: string;
  contactNo: string;
  country: string;
  state?: string;
  city?: string;
}

export default function CreateAccount({ onContinue }: CreateAccountProps) {
  const dispatch = useDispatch();
  const registerData = useSelector((state: any) => state.auth);
  const { Text } = Typography;
  const initialValues: FormValues = {
    fullName: registerData.fullName,
    email: registerData.email,
    contactNo: registerData.contactNo,
    country: registerData.country,
    state: registerData.state,
    city: registerData.city,
  };
  const [form] = Form.useForm<FormValues>();
  const [contactNo, setContactNo] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  const countries = Country.getAllCountries();

  useEffect(() => {
    if (country) {
      const countryStates = State.getStatesOfCountry(country);
      setStates(countryStates);
      setState('');
      setCity('');
    } else {
      setStates([]);
      setState('');
      setCities([]);
      setCity('');
    }
  }, [country]);

  useEffect(() => {
    if (country && state) {
      const stateCities = City.getCitiesOfState(country, state);
      setCities(stateCities);
      setCity('');
    } else {
      setCities([]);
      setCity('');
    }
  }, [state, country]);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: any) => {
      console.log(tokenResponse);
      try {
        const res = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const userInfo = await res.json();
        console.log(userInfo);
        const data = {
          fullName: userInfo.name,
          email: userInfo.email,
        };
        dispatch(register(data));
        alert('User registered successfully');
        onContinue(data);
      } catch (error) {
        console.error('Failed to fetch user info', error);
      }
    },
    onError: (error) => console.error(error),
  });

  const handleSubmit = (values: FormValues) => {
    const formData = {
      fullName: values.fullName,
      email: values.email,
      contactNo: values.contactNo,
      address: `${city}, ${state}, ${country}`,
    };
    dispatch(register(formData));
    alert('User registered successfully');
    onContinue(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-center mb-2">
        Create a free account
      </h1>
      <p className="text-gray-500 text-center mb-6">
        Provide your email and choose a password.
      </p>

      <Form<FormValues>
        requiredMark={false}
        form={form}
        initialValues={initialValues}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-4"
      >
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          <div className="space-y-2">
            <Form.Item<FormValues>
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: 'Please enter your name!' }]}
            >
              <Input
                type="text"
                placeholder="Please enter your name"
                className="ant-input"
              />
            </Form.Item>
          </div>
          <div className="space-y-2">
            <Form.Item<FormValues>
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Enter a valid email address!' },
              ]}
            >
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="ant-input"
              />
            </Form.Item>
          </div>
          <div className="space-y-2">
            <Form.Item<FormValues>
              label="Phone Number"
              name="contactNo"
              required
              rules={[
                { required: true, message: 'Please enter your phone number!' },
              ]}
            >
              <ReactPhoneInput
                country={'us'}
                value={contactNo}
                onChange={(value) => setContactNo(value)}
                inputStyle={{ width: '100%' }}
              />
            </Form.Item>
          </div>
          <div className="space-y-2">
            <Form.Item<FormValues>
              label="Country"
              name="country"
              rules={[
                { required: true, message: 'Please select your country!' },
              ]}
            >
              <Select
                showSearch
                placeholder="Select country"
                optionFilterProp="children"
                onChange={(value) => setCountry(value)}
                value={country || undefined}
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={countries.map((country) => ({
                  value: country.isoCode,
                  label: country.name,
                }))}
              />
            </Form.Item>
          </div>

          <div className="space-y-2">
            <Form.Item<FormValues> label="State/Province" name="state">
              <Select
                showSearch
                placeholder="Select state"
                optionFilterProp="children"
                onChange={(value) => setState(value)}
                value={state || undefined}
                disabled={!country}
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={states.map((state) => ({
                  value: state.isoCode,
                  label: state.name,
                }))}
              />
            </Form.Item>
          </div>

          <div className="space-y-2">
            <Form.Item<FormValues> label="City" name="city" required>
              <Select
                showSearch
                placeholder="Select city"
                optionFilterProp="children"
                onChange={(value) => setCity(value)}
                value={city || undefined}
                disabled={!state}
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={cities.map((city) => ({
                  value: city.name,
                  label: city.name,
                }))}
              />
            </Form.Item>
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="primary"
            htmlType="submit"
            className="!w-full !bg-[#0D2A59] !hover:bg-[#0D2A59]"
          >
            Continue
          </Button>
        </div>
      </Form>

      <div className="mt-6 text-center">
        <Divider>or</Divider>

        <Button
          onClick={() => googleLogin()}
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
            Already have Account?{' '}
            <Link href="/auth/sign-in" style={{ color: '#4B5563' }}>
              Go to sign in.
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
}
