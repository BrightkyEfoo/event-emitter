class BrightkyEmitter {
    constructor() {
        this._state = {};
        this._callbacks = {};
        this._stateProxy = new Proxy(this._state, {
            set: (target, property, newValue, receiver) => {
                var _a;
                target[property] = newValue;
                (_a = this._callbacks[property]) === null || _a === void 0 ? void 0 : _a.forEach((callback) => callback(newValue));
                return true;
            },
        });
    }
    on(eventName, callback) {
        if (Array.isArray(this._callbacks[eventName])) {
            this._callbacks[eventName].push(callback);
        }
        else {
            this._callbacks[eventName] = [callback];
        }
    }
    emit(eventName, data) {
        this._stateProxy[eventName] = data;
    }
}
export default BrightkyEmitter;
