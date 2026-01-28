import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, FileSpreadsheet, LayoutGrid, Terminal, Share2, Lock, BarChart3, Users, TrendingUp, Split, Filter, Home, Search, Table, Grid } from 'lucide-react';
import { SlideStep } from './types';
import { GoldenRuleDemo, OperatorsDemo, ReferenceDemo, AbsoluteReferenceDemo, BasicStatsDemo, CountFamilyDemo, MedianModeDemo, LogicFunctionsDemo, SumifsDemo, LookupsDemo, XLookupDemo, PivotPrepDemo, PivotOpsDemo, PivotChartDemo, TipsTrickDemo } from './components/SlideComponents';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<SlideStep>(SlideStep.INTRO);

  const nextStep = () => {
    if (currentStep < SlideStep.SUMMARY) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > SlideStep.INTRO) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step: SlideStep) => setCurrentStep(step);

  // Total steps for progress bar
  const TOTAL_STEPS = 16; 

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 md:p-8 font-sans text-gray-900">
      
      {/* Header / Top Bar */}
      <header className="w-full max-w-6xl flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
            <div className="bg-excel-base p-2 rounded-lg shadow-lg">
                <FileSpreadsheet className="text-white" size={24} />
            </div>
            <div>
                <h1 className="text-xl font-bold text-gray-800 tracking-tight">Anatomi Formula Excel</h1>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
                    {currentStep <= 9 ? 'Modul 1: Dasar & Logika' : 'Modul 2: Data & Laporan'}
                </p>
            </div>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 hidden md:block">
                {currentStep === 0 ? 'Home' : `Slide ${currentStep} / ${TOTAL_STEPS - 1}`}
            </div>
            {currentStep !== SlideStep.INTRO && (
                <button 
                    onClick={() => goToStep(SlideStep.INTRO)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
                >
                    <Home size={16} />
                    <span className="hidden sm:inline">Back to Home</span>
                </button>
            )}
        </div>
      </header>

      {/* Main Slide Container */}
      <main className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col relative aspect-[16/9] min-h-[600px] md:min-h-[auto]">
        
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-gray-100">
            <div 
                className="h-full bg-excel-base transition-all duration-500 ease-in-out" 
                style={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}
            ></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto excel-scrollbar">
            
            {/* Intro Slide */}
            {currentStep === SlideStep.INTRO && (
                <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in space-y-8">
                    <div className="inline-flex items-center justify-center p-6 bg-green-50 rounded-full mb-2 ring-8 ring-green-50/50">
                        <Terminal size={56} className="text-excel-dark" />
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
                            Training Excel: Basic to Intermediate
                        </h2>
                        <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto mb-6">
                            Kuasai fundamental formula hingga teknik pelaporan data modern.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl text-left">
                        {/* Module 1 */}
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                            <h3 className="text-excel-dark font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="bg-excel-dark text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                                Modul 1: Fundamental & Logika
                            </h3>
                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                <button onClick={() => goToStep(SlideStep.GOLDEN_RULE)} className="hover:text-excel-base hover:underline text-left">• Golden Rule</button>
                                <button onClick={() => goToStep(SlideStep.OPERATORS)} className="hover:text-excel-base hover:underline text-left">• Operator Math</button>
                                <button onClick={() => goToStep(SlideStep.REFERENCES)} className="hover:text-excel-base hover:underline text-left">• Cell References</button>
                                <button onClick={() => goToStep(SlideStep.ABSOLUTE_REFS)} className="hover:text-excel-base hover:underline text-left">• Penguncian ($)</button>
                                <button onClick={() => goToStep(SlideStep.LOGIC_FUNCTIONS)} className="hover:text-excel-base hover:underline text-left">• Logika IF/IFS</button>
                                <button onClick={() => goToStep(SlideStep.SUMIFS)} className="hover:text-excel-base hover:underline text-left">• SUMIFS</button>
                                <button onClick={() => goToStep(SlideStep.BASIC_STATS)} className="hover:text-excel-base hover:underline text-left">• Statistik Dasar</button>
                                <button onClick={() => goToStep(SlideStep.COUNT_FAMILY)} className="hover:text-excel-base hover:underline text-left">• Count Family</button>
                            </div>
                        </div>

                        {/* Module 2 */}
                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                            <h3 className="text-blue-700 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                                Modul 2: Data & Pelaporan
                            </h3>
                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                <button onClick={() => goToStep(SlideStep.LOOKUPS)} className="hover:text-blue-600 hover:underline text-left">• VLOOKUP & HLOOKUP</button>
                                <button onClick={() => goToStep(SlideStep.XLOOKUP)} className="hover:text-blue-600 hover:underline text-left">• XLOOKUP (Modern)</button>
                                <button onClick={() => goToStep(SlideStep.PIVOT_PREP)} className="hover:text-blue-600 hover:underline text-left">• Pivot Preparation</button>
                                <button onClick={() => goToStep(SlideStep.PIVOT_OPS)} className="hover:text-blue-600 hover:underline text-left">• Pivot Operations</button>
                                <button onClick={() => goToStep(SlideStep.PIVOT_CHART)} className="hover:text-blue-600 hover:underline text-left">• Pivot Charts</button>
                                <button onClick={() => goToStep(SlideStep.TIPS_TRICKS)} className="hover:text-blue-600 hover:underline text-left">• Clean Copy-Paste</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- MODUL 1 SLIDES --- */}

            {currentStep === SlideStep.GOLDEN_RULE && (
                <div className="h-full flex flex-col">
                    <div className="mb-6 border-b pb-4">
                        <span className="text-excel-base font-bold text-sm tracking-widest uppercase">Modul 1 - Bagian 1</span>
                        <h2 className="text-3xl font-bold text-gray-900">The Golden Rule (Aturan Emas)</h2>
                    </div>
                    <div className="flex-1">
                        <GoldenRuleDemo />
                    </div>
                </div>
            )}

             {currentStep === SlideStep.OPERATORS && (
                <div className="h-full flex flex-col">
                    <div className="mb-6 border-b pb-4">
                        <span className="text-excel-base font-bold text-sm tracking-widest uppercase">Modul 1 - Bagian 2</span>
                        <h2 className="text-3xl font-bold text-gray-900">Operator Matematika</h2>
                    </div>
                    <div className="flex-1">
                        <OperatorsDemo />
                    </div>
                </div>
            )}

            {currentStep === SlideStep.REFERENCES && (
                <div className="h-full flex flex-col">
                    <div className="mb-6 border-b pb-4">
                        <span className="text-excel-base font-bold text-sm tracking-widest uppercase">Modul 1 - Bagian 3</span>
                        <h2 className="text-3xl font-bold text-gray-900">Referensi Sel (Cell Reference)</h2>
                    </div>
                    <div className="flex-1">
                        <ReferenceDemo />
                    </div>
                </div>
            )}

            {currentStep === SlideStep.ABSOLUTE_REFS && (
                <div className="h-full flex flex-col">
                    <div className="mb-6 border-b pb-4">
                        <span className="text-excel-base font-bold text-sm tracking-widest uppercase">Modul 1 - Bagian 4</span>
                        <h2 className="text-3xl font-bold text-gray-900">Penguncian Sel (Absolute Reference)</h2>
                    </div>
                    <div className="flex-1">
                        <AbsoluteReferenceDemo />
                    </div>
                </div>
            )}

            {currentStep === SlideStep.LOGIC_FUNCTIONS && (
                <div className="h-full flex flex-col">
                    <div className="mb-6 border-b pb-4">
                        <span className="text-excel-base font-bold text-sm tracking-widest uppercase">Modul 1 - Bagian 5</span>
                        <h2 className="text-3xl font-bold text-gray-900">Fungsi Logika (IF & IFS)</h2>
                    </div>
                    <div className="flex-1">
                        <LogicFunctionsDemo />
                    </div>
                </div>
            )}

            {currentStep === SlideStep.SUMIFS && (
                <div className="h-full flex flex-col">
                    <div className="mb-6 border-b pb-4">
                        <span className="text-excel-base font-bold text-sm tracking-widest uppercase">Modul 1 - Bagian 6</span>
                        <h2 className="text-3xl font-bold text-gray-900">Penjumlahan Bersyarat (SUMIFS)</h2>
                    </div>
                    <div className="flex-1">
                        <SumifsDemo />
                    </div>
                </div>
            )}

            {currentStep === SlideStep.BASIC_STATS && (
                <div className="h-full flex flex-col">
                    <div className="mb-6 border-b pb-4">
                        <span className="text-excel-base font-bold text-sm tracking-widest uppercase">Modul 1 - Bagian 7</span>
                        <h2 className="text-3xl font-bold text-gray-900">Statistik Dasar (Min, Max, Average)</h2>
                    </div>
                    <div className="flex-1">
                        <BasicStatsDemo />
                    </div>
                </div>
            )}

            {currentStep === SlideStep.COUNT_FAMILY && (
                <div className="h-full flex flex-col">
                    <div className="mb-6 border-b pb-4">
                        <span className="text-excel-base font-bold text-sm tracking-widest uppercase">Modul 1 - Bagian 8</span>
                        <h2 className="text-3xl font-bold text-gray-900">Menghitung Data (The Count Family)</h2>
                    </div>
                    <div className="flex-1">
                        <CountFamilyDemo />
                    </div>
                </div>
            )}

            {currentStep === SlideStep.MEDIAN_MODE && (
                <div className="h-full flex flex-col">
                    <div className="mb-6 border-b pb-4">
                        <span className="text-excel-base font-bold text-sm tracking-widest uppercase">Modul 1 - Bagian 9</span>
                        <h2 className="text-3xl font-bold text-gray-900">Nilai Tengah (Median) & Modus</h2>
                    </div>
                    <div className="flex-1">
                        <MedianModeDemo />
                    </div>
                </div>
            )}

            {/* --- MODUL 2 SLIDES --- */}

            {currentStep === SlideStep.LOOKUPS && (
                <div className="h-full flex flex-col">
                    <div className="mb-6 border-b pb-4">
                        <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">Modul 2 - Bagian 1</span>
                        <h2 className="text-3xl font-bold text-gray-900">Lookup Series (VLOOKUP & HLOOKUP)</h2>
                    </div>
                    <div className="flex-1">
                        <LookupsDemo />
                    </div>
                </div>
            )}

            {currentStep === SlideStep.XLOOKUP && (
                <div className="h-full flex flex-col">
                    <div className="mb-6 border-b pb-4">
                        <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">Modul 2 - Bagian 2</span>
                        <h2 className="text-3xl font-bold text-gray-900">The Modern Way (XLOOKUP)</h2>
                    </div>
                    <div className="flex-1">
                        <XLookupDemo />
                    </div>
                </div>
            )}

            {currentStep === SlideStep.PIVOT_PREP && (
                <div className="h-full flex flex-col">
                    <div className="mb-6 border-b pb-4">
                        <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">Modul 2 - Bagian 3</span>
                        <h2 className="text-3xl font-bold text-gray-900">Pivot Table (Preparation & Rules)</h2>
                    </div>
                    <div className="flex-1">
                        <PivotPrepDemo />
                    </div>
                </div>
            )}

            {currentStep === SlideStep.PIVOT_OPS && (
                <div className="h-full flex flex-col">
                    <div className="mb-6 border-b pb-4">
                        <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">Modul 2 - Bagian 4</span>
                        <h2 className="text-3xl font-bold text-gray-900">Pivot Operations (Sum vs Count)</h2>
                    </div>
                    <div className="flex-1">
                        <PivotOpsDemo />
                    </div>
                </div>
            )}

             {currentStep === SlideStep.PIVOT_CHART && (
                <div className="h-full flex flex-col">
                    <div className="mb-6 border-b pb-4">
                        <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">Modul 2 - Bagian 5</span>
                        <h2 className="text-3xl font-bold text-gray-900">Pivot Chart & Slicer</h2>
                    </div>
                    <div className="flex-1">
                        <PivotChartDemo />
                    </div>
                </div>
            )}

            {currentStep === SlideStep.TIPS_TRICKS && (
                <div className="h-full flex flex-col">
                    <div className="mb-6 border-b pb-4">
                        <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">Modul 2 - Bonus</span>
                        <h2 className="text-3xl font-bold text-gray-900">Tips: Clean Copy-Paste</h2>
                    </div>
                    <div className="flex-1">
                        <TipsTrickDemo />
                    </div>
                </div>
            )}

        </div>

        {/* Footer Navigation */}
        <div className="bg-gray-50 border-t border-gray-200 p-4 md:px-12 flex justify-between items-center h-20">
            <button 
                onClick={prevStep}
                disabled={currentStep === SlideStep.INTRO}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all ${
                    currentStep === SlideStep.INTRO 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
            >
                <ChevronLeft size={20} />
                Sebelumnya
            </button>

            {/* Dot Navigation */}
            <div className="hidden lg:flex gap-1.5 overflow-hidden max-w-lg px-4">
                {Array.from({ length: TOTAL_STEPS }).map((_, step) => (
                    <div 
                        key={step}
                        className={`w-2 h-2 rounded-full transition-all duration-300 shrink-0 ${
                            currentStep === step 
                            ? (step > 9 ? 'bg-blue-600 scale-125' : 'bg-excel-base scale-125') 
                            : 'bg-gray-300'
                        }`}
                        title={`Slide ${step}`}
                    />
                ))}
            </div>

            <button 
                onClick={nextStep}
                disabled={currentStep === SlideStep.TIPS_TRICKS} // Last slide
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all ${
                    currentStep === SlideStep.TIPS_TRICKS
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-excel-base text-white hover:bg-excel-dark shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
            >
                {currentStep === SlideStep.TIPS_TRICKS ? 'Selesai' : 'Lanjut'}
                <ChevronRight size={20} />
            </button>
        </div>
      </main>
      
      <div className="mt-6 text-gray-400 text-xs text-center">
        Dibuat untuk pelatihan Excel - NOC
      </div>
    </div>
  );
};

export default App;