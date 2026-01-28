import React, { useState, useEffect } from 'react';
import { Calculator, AlertCircle, ArrowRight, XCircle, CheckCircle2, Lock, Unlock, Copy, MousePointerClick, AlertTriangle, Split, Filter, Search, LayoutDashboard, Eye, EyeOff, Grid, Settings, HelpCircle, Columns, Rows } from 'lucide-react';
import { Cell, FormulaBar, ExcelWindow } from './ExcelUI';

// --- SLIDE 1: GOLDEN RULE ---
export const GoldenRuleDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<string | number>("");
  const [status, setStatus] = useState<'idle' | 'text' | 'formula'>('idle');

  useEffect(() => {
    if (!inputValue) {
      setResult("");
      setStatus('idle');
      return;
    }
    if (inputValue.startsWith('=')) {
      setStatus('formula');
      try {
        const mathPart = inputValue.substring(1);
        // Ensure the string only contains valid characters to avoid unsafe eval
        if (/^[0-9+\-*/().\s]+$/.test(mathPart)) {
             // eslint-disable-next-line no-new-func
            const safeEval = new Function(`return ${mathPart}`);
            setResult(safeEval());
        } else {
            setResult("Error");
        }
      } catch (e) {
        setResult("...");
      }
    } else {
      setStatus('text');
      setResult(inputValue);
    }
  }, [inputValue]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-excel-base">
          <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <AlertCircle className="text-excel-base" />
            The Golden Rule
          </h3>
          <p className="text-gray-600 mb-4">
            Setiap rumus <span className="font-bold text-red-600">WAJIB</span> dimulai dengan tanda sama dengan <span className="font-mono bg-gray-100 px-1 rounded text-excel-dark font-bold text-lg">(=)</span>.
          </p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="flex gap-2 items-center">
              <XCircle size={16} className="text-red-500" />
              <span>Tanpa =, Excel menganggap teks biasa.</span>
            </li>
            <li className="flex gap-2 items-center">
              <CheckCircle2 size={16} className="text-green-500" />
              <span>Dengan =, Excel menghitung hasilnya.</span>
            </li>
          </ul>
        </div>
        
        <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm border border-blue-100">
          <p className="font-semibold mb-1">Coba Ketik:</p>
          <div className="flex gap-2">
             <button onClick={() => setInputValue("10 + 5")} className="px-3 py-1 bg-white border border-blue-200 rounded hover:bg-blue-100">10 + 5</button>
             <button onClick={() => setInputValue("=10 + 5")} className="px-3 py-1 bg-white border border-blue-200 rounded hover:bg-blue-100">=10 + 5</button>
          </div>
        </div>
      </div>

      <ExcelWindow title="Demo Golden Rule">
        <FormulaBar value={inputValue} />
        <div className="grid grid-cols-[40px_1fr] gap-0 border-t border-l border-gray-300 bg-white">
          <Cell value="" isHeader label="" />
          <Cell value="" isHeader label="A" />
          
          <Cell value="1" isHeader label="1" />
          <Cell 
            value={status === 'formula' ? result : inputValue} 
            isSelected={true} 
            onChange={setInputValue}
            readOnly={false}
            align="right"
          />
        </div>
        <div className="mt-4 text-sm text-center">
            {status === 'text' && <span className="text-gray-500 italic">Excel menganggap ini teks karena tidak ada '='</span>}
            {status === 'formula' && <span className="text-excel-dark font-bold">Berhasil! Excel menghitung rumusnya.</span>}
            {status === 'idle' && <span className="text-gray-400">Ketik di sel A1...</span>}
        </div>
      </ExcelWindow>
    </div>
  );
};

