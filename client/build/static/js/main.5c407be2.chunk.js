(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{17:function(e,t,a){},31:function(e,t,a){e.exports=a(61)},36:function(e,t,a){},60:function(e,t,a){},61:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(27),c=a.n(o),l=(a(36),a(17),a(9)),u=a(6),s=a(10),i=a.n(s),m=a(11),p=a(13),E=a(28),h=a.n(E);function f(e,t){return d.apply(this,arguments)}function d(){return(d=Object(p.a)(i.a.mark((function e(t,a){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.post("http://localhost:3000/login",{login:t,paswword:a});case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var v=function(){var e=r.a.useState(""),t=Object(m.a)(e,2),a=t[0],n=t[1],o=r.a.useState(""),c=Object(m.a)(o,2),u=c[0],s=c[1],E=r.a.useState(void 0),h=Object(m.a)(E,2),d=h[0],v=(h[1],function(){var e=Object(p.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(a,u),t=f(a,u),e.abrupt("return",t);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}());return r.a.createElement("div",{className:"Register"},r.a.createElement(l.b,{to:"/"},r.a.createElement("button",{className:"ButtonMenu"},"Menu")),r.a.createElement("form",null,r.a.createElement("label",{for:"choose",className:"text"},"Login"),r.a.createElement("input",{value:a,onChange:function(e){return n(e.target.value)},required:!0})),r.a.createElement("form",null,r.a.createElement("label",{for:"choose",className:"text"},"password"),r.a.createElement("input",{value:u,onChange:function(e){return s(e.target.value)},required:!0})),r.a.createElement("button",{className:"ButtonEnter",onClick:v},"Envoyer"),r.a.createElement("text",null,""===d?r.a.createElement("text",null,"Error "):r.a.createElement("div",null)))};a(60);function g(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("img",{src:"/docteur.png",width:"50px",alt:"docteur"}),r.a.createElement("h2",null,"oui"),r.a.createElement("h3",null,"oui"),r.a.createElement(l.b,{to:"/login"},r.a.createElement("button",{className:"Button"},r.a.createElement("p",{className:"Button_police"},"connexion")))),r.a.createElement("body",{className:"App-body"},r.a.createElement("img",{src:"/pillule.png",wifth:"400px",className:"App-logo",alt:"logo"}),r.a.createElement("p",null,"Dr Useful Guaranted Security")))}var b=function(){return r.a.createElement("div",null,r.a.createElement(l.a,null,r.a.createElement(u.a,{exact:!0,path:"/",component:g}),r.a.createElement(u.a,{path:"/login",component:v})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[31,1,2]]]);
//# sourceMappingURL=main.5c407be2.chunk.js.map