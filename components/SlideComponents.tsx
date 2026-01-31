import React, { useState, useEffect } from 'react';
import { Calculator, AlertCircle, ArrowRight, XCircle, CheckCircle2, Lock, Unlock, ArrowDown, ArrowUp, Copy, MousePointerClick, BarChart3, Users, Sigma, AlertTriangle, TrendingUp, Truck, Package, Clock, Split, Filter, Search, Table, LayoutDashboard, Eye, EyeOff, Grid, ChevronRight, Settings, HelpCircle, Columns, Rows, PlusSquare, MousePointer2, ChevronDown } from 'lucide-react';
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
    const [activeTab, setActiveTab] = useState<'IF' | 'IFS'>('IF');

    const ifResult = score >= 70 ? "Lulus" : "Gagal";
    const ifFormula = `=IF(B2>=70, "Lulus", "Gagal")`;

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
                    <Cell 
                        value={activeTab === 'IF' ? "C (Status)" : "C (Grade)"} 
                        isHeader 
                        className={activeTab === 'IF' ? "bg-blue-50" : "bg-purple-50"} 
                    />

                    <Cell value="1" isHeader />
                    <Cell value="Budi Santoso" />
                    <Cell value={score} isSelected={true} className="font-bold text-center" />
                    
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

    const result = data
        .filter(d => d.region === regionFilter && d.product === categoryFilter)
        .reduce((sum, item) => sum + item.sales, 0);

    const formatCurrency = (val: number) => `Rp ${val} Jt`;

    return (
        <div className="h-full flex flex-col">
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
                            
                            <div className="mb-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h4 className="font-bold text-blue-800 mb-1">1. SUMIF (Untuk Satu Kriteria Saja)</h4>
                                <p className="text-xs text-blue-700 mb-2">Urutan Rumus: Kriteria dulu di depan, Angkanya di BELAKANG.</p>
                                <div className="bg-white p-2 rounded border border-blue-200 font-mono text-[10px] sm:text-xs text-gray-600 break-all whitespace-normal">
                                    Rumus: =SUMIF(<span className="text-blue-600">Kolom_Kriteria</span>, <span className="text-green-600">"Syarat"</span>, <span className="text-red-600 font-bold">Kolom_Angka</span>)
                                </div>
                            </div>

                             <div className="mb-4 bg-purple-50 p-4 rounded-lg border border-purple-100">
                                <h4 className="font-bold text-purple-800 mb-1">2. SUMIFS (Untuk Banyak Kriteria)</h4>
                                <p className="text-xs text-purple-700 mb-2">Urutan Rumus: Angkanya dikunci di DEPAN, kriteria-kriterianya menyusul di belakang.</p>
                                <div className="bg-white p-2 rounded border border-purple-200 font-mono text-[10px] sm:text-xs text-gray-600 break-all whitespace-normal">
                                    Rumus: =SUMIFS(<span className="text-red-600 font-bold">Kolom_Angka</span>, <span className="text-blue-600">Kolom_Kriteria1</span>, <span className="text-green-600">"Syarat1"</span>, <span className="text-blue-600">Kolom_Kriteria2</span>, <span className="text-green-600">"Syarat2"</span>, ...)
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
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
    const [data, setData] = useState<(number | string)[]>([5, 12, 3, 7]);
    const [activeStat, setActiveStat] = useState<'MIN' | 'MAX' | 'AVERAGE' | null>(null);
    
    const numericData = data.filter(d => d !== "").map(d => Number(d));
    const minVal = numericData.length ? Math.min(...numericData) : 0;
    const maxVal = numericData.length ? Math.max(...numericData) : 0;
    const sum = numericData.reduce((a, b) => a + b, 0);
    const avgVal = numericData.length ? (sum / numericData.length).toFixed(1) : 0;

    const handleChange = (index: number, val: string) => {
        const newData = [...data];
        if (val === "") {
            newData[index] = "";
        } else {
            const num = parseFloat(val);
            newData[index] = isNaN(num) ? 0 : num;
        }
        setData(newData);
    };

    const isHighlighted = (val: number | string) => {
        if (val === "") return false;
        const numVal = Number(val);
        if (activeStat === 'MIN' && numVal === minVal) return true;
        if (activeStat === 'MAX' && numVal === maxVal) return true;
        if (activeStat === 'AVERAGE') return true; 
        return false;
    }

    const getHighlightClass = (val: number | string) => {
        if (!isHighlighted(val)) return '';
        if (activeStat === 'MIN') return 'bg-blue-100 ring-2 ring-blue-500 font-bold text-blue-700 z-10 transition-all';
        if (activeStat === 'MAX') return 'bg-red-100 ring-2 ring-red-500 font-bold text-red-700 z-10 transition-all';
        if (activeStat === 'AVERAGE') return 'bg-purple-50 ring-2 ring-purple-300 z-10 transition-all';
        return '';
    }

    const getFormulaDisplay = () => {
        if (activeStat === 'MIN') return `=MIN(B2:B5) -> ${minVal}`;
        if (activeStat === 'MAX') return `=MAX(B2:B5) -> ${maxVal}`;
        if (activeStat === 'AVERAGE') return `=AVERAGE(B2:B5) -> ${avgVal}`;
        return '';
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <Truck size={24} className="text-excel-base"/>
                        Logistik: Analisa Lead Time
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">Klik tombol di bawah untuk melihat fungsi statistik dalam supply chain.</p>
                    
                    <div className="space-y-3">
                        <button 
                            onClick={() => setActiveStat('MIN')}
                            className={`w-full text-left p-3 rounded border transition-all ${activeStat === 'MIN' ? 'bg-blue-50 border-blue-400 ring-1 ring-blue-400 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                        >
                            <h4 className={`font-bold text-sm ${activeStat === 'MIN' ? 'text-blue-800' : 'text-gray-800'}`}>
                                =MIN(range)
                            </h4>
                            <p className="text-xs text-gray-600 mt-1">Cari Lead Time Tercepat (Best Case).</p>
                        </button>

                        <button 
                            onClick={() => setActiveStat('MAX')}
                            className={`w-full text-left p-3 rounded border transition-all ${activeStat === 'MAX' ? 'bg-red-50 border-red-400 ring-1 ring-red-400 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                        >
                            <h4 className={`font-bold text-sm ${activeStat === 'MAX' ? 'text-red-800' : 'text-gray-800'}`}>
                                =MAX(range)
                            </h4>
                            <p className="text-xs text-gray-600 mt-1">Cari Lead Time Terlama (Bottleneck/Risk).</p>
                        </button>

                        <button 
                            onClick={() => setActiveStat('AVERAGE')}
                            className={`w-full text-left p-3 rounded border transition-all ${activeStat === 'AVERAGE' ? 'bg-purple-50 border-purple-400 ring-1 ring-purple-400 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                        >
                            <h4 className={`font-bold text-sm ${activeStat === 'AVERAGE' ? 'text-purple-800' : 'text-gray-800'}`}>
                                =AVERAGE(range)
                            </h4>
                            <p className="text-xs text-gray-600 mt-1">Rata-rata Durasi Pengiriman (Planning).</p>
                        </button>
                    </div>
                </div>

                {activeStat && (
                     <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg animate-fade-in flex items-center gap-3">
                        <div className="font-mono text-lg font-bold flex-1">
                            {getFormulaDisplay()}
                        </div>
                        <div className="text-xs text-gray-300 max-w-[150px] text-right">
                            {activeStat === 'MIN' && "Menemukan nilai 3 hari."}
                            {activeStat === 'MAX' && "Menemukan nilai 12 hari."}
                            {activeStat === 'AVERAGE' && "Menghitung rata-rata semua sel."}
                        </div>
                    </div>
                )}
            </div>

            <ExcelWindow title="Lead Time Pengiriman (Hari)">
                <FormulaBar value={getFormulaDisplay() || "Pilih fungsi di kiri..."} label="Result" />
                <div className="grid grid-cols-[30px_1fr_1fr] text-sm">
                    <Cell value="" isHeader />
                    <Cell value="A (Rute)" isHeader />
                    <Cell value="B (Hari)" isHeader />

                    <Cell value="1" isHeader />
                    <Cell value="Vendor A -> WH1" className="text-xs" />
                    <Cell value={data[0]} onChange={(v) => handleChange(0, v)} readOnly={false} className={getHighlightClass(data[0])} />

                    <Cell value="2" isHeader />
                    <Cell value="Vendor B -> WH1" className="text-xs" />
                    <Cell value={data[1]} onChange={(v) => handleChange(1, v)} readOnly={false} className={getHighlightClass(data[1])} />

                    <Cell value="3" isHeader />
                    <Cell value="Vendor C -> WH1" className="text-xs" />
                    <Cell value={data[2]} onChange={(v) => handleChange(2, v)} readOnly={false} className={getHighlightClass(data[2])} />
                    
                    <Cell value="4" isHeader />
                    <Cell value="Vendor D -> WH1" className="text-xs" />
                    <Cell value={data[3]} onChange={(v) => handleChange(3, v)} readOnly={false} className={getHighlightClass(data[3])} />

                    <Cell value="" isHeader className="bg-gray-100 border-t-2 border-gray-300" />
                    <Cell value="RESULT" className="font-bold text-gray-500 bg-gray-50 border-t-2 border-gray-300 text-right pr-2" />
                    <Cell 
                        value={
                            activeStat === 'MIN' ? minVal : 
                            activeStat === 'MAX' ? maxVal : 
                            activeStat === 'AVERAGE' ? avgVal : "-"
                        } 
                        className={`font-bold border-t-2 border-gray-300 transition-colors ${
                            activeStat === 'MIN' ? 'text-blue-700 bg-blue-50' : 
                            activeStat === 'MAX' ? 'text-red-700 bg-red-50' : 
                            activeStat === 'AVERAGE' ? 'text-purple-700 bg-purple-50' : 'text-gray-400'
                        }`} 
                    />
                </div>
                <div className="mt-4 text-xs text-gray-400 text-center flex items-center justify-center gap-1">
                    <Clock size={12} />
                    <span>Data dalam satuan Hari (Days)</span>
                </div>
            </ExcelWindow>
        </div>
    );
};

// --- SLIDE 8: COUNT FAMILY ---
export const CountFamilyDemo: React.FC = () => {
    const [selectedFunc, setSelectedFunc] = useState<'COUNT' | 'COUNTA' | 'COUNTBLANK'>('COUNTA');
    
    const gridData = [
        { id: 1, A: "Ban Truck", B: 50, C: "OK" },       
        { id: 2, A: "Oli Mesin", B: "", C: "Cek Fisik" }, 
        { id: 3, A: "Filter Udara", B: 0, C: "Habis" },   
        { id: 4, A: "Aki Basah", B: "N/A", C: "Retur" },  
    ];

    const getHighlightClass = (colVal: string | number, func: string) => {
        const isNumber = typeof colVal === 'number';
        const isEmpty = colVal === "";
        const isContent = colVal !== "";

        if (func === 'COUNT' && isNumber) return 'bg-blue-100 ring-2 ring-blue-500 z-10';
        if (func === 'COUNTA' && isContent) return 'bg-green-100 ring-2 ring-green-500 z-10';
        if (func === 'COUNTBLANK' && isEmpty) return 'bg-red-100 ring-2 ring-red-500 z-10';
        return '';
    };

    const calculateResult = () => {
        let count = 0;
        gridData.forEach(row => {
            [row.A, row.B, row.C].forEach(val => {
                const isNumber = typeof val === 'number';
                const isEmpty = val === "";
                const isContent = val !== "";

                if (selectedFunc === 'COUNT' && isNumber) count++;
                if (selectedFunc === 'COUNTA' && isContent) count++;
                if (selectedFunc === 'COUNTBLANK' && isEmpty) count++;
            });
        });
        return count;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Package size={24} className="text-excel-base"/>
                        Warehouse: Keluarga COUNT
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">Studi Kasus: <b>Audit Stok Gudang (Stock Opname)</b></p>

                    <div className="space-y-3">
                         <button 
                            onClick={() => setSelectedFunc('COUNT')}
                            className={`w-full text-left p-4 rounded-lg border transition-all ${selectedFunc === 'COUNT' ? 'bg-blue-50 border-blue-400 ring-1 ring-blue-400' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                         >
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold font-mono text-lg text-blue-800">=COUNT(...)</span>
                                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">Hanya Angka</span>
                            </div>
                            <p className="text-xs text-gray-600">Menghitung stok yang valid (Angka). Mengabaikan teks 'N/A' atau Kosong.</p>
                         </button>

                         <button 
                            onClick={() => setSelectedFunc('COUNTA')}
                            className={`w-full text-left p-4 rounded-lg border transition-all ${selectedFunc === 'COUNTA' ? 'bg-green-50 border-green-400 ring-1 ring-green-400' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                         >
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold font-mono text-lg text-green-800">=COUNTA(...)</span>
                                <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">Tidak Kosong</span>
                            </div>
                            <p className="text-xs text-gray-600">Menghitung sel terisi. Berguna untuk cek total baris data item.</p>
                         </button>

                         <button 
                            onClick={() => setSelectedFunc('COUNTBLANK')}
                            className={`w-full text-left p-4 rounded-lg border transition-all ${selectedFunc === 'COUNTBLANK' ? 'bg-red-50 border-red-400 ring-1 ring-red-400' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                         >
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold font-mono text-lg text-red-800">=COUNTBLANK(...)</span>
                                <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full">Kosong</span>
                            </div>
                            <p className="text-xs text-gray-600">Audit: Menemukan item yang <b>belum dihitung</b> (Blank).</p>
                         </button>
                    </div>
                </div>
            </div>

            <ExcelWindow title="Formulir Stock Opname">
                <FormulaBar value={`=${selectedFunc}(A2:C5)`} label="Hasil" />
                <div className="grid grid-cols-[30px_1fr_1fr_1fr] text-sm">
                    <Cell value="" isHeader />
                    <Cell value="A (Item)" isHeader />
                    <Cell value="B (Qty)" isHeader />
                    <Cell value="C (Status)" isHeader />

                    {gridData.map((row, idx) => (
                        <React.Fragment key={row.id}>
                            <Cell value={idx + 2} isHeader />
                            <Cell value={row.A} className={`transition-colors duration-300 ${getHighlightClass(row.A, selectedFunc)}`} />
                            <Cell value={row.B} className={`transition-colors duration-300 ${getHighlightClass(row.B, selectedFunc)}`} />
                            <Cell value={row.C} className={`transition-colors duration-300 ${getHighlightClass(row.C, selectedFunc)}`} />
                        </React.Fragment>
                    ))}
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded text-center">
                    <span className="text-gray-500 text-sm">Hasil Rumus: </span>
                    <span className="text-2xl font-bold ml-2 text-excel-dark">
                        {calculateResult()}
                    </span>
                    <div className="text-xs text-gray-400 mt-1">
                        (Menghitung dari seluruh range A2:C5)
                    </div>
                </div>
            </ExcelWindow>
        </div>
    );
};

// --- SLIDE 9: MEDIAN & MODE ---
export const MedianModeDemo: React.FC = () => {
    const [salaries, setSalaries] = useState([5, 5, 5, 6, 5]); 
    const [hasCEO, setHasCEO] = useState(false);
    const [selectedStat, setSelectedStat] = useState<'MEDIAN' | 'MODE'>('MEDIAN');

    const toggleCEO = () => {
        if (hasCEO) {
            setSalaries([5, 5, 5, 6, 5]);
            setHasCEO(false);
        } else {
            setSalaries([5, 5, 5, 6, 5, 100]); 
            setHasCEO(true);
        }
    };

    const sum = salaries.reduce((a, b) => a + b, 0);
    const avg = (sum / salaries.length).toFixed(1);
    
    const sorted = [...salaries].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    const mode = 5; 

    const getModeHighlight = (val: number) => {
        if (selectedStat === 'MODE' && val === mode) {
            return 'bg-orange-100 text-orange-800 font-bold ring-2 ring-orange-400 z-10';
        }
        return '';
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <TrendingUp size={24} className="text-purple-600"/>
                        Nilai Tengah & Modus
                    </h3>
                    
                    <div className="space-y-4">
                        <button 
                             onClick={() => setSelectedStat('MEDIAN')}
                             className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${selectedStat === 'MEDIAN' ? 'bg-purple-50 border-purple-400 ring-1 ring-purple-400 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                        >
                             <h4 className={`font-bold text-lg mb-1 ${selectedStat === 'MEDIAN' ? 'text-purple-800' : 'text-gray-800'}`}>
                                =MEDIAN(...)
                             </h4>
                             <p className="text-sm text-gray-600">Nilai tengah. <span className="font-semibold text-purple-700">Anti bias</span> terhadap data ekstrem (Outlier) seperti gaji CEO.</p>
                        </button>

                        <button 
                             onClick={() => setSelectedStat('MODE')}
                             className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${selectedStat === 'MODE' ? 'bg-orange-50 border-orange-400 ring-1 ring-orange-400 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                        >
                             <h4 className={`font-bold text-lg mb-1 ${selectedStat === 'MODE' ? 'text-orange-800' : 'text-gray-800'}`}>
                                =MODE.SNGL(...)
                             </h4>
                             <p className="text-sm text-gray-600">Modus. Mencari nilai yang <span className="font-semibold text-orange-700">paling sering muncul</span> (Mayoritas).</p>
                        </button>
                    </div>
                    
                    <div className="mt-6 border-t pt-4">
                        <div className="flex items-center justify-between mb-2">
                             <p className="text-sm font-semibold text-gray-700">Simulasi Data Ekstrem:</p>
                             <div className={`text-xs px-2 py-1 rounded font-bold ${hasCEO ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {hasCEO ? 'CEO AKTIF' : 'NORMAL'}
                             </div>
                        </div>
                        <button 
                            onClick={toggleCEO}
                            className={`w-full py-2 px-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${hasCEO ? 'bg-red-50 text-red-700 border border-red-300 hover:bg-red-100' : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'}`}
                        >
                            <Users size={16} />
                            {hasCEO ? "Hapus Gaji CEO" : "+ Tambah CEO (100 Juta)"}
                        </button>
                        <p className="text-xs text-gray-500 mt-2 text-center italic">
                            {hasCEO ? "Perhatikan bagaimana Rata-rata (Average) naik drastis, tapi Median tetap stabil." : "Data gaji normal, rata-rata dan median hampir sama."}
                        </p>
                    </div>
                </div>
            </div>

            <ExcelWindow title={selectedStat === 'MEDIAN' ? "Analisa Gaji (Median)" : "Analisa Gaji (Modus)"}>
                <FormulaBar 
                    value={selectedStat === 'MEDIAN' ? `=MEDIAN(C2:C${salaries.length+1})` : `=MODE.SNGL(C2:C${salaries.length+1})`} 
                    label="Hasil" 
                />
                
                <div className="grid grid-cols-[30px_1fr_1fr] text-sm">
                    <Cell value="" isHeader />
                    <Cell value="Staff" isHeader />
                    <Cell value="Gaji (Jt)" isHeader />

                    {salaries.map((sal, idx) => (
                        <React.Fragment key={idx}>
                            <Cell value={idx + 1} isHeader />
                            <Cell value={sal === 100 ? "CEO" : `Staff ${idx + 1}`} className={sal === 100 ? "font-bold text-red-600" : ""} />
                            <Cell value={sal} className={`${sal === 100 ? "font-bold text-red-600 bg-red-50" : "transition-colors duration-300"} ${getModeHighlight(sal)}`} />
                        </React.Fragment>
                    ))}
                </div>

                <div className="mt-6 space-y-3">
                    {selectedStat === 'MEDIAN' && (
                        <div className="grid grid-cols-2 gap-4 animate-fade-in">
                             <div className={`p-3 rounded border ${hasCEO ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                                <div className="text-xs text-gray-500 uppercase font-bold">Average (Rata2)</div>
                                <div className={`text-2xl font-bold ${hasCEO ? 'text-red-600' : 'text-gray-800'}`}>{avg} Jt</div>
                                {hasCEO && <div className="text-[10px] text-red-500 mt-1 leading-tight">Terpengaruh CEO! Tidak representatif.</div>}
                             </div>
                             <div className="p-3 rounded border bg-purple-50 border-purple-200 ring-2 ring-purple-400">
                                <div className="text-xs text-purple-600 uppercase font-bold">Median (Tengah)</div>
                                <div className="text-2xl font-bold text-purple-800">{median} Jt</div>
                                <div className="text-[10px] text-purple-600 mt-1 leading-tight">Stabil. Mewakili mayoritas staff.</div>
                             </div>
                        </div>
                    )}

                    {selectedStat === 'MODE' && (
                        <div className="animate-fade-in">
                             <div className="p-4 rounded border bg-orange-50 border-orange-200 ring-2 ring-orange-400 flex justify-between items-center">
                                <div>
                                    <div className="text-xs text-orange-600 uppercase font-bold">Mode (Modus)</div>
                                    <div className="text-[10px] text-orange-600 mt-1">Angka yang paling sering muncul</div>
                                </div>
                                <div className="text-3xl font-bold text-orange-800">{mode} Jt</div>
                             </div>
                             <div className="mt-2 text-xs text-center text-gray-500">
                                Lihat sel yang di-highlight oranye di atas.
                             </div>
                        </div>
                    )}
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
    const resultPhone = result ? result.phone : "#N/A";

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

                    {lookupType === 'VLOOKUP' ? (
                        <div className="bg-green-50 p-3 rounded border border-green-200 text-xs text-green-900 mb-4 animate-fade-in">
                            <h4 className="font-bold mb-1">VLOOKUP (Tegak Lurus)</h4>
                            <p className="mb-2">Digunakan saat data referensi tersusun ke bawah (Vertikal).</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Mencari kunci (ID) di <b>Kolom Paling Kiri</b>.</li>
                                <li>Jika ketemu, bergerak ke <b>Kanan</b> untuk mengambil data (sesuai nomor kolom).</li>
                            </ul>
                        </div>
                    ) : (
                        <div className="bg-blue-50 p-3 rounded border border-blue-200 text-xs text-blue-900 mb-4 animate-fade-in">
                             <h4 className="font-bold mb-1">HLOOKUP (Mendatar)</h4>
                             <p className="mb-2">Digunakan saat data referensi tersusun ke samping (Horizontal).</p>
                             <ul className="list-disc list-inside space-y-1">
                                 <li>Mencari kunci (ID) di <b>Baris Paling Atas</b>.</li>
                                 <li>Jika ketemu, bergerak ke <b>Bawah</b> untuk mengambil data (sesuai nomor baris).</li>
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
                    <div className="grid grid-cols-[30px_1fr_1fr_1fr] text-sm">
                        <Cell value="" isHeader />
                        <Cell value="A (ID)" isHeader />
                        <Cell value="B (Nama)" isHeader />
                        <Cell value="C (Telp)" isHeader />

                        {masterData.map((row, idx) => (
                            <React.Fragment key={idx}>
                                <Cell value={idx + 2} isHeader />
                                <Cell value={row.id} className={row.id === searchId ? "bg-yellow-100 font-bold" : ""} />
                                <Cell value={row.name} className={row.id === searchId ? "bg-green-100 font-bold border-2 border-green-500" : ""} />
                                <Cell value={row.phone} />
                            </React.Fragment>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-[80px_1fr_1fr_1fr] text-sm">
                         <Cell value="" isHeader />
                         <Cell value="B" isHeader />
                         <Cell value="C" isHeader />
                         <Cell value="D" isHeader />

                         <Cell value="1 (ID)" isHeader />
                         {masterData.map(d => <Cell key={d.id} value={d.id} className={d.id === searchId ? "bg-yellow-100 font-bold" : ""} />)}

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-600">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <Search className="text-blue-600" />
                        XLOOKUP: The Modern Way
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                        Jangan VLOOKUP! Jika Anda pakai Office 365/2021, gunakan ini.
                    </p>
                    
                    <div className="bg-gray-100 p-3 rounded font-mono text-xs text-gray-700 border border-gray-300 mb-4">
                        =XLOOKUP(<span className="text-blue-600">Kunci</span>, <span className="text-yellow-600">Kolom_Cari</span>, <span className="text-green-600">Kolom_Hasil</span>, "Pesan Error")
                    </div>

                    <ul className="space-y-2 text-sm text-gray-500">
                        <li className="flex gap-2 items-center">
                            <CheckCircle2 size={16} className="text-green-500" />
                            <span><b>Bisa cari ke kiri</b> (Vlookup tidak bisa).</span>
                        </li>
                        <li className="flex gap-2 items-center">
                            <CheckCircle2 size={16} className="text-green-500" />
                            <span>Tidak perlu hitung nomor kolom (1, 2, 3...).</span>
                        </li>
                         <li className="flex gap-2 items-center">
                            <CheckCircle2 size={16} className="text-green-500" />
                            <span>Anti Error: Bisa langsung set teks "Data Tidak Ditemukan".</span>
                        </li>
                    </ul>
                </div>
            </div>

            <ExcelWindow title="XLOOKUP Demo">
                <FormulaBar value='=XLOOKUP("102", A:A, B:B, "Tidak Ada")' />
                
                <div className="grid grid-cols-[40px_1fr_1fr] text-sm border-t border-l border-gray-300 bg-white shadow-sm mb-4">
                    <Cell value="" isHeader />
                    <Cell value="A" isHeader className="bg-yellow-50 text-yellow-800 font-bold border-b-2 border-yellow-300"/>
                    <Cell value="B" isHeader className="bg-green-50 text-green-800 font-bold border-b-2 border-green-300"/>

                    <Cell value="1" isHeader />
                    <Cell value="ID" className="font-bold bg-gray-50"/>
                    <Cell value="Nama" className="font-bold bg-gray-50"/>

                    <Cell value="2" isHeader />
                    <Cell value="101" />
                    <Cell value="Andi" />

                    <Cell value="3" isHeader />
                    <Cell value="102" className="bg-yellow-100 ring-2 ring-yellow-400 z-10 font-bold" />
                    <Cell value="Budi" className="bg-green-100 ring-2 ring-green-500 z-10 font-bold" />

                    <Cell value="4" isHeader />
                    <Cell value="103" />
                    <Cell value="Cici" />
                </div>

                <div className="grid grid-cols-[40px_1fr_1fr] gap-2 text-xs">
                    <div></div>
                    
                    <div className="flex flex-col items-center p-2 bg-yellow-50 border border-yellow-300 rounded-lg text-yellow-800 animate-fade-in">
                        <ArrowUp size={16} className="mb-1 text-yellow-600 animate-bounce" />
                        <span className="font-bold">1. Cari di sini</span>
                        <span className="opacity-75 text-[10px]">(Kolom A)</span>
                    </div>

                    <div className="flex flex-col items-center p-2 bg-green-50 border border-green-300 rounded-lg text-green-800 animate-fade-in">
                        <ArrowUp size={16} className="mb-1 text-green-600 animate-bounce" />
                        <span className="font-bold">2. Ambil ini</span>
                         <span className="opacity-75 text-[10px]">(Kolom B)</span>
                    </div>
                </div>
            </ExcelWindow>
        </div>
    );
};

// --- SLIDE 12: PIVOT PREP ---
export const PivotPrepDemo: React.FC = () => {
    return (
        <div className="grid grid-cols-1 gap-6 h-full">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Pivot Table: Preparation & Rules</h3>
                <p className="text-gray-500">Sebelum Insert Pivot, pastikan datanya "Bersih"!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border border-red-200 bg-red-50 rounded-xl p-4">
                    <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2"><XCircle/> Data Berantakan (Pivot Gagal)</h4>
                    <div className="bg-white rounded border overflow-hidden opacity-70">
                        <div className="grid grid-cols-3 text-xs gap-[1px] bg-gray-300 border border-gray-300">
                             <div className="bg-red-100 p-2 col-span-3 text-center font-bold">Laporan Keuangan (Merged)</div>
                             <div className="bg-gray-100 p-2 font-bold">Bulan</div>
                             <div className="bg-white p-2 text-red-500 italic">?? (Kosong)</div>
                             <div className="bg-gray-100 p-2 font-bold">Sales</div>
                             <div className="bg-white p-2">Jan</div>
                             <div className="bg-white p-2">Laptop</div>
                             <div className="bg-white p-2">10jt</div>
                        </div>
                    </div>
                    <ul className="mt-4 text-xs text-red-800 list-disc list-inside space-y-1">
                        <li>Header bertumpuk/Merged Cells.</li>
                        <li>Ada kolom kosong tanpa judul.</li>
                        <li>Ada baris kosong memutus data.</li>
                    </ul>
                </div>

                <div className="border border-green-200 bg-green-50 rounded-xl p-4">
                    <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2"><CheckCircle2/> Data Bersih (Pivot Ready)</h4>
                    <div className="bg-white rounded border overflow-hidden">
                        <div className="grid grid-cols-3 text-xs gap-[1px] bg-gray-300 border border-gray-300">
                             <div className="bg-green-100 p-2 font-bold">Bulan</div>
                             <div className="bg-green-100 p-2 font-bold">Produk</div>
                             <div className="bg-green-100 p-2 font-bold">Sales</div>
                             <div className="bg-white p-2">Jan</div>
                             <div className="bg-white p-2">Laptop</div>
                             <div className="bg-white p-2">10jt</div>
                             <div className="bg-white p-2">Feb</div>
                             <div className="bg-white p-2">Mouse</div>
                             <div className="bg-white p-2">5jt</div>
                        </div>
                    </div>
                     <ul className="mt-4 text-xs text-green-800 list-disc list-inside space-y-1">
                        <li><b>Single Header Row:</b> Satu baris judul saja.</li>
                        <li><b>No Blank Columns:</b> Semua kolom punya judul.</li>
                        <li><b>Flat Data:</b> Data mentah, tanpa subtotal.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// --- SLIDE 13: PIVOT CREATE (NEW) ---
export const PivotCreateDemo: React.FC = () => {
    const [step, setStep] = useState(0);

    const steps = [
        { title: "Mulai", desc: "Data sudah siap." },
        { title: "1. Select Data", desc: "Klik sembarang sel -> Ctrl+A" },
        { title: "2. Menu Insert", desc: "Klik tab Insert" },
        { title: "3. Create", desc: "Pilih New Worksheet -> OK" }
    ];

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
        else setStep(0);
    }

    // High fidelity data from Attachment 1
    const gridData = [
        { date: "1/29/2026", name: "TELEFLEX", source: "1998", branch: "1910 Jakarta 1", grp: "3", code: "100380-000025", pName: "TRACHEAL TUBE WITHOUT CUFF 2.5", sj: "8994113183", sjDate: "1/29/2026", qty: 20 },
        { date: "1/29/2026", name: "TELEFLEX", source: "1998", branch: "1922 Bandung", grp: "3", code: "100380-000030", pName: "TRACHEAL TUBE WITHOUT CUFF 3.0", sj: "8994100109", sjDate: "1/22/2026", qty: 10 },
        { date: "1/29/2026", name: "TELEFLEX", source: "1998", branch: "1910 Jakarta 1", grp: "3", code: "100380-000030", pName: "TRACHEAL TUBE WITHOUT CUFF 3.0", sj: "8994113183", sjDate: "1/29/2026", qty: 30 },
        { date: "1/29/2026", name: "TELEFLEX", source: "1998", branch: "1961 Makassar", grp: "3", code: "100380-000030", pName: "TRACHEAL TUBE WITHOUT CUFF 3.0", sj: "8994116104", sjDate: "1/29/2026", qty: 20 },
        { date: "1/29/2026", name: "TELEFLEX", source: "1998", branch: "1910 Jakarta 1", grp: "3", code: "100380-000035", pName: "TRACHEAL TUBE WITHOUT CUFF 3.5", sj: "8994113184", sjDate: "1/29/2026", qty: 30 },
        { date: "1/29/2026", name: "PT BEURER HEAL...", source: "1998", branch: "1954 BATAM", grp: "3", code: "10385", pName: "IH 51 - NEBULIZER 51", sj: "8994090649", sjDate: "1/15/2026", qty: 4 },
        { date: "1/29/2026", name: "PT BEURER HEAL...", source: "1998", branch: "1960 Manado", grp: "3", code: "10385", pName: "IH 51 - NEBULIZER 51", sj: "8994090650", sjDate: "1/15/2026", qty: 4 },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center">
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-excel-base">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Table className="text-excel-base" />
                        Langkah Pembuatan Pivot Table
                    </h3>
                    
                    <div className="space-y-4 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-gray-200 -z-10"></div>

                        {steps.slice(1).map((s, idx) => {
                            const currentIdx = idx + 1;
                            const isActive = step >= currentIdx;
                            const isCurrent = step === currentIdx;
                            return (
                                <div key={idx} className={`flex items-start gap-3 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 shrink-0 ${isActive ? 'bg-excel-base text-white border-excel-base' : 'bg-white border-gray-300 text-gray-400'}`}>
                                        {currentIdx}
                                    </div>
                                    <div className={`p-3 rounded-lg border w-full ${isCurrent ? 'bg-green-50 border-green-200 ring-2 ring-green-400' : 'bg-white border-gray-200'}`}>
                                        <h4 className="font-bold text-sm text-gray-800">{s.title.substring(3)}</h4>
                                        <p className="text-xs text-gray-600">{s.desc}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 text-blue-800 text-xs rounded-lg border border-blue-200">
                        <span className="font-bold block mb-1">💡 Pro Tip:</span>
                        Jangan blok manual pakai mouse dari atas sampai bawah. Cukup klik satu sel di tengah data, lalu tekan <b>Ctrl + A</b>.
                    </div>
                </div>

                <button 
                    onClick={nextStep}
                    className="w-full py-3 bg-excel-dark text-white rounded-lg font-bold hover:bg-excel-base transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                    {step === 3 ? "Ulangi Langkah" : "Lanjut Langkah Berikutnya"} <ArrowRight size={16} />
                </button>
            </div>

            <ExcelWindow title="Latihan Pivot Table">
                <div className="relative h-full flex flex-col">
                    {/* --- STEP 2: INSERT MENU OVERLAY (Attachment 2) --- */}
                    {step === 2 && (
                        <div className="absolute top-0 left-0 right-0 z-40 bg-gray-100 border-b shadow-lg animate-fade-in">
                            <div className="flex bg-excel-base text-white px-2 py-1 text-xs gap-4">
                                <span>File</span><span>Home</span><span className="font-bold underline">Insert</span><span>Page Layout</span>
                            </div>
                            <div className="p-2 flex gap-4 bg-gray-50 border-b border-gray-300">
                                {/* PivotTable Button Group */}
                                <div className="flex flex-col items-center px-2 bg-gray-200 rounded border border-gray-300 relative group">
                                    <div className="p-1"><Table className="text-excel-base" size={24}/></div>
                                    <div className="text-[10px] font-bold flex items-center">PivotTable <ChevronDown size={10}/></div>
                                    
                                    {/* Dropdown Menu */}
                                    <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-xl border border-gray-300 rounded z-50">
                                        <div className="p-2 hover:bg-gray-100 flex items-center gap-2 text-xs font-bold border-l-4 border-excel-base bg-gray-50">
                                            <Table size={14}/> From Table/Range
                                        </div>
                                        <div className="p-2 hover:bg-gray-100 flex items-center gap-2 text-xs text-gray-500">
                                            From External Data Source
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col items-center opacity-50">
                                    <div className="p-1"><Table className="text-gray-500" size={24}/></div>
                                    <div className="text-[10px]">Recommended PivotTables</div>
                                </div>
                                <div className="flex flex-col items-center opacity-50">
                                    <div className="p-1"><Table className="text-gray-500" size={24}/></div>
                                    <div className="text-[10px]">Table</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- DATA GRID (Attachment 1) --- */}
                    <div className="overflow-auto relative bg-white">
                        <div className="grid grid-cols-[30px_80px_150px_60px_100px_40px_100px_150px_80px_80px_60px] text-[10px] whitespace-nowrap">
                            {/* Header Row */}
                            <Cell value="" isHeader />
                            <Cell value="A" isHeader />
                            <Cell value="B" isHeader />
                            <Cell value="C" isHeader />
                            <Cell value="D" isHeader />
                            <Cell value="E" isHeader />
                            <Cell value="F" isHeader />
                            <Cell value="G" isHeader />
                            <Cell value="H" isHeader />
                            <Cell value="I" isHeader />
                            <Cell value="J" isHeader />

                            {/* Column Headers - Green Style */}
                            <Cell value="1" isHeader />
                            <Cell value="ReportDate" className="bg-[#66BB6A] text-white font-bold border-r border-white"/>
                            <Cell value="PrincipalName" className="bg-[#66BB6A] text-white font-bold border-r border-white"/>
                            <Cell value="SOURCE" className="bg-[#66BB6A] text-white font-bold border-r border-white"/>
                            <Cell value="Destination Branch" className="bg-[#66BB6A] text-white font-bold border-r border-white"/>
                            <Cell value="TRGRP" className="bg-[#66BB6A] text-white font-bold border-r border-white"/>
                            <Cell value="PRODUCT_CODE" className="bg-[#66BB6A] text-white font-bold border-r border-white"/>
                            <Cell value="PRODUCT_NAME" className="bg-[#66BB6A] text-white font-bold border-r border-white"/>
                            <Cell value="SJ" className="bg-[#66BB6A] text-white font-bold border-r border-white"/>
                            <Cell value="SJ_DATE" className="bg-[#66BB6A] text-white font-bold border-r border-white"/>
                            <Cell value="SJ_QTY" className="bg-[#66BB6A] text-white font-bold"/>

                            {/* Data Rows */}
                            {gridData.map((row, idx) => (
                                <React.Fragment key={idx}>
                                    <Cell value={idx + 2} isHeader />
                                    <Cell value={row.date} className="font-bold text-right pr-2"/>
                                    <Cell value={row.name} className="font-bold"/>
                                    <Cell value={row.source} className="text-right pr-2"/>
                                    <Cell value={row.branch} />
                                    <Cell value={row.grp} className="text-right pr-2"/>
                                    <Cell value={row.code} />
                                    <Cell value={row.pName} />
                                    <Cell value={row.sj} />
                                    <Cell value={row.sjDate} className="text-right pr-2"/>
                                    <Cell value={row.qty} className="text-right pr-2"/>
                                </React.Fragment>
                            ))}
                        </div>

                        {/* Step 1: Selection Overlay (Green Border like Attachment 1) */}
                        {step >= 1 && step !== 3 && (
                            <div className="absolute top-[28px] left-[30px] right-0 h-[200px] border-2 border-excel-base bg-excel-base/10 pointer-events-none z-10"></div>
                        )}
                    </div>

                    {/* --- STEP 3: CREATE DIALOG (Attachment 3) --- */}
                    {step === 3 && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-[1px] animate-fade-in">
                            <div className="bg-white p-1 rounded shadow-2xl w-80 border border-gray-400 font-sans text-xs">
                                <div className="flex justify-between items-center px-2 py-1 mb-2 bg-white">
                                    <span className="font-bold text-gray-800">PivotTable from table or range</span>
                                    <XCircle size={14} className="text-gray-400"/>
                                </div>
                                
                                <div className="px-3 pb-3 space-y-3">
                                    <div>
                                        <div className="mb-1 font-bold text-gray-700">Select a table or range</div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-600">Table/Range:</span>
                                            <div className="border border-gray-300 px-2 py-1 bg-white flex-1 shadow-inner">Table2</div>
                                            <div className="border border-gray-300 bg-gray-100 px-1 py-0.5"><ArrowUp size={12}/></div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-2">
                                        <div className="mb-1 font-bold text-gray-700">Choose where you want the PivotTable to be placed</div>
                                        <div className="space-y-1 ml-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full border-4 border-blue-600"></div>
                                                <span className="font-bold">New Worksheet</span>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-60">
                                                <div className="w-3 h-3 rounded-full border border-gray-400"></div>
                                                <span>Existing Worksheet</span>
                                            </div>
                                            <div className="ml-5 mt-1 border border-gray-300 bg-gray-100 h-5 w-32 opacity-50"></div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-2 opacity-60">
                                        <div className="mb-1 font-bold text-gray-700">Choose whether you want to analyze multiple tables</div>
                                        <div className="flex items-center gap-2 ml-1">
                                            <div className="w-3 h-3 border border-gray-400 bg-white"></div>
                                            <span>Add this data to the Data Model</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2 mt-4">
                                        <button className="px-4 py-1 border border-gray-300 rounded shadow-sm bg-white hover:bg-gray-50">OK</button>
                                        <button className="px-4 py-1 border border-gray-300 rounded shadow-sm bg-white hover:bg-gray-50">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </ExcelWindow>
        </div>
    );
}

// --- SLIDE 14: PIVOT ANATOMY (NEW) ---
export const PivotAnatomyDemo: React.FC = () => {
    const [activeQuad, setActiveQuad] = useState<'ROWS' | 'COLS' | 'VALS' | 'FILT' | null>(null);

    const info = {
        ROWS: {
            title: "ROWS (Baris)",
            desc: "Menampilkan data secara vertikal (turun ke bawah). Cocok untuk data utama yang itemnya banyak seperti Nama Sales, Tanggal, atau Nama Produk.",
            color: "bg-blue-50 border-blue-500 text-blue-800"
        },
        COLS: {
            title: "COLUMNS (Kolom)",
            desc: "Menampilkan data secara horizontal (menyamping). Cocok untuk pembanding seperti Tahun, Bulan, atau Wilayah. Hati-hati jangan taruh data yang terlalu panjang di sini.",
            color: "bg-orange-50 border-orange-500 text-orange-800"
        },
        VALS: {
            title: "VALUES (Nilai)",
            desc: "Area untuk BERHITUNG (Sum, Count, Average). Hanya masukkan kolom yang berisi ANGKA (Harga, Qty, Total) di sini.",
            color: "bg-green-50 border-green-500 text-green-800"
        },
        FILT: {
            title: "FILTERS (Saringan)",
            desc: "Saringan global. Menyaring seluruh tabel berdasarkan kriteria tertentu. Contoh: Lihat laporan penjualan (Rows), tapi difilter hanya 'Cabang Jakarta'.",
            color: "bg-purple-50 border-purple-500 text-purple-800"
        }
    }

    const currentInfo = activeQuad ? info[activeQuad] : null;

    return (
        <div className="h-full flex flex-col">
            <div className="mb-4 text-center">
                 <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
                    <LayoutDashboard className="text-excel-base" />
                    Anatomi Pivot Table (4 Kuadran)
                </h3>
                <p className="text-sm text-gray-500">Klik salah satu kotak di bawah untuk mempelajari fungsinya.</p>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
                {/* Visual Representation */}
                <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 relative">
                     <div className="absolute top-2 left-2 text-xs font-bold text-gray-400">PivotTable Fields</div>
                     
                     <div className="mt-6 grid grid-cols-2 gap-4 h-64">
                        {/* FILTERS */}
                        <button 
                            onClick={() => setActiveQuad('FILT')}
                            className={`rounded-lg border-2 p-2 flex flex-col items-center justify-center text-center transition-all hover:scale-105 ${activeQuad === 'FILT' ? 'bg-purple-100 border-purple-500 ring-2 ring-purple-300' : 'bg-gray-50 border-dashed border-gray-300'}`}
                        >
                            <Filter className={activeQuad === 'FILT' ? "text-purple-600" : "text-gray-400"} />
                            <span className="text-xs font-bold mt-1 text-gray-600">FILTERS</span>
                        </button>

                         {/* COLUMNS */}
                         <button 
                            onClick={() => setActiveQuad('COLS')}
                            className={`rounded-lg border-2 p-2 flex flex-col items-center justify-center text-center transition-all hover:scale-105 ${activeQuad === 'COLS' ? 'bg-orange-100 border-orange-500 ring-2 ring-orange-300' : 'bg-gray-50 border-dashed border-gray-300'}`}
                        >
                            <Columns className={activeQuad === 'COLS' ? "text-orange-600" : "text-gray-400"} />
                            <span className="text-xs font-bold mt-1 text-gray-600">COLUMNS</span>
                        </button>

                         {/* ROWS */}
                         <button 
                            onClick={() => setActiveQuad('ROWS')}
                            className={`rounded-lg border-2 p-2 flex flex-col items-center justify-center text-center transition-all hover:scale-105 ${activeQuad === 'ROWS' ? 'bg-blue-100 border-blue-500 ring-2 ring-blue-300' : 'bg-gray-50 border-dashed border-gray-300'}`}
                        >
                            <Rows className={activeQuad === 'ROWS' ? "text-blue-600" : "text-gray-400"} />
                            <span className="text-xs font-bold mt-1 text-gray-600">ROWS</span>
                        </button>

                         {/* VALUES */}
                         <button 
                            onClick={() => setActiveQuad('VALS')}
                            className={`rounded-lg border-2 p-2 flex flex-col items-center justify-center text-center transition-all hover:scale-105 ${activeQuad === 'VALS' ? 'bg-green-100 border-green-500 ring-2 ring-green-300' : 'bg-gray-50 border-dashed border-gray-300'}`}
                        >
                            <Sigma className={activeQuad === 'VALS' ? "text-green-600" : "text-gray-400"} />
                            <span className="text-xs font-bold mt-1 text-gray-600">VALUES</span>
                        </button>
                     </div>
                     <div className="mt-4 text-center text-xs text-gray-400 italic">
                        Drag & Drop fields ke kotak-kotak ini
                     </div>
                </div>

                {/* Explanation Area */}
                <div className="flex flex-col justify-center">
                    {currentInfo ? (
                        <div className={`p-8 rounded-xl border-l-8 shadow-sm transition-all animate-fade-in ${currentInfo.color}`}>
                            <h2 className="text-2xl font-bold mb-4">{currentInfo.title}</h2>
                            <p className="text-lg leading-relaxed">{currentInfo.desc}</p>
                            
                            {activeQuad === 'ROWS' && <div className="mt-4 text-sm font-bold opacity-75">Contoh: Daftar Nama Karyawan</div>}
                            {activeQuad === 'COLS' && <div className="mt-4 text-sm font-bold opacity-75">Contoh: Tahun (2023, 2024), Bulan</div>}
                            {activeQuad === 'VALS' && <div className="mt-4 text-sm font-bold opacity-75">Contoh: Sum of Sales, Count of Transaksi</div>}
                            {activeQuad === 'FILT' && <div className="mt-4 text-sm font-bold opacity-75">Contoh: Filter hanya Wilayah 'Bali'</div>}
                        </div>
                    ) : (
                         <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                            <MousePointer2 size={48} className="mb-2 opacity-50" />
                            <p>Pilih area di sebelah kiri untuk melihat detailnya</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// --- SLIDE 15: PIVOT OPS ---
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
    // Fix: cast colField to avoid TS error about 'none' index
    const colKeys = colField !== 'none' && colField !== rowField
        ? Array.from(new Set(sourceData.map(d => d[colField as keyof typeof d]))).sort()
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
                                            const cellData = rowData.filter(d => d[colField as keyof typeof d] === cKey);
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
                                    const colData = sourceData.filter(d => d[colField as keyof typeof d] === cKey);
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

// --- SLIDE 16: PIVOT CHART ---
export const PivotChartDemo: React.FC = () => {
    const [filter, setFilter] = useState('All');
    
    // Mock data for chart visualization
    const data = {
        'All': [40, 60, 30],
        'Jakarta': [25, 40, 10],
        'Bandung': [15, 20, 20]
    };

    const currentData = data[filter as keyof typeof data];

    return (
         <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 h-full">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Filter size={18} /> Slicer
                </h3>
                <div className="space-y-2">
                    {['All', 'Jakarta', 'Bandung'].map(city => (
                        <button 
                            key={city}
                            onClick={() => setFilter(city)}
                            className={`w-full p-2 text-left rounded text-sm transition-colors ${filter === city ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-800 hover:bg-blue-100'}`}
                        >
                            {city}
                        </button>
                    ))}
                </div>
                <div className="mt-auto border-t pt-4">
                     <h4 className="font-bold text-gray-700 text-xs mb-2 flex items-center gap-1">
                        <HelpCircle size={12}/> Cara Insert Slicer:
                     </h4>
                     <ol className="list-decimal list-inside text-xs text-gray-600 space-y-1">
                        <li>Klik pada Pivot Chart / Table.</li>
                        <li>Menu <b>PivotChart Analyze</b> &gt; <b>Insert Slicer</b>.</li>
                        <li>Pilih kolom (misal: Region).</li>
                     </ol>
                </div>
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

// --- SLIDE 17: TIPS & TRICK ---
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