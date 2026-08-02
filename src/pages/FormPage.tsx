import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Page, PageHero, Section, Block } from '../components/Section';

const FORMEASY_URL = import.meta.env.VITE_FORMEASY_URL as string | undefined;

/** Fund support form — FormEasy only. Craft / Fellowship use GitHub Issue Forms & Discussions. */
const FormPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!FORMEASY_URL) {
      setError('Form endpoint is not configured. Set VITE_FORMEASY_URL and restart the dev server.');
      return;
    }

    setSubmitting(true);

    const payload: Record<string, string> = {
      formType: 'fund',
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.description.trim(),
      organization: formData.organization.trim(),
    };

    try {
      const res = await fetch(FORMEASY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data || data.status !== 'OK') {
        throw new Error(data?.message || 'Submission failed. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Page>
        <Section tint="emerald" icon="🎉">
          <Block className="text-center py-6">
            <h1 className="section-title title-gradient tracking-tight mb-3">Thank you!</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-sm mx-auto leading-relaxed">
              Thank you for your support. A member of the Collective Superintelligence Fund will contact you.
            </p>
            <div className="mt-8">
              <Link to="/" className="btn-primary">
                Back to homepage
              </Link>
            </div>
          </Block>
        </Section>
      </Page>
    );
  }

  return (
    <Page>
      <PageHero
        icon="💚"
        title="Support the Collective Superintelligence Fund"
        subtitle="Invest in humanity. Support all those left out by conventional labs."
        tint="purple"
      />

      <Section tint="emerald">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Block className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1.5">Full name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Organization / Affiliation</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="form-input"
                placeholder="Individual / Foundation / Company"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">How would you like to support?</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="form-input"
                placeholder="I would like to contribute financially / provide mentorship / host a fellow..."
              />
            </div>
          </Block>

          {error ? (
            <p className="text-center text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          ) : null}

          <div className="pt-2 flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto min-w-[240px] py-3.5 px-8 rounded-full bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 hover:brightness-110 transition-all text-white font-bold text-sm tracking-wider shadow-lg disabled:opacity-60 disabled:pointer-events-none"
            >
              {submitting ? 'SUBMITTING…' : 'SUBMIT APPLICATION'}
            </button>
            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              By submitting, you agree to our{' '}
              <Link to="/privacy" className="underline">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link to="/cookies" className="underline">
                Cookie Policy
              </Link>
              .
            </p>
            <Link
              to="/superintelligence"
              className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ← Cancel and go back
            </Link>
          </div>
        </form>
      </Section>
    </Page>
  );
};

export default FormPage;
