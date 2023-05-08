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
        : (env === 'dev' ? '//43.207.190.68:8080'
          // 本地
          : '//chatnwork.com:8080')))