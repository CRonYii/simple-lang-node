class Varibale {

    constructor(name) {
        this.name = name;
    }

    reduce(environment) {
        return environment[this.name];
    }

    reducible() {
        return true;
    }

    equals(other) {
        if (other === null || other === undefined) return false;
        if (Object.is(this, other)) return true;
        if (this.constructor !== other.constructor) return false;
        return this.name === other.name;
    }

    toString() {
        return `var->${this.name}`;
    }

}

module.exports = { Varibale };