import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
// Set date to 25th July 2025
const targetDate = moment("2025-07-25").format();

const makeCommits = (n) => {
    if(n === 0) return simpleGit().push();
    // Use the fixed date instead of random
    const date = targetDate;
    const data = {
        date: date,
    };
    console.log(date);
    jsonfile.writeFile(path, data, () => {
        simpleGit().add([path]).commit(date, { "--date": date }, makeCommits.bind(this,--n));
    });
};

makeCommits(1);