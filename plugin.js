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
        '<li id="codecola-item-fontSize">'+
        '   <div class="codecola-item-title"><label for="codecola-fontSize">{{style_fz}}</label><span class="codecola-eye codecola-icon" title="{{opt_hide}}" data="fontSize"></span><span class="codecola-cancel codecola-icon" title="{{opt_undo}}" data="fontSize"></span></div>' +
        '   <div class="codecola-editorWrap">'+
        '       <input type="range" min="0" max="100" id="codecola-fontSize" name="fontSize"/>'+
        '       <input type="number" id="codecola-fontSize-c" class="codecola-currentStyle" min="0" name="fontSize"/>(px)'+
        '   </div>'+
        '</li>'
    )
};
codecola.plug.fontSize.prototype.bind = function(CODECOLA, Y){
    var adjust = function(v){
        var codecolaCurrentNode = CODECOLA.get('codecolaCurrentNode');
        if (v < 12) {
            CODECOLA.setStyle(codecolaCurrentNode, 'webkitTextSizeAdjust', 'none');
        } else {
            CODECOLA.setStyle(codecolaCurrentNode, 'webkitTextSizeAdjust', '');
        }
        CODECOLA.setStyle(codecolaCurrentNode, 'fontSize', v + 'px');
    };
    Y.on('change', function(e) {
        var value = this.get('value');
        this.next().set('value', value);
        adjust(value);
    }, '#codecola-fontSize');
    Y.on('change', function(e) {
        var value = this.get('value');
        this.previous().set('value', value);
        adjust(value);
    }, '#codecola-fontSize-c');
};
codecola.plug.fontSize.prototype.sync = function(CODECOLA, Y){
    CODECOLA.initRange('#codecola-fontSize');
};

codecola.plug.lineHeight = function(config) {};
codecola.plug.lineHeight.NS = "lineHeight";
codecola.plug.lineHeight.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
        '<li id="codecola-item-lineHeight">'+
        '   <div class="codecola-item-title"><label for="codecola-lineHeight">{{style_lh}}</label><span class="codecola-eye codecola-icon" title="{{opt_hide}}" data="lineHeight"></span><span class="codecola-cancel codecola-icon" title="{{opt_undo}}" data="lineHeight"></span></div>' +
        '   <div class="codecola-editorWrap">'+
        '       <input type="range" min="0" max="100" id="codecola-lineHeight" name="lineHeight"/>'+
        '       <input type="number" id="codecola-lineHeight-c" class="codecola-currentStyle" min="0" name="lineHeight"/>(px)'+
        '   </div>'+
        '</li>'
    )
};
codecola.plug.lineHeight.prototype.bind = function(CODECOLA, Y){
    //TODO:YUI3 setStyle bug "number values will add a unit(default:px)"
//            CODECOLA.bindRange('#codecola-item-lineHeight', function(v){
//                return parseFloat(v).toFixed(2);
//            });
    CODECOLA.bindRange('#codecola-item-lineHeight', function(v){
        return v+'px';
    });
};
codecola.plug.lineHeight.prototype.sync = function(CODECOLA, Y){
    CODECOLA.initRange('#codecola-lineHeight');
};

codecola.plug.fontFamily = function(config) {};
codecola.plug.fontFamily.NS = "fontFamily";
codecola.plug.fontFamily.prototype.render = function(CODECOLA){
    //TODO android and ios typeface
    CODECOLA.renderPlug(
        '<li id="codecola-item-fontFamily">'+
        '   <div class="codecola-item-title"><label for="codecola-fontFamily">{{style_ff}}</label><span class="codecola-eye codecola-icon" title="{{opt_hide}}" data="fontFamily"></span><span class="codecola-cancel codecola-icon" title="{{opt_undo}}" data="fontFamily"></span></div>' +
        '   <div class="codecola-editorWrap">' +
        '       <select id="codecola-fontFamily" name="fontFamily">' +
        '           <optgroup label="Safe List">' +
        '	            <option selected="seleted" value="\u5B8B\u4F53,serif">{{style_ff_simsun}}</option>' +
        '               <option value="\u9ED1\u4F53,sans-serif">{{style_ff_simhei}}</option>' +
        '               <option value="Arial,sans-serif">Arial</option>' +
        '               <option value="Arial Black,sans-serif">Arial Black</option>' +
        '               <option value="Impact,sans-serif">Impact</option>' +
        '               <option value="Verdana,sans-serif">Verdana</option>' +
        '               <option value="Comic Sans MS,sans-serif">Comic Sans MS</option>' +
        '               <option value="Lucida Grande,sans-serif">Lucida Grande</option>' +
        '               <option value="Trebuchet MS,sans-serif">Trebuchet MS</option>' +
        '               <option value="Georgia,serif">Georgia</option>' +
        '               <option value="Courier New,serif">Courier New</option>' +
        '               <option value="Times New Roman,serif">Times New Roman</option>' +
        '           </optgroup>' +
        '	        <optgroup label="Windows Default">' +
        '               <option value="\u5FAE\u8F6F\u96C5\u9ED1,\u9ED1\u4F53,sans-serif">{{style_ff_MSYH}}</option>' +
        '               <option value="\u5E7C\u5706,sans-serif">{{style_ff_youyuan}}</option>' +
        '               <option value="Arial,sans-serif">Arial</option>'+
        '               <option value="Arial Black,sans-serif">Arial Black</option>'+
        '               <option value="Comic Sans MS,sans-serif">Comic Sans MS</option>'+
        '               <option value="Courier New,serif">Courier New</option>'+
        '               <option value="Georgia,serif">Georgia</option>'+
        '               <option value="Impact,sans-serif">Impact</option>'+
        '               <option value="Lucida Console,sans-serif">Lucida Console</option>'+
        '               <option value="Lucida Sans Unicode,sans-serif">Lucida Sans Unicode</option>'+
        '               <option value="Microsoft Sans Serif,sans-serif">Microsoft Sans Serif</option>'+
        '               <option value="MS Mincho,serif">MS Mincho</option>'+
        '               <option value="Palatino Linotype,sans-serif">Palatino Linotype</option>'+
        '               <option value="Symbol,sans-serif">Symbol</option>'+
        '               <option value="tahoma,Helvetica,Arial,sans-serif">Tahoma</option>'+
        '               <option value="Times New Roman,serif">Times New Roman</option>'+
        '               <option value="Trebuchet MS,sans-serif">Trebuchet MS</option>'+
        '               <option value="Verdana,sans-serif">Verdana</option>'+
        '           </optgroup>' +
        '           <optgroup label="Mac Default">' +
        '               <option value="\u534E\u6587\u4EFF\u5B8B,\u4EFF\u5B8B,\u5B8B\u4F53,serif">{{style_ff_STFangsong}}</option>'+
        '               <option value="\u534E\u6587\u9ED1\u4F53,\u9ED1\u4F53,sans-serif">{{style_ff_STHeiti}}</option>'+
        '               <option value="\u534E\u6587\u6977\u4F53,\u6977\u4F53,serif">{{style_ff_STKaiti}}</option>'+
        '               <option value="\u534E\u6587\u5B8B\u4F53,\u5B8B\u4F53,serif">{{style_ff_STSong}}</option>'+
        '               <option value="American Typewriter,serif">American Typewriter</option>'+
        '               <option value="Andale Mono,sans-serif">Andale Mono</option>'+
        '               <option value="Arial,sans-serif">Arial</option>'+
        '               <option value="Arial Black,sans-serif">Arial Black</option>'+
        '               <option value="Arial Narrow,sans-serif">Arial Narrow</option>'+
        '               <option value="Brush Script MT,sans-serif">Brush Script MT</option>'+
        '               <option value="Capitals,serif">Capitals</option>'+
        '               <option value="Apple Chancery,sans-serif">Apple Chancery</option>'+
        '               <option value="Baskerville,serif">Baskerville</option>'+
        '               <option value="Big Caslon,serif">Big Caslon</option>'+
        '               <option value="Charcoal,sans-serif">Charcoal</option>'+
        '               <option value="Chicago,sans-serif">Chicago</option>'+
        '               <option value="Comic Sans MS,sans-serif">Comic Sans MS</option>'+
        '               <option value="Copperplate,serif">Copperplate</option>'+
        '               <option value="Courier,serif">Courier</option>'+
        '               <option value="Courier New,serif">Courier New</option>'+
        '               <option value="Didot,serif">Didot</option>'+
        '               <option value="Gadget,sans-serif">Gadget</option>'+
        '               <option value="Georgia,serif">Georgia</option>'+
        '               <option value="Geneva,sans-serif">Geneva</option>'+
        '               <option value="Gill Sans,sans-serif">Gill Sans</option>'+
        '               <option value="Futura,sans-serif">Futura</option>'+
        '               <option value="Helvetica,sans-serif">Helvetica</option>'+
        '               <option value="Helvetica Neue,sans-serif">Helvetica Neue</option>'+
        '               <option value="Herculanum,sans-serif">Herculanum</option>'+
        '               <option value="Hoefler Text,serif">Hoefler Text</option>'+
        '               <option value="Impact,sans-serif">Impact</option>'+
        '               <option value="Lucida Grande,sans-serif">Lucida Grande</option>'+
        '               <option value="Marker Felt,serif">Marker Felt</option>'+
        '               <option value="Monaco,sans-serif">Monaco</option>'+
        '               <option value="New York,sans-serif">New York</option>'+
        '               <option value="Optima,sans-serif">Optima</option>'+
        '               <option value="Papyrus,sans-serif">Papyrus</option>'+
        '               <option value="Sand,sans-serif">Sand</option>'+
        '               <option value="Skia,sans-serif">Skia</option>'+
        '               <option value="Techno,sans-serif">Techno</option>'+
        '               <option value="Textile,sans-serif">Textile</option>'+
        '               <option value="Times,serif">Times</option>'+
        '               <option value="Times New Roman,serif">Times New Roman</option>'+
        '               <option value="Trebuchet MS,sans-serif">Trebuchet MS</option>'+
        '               <option value="Verdana,sans-serif">Verdana</option>'+
        '               <option value="Zapfino,sans-serif">Zapfino</option>'+
        '           </optgroup>' +
        '       </select>' +
        '   </div>' +
        '</li>'
    )
};
codecola.plug.fontFamily.prototype.bind = function(CODECOLA, Y){
    Y.on('change', function(e) {
        CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'fontFamily', this.get('value'));
    }, '#codecola-fontFamily');
};
codecola.plug.fontFamily.prototype.sync = function(CODECOLA, Y){
    //TODO:无法获得生效字体
    //$('codecola-fontFamily').value = CODECOLA.getStyle(node, 'fontFamily');
};

