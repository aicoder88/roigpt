/**
 * Form validation schemas and utilities for react-hook-form
 */

// Common validation patterns
export const ValidationPatterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  phone: /^\+?[\d\s\-\(\)]+$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  alphanumeric: /^[a-zA-Z0-9\s]*$/,
  noSpecialChars: /^[a-zA-Z0-9\s\-_]*$/,
} as const;

// Common validation rules
export const ValidationRules = {
  required: (fieldName: string) => `${fieldName} is required`,
  minLength: (length: number) => `Minimum ${length} characters required`,
  maxLength: (length: number) => `Maximum ${length} characters allowed`,
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  url: 'Please enter a valid URL',
  alphanumeric: 'Only letters, numbers, and spaces allowed',
  noSpecialChars: 'Only letters, numbers, spaces, hyphens, and underscores allowed',
} as const;

// Contact form validation schema
export const contactFormSchema = {
  name: {
    required: ValidationRules.required('Name'),
    minLength: {
      value: 2,
      message: ValidationRules.minLength(2),
    },
    maxLength: {
      value: 50,
      message: ValidationRules.maxLength(50),
    },
    pattern: {
      value: ValidationPatterns.noSpecialChars,
      message: ValidationRules.noSpecialChars,
    },
  },
  email: {
    required: ValidationRules.required('Email'),
    pattern: {
      value: ValidationPatterns.email,
      message: ValidationRules.email,
    },
  },
  company: {
    maxLength: {
      value: 100,
      message: ValidationRules.maxLength(100),
    },
    pattern: {
      value: ValidationPatterns.noSpecialChars,
      message: ValidationRules.noSpecialChars,
    },
  },
  phone: {
    pattern: {
      value: ValidationPatterns.phone,
      message: ValidationRules.phone,
    },
  },
  website: {
    pattern: {
      value: ValidationPatterns.url,
      message: ValidationRules.url,
    },
  },
  message: {
    required: ValidationRules.required('Message'),
    minLength: {
      value: 10,
      message: ValidationRules.minLength(10),
    },
    maxLength: {
      value: 1000,
      message: ValidationRules.maxLength(1000),
    },
  },
  budget: {
    required: ValidationRules.required('Budget range'),
  },
  timeline: {
    required: ValidationRules.required('Timeline'),
  },
  services: {
    required: ValidationRules.required('Please select at least one service'),
    validate: (value: string[]) => {
      return value.length > 0 || 'Please select at least one service';
    },
  },
} as const;

// Newsletter signup schema
export const newsletterSchema = {
  email: {
    required: ValidationRules.required('Email'),
    pattern: {
      value: ValidationPatterns.email,
      message: ValidationRules.email,
    },
  },
  consent: {
    required: 'Please accept our privacy policy',
  },
} as const;

// Quote request schema
export const quoteRequestSchema = {
  projectType: {
    required: ValidationRules.required('Project type'),
  },
  description: {
    required: ValidationRules.required('Project description'),
    minLength: {
      value: 20,
      message: ValidationRules.minLength(20),
    },
    maxLength: {
      value: 500,
      message: ValidationRules.maxLength(500),
    },
  },
  budget: {
    required: ValidationRules.required('Budget range'),
  },
  timeline: {
    required: ValidationRules.required('Timeline'),
  },
} as const;

// Form data types
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  website?: string;
  message: string;
  budget: string;
  timeline: string;
  services: string[];
}

export interface NewsletterFormData {
  email: string;
  consent: boolean;
}

export interface QuoteRequestData {
  projectType: string;
  description: string;
  budget: string;
  timeline: string;
}

// Form options
export const budgetOptions = [
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-15k', label: '$5,000 - $15,000' },
  { value: '15k-50k', label: '$15,000 - $50,000' },
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: 'over-100k', label: 'Over $100,000' },
  { value: 'flexible', label: 'Flexible / Discuss' },
] as const;

export const timelineOptions = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-month', label: 'Within 1 month' },
  { value: '2-3months', label: '2-3 months' },
  { value: '3-6months', label: '3-6 months' },
  { value: '6months+', label: '6+ months' },
  { value: 'flexible', label: 'Flexible' },
] as const;

export const serviceOptions = [
  { value: 'nextjs-development', label: 'Next.js Website Development' },
  { value: 'seo-optimization', label: 'SEO Optimization' },
  { value: 'ai-copywriting', label: 'AI-Powered Copywriting' },
  { value: 'conversion-optimization', label: 'Conversion Rate Optimization' },
  { value: 'analytics-setup', label: 'Analytics & Tracking Setup' },
  { value: 'performance-optimization', label: 'Performance Optimization' },
  { value: 'consultation', label: 'Strategy Consultation' },
] as const;

export const projectTypeOptions = [
  { value: 'website-redesign', label: 'Website Redesign' },
  { value: 'new-website', label: 'New Website Development' },
  { value: 'landing-page', label: 'Landing Page' },
  { value: 'ecommerce', label: 'E-commerce Platform' },
  { value: 'web-app', label: 'Web Application' },
  { value: 'optimization', label: 'Performance/SEO Optimization' },
  { value: 'other', label: 'Other' },
] as const;

// Utility functions
export const getFieldError = (
  errors: any,
  fieldName: string
): string | undefined => {
  return errors[fieldName]?.message;
};

export const hasFieldError = (errors: any, fieldName: string): boolean => {
  return !!errors[fieldName];
};

export const formatFormData = (data: any): Record<string, any> => {
  // Remove empty strings and format data for submission
  const formatted: Record<string, any> = {};

  Object.entries(data).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      if (Array.isArray(value) && value.length === 0) {
        return; // Skip empty arrays
      }
      formatted[key] = value;
    }
  });

  return formatted;
};

export const sanitizeInput = (input: string): string => {
  // Basic XSS prevention
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim();
};