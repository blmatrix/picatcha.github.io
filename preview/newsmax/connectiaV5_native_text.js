(function () {

    var root = this;

    var _nm = {};
    _nm.ArticleSelector = '';
    _nm.ArticleAdContainer = 'NmWgInstream';

    root.NM = _nm;

    if (!Object.keys) Object.keys = function (o) {
        if (o !== Object(o))
            throw new TypeError('Object.keys called on a non-object');
        var k = [], p;
        for (p in o) if (Object.prototype.hasOwnProperty.call(o, p)) k.push(p);
        return k;
    };

    // start instream : s1.0
    _nm.init = function (param) {
        var key = Object.keys(param)[0];
        var val = param[key]

        if (param.ArticleSelector) {
            _nm.ArticleSelector = param.ArticleSelector;
            if (_nm.ArticleSelector) {
                _nm.loadInArticleWidget(val);
            }
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
        module.PluginsFactory = function () {

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

    // Make adserver request
    _AdsNativeOpts = {
        blockAdLoad: true
    };

    // s4.0
    _nm.loadInArticleWidget = function (id) {


        var zoneCount = 3;

        // Plugins
        var plugins = new _nm.inArticleWidget.PluginsFactory();

        // Append
        var widget = _nm.inArticleWidget.init(_nm.ArticleSelector)

        for (var i = 0; i < zoneCount; i++) {
            widget.addSlot(_nm.ArticleAdContainer + id + (i + 1));
        }

        widget.addRule('Paragraph', { appendSlotEvery: 3 }, plugins.createRule('Paragraph'));
        widget.addRule('Div', { appendSlotEvery: 3 }, plugins.createRule('Div'));
        widget.addRule('Break', { appendSlotEvery: 3 }, plugins.createRule('Break'));

        widget.append();

        // var antag = document.createElement('script');
        //     // antag.async = true;
        //     antag.type = 'text/javascript';
        //     antag.src ='http://static.adsnative.com/static/js/render.v1.src.js';
        //     var node = document.getElementsByTagName('script')[0];
        //     node.parentNode.insertBefore(antag, node);

        var instream_placement = new AdsNative('PDrlWfG46MxggK80h-wSZxBU4sprxhOq7pkNn_Ed', []);
        instream_placement.fetchAd(function(status){
            if(status) {
                var didDisplay = instream_placement.displayAd(_nm.ArticleAdContainer + id + "1");
                if(!didDisplay)
                    console.log('Ad could not be displayed. Most likely due to invalid element ID or double rendering of ad.');
                else 
                    console.log('Ad not displayed');
            } else {
                console.log('no campaign found');
            }
        });

        // var instream_placement2 = new AdsNative('V4iMbIJBp90urCcKW6tJ-1P912NtUNQ-aNtoB7FZ', []);
        // instream_placement2.fetchAd(function(status){
        //     if(status) {
        //         var didDisplay = instream_placement2.displayAd(_nm.ArticleAdContainer + id + "2");
        //         if(!didDisplay)
        //             console.log('Ad could not be displayed. Most likely due to invalid element ID or double rendering of ad.');
        //         else 
        //             console.log('Ad not displayed');
        //     } else {
        //         console.log('no campaign found');
        //     }
        // });

        // var instream_placement3 = new AdsNative('V4iMbIJBp90urCcKW6tJ-1P912NtUNQ-aNtoB7FZ', []);
        // instream_placement3.fetchAd(function(status){
        //     if(status) {
        //         var didDisplay = instream_placement3.displayAd(_nm.ArticleAdContainer + id + "3");
        //         if(!didDisplay)
        //             console.log('Ad could not be displayed. Most likely due to invalid element ID or double rendering of ad.');
        //         else 
        //             console.log('Ad not displayed');
        //     } else {
        //         console.log('no campaign found');
        //     }
        // });
    }
})();
