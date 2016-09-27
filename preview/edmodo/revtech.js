function ad_brandUrl(elementId) {

    var fullBrandUrl = "http://bevo-us-east-1.adsnative.com/ck?u=https%3A%2F%2Fwww.techrocket.com&sid=26e14a7fa5d14dc5b009bc3e4beb31d3_fdd61b17",//document.getElementById(elementId).innerHTML,
        startPos = (fullBrandUrl.indexOf("?u="));
        endPos = (fullBrandUrl.indexOf("&"));

    var brandUrl = fullBrandUrl.substring(startPos + 3, endPos),
        brandUrlDecode = decodeURIComponent(brandUrl);

    brandUrlDecode = brandUrlDecode.replace("http://", " ");
    brandUrlDecode = brandUrlDecode.replace("https://", " ");

    console.log(brandUrlDecode);
}
ad_brandUrl();