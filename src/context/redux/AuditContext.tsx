import React, { createContext, useContext, useState } from 'react';
import { Product } from '../../types/Product';
import { AuditEntry } from '../../types/AuditEntry';
import { INITIAL_PRODUCTS } from '../../data/products';

interface AuditContextType {
  products: Product[];
  auditLogs: AuditEntry[];
  addAuditEntry: (entry: Omit<AuditEntry, 'id' | 'timestamp'>) => void;
  findProductByBarcode: (barcode: string) => Product | undefined;
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export const AuditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [auditLogs, setAuditLogs] = useState<AuditEntry[]>([]);

  const addAuditEntry = (entryData: Omit<AuditEntry, 'id' | 'timestamp'>) => {
    const newEntry: AuditEntry = {
      ...entryData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  const findProductByBarcode = (barcode: string) => {
    return products.find((p) => p.barcode === barcode);
  };

  return (
    <AuditContext.Provider value={{ products, auditLogs, addAuditEntry, findProductByBarcode }}>
      {children}
    </AuditContext.Provider>
  );
};

export const useAudit = () => {
  const context = useContext(AuditContext);
  if (!context) throw new Error('useAudit debe ser usado dentro de AuditProvider');
  return context;
};