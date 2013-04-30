/*
Copyright (c) 2013, ZHOUQICF.COM. All rights reserved.
Code licensed under the MIT License:
version: 1.0.0
*/
/**
 * a degree control for css3 property
 * @module codecola-degree
 */
YUI().add('codecola-degree', function(Y) {
    /**
     * a degree control for css3 property
     * @param config {Object} Object literal specifying codecolaDegree configuration properties.
     * @class codecolaDegree
     * @constructor
     * @namespace Y
     * @extends Widget
     * @requires node widget codecola-degree-css
     */
    Y.codecolaDegree = Y.Base.create('codecola-degree', Y.Widget, [], {
        initializer: function() {
        },

        renderUI: function() {
            var that = this;
            that.vars = {
                degreeWrap : Y.Node.create('<div class="codecola-degree-wrap"></div>'),
                degree : Y.Node.create('<div class="codecola-degree"></div>'),
                line : Y.Node.create('<i class="codecola-degree-line"></i>'),
                dot : Y.Node.create('<b class="codecola-degree-dot"></b>'),
                label : Y.Node.create('<label class="codecola-degree-label"></label>'),
                input : Y.Node.create('<input type="number" class="codecola-degree-input" step="1" max="180" min="-180">'),
                disable: false
            };
            var val = that.vars,
                degreeWrap = val.degreeWrap,
                degree = val.degree,
                line = val.line,
                dot = val.dot,
                label = val.label,
                input = val.input;

            degree.append(line).append(dot);
            label.append(input);
            degreeWrap.append(degree).append(label);
            Y.one(that.get('wrap')).append(degreeWrap);

            return that;
        },

        bindUI: function() {
            var that = this,
                drag = false,
                vars = that.vars,
                doc = Y.one('html');
            vars.degree.on('click', function(e) {
                if(vars.disable){
                    return;
                }
                that.setDegree({
                    degree: that._calculateDegree(e)
                });
            });
            vars.degree.on('mousedown', function(e) {
                if(vars.disable){
                    return;
                }
                drag = true;
                doc.setStyle('webkitUserSelect', 'none');
            });
            doc.on('mouseup', function() {
                if(vars.disable){
                    return;
                }
                drag = false;
                doc.setStyle('webkitUserSelect', '');
            });
            doc.on('mousemove', function(e) {
                if (!drag || vars.disable) {
                    return;
                }
                that.setDegree({
                    degree: that._calculateDegree(e)
                });
            });
            vars.input.on('change', function() {
                that.setDegree({
                    degree: this.get('value')
                });
            });
            return that;
        },

        syncUI: function() {
            this._initControls();
            return this;
        },

        renderer: function(){
            this.renderUI().bindUI().syncUI().get('onInit')();
            return this;
        },

        /**
         * Calculate degree
         * @method _calculateDegree
         * @private
         * @param {Event}
         * @return {Number}
         */
        _calculateDegree: function(e) {
            var dot = this.vars.dot,
                dotXY = dot.getXY(),
                offset = {};

            offset.x = e.clientX + window.pageXOffset - dotXY[0];
            offset.y = e.clientY + window.pageYOffset - dotXY[1];
            return - Math.ceil(Math.atan2(offset.y, offset.x) * (360 / (2 * Math.PI)));
        },

        /**
         * init all controls
         * @method _initControls
         * @private
         * @chainable
         */
        _initControls: function() {
            var that = this,
                degree = that.get('degree'),
                value = 'rotate(' + (-degree) + 'deg)';

            that.vars.line.setStyles({
                'MozTransform': value,
                'webkitTransform': value,
                'OTransform': value,
                'transform': value
            });

            that.vars.input.set('value', degree);
            return that;
        },

        /**
         * update the attribute 'degree', init all the controls, fire the onChange event
         * @method setDegree
         * @param {Object} param.degree for update the attribute 'degree'
         * @chainable
         */
        setDegree: function(param) {
            this.set('degree', param.degree)._initControls()._fireCallback();
            return this;
        },

        /**
         * return the current degree
         * @method getDegree
         * @return {Number}
         */
        getDegree: function() {
            return this.get('degree');
        },

        /**
         * reset all, degree is 0, will not run onChange
         * @method reset
         * @chainable
         */
        reset: function(param) {
            this.set('degree', 0)._initControls();
            return this;
        },

        /**
         * disable all controls
         * @method disable
         * @chainable
         */
        disable: function() {
            var vars = this.vars;
            vars.input.set('disable', true);
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
            vars.input.set('disable', false);
            vars.disable = false;
            return this;
        },


        /**
         * fire the onChange event
         * @method _fireCallback
         * @private
         * @chainable
         */
        _fireCallback: function() {
            this.get('onChange')(this.get('degree'));
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
             * @attribute degree
             * @type Number
             * @default 0
             * @description degree for init, degree is a number from -180 to 180
             */
            degree: {
                value: 0,
                validator: function(v){
                    if(/^-?1[0-7]\d$|^-?180$|^-?[1-9]\d$|^\d$|^-[1-9]$/.test(v)){
                        return true;
                    }else{
                        Y.log('"' + v + '" is not a valid degree!');
                        return false;
                    }
                }
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
             * @description callback when degree change
             */
            onChange: {
                value: function() {
                },
                validator: Y.Lang.isFunction
            }
        }
    });
}, '1.0.0', {requires:['node', 'widget-base','codecola-degree-css']});