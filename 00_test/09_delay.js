/*
 * Midi delay with repeat 
 */

const midi    = require("../midi");
const clock   = require("../clock");

const input  = new midi.Input("Circuit 20:0");
const output = new midi.Output("Circuit 20:0");
const x0x    = new (require("../x0x"))();
const div    = new clock.Divider(); 
    
input.on("start", () => { div.start(); });
input.on("stop",  () => { div.stop();  });
input.on("clock", () => {
    div.step();
    output.step();
});


input.on("clock", () => { 
    output.step();
});

div.on(6, () => {
    x0x.step();
});

const major = (root) => {
    return [ root,
             root + 2,
             root + 4,
             root + 5,
             root + 7,
             root + 9,
             root + 11,
             root + 12];
}

const scale = major(60); 

x0x.trig("arpeggio", "| 1-3- 5-7- 8-7- 5-3- |", ({ trig }) => {
    output.repeat({ pitch: scale[parseInt(trig) - 1],
                  channel: 1,
                 velocity: 90,
                     gate: 4 },
                  { delay: 60,
                   repeat: 1,
                 feedback: (note) => {
                     note.velocity -= 50;
                     return note;
                 }});
});
