/*
 * Midi delay and ratchet with repeat 
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

const play = ({ trig, ratchet }) => {
    const note = { pitch: scale[parseInt(trig) - 1],
                 channel: 1 }

    if (ratchet === "r") {
        output.repeat({ ...note, gate: 2 },
                      { delay: 2, repeat: 4 });
        output.play({ ...note, gate: 3, offset: 30 });
    } else {
        output.repeat({ ...note, gate: 3 },
                      { delay: 30, repeat: 1 });
    }
}

x0x.trig(           "arp", "| 1-3- 5-7- 8-7- 5-3- |", play );
x0x.mod ("ratchet", "arp", "| ---- r-r- ---- ---- |");
