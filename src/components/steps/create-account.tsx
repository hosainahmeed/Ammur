/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import type React from 'react';
import { useState, useEffect } from 'react';
import { Button, Input, Form, Select, Divider, Typography } from 'antd';
import ReactPhoneInput from 'react-phone-input-2';
import { GoogleOutlined } from '@ant-design/icons';
import 'react-phone-input-2/lib/style.css';
import { IState, ICity } from 'country-state-city';
import { Country, State, City } from 'country-state-city';
import Link from 'next/link';

export interface CreateAccountProps {
  onContinue: any;
  setValues?: any;
}

interface FormValues {
  name: string;
  email: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
}

export default function CreateAccount({ onContinue }: CreateAccountProps) {
  const { Text } = Typography;
  const initialValues: FormValues = {
    name: '',
    email: '',
    phoneNumber: '',
    country: '',
    state: '',
    city: '',
  };
  const [form] = Form.useForm<FormValues>();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
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

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
  };

  const handleCityChange = (value: string) => {
    setCity(value);
  };

  const handleStateChange = (value: string) => {
    setState(value);
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
  };

  const handleSubmit = (values: FormValues) => {
    const formData = {
      ...values,
      phoneNumber,
      country: countries.find((c) => c.isoCode === country)?.name || country,
      state: states.find((s) => s.isoCode === state)?.name || state,
      city,
    };
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
              name="name"
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
              name="phoneNumber"
              required
            >
              <ReactPhoneInput
                country={'us'}
                value={phoneNumber}
                onChange={handlePhoneChange}
                inputStyle={{ width: '100%' }}
              />
            </Form.Item>
          </div>
          <div className="space-y-2">
            <Form.Item<FormValues> label="Country" name="country" required>
              <Select
                showSearch
                placeholder="Select country"
                optionFilterProp="children"
                onChange={handleCountryChange}
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
            <Form.Item<FormValues> label="State/Province" name="state" required>
              <Select
                showSearch
                placeholder="Select state"
                optionFilterProp="children"
                onChange={handleStateChange}
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
                onChange={handleCityChange}
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
          type="default"
          icon={<GoogleOutlined />}
          className="w-full mb-3 flex items-center justify-center"
        >
          Sign up with Google
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
