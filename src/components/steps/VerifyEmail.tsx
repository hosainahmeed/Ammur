'use client';
import { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import 'antd/dist/reset.css';
import { CreateAccountProps } from './create-account';

const { Text } = Typography;

const VerifyEmail = ({ onContinue }: CreateAccountProps) => {
  const [otp, setOtp] = useState('');
  const [verifyEmail, setEmail] = useState('');

  const handleVerify = async () => {
    const otpNumberConvert = Number(otp);
    if (!otp || otp.length !== 5) {
      return;
    }

    const data = {
      email: verifyEmail,
      verifyCode: otpNumberConvert,
    };
    console.log(data);
    localStorage.setItem('login', 'true');
    onContinue();
  };

  const handleResendOtp = async () => {
    const email = localStorage.getItem('register-email');

    if (!email) {
      return;
    }
    const data = { email };
    console.log(data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#fff] max-w-[400px] w-full p-6 rounded-lg shadow-md">
        <Text
          strong
          style={{
            fontSize: '24px',
            textAlign: 'center',
            display: 'block',
            marginBottom: '16px',
          }}
        >
          Check your email
        </Text>
        <p className="text-base !text-center mb-6 text-[#666]">
          We sent a reset link to <strong>{verifyEmail}</strong>. Enter the
          5-digit code mentioned in the email.
        </p>

        <div className="flex items-center justify-center">
          <Input.OTP
            length={5}
            value={otp}
            onChange={(value) => setOtp(value)}
            className="!w-[48px] !h-[48px] !text-[18px] !mb-[24px]"
          />
        </div>

        <Button
          type="primary"
          block
          onClick={() => handleVerify()}
          className="!text-white !bg-[#072A5E] !my-4"
        >
          {/* {isLoading ? 'Verifying OTP...' : 'Verify OTP'} */}Verify OTP
        </Button>

        <Text style={{ textAlign: 'center', color: '#666' }}>
          You have not received the email?{' '}
          <Button
            type="link"
            onClick={handleResendOtp}
            // disabled={isLoadingResend}
            style={{ padding: 0 }}
          >
            {/* {isLoadingResend ? 'Resending OTP...' : 'Resend'} */}Resend
          </Button>
        </Text>
      </div>
    </div>
  );
};

export default VerifyEmail;
