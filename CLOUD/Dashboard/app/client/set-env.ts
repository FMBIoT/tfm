const fs = require('fs');
const writeFile = fs.writeFile;
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
// Load node modules
// require('dotenv').load();
require('dotenv').config()

// `environment.ts` file structure
const envConfigFile = `export const environment = {
   production: false,
   api_uri: 'http://${process.env.IP_HOST}:${process.env.APP_PORT}/',
};
`;
console.log('The file `environment.ts` will be written with the following content: \n');
console.log(envConfigFile);
writeFile(targetPath, envConfigFile, function (err: any) {
   if (err) {
       throw console.error(err);
   } else {
       console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
   }
});