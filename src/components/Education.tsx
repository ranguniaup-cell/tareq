import React from 'react';
import { educationList } from '../data/portfolioData';
import { Language } from '../types';
import { GraduationCap, Award, BookOpen, CheckCircle, FileCheck } from 'lucide-react';

interface EducationProps {
  language: Language;
}

export const Education: React.FC<EducationProps> = ({ language = 'bn' }) => {
  return (
    <section id="education" className="py-20 px-4 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'bn' ? 'শিক্ষাগত যোগ্যতা ও সনদ' : 'Academic Credentials'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight font-bangla">
            {language === 'bn' ? (
              <>
                শিক্ষা ও <span className="gold-gradient-text">হিসাববিজ্ঞান মেধা</span>
              </>
            ) : (
              <>
                Education & <span className="gold-gradient-text">Accounting Expertise</span>
              </>
            )}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed font-bangla">
            {language === 'bn'
              ? 'জাতীয় বিশ্ববিদ্যালয় থেকে হিসাববিজ্ঞানে এমবিএ ও বিবিএস—আর্থিক বিশ্লেষণ ও প্রাতিষ্ঠানিক হিসাবরক্ষণের মজবুত বুনিয়াদ।'
              : 'Postgraduate degree in Accounting from National University (NU), delivering mathematical precision and audit expertise.'}
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {educationList.map((item, idx) => (
            <div
              key={idx}
              className="relative p-7 rounded-3xl bg-white border-2 border-amber-200/90 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 group overflow-hidden"
            >
              {/* Gold Top Border Glow */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />

              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100/80 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0 group-hover:scale-105 transition">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 font-sans">
                  {language === 'bn' ? item.yearBn : item.yearEn}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-stone-900 font-bangla group-hover:text-amber-800 transition">
                {language === 'bn' ? item.degreeBn : item.degreeEn}
              </h3>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-800">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-100/70">
                  {language === 'bn' ? item.majorBn : item.majorEn}
                </span>
                <span>•</span>
                <span className="text-stone-600">
                  {language === 'bn' ? item.institutionBn : item.institutionEn}
                </span>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-100 space-y-2.5">
                <p className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                  <span>{language === 'bn' ? 'অধ্যয়নকৃত প্রধান ক্ষেত্রসমূহ:' : 'Key Subject Disciplines:'}</span>
                </p>

                <ul className="space-y-1.5 text-xs text-stone-600 font-bangla">
                  {(language === 'bn' ? item.highlightsBn : item.highlightsEn).map((hl, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Academic Competency Badges */}
        <div className="mt-12 max-w-4xl mx-auto p-6 rounded-3xl bg-gradient-to-r from-amber-50 via-white to-amber-50 border border-amber-200 text-center shadow-xs">
          <h4 className="font-bold text-sm text-stone-900 mb-3 font-bangla flex items-center justify-center gap-2">
            <FileCheck className="w-4 h-4 text-amber-600" />
            <span>{language === 'bn' ? 'এমবিএ হিসাববিজ্ঞান দক্ষতার প্রয়োগ' : 'Accounting & Analytics Domain Mastery'}</span>
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              'ফাইন্যান্সিয়াল অডিট',
              'ট্যাক্সেশন ও কর নির্ধারণ',
              'কস্ট অ্যান্ড ম্যানেজমেন্ট অ্যাকাউন্টিং',
              'ব্যাংক ব্যালেন্স শিট রিকনসিলিয়েশন',
              'আর্থিক স্টেটমেন্ট প্রস্তুতকরণ',
              'মাইক্রোক্রেডিট ফিন্যান্সিয়াল অ্যানালাইসিস',
            ].map((skill, sIdx) => (
              <span
                key={sIdx}
                className="px-3.5 py-1.5 rounded-xl bg-white text-xs font-semibold text-amber-950 border border-amber-200 shadow-2xs font-bangla"
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