// --- SLIDE 2: OPERATORS ---
export const OperatorsDemo: React.FC = () => {
  const operators = [
    { symbol: '+', name: 'Tambah', desc: 'Penjumlahan', example: '=5 + 5', res: '10' },
    { symbol: '-', name: 'Kurang', desc: 'Pengurangan', example: '=10 - 4', res: '6' },
    { symbol: '*', name: 'Kali', desc: 'Bintang, bukan huruf x', example: '=5 * 4', res: '20' },
    { symbol: '/', name: 'Bagi', desc: 'Garis miring, bukan titik dua', example: '=20 / 2', res: '10' },
    { symbol: '^', name: 'Pangkat', desc: 'Perpangkatan', example: '=2 ^ 3', res: '8' },
  ];

  return (
    <div className="h-full flex flex-col justify-center">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Operator Matematika Dasar</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {operators.map((op, idx) => (
          <div key={idx} className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-excel-base transition-all duration-300 overflow-hidden">
            <div className="h-24 bg-gradient-to-br from-green-50 to-white flex items-center justify-center border-b border-gray-100">
              <span className="text-5xl font-mono text-excel-dark font-bold group-hover:scale-110 transition-transform">{op.symbol}</span>
            </div>
            <div className="p-4 text-center">
              <h4 className="font-bold text-gray-800 mb-1">{op.name}</h4>
              <p className="text-xs text-gray-500 mb-3 h-8">{op.desc}</p>
              <div className="bg-gray-100 rounded px-2 py-1 text-xs font-mono text-gray-600">
                {op.example} <ArrowRight size={10} className="inline mx-1" /> {op.res}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-sm text-gray-500 bg-yellow-50 p-3 rounded-lg border border-yellow-200 inline-block mx-auto">
        <span className="font-bold text-yellow-700">Tips:</span> Gunakan Numpad di keyboard Anda untuk akses cepat ke simbol-simbol ini.
      </div>
    </div>
  );
};

// --- SLIDE 3: CELL REFERENCE ---
export const ReferenceDemo: React.FC = () => {
  const [valA1, setValA1] = useState(100);
  const [valB1, setValB1] = useState(500);
  const [hardcodedResult] = useState(600);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="space-y-4">
        <div className="bg-red-50 p-5 rounded-xl border border-red-100 relative">
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">SALAH (Hardcode)</div>
            <h4 className="font-bold text-red-800 mb-2">Mengetik Angka Langsung</h4>
            <p className="text-sm text-red-700 mb-4">Jika data sumber berubah, hasil <span className="font-bold">TIDAK</span> ikut berubah.</p>
            
            <div className="bg-white border border-gray-300 rounded overflow-hidden">
                <FormulaBar value="=100 + 500" label="C1" />
                <div className="grid grid-cols-[30px_1fr_1fr_1fr] text-sm">
                    <div className="bg-gray-100 border-r border-b text-center text-xs p-1"></div>
                    <div className="bg-gray-100 border-r border-b text-center font-bold p-1">A</div>
                    <div className="bg-gray-100 border-r border-b text-center font-bold p-1">B</div>
                    <div className="bg-gray-100 border-b text-center font-bold p-1 bg-yellow-100">C</div>
                    
                    <div className="bg-gray-100 border-r border-b text-center font-bold p-1">1</div>
                    <div className="border-r border-b p-2 text-right text-gray-400">100</div>
                    <div className="border-r border-b p-2 text-right text-gray-400">500</div>
                    <div className="border-b p-2 text-right font-bold bg-yellow-50">{hardcodedResult}</div>
                </div>
            </div>
            <div className="mt-2 text-xs text-red-600 text-center">
                Meskipun A1 diganti menjadi 200, C1 tetap 600.
            </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-green-50 p-5 rounded-xl border border-green-100 shadow-md relative">
            <div className="absolute top-0 right-0 bg-excel-base text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">BENAR (Referensi)</div>
            <h4 className="font-bold text-excel-dark mb-2">Menggunakan Referensi Sel</h4>
            <p className="text-sm text-green-800 mb-4">Jika data A1/B1 berubah, hasil <span className="font-bold">OTOMATIS</span> berubah (Dinamis).</p>
            
            <div className="bg-white border border-gray-300 rounded overflow-hidden">
                <FormulaBar value="=A1 + B1" label="C1" />
                <div className="grid grid-cols-[30px_1fr_1fr_1fr] text-sm">
                    <div className="bg-gray-100 border-r border-b text-center text-xs p-1"></div>
                    <div className="bg-gray-100 border-r border-b text-center font-bold p-1">A</div>
                    <div className="bg-gray-100 border-r border-b text-center font-bold p-1">B</div>
                    <div className="bg-gray-100 border-b text-center font-bold p-1 bg-excel-light">C</div>
                    
                    <div className="bg-gray-100 border-r border-b text-center font-bold p-1">1</div>
                    <div className="border-r border-b bg-white p-0">
                        <input 
                            type="number" 
                            value={valA1} 
                            onChange={(e) => setValA1(Number(e.target.value))}
                            className="w-full h-full p-2 text-right outline-none hover:bg-gray-50 focus:bg-blue-50 focus:ring-2 ring-blue-400 z-10 relative"
                        />
                    </div>
                    <div className="border-r border-b bg-white p-0">
                         <input 
                            type="number" 
                            value={valB1} 
                            onChange={(e) => setValB1(Number(e.target.value))}
                            className="w-full h-full p-2 text-right outline-none hover:bg-gray-50 focus:bg-blue-50 focus:ring-2 ring-blue-400 z-10 relative"
                        />
                    </div>
                    <div className="border-b p-2 text-right font-bold bg-excel-light text-excel-dark transition-all duration-300">
                        {valA1 + valB1}
                    </div>
                </div>
            </div>
             <div className="mt-2 text-xs text-excel-dark text-center">
                <Calculator size={12} className="inline mr-1" />
                Coba ubah angka di kolom A atau B!
            </div>
        </div>
      </div>
    </div>
  );
};

// --- SLIDE 4: ABSOLUTE REFERENCE ---
export const AbsoluteReferenceDemo: React.FC = () => {
  type LockMode = 'relative' | 'absolute' | 'row';
  const [lockMode, setLockMode] = useState<LockMode>('absolute');
  const [isCopied, setIsCopied] = useState(false);

  const taxRate = 10; // 10%
  const data = [
    { item: 'Baju', price: 1000 },
    { item: 'Celana', price: 2000 },
    { item: 'Topi', price: 3000 },
  ];

  const handleModeChange = (mode: LockMode) => {
    setLockMode(mode);
    setIsCopied(false); 
  };

  const handleCopy = () => {
    setIsCopied(true);
  };

  const getFormulaRef = (rowOffset: number) => {
    if (lockMode === 'absolute') return '$E$1';
    if (lockMode === 'row') return 'E$1';
    // Relative: Moves down with offset
    return `E${1 + rowOffset}`;
  };

  const getResult = (price: number, rowOffset: number) => {
    if (lockMode === 'absolute' || lockMode === 'row') {
        return price * (taxRate / 100);
    }
    if (rowOffset === 0) return price * (taxRate / 100);
    return 0;
  };

  const renderResultWithFormula = (price: number, rowIdx: number, rowOffset: number) => {
      if (!isCopied) return "";
      
      const result = getResult(price, rowOffset);
      const formulaPart = `=B${rowIdx}*${getFormulaRef(rowOffset)}`;
      const isValid = result > 0;

      return (
          <div className="flex flex-col items-end leading-none">
              <span className={isValid ? "text-gray-800" : "text-red-500 font-bold"}>{result}</span>
              <span className="text-[10px] text-gray-500 font-mono mt-0.5">{formulaPart}</span>
          </div>
      );
  };

  // Explanation for Row 3 specifically (The Second Item)
  const getRow3Explanation = () => {
      if (lockMode === 'relative') {
          return {
              title: "BAHAYA! (Mode Relatif)",
              formula: "= B3 * E2",
              desc: "Rumus referensi E1 turun menjadi E2.",
              result: "Karena E2 kosong, maka 2000 * 0 = 0",
              color: "text-red-600 bg-red-50 border-red-200"
          }
      } else if (lockMode === 'absolute') {
           return {
              title: "AMAN (Mode Absolut)",
              formula: "= B3 * $E$1",
              desc: "Referensi $E$1 terkunci total. Tidak bergerak.",
              result: "2000 * 10% = 200",
              color: "text-green-600 bg-green-50 border-green-200"
          }
      } else {
           return {
              title: "AMAN (Mode Kunci Baris)",
              formula: "= B3 * E$1",
              desc: "Baris 1 dikunci ($1). Jadi E$1 tidak turun ke E2.",
              result: "2000 * 10% = 200",
              color: "text-blue-600 bg-blue-50 border-blue-200"
          }
      }
  }
  const row3Expl = getRow3Explanation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Pilih Jenis Penguncian</h3>
          <p className="text-sm text-gray-600 mb-4">
              Klik salah satu kotak di bawah ini untuk melihat efeknya saat rumus dicopy ke bawah.
          </p>

          <div className="grid grid-cols-3 gap-3">
             <button 
                onClick={() => handleModeChange('relative')}
                className={`p-3 rounded border text-center transition-all duration-200 hover:shadow-md ${lockMode === 'relative' ? 'bg-red-50 border-red-400 ring-2 ring-red-400 ring-offset-1' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
             >
                <div className={`font-mono font-bold mb-1 ${lockMode === 'relative' ? 'text-red-700' : 'text-gray-800'}`}>A1</div>
                <div className="text-xs text-gray-500">Bebas Bergerak</div>
                <Unlock size={16} className={`mx-auto mt-2 ${lockMode === 'relative' ? 'text-red-500' : 'text-gray-400'}`} />
             </button>

             <button 
                onClick={() => handleModeChange('absolute')}
                className={`p-3 rounded border text-center transition-all duration-200 hover:shadow-md ${lockMode === 'absolute' ? 'bg-excel-light border-excel-base ring-2 ring-excel-base ring-offset-1' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
             >
                <div className={`font-mono font-bold mb-1 ${lockMode === 'absolute' ? 'text-excel-dark' : 'text-gray-800'}`}>$A$1</div>
                <div className="text-xs font-semibold text-gray-600">Terkunci Total</div>
                <Lock size={16} className={`mx-auto mt-2 ${lockMode === 'absolute' ? 'text-excel-dark' : 'text-gray-400'}`} />
             </button>

             <button 
                onClick={() => handleModeChange('row')}
                className={`p-3 rounded border text-center transition-all duration-200 hover:shadow-md ${lockMode === 'row' ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-400 ring-offset-1' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
             >
                <div className={`font-mono font-bold mb-1 ${lockMode === 'row' ? 'text-blue-700' : 'text-gray-800'}`}>A$1</div>
                <div className="text-xs text-gray-500">Kunci Baris</div>
                <div className="flex justify-center mt-2 gap-0.5">
                   <Unlock size={14} className="text-gray-400" />
                   <Lock size={14} className={`text-gray-800 ${lockMode === 'row' ? 'text-blue-600' : ''}`} />
                </div>
             </button>
          </div>
        </div>
        
        {/* Dynamic Visualization for C3 */}
        {isCopied && (
            <div className={`p-4 rounded-xl border animate-fade-in shadow-sm ${row3Expl.color}`}>
                <h4 className="font-bold flex items-center gap-2 mb-2">
                    <Search size={16} /> Analisis Baris ke-2 (Sel C3)
                </h4>
                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                    <span className="font-bold">Rumus:</span>
                    <span className="font-mono">{row3Expl.formula}</span>
                    
                    <span className="font-bold">Logika:</span>
                    <span>{row3Expl.desc}</span>

                    <span className="font-bold">Hasil:</span>
                    <span className="font-bold">{row3Expl.result}</span>
                </div>
            </div>
        )}

      </div>

      <div className="flex flex-col h-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
         <div className="bg-gray-100 border-b p-3 flex justify-between items-center">
             <div className="flex items-center gap-2 text-xs text-gray-500">
                <MousePointerClick size={14} />
                <span>Pilih jenis kunci di panel kiri</span>
             </div>
             <button 
                onClick={handleCopy}
                disabled={isCopied}
                className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 shadow-sm transition-all ${
                    isCopied 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow hover:-translate-y-0.5'
                }`}
             >
                <Copy size={14} />
                {isCopied ? 'Sudah Dicopy' : 'Copy Rumus ke Bawah'}
             </button>
         </div>

         <div className="flex-1 p-4 bg-gray-50 overflow-auto">
            <ExcelWindow title="Studi Kasus: Hitung Diskon">
                <div className="mb-2 text-xs font-mono bg-yellow-50 p-2 border border-yellow-200 text-yellow-800 rounded flex justify-between items-center">
                    <span>Rumus Awal (C2): <b>= B2 * {getFormulaRef(0)}</b></span>
                    <span className="bg-white px-2 py-0.5 rounded border border-yellow-300 text-[10px] text-gray-500">Tekan F4 untuk ubah</span>
                </div>

                <div className="grid grid-cols-[30px_1fr_1fr_1fr_40px_1fr] text-sm">
                    <Cell value="" isHeader />
                    <Cell value="A" isHeader />
                    <Cell value="B" isHeader />
                    <Cell value="C (Diskon)" isHeader className="bg-blue-50" />
                    <Cell value="D" isHeader />
                    <Cell value="E" isHeader />

                    <Cell value="1" isHeader />
                    <Cell value="Item" className="font-bold bg-gray-50" />
                    <Cell value="Harga" className="font-bold bg-gray-50" />
                    <Cell value="" className="bg-gray-50" />
                    <Cell value="Diskon" className="bg-gray-50 font-bold text-gray-600 text-right pr-2" />
                    <Cell value="10%" isSelected={true} className={`font-bold text-center transition-colors duration-300 ${
                        lockMode === 'relative' ? 'bg-red-50 ring-2 ring-red-400' : 
                        lockMode === 'absolute' ? 'bg-green-50 ring-2 ring-excel-base' : 
                        'bg-blue-50 ring-2 ring-blue-400'
                    }`} />

                    <Cell value="2" isHeader />
                    <Cell value={data[0].item} />
                    <Cell value={data[0].price} />
                    <Cell value={data[0].price * (taxRate/100)} className="font-mono font-bold text-blue-700 bg-blue-50" />
                    <Cell value="" />
                    <Cell value="" className={`${isCopied && lockMode === 'relative' ? 'bg-red-100 ring-2 ring-red-400 z-20' : ''}`} />

                    <Cell value="3" isHeader />
                    <Cell value={data[1].item} />
                    <Cell value={data[1].price} />
                    <Cell 
                        value={renderResultWithFormula(data[1].price, 3, 1)} 
                        className={`font-mono transition-all duration-500 ${
                            isCopied 
                            ? (lockMode === 'relative' ? 'bg-red-100' : 'bg-green-50 font-bold') 
                            : ''
                        }`} 
                    />
                    <Cell value="" />
                    <Cell value="" className={`${isCopied && lockMode === 'relative' ? 'bg-red-100 ring-2 ring-red-400 z-20' : ''}`} />

                    <Cell value="4" isHeader />
                    <Cell value={data[2].item} />
                    <Cell value={data[2].price} />
                    <Cell 
                         value={renderResultWithFormula(data[2].price, 4, 2)}
                         className={`font-mono transition-all duration-500 ${
                            isCopied 
                            ? (lockMode === 'relative' ? 'bg-red-100' : 'bg-green-50 font-bold') 
                            : ''
                        }`} 
                    />
                    <Cell value="" />
                    <Cell value="" />
                </div>
            </ExcelWindow>
         </div>
      </div>
    </div>
  );
};

// --- SLIDE 5: LOGIC FUNCTIONS (IF & IFS) ---
export const LogicFunctionsDemo: React.FC = () => {
    const [score, setScore] = useState(75);
    const [activeTab, setActiveTab] = useState<'IF' | 'IFS'>('IF');
    
    // IF Logic
    const ifResult = score >= 70 ? "Lulus" : "Gagal";
    const ifFormula = `=IF(B2>=70, "Lulus", "Gagal")`;

    // IFS Logic
    const getIfsResult = (s: number) => {
        if (s >= 90) return "A";
        if (s >= 80) return "B";
        if (s >= 70) return "C";
        return "D";
    };
    const ifsResult = getIfsResult(score);
    const ifsFormula = `=IFS(B2>=90,"A", B2>=80,"B", B2>=70,"C", TRUE,"D")`;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            <div className="space-y-6">
                 <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Split className="text-yellow-600" />
                        Fungsi Logika (IF & IFS)
                    </h3>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-4 border-b">
                        <button 
                            onClick={() => setActiveTab('IF')}
                            className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'IF' ? 'border-blue-500 text-blue-700' : 'border-transparent text-gray-500'}`}
                        >
                            IF (Satu Syarat)
                        </button>
                        <button 
                            onClick={() => setActiveTab('IFS')}
                            className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'IFS' ? 'border-purple-500 text-purple-700' : 'border-transparent text-gray-500'}`}
                        >
                            IFS (Banyak Syarat)
                        </button>
                    </div>
                    
                    <div className="space-y-4">
                        {activeTab === 'IF' && (
                             <div className="bg-blue-50 p-4 rounded border border-blue-200 animate-fade-in">
                                <h4 className="font-bold text-blue-800 text-sm mb-2">IF (Tunggal) - Keputusan Biner</h4>
                                <code className="text-xs bg-white px-2 py-1 rounded block mb-2 border border-blue-100 text-blue-900 font-mono">
                                    =IF(Syarat, "Jika Benar", "Jika Salah")
                                </code>
                                <p className="text-xs text-blue-700 mb-2">Digunakan untuk memilih 1 dari 2 kemungkinan.</p>
                                <div className="bg-white p-2 rounded text-xs text-gray-600 border border-blue-100">
                                    <b>Contoh:</b><br/>
                                    Jika Nilai {'>='} 70 maka "Lulus".<br/>
                                    Jika Tidak (kurang dari 70) maka "Gagal".
                                </div>
                            </div>
                        )}

                        {activeTab === 'IFS' && (
                             <div className="bg-purple-50 p-4 rounded border border-purple-200 animate-fade-in">
                                <h4 className="font-bold text-purple-800 text-sm mb-2">IFS (Majemuk) - Grading Nilai</h4>
                                <code className="text-xs bg-white px-2 py-1 rounded block mb-2 border border-purple-100 text-purple-900 font-mono break-all whitespace-normal">
                                    =IFS(Syarat1, Hasil1, Syarat2, Hasil2, ...)
                                </code>
                                <p className="text-xs text-purple-700 mb-2">Fitur baru (Excel 2019+). Lebih rapi daripada IF bertumpuk. Excel membaca dari kiri ke kanan dan berhenti saat syarat terpenuhi.</p>
                                <div className="bg-white p-2 rounded text-xs text-gray-600 border border-purple-100">
                                    <b>Syarat Nilai:</b>
                                    <ul className="list-disc list-inside mt-1">
                                        <li>{'>='} 90 = A</li>
                                        <li>{'>='} 80 = B</li>
                                        <li>{'>='} 70 = C</li>
                                        <li>Sisa = D</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                 </div>

                 <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <label className="text-sm font-bold text-gray-700 block mb-2">Ubah Skor Siswa:</label>
                    <div className="flex items-center gap-4">
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={score} 
                            onChange={(e) => setScore(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-excel-base"
                        />
                        <div className="w-12 h-10 flex items-center justify-center bg-white border font-bold rounded text-lg">
                            {score}
                        </div>
                    </div>
                 </div>
            </div>

            <ExcelWindow title={activeTab === 'IF' ? "Status Kelulusan (IF)" : "Grading Nilai (IFS)"}>
                <FormulaBar 
                    value={activeTab === 'IF' ? ifFormula : ifsFormula} 
                    label="D2" 
                    wrapText={activeTab === 'IFS'} 
                />
                
                <div className="grid grid-cols-[30px_1fr_60px_1fr] text-sm">
                    <Cell value="" isHeader />
                    <Cell value="A (Nama)" isHeader />
                    <Cell value="B (Skor)" isHeader />
                    <Cell value={activeTab === 'IF' ? "C (Status)" : "D (Grade)"} isHeader className={activeTab === 'IF' ? "bg-blue-50" : "bg-purple-50"} />

                    <Cell value="1" isHeader />
                    <Cell value="Budi Santoso" />
                    <Cell value={score} isSelected={true} className="font-bold text-center" />
                    
                    {activeTab === 'IF' ? (
                        <Cell 
                            value={
                                <div className="flex flex-col items-center">
                                    <span className={ifResult === 'Lulus' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{ifResult}</span>
                                    <span className="text-[9px] text-gray-400 mt-0.5 hidden md:block text-center">=IF(B2&gt;70,...)</span>
                                </div>
                            } 
                            className="bg-blue-50/50"
                        />
                    ) : (
                         <Cell 
                             value={
                                <div className="flex flex-col items-center">
                                    <span className={`font-bold w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                                        ifsResult === 'A' ? 'bg-green-500' :
                                        ifsResult === 'B' ? 'bg-blue-500' :
                                        ifsResult === 'C' ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}>{ifsResult}</span>
                                </div>
                            } 
                            className="bg-purple-50/50"
                        />
                    )}
                </div>
                
                <div className="mt-4">
                    {activeTab === 'IF' ? (
                         <div className="bg-blue-100 p-2 rounded text-xs text-blue-800 animate-fade-in">
                            <b>Analisa IF:</b><br/>
                            Apakah {score} &gt;= 70? <br/>
                            {score >= 70 ? "YA -> Masuk ke 'Lulus'" : "TIDAK -> Masuk ke 'Gagal'"}
                        </div>
                    ) : (
                         <div className="bg-purple-100 p-2 rounded text-xs text-purple-800 animate-fade-in">
                             <b>Analisa IFS:</b><br/>
                             {score >= 90 ? "Cek 1: >=90? YA -> A (Stop)" : 
                              score >= 80 ? "Cek 1: >=90? NO -> Cek 2: >=80? YA -> B" :
                              score >= 70 ? "Cek 1,2 NO -> Cek 3: >=70? YA -> C" : "Semua syarat gagal -> D"}
                        </div>
                    )}
                </div>
            </ExcelWindow>
        </div>
    )
}

// --- SLIDE 6: SUMIFS ---
export const SumifsDemo: React.FC = () => {
  const [region, setRegion] = useState("All");
  const data = [
    { item: "Laptop", region: "Jkt", sales: 10 },
    { item: "Mouse", region: "Jkt", sales: 5 },
    { item: "Laptop", region: "Bdg", sales: 8 },
    { item: "Mouse", region: "Bdg", sales: 2 },
  ];

  const filteredSales = region === "All" 
    ? data 
    : data.filter(d => d.region === region);
    
  const totalSales = filteredSales.reduce((acc, cur) => acc + cur.sales, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Penjumlahan Bersyarat</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Gunakan <b>SUMIF</b> untuk satu kriteria, dan <b>SUMIFS</b> untuk banyak kriteria.
                </p>
                <div className="flex gap-2">
                     <button onClick={() => setRegion("All")} className={`px-3 py-1 rounded border ${region === "All" ? "bg-excel-base text-white" : "bg-gray-50"}`}>All (Total)</button>
                     <button onClick={() => setRegion("Jkt")} className={`px-3 py-1 rounded border ${region === "Jkt" ? "bg-excel-base text-white" : "bg-gray-50"}`}>Jakarta Only</button>
                     <button onClick={() => setRegion("Bdg")} className={`px-3 py-1 rounded border ${region === "Bdg" ? "bg-excel-base text-white" : "bg-gray-50"}`}>Bandung Only</button>
                </div>
            </div>
        </div>
        <ExcelWindow title="Laporan Penjualan">
             <FormulaBar 
                value={region === "All" ? "=SUM(C2:C5)" : `=SUMIF(B2:B5, "${region}", C2:C5)`} 
                label="Result" 
            />
            <div className="grid grid-cols-[30px_1fr_1fr_1fr] text-sm">
                <Cell value="" isHeader />
                <Cell value="A (Item)" isHeader />
                <Cell value="B (Region)" isHeader />
                <Cell value="C (Sales)" isHeader />

                {data.map((row, idx) => (
                    <React.Fragment key={idx}>
                        <Cell value={idx + 2} isHeader />
                        <Cell value={row.item} />
                        <Cell value={row.region} className={region === row.region ? "bg-yellow-100 font-bold" : ""} />
                        <Cell value={row.sales} className={region === row.region || region === "All" ? "bg-green-50 font-bold" : "text-gray-400"} />
                    </React.Fragment>
                ))}
                
                <Cell value="" isHeader />
                <Cell value="TOTAL" className="font-bold col-span-2 text-right pr-2" />
                <Cell value={totalSales} className="font-bold bg-excel-light text-excel-dark border-t-2 border-excel-dark" />
            </div>
        </ExcelWindow>
    </div>
  );
};

// --- SLIDE 7: BASIC STATS ---
export const BasicStatsDemo: React.FC = () => {
    const numbers = [10, 50, 80, 20, 90, 30];
    const [func, setFunc] = useState("AVERAGE");
    
    const getResult = () => {
        if (func === "MAX") return Math.max(...numbers);
        if (func === "MIN") return Math.min(...numbers);
        return numbers.reduce((a,b) => a+b, 0) / numbers.length;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Statistik Dasar</h3>
                     <div className="grid grid-cols-1 gap-2">
                        <button onClick={() => setFunc("AVERAGE")} className={`p-3 rounded border text-left ${func === "AVERAGE" ? "bg-blue-50 border-blue-500" : ""}`}>
                            <div className="font-bold">AVERAGE</div>
                            <div className="text-xs text-gray-500">Rata-rata (Jumlah / Total Data)</div>
                        </button>
                        <button onClick={() => setFunc("MAX")} className={`p-3 rounded border text-left ${func === "MAX" ? "bg-green-50 border-green-500" : ""}`}>
                            <div className="font-bold">MAX</div>
                            <div className="text-xs text-gray-500">Nilai Tertinggi</div>
                        </button>
                        <button onClick={() => setFunc("MIN")} className={`p-3 rounded border text-left ${func === "MIN" ? "bg-red-50 border-red-500" : ""}`}>
                            <div className="font-bold">MIN</div>
                            <div className="text-xs text-gray-500">Nilai Terendah</div>
                        </button>
                    </div>
                </div>
            </div>
            <ExcelWindow title="Analisa Nilai">
                <FormulaBar value={`=${func}(A1:A6)`} label="Result" />
                <div className="grid grid-cols-[30px_1fr] text-sm w-1/2">
                    <Cell value="" isHeader />
                    <Cell value="A (Data)" isHeader />
                    
                    {numbers.map((n, i) => (
                        <React.Fragment key={i}>
                            <Cell value={i+1} isHeader />
                            <Cell 
                                value={n} 
                                className={`text-center ${
                                    (func === "MAX" && n === Math.max(...numbers)) ? "bg-green-200 font-bold" :
                                    (func === "MIN" && n === Math.min(...numbers)) ? "bg-red-200 font-bold" : ""
                                }`} 
                            />
                        </React.Fragment>
                    ))}
                </div>
                <div className="mt-4 text-center">
                    <div className="text-sm text-gray-500">Hasil {func}:</div>
                    <div className="text-3xl font-bold text-gray-800">{getResult()}</div>
                </div>
            </ExcelWindow>
        </div>
    );
};

// --- SLIDE 8: COUNT FAMILY ---
export const CountFamilyDemo: React.FC = () => {
    // Data: Number, Text, Blank, Number
    const dataDisplay = [
        { val: 100, type: 'number' },
        { val: "Absen", type: 'text' },
        { val: "", type: 'blank' },
        { val: 50, type: 'number' }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            <div className="space-y-4">
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <h4 className="font-bold text-excel-dark mb-2">COUNT</h4>
                    <p className="text-xs text-gray-600">Hanya menghitung sel berisi <b>ANGKA</b>.</p>
                    <div className="mt-2 text-right font-bold text-xl">2</div>
                 </div>
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <h4 className="font-bold text-blue-600 mb-2">COUNTA</h4>
                    <p className="text-xs text-gray-600">Menghitung sel <b>TIDAK KOSONG</b> (Angka & Teks).</p>
                    <div className="mt-2 text-right font-bold text-xl">3</div>
                 </div>
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <h4 className="font-bold text-gray-500 mb-2">COUNTBLANK</h4>
                    <p className="text-xs text-gray-600">Menghitung sel <b>KOSONG</b>.</p>
                    <div className="mt-2 text-right font-bold text-xl">1</div>
                 </div>
            </div>
            <ExcelWindow title="Absensi Data">
                <div className="grid grid-cols-[30px_1fr] text-sm w-full">
                     <Cell value="" isHeader />
                     <Cell value="A" isHeader />
                     
                     {dataDisplay.map((d, i) => (
                         <React.Fragment key={i}>
                             <Cell value={i+1} isHeader />
                             <Cell value={d.val} className={d.type === 'blank' ? "bg-gray-100" : ""} />
                         </React.Fragment>
                     ))}
                </div>
            </ExcelWindow>
        </div>
    );
};

// --- SLIDE 9: MEDIAN MODE ---
export const MedianModeDemo: React.FC = () => {
    const data = [10, 10, 10, 20, 1000]; // 1000 is outlier
    
    const avg = data.reduce((a,b)=>a+b,0)/data.length; // 210
    const median = 10; // Middle value sorted: 10, 10, 10, 20, 1000 -> 10
    const mode = 10; // Most frequent

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
                <div>
                    <h3 className="font-bold text-red-600 flex items-center gap-2"><AlertTriangle size={18}/> Hati-hati dengan Rata-rata!</h3>
                    <p className="text-sm text-gray-600 mt-2">
                        Jika ada data pencilan (outlier) yang ekstrim (misal: 1000), rata-rata akan bias menjadi sangat tinggi ({avg}).
                    </p>
                </div>
                <div className="bg-green-50 p-4 rounded border border-green-200">
                    <h4 className="font-bold text-green-800">Solusi: MEDIAN</h4>
                    <p className="text-sm text-green-700">
                        Nilai tengah ({median}) lebih mewakili data mayoritas.
                    </p>
                </div>
             </div>
             
             <ExcelWindow title="Gaji Karyawan (Ribuan)">
                <div className="grid grid-cols-[30px_1fr] text-sm">
                    <Cell value="" isHeader />
                    <Cell value="Gaji" isHeader />
                    {data.map((d, i) => (
                        <React.Fragment key={i}>
                             <Cell value={i+1} isHeader />
                             <Cell value={d} className={d === 1000 ? "bg-red-100 font-bold text-red-600" : ""} />
                        </React.Fragment>
                    ))}
                    
                    <Cell value="" isHeader />
                    <Cell value="" className="h-4 bg-gray-50"/>

                    <Cell value="6" isHeader />
                    <Cell value={`Average: ${avg}`} className="font-bold text-red-600" />
                    <Cell value="7" isHeader />
                    <Cell value={`Median: ${median}`} className="font-bold text-green-600" />
                </div>
             </ExcelWindow>
        </div>
    );
};

// --- SLIDE 10: LOOKUPS (VLOOKUP & HLOOKUP) ---
export const LookupsDemo: React.FC = () => {
    const [lookupType, setLookupType] = useState<'VLOOKUP' | 'HLOOKUP'>('VLOOKUP');
    const [searchId, setSearchId] = useState("102");

    const masterData = [
        { id: "101", name: "Andi", phone: "0811" },
        { id: "102", name: "Budi", phone: "0812" },
        { id: "103", name: "Cici", phone: "0813" },
    ];

    const result = masterData.find(m => m.id === searchId);
    const resultName = result ? result.name : "#N/A";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Search size={24} className="text-excel-base"/>
                        Lookup Series (Pencarian Data)
                    </h3>
                    
                    <div className="flex gap-2 mb-4">
                        <button 
                            onClick={() => setLookupType('VLOOKUP')}
                            className={`flex-1 py-2 rounded-lg font-bold text-sm transition-colors ${lookupType === 'VLOOKUP' ? 'bg-excel-base text-white' : 'bg-gray-100 text-gray-600'}`}
                        >
                            VLOOKUP (Vertical)
                        </button>
                        <button 
                             onClick={() => setLookupType('HLOOKUP')}
                             className={`flex-1 py-2 rounded-lg font-bold text-sm transition-colors ${lookupType === 'HLOOKUP' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                        >
                            HLOOKUP (Horizontal)
                        </button>
                    </div>
                    
                    {/* Explanation Section */}
                    {lookupType === 'VLOOKUP' ? (
                        <div className="bg-green-50 p-3 rounded border border-green-200 text-xs text-green-900 mb-4 animate-fade-in">
                            <h4 className="font-bold mb-1">VLOOKUP (Tegak Lurus)</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Mencari kunci (ID) di <b>Kolom Paling Kiri</b>.</li>
                                <li>Jika ketemu, bergerak ke <b>Kanan</b> untuk mengambil data.</li>
                                <li>Data tabel harus disusun vertikal (Header di atas).</li>
                            </ul>
                        </div>
                    ) : (
                        <div className="bg-blue-50 p-3 rounded border border-blue-200 text-xs text-blue-900 mb-4 animate-fade-in">
                             <h4 className="font-bold mb-1">HLOOKUP (Mendatar)</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Mencari kunci (ID) di <b>Baris Paling Atas</b>.</li>
                                <li>Jika ketemu, bergerak ke <b>Bawah</b> untuk mengambil data.</li>
                                <li>Data tabel disusun horizontal (Header di samping kiri).</li>
                            </ul>
                        </div>
                    )}

                    <div className="bg-yellow-50 p-3 rounded border border-yellow-200 text-sm mb-4">
                        <div className="font-mono text-xs mb-1 font-bold text-yellow-800">
                            ={lookupType}(Kunci, Tabel, Kolom/Baris, 0)
                        </div>
                        <p className="text-yellow-700 text-xs">
                            <AlertTriangle size={12} className="inline mr-1" />
                            Jangan lupa angka <b>0</b> (FALSE) di akhir untuk <i>Exact Match</i>. Jika tidak, data bisa salah ambil!
                        </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Cari ID:</label>
                        <select 
                            value={searchId} 
                            onChange={(e) => setSearchId(e.target.value)}
                            className="w-full p-2 border rounded bg-white"
                        >
                            <option value="101">101</option>
                            <option value="102">102</option>
                            <option value="103">103</option>
                            <option value="999">999 (Tidak Ada)</option>
                        </select>
                    </div>
                </div>
            </div>

            <ExcelWindow title={lookupType === 'VLOOKUP' ? "Buku Telepon (Vertical)" : "Buku Telepon (Horizontal)"}>
                 <FormulaBar 
                    value={lookupType === 'VLOOKUP' 
                        ? `=VLOOKUP("${searchId}", A2:C4, 2, 0)` 
                        : `=HLOOKUP("${searchId}", B1:D3, 2, 0)`
                    } 
                    label="Result" 
                />

                {lookupType === 'VLOOKUP' ? (
                    // VLOOKUP VISUALIZATION
                    <div className="grid grid-cols-[30px_1fr_1fr_1fr] text-sm">
                        <Cell value="" isHeader />
                        <Cell value="A (ID)" isHeader />
                        <Cell value="B (Nama)" isHeader />
                        <Cell value="C (Telp)" isHeader />

                        {masterData.map((row, idx) => (
                            <React.Fragment key={idx}>
                                <Cell value={idx + 2} isHeader />
                                <Cell value={row.id} className={row.id === searchId ? "bg-yellow-100 font-bold border-2 border-yellow-400" : ""} />
                                <Cell value={row.name} className={row.id === searchId ? "bg-green-100 font-bold border-2 border-green-500" : ""} />
                                <Cell value={row.phone} />
                            </React.Fragment>
                        ))}
                    </div>
                ) : (
                    // HLOOKUP VISUALIZATION
                    <div className="grid grid-cols-[80px_1fr_1fr_1fr] text-sm">
                         <Cell value="" isHeader />
                         <Cell value="B" isHeader />
                         <Cell value="C" isHeader />
                         <Cell value="D" isHeader />

                         <Cell value="1 (ID)" isHeader />
                         {masterData.map(d => <Cell key={d.id} value={d.id} className={d.id === searchId ? "bg-yellow-100 font-bold border-2 border-yellow-400" : ""} />)}

                         <Cell value="2 (Nama)" isHeader />
                         {masterData.map(d => <Cell key={d.id} value={d.name} className={d.id === searchId ? "bg-green-100 font-bold border-2 border-green-500" : ""} />)}

                         <Cell value="3 (Telp)" isHeader />
                         {masterData.map(d => <Cell key={d.id} value={d.phone} />)}
                    </div>
                )}

                <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg flex justify-between items-center">
                    <span className="text-gray-400 text-xs">Hasil Pencarian:</span>
                    <span className={`text-xl font-mono font-bold ${resultName === "#N/A" ? "text-red-400" : "text-green-400"}`}>
                        {resultName}
                    </span>
                </div>
            </ExcelWindow>
        </div>
    );
};

// --- SLIDE 11: XLOOKUP ---
export const XLookupDemo: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
            <div className="space-y-4">
                <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold mb-2">XLOOKUP</h3>
                    <div className="text-blue-100 text-sm font-mono bg-blue-700 p-2 rounded mb-4">
                        =XLOOKUP(Kunci, Kolom_Cari, Kolom_Hasil)
                    </div>
                    <ul className="space-y-2 text-sm">
                        <li className="flex gap-2"><CheckCircle2 size={16}/> Tidak perlu hitung nomor kolom.</li>
                        <li className="flex gap-2"><CheckCircle2 size={16}/> Bisa cari ke kiri (Left Lookup).</li>
                        <li className="flex gap-2"><CheckCircle2 size={16}/> Default Exact Match (tidak perlu 0/FALSE).</li>
                        <li className="flex gap-2"><CheckCircle2 size={16}/> Ada fitur "Jika Tidak Ketemu".</li>
                    </ul>
                </div>
            </div>
            <ExcelWindow title="XLOOKUP vs VLOOKUP">
                 <FormulaBar value='=XLOOKUP("102", A:A, B:B)' label="Simpel" />
                 <div className="p-4 text-center text-gray-500 text-sm">
                    Visualisasi perbandingan sintaks.
                    <br/>
                    XLOOKUP lebih mudah dibaca manusia.
                 </div>
            </ExcelWindow>
        </div>
    );
};

// --- SLIDE 12: PIVOT PREP ---
export const PivotPrepDemo: React.FC = () => {
    return (
         <div className="h-full flex flex-col justify-center gap-6">
            <h3 className="text-xl font-bold text-center">Syarat Wajib Sumber Data Pivot</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow border-l-4 border-red-500">
                    <h4 className="font-bold text-red-600 mb-2 flex items-center gap-2"><XCircle size={16}/> Jangan Ada Merge Cell</h4>
                    <p className="text-xs text-gray-500">Judul harus satu baris tunggal.</p>
                </div>
                <div className="bg-white p-4 rounded shadow border-l-4 border-red-500">
                     <h4 className="font-bold text-red-600 mb-2 flex items-center gap-2"><XCircle size={16}/> Header Tidak Boleh Kosong</h4>
                    <p className="text-xs text-gray-500">Setiap kolom wajib punya nama.</p>
                </div>
                <div className="bg-white p-4 rounded shadow border-l-4 border-green-500">
                     <h4 className="font-bold text-green-600 mb-2 flex items-center gap-2"><CheckCircle2 size={16}/> Format Tabel Rapi</h4>
                    <p className="text-xs text-gray-500">Gunakan Format as Table (Ctrl+T) untuk hasil terbaik.</p>
                </div>
            </div>
            
            <ExcelWindow title="Contoh Data Kotor vs Bersih" className="h-64">
                <div className="flex h-full">
                    <div className="w-1/2 border-r p-4 bg-red-50">
                        <div className="text-center font-bold text-red-800 mb-2">BAD DATA</div>
                        <table className="w-full text-xs border-collapse border border-red-200">
                            <tbody>
                                <tr>
                                    <td colSpan={2} className="border p-1 text-center bg-white">Merge Header (Salah)</td>
                                </tr>
                                <tr>
                                    <td className="border p-1 bg-white">Data</td>
                                    <td className="border p-1 bg-white"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="w-1/2 p-4 bg-green-50">
                        <div className="text-center font-bold text-green-800 mb-2">GOOD DATA</div>
                         <table className="w-full text-xs border-collapse border border-green-200">
                            <tbody>
                                <tr className="bg-green-200">
                                    <td className="border p-1 font-bold">Kategori</td>
                                    <td className="border p-1 font-bold">Jumlah</td>
                                </tr>
                                <tr>
                                    <td className="border p-1 bg-white">A</td>
                                    <td className="border p-1 bg-white">10</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </ExcelWindow>
         </div>
    );
};

// --- SLIDE 13: PIVOT OPS ---
export const PivotOpsDemo: React.FC = () => {
    const [op, setOp] = useState<'SUM' | 'COUNT' | 'AVERAGE'>('SUM');
    const [rowField, setRowField] = useState<'product' | 'region'>('product');
    const [colField, setColField] = useState<'region' | 'product' | 'none'>('region');

    const sourceData = [
        { product: 'Laptop', region: 'Jkt', sales: 10 },
        { product: 'Mouse', region: 'Jkt', sales: 2 },
        { product: 'Laptop', region: 'Bdg', sales: 8 },
        { product: 'Mouse', region: 'Bdg', sales: 3 },
    ];

    // Helper to calc aggregate
    const aggregate = (values: number[]) => {
        if (values.length === 0) return 0;
        if (op === 'SUM') return values.reduce((a,b) => a+b, 0);
        if (op === 'COUNT') return values.length;
        if (op === 'AVERAGE') return values.reduce((a,b) => a+b, 0) / values.length;
        return 0;
    }

    // --- PIVOT LOGIC (MATRIX) ---
    // 1. Get unique Row Keys
    const rowKeys = Array.from(new Set(sourceData.map(d => d[rowField]))).sort();
    
    // 2. Get unique Col Keys (if applicable)
    const colKeys = colField !== 'none' && colField !== rowField
        ? Array.from(new Set(sourceData.map(d => d[colField]))).sort()
        : [];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 h-full overflow-hidden">
            {/* Left Panel: Settings & Source */}
            <div className="space-y-4 flex flex-col h-full">
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                        <Settings size={16} /> Pivot Fields
                    </h3>
                    <div className="space-y-3">
                        {/* ROWS */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase block mb-1 flex items-center gap-1"><Rows size={12}/> Rows (Baris)</label>
                            <div className="flex gap-2">
                                <button onClick={() => setRowField('product')} className={`flex-1 text-xs py-1.5 rounded border ${rowField === 'product' ? 'bg-blue-100 border-blue-400 text-blue-800 font-bold' : 'bg-gray-50'}`}>Product</button>
                                <button onClick={() => setRowField('region')} className={`flex-1 text-xs py-1.5 rounded border ${rowField === 'region' ? 'bg-blue-100 border-blue-400 text-blue-800 font-bold' : 'bg-gray-50'}`}>Region</button>
                            </div>
                        </div>

                         {/* COLUMNS - NEW FEATURE */}
                         <div>
                            <label className="text-xs font-bold text-gray-500 uppercase block mb-1 flex items-center gap-1"><Columns size={12}/> Columns (Kolom)</label>
                            <div className="flex gap-2">
                                <button onClick={() => setColField('region')} disabled={rowField === 'region'} className={`flex-1 text-xs py-1.5 rounded border ${colField === 'region' ? 'bg-orange-100 border-orange-400 text-orange-800 font-bold' : 'bg-gray-50'} disabled:opacity-50`}>Region</button>
                                <button onClick={() => setColField('product')} disabled={rowField === 'product'} className={`flex-1 text-xs py-1.5 rounded border ${colField === 'product' ? 'bg-orange-100 border-orange-400 text-orange-800 font-bold' : 'bg-gray-50'} disabled:opacity-50`}>Product</button>
                                <button onClick={() => setColField('none')} className={`flex-1 text-xs py-1.5 rounded border ${colField === 'none' ? 'bg-gray-600 text-white font-bold' : 'bg-gray-50'}`}>None</button>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Summarize By</label>
                            <div className="grid grid-cols-3 gap-1">
                                <button onClick={() => setOp('SUM')} className={`text-xs py-1 rounded border ${op === 'SUM' ? 'bg-green-100 border-green-400 text-green-800 font-bold' : 'bg-gray-50'}`}>SUM</button>
                                <button onClick={() => setOp('COUNT')} className={`text-xs py-1 rounded border ${op === 'COUNT' ? 'bg-blue-100 border-blue-400 text-blue-800 font-bold' : 'bg-gray-50'}`}>COUNT</button>
                                <button onClick={() => setOp('AVERAGE')} className={`text-xs py-1 rounded border ${op === 'AVERAGE' ? 'bg-purple-100 border-purple-400 text-purple-800 font-bold' : 'bg-gray-50'}`}>AVG</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex-1 overflow-auto">
                    <h3 className="font-bold text-gray-600 mb-2 text-xs uppercase">Source Data</h3>
                    <div className="bg-white border text-xs">
                        <div className="grid grid-cols-3 font-bold bg-gray-100 border-b p-1">
                            <div>Prod</div><div>Reg</div><div className="text-right">Sale</div>
                        </div>
                        {sourceData.map((d, i) => (
                            <div key={i} className="grid grid-cols-3 border-b p-1 last:border-0">
                                <div>{d.product}</div><div>{d.region}</div><div className="text-right">{d.sales}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel: Result */}
            <ExcelWindow title="Pivot Table Result">
                <div className="flex flex-col h-full justify-center">
                    <div className="border border-gray-300 shadow-sm bg-white self-center w-full max-w-full overflow-auto">
                        
                        {/* Header Row */}
                        <div className="flex bg-gray-100 border-b border-gray-300">
                             {/* Top Left Cell */}
                             <div className="p-2 border-r border-gray-300 font-bold text-sm w-32 shrink-0">
                                {rowField} \ {colField !== 'none' ? colField : 'Values'}
                             </div>
                             
                             {/* Column Headers */}
                             {colKeys.length > 0 ? (
                                 colKeys.map(cKey => (
                                     <div key={cKey} className="p-2 border-r border-gray-300 font-bold text-sm w-24 text-center bg-orange-50">
                                         {cKey}
                                     </div>
                                 ))
                             ) : (
                                 <div className="p-2 border-r border-gray-300 font-bold text-sm w-24 text-right">
                                     {op}
                                 </div>
                             )}

                             {/* Grand Total Header */}
                             {colKeys.length > 0 && (
                                 <div className="p-2 font-bold text-sm w-24 text-right bg-gray-200">
                                     Gr. Total
                                 </div>
                             )}
                        </div>
                        
                        {/* Data Rows */}
                        {rowKeys.map((rKey, rIdx) => {
                             // Get data for this row
                             const rowData = sourceData.filter(d => d[rowField] === rKey);
                             const rowTotal = aggregate(rowData.map(d => d.sales));

                             return (
                                <div key={rKey} className="flex border-b border-gray-200 hover:bg-blue-50">
                                    {/* Row Label */}
                                    <div className="p-2 border-r border-gray-300 text-sm font-semibold w-32 shrink-0">
                                        {rKey}
                                    </div>

                                    {/* Matrix Cells */}
                                    {colKeys.length > 0 ? (
                                        colKeys.map(cKey => {
                                            const cellData = rowData.filter(d => d[colField] === cKey);
                                            const cellVal = aggregate(cellData.map(d => d.sales));
                                            return (
                                                <div key={cKey} className="p-2 border-r border-gray-300 text-sm w-24 text-center font-mono">
                                                    {cellData.length > 0 ? (Number.isInteger(cellVal) ? cellVal : cellVal.toFixed(1)) : "-"}
                                                </div>
                                            )
                                        })
                                    ) : (
                                         <div className="p-2 border-r border-gray-300 text-sm w-24 text-right font-mono">
                                            {Number.isInteger(rowTotal) ? rowTotal : rowTotal.toFixed(1)}
                                        </div>
                                    )}
                                    
                                    {/* Row Total */}
                                    {colKeys.length > 0 && (
                                         <div className="p-2 text-sm w-24 text-right font-mono font-bold bg-gray-100">
                                             {Number.isInteger(rowTotal) ? rowTotal : rowTotal.toFixed(1)}
                                         </div>
                                    )}
                                </div>
                             )
                        })}

                         {/* Grand Total Row */}
                         <div className="flex bg-gray-200 border-t border-gray-300 font-bold">
                            <div className="p-2 border-r border-gray-300 text-sm w-32 shrink-0">
                                Grand Total
                            </div>
                            
                            {colKeys.length > 0 ? (
                                colKeys.map(cKey => {
                                    const colData = sourceData.filter(d => d[colField] === cKey);
                                    const colVal = aggregate(colData.map(d => d.sales));
                                    return (
                                        <div key={cKey} className="p-2 border-r border-gray-300 text-sm w-24 text-center font-mono">
                                             {Number.isInteger(colVal) ? colVal : colVal.toFixed(1)}
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="p-2 border-r border-gray-300 text-sm w-24 text-right font-mono">
                                    {/* Simple Grand Total */}
                                     {(() => {
                                         const val = aggregate(sourceData.map(d => d.sales));
                                         return Number.isInteger(val) ? val : val.toFixed(1);
                                     })()}
                                </div>
                            )}

                             {/* Final Grand Total */}
                             {colKeys.length > 0 && (
                                 <div className="p-2 text-sm w-24 text-right font-mono text-excel-dark">
                                      {(() => {
                                         const val = aggregate(sourceData.map(d => d.sales));
                                         return Number.isInteger(val) ? val : val.toFixed(1);
                                     })()}
                                 </div>
                             )}
                         </div>

                    </div>
                </div>
            </ExcelWindow>
        </div>
    );
};

// --- SLIDE 14: PIVOT CHART ---
export const PivotChartDemo: React.FC = () => {
    const [filter, setFilter] = useState('All');
    const [showInstructions, setShowInstructions] = useState(false);
    
    // Mock data for chart visualization
    const data = {
        'All': [40, 60, 30],
        'Jakarta': [25, 40, 10],
        'Bandung': [15, 20, 20]
    };

    const currentData = data[filter as keyof typeof data];

    return (
         <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 h-full">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col relative overflow-hidden">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Filter size={18} /> Slicer (Filter)
                </h3>
                
                {/* Visual Slicer Mockup */}
                <div className="space-y-2 mb-4">
                    <div className="text-xs text-gray-500 font-bold mb-1 uppercase">Region</div>
                    {['All', 'Jakarta', 'Bandung'].map(city => (
                        <button 
                            key={city}
                            onClick={() => setFilter(city)}
                            className={`w-full p-2 text-left rounded text-sm transition-colors border ${filter === city ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-gray-800 hover:bg-blue-50 border-gray-300'}`}
                        >
                            {city}
                        </button>
                    ))}
                </div>

                <div className="mt-auto">
                    <button 
                        onClick={() => setShowInstructions(!showInstructions)}
                        className="w-full py-2 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded text-xs font-bold flex items-center justify-center gap-2 hover:bg-yellow-100"
                    >
                        <HelpCircle size={14} />
                        {showInstructions ? "Tutup Panduan" : "Cara Insert Slicer"}
                    </button>
                </div>

                {/* Instructions Overlay/Panel */}
                {showInstructions && (
                    <div className="absolute inset-0 bg-white z-10 p-4 animate-fade-in flex flex-col">
                        <h4 className="font-bold text-gray-800 mb-2 text-sm">Cara Menambahkan Slicer:</h4>
                        <ol className="list-decimal list-inside text-xs text-gray-600 space-y-2">
                            <li>Klik sembarang area pada <b>Pivot Chart</b> atau <b>Pivot Table</b>.</li>
                            <li>Buka Tab menu <b>PivotChart Analyze</b> atau <b>Analyze</b> di atas (Ribbon).</li>
                            <li>Klik tombol <b>Insert Slicer</b> <Filter size={10} className="inline"/>.</li>
                            <li>Centang kolom yang ingin dijadikan filter (misal: Region).</li>
                            <li>Klik OK.</li>
                        </ol>
                        <button onClick={() => setShowInstructions(false)} className="mt-auto w-full py-2 bg-gray-100 text-gray-600 rounded text-xs">Tutup</button>
                    </div>
                )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col">
                <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
                    <LayoutDashboard className="text-excel-base"/> Pivot Chart Sales ({filter})
                </h3>
                
                <div className="flex-1 flex items-end justify-around pb-8 px-4 border-b border-l border-gray-300 relative">
                    {currentData.map((h, i) => (
                        <div key={i} className="w-16 bg-excel-base rounded-t-sm relative group transition-all duration-500" style={{ height: `${h * 4}px` }}>
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                {h}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-around mt-2 text-xs text-gray-500 font-bold">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                </div>
            </div>
         </div>
    );
};

// --- SLIDE 15: TIPS & TRICK ---
export const TipsTrickDemo: React.FC = () => {
    const [showGrid, setShowGrid] = useState(true);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center">
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Grid size={24} className="text-gray-400"/>
                        Clean Copy-Paste
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Jangan biarkan tabel di PPT Anda terlihat "kotor" karena Gridlines.
                    </p>
                    <button 
                        onClick={() => setShowGrid(!showGrid)}
                        className={`w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${showGrid ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-excel-base text-white shadow-lg'}`}
                    >
                        {showGrid ? <Eye size={18} /> : <EyeOff size={18} />}
                        {showGrid ? "Matikan Gridlines (View -> Uncheck)" : "Gridlines Mati (Clean Mode)"}
                    </button>
                    
                    <div className="mt-4 text-xs text-gray-500 bg-yellow-50 p-2 rounded border border-yellow-100">
                        Hasil: Tabel berlatar putih polos terlihat jauh lebih profesional di slide presentasi.
                    </div>
                </div>
            </div>

            <div className="bg-gray-200 p-8 rounded-xl flex items-center justify-center">
                {/* Simulated Excel Area */}
                <div className={`bg-white w-full max-w-sm h-64 p-4 shadow-2xl transition-all duration-500 ${showGrid ? '' : ''}`}>
                    <div className="mb-2 font-bold text-gray-700 text-center">Sales Report</div>
                    
                    {/* The Table */}
                    <div className={`w-full border-collapse text-sm ${showGrid ? '' : ''}`}>
                        <div className="grid grid-cols-3 border-b-2 border-black mb-1 pb-1">
                            <div className="font-bold">Item</div>
                            <div className="font-bold text-right">Qty</div>
                            <div className="font-bold text-right">Total</div>
                        </div>
                        {[1,2,3,4].map(i => (
                            <div key={i} className={`grid grid-cols-3 py-1 ${showGrid ? 'border-b border-gray-200' : ''}`}>
                                <div>Product {String.fromCharCode(64+i)}</div>
                                <div className="text-right">{i*10}</div>
                                <div className="text-right">${i*100}</div>
                            </div>
                        ))}
                         <div className="grid grid-cols-3 py-2 mt-1 border-t-2 border-black font-bold">
                                <div>Total</div>
                                <div></div>
                                <div className="text-right">$1000</div>
                            </div>
                    </div>

                    {/* FAKE GRIDLINES OVERLAY */}
                    {showGrid && (
                        <div className="absolute inset-0 pointer-events-none" style={{
                            backgroundImage: `linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)`,
                            backgroundSize: '20px 20px',
                            zIndex: 0,
                            opacity: 0.5
                        }}></div>
                    )}
                </div>
            </div>
        </div>
    );
};
