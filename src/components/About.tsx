import React from 'react';
import { Language, ProfileInfo } from '../types';
import { User, Compass, CheckCircle2 } from 'lucide-react';

interface AboutProps {
  language: Language;
  profile?: ProfileInfo;
}

export const About: React.FC<AboutProps> = ({ language = 'bn', profile }) => {
  const values = [
    {
      titleBn: 'আর্থিক অন্তর্ভুক্তি ও সেবা',
      titleEn: 'Financial Inclusion',
      descBn: 'তৃণমূল পর্যায়ের মানুষের কাছে সহজ ব্যাংকিং ও সঞ্চয় সেবা পৌঁছে দেওয়া আমার ব্রত।',
      descEn: 'Committed to empowering rural communities with micro-credit and savings.',
    },
    {
      titleBn: 'হিসাববিজ্ঞানের নির্ভুলতা',
      titleEn: 'Accounting Precision',
      descBn: 'এমবিএ ডিগ্রির আলোকে আর্থিক নিরীক্ষা, লেজার ব্যালেন্স ও স্বচ্ছতা বজায় রাখা।',
      descEn: 'Rigorous auditing and ledger accuracy rooted in an Accounting MBA background.',
    },
    {
      titleBn: 'ওয়েব ক্রিয়েটিভিটি ও উদ্ভাবন',
      titleEn: 'Web Innovation',
      descBn: 'বিভিন্ন ওয়েবসাইট তৈরি আমার শখ। আধুনিক কোডিং ও ডিজিটাল সমাধানে আনন্দ পাই।',
      descEn: 'Passionate about crafting fast, modern, and accessible web experiences.',
    },
    {
      titleBn: 'প্রযুক্তিগত নেতৃত্ব',
      titleEn: 'Digital Leadership',
      descBn: 'গ্রামীণ ব্যাংকিং কার্যক্রমে আধুনিক মোবাইল ব্যাংকিং ও অনলাইন সেবার বিস্তার ঘটানো।',
      descEn: 'Pioneering cashless literacy and digital banking among rural members.',
    },
  ];

  const bioContent = language === 'bn' ? profile?.bioBn : profile?.bioEn;

  return (
    <section id="about" className="py-20 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold mb-3">
            <User className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'bn' ? 'ব্যক্তিগত পরিচিতি ও দর্শন' : 'Personal Biography'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight font-bangla">
            {language === 'bn' ? (
              <>
                আমার সম্পর্কে ও <span className="gold-gradient-text">কর্মভাবনা</span>
              </>
            ) : (
              <>
                About Me & <span className="gold-gradient-text">My Vision</span>
              </>
            )}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed font-bangla">
            {language === 'bn'
              ? 'অর্থনৈতিক উন্নয়ন ও ডিজিটাল প্রযুক্তির সমন্বয়ে ইতিবাচক পরিবর্তনের একজন সহযাত্রী।'
              : 'A dedicated public banking professional harmonizing financial literacy with creative digital web crafting.'}
          </p>
        </div>

        {/* Content Split: Story & Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Story Text (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-stone-700 font-bangla leading-relaxed">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#fefbf6] to-[#fffdfa] border border-amber-200/80 shadow-xs">
              <h3 className="text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-600" />
                <span>{language === 'bn' ? 'আমার পথচলা ও অভিজ্ঞতা' : 'My Journey & Experience'}</span>
              </h3>
              
              {bioContent ? (
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {bioContent}
                </p>
              ) : (
                <>
                  <p className="text-sm sm:text-base leading-relaxed">
                    {language === 'bn' ? (
                      <>
                        আমি <strong>{profile?.nameBn || 'মোঃ তারেক'}</strong>। জাতীয় বিশ্ববিদ্যালয় থেকে হিসাববিজ্ঞানে <strong>এমবিএ (MBA in Accounting)</strong> ডিগ্রি অর্জনের মাধ্যমে আমার পেশাগত ভিত্তি তৈরি হয়। বর্তমানে দেশের তৃণমূল জনগণের পাশে থেকে <strong>পল্লী সঞ্চয় ব্যাংক</strong>-এ <strong>মাঠ সহকারী কর্মকর্তা</strong> হিসেবে দায়িত্ব পালন করছি। ক্ষুদ্র ঋণ ব্যবস্থাপনা, সদস্য সঞ্চয় উৎসাহিতকরণ এবং ডিজিটাল ব্যাংকিং সেবায় প্রতিদিন মানুষকে সহযোগিতা করতে পারা আমার পরম আনন্দের।
                      </>
                    ) : (
                      <>
                        I am <strong>{profile?.nameEn || 'MD Tareq'}</strong>. Armed with an <strong>MBA in Accounting (National University)</strong>, I have dedicated my career to grass-roots financial inclusion as a <strong>Field Assistant Officer at Palli Sanchay Bank</strong>. Every day, I help rural families manage micro-credit, build sustainable savings habits, and adopt digital banking.
                      </>
                    )}
                  </p>
                  
                  <p className="text-sm sm:text-base leading-relaxed mt-4">
                    {language === 'bn' ? (
                      <>
                        পেশাগত দায়িত্বের পাশাপাশি <strong>বিভিন্ন ধরণের ওয়েবসাইট তৈরি আমার বিশেষ শখ</strong>। ডিজিটাল বাংলাদেশ থেকে স্মার্ট বাংলাদেশের পথে প্রযুক্তিগত কার্যক্রম ও আধুনিক ওয়েব ইন্টারফেস তৈরি করতে আমার দারুণ ভালো লাগে। আমি বিশ্বাস করি, একজন হিসাববিজ্ঞান ও ব্যাংকিং পেশাজীবী যখন ওয়েব প্রযুক্তিতে পারদর্শী হন, তখন তিনি যেকোনো জটিল কার্যক্রমকে সহজেই অটোমেট ও প্রাঞ্জল করতে পারেন।
                      </>
                    ) : (
                      <>
                        In addition to my banking responsibilities, <strong>building diverse web applications is my deep passion</strong>. I find genuine joy in crafting interactive, user-friendly digital tools that simplify everyday tasks. Combining accounting rigor with modern web design allows me to build solutions that are both precise and aesthetically delightful.
                      </>
                    )}
                  </p>
                </>
              )}
            </div>

            {/* Quick checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs font-semibold text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{language === 'bn' ? 'সততা ও দায়িত্ববোধের সাথে জনসেবা' : 'Integrity & Dedicated Service'}</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs font-semibold text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{language === 'bn' ? 'আধুনিক ওয়েব ও মোবাইল পিডব্লিউএ নির্মাতা' : 'Modern Web & PWA Creator'}</span>
              </div>
            </div>
          </div>

          {/* Core Values Grid (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-amber-200/80 shadow-xs hover:border-amber-400 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 group-hover:bg-amber-500 group-hover:text-stone-950 transition font-bold text-xs shrink-0">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-stone-900 font-bangla group-hover:text-amber-800 transition">
                      {language === 'bn' ? val.titleBn : val.titleEn}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 font-bangla leading-relaxed">
                      {language === 'bn' ? val.descBn : val.descEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
