const { Machine } = require('./Machine');
const { Value } = require('./Value');
const { Varibale } = require('./Varibale');
const { Add, Multiply, LessThan } = require('./Operation');
const { Assign, If } = require('./Expression');

Object.prototype.equals = function (other) {
    if ((other === null || other === undefined)
        || (this.constructor !== other.constructor)) {
        return false;
    }
    if (Object.is(this, other)) {
        return true;
    }
    for (const key in this) {
        if (!key in other) {
            return false;
        } else {
            if (typeof this[key] === 'object' && typeof other[key] === 'object') {
                if (!this[key].equals(other[key])) {
                    return false;
                }
            } else if (this[key] !== other[key]) {
                return false;
            }
        }
    }
    return true;
}

new Machine(
    {},
    new If(
        new LessThan(
            new Add(
                new Value(8), new Multiply(new Value(3), new Value(9))
            ),
            new Value(10)
        ),
        new Assign('isLessThan', new Value(true)),
        new Assign('isLessThan', new Value(false))
    )
).run();