import { atom } from 'nanostores';

export const isDarkMode = atom<boolean>(false);

export class ThemeService {
  static init() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    isDarkMode.set(shouldUseDark);
    this.updateDOM(shouldUseDark);
  }

  static toggle() {
    const newValue = !isDarkMode.get();
    isDarkMode.set(newValue);
    localStorage.setItem('theme', newValue ? 'dark' : 'light');
    this.updateDOM(newValue);
  }

  static updateDOM(dark: boolean) {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}