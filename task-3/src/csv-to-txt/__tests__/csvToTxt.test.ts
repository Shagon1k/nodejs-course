import convertCsvToTxt from "../csvToTxt";
const INPUT_PATH = "./csv/data.csv";
const OUTPUT_PATH = "data.txt";

convertCsvToTxt(INPUT_PATH, OUTPUT_PATH, { ignoreFields: ["amount"] });
