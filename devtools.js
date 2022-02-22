(() => {
	chrome.storage.local.get({
		fontFamily: 'system-ui',
		fontSize: '12px',
		customCss: '* { font-family: system-ui; }'
	}, items => {
		chrome.devtools.panels.applyStyleSheet(`
			${items.customCss}
			* {
				font-family: ${items.fontFamily} !important;
				font-size: ${items.fontSize} !important;
			}
		`);
	});
})();
