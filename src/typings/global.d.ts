// 为react添加全局自定义属性
// declare module 'react' {
// let $router: RouteComponentProps
// }


declare global {
  interface Window {
    marked: {
      parse: (str: string) => TrustedHTML
    }
    hljs: {
      initHighlightingOnLoad: () => void
      highlightAll: () => void
    }
  }
}