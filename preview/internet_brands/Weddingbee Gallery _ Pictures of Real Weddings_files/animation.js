		window.onload = function() {
			initBanner();
		}
		//

		var playCount = 0;
        var totalPlays = 1;

    	var autoScroll = true;
    	var userScroll = false;
    	var scrollInterval;


    	// Canvas and Pixi things
		var canvasWidth = 411;
		var canvasHeight = 88;

		var renderer;
		var stage;
		var container;


		// names of the animated elments
		var background,
			attention,
			text_01,
			text_02,
			footnote,
			text_03,
			cta,
			tm,
			reference;//,
			



		function initBanner() {

			// flag for toggling the overflow for the ISI
			if (getUrlParameter('showISI') === 'true') {
				$('#banner').css('overflow', 'visible');
				$('#isi-container .viewport').css('overflow', 'visible');
				$('#isi-container').css('overflow', 'visible');
			}

			// For tinyscrollbar.
			
			var $scrollbar = document.getElementById("isi-container");					
        	var scrollbar  = tinyscrollbar($scrollbar, {trackSize: 39, thumbSizeMin: 20, thumbSize: 20});

        	

			renderer = new PIXI.autoDetectRenderer(canvasWidth, canvasHeight, {backgroundColor: 0xFFFFFF, transparent: true});
			document.getElementById('animation').appendChild(renderer.view);
			stage = new PIXI.Container();



			var loader = new PIXI.loaders.Loader();
			var spriteJSON = 'sprite.json';

			loader
				.add(spriteJSON)
				.add('fish.png')
				.load(function (loader, resources) {


					background = createSprite('background.png', resources, spriteJSON);
					text_01  = createSprite('text_01.png', resources, spriteJSON);
					attention  = createSprite('attention.png', resources, spriteJSON);
					text_02  = createSprite('text_02.png', resources, spriteJSON);
					text_03  = createSprite('text_03.png', resources, spriteJSON);
					footnote  = createSprite('footnote.png', resources, spriteJSON);
					cta  = createSprite('cta_button.png', resources, spriteJSON);
					tm  = createSprite('tm.png', resources, spriteJSON);
					reference  = createSprite('reference.png', resources, spriteJSON);
					//
					stage.addChild(background);
					stage.addChild(attention);
					stage.addChild(text_01);
					stage.addChild(text_02);
					stage.addChild(text_03);

					stage.addChild(cta);
					stage.addChild(tm);
					stage.addChild(reference);


					var fishFrames = [];
					for (var i=0; i<8; i++) {
						var texture_fish = new PIXI.Texture(PIXI.utils.TextureCache['fish.png'].baseTexture);		
						var frame_fish = new PIXI.Rectangle(0, i*182, 164, 182);
						texture_fish.frame = frame_fish;
						fishFrames.push(texture_fish);
					}

					fish = new PIXI.extras.MovieClip(fishFrames);

					fish.animationSpeed = 0.1;
					

					stage.addChild(fish);
					




					initializeStates();

					runAnimationLoop();

				}
			);

        	// flag for toggling the overflow for the ISI
        	if (getUrlParameter('showISI') === 'true') {
        		$('#banner').css('overflow', 'visible');
        		$('#isi-container .viewport').css('overflow', 'visible');
        	}
		}




		function initializeStates() {

			
			// Frame 1

			attention.x = 145;
			attention.y = 21;
			attention.alpha = 0;

			text_01.x = 145;
			text_01.y = 21;
			text_01.alpha = 0;

			text_02.x = 145;
			text_02.y = 12;
			text_02.alpha = 0;

			text_03.x = 145;
			text_03.y = 21;
			text_03.alpha = 0;


			cta.x = 145;
			cta.y = 13;
			cta.alpha = 0;

			reference.x = 143;
			reference.y = 61;
			reference.alpha = 0;


			fish.scale.x = 0.48;
			fish.scale.y = 0.48;

			fish.x = 330;
			fish.y = 5;
			fish.finalX = fish.x;
			fish.x = stage.width;

			tm.x = 389;
			tm.y = 59;
			tm.alpha = 0;


			playCount++;
			
			
		


		 	runAnimationSequence();


		}




		function runAnimationSequence() {
			

			var delay = 0.5;


			TweenMax.to(attention, 0.5, {alpha: 1, ease:Quad.easeOut, delay: delay});

			delay += 1;

			TweenMax.to(text_01, 0.8, {alpha: 1, ease:Quad.easeOut, delay: delay});


			// delay += 2;

			delay += 2.3;

			TweenMax.allTo([attention, text_01], 0.4, {alpha: 0, ease:Quad.easeIn, delay: delay});

			delay += 0.4;

			TweenMax.to(text_02, 0.5, {alpha: 1, ease:Quad.easeOut, delay: delay});


			delay += 2.3;

			TweenMax.to(text_02, 0.4, {alpha: 0, ease:Quad.easeIn, delay: delay});

			delay += 0.4;

			TweenMax.to(text_03, 0.5, {alpha: 1, ease:Quad.easeOut, delay: delay});


			delay += 2.3;

			TweenMax.to(text_03, 0.4, {alpha: 0, ease:Quad.easeIn, delay: delay});



			delay += 0.4;

			TweenMax.to(background, 1.5, {alpha: 0.95, ease: Quad.easeIn, delay: delay});


			TweenMax.to(cta, 0.45, {alpha: 1, ease:Quad.easeOut, delay: delay});

			TweenMax.to(reference, 0.45, {alpha: 1, ease:Quad.easeOut, delay: delay});




			TweenMax.to(fish, 2.5, {x: fish.finalX, ease:Expo.easeOut, onStart: function() {
				fish.gotoAndPlay(0);
			},delay: delay});


			TweenMax.delayedCall(delay + 2.65, function() {
				console.log('stop');
				fish.stop();
			})

			TweenMax.to(tm, 0.4, {alpha: 1, ease: Quad.easeIn, delay: delay + 2});



			var finalDuration = delay;// + 2.65;

			var totalTime = delay + 2.65;// + finalDuration;

			totalTime = Math.round(totalTime * 100) / 100;

			console.log('⏰⏰⏰⏰⏰\n', 'total animation time to finish:\n', totalTime, 'seconds', '😍');
		}



		



		function runAnimationLoop() {
			renderer.render(stage);
			requestAnimationFrame(runAnimationLoop);
		}


		


		function createSprite(textureName, resources, json) {

			return new PIXI.Sprite(
				 resources[json].textures[textureName]
			);

		}


		function setMask(sprite) {
			var rect = new PIXI.Graphics();
			rect.beginFill(0xFFCC00);
			// draw a shape
			rect.moveTo(sprite.x, sprite.y);
			rect.lineTo(sprite.x + sprite.width, sprite.y);
			rect.lineTo(sprite.x+sprite.width, sprite.y+sprite.height);
			rect.lineTo(sprite.x, sprite.y+sprite.height);
			rect.endFill();

			stage.addChild(rect);
			sprite.mask = rect;
		}


		// 	custom function to pull a URL parameter. This will never be used 
		//  by banners served by media suppliers. It is a conveniecnce function 
		// to make the editorial step of reviewing the ISI easier for all.
		var getUrlParameter = function getUrlParameter(sParam) {
			var pageURL = decodeURIComponent(window.location.search.substring(1));
			var pageURLVariables = pageURL.split('&');
			var paramName;
			for (var i = 0; i < pageURLVariables.length; i++) {
				paramName = pageURLVariables[i].split('=');
				if (paramName[0] === sParam) {
			   		return paramName[1] === undefined ? true : paramName[1];
				}
			}
		};
