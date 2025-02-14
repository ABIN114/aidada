type EventName = string | symbol;
type EventCallbacks = Record<EventName, Record<'next' | 'tail', unknown>>;
declare class Events {
    protected callbacks?: EventCallbacks;
    static eventSplitter: string;
    // Note: Harmony ACE API 8 开发板不支持使用正则 split 字符串 /\s+/
    constructor(opts?: any);
    on(eventName: EventName, callback: (...args: any[]) => void, context?: any): this;
    once(events: EventName, callback: (...r: any[]) => void, context?: any): this;
    off(events?: EventName, callback?: (...args: any[]) => void, context?: any): this;
    trigger(events: EventName, ...args: any[]): this;
}
export { Events };
