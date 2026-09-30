import fs from "fs";
import moment from "moment";
import simpleGit from "simple-git";

const [from, to = from] = process.argv.slice(2);
const start = moment(from);
const end = moment(to);

if (!from || !start.isValid() || !end.isValid()) {
  console.error("usage: node index.js <YYYY-MM-DD> [end-YYYY-MM-DD]");
  process.exit(1);
}

const repo = import.meta.dirname; // commit in this repo, not in cwd
const git = simpleGit(repo);

// GH Action pushes daily to this branch; rebase first or push gets rejected.
await git.pull(["--rebase"]).catch((e) => console.warn("pull skipped:", e.message));

for (const day = start.clone(); day.isSameOrBefore(end); day.add(1, "day")) {
  const date = day.format();
  fs.appendFileSync(`${repo}/dummy.txt`, `Commit on ${date}\n`);
  await git
    // --date only sets author date; committer date needs the env var
    .env({ ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date })
    .add("dummy.txt")
    .commit(date, { "--date": date });
  console.log("committed", date);
}

await git.push();
console.log("pushed");
