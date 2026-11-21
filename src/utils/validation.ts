import { CONTACT_TOPICS, type ContactTopic } from '../data/portfolioData';

export interface ContactFormValues {
  name: string;
  email: string;
  topic: ContactTopic;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
}

export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
  suggestion?: string;
}

const COMMON_DOMAIN_TYPOS: Record<string, string> = {
  'gmial.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'outlok.com': 'outlook.com',
  'hotmial.com': 'hotmail.com',
  'yaho.com': 'yahoo.com',
  'protonmial.com': 'protonmail.com',
};

export function validateEmail(rawEmail: string): EmailValidationResult {
  const email = rawEmail.trim();

  if (!email) {
    return { isValid: false, error: 'Email address is required.' };
  }

  if (/\s/.test(email)) {
    return { isValid: false, error: 'Email address cannot contain spaces.' };
  }

  const parts = email.split('@');
  if (parts.length !== 2) {
    return { isValid: false, error: 'Enter a valid email address with one "@" symbol.' };
  }

  const [localPart, domainPart] = parts;

  if (!localPart || localPart.length > 64) {
    return { isValid: false, error: 'The part before "@" looks incomplete or too long.' };
  }

  if (localPart.startsWith('.') || localPart.endsWith('.') || localPart.includes('..')) {
    return { isValid: false, error: 'Email username cannot start, end, or repeat dots.' };
  }

  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(localPart)) {
    return { isValid: false, error: 'Email contains unsupported characters before "@".' };
  }

  if (!domainPart || domainPart.length > 253) {
    return { isValid: false, error: 'Enter a valid domain after "@".' };
  }

  if (domainPart.startsWith('.') || domainPart.endsWith('.') || domainPart.includes('..')) {
    return { isValid: false, error: 'Email domain cannot start, end, or repeat dots.' };
  }

  const domainLabels = domainPart.split('.');
  if (domainLabels.length < 2) {
    return { isValid: false, error: 'Include a domain extension such as ".com" or ".in".' };
  }

  const tld = domainLabels[domainLabels.length - 1];
  if (!/^[a-zA-Z]{2,24}$/.test(tld)) {
    return { isValid: false, error: 'Domain extension must be at least 2 letters.' };
  }

  for (const label of domainLabels) {
    if (!label || label.length > 63 || !/^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(label)) {
      return { isValid: false, error: 'Email domain format is invalid.' };
    }
  }

  const normalizedDomain = domainPart.toLowerCase();
  const suggestedDomain = COMMON_DOMAIN_TYPOS[normalizedDomain];
  if (suggestedDomain) {
    return {
      isValid: true,
      suggestion: `${localPart}@${suggestedDomain}`,
    };
  }

  return { isValid: true };
}

export function validateContactForm(values: ContactFormValues): {
  isValid: boolean;
  errors: ContactFormErrors;
  emailSuggestion?: string;
} {
  const errors: ContactFormErrors = {};

  const trimmedName = values.name.trim();
  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (trimmedName.length > 80) {
    errors.name = 'Name must be 80 characters or fewer.';
  }

  const emailCheck = validateEmail(values.email);
  if (!emailCheck.isValid) {
    errors.email = emailCheck.error;
  }

  if (!CONTACT_TOPICS.includes(values.topic)) {
    errors.topic = 'Select a valid inquiry topic.';
  }

  const trimmedMessage = values.message.trim();
  if (!trimmedMessage) {
    errors.message = 'Please include a short message about your project or question.';
  } else if (trimmedMessage.length < 15) {
    errors.message = `Message is too short (${trimmedMessage.length}/15 minimum characters).`;
  } else if (trimmedMessage.length > 1500) {
    errors.message = 'Message must be 1,500 characters or fewer.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    emailSuggestion: emailCheck.suggestion,
  };
}
