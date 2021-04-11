const program = require("commander");
const {
  createProjectAction,
  addCpnAction,
  addPageAction,
  addStoreAction
} = require("./actions.js");
const createCommands = () => {
  program
    .command("create <project> [others...]")
    .description("clone repository into a folder")
    .action(createProjectAction); // 逻辑封装在actions.js中

  program
    .command("addcpn <name>")
    .description(
      "add vue component, 例如: why addcpn HelloWorld [-d src/components]"
    )
    .action((name) => {
      // console.log("program.dest", program._optionValues.dest);
      addCpnAction(name, program._optionValues.dest || "src/components");
    });

  program
    .command("addpage <page>")
    .description(
      "add vue page and router config, 例如: why addpage Home [-d src/pages]"
    )
    .action((page) => {
      // console.log("program.dest", program.dest);
      addPageAction(page, program._optionValues.dest || `src/pages`);
    });

  program
    .command("addstore <store>")
    .description("add vue store, 例如: why addstore user [-d src/store]")
    .action((store) => {
      // console.log("program.dest", program.dest);
      addStoreAction(store, program._optionValues.dest || `src/store/${store}`);
    });
};

module.exports = createCommands;
