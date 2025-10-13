import fs from "fs";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./dummy.txt";

const date = moment("2025-10-11").format();

fs.appendFileSync(path, `Commit on ${date}\n`);
console.log(date);
simpleGit().add([path]).commit(date, { "--date": date }).push();