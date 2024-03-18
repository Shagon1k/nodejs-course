type IEventName = string | symbol;
type IEventFunction = (...args: any[]) => void;
interface IListeners {
  [key: IEventName]: IEventFunction[] | undefined;
}

class EventEmitter {
  listeners: IListeners = {};

  addListener(eventName: IEventName, fn: IEventFunction): EventEmitter {
    const eventListeners = this.listeners[eventName];

    if (eventListeners) {
      eventListeners.push(fn);
    } else {
      this.listeners[eventName] = [fn];
    }

    return this;
  }

  on(eventName: IEventName, fn: IEventFunction): EventEmitter {
    return this.addListener(eventName, fn);
  }

  removeListener(eventName: IEventName, fn: IEventFunction): EventEmitter {
    const eventListeners = this.listeners[eventName];

    if (eventListeners) {
      this.listeners[eventName] = eventListeners.filter((l) => l !== fn);
    }

    return this;
  }

  off(eventName: IEventName, fn: IEventFunction): EventEmitter {
    return this.removeListener(eventName, fn);
  }

  once(eventName: IEventName, fn: IEventFunction): EventEmitter {
    const wrappedOnceFn = (...args: any[]) => {
      this.removeListener(eventName, wrappedOnceFn);
      fn(...args);
    };
    wrappedOnceFn.listener = fn;

    return this.addListener(eventName, wrappedOnceFn);
  }

  emit(eventName: IEventName, ...args: any[]) {
    this.listeners[eventName]?.forEach((l) => l.apply(this, args));

    return !!this.listeners[eventName];
  }

  listenerCount(eventName: IEventName, listener?: IEventFunction) {
    const eventListeners = this.listeners[eventName];

    if (!eventListeners) {
      return 0;
    }

    return listener
      ? eventListeners.filter((l) => l === listener).length
      : eventListeners.length;
  }

  rawListeners(eventName: IEventName): IEventFunction[] {
    return Array.from(this.listeners[eventName] || []);
  }
}

export default EventEmitter;
