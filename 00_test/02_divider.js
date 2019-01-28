/*
 * simple kick snare hh pattern
 * midi clock from Novation Circuit via clock 
 * divider to trigger Circuits drums
 */

const midi   = require("../midi");
const clock  = require("../clock"); 

const input  = new midi.Input("Circuit 20:0");
const output = new midi.Output("Circuit 20:0");
const div    = new clock.Divider();

input.on("start", () => {
    div.start();
});

input.on("stop", () => {
    div.stop();
});

input.on("clock", () => {
    div.step();
    output.step();
});

let snare = false;
div.on(24, () => {
    output.play({ pitch: 0x3c, channel: 10, velocity: 90 });
    // play the snare every other beat
    if(snare) { 
        output.play({ pitch: 0x3e, channel: 10, velocity: 90 });
    }
    snare = !snare;
});

div.on(12, () => {
    output.play({ pitch: 0x40, channel: 10, velocity: 90 });
});
