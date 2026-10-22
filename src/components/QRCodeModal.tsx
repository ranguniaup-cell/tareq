import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Language } from '../types';
import {
  QrCode,
  X,
  Copy,
  Check,
  Download,
  Share2,
  ExternalLink,
  Smartphone,
  Sparkles,
  RefreshCw,
  Edit3,
} from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  defaultUrl?: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  language = 'bn',
  defaultUrl,
}) => {
  const [appUrl, setAppUrl] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isEditingUrl, setIsEditingUrl] = useState<boolean>(false);
  const [customUrl, setCustomUrl] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize URL from window or defaultUrl
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initial = defaultUrl || window.location.href;
      setAppUrl(initial);
      setCustomUrl(initial);
    }
  }, [defaultUrl, isOpen]);

  // Generate QR Code whenever appUrl changes
  useEffect(() => {
    if (!appUrl) return;

    QRCode.toDataURL(appUrl, {
      width: 480,
      margin: 2,
      color: {
        dark: '#1c1917', // stone-900
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => {
        setQrDataUrl(url);
      })
      .catch((err) => {
        console.error('Error generating QR code:', err);
      });
  }, [appUrl]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = appUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `MD_Tareq_App_QRCode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: language === 'bn' ? 'মোঃ তারেক - পোর্টফোলিও ও অ্যাপ' : 'MD Tareq - Portfolio & App',
          text: language === 'bn' ? 'সহজে ভিজিট করতে লিংকে ক্লিক করুন:' : 'Visit the portfolio app:',
          url: appUrl,
        });
      } catch {
        // User cancelled or unsupported
      }
    } else {
      handleCopyLink();
    }
  };

  const handleSaveCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      setAppUrl(customUrl.trim());
      setIsEditingUrl(false);
    }
  };

  const handleResetCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      const current = window.location.href;
      setAppUrl(current);
      setCustomUrl(current);
      setIsEditingUrl(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-2 border-amber-300/80 flex flex-col max-h-[92vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 flex items-center justify-between border-b border-amber-300">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-stone-950 text-amber-400 flex items-center justify-center shadow-md">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base font-bangla text-stone-950 leading-tight">
                {language === 'bn' ? 'অ্যাপ ভিজিট করার QR কোড' : 'Scan QR Code to Visit App'}
              </h3>
              <p className="text-[11px] font-medium text-stone-800 font-bangla">
                {language === 'bn' ? 'মোবাইল দিয়ে স্ক্যান করে সহজেই অ্যাপে ঢুকুন' : 'Scan with mobile camera to visit easily'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-black/10 hover:bg-black/20 text-stone-900 transition active:scale-95"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-center font-bangla">
          {/* QR Code Presentation Frame */}
          <div className="relative inline-block mx-auto p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-amber-50 via-white to-amber-100/60 border-2 border-amber-300 shadow-lg shadow-amber-500/10">
            {/* Corner Decorative Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-500 rounded-tl-md" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-500 rounded-tr-md" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-500 rounded-bl-md" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-500 rounded-br-md" />

            {/* QR Image */}
            {qrDataUrl ? (
              <div className="relative group">
                <img
                  src={qrDataUrl}
                  alt="App QR Code"
                  className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-2xl mx-auto bg-white p-2 shadow-xs"
                />
                {/* Center Badge MT */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 border-2 border-white shadow-md flex items-center justify-center text-stone-950 font-black text-xs font-serif-gold tracking-wider">
                    MT
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-56 h-56 flex items-center justify-center text-stone-400">
                <RefreshCw className="w-8 h-8 animate-spin text-amber-500" />
              </div>
            )}

            {/* Sub-label under QR */}
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-bold text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === 'bn' ? 'মোঃ তারেক • অফিসিয়াল ওয়েব অ্যাপ' : 'MD Tareq • Official Web App'}</span>
            </div>
          </div>

          {/* Quick Guidance */}
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-stone-600 bg-amber-50/80 border border-amber-200/90 rounded-2xl p-3">
            <Smartphone className="w-4 h-4 text-amber-700 shrink-0" />
            <p>
              {language === 'bn'
                ? 'ফোনের ক্যামেরা বা Google Lens চালু করে কোডটি স্ক্যান করুন। কোনো কিছু ইন্সটল ছাড়াই তাৎক্ষণিক ওয়েবসাইট চালু হবে!'
                : 'Point your smartphone camera or Google Lens at the QR code to open the site directly without installing anything!'}
            </p>
          </div>

          {/* URL Box & Copy */}
          <div className="space-y-2 text-left">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <span>{language === 'bn' ? 'অ্যাপ লিংক (URL):' : 'App URL:'}</span>
              </label>
              <button
                type="button"
                onClick={() => setIsEditingUrl(!isEditingUrl)}
                className="text-[11px] font-semibold text-amber-700 hover:text-amber-900 flex items-center gap-1 transition"
              >
                <Edit3 className="w-3 h-3" />
                <span>{isEditingUrl ? (language === 'bn' ? 'বাতিল' : 'Cancel') : (language === 'bn' ? 'লিংক পরিবর্তন' : 'Change Link')}</span>
              </button>
            </div>

            {isEditingUrl ? (
              <form onSubmit={handleSaveCustomUrl} className="flex gap-2">
                <input
                  type="url"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-3 py-2 rounded-xl text-xs border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs shadow-xs transition"
                >
                  {language === 'bn' ? 'সেট' : 'Set'}
                </button>
                <button
                  type="button"
                  onClick={handleResetCurrentUrl}
                  className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition"
                  title="Reset to current URL"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-stone-50 border border-stone-200">
                <input
                  type="text"
                  readOnly
                  value={appUrl}
                  className="flex-1 bg-transparent text-xs text-stone-700 font-mono focus:outline-none truncate"
                />
                <button
                  onClick={handleCopyLink}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs active:scale-95 ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>
                    {copied
                      ? language === 'bn' ? 'কপি হয়েছে!' : 'Copied!'
                      : language === 'bn' ? 'কপি' : 'Copy'}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons: Download, Share, Open Link */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
            <button
              onClick={handleDownloadQR}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md hover:shadow-lg transition active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{language === 'bn' ? 'QR ডাউনলোড' : 'Download QR'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs border border-amber-400/40 shadow-md transition active:scale-95"
            >
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>{language === 'bn' ? 'শেয়ার করুন' : 'Share'}</span>
            </button>

            <a
              href={appUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs border border-stone-200 transition active:scale-95"
            >
              <ExternalLink className="w-4 h-4 text-stone-600" />
              <span>{language === 'bn' ? 'ভিজিট করুন' : 'Open Link'}</span>
            </a>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-bangla">
          <span>{language === 'bn' ? 'ডিজিটাল ভিজিটিং কার্ড ও ওয়েবসাইট' : 'Digital Visiting Card & Website'}</span>
          <button
            onClick={onClose}
            className="text-stone-700 hover:text-stone-950 font-bold underline"
          >
            {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
