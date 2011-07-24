if(codecola){
    codecola.plug = {};
}else{
    var codecola = {
        plug: {}
    };
}


codecola.plug.fontSize = function(config) {};
codecola.plug.fontSize.NS = "fontSize";
codecola.plug.fontSize.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
        '<li id="codeCola-item-fontSize">'+
        '   <cctitle><label for="codeCola-fontSize">' + CODECOLA.chromeGetMSG("style_fz") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + CODECOLA.chromeGetMSG("opt_hide") + '" data="fontSize"></cci><cci class="codeCola-cancel" title="' + CODECOLA.chromeGetMSG("opt_undo") + '" data="fontSize"></cci></cctitle>' +
        '   <div class="codeCola-editorWrap">'+
        '       <input type="range" min="0" max="100" id="codeCola-fontSize" name="fontSize"/>'+
        '       <input type="number" id="codeCola-fontSize-c" class="codeCola-currentStyle" min="0" name="fontSize"/>(px)'+
        '   </div>'+
        '</li>'
    )
};
codecola.plug.fontSize.prototype.bind = function(CODECOLA, Y){
    var adjust = function(v){
        var codeColaCurrentNode = CODECOLA.get('codeColaCurrentNode');
        if (v < 12) {
            CODECOLA.setStyle(codeColaCurrentNode, 'webkitTextSizeAdjust', 'none');
        } else {
            CODECOLA.setStyle(codeColaCurrentNode, 'webkitTextSizeAdjust', '');
        }
        CODECOLA.setStyle(codeColaCurrentNode, 'fontSize', v + 'px');
    };
    Y.on('change', function(e) {
        var value = this.get('value');
        adjust(value);
        this.next().set('value', value);
    }, '#codeCola-fontSize');
    Y.on('change', function(e) {
        var value = this.get('value');
        adjust(value);
        this.previous().set('value', value);
    }, '#codeCola-fontSize-c');
};
codecola.plug.fontSize.prototype.sync = function(CODECOLA, Y){
    CODECOLA.initRange('#codeCola-fontSize');
};

codecola.plug.lineHeight = function(config) {};
codecola.plug.lineHeight.NS = "lineHeight";
codecola.plug.lineHeight.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
        '<li id="codeCola-item-lineHeight">'+
        '   <cctitle><label for="codeCola-lineHeight">' + CODECOLA.chromeGetMSG("style_lh") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + CODECOLA.chromeGetMSG("opt_hide") + '" data="lineHeight"></cci><cci class="codeCola-cancel" title="' + CODECOLA.chromeGetMSG("opt_undo") + '" data="lineHeight"></cci></cctitle>' +
        '   <div class="codeCola-editorWrap">'+
        '       <input type="range" min="0" max="100" id="codeCola-lineHeight" name="lineHeight"/>'+
        '       <input type="number" id="codeCola-lineHeight-c" class="codeCola-currentStyle" min="0" name="lineHeight"/>(px)'+
        '   </div>'+
        '</li>'
    )
};
codecola.plug.lineHeight.prototype.bind = function(CODECOLA, Y){
    //TODO:YUI3 setStyle bug "number values will add a unit(default:px)"
//            CODECOLA.bindRange('#codeCola-item-lineHeight', function(v){
//                return parseFloat(v).toFixed(2);
//            });
    CODECOLA.bindRange('#codeCola-item-lineHeight', function(v){
        return v+'px';
    });
};
codecola.plug.lineHeight.prototype.sync = function(CODECOLA, Y){
    CODECOLA.initRange('#codeCola-lineHeight');
};

codecola.plug.fontFamily = function(config) {};
codecola.plug.fontFamily.NS = "fontFamily";
codecola.plug.fontFamily.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
        '<li id="codeCola-item-fontFamily">'+
        '   <cctitle><label for="codeCola-fontFamily">' + CODECOLA.chromeGetMSG("style_ff") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + CODECOLA.chromeGetMSG("opt_hide") + '" data="fontFamily"></cci><cci class="codeCola-cancel" title="' + CODECOLA.chromeGetMSG("opt_undo") + '" data="fontFamily"></cci></cctitle>' +
        '   <div class="codeCola-editorWrap">' +
        '       <select id="codeCola-fontFamily" name="fontFamily">' +
        '	        <optgroup label="Chinese">' +
        '	            <option selected="seleted" value="\u5B8B\u4F53,Serif">' + CODECOLA.chromeGetMSG("style_ff_simsun") + '</option>' +
        '               <option value="\u5FAE\u8F6F\u96C5\u9ED1,\u9ED1\u4F53,Sans-Serif">' + CODECOLA.chromeGetMSG("style_ff_MSYH") + '</option>' +
        '               <option value="\u9ED1\u4F53,Sans-Serif">' + CODECOLA.chromeGetMSG("style_ff_simhei") + '</option>' +
        '               <option value="\u5E7C\u5706,Sans-Serif">' + CODECOLA.chromeGetMSG("style_ff_youyuan") + '</option>' +
        '           </optgroup>' +
        '           <optgroup label="English">' +
        '               <option value="Helvetica,tahoma,Arial,Sans-Serif">Helvetica</option>' +
        '               <option value="Arial,Helvetica,tahoma,Sans-Serif">Arial</option>' +
        '               <option value="tahoma,Helvetica,Arial,Sans-Serif">tahoma</option>' +
        '               <option value="\'Lucida Grande\', Helvetica,Arial,Sans-Serif">Lucida Grande</option>' +
        '               <option value="Georgia,Serif">Georgia</option>' +
        '           </optgroup>' +
        '       </select>' +
        '   </div>' +
        '</li>'
    )
};
codecola.plug.fontFamily.prototype.bind = function(CODECOLA, Y){
    Y.on('change', function(e) {
        CODECOLA.setStyle(CODECOLA.get('codeColaCurrentNode'), 'fontFamily', this.get('value'));
    }, '#codeCola-fontFamily');
};
codecola.plug.fontFamily.prototype.sync = function(CODECOLA, Y){
    //TODO:无法获得生效字体
    //$('codeCola-fontFamily').value = CODECOLA.getStyle(node, 'fontFamily');
};

