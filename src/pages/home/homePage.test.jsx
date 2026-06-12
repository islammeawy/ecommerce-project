import {  it, describe, vi , beforeEach , expect } from 'vitest'
import { Product } from './Product'
import { render , screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { Home } from './home'
import axios from 'axios'


vi.mock('axios')

describe('displaying products', () => {
  let loadCartMock;
  beforeEach(() => {
    loadCartMock = vi.fn()
    
    axios.get.mockImplementation (async (url) => {
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
            }
          ]
        }
      }
    })
  })
  it('renders product details correctly',  () => {

    render(
      <MemoryRouter>
        <Home cart = {[]} loadCart={loadCartMock} />
      </MemoryRouter>
    )
    screen.findAllByTestId('product-container').then((productContainers) => {
      expect(productContainers).toHaveLength(1)
      expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument()
      expect(screen.getByText('$10.90')).toBeInTheDocument()
      expect(screen.getAllByTestId('product-image')[0]).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg')
      expect(screen.getByText('socks, sports, apparel')).toBeInTheDocument()
      expect(screen.getByTestId('product-rating-stars')).toHaveAttribute('src', 'images/ratings/rating-45.png')
      expect(screen.getByText(87)).toBeInTheDocument()
    })
})
})