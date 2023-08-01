<template>
  <div class="doc">
    <h6>Chatstream</h6>
    <p>使用chatstream API，您可以使用gpt-4为您的软件提供自然语言能力，或在以下场景构建自己的程序：</p>
    <ul>
      <li>起草文章材料</li>
      <li>编写代码</li>
      <li>回答问题</li>
      <li>AI助理</li>
      <li>AI机器人</li>
      <li>翻译语言</li>
      <li>为游戏模拟角色</li>
      <li>为您的软件提供自然语言能力，等等</li>
    </ul>
    <h6>介绍</h6>
    <p class="paragraph">主要输入是消息参数。消息必须是一个消息对象数组，每个对象都有一个角色（可以是"system"、"user"或"assistant"）和内容（消息的内容）。对话可以有1条消息或多条消息。</p>
    <p class="paragraph">通常，对话以系统消息开头，然后是用户消息和助手消息交替出现。系统消息帮助设置助手的行为。在上面的示例中，助手被指示为"你是一个乐于助人的助手"。用户消息帮助指导助手。它们可以由应用程序的最终用户生成，也可以由开发人员设置为指令。助手消息帮助存储先前的响应。它们也可以由开发人员编写，以帮助提供期望的行为示例。</p>
    <p class="paragraph">包括对话历史在内有助于用户指令参考先前的消息。在上面的示例中，用户的最后一个问题"它是在哪里举行的？"只有在先前关于2020年世界系列赛的消息上下文中才有意义。因为模型没有记忆过去的请求，所有相关信息必须通过对话提供。如果一个对话无法适应模型的令牌限制，就需要以某种方式对其进行缩短。</p>
    <p :style="{marginBottom: 0}">参考！！</p>
    <p :style="{marginBottom: '40px'}">API Reference - OpenAI API</p>
    <h6>接口</h6>
    <div class="marked"
         v-html="marked(markdown)"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'

const docRef = ref()

onMounted(() => {
  // marked.use({
  marked.setOptions({
    renderer: new marked.Renderer(),
    langPrefix: 'hljs language-',
    highlight: function (code: any) {
      return hljs.highlightAuto(code).value
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
  })
  hljs.initHighlightingOnLoad()
})

const markdown = `# API文档

## 接口名称

\`/chat_stream\`

## 请求方法

\`POST\`

## 描述

该接口用于与OpenAI的GPT模型进行实时交互，返回模型生成的响应。响应以 Server-Sent Events (SSE) 的格式发送给客户端。

## 请求参数

请求参数以 JSON 格式发送。

字段名 | 类型 | 描述
--- | --- | ---
\`model\` | string | 使用的模型名称。目前支持的模型有：\`gpt-3.5-turbo\` 和 \`gpt-4\`。
\`messages\` | array | 一个包含消息对象的数组。每个消息对象都有一个 \`role\`（可以是 \`system\`、\`user\` ）和一个 \`content\` 字段。
\`email\` | string | 用户的电子邮件地址，用于检查用户状态。

## 响应参数

响应参数以 SSE 格式发送。

字段名 | 类型 | 描述
--- | --- | ---
\`content\` | string | 模型生成的响应内容。

## 错误码

错误码 | 描述
--- | ---
400 | 提供的模型无效。可用的模型是：\`gpt-3.5-turbo\` 和 \`gpt-4\`。
1 | 用户状态不可用。

## 示例

### 请求示例

\`\`\`json
POST /chat_stream
Content-Type: application/json

{
    "model": "gpt-3.5-turbo",
    "messages": [
        {
            "role": "system",
            "content": "You are a helpful assistant."
        },
        {
            "role": "user",
            "content": "Who won the world series in 2020?"
        }
    ],
    "email": "user@example.com"
}
\`\`\`

### 响应示例

\`\`\`json
data: {"content": "The Los Angeles Dodgers won the World Series in 2020."}
\`\`\`

请注意，由于使用了 SSE，响应将以实时流的形式发送，每个事件都以 \`data:\` 开头，后面跟着 JSON 数据，然后是两个换行符。`

</script>

<style lang="scss" scoped>
.doc {
  color: #fff;
  width: 850px;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 20px;
  > h6 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  > p {
    font-size: 14px;
    margin-bottom: 10px;
  }
  > ul {
    margin-left: 20px;
    margin-bottom: 40px;
    > li {
      margin-bottom: 6px;
    }
  }
  > .paragraph {
    margin-bottom: 20px;
  }
}
</style>








