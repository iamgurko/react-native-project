import React from "react";
import I18n from "i18n-js";

const missingTranslationRegex = /^\[missing ".*" translation\]$/;
const translateOrFallback = (initialMsg, options) => {
	
	if (typeof initialMsg !== "string") {
		__DEV__ &&
			console.log(
				`I18n: you must give a string to translate instead of "${typeof initialMsg}"`
			);

		return "";
	}
	let localMsg = I18n.t(initialMsg, options);
	if (missingTranslationRegex.test(localMsg)) {
		__DEV__ &&
			console.log(
				`translation "${initialMsg}" does not exists in translations files`
			);

		return initialMsg;
	}
	return localMsg;
};

export default translateOrFallback;
