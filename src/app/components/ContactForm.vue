<template>
  <div class="form-shell">
    <div class="form-topper">
      <div class="form-topper-heading">
        <p class="u-font-title u-text-[20px] tablet:u-text-[26px]">
          Start your project
        </p>
      </div>
      <p class="form-topper-lead u-text-14 tablet:u-text-16">
        Tell us what you are building and we will get back to you with the next best step.
      </p>
    </div>

    <div
      v-if="submitted"
      class="success-card"
      role="status"
      aria-live="polite"
    >
      <p class="success-kicker">
        Message sent
      </p>
      <h3 class="u-font-title u-text-[30px] tablet:u-text-[45px]">
        Thanks, {{ submittedName }}.
      </h3>
      <p class="u-text-16 tablet:u-text-20">
        Your message is on its way. We will reply to <strong>{{ submittedEmail }}</strong> as soon as we can.
      </p>
      <button type="button" class="submit-button success-button" @click="resetForm">
        Send another message
      </button>
    </div>

    <form
      v-else
      class="contact-form"
      novalidate
      @submit.prevent="submitForm"
    >
      <div class="field-grid">
        <label class="field">
          <span class="field-label">Name <span class="required-mark">*</span></span>
          <input
            v-model="form.name"
            class="field-input"
            type="text"
            name="name"
            autocomplete="name"
            maxlength="80"
            :aria-invalid="Boolean(fieldErrors.name)"
            :aria-describedby="fieldErrors.name ? 'contact-name-error' : undefined"
            @blur="validateField('name')"
          >
          <span v-if="fieldErrors.name" id="contact-name-error" class="field-error">{{ fieldErrors.name }}</span>
        </label>

        <label class="field">
          <span class="field-label">Email <span class="required-mark">*</span></span>
          <input
            v-model="form.email"
            class="field-input"
            type="email"
            name="email"
            autocomplete="email"
            maxlength="160"
            :aria-invalid="Boolean(fieldErrors.email)"
            :aria-describedby="fieldErrors.email ? 'contact-email-error' : undefined"
            @blur="validateField('email')"
          >
          <span v-if="fieldErrors.email" id="contact-email-error" class="field-error">{{ fieldErrors.email }}</span>
        </label>

        <label class="field">
          <span class="field-label">Company or brand</span>
          <input
            v-model="form.company"
            class="field-input"
            type="text"
            name="company"
            autocomplete="organization"
            maxlength="120"
          >
        </label>

        <label class="field">
          <span class="field-label">Project type</span>
          <select
            v-model="form.projectType"
            class="field-input field-select"
            name="projectType"
            :aria-invalid="Boolean(fieldErrors.projectType)"
            :aria-describedby="fieldErrors.projectType ? 'contact-project-type-error' : undefined"
            @blur="validateField('projectType')"
          >
            <option value="">
              Choose one
            </option>
            <option v-for="option in projectTypeOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
          <span v-if="fieldErrors.projectType" id="contact-project-type-error" class="field-error">{{ fieldErrors.projectType }}</span>
        </label>

        <label class="field">
          <span class="field-label">Budget</span>
          <select
            v-model="form.budget"
            class="field-input field-select"
            name="budget"
            :aria-invalid="Boolean(fieldErrors.budget)"
            :aria-describedby="fieldErrors.budget ? 'contact-budget-error' : undefined"
            @blur="validateField('budget')"
          >
            <option value="">
              Select a range
            </option>
            <option v-for="option in budgetOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
          <span v-if="fieldErrors.budget" id="contact-budget-error" class="field-error">{{ fieldErrors.budget }}</span>
        </label>
      </div>

      <label class="field">
        <span class="field-label">Project details <span class="required-mark">*</span></span>
        <textarea
          v-model="form.message"
          class="field-input field-textarea"
          name="message"
          rows="7"
          maxlength="4000"
          :aria-invalid="Boolean(fieldErrors.message)"
          :aria-describedby="fieldErrors.message ? 'contact-message-error' : 'contact-message-help'"
          @blur="validateField('message')"
        />
        <span id="contact-message-help" class="field-help">A quick brief is plenty: goals, timing, and what is not working right now.</span>
        <span v-if="fieldErrors.message" id="contact-message-error" class="field-error">{{ fieldErrors.message }}</span>
      </label>

      <label class="trap-field" aria-hidden="true">
        <span>Leave this field empty</span>
        <input
          v-model="form.website"
          type="text"
          name="website"
          tabindex="-1"
          autocomplete="off"
        >
      </label>

      <div class="form-footer">
        <p class="u-text-14 tablet:u-text-16">
          We only use your details to respond to your enquiry.
        </p>
        <button class="submit-button" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Sending...' : 'Send message' }}
        </button>
      </div>

      <p v-if="submitError" class="submit-error" role="alert">
        {{ submitError }}
      </p>
    </form>
  </div>
</template>

<script lang="ts" setup="">
import { reactive, ref } from 'vue';
import { budgetOptions, getEmptyContactForm, projectTypeOptions, validateContactPayload } from '~/helpers/contact';
import type { ContactFieldErrors, ContactFieldName } from '~/helpers/contact';

const { executeContactAction } = useRecaptchaV3();

const form = reactive(getEmptyContactForm());
const fieldErrors = reactive<ContactFieldErrors>({});
const isSubmitting = ref(false);
const submitError = ref('');
const submitted = ref(false);
const submittedName = ref('');
const submittedEmail = ref('');

function validateField(fieldName: ContactFieldName) {
  const { errors } = validateContactPayload(form);
  const nextError = errors[fieldName];

  if (nextError) {
    fieldErrors[fieldName] = nextError;
    return false;
  }

  delete fieldErrors[fieldName];
  return true;
}

