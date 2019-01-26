/*
 * Euclidean prime patters
 */

const midi    = require("../midi");
const clock   = require("../clock");
const pattern = require("../pattern");

const div     = new clock.Divider(); 
const x0x     = new (require("../x0x"))();

const input   = new midi.Input("Circuit 20:0"); 
const output  = new midi.Output("Circuit 20:0"); 

input.on("start", () => { div.start(); });
input.on("stop",  () => { div.stop();  });
input.on("clock", () => { 
    div.step();
    output.step();
});

const drum = (note) => {
    return ({ acc }) => {
        let velocity = 70;
        if (acc === "a") { velocity += 50; }
        output.play({ note, channel: 10, velocity });
    }
};

x0x.trig("kick",  pattern.bjorklund(3,11), drum(0x3c));
x0x.trig("snare", pattern.bjorklund(5,13), drum(0x3e));
x0x.trig("hat",   pattern.bjorklund(7,17), drum(0x40));

div.on(6, () => { x0x.step(); });
