import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Logo from '../../assets/icons/logo.svg';
import LoginIllustration from '../../assets/images/login-img.png';
import './Login.scss';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setErrors({ password: 'Invalid email or password' });
      }
    } catch (error) {
      setErrors({ password: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Forgot password functionality would be implemented here');
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__left">
          <div className="login__logo">
            <img src={Logo} alt="Lendsqr" />
          </div>
          <div className="login__illustration">
            <img src={LoginIllustration} alt="Login illustration" />
          </div>
        </div>
        
        <div className="login__right">
          <div className="login__form-container">
            <div className="login__header">
              <h1 className="login__title">Welcome!</h1>
              <p className="login__subtitle">Enter details to login.</p>
            </div>
            
            <form className="login__form" onSubmit={handleSubmit} noValidate>
              <div className="login__field">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  autoComplete="email"
                />
              </div>
              
              <div className="login__field">
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  showPasswordToggle
                  autoComplete="current-password"
                />
              </div>
              
              <button
                type="button"
                className="login__forgot-password"
                onClick={handleForgotPassword}
              >
                FORGOT PASSWORD?
              </button>
              
              <Button
                type="submit"
                variant="primary"
                size="medium"
                fullWidth
                loading={isLoading}
                className="login__submit-btn"
              >
                LOG IN
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;