/*
 * simple kick snare hh pattern using internal clock
 */

const midi   = require("../midi");
const clock  = require("../clock"); 

const output = new midi.Output("Circuit 20:0");
const div    = new clock.Divider();
const pulse  = new clock.Pulse();
const meter  = new clock.Meter({ span: 16 });

pulse.on("clock", () => {
    meter.step();
    div.step();
    output.step();
});

let snare = false;
div.on(24, () => {
    output.play({ note: 0x3c, channel: 10, velocity: 90 });
    // play the snare every other beat
    if(snare) { 
        output.play({ note: 0x3e, channel: 10, velocity: 90 });
    }
    snare = !snare;
    process.stdout.write("\r" + meter.bpm);
});

div.on(12, () => {
    output.play({ note: 0x40, channel: 10, velocity: 90 });
});

div.start();
