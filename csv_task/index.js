const crypto = require("crypto");
const fs = require("fs");
const path = require('path');
const csv = require('fast-csv');
const clone = require('rfdc')();
const { Parser } = require("json2csv");

const args = process.argv.slice(2);
let csv_file, secret
if (args[0]) {
    csvFileName = args[0]
}
if (args[1]) {
    secret = args[1]
} else {
    secret = "random_secret"
}

const parser = new Parser()

//sha256 hashing function
const hasher = function (input, sec = secret) {
    const sha256Hasher = crypto.createHmac("sha256", secret);
    const value = sha256Hasher.update(input).digest("hex");
    return value
}

//Deletes previous files in jsons folder
function empty_jsons() {
    const directoryPath = path.join(__dirname, "jsons");
    const files = fs.readdirSync(directoryPath)
    files.forEach((file) => {
        fs.unlink(path.join(directoryPath, file), (err) => {
            if (err) console.error(err);
        })
    });
}

// This reads the provided csv file and performs all the necessary operations
function read_csv(csv_file) {
    let fileName = path.parse(csv_file).name
    let csv_data = [];
    const directoryPath = path.join(__dirname, "jsons");

    empty_jsons();

    // Gets all the data from the csv file and converts to json
    fs.createReadStream(csv_file)
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', row => {
            csv_data.push(row)

        })
        // Creating the chip-0007 formatted json files
        .on('end', (rowCount) => {
            let json_data = clone(csv_data);
            json_data.forEach((i) => {
                i.format = "CHIP-0007";
                const chipped_json = JSON.stringify(i);
                let filename = `jsons/${i.Filename}.json`
                fs.writeFileSync(filename, chipped_json, (err) => {
                    if (err) return console.log(err);
                })
            })
            let to_csv = []

            // Reading the jsons directory to get the chipped files and hashing them
            fs.readdir(directoryPath, (err, files) => {
                if (err) console.error(err);
                else {
                    files.forEach((file) => {
                        const filePath = path.join(directoryPath, file)
                        let file_buffer = fs.readFileSync(filePath)
                        let file_data = fs.readFileSync(filePath, { encoding: 'utf-8', flag: 'r' })
                        let file_details = JSON.parse(file_data)
                        file_details.sha256 = hasher(file_buffer)
                        to_csv.push(file_details)

                    })
                    to_csv = to_csv.sort(
                        (p1, p2) => (p1["Series Number"] > p2["Series Number"]) ? 1 : (p1["Series Number"] < p2["Series Number"]) ? -1 : 0
                    );

                    // Generating a new csv file with the appended sha256 hashes
                    let output_csv = parser.parse(to_csv)
                    fs.writeFile(`${fileName}_output.csv`, output_csv, (err) => {
                        if (err) return console.log(err);
                        console.log(`${fileName}_output.csv created`)
                    })

                }
            })
            console.log(`All ${rowCount} rows parsed successfully`)
        });
}

read_csv(csvFileName)