codecola.plug.fontOther = function(config) {};
codecola.plug.fontOther.NS = "fontOther";
codecola.plug.fontOther.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
        '<li id="codecola-item-fontOther">'+
        '   <div class="codecola-item-title"><label>{{style_fs}}</label><span class="codecola-eye codecola-icon" title="{{opt_hide}}" data="fontWeight,fontStyle,textDecoration" mutil="fontOther"></span><span class="codecola-cancel codecola-icon" title="{{opt_undo}}" data="fontWeight,fontStyle,textDecoration" mutil="fontOther"></span></div>' +
        '   <div class="codecola-editorWrap">'+
        '       <label><input type="checkbox" value="bold" name="fontWeight" id="codecola-fontWeight" name="fontWeight"> {{style_fs_bold}}</label>'+
        '       <label><input type="checkbox" value="italic" name="fontStyle" id="codecola-fontStyle" name="fontStyle"> {{style_fs_italic}}</label>'+
        '       <label><input type="checkbox" value="underline" name="textDecoration" id="codecola-textDecoration" name="textDecoration"> {{style_fs_underline}}</label>'+
        '   </div>'+
        '</li>'
    )
};
codecola.plug.fontOther.prototype.bind = function(CODECOLA, Y){
    Y.one('#codecola-item-fontOther').delegate('click', function(e) {
        var that = e.currentTarget,
            value = that.get('checked') ? that.get('value') : '';
        CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), that.get('name'), value);
    }, 'input');
};
codecola.plug.fontOther.prototype.sync = function(CODECOLA, Y){
    var codecolaCurrentNode = CODECOLA.get('codecolaCurrentNode');
    Y.one('#codecola-fontWeight').set('checked', CODECOLA.getStyle(codecolaCurrentNode, 'fontWeight') == 'bold');
    Y.one('#codecola-fontStyle').set('checked', CODECOLA.getStyle(codecolaCurrentNode, 'fontStyle') == 'italic');
    Y.one('#codecola-textDecoration').set('checked', CODECOLA.getStyle(codecolaCurrentNode, 'textDecoration') == 'underline');
};

codecola.plug.textAlign = function(config) {};
codecola.plug.textAlign.NS = "textAlign";
codecola.plug.textAlign.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
        '<li id="codecola-item-textAlign">'+
        '   <div class="codecola-item-title"><label>{{style_ta}}</label><span class="codecola-eye codecola-icon" title="{{opt_hide}}" data="textAlign"></span><span class="codecola-cancel codecola-icon" title="{{opt_undo}}" data="textAlign"></span></div>' +
        '   <div class="codecola-editorWrap">'+
        '       <label><input type="radio" value="left" name="textAlign"> {{style_ta_left}}</label>'+
        '       <label><input type="radio" value="center" name="textAlign"> {{style_ta_center}}</label>'+
        '       <label><input type="radio" value="right" name="textAlign"> {{style_ta_right}}</label>'+
        '       <label><input type="radio" value="justify" name="textAlign"> {{style_ta_justify}}</label>'+
        '   </div>'+
        '</li>'
    )
};
codecola.plug.textAlign.prototype.bind = function(CODECOLA, Y){
    Y.one('#codecola-item-textAlign').delegate('click', function(e) {
        CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'textAlign', e.currentTarget.get('value'));
    }, 'input');
};
codecola.plug.textAlign.prototype.sync = function(CODECOLA, Y){
    var align = CODECOLA.getStyle(CODECOLA.get('codecolaCurrentNode'), 'textAlign'),
        input = Y.one('#codecola-item-textAlign [value="'+align+'"]');
    if(input){
        input.set('checked', 'checked');
    }

};

codecola.plug.color = function(config) {};
codecola.plug.color.NS = "color";
codecola.plug.color.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
        '<li id="codecola-item-color">'+
        '<div class="codecola-item-title"><label for="codecola-color">{{style_c}}</label><span class="codecola-eye codecola-icon" title="{{opt_hide}}" data="color"></span><span class="codecola-cancel codecola-icon" title="{{opt_undo}}" data="color"></span></div>' +
        '<div class="codecola-editorWrap" id="codecola-color"></div>'+
        '</li>'
    )
};
codecola.plug.color.prototype.bind = function(CODECOLA, Y){
    CODECOLA.color.color = new Y.codecolaColor({
        wrap: '#codecola-color',
        onChange: function(color) {
            CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'color', color);
        }
    }).render();
};
codecola.plug.color.prototype.sync = function(CODECOLA, Y){
    CODECOLA.color.color.set('color', CODECOLA.getStyle(CODECOLA.get('codecolaCurrentNode'), 'color')).syncUI();
};

