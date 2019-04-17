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

}

module.exports = { Value };