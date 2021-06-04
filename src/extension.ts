// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import Main from "./main";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


	console.log('Congratulations, your extension "vscode-rickroll" is now active!');

	Main.start();
	let disposable = vscode.commands.registerCommand('vscode-rickroll.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from vscode-rickroll!');
	});
	context.subscriptions.push(disposable);
}


export function deactivate() { }
