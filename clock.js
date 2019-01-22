
const Events = require("events");

/*
 * midi clock divider
 */
class Divider extends Events {
    constructor() {
        super();
        this.run   = false;
        this.steps = 0;
    }
    start() { 
        this.run = true;
    }
    stop()  {
        this.run = false;
    }
    reset() {
	this.steps = 0;
    }
    step() {
        if (this.run) {
            this.eventNames().map((e) => {
                let _e = parseInt(e);
                if (this.steps % e === 0) { this.emit(e) }
            });
            this.steps += 1;
        }
    }
}

/*
 * Time Line event scheduler
 */

class Time {
    constructor({count = 4, note = 4, ppq = 24}) {
        this.events  = {};
        this.run     = false;
        this.steps   = 0;
        this.beatLen = (ppq * 4) / note;
        this.barLen  = this.beatLen * count;
    }

    step() {
        if(this.run) {
            Object.keys(this.events).map((k) => {
                if(parseInt(k) === this.steps) {
                    this.events[k](this.pos());
                }
            });
            this.steps += 1;
        }
    }

    pos() {
        let pos  = this.steps % this.barLen + 1;
        let bar  = Math.floor(this.steps / this.barLen) + 1;
        let beat = Math.floor(this.steps % this.barLen / this.beatLen) + 1
        return { bar, beat, pos, steps: this.steps }
    }

    start() {
        this.run = true;
    }

    stop() {
        this.run   = false;
    }
    
    reset() {
        this.steps = 0;
    }

    at({bar = 1, beat = 1}, func) {
        let t = ((bar - 1) * this.barLen) + ((beat - 1) * this.beatLen)
        this.events[t] = func;
    }
}

/*
 * BPM meter
 */

class Meter {
    constructor({ppq = 24, span = 1}) {
	this.ppq  = ppq;
	this.span = span;
	this.last = process.hrtime.bigint();
	this.acc  = [];
    	this.bpm  = 0;
    }

    step() {
	let now   = process.hrtime.bigint();
	this.acc.push(Number(now - this.last));
	if(this.acc.length > (this.ppq * this.span)) {
	    this.acc.shift();
	    this.bpm  = Math.round(60 * 100000000000 * this.span) / this.acc.reduce((a,v) => { 
		    return a + v; 
	    }, 0) / 100; 
	}
	this.last = now;
    }
}

module.exports = { Divider, Time, Meter };
