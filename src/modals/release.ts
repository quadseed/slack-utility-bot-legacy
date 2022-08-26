import { View } from "@slack/bolt"

type ReleaseCommandProps = {
  channel_id: string,
  today: string
}

type ReleaseProps = {
  title: string,
  detail: string,
  remarks: string,
  mention: string,
  date: string,
  time: string
}



export const getReleaseCommandModal = ({channel_id, today}: ReleaseCommandProps) => {

  const releaseCommandModal: View = {
    type: "modal",
    callback_id: 'release_command_modal',
    title: {
      type: "plain_text",
      text: "イベント告知を送信",
      emoji: true
    },
    submit: {
      type: "plain_text",
      text: "送信",
      emoji: true
    },
    close: {
      type: "plain_text",
      text: "キャンセル",
      emoji: true
    },
    private_metadata: channel_id,
    blocks: [
      {
        type: "input",
        block_id: "block_title",
        element: {
          type: "plain_text_input",
          action_id: "title_string",
          placeholder: {
            type: "plain_text",
            text: "Ex: インフラ実験, ワークショップ, etc..."
          }
        },
        "label": {
          "type": "plain_text",
          "text": "イベント内容",
          "emoji": true
        },
        "optional": false
      },
      {
        "type": "input",
        block_id: "block_detail",
        "element": {
          "type": "plain_text_input",
          "action_id": "detail_string",
          "multiline": true
        },
        "label": {
          "type": "plain_text",
          "text": "詳細",
          "emoji": true
        },
        "optional": true
      },
      {
        "type": "input",
        block_id: "block_remarks",
        "element": {
          "type": "plain_text_input",
          "action_id": "remarks_string",
          "multiline": true
        },
        "label": {
          "type": "plain_text",
          "text": "備考",
          "emoji": true
        },
        "optional": true
      },
      {
        "type": "divider"
      },
      {
        "type": "input",
        block_id: "block_mention",
        "element": {
          "type": "radio_buttons",
          "options": [
            {
              "text": {
                "type": "plain_text",
                "text": "無効",
                "emoji": true
              },
              "value": "false"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "有効",
                "emoji": true
              },
              "value": "true"
            }
          ],
          initial_option: {
            "text": {
              "type": "plain_text",
              "text": "無効",
              "emoji": true
            },
            "value": "false"
          },
          "action_id": "mention_string"
        },
        "label": {
          "type": "plain_text",
          "text": "チャンネルメンション",
          "emoji": true
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "input",
        block_id: "block_date",
        "element": {
          "type": "datepicker",
          "initial_date": today,
          "placeholder": {
            "type": "plain_text",
            "text": "Select a date",
            "emoji": true
          },
          "action_id": "date"
        },
        "label": {
          "type": "plain_text",
          "text": "開催日",
          "emoji": true
        }
      },
      {
        "type": "input",
        block_id: "block_time",
        "element": {
          "type": "timepicker",
          "initial_time": "09:00",
          "placeholder": {
            "type": "plain_text",
            "text": "Select time",
            "emoji": true
          },
          "action_id": "time"
        },
        "label": {
          "type": "plain_text",
          "text": "開催時刻",
          "emoji": true
        }
      }
    ]
  }

  return releaseCommandModal
}

export const getReleaseBlockComponent = ({title, detail, remarks, mention, date, time}: ReleaseProps) => {
  const releaseBlockComponent = [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": (mention == "true" ? "<!channel>" : " ")
			}
		},
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": title,
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": detail
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*開催日時*:  " + date + "\n *開催時刻*:  " + time
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": remarks
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
      block_id: "join",
			"text": {
				"type": "mrkdwn",
				"text": "*参加者* : `0`"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "参加する",
					"emoji": true
				},
				"value": "click_me_123",
				"action_id": "button-join"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*欠席者* : `0`"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "欠席する",
					"emoji": true
				},
				"value": "click_me_123",
				"action_id": "button-absence"
			}
		}
	]

  return releaseBlockComponent
}
