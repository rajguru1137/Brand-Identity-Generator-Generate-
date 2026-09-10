import React from 'react';
import { FileImage, FileText, Palette, Sparkles, ArrowRight, CheckCircle2, Smartphone } from 'lucide-react';
import { AppWorkspaceTab } from './Header';

interface MainFeatureHubProps {
  activeTab: AppWorkspaceTab;
  onTabChange: (tab: AppWorkspaceTab) => void;
  brandName?: string;
  onOpenPlayStoreModal?: () => void;
}

export const MainFeatureHub: React.FC<MainFeatureHubProps> = ({
  activeTab,
  onTabChange,
  brandName = 'DocuSync',
  onOpenPlayStoreModal,
}) => {
  const tools = [
    {
      id: 'image-to-pdf' as AppWorkspaceTab,
      titleHindi: 'इमेज से PDF बनाएं',
      titleEnglish: 'Image to PDF Converter',
      badge: 'सबसे लोकप्रिय / Instant Scan',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: FileImage,
      iconBg: 'bg-blue-600 text-white shadow-blue-500/20',
      activeBorder: 'border-blue-600 ring-2 ring-blue-500/20 shadow-md bg-blue-50/20',
      hoverBorder: 'hover:border-blue-300 hover:bg-slate-50',
      descriptionHindi: 'अपनी गैलरी, फोटो या स्कैन किए गए पन्नों को एक साथ जोड़कर हाई-क्वालिटी PDF में बदलें।',
      features: ['मल्टी-इमेज मर्जिंग (Multi-Page)', 'A4 व Letter साइज', '1-क्लिक डाउनलोड'],
      ctaText: 'इमेज कनवर्टर शुरू करें',
    },
    {
      id: 'text-to-pdf' as AppWorkspaceTab,
      titleHindi: 'टेक्स्ट से PDF बनाएं',
      titleEnglish: 'Text to PDF Publisher',
      badge: 'आसान व तेज़ / 1-Click Paste',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: FileText,
      iconBg: 'bg-emerald-600 text-white shadow-emerald-500/20',
      activeBorder: 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-md bg-emerald-50/20',
      hoverBorder: 'hover:border-emerald-300 hover:bg-slate-50',
      descriptionHindi: 'कॉपी किया हुआ टेक्स्ट, नोट्स या आर्टिकल सीधे पेस्ट करें और सुंदर प्रिंट-रेडी PDF बनाएं।',
      features: ['क्लिपबोर्ड से डायरेक्ट पेस्ट', 'ऑटो पेज ब्रेक व लिस्ट्स', 'फ़ॉन्ट व मार्जिन सेटिंग्स'],
      ctaText: 'टेक्स्ट एडिटर शुरू करें',
    },
    {
      id: 'brand' as AppWorkspaceTab,
      titleHindi: 'ब्रांड गाइड व लोगो',
      titleEnglish: 'Brand Identity Studio',
      badge: `सक्रिय: ${brandName}`,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
      icon: Palette,
      iconBg: 'bg-amber-600 text-white shadow-amber-500/20',
      activeBorder: 'border-amber-600 ring-2 ring-amber-500/20 shadow-md bg-amber-50/20',
      hoverBorder: 'hover:border-amber-300 hover:bg-slate-50',
      descriptionHindi: 'कंपनी के लिए लोगो, 5-कलर पैलेट, टाइपोग्राफी फॉन्ट और सम्पूर्ण ब्रांड बुक तैयार करें।',
      features: ['प्राइमरी व सेकेंडरी लोगो', 'कलर कोड (HEX/RGB)', 'फुल ब्रांड बुक PDF'],
      ctaText: 'ब्रांड स्टूडियो खोलें',
    },
  ];

  return (
    <section id="main-feature-hub" className="space-y-4 print:hidden">
      {/* Top Banner introducing main tools */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>मुख्य सुविधाएं (Main Features)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              आप आज क्या बनाना चाहते हैं? (Choose Your Tool)
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl">
              नीचे दिए गए मुख्य टूल्स में से किसी पर भी क्लिक करें — सब कुछ सामने और 1-क्लिक में आसान बनाया गया है:
            </p>
          </div>

          {/* Quick status pill & Play Store Button */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            <div className="flex items-center gap-2 bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>
                वर्तमान टूल:{' '}
                <strong className="text-slate-900">
                  {activeTab === 'image-to-pdf'
                    ? 'इमेज से PDF'
                    : activeTab === 'text-to-pdf'
                    ? 'टेक्स्ट से PDF'
                    : 'ब्रांड गाइड (Brand Studio)'}
                </strong>
              </span>
            </div>

            {onOpenPlayStoreModal && (
              <button
                id="btn-open-playstore-modal"
                onClick={onOpenPlayStoreModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-colors cursor-pointer"
                title="Google Play Console पर स्वचालित रूप से पब्लिश करने का सेटअप"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Play Console ऑटोमेशन</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Main Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mt-5">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTab === tool.id;

            return (
              <div
                key={tool.id}
                id={`hub-card-${tool.id}`}
                onClick={() => onTabChange(tool.id)}
                className={`group relative rounded-xl border p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between bg-white text-left ${
                  isActive ? tool.activeBorder : `border-slate-200 ${tool.hoverBorder}`
                }`}
              >
                <div className="space-y-3">
                  {/* Card Header with Icon and Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 ${tool.iconBg}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${tool.badgeColor}`}
                    >
                      {tool.badge}
                    </span>
                  </div>

                  {/* Titles */}
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {tool.titleHindi}
                    </h2>
                    <p className="text-xs font-medium text-slate-500">
                      {tool.titleEnglish}
                    </p>
                  </div>

                  {/* Hindi Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tool.descriptionHindi}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-1 pt-1 border-t border-slate-100">
                    {tool.features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="text-[11px] text-slate-600 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Button */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div
                    className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200 group-hover:text-slate-900'
                    }`}
                  >
                    <span>{isActive ? '✓ यह खुला है (Active)' : tool.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
