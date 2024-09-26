import axios from 'axios';
import * as vscode from 'vscode';

export async function getMermaidSyntax(code: string): Promise<string> {
  console.log('开始将代码转换为Mermaid语法');
  
  try {
    const config = vscode.workspace.getConfiguration('openaiMermaidConverter');
    const apiKey = config.get<string>('apiKey');
    console.log(apiKey)

    if (!apiKey) {
      throw new Error('OpenAI API Key not configured. Please set it in the extension settings.');
    }

    console.log('准备请求数据');
    const payload = {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: '你是一个将代码转换为Mermaid语法的有用助手。'
        },
        {
          role: 'user',
          content: `将以下代码转换为Mermaid语法：\n\n${code}\n\n请只返回Mermaid语法，不要包含任何其他文字、符号或代码块标记。`
        }
      ]
    };
    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    };
    
    console.log('发送请求到OpenAI API');
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      payload,
      { headers }
    );

    console.log('检查响应状态');
    if (response.status !== 200) {
      throw new Error(`请求失败，状态码: ${response.status}`);
    }
    
    console.log('解析响应数据');
    const mermaidSyntax = response.data.choices[0].message.content.trim();
    
    console.log('成功转换代码为Mermaid语法');
    return mermaidSyntax;
  } catch (error) {
    console.error('调用OpenAI API时出错:', error);
    throw new Error('转换代码为Mermaid语法失败');
  }
}