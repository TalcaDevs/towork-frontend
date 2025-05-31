export class StorageUtil {
  private static isClient = typeof window !== 'undefined';

  static getItem(key: string): string | null {
    if (!this.isClient) return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting item from storage: ${key}`, error);
      return null;
    }
  }
  static getBooleanItem(key: string): boolean | null {
    const value = this.getItem(key);
    if (value === null) return null;
    if (value === 'true') return true;
    if (value === 'false') return false;
    return null;
  }

  static setItemFlexible(key: string, value: string | boolean): boolean {
    const stringValue = typeof value === 'boolean' ? value.toString() : value;
    return this.setItem(key, stringValue);
  }
  
  static setItem(key: string, value: string): boolean {
    if (!this.isClient) return false;
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Error setting item in storage: ${key}`, error);
      return false;
    }
  }

  static removeItem(key: string): boolean {
    if (!this.isClient) return false;
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item from storage: ${key}`, error);
      return false;
    }
  }
}