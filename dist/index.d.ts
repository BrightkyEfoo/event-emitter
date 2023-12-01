declare class BrightkyEmitter {
    private _state;
    private _callbacks;
    private _stateProxy;
    on(eventName: string, callback: Function): void;
    emit(eventName: string, data: any): void;
}
export default BrightkyEmitter;
