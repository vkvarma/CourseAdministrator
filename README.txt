-Course
-Student
-Registered-Student


******
popover for confirmation
*****************ADDING UNDERSCORE IN ANUGULAR2******************
1- npm install underscore --save // save to dependencies: required to run
2- npm install @types/underscore --save-dev // save to dev dependencies: required 
3- in dev mode in Component:
   import * as _ from 'underscore';
   let rs = _.map([1, 2, 3], function(num){ return num * 3; });
   console.log(rs);


*****************DEBUG AND RUN ANGULAR 2 IN VS CODE******************
Before you begin, make sure you have latest version of VS code. You can verify latest version – Help > Check For Updates or About.
1- Install extension called 'Debugger for Chrome'. Once install complete, restart VS code.
2- Go to Debug window, open launch.json using Chrome.
3- In Launch.json configuration section, use below config
{
    "type": "chrome",
    "request": "launch",
    "name": "Launch Chrome",
    "url": "http://localhost:4200/dashboard",
    "sourceMaps": true,
    "trace": true,
    "webRoot": "${workspaceRoot}",
    "userDataDir": "${workspaceRoot}/out/chrome"
}
4- In tsconfig.json, make sure you have "sourceMap": true
This completes your debug environment settings. Now, before you start debugging, make sure all your existing Chrome.exe instances are closed. Verify from Task Manager OR Use DOS command ‘killall chrome’
5- Run your project, using npm start/ng serve command and Chrome as default browser.
6- Once application is run successfully, you will receive port number. Copy URL from chrome browser and paste into url section above. (NOTE: If you are using routing in your application then url would like above otherwise it will be ending index.html etc)
7- Now, place breakpoints wherever you want in your typescript files.

