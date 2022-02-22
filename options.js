((window, document) => {
	const fontFamilyField = document.querySelector('#font-family')
	const fontSizeField = document.querySelector('#font-size')
	const customCssField = document.querySelector('textarea')

	document.addEventListener('DOMContentLoaded', () => {
		chrome.storage.local.get({
			fontFamily: 'system-ui',
			fontSize: '12px',
			customCss: '* { font-family: system-ui; }'
		}, items => {
			fontFamilyField.value = items.fontFamily
			fontSizeField.value = items.fontSize
			customCssField.value = items.customCss
		})
	})

	document.querySelector('#save').addEventListener('click', () => {
		const fontFamily = fontFamilyField.value
		const fontSize = fontSizeField.value
		const customCss = customCssField.value

		chrome.storage.local.set({
			fontFamily: fontFamily,
			fontSize: fontSize,
			customCss: customCss
		}, () => {
			const status = document.querySelector('#status')
			status.textContent = 'Options saved'
			setTimeout(() => {
				status.textContent = ''
			}, 1000)
		})
	})
})(window, document)
