//@flow
import React from "react";
import * as Keychain from "react-native-keychain";


export const setLoginCredentials = async (field1, field2) => {
	try {
		const response = await Keychain.setGenericPassword(field1, field2);
		return { status: true, response };
	} catch (e) {
		return { status: false, error: e };
	}
};

export const getLoginCredentials = async () => {
	try {
		const credentials = await Keychain.getGenericPassword();
		if (credentials) {
			return credentials;
		}
		return false;
	} catch (e) {
		return false;
	}
};

export const resetLoginCredentials = async () => {
	try {
		const reset = await Keychain.resetGenericPassword();
		return reset;
	} catch (e) {
		return false;
	}
};
