import * as vscode from 'vscode';
import { hasTheBg, removeCss } from './css';
import Main from "./main";
import { play } from './player';

export function activate(context: vscode.ExtensionContext) {
	hasTheBg() && play(); // Sound will start if the bg has been changed
	let disposable: vscode.Disposable = vscode.commands.registerCommand('vscode-rickroll.info', () => {
		vscode.window.showInformationMessage(
			`Thank you for installing vscode-rickroll, Good rickrolls! 
			Rickroll will be activated random while typing`
		);
	});
	vscode.commands.registerCommand('vscode-rickroll.removeBG', () => {
		removeCss();
		vscode.commands.executeCommand('workbench.action.reloadWindow');
	});
	context.subscriptions.push(disposable);
	context.subscriptions.push(Main);
}

export function deactivate() {
	// lol
}
