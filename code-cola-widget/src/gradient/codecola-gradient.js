/*
Copyright (c) 2013, ZHOUQICF.COM. All rights reserved.
Code licensed under the MIT License:
version: 1.0.0
*/
/**
 * a gradient control for css3 property
 * @module codecola-gradient
 */
YUI().add('codecola-gradient', function(Y) {
    /**
     * a gradient control for css3 property
     * @param config {Object} Object literal specifying codecolaGradient configuration properties.
     * @class codecolaGradient
     * @constructor
     * @namespace Y
     * @extends Widget
     * @requires codecola-color node widget ua codecola-gradient-css
     */
    Y.codecolaGradient = Y.Base.create('codecola-gradient', Y.Widget, [], {
        initializer: function() {
        },

        renderUI: function() {
            var random = (new Date).getTime(),
                ids = {
                    panel: "codecola-gradient-panel-" + random,
                    panelWrap: "codecola-gradient-panel-wrap-" + random,
                    stops: "codecola-gradient-stops-" + random,
                    color: "codecola-gradient-color-" + random,
                    location: "codecola-gradient-location-" + random,
                    button: "codecola-gradient-stop-delete-button-" + random,
                    orientation: "codecola-gradient-orientation-" + random,
                    stopDetail: "codecola-gradient-stop-detail-" + random
                };

            var html = '<div class="codecola-gradient-wrap">'+
                        '   <div class="codecola-gradient-panel-wrap" id="' + ids.panelWrap + '">'+
                        '       <div class="codecola-gradient-panel" id="' + ids.panel + '"></div>'+
                        '   </div>' +
                        '   <div class="codecola-gradient-stops" id="' + ids.stops + '"></div>' +
                        '   <div class="codecola-gradient-orientation-wrap">' +
                        '       <label class="codecola-gradient-label" for="' + ids.orientation + '">Degree:</label>' +
                        '	    <div class="codecola-gradient-orientation" id="' + ids.orientation + '"></div>' +
                        '   </div>' +
                        '   <div class="codecola-gradient-stop-detail" id="' + ids.stopDetail + '">' +
                        '	    <div class="codecola-gradient-color-wrap">' +
                        '		    <label class="codecola-gradient-label">Color:</label>' +
                        '		    <div class="codecola-gradient-color" id="' + ids.color + '"></div>' +
                        '	    </div>' +
                        '	    <div class="codecola-gradient-location-wrap">' +
                        '		    <label for="' + ids.location + '" class="codecola-gradient-label">Location:</label>' +
                        '		    <input type="number" class="codecola-gradient-location" id="' + ids.location + '" step="1" min="0" max="100"> %' +
                        '	    </div>' +
                        '	    <div class="codecola-gradient-stop-delete">' +
                        '		    <button class="codecola-gradient-stop-delete-button" id="' + ids.button + '">delete</button>' +
                        '	    </div>' +
                        '   </div>'+
                        '</div>';

            //create nodes
            var that = this;
            Y.one(that.get('wrap')).append(Y.Node.create(html));

            that.vars = {
                panel: Y.one('#'+ids.panel),
                panelWrap: Y.one('#'+ids.panelWrap),
                stops: Y.one('#'+ids.stops),
                color: Y.one('#'+ids.color),
                location: Y.one('#'+ids.location),
                button: Y.one('#'+ids.button),
                orientation: Y.one('#'+ids.orientation),
                stopDetail: Y.one('#'+ids.stopDetail),
                id: 0,
                colorControl: null,
                degreeControl: null,
                currentStop: null,
                disable: false,
                rule: {
                    type: "",
                    orientation: "",
                    stops: []
                }
            };

            that.vars.panelWrap.setStyle("width", that.get('panelWidth'));
            that.vars.stops.setStyle("width", that.get('panelWidth'));

            that.vars.degreeControl = new Y.codecolaDegree({
                wrap: '#'+ids.orientation,
                onChange: function(degree) {
                    if (that.vars.disable) {
                        return;
                    }
                    that.vars.rule.orientation = degree;
                    that._initPanel()._fireCallback();
                }
            });
            that.vars.degreeControl.render();
            that.vars.colorControl = new Y.codecolaColor({
                wrap: '#'+ids.color,
                onChange: function(color) {
                    var cStop = that.vars.currentStop;
                    if (!cStop || that.vars.disable) {
                        return;
                    }
                    that.vars.rule.stops[cStop.getAttribute("index")].color = color;
                    cStop.setStyle("backgroundColor", color);
                    that._initPanel()._fireCallback();
                }
            });
            that.vars.colorControl.render();
            return that;
        },

        bindUI: function() {
            var that = this,
                vars = that.vars,
                rule = vars.rule;
            vars.stops.on("click", function(e) {
                if (e.target.get('nodeName') == "I" || vars.disable) {
                    return;
                }
                var s = {
                    "color": vars.colorControl.getColor(),
                    "position": that._getFloatLeft(e.clientX - vars.panel.getX() - 5)
                };
                that.vars.rule.stops.push(s);
                that._addStops([s], that.vars.rule.stops.length - 1)._initPanel()._fireCallback();
            });
            vars.location.on("change", function(e) {
                var cStop = vars.currentStop;
                if (!cStop) {
                    return;
                }
                var left = this.get('value');
                left = that._percentToFloat(left + "%");
                rule.stops[cStop.getAttribute("index")].position = left;
                cStop.setStyle("left", that._getPixLeft(left));
                that._initPanel()._fireCallback();
            });
            vars.button.on("click", function(e) {
                var cStop = vars.currentStop;
                //that.vars.stops.getElementsByTagName("i").length <= 2
                if (!cStop) {
                    return;
                }
                delete rule.stops[cStop.getAttribute("index")];
                vars.stops.removeChild(cStop);
                vars.colorControl.disable();
                vars.degreeControl.disable();
                vars.location.set('disabled', true);
                vars.button.set('disabled', true);
                that._initPanel()._fireCallback();
            });

            return that;
        },

        syncUI: function() {
            this._initRule()._initControls();
            return this;
        },

        renderer: function() {
            this.renderUI().bindUI().syncUI().get('onInit')();
            return this;
        },

        _transformDegree: function(orientation){
            var rule = this.vars.rule;
            if(orientation.indexOf('%') !== -1){
                orientation = orientation.replace(/%/g, '').split(",");
                orientation[1] = orientation[1].split(' ');
                orientation[2] = orientation[2].split(' ');
                rule.orientation = - Math.ceil(Math.atan2(orientation[2][1] - orientation[1][1], orientation[2][0] - orientation[1][0]) * (360 / (2 * Math.PI)));
            }else{
                switch(orientation){
                    case 'left':
                        rule.orientation = '0';
                        break;
                    case 'top':
                        rule.orientation = '-90';
                        break;
                    case 'bottom':
                        rule.orientation = '90';
                        break;
                    case 'right':
                        rule.orientation = '180';
                        break;
                    case 'top left':
                        rule.orientation = '-45';
                        break;
                    case 'left top':
                        rule.orientation = '-45';
                        break;
                    case 'top right':
                        rule.orientation = '-135';
                        break;
                    case 'right top':
                        rule.orientation = '-135';
                        break;
                    case 'bottom left':
                        rule.orientation = '45';
                        break;
                    case 'left bottom':
                        rule.orientation = '45';
                        break;
                    case 'bottom right':
                        rule.orientation = '135';
                        break;
                    case 'right bottom':
                        rule.orientation = '135';
                        break;
                    default:
                        if(orientation.indexOf('deg') !== -1){
                            rule.orientation = orientation.replace('deg', '');
                        }else{
                            rule.orientation = '0'
                        }
                        break;
                }
            }
        },

        /**
         * update the this.vars.rule object
         * @method _initRule
         * @private
         * @chainable
         */
        _initRule: function(){
            var
            gradient = this.get('gradient'),
            rule = this.vars.rule,
            stops = [];

            if (/-webkit-gradient/.test(gradient)) {
                gradient = gradient.replace(/\s*,\s*/g, ",").replace("-webkit-gradient(", "").replace(/\)$/, "").split(/,(?=[fct])/);
                var part1 = gradient[0];
                this._transformDegree(part1);

                for (var i = 1, j = gradient.length; i < j; i++) {
                    var c = gradient[i];    
                    if (/color/.test(c)) {
                        c = c.replace("color-stop(", "").replace(/\)$/, "").split(/,(?=r)/);
                    } else if (/from/.test(c)) {
                        c = [0, c.replace(/from\(|/, "").replace(/\)$/, "")];
                    } else {
                        c = [1, c.replace(/to\(/, "").replace(/\)$/, "")];
                    }
                    stops.push({
                        "position": c[0],
                        "color": c[1]
                    });
                }
            } else {
                gradient = gradient.replace(/\s*,\s*/g, ",").replace(/-(moz|o|ms|webkit)-linear-gradient\(/, "").replace(/\)$/, "").split(/,(?=[^\d])/);
                this._transformDegree(gradient[0]);

                for (var i = 1, j = gradient.length; i < j; i++) {
                    var c = gradient[i].split(" ");
                    stops.push({
                        "position": typeof c[1] === 'undefined'?(i === 1?0:1):this._percentToFloat(c[1]),
                        "color": c[0]
                    });
                }
            }
            rule.stops = stops;
            return this;
        },

        /**
         * @method _initOrientation
         * @private
         * @chainable
         */
        _initOrientation: function() {
            this.vars.degreeControl.set('degree', this.vars.rule.orientation);
            this.vars.degreeControl.syncUI();
            return this;
        },

        /**
         * @method _initPanel
         * @private
         * @chainable
         */
        _initPanel: function() {
            this.vars.panel.setStyle("backgroundImage", this.getGradient(false, true));
            return this;
        },
        /**
         * @method _initStops
         * @private
         * @chainable
         */
        _initStops: function(){
            this.vars.stops.empty();
            this._addStops(this.vars.rule.stops);
            return this;
        },

        /**
         * init all controls
         * @method _initControls
         * @private
         * @chainable
         */
        _initControls: function(){
            this._initStops()._initOrientation()._initPanel();
            return this;
        },

        /**
         * update the attribute 'gradient', init all the controls, fire the onChange event
         * @method setGradient
         * @param {Object} param.gradient for update the attribute 'gradient'
         * @chainable
         */
        setGradient: function(param) {
            this.set('gradient', param.gradient);
            this.syncUI()._fireCallback();
            return this;
        },

        /**
         * add stops
         * @method _addStops
         * @param {Array}
         * @private
         * @chainable
         */
        _addStops: function(stops, id) {
            var that = this, i;
            Y.each(stops, function(s, index) {
                var p = that._getPixLeft(s.position);
                index = id?id:index;
                i = Y.Node.create('<i class="codecola-gradient-stop" index="'+index+'"></i>');
                i.setStyles({
                    left: p,
                    backgroundColor: s.color
                });
                that.vars.stops.append(i);
                that._initStopEvent(i, index);
            });
            that._changeCurrentStop(i);
            return that;
        },

        /**
         * bind event to the stop
         * @method _initStopEvent
         * @param {Node} stop
         * @param {Number} id
         * @private
         * @chainable
         */
        _initStopEvent: function(stop, id) {
            var preX, preEventX, drag = false,
                that = this,
                doc = Y.one('html'),
                panelWidth = that.get('panelWidth');
            stop.on("mousedown", function(e) {
                if (that.vars.disable) {
                    return;
                }
                doc.setStyle("webkitUserSelect", "none");
                that._changeCurrentStop(stop);
                drag = true;
                preX = that._getPixLeft(that.vars.rule.stops[id].position, true);
                preEventX = e.pageX;
            });
            doc.on("mouseup", function(e) {
                if (drag || !that.vars.disable) {
                    doc.setStyle("webkitUserSelect", "");
                    drag = false;
                }
            });
            doc.on("mousemove", function(e) {
                if (!drag || that.vars.disable) {
                    return;
                }
                var left = preX + (e.pageX - preEventX);
                if (left < -5 || left > panelWidth - 5) {
                    return;
                }
                stop.setStyle("left", left + "px");
                var floatLeft = that._getFloatLeft(left);
                that.vars.rule.stops[id].position = floatLeft;
                that.vars.location.set('value', that._floatToPercent(floatLeft, true));
                that._initPanel()._fireCallback();
            });
            return that;
        },

        /**
         * activate a stop
         * @method _changeCurrentStop
         * @param {Node}
         * @private
         * @chainable
         */
        _changeCurrentStop: function(stop) {
            var that = this,
                preStop = that.vars.currentStop,
                selectClassName = "codecola-gradient-stop-select",
                cStop = that.vars.rule.stops[stop.getAttribute("index")];
            if (preStop) {
                preStop.removeClass(selectClassName);
            }
            stop.addClass(selectClassName);
            that.vars.currentStop = stop;
            that.vars.colorControl.able();
            that.vars.degreeControl.able();
            that.vars.location.set('disabled', false);
            that.vars.button.set('disabled', false);

            that.vars.colorControl.set('color', cStop.color);
            that.vars.colorControl.syncUI();

            that.vars.location.set('value', that._floatToPercent(cStop.position, true));
            return that;
        },

        /**
         * get the current gradient
         * @method getGradient
         * @param {Boolean} isAll if return all of webkit|moz|o|ms gradient <code>{webkit:xxx, moz:xxx, o:xxx, ms:xxx}</code>
         * @param {Boolean} isPanel if for update panel
         * @return {String|Object}
         */
        getGradient: function(isAll, isPanel) {
            var rule = this.vars.rule,
                tempStops = [].concat(rule.stops),
                stops = "", webkit, moz, o, ms,
                orientation = rule.orientation == 0?0:rule.orientation + "deg";
            if(isPanel){
                orientation = 0;
            }
//            if (rule.orientation == "horizontal" || isPanel) {
//                orientation = {
//                    "webkit": "0% 0%,100% 0%",
//                    "moz": "left"
//                }
//            } else {
//                orientation = {
//                    "webkit": "0% 0%,0% 100%",
//                    "moz": "top"
//                }
//            }

            tempStops.sort(function(a, b) {
                return a.position - b.position;
            });
            for (var i = 0, j = tempStops.length; i < j; i++) {
                var cStop = tempStops[i];
                if (!cStop) {
                    continue;
                }
                var p = cStop.position,
                    c = cStop.color;
                stops += "," + c + " " + this._floatToPercent(p);
            }

            webkit = "-webkit-linear-gradient(" + orientation + stops + ")";
            moz = "-moz-linear-gradient(" + orientation + stops + ")";
            o = "-o-linear-gradient(" + orientation + stops + ")";
            ms = "-ms-linear-gradient(" + orientation + stops + ")";

            if (isAll){
                return {
                    "webkit": webkit,
                    "moz": moz,
                    "o": o,
                    "ms": ms
                }
            } else if (Y.UA.webkit) {
                return webkit;
            } else if (Y.UA.gecko) {
                return moz;
            } else if (Y.UA.opera) {
                return o;
            } else if (Y.UA.ie) {
                return ms;
            }
        },

        /**
         * @method _getFloatLeft
         * @param {Number}
         * @private
         * @return {Number}
         */
        _getFloatLeft: function(leftPix) {
            var floatLeft = ((leftPix + 5) / this.get('panelWidth')).toFixed(2);
            if (floatLeft > 1) {
                return 1;
            }
            if (floatLeft < 0) {
                return 0;
            }
            return floatLeft;
        },

        /**
         * @method _getPixLeft
         * @param {Number} leftFloat
         * @param {Boolean} isNum if return width 'px'
         * @private
         * @return {Number|String}
         */
        _getPixLeft: function(leftFloat, isNum) {
            var panelWidth = this.get('panelWidth'),
                pixLeft = Math.round(leftFloat * panelWidth) - 5;

            if (pixLeft > panelWidth - 5) {
                pixLeft = panelWidth - 5;
            }
            if (pixLeft < -5) {
                pixLeft = -5;
            }
            if (isNum) {
                return pixLeft;
            } else {
                return pixLeft + "px";
            }
        },

        /**
         * transform percent number to float
         * @method _percentToFloat
         * @param {String}
         * @private
         * @return {Number}
         */
        _percentToFloat: function(percent) {
            return parseInt(percent.replace("%", ""), 10) / 100;
        },

        /**
         * transform float number to percent
         * @method _floatToPercent
         * @param {Number} float
         * @param {Boolean} isNum if return width '%'
         * @private
         * @return {String}
         */
        _floatToPercent: function(float, isNum) {
            var percent = Math.round(float * 100);
            if (isNum) {
                return percent;
            }
            return percent + "%";
        },

        /**
         * fire the onChange event
         * @method _fireCallback
         * @private
         * @chainable
         */
        _fireCallback: function(){
            this.get('onChange')(this.getGradient(this.get('isAll')));
            return this;
        },

        /**
         * disable all controls
         * @method disable
         * @chainable
         */
        disable: function() {
            var vars = this.vars;
            vars.colorControl.disable();
            vars.degreeControl.disable();
            vars.location.set('disabled', true);
            vars.button.set('disabled', true);
            vars.disable = true;
            return this;
        },

        /**
         * able all controls
         * @method able
         * @chainable
         */
        able: function() {
            var vars = this.vars;
            vars.colorControl.able();
            vars.degreeControl.able();
            vars.location.set('disabled', false);
            vars.button.set('disabled', false);
            vars.disable = false;
            return this;
        }
    }, {
        ATTRS:{
            /**
             * @attribute wrap
             * @type String
             * @default 'body'
             * @description a css selector for <code>Y.one()</code>,controls will insert into the wrap
             */
            wrap: {
                value: 'body',
                validator: Y.Lang.isString
            },
            /**
             * @attribute gradient
             * @type String
             * @default "-webkit-gradient(linear, 0% 0%, 0% 100%, from(#000), to(#fff))" or "-moz-linear-gradient(top , #000 0%, #fff 100%)" or "-o-linear-gradient(top , #000 0%, #fff 100%)" or "-ms-linear-gradient(top , #000 0%, #fff 100%)"
             * @description gradient for init
             */
            gradient: {
                value: "-webkit-linear-gradient(left , #000 0%, #fff 100%)",
                setter: function(v){
                    if(!v){
                        return "-webkit-linear-gradient(left , #000 0%, #fff 100%)"
                    }
                }
            },
            /**
             * @attribute panelWidth
             * @type Number
             * @default 200
             * @description the control's width
             */
            panelWidth: {
                value: 200,
                validator: Y.Lang.isNumber
            },
            /**
             * @attribute isAll
             * @type Boolean
             * @default false
             * @description if the param include all private property when run the callback
             */
            isAll: {
                value: false,
                validator: Y.Lang.isBoolean
            },
            /**
             * @attribute onInit
             * @type Function
             * @default function(){}
             * @description callback when widget init
             */
            onInit: {
                value: function() {
                },
                validator: Y.Lang.isFunction
            },
            /**
             * @attribute onChange
             * @type Function
             * @default function(){}
             * @description callback when gradient change
             */
            onChange: {
                value: function() {
                },
                validator: Y.Lang.isFunction
            }
        }
    });
}, '1.0.0', {requires:['codecola-color', 'codecola-degree', 'node', 'widget-base', 'ua', 'codecola-gradient-css']});