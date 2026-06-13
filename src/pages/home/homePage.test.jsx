import { it, describe, vi, beforeEach, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Home } from './home'
import axios from 'axios'
import userEvent from '@testing-library/user-event'
import { within } from '@testing-library/dom'





vi.mock('axios')

describe('displaying products', () => {
  let loadCartMock;
  let user;
  beforeEach(() => {
    loadCartMock = vi.fn()
    user = userEvent.setup()

    axios.get.mockImplementation(async (url) => {
      if (url === '/api/products') {
        return {
          data: [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"]
            },
            {
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127
              },
              priceCents: 2095,
              keywords: ["sports", "basketballs"]
            }
          ]
        }
      }
    })
  })
  it('renders product details correctly', async () => {

    render(
      <MemoryRouter>
        <Home cart={[]} fetchCart={loadCartMock} />
      </MemoryRouter>
    )
    const productContainers = await screen.findAllByTestId('product-container')
    expect(productContainers).toHaveLength(2)
    expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument()
    expect(screen.getByText('$10.90')).toBeInTheDocument()
    expect(screen.getAllByTestId('product-rating-stars')[0]).toHaveAttribute('src', 'images/ratings/rating-45.png')
  })
  it('adds a product to the cart', async () => {
    render(
      <MemoryRouter>
        <Home cart={[]} fetchCart={loadCartMock} />
      </MemoryRouter>
    );
    const productContainers = await screen.findAllByTestId('product-container');


      const quantitySelector1 = within(productContainers[0])
      .getByTestId('product-quantity-select');
    await user.selectOptions(quantitySelector1, '2');

    const addToCartButton1 = within(productContainers[0])
      .getByTestId('add-to-cart-button');
    await user.click(addToCartButton1);


    const quantitySelector2 = within(productContainers[1])
      .getByTestId('product-quantity-select');
    await user.selectOptions(quantitySelector2, '3');


    const addToCartButton2 = within(productContainers[1])
      .getByTestId('add-to-cart-button');
    await user.click(addToCartButton2);

    expect(axios.post).toHaveBeenNthCalledWith(1, '/api/cart-items', {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2
    });
    expect(axios.post).toHaveBeenNthCalledWith(2, '/api/cart-items', {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 3
    });
    expect(loadCartMock).toHaveBeenCalledTimes(2);
  });
})