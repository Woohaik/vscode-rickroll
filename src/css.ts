import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import base64image from "./image";

const EXTENSION_NAME = "vscode-rickroll";
const reExp = new RegExp("\\/\\*ext-" + EXTENSION_NAME + "-start\\*\\/[\\s\\S]*?\\/\\*ext-" + EXTENSION_NAME + "-end\\*" + "\\/", "g");
const cssName: string = vscode.version >= "1.38" ? 'workbench.desktop.main.css' : 'workbench.main.css';
const cssFilePath = path.join(path.dirname((require.main as NodeModule).filename), 'vs', 'workbench', cssName);
const toSaveCss = `/*ext-${EXTENSION_NAME}-start*/
@keyframes doRick{
    from {
        transform: scale(1);
        opacity:0.8;
    }
    to {
        transform: scale(2);
        opacity:0 !important;
    }
}
body{
    animation: doRick 1.5s reverse forwards;
    background-size:contain;
    animation-delay: 2s;
    background-repeat: no-repeat;
    background-position:center center;
    background-image:url('${base64image}'); 
}
/*ext-${EXTENSION_NAME}-end*/`;

const readCssFile = (): string => fs.readFileSync(cssFilePath, "utf-8");

const hasTheBg = (): boolean => readCssFile().includes(`/*ext-${EXTENSION_NAME}-start*/`);

const removeCss = (): void => fs.writeFileSync(cssFilePath, readCssFile().replace(reExp, ""));


const saveCss = (): void => {
    removeCss(); // Evitar re-save
    fs.writeFileSync(cssFilePath, readCssFile() + toSaveCss);
};

export {
    saveCss,
    removeCss,
    hasTheBg
};