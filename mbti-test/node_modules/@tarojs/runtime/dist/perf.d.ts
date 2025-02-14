declare class Performance {
    private recorder;
    start(id: string): void;
    stop(id: string): void;
}
declare const perf: Performance;
export { perf };
