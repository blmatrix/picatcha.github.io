(function() {

    // Allow only one instance of Connect JS to execute on a page 
    if(window.connectLoaded) return;
    window.connectLoaded = true;

    var root = this,
        _nm = {};

    _nm.ArticleSelector = '';
    _nm.ArticleAdContainerPrefix = 'NmWgInstream';
    _nm.AdContainerPrefix = 'NmWg';
    _nm.widgetAlreadyExists = false;
    _nm.exitWidgetShownOnce = false;
    _nm.version = 1.004;
    _nm.widgets = {
        currentIndex: 0,
        adConfigs: []
    };
    _nm.debug = false;

    root.NMTemp = _nm;

    _AdRenderOpts = {};

    _nm.init = function(adConfig) {
        _nm.log('INIT request received from publisher page with config : ', adConfig);
        // Save Widget config object for serial processing
        _nm.widgets.adConfigs.push(adConfig);

        // First widget
        if(!_nm.widgetAlreadyExists) {
            _nm.loadNextWidget();
            _nm.widgetAlreadyExists = true;
        }
    };

    _nm.loadNextWidget = function() {
        _nm.log('Next widget loading invoked in queue');

        var adConfig = null;
        if(_nm.widgets.currentIndex < _nm.widgets.adConfigs.length) {
            adConfig = _nm.widgets.adConfigs[_nm.widgets.currentIndex];
            _nm.widgets.currentIndex++;
        }

        if(!adConfig || !adConfig.WidgetID) return;

        var widgetId = adConfig.WidgetID,
            template = adConfig.Template;

        // Instream widget
        if (adConfig.ArticleSelector) {
            _nm.log('Rendering InArticle widget : '+ widgetId);
            _nm.ArticleSelector = adConfig.ArticleSelector;
            if (_nm.ArticleSelector) {
                _nm.insertInArticleWidget(widgetId, template);
            }
        } else {
            _nm.log('Rendering Standard widget : '+ widgetId);
            _nm.insertStandardWidget(widgetId, template);
        }
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
            _nm.log('InArticle widget initialized for article container : '+ selector);
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
        self._appendInStreamAdContainer = function (slot, element) {
            _nm.log('Append InArticle placement container : '+ slot);

            if (element.parentNode) {
                element.parentNode.insertBefore(self._getInStreamAdContainer(slot), element.nextSibling);
            } else {
                var e = content.appendChild(element);
                e.appendChild(self._getInStreamAdContainer(slot));
            }
        };

        // s8.0
        self._getInStreamAdContainer = function (slot) {
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
                        self._appendInStreamAdContainer(slots[i], elems[i]);
                    }
                }
            } else {
                // No elements found lets try and append just one slot
                if (slots.length > 0) {
                    // append slot
                    self._appendInStreamAdContainer(slots[0], document.createElement('div'));
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

                var elements = [],
                    filtered = [],
                    all = element.querySelectorAll('p');

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

                var elements = [],
                    filtered = [],
                    all = element.querySelectorAll('div');

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

                var elements = [],
                    filtered = [],
                    all = element.querySelectorAll('br');

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

    _nm.insertInArticleWidget = function(widgetId, template) {
        var adData = _nm.getInstreamData(widgetId, template);        
            plugins = new _nm.inArticleWidget.Helpers(),
            instreamWidget = _nm.inArticleWidget.init(_nm.ArticleSelector),
            adUnit = null;

        _nm.inArticleWidgets = {
            currentIndex: 0,
            placementIds: [],
            widgetId: widgetId,
            template: (template) ? template : adData.template
        };
        
        if(adData.zoneCount == 0) {
            _nm.log('Zero zone count for the InArticle widgetId '+widgetId+' provided');
            return;
        }

        for (var i = 0; i < adData.zoneCount; i++) {
            instreamWidget.addSlot(_nm.ArticleAdContainerPrefix + widgetId + (i + 1));

            // Save the widgets for serial processing
            _nm.inArticleWidgets.placementIds.push(_nm.ArticleAdContainerPrefix + widgetId + (i + 1));
        }

        instreamWidget.addRule('Paragraph', { appendSlotEvery: 3 }, plugins.createRule('Paragraph'));
        instreamWidget.addRule('Div', { appendSlotEvery: 3 }, plugins.createRule('Div'));
        instreamWidget.addRule('Break', { appendSlotEvery: 3 }, plugins.createRule('Break'));
        instreamWidget.append();

        if(typeof _AdRenderOpts.adUnits === 'undefined')
            _AdRenderOpts.adUnits = [];

        // First in article placement
        if(_nm.inArticleWidgets.placementIds.length > 0 && !_nm.inArticleWidgets.currentIndex) {
            _nm.insertInArticleSinglePlacement();
        }
    };

    _nm.insertInArticleSinglePlacement = function() {
        var currentIndex = _nm.inArticleWidgets.currentIndex;

        if(currentIndex < _nm.inArticleWidgets.placementIds.length) {
            // Current Publishers : Backward Compatible Migration Approach
            if(typeof template === 'undefined') {
                _AdRenderOpts = {
                    networkKey: '5a86d53377e54819b9d1d7d92f6af887',
                    widgetId: _nm.inArticleWidgets.widgetId+'',
                    keyValues: {widget_type: _nm.getWidgetType(_nm.inArticleWidgets.template)},
                    nativeAdElementId: _nm.inArticleWidgets.placementIds[currentIndex],
                    categories: ['IAB1'],
                    userCallbackOnAdLoad: function(status) {
                        _nm.insertInArticleSinglePlacement();
                    }
                };
            } else {
                // New Publishers : Post Launch Approach
                _AdRenderOpts = {
                    apiKey: _nm.inArticleWidgets.widgetId,
                    templateKey: _nm.inArticleWidgets.template,
                    keyValues: {widget_type: _nm.getWidgetType(_nm.inArticleWidgets.template)},
                    nativeAdElementId: _nm.inArticleWidgets.placementIds[currentIndex],
                    userCallbackOnAdLoad: function(status) {
                        _nm.insertInArticleSinglePlacement();
                    }
                };
            }

            _nm.log('Registering InArticle Placement '+(currentIndex+1), _AdRenderOpts);

            // Move the placement index needle
            _nm.inArticleWidgets.currentIndex++;

            _nm.insertRenderJs();
        } else {
            // Continue the widget serial rendering chain after all the insrticle placements are completed
            _nm.loadNextWidget();
        }

     };

    _nm.insertStandardWidget = function(widgetId, template) {
        var adData = _nm.getStandardAdData(widgetId, template),
            adUnit = null;

        if(!adData) return;

        // Exit widget : Delay adrequest and rendering until user tries to exit page
        if(adData.template === 'NM15') {
            if(!_nm.exitWidgetShownOnce) {
                _nm.insertExitWidget(widgetId, template, adData);
                _nm.exitWidgetShownOnce = true;
            }
            return;
        }

        // Current Publishers : Backward Compatible Migration Approach
        if(typeof template === 'undefined') {
            _AdRenderOpts = {
                networkKey: '5a86d53377e54819b9d1d7d92f6af887',
                widgetId: widgetId+'',
                keyValues: {widget_type: _nm.getWidgetType(adData.template)},
                cssPath: '#' + _nm.AdContainerPrefix + widgetId + ':append',
                categories: ['IAB1'],
                userCallbackOnAdLoad: function(status) {
                    _nm.log('Migrated Widget loaded successfully');
                    _nm.loadNextWidget();
                }
            };
        } else {
            // New Publishers : Post Launch Approach
            _AdRenderOpts = {
                apiKey: widgetId,
                templateKey: template,
                keyValues: {widget_type: _nm.getWidgetType(template)},
                cssPath: '#' + _nm.AdContainerPrefix + widgetId + ':append',
                userCallbackOnAdLoad: function(status) {
                    _nm.log('New Publisher Widget loaded successfully');
                    _nm.loadNextWidget();
                }
            };

            // TODO : template name validation to be NM01-NM15
        }

        // Widgets requiring client side screen & container size based decisioning for numAds
        if(adData.numAds) {
            _AdRenderOpts.numAds = adData.numAds;
        }

         _nm.insertRenderJs();
    };

    _nm.insertExitWidget = function(widgetId, template, adData) {
        var old_move = 0,
            delayedAdCalled = false,
            widget = document.getElementById(_nm.AdContainerPrefix + widgetId);

        if (!widget) return;

        document.documentElement.onmousemove = function (evt) {
            var new_move = evt.clientY;
            if (new_move < old_move && evt.clientY <= 15) {
                if (delayedAdCalled === false) {
                    
                    // Current Publishers : Backward Compatible Migration Approach
                    if(typeof template === 'undefined') {
                        _AdRenderOpts = {
                            networkKey: '5a86d53377e54819b9d1d7d92f6af887',
                            widgetId: widgetId+'',
                            keyValues: {widget_type: _nm.getWidgetType(adData.template)},
                            cssPath: '#' + _nm.AdContainerPrefix + widgetId + ':append',
                            categories: ['IAB1'],
                            userCallbackOnAdLoad: function(status) {
                                _nm.log('Exit Widget loaded successfully');
                                _nm.addExitWidgetRemoveHandler();
                                _nm.loadNextWidget();
                            }
                        };
                    } else {
                        // New Publishers : Post Launch Approach
                        _AdRenderOpts = {
                            apiKey: widgetId,
                            templateKey: template,
                            keyValues: {widget_type: _nm.getWidgetType(template)},
                            cssPath: '#' + _nm.AdContainerPrefix + widgetId + ':append',
                            userCallbackOnAdLoad: function(status) {
                                _nm.log('New Publisher Exit loaded successfully');
                                _nm.addExitWidgetRemoveHandler();
                                _nm.loadNextWidget();
                            }
                        };

                        // TODO : template name validation to be NM01-NM15
                    }

                    // Widgets requiring client side screen & container size based decisioning for numAds
                    if(adData.numAds) {
                        _AdRenderOpts.numAds = adData.numAds;
                    }

                     _nm.insertRenderJs();

                    delayedAdCalled = true
                }
            }
            old_move = new_move;
        };

        // Since Exit widget is delayed, continue the serial chain of widgets
        _nm.loadNextWidget();
    };

    _nm.addExitWidgetRemoveHandler = function() {
        document.querySelector('#exitContainer .close').onclick = function() {
            document.querySelector('#exitContainer').style.display = 'none';
        };

        document.querySelector('#exitContainer').onclick = function (evt) {
            if (!evt.target.hasAttribute('href')) {
                document.querySelector('#exitContainer').style.display = 'none';
            }
        };
    };

    _nm.insertRenderJs = function() {
        var antag = document.createElement('script');
        antag.async = true;
        antag.type = 'text/javascript';
        antag.src ='http://s.newsmaxfeednetwork.com/static/js/render.v1.js?clear';

        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(antag, node);

        _nm.log('RenderJS invoked');
    }

    _nm.getStandardAdData = function(widgetId, template) {
        var numAds = 0,
            template = template,
            containerWidth = null,
            screenWidth = window.innerWidth;

        var widgetContainer = document.getElementById('NmWg' + widgetId);
        if(!widgetContainer) {
            _nm.log('Widget Container DIV with ID NmWg'+widgetId+' not found on the page');
            return null;
        }

        var migrationWidgets = {
            standardImage: [
                3081,3082,3083,3667,4355,3944,4074,3726,4150,4446,212,3767,4038,4031,4301,768,3938,3683,4353,3613,370,4195,811,3983,4032,4217,259,4097,4456,4033,4090,4182,3220,3788,3626,4349,3685,3866,3740,3330,4414,4212,3703,4332,4317,3737,3496,4073,3686,4175,3819,3818,3536,4046,4215,3783,3707,3690,4199,4138,4141,4210,4286,4308,4307,4178,3658,3659,3290,3291,4048,745,803,841,3090,1035,561,4017,10,2,1,3292,3293,3520,3628,4070,3975,4442,4057,4155,3633,3952,4075,4088,3774,4152,3934,4279,3881,3742,3745,961,4221,4357,3935,3684,4176,3657,4128,4039,3583,4315,4453,3991,3704,4209,4179,4219,4440
            ],
            standardImage2Columns: [
                281,4384,1038,512,251,4345,318,120,933,692,4457,746,738,398,4352,4460,4339,4058,697,157,790,760,4310,995,3192,323,4239,3577,3069,3231,1054,3162,3142,3219,570,871
            ],
            sidebarThumbnails: [
                3513,3491,3464,789,3535,567,1024,661,4409,4391,4390,4427,4395,4425
            ], // Fake thumbnails2Columns widget id for testing only (4567)
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
            ],
            standardText: [
                3622,3799,483,3247,276,4107,15,3798,4109,466,1055,3191,3653,4133,137,3549,3706,3175,3621,3969,4115,4116,4114,3423,3424,3576,3216,230,427,8,3212,5,7,4432,3,560,558,556,557,559,516,4051,4049,4480,4269,253,192,4476,179,4467,3892,3888,791
            ],
            standardText2Columns: [
                4386
            ],
            sidebar: [
                3608,243,3492,3493,246,3645,3056,1039,3996,3144,3385,3241,3912,4366,3769,3960,3104,3200,4323,4324,3236,3606,217
            ],
            sidebar2Columns: [
                338,3734,3711,597,3145,703,3644,3618,3671,285,633,3589,3768,4010,3795,1018,1021,4092,4009,4151,3766,4435,4434,4015,4105,3346,3676,4013,1037,1036,1041,1047,1048,904,4372,3468,4007,4047,884,785,3794,797,280,3457,122,757,4003,3687,4459,630,3079,4002,4096,845,3842,3784,3554,3673,117,3661,3854,3846,3850,1015,3187,3217,90,672,3617,4218,4110,3868,742,3135,3948,3865,4369,3821,3762,3761,782,931,3956,3955,4223,916,868,686,4418,3852,3822,932,3309,3177,4318,4287,4368,3863,4014,3936,4394,881,4416,4111,3951,4204,3201,3937,4333,4377,3812,4184,4164,596,3105,3765,4080,3824,3998,3728,4189,4429,4123,4428,4428,677,3792,3965,4194,3848,4412,870,893,4069,1020,4294,3810,3237,3933,4120,978,4136,3947,3586,3953,3845,3838,4132,3860,4422,3587,4019,3840,4065,4350,3764,4396,4371,3141,3062,3858,4433,3857,4430,3835,3662,3959,3954,3763,4322,4335,4383,4426,4477,4482,4468,4464,4036,368,859,4475,4492,4462,4474,568,4489,4495,4481,4487,4490,4493,4491,4470,956,591,4496,4507,4505,4506,4501,4500,4488,4504,4502,4503,4471,3887,4494,787,4485,4486,3063,967
            ],
            sidebarText: [
                4008,4006,4005,4004,293,385,290,3957,3562,3993,3738,4060,4363,17,3174,621,445,842,844,209,4102,3609,3522,3568,3669,3302,59,131,3365,3548,705,3927,1008,3634,3803,781,3672,55,303,3601,49,969,299,3806,3530,310,3127,490,3394,241,3489,3488,3490,461,317,3691,112,495,185,943,37,3486,3945,206,4185,823,481,66,3319,429,944,3790,3793,3304,3660,926,213,167,3058,180,3588,406,353,474,934,4162,4299,391,3134,289,273,3756,132,262,75,144,3682,373,4389,475,3143,509,510,468,175,16,4130,3371,194,412,3462,3698,3862,3171,114,4283,325,3864,342,953,4437,3250,203,3599,452,272,399,479,3789,508,4421,3203,3332,58,3052,386,4106,3345,3347,3348,3101,294,3149,3675,324,484,3699,440,446,3388,134,3196,3437,4064,458,39,168,244,485,4180,32,3666,3071,4295,4098,411,4303,886,4445,163,1040,784,3503,891,431,3700,390,389,3552,3796,3543,3352,161,957,409,497,777,182,88,1046,3433,3620,778,321,937,43,3755,23,178,22,4021,4119,186,4313,143,3195,3555,378,264,3995,367,3442,279,416,3523,473,459,3629,158,34,155,101,4347,4388,3421,3420,4139,3485,3694,3614,4020,3443,61,4392,3494,92,176,33,3573,491,3096,266,477,3526,3527,96,792,469,329,27,116,202,4147,133,127,366,121,45,344,1034,1033,51,1000,74,3843,546,482,816,77,525,843,288,118,4454,298,4131,235,57,927,42,173,4113,3674,989,207,3855,3981,3524,3350,3847,3851,3582,3581,3103,4378,4461,840,476,3814,3093,3184,4338,3170,3221,3395,3709,3612,3119,571,3379,3183,3182,4207,3710,3787,3786,4104,4393,4297,3697,3926,4348,3495,3211,652,3242,3080,438,3797,260,4361,4025,3504,4450,4451,3514,3623,4415,3639,3649,48,3351,3867,4211,3483,936,935,4381,1011,3359,654,4192,30,765,3925,867,4362,3378,4365,3154,4367,3474,3560,3054,4027,535,4040,872,4148,3670,3533,3055,3696,4137,4129,4101,4146,4052,3853,939,3095,1029,1051,3176,3193,3053,3167,862,3809,4016,3245,3656,3770,4321,4320,3148,3422,3426,3430,437,326,327,3168,4205,3646,3153,743,3150,3111,3604,4134,3924,4086,3759,3735,4417,3869,3923,3417,4100,3206,3572,3214,863,794,4291,3475,624,3811,3230,4026,4145,3190,3558,4045,3113,3780,3498,4099,3202,3213,3550,4018,3505,3315,4142,4213,4296,4458,4448,3316,3982,564,3284,710,3413,3452,3102,4081,3210,4024,3929,3118,4436,3739,3240,653,578,4337,3303,3579,4183,4023,4316,3736,4334,3976,4364,761,3381,4056,727,659,4121,4329,4359,146,3234,3791,3695,3460,3057,866,3964,3989,4022,3849,3440,3538,4160,3133,3334,4413,4193,873,907,3349,4050,3553,4236,3510,3509,767,4087,3950,3484,3340,4292,3360,4379,547,3754,4312,3312,188,4181,3499,4298,3647,3808,4190,3743,3746,3781,3445,3185,3204,3528,3283,938,763,4344,854,3456,4140,4144,4135,3753,3508,3507,4358,3186,3940,3752,3618,3642,4042,3415,3077,3551,3844,3274,3640,3502,3529,711,3380,3839,3561,3516,3744,4336,3215,3771,3693,3801,3861,4165,3627,4423,147,4406,3472,3521,3540,3471,3841,3534,864,3469,4403,970,3525,3741,4400,3580,764,3343,3518,3605,3958,3913,436,3574,3270,444,3078,4206,3994,3859,4411,3856,865,3990,3233,708,707,706,3702,3607,3438,3439,3441,3837,3124,258,4340,3205,190,4484
            ]
        };

        if(template === 'NM01' || migrationWidgets.standardImage.indexOf(widgetId) >= 0) { // Standard Image
            if(screenWidth <= 480) {
                numAds = 4;
            } else if(screenWidth <= 720) {
                numAds = 6;
            } else if(screenWidth > 720) {
                numAds = (containerWidth <= 720) ? 6 : 6;
            }

            template = 'NM01';
        } else if(template === 'NM02' || migrationWidgets.standardImage2Columns.indexOf(widgetId) >= 0) { // Standard Image - Mobile 2 columns
            if(screenWidth <= 480) {
                numAds = 8;
            } else if(screenWidth <= 720) {
                numAds = 6;
            } else if(screenWidth > 720) {
                numAds = (containerWidth <= 720) ? 8 : 10;
            }

            template = 'NM02';
        } else if(template === 'NM08' || migrationWidgets.sidebarThumbnails.indexOf(widgetId) >= 0) { // Sidebar Thumbnails
            if(screenWidth <= 480) {
                numAds = 5;
            } else {
                numAds = 8;
            }

            template = 'NM08';
        } else if(template === 'NM09' || migrationWidgets.thumbnails2Columns.indexOf(widgetId) >= 0) { // Thumbnails 2 Columns
            if(screenWidth <= 480) {
                numAds = 5;
            } else {
                numAds = 10;
            }

            template = 'NM09';
        } else if(template === 'NM13' || migrationWidgets.footer.indexOf(widgetId) >= 0) { // Footer
            if(screenWidth <= 480) {
                numAds = 1;
            } else if(screenWidth <= 720) {
                numAds = 2;
            } else if(screenWidth > 720) {
                numAds = 4;
            }

            template = 'NM13';
        } else if(template === 'NM14' || migrationWidgets.leaderboard.indexOf(widgetId) >= 0) { // Leaderboard
            numAds = 4;

            template = 'NM14';
        } else if(template === 'NM15' || migrationWidgets.exit.indexOf(widgetId) >= 0) { // Exit
            if(screenWidth <= 480) {
                numAds = 4;
            } else {
                numAds = 8;
            }

            template = 'NM15';
        } else if(template === 'NM03' || migrationWidgets.standardText.indexOf(widgetId) >= 0) { // Standard Text
            numAds = 10;
            template = 'NM03';
        } else if(template === 'NM04' || migrationWidgets.standardText2Columns.indexOf(widgetId) >= 0) { // Standard Text - 2 Columns
            numAds = 10;
            template = 'NM04';
        } else if(template === 'NM05' || migrationWidgets.sidebar.indexOf(widgetId) >= 0) { // Standard Text - 2 Columns
            if(screenWidth <= 480) {
                numAds = 4;
            } else {
                numAds = 8;
            }

            template = 'NM05';
        } else if(template === 'NM06' || migrationWidgets.sidebar2Columns.indexOf(widgetId) >= 0) { // Sidebar - 2 Columns
            numAds = 10;
            template = 'NM06';
        } else if(template === 'NM07' || migrationWidgets.sidebarText.indexOf(widgetId) >= 0) { // Sidebar Text
            numAds = 10;
            template = 'NM07';
        }

        return {numAds: numAds, template: template};
    };

    _nm.getInstreamData = function(widgetId, template) {
        var template = template,
            zoneCount = 0;

        var migrationWidgets = {
            instreamNative: [
                4285,4479,4465,4473,4472,4469
            ], // Fake instreamNativeSingle widget id for testing only (5678)
            instreamNativeSingle: [
                5678
            ],
            instreamText: [
                4071,3668,3377,3968,4356,3258,3306,4093,3265,4420,3324,3444,4063,4300,3386,4302,4387,4325,3434,4234,4267,4118,4061,4447,3487,4094,3279,3463,4455,3264,3376,3266,3920,4343,4143,3344,3624,4463,3225,3275,3387,4149,3308,3418,3282,4112,4326,3310,3322,3820,4122,3222,3320,4159,4370,3311,3281,4309,4410,3470,4402,4398,4044,4346,4419,3267,4125,3354,3323
            ]
        };

        if(template === 'NM10' || migrationWidgets.instreamNative.indexOf(widgetId) >= 0) { // Instream Native
            zoneCount = 2;
            template = 'NM10';
        } else if(template === 'NM11' || migrationWidgets.instreamNativeSingle.indexOf(widgetId) >= 0) { // Instream Native Single
            zoneCount = 1;
            template = 'NM11';
        } else if(template === 'NM12' || migrationWidgets.instreamText.indexOf(widgetId) >= 0) { // Instream Native Text
            zoneCount = 2;
            template = 'NM12';
        }

        return {zoneCount: zoneCount, template: template};
    };

    _nm.getWidgetType = function(template) {
        var templateCategories = {
            instreamAd: ['NM10', 'NM11', 'NM12'], // Instream Native / Instream Native Single // Instream Native Text
            image: ['NM01', 'NM02'],
            textFeed: ['NM03', 'NM04', 'NM05', 'NM06', 'NM07', 'NM14'], // Standard Text / Standard Text - 2 Columns / Sidebar / Sidebar Text / Leaderboard
            contentFeed: ['NM06', 'NM08'], // Sidebar - 2 Columns / Sidebar - Thumbnails
            exit: ['NM15'] // Exit
        },
        widgetType = '';

        if(templateCategories.instreamAd.indexOf(template) >= 0) {
            widgetType = 'article_instream';
        } else if(templateCategories.image.indexOf(template) >= 0) {
            widgetType = 'image';
        } else if(templateCategories.textFeed.indexOf(template) >= 0) {
            widgetType = 'text_feed';
        } else if(templateCategories.contentFeed.indexOf(template) >= 0) {
            widgetType = 'content_feed';
        } else if(templateCategories.exit.indexOf(template) >= 0) {
            widgetType = 'exit';
        }

        return widgetType;
    };

    _nm.getParameterByName =  function(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    _nm.log = function(msg, value) {
        if(typeof console !== 'undefined') {
            if(!value) {
                console.log(msg);
            } else {
                console.log(msg, value);
            }
        }
    };

    // Comscore Pixel
    window._comscore = window._comscore || [];
    window._comscore.push({ c1: "7", c2: "9248945", c3: "100000" });
    (function () {
        var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
        s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
        el.parentNode.insertBefore(s, el);
    })();

    if(_nm.getParameterByName('newsmax_preview')) {
        _nm.debug = true;
    }

    _nm.log('Connect V5 version : '+ _nm.version + ' loaded');

})();
