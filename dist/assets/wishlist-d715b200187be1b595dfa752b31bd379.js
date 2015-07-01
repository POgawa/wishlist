define("wishlist/adapters/application",["exports","wishlist/config/environment","firebase","emberfire/adapters/firebase"],function(e,t,a,r){"use strict";e["default"]=r["default"].extend({firebase:new a["default"](t["default"].firebase)})}),define("wishlist/app",["exports","ember","ember/resolver","ember/load-initializers","wishlist/config/environment"],function(e,t,a,r,n){"use strict";var d;t["default"].MODEL_FACTORY_INJECTIONS=!0,d=t["default"].Application.extend({modulePrefix:n["default"].modulePrefix,podModulePrefix:n["default"].podModulePrefix,Resolver:a["default"]}),r["default"](d,n["default"].modulePrefix),e["default"]=d}),define("wishlist/controllers/array",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller}),define("wishlist/controllers/book",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller.extend({needs:["list"],actions:{addBook2:function(e){var e=this.store.createRecord("book",{title:e.volumeInfo.title,author:e.volumeInfo.authors.toString(),list:this.get("controllers.list.model")}),t=this.get("controllers.list.model");e.save().then(function(){t.get("books").pushObject(e),t.save()}),this.transitionToRoute("lists")}}})}),define("wishlist/controllers/books",function(){"use strict"}),define("wishlist/controllers/list",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller.extend({needs:["list"],actions:{submit:function(){this.transitionToRoute("book",this.get("search_term")),this.setProperties({search_term:""})},"delete":function(){confirm("Do you want to delete this list?")&&(this.get("model").destroyRecord(),this.transitionToRoute("lists"))}}})}),define("wishlist/controllers/list/new-book",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller.extend({needs:["list"],actions:{addBook:function(){var e=this.store.createRecord("book",{title:this.get("title"),author:this.get("author"),isbn:this.get("isbn"),list:this.get("controllers.list.model")}),t=this.get("controllers.list.model");e.save().then(function(){t.get("books").pushObject(e),t.save()}),this.setProperties({title:"",author:"",isbn:""}),this.transitionToRoute("lists")}}})}),define("wishlist/controllers/lists/new",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller.extend({actions:{addList:function(){var e=this.store.createRecord("list",{name:this.get("name")});e.save(),this.transitionToRoute("lists"),this.setProperties({name:""})}}})}),define("wishlist/controllers/new-book",function(){"use strict"}),define("wishlist/controllers/object",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller}),define("wishlist/initializers/app-version",["exports","wishlist/config/environment","ember"],function(e,t,a){"use strict";var r=a["default"].String.classify,n=!1;e["default"]={name:"App Version",initialize:function(e,d){if(!n){var i=r(d.toString());a["default"].libraries.register(i,t["default"].APP.version),n=!0}}}}),define("wishlist/initializers/emberfire",["exports","emberfire/initializers/emberfire"],function(e,t){"use strict";e["default"]=t["default"]}),define("wishlist/initializers/export-application-global",["exports","ember","wishlist/config/environment"],function(e,t,a){"use strict";function r(e,r){var n=t["default"].String.classify(a["default"].modulePrefix);a["default"].exportApplicationGlobal&&!window[n]&&(window[n]=r)}e.initialize=r,e["default"]={name:"export-application-global",initialize:r}}),define("wishlist/models/book",["exports","ember-data"],function(e,t){"use strict";e["default"]=t["default"].Model.extend({title:t["default"].attr("string"),author:t["default"].attr("string"),selected:t["default"].attr("boolean"),isbn:t["default"].attr("number"),list:t["default"].belongsTo("list",{async:!0})})}),define("wishlist/models/list",["exports","ember-data"],function(e,t){"use strict";e["default"]=t["default"].Model.extend({name:t["default"].attr("string"),books:t["default"].hasMany("book",{async:!0})})}),define("wishlist/router",["exports","ember","wishlist/config/environment"],function(e,t,a){"use strict";var r=t["default"].Router.extend({location:a["default"].locationType});r.map(function(){this.route("about"),this.resource("lists",{path:"/"},function(){this.route("new")}),this.resource("list",{path:"list/:list_id"},function(){this.resource("book",{path:"book/:search_term"}),this.route("new-book")}),this.resource("review",{path:"review/:book_title"})}),e["default"]=r}),define("wishlist/routes/book",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({model:function(e){var a="https://www.googleapis.com/books/v1/volumes?q="+e.search_term;return t["default"].$.getJSON(a).then(function(e){var t=[];return e.items.forEach(function(e){t.push(e)}),t})}})}),define("wishlist/routes/list",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({model:function(e){return this.store.find("list",e.list_id)}})}),define("wishlist/routes/lists",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({model:function(){return this.store.find("list")}})}),define("wishlist/routes/review",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({model:function(e){var a="http://api.nytimes.com/svc/books/v3/reviews.jsonp?api-key=c363ad3621152b90af3c0c27af352ebd:1:9297318&title="+e.book_title;return t["default"].$.ajax({url:a,type:"GET",dataType:"jsonp",jsonpCallback:"callback",success:function(e){console.log(e)}}).then(function(e){var t=[];return e.results.forEach(function(e){t.push(e)}),t})}})}),define("wishlist/templates/about",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createElement("h1");e.setAttribute(a,"class","header-font");var r=e.createTextNode("About");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("p"),r=e.createTextNode("\n  This is an app where one can create lists of books, search books on\n  the google books API and find reviews on the New York Times Review\n  of Books.\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var r=t.dom;r.detectNamespace(a);var n;return t.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(n=this.build(r),this.hasRendered?this.cachedFragment=n:this.hasRendered=!0),this.cachedFragment&&(n=r.cloneNode(this.cachedFragment,!0))):n=this.build(r),n}}}())}),define("wishlist/templates/application",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("Lists");return e.appendChild(t,a),t},render:function(e,t,a){var r=t.dom;r.detectNamespace(a);var n;return t.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(n=this.build(r),this.hasRendered?this.cachedFragment=n:this.hasRendered=!0),this.cachedFragment&&(n=r.cloneNode(this.cachedFragment,!0))):n=this.build(r),n}}}(),t=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("About");return e.appendChild(t,a),t},render:function(e,t,a){var r=t.dom;r.detectNamespace(a);var n;return t.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(n=this.build(r),this.hasRendered?this.cachedFragment=n:this.hasRendered=!0),this.cachedFragment&&(n=r.cloneNode(this.cachedFragment,!0))):n=this.build(r),n}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createElement("nav");e.setAttribute(a,"class","navbar navbar-default navbar-fixed-top");var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"class","container-fluid");var n=e.createTextNode("\n    ");e.appendChild(r,n);var n=e.createElement("div");e.setAttribute(n,"class","navbar-header header-font");var d=e.createTextNode("\n      ");e.appendChild(n,d);var d=e.createElement("button");e.setAttribute(d,"type","button"),e.setAttribute(d,"class","navbar-toggle collapsed"),e.setAttribute(d,"data-toggle","collapse"),e.setAttribute(d,"data-target","#bs-example-navbar-collapse-1");var i=e.createTextNode("\n        ");e.appendChild(d,i);var i=e.createElement("span");e.setAttribute(i,"class","sr-only");var l=e.createTextNode("Toggle navigation");e.appendChild(i,l),e.appendChild(d,i);var i=e.createTextNode("\n        ");e.appendChild(d,i);var i=e.createElement("span");e.setAttribute(i,"class","icon-bar"),e.appendChild(d,i);var i=e.createTextNode("\n        ");e.appendChild(d,i);var i=e.createElement("span");e.setAttribute(i,"class","icon-bar"),e.appendChild(d,i);var i=e.createTextNode("\n        ");e.appendChild(d,i);var i=e.createElement("span");e.setAttribute(i,"class","icon-bar"),e.appendChild(d,i);var i=e.createTextNode("\n      ");e.appendChild(d,i),e.appendChild(n,d);var d=e.createTextNode("\n      ");e.appendChild(n,d);var d=e.createElement("a");e.setAttribute(d,"class","navbar-brand mashup-title"),e.setAttribute(d,"href","/");var i=e.createTextNode("Book Mashup");e.appendChild(d,i),e.appendChild(n,d);var d=e.createTextNode("\n    ");e.appendChild(n,d),e.appendChild(r,n);var n=e.createTextNode("\n\n    ");e.appendChild(r,n);var n=e.createElement("div");e.setAttribute(n,"class","collapse navbar-collapse header-font"),e.setAttribute(n,"id","bs-example-navbar-collapse-1");var d=e.createTextNode("\n      ");e.appendChild(n,d);var d=e.createElement("ul");e.setAttribute(d,"class","nav navbar-nav");var i=e.createTextNode("\n        ");e.appendChild(d,i);var i=e.createElement("li"),l=e.createComment("");e.appendChild(i,l),e.appendChild(d,i);var i=e.createTextNode("\n        ");e.appendChild(d,i);var i=e.createElement("li"),l=e.createComment("");e.appendChild(i,l),e.appendChild(d,i);var i=e.createTextNode("\n      ");e.appendChild(d,i),e.appendChild(n,d);var d=e.createTextNode("\n    ");e.appendChild(n,d),e.appendChild(r,n);var n=e.createTextNode("\n  ");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","container ");var r=e.createTextNode("\n\n\n  ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"class","col-md-8 col-md-offset-2 bodycontainer");var n=e.createTextNode("\n\n    ");e.appendChild(r,n);var n=e.createComment("");e.appendChild(r,n);var n=e.createTextNode("\n  ");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(a,r,n){var d=r.dom,i=r.hooks,l=i.block,c=i.content;d.detectNamespace(n);var s;r.useFragmentCache&&d.canClone?(null===this.cachedFragment&&(s=this.build(d),this.hasRendered?this.cachedFragment=s:this.hasRendered=!0),this.cachedFragment&&(s=d.cloneNode(this.cachedFragment,!0))):s=this.build(d);var o=d.childAt(s,[0,1,3,1]),h=d.createMorphAt(d.childAt(o,[1]),0,0),p=d.createMorphAt(d.childAt(o,[3]),0,0),u=d.createMorphAt(d.childAt(s,[2,1]),1,1);return l(r,h,a,"link-to",["lists"],{classNames:"link-style"},e,null),l(r,p,a,"link-to",["about"],{classNames:"link-style"},t,null),c(r,u,a,"outlet"),s}}}())}),define("wishlist/templates/book",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("    ");e.appendChild(t,a);var a=e.createElement("li");e.setAttribute(a,"class","booklist");var r=e.createTextNode("\n      ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"class","row");var n=e.createTextNode("\n        ");e.appendChild(r,n);var n=e.createElement("div");e.setAttribute(n,"class","col-xs-6");var d=e.createTextNode("\n         ");e.appendChild(n,d);var d=e.createElement("p"),i=e.createTextNode("\n          ");e.appendChild(d,i);var i=e.createComment("");e.appendChild(d,i);var i=e.createTextNode(" by ");e.appendChild(d,i);var i=e.createComment("");e.appendChild(d,i);var i=e.createTextNode("\n         ");e.appendChild(d,i),e.appendChild(n,d);var d=e.createTextNode("\n         ");e.appendChild(n,d);var d=e.createElement("p"),i=e.createTextNode("\n             Published on: ");e.appendChild(d,i);var i=e.createComment("");e.appendChild(d,i);var i=e.createTextNode("\n         ");e.appendChild(d,i),e.appendChild(n,d);var d=e.createTextNode("\n        ");e.appendChild(n,d),e.appendChild(r,n);var n=e.createTextNode("\n          ");e.appendChild(r,n);var n=e.createElement("div");e.setAttribute(n,"class","col-xs-6 ");var d=e.createTextNode("\n            ");e.appendChild(n,d);var d=e.createElement("img");e.appendChild(n,d);var d=e.createTextNode("\n          ");e.appendChild(n,d),e.appendChild(r,n);var n=e.createTextNode("\n      ");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n      ");e.appendChild(a,r);var r=e.createElement("form"),n=e.createTextNode("\n\n        ");e.appendChild(r,n);var n=e.createElement("button");e.setAttribute(n,"class","submit");var d=e.createTextNode("Add To List");e.appendChild(n,d),e.appendChild(r,n);var n=e.createTextNode("\n      ");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n    ");e.appendChild(t,a);var a=e.createElement("hr");e.setAttribute(a,"class","btn-info"),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var r=t.dom,n=t.hooks,d=n.content,i=n.get,l=n.attribute,c=n.element;r.detectNamespace(a);var s;t.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(s=this.build(r),this.hasRendered?this.cachedFragment=s:this.hasRendered=!0),this.cachedFragment&&(s=r.cloneNode(this.cachedFragment,!0))):s=this.build(r);var o=r.childAt(s,[1]),h=r.childAt(o,[1]),p=r.childAt(h,[1]),u=r.childAt(p,[1]),m=r.childAt(h,[3,1]),v=r.childAt(o,[3,1]),b=r.createMorphAt(u,1,1),C=r.createMorphAt(u,3,3),f=r.createMorphAt(r.childAt(p,[3]),1,1),g=r.createAttrMorph(m,"src");return d(t,b,e,"book.volumeInfo.title"),d(t,C,e,"book.volumeInfo.authors"),d(t,f,e,"book.volumeInfo.publishedDate"),l(t,g,m,"src",i(t,e,"book.volumeInfo.imageLinks.smallThumbnail")),c(t,v,e,"action",["addBook2",i(t,e,"book")],{}),s}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("ul"),r=e.createTextNode("\n");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("  ");e.appendChild(a,r);var r=e.createElement("br");e.appendChild(a,r);var r=e.createTextNode("\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(t,a,r){var n=a.dom,d=a.hooks,i=d.get,l=d.block;n.detectNamespace(r);var c;a.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(c=this.build(n),this.hasRendered?this.cachedFragment=c:this.hasRendered=!0),this.cachedFragment&&(c=n.cloneNode(this.cachedFragment,!0))):c=this.build(n);var s=n.createMorphAt(n.childAt(c,[1]),1,1);return l(a,s,t,"each",[i(a,t,"model")],{keyword:"book"},e,null),c}}}())}),define("wishlist/templates/list",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createComment("");return e.appendChild(t,a),t},render:function(e,t,a){var r=t.dom,n=t.hooks,d=n.content;r.detectNamespace(a);var i;t.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(i=this.build(r),this.hasRendered?this.cachedFragment=i:this.hasRendered=!0),this.cachedFragment&&(i=r.cloneNode(this.cachedFragment,!0))):i=this.build(r);var l=r.createMorphAt(i,0,0,a);return r.insertBoundary(i,null),r.insertBoundary(i,0),d(t,l,e,"book.title"),i}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("    ");e.appendChild(t,a);var a=e.createElement("li"),r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("   ");e.appendChild(a,r);var r=e.createElement("small"),n=e.createTextNode("by ");e.appendChild(r,n);var n=e.createComment("");e.appendChild(r,n),e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(t,a,r){var n=a.dom,d=a.hooks,i=d.get,l=d.block,c=d.content;n.detectNamespace(r);var s;a.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(s=this.build(n),this.hasRendered?this.cachedFragment=s:this.hasRendered=!0),this.cachedFragment&&(s=n.cloneNode(this.cachedFragment,!0))):s=this.build(n);var o=n.childAt(s,[1]),h=n.createMorphAt(o,0,0),p=n.createMorphAt(n.childAt(o,[2]),1,1);return l(a,h,t,"link-to",["review",i(a,t,"book.title")],{},e,null),c(a,p,t,"book.author"),s}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("h1");e.setAttribute(a,"class","header-font");var r=e.createTextNode(" ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("ul"),r=e.createTextNode("\n");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createComment(" {{#link-to 'list.new-book'}}<button class=\"btn btn-primary\" >Add a Book</button>{{/link-to}} ");e.appendChild(t,a);var a=e.createTextNode("\n\n\n");e.appendChild(t,a);var a=e.createElement("button");e.setAttribute(a,"class","btn btn-danger");var r=e.createTextNode("Delete list");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("hr");e.setAttribute(a,"class","btn-danger"),e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("h1");e.setAttribute(a,"class","header-font");var r=e.createTextNode("Book Lookup");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("form"),r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"class","form-group");var n=e.createTextNode("\n    ");e.appendChild(r,n);var n=e.createComment("");e.appendChild(r,n);var n=e.createTextNode("\n    ");e.appendChild(r,n);var n=e.createElement("button");e.setAttribute(n,"class","btn btn-default");var d=e.createTextNode("Submit");e.appendChild(n,d),e.appendChild(r,n);var n=e.createTextNode("\n  ");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(t,a,r){var n=a.dom,d=a.hooks,i=d.content,l=d.get,c=d.block,s=d.element,o=d.inline;n.detectNamespace(r);var h;a.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(h=this.build(n),this.hasRendered?this.cachedFragment=h:this.hasRendered=!0),this.cachedFragment&&(h=n.cloneNode(this.cachedFragment,!0))):h=this.build(n);var p=n.childAt(h,[7]),u=n.childAt(h,[13,1]),m=n.childAt(u,[3]),v=n.createMorphAt(n.childAt(h,[1]),1,1),b=n.createMorphAt(n.childAt(h,[3]),1,1),C=n.createMorphAt(u,1,1),f=n.createMorphAt(h,15,15,r);return i(a,v,t,"model.name"),c(a,b,t,"each",[l(a,t,"model.books")],{keyword:"book"},e,null),s(a,p,t,"action",["delete"],{}),o(a,C,t,"input",[],{value:l(a,t,"search_term"),placeholder:"Search term",id:"search_term"}),s(a,m,t,"action",["submit"],{}),i(a,f,t,"outlet"),h}}}())}),define("wishlist/templates/list/new-book",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createElement("hr");e.setAttribute(a,"class","btn-primary"),e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("h3");e.setAttribute(a,"class","header-font");var r=e.createTextNode("Add a Book");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("div"),r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createElement("br");e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createElement("br");e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("button");e.setAttribute(r,"class","btn btn-default");var n=e.createTextNode("Submit");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var r=t.dom,n=t.hooks,d=n.get,i=n.inline,l=n.element;r.detectNamespace(a);var c;t.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(c=this.build(r),this.hasRendered?this.cachedFragment=c:this.hasRendered=!0),this.cachedFragment&&(c=r.cloneNode(this.cachedFragment,!0))):c=this.build(r);var s=r.childAt(c,[4]),o=r.childAt(s,[9]),h=r.createMorphAt(s,1,1),p=r.createMorphAt(s,4,4),u=r.createMorphAt(s,7,7);return i(t,h,e,"input",[],{type:"text",placeholder:"Title",value:d(t,e,"title"),"class":"name-input"}),i(t,p,e,"input",[],{type:"text",placeholder:"Author",value:d(t,e,"author"),"class":"name-input"}),i(t,u,e,"input",[],{type:"text",placeholder:"ISBN",value:d(t,e,"isbn"),"class":"name-input"}),l(t,o,e,"action",["addBook"],{}),c}}}())}),define("wishlist/templates/lists",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createComment("");return e.appendChild(t,a),t},render:function(e,t,a){var r=t.dom,n=t.hooks,d=n.content;r.detectNamespace(a);var i;t.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(i=this.build(r),this.hasRendered?this.cachedFragment=i:this.hasRendered=!0),this.cachedFragment&&(i=r.cloneNode(this.cachedFragment,!0))):i=this.build(r);var l=r.createMorphAt(i,0,0,a);return r.insertBoundary(i,null),r.insertBoundary(i,0),d(t,l,e,"list.name"),i}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("\n    ");e.appendChild(t,a);var a=e.createElement("li"),r=e.createTextNode(" ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");return e.appendChild(t,a),t},render:function(t,a,r){var n=a.dom,d=a.hooks,i=d.get,l=d.block;n.detectNamespace(r);var c;a.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(c=this.build(n),this.hasRendered?this.cachedFragment=c:this.hasRendered=!0),this.cachedFragment&&(c=n.cloneNode(this.cachedFragment,!0))):c=this.build(n);var s=n.createMorphAt(n.childAt(c,[1]),1,1);return l(a,s,t,"link-to",["list",i(a,t,"list.id")],{},e,null),c}}}(),t=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("Add a New List");return e.appendChild(t,a),t},render:function(e,t,a){var r=t.dom;r.detectNamespace(a);var n;return t.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(n=this.build(r),this.hasRendered?this.cachedFragment=n:this.hasRendered=!0),this.cachedFragment&&(n=r.cloneNode(this.cachedFragment,!0))):n=this.build(r),n}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("\n\n\n");e.appendChild(t,a);var a=e.createElement("h3");e.setAttribute(a,"class","header-font");var r=e.createTextNode("Lists");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("ul"),r=e.createTextNode("\n");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","container header-font");var r=e.createComment("");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("br");e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(a,r,n){var d=r.dom,i=r.hooks,l=i.get,c=i.block,s=i.content;d.detectNamespace(n);var o;r.useFragmentCache&&d.canClone?(null===this.cachedFragment&&(o=this.build(d),this.hasRendered?this.cachedFragment=o:this.hasRendered=!0),this.cachedFragment&&(o=d.cloneNode(this.cachedFragment,!0))):o=this.build(d);var h=d.createMorphAt(d.childAt(o,[3]),1,1),p=d.createMorphAt(d.childAt(o,[5]),0,0),u=d.createMorphAt(o,9,9,n);return c(r,h,a,"each",[l(r,a,"model")],{keyword:"list"},e,null),c(r,p,a,"link-to",["lists.new"],{},t,null),s(r,u,a,"outlet"),o}}}())}),define("wishlist/templates/lists/new",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createElement("div");e.setAttribute(a,"class","new-msg-form");var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("button");e.setAttribute(r,"class","submit");var n=e.createTextNode("Submit");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var r=t.dom,n=t.hooks,d=n.get,i=n.inline,l=n.element;r.detectNamespace(a);var c;t.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(c=this.build(r),this.hasRendered?this.cachedFragment=c:this.hasRendered=!0),this.cachedFragment&&(c=r.cloneNode(this.cachedFragment,!0))):c=this.build(r);var s=r.childAt(c,[0]),o=r.childAt(s,[3]),h=r.createMorphAt(s,1,1);return i(t,h,e,"input",[],{type:"text",placeholder:"Name",value:d(t,e,"name"),"class":"name-input"}),l(t,o,e,"action",["addList"],{}),c}}}())}),define("wishlist/templates/review",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("    ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode(" ");e.appendChild(t,a);var a=e.createElement("small"),r=e.createTextNode("by ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r),e.appendChild(t,a);var a=e.createElement("br");e.appendChild(t,a);var a=e.createTextNode("\n\n    ");e.appendChild(t,a);var a=e.createElement("a");e.setAttribute(a,"target","new");var r=e.createElement("small"),n=e.createTextNode("Review by");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode(" ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r),e.appendChild(t,a);var a=e.createElement("br");e.appendChild(t,a);var a=e.createTextNode("\n    ");e.appendChild(t,a);var a=e.createElement("br");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var r=t.dom,n=t.hooks,d=n.content,i=n.get,l=n.concat,c=n.attribute;r.detectNamespace(a);var s;t.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(s=this.build(r),this.hasRendered?this.cachedFragment=s:this.hasRendered=!0),this.cachedFragment&&(s=r.cloneNode(this.cachedFragment,!0))):s=this.build(r);var o=r.childAt(s,[6]),h=r.createMorphAt(s,1,1,a),p=r.createMorphAt(r.childAt(s,[3]),1,1),u=r.createAttrMorph(o,"href"),m=r.createMorphAt(o,2,2);return d(t,h,e,"book.book_title"),d(t,p,e,"book.book_author"),c(t,u,o,"href",l(t,[i(t,e,"book.url")])),d(t,m,e,"book.byline"),s}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createComment("");return e.appendChild(t,a),t},render:function(t,a,r){var n=a.dom,d=a.hooks,i=d.get,l=d.block;n.detectNamespace(r);var c;a.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(c=this.build(n),this.hasRendered?this.cachedFragment=c:this.hasRendered=!0),this.cachedFragment&&(c=n.cloneNode(this.cachedFragment,!0))):c=this.build(n);var s=n.createMorphAt(c,0,0,r);return n.insertBoundary(c,null),n.insertBoundary(c,0),l(a,s,t,"each",[i(a,t,"model")],{keyword:"book"},e,null),c}}}(),t=function(){return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("  ");e.appendChild(t,a);var a=e.createElement("h1"),r=e.createTextNode("There are no reviews");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(e,t,a){var r=t.dom;r.detectNamespace(a);var n;return t.useFragmentCache&&r.canClone?(null===this.cachedFragment&&(n=this.build(r),this.hasRendered?this.cachedFragment=n:this.hasRendered=!0),this.cachedFragment&&(n=r.cloneNode(this.cachedFragment,!0))):n=this.build(r),n}}}();return{isHTMLBars:!0,revision:"Ember@1.12.0",blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("\n ");e.appendChild(t,a);var a=e.createElement("h2"),r=e.createTextNode("Reviews");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createComment("");return e.appendChild(t,a),t},render:function(a,r,n){var d=r.dom,i=r.hooks,l=i.get,c=i.block;d.detectNamespace(n);var s;r.useFragmentCache&&d.canClone?(null===this.cachedFragment&&(s=this.build(d),this.hasRendered?this.cachedFragment=s:this.hasRendered=!0),this.cachedFragment&&(s=d.cloneNode(this.cachedFragment,!0))):s=this.build(d);var o=d.createMorphAt(s,3,3,n);return d.insertBoundary(s,null),c(r,o,a,"if",[l(r,a,"model")],{},e,t),s}}}())}),define("wishlist/config/environment",["ember"],function(e){var t="wishlist";try{var a=t+"/config/environment",r=e["default"].$('meta[name="'+a+'"]').attr("content"),n=JSON.parse(unescape(r));return{"default":n}}catch(d){throw new Error('Could not read config from meta tag with name "'+a+'".')}}),runningTests?require("wishlist/tests/test-helper"):require("wishlist/app")["default"].create({name:"wishlist",version:"0.0.0.1dede9f3"});