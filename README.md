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

## clock.Meter

BPM counter for incomming clock.

```javascript
input.on("clock", () => {
    meter.step();
    console.log(meter.bpm);
});
```

## clock.Pulse

Naive midi pulse implementation that turned out surprisingly accurate and useful.

```javascript
const pulse = new clock.Pulse({ bpm: 100 });
pulse.on("clock", () => {
    div.step();
});
```

## x0x pattern loop sequencer

x0x style trigger sequencer. Multiple trigger tracks, each trigger track can have 
several modulation tracks.

```javascript
x0x.trig(       "kick",  "| k--- k--- k--- k--- |", (opt) => { console.log(opt) }); 
x0x.trig(       "snare", "| ---- s--- ---- s--- |", (opt) => { console.log(opt) }); 
x0x.mod ("acc", "snare", "| ---- ---- ---- a--- |"); 
```

The pattern is a text string, one character == one step. The seqencer steps through 
the trigger pattern one character at a time, white space and bar marks `"|"` are 
ignored. A dash is a rest, any other letter will trigger the callback function.

The trigger character and any modulation data for the step is passed to the callback 
function as an option object. `{ trig: "k" }` for the kick example above 
and `{ trig: "s", acc: "-" }` or `{ trig: "s", acc: "a" }` for the snare pattern. 
It is up to the callback function to decide what to do with the trigger and 
modulation data.

There is no limit on pattern length or step count.

# Examples

For more examples look into 00_test folder. 
