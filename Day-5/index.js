"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var fs = require("fs");
// Load file
var file = fs.readFileSync('input.txt', 'utf8').split("\n");
file.pop(); // Ditch the empty line at the end
var stacks = [];
for (var i = 0; i < 9; i++) { // There are 9 stacks, so let's just get going
    stacks.push([]);
}
var lineNum = 0;
while (true) {
    if (!file[lineNum].includes("[")) {
        break;
    }
    var index = file[lineNum].indexOf("[");
    while (index != -1) {
        var stackIndex = index / 4;
        if (stacks[stackIndex].length > 0) {
            stacks[stackIndex].unshift(file[lineNum].charAt(index + 1));
        }
        else {
            stacks[stackIndex].push(file[lineNum].charAt(index + 1));
        }
        index = file[lineNum].indexOf("[", index + 1);
    }
    lineNum++;
}
lineNum += 2; // Get past the stack labels and the empty line
var steps = [];
while (lineNum < file.length) {
    steps.push(getStepFromString(file[lineNum]));
    lineNum++;
}
// Part 1
var rearrangedStacks = rearrangeStacksPart1(stacks, steps);
var output = "";
rearrangedStacks.forEach(function (stack) {
    if (stack.length > 0) {
        output += stack[stack.length - 1];
    }
    else {
        output += " ";
    }
});
console.log("Part 1: ".concat(output));
// Part 2
rearrangedStacks = rearrangeStacksPart2(stacks, steps);
output = "";
rearrangedStacks.forEach(function (stack) {
    if (stack.length > 0) {
        output += stack[stack.length - 1];
    }
    else {
        output += " ";
    }
});
console.log("Part 2: ".concat(output));
function rearrangeStacksPart1(stacks, steps) {
    // Copy stacks
    var newStacks = [];
    stacks.forEach(function (stack) {
        newStacks.push(__spreadArray([], stack, true));
    });
    // Perform the steps
    steps.forEach(function (step) {
        for (var i = 0; i < step.amount; i++) {
            var crate = newStacks[step.from - 1].pop();
            newStacks[step.to - 1].push(crate);
        }
    });
    return newStacks;
}
function rearrangeStacksPart2(stacks, steps) {
    // Copy stacks
    var newStacks = [];
    stacks.forEach(function (stack) {
        newStacks.push(__spreadArray([], stack, true));
    });
    // Perform the steps
    steps.forEach(function (step) {
        var grabIndex = newStacks[step.from - 1].length - step.amount;
        for (var i = 0; i < step.amount; i++) {
            var crates = newStacks[step.from - 1].splice(grabIndex);
            newStacks[step.to - 1] = newStacks[step.to - 1].concat(crates);
        }
    });
    return newStacks;
}
function getStepFromString(stepString) {
    var stepArray = stepString.split(" ");
    var step = {
        amount: Number(stepArray[1]),
        from: Number(stepArray[3]),
        to: Number(stepArray[5])
    };
    return step;
}
