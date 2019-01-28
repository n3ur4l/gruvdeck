/*
 * Polyphonic chord
 */

const midi    = require("../midi");

const input   = new midi.Input("Circuit 20:0");
const output  = new midi.Output("Circuit 20:0");
    
output.play({pitch: 60, channel: 1, gate: 288});
output.play({pitch: 64, channel: 1, gate: 192});
output.play({pitch: 67, channel: 1, gate: 96});

input.on("clock", () => {
    output.step();
});

