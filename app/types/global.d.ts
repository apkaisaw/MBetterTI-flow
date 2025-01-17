export {};

declare global {
  interface Window {
    lucide: {
      createIcons: () => void;
    };
  }
} 