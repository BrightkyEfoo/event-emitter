declare class BrightkyEmitter {
    private _state;
    private _callbacks;
    private _stateProxy;
    on(eventName: string, callback: Function | undefined): void;
    emit(eventName: string, data: any): void;
    once(eventName: string, callback: Function | undefined): void;
}
export default BrightkyEmitter;
