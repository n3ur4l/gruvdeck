/*
 * Novation Circuit one drum track pattern with sample flip 
 */

const midi    = require("../midi");
const clock   = require("../clock");
const circuit = require("../circuit");

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

const drum1 = new circuit.Drum1(output);

drum1.set("k", 0);
drum1.set("c", 8);
drum1.set("h", () => { drum1.select(33); }); 
drum1.set("u", 48);

x0x.trig("drum",  "| kuhh c-hh kuhh c-c- |", (opt) => { drum1.trig(opt); });

div.on(6, () => { x0x.step(); });
