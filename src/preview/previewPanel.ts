import * as vscode from 'vscode';

export class PreviewPanel {
  public static currentPanel: PreviewPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri, mermaidSyntax: string) {
    console.log('createOrShow called with mermaidSyntax:', mermaidSyntax);
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

    if (PreviewPanel.currentPanel) {
      console.log('Revealing existing panel');
      PreviewPanel.currentPanel._panel.reveal(column);
      PreviewPanel.currentPanel._update(mermaidSyntax);
      return;
    }

    console.log('Creating new webview panel');
    const panel = vscode.window.createWebviewPanel(
      'mermaidPreview',
      'Mermaid Preview',
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.file(extensionUri.fsPath + '/node_modules')]
      }
    );

    PreviewPanel.currentPanel = new PreviewPanel(panel, extensionUri, mermaidSyntax);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, mermaidSyntax: string) {
    console.log('PreviewPanel constructor called');
    this._panel = panel;
    this._extensionUri = extensionUri;

    this._update(mermaidSyntax);

    this._panel.onDidDispose(() => {
      console.log('Panel disposed');
      this.dispose();
    }, null, this._disposables);
  }

  public dispose() {
    console.log('Disposing PreviewPanel');
    PreviewPanel.currentPanel = undefined;

    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        console.log('Disposing:', x);
        x.dispose();
      }
    }
  }

  private _update(mermaidSyntax: string) {
    console.log('Updating webview with new mermaidSyntax:', mermaidSyntax);
    const webview = this._panel.webview;

    this._panel.webview.html = this._getHtmlForWebview(webview, mermaidSyntax);
    console.log(this._panel.webview.html);
  }

  private _getHtmlForWebview(webview: vscode.Webview, mermaidSyntax: string): string {
    console.log('Generating HTML for webview');
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mermaid Preview</title>
</head>
<body>
  <pre class="mermaid">${mermaidSyntax}</pre>
    <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ startOnLoad: true });
  </script>
</body>
</html>`;
  }
}