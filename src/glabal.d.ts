export {};

interface PuterAI {
  chat: (prompt: string) => Promise<{ message?: { content?: string } } | string>;
}

declare global {
  interface Window {
    puter?: {
      ai?: PuterAI;
    };
  }
}