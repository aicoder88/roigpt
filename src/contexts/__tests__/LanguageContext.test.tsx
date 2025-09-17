import { render, screen, fireEvent, act } from '@testing-library/react'
import { LanguageProvider, useLanguage } from '../LanguageContext'

// Test component to use the hook
function TestComponent() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div>
      <span data-testid="current-language">{language}</span>
      <span data-testid="translated-text">{t('hero.title')}</span>
      <button onClick={() => setLanguage('fr')}>Switch to French</button>
      <button onClick={() => setLanguage('en')}>Switch to English</button>
    </div>
  )
}

describe('LanguageContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('should provide default language as English', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    expect(screen.getByTestId('current-language')).toHaveTextContent('en')
  })

  it('should translate text correctly', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    expect(screen.getByTestId('translated-text')).toHaveTextContent(
      'AI-Powered Marketing That Delivers Real ROI'
    )
  })

  it('should switch language when setLanguage is called', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    act(() => {
      fireEvent.click(screen.getByText('Switch to French'))
    })

    expect(screen.getByTestId('current-language')).toHaveTextContent('fr')
    expect(screen.getByTestId('translated-text')).toHaveTextContent(
      'Marketing IA qui Génère un ROI Réel'
    )
  })

  it('should persist language choice in localStorage', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    act(() => {
      fireEvent.click(screen.getByText('Switch to French'))
    })

    expect(localStorage.setItem).toHaveBeenCalledWith('language', 'fr')
  })

  it('should load saved language from localStorage', () => {
    // Mock localStorage to return French
    ;(localStorage.getItem as jest.Mock).mockReturnValue('fr')

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    expect(screen.getByTestId('current-language')).toHaveTextContent('fr')
  })

  it('should return the key if translation is not found', () => {
    function TestComponentWithMissingKey() {
      const { t } = useLanguage()
      return <span data-testid="missing-key">{t('nonexistent.key')}</span>
    }

    render(
      <LanguageProvider>
        <TestComponentWithMissingKey />
      </LanguageProvider>
    )

    expect(screen.getByTestId('missing-key')).toHaveTextContent('nonexistent.key')
  })

  it('should throw error when useLanguage is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useLanguage must be used within a LanguageProvider')

    consoleSpy.mockRestore()
  })
})