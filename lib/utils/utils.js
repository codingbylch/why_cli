/*
 * @Author: Kids
 * @Date: 2021-04-11 12:56:45
 * @LastEditTime: 2021-04-11 17:08:57
 * @Description: 封装逻辑：编译ejs
 */
// const { promisify } = require("util");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
// const renderFilePromise = promisify(ejs.renderFile);

const compile = (template, data) => {
  const templatePosition = `../templates/${template}`;
  const templatePath = path.resolve(__dirname, templatePosition);
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log("error", err);
        reject(err);
      }
      resolve(result);
    });
  });
  //   return renderFilePromise(templatePath, { data }, {});
};

const createDirSync = (mypath) => {
  if (fs.existsSync(mypath)) {
    return true;
  } else {
    if (createDirSync(path.dirname(mypath))) {
      fs.mkdirSync(mypath);
      return true;
    }
  }
};

const writeToFile = (pathName, content) => {
  // 判断path是否存在，若不存在则创建对应文件夹
  return fs.promises.writeFile(pathName, content);
};

module.exports = {
  compile,
  writeToFile,
  createDirSync
};
