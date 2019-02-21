// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  local: false,
  production: false,
  appBridgeConfig: {
    title: 'CustomApp',
    url: 'http://localhost:4200/sample',
    color: 'blue'
  },
  settingsConfig: {
    title: 'CustomApp',
    authKey: 'UcTw_E_D#Wg]>kVUnK|*~U,Gmhe*{X',
    url: 'https://aquarium-staging.bullhorncloud.com/data'
  }
};
