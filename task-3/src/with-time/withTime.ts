import EventEmitter from "../event-emitter/eventEmitter";

class WithTime extends EventEmitter {
  execute(asyncFunc: (...args: any[]) => Promise<any>, ...args: any[]) {
    const startTime = Date.now();
    this.emit("begin");

    asyncFunc(...args)
      .then((data) => {
        this.emit("data", data);
      })
      .catch((error) => {
        console.error("error!!!", error);
        this.emit("error", error);
      })
      .finally(() => {
        const endTime = Date.now();
        this.emit("end", endTime - startTime);
      });
  }
}

export default WithTime;
