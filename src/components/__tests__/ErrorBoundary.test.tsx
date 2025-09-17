import { render, screen, fireEvent } from '@testing-library/react'
import { ErrorBoundary } from '../ErrorBoundary'

// Component that throws an error for testing
function ThrowError({ shouldThrow = false }: { shouldThrow?: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Suppress console.error for these tests
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    ;(console.error as jest.Mock).mockRestore()
  })

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  it('should render error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Try Again')).toBeInTheDocument()
    expect(screen.getByText('Refresh Page')).toBeInTheDocument()
  })

  it('should render custom fallback when provided', () => {
    const fallback = <div>Custom error message</div>

    render(
      <ErrorBoundary fallback={fallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Custom error message')).toBeInTheDocument()
    expect(screen.queryByText('Oops! Something went wrong')).not.toBeInTheDocument()
  })

  it('should show error details in development when showError is true', () => {
    // Mock development environment
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    render(
      <ErrorBoundary showError={true}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Technical Details')).toBeInTheDocument()

    // Restore environment
    process.env.NODE_ENV = originalEnv
  })

  it('should hide error details in production', () => {
    // Mock production environment
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    render(
      <ErrorBoundary showError={true}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.queryByText('Technical Details')).not.toBeInTheDocument()

    // Restore environment
    process.env.NODE_ENV = originalEnv
  })

  it('should reset error state when Try Again is clicked', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Try Again'))

    // Rerender with no error
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  it('should call window.location.reload when Refresh Page is clicked', () => {
    // Mock window.location.reload
    const mockReload = jest.fn()
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true,
    })

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    fireEvent.click(screen.getByText('Refresh Page'))

    expect(mockReload).toHaveBeenCalled()
  })
})

describe('withErrorBoundary HOC', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    ;(console.error as jest.Mock).mockRestore()
  })

  it('should wrap component with ErrorBoundary', () => {
    const { withErrorBoundary } = require('../ErrorBoundary')

    const TestComponent = () => <div>Test Component</div>
    const WrappedComponent = withErrorBoundary(TestComponent)

    render(<WrappedComponent />)

    expect(screen.getByText('Test Component')).toBeInTheDocument()
  })

  it('should catch errors in wrapped component', () => {
    const { withErrorBoundary } = require('../ErrorBoundary')

    const ErrorComponent = () => {
      throw new Error('Wrapped component error')
    }
    const WrappedComponent = withErrorBoundary(ErrorComponent)

    render(<WrappedComponent />)

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()
  })
})