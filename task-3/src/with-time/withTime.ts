import EventEmitter from "../event-emitter/eventEmitter";

class WithTime extends EventEmitter {
  execute(asyncFunc: (...args: any[]) => Promise<any>, ...args: any[]) {
    const startTime = Date.now();
    this.emit("begin");

    asyncFunc(...args).then((data) => {
      const endTime = Date.now();
      this.emit("data", data);
      this.emit("end", endTime - startTime);
    });

  }
}

export default WithTime;
