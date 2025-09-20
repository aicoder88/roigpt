'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  FormField,
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckboxGroup,
  FormSubmitButton,
  FormStatus,
  CharacterCounter,
} from './ui/form-field';
import {
  ContactFormData,
  contactFormSchema,
  budgetOptions,
  timelineOptions,
  serviceOptions,
  getFieldError,
  hasFieldError,
  formatFormData,
  sanitizeInput,
} from '@/lib/form-validation';
import { Mail, Phone, MessageSquare, Building, Globe, Calendar, DollarSign, Sparkles } from 'lucide-react';

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  className?: string;
}

export function ContactForm({ onSubmit, className }: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      website: '',
      message: '',
      budget: '',
      timeline: '',
      services: [],
    },
  });

  // Watch message length for character counter
  const messageValue = watch('message', '');

  const handleFormSubmit = async (data: ContactFormData) => {
    setSubmitStatus('submitting');
    setSubmitMessage('');

    try {
      // Sanitize input data
      const sanitizedData = {
        ...data,
        name: sanitizeInput(data.name),
        company: data.company ? sanitizeInput(data.company) : '',
        message: sanitizeInput(data.message),
      };

      const formattedData = formatFormData(sanitizedData) as ContactFormData;

      if (onSubmit) {
        await onSubmit(formattedData);
      } else {
        // Default submission logic (log to console for demo)
        console.log('Contact form submitted:', formattedData);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      }

      setSubmitStatus('success');
      setSubmitMessage('Thank you for your inquiry! We\'ll get back to you within 24 hours.');
      reset();
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : 'Failed to submit form. Please try again or contact us directly.'
      );
    }
  };

  return (
    <Card className={`glass-card shadow-2xl ${className}`}>
      <CardHeader className="text-center">
        <Badge variant="outline" className="mx-auto mb-4 w-fit">
          <Sparkles className="h-4 w-4 mr-2" />
          Get Your Free Consultation
        </Badge>
        <CardTitle className="text-2xl gradient-text">
          Let's Boost Your ROI Together
        </CardTitle>
        <p className="text-muted-foreground">
          Tell us about your project and we'll provide a customized strategy to maximize your marketing ROI.
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Full Name"
              required
              error={getFieldError(errors, 'name')}
            >
              <FormInput
                {...register('name', contactFormSchema.name)}
                placeholder="John Doe"
                error={hasFieldError(errors, 'name')}
                className="pl-10"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </FormField>

            <FormField
              label="Email Address"
              required
              error={getFieldError(errors, 'email')}
            >
              <FormInput
                {...register('email', contactFormSchema.email)}
                type="email"
                placeholder="john@company.com"
                error={hasFieldError(errors, 'email')}
                className="pl-10"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Company Name"
              error={getFieldError(errors, 'company')}
            >
              <FormInput
                {...register('company', contactFormSchema.company)}
                placeholder="Your Company Inc."
                error={hasFieldError(errors, 'company')}
                className="pl-10"
              />
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </FormField>

            <FormField
              label="Phone Number"
              error={getFieldError(errors, 'phone')}
            >
              <FormInput
                {...register('phone', contactFormSchema.phone)}
                type="tel"
                placeholder="+1 (555) 123-4567"
                error={hasFieldError(errors, 'phone')}
                className="pl-10"
              />
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </FormField>
          </div>

          <FormField
            label="Website URL"
            error={getFieldError(errors, 'website')}
            hint="If you have an existing website you'd like us to review"
          >
            <FormInput
              {...register('website', contactFormSchema.website)}
              type="url"
              placeholder="https://yourwebsite.com"
              error={hasFieldError(errors, 'website')}
              className="pl-10"
            />
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </FormField>

          {/* Project Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Project Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Budget Range"
                required
                error={getFieldError(errors, 'budget')}
              >
                <FormSelect
                  {...register('budget', contactFormSchema.budget)}
                  options={budgetOptions}
                  placeholder="Select your budget range"
                  error={hasFieldError(errors, 'budget')}
                  className="pl-10"
                />
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </FormField>

              <FormField
                label="Timeline"
                required
                error={getFieldError(errors, 'timeline')}
              >
                <FormSelect
                  {...register('timeline', contactFormSchema.timeline)}
                  options={timelineOptions}
                  placeholder="Select your timeline"
                  error={hasFieldError(errors, 'timeline')}
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </FormField>
            </div>

            <FormField
              label="Services Needed"
              required
              error={getFieldError(errors, 'services')}
              hint="Select all services you're interested in"
            >
              <Controller
                name="services"
                control={control}
                rules={contactFormSchema.services}
                render={({ field }) => (
                  <FormCheckboxGroup
                    options={serviceOptions}
                    value={field.value || []}
                    onChange={field.onChange}
                    error={hasFieldError(errors, 'services')}
                  />
                )}
              />
            </FormField>

            <FormField
              label="Project Description"
              required
              error={getFieldError(errors, 'message')}
              hint="Tell us about your goals, challenges, and what success looks like for you"
            >
              <div className="relative">
                <FormTextarea
                  {...register('message', contactFormSchema.message)}
                  placeholder="Describe your project, goals, and any specific requirements..."
                  rows={6}
                  error={hasFieldError(errors, 'message')}
                  className="pl-10 resize-none"
                />
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
              <CharacterCounter
                current={messageValue.length}
                max={1000}
              />
            </FormField>
          </div>

          {/* Submit Button */}
          <div className="space-y-4">
            <FormSubmitButton
              loading={submitStatus === 'submitting'}
              success={submitStatus === 'success'}
              disabled={isSubmitting}
              className="w-full py-6 text-lg font-semibold"
            >
              {submitStatus === 'submitting'
                ? 'Sending Your Request...'
                : submitStatus === 'success'
                ? 'Request Sent Successfully!'
                : 'Get My Free Consultation'
              }
            </FormSubmitButton>

            <FormStatus
              status={submitStatus}
              successMessage={submitMessage}
              errorMessage={submitMessage}
            />
          </div>

          {/* Privacy Notice */}
          <div className="text-xs text-muted-foreground text-center border-t pt-4">
            <p>
              By submitting this form, you agree to our privacy policy and consent to being contacted
              about your inquiry. We typically respond within 2-4 hours during business days.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}