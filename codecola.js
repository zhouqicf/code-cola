(function() {
    //if extension is loaded 
    var _temp_cc = document.getElementById("codeCola");
    if (_temp_cc && _temp_cc.style.display != "none") {
        _temp_cc.style.display = "none";
        window.codeColaTurnOn = false;
        return;
    } else if (_temp_cc && _temp_cc.style.display == "none") {
        _temp_cc.style.display = "block";
        if (/cc-open/.test(document.getElementById("codeCola-switch").className)) {
            window.codeColaTurnOn = true;
        }
        return;
    } else {
        if (!window.codeColaTurnOn) {
            window.codeColaTurnOn = true;
        }
    }

    function getMSG(key) {
        return chrome.i18n.getMessage(key);
    }
    /**
     *@name:Z
     *@author:zhouqicf@gmail.com
     *@site:www.zhouqicf.com
     *@version:1-0-0
     */
    var Z = {};
    Z.moudles = {
        "baseUrl": "http://kxt.koubei.com/labs/youxiao/js/widget/",
        "degree": {
            "js": "degree/form_degree.js",
            "css": "degree/form_degree.css"
        },
        "color": {
            "js": "color/form_color.js",
            "css": "color/form_color.css"
        },
        "gradient": {
            "js": "gradient/form_gradient.js",
            "css": "gradient/form_gradient.css"
        }
    }
    Z.get = function(id) {
        return document.getElementById(id);
    }
    Z.getElementsByClassName = function(className) {
        return document.getElementsByClassName(className);
    }
    Z.each = function(nodes, callback) {
        if (nodes.length && typeof nodes.tagName == "undefined" && nodes != window) {
            for (var i = 0, j = nodes.length; i < j; i++) {
                callback(nodes[i], i);
            }
        } else {
            callback(nodes);
        }
    }
    Z.filter = function(nodes, callback) {
        var newNodes = [];
        Z.each(nodes, function(node) {
            if (callback(node)) {
                newNodes.push(node);
            }
        });
        return newNodes;
    }
    Z.on = function(nodes, type, callback) {
        if (typeof nodes === "string") {
            nodes = Z.get(nodes);
        }
        Z.each(nodes, function(node) {
            if (window.attachEvent) {
                node.attachEvent(type, callback);
            } else {
                node.addEventListener(type, callback, false);
            }
        });
    }
    Z.getStyle = function(node, property) {
        if (node.currentStyle) {
            return node.currentStyle[property];
        } else if (window.getComputedStyle) {
            return window.getComputedStyle(node, null)[property];
        }
    }
    Z.cssExtension = function(property) {
        if (property == "boxShadow") {
            if (Z.browser.webkit) {
                property = "webkitBoxShadow";
            } else if (Z.browser.gecko) {
                property = "MozBoxShadow";
            }
        }
        return property;
    }
    Z.setStyle = function(nodes, property, value) {
        Z.each(nodes, function(node) {
            node.style[Z.cssExtension(property)] = value;
        });
    }
    Z.setAttr = function(nodes, property, value) {
        Z.each(nodes, function(node) {
            node.setAttribute(property, value);
        });
    }
    Z.getAttr = function(node, property) {
        return node.getAttribute(property);
    }
    Z.removeAttr = function(nodes, property, value) {
        Z.each(nodes, function(node) {
            node.removeAttribute(property, value);
        });
    }
    Z.trim = function(string) {
        if (string == "") {
            return "";
        }
        return string.replace(/^\s*/, "").replace(/\s*$/, "");
    }
    Z.addClass = function(nodes, className) {
        Z.each(nodes, function(node) {
            if (Z.hasClass(node, className)) {
                return
            }
            var pClass = Z.trim(node.className);
            if (pClass == "") {
                node.className = className;
            } else {
                node.className = pClass + " " + className;
            }
        });
    }
    Z.removeClass = function(nodes, className) {
        Z.each(nodes, function(node) {
            var c = node.className;
            if (!c) {
                return;
            }
            node.className = Z.trim(c.replace(className, ""));
        });
    }
    Z.hasClass = function(node, className) {
        var c = node.className;
        if (!c) {
            return false;
        }
        var classes = c.split(" "),
            ifHas = false;
        Z.each(classes, function(c) {
            if (c == className) {
                ifHas = true;
            }
        });
        return ifHas;
    }
    Z.removeChildren = function(parent, nodelist) {
        while (nodelist.length != 0) {
            parent.removeChild(nodelist[0]);
        }
    }
    Z.log = function(message) {
        if (typeof console != "undefined") {
            console.log(message);
        }
    }
    Z.isPressNum = function(e) {
        var _keyCode = e.keyCode;
        if ((_keyCode > 64 && _keyCode < 91 && !(e.ctrlKey && (_keyCode == 65 || _keyCode == 67 || _keyCode == 86 || _keyCode == 88))) || (e.shiftKey && (_keyCode < 58 && _keyCode > 47)) || (_keyCode > 189 && _keyCode < 193) || (_keyCode > 219 && _keyCode < 223) || (_keyCode == 107 || _keyCode == 59 || _keyCode == 188 || _keyCode == 219) || (_keyCode == 109 && e.shiftKey)) {
            return false;
        } else {
            return true;
        }
    }
    Z.dump = function(parms) {
        for (var i in parms) {
            Z.log(i + ":" + parms[i] + ";\n");
        }
    }
    Z.loader = function(moudle, callback) { /*not use loader under chrome extension*/
        callback();
    }
    Z.getXY = function(node) {
        return {
            "x": node.getBoundingClientRect().left + Math.max(document.body.scrollLeft, document.documentElement.scrollLeft),
            "y": node.getBoundingClientRect().top + Math.max(document.body.scrollTop, document.documentElement.scrollTop)
        };
    }
    Z.getBoundingClientRect = function(node) {
        return {
            "x": node.getBoundingClientRect().left,
            "y": node.getBoundingClientRect().top
        };
    }
    Z.percentToFloat = function(percent) {
        return parseInt(percent.replace("%", ""), 10) / 100;
    }
    Z.floatToPercent = function(floatNum, isNum) {
        var percent = Math.round(floatNum * 100);
        if (isNum) {
            return percent;
        }
        return percent + "%";
    }
    Z.color = {
        "rgbToHex": function(rgb) {
            if (rgb === "transparent" || rgb === "rgba(0, 0, 0, 0)") {
                return "transparent";
            }
            var a = [rgb.r, rgb.g, rgb.b],
                hex = "";
            for (var i = 0; i < 3; i++) {
                var b = parseInt(a[i]).toString(16);
                hex += (b.length === 1) ? "0" + b : b;
            }
            return "#" + hex;
        },
        "hexToRgb": function(hex) {
            if (hex === "transparent" || hex === "rgba(0, 0, 0, 0)") {
                return "transparent";
            }
            var rgb = [
            parseInt(hex.substring(1, 3), 16), parseInt(hex.substring(3, 5), 16), parseInt(hex.substring(5, 7), 16)];
            return {
                "r": rgb[0],
                "g": rgb[1],
                "b": rgb[2],
                "a": 1
            }
        },
        "rgbToHsb": function(rgba) {
            if (rgba === "transparent" || rgba === "rgba(0, 0, 0, 0)") {
                return "transparent";
            }
            if (typeof rgba == "string") {
                rgba = rgba.replace(/rgba{0,1}\(|\)/g, "").split(",");
                rgba = {
                    "r": rgba[0],
                    "g": rgba[1],
                    "b": rgba[2],
                    "a": rgba[3] ? rgba[3] : 1
                }
            }
            var nH, nS, nV, nR = rgba.r / 255,
                nG = rgba.g / 255,
                nB = rgba.b / 255,
                nmax = Math.max(nR, nG, nB),
                nmin = Math.min(nR, nG, nB),
                ndelMax = nmax - nmin,
                ndelR, ndelG, ndelB;

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
                "h": Math.round(nH * 360),
                "s": Math.round(nS * 100),
                "b": Math.round(nV * 100),
                "a": rgba.a ? rgba.a : 1
            }
        },
        "hsbToRgb": function(hsba) {
            if (hsba === "transparent" || hsba === "rgba(0, 0, 0, 0)") {
                return "transparent";
            }
            var nH, nS, nV, nR, nG, nB, hi, f, p, q, t;

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
                "r": Math.round(nR * 255),
                "g": Math.round(nG * 255),
                "b": Math.round(nB * 255),
                "a": hsba.a
            }
        },
        "hexToComplate": function(hex) {
            if (hex.length === 4) {
                var hex = hex.toLowerCase(),
                    newHex = "";

                for (var i = 0; i < 3; i++) {
                    var a = hex.substring(i + 1, i + 2);
                    newHex += a + a;
                }
                return "#" + newHex;
            } else {
                return hex;
            }
        },
        "getHexColor": function(node, property) {
            if (node.currentStyle) {
                return node.currentStyle[property] === "transparent" ? "transparent" : this.hexToComplate(node.currentStyle[property]);
            }
            if (window.getComputedStyle) {
                var color = window.getComputedStyle(node, null)[property];
                return color === "transparent" || color === "rgba(0, 0, 0, 0)" ? "transparent" : this.rgbToHex(color);
            }
        }
    };
    Z.browser = {
        ie: !! (window.attachEvent && !window.opera),
        Opera: !! window.opera,
        webkit: navigator.userAgent.indexOf("AppleWebKit/") > -1,
        gecko: navigator.userAgent.indexOf("Gecko") > -1 && navigator.userAgent.indexOf("KHTML") == -1,
        mobileSafari: !! navigator.userAgent.match(/Apple.*Mobile.*Safari/)
    };
    Z.sendRequest = function(method, url, callback, data) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open(method, url, true);
        if (method == "POST") {
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 2 && callback.start) {
                callback.start(xmlhttp);
            } else if ((xmlhttp.readyState == 4 || xmlhttp.readyState == 0) && callback.success) {
                callback.success(xmlhttp);
            } else if (xmlhttp.status != 200 && xmlhttp.status != 304 && callback.fail) {
                callback.fail(xmlhttp);
            }
        }
        xmlhttp.send(data);
    };
    /**
     *@name:form Degree
     *@author:zhouqicf@gmail.com
     *@site:www.zhouqicf.com
     *@version:1-0-0
     */

    function DegreeControl(wrap, param) {
        var that = this;
        that.config = {
            "Degree": param.Degree ? param.Degree : 0,
            "afterChange": param.afterChange ? param.afterChange : function() {}
        }

        //create node
        that.vars = {
            "DegreeWrap": document.createElement("div"),
            "Degree": document.createElement("div"),
            "line": document.createElement("i"),
            "dot": document.createElement("b"),
            "label": document.createElement("label"),
            "input": document.createElement("input")
        }
        var _val = that.vars,
            _DegreeWrap = _val.DegreeWrap,
            _Degree = _val.Degree,
            _line = _val.line,
            _dot = _val.dot,
            _label = _val.label,
            _input = _val.input;

        _DegreeWrap.className = "form-Degree-wrap";
        _Degree.className = "form-Degree";
        _line.className = "form-Degree-line";
        _dot.className = "form-Degree-dot";
        _label.className = "form-Degree-label";
        _input.className = "form-Degree-input";

        _input.setAttribute("max", 180);
        _input.setAttribute("min", -180);
        _Degree.appendChild(_line);
        _Degree.appendChild(_dot);
        _label.appendChild(_input);
        _DegreeWrap.appendChild(_Degree);
        _DegreeWrap.appendChild(_label);
        Z.get(wrap).appendChild(_DegreeWrap);

        //init Degree
        that.setDegree({
            "Degree": that.config.Degree
        });

        //control events					
        var preXY = {},
            drag = false;
        Z.on(_Degree, "mousedown", function(e) {
            drag = true;
            Z.setStyle(document.documentElement, "webkitUserSelect", "none");
            that.countDegree(e);
        });
        Z.on(document, "mouseup", function(e) {
            drag = false;
            Z.setStyle(document.documentElement, "webkitUserSelect", "");
        });
        Z.on(document, "mousemove", function(e) {
            if (!drag) {
                return;
            }
            that.countDegree(e);
        });
        Z.on(_input, "change", function(e) {
            var _value = this.value;
            if (_value > 180) {
                _value = 180;
            } else if (_value < -180) {
                _value = -180;
            }
            that.setDegree({
                "Degree": _value
            });
        });
    }
    DegreeControl.prototype.countDegree = function(e) {
        var _dot = this.vars.dot,
            _Degree, _dotXY = {},
            _offset = {};

        _dotXY.x = _dot.getBoundingClientRect().left + 1;
        _dotXY.y = _dot.getBoundingClientRect().top + 1;

        if (navigator.userAgent.match(/Opera/)) {
            _dotXY.x = (_dotXY.x - Math.max(document.body.scrollLeft, document.documentElement.scrollLeft)) / 2;
            _dotXY.y = (_dotXY.y - Math.max(document.body.scrollTop, document.documentElement.scrollTop)) / 2;
        }

        _offset.x = e.clientX - _dotXY.x;
        _offset.y = e.clientY - _dotXY.y;

        _Degree = -Math.round(Math.atan2(_offset.y, _offset.x) * (360 / (2 * Math.PI)));
        this.setDegree({
            "Degree": _Degree
        });
    }
    DegreeControl.prototype.showDegree = function() {
        var _Degree = this.config.Degree,
            _line = this.vars.line,
            _value = "rotate(" + (-_Degree) + "deg)";
        Z.setStyle(_line, "MozTransform", _value);
        Z.setStyle(_line, "webkitTransform", _value);
        Z.setStyle(_line, "OTransform", _value);

        this.vars.input.value = _Degree;
    }
    DegreeControl.prototype.setDegree = function(parms) {
        var that = this,
            callback = typeof parms.callback != "undefined" ? parms.callback : true,
            Degree = parms.Degree;
        if (that.isDegree(Degree)) {
            this.config.Degree = Degree;
            this.showDegree();
            if (callback) {
                this.onSetDegree();
            }
        }
    }
    DegreeControl.prototype.onSetDegree = function() {
        this.config.afterChange(this.getDegree());
    }
    DegreeControl.prototype.getDegree = function() {
        return this.config.Degree;
    }
    DegreeControl.prototype.isDegree = function(_Degree) {
        return /^-?1[0-7]\d$|^-?180$|^-?[1-9]\d$|^\d$|^-[1-9]$/.test(_Degree);
    }
    /**
     *@name:form color
     *@author:zhouqicf@gmail.com
     *@site:www.zhouqicf.com
     *@version:1-0-0
     */

    function ColorControl(wrap, param) {
        var that = this;
        that.config = {
            "hsba": param.color ? that.changeColor(param.color, "hsba") : "transparent",
            "name": param.name ? param.name : "color-picker",
            "afterChange": param.afterChange ? param.afterChange : function() {}
        };
        that.supportRGBA = (function() {
            var a = document.createElement("i");
            a.style.color = "rgba(0,0,0,0.1)";
            return /^rgba/.test(a.style.color);
        })();
        var idRandom = Math.ceil(Math.random() * 100000000000),
            html = '<input type="text" id="form-color-input-' + idRandom + '" class="form-color-input" name="' + that.config.name + '">' + '<ol class="form-color-picker" id="form-color-picker-' + idRandom + '">' + '    <li class="form-color-hsb form-color-hsbH">' + '		    <div class="form-color-current"><label for="form-color-hsbH-curren-' + idRandom + '">Hue:</label><input type="text" id="form-color-hsbH-current-' + idRandom + '" min="0" max="360"/></div>' + '		    <div class="form-color-hsb-img"></div>' + '		    <div class="form-color-hsb-range"><input type="range" min="0" max="360" id="form-color-hsbH-' + idRandom + '"/></div>' + '	  </li>' + '    <li class="form-color-hsb form-color-hsbS">' + '		    <div class="form-color-current"><label for="form-color-hsbS-curren-' + idRandom + '">Saturation:</label><input type="text" id="form-color-hsbS-current-' + idRandom + '" min="0" max="100"/></div>' + '		    <div class="form-color-hsb-img"></div>' + '		    <div class="form-color-hsb-range"><input type="range" min="0" max="100" id="form-color-hsbS-' + idRandom + '"/></div>' + '	  </li>' + '    <li class="form-color-hsb form-color-hsbB">' + '		    <div class="form-color-current"><label for="form-color-hsbB-curren-' + idRandom + '">Lightness:</label><input type="text" id="form-color-hsbB-current-' + idRandom + '" min="0" max="100"/></div>' + '		    <div class="form-color-hsb-img"></div>' + '		    <div class="form-color-hsb-range"><input type="range" min="0" max="100" id="form-color-hsbB-' + idRandom + '"/></div>' + '	  </li>' + '    <li class="form-color-hsb form-color-hsbA">' + '		    <div class="form-color-current"><label for="form-color-hsbA-curren-' + idRandom + '">Aphla:</label><input type="text" id="form-color-hsbA-current-' + idRandom + '" min="0" max="1"/></div>' + '		    <div class="form-color-hsb-range"><input type="range" min="0" max="1" id="form-color-hsbA-' + idRandom + '" step="0.01"/></div>' + '	  </li>' + '</ol>';

        var editorWrap = document.createElement("div");
        editorWrap.id = "form-color-editorWrap-" + idRandom;
        editorWrap.className = "form-color-editorWrap";
        editorWrap.innerHTML = html;
        Z.get(wrap).appendChild(editorWrap);

        that.vars = {
            "picker": Z.get("form-color-picker-" + idRandom),
            "hsbInput": Z.get("form-color-input-" + idRandom),
            "hCurren": Z.get("form-color-hsbH-current-" + idRandom),
            "sCurren": Z.get("form-color-hsbS-current-" + idRandom),
            "bCurren": Z.get("form-color-hsbB-current-" + idRandom),
            "aCurren": Z.get("form-color-hsbA-current-" + idRandom),
            "hRange": Z.get("form-color-hsbH-" + idRandom),
            "sRange": Z.get("form-color-hsbS-" + idRandom),
            "bRange": Z.get("form-color-hsbB-" + idRandom),
            "aRange": Z.get("form-color-hsbA-" + idRandom)
        }

        var currentRanges = [that.vars.hCurren, that.vars.sCurren, that.vars.bCurren, that.vars.aCurren],
            colorRanges = [that.vars.hRange, that.vars.sRange, that.vars.bRange, that.vars.aRange];

        for (var i = 0; i < 4; i++) {
            (function(index) {
                Z.on(currentRanges[index], "change", function() {
                    var maxNum = parseInt(this.getAttribute("max"), 10),
                        value = this.value;
                    if (value > maxNum) {
                        this.value = maxNum;
                    } else if (value < 0) {
                        this.value = 0;
                    }
                    var hsba = {
                        "h": currentRanges[0].value,
                        "s": currentRanges[1].value,
                        "b": currentRanges[2].value,
                        "a": currentRanges[3].value
                    },
                        initRangeHSB = ["initRangeH", "initRangeS", "initRangeB", "initRangeA"];
                    that.setColor({
                        "color": hsba,
                        "oType": "hsba",
                        "initControls": [initRangeHSB[index], "initInput"]
                    });
                });
                Z.on(colorRanges[index], "change", function() {
                    var hsba = {
                        "h": colorRanges[0].value,
                        "s": colorRanges[1].value,
                        "b": colorRanges[2].value,
                        "a": colorRanges[3].value
                    },
                        initCurrentHSB = ["initCurrentH", "initCurrentS", "initCurrentB", "initCurrentA"];
                    that.setColor({
                        "color": hsba,
                        "oType": "hsba",
                        "initControls": [initCurrentHSB[index], "initInput"]
                    });
                });
            })(i);
        }
        Z.on(that.vars.hsbInput, "change", function() {
            var value = Z.trim(this.value);
            that.setColor({
                "color": that.changeColor(value, "hsba"),
                "oType": "hsba"
            });
        });
        Z.on(that.vars.hsbInput, "focus", function() {
            Z.each(Z.getElementsByClassName("form-color-picker"), function(node) {
                Z.setStyle(node, "display", "none");
            });
            Z.setStyle(that.vars.picker, "display", "block");
        });
        that.setColor({
            "color": that.config.hsba,
            "oType": "hsba"
        });
    }

    ColorControl.prototype.initInput = function(color) {
        var input = this.vars.hsbInput;
        input.value = input.style.backgroundColor = color;
    }
    ColorControl.prototype.initRangeH = function(hsba) {
        this.vars.hRange.value = hsba.h;
    }
    ColorControl.prototype.initRangeS = function(hsba) {
        this.vars.sRange.value = hsba.s;
    }
    ColorControl.prototype.initRangeB = function(hsba) {
        this.vars.bRange.value = hsba.b;
    }
    ColorControl.prototype.initRangeA = function(hsba) {
        this.vars.aRange.value = hsba.a;
    }
    ColorControl.prototype.initCurrentH = function(hsba) {
        this.vars.hCurren.value = hsba.h;
    }
    ColorControl.prototype.initCurrentS = function(hsba) {
        this.vars.sCurren.value = hsba.s;
    }
    ColorControl.prototype.initCurrentB = function(hsba) {
        this.vars.bCurren.value = hsba.b;
    }
    ColorControl.prototype.initCurrentA = function(hsba) {
        this.vars.aCurren.value = hsba.a;
    }
    ColorControl.prototype.setColor = function(parms) {
        var that = this,
            hsba = typeof parms.color == "string" ? parms.color.replace(/\s/g, "") : parms.color,
            oType = parms.oType ? parms.oType : "",
            callback = parms.callback != undefined ? parms.callback : true,
            initControls = parms.initControls ? parms.initControls : ["initRangeH", "initRangeS", "initRangeB", "initRangeA", "initCurrentH", "initCurrentS", "initCurrentB", "initCurrentA", "initInput"];
        if (oType != "hsba") {
            hsba = that.changeColor(hsba, "hsba");
        }
        rgba = that.changeColor(hsba, "rgba", "hsba");

        if (rgba == "error") {
            Z.log("error rgba color");
            return;
        }

        if (typeof rgba == "string") {
            rgba = rgba.replace(/rgba\(|\)/g, "").split(",");
            rgba = {
                "r": rgba[0],
                "g": rgba[1],
                "b": rgba[2],
                "a": rgba[3]
            }
        }
        that.config.rgba = rgba;

        for (var i = 0, j = initControls.length; i < j; i++) {
            var cInit = initControls[i];
            if (cInit == "initInput") {
                that[cInit]("rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")");
            } else {
                that[cInit](hsba);
            }
        }

        that.config.hsba = hsba;
        if (callback) {
            that.onColorChange(rgba);
        }
    }
    ColorControl.prototype.onColorChange = function() {
        this.config.afterChange(this.getColor());
    }
    ColorControl.prototype.getColor = function() {
        var rgba = this.config.rgba;
        if (this.supportRGBA) {
            rgba = "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")";
        } else {
            rgba = "rgb(" + rgba.r + "," + rgba.g + "," + rgba.b + ")";
        }
        return rgba;
    }
    ColorControl.prototype.changeColor = function(color, nType, oType) {
        var that = this;
        if (/^transparent$/i.test(color)) {
            color = "rgba(0,0,0,0)";
        } else if (color in Z.color.keywords) {
            color = Z.color.keywords[color];
            color = {
                "r": color[0],
                "g": color[1],
                "b": color[2]
            }
        }
        oType = oType ? oType : that.getColorType(color);
        switch (oType) {
        case "hsba":
            if (nType == "hex") {
                return Z.color.rgbToHex(Z.color.hsbToRgb(color));
            } else if (nType == "rgba") {
                return Z.color.hsbToRgb(color);
            }
            break;
        case "hex":
            if (nType == "hsba") {
                return Z.color.rgbToHsb(Z.color.hexToRgb(Z.color.hexToComplate(color)));
            } else if (nType == "rgba") {
                return Z.color.hexToRgb(Z.color.hexToComplate(color));
            }
            break;
        case "rgb":
            if (nType == "hsba") {
                return Z.color.rgbToHsb(color);
            } else if (nType == "hex") {
                return Z.color.rgbToHex(color);
            }
            break;
        case "rgba":
            if (nType == "hsba") {
                return Z.color.rgbToHsb(color);
            } else if (nType == "hex") {
                return Z.color.rgbToHex(color);
            }
            break;
        default:
            return "error"
            break;
        }
        return color;
    }
    ColorControl.prototype.getColorType = function(color) {
        var that = this;
        if (that.ensureHSB(color)) {
            return "hsba";
        } else if (that.ensureHEX(color)) {
            return "hex";
        } else if (that.ensureRGB(color)) {
            return "rgb";
        } else if (that.ensureRGBA(color)) {
            return "rgba";
        }
        return "error";
    }
    ColorControl.prototype.ensureHSB = function(hsba) {
        var reg = /^\d$|^[1-9]\d$|^100$/;
        if (typeof hsb == "object" && /^\d$|^[1-9]\d$|^[1-2]\d{2}$|^3[0-5][0-9]$|^360$/.test(hsba.h) && reg.test(hsba.s) && reg.test(hsba.b)) {
            return true;
        }
        return false;
    }
    ColorControl.prototype.ensureHEX = function(hex) {
        if (typeof hex == "string" && /^#[0-9a-fA-F]{6}$|^#[0-9a-fA-F]{3}$/.test(hex)) {
            return true;
        }
        return false;
    }
    ColorControl.prototype.ensureRGB = function(rgb) {
        var reg = /^\d$|^[1-9]\d$|^1\d{2}$|^2[0-4]\d$|^25[0-5]$/;
        if (typeof rgb == "object" && reg.test(rgb.r) && reg.test(rgb.g) && reg.test(rgb.b)) {
            return true;
        } else if (typeof rgb == "string" && /^rgb\(((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\,){2}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\)$/.test(rgb)) {
            return true;
        }
        return false;
    }
    ColorControl.prototype.ensureRGBA = function(rgba) {
        var reg = /^\d$|^[1-9]\d$|^1\d{2}$|^2[0-4]\d$|^25[0-5]$/;
        if (typeof rgba == "object" && reg.test(rgba.r) && reg.test(rgba.g) && reg.test(rgba.b) && /^0|1|0\.\d+$/.test(rgba.a)) {
            return true;
        } else if (/^rgba(0, 0, 0, 0)$/.test(rgba)) {
            return true;
        } else if (typeof rgba == "string" && /^rgba\(((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\,){3}(0|1|0\.\d+)\)/.test(rgba)) {
            return true;
        }
        return false;
    }
    ColorControl.prototype.disable = function() {
        var controls = this.vars;
        controls.hsbInput.disabled = true;
        Z.setStyle(this.vars.picker, "display", "none");
    }
    ColorControl.prototype.able = function() {
        var controls = this.vars;
        controls.hsbInput.disabled = false;
        Z.setStyle(this.vars.picker, "display", "block");
    }
    Z.color.keywords = {
        "aliceblue": [240, 248, 255],
        "antiquewhite": [250, 235, 215],
        "aqua": [0, 255, 255],
        "aquamarine": [127, 255, 212],
        "azure": [240, 255, 255],
        "beige": [245, 245, 220],
        "bisque": [255, 228, 196],
        "black": [0, 0, 0],
        "blanchedalmond": [255, 235, 205],
        "blue": [0, 0, 255],
        "blueviolet": [138, 43, 226],
        "brown": [165, 42, 42],
        "burlywood": [222, 184, 135],
        "cadetblue": [95, 158, 160],
        "chartreuse": [127, 255, 0],
        "chocolate": [210, 105, 30],
        "coral": [255, 127, 80],
        "cornflowerblue": [100, 149, 237],
        "cornsilk": [255, 248, 220],
        "crimson": [220, 20, 60],
        "cyan": [0, 255, 255],
        "darkblue": [0, 0, 139],
        "darkcyan": [0, 139, 139],
        "darkgoldenrod": [184, 134, 11],
        "darkgray": [169, 169, 169],
        "darkgreen": [0, 100, 0],
        "darkgrey": [169, 169, 169],
        "darkkhaki": [189, 183, 107],
        "darkmagenta": [139, 0, 139],
        "darkolivegreen": [85, 107, 47],
        "darkorange": [255, 140, 0],
        "darkorchid": [153, 50, 204],
        "darkred": [139, 0, 0],
        "darksalmon": [233, 150, 122],
        "darkseagreen": [143, 188, 143],
        "darkslateblue": [72, 61, 139],
        "darkslategray": [47, 79, 79],
        "darkslategrey": [47, 79, 79],
        "darkturquoise": [0, 206, 209],
        "darkviolet": [148, 0, 211],
        "deeppink": [255, 20, 147],
        "deepskyblue": [0, 191, 255],
        "dimgray": [105, 105, 105],
        "dimgrey": [105, 105, 105],
        "dodgerblue": [30, 144, 255],
        "firebrick": [178, 34, 34],
        "floralwhite": [255, 250, 240],
        "forestgreen": [34, 139, 34],
        "fuchsia": [255, 0, 255],
        "gainsboro": [220, 220, 220],
        "ghostwhite": [248, 248, 255],
        "gold": [255, 215, 0],
        "goldenrod": [218, 165, 32],
        "gray": [128, 128, 128],
        "green": [0, 128, 0],
        "greenyellow": [173, 255, 47],
        "grey": [128, 128, 128],
        "honeydew": [240, 255, 240],
        "hotpink": [255, 105, 180],
        "indianred": [205, 92, 92],
        "indigo": [75, 0, 130],
        "ivory": [255, 255, 240],
        "khaki": [240, 230, 140],
        "lavender": [230, 230, 250],
        "lavenderblush": [255, 240, 245],
        "lawngreen": [124, 252, 0],
        "lemonchiffon": [255, 250, 205],
        "lightblue": [173, 216, 230],
        "lightcoral": [240, 128, 128],
        "lightcyan": [224, 255, 255],
        "lightgoldenrodyellow": [250, 250, 210],
        "lightgray": [211, 211, 211],
        "lightgreen": [144, 238, 144],
        "lightgrey": [211, 211, 211],
        "lightpink": [255, 182, 193],
        "lightsalmon": [255, 160, 122],
        "lightseagreen": [32, 178, 170],
        "lightskyblue": [135, 206, 250],
        "lightslategray": [119, 136, 153],
        "lightslategrey": [119, 136, 153],
        "lightsteelblue": [176, 196, 222],
        "lightyellow": [255, 255, 224],
        "lime": [0, 255, 0],
        "limegreen": [50, 205, 50],
        "linen": [250, 240, 230],
        "magenta": [255, 0, 255],
        "maroon": [128, 0, 0],
        "mediumaquamarine": [102, 205, 170],
        "mediumblue": [0, 0, 205],
        "mediumorchid": [186, 85, 211],
        "mediumpurple": [147, 112, 219],
        "mediumseagreen": [60, 179, 113],
        "mediumslateblue": [123, 104, 238],
        "mediumspringgreen": [0, 250, 154],
        "mediumturquoise": [72, 209, 204],
        "mediumvioletred": [199, 21, 133],
        "midnightblue": [25, 25, 112],
        "mintcream": [245, 255, 250],
        "mistyrose": [255, 228, 225],
        "moccasin": [255, 228, 181],
        "navajowhite": [255, 222, 173],
        "navy": [0, 0, 128],
        "oldlace": [253, 245, 230],
        "olive": [128, 128, 0],
        "olivedrab": [107, 142, 35],
        "orange": [255, 165, 0],
        "orangered": [255, 69, 0],
        "orchid": [218, 112, 214],
        "palegoldenrod": [238, 232, 170],
        "palegreen": [152, 251, 152],
        "paleturquoise": [175, 238, 238],
        "palevioletred": [219, 112, 147],
        "papayawhip": [255, 239, 213],
        "peachpuff": [255, 218, 185],
        "peru": [205, 133, 63],
        "pink": [255, 192, 203],
        "plum": [221, 160, 221],
        "powderblue": [176, 224, 230],
        "purple": [128, 0, 128],
        "red": [255, 0, 0],
        "rosybrown": [188, 143, 143],
        "royalblue": [65, 105, 225],
        "saddlebrown": [139, 69, 19],
        "salmon": [250, 128, 114],
        "sandybrown": [244, 164, 96],
        "seagreen": [46, 139, 87],
        "seashell": [255, 245, 238],
        "sienna": [160, 82, 45],
        "silver": [192, 192, 192],
        "skyblue": [135, 206, 235],
        "slateblue": [106, 90, 205],
        "slategray": [112, 128, 144],
        "slategrey": [112, 128, 144],
        "snow": [255, 250, 250],
        "springgreen": [0, 255, 127],
        "steelblue": [70, 130, 180],
        "tan": [210, 180, 140],
        "teal": [0, 128, 128],
        "thistle": [216, 191, 216],
        "tomato": [255, 99, 71],
        "turquoise": [64, 224, 208],
        "violet": [238, 130, 238],
        "wheat": [245, 222, 179],
        "white": [255, 255, 255],
        "whitesmoke": [245, 245, 245],
        "yellow": [255, 255, 0],
        "yellowgreen": [154, 205, 50]
    };
    /**
     *@name:form gradient
     *@author:zhouqicf@gmail.com
     *@site:www.zhouqicf.com
     *@version:1-0-0
     */

    function GradientControl(wrap, param) {
        var that = this,
            defaultGradient;

        if (Z.browser.webkit) {
            that.defaultGradient = "-webkit-gradient(linear, 0% 0%, 100% 0%, from(#000), to(#fff))";
        } else if (Z.browser.gecko) {
            that.defaultGradient = "-moz-linear-gradient(left , #000 0%, #fff 100%)";
        } else if (Z.browser.opera) {
            that.defaultGradient = "-o-linear-gradient(left , #000 0%, #fff 100%)";
        } else if (Z.browser.ie) {
            that.defaultGradient = "-ms-linear-gradient(left , #000 0%, #fff 100%)";
        }

        that.config = {
            "gradient": param.gradient ? param.gradient : that.defaultGradient,
            "panelWidth": param.panelWidth,
            "afterChange": param.afterChange ? param.afterChange : function() {},
            "isAll": param.isAll ? true : false,
            "stopClassName": "form-gradient-stop"
        };

        var randomNum = Math.ceil(Math.random() * 100000000000),
            ids = {
                panel: "form-gradient-panel-" + randomNum,
                panelWrap: "form-gradient-panel-wrap" + randomNum,
                stops: "form-gradient-stops-" + randomNum,
                color: "form-gradient-color-" + randomNum,
                location: "form-gradient-location-" + randomNum,
                button: "form-gradient-stop-delete-button-" + randomNum,
                orientation: "form-gradient-orientation-" + randomNum,
                stopDetail: "form-gradient-stop-detail" + randomNum
            };

        var html = '<div class="form-gradient-panel-wrap" id="' + ids.panelWrap + '"><div class="form-gradient-panel" id="' + ids.panel + '"></div></div>' + '<div class="form-gradient-stops" id="' + ids.stops + '"></div>' + '<div class="form-gradient-orientation-wrap">' + '	<label class="form-gradient-label" for="' + ids.orientation + '">Orientation:</label>' + '	<select class="form-gradient-orientation" id="' + ids.orientation + '">' + '		<option value="horizontal">horizontal</option>' + '		<option value="vertical">vertical</option>' + '	</select>' + '</div>' + '<div class="form-gradient-stop-detail" id="' + ids.stopDetail + '">' + '	<div class="form-gradient-color-wrap">' + '		<label class="form-gradient-label">Color:</label>' + '		<div class="form-gradient-color" id="' + ids.color + '"></div>' + '	</div>' + '	<div class="form-gradient-location-wrap">' + '		<label for="' + ids.location + '" class="form-gradient-label">Location:</label>' + '		<input type="text" class="form-gradient-location" id="' + ids.location + '"> %' + '	</div>' + '	<div class="form-gradient-stop-delete">' + '		<button class="form-gradient-stop-delete-button" id="' + ids.button + '">delete</button>' + '	</div>' + '</div>';

        //create nodes
        var gradientWrap = document.createElement("div");
        gradientWrap.className = "form-gradient-wrap";
        gradientWrap.innerHTML = html;
        Z.get(wrap).appendChild(gradientWrap);

        that.vars = {
            panel: Z.get(ids.panel),
            panelWrap: Z.get(ids.panelWrap),
            stops: Z.get(ids.stops),
            color: Z.get(ids.color),
            location: Z.get(ids.location),
            button: Z.get(ids.button),
            orientation: Z.get(ids.orientation),
            stopDetail: Z.get(ids.stopDetail),
            id: 0,
            colorControl: null,
            currentStop: null,
            disable: false
        };
        that.vars.panelWidth = that.config.panelWidth ? that.config.panelWidth : that.vars.panel.clientWidth;
        Z.setStyle(that.vars.panel, "width", that.vars.panelWidth + "px");
        Z.setStyle(that.vars.panelWrap, "width", that.vars.panelWidth + "px");

        that.rule = {
            type: "",
            orientation: "",
            stops: []
        };

        Z.loader("color", function() {
            that.vars.colorControl = new ColorControl(ids.color, {
                "color": "#f00",
                "afterChange": function(hex) {
                    var cStop = that.vars.currentStop;
                    if (!cStop || that.vars.disable) {
                        return;
                    }
                    that.rule.stops[cStop.getAttribute("index")].color = hex;
                    Z.setStyle(cStop, "backgroundColor", hex);
                    that.updatePanel();
                }
            });

            //init
            that.init();
        });

        Z.on(that.vars.orientation, "change", function(e) {
            that.rule.orientation = this.value;
            that.updatePanel();
        });
        Z.on(that.vars.stops, "click", function(e) {
            if (e.target.nodeName.toLowerCase() == "i" || that.vars.disable) {
                return;
            }
            var s = {
                "color": that.vars.colorControl.getColor(),
                "position": that.getFloatLeft(e.clientX - Z.getBoundingClientRect(that.vars.panel).x)
            };
            that.addStops([s]);
            that.updatePanel();
        });
        Z.on(that.vars.location, "change", function(e) {
            var cStop = that.vars.currentStop;
            if (!cStop) {
                return;
            }
            var left = this.value;
            if (!/^100$|^[1-9]\d$|^\d$/.test(left)) {
                return;
            }
            left = Z.percentToFloat(left + "%");
            that.rule.stops[cStop.getAttribute("index")].position = left;
            Z.setStyle(cStop, "left", that.getPixLeft(left));
            that.updatePanel();
        });
        Z.on(that.vars.button, "click", function(e) {
            var cStop = that.vars.currentStop;
            //that.vars.stops.getElementsByTagName("i").length <= 2
            if (!cStop) {
                return;
            }
            delete that.rule.stops[cStop.getAttribute("index")];
            that.vars.stops.removeChild(cStop);
            that.vars.colorControl.disable();
            that.vars.location.disabled = that.vars.button.disabled = true;
            that.updatePanel();
        });
    }
    GradientControl.prototype.init = function() {
        this.updateRule();
        this.updateContorls();
    }
    GradientControl.prototype.updateRule = function(gradient, ifCallback) {
        var gradient = gradient || this.config.gradient,
            rule = this.rule,
            stops = [];
        if (Z.browser.webkit) {
            gradient = gradient.replace(/\s*,\s*/g, ",").replace("-webkit-gradient(", "").replace(/\)$/, "").split(/,(?=[fct])/);
            var part1 = gradient[0].split(",");
            rule.type = part1[0];
            rule.orientation = part1[1] + "," + part1[2];
            rule.orientation = rule.orientation == "0% 0%,100% 0%" ? "horizontal" : "vertical";
            for (var i = 1, j = gradient.length; i < j; i++) {
                var c = gradient[i];
                if (/color/.test(c)) {
                    c = c.replace("color-stop(", "").replace(/\)$/, "").split(/,(?=r)/);
                } else if (/from/.test(c)) {
                    c = [0, c.replace(/from\(/, "").replace(/\)$/, "")];
                } else {
                    c = [1, c.replace(/to\(/, "").replace(/\)$/, "")];
                }
                stops.push({
                    "position": c[0],
                    "color": c[1]
                });
            }
            this.addStops(stops, ifCallback);
        } else if (Z.browser.gecko || Z.browser.opera || Z.browser.ie) {
            gradient = gradient.replace(/\s*,\s*/g, ",").replace(/-(moz|o|ms)-linear-gradient\(/, "").replace(/\)$/, "").split(/,(?=[r#])/);
            rule.type = "linear";
            rule.orientation = gradient[0];
            rule.orientation = rule.orientation == "left" ? "horizontal" : "vertical";
            for (var i = 1, j = gradient.length; i < j; i++) {
                var c = gradient[i].split(" ");
                stops.push({
                    "position": Z.percentToFloat(c[1]),
                    "color": c[0]
                });
            }
            this.addStops(stops, ifCallback);
        }
    }
    GradientControl.prototype.updateContorls = function(ifCallback) {
        this.updatePanel(ifCallback);
        this.updateOrientation();
    }
    GradientControl.prototype.updatePanel = function(ifCallback) {
        var that = this;
        Z.setStyle(that.vars.panel, "backgroundImage", that.getGradient(true));
        if (ifCallback != false) {
            that.config.afterChange(that.getGradient(false, that.config.isAll));
        }
    }
    GradientControl.prototype.updateOrientation = function() {
        this.vars.orientation.value = this.rule.orientation;
    }
    GradientControl.prototype.setGradient = function(parms) {
        var gradient = parms.gradient ? parms.gradient : this.defaultGradient;
        this.removeStops();
        this.updateRule(gradient, parms.callback);
        this.updateContorls(parms.callback);
    }
    GradientControl.prototype.addStops = function(stops, ifCallback) {
        var that = this;
        Z.each(stops, function(s) {
            var id = that.vars.id;
            that.rule.stops[id] = s;
            that.createStop(s, id, ifCallback);
            that.vars.id++;
        });
    }
    GradientControl.prototype.createStop = function(s, id, ifCallback) {
        var that = this,
            stopClassName = that.config.stopClassName,
            panelWidth = that.vars.panelWidth;
        i = document.createElement("i"), p = that.getPixLeft(s.position);
        i.className = stopClassName;
        i.setAttribute("index", id);
        Z.setStyle(i, "left", p);
        Z.setStyle(i, "backgroundColor", s.color);
        that.vars.stops.appendChild(i);
        that.initStopEvent(i, id);
        that.changeCurrentStop(i, ifCallback);
    }
    GradientControl.prototype.initStopEvent = function(node, id) {
        var preX, preEventX, drag = false,
            that = this;
        panelWidth = that.vars.panelWidth;
        Z.on(node, "mousedown", function(e) {
            if (that.vars.disable) {
                return;
            }
            Z.setStyle(document.documentElement, "webkitUserSelect", "none");
            that.changeCurrentStop(node);
            drag = true;
            preX = that.getPixLeft(that.rule.stops[id].position, true);
            preEventX = e.pageX;
        });
        Z.on(document, "mouseup", function(e) {
            if (drag || !that.vars.disable) {
                Z.setStyle(document.documentElement, "webkitUserSelect", "");
                drag = false;
            }
        });
        Z.on(document, "mousemove", function(e) {
            if (!drag || that.vars.disable) {
                return;
            }
            var left = preX + (e.pageX - preEventX);
            if (left < -5 || left > panelWidth - 5) {
                return;
            }
            Z.setStyle(node, "left", left + "px");
            var floatLeft = that.getFloatLeft(left);
            that.rule.stops[id].position = floatLeft;
            that.vars.location.value = Z.floatToPercent(floatLeft, true);
            that.updatePanel();
        });
    }
    GradientControl.prototype.changeCurrentStop = function(s, ifCallback) {
        var that = this,
            preStop = that.vars.currentStop,
            selectClassName = "form-gradient-stop-select",
            cStop = that.rule.stops[s.getAttribute("index")];
        if (preStop) {
            Z.removeClass(preStop, selectClassName);
        }
        Z.addClass(s, selectClassName);
        that.vars.currentStop = s;
        that.vars.colorControl.able();
        that.vars.location.disabled = that.vars.button.disabled = false;
        that.vars.colorControl.setColor({
            "color": cStop.color,
            "callback": ifCallback == false ? false : true
        });
        that.vars.location.value = Z.floatToPercent(cStop.position, true);
    }
    GradientControl.prototype.removeStops = function() {
        var wrap = this.vars.stops;

        this.rule.stops = [];
        Z.removeChildren(wrap, wrap.getElementsByTagName("i"));
    }
    GradientControl.prototype.getGradient = function(isPanel, isAll) {
        var rule = this.rule,
            tempStops = [].concat(rule.stops),
            stops = {
                webkit: "",
                moz: ""
            },
            orientation = {},
            webkit, moz, o, ms;
        if (rule.orientation == "horizontal" || isPanel) {
            orientation = {
                "webkit": "0% 0%,100% 0%",
                "moz": "left"
            }
        } else {
            orientation = {
                "webkit": "0% 0%,0% 100%",
                "moz": "top"
            }
        }
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
            if (p == 0) {
                stops.webkit += ",from(" + c + ")";
            } else if (p == 1) {
                stops.webkit += ",to(" + c + ")";
            } else {
                stops.webkit += ",color-stop(" + p + "," + c + ")";
            }
            stops.moz += "," + c + " " + Z.floatToPercent(p);
        }
        webkit = "-webkit-gradient(" + rule.type + "," + orientation.webkit + stops.webkit + ")";
        moz = "-moz-linear-gradient(" + orientation.moz + stops.moz + ")";
        o = "-o-linear-gradient(" + orientation.moz + stops.moz + ")";
        ms = "-ms-linear-gradient(" + orientation.moz + stops.moz + ")";
        if (isAll) {
            return {
                "webkit": webkit,
                "moz": moz,
                "o": o,
                "ms": ms
            };
        }

        if (Z.browser.webkit) {
            return webkit;
        } else if (Z.browser.gecko) {
            return moz;
        } else if (Z.browser.opera) {
            return o;
        } else if (Z.browser.ie) {
            return ms;
        }
    }
    GradientControl.prototype.getFloatLeft = function(leftPix) {
        var floatLeft = ((leftPix + 5) / this.vars.panelWidth).toFixed(2);
        if (floatLeft > 1) {
            return 1;
        }
        if (floatLeft < 0) {
            return 0;
        }
        return floatLeft;
    }
    GradientControl.prototype.getPixLeft = function(leftFloat, isNum) {
        var panelWidth = this.vars.panelWidth,
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
    }
    GradientControl.prototype.disable = function() {
        var vars = this.vars;
        vars.colorControl.disable();
        vars.orientation.disabled = vars.location.disabled = vars.button.disabled = vars.disable = true;
    }
    GradientControl.prototype.able = function() {
        var vars = this.vars;
        vars.colorControl.able();
        vars.orientation.disabled = vars.location.disabled = vars.button.disabled = vars.disable = false;
    }
    //common function

    function $(id) {
        return Z.get(id);
    }

    function getComputedStyle(node, property) {
        return window.getComputedStyle(node, null)[property];
    }

    function getStyle(node, property) {
        if (node.length) {
            node = node[0];
        }
        if (property) {
            property = Z.cssExtension(property);
            switch (property) {
            case "borderTop":
                property = ["borderTopWidth", "borderTopStyle", "borderTopColor"];
                break;
            case "borderRight":
                property = ["borderRightWidth", "borderRightColor", "borderRightStyle"];
                break;
            case "borderBottom":
                property = ["borderBottomWidth", "borderBottomColor", "borderBottomStyle"];
                break;
            case "borderLeft":
                property = ["borderLeftWidth", "borderLeftColor", "borderLeftStyle"];
                break;
            case "borderRadius":
                property = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"];
                break;
            case "padding":
                property = ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"];
                break;
            case "margin":
                property = ["marginTop", "marginRight", "marginBottom", "marginLeft"];
                break;
            case "listStyle":
                property = ["listStylePosition", "listStyleType"];
                break;
            }
            if (typeof property == "string") {
                return getComputedStyle(node, property);
            } else {
                var value = [];
                for (var i = 0, j = property.length; i < j; i++) {
                    value[i] = getComputedStyle(node, property[i]);
                }
                return value.join(" ");
            }
        } else {
            return node.getAttribute("style");
        }
    }

    function getCombinedStyle(style) {
        var styles = Z.trim(style).split(";"),
            cssRules = {},
            styleProperty = "",
            deleteFun = function(array) {
                Z.each(array, function(n) {
                    delete cssRules[n];
                });
            },
            layoutFun = function(list, property, defaultValue, space) {
                var t = cssRules[list[0]],
                    r = cssRules[list[1]],
                    b = cssRules[list[2]],
                    l = cssRules[list[3]];
                if (t || r || b || l) {
                    t = t ? t : defaultValue;
                    r = r ? r : defaultValue;
                    b = b ? b : defaultValue;
                    l = l ? l : defaultValue;
                    if (t == r && t == b && t == l) {
                        cssRules[property] = t;
                    } else {
                        cssRules[property] = t + space + r + space + b + space + l;
                    }
                    deleteFun(list);
                }
            };
        for (var i = 0, j = styles.length - 1; i < j; i++) {
            if (styles[i] == "") {
                continue;
            }
            var s = styles[i].split(/:(?!\/\/)/),
                //url(http://xxx)
                s0 = Z.trim(s[0]),
                s1 = Z.trim(s[1]);
            /*
            cssRules[s0] = s1.replace(/rgb\([^\)]+\)/g, function(color) {
                return Z.color.rgbToHex(color);
            });
            */
            cssRules[s0] = s1;
        }
        //combine border
        var borderTop = ["border-top-width", "border-top-style", "border-top-color"],
            borderRight = ["border-right-width", "border-right-style", "border-right-color"],
            borderBottom = ["border-bottom-width", "border-bottom-style", "border-bottom-color"],
            borderLeft = ["border-left-width", "border-left-style", "border-left-color"],
            borders = {
                "border-top": borderTop,
                "border-right": borderRight,
                "border-bottom": borderBottom,
                "border-left": borderLeft
            };
        if (
        typeof cssRules[borderTop[0]] != "undefined" && typeof cssRules[borderTop[1]] != "undefined" && typeof cssRules[borderTop[2]] != "undefined" && cssRules[borderTop[0]] == cssRules[borderRight[0]] && cssRules[borderTop[0]] == cssRules[borderBottom[0]] && cssRules[borderTop[0]] == cssRules[borderLeft[0]] && cssRules[borderTop[1]] == cssRules[borderRight[1]] && cssRules[borderTop[1]] == cssRules[borderBottom[1]] && cssRules[borderTop[1]] == cssRules[borderLeft[1]] && cssRules[borderTop[2]] == cssRules[borderRight[2]] && cssRules[borderTop[2]] == cssRules[borderBottom[2]] && cssRules[borderTop[2]] == cssRules[borderLeft[2]]) {
            if (cssRules[borderTop[1]] == "none" || cssRules[borderTop[0]] == "0px") {
                cssRules["border"] = "none";
            } else {
                cssRules["border"] = cssRules[borderTop[0]] + " " + cssRules[borderTop[1]] + " " + cssRules[borderTop[2]];
            }
            for (var i in borders) {
                var b = borders[i];
                for (var j = 0; j < 3; j++) {
                    delete cssRules[b[j]];
                }
            }
        } else {
            for (var i in borders) {
                var b = borders[i];
                if (cssRules[b[0]] && cssRules[b[1]] && cssRules[b[2]]) {
                    if (cssRules[b[1]] == "none" || cssRules[b[0]] == "0px") {
                        cssRules[i] = "none";
                    } else {
                        cssRules[i] = cssRules[b[0]] + " " + cssRules[b[1]] + " " + cssRules[b[2]];
                    }
                    deleteFun(b);
                }
            }
        }
        //combine padding
        layoutFun(["padding-top", "padding-right", "padding-bottom", "padding-left"], "padding", "0px", " ");
        //combine margin
        layoutFun(["margin-top", "margin-right", "margin-bottom", "margin-left"], "margin", "0px", " ");
        //combine border-radius
        layoutFun(["border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius"], "border-radius", "0px 0px", ",");


        for (var i in cssRules) {
            //css3
            if (i == "-webkit-box-shadow") {
                styleProperty += ("-webkit-box-shadow:" + cssRules[i] + ";-moz-box-shadow:" + cssRules[i] + ";box-shadow:" + cssRules[i] + ";");
            } else if (i == "border-radius") {
                styleProperty += ("-moz-border-radius:" + cssRules[i] + ";border-radius:" + cssRules[i] + ";");
            } else if (i == "background-image") {
                var _gradients = CONTROLS.backgroundImage.getGradient(false, true);
                styleProperty += ("background-image:" + cssRules[i] + ";background-image:" + _gradients.moz + ";background-image:" + _gradients.o + ";background-image:" + _gradients.ms + ";");
            } else {
                styleProperty += i + ":" + cssRules[i] + ";";
            }
        }
        return styleProperty;
    }

    function setStyle(nodes, property, value) {
        Z.setStyle(nodes, property, value);
        updateStyles();
    }

    function getAttr(nodes, property) {
        if (nodes.length) {
            nodes = nodes[0];
        }
        return Z.getAttr(nodes, property);
    }

    function getAbsolutePath(url) {
        var a = document.createElement('a');
        a.href = url;
        return a.href;
    }

    //vars
    var codeColaCurrentNode = "",
        CONTROLS = {},
        mutilStart = false,
        mutilNodes = [],
        CLASS_selecting = "codeCola-selecting",
        SCRIPT_codeCola = '<script>' + '	var getElementsByClassName = function(className,tagName){' + '			if(typeof document.getElementsByClassName == "function"){' + '					return document.getElementsByClassName(className);' + '			}else{' + '					var allNodes = document.getElementsByTagName(tagName?tagName:"*"),' + '							nodes = [];' + '					for(var i=0,j=allNodes.length;i<j;i++){' + '							var c = allNodes[i];' + '							if(c.className.indexOf(className) != -1){' + '									nodes.push(c);' + '							}' + '					}' + '					return nodes;' + '			}' + '	};' + '	var codeColaNotes = getElementsByClassName("codeCola-note","span");' + '	for(var i=0,j=codeColaNotes.length;i<j;i++){' + '			codeColaNotes[i].onmouseover = function(){' + '					var targets = getElementsByClassName(this.id);' + '					for(var k=0,l=targets.length;k<l;k++){' + '						targets[k].className+=" codeCola-selecting";' + '					}' + '			};' + '			codeColaNotes[i].onmouseout = function(){' + '					var targets = getElementsByClassName(this.id);' + '					for(var k=0,l=targets.length;k<l;k++){' + '						targets[k].className = targets[k].className.replace(" codeCola-selecting","");' + '					}' + '			}' + '	}' + '</script>';

    //create nodes
    var HTML_editItems = '<div id="codeCola" class="codeCola-wrap">' + '  <div id="codeCola-option"><div id="codeCola-drag"></div><div id="codeCola-fold" title="' + getMSG("opt_fold") + '"><ccs></ccs><ccb></ccb></div><cci id="codeCola-show-about" title="' + getMSG("opt_about") + '">!</cci></div>' + '  <div id="codeCola-current-info"><cccode id="codeCola-current-node">none</cccode> x <cccode id="codeCola-current-node-count">0</cccode><vabbr id="codeCola-show-currentNode" title="' + getMSG("opt_cNode") + '">?</vabbr><cci id="codeCola-open-all" title="' + getMSG("opt_unfoldAll") + '"><ccb></ccb><ccu></ccu></cci><cci id="codeCola-getNote" title="' + getMSG("opt_showNote") + '" class="codeCola-opt-button"></cci><cci id="codeCola-getStyles" title="' + getMSG("opt_showStyle") + '" class="codeCola-opt-button">{}</cci><cci id="codeCola-getHTML" title="' + getMSG("opt_html") + '" class="codeCola-opt-button">&lt;&gt;</cci><cci id="codeCola-getLink" title="' + getMSG("opt_link") + '" class="codeCola-opt-button"></cci><cci id="codeCola-switch" title="' + getMSG("opt_turnOff") + '" class="codeCola-opt-button cc-open"></cci></div>' + '  <textarea id="codeCola-styles"></textarea>' + '  <textarea id="codeCola-note"></textarea>' + '  <ul id="codeCola-controls" class="cc-close">' + '  </ul>' + '</div>' + '<div id="codeCola-selectors" class="codeCola-wrap"></div>' + '<div id="codeCola-notes-wrap"></div>' + '<div id="codeCola-getHTML-wrap" class="codeCola-pop codeCola-wrap">' + '  <span id="codeCola-getHTML-title" class="codeCola-pop-title">HTML</span><cci id="codeCola-getHTML-close" class="codeCola-pop-close" title="' + getMSG("opt_close") + '">×</cci>' + '  <textarea id="codeCola-getHTML-content"></textarea>' + '</div>' + '<div id="codeCola-getLink-wrap" class="codeCola-pop codeCola-wrap">' + '  <span id="codeCola-getLink-title" class="codeCola-pop-title">URL</span><cci id="codeCola-getLink-close" class="codeCola-pop-close" title="' + getMSG("opt_close") + '">×</cci>' + '  <input id="codeCola-getLink-content">' + '</div>' + '<div id="codeCola-about-wrap" class="codeCola-pop codeCola-wrap">' + '  <span id="codeCola-about-title" class="codeCola-pop-title">About</span><cci id="codeCola-about-close" class="codeCola-pop-close" title="' + getMSG("opt_close") + '">×</cci>' + '  <div id="codeCola-about-content">' + '    <div id="codeCola-about-global" style="background-image:url(' + chrome.extension.getURL('128.png') + ')">' + '      <cctitle id="codeCola-about-name">Code Cola</cctitle>' + '      <p id="codeCola-about-version">v2.3.0</p>' + '    </div>' + '    <div id="codeCola-about-detail">' + '      <p id="codeCola-about-doc">Code Cola <a href="http://www.zhouqicf.com/code-cola" target="_blank">Documentation</a>, <a href="https://chrome.google.com/extensions/detail/lomkpheldlbkkfiifcbfifipaofnmnkn" target="_blank">Chrome extension</a>, <a href="https://github.com/zhouqicf/code-cola" target="_blank">Source</a></p>' + '      <p id="codeCola-about-author">© 2010 <a rel="work" href="http://www.koubei.com" target="_blank">KouBei</a> <a rel="team" href="http://ued.koubei.com" target="_blank">UED</a> - created by <a href="http://www.zhouqicf.com/about" target="_blank">Zhou Qi</a></p>' + '    </div>' + '  </div>' + '</div>';
    var editWrap = document.createElement("div");
    editWrap.innerHTML = HTML_editItems;
    document.getElementsByTagName("html")[0].appendChild(editWrap);


    var STYLE_codeCola = "";
    chrome.extension.sendRequest("getStyle", function(response) {
        STYLE_codeCola = decodeURIComponent(response.css);
        var styleSheet = document.createElement("style");
        styleSheet.innerHTML = STYLE_codeCola;
        document.getElementsByTagName("head")[0].appendChild(styleSheet);
    });

    //var nodes
    var NODE_codecola = $("codeCola"),
        NODE_itemsWrap = NODE_codecola.getElementsByTagName("ul")[0],
        NODE_cStyle = $("codeCola-styles"),
        NODE_cNote = $("codeCola-note"),
        NODE_selectorWrap = $("codeCola-selectors"),
        NODE_getHtmlWrap = $("codeCola-getHTML-wrap"),
        NODE_getLinkWrap = $("codeCola-getLink-wrap"),
        NODE_getHtmlContent = $("codeCola-getHTML-content"),
        NODE_getLinkContent = $("codeCola-getLink-content"),
        NODE_currentNode = $("codeCola-current-node"),
        NODE_cNodeCount = $("codeCola-current-node-count"),
        NODE_showCurrentNode = $("codeCola-show-currentNode"),
        NODE_notesWrap = $("codeCola-notes-wrap");

    //html
    var HTMLS = {
        "fontSize": '<cctitle><label for="codeCola-fontSize">' + getMSG("style_fz") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + getMSG("opt_hide") + '" data="fontSize"></cci><cci class="codeCola-cancel" title="' + getMSG("opt_undo") + '" data="fontSize"></cci></cctitle>' + '<div class="codeCola-editorWrap"><input type="range" min="10" max="100" id="codeCola-fontSize"/><input type="text" class="codeCola-currentStyle" name="fontSize" min="10"/> (px)</div>',
        "lineHeight": '<cctitle><label for="codeCola-lineHeight">' + getMSG("style_lh") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + getMSG("opt_hide") + '" data="lineHeight"></cci><cci class="codeCola-cancel" title="' + getMSG("opt_undo") + '" data="lineHeight"></cci></cctitle>' + '<div class="codeCola-editorWrap"><input type="range" min="1" max="10" id="codeCola-lineHeight" step="0.1"/><input type="text" class="codeCola-currentStyle" name="lineHeight" min="10"/></div>',
        "fontFamily": '<cctitle><label for="codeCola-fontFamily">' + getMSG("style_ff") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + getMSG("opt_hide") + '" data="fontFamily"></cci><cci class="codeCola-cancel" title="' + getMSG("opt_undo") + '" data="fontFamily"></cci></cctitle>' + '<div class="codeCola-editorWrap">' + '  <select id="codeCola-fontFamily">' + '	   <optgroup label="Chinese">' + '	   <option selected="seleted" value="\u5B8B\u4F53,Serif">' + getMSG("style_ff_simsun") + '</option>' + '      <option value="\u5FAE\u8F6F\u96C5\u9ED1,\u9ED1\u4F53,Sans-Serif">' + getMSG("style_ff_MSYH") + '</option>' + '      <option value="\u9ED1\u4F53,Sans-Serif">' + getMSG("style_ff_simhei") + '</option>' + '      <option value="\u5E7C\u5706,Sans-Serif">' + getMSG("style_ff_youyuan") + '</option>' + '    </optgroup>' + '    <optgroup label="English">' + '      <option value="Helvetica,tahoma,Arial,Sans-Serif">Helvetica</option>' + '      <option value="Arial,Helvetica,tahoma,Sans-Serif">Arial</option>' + '      <option value="tahoma,Helvetica,Arial,Sans-Serif">tahoma</option>' + '      <option value="\'Lucida Grande\', Helvetica,Arial,Sans-Serif">Lucida Grande</option>' + '      <option value="Georgia,Serif">Georgia</option>' + '    </optgroup>' + '  </select>' + '</div>',
        "fontOther": '<cctitle><label>' + getMSG("style_fs") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + getMSG("opt_hide") + '" data="fontWeight,fontStyle,textDecoration" mutil="fontOther"></cci><cci class="codeCola-cancel" title="' + getMSG("opt_undo") + '" data="fontWeight,fontStyle,textDecoration" mutil="fontOther"></cci></cctitle>' + '<div class="codeCola-editorWrap"><label><input type="checkbox" value="bold" name="fontWeight" id="codeCola-fontWeight"> ' + getMSG("style_fs_bold") + '</label> <label><input type="checkbox" value="italic" name="fontStyle" id="codeCola-fontStyle"> ' + getMSG("style_fs_italic") + '</label> <label><input type="checkbox" value="underline" name="textDecoration" id="codeCola-textDecoration"> ' + getMSG("style_fs_underline") + '</div>',
        "textAlign": '<cctitle><label>' + getMSG("style_ta") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + getMSG("opt_hide") + '" data="textAlign"></cci><cci class="codeCola-cancel" title="' + getMSG("opt_undo") + '" data="textAlign"></cci></cctitle>' + '<div class="codeCola-editorWrap"><label><input type="radio" value="left" name="textAlign" id="codeCola-textAlignLeft"> ' + getMSG("style_ta_left") + '</label> <label><input type="radio" value="center" name="textAlign" id="codeCola-textAlignCenter"> ' + getMSG("style_ta_center") + '</label> <label><input type="radio" value="right" name="textAlign" id="codeCola-textAlignRight"> ' + getMSG("style_ta_right") + '</div>',
        "color": '<cctitle><label for="codeCola-color">' + getMSG("style_c") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + getMSG("opt_hide") + '" data="color"></cci><cci class="codeCola-cancel" title="' + getMSG("opt_undo") + '" data="color"></cci></cctitle>' + '<div class="codeCola-editorWrap" id="codeCola-color"></div>',
        "textShadow": '<cctitle><label>' + getMSG("style_ts") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + getMSG("opt_hide") + '" data="textShadow"></cci><cci class="codeCola-cancel" title="' + getMSG("opt_undo") + '" data="textShadow"></cci></cctitle>' + '<div class="codeCola-editorWrap">' + '		<ccfieldset id="codeCola-textShadowWrap">' + '			<ol>' + '				<li><label>Degree:</label><div id="codeCola-textShadowDegree"></div></li>' + '				<li><label for="codeCola-textShadowDistance">Distance:</label><input type="range" min="0" max="100" id="codeCola-textShadowDistance" name="textShadowDistance"/><input type="text" class="codeCola-currentStyle" name="textShadowDistance"/> (px)</li>' + '				<li><label for="codeCola-textShadowSize">Size:</label><input type="range" min="0" max="100" id="codeCola-textShadowSize" name="textShadowSize"/><input type="text" class="codeCola-currentStyle" name="textShadowSize" min="0"/> (px)</li>' + '				<li><label for="codeCola-textShadowColor">Color:</label><div id="codeCola-textShadowColor"></div></li>' + '			</ol>' + '		</ccfieldset>' + '</div>',
        "backgroundColor": '<cctitle><label for="codeCola-backgroundColor">' + getMSG("style_bc") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + getMSG("opt_hide") + '" data="backgroundColor"></cci><cci class="codeCola-cancel" title="' + getMSG("opt_undo") + '" data="backgroundColor"></cci></cctitle>' + '<div class="codeCola-editorWrap" id="codeCola-backgroundColor"></div>',
        "backgroundImage": '<cctitle><label>' + getMSG("style_lg") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + getMSG("opt_hide") + '" data="backgroundImage"></cci><cci class="codeCola-cancel" title="' + getMSG("opt_undo") + '" data="backgroundImage"></cci></cctitle>' + '<div class="codeCola-editorWrap" id="codeCola-backgroundImage"></div>',
        "opacity": '<cctitle><label for="codeCola-opacity">' + getMSG("style_op") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + getMSG("opt_hide") + '" data="opacity"></cci><cci class="codeCola-cancel" title="' + getMSG("opt_undo") + '" data="opacity"></cci></cctitle>' + '<div class="codeCola-editorWrap"><input type="range" min="0" max="1" id="codeCola-opacity" step="0.01"/><input type="text" class="codeCola-currentStyle" name="fontSize" min="0" max="1"/></div>',
        "boxShadow": '<cctitle><label>' + getMSG("style_bs") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + getMSG("opt_hide") + '" data="boxShadow"></cci><cci class="codeCola-cancel" title="' + getMSG("opt_undo") + '" data="boxShadow"></cci></cctitle>' + '<div class="codeCola-editorWrap">' + '		<ccfieldset id="codeCola-boxShadowWrap">' + '			<ol>' + '				<li><label>Inset:</label><label><input type="radio" value="inset" name="boxShadowInset" id="codeCola-boxShadowInset"> ' + getMSG("style_bs_inset") + '</label> <label><input type="radio" value="outset" name="boxShadowInset" id="codeCola-boxShadowOutset"> ' + getMSG("style_bs_outset") + '</label></li>' + '				<li><label>Degree:</label><div id="codeCola-boxShadowDegree"></div></li>' + '				<li><label for="codeCola-boxShadowDistance">Distance:</label><input type="range" min="0" max="100" id="codeCola-boxShadowDistance" name="boxShadowDistance"/><input type="text" class="codeCola-currentStyle" name="boxShadowDistance"/> (px)</li>' + '				<li><label for="codeCola-boxShadowSize">Size:</label><input type="range" min="0" max="100" id="codeCola-boxShadowSize" name="boxShadowSize"/><input type="text" class="codeCola-currentStyle" name="boxShadowSize" min="0"/> (px)</li>' + '				<li><label for="codeCola-boxShadowSpread">Spread:</label><input type="range" min="-100" max="100" id="codeCola-boxShadowSpread" name="boxShadowSpread"/><input type="text" class="codeCola-currentStyle" name="boxShadowSpread" min="0"/> (px)</li>' + '				<li><label for="codeCola-boxShadowColor">Color:</label><div id="codeCola-boxShadowColor"></div></li>' + '			</ol>' + '		</ccfieldset>' + '</div>',
        "border": '<cctitle><label>' + getMSG("style_b") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + getMSG("opt_hide") + '" data="borderTop,borderRight,borderBottom,borderLeft,borderRadius" mutil="border"></cci><cci class="codeCola-cancel" title="' + getMSG("opt_undo") + '" data="border,borderRadius" mutil="border"></cci></cctitle>' + '<div class="codeCola-editorWrap codeCola-editor-multi">' + '		<ccfieldset id="codeCola-borderWidthWrap">' + '			<cclegend>' + getMSG("style_b_width") + '</cclegend>' + '			<label><input type="checkbox" class="set-same inputs" name="borderWidth" id="codeCola-sameBorderWidth"/> ' + getMSG("opt_same") + '</label>' + '			<ol>' + '				<li><label for="codeCola-borderTopWidth">Top:</label><input type="range" min="0" max="100" id="codeCola-borderTopWidth" name="borderTopWidth"/><input type="text" class="codeCola-currentStyle" name="borderTopWidth" min="0"/> (px)</li>' + '				<li><label for="codeCola-borderRightWidth">Right:</label><input type="range" min="0" max="100" id="codeCola-borderRightWidth" name="borderRightWidth"/><input type="text" class="codeCola-currentStyle" name="borderRightWidth" min="0"/> (px)</li>' + '				<li><label for="codeCola-borderBottomWidth">Bottom:</label><input type="range" min="0" max="100" id="codeCola-borderBottomWidth" name="borderBottomWidth"/><input type="text" class="codeCola-currentStyle" name="borderBottomWidth" min="0"/> (px)</li>' + '				<li><label for="codeCola-borderLeftWidth">Left:</label><input type="range" min="0" max="100" id="codeCola-borderLeftWidth" name="borderLeftWidth"/><input type="text" class="codeCola-currentStyle" name="borderLeftWidth" min="0"/> (px)</li>' + '			</ol>' + '		</ccfieldset>' + '		<ccfieldset id="codeCola-borderStyleWrap">' + '			<cclegend>' + getMSG("style_b_style") + '</cclegend>' + '			<label><input type="checkbox" class="set-same selects" name="borderStyle" id="codeCola-sameBorderStyle"/> ' + getMSG("opt_same") + '</label>' + '			<ol>' + '				<li>' + '					<label for="codeCola-borderTopStyle">Top:</label>' + '  				<select id="codeCola-borderTopStyle" name="borderTopStyle">' + '      			<option selected="seleted" value="none">none</option>' + '      			<option value="solid">solid</option>' + '      			<option value="dashed">dashed</option>' + '      			<option value="dotted">dotted</option>' + '      			<option value="double">double</option>' + '      			<option value="groove">groove</option>' + '      			<option value="inset">inset</option>' + '      			<option value="outset">outset</option>' + '      			<option value="ridge">ridge</option>' + '  				</select>' + '				</li>' + '				<li>' + '					<label for="codeCola-borderRightStyle">Right:</label>' + '  				<select id="codeCola-borderRightStyle" name="borderRightStyle">' + '      			<option selected="seleted" value="none">none</option>' + '      			<option value="solid">solid</option>' + '      			<option value="dashed">dashed</option>' + '      			<option value="dotted">dotted</option>' + '      			<option value="double">double</option>' + '      			<option value="groove">groove</option>' + '      			<option value="inset">inset</option>' + '      			<option value="outset">outset</option>' + '      			<option value="ridge">ridge</option>' + '  				</select>' + '				</li>' + '				<li>' + '					<label for="codeCola-borderBottomStyle">Bottom:</label>' + '  				<select id="codeCola-borderBottomStyle" name="borderBottomStyle">' + '      			<option selected="seleted" value="none">none</option>' + '      			<option value="solid">solid</option>' + '      			<option value="dashed">dashed</option>' + '      			<option value="dotted">dotted</option>' + '      			<option value="double">double</option>' + '      			<option value="groove">groove</option>' + '      			<option value="inset">inset</option>' + '      			<option value="outset">outset</option>' + '      			<option value="ridge">ridge</option>' + '  				</select>' + '				</li>' + '				<li>' + '					<label for="codeCola-borderLeftStyle">Left:</label>' + '  				<select id="codeCola-borderLeftStyle" name="borderLeftStyle">' + '      			<option selected="seleted" value="none">none</option>' + '      			<option value="solid">solid</option>' + '      			<option value="dashed">dashed</option>' + '      			<option value="dotted">dotted</option>' + '      			<option value="double">double</option>' + '      			<option value="groove">groove</option>' + '      			<option value="inset">inset</option>' + '      			<option value="outset">outset</option>' + '      			<option value="ridge">ridge</option>' + '  				</select>' + '				</li>' + '			</ol>' + '		</ccfieldset>' + '		<ccfieldset id="codeCola-borderColorWrap">' + '			<cclegend>' + getMSG("style_b_color") + '</cclegend>' + '			<label><input type="checkbox" class="set-same inputs" name="borderColor" id="codeCola-sameBorderColor"/> ' + getMSG("opt_same") + '</label>' + '			<ol>' + '				<li><label for="codeCola-borderTopColor">Top:</label><div id="codeCola-borderTopColor"></div></li>' + '				<li><label for="codeCola-borderRightColor">Right:</label><div id="codeCola-borderRightColor"></div></li>' + '				<li><label for="codeCola-borderBottomColor">Bottom:</label><div id="codeCola-borderBottomColor"></div></li>' + '				<li><label for="codeCola-borderLeftColor">Left:</label><div id="codeCola-borderLeftColor"></div></li>' + '			</ol>' + '		</ccfieldset>' + '		<ccfieldset id="codeCola-borderRadiusWrap">' + '			<cclegend>' + getMSG("style_b_radius") + '</cclegend>' + '			<label><input type="checkbox" class="set-same inputs" name="borderRadius" id="codeCola-sameBorderRadius"/> ' + getMSG("opt_same") + '</label>' + '			<ol>' + '				<li><label for="codeCola-borderRadiusTopLeft">TL:</label><input type="range" min="0" max="100" id="codeCola-borderRadiusTopLeft" name="borderTopLeftRadius"/><input type="text" class="codeCola-currentStyle" name="borderTopLeftRadius" min="0"/> (px)</li>' + '				<li><label for="codeCola-borderRadiusTopRight">TR:</label><input type="range" min="0" max="100" id="codeCola-borderRadiusTopRight" name="borderTopRightRadius"/><input type="text" class="codeCola-currentStyle" name="borderTopRightRadius" min="0"/> (px)</li>' + '				<li><label for="codeCola-borderRadiusBottomRight">BR:</label><input type="range" min="0" max="100" id="codeCola-borderRadiusBottomRight" name="borderBottomRightRadius"/><input type="text" class="codeCola-currentStyle" name="borderBottomRightRadius" min="0"/> (px)</li>' + '				<li><label for="codeCola-borderRadiusBottomLeft">BL:</label><input type="range" min="0" max="100" id="codeCola-borderRadiusBottomLeft" name="borderBottomLeftRadius"/><input type="text" class="codeCola-currentStyle" name="borderBottomLeftRadius" min="0"/> (px)</li>' + '			</ol>' + '		</ccfieldset>' + '</div>',
        "listStyle": '<cctitle><label>' + getMSG("style_ls") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + getMSG("opt_hide") + '" data="listStyle"></cci><cci class="codeCola-cancel" title="' + getMSG("opt_undo") + '" data="listStyle"></cci></cctitle>' + '<div class="codeCola-editorWrap">' + '  <select id="codeCola-listStyleType">' + '	     <option selected="seleted" value="none">' + getMSG("style_ls_none") + '</option>' + '      <option value="disc">disc</option>' + '      <option value="circle">circle</option>' + '      <option value="square">square</option>' + '      <option value="decimal">decimal</option>' + '      <option value="decimal-leading-zero">decimal-leading-zero</option>' + '      <option value="lower-roman">lower-roman</option>' + '      <option value="upper-roman">upper-roman</option>' + '      <option value="lower-alpha">lower-alpha</option>' + '      <option value="upper-alpha">upper-alpha</option>' + '      <option value="cjk-ideographic">cjk-ideographic</option>' + '  </select>' + '  <select id="codeCola-listStylePosition">' + '	     <option selected="seleted" value="inside">inside</option>' + '      <option value="outside">outside</option>' + '  </select>' + '</div>',
        "layout": '<cctitle><label>' + getMSG("style_l") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + getMSG("opt_hide") + '" data="padding,margin" mutil="layout"></cci><cci class="codeCola-cancel" title="' + getMSG("opt_undo") + '" data="padding,margin" mutil="layout"></cci></cctitle>' + '<div class="codeCola-editorWrap codeCola-editor-multi">' + '		<ccfieldset id="codeCola-paddingWrap">' + '			<cclegend>' + getMSG("style_l_padding") + '</cclegend>' + '			<label><input type="checkbox" class="set-same inputs" name="padding" id="codeCola-samePadding"/> ' + getMSG("opt_same") + '</label>' + '			<ol>' + '				<li><label for="codeCola-paddingTop">Top:</label><input type="range" min="0" max="1000" id="codeCola-paddingTop" name="paddingTop"/><input type="text" class="codeCola-currentStyle" name="paddingTop" min="0"/> (px)</li>' + '				<li><label for="codeCola-paddingRight">Right:</label><input type="range" min="0" max="1000" id="codeCola-paddingRight" name="paddingRight"/><input type="text" class="codeCola-currentStyle" name="paddingRight" min="0"/> (px)</li>' + '				<li><label for="codeCola-paddingBottom">Bottom:</label><input type="range" min="0" max="1000" id="codeCola-paddingBottom" name="paddingBottom"/><input type="text" class="codeCola-currentStyle" name="paddingBottom" min="0"/> (px)</li>' + '				<li><label for="codeCola-paddingLeft">Left:</label><input type="range" min="0" max="1000" id="codeCola-paddingLeft" name="paddingLeft"/><input type="text" class="codeCola-currentStyle" name="paddingLeft" min="0"/> (px)</li>' + '			</ol>' + '		</ccfieldset>' + '		<ccfieldset id="codeCola-marginWrap">' + '			<cclegend>' + getMSG("style_l_margin") + '</cclegend>' + '			<label><input type="checkbox" class="set-same inputs" name="margin" id="codeCola-sameMargin"/> ' + getMSG("opt_same") + '</label>' + '			<ol>' + '				<li><label for="codeCola-marginTop">Top:</label><input type="range" min="0" max="1000" id="codeCola-marginTop" name="marginTop"/><input type="text" class="codeCola-currentStyle" name="marginTop" min="0"/> (px)</li>' + '				<li><label for="codeCola-marginRight">Right:</label><input type="range" min="0" max="1000" id="codeCola-marginRight" name="marginRight"/><input type="text" class="codeCola-currentStyle" name="marginRight" min="0"/> (px)</li>' + '				<li><label for="codeCola-marginBottom">Bottom:</label><input type="range" min="0" max="1000" id="codeCola-marginBottom" name="marginBottom"/><input type="text" class="codeCola-currentStyle" name="marginBottom" min="0"/> (px)</li>' + '				<li><label for="codeCola-marginLeft">Left:</label><input type="range" min="0" max="1000" id="codeCola-marginLeft" name="marginLeft"/><input type="text" class="codeCola-currentStyle" name="marginLeft" min="0"/> (px)</li>' + '			</ol>' + '		</ccfieldset>' + '</div>',
        "size": '<cctitle><label>' + getMSG("style_s") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + getMSG("opt_hide") + '" data="width,height" mutil="size"></cci><cci class="codeCola-cancel" title="' + getMSG("opt_undo") + '" data="width,height" mutil="size"></cci></cctitle>' + '<div class="codeCola-editorWrap">' + '		<ccfieldset id="codeCola-size">' + '			<ol>' + '				<li><label for="codeCola-width">Width:</label><input type="range" min="0" max="1440" id="codeCola-width" name="width"/><input type="text" class="codeCola-currentStyle" name="width" min="0"/> (px)</li>' + '				<li><label for="codeCola-height">Height:</label><input type="range" min="0" max="900" id="codeCola-height" name="height"/><input type="text" class="codeCola-currentStyle" name="height" min="0"/> (px)</li>' + '			</ol>' + '		</ccfieldset>' + '</div>'
    };

    //modules
    var LOADER = {
        "all": ["listStyle", "fontSize", "lineHeight", "fontFamily", "fontOther", "color", "textAlign", "textShadow", "backgroundColor", "backgroundImage", "opacity", "boxShadow", "border", "layout", "size"],
        "normal": ["fontSize", "lineHeight", "fontFamily", "fontOther", "color", "textAlign", "textShadow", "backgroundColor", "backgroundImage", "opacity", "boxShadow", "border", "layout", "size"],
        "list": ["listStyle", "fontSize", "lineHeight", "fontFamily", "fontOther", "color", "textAlign", "textShadow", "backgroundColor", "backgroundImage", "opacity", "boxShadow", "border", "layout", "size"],
        "img": ["size", "backgroundColor", "backgroundImage", "opacity", "border", "boxShadow", "layout"]
    };
    LOADER["li"] = LOADER["ol"] = LOADER["ul"] = LOADER.list;

    //EVENTS
    var EVENTS = {
        "common": {
            "accountChange": function(item) {
                var items = item.getElementsByTagName("ol")[0].getElementsByTagName("input"),
                    allSame = item.getElementsByTagName("input")[0],
                    len = items.length;
                Z.on(items, "change", function() {
                    var that = this,
                        value = that.value,
                        property = that.name,
                        pOrN = (that.type == "range") ? "nextSibling" : "previousSibling";
                    if (allSame.checked) {
                        property = allSame.name;
                        for (var k = 2; k < len; k++) {
                            items[k].value = items[k][pOrN].value = value;
                        }
                    }
                    that[pOrN].value = value;
                    setStyle(codeColaCurrentNode, property, value + "px");
                });
            },
            "cAccountChange": function(item, callback) {
                Z.on($("codeCola-item-" + item).getElementsByClassName("codeCola-currentStyle"), "change", function() {
                    var that = this,
                        value = that.value,
                        property = that.name;

                    that.value = that.previousSibling.value = value;
                    if (callback) {
                        callback();
                    } else {
                        setStyle(codeColaCurrentNode, property, value + "px");
                    }
                });
            },
            "setSame": function(node) {
                Z.on(node, "click", function(e) {
                    var that = node,
                        items = that.parentNode.parentNode.getElementsByTagName("ol")[0].getElementsByTagName(that.className.match(/inputs/) ? "input" : "select"),
                        len = items.length,
                        name = that.name,
                        k = /inputs/.test(that.className) ? 2 : 1;
                    if (!that.checked) {
                        for (; k < len; k++) {
                            items[k].disabled = false;
                        }
                    } else {
                        var firstItem = items[0],
                            value = firstItem.value;
                        for (; k < len; k++) {
                            var cItem = items[k];
                            cItem.value = value;
                            cItem.disabled = true;
                        }
                        value = !isNaN(value) ? value + "px" : value;
                        setStyle(codeColaCurrentNode, name, value);
                        firstItem.focus();
                    }
                });
            }
        },
        "fontSize": function() {
            this.common.cAccountChange("fontSize", function() {
                var fontSize = $("codeCola-fontSize").value;
                if (fontSize < 12) {
                    setStyle(codeColaCurrentNode, "webkitTextSizeAdjust", "none");
                } else {
                    setStyle(codeColaCurrentNode, "webkitTextSizeAdjust", "");
                }
                setStyle(codeColaCurrentNode, "fontSize", fontSize + "px");
            });
            Z.on("codeCola-fontSize", "change", function(e) {
                var value = this.value;
                if (value < 12) {
                    setStyle(codeColaCurrentNode, "webkitTextSizeAdjust", "none");
                } else {
                    setStyle(codeColaCurrentNode, "webkitTextSizeAdjust", "");
                }
                setStyle(codeColaCurrentNode, "fontSize", value + "px");
                this.nextSibling.value = value;
            });
        },
        "lineHeight": function() {
            Z.on("codeCola-lineHeight", "change", function(e) {
                var lineHeight = this.value;
                setStyle(codeColaCurrentNode, "lineHeight", lineHeight);
                this.nextSibling.value = lineHeight;
            });

            Z.on($("codeCola-item-lineHeight").getElementsByClassName("codeCola-currentStyle")[0], "change", function() {
                var lineHeight = this.value;
                setStyle(codeColaCurrentNode, "lineHeight", lineHeight);
                this.previousSibling.value = lineHeight;
            });
        },
        "fontFamily": function() {
            Z.on("codeCola-fontFamily", "change", function(e) {
                setStyle(codeColaCurrentNode, "fontFamily", this.value);
            });
        },
        "fontOther": function() {
            Z.on([$("codeCola-fontWeight"), $("codeCola-fontStyle"), $("codeCola-textDecoration")], "click", function(e) {
                var that = this,
                    v = that.checked ? that.value : "";
                setStyle(codeColaCurrentNode, that.name, v);
            });
        },
        "textAlign": function() {
            Z.on([$("codeCola-textAlignLeft"), $("codeCola-textAlignCenter"), $("codeCola-textAlignRight")], "click", function(e) {
                setStyle(codeColaCurrentNode, "textAlign", this.value);
            });
        },
        "color": function() {
            Z.loader("color", function() {
                CONTROLS.color = new ColorControl("codeCola-color", {
                    "name": "color",
                    "afterChange": function(hex) {
                        if (!codeColaCurrentNode) {
                            return
                        };
                        setStyle(codeColaCurrentNode, "color", hex);
                    }
                });
            });
        },
        "textShadow": function() {
            var distance = $("codeCola-textShadowDistance"),
                size = $("codeCola-textShadowSize");

            function setTextShadow() {
                var d = distance.value,
                    Degree = CONTROLS.textShadowDegree.getDegree(),
                    hex = CONTROLS.textShadowColor.getColor(),
                    x = 0 - Math.round(d * Math.cos(Degree * 0.017453293)),
                    y = Math.round(d * Math.sin(Degree * 0.017453293));
                setStyle(codeColaCurrentNode, "textShadow", x + "px " + y + "px " + size.value + "px " + hex);
            }
            Z.loader("color", function() {
                CONTROLS.textShadowColor = new ColorControl("codeCola-textShadowColor", {
                    "name": "textShadowColor",
                    "afterChange": function(hex) {
                        if (!codeColaCurrentNode) {
                            return
                        };
                        setTextShadow();
                    }
                });
            });

            Z.loader("Degree", function() {
                CONTROLS.textShadowDegree = new DegreeControl("codeCola-textShadowDegree", {
                    "afterChange": function(Degree) {
                        if (!codeColaCurrentNode) {
                            return
                        };
                        setTextShadow();
                    }
                });
            });

            Z.on([distance, size], "change", function(e) {
                setTextShadow();
                this.nextSibling.value = this.value;
            });
            this.common.cAccountChange("textShadow", function() {
                setTextShadow();
            });
        },
        "backgroundColor": function() {
            Z.loader("color", function() {
                CONTROLS.backgroundColor = new ColorControl("codeCola-backgroundColor", {
                    "name": "backgroundColor",
                    "afterChange": function(hex) {
                        if (!codeColaCurrentNode) {
                            return
                        };
                        setStyle(codeColaCurrentNode, "backgroundColor", hex);
                    }
                });
            });
        },
        "backgroundImage": function() {
            Z.loader("gradient", function() {
                CONTROLS.backgroundImage = new GradientControl("codeCola-backgroundImage", {
                    "panelWidth": 255,
                    "afterChange": function(gradient) {
                        if (!codeColaCurrentNode) {
                            return
                        };
                        setStyle(codeColaCurrentNode, "backgroundImage", gradient);
                    }
                });
            });
        },
        "opacity": function() {
            this.common.cAccountChange("opacity", function() {
                var opacity = $("codeCola-opacity").value;
                if (opacity < 0) {
                    opacity = 0;
                } else if (opacity > 1) {
                    opacity = 1;
                }
                setStyle(codeColaCurrentNode, "opacity", opacity + "px");
            });
            Z.on("codeCola-opacity", "change", function(e) {
                var value = this.value;
                setStyle(codeColaCurrentNode, "opacity", value);
                this.nextSibling.value = value;
            });
        },
        "boxShadow": function() {
            var inset = $("codeCola-boxShadowInset"),
                outset = $("codeCola-boxShadowOutset"),
                distance = $("codeCola-boxShadowDistance"),
                size = $("codeCola-boxShadowSize"),
                spread = $("codeCola-boxShadowSpread"),
                optinal;

            function setBoxShadow() {
                var optinal = inset.checked ? "inset" : "",
                    d = distance.value,
                    Degree = CONTROLS.boxShadowDegree.getDegree(),
                    hex = CONTROLS.boxShadowColor.getColor(),
                    x = 0 - Math.round(d * Math.cos(Degree * 0.017453293)),
                    y = Math.round(d * Math.sin(Degree * 0.017453293));
                setStyle(codeColaCurrentNode, "boxShadow", optinal + " " + x + "px " + y + "px " + size.value + "px " + spread.value + "px " + hex);
            }

            Z.loader("color", function() {
                CONTROLS.boxShadowColor = new ColorControl("codeCola-boxShadowColor", {
                    "name": "boxShadowColor",
                    "afterChange": function(hex) {
                        if (!codeColaCurrentNode) {
                            return
                        };
                        setBoxShadow();
                    }
                });
            });

            Z.loader("Degree", function() {
                CONTROLS.boxShadowDegree = new DegreeControl("codeCola-boxShadowDegree", {
                    "afterChange": function(Degree) {
                        if (!codeColaCurrentNode) {
                            return
                        };
                        setBoxShadow();
                    }
                });
            });

            Z.on([distance, size, spread], "change", function(e) {
                setBoxShadow();
                this.nextSibling.value = this.value;
            });

            Z.on(inset, "click", function(e) {
                setBoxShadow();
            });
            Z.on(outset, "click", function(e) {
                setBoxShadow();
            });
            this.common.cAccountChange("boxShadow", function() {
                setBoxShadow();
            });
        },
        "listStyle": function() {
            Z.on("codeCola-listStyleType", "change", function(e) {
                setStyle(codeColaCurrentNode, "listStyleType", this.value);
            });
            Z.on("codeCola-listStylePosition", "change", function(e) {
                setStyle(codeColaCurrentNode, "listStylePosition", this.value);
            });
        },
        "border": function() {
            this.common.setSame($("codeCola-sameBorderWidth"));
            this.common.setSame($("codeCola-sameBorderStyle"));
            this.common.setSame($("codeCola-sameBorderRadius"));

            this.common.accountChange($("codeCola-borderWidthWrap"));
            this.common.accountChange($("codeCola-borderRadiusWrap"));

            var styles = $("codeCola-borderStyleWrap").getElementsByTagName("select");
            Z.on(styles, "change", function() {
                var that = this,
                    style = that.value,
                    allSame = $("codeCola-sameBorderStyle"),
                    type = that.name;
                if (allSame.checked) {
                    type = allSame.name;
                    for (var k = 1, l = 4; k < l; k++) {
                        styles[k].value = style;
                    }
                }
                setStyle(codeColaCurrentNode, type, style);
            });

            var nodes = $("codeCola-borderColorWrap").getElementsByTagName("ol")[0].getElementsByTagName("input");
            Z.each(["borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor"], function(n, i) {
                (function(index) {
                    Z.loader("color", function() {
                        CONTROLS[n] = new ColorControl("codeCola-" + n, {
                            "name": n,
                            "afterChange": function(color) {
                                if (!codeColaCurrentNode) {
                                    return
                                };
                                if ($("codeCola-sameBorderColor").checked) {
                                    setStyle(codeColaCurrentNode, "borderColor", color);
                                    setStyle([nodes[9], nodes[18], nodes[27]], "backgroundColor", color);
                                    nodes[9].value = nodes[18].value = nodes[27].value = color;
                                } else {
                                    setStyle(codeColaCurrentNode, n, color);
                                }
                            }
                        });
                    });
                })(i);
            });

            Z.on("codeCola-sameBorderColor", "click", function() {
                if (this.checked) {
                    nodes[0].focus();
                    var color = nodes[0].value;
                    nodes[9].value = nodes[18].value = nodes[27].value = color;
                    setStyle([nodes[9], nodes[18], nodes[27]], "backgroundColor", color);
                    setStyle(codeColaCurrentNode, "borderColor", color);
                    nodes[9].disabled = nodes[18].disabled = nodes[27].disabled = true;
                } else {
                    nodes[9].disabled = nodes[18].disabled = nodes[27].disabled = false;
                }
            });
        },
        "layout": function() {
            this.common.setSame($("codeCola-samePadding"));
            this.common.setSame($("codeCola-sameMargin"));
            this.common.accountChange($("codeCola-paddingWrap"));
            this.common.accountChange($("codeCola-marginWrap"));
        },
        "size": function() {
            this.common.cAccountChange("size");
            var width = $("codeCola-width"),
                height = $("codeCola-height");
            Z.on([width, height], "change", function(e) {
                var that = this,
                    value = that.value;
                setStyle(codeColaCurrentNode, that.name, value + "px");
                that.nextSibling.value = value;
            });
        }
    };

    //init style
    var showCurrentStyle = {
        "colorNormal": function(editor, node, style) {
            var rgb = getStyle(node, style);
            setStyle(editor, "backgroundColor", rgb);
            editor.value = Z.color.rgbToHex(rgb);
        },
        "fontSize": function(node) {
            var value = getStyle(node, "fontSize").replace(/px/g, ""),
                editor = $("codeCola-fontSize");
            editor.value = editor.nextSibling.value = value;
        },
        "lineHeight": function(node) {
            var lineHeight = getStyle(node, "lineHeight");
            //can't calculate a number value when line-height:normal
            if(lineHeight == "normal"){
                return;
            }
            var value = lineHeight.replace(/px/g, "") / getStyle(node, "fontSize").replace(/px/g, ""),
                editor = $("codeCola-lineHeight");
            editor.value = value;
            editor.nextSibling.value = value;
        },
        "fontFamily": function(node) {
            //difficult
            //$("codeCola-fontFamily").value = getStyle(node, "fontFamily");
        },
        "fontOther": function(node) {
            if (getStyle(node, "fontWeight") == "bold") {
                $("codeCola-fontWeight").checked = true;
            } else {
                $("codeCola-fontWeight").checked = false;
            }
            if (getStyle(node, "fontStyle") == "italic") {
                $("codeCola-fontStyle").checked = true;
            } else {
                $("codeCola-fontStyle").checked = false;
            }
            if (getStyle(node, "textDecoration") == "underline") {
                $("codeCola-textDecoration").checked = true;
            } else {
                $("codeCola-textDecoration").checked = false;
            }
        },
        "textAlign": function(node) {
            var align = getStyle(node, "textAlign"),
                styles = [$("codeCola-textAlignLeft"), $("codeCola-textAlignCenter"), $("codeCola-textAlignRight")];
            for (var i = 0; i < 3; i++) {
                var that = styles[i];
                if (that.value == align) {
                    that.checked = true;
                    i = 3;
                }
            }
        },
        "color": function(node) {
            CONTROLS.color.setColor({
                "color": getStyle(node, "color"),
                "callback": false
            });
        },
        "textShadow": function(node) {
            var textShadow = getStyle(node, "textShadow"),
                value = [],
                d = $("codeCola-textShadowDistance"),
                size = $("codeCola-textShadowSize");

            if (textShadow == "none") {
                value = [0, 0, 0, "transparent"];
            } else {
                textShadow = textShadow.replace(/\,\s/g, ",").replace(/px/g, "").split(" ");
                value[2] = textShadow[3];
                value[3] = textShadow[0];
                value[0] = Math.round(Math.atan2(textShadow[1], textShadow[2]) * (360 / (2 * Math.PI)));
                if (value[0] >= -180 && value[0] <= 90) {
                    value[0] += 90;
                } else {
                    value[0] -= 270;
                }
                value[1] = Math.round(Math.sqrt(Math.pow(textShadow[1], 2) + Math.pow(textShadow[2], 2)));
            }
            CONTROLS.textShadowColor.setColor({
                "color": value[3],
                "callback": false
            });
            CONTROLS.textShadowDegree.setDegree({
                "Degree": value[0],
                "callback": false
            });
            d.value = d.nextSibling.value = value[1];
            size.value = size.nextSibling.value = value[2];
        },
        "backgroundColor": function(node) {
            var bgc = getStyle(node, "backgroundColor");
            bgc = bgc == "rgba(0, 0, 0, 0)" ? "transparent" : bgc;
            CONTROLS.backgroundColor.setColor({
                "color": bgc,
                "callback": false
            });
        },
        "backgroundImage": function(node) {
            var gradient = getStyle(node, "backgroundImage");
            if (!/linear/.test(gradient)) {
                gradient = "";
            }
            CONTROLS.backgroundImage.setGradient({
                "gradient": gradient,
                "callback": false
            });
        },
        "opacity": function(node) {
            var value = getStyle(node, "opacity"),
                editor = $("codeCola-opacity");
            editor.value = editor.nextSibling.value = value;
        },
        "boxShadow": function(node) {
            var boxShadow = getStyle(node, "boxShadow"),
                value = [],
                inset = $("codeCola-boxShadowInset"),
                outset = $("codeCola-boxShadowOutset"),
                d = $("codeCola-boxShadowDistance"),
                size = $("codeCola-boxShadowSize"),
                spread = $("codeCola-boxShadowSpread");
            if (boxShadow == "none") {
                value = ["transparent", 0, 0, 0, 0, "outset"];
            } else {
                boxShadow = boxShadow.replace(/\,\s/g, ",").replace(/px/g, "").split(" ");
                value[0] = boxShadow[0];
                value[1] = Math.round(Math.atan2(boxShadow[1], boxShadow[2]) * (360 / (2 * Math.PI)));
                if (value[1] >= -180 && value[1] <= 90) {
                    value[1] += 90;
                } else {
                    value[1] -= 270;
                }
                value[2] = Math.round(Math.sqrt(Math.pow(boxShadow[1], 2) + Math.pow(boxShadow[2], 2)));
                value[3] = boxShadow[3];
                value[4] = boxShadow[4];
                value[5] = boxShadow[5];
            }
            CONTROLS.boxShadowColor.setColor({
                "color": value[0],
                "callback": false
            });
            CONTROLS.boxShadowDegree.setDegree({
                "Degree": value[1],
                "callback": false
            });
            d.value = d.nextSibling.value = value[2];
            size.value = size.nextSibling.value = value[3];
            spread.value = spread.nextSibling.value = value[4];
            if (value[5] == "inset") {
                inset.checked = true;
            } else {
                outset.checked = true;
            }
        },
        "border": function(node) {
            Z.each(["borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor"], function(n) {
                (function(n) {
                    CONTROLS[n].setColor({
                        "color": getStyle(node, n),
                        "callback": false
                    });
                })(n);
            });
            Z.each(["borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth"], function(n) {
                var widthEditor = $("codeCola-" + n);
                widthEditor.value = widthEditor.nextSibling.value = getStyle(node, n).replace(/px/g, "");
            });
            Z.each(["borderTopStyle", "borderRightStyle", "borderBottomStyle", "borderLeftStyle"], function(n) {
                $("codeCola-" + n).value = getStyle(node, n);
            });
            Z.each(["borderRadiusTopLeft", "borderRadiusTopRight", "borderRadiusBottomLeft", "borderRadiusBottomRight"], function(n) {
                var cRadius = getStyle(node, n),
                    radiusEditor = $("codeCola-" + n);
                if (!cRadius) {
                    radiusEditor.value = radiusEditor.nextSibling.value = 0;
                } else {
                    radiusEditor.value = radiusEditor.nextSibling.value = cRadius.replace(/px/g, "");
                }
            });
        },
        "listStyle": function(node) {
            $("codeCola-listStyleType").value = getStyle(node, "listStyleType");
            $("codeCola-listStylePosition").value = getStyle(node, "listStylePosition");
        },
        "layout": function(node) {
            Z.each(["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"], function(n) {
                var paddingEditor = $("codeCola-" + n);
                paddingEditor.value = paddingEditor.nextSibling.value = getStyle(node, n).replace(/px/g, "");
            });
            Z.each(["marginTop", "marginRight", "marginBottom", "marginLeft"], function(n) {
                var marginEditor = $("codeCola-" + n);
                marginEditor.value = marginEditor.nextSibling.value = getStyle(node, n).replace(/px/g, "");
            });
        },
        "size": function(node) {
            var width = $("codeCola-width"),
                height = $("codeCola-height"),
                cWidth = getStyle(node, "width"),
                cHeight = getStyle(node, "height");
            if (cWidth != "auto") {
                width.value = width.nextSibling.value = cWidth.replace(/px/g, "");
            }
            if (cHeight != "auto") {
                height.value = height.nextSibling.value = cHeight.replace(/px/g, "");
            }
        }
    };

    function showCurrentStyleFun(items) {
        if (!items) {
            items = LOADER["all"];
        }
        if (typeof items == "string") {
            showCurrentStyle[items](codeColaCurrentNode);
            return;
        }
        Z.each(items, function(n) {
            showCurrentStyle[n](codeColaCurrentNode);
        });
    }

    function updateStyles() {
        if (!codeColaCurrentNode || ccdrag || !window.codeColaTurnOn) {
            return;
        } //fix -webkit-user-select
        var style = getStyle(codeColaCurrentNode);
        if (!style) {
            NODE_cStyle.value = "";
        } else {
            NODE_cStyle.value = getCombinedStyle(style);
        }
    }

    function updateCurrentNode(nodes, selector) {
        NODE_currentNode.title = selector;
        NODE_currentNode.firstChild.nodeValue = selector.length > 15 ? selector.substring(0, 12) + "..." : selector;
        NODE_cNodeCount.firstChild.nodeValue = nodes.length ? nodes.length : 0;
    }

    //init EVENTS
    Z.each(LOADER.all, function(citem) {
        var li = document.createElement("li");
        li.innerHTML = HTMLS[citem];
        NODE_itemsWrap.appendChild(li);
        Z.addClass(li, "codeCola-item");
        li.id = "codeCola-item-" + citem;
        EVENTS[citem]();
    });

    //show current node
    var NODE_mask = document.createElement("ccmask"),
        NODE_tempNode, NODE_tempNode2;
    NODE_mask.id = "codeCola-mask";
    document.body.appendChild(NODE_mask);
    Z.on(document.body, "mouseover", function(e) {
        if (!window.codeColaTurnOn) {
            return;
        }
        Z.setStyle(NODE_mask, 'pointer-events', 'none');
        var target = e.target,
            width = target.offsetWidth - 2,
            height = target.offsetHeight - 2,
            p = Z.getXY(target),
            x = p.x,
            y = p.y;
        
        NODE_tempNode = target;
        Z.setStyle(NODE_mask, 'left', x + "px");
        Z.setStyle(NODE_mask, 'top', y + "px");
        Z.setStyle(NODE_mask, 'width', width + "px");
        Z.setStyle(NODE_mask, 'height', height + "px");
    });
    Z.on(document.body, "mouseout", function(e) {
        if (!window.codeColaTurnOn) {
            return;
        }
        Z.setStyle(NODE_mask, 'left', "-2000px");
    });
    //when click fast, NODE_mask can't stop click event
    Z.on(document.body, "click", function(e) {
        if (!window.codeColaTurnOn) {
            return;
        }
        e.preventDefault();
    });
    //select nodes
    Z.on(document.body, "mousedown", function(e) {
        if (!window.codeColaTurnOn || e.button == 2) {
            return;
        }
        e.preventDefault();
        Z.setStyle(NODE_mask, 'pointer-events', 'auto');
    });
    Z.on(document.body, "mouseup", function(e) {
        if (!window.codeColaTurnOn || e.button == 2) {
            return;
        }
        e.preventDefault();
        Z.setStyle(NODE_mask, 'pointer-events', 'none');
        var target = NODE_tempNode;
        //mac command key: e.metaKey
        if (e.ctrlKey == 1 || e.metaKey) {
            mutilStart = true;
            if (Z.hasClass(target, CLASS_selecting)) {
                var newMutilNodes = [];
                Z.each(mutilNodes, function(n) {
                    if (n != target) {
                        newMutilNodes.push(n);
                    }
                });
                mutilNodes = newMutilNodes;
                Z.removeClass(target, CLASS_selecting);
            } else {
                mutilNodes.push(target);
                Z.addClass(target, CLASS_selecting);
            }
            updateCurrentNode(mutilNodes, "mix");
        } else {
            mutilStart = false;
            mutilNodes = [];
            initTab([target], target.nodeName);
        }
    });
    Z.on(document.body, "keyup", function(e) {
        if (!window.codeColaTurnOn) {
            return
        }
        if ((e.keyCode == 17 || e.keyCode == 91) && mutilNodes.length > 0) {
            Z.each(mutilNodes, function(n) {
                Z.removeClass(n, CLASS_selecting);
            });
            initTab(mutilNodes, "mix");
            mutilNodes = [];
            mutilStart = false;
        }
    });

    var selectorItems, hideTimeout = null,
        addLi = function(text, className, target) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(text));
            li.className = className;
            selectorItems.appendChild(li);
            attacthFindNode(li, target);
        },
        getNode = function(li, target) {
            if (li.className == "tag-selector") {
                var pTag, tag = target.nodeName.toLowerCase();
                if (tag == "li") {
                    pTag = /^ol$|^ul$/;
                } else if (tag == "td" || tag == "th") {
                    pTag = /^table$/;
                }
                while (!pTag.test(target.nodeName.toLowerCase())) {
                    target = target.parentNode;
                }
                return target.getElementsByTagName(tag);
            } else {
                return Z.getElementsByClassName(li.firstChild.nodeValue.replace(".", ""));
            }
        },
        attacthFindNode = function(li, target) {
            var nodes = getNode(li, target);
            Z.on(li, "mouseover", function(e) {
                Z.each(nodes, function(n) {
                    Z.addClass(n, CLASS_selecting);
                });
            });
            Z.on(li, "mouseout", function(e) {
                Z.each(nodes, function(n) {
                    Z.removeClass(n, CLASS_selecting);
                });
            });
            Z.on(li, "click", function(e) {
                NODE_selectorWrap.style.opacity = 0;
                NODE_selectorWrap.style.top = "-9999px";
                initTab(nodes, li.firstChild.nodeValue);
            });
        };
    Z.on(document.body, "contextmenu", function(e) {
        if (!window.codeColaTurnOn) {
            return
        }
        e.preventDefault();
        NODE_selectorWrap.style.opacity = 1;
        NODE_selectorWrap.style.top = e.pageY + "px";
        NODE_selectorWrap.style.left = e.pageX + "px";
        if (selectorItems) {
            NODE_selectorWrap.removeChild(selectorItems);
        }
        selectorItems = document.createElement("ol");

        var node = NODE_tempNode,
            classes = node.className,
            tag = e.target.nodeName.toLowerCase();

        if (tag == "li" || tag == "td" || tag == "th") {
            addLi(tag, "tag-selector", node);
        }

        if (classes && classes != CLASS_selecting) {
            classes = classes.split(" ");
            for (var i = 0, j = classes.length; i < j; i++) {
                var cClass = classes[i];
                if (Z.trim(cClass) == "" || cClass == CLASS_selecting) {
                    continue;
                }
                addLi("." + cClass, "class-selector", node);
            }
        }

        if (!selectorItems.childNodes[0]) {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }
            var li = document.createElement("li");
            li.appendChild(document.createTextNode("no selector"));
            li.className = "no-selector";
            selectorItems.appendChild(li);
            hideTimeout = setTimeout(function(e) {
                NODE_selectorWrap.style.opacity = 0;
                NODE_selectorWrap.style.top = "-9999px";
            }, 1000);
        }
        NODE_selectorWrap.appendChild(selectorItems);
    });

    //init tab
    var NODE_inputs = NODE_itemsWrap.getElementsByTagName("input"),
        NODE_selects = NODE_itemsWrap.getElementsByTagName("select"),
        NODE_eyes = Z.getElementsByClassName("codeCola-eye");

    function initTab(node, selector) {
        var items = [],
            nodeType = node[0].nodeName.toLowerCase();
        if (!/\.|^mix$/.test(selector) && LOADER[nodeType]) {
            items = LOADER[nodeType];
        } else {
            items = LOADER["normal"];
        }
        Z.each(NODE_inputs, function(n) {
            n.disabled = false;
            if (n.type == "checkbox") {
                n.checked = false;
            }
        });
        Z.each(NODE_selects, function(n) {
            n.disabled = false;
        });
        Z.each(NODE_eyes, function(n) {
            n.disabled = false;
        });
        Z.each(LOADER.all, function(n) {
            setStyle($("codeCola-item-" + n), "display", "");
        });
        codeColaCurrentNode = node;
        var isShow = Z.hasClass(NODE_codecola, "codeCola-allOpen");
        Z.each(items, function(n) {
            var li = $("codeCola-item-" + n);
            li.style.display = "block";
            showCurrentStyleFun(n);
            if (isShow && !Z.hasClass(li, "codeCola-item-open")) {
                Z.addClass(li, "codeCola-item-open");
            }
        });

        miniOptin.open();
        NODE_itemsWrap.className = "";
        updateCurrentNode(codeColaCurrentNode, selector);
        updateStyles();
        updateNotes();
    }

    //open or close controls
    Z.on(NODE_codecola.getElementsByTagName("cctitle"), "click", function(e) {
        var li = this.parentNode;
        if (/codeCola-item-open/.test(li.className)) {
            Z.removeClass(li, "codeCola-item-open");
        } else {
            Z.addClass(li, "codeCola-item-open");
        }
    });

    //undo
    var cssStuff = [];
    Z.on(Z.getElementsByClassName("codeCola-cancel"), "click", function(e) {
        e.stopPropagation();
        var that = this,
            data = this.getAttribute("data"),
            propertys = data.split(","),
            mutil = that.getAttribute("mutil");
        Z.each(propertys, function(n) {
            setStyle(codeColaCurrentNode, n, "");
            cssStuff[n] = "";
            if (!mutil) {
                showCurrentStyle[n](codeColaCurrentNode);
            }
        });
        if (mutil) {
            showCurrentStyle[mutil](codeColaCurrentNode);
        }
    });

    //hide style
    Z.on(Z.getElementsByClassName("codeCola-eye"), "click", function(e) {
        e.stopPropagation();
        var that = this,
            data = that.getAttribute("data"),
            propertys = data.split(","),
            className = that.className,
            divWrap = that.parentNode.nextSibling,
            inputs = divWrap.getElementsByTagName("input"),
            selects = divWrap.getElementsByTagName("select");
        if (/cc-close/.test(className)) {
            Z.each(propertys, function(n) {
                setStyle(codeColaCurrentNode, n, cssStuff[n]);
            });
            if (data != "backgroundImage") {
                Z.each(inputs, function(c) {
                    c.disabled = false;
                });
                Z.each(selects, function(c) {
                    c.disabled = false;
                });
            } else {
                CONTROLS.backgroundImage.able();
            }
            Z.removeClass(that, "cc-close");
            that.title = getMSG("opt_hide");
        } else {
            Z.each(propertys, function(n) {
                cssStuff[n] = getStyle(codeColaCurrentNode, n);
                setStyle(codeColaCurrentNode, n, "");
            });
            if (data != "backgroundImage") {
                Z.each(inputs, function(c) {
                    c.disabled = true;
                });
                Z.each(selects, function(c) {
                    c.disabled = true;
                });
            } else {
                CONTROLS.backgroundImage.disable();
            }
            Z.addClass(that, "cc-close");
            that.title = getMSG("opt_show");
        }
    });

    //open all controls
    var openAll = $("codeCola-open-all");
    Z.on(openAll, "click", function(e) {
        var lis = Z.getElementsByClassName("codeCola-item");
        if (Z.hasClass(NODE_codecola, "codeCola-allOpen")) {
            openAll.title = getMSG("opt_unfoldAll");
            Z.removeClass(NODE_codecola, "codeCola-allOpen");
            Z.each(lis, function(n) {
                Z.removeClass(n, "codeCola-item-open");
            });
        } else {
            openAll.title = getMSG("opt_foldAll");
            Z.addClass(NODE_codecola, "codeCola-allOpen");
            Z.each(lis, function(n) {
                Z.addClass(n, "codeCola-item-open");
            });
        }
    });

    //min
    var miniOptin = {
        "node": $("codeCola-fold"),
        "close": function() {
            var that = this.node;
            that.className = "";
            that.title = getMSG("opt_unfold");
        },
        "open": function() {
            var that = this.node;
            that.className = "cc-close";
            that.title = getMSG("opt_fold");
        }
    };
    Z.on("codeCola-fold", "click", function(e) {
        var that = this;
        if (that.className == "cc-close") {
            miniOptin.close();
            NODE_itemsWrap.className = "cc-close";
        } else {
            miniOptin.open();
            NODE_itemsWrap.className = "";
        }
    });

    //show current node
    Z.on(NODE_showCurrentNode, "mouseover", function(e) {
        if (!window.codeColaTurnOn || !codeColaCurrentNode || mutilStart) {
            return
        }
        Z.each(codeColaCurrentNode, function(n) {
            Z.addClass(n, CLASS_selecting);
        });
    });
    Z.on(NODE_showCurrentNode, "mouseout", function(e) {
        if (!window.codeColaTurnOn || !codeColaCurrentNode || mutilStart) {
            return
        }
        Z.each(codeColaCurrentNode, function(n) {
            Z.removeClass(n, CLASS_selecting);
        });
    });

    //turn on
    Z.on("codeCola-switch", "click", function(e) {
        var that = this;
        if (Z.hasClass(that, "cc-open")) {
            window.codeColaTurnOn = false;
            Z.removeClass(that, "cc-open");
            Z.addClass(that, "cc-close");
            that.title = getMSG("opt_turnOn");
        } else {
            window.codeColaTurnOn = true;
            Z.removeClass(that, "cc-close");
            Z.addClass(that, "cc-open");
            that.title = getMSG("opt_turnOff");
        }
    });

    //get style
    Z.on("codeCola-getStyles", "click", function(e) {
        var that = this;
        if (Z.hasClass(that, "cc-open")) {
            Z.removeClass(that, "cc-open");
            Z.removeClass(NODE_cStyle, "cc-open");
            that.title = getMSG("opt_showStyle");
        } else {
            Z.addClass(that, "cc-open");
            Z.addClass(NODE_cStyle, "cc-open");
            that.title = getMSG("opt_hideStyle");
        }
    });

    //add note		
    function updateNotes() {
        if (!window.codeColaTurnOn || !codeColaCurrentNode) {
            return;
        }
        var iconId = getAttr(codeColaCurrentNode, "codeColaNoteIcon");
        if (iconId) {
            NODE_cNote.value = $(iconId).innerHTML.replace(/<br>/g, "\n").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&apos;/g, "'");
        } else {
            NODE_cNote.value = "";
        }
    }
    Z.on("codeCola-getNote", "click", function(e) {
        var that = this;
        if (Z.hasClass(that, "cc-open")) {
            Z.removeClass(that, "cc-open");
            Z.removeClass(NODE_cNote, "cc-open");
            that.title = getMSG("opt_showNote");
        } else {
            Z.addClass(that, "cc-open");
            Z.addClass(NODE_cNote, "cc-open");
            that.title = getMSG("opt_hideNote");
        }
    });
    Z.on(NODE_cNote, "change", function(e) {
        if (!window.codeColaTurnOn || !codeColaCurrentNode || mutilStart) {
            return
        }
        var value = this.value,
            filter = function(v) {
                return v.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
            };
        if (value != "") {
            Z.each(codeColaCurrentNode, function(node) {
                if (node.getAttribute("codeColaNoteIcon")) {
                    var i = $(node.getAttribute("codeColaNoteIcon"));
                    i.innerHTML = filter(value);
                } else {
                    var i = document.createElement("span"),
                        s = Math.ceil(Math.random() * 100000000000),
                        xy = Z.getXY(node);
                    i.id = s;
                    Z.addClass(node, s);
                    i.className = "codeCola-note";
                    i.innerHTML = filter(value);
                    setStyle(i, "top", xy.y + node.clientHeight - 2 + "px");
                    setStyle(i, "left", xy.x + "px");
                    node.setAttribute("codeColaNoteIcon", s);
                    Z.on(i, "mouseover", function(e) {
                        Z.addClass(node, "codeCola-selecting");
                    });
                    Z.on(i, "mouseout", function(e) {
                        Z.removeClass(node, "codeCola-selecting");
                    });
                    NODE_notesWrap.appendChild(i);
                }
            });
        } else {
            Z.each(codeColaCurrentNode, function(node) {
                var noteId = node.getAttribute("codeColaNoteIcon");
                if (noteId) {
                    var note = $(noteId);
                    note.parentNode.removeChild(note);
                    node.removeAttribute("codeColaNoteIcon");
                }
            });
        }
    });

    //set style
    Z.on(NODE_cStyle, "keyup", function(e) {
        if (!window.codeColaTurnOn || !codeColaCurrentNode || mutilStart) {
            return
        }
        Z.setAttr(codeColaCurrentNode, "style", this.value);
    });
    Z.on(NODE_cStyle, "change", function(e) {
        if (!window.codeColaTurnOn || !codeColaCurrentNode || mutilStart) {
            return
        }
        showCurrentStyleFun();
    });

    //get HTML
    Z.on("codeCola-getHTML", "click", function() {
        Z.sendRequest("GET", window.location.href, {
            start: function() {
                Z.addClass(NODE_getHtmlWrap, "loadding");
                NODE_getHtmlContent.value = "loadding...";
            },
            success: function(o) {
                var r = o.responseText.replace(/<\/head>/i, "<style>" + STYLE_codeCola + "</style></head>").replace(/<body[\s\S]*<\/body>/i, document.body.outerHTML).replace(/(href|src|action)\s*\=\s*("|')[^"']+("|')/ig, function(url) {
                    var rUrl = url.replace(/^(href|src|action)\s*\=\s*("|')/i, "").replace(/("|')$/, "");
                    return url.replace(rUrl, getAbsolutePath(rUrl));
                });

                if (NODE_notesWrap.innerHTML != "") {
                    r = r.replace(/<\/html>/i, NODE_notesWrap.innerHTML + SCRIPT_codeCola + "</html>");
                }
                NODE_getHtmlContent.value = r;
                Z.addClass(NODE_getHtmlWrap, "cc-open");
            }
        }, null);
    });
    Z.on("codeCola-getHTML-close", "click", function() {
        Z.removeClass(NODE_getHtmlWrap, "cc-open");
        Z.removeClass(NODE_getHtmlWrap, "loadding");
    });

    //get Link
    Z.on("codeCola-getLink", "click", function() {
        var action, optionUrl = chrome.extension.getURL("options.html");
        chrome.extension.sendRequest("getUrls", function(response) {
            action = response.action;
            css = response.css;
            if (!action) {
                window.open(optionUrl);
                return;
            }
            Z.sendRequest("GET", window.location.href, {
                start: function() {
                    Z.addClass(NODE_getLinkWrap, "loadding");
                    NODE_getLinkContent.value = "loadding...";
                },
                success: function(o) {
                    var r = o.responseText.replace(/<\/head>/i, "<link rel='stylesheet' href='" + css + "'></head>").replace(/<body[\s\S]*<\/body>/i, document.body.outerHTML).replace(/(href|src|action)\s*\=\s*("|')[^"']+("|')/ig, function(url) {
                        var rUrl = url.replace(/^(href|src|action)\s*\=\s*("|')/i, "").replace(/("|')$/, "");
                        return url.replace(rUrl, getAbsolutePath(rUrl));
                    });
                    if (NODE_notesWrap.innerHTML != "") {
                        r = r.replace(/<\/html>/i, NODE_notesWrap.innerHTML + SCRIPT_codeCola + "</html>");
                    }
                    try {
                        Z.sendRequest("POST", action, {
                            success: function(o) {
                                try {
                                    var json = JSON.parse(o.responseText);
                                } catch (ex) {
                                    Z.removeClass(NODE_getLinkWrap, "loadding");
                                    alert(getMSG("error_server_fail"));
                                }
                                if (json.code == "200") {
                                    NODE_getLinkContent.value = json.url;
                                    Z.addClass(NODE_getLinkWrap, "cc-open");
                                    NODE_getLinkContent.select();
                                } else if (json.code == "900") {
                                    NODE_getLinkContent.value = json.message;
                                    Z.addClass(NODE_getLinkWrap, "cc-open");
                                }
                            }
                        }, "charset=" + document.charset + "&html=" + encodeURIComponent(r) + "&css=" + encodeURIComponent(STYLE_codeCola.replace("STYLESHEETURL", css)));
                    } catch (ex2) {
                        window.open(optionUrl);
                        alert(getMSG("error_connect_server"));
                    }
                }
            }, null);
        });
    });
    Z.on("codeCola-getLink-close", "click", function() {
        Z.removeClass(NODE_getLinkWrap, "cc-open");
        Z.removeClass(NODE_getLinkWrap, "loadding");
    });

    //about
    var aboutWrap = $("codeCola-about-wrap");
    Z.on("codeCola-show-about", "click", function() {
        Z.addClass(aboutWrap, "cc-open");
    });
    Z.on("codeCola-about-close", "click", function() {
        Z.removeClass(aboutWrap, "cc-open");
    });

    //drag
    var preXY = {},
        ccdrag = false,
        dragHolder = $("codeCola-drag");
    Z.on(dragHolder, "mousedown", function(e) {
        Z.setStyle(document.documentElement, "webkitUserSelect", "none");
        ccdrag = true;
        //NODE_codecola.style.opacity = 0.8;
        preXY.x = e.pageX + (getStyle(NODE_codecola, "right").replace("px", "") - 0);
        preXY.y = e.pageY - (getStyle(NODE_codecola, "top").replace("px", "") - 0);
    });
    Z.on(document, "mouseup", function(e) {
        if (ccdrag) {
            Z.setStyle(document.documentElement, "webkitUserSelect", "");
            ccdrag = false;
            //NODE_codecola.style.opacity = 1;
        }
    });
    Z.on(document, "mousemove", function(e) {
        //need test
        if (!ccdrag || e.clientY < 10) {
            return;
        }
        setStyle(NODE_codecola, "top", (e.pageY - preXY.y) + "px");
        setStyle(NODE_codecola, "right", (preXY.x - e.pageX) + "px");
    });

    //unload when editor
    Z.on(window, "beforeunload", function(e) {
        if (!codeColaCurrentNode) {
            return
        }
        return getMSG("confirm_unload");
    });
})();