var io=globalThis,ao=io.ShadowRoot&&(io.ShadyCSS===void 0||io.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,qo=Symbol(),Sr=new WeakMap,qe=class{constructor(e,o,r){if(this._$cssResult$=!0,r!==qo)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o,o=this.t;if(ao&&e===void 0){let r=o!==void 0&&o.length===1;r&&(e=Sr.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&Sr.set(o,e))}return e}toString(){return this.cssText}},Er=t=>new qe(typeof t=="string"?t:t+"",void 0,qo),v=(t,...e)=>{let o=t.length===1?t[0]:e.reduce((r,a,n)=>r+(l=>{if(l._$cssResult$===!0)return l.cssText;if(typeof l=="number")return l;throw Error("Value passed to 'css' function must be a 'css' function result: "+l+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[n+1],t[0]);return new qe(o,t,qo)},Ar=(t,e)=>{if(ao)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of e){let r=document.createElement("style"),a=io.litNonce;a!==void 0&&r.setAttribute("nonce",a),r.textContent=o.cssText,t.appendChild(r)}},Ho=ao?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(let r of e.cssRules)o+=r.cssText;return Er(o)})(t):t;var{is:Ma,defineProperty:Ba,getOwnPropertyDescriptor:Pa,getOwnPropertyNames:Fa,getOwnPropertySymbols:qa,getPrototypeOf:Ha}=Object,so=globalThis,_r=so.trustedTypes,Na=_r?_r.emptyScript:"",Wa=so.reactiveElementPolyfillSupport,He=(t,e)=>t,Ne={toAttribute(t,e){switch(e){case Boolean:t=t?Na:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},no=(t,e)=>!Ma(t,e),$r={attribute:!0,type:String,converter:Ne,reflect:!1,useDefault:!1,hasChanged:no};Symbol.metadata??=Symbol("metadata"),so.litPropertyMetadata??=new WeakMap;var Yt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=$r){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){let r=Symbol(),a=this.getPropertyDescriptor(e,r,o);a!==void 0&&Ba(this.prototype,e,a)}}static getPropertyDescriptor(e,o,r){let{get:a,set:n}=Pa(this.prototype,e)??{get(){return this[o]},set(l){this[o]=l}};return{get:a,set(l){let c=a?.call(this);n?.call(this,l),this.requestUpdate(e,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$r}static _$Ei(){if(this.hasOwnProperty(He("elementProperties")))return;let e=Ha(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(He("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(He("properties"))){let o=this.properties,r=[...Fa(o),...qa(o)];for(let a of r)this.createProperty(a,o[a])}let e=this[Symbol.metadata];if(e!==null){let o=litPropertyMetadata.get(e);if(o!==void 0)for(let[r,a]of o)this.elementProperties.set(r,a)}this._$Eh=new Map;for(let[o,r]of this.elementProperties){let a=this._$Eu(o,r);a!==void 0&&this._$Eh.set(a,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let o=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let a of r)o.unshift(Ho(a))}else e!==void 0&&o.push(Ho(e));return o}static _$Eu(e,o){let r=o.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,o=this.constructor.elementProperties;for(let r of o.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ar(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,r){this._$AK(e,r)}_$ET(e,o){let r=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,r);if(a!==void 0&&r.reflect===!0){let n=(r.converter?.toAttribute!==void 0?r.converter:Ne).toAttribute(o,r.type);this._$Em=e,n==null?this.removeAttribute(a):this.setAttribute(a,n),this._$Em=null}}_$AK(e,o){let r=this.constructor,a=r._$Eh.get(e);if(a!==void 0&&this._$Em!==a){let n=r.getPropertyOptions(a),l=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Ne;this._$Em=a;let c=l.fromAttribute(o,n.type);this[a]=c??this._$Ej?.get(a)??c,this._$Em=null}}requestUpdate(e,o,r,a=!1,n){if(e!==void 0){let l=this.constructor;if(a===!1&&(n=this[e]),r??=l.getPropertyOptions(e),!((r.hasChanged??no)(n,o)||r.useDefault&&r.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(l._$Eu(e,r))))return;this.C(e,o,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:r,reflect:a,wrapped:n},l){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,l??o??this[e]),n!==!0||l!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(o=void 0),this._$AL.set(e,o)),a===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,n]of this._$Ep)this[a]=n;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[a,n]of r){let{wrapped:l}=n,c=this[a];l!==!0||this._$AL.has(a)||c===void 0||this.C(a,void 0,n,c)}}let e=!1,o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(o)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(o=>this._$ET(o,this[o])),this._$EM()}updated(e){}firstUpdated(e){}};Yt.elementStyles=[],Yt.shadowRootOptions={mode:"open"},Yt[He("elementProperties")]=new Map,Yt[He("finalized")]=new Map,Wa?.({ReactiveElement:Yt}),(so.reactiveElementVersions??=[]).push("2.1.2");var Wo=globalThis,Or=t=>t,lo=Wo.trustedTypes,Lr=lo?lo.createPolicy("lit-html",{createHTML:t=>t}):void 0,Uo="$lit$",Kt=`lit$${Math.random().toFixed(9).slice(2)}$`,jo="?"+Kt,Ua=`<${jo}>`,pe=document,Ue=()=>pe.createComment(""),je=t=>t===null||typeof t!="object"&&typeof t!="function",Yo=Array.isArray,Vr=t=>Yo(t)||typeof t?.[Symbol.iterator]=="function",No=`[ 	
\f\r]`,We=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,zr=/-->/g,Dr=/>/g,de=RegExp(`>|${No}(?:([^\\s"'>=/]+)(${No}*=${No}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Tr=/'/g,Rr=/"/g,Mr=/^(?:script|style|textarea|title)$/i,Ko=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),m=Ko(1),Br=Ko(2),Pr=Ko(3),Z=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),Ir=new WeakMap,he=pe.createTreeWalker(pe,129);function Fr(t,e){if(!Yo(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Lr!==void 0?Lr.createHTML(e):e}var qr=(t,e)=>{let o=t.length-1,r=[],a,n=e===2?"<svg>":e===3?"<math>":"",l=We;for(let c=0;c<o;c++){let d=t[c],p,h,u=-1,f=0;for(;f<d.length&&(l.lastIndex=f,h=l.exec(d),h!==null);)f=l.lastIndex,l===We?h[1]==="!--"?l=zr:h[1]!==void 0?l=Dr:h[2]!==void 0?(Mr.test(h[2])&&(a=RegExp("</"+h[2],"g")),l=de):h[3]!==void 0&&(l=de):l===de?h[0]===">"?(l=a??We,u=-1):h[1]===void 0?u=-2:(u=l.lastIndex-h[2].length,p=h[1],l=h[3]===void 0?de:h[3]==='"'?Rr:Tr):l===Rr||l===Tr?l=de:l===zr||l===Dr?l=We:(l=de,a=void 0);let b=l===de&&t[c+1].startsWith("/>")?" ":"";n+=l===We?d+Ua:u>=0?(r.push(p),d.slice(0,u)+Uo+d.slice(u)+Kt+b):d+Kt+(u===-2?c:b)}return[Fr(t,n+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},Ye=class t{constructor({strings:e,_$litType$:o},r){let a;this.parts=[];let n=0,l=0,c=e.length-1,d=this.parts,[p,h]=qr(e,o);if(this.el=t.createElement(p,r),he.currentNode=this.el.content,o===2||o===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(a=he.nextNode())!==null&&d.length<c;){if(a.nodeType===1){if(a.hasAttributes())for(let u of a.getAttributeNames())if(u.endsWith(Uo)){let f=h[l++],b=a.getAttribute(u).split(Kt),y=/([.?@])?(.*)/.exec(f);d.push({type:1,index:n,name:y[2],strings:b,ctor:y[1]==="."?ho:y[1]==="?"?po:y[1]==="@"?uo:me}),a.removeAttribute(u)}else u.startsWith(Kt)&&(d.push({type:6,index:n}),a.removeAttribute(u));if(Mr.test(a.tagName)){let u=a.textContent.split(Kt),f=u.length-1;if(f>0){a.textContent=lo?lo.emptyScript:"";for(let b=0;b<f;b++)a.append(u[b],Ue()),he.nextNode(),d.push({type:2,index:++n});a.append(u[f],Ue())}}}else if(a.nodeType===8)if(a.data===jo)d.push({type:2,index:n});else{let u=-1;for(;(u=a.data.indexOf(Kt,u+1))!==-1;)d.push({type:7,index:n}),u+=Kt.length-1}n++}}static createElement(e,o){let r=pe.createElement("template");return r.innerHTML=e,r}};function ue(t,e,o=t,r){if(e===Z)return e;let a=r!==void 0?o._$Co?.[r]:o._$Cl,n=je(e)?void 0:e._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),n===void 0?a=void 0:(a=new n(t),a._$AT(t,o,r)),r!==void 0?(o._$Co??=[])[r]=a:o._$Cl=a),a!==void 0&&(e=ue(t,a._$AS(t,e.values),a,r)),e}var co=class{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:o},parts:r}=this._$AD,a=(e?.creationScope??pe).importNode(o,!0);he.currentNode=a;let n=he.nextNode(),l=0,c=0,d=r[0];for(;d!==void 0;){if(l===d.index){let p;d.type===2?p=new $e(n,n.nextSibling,this,e):d.type===1?p=new d.ctor(n,d.name,d.strings,this,e):d.type===6&&(p=new mo(n,this,e)),this._$AV.push(p),d=r[++c]}l!==d?.index&&(n=he.nextNode(),l++)}return he.currentNode=pe,a}p(e){let o=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,o),o+=r.strings.length-2):r._$AI(e[o])),o++}},$e=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,r,a){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=r,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=ue(this,e,o),je(e)?e===W||e==null||e===""?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==Z&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Vr(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&je(this._$AH)?this._$AA.nextSibling.data=e:this.T(pe.createTextNode(e)),this._$AH=e}$(e){let{values:o,_$litType$:r}=e,a=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=Ye.createElement(Fr(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===a)this._$AH.p(o);else{let n=new co(a,this),l=n.u(this.options);n.p(o),this.T(l),this._$AH=n}}_$AC(e){let o=Ir.get(e.strings);return o===void 0&&Ir.set(e.strings,o=new Ye(e)),o}k(e){Yo(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,r,a=0;for(let n of e)a===o.length?o.push(r=new t(this.O(Ue()),this.O(Ue()),this,this.options)):r=o[a],r._$AI(n),a++;a<o.length&&(this._$AR(r&&r._$AB.nextSibling,a),o.length=a)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){let r=Or(e).nextSibling;Or(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},me=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,r,a,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=o,this._$AM=a,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=W}_$AI(e,o=this,r,a){let n=this.strings,l=!1;if(n===void 0)e=ue(this,e,o,0),l=!je(e)||e!==this._$AH&&e!==Z,l&&(this._$AH=e);else{let c=e,d,p;for(e=n[0],d=0;d<n.length-1;d++)p=ue(this,c[r+d],o,d),p===Z&&(p=this._$AH[d]),l||=!je(p)||p!==this._$AH[d],p===W?e=W:e!==W&&(e+=(p??"")+n[d+1]),this._$AH[d]=p}l&&!a&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ho=class extends me{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}},po=class extends me{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}},uo=class extends me{constructor(e,o,r,a,n){super(e,o,r,a,n),this.type=5}_$AI(e,o=this){if((e=ue(this,e,o,0)??W)===Z)return;let r=this._$AH,a=e===W&&r!==W||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,n=e!==W&&(r===W||a);a&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},mo=class{constructor(e,o,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){ue(this,e)}},Hr={M:Uo,P:Kt,A:jo,C:1,L:qr,R:co,D:Vr,V:ue,I:$e,H:me,N:po,U:uo,B:ho,F:mo},ja=Wo.litHtmlPolyfillSupport;ja?.(Ye,$e),(Wo.litHtmlVersions??=[]).push("3.3.2");var Nr=(t,e,o)=>{let r=o?.renderBefore??e,a=r._$litPart$;if(a===void 0){let n=o?.renderBefore??null;r._$litPart$=a=new $e(e.insertBefore(Ue(),n),n,void 0,o??{})}return a._$AI(t),a};var Xo=globalThis,oe=class extends Yt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Nr(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}};oe._$litElement$=!0,oe.finalized=!0,Xo.litElementHydrateSupport?.({LitElement:oe});var Ya=Xo.litElementPolyfillSupport;Ya?.({LitElement:oe});(Xo.litElementVersions??=[]).push("4.2.2");var Wr=v`
  :host {
    display: block;
    background-color: var(--wa-color-surface-default);
    box-sizing: border-box;
    min-height: 100%;
    --menu-width: auto;
    --main-width: 1fr;
    --aside-width: auto;
    --banner-height: 0px;
    --header-height: 0px;
    --subheader-height: 0px;
    --scroll-margin-top: calc(var(--header-height, 0px) + var(--subheader-height, 0px) + 0.5em);

    --banner-top: var(--banner-height);
    --header-top: var(--header-height);
    --subheader-top: var(--subheader-height);
  }

  slot[name]:not([name='skip-to-content'], [name='navigation-toggle'])::slotted(*) {
    display: flex;
    background-color: var(--wa-color-surface-default);
  }

  ::slotted([slot='banner']) {
    align-items: center;
    justify-content: center;
    gap: var(--wa-space-m);
    padding: var(--wa-space-xs) var(--wa-space-m);
  }

  ::slotted([slot='header']) {
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--wa-space-m);
    padding: var(--wa-space-m);
    flex: auto;
  }

  ::slotted([slot='subheader']) {
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--wa-space-m);
    padding: var(--wa-space-xs) var(--wa-space-m);
  }

  ::slotted([slot*='navigation']),
  ::slotted([slot='menu']),
  ::slotted([slot='aside']) {
    flex-direction: column;
    gap: var(--wa-space-m);
    padding: var(--wa-space-m);
  }

  ::slotted([slot='main-header']) {
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--wa-space-m);
    padding: var(--wa-space-m) var(--wa-space-3xl);
  }

  slot:not([name]) {
    /* See #331 */
    &::slotted(main),
    &::slotted(section) {
      padding: var(--wa-space-3xl);
    }
  }

  ::slotted([slot='main-footer']),
  ::slotted([slot='footer']) {
    align-items: start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--wa-space-m);
    padding: var(--wa-space-3xl);
  }

  :host([disable-sticky~='banner']) {
    --banner-top: 0px;
  }
  :host([disable-sticky~='header']) {
    --header-top: 0px;
  }
  :host([disable-sticky~='subheader']) {
    --subheader-top: 0px;
  }

  /* Nothing else depends on subheader-height. */
  :host([disable-sticky~='subheader']) {
  }
  :host([disable-sticky~='aside']) [part~='aside'],
  :host([disable-sticky~='menu']) [part~='menu'] {
    height: unset;
    max-height: unset;
  }

  :host([disable-sticky~='banner']) [part~='banner'],
  :host([disable-sticky~='header']) [part~='header'],
  :host([disable-sticky~='subheader']) [part~='subheader'],
  :host([disable-sticky~='aside']) [part~='aside'],
  :host([disable-sticky~='menu']) [part~='menu'] {
    position: static;
    overflow: unset;
    z-index: unset;
  }

  :host([disable-sticky~='aside']) [part~='aside'],
  :host([disable-sticky~='menu']) [part~='menu'] {
    height: auto;
    max-height: auto;
  }

  [part~='base'] {
    min-height: 100dvh;
    display: grid;
    grid-template-rows: repeat(3, minmax(0, auto)) minmax(0, 1fr) minmax(0, auto);
    grid-template-columns: 100%;
    width: 100%;
    grid-template-areas:
      'banner'
      'header'
      'subheader'
      'body'
      'footer';
  }

  /* Grid areas */
  [part~='banner'] {
    grid-area: banner;
  }
  [part~='header'] {
    grid-area: header;
  }
  [part~='subheader'] {
    grid-area: subheader;
  }
  [part~='menu'] {
    grid-area: menu;
  }
  [part~='body'] {
    grid-area: body;
  }
  [part~='main'] {
    grid-area: main;
  }
  [part~='aside'] {
    grid-area: aside;
  }
  [part~='footer'] {
    grid-area: footer;
  }

  /* Z-indexes */
  [part~='banner'],
  [part~='header'],
  [part~='subheader'] {
    position: sticky;
    z-index: 5;
  }
  [part~='banner'] {
    top: 0px;
  }
  [part~='header'] {
    top: var(--banner-top);

    /** Make the header flex so that you don't unexpectedly have the default toggle button appearing above a slotted div because block elements are fun. */
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }
  [part~='subheader'] {
    top: calc(var(--header-top) + var(--banner-top));
  }
  [part~='body'] {
    display: grid;
    min-height: 100%;
    align-items: flex-start;
    grid-template-columns: minmax(0, var(--menu-width)) minmax(0, var(--main-width)) minmax(0, var(--aside-width));
    grid-template-rows: minmax(0, 1fr);
    grid-template-areas: 'menu main aside';
  }
  [part~='main'] {
    display: grid;
    min-height: 100%;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, auto) minmax(0, 1fr) minmax(0, auto);
    grid-template-areas:
      'main-header'
      'main-content'
      'main-footer';
  }
  [part~='main-header'] {
    grid-area: main-header;
  }
  [part~='main-content'] {
    grid-area: main-content;
  }
  [part~='main-footer'] {
    grid-area: main-footer;
  }

  .skip-to-content {
    position: absolute;
    top: var(--wa-space-m);
    left: var(--wa-space-m);
    z-index: 6;
    border-radius: var(--wa-corners-1x);
    background-color: var(--wa-color-surface-default);
    color: var(--wa-color-text-link);
    text-decoration: none;
    padding: var(--wa-space-s) var(--wa-space-m);
    box-shadow: var(--wa-shadow-l);
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  [part~='menu'],
  [part~='aside'] {
    position: sticky;
    top: calc(var(--banner-top) + var(--header-top) + var(--subheader-top));
    z-index: 4;
    height: min(var(--main-height), calc(100dvh - var(--header-top) - var(--banner-top) - var(--subheader-top)));
    max-height: min(var(--main-height), calc(100dvh - var(--header-top) - var(--banner-top) - var(--subheader-top)));
    overflow: auto;
  }

  [part~='navigation'] {
    height: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, auto) minmax(0, 1fr) minmax(0, auto);
  }

  [part~='drawer']::part(dialog) {
    background-color: var(--wa-color-surface-default);
  }

  /* Set these on the slot because we don't always control the navigation-toggle since that may be slotted. */
  slot[name~='navigation-toggle'],
  :host([disable-navigation-toggle]) slot[name~='navigation-toggle'] {
    display: none;
  }

  /* Sometimes the media query in the viewport is stubborn in iframes. This is an extra check to make it behave properly. */
  :host(:not([disable-navigation-toggle])[view='mobile']) slot[name~='navigation-toggle'] {
    display: contents;
  }

  [part~='navigation-toggle'] {
    /* Use only a margin-inline-start because the slotted header is expected to have default padding
        so it looks really awkward if this sets a margin-inline-end and the slotted header has a padding-inline-start. */
    margin-inline-start: var(--wa-space-m);
  }
`;var Ur=(t="768px")=>`
  @media screen and (width < ${t}) {
    [part~='navigation'] {
      display: none;
    }

    :host(:not([disable-navigation-toggle])) slot[name~='navigation-toggle'] {
      display: contents;
    }
  }
`;var fo=v`
  .wa-visually-hidden:not(:focus-within),
  .wa-visually-hidden-force,
  .wa-visually-hidden-hint::part(hint),
  .wa-visually-hidden-label::part(label),
  .wa-visually-hidden-label::part(form-control-label) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
`;var Ka=Object.defineProperty,Xa=Object.getOwnPropertyDescriptor,jr=t=>{throw TypeError(t)},i=(t,e,o,r)=>{for(var a=r>1?void 0:r?Xa(e,o):e,n=t.length-1,l;n>=0;n--)(l=t[n])&&(a=(r?l(e,o,a):l(a))||a);return r&&a&&Ka(e,o,a),a},Yr=(t,e,o)=>e.has(t)||jr("Cannot "+o),Kr=(t,e,o)=>(Yr(t,e,"read from private field"),o?o.call(t):e.get(t)),Xr=(t,e,o)=>e.has(t)?jr("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),Gr=(t,e,o,r)=>(Yr(t,e,"write to private field"),r?r.call(t,o):e.set(t,o),o);var w=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var Ga={attribute:!0,type:String,converter:Ne,reflect:!1,hasChanged:no},Qa=(t=Ga,e,o)=>{let{kind:r,metadata:a}=o,n=globalThis.litPropertyMetadata.get(a);if(n===void 0&&globalThis.litPropertyMetadata.set(a,n=new Map),r==="setter"&&((t=Object.create(t)).wrapped=!0),n.set(o.name,t),r==="accessor"){let{name:l}=o;return{set(c){let d=e.get.call(this);e.set.call(this,c),this.requestUpdate(l,d,t,!0,c)},init(c){return c!==void 0&&this.C(l,void 0,t,c),c}}}if(r==="setter"){let{name:l}=o;return function(c){let d=this[l];e.call(this,c),this.requestUpdate(l,d,t,!0,c)}}throw Error("Unsupported decorator location: "+r)};function s(t){return(e,o)=>typeof o=="object"?Qa(t,e,o):((r,a,n)=>{let l=a.hasOwnProperty(n);return a.constructor.createProperty(n,r),l?Object.getOwnPropertyDescriptor(a,n):void 0})(t,e,o)}function _(t){return s({...t,state:!0,attribute:!1})}function Qr(t){return(e,o)=>{let r=typeof e=="function"?e:e[o];Object.assign(r,t)}}var fe=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);function g(t,e){return(o,r,a)=>{let n=l=>l.renderRoot?.querySelector(t)??null;if(e){let{get:l,set:c}=typeof r=="object"?o:a??(()=>{let d=Symbol();return{get(){return this[d]},set(p){this[d]=p}}})();return fe(o,r,{get(){let d=l.call(this);return d===void 0&&(d=n(this),(d!==null||this.hasUpdated)&&c.call(this,d)),d}})}return fe(o,r,{get(){return n(this)}})}}var Za=v`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,bo,k=class extends oe{constructor(){super(),Xr(this,bo,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,o)=>{if(this.internals?.states)try{o?this.internals.states.add(e):this.internals.states.delete(e)}catch(r){if(String(r).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw r}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let t=this.constructor;for(let[e,o]of t.elementProperties)o.default==="inherit"&&o.initial!==void 0&&typeof e=="string"&&this.customStates.set(`initial-${e}-${o.initial}`,!0)}static get styles(){let t=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[Za,...t]}connectedCallback(){super.connectedCallback(),this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `))}attributeChangedCallback(t,e,o){Kr(this,bo)||(this.constructor.elementProperties.forEach((r,a)=>{r.reflect&&this[a]!=null&&this.initialReflectedProperties.set(a,this[a])}),Gr(this,bo,!0)),super.attributeChangedCallback(t,e,o)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,o)=>{t.has(o)&&this[o]==null&&(this[o]=e)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(e){if(this.didSSR&&!this.hasUpdated){let o=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});o.error=e,this.dispatchEvent(o)}throw e}}relayNativeEvent(t,e){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...e}))}};bo=new WeakMap;i([s()],k.prototype,"dir",2);i([s()],k.prototype,"lang",2);i([s({type:Boolean,reflect:!0,attribute:"did-ssr"})],k.prototype,"didSSR",2);var vt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},re=t=>(...e)=>({_$litDirective$:t,values:e}),Bt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,r){this._$Ct=e,this._$AM=o,this._$Ci=r}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}};var{I:Qn}=Hr;var Zr=(t,e)=>e===void 0?t?._$litType$!==void 0:t?._$litType$===e;var Jr=t=>t.strings===void 0;var Ja={},ti=(t,e=Ja)=>t._$AH=e;var wt=re(class extends Bt{constructor(t){if(super(t),t.type!==vt.PROPERTY&&t.type!==vt.ATTRIBUTE&&t.type!==vt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Jr(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===Z||e===W)return e;let o=t.element,r=t.name;if(t.type===vt.PROPERTY){if(e===o[r])return Z}else if(t.type===vt.BOOLEAN_ATTRIBUTE){if(!!e===o.hasAttribute(r))return Z}else if(t.type===vt.ATTRIBUTE&&o.getAttribute(r)===e+"")return Z;return ti(t),e}});var Ke=class extends Bt{constructor(e){if(super(e),this.it=W,e.type!==vt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===W||e==null)return this._t=void 0,this.it=e;if(e===Z)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let o=[e];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}};Ke.directiveName="unsafeHTML",Ke.resultType=1;var Oe=re(Ke);function ts(t,e=document.documentElement){if(!Number.isNaN(Number(t)))return Number(t);if(!window.CSS||!CSS.registerProperty)return typeof t=="string"&&t.endsWith("px")?parseFloat(t):Number(t)||0;let o="--wa-length-resolver";if(!CSS.registerProperty.toString().includes(o))try{CSS.registerProperty({name:o,syntax:"<length>",inherits:!1,initialValue:"0px"})}catch{}let r=e.style.getPropertyValue(o);e.style.setProperty(o,t);let a=getComputedStyle(e)?.getPropertyValue(o);return e.style.setProperty(o,r),a?.endsWith("px")?parseFloat(a):Number(a)||0}function es(t){return Number.isNaN(Number(t))?t:`${t}px`}var J=class extends k{constructor(){super(),this.headerResizeObserver=this.slotResizeObserver("header"),this.subheaderResizeObserver=this.slotResizeObserver("subheader"),this.bannerResizeObserver=this.slotResizeObserver("banner"),this.footerResizeObserver=this.slotResizeObserver("footer"),this.handleNavigationToggle=t=>{if(this.view==="desktop"){this.hideNavigation();return}let e=t.composedPath(),o=this.navigationToggleSlot;e.find(r=>r.hasAttribute?.("data-toggle-nav")||r.assignedSlot===o||r===o)&&(t.preventDefault(),this.toggleNavigation())},this.view="desktop",this.navOpen=!1,this.mobileBreakpoint="768px",this.navigationPlacement="start",this.disableNavigationToggle=!1,this.pageResizeObserver=new ResizeObserver(t=>{for(let e of t)if(e.contentBoxSize){let r=e.borderBoxSize[0].inlineSize,a=this.view;r>=ts(this.mobileBreakpoint)?this.view="desktop":this.view="mobile",this.requestUpdate("view",a)}t.length>0&&this.updateAsideAndMenuHeights()}),this.updateNavigationToggleState=t=>{if(t){let r=t.target.name;if(!["navigation","navigation-header","navigation-footer"].includes(r))return}let e=!!this.querySelector(":not([slot='toggle-navigation']) [data-toggle-nav]"),o=!!this.querySelector('[slot="navigation"]')||!!this.querySelector('[slot="navigation-header"]')||!!this.querySelector('[slot="navigation-footer"]');this.disableNavigationToggle=e||!o},this.updateAsideAndMenuHeights=()=>{let t=this.visiblePixelsInViewport(this.main);t!=null&&(this.aside.style.setProperty("--main-height",`${t}px`),this.menu.style.setProperty("--main-height",`${t}px`))},this.addEventListener("click",this.handleNavigationToggle)}slotResizeObserver(t){return new ResizeObserver(e=>{for(let o of e)if(o.contentBoxSize){let r=o.borderBoxSize[0];this.style.setProperty(`--${t}-height`,`${r.blockSize}px`)}})}update(t){t.has("view")&&this.hideNavigation(),super.update(t)}connectedCallback(){super.connectedCallback(),this.pageResizeObserver?.observe(this),document.addEventListener("scroll",this.updateAsideAndMenuHeights,{passive:!0}),this.updateAsideAndMenuHeights(),setTimeout(this.updateAsideAndMenuHeights),setTimeout(()=>{this.headerResizeObserver?.observe(this.header),this.subheaderResizeObserver?.observe(this.subheader),this.bannerResizeObserver?.observe(this.banner),this.footerResizeObserver?.observe(this.footer)})}visiblePixelsInViewport(t){if(!t)return null;let e=t.clientHeight,o=window.innerHeight,{top:r,bottom:a}=t.getBoundingClientRect();return Math.max(0,r>0?Math.min(e,o-r):Math.min(a,o))}firstUpdated(){if(!document.getElementById("main-content")){let t=document.createElement("div");t.id="main-content",t.slot="skip-to-content-target",this.prepend(t)}this.shadowRoot.addEventListener("slotchange",this.updateNavigationToggleState),this.updateNavigationToggleState()}disconnectedCallback(){super.disconnectedCallback(),this.pageResizeObserver?.unobserve(this),this.headerResizeObserver?.unobserve(this.header),this.subheaderResizeObserver?.unobserve(this.subheader),this.footerResizeObserver?.unobserve(this.footer),this.bannerResizeObserver?.unobserve(this.banner),document.removeEventListener("scroll",this.updateAsideAndMenuHeights)}showNavigation(){this.navOpen=!0}hideNavigation(){this.navOpen=!1}toggleNavigation(){this.navOpen=!this.navOpen}render(){return m`
      <a href="#main-content" part="skip-to-content" class="wa-visually-hidden">
        <slot name="skip-to-content">Skip to content</slot>
      </a>

      <!-- unsafeHTML needed for SSR until this is solved: https://github.com/lit/lit/issues/4696 -->
      ${Oe(`
        <style id="mobile-styles">
          ${Ur(es(this.mobileBreakpoint))}
        </style>
      `)}

      <div class="base" part="base">
        <div class="banner" part="banner">
          <slot name="banner"></slot>
        </div>
        <div class="header" part="header">
          <slot name="navigation-toggle">
            <wa-button part="navigation-toggle" size="small" appearance="plain" variant="neutral">
              <slot name="navigation-toggle-icon">
                <wa-icon name="bars" part="navigation-toggle-icon" label="Toggle navigation drawer"></wa-icon>
              </slot>
            </wa-button>
          </slot>
          <slot name="header"></slot>
        </div>
        <div class="subheader" part="subheader">
          <slot name="subheader"></slot>
        </div>
        <div class="body" part="body">
          <div class="menu" part="menu">
            <slot name="menu">
              <nav name="navigation" class="navigation" part="navigation navigation-desktop">
                <!-- Add fallback divs so that CSS grid works properly. -->
                <slot name="desktop-navigation-header">
                  <slot name=${this.view==="desktop"?"navigation-header":"___"}><div></div></slot>
                </slot>
                <slot name="desktop-navigation">
                  <slot name=${this.view==="desktop"?"navigation":"____"}><div></div></slot>
                </slot>
                <slot name="desktop-navigation-footer">
                  <slot name=${this.view==="desktop"?"navigation-footer":"___"}><div></div></slot>
                </slot>
              </nav>
            </slot>
          </div>
          <div class="main" part="main">
            <div class="main-header" part="main-header">
              <slot name="main-header"></slot>
            </div>
            <div class="main-content" part="main-content">
              <slot name="skip-to-content-target"></slot>
              <slot></slot>
            </div>
            <div class="main-footer" part="main-footer">
              <slot name="main-footer"></slot>
            </div>
          </div>
          <div class="aside" part="aside">
            <slot name="aside"></slot>
          </div>
        </div>
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
      <wa-drawer
        part="drawer"
        placement=${this.navigationPlacement}
        light-dismiss
        ?open=${wt(this.navOpen)}
        @wa-after-show=${()=>this.navOpen=this.navigationDrawer.open}
        @wa-after-hide=${()=>this.navOpen=this.navigationDrawer.open}
        exportparts="
          dialog:drawer__dialog,
          overlay:drawer__overlay,
          panel:drawer__panel,
          header:drawer__header,
          header-actions:drawer__header-actions,
          title:drawer__title,
          close-button:drawer__close-button,
          close-button__base:drawer__close-button__base,
          body:drawer__body,
          footer:drawer__footer
        "
        class="navigation-drawer"
      >
        <slot slot="label" part="navigation-header" name="mobile-navigation-header">
          <slot name=${this.view==="mobile"?"navigation-header":"___"}></slot>
        </slot>
        <slot name="mobile-navigation">
          <slot name=${this.view==="mobile"?"navigation":"____"}></slot>
        </slot>

        <slot slot="footer" name="mobile-navigation-footer">
          <slot part="navigation-footer" name=${this.view==="mobile"?"navigation-footer":"___"}></slot>
        </slot>
      </wa-drawer>
    `}};J.css=[fo,Wr];i([g("[part~='header']")],J.prototype,"header",2);i([g("[part~='menu']")],J.prototype,"menu",2);i([g("[part~='main']")],J.prototype,"main",2);i([g("[part~='aside']")],J.prototype,"aside",2);i([g("[part~='subheader']")],J.prototype,"subheader",2);i([g("[part~='footer']")],J.prototype,"footer",2);i([g("[part~='banner']")],J.prototype,"banner",2);i([g("[part~='drawer']")],J.prototype,"navigationDrawer",2);i([g("slot[name~='navigation-toggle']")],J.prototype,"navigationToggleSlot",2);i([s({attribute:"view",reflect:!0})],J.prototype,"view",2);i([s({attribute:"nav-open",reflect:!0,type:Boolean})],J.prototype,"navOpen",2);i([s({attribute:"mobile-breakpoint",type:String})],J.prototype,"mobileBreakpoint",2);i([s({attribute:"navigation-placement",reflect:!0})],J.prototype,"navigationPlacement",2);i([s({attribute:"disable-navigation-toggle",reflect:!0,type:Boolean})],J.prototype,"disableNavigationToggle",2);J=i([w("wa-page")],J);if(typeof CSSStyleSheet<"u"&&typeof document<"u"&&"adoptedStyleSheets"in document){let t=new CSSStyleSheet;t.replaceSync(`
  :is(html, body):has(wa-page) {
    min-height: 100%;
    padding: 0;
    margin: 0;
  }

    /**
    Because headers are sticky, this is needed to make sure page fragment anchors scroll down past the headers / subheaders and are visible.
    IE: \`<a href="#id-for-h2">\` anchors.
    */
    wa-page :is(*, *:after, *:before) {
    scroll-margin-top: var(--scroll-margin-top);
    }

    wa-page[view='desktop'] [data-toggle-nav] {
    display: none;
    }

    wa-page[view='mobile'] .wa-desktop-only, wa-page[view='desktop'] .wa-mobile-only {
    display: none !important;
    }
  `),document.adoptedStyleSheets=[...document.adoptedStyleSheets,t]}function go(t){return t.split(" ").map(e=>e.trim()).filter(e=>e!=="")}var ei=v`
  :host {
    --size: 25rem;
    --spacing: var(--wa-space-l);
    --show-duration: 200ms;
    --hide-duration: 200ms;

    display: none;
  }

  :host([open]) {
    display: block;
  }

  .drawer {
    display: flex;
    flex-direction: column;
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    color: inherit;
    background-color: var(--wa-color-surface-raised);
    border: none;
    box-shadow: var(--wa-shadow-l);
    overflow: auto;
    padding: 0;
    margin: 0;
    animation-duration: var(--show-duration);
    animation-timing-function: ease;

    &.show::backdrop {
      animation: show-backdrop var(--show-duration, 200ms) ease;
    }

    &.hide::backdrop {
      animation: show-backdrop var(--hide-duration, 200ms) ease reverse;
    }

    &.show.top {
      animation: show-drawer-from-top var(--show-duration) ease;
    }

    &.hide.top {
      animation: show-drawer-from-top var(--hide-duration) ease reverse;
    }

    &.show.end {
      animation: show-drawer-from-end var(--show-duration) ease;

      &:dir(rtl) {
        animation-name: show-drawer-from-start;
      }
    }

    &.hide.end {
      animation: show-drawer-from-end var(--hide-duration) ease reverse;

      &:dir(rtl) {
        animation-name: show-drawer-from-start;
      }
    }

    &.show.bottom {
      animation: show-drawer-from-bottom var(--show-duration) ease;
    }

    &.hide.bottom {
      animation: show-drawer-from-bottom var(--hide-duration) ease reverse;
    }

    &.show.start {
      animation: show-drawer-from-start var(--show-duration) ease;

      &:dir(rtl) {
        animation-name: show-drawer-from-end;
      }
    }

    &.hide.start {
      animation: show-drawer-from-start var(--hide-duration) ease reverse;

      &:dir(rtl) {
        animation-name: show-drawer-from-end;
      }
    }

    &.pulse {
      animation: pulse 250ms ease;
    }
  }

  .drawer:focus {
    outline: none;
  }

  .top {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .end {
    top: 0;
    inset-inline-end: 0;
    bottom: auto;
    inset-inline-start: auto;
    width: var(--size);
    height: 100%;
  }

  .bottom {
    top: auto;
    inset-inline-end: auto;
    bottom: 0;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .start {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: var(--size);
    height: 100%;
  }

  .header {
    display: flex;
    flex-wrap: nowrap;
    padding-inline-start: var(--spacing);
    padding-block-end: 0;

    /* Subtract the close button's padding so that the X is visually aligned with the edges of the dialog content */
    padding-inline-end: calc(var(--spacing) - var(--wa-form-control-padding-block));
    padding-block-start: calc(var(--spacing) - var(--wa-form-control-padding-block));
  }

  .title {
    align-self: center;
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--wa-font-size-l);
    font-weight: var(--wa-font-weight-heading);
    line-height: var(--wa-line-height-condensed);
    margin: 0;
  }

  .header-actions {
    align-self: start;
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--wa-space-2xs);
    padding-inline-start: var(--spacing);
  }

  .header-actions wa-button,
  .header-actions ::slotted(wa-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .body {
    flex: 1 1 auto;
    display: block;
    padding: var(--spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  .footer {
    display: flex;
    flex-wrap: wrap;
    gap: var(--wa-space-xs);
    justify-content: end;
    padding: var(--spacing);
    padding-block-start: 0;
  }

  .footer ::slotted(wa-button:not(:last-of-type)) {
    margin-inline-end: var(--wa-spacing-xs);
  }

  .drawer::backdrop {
    /*
        NOTE: the ::backdrop element doesn't inherit properly in Safari yet, but it will in 17.4! At that time, we can
        remove the fallback values here.
      */
    background-color: var(--wa-color-overlay-modal, rgb(0 0 0 / 0.25));
  }

  @keyframes pulse {
    0% {
      scale: 1;
    }
    50% {
      scale: 1.01;
    }
    100% {
      scale: 1;
    }
  }

  @keyframes show-drawer {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes show-drawer-from-top {
    from {
      opacity: 0;
      translate: 0 -100%;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-drawer-from-end {
    from {
      opacity: 0;
      translate: 100%;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-drawer-from-bottom {
    from {
      opacity: 0;
      translate: 0 100%;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-drawer-from-start {
    from {
      opacity: 0;
      translate: -100% 0;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-backdrop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (forced-colors: active) {
    .drawer {
      border: solid 1px white;
    }
  }
`;function os(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}var Go=new Set;function rs(){let t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function is(){let t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t}function Le(t){if(Go.add(t),!document.documentElement.classList.contains("wa-scroll-lock")){let e=rs()+is(),o=getComputedStyle(document.documentElement).scrollbarGutter;(!o||o==="auto")&&(o="stable"),e<2&&(o=""),document.documentElement.style.setProperty("--wa-scroll-lock-gutter",o),document.documentElement.classList.add("wa-scroll-lock"),document.documentElement.style.setProperty("--wa-scroll-lock-size",`${e}px`)}}function ze(t){Go.delete(t),Go.size===0&&(document.documentElement.classList.remove("wa-scroll-lock"),document.documentElement.style.removeProperty("--wa-scroll-lock-size"))}function ie(t,e,o="vertical",r="smooth"){let a=os(t,e),n=a.top+e.scrollTop,l=a.left+e.scrollLeft,c=e.scrollLeft,d=e.scrollLeft+e.offsetWidth,p=e.scrollTop,h=e.scrollTop+e.offsetHeight;(o==="horizontal"||o==="both")&&(l<c?e.scrollTo({left:l,behavior:r}):l+t.clientWidth>d&&e.scrollTo({left:l-e.offsetWidth+t.clientWidth,behavior:r})),(o==="vertical"||o==="both")&&(n<p?e.scrollTo({top:n,behavior:r}):n+t.clientHeight>h&&e.scrollTo({top:n-e.offsetHeight+t.clientHeight,behavior:r}))}var dt=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};var ht=class extends Event{constructor(t){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}};var pt=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}};var ut=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}};var be=[];function kt(t){be.push(t)}function mt(t){for(let e=be.length-1;e>=0;e--)if(be[e]===t){be.splice(e,1);break}}function ft(t){return be.length>0&&be[be.length-1]===t}async function Qo(t,e,o){return t.animate(e,o).finished.catch(()=>{})}function U(t,e){return new Promise(o=>{let r=new AbortController,{signal:a}=r;if(t.classList.contains(e))return;t.classList.add(e);let n=!1,l=()=>{n||(n=!0,t.classList.remove(e),o(),r.abort())};t.addEventListener("animationend",l,{once:!0,signal:a}),t.addEventListener("animationcancel",l,{once:!0,signal:a}),requestAnimationFrame(()=>{!n&&t.getAnimations().length===0&&l()})})}function Zo(t){return t=t.toString().toLowerCase(),t.indexOf("ms")>-1?parseFloat(t)||0:t.indexOf("s")>-1?(parseFloat(t)||0)*1e3:parseFloat(t)||0}var N=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=o=>{let r=o.target;(this.slotNames.includes("[default]")&&!r.name||r.name&&this.slotNames.includes(r.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return this.host.childNodes?[...this.host.childNodes].some(t=>{if(t.nodeType===Node.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===Node.ELEMENT_NODE){let e=t;if(e.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1}):!1}hasNamedSlot(t){return this.host.querySelector?.(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot?.addEventListener?.("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot?.removeEventListener?.("slotchange",this.handleSlotChange)}};var Jo=new Set,De=new Map,ge,tr="ltr",er="en",oi=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(oi){let t=new MutationObserver(ri);tr=document.documentElement.dir||"ltr",er=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function Te(...t){t.map(e=>{let o=e.$code.toLowerCase();De.has(o)?De.set(o,Object.assign(Object.assign({},De.get(o)),e)):De.set(o,e),ge||(ge=e)}),ri()}function ri(){oi&&(tr=document.documentElement.dir||"ltr",er=document.documentElement.lang||navigator.language),[...Jo.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}var vo=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Jo.add(this.host)}hostDisconnected(){Jo.delete(this.host)}dir(){return`${this.host.dir||tr}`.toLowerCase()}lang(){return`${this.host.lang||er}`.toLowerCase()}getTranslationData(e){var o,r;let a;try{a=new Intl.Locale(e.replace(/_/g,"-"))}catch{return{locale:void 0,language:"",region:"",primary:void 0,secondary:void 0}}let n=a.language.toLowerCase(),l=(r=(o=a.region)===null||o===void 0?void 0:o.toLowerCase())!==null&&r!==void 0?r:"",c=De.get(`${n}-${l}`),d=De.get(n);return{locale:a,language:n,region:l,primary:c,secondary:d}}exists(e,o){var r;let{primary:a,secondary:n}=this.getTranslationData((r=o.lang)!==null&&r!==void 0?r:this.lang());return o=Object.assign({includeFallback:!1},o),!!(a&&a[e]||n&&n[e]||o.includeFallback&&ge&&ge[e])}term(e,...o){let{primary:r,secondary:a}=this.getTranslationData(this.lang()),n;if(r&&r[e])n=r[e];else if(a&&a[e])n=a[e];else if(ge&&ge[e])n=ge[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof n=="function"?n(...o):n}date(e,o){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),o).format(e)}number(e,o){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),o).format(e)}relativeTime(e,o,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(e,o)}};var ii={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",createOption:t=>`Create "${t}"`,copied:"Copied",copy:"Copy",currentValue:"Current value",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",nextSlide:"Next slide",numCharacters:t=>t===1?"1 character":`${t} characters`,numCharactersRemaining:t=>t===1?"1 character remaining":`${t} characters remaining`,numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};Te(ii);var ai=ii;var L=class extends vo{};Te(ai);function S(t,e){let o={waitUntilFirstUpdate:!1,...e};return(r,a)=>{let{update:n}=r,l=Array.isArray(t)?t:[t];r.update=function(c){l.forEach(d=>{let p=d;if(c.has(p)){let h=c.get(p),u=this[p];h!==u&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[a](h,u)}}),n.call(this,c)}}}var C=re(class extends Bt{constructor(t){if(super(t),t.type!==vt.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(let r in e)e[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(e)}let o=t.element.classList;for(let r of this.st)r in e||(o.remove(r),this.st.delete(r));for(let r in e){let a=!!e[r];a===this.st.has(r)||this.nt?.has(r)||(a?(o.add(r),this.st.add(r)):(o.remove(r),this.st.delete(r)))}return Z}});var Ot=class extends k{constructor(){super(...arguments),this.localize=new L(this),this.hasSlotController=new N(this,"footer","header-actions","label"),this.open=!1,this.label="",this.placement="end",this.withoutHeader=!1,this.lightDismiss=!0,this.withFooter=!1,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&ft(this)&&(t.preventDefault(),t.stopPropagation(),this.requestClose(this.drawer))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.drawer.showModal(),Le(this))}disconnectedCallback(){super.disconnectedCallback(),ze(this),this.removeOpenListeners()}async requestClose(t){let e=new ht({source:t});if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0,U(this.drawer,"pulse");return}this.removeOpenListeners(),await U(this.drawer,"hide"),this.open=!1,this.drawer.close(),ze(this);let o=this.originalTrigger;typeof o?.focus=="function"&&setTimeout(()=>o.focus()),this.dispatchEvent(new pt)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown),kt(this)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown),mt(this)}handleDialogCancel(t){t.preventDefault(),!this.drawer.classList.contains("hide")&&t.target===this.drawer&&ft(this)&&this.requestClose(this.drawer)}handleDialogClick(t){let o=t.target.closest('[data-drawer="close"]');o&&(t.stopPropagation(),this.requestClose(o))}async handleDialogPointerDown(t){t.target===this.drawer&&(this.lightDismiss?this.requestClose(this.drawer):await U(this.drawer,"pulse"))}handleOpenChange(){this.open&&!this.drawer.open?this.show():this.drawer.open&&(this.open=!0,this.requestClose(this.drawer))}async show(){let t=new dt;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.drawer.showModal(),Le(this),requestAnimationFrame(()=>{let e=this.querySelector("[autofocus]");e&&typeof e.focus=="function"?e.focus():this.drawer.focus()}),await U(this.drawer,"show"),this.dispatchEvent(new ut)}render(){let t=!this.withoutHeader,e=this.hasUpdated?this.hasSlotController.test("footer"):this.withFooter;return m`
      <dialog
        part="dialog"
        class=${C({drawer:!0,open:this.open,top:this.placement==="top",end:this.placement==="end",bottom:this.placement==="bottom",start:this.placement==="start"})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${t?m`
              <header part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length>0?this.label:"\u200B"} </slot>
                </h2>
                <div part="header-actions" class="header-actions">
                  <slot name="header-actions"></slot>
                  <wa-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="close"
                    appearance="plain"
                    @click="${o=>this.requestClose(o.target)}"
                  >
                    <wa-icon
                      name="xmark"
                      label=${this.localize.term("close")}
                      library="system"
                      variant="solid"
                    ></wa-icon>
                  </wa-button>
                </div>
              </header>
            `:""}

        <div part="body" class="body"><slot></slot></div>

        ${e?m`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:""}
      </dialog>
    `}};Ot.css=ei;i([g(".drawer")],Ot.prototype,"drawer",2);i([s({type:Boolean,reflect:!0})],Ot.prototype,"open",2);i([s({reflect:!0})],Ot.prototype,"label",2);i([s({reflect:!0})],Ot.prototype,"placement",2);i([s({attribute:"without-header",type:Boolean,reflect:!0})],Ot.prototype,"withoutHeader",2);i([s({attribute:"light-dismiss",type:Boolean})],Ot.prototype,"lightDismiss",2);i([s({attribute:"with-footer",type:Boolean})],Ot.prototype,"withFooter",2);i([S("open",{waitUntilFirstUpdate:!0})],Ot.prototype,"handleOpenChange",1);Ot=i([w("wa-drawer")],Ot);document.addEventListener("click",t=>{let e=t.target.closest("[data-drawer]");if(e instanceof Element){let[o,r]=go(e.getAttribute("data-drawer")||"");if(o==="open"&&r?.length){let n=e.getRootNode().getElementById(r);n?.localName==="wa-drawer"?n.open=!0:console.warn(`A drawer with an ID of "${r}" could not be found in this document.`)}}}),document.addEventListener("pointerdown",()=>{});var Pt=()=>({checkValidity(t){let e=t.input,o={message:"",isValid:!0,invalidKeys:[]};if(!e)return o;let r=!0;if("checkValidity"in e&&(r=e.checkValidity()),r)return o;if(o.isValid=!1,"validationMessage"in e&&(o.message=e.validationMessage),!("validity"in e))return o.invalidKeys.push("customError"),o;for(let a in e.validity){if(a==="valid")continue;let n=a;e.validity[n]&&o.invalidKeys.push(n)}return o}});var wo=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}};var as=()=>({observedAttributes:["custom-error"],checkValidity(t){let e={message:"",isValid:!0,invalidKeys:[]};return t.customError&&(e.message=t.customError,e.isValid=!1,e.invalidKeys=["customError"]),e}}),D=class extends k{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=t=>{t.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new wo))},this.handleInteraction=t=>{let e=this.emittedEvents;e.includes(t.type)||e.push(t.type),e.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[as()]}static get observedAttributes(){let t=new Set(super.observedAttributes||[]);for(let e of this.validators)if(e.observedAttributes)for(let o of e.observedAttributes)t.add(o);return[...t]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(t=>{this.addEventListener(t,this.handleInteraction)})}firstUpdated(...t){super.firstUpdated(...t),this.updateValidity()}willUpdate(t){if(!!1&&t.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),t.has("value")||t.has("disabled")||t.has("defaultValue")){let e=this.value;if(Array.isArray(e)){if(this.name){let o=new FormData;for(let r of e)o.append(this.name,r);this.setValue(o,o)}}else this.setValue(e,e)}t.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!!1&&!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),super.willUpdate(t),this.updateValidity()}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(t){t?this.setAttribute("form",t):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...t){let e=t[0],o=t[1],r=t[2];r||(r=this.validationTarget),this.internals.setValidity(e,o,r||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){let t=!!this.required,e=this.internals.validity.valid,o=this.hasInteracted;this.customStates.set("required",t),this.customStates.set("optional",!t),this.customStates.set("invalid",!e),this.customStates.set("valid",e),this.customStates.set("user-invalid",!e&&o),this.customStates.set("user-valid",e&&o)}setCustomValidity(t){if(!t){this.customError=null,this.setValidity({});return}this.customError=t,this.setValidity({customError:!0},t,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(t){this.disabled=t,this.updateValidity()}formStateRestoreCallback(t,e){this.value=t,e==="restore"&&this.resetValidity(),this.updateValidity()}setValue(...t){let[e,o]=t;this.internals.setFormValue(e,o)}get allValidators(){let t=this.constructor.validators||[],e=this.validators||[];return[...t,...e]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}let t=this.allValidators;if(!t?.length)return;let e={customError:!!this.customError},o=this.validationTarget||this.input||void 0,r="";for(let a of t){let{isValid:n,message:l,invalidKeys:c}=a.checkValidity(this);n||(r||(r=l),c?.length>=0&&c.forEach(d=>e[d]=!0))}r||(r=this.validationMessage),this.setValidity(e,r,o)}};D.formAssociated=!0;i([s({reflect:!0})],D.prototype,"name",2);i([s({type:Boolean})],D.prototype,"disabled",2);i([s({state:!0,attribute:!1})],D.prototype,"valueHasChanged",2);i([s({state:!0,attribute:!1})],D.prototype,"hasInteracted",2);i([s({attribute:"custom-error",reflect:!0})],D.prototype,"customError",2);i([s({attribute:!1,state:!0,type:Object})],D.prototype,"validity",1);var si=v`
  @layer wa-component {
    :host {
      display: inline-block;

      /* Workaround because Chrome doesn't like :host(:has()) below
       * https://issues.chromium.org/issues/40062355
       * Firefox doesn't like this nested rule, so both are needed */
      &:has(wa-badge) {
        position: relative;
      }
    }

    /* Apply relative positioning only when needed to position wa-badge
     * This avoids creating a new stacking context for every button */
    :host(:has(wa-badge)) {
      position: relative;
    }
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    transition-property: background, border, box-shadow, color, opacity;
    transition-duration: var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    cursor: pointer;
    padding: 0 var(--wa-form-control-padding-inline);
    font-family: inherit;
    font-size: inherit;
    font-weight: var(--wa-font-weight-action);
    line-height: calc(var(--wa-form-control-height) - var(--wa-form-control-border-width) * 2);
    height: var(--wa-form-control-height);
    width: 100%;

    background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
    border-color: transparent;
    color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
    border-start-start-radius: var(--_button-start-start-radius, var(--wa-form-control-border-radius));
    border-start-end-radius: var(--_button-start-end-radius, var(--wa-form-control-border-radius));
    border-end-start-radius: var(--_button-end-start-radius, var(--wa-form-control-border-radius));
    border-end-end-radius: var(--_button-end-end-radius, var(--wa-form-control-border-radius));
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
  }

  /* Appearance modifiers */
  :host([appearance='plain']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='outlined']) {
    /* Indentation overrides for grouping outlined */
    margin-inline-start: var(--_button-horizontal-indent-outlined);
    margin-block-start: var(--_button-vertical-indent-outlined);

    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled-outlined']) {
    /* Indentation overrides for grouping outlined */
    margin-inline-start: var(--_button-horizontal-indent-outlined);
    margin-block-start: var(--_button-vertical-indent-outlined);

    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='accent']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
        var(--wa-color-mix-active)
      );
    }
  }

  /* Focus states */
  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled state */
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;

    /* When disabled, prevent mouse events from bubbling up from children */
    .button {
      pointer-events: none;
    }
  }

  /* Keep it last so Safari doesn't stop parsing this block */
  .button::-moz-focus-inner {
    border: 0;
  }

  /* Icon buttons */
  .button.is-icon-button {
    outline-offset: 2px;
    width: var(--wa-form-control-height);
    aspect-ratio: 1;
  }

  .button.is-icon-button:has(wa-icon) {
    width: auto;
  }

  /* Pill modifier */
  :host([pill]) .button {
    border-start-start-radius: var(--_button-start-start-radius, var(--wa-border-radius-pill));
    border-start-end-radius: var(--_button-start-end-radius, var(--wa-border-radius-pill));
    border-end-start-radius: var(--_button-end-start-radius, var(--wa-border-radius-pill));
    border-end-end-radius: var(--_button-end-end-radius, var(--wa-border-radius-pill));
  }

  /*
   * Label
   */

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .label {
    display: inline-block;
  }

  .is-icon-button .label {
    display: flex;
  }

  .label::slotted(wa-icon) {
    align-self: center;
  }

  /*
   * Caret modifier
   */

  wa-icon[part='caret'] {
    display: flex;
    align-self: center;
    align-items: center;

    &::part(svg) {
      width: 0.875em;
      height: 0.875em;
    }

    .button:has(&) .end {
      display: none;
    }
  }

  /*
   * Loading modifier
   */

  .loading {
    position: relative;
    cursor: wait;

    .start,
    .label,
    .end,
    .caret {
      visibility: hidden;
    }

    wa-spinner {
      --indicator-color: currentColor;
      --track-color: color-mix(in oklab, currentColor, transparent 90%);

      position: absolute;
      font-size: 1em;
      height: 1em;
      width: 1em;
      top: calc(50% - 0.5em);
      left: calc(50% - 0.5em);
    }
  }

  /*
   * Badges
   */

  .button ::slotted(wa-badge) {
    border-color: var(--wa-color-surface-default);
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  :host(:dir(rtl)) ::slotted(wa-badge) {
    translate: -50% -50%;
  }

  /*
  * Button spacing
  */

  slot[name='start']::slotted(*) {
    margin-inline-end: 0.75em;
  }

  slot[name='end']::slotted(*),
  .button:not(.visually-hidden-label) [part='caret'] {
    margin-inline-start: 0.75em;
  }
`;var B=v`
  :host([size='small']),
  .wa-size-s {
    font-size: var(--wa-font-size-s);
  }

  :host([size='medium']),
  .wa-size-m {
    font-size: var(--wa-font-size-m);
  }

  :host([size='large']),
  .wa-size-l {
    font-size: var(--wa-font-size-l);
  }
`;var ae=v`
  :where(:root),
  .wa-neutral,
  :host([variant='neutral']) {
    --wa-color-fill-loud: var(--wa-color-neutral-fill-loud);
    --wa-color-fill-normal: var(--wa-color-neutral-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-neutral-fill-quiet);
    --wa-color-border-loud: var(--wa-color-neutral-border-loud);
    --wa-color-border-normal: var(--wa-color-neutral-border-normal);
    --wa-color-border-quiet: var(--wa-color-neutral-border-quiet);
    --wa-color-on-loud: var(--wa-color-neutral-on-loud);
    --wa-color-on-normal: var(--wa-color-neutral-on-normal);
    --wa-color-on-quiet: var(--wa-color-neutral-on-quiet);
  }

  .wa-brand,
  :host([variant='brand']) {
    --wa-color-fill-loud: var(--wa-color-brand-fill-loud);
    --wa-color-fill-normal: var(--wa-color-brand-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-brand-fill-quiet);
    --wa-color-border-loud: var(--wa-color-brand-border-loud);
    --wa-color-border-normal: var(--wa-color-brand-border-normal);
    --wa-color-border-quiet: var(--wa-color-brand-border-quiet);
    --wa-color-on-loud: var(--wa-color-brand-on-loud);
    --wa-color-on-normal: var(--wa-color-brand-on-normal);
    --wa-color-on-quiet: var(--wa-color-brand-on-quiet);
  }

  .wa-success,
  :host([variant='success']) {
    --wa-color-fill-loud: var(--wa-color-success-fill-loud);
    --wa-color-fill-normal: var(--wa-color-success-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-success-fill-quiet);
    --wa-color-border-loud: var(--wa-color-success-border-loud);
    --wa-color-border-normal: var(--wa-color-success-border-normal);
    --wa-color-border-quiet: var(--wa-color-success-border-quiet);
    --wa-color-on-loud: var(--wa-color-success-on-loud);
    --wa-color-on-normal: var(--wa-color-success-on-normal);
    --wa-color-on-quiet: var(--wa-color-success-on-quiet);
  }

  .wa-warning,
  :host([variant='warning']) {
    --wa-color-fill-loud: var(--wa-color-warning-fill-loud);
    --wa-color-fill-normal: var(--wa-color-warning-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-warning-fill-quiet);
    --wa-color-border-loud: var(--wa-color-warning-border-loud);
    --wa-color-border-normal: var(--wa-color-warning-border-normal);
    --wa-color-border-quiet: var(--wa-color-warning-border-quiet);
    --wa-color-on-loud: var(--wa-color-warning-on-loud);
    --wa-color-on-normal: var(--wa-color-warning-on-normal);
    --wa-color-on-quiet: var(--wa-color-warning-on-quiet);
  }

  .wa-danger,
  :host([variant='danger']) {
    --wa-color-fill-loud: var(--wa-color-danger-fill-loud);
    --wa-color-fill-normal: var(--wa-color-danger-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-danger-fill-quiet);
    --wa-color-border-loud: var(--wa-color-danger-border-loud);
    --wa-color-border-normal: var(--wa-color-danger-border-normal);
    --wa-color-border-quiet: var(--wa-color-danger-border-quiet);
    --wa-color-on-loud: var(--wa-color-danger-on-loud);
    --wa-color-on-normal: var(--wa-color-danger-on-normal);
    --wa-color-on-quiet: var(--wa-color-danger-on-quiet);
  }
`;var x=t=>t??W;var li=Symbol.for(""),ss=t=>{if(t?.r===li)return t?._$litStatic$};var or=(t,...e)=>({_$litStatic$:e.reduce((o,r,a)=>o+(n=>{if(n._$litStatic$!==void 0)return n._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${n}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(r)+t[a+1],t[0]),r:li}),ni=new Map,rr=t=>(e,...o)=>{let r=o.length,a,n,l=[],c=[],d,p=0,h=!1;for(;p<r;){for(d=e[p];p<r&&(n=o[p],(a=ss(n))!==void 0);)d+=a+e[++p],h=!0;p!==r&&c.push(n),l.push(d),p++}if(p===r&&l.push(e[r]),h){let u=l.join("$$lit$$");(e=ni.get(u))===void 0&&(l.raw=l,ni.set(u,e=l)),o=c}return t(e,...o)},yo=rr(m),Pc=rr(Br),Fc=rr(Pr);var I=class extends D{constructor(){super(...arguments),this.assumeInteractionOn=["click"],this.hasSlotController=new N(this,"[default]","start","end"),this.localize=new L(this),this.invalid=!1,this.isIconButton=!1,this.title="",this.variant="neutral",this.appearance="accent",this.size="medium",this.withCaret=!1,this.withStart=!1,this.withEnd=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type="button"}static get validators(){return[...super.validators,Pt()]}constructLightDOMButton(){let t=document.createElement("button");for(let e of this.attributes)e.name!=="style"&&t.setAttribute(e.name,e.value);return t.type=this.type,t.style.position="absolute !important",t.style.width="0 !important",t.style.height="0 !important",t.style.clipPath="inset(50%) !important",t.style.overflow="hidden !important",t.style.whiteSpace="nowrap !important",this.name&&(t.name=this.name),t.value=this.value||"",t}handleClick(t){if(this.disabled||this.loading){t.preventDefault(),t.stopImmediatePropagation();return}if(this.type!=="submit"&&this.type!=="reset"||!this.getForm())return;let o=this.constructLightDOMButton();this.parentElement?.append(o),o.click(),o.remove()}handleInvalid(){this.dispatchEvent(new wo)}handleLabelSlotChange(){let t=this.labelSlot.assignedNodes({flatten:!0}),e=!1,o=!1,r=!1,a=!1;[...t].forEach(n=>{if(n.nodeType===Node.ELEMENT_NODE){let l=n;l.localName==="wa-icon"?(o=!0,e||(e=l.label!==void 0)):a=!0}else n.nodeType===Node.TEXT_NODE&&(n.textContent?.trim()||"").length>0&&(r=!0)}),this.isIconButton=o&&!r&&!a,this.customStates.set("icon-button",this.isIconButton),this.isIconButton&&!e&&console.warn('Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.customStates.set("disabled",this.disabled),this.updateValidity()}handleHrefChange(){this.customStates.set("link",this.isLink())}handleLoadingChange(){this.customStates.set("loading",this.loading)}setValue(...t){}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){let t=this.isLink(),e=t?or`a`:or`button`;return yo`
      <${e}
        part="base"
        class=${C({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:this.localize.dir()==="rtl","has-label":this.hasSlotController.test("[default]"),"has-start":this.hasUpdated?this.hasSlotController.test("start"):this.withStart,"has-end":this.hasUpdated?this.hasSlotController.test("end"):this.withEnd,"is-icon-button":this.isIconButton})}
        ?disabled=${x(t?void 0:this.disabled)}
        type=${x(t?void 0:this.type)}
        title=${this.title}
        name=${x(t?void 0:this.name)}
        value=${x(t?void 0:this.value)}
        href=${x(t?this.href:void 0)}
        target=${x(t?this.target:void 0)}
        download=${x(t?this.download:void 0)}
        rel=${x(t&&this.rel?this.rel:void 0)}
        role=${x(t?void 0:"button")}
        aria-disabled=${x(t&&this.disabled?"true":void 0)}
        tabindex=${this.disabled?"-1":"0"}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret?yo`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              `:""}
        ${this.loading?yo`<wa-spinner part="spinner"></wa-spinner>`:""}
      </${e}>
    `}};I.shadowRootOptions={...D.shadowRootOptions,delegatesFocus:!0};I.css=[si,ae,B];i([g(".button")],I.prototype,"button",2);i([g("slot:not([name])")],I.prototype,"labelSlot",2);i([_()],I.prototype,"invalid",2);i([_()],I.prototype,"isIconButton",2);i([s()],I.prototype,"title",2);i([s({reflect:!0})],I.prototype,"variant",2);i([s({reflect:!0})],I.prototype,"appearance",2);i([s({reflect:!0})],I.prototype,"size",2);i([s({attribute:"with-caret",type:Boolean,reflect:!0})],I.prototype,"withCaret",2);i([s({attribute:"with-start",type:Boolean})],I.prototype,"withStart",2);i([s({attribute:"with-end",type:Boolean})],I.prototype,"withEnd",2);i([s({type:Boolean})],I.prototype,"disabled",2);i([s({type:Boolean,reflect:!0})],I.prototype,"loading",2);i([s({type:Boolean,reflect:!0})],I.prototype,"pill",2);i([s()],I.prototype,"type",2);i([s({reflect:!0})],I.prototype,"name",2);i([s({reflect:!0})],I.prototype,"value",2);i([s({reflect:!0})],I.prototype,"href",2);i([s()],I.prototype,"target",2);i([s()],I.prototype,"rel",2);i([s()],I.prototype,"download",2);i([s({attribute:"formaction"})],I.prototype,"formAction",2);i([s({attribute:"formenctype"})],I.prototype,"formEnctype",2);i([s({attribute:"formmethod"})],I.prototype,"formMethod",2);i([s({attribute:"formnovalidate",type:Boolean})],I.prototype,"formNoValidate",2);i([s({attribute:"formtarget"})],I.prototype,"formTarget",2);i([S("disabled",{waitUntilFirstUpdate:!0})],I.prototype,"handleDisabledChange",1);i([S("href")],I.prototype,"handleHrefChange",1);i([S("loading",{waitUntilFirstUpdate:!0})],I.prototype,"handleLoadingChange",1);I=i([w("wa-button")],I);I.disableWarning?.("change-in-update");var ci=v`
  :host {
    --track-width: 2px;
    --track-color: var(--wa-color-neutral-fill-normal);
    --indicator-color: var(--wa-color-brand-fill-loud);
    --speed: 2s;
    --size: 1em;

    /*
      Resizing a spinner element using anything but font-size will break the animation because the animation uses em
      units. Therefore, if a spinner is used in a flex container without \`flex: none\` applied, the spinner can
      grow/shrink and break the animation. The use of \`flex: none\` on the host element prevents this by always having
      the spinner sized according to its actual dimensions.
    */
    flex: none;
    display: inline-flex;
    width: var(--size);
    height: var(--size);
  }

  svg {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    animation: spin var(--speed) linear infinite;
  }

  .track,
  .indicator {
    --radius: calc(var(--size) / 2 - var(--track-width) / 2);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
    r: var(--radius);
    fill: none;
    stroke-width: var(--track-width);
  }

  .track {
    stroke: var(--track-color);
  }

  .indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: calc(0.597 * var(--circumference)), calc(0.796 * var(--circumference));
    stroke-dashoffset: calc(-0.04 * var(--circumference));
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: calc(0.008 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: calc(0.716 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: calc(-0.278 * var(--circumference));
    }
    100% {
      stroke-dasharray: calc(0.716 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: calc(-0.987 * var(--circumference));
    }
  }
`;var ir=class extends k{constructor(){super(...arguments),this.localize=new L(this)}render(){return m`
      <svg
        part="base"
        role="progressbar"
        aria-label=${this.localize.term("loading")}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" />
        <circle class="indicator" />
      </svg>
    `}};ir.css=ci;ir=i([w("wa-spinner")],ir);var di=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}};var hi=v`
  :host {
    --primary-color: currentColor;
    --primary-opacity: 1;
    --secondary-color: currentColor;
    --secondary-opacity: 0.4;
    --rotate-angle: 0deg;

    box-sizing: content-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: -0.125em;
  }

  /* Standard */
  :host(:not([auto-width])) {
    width: 1.25em;
    height: 1em;
  }

  /* Auto-width */
  :host([auto-width]) {
    width: auto;
    height: 1em;
  }

  svg {
    height: 1em;
    overflow: visible;
    width: auto;

    /* Duotone colors with path-specific opacity fallback */
    path[data-duotone-primary] {
      color: var(--primary-color);
      opacity: var(--path-opacity, var(--primary-opacity));
    }

    path[data-duotone-secondary] {
      color: var(--secondary-color);
      opacity: var(--path-opacity, var(--secondary-opacity));
    }
  }

  /* Rotation */
  :host([rotate]) {
    transform: rotate(var(--rotate-angle, 0deg));
  }

  /* Flipping */
  :host([flip='x']) {
    transform: scaleX(-1);
  }
  :host([flip='y']) {
    transform: scaleY(-1);
  }
  :host([flip='both']) {
    transform: scale(-1, -1);
  }

  /* Rotation and Flipping combined */
  :host([rotate][flip='x']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleX(-1);
  }
  :host([rotate][flip='y']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleY(-1);
  }
  :host([rotate][flip='both']) {
    transform: rotate(var(--rotate-angle, 0deg)) scale(-1, -1);
  }

  /* Animations */
  :host([animation='beat']) {
    animation-name: beat;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='fade']) {
    animation-name: fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
  }

  :host([animation='beat-fade']) {
    animation-name: beat-fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
  }

  :host([animation='bounce']) {
    animation-name: bounce;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
  }

  :host([animation='flip']) {
    animation-name: flip;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='shake']) {
    animation-name: shake;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-pulse']) {
    animation-name: spin-pulse;
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, steps(8));
  }

  :host([animation='spin-reverse']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, reverse);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  /* Keyframes */
  @media (prefers-reduced-motion: reduce) {
    :host([animation='beat']),
    :host([animation='bounce']),
    :host([animation='fade']),
    :host([animation='beat-fade']),
    :host([animation='flip']),
    :host([animation='shake']),
    :host([animation='spin']),
    :host([animation='spin-pulse']),
    :host([animation='spin-reverse']) {
      animation: none !important;
      transition: none !important;
    }
  }
  @keyframes beat {
    0%,
    90% {
      transform: scale(1);
    }
    45% {
      transform: scale(var(--beat-scale, 1.25));
    }
  }

  @keyframes fade {
    50% {
      opacity: var(--fade-opacity, 0.4);
    }
  }

  @keyframes beat-fade {
    0%,
    100% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(var(--beat-fade-scale, 1.125));
    }
  }

  @keyframes bounce {
    0% {
      transform: scale(1, 1) translateY(0);
    }
    10% {
      transform: scale(var(--bounce-start-scale-x, 1.1), var(--bounce-start-scale-y, 0.9)) translateY(0);
    }
    30% {
      transform: scale(var(--bounce-jump-scale-x, 0.9), var(--bounce-jump-scale-y, 1.1))
        translateY(var(--bounce-height, -0.5em));
    }
    50% {
      transform: scale(var(--bounce-land-scale-x, 1.05), var(--bounce-land-scale-y, 0.95)) translateY(0);
    }
    57% {
      transform: scale(1, 1) translateY(var(--bounce-rebound, -0.125em));
    }
    64% {
      transform: scale(1, 1) translateY(0);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }

  @keyframes flip {
    50% {
      transform: rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -180deg));
    }
  }

  @keyframes shake {
    0% {
      transform: rotate(-15deg);
    }
    4% {
      transform: rotate(15deg);
    }
    8%,
    24% {
      transform: rotate(-18deg);
    }
    12%,
    28% {
      transform: rotate(18deg);
    }
    16% {
      transform: rotate(-22deg);
    }
    20% {
      transform: rotate(22deg);
    }
    32% {
      transform: rotate(-12deg);
    }
    36% {
      transform: rotate(12deg);
    }
    40%,
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-pulse {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;var pi=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}};var ar="",ns="",sr="";function nr(t){ar=t}function lr(t=""){if(!ar){let e=document.querySelector("[data-webawesome]");if(e?.hasAttribute("data-webawesome")){let o=new URL(e.getAttribute("data-webawesome")??"",window.location.href).pathname;nr(o)}else{let r=[...document.getElementsByTagName("script")].find(a=>a.src.endsWith("webawesome.js")||a.src.endsWith("webawesome.loader.js")||a.src.endsWith("webawesome.ssr-loader.js"));if(r){let a=String(r.getAttribute("src"));nr(a.split("/").slice(0,-1).join("/"))}}}return ar.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}function cr(){return ns.replace(/\/$/,"")}function ui(t){sr=t}function dr(){if(!sr){let t=document.querySelector("[data-fa-kit-code]");t&&ui(t.getAttribute("data-fa-kit-code")||"")}return sr}var mi="7.2.0";function fi(t,e,o){let r="solid";return e==="chisel"&&(r="chisel-regular"),e==="etch"&&(r="etch-solid"),e==="graphite"&&(r="graphite-thin"),e==="jelly"&&(r="jelly-regular",o==="duo-regular"&&(r="jelly-duo-regular"),o==="fill-regular"&&(r="jelly-fill-regular")),e==="jelly-duo"&&(r="jelly-duo-regular"),e==="jelly-fill"&&(r="jelly-fill-regular"),e==="notdog"&&(o==="solid"&&(r="notdog-solid"),o==="duo-solid"&&(r="notdog-duo-solid")),e==="notdog-duo"&&(r="notdog-duo-solid"),e==="slab"&&((o==="solid"||o==="regular")&&(r="slab-regular"),o==="press-regular"&&(r="slab-press-regular")),e==="slab-press"&&(r="slab-press-regular"),e==="thumbprint"&&(r="thumbprint-light"),e==="utility"&&(r="utility-semibold"),e==="utility-duo"&&(r="utility-duo-semibold"),e==="utility-fill"&&(r="utility-fill-semibold"),e==="whiteboard"&&(r="whiteboard-semibold"),e==="classic"&&(o==="thin"&&(r="thin"),o==="light"&&(r="light"),o==="regular"&&(r="regular"),o==="solid"&&(r="solid")),e==="duotone"&&(o==="thin"&&(r="duotone-thin"),o==="light"&&(r="duotone-light"),o==="regular"&&(r="duotone-regular"),o==="solid"&&(r="duotone")),e==="sharp"&&(o==="thin"&&(r="sharp-thin"),o==="light"&&(r="sharp-light"),o==="regular"&&(r="sharp-regular"),o==="solid"&&(r="sharp-solid")),e==="sharp-duotone"&&(o==="thin"&&(r="sharp-duotone-thin"),o==="light"&&(r="sharp-duotone-light"),o==="regular"&&(r="sharp-duotone-regular"),o==="solid"&&(r="sharp-duotone-solid")),e==="brands"&&(r="brands"),r}function ls(t,e,o){let r=fi(t,e,o),a=cr();if(a)return`${a}/${r}/${t}.svg`;let n=dr();return n.length>0?`https://ka-p.fontawesome.com/releases/v${mi}/svgs/${r}/${t}.svg?token=${encodeURIComponent(n)}`:`https://ka-f.fontawesome.com/releases/v${mi}/svgs/${r}/${t}.svg`}var cs={name:"default",resolver:(t,e="classic",o="solid")=>ls(t,e,o),mutator:(t,e)=>{if(e?.family&&!t.hasAttribute("data-duotone-initialized")){let{family:o,variant:r}=e;if(o==="duotone"||o==="sharp-duotone"||o==="notdog-duo"||o==="notdog"&&r==="duo-solid"||o==="jelly-duo"||o==="jelly"&&r==="duo-regular"||o==="utility-duo"||o==="thumbprint"){let a=[...t.querySelectorAll("path")],n=a.find(c=>!c.hasAttribute("opacity")),l=a.find(c=>c.hasAttribute("opacity"));if(!n||!l)return;if(n.setAttribute("data-duotone-primary",""),l.setAttribute("data-duotone-secondary",""),e.swapOpacity&&n&&l){let c=l.getAttribute("opacity")||"0.4";n.style.setProperty("--path-opacity",c),l.style.setProperty("--path-opacity","1")}t.setAttribute("data-duotone-initialized","")}}}},bi=cs;function ds(t){return`data:image/svg+xml,${encodeURIComponent(t)}`}var hr={solid:{check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',file:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/></svg>',"file-audio":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/></svg>',"file-code":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z"/></svg>',"file-excel":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/></svg>',"file-image":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/></svg>',"file-pdf":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>',"file-powerpoint":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/></svg>',"file-video":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>',"file-word":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"/></svg>',"file-zipper":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',plus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',upload:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},hs={name:"system",resolver:(t,e="classic",o="solid")=>{let a=hr[o][t]??hr.regular[t]??hr.regular["circle-question"];return a?ds(a):""}},gi=hs;var ps="classic",xo=[bi,gi],Co=[];function vi(t){Co.push(t)}function wi(t){Co=Co.filter(e=>e!==t)}function ko(t){return xo.find(e=>e.name===t)}function So(t,e){yi(t),xo.push({name:t,resolver:e.resolver,mutator:e.mutator,spriteSheet:e.spriteSheet}),Co.forEach(o=>{o.library===t&&o.setIcon()})}function yi(t){xo=xo.filter(e=>e.name!==t)}function pr(){return ps}var Xe=Symbol(),Eo=Symbol(),ur,mr=new Map,tt=class extends k{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.rotate=0,this.resolveIcon=async(t,e)=>{let o;if(e?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=m`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;let r=this.shadowRoot.querySelector("[part='svg']");return typeof e.mutator=="function"&&e.mutator(r,this),this.svg}try{if(o=await fetch(t,{mode:"cors"}),!o.ok)return o.status===410?Xe:Eo}catch{return Eo}try{let r=document.createElement("div");r.innerHTML=await o.text();let a=r.firstElementChild;if(a?.tagName?.toLowerCase()!=="svg")return Xe;ur||(ur=new DOMParser);let l=ur.parseFromString(a.outerHTML,"text/html").body.querySelector("svg");return l?(l.part.add("svg"),document.adoptNode(l)):Xe}catch{return Xe}}}connectedCallback(){super.connectedCallback(),vi(this)}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),wi(this)}async getIconSource(){let t=ko(this.library),e=this.family||pr();if(this.name&&t){let o;try{o=await t.resolver(this.name,e,this.variant,this.autoWidth)}catch{o=void 0}return{url:o,fromLibrary:!0}}return{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){let{url:t,fromLibrary:e}=await this.getIconSource(),o=e?ko(this.library):void 0;if(!t){this.svg=null;return}let r=mr.get(t);r||(r=this.resolveIcon(t,o),mr.set(t,r));let a=await r;a===Eo&&mr.delete(t);let n=await this.getIconSource();if(t===n.url){if(Zr(a)){this.svg=a;return}switch(a){case Eo:case Xe:this.svg=null,this.dispatchEvent(new di);break;default:this.svg=a.cloneNode(!0),o?.mutator?.(this.svg,this),this.dispatchEvent(new pi)}}}updated(t){super.updated(t);let e=ko(this.library);this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`);let o=this.shadowRoot?.querySelector("svg");o&&e?.mutator?.(o,this)}render(){return this.hasUpdated?this.svg:m`<svg part="svg" width="16" height="16"></svg>`}};tt.css=hi;i([_()],tt.prototype,"svg",2);i([s({reflect:!0})],tt.prototype,"name",2);i([s({reflect:!0})],tt.prototype,"family",2);i([s({reflect:!0})],tt.prototype,"variant",2);i([s({attribute:"auto-width",type:Boolean,reflect:!0})],tt.prototype,"autoWidth",2);i([s({attribute:"swap-opacity",type:Boolean,reflect:!0})],tt.prototype,"swapOpacity",2);i([s()],tt.prototype,"src",2);i([s()],tt.prototype,"label",2);i([s({reflect:!0})],tt.prototype,"library",2);i([s({type:Number,reflect:!0})],tt.prototype,"rotate",2);i([s({type:String,reflect:!0})],tt.prototype,"flip",2);i([s({type:String,reflect:!0})],tt.prototype,"animation",2);i([S("label")],tt.prototype,"handleLabelChange",1);i([S(["family","name","library","variant","src","autoWidth","swapOpacity"],{waitUntilFirstUpdate:!0})],tt.prototype,"setIcon",1);tt=i([w("wa-icon")],tt);var xi=v`
  :host {
    display: inline-flex;
  }

  .button-group {
    display: flex;
    position: relative;
    isolation: isolate;
    flex-wrap: wrap;

    @media (hover: hover) {
      > :hover,
      &::slotted(:hover) {
        z-index: 1;
      }
    }

    /* Focus and checked are always on top */
    > :focus,
    &::slotted(:focus),
    > [aria-checked='true'],
    &::slotted([aria-checked='true']),
    > [checked],
    &::slotted([checked]) {
      z-index: 2 !important;
    }

    :host([orientation='horizontal']) & {
      flex-direction: row;
    }

    :host([orientation='vertical']) & {
      flex-direction: column;
    }
  }

  /* Set custom properties to be inherited by slotted buttons */
  :host([orientation='horizontal']) {
    --_button-horizontal-indent: var(--wa-form-control-border-width);
    --_button-horizontal-indent-outlined: calc(var(--wa-form-control-border-width) * -1);
  }

  :host([orientation='vertical']) {
    --_button-vertical-indent: var(--wa-form-control-border-width);
    --_button-vertical-indent-outlined: calc(var(--wa-form-control-border-width) * -1);
  }

  /* All buttons that are not in front or at the end get their border radius removed */
  ::slotted(:not(:first-child):not(:last-child)) {
    --_button-start-start-radius: 0;
    --_button-start-end-radius: 0;
    --_button-end-start-radius: 0;
    --_button-end-end-radius: 0;
  }

  /* Remove leading and trailing buttons border radius individually */
  :host([orientation='horizontal']) {
    ::slotted(:first-child) {
      --_button-start-end-radius: 0;
      --_button-end-end-radius: 0;
    }

    ::slotted(:last-child) {
      --_button-start-start-radius: 0;
      --_button-end-start-radius: 0;
    }
  }

  :host([orientation='vertical']) {
    ::slotted(:first-child) {
      --_button-end-start-radius: 0;
      --_button-end-end-radius: 0;
    }

    ::slotted(:last-child) {
      --_button-start-start-radius: 0;
      --_button-start-end-radius: 0;
    }
  }
`;var Xt=class extends k{constructor(){super(...arguments),this.disableRole=!1,this.hasOutlined=!1,this.label="",this.orientation="horizontal"}updated(t){super.updated(t),t.has("orientation")&&this.setAttribute("aria-orientation",this.orientation)}handleFocus(t){Ao(t.target)?.classList.add("button-focus")}handleBlur(t){Ao(t.target)?.classList.remove("button-focus")}handleMouseOver(t){Ao(t.target)?.classList.add("button-hover")}handleMouseOut(t){Ao(t.target)?.classList.remove("button-hover")}render(){return m`
      <slot
        part="base"
        class="button-group"
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        aria-orientation=${this.orientation}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      ></slot>
    `}};Xt.css=[xi];i([g("slot")],Xt.prototype,"defaultSlot",2);i([_()],Xt.prototype,"disableRole",2);i([_()],Xt.prototype,"hasOutlined",2);i([s()],Xt.prototype,"label",2);i([s({reflect:!0})],Xt.prototype,"orientation",2);Xt=i([w("wa-button-group")],Xt);function Ao(t){let e="wa-button, wa-radio-button";return t.closest(e)??t.querySelector(e)}var Ci=v`
  :host(:focus) {
    outline: none;
  }

  .number-field {
    display: flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    height: var(--wa-form-control-height);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    cursor: text;
    color: var(--wa-form-control-value-color);
    font-size: inherit;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    vertical-align: middle;
    width: 100%;
    transition:
      background-color var(--wa-transition-normal),
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    background-color: var(--wa-form-control-background-color);
    padding: 0;
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);

    &:focus-within {
      outline-color: var(--wa-color-focus);
    }

    /* Style disabled inputs */
    &:has(input:disabled) {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) {
    .number-field {
      background-color: var(--wa-form-control-background-color);
      border-color: var(--wa-form-control-border-color);
    }

    .stepper {
      color: var(--wa-color-neutral-on-quiet);

      @media (hover: hover) {
        &:hover:not(:disabled) {
          color: var(--wa-color-neutral-on-quiet);
          background-color: var(--wa-color-neutral-fill-quiet);
        }
      }

      &:active:not(:disabled) {
        color: color-mix(in oklab, var(--wa-color-neutral-on-quiet), var(--wa-color-mix-active));
        background-color: color-mix(in oklab, var(--wa-color-neutral-fill-quiet), var(--wa-color-mix-active));
      }
    }
  }

  :host([appearance='filled']) {
    .number-field {
      background-color: var(--wa-color-neutral-fill-quiet);
      border-color: var(--wa-color-neutral-fill-quiet);
    }

    .stepper {
      color: var(--wa-color-neutral-on-quiet);

      @media (hover: hover) {
        &:hover:not(:disabled) {
          color: var(--wa-color-neutral-on-normal);
          background-color: var(--wa-color-neutral-fill-normal);
        }
      }

      &:active:not(:disabled) {
        color: color-mix(in oklab, var(--wa-color-neutral-on-normal), var(--wa-color-mix-active));
        background-color: color-mix(in oklab, var(--wa-color-neutral-fill-normal), var(--wa-color-mix-active));
      }
    }
  }

  :host([appearance='filled-outlined']) {
    .number-field {
      background-color: var(--wa-color-neutral-fill-quiet);
      border-color: var(--wa-form-control-border-color);
    }

    .stepper {
      color: var(--wa-color-neutral-on-quiet);

      @media (hover: hover) {
        &:hover:not(:disabled) {
          color: var(--wa-color-neutral-on-normal);
          background-color: var(--wa-color-neutral-fill-normal);
        }
      }

      &:active:not(:disabled) {
        color: color-mix(in oklab, var(--wa-color-neutral-on-normal), var(--wa-color-mix-active));
        background-color: color-mix(in oklab, var(--wa-color-neutral-fill-normal), var(--wa-color-mix-active));
      }
    }
  }

  :host([pill]) {
    .number-field,
    .stepper {
      border-radius: var(--wa-border-radius-pill);
    }
  }

  .number-field {
    /* Show autofill styles over the entire number field, not just the native <input> */
    &:has(:autofill),
    &:has(:-webkit-autofill) {
      background-color: var(--wa-color-brand-fill-quiet) !important;
    }

    input {
      flex: auto;
      height: 100%;
      width: auto;
      min-width: 0;
      margin: 0;
      padding: 0 var(--wa-form-control-padding-inline);
      outline: none;
      box-shadow: none;
      border: none;
      background-color: transparent;
      font: inherit;
      transition: inherit;
      cursor: inherit;
      -webkit-appearance: none;

      /* Center-align and use tabular numbers for better alignment */
      text-align: center;
      font-variant-numeric: tabular-nums;

      /* Hide the number spinners in Firefox */
      -moz-appearance: textfield;

      /* Hide the number spinners in Chrome/Safari */
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
        display: none;
      }

      /* Turn off Safari's autofill styles */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-background-clip: text;
        background-color: transparent;
        -webkit-text-fill-color: inherit;
      }
    }

    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }

    &:focus {
      outline: none;
    }
  }

  .start,
  .end {
    display: inline-flex;
    flex: 1;
    align-items: center;
    cursor: default;

    &::slotted(wa-icon) {
      color: var(--wa-color-neutral-on-quiet);
    }
  }

  .start {
    justify-content: start;
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  .end {
    justify-content: end;
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  /*
   * Steppers - horizontal layout with minus on start, plus on end
   */

  .stepper {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1;
    height: calc(100% - var(--wa-form-control-border-width) * 2);
    flex: 0 0 auto;
    border: none;
    border-radius: calc(var(--wa-form-control-border-radius) - var(--wa-form-control-border-width) * 2);
    background: transparent;
    cursor: pointer;
    margin: var(--wa-form-control-border-width);
    padding: 0;
    font-size: inherit;
    transition-property: background-color, color;
    transition-duration: var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:focus {
      outline: none;
    }
  }

  :host([without-steppers]) .stepper {
    display: none;
  }
`;function Re(t,e){let o=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!o&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&us(e)})}function us(t){let e=null;if("form"in t&&(e=t.form),!e&&"getForm"in t&&(e=t.getForm()),!e)return;let o=[...e.elements];if(o.length===1){e.requestSubmit(null);return}let r=o.find(a=>a.type==="submit"&&!a.matches(":disabled"));r&&(["input","button"].includes(r.localName)?e.requestSubmit(r):r.click())}var K=v`
  :host {
    display: flex;
    flex-direction: column;
  }

  /* Treat wrapped labels, inputs, and hints as direct children of the host element */
  [part~='form-control'] {
    display: contents;
  }

  /* Label */
  :is([part~='form-control-label'], [part~='label']):has(*:not(:empty)),
  :is([part~='form-control-label'], [part~='label']).has-label {
    display: inline-flex;
    color: var(--wa-form-control-label-color);
    font-weight: var(--wa-form-control-label-font-weight);
    line-height: var(--wa-form-control-label-line-height);
    margin-block-end: 0.5em;
  }

  :host([required]) :is([part~='form-control-label'], [part~='label'])::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
    color: var(--wa-form-control-required-content-color);
  }

  /* Help text */
  [part~='hint'] {
    display: block;
    color: var(--wa-form-control-hint-color);
    font-weight: var(--wa-form-control-hint-font-weight);
    line-height: var(--wa-form-control-hint-line-height);
    margin-block-start: 0.5em;
    font-size: var(--wa-font-size-smaller);

    &:not(.has-slotted, .has-hint) {
      display: none;
    }
  }
`;var q=class extends D{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new N(this,"hint","label"),this.localize=new L(this),this.title="",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="medium",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.placeholder="",this.readonly=!1,this.required=!1,this.step=1,this.withoutSteppers=!1,this.inputmode="numeric",this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,Pt()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}get isAtMin(){if(this.min===void 0)return!1;let t=parseFloat(this.value||"");return!isNaN(t)&&t<=this.min}get isAtMax(){if(this.max===void 0)return!1;let t=parseFloat(this.value||"");return!isNaN(t)&&t>=this.max}handleChange(t){this.value=this.input.value,this.relayNativeEvent(t,{bubbles:!0,composed:!0})}handleInput(){this.value=this.input.value}handleKeyDown(t){Re(t,this),(t.key==="ArrowUp"||t.key==="ArrowDown")&&requestAnimationFrame(()=>{this.value!==this.input.value&&(this.value=this.input.value)})}handleStepperPointerUp(t,e){this.disabled||this.readonly||(t==="up"?this.input.stepUp():this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),e.pointerType!=="touch"&&this.input.focus())}handleStepperPointerDown(t){t.pointerType!=="touch"&&(t.preventDefault(),this.input.focus())}updated(t){super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}render(){let t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,o=this.label?!0:!!t,r=this.hint?!0:!!e;return m`
      <label
        part="form-control-label label"
        class=${C({label:!0,"has-label":o})}
        for="input"
        aria-hidden=${o?"false":"true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="number-field">
        ${this.withoutSteppers?"":m`
              <button
                part="stepper stepper-decrement"
                class="stepper stepper-decrement"
                type="button"
                tabindex="-1"
                aria-label=${this.localize.term("decrement")}
                ?disabled=${this.disabled||this.readonly||this.isAtMin}
                @pointerdown=${this.handleStepperPointerDown}
                @pointerup=${a=>this.handleStepperPointerUp("down",a)}
              >
                <slot name="decrement-icon">
                  <wa-icon name="minus" library="system"></wa-icon>
                </slot>
              </button>
            `}

        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
          id="input"
          class="control"
          type="number"
          inputmode=${x(this.inputmode)}
          title=${this.title}
          name=${x(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${x(this.placeholder)}
          min=${x(this.min)}
          max=${x(this.max)}
          step=${x(this.step)}
          .value=${wt(this.value??"")}
          autocomplete=${x(this.autocomplete)}
          ?autofocus=${this.autofocus}
          enterkeyhint=${x(this.enterkeyhint)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        <slot name="end" part="end" class="end"></slot>

        ${this.withoutSteppers?"":m`
              <button
                part="stepper stepper-increment"
                class="stepper stepper-increment"
                type="button"
                tabindex="-1"
                aria-label=${this.localize.term("increment")}
                ?disabled=${this.disabled||this.readonly||this.isAtMax}
                @pointerdown=${this.handleStepperPointerDown}
                @pointerup=${a=>this.handleStepperPointerUp("up",a)}
              >
                <slot name="increment-icon">
                  <wa-icon name="plus" library="system"></wa-icon>
                </slot>
              </button>
            `}
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${C({"has-slotted":r})}
        aria-hidden=${r?"false":"true"}
        >${this.hint}</slot
      >
    `}};q.css=[B,K,Ci];q.shadowRootOptions={...D.shadowRootOptions,delegatesFocus:!0};i([g("input")],q.prototype,"input",2);i([s()],q.prototype,"title",2);i([_()],q.prototype,"value",1);i([s({attribute:"value",reflect:!0})],q.prototype,"defaultValue",2);i([s({reflect:!0})],q.prototype,"size",2);i([s({reflect:!0})],q.prototype,"appearance",2);i([s({type:Boolean,reflect:!0})],q.prototype,"pill",2);i([s()],q.prototype,"label",2);i([s({attribute:"hint"})],q.prototype,"hint",2);i([s()],q.prototype,"placeholder",2);i([s({type:Boolean,reflect:!0})],q.prototype,"readonly",2);i([s({type:Boolean,reflect:!0})],q.prototype,"required",2);i([s({type:Number})],q.prototype,"min",2);i([s({type:Number})],q.prototype,"max",2);i([s()],q.prototype,"step",2);i([s({attribute:"without-steppers",type:Boolean})],q.prototype,"withoutSteppers",2);i([s()],q.prototype,"autocomplete",2);i([s({type:Boolean})],q.prototype,"autofocus",2);i([s()],q.prototype,"enterkeyhint",2);i([s()],q.prototype,"inputmode",2);i([s({attribute:"with-label",type:Boolean})],q.prototype,"withLabel",2);i([s({attribute:"with-hint",type:Boolean})],q.prototype,"withHint",2);i([S("step",{waitUntilFirstUpdate:!0})],q.prototype,"handleStepChange",1);q=i([w("wa-number-input")],q);q.disableWarning?.("change-in-update");var ki=v`
  :host {
    --spacing: var(--wa-space-l);

    /* Internal calculated properties */
    --inner-border-radius: calc(var(--wa-panel-border-radius) - var(--wa-panel-border-width));

    display: flex;
    flex-direction: column;
    background-color: var(--wa-color-surface-default);
    border-color: var(--wa-color-surface-border);
    border-radius: var(--wa-panel-border-radius);
    border-style: var(--wa-panel-border-style);
    box-shadow: var(--wa-shadow-s);
    border-width: var(--wa-panel-border-width);
    color: var(--wa-color-text-normal);
  }

  /* Appearance modifiers */
  :host([appearance='plain']) {
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
  }

  :host([appearance='outlined']) {
    background-color: var(--wa-color-surface-default);
    border-color: var(--wa-color-surface-border);
  }

  :host([appearance='filled']) {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: transparent;
  }

  :host([appearance='filled-outlined']) {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-surface-border);
  }

  :host([appearance='accent']) {
    color: var(--wa-color-neutral-on-loud);
    background-color: var(--wa-color-neutral-fill-loud);
    border-color: transparent;
  }

  /* Take care of top and bottom radii */
  .media,
  :host(:not([with-media])) .header,
  :host(:not([with-media], [with-header])) .body {
    border-start-start-radius: var(--inner-border-radius);
    border-start-end-radius: var(--inner-border-radius);
  }

  :host(:not([with-footer])) .body,
  .footer {
    border-end-start-radius: var(--inner-border-radius);
    border-end-end-radius: var(--inner-border-radius);
  }

  .media {
    display: flex;
    overflow: hidden;

    &::slotted(*) {
      display: block;
      width: 100%;
      border-radius: 0 !important;
    }
  }

  /* Round all corners for plain appearance */
  :host([appearance='plain']) .media {
    border-radius: var(--inner-border-radius);

    &::slotted(*) {
      border-radius: inherit !important;
    }
  }

  .header {
    display: block;
    border-block-end-style: inherit;
    border-block-end-color: var(--wa-color-surface-border);
    border-block-end-width: var(--wa-panel-border-width);
    padding: calc(var(--spacing) / 2) var(--spacing);
  }

  .body {
    display: block;
    padding: var(--spacing);
  }

  .footer {
    display: block;
    border-block-start-style: inherit;
    border-block-start-color: var(--wa-color-surface-border);
    border-block-start-width: var(--wa-panel-border-width);
    padding: var(--spacing);
  }

  /* Push slots to sides when the action slots renders */
  .has-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  :host(:not([with-header])) .header,
  :host(:not([with-footer])) .footer,
  :host(:not([with-media])) .media {
    display: none;
  }

  /* Orientation Styles */
  :host([orientation='horizontal']) {
    flex-direction: row;

    .media {
      border-start-start-radius: var(--inner-border-radius);
      border-end-start-radius: var(--inner-border-radius);
      border-start-end-radius: 0;

      &::slotted(*) {
        block-size: 100%;
        inline-size: 100%;
        object-fit: cover;
      }
    }
  }

  :host([orientation='horizontal']) .body slot::slotted(*) {
    display: block;
    height: 100%;
    margin: 0;
  }

  :host([orientation='horizontal']) slot[name='actions']::slotted(*) {
    display: flex;
    align-items: center;
    padding: var(--spacing);
  }
`;var Ft=class extends k{constructor(){super(...arguments),this.hasSlotController=new N(this,"footer","header","media","header-actions","footer-actions","actions"),this.appearance="outlined",this.withHeader=!1,this.withMedia=!1,this.withFooter=!1,this.orientation="vertical"}willUpdate(){!this.withHeader&&this.hasSlotController.test("header")&&(this.withHeader=!0),!this.withMedia&&this.hasSlotController.test("media")&&(this.withMedia=!0),!this.withFooter&&this.hasSlotController.test("footer")&&(this.withFooter=!0)}render(){return this.orientation==="horizontal"?m`
        <slot name="media" part="media" class="media"></slot>
        <div part="body" class="body"><slot></slot></div>
        <slot name="actions" part="actions" class="actions"></slot>
      `:m`
      <slot name="media" part="media" class="media"></slot>

      ${this.hasSlotController.test("header-actions")?m` <header part="header" class="header has-actions">
            <slot name="header"></slot>
            <slot name="header-actions"></slot>
          </header>`:m` <header part="header" class="header">
            <slot name="header"></slot>
          </header>`}

      <div part="body" class="body"><slot></slot></div>
      ${this.hasSlotController.test("footer-actions")?m` <footer part="footer" class="footer has-actions">
            <slot name="footer"></slot>
            <slot name="footer-actions"></slot>
          </footer>`:m` <footer part="footer" class="footer">
            <slot name="footer"></slot>
          </footer>`}
    `}};Ft.css=[B,ki];i([s({reflect:!0})],Ft.prototype,"appearance",2);i([s({attribute:"with-header",type:Boolean,reflect:!0})],Ft.prototype,"withHeader",2);i([s({attribute:"with-media",type:Boolean,reflect:!0})],Ft.prototype,"withMedia",2);i([s({attribute:"with-footer",type:Boolean,reflect:!0})],Ft.prototype,"withFooter",2);i([s({reflect:!0})],Ft.prototype,"orientation",2);Ft=i([w("wa-card")],Ft);Ft.disableWarning?.("change-in-update");var Si=v`
  :host {
    display: flex;
    position: relative;
    align-items: stretch;
    border-radius: var(--wa-panel-border-radius);
    background-color: var(--wa-color-fill-quiet, var(--wa-color-brand-fill-quiet));
    border-color: var(--wa-color-border-quiet, var(--wa-color-brand-border-quiet));
    border-style: var(--wa-panel-border-style);
    border-width: var(--wa-panel-border-width);
    color: var(--wa-color-text-normal);
    padding: 1em;
  }

  /* Appearance modifiers */
  :host([appearance~='plain']) {
    background-color: transparent;
    border-color: transparent;
  }

  :host([appearance~='outlined']) {
    background-color: transparent;
    border-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));
  }

  :host([appearance~='filled']) {
    background-color: var(--wa-color-fill-quiet, var(--wa-color-brand-fill-quiet));
    border-color: transparent;
  }

  :host([appearance~='filled-outlined']) {
    border-color: var(--wa-color-border-quiet, var(--wa-color-brand-border-quiet));
  }

  :host([appearance~='accent']) {
    color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
    background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
    border-color: transparent;

    [part~='icon'] {
      color: currentColor;
    }
  }

  [part~='icon'] {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-on-quiet);
    font-size: 1.25em;
  }

  ::slotted([slot='icon']) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  [part~='message'] {
    flex: 1 1 auto;
    display: block;
    overflow: hidden;
  }
`;var ve=class extends k{constructor(){super(...arguments),this.variant="brand",this.size="medium"}render(){return m`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>
    `}};ve.css=[Si,ae,B];i([s({reflect:!0})],ve.prototype,"variant",2);i([s({reflect:!0})],ve.prototype,"appearance",2);i([s({reflect:!0})],ve.prototype,"size",2);ve=i([w("wa-callout")],ve);var Ei=v`
  :host {
    --checked-icon-color: var(--wa-color-brand-on-loud);
    --checked-icon-scale: 0.8;

    display: inline-flex;
    color: var(--wa-form-control-value-color);
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    user-select: none;
    -webkit-user-select: none;
  }

  [part~='control'] {
    display: inline-flex;
    flex: 0 0 auto;
    position: relative;
    align-items: center;
    justify-content: center;
    width: var(--wa-form-control-toggle-size);
    height: var(--wa-form-control-toggle-size);
    border-color: var(--wa-form-control-border-color);
    border-radius: min(
      calc(var(--wa-form-control-toggle-size) * 0.375),
      var(--wa-border-radius-s)
    ); /* min prevents entirely circular checkbox */
    border-style: var(--wa-border-style);
    border-width: var(--wa-form-control-border-width);
    background-color: var(--wa-form-control-background-color);
    transition:
      background var(--wa-transition-normal),
      border-color var(--wa-transition-fast),
      box-shadow var(--wa-transition-fast),
      color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);

    margin-inline-end: 0.5em;
  }

  [part~='base'] {
    display: flex;
    align-items: flex-start;
    position: relative;
    color: currentColor;
    vertical-align: middle;
    cursor: pointer;
  }

  [part~='label'] {
    display: inline;
  }

  /* Checked */
  [part~='control']:has(:checked, :indeterminate) {
    color: var(--checked-icon-color);
    border-color: var(--wa-form-control-activated-color);
    background-color: var(--wa-form-control-activated-color);
  }

  /* Focus */
  [part~='control']:has(> input:focus-visible:not(:disabled)) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled */
  :host [part~='base']:has(input:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  input {
    position: absolute;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    pointer-events: none;
  }

  [part~='icon'] {
    display: flex;
    scale: var(--checked-icon-scale);

    /* Without this, Safari renders the icon slightly to the left */
    &::part(svg) {
      translate: 0.0009765625em;
    }

    input:not(:checked, :indeterminate) + & {
      visibility: hidden;
    }
  }

  :host([required]) [part~='label']::after {
    content: var(--wa-form-control-required-content);
    color: var(--wa-form-control-required-content-color);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }
`;var se=(t={})=>{let{validationElement:e,validationProperty:o}=t;e||(e=Object.assign(document.createElement("input"),{required:!0})),o||(o="value");let r={observedAttributes:["required"],message:e.validationMessage,checkValidity(a){let n={message:"",isValid:!0,invalidKeys:[]};return(a.required??a.hasAttribute("required"))&&!a[o]&&(n.message=typeof r.message=="function"?r.message(a):r.message||"",n.isValid=!1,n.invalidKeys.push("valueMissing")),n}};return r};var X=class extends D{constructor(){super(...arguments),this.hasSlotController=new N(this,"hint"),this.title="",this.name=null,this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.indeterminate=!1,this._checked=null,this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint=""}static get validators(){let t=[se({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...t]}get value(){let t=this._value||"on";return this.checked?t:null}set value(t){this._value=t}get checked(){return this.valueHasChanged?!!this._checked:this._checked??this.defaultChecked}set checked(t){this._checked=!!t,this.valueHasChanged=!0}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}connectedCallback(){super.connectedCallback(),this.handleDefaultCheckedChange()}handleDefaultCheckedChange(){this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(t){super.willUpdate(t),(t.has("value")||t.has("checked")||t.has("defaultChecked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){let t=this.hasSlotController.test("hint"),e=this.hint?!0:!!t,o=!this.checked&&this.indeterminate,r=o?"indeterminate":"check",a=o?"indeterminate":"check";return m`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${x(this.name)}
            value=${x(this._value)}
            .indeterminate=${wt(this.indeterminate)}
            .checked=${wt(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${a}-icon icon" library="system" name=${r}></wa-icon>
        </span>

        <slot part="label"></slot>
      </label>

      <slot
        id="hint"
        part="hint"
        name="hint"
        aria-hidden=${e?"false":"true"}
        class="${C({"has-slotted":e})}"
      >
        ${this.hint}
      </slot>
    `}};X.css=[K,B,Ei];X.shadowRootOptions={...D.shadowRootOptions,delegatesFocus:!0};i([g('input[type="checkbox"]')],X.prototype,"input",2);i([s()],X.prototype,"title",2);i([s({reflect:!0})],X.prototype,"name",2);i([s({reflect:!0})],X.prototype,"value",1);i([s({reflect:!0})],X.prototype,"size",2);i([s({type:Boolean})],X.prototype,"disabled",2);i([s({type:Boolean,reflect:!0})],X.prototype,"indeterminate",2);i([s({type:Boolean,attribute:!1})],X.prototype,"checked",1);i([s({type:Boolean,reflect:!0,attribute:"checked"})],X.prototype,"defaultChecked",2);i([s({type:Boolean,reflect:!0})],X.prototype,"required",2);i([s()],X.prototype,"hint",2);i([S(["checked","defaultChecked"])],X.prototype,"handleDefaultCheckedChange",1);i([S(["checked","indeterminate"])],X.prototype,"handleStateChange",1);i([S("disabled")],X.prototype,"handleDisabledChange",1);X=i([w("wa-checkbox")],X);X.disableWarning?.("change-in-update");var Ai=v`
  :host {
    --spacing: var(--wa-space-m);
    --show-duration: 200ms;
    --hide-duration: 200ms;

    display: block;
  }

  details {
    display: block;
    overflow-anchor: none;
    border: var(--wa-panel-border-width) var(--wa-color-surface-border) var(--wa-panel-border-style);
    background-color: var(--wa-color-surface-default);
    border-radius: var(--wa-panel-border-radius);
    color: var(--wa-color-text-normal);

    /* Print styles */
    @media print {
      background: none;
      border: solid var(--wa-border-width-s) var(--wa-color-surface-border);

      summary {
        list-style: none;
      }
    }
  }

  /* Appearance modifiers */
  :host([appearance='plain']) details {
    background-color: transparent;
    border-color: transparent;
    border-radius: 0;
  }

  :host([appearance='outlined']) details {
    background-color: var(--wa-color-surface-default);
    border-color: var(--wa-color-surface-border);
  }

  :host([appearance='filled']) details {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: transparent;
  }

  :host([appearance='filled-outlined']) details {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-border-quiet);
  }

  :host([disabled]) details {
    opacity: 0.5;
    cursor: not-allowed;
  }

  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing);
    padding: var(--spacing); /* Add padding here */
    border-radius: calc(var(--wa-panel-border-radius) - var(--wa-panel-border-width));
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;

    &::marker,
    &::-webkit-details-marker {
      display: none;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: calc(var(--wa-panel-border-width) + var(--wa-focus-ring-offset));
    }
  }

  :host([open]) summary {
    border-end-start-radius: 0;
    border-end-end-radius: 0;
  }

  /* 'Start' icon placement */
  :host([icon-placement='start']) summary {
    flex-direction: row-reverse;
    justify-content: start;
  }

  [part~='icon'] {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-text-quiet);
    transition: rotate var(--wa-transition-normal) var(--wa-transition-easing);
  }

  :host([open]) [part~='icon'] {
    rotate: 90deg;
  }

  :host([open]:dir(rtl)) [part~='icon'] {
    rotate: -90deg;
  }

  :host([open]) slot[name='expand-icon'],
  :host(:not([open])) slot[name='collapse-icon'] {
    display: none;
  }

  .body.animating {
    overflow: hidden;
  }

  .content {
    display: block;
    box-sizing: border-box; /* Ensure contents don't overflow */
    padding-block-start: var(--spacing);
    padding-inline: var(--spacing); /* Add horizontal padding */
    padding-block-end: var(--spacing); /* Add bottom padding */
  }
`;function St(t,e){return new Promise(o=>{function r(a){a.target===t&&(t.removeEventListener(e,r),o())}t.addEventListener(e,r)})}var it=class extends k{constructor(){super(...arguments),this.localize=new L(this),this.animationGeneration=0,this.isAnimating=!1,this.open=!1,this.disabled=!1,this.appearance="outlined",this.iconPlacement="end"}disconnectedCallback(){super.disconnectedCallback(),this.detailsObserver?.disconnect()}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(t=>{for(let e of t)e.type==="attributes"&&e.attributeName==="open"&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}updated(t){t.has("isAnimating")&&this.customStates.set("animating",this.isAnimating)}handleSummaryClick(t){t.composedPath().some(r=>{if(!(r instanceof HTMLElement))return!1;let a=r.tagName?.toLowerCase();return["a","button","input","textarea","select"].includes(a)?!0:r instanceof D?!("disabled"in r)||!r.disabled:!1})||(t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus()))}handleSummaryKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.open?this.hide():this.show()),(t.key==="ArrowUp"||t.key==="ArrowLeft")&&(t.preventDefault(),this.hide()),(t.key==="ArrowDown"||t.key==="ArrowRight")&&(t.preventDefault(),this.show())}closeOthersWithSameName(){if(!this.name)return;this.getRootNode().querySelectorAll(`wa-details[name="${this.name}"]`).forEach(o=>{o!==this&&o.open&&(o.open=!1)})}async handleOpenChange(){this.animationGeneration++;let t=this.animationGeneration;if(this.open){this.details.open=!0;let e=new dt;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1,this.details.open=!1;return}this.closeOthersWithSameName(),this.isAnimating=!0;let o=Zo(getComputedStyle(this.body).getPropertyValue("--show-duration"));if(await Qo(this.body,[{height:"0",opacity:"0"},{height:`${this.body.scrollHeight}px`,opacity:"1"}],{duration:o,easing:"linear"}),this.animationGeneration!==t)return;this.body.style.height="auto",this.isAnimating=!1,this.dispatchEvent(new ut)}else{let e=new ht;if(this.dispatchEvent(e),e.defaultPrevented){this.details.open=!0,this.open=!0;return}this.isAnimating=!0;let o=Zo(getComputedStyle(this.body).getPropertyValue("--hide-duration"));if(await Qo(this.body,[{height:`${this.body.scrollHeight}px`,opacity:"1"},{height:"0",opacity:"0"}],{duration:o,easing:"linear"}),this.animationGeneration!==t)return;this.body.style.height="0",this.isAnimating=!1,this.details.open=!1,this.dispatchEvent(new pt)}}async show(){if(!(this.open||this.disabled))return this.open=!0,St(this,"wa-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=!1,St(this,"wa-after-hide")}render(){let t=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return m`
      <details part="base">
        <summary
          part="header"
          role="button"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="content"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary">${this.summary}</slot>

          <span part="icon">
            <slot name="expand-icon">
              <wa-icon library="system" variant="solid" name=${t?"chevron-left":"chevron-right"}></wa-icon>
            </slot>
            <slot name="collapse-icon">
              <wa-icon library="system" variant="solid" name=${t?"chevron-left":"chevron-right"}></wa-icon>
            </slot>
          </span>
        </summary>

        <div
          class=${C({body:!0,animating:this.isAnimating})}
          role="region"
          aria-labelledby="header"
        >
          <slot part="content" id="content" class="content"></slot>
        </div>
      </details>
    `}};it.css=Ai;i([g("details")],it.prototype,"details",2);i([g("summary")],it.prototype,"header",2);i([g(".body")],it.prototype,"body",2);i([g(".expand-icon-slot")],it.prototype,"expandIconSlot",2);i([_()],it.prototype,"isAnimating",2);i([s({type:Boolean,reflect:!0})],it.prototype,"open",2);i([s()],it.prototype,"summary",2);i([s({reflect:!0})],it.prototype,"name",2);i([s({type:Boolean,reflect:!0})],it.prototype,"disabled",2);i([s({reflect:!0})],it.prototype,"appearance",2);i([s({attribute:"icon-placement",reflect:!0})],it.prototype,"iconPlacement",2);i([S("open",{waitUntilFirstUpdate:!0})],it.prototype,"handleOpenChange",1);it=i([w("wa-details")],it);var _i=v`
  :host {
    --width: 31rem;
    --spacing: var(--wa-space-l);
    --show-duration: 200ms;
    --hide-duration: 200ms;

    display: none;
  }

  :host([open]) {
    display: block;
  }

  .dialog {
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: var(--width);
    max-width: calc(100% - var(--wa-space-2xl));
    max-height: calc(100% - var(--wa-space-2xl));
    color: inherit;
    background-color: var(--wa-color-surface-raised);
    border-radius: var(--wa-panel-border-radius);
    border: none;
    box-shadow: var(--wa-shadow-l);
    padding: 0;
    margin: auto;

    &.show {
      animation: show-dialog var(--show-duration) ease;

      &::backdrop {
        animation: show-backdrop var(--show-duration, 200ms) ease;
      }
    }

    &.hide {
      animation: show-dialog var(--hide-duration) ease reverse;

      &::backdrop {
        animation: show-backdrop var(--hide-duration, 200ms) ease reverse;
      }
    }

    &.pulse {
      animation: pulse 250ms ease;
    }
  }

  .dialog:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog {
      max-height: 80vh;
    }
  }

  .open {
    display: flex;
    opacity: 1;
  }

  .header {
    flex: 0 0 auto;
    display: flex;
    flex-wrap: nowrap;

    padding-inline-start: var(--spacing);
    padding-block-end: 0;

    /* Subtract the close button's padding so that the X is visually aligned with the edges of the dialog content */
    padding-inline-end: calc(var(--spacing) - var(--wa-form-control-padding-block));
    padding-block-start: calc(var(--spacing) - var(--wa-form-control-padding-block));
  }

  .title {
    align-self: center;
    flex: 1 1 auto;
    font-family: inherit;
    font-size: var(--wa-font-size-l);
    font-weight: var(--wa-font-weight-heading);
    line-height: var(--wa-line-height-condensed);
    margin: 0;
  }

  .header-actions {
    align-self: start;
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--wa-space-2xs);
    padding-inline-start: var(--spacing);
  }

  .header-actions wa-button,
  .header-actions ::slotted(wa-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .body {
    flex: 1 1 auto;
    display: block;
    padding: var(--spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  .footer {
    flex: 0 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: var(--wa-space-xs);
    justify-content: end;
    padding: var(--spacing);
    padding-block-start: 0;
  }

  .footer ::slotted(wa-button:not(:first-of-type)) {
    margin-inline-start: var(--wa-spacing-xs);
  }

  .dialog::backdrop {
    /*
      NOTE: the ::backdrop element doesn't inherit properly in Safari yet, but it will in 17.4! At that time, we can
      remove the fallback values here.
    */
    background-color: var(--wa-color-overlay-modal, rgb(0 0 0 / 0.25));
  }

  @keyframes pulse {
    0% {
      scale: 1;
    }
    50% {
      scale: 1.02;
    }
    100% {
      scale: 1;
    }
  }

  @keyframes show-dialog {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes show-backdrop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (forced-colors: active) {
    .dialog {
      border: solid 1px white;
    }
  }
`;var Lt=class extends k{constructor(){super(...arguments),this.localize=new L(this),this.hasSlotController=new N(this,"footer","header-actions","label"),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.withFooter=!1,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&ft(this)&&(t.preventDefault(),t.stopPropagation(),this.requestClose(this.dialog))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.dialog.showModal(),Le(this))}disconnectedCallback(){super.disconnectedCallback(),ze(this),this.removeOpenListeners()}async requestClose(t){let e=new ht({source:t});if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0,U(this.dialog,"pulse");return}this.removeOpenListeners(),await U(this.dialog,"hide"),this.open=!1,this.dialog.close(),ze(this);let o=this.originalTrigger;typeof o?.focus=="function"&&setTimeout(()=>o.focus()),this.dispatchEvent(new pt)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown),kt(this)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown),mt(this)}handleDialogCancel(t){t.preventDefault(),!this.dialog.classList.contains("hide")&&t.target===this.dialog&&ft(this)&&this.requestClose(this.dialog)}handleDialogClick(t){let o=t.target.closest('[data-dialog="close"]');o&&(t.stopPropagation(),this.requestClose(o))}async handleDialogPointerDown(t){t.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await U(this.dialog,"pulse"))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open&&(this.open=!0,this.requestClose(this.dialog))}async show(){let t=new dt;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),Le(this),requestAnimationFrame(()=>{let e=this.querySelector("[autofocus]");e&&typeof e.focus=="function"?e.focus():this.dialog.focus()}),await U(this.dialog,"show"),this.dispatchEvent(new ut)}render(){let t=!this.withoutHeader,e=this.hasUpdated?this.hasSlotController.test("footer"):this.withFooter;return m`
      <dialog
        part="dialog"
        class=${C({dialog:!0,open:this.open})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${t?m`
              <header part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length>0?this.label:"\u200B"} </slot>
                </h2>
                <div part="header-actions" class="header-actions">
                  <slot name="header-actions"></slot>
                  <wa-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="close"
                    appearance="plain"
                    @click="${o=>this.requestClose(o.target)}"
                  >
                    <wa-icon
                      name="xmark"
                      label=${this.localize.term("close")}
                      library="system"
                      variant="solid"
                    ></wa-icon>
                  </wa-button>
                </div>
              </header>
            `:""}

        <div part="body" class="body"><slot></slot></div>

        ${e?m`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:""}
      </dialog>
    `}};Lt.css=_i;i([g(".dialog")],Lt.prototype,"dialog",2);i([s({type:Boolean,reflect:!0})],Lt.prototype,"open",2);i([s({reflect:!0})],Lt.prototype,"label",2);i([s({attribute:"without-header",type:Boolean,reflect:!0})],Lt.prototype,"withoutHeader",2);i([s({attribute:"light-dismiss",type:Boolean})],Lt.prototype,"lightDismiss",2);i([s({attribute:"with-footer",type:Boolean})],Lt.prototype,"withFooter",2);i([S("open",{waitUntilFirstUpdate:!0})],Lt.prototype,"handleOpenChange",1);Lt=i([w("wa-dialog")],Lt);document.addEventListener("click",t=>{let e=t.target.closest("[data-dialog]");if(e instanceof Element){let[o,r]=go(e.getAttribute("data-dialog")||"");if(o==="open"&&r?.length){let n=e.getRootNode().getElementById(r);n?.localName==="wa-dialog"?n.open=!0:console.warn(`A dialog with an ID of "${r}" could not be found in this document.`)}}}),document.addEventListener("pointerdown",()=>{});var $i=v`
  :host {
    --color: var(--wa-color-surface-border);
    --width: var(--wa-border-width-s);
    --spacing: var(--wa-space-m);
  }

  :host(:not([orientation='vertical'])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([orientation='vertical']) {
    display: inline-block;
    height: 100%;
    border-inline-start: solid var(--width) var(--color);
    margin: 0 var(--spacing);
    min-block-size: 1lh;
  }
`;var Ie=class extends k{constructor(){super(...arguments),this.orientation="horizontal"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.orientation)}};Ie.css=$i;i([s({reflect:!0})],Ie.prototype,"orientation",2);i([S("orientation")],Ie.prototype,"handleVerticalChange",1);Ie=i([w("wa-divider")],Ie);var Oi=class extends Event{constructor(t){super("wa-select",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}};var Li=v`
  :host {
    --show-duration: 50ms;
    --hide-duration: 50ms;
    display: contents;
  }

  #menu {
    display: flex;
    flex-direction: column;
    width: max-content;
    margin: 0;
    padding: 0.25em;
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    background-color: var(--wa-color-surface-raised);
    box-shadow: var(--wa-shadow-m);
    color: var(--wa-color-text-normal);
    text-align: start;
    user-select: none;
    overflow: auto;
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;

    &.show {
      animation: show var(--show-duration) ease;
    }

    &.hide {
      animation: show var(--hide-duration) ease reverse;
    }

    ::slotted(h1),
    ::slotted(h2),
    ::slotted(h3),
    ::slotted(h4),
    ::slotted(h5),
    ::slotted(h6) {
      display: block !important;
      margin: 0.25em 0 !important;
      padding: 0.25em 0.75em !important;
      color: var(--wa-color-text-quiet);
      font-family: var(--wa-font-family-body) !important;
      font-weight: var(--wa-font-weight-semibold) !important;
      font-size: var(--wa-font-size-smaller) !important;
    }

    ::slotted(wa-divider) {
      --spacing: 0.25em; /* Component-specific, left as-is */
    }
  }

  wa-popup[data-current-placement^='top'] #menu {
    transform-origin: bottom;
  }

  wa-popup[data-current-placement^='bottom'] #menu {
    transform-origin: top;
  }

  wa-popup[data-current-placement^='left'] #menu {
    transform-origin: right;
  }

  wa-popup[data-current-placement^='right'] #menu {
    transform-origin: left;
  }

  wa-popup[data-current-placement='left-start'] #menu {
    transform-origin: right top;
  }

  wa-popup[data-current-placement='left-end'] #menu {
    transform-origin: right bottom;
  }

  wa-popup[data-current-placement='right-start'] #menu {
    transform-origin: left top;
  }

  wa-popup[data-current-placement='right-end'] #menu {
    transform-origin: left bottom;
  }

  @keyframes show {
    from {
      scale: 0.9;
      opacity: 0;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }
`;var zi="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";var Di=(t=21)=>{let e="",o=crypto.getRandomValues(new Uint8Array(t|=0));for(;t--;)e+=zi[o[t]&63];return e};function yt(t,e,o){let r=a=>Object.is(a,-0)?0:a;return t<e?r(e):t>o?r(o):r(t)}function Ve(t=""){return`${t}${Di()}`}var qt=Math.min,nt=Math.max,Qe=Math.round,Ze=Math.floor,zt=t=>({x:t,y:t}),ms={left:"right",right:"left",bottom:"top",top:"bottom"};function $o(t,e,o){return nt(t,qt(e,o))}function we(t,e){return typeof t=="function"?t(e):t}function Gt(t){return t.split("-")[0]}function ye(t){return t.split("-")[1]}function fr(t){return t==="x"?"y":"x"}function Oo(t){return t==="y"?"height":"width"}function Ht(t){let e=t[0];return e==="t"||e==="b"?"y":"x"}function Lo(t){return fr(Ht(t))}function Ii(t,e,o){o===void 0&&(o=!1);let r=ye(t),a=Lo(t),n=Oo(a),l=a==="x"?r===(o?"end":"start")?"right":"left":r==="start"?"bottom":"top";return e.reference[n]>e.floating[n]&&(l=Ge(l)),[l,Ge(l)]}function Vi(t){let e=Ge(t);return[_o(t),e,_o(e)]}function _o(t){return t.includes("start")?t.replace("start","end"):t.replace("end","start")}var Ti=["left","right"],Ri=["right","left"],fs=["top","bottom"],bs=["bottom","top"];function gs(t,e,o){switch(t){case"top":case"bottom":return o?e?Ri:Ti:e?Ti:Ri;case"left":case"right":return e?fs:bs;default:return[]}}function Mi(t,e,o,r){let a=ye(t),n=gs(Gt(t),o==="start",r);return a&&(n=n.map(l=>l+"-"+a),e&&(n=n.concat(n.map(_o)))),n}function Ge(t){let e=Gt(t);return ms[e]+t.slice(e.length)}function vs(t){return{top:0,right:0,bottom:0,left:0,...t}}function br(t){return typeof t!="number"?vs(t):{top:t,right:t,bottom:t,left:t}}function xe(t){let{x:e,y:o,width:r,height:a}=t;return{width:r,height:a,top:o,left:e,right:e+r,bottom:o+a,x:e,y:o}}function Bi(t,e,o){let{reference:r,floating:a}=t,n=Ht(e),l=Lo(e),c=Oo(l),d=Gt(e),p=n==="y",h=r.x+r.width/2-a.width/2,u=r.y+r.height/2-a.height/2,f=r[c]/2-a[c]/2,b;switch(d){case"top":b={x:h,y:r.y-a.height};break;case"bottom":b={x:h,y:r.y+r.height};break;case"right":b={x:r.x+r.width,y:u};break;case"left":b={x:r.x-a.width,y:u};break;default:b={x:r.x,y:r.y}}switch(ye(e)){case"start":b[l]-=f*(o&&p?-1:1);break;case"end":b[l]+=f*(o&&p?-1:1);break}return b}async function Pi(t,e){var o;e===void 0&&(e={});let{x:r,y:a,platform:n,rects:l,elements:c,strategy:d}=t,{boundary:p="clippingAncestors",rootBoundary:h="viewport",elementContext:u="floating",altBoundary:f=!1,padding:b=0}=we(e,t),y=br(b),M=c[f?u==="floating"?"reference":"floating":u],z=xe(await n.getClippingRect({element:(o=await(n.isElement==null?void 0:n.isElement(M)))==null||o?M:M.contextElement||await(n.getDocumentElement==null?void 0:n.getDocumentElement(c.floating)),boundary:p,rootBoundary:h,strategy:d})),F=u==="floating"?{x:r,y:a,width:l.floating.width,height:l.floating.height}:l.reference,H=await(n.getOffsetParent==null?void 0:n.getOffsetParent(c.floating)),j=await(n.isElement==null?void 0:n.isElement(H))?await(n.getScale==null?void 0:n.getScale(H))||{x:1,y:1}:{x:1,y:1},ot=xe(n.convertOffsetParentRelativeRectToViewportRelativeRect?await n.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:F,offsetParent:H,strategy:d}):F);return{top:(z.top-ot.top+y.top)/j.y,bottom:(ot.bottom-z.bottom+y.bottom)/j.y,left:(z.left-ot.left+y.left)/j.x,right:(ot.right-z.right+y.right)/j.x}}var ws=50,Fi=async(t,e,o)=>{let{placement:r="bottom",strategy:a="absolute",middleware:n=[],platform:l}=o,c=l.detectOverflow?l:{...l,detectOverflow:Pi},d=await(l.isRTL==null?void 0:l.isRTL(e)),p=await l.getElementRects({reference:t,floating:e,strategy:a}),{x:h,y:u}=Bi(p,r,d),f=r,b=0,y={};for(let E=0;E<n.length;E++){let M=n[E];if(!M)continue;let{name:z,fn:F}=M,{x:H,y:j,data:ot,reset:G}=await F({x:h,y:u,initialPlacement:r,placement:f,strategy:a,middlewareData:y,rects:p,platform:c,elements:{reference:t,floating:e}});h=H??h,u=j??u,y[z]={...y[z],...ot},G&&b<ws&&(b++,typeof G=="object"&&(G.placement&&(f=G.placement),G.rects&&(p=G.rects===!0?await l.getElementRects({reference:t,floating:e,strategy:a}):G.rects),{x:h,y:u}=Bi(p,f,d)),E=-1)}return{x:h,y:u,placement:f,strategy:a,middlewareData:y}},qi=t=>({name:"arrow",options:t,async fn(e){let{x:o,y:r,placement:a,rects:n,platform:l,elements:c,middlewareData:d}=e,{element:p,padding:h=0}=we(t,e)||{};if(p==null)return{};let u=br(h),f={x:o,y:r},b=Lo(a),y=Oo(b),E=await l.getDimensions(p),M=b==="y",z=M?"top":"left",F=M?"bottom":"right",H=M?"clientHeight":"clientWidth",j=n.reference[y]+n.reference[b]-f[b]-n.floating[y],ot=f[b]-n.reference[b],G=await(l.getOffsetParent==null?void 0:l.getOffsetParent(p)),rt=G?G[H]:0;(!rt||!await(l.isElement==null?void 0:l.isElement(G)))&&(rt=c.floating[H]||n.floating[y]);let Ut=j/2-ot/2,Vt=rt/2-E[y]/2-1,Ct=qt(u[z],Vt),Jt=qt(u[F],Vt),Mt=Ct,te=rt-E[y]-Jt,st=rt/2-E[y]/2+Ut,ce=$o(Mt,st,te),jt=!d.arrow&&ye(a)!=null&&st!==ce&&n.reference[y]/2-(st<Mt?Ct:Jt)-E[y]/2<0,_t=jt?st<Mt?st-Mt:st-te:0;return{[b]:f[b]+_t,data:{[b]:ce,centerOffset:st-ce-_t,...jt&&{alignmentOffset:_t}},reset:jt}}});var Hi=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var o,r;let{placement:a,middlewareData:n,rects:l,initialPlacement:c,platform:d,elements:p}=e,{mainAxis:h=!0,crossAxis:u=!0,fallbackPlacements:f,fallbackStrategy:b="bestFit",fallbackAxisSideDirection:y="none",flipAlignment:E=!0,...M}=we(t,e);if((o=n.arrow)!=null&&o.alignmentOffset)return{};let z=Gt(a),F=Ht(c),H=Gt(c)===c,j=await(d.isRTL==null?void 0:d.isRTL(p.floating)),ot=f||(H||!E?[Ge(c)]:Vi(c)),G=y!=="none";!f&&G&&ot.push(...Mi(c,E,y,j));let rt=[c,...ot],Ut=await d.detectOverflow(e,M),Vt=[],Ct=((r=n.flip)==null?void 0:r.overflows)||[];if(h&&Vt.push(Ut[z]),u){let st=Ii(a,l,j);Vt.push(Ut[st[0]],Ut[st[1]])}if(Ct=[...Ct,{placement:a,overflows:Vt}],!Vt.every(st=>st<=0)){var Jt,Mt;let st=(((Jt=n.flip)==null?void 0:Jt.index)||0)+1,ce=rt[st];if(ce&&(!(u==="alignment"?F!==Ht(ce):!1)||Ct.every($t=>Ht($t.placement)===F?$t.overflows[0]>0:!0)))return{data:{index:st,overflows:Ct},reset:{placement:ce}};let jt=(Mt=Ct.filter(_t=>_t.overflows[0]<=0).sort((_t,$t)=>_t.overflows[1]-$t.overflows[1])[0])==null?void 0:Mt.placement;if(!jt)switch(b){case"bestFit":{var te;let _t=(te=Ct.filter($t=>{if(G){let ee=Ht($t.placement);return ee===F||ee==="y"}return!0}).map($t=>[$t.placement,$t.overflows.filter(ee=>ee>0).reduce((ee,Va)=>ee+Va,0)]).sort(($t,ee)=>$t[1]-ee[1])[0])==null?void 0:te[0];_t&&(jt=_t);break}case"initialPlacement":jt=c;break}if(a!==jt)return{reset:{placement:jt}}}return{}}}};var ys=new Set(["left","top"]);async function xs(t,e){let{placement:o,platform:r,elements:a}=t,n=await(r.isRTL==null?void 0:r.isRTL(a.floating)),l=Gt(o),c=ye(o),d=Ht(o)==="y",p=ys.has(l)?-1:1,h=n&&d?-1:1,u=we(e,t),{mainAxis:f,crossAxis:b,alignmentAxis:y}=typeof u=="number"?{mainAxis:u,crossAxis:0,alignmentAxis:null}:{mainAxis:u.mainAxis||0,crossAxis:u.crossAxis||0,alignmentAxis:u.alignmentAxis};return c&&typeof y=="number"&&(b=c==="end"?y*-1:y),d?{x:b*h,y:f*p}:{x:f*p,y:b*h}}var Ni=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var o,r;let{x:a,y:n,placement:l,middlewareData:c}=e,d=await xs(e,t);return l===((o=c.offset)==null?void 0:o.placement)&&(r=c.arrow)!=null&&r.alignmentOffset?{}:{x:a+d.x,y:n+d.y,data:{...d,placement:l}}}}},Wi=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){let{x:o,y:r,placement:a,platform:n}=e,{mainAxis:l=!0,crossAxis:c=!1,limiter:d={fn:z=>{let{x:F,y:H}=z;return{x:F,y:H}}},...p}=we(t,e),h={x:o,y:r},u=await n.detectOverflow(e,p),f=Ht(Gt(a)),b=fr(f),y=h[b],E=h[f];if(l){let z=b==="y"?"top":"left",F=b==="y"?"bottom":"right",H=y+u[z],j=y-u[F];y=$o(H,y,j)}if(c){let z=f==="y"?"top":"left",F=f==="y"?"bottom":"right",H=E+u[z],j=E-u[F];E=$o(H,E,j)}let M=d.fn({...e,[b]:y,[f]:E});return{...M,data:{x:M.x-o,y:M.y-r,enabled:{[b]:l,[f]:c}}}}}};var Ui=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var o,r;let{placement:a,rects:n,platform:l,elements:c}=e,{apply:d=()=>{},...p}=we(t,e),h=await l.detectOverflow(e,p),u=Gt(a),f=ye(a),b=Ht(a)==="y",{width:y,height:E}=n.floating,M,z;u==="top"||u==="bottom"?(M=u,z=f===(await(l.isRTL==null?void 0:l.isRTL(c.floating))?"start":"end")?"left":"right"):(z=u,M=f==="end"?"top":"bottom");let F=E-h.top-h.bottom,H=y-h.left-h.right,j=qt(E-h[M],F),ot=qt(y-h[z],H),G=!e.middlewareData.shift,rt=j,Ut=ot;if((o=e.middlewareData.shift)!=null&&o.enabled.x&&(Ut=H),(r=e.middlewareData.shift)!=null&&r.enabled.y&&(rt=F),G&&!f){let Ct=nt(h.left,0),Jt=nt(h.right,0),Mt=nt(h.top,0),te=nt(h.bottom,0);b?Ut=y-2*(Ct!==0||Jt!==0?Ct+Jt:nt(h.left,h.right)):rt=E-2*(Mt!==0||te!==0?Mt+te:nt(h.top,h.bottom))}await d({...e,availableWidth:Ut,availableHeight:rt});let Vt=await l.getDimensions(c.floating);return y!==Vt.width||E!==Vt.height?{reset:{rects:!0}}:{}}}};function zo(){return typeof window<"u"}function ke(t){return Yi(t)?(t.nodeName||"").toLowerCase():"#document"}function bt(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function Dt(t){var e;return(e=(Yi(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Yi(t){return zo()?t instanceof Node||t instanceof bt(t).Node:!1}function Et(t){return zo()?t instanceof Element||t instanceof bt(t).Element:!1}function Nt(t){return zo()?t instanceof HTMLElement||t instanceof bt(t).HTMLElement:!1}function ji(t){return!zo()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof bt(t).ShadowRoot}function Me(t){let{overflow:e,overflowX:o,overflowY:r,display:a}=At(t);return/auto|scroll|overlay|hidden|clip/.test(e+r+o)&&a!=="inline"&&a!=="contents"}function Ki(t){return/^(table|td|th)$/.test(ke(t))}function Je(t){try{if(t.matches(":popover-open"))return!0}catch{}try{return t.matches(":modal")}catch{return!1}}var Cs=/transform|translate|scale|rotate|perspective|filter/,ks=/paint|layout|strict|content/,Ce=t=>!!t&&t!=="none",gr;function Be(t){let e=Et(t)?At(t):t;return Ce(e.transform)||Ce(e.translate)||Ce(e.scale)||Ce(e.rotate)||Ce(e.perspective)||!Do()&&(Ce(e.backdropFilter)||Ce(e.filter))||Cs.test(e.willChange||"")||ks.test(e.contain||"")}function Xi(t){let e=Qt(t);for(;Nt(e)&&!Se(e);){if(Be(e))return e;if(Je(e))return null;e=Qt(e)}return null}function Do(){return gr==null&&(gr=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),gr}function Se(t){return/^(html|body|#document)$/.test(ke(t))}function At(t){return bt(t).getComputedStyle(t)}function to(t){return Et(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function Qt(t){if(ke(t)==="html")return t;let e=t.assignedSlot||t.parentNode||ji(t)&&t.host||Dt(t);return ji(e)?e.host:e}function Gi(t){let e=Qt(t);return Se(e)?t.ownerDocument?t.ownerDocument.body:t.body:Nt(e)&&Me(e)?e:Gi(e)}function Zt(t,e,o){var r;e===void 0&&(e=[]),o===void 0&&(o=!0);let a=Gi(t),n=a===((r=t.ownerDocument)==null?void 0:r.body),l=bt(a);if(n){let c=To(l);return e.concat(l,l.visualViewport||[],Me(a)?a:[],c&&o?Zt(c):[])}else return e.concat(a,Zt(a,[],o))}function To(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function ta(t){let e=At(t),o=parseFloat(e.width)||0,r=parseFloat(e.height)||0,a=Nt(t),n=a?t.offsetWidth:o,l=a?t.offsetHeight:r,c=Qe(o)!==n||Qe(r)!==l;return c&&(o=n,r=l),{width:o,height:r,$:c}}function wr(t){return Et(t)?t:t.contextElement}function Pe(t){let e=wr(t);if(!Nt(e))return zt(1);let o=e.getBoundingClientRect(),{width:r,height:a,$:n}=ta(e),l=(n?Qe(o.width):o.width)/r,c=(n?Qe(o.height):o.height)/a;return(!l||!Number.isFinite(l))&&(l=1),(!c||!Number.isFinite(c))&&(c=1),{x:l,y:c}}var Ss=zt(0);function ea(t){let e=bt(t);return!Do()||!e.visualViewport?Ss:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Es(t,e,o){return e===void 0&&(e=!1),!o||e&&o!==bt(t)?!1:e}function Ee(t,e,o,r){e===void 0&&(e=!1),o===void 0&&(o=!1);let a=t.getBoundingClientRect(),n=wr(t),l=zt(1);e&&(r?Et(r)&&(l=Pe(r)):l=Pe(t));let c=Es(n,o,r)?ea(n):zt(0),d=(a.left+c.x)/l.x,p=(a.top+c.y)/l.y,h=a.width/l.x,u=a.height/l.y;if(n){let f=bt(n),b=r&&Et(r)?bt(r):r,y=f,E=To(y);for(;E&&r&&b!==y;){let M=Pe(E),z=E.getBoundingClientRect(),F=At(E),H=z.left+(E.clientLeft+parseFloat(F.paddingLeft))*M.x,j=z.top+(E.clientTop+parseFloat(F.paddingTop))*M.y;d*=M.x,p*=M.y,h*=M.x,u*=M.y,d+=H,p+=j,y=bt(E),E=To(y)}}return xe({width:h,height:u,x:d,y:p})}function Ro(t,e){let o=to(t).scrollLeft;return e?e.left+o:Ee(Dt(t)).left+o}function oa(t,e){let o=t.getBoundingClientRect(),r=o.left+e.scrollLeft-Ro(t,o),a=o.top+e.scrollTop;return{x:r,y:a}}function As(t){let{elements:e,rect:o,offsetParent:r,strategy:a}=t,n=a==="fixed",l=Dt(r),c=e?Je(e.floating):!1;if(r===l||c&&n)return o;let d={scrollLeft:0,scrollTop:0},p=zt(1),h=zt(0),u=Nt(r);if((u||!u&&!n)&&((ke(r)!=="body"||Me(l))&&(d=to(r)),u)){let b=Ee(r);p=Pe(r),h.x=b.x+r.clientLeft,h.y=b.y+r.clientTop}let f=l&&!u&&!n?oa(l,d):zt(0);return{width:o.width*p.x,height:o.height*p.y,x:o.x*p.x-d.scrollLeft*p.x+h.x+f.x,y:o.y*p.y-d.scrollTop*p.y+h.y+f.y}}function _s(t){return Array.from(t.getClientRects())}function $s(t){let e=Dt(t),o=to(t),r=t.ownerDocument.body,a=nt(e.scrollWidth,e.clientWidth,r.scrollWidth,r.clientWidth),n=nt(e.scrollHeight,e.clientHeight,r.scrollHeight,r.clientHeight),l=-o.scrollLeft+Ro(t),c=-o.scrollTop;return At(r).direction==="rtl"&&(l+=nt(e.clientWidth,r.clientWidth)-a),{width:a,height:n,x:l,y:c}}var Qi=25;function Os(t,e){let o=bt(t),r=Dt(t),a=o.visualViewport,n=r.clientWidth,l=r.clientHeight,c=0,d=0;if(a){n=a.width,l=a.height;let h=Do();(!h||h&&e==="fixed")&&(c=a.offsetLeft,d=a.offsetTop)}let p=Ro(r);if(p<=0){let h=r.ownerDocument,u=h.body,f=getComputedStyle(u),b=h.compatMode==="CSS1Compat"&&parseFloat(f.marginLeft)+parseFloat(f.marginRight)||0,y=Math.abs(r.clientWidth-u.clientWidth-b);y<=Qi&&(n-=y)}else p<=Qi&&(n+=p);return{width:n,height:l,x:c,y:d}}function Ls(t,e){let o=Ee(t,!0,e==="fixed"),r=o.top+t.clientTop,a=o.left+t.clientLeft,n=Nt(t)?Pe(t):zt(1),l=t.clientWidth*n.x,c=t.clientHeight*n.y,d=a*n.x,p=r*n.y;return{width:l,height:c,x:d,y:p}}function Zi(t,e,o){let r;if(e==="viewport")r=Os(t,o);else if(e==="document")r=$s(Dt(t));else if(Et(e))r=Ls(e,o);else{let a=ea(t);r={x:e.x-a.x,y:e.y-a.y,width:e.width,height:e.height}}return xe(r)}function ra(t,e){let o=Qt(t);return o===e||!Et(o)||Se(o)?!1:At(o).position==="fixed"||ra(o,e)}function zs(t,e){let o=e.get(t);if(o)return o;let r=Zt(t,[],!1).filter(c=>Et(c)&&ke(c)!=="body"),a=null,n=At(t).position==="fixed",l=n?Qt(t):t;for(;Et(l)&&!Se(l);){let c=At(l),d=Be(l);!d&&c.position==="fixed"&&(a=null),(n?!d&&!a:!d&&c.position==="static"&&!!a&&(a.position==="absolute"||a.position==="fixed")||Me(l)&&!d&&ra(t,l))?r=r.filter(h=>h!==l):a=c,l=Qt(l)}return e.set(t,r),r}function Ds(t){let{element:e,boundary:o,rootBoundary:r,strategy:a}=t,l=[...o==="clippingAncestors"?Je(e)?[]:zs(e,this._c):[].concat(o),r],c=Zi(e,l[0],a),d=c.top,p=c.right,h=c.bottom,u=c.left;for(let f=1;f<l.length;f++){let b=Zi(e,l[f],a);d=nt(b.top,d),p=qt(b.right,p),h=qt(b.bottom,h),u=nt(b.left,u)}return{width:p-u,height:h-d,x:u,y:d}}function Ts(t){let{width:e,height:o}=ta(t);return{width:e,height:o}}function Rs(t,e,o){let r=Nt(e),a=Dt(e),n=o==="fixed",l=Ee(t,!0,n,e),c={scrollLeft:0,scrollTop:0},d=zt(0);function p(){d.x=Ro(a)}if(r||!r&&!n)if((ke(e)!=="body"||Me(a))&&(c=to(e)),r){let b=Ee(e,!0,n,e);d.x=b.x+e.clientLeft,d.y=b.y+e.clientTop}else a&&p();n&&!r&&a&&p();let h=a&&!r&&!n?oa(a,c):zt(0),u=l.left+c.scrollLeft-d.x-h.x,f=l.top+c.scrollTop-d.y-h.y;return{x:u,y:f,width:l.width,height:l.height}}function vr(t){return At(t).position==="static"}function Ji(t,e){if(!Nt(t)||At(t).position==="fixed")return null;if(e)return e(t);let o=t.offsetParent;return Dt(t)===o&&(o=o.ownerDocument.body),o}function ia(t,e){let o=bt(t);if(Je(t))return o;if(!Nt(t)){let a=Qt(t);for(;a&&!Se(a);){if(Et(a)&&!vr(a))return a;a=Qt(a)}return o}let r=Ji(t,e);for(;r&&Ki(r)&&vr(r);)r=Ji(r,e);return r&&Se(r)&&vr(r)&&!Be(r)?o:r||Xi(t)||o}var Is=async function(t){let e=this.getOffsetParent||ia,o=this.getDimensions,r=await o(t.floating);return{reference:Rs(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function Vs(t){return At(t).direction==="rtl"}var eo={convertOffsetParentRelativeRectToViewportRelativeRect:As,getDocumentElement:Dt,getClippingRect:Ds,getOffsetParent:ia,getElementRects:Is,getClientRects:_s,getDimensions:Ts,getScale:Pe,isElement:Et,isRTL:Vs};function aa(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function Ms(t,e){let o=null,r,a=Dt(t);function n(){var c;clearTimeout(r),(c=o)==null||c.disconnect(),o=null}function l(c,d){c===void 0&&(c=!1),d===void 0&&(d=1),n();let p=t.getBoundingClientRect(),{left:h,top:u,width:f,height:b}=p;if(c||e(),!f||!b)return;let y=Ze(u),E=Ze(a.clientWidth-(h+f)),M=Ze(a.clientHeight-(u+b)),z=Ze(h),H={rootMargin:-y+"px "+-E+"px "+-M+"px "+-z+"px",threshold:nt(0,qt(1,d))||1},j=!0;function ot(G){let rt=G[0].intersectionRatio;if(rt!==d){if(!j)return l();rt?l(!1,rt):r=setTimeout(()=>{l(!1,1e-7)},1e3)}rt===1&&!aa(p,t.getBoundingClientRect())&&l(),j=!1}try{o=new IntersectionObserver(ot,{...H,root:a.ownerDocument})}catch{o=new IntersectionObserver(ot,H)}o.observe(t)}return l(!0),n}function Io(t,e,o,r){r===void 0&&(r={});let{ancestorScroll:a=!0,ancestorResize:n=!0,elementResize:l=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:d=!1}=r,p=wr(t),h=a||n?[...p?Zt(p):[],...e?Zt(e):[]]:[];h.forEach(z=>{a&&z.addEventListener("scroll",o,{passive:!0}),n&&z.addEventListener("resize",o)});let u=p&&c?Ms(p,o):null,f=-1,b=null;l&&(b=new ResizeObserver(z=>{let[F]=z;F&&F.target===p&&b&&e&&(b.unobserve(e),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var H;(H=b)==null||H.observe(e)})),o()}),p&&!d&&b.observe(p),e&&b.observe(e));let y,E=d?Ee(t):null;d&&M();function M(){let z=Ee(t);E&&!aa(E,z)&&o(),E=z,y=requestAnimationFrame(M)}return o(),()=>{var z;h.forEach(F=>{a&&F.removeEventListener("scroll",o),n&&F.removeEventListener("resize",o)}),u?.(),(z=b)==null||z.disconnect(),b=null,d&&cancelAnimationFrame(y)}}var Vo=Ni;var Mo=Wi,Bo=Hi,yr=Ui;var sa=qi;var Po=(t,e,o)=>{let r=new Map,a={platform:eo,...o},n={...a.platform,_c:r};return Fi(t,e,{...a,platform:n})};function*na(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*na(t.shadowRoot.activeElement)))}var xr=new Set,lt=class extends k{constructor(){super(...arguments),this.submenuCleanups=new Map,this.localize=new L(this),this.userTypedQuery="",this.openSubmenuStack=[],this.open=!1,this.size="medium",this.placement="bottom-start",this.distance=0,this.skidding=0,this.handleDocumentKeyDown=async t=>{let e=this.localize.dir()==="rtl";if(t.key==="Escape"&&this.open&&ft(this)){let h=this.getTrigger();t.preventDefault(),t.stopPropagation(),this.open=!1,h?.focus({preventScroll:!0});return}let o=[...na()].find(h=>h.localName==="wa-dropdown-item"),r=o?.localName==="wa-dropdown-item",a=this.getCurrentSubmenuItem(),n=!!a,l,c,d;n?(l=this.getSubmenuItems(a),c=l.find(h=>h.active||h===o),d=c?l.indexOf(c):-1):(l=this.getItems(),c=l.find(h=>h.active||h===o),d=c?l.indexOf(c):-1);let p;if(t.key==="ArrowUp"&&(t.preventDefault(),t.stopPropagation(),d>0?p=l[d-1]:p=l[l.length-1]),t.key==="ArrowDown"&&(t.preventDefault(),t.stopPropagation(),d!==-1&&d<l.length-1?p=l[d+1]:p=l[0]),t.key===(e?"ArrowLeft":"ArrowRight")&&r&&c&&c.hasSubmenu){t.preventDefault(),t.stopPropagation(),c.submenuOpen=!0,this.addToSubmenuStack(c),setTimeout(()=>{let h=this.getSubmenuItems(c);h.length>0&&(h.forEach((u,f)=>u.active=f===0),h[0].focus({preventScroll:!0}))},0);return}if(t.key===(e?"ArrowRight":"ArrowLeft")&&n){t.preventDefault(),t.stopPropagation();let h=this.removeFromSubmenuStack();h&&(h.submenuOpen=!1,setTimeout(()=>{h.focus({preventScroll:!0}),h.active=!0,(h.slot==="submenu"?this.getSubmenuItems(h.parentElement):this.getItems()).forEach(f=>{f!==h&&(f.active=!1)})},0));return}if((t.key==="Home"||t.key==="End")&&(t.preventDefault(),t.stopPropagation(),p=t.key==="Home"?l[0]:l[l.length-1]),t.key==="Tab"&&await this.hideMenu(),t.key.length===1&&!(t.metaKey||t.ctrlKey||t.altKey)&&!(t.key===" "&&this.userTypedQuery==="")&&(clearTimeout(this.userTypedTimeout),this.userTypedTimeout=setTimeout(()=>{this.userTypedQuery=""},1e3),this.userTypedQuery+=t.key,l.some(h=>{let u=(h.textContent||"").trim().toLowerCase(),f=this.userTypedQuery.trim().toLowerCase();return u.startsWith(f)?(p=h,!0):!1})),p){t.preventDefault(),t.stopPropagation(),l.forEach(h=>h.active=h===p),p.focus({preventScroll:!0});return}(t.key==="Enter"||t.key===" "&&this.userTypedQuery==="")&&r&&c&&(t.preventDefault(),t.stopPropagation(),c.hasSubmenu?(c.submenuOpen=!0,this.addToSubmenuStack(c),setTimeout(()=>{let h=this.getSubmenuItems(c);h.length>0&&(h.forEach((u,f)=>u.active=f===0),h[0].focus({preventScroll:!0}))},0)):this.makeSelection(c))},this.handleDocumentPointerDown=t=>{t.composedPath().some(r=>r instanceof HTMLElement?r===this||r.closest('wa-dropdown, [part="submenu"]'):!1)||(this.open=!1)},this.handleGlobalMouseMove=t=>{let e=this.getCurrentSubmenuItem();if(!e?.submenuOpen||!e.submenuElement)return;let o=e.submenuElement.getBoundingClientRect(),r=this.localize.dir()==="rtl",a=r?o.right:o.left,n=r?Math.max(t.clientX,a):Math.min(t.clientX,a),l=Math.max(o.top,Math.min(t.clientY,o.bottom));e.submenuElement.style.setProperty("--safe-triangle-cursor-x",`${n}px`),e.submenuElement.style.setProperty("--safe-triangle-cursor-y",`${l}px`);let c=t.composedPath(),d=e.matches(":hover"),p=!!e.submenuElement?.matches(":hover"),h=d||!!c.find(f=>f===e),u=p||!!c.find(f=>f instanceof HTMLElement&&f.closest('[part="submenu"]')===e.submenuElement);!h&&!u&&setTimeout(()=>{!d&&!p&&(e.submenuOpen=!1)},100)}}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.userTypedTimeout),this.closeAllSubmenus(),this.submenuCleanups.forEach(t=>t()),this.submenuCleanups.clear(),document.removeEventListener("mousemove",this.handleGlobalMouseMove),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("pointerdown",this.handleDocumentPointerDown),mt(this)}firstUpdated(){this.syncAriaAttributes()}async updated(t){if(t.has("open")){let e=t.get("open");if(e===this.open||e===void 0&&this.open===!1)return;this.customStates.set("open",this.open),this.open?await this.showMenu():(this.closeAllSubmenus(),await this.hideMenu())}t.has("size")&&this.syncItemSizes()}getItems(t=!1){let e=(this.defaultSlot?.assignedElements({flatten:!0})??[]).filter(o=>o.localName==="wa-dropdown-item");return t?e:e.filter(o=>!o.disabled)}getSubmenuItems(t,e=!1){let o=t.shadowRoot?.querySelector('slot[name="submenu"]')||t.querySelector('slot[name="submenu"]');if(!o)return[];let r=o.assignedElements({flatten:!0}).filter(a=>a.localName==="wa-dropdown-item");return e?r:r.filter(a=>!a.disabled)}syncItemSizes(){(this.defaultSlot?.assignedElements({flatten:!0})??[]).filter(e=>e.localName==="wa-dropdown-item").forEach(e=>e.size=this.size)}addToSubmenuStack(t){let e=this.openSubmenuStack.indexOf(t);e!==-1?this.openSubmenuStack=this.openSubmenuStack.slice(0,e+1):this.openSubmenuStack.push(t)}removeFromSubmenuStack(){return this.openSubmenuStack.pop()}getCurrentSubmenuItem(){return this.openSubmenuStack.length>0?this.openSubmenuStack[this.openSubmenuStack.length-1]:void 0}closeAllSubmenus(){this.getItems(!0).forEach(e=>{e.submenuOpen=!1}),this.openSubmenuStack=[]}closeSiblingSubmenus(t){let e=t.closest('wa-dropdown-item:not([slot="submenu"])'),o;e?o=this.getSubmenuItems(e,!0):o=this.getItems(!0),o.forEach(r=>{r!==t&&r.submenuOpen&&(r.submenuOpen=!1)}),this.openSubmenuStack.includes(t)||this.openSubmenuStack.push(t)}getTrigger(){return this.querySelector('[slot="trigger"]')}async showMenu(){if(!this.getTrigger()||!this.popup||!this.menu)return;let e=new dt;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}if(this.popup.active)return;xr.forEach(r=>r.open=!1),this.popup.active=!0,this.open=!0,xr.add(this),kt(this),this.syncAriaAttributes(),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("pointerdown",this.handleDocumentPointerDown),document.addEventListener("mousemove",this.handleGlobalMouseMove),this.menu.classList.remove("hide"),await U(this.menu,"show");let o=this.getItems();o.length>0&&(o.forEach((r,a)=>r.active=a===0),o[0].focus({preventScroll:!0})),this.dispatchEvent(new ut)}async hideMenu(){if(!this.popup||!this.menu)return;let t=new ht({source:this});if(this.dispatchEvent(t),t.defaultPrevented){this.open=!0;return}this.open=!1,xr.delete(this),mt(this),this.syncAriaAttributes(),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("pointerdown",this.handleDocumentPointerDown),document.removeEventListener("mousemove",this.handleGlobalMouseMove),this.menu.classList.remove("show"),await U(this.menu,"hide"),this.popup.active=this.open,this.dispatchEvent(new pt)}handleMenuClick(t){let e=t.target.closest("wa-dropdown-item");if(!(!e||e.disabled)){if(e.hasSubmenu){e.submenuOpen||(this.closeSiblingSubmenus(e),this.addToSubmenuStack(e),e.submenuOpen=!0),t.stopPropagation();return}this.makeSelection(e)}}async handleMenuSlotChange(){let t=this.getItems(!0);await Promise.all(t.map(r=>r.updateComplete)),this.syncItemSizes();let e=t.some(r=>r.type==="checkbox"),o=t.some(r=>r.hasSubmenu);t.forEach((r,a)=>{r.active=a===0,r.checkboxAdjacent=e,r.submenuAdjacent=o})}handleTriggerClick(){this.open=!this.open}handleSubmenuOpening(t){let e=t.detail.item;this.closeSiblingSubmenus(e),this.addToSubmenuStack(e),this.setupSubmenuPosition(e),this.processSubmenuItems(e)}setupSubmenuPosition(t){if(!t.submenuElement)return;this.cleanupSubmenuPosition(t);let e=Io(t,t.submenuElement,()=>{this.positionSubmenu(t),this.updateSafeTriangleCoordinates(t)});this.submenuCleanups.set(t,e);let o=t.submenuElement.querySelector('slot[name="submenu"]');o&&(o.removeEventListener("slotchange",lt.handleSubmenuSlotChange),o.addEventListener("slotchange",lt.handleSubmenuSlotChange),lt.handleSubmenuSlotChange({target:o}))}static handleSubmenuSlotChange(t){let e=t.target;if(!e)return;let o=e.assignedElements().filter(n=>n.localName==="wa-dropdown-item");if(o.length===0)return;let r=o.some(n=>n.hasSubmenu),a=o.some(n=>n.type==="checkbox");o.forEach(n=>{n.submenuAdjacent=r,n.checkboxAdjacent=a})}processSubmenuItems(t){if(!t.submenuElement)return;let e=this.getSubmenuItems(t,!0),o=e.some(r=>r.hasSubmenu);e.forEach(r=>{r.submenuAdjacent=o})}cleanupSubmenuPosition(t){let e=this.submenuCleanups.get(t);e&&(e(),this.submenuCleanups.delete(t))}positionSubmenu(t){if(!t.submenuElement)return;let o=this.localize.dir()==="rtl"?"left-start":"right-start";Po(t,t.submenuElement,{placement:o,middleware:[Vo({mainAxis:0,crossAxis:-5}),Bo({fallbackStrategy:"bestFit"}),Mo({padding:8})]}).then(({x:r,y:a,placement:n})=>{t.submenuElement.setAttribute("data-placement",n),Object.assign(t.submenuElement.style,{left:`${r}px`,top:`${a}px`})})}updateSafeTriangleCoordinates(t){if(!t.submenuElement||!t.submenuOpen)return;if(document.activeElement?.matches(":focus-visible")){t.submenuElement.style.setProperty("--safe-triangle-visible","none");return}t.submenuElement.style.setProperty("--safe-triangle-visible","block");let o=t.submenuElement.getBoundingClientRect(),r=this.localize.dir()==="rtl";t.submenuElement.style.setProperty("--safe-triangle-submenu-start-x",`${r?o.right:o.left}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-start-y",`${o.top}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-end-x",`${r?o.right:o.left}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-end-y",`${o.bottom}px`)}makeSelection(t){let e=this.getTrigger();if(t.disabled)return;t.type==="checkbox"&&(t.checked=!t.checked);let o=new Oi({item:t});this.dispatchEvent(o),o.defaultPrevented||(this.open=!1,e?.focus({preventScroll:!0}))}async syncAriaAttributes(){let t=this.getTrigger(),e;t&&(t.localName==="wa-button"?(await customElements.whenDefined("wa-button"),await t.updateComplete,e=t.shadowRoot.querySelector('[part="base"]')):e=t,e.hasAttribute("id")||e.setAttribute("id",Ve("wa-dropdown-trigger-")),e.setAttribute("aria-haspopup","menu"),e.setAttribute("aria-expanded",this.open?"true":"false"),this.menu?.setAttribute("aria-expanded","false"))}render(){let t=this.hasUpdated?this.popup?.active:this.open;return m`
      <wa-popup
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        ?active=${t}
        flip
        flip-fallback-strategy="best-fit"
        shift
        shift-padding="10"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot
          name="trigger"
          slot="anchor"
          @click=${this.handleTriggerClick}
          @slotchange=${this.syncAriaAttributes}
        ></slot>
        <div
          id="menu"
          part="menu"
          role="menu"
          tabindex="-1"
          aria-orientation="vertical"
          @click=${this.handleMenuClick}
          @submenu-opening=${this.handleSubmenuOpening}
        >
          <slot @slotchange=${this.handleMenuSlotChange}></slot>
        </div>
      </wa-popup>
    `}};lt.css=[B,Li];i([g("slot:not([name])")],lt.prototype,"defaultSlot",2);i([g("#menu")],lt.prototype,"menu",2);i([g("wa-popup")],lt.prototype,"popup",2);i([s({type:Boolean,reflect:!0})],lt.prototype,"open",2);i([s({reflect:!0})],lt.prototype,"size",2);i([s({reflect:!0})],lt.prototype,"placement",2);i([s({type:Number})],lt.prototype,"distance",2);i([s({type:Number})],lt.prototype,"skidding",2);lt=i([w("wa-dropdown")],lt);var la=v`
  :host {
    display: flex;
    position: relative;
    align-items: center;
    padding: 0.5em 1em;
    border-radius: var(--wa-border-radius-s);
    isolation: isolate;
    color: var(--wa-color-text-normal);
    line-height: var(--wa-line-height-condensed);
    cursor: pointer;
    transition:
      var(--wa-transition-fast) background-color var(--wa-transition-easing),
      var(--wa-transition-fast) color var(--wa-transition-easing);
  }

  @media (hover: hover) {
    :host(:hover:not(:state(disabled))) {
      background-color: var(--wa-color-neutral-fill-normal);
    }
  }

  :host(:focus-visible) {
    z-index: 1;
    outline: var(--wa-focus-ring);
    background-color: var(--wa-color-neutral-fill-normal);
  }

  :host(:state(disabled)),
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Danger variant */
  :host([variant='danger']),
  :host([variant='danger']) #details {
    color: var(--wa-color-danger-on-quiet);
  }

  @media (hover: hover) {
    :host([variant='danger']:hover) {
      background-color: var(--wa-color-danger-fill-normal);
      color: var(--wa-color-danger-on-normal);
    }
  }

  :host([variant='danger']:focus-visible) {
    background-color: var(--wa-color-danger-fill-normal);
    color: var(--wa-color-danger-on-normal);
  }

  :host([checkbox-adjacent]) {
    padding-inline-start: 2em;
  }

  /* Only add padding when item actually has a submenu */
  :host([submenu-adjacent]:not(:state(has-submenu))) #details {
    padding-inline-end: 0;
  }

  :host(:state(has-submenu)[submenu-adjacent]) #details {
    padding-inline-end: 1.75em;
  }

  #check {
    visibility: hidden;
    margin-inline-start: -1.5em;
    margin-inline-end: 0.5em;
    font-size: var(--wa-font-size-smaller);
  }

  :host(:state(checked)) #check {
    visibility: visible;
  }

  #icon ::slotted(*) {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    margin-inline-end: 0.75em !important;
    font-size: var(--wa-font-size-smaller);
  }

  #label {
    flex: 1 1 auto;
    min-width: 0;
  }

  #details {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: end;
    color: var(--wa-color-text-quiet);
    font-size: var(--wa-font-size-smaller) !important;
  }

  #details ::slotted(*) {
    margin-inline-start: 2em !important;
  }

  /* Submenu indicator icon */
  #submenu-indicator {
    position: absolute;
    inset-inline-end: 1em;
    color: var(--wa-color-neutral-on-quiet);
    font-size: var(--wa-font-size-smaller);
  }

  /* Flip chevron icon when RTL */
  :host(:dir(rtl)) #submenu-indicator {
    transform: scaleX(-1);
  }

  /* Submenu styles */
  #submenu {
    display: flex;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    flex-direction: column;
    width: max-content;
    margin: 0;
    padding: 0.25em;
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    background-color: var(--wa-color-surface-raised);
    box-shadow: var(--wa-shadow-m);
    color: var(--wa-color-text-normal);
    text-align: start;
    user-select: none;

    /* Override default popover styles */
    &[popover] {
      margin: 0;
      inset: auto;
      padding: 0.25em;
      overflow: visible;
      border-radius: var(--wa-border-radius-m);
    }

    &.show {
      animation: submenu-show var(--show-duration, 50ms) ease;
    }

    &.hide {
      animation: submenu-show var(--show-duration, 50ms) ease reverse;
    }

    /* Submenu placement transform origins */
    &[data-placement^='top'] {
      transform-origin: bottom;
    }

    &[data-placement^='bottom'] {
      transform-origin: top;
    }

    &[data-placement^='left'] {
      transform-origin: right;
    }

    &[data-placement^='right'] {
      transform-origin: left;
    }

    &[data-placement='left-start'] {
      transform-origin: right top;
    }

    &[data-placement='left-end'] {
      transform-origin: right bottom;
    }

    &[data-placement='right-start'] {
      transform-origin: left top;
    }

    &[data-placement='right-end'] {
      transform-origin: left bottom;
    }

    /* Safe triangle styling */
    &::before {
      display: none;
      z-index: 9;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: transparent;
      content: '';
      clip-path: polygon(
        var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
        var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
        var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
      );
      pointer-events: auto; /* Enable mouse events on the triangle */
    }

    &[data-visible]::before {
      display: block;
    }
  }

  ::slotted(wa-dropdown-item) {
    font-size: inherit;
  }

  ::slotted(wa-divider) {
    --spacing: 0.25em;
  }

  @keyframes submenu-show {
    from {
      scale: 0.9;
      opacity: 0;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }
`;var at=class extends k{constructor(){super(...arguments),this.hasSlotController=new N(this,"[default]","start","end"),this.active=!1,this.variant="default",this.size="medium",this.checkboxAdjacent=!1,this.submenuAdjacent=!1,this.type="normal",this.checked=!1,this.disabled=!1,this.submenuOpen=!1,this.hasSubmenu=!1,this.handleSlotChange=()=>{this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState(),this.hasSubmenu?(this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",this.submenuOpen?"true":"false")):(this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"))},this.handleHostClick=t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())},this.handleClick=t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseenter",this.handleMouseEnter.bind(this)),this.shadowRoot.addEventListener("click",this.handleClick,{capture:!0}),this.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}disconnectedCallback(){super.disconnectedCallback(),this.closeSubmenu(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseenter",this.handleMouseEnter),this.shadowRoot.removeEventListener("click",this.handleClick,{capture:!0}),this.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}firstUpdated(){this.setAttribute("tabindex","-1"),this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState()}updated(t){t.has("active")&&(this.setAttribute("tabindex",this.active?"0":"-1"),this.customStates.set("active",this.active)),t.has("checked")&&(this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked"),this.customStates.set("checked",this.checked)),t.has("disabled")&&(this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.customStates.set("disabled",this.disabled),this.style.pointerEvents=this.disabled?"none":""),t.has("type")&&(this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))),t.has("submenuOpen")&&(this.customStates.set("submenu-open",this.submenuOpen),this.submenuOpen?this.openSubmenu():this.closeSubmenu())}updateHasSubmenuState(){this.customStates.set("has-submenu",this.hasSubmenu)}async openSubmenu(){let t=this.submenuElement;!this.hasSubmenu||!t||!this.isConnected||(this.notifyParentOfOpening(),t.showPopover?.(),t.hidden=!1,t.setAttribute("data-visible",""),this.submenuOpen=!0,this.setAttribute("aria-expanded","true"),await U(t,"show"),setTimeout(()=>{let e=this.getSubmenuItems();e.length>0&&(e.forEach((o,r)=>o.active=r===0),e[0].focus({preventScroll:!0}))},0))}notifyParentOfOpening(){let t=new CustomEvent("submenu-opening",{bubbles:!0,composed:!0,detail:{item:this}});this.dispatchEvent(t);let e=this.parentElement;e&&[...e.children].filter(r=>r!==this&&r.localName==="wa-dropdown-item"&&r.getAttribute("slot")===this.getAttribute("slot")&&r.submenuOpen).forEach(r=>{r.submenuOpen=!1})}async closeSubmenu(){let t=this.submenuElement;!this.hasSubmenu||!t||(this.submenuOpen=!1,this.setAttribute("aria-expanded","false"),t.hidden||(await U(t,"hide"),t?.isConnected&&(t.hidden=!0,t.removeAttribute("data-visible"),t.hidePopover?.())))}getSubmenuItems(){return[...this.children].filter(t=>t.localName==="wa-dropdown-item"&&t.getAttribute("slot")==="submenu"&&!t.hasAttribute("disabled"))}handleMouseEnter(){this.hasSubmenu&&!this.disabled&&(this.notifyParentOfOpening(),this.submenuOpen=!0)}render(){return m`
      ${this.type==="checkbox"?m`
            <wa-icon
              id="check"
              part="checkmark"
              exportparts="svg:checkmark__svg"
              library="system"
              name="check"
            ></wa-icon>
          `:""}

      <span id="icon" part="icon">
        <slot name="icon"></slot>
      </span>

      <span id="label" part="label">
        <slot></slot>
      </span>

      <span id="details" part="details">
        <slot name="details"></slot>
      </span>

      ${this.hasSubmenu?m`
            <wa-icon
              id="submenu-indicator"
              part="submenu-icon"
              exportparts="svg:submenu-icon__svg"
              library="system"
              name="chevron-right"
            ></wa-icon>
          `:""}
      ${this.hasSubmenu?m`
            <div
              id="submenu"
              part="submenu"
              popover="manual"
              role="menu"
              tabindex="-1"
              aria-orientation="vertical"
              hidden
            >
              <slot name="submenu"></slot>
            </div>
          `:""}
    `}};at.css=la;i([g("#submenu")],at.prototype,"submenuElement",2);i([s({type:Boolean})],at.prototype,"active",2);i([s({reflect:!0})],at.prototype,"variant",2);i([s({reflect:!0})],at.prototype,"size",2);i([s({attribute:"checkbox-adjacent",type:Boolean,reflect:!0})],at.prototype,"checkboxAdjacent",2);i([s({attribute:"submenu-adjacent",type:Boolean,reflect:!0})],at.prototype,"submenuAdjacent",2);i([s()],at.prototype,"value",2);i([s({reflect:!0})],at.prototype,"type",2);i([s({type:Boolean})],at.prototype,"checked",2);i([s({type:Boolean,reflect:!0})],at.prototype,"disabled",2);i([s({type:Boolean,reflect:!0})],at.prototype,"submenuOpen",2);i([_()],at.prototype,"hasSubmenu",2);at=i([w("wa-dropdown-item")],at);var ca=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};var da=v`
  :host {
    --arrow-color: black;
    --arrow-size: var(--wa-tooltip-arrow-size);
    --popup-border-width: 0px;
    --show-duration: 100ms;
    --hide-duration: 100ms;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45) to calculate the length of the arrow after rotation.
     *
     * The diamond will be translated inward by --arrow-base-offset, the border thickness, to centralise it on
     * the inner edge of the popup border. This also means we need to increase the size of the arrow by the
     * same amount to compensate.
     *
     * A diamond shaped clipping mask is used to avoid overlap of popup content. This extends slightly inward so
     * the popup border is covered with no sub-pixel rounding artifacts. The diamond corners are mitred at 22.5º
     * to properly merge any arrow border with the popup border. The constant 1.4142 is derived from 1 + tan(22.5).
     *
     */
    --arrow-base-offset: var(--popup-border-width);
    --arrow-size-diagonal: calc((var(--arrow-size) + var(--arrow-base-offset)) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));
    --arrow-size-div: calc(var(--arrow-size-diagonal) * 2);
    --arrow-clipping-corner: calc(var(--arrow-base-offset) * 1.4142);

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);

    /* Clear UA styles for [popover] */
    :where(&) {
      inset: unset;
      padding: unset;
      margin: unset;
      width: unset;
      height: unset;
      color: unset;
      background: unset;
      border: unset;
      overflow: unset;
    }
  }

  .popup-fixed {
    position: fixed;
  }

  .popup:not(.popup-active) {
    display: none;
  }

  .arrow {
    position: absolute;
    width: var(--arrow-size-div);
    height: var(--arrow-size-div);
    background: var(--arrow-color);
    z-index: 3;
    clip-path: polygon(
      var(--arrow-clipping-corner) 100%,
      var(--arrow-base-offset) calc(100% - var(--arrow-base-offset)),
      calc(var(--arrow-base-offset) - 2px) calc(100% - var(--arrow-base-offset)),
      calc(100% - var(--arrow-base-offset)) calc(var(--arrow-base-offset) - 2px),
      calc(100% - var(--arrow-base-offset)) var(--arrow-base-offset),
      100% var(--arrow-clipping-corner),
      100% 100%
    );
    rotate: 45deg;
  }

  :host([data-current-placement|='left']) .arrow {
    rotate: -45deg;
  }

  :host([data-current-placement|='right']) .arrow {
    rotate: 135deg;
  }

  :host([data-current-placement|='bottom']) .arrow {
    rotate: 225deg;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge-visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: 899;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }

  /* Built-in animations */
  .show {
    animation: show var(--show-duration) ease;
  }

  .hide {
    animation: show var(--hide-duration) ease reverse;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .show-with-scale {
    animation: show-with-scale var(--show-duration) ease;
  }

  .hide-with-scale {
    animation: show-with-scale var(--hide-duration) ease reverse;
  }

  @keyframes show-with-scale {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }
`;function ha(t){return Bs(t)}function Cr(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function Bs(t){for(let e=t;e;e=Cr(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Cr(t);e;e=Cr(e)){if(!(e instanceof Element))continue;let o=getComputedStyle(e);if(o.display!=="contents"&&(o.position!=="static"||Be(o)||e.tagName==="BODY"))return e}return null}function pa(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var Fo=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),P=class extends k{constructor(){super(...arguments),this.localize=new L(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),o=this.placement.includes("top")||this.placement.includes("bottom"),r=0,a=0,n=0,l=0,c=0,d=0,p=0,h=0;o?t.top<e.top?(r=t.left,a=t.bottom,n=t.right,l=t.bottom,c=e.left,d=e.top,p=e.right,h=e.top):(r=e.left,a=e.bottom,n=e.right,l=e.bottom,c=t.left,d=t.top,p=t.right,h=t.top):t.left<e.left?(r=t.right,a=t.top,n=e.left,l=e.top,c=t.right,d=t.bottom,p=e.left,h=e.bottom):(r=e.right,a=e.top,n=t.left,l=t.top,c=e.right,d=e.bottom,p=t.left,h=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${a}px`),this.style.setProperty("--hover-bridge-top-right-x",`${n}px`),this.style.setProperty("--hover-bridge-top-right-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${d}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${p}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${h}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||pa(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||!this.isConnected||(this.popup?.showPopover?.(),this.cleanup=Io(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl||!this.popup)return;let t=[Vo({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(yr({apply:({rects:r})=>{let a=this.sync==="width"||this.sync==="both",n=this.sync==="height"||this.sync==="both";this.popup.style.width=a?`${r.reference.width}px`:"",this.popup.style.height=n?`${r.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let e;Fo&&!pa(this.anchor)&&this.boundary==="scroll"&&(e=Zt(this.anchorEl).filter(r=>r instanceof Element)),this.flip&&t.push(Bo({boundary:this.flipBoundary||e,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(Mo({boundary:this.shiftBoundary||e,padding:this.shiftPadding})),this.autoSize?t.push(yr({boundary:this.autoSizeBoundary||e,padding:this.autoSizePadding,apply:({availableWidth:r,availableHeight:a})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${a}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${r}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(sa({element:this.arrowEl,padding:this.arrowPadding}));let o=Fo?r=>eo.getOffsetParent(r,ha):eo.getOffsetParent;Po(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:Fo?"absolute":"fixed",platform:{...eo,getOffsetParent:o}}).then(({x:r,y:a,middlewareData:n,placement:l})=>{let c=this.localize.dir()==="rtl",d={top:"bottom",right:"left",bottom:"top",left:"right"}[l.split("-")[0]];if(this.setAttribute("data-current-placement",l),Object.assign(this.popup.style,{left:`${r}px`,top:`${a}px`}),this.arrow){let p=n.arrow.x,h=n.arrow.y,u="",f="",b="",y="";if(this.arrowPlacement==="start"){let E=typeof p=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";u=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",f=c?E:"",y=c?"":E}else if(this.arrowPlacement==="end"){let E=typeof p=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";f=c?"":E,y=c?E:"",b=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(y=typeof p=="number"?"calc(50% - var(--arrow-size-diagonal))":"",u=typeof h=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(y=typeof p=="number"?`${p}px`:"",u=typeof h=="number"?`${h}px`:"");Object.assign(this.arrowEl.style,{top:u,right:f,bottom:b,left:y,[d]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new ca)}render(){return m`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${C({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${C({popup:!0,"popup-active":this.active,"popup-fixed":!Fo,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?m`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};P.css=da;i([g(".popup")],P.prototype,"popup",2);i([g(".arrow")],P.prototype,"arrowEl",2);i([s()],P.prototype,"anchor",2);i([s({type:Boolean,reflect:!0})],P.prototype,"active",2);i([s({reflect:!0})],P.prototype,"placement",2);i([s()],P.prototype,"boundary",2);i([s({type:Number})],P.prototype,"distance",2);i([s({type:Number})],P.prototype,"skidding",2);i([s({type:Boolean})],P.prototype,"arrow",2);i([s({attribute:"arrow-placement"})],P.prototype,"arrowPlacement",2);i([s({attribute:"arrow-padding",type:Number})],P.prototype,"arrowPadding",2);i([s({type:Boolean})],P.prototype,"flip",2);i([s({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],P.prototype,"flipFallbackPlacements",2);i([s({attribute:"flip-fallback-strategy"})],P.prototype,"flipFallbackStrategy",2);i([s({type:Object})],P.prototype,"flipBoundary",2);i([s({attribute:"flip-padding",type:Number})],P.prototype,"flipPadding",2);i([s({type:Boolean})],P.prototype,"shift",2);i([s({type:Object})],P.prototype,"shiftBoundary",2);i([s({attribute:"shift-padding",type:Number})],P.prototype,"shiftPadding",2);i([s({attribute:"auto-size"})],P.prototype,"autoSize",2);i([s()],P.prototype,"sync",2);i([s({type:Object})],P.prototype,"autoSizeBoundary",2);i([s({attribute:"auto-size-padding",type:Number})],P.prototype,"autoSizePadding",2);i([s({attribute:"hover-bridge",type:Boolean})],P.prototype,"hoverBridge",2);P=i([w("wa-popup")],P);var ct=class extends k{constructor(){super(...arguments),this.localize=new L(this),this.date=new Date,this.hourFormat="auto"}static get styles(){return[]}render(){let t=new Date(this.date),e=this.hourFormat==="auto"?void 0:this.hourFormat==="12";if(isNaN(t.getMilliseconds()))return;let o=this.localize.date(t,{weekday:this.weekday,era:this.era,year:this.year,month:this.month,day:this.day,hour:this.hour,minute:this.minute,second:this.second,timeZoneName:this.timeZoneName,timeZone:this.timeZone,hour12:e});return m`<time datetime=${t.toISOString()}>${o}</time>`}};i([s()],ct.prototype,"date",2);i([s()],ct.prototype,"weekday",2);i([s()],ct.prototype,"era",2);i([s()],ct.prototype,"year",2);i([s()],ct.prototype,"month",2);i([s()],ct.prototype,"day",2);i([s()],ct.prototype,"hour",2);i([s()],ct.prototype,"minute",2);i([s()],ct.prototype,"second",2);i([s({attribute:"time-zone-name"})],ct.prototype,"timeZoneName",2);i([s({attribute:"time-zone"})],ct.prototype,"timeZone",2);i([s({attribute:"hour-format"})],ct.prototype,"hourFormat",2);ct=i([w("wa-format-date")],ct);var xt=class extends k{constructor(){super(...arguments),this.localize=new L(this),this.value=0,this.type="decimal",this.withoutGrouping=!1,this.currency="USD",this.currencyDisplay="symbol"}static get styles(){return[]}render(){return isNaN(this.value)?"":this.localize.number(this.value,{style:this.type,currency:this.currency,currencyDisplay:this.currencyDisplay,useGrouping:!this.withoutGrouping,minimumIntegerDigits:this.minimumIntegerDigits,minimumFractionDigits:this.minimumFractionDigits,maximumFractionDigits:this.maximumFractionDigits,minimumSignificantDigits:this.minimumSignificantDigits,maximumSignificantDigits:this.maximumSignificantDigits})}};i([s({type:Number})],xt.prototype,"value",2);i([s()],xt.prototype,"type",2);i([s({attribute:"without-grouping",type:Boolean})],xt.prototype,"withoutGrouping",2);i([s()],xt.prototype,"currency",2);i([s({attribute:"currency-display"})],xt.prototype,"currencyDisplay",2);i([s({attribute:"minimum-integer-digits",type:Number})],xt.prototype,"minimumIntegerDigits",2);i([s({attribute:"minimum-fraction-digits",type:Number})],xt.prototype,"minimumFractionDigits",2);i([s({attribute:"maximum-fraction-digits",type:Number})],xt.prototype,"maximumFractionDigits",2);i([s({attribute:"minimum-significant-digits",type:Number})],xt.prototype,"minimumSignificantDigits",2);i([s({attribute:"maximum-significant-digits",type:Number})],xt.prototype,"maximumSignificantDigits",2);xt=i([w("wa-format-number")],xt);var ua=v`
  :host {
    border-width: 0;
  }

  :host(:focus) {
    outline: none;
  }

  .text-field {
    display: flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    transition: inherit;
    height: var(--wa-form-control-height);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    cursor: text;
    color: var(--wa-form-control-value-color);
    font-size: var(--wa-form-control-value-font-size);
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    vertical-align: middle;
    width: 100%;
    transition:
      background-color var(--wa-transition-normal),
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    background-color: var(--wa-form-control-background-color);
    box-shadow: var(--box-shadow);
    padding: 0 var(--wa-form-control-padding-inline);
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);

    &:focus-within {
      outline-color: var(--wa-color-focus);
    }

    /* Style disabled inputs */
    &:has(:disabled) {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .text-field {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .text-field {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .text-field {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  :host([pill]) .text-field {
    border-radius: var(--wa-border-radius-pill) !important;
  }

  .text-field {
    /* Show autofill styles over the entire text field, not just the native <input> */
    &:has(:autofill),
    &:has(:-webkit-autofill) {
      background-color: var(--wa-color-brand-fill-quiet) !important;
    }

    input,
    textarea {
      /*
      Fixes an alignment issue with placeholders.
      https://github.com/shoelace-style/webawesome/issues/342
    */
      height: 100%;

      padding: 0;
      border: none;
      outline: none;
      box-shadow: none;
      margin: 0;
      cursor: inherit;
      -webkit-appearance: none;
      font: inherit;

      /* Turn off Safari's autofill styles */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-background-clip: text;
        background-color: transparent;
        -webkit-text-fill-color: inherit;
      }
    }
  }

  input {
    flex: 1 1 auto;
    min-width: 0;
    height: 100%;
    transition: inherit;

    /* prettier-ignore */
    background-color: rgb(118 118 118 / 0); /* ensures proper placeholder styles in webkit's date input */
    height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
    padding-block: 0;
    color: inherit;

    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }

    &:focus {
      outline: none;
    }
  }

  textarea {
    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }
  }

  .start,
  .end {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;

    &::slotted(wa-icon) {
      color: var(--wa-color-neutral-on-quiet);
    }
  }

  .start::slotted(*) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  .end::slotted(*) {
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  /*
   * Clearable + Password Toggle
   */

  .clear,
  .password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    background: none;
    padding: 0;
    transition: var(--wa-transition-normal) color;
    cursor: pointer;
    margin-inline-start: var(--wa-form-control-padding-inline);

    @media (hover: hover) {
      &:hover {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
      }
    }

    &:active {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
    }

    &:focus {
      outline: none;
    }
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  :host([without-spin-buttons]) input[type='number'] {
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      display: none;
    }
  }
`;var Fe=class extends Event{constructor(){super("wa-clear",{bubbles:!0,cancelable:!1,composed:!0})}};var O=class extends D{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new N(this,"hint","label"),this.localize=new L(this),this.title="",this.type="text",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="medium",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.withClear=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.withoutSpinButtons=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,Pt()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}handleChange(t){this.value=this.input.value,this.relayNativeEvent(t,{bubbles:!0,composed:!0})}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.updateComplete.then(()=>{this.dispatchEvent(new Fe),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})),this.input.focus()}handleInput(){this.value=this.input.value}handleKeyDown(t){Re(t,this)}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}updated(t){super.updated(t),(t.has("value")||t.has("defaultValue"))&&(this.customStates.set("blank",!this.value),this.updateValidity())}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,o="none"){this.input.setSelectionRange(t,e,o)}setRangeText(t,e,o,r="preserve"){let a=e??this.input.selectionStart,n=o??this.input.selectionEnd;this.input.setRangeText(t,a,n,r),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=null,this.input&&(this.input.value=this.value),super.formResetCallback()}render(){let t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,o=this.label?!0:!!t,r=this.hint?!0:!!e,a=this.withClear&&!this.disabled&&!this.readonly,n=this.hasUpdated&&a&&(typeof this.value=="number"||this.value&&this.value.length>0);return m`
      <label
        part="form-control-label label"
        class=${C({label:!0,"has-label":o})}
        for="input"
        aria-hidden=${o?"false":"true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="text-field">
        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
          id="input"
          class="control"
          type=${this.type==="password"&&this.passwordVisible?"text":this.type}
          title=${this.title}
          name=${x(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${x(this.placeholder)}
          minlength=${x(this.minlength)}
          maxlength=${x(this.maxlength)}
          min=${x(this.min)}
          max=${x(this.max)}
          step=${x(this.step)}
          .value=${wt(this.value??"")}
          autocapitalize=${x(this.autocapitalize)}
          autocomplete=${x(this.autocomplete)}
          autocorrect=${this.autocorrect?"on":"off"}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${x(this.pattern)}
          enterkeyhint=${x(this.enterkeyhint)}
          inputmode=${x(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        ${n?m`
              <button
                part="clear-button"
                class="clear"
                type="button"
                aria-label=${this.localize.term("clearEntry")}
                @click=${this.handleClearClick}
                tabindex="-1"
              >
                <slot name="clear-icon">
                  <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                </slot>
              </button>
            `:""}
        ${this.passwordToggle&&!this.disabled?m`
              <button
                part="password-toggle-button"
                class="password-toggle"
                type="button"
                aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                @click=${this.handlePasswordToggle}
                tabindex="-1"
              >
                ${this.passwordVisible?m`
                      <slot name="hide-password-icon">
                        <wa-icon name="eye-slash" library="system" variant="regular"></wa-icon>
                      </slot>
                    `:m`
                      <slot name="show-password-icon">
                        <wa-icon name="eye" library="system" variant="regular"></wa-icon>
                      </slot>
                    `}
              </button>
            `:""}

        <slot name="end" part="end" class="end"></slot>
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${C({"has-slotted":r})}
        aria-hidden=${r?"false":"true"}
        >${this.hint}</slot
      >
    `}};O.css=[B,K,ua];O.shadowRootOptions={...D.shadowRootOptions,delegatesFocus:!0};i([g("input")],O.prototype,"input",2);i([s()],O.prototype,"title",2);i([s({reflect:!0})],O.prototype,"type",2);i([_()],O.prototype,"value",1);i([s({attribute:"value",reflect:!0})],O.prototype,"defaultValue",2);i([s({reflect:!0})],O.prototype,"size",2);i([s({reflect:!0})],O.prototype,"appearance",2);i([s({type:Boolean,reflect:!0})],O.prototype,"pill",2);i([s()],O.prototype,"label",2);i([s({attribute:"hint"})],O.prototype,"hint",2);i([s({attribute:"with-clear",type:Boolean})],O.prototype,"withClear",2);i([s()],O.prototype,"placeholder",2);i([s({type:Boolean,reflect:!0})],O.prototype,"readonly",2);i([s({attribute:"password-toggle",type:Boolean})],O.prototype,"passwordToggle",2);i([s({attribute:"password-visible",type:Boolean})],O.prototype,"passwordVisible",2);i([s({attribute:"without-spin-buttons",type:Boolean,reflect:!0})],O.prototype,"withoutSpinButtons",2);i([s({type:Boolean,reflect:!0})],O.prototype,"required",2);i([s()],O.prototype,"pattern",2);i([s({type:Number})],O.prototype,"minlength",2);i([s({type:Number})],O.prototype,"maxlength",2);i([s()],O.prototype,"min",2);i([s()],O.prototype,"max",2);i([s()],O.prototype,"step",2);i([s()],O.prototype,"autocapitalize",2);i([s({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="off"),toAttribute:t=>t?"on":"off"}})],O.prototype,"autocorrect",2);i([s()],O.prototype,"autocomplete",2);i([s({type:Boolean})],O.prototype,"autofocus",2);i([s()],O.prototype,"enterkeyhint",2);i([s({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],O.prototype,"spellcheck",2);i([s()],O.prototype,"inputmode",2);i([s({attribute:"with-label",type:Boolean})],O.prototype,"withLabel",2);i([s({attribute:"with-hint",type:Boolean})],O.prototype,"withHint",2);i([S("step",{waitUntilFirstUpdate:!0})],O.prototype,"handleStepChange",1);O=i([w("wa-input")],O);O.disableWarning?.("change-in-update");var ma=v`
  :host {
    --checked-icon-color: var(--wa-form-control-activated-color);
    --checked-icon-scale: 0.7;

    color: var(--wa-form-control-value-color);
    display: inline-flex;
    flex-direction: row;
    align-items: top;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  :host(:not(:state(checked))) svg circle {
    opacity: 0;
  }

  [part~='label'] {
    display: inline;
  }

  [part~='hint'] {
    margin-block-start: 0.5em;
  }

  /* Default spacing for default appearance radios */
  :host([appearance='default']) {
    margin-block: 0.375em; /* Half of the original 0.75em gap on each side */
  }

  :host([appearance='default'][data-wa-radio-horizontal]) {
    margin-block: 0;
    margin-inline: 0.5em; /* Half of the original 1em gap on each side */
  }

  /* Remove margin from first/last items to prevent extra space */
  :host([appearance='default'][data-wa-radio-first]) {
    margin-block-start: 0;
    margin-inline-start: 0;
  }

  :host([appearance='default'][data-wa-radio-last]) {
    margin-block-end: 0;
    margin-inline-end: 0;
  }

  /* Button appearance have no spacing, they get handled by the overlap margins below */
  :host([appearance='button']) {
    margin: 0;
    align-items: center;
    min-height: var(--wa-form-control-height);
    background-color: var(--wa-color-surface-default);
    border: var(--wa-form-control-border-width) var(--wa-form-control-border-style) var(--wa-form-control-border-color);
    border-radius: var(--wa-border-radius-m);
    padding: 0 var(--wa-form-control-padding-inline);
    transition:
      background-color var(--wa-transition-fast),
      border-color var(--wa-transition-fast);
  }

  /* Default appearance */
  :host([appearance='default']) {
    .control {
      flex: 0 0 auto;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--wa-form-control-toggle-size);
      height: var(--wa-form-control-toggle-size);
      border-color: var(--wa-form-control-border-color);
      border-radius: 50%;
      border-style: var(--wa-form-control-border-style);
      border-width: var(--wa-form-control-border-width);
      background-color: var(--wa-form-control-background-color);
      color: transparent;
      transition:
        background var(--wa-transition-normal),
        border-color var(--wa-transition-fast),
        box-shadow var(--wa-transition-fast),
        color var(--wa-transition-fast);
      transition-timing-function: var(--wa-transition-easing);

      margin-inline-end: 0.5em;
    }

    .checked-icon {
      display: flex;
      fill: currentColor;
      width: var(--wa-form-control-toggle-size);
      height: var(--wa-form-control-toggle-size);
      scale: var(--checked-icon-scale);
    }
  }

  /* Button appearance */
  :host([appearance='button']) {
    .control {
      display: none;
    }
  }

  /* Checked */
  :host(:state(checked)) .control {
    color: var(--checked-icon-color);
    border-color: var(--wa-form-control-activated-color);
    background-color: var(--wa-form-control-background-color);
  }

  /* Focus */
  :host(:focus-visible) .control {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled */
  :host(:state(disabled)) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Horizontal grouping - remove inner border radius */
  :host([appearance='button'][data-wa-radio-horizontal][data-wa-radio-inner]) {
    border-radius: 0;
  }

  :host([appearance='button'][data-wa-radio-horizontal][data-wa-radio-first]) {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([appearance='button'][data-wa-radio-horizontal][data-wa-radio-last]) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* Vertical grouping - remove inner border radius */
  :host([appearance='button'][data-wa-radio-vertical][data-wa-radio-inner]) {
    border-radius: 0;
  }

  :host([appearance='button'][data-wa-radio-vertical][data-wa-radio-first]) {
    border-end-start-radius: 0;
    border-end-end-radius: 0;
  }

  :host([appearance='button'][data-wa-radio-vertical][data-wa-radio-last]) {
    border-start-start-radius: 0;
    border-start-end-radius: 0;
  }

  @media (hover: hover) {
    :host([appearance='button']:hover:not(:state(disabled), :state(checked))) {
      background-color: color-mix(in srgb, var(--wa-color-surface-default) 95%, var(--wa-color-mix-hover));
    }
  }

  :host([appearance='button']:focus-visible) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  :host([appearance='button']:state(checked)) {
    border-color: var(--wa-form-control-activated-color);
    background-color: var(--wa-color-brand-fill-quiet);
  }

  :host([appearance='button']:state(checked):focus-visible) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Button overlap margins */
  :host([appearance='button'][data-wa-radio-horizontal]:not([data-wa-radio-first])) {
    margin-inline-start: calc(-1 * var(--wa-form-control-border-width));
  }

  :host([appearance='button'][data-wa-radio-vertical]:not([data-wa-radio-first])) {
    margin-block-start: calc(-1 * var(--wa-form-control-border-width));
  }

  /* Ensure interactive states are visible above adjacent buttons */
  :host([appearance='button']:hover),
  :host([appearance='button']:state(checked)) {
    position: relative;
    z-index: 1;
  }

  :host([appearance='button']:focus-visible) {
    z-index: 2;
  }
`;var Tt=class extends D{constructor(){super(),this.checked=!1,this.forceDisabled=!1,this.appearance="default",this.disabled=!1,this.handleClick=()=>{!this.disabled&&!this.forceDisabled&&(this.checked=!0)},this.addEventListener("click",this.handleClick)}connectedCallback(){super.connectedCallback(),this.setInitialAttributes()}setInitialAttributes(){this.setAttribute("role","radio"),this.tabIndex=0,this.setAttribute("aria-disabled",this.disabled||this.forceDisabled?"true":"false")}updated(t){if(super.updated(t),t.has("checked")&&(this.customStates.set("checked",this.checked),this.setAttribute("aria-checked",this.checked?"true":"false"),!this.disabled&&!this.forceDisabled&&(this.tabIndex=this.checked?0:-1)),t.has("disabled")||t.has("forceDisabled")){let e=this.disabled||this.forceDisabled;this.customStates.set("disabled",e),this.setAttribute("aria-disabled",e?"true":"false"),e?this.tabIndex=-1:this.tabIndex=this.checked?0:-1}}setValue(){}render(){return m`
      <span part="control" class="control">
        ${this.checked?m`
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" part="checked-icon" class="checked-icon">
                <circle cx="8" cy="8" r="8" />
              </svg>
            `:""}
      </span>

      <slot part="label" class="label"></slot>
    `}};Tt.css=[K,B,ma];i([_()],Tt.prototype,"checked",2);i([_()],Tt.prototype,"forceDisabled",2);i([s({reflect:!0})],Tt.prototype,"value",2);i([s({reflect:!0})],Tt.prototype,"appearance",2);i([s({reflect:!0})],Tt.prototype,"size",2);i([s({type:Boolean})],Tt.prototype,"disabled",2);Tt=i([w("wa-radio")],Tt);Tt.disableWarning?.("change-in-update");var fa=v`
  :host {
    display: block;
  }

  .form-control {
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
  }

  .label {
    padding: 0;
  }

  .radio-group-required .label::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }

  [part~='form-control-input'] {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 0; /* Radios handle their own spacing */
  }

  /* Horizontal */
  :host([orientation='horizontal']) [part~='form-control-input'] {
    flex-direction: row;
  }

  /* Help text */
  [part~='hint'] {
    margin-block-start: 0.5em;
  }
`;var et=class extends D{constructor(){super(),this.hasSlotController=new N(this,"hint","label"),this.label="",this.hint="",this.name=null,this.disabled=!1,this.orientation="vertical",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.required=!1,this.withLabel=!1,this.withHint=!1,this.handleRadioClick=t=>{let e=t.target.closest("wa-radio");if(!e||e.disabled||e.forceDisabled||this.disabled)return;let o=this.value;this.value=e.value,e.checked=!0;let r=this.getAllRadios();for(let a of r)e!==a&&(a.checked=!1,a.setAttribute("tabindex","-1"));this.value!==o&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})},this.addEventListener("keydown",this.handleKeyDown),this.addEventListener("click",this.handleRadioClick)}static get validators(){let t=[se({validationElement:Object.assign(document.createElement("input"),{required:!0,type:"radio",name:Ve("__wa-radio")})})];return[...super.validators,...t]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){typeof t=="number"&&(t=String(t)),this.valueHasChanged=!0,this._value=t}get validationTarget(){if(!1)return;let t=this.querySelector(":is(wa-radio):not([disabled])");if(t)return t}updated(t){(t.has("disabled")||t.has("size")||t.has("value")||t.has("defaultValue"))&&this.syncRadioElements()}formResetCallback(...t){this._value=null,super.formResetCallback(...t),this.syncRadioElements()}getAllRadios(){return[...this.querySelectorAll("wa-radio")]}handleLabelClick(){this.focus()}async syncRadioElements(){let t=this.getAllRadios();if(t.forEach((e,o)=>{this.size&&e.setAttribute("size",this.size),e.toggleAttribute("data-wa-radio-horizontal",this.orientation!=="vertical"),e.toggleAttribute("data-wa-radio-vertical",this.orientation==="vertical"),e.toggleAttribute("data-wa-radio-first",o===0),e.toggleAttribute("data-wa-radio-inner",o!==0&&o!==t.length-1),e.toggleAttribute("data-wa-radio-last",o===t.length-1),e.forceDisabled=this.disabled}),await Promise.all(t.map(async e=>{await e.updateComplete,!e.disabled&&e.value===this.value?e.checked=!0:e.checked=!1})),this.disabled)t.forEach(e=>{e.tabIndex=-1});else{let e=t.filter(r=>!r.disabled),o=e.find(r=>r.checked);e.length>0&&(o?e.forEach(r=>{r.tabIndex=r.checked?0:-1}):e.forEach((r,a)=>{r.tabIndex=a===0?0:-1})),t.filter(r=>r.disabled).forEach(r=>{r.tabIndex=-1})}}handleKeyDown(t){if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key)||this.disabled)return;let e=this.getAllRadios().filter(c=>!c.disabled);if(e.length<=0)return;t.preventDefault();let o=this.value,r=e.find(c=>c.checked)??e[0],a=t.key===" "?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1,n=e.indexOf(r)+a;n||(n=0),n<0&&(n=e.length-1),n>e.length-1&&(n=0);let l=e.some(c=>c.tagName.toLowerCase()==="wa-radio-button");this.getAllRadios().forEach(c=>{c.checked=!1,l||c.setAttribute("tabindex","-1")}),this.value=e[n].value,e[n].checked=!0,l?e[n].shadowRoot.querySelector("button").focus():(e[n].setAttribute("tabindex","0"),e[n].focus()),this.value!==o&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),t.preventDefault()}focus(t){if(this.disabled)return;let e=this.getAllRadios(),o=e.find(n=>n.checked),r=e.find(n=>!n.disabled),a=o||r;a&&a.focus(t)}render(){let t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,o=this.label?!0:!!t,r=this.hint?!0:!!e;return m`
      <fieldset
        part="form-control"
        class=${C({"form-control":!0,"form-control-radio-group":!0,"form-control-has-label":o})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="hint"
        aria-errormessage="error-message"
        aria-orientation=${this.orientation}
      >
        <label
          part="form-control-label"
          id="label"
          class=${C({label:!0,"has-label":o})}
          aria-hidden=${o?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <slot part="form-control-input" @slotchange=${this.syncRadioElements}></slot>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${C({"has-slotted":r})}
          aria-hidden=${r?"false":"true"}
          >${this.hint}</slot
        >
      </fieldset>
    `}};et.css=[B,K,fa];et.shadowRootOptions={...D.shadowRootOptions,delegatesFocus:!0};i([g("slot:not([name])")],et.prototype,"defaultSlot",2);i([s()],et.prototype,"label",2);i([s({attribute:"hint"})],et.prototype,"hint",2);i([s({reflect:!0})],et.prototype,"name",2);i([s({type:Boolean,reflect:!0})],et.prototype,"disabled",2);i([s({reflect:!0})],et.prototype,"orientation",2);i([_()],et.prototype,"value",1);i([s({attribute:"value",reflect:!0})],et.prototype,"defaultValue",2);i([s({reflect:!0})],et.prototype,"size",2);i([s({type:Boolean,reflect:!0})],et.prototype,"required",2);i([s({type:Boolean,attribute:"with-label"})],et.prototype,"withLabel",2);i([s({type:Boolean,attribute:"with-hint"})],et.prototype,"withHint",2);et=i([w("wa-radio-group")],et);et.disableWarning?.("change-in-update");var ba=v`
  :host {
    --shadow-color: var(--wa-color-surface-default);
    --shadow-size: 2rem;

    /* private (defined dynamically) */
    --start-shadow-opacity: 0;
    --end-shadow-opacity: 0;

    display: block;
    position: relative;
    max-width: 100%;
    overflow: hidden;
    isolation: isolate;
  }

  :host([orientation='vertical']) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  #content {
    z-index: 1; /* below shadows */
    border-radius: inherit;
    scroll-behavior: smooth;
    scrollbar-width: thin;

    /* Prevent text in mobile Safari from being larger when the container width larger than the viewport */
    -webkit-text-size-adjust: 100%;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  :host([without-scrollbar]) #content {
    scrollbar-width: none;
  }

  :host([orientation='horizontal']) #content {
    overflow-x: auto;
    overflow-y: hidden;
  }

  :host([orientation='vertical']) #content {
    flex: 1 1 auto;
    min-height: 0; /* This is crucial for flex children to respect overflow */
    overflow-x: hidden;
    overflow-y: auto;
  }

  #start-shadow,
  #end-shadow {
    z-index: 2;
  }

  #start-shadow {
    opacity: var(--start-shadow-opacity);
  }

  #end-shadow {
    opacity: var(--end-shadow-opacity);
  }

  /* Horizontal shadows */
  :host([orientation='horizontal']) {
    #start-shadow,
    #end-shadow {
      position: absolute;
      top: 0;
      bottom: 0;
      width: var(--shadow-size);
      pointer-events: none;
    }

    #start-shadow {
      &:dir(ltr) {
        left: 0;
        background: linear-gradient(to right, var(--shadow-color), transparent 100%);
      }

      &:dir(rtl) {
        right: 0;
        background: linear-gradient(to left, var(--shadow-color), transparent 100%);
      }
    }

    #end-shadow {
      &:dir(ltr) {
        right: 0;
        background: linear-gradient(to left, var(--shadow-color), transparent 100%);
      }

      &:dir(rtl) {
        left: 0;
        background: linear-gradient(to right, var(--shadow-color), transparent 100%);
      }
    }
  }

  /* Vertical shadows */
  :host([orientation='vertical']) {
    #start-shadow,
    #end-shadow {
      position: absolute;
      right: 0;
      left: 0;
      height: var(--shadow-size);
      pointer-events: none;
    }

    #start-shadow {
      top: 0;
      background: linear-gradient(to bottom, var(--shadow-color), transparent 100%);
    }

    #end-shadow {
      bottom: 0;
      background: linear-gradient(to top, var(--shadow-color), transparent 100%);
    }
  }
`;var Wt=class extends k{constructor(){super(...arguments),this.localize=new L(this),this.resizeObserver=null,this.canScroll=!1,this.orientation="horizontal",this.withoutScrollbar=!1,this.withoutShadow=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.updateScroll()),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect()}handleKeyDown(t){t.key==="Home"&&(t.preventDefault(),this.content.scrollTo({left:this.orientation==="horizontal"?0:void 0,top:this.orientation==="vertical"?0:void 0})),t.key==="End"&&(t.preventDefault(),this.content.scrollTo({left:this.orientation==="horizontal"?this.content.scrollWidth:void 0,top:this.orientation==="vertical"?this.content.scrollHeight:void 0}))}handleSlotChange(){this.updateScroll()}updateScroll(){if(this.orientation==="horizontal"){let t=Math.ceil(this.content.clientWidth),e=Math.abs(Math.ceil(this.content.scrollLeft)),r=Math.ceil(this.content.scrollWidth)-t;this.canScroll=r>0;let a=Math.min(1,e/(r*.05)),n=Math.min(1,(r-e)/(r*.05));this.style.setProperty("--start-shadow-opacity",String(a||0)),this.style.setProperty("--end-shadow-opacity",String(n||0))}else{let t=Math.ceil(this.content.clientHeight),e=Math.abs(Math.ceil(this.content.scrollTop)),r=Math.ceil(this.content.scrollHeight)-t;this.canScroll=r>0;let a=Math.min(1,e/(r*.05)),n=Math.min(1,(r-e)/(r*.05));this.style.setProperty("--start-shadow-opacity",String(a||0)),this.style.setProperty("--end-shadow-opacity",String(n||0))}}render(){return m`
      ${this.withoutShadow?"":m`
            <div id="start-shadow" part="start-shadow" aria-hidden="true"></div>
            <div id="end-shadow" part="end-shadow" aria-hidden="true"></div>
          `}

      <div
        id="content"
        part="content"
        role="region"
        aria-label=${this.localize.term("scrollableRegion")}
        aria-orientation=${this.orientation}
        tabindex=${this.canScroll?"0":"-1"}
        @keydown=${this.handleKeyDown}
        @scroll=${this.updateScroll}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};Wt.css=[ba];i([g("#content")],Wt.prototype,"content",2);i([_()],Wt.prototype,"canScroll",2);i([s({reflect:!0})],Wt.prototype,"orientation",2);i([s({attribute:"without-scrollbar",type:Boolean,reflect:!0})],Wt.prototype,"withoutScrollbar",2);i([s({attribute:"without-shadow",type:Boolean,reflect:!0})],Wt.prototype,"withoutShadow",2);i([Qr({passive:!0})],Wt.prototype,"updateScroll",1);Wt=i([w("wa-scroller")],Wt);var ga=v`
  :host {
    --tag-max-size: 10ch;
    --show-duration: 100ms;
    --hide-duration: 100ms;
  }

  /* Add ellipses to multi select options */
  :host wa-tag::part(content) {
    display: initial;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: var(--tag-max-size);
  }

  :host .disabled [part~='combobox'] {
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  :host .enabled:is(.open, :focus-within) [part~='combobox'] {
    outline-color: var(--wa-color-focus);
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;

    /* Pass through from select to the popup */
    --show-duration: inherit;
    --hide-duration: inherit;

    &::part(popup) {
      z-index: 900;
    }

    &[data-current-placement^='top']::part(popup) {
      transform-origin: bottom;
    }

    &[data-current-placement^='bottom']::part(popup) {
      transform-origin: top;
    }
  }

  /* Combobox */
  .combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    align-items: center;
    justify-content: start;

    min-height: var(--wa-form-control-height);

    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    color: var(--wa-form-control-value-color);
    cursor: pointer;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    overflow: hidden;
    padding: 0 var(--wa-form-control-padding-inline);
    position: relative;
    vertical-align: middle;
    transition:
      background-color var(--wa-transition-normal),
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);

    /* Pills */
    :host([pill]) & {
      border-radius: var(--wa-border-radius-pill);
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .combobox {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .combobox {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .combobox {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  .display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    line-height: var(--wa-form-control-value-line-height);
    color: var(--wa-form-control-value-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
    }
  }

  /* Manage spacing when tags are present */
  :host([multiple]) {
    --_padding-with-tags: calc(var(--wa-form-control-height) * 0.1 - var(--wa-form-control-border-width));

    & .combobox:has(.tags wa-tag) {
      padding-block: var(--_padding-with-tags);
      padding-inline-start: var(--_padding-with-tags);
    }
  }

  /* Visually hide the display input when multiple is enabled */
  :host([multiple]) .combobox:has(.tags wa-tag) .display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .value-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    padding: 0;
    margin: 0;
  }

  .tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.25em;

    &::slotted(wa-tag) {
      cursor: pointer !important;
    }

    .disabled &,
    .disabled &::slotted(wa-tag) {
      cursor: not-allowed !important;
    }
  }

  /* Start and End */

  .start,
  .end {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
  }

  .end::slotted(*) {
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  .start::slotted(*) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  :host([multiple]) .combobox:has(.tags wa-tag) .start::slotted(*) {
    margin-inline-start: calc(var(--wa-form-control-padding-inline) - var(--_padding-with-tags));
  }

  /* Clear button */
  [part~='clear-button'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    background: none;
    padding: 0;
    transition: color var(--wa-transition-normal);
    cursor: pointer;
    margin-inline-start: var(--wa-form-control-padding-inline);

    &:focus {
      outline: none;
    }

    @media (hover: hover) {
      &:hover {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
      }
    }

    &:active {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
    }
  }

  /* Expand icon */
  .expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
    transition: rotate var(--wa-transition-slow) ease;
    rotate: 0deg;
    margin-inline-start: var(--wa-form-control-padding-inline);

    .open & {
      rotate: -180deg;
    }
  }

  /* Listbox */
  .listbox {
    display: block;
    position: relative;
    font: inherit;
    box-shadow: var(--wa-shadow-m);
    background: var(--wa-color-surface-raised);
    border-color: var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
    padding-block: 0.5em;
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);

    &::slotted(wa-divider) {
      --spacing: 0.5em;
    }
  }

  slot:not([name])::slotted(small) {
    display: block;
    font-size: var(--wa-font-size-smaller);
    font-weight: var(--wa-font-weight-semibold);
    color: var(--wa-color-text-quiet);
    padding-block: 0.5em;
    padding-inline: 2.25em;
  }
`;var V=class extends D{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.cachedOptions=null,this.hasSlotController=new N(this,"hint","label"),this.localize=new L(this),this.selectionOrder=new Map,this.typeToSelectString="",this.slotChangePending=!1,this.displayLabel="",this.selectedOptions=[],this.name="",this._defaultValue=null,this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.required=!1,this.getTag=t=>m`
        <wa-tag
          part="tag"
          exportparts="
            base:tag__base,
            content:tag__content,
            remove-button:tag__remove-button,
            remove-button__base:tag__remove-button__base
          "
          ?pill=${this.pill}
          size=${this.size}
          with-remove
          data-value=${t.value}
          @wa-remove=${e=>this.handleTagRemove(e,t)}
        >
          ${t.label}
        </wa-tag>
      `,this.handleDocumentFocusIn=t=>{let e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{let e=t.target,o=e.closest('[part~="clear-button"]')!==null,r=e.closest("wa-button")!==null;if(!(o||r)){if(t.key==="Escape"&&this.open&&ft(this)&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){let a=this.getAllOptions(),n=a.indexOf(this.currentOption),l=Math.max(0,n);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(l=n+1,l>a.length-1&&(l=0)):t.key==="ArrowUp"?(l=n-1,l<0&&(l=a.length-1)):t.key==="Home"?l=0:t.key==="End"&&(l=a.length-1),this.setCurrentOption(a[l])}if(t.key?.length===1||t.key==="Backspace"){let a=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(let n of a)if(n.label.toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(n);break}}}},this.handleDocumentMouseDown=t=>{let e=t.composedPath();this&&!e.includes(this)&&this.hide()}}static get validators(){let t=[se({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...t]}get validationTarget(){return this.valueInput}set defaultValue(t){this._defaultValue=this.convertDefaultValue(t)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}rawValuesEqual(t,e){return t==null&&e==null?!0:t==null||e==null||t.length!==e.length?!1:t.every((o,r)=>o===e[r])}convertDefaultValue(t){return!(this.multiple||this.hasAttribute("multiple"))&&Array.isArray(t)&&(t=t[0]),t}set value(t){let e=this.value;t instanceof FormData&&(t=t.getAll(this.name)),t!=null&&!Array.isArray(t)&&(t=[t]);let o=this._value;this._value=t??null,this.rawValuesEqual(o,this._value)||(this.valueHasChanged=!0,this.requestUpdate("value",e))}get value(){let t=this._value??this.defaultValue??null;t!=null&&(t=Array.isArray(t)?t:[t]),this.optionValues=new Set(this.getAllOptions().filter(o=>!o.disabled).map(o=>o.value));let e=t;return t!=null&&(e=t.filter(o=>this.optionValues.has(o)),e=this.multiple?e:e[0],e=e??null),e}connectedCallback(){super.connectedCallback(),this.processSlotChange(),this.open=!1}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.cachedOptions=null}updateDefaultValue(){let e=this.getAllOptions().filter(o=>o.hasAttribute("selected")||o.defaultSelected);if(e.length>0){let o=e.map(r=>r.value);this._defaultValue=this.multiple?o:o[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),kt(this),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),mt(this),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.displayInput.setSelectionRange(0,0)}handleLabelClick(){this.displayInput.focus()}handleComboboxClick(t){t.preventDefault()}handleComboboxMouseDown(t){let o=t.composedPath().some(r=>r instanceof Element&&r.tagName.toLowerCase()==="wa-button");this.disabled||o||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){t.stopPropagation(),this.handleDocumentKeyDown(t)}handleClearClick(t){t.stopPropagation(),this.hasInteracted=!0,this.valueHasChanged=!0,this.value!==null&&(this.displayLabel="",this.selectionOrder.clear(),this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new Fe),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){let o=t.target.closest("wa-option");o&&!o.disabled&&(this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(o):this.setSelectedOptions(o),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){this.slotChangePending||(this.slotChangePending=!0,queueMicrotask(()=>{this.slotChangePending=!1,this.processSlotChange()}))}processSlotChange(){customElements.get("wa-option")||customElements.whenDefined("wa-option").then(()=>this.handleDefaultSlotChange()),this.cachedOptions=null;let t=this.getAllOptions();this.updateDefaultValue();let e=this.value;if(e==null||!this.valueHasChanged&&!this.hasInteracted){this.selectionChanged();return}Array.isArray(e)||(e=[e]);let o=t.filter(r=>e.includes(r.value));this.setSelectedOptions(o)}handleTagRemove(t,e){if(t.stopPropagation(),this.disabled)return;this.hasInteracted=!0,this.valueHasChanged=!0;let o=e;if(!o){let r=t.target.closest("wa-tag[data-value]");if(r){let a=r.dataset.value;o=this.selectedOptions.find(n=>n.value===a)}}o&&(this.toggleOptionSelection(o,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this.cachedOptions?this.cachedOptions:this?.querySelectorAll?(this.cachedOptions=[...this.querySelectorAll("wa-option")],this.cachedOptions):[]}getFirstOption(){return this.querySelector("wa-option")}setCurrentOption(t){this.getAllOptions().forEach(o=>{o.current=!1,o.tabIndex=-1}),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus({preventScroll:!0}))}setSelectedOptions(t){let e=this.getAllOptions(),o=Array.isArray(t)?t:[t];e.forEach(r=>{o.includes(r)||(r.selected=!1)}),o.length&&o.forEach(r=>r.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){e===!0||e===!1?t.selected=e:t.selected=!t.selected,this.selectionChanged()}selectionChanged(){let e=this.getAllOptions().filter(l=>{if(!this.hasInteracted&&!this.valueHasChanged){let c=this.defaultValue,d=Array.isArray(c)?c:[c];return l.hasAttribute("selected")||l.defaultSelected||l.selected||d?.includes(l.value)}return l.selected}),o=new Set(e.map(l=>l.value));for(let l of this.selectionOrder.keys())o.has(l)||this.selectionOrder.delete(l);let a=(this.selectionOrder.size>0?Math.max(...this.selectionOrder.values()):-1)+1;for(let l of e)this.selectionOrder.has(l.value)||this.selectionOrder.set(l.value,a++);this.selectedOptions=e.sort((l,c)=>{let d=this.selectionOrder.get(l.value)??0,p=this.selectionOrder.get(c.value)??0;return d-p});let n=new Set(this.selectedOptions.map(l=>l.value));if(n.size>0||this._value){let l=this._value;if(this._value==null){let c=this.defaultValue??[];this._value=Array.isArray(c)?c:[c]}this._value=this._value?.filter(c=>!this.optionValues?.has(c))??null,this._value?.unshift(...n),this.requestUpdate("value",l)}if(this.multiple)this.placeholder&&!this.value?.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{let l=this.selectedOptions[0];this.displayLabel=l?.label??""}this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){let o=this.getTag(t,e);return o?typeof o=="string"?Oe(o):o:null}else if(e===this.maxOptionsVisible)return m`
          <wa-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
            >+${this.selectedOptions.length-e}</wa-tag
          >
        `;return null})}updated(t){super.updated(t),(t.has("value")||t.has("displayLabel"))&&this.customStates.set("blank",!this.value&&!this.displayLabel)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){let t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value],o=t.filter(r=>e.includes(r.value));this.setSelectedOptions(o),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption());let t=new dt;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await U(this.popup.popup,"show"),this.currentOption&&ie(this.currentOption,this.listbox,"vertical","auto"),this.dispatchEvent(new ut)}else{let t=new ht;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.removeOpenListeners(),await U(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.dispatchEvent(new pt)}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,St(this,"wa-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,St(this,"wa-after-hide")}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}formResetCallback(){this.selectionOrder.clear(),this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){let t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,o=this.label?!0:!!t,r=this.hint?!0:!!e,a=(this.hasUpdated||!1)&&this.withClear&&!this.disabled&&(this.displayLabel||this.value&&this.value.length>0);return m`
      <div
        part="form-control"
        class=${C({"form-control":!0,"form-control-has-label":o})}
      >
        <label
          id="label"
          part="form-control-label label"
          class=${C({label:!0,"has-label":o})}
          aria-hidden=${o?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${C({select:!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple})}
            placement=${this.placement}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
              @click=${this.handleComboboxClick}
            >
              <slot part="start" name="start" class="start"></slot>

              <input
                part="display-input"
                class="display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                ?required=${this.required}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-invalid=${!this.validity.valid}
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="hint"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
              />

              <!-- Tags need to wait for first hydration before populating otherwise it will create a hydration mismatch. -->
              ${this.multiple&&this.hasUpdated?m`<div part="tags" class="tags" @wa-remove=${this.handleTagRemove}>${this.tags}</div>`:""}

              <input
                class="value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
              />

              ${a?m`
                    <button
                      part="clear-button"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="end" part="end" class="end"></slot>

              <slot name="expand-icon" part="expand-icon" class="expand-icon">
                <wa-icon library="system" name="chevron-down" variant="solid"></wa-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
            >
              <slot @slotchange=${this.handleDefaultSlotChange}></slot>
            </div>
          </wa-popup>
        </div>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${C({"has-slotted":r})}
          aria-hidden=${r?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};V.css=[ga,K,B];i([g(".select")],V.prototype,"popup",2);i([g(".combobox")],V.prototype,"combobox",2);i([g(".display-input")],V.prototype,"displayInput",2);i([g(".value-input")],V.prototype,"valueInput",2);i([g(".listbox")],V.prototype,"listbox",2);i([_()],V.prototype,"displayLabel",2);i([_()],V.prototype,"currentOption",2);i([_()],V.prototype,"selectedOptions",2);i([s({reflect:!0})],V.prototype,"name",2);i([s({attribute:!1})],V.prototype,"defaultValue",1);i([s({attribute:"value",reflect:!1})],V.prototype,"value",1);i([s({reflect:!0})],V.prototype,"size",2);i([s()],V.prototype,"placeholder",2);i([s({type:Boolean,reflect:!0})],V.prototype,"multiple",2);i([s({attribute:"max-options-visible",type:Number})],V.prototype,"maxOptionsVisible",2);i([s({type:Boolean})],V.prototype,"disabled",2);i([s({attribute:"with-clear",type:Boolean})],V.prototype,"withClear",2);i([s({type:Boolean,reflect:!0})],V.prototype,"open",2);i([s({reflect:!0})],V.prototype,"appearance",2);i([s({type:Boolean,reflect:!0})],V.prototype,"pill",2);i([s()],V.prototype,"label",2);i([s({reflect:!0})],V.prototype,"placement",2);i([s({attribute:"hint"})],V.prototype,"hint",2);i([s({attribute:"with-label",type:Boolean})],V.prototype,"withLabel",2);i([s({attribute:"with-hint",type:Boolean})],V.prototype,"withHint",2);i([s({type:Boolean,reflect:!0})],V.prototype,"required",2);i([s({attribute:!1})],V.prototype,"getTag",2);i([S("disabled",{waitUntilFirstUpdate:!0})],V.prototype,"handleDisabledChange",1);i([S("value",{waitUntilFirstUpdate:!0})],V.prototype,"handleValueChange",1);i([S("open",{waitUntilFirstUpdate:!0})],V.prototype,"handleOpenChange",1);V=i([w("wa-select")],V);V.disableWarning?.("change-in-update");var va=class extends Event{constructor(){super("wa-remove",{bubbles:!0,cancelable:!1,composed:!0})}};var wa=v`
  @layer wa-component {
    :host {
      display: inline-flex;
      gap: 0.5em;
      border-radius: var(--wa-border-radius-m);
      align-items: center;
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
      border-style: var(--wa-border-style);
      border-width: var(--wa-border-width-s);
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      font-size: inherit;
      line-height: 1;
      white-space: nowrap;
      user-select: none;
      -webkit-user-select: none;
      height: calc(var(--wa-form-control-height) * 0.8);
      line-height: calc(var(--wa-form-control-height) - var(--wa-form-control-border-width) * 2);
      padding: 0 0.75em;
    }

    /* Appearance modifiers */
    :host([appearance='outlined']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }

    :host([appearance='filled']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: transparent;
    }

    :host([appearance='filled-outlined']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }

    :host([appearance='accent']) {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
  }

  .content {
    font-size: var(--wa-font-size-smaller);
  }

  [part='remove-button'] {
    line-height: 1;
  }

  [part='remove-button']::part(base) {
    padding: 0;
    height: 1em;
    width: 1em;
    color: currentColor;
  }

  @media (hover: hover) {
    :host(:hover) > [part='remove-button']::part(base) {
      background-color: transparent;
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
    }
  }

  :host(:active) > [part='remove-button']::part(base) {
    background-color: transparent;
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
  }

  /*
   * Pill modifier
   */
  :host([pill]) {
    border-radius: var(--wa-border-radius-pill);
  }
`;var ne=class extends k{constructor(){super(...arguments),this.localize=new L(this),this.variant="neutral",this.appearance="filled-outlined",this.size="medium",this.pill=!1,this.withRemove=!1}handleRemoveClick(){this.dispatchEvent(new va)}render(){return m`
      <slot part="content" class="content"></slot>

      ${this.withRemove?m`
            <wa-button
              part="remove-button"
              exportparts="base:remove-button__base"
              class="remove"
              appearance="plain"
              @click=${this.handleRemoveClick}
              tabindex="-1"
            >
              <wa-icon name="xmark" library="system" variant="solid" label=${this.localize.term("remove")}></wa-icon>
            </wa-button>
          `:""}
    `}};ne.css=[wa,ae,B];i([s({reflect:!0})],ne.prototype,"variant",2);i([s({reflect:!0})],ne.prototype,"appearance",2);i([s({reflect:!0})],ne.prototype,"size",2);i([s({type:Boolean,reflect:!0})],ne.prototype,"pill",2);i([s({attribute:"with-remove",type:Boolean})],ne.prototype,"withRemove",2);ne=i([w("wa-tag")],ne);var ya=v`
  :host {
    display: block;
    color: var(--wa-color-text-normal);
    -webkit-user-select: none;
    user-select: none;

    position: relative;
    display: flex;
    align-items: center;
    font: inherit;
    padding: 0.5em 1em 0.5em 0.25em;
    line-height: var(--wa-line-height-condensed);
    transition: fill var(--wa-transition-normal) var(--wa-transition-easing);
    cursor: pointer;
  }

  :host(:focus) {
    outline: none;
  }

  @media (hover: hover) {
    :host(:not(:state(disabled), :state(current)):is(:state(hover), :hover)) {
      background-color: var(--wa-color-neutral-fill-normal);
      color: var(--wa-color-neutral-on-normal);
    }
  }

  :host(:state(current)),
  :host(:state(disabled):state(current)) {
    background-color: var(--wa-color-brand-fill-loud);
    color: var(--wa-color-brand-on-loud);
    opacity: 1;
  }

  :host(:state(disabled)) {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .label {
    flex: 1 1 auto;
    display: inline-block;
  }

  .check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--wa-font-size-smaller);
    visibility: hidden;
    width: 2em;
  }

  :host(:state(selected)) .check {
    visibility: visible;
  }

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .start::slotted(*) {
    margin-inline-end: 0.5em;
  }

  .end::slotted(*) {
    margin-inline-start: 0.5em;
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`;function oo(t,e=0){if(!t||!globalThis.Node)return"";if(typeof t[Symbol.iterator]=="function")return(Array.isArray(t)?t:[...t]).map(a=>oo(a,--e)).join("");let o=t;if(o.nodeType===Node.TEXT_NODE)return o.textContent??"";if(o.nodeType===Node.ELEMENT_NODE){let r=o;if(r.hasAttribute("slot")||r.matches("style, script"))return"";if(r instanceof HTMLSlotElement){let a=r.assignedNodes({flatten:!0});if(a.length>0)return oo(a,--e)}return e>-1?oo(r,--e):r.textContent??""}return o.hasChildNodes()?oo(o.childNodes,--e):""}var Rt=class extends k{constructor(){super(...arguments),this.localize=new L(this),this.cachedDefaultLabel="",this.isInitialized=!1,this.isDefaultLabelDirty=!0,this.current=!1,this.value="",this.disabled=!1,this.selected=!1,this.defaultSelected=!1,this._label="",this.handleHover=t=>{t.type==="mouseenter"?this.customStates.set("hover",!0):t.type==="mouseleave"&&this.customStates.set("hover",!1)}}set label(t){let e=this._label;this._label=t||"",this._label!==e&&this.requestUpdate("label",e)}get label(){return this._label?this._label:this.defaultLabel}get defaultLabel(){return(this.isDefaultLabelDirty||!this.cachedDefaultLabel)&&this.updateDefaultLabel(),this.cachedDefaultLabel}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false"),this.addEventListener("mouseenter",this.handleHover),this.addEventListener("mouseleave",this.handleHover)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mouseenter",this.handleHover),this.removeEventListener("mouseleave",this.handleHover)}handleDefaultSlotChange(){this.isDefaultLabelDirty=!0,this.isInitialized?(customElements.whenDefined("wa-select").then(()=>{let t=this.closest("wa-select");t&&t.handleDefaultSlotChange()}),customElements.whenDefined("wa-combobox").then(()=>{let t=this.closest("wa-combobox");t&&t.handleDefaultSlotChange()})):this.isInitialized=!0}willUpdate(t){if(t.has("defaultSelected")&&!this.closest("wa-combobox, wa-select")?.hasInteracted&&this.defaultSelected){let e=this.selected;this.selected=this.defaultSelected,this.requestUpdate("selected",e)}super.willUpdate(t)}updated(t){super.updated(t),t.has("disabled")&&(this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.customStates.set("disabled",this.disabled)),t.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.customStates.set("selected",this.selected)),t.has("value")&&(typeof this.value!="string"&&(this.value=String(this.value)),this.handleDefaultSlotChange()),t.has("current")&&this.customStates.set("current",this.current)}firstUpdated(t){if(super.firstUpdated(t),this.selected&&!this.defaultSelected){let e=this.closest("wa-select, wa-combobox");e&&!e.hasInteracted&&e.selectionChanged?.()}}updateDefaultLabel(){let t=this.cachedDefaultLabel;this.cachedDefaultLabel=oo(this).trim(),this.isDefaultLabelDirty=!1;let e=this.cachedDefaultLabel!==t;return!this._label&&e&&this.requestUpdate("label",t),e}render(){return m`
      ${this.selected?m`<wa-icon
            part="checked-icon"
            class="check"
            name="check"
            library="system"
            variant="solid"
            aria-hidden="true"
          ></wa-icon>`:m`<span part="checked-icon" class="check" aria-hidden="true"></span>`}
      <slot part="start" name="start" class="start"></slot>
      <slot part="label" class="label" @slotchange=${this.handleDefaultSlotChange}></slot>
      <slot part="end" name="end" class="end"></slot>
    `}};Rt.css=ya;i([g(".label")],Rt.prototype,"defaultSlot",2);i([_()],Rt.prototype,"current",2);i([s({reflect:!0})],Rt.prototype,"value",2);i([s({type:Boolean})],Rt.prototype,"disabled",2);i([s({type:Boolean,attribute:!1})],Rt.prototype,"selected",2);i([s({type:Boolean,attribute:"selected"})],Rt.prototype,"defaultSelected",2);i([s()],Rt.prototype,"label",1);Rt=i([w("wa-option")],Rt);var xa=class extends Event{constructor(t){super("wa-create",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}};var Ca=v`
  :host {
    --tag-max-size: 10ch;
    --show-duration: 100ms;
    --hide-duration: 100ms;
  }

  /* Add ellipses to multi select options */
  :host wa-tag::part(content) {
    display: initial;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: var(--tag-max-size);
  }

  :host .disabled,
  :host .disabled * {
    cursor: not-allowed;
  }

  :host .disabled [part~='combobox'] {
    opacity: 0.5;
    outline: none;
  }

  :host .enabled:is(.open, :focus-within) [part~='combobox'] {
    outline-color: var(--wa-color-focus);
  }

  /** The popup */
  .combobox-popup {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;

    /* Pass through from combobox to the popup */
    --show-duration: inherit;
    --hide-duration: inherit;

    &::part(popup) {
      z-index: 900;
    }

    &[data-current-placement^='top']::part(popup) {
      transform-origin: bottom;
    }

    &[data-current-placement^='bottom']::part(popup) {
      transform-origin: top;
    }
  }

  /* Combobox container */
  .combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    align-items: center;
    justify-content: start;

    min-height: var(--wa-form-control-height);

    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    color: var(--wa-form-control-value-color);
    cursor: text;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    overflow: hidden;
    padding: 0 var(--wa-form-control-padding-inline);
    position: relative;
    vertical-align: middle;
    transition:
      background-color var(--wa-transition-normal),
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);

    /* Pills */
    :host([pill]) & {
      border-radius: var(--wa-border-radius-pill);
    }

    :host([pill][multiple]) & {
      border-radius: 1.4em;
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .combobox {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .combobox {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .combobox {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  /* The editable input */
  .combobox-input {
    position: relative;
    flex: 1 1 auto;
    width: auto;
    min-width: 50px;
    min-height: 1.5lh;
    font: inherit;
    border: none;
    background: none;
    line-height: var(--wa-form-control-value-line-height);
    color: var(--wa-form-control-value-color);
    cursor: text;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
    }
  }

  /* Manage spacing when tags are present */
  :host([multiple]) {
    --_padding-with-tags: calc(var(--wa-form-control-height) * 0.1 - var(--wa-form-control-border-width));

    & .combobox:has(.tags wa-tag) {
      padding-block: var(--_padding-with-tags);
      padding-inline-start: var(--_padding-with-tags);

      /* Share input space with tags */
      & .combobox-input {
        flex: 1 1 auto;
        min-width: 10em;
        margin-inline-start: 0.25em;
      }
    }
  }

  .value-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    padding: 0;
    margin: 0;
  }

  .tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.25em;
  }

  .tags wa-tag {
    cursor: pointer;
  }

  .disabled .tags,
  .disabled .tags wa-tag {
    cursor: not-allowed;
  }

  /* Start and End */
  .start,
  .end {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
  }

  .end::slotted(*) {
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  .start::slotted(*) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  :host([multiple]) .combobox:has(.tags wa-tag) .start::slotted(*) {
    margin-inline-start: calc(var(--wa-form-control-padding-inline) - var(--_padding-with-tags));
  }

  /* Clear button */
  [part~='clear-button'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    background: none;
    padding: 0;
    transition: color var(--wa-transition-normal);
    cursor: pointer;
    margin-inline-start: var(--wa-form-control-padding-inline);

    &:focus {
      outline: none;
    }

    @media (hover: hover) {
      &:hover {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
      }
    }

    &:active {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
    }
  }

  /* Expand icon */
  .expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
    transition: rotate var(--wa-transition-slow) ease;
    rotate: 0deg;
    margin-inline-start: var(--wa-form-control-padding-inline);

    .open & {
      rotate: -180deg;
    }
  }

  /* Listbox */
  .listbox {
    display: block;
    position: relative;
    font: inherit;
    box-shadow: var(--wa-shadow-m);
    background: var(--wa-color-surface-raised);
    border-color: var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
    padding-block: 0.5em;
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);

    &::slotted(wa-divider) {
      --spacing: 0.5em;
    }
  }

  slot:not([name])::slotted(small) {
    display: block;
    font-size: var(--wa-font-size-smaller);
    font-weight: var(--wa-font-weight-semibold);
    color: var(--wa-color-text-quiet);
    padding-block: 0.5em;
    padding-inline: 2.25em;
  }

  /* Hide filtered-out elements */
  slot:not([name])::slotted([hidden]) {
    display: none !important;
  }

  /* Live region for screen reader announcements - visually hidden but accessible */
  .live-region {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* No results message could be added via CSS content in the future */
  .listbox:empty::before {
    content: attr(data-empty-message);
    display: block;
    padding: 0.5em 1em;
    color: var(--wa-color-text-quiet);
    font-style: italic;
  }
`;var ka=0;function Ps(){return`wa-combobox-option-${++ka}`}var A=class extends D{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.createOptionEl=null,this.hasInputSinceOpening=!1,this.hasSlotController=new N(this,"hint","label"),this.localize=new L(this),this.listboxId=`wa-combobox-listbox-${++ka}`,this.selectionOrder=new Map,this.slotChangePending=!1,this.cachedOptions=null,this.selectedOptions=[],this.filteredOptions=[],this.inputValue="",this.name="",this._defaultValue=null,this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.required=!1,this.allowCustomValue=!1,this.allowCreate=!1,this.filter=null,this.spellcheck=!1,this.getTag=t=>m`
        <wa-tag
          part="tag"
          exportparts="
            base:tag__base,
            content:tag__content,
            remove-button:tag__remove-button,
            remove-button__base:tag__remove-button__base
          "
          ?pill=${this.pill}
          size=${this.size}
          with-remove
          data-value=${t.value}
          @wa-remove=${e=>this.handleTagRemove(e,t)}
        >
          ${t.label}
        </wa-tag>
      `,this.handleDocumentFocusIn=t=>{let e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{let e=t.target,o=e.closest('[part~="clear-button"]')!==null,r=e.closest("wa-button")!==null;if(!(o||r)){if(t.key==="Escape"&&this.open&&ft(this)){t.preventDefault(),t.stopPropagation(),this.hide(),!this.multiple&&this.selectedOptions.length>0?this.inputValue=this.selectedOptions[0].label:this.multiple||(this.inputValue=""),this.comboboxInput.focus({preventScroll:!0});return}if(t.key==="Enter"){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}if(this.currentOption&&this.handleCreateOptionSelected(this.currentOption))return;this.currentOption&&!this.currentOption.disabled?(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?(this.toggleOptionSelection(this.currentOption),this.inputValue="",this.updateFilteredOptions()):(this.setSelectedOptions(this.currentOption),this.inputValue=this.currentOption.label),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.comboboxInput.focus({preventScroll:!0}))):this.allowCustomValue&&!this.multiple&&this.inputValue&&(this.value=this.inputValue,this.valueHasChanged=!0,this.hasInteracted=!0,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hide(),this.comboboxInput.focus({preventScroll:!0}));return}if(t.key==="Backspace"&&this.multiple&&!this.inputValue&&this.selectedOptions.length>0){t.preventDefault(),this.hasInteracted=!0,this.valueHasChanged=!0;let a=this.selectedOptions[this.selectedOptions.length-1];this.toggleOptionSelection(a,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))});return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){let a=this.getVisibleOptions(),n=a.indexOf(this.currentOption),l=Math.max(0,n);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(l=n+1,l>a.length-1&&(l=0)):t.key==="ArrowUp"?(l=n-1,l<0&&(l=a.length-1)):t.key==="Home"?l=0:t.key==="End"&&(l=a.length-1),a[l]&&(this.setCurrentOption(a[l]),this.announceOption(a[l]))}}},this.handleDocumentMouseDown=t=>{let e=t.composedPath();this&&!e.includes(this)&&this.hide()}}static get validators(){let t=[se({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...t]}rawValuesEqual(t,e){return t==null&&e==null?!0:t==null||e==null||t.length!==e.length?!1:t.every((o,r)=>o===e[r])}get validationTarget(){return this.valueInput}set defaultValue(t){this._defaultValue=this.convertDefaultValue(t)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}convertDefaultValue(t){return!(this.multiple||this.hasAttribute("multiple"))&&Array.isArray(t)&&(t=t[0]),t}set value(t){let e=this.value;t instanceof FormData&&(t=t.getAll(this.name)),t!=null&&!Array.isArray(t)&&(t=[t]);let o=this._value;this._value=t??null,this.rawValuesEqual(o,this._value)||(this.valueHasChanged=!0,this.requestUpdate("value",e))}get value(){let t=this._value??this.defaultValue??null;t!=null&&(t=Array.isArray(t)?t:[t]),this.optionValues=new Set(this.getRealOptions().filter(o=>!o.disabled).map(o=>o.value));let e=t;return t!=null&&(this.allowCustomValue?e=t:e=t.filter(o=>this.optionValues.has(o)),e=this.multiple?e:e[0],e=e??null),e}connectedCallback(){super.connectedCallback(),this.processSlotChange(),this.open=!1}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.removeCreateOption(),this.cachedOptions=null}updateDefaultValue(){let e=this.getRealOptions().filter(o=>o.hasAttribute("selected")||o.defaultSelected);if(e.length>0){let o=e.map(r=>r.value);this._defaultValue=this.multiple?o:o[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),kt(this),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),mt(this),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.comboboxInput.select()}handleBlur(){if(!this.multiple)if(!this.inputValue)this.value!==null&&(this.selectionOrder.clear(),this.setSelectedOptions([]),this.hasInteracted=!0,this.valueHasChanged=!0,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}));else if(this.allowCustomValue){let t=this.value;this.value=this.inputValue,this.hasInteracted=!0,this.value!==t&&(this.valueHasChanged=!0,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}else this.selectedOptions.length>0&&(this.inputValue=this.selectedOptions[0].label);this.open||this.removeCreateOption()}handleLabelClick(){this.comboboxInput.focus(),this.show()}handleComboboxClick(t){t.preventDefault()}handleComboboxMouseDown(t){let o=t.composedPath().some(r=>r instanceof Element&&r.tagName.toLowerCase()==="wa-button");this.disabled||o||(t.preventDefault(),this.comboboxInput.focus({preventScroll:!0}),!(!this.open&&this.getVisibleOptions().length===0&&!(this.allowCreate&&this.inputValue.trim()))&&(this.open=!this.open))}handleComboboxKeyDown(t){t.stopPropagation(),this.handleDocumentKeyDown(t)}handleInputChange(t){t.stopPropagation();let e=t.target;this.inputValue=e.value,this.hasInputSinceOpening=!0,this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.updateFilteredOptions();let o=this.getVisibleOptions(),r=o.length>0;this.inputValue.length>0&&(r&&!this.open?this.show():!r&&this.open&&this.hide()),r&&this.open&&this.setCurrentOption(o[0]),this.announceFilterResults()}handleClearClick(t){t.stopPropagation(),this.hasInteracted=!0,(this.value!==null||this.inputValue)&&(this.selectionOrder.clear(),this.setSelectedOptions([]),this.inputValue="",this.updateFilteredOptions(),this.comboboxInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new Fe),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){let o=t.target.closest("wa-option");if(o&&!o.disabled){if(this.handleCreateOptionSelected(o)){this.updateComplete.then(()=>this.comboboxInput.focus({preventScroll:!0}));return}this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?(this.toggleOptionSelection(o),this.inputValue="",this.updateFilteredOptions()):(this.setSelectedOptions(o),this.inputValue=o.label),this.updateComplete.then(()=>this.comboboxInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.comboboxInput.focus({preventScroll:!0}))}}handleDefaultSlotChange(){this.slotChangePending||(this.slotChangePending=!0,queueMicrotask(()=>{this.slotChangePending=!1,this.processSlotChange()}))}processSlotChange(){!!1&&!customElements.get("wa-option")&&customElements.whenDefined("wa-option").then(()=>this.handleDefaultSlotChange()),this.cachedOptions=null;let t=this.getAllOptions();t.forEach(r=>{r.id||(r.id=Ps())}),this.updateDefaultValue();let e=this.value;if(e==null||!this.valueHasChanged&&!this.hasInteracted){this.selectionChanged(),this.open||this.updateFilteredOptions({skipCreateOption:!0});return}Array.isArray(e)||(e=[e]);let o=t.filter(r=>e.includes(r.value));this.setSelectedOptions(o),this.open||this.updateFilteredOptions({skipCreateOption:!0})}handleTagRemove(t,e){if(t.stopPropagation(),this.disabled)return;this.hasInteracted=!0,this.valueHasChanged=!0;let o=e;if(!o){let r=t.target.closest("wa-tag[data-value]");if(r){let a=r.dataset.value;o=this.selectedOptions.find(n=>n.value===a)}}o&&(this.toggleOptionSelection(o,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this.cachedOptions?this.cachedOptions:this?.querySelectorAll?(this.cachedOptions=[...this.querySelectorAll("wa-option")],this.cachedOptions):[]}getRealOptions(){return this.getAllOptions().filter(t=>!t.hasAttribute("data-create-option"))}updateCreateOption(){if(!this.allowCreate){this.removeCreateOption();return}let t=this.inputValue.trim(),o=this.getRealOptions().some(r=>r.label.toLowerCase()===t.toLowerCase());t&&!o?(this.createOptionEl||(this.createOptionEl=document.createElement("wa-option"),this.createOptionEl.setAttribute("data-create-option","")),this.createOptionEl.value=t,this.createOptionEl.textContent=this.localize.term("createOption",t),this.createOptionEl.hidden=!1,this.createOptionEl.parentElement!==this&&this.prepend(this.createOptionEl)):this.removeCreateOption()}removeCreateOption(){this.createOptionEl&&(this.createOptionEl.remove(),this.createOptionEl=null)}handleCreateOptionSelected(t){if(!t.hasAttribute("data-create-option"))return!1;let e=this.createOptionEl?.value||this.inputValue.trim(),o=new xa({inputValue:e});if(this.dispatchEvent(o),o.defaultPrevented)return this.removeCreateOption(),!0;this.removeCreateOption();let r=document.createElement("wa-option");return r.value=e,r.textContent=e,this.prepend(r),this.cachedOptions=null,this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?(this.toggleOptionSelection(r,!0),this.inputValue="",this.updateFilteredOptions(),this.setCurrentOption(r)):(this.setSelectedOptions(r),this.inputValue=e),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.comboboxInput.focus({preventScroll:!0})),!0}getVisibleOptions(){return!!this.inputValue&&this.hasInputSinceOpening?this.filteredOptions.filter(e=>!e.disabled):this.getAllOptions().filter(e=>!e.disabled)}getFirstVisibleOption(){return this.getVisibleOptions()[0]}updateFilteredOptions({skipCreateOption:t=!1}={}){let e=this.getAllOptions(),o=!!this.inputValue&&this.hasInputSinceOpening;if(this.querySelectorAll(":scope > :not(wa-option)").forEach(a=>{a.hidden=o}),!o){this.filteredOptions=e,e.forEach(a=>{a.hidden=!1}),t||this.updateCreateOption(),this.createOptionEl&&!this.createOptionEl.hidden&&this.filteredOptions.unshift(this.createOptionEl);return}let r=this.inputValue.toLowerCase();this.filteredOptions=e.filter(a=>{if(a.hasAttribute("data-create-option"))return!1;let n;return this.filter?n=this.filter(a,this.inputValue):n=a.label.toLowerCase().includes(r),a.hidden=!n,n}),this.querySelectorAll(":scope > :not(wa-option):not(wa-divider)").forEach(a=>{let n=!1,l=a.nextElementSibling;for(;l&&!(!l.matches("wa-option")&&!l.matches("wa-divider"));){if(l.matches("wa-option")&&!l.hidden){n=!0;break}l=l.nextElementSibling}a.hidden=!n}),this.querySelectorAll(":scope > wa-divider").forEach(a=>{let n=!1,l=!1,c=a.previousElementSibling;for(;c;){if(c.matches("wa-option")&&!c.hidden){n=!0;break}c=c.previousElementSibling}for(c=a.nextElementSibling;c;){if(c.matches("wa-option")&&!c.hidden){l=!0;break}c=c.nextElementSibling}a.hidden=!n||!l}),t||this.updateCreateOption(),this.createOptionEl&&!this.createOptionEl.hidden&&this.filteredOptions.unshift(this.createOptionEl)}setCurrentOption(t){this.getAllOptions().forEach(o=>{o.current=!1,o.tabIndex=-1}),t?(this.currentOption=t,t.current=!0,t.tabIndex=0,t.id&&this.comboboxInput?.setAttribute("aria-activedescendant",t.id),ie(t,this.listbox,"vertical","auto")):this.comboboxInput?.removeAttribute("aria-activedescendant")}setSelectedOptions(t){let e=this.getAllOptions(),o=Array.isArray(t)?t:[t];e.forEach(r=>{o.includes(r)||(r.selected=!1)}),o.length&&o.forEach(r=>r.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){e===!0||e===!1?t.selected=e:t.selected=!t.selected,this.selectionChanged()}announceOption(t){if(this.liveRegion){let e=this.getVisibleOptions().indexOf(t)+1,o=this.getVisibleOptions().length;this.liveRegion.textContent=`${t.label}, ${e} of ${o}`}}announceFilterResults(){if(this.liveRegion){let t=this.getVisibleOptions().length;t===0?this.liveRegion.textContent=this.localize.term("numOptionsSelected",0)||"No options available":this.liveRegion.textContent=`${t} option${t===1?"":"s"} available`}}selectionChanged(){let e=this.getAllOptions().filter(l=>{if(!this.hasInteracted&&!this.valueHasChanged){let c=this.defaultValue,d=Array.isArray(c)?c:[c];return l.hasAttribute("selected")||l.defaultSelected||l.selected||d?.includes(l.value)}return l.selected}),o=new Set(e.map(l=>l.value));for(let l of this.selectionOrder.keys())o.has(l)||this.selectionOrder.delete(l);let a=(this.selectionOrder.size>0?Math.max(...this.selectionOrder.values()):-1)+1;for(let l of e)this.selectionOrder.has(l.value)||this.selectionOrder.set(l.value,a++);this.selectedOptions=e.sort((l,c)=>{let d=this.selectionOrder.get(l.value)??0,p=this.selectionOrder.get(c.value)??0;return d-p});let n=new Set(this.selectedOptions.map(l=>l.value));if(n.size>0||this._value){let l=this._value;if(this._value==null){let c=this.defaultValue??[];this._value=Array.isArray(c)?c:[c]}this._value=this._value?.filter(c=>!this.optionValues?.has(c))??null,this._value?.unshift(...n),this.requestUpdate("value",l)}if(!this.multiple&&this.selectedOptions.length>0){let l=this.comboboxInput&&this.matches(":focus-within");(!this.hasInteracted||!this.inputValue&&!l)&&(this.inputValue=this.selectedOptions[0].label)}this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){let o=this.getTag(t,e);return o?typeof o=="string"?Oe(o):o:null}else if(e===this.maxOptionsVisible)return m`
          <wa-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
            ?pill=${this.pill}
            size=${this.size}
            >+${this.selectedOptions.length-e}</wa-tag
          >
        `;return null})}updated(t){super.updated(t),(t.has("value")||t.has("inputValue"))&&this.customStates.set("blank",!this.value&&!this.inputValue),t.has("disabled")&&this.customStates.set("disabled",this.disabled)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){let t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value],o=t.filter(r=>e.includes(r.value));this.setSelectedOptions(o),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.hasInputSinceOpening=!1,this.setCurrentOption(this.selectedOptions[0]||this.getFirstVisibleOption()),this.updateFilteredOptions();let t=new dt;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await U(this.popup.popup,"show"),this.currentOption&&ie(this.currentOption,this.listbox,"vertical","auto"),this.announceFilterResults(),this.dispatchEvent(new ut)}else{let t=new ht;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!0;return}this.removeOpenListeners(),await U(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.comboboxInput?.removeAttribute("aria-activedescendant"),this.removeCreateOption(),this.dispatchEvent(new pt)}}async show(){if(this.open||this.disabled){this.open=!1;return}if(!(this.getVisibleOptions().length===0&&!(this.allowCreate&&this.inputValue.trim())))return this.open=!0,St(this,"wa-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,St(this,"wa-after-hide")}focus(t){this.comboboxInput.focus(t)}blur(){this.comboboxInput.blur()}formResetCallback(){this.selectionOrder.clear(),this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),!this.multiple&&this.selectedOptions.length>0?this.inputValue=this.selectedOptions[0].label:this.inputValue="",this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){let t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,o=this.label?!0:!!t,r=this.hint?!0:!!e,a=(this.hasUpdated||!1)&&this.withClear&&!this.disabled&&(this.value&&(Array.isArray(this.value)?this.value.length>0:!0)||this.inputValue);return m`
      <div
        part="form-control"
        class=${C({"form-control":!0,"form-control-has-label":o})}
      >
        <label
          id="label"
          part="form-control-label label"
          class=${C({label:!0,"has-label":o})}
          aria-hidden=${o?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${C({"combobox-popup":!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple})}
            placement=${this.placement}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
              @click=${this.handleComboboxClick}
            >
              <slot part="start" name="start" class="start"></slot>

              ${this.multiple&&this.hasUpdated?m`
                    <div part="tags" class="tags" @wa-remove=${this.handleTagRemove}>
                      ${this.tags}
                      <input
                        part="combobox-input"
                        class="combobox-input"
                        type="text"
                        placeholder=${this.placeholder}
                        .disabled=${this.disabled}
                        .value=${this.inputValue}
                        ?required=${this.required}
                        autocomplete="off"
                        autocapitalize=${x(this.autocapitalize)}
                        autocorrect=${this.autocorrect?"on":"off"}
                        spellcheck=${this.spellcheck}
                        inputmode=${x(this.inputmode)}
                        enterkeyhint=${x(this.enterkeyhint)}
                        role="combobox"
                        aria-autocomplete="list"
                        aria-controls=${this.listboxId}
                        aria-expanded=${this.open?"true":"false"}
                        aria-haspopup="listbox"
                        aria-labelledby="label"
                        aria-disabled=${this.disabled?"true":"false"}
                        aria-describedby="hint"
                        aria-invalid=${!this.validity.valid}
                        tabindex="0"
                        @input=${this.handleInputChange}
                        @focus=${this.handleFocus}
                        @blur=${this.handleBlur}
                      />
                    </div>
                  `:m`
                    <input
                      part="combobox-input"
                      class="combobox-input"
                      type="text"
                      placeholder=${this.placeholder}
                      .disabled=${this.disabled}
                      .value=${this.inputValue}
                      ?required=${this.required}
                      autocomplete="off"
                      autocapitalize=${x(this.autocapitalize)}
                      autocorrect=${this.autocorrect?"on":"off"}
                      spellcheck=${this.spellcheck}
                      inputmode=${x(this.inputmode)}
                      enterkeyhint=${x(this.enterkeyhint)}
                      role="combobox"
                      aria-autocomplete="list"
                      aria-controls=${this.listboxId}
                      aria-expanded=${this.open?"true":"false"}
                      aria-haspopup="listbox"
                      aria-labelledby="label"
                      aria-disabled=${this.disabled?"true":"false"}
                      aria-describedby="hint"
                      aria-invalid=${!this.validity.valid}
                      tabindex="0"
                      @input=${this.handleInputChange}
                      @focus=${this.handleFocus}
                      @blur=${this.handleBlur}
                    />
                  `}

              <input
                class="value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value??""}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
              />

              ${a?m`
                    <button
                      part="clear-button"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                      </slot>
                    </button>
                  `:W}

              <slot name="end" part="end" class="end"></slot>

              <slot name="expand-icon" part="expand-icon" class="expand-icon">
                <wa-icon library="system" name="chevron-down" variant="solid"></wa-icon>
              </slot>
            </div>

            <div
              id=${this.listboxId}
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
            >
              <slot @slotchange=${this.handleDefaultSlotChange}></slot>
            </div>
          </wa-popup>

          <!-- Live region for screen reader announcements -->
          <div class="live-region" aria-live="polite" aria-atomic="true"></div>
        </div>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${C({"has-slotted":r})}
          aria-hidden=${r?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};A.css=[Ca,K,B];i([g(".combobox-popup")],A.prototype,"popup",2);i([g(".combobox")],A.prototype,"combobox",2);i([g(".combobox-input")],A.prototype,"comboboxInput",2);i([g(".value-input")],A.prototype,"valueInput",2);i([g(".listbox")],A.prototype,"listbox",2);i([g(".live-region")],A.prototype,"liveRegion",2);i([_()],A.prototype,"currentOption",2);i([_()],A.prototype,"selectedOptions",2);i([_()],A.prototype,"filteredOptions",2);i([_()],A.prototype,"inputValue",2);i([s({reflect:!0})],A.prototype,"name",2);i([s({attribute:!1})],A.prototype,"defaultValue",1);i([s({attribute:"value",reflect:!1})],A.prototype,"value",1);i([s({reflect:!0})],A.prototype,"size",2);i([s()],A.prototype,"placeholder",2);i([s({type:Boolean,reflect:!0})],A.prototype,"multiple",2);i([s({attribute:"max-options-visible",type:Number})],A.prototype,"maxOptionsVisible",2);i([s({type:Boolean})],A.prototype,"disabled",2);i([s({attribute:"with-clear",type:Boolean})],A.prototype,"withClear",2);i([s({type:Boolean,reflect:!0})],A.prototype,"open",2);i([s({reflect:!0})],A.prototype,"appearance",2);i([s({type:Boolean,reflect:!0})],A.prototype,"pill",2);i([s()],A.prototype,"label",2);i([s({reflect:!0})],A.prototype,"placement",2);i([s({attribute:"hint"})],A.prototype,"hint",2);i([s({attribute:"with-label",type:Boolean})],A.prototype,"withLabel",2);i([s({attribute:"with-hint",type:Boolean})],A.prototype,"withHint",2);i([s({type:Boolean,reflect:!0})],A.prototype,"required",2);i([s({attribute:"allow-custom-value",type:Boolean})],A.prototype,"allowCustomValue",2);i([s({attribute:"allow-create",type:Boolean})],A.prototype,"allowCreate",2);i([s({attribute:!1})],A.prototype,"filter",2);i([s()],A.prototype,"autocapitalize",2);i([s({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="off"),toAttribute:t=>t?"on":"off"}})],A.prototype,"autocorrect",2);i([s()],A.prototype,"inputmode",2);i([s()],A.prototype,"enterkeyhint",2);i([s({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],A.prototype,"spellcheck",2);i([s({attribute:!1})],A.prototype,"getTag",2);i([S("disabled",{waitUntilFirstUpdate:!0})],A.prototype,"handleDisabledChange",1);i([S("value",{waitUntilFirstUpdate:!0})],A.prototype,"handleValueChange",1);i([S("open",{waitUntilFirstUpdate:!0})],A.prototype,"handleOpenChange",1);A=i([w("wa-combobox")],A);var Sa=v`
  :host {
    --max-width: 30ch;

    /** These styles are added so we don't interfere in the DOM. */
    display: inline-block;
    position: absolute;

    /** Defaults for inherited CSS properties */
    color: var(--wa-tooltip-content-color);
    font-size: var(--wa-tooltip-font-size);
    line-height: var(--wa-tooltip-line-height);
    text-align: start;
    white-space: normal;
  }

  .tooltip {
    --arrow-size: var(--wa-tooltip-arrow-size);
    --arrow-color: var(--wa-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: 1000;
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--wa-tooltip-border-radius);
    background-color: var(--wa-tooltip-background-color);
    border: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    padding: 0.25em 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  .tooltip {
    --popup-border-width: var(--wa-tooltip-border-width);

    &::part(arrow) {
      border-bottom: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
      border-right: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    }
  }
`;var Y=class extends k{constructor(){super(...arguments),this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&ft(this)&&(t.preventDefault(),t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){let t=!!this.anchor?.matches(":hover"),e=this.matches(":hover");if(t||e)return;clearTimeout(this.hoverTimeout),t||e||(this.hoverTimeout=window.setTimeout(()=>{this.hide()},this.hideDelay))}}}connectedCallback(){super.connectedCallback(),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.addEventListener("mouseout",this.handleMouseOut),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=Ve("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),mt(this),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}addToAriaLabelledBy(t,e){let r=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);r.includes(e)||(r.push(e),t.setAttribute("aria-labelledby",r.join(" ")))}removeFromAriaLabelledBy(t,e){let a=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(n=>n!==e);a.length>0?t.setAttribute("aria-labelledby",a.join(" ")):t.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;let t=new dt;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),kt(this),this.body.hidden=!1,this.popup.active=!0,await U(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new ut)}else{let t=new ht;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),mt(this),await U(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new pt)}}handleForChange(){let t=this.getRootNode();if(!t)return;let e=this.for?t.getElementById(this.for):null,o=this.anchor;if(e===o)return;let{signal:r}=this.eventController;e&&(this.addToAriaLabelledBy(e,this.id),e.addEventListener("blur",this.handleBlur,{capture:!0,signal:r}),e.addEventListener("focus",this.handleFocus,{capture:!0,signal:r}),e.addEventListener("click",this.handleClick,{signal:r}),e.addEventListener("mouseover",this.handleMouseOver,{signal:r}),e.addEventListener("mouseout",this.handleMouseOut,{signal:r})),o&&(this.removeFromAriaLabelledBy(o,this.id),o.removeEventListener("blur",this.handleBlur,{capture:!0}),o.removeEventListener("focus",this.handleFocus,{capture:!0}),o.removeEventListener("click",this.handleClick),o.removeEventListener("mouseover",this.handleMouseOver),o.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=e}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,St(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,St(this,"wa-after-hide")}render(){return m`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${C({tooltip:!0,"tooltip-open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        flip
        shift
        ?arrow=${!this.withoutArrow}
        hover-bridge
        .anchor=${this.anchor}
      >
        <div part="body" class="body">
          <slot></slot>
        </div>
      </wa-popup>
    `}};Y.css=Sa;Y.dependencies={"wa-popup":P};i([g("slot:not([name])")],Y.prototype,"defaultSlot",2);i([g(".body")],Y.prototype,"body",2);i([g("wa-popup")],Y.prototype,"popup",2);i([s()],Y.prototype,"placement",2);i([s({type:Boolean,reflect:!0})],Y.prototype,"disabled",2);i([s({type:Number})],Y.prototype,"distance",2);i([s({type:Boolean,reflect:!0})],Y.prototype,"open",2);i([s({type:Number})],Y.prototype,"skidding",2);i([s({attribute:"show-delay",type:Number})],Y.prototype,"showDelay",2);i([s({attribute:"hide-delay",type:Number})],Y.prototype,"hideDelay",2);i([s()],Y.prototype,"trigger",2);i([s({attribute:"without-arrow",type:Boolean,reflect:!0})],Y.prototype,"withoutArrow",2);i([s()],Y.prototype,"for",2);i([_()],Y.prototype,"anchor",2);i([S("open",{waitUntilFirstUpdate:!0})],Y.prototype,"handleOpenChange",1);i([S("for")],Y.prototype,"handleForChange",1);i([S(["distance","placement","skidding"])],Y.prototype,"handleOptionsChange",1);i([S("disabled")],Y.prototype,"handleDisabledChange",1);Y=i([w("wa-tooltip")],Y);var Ea=v`
  :host {
    --height: var(--wa-form-control-toggle-size);
    --width: calc(var(--height) * 1.75);
    --thumb-size: 0.75em;

    display: inline-flex;
    line-height: var(--wa-form-control-value-line-height);
  }

  label {
    position: relative;
    display: flex;
    align-items: center;
    font: inherit;
    color: var(--wa-form-control-value-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch {
    flex: 0 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--height);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    transition-property: translate, background, border-color, box-shadow;
    transition-duration: var(--wa-transition-normal);
    transition-timing-function: var(--wa-transition-easing);
  }

  .switch .thumb {
    aspect-ratio: 1 / 1;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--wa-form-control-border-color);
    border-radius: 50%;
    translate: calc((var(--width) - var(--height)) / -2);
    transition: inherit;
  }

  .input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Focus */
  label:not(.disabled) .input:focus-visible ~ .switch .thumb {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Checked */
  .checked .switch {
    background-color: var(--wa-form-control-activated-color);
    border-color: var(--wa-form-control-activated-color);
  }

  .checked .switch .thumb {
    background-color: var(--wa-color-surface-default);
    translate: calc((var(--width) - var(--height)) / 2);
  }

  /* Disabled */
  label:has(> :disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [part~='label'] {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) [part~='label']::after {
    content: var(--wa-form-control-required-content);
    color: var(--wa-form-control-required-content-color);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }

  @media (forced-colors: active) {
    :checked:enabled + .switch:hover .thumb,
    :checked + .switch .thumb {
      background-color: ButtonText;
    }
  }
`;var Q=class extends D{constructor(){super(...arguments),this.hasSlotController=new N(this,"hint"),this.title="",this.name=null,this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this._checked=null,this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint="",this.withHint=!1}static get validators(){return[...super.validators,Pt()]}get value(){return this._value??"on"}set value(t){this._value=t}get checked(){return this.valueHasChanged?!!this._checked:this._checked??this.defaultChecked}set checked(t){this._checked=!!t,this.valueHasChanged=!0}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleKeyDown(t){t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=!0,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}willUpdate(t){super.willUpdate(t),(t.has("value")||t.has("checked")||t.has("defaultChecked"))&&this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked),this.customStates.set("checked",this.checked),this.updateValidity()}handleDisabledChange(){this.updateValidity()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}setValue(t,e){if(!this.checked){this.internals.setFormValue(null,null);return}this.internals.setFormValue(t??"on",e)}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}render(){let t=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,e=this.hint?!0:!!t;return m`
      <label
        part="base"
        class=${C({checked:this.checked,disabled:this.disabled})}
      >
        <input
          class="input"
          type="checkbox"
          title=${this.title}
          name=${x(this.name)}
          value=${x(this.value)}
          .checked=${wt(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="switch"
          aria-checked=${this.checked?"true":"false"}
          aria-describedby="hint"
          @click=${this.handleClick}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch">
          <span part="thumb" class="thumb"></span>
        </span>

        <slot part="label" class="label"></slot>
      </label>

      <slot
        id="hint"
        name="hint"
        part="hint"
        class=${C({"has-slotted":e})}
        aria-hidden=${e?"false":"true"}
        >${this.hint}</slot
      >
    `}};Q.shadowRootOptions={...D.shadowRootOptions,delegatesFocus:!0};Q.css=[K,B,Ea];i([g('input[type="checkbox"]')],Q.prototype,"input",2);i([s()],Q.prototype,"title",2);i([s({reflect:!0})],Q.prototype,"name",2);i([s({reflect:!0})],Q.prototype,"value",1);i([s({reflect:!0})],Q.prototype,"size",2);i([s({type:Boolean})],Q.prototype,"disabled",2);i([s({type:Boolean,attribute:!1})],Q.prototype,"checked",1);i([s({type:Boolean,attribute:"checked",reflect:!0})],Q.prototype,"defaultChecked",2);i([s({type:Boolean,reflect:!0})],Q.prototype,"required",2);i([s({attribute:"hint"})],Q.prototype,"hint",2);i([s({attribute:"with-hint",type:Boolean})],Q.prototype,"withHint",2);i([S(["checked","defaultChecked"])],Q.prototype,"handleStateChange",1);i([S("disabled",{waitUntilFirstUpdate:!0})],Q.prototype,"handleDisabledChange",1);Q=i([w("wa-switch")],Q);Q.disableWarning?.("change-in-update");var Aa=v`
  :host {
    --pulse-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));

    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.375em 0.625em;
    color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
    font-size: max(var(--wa-font-size-3xs), 0.75em);
    font-weight: var(--wa-font-weight-semibold);
    line-height: 1;
    vertical-align: middle;
    white-space: nowrap;
    background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
    border-color: transparent;
    border-radius: var(--wa-border-radius-s);
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) {
    --pulse-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));

    color: var(--wa-color-on-quiet, var(--wa-color-brand-on-quiet));
    background-color: transparent;
    border-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));
  }

  :host([appearance='filled']) {
    --pulse-color: var(--wa-color-fill-normal, var(--wa-color-brand-fill-normal));

    color: var(--wa-color-on-normal, var(--wa-color-brand-on-normal));
    background-color: var(--wa-color-fill-normal, var(--wa-color-brand-fill-normal));
    border-color: transparent;
  }

  :host([appearance='filled-outlined']) {
    --pulse-color: var(--wa-color-border-normal, var(--wa-color-brand-border-normal));

    color: var(--wa-color-on-normal, var(--wa-color-brand-on-normal));
    background-color: var(--wa-color-fill-normal, var(--wa-color-brand-fill-normal));
    border-color: var(--wa-color-border-normal, var(--wa-color-brand-border-normal));
  }

  :host([appearance='accent']) {
    --pulse-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));

    color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
    background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
    border-color: transparent;
  }

  /* Pill modifier */
  :host([pill]) {
    border-radius: var(--wa-border-radius-pill);
  }

  /* Pulse attention */
  :host([attention='pulse']) {
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  /* Bounce attention */
  :host([attention='bounce']) {
    animation: bounce 1s cubic-bezier(0.28, 0.84, 0.42, 1) infinite;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-5px);
    }
    60% {
      transform: translateY(-2px);
    }
  }

  /* Slots */
  slot[name='start']::slotted(*) {
    margin-inline-end: 0.375em;
  }

  slot[name='end']::slotted(*) {
    margin-inline-start: 0.375em;
  }
`;var le=class extends k{constructor(){super(...arguments),this.variant="brand",this.appearance="accent",this.pill=!1,this.attention="none"}render(){return m`
      <span part="start">
        <slot name="start"></slot>
      </span>

      <span part="base" role="status">
        <slot></slot>
      </span>

      <span part="end">
        <slot name="end"></slot>
      </span>
    `}};le.css=[ae,Aa];i([s({reflect:!0})],le.prototype,"variant",2);i([s({reflect:!0})],le.prototype,"appearance",2);i([s({type:Boolean,reflect:!0})],le.prototype,"pill",2);i([s({reflect:!0})],le.prototype,"attention",2);le=i([w("wa-badge")],le);var _a=class extends Event{constructor(t){super("wa-tab-hide",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var $a=class extends Event{constructor(t){super("wa-tab-show",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Oa=v`
  :host {
    --indicator-color: var(--wa-color-brand-fill-loud);
    --track-color: var(--wa-color-neutral-fill-normal);
    --track-width: 0.125rem;

    /* Private */
    --safe-track-width: max(0.5px, round(var(--track-width), 0.5px));

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tabs {
    display: flex;
    position: relative;
  }

  .indicator {
    position: absolute;
  }

  .tab-group-has-scroll-controls .nav-container {
    position: relative;
    padding: 0 1.5em;
  }

  .body {
    display: block;
  }

  .scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1.5em;
  }

  .scroll-button-start {
    inset-inline-start: 0;
  }

  .scroll-button-end {
    inset-inline-end: 0;
  }

  /*
    * Top
    */

  .tab-group-top {
    flex-direction: column;
  }

  .tab-group-top .nav-container {
    order: 1;
  }

  .tab-group-top .nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group-top .nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group-top .tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--safe-track-width) var(--track-color);
  }

  .tab-group-top .indicator {
    bottom: calc(-1 * var(--safe-track-width));
    border-bottom: solid var(--safe-track-width) var(--indicator-color);
  }

  .tab-group-top .body {
    order: 2;
  }

  .tab-group-top ::slotted(wa-tab[active]) {
    border-block-end: solid var(--safe-track-width) var(--indicator-color);
    margin-block-end: calc(-1 * var(--safe-track-width));
  }

  .tab-group-top .body slot::slotted(wa-tab-panel) {
    --padding: var(--wa-space-xl) 0;
  }

  /*
    * Bottom
    */

  .tab-group-bottom {
    flex-direction: column;
  }

  .tab-group-bottom .nav-container {
    order: 2;
  }

  .tab-group-bottom .nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group-bottom .nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group-bottom .tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--safe-track-width) var(--track-color);
  }

  .tab-group-bottom .indicator {
    top: calc(-1 * var(--safe-track-width));
    border-top: solid var(--safe-track-width) var(--indicator-color);
  }

  .tab-group-bottom .body {
    order: 1;
  }

  .tab-group-bottom ::slotted(wa-tab[active]) {
    border-block-start: solid var(--safe-track-width) var(--indicator-color);
    margin-block-start: calc(-1 * var(--safe-track-width));
  }

  .tab-group-bottom .body slot::slotted(wa-tab-panel) {
    --padding: var(--wa-space-xl) 0;
  }

  /*
    * Start
    */

  .tab-group-start {
    flex-direction: row;
  }

  .tab-group-start .nav-container {
    order: 1;
  }

  .tab-group-start .tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--safe-track-width) var(--track-color);
  }

  .tab-group-start .indicator {
    inset-inline-end: calc(-1 * var(--safe-track-width));
    border-right: solid var(--safe-track-width) var(--indicator-color);
  }

  .tab-group-start .body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group-start ::slotted(wa-tab[active]) {
    border-inline-end: solid var(--safe-track-width) var(--indicator-color);
    margin-inline-end: calc(-1 * var(--safe-track-width));
  }

  .tab-group-start .body slot::slotted(wa-tab-panel) {
    --padding: 0 var(--wa-space-xl);
  }

  /*
    * End
    */

  .tab-group-end {
    flex-direction: row;
  }

  .tab-group-end .nav-container {
    order: 2;
  }

  .tab-group-end .tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--safe-track-width) var(--track-color);
  }

  .tab-group-end .indicator {
    inset-inline-start: calc(-1 * var(--safe-track-width));
    border-inline-start: solid var(--safe-track-width) var(--indicator-color);
  }

  .tab-group-end .body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group-end ::slotted(wa-tab[active]) {
    border-inline-start: solid var(--safe-track-width) var(--indicator-color);
    margin-inline-start: calc(-1 * var(--safe-track-width));
  }

  .tab-group-end .body slot::slotted(wa-tab-panel) {
    --padding: 0 var(--wa-space-xl);
  }
`;var gt=class extends k{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new L(this),this.hasScrollControls=!1,this.active="",this.placement="top",this.activation="auto",this.withoutScrollControls=!1}connectedCallback(){super.connectedCallback(),!!1&&(this.resizeObserver=new ResizeObserver(()=>{this.updateScrollControls()}),this.mutationObserver=new MutationObserver(t=>{t.some(o=>!["aria-labelledby","aria-controls"].includes(o.attributeName))&&setTimeout(()=>this.setAriaLabels());let e=t.filter(o=>o.target.closest("wa-tab-group")===this);if(e.some(o=>o.attributeName==="disabled"))this.syncTabsAndPanels();else if(e.some(o=>o.attributeName==="active")){let r=e.filter(a=>a.attributeName==="active"&&a.target.tagName.toLowerCase()==="wa-tab").map(a=>a.target).find(a=>a.active);r&&r.closest("wa-tab-group")===this&&this.setActiveTab(r)}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),new IntersectionObserver((e,o)=>{if(e[0].intersectionRatio>0){if(this.setAriaLabels(),this.active){let r=this.tabs.find(a=>a.panel===this.active);r&&this.setActiveTab(r)}else this.setActiveTab(this.getActiveTab()??this.tabs[0],{emitEvents:!1});o.unobserve(e[0].target)}}).observe(this.tabGroup)}))}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect(),this.nav&&this.resizeObserver?.unobserve(this.nav)}getAllTabs(){return[...this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()].filter(e=>e.tagName.toLowerCase()==="wa-tab")}getAllPanels(){return[...this.defaultSlot.assignedElements()].filter(t=>t.tagName.toLowerCase()==="wa-tab-panel")}getActiveTab(){return this.tabs.find(t=>t.active)}handleClick(t){let o=t.target.closest("wa-tab");o?.closest("wa-tab-group")===this&&o!==null&&this.setActiveTab(o,{scrollBehavior:"smooth"})}handleKeyDown(t){let o=t.target.closest("wa-tab");if(o?.closest("wa-tab-group")===this){if(["Enter"," "].includes(t.key)){o!==null&&(this.setActiveTab(o,{scrollBehavior:"smooth"}),t.preventDefault());return}if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key)){let a=this.tabs.find(c=>c.matches(":focus")),n=this.localize.dir()==="rtl",l=null;if(a?.tagName.toLowerCase()==="wa-tab"){if(t.key==="Home")l=this.focusableTabs[0];else if(t.key==="End")l=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&t.key===(n?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&t.key==="ArrowUp"){let c=this.tabs.findIndex(d=>d===a);l=this.findNextFocusableTab(c,"backward")}else if(["top","bottom"].includes(this.placement)&&t.key===(n?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&t.key==="ArrowDown"){let c=this.tabs.findIndex(d=>d===a);l=this.findNextFocusableTab(c,"forward")}if(!l)return;l.tabIndex=0,l.focus({preventScroll:!0}),this.activation==="auto"?this.setActiveTab(l,{scrollBehavior:"smooth"}):this.tabs.forEach(c=>{c.tabIndex=c===l?0:-1}),["top","bottom"].includes(this.placement)&&ie(l,this.nav,"horizontal"),t.preventDefault()}}}}findNextFocusableTab(t,e){let o=null,r=e==="forward"?1:-1,a=t+r;for(;t<this.tabs.length;){if(o=this.tabs[a]||null,o===null){e==="forward"?o=this.focusableTabs[0]:o=this.focusableTabs[this.focusableTabs.length-1];break}if(!o.disabled)break;a+=r}return o}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(t,e){if(e={emitEvents:!0,scrollBehavior:"auto",...e},t.closest("wa-tab-group")===this&&t!==this.activeTab&&!t.disabled){let o=this.activeTab;this.active=t.panel,this.activeTab=t,this.tabs.forEach(r=>{r.active=r===this.activeTab,r.tabIndex=r===this.activeTab?0:-1}),this.panels.forEach(r=>r.active=r.name===this.activeTab?.panel),["top","bottom"].includes(this.placement)&&ie(this.activeTab,this.nav,"horizontal",e.scrollBehavior),e.emitEvents&&(o&&this.dispatchEvent(new _a({name:o.panel})),this.dispatchEvent(new $a({name:this.activeTab.panel})))}}setAriaLabels(){this.tabs.forEach(t=>{let e=this.panels.find(o=>o.name===t.panel);e&&(t.setAttribute("aria-controls",e.getAttribute("id")),e.setAttribute("aria-labelledby",t.getAttribute("id")))})}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(t=>!t.disabled),this.panels=this.getAllPanels(),this.updateComplete.then(()=>this.updateScrollControls())}updateActiveTab(){let t=this.tabs.find(e=>e.panel===this.active);t&&this.setActiveTab(t,{scrollBehavior:"smooth"})}updateScrollControls(){this.withoutScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1}render(){let t=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return m`
      <div
        part="base"
        class=${C({"tab-group":!0,"tab-group-top":this.placement==="top","tab-group-bottom":this.placement==="bottom","tab-group-start":this.placement==="start","tab-group-end":this.placement==="end","tab-group-has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="nav-container" part="nav">
          ${this.hasScrollControls?m`
                <wa-button
                  part="scroll-button scroll-button-start"
                  exportparts="base:scroll-button__base"
                  class="scroll-button scroll-button-start"
                  appearance="plain"
                  @click=${this.handleScrollToStart}
                >
                  <wa-icon
                    name=${t?"chevron-right":"chevron-left"}
                    library="system"
                    variant="solid"
                    label=${this.localize.term("scrollToStart")}
                  ></wa-icon>
                </wa-button>
              `:""}

          <!-- We have a focus listener because in Firefox (and soon to be Chrome) overflow containers are focusable. -->
          <div class="nav" @focus=${()=>this.activeTab?.focus({preventScroll:!0})}>
            <div part="tabs" class="tabs" role="tablist">
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls?m`
                <wa-button
                  part="scroll-button scroll-button-end"
                  class="scroll-button scroll-button-end"
                  exportparts="base:scroll-button__base"
                  appearance="plain"
                  @click=${this.handleScrollToEnd}
                >
                  <wa-icon
                    name=${t?"chevron-left":"chevron-right"}
                    library="system"
                    variant="solid"
                    label=${this.localize.term("scrollToEnd")}
                  ></wa-icon>
                </wa-button>
              `:""}
        </div>

        <div part="body" class="body"><slot @slotchange=${this.syncTabsAndPanels}></slot></div>
      </div>
    `}};gt.css=Oa;i([g(".tab-group")],gt.prototype,"tabGroup",2);i([g(".body slot")],gt.prototype,"defaultSlot",2);i([g(".nav")],gt.prototype,"nav",2);i([_()],gt.prototype,"hasScrollControls",2);i([s({reflect:!0})],gt.prototype,"active",2);i([s()],gt.prototype,"placement",2);i([s()],gt.prototype,"activation",2);i([s({attribute:"without-scroll-controls",type:Boolean})],gt.prototype,"withoutScrollControls",2);i([S("active")],gt.prototype,"updateActiveTab",1);i([S("withoutScrollControls",{waitUntilFirstUpdate:!0})],gt.prototype,"updateScrollControls",1);gt=i([w("wa-tab-group")],gt);var La=v`
  :host {
    display: inline-block;
    color: var(--wa-color-neutral-on-quiet);
    font-weight: var(--wa-font-weight-action);
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font: inherit;
    padding: 1em 1.5em;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    transition: color var(--wa-transition-fast) var(--wa-transition-easing);

    ::slotted(wa-icon:first-child) {
      margin-inline-end: 0.5em;
    }

    ::slotted(wa-icon:last-child) {
      margin-inline-start: 0.5em;
    }
  }

  @media (hover: hover) {
    :host(:hover:not([disabled])) .tab {
      color: currentColor;
    }
  }

  :host(:focus) {
    outline: transparent;
  }

  :host(:focus-visible) .tab {
    outline: var(--wa-focus-ring);
    outline-offset: calc(-1 * var(--wa-border-width-l) - var(--wa-focus-ring-offset));
  }

  :host([active]:not([disabled])) {
    color: var(--wa-color-brand-on-quiet);
  }

  :host([disabled]) .tab {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (forced-colors: active) {
    :host([active]:not([disabled])) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`;var Fs=0,It=class extends k{constructor(){super(...arguments),this.attrId=++Fs,this.componentId=`wa-tab-${this.attrId}`,this.panel="",this.active=!1,this.disabled=!1,this.tabIndex=0}connectedCallback(){this.slot||(this.slot="nav"),super.connectedCallback(),this.setAttribute("role","tab")}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0}render(){return this.id=this.id?.length>0?this.id:this.componentId,m`
      <div
        part="base"
        class=${C({tab:!0,"tab-active":this.active})}
      >
        <slot></slot>
      </div>
    `}};It.css=La;i([g(".tab")],It.prototype,"tab",2);i([s({reflect:!0})],It.prototype,"panel",2);i([s({type:Boolean,reflect:!0})],It.prototype,"active",2);i([s({type:Boolean,reflect:!0})],It.prototype,"disabled",2);i([s({type:Number,reflect:!0})],It.prototype,"tabIndex",2);i([S("active")],It.prototype,"handleActiveChange",1);i([S("disabled")],It.prototype,"handleDisabledChange",1);It=i([w("wa-tab")],It);var za=v`
  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`;var qs=0,Ae=class extends k{constructor(){super(...arguments),this.attrId=++qs,this.componentId=`wa-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel")}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true")}render(){return m`
      <slot
        part="base"
        class=${C({"tab-panel":!0,"tab-panel-active":this.active})}
      ></slot>
    `}};Ae.css=za;i([s({reflect:!0})],Ae.prototype,"name",2);i([s({type:Boolean,reflect:!0})],Ae.prototype,"active",2);i([S("active")],Ae.prototype,"handleActiveChange",1);Ae=i([w("wa-tab-panel")],Ae);var Da=v`
  :host {
    border-width: 0;
  }

  .textarea {
    display: grid;
    align-items: center;
    margin: 0;
    border: none;
    outline: none;
    cursor: inherit;
    font: inherit;
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    -webkit-appearance: none;
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);

    &:focus-within {
      outline-color: var(--wa-color-focus);
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .textarea {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .textarea {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .textarea {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  textarea {
    display: block;
    width: 100%;
    border: none;
    background: transparent;
    font: inherit;
    color: inherit;
    padding: calc(var(--wa-form-control-padding-block) - ((1lh - 1em) / 2)) var(--wa-form-control-padding-inline); /* accounts for the larger line height of textarea content */
    min-height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
    box-shadow: none;
    margin: 0;

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }

    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &:focus {
      outline: none;
    }
  }

  /* Shared textarea and size-adjuster positioning */
  .control,
  .size-adjuster {
    grid-area: 1 / 1 / 2 / 2;
  }

  .size-adjuster {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
    padding: 0;
  }

  textarea::-webkit-search-decoration,
  textarea::-webkit-search-cancel-button,
  textarea::-webkit-search-results-button,
  textarea::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  /*
   * Resize types
   */

  :host([resize='none']) textarea {
    resize: none;
  }

  textarea,
  :host([resize='vertical']) textarea {
    resize: vertical;
  }

  :host([resize='horizontal']) textarea {
    resize: horizontal;
  }

  :host([resize='both']) textarea {
    resize: both;
  }

  :host([resize='auto']) textarea {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }

  /*
   * Footer (hint + character count)
   */

  .footer {
    display: flex;
    align-items: baseline;
    gap: 1em;
  }

  .footer.has-count [part='hint'] {
    flex: 1 1 auto;
    min-width: 0;
  }

  .count {
    flex: 0 0 auto;
    color: var(--wa-form-control-hint-color);
    font-weight: var(--wa-form-control-hint-font-weight);
    line-height: var(--wa-form-control-hint-line-height);
    margin-block-start: 0.5em;
    font-size: var(--wa-font-size-smaller);
    margin-inline-start: auto;
  }
`;var T=class extends D{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new N(this,"hint","label"),this.localize=new L(this),this.announcedCountText="",this.title="",this.name=null,this._value=null,this.defaultValue=this.getAttribute("value")??"",this.size="medium",this.appearance="outlined",this.label="",this.hint="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1,this.withCount=!1}static get validators(){return[...super.validators,Pt()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{if(this.setTextareaDimensions(),this.updateResizeObserver(),this.didSSR&&this.input&&this.value!==this.input.value){let t=this.input.value;this.value=t}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.countAnnounceTimeout),this.resizeObserver?.disconnect(),this.resizeObserver=void 0}updateResizeObserver(){let t=this.resize!=="none"&&this.resize!=="auto";t&&!this.resizeObserver&&this.input?(this.resizeObserver=new ResizeObserver(()=>this.setTextareaDimensions()),this.resizeObserver.observe(this.input)):!t&&this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=void 0)}handleBlur(){this.checkValidity()}handleChange(t){this.valueHasChanged=!0,this.value=this.input.value,this.setTextareaDimensions(),this.checkValidity(),this.relayNativeEvent(t,{bubbles:!0,composed:!0})}handleInput(t){this.valueHasChanged=!0,this.value=this.input.value,this.relayNativeEvent(t,{bubbles:!0,composed:!0}),this.scheduleCountAnnouncement()}scheduleCountAnnouncement(){clearTimeout(this.countAnnounceTimeout),this.countAnnounceTimeout=setTimeout(()=>{let t=(this.value??"").length;this.announcedCountText=this.maxlength!=null?this.localize.term("numCharactersRemaining",this.maxlength-t):this.localize.term("numCharacters",t)},1e3)}setTextareaDimensions(){if(this.resize==="none"){this.base.style.width="",this.base.style.height="";return}if(this.resize==="auto"){this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`,this.base.style.width="",this.base.style.height="";return}if(this.input.style.width){let t=Number(this.input.style.width.split(/px/)[0])+2;this.base.style.width=`${t}px`}if(this.input.style.height){let t=Number(this.input.style.height.split(/px/)[0])+2;this.base.style.height=`${t}px`}}handleRowsChange(){this.setTextareaDimensions()}async handleValueChange(){await this.updateComplete,this.checkValidity(),this.setTextareaDimensions()}updated(t){t.has("resize")&&(this.setTextareaDimensions(),this.updateResizeObserver()),super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(t){if(t){typeof t.top=="number"&&(this.input.scrollTop=t.top),typeof t.left=="number"&&(this.input.scrollLeft=t.left);return}return{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,e,o="none"){this.input.setSelectionRange(t,e,o)}setRangeText(t,e,o,r="preserve"){let a=e??this.input.selectionStart,n=o??this.input.selectionEnd;this.input.setRangeText(t,a,n,r),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaDimensions())}formResetCallback(){this._value=null,this.input&&(this.input.value=this.value||""),super.formResetCallback()}render(){let t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,o=this.label?!0:!!t,r=this.hint?!0:!!e,a=(this.value??"").length,n=this.maxlength!=null?this.localize.term("numCharactersRemaining",this.maxlength-a):this.localize.term("numCharacters",a);return m`
      <label
        part="form-control-label label"
        class=${C({label:!0,"has-label":o})}
        for="input"
        aria-hidden=${o?"false":"true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="textarea">
        <textarea
          part="textarea"
          id="input"
          class="control"
          title=${this.title}
          name=${x(this.name)}
          .value=${wt(this.value)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${x(this.placeholder)}
          rows=${x(this.rows)}
          minlength=${x(this.minlength)}
          maxlength=${x(this.maxlength)}
          autocapitalize=${x(this.autocapitalize)}
          autocorrect=${x(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${x(this.spellcheck)}
          enterkeyhint=${x(this.enterkeyhint)}
          inputmode=${x(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        ></textarea>

        <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
        <div part="textarea-adjuster" class="size-adjuster" ?hidden=${this.resize!=="auto"}></div>
      </div>

      <div
        class=${C({footer:!0,"has-count":this.withCount})}
      >
        <slot
          id="hint"
          name="hint"
          part="hint"
          aria-hidden=${r?"false":"true"}
          class=${C({"has-slotted":r})}
          >${this.hint}</slot
        >

        ${this.withCount?m`
              <div part="count" class="count" aria-hidden="true">${n}</div>
              <div class="wa-visually-hidden-force" aria-live="polite">${this.announcedCountText}</div>
            `:""}
      </div>
    `}};T.css=[Da,K,B,fo];i([_()],T.prototype,"announcedCountText",2);i([g(".control")],T.prototype,"input",2);i([g('[part~="base"]')],T.prototype,"base",2);i([g(".size-adjuster")],T.prototype,"sizeAdjuster",2);i([s()],T.prototype,"title",2);i([s({reflect:!0})],T.prototype,"name",2);i([_()],T.prototype,"value",1);i([s({attribute:"value",reflect:!0})],T.prototype,"defaultValue",2);i([s({reflect:!0})],T.prototype,"size",2);i([s({reflect:!0})],T.prototype,"appearance",2);i([s()],T.prototype,"label",2);i([s({attribute:"hint"})],T.prototype,"hint",2);i([s()],T.prototype,"placeholder",2);i([s({type:Number})],T.prototype,"rows",2);i([s({reflect:!0})],T.prototype,"resize",2);i([s({type:Boolean})],T.prototype,"disabled",2);i([s({type:Boolean,reflect:!0})],T.prototype,"readonly",2);i([s({type:Boolean,reflect:!0})],T.prototype,"required",2);i([s({type:Number})],T.prototype,"minlength",2);i([s({type:Number})],T.prototype,"maxlength",2);i([s()],T.prototype,"autocapitalize",2);i([s({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="off"),toAttribute:t=>t?"on":"off"}})],T.prototype,"autocorrect",2);i([s()],T.prototype,"autocomplete",2);i([s({type:Boolean})],T.prototype,"autofocus",2);i([s()],T.prototype,"enterkeyhint",2);i([s({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],T.prototype,"spellcheck",2);i([s()],T.prototype,"inputmode",2);i([s({attribute:"with-label",type:Boolean})],T.prototype,"withLabel",2);i([s({attribute:"with-hint",type:Boolean})],T.prototype,"withHint",2);i([s({attribute:"with-count",type:Boolean,reflect:!0})],T.prototype,"withCount",2);i([S("rows",{waitUntilFirstUpdate:!0})],T.prototype,"handleRowsChange",1);i([S("value",{waitUntilFirstUpdate:!0})],T.prototype,"handleValueChange",1);T=i([w("wa-textarea")],T);T.disableWarning?.("change-in-update");var Ta=v`
  :host {
    --track-size: 0.5em;
    --thumb-width: 1.4em;
    --thumb-height: 1.4em;
    --marker-width: 0.1875em;
    --marker-height: 0.1875em;
  }

  :host([orientation='vertical']) {
    width: auto;
  }

  #label:has(~ .vertical) {
    display: block;
    order: 2;
    max-width: none;
    text-align: center;
  }

  #description:has(~ .vertical) {
    order: 3;
    text-align: center;
  }

  /* Add extra space between slider and label, when present */
  #label.has-label ~ #slider {
    &.horizontal {
      margin-block-start: 0.5em;
    }
    &.vertical {
      margin-block-end: 0.5em;
    }
  }

  #slider {
    touch-action: none;

    &:focus {
      outline: none;
    }

    &:focus-visible:not(.disabled) #thumb,
    &:focus-visible:not(.disabled) #thumb-min,
    &:focus-visible:not(.disabled) #thumb-max {
      outline: var(--wa-focus-ring);
      /* intentionally no offset due to border */
    }
  }

  #track {
    position: relative;
    border-radius: 9999px;
    background: var(--wa-color-neutral-fill-normal);
    isolation: isolate;
  }

  /* Orientation */
  .horizontal #track {
    height: var(--track-size);
  }

  .vertical #track {
    order: 1;
    width: var(--track-size);
    height: 200px;
  }

  /* Disabled */
  .disabled #track {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Indicator */
  #indicator {
    position: absolute;
    border-radius: inherit;
    background-color: var(--wa-form-control-activated-color);

    &:dir(ltr) {
      right: calc(100% - max(var(--start), var(--end)));
      left: min(var(--start), var(--end));
    }

    &:dir(rtl) {
      right: min(var(--start), var(--end));
      left: calc(100% - max(var(--start), var(--end)));
    }
  }

  .horizontal #indicator {
    top: 0;
    height: 100%;
  }

  .vertical #indicator {
    top: calc(100% - var(--end));
    bottom: var(--start);
    left: 0;
    width: 100%;
  }

  /* Thumbs */
  #thumb,
  #thumb-min,
  #thumb-max {
    z-index: 3;
    position: absolute;
    width: var(--thumb-width);
    height: var(--thumb-height);
    border: solid 0.125em var(--wa-color-surface-default);
    border-radius: 50%;
    background-color: var(--wa-form-control-activated-color);
    cursor: pointer;
  }

  .disabled #thumb,
  .disabled #thumb-min,
  .disabled #thumb-max {
    cursor: inherit;
  }

  .horizontal #thumb,
  .horizontal #thumb-min,
  .horizontal #thumb-max {
    top: calc(50% - var(--thumb-height) / 2);

    &:dir(ltr) {
      right: auto;
      left: calc(var(--position) - var(--thumb-width) / 2);
    }

    &:dir(rtl) {
      right: calc(var(--position) - var(--thumb-width) / 2);
      left: auto;
    }
  }

  .vertical #thumb,
  .vertical #thumb-min,
  .vertical #thumb-max {
    bottom: calc(var(--position) - var(--thumb-height) / 2);
    left: calc(50% - var(--thumb-width) / 2);
  }

  /* Range-specific thumb styles */
  :host([range]) {
    #thumb-min:focus-visible,
    #thumb-max:focus-visible {
      z-index: 4; /* Ensure focused thumb appears on top */
      outline: var(--wa-focus-ring);
      /* intentionally no offset due to border */
    }
  }

  /* Markers */
  #markers {
    pointer-events: none;
  }

  .marker {
    z-index: 2;
    position: absolute;
    width: var(--marker-width);
    height: var(--marker-height);
    border-radius: 50%;
    background-color: var(--wa-color-surface-default);
  }

  .marker:first-of-type,
  .marker:last-of-type {
    display: none;
  }

  .horizontal .marker {
    top: calc(50% - var(--marker-height) / 2);
    left: calc(var(--position) - var(--marker-width) / 2);
  }

  .vertical .marker {
    top: calc(var(--position) - var(--marker-height) / 2);
    left: calc(50% - var(--marker-width) / 2);
  }

  /* Marker labels */
  #references {
    position: relative;

    slot {
      display: flex;
      justify-content: space-between;
      height: 100%;
    }

    ::slotted(*) {
      color: var(--wa-color-text-quiet);
      font-size: 0.875em;
      line-height: 1;
    }
  }

  .horizontal {
    #references {
      margin-block-start: 0.5em;
    }
  }

  .vertical {
    display: flex;
    margin-inline: auto;

    #track {
      order: 1;
    }

    #references {
      order: 2;
      width: min-content;
      margin-inline-start: 0.75em;

      slot {
        flex-direction: column;
      }
    }
  }

  .vertical #references slot {
    flex-direction: column;
  }
`;var kr=typeof window<"u"&&"ontouchstart"in window,ro=class{constructor(t,e){this.isActive=!1,this.isDragging=!1,this.handleDragStart=o=>{let r="touches"in o?o.touches[0].clientX:o.clientX,a="touches"in o?o.touches[0].clientY:o.clientY;this.isDragging||!kr&&o.buttons>1||(this.isDragging=!0,document.addEventListener("pointerup",this.handleDragStop),document.addEventListener("pointermove",this.handleDragMove),document.addEventListener("pointercancel",this.handleDragStop),document.addEventListener("touchend",this.handleDragStop),document.addEventListener("touchmove",this.handleDragMove),document.addEventListener("touchcancel",this.handleDragStop),this.options.start(r,a))},this.handleDragStop=o=>{let r="changedTouches"in o?o.changedTouches[0].clientX:o.clientX,a="changedTouches"in o?o.changedTouches[0].clientY:o.clientY;this.isDragging=!1,document.removeEventListener("pointerup",this.handleDragStop),document.removeEventListener("pointermove",this.handleDragMove),document.removeEventListener("pointercancel",this.handleDragStop),document.removeEventListener("touchend",this.handleDragStop),document.removeEventListener("touchmove",this.handleDragMove),document.removeEventListener("touchcancel",this.handleDragStop),this.options.stop(r,a)},this.handleDragMove=o=>{let r="touches"in o?o.touches[0].clientX:o.clientX,a="touches"in o?o.touches[0].clientY:o.clientY;window.getSelection()?.removeAllRanges(),this.options.move(r,a)},this.element=t,this.options={start:()=>{},stop:()=>{},move:()=>{},...e},this.start()}start(){this.isActive||(this.element.addEventListener("pointerdown",this.handleDragStart),kr&&this.element.addEventListener("touchstart",this.handleDragStart),this.isActive=!0)}stop(){document.removeEventListener("pointerup",this.handleDragStop),document.removeEventListener("pointermove",this.handleDragMove),document.removeEventListener("pointercancel",this.handleDragStop),document.removeEventListener("touchend",this.handleDragStop),document.removeEventListener("touchmove",this.handleDragMove),document.removeEventListener("touchcancel",this.handleDragStop),this.element.removeEventListener("pointerdown",this.handleDragStart),kr&&this.element.removeEventListener("touchstart",this.handleDragStart),this.isActive=!1,this.isDragging=!1}toggle(t){(t!==void 0?t:!this.isActive)?this.start():this.stop()}};var Ra="important",Hs=" !"+Ra,_e=re(class extends Bt{constructor(t){if(super(t),t.type!==vt.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,o)=>{let r=t[o];return r==null?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(t,[e]){let{style:o}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let r of this.ft)e[r]==null&&(this.ft.delete(r),r.includes("-")?o.removeProperty(r):o[r]=null);for(let r in e){let a=e[r];if(a!=null){this.ft.add(r);let n=typeof a=="string"&&a.endsWith(Hs);r.includes("-")||n?o.setProperty(r,n?a.slice(0,-11):a,n?Ra:""):o[r]=a}}return Z}});var Ns=()=>({observedAttributes:["min","max","step"],checkValidity(t){let e={message:"",isValid:!0,invalidKeys:[]},o=(r,a,n,l)=>{let c=document.createElement("input");return c.type="range",c.min=String(a),c.max=String(n),c.step=String(l),c.value=String(r),c.checkValidity(),c.validationMessage};if(t.isRange){let r=t.minValue,a=t.maxValue;if(r<t.min)return e.isValid=!1,e.invalidKeys.push("rangeUnderflow"),e.message=o(r,t.min,t.max,t.step)||`Value must be greater than or equal to ${t.min}.`,e;if(a>t.max)return e.isValid=!1,e.invalidKeys.push("rangeOverflow"),e.message=o(a,t.min,t.max,t.step)||`Value must be less than or equal to ${t.max}.`,e;if(t.step&&t.step!==1){let n=(r-t.min)%t.step!==0,l=(a-t.min)%t.step!==0;if(n||l){e.isValid=!1,e.invalidKeys.push("stepMismatch");let c=n?r:a;return e.message=o(c,t.min,t.max,t.step)||`Value must be a multiple of ${t.step}.`,e}}}else{let r=t.value;if(r<t.min)return e.isValid=!1,e.invalidKeys.push("rangeUnderflow"),e.message=o(r,t.min,t.max,t.step)||`Value must be greater than or equal to ${t.min}.`,e;if(r>t.max)return e.isValid=!1,e.invalidKeys.push("rangeOverflow"),e.message=o(r,t.min,t.max,t.step)||`Value must be less than or equal to ${t.max}.`,e;if(t.step&&t.step!==1&&(r-t.min)%t.step!==0)return e.isValid=!1,e.invalidKeys.push("stepMismatch"),e.message=o(r,t.min,t.max,t.step)||`Value must be a multiple of ${t.step}.`,e}return e}}),R=class extends D{constructor(){super(...arguments),this.draggableThumbMin=null,this.draggableThumbMax=null,this.hasSlotController=new N(this,"hint","label"),this.localize=new L(this),this.activeThumb=null,this.lastTrackPosition=null,this.label="",this.hint="",this.minValue=0,this.maxValue=50,this.defaultValue=this.getAttribute("value")==null?this.minValue:Number(this.getAttribute("value")),this._value=null,this.range=!1,this.disabled=!1,this.readonly=!1,this.orientation="horizontal",this.size="medium",this.min=0,this.max=100,this.step=1,this.tooltipDistance=8,this.tooltipPlacement="top",this.withMarkers=!1,this.withTooltip=!1,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,Ns()]}get focusableAnchor(){return this.isRange?this.thumbMin||this.slider:this.slider}get validationTarget(){return this.focusableAnchor}get value(){if(this.valueHasChanged){let e=this._value??this.minValue??0;return yt(e,this.min,this.max)}let t=this._value??this.defaultValue;return yt(t,this.min,this.max)}set value(t){t=Number(t)??this.minValue,this._value!==t&&(this.valueHasChanged=!0,this._value=t)}get isRange(){return this.range}firstUpdated(){this.isRange?(this.draggableThumbMin=new ro(this.thumbMin,{start:()=>{this.activeThumb="min",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.minValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(t,e)=>{this.setThumbValueFromCoordinates(t,e,"min")},stop:()=>{this.minValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableThumbMax=new ro(this.thumbMax,{start:()=>{this.activeThumb="max",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.maxValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(t,e)=>{this.setThumbValueFromCoordinates(t,e,"max")},stop:()=>{this.maxValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableTrack=new ro(this.track,{start:(t,e)=>{if(this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.activeThumb)this.valueWhenDraggingStarted=this.activeThumb==="min"?this.minValue:this.maxValue;else{let o=this.getValueFromCoordinates(t,e),r=Math.abs(o-this.minValue),a=Math.abs(o-this.maxValue);if(r===a)if(o>this.maxValue)this.activeThumb="max";else if(o<this.minValue)this.activeThumb="min";else{let n=this.localize.dir()==="rtl",l=this.orientation==="vertical",c=l?e:t,d=this.lastTrackPosition||c;this.lastTrackPosition=c;let p=c>d!==n&&!l||c<d&&l;this.activeThumb=p?"max":"min"}else this.activeThumb=r<=a?"min":"max";this.valueWhenDraggingStarted=this.activeThumb==="min"?this.minValue:this.maxValue}this.customStates.set("dragging",!0),this.setThumbValueFromCoordinates(t,e,this.activeThumb),this.showRangeTooltips()},move:(t,e)=>{this.activeThumb&&this.setThumbValueFromCoordinates(t,e,this.activeThumb)},stop:()=>{this.activeThumb&&(this.activeThumb==="min"?this.minValue:this.maxValue)!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}})):this.draggableTrack=new ro(this.slider,{start:(t,e)=>{this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.value,this.customStates.set("dragging",!0),this.setValueFromCoordinates(t,e),this.showTooltip()},move:(t,e)=>{this.setValueFromCoordinates(t,e)},stop:()=>{this.value!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideTooltip(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0}})}willUpdate(t){this.isRange&&(t.has("minValue")||t.has("maxValue")||t.has("min")||t.has("max"))&&(this.minValue=yt(this.minValue,this.min,this.maxValue),this.maxValue=yt(this.maxValue,this.minValue,this.max)),super.willUpdate(t)}updated(t){if(this.isRange&&(t.has("minValue")||t.has("maxValue"))&&this.updateFormValue(),t.has("disabled")||t.has("readonly")){let e=!(this.disabled||this.readonly);this.isRange&&(this.draggableThumbMin&&this.draggableThumbMin.toggle(e),this.draggableThumbMax&&this.draggableThumbMax.toggle(e)),this.draggableTrack&&this.draggableTrack.toggle(e)}super.updated(t)}formDisabledCallback(t){this.disabled=t}formResetCallback(){this.isRange?(this.minValue=parseFloat(this.getAttribute("min-value")??String(this.min)),this.maxValue=parseFloat(this.getAttribute("max-value")??String(this.max))):(this._value=null,this.defaultValue=this.defaultValue??parseFloat(this.getAttribute("value")??String(this.min))),this.valueHasChanged=!1,this.hasInteracted=!1,super.formResetCallback()}clampAndRoundToStep(t){let e=(String(this.step).split(".")[1]||"").replace(/0+$/g,"").length,o=Number(this.step),r=Number(this.min),a=Number(this.max);return t=Math.round(t/o)*o,t=yt(t,r,a),parseFloat(t.toFixed(e))}getPercentageFromValue(t){return(t-this.min)/(this.max-this.min)*100}getValueFromCoordinates(t,e){let o=this.localize.dir()==="rtl",r=this.orientation==="vertical",{top:a,right:n,bottom:l,left:c,height:d,width:p}=this.trackBoundingClientRect,h=r?e:t,u=r?{start:a,end:l,size:d}:{start:c,end:n,size:p},b=(r||o?u.end-h:h-u.start)/u.size;return this.clampAndRoundToStep(this.min+(this.max-this.min)*b)}handleBlur(){this.isRange?requestAnimationFrame(()=>{let t=this.shadowRoot?.activeElement;t===this.thumbMin||t===this.thumbMax||this.hideRangeTooltips()}):this.hideTooltip(),this.customStates.set("focused",!1),this.dispatchEvent(new FocusEvent("blur",{bubbles:!0,composed:!0}))}handleFocus(t){let e=t.target;this.isRange?(e===this.thumbMin?this.activeThumb="min":e===this.thumbMax&&(this.activeThumb="max"),this.showRangeTooltips()):this.showTooltip(),this.customStates.set("focused",!0),this.dispatchEvent(new FocusEvent("focus",{bubbles:!0,composed:!0}))}handleKeyDown(t){let e=this.localize.dir()==="rtl",o=t.target;if(this.disabled||this.readonly||this.isRange&&(o===this.thumbMin?this.activeThumb="min":o===this.thumbMax&&(this.activeThumb="max"),!this.activeThumb))return;let r=this.isRange?this.activeThumb==="min"?this.minValue:this.maxValue:this.value,a=r;switch(t.key){case"ArrowUp":case(e?"ArrowLeft":"ArrowRight"):t.preventDefault(),a=this.clampAndRoundToStep(r+this.step);break;case"ArrowDown":case(e?"ArrowRight":"ArrowLeft"):t.preventDefault(),a=this.clampAndRoundToStep(r-this.step);break;case"Home":t.preventDefault(),a=this.isRange&&this.activeThumb==="min"?this.min:this.isRange?this.minValue:this.min;break;case"End":t.preventDefault(),a=this.isRange&&this.activeThumb==="max"?this.max:this.isRange?this.maxValue:this.max;break;case"PageUp":t.preventDefault();let n=Math.max(r+(this.max-this.min)/10,r+this.step);a=this.clampAndRoundToStep(n);break;case"PageDown":t.preventDefault();let l=Math.min(r-(this.max-this.min)/10,r-this.step);a=this.clampAndRoundToStep(l);break;case"Enter":Re(t,this);return}a!==r&&(this.isRange?(this.activeThumb==="min"?a>this.maxValue?(this.maxValue=a,this.minValue=a):this.minValue=Math.max(this.min,a):a<this.minValue?(this.minValue=a,this.maxValue=a):this.maxValue=Math.min(this.max,a),this.updateFormValue()):this.value=yt(a,this.min,this.max),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0)}handleLabelPointerDown(t){t.preventDefault(),this.disabled||(this.isRange?this.thumbMin?.focus():this.slider.focus())}setValueFromCoordinates(t,e){let o=this.value;this.value=this.getValueFromCoordinates(t,e),this.value!==o&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})}setThumbValueFromCoordinates(t,e,o){let r=this.getValueFromCoordinates(t,e),a=o==="min"?this.minValue:this.maxValue;o==="min"?r>this.maxValue?(this.maxValue=r,this.minValue=r):this.minValue=Math.max(this.min,r):r<this.minValue?(this.minValue=r,this.maxValue=r):this.maxValue=Math.min(this.max,r),a!==(o==="min"?this.minValue:this.maxValue)&&(this.updateFormValue(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}showTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!0)}hideTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!1)}showRangeTooltips(){if(!this.withTooltip)return;let t=this.shadowRoot?.getElementById("tooltip-thumb-min"),e=this.shadowRoot?.getElementById("tooltip-thumb-max");this.activeThumb==="min"?(t&&(t.open=!0),e&&(e.open=!1)):this.activeThumb==="max"&&(e&&(e.open=!0),t&&(t.open=!1))}hideRangeTooltips(){if(!this.withTooltip)return;let t=this.shadowRoot?.getElementById("tooltip-thumb-min"),e=this.shadowRoot?.getElementById("tooltip-thumb-max");t&&(t.open=!1),e&&(e.open=!1)}updateFormValue(){if(this.isRange){let t=new FormData;t.append(this.name||"",String(this.minValue)),t.append(this.name||"",String(this.maxValue)),this.setValue(t)}}focus(){this.isRange?this.thumbMin?.focus():this.slider.focus()}blur(){this.isRange?document.activeElement===this.thumbMin?this.thumbMin.blur():document.activeElement===this.thumbMax&&this.thumbMax.blur():this.slider.blur()}stepDown(){if(this.isRange){let t=this.clampAndRoundToStep(this.minValue-this.step);this.minValue=yt(t,this.min,this.maxValue),this.updateFormValue()}else{let t=this.clampAndRoundToStep(this.value-this.step);this.value=t}}stepUp(){if(this.isRange){let t=this.clampAndRoundToStep(this.maxValue+this.step);this.maxValue=yt(t,this.minValue,this.max),this.updateFormValue()}else{let t=this.clampAndRoundToStep(this.value+this.step);this.value=t}}render(){let t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,o=this.label?!0:!!t,r=this.hint?!0:!!e,a=this.hasSlotController.test("reference"),n=C({small:this.size==="small",medium:this.size==="medium",large:this.size==="large",horizontal:this.orientation==="horizontal",vertical:this.orientation==="vertical",disabled:this.disabled}),l=[];if(this.withMarkers)for(let f=this.min;f<=this.max;f+=this.step)l.push(this.getPercentageFromValue(f));let c=m`
      <label
        id="label"
        part="label"
        for=${this.isRange?"thumb-min":"text-box"}
        class=${C({vh:!o,"has-label":o})}
        @pointerdown=${this.handleLabelPointerDown}
      >
        <slot name="label">${this.label}</slot>
      </label>
    `,d=m`
      <div
        id="hint"
        part="hint"
        class=${C({"has-slotted":r})}
      >
        <slot name="hint">${this.hint}</slot>
      </div>
    `,p=this.withMarkers?m`
          <div id="markers" part="markers">
            ${l.map(f=>m`<span part="marker" class="marker" style=${_e({"--position":`${f}%`})}></span>`)}
          </div>
        `:"",h=a?m`
          <div id="references" part="references" aria-hidden="true">
            <slot name="reference"></slot>
          </div>
        `:"",u=(f,b)=>this.withTooltip?m`
            <wa-tooltip
              id=${`tooltip${f!=="thumb"?"-"+f:""}`}
              part="tooltip"
              exportparts="
                base:tooltip__base,
                body:tooltip__body,
                arrow:tooltip__arrow
              "
              trigger="manual"
              distance=${this.tooltipDistance}
              placement=${this.tooltipPlacement}
              for=${f}
              activation="manual"
              dir=${this.localize.dir()}
            >
              <span aria-hidden="true">
                ${typeof this.valueFormatter=="function"?this.valueFormatter(b):this.localize.number(b)}
              </span>
            </wa-tooltip>
          `:"";if(this.isRange){let f=yt(this.getPercentageFromValue(this.minValue),0,100),b=yt(this.getPercentageFromValue(this.maxValue),0,100);return m`
        ${c}

        <div id="slider" part="slider" class=${n}>
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style=${_e({"--start":`${Math.min(f,b)}%`,"--end":`${Math.max(f,b)}%`})}
            ></div>

            ${p}

            <span
              id="thumb-min"
              part="thumb thumb-min"
              style=${_e({"--position":`${f}%`})}
              role="slider"
              aria-valuemin=${this.min}
              aria-valuenow=${this.minValue}
              aria-valuetext=${typeof this.valueFormatter=="function"?this.valueFormatter(this.minValue):this.localize.number(this.minValue)}
              aria-valuemax=${this.max}
              aria-label="${this.label?`${this.label} (minimum value)`:"Minimum value"}"
              aria-orientation=${this.orientation}
              aria-disabled=${this.disabled?"true":"false"}
              aria-readonly=${this.readonly?"true":"false"}
              tabindex=${this.disabled?-1:0}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            ></span>

            <span
              id="thumb-max"
              part="thumb thumb-max"
              style=${_e({"--position":`${b}%`})}
              role="slider"
              aria-valuemin=${this.min}
              aria-valuenow=${this.maxValue}
              aria-valuetext=${typeof this.valueFormatter=="function"?this.valueFormatter(this.maxValue):this.localize.number(this.maxValue)}
              aria-valuemax=${this.max}
              aria-label="${this.label?`${this.label} (maximum value)`:"Maximum value"}"
              aria-orientation=${this.orientation}
              aria-disabled=${this.disabled?"true":"false"}
              aria-readonly=${this.readonly?"true":"false"}
              tabindex=${this.disabled?-1:0}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            ></span>
          </div>

          ${h} ${d}
        </div>

        ${u("thumb-min",this.minValue)} ${u("thumb-max",this.maxValue)}
      `}else{let f=yt(this.getPercentageFromValue(this.value),0,100),b=yt(this.getPercentageFromValue(typeof this.indicatorOffset=="number"?this.indicatorOffset:this.min),0,100);return m`
        ${c}

        <div
          id="slider"
          part="slider"
          class=${n}
          role="slider"
          aria-disabled=${this.disabled?"true":"false"}
          aria-readonly=${this.disabled?"true":"false"}
          aria-orientation=${this.orientation}
          aria-valuemin=${this.min}
          aria-valuenow=${this.value}
          aria-valuetext=${typeof this.valueFormatter=="function"?this.valueFormatter(this.value):this.localize.number(this.value)}
          aria-valuemax=${this.max}
          aria-labelledby="label"
          aria-describedby="hint"
          tabindex=${this.disabled?-1:0}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        >
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style=${_e({"--start":`${b}%`,"--end":`${f}%`})}
            ></div>

            ${p}
            <span id="thumb" part="thumb" style=${_e({"--position":`${f}%`})}></span>
          </div>

          ${h} ${d}
        </div>

        ${u("thumb",this.value)}
      `}}};R.formAssociated=!0;R.observeSlots=!0;R.css=[B,K,Ta];i([g("#slider")],R.prototype,"slider",2);i([g("#thumb")],R.prototype,"thumb",2);i([g("#thumb-min")],R.prototype,"thumbMin",2);i([g("#thumb-max")],R.prototype,"thumbMax",2);i([g("#track")],R.prototype,"track",2);i([g("#tooltip")],R.prototype,"tooltip",2);i([s()],R.prototype,"label",2);i([s({attribute:"hint"})],R.prototype,"hint",2);i([s({reflect:!0})],R.prototype,"name",2);i([s({type:Number,attribute:"min-value"})],R.prototype,"minValue",2);i([s({type:Number,attribute:"max-value"})],R.prototype,"maxValue",2);i([s({attribute:"value",reflect:!0,type:Number})],R.prototype,"defaultValue",2);i([_()],R.prototype,"value",1);i([s({type:Boolean,reflect:!0})],R.prototype,"range",2);i([s({type:Boolean})],R.prototype,"disabled",2);i([s({type:Boolean,reflect:!0})],R.prototype,"readonly",2);i([s({reflect:!0})],R.prototype,"orientation",2);i([s({reflect:!0})],R.prototype,"size",2);i([s({attribute:"indicator-offset",type:Number})],R.prototype,"indicatorOffset",2);i([s({type:Number})],R.prototype,"min",2);i([s({type:Number})],R.prototype,"max",2);i([s({type:Number})],R.prototype,"step",2);i([s({type:Boolean})],R.prototype,"autofocus",2);i([s({attribute:"tooltip-distance",type:Number})],R.prototype,"tooltipDistance",2);i([s({attribute:"tooltip-placement",reflect:!0})],R.prototype,"tooltipPlacement",2);i([s({attribute:"with-markers",type:Boolean})],R.prototype,"withMarkers",2);i([s({attribute:"with-tooltip",type:Boolean})],R.prototype,"withTooltip",2);i([s({attribute:"with-label",type:Boolean})],R.prototype,"withLabel",2);i([s({attribute:"with-hint",type:Boolean})],R.prototype,"withHint",2);i([s({attribute:!1})],R.prototype,"valueFormatter",2);R=i([w("wa-slider")],R);var mS=new MutationObserver(t=>{for(let{addedNodes:e}of t)for(let o of e)o.nodeType===Node.ELEMENT_NODE&&Ia(o)});async function Ia(t){let e=t instanceof Element?t.tagName.toLowerCase():"",o=e?.startsWith("wa-"),r=[...t.querySelectorAll(":not(:defined)")].map(d=>d.tagName.toLowerCase()).filter(d=>d.startsWith("wa-"));o&&!customElements.get(e)&&r.push(e);let a=t.querySelectorAll("[data-wa-preload]"),n=t instanceof Element&&t.hasAttribute("data-wa-preload")?[t,...a]:a;for(let d of n)r.push(...d.getAttribute("data-wa-preload").split(/\s+/).filter(p=>p.startsWith("wa-")));let l=[...new Set(r)],c=await Promise.allSettled(l.map(d=>Ws(d)));for(let d of c)d.status==="rejected"&&console.warn(d.reason);await new Promise(requestAnimationFrame),t.dispatchEvent(new CustomEvent("wa-discovery-complete",{bubbles:!1,cancelable:!1,composed:!0}))}function Ws(t){if(customElements.get(t))return Promise.resolve();let e=t.replace(/^wa-/i,""),o=lr(`components/${e}/${e}.js`);return new Promise((r,a)=>{import(o).then(()=>r()).catch(()=>a(new Error(`Unable to autoload <${t}> from ${o}`)))})}So("ion",{resolver:t=>`https://cdn.jsdelivr.net/npm/ionicons@5.1.2/dist/ionicons/svg/${t}.svg`,mutator:t=>{t.setAttribute("fill","currentColor"),t.setAttribute("stroke","currentColor"),[...t.querySelectorAll(".ionicon-fill-none")].map(e=>e.setAttribute("fill","none")),[...t.querySelectorAll(".ionicon-stroke-width")].map(e=>e.setAttribute("stroke-width","32px"))}});So("remix",{resolver:t=>{let e=t.match(/^(.*?)\/(.*?)?$/);return e[1]=e[1].charAt(0).toUpperCase()+e[1].slice(1),`https://cdn.jsdelivr.net/npm/remixicon@4.6.0/icons/${e[1]}/${e[2]}.svg`},mutator:t=>t.setAttribute("fill","currentColor")});export{m as a,W as b,oe as c,x as d,A as e};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directive.js:
lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@awesome.me/webawesome-pro/dist/chunks/chunk.DN74N46C.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.WKDY3BS6.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.G43BFAJO.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.7VGCIHDG.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.L42WI6IM.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.HS6W22IV.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.TW3VXPTP.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.CADSC3OL.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.HQKLFGS3.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.OCXPLMDW.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.ADZNIDEZ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.IXFCHTNQ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.HOKX4ZNE.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.EXBMUNXF.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.ZRLIH7NU.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.ROLIHZR6.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.XGDRHCV3.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.2AIPDEEA.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.U7CMGUQU.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.FGB4A65W.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.E3UENDF5.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.S7GU24DN.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.GXDF4WGD.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.H2BBUBXP.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.N4OG5GND.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.MFAIEGTH.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.GQAB6JAC.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.UOGHRTLZ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.HZ7JIJIH.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.ESI5P3UH.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.PXJQ6MPO.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.WOJAFYXB.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.KNQBIPHQ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.REBJ6WJI.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.DSSPBSBT.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.5SRRHN3U.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.PODVN7FO.js:
@awesome.me/webawesome-pro/dist/components/page/page.js:
@awesome.me/webawesome-pro/dist/components/button/button.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.5GCZVAAM.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.TYMZZYON.js:
@awesome.me/webawesome-pro/dist/components/button-group/button-group.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.2D3ERBJH.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.LKYJPJAQ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.KTP2IKLN.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.DM7EPDKA.js:
@awesome.me/webawesome-pro/dist/components/number-input/number-input.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.VRT3QD64.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.M45Z6TG5.js:
@awesome.me/webawesome-pro/dist/components/card/card.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.QZLTFEB2.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.H5QKZ2DQ.js:
@awesome.me/webawesome-pro/dist/components/callout/callout.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.XDKUXEMR.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.JPXNJ5XW.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.UGBEETNR.js:
@awesome.me/webawesome-pro/dist/components/checkbox/checkbox.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.CJIUC4DM.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.572W6XBT.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.4BFMVFTS.js:
@awesome.me/webawesome-pro/dist/components/details/details.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.3ZCDZVC2.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.AVWPZPSV.js:
@awesome.me/webawesome-pro/dist/components/dialog/dialog.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.2QTEMNXU.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.KLC43UIT.js:
@awesome.me/webawesome-pro/dist/components/divider/divider.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.Y3TFP662.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.62WOWTMY.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.4SJJHQXE.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.EC3QH7QZ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.4TMDYOLP.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.LSTS2FFZ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.HQLDMDWB.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.A5GVVG6J.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.RFJIIITT.js:
@awesome.me/webawesome-pro/dist/components/dropdown/dropdown.js:
@awesome.me/webawesome-pro/dist/components/dropdown-item/dropdown-item.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.CYP4OUT5.js:
@awesome.me/webawesome-pro/dist/components/format-date/format-date.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.W45ADSBK.js:
@awesome.me/webawesome-pro/dist/components/format-number/format-number.js:
@awesome.me/webawesome-pro/dist/components/icon/icon.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.SMQHAYS5.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.V6242M3W.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.ZIMTIIHT.js:
@awesome.me/webawesome-pro/dist/components/input/input.js:
@awesome.me/webawesome-pro/dist/components/popup/popup.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.4VU3CRUY.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.XYOE26P3.js:
@awesome.me/webawesome-pro/dist/components/radio/radio.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.AKDROIBX.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.TTPYRE43.js:
@awesome.me/webawesome-pro/dist/components/radio-group/radio-group.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.NVYORNDJ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.KIHGJNSG.js:
@awesome.me/webawesome-pro/dist/components/scroller/scroller.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.CB4NG6KG.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.7HUEASE7.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.M2YXIHNH.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.XGZ6HLMO.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.U7UX4LKK.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.CXEJR3IT.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.XU4LNCRC.js:
@awesome.me/webawesome-pro/dist/components/select/select.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.WFODKN2M.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.GGHUG763.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.IOR5U4CP.js:
@awesome.me/webawesome-pro/dist/components/combobox/combobox.js:
@awesome.me/webawesome-pro/dist/components/option/option.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.P5AY4UBB.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.4DKWINZG.js:
@awesome.me/webawesome-pro/dist/components/tooltip/tooltip.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.4YQ2IATC.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.ZAZHSMLQ.js:
@awesome.me/webawesome-pro/dist/components/switch/switch.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.S7JYD6VT.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.SFY2U6LX.js:
@awesome.me/webawesome-pro/dist/components/badge/badge.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.TLMI2LBT.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.GGYLVOKD.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.65TQYUUX.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.BPUNMNIN.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.RAHK3WM5.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.JK3SELWC.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.6GL42UHU.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.6SJWKN6C.js:
@awesome.me/webawesome-pro/dist/components/tab-group/tab-group.js:
@awesome.me/webawesome-pro/dist/components/tab/tab.js:
@awesome.me/webawesome-pro/dist/components/tab-panel/tab-panel.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.JJG3NDGW.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.OB2ZNXBB.js:
@awesome.me/webawesome-pro/dist/components/textarea/textarea.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.H5NKZCQW.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.FTQL6MVS.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.2BYOEM54.js:
@awesome.me/webawesome-pro/dist/components/slider/slider.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.ZLRJC3XT.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.ZPFMW2MO.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.CTR7ORUU.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.SELW42KJ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.62JD4PXP.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.B33XGFTV.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.G2VK2FBZ.js:
@awesome.me/webawesome-pro/dist/webawesome.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
lit-html/directives/live.js:
lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
lit-html/directives/if-defined.js:
lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=chunk-A7YH7IKS.mjs.map