codecola.plug.textShadow = function(config) {};
codecola.plug.textShadow.NS = "textShadow";
codecola.plug.textShadow.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codecola-item-textShadow">'+
    '<div class="codecola-item-title"><label>{{style_ts}}</label><span class="codecola-eye codecola-icon" title="{{opt_hide}}" data="textShadow"></span><span class="codecola-cancel codecola-icon" title="{{opt_undo}}" data="textShadow"></span><a target="_blank" class="codecola-compatibility codecola-icon" title="{{opt_compatibility}}" href="http://caniuse.com/#feat=css-textshadow"></a></div>' +
    '<div class="codecola-editorWrap">' +
    '   <ccfieldset id="codecola-textShadowWrap">' +
    '	    <ol>' +
    '			<li><label>Degree:</label><div id="codecola-textShadowDegree"></div></li>' +
    '			<li>'+
    '               <label for="codecola-textShadowDistance">Distance:</label>'+
    '               <input type="range" min="0" max="100" id="codecola-textShadowDistance" name="textShadow"/>'+
    '               <input type="number" id="codecola-textShadowDistance-c" class="codecola-currentStyle" min="0" name="textShadow"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-textShadowSize">Size:</label>'+
    '               <input type="range" min="0" max="100" id="codecola-textShadowSize" name="textShadow"/>'+
    '               <input type="number" id="codecola-textShadowSize-c" class="codecola-currentStyle" min="0" name="textShadow"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-textShadowColor">Color:</label>'+
    '               <div id="codecola-textShadowColor"></div>'+
    '           </li>' +
    '		</ol>' +
    '	</ccfieldset>' +
    '</div>'+
    '</li>'
    )
};
codecola.plug.textShadow.prototype.bind = function(CODECOLA, Y){
    var distance = Y.one('#codecola-textShadowDistance'),
        size = Y.one('#codecola-textShadowSize'),
        setTextShadow = function(color, degree) {
            var d = distance.get('value'),
                degree = degree || CODECOLA.textShadow.degree.getDegree(),
                color = color || CODECOLA.textShadow.color.getColor(),
                x = 0 - Math.round(d * Math.cos(degree * 0.017453293)),
                y = Math.round(d * Math.sin(degree * 0.017453293));
            CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'textShadow', x + 'px ' + y + 'px ' + size.get('value') + 'px ' + color);
        };
    CODECOLA.textShadow.color = new Y.codecolaColor({
        wrap: '#codecola-textShadowColor',
        onChange: function(color) {
            setTextShadow(color);
        }
    }).render();

    CODECOLA.textShadow.degree = new Y.codecolaDegree({
        wrap: '#codecola-textShadowDegree',
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
    }, '#codecola-textShadowDistance-c,#codecola-textShadowSize-c');
};
codecola.plug.textShadow.prototype.sync = function(CODECOLA, Y){
    var textShadow = CODECOLA.getStyle(CODECOLA.get('codecolaCurrentNode'), 'textShadow'),
        value = [],
        d = Y.one('#codecola-textShadowDistance'),
        size = Y.one('#codecola-textShadowSize');

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


codecola.plug.background = function(config) {};
codecola.plug.background.NS = "background";
codecola.plug.background.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codecola-item-background">'+
    '<div class="codecola-item-title"><label for="codecola-background">{{style_bg}}</label><span class="codecola-eye codecola-icon" title="{{opt_hide}}" data="background"></span><span class="codecola-cancel codecola-icon" title="{{opt_undo}}" data="background"></span><a target="_blank" class="codecola-compatibility codecola-icon" title="{{opt_compatibility}}" href="http://caniuse.com/#feat=datauri"></a></div>' +
    '<div class="codecola-editorWrap">' +
    '   <ccfieldset id="codecola-backgroundWrap">' +
    '	    <ol>' +
    '			<li><label>Color:</label><div id="codecola-backgroundColor"></div></li>' +
    '			<li><label for="codecola-backgroundImage">Image:</label><input type="file" id="codecola-backgroundImage"/></li>' +
    '			<li id="codecola-backgroundPositionX-wrap">'+
    '               <label for="codecola-backgroundPositionX" title="Position X">X:</label>'+
    '               <input type="range" min="0" max="100" id="codecola-backgroundPositionX" name="background-position-x"/>'+
    '               <input type="number" id="codecola-backgroundPositionX-c" class="codecola-currentStyle" name="background-position-x"/>(%)'+
    '           </li>' +
    '			<li id="codecola-backgroundPositionY-wrap">'+
    '               <label for="codecola-backgroundPositionY" title="Position Y">Y:</label>'+
    '               <input type="range" min="0" max="100" id="codecola-backgroundPositionY" name="background-position-y"/>'+
    '               <input type="number" id="codecola-backgroundPositionY-c" class="codecola-currentStyle" name="background-position-y"/>(%)'+
    '           </li>' +
    '			<li>' +
    '				<label for="codecola-backgroundRepeat">Repeat:</label>' +
    '  				<select id="codecola-backgroundRepeat" name="backgroundRepeat">' +
    '      			    <option selected="selected" value="no-repeat">no-repeat</option>' +
    '      			    <option value="repeat-x">repeat-x</option>' +
    '      			    <option value="repeat-y">repeat-y</option>' +
    '      			    <option value="repeat">repeat</option>' +
    '  				</select>' +
    '			</li>' +
    '		</ol>' +
    '	</ccfieldset>' +
    '</div>'+
    '</li>'
    )
};
codecola.plug.background.prototype.bind = function(CODECOLA, Y){
    CODECOLA.background.color = new Y.codecolaColor({
        wrap: '#codecola-backgroundColor',
        onChange: function(color) {
            CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'backgroundColor', color);
        }
    }).render();

    CODECOLA.bindRange('#codecola-backgroundPositionX-wrap', function(v){
        return v + '%';
    });
    CODECOLA.bindRange('#codecola-backgroundPositionY-wrap', function(v){
        return v + '%';
    });

    Y.on('change', function(e){
        CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'background-repeat', this.get('value'));
    }, '#codecola-backgroundRepeat');

    Y.on('change', function(e){
        var oFReader = new FileReader(),
            oFile = e.target._node.files[0];
        oFReader.onload = function(e) {
            CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'background-image', 'url(' + e.target.result + ')');
        };
        oFReader.readAsDataURL(oFile);
    }, '#codecola-backgroundImage');
};
codecola.plug.background.prototype.sync = function(CODECOLA, Y){
    var cNode = CODECOLA.get('codecolaCurrentNode');
    var bgc = CODECOLA.getStyle(cNode, 'backgroundColor');
    //bgc = bgc == 'rgba(0, 0, 0, 0)' ? 'transparent' : bgc;
    CODECOLA.background.color.set('color', bgc).syncUI();

    CODECOLA.initRange('#codecola-backgroundPositionX', null, function(v){
        return parseInt(v, 10);
    });
    CODECOLA.initRange('#codecola-backgroundPositionY', null, function(v){
        return parseInt(v, 10);
    });

    var bgr = CODECOLA.getStyle(cNode, 'backgroundRepeat');
    document.getElementById('codecola-backgroundRepeat').value = bgr;

    document.getElementById('codecola-backgroundImage').value = '';
};


