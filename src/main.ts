import { saveCss, removeCss } from "./css";
import * as vscode from 'vscode';

class Main {
    private lastLine: number;
    private _disposable: vscode.Disposable;
    private _subscriptions: vscode.Disposable[] = [];
    constructor() {
        this.lastLine = 0;
        vscode.window.onDidChangeTextEditorSelection(this.evHandler, this, this._subscriptions);
        vscode.window.onDidChangeActiveTextEditor(this.evHandler, this, this._subscriptions);
        this._disposable = vscode.Disposable.from(...this._subscriptions);
    }

    public dispose() {
        this._disposable.dispose();
    }

    private show() {
        if (Math.floor(Math.random() * 20) === 7) { // Randomly shows after some returns;
            saveCss();
            vscode.commands.executeCommand('workbench.action.files.save'); // Saving your progress before reloading :p
            vscode.commands.executeCommand('workbench.action.reloadWindow');
        }
    }

    private evHandler(e: any) {
        const returned = this.hasEnteredReturn(e);
        returned && this.show();
    }

    private hasEnteredReturn(e: vscode.TextEditorSelectionChangeEvent): boolean {
        const lastPosition: vscode.Selection = e.textEditor.selections[0];
        let lineChanged = (lastPosition.end.line !== this.lastLine);
        this.lastLine = lastPosition.end.line;
        return lineChanged;
    }
}


export default new Main();