import { render, screen } from '@testing-library/react'
import { LoadingSkeleton, CardSkeleton, MetricSkeleton } from '../loading-skeleton'

describe('LoadingSkeleton', () => {
  it('should render with default props', () => {
    render(<LoadingSkeleton />)

    // Should render 3 skeleton lines by default
    const skeletons = screen.getAllByRole('generic')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('should render specified number of lines', () => {
    render(<LoadingSkeleton lines={5} />)

    // Count skeleton line elements
    const container = screen.getByRole('generic').closest('div')
    const skeletonLines = container?.querySelectorAll('[class*="animate-pulse"]')
    expect(skeletonLines?.length).toBeGreaterThanOrEqual(5)
  })

  it('should show avatar when showAvatar is true', () => {
    render(<LoadingSkeleton showAvatar={true} />)

    // Should have elements with rounded-full class (avatar)
    const container = screen.getByRole('generic').closest('div')
    const avatar = container?.querySelector('[class*="rounded-full"]')
    expect(avatar).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const customClass = 'custom-test-class'
    const { container } = render(<LoadingSkeleton className={customClass} />)

    expect(container.firstChild).toHaveClass(customClass)
  })
})

describe('CardSkeleton', () => {
  it('should render card skeleton structure', () => {
    render(<CardSkeleton />)

    // Should have glass-card class
    const container = screen.getByRole('generic').closest('div')
    expect(container).toHaveClass('glass-card')
  })

  it('should apply custom className', () => {
    const customClass = 'custom-card-class'
    const { container } = render(<CardSkeleton className={customClass} />)

    expect(container.firstChild).toHaveClass(customClass)
  })
})

describe('MetricSkeleton', () => {
  it('should render metric skeleton structure', () => {
    render(<MetricSkeleton />)

    // Should have glass-card class
    const container = screen.getByRole('generic').closest('div')
    expect(container).toHaveClass('glass-card')
  })

  it('should apply custom className', () => {
    const customClass = 'custom-metric-class'
    const { container } = render(<MetricSkeleton className={customClass} />)

    expect(container.firstChild).toHaveClass(customClass)
  })
})