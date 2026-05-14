export const projectTypeOptions = [
  'Brand refresh',
  'Website design',
  'Website build',
  'E-commerce',
  'Ongoing support',
  'Something else',
] as const;

export const budgetOptions = [
  'Under £2k',
  '£2k to £5k',
  '£5k to £10k',
  '£10k+',
  'Not sure yet',
] as const;

export interface ContactFormValues {
  name: string
  email: string
  company: string
  projectType: string
  budget: string
  message: string
  website: string
}

export type ContactFieldName = keyof ContactFormValues;

export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

export interface ValidatedContactPayload {
  values: ContactFormValues
  errors: ContactFieldErrors
  isValid: boolean
}

export const contactFieldMaxLengths: Record<ContactFieldName, number> = {
  name: 80,
  email: 160,
  company: 120,
  projectType: 40,
  budget: 40,
  message: 4000,
  website: 200,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getEmptyContactForm(): ContactFormValues {
  return {
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
    website: '',
  };
}

export function validateContactPayload(payload: Partial<ContactFormValues>): ValidatedContactPayload {
  const values: ContactFormValues = {
    name: normalizeField(payload.name, contactFieldMaxLengths.name),
    email: normalizeField(payload.email, contactFieldMaxLengths.email).toLowerCase(),
    company: normalizeField(payload.company, contactFieldMaxLengths.company),
    projectType: normalizeField(payload.projectType, contactFieldMaxLengths.projectType),
    budget: normalizeField(payload.budget, contactFieldMaxLengths.budget),
    message: normalizeTextarea(payload.message, contactFieldMaxLengths.message),
    website: normalizeField(payload.website, contactFieldMaxLengths.website),
  };

  const errors: ContactFieldErrors = {};

  if (!values.name) {
    errors.name = 'Please tell us your name.';
  }

  if (!values.email) {
    errors.email = 'Please enter your email address.';
  } else if (!emailPattern.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.message) {
    errors.message = 'Please share a few details about your project.';
  } else if (values.message.length < 20) {
    errors.message = 'Please add a little more detail so we can respond properly.';
  }

  if (values.projectType && !projectTypeOptions.includes(values.projectType as typeof projectTypeOptions[number])) {
    errors.projectType = 'Please choose a valid project type.';
  }

  if (values.budget && !budgetOptions.includes(values.budget as typeof budgetOptions[number])) {
    errors.budget = 'Please choose a valid budget range.';
  }

  if (values.website) {
    errors.website = 'Spam detected.';
  }

  return {
    values,
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

function normalizeField(value: unknown, maxLength: number) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, maxLength);
}

function normalizeTextarea(value: unknown, maxLength: number) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.replace(/\r\n/g, '\n').trim().slice(0, maxLength);
}
