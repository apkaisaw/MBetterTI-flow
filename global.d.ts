interface Window {
  ethereum?: {
    request: (args: { method: string }) => Promise<unknown>;
    on: (eventName: string, callback: (...args: unknown[]) => void) => void;
  };
  lucide?: {
    createIcons: () => void;
  };
}
