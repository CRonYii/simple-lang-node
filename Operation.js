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