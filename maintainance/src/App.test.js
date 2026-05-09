import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    }),
  );
});

afterAll(() => {
  global.fetch.mockRestore?.();
});

test('renders maintenance header', () => {
  render(<App />);
  expect(screen.getByText(/Scorpion Maintenance/i)).toBeInTheDocument();
});
