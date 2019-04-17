const { Value } = require('./Value');

class Operation {

    constructor(left, right) {
        this.left = left;
        this.right = right;
    }

    reduce(environment) {
        if (!this.reducible()) {
            return;
        }
        if (this.left.reducible()) {
            return new this.constructor(this.left.reduce(environment), this.right);
        } else if (this.right.reducible()) {
            return new this.constructor(this.left, this.right.reduce(environment));
        } else {
            return this.reduceValue(environment);
        }
    }

    reducible() {
        return true;
    }

    equals(other) {
        if (other === null || other === undefined) return false;
        if (Object.is(this, other)) return true;
        if (this.constructor !== other.constructor) return false;
        return this.left.equals(other.left) && this.right.equals(other.right);
    }

}

class Add extends Operation {

    reduceValue() {
        return new Value(this.left + this.right);
    }

    toString() {
        return this.left + ' + ' + this.right;
    }

}

class Multiply extends Operation {

    reduceValue() {
        return new Value(this.left * this.right);
    }

    toString() {
        return this.left + ' * ' + this.right;
    }

}

class LessThan extends Operation {

    reduceValue() {
        return new Value(this.left < this.right);
    }

    toString() {
        return this.left + ' < ' + this.right;
    }

}

module.exports = {
    Value, Add, Multiply, LessThan
};