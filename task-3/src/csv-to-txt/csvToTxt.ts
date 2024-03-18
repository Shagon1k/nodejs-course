import fs from "fs";
import { pipeline } from "stream";
import csvToJson from "csvtojson";

interface ConvertCsvToTxtConfig {
  ignoreFields?: string[];
}

const convertCsvToTxt = (
  inputPath: string,
  outputPath: string = "",
  { ignoreFields }: ConvertCsvToTxtConfig = {}
) => {
  pipeline(
    fs.createReadStream(inputPath),
    csvToJson({ delimiter: "auto" })
      // Lowercase field names
      .preFileLine((fileLineString, i) =>
        i === 0 ? fileLineString.toLocaleLowerCase() : fileLineString
      )
      // Ignore passed fields in result
      .subscribe((jsonObj) => {
        ignoreFields?.forEach((f) => delete jsonObj[f]);
      }),
    fs.createWriteStream(outputPath, "utf-8"),
    (err) => {
      if (err) {
        console.error("Error during conversion!", err);
      } else {
        console.log("Converted.");
      }
    }
  );
};

export default convertCsvToTxt;
