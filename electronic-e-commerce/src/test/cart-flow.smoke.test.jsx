import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Cart from '../pages/Cart';
import {
  clearCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from '../lib/cartService';

vi.mock('../components/Navbar', () => ({
  default: () => <div data-testid="navbar" />,
}));

vi.mock('../components/Footer', () => ({
  default: () => <div data-testid="footer" />,
}));

vi.mock('../lib/cartService', () => ({
  getCart: vi.fn(),
  removeFromCart: vi.fn(),
  updateCartQuantity: vi.fn(),
  clearCart: vi.fn(),
}));

describe('cart flow smoke', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'confirm').mockReturnValue(true);
  });

  afterEach(() => {
    window.confirm.mockRestore();
  });

  it('clears cart and shows empty state', async () => {
    getCart
      .mockResolvedValueOnce({
        success: true,
        data: [
          {
            cart_item_id: 9,
            product_name: 'Galaxy Buds',
            quantity: 1,
            image_url: '/images/buds.png',
            sale_price: 120,
            base_price: 130,
            additional_price: 0,
            sku: 'BUDS-001',
          },
        ],
        total_price: 120,
      })
      .mockResolvedValueOnce({
        success: false,
        data: [],
        total_price: 0,
      });

    clearCart.mockResolvedValue({ success: true });
    removeFromCart.mockResolvedValue({ success: true });
    updateCartQuantity.mockResolvedValue({ success: true });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    const clearButton = await screen.findByRole('button', { name: /clear cart/i });
    await userEvent.click(clearButton);

    await waitFor(() => {
      expect(clearCart).toHaveBeenCalledTimes(1);
    });

    expect(await screen.findByText(/Your cart is empty/i)).toBeInTheDocument();
  });
});
