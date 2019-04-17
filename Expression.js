const { Value } = require('./Value');

class DoNothing {

    reducible() {
        return false;
    }

    toString() {
        return 'do-nothing';
    }

    equals(other) {
        if (other === null || other === undefined) return false;
        if (Object.is(this, other)) return true;
        if (this.constructor !== other.constructor) return false;
        return true;
    }

}

class Sequence {

    constructor(first, second) {
        this.first = first;
        this.second = second;
    }

    reduce(environment) {
        if (!this.first.equals(new DoNothing())) {
            const [reduced_env, reduced_first] = this.first.reduce(environment);
            return [reduced_env, new Sequence(reduced_first, this.second)];
        } else {
            return [environment, this.second];
        }
    }

    reducible() {
        return true;
    }

    equals(other) {
        if (other === null || other === undefined) return false;
        if (Object.is(this, other)) return true;
        if (this.constructor !== other.constructor) return false;
        return this.frist.equals(other.first)
            && this.second.equals(other.second);
    }

    toString() {
        return `${this.first.toString()}; ${this.second.toString()};`;
    }

}

class Assign {

    constructor(name, expr) {
        this.name = name;
        this.expression = expr;
    }

    reduce(environment) {
        if (this.expression.reducible()) {
            return [environment, new Assign(this.name, this.expression.reduce(environment))];
        } else {
            return [{ ...environment, [this.name]: this.expression }, new DoNothing()];
        }
    }

    reducible() {
        return true;
    }

    equals(other) {
        if (other === null || other === undefined) return false;
        if (Object.is(this, other)) return true;
        if (this.constructor !== other.constructor) return false;
        return this.name === other.name && this.expression.equals(other.expression);
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
            return [environment, new If(this.condition.reduce(environment), this.consequence, this.alternative)];
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

    equals(other) {
        if (other === null || other === undefined) return false;
        if (Object.is(this, other)) return true;
        if (this.constructor !== other.constructor) return false;
        return this.condition.equals(other.condition)
            && this.consequence.equals(other.consequence)
            && this.alternative.equals(other.alternative);
    }

    toString() {
        return `if (${this.condition.toString()}) { ${this.consequence.toString()} } else { ${this.alternative.toString()} }`
    }

}

class Print {

    constructor(value) {
        this.value = value;
    }

    reduce(environment) {
        if (this.value.reducible()) {
            return [environment, new Print(this.value.reduce(environment))];
        } else {
            console.log(this.value.toString());
            return [environment, new DoNothing];
        }
    }

    reducible() {
        return true;
    }

    toString() {
        return 'print ' + this.value.toString()
    };

}

module.exports = {
    DoNothing,
    Sequence,
    Assign,
    Print,
    If
};