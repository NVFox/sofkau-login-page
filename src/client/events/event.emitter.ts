export type EventHandler<T> = (payload?: T) => void;

export class EventEmitter<T> {
    private listeners: Map<string, EventHandler<T>[]> = new Map(); 

    public emit(event: string, payload?: T) {
        const listeners = this.listeners.get(event);

        if (!listeners) 
            return;

        listeners.forEach(listener => listener(payload));
    }

    public on(event: string, handler: EventHandler<T>) {
        const listeners = this.listeners.get(event) || [];

        listeners.push(handler);

        this.listeners.set(event, listeners);
    }
}