codecola.plug.linearGradient = function(config) {};
codecola.plug.linearGradient.NS = "linearGradient";
codecola.plug.linearGradient.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codecola-item-linearGradient">'+
    '<div class="codecola-item-title"><label>{{style_lg}}</label><span class="codecola-eye codecola-icon" title="{{opt_hide}}" data="backgroundImage"></span><span class="codecola-cancel codecola-icon" title="{{opt_undo}}" data="backgroundImage"></span><a target="_blank" class="codecola-compatibility codecola-icon" title="{{opt_compatibility}}" href="http://caniuse.com/#feat=css-gradients"></a></div>' +
    '<div class="codecola-editorWrap" id="codecola-linearGradient"></div>'+
    '</li>'
    )
};
codecola.plug.linearGradient.prototype.bind = function(CODECOLA, Y){
    CODECOLA.linearGradient.gradient = new Y.codecolaGradient({
        wrap: '#codecola-linearGradient',
        panelWidth: 255,
        onChange: function(gradient) {
            CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'backgroundImage', gradient);
        }
    }).render();
};
codecola.plug.linearGradient.prototype.sync = function(CODECOLA, Y){
    var v = CODECOLA.getStyle(CODECOLA.get('codecolaCurrentNode'), 'backgroundImage');
    if(/url\(\w+\)/.test(v)){
        return;
    }
    if (!/linear/.test(v)) {
        v = '';
    }
    CODECOLA.linearGradient.gradient.set('gradient', v).syncUI();
};

codecola.plug.webkitMaskImage = function(config) {};
codecola.plug.webkitMaskImage.NS = "webkitMaskImage";
codecola.plug.webkitMaskImage.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codecola-item-webkitMaskImage">'+
    '<div class="codecola-item-title"><label>{{style_wmi}}</label><span class="codecola-eye codecola-icon" title="{{opt_hide}}" data="webkitMaskImage"></span><span class="codecola-cancel codecola-icon" title="{{opt_undo}}" data="webkitMaskImage"></span></div>' +
    '<div class="codecola-editorWrap" id="codecola-webkitMaskImage"></div>'+
    '</li>'
    )
};
codecola.plug.webkitMaskImage.prototype.bind = function(CODECOLA, Y){
    CODECOLA.webkitMaskImage.gradient = new Y.codecolaGradient({
        wrap: '#codecola-webkitMaskImage',
        panelWidth: 255,
        onChange: function(gradient) {
            CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'webkitMaskImage', gradient);
        }
    }).render();
};
codecola.plug.webkitMaskImage.prototype.sync = function(CODECOLA, Y){
    var v = CODECOLA.getStyle(CODECOLA.get('codecolaCurrentNode'), 'webkitMaskImage');
    if (!/linear/.test(v)) {
        v = '';
    }
    CODECOLA.webkitMaskImage.gradient.set('gradient', v).syncUI();
};

codecola.plug.webkitBoxReflect = function(config) {};
codecola.plug.webkitBoxReflect.NS = "webkitBoxReflect";
codecola.plug.webkitBoxReflect.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codecola-item-webkitBoxReflect">'+
    '<div class="codecola-item-title"><label>{{style_wbr}}</label><span class="codecola-eye codecola-icon" title="{{opt_hide}}" data="webkitBoxReflect"></span><span class="codecola-cancel codecola-icon" title="{{opt_undo}}" data="webkitBoxReflect"></span><a target="_blank" class="codecola-compatibility codecola-icon" title="{{opt_compatibility}}" href="http://caniuse.com/#feat=css-reflections"></a></div>' +
    '<div class="codecola-editorWrap codecola-editor-multi">'+
    '   <ccfieldset>'+
    '       <cclegend>{{style_wbr_d}}</cclegend>'+
    '       <select id="codecola-webkitBoxReflectDirection" name="webkitBoxReflect">'+
    '           <option value="below">below</option>'+
    '           <option value="above">above</option>'+
    '           <option value="left">left</option>'+
    '           <option value="right">right</option>'+
    '       </select>'+
    '   </ccfieldset>'+
    '   <ccfieldset>'+
    '       <cclegend>{{style_wbr_o}}</cclegend>'+
    '       <input type="range" min="-900" max="900" id="codecola-webkitBoxReflectOffset" name="webkitBoxReflect"/>'+
    '       <input type="number" id="codecola-webkitBoxReflectOffset-c" class="codecola-currentStyle" name="webkitBoxReflect"/>(px)'+
    '   </ccfieldset>'+
    '   <ccfieldset>'+
    '       <cclegend>{{style_wbr_g}}</cclegend>'+
    '       <div id="codecola-webkitBoxReflectGradient"></div>'+
    '   </ccfieldset>'+
    '</div>'+
    '</li>'
    )
};
codecola.plug.webkitBoxReflect.prototype.bind = function(CODECOLA, Y){
    var direction = Y.one('#codecola-webkitBoxReflectDirection'),
        offset = Y.one('#codecola-webkitBoxReflectOffset'),
        getGradient = function(){
            return CODECOLA.webkitBoxReflect.gradient.getGradient();
        };
    CODECOLA.webkitBoxReflect.gradient = new Y.codecolaGradient({
        wrap: '#codecola-webkitBoxReflectGradient',
        panelWidth: 255,
        onChange: function(gradient) {
            CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'webkitBoxReflect', direction.get('value') + ' ' + offset.get('value') + 'px ' + gradient);
        }
    }).render();
    offset.next().on('change', function(e) {
        var value = this.get('value');
        console.log(value);
        CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'webkitBoxReflect', direction.get('value') + ' ' + value + 'px ' + getGradient());
        offset.set('value', value);
    });
    offset.on('change', function(e) {
        var value = this.get('value');
        CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'webkitBoxReflect', direction.get('value') + ' ' + value + 'px ' + getGradient());
        offset.next().set('value', value);
    });
    direction.on('change', function(e) {
        CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'webkitBoxReflect', this.get('value') + ' ' + offset.get('value') + 'px ' + getGradient());
    });
};
codecola.plug.webkitBoxReflect.prototype.sync = function(CODECOLA, Y){
    var v = CODECOLA.getStyle(CODECOLA.get('codecolaCurrentNode'), 'webkitBoxReflect'),
        g = '',
        d = 'below',
        o = 0;
    if (v != 'none') {
        g = v.match(/\-.+\)\)\)/)[0];
        v = v.replace(/px/g, '').split(' ');
        d = v[0];
        o = v[1];
    }
    Y.one('#codecola-webkitBoxReflectDirection').set('value', d);
    Y.one('#codecola-webkitBoxReflectOffset').set('value', o).next().set('value', o);
    CODECOLA.webkitBoxReflect.gradient.set('gradient', g).syncUI();
};

codecola.plug.opacity = function(config) {};
codecola.plug.opacity.NS = "opacity";
codecola.plug.opacity.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codecola-item-opacity">'+
    '<div class="codecola-item-title"><label for="codecola-opacity">{{style_op}}</label><span class="codecola-eye codecola-icon" title="{{opt_hide}}" data="opacity"></span><span class="codecola-cancel codecola-icon" title="{{opt_undo}}" data="opacity"></span><a target="_blank" class="codecola-compatibility codecola-icon" title="{{opt_compatibility}}" href="http://caniuse.com/#feat=css-opacity"></a></div>' +
    '<div class="codecola-editorWrap">'+
    '   <input type="range" min="0" max="1" id="codecola-opacity" step="0.01" name="opacity"/>'+
    '   <input type="number" id="codecola-opacity-c" class="codecola-currentStyle" min="0" max="1" step="0.01" name="opacity"/>'+
    '</div>'+
    '</li>'
    )
};
codecola.plug.opacity.prototype.bind = function(CODECOLA, Y){
    CODECOLA.bindRange('#codecola-item-opacity', function(v){
        return parseFloat(v).toFixed(2);
    });
};
codecola.plug.opacity.prototype.sync = function(CODECOLA, Y){
    CODECOLA.initRange('#codecola-opacity');
};

