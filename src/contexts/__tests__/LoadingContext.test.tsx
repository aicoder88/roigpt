import { render, screen, waitFor, act } from '@testing-library/react'
import { LoadingProvider, useLoading } from '../LoadingContext'

function TestComponent() {
  const { isLoading, setLoading, componentLoading, setComponentLoading } = useLoading()

  return (
    <div>
      <span data-testid="is-loading">{isLoading.toString()}</span>
      <span data-testid="component-loading-header">
        {componentLoading.header?.toString() || 'undefined'}
      </span>
      <button onClick={() => setLoading(false)}>Stop Loading</button>
      <button onClick={() => setComponentLoading('header', true)}>
        Set Header Loading
      </button>
    </div>
  )
}

describe('LoadingContext', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should start with loading state as true', () => {
    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    )

    expect(screen.getByTestId('is-loading')).toHaveTextContent('true')
  })

  it('should automatically set loading to false after timeout', async () => {
    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    )

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(1500)
    })

    await waitFor(() => {
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false')
    })
  })

  it('should allow manual control of loading state', () => {
    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    )

    act(() => {
      screen.getByText('Stop Loading').click()
    })

    expect(screen.getByTestId('is-loading')).toHaveTextContent('false')
  })

  it('should manage component-specific loading states', () => {
    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    )

    expect(screen.getByTestId('component-loading-header')).toHaveTextContent('undefined')

    act(() => {
      screen.getByText('Set Header Loading').click()
    })

    expect(screen.getByTestId('component-loading-header')).toHaveTextContent('true')
  })

  it('should throw error when useLoading is used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useLoading must be used within a LoadingProvider')

    consoleSpy.mockRestore()
  })
})