import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/** Recursion function */
function getAllFilesInDirectory(directoryPath, fileList = []) {
  const files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFilesInDirectory(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function deleteEmptyDirectories(directoryPath) {
  fs.readdirSync(directoryPath).forEach((entry) => {
    const fullPath = path.join(directoryPath, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      if (fs.readdirSync(fullPath).length === 0) {
        fs.rmdirSync(fullPath);
        console.log(`>> delete folder: ${fullPath}`);
      } else {
        deleteEmptyDirectories(fullPath);
      }
    }
  });
}

const moveAllEntries = (source, destination) => {
  fs.readdirSync(source).forEach((entry) => {
    const sourcePath = path.join(source, entry);
    const destinationPath = path.join(destination, entry);
    fs.renameSync(sourcePath, destinationPath);
  });
};

function forceDeleteFolderSync(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((entry) => {
      const entryPath = path.join(folderPath, entry);
      if (fs.lstatSync(entryPath).isDirectory()) {
        forceDeleteFolderSync(entryPath);
      } else {
        fs.unlinkSync(entryPath);
      }
    });
    fs.rmdirSync(folderPath);
  }
}

console.log('>> start script for extract of d.ts file from openapi generator.');
const rootDir = path.join(fileURLToPath(path.dirname(import.meta.url)), '../', 'schema', 'temp');
const allFiles = getAllFilesInDirectory(rootDir).filter((file) => !file.endsWith('.d.ts'));
allFiles.forEach((file) => console.log(`>> delete file :${file}`));
allFiles.forEach((file) => fs.rmSync(file));
deleteEmptyDirectories(rootDir);

const deleteDir = path.join(fileURLToPath(path.dirname(import.meta.url)), '../', 'schema', 'temp');
const recipientDir = path.join(fileURLToPath(path.dirname(import.meta.url)), '../', 'src', '@types', 'schema');

if (fs.existsSync(recipientDir)) {
  forceDeleteFolderSync(recipientDir);
}
fs.mkdirSync(recipientDir);

console.log(`>> copy folder: ${deleteDir} to ${recipientDir}`);

moveAllEntries(deleteDir, recipientDir);
forceDeleteFolderSync(deleteDir);

console.log('>> end script for extract of d.ts file from openapi generator.');
