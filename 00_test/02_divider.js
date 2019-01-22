/*
 * simple kick snare hh pattern
 * midi clock from Novation Circuit via clock 
 * divider to trigger Circuits drums
 */

const midi    = require("../midi");
const clock   = require("../clock"); 

const input   = new midi.Input("Circuit 20:0");
const circuit = new midi.Output("Circuit 20:0");
const div     = new clock.Divider();

input.on("start", () => {
    div.start();
});

input.on("stop", () => {
    div.stop();
});

input.on("clock", () => {
    div.step();
    circuit.step();
});

let snare = false;
div.on(24, () => {
    circuit.play({ note: 0x3c, channel: 10, velocity: 90 });
    // play the snare every other beat
    if(snare) { 
        circuit.play({ note: 0x3e, channel: 10, velocity: 90 });
    }
    snare = !snare;
});

div.on(12, () => {
    circuit.play({ note: 0x40, channel: 10, velocity: 90 });
});
