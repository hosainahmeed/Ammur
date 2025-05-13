/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState } from 'react';
import { Input, Button, Typography } from 'antd';
// import { useRouter } from 'next/navigation';
import 'antd/dist/reset.css';
import { CreateAccountProps } from './create-account';

const { Text } = Typography;

const VerifyEmail = ({ onContinue }: CreateAccountProps) => {
  const [otp, setOtp] = useState('');
  const [verifyEmail, setEmail] = useState('');
  //   const router = useRouter();

  //   useEffect(() => {
  //     const email = localStorage.getItem('register-email');
  //     if (!email) {
  //       //   toast.error('Email not found! Please enter your email again.');
  //       router.push('/register');
  //     } else {
  //       setEmail(email);
  //     }
  //   }, [router]);

  const handleVerify = async () => {
    const otpNumberConvert = Number(otp);
    if (!otp || otp.length !== 5) {
      //   toast.error('Please enter a valid 5-digit OTP.');
      return;
    }

    const data = {
      email: verifyEmail,
      verifyCode: otpNumberConvert,
    };
    console.log(data);
    localStorage.setItem('login', 'true');
    onContinue();
    // try {
    //   const response = await verifycode({ data }).unwrap();
    //   console.log(response);
    //   if (response?.success) {
    //     Cookies.remove('token');
    //     Cookies.set('token', response?.data?.accessToken);
    //     localStorage.setItem('accessToken', response?.data?.accessToken);
    //     toast.success('User registered successfully.');
    //     const accToken = localStorage.getItem('accessToken');
    //     const condition = accToken !== null;
    //     if (condition) {
    //       window.location.href = '/';
    //     }
    //   }
    // } catch (err) {
    //   console.error(err);
    //   toast.error('Invalid OTP. Please try again.');
    // }
  };

  const handleResendOtp = async () => {
    const email = localStorage.getItem('register-email');

    if (!email) {
      //   toast.error('No email found. Please try again.');
      return;
    }
    const data = { email };
    console.log(data);
    // try {
    //   const response = await resentOtp(data).unwrap();

    //   if (response?.success) {
    //     toast.success('OTP has been resent successfully. Check your email.');
    //   } else {
    //     const errorMessage =
    //       response?.message || 'Failed to resend OTP. Please try again.';
    //     toast.error(errorMessage);
    //   }
    // } catch (err) {
    //   console.error('Failed to resend OTP:', err);
    //   const errorMessage =
    //     err?.data?.message || 'Something went wrong. Please try again later.';
    //   toast.error(errorMessage);
    // }
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
          //   disabled={otp.length !== 5 || isLoading}
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
