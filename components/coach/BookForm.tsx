'use client';

import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';

const BookForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        jobTitle: '',
        message: '',
        packageType: '', // 'independent' | 'enterprise'
        consentInfo: false,
        consentTerms: false
    });

    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const handleChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear touched state if user is typing to remove error immediately? 
        // Or keep error until fixed? Let's keep error until valid usually, but for simple UX, just update value.
    };

    const isFieldInvalid = (field: string) => {
        if (!touched[field]) return false;

        switch (field) {
            case 'firstName': return !formData.firstName.trim();
            case 'lastName': return !formData.lastName.trim();
            case 'email': return !/\S+@\S+\.\S+/.test(formData.email);
            case 'company': return !formData.company.trim();
            case 'packageType': return !formData.packageType;
            case 'consentInfo': return false; // Not strictly required by logic usually but user requested "Both required to submit"? Wait, user said "Both required to submit".
            // "Checkboxes (both required to submit)"
            case 'consents': return !formData.consentInfo || !formData.consentTerms;
            default: return false;
        }
    };

    const isValid = () => {
        return (
            formData.firstName.trim() &&
            formData.lastName.trim() &&
            /\S+@\S+\.\S+/.test(formData.email) &&
            formData.company.trim() &&
            formData.packageType &&
            formData.consentInfo &&
            formData.consentTerms
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Touch all fields to show errors if incomplete
        setTouched({
            firstName: true,
            lastName: true,
            email: true,
            company: true,
            packageType: true,
            consentInfo: true,
            consentTerms: true,
        });

        if (!isValid()) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="w-full bg-white rounded-3xl shadow-xl p-12 flex flex-col items-center justify-center text-center min-h-[600px] animate-in fade-in duration-700">
                <div className="w-16 h-16 rounded-full bg-[#3f857e]/10 flex items-center justify-center mb-6 text-[#3f857e]">
                    <Check size={32} />
                </div>
                <h3 className="text-2xl text-[#1a1d21] font-light mb-4">Thank you.</h3>
                <p className="text-[#475569] font-light text-lg">
                    We’ll be in touch shortly to schedule your conversation.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-black/5">
            <div className="p-8 md:p-10">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-normal text-[#1a1d21] mb-2">Book a Call</h2>
                    <p className="text-[#475569] font-light">Tell us a little bit about yourself and what your needs are.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#1a1d21]/70">First name *</label>
                            <input
                                type="text"
                                className={`w-full px-4 py-3 rounded-xl bg-[#e0e0e0]/20 border ${isFieldInvalid('firstName') ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-[#3f857e]/50'} outline-none focus:ring-2 focus:ring-[#3f857e]/10 transition-all font-light`}
                                value={formData.firstName}
                                onChange={e => handleChange('firstName', e.target.value)}
                                onBlur={() => handleBlur('firstName')}
                            />
                            {isFieldInvalid('firstName') && <span className="text-xs text-red-400 pl-1">Required</span>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#1a1d21]/70">Last name *</label>
                            <input
                                type="text"
                                className={`w-full px-4 py-3 rounded-xl bg-[#e0e0e0]/20 border ${isFieldInvalid('lastName') ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-[#3f857e]/50'} outline-none focus:ring-2 focus:ring-[#3f857e]/10 transition-all font-light`}
                                value={formData.lastName}
                                onChange={e => handleChange('lastName', e.target.value)}
                                onBlur={() => handleBlur('lastName')}
                            />
                            {isFieldInvalid('lastName') && <span className="text-xs text-red-400 pl-1">Required</span>}
                        </div>
                    </div>

                    {/* Email & Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#1a1d21]/70">Business email *</label>
                            <input
                                type="email"
                                className={`w-full px-4 py-3 rounded-xl bg-[#e0e0e0]/20 border ${isFieldInvalid('email') ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-[#3f857e]/50'} outline-none focus:ring-2 focus:ring-[#3f857e]/10 transition-all font-light`}
                                value={formData.email}
                                onChange={e => handleChange('email', e.target.value)}
                                onBlur={() => handleBlur('email')}
                            />
                            {isFieldInvalid('email') && <span className="text-xs text-red-400 pl-1">Invalid email</span>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#1a1d21]/70">Company name *</label>
                            <input
                                type="text"
                                className={`w-full px-4 py-3 rounded-xl bg-[#e0e0e0]/20 border ${isFieldInvalid('company') ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-[#3f857e]/50'} outline-none focus:ring-2 focus:ring-[#3f857e]/10 transition-all font-light`}
                                value={formData.company}
                                onChange={e => handleChange('company', e.target.value)}
                                onBlur={() => handleBlur('company')}
                            />
                            {isFieldInvalid('company') && <span className="text-xs text-red-400 pl-1">Required</span>}
                        </div>
                    </div>

                    {/* Optional Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#1a1d21]/50">Phone number</label>
                            <input
                                type="tel"
                                className="w-full px-4 py-3 rounded-xl bg-[#e0e0e0]/20 border border-gray-200 focus:border-[#3f857e]/50 outline-none focus:ring-2 focus:ring-[#3f857e]/10 transition-all font-light"
                                value={formData.phone}
                                onChange={e => handleChange('phone', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#1a1d21]/50">Job title</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-[#e0e0e0]/20 border border-gray-200 focus:border-[#3f857e]/50 outline-none focus:ring-2 focus:ring-[#3f857e]/10 transition-all font-light"
                                value={formData.jobTitle}
                                onChange={e => handleChange('jobTitle', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#1a1d21]/50">Message</label>
                        <textarea
                            rows={4}
                            placeholder="What would you like to explore or understand better?"
                            className="w-full px-4 py-3 rounded-xl bg-[#e0e0e0]/20 border border-gray-200 focus:border-[#3f857e]/50 outline-none focus:ring-2 focus:ring-[#3f857e]/10 transition-all font-light resize-none placeholder:text-[#1a1d21]/30"
                            value={formData.message}
                            onChange={e => handleChange('message', e.target.value)}
                        />
                    </div>

                    {/* Package Selection */}
                    <div className="space-y-3 pt-2">
                        <label className="text-sm font-medium text-[#1a1d21]/70 block">Package needed</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className={`cursor-pointer border rounded-xl p-4 flex items-center gap-3 transition-all ${formData.packageType === 'independent' ? 'border-[#3f857e] bg-[#3f857e]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input
                                    type="radio"
                                    name="packageType"
                                    value="independent"
                                    checked={formData.packageType === 'independent'}
                                    onChange={(e) => handleChange('packageType', e.target.value)}
                                    className="accent-[#3f857e] w-4 h-4"
                                />
                                <span className="text-sm text-[#1a1d21]">Independent Coach</span>
                            </label>
                            <label className={`cursor-pointer border rounded-xl p-4 flex items-center gap-3 transition-all ${formData.packageType === 'enterprise' ? 'border-[#3f857e] bg-[#3f857e]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input
                                    type="radio"
                                    name="packageType"
                                    value="enterprise"
                                    checked={formData.packageType === 'enterprise'}
                                    onChange={(e) => handleChange('packageType', e.target.value)}
                                    className="accent-[#3f857e] w-4 h-4"
                                />
                                <span className="text-sm text-[#1a1d21]">Enterprise Package</span>
                            </label>
                        </div>
                        {isFieldInvalid('packageType') && <span className="text-xs text-red-400 pl-1">Please select a package</span>}
                    </div>

                    {/* Consents */}
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={formData.consentInfo}
                                onChange={e => handleChange('consentInfo', e.target.checked)}
                                className="mt-1 accent-[#3f857e] w-4 h-4 flex-shrink-0"
                            />
                            <span className="text-xs text-[#475569] group-hover:text-[#1a1d21] transition-colors leading-relaxed">
                                I would like to receive more information about Coach Voice and its services.
                            </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={formData.consentTerms}
                                onChange={e => handleChange('consentTerms', e.target.checked)}
                                className="mt-1 accent-[#3f857e] w-4 h-4 flex-shrink-0"
                            />
                            <span className="text-xs text-[#475569] group-hover:text-[#1a1d21] transition-colors leading-relaxed">
                                I accept the website Terms of Use.
                            </span>
                        </label>

                        {(isFieldInvalid('consents') || (touched.consentInfo && !formData.consentInfo) || (touched.consentTerms && !formData.consentTerms)) && (
                            <div className="text-xs text-red-400 pl-1">Both checkboxes are required to submit.</div>
                        )}

                        <div className="text-[10px] text-[#475569]/60 leading-relaxed pt-2">
                            Personal data controller: Sfera0 (Sp. z. o. o.). See <a href="#" className="underline hover:text-[#3f857e]">Privacy Policy</a> for details.
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 rounded-xl text-white font-medium transition-all duration-300 flex items-center justify-center gap-2
                                ${isValid() ? 'bg-[#3f857e] hover:bg-[#2d6660] shadow-lg shadow-[#3f857e]/20' : 'bg-gray-300 cursor-not-allowed'}
                            `}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <span>Book a Call</span>
                            )}
                        </button>
                    </div>

                    {/* Security Notice */}
                    <div className="text-center text-[10px] text-[#475569]/40">
                        Protected by reCAPTCHA<br />
                        Privacy • Terms
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookForm;
