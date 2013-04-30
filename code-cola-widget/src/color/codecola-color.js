/*
Copyright (c) 2013, ZHOUQICF.COM. All rights reserved.
Code licensed under the MIT License:
version: 1.0.0
*/
/**
 * a color control for css3 property
 * @module codecola-color
 */
YUI().add('codecola-color', function(Y) {
    /**
     * a color control for css3 property
     * @param config {Object} Object literal specifying codecolaColor configuration properties.
     * @class codecolaColor
     * @constructor
     * @namespace Y
     * @extends Widget
     * @requires node widget codecola-color-css
     */
    Y.codecolaColor = Y.Base.create('codecola-color', Y.Widget, [], {
        initializer: function() {
        },

        renderUI: function(){
            var idRandom = (new Date()).getTime(),
                html = '<span class="codecola-color-transparent"><input type="text" id="codecola-color-input-' + idRandom + '" class="codecola-color-input" name="color-picker"></span>' +
                        '<ol class="codecola-color-picker" id="codecola-color-picker-' + idRandom + '">' + '    ' +
                        '<li class="codecola-color-hsb codecola-color-hsbH">' +
                        '    <div class="codecola-color-current"><label for="codecola-color-hsbH-curren-' + idRandom + '">Hue:</label><input type="number" id="codecola-color-hsbH-current-' + idRandom + '" step="1" min="0" max="360"/></div>' +
                        '    <div class="codecola-color-hsb-img"></div>' +
                        '    <div class="codecola-color-hsb-range"><input type="range" min="0" max="360" id="codecola-color-hsbH-' + idRandom + '"/></div>' +
                        '</li>' +
                        '<li class="codecola-color-hsb codecola-color-hsbS">' +
                        '    <div class="codecola-color-current"><label for="codecola-color-hsbS-curren-' + idRandom + '">Saturation:</label><input type="number" id="codecola-color-hsbS-current-' + idRandom + '" step="1" min="0" max="100"/></div>' +
                        '    <div class="codecola-color-hsb-img"></div>' +
                        '    <div class="codecola-color-hsb-range"><input type="range" min="0" max="100" id="codecola-color-hsbS-' + idRandom + '"/></div>' +
                        '</li>' +
                        '<li class="codecola-color-hsb codecola-color-hsbB">' +
                        '    <div class="codecola-color-current"><label for="codecola-color-hsbB-curren-' + idRandom + '">Lightness:</label><input type="number" id="codecola-color-hsbB-current-' + idRandom + '" step="1" min="0" max="100"/></div>' +
                        '    <div class="codecola-color-hsb-img"></div>' +
                        '    <div class="codecola-color-hsb-range"><input type="range" min="0" max="100" id="codecola-color-hsbB-' + idRandom + '"/></div>' +
                        '</li>' +
                        '<li class="codecola-color-hsb codecola-color-hsbA">' +
                        '    <div class="codecola-color-current"><label for="codecola-color-hsbA-curren-' + idRandom + '">Aphla:</label><input type="number" id="codecola-color-hsbA-current-' + idRandom + '" step="0.01" min="0" max="1"/></div>' +
                        '    <div class="codecola-color-hsb-range"><input type="range" min="0" max="1" id="codecola-color-hsbA-' + idRandom + '" step="0.01"/></div>' +
                        '</li>' +
                        '</ol>';
            var editorWrap = Y.Node.create('<div id="codecola-color-editorWrap-'+idRandom+'" class="codecola-color-editorWrap">'+html+'</div>');

            Y.one(this.get('wrap')).append(editorWrap);
            this.vars = {
                'picker': Y.one('#codecola-color-picker-' + idRandom),
                'hsbInput': Y.one('#codecola-color-input-' + idRandom),
                'hCurren': Y.one('#codecola-color-hsbH-current-' + idRandom),
                'sCurren': Y.one('#codecola-color-hsbS-current-' + idRandom),
                'bCurren': Y.one('#codecola-color-hsbB-current-' + idRandom),
                'aCurren': Y.one('#codecola-color-hsbA-current-' + idRandom),
                'hRange': Y.one('#codecola-color-hsbH-' + idRandom),
                'sRange': Y.one('#codecola-color-hsbS-' + idRandom),
                'bRange': Y.one('#codecola-color-hsbB-' + idRandom),
                'aRange': Y.one('#codecola-color-hsbA-' + idRandom),
                'rule': {}
            };
            return this;
        },

        bindUI: function(){
            var that = this,
                vars = that.vars,
                currentRanges = [vars.hCurren, vars.sCurren, vars.bCurren, vars.aCurren],
                colorRanges = [vars.hRange, vars.sRange, vars.bRange, vars.aRange];

            Y.each(currentRanges,function(node, index){
                node.on('change',function(e){
                    var hsba = {
                            h: currentRanges[0].get('value'),
                            s: currentRanges[1].get('value'),
                            b: currentRanges[2].get('value'),
                            a: currentRanges[3].get('value')
                        },
                        _initRangeHSB = ['_initRangeH', '_initRangeS', '_initRangeB', '_initRangeA'];

                    vars.rule.hsba = hsba;
                    vars.rule.rgba = that.changeColor(hsba, 'rgba', 'hsba');
                    that[_initRangeHSB[index]]()._initInput()._fireCallback();
                });
            });

            Y.each(colorRanges,function(node, index){
                node.on('change',function(e){
                    var hsba = {
                            h: colorRanges[0].get('value'),
                            s: colorRanges[1].get('value'),
                            b: colorRanges[2].get('value'),
                            a: colorRanges[3].get('value')
                        },
                        _initCurrentHSB = ['_initCurrentH', '_initCurrentS', '_initCurrentB', '_initCurrentA'];

                    vars.rule.hsba = hsba;
                    vars.rule.rgba = that.changeColor(hsba, 'rgba', 'hsba');
                    that[_initCurrentHSB[index]]()._initInput()._fireCallback();
                });
            });

            vars.hsbInput.on('change', function() {
                that.setColor({
                    color: this.get('value')
                });
            });

            //TODO
            vars.hsbInput.on('focus', function() {
                Y.all('.codecola-color-picker').setStyle('display', 'none');
                vars.picker.setStyle('display', 'block');
            });
            
            return that;
        },

        syncUI: function(){
            this._initRule()._initControls();
            return this;
        },

        renderer: function() {
            this.renderUI().bindUI().syncUI().get('onInit')();
            return this;
        },

        /**
         * @method _initInput
         * @private
         * @chainable
         */
        _initInput: function() {
            var input = this.vars.hsbInput,
                color = this.getColor();
            input.set('value', color);
            input.setStyle('backgroundColor', color);
            return this;
        },

        /**
         * @method _initRangeH
         * @private
         * @chainable
         */
        _initRangeH: function() {
            this.vars.hRange.set('value', this.vars.rule.hsba.h);
            return this;
        },

        /**
         * @method _initRangeS
         * @private
         * @chainable
         */
        _initRangeS: function() {
            this.vars.sRange.set('value', this.vars.rule.hsba.s);
            return this;
        },

        /**
         * @method _initRangeB
         * @private
         * @chainable
         */
        _initRangeB: function() {
            this.vars.bRange.set('value', this.vars.rule.hsba.b);
            return this;
        },

        /**
         * @method _initRangeA
         * @private
         * @chainable
         */
        _initRangeA: function() {
            this.vars.aRange.set('value', this.vars.rule.hsba.a);
            return this;
        },

        /**
         * @method _initCurrentH
         * @private
         * @chainable
         */
        _initCurrentH: function() {
            this.vars.hCurren.set('value', this.vars.rule.hsba.h);
            return this;
        },

        /**
         * @method _initCurrentS
         * @private
         * @chainable
         */
        _initCurrentS: function() {
            this.vars.sCurren.set('value', this.vars.rule.hsba.s);
            return this;
        },

        /**
         * @method _initCurrentB
         * @private
         * @chainable
         */
        _initCurrentB: function() {
            this.vars.bCurren.set('value', this.vars.rule.hsba.b);
            return this;
        },

        /**
         * @method _initCurrentA
         * @private
         * @chainable
         */
        _initCurrentA: function() {
            this.vars.aCurren.set('value', this.vars.rule.hsba.a);
            return this;
        },
        /**
         * init all controls
         * @method _initControls
         * @private
         * @chainable
         */
        _initControls: function(){
            this._initInput()._initRangeH()._initRangeS()._initRangeB()._initRangeA()._initCurrentH()._initCurrentS()._initCurrentB()._initCurrentA();
            return this;
        },

        /**
         * update the this.vars.rule object
         * @method _initRule
         * @private
         * @chainable
         */
        _initRule: function(){
            var
            color = this.get('color'),
            hsba = this.changeColor(color, 'hsba'),
            rgba = this.changeColor(hsba, 'rgba', 'hsba');

            if (rgba == 'error') {
                return;
            }

            this.vars.rule = {
                rgba: rgba,
                hsba: hsba
            };

            return this;
        },

        /**
         * update the attribute 'color', init all the controls, fire the onChange event
         * @method setColor
         * @param {Object} param.color for update the attribute 'color'
         * @chainable
         */
        setColor: function(param) {
            this.set('color', param.color).syncUI()._fireCallback();
            return this;
        },

        /**
         * reset all, color is 'transparent', will not run onChange
         * @method reset
         * @chainable
         */
        reset: function() {
            this.set('color', 'transparent').syncUI();
            return this;
        },

        /**
         * return the current rgba or rgb color
         * return {String} rgba when the broswer is support rgba, if not return {String} rgb, return {Object} <code>{rgba:xxx, rgb:xxx}</code> when param 'isAll' is <code>ture</code>
         * @method getColor
         * @param {Boolean} if return {rgba:xxx, rgb:xxx}
         * @return {String|Object}
         */
        getColor: function(isAll) {
            var color = this.vars.rule.rgba,
                rgba,
                rgb,
                alpha = parseFloat(color.a);
            alpha = (alpha < 1 && alpha != 0)?alpha.toFixed(2):alpha;
            rgba = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + alpha + ')';
            rgb = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
            if(isAll){
                return {
                    rgba: rgba,
                    rgb: rgb
                }
            }else{
                if(Y.codecolaColor.isSupportRGBA){
                    return alpha == 1?rgb:rgba;
                }else{
                    return rgb;
                }
            }
        },

        /**
         * change the color type from nType to oType
         * @method changeColor
         * @param color {String|Object}
         * @param nType {String} hex|rgb|rgba|hsb|hsba
         * @param oType {String} hex|rgb|rgba|hsb|hsba
         * @return {String|Object} return Object when rgb|rgba|hsb|hsba, return String when hex
         */
        changeColor: function(color, nType, oType) {
            var that = this;
            if (/^transparent$/i.test(color)) {
                color = {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 0
                };
            } else if (color in Y.codecolaColor.keywords) {
                color = Y.codecolaColor.keywords[color];
                color = {
                    r: color[0],
                    g: color[1],
                    b: color[2],
                    a: 1
                }
            }
            oType = oType ? oType : that.getColorType(color);
            switch (oType) {
                case 'hsba':
                    if (nType == 'hex') {
                        return that.rgbToHex(that.hsbToRgba(color));
                    } else if (nType == 'rgba') {
                        return that.hsbToRgba(color);
                    } else if (nType == 'hsba' && typeof color == 'string'){
                        var _hsba = color.replace(/(hsba?){0,1}\(|\)/g, '').split(',');
                        return {
                            h: _hsba[0],
                            s: _hsba[1],
                            b: _hsba[2],
                            a: typeof _hsba[3] != 'undefined' ? _hsba[3] : 1
                        }
                    }
                    break;
                case 'hex':
                    if (nType == 'hsba') {
                        return that.rgbToHsba(that.hexToRgba(color));
                    } else if (nType == 'rgba') {
                        return that.hexToRgba(color);
                    }
                    break;
                case 'rgba':
                    if (nType == 'hsba') {
                        return that.rgbToHsba(color);
                    } else if (nType == 'hex') {
                        return that.rgbToHex(color);
                    }
                    break;
                default:
                    return 'error'
                    break;
            }
            return color;
        },

        /**
         * get the color's type, rgb is return rgba too
         * @method getColorType
         * @param {String|Object}
         * @return {String} hsba|hex|rgba, or return 'error'
         */
        getColorType: function(color) {
            var that = this;
            if (that.isHSBA(color) || that.isHSB(color)) {
                return 'hsba';
            } else if (that.isHEX(color)) {
                return 'hex';
            } else if (that.isRGB(color) || that.isRGBA(color)) {
                return 'rgba';
            } 
            return 'error';
        },

        /**
         * if the color is hsb
         * @method isHSB
         * @param {String|Object}
         * @return {Boolean}
         */
        isHSB: function(hsb) {
            var reg = /^\d$|^[1-9]\d$|^100$/;
            if (typeof hsb == 'object' && reg.test(hsb.h) && reg.test(hsb.s) && reg.test(hsb.b)) {
                return true;
            } else if (typeof hsb == 'string' && /^hsb\((\d|[1-9]\d|[1-2]\d{2}|3[0-5]\d|360)\,(\d|[1-9]\d|100)\,(\d|[1-9]\d|100)\)$/.test(hsb)) {
                return true;
            }
            return false;
        },

        /**
         * if the color is hsba
         * @method isHSBA
         * @param {String|Object}
         * @return {Boolean}
         */
        isHSBA: function(hsba) {
            var reg = /^\d$|^[1-9]\d$|^100$/;
            if (typeof hsba == 'object' && /^\d$|^[1-9]\d$|^[1-2]\d{2}$|^3[0-5]\d$|^360$/.test(hsba.h) && reg.test(hsba.s) && reg.test(hsba.b) && /^0|1|0\.\d+$/.test(hsba.a)) {
                return true;
            } else if (typeof hsba == 'string' && /^hsba\((\d|[1-9]\d|[1-2]\d{2}|3[0-5]\d|360)\,((\d|[1-9]\d|100)\,){2}(0|1|0\.\d+)\)/.test(hsba)) {
                return true;
            }
            return false;
        },

        /**
         * if the color is hex
         * @method isHEX
         * @param {String|Object}
         * @return {Boolean}
         */
        isHEX: function(hex) {
            if (typeof hex == 'string' && /^#[0-9a-fA-F]{6}$|^#[0-9a-fA-F]{3}$/.test(hex)) {
                return true;
            }
            return false;
        },

        /**
         * if the color is hsb
         * @method isRGB
         * @param {String|Object}
         * @return {Boolean}
         */
        isRGB: function(rgb) {
            var reg = /^\d$|^[1-9]\d$|^1\d{2}$|^2[0-4]\d$|^25[0-5]$/;
            if (typeof rgb == 'object' && reg.test(rgb.r) && reg.test(rgb.g) && reg.test(rgb.b)) {
                return true;
            } else if (typeof rgb == 'string' && /^rgb\(((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\,){2}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\)$/.test(rgb)) {
                return true;
            }
            return false;
        },

        /**
         * if the color is rgba
         * @method isRGBA
         * @param {String|Object}
         * @return {Boolean}
         */
        isRGBA: function(rgba) {
            var reg = /^\d$|^[1-9]\d$|^1\d{2}$|^2[0-4]\d$|^25[0-5]$/;
            if (typeof rgba == 'object' && reg.test(rgba.r) && reg.test(rgba.g) && reg.test(rgba.b) && /^0|1|0\.\d+$/.test(rgba.a)) {
                return true;
            } else if (/^rgba\(0\,\s?0\,\s?0\,\s?0\)$/.test(rgba)) {
                return true;
            } else if (typeof rgba == 'string' && /^rgba\(((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\,){3}(0|1|0\.\d+)\)/.test(rgba)) {
                return true;
            }
            return false;
        },

        /**
         * transform rgb or rgba to hex
         * @method rgbToHex
         * @param {Object} support rgb or rgba
         * @return {String}
         */
        rgbToHex: function(rgb) {
            var a = [rgb.r,rgb.g,rgb.b],
                hex = '';
            for (var i = 0; i < 3; i++) {
                var b = parseInt(a[i]).toString(16);
                hex += (b.length === 1) ? '0' + b : b;
            }
            return '#' + hex;
        },

        /**
         * transform hex to rgba
         * @method hexToRgba
         * @param {String}
         * @return {Object}
         */
        hexToRgba: function(hex) {
            hex = this.hexToComplate(hex);
            return {
                r: parseInt(hex.substring(1, 3), 16),
                g: parseInt(hex.substring(3, 5), 16),
                b: parseInt(hex.substring(5, 7), 16),
                a: 1
            }
        },

        /**
         * transform rgb or rgba to hsba
         * @method rgbToHsba
         * @param {String|Object} support rgb or rgba
         * @return {Object}
         */
        rgbToHsba: function(rgba) {
            if (typeof rgba == 'string') {
                rgba = rgba.replace(/rgba{0,1}\(|\)/g, '').split(',');
                rgba = {
                    r: rgba[0],
                    g: rgba[1],
                    b: rgba[2],
                    a: typeof rgba[3] != 'undefined' ? rgba[3] : 1
                }
            }
            var nH,
                nS,
                nV,
                nR = rgba.r / 255,
                nG = rgba.g / 255,
                nB = rgba.b / 255,
                nmax = Math.max(nR, nG, nB),
                nmin = Math.min(nR, nG, nB),
                ndelMax = nmax - nmin,
                ndelR,
                ndelG,
                ndelB;

            nV = nmax;
            if (ndelMax === 0) {
                nH = 0;
                nS = 0;
            } else {
                nS = ndelMax / nmax
                ndelR = (((nmax - nR) / 6) + (ndelMax / 2)) / ndelMax;
                ndelG = (((nmax - nG) / 6) + (ndelMax / 2)) / ndelMax;
                ndelB = (((nmax - nB) / 6) + (ndelMax / 2)) / ndelMax;
                if (nR === nmax) {
                    nH = ndelB - ndelG;
                } else if (nG === nmax) {
                    nH = (1 / 3) + ndelR - ndelB;
                } else if (nB === nmax) {
                    nH = (2 / 3) + ndelG - ndelR;
                }
                if (nH < 0) {
                    nH = nH + 1;
                }
                if (nH > 1) {
                    nH = nH - 1;
                }
            }
            return {
                h: Math.round(nH * 360),
                s: Math.round(nS * 100),
                b: Math.round(nV * 100),
                a: rgba.a != 'undefined' ? rgba.a : 1
            }
        },

        /**
         * transform hsb or hsba to rgba
         * @method hsbToRgba
         * @param {String|Object} support hsb and hsba color
         * @return {Object}
         */
        hsbToRgba: function(hsba) {
            if (typeof hsba == 'string') {
                hsba = hsba.replace(/hsba{0,1}\(|\)/g, '').split(',');
                hsba = {
                    h: hsba[0],
                    s: hsba[1],
                    b: hsba[2],
                    a: typeof hsba[3] != 'undefined' ? hsba[3] : 1
                }
            }
            var nH,nS,nV,
                nR,nG,nB,
                hi,f,p,q,t;

            nH = hsba.h / 360;
            nS = hsba.s / 100;
            nV = hsba.b / 100;

            if (hsba.s === 0) {
                nR = nG = nB = nV;
            } else {
                hi = nH * 6
                if (hi === 6) {
                    hi = 0;
                }
                f = Math.floor(hi);
                p = nV * (1 - nS);
                q = nV * (1 - nS * (hi - f));
                t = nV * (1 - nS * (1 - (hi - f)));
                switch (f) {
                    case 0:
                        nR = nV;
                        nG = t;
                        nB = p;
                        break;
                    case 1:
                        nR = q;
                        nG = nV;
                        nB = p;
                        break;
                    case 2:
                        nR = p;
                        nG = nV;
                        nB = t;
                        break;
                    case 3:
                        nR = p;
                        nG = q;
                        nB = nV;
                        break;
                    case 4:
                        nR = t;
                        nG = p;
                        nB = nV;
                        break;
                    default:
                        nR = nV;
                        nG = p;
                        nB = q;
                        break;
                }
            }
            return {
                r: Math.round(nR * 255),
                g: Math.round(nG * 255),
                b: Math.round(nB * 255),
                a: hsba.a
            }
        },

        /**
         * transform hex color <code>#fff</code> to <code>#ffffff</code>
         * @method hexToComplate
         * @param {String}
         * @return {String}
         */
        hexToComplate: function(hex) {
            if (hex.length === 4) {
                var hex = hex.toLowerCase(),
                    newHex = '';

                for (var i = 0; i < 3; i++) {
                    var a = hex.substring(i + 1, i + 2);
                    newHex += a + a;
                }
                return '#' + newHex;
            } else {
                return hex;
            }
        },

        /**
         * hide color picker, disable text input
         * @method disable
         * @chainable
         */
        disable: function() {
            var controls = this.vars;
            controls.hsbInput.set('disabled', true);
            controls.picker.setStyle('display', 'none');
            return this;
        },

        /**
         * show color picker, able text input
         * @method able
         * @chainable
         */
        able: function() {
            var controls = this.vars;
            controls.hsbInput.set('disabled', false);
            controls.picker.setStyle('display', 'block');
            return this;
        },

        /**
         * fire the onChange event
         * @method _fireCallback
         * @private
         * @chainable
         */
        _fireCallback: function() {
            this.get('onChange')(this.getColor(this.get('isAll')));
            return this;
        }
    },{
        /**
         * @attribute isSupportRGBA
         * @type Boolean
         * @description if the current broswer is support rgba
         */
        isSupportRGBA: function() {
            var i = document.createElement('i');
            i.style.color = 'rgba(0,0,0,0.1)';
            return /^rgba/.test(i.style.color);
        }(),
        /**
         * @attribute keywords
         * @type Object
         * @description color <a href="http://www.w3.org/TR/css3-color/#svg-color">keywords</a> from <a href="http://www.w3.org/TR/SVG/types.html#ColorKeywords">SVG 1.0 color keyword names</a>
         */
        keywords: {
            'aliceblue': [240, 248, 255],
            'antiquewhite': [250, 235, 215],
            'aqua': [0, 255, 255],
            'aquamarine': [127, 255, 212],
            'azure': [240, 255, 255],
            'beige': [245, 245, 220],
            'bisque': [255, 228, 196],
            'black': [0, 0, 0],
            'blanchedalmond': [255, 235, 205],
            'blue': [0, 0, 255],
            'blueviolet': [138, 43, 226],
            'brown': [165, 42, 42],
            'burlywood': [222, 184, 135],
            'cadetblue': [95, 158, 160],
            'chartreuse': [127, 255, 0],
            'chocolate': [210, 105, 30],
            'coral': [255, 127, 80],
            'cornflowerblue': [100, 149, 237],
            'cornsilk': [255, 248, 220],
            'crimson': [220, 20, 60],
            'cyan': [0, 255, 255],
            'darkblue': [0, 0, 139],
            'darkcyan': [0, 139, 139],
            'darkgoldenrod': [184, 134, 11],
            'darkgray': [169, 169, 169],
            'darkgreen': [0, 100, 0],
            'darkgrey': [169, 169, 169],
            'darkkhaki': [189, 183, 107],
            'darkmagenta': [139, 0, 139],
            'darkolivegreen': [85, 107, 47],
            'darkorange': [255, 140, 0],
            'darkorchid': [153, 50, 204],
            'darkred': [139, 0, 0],
            'darksalmon': [233, 150, 122],
            'darkseagreen': [143, 188, 143],
            'darkslateblue': [72, 61, 139],
            'darkslategray': [47, 79, 79],
            'darkslategrey': [47, 79, 79],
            'darkturquoise': [0, 206, 209],
            'darkviolet': [148, 0, 211],
            'deeppink': [255, 20, 147],
            'deepskyblue': [0, 191, 255],
            'dimgray': [105, 105, 105],
            'dimgrey': [105, 105, 105],
            'dodgerblue': [30, 144, 255],
            'firebrick': [178, 34, 34],
            'floralwhite': [255, 250, 240],
            'forestgreen': [34, 139, 34],
            'fuchsia': [255, 0, 255],
            'gainsboro': [220, 220, 220],
            'ghostwhite': [248, 248, 255],
            'gold': [255, 215, 0],
            'goldenrod': [218, 165, 32],
            'gray': [128, 128, 128],
            'green': [0, 128, 0],
            'greenyellow': [173, 255, 47],
            'grey': [128, 128, 128],
            'honeydew': [240, 255, 240],
            'hotpink': [255, 105, 180],
            'indianred': [205, 92, 92],
            'indigo': [75, 0, 130],
            'ivory': [255, 255, 240],
            'khaki': [240, 230, 140],
            'lavender': [230, 230, 250],
            'lavenderblush': [255, 240, 245],
            'lawngreen': [124, 252, 0],
            'lemonchiffon': [255, 250, 205],
            'lightblue': [173, 216, 230],
            'lightcoral': [240, 128, 128],
            'lightcyan': [224, 255, 255],
            'lightgoldenrodyellow': [250, 250, 210],
            'lightgray': [211, 211, 211],
            'lightgreen': [144, 238, 144],
            'lightgrey': [211, 211, 211],
            'lightpink': [255, 182, 193],
            'lightsalmon': [255, 160, 122],
            'lightseagreen': [32, 178, 170],
            'lightskyblue': [135, 206, 250],
            'lightslategray': [119, 136, 153],
            'lightslategrey': [119, 136, 153],
            'lightsteelblue': [176, 196, 222],
            'lightyellow': [255, 255, 224],
            'lime': [0, 255, 0],
            'limegreen': [50, 205, 50],
            'linen': [250, 240, 230],
            'magenta': [255, 0, 255],
            'maroon': [128, 0, 0],
            'mediumaquamarine': [102, 205, 170],
            'mediumblue': [0, 0, 205],
            'mediumorchid': [186, 85, 211],
            'mediumpurple': [147, 112, 219],
            'mediumseagreen': [60, 179, 113],
            'mediumslateblue': [123, 104, 238],
            'mediumspringgreen': [0, 250, 154],
            'mediumturquoise': [72, 209, 204],
            'mediumvioletred': [199, 21, 133],
            'midnightblue': [25, 25, 112],
            'mintcream': [245, 255, 250],
            'mistyrose': [255, 228, 225],
            'moccasin': [255, 228, 181],
            'navajowhite': [255, 222, 173],
            'navy': [0, 0, 128],
            'oldlace': [253, 245, 230],
            'olive': [128, 128, 0],
            'olivedrab': [107, 142, 35],
            'orange': [255, 165, 0],
            'orangered': [255, 69, 0],
            'orchid': [218, 112, 214],
            'palegoldenrod': [238, 232, 170],
            'palegreen': [152, 251, 152],
            'paleturquoise': [175, 238, 238],
            'palevioletred': [219, 112, 147],
            'papayawhip': [255, 239, 213],
            'peachpuff': [255, 218, 185],
            'peru': [205, 133, 63],
            'pink': [255, 192, 203],
            'plum': [221, 160, 221],
            'powderblue': [176, 224, 230],
            'purple': [128, 0, 128],
            'red': [255, 0, 0],
            'rosybrown': [188, 143, 143],
            'royalblue': [65, 105, 225],
            'saddlebrown': [139, 69, 19],
            'salmon': [250, 128, 114],
            'sandybrown': [244, 164, 96],
            'seagreen': [46, 139, 87],
            'seashell': [255, 245, 238],
            'sienna': [160, 82, 45],
            'silver': [192, 192, 192],
            'skyblue': [135, 206, 235],
            'slateblue': [106, 90, 205],
            'slategray': [112, 128, 144],
            'slategrey': [112, 128, 144],
            'snow': [255, 250, 250],
            'springgreen': [0, 255, 127],
            'steelblue': [70, 130, 180],
            'tan': [210, 180, 140],
            'teal': [0, 128, 128],
            'thistle': [216, 191, 216],
            'tomato': [255, 99, 71],
            'turquoise': [64, 224, 208],
            'violet': [238, 130, 238],
            'wheat': [245, 222, 179],
            'white': [255, 255, 255],
            'whitesmoke': [245, 245, 245],
            'yellow': [255, 255, 0],
            'yellowgreen': [154, 205, 50]
        },
        ATTRS:{
            /**
             * @attribute wrap
             * @type String
             * @default 'body'
             * @description a css selector for <code>Y.one()</code>,controls will insert into the wrap
             */
            wrap: {
                value: '',
                validator: Y.Lang.isString
            },
            /**
             * @attribute color
             * @type String
             * @default 'transparent'
             * @description color for init, support rgba|rgb|hsb|hsba|hex|<a href="http://www.w3.org/TR/css3-color/#svg-color">keywords</a>|"transparent"
             */
            color: {
                value: 'transparent',
                validator: function(v){
                    v = v.replace(/\s/g, '');
                    return this.isHEX(v) || this.isHSB(v) || this.isHSBA(v) || this.isRGB(v) || this.isRGBA(v) || v in Y.codecolaColor.keywords || v == 'transparent';
                },
                setter: function(v){
                    return v.replace(/\s/g, '');
                }
            },
            /**
             * @attribute isAll
             * @type Boolean
             * @default false
             * @description if the param include rgba and rgb when run the callback <code>function({rgba:xxx,rgb:xxx}){}</code> or <code>function(rgba|rgb){}</code>
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
             * @description callback when color change
             */
            onChange: {
                value: function() {
                },
                validator: Y.Lang.isFunction
            }
        }
    });
},'1.0.0',{requires:['node', 'widget-base', 'codecola-color-css']});