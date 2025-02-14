interface ITimeoutID {
    id: number;
}
declare function cancelTimeout(timeoutID: ITimeoutID): void;
declare function requestTimeout(callback: () => void, delay?: number): ITimeoutID;
export { cancelTimeout, requestTimeout };
