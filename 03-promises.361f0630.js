!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var i={id:e,exports:{}};return n[e]=i,o.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){t[e]=n},e.parcelRequired7c6=o);var i=o("h6c0i");function r(e,n){return new Promise((function(t,o){setTimeout((function(){Math.random()>.3?t({position:e,delay:n}):o({position:e,delay:n})}),n)}))}document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();for(var n=document.querySelector('input[name="delay"]'),t=document.querySelector('input[name="step"]'),o=document.querySelector('input[name="amount"]'),u=(parseInt(n.value),parseInt(t.value),parseInt(o.value)),a=0;a<=u;a++)r(2,1500).then((function(e){e.position,e.delay;i.Notify.success("✅ Fulfilled promise ${position} in ${delay}ms")})).catch((function(e){e.position,e.delay;i.Notify.failure("❌ Rejected promise ${position} in ${delay}ms")}))}))}();
//# sourceMappingURL=03-promises.361f0630.js.map
