import { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '../i18n/translations';

type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Função para detectar o idioma preferido do navegador
const getDefaultLanguage = (): Language => {
  try {
    // Lista de idiomas do navegador
    const browserLangs = navigator.languages || [navigator.language];
    
    // Procura por pt-BR ou pt em qualquer variante
    const hasPT = browserLangs.some(lang => lang.toLowerCase().startsWith('pt'));
    const hasEN = browserLangs.some(lang => lang.toLowerCase().startsWith('en'));
    
    // Se encontrar português, usa pt
    // Se encontrar inglês, usa en
    // Caso contrário, usa pt como fallback
    if (hasPT) return 'pt';
    if (hasEN) return 'en';
    return 'pt';
  } catch {
    // Em caso de erro (ex: SSR), retorna pt como fallback
    return 'pt';
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getDefaultLanguage());

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
