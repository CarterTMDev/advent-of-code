const fs = require('fs');

// Load file
let file = fs.readFileSync('input.txt', 'utf8');
let pairs = file.split("\n");
pairs.pop();// Remove empty line

// Part 1
let stackedJobsCount = 0;
pairs.forEach((pair) => {
    if (areJobsStacked(pair)) {
        stackedJobsCount++;
    }
});
console.log(`Stacked jobs = ${stackedJobsCount}`);

// Part 2
let overlapJobsCount = 0;
pairs.forEach((pair) => {
    if (areJobsOverlapped(pair)) {
        overlapJobsCount++;
    }
});
console.log(`Overlapping jobs = ${overlapJobsCount}`);

function getJobsFromString(jobsString) {
    let jobs = [];
    jobsString.split(",").forEach((job) => {
        let ends = [];
        job.split("-").forEach((end) => {
            ends.push(Number(end));
        });
        jobs.push(ends);
    });
    return jobs;
}

function areJobsStacked(jobsString) {
    let jobs = getJobsFromString(jobsString);
    if ((jobs[0][0] == jobs[1][0] && jobs[0][1] == jobs[1][1])
        || Math.sign(jobs[0][0] - jobs[1][0]) != Math.sign(jobs[0][1] - jobs[1][1])) {
        return true;
    }
    return false;
}

function areJobsOverlapped(jobsString) {
    let jobs = getJobsFromString(jobsString);
    if ((jobs[0][0] >= jobs[1][0] && jobs[0][0] <= jobs[1][1])
        || (jobs[0][1] >= jobs[1][0] && jobs[0][1] <= jobs[1][1])
        || (jobs[1][0] >= jobs[0][0] && jobs[1][0] <= jobs[0][1])
        || (jobs[1][1] >= jobs[0][0] && jobs[1][1] <= jobs[0][1])) {
        return true;
    }
    return false;
}