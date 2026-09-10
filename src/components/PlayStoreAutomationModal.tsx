import React, { useState } from 'react';
import {
  X,
  Smartphone,
  Copy,
  Check,
  Download,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Key,
  FolderGit2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface PlayStoreAutomationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlayStoreAutomationModal: React.FC<PlayStoreAutomationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const packageId = 'com.gurudyal.docusync';
  const appName = 'DocuSync - Image & Text to PDF';
  const liveUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://ais-dev-ixe7pzjgijdmasggnzdnq7-623909174570.asia-southeast1.run.app';

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const keystoreCmd = `keytool -genkey -v -keystore release.keystore -alias docusync -keyalg RSA -keysize 2048 -validity 10000`;
  const encodeCmd = `base64 -w 0 release.keystore > keystore_base64.txt`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                Play Console ऑटोमेशन सेटअप (Play Store Publishing)
              </h3>
              <p className="text-xs text-slate-400">
                ऑटोमेटेड CI/CD से सीधे Google Play Console पर .aab अपलोड करें
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Status Banner */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-blue-900">
                गूगल सिक्योरिटी नियम: सीधा ब्राउज़र से अपलोड क्यों नहीं हो सकता?
              </p>
              <p className="text-blue-800 leading-relaxed">
                Google Play Store सुरक्षा कारणों से किसी भी ब्राउज़र या अज्ञात वेब पेज को सीधे आपके डेवलपर अकाउंट में ऐप डालने की अनुमति नहीं देता। गूगल को <strong>Service Account JSON Key</strong> (API Access) चाहिए होती है। इसे 1 बार जोड़ देने के बाद <strong>हर बार ऑटोमैटिक अपलोड</strong> होता है।
              </p>
            </div>
          </div>

          {/* 2 Methods Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span>तरीका 1: सबसे तेज़ ऑटोमेशन (GitHub Actions CI/CD)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                रेकमेंडेड (Fully Automated)
              </span>
            </h4>

            {/* Steps List */}
            <div className="space-y-3 pl-1">
              {/* Step 1 */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-2 text-xs sm:text-sm">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-mono">1</span>
                    प्रोजेक्ट को GitHub पर एक्सपोर्ट करें
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">1 क्लिक</span>
                </div>
                <p className="text-xs text-slate-600">
                  AI Studio स्क्रीन के टॉप-राइट में <strong>Settings (गियर आइकन) &gt; Export to GitHub</strong> पर क्लिक करें। हमने आपके प्रोजेक्ट में पहले से ही <code>.github/workflows/deploy-playstore.yml</code> फ़ाइल जोड़ दी है!
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-2 text-xs sm:text-sm">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-mono">2</span>
                    Play Console में API Access कहाँ मिलेगा? (Service Account)
                  </span>
                  <a
                    href="https://play.google.com/console/developers/api-access"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                  >
                    <span>सीधा लिंक खोलें</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="text-xs text-slate-600 space-y-1.5 bg-white p-3 rounded-lg border border-slate-200">
                  <p className="font-semibold text-slate-800">
                    🔍 अगर आपको मेनू में "API access" नहीं दिख रहा है:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-slate-600">
                    <li>किसी ऐप के अंदर न रहें—सबसे पहले ऊपर <strong>"All apps" (सभी ऐप्स)</strong> पर क्लिक करें।</li>
                    <li>बाईं पट्टी में सबसे नीचे स्क्रॉल करें और <strong>"Developer account" (डेवलपर खाता)</strong> पर क्लिक करें।</li>
                    <li>अंदर आपको <strong>"API access" (एपीआई ऐक्सेस)</strong> मिलेगा।</li>
                    <li><em>ध्यान दें:</em> प्ले कंसोल में टेक्स्ट "API Key" नहीं होती, बल्कि Google Cloud का <strong>Service Account JSON</strong> होता है।</li>
                  </ol>
                </div>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  <li><strong>"Link Google Cloud Project"</strong> पर क्लिक करें।</li>
                  <li><strong>"Create Service Account"</strong> बनाकर <strong>JSON Key</strong> डाउनलोड करें।</li>
                </ul>
              </div>

              {/* Step 3 */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-2 text-xs sm:text-sm">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-mono">3</span>
                    GitHub Secrets में Key जोड़ें
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  अपने GitHub Repo में <strong>Settings &gt; Secrets and variables &gt; Actions</strong> में जाकर यह सीक्रेट जोड़ें:
                </p>
                <div className="bg-slate-900 text-slate-100 p-2.5 rounded-lg text-xs font-mono flex items-center justify-between">
                  <span>Name: <strong>PLAY_STORE_JSON_KEY</strong> (Value: डाउनलोड की गई JSON फ़ाइल का टेक्स्ट)</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950 flex items-center gap-2 text-xs sm:text-sm">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-xs flex items-center justify-center font-mono">4</span>
                    जादू: ऑटोमैटिक पब्लिश (Automatic Rollout)!
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  अब जैसे ही आप GitHub पर कोड पुश करेंगे या <strong>Actions &gt; "Build &amp; Auto-Deploy" &gt; Run workflow</strong> दबाएंगे, GitHub अपने आप <code>.aab</code> बंडल बनाएगा और उसे आपके <strong>Google Play Console</strong> के Internal Track में सीधे पब्लिश कर देगा!
                </p>
              </div>
            </div>
          </div>

          {/* Quick Details Box */}
          <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 space-y-3">
            <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              आपके ऐप का पैकेज डेटा (Configured App Details):
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Package ID:</span>
                <span className="font-mono font-bold text-slate-800">{packageId}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px]">App Name:</span>
                <span className="font-bold text-slate-800">{appName}</span>
              </div>
            </div>
          </div>

          {/* Alternative 2: PWABuilder direct 1-click */}
          <div className="pt-2 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">
                तरीका 2: यदि सर्विस अकाउंट नहीं बनाना (PWABuilder से 2 मिनट में)
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">
                Zero Setup
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              अगर आप Google Cloud Console में Service Account नहीं बनाना चाहते, तो:
            </p>
            <ol className="text-xs text-slate-700 space-y-1.5 list-decimal list-inside">
              <li>
                <a
                  href="https://www.pwabuilder.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-blue-600 underline inline-flex items-center gap-0.5"
                >
                  pwabuilder.com <ExternalLink className="w-3 h-3" />
                </a> पर जाएं।
              </li>
              <li>
                इस ऐप का URL (<code>{liveUrl}</code>) पेस्ट करें।
              </li>
              <li>
                <strong>"Package for Stores &gt; Google Play"</strong> चुनें और <strong>Download Package</strong> दबाएं।
              </li>
              <li>
                मिली हुई <code>.aab</code> फ़ाइल को सीधे Google Play Console में <strong>Create Release &gt; Upload</strong> कर दें।
              </li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-200 bg-slate-50">
          <span className="text-xs text-slate-500">
            <code>deploy-playstore.yml</code> कार्यप्रवाह फ़ाइल सफलतापूर्वक तैयार है
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            समझ गया (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
