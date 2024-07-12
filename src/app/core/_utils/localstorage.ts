export class LocalStorageUtils {

     clearLoggedData(key: string) {
      localStorage.removeItem(key);
    }
  
     getItem(key: string): any {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : null;
    }
      
     setItem(key: string, value: any): void {
      localStorage.setItem(key, JSON.stringify(value));
    }
      
     removeItem(key: string): void {
      localStorage.removeItem(key);
    }
  }