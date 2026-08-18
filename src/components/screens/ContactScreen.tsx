import React, { useState } from 'react';
import { ScreenId } from '../../types';
import { analytics } from '../../services/analytics';
import {
  Mail,
  Calendar,
  Github,
  Linkedin,
  Copy,
  Check,
  Send,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

interface ContactScreenProps {
  onAddLog: (type: any, text: string, subtext?: string) => void;
  onSelectScreen: (screenId: ScreenId) => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({ onAddLog }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSent, setFormSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('architect@kaiju-systems.com');
    setCopiedEmail(true);
    analytics.track('CONTACT_SUBMIT', 'Email Copied (Contact Screen)');
    onAddLog('OK', 'Copied direct email: architect@kaiju-systems.com');
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    analytics.track('CONTACT_SUBMIT', `Portal Inbound: ${formName} (${formCompany || 'Private'})`);
    onAddLog('NET', `Encrypted message received from ${formName} <${formEmail}>`);
    onAddLog('OK', 'Inbound pipeline: message queued for executive review.');
    setFormSent(true);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[#1c2736] pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#98cbff]/30 bg-[#98cbff]/10 px-3 py-1 text-xs font-mono text-[#98cbff]">
          <Mail className="h-3.5 w-3.5" />
          SECURE_CHANNELS // RECRUITER & EXECUTIVE INBOUND
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white font-mono">
          Initiate Engineering Contact
        </h1>
        <p className="text-sm text-[#a3b1c2]">
          Open for Senior/Staff AI-Native Engineer, Solutions Architect, FinOps Lead, and Technical Product roles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Channels & Credentials */}
        <div className="lg:col-span-5 space-y-6 font-mono text-xs">
          {/* Direct Email Card */}
          <div className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 space-y-4 shadow-xl">
            <span className="text-[#657a8e] uppercase block font-bold">Direct Email Channel:</span>
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#1e2d3d] bg-[#080d14]">
              <span className="text-white font-bold text-sm">architect@kaiju-systems.com</span>
              <button
                onClick={handleCopyEmail}
                className="text-[#98cbff] hover:text-white flex items-center gap-1 transition-colors"
              >
                {copiedEmail ? <Check className="h-4 w-4 text-[#4edea3]" /> : <Copy className="h-4 w-4" />}
                {copiedEmail ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-[#8ca3b8] text-[11px] leading-relaxed">
              Responses are typically delivered within 4 business hours for technical and leadership opportunities.
            </p>
          </div>

          {/* Availability & Location */}
          <div className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 space-y-3 shadow-xl">
            <span className="text-[#657a8e] uppercase block font-bold">Availability & Setup:</span>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white">
                <MapPin className="h-4 w-4 text-[#4edea3]" />
                <span>Remote / Hybrid (US, UK, Global Timezones)</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Clock className="h-4 w-4 text-[#98cbff]" />
                <span>Immediate Availability for Strategic Roles</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <ShieldCheck className="h-4 w-4 text-[#ffb4ab]" />
                <span>Background & Reference Ready</span>
              </div>
            </div>
          </div>

          {/* Verified Social Channels */}
          <div className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 space-y-3 shadow-xl">
            <span className="text-[#657a8e] uppercase block font-bold">Professional Profiles:</span>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/kaiju-systems"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.track('GITHUB_CLICK', 'Contact Screen Github')}
                className="flex items-center justify-between p-3 rounded-xl border border-[#1e2d3d] bg-[#080d14] text-white hover:border-[#98cbff]/50 transition-all"
              >
                <span className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-[#98cbff]" /> GitHub Profile
                </span>
                <span className="text-[11px] text-[#657a8e]">@kaiju-systems</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.track('PAGE_VIEW', 'LinkedIn Link')}
                className="flex items-center justify-between p-3 rounded-xl border border-[#1e2d3d] bg-[#080d14] text-white hover:border-[#98cbff]/50 transition-all"
              >
                <span className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-[#4edea3]" /> LinkedIn Network
                </span>
                <span className="text-[11px] text-[#657a8e]">Verified Profile</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Direct Encrypted Inbound Portal */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-[#223142] bg-[#0c131d]/90 p-6 md:p-8 space-y-6 shadow-xl font-mono text-xs">
            <div className="border-b border-[#1c2736] pb-4">
              <h2 className="text-lg font-bold text-white uppercase">
                Encrypted Transmission Portal
              </h2>
              <p className="text-[#8ca3b8] mt-1">
                Transmit job specifications, consultation inquiries, or architecture review requests.
              </p>
            </div>

            {formSent ? (
              <div className="p-6 rounded-xl border border-[#1e3b2e] bg-[#0e1a14] space-y-3 text-center">
                <CheckCircle2 className="h-10 w-10 text-[#4edea3] mx-auto" />
                <h3 className="text-base font-bold text-white">Transmission Successful</h3>
                <p className="text-[#c0d8cc] text-xs">
                  Your message has been securely recorded and dispatched into the Kaiju OS notification queue. I will reply to {formEmail} shortly.
                </p>
                <button
                  onClick={() => setFormSent(false)}
                  className="mt-2 text-xs text-[#98cbff] hover:underline"
                >
                  Send another transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitMessage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[#8ca3b8] block">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full rounded-xl border border-[#223142] bg-[#080d14] p-3 text-white placeholder-[#455768] outline-none focus:border-[#98cbff]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[#8ca3b8] block">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. alex@company.com"
                      className="w-full rounded-xl border border-[#223142] bg-[#080d14] p-3 text-white placeholder-[#455768] outline-none focus:border-[#98cbff]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#8ca3b8] block">Company / Organization / Project</label>
                  <input
                    type="text"
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    placeholder="e.g. Acme AI Systems"
                    className="w-full rounded-xl border border-[#223142] bg-[#080d14] p-3 text-white placeholder-[#455768] outline-none focus:border-[#98cbff]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#8ca3b8] block">Project / Opportunity Details *</label>
                  <textarea
                    required
                    rows={5}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Describe the technical scope, timeline, or engineering role..."
                    className="w-full rounded-xl border border-[#223142] bg-[#080d14] p-3 text-white placeholder-[#455768] outline-none focus:border-[#98cbff] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#98cbff] to-[#76aae6] py-3.5 text-sm font-bold text-[#001f3f] hover:opacity-95 transition-all shadow-lg shadow-[#98cbff]/20"
                >
                  <Send className="h-4 w-4" /> Dispatch Transmission
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
