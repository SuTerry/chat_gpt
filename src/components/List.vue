<template>
  <div class="ul"
       ref="listRef">
    <div :class="['list', { 'gpt_list': index % 2 }]"
         v-for="(content, index) in contents"
         :key="content.id">
      <div class="item">
        <img :src="content.identity === 'user' ? userImg : gptImg"
             alt="">
        <div class="item_content"
             v-html="marked(content.text)"></div>
        <el-space :size="20">
          <div class="btn"
               @click="copy(content.text)">复制</div>
          <el-popconfirm title="确定要删除?"
                         @confirm="delItem(content.id)">
            <template #reference>
              <div class="btn">删除</div>
            </template>
          </el-popconfirm>
        </el-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUpdated } from 'vue'
import { storeToRefs } from 'pinia'
import gptStore from '@/store/gpt'
import useClipboard from 'vue-clipboard3'
import { marked } from 'marked'
import hljs from 'highlight.js'

import userImg from '@/assets/user.jpg'
import gptImg from '@/assets/1.png'

const listRef = ref()
const { contents } = storeToRefs(gptStore())
const { toClipboard } = useClipboard()

const copy = async (text: string) => {
  await toClipboard(text)
}

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
  // hljs.initHighlightingOnLoad()
})

onUpdated(() => {
  setTimeout(() => {
    window.scrollTo({
      top: listRef.value.scrollHeight,
      behavior: 'smooth',
    })
  })
})
/**
 * 删除
 * @param id
 */
const delItem = (id: number) => {
  contents.value = contents.value.filter((content) => content.id !== id)
}
</script>

<style lang="scss" scoped>
.ul {
  margin-bottom: 200px;
  .list {
    padding-left: 124px;

    > .item {
      width: 1024px;
      margin: 0 auto;
      display: flex;
      color: #fff;
      padding: 20px 0;

      > img {
        width: 36px;
        height: 36px;
        margin-right: 20px;
      }

      > .item_content {
        flex: 1;
        margin-right: 50px;
        padding: 2px 0px;
        font-size: 16px;
        line-height: 30px;

        :global(table) {
          border-collapse: collapse;
          border: 1px solid #ccc;
        }
        :global(th) {
          border: 1px solid #ccc;
          padding: 8px;
        }
        :global(td) {
          border: 1px solid #ccc;
          padding: 8px;
        }
      }

      > .el-space {
        align-items: start !important;
      }

      .btn {
        margin-top: 8px;
        cursor: pointer;
      }
    }

    &.gpt_list {
      background-color: #444653;
    }
  }
}

:global(.el-popper.el-popover) {
  border: none;
}

:global(.el-popper.el-popover > .el-popper__arrow::before) {
  border: none;
}
</style>