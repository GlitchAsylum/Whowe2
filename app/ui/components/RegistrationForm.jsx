import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.message);
      setLoading(false);
      return;
    }
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      setError('Login failed after registration');
      setLoading(false);
    } else {
      window.location.href = '/'; // Redirect to homepage
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <label htmlFor="reg-email">Email</label>
      <input
        id="reg-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-describedby="reg-email-error"
      />
      <label htmlFor="reg-password">Password</label>
      <input
        id="reg-password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        aria-describedby="reg-password-error"
      />
      <label htmlFor="confirm-password">Confirm Password</label>
      <input
        id="confirm-password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        aria-describedby="confirm-password-error"
      />
      {error && (
        <p id="form-error" style={{ color: 'red' }} role="alert">
          {error}
        </p>
      )}
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}