import { useState } from 'react';
import FormInput from './FormInput';
import PasswordInput from './PasswordInput';
import GenderSelect from './GenderSelect';

function SignUpForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Age validation
    const age = parseInt(formData.age);
    if (isNaN(age) || age < 10 || age > 120) {
      newErrors.age = 'Age must be between 10 and 120';
    }

    // Phone validation
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    // Email validation
    if (!formData.email.includes('@')) {
      newErrors.email = 'Email must contain @ symbol';
    }

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        label="Full Name"
        value={formData.fullName}
        onChange={handleInputChange('fullName')}
        placeholder="Enter your full name"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <FormInput
            label="Age"
            type="number"
            value={formData.age}
            onChange={handleInputChange('age')}
            placeholder="Enter your age"
            required
            error={errors.age}
          />
        </div>

        <GenderSelect
          value={formData.gender}
          onChange={handleInputChange('gender')}
        />
      </div>

      <FormInput
        label="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={handleInputChange('phone')}
        placeholder="Enter 10-digit phone number"
        required
        error={errors.phone}
      />

      <FormInput
        label="Email ID"
        type="email"
        value={formData.email}
        onChange={handleInputChange('email')}
        placeholder="Enter your email"
        required
        error={errors.email}
      />

      <div className="grid grid-cols-2 gap-4">
        <PasswordInput
          label="Password"
          value={formData.password}
          onChange={handleInputChange('password')}
          placeholder="Enter password"
        />

        <PasswordInput
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange('confirmPassword')}
          placeholder="Confirm password"
          error={errors.confirmPassword}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignUpForm;