const { writeFile } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
   ? `./src/environments/environment.prod.ts`
   : `./src/environments/environment.ts`;
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   API_URL: "${process.env.API_URL}",
   ANOTHER_API_SECRET: "${process.env.ANOTHER_API_SECRET}"
};
`;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (error:Error)
 {
   if (error) {
      console.log(error);
   }
   console.log(`Wrote variables to ${targetPath}`);
});
if (!process.env.API_KEY) {
   console.error('All the required environment variables were not provided!');
   process.exit(-1);
}