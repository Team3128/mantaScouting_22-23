Refactor node to whole repo:

to run a dev server on the repository, 

npm run nep2n; 
npm run mercy;
npm run osprey;

scripts are in package.json, those commands run `npx snowpack dev --config config/Mercy.config.js`
Those config files are in the config folder, which change the openUrl property to their respective subfolders. 

For example, running `npm run nep2n` runs the respective script in `package.json`. 
Which is `npx snowpack dev --config config/Nep2n.config.js`, and that changes the openURl property to `Nep2n/index.html`, so when you run a live server, the Url opens 
`localhost:8080/Nep2n/index.html`, which is the project that you want to edit. 
