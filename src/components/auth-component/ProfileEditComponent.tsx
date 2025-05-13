/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Country, State, City } from 'country-state-city';

interface ProfileData {
    name: string;
    phoneNumber: string;
    email: string;
    country?: string;
    state?: string;
    city?: string;
}

interface ProfileEditComponentProps {
    data?: Partial<ProfileData>;
    image: File | null | string;
}

interface FormValues extends ProfileData { }

const ProfileEditComponent: React.FC<ProfileEditComponentProps> = ({
    data = {
        name: 'Sarah Johnson',
        phoneNumber: '+1 (555) 123-4567',
        email: 'sarah.johnson@example.com',
    },
    image,
}) => {
    const [form] = Form.useForm<FormValues>();
    const [phoneNumber, setPhoneNumber] = React.useState(data.phoneNumber || '');
    const [selectedCountry, setSelectedCountry] = React.useState(data.country || '');
    const [selectedState, setSelectedState] = React.useState(data.state || '');
    const [selectedCity, setSelectedCity] = React.useState(data.city || '');

    // Get all countries
    const countries = Country.getAllCountries();

    // Get states based on selected country
    const states = selectedCountry
        ? State.getStatesOfCountry(selectedCountry)
        : [];

    // Get cities based on selected country and state
    const cities = selectedCountry && selectedState
        ? City.getCitiesOfState(selectedCountry, selectedState)
        : [];

    const handlePhoneChange = (value: string) => {
        setPhoneNumber(value);
        form.setFieldsValue({ phoneNumber: value });
    };

    const handleCountryChange = (value: string) => {
        setSelectedCountry(value);
        setSelectedState('');
        setSelectedCity('');
        form.setFieldsValue({
            country: value,
            state: undefined,
            city: undefined
        });
    };

    const handleStateChange = (value: string) => {
        setSelectedState(value);
        setSelectedCity('');
        form.setFieldsValue({
            state: value,
            city: undefined
        });
    };

    const handleCityChange = (value: string) => {
        setSelectedCity(value);
        form.setFieldsValue({ city: value });
    };

    const onFinish = async (values: FormValues) => {
        const updateData = {
            name: values.name,
            phoneNumber: values.phoneNumber,
            country: values.country,
            state: values.state,
            city: values.city
        };
        console.log(updateData);
    };

    return (
        <div>
            <p className="text-[#072A5E] text-3xl text-center">Edit Your Profile</p>
            <Form
                className="text-white"
                requiredMark={false}
                form={form}
                onFinish={onFinish}
                layout="vertical"
                initialValues={{
                    name: data.name || '',
                    email: data.email || '',
                    phoneNumber: data.phoneNumber || '',
                    country: data.country || undefined,
                    state: data.state || undefined,
                    city: data.city || undefined
                }}
            >
                <Form.Item
                    name="name"
                    label={<span className="text-black">Name</span>}
                    rules={[{ required: true, message: 'Name is required' }]}
                >
                    <Input
                        style={{
                            width: '100%',
                            height: 40,
                            border: '1px solid #222',
                            borderRadius: '5px',
                            color: '#111',
                            backgroundColor: '#fff',
                            outline: 'none',
                        }}
                        placeholder="Name"
                        className="p-2 w-full outline-none border-none h-11 text-[var(--white-600)]"
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    label={<span className="text-black">Email</span>}
                >
                    <Input
                        style={{
                            width: '100%',
                            height: 40,
                            border: '1px solid #222',
                            borderRadius: '5px',
                            color: '#111',
                            backgroundColor: '#fff',
                            outline: 'none',
                        }}
                        disabled
                        type="email"
                        placeholder="Email"
                        className="cursor-not-allowed p-2 w-full outline-none border-none h-11 text-[var(--white-600)]"
                    />
                </Form.Item>

                <div className="space-y-2">
                    <Form.Item
                        label={<span className="text-black">Phone Number</span>}
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Phone number is required' }]}
                    >
                        <ReactPhoneInput
                            country={'us'}
                            value={phoneNumber}
                            onChange={handlePhoneChange}
                            inputStyle={{ width: '100%', height: '40px' }}
                        />
                    </Form.Item>
                </div>

                <div className="space-y-2">
                    <Form.Item
                        label={<span className="text-black">Country</span>}
                        name="country"
                        rules={[{ required: true, message: 'Country is required' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Select country"
                            optionFilterProp="children"
                            onChange={handleCountryChange}
                            value={selectedCountry || undefined}
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
                    <Form.Item
                        label={<span className="text-black">State/Province</span>}
                        name="state"
                        rules={[{ required: true, message: 'State is required' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Select state"
                            optionFilterProp="children"
                            onChange={handleStateChange}
                            value={selectedState || undefined}
                            disabled={!selectedCountry}
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
                    <Form.Item
                        label={<span className="text-black">City</span>}
                        name="city"
                        rules={[{ required: true, message: 'City is required' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Select city"
                            optionFilterProp="children"
                            onChange={handleCityChange}
                            value={selectedCity || undefined}
                            disabled={!selectedState}
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

                <Button
                    htmlType="submit"
                    style={{
                        backgroundColor: '#072A5E',
                        color: '#fff',
                        height: 40,
                    }}
                    className="!bg-[#072A5E] hover:!bg-[#0a3a7a] w-full transition-colors"
                >
                    Update Profile
                </Button>
            </Form>
        </div>
    );
};

export default ProfileEditComponent;