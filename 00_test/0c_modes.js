/*
 * Modal scales 
 */

const midi   = require("../midi");
const clock  = require("../clock");
const mode   = require("../mode");  

const output = new midi.Output("Neutron 20:0");
const x0x    = new (require("../x0x"))();
const div    = new clock.Divider(); 
const pulse  = new clock.Pulse({ bpm: 80 });

pulse.on("clock", () => {
    div.step();
    output.step();
});

div.on(6, () => {
    x0x.step();
});

div.start();

const scale = new mode.Ionian({ root: 60, octaves: 2 });

x0x.trig("arpeggio", "| 1357 8753 1357 8753 |", ({ trig }) => {
    output.play({ pitch: scale.stufe(trig),
                channel: 1,
               velocity: 90,
                   gate: 5 });
});
