import {expect, it , describe} from 'vitest'
import {formatMoney} from './money'

describe('formatMoney', () => {
  it('should format the amount in cents to dollars', () => {
    expect(formatMoney(1234)).toBe('$12.34')
    expect(formatMoney(0)).toBe('$0.00')
    expect(formatMoney(999)).toBe('$9.99')
    expect(formatMoney(100)).toBe('$1.00')
  })
  it ('displays two decimal places', () => {
    expect(formatMoney(123)).toBe('$1.23')
    expect(formatMoney(1)).toBe('$0.01')
  })
  it('should handle negative amounts', () => {
    expect(formatMoney(-1234)).toBe('-$12.34')
    expect(formatMoney(-999)).toBe('-$9.99')
    expect(formatMoney(-100)).toBe('-$1.00')
  })
  it('should handle large amounts', () => {
    expect(formatMoney(123456789)).toBe('$1,234,567.88')
  })
  it('should handle non-integer amounts', () => {
    expect(formatMoney(1234.56)).toBe('$12.34')
  })
});