import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AuthRoute from '../pages/AuthRoute';

describe('auth smoke', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders login page for guests', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/login" element={<div>Login Page</div>} />
          </Route>
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('redirects authenticated users away from login', () => {
    localStorage.setItem(
      'user',
      JSON.stringify({ exp_unix: Math.floor(Date.now() / 1000) + 3600 })
    );

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/login" element={<div>Login Page</div>} />
          </Route>
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
