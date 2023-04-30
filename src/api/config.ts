// 运行环境变量
const env = process.env.WEB_ENV

// 接口域名
export const API_HOST =
  // 生产
  (env === 'pro') ? ''
    // 预生产
    : (env === 'pre' ? ''
      // 测试
      : (env === 'sit' ? ''
        // 开发
        : (env === 'dev' ? '//api.openai.com'
          // 本地
          : '//api.openai.com')))