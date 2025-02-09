// const readline = require('readline');
// const fs = require('fs');
import readline from 'readline';
import { writeFile } from 'fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const fileCreation = () => {
    rl.question("Enter your filename (without extension): ", (filename) => {
        if (!filename.trim()) {
            console.error("Filename cannot be empty!");
            rl.close();
            return;
        }

        rl.question("Enter the content for your file: ", (content) => {
            const filePath = `${filename}.txt`;

            writeFile(filePath, content, (error) => {
                if (error) {
                    console.error(`Error writing the file: ${error.message}`);
                } else {
                    console.log(`File "${filePath}" created successfully.`);
                }
                rl.close();
            });
        });
    });
};

fileCreation();

// fileCreation();
// @AkkalDhami-li8he
// 2 days ago (edited)
// MY FILE CREATOR APP:
// import fs from 'fs';
// import readline from 'readline';

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// let DIR_PATH = `Your File DIR Path`;


// const fileContent = (fileName, data) => {
//     fs.appendFile(fileName, data, "utf-8", (err) => {
//         if (err) {
//             console.error("Error adding content to file:", err);
//             rl.close();
//             return;
//         }
//         console.log("\nFile content added successfully");
//         createFile();
//     });
// }

// const createFileHandler = (fileName) => {
//     fs.writeFile(fileName, "", "utf-8", (err) => {
//         if (err) {
//             console.error("Error creating file:", err);
//             rl.close();
//             return;
//         }
//         console.log("\nFile created successfully");

//     });
// }

// const createNewFile = () => {
//     rl.question("Enter the file name: ", (fileName) => {
//         createFileHandler(`${DIR_PATH}${fileName}`);
//         createFile();
//     });
// }

// const viewFile = () => {
//     if (!fs.existsSync(DIR_PATH)) {
//         console.error("Error: Directory does not exist.");
//         rl.close();
//         return;
//     }
//     fs.readdir(DIR_PATH, (err, files) => {
//         if (err) {
//             console.error("Error reading directory:", err);
//             rl.close();
//             return;
//         }
//         console.log("\nExisting files are: ");
//         files.forEach((file, ind) => {
//             console.log(`${ind + 1}. ${file}`);
//         });
//         createFile();
//     });
// }

// const deleteFile = () => {
//     rl.question("Enter the file name: ", (fileName) => {
//         if (!fs.existsSync(`${DIR_PATH}${fileName}`)) {
//             console.error(`Error: ${fileName} file does not exist.`);
//             rl.close();
//             return;
//         }
//         fs.unlink(`${DIR_PATH}${fileName}`, (err) => {
//             if (err) {
//                 console.error("Error deleting file:", err);
//                 rl.close();
//                 return;
//             }
//             else {
//                 console.log("File deleted successfully");
//                 createFile();
//             }
//         });
//     });
// }

// const renameFile = () => {
//     rl.question("Enter the file name: ", (fileName) => {
//         rl.question("Enter the new file name: ", (newFileName) => {
//             const sourcePath = `${DIR_PATH}${fileName}`;
//             const destPath = `${DIR_PATH}${newFileName}`;

//             if (!fs.existsSync(sourcePath)) {
//                 console.error(`Error: ${fileName} file does not exist.`);
//                 rl.close();
//                 return;
//             }

//             if (fs.existsSync(destPath)) {
//                 console.error(`Error: A file with the '${newFileName}' name already exists.`);
//                 rl.close();
//                 return;
//             }

//             fs.rename(sourcePath, destPath, (err) => {
//                 if (err) {
//                     console.error("Error renaming file:", err.message);
//                     rl.close();
//                     return;
//                 }
//                 console.log("File renamed successfully");
//                 createFile();
//             });
//         });
//     });
// };

// const addContent = () => {
//     rl.question("Enter the file name: ", (fileName) => {
//         if (!fs.existsSync(`${DIR_PATH}${fileName}`)) {
//             console.error(`Error: ${fileName} file does not exist.`);
//             rl.close();
//             return;
//         }

//         rl.question("Enter the content: ", (data) => {
//             fileContent(`${DIR_PATH}${fileName}`, `${data}\n`);

//         });
//     });
// }

// const optionHandler = (option) => {
//     switch (option) {
//         case "1":
//             createNewFile();
//             break;
//         case "2":
//             viewFile();
//             break;

//         case "3":
//             deleteFile();
//             break;
//         case "4":
//             renameFile();
//             break;
//         case "5":
//             addContent();
//             break;
//         case "6":
//             rl.close();
//             break;
//     }
// }

// const createFile = () => {
//     console.log("\nWelcome to the File Creater App");
//     setTimeout(() => {
//         console.log("1. Create a new file");
//         console.log("2. View existing file");
//         console.log("3. Delete a file");
//         console.log("4. Rename a file");
//         console.log("5. Add content to a file");
//         console.log("6. Exit");
//         rl.question("select the option: ", optionHandler);
//     }, 1000);
// }

// createFile();





