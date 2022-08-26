export const getUserList = (text: string) => {
  const userListString = text.substr(text.indexOf('\n ') + 2)

  console.log("list string: ;;" + userListString)

  const divider = /,/

  const array = (divider.test(userListString) || userListString != '参加者* : `0`') ? userListString.split(divider) : []

  return array.filter(Boolean)
}