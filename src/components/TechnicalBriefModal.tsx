import React, { useState } from 'react';
import { accessControl } from '../services/accessControl';
import {
  ShieldAlert,
  Lock,
  CheckCircle2,
  X,
  Send,
  FileCode2,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

interface TechnicalBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectSlug: string;
  projectName: string;
  onAccessGranted: () => void;
}

export const TechnicalBriefModal: React.FC<TechnicalBriefModalProps> = ({
  isOpen,
  onClose,
  projectSlug,
  projectName,
  onAccessGranted,
}) => {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [roleOrPurpose, setRoleOrPurpose] = useState('Recruiter / Hiring Evaluation');
  const [ndaAcknowledged, setNdaAcknowledged] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !workEmail.trim() || !workEmail.includes('@')) {
      setErrorMsg('Please enter your full name and a valid work/professional email address.');
      return;
    }

    const result = accessControl.submitAccessRequest({
      projectSlug,
      projectName,
      fullName: fullName.trim(),
      workEmail: workEmail.trim(),
      organization: organization.trim() || 'Private / Independent',
      roleOrPurpose,
      ndaAcknowledged,
    });

    if (result.success) {
      setSubmitted(true);
      setTimeout(() => {
        onAccessGranted();
      }, 900);
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05080c]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-2xl border border-[#223142] bg-[#0b121b] p-6 md:p-8 text-[#e5e2e1] shadow-2xl space-y-6 font-mono text-xs">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#657a8e] hover:text-white p-1 rounded-lg hover:bg-white/5 transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 border-b border-[#1c2736] pb-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#98cbff]/30 bg-[#98cbff]/10 px-3 py-1 text-[11px] text-[#98cbff]">
            <Lock className="h-3.5 w-3.5" />
            LEVEL 2 // RESTRICTED TECHNICAL BRIEF ACCESS
          </div>
          <h2 className="text-xl font-bold text-white">
            {projectName} — Technical Specification Brief
          </h2>
          <p className="text-[#8ca3b8] text-xs font-sans leading-relaxed">
            This protected technical record discloses deep architecture topologies, sequence flows, concurrency locks, and trade-off rationales for professional evaluation.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-xl border border-[#1e3b2e] bg-[#0e1a14] space-y-3 text-center animate-fadeIn">
            <CheckCircle2 className="h-10 w-10 text-[#4edea3] mx-auto animate-bounce" />
            <h3 className="text-base font-bold text-white">Technical Brief Unlocked</h3>
            <p className="text-[#c0d8cc] text-xs font-sans">
              Cryptographic session credentials generated for <strong>{workEmail}</strong>. Unlocking interactive brief viewer...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-lg border border-[#3b2020] bg-[#1a0e0e] text-[#ffb4ab] flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[#8ca3b8] block font-bold">Your Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full rounded-xl border border-[#223142] bg-[#070c12] p-3 text-white placeholder-[#455768] outline-none focus:border-[#98cbff]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#8ca3b8] block font-bold">Work / Professional Email *</label>
                <input
                  type="email"
                  required
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  placeholder="e.g. alex@company.com"
                  className="w-full rounded-xl border border-[#223142] bg-[#070c12] p-3 text-white placeholder-[#455768] outline-none focus:border-[#98cbff]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[#8ca3b8] block font-bold">Company / Organization</label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Stripe, Acme Ventures"
                  className="w-full rounded-xl border border-[#223142] bg-[#070c12] p-3 text-white placeholder-[#455768] outline-none focus:border-[#98cbff]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#8ca3b8] block font-bold">Evaluation Purpose</label>
                <select
                  value={roleOrPurpose}
                  onChange={(e) => setRoleOrPurpose(e.target.value)}
                  className="w-full rounded-xl border border-[#223142] bg-[#070c12] p-3 text-white outline-none focus:border-[#98cbff]"
                >
                  <option value="Recruiter / Hiring Evaluation">Recruiter / Hiring Evaluation</option>
                  <option value="Engineering Leadership Assessment">Engineering Leadership Assessment</option>
                  <option value="Founder / Consulting Inbound">Founder / Consulting Inbound</option>
                  <option value="Technical Architecture Review">Technical Architecture Review</option>
                  <option value="Other Professional Inquiry">Other Professional Inquiry</option>
                </select>
              </div>
            </div>

            {/* Privacy & Confidentiality Consent */}
            <div className="rounded-xl border border-[#1e2d3d] bg-[#080d14] p-3.5 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ndaAcknowledged}
                  onChange={(e) => setNdaAcknowledged(e.target.checked)}
                  className="mt-0.5 rounded border-[#223142] text-[#98cbff] focus:ring-0"
                />
                <span className="text-[11px] text-[#a3b1c2] leading-tight font-sans">
                  I acknowledge this document contains non-public engineering design briefs for professional evaluation only.
                </span>
              </label>
              <p className="text-[10px] text-[#657a8e] font-sans">
                Privacy Guarantee: Your email is used solely to log this request and attribute inbound opportunities. Zero spam, zero third-party marketing.
              </p>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#98cbff] to-[#76aae6] py-3 text-xs font-bold text-[#001f3f] hover:opacity-95 transition-all shadow-lg shadow-[#98cbff]/20 cursor-pointer"
            >
              <Send className="h-4 w-4" /> Unlock Technical Specification Brief
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
