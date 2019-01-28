/*
 * Polyphonic chord with offset onset
 */

const midi    = require("../midi");

const input   = new midi.Input("Circuit 20:0");
const output  = new midi.Output("Circuit 20:0");
    
output.play({pitch: 60, channel: 1, gate: 288});
output.play({pitch: 64, channel: 1, gate: 192, offset: 96});
output.play({pitch: 67, channel: 1, gate: 96, offset: 192});

input.on("clock", () => {
    output.step();
});