codecola.plug.fontOther = function(config) {};
codecola.plug.fontOther.NS = "fontOther";
codecola.plug.fontOther.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
        '<li id="codeCola-item-fontOther">'+
        '   <cctitle><label>' + CODECOLA.chromeGetMSG("style_fs") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + CODECOLA.chromeGetMSG("opt_hide") + '" data="fontWeight,fontStyle,textDecoration" mutil="fontOther"></cci><cci class="codeCola-cancel" title="' + CODECOLA.chromeGetMSG("opt_undo") + '" data="fontWeight,fontStyle,textDecoration" mutil="fontOther"></cci></cctitle>' +
        '   <div class="codeCola-editorWrap">'+
        '       <label><input type="checkbox" value="bold" name="fontWeight" id="codeCola-fontWeight" name="fontWeight"> ' + CODECOLA.chromeGetMSG("style_fs_bold") + '</label>'+
        '       <label><input type="checkbox" value="italic" name="fontStyle" id="codeCola-fontStyle" name="fontStyle"> ' + CODECOLA.chromeGetMSG("style_fs_italic") + '</label>'+
        '       <label><input type="checkbox" value="underline" name="textDecoration" id="codeCola-textDecoration" name="textDecoration"> ' + CODECOLA.chromeGetMSG("style_fs_underline") + '</label>'+
        '   </div>'+
        '</li>'
    )
};
codecola.plug.fontOther.prototype.bind = function(CODECOLA, Y){
    Y.all('#codeCola-fontWeight,#codeCola-fontStyle,#codeCola-textDecoration').on('click', function(e) {
        var that = e.target,
            value = that.get('checked') ? that.get('value') : '';
        CODECOLA.setStyle(CODECOLA.get('codeColaCurrentNode'), that.get('name'), value);
    });
};
codecola.plug.fontOther.prototype.sync = function(CODECOLA, Y){
    var codeColaCurrentNode = CODECOLA.get('codeColaCurrentNode');
    Y.one('#codeCola-fontWeight').set('checked', CODECOLA.getStyle(codeColaCurrentNode, 'fontWeight') == 'bold');
    Y.one('#codeCola-fontStyle').set('checked', CODECOLA.getStyle(codeColaCurrentNode, 'fontStyle') == 'italic');
    Y.one('#codeCola-textDecoration').set('checked', CODECOLA.getStyle(codeColaCurrentNode, 'textDecoration') == 'underline');
};

codecola.plug.textAlign = function(config) {};
codecola.plug.textAlign.NS = "textAlign";
codecola.plug.textAlign.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
        '<li id="codeCola-item-textAlign">'+
        '   <cctitle><label>' + CODECOLA.chromeGetMSG("style_ta") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + CODECOLA.chromeGetMSG("opt_hide") + '" data="textAlign"></cci><cci class="codeCola-cancel" title="' + CODECOLA.chromeGetMSG("opt_undo") + '" data="textAlign"></cci></cctitle>' +
        '   <div class="codeCola-editorWrap">'+
        '       <label><input type="radio" value="left" name="textAlign" id="codeCola-textAlignLeft" name="textAlign"> ' + CODECOLA.chromeGetMSG("style_ta_left") + '</label>'+
        '       <label><input type="radio" value="center" name="textAlign" id="codeCola-textAlignCenter" name="textAlign"> ' + CODECOLA.chromeGetMSG("style_ta_center") + '</label>'+
        '       <label><input type="radio" value="right" name="textAlign" id="codeCola-textAlignRight" name="textAlign"> ' + CODECOLA.chromeGetMSG("style_ta_right") + '</label>'+
        '   </div>'+
        '</li>'
    )
};
codecola.plug.textAlign.prototype.bind = function(CODECOLA, Y){
    Y.all('#codeCola-textAlignLeft,#codeCola-textAlignCenter,#codeCola-textAlignRight').on('click', function(e) {
        CODECOLA.setStyle(CODECOLA.get('codeColaCurrentNode'), 'textAlign', e.target.get('value'));
    });
};
codecola.plug.textAlign.prototype.sync = function(CODECOLA, Y){
    var align = CODECOLA.getStyle(CODECOLA.get('codeColaCurrentNode'), 'textAlign'),
        styles = [document.getElementById('codeCola-textAlignLeft'), document.getElementById('codeCola-textAlignCenter'), document.getElementById('codeCola-textAlignRight')];
    for (var i = 0; i < 3; i++) {
        var that = styles[i];
        if (that.value == align) {
            that.checked = true;
            i = 3;
        }
    }
};

codecola.plug.color = function(config) {};
codecola.plug.color.NS = "color";
codecola.plug.color.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
        '<li id="codeCola-item-color">'+
        '<cctitle><label for="codeCola-color">' + CODECOLA.chromeGetMSG("style_c") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + CODECOLA.chromeGetMSG("opt_hide") + '" data="color"></cci><cci class="codeCola-cancel" title="' + CODECOLA.chromeGetMSG("opt_undo") + '" data="color"></cci></cctitle>' +
        '<div class="codeCola-editorWrap" id="codeCola-color"></div>'+
        '</li>'
    )
};
codecola.plug.color.prototype.bind = function(CODECOLA, Y){
    CODECOLA.color.color = new Y.codecolaColor({
        wrap: '#codeCola-color',
        onChange: function(color) {
            CODECOLA.setStyle(CODECOLA.get('codeColaCurrentNode'), 'color', color);
        }
    }).render();
};
codecola.plug.color.prototype.sync = function(CODECOLA, Y){
    CODECOLA.color.color.set('color', CODECOLA.getStyle(CODECOLA.get('codeColaCurrentNode'), 'color')).syncUI();
};

