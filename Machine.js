class Machine {

    constructor(environment, expression) {
        this.environment = environment;
        this.expression = expression;
    }

    run() {
        while (this.expression.reducible()) {
            console.log(this.environment, this.expression.toString());
            this.step();
        }
        console.log(this.environment, this.expression.toString());
    }

    step() {
        [this.environment, this.expression] = this.expression.reduce(this.environment);
    }

}

module.exports = { Machine };