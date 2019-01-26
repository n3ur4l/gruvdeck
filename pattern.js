const _ = require('lodash');

/*
 * A sort of Bjorklund algorithm 
 */

const bjorklund = (pulses, steps) => {
    if (pulses > steps) {
        return _.fill(Array(steps), "x").join('');
    };

    let a = _.fill(Array(pulses), 1);
    let b = _.fill(Array(steps - pulses), 0);

    let p = _.zipWith(a, b, (a, b) => { 
        if (a === undefined) return [b];
        if (b === undefined) return [a];
        return [a, b];
    });

    const split = (head, tail) => {
        let _h = tail.shift();
        head.push(_h);
        if (tail.length == 0) return { head, tail };
        if (_h.length > tail[0].length) return { head, tail };
        return split(head, tail);
    }

    const combine = ({ head, tail }) => {
        if (tail.length <= 1) return _.flattenDeep([...head, ...tail]);
        let p = _.zipWith(head, tail, (a, b) => {
            if (a == undefined) return b;
            if (b == undefined) return a;
            return [...a, ...b];
        });
        return combine(split([],p));
    }

    return combine(split([], p)).map((i) => i == 1 ? "x" : "-").join('');
}

module.exports = { bjorklund };
