import I18n from 'i18n-js';
import { LOCALES } from "../Constants/index";

//varsayılan dil set edilir
I18n.defaultLocale = LOCALES.ENGLISH.name;

I18n.fallbacks = true;

I18n.locale = LOCALES.ENGLISH.name;

I18n.translations = {
	en: require("./languages/english.json"),
	tr: require("./languages/turkish.json")
};
