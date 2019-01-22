/*
 * simple kick snare hh pattern
 * midi clock from Novation Circuit via clock 
 * divider to trigger Circuits drums
 */

const midi    = require("../midi");
const clock   = require("../clock"); 

const input   = new midi.Input("Circuit 20:0");
const output  = new midi.Output("Circuit 20:0");
const time    = new clock.Time();

input.on("start", () => {
    time.start();
});

input.on("stop", () => {
    time.stop();
    time.reset();
});

input.on("clock", () => {
    time.step();
    output.step();
});

time.at({bar: 1, beat: 1}, (p) => {
    console.log(p);
    output.play({note: 60, channel: 1, gate: 16});
});

time.at({bar: 1, beat: 2}, (p) => {
    console.log(p);
    output.play({note: 64, channel: 1, gate: 16});
});

time.at({bar: 1, beat: 3}, (p) => {
    console.log(p);
    output.play({note: 67, channel: 1, gate: 16});
});

time.at({bar: 1, beat: 4}, (p) => {
    console.log(p);
    output.play({note: 60, channel: 1, gate: 16});
});

time.at({bar: 2, beat: 1}, (p) => {
    console.log(p);
    output.play({note: 64, channel: 1, gate: 16});
});

time.at({bar: 2, beat: 2}, (p) => {
    console.log(p);
    output.play({note: 67, channel: 1, gate: 16});
});

time.at({bar: 2, beat: 3}, (p) => {
    console.log(p);
    output.play({note: 60, channel: 1, gate: 16});
});

time.at({bar: 2, beat: 4}, (p) => {
    console.log(p);
    output.play({note: 64, channel: 1, gate: 16});
});