codecola.plug.boxShadow = function(config) {};
codecola.plug.boxShadow.NS = "boxShadow";
codecola.plug.boxShadow.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codecola-item-boxShadow">'+
    '<div class="codecola-item-title"><label>{{style_bs}}</label><span class="codecola-eye codecola-icon" title="{{opt_hide}}" data="boxShadow"></span><span class="codecola-cancel codecola-icon" title="{{opt_undo}}" data="boxShadow"></span><a target="_blank" class="codecola-compatibility codecola-icon" title="{{opt_compatibility}}" href="http://caniuse.com/#feat=css-boxshadow"></a></div>' +
    '<div class="codecola-editorWrap">' +
    '   <ccfieldset id="codecola-boxShadowWrap">' +
    '	    <ol>' +
    '			<li><label>Inset:</label><label><input type="radio" value="inset" id="codecola-boxShadowInset" name="boxShadow">{{style_bs_inset}}</label>&nbsp;&nbsp;&nbsp;&nbsp;<label><input type="radio" value="outset" id="codecola-boxShadowOutset" name="boxShadow">{{style_bs_outset}}</label></li>' +
    '			<li><label>Degree:</label><div id="codecola-boxShadowDegree"></div></li>' +
    '			<li>'+
    '               <label for="codecola-boxShadowDistance">Distance:</label>'+
    '               <input type="range" min="0" max="100" id="codecola-boxShadowDistance" name="boxShadow"/>'+
    '               <input type="number" id="codecola-boxShadowDistance-c" class="codecola-currentStyle" min="0" name="boxShadow"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-boxShadowSpread">Spread:</label>'+
    '               <input type="range" min="-100" max="100" id="codecola-boxShadowSpread" name="boxShadow"/>'+
    '               <input type="number" id="codecola-boxShadowSpread-c" class="codecola-currentStyle" min="0" name="boxShadow"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-boxShadowSize">Size:</label>'+
    '               <input type="range" min="0" max="100" id="codecola-boxShadowSize" name="boxShadow"/>'+
    '               <input type="number" id="codecola-boxShadowSize-c" class="codecola-currentStyle" min="0" name="boxShadow"/>(px)'+
    '           </li>' +
    '			<li><label for="codecola-boxShadowColor">Color:</label><div id="codecola-boxShadowColor"></div></li>' +
    '		</ol>' +
    '	</ccfieldset>' +
    '</div>'+
    '</li>'
    )
};
codecola.plug.boxShadow.prototype.bind = function(CODECOLA, Y){
    var inset = Y.one('#codecola-boxShadowInset'),
        outset = Y.one('#codecola-boxShadowOutset'),
        distance = Y.one('#codecola-boxShadowDistance'),
        size = Y.one('#codecola-boxShadowSize'),
        spread = Y.one('#codecola-boxShadowSpread'),
        setBoxShadow = function(color, degree){
            var optinal = inset.get('checked') ? 'inset' : '',
                d = distance.get('value'),
                degree = degree || CODECOLA.boxShadow.degree.getDegree(),
                color = color || CODECOLA.boxShadow.color.getColor(),
                x = 0 - Math.round(d * Math.cos(degree * 0.017453293)),
                y = Math.round(d * Math.sin(degree * 0.017453293));
            CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'boxShadow', optinal + ' ' + x + 'px ' + y + 'px ' + size.get('value') + 'px ' + spread.get('value') + 'px ' + color);
        };

    CODECOLA.boxShadow.color = new Y.codecolaColor({
        wrap: '#codecola-boxShadowColor',
        onChange: function(color) {
            setBoxShadow(color);
        }
    }).render();

    CODECOLA.boxShadow.degree = new Y.codecolaDegree({
        wrap: '#codecola-boxShadowDegree',
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
    }, '#codecola-boxShadowDistance-c,#codecola-boxShadowSize-c,#codecola-boxShadowSpread-c');

    Y.on('click', function(e) {
        setBoxShadow();
    }, [inset, outset]);
};
codecola.plug.boxShadow.prototype.sync = function(CODECOLA, Y){
    var boxShadow = CODECOLA.getStyle(CODECOLA.get('codecolaCurrentNode'), 'boxShadow'),
        value = [],
        inset = document.getElementById('codecola-boxShadowInset'),
        outset = document.getElementById('codecola-boxShadowOutset'),
        d = Y.one('#codecola-boxShadowDistance'),
        size = Y.one('#codecola-boxShadowSize'),
        spread = Y.one('#codecola-boxShadowSpread');
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
    '<li id="codecola-item-border">'+
    '<div class="codecola-item-title"><label>{{style_b}}</label><span class="codecola-eye codecola-icon" title="{{opt_hide}}" data="borderTop,borderRight,borderBottom,borderLeft" mutil="border"></span><span class="codecola-cancel codecola-icon" title="{{opt_undo}}" data="border"></span></div>' +
    '<div class="codecola-editorWrap codecola-editor-multi">' +
    '	<ccfieldset id="codecola-borderWidthWrap">' +
    '	    <cclegend>{{style_b_width}}</cclegend>' +
    '		<label><input type="checkbox" class="set-same" name="borderWidth" id="codecola-sameBorderWidth"/>{{opt_same}}</label>' +
    '		<ol>' +
    '			<li>'+
    '               <label for="codecola-borderTopWidth">Top:</label>'+
    '               <input type="range" min="0" max="100" id="codecola-borderTopWidth" name="borderTopWidth"/>'+
    '               <input type="number" id="codecola-borderTopWidth-c" class="codecola-currentStyle" min="0" name="borderTopWidth"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-borderRightWidth">Right:</label>'+
    '               <input type="range" min="0" max="100" id="codecola-borderRightWidth" name="borderRightWidth"/>'+
    '               <input type="number" id="codecola-borderRightWidth-c" class="codecola-currentStyle" min="0" name="borderRightWidth"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-borderBottomWidth">Bottom:</label>'+
    '               <input type="range" min="0" max="100" id="codecola-borderBottomWidth" name="borderBottomWidth"/>'+
    '               <input type="number" id="codecola-borderBottomWidth-c" class="codecola-currentStyle" min="0" name="borderBottomWidth"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-borderLeftWidth">Left:</label>'+
    '               <input type="range" min="0" max="100" id="codecola-borderLeftWidth" name="borderLeftWidth"/>'+
    '               <input type="number" id="codecola-borderLeftWidth-c" class="codecola-currentStyle" min="0" name="borderLeftWidth"/>(px)'+
    '           </li>' +
    '		</ol>' +
    '	</ccfieldset>' +
    '	<ccfieldset id="codecola-borderStyleWrap">' +
    '	    <cclegend>{{style_b_style}}</cclegend>' +
    '		<label><input type="checkbox" class="set-same selects" name="borderStyle" id="codecola-sameBorderStyle"/>{{opt_same}}</label>' +
    '		<ol>' +
    '			<li>' +
    '				<label for="codecola-borderTopStyle">Top:</label>' +
    '  				<select id="codecola-borderTopStyle" name="borderTopStyle">' +
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
    '				<label for="codecola-borderRightStyle">Right:</label>' +
    '  				<select id="codecola-borderRightStyle" name="borderRightStyle">' +
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
    '				<label for="codecola-borderBottomStyle">Bottom:</label>' +
    '  				<select id="codecola-borderBottomStyle" name="borderBottomStyle">' +
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
    '				<label for="codecola-borderLeftStyle">Left:</label>' +
    '  				<select id="codecola-borderLeftStyle" name="borderLeftStyle">' +
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
    '	<ccfieldset id="codecola-borderColorWrap">' +
    '		<cclegend>{{style_b_color}}</cclegend>' +
    '		<label><input type="checkbox" class="set-same" name="borderColor" id="codecola-sameBorderColor"/>{{opt_same}}</label>' +
    '		<ol>' +
    '			<li><label for="codecola-borderTopColor">Top:</label><div id="codecola-borderTopColor"></div></li>' +
    '			<li><label for="codecola-borderRightColor">Right:</label><div id="codecola-borderRightColor"></div></li>' +
    '			<li><label for="codecola-borderBottomColor">Bottom:</label><div id="codecola-borderBottomColor"></div></li>' +
    '			<li><label for="codecola-borderLeftColor">Left:</label><div id="codecola-borderLeftColor"></div></li>' +
    '		</ol>' +
    '	</ccfieldset>' +
    '</div>'+
    '</li>'
    )
};
codecola.plug.border.prototype.bind = function(CODECOLA, Y){
    CODECOLA.bindSame('#codecola-sameBorderWidth');
    CODECOLA.bindSame('#codecola-sameBorderStyle');
    CODECOLA.bindRange('#codecola-borderWidthWrap', function(v){
        return v +'px'
    });
    CODECOLA.bindRange('#codecola-borderStyleWrap', null, 'select');

    var nodes = null, sameColor = Y.one('#codecola-sameBorderColor');
    Y.each(['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'], function(n) {
        CODECOLA[n] = {};
        CODECOLA[n].color = new Y.codecolaColor({
            wrap: '#codecola-' + n,
            onChange: function(color) {
                if (sameColor.get('checked')) {
                    CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'borderColor', color);
                    CODECOLA.setStyle(nodes, 'backgroundColor', color);
                    nodes.set('value', color);
                } else {
                    CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), n, color);
                }
            },
            onInit: function(){
                nodes = Y.all('#codecola-borderColorWrap .codecola-color-input');
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
            CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'borderColor', color);
            nodes.set('disabled', true);
            first.set('disabled', false);
        } else {
            nodes.set('disabled', false);
        }
    });
};
codecola.plug.border.prototype.sync = function(CODECOLA, Y){
    Y.each(['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'], function(n) {
        CODECOLA[n].color.set('color', CODECOLA.getStyle(CODECOLA.get('codecolaCurrentNode'), n)).syncUI();
    });
    Y.each(['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle'], function(n) {
        CODECOLA.initSelect('#codecola-'+n);
    });
    Y.each(['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'], function(n) {
        CODECOLA.initRange('#codecola-'+n);
    });
};

