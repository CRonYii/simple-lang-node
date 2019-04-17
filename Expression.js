const { Value } = require('./Value');

class DoNothing {

    reducible() {
        return false;
    }

    toString() {
        return 'do-nothing';
    }

}

class Assign {

    constructor(name, expr) {
        this.name = name;
        this.expression = expr;
    }

    reduce(environment) {
        if (this.expression.reducible()) {
            return [environment, new this.constructor(this.name, this.expression.reduce())];
        } else {
            return [{ ...environment, [this.name]: this.expression }, new DoNothing()];
        }
    }

    reducible() {
        return true;
    }

    toString() {
        return `${this.name} = ${this.expression.toString()}`;
    }

}

class If {

    constructor(condition, consequence, alternative) {
        this.condition = condition;
        this.consequence = consequence;
        this.alternative = alternative;
    }

    reduce(environment) {
        if (this.condition.reducible()) {
            return [environment, new this.constructor(this.condition.reduce(), this.consequence, this.alternative)];
        } else {
            if (this.condition.equals(new Value(true))) {
                return [environment, this.consequence];
            } else if (this.condition.equals(new Value(false))) {
                return [environment, this.alternative];
            }
        }
    }


    reducible() {
        return true;
    }

    toString() {
        return `if (${this.condition.toString()}) { ${this.consequence.toString()} } else { ${this.alternative.toString()} }`
    }

}

module.exports = {
    DoNothing,
    Assign,
    If
};