const { Configuration, OpenAIApi } = require("openai")
const operations = Object.freeze(
    {
        MULTIPLICATION: "multiplication",
        ADDDITION: "addition",
        SUBTRACTION: "subtraction",
    }
)

const configuration = new Configuration({
    apiKey: process.env.SECRET,
});
const openai = new OpenAIApi(configuration);

exports.operationFunction = async function (req, res) {
    const operation_type = req.body.operation_type;
    let x = req.body.x;
    let y = req.body.y;
    let result;
    if (!operation_type) {
        return res.status(400).json({ message: `operation_type parameter missing`, data: null });
    }
    if (!x) {
        x = null
    }
    if (!y) {
        y = null
    }

    switch (operation_type) {
        case operations.MULTIPLICATION:
            result = parseInt(x * y);
            break;
        case operations.ADDDITION:
            result = parseInt(x + y);
            break;
        case operations.SUBTRACTION:
            result = parseInt(x - y);
            break
        default:
            try {

            } catch (error) {
                console.error(error)
                return res.status(500).json({ message: "Opps! Please Try Again Later", data: null });
            }
            const response = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: operation_type,
                temperature: 0,
                max_tokens: 256,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
            result = response.data.choices[0].text.trim()
            console.log(response.data.choices)
            break;
    }
    let data = {
        slackUsername: "Delight",
        operation_type: `${operation_type}`,
        result: result
    }
    return res.status(200).json(data)
}