/*
	设置cookie
*/
function setCookie({name, value, expires, domain, path}) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + expires);
	sCookie = name + '=' + encodeURIComponent(value);

	if(expires) {
		sCookie += ';expires=' + oDate;
	}

	if(domain) {
		sCookie += ';domain=' + domain;
	}

	if(path) {
		sCookie += ';path=' + path;
	}

	document.cookie = sCookie;
}

/*
	获取cookie
*/
function getCookie(name) {
	var sCookie = document.cookie;

	aCookie = sCookie.split('; ');

	for(var i = 0; i < aCookie.length; i++) {
		var aTemp = aCookie[i].split('=');
		if(aTemp[0] === name) {
			return decodeURIComponent(aTemp[1]);
		}
	}
}