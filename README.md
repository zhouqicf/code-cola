Code Cola
======================
A visual tool to modify css style.
Download from Chrome Web Store: https://chrome.google.com/webstore/detail/lomkpheldlbkkfiifcbfifipaofnmnkn

License
-------
Copyright (c) 2011 http://zhouqicf.com
author: zhouqicf@gmail.com
version: 3.2.0
license: Released under the MIT License.

Powered by YUI3
http://developer.yahoo.com/yui/3
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
license: Released under the BSD License.

Broswer support
---------------
Chrome , Safari

Build codecola without chrome extension environment
------------------------------------------
###Step1:###
open "native/config.js" modify `YUI_config`:
`base :'http://cloud/'`

###Step2:###
insert js to your web page
`<script charset="utf-8" src="../codecola/yui3.js"></script>`
`<script charset="utf-8" src="../codecola/native/config.js"></script>`
`<script charset="utf-8" src="../codecola/codecola.js"></script>`