function applyErrors(errors: ContactFieldErrors) {
  clearErrors();

  for (const [fieldName, message] of Object.entries(errors)) {
    if (!message) {
      continue;
    }

    fieldErrors[fieldName as ContactFieldName] = message;
  }
}

function clearErrors() {
  for (const key of Object.keys(fieldErrors)) {
    delete fieldErrors[key as ContactFieldName];
  }
}

async function submitForm() {
  submitError.value = '';

  const validation = validateContactPayload(form);
  applyErrors(validation.errors);

  if (!validation.isValid) {
    submitError.value = 'Please fix the highlighted fields and try again.';
    return;
  }

  isSubmitting.value = true;

  try {
    const recaptchaToken = await executeContactAction();

    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...validation.values, recaptchaToken },
    });

    submittedName.value = validation.values.name;
    submittedEmail.value = validation.values.email;
    submitted.value = true;

    const freshForm = getEmptyContactForm();

    for (const key of Object.keys(freshForm) as ContactFieldName[]) {
      form[key] = freshForm[key];
    }

    clearErrors();
  } catch (error: unknown) {
    const fetchError = error as {
      data?: {
        fieldErrors?: ContactFieldErrors
        message?: string
      }
      statusMessage?: string
    };

    if (fetchError.data?.fieldErrors) {
      applyErrors(fetchError.data.fieldErrors);
    }

    submitError.value = fetchError.data?.message || fetchError.statusMessage || 'Something went wrong while sending your message. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
}

function resetForm() {
  submitted.value = false;
  submittedName.value = '';
  submittedEmail.value = '';
  submitError.value = '';
}
</script>

<style scoped>
.form-shell {
  background: theme('colors.white');
  border: 2px solid theme('colors.purple');
  border-radius: 36px;
  box-shadow: 18px 18px 0 theme('colors.pink');
  overflow: hidden;
}

.form-topper {
  background: theme('colors.white');
  border-bottom: 2px solid theme('colors.purple');
  display: grid;
  gap: 1rem;

  @screen tablet {
    align-items: stretch;
    gap: 0;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
  }
}

.form-topper-heading {
  background: theme('colors.orange');
  padding: 1.4rem 1.3rem 1rem;

  /** Curved separation from white: bulge along the trailing edge where two columns meet */
  border-bottom-right-radius: 0;

  @screen tablet {
    align-self: stretch;
    display: grid;
    align-items: center;
    border-top-right-radius: 2.5rem;
    border-bottom-right-radius: 3rem;
    padding: 1.45rem clamp(1.25rem, 3vw, 2rem);
  }
}

.form-topper-lead {
  margin: 0;
  padding: 0 1.3rem 1.4rem;

  @screen tablet {
    align-self: center;
    padding: 1.4rem clamp(1.25rem, 3vw, 2rem);
  }
}

.contact-form,
.success-card {
  display: grid;
  gap: 1.5rem;
  padding: 1.3rem;

  @screen tablet {
    gap: 1.75rem;
    padding: 2rem;
  }
}

.field-grid {
  display: grid;
  gap: 1rem;

  @screen tablet {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.field {
  display: grid;
  gap: 0.45rem;
}

.field-label {
  font-family: theme('fontFamily.title');
  font-size: theme('fontSize.18');
}

.field-input {
  appearance: none;
  background: rgba(255, 255, 255, 0.85);
  border: 2px solid rgba(75, 65, 138, 0.18);
  border-radius: 18px;
  color: theme('colors.black');
  font-size: theme('fontSize.16');
  min-height: 58px;
  padding: 0.95rem 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  width: 100%;
}

.field-input:focus {
  border-color: theme('colors.turquoise');
  box-shadow: 0 0 0 4px rgba(21, 162, 180, 0.18);
  outline: none;
  transform: translateY(-1px);
}

.field-input[aria-invalid='true'] {
  border-color: theme('colors.red');
  box-shadow: 0 0 0 4px rgba(249, 68, 44, 0.14);
}

.field-select {
  background-image:
    linear-gradient(45deg, transparent 50%, theme('colors.purple') 50%),
    linear-gradient(135deg, theme('colors.purple') 50%, transparent 50%);
  background-position:
    calc(100% - 24px) calc(50% - 3px),
    calc(100% - 17px) calc(50% - 3px);
  background-repeat: no-repeat;
  background-size: 7px 7px, 7px 7px;
  padding-right: 3rem;
}

.field-textarea {
  min-height: 180px;
  resize: vertical;
}

.field-help,
.field-error,
.submit-error,
.success-kicker {
  font-size: theme('fontSize.14');
}

.field-help {
  color: rgba(43, 43, 43, 0.78);
}

.field-error,
.submit-error {
  color: theme('colors.red');
}

.required-mark {
  color: theme('colors.orange');
}

.trap-field {
  display: none;
}

.form-footer {
  align-items: center;
  display: grid;
  gap: 1rem;

  @screen tablet {
    grid-template-columns: minmax(0, 1fr) auto;
  }
}

.submit-button {
  background: theme('colors.purple');
  border: 2px solid theme('colors.purple');
  border-radius: 999px;
  color: theme('colors.white');
  cursor: pointer;
  font-family: theme('fontFamily.title');
  font-size: theme('fontSize.18');
  min-height: 58px;
  padding: 0.85rem 1.5rem;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.submit-button:hover:not(:disabled),
.submit-button:focus-visible:not(:disabled) {
  background: theme('colors.orange');
  color: theme('colors.black');
  outline: none;
  transform: translateY(-1px);
}

.submit-button:disabled {
  cursor: wait;
  opacity: 0.75;
}

.success-card {
  align-items: start;
}

.success-kicker {
  color: theme('colors.turquoise');
  font-family: theme('fontFamily.title');
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.success-button {
  justify-self: start;
}
</style>
