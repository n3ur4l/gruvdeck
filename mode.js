class Mode {
    constructor({ root = 60, octaves = 2, tones } = {}) {
        this.pitches = [];

        let pitch = root;
        this.pitches.push(pitch);
        tones.split("").map((t) => {
            if(t.toUpperCase() === "H") {
                pitch = pitch + 1;
            }
            if(t.toUpperCase() === "W") {
                pitch = pitch + 2;
            }
            this.pitches.push(pitch);
        });

        let octave = this.pitches;

        while(octaves > 1) {
            octave = octave.map((i) => { return i + 12; });
            this.pitches = [ ...this.pitches, ...octave ];
            octaves -= 1;
        }
    }

    stufe(n) {
        let i = (typeof n === "string") ? parseInt("0x" + n) : n;
        return this.pitches[i - 1];
    }

    i(num = 3) {
        return this.chord([1,3,5], num);
    }
    
    iv(num = 3) {
        return this.chord([4,6,8], num);
    }
    
    v(num = 3) {
        return this.chord([5,7,9], num);
    }

    chord(steps, num) {
        let chord = steps.map((s) => {
            return this.stufe(s);
        });

        let i = Math.ceil(steps.length / num);

        let _chord = chord;

        while(i > 0) {
            _chord = _chord.map((p) => { return p + 12;});
            chord = [...chord, ..._chord ];
            i -= 1;
        }

        return chord.slice(0, num);
    }
}

class Ionian extends Mode {
    constructor(opt) {
        super( { ...opt, tones: "WWHWWWH" });
    }
}

class Dorian extends Mode {
    constructor(opt) {
        super({ ...opt, tones: "WHWWWHW" });
    }
}

class Phrygian extends Mode {
    constructor(opt) {
        super({ ...opt, tones: "HWWWHWW" });
    }
}

class Lydian extends Mode {
    constructor(opt) {
        super({ ...opt, tones: "WWWHWWH" });
    }
}

class Mixolydian extends Mode {
    constructor(opt) {
        super({ ...opt, tones: "WWHWWHW" });
    }
}

class Aeolian extends Mode {
    constructor(opt) {
        super( { ...opt, tones: "WHWWHWW" });
    }
}

class Locrian extends Mode {
    constructor(opt) {
        super({ ...opt, tones: "HWWHWWW"  });
    }
}

const Major = Ionian;
const Minor = Aeolian;

module.exports = { Ionian,  Major,
                   Dorian,
                   Phrygian,
                   Lydian,
                   Mixolydian,
                   Aeolian, Minor,
                   Locrian };
