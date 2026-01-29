import React, { useState, useEffect } from 'react';
import { Calculator, AlertCircle, ArrowRight, XCircle, CheckCircle2, Lock, Unlock, ArrowDown, ArrowUp, Copy, MousePointerClick, BarChart3, Users, Sigma, AlertTriangle, TrendingUp, Truck, Package, Clock, Split, Filter, Search, Table, LayoutDashboard, Eye, EyeOff, Grid, ChevronRight, Settings, HelpCircle, Columns, Rows } from 'lucide-react';
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
          <p className="font-semibold mb-1">Coba Pilih:</p>
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
            readOnly={true}
            align="right"
          />
        </div>
        <div className="mt-4 text-sm text-center">
            {status === 'text' && <span className="text-gray-500 italic">Excel menganggap ini teks karena tidak ada '='</span>}
            {status === 'formula' && <span className="text-excel-dark font-bold">Berhasil! Excel menghitung rumusnya.</span>}
            {status === 'idle' && <span className="text-gray-400">Pilih tombol di kiri...</span>}
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
  type LockMode = 'relative' | 'absolute' | 'row' | 'col';
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
    if (lockMode === 'col') return `$E${1 + rowOffset}`;
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

  // Explanation for Row 3 specifically (The Second Item, C3)
  const getRow3Explanation = () => {
      if (lockMode === 'relative') {
          return {
              title: "BAHAYA! (Mode Relatif)",
              formula: "= B3 * E2",
              desc: "Bahaya untuk referensi tetap! Rumus di C3 menjadi =B3*E2. E2 itu kosong, jadi hasilnya 0.",
              result: "Hasil: 0",
              color: "text-red-700 bg-red-50 border-red-200"
          }
      } else if (lockMode === 'absolute') {
           return {
              title: "AMAN (Mode Absolut)",
              formula: "= B3 * $E$1",
              desc: "Aman! Rumus di C3 menjadi =B3*$E$1. Referensi $E$1 terkunci total, tidak bergeser.",
              result: "Hasil: 200 (2000 * 10%)",
              color: "text-green-700 bg-green-50 border-green-200"
          }
      } else if (lockMode === 'row') {
           return {
              title: "AMAN (Mode Kunci Baris)",
              formula: "= B3 * E$1",
              desc: "Aman! Rumus di C3 menjadi =B3*E$1. Baris 1 dikunci ($1), jadi referensi tidak turun.",
              result: "Hasil: 200 (2000 * 10%)",
              color: "text-blue-700 bg-blue-50 border-blue-200"
          }
      } else {
           return {
              title: "BAHAYA! (Mode Kunci Kolom)",
              formula: "= B3 * $E2",
              desc: "Bahaya! Rumus di C3 menjadi =B3*$E2. Hanya kolom dikunci ($E), baris tetap turun. E2 itu kosong.",
              result: "Hasil: 0",
              color: "text-red-700 bg-red-50 border-red-200"
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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

             <button 
                onClick={() => handleModeChange('col')}
                className={`p-3 rounded border text-center transition-all duration-200 hover:shadow-md ${lockMode === 'col' ? 'bg-orange-50 border-orange-400 ring-2 ring-orange-400 ring-offset-1' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
             >
                <div className={`font-mono font-bold mb-1 ${lockMode === 'col' ? 'text-orange-700' : 'text-gray-800'}`}>$A1</div>
                <div className="text-xs text-gray-500">Kunci Kolom</div>
                <div className="flex justify-center mt-2 gap-0.5">
                   <Lock size={14} className={`text-gray-800 ${lockMode === 'col' ? 'text-orange-600' : ''}`} />
                   <Unlock size={14} className="text-gray-400" />
                </div>
             </button>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg border text-sm transition-all duration-300 ${
            lockMode === 'relative' ? 'bg-red-50 border-red-200' :
            lockMode === 'absolute' ? 'bg-green-50 border-green-200' :
            lockMode === 'row' ? 'bg-blue-50 border-blue-200' :
            'bg-orange-50 border-orange-200'
        }`}>
            {lockMode === 'relative' && (
                <div>
                    <h4 className="font-bold text-red-800 mb-1 flex items-center gap-2"><ArrowDown size={16}/> Mode Relatif (A1)</h4>
                    <p className="text-red-700">Bahaya untuk referensi tetap! Jika dicopy, posisi sel akan ikut bergeser.</p>
                </div>
            )}
            {lockMode === 'absolute' && (
                <div>
                    <h4 className="font-bold text-excel-dark mb-1 flex items-center gap-2"><Lock size={16}/> Mode Mutlak ($A$1)</h4>
                    <p className="text-green-800">Paling aman! Kolom dan Baris dikunci. Tidak akan bergeser kemanapun.</p>
                </div>
            )}
            {lockMode === 'row' && (
                <div>
                    <h4 className="font-bold text-blue-800 mb-1 flex items-center gap-2"><Lock size={16}/> Mode Kunci Baris (A$1)</h4>
                    <p className="text-blue-800">Hanya baris yang dikunci. Kolom masih bisa bergeser.</p>
                </div>
            )}
            {lockMode === 'col' && (
                <div>
                    <h4 className="font-bold text-orange-800 mb-1 flex items-center gap-2"><Lock size={16}/> Mode Kunci Column ($A1)</h4>
                    <p className="text-orange-800">Hanya kolom yang dikunci. Baris masih bisa bergeser (Relative).</p>
                </div>
            )}
        </div>
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
                        lockMode === 'row' ? 'bg-blue-50 ring-2 ring-blue-400' :
                        'bg-orange-50 ring-2 ring-orange-400'
                    }`} />

                    <Cell value="2" isHeader />
                    <Cell value={data[0].item} />
                    <Cell value={data[0].price} />
                    <Cell value={data[0].price * (taxRate/100)} className="font-mono font-bold text-blue-700 bg-blue-50" />
                    <Cell value="" />
                    <Cell value="" className={`${isCopied && (lockMode === 'relative' || lockMode === 'col') ? 'bg-red-100 ring-2 ring-red-400 z-20' : ''}`} />

                    <Cell value="3" isHeader />
                    <Cell value={data[1].item} />
                    <Cell value={data[1].price} />
                    <Cell 
                        value={renderResultWithFormula(data[1].price, 3, 1)} 
                        className={`font-mono transition-all duration-500 ${
                            isCopied 
                            ? (lockMode === 'relative' || lockMode === 'col' ? 'bg-red-100' : 'bg-green-50 font-bold') 
                            : ''
                        }`} 
                    />
                    <Cell value="" />
                    <Cell value="" className={`${isCopied && (lockMode === 'relative' || lockMode === 'col') ? 'bg-red-100 ring-2 ring-red-400 z-20' : ''}`} />

                    <Cell value="4" isHeader />
                    <Cell value={data[2].item} />
                    <Cell value={data[2].price} />
                    <Cell 
                         value={renderResultWithFormula(data[2].price, 4, 2)}
                         className={`font-mono transition-all duration-500 ${
                            isCopied 
                            ? (lockMode === 'relative' || lockMode === 'col' ? 'bg-red-100' : 'bg-green-50 font-bold') 
                            : ''
                        }`} 
                    />
                    <Cell value="" />
                    <Cell value="" />
                </div>

                {isCopied && (
                    <div className={`mt-4 p-3 rounded-lg text-sm border animate-fade-in shadow-sm ${row3Expl.color}`}>
                        <div className="flex items-start gap-3">
                            {(lockMode === 'relative' || lockMode === 'col') ? <XCircle size={20} className="mt-0.5 shrink-0" /> : <CheckCircle2 size={20} className="mt-0.5 shrink-0" />}
                            <div>
                                <h4 className="font-bold text-sm uppercase mb-1">{row3Expl.title}</h4>
                                <p className="text-xs font-semibold mb-1">{row3Expl.desc}</p>
                                <div className="text-xs opacity-90 font-mono bg-white/50 p-1 rounded inline-block">
                                    C3: {row3Expl.formula} &rarr; {row3Expl.result}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </ExcelWindow>
         </div>
      </div>
    </div>
  );
};

// --- SLIDE 5: LOGIC FUNCTIONS (IF & IFS) ---
export const LogicFunctionsDemo: React.FC = () => {
    const [score, setScore] = useState(75);
    const [activeTab, setActiveTab] = useState<'IF' | 'IFS'>('IF'); // Added state

    // IF Logic
    const ifResult = score >= 70 ? "Lulus" : "Gagal";
    const ifFormula = `=IF(B2>=70, "Lulus", "Gagal")`;

    // IFS Logic
    const getIfsResult = (s: number) => {
        if (s >= 90) return "A";
        if (s >= 80) return "B";
        if (s >= 70) return "C";
        return "D"; // Default catch-all
    };
    const ifsResult = getIfsResult(score);
    // User requested wrap text behavior for this long formula
    const ifsFormula = `=IFS(B2>=90,"A", B2>=80,"B", B2>=70,"C", TRUE,"D")`;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            <div className="space-y-6">
                 <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Split className="text-yellow-600" />
                        Fungsi Logika (IF & IFS)
                    </h3>

                    {/* TABS */}
                    <div className="flex border-b border-gray-200 mb-4">
                        <button
                            onClick={() => setActiveTab('IF')}
                            className={`flex-1 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'IF' ? 'border-blue-500 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            IF (Tunggal)
                        </button>
                        <button
                            onClick={() => setActiveTab('IFS')}
                            className={`flex-1 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'IFS' ? 'border-purple-500 text-purple-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            IFS (Majemuk)
                        </button>
                    </div>

                    <div className="space-y-4">
                        {activeTab === 'IF' && (
                            <div className="bg-blue-50 p-3 rounded border border-blue-200 animate-fade-in">
                                <h4 className="font-bold text-blue-800 text-sm">IF - Keputusan Biner</h4>
                                <code className="text-xs bg-white px-1 py-0.5 rounded block my-1 border border-blue-100 text-blue-900 font-mono">
                                    =IF(Syarat, "Jika Benar", "Jika Salah")
                                </code>
                                <p className="text-xs text-blue-700 mt-2">
                                    <b>Contoh:</b> Lulus vs Gagal. <br/>
                                    Jika nilai di atas 70, maka "Lulus", selain itu "Gagal".
                                </p>
                            </div>
                        )}

                        {activeTab === 'IFS' && (
                            <div className="bg-purple-50 p-3 rounded border border-purple-200 animate-fade-in">
                                <h4 className="font-bold text-purple-800 text-sm">IFS - Banyak Syarat</h4>
                                <code className="text-xs bg-white px-1 py-0.5 rounded block my-1 border border-purple-100 text-purple-900 font-mono break-all whitespace-normal">
                                    =IFS(Syarat1, Hasil1, Syarat2, Hasil2, ...)
                                </code>
                                <p className="text-xs text-purple-700 mt-2 leading-relaxed">
                                    Fitur baru (Excel 2019+). Lebih rapi daripada IF bertumpuk. Excel membaca dari kiri ke kanan dan berhenti saat syarat terpenuhi.
                                </p>
                                <div className="mt-2 text-xs text-purple-800 bg-white p-2 rounded border border-purple-100">
                                    <b>Syarat Nilai (Grading):</b>
                                    <ul className="list-disc list-inside mt-1 space-y-0.5">
                                        <li>Nilai &ge; 90 : A</li>
                                        <li>Nilai &ge; 80 : B</li>
                                        <li>Nilai &ge; 70 : C</li>
                                        <li>Sisa : D</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                 </div>

                 {/* SLIDER INPUT */}
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
                    wrapText={activeTab === 'IFS'} // Fix truncation
                />
                
                <div className="grid grid-cols-[30px_1fr_60px_1fr] text-sm">
                    <Cell value="" isHeader />
                    <Cell value="A (Nama)" isHeader />
                    <Cell value="B (Skor)" isHeader />
                    <Cell 
                        value={activeTab === 'IF' ? "C (Status)" : "C (Grade)"} 
                        isHeader 
                        className={activeTab === 'IF' ? "bg-blue-50" : "bg-purple-50"} 
                    />

                    <Cell value="1" isHeader />
                    <Cell value="Budi Santoso" />
                    <Cell value={score} isSelected={true} className="font-bold text-center" />
                    
                    {/* Dynamic Result Cell */}
                    <Cell 
                        value={
                            activeTab === 'IF' ? (
                                <div className="flex flex-col items-center">
                                    <span className={ifResult === 'Lulus' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{ifResult}</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <span className={`font-bold w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                                        ifsResult === 'A' ? 'bg-green-500' :
                                        ifsResult === 'B' ? 'bg-blue-500' :
                                        ifsResult === 'C' ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}>{ifsResult}</span>
                                </div>
                            )
                        }
                        className={activeTab === 'IF' ? "bg-blue-50/50" : "bg-purple-50/50"}
                    />
                </div>
                
                {/* Analysis Box */}
                <div className="mt-4">
                    {activeTab === 'IF' ? (
                        <div className="bg-blue-100 p-2 rounded text-xs text-blue-800 animate-fade-in">
                            <b>Analisa IF:</b><br/>
                            Apakah {score} &ge; 70? <br/>
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
    const [viewMode, setViewMode] = useState<'theory' | 'practice'>('theory');
    const [regionFilter, setRegionFilter] = useState("Jakarta");
    const [categoryFilter, setCategoryFilter] = useState("Laptop");

    const data = [
        { product: "Laptop", region: "Jakarta", sales: 15 },
        { product: "Mouse", region: "Jakarta", sales: 5 },
        { product: "Laptop", region: "Bandung", sales: 12 },
        { product: "Mouse", region: "Bandung", sales: 3 },
        { product: "Laptop", region: "Jakarta", sales: 10 },
    ];

    // Calc Sum
    const result = data
        .filter(d => d.region === regionFilter && d.product === categoryFilter)
        .reduce((sum, item) => sum + item.sales, 0);

    const formatCurrency = (val: number) => `Rp ${val} Jt`;

    return (
        <div className="h-full flex flex-col">
            {/* Top Toggle */}
            <div className="flex justify-center mb-6">
                <div className="bg-gray-200 p-1 rounded-lg inline-flex">
                    <button 
                        onClick={() => setViewMode('theory')}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${viewMode === 'theory' ? 'bg-white text-excel-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Konsep & Teori
                    </button>
                    <button 
                         onClick={() => setViewMode('practice')}
                         className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${viewMode === 'practice' ? 'bg-white text-excel-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Simulasi Praktik
                    </button>
                </div>
            </div>

            {viewMode === 'theory' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full overflow-auto">
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Filter className="text-excel-base" />
                                SUMIF vs SUMIFS
                            </h3>
                            
                            {/* SUMIF Card */}
                            <div className="mb-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h4 className="font-bold text-blue-800 mb-1">1. SUMIF (Klasik / Satu Syarat)</h4>
                                <p className="text-xs text-blue-700 mb-2">Analogi: Cari Barang, lalu Total Harganya.</p>
                                <div className="bg-white p-2 rounded border border-blue-200 font-mono text-[10px] sm:text-xs text-gray-600 break-all whitespace-normal">
                                    =SUMIF(<span className="text-blue-600">Range_Kriteria</span>, <span className="text-green-600">Syarat</span>, <span className="text-red-600 font-bold">Range_Harga</span>)
                                </div>
                            </div>

                             {/* SUMIFS Card */}
                             <div className="mb-4 bg-purple-50 p-4 rounded-lg border border-purple-100">
                                <h4 className="font-bold text-purple-800 mb-1">2. SUMIFS (Modern / Banyak Syarat)</h4>
                                <p className="text-xs text-purple-700 mb-2">Analogi: Amankan Duit dulu, baru filter filter filter.</p>
                                <div className="bg-white p-2 rounded border border-purple-200 font-mono text-[10px] sm:text-xs text-gray-600 break-all whitespace-normal">
                                    =SUMIFS(<span className="text-red-600 font-bold">Range_Harga</span>, <span className="text-blue-600">Range1</span>, <span className="text-green-600">Syarat1</span>, ...)
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* The Trap */}
                        <div className="bg-red-50 p-5 rounded-xl border-l-4 border-red-500 shadow-sm">
                            <h4 className="font-bold text-red-800 flex items-center gap-2 mb-2">
                                <AlertTriangle size={18} />
                                PERHATIAN (The Trap)
                            </h4>
                            <p className="text-sm text-red-700 mb-2">
                                Urutan argumen terbalik! Ini kesalahan paling sering terjadi.
                            </p>
                            <ul className="list-disc list-inside text-xs text-red-700 space-y-1">
                                <li><b>SUMIF:</b> Kolom Angka (Harga) ada di <span className="font-bold underline">BELAKANG</span>.</li>
                                <li><b>SUMIFS:</b> Kolom Angka (Harga) ada di <span className="font-bold underline">DEPAN</span>.</li>
                            </ul>
                            <p className="text-xs text-red-600 mt-2 italic">
                                Kenapa? Karena di SUMIFS syaratnya bisa banyak (tak terbatas), jadi Excel minta angka totalnya diamankan dulu di depan.
                            </p>
                        </div>

                         {/* Trainer Rec */}
                         <div className="bg-green-50 p-5 rounded-xl border border-green-200 shadow-sm">
                            <h4 className="font-bold text-green-800 flex items-center gap-2 mb-2">
                                <CheckCircle2 size={18} />
                                Rekomendasi Trainer
                            </h4>
                            <p className="text-sm text-green-800">
                                <b>Pakai SUMIFS saja!</b> Meskipun syarat Anda cuma satu.
                            </p>
                            <p className="text-xs text-green-700 mt-2">
                                Alasannya: Rumusnya lebih logis (Angka dulu), dan jika nanti Bos minta tambah filter (misal: per Kota), Anda tinggal tambah koma di belakang tanpa bongkar rumus dari awal.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <Filter className="text-excel-base" />
                                Demo SUMIFS
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Coba filter data di bawah ini. Perhatikan bagaimana rumus terbentuk secara otomatis.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Filter Wilayah</label>
                                    <select 
                                        value={regionFilter} 
                                        onChange={(e) => setRegionFilter(e.target.value)}
                                        className="w-full mt-1 p-2 border rounded bg-white shadow-sm"
                                    >
                                        <option value="Jakarta">Jakarta</option>
                                        <option value="Bandung">Bandung</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Filter Produk</label>
                                    <select 
                                        value={categoryFilter} 
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                        className="w-full mt-1 p-2 border rounded bg-white shadow-sm"
                                    >
                                        <option value="Laptop">Laptop</option>
                                        <option value="Mouse">Mouse</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ExcelWindow title="Laporan Penjualan Cabang">
                        <FormulaBar 
                            value={`=SUMIFS(C2:C6, A2:A6, "${regionFilter}", B2:B6, "${categoryFilter}")`} 
                            label="Total"
                            wrapText={true} 
                        />
                        <div className="grid grid-cols-[30px_1fr_1fr_1fr] text-sm">
                            <Cell value="" isHeader />
                            <Cell value="A (Region)" isHeader />
                            <Cell value="B (Produk)" isHeader />
                            <Cell value="C (Omzet)" isHeader className="bg-yellow-50" />

                            {data.map((row, idx) => {
                                const isMatch = row.region === regionFilter && row.product === categoryFilter;
                                return (
                                    <React.Fragment key={idx}>
                                        <Cell value={idx + 2} isHeader />
                                        <Cell 
                                            value={row.region} 
                                            className={isMatch ? "bg-blue-50 font-bold text-blue-700" : "text-gray-500"} 
                                        />
                                        <Cell 
                                            value={row.product} 
                                            className={isMatch ? "bg-purple-50 font-bold text-purple-700" : "text-gray-500"} 
                                        />
                                        <Cell 
                                            value={row.sales} 
                                            align="right"
                                            className={isMatch ? "bg-yellow-100 font-bold text-black border-l-4 border-l-excel-base" : "text-gray-400"} 
                                        />
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        <div className="mt-4 bg-gray-800 text-white p-4 rounded-lg flex justify-between items-center shadow-lg">
                            <div className="text-xs">
                                Total Penjualan <br/>
                                <span className="text-gray-300">Region: {regionFilter}, Produk: {categoryFilter}</span>
                            </div>
                            <div className="text-2xl font-bold font-mono text-green-400">
                                {formatCurrency(result)}
                            </div>
                        </div>
                    </ExcelWindow>
                </div>
            )}
        </div>
    );
};

// --- SLIDE 7: BASIC STATS (MIN, MAX, AVERAGE) ---
export const BasicStatsDemo: React.FC = () => {
  const data = [10, 20, 30, 40, 500]; // 500 is outlier
  const avg = data.reduce((a,b)=>a+b,0) / data.length;
  const min = Math.min(...data);
  const max = Math.max(...data);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
           <h3 className="text-xl font-bold text-gray-800 mb-4">Statistik Dasar</h3>
           <p className="text-gray-600 mb-4">Fungsi paling sering digunakan untuk summary data cepat.</p>
           
           <div className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-100 rounded">
                  <div className="font-bold text-blue-800">=MIN(Range)</div>
                  <div className="text-xs text-blue-600">Mencari nilai terendah/termurah.</div>
              </div>
              <div className="p-3 bg-red-50 border border-red-100 rounded">
                  <div className="font-bold text-red-800">=MAX(Range)</div>
                  <div className="text-xs text-red-600">Mencari nilai tertinggi/termahal.</div>
              </div>
               <div className="p-3 bg-green-50 border border-green-100 rounded">
                  <div className="font-bold text-green-800">=AVERAGE(Range)</div>
                  <div className="text-xs text-green-600">Mencari nilai rata-rata.</div>
              </div>
           </div>
        </div>
      </div>
      
      <ExcelWindow title="Laporan Harian">
         <div className="grid grid-cols-[30px_1fr_1fr] text-sm">
             <Cell value="" isHeader />
             <Cell value="A (Hari)" isHeader />
             <Cell value="B (Penjualan)" isHeader />

             <Cell value="1" isHeader />
             <Cell value="Senin" />
             <Cell value={data[0]} align="right" />

             <Cell value="2" isHeader />
             <Cell value="Selasa" />
             <Cell value={data[1]} align="right" />

             <Cell value="3" isHeader />
             <Cell value="Rabu" />
             <Cell value={data[2]} align="right" />

             <Cell value="4" isHeader />
             <Cell value="Kamis" />
             <Cell value={data[3]} align="right" />

             <Cell value="5" isHeader />
             <Cell value="Jumat (Promo)" className="font-bold" />
             <Cell value={data[4]} align="right" className="font-bold text-blue-600" />

             <Cell value="6" isHeader />
             <Cell value="" className="bg-gray-50" />
             <Cell value="" className="bg-gray-50" />

             {/* Results */}
             <Cell value="7" isHeader />
             <Cell value="Tertinggi (MAX)" className="font-bold text-red-800 bg-red-50" />
             <Cell value={max} className="font-bold bg-red-50" align="right" />

             <Cell value="8" isHeader />
             <Cell value="Terendah (MIN)" className="font-bold text-blue-800 bg-blue-50" />
             <Cell value={min} className="font-bold bg-blue-50" align="right" />

             <Cell value="9" isHeader />
             <Cell value="Rata-rata (AVERAGE)" className="font-bold text-green-800 bg-green-50" />
             <Cell value={avg} className="font-bold bg-green-50" align="right" />
         </div>
      </ExcelWindow>
    </div>
  );
};

// --- SLIDE 8: COUNT FAMILY ---
export const CountFamilyDemo: React.FC = () => {
    // Implementation for Count, CountA, CountBlank, CountIf
    return (
        <div className="flex flex-col h-full gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Keluarga COUNT (Menghitung Data)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     <div className="p-3 bg-gray-50 rounded border text-center">
                        <div className="font-bold text-excel-dark">COUNT</div>
                        <div className="text-xs text-gray-500 mt-1">Hanya Angka</div>
                     </div>
                     <div className="p-3 bg-gray-50 rounded border text-center">
                        <div className="font-bold text-excel-dark">COUNTA</div>
                        <div className="text-xs text-gray-500 mt-1">Semua Data (Tidak Kosong)</div>
                     </div>
                     <div className="p-3 bg-gray-50 rounded border text-center">
                        <div className="font-bold text-excel-dark">COUNTBLANK</div>
                        <div className="text-xs text-gray-500 mt-1">Sel Kosong</div>
                     </div>
                      <div className="p-3 bg-gray-50 rounded border text-center">
                        <div className="font-bold text-excel-dark">COUNTIF</div>
                        <div className="text-xs text-gray-500 mt-1">Hitung dengan Syarat</div>
                     </div>
                </div>
            </div>

            <ExcelWindow title="Absensi Karyawan" className="flex-1">
                <div className="grid grid-cols-[30px_1fr_1fr_1fr] text-sm">
                    <Cell value="" isHeader />
                    <Cell value="A (Nama)" isHeader />
                    <Cell value="B (Status)" isHeader />
                    <Cell value="Keterangan Rumus" isHeader className="bg-gray-200" />

                    <Cell value="1" isHeader />
                    <Cell value="Ali" />
                    <Cell value="Hadir" />
                    <Cell value="Data Text" className="text-gray-400 italic" />

                    <Cell value="2" isHeader />
                    <Cell value="Budi" />
                    <Cell value="1" />
                    <Cell value="Data Angka" className="text-gray-400 italic" />

                    <Cell value="3" isHeader />
                    <Cell value="Cici" />
                    <Cell value="" />
                    <Cell value="Kosong (Blank)" className="text-gray-400 italic" />

                    <Cell value="4" isHeader />
                    <Cell value="Dedi" />
                    <Cell value="Sakit" />
                    <Cell value="Data Text" className="text-gray-400 italic" />

                    <Cell value="5" isHeader />
                    <Cell value="" className="bg-gray-100" />
                    <Cell value="" className="bg-gray-100" />
                    <Cell value="" className="bg-gray-100" />

                     {/* Formulas */}
                    <Cell value="6" isHeader />
                    <Cell value="COUNT (Angka saja)" className="font-semibold" />
                    <Cell value="1" className="font-bold text-center" />
                    <Cell value="=COUNT(B1:B4)" className="font-mono text-xs text-blue-600" />

                    <Cell value="7" isHeader />
                    <Cell value="COUNTA (Isi)" className="font-semibold" />
                    <Cell value="3" className="font-bold text-center" />
                    <Cell value="=COUNTA(B1:B4)" className="font-mono text-xs text-blue-600" />

                    <Cell value="8" isHeader />
                    <Cell value="COUNTBLANK (Kosong)" className="font-semibold" />
                    <Cell value="1" className="font-bold text-center" />
                    <Cell value="=COUNTBLANK(B1:B4)" className="font-mono text-xs text-blue-600" />

                     <Cell value="9" isHeader />
                    <Cell value="COUNTIF (Sakit)" className="font-semibold" />
                    <Cell value="1" className="font-bold text-center" />
                    <Cell value='=COUNTIF(B1:B4, "Sakit")' className="font-mono text-xs text-blue-600" />
                </div>
            </ExcelWindow>
        </div>
    );
}

// --- SLIDE 9: MEDIAN vs MODE ---
export const MedianModeDemo: React.FC = () => {
    // Demo showing outlier effect
     const data = [3, 4, 4, 5, 100]; // 100 is outlier
     const avg = 23.2;
     const median = 4;
     const mode = 4;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
             <div className="space-y-4">
                 <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                    <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2"><AlertTriangle size={20}/> Hati-hati dengan Rata-rata!</h3>
                    <p className="text-sm text-yellow-900 mb-4">
                        Jika ada data pencilan (outlier) yang ekstrim, rata-rata (AVERAGE) akan menjadi bias dan tidak mewakili data sebenarnya. Gunakan <b>MEDIAN</b>.
                    </p>
                 </div>
                 <div className="bg-white p-4 rounded-xl border shadow-sm">
                    <h4 className="font-bold mb-2">Definisi</h4>
                    <ul className="text-sm space-y-2 text-gray-600">
                        <li><b>MEDIAN:</b> Nilai tengah setelah data diurutkan. Kebal terhadap outlier.</li>
                        <li><b>MODE (Modus):</b> Nilai yang paling sering muncul.</li>
                    </ul>
                 </div>
             </div>

             <ExcelWindow title="Gaji Karyawan (Jutaan)">
                <div className="grid grid-cols-[30px_1fr_1fr] text-sm">
                    <Cell value="" isHeader />
                    <Cell value="Karyawan" isHeader />
                    <Cell value="Gaji" isHeader />

                    <Cell value="1" isHeader />
                    <Cell value="Staff A" />
                    <Cell value="3" align="right" />
                    
                    <Cell value="2" isHeader />
                    <Cell value="Staff B" />
                    <Cell value="4" align="right" />

                    <Cell value="3" isHeader />
                    <Cell value="Staff C" />
                    <Cell value="4" align="right" />

                    <Cell value="4" isHeader />
                    <Cell value="Staff D" />
                    <Cell value="5" align="right" />

                    <Cell value="5" isHeader />
                    <Cell value="CEO (Boss)" className="font-bold" />
                    <Cell value="100" align="right" className="font-bold text-red-600" />

                    <Cell value="6" isHeader />
                    <Cell value="" className="bg-gray-100" />
                    <Cell value="" className="bg-gray-100" />

                    <Cell value="7" isHeader />
                    <Cell value="AVERAGE" className="font-semibold text-red-800" />
                    <Cell value={avg} align="right" className="font-bold text-red-600 bg-red-50" />
                    
                    <Cell value="8" isHeader />
                    <Cell value="MEDIAN" className="font-semibold text-green-800" />
                    <Cell value={median} align="right" className="font-bold text-green-600 bg-green-50" />

                    <Cell value="9" isHeader />
                    <Cell value="MODE" className="font-semibold text-blue-800" />
                    <Cell value={mode} align="right" className="font-bold text-blue-600 bg-blue-50" />
                </div>
                 <div className="p-2 text-xs text-center text-gray-500 mt-2">
                    Perhatikan Average ({avg}) jauh diatas gaji mayoritas staff (3-5). Median ({median}) lebih akurat.
                </div>
             </ExcelWindow>
        </div>
    );
}

// --- SLIDE 10: VLOOKUP & HLOOKUP ---
export const LookupsDemo: React.FC = () => {
    // Interactive VLOOKUP
    const [searchId, setSearchId] = useState("K002");
    const db = {
        "K001": { name: "Budi", div: "Sales" },
        "K002": { name: "Siti", div: "HR" },
        "K003": { name: "Andi", div: "IT" }
    };
    const result = db[searchId as keyof typeof db] || { name: "#N/A", div: "#N/A" };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">VLOOKUP (Vertical Lookup)</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Mencari data di tabel referensi berdasarkan kunci pencarian (Lookup Value).
                    </p>
                    
                    <div className="bg-gray-50 p-3 rounded border font-mono text-xs break-all whitespace-normal">
                        =VLOOKUP(<span className="text-red-600">Kunci</span>, <span className="text-blue-600">Tabel_Ref</span>, <span className="text-green-600">No_Kolom</span>, <span className="text-purple-600">FALSE</span>)
                    </div>

                    <div className="mt-6">
                        <label className="text-sm font-bold text-gray-700">Cari ID Karyawan:</label>
                        <select 
                            value={searchId} 
                            onChange={(e) => setSearchId(e.target.value)}
                            className="w-full mt-1 p-2 border rounded bg-white"
                        >
                            <option value="K001">K001</option>
                            <option value="K002">K002</option>
                            <option value="K003">K003</option>
                            <option value="K004">K004 (Tidak Ada)</option>
                        </select>
                    </div>
                </div>
                
                 <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-sm text-blue-800">
                    <p><b>Tips:</b> Selalu gunakan <b>FALSE</b> (atau 0) di argumen terakhir untuk pencarian persis (Exact Match).</p>
                 </div>
            </div>

            <ExcelWindow title="Database Karyawan">
                <div className="flex flex-col gap-6">
                    {/* Master Table */}
                    <div>
                         <div className="text-xs font-bold text-gray-500 mb-1">Tabel Referensi (A1:C4)</div>
                         <div className="grid grid-cols-[30px_1fr_1fr_1fr] text-sm">
                            <Cell value="" isHeader />
                            <Cell value="A" isHeader />
                            <Cell value="B" isHeader />
                            <Cell value="C" isHeader />

                            <Cell value="1" isHeader />
                            <Cell value="ID" className="font-bold bg-gray-100" />
                            <Cell value="Nama" className="font-bold bg-gray-100" />
                            <Cell value="Divisi" className="font-bold bg-gray-100" />

                            <Cell value="2" isHeader />
                            <Cell value="K001" className={searchId === 'K001' ? 'bg-red-100 font-bold' : ''} />
                            <Cell value="Budi" className={searchId === 'K001' ? 'bg-green-100 font-bold' : ''} />
                            <Cell value="Sales" />

                            <Cell value="3" isHeader />
                            <Cell value="K002" className={searchId === 'K002' ? 'bg-red-100 font-bold' : ''} />
                            <Cell value="Siti" className={searchId === 'K002' ? 'bg-green-100 font-bold' : ''} />
                            <Cell value="HR" />

                            <Cell value="4" isHeader />
                            <Cell value="K003" className={searchId === 'K003' ? 'bg-red-100 font-bold' : ''} />
                            <Cell value="Andi" className={searchId === 'K003' ? 'bg-green-100 font-bold' : ''} />
                            <Cell value="IT" />
                         </div>
                    </div>

                    {/* Lookup Form */}
                    <div className="border-t pt-4">
                         <div className="text-xs font-bold text-gray-500 mb-1">Form Pencarian</div>
                         <FormulaBar value={`=VLOOKUP("${searchId}", A2:C4, 2, 0)`} label="F3" />
                         <div className="grid grid-cols-[30px_1fr_1fr] text-sm">
                            <Cell value="" isHeader />
                            <Cell value="E" isHeader />
                            <Cell value="F" isHeader />

                            <Cell value="2" isHeader />
                            <Cell value="Input ID:" className="font-bold text-right pr-2" />
                            <Cell value={searchId} className="border border-red-500" />

                            <Cell value="3" isHeader />
                            <Cell value="Nama:" className="font-bold text-right pr-2" />
                            <Cell value={result.name} className="font-bold bg-green-50 border border-green-500" />
                         </div>
                    </div>
                </div>
            </ExcelWindow>
        </div>
    );
}

// --- SLIDE 11: XLOOKUP ---
export const XLookupDemo: React.FC = () => {
    return (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
            <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-3xl font-extrabold mb-4">XLOOKUP</h3>
                    <p className="text-lg opacity-90 mb-6">Masa depan pencarian data di Excel.</p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2"><CheckCircle2 className="text-green-300"/> Tidak perlu hitung kolom.</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="text-green-300"/> Bisa cari ke kiri.</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="text-green-300"/> Built-in error handling (Jika tidak ketemu).</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="text-green-300"/> Default: Exact Match.</li>
                    </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <div className="font-mono text-xs text-gray-600 bg-gray-50 p-2 rounded mb-2">
                        =XLOOKUP(Kunci, Kolom_Kunci, Kolom_Hasil, "Pesan Error")
                    </div>
                    <p className="text-sm text-gray-500">
                        Jauh lebih sederhana daripada VLOOKUP.
                    </p>
                </div>
            </div>

            <ExcelWindow title="Demo XLOOKUP">
                 <div className="p-4 flex flex-col items-center justify-center h-full text-center space-y-4">
                     <div className="bg-gray-100 p-6 rounded-lg w-full">
                         <h4 className="font-bold text-gray-700 mb-2">Skenario: Cari Nama dari ID</h4>
                         
                         <div className="flex flex-col gap-2 items-center">
                            <div className="bg-white p-2 rounded border border-red-300 w-full font-mono text-xs text-red-800 line-through opacity-50">
                                =VLOOKUP(H2, A2:B100, 2, 0)
                            </div>
                             <ArrowDown className="text-gray-400" />
                            <div className="bg-green-50 p-3 rounded border border-green-400 w-full font-mono text-sm font-bold text-green-800 shadow-sm">
                                =XLOOKUP(H2, A:A, B:B, "Data Tidak Ada")
                            </div>
                         </div>
                     </div>
                     <p className="text-sm text-gray-500 italic">
                         "Ambil ID di H2, cari di Kolom A, kembalikan nilai dari Kolom B. Jika ga ada, bilang 'Data Tidak Ada'."
                     </p>
                 </div>
            </ExcelWindow>
         </div>
    );
}

// --- SLIDE 12: PIVOT PREP ---
export const PivotPrepDemo: React.FC = () => {
    return (
        <div className="h-full flex flex-col gap-6">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                 <h3 className="text-2xl font-bold text-gray-800 mb-2">Syarat Wajib Pivot Table</h3>
                 <p className="text-gray-600">Sebelum Insert Pivot Table, pastikan data sumber Anda bersih!</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                 <div className="bg-red-50 p-6 rounded-xl border border-red-200 relative overflow-hidden">
                     <div className="absolute top-4 right-4 text-red-200 transform rotate-12">
                         <XCircle size={100} />
                     </div>
                     <h4 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                         <XCircle className="text-red-600"/> Data Kotor (Bad)
                     </h4>
                     <ul className="space-y-3 text-red-700 text-sm">
                         <li className="flex gap-2"><span className="font-bold text-red-500">X</span> Header merged (digabung).</li>
                         <li className="flex gap-2"><span className="font-bold text-red-500">X</span> Ada baris/kolom kosong melompong.</li>
                         <li className="flex gap-2"><span className="font-bold text-red-500">X</span> Header berulang di tengah data (subtotal manual).</li>
                         <li className="flex gap-2"><span className="font-bold text-red-500">X</span> Format laporan siap cetak.</li>
                     </ul>
                 </div>

                 <div className="bg-green-50 p-6 rounded-xl border border-green-200 relative overflow-hidden">
                      <div className="absolute top-4 right-4 text-green-200 transform rotate-12">
                         <CheckCircle2 size={100} />
                     </div>
                     <h4 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                         <CheckCircle2 className="text-green-600"/> Data Bersih (Good)
                     </h4>
                     <ul className="space-y-3 text-green-800 text-sm">
                         <li className="flex gap-2"><span className="font-bold text-green-600">✓</span> 1 Baris Header (Judul Kolom) unik.</li>
                         <li className="flex gap-2"><span className="font-bold text-green-600">✓</span> Tidak ada sel yang di-merge.</li>
                         <li className="flex gap-2"><span className="font-bold text-green-600">✓</span> Flat Data (Database style).</li>
                         <li className="flex gap-2"><span className="font-bold text-green-600">✓</span> Setiap kolom punya tipe data konsisten.</li>
                     </ul>
                 </div>
             </div>
        </div>
    );
}

// --- SLIDE 13: PIVOT OPS ---
export const PivotOpsDemo: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Hati-hati: SUM vs COUNT</h3>
                    <p className="text-gray-600 mb-4 text-sm">
                        Pivot Table kadang "sok tahu". Jika kolom berisi angka, dia pakai SUM. Jika ada teks/kosong, dia pakai COUNT.
                    </p>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <h4 className="font-bold text-yellow-800 mb-2 text-sm">Cara Memperbaiki:</h4>
                        <ol className="list-decimal list-inside text-xs text-yellow-800 space-y-2">
                            <li>Klik kanan pada angka di Pivot.</li>
                            <li>Pilih <b>"Summarize Values By"</b>.</li>
                            <li>Ganti dari <b>Count</b> ke <b>Sum</b> (atau sebaliknya).</li>
                        </ol>
                    </div>
                </div>
            </div>

            <ExcelWindow title="Simulasi Pivot">
                <div className="grid grid-cols-[30px_1fr_1fr] text-sm">
                    <Cell value="" isHeader />
                    <Cell value="Row Labels" isHeader className="bg-gray-200 text-gray-700" />
                    <Cell value="Values" isHeader className="bg-gray-200 text-gray-700" />

                    <Cell value="1" isHeader />
                    <Cell value="Produk A" className="font-bold" />
                    <Cell value="3" align="right" />

                    <Cell value="2" isHeader />
                    <Cell value="Produk B" className="font-bold" />
                    <Cell value="2" align="right" />

                    <Cell value="3" isHeader />
                    <Cell value="Grand Total" className="font-bold bg-gray-100" />
                    <Cell value="5" className="font-bold bg-gray-100" align="right" />
                </div>
                <div className="mt-4 p-3 bg-red-100 text-red-800 text-xs rounded border border-red-200">
                    <b>Masalah:</b> Kenapa Produk A cuma 3? Padahal omzetnya jutaan?<br/>
                    <b>Penyebab:</b> Pivot sedang melakukan <b>COUNT</b> (menghitung jumlah transaksi), bukan <b>SUM</b> (menjumlahkan omzet).
                </div>
            </ExcelWindow>
        </div>
    );
}

