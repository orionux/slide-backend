import { LoginUserRequest } from 'src/types/OnboardingApi';
import * as yup from 'yup';

// Validation schema
const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

// Validation function
export const validateLoginData = async (data: LoginUserRequest) => {
  try {
    await loginSchema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (err) {
    const errors = (err as yup.ValidationError).inner.reduce((acc, curr) => {
      acc[curr.path as string] = curr.message;
      return acc;
    }, {} as Record<string, string>);
    return { isValid: false, errors };
  }
};