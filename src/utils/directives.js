import Vue from 'vue'
// v-dialogDrag: 弹窗拖拽
Vue.directive('dialogDrag', {
	bind(el, binding, vnode, oldVnode) {
		const dialogHeaderEl = el.querySelector('.el-dialog__header')
		const dragDom = el.querySelector('.el-dialog')
		const pageW = document.documentElement.clientWidth
		const pageH = document.documentElement.clientHeight

		// 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
		const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

		dialogHeaderEl.onmousedown = (e) => {
			dialogHeaderEl.style.cursor = 'move'
			// 鼠标按下，计算当前元素距离可视区的距离
			const disX = e.clientX - dialogHeaderEl.offsetLeft
			const disY = e.clientY - dialogHeaderEl.offsetTop
			const dialogW = dragDom.offsetWidth // 对话框宽度
			const dialogH = dragDom.offsetHeight // 对话框高度
			// 获取到的值带px 正则匹配替换
			let styL, styT

			// 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
			if (sty.left.includes('%')) {
				styL = +pageW * (+sty.left.replace(/\%/g, '') / 100)
				styT = +pageH * (+sty.top.replace(/\%/g, '') / 100)
			} else {
				styL = +sty.left.replace(/\px/g, '')
				styT = +sty.top.replace(/\px/g, '')
			}
			const minX = dragDom.offsetLeft
			const maxX = pageW - minX - dialogW
			const minY = dragDom.offsetTop
			const maxY = pageH - minY - dialogH

			document.onmousemove = function(e) {
				// 通过事件委托，计算移动的距离
				let left = e.clientX - disX
				let top = e.clientY - disY
				// 边界处理，不出屏幕
				if (-(left) >= minX) {
					left = -(minX);
				} else if (left >= maxX) {
					left = maxX;
				}
				if (-(top) >= minY) {
					top = -(minY);
				} else if (top >= maxY) {
					top = maxY;
				}
				// 移动当前元素
				dragDom.style.left = `${left + styL}px`
				dragDom.style.top = `${top + styT}px`

				// 将此时的位置传出去
				// binding.value({x:e.pageX,y:e.pageY})
			}

			document.onmouseup = function(e) {
				dialogHeaderEl.style.cursor = 'default'
				document.onmousemove = null
				document.onmouseup = null
			}
		}
	}
})
