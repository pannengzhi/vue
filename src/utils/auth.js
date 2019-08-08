import Cookies from 'js-cookie'
// cookie获取，设置，删除
const TokenKey = 'loginToken'

export function getToken() {
	return Cookies.get(TokenKey)
}

export function setToken(token) {
	return Cookies.set(TokenKey, token, {expires: 1/6}) // 设置token过期时间 ，expires=1为1天。1/6 是4小时
}

export function removeToken() {
	return Cookies.remove(TokenKey)
}