// --- SLIDE 14: PIVOT CHART ---
export const PivotChartDemo: React.FC = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
             <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 max-w-2xl w-full">
                 <div className="flex justify-center mb-6">
                     <BarChart3 size={64} className="text-blue-600" />
                 </div>
                 <h3 className="text-2xl font-bold text-gray-800 mb-2">Pivot Chart & Slicer</h3>
                 <p className="text-gray-600 mb-6">
                     Ubah tabel kaku menjadi Dashboard interaktif dalam hitungan menit.
                 </p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                     <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                         <h4 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                             <TrendingUp size={16} /> Pivot Chart
                         </h4>
                         <p className="text-xs text-gray-500">Grafik yang terhubung langsung dengan Pivot Table. Filter di tabel, grafik ikut berubah.</p>
                     </div>
                     <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                         <h4 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                             <Filter size={16} /> Slicer
                         </h4>
                         <p className="text-xs text-gray-500">Tombol filter visual yang cantik. Pengganti dropdown filter yang membosankan.</p>
                     </div>
                 </div>
             </div>
             
             <div className="bg-excel-base text-white px-6 py-3 rounded-full font-bold shadow-md animate-bounce">
                 Demo Langsung di Excel
             </div>
        </div>
    );
}

// --- SLIDE 15: TIPS & TRICKS ---
export const TipsTrickDemo: React.FC = () => {
    return (
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Paste Special: Senjata Rahasia</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Jangan asal Ctrl+V! Gunakan Paste Special untuk hasil lebih rapi.
                    </p>
                    
                    <div className="space-y-3">
                         <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-200">
                             <div className="bg-white p-2 rounded shadow-sm font-bold text-gray-700 border">123</div>
                             <div>
                                 <div className="font-bold text-gray-800">Values (Nilai)</div>
                                 <div className="text-xs text-gray-500">Hilangkan rumus, ambil hasil akhirnya saja.</div>
                             </div>
                         </div>
                         <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-200">
                             <div className="bg-white p-2 rounded shadow-sm font-bold text-gray-700 border">
                                 <LayoutDashboard size={16} />
                             </div>
                             <div>
                                 <div className="font-bold text-gray-800">Transpose</div>
                                 <div className="text-xs text-gray-500">Ubah Vertikal jadi Horizontal (dan sebaliknya).</div>
                             </div>
                         </div>
                         <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-200">
                             <div className="bg-white p-2 rounded shadow-sm font-bold text-gray-700 border">
                                 %
                             </div>
                             <div>
                                 <div className="font-bold text-gray-800">Formats</div>
                                 <div className="text-xs text-gray-500">Copy warnanya/fontnya saja, tanpa isinya.</div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-400">
                    <MousePointerClick size={48} className="mx-auto mb-2 opacity-50"/>
                    <p>Klik Kanan &gt; Paste Special</p>
                    <p className="text-xs mt-2">Shortcut: Ctrl + Alt + V</p>
                </div>
            </div>
        </div>
    );
}
