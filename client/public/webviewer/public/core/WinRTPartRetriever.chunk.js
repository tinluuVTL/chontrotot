/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[14],{558:function(wa,ta,h){h.r(ta);var pa=h(0),na=h(304);wa=h(548);var oa=h(117);h=h(469);var ka={},la=function(ha){function z(y,r){var n=ha.call(this,y,r)||this;n.url=y;n.range=r;n.status=na.a.NOT_STARTED;return n}Object(pa.c)(z,ha);z.prototype.start=function(y){var r=this;"undefined"===typeof ka[this.range.start]&&(ka[this.range.start]={wU:function(n){var b=atob(n),a,e=b.length;n=new Uint8Array(e);for(a=0;a<e;++a)n[a]=b.charCodeAt(a);
b=n.length;a="";for(var f=0;f<b;)e=n.subarray(f,f+1024),f+=1024,a+=String.fromCharCode.apply(null,e);r.wU(a,y)},EGa:function(){r.status=na.a.ERROR;y({code:r.status})}},window.external.notify(this.url),this.status=na.a.STARTED);r.CH()};return z}(wa.ByteRangeRequest);wa=function(ha){function z(y,r,n,b){y=ha.call(this,y,n,b)||this;y.qC=la;return y}Object(pa.c)(z,ha);z.prototype.Lz=function(y,r){return y+"?"+r.start+"&"+(r.stop?r.stop:"")};return z}(oa.a);Object(h.a)(wa);Object(h.b)(wa);ta["default"]=
wa}}]);}).call(this || window)
