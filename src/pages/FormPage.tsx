import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Page, PageHero, Section, Block } from '../components/Section';

interface FormPageProps {
  type: 'craft' | 'fellowship' | 'fund';
}

const FORMEASY_URL = import.meta.env.VITE_FORMEASY_URL as string | undefined;

const FormPage: React.FC<FormPageProps> = ({ type }) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    description: '',
    topic: '',
    github: '',
    portfolio: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      formType: type,
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.description.trim(),
    };

    if (type === 'craft') {
      payload.organization = formData.organization.trim();
      payload.topic = formData.topic.trim();
    } else if (type === 'fellowship') {
      payload.github = formData.github.trim();
      payload.portfolio = formData.portfolio.trim();
    } else {
      payload.organization = formData.organization.trim();
    }

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

  const getTitle = () => {
    switch (type) {
      case 'craft': return 'Submit Your Project to AIR-Craft';
      case 'fellowship': return 'Join the AIR Fellowship';
      case 'fund': return 'Support the Collective Superintelligence Fund';
    }
  };

  const getSubtitle = () => {
    switch (type) {
      case 'craft': return 'Register, receive orientation, and submit your craft project.';
      case 'fellowship': return 'For misfits, generalists, autodidacts, and marginalized individuals.';
      case 'fund': return 'Invest in humanity. Support all those left out by conventional labs.';
    }
  };

  const getFields = () => {
    const baseFields = (
      <>
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
      </>
    );

    if (type === 'craft') {
      return (
        <>
          {baseFields}
          <div>
            <label className="block text-sm font-medium mb-1.5">Organization / Affiliation (optional)</label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="form-input"
              placeholder="Independent / University / Lab"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Project title / topic</label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="E.g. Moments Economy"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Short description of project</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="form-input"
              placeholder="Describe what you are crafting and how it aligns with AIR..."
            />
          </div>
        </>
      );
    } else if (type === 'fellowship') {
      return (
        <>
          {baseFields}
          <div>
            <label className="block text-sm font-medium mb-1.5">Background / Experience</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="form-input"
              placeholder="Briefly describe your background, interests and why you want to join the fellowship..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">GitHub</label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="https://github.com/yourname"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Portfolio / website (optional)</label>
            <input
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              className="form-input"
              placeholder="https://your-site.com"
            />
          </div>
        </>
      );
    } else {
      return (
        <>
          {baseFields}
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
        </>
      );
    }
  };

  if (submitted) {
    return (
      <Page>
        <Section tint="emerald" icon="🎉">
          <Block className="text-center py-6">
            <h1 className="section-title title-gradient tracking-tight mb-3">Thank you!</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-sm mx-auto leading-relaxed">
              {type === 'craft' && 'Your project submission has been received. We will reach out shortly with orientation materials.'}
              {type === 'fellowship' && 'Your fellowship application has been received. Our team will get in touch within the next few days.'}
              {type === 'fund' && 'Thank you for your support. A member of the Collective Superintelligence Fund will contact you.'}
            </p>
            <div className="mt-8">
              <Link to="/" className="btn-primary">Back to homepage</Link>
            </div>
          </Block>
        </Section>
      </Page>
    );
  }

  return (
    <Page>
      <PageHero
        icon={type === 'craft' ? '🛠️' : type === 'fellowship' ? '🎫' : '💚'}
        title={getTitle()}
        subtitle={getSubtitle()}
        tint={type === 'fund' ? 'purple' : 'emerald'}
      />

      <Section tint="emerald">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Block className="space-y-6">
            {getFields()}
          </Block>

          {error && (
            <p className="text-center text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}

          <div className="pt-2 flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto min-w-[240px] py-3.5 px-8 rounded-full bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 hover:brightness-110 transition-all text-white font-bold text-sm tracking-wider shadow-lg disabled:opacity-60 disabled:pointer-events-none"
            >
              {submitting ? 'SUBMITTING…' : 'SUBMIT APPLICATION'}
            </button>
            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              By submitting, you agree to our <Link to="/privacy" className="underline">Privacy Policy</Link> and <Link to="/cookies" className="underline">Cookie Policy</Link>.
            </p>
            <Link
              to={type === 'craft' ? '/craft' : '/superintelligence'}
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
