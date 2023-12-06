type callbackObj = {
  callback: Function;
  once: boolean;
};

class BrightkyEmitter {
  private _state: {
    [p: string | symbol]: any;
  } = {};

  private _callbacks: {
    [p: string | symbol]: callbackObj[] | undefined;
  } = {};

  private _onceCallbacks: {
    [p: string | symbol]: callbackObj[] | undefined;
  } = {};

  private _stateProxy = new Proxy(this._state, {
    set: (target, property, newValue, receiver) => {
      target[property] = newValue;
      this._callbacks[property]?.forEach((el) => {
        el.callback(newValue)
      });
      let canRemove = false
      this._onceCallbacks[property]?.forEach(el => {
        el.callback(newValue)
      })
      if(canRemove) this._onceCallbacks[property] = undefined
      return true;
    },
  });

  on(eventName: string, callback: Function) {
    if (Array.isArray(this._callbacks[eventName])) {
      this._callbacks[eventName]!.push({ callback, once: false });
    } else {
      this._callbacks[eventName] = [{ callback, once: false }];
    }
  }

  emit(eventName: string, data: any) {
    this._stateProxy[eventName] = data;
  }

  once(eventName: string, callback: Function) {
    if (Array.isArray(this._onceCallbacks[eventName])) {
      this._onceCallbacks[eventName]!.push({ callback, once: true });
    } else {
      this._onceCallbacks[eventName] = [{ callback, once: true }];
    }
  }
}

export default BrightkyEmitter;
