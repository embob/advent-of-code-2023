import fs, { PathOrFileDescriptor } from "fs";
import path from "path";

const readInput = (path: fs.PathOrFileDescriptor) => {
  return fs.readFileSync(path).toString();
}

const readInputAsArray = (path: fs.PathOrFileDescriptor) => {
  return readInput(path).split("\n");
}

const readInputAsArraySplitByBlankLines = (path: fs.PathOrFileDescriptor) => {
  return readInput(path).split('\n\n');
}

const readInputAsArrayOfArrays = (path: fs.PathOrFileDescriptor) => {
  return readInput(path).split("\n\n").map(item => item.split("\n"));
}

const readInputAsNumberArray = (path: fs.PathOrFileDescriptor) => {
  return readInputAsArray(path).map(Number);
}


export {
  readInput,
  readInputAsArray,
  readInputAsNumberArray,
  readInputAsArrayOfArrays,
  readInputAsArraySplitByBlankLines
};