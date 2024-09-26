import * as vscode from 'vscode';
import { getMermaidSyntax } from '../api/openai';
import { PreviewPanel } from '../preview/previewPanel';

export function activate(context: vscode.ExtensionContext) {
  // 注册命令 'extension.convertToMermaid'
  let disposable = vscode.commands.registerCommand('extension.convertToMermaid', async () => {
    console.log('命令 extension.convertToMermaid 被调用');

    // 获取当前活动的编辑器
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      console.log('找到活动编辑器');

      // 获取选中的文本
      const document = editor.document;
      const selection = editor.selection;
      const selectedText = document.getText(selection);

      if (!selectedText) {
        // 如果没有选中文本，显示错误消息
        vscode.window.showErrorMessage('请先选择一些代码。');
        console.log('没有选中文本');
        return;
      }

      console.log('选中的文本:', selectedText);

      try {
        // 调用 OpenAI API 将代码转换为 Mermaid 语法
        console.log('开始调用 OpenAI API');
        const mermaidSyntax = await getMermaidSyntax(selectedText);
        console.log('OpenAI API 调用成功');

        // 显示成功消息
        vscode.window.showInformationMessage('代码已成功转换为Mermaid语法。');
        console.log('Mermaid Syntax:', mermaidSyntax);

        // 创建或显示 Webview 面板
        PreviewPanel.createOrShow(vscode.Uri.file(context.extensionPath), mermaidSyntax);
      } catch (error) {
        // 如果调用失败，显示错误消息
        vscode.window.showErrorMessage('转换代码为Mermaid语法失败。');
        console.error('调用 OpenAI API 时出错:', error);
      }
    } else {
      // 如果没有活动的编辑器，显示错误消息
      vscode.window.showErrorMessage('请打开一个代码文件并选择一些代码。');
      console.log('没有找到活动编辑器');
    }
  });

  // 将命令添加到插件的订阅中
  context.subscriptions.push(disposable);
  console.log('命令 extension.convertToMermaid 已注册');
}