codecola.plug.textShadow = function(config) {};
codecola.plug.textShadow.NS = "textShadow";
codecola.plug.textShadow.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codeCola-item-textShadow">'+
    '<cctitle><label>' + CODECOLA.chromeGetMSG("style_ts") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + CODECOLA.chromeGetMSG("opt_hide") + '" data="textShadow"></cci><cci class="codeCola-cancel" title="' + CODECOLA.chromeGetMSG("opt_undo") + '" data="textShadow"></cci></cctitle>' +
    '<div class="codeCola-editorWrap">' +
    '   <ccfieldset id="codeCola-textShadowWrap">' +
    '	    <ol>' +
    '			<li><label>Degree:</label><div id="codeCola-textShadowDegree"></div></li>' +
    '			<li>'+
    '               <label for="codeCola-textShadowDistance">Distance:</label>'+
    '               <input type="range" min="0" max="100" id="codeCola-textShadowDistance" name="textShadow"/>'+
    '               <input type="number" id="codeCola-textShadowDistance-c" class="codeCola-currentStyle" min="0" name="textShadow"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codeCola-textShadowSize">Size:</label>'+
    '               <input type="range" min="0" max="100" id="codeCola-textShadowSize" name="textShadow"/>'+
    '               <input type="number" id="codeCola-textShadowSize-c" class="codeCola-currentStyle" min="0" name="textShadow"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codeCola-textShadowColor">Color:</label>'+
    '               <div id="codeCola-textShadowColor"></div>'+
    '           </li>' +
    '		</ol>' +
    '	</ccfieldset>' +
    '</div>'+
    '</li>'
    )
};
codecola.plug.textShadow.prototype.bind = function(CODECOLA, Y){
    var distance = Y.one('#codeCola-textShadowDistance'),
        size = Y.one('#codeCola-textShadowSize');

    function setTextShadow(color, degree) {
        var d = distance.get('value'),
            degree = degree || CODECOLA.textShadow.degree.getDegree(),
            color = color || CODECOLA.textShadow.color.getColor(),
            x = 0 - Math.round(d * Math.cos(degree * 0.017453293)),
            y = Math.round(d * Math.sin(degree * 0.017453293));
        CODECOLA.setStyle(CODECOLA.get('codeColaCurrentNode'), 'textShadow', x + 'px ' + y + 'px ' + size.get('value') + 'px ' + color);
    }
    CODECOLA.textShadow.color = new Y.codecolaColor({
        wrap: '#codeCola-textShadowColor',
        onChange: function(color) {
            setTextShadow(color);
        }
    }).render();

    CODECOLA.textShadow.degree = new Y.codecolaDegree({
        wrap: '#codeCola-textShadowDegree',
        onChange: function(degree) {
            setTextShadow(null, degree);
        }
    }).render();

    Y.on('change', function(e) {
        this.next().set('value', this.get('value'));
        setTextShadow();
    }, [distance, size]);
    Y.on('change', function(e) {
        this.previous().set('value', this.get('value'));
        setTextShadow();
    }, '#codeCola-textShadowDistance-c,#codeCola-textShadowSize-c');
};
codecola.plug.textShadow.prototype.sync = function(CODECOLA, Y){
    var textShadow = CODECOLA.getStyle(CODECOLA.get('codeColaCurrentNode'), 'textShadow'),
        value = [],
        d = Y.one('#codeCola-textShadowDistance'),
        size = Y.one('#codeCola-textShadowSize');

    if (textShadow == 'none') {
        value = [0, 0, 0, 'transparent'];
    } else {
        textShadow = textShadow.replace(/\,\s/g, ',').replace(/px/g, '').split(' ');
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
    CODECOLA.textShadow.color.set('color', value[3]).syncUI();
    CODECOLA.textShadow.degree.set('degree', value[0]).syncUI();
    d.set('value', value[1]).next().set('value', value[1]);
    size.set('value', value[2]).next().set('value', value[2]);
};

codecola.plug.backgroundColor = function(config) {};
codecola.plug.backgroundColor.NS = "backgroundColor";
codecola.plug.backgroundColor.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codeCola-item-backgroundColor">'+
    '<cctitle><label for="codeCola-backgroundColor">' + CODECOLA.chromeGetMSG("style_bc") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + CODECOLA.chromeGetMSG("opt_hide") + '" data="backgroundColor"></cci><cci class="codeCola-cancel" title="' + CODECOLA.chromeGetMSG("opt_undo") + '" data="backgroundColor"></cci></cctitle>' +
    '<div class="codeCola-editorWrap" id="codeCola-backgroundColor"></div>'+
    '</li>'
    )
};
codecola.plug.backgroundColor.prototype.bind = function(CODECOLA, Y){
    CODECOLA.backgroundColor.color = new Y.codecolaColor({
        wrap: '#codeCola-backgroundColor',
        onChange: function(color) {
            CODECOLA.setStyle(CODECOLA.get('codeColaCurrentNode'), 'backgroundColor', color);
        }
    }).render();
};
codecola.plug.backgroundColor.prototype.sync = function(CODECOLA, Y){
    var bgc = CODECOLA.getStyle(CODECOLA.get('codeColaCurrentNode'), 'backgroundColor');
    //bgc = bgc == 'rgba(0, 0, 0, 0)' ? 'transparent' : bgc;
    CODECOLA.backgroundColor.color.set('color', bgc).syncUI();
};


codecola.plug.backgroundImage = function(config) {};
codecola.plug.backgroundImage.NS = "backgroundImage";
codecola.plug.backgroundImage.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codeCola-item-backgroundImage">'+
    '<cctitle><label>' + CODECOLA.chromeGetMSG("style_lg") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + CODECOLA.chromeGetMSG("opt_hide") + '" data="backgroundImage"></cci><cci class="codeCola-cancel" title="' + CODECOLA.chromeGetMSG("opt_undo") + '" data="backgroundImage"></cci></cctitle>' +
    '<div class="codeCola-editorWrap" id="codeCola-backgroundImage"></div>'+
    '</li>'
    )
};
codecola.plug.backgroundImage.prototype.bind = function(CODECOLA, Y){
    CODECOLA.backgroundImage.gradient = new Y.codecolaGradient({
        wrap: '#codeCola-backgroundImage',
        panelWidth: 255,
        onChange: function(gradient) {
            CODECOLA.setStyle(CODECOLA.get('codeColaCurrentNode'), 'backgroundImage', gradient);
        }
    }).render();
};
codecola.plug.backgroundImage.prototype.sync = function(CODECOLA, Y){
    var v = CODECOLA.getStyle(CODECOLA.get('codeColaCurrentNode'), 'backgroundImage');
    if (!/linear/.test(v)) {
        v = '';
    }
    CODECOLA.backgroundImage.gradient.set('gradient', v).syncUI();
};

codecola.plug.webkitMaskImage = function(config) {};
codecola.plug.webkitMaskImage.NS = "webkitMaskImage";
codecola.plug.webkitMaskImage.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codeCola-item-webkitMaskImage">'+
    '<cctitle><label>' + CODECOLA.chromeGetMSG("style_wmi") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + CODECOLA.chromeGetMSG("opt_hide") + '" data="webkitMaskImage"></cci><cci class="codeCola-cancel" title="' + CODECOLA.chromeGetMSG("opt_undo") + '" data="webkitMaskImage"></cci></cctitle>' +
    '<div class="codeCola-editorWrap" id="codeCola-webkitMaskImage"></div>'+
    '</li>'
    )
};
codecola.plug.webkitMaskImage.prototype.bind = function(CODECOLA, Y){
    CODECOLA.webkitMaskImage.gradient = new Y.codecolaGradient({
        wrap: '#codeCola-webkitMaskImage',
        panelWidth: 255,
        onChange: function(gradient) {
            CODECOLA.setStyle(CODECOLA.get('codeColaCurrentNode'), 'webkitMaskImage', gradient);
        }
    }).render();
};
codecola.plug.webkitMaskImage.prototype.sync = function(CODECOLA, Y){
    var v = CODECOLA.getStyle(CODECOLA.get('codeColaCurrentNode'), 'webkitMaskImage');
    if (!/linear/.test(v)) {
        v = '';
    }
    CODECOLA.webkitMaskImage.gradient.set('gradient', v).syncUI();
};

