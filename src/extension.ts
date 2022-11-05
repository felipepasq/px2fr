import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const formatString = (value: string) => {
    return value
      .split(" ")
      .filter((element) => element !== "" && element.includes("px"))
      .map((element) => element.replace("px", ""));
  };

  const convertToNumber = (values: string[]) => {
    return values.map((element) => +element);
  };

  const getTotal = (values: number[]) => {
    return values.reduce((element, acc) => element + acc, 0);
  };

  const getFrValues = (values: number[], total: number) => {
    return values.map((e) => (e / total).toFixed(2));
  };

  const parseString = (values: string[]) => {
    return values.map((element) => element.toString().concat("fr")).join(" ");
  };

  let disposable = vscode.commands.registerCommand(
    "pxtofr.convertpxtofr",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const text = editor.document.getText(editor.selection);
      if (!text.includes("px")) {
        vscode.window.showInformationMessage(
          "O texto selecionado não possui px para serem convertidos !"
        );
        return;
      }
      const formattedString = formatString(text);
      const convertedString = convertToNumber(formattedString);
      const total = getTotal(convertedString);
      const frValues = getFrValues(convertedString, total);
      const parsedString = parseString(frValues);

      editor.edit((editBuilder) => {
        editBuilder.replace(editor.selection, parsedString);
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
