import React, { useState, useEffect } from 'react';
import { calculateBirthDay } from './utils/wetonCalculator';
import { BirthResult } from './types';

// --- Icons ---
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.288-4.161l-1.591 1.591M3 12H5.25m.386-6.364L7.227 7.227M12 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
  </svg>
);

const FingerPrintIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565m4.382-2.672a9.712 9.712 0 01.309 2.227 15.365 15.365 0 01-.65 4.885M8.25 18a14.25 14.25 0 005.5-2.25" />
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
  </svg>
);

export default function App() {
  const [date, setDate] = useState<string>('');
  const [result, setResult] = useState<BirthResult | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    if (selectedDate) {
      const calcResult = calculateBirthDay(selectedDate);
      setResult(calcResult);
      setCopied(false);
    } else {
      setResult(null);
    }
  };

  const handleCopy = () => {
    if (!result || !result.data) return;
    const text = `
🎉 *Hasil Birth Day Tracker* 🎉
Tanggal: ${result.fullDate}
Weton: ${result.wetonLengkap}
Zodiak: ${result.zodiac}

*Watak:*
${result.data.watak}

*Saran:*
${result.data.saran}
    `.trim();
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      {/* Header */}
      <header className="w-full py-6 px-4 md:px-8 flex justify-between items-center bg-white/80 dark:bg-dark-bg/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
            <FingerPrintIcon />
          </div>
          <h1 className="text-xl md:text-2xl font-heading font-bold tracking-tight text-gray-900 dark:text-white">
            BirthDay<span className="text-primary-500">Tracker</span>
          </h1>
        </div>
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        
        {/* Hero / Input Section */}
        <section className="text-center mb-12 space-y-6 animate-fade-in-up">
          <div className="space-y-3">
            <span className="inline-block py-1 px-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold tracking-wider uppercase">
              Tracking Hari Lahir
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white leading-tight">
              Kapan Kamu <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Lahir?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto text-lg leading-relaxed">
              Cek Hari, Weton Jawa, Zodiak, dan analisa karakter pribadimu dalam satu tempat.
            </p>
          </div>

          <div className="relative group max-w-xs mx-auto mt-8">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-400 to-primary-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-dark-card rounded-2xl p-2 shadow-2xl ring-1 ring-gray-900/5 flex items-center">
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className="w-full bg-transparent border-0 py-3.5 px-4 text-center text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 text-lg font-medium tracking-wide cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* Results Section */}
        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up delay-75">
            
            {/* Card 1: Main Birth Summary */}
            <div className="bg-white dark:bg-dark-card rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500"></div>
              
              <div className="flex items-center gap-2 mb-6">
                <span className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-primary-600 dark:text-primary-400">
                  <FingerPrintIcon />
                </span>
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Profil Kelahiran
                </h3>
              </div>

              <div className="space-y-4 relative z-10">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Kombinasi Hari & Pasaran</p>
                  <p className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white bg-clip-text">
                    {result.wetonLengkap}
                  </p>
                </div>
                <div>
                   <p className="text-lg font-medium text-primary-600 dark:text-primary-400">
                    {result.fullDate}
                  </p>
                </div>
                <div className="flex gap-3 flex-wrap pt-2">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold text-sm border border-gray-200 dark:border-gray-700">
                    <SparklesIcon /> {result.zodiac}
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold text-sm border border-primary-100 dark:border-primary-800">
                    {result.dayName}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Age Calculator (Modern) */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-6 md:p-8 shadow-xl text-white relative overflow-hidden">
               <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mb-16"></div>
               
               <div className="relative z-10 h-full flex flex-col justify-between">
                 <div>
                    <h3 className="text-primary-100 font-medium mb-1">Usia Kamu Saat Ini</h3>
                    <p className="text-3xl font-heading font-bold mb-6">Perjalanan Waktu</p>
                 </div>

                 <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3">
                      <span className="block text-2xl font-bold">{result.age.years}</span>
                      <span className="text-xs text-primary-100 uppercase tracking-wider">Tahun</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3">
                      <span className="block text-2xl font-bold">{result.age.months}</span>
                      <span className="text-xs text-primary-100 uppercase tracking-wider">Bulan</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3">
                      <span className="block text-2xl font-bold">{result.age.days}</span>
                      <span className="text-xs text-primary-100 uppercase tracking-wider">Hari</span>
                    </div>
                 </div>
               </div>
            </div>

            {/* Card 3: Analysis (Traditional Weton Data) */}
            {result.data && (
              <div className="md:col-span-2 bg-white dark:bg-dark-card rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700/50">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-primary-600 dark:text-primary-400">
                      <SparklesIcon />
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      Watak & Karakter (Ilmu Titen)
                    </h3>
                  </div>
                  <button 
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {copied ? (
                      <span className="text-green-500">Tersalin!</span>
                    ) : (
                      <>
                        <CopyIcon /> Salin Hasil
                      </>
                    )}
                  </button>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
                    Kepribadian {result.wetonLengkap}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify mb-6">
                    {result.data.watak}
                  </p>

                  {result.data.saran && (
                    <div className="bg-primary-50 dark:bg-primary-900/10 rounded-2xl p-5 border border-primary-100 dark:border-primary-800/30">
                      <h4 className="font-heading text-md font-semibold text-primary-700 dark:text-primary-400 mb-2 flex items-center gap-2">
                        💡 Saran & Nasihat
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed italic">
                        "{result.data.saran}"
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mt-8 text-center border-t border-gray-100 dark:border-gray-800 pt-6">
                  <p className="text-xs text-gray-400 dark:text-gray-600">
                    *Analisa ini berdasarkan ilmu titen (tanda alam) warisan leluhur, bukan ramalan mutlak.
                  </p>
                </div>
              </div>
            )}

          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 mt-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-500">
          © {new Date().getFullYear()} BirthDay Tracker. Explore your journey.
        </p>
      </footer>
    </div>
  );
}