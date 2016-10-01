// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    var disposable = vscode.commands.registerCommand('jumpBlock.down', function () {
        jump(true);
    });

    var disposable = vscode.commands.registerCommand('jumpBlock.up', function () {
       jump(false);
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;

// Jump to the first whitespace block either above or below the cursor.
function jump(isDown)
{
    const editor = vscode.window.activeTextEditor;
    const document = editor.document;
    const position = editor.selection.active;

    const jumpLine = getNextBlock(document, position, isDown);

    var newPosition = new vscode.Position(jumpLine.lineNumber, position.character);
    var newSelection = new vscode.Selection(newPosition, newPosition);
    editor.selection = newSelection;
    editor.revealRange(new vscode.Range(newPosition, newPosition));
}

// Gets the TextLine in document of the next whitespace block, either up or down from the start position.
function getNextBlock(document, startPosition, isDown) {
    const terminatingLineNumber = getTerminatingLineNumber(document, isDown);
    
    // If we don't find any whitespace block, we will default to the terminating line of the document. 
    var jumpLine = document.lineAt(terminatingLineNumber);

    // Begin search at the start position.    
    var i = startPosition.line;

    // If we start inside a whitespace block, move past it before looking for the next block.    
    var isStartingInWhitespaceBlock = document.lineAt(startPosition).isEmptyOrWhitespace;
    if (isStartingInWhitespaceBlock) {
        while (i != terminatingLineNumber && document.lineAt(i).isEmptyOrWhitespace) {
            i = nextLineNumber(i, isDown);
        }
    }

    // Search for the first line in a whitespace block.  Set the jump line when it's found.    
    while (i != terminatingLineNumber) {
        
        var line = document.lineAt(i);

        if (line.isEmptyOrWhitespace) {
            jumpLine = line;
            break;
        }

        i = nextLineNumber(i, isDown);
    }

    return jumpLine;
}

// Get either the first or last line number of the document.
function getTerminatingLineNumber(document, isDown) {
    return isDown ? (document.lineCount - 1) : 0;
}

// Get the next line number from the given index.  Either moves up or down.
function nextLineNumber(index, isDown) {
    return index + (isDown ? 1 : -1);
}