codecola.plug.webkitBoxReflect = function(config) {};
codecola.plug.webkitBoxReflect.NS = "webkitBoxReflect";
codecola.plug.webkitBoxReflect.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codeCola-item-webkitBoxReflect">'+
    '<cctitle><label>' + CODECOLA.chromeGetMSG("style_wbr") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + CODECOLA.chromeGetMSG("opt_hide") + '" data="webkitBoxReflect"></cci><cci class="codeCola-cancel" title="' + CODECOLA.chromeGetMSG("opt_undo") + '" data="webkitBoxReflect"></cci></cctitle>' +
    '<div class="codeCola-editorWrap codeCola-editor-multi">'+
    '   <ccfieldset>'+
    '       <cclegend>' + CODECOLA.chromeGetMSG("style_wbr_d") + '</cclegend>'+
    '       <select id="codeCola-webkitBoxReflectDirection" name="webkitBoxReflect">'+
    '           <option value="above">above</option>'+
    '           <option value="below">below</option>'+
    '           <option value="left">left</option>'+
    '           <option value="right">right</option>'+
    '       </select>'+
    '   </ccfieldset>'+
    '   <ccfieldset>'+
    '       <cclegend>' + CODECOLA.chromeGetMSG("style_wbr_o") + '</cclegend>'+
    '       <input type="range" min="-900" max="900" id="codeCola-webkitBoxReflectOffset" name="webkitBoxReflect"/>'+
    '       <input type="number" id="codeCola-webkitBoxReflectOffset-c" class="codeCola-currentStyle" name="webkitBoxReflect"/>(px)'+
    '   </ccfieldset>'+
    '   <ccfieldset>'+
    '       <cclegend>' + CODECOLA.chromeGetMSG("style_wbr_g") + '</cclegend>'+
    '       <div id="codeCola-webkitBoxReflectGradient"></div>'+
    '   </ccfieldset>'+
    '</div>'+
    '</li>'
    )
};
codecola.plug.webkitBoxReflect.prototype.bind = function(CODECOLA, Y){
    var direction = Y.one('#codeCola-webkitBoxReflectDirection'),
        offset = Y.one('#codeCola-webkitBoxReflectOffset'),
        getGradient = function(){
            return CODECOLA.webkitBoxReflect.gradient.getGradient();
        };
    CODECOLA.webkitBoxReflect.gradient = new Y.codecolaGradient({
        wrap: '#codeCola-webkitBoxReflectGradient',
        panelWidth: 255,
        onChange: function(gradient) {
            CODECOLA.setStyle(CODECOLA.get('codeColaCurrentNode'), 'webkitBoxReflect', direction.get('value') + ' ' + offset.get('value') + 'px ' + gradient);
        }
    }).render();
    offset.next().on('change', function(e) {
        var value = this.get('value');
        CODECOLA.setStyle(CODECOLA.get('codeColaCurrentNode'), 'webkitBoxReflect', direction.get('value') + ' ' + value + 'px ' + getGradient());
        offset.set('value', value);
    });
    offset.on('change', function(e) {
        var value = this.get('value');
        CODECOLA.setStyle(CODECOLA.get('codeColaCurrentNode'), 'webkitBoxReflect', direction.get('value') + ' ' + value + 'px ' + getGradient());
        offset.next().set('value', value);
    });
    direction.on('change', function(e) {
        CODECOLA.setStyle(CODECOLA.get('codeColaCurrentNode'), 'webkitBoxReflect', this.get('value') + ' ' + offset.get('value') + 'px ' + getGradient());
    });
};
codecola.plug.webkitBoxReflect.prototype.sync = function(CODECOLA, Y){
    var v = CODECOLA.getStyle(CODECOLA.get('codeColaCurrentNode'), 'webkitBoxReflect'),
        g = '',
        d = 'above',
        o = 0;
    if (v != 'none') {
        g = v.match(/\-.+\)\)\)/)[0];
        v = v.replace(/px/g, '').split(' ');
        d = v[0];
        o = v[1];
    }
    Y.one('#codeCola-webkitBoxReflectDirection').set('value', d);
    Y.one('#codeCola-webkitBoxReflectOffset').set('value', o).next().set('value', o);
    CODECOLA.webkitBoxReflect.gradient.set('gradient', g).syncUI();
};

codecola.plug.opacity = function(config) {};
codecola.plug.opacity.NS = "opacity";
codecola.plug.opacity.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codeCola-item-opacity">'+
    '<cctitle><label for="codeCola-opacity">' + CODECOLA.chromeGetMSG("style_op") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + CODECOLA.chromeGetMSG("opt_hide") + '" data="opacity"></cci><cci class="codeCola-cancel" title="' + CODECOLA.chromeGetMSG("opt_undo") + '" data="opacity"></cci></cctitle>' +
    '<div class="codeCola-editorWrap">'+
    '   <input type="range" min="0" max="1" id="codeCola-opacity" step="0.01" name="opacity"/>'+
    '   <input type="number" id="codeCola-opacity-c" class="codeCola-currentStyle" min="0" max="1" step="0.01" name="opacity"/>'+
    '</div>'+
    '</li>'
    )
};
codecola.plug.opacity.prototype.bind = function(CODECOLA, Y){
    CODECOLA.bindRange('#codeCola-item-opacity', function(v){
        return parseFloat(v).toFixed(2);
    });
};
codecola.plug.opacity.prototype.sync = function(CODECOLA, Y){
    CODECOLA.initRange('#codeCola-opacity');
};