codecola.plug.borderRadius = function(config) {};
codecola.plug.borderRadius.NS = "borderRadius";
codecola.plug.borderRadius.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codecola-item-borderRadius">'+
    '<div class="codecola-item-title"><label>{{style_b_radius}}</label><span class="codecola-eye codecola-icon" title="{{opt_hide}}" data="borderRadius"></span><span class="codecola-cancel codecola-icon" title="{{opt_undo}}" data="borderRadius"></span><a target="_blank" class="codecola-compatibility codecola-icon" title="{{opt_compatibility}}" href="http://caniuse.com/#feat=border-radius"></a></div>' +
    '<div class="codecola-editorWrap">' +
    '	<ccfieldset id="codecola-borderRadiusWrap">' +
    '		<label><input type="checkbox" class="set-same" name="borderRadius" id="codecola-sameBorderRadius"/>{{opt_same}}</label>' +
    '		<ol>' +
    '			<li>'+
    '               <label for="codecola-borderTopLeftRadius">TL:</label>'+
    '               <input type="range" min="0" max="100" id="codecola-borderTopLeftRadius" name="borderTopLeftRadius"/>'+
    '               <input type="number" id="codecola-borderTopLeftRadius-c" class="codecola-currentStyle" min="0" name="borderTopLeftRadius"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-borderTopRightRadius">TR:</label>'+
    '               <input type="range" min="0" max="100" id="codecola-borderTopRightRadius" name="borderTopRightRadius"/>'+
    '               <input type="number" id="codecola-borderTopRightRadius-c" class="codecola-currentStyle" min="0" name="borderTopRightRadius"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-borderBottomRightRadius">BR:</label>'+
    '               <input type="range" min="0" max="100" id="codecola-borderBottomRightRadius" name="borderBottomRightRadius"/>'+
    '               <input type="number" id="codecola-borderBottomRightRadius-c" class="codecola-currentStyle" min="0" name="borderBottomRightRadius"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-borderBottomLeftRadius">BL:</label>'+
    '               <input type="range" min="0" max="100" id="codecola-borderBottomLeftRadius" name="borderBottomLeftRadius"/>'+
    '               <input type="number" id="codecola-borderBottomLeftRadius-c" class="codecola-currentStyle" min="0" name="borderBottomLeftRadius"/>(px)'+
    '           </li>' +
    '		</ol>' +
    '	</ccfieldset>' +
    '</div>'+
    '</li>'
    )
};
codecola.plug.borderRadius.prototype.bind = function(CODECOLA, Y){
    CODECOLA.bindSame('#codecola-sameBorderRadius');
    CODECOLA.bindRange('#codecola-borderRadiusWrap', function(v){
        return v +'px'
    });
};
codecola.plug.borderRadius.prototype.sync = function(CODECOLA, Y){
    Y.each(['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'], function(n) {
        CODECOLA.initRange('#codecola-'+n);
    });
};

codecola.plug.listStyle = function(config) {};
codecola.plug.listStyle.NS = "listStyle";
codecola.plug.listStyle.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codecola-item-listStyle">'+
    '<div class="codecola-item-title"><label>{{style_ls}}</label><span class="codecola-eye codecola-icon" title="{{opt_hide}}" data="listStyle"></span><span class="codecola-cancel codecola-icon" title="{{opt_undo}}" data="listStyle"></span></div>' +
    '<div class="codecola-editorWrap">' +
    '   <select id="codecola-listStyleType" name="listStyleType">' +
    '       <option selected="seleted" value="none">{{style_ls_none}}</option>' +
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
    '   <select id="codecola-listStylePosition" name="listStylePosition">' +
    '	    <option selected="seleted" value="inside">inside</option>' +
    '       <option value="outside">outside</option>' +
    '   </select>' +
    '</div>'+
    '</li>'
    )
};
codecola.plug.listStyle.prototype.bind = function(CODECOLA, Y){
    Y.on('change', function(e) {
        CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'listStyleType', this.get('value'));
    }, '#codecola-listStyleType');
    Y.on('change', function(e) {
        CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'listStylePosition', this.get('value'));
    }, '#codecola-listStylePosition');
};
codecola.plug.listStyle.prototype.sync = function(CODECOLA, Y){
    Y.one('#codecola-listStyleType').set('value', CODECOLA.getStyle(CODECOLA.get('codecolaCurrentNode'), 'listStyleType'));
    Y.one('#codecola-listStylePosition').set('value', CODECOLA.getStyle(CODECOLA.get('codecolaCurrentNode'), 'listStylePosition'));
};

