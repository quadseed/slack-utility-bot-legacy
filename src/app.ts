import { App, BlockAction } from "@slack/bolt"
import "dotenv/config"
import dayjs from "dayjs"
import "dayjs/locale/ja"

dayjs.locale("ja")

import { getReleaseCommandModal, getReleaseBlockComponent } from "./modals/release"
import { getUserList } from "./utils/button"

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: 3000
})

app.command('/release', async ({ ack, body, client, logger }) => {
  await ack();

  const today = dayjs().format("YYYY-MM-DD")
  const channel_id = body.channel_id;

  try {
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: getReleaseCommandModal({channel_id, today}),
      
    });
    logger.info(result);
  }
  catch (error) {
    logger.error(error);
  }
});

app.action<BlockAction>("button-join", async ({ ack, respond, body }) => {
  await ack();

  const originalBlocks = body.message['blocks']

  let userList = getUserList('参加者* : `0`', originalBlocks[7]['text']['text'])

  if (userList.includes(`<@${body.user.id}>`) || userList[0] == `<@${body.user.id}>`) {
    userList = userList.filter(x => { return !x.includes(`<@${body.user.id}>`)})

    originalBlocks[7]['text']['text'] = "*参加者* : `" + userList.length + "`\n " + userList.join()
    await respond({blocks: originalBlocks, replace_original: true});
  } else {
    userList.push(`<@${body.user.id}>`)

    originalBlocks[7]['text']['text'] = "*参加者* : `" + userList.length + "`\n " + userList.join()
    await respond({blocks: originalBlocks, replace_original: true});
  }
});

app.action<BlockAction>('button-absence', async ({ ack, respond, body }) => {
  await ack();
 
  const originalBlocks = body.message['blocks']

  let userList = getUserList('欠席者* : `0`', originalBlocks[8]['text']['text'])

  if (userList.includes(`<@${body.user.id}>`) || userList[0] == `<@${body.user.id}>`) {
    userList = userList.filter(x => { return !x.includes(`<@${body.user.id}>`)})

    originalBlocks[8]['text']['text'] = "*欠席者* : `" + userList.length + "`\n " + userList.join()
    await respond({blocks: originalBlocks, replace_original: true});
  } else {
    userList.push(`<@${body.user.id}>`)

    originalBlocks[8]['text']['text'] = "*欠席者* : `" + userList.length + "`\n " + userList.join()
    await respond({blocks: originalBlocks, replace_original: true});
  }
});

app.view('release_command_modal', async ({ ack, body, view, client, logger }) => {
  await ack();

  const title = view['state']['values']['block_title']['title_string']['value']
  let detail = view['state']['values']['block_detail']['detail_string']['value']
  let remarks = view['state']['values']['block_remarks']['remarks_string']['value']

  const mention = view['state']['values']['block_mention']['mention_string']['selected_option']['value']

  const date_string = view['state']['values']['block_date']['date']['selected_date']
  const date = dayjs(date_string).format("M月D日（dd）")

  const time = view['state']['values']['block_time']['time']['selected_time']

  detail = Boolean(detail) ? detail : " "
  remarks = Boolean(remarks) ? remarks : " "

  const channel_id = view['private_metadata']

  try {
    await client.chat.postMessage({
      channel: channel_id,
      text: `イベント告知: ${title}`,
      blocks: getReleaseBlockComponent({title, detail, remarks, mention, date, time})
    });
    logger.info(body)
  } catch (error) {
    logger.error(error);
  }

});

(async () => {
  await app.start();

  console.log('⚡️ Bolt app is running!');
})();