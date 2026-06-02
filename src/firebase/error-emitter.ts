'use client';

type Listener = (...args: any[]) => void;

class BrowserEventEmitter {
  private listeners: Map<string, Listener[]> = new Map();

  on(event: string, listener: Listener) {
    if (!this.listeners.has(event)) this.listeners.set(event, []);
    this.listeners.get(event)!.push(listener);
  }

  off(event: string, listener: Listener) {
    const list = this.listeners.get(event);
    if (list) this.listeners.set(event, list.filter((l) => l !== listener));
  }

  emit(event: string, ...args: any[]) {
    this.listeners.get(event)?.forEach((l) => l(...args));
  }
}

export const errorEmitter = new BrowserEventEmitter();
