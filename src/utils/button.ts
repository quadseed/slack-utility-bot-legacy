export const getUserList = (prefix: string, text: string) => {
  const userListString = text.substr(text.indexOf('\n ') + 2)

  const divider = /,/

  const array = (divider.test(userListString) || userListString != prefix) ? userListString.split(divider) : []

  return array.filter(Boolean)
}