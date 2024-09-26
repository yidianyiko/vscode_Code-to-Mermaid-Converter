import * as vscode from 'vscode';
import { activate as activateConvertToMermaid } from './commands/convertToMermaid';

export function activate(context: vscode.ExtensionContext) {
  activateConvertToMermaid(context);

  // 注册设置 API Key 的命令
  let setApiKeyCommand = vscode.commands.registerCommand('openaiMermaidConverter.setApiKey', async () => {
    const apiKey = await vscode.window.showInputBox({
      prompt: 'Enter your OpenAI API Key',
      password: true
    });

    if (apiKey) {
      await vscode.workspace.getConfiguration('openaiMermaidConverter').update('apiKey', apiKey, true);
      vscode.window.showInformationMessage('OpenAI API Key has been set successfully.');
      console.log(apiKey)
    }
  });

  context.subscriptions.push(setApiKeyCommand);
}

export function deactivate() {}