codecola.plug.boxShadow = function(config) {};
codecola.plug.boxShadow.NS = "boxShadow";
codecola.plug.boxShadow.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codeCola-item-boxShadow">'+
    '<cctitle><label>' + CODECOLA.chromeGetMSG("style_bs") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + CODECOLA.chromeGetMSG("opt_hide") + '" data="boxShadow"></cci><cci class="codeCola-cancel" title="' + CODECOLA.chromeGetMSG("opt_undo") + '" data="boxShadow"></cci></cctitle>' +
    '<div class="codeCola-editorWrap">' +
    '   <ccfieldset id="codeCola-boxShadowWrap">' +
    '	    <ol>' +
    '			<li><label>Inset:</label><label><input type="radio" value="inset" id="codeCola-boxShadowInset" name="boxShadow"> ' + CODECOLA.chromeGetMSG("style_bs_inset") + '</label> <label><input type="radio" value="outset" id="codeCola-boxShadowOutset" name="boxShadow"> ' + CODECOLA.chromeGetMSG("style_bs_outset") + '</label></li>' +
    '			<li><label>Degree:</label><div id="codeCola-boxShadowDegree"></div></li>' +
    '			<li>'+
    '               <label for="codeCola-boxShadowDistance">Distance:</label>'+
    '               <input type="range" min="0" max="100" id="codeCola-boxShadowDistance" name="boxShadow"/>'+
    '               <input type="number" id="codeCola-boxShadowDistance-c" class="codeCola-currentStyle" min="0" name="boxShadow"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codeCola-boxShadowSize">Size:</label>'+
    '               <input type="range" min="0" max="100" id="codeCola-boxShadowSize" name="boxShadow"/>'+
    '               <input type="number" id="codeCola-boxShadowSize-c" class="codeCola-currentStyle" min="0" name="boxShadow"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codeCola-boxShadowSpread">Spread:</label>'+
    '               <input type="range" min="-100" max="100" id="codeCola-boxShadowSpread" name="boxShadow"/>'+
    '               <input type="number" id="codeCola-boxShadowSpread-c" class="codeCola-currentStyle" min="0" name="boxShadow"/>(px)'+
    '           </li>' +
    '			<li><label for="codeCola-boxShadowColor">Color:</label><div id="codeCola-boxShadowColor"></div></li>' +
    '		</ol>' +
    '	</ccfieldset>' +
    '</div>'+
    '</li>'
    )
};
codecola.plug.boxShadow.prototype.bind = function(CODECOLA, Y){
    var inset = Y.one('#codeCola-boxShadowInset'),
        outset = Y.one('#codeCola-boxShadowOutset'),
        distance = Y.one('#codeCola-boxShadowDistance'),
        size = Y.one('#codeCola-boxShadowSize'),
        spread = Y.one('#codeCola-boxShadowSpread');

    function setBoxShadow(color, degree) {
        var optinal = inset.get('checked') ? 'inset' : '',
            d = distance.get('value'),
            degree = degree || CODECOLA.boxShadow.degree.getDegree(),
            color = color || CODECOLA.boxShadow.color.getColor(),
            x = 0 - Math.round(d * Math.cos(degree * 0.017453293)),
            y = Math.round(d * Math.sin(degree * 0.017453293));
        CODECOLA.setStyle(CODECOLA.get('codeColaCurrentNode'), 'boxShadow', optinal + ' ' + x + 'px ' + y + 'px ' + size.get('value') + 'px ' + spread.get('value') + 'px ' + color);
    }

    CODECOLA.boxShadow.color = new Y.codecolaColor({
        wrap: '#codeCola-boxShadowColor',
        onChange: function(color) {
            setBoxShadow(color);
        }
    }).render();

    CODECOLA.boxShadow.degree = new Y.codecolaDegree({
        wrap: '#codeCola-boxShadowDegree',
        onChange: function(degree) {
            setBoxShadow(null, degree);
        }
    }).render();

    Y.on('change', function(e) {
        this.next().set('value', this.get('value'));
        setBoxShadow();
    }, [distance, size, spread]);

    Y.on('change', function(e) {
        this.previous().set('value', this.get('value'));
        setBoxShadow();
    }, '#codeCola-boxShadowDistance-c,#codeCola-boxShadowSize-c,#codeCola-boxShadowSpread-c');

    Y.on('click', function(e) {
        setBoxShadow();
    }, [inset, outset]);
};
codecola.plug.boxShadow.prototype.sync = function(CODECOLA, Y){
    var boxShadow = CODECOLA.getStyle(CODECOLA.get('codeColaCurrentNode'), 'boxShadow'),
        value = [],
        inset = document.getElementById('codeCola-boxShadowInset'),
        outset = document.getElementById('codeCola-boxShadowOutset'),
        d = Y.one('#codeCola-boxShadowDistance'),
        size = Y.one('#codeCola-boxShadowSize'),
        spread = Y.one('#codeCola-boxShadowSpread');
    if (boxShadow == 'none') {
        value = ['transparent', 0, 0, 0, 0, 'outset'];
    } else {
        boxShadow = boxShadow.replace(/\s*\,\s*/g, ',').replace(/px/g, '').split(' ');
        value[0] = boxShadow[0];
        value[1] = Math.round(Math.atan2(boxShadow[1], boxShadow[2]) * (360 / (2 * Math.PI)));
        if (value[1] >= -180 && value[1] <= 90) {
            value[1] += 90;
        } else {
            value[1] -= 270;
        }
        value[2] = Math.round(Math.sqrt(Math.pow(boxShadow[1], 2) + Math.pow(boxShadow[2], 2)));
        value[3] = boxShadow[3];
        value[4] = boxShadow[4]?boxShadow[4]:0;
        value[5] = boxShadow[5];
    }
    CODECOLA.boxShadow.color.set('color', value[0]).syncUI();
    CODECOLA.boxShadow.degree.set('degree', value[1]).syncUI();
    d.set('value', value[2]).next().set('value', value[2]);
    size.set('value', value[3]).next().set('value', value[3]);
    spread.set('value', value[4]).next().set('value', value[4]);
    if (value[5] == 'inset') {
        inset.checked = true;
    } else {
        outset.checked = true;
    }
};

