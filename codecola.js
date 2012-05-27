/*
Copyright (c) 2011, ZHOUQICF.COM. All rights reserved.
Code licensed under the MIT License:
version: 3.4.3
*/
(function(){

//if extension is loaded
var _temp_cc = document.getElementById('codeCola');
if (_temp_cc && _temp_cc.style.display != 'none') {
    _temp_cc.style.display = 'none';
    window.codeColaTurnOn = false;
    return;
} else if (_temp_cc && _temp_cc.style.display == 'none') {
    _temp_cc.style.display = 'block';
    if (/cc-open/.test(document.getElementById('codeCola-switch').className)) {
        window.codeColaTurnOn = true;
    }
    return;
} else {
    if (!window.codeColaTurnOn) {
        window.codeColaTurnOn = true;
    }
}
/**
 * a chrome extension to modify css style visually
 * @module codecola
 */
YUI().add('codecola', function(Y) {
    /**
     * a chrome extension to modify css style visually
     * @param config {Object} Object literal specifying codecola configuration properties.
     * @class codecola
     * @constructor
     * @namespace Y
     * @extends Widget
     * @requires codecola-color codecola-gradient codecola-degree codecola-css widget-base node-base event-base io-base dd-plugin ua
     */
    Y.codecola = Y.Base.create('codecola', Y.Widget, [], {
        initializer: function() {
            this.set('codeColaCurrentNode', null);
        },

        renderUI: function() {
            this._renderStyleSheet();
            this._renderPanel();
            this._renderPlugs();
            return this;
        },

        bindUI: function() {
            this._bindModules();
            this._bindOpenControl();
            this._bindCancel();
            this._bindOpenAll();
            this._bindMin();
            this._bindShowCurrentNode();
            this._bindSwitch();
            this._bindGetStyle();
            this._bindNote();
            this._bindSetStyle();
            this._bindGetHtml();
            this._bindGetLink();
            this._bindShare();
            this._bindAbout();
            this._bindDrag();
            this._bindBeforeunload();

            this._bindInspect();
            return this;
        },

        syncUI: function() {
            return this;
        },

        renderer: function(){
            var _this = this;
            _this.renderUI().bindUI().syncUI();
        },

        _renderStyleSheet: function(){
            Y.one('head').append(Y.Node.create('<style>'+Y.codecola.STYLE_codeCola+'</style>'));
        },

        _renderPlugs: function(){
            var _this = this,
                plugs = _this.get('plugs').all;
            Y.each(plugs, function(plug){
                _this[plug].render(_this);
            });
        },

        renderPlug: function(html){
            var li = Y.Node.create(html);
            li.addClass('codeCola-item');
            Y.one('#codeCola-controls').append(li);
        },

        _renderPanel: function(){
            var _this = this;
            Y.one('html').append(Y.Node.create(
                '<div id="codeCola" class="codeCola-wrap">'+
                '   <div id="codeCola-option">'+
                '       <div id="codeCola-drag"></div>'+
                '       <div id="codeCola-fold" title="' + _this.chromeGetMSG("opt_fold") + '"><ccs></ccs><ccb></ccb></div>'+
                '       <cci id="codeCola-show-about" title="' + _this.chromeGetMSG("opt_about") + '">!</cci>'+
                '   </div>' +
                '   <div id="codeCola-current-info">'+
                '       <cccode id="codeCola-current-node">none</cccode> x '+
                '       <cccode id="codeCola-current-node-count">0</cccode>'+
                '       <vabbr id="codeCola-show-currentNode" title="' + _this.chromeGetMSG("opt_cNode") + '">?</vabbr>'+
                '       <cci id="codeCola-open-all" title="' + _this.chromeGetMSG("opt_unfoldAll") + '"><ccb></ccb><ccu></ccu></cci>'+
                '       <cci id="codeCola-share" title="' + _this.chromeGetMSG("opt_share") + '" class="codeCola-opt-button"></cci>'+
                '       <cci id="codeCola-getNote" title="' + _this.chromeGetMSG("opt_showNote") + '" class="codeCola-opt-button"></cci>'+
                '       <cci id="codeCola-getStyles" title="' + _this.chromeGetMSG("opt_showStyle") + '" class="codeCola-opt-button">{}</cci>'+
                '       <cci id="codeCola-getHTML" title="' + _this.chromeGetMSG("opt_html") + '" class="codeCola-opt-button">&lt;&gt;</cci>'+
                '       <cci id="codeCola-getLink" title="' + _this.chromeGetMSG("opt_link") + '" class="codeCola-opt-button"></cci>'+
                '       <cci id="codeCola-switch" title="' + _this.chromeGetMSG("opt_turnOff") + '" class="codeCola-opt-button cc-open"></cci>'+
                '   </div>'+
                '   <form id="codeCola-patterns" action="http://codecolapatterns.com/submit" method="POST" target="_blank">'+
                '       <textarea id="codeCola-styles" name="css"></textarea><input type="hidden" name="client" value="codecola">'+
                '   </form>'+
                '   <textarea id="codeCola-note"></textarea>'+
                '   <ul id="codeCola-controls" class="cc-close"></ul>'+
                '   <ol id="codeCola-selectors" class="codeCola-wrap"></ol>'+
                '   <div id="codeCola-getHTML-wrap" class="codeCola-pop codeCola-wrap">'+
                '       <span id="codeCola-getHTML-title" class="codeCola-pop-title">HTML</span>'+
                '       <cci id="codeCola-getHTML-close" class="codeCola-pop-close" title="' + _this.chromeGetMSG("opt_close") + '">×</cci>'+
                '       <textarea id="codeCola-getHTML-content"></textarea>'+
                '   </div>'+
                '   <div id="codeCola-getLink-wrap" class="codeCola-pop codeCola-wrap">'+
                '       <span id="codeCola-getLink-title" class="codeCola-pop-title">URL</span>'+
                '       <cci id="codeCola-getLink-close" class="codeCola-pop-close" title="' + _this.chromeGetMSG("opt_close") + '">×</cci>'+
                '       <input id="codeCola-getLink-content">'+
                '   </div>'+
                '   <div id="codeCola-finder-wrap" class="codeCola-pop codeCola-wrap">'+
                '       <span id="codeCola-finder-title" class="codeCola-pop-title">' + _this.chromeGetMSG("opt_finder") + '</span>'+
                '       <cci id="codeCola-finder-close" class="codeCola-pop-close" title="' + _this.chromeGetMSG("opt_close") + '">×</cci>'+
                '       <input id="codeCola-finder-content">'+
                '   </div>'+
                '   <div id="codeCola-about-wrap" class="codeCola-pop codeCola-wrap">'+
                '       <span class="codeCola-about-title codeCola-pop-title">About</span>'+
                '       <cci id="codeCola-about-close" class="codeCola-pop-close" title="' + _this.chromeGetMSG("opt_close") + '">×</cci>'+
                '       <div class="codeCola-about-content">'+
                '           <div class="codeCola-about-global" style="background-image:url(' + _this.chromeGetURL('128.png') + ')">'+
                '               <cctitle class="codeCola-about-name">Code Cola</cctitle>'+
                '               <p class="codeCola-about-version">v3.4.3</p>'+
                '           </div>'+
                '           <div class="codeCola-about-detail">'+
                '               <p class="codeCola-about-doc">'+
                '                   <a href="http://www.zhouqicf.com/code-cola" target="_blank">Documentation</a>,'+
                '                   <a href="https://chrome.google.com/extensions/detail/lomkpheldlbkkfiifcbfifipaofnmnkn" target="_blank">Chrome extension</a>,'+
                '                   <a href="https://github.com/zhouqicf/code-cola" target="_blank">Source</a>,'+
                '                   <a href="http://codecolapatterns.com" target="_blank">CodeCola Patterns</a>'+
                '               </p>'+
                '               <p class="codeCola-about-author">© 2010-2011'+
                '                   <a rel="work" href="http://www.koubei.com" target="_blank">KouBei</a> - '+
                '                   <a rel="team" href="http://ued.koubei.com" target="_blank">UED</a> created by '+
                '                   <a href="http://www.zhouqicf.com/about" target="_blank">Zhou Qi</a>'+
                '               </p>'+
                '           </div>'+
                '       </div>'+
                '   </div>'+
                '</div>'+
                '<div id="codeCola-notes-wrap"></div>'
            ));
        },

        _bindModules: function(){
            var _this = this,
                plugs = _this.get('plugs').all;
            Y.each(plugs, function(plug){
                _this[plug].bind(_this, Y);
            });
        },

        _bindInspect: function(){
            //TODO: can't stop event sametimes
            //TODO: window.codeColaTurnOn
            var _this = this,
                mask = Y.Node.create('<ccmask id="codeCola-mask"></ccmask>'),
                NODE_tempNode,
                CLASS_selecting = 'codeCola-selecting',
                mutilNodes = Y.all('codecola-nodelist'),
                mutilStart = false;

            Y.one('#codeCola').append(mask);

            Y.on('mouseover', function(e) {
                if (!window.codeColaTurnOn) {
                    return;
                }
                var target = e.target,
                    width = target.get('offsetWidth') - 2,
                    height = target.get('offsetHeight') - 2,
                    p = target.getXY();
                NODE_tempNode = target;
                //TODO:ie not support window.pageXOffset
                mask.setAttribute('style', 'left:' + (p[0] - window.pageXOffset) + 'px;top:' + (p[1] - window.pageYOffset) + 'px;width:' + width + 'px;height:' + height + 'px;');
            }, 'body');
            Y.on('mouseout', function(e) {
                if (!window.codeColaTurnOn) {
                    return;
                }
                mask.setStyle('left', '-4000px');
            }, 'body');
            //TODO: yui3 support event capture?
            document.body.addEventListener('click', function(e) {
                if (!window.codeColaTurnOn) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                NODE_tempNode = Y.one(e.target);
                //mac command key: e.metaKey
                if (e.ctrlKey == 1 || e.metaKey) {
                    mutilStart = true;
                    if (NODE_tempNode.hasClass(CLASS_selecting)) {
                        var newMutilNodes = Y.all('codecola-nodelist');
                        mutilNodes.each(function(n) {
                            if (n != NODE_tempNode) {
                                newMutilNodes.push(n);
                            }
                        });
                        mutilNodes = newMutilNodes;
                        NODE_tempNode.removeClass(CLASS_selecting);
                    } else {
                        mutilNodes.push(NODE_tempNode);
                        NODE_tempNode.addClass(CLASS_selecting);
                    }
                    _this.updateCurrentNode(mutilNodes.size(), 'mix');
                } else {
                    mutilNodes.push(NODE_tempNode);
                    _this.initTab(mutilNodes, NODE_tempNode.get('nodeName'));
                    mutilStart = false;
                    mutilNodes = Y.all('codecola-nodelist');
                }
            }, true);
            Y.on('keyup', function(e) {
                if (window.codeColaTurnOn && (e.keyCode == 17 || e.keyCode == 224 || e.keyCode == 91) && !mutilNodes.isEmpty()) {
                    mutilNodes.removeClass(CLASS_selecting);
                    _this.initTab(mutilNodes, 'mix');
                    mutilStart = false;
                    mutilNodes = Y.all('codecola-nodelist');
                }
            });

            var hideTimeout = null,
                selectorPanel = Y.one('#codeCola-selectors'),
                addLi = function(text, className, target) {
                    var li = Y.Node.create('<li class="'+className+'">'+text+'</li>');
                    selectorPanel.append(li);
                    attacthFindNode(li, target);
                },
                getNode = function(li, target) {
                    if (li.hasClass('tag-selector')) {
                        var pTag, tag = target.get('nodeName');
                        if (tag == 'LI') {
                            pTag = /^OL$|^UL$/;
                        } else if (tag == 'TD' || tag == 'TH') {
                            pTag = /^TABLE$/;
                        }
                        while (!pTag.test(target.get('nodeName'))) {
                            target = target.get('parentNode');
                        }
                        return target.all(tag);
                    } else {
                        return Y.all('.' + li.get('firstChild').get('text').replace('.', ''));
                    }
                },
                attacthFindNode = function(li, target) {
                    var nodes = getNode(li, target);
                    li.on('mouseover', function(e) {
                        nodes.addClass(CLASS_selecting);
                        clearTimeout(hideTimeout);
                    });
                    li.on('mouseout', function(e) {
                        nodes.removeClass(CLASS_selecting);
                        hideMenu();
                    });
                    li.on('click', function(e) {
                        Y.one('#codeCola-selectors').setStyles({
                            opacity: 0,
                            top: '-9999px'
                        });
                        _this.initTab(nodes, li.get('firstChild').get('text'));
                    });
                },
                hideMenu = function(){
                    hideTimeout = setTimeout(function(e) {
                        selectorPanel.setStyles({
                            opacity: 0,
                            top: '-9999px'
                        });
                    }, 1500);
                };
            Y.on('contextmenu', function(e) {
                if (!window.codeColaTurnOn) {
                    return
                }
                e.preventDefault();

                clearTimeout(hideTimeout);

                selectorPanel.empty().setStyles({
                    opacity: 1,
                    top: e.pageY - window.pageYOffset,
                    left: e.pageX - window.pageXOffset
                });

                var classes = Y.Lang.trim(NODE_tempNode.get('className').replace(CLASS_selecting, '')),
                    tag = e.target.get('nodeName');

                if (tag == 'LI' || tag == 'TD' || tag == 'TH') {
                    addLi(tag, 'tag-selector', NODE_tempNode);
                }

                if (classes) {
                    classes = classes.split(/\s+/);
                    for (var i = 0, j = classes.length; i < j; i++) {
                        var cClass = classes[i];
                        if (cClass != CLASS_selecting) {
                            addLi('.' + cClass, 'class-selector', NODE_tempNode);
                        }
                    }
                }

                if (!selectorPanel.get('firstChild')) {
                    selectorPanel.append(Y.Node.create('<li class="no-selector">no selector</li>'));
                }

                hideMenu();
            }, 'body');

            _this._bindInspectByFinder();
        },

        _bindInspectByFinder: function(){
            var _this = this,
                codecola = document.getElementById('codeCola'),
                noteWrap = document.getElementById('codeCola-notes-wrap'),
                //TODO: test
                isType = function(){
                    var activeTag = document.activeElement,
                        activeTagName = activeTag.tagName.toLowerCase();
                    return activeTag.getAttribute('contenteditable') === 'true' || activeTagName === 'input' || activeTagName === 'select' || activeTagName === 'textarea';
                };
            Y.on('keypress', function(e){
                if(!window.codeColaTurnOn || e.keyCode != 102 || isType()){
                    return;
                }
                e.preventDefault();
                Y.one('#codeCola-finder-wrap').addClass('cc-open');
                Y.one('#codeCola-finder-content').focus();
            });
            Y.on('keypress', function(e){
                if(!window.codeColaTurnOn || e.keyCode != 13){
                    return;
                }
                var selector = this.get('value'),
                    allNodes = Y.all(selector)._nodes,
                    dropNodes = codecola.getElementsByTagName('*'),
                    nodes = Y.all('codecola-nodelist'),
                    notes = noteWrap.getElementsByTagName('*');
                //TODO: bad
                for(var i = allNodes.length;i>-1;i--){
                    var use = true, node = allNodes[i];
                    (function(){
                        for(var j = dropNodes.length;j>-1;j--){
                            if(node == dropNodes[j]){
                                use = false;
                                return;
                            }
                        }
                        for(var j = notes.length;j>-1;j--){
                            if(node == notes[j]){
                                use = false;
                                return;
                            }
                        }
                        if(node == noteWrap || node == codecola){
                            use = false;
                            return;
                        }
                    })();
                    if(use){
                        nodes.push(node);
                    }
                }
                if(nodes.size() == 0){
                    alert(_this.chromeGetMSG('error_find_none'));
                    this.select();
                    return;
                }
                _this.initTab(nodes, selector);
                Y.one('#codeCola-finder-wrap').removeClass('cc-open');
                this.blur();
            }, '#codeCola-finder-content');
            Y.on('click', function(e){
                Y.one('#codeCola-finder-wrap').removeClass('cc-open');
            }, '#codeCola-finder-close');
        },

        initTab: function(node, selector){
            var _this = this,
                wrap = Y.one('#codeCola-controls'),
                inputs = wrap.all('input'),
                selects = wrap.all('select'),
                eyes = Y.all('.cc-close'),
                items = [],
                nodeType = node._nodes[0].nodeName.toLowerCase(),
                plugs = _this.get('plugs'),
                isClassOrMix = /\.|^mix$/.test(selector);
            
            if (!isClassOrMix && plugs[nodeType]) {
                items = plugs[nodeType];
            } else if(isClassOrMix){
                items = plugs['all'];
            } else{
                items = plugs['normal'];
            }

            inputs.each(function(n) {
                n.set('disabled', false);
                if (n.get('type') == 'checkbox') {
                    n.set('checked', false);
                }
            });
            selects.set('disabled', false);
            eyes.removeClass('cc-close').set('title', _this.chromeGetMSG('opt_hide'));

            Y.each(plugs.all, function(n) {
                Y.one('#codeCola-item-'+n).setStyle('display', '');
            });
            _this.set('codeColaCurrentNode', node);
            var isShow = Y.one('#codeCola').hasClass('codeCola-allOpen');
            Y.each(items, function(n) {
                var li = Y.one('#codeCola-item-' + n);
                li.setStyle('display', 'block');
                if (isShow) {
                    li.addClass('codeCola-item-open');
                }
                _this.initControls(n);
                //sort
                wrap.append(li);
            });

            _this._toggleMini('open');
            wrap.set('className', '');
            _this.updateCurrentNode(node.size(), selector);
            _this.updateStyle();
            _this.updateNote();
        },

        updateCurrentNode: function(len, selector) {
            Y.one('#codeCola-current-node').set('title', selector).set('text', selector);
            Y.one('#codeCola-current-node-count').set('text', len);
        },

        _bindOpenControl: function(){
            Y.on('click', function(e) {
                if(e.target.get('nodeName') !== 'A'){
                    this.get('parentNode').toggleClass('codeCola-item-open');
                }
            }, 'cctitle');
        },

        _bindCancel: function(){
            var cssStuff = [],
                _this = this;
            Y.on('click', function(e) {
                e.stopPropagation();
                var that = this,
                    data = this.getAttribute('data'),
                    propertys = data.split(','),
                    mutil = that.getAttribute('mutil');
                Y.each(propertys, function(n) {
                    _this.setStyle(_this.get('codeColaCurrentNode'), n, '');
                    cssStuff[n] = '';
                    if (!mutil) {
                        //TODO: terrible
                        if(n === 'backgroundImage'){
                            n = 'linearGradient';
                        }
                        _this.initControls(n);
                    }
                });
                if (mutil) {
                    _this.initControls(mutil);
                }
            }, '.codeCola-cancel');

            Y.on('click', function(e) {
                e.stopPropagation();
                var that = this,
                    data = that.getAttribute('data'),
                    propertys = data.split(','),
                    className = that.get('className'),
                    divWrap = that.get('parentNode').next(),
                    inputs = divWrap.all('input'),
                    selects = divWrap.all('select'),
                    codeColaCurrentNode = _this.get('codeColaCurrentNode');
                if (/cc-close/.test(className)) {
                    Y.each(propertys, function(n) {
                        _this.setStyle(codeColaCurrentNode, n, cssStuff[n]);
                    });
                    //TODO: terrible
                    if (data == 'backgroundImage') {
                        _this.linearGradient.gradient.able();
                    }else if(data == 'webkitMaskImage'){
                        _this.webkitMaskImage.gradient.able();
                    }else if(data == 'webkitBoxReflect'){
                        _this.webkitBoxReflect.gradient.able();
                    }else if(data == 'textShadow'){
                        _this.textShadow.degree.able();
                    }else if(data == 'boxShadow'){
                        _this.boxShadow.degree.able();
                    }
                    inputs.set('disabled', false);
                    selects.set('disabled', false);
                    that.removeClass('cc-close').set('title', _this.chromeGetMSG('opt_hide'));
                } else {
                    Y.each(propertys, function(n) {
                        cssStuff[n] = _this.getStyle(codeColaCurrentNode, n);
                        _this.setStyle(codeColaCurrentNode, n, '');
                    });
                    if (data == 'backgroundImage') {
                        _this.linearGradient.gradient.disable();
                    }else if(data == 'webkitMaskImage'){
                        _this.webkitMaskImage.gradient.disable();
                    }else if(data == 'webkitBoxReflect'){
                        _this.webkitBoxReflect.gradient.disable();
                    }else if(data == 'textShadow'){
                        _this.textShadow.degree.disable();
                    }else if(data == 'boxShadow'){
                        _this.boxShadow.degree.disable();
                    }
                    inputs.set('disabled', true);
                    selects.set('disabled', true);
                    that.addClass('cc-close').set('title', _this.chromeGetMSG('opt_show'));
                }
            }, '.codeCola-eye');
        },

        _bindOpenAll: function(){
            var codecola = Y.one('#codeCola'),
                _this = this;
            Y.on('click', function(e) {
                var lis = Y.all('.codeCola-item');
                if (codecola.hasClass('codeCola-allOpen')) {
                    this.set('title', _this.chromeGetMSG('opt_unfoldAll'));
                    codecola.removeClass('codeCola-allOpen');
                    lis.removeClass('codeCola-item-open');
                } else {
                    this.set('title', _this.chromeGetMSG('opt_foldAll'));
                    codecola.addClass('codeCola-allOpen');
                    lis.addClass('codeCola-item-open');
                }
            }, '#codeCola-open-all');
        },

        _bindMin: function(){
            var _this = this;
            Y.on('click', function(e) {
                if (this.hasClass('cc-close')) {
                    _this._toggleMini('close');
                    Y.one('#codeCola-controls').set('className', 'cc-close');
                } else {
                    _this._toggleMini('open');
                    Y.one('#codeCola-controls').set('className', '');
                }
            }, '#codeCola-fold');
        },

        _bindShowCurrentNode: function(){
            var _this = this;
            Y.on('mouseover', function(e) {
                var codeColaCurrentNode = _this.get('codeColaCurrentNode');
                if (codeColaCurrentNode) {
                    codeColaCurrentNode.addClass('codeCola-selecting');
                    Y.one('#codeCola').addClass('cc-fade');
                }
            }, '#codeCola-show-currentNode')
            Y.on('mouseout', function(e) {
                var codeColaCurrentNode = _this.get('codeColaCurrentNode');
                if (codeColaCurrentNode) {
                    codeColaCurrentNode.removeClass('codeCola-selecting');
                    Y.one('#codeCola').removeClass('cc-fade');
                }
            }, '#codeCola-show-currentNode');
        },

        _bindSwitch: function(){
            var _this = this;
            Y.on('click', function(e) {
                if (this.hasClass('cc-open')) {
                    window.codeColaTurnOn = false;
                    this.removeClass('cc-open').addClass('cc-close').set('title', _this.chromeGetMSG('opt_turnOn'));
                } else {
                    window.codeColaTurnOn = true;
                    this.removeClass('cc-close').addClass('cc-open').set('title', _this.chromeGetMSG('opt_turnOff'));
                }
            }, '#codeCola-switch');
        },

        _bindGetStyle: function(){
            var _this = this;
            Y.on('click', function(e) {
                if (this.hasClass('cc-open')) {
                    this.removeClass('cc-open').set('title', _this.chromeGetMSG('opt_showStyle'));
                    Y.one('#codeCola-styles').removeClass('cc-open');
                } else {
                    this.addClass('cc-open').set('title', _this.chromeGetMSG('opt_hideStyle'));
                    Y.one('#codeCola-styles').addClass('cc-open');
                }
            }, '#codeCola-getStyles');
        },

        _bindNote: function(){
            var _this = this;
            Y.on('click', function(e) {
                if (this.hasClass('cc-open')) {
                    this.removeClass('cc-open').set('title', _this.chromeGetMSG('opt_showNote'));
                    Y.one('#codeCola-note').removeClass('cc-open');
                } else {
                    this.addClass('cc-open').set('title', _this.chromeGetMSG('opt_hideNote'));
                    Y.one('#codeCola-note').addClass('cc-open');
                }
            }, '#codeCola-getNote');
            Y.on('change', function(e) {
                var codeColaCurrentNode = _this.get('codeColaCurrentNode');
                if (!window.codeColaTurnOn || !codeColaCurrentNode) {
                    return
                }
                var value = this.get('value'),
                    filter = function(v) {
                        return v.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r\n|\n|\r/g, '<br>').replace(/'/g, '&quot;').replace(/'/g, '&apos;')
                    };
                if (value != '') {
                    codeColaCurrentNode.each(function(node) {
                        if (node.getAttribute('codeColaNoteIcon')) {
                            var i = Y.one('#' + node.getAttribute('codeColaNoteIcon'));
                            i.set('innerHTML', filter(value));
                        } else {
                            var s = 'note-'+(new Date()).getTime(),
                                xy = node.getXY(),
                                i = Y.Node.create('<span class="codeCola-note" id="'+s+'" style="top:'+(xy[1] + node.get('clientHeight') - 2)+'px;left:'+xy[0]+'px;">'+filter(value)+'</span>');
                            node.addClass(s).setAttribute('codeColaNoteIcon', s);
                            i.on('mouseover', function(e) {
                                node.addClass('codeCola-selecting');
                            });
                            i.on('mouseout', function(e) {
                                node.removeClass('codeCola-selecting');
                            });
                            i.appendTo(document.getElementById('codeCola-notes-wrap'));
                        }
                    });
                } else {
                    codeColaCurrentNode.each(function(node) {
                        var noteId = node.getAttribute('codeColaNoteIcon');
                        if (noteId) {
                            var note = Y.one('#'+noteId);
                            note.remove();
                            node.removeAttribute('codeColaNoteIcon');
                        }
                    });
                }
            }, '#codeCola-note');
        },

        _bindSetStyle: function(){
            var node = Y.one('#codeCola-styles'),
                _this = this;
            node.on('keyup', function(e) {
                var codeColaCurrentNode = _this.get('codeColaCurrentNode');
                if (!window.codeColaTurnOn || !codeColaCurrentNode) {
                    return
                }
                codeColaCurrentNode.setAttribute('style', this.get('value'));
            });
            node.on('change', function(e) {
                if (!window.codeColaTurnOn || !_this.get('codeColaCurrentNode')) {
                    return
                }
                _this.initControls();
            });
        },

        _bindGetHtml: function(){
            var wrap = Y.one('#codeCola-getHTML-wrap'),
                content = Y.one('#codeCola-getHTML-content'),
                notes = Y.one('#codeCola-notes-wrap'),
                _this = this;
            Y.on('click', function() {
                Y.io(window.location.href, {
                    method: 'GET',
                    on: {
                        start: function() {
                            wrap.addClass('loadding');
                            content.set('value', 'loadding...');
                        },
                        success: function(id, o) {
                            var r = o.responseText.replace(/<\/head>/i, '<style>' + Y.codecola.STYLE_codeCola + '</style></head>').replace(/<body[\s\S]*<\/body>/i, document.body.outerHTML).replace(/(href|src|action)\s*\=\s*("|')[^"']+("|')/ig, function(url) {
                                var rUrl = url.replace(/^(href|src|action)\s*\=\s*("|')/i, '').replace(/("|')$/, '');
                                return url.replace(rUrl, _this.getAbsolutePath(rUrl));
                            });

                            if (notes.get('innerHTML') != '') {
                                r = r.replace(/<\/html>/i, notes.get('innerHTML') + Y.codecola.SCRIPT_codeCola + '</html>');
                            }
                            content.set('value', r);
                            wrap.addClass('cc-open');
                        }
                    }
                });
            }, '#codeCola-getHTML');
            Y.on('click', function() {
                wrap.removeClass('cc-open').removeClass('loadding');
            }, '#codeCola-getHTML-close');
        },

        _bindGetLink: function(){
            var wrap = Y.one('#codeCola-getLink-wrap'),
                content = Y.one('#codeCola-getLink-content'),
                notes = Y.one('#codeCola-notes-wrap'),
                _this = this;
            Y.on('click', function() {
                var action,css,optionUrl = _this.chromeGetURL('options.html');
                _this.chromeSendRequest('getUrls', function(o) {
                    action = o.action;
                    css = o.css;
                    if (!action) {
                        window.open(optionUrl);
                        return;
                    }
                    var config = {
                        method: 'GET',
                        on: {
                            start: function() {
                                wrap.addClass('loadding');
                                content.set('value', 'loadding...');
                            },
                            success: function(id, o) {
                                var r = o.responseText.replace(/<\/head>/i, '<link rel="stylesheet" href="' + css + '"></head>').replace(/<body[\s\S]*<\/body>/i, document.body.outerHTML).replace(/(href|src|action)\s*\=\s*("|')[^"']+("|')/ig, function(url) {
                                    var rUrl = url.replace(/^(href|src|action)\s*\=\s*("|')/i, '').replace(/("|')$/, '');
                                    return url.replace(rUrl, _this.getAbsolutePath(rUrl));
                                });
                                if (notes.get('innerHTML') != '') {
                                    r = r.replace(/<\/html>/i, notes.get('innerHTML') + Y.codecola.SCRIPT_codeCola + '</html>');
                                }
                                try {
                                    Y.io(action, {
                                        method: 'POST',
                                        data: 'charset=' + document.charset + '&html=' + encodeURIComponent(r) + '&css=' + encodeURIComponent(Y.codecola.STYLE_codeCola.replace('STYLESHEETURL', css)),
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        },
                                        on: {
                                            success: function(id, o) {
                                                try {
                                                    var json = JSON.parse(o.responseText);
                                                } catch (ex) {
                                                    wrap.removeClass('loadding');
                                                    alert(_this.chromeGetMSG('error_server_fail'));
                                                }
                                                if (json.code == '200') {
                                                    content.set('value', json.url);
                                                    wrap.addClass('cc-open');
                                                    content.select();
                                                } else if (json.code == '900') {
                                                    content.set('value', json.message);
                                                    wrap.addClass('cc-open');
                                                }
                                            }
                                        }
                                    });
                                } catch (ex2) {
                                    window.open(optionUrl);
                                    alert(_this.chromeGetMSG('error_connect_server'));
                                }
                            }
                        }
                    };
                    Y.io(window.location.href, config);
                });
            }, '#codeCola-getLink');
            Y.on('click', function() {
                wrap.removeClass('cc-open').removeClass('loadding');
            }, '#codeCola-getLink-close');
        },

        _bindAbout: function(){
            Y.on('click', function() {
                Y.one('#codeCola-about-wrap').addClass('cc-open');
            }, '#codeCola-show-about');
            Y.on('click', function() {
                Y.one('#codeCola-about-wrap').removeClass('cc-open');
            }, '#codeCola-about-close');
        },

        _bindShare: function(){
            var _this = this, form = Y.one('#codeCola-patterns');
            Y.on('click', function(e) {
                form.submit();
            }, '#codeCola-share');
        },

        _bindDrag: function(){
            var codecola = Y.one('#codeCola');
            codecola.plug(Y.Plugin.Drag);
            codecola.dd.addHandle('#codeCola-drag');
        },

        _bindBeforeunload: function(){
            var _this = this;
            //TODO: yui3 event bug
            window.onbeforeunload = function(){
                return _this.chromeGetMSG('confirm_unload');
            }
        },

        chromeGetURL: function(url){
            return Y.codecola.isChromeExtension?chrome.extension.getURL(url):url;
        },

        chromeGetMSG: function(key) {
            if(Y.codecola.isChromeExtension){
                return chrome.i18n.getMessage(key);
            }else{
                return codecola.i18n[key].message;
            }
        },

        chromeSendRequest: function(query, callback){
            if(Y.codecola.isChromeExtension){
                chrome.extension.sendRequest(query, callback);
            }else{
                if(query == 'getUrls'){
                    var action = this.get('getLinkAction');
                    if(!action){
                        alert('Please config the property of "getLinkAction"!');
                        return;
                    }
                    callback({
                        action: action,
                        css: action.replace(/\/\w+\.\w+$/, "/codecola.css")
                    });
                }
            }
        },

        getAbsolutePath: function(url) {
            var a = document.createElement('a');
            a.href = url;
            return a.href;
        },

        getStyle: function(node, property) {
            if (node._nodes) {
                node = node.item(0);
            }
            //property = CODECOLA.cssExtension(property);
            switch (property) {
            case 'borderTop':
                property = ['borderTopWidth', 'borderTopStyle', 'borderTopColor'];
                break;
            case 'borderRight':
                property = ['borderRightWidth', 'borderRightColor', 'borderRightStyle'];
                break;
            case 'borderBottom':
                property = ['borderBottomWidth', 'borderBottomColor', 'borderBottomStyle'];
                break;
            case 'borderLeft':
                property = ['borderLeftWidth', 'borderLeftColor', 'borderLeftStyle'];
                break;
            case 'borderRadius':
                property = ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'];
                break;
            case 'padding':
                property = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'];
                break;
            case 'margin':
                property = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'];
                break;
            case 'listStyle':
                property = ['listStylePosition', 'listStyleType'];
                break;
            }
            if (typeof property == 'string') {
                return node.getStyle(property);
            } else {
                var value = [];
                for (var i = 0, j = property.length; i < j; i++) {
                    value[i] = node.getStyle(property[i]);
                }
                return value.join(' ');
            }
        },

        getCombinedStyle: function(style) {
            var styles = Y.Lang.trim(style).split(/;(?!base64)/),
                cssRules = {},
                styleProperty = '',
                deleteFun = function(array) {
                    Y.each(array, function(n) {
                        delete cssRules[n];
                    });
                },
                layoutFun = function(list, property, defaultValue, space) {
                    var t = cssRules[list[0]],
                        r = cssRules[list[1]],
                        b = cssRules[list[2]],
                        l = cssRules[list[3]];
                    space = space?space:' ';
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
                if (styles[i] == '') {
                    continue;
                }
                var s = styles[i].split(/:(?!\/\/|image)/),
                    //url(http://xxx)
                    s0 = Y.Lang.trim(s[0]),
                    s1 = Y.Lang.trim(s[1]);
                //webkit only
                if(s0 != '-webkit-mask-image' && s0 != '-webkit-mask' && s0 != '-webkit-box-reflect' && s0 != '-webkit-text-stroke' && s0 != '-webkit-text-stroke-width' && s0 != '-webkit-text-stroke-color' && s0 != '-webkit-text-fill-color' && s0 != '-webkit-text-size-adjust'){
                    s0 = s0.replace(/-webkit-|-o-|-ms-|-moz-/, '');
                }
                cssRules[s0] = s1;
            }
            //combine border
            var borderTop = ['border-top-width', 'border-top-style', 'border-top-color'],
                borderRight = ['border-right-width', 'border-right-style', 'border-right-color'],
                borderBottom = ['border-bottom-width', 'border-bottom-style', 'border-bottom-color'],
                borderLeft = ['border-left-width', 'border-left-style', 'border-left-color'],
                borders = {
                    'border-top': borderTop,
                    'border-right': borderRight,
                    'border-bottom': borderBottom,
                    'border-left': borderLeft
                };
            if (typeof cssRules[borderTop[0]] != 'undefined' && typeof cssRules[borderTop[1]] != 'undefined' && typeof cssRules[borderTop[2]] != 'undefined' && cssRules[borderTop[0]] == cssRules[borderRight[0]] && cssRules[borderTop[0]] == cssRules[borderBottom[0]] && cssRules[borderTop[0]] == cssRules[borderLeft[0]] && cssRules[borderTop[1]] == cssRules[borderRight[1]] && cssRules[borderTop[1]] == cssRules[borderBottom[1]] && cssRules[borderTop[1]] == cssRules[borderLeft[1]] && cssRules[borderTop[2]] == cssRules[borderRight[2]] && cssRules[borderTop[2]] == cssRules[borderBottom[2]] && cssRules[borderTop[2]] == cssRules[borderLeft[2]]) {
                if (cssRules[borderTop[1]] == 'none' || cssRules[borderTop[0]] == '0px') {
                    cssRules['border'] = 'none';
                } else {
                    cssRules['border'] = cssRules[borderTop[0]] + ' ' + cssRules[borderTop[1]] + ' ' + cssRules[borderTop[2]];
                }
                deleteFun(borderTop.concat(borderRight.concat(borderBottom.concat(borderLeft))));
            } else {
                for (var i in borders) {
                    var b = borders[i];
                    if (cssRules[b[0]] && cssRules[b[1]] && cssRules[b[2]]) {
                        if (cssRules[b[1]] == 'none' || cssRules[b[0]] == '0px') {
                            cssRules[i] = 'none';
                        } else {
                            cssRules[i] = cssRules[b[0]] + ' ' + cssRules[b[1]] + ' ' + cssRules[b[2]];
                        }
                        deleteFun(b);
                    }
                }
            }
            //combine padding
            layoutFun(['padding-top', 'padding-right', 'padding-bottom', 'padding-left'], 'padding', '0px');
            //combine margin
            layoutFun(['margin-top', 'margin-right', 'margin-bottom', 'margin-left'], 'margin', '0px');
            //combine border-radius
            layoutFun(['border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius'], 'border-radius', '0px 0px', ',');
            for (var i in cssRules) {
                if (i == 'font-family') {
                    styleProperty += 'font-family:' + escape(cssRules[i].replace(/\s*,\s*/g, ',')).replace(/%/g, '\\').replace(/\\2C/g, ',').replace(/\\20/g, ' ').replace(/\\27/g, '"') + ';';
                }else if (i == 'box-shadow') {
                    styleProperty += ('-webkit-box-shadow:' + cssRules[i] + ';-moz-box-shadow:' + cssRules[i] + ';box-shadow:' + cssRules[i] + ';');
                } else if (i == 'border-radius') {
                    styleProperty += ('-webkit-border-radius:' + cssRules[i] + ';-moz-border-radius:' + cssRules[i] + ';border-radius:' + cssRules[i] + ';');
                } else if (i == 'background-image' && (/linear\-gradient/.test(cssRules[i]) || /webkit\-gradient\(linear/.test(cssRules[i]))) {
                    var _gradients = this.linearGradient.gradient.getGradient(true);
                    styleProperty += ('background-image:' + _gradients.webkit + ';background-image:' + _gradients.moz + ';background-image:' + _gradients.o + ';background-image:' + _gradients.ms + ';');
                } else if (i == 'transform') {
                    styleProperty += ('-webkit-transform:' + cssRules[i] + ';-moz-transform:' + cssRules[i] + ';-o-transform:' + cssRules[i] + ';-ms-transform:' + cssRules[i] + ';transform:' + cssRules[i] + ';');
                } else if (/transform-origin/.test(i)) {
                    cssRules['transform-origin-x'] = cssRules['transform-origin-x']?cssRules['transform-origin-x']:'50%';
                    cssRules['transform-origin-y'] = cssRules['transform-origin-y']?cssRules['transform-origin-y']:'50%';
                    cssRules['transform-origin'] = cssRules['transform-origin-x'] == cssRules['transform-origin-y']?cssRules['transform-origin-x']:cssRules['transform-origin-x'] + ' ' + cssRules['transform-origin-y'];
                    deleteFun(['transform-origin-x', 'transform-origin-y']);
                    styleProperty += ('-webkit-transform-origin:' + cssRules['transform-origin'] + ';-moz-transform-origin:' + cssRules['transform-origin'] + ';-o-transform-origin:' + cssRules['transform-origin'] + ';-ms-transform-origin:' + cssRules['transform-origin'] + ';transform-origin:' + cssRules['transform-origin'] + ';');
                } else {
                    styleProperty += i + ':' + cssRules[i] + ';';
                }
            }
            return styleProperty.replace(/;(?!base64)/g, ';\r\n');
        },

        setStyle: function(nodes, property, value) {
            nodes.setStyle(property, value);
            this.updateStyle();
        },

        getAttr: function(nodes, property) {
            return nodes.getAttribute(property)[0];
        },

        updateStyle: function() {
            var codeColaCurrentNode = this.get('codeColaCurrentNode');
            if (!codeColaCurrentNode || !window.codeColaTurnOn) {
                return;
            } //fix -webkit-user-select
            var style = this.getAttr(codeColaCurrentNode, 'style');
            if (!style) {
                Y.one('#codeCola-styles').set('value', '');
            } else {
                Y.one('#codeCola-styles').set('value', this.getCombinedStyle(style));
            }
        },

        updateNote: function() {
            var codeColaCurrentNode = this.get('codeColaCurrentNode');
            if (!window.codeColaTurnOn || !codeColaCurrentNode) {
                return;
            }
            var iconId = this.getAttr(codeColaCurrentNode, 'codeColaNoteIcon');
            if (iconId) {
                Y.one('#codeCola-note').set('value', Y.one('#'+iconId).get('innerHTML').replace(/<br>/g, '\r\n').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '\'').replace(/&apos;/g, '\''));
            } else {
                Y.one('#codeCola-note').set('value', '');
            }
        },

        _toggleMini: function(type){
            if(type == 'close'){
                Y.one('#codeCola-fold').set('className', '').set('title', this.chromeGetMSG('opt_unfold'));
            }else{
                Y.one('#codeCola-fold').set('className', 'cc-close').set('title', this.chromeGetMSG('opt_fold'));
            }
        },

        initControls: function(control){
            var _this = this;
            if(!control){
                var items = _this.get('plugs').all;
                Y.each(items, function(n) {
                    _this[n].sync(_this, Y);
                });
            }else{
                _this[control].sync(_this, Y);
            }
        },

        //for plugins
        bindRange: function(selector, format, type, callback) {
            var wrap = Y.one(selector),
                items = type=='select'?wrap.all('select'):wrap.all('input'),
                allSame = wrap.one('input'),
                len = items.size(),
                _this = this;
            items.each(function(item){
                if(item.get('type') == 'checkbox'){
                    return
                }
                item.on("change", function(e) {
                    var that = this,
                        value = that.get('value'),
                        property = that.get('name'),
                        next = that.next(),
                        previous = that.previous();
                    if (allSame.get('checked')) {
                        property = allSame.get('name');
                        for (var k = type=='select'?1:2; k < len; k++) {
                            items.item(k).set('value', value);
                        }
                    }
                    if(next){
                        next.set('value', value);
                    }else if(previous){
                        previous.set('value', value);
                    }
                    value = format?format(value):value;
                    if(callback){
                        callback(value);
                    }else{
                        _this.setStyle(_this.get('codeColaCurrentNode'), property, value);
                    }
                });
            });
        },

        bindSame: function(selector) {
            var _this = this;
            Y.one(selector).on("click", function(e) {
                var that = this,
                    items = that.get('parentNode').next().all('input,select'),
                    len = items.size(),
                    name = that.get('name'),
                    k = /selects/.test(that.get('className')) ? 1 : 2;
                if (!that.get('checked')) {
                    for (; k < len; k++) {
                        items.item(k).set('disabled', false);
                    }
                } else {
                    var firstItem = items.item(0),
                        value = firstItem.get('value');
                    for (; k < len; k++) {
                        items.item(k).set('value', value).set('disabled', true);
                    }
                    value = !isNaN(value) ? value + "px" : value;
                    firstItem.focus();
                    _this.setStyle(_this.get('codeColaCurrentNode'), name, value);
                }
            });
        },

        initRange: function(control, filter, format, callback){
            var _this = this,
                control = Y.one(control),
                value = _this.getStyle(_this.get('codeColaCurrentNode'), control.get('name'));

            if (!filter || !filter.test(value)) {
                value = value.replace(/px/g, '');
                if(format){
                    value = format(value);
                }
                control.set('value', value).next().set('value', value);
            }
        },

        initSelect: function(control, filter, format, callback){
            var _this = this,
                control = Y.one(control),
                value = _this.getStyle(_this.get('codeColaCurrentNode'), control.get('name'));

            if (!filter || !filter.test(value)) {
                control.set('value', value);
            }
        }
    }, {
        SCRIPT_codeCola:    '<script>' +
                            '	var getElementsByClassName = function(className,tagName){' +
                            '			if(typeof document.getElementsByClassName == "function"){' +
                            '					return document.getElementsByClassName(className);' +
                            '			}else{' +
                            '					var allNodes = document.getElementsByTagName(tagName?tagName:"*"),' +
                            '							nodes = [];' +
                            '					for(var i=0,j=allNodes.length;i<j;i++){' +
                            '							var c = allNodes[i];' +
                            '							if(c.className.indexOf(className) != -1){' +
                            '									nodes.push(c);' +
                            '							}' +
                            '					}' +
                            '					return nodes;' +
                            '			}' +
                            '	};' +
                            '	var codeColaNotes = getElementsByClassName("codeCola-note", "span");' +
                            '	for(var i=0,j=codeColaNotes.length;i<j;i++){' +
                            '			codeColaNotes[i].onmouseover = function(){' +
                            '					var targets = getElementsByClassName("note-"+this.id);' +
                            '					for(var k=0,l=targets.length;k<l;k++){' +
                            '						targets[k].className+=" codeCola-selecting";' +
                            '					}' +
                            '			};' +
                            '			codeColaNotes[i].onmouseout = function(){' +
                            '					var targets = getElementsByClassName(this.id);' +
                            '					for(var k=0,l=targets.length;k<l;k++){' +
                            '						targets[k].className = targets[k].className.replace(" codeCola-selecting","");' +
                            '					}' +
                            '			}' +
                            '	}' +
                            '</script>',

        STYLE_codeCola:     '/*\r\n'+
                            'Content-Type: multipart/related; boundary="_ANY_STRING_WILL_DO_AS_A_SEPARATOR"\r\n'+
                            '\r\n'+
                            '--_ANY_STRING_WILL_DO_AS_A_SEPARATOR'+
                            'Content-Location:comment.png'+
                            'Content-Transfer-Encoding:base64\r\n'+
                            '\r\n'+
                            'iVBORw0KGgoAAAANSUhEUgAAABkAAAAWCAMAAAF1ZvcSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAR1QTFRF//+c//+y//+5//+s//+1//+X//+p//+VLS0t//+h//+k//+T//+b//+QMzMz//+4//+R//+m//+x//+0//+U//+S//+u//+e//+Y//+aIyMjKysrGBgYFhYWHh4eGRkZDg4O//+oLy8v//+j//+W//+r//+g8LxX7Zso/7eVISEh/4Bl//+dHR0dHBwc00Au/9Bc/8hK6mIA1mYC8qUw/7xI9qYqERER/8BL/8pCoTUA/89X2WIA/3NR1WUC8apF//TOaG9v//+i/8s+cnFxAgIC77BJrFsz//+f/8RP24cnHx8f//+zFBQU/8NHExMTICAg//+va3Nz/5Bu+cha/9Zh3z8hzlwAGhoaycnJIiIi//+ZAAAA////////qFZ3sAAAAF90Uk5T/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wCTml8sAAABj0lEQVR42mKIjY2NY4hlNgASrHxxAAHEAOQyMDPHMgDZAAHEEMvExBTlGMsQy+kUExEHVBARAaTiAAIIpCY2LpaBn4mJnyOMQZWZ2d4mjkGNkzMWqEaFFagzjgGoMjIuDiCAGGKjoCBWWx9ojhAjCAiFeHKA7BQUjIkRjDU0jgWbycMAAjwycWCeqCg3N7e0dCSIBxBAYPvAIDI2kgFuYkxsDEMU0A1AV/DHcNjGMGiBjReKseSIiWTwBjqLmTnG1CQmMo5BF2hTTIy7WQzITRGcQADUDLZWBmwtDw+Y4wt0PND5fGCOOcgF3KKxYBdEgAGYHQcQYAhPwZ0SGQs0Hui2WDkF1xgEUAA60sVBMzgG6PUoYWEWGBAW9olR5+DgCALrCRATC4TpEItxs7B2NgKKgwJBTlGRDQpivPxCNezA4iAZPWVlLgiIiY21CoeKg2TkxcXFwUZ5gAgdeYibQTKyEtFAICkpCaIkJGQRMv4iIuxQoCQiogQzDCgjxQsEAiDAKyUFFwfJIAOEeFwcAAjkiPN/+5wYAAAAAElFTkSuQmCC\r\n'+
                            '\r\n'+
                            '*/'+
                            '.codeCola-note{'+
                            '   position:absolute;'+
                            '   background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAWCAMAAAF1ZvcSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAR1QTFRF//+c//+y//+5//+s//+1//+X//+p//+VLS0t//+h//+k//+T//+b//+QMzMz//+4//+R//+m//+x//+0//+U//+S//+u//+e//+Y//+aIyMjKysrGBgYFhYWHh4eGRkZDg4O//+oLy8v//+j//+W//+r//+g8LxX7Zso/7eVISEh/4Bl//+dHR0dHBwc00Au/9Bc/8hK6mIA1mYC8qUw/7xI9qYqERER/8BL/8pCoTUA/89X2WIA/3NR1WUC8apF//TOaG9v//+i/8s+cnFxAgIC77BJrFsz//+f/8RP24cnHx8f//+zFBQU/8NHExMTICAg//+va3Nz/5Bu+cha/9Zh3z8hzlwAGhoaycnJIiIi//+ZAAAA////////qFZ3sAAAAF90Uk5T/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wCTml8sAAABj0lEQVR42mKIjY2NY4hlNgASrHxxAAHEAOQyMDPHMgDZAAHEEMvExBTlGMsQy+kUExEHVBARAaTiAAIIpCY2LpaBn4mJnyOMQZWZ2d4mjkGNkzMWqEaFFagzjgGoMjIuDiCAGGKjoCBWWx9ojhAjCAiFeHKA7BQUjIkRjDU0jgWbycMAAjwycWCeqCg3N7e0dCSIBxBAYPvAIDI2kgFuYkxsDEMU0A1AV/DHcNjGMGiBjReKseSIiWTwBjqLmTnG1CQmMo5BF2hTTIy7WQzITRGcQADUDLZWBmwtDw+Y4wt0PND5fGCOOcgF3KKxYBdEgAGYHQcQYAhPwZ0SGQs0Hui2WDkF1xgEUAA60sVBMzgG6PUoYWEWGBAW9olR5+DgCALrCRATC4TpEItxs7B2NgKKgwJBTlGRDQpivPxCNezA4iAZPWVlLgiIiY21CoeKg2TkxcXFwUZ5gAgdeYibQTKyEtFAICkpCaIkJGQRMv4iIuxQoCQiogQzDCgjxQsEAiDAKyUFFwfJIAOEeFwcAAjkiPN/+5wYAAAAAElFTkSuQmCC) no-repeat 0 0;'+
                            '	*background-image:url(mhtml:STYLESHEETURL!comment.png);'+
                            '   width:0;'+
                            '   height:24px;'+
                            '   padding-left:24px;'+
                            '   overflow:hidden;'+
                            '   z-index:2147483645;'+
                            '   color:#333;'+
                            '   font:12px/24px arial;'+
                            '   text-shadow:none;'+
                            '}'+
                            '.codeCola-note:hover{'+
                            '   width:auto;'+
                            '   height:auto;'+
                            '   max-width:300px;'+
                            '   word-wrap:break-word;'+
                            '   padding:0 5px 0 29px;'+
                            '   background-color:#ffffe1;'+
                            '   border-radius:2px;'+
                            '   border:1px solid #ffcc55;'+
                            '   z-index:2147483646;'+
                            '}'+
                            '.codeCola-selecting{'+
                            '   outline:2px solid blue;'+
                            '}',

        isChromeExtension: typeof chrome != 'undefined' && chrome.extension,

        ATTRS:{
            plugs: {
                value: function(){
                    var LOADER = {
                        all: ['fontFamily', 'fontSize', 'lineHeight', 'color', 'fontOther', 'textAlign', 'textShadow', 'webkitTextStroke', 'background', 'linearGradient', 'opacity', 'boxShadow', 'webkitMaskImage', 'webkitBoxReflect', 'transform', 'border', 'borderRadius', 'layout', 'size', 'listStyle'],
                        normal: ['fontFamily', 'fontSize', 'lineHeight', 'color', 'fontOther', 'textAlign', 'textShadow', 'webkitTextStroke', 'background', 'linearGradient', 'opacity', 'boxShadow', 'webkitMaskImage', 'webkitBoxReflect', 'transform', 'border', 'borderRadius', 'layout', 'size'],
                        list: ['listStyle', 'fontFamily', 'fontSize', 'lineHeight', 'color', 'fontOther', 'textAlign', 'textShadow', 'webkitTextStroke', 'background', 'linearGradient', 'opacity', 'boxShadow', 'webkitMaskImage', 'webkitBoxReflect', 'transform', 'borderRadius', 'border', 'layout', 'size'],
                        img: ['size', 'border', 'borderRadius', 'boxShadow', 'transform', 'opacity', 'background', 'linearGradient', 'webkitMaskImage', 'webkitBoxReflect', 'layout']
                    };
                    if(!Y.UA.webkit){
                        Y.each(LOADER, function(i, key){
                            Y.each(i, function(item, index){
                                if(/webkit/.test(item)){
                                    delete LOADER[key][index];
                                }
                            });
                        });
                    }
                    LOADER['li'] = LOADER['ol'] = LOADER['ul'] = LOADER.list;
                    return LOADER;
                }()
            },
            getLinkAction: {
                validator: function(val){
                    return /^([^:]+):\/\/(?:([^:@]+):?([^@]*)@)?(?:([^/?#:]+):?(\d*))([^?#]*)(?:\?([^#]+))?(?:#(.+))?$/.test(val);
                }
            }
        }
    });
}, '3.4.3', {requires:['codecola-i18n', 'codecola-plugs', 'codecola-color', 'codecola-gradient', 'codecola-degree', 'codecola-css', 'widget-base', 'node-base', 'event-base', 'io-base', 'dd-plugin', 'ua', 'json-parse']});

YUI().use('codecola', function(Y){
    var _codeCola = new Y.codecola({
        //for get link function when not in chrome extension environment
        //getLinkAction: 'http://dev/dev/codecola/codecola.php'
    });

    var plugs = window.codecola.plug;
    Y.each(plugs, function(plug){
        _codeCola.plug(plug);
    });

    _codeCola.render();
});

})();