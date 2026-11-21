import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Mail,
  Send,
} from 'lucide-react';
import {
  CONTACT_TOPICS,
  PROFILE,
  type ContactTopic,
} from '../data/portfolioData';
import {
  validateContactForm,
  validateEmail,
  type ContactFormErrors,
  type ContactFormValues,
} from '../utils/validation';
import { BlurFade } from './ui/BlurFade';
import { SpotlightCard } from './ui/SpotlightCard';

interface SubmittedMessage extends ContactFormValues {
  submittedAt: string;
}

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  topic: 'Collaboration',
  message: '',
};

export function ContactSection() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormValues, boolean>>>({});
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [emailSuggestion, setEmailSuggestion] = useState<string | undefined>(undefined);
  const [submitted, setSubmitted] = useState<SubmittedMessage | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const runFieldValidation = (nextValues: ContactFormValues, nextTouched = touched) => {
    const result = validateContactForm(nextValues);
    const filteredErrors: ContactFormErrors = {};

    (Object.keys(result.errors) as (keyof ContactFormErrors)[]).forEach((field) => {
      if (nextTouched[field]) {
        filteredErrors[field] = result.errors[field];
      }
    });

    setErrors(filteredErrors);
    setEmailSuggestion(nextTouched.email ? result.emailSuggestion : undefined);
  };

  const handleFieldChange = <K extends keyof ContactFormValues>(
    field: K,
    value: ContactFormValues[K]
  ) => {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);

    if (field === 'email') {
      const emailCheck = validateEmail(String(value));
      setEmailSuggestion(emailCheck.suggestion);
    }

    if (touched[field]) {
      runFieldValidation(nextValues, touched);
    }
  };

  const handleFieldBlur = (field: keyof ContactFormValues) => {
    const nextTouched = { ...touched, [field]: true };
    setTouched(nextTouched);
    runFieldValidation(values, nextTouched);
  };

  const handleApplySuggestion = () => {
    if (!emailSuggestion) return;
    const nextValues = { ...values, email: emailSuggestion };
    setValues(nextValues);
    setEmailSuggestion(undefined);
    runFieldValidation(nextValues, { ...touched, email: true });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const allTouched: Record<keyof ContactFormValues, boolean> = {
      name: true,
      email: true,
      topic: true,
      message: true,
    };
    setTouched(allTouched);

    const validation = validateContactForm(values);
    setErrors(validation.errors);
    setEmailSuggestion(validation.emailSuggestion);

    if (!validation.isValid) {
      return;
    }

    setSubmitted({
      name: values.name.trim(),
      email: values.email.trim(),
      topic: values.topic,
      message: values.message.trim(),
      submittedAt: new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      }).format(new Date()),
    });
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setTouched({});
    setErrors({});
    setEmailSuggestion(undefined);
    setSubmitted(null);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.contactEmail);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      setCopiedEmail(false);
    }
  };

  const messageLength = values.message.trim().length;

  return (
    <section
      id="contact"
      className="border-t border-zinc-200/80 bg-white/50 py-20 sm:py-24 dark:border-zinc-800/80 dark:bg-[#08080A]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left contact directory */}
          <BlurFade className="lg:col-span-5">
            <p className="text-sm font-medium text-[#2563EB] dark:text-[#60A5FA]">
              04. Contact
            </p>
            <h2
              className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50"
              style={{ textWrap: 'balance' }}
            >
              Let&apos;s build something useful.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Have a project idea, collaboration opportunity, or tool feedback? I enjoy connecting
              with builders working on developer experience, thoughtful UI/UX, and practical web
              software.
            </p>

            {/* Direct email block */}
            <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-[#0D0D10]">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Direct Email
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`mailto:${PROFILE.contactEmail}`}
                  className="inline-flex items-center gap-2 font-mono text-sm font-medium text-zinc-950 hover:text-[#2563EB] dark:text-zinc-100 dark:hover:text-[#60A5FA]"
                >
                  <Mail className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                  <span>{PROFILE.contactEmail}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy admin@ladestack.in to clipboard"
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Verified social links */}
            <div className="mt-8">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Public Profiles
              </p>
              <ul className="mt-3 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
                {PROFILE.social.map((profile) => (
                  <li key={profile.url}>
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[46px] items-center justify-between gap-4 py-2.5 text-sm transition-colors hover:text-[#2563EB] dark:hover:text-[#60A5FA]"
                    >
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">
                        {profile.label}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                        <span>{profile.handle}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </BlurFade>

          {/* Right validated contact form */}
          <BlurFade delay={0.08} className="lg:col-span-7">
            <SpotlightCard className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="submitted-state"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6 py-4"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600 dark:text-emerald-400"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="font-display text-2xl font-bold text-zinc-950 dark:text-zinc-50">
                          Message prepared and validated.
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                          Thanks, {submitted.name}. Your inquiry has been validated locally at{' '}
                          {submitted.submittedAt}. You can also launch your email client directly
                          with this message pre-filled.
                        </p>
                      </div>
                    </div>

                    <dl className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900/60">
                      <div className="flex flex-wrap justify-between gap-2">
                        <dt className="text-zinc-500 dark:text-zinc-400">From</dt>
                        <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                          {submitted.name} ({submitted.email})
                        </dd>
                      </div>
                      <div className="flex flex-wrap justify-between gap-2">
                        <dt className="text-zinc-500 dark:text-zinc-400">Topic</dt>
                        <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                          {submitted.topic}
                        </dd>
                      </div>
                      <div className="border-t border-zinc-200 pt-3 dark:border-zinc-800">
                        <dt className="text-xs text-zinc-500 dark:text-zinc-400">Message</dt>
                        <dd className="mt-1 whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
                          {submitted.message}
                        </dd>
                      </div>
                    </dl>

                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={`mailto:${PROFILE.contactEmail}?subject=${encodeURIComponent(
                          `[${submitted.topic}] Message from ${submitted.name}`
                        )}&body=${encodeURIComponent(
                          `From: ${submitted.name} <${submitted.email}>\n\n${submitted.message}`
                        )}`}
                        className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1D4ED8]"
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        <span>Open in Email App</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex min-h-[44px] items-center rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
                      >
                        Send another message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="font-display text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                        Send a message
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        All fields are validated before sending. Replies go to your email address.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                        >
                          Name
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          value={values.name}
                          onChange={(e) => handleFieldChange('name', e.target.value)}
                          onBlur={() => handleFieldBlur('name')}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? 'contact-name-error' : undefined}
                          placeholder="Your name"
                          className={`mt-1.5 h-11 w-full rounded-xl border bg-zinc-50/70 px-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 dark:bg-zinc-900/70 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-900 ${
                            errors.name
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/80'
                              : 'border-zinc-200 focus:border-[#2563EB] focus:ring-[#2563EB]/20 dark:border-zinc-800 dark:focus:border-[#3B82F6]'
                          }`}
                        />
                        {errors.name && (
                          <p
                            id="contact-name-error"
                            role="alert"
                            className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                          >
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                            <span>{errors.name}</span>
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                        >
                          Email
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={values.email}
                          onChange={(e) => handleFieldChange('email', e.target.value)}
                          onBlur={() => handleFieldBlur('email')}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? 'contact-email-error' : undefined}
                          placeholder="you@example.com"
                          className={`mt-1.5 h-11 w-full rounded-xl border bg-zinc-50/70 px-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 dark:bg-zinc-900/70 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-900 ${
                            errors.email
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/80'
                              : 'border-zinc-200 focus:border-[#2563EB] focus:ring-[#2563EB]/20 dark:border-zinc-800 dark:focus:border-[#3B82F6]'
                          }`}
                        />
                        {errors.email && (
                          <p
                            id="contact-email-error"
                            role="alert"
                            className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                          >
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                        {!errors.email && emailSuggestion && (
                          <p className="mt-1.5 text-xs text-amber-700 dark:text-amber-400">
                            Did you mean{' '}
                            <button
                              type="button"
                              onClick={handleApplySuggestion}
                              className="font-mono font-medium underline underline-offset-2 hover:text-amber-900 dark:hover:text-amber-300"
                            >
                              {emailSuggestion}
                            </button>
                            ?
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Topic */}
                    <div>
                      <label
                        htmlFor="contact-topic"
                        className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                      >
                        Topic
                      </label>
                      <select
                        id="contact-topic"
                        name="topic"
                        value={values.topic}
                        onChange={(e) =>
                          handleFieldChange('topic', e.target.value as ContactTopic)
                        }
                        className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50/70 px-3.5 text-sm text-zinc-950 transition-colors focus:border-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-100 dark:focus:border-[#3B82F6] dark:focus:bg-zinc-900"
                      >
                        {CONTACT_TOPICS.map((topic) => (
                          <option key={topic} value={topic}>
                            {topic}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <label
                          htmlFor="contact-message"
                          className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                        >
                          Message
                        </label>
                        <span className="font-mono text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
                          {messageLength} / 1500
                        </span>
                      </div>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        required
                        value={values.message}
                        onChange={(e) => handleFieldChange('message', e.target.value)}
                        onBlur={() => handleFieldBlur('message')}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                        placeholder="Share context about your project, product idea, or question (at least 15 characters)..."
                        className={`mt-1.5 w-full resize-y rounded-xl border bg-zinc-50/70 p-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 dark:bg-zinc-900/70 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-900 ${
                          errors.message
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/80'
                            : 'border-zinc-200 focus:border-[#2563EB] focus:ring-[#2563EB]/20 dark:border-zinc-800 dark:focus:border-[#3B82F6]'
                        }`}
                      />
                      {errors.message && (
                        <p
                          id="contact-message-error"
                          role="alert"
                          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 sm:w-auto dark:focus-visible:ring-offset-[#0D0D10]"
                      >
                        <span>Send Message</span>
                        <Send className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </SpotlightCard>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
