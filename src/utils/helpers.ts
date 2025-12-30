/**
 * Helper Functions - Allgemeine Utility Funktionen
 */

/**
 * Formatiere Sekunden zu MM:SS
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Formatiere Datum relativ (heute, gestern, etc.)
 */
export const formatRelativeDate = (date: Date | string): string => {
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - targetDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Heute';
  if (diffInDays === 1) return 'Gestern';
  if (diffInDays < 7) return `Vor ${diffInDays} Tagen`;
  if (diffInDays < 30) return `Vor ${Math.floor(diffInDays / 7)} Wochen`;
  if (diffInDays < 365) return `Vor ${Math.floor(diffInDays / 30)} Monaten`;
  return `Vor ${Math.floor(diffInDays / 365)} Jahren`;
};

/**
 * Shuffle Array (Fisher-Yates)
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Chunk Array in kleinere Arrays
 */
export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

/**
 * Sleep/Delay Funktion
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Debounce Funktion
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Clamp Zahl zwischen Min und Max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Berechne Prozentsatz
 */
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

/**
 * Validiere Email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generiere Random ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Capitalize First Letter
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Pluralize Word (einfache deutsche Pluralisierung)
 */
export const pluralize = (count: number, singular: string, plural: string): string => {
  return count === 1 ? singular : plural;
};

/**
 * Format Number mit Tausendertrennzeichen
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('de-DE');
};

/**
 * Deep Clone Object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if Object is Empty
 */
export const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

/**
 * Remove Duplicates from Array
 */
export const unique = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
};

/**
 * Group Array by Key
 */
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
};
