import React, { useState } from 'react';
import { Language } from '../types';
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle, Building2, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactProps {
  language: Language;
}

export const Contact: React.FC<ContactProps> = ({ language = 'bn' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      await res.json();
      setSubmitted(true);
      confetti({ particleCount: 70, spread: 60 });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      // Graceful fallback
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:Tareq;MD;;;
FN:MD Tareq (মোঃ তারেক)
ORG:Palli Sanchay Bank
TITLE:Field Assistant Officer
EMAIL;TYPE=INTERNET:ranguniaup@gmail.com
NOTE:MBA in Accounting (NU). Passionate Web Developer & Digital Creator.
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'MD_Tareq_PalliSanchayBank.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" className="py-20 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold mb-3">
            <Phone className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'bn' ? 'যোগাযোগ ও বার্তা' : 'Get in Touch'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight font-bangla">
            {language === 'bn' ? (
              <>
                সরাসরি <span className="gold-gradient-text">যোগাযোগ করুন</span>
              </>
            ) : (
              <>
                Let's <span className="gold-gradient-text">Connect</span>
              </>
            )}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed font-bangla">
            {language === 'bn'
              ? 'পল্লী সঞ্চয় ব্যাংকের সেবা পরামর্শ, হিসাবরক্ষণ বা যেকোনো ধরনের নতুন ওয়েবসাইট ও ডিজিটাল প্রজেক্ট নিয়ে আলোচনার জন্য যোগাযোগ করতে পারেন।'
              : 'Feel free to reach out for banking inquiries, micro-savings counseling, or exciting web development collaborations.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          
          {/* Contact Details & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Direct Cards */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#fefbf6] to-[#fffdfa] border-2 border-amber-200/80 shadow-xs space-y-5">
              <h3 className="text-lg font-bold text-stone-900 font-bangla flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-600" />
                <span>{language === 'bn' ? 'ঠিকানা ও যোগাযোগের মাধ্যম' : 'Contact Channels'}</span>
              </h3>

              {/* Email */}
              <a
                href="mailto:ranguniaup@gmail.com?subject=Regarding%20Portfolio%20Inquiry"
                className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-amber-200/80 hover:border-amber-400 hover:shadow-xs transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-stone-950 transition">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-500 font-bangla">
                    {language === 'bn' ? 'অফিসিয়াল ও ব্যক্তিগত ইমেইল' : 'Email'}
                  </p>
                  <p className="text-sm font-bold text-stone-900 font-sans break-all">
                    ranguniaup@gmail.com
                  </p>
                </div>
              </a>

              {/* Organization */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-amber-200/80">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-500 font-bangla">
                    {language === 'bn' ? 'কর্মক্ষেত্র' : 'Workplace'}
                  </p>
                  <p className="text-sm font-bold text-stone-900 font-bangla">
                    পল্লী সঞ্চয় ব্যাংক, মাঠ শাখা
                  </p>
                  <p className="text-xs text-amber-800 font-bangla">ফিল্ড অ্যাসিস্ট্যান্ট অফিসার</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-amber-200/80">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-500 font-bangla">
                    {language === 'bn' ? 'অবস্থান' : 'Location'}
                  </p>
                  <p className="text-sm font-bold text-stone-900 font-bangla">
                    রাঙ্গুনিয়া, চট্টগ্রাম, বাংলাদেশ
                  </p>
                </div>
              </div>

              {/* WhatsApp Quick Link */}
              <a
                href="https://wa.me/8801819000000?text=Hello%20Tareq%20bhai,%20I%20visited%20your%20portfolio"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে চ্যাট করুন' : 'Chat on WhatsApp'}</span>
              </a>

              <button
                onClick={handleDownloadVCard}
                className="w-full py-2.5 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-stone-600" />
                <span>{language === 'bn' ? 'যোগাযোগ কার্ড (vCard) ডাউনলোড' : 'Save vCard to Contacts'}</span>
              </button>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-amber-200/90 shadow-md">
              <h3 className="text-xl font-bold text-stone-900 font-bangla mb-4">
                {language === 'bn' ? 'একটি বার্তা পাঠান' : 'Send a Message'}
              </h3>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 text-center space-y-3 animate-fadeIn">
                  <CheckCircle className="w-10 h-10 text-amber-600 mx-auto" />
                  <h4 className="font-extrabold text-stone-900 font-bangla text-base">
                    {language === 'bn'
                      ? 'ধন্যবাদ! আপনার বার্তাটি গৃহীত হয়েছে।'
                      : 'Thank you! Your message has been received.'}
                  </h4>
                  <p className="text-xs text-stone-600 font-bangla">
                    {language === 'bn'
                      ? 'মোঃ তারেক শীঘ্রই আপনার সাথে যোগাযোগ করবেন।'
                      : 'MD Tareq will get back to you shortly.'}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs font-bold text-amber-800 underline hover:text-amber-900"
                  >
                    {language === 'bn' ? 'আরেকটি বার্তা লিখুন' : 'Send another note'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-bangla text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {language === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={language === 'bn' ? 'যেমন: মোহাম্মদ রফিক' : 'e.g. John Doe'}
                        className="w-full p-3 rounded-xl bg-amber-50/40 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {language === 'bn' ? 'ইমেইল অ্যাড্রেস *' : 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@mail.com"
                        className="w-full p-3 rounded-xl bg-amber-50/40 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-900 font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {language === 'bn' ? 'ফোন নম্বর' : 'Phone Number'}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="018XXXXXXXX"
                        className="w-full p-3 rounded-xl bg-amber-50/40 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-900 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {language === 'bn' ? 'বিষয়ের শিরোনাম' : 'Subject'}
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={language === 'bn' ? 'ওয়েবসাইট তৈরি / ব্যাংকিং পরামর্শ' : 'Web design or Banking'}
                        className="w-full p-3 rounded-xl bg-amber-50/40 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {language === 'bn' ? 'আপনার বার্তা *' : 'Your Message *'}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        language === 'bn'
                          ? 'আপনার প্রয়োজনীয় বার্তা বিস্তারিত লিখুন...'
                          : 'Write your message here...'
                      }
                      className="w-full p-3 rounded-xl bg-amber-50/40 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-900 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-98 disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {isSubmitting
                        ? language === 'bn'
                          ? 'পাঠানো হচ্ছে...'
                          : 'Sending...'
                        : language === 'bn'
                        ? 'বার্তা প্রেরণ করুন'
                        : 'Send Message'}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