codecola.plug.layout = function(config) {};
codecola.plug.layout.NS = "layout";
codecola.plug.layout.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codecola-item-layout">'+
    '<div class="codecola-item-title"><label>{{style_l}}</label><span class="codecola-eye codecola-icon" title="{{opt_hide}}" data="padding,margin" mutil="layout"></span><span class="codecola-cancel codecola-icon" title="{{opt_undo}}" data="padding,margin" mutil="layout"></span></div>' +
    '<div class="codecola-editorWrap codecola-editor-multi">' +
    '   <ccfieldset id="codecola-paddingWrap">' +
    '		<cclegend>{{style_l_padding}}</cclegend>' +
    '		<label><input type="checkbox" class="set-same" name="padding" id="codecola-samePadding"/>{{opt_same}}</label>' +
    '		<ol>' +
    '	        <li>'+
    '               <label for="codecola-paddingTop">Top:</label>'+
    '               <input type="range" min="0" max="1000" id="codecola-paddingTop" name="paddingTop"/>'+
    '               <input type="number" id="codecola-paddingTop-c" class="codecola-currentStyle" min="0" name="paddingTop"/>(px)'+
    '           </li>' +
    '		    <li>'+
    '               <label for="codecola-paddingRight">Right:</label>'+
    '               <input type="range" min="0" max="1000" id="codecola-paddingRight" name="paddingRight"/>'+
    '               <input type="number" id="codecola-paddingRight-c" class="codecola-currentStyle" min="0" name="paddingRight"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-paddingBottom">Bottom:</label>'+
    '               <input type="range" min="0" max="1000" id="codecola-paddingBottom" name="paddingBottom"/>'+
    '               <input type="number" id="codecola-paddingBottom-c" class="codecola-currentStyle" min="0" name="paddingBottom"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-paddingLeft">Left:</label>'+
    '               <input type="range" min="0" max="1000" id="codecola-paddingLeft" name="paddingLeft"/>'+
    '               <input type="number" id="codecola-paddingLeft-c" class="codecola-currentStyle" min="0" name="paddingLeft"/>(px)'+
    '           </li>' +
    '		</ol>' +
    '	</ccfieldset>' +
    '	<ccfieldset id="codecola-marginWrap">' +
    '		<cclegend>{{style_l_margin}}</cclegend>' +
    '		<label><input type="checkbox" class="set-same" name="margin" id="codecola-sameMargin"/>{{opt_same}}</label>' +
    '		<ol>' +
    '			<li>'+
    '               <label for="codecola-marginTop">Top:</label>'+
    '               <input type="range" min="0" max="1000" id="codecola-marginTop" name="marginTop"/>'+
    '               <input type="number" id="codecola-marginTop-c" class="codecola-currentStyle" min="0" name="paddingLeft"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-marginRight">Right:</label>'+
    '               <input type="range" min="0" max="1000" id="codecola-marginRight" name="marginRight"/>'+
    '               <input type="number" id="codecola-marginRight-c" class="codecola-currentStyle" min="0" name="marginRight"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-marginBottom">Bottom:</label>'+
    '               <input type="range" min="0" max="1000" id="codecola-marginBottom" name="marginBottom"/>'+
    '               <input type="number" id="codecola-marginBottom-c" class="codecola-currentStyle" min="0" name="marginBottom"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-marginLeft">Left:</label>'+
    '               <input type="range" min="0" max="1000" id="codecola-marginLeft" name="marginLeft"/>'+
    '               <input type="number" id="codecola-marginLeft-c" class="codecola-currentStyle" min="0" name="marginLeft"/>(px)'+
    '           </li>' +
    '		</ol>' +
    '	</ccfieldset>' +
    '</div>'+
    '</li>'
    )
};
codecola.plug.layout.prototype.bind = function(CODECOLA, Y){
    CODECOLA.bindSame('#codecola-samePadding');
    CODECOLA.bindSame('#codecola-sameMargin');
    CODECOLA.bindRange('#codecola-paddingWrap', function(v){
        return v +'px'
    });
    CODECOLA.bindRange('#codecola-marginWrap', function(v){
        return v +'px'
    });
};
codecola.plug.layout.prototype.sync = function(CODECOLA, Y){
    Y.each(['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft'], function(n) {
        CODECOLA.initRange('#codecola-'+n);
    });
};

codecola.plug.size = function(config) {};
codecola.plug.size.NS = "size";
codecola.plug.size.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codecola-item-size">'+
    '<div class="codecola-item-title"><label>{{style_s}}</label><span class="codecola-eye codecola-icon" title="{{opt_hide}}" data="width,height" mutil="size"></span><span class="codecola-cancel codecola-icon" title="{{opt_undo}}" data="width,height" mutil="size"></span></div>' +
    '<div class="codecola-editorWrap">' +
    '	<ccfieldset id="codecola-size">' +
    '		<ol>' +
    '			<li>'+
    '               <label for="codecola-width">Width:</label>'+
    '               <input type="range" min="0" max="1440" id="codecola-width" name="width"/>'+
    '               <input type="number" id="codecola-width-c" class="codecola-currentStyle" min="0" name="width"/>(px)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-height">Height:</label>'+
    '               <input type="range" min="0" max="900" id="codecola-height" name="height"/>'+
    '               <input type="number" id="codecola-height-c" class="codecola-currentStyle" min="0" name="height"/>(px)'+
    '           </li>' +
    '		</ol>' +
    '	</ccfieldset>' +
    '</div>'+
    '</li>'
    )
};
codecola.plug.size.prototype.bind = function(CODECOLA, Y){
    CODECOLA.bindRange('#codecola-size', function(v){
        return v +'px'
    });
};
codecola.plug.size.prototype.sync = function(CODECOLA, Y){
    CODECOLA.initRange('#codecola-width', /auto/);
    CODECOLA.initRange('#codecola-height', /auto/);
};

