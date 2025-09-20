'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Label } from './label';
import { Input } from './input';
import { Textarea } from './textarea';
import { Button } from './button';
import { Badge } from './badge';
import { AlertCircle, Check, Loader2 } from 'lucide-react';

// Base form field wrapper
interface FormFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  error,
  required,
  hint,
  className,
  children,
}: FormFieldProps) {
  const hasError = !!error;

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label className={cn('text-sm font-medium', hasError && 'text-destructive')}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <div className="relative">
        {children}
        {hasError && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <AlertCircle className="h-4 w-4 text-destructive" />
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-destructive flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}

      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

// Enhanced Input with validation styling
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  success?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, error, success, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={cn(
          error && 'border-destructive focus-visible:ring-destructive',
          success && 'border-green-500 focus-visible:ring-green-500',
          className
        )}
        {...props}
      />
    );
  }
);
FormInput.displayName = 'FormInput';

// Enhanced Textarea with validation styling
interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  success?: boolean;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, error, success, ...props }, ref) => {
    return (
      <Textarea
        ref={ref}
        className={cn(
          error && 'border-destructive focus-visible:ring-destructive',
          success && 'border-green-500 focus-visible:ring-green-500',
          className
        )}
        {...props}
      />
    );
  }
);
FormTextarea.displayName = 'FormTextarea';

// Select dropdown component
interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: readonly SelectOption[];
  placeholder?: string;
  error?: boolean;
  success?: boolean;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, options, placeholder, error, success, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-destructive focus-visible:ring-destructive',
          success && 'border-green-500 focus-visible:ring-green-500',
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);
FormSelect.displayName = 'FormSelect';

// Checkbox group component
interface CheckboxOption {
  value: string;
  label: string;
  description?: string;
}

interface FormCheckboxGroupProps {
  options: readonly CheckboxOption[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: boolean;
  className?: string;
}

export function FormCheckboxGroup({
  options,
  value,
  onChange,
  error,
  className,
}: FormCheckboxGroupProps) {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      {options.map((option) => (
        <div key={option.value} className="flex items-start space-x-3">
          <input
            type="checkbox"
            id={option.value}
            checked={value.includes(option.value)}
            onChange={(e) => handleChange(option.value, e.target.checked)}
            className={cn(
              'mt-1 h-4 w-4 rounded border-input text-primary',
              'focus:ring-2 focus:ring-primary focus:ring-offset-2',
              error && 'border-destructive text-destructive focus:ring-destructive'
            )}
          />
          <div className="flex-1">
            <label
              htmlFor={option.value}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.label}
            </label>
            {option.description && (
              <p className="text-xs text-muted-foreground mt-1">
                {option.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Radio group component
interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface FormRadioGroupProps {
  name: string;
  options: readonly RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  className?: string;
}

export function FormRadioGroup({
  name,
  options,
  value,
  onChange,
  error,
  className,
}: FormRadioGroupProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {options.map((option) => (
        <div key={option.value} className="flex items-start space-x-3">
          <input
            type="radio"
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              'mt-1 h-4 w-4 border-input text-primary',
              'focus:ring-2 focus:ring-primary focus:ring-offset-2',
              error && 'border-destructive text-destructive focus:ring-destructive'
            )}
          />
          <div className="flex-1">
            <label
              htmlFor={`${name}-${option.value}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.label}
            </label>
            {option.description && (
              <p className="text-xs text-muted-foreground mt-1">
                {option.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Submit button with loading states
interface FormSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  success?: boolean;
  children: React.ReactNode;
}

export function FormSubmitButton({
  loading,
  success,
  children,
  disabled,
  className,
  ...props
}: FormSubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={disabled || loading}
      className={cn(
        'relative',
        success && 'bg-green-600 hover:bg-green-700',
        className
      )}
      {...props}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {success && !loading && (
        <Check className="mr-2 h-4 w-4" />
      )}
      {children}
    </Button>
  );
}

// Form status messages
interface FormStatusProps {
  status: 'idle' | 'submitting' | 'success' | 'error';
  successMessage?: string;
  errorMessage?: string;
}

export function FormStatus({ status, successMessage, errorMessage }: FormStatusProps) {
  if (status === 'idle' || status === 'submitting') {
    return null;
  }

  if (status === 'success') {
    return (
      <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4">
        <div className="flex">
          <Check className="h-5 w-5 text-green-400" />
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800 dark:text-green-200">
              {successMessage || 'Form submitted successfully!'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="rounded-md bg-destructive/10 p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <div className="ml-3">
            <p className="text-sm font-medium text-destructive">
              {errorMessage || 'Something went wrong. Please try again.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Character counter for text inputs
interface CharacterCounterProps {
  current: number;
  max: number;
  className?: string;
}

export function CharacterCounter({ current, max, className }: CharacterCounterProps) {
  const isNearLimit = current >= max * 0.8;
  const isOverLimit = current > max;

  return (
    <p
      className={cn(
        'text-xs text-right',
        isOverLimit && 'text-destructive',
        isNearLimit && !isOverLimit && 'text-yellow-600',
        !isNearLimit && 'text-muted-foreground',
        className
      )}
    >
      {current}/{max}
    </p>
  );
}