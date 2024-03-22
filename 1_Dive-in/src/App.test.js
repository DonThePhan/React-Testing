/**
 *  Jest treats the following files as test files (& will execute them):
 *    a. it ends in .spec.js
 *    b. it ends in .test.js
 *    c. a plain js file found inside the folder __test__ (that's 2 _'s on each side)
 *
 */

import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from './App';

test('shows 6 products by default', async () => {
  /** 1. 'render' the component */
  render(<App />);

  /** 2. use 'screen' to find the element(s) */
  const titles = await screen.findAllByRole('heading');

  /** 3. use 'expect' to confirm an outcome */
  expect(titles).toHaveLength(6);
});

test('clicking on button load 6 more products', async () => {
  render(<App />);
  const button = await screen.findByRole('button', { name: /load more/i });
  user.click(button);

  await waitFor(async () => {
    const titles = await screen.findAllByRole('heading');
    expect(titles).toHaveLength(12);
  });
});
