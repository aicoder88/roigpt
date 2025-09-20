/**
 * Environment variable validation and type-safe access
 *
 * This module validates environment variables at runtime and provides
 * type-safe access to prevent runtime errors from missing or invalid env vars.
 */

// Define the expected environment schema
interface EnvironmentSchema {
  // Next.js standard variables
  NODE_ENV: 'development' | 'production' | 'test';

  // Public variables (available in browser)
  NEXT_PUBLIC_TEMPO?: string;

  // CI/CD variables
  CI?: string;

  // Testing variables
  BASE_URL?: string;

  // Analytics variables
  NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN?: string;
  NEXT_PUBLIC_ANALYTICS_CONSENT_REQUIRED?: string;
  NEXT_PUBLIC_ENABLE_ANALYTICS_IN_DEV?: string;
}

// Validation helpers
const isValidNodeEnv = (value: string): value is EnvironmentSchema['NODE_ENV'] => {
  return ['development', 'production', 'test'].includes(value);
};

const isValidUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

// Validation rules for each environment variable
const validators = {
  NODE_ENV: (value: string | undefined): EnvironmentSchema['NODE_ENV'] => {
    if (!value) {
      return 'development'; // Default fallback
    }
    if (!isValidNodeEnv(value)) {
      throw new Error(`Invalid NODE_ENV: ${value}. Must be 'development', 'production', or 'test'`);
    }
    return value;
  },

  NEXT_PUBLIC_TEMPO: (value: string | undefined): string | undefined => {
    if (!value) return undefined;

    // Basic validation - should be a non-empty string
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new Error('NEXT_PUBLIC_TEMPO must be a non-empty string');
    }

    return value;
  },

  CI: (value: string | undefined): string | undefined => {
    if (!value) return undefined;

    // CI is typically 'true' or '1' when set
    if (!['true', '1', 'false', '0'].includes(value.toLowerCase())) {
      console.warn(`Unexpected CI value: ${value}. Expected 'true', '1', 'false', or '0'`);
    }

    return value;
  },

  BASE_URL: (value: string | undefined): string | undefined => {
    if (!value) return undefined;

    if (!isValidUrl(value)) {
      throw new Error(`Invalid BASE_URL: ${value}. Must be a valid URL`);
    }

    return value;
  },
} as const;

/**
 * Validates and returns all environment variables
 * Throws an error if any required variables are missing or invalid
 */
export function validateEnvironment(): EnvironmentSchema {
  const errors: string[] = [];

  const validatedEnv: Partial<EnvironmentSchema> = {};

  try {
    validatedEnv.NODE_ENV = validators.NODE_ENV(process.env.NODE_ENV);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : 'NODE_ENV validation failed');
  }

  try {
    validatedEnv.NEXT_PUBLIC_TEMPO = validators.NEXT_PUBLIC_TEMPO(process.env.NEXT_PUBLIC_TEMPO);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : 'NEXT_PUBLIC_TEMPO validation failed');
  }

  try {
    validatedEnv.CI = validators.CI(process.env.CI);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : 'CI validation failed');
  }

  try {
    validatedEnv.BASE_URL = validators.BASE_URL(process.env.BASE_URL);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : 'BASE_URL validation failed');
  }

  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n${errors.join('\n')}`);
  }

  return validatedEnv as EnvironmentSchema;
}

/**
 * Get a validated environment variable value
 * This provides type-safe access to environment variables
 */
export function getEnvVar<K extends keyof EnvironmentSchema>(
  key: K
): EnvironmentSchema[K] {
  const env = validateEnvironment();
  return env[key];
}

/**
 * Check if we're in development mode
 */
export const isDevelopment = (): boolean => {
  return getEnvVar('NODE_ENV') === 'development';
};

/**
 * Check if we're in production mode
 */
export const isProduction = (): boolean => {
  return getEnvVar('NODE_ENV') === 'production';
};

/**
 * Check if we're in test mode
 */
export const isTest = (): boolean => {
  return getEnvVar('NODE_ENV') === 'test';
};

/**
 * Check if we're running in CI
 */
export const isCI = (): boolean => {
  const ci = getEnvVar('CI');
  return ci === 'true' || ci === '1';
};

/**
 * Get the base URL for testing
 */
export const getBaseUrl = (): string => {
  return getEnvVar('BASE_URL') || 'http://localhost:3000';
};

/**
 * Get the Tempo configuration
 */
export const getTempoConfig = (): string | undefined => {
  return getEnvVar('NEXT_PUBLIC_TEMPO');
};

// Validate environment on module load in non-test environments
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'test') {
  try {
    validateEnvironment();
  } catch (error) {
    console.error('Environment validation failed:', error);

    // In production, we might want to fail fast
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}