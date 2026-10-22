import React, { useState } from 'react';
import { EducationItem, Language } from '../types';
import {
  GraduationCap,
  BookOpen,
  CheckCircle,
  FileText,
  Download,
  Sparkles,
  Edit3,
  Trash2,
  Plus,
} from 'lucide-react';
import { EducationModal } from './EducationModal';

interface EducationProps {
  language: Language;
  educationList: EducationItem[];
  onOpenCVBuilder: () => void;
  onUpdateEducation?: (newList: EducationItem[]) => void;
}

export const Education: React.FC<EducationProps> = ({
  language = 'bn',
  educationList = [],
  onOpenCVBuilder,
  onUpdateEducation,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<EducationItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [confirmDeleteIdx, setConfirmDeleteIdx] = useState<number | null>(null);

  const handleOpenAdd = () => {
    setSelectedItem(null);
    setSelectedIndex(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: EducationItem, idx: number) => {
    setSelectedItem(item);
    setSelectedIndex(idx);
    setIsModalOpen(true);
  };

  const handleDelete = (idx: number) => {
    const updated = educationList.filter((_, i) => i !== idx);
    if (onUpdateEducation) {
      onUpdateEducation(updated);
    }
    setConfirmDeleteIdx(null);
  };

  const handleSaveModal = (savedItem: EducationItem, idx?: number | null) => {
    if (!onUpdateEducation) return;
    if (idx !== null && idx !== undefined && idx >= 0) {
      const updated = [...educationList];
      updated[idx] = savedItem;
      onUpdateEducation(updated);
    } else {
      onUpdateEducation([savedItem, ...educationList]);
    }
  };

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

        {/* Feature: Full CV Builder & PDF Download Highlight Banner */}
        <div className="max-w-4xl mx-auto mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white shadow-xl border-2 border-amber-400/50 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-bold shrink-0 shadow-lg">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold mb-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{language === 'bn' ? 'সিভি প্রস্তুতকারক ও এক্সপোর্ট' : 'CV Generator & Export'}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-amber-200 font-bangla">
                {language === 'bn'
                  ? 'পূর্ণাঙ্গ প্রফেশনাল জীবনবৃত্তান্ত (CV) তৈরি ও PDF ডাউনলোড'
                  : 'Generate & Download Full Professional CV (PDF)'}
              </h3>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed font-bangla max-w-xl">
                {language === 'bn'
                  ? 'এমবিএ ডিগ্রি, পল্লী সঞ্চয় ব্যাংকের কাজের অভিজ্ঞতা, হিসাববিজ্ঞান ও ওয়েব দক্ষতার সমন্বয়ে তৈরি ফরম্যাট। যেকোনো তথ্য সম্পাদনা করে সরাসরি এ৪ (A4) সাইজ PDF ডাউনলোড করুন।'
                  : 'Tailored executive CV with accounting degrees, banking experience, and tech skills. Edit and download pristine A4 PDF.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto shrink-0">
            <button
              onClick={onOpenCVBuilder}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-extrabold text-xs shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 active:scale-95"
            >
              <Download className="w-4 h-4 text-stone-950" />
              <span className="font-bangla">{language === 'bn' ? 'সিভি ফরম ও PDF' : 'Open CV & PDF'}</span>
            </button>

            {onUpdateEducation && (
              <button
                onClick={handleOpenAdd}
                className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-amber-200 border border-amber-400/40 font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span className="font-bangla">{language === 'bn' ? 'নতুন ডিগ্রি যোগ' : 'Add Degree'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Education Timeline Cards */}
        {educationList && educationList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {educationList.map((item, idx) => (
              <div
                key={item.id || idx}
                className="relative p-7 rounded-3xl bg-white border-2 border-amber-200/90 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 group overflow-hidden"
              >
                {/* Gold Top Border Glow */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100/80 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0 group-hover:scale-105 transition">
                    <GraduationCap className="w-6 h-6" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.yearBn && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 font-sans">
                        {language === 'bn' ? item.yearBn : item.yearEn}
                      </span>
                    )}

                    {/* Direct Edit & Delete controls */}
                    {onUpdateEducation && (
                      <div className="flex items-center gap-1 ml-1 bg-stone-50 p-1 rounded-xl border border-stone-200">
                        {confirmDeleteIdx === idx ? (
                          <div className="flex items-center gap-1 px-1 py-0.5">
                            <span className="text-[10px] text-rose-600 font-bold font-bangla">মুছবেন?</span>
                            <button
                              onClick={() => handleDelete(idx)}
                              className="px-1.5 py-0.5 rounded bg-rose-500 hover:bg-rose-600 text-white text-[10px] font-bold font-bangla"
                            >
                              হ্যাঁ
                            </button>
                            <button
                              onClick={() => setConfirmDeleteIdx(null)}
                              className="px-1.5 py-0.5 rounded bg-stone-200 hover:bg-stone-300 text-stone-700 text-[10px] font-bangla"
                            >
                              না
                            </button>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => handleOpenEdit(item, idx)}
                              className="p-1 rounded-lg text-stone-500 hover:text-amber-800 hover:bg-amber-100/70 transition"
                              title={language === 'bn' ? 'ডিগ্রি সম্পাদনা করুন' : 'Edit Degree'}
                              aria-label="Edit degree"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setConfirmDeleteIdx(idx)}
                              className="p-1 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition"
                              title={language === 'bn' ? 'ডিগ্রি মুছে ফেলুন' : 'Delete Degree'}
                              aria-label="Delete degree"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-stone-900 font-bangla group-hover:text-amber-800 transition">
                  {language === 'bn' ? item.degreeBn : item.degreeEn}
                </h3>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-800">
                  {item.majorBn && (
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-100/70">
                      {language === 'bn' ? item.majorBn : item.majorEn}
                    </span>
                  )}
                  {item.institutionBn && (
                    <>
                      <span>•</span>
                      <span className="text-stone-600">
                        {language === 'bn' ? item.institutionBn : item.institutionEn}
                      </span>
                    </>
                  )}
                </div>

                {item.boardOrAffiliationBn && (
                  <p className="mt-2 text-[11px] text-stone-500 font-bangla">
                    {language === 'bn' ? 'অধিভুক্তি / বোর্ড:' : 'Affiliation / Board:'}{' '}
                    <span className="font-semibold text-stone-700">{language === 'bn' ? item.boardOrAffiliationBn : item.boardOrAffiliationEn}</span>
                  </p>
                )}

                {item.highlightsBn && item.highlightsBn.length > 0 && (
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
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-amber-50/50 rounded-3xl border border-amber-200 max-w-lg mx-auto space-y-3">
            <p className="text-sm text-stone-600 font-bangla">
              {language === 'bn'
                ? 'বর্তমানে কোনো ডিগ্রি তালিকাভুক্ত নেই।'
                : 'No degrees listed currently.'}
            </p>
            {onUpdateEducation && (
              <button
                onClick={handleOpenAdd}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
              >
                {language === 'bn' ? 'নতুন ডিগ্রি যোগ করুন' : 'Add First Degree'}
              </button>
            )}
          </div>
        )}

        {/* Add New Degree Button */}
        {onUpdateEducation && educationList && educationList.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-amber-50 border-2 border-dashed border-amber-300 hover:border-amber-500 text-amber-900 font-bold text-xs transition shadow-xs group"
            >
              <Plus className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
              <span>{language === 'bn' ? '+ আরেকটি শিক্ষাগত সনদ / ডিগ্রি যোগ করুন' : '+ Add Another Degree'}</span>
            </button>
          </div>
        )}

        {/* Academic Competency Badges */}
        <div className="mt-12 max-w-4xl mx-auto p-6 rounded-3xl bg-gradient-to-r from-amber-50 via-white to-amber-50 border border-amber-200 text-center shadow-xs">
          <h4 className="font-extrabold text-sm text-stone-900 mb-2 font-bangla">
            {language === 'bn' ? 'হিসাববিজ্ঞান ও ব্যাংকিং প্রাতিষ্ঠানিক মেধা' : 'Core Academic Disciplines'}
          </h4>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {[
              'অ্যাকাউন্টিং অ্যান্ড ফাইন্যান্সিয়াল রিপোর্টিং',
              'অডিটিং ও কন্ট্রোল মেকানিজম',
              'কস্ট অ্যাকাউন্টিং ও বাজেট বিশ্লেষণ',
              'মাইক্রোফাইন্যান্স ও গ্রামীণ ব্যাংকিং ম্যানেজমেন্ট',
              'ট্যাক্সেশন ও কর হিসাবরক্ষণ',
              'ব্যাংকিং আইন ও রেগুলেশন',
            ].map((badge, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-white border border-amber-300/80 text-amber-900 font-medium font-bangla shadow-2xs"
              >
                ✓ {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Education Edit / Add Modal */}
      <EducationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        language={language}
        educationItem={selectedItem}
        itemIndex={selectedIndex}
        onSave={handleSaveModal}
      />
    </section>
  );
};
