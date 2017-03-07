window.ibpxlver=18;
pxlScriptStart = '%3Cscr' + 'ipt type="text/javascript"';  
pxlScriptEnd = '%3C/scr' + 'ipt%3E'; 
if(pxlSiteFile)
{
	if (location.protocol.indexOf("https") == -1) { 
		if(window.ibpxlver)
			document.write(unescape(pxlScriptStart + ' src="http://pxl.ibpxl.com/'+pxlSiteFile+'?'+window.ibpxlver+'"%3E'+pxlScriptEnd)); 
		else
			document.write(unescape(pxlScriptStart + ' src="http://pxl.ibpxl.com/'+pxlSiteFile+'"%3E'+pxlScriptEnd));
	} 
	else { 
		if(window.ibpxlver)
			document.write(unescape(pxlScriptStart + ' src="https://pxlssl.ibpxl.com/'+pxlSiteFile+'?'+window.ibpxlver+'"%3E'+pxlScriptEnd)); 
		else
			document.write(unescape(pxlScriptStart + ' src="https://pxlssl.ibpxl.com/'+pxlSiteFile+'"%3E'+pxlScriptEnd)); 
	}
} 
