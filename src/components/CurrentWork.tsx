import React from 'react';
import { WorkExperience, Language } from '../types';
import { Building2, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CurrentWorkProps {
  language: Language;
  work: WorkExperience;
}

export const CurrentWork: React.FC<CurrentWorkProps> = ({ language = 'bn', work }) => {
  return (
    <section id="work" className="py-20 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold mb-3">
            <Building2 className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'bn' ? 'পেশাগত দায়িত্ব ও কর্মক্ষেত্র' : 'Professional Career'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight font-bangla">
            {language === 'bn' ? (
              <>
                বর্তমান কাজ: <span className="gold-gradient-text">{work.organizationBn || 'পল্লী সঞ্চয় ব্যাংক'}</span>
              </>
            ) : (
              <>
                Current Career: <span className="gold-gradient-text">{work.organizationEn || 'Palli Sanchay Bank'}</span>
              </>
            )}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed font-bangla">
            {language === 'bn'
              ? 'মাঠ সহকারী কর্মকর্তা হিসেবে গ্রামীণ অর্থনৈতিক স্বাবলম্বিতা, সঞ্চয় সংগ্রহ ও ডিজিটাল ব্যাংকিং সেবা সম্প্রসারণে প্রতিদিনের নিরলস প্রচেষ্টা।'
              : 'Serving rural communities as Field Assistant Officer with ethical financial inclusion and micro-credit facilitation.'}
          </p>
        </div>

        {/* Highlight Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-[#fdfbf7] via-white to-[#fffaf0] border-2 border-amber-200/90 shadow-md p-6 sm:p-10 relative overflow-hidden">
          {/* Top Badge bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-amber-100">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-extrabold shadow-md shrink-0">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-bangla">
                  {language === 'bn' ? work.organizationBn : work.organizationEn}
                </h3>
                <p className="text-sm font-bold text-amber-800 font-bangla">
                  {language === 'bn' ? work.roleBn : work.roleEn}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              {work.periodBn && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  {language === 'bn' ? work.periodBn : work.periodEn}
                </span>
              )}
              {work.locationBn && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                  <MapPin className="w-3.5 h-3.5 text-stone-500" />
                  {language === 'bn' ? work.locationBn : work.locationEn}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          {work.descriptionBn && (
            <div className="py-6">
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-bangla">
                {language === 'bn' ? work.descriptionBn : work.descriptionEn}
              </p>
            </div>
          )}

          {/* Key Responsibilities list */}
          {work.responsibilitiesBn && work.responsibilitiesBn.length > 0 && (
            <div className="py-4 border-t border-amber-100">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>{language === 'bn' ? 'প্রধান কাজের পরিধি ও দায়িত্বসমূহ:' : 'Core Responsibilities:'}</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(language === 'bn'
                  ? work.responsibilitiesBn
                  : work.responsibilitiesEn
                ).map((resp, rIdx) => (
                  <div
                    key={rIdx}
                    className="flex items-start gap-2.5 p-3 rounded-2xl bg-white border border-amber-200/70 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-stone-700 font-bangla leading-relaxed">
                      {resp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Statistics Cards */}
          {work.stats && work.stats.length > 0 && (
            <div className="mt-8 pt-6 border-t border-amber-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {work.stats.map((st, sIdx) => (
                <div
                  key={sIdx}
                  className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-center"
                >
                  <p className="text-2xl sm:text-3xl font-extrabold text-amber-900 font-serif-gold">
                    {st.value}
                  </p>
                  <p className="text-[11px] sm:text-xs text-stone-600 mt-1 font-bangla font-semibold">
                    {language === 'bn' ? st.labelBn : st.labelEn}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
