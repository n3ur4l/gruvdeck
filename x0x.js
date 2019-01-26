/*
 * x0x style trigger sequencer
 */

class x0x {
    constructor() {
        this.patterns = {}
        this.steps    = 0;
    }

    trig(name, pattern, func) {
        if(this.patterns[name] === undefined) {
            this.patterns[name] = {};
        }
        if(typeof func === 'function') {
            this.patterns[name].func = func;
        }
        this.patterns[name].trig = pattern.replace(/[|\s]/g,"");
    }
    
    step() {
        Object.keys(this.patterns).map((p) => {
            let { trig, func } = this.patterns[p];
            let i = this.steps % trig.length;
            if("-" !== trig[i]) {
                let opt = { trig: trig[i] };
                func(opt);
            }
        });
        this.steps += 1;
    }

    reset() {
        this.steps = 0;
    }
}

module.exports = x0x;
