class Ionian {
    constructor({ root = 60, octaves = 1 } = {}) {
        this.pitches = [ root,
                         root + 2,
                         root + 4,
                         root + 5,
                         root + 7,
                         root + 9,
                         root + 11 ];
       
        let octave = this.pitches;

        while(octaves > 1) {
            octave = octave.map((i) => { return i + 12; });
            this.pitches = [ ...this.pitches, ...octave ];
            octaves -= 1;
        }
    }

    stufe(n) {
        return this.pitches[parseInt(n) - 1];
    }
}

const Major = Ionian;

module.exports = { Ionian, Major };
