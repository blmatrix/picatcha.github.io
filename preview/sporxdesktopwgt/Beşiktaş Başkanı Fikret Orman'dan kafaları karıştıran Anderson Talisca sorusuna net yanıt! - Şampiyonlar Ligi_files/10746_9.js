(function(win) {
	'use strict'
	
	var Rosetta = (win._$OGO$_ || (win._$OGO$_ = {})) &&  (win._$OGO$_.Rosetta || (win._$OGO$_.Rosetta = {}));
	var FontLibrary =  (Rosetta.shared || (Rosetta.shared = {})) && (Rosetta.shared.fontLibrary || (Rosetta.shared.fontLibrary = []));
	
	var id = "10746";
	
	//size, reg, bold, italic, boldItalic
	var obj = {size:9, reg:{info:{face:"Helvetica LT Std", size:9, bold:1, italic:0, chasrset:"", unicode:0, stretchH:100, smooth:1, aa:1, padding:"0,0,0,0", spacing:"5,5"}, common:{lineHeight:12, base:6, scaleW:256, scaleH:256, pages:1, packed:0}, file:"10746/images/10746_9.png", chars:[{id:124, x:5, y:5, width:4, height:12, xoffset:1, yoffset:-1, xadvance:3, page:0, chnl:0, letter:"|"},{id:192, x:14, y:5, width:9, height:11, xoffset:0, yoffset:-2, xadvance:6, page:0, chnl:0, letter:"À"},{id:193, x:28, y:5, width:9, height:11, xoffset:0, yoffset:-2, xadvance:6, page:0, chnl:0, letter:"Á"},{id:194, x:42, y:5, width:9, height:11, xoffset:0, yoffset:-2, xadvance:6, page:0, chnl:0, letter:"Â"},{id:195, x:56, y:5, width:9, height:11, xoffset:0, yoffset:-2, xadvance:6, page:0, chnl:0, letter:"Ã"},{id:196, x:70, y:5, width:9, height:11, xoffset:0, yoffset:-2, xadvance:6, page:0, chnl:0, letter:"Ä"},{id:197, x:84, y:5, width:9, height:11, xoffset:0, yoffset:-2, xadvance:6, page:0, chnl:0, letter:"Å"},{id:210, x:98, y:5, width:9, height:11, xoffset:0, yoffset:-2, xadvance:7, page:0, chnl:0, letter:"Ò"},{id:211, x:112, y:5, width:9, height:11, xoffset:0, yoffset:-2, xadvance:7, page:0, chnl:0, letter:"Ó"},{id:212, x:126, y:5, width:9, height:11, xoffset:0, yoffset:-2, xadvance:7, page:0, chnl:0, letter:"Ô"},{id:213, x:140, y:5, width:9, height:11, xoffset:0, yoffset:-2, xadvance:7, page:0, chnl:0, letter:"Õ"},{id:214, x:154, y:5, width:9, height:11, xoffset:0, yoffset:-2, xadvance:7, page:0, chnl:0, letter:"Ö"},{id:220, x:168, y:5, width:8, height:11, xoffset:1, yoffset:-2, xadvance:6, page:0, chnl:0, letter:"Ü"},{id:199, x:181, y:5, width:8, height:11, xoffset:0, yoffset:0, xadvance:6, page:0, chnl:0, letter:"Ç"},{id:209, x:194, y:5, width:8, height:11, xoffset:1, yoffset:-2, xadvance:6, page:0, chnl:0, letter:"Ñ"},{id:217, x:207, y:5, width:8, height:11, xoffset:1, yoffset:-2, xadvance:6, page:0, chnl:0, letter:"Ù"},{id:218, x:220, y:5, width:8, height:11, xoffset:1, yoffset:-2, xadvance:6, page:0, chnl:0, letter:"Ú"},{id:219, x:233, y:5, width:8, height:11, xoffset:1, yoffset:-2, xadvance:6, page:0, chnl:0, letter:"Û"},{id:221, x:5, y:22, width:8, height:11, xoffset:0, yoffset:-2, xadvance:6, page:0, chnl:0, letter:"Ý"},{id:36, x:18, y:22, width:7, height:11, xoffset:0, yoffset:-1, xadvance:5, page:0, chnl:0, letter:"$"},{id:167, x:30, y:22, width:7, height:11, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"§"},{id:182, x:42, y:22, width:7, height:11, xoffset:-0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"¶"},{id:201, x:54, y:22, width:7, height:11, xoffset:1, yoffset:-2, xadvance:6, page:0, chnl:0, letter:"É"},{id:203, x:66, y:22, width:7, height:11, xoffset:1, yoffset:-2, xadvance:6, page:0, chnl:0, letter:"Ë"},{id:200, x:78, y:22, width:7, height:11, xoffset:1, yoffset:-2, xadvance:6, page:0, chnl:0, letter:"È"},{id:202, x:90, y:22, width:7, height:11, xoffset:1, yoffset:-2, xadvance:6, page:0, chnl:0, letter:"Ê"},{id:253, x:102, y:22, width:7, height:11, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"ý"},{id:254, x:114, y:22, width:7, height:11, xoffset:1, yoffset:0, xadvance:5, page:0, chnl:0, letter:"þ"},{id:206, x:126, y:22, width:6, height:11, xoffset:-0, yoffset:-2, xadvance:3, page:0, chnl:0, letter:"Î"},{id:40, x:137, y:22, width:5, height:11, xoffset:0, yoffset:0, xadvance:3, page:0, chnl:0, letter:"("},{id:41, x:147, y:22, width:5, height:11, xoffset:0, yoffset:0, xadvance:3, page:0, chnl:0, letter:")"},{id:91, x:157, y:22, width:5, height:11, xoffset:1, yoffset:0, xadvance:3, page:0, chnl:0, letter:"["},{id:93, x:167, y:22, width:5, height:11, xoffset:0, yoffset:0, xadvance:3, page:0, chnl:0, letter:"]"},{id:123, x:177, y:22, width:5, height:11, xoffset:0, yoffset:0, xadvance:4, page:0, chnl:0, letter:"{"},{id:125, x:187, y:22, width:5, height:11, xoffset:0, yoffset:0, xadvance:4, page:0, chnl:0, letter:"}"},{id:204, x:197, y:22, width:5, height:11, xoffset:-0, yoffset:-2, xadvance:3, page:0, chnl:0, letter:"Ì"},{id:205, x:207, y:22, width:5, height:11, xoffset:1, yoffset:-2, xadvance:3, page:0, chnl:0, letter:"Í"},{id:207, x:217, y:22, width:5, height:11, xoffset:-0, yoffset:-2, xadvance:3, page:0, chnl:0, letter:"Ï"},{id:106, x:227, y:22, width:4, height:11, xoffset:0, yoffset:0, xadvance:3, page:0, chnl:0, letter:"j"},{id:81, x:236, y:22, width:9, height:10, xoffset:0, yoffset:-1, xadvance:7, page:0, chnl:0, letter:"Q"},{id:159, x:5, y:38, width:8, height:10, xoffset:0, yoffset:0, xadvance:6, page:0, chnl:0, letter:""},{id:131, x:18, y:38, width:7, height:10, xoffset:0, yoffset:1, xadvance:5, page:0, chnl:0, letter:""},{id:229, x:30, y:38, width:7, height:10, xoffset:0, yoffset:-1, xadvance:5, page:0, chnl:0, letter:"å"},{id:134, x:42, y:38, width:6, height:10, xoffset:0, yoffset:1, xadvance:5, page:0, chnl:0, letter:""},{id:135, x:53, y:38, width:6, height:10, xoffset:0, yoffset:1, xadvance:5, page:0, chnl:0, letter:""},{id:138, x:64, y:38, width:6, height:10, xoffset:0, yoffset:0, xadvance:4, page:0, chnl:0, letter:""},{id:166, x:75, y:38, width:4, height:10, xoffset:1, yoffset:0, xadvance:3, page:0, chnl:0, letter:"¦"},{id:87, x:84, y:38, width:11, height:9, xoffset:0, yoffset:0, xadvance:8, page:0, chnl:0, letter:"W"},{id:140, x:100, y:38, width:11, height:9, xoffset:1, yoffset:1, xadvance:9, page:0, chnl:0, letter:""},{id:198, x:116, y:38, width:11, height:9, xoffset:0, yoffset:0, xadvance:9, page:0, chnl:0, letter:"Æ"},{id:37, x:132, y:38, width:10, height:9, xoffset:0, yoffset:0, xadvance:8, page:0, chnl:0, letter:"%"},{id:190, x:147, y:38, width:10, height:9, xoffset:0, yoffset:0, xadvance:8, page:0, chnl:0, letter:"¾"},{id:64, x:162, y:38, width:9, height:9, xoffset:1, yoffset:0, xadvance:9, page:0, chnl:0, letter:"@"},{id:65, x:176, y:38, width:9, height:9, xoffset:0, yoffset:0, xadvance:6, page:0, chnl:0, letter:"A"},{id:71, x:190, y:38, width:9, height:9, xoffset:0, yoffset:0, xadvance:7, page:0, chnl:0, letter:"G"},{id:77, x:204, y:38, width:9, height:9, xoffset:1, yoffset:0, xadvance:7, page:0, chnl:0, letter:"M"},{id:79, x:218, y:38, width:9, height:9, xoffset:0, yoffset:0, xadvance:7, page:0, chnl:0, letter:"O"},{id:137, x:232, y:38, width:9, height:9, xoffset:0, yoffset:1, xadvance:7, page:0, chnl:0, letter:""},{id:169, x:5, y:53, width:9, height:9, xoffset:-0, yoffset:0, xadvance:7, page:0, chnl:0, letter:"©"},{id:174, x:19, y:53, width:9, height:9, xoffset:-0, yoffset:0, xadvance:7, page:0, chnl:0, letter:"®"},{id:188, x:33, y:53, width:9, height:9, xoffset:0, yoffset:0, xadvance:8, page:0, chnl:0, letter:"¼"},{id:189, x:47, y:53, width:9, height:9, xoffset:0, yoffset:0, xadvance:8, page:0, chnl:0, letter:"½"},{id:208, x:61, y:53, width:9, height:9, xoffset:-0, yoffset:0, xadvance:6, page:0, chnl:0, letter:"Ð"},{id:216, x:75, y:53, width:9, height:9, xoffset:0, yoffset:0, xadvance:7, page:0, chnl:0, letter:"Ø"},{id:38, x:89, y:53, width:8, height:9, xoffset:0, yoffset:0, xadvance:6, page:0, chnl:0, letter:"&"},{id:66, x:102, y:53, width:8, height:9, xoffset:1, yoffset:0, xadvance:6, page:0, chnl:0, letter:"B"},{id:67, x:115, y:53, width:8, height:9, xoffset:0, yoffset:0, xadvance:6, page:0, chnl:0, letter:"C"},{id:68, x:128, y:53, width:8, height:9, xoffset:1, yoffset:0, xadvance:6, page:0, chnl:0, letter:"D"},{id:72, x:141, y:53, width:8, height:9, xoffset:1, yoffset:0, xadvance:6, page:0, chnl:0, letter:"H"},{id:75, x:154, y:53, width:8, height:9, xoffset:1, yoffset:0, xadvance:6, page:0, chnl:0, letter:"K"},{id:78, x:167, y:53, width:8, height:9, xoffset:1, yoffset:0, xadvance:6, page:0, chnl:0, letter:"N"},{id:82, x:180, y:53, width:8, height:9, xoffset:1, yoffset:0, xadvance:6, page:0, chnl:0, letter:"R"},{id:83, x:193, y:53, width:8, height:9, xoffset:0, yoffset:0, xadvance:6, page:0, chnl:0, letter:"S"},{id:84, x:206, y:53, width:8, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"T"},{id:85, x:219, y:53, width:8, height:9, xoffset:1, yoffset:0, xadvance:6, page:0, chnl:0, letter:"U"},{id:86, x:232, y:53, width:8, height:9, xoffset:0, yoffset:0, xadvance:6, page:0, chnl:0, letter:"V"},{id:88, x:5, y:67, width:8, height:9, xoffset:0, yoffset:0, xadvance:6, page:0, chnl:0, letter:"X"},{id:89, x:18, y:67, width:8, height:9, xoffset:0, yoffset:0, xadvance:6, page:0, chnl:0, letter:"Y"},{id:90, x:31, y:67, width:8, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"Z"},{id:165, x:44, y:67, width:8, height:9, xoffset:-0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"¥"},{id:35, x:57, y:67, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"#"},{id:48, x:69, y:67, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"0"},{id:50, x:81, y:67, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"2"},{id:51, x:93, y:67, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"3"},{id:52, x:105, y:67, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"4"},{id:53, x:117, y:67, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"5"},{id:54, x:129, y:67, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"6"},{id:55, x:141, y:67, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"7"},{id:56, x:153, y:67, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"8"},{id:57, x:165, y:67, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"9"},{id:63, x:177, y:67, width:7, height:9, xoffset:1, yoffset:0, xadvance:5, page:0, chnl:0, letter:"?"},{id:69, x:189, y:67, width:7, height:9, xoffset:1, yoffset:0, xadvance:6, page:0, chnl:0, letter:"E"},{id:70, x:201, y:67, width:7, height:9, xoffset:1, yoffset:0, xadvance:5, page:0, chnl:0, letter:"F"},{id:74, x:213, y:67, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"J"},{id:76, x:225, y:67, width:7, height:9, xoffset:1, yoffset:0, xadvance:5, page:0, chnl:0, letter:"L"},{id:80, x:237, y:67, width:7, height:9, xoffset:1, yoffset:0, xadvance:6, page:0, chnl:0, letter:"P"},{id:98, x:5, y:81, width:7, height:9, xoffset:1, yoffset:0, xadvance:5, page:0, chnl:0, letter:"b"},{id:100, x:17, y:81, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"d"},{id:103, x:29, y:81, width:7, height:9, xoffset:0, yoffset:2, xadvance:5, page:0, chnl:0, letter:"g"},{id:104, x:41, y:81, width:7, height:9, xoffset:1, yoffset:0, xadvance:5, page:0, chnl:0, letter:"h"},{id:107, x:53, y:81, width:7, height:9, xoffset:1, yoffset:0, xadvance:5, page:0, chnl:0, letter:"k"},{id:112, x:65, y:81, width:7, height:9, xoffset:1, yoffset:2, xadvance:5, page:0, chnl:0, letter:"p"},{id:113, x:77, y:81, width:7, height:9, xoffset:0, yoffset:2, xadvance:5, page:0, chnl:0, letter:"q"},{id:121, x:89, y:81, width:7, height:9, xoffset:0, yoffset:2, xadvance:5, page:0, chnl:0, letter:"y"},{id:162, x:101, y:81, width:7, height:9, xoffset:0, yoffset:1, xadvance:5, page:0, chnl:0, letter:"¢"},{id:163, x:113, y:81, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"£"},{id:181, x:125, y:81, width:7, height:9, xoffset:1, yoffset:2, xadvance:5, page:0, chnl:0, letter:"µ"},{id:233, x:137, y:81, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"é"},{id:235, x:149, y:81, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"ë"},{id:252, x:161, y:81, width:7, height:9, xoffset:1, yoffset:0, xadvance:5, page:0, chnl:0, letter:"ü"},{id:231, x:173, y:81, width:7, height:9, xoffset:0, yoffset:2, xadvance:5, page:0, chnl:0, letter:"ç"},{id:191, x:185, y:81, width:7, height:9, xoffset:0, yoffset:2, xadvance:5, page:0, chnl:0, letter:"¿"},{id:222, x:197, y:81, width:7, height:9, xoffset:1, yoffset:0, xadvance:6, page:0, chnl:0, letter:"Þ"},{id:223, x:209, y:81, width:7, height:9, xoffset:1, yoffset:0, xadvance:5, page:0, chnl:0, letter:"ß"},{id:224, x:221, y:81, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"à"},{id:225, x:233, y:81, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"á"},{id:226, x:5, y:95, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"â"},{id:227, x:17, y:95, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"ã"},{id:228, x:29, y:95, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"ä"},{id:232, x:41, y:95, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"è"},{id:234, x:53, y:95, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"ê"},{id:240, x:65, y:95, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"ð"},{id:241, x:77, y:95, width:7, height:9, xoffset:1, yoffset:0, xadvance:5, page:0, chnl:0, letter:"ñ"},{id:242, x:89, y:95, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"ò"},{id:243, x:101, y:95, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"ó"},{id:244, x:113, y:95, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"ô"},{id:245, x:125, y:95, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"õ"},{id:246, x:137, y:95, width:7, height:9, xoffset:0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"ö"},{id:249, x:149, y:95, width:7, height:9, xoffset:1, yoffset:0, xadvance:5, page:0, chnl:0, letter:"ù"},{id:250, x:161, y:95, width:7, height:9, xoffset:1, yoffset:0, xadvance:5, page:0, chnl:0, letter:"ú"},{id:251, x:173, y:95, width:7, height:9, xoffset:1, yoffset:0, xadvance:5, page:0, chnl:0, letter:"û"},{id:47, x:185, y:95, width:6, height:9, xoffset:-0, yoffset:0, xadvance:3, page:0, chnl:0, letter:"/"},{id:92, x:196, y:95, width:6, height:9, xoffset:-0, yoffset:0, xadvance:3, page:0, chnl:0, letter:"\\"},{id:238, x:207, y:95, width:6, height:9, xoffset:-0, yoffset:0, xadvance:3, page:0, chnl:0, letter:"î"},{id:49, x:218, y:95, width:5, height:9, xoffset:1, yoffset:0, xadvance:5, page:0, chnl:0, letter:"1"},{id:102, x:228, y:95, width:5, height:9, xoffset:0, yoffset:0, xadvance:3, page:0, chnl:0, letter:"f"},{id:116, x:238, y:95, width:5, height:9, xoffset:0, yoffset:0, xadvance:3, page:0, chnl:0, letter:"t"},{id:236, x:5, y:109, width:5, height:9, xoffset:-0, yoffset:0, xadvance:3, page:0, chnl:0, letter:"ì"},{id:237, x:15, y:109, width:5, height:9, xoffset:1, yoffset:0, xadvance:3, page:0, chnl:0, letter:"í"},{id:239, x:25, y:109, width:5, height:9, xoffset:-0, yoffset:0, xadvance:3, page:0, chnl:0, letter:"ï"},{id:33, x:35, y:109, width:4, height:9, xoffset:1, yoffset:0, xadvance:3, page:0, chnl:0, letter:"!"},{id:59, x:44, y:109, width:4, height:9, xoffset:1, yoffset:2, xadvance:3, page:0, chnl:0, letter:";"},{id:73, x:53, y:109, width:4, height:9, xoffset:1, yoffset:0, xadvance:3, page:0, chnl:0, letter:"I"},{id:105, x:62, y:109, width:4, height:9, xoffset:1, yoffset:0, xadvance:3, page:0, chnl:0, letter:"i"},{id:108, x:71, y:109, width:4, height:9, xoffset:1, yoffset:0, xadvance:3, page:0, chnl:0, letter:"l"},{id:161, x:80, y:109, width:4, height:9, xoffset:1, yoffset:2, xadvance:3, page:0, chnl:0, letter:"¡"},{id:230, x:89, y:109, width:10, height:8, xoffset:0, yoffset:1, xadvance:8, page:0, chnl:0, letter:"æ"},{id:164, x:104, y:109, width:8, height:8, xoffset:-0, yoffset:0, xadvance:5, page:0, chnl:0, letter:"¤"},{id:248, x:117, y:109, width:8, height:8, xoffset:0, yoffset:1, xadvance:5, page:0, chnl:0, letter:"ø"},{id:97, x:130, y:109, width:7, height:8, xoffset:0, yoffset:1, xadvance:5, page:0, chnl:0, letter:"a"},{id:99, x:142, y:109, width:7, height:8, xoffset:0, yoffset:1, xadvance:5, page:0, chnl:0, letter:"c"},{id:101, x:154, y:109, width:7, height:8, xoffset:0, yoffset:1, xadvance:5, page:0, chnl:0, letter:"e"},{id:111, x:166, y:109, width:7, height:8, xoffset:0, yoffset:1, xadvance:5, page:0, chnl:0, letter:"o"},{id:115, x:178, y:109, width:7, height:8, xoffset:0, yoffset:1, xadvance:5, page:0, chnl:0, letter:"s"},{id:247, x:190, y:109, width:7, height:8, xoffset:0, yoffset:1, xadvance:5, page:0, chnl:0, letter:"÷"},{id:154, x:202, y:109, width:5, height:8, xoffset:0, yoffset:2, xadvance:3, page:0, chnl:0, letter:""},{id:109, x:212, y:109, width:9, height:7, xoffset:1, yoffset:2, xadvance:8, page:0, chnl:0, letter:"m"},{id:119, x:226, y:109, width:9, height:7, xoffset:0, yoffset:2, xadvance:7, page:0, chnl:0, letter:"w"},{id:43, x:240, y:109, width:7, height:7, xoffset:0, yoffset:2, xadvance:5, page:0, chnl:0, letter:"+"},{id:60, x:5, y:123, width:7, height:7, xoffset:0, yoffset:2, xadvance:5, page:0, chnl:0, letter:"<"},{id:62, x:17, y:123, width:7, height:7, xoffset:0, yoffset:2, xadvance:5, page:0, chnl:0, letter:">"},{id:110, x:29, y:123, width:7, height:7, xoffset:1, yoffset:2, xadvance:5, page:0, chnl:0, letter:"n"},{id:117, x:41, y:123, width:7, height:7, xoffset:1, yoffset:2, xadvance:5, page:0, chnl:0, letter:"u"},{id:118, x:53, y:123, width:7, height:7, xoffset:0, yoffset:2, xadvance:5, page:0, chnl:0, letter:"v"},{id:120, x:65, y:123, width:7, height:7, xoffset:0, yoffset:2, xadvance:5, page:0, chnl:0, letter:"x"},{id:122, x:77, y:123, width:7, height:7, xoffset:0, yoffset:2, xadvance:5, page:0, chnl:0, letter:"z"},{id:156, x:89, y:123, width:7, height:7, xoffset:0, yoffset:3, xadvance:5, page:0, chnl:0, letter:""},{id:177, x:101, y:123, width:7, height:7, xoffset:0, yoffset:2, xadvance:5, page:0, chnl:0, letter:"±"},{id:215, x:113, y:123, width:7, height:7, xoffset:0, yoffset:2, xadvance:5, page:0, chnl:0, letter:"×"},{id:114, x:125, y:123, width:5, height:7, xoffset:1, yoffset:2, xadvance:4, page:0, chnl:0, letter:"r"},{id:58, x:135, y:123, width:4, height:7, xoffset:1, yoffset:2, xadvance:3, page:0, chnl:0, letter:":"},{id:8482, x:144, y:123, width:11, height:6, xoffset:0, yoffset:0, xadvance:9, page:0, chnl:0, letter:"™"},{id:153, x:160, y:123, width:10, height:6, xoffset:0, yoffset:1, xadvance:8, page:0, chnl:0, letter:""},{id:94, x:175, y:123, width:7, height:6, xoffset:1, yoffset:0, xadvance:5, page:0, chnl:0, letter:"^"},{id:171, x:187, y:123, width:6, height:6, xoffset:1, yoffset:2, xadvance:5, page:0, chnl:0, letter:"«"},{id:186, x:198, y:123, width:6, height:6, xoffset:0, yoffset:-1, xadvance:3, page:0, chnl:0, letter:"º"},{id:187, x:209, y:123, width:6, height:6, xoffset:1, yoffset:2, xadvance:5, page:0, chnl:0, letter:"»"},{id:170, x:220, y:123, width:5, height:6, xoffset:0, yoffset:-1, xadvance:3, page:0, chnl:0, letter:"ª"},{id:178, x:230, y:123, width:5, height:6, xoffset:0, yoffset:0, xadvance:3, page:0, chnl:0, letter:"²"},{id:179, x:240, y:123, width:5, height:6, xoffset:0, yoffset:1, xadvance:3, page:0, chnl:0, letter:"³"},{id:139, x:5, y:135, width:4, height:6, xoffset:0, yoffset:3, xadvance:5, page:0, chnl:0, letter:""},{id:155, x:14, y:135, width:4, height:6, xoffset:0, yoffset:3, xadvance:2, page:0, chnl:0, letter:""},{id:185, x:23, y:135, width:4, height:6, xoffset:0, yoffset:0, xadvance:3, page:0, chnl:0, letter:"¹"},{id:61, x:32, y:135, width:7, height:5, xoffset:0, yoffset:3, xadvance:5, page:0, chnl:0, letter:"="},{id:172, x:44, y:135, width:7, height:5, xoffset:0, yoffset:3, xadvance:5, page:0, chnl:0, letter:"¬"},{id:42, x:56, y:135, width:6, height:5, xoffset:0, yoffset:1, xadvance:4, page:0, chnl:0, letter:"*"},{id:147, x:67, y:135, width:6, height:5, xoffset:0, yoffset:0, xadvance:4, page:0, chnl:0, letter:""},{id:148, x:78, y:135, width:6, height:5, xoffset:0, yoffset:0, xadvance:4, page:0, chnl:0, letter:""},{id:750, x:89, y:135, width:6, height:5, xoffset:0, yoffset:0, xadvance:4, page:0, chnl:0, letter:"ˮ"},{id:8220, x:100, y:135, width:6, height:5, xoffset:1, yoffset:0, xadvance:5, page:0, chnl:0, letter:"“"},{id:8221, x:111, y:135, width:6, height:5, xoffset:1, yoffset:0, xadvance:5, page:0, chnl:0, letter:"”"},{id:34, x:122, y:135, width:5, height:5, xoffset:1, yoffset:0, xadvance:4, page:0, chnl:0, letter:"\""},{id:132, x:132, y:135, width:5, height:5, xoffset:0, yoffset:6, xadvance:5, page:0, chnl:0, letter:""},{id:176, x:142, y:135, width:5, height:5, xoffset:1, yoffset:0, xadvance:4, page:0, chnl:0, letter:"°"},{id:184, x:152, y:135, width:5, height:5, xoffset:0, yoffset:6, xadvance:3, page:0, chnl:0, letter:"¸"},{id:44, x:162, y:135, width:4, height:5, xoffset:1, yoffset:6, xadvance:3, page:0, chnl:0, letter:","},{id:130, x:171, y:135, width:4, height:5, xoffset:0, yoffset:6, xadvance:5, page:0, chnl:0, letter:""},{id:145, x:180, y:135, width:4, height:5, xoffset:0, yoffset:0, xadvance:2, page:0, chnl:0, letter:""},{id:146, x:189, y:135, width:4, height:5, xoffset:0, yoffset:0, xadvance:2, page:0, chnl:0, letter:""},{id:700, x:198, y:135, width:4, height:5, xoffset:0, yoffset:0, xadvance:2, page:0, chnl:0, letter:"ʼ"},{id:8217, x:207, y:135, width:4, height:5, xoffset:1, yoffset:0, xadvance:3, page:0, chnl:0, letter:"’"},{id:8216, x:216, y:135, width:4, height:5, xoffset:1, yoffset:0, xadvance:3, page:0, chnl:0, letter:"‘"},{id:789, x:225, y:135, width:4, height:5, xoffset:-1, yoffset:-2, xadvance:0, page:0, chnl:0, letter:"̕"},{id:39, x:234, y:135, width:3, height:5, xoffset:1, yoffset:0, xadvance:2, page:0, chnl:0, letter:"'"},{id:126, x:242, y:135, width:7, height:4, xoffset:1, yoffset:4, xadvance:5, page:0, chnl:0, letter:"~"},{id:45, x:5, y:146, width:5, height:4, xoffset:0, yoffset:3, xadvance:3, page:0, chnl:0, letter:"-"},{id:96, x:15, y:146, width:5, height:4, xoffset:-0, yoffset:0, xadvance:3, page:0, chnl:0, letter:"`"},{id:168, x:25, y:146, width:5, height:4, xoffset:0, yoffset:-1, xadvance:3, page:0, chnl:0, letter:"¨"},{id:173, x:35, y:146, width:5, height:4, xoffset:0, yoffset:3, xadvance:3, page:0, chnl:0, letter:"­"},{id:180, x:45, y:146, width:5, height:4, xoffset:1, yoffset:0, xadvance:3, page:0, chnl:0, letter:"´"},{id:46, x:55, y:146, width:4, height:4, xoffset:1, yoffset:5, xadvance:3, page:0, chnl:0, letter:"."},{id:183, x:64, y:146, width:4, height:4, xoffset:1, yoffset:3, xadvance:3, page:0, chnl:0, letter:"·"},{id:65287, x:73, y:146, width:4, height:4, xoffset:1, yoffset:-1, xadvance:9, page:0, chnl:0, letter:"＇"},{id:8212, x:82, y:146, width:12, height:3, xoffset:0, yoffset:4, xadvance:9, page:0, chnl:0, letter:"—"},{id:151, x:99, y:146, width:11, height:3, xoffset:0, yoffset:3, xadvance:9, page:0, chnl:0, letter:""},{id:133, x:115, y:146, width:9, height:3, xoffset:0, yoffset:7, xadvance:7, page:0, chnl:0, letter:""},{id:95, x:129, y:146, width:8, height:3, xoffset:0, yoffset:7, xadvance:5, page:0, chnl:0, letter:"_"},{id:8211, x:142, y:146, width:8, height:3, xoffset:0, yoffset:4, xadvance:5, page:0, chnl:0, letter:"–"},{id:175, x:155, y:146, width:6, height:3, xoffset:-0, yoffset:1, xadvance:3, page:0, chnl:0, letter:"¯"},{id:136, x:166, y:146, width:5, height:3, xoffset:0, yoffset:0, xadvance:3, page:0, chnl:0, letter:""},{id:150, x:176, y:146, width:5, height:3, xoffset:0, yoffset:3, xadvance:5, page:0, chnl:0, letter:""},{id:152, x:186, y:146, width:5, height:3, xoffset:0, yoffset:0, xadvance:3, page:0, chnl:0, letter:""},{id:32, x:196, y:146, width:0, height:0, xoffset:0, yoffset:9, xadvance:3, page:0, chnl:0, letter:" "}], kerning:[]}}


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