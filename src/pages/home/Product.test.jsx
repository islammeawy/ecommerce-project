import { expect, it, describe, vi , beforeEach } from 'vitest'
import Product from './Product'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

vi.mock('axios')


describe('Product component', () => {
  let product ;
  let loadCartMock;
  let user;
  beforeEach(() => {
    product = {
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
    
    loadCartMock = vi.fn()
    axios.post.mockResolvedValue({})

    user = userEvent.setup()

  })

  it('renders product details correctly', () => {

    render(<Product product={product} fetchCart={loadCartMock} />)

    expect(screen.getByText(product.name)).toBeInTheDocument()
    expect(screen.getAllByTestId('product-image')[0]).toHaveAttribute('src', product.image)
    expect(screen.getByTestId('product-rating-stars')).toHaveAttribute('src', `images/ratings/rating-${Math.round(product.rating.stars * 10)}.png`)
  })
  it('adds product to cart', async () => {

    render(<Product product={product} fetchCart={loadCartMock} />)
    const user = userEvent.setup()
    const addToCartButton = screen.getByTestId('add-to-cart-button')
    await user.click(addToCartButton)

    expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
      productId: product.id,
      quantity: 1
    })
    expect(loadCartMock).toHaveBeenCalled()
  })
  it ('updates quantity when select value changes', async () => {

    render(<Product product={product} fetchCart={loadCartMock} />)
    const quantitySelect = screen.getByTestId('product-quantity-select')
    await user.selectOptions(quantitySelect, '1')
    expect(quantitySelect.value).toBe('1')

    await user.selectOptions(quantitySelect, '3')
    expect(quantitySelect.value).toBe('3')


    const addToCartButton = screen.getByTestId('add-to-cart-button')
    await user.click(addToCartButton)

    expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
      productId: product.id,
      quantity: 3
    })
    expect(loadCartMock).toHaveBeenCalled()
  })
})
