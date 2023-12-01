# about

this package is my first real package for eventemitter

You can try it like this
```
import BrightkyEmitter from "brightkyefoo-event-emitter";

const emitter = new BrightkyEmitter();

emitter.on("yo", () => {
  console.log("yooo");
});

emitter.emit("yo", undefined);

```
