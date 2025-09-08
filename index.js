import fs from "fs";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./dummy.txt";
// Set date to 25th July 2025
const targetDate = moment("2025-07-25").format();

const makeCommits = (n) => {
    if (n === 0) return simpleGit().push();
    // Use the fixed date instead of random
    const date = targetDate;
    // Append a line to dummy.txt to create a change
    fs.appendFileSync(path, `Commit on ${date}\n`);
    console.log(date);
    simpleGit().add([path]).commit(date, { "--date": date }, makeCommits.bind(this, --n));
};

makeCommits(1);