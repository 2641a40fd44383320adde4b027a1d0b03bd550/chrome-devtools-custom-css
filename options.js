((window, document) => {
	const fontFamilyField = document.querySelector('#font-family')
	const fontSizeField = document.querySelector('#font-size')
	const customCssField = document.querySelector('textarea')
	const customCssFile = document.querySelector('#css')
	var fileContent

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
		const customCss = fileContent || customCssField.value

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

	customCssFile.addEventListener('change', () => {
		const file = customCssFile.files[0].name
		const xhr = new XMLHttpRequest

		xhr.open('GET', file, true)
		xhr.onload = () => {
		  if (xhr.readyState === 4) {
		    if (xhr.status === 200)
		      fileContent = xhr.responseText
				else
		      console.error(xhr.statusText)
		  }
		}
		xhr.send(null)
	})
})(window, document)
