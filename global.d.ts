/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly SLACK_SIGNING_SECRET: string
    readonly SLACK_BOT_TOKEN: string
    readonly SLACK_APP_TOKEN: string
  }
}