codecola.plug.transform = function(config) {};
codecola.plug.transform.NS = "transform";
codecola.plug.transform.prototype.transformOrigin = function(){
    var s = document.body.style;
    if('webkitTransformOrigin' in s){
        return 'webkitTransformOrigin';
    }else if('MozTransformOrigin' in s){
        return 'MozTransformOrigin';
    }else if('oTransformOrigin' in s){
        return 'oTransformOrigin';
    }else if('msTransformOrigin' in s){
        return 'msTransformOrigin';
    }else{
        return 'transformOrigin';
    }
}();
codecola.plug.transform.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codecola-item-transform">'+
    '<div class="codecola-item-title"><label>{{style_transform}}</label><span class="codecola-eye codecola-icon" title="{{opt_hide}}" mutil="transform" data="transform,'+this.transformOrigin+'"></span><span class="codecola-cancel codecola-icon" title="{{opt_undo}}" mutil="transform" data="transform,'+this.transformOrigin+'"></span><a target="_blank" class="codecola-compatibility codecola-icon" title="{{opt_compatibility}}" href="http://caniuse.com/#feat=transforms2d"></a></div>' +
    '<div class="codecola-editorWrap codecola-editor-multi">' +
    '	<ccfieldset id="codecola-transform-origin">' +
    '		<ol>' +
    '			<li>'+
    '               <label for="codecola-transform-originX">OriginX:</label>'+
    '               <input type="range" min="0" max="100" id="codecola-transform-originX" name="transformOriginX"/>'+
    '               <input type="number" id="codecola-transform-originX-c" class="codecola-currentStyle" min="0" max="100" name="transformOriginX"/>(%)'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-transform-originY">OriginY:</label>'+
    '               <input type="range" min="0" max="100" id="codecola-transform-originY" name="transformOriginY"/>'+
    '               <input type="number" id="codecola-transform-originY-c" class="codecola-currentStyle" min="0" max="100" name="transformOriginY"/>(%)'+
    '           </li>' +
    '		</ol>' +
    '	</ccfieldset>' +
    '	<ccfieldset id="codecola-transform">' +
    '		<ol>' +
    '			<li>'+
    '               <label for="codecola-transform-m11">M11:</label>'+
    '               <input type="range" min="-100" max="100" id="codecola-transform-m11" name="m11" step="0.1"/>'+
    '               <input type="number" id="codecola-transform-m11-c" class="codecola-currentStyle" name="m11" step="0.1"/>'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-transform-m12">M12:</label>'+
    '               <input type="range" min="-50" max="50" id="codecola-transform-m12" name="m12" step="0.1"/>'+
    '               <input type="number" id="codecola-transform-m12-c" class="codecola-currentStyle" name="m12" step="0.1"/>'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-transform-m21">M21:</label>'+
    '               <input type="range" min="-50" max="50" id="codecola-transform-m21" name="m21" step="0.1"/>'+
    '               <input type="number" id="codecola-transform-m21-c" class="codecola-currentStyle" name="m21" step="0.1"/>'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-transform-m22">M22:</label>'+
    '               <input type="range" min="-100" max="100" id="codecola-transform-m22" name="m22" step="0.1"/>'+
    '               <input type="number" id="codecola-transform-m22-c" class="codecola-currentStyle" name="m22" step="0.1"/>'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-transform-m13">M13:</label>'+
    '               <input type="range" min="-1440" max="1440" id="codecola-transform-m13" name="m13"/>'+
    '               <input type="number" id="codecola-transform-m13-c" class="codecola-currentStyle" min="0" name="m13"/>'+
    '           </li>' +
    '			<li>'+
    '               <label for="codecola-transform-m23">M23:</label>'+
    '               <input type="range" min="-1440" max="1440" id="codecola-transform-m23" name="m23"/>'+
    '               <input type="number" id="codecola-transform-m23-c" class="codecola-currentStyle" min="0" name="m23"/>'+
    '           </li>' +
    '		</ol>' +
    '	</ccfieldset>' +
    '</div>'+
    '</li>'
    )
};
codecola.plug.transform.prototype.bind = function(CODECOLA, Y){
    var that = this;
    var setTransform = function(){
        var v = [
            parseFloat(document.getElementById('codecola-transform-m11').value).toFixed(1),
            parseFloat(document.getElementById('codecola-transform-m12').value).toFixed(1),
            parseFloat(document.getElementById('codecola-transform-m21').value).toFixed(1),
            parseFloat(document.getElementById('codecola-transform-m22').value).toFixed(1),
            document.getElementById('codecola-transform-m13').value,
            document.getElementById('codecola-transform-m23').value
        ];
        CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'transform', 'matrix(' + v.join(',') + ')');
    };
    Y.on('change', function(e) {
        this.next().set('value', this.get('value'));
        setTransform();
    }, '#codecola-transform-m11,#codecola-transform-m12,#codecola-transform-m21,#codecola-transform-m22,#codecola-transform-m13,#codecola-transform-m23');
    Y.on('change', function(e) {
        this.previous().set('value', this.get('value'));
        setTransform();
    }, '#codecola-transform-m11-c,#codecola-transform-m12-c,#codecola-transform-m21-c,#codecola-transform-m22-c,#codecola-transform-m13-c,#codecola-transform-m23-c');

    //origin
    var setOrigin = function(){
        var x = document.getElementById('codecola-transform-originX').value,
            y = document.getElementById('codecola-transform-originY').value;
        CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), that.transformOrigin, x+'% '+y+'%');
    };
    Y.on('change', function(e) {
        this.next().set('value', this.get('value'));
        setOrigin();
    }, '#codecola-transform-originX,#codecola-transform-originY');
    Y.on('change', function(e) {
        this.previous().set('value', this.get('value'));
        setOrigin();
    }, '#codecola-transform-originX-c,#codecola-transform-originY-c');
};
codecola.plug.transform.prototype.sync = function(CODECOLA, Y){
    var node = CODECOLA.get('codecolaCurrentNode').item(0),
        transform = CODECOLA.getStyle(node, 'transform'),
        origin = CODECOLA.getStyle(node, this.transformOrigin);

    if (transform == 'none') {
        var value = [1, 0, 0, 1, 0, 0];
    } else {
        var value = transform.replace(/\s*\,\s*/g, ',').replace('matrix(','').replace(')','').split(',');
    }

    Y.one('#codecola-transform-m11').set('value', value[0]).next().set('value', value[0]);
    Y.one('#codecola-transform-m12').set('value', value[1]).next().set('value', value[1]);
    Y.one('#codecola-transform-m21').set('value', value[2]).next().set('value', value[2]);
    Y.one('#codecola-transform-m22').set('value', value[3]).next().set('value', value[3]);
    Y.one('#codecola-transform-m13').set('value', value[4]).next().set('value', value[4]);
    Y.one('#codecola-transform-m23').set('value', value[5]).next().set('value', value[5]);

    if(/px/.test(origin)){
        if(origin == '0px 0px'){
            origin = [0, 0];
        }else{
            var h = parseInt(node.getStyle('height'), 10),
                w = parseInt(node.getStyle('width'), 10);

            origin = origin.replace(/px/g, '').split(' ');
            origin = [
                Math.round(origin[0]/w*100),
                Math.round(origin[1]/h*100)
            ];
        }
    }else{
        origin = origin.replace(/%/g, '').split(' ');
    }
    Y.one('#codecola-transform-originX').set('value', origin[0]).next().set('value', origin[0]);
    Y.one('#codecola-transform-originY').set('value', origin[1]).next().set('value', origin[1]);
};


codecola.plug.webkitTextStroke = function(config) {};
codecola.plug.webkitTextStroke.NS = "webkitTextStroke";
codecola.plug.webkitTextStroke.prototype.render = function(CODECOLA){
    CODECOLA.renderPlug(
    '<li id="codecola-item-webkitTextStroke">'+
    '<div class="codecola-item-title"><label>{{style_webkitTextStroke}}</label><span class="codecola-eye codecola-icon" title="{{opt_hide}}" mutil="webkitTextStroke" data="webkitTextStrokeWidth,webkitTextStrokeColor,webkitTextFillColor"></span><span class="codecola-cancel codecola-icon" title="{{opt_undo}}" mutil="webkitTextStroke" data="webkitTextStrokeWidth,webkitTextStrokeColor,webkitTextFillColor"></span><a target="_blank" class="codecola-compatibility codecola-icon" title="{{opt_compatibility}}" href="http://caniuse.com/#feat=text-stroke"></a></div>' +
    '<div class="codecola-editorWrap">' +
    '<ccfieldset>'+
    '	<ol>' +
    '	    <li id="codecola-webkitTextStrokeWidth-wrap">'+
    '           <label for="codecola-webkitTextStrokeWidth">Width:</label>'+
    '           <input type="range" min="0" max="100" id="codecola-webkitTextStrokeWidth" name="webkitTextStrokeWidth"/>'+
    '           <input type="number" id="codecola-webkitTextStrokeWidth-c" class="codecola-currentStyle" min="0" name="webkitTextStrokeWidth"/>(px)'+
    '       </li>' +
    '		<li><label for="codecola-webkitTextStrokeColor">Color:</label><div id="codecola-webkitTextStrokeColor"></div></li>' +
    '		<li><label for="codecola-webkitTextStrokeFill">Fill Color:</label><div id="codecola-webkitTextStrokeFill"></div></li>' +
    '   </ol>' +
    '</ccfieldset>'+
    '</div>'+
    '</li>'
    )
};
codecola.plug.webkitTextStroke.prototype.bind = function(CODECOLA, Y){
    CODECOLA.webkitTextStroke.color = new Y.codecolaColor({
        wrap: '#codecola-webkitTextStrokeColor',
        onChange: function(color) {
            CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'webkitTextStrokeColor', color);
        }
    }).render();

    CODECOLA.webkitTextStroke.fill = new Y.codecolaColor({
        wrap: '#codecola-webkitTextStrokeFill',
        onChange: function(color) {
            CODECOLA.setStyle(CODECOLA.get('codecolaCurrentNode'), 'webkitTextFillColor', color);
        }
    }).render();

    CODECOLA.bindRange('#codecola-webkitTextStrokeWidth-wrap', function(v){
        return v +'px';
    });
};
codecola.plug.webkitTextStroke.prototype.sync = function(CODECOLA, Y){
    var node = CODECOLA.get('codecolaCurrentNode').item(0),
        width = parseInt(CODECOLA.getStyle(node, 'webkitTextStrokeWidth'),10),
        color = CODECOLA.getStyle(node, 'webkitTextStrokeColor'),
        fill = CODECOLA.getStyle(node, 'webkitTextFillColor');
    
    CODECOLA.webkitTextStroke.color.set('color', color).syncUI();
    Y.one('#codecola-webkitTextStrokeWidth').set('value', width).next().set('value', width);
    CODECOLA.webkitTextStroke.fill.set('color', fill).syncUI();
};

