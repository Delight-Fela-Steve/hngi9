const { Configuration, OpenAIApi } = require("openai")
const operations = Object.freeze(
    {
        MULTIPLICATION: "multiplication",
        ADDDITION: "addition",
        SUBTRACTION: "subtraction",
    }
)

exports.operationFunction = async function (req, res) {
    const operation_type = req.body.operation_type;
    const x = req.body.x;
    const y = req.body.y;
    let result;
    if (!operation_type) {
        return res.status(400).json({ message: `operation_type parameter missing` });
    }
    if (!x) {
        return res.status(400).json({ message: `x parameter missing` });
    }
    if (!y) {
        return res.status(400).json({ message: `y parameter missing` });
    }

    switch (operation_type) {
        case operations.MULTIPLICATION:
            result = x * y;
            break;
        case operations.ADDDITION:
            result = x + y;
            break;
        case operations.SUBTRACTION:
            result = x - y;
            break
        default:
            break;
    }
    let data = {
        slackUsername: "Delight",
        operation_type: `${operation_type}`,
        result: `${result}`
    }
    return res.status(200).json(data)
}