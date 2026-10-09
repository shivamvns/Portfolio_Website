import React, { useId, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

// Pass these values from your portfolio data or resume.json.
// Use a local PDF URL (for example /resume.pdf) for reliable downloads.
const Contact = ({ contactEmail = '', linkedinUrl = '', resumeUrl = '' }) => {
  const ref = useRef(null);
  const fieldId = useId();
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '20%']);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setStatus('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      setStatus('Please enter your name and a message.');
      return;
    }
    if (!contactEmail) {
      setStatus('Email contact is currently unavailable. Please use LinkedIn.');
      return;
    }

    const subject = `Portfolio enquiry from ${formData.name.trim()}`;
    const body = [
      `Name: ${formData.name.trim()}`,
      `Reply email: ${formData.email.trim()}`,
      '',
      formData.message.trim(),
    ].join('\n');

    // Opens a draft only. Sending happens in the visitor's email app.
    window.location.href = `mailto:${encodeURIComponent(contactEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('An email draft was requested. Send it from your email app to complete your enquiry.');
  };

  const inputClass = 'w-full rounded-none border-b border-white/30 bg-transparent pb-3 text-base text-white placeholder:text-white/50 focus:border-red-500 focus:outline-none transition-colors';
  const linkClass = 'inline-flex min-h-[48px] items-center justify-center gap-2 rounded border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-red-500 hover:bg-red-600/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500';

  return (
    <section ref={ref} id="contact" aria-labelledby={`${fieldId}-heading`} className="relative flex min-h-screen w-full items-end overflow-hidden border-t border-white/10 bg-[#0b0b0b] pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/15 blur-[160px]" />

      <motion.div aria-hidden="true" style={{ y: reduceMotion ? 0 : y }} className="pointer-events-none absolute inset-0 z-0 flex justify-center overflow-hidden pt-16 opacity-10 md:pt-12">
        <span className="origin-top select-none text-[25vw] font-black uppercase leading-[0.75] tracking-tighter text-red-600 scale-y-[1.6]" style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}>
          CONTACT
        </span>
      </motion.div>

      <div className="relative z-10 flex w-full justify-end">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: 'easeOut' }}
          className="relative w-full overflow-hidden rounded-tl-[3rem] border-l border-t border-white/15 bg-[#141414]/95 p-6 py-10 text-white shadow-[0_-25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:p-10 md:w-[90%] lg:w-[82%] lg:p-16"
        >
          <div aria-hidden="true" className="absolute left-1/2 top-0 h-1 w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

          <div className="mb-10 inline-flex items-center gap-2 rounded border border-red-600/30 bg-red-600/10 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-red-400 sm:text-xs">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-red-500" />
            EPISODE 04 // GET IN TOUCH
          </div>

          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-red-400">Let’s build quality software</p>
              <h2 id={`${fieldId}-heading`} className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Have an opportunity?<br /><span className="text-red-500">Let’s connect.</span></h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/75">Looking for an SDET / QA Automation Engineer? Get in touch about job opportunities, testing projects, or collaborations.</p>

              <div className="mt-8 flex flex-wrap gap-3">
                {linkedinUrl ? (
                  <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>LinkedIn <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
                ) : (
                  <button type="button" disabled className={`${linkClass} cursor-not-allowed opacity-50`}>LinkedIn <span className="sr-only"> unavailable</span></button>
                )}
                {resumeUrl ? (
                  <a href={resumeUrl} download className={linkClass}>Download Resume <span aria-hidden="true">↓</span></a>
                ) : (
                  <button type="button" disabled className={`${linkClass} cursor-not-allowed opacity-50`}>Download Resume <span className="sr-only"> unavailable</span></button>
                )}
              </div>
              {contactEmail && <a href={`mailto:${encodeURIComponent(contactEmail)}`} className="mt-6 inline-block break-all text-sm text-white/75 underline decoration-white/30 underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500">{contactEmail}</a>}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              <div>
                <label htmlFor={`${fieldId}-name`} className="mb-3 block text-sm font-medium text-white/85">Name</label>
                <input id={`${fieldId}-name`} name="name" type="text" autoComplete="name" value={formData.name} onChange={handleChange} placeholder="Your full name" required maxLength={100} className={inputClass} />
              </div>
              <div>
                <label htmlFor={`${fieldId}-email`} className="mb-3 block text-sm font-medium text-white/85">Email</label>
                <input id={`${fieldId}-email`} name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required maxLength={254} className={inputClass} />
              </div>
              <div>
                <label htmlFor={`${fieldId}-message`} className="mb-3 block text-sm font-medium text-white/85">Message</label>
                <textarea id={`${fieldId}-message`} name="message" value={formData.message} onChange={handleChange} placeholder="Tell me about the role, project, or opportunity…" required rows={4} maxLength={1500} className={`${inputClass} min-h-[140px] resize-y`} />
              </div>
              <div>
                <button type="submit" aria-describedby={`${fieldId}-email-help`} className="inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded bg-red-600 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(229,9,20,0.3)] transition-colors hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500 sm:w-auto">
                  Open Email Draft <span aria-hidden="true">→</span>
                </button>
                <p id={`${fieldId}-email-help`} className="mt-3 text-xs leading-relaxed text-white/65">Opens your email app with your message ready to send.</p>
                <p role="status" aria-live="polite" className="mt-3 text-sm leading-relaxed text-white/85">{status}</p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
