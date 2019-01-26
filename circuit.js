/* 
 * Novation Circuit
 */

const Output = require("./midi").Output;

class Drum {
    constructor(output) {
        this.output  = output;
        this.drumkit = {};
    }

    trig(opt = {}) {
        if(opt.trig !== undefined && this.drumkit[opt.trig] !== undefined) {
            this.drumkit[opt.trig](opt);
        }

        this.output.play({ pitch: this.opt.pitch,
                         channel: 10, 
                        velocity: 90 })
    }

    set(ch, val) {
        if(typeof val === 'function') {
            this.drumkit[ch] = val;
        } else {
            this.drumkit[ch] = () => { this.select(val); };
        }
    }

    select(value) {
        this.output.cc({  number: this.opt.select,
                         channel: 10,
                           value })
    }
}

class Drum1 extends Drum {
    constructor(output) {
        super(output);
        this.opt = {  pitch: 60,
                     select: 8 };
    }
}

class Drum2 extends Drum {
    constructor(output) {
        super(output);
        this.opt = {  pitch: 62,
                     select: 18 };
    }
}

class Drum3 extends Drum {
    constructor(output) {
        super(output);
        this.opt = {  pitch: 64,
                     select: 44 };
    }
}

class Drum4 extends Drum {
    constructor(output) {
        super(output);
        this.opt = {  pitch: 65,
                     select: 50 };
    }
}

module.exports = { Drum1, Drum2, Drum3, Drum4 };
