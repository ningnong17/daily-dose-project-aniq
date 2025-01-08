const { defineConfig } = require("cypress");
const { spawn } = require("child_process");
let server;
let baseUrl;

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 60000, // 5 minutes for commands like cy.visit
    taskTimeout: 60000, 
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);

      on("task", {
        startServer() {
          return new Promise((resolve, reject) => {
            // Check if the server is already running
            if (server) {
              resolve(baseUrl);
            }

            server = spawn("node", ["-r", "nyc", "index-test.js"]);

            server.stdout.on("data", (data) => {
              console.log(data.toString()); // Log the output for debugging
              if (data.toString().includes("Daily Dose Project:")) {
                const baseUrlPrefix = "Daily Dose Project:";
                const startIndex = data.toString().indexOf(baseUrlPrefix);
                if (startIndex !== -1) {
                  baseUrl = data.toString().substring(startIndex + baseUrlPrefix.length).trim();
                  resolve(baseUrl);
                }
              }
            });

            server.stderr.on("data", (data) => {
              reject(data);
            });
          });
        },
        stopServer() {
          if (server) {
            server.kill();
          }
          return null;
        }
      });

      return config
    },
  }
});