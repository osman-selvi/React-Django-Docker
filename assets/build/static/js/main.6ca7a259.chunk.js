(this["webpackJsonpdrf-react"]=this["webpackJsonpdrf-react"]||[]).push([[0],[,,,,,,function(e,t,n){e.exports=n.p+"static/media/logo.25bf045c.svg"},,,function(e,t,n){e.exports=n(16)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(2),c=n.n(o),i=(n(14),n(3)),s=n(4),l=n(7),u=n(5),p=n(8),m={API_URL:""},h=n(6),d=n.n(h),f=(n(15),function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).state={categories:[]},e}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch(m.API_URL+"/api/v1/categories/").then((function(e){return e.json()})).then((function(t){e.setState({categories:t.results})}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("img",{src:d.a,className:"App-logo",alt:"logo"}),r.a.createElement("p",null,"Edit ",r.a.createElement("code",null,"src/App.js")," and save to reload."),r.a.createElement("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer"},"Learn React"),r.a.createElement("ul",null,this.state.categories.map((function(e){return r.a.createElement("li",{key:"category-".concat(e.id)},e.title)})))))}}]),t}(r.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[9,1,2]]]);
//# sourceMappingURL=main.6ca7a259.chunk.js.map