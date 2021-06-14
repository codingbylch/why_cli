const { promisify } = require("util"); // 让download的回调能使用Promise形式
const download = promisify(require("download-git-repo"));
const open = require("open");
const { vueRepo } = require("../config/repo-config");
const { commandSpawn } = require("../utils/terminal");
const { compile, writeToFile, createDirSync } = require("../utils/utils");
const path = require("path");

// callback => promisify(函数) => Promise => async await
const createProjectAction = async (project) => {
  // 1.clone项目
  await download(vueRepo, project, { clone: true });
  // 2.执行npm install
  const command = process.platform === "win32" ? "npm.cmd" : "npm"; // 在windows下npm的执行名不同
  await commandSpawn(command, ["install"], { cwd: `./${project}` });
  // 3.运行npm run serve
  await commandSpawn(command, ["run", "serve"], { cwd: `./${project}` });
  // 4.打开浏览器
  open("http://localhost:8080/");
};

// 添加组件的action
const addCpnAction = async (name, dest) => {
  // 1.需要一个模板ejs，编写对应的ejs模板，编译ejs模板得到result
  const result = await compile("vue-component.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });
  // console.log(dest);
  // 2.将result写入到对应的文件夹中
  const targetPath = path.resolve(dest, `${name}.vue`);
  // console.log("targetPath", targetPath);
  writeToFile(targetPath, result);
};

// 添加页面的action
const addPageAction = async (name, dest) => {
  // 1.编译ejs模板
  const data = {
    name,
    lowerName: name.toLowerCase(),
  };
  const pageResult = await compile("vue-component.ejs", data);
  const routeResult = await compile("vue-router.ejs", data);
  const targetDest = path.resolve(dest, name);
  // 写入到文件中
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.vue`);
    const targetRoutePath = path.resolve(targetDest, `router.js`);
    // console.log("targetPagePath", targetPagePath);
    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRoutePath, routeResult);
  }
};

// 添加store的action
const addStoreAction = async (name, dest) => {
  const storeResult = await compile("vue-store.ejs", {});
  const stypesResult = await compile("vue-types.ejs", {});

  if (createDirSync(dest)) {
    const targetPagePath = path.resolve(dest, `${name}.js`);
    const targetRoutePath = path.resolve(dest, `types.js`);
    // console.log("targetPagePath", targetPagePath);
    writeToFile(targetPagePath, storeResult);
    writeToFile(targetRoutePath, stypesResult);
  }
};

module.exports = {
  createProjectAction,
  addCpnAction,
  addPageAction,
  addStoreAction,
};
