import * as vscode from 'vscode';
import * as path from 'path';
const EXTENSION_NAME = "vscode-rickroll";
import base64image from "./image";

import * as fs from 'fs';


const cssName: string = vscode.version >= "1.38" ? 'workbench.desktop.main.css' : 'workbench.main.css';


const cssFilePath = path.join(path.dirname((require.main as NodeModule).filename), 'vs', 'workbench', cssName);

const toSaveCss = `/*ext-${EXTENSION_NAME}-start*/
body{
    background-size:contain;
    background-repeat: no-repeat;
    opacity:0.8;
    background-position:center center;
    background-image:url('${base64image}'); 
}
/*ext-${EXTENSION_NAME}-end*/`;



const readCssFile = (): string => fs.readFileSync(cssFilePath, "utf-8");


export const removeCss = () => {
    const fileContent: string = readCssFile();
    let reExp = new RegExp("\\/\\*ext-" + EXTENSION_NAME + "-start\\*\\/[\\s\\S]*?\\/\\*ext-" + EXTENSION_NAME + "-end\\*" + "\\/", "g");
    const cleanFileContent = fileContent.replace(reExp, "")
    fs.writeFileSync(cssFilePath, cleanFileContent);
}


export const saveCss = () => {
    removeCss(); // Evitar re-save
    const fileContent: string = readCssFile();
    fs.writeFileSync(cssFilePath, fileContent + toSaveCss);
}