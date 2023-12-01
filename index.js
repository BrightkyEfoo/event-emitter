class BrightkyEmitter {
  // : {
  //   [p: string | symbol]: any;
  // }
  _state = {};

  // {
  //     [p: string | symbol]: Function[] | undefined;
  //   }
  _callbacks = {};

  _stateProxy = new Proxy(this._state, {
    set: (target, property, newValue, receiver) => {
      target[property] = newValue;
      this._callbacks[property]?.forEach((callback) => callback(newValue));
      return true;
    },
  });
  //   : string  , : Function
  on(eventName, callback) {
    if (Array.isArray(this._callbacks[eventName])) {
      this._callbacks[eventName].push(callback);
    } else {
      this._callbacks[eventName] = [callback];
    }
  }

  //   : string  , : any
  emit(eventName, data) {
    this._stateProxy[eventName] = data;
  }
}

export default BrightkyEmitter;