codecola.plug.border = function(config) {};
codecola.plug.border.NS = "border";
codecola.plug.border.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codeCola-item-border">'+
    '<cctitle><label>' + CODECOLA.chromeGetMSG("style_b") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + CODECOLA.chromeGetMSG("opt_hide") + '" data="borderTop,borderRight,borderBottom,borderLeft,borderRadius" mutil="border"></cci><cci class="codeCola-cancel" title="' + CODECOLA.chromeGetMSG("opt_undo") + '" data="border,borderRadius" mutil="border"></cci></cctitle>' +
    '<div class="codeCola-editorWrap codeCola-editor-multi">' +
    '	<ccfieldset id="codeCola-borderWidthWrap">' +
    '	    <cclegend>' + CODECOLA.chromeGetMSG("style_b_width") + '</cclegend>' +
    '		<label><input type="checkbox" class="set-same" name="borderWidth" id="codeCola-sameBorderWidth"/> ' + CODECOLA.chromeGetMSG("opt_same") + '</label>' +
    '		<ol>' +
    '			<li>'+
    '               <label for="codeCola-borderTopWidth">Top:</label>'+
    '               <input type="range" min="0" max="100" id="codeCola-borderTopWidth" name="borderTopWidth"/>'+
    '               <input type="number" id="codeCola-borderTopWidth-c" class="codeCola-currentStyle" min="0" name="borderTopWidth"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codeCola-borderRightWidth">Right:</label>'+
    '               <input type="range" min="0" max="100" id="codeCola-borderRightWidth" name="borderRightWidth"/>'+
    '               <input type="number" id="codeCola-borderRightWidth-c" class="codeCola-currentStyle" min="0" name="borderRightWidth"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codeCola-borderBottomWidth">Bottom:</label>'+
    '               <input type="range" min="0" max="100" id="codeCola-borderBottomWidth" name="borderBottomWidth"/>'+
    '               <input type="number" id="codeCola-borderBottomWidth-c" class="codeCola-currentStyle" min="0" name="borderBottomWidth"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codeCola-borderLeftWidth">Left:</label>'+
    '               <input type="range" min="0" max="100" id="codeCola-borderLeftWidth" name="borderLeftWidth"/>'+
    '               <input type="number" id="codeCola-borderLeftWidth-c" class="codeCola-currentStyle" min="0" name="borderLeftWidth"/>(px)'+
    '           </li>' +
    '		</ol>' +
    '	</ccfieldset>' +
    '	<ccfieldset id="codeCola-borderStyleWrap">' +
    '	    <cclegend>' + CODECOLA.chromeGetMSG("style_b_style") + '</cclegend>' +
    '		<label><input type="checkbox" class="set-same selects" name="borderStyle" id="codeCola-sameBorderStyle"/> ' + CODECOLA.chromeGetMSG("opt_same") + '</label>' +
    '		<ol>' +
    '			<li>' +
    '				<label for="codeCola-borderTopStyle">Top:</label>' +
    '  				<select id="codeCola-borderTopStyle" name="borderTopStyle">' +
    '      			    <option selected="seleted" value="none">none</option>' +
    '      			    <option value="solid">solid</option>' +
    '      			    <option value="dashed">dashed</option>' +
    '      			    <option value="dotted">dotted</option>' +
    '      			    <option value="double">double</option>' +
    '      			    <option value="groove">groove</option>' +
    '      			    <option value="inset">inset</option>' +
    '      			    <option value="outset">outset</option>' +
    '      			    <option value="ridge">ridge</option>' +
    '  				</select>' +
    '			</li>' +
    '			<li>' +
    '				<label for="codeCola-borderRightStyle">Right:</label>' +
    '  				<select id="codeCola-borderRightStyle" name="borderRightStyle">' +
    '      			    <option selected="seleted" value="none">none</option>' +
    '      			    <option value="solid">solid</option>' +
    '      			    <option value="dashed">dashed</option>' +
    '      			    <option value="dotted">dotted</option>' +
    '      			    <option value="double">double</option>' +
    '      			    <option value="groove">groove</option>' +
    '      			    <option value="inset">inset</option>' +
    '      			    <option value="outset">outset</option>' +
    '      			    <option value="ridge">ridge</option>' +
    '  				</select>' +
    '			</li>' +
    '			<li>' +
    '				<label for="codeCola-borderBottomStyle">Bottom:</label>' +
    '  				<select id="codeCola-borderBottomStyle" name="borderBottomStyle">' +
    '      			    <option selected="seleted" value="none">none</option>' +
    '      			    <option value="solid">solid</option>' +
    '      			    <option value="dashed">dashed</option>' +
    '      			    <option value="dotted">dotted</option>' +
    '      			    <option value="double">double</option>' +
    '      			    <option value="groove">groove</option>' +
    '      			    <option value="inset">inset</option>' +
    '      			    <option value="outset">outset</option>' +
    '      			    <option value="ridge">ridge</option>' +
    '  				</select>' +
    '			</li>' +
    '			<li>' +
    '				<label for="codeCola-borderLeftStyle">Left:</label>' +
    '  				<select id="codeCola-borderLeftStyle" name="borderLeftStyle">' +
    '      			    <option selected="seleted" value="none">none</option>' +
    '         			<option value="solid">solid</option>' +
    '         			<option value="dashed">dashed</option>' +
    '         			<option value="dotted">dotted</option>' +
    '         			<option value="double">double</option>' +
    '         			<option value="groove">groove</option>' +
    '         			<option value="inset">inset</option>' +
    '         			<option value="outset">outset</option>' +
    '         			<option value="ridge">ridge</option>' +
    '  				</select>' +
    '			</li>' +
    '		</ol>' +
    '	</ccfieldset>' +
    '	<ccfieldset id="codeCola-borderColorWrap">' +
    '		<cclegend>' + CODECOLA.chromeGetMSG("style_b_color") + '</cclegend>' +
    '		<label><input type="checkbox" class="set-same" name="borderColor" id="codeCola-sameBorderColor"/> ' + CODECOLA.chromeGetMSG("opt_same") + '</label>' +
    '		<ol>' +
    '			<li><label for="codeCola-borderTopColor">Top:</label><div id="codeCola-borderTopColor"></div></li>' +
    '			<li><label for="codeCola-borderRightColor">Right:</label><div id="codeCola-borderRightColor"></div></li>' +
    '			<li><label for="codeCola-borderBottomColor">Bottom:</label><div id="codeCola-borderBottomColor"></div></li>' +
    '			<li><label for="codeCola-borderLeftColor">Left:</label><div id="codeCola-borderLeftColor"></div></li>' +
    '		</ol>' +
    '	</ccfieldset>' +
    '	<ccfieldset id="codeCola-borderRadiusWrap">' +
    '		<cclegend>' + CODECOLA.chromeGetMSG("style_b_radius") + '</cclegend>' +
    '		<label><input type="checkbox" class="set-same" name="borderRadius" id="codeCola-sameBorderRadius"/> ' + CODECOLA.chromeGetMSG("opt_same") + '</label>' +
    '		<ol>' +
    '			<li>'+
    '               <label for="codeCola-borderTopLeftRadius">TL:</label>'+
    '               <input type="range" min="0" max="100" id="codeCola-borderTopLeftRadius" name="borderTopLeftRadius"/>'+
    '               <input type="number" id="codeCola-borderTopLeftRadius-c" class="codeCola-currentStyle" min="0" name="borderTopLeftRadius"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codeCola-borderTopRightRadius">TR:</label>'+
    '               <input type="range" min="0" max="100" id="codeCola-borderTopRightRadius" name="borderTopRightRadius"/>'+
    '               <input type="number" id="codeCola-borderTopRightRadius-c" class="codeCola-currentStyle" min="0" name="borderTopRightRadius"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codeCola-borderBottomRightRadius">BR:</label>'+
    '               <input type="range" min="0" max="100" id="codeCola-borderBottomRightRadius" name="borderBottomRightRadius"/>'+
    '               <input type="number" id="codeCola-borderBottomRightRadius-c" class="codeCola-currentStyle" min="0" name="borderBottomRightRadius"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codeCola-borderBottomLeftRadius">BL:</label>'+
    '               <input type="range" min="0" max="100" id="codeCola-borderBottomLeftRadius" name="borderBottomLeftRadius"/>'+
    '               <input type="number" id="codeCola-borderBottomLeftRadius-c" class="codeCola-currentStyle" min="0" name="borderBottomLeftRadius"/>(px)'+
    '           </li>' +
    '		</ol>' +
    '	</ccfieldset>' +
    '</div>'+
    '</li>'
    )
};
codecola.plug.border.prototype.bind = function(CODECOLA, Y){
    CODECOLA.bindSame('#codeCola-sameBorderWidth');
    CODECOLA.bindSame('#codeCola-sameBorderStyle');
    CODECOLA.bindSame('#codeCola-sameBorderRadius');
    CODECOLA.bindRange('#codeCola-borderWidthWrap', function(v){
        return v +'px'
    });
    CODECOLA.bindRange('#codeCola-borderRadiusWrap', function(v){
        return v +'px'
    });
    CODECOLA.bindRange('#codeCola-borderStyleWrap', null, 'select');

    var nodes = null, sameColor = Y.one('#codeCola-sameBorderColor');
    Y.each(['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'], function(n) {
        CODECOLA[n] = {};
        CODECOLA[n].color = new Y.codecolaColor({
            wrap: '#codeCola-' + n,
            onChange: function(color) {
                if (sameColor.get('checked')) {
                    CODECOLA.setStyle(CODECOLA.get('codeColaCurrentNode'), 'borderColor', color);
                    CODECOLA.setStyle(nodes, 'backgroundColor', color);
                    nodes.set('value', color);
                } else {
                    CODECOLA.setStyle(CODECOLA.get('codeColaCurrentNode'), n, color);
                }
            },
            onInit: function(){
                nodes = Y.all('#codeCola-borderColorWrap .codecola-color-input');
            }
        }).render();
    });

    sameColor.on('click', function() {
        if (this.get('checked')) {
            var first = nodes.item(0),
                color = first.get('value');
            first.focus();
            nodes.set('value', color);
            CODECOLA.setStyle(nodes, 'backgroundColor', color);
            CODECOLA.setStyle(CODECOLA.get('codeColaCurrentNode'), 'borderColor', color);
            nodes.set('disabled', true);
            first.set('disabled', false);
        } else {
            nodes.set('disabled', false);
        }
    });
};
codecola.plug.border.prototype.sync = function(CODECOLA, Y){
    Y.each(['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'], function(n) {
        CODECOLA[n].color.set('color', CODECOLA.getStyle(CODECOLA.get('codeColaCurrentNode'), n)).syncUI();
    });
    Y.each(['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle'], function(n) {
        CODECOLA.initSelect('#codeCola-'+n);
    });
    Y.each(['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'], function(n) {
        CODECOLA.initRange('#codeCola-'+n);
    });
};

