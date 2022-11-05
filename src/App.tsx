import React, { useMemo } from 'react'

import { BrowserRouter } from 'react-router-dom'

import RenderRouter from './router'


function App() {
	// const locale = useStore((state) => state.locale)
  //
	// const getLocale = useMemo(() => {
	// 	if (locale === 'en_GB') {
	// 		return en_GB
	// 	} else if (locale === 'zh_CN') {
	// 		return zh_CN
	// 	}
	// }, [locale])

	return (
		// <LocaleProvider locale={getLocale}>
		// 	<IntlProvider locale={locale.split('_')[0]} messages={localeConfig[locale]}>
				<BrowserRouter>
					<RenderRouter />
				</BrowserRouter>
		// 	</IntlProvider>
		// </LocaleProvider>
	)
}

export default App
