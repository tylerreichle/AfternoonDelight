export const login = user => (
  fetch(
    'http://localhost:3000/api/session',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    },
  )
);

export const logout = () => (
  fetch(
    'http://localhost:3000/api/session',
    {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
);

export const signup = user => (
  fetch(
    'http://localhost:3000/api/users',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    },
  )
);