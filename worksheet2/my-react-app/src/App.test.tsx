import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    
    act(() => {
      root.render(<App />);
    });
    
    act(() => {
      root.unmount();
    });
  });
});

describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(5);
  });
});