class Value {

    constructor(value) {
        this.value = value;
    }

    reducible() {
        return false;
    }

    toString() {
        return this.value;
    }

    equals(other) {
        if (other === null || other === undefined) return false;
        if (Object.is(this, other)) return true;
        if (this.constructor !== other.constructor) return false;
        return this.value === other.value;
    }

}

module.exports = { Value };