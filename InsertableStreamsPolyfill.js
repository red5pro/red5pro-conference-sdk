/**
 * 
 *   red5pro-conference-sdk - Conference SDK
 *   Author: 
 *   Version: 1.0.2
 *   Url: undefined
 * 
 *   Copyright © 2015 Infrared5, Inc. All rights reserved.
 * 
 *   The accompanying code comprising examples for use solely in conjunction with Red5 Pro (the "Example Code")
 *   is  licensed  to  you  by  Infrared5  Inc.  in  consideration  of  your  agreement  to  the  following
 *   license terms  and  conditions.  Access,  use,  modification,  or  redistribution  of  the  accompanying
 *   code  constitutes your acceptance of the following license terms and conditions.
 * 
 *   Permission is hereby granted, free of charge, to you to use the Example Code and associated documentation
 *   files (collectively, the "Software") without restriction, including without limitation the rights to use,
 *   copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
 *   persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 *   The Software shall be used solely in conjunction with Red5 Pro. Red5 Pro is licensed under a separate end
 *   user  license  agreement  (the  "EULA"),  which  must  be  executed  with  Infrared5,  Inc.
 *   An  example  of  the EULA can be found on our website at: https://account.red5.net/assets/LICENSE.txt.
 * 
 *   The above copyright notice and this license shall be included in all copies or portions of the Software.
 * 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,  INCLUDING  BUT
 *   NOT  LIMITED  TO  THE  WARRANTIES  OF  MERCHANTABILITY, FITNESS  FOR  A  PARTICULAR  PURPOSE  AND
 *   NONINFRINGEMENT.   IN  NO  EVENT  SHALL INFRARED5, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 *   WHETHER IN  AN  ACTION  OF  CONTRACT,  TORT  OR  OTHERWISE,  ARISING  FROM,  OUT  OF  OR  IN CONNECTION
 *   WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 */

Object.defineProperty(exports,"__esModule",{value:!0});const e=new class{constructor(){this.polyfillsLoaded=!1,this.loadingPromise=null}hasNativeSupport(){return"undefined"!=typeof MediaStreamTrackProcessor&&"undefined"!=typeof MediaStreamTrackGenerator&&"undefined"!=typeof VideoFrame&&"undefined"!=typeof TransformStream}hasPolyfillSupport(){return void 0!==window.MediaStreamTrackProcessor&&void 0!==window.MediaStreamTrackGenerator&&void 0!==window.VideoFrame}hasSupport(){return this.hasNativeSupport()||this.hasPolyfillSupport()}async loadPolyfills(){return this.loadingPromise?this.loadingPromise:this.hasSupport()?Promise.resolve():(this.loadingPromise=this._loadPolyfillScripts(),this.loadingPromise)}async _loadPolyfillScripts(){try{if(console.log("Loading Insertable Streams polyfills..."),await this._loadScript("https://jan-ivar.github.io/polyfills/mediastreamtrackprocessor.js","MediaStreamTrackProcessor polyfill"),await this._loadScript("https://jan-ivar.github.io/polyfills/mediastreamtrackgenerator.js","MediaStreamTrackGenerator polyfill"),await new Promise(e=>setTimeout(e,100)),!this.hasSupport())throw new Error("Polyfills failed to load or browser is not supported");this.polyfillsLoaded=!0,console.log("Insertable Streams polyfills loaded successfully")}catch(e){throw console.error("Failed to load Insertable Streams polyfills:",e),e}}_loadScript(e,r){return new Promise((o,t)=>{const a=document.querySelector(`script[src="${e}"]`);if(a)return"true"===a.dataset.loaded?void o():(a.addEventListener("load",()=>o()),void a.addEventListener("error",()=>t(new Error(`Failed to load ${r}`))));const s=document.createElement("script");s.src=e,s.async=!0,s.dataset.description=r,s.addEventListener("load",()=>{s.dataset.loaded="true",console.log(`✓ Loaded: ${r}`),o()}),s.addEventListener("error",o=>{console.error(`✗ Failed to load: ${r}`,o),t(new Error(`Failed to load ${r} from ${e}`))}),document.head.appendChild(s)})}getBrowserInfo(){const e=navigator.userAgent;let r="Unknown",o="",t=!1,a="";return/Chrome\/(\d+)/.test(e)?(r="Chrome",o=RegExp.$1,t=parseInt(o)>=94,a=t?"Chrome supports Insertable Streams natively":"Chrome 94+ required for full support. Polyfills may work."):/Edg\/(\d+)/.test(e)?(r="Edge",o=RegExp.$1,t=parseInt(o)>=94,a=t?"Edge supports Insertable Streams natively":"Edge 94+ required for full support. Polyfills may work."):/Firefox\/(\d+)/.test(e)?(r="Firefox",o=RegExp.$1,t=!1,a="Firefox does not support Insertable Streams. Virtual backgrounds not available."):/Safari\//.test(e)&&!/Chrome/.test(e)&&(r="Safari",t=!1,a="Safari does not support Insertable Streams. Virtual backgrounds not available."),{browser:r,version:o,userAgent:e,nativeSupport:this.hasNativeSupport(),polyfillSupport:this.hasPolyfillSupport(),anySupport:this.hasSupport(),recommended:t,notes:a}}showCompatibilityWarning(){const e=this.getBrowserInfo();return!e.anySupport&&!e.recommended&&(console.warn(`⚠️ Virtual backgrounds not supported in ${e.browser}. Please use Chrome 94+ or Edge 94+ for the best experience.`),!0)}};exports.default=e;
