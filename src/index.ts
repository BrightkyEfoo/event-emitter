import { UUID, randomUUID } from "crypto";

type callbackObj = {
  callback: Function | undefined;
  once: boolean;
  id: UUID;
  executed?: boolean;
};

class BrightkyEmitter {
  private _state: {
    [p: string | symbol]: any;
  } = {};

  private _callbacks: {
    [p: string | symbol]: callbackObj[] | undefined;
  } = {};

  private _stateProxy = new Proxy(this._state, {
    set: (target, property, newValue, receiver) => {
      target[property] = newValue;
      this._callbacks[property]?.forEach((el, idx) => {
        if (el.callback) {
          if (!el.once) el.callback(newValue);
          else if (!el.executed) {
            this._callbacks[property]![idx].executed = true;
            el.callback(newValue);
          }
        }
      });
      return true;
    },
  });

  on(eventName: string, callback: Function | undefined) {
    if (Array.isArray(this._callbacks[eventName])) {
      this._callbacks[eventName]!.push({
        callback,
        once: false,
        id: randomUUID(),
      });
    } else {
      this._callbacks[eventName] = [
        { callback, once: false, id: randomUUID() },
      ];
    }
  }

  emit(eventName: string, data: any) {
    this._stateProxy[eventName] = data;
  }

  once(eventName: string, callback: Function | undefined) {
    if (Array.isArray(this._callbacks[eventName])) {
      this._callbacks[eventName]!.push({
        callback,
        once: true,
        id: randomUUID(),
      });
    } else {
      this._callbacks[eventName] = [{ callback, once: true, id: randomUUID() }];
    }
  }
}

export default BrightkyEmitter;
