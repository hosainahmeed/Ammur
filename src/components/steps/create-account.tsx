// 'use client';

// import type React from 'react';
// import { useState } from 'react';
// import { Button, Input, Form } from 'antd';
// import { GoogleOutlined } from '@ant-design/icons';

// interface CreateAccountProps {
//   onContinue: () => void;
//   setEmail: (email: string) => void;
// }

// export default function CreateAccount({
//   onContinue,
//   setEmail,
// }: CreateAccountProps) {
//   const [email, setEmailLocal] = useState('');
//   const [password, setPassword] = useState('');
//   const [isValid, setIsValid] = useState(false);

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setEmailLocal(value);
//     setEmail(value);
//     validateForm(value, password);
//   };

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setPassword(value);
//     validateForm(email, value);
//   };

//   const validateForm = (email: string, password: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     setIsValid(emailRegex.test(email) && password.length >= 6);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isValid) {
//       onContinue();
//     }
//   };

//   return (
//     <div className="w-full">
//       <h1 className="text-2xl font-semibold text-center mb-2">
//         Create a free account
//       </h1>
//       <p className="text-gray-500 text-center mb-6">
//         Provide your email and choose a password.
//       </p>

//       <Form
//         requiredMark={false}
//         layout="vertical"
//         onSubmitCapture={handleSubmit}
//         className="space-y-4"
//       >
//         <div className="space-y-2">
//           <Form.Item
//             label="Email"
//             required
//             validateStatus={
//               email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'error' : ''
//             }
//             help={
//               email &&
//               !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
//               'Please enter a valid email address.'
//             }
//           >
//             <Input
//               id="email"
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={handleEmailChange}
//               className="ant-input"
//               required
//             />
//           </Form.Item>
//         </div>

//         <div className="space-y-2">
//           <Form.Item
//             label="Password*"
//             required
//             validateStatus={password && password.length < 6 ? 'error' : ''}
//             help={
//               password &&
//               password.length < 6 &&
//               'Password must be at least 6 characters long.'
//             }
//           >
//             <Input.Password
//               id="password"
//               type="password"
//               placeholder="Choose a password"
//               value={password}
//               onChange={handlePasswordChange}
//               className="ant-input"
//               required
//             />
//           </Form.Item>
//         </div>

//         <div className="pt-4">
//           <Button
//             type="primary"
//             htmlType="submit"
//             className="w-full bg-[#0D2A59] hover:bg-[#0D2A59]"
//             disabled={!isValid}
//           >
//             Continue
//           </Button>
//         </div>
//       </Form>

//       <div className="mt-6 text-center">
//         <p className="text-gray-500 mb-4">or</p>

//         <Button
//           type="default"
//           icon={<GoogleOutlined />}
//           className="w-full mb-3 flex items-center justify-center"
//         >
//           Sign up with Google
//         </Button>
//       </div>
//     </div>
//   );
// }
'use client';

import type React from 'react';
import { useState } from 'react';
import { Button, Input, Form, Select } from 'antd';
import ReactPhoneInput from 'react-phone-input-2';
import { GoogleOutlined } from '@ant-design/icons';
import 'react-phone-input-2/lib/style.css';

const cities = [
  { value: 'New York', label: 'New York' },
  { value: 'Los Angeles', label: 'Los Angeles' },
  { value: 'Chicago', label: 'Chicago' },
  { value: 'Houston', label: 'Houston' },
  // Add more cities as needed
];

const states = [
  { value: 'NY', label: 'New York' },
  { value: 'CA', label: 'California' },
  { value: 'IL', label: 'Illinois' },
  { value: 'TX', label: 'Texas' },
  // Add more states as needed
];

interface CreateAccountProps {
  onContinue: () => void;
  setEmail: (email: string) => void;
}

export default function CreateAccount({
  onContinue,
  setEmail,
}: CreateAccountProps) {
  const [email, setEmailLocal] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailLocal(value);
    setEmail(value);
    validateForm(value, password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validateForm(email, value);
  };

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    validateForm(email, password);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    validateForm(email, password);
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    validateForm(email, password);
  };

  const handleStateChange = (value: string) => {
    setState(value);
    validateForm(email, password);
  };

  const validateForm = (email: string, password: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(
      emailRegex.test(email) &&
        password.length >= 6 &&
        phoneNumber.length >= 10 &&
        address.length > 0 &&
        city.length > 0 &&
        state.length > 0
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onContinue();
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-center mb-2">
        Create a free account
      </h1>
      <p className="text-gray-500 text-center mb-6">
        Provide your email and choose a password.
      </p>

      <Form
        requiredMark={false}
        layout="vertical"
        onSubmitCapture={handleSubmit}
        className="space-y-4"
      >
        <div className="space-y-2">
          <Form.Item
            label="Email"
            required
            validateStatus={
              email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'error' : ''
            }
            help={
              email &&
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
              'Please enter a valid email address.'
            }
          >
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              className="ant-input"
              required
            />
          </Form.Item>
        </div>

        <div className="space-y-2">
          <Form.Item
            label="Password"
            required
            validateStatus={password && password.length < 6 ? 'error' : ''}
            help={
              password &&
              password.length < 6 &&
              'Password must be at least 6 characters long.'
            }
          >
            <Input.Password
              id="password"
              type="password"
              placeholder="Choose a password"
              value={password}
              onChange={handlePasswordChange}
              className="ant-input"
              required
            />
          </Form.Item>
        </div>

        <div className="space-y-2">
          <Form.Item label="Phone Number" required>
            <ReactPhoneInput
              country={'us'}
              value={phoneNumber}
              onChange={handlePhoneChange}
              inputStyle={{ width: '100%' }}
            />
          </Form.Item>
        </div>

        <div className="space-y-2">
          <Form.Item label="Address" required>
            <Input
              id="address"
              placeholder="Enter your street address"
              value={address}
              onChange={handleAddressChange}
              className="ant-input"
              required
            />
          </Form.Item>
        </div>

        <div className="space-y-2">
          <Form.Item label="City" required>
            <Select
              id="city"
              value={city}
              onChange={handleCityChange}
              placeholder="Select your city"
              className="w-full"
            >
              {cities.map((city) => (
                <Select.Option key={city.value} value={city.value}>
                  {city.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="space-y-2">
          <Form.Item label="State" required>
            <Select
              id="state"
              value={state}
              onChange={handleStateChange}
              placeholder="Select your state"
              className="w-full"
            >
              {states.map((state) => (
                <Select.Option key={state.value} value={state.value}>
                  {state.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="pt-4">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-[#0D2A59] hover:bg-[#0D2A59]"
            disabled={!isValid}
          >
            Continue
          </Button>
        </div>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-gray-500 mb-4">or</p>

        <Button
          type="default"
          icon={<GoogleOutlined />}
          className="w-full mb-3 flex items-center justify-center"
        >
          Sign up with Google
        </Button>
      </div>
    </div>
  );
}
