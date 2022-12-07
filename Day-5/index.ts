import * as fs from 'fs';

// Load file
let file = fs.readFileSync('input.txt', 'utf8').split("\n");
file.pop();// Ditch the empty line at the end
let stacks: string[][] = [];
for (let i = 0; i < 9; i++) {// There are 9 stacks, so let's just get going
    stacks.push([]);
}

let lineNum = 0;
while (true) {
    if (!file[lineNum].includes("[")) {
        break;
    }

    let index = file[lineNum].indexOf("[");
    while (index != -1) {
        let stackIndex = index / 4;
        if (stacks[stackIndex].length > 0) {
            stacks[stackIndex].unshift(file[lineNum].charAt(index + 1));
        } else {
            stacks[stackIndex].push(file[lineNum].charAt(index + 1));
        }
        index = file[lineNum].indexOf("[", index + 1);
    }
    lineNum++;
}

lineNum += 2;// Get past the stack labels and the empty line

let steps: Step[] = [];
while (lineNum < file.length) {
    steps.push(getStepFromString(file[lineNum]));
    lineNum++;
}

// Part 1
let rearrangedStacks = rearrangeStacksPart1(stacks, steps);
let output = "";
rearrangedStacks.forEach((stack) => {
    if (stack.length > 0) {
        output += stack[stack.length - 1];
    } else {
        output += " ";
    }
});
console.log(`Part 1: ${output}`);

// Part 2
rearrangedStacks = rearrangeStacksPart2(stacks, steps);
output = "";
rearrangedStacks.forEach((stack) => {
    if (stack.length > 0) {
        output += stack[stack.length - 1];
    } else {
        output += " ";
    }
});
console.log(`Part 2: ${output}`);

function rearrangeStacksPart1(stacks: string[][], steps: Step[]): string[][] {
    // Copy stacks
    let newStacks: string[][] = [];
    stacks.forEach((stack) => {
        newStacks.push([...stack]);
    });
    // Perform the steps
    steps.forEach((step) => {
        for (let i = 0; i < step.amount; i++) {
            let crate = newStacks[step.from - 1].pop();
            newStacks[step.to - 1].push(crate as string);
        }
    });

    return newStacks;
}

function rearrangeStacksPart2(stacks: string[][], steps: Step[]): string[][] {
    // Copy stacks
    let newStacks: string[][] = [];
    stacks.forEach((stack) => {
        newStacks.push([...stack]);
    });
    // Perform the steps
    steps.forEach((step) => {
        let grabIndex = newStacks[step.from - 1].length - step.amount;
        for (let i = 0; i < step.amount; i++) {
            let crates = newStacks[step.from - 1].splice(grabIndex);
            newStacks[step.to - 1] = newStacks[step.to - 1].concat(crates);
        }
    });

    return newStacks;
}

function getStepFromString(stepString: string): Step {
    let stepArray: string[] = stepString.split(" ");
    let step: Step = {
        amount: Number(stepArray[1]),
        from: Number(stepArray[3]),
        to: Number(stepArray[5])
    };
    return step;
}

interface Step {
    amount: number,
    to: number,
    from: number
}