codecola.plug.listStyle = function(config) {};
codecola.plug.listStyle.NS = "listStyle";
codecola.plug.listStyle.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codeCola-item-listStyle">'+
    '<cctitle><label>' + CODECOLA.chromeGetMSG("style_ls") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + CODECOLA.chromeGetMSG("opt_hide") + '" data="listStyle"></cci><cci class="codeCola-cancel" title="' + CODECOLA.chromeGetMSG("opt_undo") + '" data="listStyle"></cci></cctitle>' +
    '<div class="codeCola-editorWrap">' +
    '   <select id="codeCola-listStyleType" name="listStyleType">' +
    '       <option selected="seleted" value="none">' + CODECOLA.chromeGetMSG("style_ls_none") + '</option>' +
    '       <option value="disc">disc</option>' +
    '       <option value="circle">circle</option>' +
    '       <option value="square">square</option>' +
    '       <option value="decimal">decimal</option>' +
    '       <option value="decimal-leading-zero">decimal-leading-zero</option>' +
    '       <option value="lower-roman">lower-roman</option>' +
    '       <option value="upper-roman">upper-roman</option>' +
    '       <option value="lower-alpha">lower-alpha</option>' +
    '       <option value="upper-alpha">upper-alpha</option>' +
    '       <option value="cjk-ideographic">cjk-ideographic</option>' +
    '   </select>' +
    '   <select id="codeCola-listStylePosition" name="listStylePosition">' +
    '	    <option selected="seleted" value="inside">inside</option>' +
    '       <option value="outside">outside</option>' +
    '   </select>' +
    '</div>'+
    '</li>'
    )
};
codecola.plug.listStyle.prototype.bind = function(CODECOLA, Y){
    Y.on('change', function(e) {
        CODECOLA.setStyle(CODECOLA.get('codeColaCurrentNode'), 'listStyleType', this.get('value'));
    }, '#codeCola-listStyleType');
    Y.on('change', function(e) {
        CODECOLA.setStyle(CODECOLA.get('codeColaCurrentNode'), 'listStylePosition', this.get('value'));
    }, '#codeCola-listStylePosition');
};
codecola.plug.listStyle.prototype.sync = function(CODECOLA, Y){
    Y.one('#codeCola-listStyleType').set('value', CODECOLA.getStyle(CODECOLA.get('codeColaCurrentNode'), 'listStyleType'));
    Y.one('#codeCola-listStylePosition').set('value', CODECOLA.getStyle(CODECOLA.get('codeColaCurrentNode'), 'listStylePosition'));
};

