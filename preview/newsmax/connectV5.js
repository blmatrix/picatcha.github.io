(function() {

    var root = this,
        _nm = {};

    _nm.ArticleSelector = '';
    _nm.ArticleAdContainer = 'NmWgInstream';

    root.NM = _nm;

    _AdRenderOpts = {};

    _nm.init = function(param) {
        var key = Object.keys(param)[0],
            widgetId = param[key];

        // Instream widget
        if (param.ArticleSelector) {
            _nm.ArticleSelector = param.ArticleSelector;
            if (_nm.ArticleSelector) {
                _nm.insertInArticleWidget(widgetId);
            }
        } else {
        // All other widgets
            var adData = _nm.getStandardAdData(widgetId);

            adUnit = {
                apiKey: adData.apiKey,
                nativeAdElementId: 'NmWg' + widgetId
            };

            // Widgets requiring client side screen & container size based decisioning
            if(adData.numAds) {
                adUnit.numAds = adData.numAds;
            }
            
            // Add unit to opts array
            // _AdRenderOpts.adUnits.push(adUnit);
            _AdRenderOpts = adUnit;
        }
        
        // Once all the widgets "_nm.init()" has been invoked, initiate renderJS
        _nm.insertRenderJs();
    };

    // In Article Widget
    _nm.inArticleWidget = (function () {

        var self = this,
            content = {},
            slots = [],
            rules = [],
            module = {};

        // Main Selector
        module.selector = '';

        // Initializes the module
        module.init = function (selector) {
            module.selector = selector;
            content = document.querySelector(selector);
            return this;
        };

        // Returns the possible insertion elements where the Slot can be appended in
        module.addRule = function (rule, config, callback) {

            rules.push({ name: rule, config: config, func: callback });
            return this;
        };

        // Slot contains the Widgets to append
        module.addSlot = function (slot) {
            slots.push(slot);
            return this;
        };

        // Return slots
        module.getSlots = function (slot) {
            return slots;
        };

        // Module Utils
        module.utils = {
            forEach: function (array, callback, scope) {
                for (var i = 0; i < array.length; i++) {
                    callback.call(scope, i, array[i]);
                }
            },
            pushArray: function () {
                var toPush = this.concat.apply([], arguments);
                for (var i = 0, len = toPush.length; i < len; ++i) {
                    this.push(toPush[i]);
                }
            }
        };

        // s7.0
        // Appends Widget
        self._append = function (slot, element) {
            if (element.parentNode) {
                element.parentNode.insertBefore(self._getAdTemplate(slot), element.nextSibling);
            } else {
                var e = content.appendChild(element);
                e.appendChild(self._getAdTemplate(slot));
            }
        };

        // s8.0
        self._getAdTemplate = function (slot) {
            var adContainer = document.createElement('div');
            adContainer.id = slot;
            adContainer.className = 'an-container';

            return adContainer;
        };

        // s6.0
        module.append = function () {

            // Rules
            var elems = [];
            for (var i = 0; i < rules.length; i++) {
                // Applies the rule and filters out unwanted elements
                Array.prototype.push.apply(elems, rules[i].func.call(this, content, rules[i].config));
            }

            // Add placement adContainers into appropriate locations
            if (elems.length > 0 && slots.length > 0) {
                for (var i = 0; i < slots.length; i++) {
                    if (elems.length > 0 && elems[i]) {
                        // append slot
                        self._append(slots[i], elems[i]);
                    }
                }
            } else {
                // No elements found lets try and append just one slot
                if (slots.length > 0) {
                    // append slot
                    self._append(slots[0], document.createElement('div'));
                }
            }

        };

        // s5.0
        // Plugins
        module.Helpers = function () {

            this.createRule = function (type) {
                if (type === "Paragraph") {
                    return ParagraphRule;
                } else if (type === "Div") {
                    return DivRule;
                } else if (type === "Break") {
                    return BreakRule;
                }

                return rule;
            };

            // Handles Paragraphs within an article
            var ParagraphRule = function (element, config) {

                if (!element)
                    return;

                var elements = [];
                var filtered = [];
                var all = element.querySelectorAll('p');
                module.utils.forEach(all, function (i, node) {
                    if (node.innerHTML.replace(/^\s+|\s+$/g, '') !== '' || node.nodeName === 'BR') {
                        filtered.push(node);
                    }
                });

                module.utils.forEach(filtered, function (i, node) {
                    i++;
                    if (i % config.appendSlotEvery === 0) {
                        elements.push(node);
                    }

                });

                return elements;

            };

            // Handles Divs within an article
            var DivRule = function (element, config) {

                if (!element)
                    return;

                var elements = [];
                var filtered = [];
                var all = element.querySelectorAll('div');
                module.utils.forEach(all, function (i, node) {
                    if (node.innerHTML.replace(/^\s+|\s+$/g, '') !== '') {
                        filtered.push(node);
                    }
                });

                module.utils.forEach(filtered, function (i, node) {
                    i++;
                    if (i % config.appendSlotEvery === 0) {
                        elements.push(node);
                    }
                });

                return elements;

            };

            // Handles Breaks within an article
            var BreakRule = function (element, config) {

                if (!element)
                    return;

                var elements = [];
                var filtered = [];
                var all = element.querySelectorAll('br');
                module.utils.forEach(all, function (i, node) {
                    filtered.push(node);
                });

                module.utils.forEach(filtered, function (i, node) {
                    i++;
                    if (i % config.appendSlotEvery === 0) {
                        elements.push(node);
                    }
                });

                return elements;
            };
        }

        return module;

    })();

    _nm.insertInArticleWidget = function(widgetId) {
        var adData = _nm.getInstreamData(widgetId);        
            plugins = new _nm.inArticleWidget.Helpers(),
            instreamWidget = _nm.inArticleWidget.init(_nm.ArticleSelector),
            adUnits = [];
            
        for (var i = 0; i < adData.zoneCount; i++) {
            instreamWidget.addSlot(_nm.ArticleAdContainer + widgetId + (i + 1));
        }

        instreamWidget.addRule('Paragraph', { appendSlotEvery: 3 }, plugins.createRule('Paragraph'));
        instreamWidget.addRule('Div', { appendSlotEvery: 3 }, plugins.createRule('Div'));
        instreamWidget.addRule('Break', { appendSlotEvery: 3 }, plugins.createRule('Break'));
        instreamWidget.append();

        _AdRenderOpts.adUnits = [];
        for (var i = 0; i < adData.zoneCount; i++) {
            var adUnit = {
               apiKey: adData.apiKey,
               keyValues: {widgetType: 'instream_article'},
               nativeAdElementId: _nm.ArticleAdContainer + widgetId + (i + 1)
            };

            _AdRenderOpts.adUnits.push(adUnit);
        }
    };

    _nm.insertRenderJs = function() {
        var antag = document.createElement('script');
        antag.async = true;
        antag.type = 'text/javascript';
        antag.src ='http://static.adsnative.com/static/js/render.v1.js';

        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(antag, node);
    }

    _nm.getStandardAdData = function(widgetId) {
        console.log('render js : widgetId : ' + widgetId);

        var numAds = 0,
            apiKey = '',
            containerWidth = document.getElementById('NmWg' + widgetId).offsetWidth,
            screenWidth = window.innerWidth;

        var migrationWidgets = {
            standardImage: [
                3667,4355,3944,4074,3726,4150,4446,212,3767,4038,4031,4301,768,3938,3683,4353,3613,370,4195,811,3983,4032,4217,259,4097,4456,4033,4090,4182,3220,3788,3626,4349,3685,3866,3740,3330,4414,4212,3703,4332,4317,3737,3496,4073,3686,4175,3819,3818,3536,4046,4215,3783,3707,3690,4199,4138,4141,4210,4286,4308,4307,4178,3658,3659,3290,3291,4048,745,803,841,3090,1035,561,4017,10,2,1,3292,3293,3520,3628,4070,3975,4442,4057,4155,3633,3952,4075,4088,3774,4152,3934,4279,3881,3742,3745,961,4221,4357,3935,3684,4176,3657,4128,4039,3583,4315,4453,3991,3704,4209,4179,4219,4440
            ],
            standardImage2Columns: [
                281,4384,1038,512,251,4345,318,120,933,692,4457,746,738,398,4352,4460,4339,4058,697,157,790,760,4310,995,3192,323,4239,3577,3069,3231,1054,3162,3142,3219,570,871
            ],
            sidebarThumbnails: [
                3513,3491,3464,789,3535,567,1024,661,4409,4391,4390,4427,4395,4425
            ], // Fake widget for testing only (4567)
            thumbnails2Columns: [
                4567
            ],
            footer: [
                4478,4466
            ],
            leaderboard: [
                4055,3336,4089,4431,3651,3431,3164,3497,3337,4224,3569,3199,3747,3733,3928,3559,4407,3566,4404,4399,4203,3339,3922
            ],
            exit: [
                4266,4271,3992,4272,4174,4037,3539,4216,4091,4438,4235,4172,4278,4228,4170,4232,4231,4233,4062,4167,4240,4166,4095,4238,4214,4126,4124,4342,4351,4163,4208,4382,4173,4274,4237,4319,4171,4068,4082,4328,4169,4441,4168,4443,4289,4327,4380,4222,4424,4341,4220,4439
            ]
        };

        if(migrationWidgets.standardImage.indexOf(widgetId) >= 0) { // Standard Image
            if(screenWidth <= 480) {
                numAds = 4;
            } else if(screenWidth <= 720) {
                numAds = 6;
            } else if(screenWidth > 720) {
                numAds = (containerWidth <= 720) ? 8 : 10;
            }

            apiKey = 'Ypi1vILq3qiQt5aRuLC_Meg_JULNq_Re34TQhYJW';
        } else if(migrationWidgets.standardImage2Columns.indexOf(widgetId) >= 0) { // Standard Image - Mobile 2 columns
            if(screenWidth <= 480) {
                numAds = 8;
            } else if(screenWidth <= 720) {
                numAds = 6;
            } else if(screenWidth > 720) {
                numAds = (containerWidth <= 720) ? 8 : 10;
            }

            apiKey = '_KqFQgIsOm33tKM_DbFPi93FtUzSZG_nZQNrAHLw';
        } else if(migrationWidgets.sidebarThumbnails.indexOf(widgetId) >= 0) { // 
            if(screenWidth <= 480) {
                numAds = 5;
            } else {
                numAds = 8;
            }

            apiKey = 'q9XdoqNG8Qxwv1eqdUsd2nO60m-T4IsCVWkZL35O';
        } else if(migrationWidgets.thumbnails2Columns.indexOf(widgetId) >= 0) { // 
            if(screenWidth <= 480) {
                numAds = 5;
            } else {
                numAds = 10;
            }

            apiKey = 'fOfp7ReOZp66gTJZB9iKjc_hJYxJ4Mn3ajTJNnn-';
        } else if(migrationWidgets.leaderboard.indexOf(widgetId) >= 0) { // Leaderboard
            numAds = 4;

            apiKey = 'xUW9N6alquSbevlEwDxW0rEP_UahXpmuH1pBkgh-';
        } else if(migrationWidgets.leaderboard.indexOf(widgetId) >= 0) { // Leaderboard
            numAds = 4;

            apiKey = 'xUW9N6alquSbevlEwDxW0rEP_UahXpmuH1pBkgh-';
        } else if(widgetId === 3333) { // Standard Text
            apiKey = '-SFwLyLSbH1f_H6ZiEdXjAI606mHNolNwXwhZr5p';
        } else if(widgetId === 4444) { // Standard Text - 2 Columns
            apiKey = 'dg9JDKC97-LeELRzo6eZ6TD4A5Otq6bF2sHwJwU7';
        } else if(widgetId === 5555) { // Sidebar
            apiKey = 'lVvZTxC5JO5r9lRGRjnNE3Y8kXrZEnRiohuQzYxk';
        } else if(widgetId === 6666) { // Sidebar - 2 Columns
            apiKey = 'YzynlJjr6UkajtdUDdXOFuBeow4N_r4BzAU2HjPo';
        } else if(widgetId === 7777) { // Sidebar Text 
            apiKey = '1VkNwolbgmZK4-JUsCtcGoD-LbPs6KgmAo361o_L';
        } else if(widgetId === 1313) { // Footer
            apiKey = '1VkNwolbgmZK4-JUsCtcGoD-LbPs6KgmAo361o_L';
        }

        return {numAds: numAds, apiKey: apiKey};
    };

    _nm.getInstreamData = function(widgetId) {
        var apiKey = '',
            zoneCount = 0;

        var migrationWidgets = {
            instreamNative: [
                4285,4479,4465,4473,4472,4469
            ], // Fake widget for testing only (5678)
            instreamNativeSingle: [
                5678
            ],
            instreamText: [
                4071,3668,3377,3968,4356,3258,3306,4093,3265,4420,3324,3444,4063,4300,3386,4302,4387,4325,3434,4234,4267,4118,4061,4447,3487,4094,3279,3463,4455,3264,3376,3266,3920,4343,4143,3344,3624,4463,3225,3275,3387,4149,3308,3418,3282,4112,4326,3310,3322,3820,4122,3222,3320,4159,4370,3311,3281,4309,4410,3470,4402,4398,4044,4346,4419,3267,4125,3354,3323
            ]
        };

        if(migrationWidgets.instreamNative.indexOf(widgetId) >= 0) { // Instream Native
            apiKey = 'V4iMbIJBp90urCcKW6tJ-1P912NtUNQ-aNtoB7FZ';
            zoneCount = 2;
        } else if(migrationWidgets.instreamNativeSingle.indexOf(widgetId) >= 0) { // Instream Native Single
            apiKey = 'UNFVE-r4MA_VnXFyVlbSWKiAiTWyry2OuKNjBt1v';
            zoneCount = 1;
        } else if(migrationWidgets.instreamText.indexOf(widgetId) >= 0) { // Instream Native Text
            apiKey = 'PDrlWfG46MxggK80h-wSZxBU4sprxhOq7pkNn_Ed';
            zoneCount = 2;
        }

        return {apiKey: apiKey, zoneCount: zoneCount};
    };
})();
