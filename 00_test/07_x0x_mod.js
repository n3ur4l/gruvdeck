/*
 * Bluesy kick snare hh triplet pattern with x0x
 */

const midi   = require("../midi");
const clock  = require("../clock");

const div    = new clock.Divider(); 
const x0x    = new (require("../x0x"))();

const input  = new midi.Input("Circuit 20:0"); 
const output = new midi.Output("Circuit 20:0"); 

input.on("start", () => { div.start(); });
input.on("stop",  () => { div.stop();  });
input.on("clock", () => { 
    div.step();
    output.step();
});

const drum = (pitch) => {
    return ({ acc }) => {
        let velocity = 70;
        if (acc === "a") { velocity += 50; }
        output.play({ pitch, channel: 10, velocity });
    }
};

x0x.trig(       "kick",  "| k----- k----- k----- k----- |", drum(0x3c));
x0x.trig(       "snare", "| ------ s----- ------ s----- |", drum(0x3e));
x0x.trig(       "hat",   "| h-h-h- h-h-h- h-h-h- h-h-h- |", drum(0x40));
x0x.mod ("acc", "hat",   "| a----- a----- a----- a----- |");

div.on(4, () => { x0x.step(); });
