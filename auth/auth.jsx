import { useState } from 'react';
import { signIn } from 'next-auth/react';
import LoginForm from '@/app/ui/components/LoginForm';
import RegistrationForm from '@/app/ui/components/RegistrationForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <button
        onClick={() => signIn('google')}
        style={{ display: 'block', width: '100%', margin: '10px 0' }}
      >
        Continue with Google
      </button>
      <hr style={{ margin: '20px 0' }} />
      {isLogin ? <LoginForm /> : <RegistrationForm />}
      <p>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}