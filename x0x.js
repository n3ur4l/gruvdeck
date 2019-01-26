/*
 * x0x style trigger sequencer
 */

class x0x {
    constructor() {
        this.patterns = {}
        this.steps    = 0;
    }

    trig(name, pat, func) {
        if(this.patterns[name] === undefined) {
            this.patterns[name] = {};
        }
        if(typeof func === 'function') {
            this.patterns[name].func = func;
        }
        this.patterns[name].trig = pat.replace(/[|\s]/g,"");
    }

    mod(what, name, pat) {
        if(this.patterns[name].mod === undefined) {
            this.patterns[name].mod = {};
        }
        this.patterns[name].mod[what] = pat.replace(/[|\s]/g,"");
    }

    step() {
        Object.keys(this.patterns).map((p) => {
            let { trig, func, mod } = this.patterns[p];
            let i = this.steps % trig.length;
            if("-" !== trig[i]) {
                let opt = { trig: trig[i] };
                if (mod !== undefined) {
                    Object.keys(mod).map((m) => {
                        opt[m] = mod[m][this.steps % mod[m].length];
                    });
                }
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
