<template>
  <List />
  <div class="operate">
    <el-space class="operate_btns" :size="20">
      <el-check-tag :checked="dialog" @change="(status: boolean) => dialog = status">
        携带对话数 {{ dialog ? 3 : 0 }}
      </el-check-tag>
      <el-check-tag :checked="gpt4" @change="(status: boolean) => gpt4 = status">
        开启GPT4 <el-checkbox v-model="gpt4" size="small" @change="() => gpt4 = !gpt4" />
      </el-check-tag>
    </el-space>
    <div class="operate_textarea">
      <el-input v-model="textarea" :autosize="{ minRows: 1, maxRows: 4 }" type="textarea" placeholder="ctrl+enter发送消息"
        maxlength="255" @keyup.ctrl.enter="handleSend" />
      <el-icon @click="handleSend">
        <Promotion />
      </el-icon>
    </div>
    <div class="operate_text">
      <p>此产品基于OpenAI开发，可能会回复不真实不准确的信息，请注意甄别！</p>
      <p class="operate_text_copyright">contact@kuainsight.com</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import gptStore from '@/store/gpt'
import userStore from '@/store/user'
import dialogStore from '@/store/dialog'
import { Promotion } from '@element-plus/icons-vue'
import { chatStream } from '@/api/chat'
import List from '@/components/List.vue'

const dialog = ref(true)
const gpt4 = ref(true)
const textarea = ref('')
const { contents } = storeToRefs(gptStore())
const { login, email } = storeToRefs(userStore())
const { loginDialog } = storeToRefs(dialogStore())

const handleSend = () => {
  if (!login.value) return loginDialog.value = true

  chatStream({
    email: email.value,
    model: gpt4 ? 'gpt-4' : 'gpt-3.5-turbo',
    messages: dialog
      ? [...contents.value.slice(-6).map(content => ({ role: content.identity, content: content.text, })), { role: 'user', content: textarea.value }]
      : [textarea.value]
  }).then(async (res) => {
    const reader = res.getReader()
    let done = false
    let content = ''

    while (!done) {
      const { value, done: readerDone } = await reader.read()

      if (value) {
        content += value
        contents.value[contents.value.length - 1]['identity'] === 'user'
          ? contents.value.push({
            id: new Date().getTime(),
            identity: 'system',
            text: content
          })
          : contents.value[contents.value.length - 1].text = content
      }
      done = readerDone
    }
  })


  contents.value.push({
    id: new Date().getTime(),
    identity: 'user',
    text: textarea.value
  })

  textarea.value = ''
}

</script>

<style lang="scss" scoped>
.operate {
  width: 900px;
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: 0 auto;

  >.operate_btns {
    margin-bottom: 6px;

    .el-check-tag {
      color: #6d82d0;
      font-weight: 400;

      &.is-checked {
        color: #fff;
        background-color: #6d82d0;
      }

      >.el-checkbox {
        height: 12px;
      }
    }


  }

  >.operate_textarea {
    width: 100%;
    position: relative;
    margin-bottom: 20px;
    background-color: #40414f;
    border-radius: 4px;

    >.el-textarea {
      width: calc(100% - 50px);

      :global(.el-textarea__inner) {
        background-color: #40414f;
        box-shadow: none;
        resize: none;
        border: none;
        color: #fff;
        font-size: 20px;
        line-height: 40px;
        height: 40px;
        overflow-y: hidden;
      }

      :global(.el-textarea__inner:hover) {
        box-shadow: none;
      }

      :global(.el-textarea__inner:focus) {
        box-shadow: none;
      }
    }

    >.el-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      color: #fff;
      font-size: 30px;
    }
  }

  >.operate_text {
    color: #fff;
    text-align: center;
    font-weight: 400;
    font-size: 12px;

    >.operate_text_copyright {
      margin-top: 12px;
    }
  }
}
</style>