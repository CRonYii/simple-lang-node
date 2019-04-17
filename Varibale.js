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

    toString() {
        return this.name;
    }

}

module.exports = { Varibale };