// 时间戳格式化，fmt为yyyy-MM-dd HH:mm:ss或yyyy-MM-dd
export function parseTime(time, fmt) {
	if (time) {
		const date = new Date(time)
		const year = date.getFullYear()
		/* 在日期格式中，月份是从0开始的，因此要加0
		 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
		 * */
		const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
		const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
		const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
		const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
		const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
		const mdate = year + '-' + month + '-' + day
		// 拼接
		return fmt === 'yyyy-MM-dd' ? mdate : mdate + ' ' + hours + ':' + minutes + ':' + seconds
	} else {
		return ''
	}
}
// 替换邮箱字符
export function regEmail(email) {
	if (String(email).indexOf('@') > 0) {
		var str = email.split('@')
		let _s = ''
		if (str[0].length > 3) {
			for (let i = 0; i < str[0].length - 3; i++) {
				_s += '*'
			}
		}
		var new_email = str[0].substr(0, 3) + _s + '@' + str[1]
	}
	return new_email
}

// 替换手机字符
export function regMobile(mobile) {
	return mobile.length > 7 ? mobile.substr(0, 3) + '****' + mobile.substr(7) : ''
}
