import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import SearchResults from '../components/SearchResults';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock('../components/Navbar', () => ({
  default: () => <div data-testid="navbar" />,
}));

vi.mock('../components/Footer', () => ({
  default: () => <div data-testid="footer" />,
}));

describe('product search smoke', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads and renders search results for a keyword', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          product_id: 1,
          product_name: 'Galaxy S25',
          image_url: '/images/galaxy-s25.png',
          base_price: 21000000,
          sale_price: 19900000,
        },
      ],
    });

    render(
      <MemoryRouter initialEntries={['/resultsearch?keyword=galaxy']}>
        <Routes>
          <Route path="/resultsearch" element={<SearchResults />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    expect(await screen.findByText('Galaxy S25')).toBeInTheDocument();
    expect(screen.getByText(/Tìm thấy 1 sản phẩm phù hợp/i)).toBeInTheDocument();
  });
});
