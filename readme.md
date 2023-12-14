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

# API

### Emit

The emit method is used to trigger an event.

#### Signature

`emitter.emit('event-name')`

#### Usage

This method is used to trigger all listener of the choosed event.

### On

The on method is used to add a listener to an event by name

#### Signature

`emitter.on('event-name' , callback)`<br>
the callback can be any function that takes an object and return void.
this function is called a **listener**.

#### Usage

This method is used to add any listener to an event, that listener will be triggered anyway if the event was emitted

### Once

The once method is used to add a listener to an event by name. The difference with this method and the on method is that, this method will excecute the listener function only once.

#### Signature

`emitter.once('event-name' , callback)`
