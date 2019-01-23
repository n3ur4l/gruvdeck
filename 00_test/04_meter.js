/*
 * Figure out BPM of incomming clock
 */

const midi    = require("../midi");
const clock   = require("../clock"); 

const input   = new midi.Input("Circuit 20:0");
const meter   = new clock.Meter();
const div     = new clock.Divider();

input.on("clock", () => {
    meter.step();
    div.step();
});

div.on(24, () => {
    process.stdout.write("\r" + meter.bpm); 
});

div.start();
