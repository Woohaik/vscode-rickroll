import { saveCss, removeCss } from "./getCss";
import * as vscode from 'vscode';


class Main {
    private lastLine: number;
    private _disposable: vscode.Disposable;
    private _subscriptions: vscode.Disposable[] = [];
    constructor() {
        this.lastLine = 0;
        console.log("Im entered here");
        vscode.window.onDidChangeTextEditorSelection(this.evHandler, this, this._subscriptions);
        vscode.window.onDidChangeActiveTextEditor(this.evHandler, this, this._subscriptions);
        this._disposable = vscode.Disposable.from(...this._subscriptions);
    }

    public dispose() {
        this._disposable.dispose();
    }

    private show() {
        saveCss();
        vscode.commands.executeCommand('workbench.action.files.save'); // Saving your progress before reloading :p
        vscode.commands.executeCommand('workbench.action.reloadWindow');
    }

    private evHandler(e: any) {
        const returned = this.hasEnteredReturn(e);
        console.log(returned);
        if (returned) this.show();
    }

    private hasEnteredReturn(e: vscode.TextEditorSelectionChangeEvent): boolean {
        let lastPosition: vscode.Selection = e.textEditor.selections[0];
        console.log("LastLIne xd", this.lastLine);
        let lineChanged = (lastPosition.end.line !== this.lastLine);
        this.lastLine = lastPosition.end.line;
        return lineChanged;
    }
}


export const uninstall = () => {
    removeCss();
    vscode.commands.executeCommand('workbench.action.reloadWindow');
}


export default new Main();