codecola.plug.layout = function(config) {};
codecola.plug.layout.NS = "layout";
codecola.plug.layout.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codeCola-item-layout">'+
    '<cctitle><label>' + CODECOLA.chromeGetMSG("style_l") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + CODECOLA.chromeGetMSG("opt_hide") + '" data="padding,margin" mutil="layout"></cci><cci class="codeCola-cancel" title="' + CODECOLA.chromeGetMSG("opt_undo") + '" data="padding,margin" mutil="layout"></cci></cctitle>' +
    '<div class="codeCola-editorWrap codeCola-editor-multi">' +
    '   <ccfieldset id="codeCola-paddingWrap">' +
    '		<cclegend>' + CODECOLA.chromeGetMSG("style_l_padding") + '</cclegend>' +
    '		<label><input type="checkbox" class="set-same" name="padding" id="codeCola-samePadding"/> ' + CODECOLA.chromeGetMSG("opt_same") + '</label>' +
    '		<ol>' +
    '	        <li>'+
    '               <label for="codeCola-paddingTop">Top:</label>'+
    '               <input type="range" min="0" max="1000" id="codeCola-paddingTop" name="paddingTop"/>'+
    '               <input type="number" id="codeCola-paddingTop-c" class="codeCola-currentStyle" min="0" name="paddingTop"/>(px)'+
    '           </li>' +
    '		    <li>'+
    '               <label for="codeCola-paddingRight">Right:</label>'+
    '               <input type="range" min="0" max="1000" id="codeCola-paddingRight" name="paddingRight"/>'+
    '               <input type="number" id="codeCola-paddingRight-c" class="codeCola-currentStyle" min="0" name="paddingRight"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codeCola-paddingBottom">Bottom:</label>'+
    '               <input type="range" min="0" max="1000" id="codeCola-paddingBottom" name="paddingBottom"/>'+
    '               <input type="number" id="codeCola-paddingBottom-c" class="codeCola-currentStyle" min="0" name="paddingBottom"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codeCola-paddingLeft">Left:</label>'+
    '               <input type="range" min="0" max="1000" id="codeCola-paddingLeft" name="paddingLeft"/>'+
    '               <input type="number" id="codeCola-paddingLeft-c" class="codeCola-currentStyle" min="0" name="paddingLeft"/>(px)'+
    '           </li>' +
    '		</ol>' +
    '	</ccfieldset>' +
    '	<ccfieldset id="codeCola-marginWrap">' +
    '		<cclegend>' + CODECOLA.chromeGetMSG("style_l_margin") + '</cclegend>' +
    '		<label><input type="checkbox" class="set-same" name="margin" id="codeCola-sameMargin"/> ' + CODECOLA.chromeGetMSG("opt_same") + '</label>' +
    '		<ol>' +
    '			<li>'+
    '               <label for="codeCola-marginTop">Top:</label>'+
    '               <input type="range" min="0" max="1000" id="codeCola-marginTop" name="marginTop"/>'+
    '               <input type="number" id="codeCola-marginTop-c" class="codeCola-currentStyle" min="0" name="paddingLeft"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codeCola-marginRight">Right:</label>'+
    '               <input type="range" min="0" max="1000" id="codeCola-marginRight" name="marginRight"/>'+
    '               <input type="number" id="codeCola-marginRight-c" class="codeCola-currentStyle" min="0" name="marginRight"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codeCola-marginBottom">Bottom:</label>'+
    '               <input type="range" min="0" max="1000" id="codeCola-marginBottom" name="marginBottom"/>'+
    '               <input type="number" id="codeCola-marginBottom-c" class="codeCola-currentStyle" min="0" name="marginBottom"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codeCola-marginLeft">Left:</label>'+
    '               <input type="range" min="0" max="1000" id="codeCola-marginLeft" name="marginLeft"/>'+
    '               <input type="number" id="codeCola-marginLeft-c" class="codeCola-currentStyle" min="0" name="marginLeft"/>(px)'+
    '           </li>' +
    '		</ol>' +
    '	</ccfieldset>' +
    '</div>'+
    '</li>'
    )
};
codecola.plug.layout.prototype.bind = function(CODECOLA, Y){
    CODECOLA.bindSame('#codeCola-samePadding');
    CODECOLA.bindSame('#codeCola-sameMargin');
    CODECOLA.bindRange('#codeCola-paddingWrap', function(v){
        return v +'px'
    });
    CODECOLA.bindRange('#codeCola-marginWrap', function(v){
        return v +'px'
    });
};
codecola.plug.layout.prototype.sync = function(CODECOLA, Y){
    Y.each(['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft'], function(n) {
        CODECOLA.initRange('#codeCola-'+n);
    });
};

codecola.plug.size = function(config) {};
codecola.plug.size.NS = "size";
codecola.plug.size.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codeCola-item-size">'+
    '<cctitle><label>' + CODECOLA.chromeGetMSG("style_s") + '</label><cci class="codeCola-arrow"></cci><cci class="codeCola-eye" title="' + CODECOLA.chromeGetMSG("opt_hide") + '" data="width,height" mutil="size"></cci><cci class="codeCola-cancel" title="' + CODECOLA.chromeGetMSG("opt_undo") + '" data="width,height" mutil="size"></cci></cctitle>' +
    '<div class="codeCola-editorWrap">' +
    '	<ccfieldset id="codeCola-size">' +
    '		<ol>' +
    '			<li>'+
    '               <label for="codeCola-width">Width:</label>'+
    '               <input type="range" min="0" max="1440" id="codeCola-width" name="width"/>'+
    '               <input type="number" id="codeCola-width-c" class="codeCola-currentStyle" min="0" name="width"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codeCola-height">Height:</label>'+
    '               <input type="range" min="0" max="900" id="codeCola-height" name="height"/>'+
    '               <input type="number" id="codeCola-height-c" class="codeCola-currentStyle" min="0" name="height"/>(px)'+
    '           </li>' +
    '		</ol>' +
    '	</ccfieldset>' +
    '</div>'+
    '</li>'
    )
};
codecola.plug.size.prototype.bind = function(CODECOLA, Y){
    CODECOLA.bindRange('#codeCola-size', function(v){
        return v +'px'
    });
};
codecola.plug.size.prototype.sync = function(CODECOLA, Y){
    CODECOLA.initRange('#codeCola-width', /auto/);
    CODECOLA.initRange('#codeCola-height', /auto/);
};