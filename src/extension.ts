import * as vscode from 'vscode';
import Main, { uninstall } from "./main";

type dispo = { dispose(): any }

let watcher: dispo;

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vscode-rickroll" is now active!');
	let disposable = vscode.commands.registerCommand('vscode-rickroll.info', () => {
		vscode.window.showInformationMessage(
			`Thank you for installing vscode-rickroll, Good rickrolls! 
			Rickroll will be activated random while typing`
		);
	});

	let disposable2 = vscode.commands.registerCommand('vscode-rickroll.removeBG', () => {
		uninstall();
	});



	watcher = watcher || Main; // When restart continue watching
	context.subscriptions.push(disposable);
	context.subscriptions.push(watcher);
}

export function deactivate() {
	// lol
}
