export const environment = {
  production: true,

  // Cognitoユーザープールの設定
  amplify: {
    Auth: {
      region: 'ap-northeast-1',
      userPoolId: 'ap-northeast-1_ZcNVW5Aa5',
      userPoolWebClientId: 'bf3r25glfme3u5lqj7m05k1vm'
    }
  },
};
