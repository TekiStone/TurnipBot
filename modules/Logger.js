/*
Logger class for easy and aesthetically pleasing console logging 
*/
const chalk = require("chalk");
const moment = require("moment");
const fs = require("fs");

exports.log = (content, type = "log") => {
  const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
  let message = "";
  switch (type) {
    case "log": {
      message = `${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content} `;
      break;
    }
    case "warn": {
      message = `${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `;
      break;
    }
    case "error": {
      message = `${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content} `;
      break;
    }
    case "debug": {
      message = `${timestamp} ${chalk.green(type.toUpperCase())} ${content} `;
      break;
    }
    case "cmd": {
      message = `${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`;
      break;
    }
    case "ready": {
      message = `${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`;
      break;
    }
    default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
  }

  fs.appendFile(`${process.env.LOG_FOLDER}mylog-${moment().format("YYYY-MM-DD")}.log`, `\n${timestamp} [${type.toUpperCase()}] ${content}`, (err) => {
    if (err) throw err; 
  });

  return console.log(message);
};

exports.error = (...args) => this.log(...args, "error");

exports.warn = (...args) => this.log(...args, "warn");

exports.debug = (...args) => this.log(...args, "debug");

exports.cmd = (...args) => this.log(...args, "cmd");