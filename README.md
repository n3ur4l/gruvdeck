# Modular Sequencing Toolkit

This is a collection of moderately simple building blocks, that can 
be composed into sequencers of arbitrary complexity to control harware
or software synthesizers, drum machines or anythig else that has midi
or midi to cv converters.

# Modules

## midi.Input

Midi input port, provides external clock and transport control messages.

```javascript
const input = new midi.Input("device name");
input.on("start", () => { /* triggers on midi start message */ });
input.on("stop",  () => { /* triggers on midi stop  message */ });
input.on("clock", () => { /* triggers on midi clock message */ });
```
## midi.Output

Midi output port, provides a clocked fifo queue of midi messages.
Messages must be 3 bytes long (e.g. note on/off, cc). Must be 
clocked from a clock source, on each clock step it shifts the 
queue and sends everything enqueued for the step to the assigned
device.

Use it to enqueue midi messages to be sent to a device right away or at
some time in the future. It can be polyphonic - each consecutive 
call to `output.play()` is **zipped** with the current queue, **not appended**
to it. Actual polyphony depends on the output device.


```javascript
// play a chord with different note length
output.play({note: 60, channel: 1, gate: 96}); // play c3 full note
output.play({note: 64, channel: 1, gate: 48}); // play e3 half note
output.play({note: 67, channel: 1, gate: 24}); // play g3 quarter note
```

```javascript
// play a chord with delayed note onset
output.play({note: 60, channel: 1, gate: 288});
output.play({note: 64, channel: 1, gate: 192, offset: 96});
output.play({note: 67, channel: 1, gate: 96, offset: 192});
```

## clock.Divider

Clock divider triggers on every Xth step of the clock.

```javascript
divider.on(24, () => {
    // do something every quarter note
});
```

## clock.Time

Time line scheduler. Triggers an event at a set point into the song.

```javascript
const time = new clock.Time();
time.at({ bar: 5, beat: 1}, (p) {
    console.log(p); // print current song position on the start of bar 5
});

``` 
