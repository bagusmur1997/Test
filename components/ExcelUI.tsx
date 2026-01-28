import React from 'react';
import { AlignLeft, Check, X } from 'lucide-react';

export const Cell: React.FC<{
  value: React.ReactNode | string | number;
  isSelected?: boolean;
  isHeader?: boolean;
  label?: string;
  className?: string;
  onClick?: () => void;
  onChange?: (val: string) => void;
  readOnly?: boolean;
  align?: 'left' | 'center' | 'right';
}> = ({ value, isSelected, isHeader, label, className = '', onClick, onChange, readOnly = true, align = 'left' }) => {
  if (isHeader) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 border-r border-b border-gray-300 text-gray-600 font-semibold text-xs select-none ${className}`}>
        {label}
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={`relative border-r border-b border-gray-200 bg-white flex items-center px-2 text-sm text-gray-800 cursor-cell transition-colors
        ${isSelected ? 'ring-2 ring-excel-base z-10' : ''} 
        ${!readOnly ? 'bg-white' : ''}
        ${className}
      `}
      style={{ justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start' }}
    >
      {!readOnly ? (
        <input 
          autoFocus={isSelected}
          type="text" 
          className="w-full h-full outline-none bg-transparent"
          value={String(value)}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
      ) : (
        <span className="truncate w-full">{value}</span>
      )}
      
      {isSelected && (
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-excel-base translate-x-1/2 translate-y-1/2 border border-white" />
      )}
    </div>
  );
};

export const FormulaBar: React.FC<{ value: string; label?: string }> = ({ value, label = "A1" }) => (
  <div className="flex items-center gap-2 mb-2 bg-white p-1 rounded border border-gray-300 shadow-sm">
    <div className="w-10 text-xs text-center font-bold text-gray-500 border-r border-gray-300 pr-2">
      {label}
    </div>
    <div className="flex gap-2 text-gray-400 px-1">
      <X size={14} />
      <Check size={14} />
      <div className="w-px h-4 bg-gray-300 mx-1"></div>
    </div>
    <div className="flex-1 font-mono text-sm text-gray-800 truncate">
      {value}
    </div>
  </div>
);

export const ExcelWindow: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <div className={`bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden flex flex-col ${className}`}>
    <div className="bg-excel-dark text-white px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <AlignLeft size={16} className="text-white" />
        <span className="text-xs font-medium tracking-wide">Excel Tutorial - {title}</span>
      </div>
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
      </div>
    </div>
    {/* Ribbon Mockup */}
    <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex gap-4 overflow-hidden">
       {['File', 'Home', 'Insert', 'Formulas', 'Data'].map(menu => (
         <span key={menu} className={`text-xs cursor-pointer ${menu === 'Formulas' ? 'text-excel-dark font-bold border-b-2 border-excel-dark' : 'text-gray-600'}`}>
           {menu}
         </span>
       ))}
    </div>
    <div className="flex-1 overflow-auto bg-gray-100 p-4 relative">
      {children}
    </div>
  </div>
);