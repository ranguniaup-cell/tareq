import React, { useState, useEffect } from 'react';
import { EducationItem, Language } from '../types';
import { X, GraduationCap, Plus, Trash2, Check, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  educationItem?: EducationItem | null; // null for new, item for edit
  itemIndex?: number | null;
  onSave: (item: EducationItem, index?: number | null) => void;
}

export const EducationModal: React.FC<EducationModalProps> = ({
  isOpen,
  onClose,
  language = 'bn',
  educationItem,
  itemIndex,
  onSave,
}) => {
  const isEditing = educationItem !== null && educationItem !== undefined;

  const [formData, setFormData] = useState<EducationItem>({
    degreeBn: '',
    degreeEn: '',
    majorBn: '',
    majorEn: '',
    institutionBn: '',
    institutionEn: '',
    boardOrAffiliationBn: '',
    boardOrAffiliationEn: '',
    yearBn: '',
    yearEn: '',
    highlightsBn: [],
    highlightsEn: [],
  });

  const [newHighlightBn, setNewHighlightBn] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg('');
    if (educationItem) {
      setFormData({
        ...educationItem,
        highlightsBn: educationItem.highlightsBn ? [...educationItem.highlightsBn] : [],
        highlightsEn: educationItem.highlightsEn ? [...educationItem.highlightsEn] : [],
      });
    } else {
      setFormData({
        id: 'edu-' + Date.now(),
        degreeBn: '',
        degreeEn: '',
        majorBn: '',
        majorEn: '',
        institutionBn: '',
        institutionEn: '',
        boardOrAffiliationBn: 'জাতীয় বিশ্ববিদ্যালয়',
        boardOrAffiliationEn: 'National University',
        yearBn: '',
        yearEn: '',
        highlightsBn: ['হিসাবরক্ষণ ও আর্থিক বিশ্লেষণ', 'প্রাতিষ্ঠানিক অডিট ও রিপোর্টিং'],
        highlightsEn: ['Financial Accounting & Reporting', 'Institutional Audit'],
      });
    }
    setNewHighlightBn('');
  }, [educationItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.degreeBn.trim()) {
      setErrorMsg(language === 'bn' ? 'অনুগ্রহ করে ডিগ্রির নাম লিখুন!' : 'Please enter degree name!');
      return;
    }

    const finalItem: EducationItem = {
      ...formData,
      id: formData.id || 'edu-' + Date.now(),
      degreeEn: formData.degreeEn || formData.degreeBn,
      majorEn: formData.majorEn || formData.majorBn,
      institutionEn: formData.institutionEn || formData.institutionBn,
      boardOrAffiliationEn: formData.boardOrAffiliationEn || formData.boardOrAffiliationBn,
      yearEn: formData.yearEn || formData.yearBn,
      highlightsEn: formData.highlightsEn.length > 0 ? formData.highlightsEn : formData.highlightsBn,
    };

    onSave(finalItem, itemIndex);
    confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    onClose();
  };

  const handleAddHighlight = () => {
    if (!newHighlightBn.trim()) return;
    setFormData((prev) => ({
      ...prev,
      highlightsBn: [...prev.highlightsBn, newHighlightBn.trim()],
      highlightsEn: [...prev.highlightsEn, newHighlightBn.trim()],
    }));
    setNewHighlightBn('');
  };

  const handleRemoveHighlight = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      highlightsBn: prev.highlightsBn.filter((_, i) => i !== idx),
      highlightsEn: prev.highlightsEn.filter((_, i) => i !== idx),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-5 font-bangla animate-fadeIn">
      <div className="w-full max-w-2xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border-2 border-amber-300 flex flex-col overflow-hidden text-stone-800">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white flex items-center justify-between border-b border-amber-400/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-bold shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-amber-200">
                {isEditing
                  ? (language === 'bn' ? 'শিক্ষাগত সনদ/ডিগ্রি সম্পাদনা করুন' : 'Edit Educational Qualification')
                  : (language === 'bn' ? 'নতুন শিক্ষাগত সনদ/ডিগ্রি যুক্ত করুন' : 'Add New Educational Degree')}
              </h3>
              <p className="text-xs text-stone-300">
                {language === 'bn'
                  ? 'ডিগ্রি নাম, বিষয়, প্রতিষ্ঠান ও সন আপডেট করুন'
                  : 'Update degree title, major discipline, institution, and year'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 font-bold text-xs">
              ⚠️ {errorMsg}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Degree Title */}
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {language === 'bn' ? 'ডিগ্রি / সনদের নাম (বাংলা)*:' : 'Degree Title (Bangla)*:'}
              </label>
              <input
                type="text"
                required
                placeholder="যেমন: এমবিএ (হিসাববিজ্ঞান) বা বিবিএস অনার্স"
                value={formData.degreeBn}
                onChange={(e) => setFormData({ ...formData, degreeBn: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-400 font-bold text-stone-900"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {language === 'bn' ? 'ডিগ্রির নাম (English):' : 'Degree Title (English):'}
              </label>
              <input
                type="text"
                placeholder="e.g. MBA in Accounting or BBS (Honors)"
                value={formData.degreeEn}
                onChange={(e) => setFormData({ ...formData, degreeEn: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-400 font-sans"
              />
            </div>

            {/* Major / Subject */}
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {language === 'bn' ? 'শাখা / প্রধান বিষয় (Major):' : 'Major / Discipline:'}
              </label>
              <input
                type="text"
                placeholder="যেমন: হিসাববিজ্ঞান (Accounting) বা ব্যবসায় শিক্ষা"
                value={formData.majorBn}
                onChange={(e) => setFormData({ ...formData, majorBn: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Passing Year */}
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {language === 'bn' ? 'পাসের সন / শিক্ষাবর্ষ:' : 'Passing Year:'}
              </label>
              <input
                type="text"
                placeholder="যেমন: ২০১৯ বা ২০১৬-১৭"
                value={formData.yearBn}
                onChange={(e) => setFormData({ ...formData, yearBn: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-400 font-sans"
              />
            </div>

            {/* Institution */}
            <div className="sm:col-span-2">
              <label className="block font-bold text-stone-700 mb-1">
                {language === 'bn' ? 'প্রতিষ্ঠান / কলেজের নাম:' : 'Institution / College:'}
              </label>
              <input
                type="text"
                placeholder="যেমন: জাতীয় বিশ্ববিদ্যালয় অধিভুক্ত কলেজ / সরকারি কলেজ"
                value={formData.institutionBn}
                onChange={(e) => setFormData({ ...formData, institutionBn: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Board / Affiliation */}
            <div className="sm:col-span-2">
              <label className="block font-bold text-stone-700 mb-1">
                {language === 'bn' ? 'বোর্ড / বিশ্ববিদ্যালয়:' : 'Board / University:'}
              </label>
              <input
                type="text"
                placeholder="যেমন: জাতীয় বিশ্ববিদ্যালয় (NU) বা চট্টগ্রাম শিক্ষা বোর্ড"
                value={formData.boardOrAffiliationBn}
                onChange={(e) => setFormData({ ...formData, boardOrAffiliationBn: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Highlights / Bullet points */}
          <div className="pt-2 border-t border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block font-bold text-stone-700 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'bn' ? 'প্রধান অধ্যয়নকৃত বিষয় বা অর্জনসমূহ:' : 'Key Competencies / Highlights:'}</span>
              </label>
              <span className="text-[11px] text-stone-500">
                {formData.highlightsBn.length} {language === 'bn' ? 'টি অর্জিত বিষয়' : 'items'}
              </span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder={language === 'bn' ? 'নতুন পয়েন্ট লিখুন (যেমন: কর্পোরেট ফিন্যান্স)...' : 'Add competency point...'}
                value={newHighlightBn}
                onChange={(e) => setNewHighlightBn(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddHighlight();
                  }
                }}
                className="flex-1 p-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-400 text-xs"
              />
              <button
                type="button"
                onClick={handleAddHighlight}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'যুক্ত করুন' : 'Add'}</span>
              </button>
            </div>

            {formData.highlightsBn.length > 0 && (
              <div className="space-y-1.5 pt-1">
                {formData.highlightsBn.map((hl, hIdx) => (
                  <div
                    key={hIdx}
                    className="p-2 px-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-2 text-stone-700 text-xs"
                  >
                    <span>• {hl}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveHighlight(hIdx)}
                      className="text-stone-400 hover:text-rose-600 p-1"
                      title={language === 'bn' ? 'মুছুন' : 'Remove'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-semibold hover:bg-stone-50 transition"
            >
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-extrabold shadow-md transition flex items-center gap-2 active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>{isEditing ? (language === 'bn' ? 'পরিবর্তন সংরক্ষণ করুন' : 'Save Changes') : (language === 'bn' ? 'নতুন ডিগ্রি যোগ করুন' : 'Save Degree')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
