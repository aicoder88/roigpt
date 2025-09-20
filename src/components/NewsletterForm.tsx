'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { FormInput, FormStatus } from './ui/form-field';
import {
  NewsletterFormData,
  newsletterSchema,
  getFieldError,
  hasFieldError,
  sanitizeInput,
} from '@/lib/form-validation';
import { Mail, ArrowRight, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsletterFormProps {
  onSubmit?: (data: NewsletterFormData) => Promise<void>;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'inline' | 'card';
}

export function NewsletterForm({
  onSubmit,
  className,
  size = 'md',
  variant = 'inline',
}: NewsletterFormProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    defaultValues: {
      email: '',
      consent: false,
    },
  });

  const handleFormSubmit = async (data: NewsletterFormData) => {
    setSubmitStatus('submitting');
    setSubmitMessage('');

    try {
      const sanitizedData = {
        ...data,
        email: sanitizeInput(data.email),
      };

      if (onSubmit) {
        await onSubmit(sanitizedData);
      } else {
        // Default submission logic
        console.log('Newsletter signup:', sanitizedData);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setSubmitStatus('success');
      setSubmitMessage('Welcome aboard! Check your email for confirmation.');
      reset();
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(
        error instanceof Error ? error.message : 'Signup failed. Please try again.'
      );
    }
  };

  const sizeClasses = {
    sm: 'text-sm gap-2',
    md: 'text-base gap-3',
    lg: 'text-lg gap-4',
  };

  const inputSizeClasses = {
    sm: 'h-8 text-sm',
    md: 'h-10',
    lg: 'h-12 text-lg',
  };

  const buttonSizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg',
  };

  if (variant === 'card') {
    return (
      <div className={cn('glass-card p-6 rounded-2xl', className)}>
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
          <p className="text-muted-foreground text-sm">
            Get marketing insights, ROI tips, and exclusive strategies delivered to your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="relative">
            <FormInput
              {...register('email', newsletterSchema.email)}
              type="email"
              placeholder="Enter your email address"
              error={hasFieldError(errors, 'email')}
              className={cn('pl-10', inputSizeClasses[size])}
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          {getFieldError(errors, 'email') && (
            <p className="text-sm text-destructive">{getFieldError(errors, 'email')}</p>
          )}

          <div className="flex items-start gap-2">
            <input
              {...register('consent', newsletterSchema.consent)}
              type="checkbox"
              id="newsletter-consent"
              className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-primary"
            />
            <label htmlFor="newsletter-consent" className="text-xs text-muted-foreground leading-relaxed">
              I agree to receive marketing emails and understand I can unsubscribe at any time.
              <Shield className="inline h-3 w-3 ml-1" />
            </label>
          </div>

          {getFieldError(errors, 'consent') && (
            <p className="text-sm text-destructive">{getFieldError(errors, 'consent')}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || submitStatus === 'submitting'}
            className={cn('w-full group', buttonSizeClasses[size])}
          >
            {submitStatus === 'submitting' ? (
              'Subscribing...'
            ) : submitStatus === 'success' ? (
              'Subscribed!'
            ) : (
              <>
                Subscribe Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>

          <FormStatus
            status={submitStatus}
            successMessage={submitMessage}
            errorMessage={submitMessage}
          />
        </form>
      </div>
    );
  }

  // Inline variant
  return (
    <div className={cn('w-full', className)}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={cn('flex flex-col sm:flex-row', sizeClasses[size])}>
        <div className="flex-1 relative">
          <FormInput
            {...register('email', newsletterSchema.email)}
            type="email"
            placeholder="Enter your email for ROI insights"
            error={hasFieldError(errors, 'email')}
            className={cn('pl-10 sm:rounded-r-none', inputSizeClasses[size])}
          />
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || submitStatus === 'submitting'}
          className={cn('sm:rounded-l-none group whitespace-nowrap', buttonSizeClasses[size])}
        >
          {submitStatus === 'submitting' ? (
            'Subscribing...'
          ) : submitStatus === 'success' ? (
            'Subscribed!'
          ) : (
            <>
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>

      {(getFieldError(errors, 'email') || getFieldError(errors, 'consent')) && (
        <div className="mt-2 space-y-1">
          {getFieldError(errors, 'email') && (
            <p className="text-sm text-destructive">{getFieldError(errors, 'email')}</p>
          )}
          {getFieldError(errors, 'consent') && (
            <p className="text-sm text-destructive">{getFieldError(errors, 'consent')}</p>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 mt-2">
        <input
          {...register('consent', newsletterSchema.consent)}
          type="checkbox"
          id="inline-newsletter-consent"
          className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-primary"
        />
        <label htmlFor="inline-newsletter-consent" className="text-xs text-muted-foreground">
          I agree to receive marketing emails
          <Shield className="inline h-3 w-3 ml-1" />
        </label>
      </div>

      <FormStatus
        status={submitStatus}
        successMessage={submitMessage}
        errorMessage={submitMessage}
      />
    </div>
  );
}