const fs = require('fs');
const path = require('path');
const readline = require('readline');
const colors = require('colors');
colors.enable();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let debug = false;

rl.question(colors.blue('Fudrk bigger file tool\nDo you want to enable debug mode?\n[1] = True\n[2] = False\n-> '), (answer) => {
    debug = answer === '1';
    if (debug) {
        console.log(colors.blue('Debug mode enabled: Printing every action'));
    } else {
        console.log(colors.blue('Debug mode disabled: Some actions will be printed'));
    }

    rl.question('Enter the path to the Python file: ', (srcFile) => {
        const fileName = path.parse(srcFile).name;
        const destFile = `${fileName} New.py`;
        fs.copyFileSync(srcFile, destFile);
        let lineCount = 1;

        function randomChar(y) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            for (let i = 0; i < y; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        }

        rl.question('How much do you want the file to grow?\n[1] = ~ 5x Bigger\n[2] = ~ 45\n[3] = ~ 500 (Takes more time)\n[4] = ~ 5000 (Takes a lot of time)\n-> ', (choice) => {
            console.log('\nWait...');
            const newFile = `${fileName} temp.py`;
            const inputFileContent = fs.readFileSync(srcFile, 'utf8');
            const lines = inputFileContent.split('\n');
            fs.writeFileSync(newFile, lines.map((line) => {
                line += "\n";
                if (debug) {
                    console.log(`${lineCount} line done`);
                    lineCount++;
                }
                return line + `# ${randomChar(choice === '1' ? 125 : choice === '2' ? 1500 : choice === '3' ? 15000 : 150000)}\n`;
            }).join(''));
            rl.question('Finish, press enter to leave', () => rl.close());
        });
    });
});
