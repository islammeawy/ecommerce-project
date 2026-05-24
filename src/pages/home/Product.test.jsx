import { expect, it, describe, vi } from 'vitest'
import { Product } from './Product'
import { render, screen } from '@testing-library/react'
import { formatMoney } from '../../utils/money'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

vi.mock('axios')


describe('Product component', () => {
  it('renders product details correctly', () => {
    const product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"]
    }
    const loadCartMock = vi.fn();
    render(<Product product={product} loadCart={loadCartMock} />)

    expect(screen.getByText(product.name)).toBeInTheDocument()
    expect(screen.getByText(formatMoney(product.priceCents))).toBeInTheDocument()
    expect(screen.getAllByTestId('product-image')[0]).toHaveAttribute('src', product.image)
    expect(screen.getByText(product.keywords.join(', '))).toBeInTheDocument()
    expect(screen.getByTestId('product-rating-stars')).toHaveAttribute('src', `images/ratings/rating-${Math.round(product.rating.stars * 10)}.png`)
    expect(screen.getByText(product.rating.count)).toBeInTheDocument()
  })
  it('adds product to cart', async () => {
    const product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"]
    }
    const loadCartMock = vi.fn();
    render(<Product product={product} loadCart={loadCartMock} />)
    const user = userEvent.setup()
    const addToCartButton = screen.getByTestId('add-to-cart-button')
    await user.click(addToCartButton)

    expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
      productId: product.id,
      quantity: 1
    })
    expect(loadCartMock).toHaveBeenCalled()
  })
  })