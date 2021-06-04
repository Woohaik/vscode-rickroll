import * as vscode from 'vscode';
import * as path from 'path';
const EXTENSION_NAME = "vscode-rickroll";
import base64image from "./image";

import * as fs from 'fs';


const cssName: string = vscode.version >= "1.38" ? 'workbench.desktop.main.css' : 'workbench.main.css';


const cssFilePath = path.join(path.dirname((require.main as NodeModule).filename), 'vs', 'workbench', cssName);

const toSaveCss = `
/*ext-${EXTENSION_NAME}-start*/
body{
    background-size:cover;
    background-repeat: no-repeat;
    opacity:0.6;
    background-image:url('${base64image}'); 
}
/*ext-${EXTENSION_NAME}-end*/`;



export const saveCss = () => {
    const fileContent = fs.readFileSync(cssFilePath, "utf-8");
    fs.writeFileSync(cssFilePath, fileContent + toSaveCss);
}