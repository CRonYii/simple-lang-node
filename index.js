const { Machine } = require('./Machine');
const { Value } = require('./Value');
const { Varibale } = require('./Varibale');
const { Add, Multiply, LessThan } = require('./Operation');
const { Assign, If } = require('./Expression');

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