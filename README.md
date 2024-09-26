# Code to Mermaid Converter
已提交至 vscode 插件商店，搜索 `openai-mermaid-converter` 并安装即可使用。
## 简介

Code to Mermaid Converter 是一个 Visual Studio Code 扩展，它可以将选中的代码转换对应的**流程图**、**时序图**等实用图表，让你可以快速可视化代码逻辑。

该插件可以帮助你快速学习新代码，维护项目文档，是编程协作的实用工具。

## 功能

- 将选中的代码转换为 Mermaid 语法
- 实时预览生成的 Mermaid 图表
- 支持多种编程语言
- 使用 OpenAI API 进行智能转换

## 安装

1. 打开 VS Code
2. 转到扩展视图 (Ctrl+Shift+X 或 Cmd+Shift+X)
3. 搜索 "Code to Mermaid Converter"
4. 点击 Install

## 使用方法

1. 在编辑器中选择你想要转换的代码
2. 右键点击，选择 "Convert to Mermaid Diagram" 或使用命令面板 (Ctrl+Shift+P 或 Cmd+Shift+P) 输入 "Convert to Mermaid Diagram"
3. 转换后的 Mermaid 语法将在新的预览窗口中显示

## 配置

在使用此扩展之前，你需要设置你的 OpenAI API Key：

1. 打开命令面板 (Ctrl+Shift+P 或 Cmd+Shift+P)
2. 输入 "Set OpenAI API Key" 并选择它
3. 在提示框中输入你的 OpenAI API Key

或者，你也可以在设置中手动配置：

1. 转到 File > Preferences > Settings
2. 搜索 "OpenAI Mermaid Converter"
3. 在 "Api Key" 字段中输入你的 API Key

## 注意事项

- 此扩展依赖于 OpenAI API，请确保你有有效的 API Key
- 转换大段代码可能会消耗较多的 API 配额，请谨慎使用
- 生成的 Mermaid 语法可能需要进一步手动调整以获得最佳效果
- 此扩展会将你选中的代码发送到 OpenAI 的服务器进行处理。

## 贡献

欢迎提交 issues 或 pull requests 来帮助改进这个扩展。

## 许可

MIT License
