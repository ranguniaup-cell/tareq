import React, { useState } from 'react';
import { webProjectsList, skillsData } from '../data/portfolioData';
import { Language } from '../types';
import {
  Code2,
  Sparkles,
  ExternalLink,
  Calculator,
  Laptop,
  CheckCircle,
  HelpCircle,
  Coins,
  ArrowRight,
} from 'lucide-react';

interface ProjectsAndSkillsProps {
  language: Language;
}

export const ProjectsAndSkills: React.FC<ProjectsAndSkillsProps> = ({ language = 'bn' }) => {
  // Interactive Live Micro-Loan & Savings Calculator Widget (Tareq's Signature Passion Tool)
  const [loanAmount, setLoanAmount] = useState<number>(20000);
  const [loanTenureMonths, setLoanTenureMonths] = useState<number>(12);
  const [interestRate, setInterestRate] = useState<number>(8); // 8% concessional rural rate

  // Calculate Monthly Installment (EMI)
  const monthlyRate = interestRate / 100 / 12;
  const monthlyInstallment = Math.round(
    monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTenureMonths)) /
          (Math.pow(1 + monthlyRate, loanTenureMonths) - 1)
      : loanAmount / loanTenureMonths
  );
  const totalRepayment = monthlyInstallment * loanTenureMonths;
  const totalInterest = totalRepayment - loanAmount;

  return (
    <section id="projects" className="py-20 px-4 bg-gradient-to-b from-white via-amber-50/30 to-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold mb-3">
            <Code2 className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'bn' ? 'শখ ও সৃজনশীলতা' : 'Web Passion & Skills'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight font-bangla">
            {language === 'bn' ? (
              <>
                ওয়েবসাইট তৈরি আমার <span className="gold-gradient-text">শখ ও ভালোবাসা</span>
              </>
            ) : (
              <>
                Web Development: <span className="gold-gradient-text">My Creative Passion</span>
              </>
            )}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed font-bangla">
            {language === 'bn'
              ? 'ব্যাংকিং দায়িত্বের পাশাপাশি বিভিন্ন ধরনের আধুনিক ও রেসপনসিভ ওয়েবসাইট তৈরি করা আমার প্রবল শখ। কোডিং ও ইউজার ইন্টারফেস ডিজাইন আমাকে নতুন উদ্দীপনা দেয়।'
              : 'Beyond my professional banking career, crafting intuitive, beautiful, and high-performance websites is my heartfelt hobby.'}
          </p>
        </div>

        {/* Featured Live Tool Prototype: Loan & Savings EMI Calculator */}
        <div className="mb-16 max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 text-white p-6 sm:p-10 shadow-2xl border-2 border-amber-400/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-md border border-amber-400/20 font-bangla">
                  {language === 'bn' ? 'লাইভ ওয়েব প্রজেক্ট ডেমো' : 'Live Interactive Demo'}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-amber-200 mt-1 font-bangla">
                  {language === 'bn'
                    ? 'পল্লী সঞ্চয় ও ক্ষুদ্র ঋণ ক্যালকুলেটর (তারেক নির্মিত)'
                    : 'Rural Micro-Loan & Savings EMI Calculator'}
                </h3>
              </div>
            </div>

            <span className="text-xs text-stone-300 font-bangla">
              {language === 'bn' ? 'হিসাববিজ্ঞান + ওয়েব কোডিংয়ের মেলবন্ধন' : 'Accounting + Code in Action'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Input Controls (7 cols) */}
            <div className="md:col-span-7 space-y-5 font-bangla text-xs sm:text-sm">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between text-stone-200 mb-1.5 font-semibold">
                  <span>{language === 'bn' ? 'ঋণের পরিমাণ (টাকা):' : 'Loan Amount (BDT):'}</span>
                  <span className="font-bold text-amber-300 text-base font-serif-gold">
                    ৳ {loanAmount.toLocaleString('bn-BD')}
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-amber-400 h-2 bg-stone-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                  <span>৳ ৫,০০০</span>
                  <span>৳ ৫০,০০০</span>
                  <span>৳ ১,০০,০০০</span>
                </div>
              </div>

              {/* Tenure Months */}
              <div>
                <div className="flex justify-between text-stone-200 mb-1.5 font-semibold">
                  <span>{language === 'bn' ? 'পরিশোধের মেয়াদ:' : 'Loan Duration:'}</span>
                  <span className="font-bold text-amber-300 text-base font-bangla">
                    {loanTenureMonths} {language === 'bn' ? 'মাস' : 'Months'}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[6, 12, 18, 24].map((m) => (
                    <button
                      key={m}
                      onClick={() => setLoanTenureMonths(m)}
                      className={`py-2 rounded-xl text-xs font-bold transition ${
                        loanTenureMonths === m
                          ? 'bg-amber-400 text-stone-950 shadow-md font-extrabold'
                          : 'bg-white/10 hover:bg-white/15 text-stone-300'
                      }`}
                    >
                      {m} {language === 'bn' ? 'মাস' : 'Mo'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between text-stone-200 mb-1.5 font-semibold">
                  <span>{language === 'bn' ? 'বাৎসরিক সার্ভিস চার্জ / মুনাফা হার:' : 'Annual Rate:'}</span>
                  <span className="font-bold text-amber-300 font-sans">{interestRate}%</span>
                </div>
                <div className="flex items-center gap-2">
                  {[6, 8, 10, 12].map((r) => (
                    <button
                      key={r}
                      onClick={() => setInterestRate(r)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                        interestRate === r
                          ? 'bg-amber-500 text-stone-950 font-bold'
                          : 'bg-white/5 hover:bg-white/10 text-stone-300'
                      }`}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Output Summary Card (5 cols) */}
            <div className="md:col-span-5 p-5 rounded-2xl bg-amber-500/15 border border-amber-400/30 backdrop-blur-md text-center space-y-4">
              <div>
                <p className="text-xs text-amber-200 font-bangla">
                  {language === 'bn' ? 'মাসিক কিস্তির পরিমাণ' : 'Monthly Installment (EMI)'}
                </p>
                <p className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-serif-gold tracking-tight mt-1">
                  ৳ {monthlyInstallment.toLocaleString('bn-BD')}
                </p>
                <p className="text-[11px] text-stone-400 font-bangla mt-0.5">
                  {language === 'bn' ? 'প্রতি মাসে ব্যাংকে জমাদানের পরিমাণ' : 'Per month payment'}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-left text-xs font-bangla">
                <div className="p-2.5 rounded-xl bg-white/5">
                  <span className="text-stone-400 block text-[10px]">
                    {language === 'bn' ? 'মোট মুনাফা / চার্জ:' : 'Total Interest:'}
                  </span>
                  <span className="font-bold text-amber-200 font-serif-gold">
                    ৳ {totalInterest.toLocaleString('bn-BD')}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5">
                  <span className="text-stone-400 block text-[10px]">
                    {language === 'bn' ? 'সর্বমোট পরিশোধ:' : 'Total Repayment:'}
                  </span>
                  <span className="font-bold text-amber-200 font-serif-gold">
                    ৳ {totalRepayment.toLocaleString('bn-BD')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Web Projects Cards Grid */}
        <div className="mb-16">
          <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-bangla mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span>{language === 'bn' ? 'অন্যান্য ওয়েব ডিজাইন ও কনসেপ্ট প্রজেক্ট' : 'Web Portfolio & Concepts'}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webProjectsList.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-3xl bg-white border border-amber-200/80 shadow-xs hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 font-bangla">
                      {language === 'bn' ? proj.categoryBn : proj.categoryEn}
                    </span>
                    {proj.isHobbyHighlight && (
                      <span className="text-[11px] text-amber-600 font-bold flex items-center gap-1 font-bangla">
                        <Sparkles className="w-3.5 h-3.5 fill-current" />
                        {language === 'bn' ? 'শখের প্রজেক্ট' : 'Passion'}
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-bold text-stone-900 font-bangla group-hover:text-amber-800 transition">
                    {language === 'bn' ? proj.titleBn : proj.titleEn}
                  </h4>

                  <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed font-bangla">
                    {language === 'bn' ? proj.descriptionBn : proj.descriptionEn}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-1.5">
                  {proj.tags.map((t, tidx) => (
                    <span
                      key={tidx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Proficiency Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((cat, cIdx) => (
            <div
              key={cIdx}
              className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-amber-200/80 shadow-xs"
            >
              <h4 className="text-lg font-extrabold text-stone-900 font-bangla mb-5 flex items-center gap-2">
                <Laptop className="w-5 h-5 text-amber-600" />
                <span>{language === 'bn' ? cat.categoryBn : cat.categoryEn}</span>
              </h4>

              <div className="space-y-4 font-bangla">
                {cat.skills.map((sk, sIdx) => (
                  <div key={sIdx}>
                    <div className="flex justify-between text-xs font-semibold text-stone-800 mb-1">
                      <span>{language === 'bn' ? sk.nameBn : sk.nameEn}</span>
                      <span className="text-amber-700 font-bold font-sans">{sk.level}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 transition-all duration-1000"
                        style={{ width: `${sk.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
