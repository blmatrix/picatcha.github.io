(function(win) {
	'use strict'
	
	var Rosetta = (win._$OGO$_ || (win._$OGO$_ = {})) &&  (win._$OGO$_.Rosetta || (win._$OGO$_.Rosetta = {}));
	var FontLibrary =  (Rosetta.shared || (Rosetta.shared = {})) && (Rosetta.shared.fontLibrary || (Rosetta.shared.fontLibrary = []));
	
	var id = "10101";
	
	//size, reg, bold, italic, boldItalic
	var obj = {size:14, reg:{info:{face:"HelveticaNeueLTCom-Bd", size:14, bold:0, italic:0, chasrset:"", unicode:0, stretchH:100, smooth:1, aa:1, padding:"0,0,0,0", spacing:"5,5"}, common:{lineHeight:15, base:10, scaleW:256, scaleH:256, pages:1, packed:0}, file:"10101/images/10101_14.png", chars:[{id:199, x:5, y:5, width:11, height:15, xoffset:1, yoffset:-1, xadvance:10, page:0, chnl:0, letter:"Ç"},{id:197, x:21, y:5, width:11, height:15, xoffset:-0, yoffset:-4, xadvance:10, page:0, chnl:0, letter:"Å"},{id:210, x:37, y:5, width:11, height:15, xoffset:1, yoffset:-4, xadvance:11, page:0, chnl:0, letter:"Ò"},{id:211, x:53, y:5, width:11, height:15, xoffset:1, yoffset:-4, xadvance:11, page:0, chnl:0, letter:"Ó"},{id:212, x:69, y:5, width:11, height:15, xoffset:1, yoffset:-4, xadvance:11, page:0, chnl:0, letter:"Ô"},{id:217, x:85, y:5, width:10, height:15, xoffset:1, yoffset:-4, xadvance:10, page:0, chnl:0, letter:"Ù"},{id:218, x:100, y:5, width:10, height:15, xoffset:1, yoffset:-4, xadvance:10, page:0, chnl:0, letter:"Ú"},{id:219, x:115, y:5, width:10, height:15, xoffset:1, yoffset:-4, xadvance:10, page:0, chnl:0, letter:"Û"},{id:124, x:130, y:5, width:3, height:15, xoffset:1, yoffset:-1, xadvance:3, page:0, chnl:0, letter:"|"},{id:192, x:138, y:5, width:11, height:14, xoffset:-0, yoffset:-3, xadvance:10, page:0, chnl:0, letter:"À"},{id:193, x:154, y:5, width:11, height:14, xoffset:-0, yoffset:-3, xadvance:10, page:0, chnl:0, letter:"Á"},{id:194, x:170, y:5, width:11, height:14, xoffset:-0, yoffset:-3, xadvance:10, page:0, chnl:0, letter:"Â"},{id:195, x:186, y:5, width:11, height:14, xoffset:-0, yoffset:-3, xadvance:10, page:0, chnl:0, letter:"Ã"},{id:196, x:202, y:5, width:11, height:14, xoffset:-0, yoffset:-3, xadvance:10, page:0, chnl:0, letter:"Ä"},{id:213, x:218, y:5, width:11, height:14, xoffset:1, yoffset:-3, xadvance:11, page:0, chnl:0, letter:"Õ"},{id:214, x:234, y:5, width:11, height:14, xoffset:1, yoffset:-3, xadvance:11, page:0, chnl:0, letter:"Ö"},{id:221, x:5, y:25, width:11, height:14, xoffset:-0, yoffset:-3, xadvance:9, page:0, chnl:0, letter:"Ý"},{id:220, x:21, y:25, width:10, height:14, xoffset:1, yoffset:-3, xadvance:10, page:0, chnl:0, letter:"Ü"},{id:209, x:36, y:25, width:10, height:14, xoffset:1, yoffset:-3, xadvance:10, page:0, chnl:0, letter:"Ñ"},{id:36, x:51, y:25, width:9, height:14, xoffset:-0, yoffset:-2, xadvance:8, page:0, chnl:0, letter:"$"},{id:167, x:65, y:25, width:9, height:14, xoffset:0, yoffset:-0, xadvance:8, page:0, chnl:0, letter:"§"},{id:182, x:79, y:25, width:9, height:14, xoffset:0, yoffset:-1, xadvance:9, page:0, chnl:0, letter:"¶"},{id:201, x:93, y:25, width:9, height:14, xoffset:1, yoffset:-3, xadvance:9, page:0, chnl:0, letter:"É"},{id:203, x:107, y:25, width:9, height:14, xoffset:1, yoffset:-3, xadvance:9, page:0, chnl:0, letter:"Ë"},{id:200, x:121, y:25, width:9, height:14, xoffset:1, yoffset:-3, xadvance:9, page:0, chnl:0, letter:"È"},{id:202, x:135, y:25, width:9, height:14, xoffset:1, yoffset:-3, xadvance:9, page:0, chnl:0, letter:"Ê"},{id:253, x:149, y:25, width:9, height:14, xoffset:-0, yoffset:-0, xadvance:7, page:0, chnl:0, letter:"ý"},{id:254, x:163, y:25, width:9, height:14, xoffset:1, yoffset:-0, xadvance:9, page:0, chnl:0, letter:"þ"},{id:131, x:177, y:25, width:8, height:14, xoffset:0, yoffset:-0, xadvance:7, page:0, chnl:0, letter:""},{id:134, x:190, y:25, width:7, height:14, xoffset:1, yoffset:-0, xadvance:7, page:0, chnl:0, letter:""},{id:135, x:202, y:25, width:7, height:14, xoffset:1, yoffset:-0, xadvance:7, page:0, chnl:0, letter:""},{id:138, x:214, y:25, width:7, height:14, xoffset:0, yoffset:-2, xadvance:7, page:0, chnl:0, letter:""},{id:123, x:226, y:25, width:6, height:14, xoffset:-0, yoffset:-0, xadvance:5, page:0, chnl:0, letter:"{"},{id:125, x:237, y:25, width:6, height:14, xoffset:0, yoffset:-0, xadvance:5, page:0, chnl:0, letter:"}"},{id:206, x:5, y:44, width:6, height:14, xoffset:-0, yoffset:-3, xadvance:4, page:0, chnl:0, letter:"Î"},{id:207, x:16, y:44, width:6, height:14, xoffset:-0, yoffset:-3, xadvance:4, page:0, chnl:0, letter:"Ï"},{id:40, x:27, y:44, width:5, height:14, xoffset:1, yoffset:-0, xadvance:4, page:0, chnl:0, letter:"("},{id:41, x:37, y:44, width:5, height:14, xoffset:-0, yoffset:-0, xadvance:4, page:0, chnl:0, letter:")"},{id:91, x:47, y:44, width:5, height:14, xoffset:1, yoffset:-0, xadvance:5, page:0, chnl:0, letter:"["},{id:93, x:57, y:44, width:5, height:14, xoffset:0, yoffset:-0, xadvance:5, page:0, chnl:0, letter:"]"},{id:106, x:67, y:44, width:5, height:14, xoffset:-0, yoffset:-0, xadvance:4, page:0, chnl:0, letter:"j"},{id:204, x:77, y:44, width:5, height:14, xoffset:-0, yoffset:-3, xadvance:4, page:0, chnl:0, letter:"Ì"},{id:205, x:87, y:44, width:5, height:14, xoffset:1, yoffset:-3, xadvance:4, page:0, chnl:0, letter:"Í"},{id:81, x:97, y:44, width:11, height:13, xoffset:1, yoffset:-1, xadvance:11, page:0, chnl:0, letter:"Q"},{id:159, x:113, y:44, width:10, height:13, xoffset:0, yoffset:-1, xadvance:10, page:0, chnl:0, letter:""},{id:229, x:128, y:44, width:9, height:13, xoffset:0, yoffset:-2, xadvance:8, page:0, chnl:0, letter:"å"},{id:140, x:142, y:44, width:14, height:12, xoffset:1, yoffset:-0, xadvance:14, page:0, chnl:0, letter:""},{id:37, x:161, y:44, width:13, height:12, xoffset:1, yoffset:-1, xadvance:14, page:0, chnl:0, letter:"%"},{id:188, x:179, y:44, width:13, height:12, xoffset:0, yoffset:-1, xadvance:12, page:0, chnl:0, letter:"¼"},{id:189, x:197, y:44, width:13, height:12, xoffset:0, yoffset:-1, xadvance:12, page:0, chnl:0, letter:"½"},{id:190, x:215, y:44, width:13, height:12, xoffset:1, yoffset:-1, xadvance:12, page:0, chnl:0, letter:"¾"},{id:64, x:233, y:44, width:12, height:12, xoffset:1, yoffset:-1, xadvance:11, page:0, chnl:0, letter:"@"},{id:137, x:5, y:63, width:12, height:12, xoffset:0, yoffset:-0, xadvance:11, page:0, chnl:0, letter:""},{id:169, x:22, y:63, width:12, height:12, xoffset:0, yoffset:-1, xadvance:11, page:0, chnl:0, letter:"©"},{id:174, x:39, y:63, width:12, height:12, xoffset:0, yoffset:-1, xadvance:11, page:0, chnl:0, letter:"®"},{id:38, x:56, y:63, width:11, height:12, xoffset:0, yoffset:-1, xadvance:10, page:0, chnl:0, letter:"&"},{id:67, x:72, y:63, width:11, height:12, xoffset:1, yoffset:-1, xadvance:10, page:0, chnl:0, letter:"C"},{id:71, x:88, y:63, width:11, height:12, xoffset:1, yoffset:-1, xadvance:11, page:0, chnl:0, letter:"G"},{id:79, x:104, y:63, width:11, height:12, xoffset:1, yoffset:-1, xadvance:11, page:0, chnl:0, letter:"O"},{id:216, x:120, y:63, width:11, height:12, xoffset:0, yoffset:-1, xadvance:11, page:0, chnl:0, letter:"Ø"},{id:83, x:136, y:63, width:10, height:12, xoffset:0, yoffset:-1, xadvance:9, page:0, chnl:0, letter:"S"},{id:85, x:151, y:63, width:10, height:12, xoffset:1, yoffset:-1, xadvance:10, page:0, chnl:0, letter:"U"},{id:48, x:166, y:63, width:9, height:12, xoffset:0, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"0"},{id:51, x:180, y:63, width:9, height:12, xoffset:0, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"3"},{id:53, x:194, y:63, width:9, height:12, xoffset:0, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"5"},{id:54, x:208, y:63, width:9, height:12, xoffset:0, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"6"},{id:56, x:222, y:63, width:9, height:12, xoffset:0, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"8"},{id:57, x:236, y:63, width:9, height:12, xoffset:0, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"9"},{id:98, x:5, y:80, width:9, height:12, xoffset:1, yoffset:-1, xadvance:9, page:0, chnl:0, letter:"b"},{id:100, x:19, y:80, width:9, height:12, xoffset:0, yoffset:-1, xadvance:9, page:0, chnl:0, letter:"d"},{id:103, x:33, y:80, width:9, height:12, xoffset:1, yoffset:2, xadvance:9, page:0, chnl:0, letter:"g"},{id:162, x:47, y:80, width:9, height:12, xoffset:0, yoffset:1, xadvance:8, page:0, chnl:0, letter:"¢"},{id:163, x:61, y:80, width:9, height:12, xoffset:0, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"£"},{id:233, x:75, y:80, width:9, height:12, xoffset:0, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"é"},{id:235, x:89, y:80, width:9, height:12, xoffset:0, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"ë"},{id:231, x:103, y:80, width:9, height:12, xoffset:1, yoffset:2, xadvance:8, page:0, chnl:0, letter:"ç"},{id:224, x:117, y:80, width:9, height:12, xoffset:0, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"à"},{id:225, x:131, y:80, width:9, height:12, xoffset:0, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"á"},{id:226, x:145, y:80, width:9, height:12, xoffset:0, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"â"},{id:227, x:159, y:80, width:9, height:12, xoffset:0, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"ã"},{id:228, x:173, y:80, width:9, height:12, xoffset:0, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"ä"},{id:232, x:187, y:80, width:9, height:12, xoffset:0, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"è"},{id:234, x:201, y:80, width:9, height:12, xoffset:0, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"ê"},{id:240, x:215, y:80, width:9, height:12, xoffset:1, yoffset:-1, xadvance:9, page:0, chnl:0, letter:"ð"},{id:242, x:229, y:80, width:9, height:12, xoffset:1, yoffset:-1, xadvance:9, page:0, chnl:0, letter:"ò"},{id:243, x:5, y:97, width:9, height:12, xoffset:1, yoffset:-1, xadvance:9, page:0, chnl:0, letter:"ó"},{id:244, x:19, y:97, width:9, height:12, xoffset:1, yoffset:-1, xadvance:9, page:0, chnl:0, letter:"ô"},{id:245, x:33, y:97, width:9, height:12, xoffset:1, yoffset:-1, xadvance:9, page:0, chnl:0, letter:"õ"},{id:246, x:47, y:97, width:9, height:12, xoffset:1, yoffset:-1, xadvance:9, page:0, chnl:0, letter:"ö"},{id:63, x:61, y:97, width:8, height:12, xoffset:0, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"?"},{id:74, x:74, y:97, width:8, height:12, xoffset:0, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"J"},{id:252, x:87, y:97, width:8, height:12, xoffset:1, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"ü"},{id:191, x:100, y:97, width:8, height:12, xoffset:0, yoffset:2, xadvance:8, page:0, chnl:0, letter:"¿"},{id:223, x:113, y:97, width:8, height:12, xoffset:1, yoffset:-1, xadvance:9, page:0, chnl:0, letter:"ß"},{id:241, x:126, y:97, width:8, height:12, xoffset:1, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"ñ"},{id:249, x:139, y:97, width:8, height:12, xoffset:1, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"ù"},{id:250, x:152, y:97, width:8, height:12, xoffset:1, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"ú"},{id:251, x:165, y:97, width:8, height:12, xoffset:1, yoffset:-1, xadvance:8, page:0, chnl:0, letter:"û"},{id:47, x:178, y:97, width:7, height:12, xoffset:-0, yoffset:-1, xadvance:5, page:0, chnl:0, letter:"/"},{id:92, x:190, y:97, width:7, height:12, xoffset:-0, yoffset:-1, xadvance:5, page:0, chnl:0, letter:"\\"},{id:238, x:202, y:97, width:6, height:12, xoffset:-1, yoffset:-1, xadvance:4, page:0, chnl:0, letter:"î"},{id:239, x:213, y:97, width:6, height:12, xoffset:-1, yoffset:-1, xadvance:4, page:0, chnl:0, letter:"ï"},{id:236, x:224, y:97, width:5, height:12, xoffset:-1, yoffset:-1, xadvance:4, page:0, chnl:0, letter:"ì"},{id:237, x:234, y:97, width:5, height:12, xoffset:1, yoffset:-1, xadvance:4, page:0, chnl:0, letter:"í"},{id:166, x:244, y:97, width:3, height:12, xoffset:1, yoffset:-0, xadvance:3, page:0, chnl:0, letter:"¦"},{id:87, x:5, y:114, width:15, height:11, xoffset:0, yoffset:-0, xadvance:13, page:0, chnl:0, letter:"W"},{id:198, x:25, y:114, width:15, height:11, xoffset:-0, yoffset:-0, xadvance:14, page:0, chnl:0, letter:"Æ"},{id:77, x:45, y:114, width:12, height:11, xoffset:1, yoffset:-0, xadvance:13, page:0, chnl:0, letter:"M"},{id:65, x:62, y:114, width:11, height:11, xoffset:-0, yoffset:-0, xadvance:10, page:0, chnl:0, letter:"A"},{id:75, x:78, y:114, width:11, height:11, xoffset:1, yoffset:-0, xadvance:10, page:0, chnl:0, letter:"K"},{id:86, x:94, y:114, width:11, height:11, xoffset:-0, yoffset:-0, xadvance:9, page:0, chnl:0, letter:"V"},{id:88, x:110, y:114, width:11, height:11, xoffset:-0, yoffset:-0, xadvance:9, page:0, chnl:0, letter:"X"},{id:89, x:126, y:114, width:11, height:11, xoffset:-0, yoffset:-0, xadvance:9, page:0, chnl:0, letter:"Y"},{id:208, x:142, y:114, width:11, height:11, xoffset:0, yoffset:-0, xadvance:10, page:0, chnl:0, letter:"Ð"},{id:66, x:158, y:114, width:10, height:11, xoffset:1, yoffset:-0, xadvance:10, page:0, chnl:0, letter:"B"},{id:68, x:173, y:114, width:10, height:11, xoffset:1, yoffset:-0, xadvance:10, page:0, chnl:0, letter:"D"},{id:72, x:188, y:114, width:10, height:11, xoffset:1, yoffset:-0, xadvance:10, page:0, chnl:0, letter:"H"},{id:78, x:203, y:114, width:10, height:11, xoffset:1, yoffset:-0, xadvance:10, page:0, chnl:0, letter:"N"},{id:82, x:218, y:114, width:10, height:11, xoffset:1, yoffset:-0, xadvance:10, page:0, chnl:0, letter:"R"},{id:84, x:233, y:114, width:10, height:11, xoffset:0, yoffset:-0, xadvance:9, page:0, chnl:0, letter:"T"},{id:90, x:5, y:130, width:10, height:11, xoffset:0, yoffset:-0, xadvance:9, page:0, chnl:0, letter:"Z"},{id:165, x:20, y:130, width:10, height:11, xoffset:-0, yoffset:-0, xadvance:8, page:0, chnl:0, letter:"¥"},{id:50, x:35, y:130, width:9, height:11, xoffset:0, yoffset:-0, xadvance:8, page:0, chnl:0, letter:"2"},{id:52, x:49, y:130, width:9, height:11, xoffset:0, yoffset:-0, xadvance:8, page:0, chnl:0, letter:"4"},{id:69, x:63, y:130, width:9, height:11, xoffset:1, yoffset:-0, xadvance:9, page:0, chnl:0, letter:"E"},{id:70, x:77, y:130, width:9, height:11, xoffset:1, yoffset:-0, xadvance:8, page:0, chnl:0, letter:"F"},{id:76, x:91, y:130, width:9, height:11, xoffset:1, yoffset:-0, xadvance:8, page:0, chnl:0, letter:"L"},{id:80, x:105, y:130, width:9, height:11, xoffset:1, yoffset:-0, xadvance:9, page:0, chnl:0, letter:"P"},{id:107, x:119, y:130, width:9, height:11, xoffset:1, yoffset:-0, xadvance:8, page:0, chnl:0, letter:"k"},{id:112, x:133, y:130, width:9, height:11, xoffset:1, yoffset:3, xadvance:9, page:0, chnl:0, letter:"p"},{id:113, x:147, y:130, width:9, height:11, xoffset:0, yoffset:3, xadvance:9, page:0, chnl:0, letter:"q"},{id:121, x:161, y:130, width:9, height:11, xoffset:-0, yoffset:3, xadvance:7, page:0, chnl:0, letter:"y"},{id:222, x:175, y:130, width:9, height:11, xoffset:1, yoffset:-0, xadvance:9, page:0, chnl:0, letter:"Þ"},{id:35, x:189, y:130, width:8, height:11, xoffset:0, yoffset:-0, xadvance:8, page:0, chnl:0, letter:"#"},{id:55, x:202, y:130, width:8, height:11, xoffset:1, yoffset:-0, xadvance:8, page:0, chnl:0, letter:"7"},{id:104, x:215, y:130, width:8, height:11, xoffset:1, yoffset:-0, xadvance:8, page:0, chnl:0, letter:"h"},{id:128, x:228, y:130, width:8, height:11, xoffset:0, yoffset:-0, xadvance:7, page:0, chnl:0, letter:""},{id:181, x:241, y:130, width:8, height:11, xoffset:1, yoffset:3, xadvance:8, page:0, chnl:0, letter:"µ"},{id:49, x:5, y:146, width:6, height:11, xoffset:1, yoffset:-0, xadvance:8, page:0, chnl:0, letter:"1"},{id:102, x:16, y:146, width:6, height:11, xoffset:0, yoffset:-0, xadvance:5, page:0, chnl:0, letter:"f"},{id:116, x:27, y:146, width:6, height:11, xoffset:0, yoffset:-0, xadvance:5, page:0, chnl:0, letter:"t"},{id:154, x:38, y:146, width:6, height:11, xoffset:0, yoffset:1, xadvance:5, page:0, chnl:0, letter:""},{id:33, x:49, y:146, width:4, height:11, xoffset:1, yoffset:-0, xadvance:4, page:0, chnl:0, letter:"!"},{id:59, x:58, y:146, width:4, height:11, xoffset:1, yoffset:2, xadvance:4, page:0, chnl:0, letter:";"},{id:73, x:67, y:146, width:4, height:11, xoffset:1, yoffset:-0, xadvance:4, page:0, chnl:0, letter:"I"},{id:161, x:76, y:146, width:4, height:11, xoffset:1, yoffset:3, xadvance:4, page:0, chnl:0, letter:"¡"},{id:105, x:85, y:146, width:3, height:11, xoffset:1, yoffset:-0, xadvance:4, page:0, chnl:0, letter:"i"},{id:108, x:93, y:146, width:3, height:11, xoffset:1, yoffset:-0, xadvance:4, page:0, chnl:0, letter:"l"},{id:247, x:101, y:146, width:9, height:10, xoffset:1, yoffset:2, xadvance:8, page:0, chnl:0, letter:"÷"},{id:248, x:115, y:146, width:9, height:10, xoffset:1, yoffset:1, xadvance:9, page:0, chnl:0, letter:"ø"},{id:109, x:129, y:146, width:13, height:9, xoffset:1, yoffset:2, xadvance:13, page:0, chnl:0, letter:"m"},{id:119, x:147, y:146, width:13, height:9, xoffset:0, yoffset:2, xadvance:11, page:0, chnl:0, letter:"w"},{id:230, x:165, y:146, width:13, height:9, xoffset:1, yoffset:2, xadvance:13, page:0, chnl:0, letter:"æ"},{id:43, x:183, y:146, width:9, height:9, xoffset:1, yoffset:2, xadvance:8, page:0, chnl:0, letter:"+"},{id:60, x:197, y:146, width:9, height:9, xoffset:1, yoffset:2, xadvance:8, page:0, chnl:0, letter:"<"},{id:62, x:211, y:146, width:9, height:9, xoffset:1, yoffset:2, xadvance:8, page:0, chnl:0, letter:">"},{id:97, x:225, y:146, width:9, height:9, xoffset:0, yoffset:2, xadvance:8, page:0, chnl:0, letter:"a"},{id:99, x:239, y:146, width:9, height:9, xoffset:1, yoffset:2, xadvance:8, page:0, chnl:0, letter:"c"},{id:101, x:5, y:162, width:9, height:9, xoffset:0, yoffset:2, xadvance:8, page:0, chnl:0, letter:"e"},{id:111, x:19, y:162, width:9, height:9, xoffset:1, yoffset:2, xadvance:9, page:0, chnl:0, letter:"o"},{id:118, x:33, y:162, width:9, height:9, xoffset:0, yoffset:2, xadvance:7, page:0, chnl:0, letter:"v"},{id:120, x:47, y:162, width:9, height:9, xoffset:0, yoffset:2, xadvance:8, page:0, chnl:0, letter:"x"},{id:156, x:61, y:162, width:9, height:9, xoffset:0, yoffset:3, xadvance:8, page:0, chnl:0, letter:""},{id:164, x:75, y:162, width:9, height:9, xoffset:0, yoffset:1, xadvance:8, page:0, chnl:0, letter:"¤"},{id:177, x:89, y:162, width:9, height:9, xoffset:1, yoffset:2, xadvance:8, page:0, chnl:0, letter:"±"},{id:110, x:103, y:162, width:8, height:9, xoffset:1, yoffset:2, xadvance:8, page:0, chnl:0, letter:"n"},{id:115, x:116, y:162, width:8, height:9, xoffset:0, yoffset:2, xadvance:8, page:0, chnl:0, letter:"s"},{id:117, x:129, y:162, width:8, height:9, xoffset:1, yoffset:2, xadvance:8, page:0, chnl:0, letter:"u"},{id:122, x:142, y:162, width:8, height:9, xoffset:0, yoffset:2, xadvance:7, page:0, chnl:0, letter:"z"},{id:114, x:155, y:162, width:6, height:9, xoffset:1, yoffset:2, xadvance:5, page:0, chnl:0, letter:"r"},{id:58, x:166, y:162, width:4, height:9, xoffset:1, yoffset:2, xadvance:4, page:0, chnl:0, letter:":"},{id:153, x:175, y:162, width:14, height:8, xoffset:0, yoffset:-0, xadvance:13, page:0, chnl:0, letter:""},{id:215, x:194, y:162, width:8, height:8, xoffset:1, yoffset:3, xadvance:8, page:0, chnl:0, letter:"×"},{id:178, x:207, y:162, width:6, height:8, xoffset:0, yoffset:-1, xadvance:5, page:0, chnl:0, letter:"²"},{id:179, x:218, y:162, width:6, height:8, xoffset:0, yoffset:-1, xadvance:5, page:0, chnl:0, letter:"³"},{id:185, x:229, y:162, width:4, height:8, xoffset:1, yoffset:-1, xadvance:5, page:0, chnl:0, letter:"¹"},{id:8482, x:5, y:176, width:14, height:7, xoffset:1, yoffset:-0, xadvance:14, page:0, chnl:0, letter:"™"},{id:94, x:24, y:176, width:8, height:7, xoffset:1, yoffset:-0, xadvance:8, page:0, chnl:0, letter:"^"},{id:171, x:37, y:176, width:7, height:7, xoffset:1, yoffset:3, xadvance:6, page:0, chnl:0, letter:"«"},{id:187, x:49, y:176, width:7, height:7, xoffset:1, yoffset:3, xadvance:6, page:0, chnl:0, letter:"»"},{id:139, x:61, y:176, width:4, height:7, xoffset:0, yoffset:4, xadvance:7, page:0, chnl:0, letter:""},{id:155, x:70, y:176, width:4, height:7, xoffset:0, yoffset:4, xadvance:4, page:0, chnl:0, letter:""},{id:61, x:79, y:176, width:9, height:6, xoffset:1, yoffset:4, xadvance:8, page:0, chnl:0, letter:"="},{id:172, x:93, y:176, width:9, height:6, xoffset:1, yoffset:4, xadvance:8, page:0, chnl:0, letter:"¬"},{id:42, x:107, y:176, width:7, height:6, xoffset:0, yoffset:-0, xadvance:6, page:0, chnl:0, letter:"*"},{id:750, x:119, y:176, width:7, height:6, xoffset:1, yoffset:-2, xadvance:6, page:0, chnl:0, letter:"ˮ"},{id:34, x:131, y:176, width:6, height:6, xoffset:1, yoffset:-1, xadvance:6, page:0, chnl:0, letter:"\\"},{id:170, x:142, y:176, width:6, height:6, xoffset:0, yoffset:-0, xadvance:5, page:0, chnl:0, letter:"ª"},{id:176, x:153, y:176, width:6, height:6, xoffset:1, yoffset:-1, xadvance:6, page:0, chnl:0, letter:"°"},{id:186, x:164, y:176, width:6, height:6, xoffset:0, yoffset:-0, xadvance:5, page:0, chnl:0, letter:"º"},{id:8220, x:175, y:176, width:6, height:6, xoffset:1, yoffset:-1, xadvance:6, page:0, chnl:0, letter:"“"},{id:8221, x:186, y:176, width:6, height:6, xoffset:1, yoffset:-1, xadvance:6, page:0, chnl:0, letter:"”"},{id:44, x:197, y:176, width:4, height:6, xoffset:1, yoffset:7, xadvance:4, page:0, chnl:0, letter:","},{id:700, x:206, y:176, width:4, height:6, xoffset:1, yoffset:-1, xadvance:3, page:0, chnl:0, letter:"ʼ"},{id:8217, x:215, y:176, width:4, height:6, xoffset:1, yoffset:-1, xadvance:4, page:0, chnl:0, letter:"’"},{id:8216, x:224, y:176, width:4, height:6, xoffset:1, yoffset:-1, xadvance:4, page:0, chnl:0, letter:"‘"},{id:789, x:233, y:176, width:4, height:6, xoffset:-2, yoffset:-4, xadvance:0, page:0, chnl:0, letter:"̕"},{id:39, x:242, y:176, width:3, height:6, xoffset:1, yoffset:-1, xadvance:4, page:0, chnl:0, letter:"'"},{id:65287, x:5, y:188, width:3, height:6, xoffset:6, yoffset:-3, xadvance:14, page:0, chnl:0, letter:"＇"},{id:132, x:13, y:188, width:6, height:5, xoffset:0, yoffset:9, xadvance:7, page:0, chnl:0, letter:""},{id:147, x:24, y:188, width:6, height:5, xoffset:0, yoffset:-0, xadvance:6, page:0, chnl:0, letter:""},{id:148, x:35, y:188, width:6, height:5, xoffset:0, yoffset:-0, xadvance:6, page:0, chnl:0, letter:""},{id:184, x:46, y:188, width:5, height:5, xoffset:0, yoffset:9, xadvance:4, page:0, chnl:0, letter:"¸"},{id:130, x:56, y:188, width:3, height:5, xoffset:0, yoffset:9, xadvance:7, page:0, chnl:0, letter:""},{id:145, x:64, y:188, width:3, height:5, xoffset:0, yoffset:-0, xadvance:3, page:0, chnl:0, letter:""},{id:146, x:72, y:188, width:3, height:5, xoffset:0, yoffset:-0, xadvance:3, page:0, chnl:0, letter:""},{id:126, x:80, y:188, width:8, height:4, xoffset:1, yoffset:5, xadvance:8, page:0, chnl:0, letter:"~"},{id:46, x:93, y:188, width:4, height:4, xoffset:1, yoffset:7, xadvance:4, page:0, chnl:0, letter:"."},{id:183, x:102, y:188, width:4, height:4, xoffset:1, yoffset:4, xadvance:4, page:0, chnl:0, letter:"·"},{id:133, x:111, y:188, width:12, height:3, xoffset:0, yoffset:9, xadvance:11, page:0, chnl:0, letter:""},{id:8212, x:128, y:188, width:12, height:3, xoffset:2, yoffset:5, xadvance:14, page:0, chnl:0, letter:"—"},{id:8211, x:145, y:188, width:8, height:3, xoffset:0, yoffset:5, xadvance:7, page:0, chnl:0, letter:"–"},{id:175, x:158, y:188, width:7, height:3, xoffset:-1, yoffset:-1, xadvance:4, page:0, chnl:0, letter:"¯"},{id:45, x:170, y:188, width:6, height:3, xoffset:1, yoffset:5, xadvance:6, page:0, chnl:0, letter:"-"},{id:136, x:181, y:188, width:6, height:3, xoffset:0, yoffset:-2, xadvance:5, page:0, chnl:0, letter:""},{id:168, x:192, y:188, width:6, height:3, xoffset:-1, yoffset:-0, xadvance:4, page:0, chnl:0, letter:"¨"},{id:173, x:203, y:188, width:6, height:3, xoffset:1, yoffset:5, xadvance:6, page:0, chnl:0, letter:"­"},{id:96, x:214, y:188, width:5, height:3, xoffset:-1, yoffset:-0, xadvance:4, page:0, chnl:0, letter:"`"},{id:152, x:224, y:188, width:5, height:3, xoffset:0, yoffset:-1, xadvance:5, page:0, chnl:0, letter:""},{id:180, x:234, y:188, width:5, height:3, xoffset:1, yoffset:-0, xadvance:4, page:0, chnl:0, letter:"´"},{id:151, x:5, y:199, width:14, height:2, xoffset:0, yoffset:5, xadvance:14, page:0, chnl:0, letter:""},{id:95, x:24, y:199, width:8, height:2, xoffset:0, yoffset:11, xadvance:7, page:0, chnl:0, letter:"_"},{id:150, x:37, y:199, width:6, height:2, xoffset:0, yoffset:5, xadvance:7, page:0, chnl:0, letter:""},{id:32, x:48, y:199, width:0, height:0, xoffset:0, yoffset:11, xadvance:4, page:0, chnl:0, letter:" "}], kerning:[{first:197, second:221, amount:-1},{first:197, second:86, amount:-1},{first:197, second:89, amount:-1},{first:197, second:84, amount:-1},{first:197, second:8217, amount:-1},{first:192, second:221, amount:-1},{first:192, second:86, amount:-1},{first:192, second:89, amount:-1},{first:192, second:84, amount:-1},{first:192, second:8217, amount:-1},{first:193, second:221, amount:-1},{first:193, second:86, amount:-1},{first:193, second:89, amount:-1},{first:193, second:84, amount:-1},{first:193, second:8217, amount:-1},{first:194, second:221, amount:-1},{first:194, second:86, amount:-1},{first:194, second:89, amount:-1},{first:194, second:84, amount:-1},{first:194, second:8217, amount:-1},{first:195, second:221, amount:-1},{first:195, second:86, amount:-1},{first:195, second:89, amount:-1},{first:195, second:84, amount:-1},{first:195, second:8217, amount:-1},{first:196, second:221, amount:-1},{first:196, second:86, amount:-1},{first:196, second:89, amount:-1},{first:196, second:84, amount:-1},{first:196, second:8217, amount:-1},{first:221, second:197, amount:-1},{first:221, second:192, amount:-1},{first:221, second:193, amount:-1},{first:221, second:194, amount:-1},{first:221, second:195, amount:-1},{first:221, second:196, amount:-1},{first:221, second:229, amount:-1},{first:221, second:233, amount:-1},{first:221, second:235, amount:-1},{first:221, second:224, amount:-1},{first:221, second:225, amount:-1},{first:221, second:226, amount:-1},{first:221, second:227, amount:-1},{first:221, second:228, amount:-1},{first:221, second:232, amount:-1},{first:221, second:234, amount:-1},{first:221, second:242, amount:-1},{first:221, second:243, amount:-1},{first:221, second:244, amount:-1},{first:221, second:245, amount:-1},{first:221, second:246, amount:-1},{first:221, second:252, amount:-1},{first:221, second:249, amount:-1},{first:221, second:250, amount:-1},{first:221, second:251, amount:-1},{first:221, second:65, amount:-1},{first:221, second:112, amount:-1},{first:221, second:113, amount:-1},{first:221, second:59, amount:-1},{first:221, second:97, amount:-1},{first:221, second:101, amount:-1},{first:221, second:111, amount:-1},{first:221, second:118, amount:-1},{first:221, second:117, amount:-1},{first:221, second:58, amount:-1},{first:221, second:44, amount:-2},{first:221, second:46, amount:-2},{first:221, second:45, amount:-2},{first:253, second:44, amount:-1},{first:253, second:46, amount:-1},{first:41, second:159, amount:-2},{first:41, second:158, amount:-2},{first:38, second:252, amount:-1},{first:38, second:250, amount:-1},{first:87, second:229, amount:-1},{first:87, second:233, amount:-1},{first:87, second:235, amount:-1},{first:87, second:224, amount:-1},{first:87, second:225, amount:-1},{first:87, second:226, amount:-1},{first:87, second:227, amount:-1},{first:87, second:228, amount:-1},{first:87, second:232, amount:-1},{first:87, second:234, amount:-1},{first:87, second:242, amount:-1},{first:87, second:243, amount:-1},{first:87, second:244, amount:-1},{first:87, second:245, amount:-1},{first:87, second:246, amount:-1},{first:87, second:97, amount:-1},{first:87, second:101, amount:-1},{first:87, second:111, amount:-1},{first:87, second:44, amount:-1},{first:87, second:46, amount:-1},{first:65, second:221, amount:-1},{first:65, second:86, amount:-1},{first:65, second:89, amount:-1},{first:65, second:84, amount:-1},{first:65, second:8217, amount:-1},{first:86, second:197, amount:-1},{first:86, second:192, amount:-1},{first:86, second:193, amount:-1},{first:86, second:194, amount:-1},{first:86, second:195, amount:-1},{first:86, second:196, amount:-1},{first:86, second:229, amount:-1},{first:86, second:233, amount:-1},{first:86, second:235, amount:-1},{first:86, second:224, amount:-1},{first:86, second:225, amount:-1},{first:86, second:226, amount:-1},{first:86, second:227, amount:-1},{first:86, second:228, amount:-1},{first:86, second:232, amount:-1},{first:86, second:234, amount:-1},{first:86, second:242, amount:-1},{first:86, second:243, amount:-1},{first:86, second:244, amount:-1},{first:86, second:245, amount:-1},{first:86, second:246, amount:-1},{first:86, second:252, amount:-1},{first:86, second:249, amount:-1},{first:86, second:250, amount:-1},{first:86, second:251, amount:-1},{first:86, second:65, amount:-1},{first:86, second:59, amount:-1},{first:86, second:97, amount:-1},{first:86, second:101, amount:-1},{first:86, second:111, amount:-1},{first:86, second:117, amount:-1},{first:86, second:114, amount:-1},{first:86, second:58, amount:-1},{first:86, second:44, amount:-2},{first:86, second:46, amount:-2},{first:86, second:45, amount:-1},{first:89, second:197, amount:-1},{first:89, second:192, amount:-1},{first:89, second:193, amount:-1},{first:89, second:194, amount:-1},{first:89, second:195, amount:-1},{first:89, second:196, amount:-1},{first:89, second:229, amount:-1},{first:89, second:233, amount:-1},{first:89, second:235, amount:-1},{first:89, second:224, amount:-1},{first:89, second:225, amount:-1},{first:89, second:226, amount:-1},{first:89, second:227, amount:-1},{first:89, second:228, amount:-1},{first:89, second:232, amount:-1},{first:89, second:234, amount:-1},{first:89, second:242, amount:-1},{first:89, second:243, amount:-1},{first:89, second:244, amount:-1},{first:89, second:245, amount:-1},{first:89, second:246, amount:-1},{first:89, second:252, amount:-1},{first:89, second:249, amount:-1},{first:89, second:250, amount:-1},{first:89, second:251, amount:-1},{first:89, second:65, amount:-1},{first:89, second:112, amount:-1},{first:89, second:113, amount:-1},{first:89, second:59, amount:-1},{first:89, second:97, amount:-1},{first:89, second:101, amount:-1},{first:89, second:111, amount:-1},{first:89, second:118, amount:-1},{first:89, second:117, amount:-1},{first:89, second:58, amount:-1},{first:89, second:44, amount:-2},{first:89, second:46, amount:-2},{first:89, second:45, amount:-2},{first:82, second:221, amount:-1},{first:82, second:89, amount:-1},{first:84, second:197, amount:-1},{first:84, second:192, amount:-1},{first:84, second:193, amount:-1},{first:84, second:194, amount:-1},{first:84, second:195, amount:-1},{first:84, second:196, amount:-1},{first:84, second:253, amount:-1},{first:84, second:229, amount:-2},{first:84, second:233, amount:-2},{first:84, second:235, amount:-2},{first:84, second:231, amount:-2},{first:84, second:224, amount:-2},{first:84, second:225, amount:-2},{first:84, second:226, amount:-2},{first:84, second:227, amount:-2},{first:84, second:228, amount:-2},{first:84, second:232, amount:-2},{first:84, second:234, amount:-2},{first:84, second:242, amount:-2},{first:84, second:243, amount:-2},{first:84, second:244, amount:-2},{first:84, second:245, amount:-2},{first:84, second:246, amount:-2},{first:84, second:252, amount:-1},{first:84, second:249, amount:-1},{first:84, second:250, amount:-1},{first:84, second:251, amount:-1},{first:84, second:65, amount:-1},{first:84, second:121, amount:-1},{first:84, second:59, amount:-1},{first:84, second:119, amount:-2},{first:84, second:97, amount:-2},{first:84, second:99, amount:-2},{first:84, second:101, amount:-2},{first:84, second:111, amount:-2},{first:84, second:115, amount:-2},{first:84, second:117, amount:-1},{first:84, second:114, amount:-1},{first:84, second:58, amount:-1},{first:84, second:44, amount:-2},{first:84, second:46, amount:-2},{first:84, second:45, amount:-2},{first:70, second:197, amount:-1},{first:70, second:192, amount:-1},{first:70, second:193, amount:-1},{first:70, second:194, amount:-1},{first:70, second:195, amount:-1},{first:70, second:196, amount:-1},{first:70, second:65, amount:-1},{first:70, second:44, amount:-2},{first:70, second:46, amount:-2},{first:76, second:221, amount:-2},{first:76, second:253, amount:-1},{first:76, second:87, amount:-1},{first:76, second:86, amount:-1},{first:76, second:89, amount:-2},{first:76, second:84, amount:-2},{first:76, second:121, amount:-1},{first:76, second:8217, amount:-1},{first:80, second:197, amount:-1},{first:80, second:192, amount:-1},{first:80, second:193, amount:-1},{first:80, second:194, amount:-1},{first:80, second:195, amount:-1},{first:80, second:196, amount:-1},{first:80, second:65, amount:-1},{first:80, second:44, amount:-2},{first:80, second:46, amount:-2},{first:121, second:44, amount:-1},{first:121, second:46, amount:-1},{first:154, second:36, amount:-2},{first:154, second:91, amount:-1},{first:154, second:87, amount:-1},{first:154, second:86, amount:-1},{first:154, second:88, amount:-1},{first:154, second:89, amount:-1},{first:154, second:90, amount:-1},{first:154, second:34, amount:-2},{first:33, second:171, amount:-1},{first:33, second:8212, amount:-2},{first:119, second:44, amount:-1},{first:119, second:46, amount:-1},{first:118, second:44, amount:-1},{first:118, second:46, amount:-1},{first:156, second:35, amount:-1},{first:114, second:44, amount:-1},{first:114, second:46, amount:-1},{first:114, second:45, amount:-1},{first:155, second:67, amount:-1},{first:155, second:71, amount:-1},{first:155, second:69, amount:-1},{first:34, second:171, amount:-1},{first:34, second:8212, amount:-2},{first:8217, second:115, amount:-1},{first:8217, second:8217, amount:-1},{first:8216, second:8216, amount:-1},{first:45, second:192, amount:-1},{first:45, second:195, amount:-1},{first:45, second:190, amount:-1}]}}


	var index = -1;
	for (var i=0; i<FontLibrary.length; i++){
		if (FontLibrary[i].id == id){
			index = i;
			break;
		}
	}
	if (index > -1){
		FontLibrary[index].font.push(obj)
	} else {
		FontLibrary.push({id:id, font:[obj]});
	}
	
	
}(window));