var Fl=(e="768px")=>`
  @media screen and (width < ${e}) {
    [part~='navigation'] {
      display: none;
    }

    :host(:not([disable-navigation-toggle])) slot[name~='navigation-toggle'] {
      display: contents;
    }
  }
`;var Qi=globalThis,Ji=Qi.ShadowRoot&&(Qi.ShadyCSS===void 0||Qi.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Cn=Symbol(),Dl=new WeakMap,pi=class{constructor(t,o,i){if(this._$cssResult$=!0,i!==Cn)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=o}get styleSheet(){let t=this.o,o=this.t;if(Ji&&t===void 0){let i=o!==void 0&&o.length===1;i&&(t=Dl.get(o)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Dl.set(o,t))}return t}toString(){return this.cssText}},Il=e=>new pi(typeof e=="string"?e:e+"",void 0,Cn),E=(e,...t)=>{let o=e.length===1?e[0]:t.reduce((i,r,n)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[n+1],e[0]);return new pi(o,e,Cn)},$l=(e,t)=>{if(Ji)e.adoptedStyleSheets=t.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of t){let i=document.createElement("style"),r=Qi.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=o.cssText,e.appendChild(i)}},Sn=Ji?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let o="";for(let i of t.cssRules)o+=i.cssText;return Il(o)})(e):e;var{is:Ff,defineProperty:Df,getOwnPropertyDescriptor:If,getOwnPropertyNames:$f,getOwnPropertySymbols:Mf,getPrototypeOf:Of}=Object,Zi=globalThis,Ml=Zi.trustedTypes,Tf=Ml?Ml.emptyScript:"",Lf=Zi.reactiveElementPolyfillSupport,mi=(e,t)=>e,fi={toAttribute(e,t){switch(t){case Boolean:e=e?Tf:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=e!==null;break;case Number:o=e===null?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch{o=null}}return o}},er=(e,t)=>!Ff(e,t),Ol={attribute:!0,type:String,converter:fi,reflect:!1,useDefault:!1,hasChanged:er};Symbol.metadata??=Symbol("metadata"),Zi.litPropertyMetadata??=new WeakMap;var Ot=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,o=Ol){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(t,o),!o.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(t,i,o);r!==void 0&&Df(this.prototype,t,r)}}static getPropertyDescriptor(t,o,i){let{get:r,set:n}=If(this.prototype,t)??{get(){return this[o]},set(a){this[o]=a}};return{get:r,set(a){let s=r?.call(this);n?.call(this,a),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ol}static _$Ei(){if(this.hasOwnProperty(mi("elementProperties")))return;let t=Of(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(mi("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(mi("properties"))){let o=this.properties,i=[...$f(o),...Mf(o)];for(let r of i)this.createProperty(r,o[r])}let t=this[Symbol.metadata];if(t!==null){let o=litPropertyMetadata.get(t);if(o!==void 0)for(let[i,r]of o)this.elementProperties.set(i,r)}this._$Eh=new Map;for(let[o,i]of this.elementProperties){let r=this._$Eu(o,i);r!==void 0&&this._$Eh.set(r,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let o=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let r of i)o.unshift(Sn(r))}else t!==void 0&&o.push(Sn(t));return o}static _$Eu(t,o){let i=o.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,o=this.constructor.elementProperties;for(let i of o.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $l(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,o,i){this._$AK(t,i)}_$ET(t,o){let i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:fi).toAttribute(o,i.type);this._$Em=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(t,o){let i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let n=i.getPropertyOptions(r),a=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:fi;this._$Em=r;let s=a.fromAttribute(o,n.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(t,o,i,r=!1,n){if(t!==void 0){let a=this.constructor;if(r===!1&&(n=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??er)(n,o)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,o,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,o,{useDefault:i,reflect:r,wrapped:n},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??o??this[t]),n!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(o=void 0),this._$AL.set(t,o)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,n]of i){let{wrapped:a}=n,s=this[r];a!==!0||this._$AL.has(r)||s===void 0||this.C(r,void 0,n,s)}}let t=!1,o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(o)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(o)}willUpdate(t){}_$AE(t){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(o=>this._$ET(o,this[o])),this._$EM()}updated(t){}firstUpdated(t){}};Ot.elementStyles=[],Ot.shadowRootOptions={mode:"open"},Ot[mi("elementProperties")]=new Map,Ot[mi("finalized")]=new Map,Lf?.({ReactiveElement:Ot}),(Zi.reactiveElementVersions??=[]).push("2.1.2");var kn=globalThis,Tl=e=>e,tr=kn.trustedTypes,Ll=tr?tr.createPolicy("lit-html",{createHTML:e=>e}):void 0,En="$lit$",Tt=`lit$${Math.random().toFixed(9).slice(2)}$`,Rn="?"+Tt,Pf=`<${Rn}>`,fo=document,bi=()=>fo.createComment(""),wi=e=>e===null||typeof e!="object"&&typeof e!="function",An=Array.isArray,ql=e=>An(e)||typeof e?.[Symbol.iterator]=="function",_n=`[ 	
\f\r]`,gi=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pl=/-->/g,Vl=/>/g,po=RegExp(`>|${_n}(?:([^\\s"'>=/]+)(${_n}*=${_n}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Bl=/'/g,Hl=/"/g,Wl=/^(?:script|style|textarea|title)$/i,zn=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),b=zn(1),Ul=zn(2),jl=zn(3),Ae=Symbol.for("lit-noChange"),k=Symbol.for("lit-nothing"),Nl=new WeakMap,mo=fo.createTreeWalker(fo,129);function Gl(e,t){if(!An(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ll!==void 0?Ll.createHTML(t):t}var Kl=(e,t)=>{let o=e.length-1,i=[],r,n=t===2?"<svg>":t===3?"<math>":"",a=gi;for(let s=0;s<o;s++){let c=e[s],d,h,m=-1,p=0;for(;p<c.length&&(a.lastIndex=p,h=a.exec(c),h!==null);)p=a.lastIndex,a===gi?h[1]==="!--"?a=Pl:h[1]!==void 0?a=Vl:h[2]!==void 0?(Wl.test(h[2])&&(r=RegExp("</"+h[2],"g")),a=po):h[3]!==void 0&&(a=po):a===po?h[0]===">"?(a=r??gi,m=-1):h[1]===void 0?m=-2:(m=a.lastIndex-h[2].length,d=h[1],a=h[3]===void 0?po:h[3]==='"'?Hl:Bl):a===Hl||a===Bl?a=po:a===Pl||a===Vl?a=gi:(a=po,r=void 0);let f=a===po&&e[s+1].startsWith("/>")?" ":"";n+=a===gi?c+Pf:m>=0?(i.push(d),c.slice(0,m)+En+c.slice(m)+Tt+f):c+Tt+(m===-2?s:f)}return[Gl(e,n+(e[o]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},vi=class e{constructor({strings:t,_$litType$:o},i){let r;this.parts=[];let n=0,a=0,s=t.length-1,c=this.parts,[d,h]=Kl(t,o);if(this.el=e.createElement(d,i),mo.currentNode=this.el.content,o===2||o===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(r=mo.nextNode())!==null&&c.length<s;){if(r.nodeType===1){if(r.hasAttributes())for(let m of r.getAttributeNames())if(m.endsWith(En)){let p=h[a++],f=r.getAttribute(m).split(Tt),g=/([.?@])?(.*)/.exec(p);c.push({type:1,index:n,name:g[2],strings:f,ctor:g[1]==="."?ir:g[1]==="?"?rr:g[1]==="@"?nr:bo}),r.removeAttribute(m)}else m.startsWith(Tt)&&(c.push({type:6,index:n}),r.removeAttribute(m));if(Wl.test(r.tagName)){let m=r.textContent.split(Tt),p=m.length-1;if(p>0){r.textContent=tr?tr.emptyScript:"";for(let f=0;f<p;f++)r.append(m[f],bi()),mo.nextNode(),c.push({type:2,index:++n});r.append(m[p],bi())}}}else if(r.nodeType===8)if(r.data===Rn)c.push({type:2,index:n});else{let m=-1;for(;(m=r.data.indexOf(Tt,m+1))!==-1;)c.push({type:7,index:n}),m+=Tt.length-1}n++}}static createElement(t,o){let i=fo.createElement("template");return i.innerHTML=t,i}};function go(e,t,o=e,i){if(t===Ae)return t;let r=i!==void 0?o._$Co?.[i]:o._$Cl,n=wi(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(e),r._$AT(e,o,i)),i!==void 0?(o._$Co??=[])[i]=r:o._$Cl=r),r!==void 0&&(t=go(e,r._$AS(e,t.values),r,i)),t}var or=class{constructor(t,o){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:o},parts:i}=this._$AD,r=(t?.creationScope??fo).importNode(o,!0);mo.currentNode=r;let n=mo.nextNode(),a=0,s=0,c=i[0];for(;c!==void 0;){if(a===c.index){let d;c.type===2?d=new Vo(n,n.nextSibling,this,t):c.type===1?d=new c.ctor(n,c.name,c.strings,this,t):c.type===6&&(d=new ar(n,this,t)),this._$AV.push(d),c=i[++s]}a!==c?.index&&(n=mo.nextNode(),a++)}return mo.currentNode=fo,r}p(t){let o=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,o),o+=i.strings.length-2):i._$AI(t[o])),o++}},Vo=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,o,i,r){this.type=2,this._$AH=k,this._$AN=void 0,this._$AA=t,this._$AB=o,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,o=this._$AM;return o!==void 0&&t?.nodeType===11&&(t=o.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,o=this){t=go(this,t,o),wi(t)?t===k||t==null||t===""?(this._$AH!==k&&this._$AR(),this._$AH=k):t!==this._$AH&&t!==Ae&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ql(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==k&&wi(this._$AH)?this._$AA.nextSibling.data=t:this.T(fo.createTextNode(t)),this._$AH=t}$(t){let{values:o,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=vi.createElement(Gl(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(o);else{let n=new or(r,this),a=n.u(this.options);n.p(o),this.T(a),this._$AH=n}}_$AC(t){let o=Nl.get(t.strings);return o===void 0&&Nl.set(t.strings,o=new vi(t)),o}k(t){An(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,i,r=0;for(let n of t)r===o.length?o.push(i=new e(this.O(bi()),this.O(bi()),this,this.options)):i=o[r],i._$AI(n),r++;r<o.length&&(this._$AR(i&&i._$AB.nextSibling,r),o.length=r)}_$AR(t=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);t!==this._$AB;){let i=Tl(t).nextSibling;Tl(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},bo=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,o,i,r,n){this.type=1,this._$AH=k,this._$AN=void 0,this.element=t,this.name=o,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=k}_$AI(t,o=this,i,r){let n=this.strings,a=!1;if(n===void 0)t=go(this,t,o,0),a=!wi(t)||t!==this._$AH&&t!==Ae,a&&(this._$AH=t);else{let s=t,c,d;for(t=n[0],c=0;c<n.length-1;c++)d=go(this,s[i+c],o,c),d===Ae&&(d=this._$AH[c]),a||=!wi(d)||d!==this._$AH[c],d===k?t=k:t!==k&&(t+=(d??"")+n[c+1]),this._$AH[c]=d}a&&!r&&this.j(t)}j(t){t===k?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ir=class extends bo{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===k?void 0:t}},rr=class extends bo{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==k)}},nr=class extends bo{constructor(t,o,i,r,n){super(t,o,i,r,n),this.type=5}_$AI(t,o=this){if((t=go(this,t,o,0)??k)===Ae)return;let i=this._$AH,r=t===k&&i!==k||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==k&&(i===k||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ar=class{constructor(t,o,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=o,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){go(this,t)}},Yl={M:En,P:Tt,A:Rn,C:1,L:Kl,R:or,D:ql,V:go,I:Vo,H:bo,N:rr,U:nr,B:ir,F:ar},Vf=kn.litHtmlPolyfillSupport;Vf?.(vi,Vo),(kn.litHtmlVersions??=[]).push("3.3.3");var Xl=(e,t,o)=>{let i=o?.renderBefore??t,r=i._$litPart$;if(r===void 0){let n=o?.renderBefore??null;i._$litPart$=r=new Vo(t.insertBefore(bi(),n),n,void 0,o??{})}return r._$AI(e),r};var Fn=globalThis,Kt=class extends Ot{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Xl(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ae}};Kt._$litElement$=!0,Kt.finalized=!0,Fn.litElementHydrateSupport?.({LitElement:Kt});var Bf=Fn.litElementPolyfillSupport;Bf?.({LitElement:Kt});(Fn.litElementVersions??=[]).push("4.2.2");var Ql=E`
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
    align-items: start;
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
    min-height: 0;
    /** Allows the menu / aside to always be 100% of the height of the main content area */
    align-self: stretch;
    max-height: calc(100dvh - var(--header-top) - var(--banner-top) - var(--subheader-top));
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
`;var Bo=E`
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
`;var Hf=Object.defineProperty,Nf=Object.getOwnPropertyDescriptor,Jl=e=>{throw TypeError(e)},l=(e,t,o,i)=>{for(var r=i>1?void 0:i?Nf(t,o):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(r=(i?a(t,o,r):a(r))||r);return i&&r&&Hf(t,o,r),r},Zl=(e,t,o)=>t.has(e)||Jl("Cannot "+o),ec=(e,t,o)=>(Zl(e,t,"read from private field"),o?o.call(e):t.get(e)),tc=(e,t,o)=>t.has(e)?Jl("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,o),oc=(e,t,o,i)=>(Zl(e,t,"write to private field"),i?i.call(e,o):t.set(e,o),o);var F=e=>(t,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};var qf={attribute:!0,type:String,converter:fi,reflect:!1,hasChanged:er},Wf=(e=qf,t,o)=>{let{kind:i,metadata:r}=o,n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),n.set(o.name,e),i==="accessor"){let{name:a}=o;return{set(s){let c=t.get.call(this);t.set.call(this,s),this.requestUpdate(a,c,e,!0,s)},init(s){return s!==void 0&&this.C(a,void 0,e,s),s}}}if(i==="setter"){let{name:a}=o;return function(s){let c=this[a];t.call(this,s),this.requestUpdate(a,c,e,!0,s)}}throw Error("Unsupported decorator location: "+i)};function u(e){return(t,o)=>typeof o=="object"?Wf(e,t,o):((i,r,n)=>{let a=r.hasOwnProperty(n);return r.constructor.createProperty(n,i),a?Object.getOwnPropertyDescriptor(r,n):void 0})(e,t,o)}function I(e){return u({...e,state:!0,attribute:!1})}function ic(e){return(t,o)=>{let i=typeof t=="function"?t:t[o];Object.assign(i,e)}}var wo=(e,t,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,o),o);function _(e,t){return(o,i,r)=>{let n=a=>a.renderRoot?.querySelector(e)??null;if(t){let{get:a,set:s}=typeof i=="object"?o:r??(()=>{let c=Symbol();return{get(){return this[c]},set(d){this[c]=d}}})();return wo(o,i,{get(){let c=a.call(this);return c===void 0&&(c=n(this),(c!==null||this.hasUpdated)&&s.call(this,c)),c}})}return wo(o,i,{get(){return n(this)}})}}var Uf=E`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden],
  :host([hidden]) {
    display: none !important;
  }
`,jf=/;\s+$/;function Gf(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function rc(e){let{property:t,value:o,element:i}=e;if(o){let r=i.getAttribute("style")||"";r&&(r.match(jf)||(r+=";"),r+=" ");let n=`${t}: ${o}`;return r.includes(n)?void 0:`${r}${n};`}return null}var sr,V=class extends Kt{constructor(){super(),tc(this,sr,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(t,o)=>{if(this.internals?.states)try{o?this.internals.states.add(t):this.internals.states.delete(t)}catch(i){if(String(i).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw i}},has:t=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(t)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let e=this.constructor;for(let[t,o]of e.elementProperties)o.default==="inherit"&&o.initial!==void 0&&typeof t=="string"&&this.customStates.set(`initial-${t}-${o.initial}`,!0)}static get styles(){let e=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[Uf,...e]}connectedCallback(){super.connectedCallback(),this.didSSR||this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `)),this.didSSR&&this.updateComplete.then(()=>{this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `))})}attributeChangedCallback(e,t,o){ec(this,sr)||(this.constructor.elementProperties.forEach((i,r)=>{i.reflect&&this[r]!=null&&this.initialReflectedProperties.set(r,this[r])}),oc(this,sr,!0)),super.attributeChangedCallback(e,t,o)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,o)=>{e.has(o)&&this[o]==null&&(this[o]=t)})}firstUpdated(e){super.firstUpdated(e),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(t=>{t.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(e){try{super.update(e)}catch(t){if(this.didSSR&&!this.hasUpdated){let o=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});o.error=t,this.dispatchEvent(o)}throw t}}setStyle(e,t){if(!this.style){let o=rc({property:Gf(e),value:t,element:this});o&&this.setAttribute("style",o);return}this.style[e]=t}setStyleProperty(e,t){if(!this.style){let o=rc({property:e,value:t,element:this});o&&this.setAttribute("style",o);return}this.style.setProperty(e,t)}relayNativeEvent(e,t){e.stopImmediatePropagation(),this.dispatchEvent(new e.constructor(e.type,{...e,...t}))}};sr=new WeakMap;l([u()],V.prototype,"dir",2);l([u()],V.prototype,"lang",2);l([u({type:Boolean,reflect:!0,attribute:"did-ssr"})],V.prototype,"didSSR",2);var Ye={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},xt=e=>(...t)=>({_$litDirective$:e,values:t}),st=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,o,i){this._$Ct=t,this._$AM=o,this._$Ci=i}_$AS(t,o){return this.update(t,o)}update(t,o){return this.render(...o)}};var{I:Kf}=Yl,nc=e=>e;var sc=(e,t)=>t===void 0?e?._$litType$!==void 0:e?._$litType$===t;var lc=e=>e.strings===void 0,ac=()=>document.createComment(""),Ho=(e,t,o)=>{let i=e._$AA.parentNode,r=t===void 0?e._$AB:t._$AA;if(o===void 0){let n=i.insertBefore(ac(),r),a=i.insertBefore(ac(),r);o=new Kf(n,a,e,e.options)}else{let n=o._$AB.nextSibling,a=o._$AM,s=a!==e;if(s){let c;o._$AQ?.(e),o._$AM=e,o._$AP!==void 0&&(c=e._$AU)!==a._$AU&&o._$AP(c)}if(n!==r||s){let c=o._$AA;for(;c!==n;){let d=nc(c).nextSibling;nc(i).insertBefore(c,r),c=d}}}return o},Yt=(e,t,o=e)=>(e._$AI(t,o),e),Yf={},lr=(e,t=Yf)=>e._$AH=t,cc=e=>e._$AH,cr=e=>{e._$AR(),e._$AA.remove()};var ot=xt(class extends st{constructor(e){if(super(e),e.type!==Ye.PROPERTY&&e.type!==Ye.ATTRIBUTE&&e.type!==Ye.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!lc(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Ae||t===k)return t;let o=e.element,i=e.name;if(e.type===Ye.PROPERTY){if(t===o[i])return Ae}else if(e.type===Ye.BOOLEAN_ATTRIBUTE){if(!!t===o.hasAttribute(i))return Ae}else if(e.type===Ye.ATTRIBUTE&&o.getAttribute(i)===t+"")return Ae;return lr(e),t}});var yi=class extends st{constructor(t){if(super(t),this.it=k,t.type!==Ye.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===k||t==null)return this._t=void 0,this.it=t;if(t===Ae)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let o=[t];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}};yi.directiveName="unsafeHTML",yi.resultType=1;var Xt=xt(yi);function vo(e,t,o){return e?t(e):o?.(e)}function Xf(e,t=document.documentElement){if(!Number.isNaN(Number(e)))return Number(e);if(!window.CSS||!CSS.registerProperty)return typeof e=="string"&&e.endsWith("px")?parseFloat(e):Number(e)||0;let o="--wa-length-resolver";if(!CSS.registerProperty.toString().includes(o))try{CSS.registerProperty({name:o,syntax:"<length>",inherits:!1,initialValue:"0px"})}catch{}let i=t.style.getPropertyValue(o);t.style.setProperty(o,e);let r=getComputedStyle(t)?.getPropertyValue(o);return t.style.setProperty(o,i),r?.endsWith("px")?parseFloat(r):Number(r)||0}function Qf(e){return Number.isNaN(Number(e))?e:`${e}px`}var Oe=class extends V{constructor(){super(),this.headerResizeObserver=this.slotResizeObserver("header"),this.subheaderResizeObserver=this.slotResizeObserver("subheader"),this.bannerResizeObserver=this.slotResizeObserver("banner"),this.footerResizeObserver=this.slotResizeObserver("footer"),this.handleNavigationToggle=e=>{if(this.view==="desktop"){this.hideNavigation();return}let t=e.composedPath(),o=this.navigationToggleSlot;t.find(i=>i.hasAttribute?.("data-toggle-nav")||i.assignedSlot===o||i===o)&&(e.preventDefault(),this.toggleNavigation())},this.view="desktop",this.navOpen=!1,this.mobileBreakpoint="768px",this.navigationPlacement="start",this.disableNavigationToggle=!1,this.pageResizeObserver=typeof ResizeObserver<"u"?new ResizeObserver(e=>{requestAnimationFrame(()=>{for(let t of e)if(t.contentBoxSize){let i=t.borderBoxSize[0].inlineSize,r=this.view;i>=Xf(this.mobileBreakpoint)?this.view="desktop":this.view="mobile",this.requestUpdate("view",r)}})}):null,this.updateNavigationToggleState=e=>{if(e){let i=e.target.name;if(!["navigation","navigation-header","navigation-footer"].includes(i))return}let t=!!this.querySelector(":not([slot='navigation-toggle']) [data-toggle-nav]"),o=!!this.querySelector('[slot="navigation"]')||!!this.querySelector('[slot="navigation-header"]')||!!this.querySelector('[slot="navigation-footer"]');this.disableNavigationToggle=t||!o},this.addEventListener("click",this.handleNavigationToggle)}slotResizeObserver(e){return new ResizeObserver(t=>{requestAnimationFrame(()=>{for(let o of t)if(o.contentBoxSize){let i=o.borderBoxSize[0];this.style.setProperty(`--${e}-height`,`${Math.round(i.blockSize)}px`)}})})}updated(e){e.has("view")&&this.hideNavigation(),super.updated(e)}connectedCallback(){super.connectedCallback(),setTimeout(()=>{requestAnimationFrame(()=>{this.pageResizeObserver?.observe(this),this.headerResizeObserver?.observe(this.header),this.subheaderResizeObserver?.observe(this.subheader),this.bannerResizeObserver?.observe(this.banner),this.footerResizeObserver?.observe(this.footer)})})}visiblePixelsInViewport(e){if(!e)return null;let t=e.clientHeight,o=window.innerHeight,i=e.getBoundingClientRect?.();if(!i)return null;let{top:r,bottom:n}=i;return Math.max(0,r>0?Math.min(t,o-r):Math.min(n,o))}firstUpdated(e){if(!document.getElementById("main-content")){let t=document.createElement("div");t.id="main-content",t.slot="skip-to-content-target",this.prepend(t)}this.shadowRoot.addEventListener("slotchange",this.updateNavigationToggleState),this.updateNavigationToggleState(),super.firstUpdated(e)}disconnectedCallback(){super.disconnectedCallback(),this.pageResizeObserver?.unobserve(this),this.headerResizeObserver?.unobserve(this.header),this.subheaderResizeObserver?.unobserve(this.subheader),this.footerResizeObserver?.unobserve(this.footer),this.bannerResizeObserver?.unobserve(this.banner)}showNavigation(){this.navOpen=!0}hideNavigation(){this.navOpen=!1}toggleNavigation(){this.navOpen=!this.navOpen}render(){return b`
      <a href="#main-content" part="skip-to-content" class="wa-visually-hidden">
        <slot name="skip-to-content">Skip to content</slot>
      </a>

      <!-- unsafeHTML needed for SSR until this is solved: https://github.com/lit/lit/issues/4696 -->
      ${Xt(`
        <style id="mobile-styles">
          ${Fl(Qf(this.mobileBreakpoint))}
        </style>
      `)}

      <div class="base" part="base page">
        <div class="banner" part="banner">
          <slot name="banner"></slot>
        </div>
        <div class="header" part="header">
          <slot name="navigation-toggle">
            <wa-button part="navigation-toggle" size="s" appearance="plain" variant="neutral">
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
                  ${vo(this.view==="desktop",()=>b`<slot name="navigation-header"><div></div></slot>`,()=>b`<div></div>`)}
                </slot>
                <slot name="desktop-navigation">
                  ${vo(this.view==="desktop",()=>b`<slot name="navigation"><div></div></slot>`,()=>b`<div></div>`)}
                </slot>
                <slot name="desktop-navigation-footer">
                  ${vo(this.view==="desktop",()=>b`<slot name="navigation-footer"><div></div></slot>`,()=>b`<div></div>`)}
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
        ?open=${ot(this.navOpen)}
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
          ${vo(this.view==="mobile",()=>b`<slot name="navigation-header"><div></div></slot>`,()=>b`<div></div>`)}
        </slot>
        <slot name="mobile-navigation">
          ${vo(this.view==="mobile",()=>b`<slot name="navigation"><div></div></slot>`,()=>b`<div></div>`)}
        </slot>

        <slot slot="footer" name="mobile-navigation-footer">
          ${vo(this.view==="mobile",()=>b`<slot part="navigation-footer" name="navigation-footer"><div></div></slot>`,()=>b`<div></div>`)}
        </slot>
      </wa-drawer>
    `}};Oe.css=[Bo,Ql];l([_("[part~='header']")],Oe.prototype,"header",2);l([_("[part~='menu']")],Oe.prototype,"menu",2);l([_("[part~='main']")],Oe.prototype,"main",2);l([_("[part~='aside']")],Oe.prototype,"aside",2);l([_("[part~='subheader']")],Oe.prototype,"subheader",2);l([_("[part~='footer']")],Oe.prototype,"footer",2);l([_("[part~='banner']")],Oe.prototype,"banner",2);l([_("[part~='drawer']")],Oe.prototype,"navigationDrawer",2);l([_("slot[name~='navigation-toggle']")],Oe.prototype,"navigationToggleSlot",2);l([u({attribute:"view",reflect:!0})],Oe.prototype,"view",2);l([u({attribute:"nav-open",reflect:!0,type:Boolean})],Oe.prototype,"navOpen",2);l([u({attribute:"mobile-breakpoint",type:String})],Oe.prototype,"mobileBreakpoint",2);l([u({attribute:"navigation-placement",reflect:!0})],Oe.prototype,"navigationPlacement",2);l([u({attribute:"disable-navigation-toggle",reflect:!0,type:Boolean})],Oe.prototype,"disableNavigationToggle",2);Oe=l([F("wa-page")],Oe);var dr=class{constructor(e,t){this.element=e,this.callback=t}start(...e){if(!!1){this.observer??(this.observer=new ResizeObserver(()=>this.check())),this.observer.observe(this.element);for(let t of e)this.observer.observe(t);this.initialCheckHandle??(this.initialCheckHandle=requestAnimationFrame(()=>{this.initialCheckHandle=void 0,this.check()}))}}stop(){this.initialCheckHandle!==void 0&&(cancelAnimationFrame(this.initialCheckHandle),this.initialCheckHandle=void 0),this.observer?.disconnect()}check(){this.callback(this.element.getClientRects().length>0)}};function ur(e){return e.split(" ").map(t=>t.trim()).filter(t=>t!=="")}var dc=E`
  :host {
    --size: 25rem;
    --spacing: var(--wa-space-l);
    --backdrop-filter: none;
    --show-duration: var(--wa-transition-normal);
    --hide-duration: var(--wa-transition-normal);

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
    backdrop-filter: var(--backdrop-filter);
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
`;function Jf(e,t){return{top:Math.round(e.getBoundingClientRect().top-t.getBoundingClientRect().top),left:Math.round(e.getBoundingClientRect().left-t.getBoundingClientRect().left)}}var Dn=new Set;function Zf(){let e=document.documentElement.clientWidth;return Math.abs(window.innerWidth-e)}function eg(){let e=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(e)||!e?0:e}function Qt(e){if(Dn.add(e),!document.documentElement.classList.contains("wa-scroll-lock")){let t=Zf()+eg(),o=getComputedStyle(document.documentElement).scrollbarGutter;(!o||o==="auto")&&(o="stable"),t<2&&(o=""),document.documentElement.style.setProperty("--wa-scroll-lock-gutter",o),document.documentElement.classList.add("wa-scroll-lock"),document.documentElement.style.setProperty("--wa-scroll-lock-size",`${t}px`)}}function Jt(e){Dn.delete(e),Dn.size===0&&(document.documentElement.classList.remove("wa-scroll-lock"),document.documentElement.style.removeProperty("--wa-scroll-lock-size"))}function Lt(e,t,o="vertical",i="smooth"){let r=Jf(e,t),n=r.top+t.scrollTop,a=r.left+t.scrollLeft,s=t.scrollLeft,c=t.scrollLeft+t.offsetWidth,d=t.scrollTop,h=t.scrollTop+t.offsetHeight;(o==="horizontal"||o==="both")&&(a<s?t.scrollTo({left:a,behavior:i}):a+e.clientWidth>c&&t.scrollTo({left:a-t.offsetWidth+e.clientWidth,behavior:i})),(o==="vertical"||o==="both")&&(n<d?t.scrollTo({top:n,behavior:i}):n+e.clientHeight>h&&t.scrollTo({top:n-t.offsetHeight+e.clientHeight,behavior:i}))}var Te=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};var Le=class extends Event{constructor(e){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=e}};var Pe=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}};var Ve=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}};var yo=[];function Ue(e){ze(e),yo.push(e)}function ze(e){for(let t=yo.length-1;t>=0;t--)if(yo[t]===e){yo.splice(t,1);break}}function Be(e){return yo.length>0&&yo[yo.length-1]===e}var ce=class{constructor(e,...t){this.slotNames=[],this.handleSlotChange=o=>{let i=o.target;(this.slotNames.includes("[default]")&&!i.name||i.name&&this.slotNames.includes(i.name))&&this.host.requestUpdate()},(this.host=e).addController(this),this.slotNames=t}hasDefaultSlot(){return this.host.childNodes?[...this.host.childNodes].some(e=>{if(e.nodeType===Node.TEXT_NODE&&e.textContent.trim()!=="")return!0;if(e.nodeType===Node.ELEMENT_NODE){let t=e;if(t.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!t.hasAttribute("slot"))return!0}return!1}):!1}hasNamedSlot(e){return this.host.querySelector?.(`:scope > [slot="${e}"]`)!==null}test(e,t){return t&&this.host.didSSR&&!this.host.hasUpdated?!!this.host[t]:e==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){let e=this.host.shadowRoot;e&&"addEventListener"in e&&e.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){let e=this.host.shadowRoot;e&&"removeEventListener"in e&&e.removeEventListener("slotchange",this.handleSlotChange)}};async function No(e,t,o){return e.animate(t,o).finished.catch(()=>{})}function se(e,t){return new Promise(o=>{let i=new AbortController,{signal:r}=i;if(e.classList.contains(t))return;e.classList.add(t);let n=!1,a=()=>{n||(n=!0,e.classList.remove(t),o(),i.abort())};e.addEventListener("animationend",a,{once:!0,signal:r}),e.addEventListener("animationcancel",a,{once:!0,signal:r}),requestAnimationFrame(()=>{!n&&e.getAnimations().length===0&&a()})})}function qo(e){return e=e.toString().toLowerCase(),e.indexOf("ms")>-1?parseFloat(e)||0:e.indexOf("s")>-1?(parseFloat(e)||0)*1e3:parseFloat(e)||0}function S(e,t){let o={waitUntilFirstUpdate:!1,...t};return(i,r)=>{let{update:n}=i,a=Array.isArray(e)?e:[e];i.update=function(s){a.forEach(c=>{let d=c;if(s.has(d)){let h=s.get(d),m=this[d];h!==m&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[r](h,m)}}),n.call(this,s)}}}var In=new Set,Wo=new Map,Pt,$n="ltr",Mn="en",uc=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(uc){let e=new MutationObserver(hc);$n=document.documentElement.dir||"ltr",Mn=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function Uo(...e){e.map(t=>{let o=t.$code.toLowerCase();Wo.has(o)?Wo.set(o,Object.assign(Object.assign({},Wo.get(o)),t)):Wo.set(o,t),Pt||(Pt=t)}),hc()}function hc(){uc&&($n=document.documentElement.dir||"ltr",Mn=document.documentElement.lang||navigator.language),[...In.keys()].map(e=>{typeof e.requestUpdate=="function"&&e.requestUpdate()})}var hr=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){In.add(this.host)}hostDisconnected(){In.delete(this.host)}dir(){return`${this.host.dir||$n}`.toLowerCase()}lang(){let t=`${this.host.lang||Mn}`.toLowerCase().replace(/_/g,"-");try{return new Intl.Locale(t),t}catch{return Pt?Pt.$code.toLowerCase():"en"}}getTranslationData(t){var o,i;let r;try{r=new Intl.Locale(t.replace(/_/g,"-"))}catch{return{locale:void 0,language:"",region:"",primary:void 0,secondary:void 0}}let n=r.language.toLowerCase(),a=(i=(o=r.region)===null||o===void 0?void 0:o.toLowerCase())!==null&&i!==void 0?i:"",s=Wo.get(`${n}-${a}`),c=Wo.get(n);return{locale:r,language:n,region:a,primary:s,secondary:c}}exists(t,o){var i;let{primary:r,secondary:n}=this.getTranslationData((i=o.lang)!==null&&i!==void 0?i:this.lang());return o=Object.assign({includeFallback:!1},o),!!(r&&r[t]||n&&n[t]||o.includeFallback&&Pt&&Pt[t])}term(t,...o){let{primary:i,secondary:r}=this.getTranslationData(this.lang()),n;if(i&&i[t])n=i[t];else if(r&&r[t])n=r[t];else if(Pt&&Pt[t])n=Pt[t];else return console.error(`No translation found for: ${String(t)}`),String(t);return typeof n=="function"?n(...o):n}date(t,o){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),o).format(t)}number(t,o){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),o).format(t)}relativeTime(t,o,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(t,o)}};var pc={$code:"en",$name:"English",$dir:"ltr",am:"AM",autosizeColumn:"Autosize column",captions:"Captions",carousel:"Carousel",chooseDate:"Choose date",chooseDecade:"Choose decade",chooseMonth:"Choose month",chooseTime:"Choose time",chooseYear:"Choose year",clearEntry:"Clear entry",clearFilter:"Clear filter",clearSort:"Clear sort",close:"Close",closeCalendar:"Close calendar",closeTimeInput:"Close time picker",collapseRow:"Collapse row",columnMenu:"Column options",columnMovedToPosition:(e,t,o)=>`${e} moved to position ${t} of ${o}`,columns:"Columns",compactPageXOfY:(e,t)=>`${e} of ${t}`,copied:"Copied",copy:"Copy",createOption:e=>`Create "${e}"`,currentlyPlaying:"currently playing",currentValue:"Current value",date:"Date",datePickerKeyboardHelp:"Use arrow keys to change values; press Alt+Down Arrow to open the calendar.",day:"Day",dayPeriod:"AM/PM",decrement:"Decrement",deselectAllRows:"Deselect all rows",dropFileHere:"Drop file here or click to browse",dropFilesHere:"Drop files here or click to browse",empty:"Empty",endDate:"End date",enterFullscreen:"Enter fullscreen",error:"Error",exitFullscreen:"Exit fullscreen",expandRow:"Expand row",filterByColumn:e=>`Filter by ${e}`,filterFrom:"From",filterMax:"Max",filterMin:"Min",filterTo:"To",firstPage:"First page",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hideColumn:"Hide column",hidePassword:"Hide password",hour:"Hour",incompleteDate:"Enter a valid date.",increment:"Increment",jumpBackwardX:e=>`Jump back ${e} pages`,jumpForwardX:e=>`Jump forward ${e} pages`,lastPage:"Last page",loading:"Loading",minute:"Minute",month:"Month",moreOptions:"More Options",mute:"Mute",nextDecade:"Next decade",nextMonth:"Next month",nextPage:"Next page",nextSlide:"Next slide",nextVideo:"Next Video",nextYear:"Next year",noData:"No data",noResults:"No matching results",now:"Now",numCharacters:e=>e===1?"1 character":`${e} characters`,numCharactersRemaining:e=>e===1?"1 character remaining":`${e} characters remaining`,numOptionsSelected:e=>e===0?"No options selected":e===1?"1 option selected":`${e} options selected`,numRowsCopied:e=>e===1?"1 row copied":`${e} rows copied`,numRowsSelected:e=>e===1?"1 row selected":`${e} rows selected`,pageXOfY:(e,t)=>`Page ${e} of ${t}`,pagination:"Pagination",pause:"Pause",pauseAnimation:"Pause animation",pictureInPicture:"Picture in picture",pinLeft:"Pin left",pinRight:"Pin right",play:"Play",playAnimation:"Play animation",playbackSpeed:"Playback speed",playlist:"Playlist",pm:"PM",previousDecade:"Previous decade",previousMonth:"Previous month",previousPage:"Previous page",previousSlide:"Previous slide",previousVideo:"Previous video",previousYear:"Previous year",progress:"Progress",rangeTooLong:e=>e===1?"Select a range no longer than 1 day":`Select a range no longer than ${e} days`,rangeTooShort:e=>e===1?"Select a range at least 1 day long":`Select a range at least ${e} days long`,readonly:"Read-only",remove:"Remove",resetColumns:"Reset columns",resize:"Resize",resizeColumn:"Resize column",rowsPerPage:"Rows per page",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",search:"Search",second:"Second",seek:"Seek",seekProgress:(e,t)=>`${e} of ${t}`,selectAColorFromTheScreen:"Select a color from the screen",selectAllRows:"Select all rows",selected:"Selected",selectedDateLabel:e=>`Selected: ${e}`,selectedRangeLabel:e=>`Selected range: ${e}`,selectGroup:"Select group",selectionCleared:"Selection cleared",selectRow:"Select row",showingNofMRows:(e,t)=>`Showing ${e} of ${t} rows`,showingXtoYofZ:(e,t,o)=>`${e}\u2013${t} of ${o}`,showPassword:"Show password",slideNum:e=>`Slide ${e}`,sortAscending:"Sort ascending",sortColumn:"Sort column",sortDescending:"Sort descending",startDate:"Start date",time:"Time",timeInputKeyboardHelp:"Use arrow keys to change values; press Alt+Down Arrow to open the time picker.",today:"Today",toggleColorFormat:"Toggle color format",unmute:"Unmute",unpin:"Unpin",unpinColumn:"Unpin column",videoPlayer:"Video player",volume:"Volume",year:"Year",zoomIn:"Zoom in",zoomOut:"Zoom out"};Uo(pc);var mc=pc;var N=class extends hr{lang(){return this.host.didSSR&&!this.host.hasUpdated?this.host.lang||"en":super.lang()}};Uo(mc);var T=xt(class extends st{constructor(e){if(super(e),e.type!==Ye.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(let i in t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}let o=e.element.classList;for(let i of this.st)i in t||(o.remove(i),this.st.delete(i));for(let i in t){let r=!!t[i];r===this.st.has(i)||this.nt?.has(i)||(r?(o.add(i),this.st.add(i)):(o.remove(i),this.st.delete(i)))}return Ae}});var ht=class extends V{constructor(){super(...arguments),this.localize=new N(this),this.hasSlotController=new ce(this,"footer","header-actions","label"),this.renderedWatcher=new dr(this,e=>this.handleRenderedChange(e)),this.open=!1,this.label="",this.placement="end",this.withoutHeader=!1,this.lightDismiss=!1,this.withFooter=!1,this.handleDocumentKeyDown=e=>{e.key==="Escape"&&this.open&&Be(this)&&(e.preventDefault(),e.stopPropagation(),this.requestClose(this.drawer))}}firstUpdated(e){super.firstUpdated(e),this.open&&(this.addOpenListeners(),this.drawer.showModal(),Qt(this),this.renderedWatcher.start(this.drawer))}disconnectedCallback(){super.disconnectedCallback(),this.renderedWatcher.stop(),Jt(this),this.removeOpenListeners()}async requestClose(e){let t=new Le({source:e});if(this.dispatchEvent(t),t.defaultPrevented){this.open=!0,se(this.drawer,"pulse");return}this.removeOpenListeners(),await se(this.drawer,"hide"),this.open=!1,this.drawer.close(),Jt(this),this.renderedWatcher.stop();let o=this.originalTrigger;typeof o?.focus=="function"&&setTimeout(()=>o.focus()),this.dispatchEvent(new Pe)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown),Ue(this)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown),ze(this)}handleDialogCancel(e){e.preventDefault(),!this.drawer.classList.contains("hide")&&e.target===this.drawer&&Be(this)&&this.requestClose(this.drawer)}handleDialogClick(e){let o=e.target.closest('[data-drawer="close"]');o&&(e.stopPropagation(),this.requestClose(o))}async handleDialogPointerDown(e){e.target===this.drawer&&(this.lightDismiss?this.requestClose(this.drawer):await se(this.drawer,"pulse"))}handleRenderedChange(e){if(!this.open){this.renderedWatcher.stop();return}!e&&this.drawer.open?(this.removeOpenListeners(),this.drawer.close(),Jt(this)):e&&!this.drawer.open&&(this.addOpenListeners(),this.drawer.showModal(),Qt(this))}handleOpenChange(){this.open&&!this.drawer.open?this.show():this.drawer.open?(this.open=!0,this.requestClose(this.drawer)):this.open||this.renderedWatcher.stop()}async show(){let e=new Te;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.drawer.showModal(),Qt(this),this.renderedWatcher.start(this.drawer),requestAnimationFrame(()=>{let t=this.querySelector("[autofocus]");t&&typeof t.focus=="function"?t.focus():this.drawer.focus()}),await se(this.drawer,"show"),this.dispatchEvent(new Ve)}render(){let e=!this.withoutHeader,t=this.hasSlotController.test("footer","withFooter");return b`
      <dialog
        part="dialog"
        class=${T({drawer:!0,open:this.open,top:this.placement==="top",end:this.placement==="end",bottom:this.placement==="bottom",start:this.placement==="start"})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${e?b`
              <div part="header" class="header">
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
              </div>
            `:""}

        <div part="body" class="body"><slot></slot></div>

        <div part="footer" class="footer" ?hidden=${!t}>
          <slot name="footer"></slot>
        </div>
      </dialog>
    `}};ht.css=dc;l([_(".drawer")],ht.prototype,"drawer",2);l([u({type:Boolean,reflect:!0})],ht.prototype,"open",2);l([u({reflect:!0})],ht.prototype,"label",2);l([u({reflect:!0})],ht.prototype,"placement",2);l([u({attribute:"without-header",type:Boolean,reflect:!0})],ht.prototype,"withoutHeader",2);l([u({attribute:"light-dismiss",type:Boolean})],ht.prototype,"lightDismiss",2);l([u({attribute:"with-footer",type:Boolean})],ht.prototype,"withFooter",2);l([S("open",{waitUntilFirstUpdate:!0})],ht.prototype,"handleOpenChange",1);ht=l([F("wa-drawer")],ht);document.addEventListener("click",e=>{let t=e.target.closest("[data-drawer]");if(t instanceof Element){let[o,i]=ur(t.getAttribute("data-drawer")||"");if(o==="open"&&i?.length){let n=t.getRootNode().getElementById(i);n?.localName==="wa-drawer"?n.open=!0:console.warn(`A drawer with an ID of "${i}" could not be found in this document.`)}}}),document.addEventListener("pointerdown",()=>{});var Ct=()=>({checkValidity(e){let t=e.input,o={message:"",isValid:!0,invalidKeys:[]};if(!t)return o;let i=!0;if("checkValidity"in t&&(i=t.checkValidity()),i)return o;if(o.isValid=!1,"validationMessage"in t&&(o.message=t.validationMessage),!("validity"in t))return o.invalidKeys.push("customError"),o;for(let r in t.validity){if(r==="valid")continue;let n=r;t.validity[n]&&o.invalidKeys.push(n)}return o}});var pr=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}};var tg=()=>({observedAttributes:["custom-error"],checkValidity(e){let t={message:"",isValid:!0,invalidKeys:[]};return e.customError&&(t.message=e.customError,t.isValid=!1,t.invalidKeys=["customError"]),t}}),G=class extends V{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=e=>{e.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new pr))},this.handleInteraction=e=>{let t=this.emittedEvents;t.includes(e.type)||t.push(e.type),t.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},"addEventListener"in this&&this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[tg()]}static get observedAttributes(){let e=new Set(super.observedAttributes||[]);for(let t of this.validators)if(t.observedAttributes)for(let o of t.observedAttributes)e.add(o);return[...e]}connectedCallback(){super.connectedCallback(),this.didSSR&&!this.hasUpdated?this.updateComplete.then(()=>{this.updateValidity()}):this.updateValidity(),this.assumeInteractionOn.forEach(e=>{this.addEventListener?.(e,this.handleInteraction)})}firstUpdated(...e){super.firstUpdated(...e),this.updateValidity()}willUpdate(e){if(!!1&&e.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),e.has("value")||e.has("disabled")||e.has("defaultValue")){let t=this.value;this.updateFormValue(t)}e.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!!1&&!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),super.willUpdate(e),this.didSSR&&!this.hasUpdated?this.updateComplete.then(()=>this.updateValidity()):this.updateValidity()}updateFormValue(e){if(Array.isArray(e)){if(this.name){let t=new FormData;for(let o of e)t.append(this.name,o);this.setValue(t,t)}}else this.setValue(e,e)}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(e){e?this.setAttribute("form",e):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...e){let t=e[0],o=e[1],i=e[2];i||(i=this.validationTarget),this.internals.setValidity(t,o,i||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){let e=!!this.required,t=this.internals.validity.valid,o=this.hasInteracted;this.customStates.set("required",e),this.customStates.set("optional",!e),this.customStates.set("invalid",!t),this.customStates.set("valid",t),this.customStates.set("user-invalid",!t&&o),this.customStates.set("user-valid",t&&o)}setCustomValidity(e){if(!e){this.customError=null,this.setValidity({});return}this.customError=e,this.setValidity({customError:!0},e,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(e){this.disabled=e,this.updateValidity()}formStateRestoreCallback(e,t){this.didSSR&&!this.hasUpdated?this.updateComplete.then(()=>{this.value=e,t==="restore"&&this.resetValidity(),this.updateValidity()}):(this.value=e,t==="restore"&&this.resetValidity(),this.updateValidity())}setValue(...e){let[t,o]=e;this.internals.setFormValue(t,o)}get allValidators(){let e=this.constructor.validators||[],t=this.validators||[];return[...e,...t]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}let e=this.allValidators;if(!e?.length)return;let t={customError:!!this.customError},o=this.validationTarget||this.input||void 0,i="";for(let r of e){let{isValid:n,message:a,invalidKeys:s}=r.checkValidity(this);n||(i||(i=a),s?.length>=0&&s.forEach(c=>t[c]=!0))}i||(i=this.validationMessage),this.setValidity(t,i,o)}};G.formAssociated=!0;l([u({reflect:!0})],G.prototype,"name",2);l([u({type:Boolean})],G.prototype,"disabled",2);l([u({state:!0,attribute:!1})],G.prototype,"valueHasChanged",2);l([u({state:!0,attribute:!1})],G.prototype,"hasInteracted",2);l([u({attribute:"custom-error",reflect:!0})],G.prototype,"customError",2);l([u({attribute:!1,state:!0,type:Object})],G.prototype,"validity",1);var fc=E`
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
    transition-property: background, border, box-shadow, color, opacity, transform;
    transition-duration: var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    transform-origin: center;
    cursor: pointer;
    padding: 0 var(--wa-form-control-padding-inline);
    font-family: inherit;
    font-size: inherit;
    font-weight: var(--wa-font-weight-action);
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

  /* Hover and active transforms */
  .button:not(.disabled):not(.loading) {
    @media (hover: hover) {
      &:hover {
        transform: var(--wa-button-transform-hover);
      }
    }
    &:active {
      transform: var(--wa-button-transform-active);
    }

    @media (prefers-reduced-motion: reduce) {
      &:hover,
      &:active {
        transform: none;
      }
    }
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

  /* Icon buttons with a caret need to grow to fit both the icon and the caret */
  .button.is-icon-button.caret {
    width: auto;
    aspect-ratio: auto;
    min-width: var(--wa-form-control-height);
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
    justify-content: center;
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
      /* Hidden with opacity, not visibility, so the label stays in the accessibility tree */
      opacity: 0;

      /* Unlike visibility: hidden, opacity leaves the content clickable */
      pointer-events: none;
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
`;var On={small:"s",medium:"m",large:"l"};function bc(e){return On[e]??e}var gc=new Set;function te(e,t){t in On&&!gc.has(`${e}:${t}`)&&(gc.add(`${e}:${t}`),console.warn(`[${e}] size="${t}" is deprecated. Use size="${On[t]}" instead. The long-form value will be removed in the next major version.`))}var oe=E`
  :host([size='xs']) {
    font-size: var(--wa-font-size-xs);
  }

  :host([size='s']),
  :host([size='small']) {
    font-size: var(--wa-font-size-s);
  }

  :host([size='m']),
  :host([size='medium']) {
    font-size: var(--wa-font-size-m);
  }

  :host([size='l']),
  :host([size='large']) {
    font-size: var(--wa-font-size-l);
  }

  :host([size='xl']) {
    font-size: var(--wa-font-size-xl);
  }
`;var Zt=E`
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
`;var z=e=>e??k;var vc=Symbol.for(""),og=e=>{if(e?.r===vc)return e?._$litStatic$};var Tn=(e,...t)=>({_$litStatic$:t.reduce((o,i,r)=>o+(n=>{if(n._$litStatic$!==void 0)return n._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${n}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(i)+e[r+1],e[0]),r:vc}),wc=new Map,Ln=e=>(t,...o)=>{let i=o.length,r,n,a=[],s=[],c,d=0,h=!1;for(;d<i;){for(c=t[d];d<i&&(n=o[d],(r=og(n))!==void 0);)c+=r+t[++d],h=!0;d!==i&&s.push(n),a.push(c),d++}if(d===i&&a.push(t[i]),h){let m=a.join("$$lit$$");(t=wc.get(m))===void 0&&(a.raw=a,wc.set(m,t=a)),o=s}return e(t,...o)},mr=Ln(b),Iy=Ln(Ul),$y=Ln(jl);var ie=class extends G{constructor(){super(...arguments),this.assumeInteractionOn=["click"],this.hasSlotController=new ce(this,"[default]","start","end"),this.localize=new N(this),this.invalid=!1,this.isIconButton=!1,this.title="",this.variant="neutral",this.appearance="accent",this.size="m",this.withCaret=!1,this.withStart=!1,this.withEnd=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type="button"}static get validators(){return[...super.validators,Ct()]}handleSizeChange(){te(this.localName,this.size)}constructLightDOMButton(){let e=document.createElement("button");for(let t of this.attributes)t.name!=="style"&&e.setAttribute(t.name,t.value);return e.type=this.type,e.style.position="absolute !important",e.style.width="0 !important",e.style.height="0 !important",e.style.clipPath="inset(50%) !important",e.style.overflow="hidden !important",e.style.whiteSpace="nowrap !important",this.name&&(e.name=this.name),e.value=this.value||"",e}handleClick(e){if(this.disabled||this.loading){e.preventDefault(),e.stopImmediatePropagation();return}if(this.type!=="submit"&&this.type!=="reset"||!this.getForm())return;let o=this.constructLightDOMButton();this.parentElement?.append(o),o.click(),o.remove()}handleInvalid(){this.dispatchEvent(new pr)}handleLabelSlotChange(){let e=this.labelSlot.assignedNodes({flatten:!0}),t=!1,o=!1,i=!1,r=!1;[...e].forEach(n=>{if(n.nodeType===Node.ELEMENT_NODE){let a=n;a.localName==="wa-icon"?(o=!0,t||(t=a.label!==void 0)):r=!0}else n.nodeType===Node.TEXT_NODE&&(n.textContent?.trim()||"").length>0&&(i=!0)}),this.isIconButton=o&&!i&&!r,this.customStates.set("icon-button",this.isIconButton),this.isIconButton&&!t&&console.warn('Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.customStates.set("disabled",this.disabled),this.updateValidity()}handleHrefChange(){this.customStates.set("link",this.isLink())}handleLoadingChange(){this.customStates.set("loading",this.loading)}setValue(...e){}click(){this.button.click()}focus(e){this.button.focus(e)}blur(){this.button.blur()}render(){let e=this.isLink(),t=e?Tn`a`:Tn`button`;return mr`
      <${t}
        part="base button"
        class=${T({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:this.localize.dir()==="rtl","has-label":this.hasSlotController.test("[default]"),"has-start":this.hasSlotController.test("start","withStart"),"has-end":this.hasSlotController.test("end","withEnd"),"is-icon-button":this.isIconButton})}
        ?disabled=${z(e?void 0:this.disabled)}
        type=${z(e?void 0:this.type)}
        title=${this.title}
        name=${z(e?void 0:this.name)}
        value=${z(e?void 0:this.value)}
        href=${z(e?this.href:void 0)}
        target=${z(e?this.target:void 0)}
        download=${z(e?this.download:void 0)}
        rel=${z(e&&this.rel?this.rel:void 0)}
        role=${z(e?void 0:"button")}
        aria-disabled=${z(e&&this.disabled?"true":void 0)}
        aria-busy=${this.loading?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret?mr`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              `:""}
        ${this.loading?mr`<wa-spinner part="spinner"></wa-spinner>`:""}
      </${t}>
    `}};ie.shadowRootOptions={...G.shadowRootOptions,delegatesFocus:!0};ie.css=[fc,Zt,oe];l([_(".button")],ie.prototype,"button",2);l([_("slot:not([name])")],ie.prototype,"labelSlot",2);l([I()],ie.prototype,"invalid",2);l([I()],ie.prototype,"isIconButton",2);l([u()],ie.prototype,"title",2);l([u({reflect:!0})],ie.prototype,"variant",2);l([u({reflect:!0})],ie.prototype,"appearance",2);l([u({reflect:!0})],ie.prototype,"size",2);l([S("size")],ie.prototype,"handleSizeChange",1);l([u({attribute:"with-caret",type:Boolean,reflect:!0})],ie.prototype,"withCaret",2);l([u({attribute:"with-start",type:Boolean})],ie.prototype,"withStart",2);l([u({attribute:"with-end",type:Boolean})],ie.prototype,"withEnd",2);l([u({type:Boolean})],ie.prototype,"disabled",2);l([u({type:Boolean,reflect:!0})],ie.prototype,"loading",2);l([u({type:Boolean,reflect:!0})],ie.prototype,"pill",2);l([u()],ie.prototype,"type",2);l([u({reflect:!0})],ie.prototype,"name",2);l([u({reflect:!0})],ie.prototype,"value",2);l([u({reflect:!0})],ie.prototype,"href",2);l([u()],ie.prototype,"target",2);l([u()],ie.prototype,"rel",2);l([u()],ie.prototype,"download",2);l([u({attribute:"formaction"})],ie.prototype,"formAction",2);l([u({attribute:"formenctype"})],ie.prototype,"formEnctype",2);l([u({attribute:"formmethod"})],ie.prototype,"formMethod",2);l([u({attribute:"formnovalidate",type:Boolean})],ie.prototype,"formNoValidate",2);l([u({attribute:"formtarget"})],ie.prototype,"formTarget",2);l([S("disabled",{waitUntilFirstUpdate:!0})],ie.prototype,"handleDisabledChange",1);l([S("href")],ie.prototype,"handleHrefChange",1);l([S("loading",{waitUntilFirstUpdate:!0})],ie.prototype,"handleLoadingChange",1);ie=l([F("wa-button")],ie);ie.disableWarning?.("change-in-update");var yc=E`
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
`;var Pn=class extends V{constructor(){super(...arguments),this.localize=new N(this)}render(){return b`
      <svg
        part="base spinner"
        role="progressbar"
        aria-label=${this.localize.term("loading")}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" />
        <circle class="indicator" />
      </svg>
    `}};Pn.css=yc;Pn=l([F("wa-spinner")],Pn);var xc=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}};var Cc=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}};var Sc=E`
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

  /* #region Canvas — the box the icon is centered within (mirrors Font Awesome's icon canvas). Orthogonal to font-size. */

  /* Fixed width (default): 1.25em × 1em (20 × 16px) */
  :host(:not([canvas])),
  :host([canvas='fixed']) {
    width: 1.25em;
    height: 1em;
    min-width: 1.25em; /* <-- this is what Safari respects for intrinsic */
    min-height: 1em;
  }

  /* Auto: hug the icon's width. \`auto-width\` is the deprecated alias for canvas="auto". */
  :host([canvas='auto']),
  :host([auto-width]:not([canvas])) {
    width: auto;
    height: 1em;
  }

  /* Square: 1.25em × 1.25em (20 × 20px) */
  :host([canvas='square']) {
    width: 1.25em;
    height: 1.25em;
    min-width: 1.25em;
    min-height: 1.25em;
  }

  /* Roomy: 1.5em × 1.5em (24 × 24px) */
  :host([canvas='roomy']) {
    width: 1.5em;
    height: 1.5em;
    min-width: 1.5em;
    min-height: 1.5em;
  }

  /* #endregion */

  svg {
    /* NOTE: Avoid setting fill here. A stylesheet rule beats SVG presentation attributes, breaking stroke-based
       libraries like Lucide (fill="none" stroke="currentColor") and attribute-based mutators (issue #1733). The default
       library applies fill="currentColor" in its mutator instead. */
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

  /* #region Animations — ported from Font Awesome 7.3 (--fa-* props mapped to wa-icon's --* names) */

  :host([animation='beat']) {
    animation-name: beat;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='bounce']) {
    animation-name: bounce;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
  }

  :host([animation='fade']) {
    animation-name: fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='beat-fade']) {
    animation-name: beat-fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='flip']) {
    animation-name: flip;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1.5s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='flip-360']) {
    animation-name: flip-360;
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
    animation-duration: var(--animation-duration, 0.75s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
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
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, steps(8));
  }

  /* spin-reverse is FA's reverse modifier expressed as a standalone value; reverse any spin via --animation-direction: reverse */
  :host([animation='spin-reverse']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, reverse);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap']) {
    animation-name: spin-snap;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 3s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap-4']) {
    animation-name: spin-snap-4;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 2.4s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap-8']) {
    animation-name: spin-snap-8;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 4s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='buzz']) {
    animation-name: buzz;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.6s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='wag']) {
    animation-name: wag;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.9s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
    transform-origin: bottom center;
  }

  :host([animation='float']) {
    animation-name: float;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 3s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
    will-change: transform;
  }

  :host([animation='swing']) {
    animation-name: swing;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1.2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
    transform-origin: top center;
  }

  :host([animation='jello']) {
    animation-name: jello;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.9s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
  }

  @media (prefers-reduced-motion: reduce) {
    :host([animation='beat']),
    :host([animation='bounce']),
    :host([animation='fade']),
    :host([animation='beat-fade']),
    :host([animation='flip']),
    :host([animation='flip-360']),
    :host([animation='shake']),
    :host([animation='spin']),
    :host([animation='spin-pulse']),
    :host([animation='spin-reverse']),
    :host([animation='spin-snap']),
    :host([animation='spin-snap-4']),
    :host([animation='spin-snap-8']),
    :host([animation='buzz']),
    :host([animation='wag']),
    :host([animation='float']),
    :host([animation='swing']),
    :host([animation='jello']) {
      animation: none !important;
      transition: none !important;
    }
  }

  /* #endregion */

  /* #region Keyframes — ported verbatim from Font Awesome 7.3 */

  @keyframes beat {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(calc(1.25 * var(--beat-scale, 1.25)));
    }
    45% {
      transform: scale(calc(1.22 * var(--beat-scale, 1.22)));
    }
    65% {
      transform: scale(calc(1.25 * var(--beat-scale, 1.25)));
    }
    90% {
      transform: scale(1);
    }
  }

  @keyframes bounce {
    0% {
      transform: scale(1, 1) translateY(0);
      /* No fallback by design (ported from FA 7.3): the first segment uses the user's --animation-timing or the CSS
         initial ease, while the explicit cubic-beziers on later stops drive the bounce physics. */
      animation-timing-function: var(--animation-timing);
    }
    14% {
      transform: scale(var(--bounce-start-scale-x, 1.06), var(--bounce-start-scale-y, 0.94))
        translateY(var(--bounce-anticipation, 3px));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    32% {
      transform: scale(var(--bounce-jump-scale-x, 0.94), var(--bounce-jump-scale-y, 1.12))
        translateY(calc(-1 * var(--bounce-height, 0.5em)));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    52% {
      transform: scale(1, 1) translateY(calc(-1 * var(--bounce-height, 0.5em) * 1.1));
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    70% {
      transform: scale(var(--bounce-land-scale-x, 1.06), var(--bounce-land-scale-y, 0.92)) translateY(0);
      animation-timing-function: cubic-bezier(0.33, 0.33, 0.66, 1);
    }
    85% {
      transform: scale(0.98, 1.04) translateY(calc(-2px * var(--bounce-rebound, 1)));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }

  @keyframes fade {
    0% {
      opacity: 1;
      transform: scale(1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    40% {
      opacity: var(--fade-opacity, 0.4);
      transform: scale(0.98);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes beat-fade {
    0% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    25% {
      opacity: calc(var(--beat-fade-opacity, 0.4) + 0.4);
      transform: scale(var(--beat-fade-scale, 1.28));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    45% {
      opacity: 1;
      transform: scale(var(--beat-fade-scale, 1.25));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    65% {
      opacity: calc(var(--beat-fade-opacity, 0.4) + 0.4);
      transform: scale(var(--beat-fade-scale, 1.28));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    100% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
    }
  }

  @keyframes flip {
    0% {
      transform: perspective(2em) scale(1) rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    8% {
      transform: perspective(2em) scale(var(--flip-anticipation-scale, 0.95))
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    35% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.6));
      animation-timing-function: linear;
    }
    65% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.5));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    92% {
      transform: perspective(2em) scale(1)
        rotate3d(
          var(--flip-x, 0),
          var(--flip-y, 1),
          var(--flip-z, 0),
          calc(var(--flip-angle, -360deg) * var(--flip-overshoot, 1.04))
        );
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -360deg));
    }
  }

  @keyframes flip-360 {
    0% {
      transform: perspective(2em) scale(1) rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    8% {
      transform: perspective(2em) scale(var(--flip-anticipation-scale, 0.95))
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    50% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.6));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    80% {
      transform: perspective(2em) scale(1)
        rotate3d(
          var(--flip-x, 0),
          var(--flip-y, 1),
          var(--flip-z, 0),
          calc(var(--flip-angle, -360deg) * var(--flip-overshoot, 1.04))
        );
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -360deg));
    }
  }

  @keyframes shake {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    8% {
      transform: rotate(35deg) translateX(1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    20% {
      transform: rotate(-22deg) translateX(-1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    35% {
      transform: rotate(15deg) translateX(1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    50% {
      transform: rotate(-9deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    65% {
      transform: rotate(5deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    78% {
      transform: rotate(-3deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    90% {
      transform: rotate(1deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
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

  @keyframes spin-snap {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    12% {
      transform: rotate(60deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    16.67% {
      transform: rotate(60deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    28.67% {
      transform: rotate(120deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    33.33% {
      transform: rotate(120deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    45.33% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    62% {
      transform: rotate(240deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    66.67% {
      transform: rotate(240deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    78.67% {
      transform: rotate(300deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    83.33% {
      transform: rotate(300deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    95.33% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-snap-4 {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    15% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    25% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    40% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    65% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    75% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    90% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-snap-8 {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    9% {
      transform: rotate(45deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    12.5% {
      transform: rotate(45deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    21.5% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    25% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    34% {
      transform: rotate(135deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    37.5% {
      transform: rotate(135deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    46.5% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    59% {
      transform: rotate(225deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    62.5% {
      transform: rotate(225deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    71.5% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    75% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    84% {
      transform: rotate(315deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    87.5% {
      transform: rotate(315deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    96.5% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes buzz {
    0% {
      transform: translateX(0) rotate(0deg);
      animation-timing-function: cubic-bezier(0.1, 0, 0.9, 1);
    }
    5% {
      transform: translateX(var(--buzz-distance, 4px)) rotate(0.5deg);
    }
    10% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px))) rotate(-0.5deg);
    }
    15% {
      transform: translateX(var(--buzz-distance, 4px)) rotate(0.3deg);
    }
    20% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px))) rotate(-0.3deg);
    }
    25% {
      transform: translateX(calc(var(--buzz-distance, 4px) * 0.7)) rotate(0.2deg);
    }
    30% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px) * 0.7)) rotate(-0.2deg);
    }
    35% {
      transform: translateX(calc(var(--buzz-distance, 4px) * 0.4)) rotate(0.1deg);
    }
    40% {
      transform: translateX(0) rotate(0deg);
    }
    100% {
      transform: translateX(0) rotate(0deg);
    }
  }

  @keyframes wag {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    12% {
      transform: rotate(var(--wag-angle, 12deg));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    24% {
      transform: rotate(2deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    36% {
      transform: rotate(calc(var(--wag-angle, 12deg) * 0.85));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    48% {
      transform: rotate(1deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    58% {
      transform: rotate(calc(var(--wag-angle, 12deg) * 0.6));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    68% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    15% {
      transform: translateY(calc(-0.4 * var(--float-height, 6px))) translateX(var(--float-drift, 1px))
        rotate(var(--float-tilt, 1deg)) scale(1, 1);
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    35% {
      transform: translateY(calc(-1 * var(--float-height, 6px))) translateX(0) rotate(0deg)
        scale(var(--float-stretch-x, 0.98), var(--float-stretch-y, 1.03));
      animation-timing-function: cubic-bezier(0.5, 0, 0.5, 0);
    }
    50% {
      transform: translateY(calc(-0.92 * var(--float-height, 6px))) translateX(calc(-0.5 * var(--float-drift, 1px)))
        rotate(calc(-0.5 * var(--float-tilt, 1deg))) scale(0.995, 1.01);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    70% {
      transform: translateY(calc(-0.3 * var(--float-height, 6px))) translateX(calc(-1 * var(--float-drift, 1px)))
        rotate(calc(-1 * var(--float-tilt, 1deg))) scale(1, 1);
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    90% {
      transform: translateY(calc(0.05 * var(--float-height, 6px))) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: translateY(0) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
    }
  }

  @keyframes swing {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    8% {
      transform: rotate(var(--swing-angle, 22deg));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    18% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.85));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    28% {
      transform: rotate(calc(var(--swing-angle, 22deg) * 0.65));
      animation-timing-function: cubic-bezier(0.35, 0, 0.65, 1);
    }
    38% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.45));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    48% {
      transform: rotate(calc(var(--swing-angle, 22deg) * 0.25));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    56% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.1));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    64% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes jello {
    0% {
      transform: scale(1, 1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    12% {
      transform: scale(var(--jello-scale-x, 1.15), calc(2 - var(--jello-scale-x, 1.15)));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    24% {
      transform: scale(calc(2 - var(--jello-scale-y, 1.12)), var(--jello-scale-y, 1.12));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    36% {
      transform: scale(
        calc(1 + (var(--jello-scale-x, 1.15) - 1) * 0.5),
        calc(2 - (1 + (var(--jello-scale-x, 1.15) - 1) * 0.5))
      );
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    48% {
      transform: scale(
        calc(2 - (1 + (var(--jello-scale-y, 1.12) - 1) * 0.3)),
        calc(1 + (var(--jello-scale-y, 1.12) - 1) * 0.3)
      );
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    58% {
      transform: scale(1.02, 0.98);
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    68% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  /* #endregion */
`;var Vn="",ig="",Bn="";function Hn(e){Vn=e}function Nn(e=""){if(!Vn){let t=document.querySelector("[data-webawesome]");if(t?.hasAttribute("data-webawesome")){let o=new URL(t.getAttribute("data-webawesome")??"",window.location.href).pathname;Hn(o)}else{let i=[...document.getElementsByTagName("script")].find(r=>r.src.endsWith("webawesome.js")||r.src.endsWith("webawesome.loader.js")||r.src.endsWith("webawesome.ssr-loader.js"));if(i){let r=String(i.getAttribute("src"));Hn(r.split("/").slice(0,-1).join("/"))}}}return Vn.replace(/\/$/,"")+(e?`/${e.replace(/^\//,"")}`:"")}function qn(){return ig.replace(/\/$/,"")}function _c(e){Bn=e}function Wn(){if(!Bn){let e=document.querySelector("[data-fa-kit-code]");e&&_c(e.getAttribute("data-fa-kit-code")||"")}return Bn}var kc="7.3.0";function Ec(e,t,o){let i="solid";return t==="chisel"&&(i="chisel-regular"),t==="etch"&&(i="etch-solid"),t==="graphite"&&(i="graphite-thin"),t==="jelly"&&(i="jelly-regular",o==="duo-regular"&&(i="jelly-duo-regular"),o==="fill-regular"&&(i="jelly-fill-regular")),t==="jelly-duo"&&(i="jelly-duo-regular"),t==="jelly-fill"&&(i="jelly-fill-regular"),t==="notdog"&&(o==="solid"&&(i="notdog-solid"),o==="duo-solid"&&(i="notdog-duo-solid")),t==="notdog-duo"&&(i="notdog-duo-solid"),t==="slab"&&((o==="solid"||o==="regular")&&(i="slab-regular"),o==="press-regular"&&(i="slab-press-regular")),t==="slab-press"&&(i="slab-press-regular"),t==="slab-duo"&&(i="slab-duo-regular"),t==="slab-press-duo"&&(i="slab-press-duo-regular"),t==="thumbprint"&&(i="thumbprint-light"),t==="utility"&&(i="utility-semibold"),t==="utility-duo"&&(i="utility-duo-semibold"),t==="utility-fill"&&(i="utility-fill-semibold"),t==="whiteboard"&&(i="whiteboard-semibold"),t==="mosaic"&&(i="mosaic-solid"),t==="pixel"&&(i="pixel-regular"),t==="vellum"&&(i="vellum-solid"),t==="classic"&&(o==="thin"&&(i="thin"),o==="light"&&(i="light"),o==="regular"&&(i="regular"),o==="solid"&&(i="solid")),t==="duotone"&&(o==="thin"&&(i="duotone-thin"),o==="light"&&(i="duotone-light"),o==="regular"&&(i="duotone-regular"),o==="solid"&&(i="duotone")),t==="sharp"&&(o==="thin"&&(i="sharp-thin"),o==="light"&&(i="sharp-light"),o==="regular"&&(i="sharp-regular"),o==="solid"&&(i="sharp-solid")),t==="sharp-duotone"&&(o==="thin"&&(i="sharp-duotone-thin"),o==="light"&&(i="sharp-duotone-light"),o==="regular"&&(i="sharp-duotone-regular"),o==="solid"&&(i="sharp-duotone-solid")),t==="brands"&&(i="brands"),i}function rg(e,t,o){let i=Ec(e,t,o),r=qn();if(r)return`${r}/${i}/${e}.svg`;let n=Wn();return n.length>0?`https://ka-p.fontawesome.com/releases/v${kc}/svgs/${i}/${e}.svg?token=${encodeURIComponent(n)}`:`https://ka-f.fontawesome.com/releases/v${kc}/svgs/${i}/${e}.svg`}var ng={name:"default",resolver:(e,t="classic",o="solid")=>rg(e,t,o),mutator:(e,t)=>{if(e.hasAttribute("fill")||e.setAttribute("fill","currentColor"),t?.family&&!e.hasAttribute("data-duotone-initialized")){let{family:o,variant:i}=t;if(o==="duotone"||o==="sharp-duotone"||o==="notdog-duo"||o==="notdog"&&i==="duo-solid"||o==="jelly-duo"||o==="jelly"&&i==="duo-regular"||o==="utility-duo"||o==="slab-duo"||o==="slab-press-duo"||o==="thumbprint"){let r=[...e.querySelectorAll("path")],n=r.find(s=>!s.hasAttribute("opacity")),a=r.find(s=>s.hasAttribute("opacity"));if(!n||!a)return;if(n.setAttribute("data-duotone-primary",""),a.setAttribute("data-duotone-secondary",""),t.swapOpacity&&n&&a){let s=a.getAttribute("opacity")||"0.4";n.style.setProperty("--path-opacity",s),a.style.setProperty("--path-opacity","1")}e.setAttribute("data-duotone-initialized","")}}}},Rc=ng;function ag(e){return`data:image/svg+xml,${encodeURIComponent(e)}`}var Un={solid:{backward:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M236.3 107.1C247.9 96 265 92.9 279.7 99.2C294.4 105.5 304 120 304 136L304 272.3L476.3 107.2C487.9 96 505 92.9 519.7 99.2C534.4 105.5 544 120 544 136L544 504C544 520 534.4 534.5 519.7 540.8C505 547.1 487.9 544 476.3 532.9L304 367.7L304 504C304 520 294.4 534.5 279.7 540.8C265 547.1 247.9 544 236.3 532.9L44.3 348.9C36.5 341.3 32 330.9 32 320C32 309.1 36.5 298.7 44.3 291.1L236.3 107.1z"/></svg>',"backward-step":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M491 100.8C478.1 93.8 462.3 94.5 450 102.6L192 272.1L192 128C192 110.3 177.7 96 160 96C142.3 96 128 110.3 128 128L128 512C128 529.7 142.3 544 160 544C177.7 544 192 529.7 192 512L192 367.9L450 537.5C462.3 545.6 478 546.3 491 539.3C504 532.3 512 518.8 512 504.1L512 136.1C512 121.4 503.9 107.9 491 100.9z"/></svg>',"angles-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M77.3 256 214.7 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256zm192 0L406.7 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L269.3 256z"/></svg>',"angles-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M434.7 256 297.3 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 256zm-192 0L105.3 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256z"/></svg>',check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',"closed-captioning":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M64 192C64 156.7 92.7 128 128 128L512 128C547.3 128 576 156.7 576 192L576 448C576 483.3 547.3 512 512 512L128 512C92.7 512 64 483.3 64 448L64 192zM216 272L248 272C252.4 272 256 275.6 256 280C256 293.3 266.7 304 280 304C293.3 304 304 293.3 304 280C304 249.1 278.9 224 248 224L216 224C185.1 224 160 249.1 160 280L160 360C160 390.9 185.1 416 216 416L248 416C278.9 416 304 390.9 304 360C304 346.7 293.3 336 280 336C266.7 336 256 346.7 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 280C208 275.6 211.6 272 216 272zM384 280C384 275.6 387.6 272 392 272L424 272C428.4 272 432 275.6 432 280C432 293.3 442.7 304 456 304C469.3 304 480 293.3 480 280C480 249.1 454.9 224 424 224L392 224C361.1 224 336 249.1 336 280L336 360C336 390.9 361.1 416 392 416L424 416C454.9 416 480 390.9 480 360C480 346.7 469.3 336 456 336C442.7 336 432 346.7 432 360C432 364.4 428.4 368 424 368L392 368C387.6 368 384 364.4 384 360L384 280z"/></svg>',"closed-captioning-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M39 39.1C48.4 29.7 63.6 29.7 72.9 39.1L161.8 128L512 128C547.3 128 576 156.7 576 192L576 448C576 473.5 561.1 495.4 539.6 505.8L601 567.1C610.4 576.5 610.4 591.7 601 601C591.6 610.3 576.4 610.4 567.1 601L39 73.1C29.7 63.7 29.7 48.5 39 39.1zM384 350.1L384 279.9C384 275.5 387.6 271.9 392 271.9L424 271.9C428.4 271.9 432 275.5 432 279.9C432 293.2 442.7 303.9 456 303.9C469.3 303.9 480 293.2 480 279.9C480 249 454.9 223.9 424 223.9L392 223.9C361.1 223.9 336 249 336 279.9L336 302.1L384 350.1zM445.5 411.6C465.7 403.2 480 383.2 480 359.9C480 346.6 469.3 335.9 456 335.9C442.7 335.9 432 346.6 432 359.9C432 364.3 428.4 367.9 424 367.9L401.8 367.9L445.5 411.6zM162.3 264.1C160.8 269.1 160 274.5 160 280L160 360C160 390.9 185.1 416 216 416L248 416C266.1 416 282.1 407.5 292.4 394.2L410.2 512L128 512C92.7 512 64 483.3 64 448L64 192C64 184.2 65.4 176.7 68 169.8L162.3 264.1zM256.1 357.9C256 358.6 256 359.3 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 309.8L256.1 357.9z"/></svg>',compress:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M160 64c0-17.7-14.3-32-32-32S96 46.3 96 64l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 320c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0z"/></svg>',ellipsis:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M96 320C96 289.1 121.1 264 152 264C182.9 264 208 289.1 208 320C208 350.9 182.9 376 152 376C121.1 376 96 350.9 96 320zM264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320zM488 264C518.9 264 544 289.1 544 320C544 350.9 518.9 376 488 376C457.1 376 432 350.9 432 320C432 289.1 457.1 264 488 264z"/></svg>',"ellipsis-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z"/></svg>',expand:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 96C110.3 96 96 110.3 96 128L96 224C96 241.7 110.3 256 128 256C145.7 256 160 241.7 160 224L160 160L224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L128 96zM160 416C160 398.3 145.7 384 128 384C110.3 384 96 398.3 96 416L96 512C96 529.7 110.3 544 128 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480L160 416zM416 96C398.3 96 384 110.3 384 128C384 145.7 398.3 160 416 160L480 160L480 224C480 241.7 494.3 256 512 256C529.7 256 544 241.7 544 224L544 128C544 110.3 529.7 96 512 96L416 96zM544 416C544 398.3 529.7 384 512 384C494.3 384 480 398.3 480 416L480 480L416 480C398.3 480 384 494.3 384 512C384 529.7 398.3 544 416 544L512 544C529.7 544 544 529.7 544 512L544 416z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',forward:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M403.7 107.1C392.1 96 375 92.9 360.3 99.2C345.6 105.5 336 120 336 136L336 272.3L163.7 107.2C152.1 96 135 92.9 120.3 99.2C105.6 105.5 96 120 96 136L96 504C96 520 105.6 534.5 120.3 540.8C135 547.1 152.1 544 163.7 532.9L336 367.7L336 504C336 520 345.6 534.5 360.3 540.8C375 547.1 392.1 544 403.7 532.9L595.7 348.9C603.6 341.4 608 330.9 608 320C608 309.1 603.5 298.7 595.7 291.1L403.7 107.1z"/></svg>',file:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/></svg>',"file-audio":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/></svg>',"file-code":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z"/></svg>',"file-excel":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/></svg>',"file-image":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/></svg>',"file-pdf":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>',"file-powerpoint":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/></svg>',"file-video":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>',"file-word":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"/></svg>',"file-zipper":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z"/></svg>',"forward-step":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M21 36.8c12.9-7 28.7-6.3 41 1.8L320 208.1 320 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 384c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-144.1-258 169.6c-12.3 8.1-28 8.8-41 1.8S0 454.7 0 440L0 72C0 57.3 8.1 43.8 21 36.8z"/></svg>',gauge:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm320 96c0-26.9-16.5-49.9-40-59.3L280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 172.7c-23.5 9.5-40 32.5-40 59.3 0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>',gear:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',"picture-in-picture":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M448 32c35.3 0 64 28.7 64 64l0 112-64 0 0-112-384 0 0 320 144 0 0 64-144 0-6.5-.3c-30.1-3.1-54.1-27-57.1-57.1L0 416 0 96C0 62.9 25.2 35.6 57.5 32.3L64 32 448 32zm16 224c26.5 0 48 21.5 48 48l0 128c0 26.5-21.5 48-48 48l-160 0c-26.5 0-48-21.5-48-48l0-128c0-26.5 21.5-48 48-48l160 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',"play-circle":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg>',plus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',upload:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',volume:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM441.1 107c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C443.3 170.7 464 210.9 464 256s-20.7 85.3-53.2 111.8c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5c43.2-35.2 70.9-88.9 70.9-149s-27.7-113.8-70.9-149zm-60.5 74.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/></svg>',"volume-low":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM380.6 181.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/></svg>',"volume-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM367 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{calendar:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z"/></svg>',"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',clock:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320zM64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},sg={name:"system",resolver:(e,t="classic",o="solid")=>{let r=Un[o][e]??Un.regular[e]??Un.regular["circle-question"];return r?ag(r):""},mutator:e=>{e.hasAttribute("fill")||e.setAttribute("fill","currentColor")}},Ac=sg;var lg="classic",fr=[Rc,Ac],jn=new Set;function zc(e){jn.add(e)}function Fc(e){jn.delete(e)}function gr(e){return fr.find(t=>t.name===e)}function br(e,t){Dc(e),fr.push({name:e,resolver:t.resolver,mutator:t.mutator,spriteSheet:t.spriteSheet}),jn.forEach(o=>{o.library===e&&o.setIcon()})}function Dc(e){fr=fr.filter(t=>t.name!==e)}function Gn(){return lg}var xi=Symbol(),wr=Symbol(),Kn,Yn=new Map,Ie=class extends V{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.rotate=0,this.resolveIcon=async(e,t)=>{let o;if(t?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=b`<svg part="svg">
        <use part="use" href="${e}"></use>
      </svg>`,await this.updateComplete;let i=this.shadowRoot.querySelector("[part='svg']");return typeof t.mutator=="function"&&t.mutator(i,this),this.svg}try{if(o=await fetch(e,{mode:"cors"}),!o.ok)return o.status===410?xi:wr}catch{return wr}try{let i=document.createElement("div");i.innerHTML=await o.text();let r=i.firstElementChild;if(r?.tagName?.toLowerCase()!=="svg")return xi;Kn||(Kn=new DOMParser);let a=Kn.parseFromString(r.outerHTML,"text/html").body.querySelector("svg");return a?(a.part.add("svg"),document.adoptNode(a)):xi}catch{return xi}}}connectedCallback(){super.connectedCallback(),zc(this)}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),Fc(this)}async getIconSource(){let e=gr(this.library),t=this.family||Gn();if(this.name&&e){let o=this.canvas==="auto"||this.autoWidth,i;try{i=await e.resolver(this.name,t,this.variant,o)}catch{i=void 0}return{url:i,fromLibrary:!0}}return{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){let{url:e,fromLibrary:t}=await this.getIconSource(),o=t?gr(this.library):void 0;if(!e){this.svg=null;return}let i=Yn.get(e);i||(i=this.resolveIcon(e,o),Yn.set(e,i));let r=await i;r===wr&&Yn.delete(e);let n=await this.getIconSource();if(e===n.url){if(sc(r)){this.svg=r;return}switch(r){case wr:case xi:this.svg=null,this.dispatchEvent(new xc);break;default:this.svg=r.cloneNode(!0),o?.mutator?.(this.svg,this),this.dispatchEvent(new Cc)}}}willUpdate(e){return this.style||this.setStyleProperty("--rotate-angle",`${this.rotate}deg`),super.willUpdate(e)}updated(e){super.updated(e);let t=gr(this.library);this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`);let o=this.shadowRoot?.querySelector("svg");o&&t?.mutator?.(o,this)}render(){return this.hasUpdated?this.svg:b`<svg part="svg" width="16" height="16" viewBox="0 0 16 16"></svg>`}};Ie.css=Sc;l([I()],Ie.prototype,"svg",2);l([u({reflect:!0})],Ie.prototype,"name",2);l([u({reflect:!0})],Ie.prototype,"family",2);l([u({reflect:!0})],Ie.prototype,"variant",2);l([u({reflect:!0})],Ie.prototype,"canvas",2);l([u({attribute:"auto-width",type:Boolean,reflect:!0})],Ie.prototype,"autoWidth",2);l([u({attribute:"swap-opacity",type:Boolean,reflect:!0})],Ie.prototype,"swapOpacity",2);l([u()],Ie.prototype,"src",2);l([u()],Ie.prototype,"label",2);l([u({reflect:!0})],Ie.prototype,"library",2);l([u({type:Number,reflect:!0})],Ie.prototype,"rotate",2);l([u({type:String,reflect:!0})],Ie.prototype,"flip",2);l([u({type:String,reflect:!0})],Ie.prototype,"animation",2);l([S("label")],Ie.prototype,"handleLabelChange",1);l([S(["family","name","library","variant","src","autoWidth","canvas","swapOpacity"],{waitUntilFirstUpdate:!0})],Ie.prototype,"setIcon",1);Ie=l([F("wa-icon")],Ie);var Ic=E`
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

    ::slotted(:first-child) {
      --_button-horizontal-indent: 0;
      --_button-horizontal-indent-outlined: 0;
    }
  }

  :host([orientation='vertical']) {
    --_button-vertical-indent: var(--wa-form-control-border-width);
    --_button-vertical-indent-outlined: calc(var(--wa-form-control-border-width) * -1);

    ::slotted(:first-child) {
      --_button-vertical-indent: 0;
      --_button-vertical-indent-outlined: 0;
    }
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
    ::slotted(:first-child:not(:last-child)) {
      --_button-start-end-radius: 0;
      --_button-end-end-radius: 0;
    }

    ::slotted(:last-child:not(:first-child)) {
      --_button-start-start-radius: 0;
      --_button-end-start-radius: 0;
    }
  }

  :host([orientation='vertical']) {
    ::slotted(:first-child:not(:last-child)) {
      --_button-end-start-radius: 0;
      --_button-end-end-radius: 0;
    }

    ::slotted(:last-child:not(:first-child)) {
      --_button-start-start-radius: 0;
      --_button-start-end-radius: 0;
    }
  }
`;var Vt=class extends V{constructor(){super(...arguments),this.disableRole=!1,this.hasOutlined=!1,this.label="",this.orientation="horizontal"}updated(e){super.updated(e),e.has("orientation")&&this.setAttribute("aria-orientation",this.orientation)}handleFocus(e){vr(e.target)?.classList.add("button-focus")}handleBlur(e){vr(e.target)?.classList.remove("button-focus")}handleMouseOver(e){vr(e.target)?.classList.add("button-hover")}handleMouseOut(e){vr(e.target)?.classList.remove("button-hover")}render(){return b`
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
    `}};Vt.css=[Ic];l([_("slot")],Vt.prototype,"defaultSlot",2);l([I()],Vt.prototype,"disableRole",2);l([I()],Vt.prototype,"hasOutlined",2);l([u()],Vt.prototype,"label",2);l([u({reflect:!0})],Vt.prototype,"orientation",2);Vt=l([F("wa-button-group")],Vt);function vr(e){let t="wa-button, wa-radio-button";return e.closest(t)??e.querySelector(t)}var $c=E`
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
`;function jo(e,t){let o=e.metaKey||e.ctrlKey||e.shiftKey||e.altKey;e.key==="Enter"&&!o&&setTimeout(()=>{!e.defaultPrevented&&!e.isComposing&&cg(t)})}function cg(e){let t=null;if("form"in e&&(t=e.form),!t&&"getForm"in e&&(t=e.getForm()),!t)return;let o=[...t.elements];if(o.length===1){t.requestSubmit(null);return}let i=o.find(r=>r.type==="submit"&&!r.matches(":disabled"));i&&(["input","button"].includes(i.localName)?t.requestSubmit(i):i.click())}var ye=E`
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

    &:not(.has-slotted, .has-hint, .has-count) {
      display: none;
    }
  }
`;var de=class extends G{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new ce(this,"hint","label"),this.localize=new N(this),this.title="",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="m",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.placeholder="",this.readonly=!1,this.required=!1,this.step=1,this.withoutSteppers=!1,this.inputmode="numeric",this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,Ct()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(e){this._value!==e&&(this.valueHasChanged=!0,this._value=e)}handleSizeChange(){te(this.localName,this.size)}updateFormValue(e){if(e==null){this.setValue("",null);return}super.updateFormValue(e)}get isAtMin(){if(this.min===void 0)return!1;let e=parseFloat(this.value||"");return!isNaN(e)&&e<=this.min}get isAtMax(){if(this.max===void 0)return!1;let e=parseFloat(this.value||"");return!isNaN(e)&&e>=this.max}handleChange(e){this.value=this.input.value,this.relayNativeEvent(e,{bubbles:!0,composed:!0})}handleInput(){this.value=this.input.value}handleKeyDown(e){jo(e,this),(e.key==="ArrowUp"||e.key==="ArrowDown")&&requestAnimationFrame(()=>{this.value!==this.input.value&&(this.value=this.input.value)})}handleStepperPointerUp(e,t){if(this.disabled||this.readonly)return;let o=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0});this.dispatchEvent(o),!o.defaultPrevented&&(e==="up"?this.input.stepUp():this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),t.pointerType!=="touch"&&this.input.focus())}handleStepperPointerDown(e){e.pointerType!=="touch"&&(e.preventDefault(),this.input.focus())}updated(e){super.updated(e),(e.has("value")||e.has("defaultValue"))&&(this.input&&this.value&&this.input.value!==this.value&&(this._value=this.input.value),this.customStates.set("blank",!this.value))}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}render(){let e=this.hasSlotController.test("label","withLabel"),t=this.hasSlotController.test("hint","withHint"),o=this.label?!0:!!e,i=this.hint?!0:!!t;return b`
      <label
        part="form-control-label label"
        class=${T({label:!0,"has-label":o})}
        for="input"
        aria-hidden=${o?"false":"true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base number-input" class="number-field">
        ${this.withoutSteppers?"":b`
              <button
                part="stepper stepper-decrement"
                class="stepper stepper-decrement"
                type="button"
                tabindex="-1"
                aria-label=${this.localize.term("decrement")}
                ?disabled=${this.disabled||this.readonly||this.isAtMin}
                @pointerdown=${this.handleStepperPointerDown}
                @pointerup=${r=>this.handleStepperPointerUp("down",r)}
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
          inputmode=${z(this.inputmode)}
          title=${this.title}
          name=${z(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${z(this.placeholder)}
          min=${z(this.min)}
          max=${z(this.max)}
          step=${z(this.step)}
          .value=${ot(this.value??"")}
          autocomplete=${z(this.autocomplete)}
          ?autofocus=${this.autofocus}
          enterkeyhint=${z(this.enterkeyhint)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        <slot name="end" part="end" class="end"></slot>

        ${this.withoutSteppers?"":b`
              <button
                part="stepper stepper-increment"
                class="stepper stepper-increment"
                type="button"
                tabindex="-1"
                aria-label=${this.localize.term("increment")}
                ?disabled=${this.disabled||this.readonly||this.isAtMax}
                @pointerdown=${this.handleStepperPointerDown}
                @pointerup=${r=>this.handleStepperPointerUp("up",r)}
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
        class=${T({"has-slotted":i})}
        aria-hidden=${i?"false":"true"}
        >${this.hint}</slot
      >
    `}};de.css=[oe,ye,$c];de.shadowRootOptions={...G.shadowRootOptions,delegatesFocus:!0};l([_("input")],de.prototype,"input",2);l([u()],de.prototype,"title",2);l([I()],de.prototype,"value",1);l([u({attribute:"value",reflect:!0})],de.prototype,"defaultValue",2);l([u({reflect:!0})],de.prototype,"size",2);l([S("size")],de.prototype,"handleSizeChange",1);l([u({reflect:!0})],de.prototype,"appearance",2);l([u({type:Boolean,reflect:!0})],de.prototype,"pill",2);l([u()],de.prototype,"label",2);l([u({attribute:"hint"})],de.prototype,"hint",2);l([u()],de.prototype,"placeholder",2);l([u({type:Boolean,reflect:!0})],de.prototype,"readonly",2);l([u({type:Boolean,reflect:!0})],de.prototype,"required",2);l([u({type:Number})],de.prototype,"min",2);l([u({type:Number})],de.prototype,"max",2);l([u()],de.prototype,"step",2);l([u({attribute:"without-steppers",type:Boolean})],de.prototype,"withoutSteppers",2);l([u()],de.prototype,"autocomplete",2);l([u({type:Boolean})],de.prototype,"autofocus",2);l([u()],de.prototype,"enterkeyhint",2);l([u()],de.prototype,"inputmode",2);l([u({attribute:"with-label",type:Boolean})],de.prototype,"withLabel",2);l([u({attribute:"with-hint",type:Boolean})],de.prototype,"withHint",2);l([S("step",{waitUntilFirstUpdate:!0})],de.prototype,"handleStepChange",1);de=l([F("wa-number-input")],de);de.disableWarning?.("change-in-update");var Mc=E`
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
`;var lt=class extends V{constructor(){super(...arguments),this.hasSlotController=new ce(this,"footer","header","media","header-actions","footer-actions","actions"),this.appearance="outlined",this.withHeader=!1,this.withMedia=!1,this.withFooter=!1,this.withHeaderActions=!1,this.withFooterActions=!1,this.orientation="vertical"}willUpdate(e){this.withHeader=this.hasSlotController.test("header","withHeader"),this.withMedia=this.hasSlotController.test("media","withMedia"),this.withFooter=this.hasSlotController.test("footer","withFooter"),super.willUpdate(e)}render(){if(this.orientation==="horizontal")return b`
        <slot name="media" part="media" class="media"></slot>
        <div part="body" class="body"><slot></slot></div>
        <slot name="actions" part="actions" class="actions"></slot>
      `;let e=this.hasSlotController.test("header-actions","withHeaderActions"),t=this.hasSlotController.test("footer-actions","withFooterActions");return b`
      <slot name="media" part="media" class="media"></slot>

      <div
        part="header"
        class=${T({header:!0,"has-actions":e})}
      >
        <slot name="header"></slot>
        <slot name="header-actions"></slot>
      </div>

      <div part="body" class="body"><slot></slot></div>

      <div
        part="footer"
        class=${T({footer:!0,"has-actions":t})}
      >
        <slot name="footer"></slot>
        <slot name="footer-actions"></slot>
      </div>
    `}};lt.css=[oe,Mc];l([u({reflect:!0})],lt.prototype,"appearance",2);l([u({attribute:"with-header",type:Boolean,reflect:!0})],lt.prototype,"withHeader",2);l([u({attribute:"with-media",type:Boolean,reflect:!0})],lt.prototype,"withMedia",2);l([u({attribute:"with-footer",type:Boolean,reflect:!0})],lt.prototype,"withFooter",2);l([u({attribute:"with-header-actions",type:Boolean,reflect:!0})],lt.prototype,"withHeaderActions",2);l([u({attribute:"with-footer-actions",type:Boolean,reflect:!0})],lt.prototype,"withFooterActions",2);l([u({reflect:!0})],lt.prototype,"orientation",2);lt=l([F("wa-card")],lt);lt.disableWarning?.("change-in-update");var Oc=E`
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
`;var eo=class extends V{constructor(){super(...arguments),this.variant="brand",this.size="m"}handleSizeChange(){te(this.localName,this.size)}render(){return b`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>
    `}};eo.css=[Oc,Zt,oe];l([u({reflect:!0})],eo.prototype,"variant",2);l([u({reflect:!0})],eo.prototype,"appearance",2);l([u({reflect:!0})],eo.prototype,"size",2);l([S("size")],eo.prototype,"handleSizeChange",1);eo=l([F("wa-callout")],eo);var Tc=E`
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
`;var St=(e={})=>{let{validationElement:t,validationProperty:o}=e;t||typeof document<"u"&&"createElement"in document&&(t=Object.assign(document.createElement("input"),{required:!0})),o||(o="value");let i={observedAttributes:["required"],message:t?.validationMessage,checkValidity(r){let n={message:"",isValid:!0,invalidKeys:[]};return(r.required??r.hasAttribute("required"))&&!r[o]&&(n.message=typeof i.message=="function"?i.message(r):i.message||"",n.isValid=!1,n.invalidKeys.push("valueMissing")),n}};return i};var Fe=class extends G{constructor(){super(...arguments),this.hasSlotController=new ce(this,"hint"),this.title="",this._value=this.getAttribute("value")??null,this.size="m",this.disabled=!1,this.indeterminate=!1,this._checked=null,this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint=""}static get validators(){let e=[St({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...e]}get value(){return this._value??"on"}set value(e){this._value=e}handleSizeChange(){te(this.localName,this.size)}get checked(){return this.valueHasChanged?!!this._checked:this._checked??this.defaultChecked}set checked(e){this._checked=!!e,this.valueHasChanged=!0}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}connectedCallback(){if(super.connectedCallback(),this.didSSR&&!this.hasUpdated){this.updateComplete.then(()=>{this.handleDefaultCheckedChange()});return}this.handleDefaultCheckedChange()}handleDefaultCheckedChange(){this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){if(this.didSSR&&!this.hasUpdated){this.updateComplete.then(()=>{this.handleValueOrCheckedChange()});return}this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(e){super.willUpdate(e),(e.has("value")||e.has("checked")||e.has("defaultChecked")||e.has("disabled"))&&this.handleValueOrCheckedChange()}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}render(){let e=this.hasSlotController.test("hint"),t=this.hint?!0:!!e,o=!this.checked&&this.indeterminate,i=o?"indeterminate":"check",r=o?"indeterminate":"checked",n=this.didSSR&&!this.hasUpdated?this.checked:this.defaultChecked,a=this.didSSR&&!this.hasUpdated?null:ot(this.checked);return b`
      <label part="base checkbox">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${z(this.name)}
            value=${z(this.value)}
            .indeterminate=${ot(this.indeterminate)}
            .checked=${z(a)}
            ?checked=${n}
            ?disabled=${this.disabled}
            ?required=${this.required}
            aria-checked=${this.indeterminate?"mixed":this.checked?"true":"false"}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${r}-icon icon" library="system" name=${i}></wa-icon>
        </span>

        <slot part="label"></slot>
      </label>

      <slot
        id="hint"
        part="hint"
        name="hint"
        aria-hidden=${t?"false":"true"}
        class="${T({"has-slotted":t})}"
      >
        ${this.hint}
      </slot>
    `}};Fe.css=[ye,oe,Tc];Fe.shadowRootOptions={...G.shadowRootOptions,delegatesFocus:!0};l([_('input[type="checkbox"]')],Fe.prototype,"input",2);l([u()],Fe.prototype,"title",2);l([u({reflect:!0})],Fe.prototype,"value",1);l([u({reflect:!0})],Fe.prototype,"size",2);l([S("size")],Fe.prototype,"handleSizeChange",1);l([u({type:Boolean})],Fe.prototype,"disabled",2);l([u({type:Boolean,reflect:!0})],Fe.prototype,"indeterminate",2);l([u({type:Boolean,attribute:!1})],Fe.prototype,"checked",1);l([u({type:Boolean,reflect:!0,attribute:"checked"})],Fe.prototype,"defaultChecked",2);l([u({type:Boolean,reflect:!0})],Fe.prototype,"required",2);l([u()],Fe.prototype,"hint",2);l([S(["checked","defaultChecked"])],Fe.prototype,"handleDefaultCheckedChange",1);l([S(["checked","indeterminate"])],Fe.prototype,"handleStateChange",1);l([S("disabled")],Fe.prototype,"handleDisabledChange",1);Fe=l([F("wa-checkbox")],Fe);Fe.disableWarning?.("change-in-update");var Lc=E`
  :host {
    --spacing: var(--wa-space-m);
    --show-duration: var(--wa-transition-normal);
    --hide-duration: var(--wa-transition-normal);

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
`;function Ee(e,t){return new Promise(o=>{function i(r){r.target===e&&(e.removeEventListener(t,i),o())}e.addEventListener(t,i)})}var je=class extends V{constructor(){super(...arguments),this.localize=new N(this),this.animationGeneration=0,this.isAnimating=!1,this.open=!1,this.disabled=!1,this.appearance="outlined",this.iconPlacement="end"}disconnectedCallback(){super.disconnectedCallback(),this.detailsObserver?.disconnect()}firstUpdated(e){super.firstUpdated(e),this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(t=>{for(let o of t)o.type==="attributes"&&o.attributeName==="open"&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}updated(e){e.has("isAnimating")&&this.customStates.set("animating",this.isAnimating)}handleSummaryClick(e){e.composedPath().some(i=>{if(!(i instanceof HTMLElement))return!1;let r=i.tagName?.toLowerCase();return["a","button","input","textarea","select"].includes(r)?!0:i instanceof G?!("disabled"in i)||!i.disabled:!1})||(e.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus()))}handleSummaryKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.open?this.hide():this.show()),(e.key==="ArrowUp"||e.key==="ArrowLeft")&&(e.preventDefault(),this.hide()),(e.key==="ArrowDown"||e.key==="ArrowRight")&&(e.preventDefault(),this.show())}closeOthersWithSameName(){if(!this.name)return;this.getRootNode().querySelectorAll(`wa-details[name="${this.name}"]`).forEach(o=>{o!==this&&o.open&&(o.open=!1)})}async handleOpenChange(){this.animationGeneration++;let e=this.animationGeneration;if(this.open){this.details.open=!0;let t=new Te;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1,this.details.open=!1;return}this.closeOthersWithSameName(),this.isAnimating=!0;let o=qo(getComputedStyle(this.body).getPropertyValue("--show-duration"));if(await No(this.body,[{height:"0",opacity:"0"},{height:`${this.body.scrollHeight}px`,opacity:"1"}],{duration:o,easing:"linear"}),this.animationGeneration!==e)return;this.body.style.height="auto",this.isAnimating=!1,this.dispatchEvent(new Ve)}else{let t=new Le;if(this.dispatchEvent(t),t.defaultPrevented){this.details.open=!0,this.open=!0;return}this.isAnimating=!0;let o=qo(getComputedStyle(this.body).getPropertyValue("--hide-duration"));if(await No(this.body,[{height:`${this.body.scrollHeight}px`,opacity:"1"},{height:"0",opacity:"0"}],{duration:o,easing:"linear"}),this.animationGeneration!==e)return;this.body.style.height="0",this.isAnimating=!1,this.details.open=!1,this.dispatchEvent(new Pe)}}async show(){if(!(this.open||this.disabled))return this.open=!0,Ee(this,"wa-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=!1,Ee(this,"wa-after-hide")}render(){let e=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return b`
      <details part="base details">
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
              <wa-icon library="system" variant="solid" name=${e?"chevron-left":"chevron-right"}></wa-icon>
            </slot>
            <slot name="collapse-icon">
              <wa-icon library="system" variant="solid" name=${e?"chevron-left":"chevron-right"}></wa-icon>
            </slot>
          </span>
        </summary>

        <div
          class=${T({body:!0,animating:this.isAnimating})}
          role="region"
          aria-labelledby="header"
        >
          <slot part="content" id="content" class="content"></slot>
        </div>
      </details>
    `}};je.css=Lc;l([_("details")],je.prototype,"details",2);l([_("summary")],je.prototype,"header",2);l([_(".body")],je.prototype,"body",2);l([_(".expand-icon-slot")],je.prototype,"expandIconSlot",2);l([I()],je.prototype,"isAnimating",2);l([u({type:Boolean,reflect:!0})],je.prototype,"open",2);l([u()],je.prototype,"summary",2);l([u({reflect:!0})],je.prototype,"name",2);l([u({type:Boolean,reflect:!0})],je.prototype,"disabled",2);l([u({reflect:!0})],je.prototype,"appearance",2);l([u({attribute:"icon-placement",reflect:!0})],je.prototype,"iconPlacement",2);l([S("open",{waitUntilFirstUpdate:!0})],je.prototype,"handleOpenChange",1);je=l([F("wa-details")],je);var Pc=E`
  :host {
    --width: 31rem;
    --spacing: var(--wa-space-l);
    --backdrop-filter: none;
    --show-duration: var(--wa-transition-normal);
    --hide-duration: var(--wa-transition-normal);

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
    backdrop-filter: var(--backdrop-filter);
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
`;var pt=class extends V{constructor(){super(...arguments),this.localize=new N(this),this.hasSlotController=new ce(this,"footer","header-actions","label"),this.renderedWatcher=new dr(this,e=>this.handleRenderedChange(e)),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.withFooter=!1,this.handleDocumentKeyDown=e=>{e.key==="Escape"&&this.open&&Be(this)&&(e.preventDefault(),e.stopPropagation(),this.requestClose(this.dialog))}}firstUpdated(e){super.firstUpdated(e),this.open&&(this.addOpenListeners(),this.dialog.showModal(),Qt(this),this.renderedWatcher.start(this.dialog))}disconnectedCallback(){super.disconnectedCallback(),this.renderedWatcher.stop(),Jt(this),this.removeOpenListeners()}async requestClose(e){let t=new Le({source:e});if(this.dispatchEvent(t),t.defaultPrevented){this.open=!0,se(this.dialog,"pulse");return}this.removeOpenListeners(),await se(this.dialog,"hide"),this.open=!1,this.dialog.close(),Jt(this),this.renderedWatcher.stop();let o=this.originalTrigger;typeof o?.focus=="function"&&setTimeout(()=>o.focus()),this.dispatchEvent(new Pe)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown),Ue(this)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown),ze(this)}handleDialogCancel(e){e.preventDefault(),!this.dialog.classList.contains("hide")&&e.target===this.dialog&&Be(this)&&this.requestClose(this.dialog)}handleDialogClick(e){let o=e.target.closest('[data-dialog="close"]');o&&(e.stopPropagation(),this.requestClose(o))}async handleDialogPointerDown(e){e.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await se(this.dialog,"pulse"))}handleRenderedChange(e){if(!this.open){this.renderedWatcher.stop();return}!e&&this.dialog.open?(this.removeOpenListeners(),this.dialog.close(),Jt(this)):e&&!this.dialog.open&&(this.addOpenListeners(),this.dialog.showModal(),Qt(this))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open?(this.open=!0,this.requestClose(this.dialog)):this.open||this.renderedWatcher.stop()}async show(){let e=new Te;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),Qt(this),this.renderedWatcher.start(this.dialog),requestAnimationFrame(()=>{let t=this.querySelector("[autofocus]");t&&typeof t.focus=="function"?t.focus():this.dialog.focus()}),await se(this.dialog,"show"),this.dispatchEvent(new Ve)}render(){let e=!this.withoutHeader,t=this.hasSlotController.test("footer","withFooter");return b`
      <dialog
        part="dialog"
        class=${T({dialog:!0,open:this.open})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${e?b`
              <div part="header" class="header">
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
              </div>
            `:""}

        <div part="body" class="body"><slot></slot></div>

        <!-- Use a hidden element so we still get "slotchange" events. -->
        <div part="footer" class="footer" ?hidden=${!t}>
          <slot name="footer"></slot>
        </div>
      </dialog>
    `}};pt.css=Pc;l([_(".dialog")],pt.prototype,"dialog",2);l([u({type:Boolean,reflect:!0})],pt.prototype,"open",2);l([u({reflect:!0})],pt.prototype,"label",2);l([u({attribute:"without-header",type:Boolean,reflect:!0})],pt.prototype,"withoutHeader",2);l([u({attribute:"light-dismiss",type:Boolean})],pt.prototype,"lightDismiss",2);l([u({attribute:"with-footer",type:Boolean})],pt.prototype,"withFooter",2);l([S("open",{waitUntilFirstUpdate:!0})],pt.prototype,"handleOpenChange",1);pt=l([F("wa-dialog")],pt);document.addEventListener("click",e=>{let t=e.target.closest("[data-dialog]");if(t instanceof Element){let[o,i]=ur(t.getAttribute("data-dialog")||"");if(o==="open"&&i?.length){let n=t.getRootNode().getElementById(i);n?.localName==="wa-dialog"?n.open=!0:console.warn(`A dialog with an ID of "${i}" could not be found in this document.`)}}}),document.addEventListener("pointerdown",()=>{});var Vc=E`
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
`;var Go=class extends V{constructor(){super(...arguments),this.orientation="horizontal"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.orientation)}};Go.css=Vc;l([u({reflect:!0})],Go.prototype,"orientation",2);l([S("orientation")],Go.prototype,"handleVerticalChange",1);Go=l([F("wa-divider")],Go);var Bc=class extends Event{constructor(e){super("wa-select",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=e}};function*Ko(e=document.activeElement){e!=null&&(yield e,"shadowRoot"in e&&e.shadowRoot&&e.shadowRoot.mode!=="closed"&&(yield*Ko(e.shadowRoot.activeElement)))}function Hc(){return[...Ko()].pop()}var Nc=E`
  :host {
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);
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
`;var qc="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";var Wc=(e=21)=>{let t="",o=crypto.getRandomValues(new Uint8Array(e|=0));for(;e--;)t+=qc[o[e]&63];return t};function Ne(e,t,o){let i=r=>Object.is(r,-0)?0:r;return e<t?i(t):e>o?i(o):i(e)}function to(e=""){return`${e}${Wc()}`}var _t=Math.min,mt=Math.max,Si=Math.round,_i=Math.floor,kt=e=>({x:e,y:e}),dg={left:"right",right:"left",bottom:"top",top:"bottom"};function Xn(e,t,o){return mt(e,_t(t,o))}function xo(e,t){return typeof e=="function"?e(t):e}function oo(e){return e.split("-")[0]}function Co(e){return e.split("-")[1]}function Qn(e){return e==="x"?"y":"x"}function xr(e){return e==="y"?"height":"width"}function Et(e){let t=e[0];return t==="t"||t==="b"?"y":"x"}function Cr(e){return Qn(Et(e))}function Gc(e,t,o){o===void 0&&(o=!1);let i=Co(e),r=Cr(e),n=xr(r),a=r==="x"?i===(o?"end":"start")?"right":"left":i==="start"?"bottom":"top";return t.reference[n]>t.floating[n]&&(a=Ci(a)),[a,Ci(a)]}function Kc(e){let t=Ci(e);return[yr(e),t,yr(t)]}function yr(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}var Uc=["left","right"],jc=["right","left"],ug=["top","bottom"],hg=["bottom","top"];function pg(e,t,o){switch(e){case"top":case"bottom":return o?t?jc:Uc:t?Uc:jc;case"left":case"right":return t?ug:hg;default:return[]}}function Yc(e,t,o,i){let r=Co(e),n=pg(oo(e),o==="start",i);return r&&(n=n.map(a=>a+"-"+r),t&&(n=n.concat(n.map(yr)))),n}function Ci(e){let t=oo(e);return dg[t]+e.slice(t.length)}function mg(e){var t,o,i,r;return{top:(t=e.top)!=null?t:0,right:(o=e.right)!=null?o:0,bottom:(i=e.bottom)!=null?i:0,left:(r=e.left)!=null?r:0}}function Jn(e){return typeof e!="number"?mg(e):{top:e,right:e,bottom:e,left:e}}function So(e){let{x:t,y:o,width:i,height:r}=e;return{width:i,height:r,top:o,left:t,right:t+i,bottom:o+r,x:t,y:o}}function Xc(e,t,o){let{reference:i,floating:r}=e,n=Et(t),a=Cr(t),s=xr(a),c=oo(t),d=n==="y",h=i.x+i.width/2-r.width/2,m=i.y+i.height/2-r.height/2,p=i[s]/2-r[s]/2,f;switch(c){case"top":f={x:h,y:i.y-r.height};break;case"bottom":f={x:h,y:i.y+i.height};break;case"right":f={x:i.x+i.width,y:m};break;case"left":f={x:i.x-r.width,y:m};break;default:f={x:i.x,y:i.y}}let g=Co(t);return g&&(f[a]+=p*(g==="end"?1:-1)*(o&&d?-1:1)),f}async function Qc(e,t){var o;t===void 0&&(t={});let{x:i,y:r,platform:n,rects:a,elements:s,strategy:c}=e,{boundary:d="clippingAncestors",rootBoundary:h="viewport",elementContext:m="floating",altBoundary:p=!1,padding:f=0}=xo(t,e),g=Jn(f),x=s[p?m==="floating"?"reference":"floating":m],y=So(await n.getClippingRect({element:(o=await(n.isElement==null?void 0:n.isElement(x)))==null||o?x:x.contextElement||await(n.getDocumentElement==null?void 0:n.getDocumentElement(s.floating)),boundary:d,rootBoundary:h,strategy:c})),C=m==="floating"?{x:i,y:r,width:a.floating.width,height:a.floating.height}:a.reference,L=await(n.getOffsetParent==null?void 0:n.getOffsetParent(s.floating)),M=await(n.isElement==null?void 0:n.isElement(L))&&await(n.getScale==null?void 0:n.getScale(L))||{x:1,y:1},$=So(n.convertOffsetParentRelativeRectToViewportRelativeRect?await n.convertOffsetParentRelativeRectToViewportRelativeRect({elements:s,rect:C,offsetParent:L,strategy:c}):C);return{top:(y.top-$.top+g.top)/M.y,bottom:($.bottom-y.bottom+g.bottom)/M.y,left:(y.left-$.left+g.left)/M.x,right:($.right-y.right+g.right)/M.x}}var fg=50,Jc=async(e,t,o)=>{let{placement:i="bottom",strategy:r="absolute",middleware:n=[],platform:a}=o,s=a.detectOverflow?a:{...a,detectOverflow:Qc},c=await(a.isRTL==null?void 0:a.isRTL(t)),d=await a.getElementRects({reference:e,floating:t,strategy:r}),{x:h,y:m}=Xc(d,i,c),p=i,f=0,g={};for(let w=0;w<n.length;w++){let x=n[w];if(!x)continue;let{name:y,fn:C}=x,{x:L,y:M,data:$,reset:A}=await C({x:h,y:m,initialPlacement:i,placement:p,strategy:r,middlewareData:g,rects:d,platform:s,elements:{reference:e,floating:t}});h=L??h,m=M??m,g[y]={...g[y],...$},A&&f<fg&&(f++,typeof A=="object"&&(A.placement&&(p=A.placement),A.rects&&(d=A.rects===!0?await a.getElementRects({reference:e,floating:t,strategy:r}):A.rects),{x:h,y:m}=Xc(d,p,c)),w=-1)}return{x:h,y:m,placement:p,strategy:r,middlewareData:g}},Zc=e=>({name:"arrow",options:e,async fn(t){let{x:o,y:i,placement:r,rects:n,platform:a,elements:s,middlewareData:c}=t,{element:d,padding:h=0}=xo(e,t)||{};if(d==null)return{};let m=Jn(h),p={x:o,y:i},f=Cr(r),g=xr(f),w=await a.getDimensions(d),x=f==="y",y=x?"top":"left",C=x?"bottom":"right",L=x?"clientHeight":"clientWidth",M=n.reference[g]+n.reference[f]-p[f]-n.floating[g],$=p[f]-n.reference[f],A=await(a.getOffsetParent==null?void 0:a.getOffsetParent(d)),v=A?A[L]:0;(!v||!await(a.isElement==null?void 0:a.isElement(A)))&&(v=s.floating[L]||n.floating[g]);let O=M/2-$/2,Y=v/2-w[g]/2-1,U=_t(m[y],Y),he=_t(m[C],Y),Q=v-w[g]-he,pe=v/2-w[g]/2+O,_e=Xn(U,pe,Q),ke=!c.arrow&&Co(r)!=null&&pe!==_e&&n.reference[g]/2-(pe<U?U:he)-w[g]/2<0,le=ke?pe<U?pe-U:pe-Q:0;return{[f]:p[f]+le,data:{[f]:_e,centerOffset:pe-_e-le,...ke&&{alignmentOffset:le}},reset:ke}}});var ed=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var o,i;let{placement:r,middlewareData:n,rects:a,initialPlacement:s,platform:c,elements:d}=t,{mainAxis:h=!0,crossAxis:m=!0,fallbackPlacements:p,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:g="none",flipAlignment:w=!0,...x}=xo(e,t);if((o=n.arrow)!=null&&o.alignmentOffset)return{};let y=oo(r),C=Et(s),L=oo(s)===s,M=await(c.isRTL==null?void 0:c.isRTL(d.floating)),$=p||(L||!w?[Ci(s)]:Kc(s)),A=g!=="none";!p&&A&&$.push(...Yc(s,w,g,M));let v=[s,...$],O=await c.detectOverflow(t,x),Y=[],U=((i=n.flip)==null?void 0:i.overflows)||[];if(h&&Y.push(O[y]),m){let _e=Gc(r,a,M);Y.push(O[_e[0]],O[_e[1]])}if(U=[...U,{placement:r,overflows:Y}],!Y.every(_e=>_e<=0)){var he,Q;let _e=(((he=n.flip)==null?void 0:he.index)||0)+1,ke=v[_e];if(ke&&(!(m==="alignment"?C!==Et(ke):!1)||U.every(ve=>Et(ve.placement)===C?ve.overflows[0]>0:!0)))return{data:{index:_e,overflows:U},reset:{placement:ke}};let le=(Q=U.filter(We=>We.overflows[0]<=0).sort((We,ve)=>We.overflows[1]-ve.overflows[1])[0])==null?void 0:Q.placement;if(!le)switch(f){case"bestFit":{var pe;let We=(pe=U.filter(ve=>{if(A){let Ze=Et(ve.placement);return Ze===C||Ze==="y"}return!0}).map(ve=>[ve.placement,ve.overflows.filter(Ze=>Ze>0).reduce((Ze,Xi)=>Ze+Xi,0)]).sort((ve,Ze)=>ve[1]-Ze[1])[0])==null?void 0:pe[0];We&&(le=We);break}case"initialPlacement":le=s;break}if(r!==le)return{reset:{placement:le}}}return{}}}};var gg=new Set(["left","top"]);async function bg(e,t){let{placement:o,platform:i,elements:r}=e,n=await(i.isRTL==null?void 0:i.isRTL(r.floating)),a=oo(o),s=Co(o),c=Et(o)==="y",d=gg.has(a)?-1:1,h=n&&c?-1:1,m=xo(t,e),{mainAxis:p,crossAxis:f,alignmentAxis:g}=typeof m=="number"?{mainAxis:m,crossAxis:0,alignmentAxis:null}:{mainAxis:m.mainAxis||0,crossAxis:m.crossAxis||0,alignmentAxis:m.alignmentAxis};return s&&typeof g=="number"&&(f=s==="end"?g*-1:g),c?{x:f*h,y:p*d}:{x:p*d,y:f*h}}var td=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var o,i;let{x:r,y:n,placement:a,middlewareData:s}=t,c=await bg(t,e);return a===((o=s.offset)==null?void 0:o.placement)&&(i=s.arrow)!=null&&i.alignmentOffset?{}:{x:r+c.x,y:n+c.y,data:{...c,placement:a}}}}},od=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){let{x:o,y:i,placement:r,platform:n}=t,{mainAxis:a=!0,crossAxis:s=!1,limiter:c={fn:C=>{let{x:L,y:M}=C;return{x:L,y:M}}},...d}=xo(e,t),h={x:o,y:i},m=await n.detectOverflow(t,d),p=Et(r),f=Qn(p),g=h[f],w=h[p],x=(C,L)=>Xn(L+m[C==="y"?"top":"left"],L,L-m[C==="y"?"bottom":"right"]);a&&(g=x(f,g)),s&&(w=x(p,w));let y=c.fn({...t,[f]:g,[p]:w});return{...y,data:{x:y.x-o,y:y.y-i,enabled:{[f]:a,[p]:s}}}}}};var id=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){let{placement:o,rects:i,platform:r,elements:n}=t,{apply:a=()=>{},...s}=xo(e,t),c=await r.detectOverflow(t,s),d=oo(o),h=Co(o),m=Et(o)==="y",{width:p,height:f}=i.floating,g,w;d==="top"||d==="bottom"?(g=d,w=h===(await(r.isRTL==null?void 0:r.isRTL(n.floating))?"start":"end")?"left":"right"):(w=d,g=h==="end"?"top":"bottom");let x=f-c.top-c.bottom,y=p-c.left-c.right,C=_t(f-c[g],x),L=_t(p-c[w],y),M=t.middlewareData.shift,$=!M,A=C,v=L;M!=null&&M.enabled.x&&(v=y),M!=null&&M.enabled.y&&(A=x),$&&!h&&(m?v=p-2*mt(c.left,c.right):A=f-2*mt(c.top,c.bottom)),await a({...t,availableWidth:v,availableHeight:A});let O=await r.getDimensions(n.floating);return p!==O.width||f!==O.height?{reset:{rects:!0}}:{}}}};function Sr(){return typeof window<"u"}function ko(e){return nd(e)?(e.nodeName||"").toLowerCase():"#document"}function Xe(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function Rt(e){var t;return(t=(nd(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function nd(e){return Sr()?e instanceof Node||e instanceof Xe(e).Node:!1}function ft(e){return Sr()?e instanceof Element||e instanceof Xe(e).Element:!1}function Ht(e){return Sr()?e instanceof HTMLElement||e instanceof Xe(e).HTMLElement:!1}function rd(e){return!Sr()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof Xe(e).ShadowRoot}function ki(e){let{overflow:t,overflowX:o,overflowY:i,display:r}=gt(e);return/auto|scroll|overlay|hidden|clip/.test(t+i+o)&&r!=="inline"&&r!=="contents"}function ad(e){return/^(table|td|th)$/.test(ko(e))}function Ei(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}var wg=/transform|translate|scale|rotate|perspective|filter/,vg=/paint|layout|strict|content/,_o=e=>!!e&&e!=="none",Zn;function Yo(e){let t=ft(e)?gt(e):e;return _o(t.transform)||_o(t.translate)||_o(t.scale)||_o(t.rotate)||_o(t.perspective)||!_r()&&(_o(t.backdropFilter)||_o(t.filter))||wg.test(t.willChange||"")||vg.test(t.contain||"")}function sd(e){let t=io(e);for(;Ht(t)&&!Xo(t);){if(Yo(t))return t;if(Ei(t))return null;t=io(t)}return null}function _r(){return Zn==null&&(Zn=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),Zn}function Xo(e){return/^(html|body|#document)$/.test(ko(e))}function gt(e){return Xe(e).getComputedStyle(e)}function Ri(e){return ft(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function io(e){if(ko(e)==="html")return e;let t=e.assignedSlot||e.parentNode||rd(e)&&e.host||Rt(e);return rd(t)?t.host:t}function ld(e){let t=io(e);return Xo(t)?(e.ownerDocument||e).body:Ht(t)&&ki(t)?t:ld(t)}function Bt(e,t,o){var i;t===void 0&&(t=[]),o===void 0&&(o=!0);let r=ld(e),n=r===((i=e.ownerDocument)==null?void 0:i.body),a=Xe(r);if(n){let s=kr(a);return t.concat(a,a.visualViewport||[],ki(r)?r:[],s&&o?Bt(s):[])}else return t.concat(r,Bt(r,[],o))}function kr(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function ud(e){let t=gt(e),o=parseFloat(t.width)||0,i=parseFloat(t.height)||0,r=Ht(e),n=r?e.offsetWidth:o,a=r?e.offsetHeight:i,s=Si(o)!==n||Si(i)!==a;return s&&(o=n,i=a),{width:o,height:i,$:s}}function ta(e){return ft(e)?e:e.contextElement}function Qo(e){let t=ta(e);if(!Ht(t))return kt(1);let o=t.getBoundingClientRect(),{width:i,height:r,$:n}=ud(t),a=(n?Si(o.width):o.width)/i,s=(n?Si(o.height):o.height)/r;return(!a||!Number.isFinite(a))&&(a=1),(!s||!Number.isFinite(s))&&(s=1),{x:a,y:s}}var yg=kt(0);function hd(e){let t=Xe(e);return!_r()||!t.visualViewport?yg:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function xg(e,t,o){return t===void 0&&(t=!1),!!o&&t&&o===Xe(e)}function Eo(e,t,o,i){t===void 0&&(t=!1),o===void 0&&(o=!1);let r=e.getBoundingClientRect(),n=ta(e),a=kt(1);t&&(i?ft(i)&&(a=Qo(i)):a=Qo(e));let s=xg(n,o,i)?hd(n):kt(0),c=(r.left+s.x)/a.x,d=(r.top+s.y)/a.y,h=r.width/a.x,m=r.height/a.y;if(n&&i){let p=Xe(n),f=ft(i)?Xe(i):i,g=p,w=kr(g);for(;w&&f!==g;){let x=Qo(w),y=w.getBoundingClientRect(),C=gt(w),L=y.left+(w.clientLeft+parseFloat(C.paddingLeft))*x.x,M=y.top+(w.clientTop+parseFloat(C.paddingTop))*x.y;c*=x.x,d*=x.y,h*=x.x,m*=x.y,c+=L,d+=M,g=Xe(w),w=kr(g)}}return So({width:h,height:m,x:c,y:d})}function Er(e,t){let o=Ri(e).scrollLeft;return t?t.left+o:Eo(Rt(e)).left+o}function pd(e,t){let o=e.getBoundingClientRect(),i=o.left+t.scrollLeft-Er(e,o),r=o.top+t.scrollTop;return{x:i,y:r}}function Cg(e){let{elements:t,rect:o,offsetParent:i,strategy:r}=e,n=r==="fixed",a=Rt(i),s=t?Ei(t.floating):!1;if(i===a||s&&n)return o;let c={scrollLeft:0,scrollTop:0},d=kt(1),h=kt(0),m=Ht(i);if((m||!n)&&((ko(i)!=="body"||ki(a))&&(c=Ri(i)),m)){let f=Eo(i);d=Qo(i),h.x=f.x+i.clientLeft,h.y=f.y+i.clientTop}let p=a&&!m&&!n?pd(a,c):kt(0);return{width:o.width*d.x,height:o.height*d.y,x:o.x*d.x-c.scrollLeft*d.x+h.x+p.x,y:o.y*d.y-c.scrollTop*d.y+h.y+p.y}}function Sg(e){return e.getClientRects?Array.from(e.getClientRects()):[]}function _g(e){let t=Ri(e),o=e.ownerDocument.body,i=mt(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),r=mt(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight),n=-t.scrollLeft+Er(e),a=-t.scrollTop;return gt(o).direction==="rtl"&&(n+=mt(e.clientWidth,o.clientWidth)-i),{width:i,height:r,x:n,y:a}}var kg=25;function Eg(e,t,o){o===void 0&&(o="viewport");let i=o==="layoutViewport",r=Xe(e),n=Rt(e),a=r.visualViewport,s=n.clientWidth,c=n.clientHeight,d=0,h=0;if(a){let p=!_r()||t==="fixed";i?p||(d=-a.offsetLeft,h=-a.offsetTop):(s=a.width,c=a.height,p&&(d=a.offsetLeft,h=a.offsetTop))}if(Er(n)<=0){let p=n.ownerDocument,f=p.body,g=getComputedStyle(f),w=p.compatMode==="CSS1Compat"&&parseFloat(g.marginLeft)+parseFloat(g.marginRight)||0,x=Math.abs(n.clientWidth-f.clientWidth-w),y=getComputedStyle(n).scrollbarGutter==="stable both-edges"?x/2:x;y<=kg&&(s-=y)}return{width:s,height:c,x:d,y:h}}function Rg(e,t){let o=Eo(e,!0,t==="fixed"),i=o.top+e.clientTop,r=o.left+e.clientLeft,n=Qo(e),a=e.clientWidth*n.x,s=e.clientHeight*n.y,c=r*n.x,d=i*n.y;return{width:a,height:s,x:c,y:d}}function cd(e,t,o){let i;if(t==="viewport"||t==="layoutViewport")i=Eg(e,o,t);else if(t==="document")i=_g(Rt(e));else if(ft(t))i=Rg(t,o);else{let r=hd(e);i={x:t.x-r.x,y:t.y-r.y,width:t.width,height:t.height}}return So(i)}function Ag(e,t){let o=t.get(e);if(o)return o;let i=Bt(e,[],!1).filter(s=>ft(s)&&ko(s)!=="body"),r=null,n=gt(e).position==="fixed",a=n?io(e):e;for(;ft(a)&&!Xo(a);){let s=gt(a),c=Yo(a),d=r?r.position:n?"fixed":"";!c&&(d==="fixed"||d==="absolute"&&s.position==="static")?i=i.filter(m=>m!==a):r=s,a=io(a)}return t.set(e,i),i}function zg(e){let{element:t,boundary:o,rootBoundary:i,strategy:r}=e,a=[...o==="clippingAncestors"?Ei(t)?[]:Ag(t,this._c):[].concat(o),i],s=cd(t,a[0],r),c=s.top,d=s.right,h=s.bottom,m=s.left;for(let p=1;p<a.length;p++){let f=cd(t,a[p],r);c=mt(f.top,c),d=_t(f.right,d),h=_t(f.bottom,h),m=mt(f.left,m)}return{width:d-m,height:h-c,x:m,y:c}}function Fg(e){let{width:t,height:o}=ud(e);return{width:t,height:o}}function Dg(e,t,o){let i=Ht(t),r=Rt(t),n=o==="fixed",a=Eo(e,!0,n,t),s={scrollLeft:0,scrollTop:0},c=kt(0);if((i||!n)&&((ko(t)!=="body"||ki(r))&&(s=Ri(t)),i)){let p=Eo(t,!0,n,t);c.x=p.x+t.clientLeft,c.y=p.y+t.clientTop}!i&&r&&(c.x=Er(r));let d=r&&!i&&!n?pd(r,s):kt(0),h=a.left+s.scrollLeft-c.x-d.x,m=a.top+s.scrollTop-c.y-d.y;return{x:h,y:m,width:a.width,height:a.height}}function ea(e){return gt(e).position==="static"}function dd(e,t){if(!Ht(e)||gt(e).position==="fixed")return null;if(t)return t(e);let o=e.offsetParent;return Rt(e)===o&&(o=o.ownerDocument.body),o}function md(e,t){let o=Xe(e);if(Ei(e))return o;if(!Ht(e)){let r=io(e);for(;r&&!Xo(r);){if(ft(r)&&!ea(r))return r;r=io(r)}return o}let i=dd(e,t);for(;i&&ad(i)&&ea(i);)i=dd(i,t);return i&&Xo(i)&&ea(i)&&!Yo(i)?o:i||sd(e)||o}var Ig=async function(e){let t=this.getOffsetParent||md,o=this.getDimensions,i=await o(e.floating);return{reference:Dg(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}};function $g(e){return gt(e).direction==="rtl"}var Ai={convertOffsetParentRelativeRectToViewportRelativeRect:Cg,getDocumentElement:Rt,getClippingRect:zg,getOffsetParent:md,getElementRects:Ig,getClientRects:Sg,getDimensions:Fg,getScale:Qo,isElement:ft,isRTL:$g};function fd(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function Mg(e,t,o){let i=null,r,n=Rt(e);function a(){var h;clearTimeout(r),(h=i)==null||h.disconnect(),i=null}function s(h,m){h===void 0&&(h=!1),m===void 0&&(m=1),a();let p=e.getBoundingClientRect(),{left:f,top:g,width:w,height:x}=p;if(h||t(),!w||!x)return;let y=_i(g),C=_i(n.clientWidth-(f+w)),L=_i(n.clientHeight-(g+x)),M=_i(f),A={rootMargin:-y+"px "+-C+"px "+-L+"px "+-M+"px",threshold:mt(0,_t(1,m))||1},v=!0;function O(Y){let U=Y[0].intersectionRatio;if(!fd(p,e.getBoundingClientRect()))return s();if(U!==m){if(!v)return s();U?s(!1,U):r=setTimeout(()=>{s(!1,1e-7)},1e3)}v=!1}try{i=new IntersectionObserver(O,{...A,root:n.ownerDocument})}catch{i=new IntersectionObserver(O,A)}i.observe(e)}let c=Xe(e),d=()=>s(o);return c.addEventListener("resize",d),s(!0),()=>{c.removeEventListener("resize",d),a()}}function Rr(e,t,o,i){i===void 0&&(i={});let{ancestorScroll:r=!0,ancestorResize:n=!0,elementResize:a=typeof ResizeObserver=="function",layoutShift:s=typeof IntersectionObserver=="function",animationFrame:c=!1}=i,d=ta(e),h=r||n?[...d?Bt(d):[],...t?Bt(t):[]]:[];h.forEach(y=>{r&&y.addEventListener("scroll",o),n&&y.addEventListener("resize",o)});let m=d&&s?Mg(d,o,n):null,p=-1,f=null;a&&(f=new ResizeObserver(y=>{let[C]=y;C&&C.target===d&&f&&t&&(f.unobserve(t),cancelAnimationFrame(p),p=requestAnimationFrame(()=>{var L;(L=f)==null||L.observe(t)})),o()}),d&&!c&&f.observe(d),t&&f.observe(t));let g,w=c?Eo(e):null;c&&x();function x(){let y=Eo(e);w&&!fd(w,y)&&o(),w=y,g=requestAnimationFrame(x)}return o(),()=>{var y;h.forEach(C=>{r&&C.removeEventListener("scroll",o),n&&C.removeEventListener("resize",o)}),m?.(),(y=f)==null||y.disconnect(),f=null,c&&cancelAnimationFrame(g)}}var Ar=td;var zr=od,Fr=ed,oa=id;var gd=Zc;var Dr=(e,t,o)=>{let i=new Map,r=o??{},n={...Ai,...r.platform,_c:i};return Jc(e,t,{...r,platform:n})};var ia=new Set,Ge=class extends V{constructor(){super(...arguments),this.submenuCleanups=new Map,this.localize=new N(this),this.userTypedQuery="",this.openSubmenuStack=[],this.open=!1,this.size="m",this.placement="bottom-start",this.distance=0,this.skidding=0,this.handleDocumentKeyDown=async e=>{let t=this.localize.dir()==="rtl";if(e.key==="Escape"&&this.open&&Be(this)){let h=this.getTrigger();e.preventDefault(),e.stopPropagation(),this.open=!1,h?.focus({preventScroll:!0});return}let o=[...Ko()].find(h=>h.localName==="wa-dropdown-item"),i=o?.localName==="wa-dropdown-item",r=this.getCurrentSubmenuItem(),n=!!r,a,s,c;n?(a=this.getSubmenuItems(r),s=a.find(h=>h.active||h===o),c=s?a.indexOf(s):-1):(a=this.getItems(),s=a.find(h=>h.active||h===o),c=s?a.indexOf(s):-1);let d;if(e.key==="ArrowUp"&&(e.preventDefault(),e.stopPropagation(),c>0?d=a[c-1]:d=a[a.length-1]),e.key==="ArrowDown"&&(e.preventDefault(),e.stopPropagation(),c!==-1&&c<a.length-1?d=a[c+1]:d=a[0]),e.key===(t?"ArrowLeft":"ArrowRight")&&i&&s&&s.hasSubmenu){e.preventDefault(),e.stopPropagation(),s.submenuOpen=!0,this.addToSubmenuStack(s),setTimeout(()=>{let h=this.getSubmenuItems(s);h.length>0&&(h.forEach((m,p)=>m.active=p===0),h[0].focus({preventScroll:!0}))},0);return}if(e.key===(t?"ArrowRight":"ArrowLeft")&&n){e.preventDefault(),e.stopPropagation();let h=this.removeFromSubmenuStack();h&&(h.submenuOpen=!1,setTimeout(()=>{h.focus({preventScroll:!0}),h.active=!0,(h.slot==="submenu"?this.getSubmenuItems(h.parentElement):this.getItems()).forEach(p=>{p!==h&&(p.active=!1)})},0));return}if((e.key==="Home"||e.key==="End")&&(e.preventDefault(),e.stopPropagation(),d=e.key==="Home"?a[0]:a[a.length-1]),e.key==="Tab"&&await this.hideMenu(),e.key.length===1&&!(e.metaKey||e.ctrlKey||e.altKey)&&!(e.key===" "&&this.userTypedQuery==="")&&(clearTimeout(this.userTypedTimeout),this.userTypedTimeout=setTimeout(()=>{this.userTypedQuery=""},1e3),this.userTypedQuery+=e.key,a.some(h=>{let m=(h.textContent||"").trim().toLowerCase(),p=this.userTypedQuery.trim().toLowerCase();return m.startsWith(p)?(d=h,!0):!1})),d){e.preventDefault(),e.stopPropagation(),a.forEach(h=>h.active=h===d),d.focus({preventScroll:!0}),d.scrollIntoView({block:"nearest"});return}(e.key==="Enter"||e.key===" "&&this.userTypedQuery==="")&&i&&s&&(e.preventDefault(),e.stopPropagation(),s.hasSubmenu?(s.submenuOpen=!0,this.addToSubmenuStack(s),setTimeout(()=>{let h=this.getSubmenuItems(s);h.length>0&&(h.forEach((m,p)=>m.active=p===0),h[0].focus({preventScroll:!0}))},0)):this.makeSelection(s,e))},this.handleDocumentPointerDown=e=>{e.composedPath().some(i=>i instanceof HTMLElement?i===this||i.closest('wa-dropdown, [part="submenu"]'):!1)||(this.open=!1)},this.handleGlobalMouseMove=e=>{let t=this.getCurrentSubmenuItem();if(!t?.submenuOpen||!t.submenuElement)return;let o=t.submenuElement.getBoundingClientRect(),i=this.localize.dir()==="rtl",r=i?o.right:o.left,n=i?Math.max(e.clientX,r):Math.min(e.clientX,r),a=Math.max(o.top,Math.min(e.clientY,o.bottom));t.submenuElement.style.setProperty("--safe-triangle-cursor-x",`${n}px`),t.submenuElement.style.setProperty("--safe-triangle-cursor-y",`${a}px`);let s=e.composedPath(),c=t.matches(":hover"),d=!!t.submenuElement?.matches(":hover"),h=c||!!s.find(p=>p===t),m=d||!!s.find(p=>p instanceof HTMLElement&&p.closest('[part="submenu"]')===t.submenuElement);!h&&!m&&setTimeout(()=>{!c&&!d&&(t.submenuOpen=!1)},100)}}handleSizeChange(){te(this.localName,this.size)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.userTypedTimeout),this.closeAllSubmenus(),this.submenuCleanups.forEach(e=>e()),this.submenuCleanups.clear(),document.removeEventListener("mousemove",this.handleGlobalMouseMove),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("pointerdown",this.handleDocumentPointerDown),ze(this)}firstUpdated(e){super.firstUpdated(e),this.syncAriaAttributes()}async updated(e){if(e.has("open")){let t=e.get("open");if(t===this.open||t===void 0&&this.open===!1)return;this.customStates.set("open",this.open),this.open?await this.showMenu():(this.closeAllSubmenus(),await this.hideMenu())}e.has("size")&&this.syncItemSizes()}getItems(e=!1){let t=(this.defaultSlot?.assignedElements({flatten:!0})??[]).filter(o=>o.localName==="wa-dropdown-item");return e?t:t.filter(o=>!o.disabled)}getSubmenuItems(e,t=!1){let o=e.shadowRoot?.querySelector('slot[name="submenu"]')||e.querySelector('slot[name="submenu"]');if(!o)return[];let i=o.assignedElements({flatten:!0}).filter(r=>r.localName==="wa-dropdown-item");return t?i:i.filter(r=>!r.disabled)}syncItemSizes(){(this.defaultSlot?.assignedElements({flatten:!0})??[]).filter(t=>t.localName==="wa-dropdown-item").forEach(t=>t.size=this.size)}addToSubmenuStack(e){let t=this.openSubmenuStack.indexOf(e);t!==-1?this.openSubmenuStack=this.openSubmenuStack.slice(0,t+1):this.openSubmenuStack.push(e)}removeFromSubmenuStack(){return this.openSubmenuStack.pop()}getCurrentSubmenuItem(){return this.openSubmenuStack.length>0?this.openSubmenuStack[this.openSubmenuStack.length-1]:void 0}closeAllSubmenus(){this.getItems(!0).forEach(t=>{t.submenuOpen=!1}),this.openSubmenuStack=[]}closeSiblingSubmenus(e){let t=e.closest('wa-dropdown-item:not([slot="submenu"])'),o;t?o=this.getSubmenuItems(t,!0):o=this.getItems(!0),o.forEach(i=>{i!==e&&i.submenuOpen&&(i.submenuOpen=!1)}),this.openSubmenuStack.includes(e)||this.openSubmenuStack.push(e)}getTrigger(){return this.querySelector('[slot="trigger"]')}async showMenu(){if(!this.getTrigger()||!this.popup||!this.menu)return;let t=new Te;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}if(this.popup.active)return;ia.forEach(i=>i.open=!1),this.popup.active=!0,this.open=!0,ia.add(this),Ue(this),this.syncAriaAttributes(),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("pointerdown",this.handleDocumentPointerDown),document.addEventListener("mousemove",this.handleGlobalMouseMove),this.menu.classList.remove("hide"),await se(this.menu,"show");let o=this.getItems();o.length>0&&(o.forEach((i,r)=>i.active=r===0),o[0].focus({preventScroll:!0})),this.dispatchEvent(new Ve)}async hideMenu(){if(!this.popup||!this.menu)return;let e=new Le({source:this});if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0;return}this.open=!1,ia.delete(this),ze(this),this.syncAriaAttributes(),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("pointerdown",this.handleDocumentPointerDown),document.removeEventListener("mousemove",this.handleGlobalMouseMove),this.menu.classList.remove("show"),await se(this.menu,"hide"),this.popup.active=this.open,this.dispatchEvent(new Pe)}handleMenuClick(e){let t=e.target.closest("wa-dropdown-item");if(!(!t||t.disabled)){if(t.hasSubmenu){t.submenuOpen||(this.closeSiblingSubmenus(t),this.addToSubmenuStack(t),t.submenuOpen=!0),e.stopPropagation();return}this.makeSelection(t,e)}}async handleMenuSlotChange(){let e=this.getItems(!0);await Promise.all(e.map(i=>i.updateComplete)),this.syncItemSizes();let t=e.some(i=>i.type==="checkbox"),o=e.some(i=>i.hasSubmenu);e.forEach((i,r)=>{i.setAttribute("aria-posinset",String(r+1)),i.setAttribute("aria-setsize",String(e.length)),i.active=r===0,i.checkboxAdjacent=t,i.submenuAdjacent=o})}handleTriggerClick(){this.open=!this.open}handleSubmenuOpening(e){let t=e.detail.item;this.closeSiblingSubmenus(t),this.addToSubmenuStack(t),this.setupSubmenuPosition(t),this.processSubmenuItems(t)}setupSubmenuPosition(e){if(!e.submenuElement)return;this.cleanupSubmenuPosition(e);let t=Rr(e,e.submenuElement,()=>{this.positionSubmenu(e),this.updateSafeTriangleCoordinates(e)});this.submenuCleanups.set(e,t);let o=e.submenuElement.querySelector('slot[name="submenu"]');o&&(o.removeEventListener("slotchange",Ge.handleSubmenuSlotChange),o.addEventListener("slotchange",Ge.handleSubmenuSlotChange),Ge.handleSubmenuSlotChange({target:o}))}static handleSubmenuSlotChange(e){let t=e.target;if(!t)return;let o=t.assignedElements().filter(n=>n.localName==="wa-dropdown-item");if(o.length===0)return;let i=o.some(n=>n.hasSubmenu),r=o.some(n=>n.type==="checkbox");o.forEach(n=>{n.submenuAdjacent=i,n.checkboxAdjacent=r})}processSubmenuItems(e){if(!e.submenuElement)return;let t=this.getSubmenuItems(e,!0),o=t.some(i=>i.hasSubmenu);t.forEach(i=>{i.submenuAdjacent=o})}cleanupSubmenuPosition(e){let t=this.submenuCleanups.get(e);t&&(t(),this.submenuCleanups.delete(e))}positionSubmenu(e){if(!e.submenuElement)return;let o=this.localize.dir()==="rtl"?"left-start":"right-start";Dr(e,e.submenuElement,{placement:o,middleware:[Ar({mainAxis:0,crossAxis:-5}),Fr({fallbackStrategy:"bestFit"}),zr({padding:8,crossAxis:!0})]}).then(({x:i,y:r,placement:n})=>{e.submenuElement.setAttribute("data-placement",n),Object.assign(e.submenuElement.style,{left:`${i}px`,top:`${r}px`})})}updateSafeTriangleCoordinates(e){if(!e.submenuElement||!e.submenuOpen)return;if(document.activeElement?.matches(":focus-visible")){e.submenuElement.style.setProperty("--safe-triangle-visible","none");return}e.submenuElement.style.setProperty("--safe-triangle-visible","block");let o=e.submenuElement.getBoundingClientRect(),i=this.localize.dir()==="rtl";e.submenuElement.style.setProperty("--safe-triangle-submenu-start-x",`${i?o.right:o.left}px`),e.submenuElement.style.setProperty("--safe-triangle-submenu-start-y",`${o.top}px`),e.submenuElement.style.setProperty("--safe-triangle-submenu-end-x",`${i?o.right:o.left}px`),e.submenuElement.style.setProperty("--safe-triangle-submenu-end-y",`${o.bottom}px`)}makeSelection(e,t){let o=this.getTrigger();if(e.disabled)return;e.type==="checkbox"&&(e.checked=!e.checked);let i=new Bc({item:e});this.dispatchEvent(i),i.defaultPrevented||(e.navigate(t),this.open=!1,o?.focus({preventScroll:!0}))}async syncAriaAttributes(){let e=this.getTrigger(),t;e&&(e.localName==="wa-button"?(await customElements.whenDefined("wa-button"),await e.updateComplete,t=e.shadowRoot.querySelector('[part~="base"]')):t=e,t.hasAttribute("id")||t.setAttribute("id",to("wa-dropdown-trigger-")),t.setAttribute("aria-haspopup","menu"),t.setAttribute("aria-expanded",this.open?"true":"false"),this.menu?.setAttribute("aria-expanded","false"))}render(){let e=this.didSSR&&!this.hasUpdated?this.open:this.popup?.active;return b`
      <wa-popup
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        ?active=${e}
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
    `}};Ge.css=[oe,Nc];l([_("slot:not([name])")],Ge.prototype,"defaultSlot",2);l([_("#menu")],Ge.prototype,"menu",2);l([_("wa-popup")],Ge.prototype,"popup",2);l([u({type:Boolean,reflect:!0})],Ge.prototype,"open",2);l([u({reflect:!0})],Ge.prototype,"size",2);l([S("size")],Ge.prototype,"handleSizeChange",1);l([u({reflect:!0})],Ge.prototype,"placement",2);l([u({type:Number})],Ge.prototype,"distance",2);l([u({type:Number})],Ge.prototype,"skidding",2);Ge=l([F("wa-dropdown")],Ge);var bd=E`
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

  :host(:state(submenu-open)) {
    background-color: var(--wa-color-neutral-fill-normal);
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

  :host([variant='danger']:state(submenu-open)),
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

  /* The link only exists to be clicked programmatically. */
  #link {
    display: none;
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
      animation: submenu-show var(--show-duration, var(--wa-transition-fast)) ease;
    }

    &.hide {
      animation: submenu-show var(--show-duration, var(--wa-transition-fast)) ease reverse;
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
`;var xe=class extends V{constructor(){super(...arguments),this.hasSlotController=new ce(this,"[default]","start","end"),this.active=!1,this.variant="default",this.size="m",this.checkboxAdjacent=!1,this.submenuAdjacent=!1,this.type="normal",this.checked=!1,this.disabled=!1,this.submenuOpen=!1,this.hasSubmenu=!1,this.handleSlotChange=()=>{this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState(),this.hasSubmenu?(this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",this.submenuOpen?"true":"false")):(this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"))},this.handleHostClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())},this.handleClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())},this.handlePointerEnter=e=>{e.pointerType==="mouse"&&this.hasSubmenu&&!this.disabled&&(this.notifyParentOfOpening(),this.submenuOpen=!0)}}handleSizeChange(){te(this.localName,this.size)}connectedCallback(){super.connectedCallback(),this.addEventListener?.("click",this.handleHostClick),this.addEventListener?.("pointerenter",this.handlePointerEnter),this.shadowRoot?.addEventListener?.("click",this.handleClick,{capture:!0}),this.shadowRoot?.addEventListener?.("slotchange",this.handleSlotChange)}disconnectedCallback(){super.disconnectedCallback(),this.closeSubmenu(),this.removeEventListener?.("click",this.handleHostClick),this.removeEventListener?.("pointerenter",this.handlePointerEnter),this.shadowRoot?.removeEventListener?.("click",this.handleClick,{capture:!0}),this.shadowRoot?.removeEventListener?.("slotchange",this.handleSlotChange)}firstUpdated(e){super.firstUpdated(e),this.setAttribute("tabindex","-1"),this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState()}updated(e){e.has("active")&&(this.setAttribute("tabindex",this.active?"0":"-1"),this.customStates.set("active",this.active)),e.has("checked")&&(this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked"),this.customStates.set("checked",this.checked)),e.has("disabled")&&(this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.customStates.set("disabled",this.disabled)),e.has("type")&&(this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))),(e.has("href")||e.has("hasSubmenu"))&&this.customStates.set("link",this.isLink()),e.has("submenuOpen")&&(this.customStates.set("submenu-open",this.submenuOpen),this.submenuOpen?this.openSubmenu():this.closeSubmenu())}updateHasSubmenuState(){this.customStates.set("has-submenu",this.hasSubmenu)}async openSubmenu(){let e=this.submenuElement;!this.hasSubmenu||!e||!this.isConnected||(this.notifyParentOfOpening(),e.showPopover?.(),e.hidden=!1,e.setAttribute("data-visible",""),this.submenuOpen=!0,this.setAttribute("aria-expanded","true"),await se(e,"show"),setTimeout(()=>{let t=this.getSubmenuItems();t.length>0&&(t.forEach((o,i)=>o.active=i===0),t[0].focus({preventScroll:!0}))},0))}notifyParentOfOpening(){let e=new CustomEvent("submenu-opening",{bubbles:!0,composed:!0,detail:{item:this}});this.dispatchEvent(e);let t=this.parentElement;t&&[...t.children].filter(i=>i!==this&&i.localName==="wa-dropdown-item"&&i.getAttribute("slot")===this.getAttribute("slot")&&i.submenuOpen).forEach(i=>{i.submenuOpen=!1})}async closeSubmenu(){let e=this.submenuElement;!this.hasSubmenu||!e||(this.submenuOpen=!1,this.setAttribute("aria-expanded","false"),e.hidden||(await se(e,"hide"),e?.isConnected&&(e.hidden=!0,e.removeAttribute("data-visible"),e.hidePopover?.())))}isLink(){return!!this.href&&!this.hasSubmenu}navigate(e){let t=this.linkElement;!this.isLink()||this.disabled||!t||t.dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0,composed:!1,altKey:e?.altKey??!1,ctrlKey:e?.ctrlKey??!1,metaKey:e?.metaKey??!1,shiftKey:e?.shiftKey??!1}))}getSubmenuItems(){return[...this.children].filter(e=>e.localName==="wa-dropdown-item"&&e.getAttribute("slot")==="submenu"&&!e.hasAttribute("disabled"))}render(){return b`
      ${this.href?b`
            <a
              id="link"
              href=${this.href}
              target=${z(this.target)}
              rel=${z(this.rel)}
              download=${z(this.download)}
              tabindex="-1"
              aria-hidden="true"
            ></a>
          `:""}
      ${this.type==="checkbox"?b`
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

      ${this.hasSubmenu?b`
            <wa-icon
              id="submenu-indicator"
              part="submenu-icon"
              exportparts="svg:submenu-icon__svg"
              library="system"
              name="chevron-right"
            ></wa-icon>
          `:""}
      ${this.hasSubmenu?b`
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
    `}};xe.css=bd;l([_("#submenu")],xe.prototype,"submenuElement",2);l([_("#link")],xe.prototype,"linkElement",2);l([u({type:Boolean})],xe.prototype,"active",2);l([u({reflect:!0})],xe.prototype,"variant",2);l([u({reflect:!0})],xe.prototype,"size",2);l([S("size")],xe.prototype,"handleSizeChange",1);l([u({attribute:"checkbox-adjacent",type:Boolean,reflect:!0})],xe.prototype,"checkboxAdjacent",2);l([u({attribute:"submenu-adjacent",type:Boolean,reflect:!0})],xe.prototype,"submenuAdjacent",2);l([u()],xe.prototype,"value",2);l([u({reflect:!0})],xe.prototype,"type",2);l([u({type:Boolean})],xe.prototype,"checked",2);l([u({type:Boolean,reflect:!0})],xe.prototype,"disabled",2);l([u({type:Boolean,reflect:!0})],xe.prototype,"submenuOpen",2);l([u({reflect:!0})],xe.prototype,"href",2);l([u()],xe.prototype,"target",2);l([u()],xe.prototype,"rel",2);l([u()],xe.prototype,"download",2);l([I()],xe.prototype,"hasSubmenu",2);xe=l([F("wa-dropdown-item")],xe);var wd=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};var vd=E`
  :host {
    --arrow-color: black;
    --arrow-size: var(--wa-tooltip-arrow-size);
    --popup-border-width: 0px;
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);

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
`;function yd(e){return Og(e)}function ra(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function Og(e){for(let t=e;t;t=ra(t))if(t instanceof Element&&getComputedStyle(t).display==="none")return null;for(let t=ra(e);t;t=ra(t)){if(!(t instanceof Element))continue;let o=getComputedStyle(t);if(o.display!=="contents"&&(o.position!=="static"||Yo(o)||t.tagName==="BODY"))return t}return null}function xd(e){return e!==null&&typeof e=="object"&&"getBoundingClientRect"in e&&("contextElement"in e?e instanceof Element:!0)}var Tg=!!globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),ne=class extends V{constructor(){super(...arguments),this.localize=new N(this),this.SUPPORTS_POPOVER=!1,this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),o=this.placement.includes("top")||this.placement.includes("bottom"),i=0,r=0,n=0,a=0,s=0,c=0,d=0,h=0;o?e.top<t.top?(i=e.left,r=e.bottom,n=e.right,a=e.bottom,s=t.left,c=t.top,d=t.right,h=t.top):(i=t.left,r=t.bottom,n=t.right,a=t.bottom,s=e.left,c=e.top,d=e.right,h=e.top):e.left<t.left?(i=e.right,r=e.top,n=t.left,a=t.top,s=e.right,c=e.bottom,d=t.left,h=t.bottom):(i=t.right,r=t.top,n=e.left,a=e.top,s=t.right,c=t.bottom,d=e.left,h=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${i}px`),this.style.setProperty("--hover-bridge-top-left-y",`${r}px`),this.style.setProperty("--hover-bridge-top-right-x",`${n}px`),this.style.setProperty("--hover-bridge-top-right-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${s}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${d}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${h}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.SUPPORTS_POPOVER=Tg,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else this.anchor instanceof Element||xd(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||!this.isConnected||(this.popup?.showPopover?.(),this.cleanup=Rr(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e()})}reposition(){if(!this.active||!this.anchorEl||!this.popup)return;let e=[Ar({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?e.push(oa({apply:({rects:i})=>{let r=this.sync==="width"||this.sync==="both",n=this.sync==="height"||this.sync==="both";this.popup.style.width=r?`${i.reference.width}px`:"",this.popup.style.height=n?`${i.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let t;this.SUPPORTS_POPOVER&&!xd(this.anchor)&&this.boundary==="scroll"&&(t=Bt(this.anchorEl).filter(i=>i instanceof Element)),this.flip&&e.push(Fr({boundary:this.flipBoundary||t,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&e.push(zr({boundary:this.shiftBoundary||t,padding:this.shiftPadding})),this.autoSize?e.push(oa({boundary:this.autoSizeBoundary||t,padding:this.autoSizePadding,apply:({availableWidth:i,availableHeight:r})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${r}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${i}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&e.push(gd({element:this.arrowEl,padding:this.arrowPadding}));let o=this.SUPPORTS_POPOVER?i=>Ai.getOffsetParent(i,yd):Ai.getOffsetParent;Dr(this.anchorEl,this.popup,{placement:this.placement,middleware:e,strategy:this.SUPPORTS_POPOVER?"absolute":"fixed",platform:{...Ai,getOffsetParent:o}}).then(({x:i,y:r,middlewareData:n,placement:a})=>{let s=this.localize.dir()==="rtl",c={top:"bottom",right:"left",bottom:"top",left:"right"}[a.split("-")[0]];if(this.setAttribute("data-current-placement",a),Object.assign(this.popup.style,{left:`${i}px`,top:`${r}px`}),this.arrow){let d=n.arrow.x,h=n.arrow.y,m="",p="",f="",g="";if(this.arrowPlacement==="start"){let w=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";m=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",p=s?w:"",g=s?"":w}else if(this.arrowPlacement==="end"){let w=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";p=s?"":w,g=s?w:"",f=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(g=typeof d=="number"?"calc(50% - var(--arrow-size-diagonal))":"",m=typeof h=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(g=typeof d=="number"?`${d}px`:"",m=typeof h=="number"?`${h}px`:"");Object.assign(this.arrowEl.style,{top:m,right:p,bottom:f,left:g,[c]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new wd)}render(){return b`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${T({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${T({popup:!0,"popup-active":this.active,"popup-fixed":!this.SUPPORTS_POPOVER,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?b`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};ne.css=vd;l([_(".popup")],ne.prototype,"popup",2);l([_(".arrow")],ne.prototype,"arrowEl",2);l([u({attribute:!1,type:Boolean})],ne.prototype,"SUPPORTS_POPOVER",2);l([u()],ne.prototype,"anchor",2);l([u({type:Boolean,reflect:!0})],ne.prototype,"active",2);l([u({reflect:!0})],ne.prototype,"placement",2);l([u()],ne.prototype,"boundary",2);l([u({type:Number})],ne.prototype,"distance",2);l([u({type:Number})],ne.prototype,"skidding",2);l([u({type:Boolean})],ne.prototype,"arrow",2);l([u({attribute:"arrow-placement"})],ne.prototype,"arrowPlacement",2);l([u({attribute:"arrow-padding",type:Number})],ne.prototype,"arrowPadding",2);l([u({type:Boolean})],ne.prototype,"flip",2);l([u({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(t=>t.trim()).filter(t=>t!==""),toAttribute:e=>e.join(" ")}})],ne.prototype,"flipFallbackPlacements",2);l([u({attribute:"flip-fallback-strategy"})],ne.prototype,"flipFallbackStrategy",2);l([u({type:Object})],ne.prototype,"flipBoundary",2);l([u({attribute:"flip-padding",type:Number})],ne.prototype,"flipPadding",2);l([u({type:Boolean})],ne.prototype,"shift",2);l([u({type:Object})],ne.prototype,"shiftBoundary",2);l([u({attribute:"shift-padding",type:Number})],ne.prototype,"shiftPadding",2);l([u({attribute:"auto-size"})],ne.prototype,"autoSize",2);l([u()],ne.prototype,"sync",2);l([u({type:Object})],ne.prototype,"autoSizeBoundary",2);l([u({attribute:"auto-size-padding",type:Number})],ne.prototype,"autoSizePadding",2);l([u({attribute:"hover-bridge",type:Boolean})],ne.prototype,"hoverBridge",2);ne=l([F("wa-popup")],ne);var Qe=class extends V{constructor(){super(...arguments),this.localize=new N(this),this.date=new Date,this.hourFormat="auto"}static get styles(){return[]}render(){let e=new Date(this.date),t=this.hourFormat==="auto"?void 0:this.hourFormat==="12";if(isNaN(e.getMilliseconds()))return;let o=this.localize.date(e,{weekday:this.weekday,era:this.era,year:this.year,month:this.month,day:this.day,hour:this.hour,minute:this.minute,second:this.second,timeZoneName:this.timeZoneName,timeZone:this.timeZone,hour12:t});return b`<time datetime=${e.toISOString()}>${o}</time>`}};l([u()],Qe.prototype,"date",2);l([u()],Qe.prototype,"weekday",2);l([u()],Qe.prototype,"era",2);l([u()],Qe.prototype,"year",2);l([u()],Qe.prototype,"month",2);l([u()],Qe.prototype,"day",2);l([u()],Qe.prototype,"hour",2);l([u()],Qe.prototype,"minute",2);l([u()],Qe.prototype,"second",2);l([u({attribute:"time-zone-name"})],Qe.prototype,"timeZoneName",2);l([u({attribute:"time-zone"})],Qe.prototype,"timeZone",2);l([u({attribute:"hour-format"})],Qe.prototype,"hourFormat",2);Qe=l([F("wa-format-date")],Qe);var it=class extends V{constructor(){super(...arguments),this.localize=new N(this),this.value=0,this.type="decimal",this.withoutGrouping=!1,this.currency="USD",this.currencyDisplay="symbol"}static get styles(){return[]}render(){return isNaN(this.value)?"":this.localize.number(this.value,{style:this.type,currency:this.currency,currencyDisplay:this.currencyDisplay,useGrouping:!this.withoutGrouping,minimumIntegerDigits:this.minimumIntegerDigits,minimumFractionDigits:this.minimumFractionDigits,maximumFractionDigits:this.maximumFractionDigits,minimumSignificantDigits:this.minimumSignificantDigits,maximumSignificantDigits:this.maximumSignificantDigits})}};l([u({type:Number})],it.prototype,"value",2);l([u()],it.prototype,"type",2);l([u({attribute:"without-grouping",type:Boolean})],it.prototype,"withoutGrouping",2);l([u()],it.prototype,"currency",2);l([u({attribute:"currency-display"})],it.prototype,"currencyDisplay",2);l([u({attribute:"minimum-integer-digits",type:Number})],it.prototype,"minimumIntegerDigits",2);l([u({attribute:"minimum-fraction-digits",type:Number})],it.prototype,"minimumFractionDigits",2);l([u({attribute:"maximum-fraction-digits",type:Number})],it.prototype,"maximumFractionDigits",2);l([u({attribute:"minimum-significant-digits",type:Number})],it.prototype,"minimumSignificantDigits",2);l([u({attribute:"maximum-significant-digits",type:Number})],it.prototype,"maximumSignificantDigits",2);it=l([F("wa-format-number")],it);var Cd=E`
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

    /* Only ring the field when the text input has focus, not inner buttons */
    &:has(input:focus, textarea:focus) {
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
    position: relative;
    display: inline-flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    height: 1.5em;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    border-radius: var(--wa-border-radius-s);
    background: none;
    padding: 0;
    transition: var(--wa-transition-normal) color;
    cursor: pointer;
    /* The box is wider than the glyph, so overhang half of that growth on each side. Keeps the
       glyph flush with the field's trailing padding edge, like every other form control. */
    margin-inline-start: calc(var(--wa-form-control-padding-inline) - 0.125em);
    margin-inline-end: -0.125em;

    &::after {
      content: '';
      position: absolute;
      inset-inline: 0;
      height: var(--wa-form-control-height);
    }

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

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
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
`;var ro=class extends Event{constructor(){super("wa-clear",{bubbles:!0,cancelable:!1,composed:!0})}};var K=class extends G{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new ce(this,"hint","label"),this.localize=new N(this),this.title="",this.type="text",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="m",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.withClear=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.withoutSpinButtons=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,Ct()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(e){this._value!==e&&(this.valueHasChanged=!0,this._value=e)}updateFormValue(e){if(e==null){this.setValue("",null);return}super.updateFormValue(e)}handleSizeChange(){te(this.localName,this.size)}handleChange(e){this.value=this.input.value,this.relayNativeEvent(e,{bubbles:!0,composed:!0})}handleClearClick(e){e.preventDefault(),this.value!==""&&(this.value="",this.updateComplete.then(()=>{this.dispatchEvent(new ro),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})),this.input.focus()}handleInput(){this.value=this.input.value}handleKeyDown(e){jo(e,this)}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}updated(e){if(super.updated(e),e.has("value")||e.has("defaultValue")||e.has("type")){let t=["number","date","time","datetime-local"];this.input&&t.includes(this.type)&&this.value&&this.input.value!==this.value&&(this._value=this.input.value),this.customStates.set("blank",!this.value),this.updateValidity()}}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(e,t,o="none"){this.input.setSelectionRange(e,t,o)}setRangeText(e,t,o,i="preserve"){let r=t??this.input.selectionStart,n=o??this.input.selectionEnd;this.input.setRangeText(e,r,n,i),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=null,this.input&&(this.input.value=this.value),super.formResetCallback()}render(){let e=this.hasSlotController.test("label","withLabel"),t=this.hasSlotController.test("hint","withHint"),o=this.label?!0:!!e,i=this.hint?!0:!!t,r=this.withClear&&!this.disabled&&!this.readonly,n=(!this.didSSR||this.hasUpdated)&&r&&(typeof this.value=="number"||this.value&&this.value.length>0);return b`
      <label
        part="form-control-label label"
        class=${T({label:!0,"has-label":o})}
        for="input"
        aria-hidden=${o?"false":"true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base input-wrapper" class="text-field">
        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
          id="input"
          class="control"
          type=${this.type==="password"&&this.passwordVisible?"text":this.type}
          title=${this.title}
          name=${z(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${z(this.placeholder)}
          minlength=${z(this.minlength)}
          maxlength=${z(this.maxlength)}
          min=${z(this.min)}
          max=${z(this.max)}
          step=${z(this.step)}
          .value=${ot(this.value??"")}
          autocapitalize=${z(this.autocapitalize)}
          autocomplete=${z(this.autocomplete)}
          autocorrect=${this.autocorrect?"on":"off"}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${z(this.pattern)}
          enterkeyhint=${z(this.enterkeyhint)}
          inputmode=${z(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        ${n?b`
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
        ${this.passwordToggle&&!this.disabled?b`
              <button
                part="password-toggle-button"
                class="password-toggle"
                type="button"
                aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                @click=${this.handlePasswordToggle}
              >
                ${this.passwordVisible?b`
                      <slot name="hide-password-icon">
                        <wa-icon name="eye-slash" library="system" variant="regular"></wa-icon>
                      </slot>
                    `:b`
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
        class=${T({"has-slotted":i})}
        aria-hidden=${i?"false":"true"}
        >${this.hint}</slot
      >
    `}};K.css=[oe,ye,Cd];K.shadowRootOptions={...G.shadowRootOptions,delegatesFocus:!0};l([_("input")],K.prototype,"input",2);l([u()],K.prototype,"title",2);l([u({reflect:!0})],K.prototype,"type",2);l([I()],K.prototype,"value",1);l([u({attribute:"value",reflect:!0})],K.prototype,"defaultValue",2);l([u({reflect:!0})],K.prototype,"size",2);l([S("size")],K.prototype,"handleSizeChange",1);l([u({reflect:!0})],K.prototype,"appearance",2);l([u({type:Boolean,reflect:!0})],K.prototype,"pill",2);l([u()],K.prototype,"label",2);l([u({attribute:"hint"})],K.prototype,"hint",2);l([u({attribute:"with-clear",type:Boolean})],K.prototype,"withClear",2);l([u()],K.prototype,"placeholder",2);l([u({type:Boolean,reflect:!0})],K.prototype,"readonly",2);l([u({attribute:"password-toggle",type:Boolean})],K.prototype,"passwordToggle",2);l([u({attribute:"password-visible",type:Boolean})],K.prototype,"passwordVisible",2);l([u({attribute:"without-spin-buttons",type:Boolean,reflect:!0})],K.prototype,"withoutSpinButtons",2);l([u({type:Boolean,reflect:!0})],K.prototype,"required",2);l([u()],K.prototype,"pattern",2);l([u({type:Number})],K.prototype,"minlength",2);l([u({type:Number})],K.prototype,"maxlength",2);l([u()],K.prototype,"min",2);l([u()],K.prototype,"max",2);l([u()],K.prototype,"step",2);l([u()],K.prototype,"autocapitalize",2);l([u({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="off"),toAttribute:e=>e?"on":"off"}})],K.prototype,"autocorrect",2);l([u()],K.prototype,"autocomplete",2);l([u({type:Boolean})],K.prototype,"autofocus",2);l([u()],K.prototype,"enterkeyhint",2);l([u({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="false"),toAttribute:e=>e?"true":"false"}})],K.prototype,"spellcheck",2);l([u()],K.prototype,"inputmode",2);l([u({attribute:"with-label",type:Boolean})],K.prototype,"withLabel",2);l([u({attribute:"with-hint",type:Boolean})],K.prototype,"withHint",2);l([S("step",{waitUntilFirstUpdate:!0})],K.prototype,"handleStepChange",1);K=l([F("wa-input")],K);K.disableWarning?.("change-in-update");var Sd=E`
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
`;var ct=class extends G{constructor(){super(),this.checked=!1,this.forceDisabled=!1,this.appearance="default",this.disabled=!1,this.handleClick=()=>{!this.disabled&&!this.forceDisabled&&(this.checked=!0)},this.addEventListener("click",this.handleClick)}handleSizeChange(){te(this.localName,this.size)}connectedCallback(){super.connectedCallback(),this.setInitialAttributes()}setInitialAttributes(){this.setAttribute("role","radio"),this.tabIndex=0,this.setAttribute("aria-disabled",this.disabled||this.forceDisabled?"true":"false")}updated(e){if(super.updated(e),e.has("checked")&&(this.customStates.set("checked",this.checked),this.setAttribute("aria-checked",this.checked?"true":"false"),!this.disabled&&!this.forceDisabled&&(this.tabIndex=this.checked?0:-1)),e.has("disabled")||e.has("forceDisabled")){let t=this.disabled||this.forceDisabled;this.customStates.set("disabled",t),this.setAttribute("aria-disabled",t?"true":"false"),t?this.tabIndex=-1:this.tabIndex=this.checked?0:-1}}setValue(){}render(){return b`
      <span part="control" class="control">
        ${this.checked?b`
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" part="checked-icon" class="checked-icon">
                <circle cx="8" cy="8" r="8" />
              </svg>
            `:""}
      </span>

      <slot part="label" class="label"></slot>
    `}};ct.css=[ye,oe,Sd];l([I()],ct.prototype,"checked",2);l([I()],ct.prototype,"forceDisabled",2);l([u({reflect:!0})],ct.prototype,"value",2);l([u({reflect:!0})],ct.prototype,"appearance",2);l([u({reflect:!0})],ct.prototype,"size",2);l([S("size")],ct.prototype,"handleSizeChange",1);l([u({type:Boolean})],ct.prototype,"disabled",2);ct=l([F("wa-radio")],ct);ct.disableWarning?.("change-in-update");var _d=E`
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
`;var $e=class extends G{constructor(){super(),this.hasSlotController=new ce(this,"hint","label"),this.label="",this.hint="",this.name=null,this.disabled=!1,this.orientation="vertical",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.required=!1,this.withLabel=!1,this.withHint=!1,this.handleRadioClick=e=>{let t=e.target.closest("wa-radio");if(!t||t.disabled||t.forceDisabled||this.disabled)return;let o=this.value;this.value=t.value,t.checked=!0;let i=this.getAllRadios();for(let r of i)t!==r&&(r.checked=!1,r.setAttribute("tabindex","-1"));this.value!==o&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})},this.addEventListener("keydown",this.handleKeyDown),this.addEventListener("click",this.handleRadioClick)}static get validators(){let e=[St({validationElement:Object.assign(document.createElement("input"),{required:!0,type:"radio",name:to("__wa-radio")})})];return[...super.validators,...e]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(e){typeof e=="number"&&(e=String(e)),this.valueHasChanged=!0,this._value=e}handleSizeChange(){te(this.localName,this.size)}get validationTarget(){if(!1)return;let e=this.querySelector(":is(wa-radio):not([disabled])");if(e)return e}updated(e){(e.has("disabled")||e.has("size")||e.has("value")||e.has("defaultValue"))&&this.syncRadioElements()}formResetCallback(...e){this._value=null,super.formResetCallback(...e),this.syncRadioElements()}getAllRadios(){return[...this.querySelectorAll("wa-radio")]}handleLabelClick(){this.focus()}async syncRadioElements(){let e=this.getAllRadios();if(e.forEach((t,o)=>{this.size&&t.setAttribute("size",this.size),t.toggleAttribute("data-wa-radio-horizontal",this.orientation!=="vertical"),t.toggleAttribute("data-wa-radio-vertical",this.orientation==="vertical"),t.toggleAttribute("data-wa-radio-first",o===0),t.toggleAttribute("data-wa-radio-inner",o!==0&&o!==e.length-1),t.toggleAttribute("data-wa-radio-last",o===e.length-1),t.forceDisabled=this.disabled}),await Promise.all(e.map(async t=>{await t.updateComplete,!t.disabled&&t.value===this.value?t.checked=!0:t.checked=!1})),this.disabled)e.forEach(t=>{t.tabIndex=-1});else{let t=e.filter(i=>!i.disabled),o=t.find(i=>i.checked);t.length>0&&(o?t.forEach(i=>{i.tabIndex=i.checked?0:-1}):t.forEach((i,r)=>{i.tabIndex=r===0?0:-1})),e.filter(i=>i.disabled).forEach(i=>{i.tabIndex=-1})}}handleKeyDown(e){if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key)||this.disabled)return;let t=this.getAllRadios().filter(s=>!s.disabled);if(t.length<=0)return;e.preventDefault();let o=this.value,i=t.find(s=>s.checked)??t[0],r=e.key===" "?0:["ArrowUp","ArrowLeft"].includes(e.key)?-1:1,n=t.indexOf(i)+r;n||(n=0),n<0&&(n=t.length-1),n>t.length-1&&(n=0);let a=t.some(s=>s.tagName.toLowerCase()==="wa-radio-button");this.getAllRadios().forEach(s=>{s.checked=!1,a||s.setAttribute("tabindex","-1")}),this.value=t[n].value,t[n].checked=!0,a?t[n].shadowRoot.querySelector("button").focus():(t[n].setAttribute("tabindex","0"),t[n].focus()),this.value!==o&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),e.preventDefault()}focus(e){if(this.disabled)return;let t=this.getAllRadios(),o=t.find(n=>n.checked),i=t.find(n=>!n.disabled),r=o||i;r&&r.focus(e)}render(){let e=this.hasSlotController.test("label","withLabel"),t=this.hasSlotController.test("hint","withHint"),o=this.label?!0:!!e,i=this.hint?!0:!!t;return b`
      <fieldset
        part="form-control"
        class=${T({"form-control":!0,"form-control-radio-group":!0,"form-control-has-label":o})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="hint"
        aria-errormessage="error-message"
        aria-orientation=${this.orientation}
      >
        <label
          part="form-control-label"
          id="label"
          class=${T({label:!0,"has-label":o})}
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
          class=${T({"has-slotted":i})}
          aria-hidden=${i?"false":"true"}
          >${this.hint}</slot
        >
      </fieldset>
    `}};$e.css=[oe,ye,_d];$e.shadowRootOptions={...G.shadowRootOptions,delegatesFocus:!0};l([_("slot:not([name])")],$e.prototype,"defaultSlot",2);l([u()],$e.prototype,"label",2);l([u({attribute:"hint"})],$e.prototype,"hint",2);l([u({reflect:!0})],$e.prototype,"name",2);l([u({type:Boolean,reflect:!0})],$e.prototype,"disabled",2);l([u({reflect:!0})],$e.prototype,"orientation",2);l([I()],$e.prototype,"value",1);l([u({attribute:"value",reflect:!0})],$e.prototype,"defaultValue",2);l([u({reflect:!0})],$e.prototype,"size",2);l([S("size")],$e.prototype,"handleSizeChange",1);l([u({type:Boolean,reflect:!0})],$e.prototype,"required",2);l([u({type:Boolean,attribute:"with-label"})],$e.prototype,"withLabel",2);l([u({type:Boolean,attribute:"with-hint"})],$e.prototype,"withHint",2);$e=l([F("wa-radio-group")],$e);$e.disableWarning?.("change-in-update");var kd=E`
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
`;var At=class extends V{constructor(){super(...arguments),this.localize=new N(this),this.resizeObserver=null,this.canScroll=!1,this.orientation="horizontal",this.withoutScrollbar=!1,this.withoutShadow=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.updateScroll()),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect()}handleKeyDown(e){e.key==="Home"&&(e.preventDefault(),this.content.scrollTo({left:this.orientation==="horizontal"?0:void 0,top:this.orientation==="vertical"?0:void 0})),e.key==="End"&&(e.preventDefault(),this.content.scrollTo({left:this.orientation==="horizontal"?this.content.scrollWidth:void 0,top:this.orientation==="vertical"?this.content.scrollHeight:void 0}))}handleSlotChange(){this.updateScroll()}updateScroll(){if(this.orientation==="horizontal"){let e=Math.ceil(this.content.clientWidth),t=Math.abs(Math.ceil(this.content.scrollLeft)),i=Math.ceil(this.content.scrollWidth)-e;this.canScroll=i>0;let r=Math.min(1,t/(i*.05)),n=Math.min(1,(i-t)/(i*.05));this.style.setProperty("--start-shadow-opacity",String(r||0)),this.style.setProperty("--end-shadow-opacity",String(n||0))}else{let e=Math.ceil(this.content.clientHeight),t=Math.abs(Math.ceil(this.content.scrollTop)),i=Math.ceil(this.content.scrollHeight)-e;this.canScroll=i>0;let r=Math.min(1,t/(i*.05)),n=Math.min(1,(i-t)/(i*.05));this.style.setProperty("--start-shadow-opacity",String(r||0)),this.style.setProperty("--end-shadow-opacity",String(n||0))}}render(){return b`
      ${this.withoutShadow?"":b`
            <div id="start-shadow" part="start-shadow" aria-hidden="true"></div>
            <div id="end-shadow" part="end-shadow" aria-hidden="true"></div>
          `}

      <div
        id="content"
        part="content"
        role="region"
        aria-label=${this.localize.term("scrollableRegion")}
        tabindex=${this.canScroll?"0":"-1"}
        @keydown=${this.handleKeyDown}
        @scroll=${this.updateScroll}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};At.css=[kd];l([_("#content")],At.prototype,"content",2);l([I()],At.prototype,"canScroll",2);l([u({reflect:!0})],At.prototype,"orientation",2);l([u({attribute:"without-scrollbar",type:Boolean,reflect:!0})],At.prototype,"withoutScrollbar",2);l([u({attribute:"without-shadow",type:Boolean,reflect:!0})],At.prototype,"withoutShadow",2);l([ic({passive:!0})],At.prototype,"updateScroll",1);At=l([F("wa-scroller")],At);var Ed=E`
  :host {
    --tag-max-size: 10ch;
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);
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
    flex: 0 0 auto;
    display: inline-flex;
    align-self: stretch;
    align-items: center;
    justify-content: center;
    inline-size: 1.5em;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    background: none;
    padding: 0;
    transition: color var(--wa-transition-normal);
    cursor: pointer;
    /* The box is wider than the glyph, so overhang half that growth on each side. Keeps the glyph
       on the same trailing axis as the segmented-field pickers' clear buttons. */
    margin-inline-start: calc(var(--wa-form-control-padding-inline) - 0.125em);
    margin-inline-end: -0.125em;

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
    transition: rotate var(--wa-transition-slow) var(--wa-transition-easing);
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
    padding: 0.25em;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);

    &::slotted(wa-divider) {
      --spacing: 0.5em;
    }
  }

  /* Space options with half the listbox's padding */
  .listbox slot:not([name]) {
    display: flex;
    flex-direction: column;
    gap: 0.125em;
  }

  slot:not([name])::slotted(small) {
    display: block;
    font-size: var(--wa-font-size-smaller);
    font-weight: var(--wa-font-weight-semibold);
    color: var(--wa-color-text-quiet);
    padding-block: 0.5em;
    padding-inline: 2.25em;
  }
`;var re=class extends G{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.cachedOptions=null,this.hasSlotController=new ce(this,"hint","label"),this.localize=new N(this),this.selectionOrder=new Map,this.typeToSelectString="",this.slotChangePending=!1,this.displayLabel="",this.selectedOptions=[],this.name="",this._defaultValue=null,this.size="m",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.required=!1,this.getTag=e=>b`
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
          data-value=${e.value}
          @wa-remove=${t=>this.handleTagRemove(t,e)}
        >
          ${e.label}
        </wa-tag>
      `,this.handleDocumentFocusIn=e=>{let t=e.composedPath();this&&!t.includes(this)&&this.hide()},this.handleDocumentKeyDown=e=>{let t=e.target,o=t.closest('[part~="clear-button"]')!==null,i=t.closest("wa-button")!==null;if(!(o||i)){if(e.key==="Escape"&&this.open&&Be(this)&&(e.preventDefault(),e.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),e.key==="Enter"||e.key===" "&&this.typeToSelectString===""){if(e.preventDefault(),e.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(e.key)){let r=this.getAllOptions(),n=r.indexOf(this.currentOption),a=Math.max(0,n);if(e.preventDefault(),!this.open&&(this.show(),this.currentOption))return;e.key==="ArrowDown"?(a=n+1,a>r.length-1&&(a=0)):e.key==="ArrowUp"?(a=n-1,a<0&&(a=r.length-1)):e.key==="Home"?a=0:e.key==="End"&&(a=r.length-1),this.setCurrentOption(r[a])}if(e.key?.length===1||e.key==="Backspace"){let r=this.getAllOptions();if(e.metaKey||e.ctrlKey||e.altKey)return;if(!this.open){if(e.key==="Backspace")return;this.show()}e.stopPropagation(),e.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),e.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=e.key.toLowerCase();for(let n of r)if(n.label.toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(n);break}}}},this.handleDocumentMouseDown=e=>{let t=e.composedPath();this&&!t.includes(this)&&this.hide()}}static get validators(){let e=[St({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...e]}get validationTarget(){return this.valueInput}set defaultValue(e){this._defaultValue=this.convertDefaultValue(e)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}rawValuesEqual(e,t){return e==null&&t==null?!0:e==null||t==null||e.length!==t.length?!1:e.every((o,i)=>o===t[i])}convertDefaultValue(e){return!(this.multiple||this.hasAttribute("multiple"))&&Array.isArray(e)&&(e=e[0]),e}set value(e){let t=this.value;e instanceof FormData&&(e=e.getAll(this.name)),e!=null&&!Array.isArray(e)&&(e=[e]);let o=this._value;this._value=e??null,this.rawValuesEqual(o,this._value)||(this.valueHasChanged=!0,this.requestUpdate("value",t))}get value(){let e=this._value??this.defaultValue??null;e!=null&&(e=Array.isArray(e)?e:[e]),this.optionValues=new Set(this.getAllOptions().filter(o=>!o.disabled).map(o=>o.value));let t=e;return e!=null&&(t=e.filter(o=>this.optionValues.has(o)),t=this.multiple?t:t[0],t=t??null),t}handleSizeChange(){te(this.localName,this.size)}connectedCallback(){super.connectedCallback(),this.processSlotChange(),this.open=!1}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.cachedOptions=null}updateDefaultValue(){let t=this.getAllOptions().filter(o=>o.hasAttribute("selected")||o.defaultSelected);if(t.length>0){let o=t.map(i=>i.value);this._defaultValue=this.multiple?o:o[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),Ue(this),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),ze(this),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.displayInput.setSelectionRange(0,0)}handleLabelClick(){this.displayInput.focus()}handleComboboxClick(e){e.preventDefault()}handleComboboxMouseDown(e){let o=e.composedPath().some(i=>i instanceof Element&&i.tagName.toLowerCase()==="wa-button");this.disabled||o||(e.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(e){e.stopPropagation(),this.handleDocumentKeyDown(e)}handleClearClick(e){e.stopPropagation(),this.hasInteracted=!0,this.valueHasChanged=!0,this.value!==null&&(this.displayLabel="",this.selectionOrder.clear(),this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new ro),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(e){e.stopPropagation(),e.preventDefault()}handleOptionClick(e){let o=e.target.closest("wa-option");o&&!o.disabled&&(this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(o):this.setSelectedOptions(o),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){this.slotChangePending||(this.slotChangePending=!0,queueMicrotask(()=>{this.slotChangePending=!1,this.processSlotChange()}))}processSlotChange(){if(customElements.get("wa-option")||customElements.whenDefined("wa-option").then(()=>this.handleDefaultSlotChange()),this.didSSR&&!this.hasUpdated){this.updateComplete.then(()=>{this.handleDefaultSlotChange()});return}this.cachedOptions=null;let e=this.getAllOptions();this.updateDefaultValue();let t=this.value;if(t==null||!this.valueHasChanged&&!this.hasInteracted){this.selectionChanged();return}Array.isArray(t)||(t=[t]);let o=e.filter(i=>t.includes(i.value));this.setSelectedOptions(o)}handleTagRemove(e,t){if(e.stopPropagation(),this.disabled)return;this.hasInteracted=!0,this.valueHasChanged=!0;let o=t;if(!o){let i=e.target.closest("wa-tag[data-value]");if(i){let r=i.dataset.value;o=this.selectedOptions.find(n=>n.value===r)}}o&&(this.toggleOptionSelection(o,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this.cachedOptions?this.cachedOptions:this?.querySelectorAll?(this.cachedOptions=[...this.querySelectorAll("wa-option")],this.cachedOptions):[]}getFirstOption(){return this.querySelector("wa-option")}setCurrentOption(e){this.getAllOptions().forEach(o=>{o.current=!1,o.tabIndex=-1}),e&&(this.currentOption=e,e.current=!0,e.tabIndex=0,e.focus({preventScroll:!0}),this.open&&!this.listbox.hidden&&Lt(e,this.listbox,"vertical","auto"))}setSelectedOptions(e){let t=this.getAllOptions(),o=Array.isArray(e)?e:[e];t.forEach(i=>{o.includes(i)||(i.selected=!1)}),o.length&&o.forEach(i=>i.selected=!0),this.selectionChanged()}toggleOptionSelection(e,t){t===!0||t===!1?e.selected=t:e.selected=!e.selected,this.selectionChanged()}selectionChanged(){let t=this.getAllOptions().filter(a=>{if(!this.hasInteracted&&!this.valueHasChanged){let s=this.defaultValue,c=Array.isArray(s)?s:[s];return a.hasAttribute("selected")||a.defaultSelected||a.selected||c?.includes(a.value)}return a.selected}),o=new Set(t.map(a=>a.value));for(let a of this.selectionOrder.keys())o.has(a)||this.selectionOrder.delete(a);let r=(this.selectionOrder.size>0?Math.max(...this.selectionOrder.values()):-1)+1;for(let a of t)this.selectionOrder.has(a.value)||this.selectionOrder.set(a.value,r++);this.selectedOptions=t.sort((a,s)=>{let c=this.selectionOrder.get(a.value)??0,d=this.selectionOrder.get(s.value)??0;return c-d});let n=new Set(this.selectedOptions.map(a=>a.value));if(n.size>0||this._value){let a=this._value;if(this._value==null){let s=this.defaultValue??[];this._value=Array.isArray(s)?s:[s]}this._value=this._value?.filter(s=>!this.optionValues?.has(s))??null,this._value?.unshift(...n),this.requestUpdate("value",a)}if(this.multiple)this.placeholder&&!this.value?.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{let a=this.selectedOptions[0];this.displayLabel=a?.label??""}this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((e,t)=>{if(t<this.maxOptionsVisible||this.maxOptionsVisible<=0){let o=this.getTag(e,t);return o?typeof o=="string"?Xt(o):o:null}else if(t===this.maxOptionsVisible)return b`
          <wa-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
            >+${this.selectedOptions.length-t}</wa-tag
          >
        `;return null})}updated(e){super.updated(e),(e.has("value")||e.has("displayLabel"))&&this.customStates.set("blank",!this.value&&!this.displayLabel)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){let e=this.getAllOptions(),t=Array.isArray(this.value)?this.value:[this.value],o=e.filter(i=>t.includes(i.value));this.setSelectedOptions(o),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption());let e=new Te;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await se(this.popup.popup,"show"),this.currentOption&&Lt(this.currentOption,this.listbox,"vertical","auto"),this.dispatchEvent(new Ve)}else{let e=new Le;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.removeOpenListeners(),await se(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.dispatchEvent(new Pe)}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,Ee(this,"wa-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,Ee(this,"wa-after-hide")}focus(e){this.displayInput.focus(e)}blur(){this.displayInput.blur()}formResetCallback(){this.selectionOrder.clear(),this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){let e=this.hasSlotController.test("label","withLabel"),t=this.hasSlotController.test("hint","withHint"),o=this.label?!0:!!e,i=this.hint?!0:!!t,r=(this.hasUpdated||!1)&&this.withClear&&!this.disabled&&(this.displayLabel||this.value&&this.value.length>0);return b`
      <div
        part="form-control"
        class=${T({"form-control":!0,"form-control-has-label":o})}
      >
        <label
          id="label"
          part="form-control-label label"
          class=${T({label:!0,"has-label":o})}
          aria-hidden=${o?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${T({select:!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple})}
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
              ${this.multiple&&this.hasUpdated?b`<div part="tags" class="tags" @wa-remove=${this.handleTagRemove}>${this.tags}</div>`:""}

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

              ${r?b`
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
          class=${T({"has-slotted":i})}
          aria-hidden=${i?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};re.css=[Ed,ye,oe];l([_(".select")],re.prototype,"popup",2);l([_(".combobox")],re.prototype,"combobox",2);l([_(".display-input")],re.prototype,"displayInput",2);l([_(".value-input")],re.prototype,"valueInput",2);l([_(".listbox")],re.prototype,"listbox",2);l([I()],re.prototype,"displayLabel",2);l([I()],re.prototype,"currentOption",2);l([I()],re.prototype,"selectedOptions",2);l([u({reflect:!0})],re.prototype,"name",2);l([u({attribute:!1})],re.prototype,"defaultValue",1);l([u({attribute:"value",reflect:!1})],re.prototype,"value",1);l([u({reflect:!0})],re.prototype,"size",2);l([S("size")],re.prototype,"handleSizeChange",1);l([u()],re.prototype,"placeholder",2);l([u({type:Boolean,reflect:!0})],re.prototype,"multiple",2);l([u({attribute:"max-options-visible",type:Number})],re.prototype,"maxOptionsVisible",2);l([u({type:Boolean})],re.prototype,"disabled",2);l([u({attribute:"with-clear",type:Boolean})],re.prototype,"withClear",2);l([u({type:Boolean,reflect:!0})],re.prototype,"open",2);l([u({reflect:!0})],re.prototype,"appearance",2);l([u({type:Boolean,reflect:!0})],re.prototype,"pill",2);l([u()],re.prototype,"label",2);l([u({reflect:!0})],re.prototype,"placement",2);l([u({attribute:"hint"})],re.prototype,"hint",2);l([u({attribute:"with-label",type:Boolean})],re.prototype,"withLabel",2);l([u({attribute:"with-hint",type:Boolean})],re.prototype,"withHint",2);l([u({type:Boolean,reflect:!0})],re.prototype,"required",2);l([u({attribute:!1})],re.prototype,"getTag",2);l([S("disabled",{waitUntilFirstUpdate:!0})],re.prototype,"handleDisabledChange",1);l([S("value",{waitUntilFirstUpdate:!0})],re.prototype,"handleValueChange",1);l([S("open",{waitUntilFirstUpdate:!0})],re.prototype,"handleOpenChange",1);re=l([F("wa-select")],re);re.disableWarning?.("change-in-update");var Rd=class extends Event{constructor(){super("wa-remove",{bubbles:!0,cancelable:!1,composed:!0})}};var Ad=E`
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
`;var Nt=class extends V{constructor(){super(...arguments),this.localize=new N(this),this.variant="neutral",this.appearance="filled-outlined",this.size="m",this.pill=!1,this.withRemove=!1}handleSizeChange(){te(this.localName,this.size)}handleRemoveClick(){this.dispatchEvent(new Rd)}render(){return b`
      <slot part="content" class="content"></slot>

      ${this.withRemove?b`
            <wa-button
              part="remove-button"
              exportparts="base:remove-button__base"
              class="remove"
              appearance="plain"
              size=${this.size}
              @click=${this.handleRemoveClick}
              tabindex="-1"
            >
              <wa-icon name="xmark" library="system" variant="solid" label=${this.localize.term("remove")}></wa-icon>
            </wa-button>
          `:""}
    `}};Nt.css=[Ad,Zt,oe];l([u({reflect:!0})],Nt.prototype,"variant",2);l([u({reflect:!0})],Nt.prototype,"appearance",2);l([u({reflect:!0})],Nt.prototype,"size",2);l([S("size")],Nt.prototype,"handleSizeChange",1);l([u({type:Boolean,reflect:!0})],Nt.prototype,"pill",2);l([u({attribute:"with-remove",type:Boolean})],Nt.prototype,"withRemove",2);Nt=l([F("wa-tag")],Nt);var zd=E`
  :host {
    --current-text-color: var(--wa-color-brand-on-loud);

    display: block;
    color: var(--wa-color-text-normal);
    -webkit-user-select: none;
    user-select: none;

    position: relative;
    display: flex;
    align-items: center;
    font: inherit;
    padding: 0.5em 1em 0.5em 0.25em;
    border-radius: var(--wa-border-radius-s);
    line-height: var(--wa-line-height-condensed);
    transition: var(--wa-transition-fast) background-color var(--wa-transition-easing);
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
    background-color: var(--wa-form-control-activated-color);
    color: var(--current-text-color);
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
`;function zi(e,t=0){if(!e||!globalThis.Node)return"";if(typeof e[Symbol.iterator]=="function")return(Array.isArray(e)?e:[...e]).map(r=>zi(r,--t)).join("");let o=e;if(o.nodeType===Node.TEXT_NODE)return o.textContent??"";if(o.nodeType===Node.ELEMENT_NODE){let i=o;if(i.hasAttribute("slot")||i.matches("style, script"))return"";if(i instanceof HTMLSlotElement){let r=i.assignedNodes({flatten:!0});if(r.length>0)return zi(r,--t)}return t>-1?zi(i,--t):i.textContent??""}return o.hasChildNodes()?zi(o.childNodes,--t):""}var bt=class extends V{constructor(){super(...arguments),this.localize=new N(this),this.cachedDefaultLabel="",this.isInitialized=!1,this.isDefaultLabelDirty=!0,this.current=!1,this.value="",this.disabled=!1,this.selected=!1,this.defaultSelected=!1,this._label="",this.handleHover=e=>{e.type==="mouseenter"?this.customStates.set("hover",!0):e.type==="mouseleave"&&this.customStates.set("hover",!1)}}set label(e){let t=this._label;this._label=e||"",this._label!==t&&this.requestUpdate("label",t)}get label(){return this._label?this._label:this.defaultLabel}get defaultLabel(){return(this.isDefaultLabelDirty||!this.cachedDefaultLabel)&&this.updateDefaultLabel(),this.cachedDefaultLabel}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false"),this.addEventListener("mouseenter",this.handleHover),this.addEventListener("mouseleave",this.handleHover)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mouseenter",this.handleHover),this.removeEventListener("mouseleave",this.handleHover)}handleDefaultSlotChange(){this.isDefaultLabelDirty=!0,this.isInitialized?(customElements.whenDefined("wa-select").then(()=>{let e=this.closest("wa-select");e&&e.handleDefaultSlotChange?.()}),customElements.whenDefined("wa-combobox").then(()=>{let e=this.closest("wa-combobox");e&&e.handleDefaultSlotChange?.()})):this.isInitialized=!0}willUpdate(e){e.has("defaultSelected")&&(this.didSSR&&this.hasUpdated||!this.didSSR)&&this.syncDefaultSelected(),super.willUpdate(e)}syncDefaultSelected(){if("closest"in this&&!this.closest("wa-combobox, wa-select")?.hasInteracted&&this.defaultSelected){let e=this.selected;this.selected=this.defaultSelected,this.requestUpdate("selected",e)}}updated(e){e.has("disabled")&&(this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.customStates.set("disabled",this.disabled)),e.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.customStates.set("selected",this.selected)),e.has("value")&&(typeof this.value!="string"&&(this.value=String(this.value)),this.handleDefaultSlotChange()),e.has("current")&&this.customStates.set("current",this.current),super.updated(e)}async firstUpdated(e){if(super.firstUpdated(e),this.didSSR&&!this.hasUpdated?(await this.updateComplete,this.syncDefaultSelected()):this.syncDefaultSelected(),this.selected&&!this.defaultSelected){let t=this.closest("wa-select, wa-combobox");t&&!t.hasInteracted&&(await customElements.whenDefined(t?.localName),await t.updateComplete,t.selectionChanged?.())}}updateDefaultLabel(){let e=this.cachedDefaultLabel;this.cachedDefaultLabel=zi(this).trim(),this.isDefaultLabelDirty=!1;let t=this.cachedDefaultLabel!==e;return!this._label&&t&&this.requestUpdate("label",e),t}render(){let e=this.selected;return this.didSSR&&!this.hasUpdated?(this.updateComplete.then(()=>{this.requestUpdate()}),k):b`
      ${e?b`<wa-icon
            part="checked-icon"
            class="check"
            name="check"
            library="system"
            variant="solid"
            aria-hidden="true"
          ></wa-icon>`:b`<span part="checked-icon" class="check" aria-hidden="true"></span>`}
      <slot part="start" name="start" class="start"></slot>
      <slot part="label" class="label" @slotchange=${this.handleDefaultSlotChange}></slot>
      <slot part="end" name="end" class="end"></slot>
    `}};bt.css=zd;l([_(".label")],bt.prototype,"defaultSlot",2);l([I()],bt.prototype,"current",2);l([u({reflect:!0})],bt.prototype,"value",2);l([u({type:Boolean})],bt.prototype,"disabled",2);l([u({type:Boolean,attribute:!1})],bt.prototype,"selected",2);l([u({type:Boolean,attribute:"selected"})],bt.prototype,"defaultSelected",2);l([u()],bt.prototype,"label",1);bt=l([F("wa-option")],bt);var Fd=class extends Event{constructor(e){super("wa-create",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=e}};var Dd=E`
  :host {
    --tag-max-size: 10ch;
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);
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
    transition: rotate var(--wa-transition-slow) var(--wa-transition-easing);
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
    padding: 0.25em;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);

    &::slotted(wa-divider) {
      --spacing: 0.5em;
    }
  }

  /* Space options with half the listbox's padding */
  .listbox slot:not([name]) {
    display: flex;
    flex-direction: column;
    gap: 0.125em;
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
`;var Id=0;function Lg(){return`wa-combobox-option-${++Id}`}var W=class extends G{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.createOptionEl=null,this.hasInputSinceOpening=!1,this.hasSlotController=new ce(this,"hint","label"),this.localize=new N(this),this.listboxId=`wa-combobox-listbox-${++Id}`,this.selectionOrder=new Map,this.slotChangePending=!1,this.cachedOptions=null,this.selectedOptions=[],this.filteredOptions=[],this.inputValue="",this.name="",this._defaultValue=null,this.size="m",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.required=!1,this.allowCustomValue=!1,this.allowCreate=!1,this.filter=null,this.spellcheck=!1,this.getTag=e=>b`
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
          data-value=${e.value}
          @wa-remove=${t=>this.handleTagRemove(t,e)}
        >
          ${e.label}
        </wa-tag>
      `,this.handleDocumentFocusIn=e=>{let t=e.composedPath();this&&!t.includes(this)&&this.hide()},this.handleDocumentKeyDown=e=>{let t=e.target,o=t.closest('[part~="clear-button"]')!==null,i=t.closest("wa-button")!==null;if(!(o||i)){if(e.key==="Escape"&&this.open&&Be(this)){e.preventDefault(),e.stopPropagation(),this.hide(),!this.multiple&&this.selectedOptions.length>0?this.inputValue=this.selectedOptions[0].label:this.multiple||(this.inputValue=""),this.comboboxInput.focus({preventScroll:!0});return}if(e.key==="Enter"){if(e.preventDefault(),e.stopImmediatePropagation(),!this.open){this.show();return}if(this.currentOption&&this.handleCreateOptionSelected(this.currentOption))return;this.currentOption&&!this.currentOption.disabled?(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?(this.toggleOptionSelection(this.currentOption),this.inputValue="",this.updateFilteredOptions()):(this.setSelectedOptions(this.currentOption),this.inputValue=this.currentOption.label),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.comboboxInput.focus({preventScroll:!0}))):this.allowCustomValue&&!this.multiple&&this.inputValue&&(this.value=this.inputValue,this.valueHasChanged=!0,this.hasInteracted=!0,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hide(),this.comboboxInput.focus({preventScroll:!0}));return}if(e.key==="Backspace"&&this.multiple&&!this.inputValue&&this.selectedOptions.length>0){e.preventDefault(),this.hasInteracted=!0,this.valueHasChanged=!0;let r=this.selectedOptions[this.selectedOptions.length-1];this.toggleOptionSelection(r,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))});return}if(["ArrowUp","ArrowDown","Home","End"].includes(e.key)){let r=this.getVisibleOptions(),n=r.indexOf(this.currentOption),a=Math.max(0,n);if(e.preventDefault(),!this.open&&(this.show(),this.currentOption))return;e.key==="ArrowDown"?(a=n+1,a>r.length-1&&(a=0)):e.key==="ArrowUp"?(a=n-1,a<0&&(a=r.length-1)):e.key==="Home"?a=0:e.key==="End"&&(a=r.length-1),r[a]&&(this.setCurrentOption(r[a]),this.announceOption(r[a]))}}},this.handleDocumentMouseDown=e=>{let t=e.composedPath();this&&!t.includes(this)&&this.hide()}}static get validators(){let e=[St({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...e]}rawValuesEqual(e,t){return e==null&&t==null?!0:e==null||t==null||e.length!==t.length?!1:e.every((o,i)=>o===t[i])}get validationTarget(){return this.valueInput}set defaultValue(e){this._defaultValue=this.convertDefaultValue(e)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}convertDefaultValue(e){return!(this.multiple||this.hasAttribute("multiple"))&&Array.isArray(e)&&(e=e[0]),e}set value(e){let t=this.value;e instanceof FormData&&(e=e.getAll(this.name)),e!=null&&!Array.isArray(e)&&(e=[e]);let o=this._value;this._value=e??null,this.rawValuesEqual(o,this._value)||(this.valueHasChanged=!0,this.requestUpdate("value",t))}get value(){let e=this._value??this.defaultValue??null;e!=null&&(e=Array.isArray(e)?e:[e]),this.optionValues=new Set(this.getRealOptions().filter(o=>!o.disabled).map(o=>o.value));let t=e;return e!=null&&(this.allowCustomValue?t=e:t=e.filter(o=>this.optionValues.has(o)),t=this.multiple?t:t[0],t=t??null),t}handleSizeChange(){te(this.localName,this.size)}connectedCallback(){super.connectedCallback(),this.processSlotChange(),this.open=!1}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.removeCreateOption(),this.cachedOptions=null}updateFormValue(e){if(e==null){this.setValue("",null);return}super.updateFormValue(e)}updateDefaultValue(){let t=this.getRealOptions().filter(o=>o.hasAttribute("selected")||o.defaultSelected);if(t.length>0){let o=t.map(i=>i.value);this._defaultValue=this.multiple?o:o[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),Ue(this),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),ze(this),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.comboboxInput.select()}handleBlur(){if(!this.multiple)if(!this.inputValue)this.value!==null&&(this.selectionOrder.clear(),this.setSelectedOptions([]),this.hasInteracted=!0,this.valueHasChanged=!0,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}));else if(this.allowCustomValue){let e=this.value;this.value=this.inputValue,this.hasInteracted=!0,this.value!==e&&(this.valueHasChanged=!0,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}else this.selectedOptions.length>0&&(this.inputValue=this.selectedOptions[0].label);this.open||this.removeCreateOption()}handleLabelClick(){this.comboboxInput.focus(),this.show()}handleComboboxClick(e){e.preventDefault()}handleComboboxMouseDown(e){let o=e.composedPath().some(i=>i instanceof Element&&i.tagName.toLowerCase()==="wa-button");this.disabled||o||(e.preventDefault(),this.comboboxInput.focus({preventScroll:!0}),!(!this.open&&this.getVisibleOptions().length===0&&!(this.allowCreate&&this.inputValue.trim()))&&(this.open=!this.open))}handleComboboxKeyDown(e){e.stopPropagation(),this.handleDocumentKeyDown(e)}handleInputChange(e){e.stopPropagation();let t=e.target;this.inputValue=t.value,this.hasInputSinceOpening=!0,this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.updateFilteredOptions();let o=this.getVisibleOptions(),i=o.length>0;this.inputValue.length>0&&(i&&!this.open?this.show():!i&&this.open&&this.hide()),i&&this.open&&this.setCurrentOption(o[0]),this.announceFilterResults()}handleClearClick(e){e.stopPropagation(),this.hasInteracted=!0,(this.value!==null||this.inputValue)&&(this.selectionOrder.clear(),this.setSelectedOptions([]),this.inputValue="",this.updateFilteredOptions(),this.comboboxInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new ro),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(e){e.stopPropagation(),e.preventDefault()}handleOptionClick(e){let o=e.target.closest("wa-option");if(o&&!o.disabled){if(this.handleCreateOptionSelected(o)){this.updateComplete.then(()=>this.comboboxInput.focus({preventScroll:!0}));return}this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?(this.toggleOptionSelection(o),this.inputValue="",this.updateFilteredOptions()):(this.setSelectedOptions(o),this.inputValue=o.label),this.updateComplete.then(()=>this.comboboxInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.comboboxInput.focus({preventScroll:!0}))}}handleDefaultSlotChange(){this.slotChangePending||(this.slotChangePending=!0,queueMicrotask(()=>{this.slotChangePending=!1,this.processSlotChange()}))}processSlotChange(){if(!this.querySelectorAll)return;if(!customElements.get("wa-option")){customElements.whenDefined?.("wa-option").then(()=>this.handleDefaultSlotChange());return}this.cachedOptions=null;let e=this.getAllOptions();e.forEach(i=>{i.id||(i.id=Lg())}),this.updateDefaultValue();let t=this.value;if(t==null||!this.valueHasChanged&&!this.hasInteracted){this.selectionChanged(),this.open||this.updateFilteredOptions({skipCreateOption:!0});return}Array.isArray(t)||(t=[t]);let o=e.filter(i=>t.includes(i.value));this.setSelectedOptions(o),this.open||this.updateFilteredOptions({skipCreateOption:!0})}handleTagRemove(e,t){if(e.stopPropagation(),this.disabled)return;this.hasInteracted=!0,this.valueHasChanged=!0;let o=t;if(!o){let i=e.target.closest("wa-tag[data-value]");if(i){let r=i.dataset.value;o=this.selectedOptions.find(n=>n.value===r)}}o&&(this.toggleOptionSelection(o,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this.cachedOptions?this.cachedOptions:this?.querySelectorAll?(this.cachedOptions=[...this.querySelectorAll("wa-option")],this.cachedOptions):[]}getRealOptions(){return this.getAllOptions().filter(e=>!e.hasAttribute("data-create-option"))}updateCreateOption(){if(!this.allowCreate){this.removeCreateOption();return}let e=this.inputValue.trim(),o=this.getRealOptions().some(i=>i.label.toLowerCase()===e.toLowerCase());e&&!o?(this.createOptionEl||(this.createOptionEl=document.createElement("wa-option"),this.createOptionEl.setAttribute("data-create-option","")),this.createOptionEl.value=e,this.createOptionEl.textContent=this.localize.term("createOption",e),this.createOptionEl.hidden=!1,this.createOptionEl.parentElement!==this&&this.prepend(this.createOptionEl)):this.removeCreateOption()}removeCreateOption(){this.createOptionEl&&(this.createOptionEl.remove(),this.createOptionEl=null)}handleCreateOptionSelected(e){if(!e.hasAttribute("data-create-option"))return!1;let t=this.createOptionEl?.value||this.inputValue.trim(),o=new Fd({inputValue:t});if(this.dispatchEvent(o),o.defaultPrevented)return this.removeCreateOption(),!0;this.removeCreateOption();let i=document.createElement("wa-option");return i.value=t,i.textContent=t,this.prepend(i),this.cachedOptions=null,this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?(this.toggleOptionSelection(i,!0),this.inputValue="",this.updateFilteredOptions(),this.setCurrentOption(i)):(this.setSelectedOptions(i),this.inputValue=t),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.comboboxInput.focus({preventScroll:!0})),!0}getVisibleOptions(){return!!this.inputValue&&this.hasInputSinceOpening?this.filteredOptions.filter(t=>!t.disabled):this.getAllOptions().filter(t=>!t.disabled)}getFirstVisibleOption(){return this.getVisibleOptions()[0]}updateFilteredOptions({skipCreateOption:e=!1}={}){let t=this.getAllOptions(),o=!!this.inputValue&&this.hasInputSinceOpening;if(this.querySelectorAll(":scope > :not(wa-option)").forEach(r=>{r.hidden=o}),!o){this.filteredOptions=t,t.forEach(r=>{r.hidden=!1}),e||this.updateCreateOption(),this.createOptionEl&&!this.createOptionEl.hidden&&this.filteredOptions.unshift(this.createOptionEl);return}let i=this.inputValue.toLowerCase();this.filteredOptions=t.filter(r=>{if(r.hasAttribute("data-create-option"))return!1;let n;return this.filter?n=this.filter(r,this.inputValue):n=r.label.toLowerCase().includes(i),r.hidden=!n,n}),this.querySelectorAll(":scope > :not(wa-option):not(wa-divider)").forEach(r=>{let n=!1,a=r.nextElementSibling;for(;a&&!(!a.matches("wa-option")&&!a.matches("wa-divider"));){if(a.matches("wa-option")&&!a.hidden){n=!0;break}a=a.nextElementSibling}r.hidden=!n}),this.querySelectorAll(":scope > wa-divider").forEach(r=>{let n=!1,a=!1,s=r.previousElementSibling;for(;s;){if(s.matches("wa-option")&&!s.hidden){n=!0;break}s=s.previousElementSibling}for(s=r.nextElementSibling;s;){if(s.matches("wa-option")&&!s.hidden){a=!0;break}s=s.nextElementSibling}r.hidden=!n||!a}),e||this.updateCreateOption(),this.createOptionEl&&!this.createOptionEl.hidden&&this.filteredOptions.unshift(this.createOptionEl)}setCurrentOption(e){this.getAllOptions().forEach(o=>{o.current=!1,o.tabIndex=-1}),e?(this.currentOption=e,e.current=!0,e.tabIndex=0,e.id&&this.comboboxInput?.setAttribute("aria-activedescendant",e.id),Lt(e,this.listbox,"vertical","auto")):this.comboboxInput?.removeAttribute("aria-activedescendant")}setSelectedOptions(e){let t=this.getAllOptions(),o=Array.isArray(e)?e:[e];t.forEach(i=>{o.includes(i)||(i.selected=!1)}),o.length&&o.forEach(i=>i.selected=!0),this.selectionChanged()}toggleOptionSelection(e,t){t===!0||t===!1?e.selected=t:e.selected=!e.selected,this.selectionChanged()}announceOption(e){if(this.liveRegion){let t=this.getVisibleOptions().indexOf(e)+1,o=this.getVisibleOptions().length;this.liveRegion.textContent=`${e.label}, ${t} of ${o}`}}announceFilterResults(){if(this.liveRegion){let e=this.getVisibleOptions().length;e===0?this.liveRegion.textContent=this.localize.term("numOptionsSelected",0)||"No options available":this.liveRegion.textContent=`${e} option${e===1?"":"s"} available`}}selectionChanged(){let t=this.getAllOptions().filter(a=>{if(!this.hasInteracted&&!this.valueHasChanged){let s=this.defaultValue,c=Array.isArray(s)?s:[s];return a.hasAttribute("selected")||a.defaultSelected||a.selected||c?.includes(a.value)}return a.selected}),o=new Set(t.map(a=>a.value));for(let a of this.selectionOrder.keys())o.has(a)||this.selectionOrder.delete(a);let r=(this.selectionOrder.size>0?Math.max(...this.selectionOrder.values()):-1)+1;for(let a of t)this.selectionOrder.has(a.value)||this.selectionOrder.set(a.value,r++);this.selectedOptions=t.sort((a,s)=>{let c=this.selectionOrder.get(a.value)??0,d=this.selectionOrder.get(s.value)??0;return c-d});let n=new Set(this.selectedOptions.map(a=>a.value));if(n.size>0||this._value){let a=this._value;if(this._value==null){let s=this.defaultValue??[];this._value=Array.isArray(s)?s:[s]}this._value=this._value?.filter(s=>!this.optionValues?.has(s))??null,this._value?.unshift(...n),this.requestUpdate("value",a)}if(!this.multiple&&this.selectedOptions.length>0){let a=this.comboboxInput&&this.matches(":focus-within");(!this.hasInteracted||!this.inputValue&&!a)&&(this.inputValue=this.selectedOptions[0].label)}this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((e,t)=>{if(t<this.maxOptionsVisible||this.maxOptionsVisible<=0){let o=this.getTag(e,t);return o?typeof o=="string"?Xt(o):o:null}else if(t===this.maxOptionsVisible)return b`
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
            >+${this.selectedOptions.length-t}</wa-tag
          >
        `;return null})}updated(e){super.updated(e),(e.has("value")||e.has("inputValue"))&&this.customStates.set("blank",!this.value&&!this.inputValue),e.has("disabled")&&this.customStates.set("disabled",this.disabled)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){let e=this.getAllOptions(),t=Array.isArray(this.value)?this.value:[this.value],o=e.filter(i=>t.includes(i.value));this.setSelectedOptions(o),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.hasInputSinceOpening=!1,this.setCurrentOption(this.selectedOptions[0]||this.getFirstVisibleOption()),this.updateFilteredOptions();let e=new Te;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await se(this.popup.popup,"show"),this.currentOption&&Lt(this.currentOption,this.listbox,"vertical","auto"),this.announceFilterResults(),this.dispatchEvent(new Ve)}else{let e=new Le;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0;return}this.removeOpenListeners(),await se(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.comboboxInput?.removeAttribute("aria-activedescendant"),this.removeCreateOption(),this.dispatchEvent(new Pe)}}async show(){if(this.open||this.disabled){this.open=!1;return}if(!(this.getVisibleOptions().length===0&&!(this.allowCreate&&this.inputValue.trim())))return this.open=!0,Ee(this,"wa-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,Ee(this,"wa-after-hide")}focus(e){this.comboboxInput.focus(e)}blur(){this.comboboxInput.blur()}formResetCallback(){this.selectionOrder.clear(),this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),!this.multiple&&this.selectedOptions.length>0?this.inputValue=this.selectedOptions[0].label:this.inputValue="",this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){let e=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,t=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,o=this.label?!0:!!e,i=this.hint?!0:!!t,r=(this.hasUpdated||!1)&&this.withClear&&!this.disabled&&(this.value&&(Array.isArray(this.value)?this.value.length>0:!0)||this.inputValue);return b`
      <div
        part="form-control"
        class=${T({"form-control":!0,"form-control-has-label":o})}
      >
        <label
          id="label"
          part="form-control-label label"
          class=${T({label:!0,"has-label":o})}
          aria-hidden=${o?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${T({"combobox-popup":!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple})}
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

              ${this.multiple&&this.hasUpdated?b`
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
                        autocapitalize=${z(this.autocapitalize)}
                        autocorrect=${this.autocorrect?"on":"off"}
                        spellcheck=${this.spellcheck}
                        inputmode=${z(this.inputmode)}
                        enterkeyhint=${z(this.enterkeyhint)}
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
                  `:b`
                    <input
                      part="combobox-input"
                      class="combobox-input"
                      type="text"
                      placeholder=${this.placeholder}
                      .disabled=${this.disabled}
                      .value=${this.inputValue}
                      ?required=${this.required}
                      autocomplete="off"
                      autocapitalize=${z(this.autocapitalize)}
                      autocorrect=${this.autocorrect?"on":"off"}
                      spellcheck=${this.spellcheck}
                      inputmode=${z(this.inputmode)}
                      enterkeyhint=${z(this.enterkeyhint)}
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

              ${r?b`
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
                  `:k}

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
          class=${T({"has-slotted":i})}
          aria-hidden=${i?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};W.css=[Dd,ye,oe];l([_(".combobox-popup")],W.prototype,"popup",2);l([_(".combobox")],W.prototype,"combobox",2);l([_(".combobox-input")],W.prototype,"comboboxInput",2);l([_(".value-input")],W.prototype,"valueInput",2);l([_(".listbox")],W.prototype,"listbox",2);l([_(".live-region")],W.prototype,"liveRegion",2);l([I()],W.prototype,"currentOption",2);l([I()],W.prototype,"selectedOptions",2);l([I()],W.prototype,"filteredOptions",2);l([I()],W.prototype,"inputValue",2);l([u({reflect:!0})],W.prototype,"name",2);l([u({attribute:!1})],W.prototype,"defaultValue",1);l([u({attribute:"value",reflect:!1})],W.prototype,"value",1);l([u({reflect:!0})],W.prototype,"size",2);l([S("size")],W.prototype,"handleSizeChange",1);l([u()],W.prototype,"placeholder",2);l([u({type:Boolean,reflect:!0})],W.prototype,"multiple",2);l([u({attribute:"max-options-visible",type:Number})],W.prototype,"maxOptionsVisible",2);l([u({type:Boolean})],W.prototype,"disabled",2);l([u({attribute:"with-clear",type:Boolean})],W.prototype,"withClear",2);l([u({type:Boolean,reflect:!0})],W.prototype,"open",2);l([u({reflect:!0})],W.prototype,"appearance",2);l([u({type:Boolean,reflect:!0})],W.prototype,"pill",2);l([u()],W.prototype,"label",2);l([u({reflect:!0})],W.prototype,"placement",2);l([u({attribute:"hint"})],W.prototype,"hint",2);l([u({attribute:"with-label",type:Boolean})],W.prototype,"withLabel",2);l([u({attribute:"with-hint",type:Boolean})],W.prototype,"withHint",2);l([u({type:Boolean,reflect:!0})],W.prototype,"required",2);l([u({attribute:"allow-custom-value",type:Boolean})],W.prototype,"allowCustomValue",2);l([u({attribute:"allow-create",type:Boolean})],W.prototype,"allowCreate",2);l([u({attribute:!1})],W.prototype,"filter",2);l([u()],W.prototype,"autocapitalize",2);l([u({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="off"),toAttribute:e=>e?"on":"off"}})],W.prototype,"autocorrect",2);l([u()],W.prototype,"inputmode",2);l([u()],W.prototype,"enterkeyhint",2);l([u({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="false"),toAttribute:e=>e?"true":"false"}})],W.prototype,"spellcheck",2);l([u({attribute:!1})],W.prototype,"getTag",2);l([S("disabled",{waitUntilFirstUpdate:!0})],W.prototype,"handleDisabledChange",1);l([S("value",{waitUntilFirstUpdate:!0})],W.prototype,"handleValueChange",1);l([S("open",{waitUntilFirstUpdate:!0})],W.prototype,"handleOpenChange",1);W=l([F("wa-combobox")],W);var $d=E`
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

    /* Inset box-shadow, not a border: Safari seams a clip-path edge that runs along a border. */
    &::part(arrow) {
      box-shadow: inset calc(-1 * var(--wa-tooltip-border-width)) calc(-1 * var(--wa-tooltip-border-width)) 0 0
        var(--wa-tooltip-border-color);
    }
  }
`;var fe=class extends V{constructor(){super(...arguments),this.dismissedByPress=!1,this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.dismissedByPress=!1,this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{if(this.hasTrigger("click")){this.open?this.hide():this.show();return}this.hasTrigger("manual")||this.lightDismiss()},this.handleFocus=()=>{this.dismissedByPress||this.hasTrigger("focus")&&this.show()},this.handleMouseDown=()=>{this.hasTrigger("click")||this.hasTrigger("manual")||this.lightDismiss()},this.handleDocumentKeyDown=e=>{this.hasTrigger("manual")||e.key==="Escape"&&this.open&&Be(this)&&(e.preventDefault(),e.stopPropagation(),this.hide())},this.handleDocumentClick=e=>{this.hasTrigger("manual")||this.anchor&&e.composedPath().includes(this.anchor)||this.hide()},this.handleMouseOver=()=>{this.dismissedByPress||this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=e=>{let t=e.relatedTarget,o=!!(t&&this.anchor?.contains(t)),i=!!(t&&this.contains(t));o||i||(this.dismissedByPress=!1,this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>{this.hide()},this.hideDelay)))}}connectedCallback(){super.connectedCallback(),typeof document<"u"&&(this.eventController.signal.aborted&&(this.eventController=new AbortController),this.addEventListener("mouseout",this.handleMouseOut),this.dismissedByPress=!1,this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=to("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange())}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("click",this.handleDocumentClick),ze(this),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(e){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition()),super.firstUpdated(e)}lightDismiss(){clearTimeout(this.hoverTimeout),this.dismissedByPress=!0,this.hide()}hasTrigger(e){return this.trigger.split(" ").includes(e)}addToAriaLabelledBy(e,t){let i=(e.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);i.includes(t)||(i.push(t),e.setAttribute("aria-labelledby",i.join(" ")))}removeFromAriaLabelledBy(e,t){let r=(e.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(n=>n!==t);r.length>0?e.setAttribute("aria-labelledby",r.join(" ")):e.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;let e=new Te;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.hasTrigger("manual")||(document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),document.addEventListener("click",this.handleDocumentClick,{signal:this.eventController.signal}),Ue(this)),this.body.hidden=!1,this.popup.active=!0,await se(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new Ve)}else{let e=new Le;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("click",this.handleDocumentClick),ze(this),await se(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new Pe)}}handleForChange(){let e=this.getRootNode?.();if(!e)return;let t=this.for?e.getElementById?.(this.for):null,o=this.anchor;if(t===o)return;this.dismissedByPress=!1;let{signal:i}=this.eventController;t&&(this.addToAriaLabelledBy(t,this.id),t.addEventListener("blur",this.handleBlur,{capture:!0,signal:i}),t.addEventListener("focus",this.handleFocus,{capture:!0,signal:i}),t.addEventListener("click",this.handleClick,{signal:i}),t.addEventListener("mousedown",this.handleMouseDown,{signal:i}),t.addEventListener("mouseover",this.handleMouseOver,{signal:i}),t.addEventListener("mouseout",this.handleMouseOut,{signal:i})),o&&(this.removeFromAriaLabelledBy(o,this.id),o.removeEventListener("blur",this.handleBlur,{capture:!0}),o.removeEventListener("focus",this.handleFocus,{capture:!0}),o.removeEventListener("click",this.handleClick),o.removeEventListener("mousedown",this.handleMouseDown),o.removeEventListener("mouseover",this.handleMouseOver),o.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=t}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,Ee(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,Ee(this,"wa-after-hide")}render(){return b`
      <wa-popup
        part="base tooltip"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${T({tooltip:!0,"tooltip-open":this.open})}
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
    `}};fe.css=$d;fe.dependencies={"wa-popup":ne};l([_("slot:not([name])")],fe.prototype,"defaultSlot",2);l([_(".body")],fe.prototype,"body",2);l([_("wa-popup")],fe.prototype,"popup",2);l([u()],fe.prototype,"placement",2);l([u({type:Boolean,reflect:!0})],fe.prototype,"disabled",2);l([u({type:Number})],fe.prototype,"distance",2);l([u({type:Boolean,reflect:!0})],fe.prototype,"open",2);l([u({type:Number})],fe.prototype,"skidding",2);l([u({attribute:"show-delay",type:Number})],fe.prototype,"showDelay",2);l([u({attribute:"hide-delay",type:Number})],fe.prototype,"hideDelay",2);l([u()],fe.prototype,"trigger",2);l([u({attribute:"without-arrow",type:Boolean,reflect:!0})],fe.prototype,"withoutArrow",2);l([u()],fe.prototype,"for",2);l([I()],fe.prototype,"anchor",2);l([S("open",{waitUntilFirstUpdate:!0})],fe.prototype,"handleOpenChange",1);l([S("for")],fe.prototype,"handleForChange",1);l([S(["distance","placement","skidding"])],fe.prototype,"handleOptionsChange",1);l([S("disabled")],fe.prototype,"handleDisabledChange",1);fe=l([F("wa-tooltip")],fe);var Md=E`
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

  :host([did-ssr]:not(:defined)) .switch {
    transition-property: unset;
    transition-duration: unset;
    transition-timing-function: unset;
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
  .switch .thumb:dir(rtl) {
    translate: calc((var(--width) - var(--height)) / 2);
  }

  .input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Focus */
  label:not(.disabled) .input:focus-visible ~ [part~='control'] {
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
  .checked .switch .thumb:dir(rtl) {
    translate: calc((var(--width) - var(--height)) / -2);
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
`;var De=class extends G{constructor(){super(...arguments),this.hasSlotController=new ce(this,"hint"),this.localize=new N(this),this.title="",this.name=null,this._value=this.getAttribute("value")??null,this.size="m",this.disabled=!1,this._checked=null,this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint="",this.withHint=!1}static get validators(){return[...super.validators,Ct()]}get value(){return this._value??"on"}set value(e){this._value=e}handleSizeChange(){te(this.localName,this.size)}get checked(){return this.valueHasChanged?!!this._checked:this._checked??this.defaultChecked}set checked(e){this._checked=!!e,this.valueHasChanged=!0}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleKeyDown(e){let t=this.localize.dir()==="rtl";e.key==="ArrowLeft"&&(e.preventDefault(),this.checked=t,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})),e.key==="ArrowRight"&&(e.preventDefault(),this.checked=!t,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}willUpdate(e){super.willUpdate(e),(e.has("value")||e.has("checked")||e.has("defaultChecked")||e.has("disabled"))&&this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){if(this.didSSR&&!this.hasUpdated){this.updateComplete.then(()=>{this.handleValueOrCheckedChange()});return}this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked),this.customStates.set("checked",this.checked),this.updateValidity()}handleDisabledChange(){this.updateValidity()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}setValue(e,t){if(!this.checked){this.internals.setFormValue(null,null);return}this.internals.setFormValue(e??"on",t)}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}render(){let e=this.hasSlotController.test("hint","withHint"),t=this.hint?!0:!!e,o=this.didSSR&&!this.hasUpdated?this.checked:this.defaultChecked,i=this.didSSR&&!this.hasUpdated?null:ot(this.checked);return b`
      <label
        part="base switch"
        class=${T({checked:this.checked,disabled:this.disabled})}
      >
        <input
          class="input"
          type="checkbox"
          title=${this.title}
          name=${z(this.name)}
          value=${z(this.value)}
          .checked=${z(i)}
          ?checked=${o}
          ?disabled=${this.disabled}
          ?required=${this.required}
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
        class=${T({"has-slotted":t})}
        aria-hidden=${t?"false":"true"}
        >${this.hint}</slot
      >
    `}};De.shadowRootOptions={...G.shadowRootOptions,delegatesFocus:!0};De.css=[ye,oe,Md];l([_('input[type="checkbox"]')],De.prototype,"input",2);l([u()],De.prototype,"title",2);l([u({reflect:!0})],De.prototype,"name",2);l([u({reflect:!0})],De.prototype,"value",1);l([u({reflect:!0})],De.prototype,"size",2);l([S("size")],De.prototype,"handleSizeChange",1);l([u({type:Boolean})],De.prototype,"disabled",2);l([u({type:Boolean,attribute:!1})],De.prototype,"checked",1);l([u({type:Boolean,attribute:"checked",reflect:!0})],De.prototype,"defaultChecked",2);l([u({type:Boolean,reflect:!0})],De.prototype,"required",2);l([u({attribute:"hint"})],De.prototype,"hint",2);l([u({attribute:"with-hint",type:Boolean})],De.prototype,"withHint",2);l([S(["checked","defaultChecked"])],De.prototype,"handleStateChange",1);l([S("disabled",{waitUntilFirstUpdate:!0})],De.prototype,"handleDisabledChange",1);De=l([F("wa-switch")],De);De.disableWarning?.("change-in-update");var Od=E`
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

    min-width: 1.25em; /* <-- this is what Safari respects for intrinsic */
    min-height: 1em;
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

  /* Prevents vertical space when icons with vertical-align are slotted in - https://github.com/shoelace-style/webawesome/issues/2280 */
  [part='start'],
  [part='end'] {
    line-height: 0;
  }

  slot[name='start']::slotted(*) {
    margin-inline-end: 0.375em;
  }

  slot[name='end']::slotted(*) {
    margin-inline-start: 0.375em;
  }
`;var no=class extends V{constructor(){super(...arguments),this.variant="brand",this.appearance="accent",this.pill=!1,this.attention="none"}render(){return b`
      <span part="start">
        <slot name="start"></slot>
      </span>

      <span part="base badge" role="status">
        <slot></slot>
      </span>

      <span part="end">
        <slot name="end"></slot>
      </span>
    `}};no.css=[Zt,Od];l([u({reflect:!0})],no.prototype,"variant",2);l([u({reflect:!0})],no.prototype,"appearance",2);l([u({type:Boolean,reflect:!0})],no.prototype,"pill",2);l([u({reflect:!0})],no.prototype,"attention",2);no=l([F("wa-badge")],no);var Td=class extends Event{constructor(e){super("wa-tab-hide",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Ld=class extends Event{constructor(e){super("wa-tab-show",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Pd=E`
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
`;var et=class extends V{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new N(this),this.hasScrollControls=!1,this.active="",this.placement="top",this.activation="auto",this.withoutScrollControls=!1}connectedCallback(){super.connectedCallback(),!!1&&(this.resizeObserver=new ResizeObserver(()=>{this.updateScrollControls()}),this.mutationObserver=new MutationObserver(e=>{e.some(o=>!["aria-labelledby","aria-controls"].includes(o.attributeName))&&setTimeout(()=>this.setAriaLabels());let t=e.filter(o=>o.target.closest("wa-tab-group")===this);if(t.some(o=>o.attributeName==="disabled"))this.syncTabsAndPanels();else if(t.some(o=>o.attributeName==="active")){let i=t.filter(r=>r.attributeName==="active"&&r.target.tagName.toLowerCase()==="wa-tab").map(r=>r.target).find(r=>r.active);i&&i.closest("wa-tab-group")===this&&this.setActiveTab(i)}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),new IntersectionObserver((t,o)=>{if(t[0].intersectionRatio>0){if(this.setAriaLabels(),this.active){let i=this.tabs.find(r=>r.panel===this.active);i&&this.setActiveTab(i)}else this.setActiveTab(this.getActiveTab()??this.tabs[0],{emitEvents:!1});o.unobserve(t[0].target)}}).observe(this.tabGroup)}))}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect(),this.nav&&this.resizeObserver?.unobserve(this.nav)}getAllTabs(){return[...this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()].filter(t=>t.tagName.toLowerCase()==="wa-tab")}getAllPanels(){return[...this.defaultSlot.assignedElements()].filter(e=>e.tagName.toLowerCase()==="wa-tab-panel")}getActiveTab(){return this.tabs.find(e=>e.active)}handleClick(e){let o=e.target.closest("wa-tab");o?.closest("wa-tab-group")===this&&o!==null&&this.setActiveTab(o,{scrollBehavior:"smooth"})}handleKeyDown(e){let o=e.target.closest("wa-tab");if(o?.closest("wa-tab-group")===this){if(["Enter"," "].includes(e.key)){o!==null&&(this.setActiveTab(o,{scrollBehavior:"smooth"}),e.preventDefault());return}if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)){let r=this.tabs.find(s=>s.matches(":focus")),n=this.localize.dir()==="rtl",a=null;if(r?.tagName.toLowerCase()==="wa-tab"){if(e.key==="Home")a=this.focusableTabs[0];else if(e.key==="End")a=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&e.key===(n?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&e.key==="ArrowUp"){let s=this.tabs.findIndex(c=>c===r);a=this.findNextFocusableTab(s,"backward")}else if(["top","bottom"].includes(this.placement)&&e.key===(n?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&e.key==="ArrowDown"){let s=this.tabs.findIndex(c=>c===r);a=this.findNextFocusableTab(s,"forward")}if(!a)return;a.tabIndex=0,a.focus({preventScroll:!0}),this.activation==="auto"?this.setActiveTab(a,{scrollBehavior:"smooth"}):this.tabs.forEach(s=>{s.tabIndex=s===a?0:-1}),["top","bottom"].includes(this.placement)&&Lt(a,this.nav,"horizontal"),e.preventDefault()}}}}findNextFocusableTab(e,t){let o=null,i=t==="forward"?1:-1,r=e+i;for(;e<this.tabs.length;){if(o=this.tabs[r]||null,o===null){t==="forward"?o=this.focusableTabs[0]:o=this.focusableTabs[this.focusableTabs.length-1];break}if(!o.disabled)break;r+=i}return o}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(e,t){if(t={emitEvents:!0,scrollBehavior:"auto",...t},e.closest("wa-tab-group")===this&&e!==this.activeTab&&!e.disabled){let o=this.activeTab;this.active=e.panel,this.activeTab=e,this.tabs.forEach(i=>{i.active=i===this.activeTab,i.tabIndex=i===this.activeTab?0:-1}),this.panels.forEach(i=>i.active=i.name===this.activeTab?.panel),["top","bottom"].includes(this.placement)&&Lt(this.activeTab,this.nav,"horizontal",t.scrollBehavior),t.emitEvents&&(o&&this.dispatchEvent(new Td({name:o.panel})),this.dispatchEvent(new Ld({name:this.activeTab.panel})))}}setAriaLabels(){this.tabs.forEach(e=>{let t=this.panels.find(o=>o.name===e.panel);t&&(e.setAttribute("aria-controls",t.getAttribute("id")),t.setAttribute("aria-labelledby",e.getAttribute("id")))})}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(e=>!e.disabled),this.panels=this.getAllPanels(),this.updateComplete.then(()=>this.updateScrollControls())}updateActiveTab(){let e=this.tabs.find(t=>t.panel===this.active);e&&this.setActiveTab(e,{scrollBehavior:"smooth"})}updateScrollControls(){this.withoutScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1}render(){let e=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return b`
      <div
        part="base tab-group"
        class=${T({"tab-group":!0,"tab-group-top":this.placement==="top","tab-group-bottom":this.placement==="bottom","tab-group-start":this.placement==="start","tab-group-end":this.placement==="end","tab-group-has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="nav-container" part="nav">
          ${this.hasScrollControls?b`
                <wa-button
                  part="scroll-button scroll-button-start"
                  exportparts="base:scroll-button__base"
                  class="scroll-button scroll-button-start"
                  appearance="plain"
                  @click=${this.handleScrollToStart}
                >
                  <wa-icon
                    name=${e?"chevron-right":"chevron-left"}
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

          ${this.hasScrollControls?b`
                <wa-button
                  part="scroll-button scroll-button-end"
                  class="scroll-button scroll-button-end"
                  exportparts="base:scroll-button__base"
                  appearance="plain"
                  @click=${this.handleScrollToEnd}
                >
                  <wa-icon
                    name=${e?"chevron-left":"chevron-right"}
                    library="system"
                    variant="solid"
                    label=${this.localize.term("scrollToEnd")}
                  ></wa-icon>
                </wa-button>
              `:""}
        </div>

        <div part="body" class="body"><slot @slotchange=${this.syncTabsAndPanels}></slot></div>
      </div>
    `}};et.css=Pd;l([_(".tab-group")],et.prototype,"tabGroup",2);l([_(".body slot")],et.prototype,"defaultSlot",2);l([_(".nav")],et.prototype,"nav",2);l([I()],et.prototype,"hasScrollControls",2);l([u({reflect:!0})],et.prototype,"active",2);l([u()],et.prototype,"placement",2);l([u()],et.prototype,"activation",2);l([u({attribute:"without-scroll-controls",type:Boolean})],et.prototype,"withoutScrollControls",2);l([S("active")],et.prototype,"updateActiveTab",1);l([S("withoutScrollControls",{waitUntilFirstUpdate:!0})],et.prototype,"updateScrollControls",1);et=l([F("wa-tab-group")],et);var Vd=E`
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
`;var Pg=0,ao=class extends V{constructor(){super(...arguments),this.attrId=++Pg,this.componentId=`wa-tab-panel-${this.attrId}`,this.name="",this.active=!1,this.role="tabpanel"}connectedCallback(){super.connectedCallback(),this.id=(this.id||"").length>0?this.id:this.componentId}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true")}render(){return b`
      <slot
        part="base"
        class=${T({"tab-panel":!0,"tab-panel-active":this.active})}
      ></slot>
    `}};ao.css=Vd;l([u({reflect:!0})],ao.prototype,"name",2);l([u({type:Boolean,reflect:!0})],ao.prototype,"active",2);l([u({reflect:!0})],ao.prototype,"role",2);l([S("active")],ao.prototype,"handleActiveChange",1);ao=l([F("wa-tab-panel")],ao);var Bd=E`
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
`;var Vg=0,rt=class extends V{constructor(){super(...arguments),this.attrId=++Vg,this.componentId=`wa-tab-${this.attrId}`,this.panel="",this.active=!1,this.disabled=!1,this.tabIndex=0,this.slot="nav",this.role="tab"}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0}render(){return this.id=this.id?.length>0?this.id:this.componentId,b`
      <div
        part="base tab"
        class=${T({tab:!0,"tab-active":this.active})}
      >
        <slot></slot>
      </div>
    `}};rt.css=Bd;l([_(".tab")],rt.prototype,"tab",2);l([u({reflect:!0})],rt.prototype,"panel",2);l([u({type:Boolean,reflect:!0})],rt.prototype,"active",2);l([u({type:Boolean,reflect:!0})],rt.prototype,"disabled",2);l([u({type:Number,reflect:!0})],rt.prototype,"tabIndex",2);l([u({reflect:!0})],rt.prototype,"slot",2);l([u({reflect:!0})],rt.prototype,"role",2);l([S("active")],rt.prototype,"handleActiveChange",1);l([S("disabled")],rt.prototype,"handleDisabledChange",1);rt=l([F("wa-tab")],rt);var Hd=E`
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

    /* Style disabled textareas */
    &:has(:disabled) {
      cursor: not-allowed;
      opacity: 0.5;
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
    cursor: inherit;
    scroll-padding-block: var(--wa-form-control-padding-block);
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

  /*
   * This element carries the hint part, so the shared form control styles apply to it. Those styles set display:block
   * and hide the element when it has no hint, both of which have to be undone when a character count is present.
   */
  .footer.has-slotted,
  .footer.has-count {
    display: flex;
    align-items: baseline;
    gap: 1em;
  }

  /* Slots default to display:contents, which would leave the hint unable to shrink below its content */
  .footer.has-count .hint {
    display: block;
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
`;var X=class extends G{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new ce(this,"hint","label"),this.localize=new N(this),this.announcedCountText="",this.title="",this.name=null,this._value=null,this.defaultValue=this.getAttribute("value")??"",this.size="m",this.appearance="outlined",this.label="",this.hint="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1,this.withCount=!1,this.lastObservedWidth=0}static get validators(){return[...super.validators,Ct()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(e){this._value!==e&&(this.valueHasChanged=!0,this._value=e)}handleSizeChange(){te(this.localName,this.size)}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{if(this.setTextareaDimensions(),this.updateResizeObserver(),this.didSSR&&this.input&&this.value!==this.input.value){let e=this.input.value;this.value=e}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.countAnnounceTimeout),this.resizeObserver?.disconnect(),this.resizeObserver=void 0}updateFormValue(e){if(e==null){this.setValue("",null);return}super.updateFormValue(e)}updateResizeObserver(){let e=this.resize!=="none";this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=void 0),e&&this.input&&(this.resize==="auto"?(this.resizeObserver=new ResizeObserver(t=>{let o=t[0]?.contentRect.width??0;o!==this.lastObservedWidth&&(this.lastObservedWidth=o,requestAnimationFrame(()=>this.setTextareaDimensions()))}),this.resizeObserver.observe(this)):(this.resizeObserver=new ResizeObserver(()=>this.setTextareaDimensions()),this.resizeObserver.observe(this.input)))}handleBlur(){this.checkValidity()}handleChange(e){this.valueHasChanged=!0,this.value=this.input.value,this.setTextareaDimensions(),this.checkValidity(),this.relayNativeEvent(e,{bubbles:!0,composed:!0})}handleInput(e){this.valueHasChanged=!0,this.value=this.input.value,this.relayNativeEvent(e,{bubbles:!0,composed:!0}),this.scheduleCountAnnouncement()}scheduleCountAnnouncement(){clearTimeout(this.countAnnounceTimeout),this.countAnnounceTimeout=setTimeout(()=>{let e=(this.value??"").length;this.announcedCountText=this.maxlength!=null?this.localize.term("numCharactersRemaining",this.maxlength-e):this.localize.term("numCharacters",e)},1e3)}setTextareaDimensions(){if(this.resize==="none"){this.base.style.width="",this.base.style.height="";return}if(this.resize==="auto"){this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto";let e=this.input.scrollHeight;this.input.style.height=`${e}px`,this.sizeAdjuster.style.height=`${e}px`,this.base.style.width="",this.base.style.height="";return}if(this.input.style.width){let e=Number(this.input.style.width.split(/px/)[0])+2;this.base.style.width=`${e}px`}if(this.input.style.height){let e=Number(this.input.style.height.split(/px/)[0])+2;this.base.style.height=`${e}px`}}handleRowsChange(){this.setTextareaDimensions()}async handleValueChange(){await this.updateComplete,this.checkValidity(),this.setTextareaDimensions()}updated(e){e.has("resize")&&(this.setTextareaDimensions(),this.updateResizeObserver()),super.updated(e),e.has("value")&&this.customStates.set("blank",!this.value)}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(e){if(e){typeof e.top=="number"&&(this.input.scrollTop=e.top),typeof e.left=="number"&&(this.input.scrollLeft=e.left);return}return{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(e,t,o="none"){this.input.setSelectionRange(e,t,o)}setRangeText(e,t,o,i="preserve"){let r=t??this.input.selectionStart,n=o??this.input.selectionEnd;this.input.setRangeText(e,r,n,i),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaDimensions())}formResetCallback(){this._value=null,this.input&&(this.input.value=this.value||""),super.formResetCallback()}render(){let e=this.hasSlotController.test("label","withLabel"),t=this.hasSlotController.test("hint","withHint"),o=this.label?!0:!!e,i=this.hint?!0:!!t,r=(this.value??"").length,n=this.maxlength!=null?this.localize.term("numCharactersRemaining",this.maxlength-r):this.localize.term("numCharacters",r);return b`
      <label
        part="form-control-label label"
        class=${T({label:!0,"has-label":o})}
        for="input"
        aria-hidden=${o?"false":"true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base textarea-wrapper" class="textarea">
        <textarea
          part="textarea"
          id="input"
          class="control"
          title=${this.title}
          name=${z(this.name)}
          .value=${ot(this.value)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${z(this.placeholder)}
          rows=${z(this.rows)}
          minlength=${z(this.minlength)}
          maxlength=${z(this.maxlength)}
          autocapitalize=${z(this.autocapitalize)}
          autocorrect=${z(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${z(this.spellcheck)}
          enterkeyhint=${z(this.enterkeyhint)}
          inputmode=${z(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        ></textarea>

        <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
        <div part="textarea-adjuster" class="size-adjuster" ?hidden=${this.resize!=="auto"}></div>
      </div>

      <div
        part="hint"
        class=${T({footer:!0,"has-count":this.withCount,"has-slotted":i})}
      >
        <slot id="hint" name="hint" class="hint" aria-hidden=${i?"false":"true"}>${this.hint}</slot>

        ${this.withCount?b`
              <div part="count" class="count" aria-hidden="true">${n}</div>
              <div class="wa-visually-hidden-force" aria-live="polite">${this.announcedCountText}</div>
            `:""}
      </div>
    `}};X.css=[Hd,ye,oe,Bo];l([I()],X.prototype,"announcedCountText",2);l([_(".control")],X.prototype,"input",2);l([_('[part~="base"]')],X.prototype,"base",2);l([_(".size-adjuster")],X.prototype,"sizeAdjuster",2);l([u()],X.prototype,"title",2);l([u({reflect:!0})],X.prototype,"name",2);l([I()],X.prototype,"value",1);l([u({attribute:"value",reflect:!0})],X.prototype,"defaultValue",2);l([u({reflect:!0})],X.prototype,"size",2);l([S("size")],X.prototype,"handleSizeChange",1);l([u({reflect:!0})],X.prototype,"appearance",2);l([u()],X.prototype,"label",2);l([u({attribute:"hint"})],X.prototype,"hint",2);l([u()],X.prototype,"placeholder",2);l([u({type:Number})],X.prototype,"rows",2);l([u({reflect:!0})],X.prototype,"resize",2);l([u({type:Boolean})],X.prototype,"disabled",2);l([u({type:Boolean,reflect:!0})],X.prototype,"readonly",2);l([u({type:Boolean,reflect:!0})],X.prototype,"required",2);l([u({type:Number})],X.prototype,"minlength",2);l([u({type:Number})],X.prototype,"maxlength",2);l([u()],X.prototype,"autocapitalize",2);l([u({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="off"),toAttribute:e=>e?"on":"off"}})],X.prototype,"autocorrect",2);l([u()],X.prototype,"autocomplete",2);l([u({type:Boolean})],X.prototype,"autofocus",2);l([u()],X.prototype,"enterkeyhint",2);l([u({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="false"),toAttribute:e=>e?"true":"false"}})],X.prototype,"spellcheck",2);l([u()],X.prototype,"inputmode",2);l([u({attribute:"with-label",type:Boolean})],X.prototype,"withLabel",2);l([u({attribute:"with-hint",type:Boolean})],X.prototype,"withHint",2);l([u({attribute:"with-count",type:Boolean,reflect:!0})],X.prototype,"withCount",2);l([S("rows",{waitUntilFirstUpdate:!0})],X.prototype,"handleRowsChange",1);l([S("value",{waitUntilFirstUpdate:!0})],X.prototype,"handleValueChange",1);X=l([F("wa-textarea")],X);X.disableWarning?.("change-in-update");var Nd=E`
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
`;var na=typeof window<"u"&&"ontouchstart"in window,Fi=class{constructor(e,t){this.isActive=!1,this.isDragging=!1,this.handleDragStart=o=>{let i="touches"in o?o.touches[0].clientX:o.clientX,r="touches"in o?o.touches[0].clientY:o.clientY;this.isDragging||!na&&o.buttons>1||(this.isDragging=!0,document.addEventListener("pointerup",this.handleDragStop),document.addEventListener("pointermove",this.handleDragMove),document.addEventListener("pointercancel",this.handleDragStop),document.addEventListener("touchend",this.handleDragStop),document.addEventListener("touchmove",this.handleDragMove),document.addEventListener("touchcancel",this.handleDragStop),this.options.start(i,r))},this.handleDragStop=o=>{let i="changedTouches"in o?o.changedTouches[0].clientX:o.clientX,r="changedTouches"in o?o.changedTouches[0].clientY:o.clientY;this.isDragging=!1,document.removeEventListener("pointerup",this.handleDragStop),document.removeEventListener("pointermove",this.handleDragMove),document.removeEventListener("pointercancel",this.handleDragStop),document.removeEventListener("touchend",this.handleDragStop),document.removeEventListener("touchmove",this.handleDragMove),document.removeEventListener("touchcancel",this.handleDragStop),this.options.stop(i,r)},this.handleDragMove=o=>{let i="touches"in o?o.touches[0].clientX:o.clientX,r="touches"in o?o.touches[0].clientY:o.clientY;window.getSelection()?.removeAllRanges(),this.options.move(i,r)},this.element=e,this.options={start:()=>{},stop:()=>{},move:()=>{},...t},this.start()}start(){this.isActive||(this.element.addEventListener("pointerdown",this.handleDragStart),na&&this.element.addEventListener("touchstart",this.handleDragStart),this.isActive=!0)}stop(){document.removeEventListener("pointerup",this.handleDragStop),document.removeEventListener("pointermove",this.handleDragMove),document.removeEventListener("pointercancel",this.handleDragStop),document.removeEventListener("touchend",this.handleDragStop),document.removeEventListener("touchmove",this.handleDragMove),document.removeEventListener("touchcancel",this.handleDragStop),this.element.removeEventListener("pointerdown",this.handleDragStart),na&&this.element.removeEventListener("touchstart",this.handleDragStart),this.isActive=!1,this.isDragging=!1}toggle(e){(e!==void 0?e:!this.isActive)?this.start():this.stop()}};var qd="important",Bg=" !"+qd,Ke=xt(class extends st{constructor(e){if(super(e),e.type!==Ye.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,o)=>{let i=e[o];return i==null?t:t+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(e,[t]){let{style:o}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?o.removeProperty(i):o[i]=null);for(let i in t){let r=t[i];if(r!=null){this.ft.add(i);let n=typeof r=="string"&&r.endsWith(Bg);i.includes("-")||n?o.setProperty(i,n?r.slice(0,-11):r,n?qd:""):o[i]=r}}return Ae}});function aa(e,t,o){let i=(e-t)/o;return Math.abs(i-Math.round(i))>1e-9}var Hg=()=>({observedAttributes:["min","max","step"],checkValidity(e){let t={message:"",isValid:!0,invalidKeys:[]},o=(i,r,n,a)=>{if(typeof document>"u")return"";let s=document.createElement("input");return s.type="range",s.min=String(r),s.max=String(n),s.step=String(a),s.value=String(i),s.checkValidity(),s.validationMessage};if(e.isRange){let i=e.minValue,r=e.maxValue;if(i<e.min)return t.isValid=!1,t.invalidKeys.push("rangeUnderflow"),t.message=o(i,e.min,e.max,e.step)||`Value must be greater than or equal to ${e.min}.`,t;if(r>e.max)return t.isValid=!1,t.invalidKeys.push("rangeOverflow"),t.message=o(r,e.min,e.max,e.step)||`Value must be less than or equal to ${e.max}.`,t;if(e.step&&e.step!==1){let n=aa(i,e.min,e.step),a=aa(r,e.min,e.step);if(n||a){t.isValid=!1,t.invalidKeys.push("stepMismatch");let s=n?i:r;return t.message=o(s,e.min,e.max,e.step)||`Value must be a multiple of ${e.step}.`,t}}}else{let i=e.value;if(i<e.min)return t.isValid=!1,t.invalidKeys.push("rangeUnderflow"),t.message=o(i,e.min,e.max,e.step)||`Value must be greater than or equal to ${e.min}.`,t;if(i>e.max)return t.isValid=!1,t.invalidKeys.push("rangeOverflow"),t.message=o(i,e.min,e.max,e.step)||`Value must be less than or equal to ${e.max}.`,t;if(e.step&&e.step!==1&&aa(i,e.min,e.step))return t.isValid=!1,t.invalidKeys.push("stepMismatch"),t.message=o(i,e.min,e.max,e.step)||`Value must be a multiple of ${e.step}.`,t}return t}}),J=class extends G{constructor(){super(...arguments),this.draggableThumbMin=null,this.draggableThumbMax=null,this.hasSlotController=new ce(this,"hint","label"),this.localize=new N(this),this.activeThumb=null,this.lastTrackPosition=null,this.label="",this.hint="",this.minValue=0,this.maxValue=50,this.defaultValue=this.getAttribute("value")==null?this.minValue:Number(this.getAttribute("value")),this._value=null,this.range=!1,this.disabled=!1,this.readonly=!1,this.orientation="horizontal",this.size="m",this.min=0,this.max=100,this.step=1,this.tooltipDistance=8,this.tooltipPlacement="top",this.withMarkers=!1,this.withTooltip=!1,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,Hg()]}get focusableAnchor(){return this.isRange?this.thumbMin||this.slider:this.slider}get validationTarget(){return this.focusableAnchor}get value(){if(this.valueHasChanged){let t=this._value??this.minValue??0;return Ne(t,this.min,this.max)}let e=this._value??this.defaultValue;return Ne(e,this.min,this.max)}set value(e){e=Number(e)??this.minValue,this._value!==e&&(this.valueHasChanged=!0,this._value=e)}get isRange(){return this.range}handleSizeChange(){te(this.localName,this.size)}firstUpdated(e){super.firstUpdated(e),this.isRange?(this.draggableThumbMin=new Fi(this.thumbMin,{start:()=>{this.activeThumb="min",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.minValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(t,o)=>{this.setThumbValueFromCoordinates(t,o,"min")},stop:()=>{this.minValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableThumbMax=new Fi(this.thumbMax,{start:()=>{this.activeThumb="max",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.maxValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(t,o)=>{this.setThumbValueFromCoordinates(t,o,"max")},stop:()=>{this.maxValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableTrack=new Fi(this.track,{start:(t,o)=>{if(this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.activeThumb)this.valueWhenDraggingStarted=this.activeThumb==="min"?this.minValue:this.maxValue;else{let i=this.getValueFromCoordinates(t,o),r=Math.abs(i-this.minValue),n=Math.abs(i-this.maxValue);if(r===n)if(i>this.maxValue)this.activeThumb="max";else if(i<this.minValue)this.activeThumb="min";else{let a=this.localize.dir()==="rtl",s=this.orientation==="vertical",c=s?o:t,d=this.lastTrackPosition||c;this.lastTrackPosition=c;let h=c>d!==a&&!s||c<d&&s;this.activeThumb=h?"max":"min"}else this.activeThumb=r<=n?"min":"max";this.valueWhenDraggingStarted=this.activeThumb==="min"?this.minValue:this.maxValue}this.customStates.set("dragging",!0),this.setThumbValueFromCoordinates(t,o,this.activeThumb),this.showRangeTooltips()},move:(t,o)=>{this.activeThumb&&this.setThumbValueFromCoordinates(t,o,this.activeThumb)},stop:()=>{this.activeThumb&&(this.activeThumb==="min"?this.minValue:this.maxValue)!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}})):this.draggableTrack=new Fi(this.slider,{start:(t,o)=>{this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.value,this.customStates.set("dragging",!0),this.setValueFromCoordinates(t,o),this.showTooltip()},move:(t,o)=>{this.setValueFromCoordinates(t,o)},stop:()=>{this.value!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideTooltip(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0}})}willUpdate(e){this.isRange&&(e.has("minValue")||e.has("maxValue")||e.has("min")||e.has("max"))&&(this.minValue=Ne(this.minValue,this.min,this.maxValue),this.maxValue=Ne(this.maxValue,this.minValue,this.max)),super.willUpdate(e)}updated(e){if(this.isRange&&(e.has("minValue")||e.has("maxValue"))&&this.updateFormValue(),e.has("disabled")||e.has("readonly")){let t=!(this.disabled||this.readonly);this.isRange&&(this.draggableThumbMin&&this.draggableThumbMin.toggle(t),this.draggableThumbMax&&this.draggableThumbMax.toggle(t)),this.draggableTrack&&this.draggableTrack.toggle(t)}super.updated(e)}formDisabledCallback(e){this.disabled=e}formResetCallback(){this.isRange?(this.minValue=parseFloat(this.getAttribute("min-value")??String(this.min)),this.maxValue=parseFloat(this.getAttribute("max-value")??String(this.max))):(this._value=null,this.defaultValue=this.defaultValue??parseFloat(this.getAttribute("value")??String(this.min))),this.valueHasChanged=!1,this.hasInteracted=!1,super.formResetCallback()}clampAndRoundToStep(e){let t=(String(this.step).split(".")[1]||"").replace(/0+$/g,"").length,o=Number(this.step),i=Number(this.min),r=Number(this.max);return e=Math.round(e/o)*o,e=Ne(e,i,r),parseFloat(e.toFixed(t))}getPercentageFromValue(e){return(e-this.min)/(this.max-this.min)*100}getValueFromCoordinates(e,t){let o=this.localize.dir()==="rtl",i=this.orientation==="vertical",{top:r,right:n,bottom:a,left:s,height:c,width:d}=this.trackBoundingClientRect,h=i?t:e,m=i?{start:r,end:a,size:c}:{start:s,end:n,size:d},f=(i||o?m.end-h:h-m.start)/m.size;return this.clampAndRoundToStep(this.min+(this.max-this.min)*f)}handleBlur(){this.isRange?requestAnimationFrame(()=>{let e=this.shadowRoot?.activeElement;e===this.thumbMin||e===this.thumbMax||this.hideRangeTooltips()}):this.hideTooltip(),this.customStates.set("focused",!1),this.dispatchEvent(new FocusEvent("blur",{bubbles:!0,composed:!0}))}handleFocus(e){let t=e.target;this.isRange?(t===this.thumbMin?this.activeThumb="min":t===this.thumbMax&&(this.activeThumb="max"),this.showRangeTooltips()):this.showTooltip(),this.customStates.set("focused",!0),this.dispatchEvent(new FocusEvent("focus",{bubbles:!0,composed:!0}))}handleKeyDown(e){let t=this.localize.dir()==="rtl",o=e.target;if(this.disabled||this.readonly||this.isRange&&(o===this.thumbMin?this.activeThumb="min":o===this.thumbMax&&(this.activeThumb="max"),!this.activeThumb))return;let i=this.isRange?this.activeThumb==="min"?this.minValue:this.maxValue:this.value,r=i;switch(e.key){case"ArrowUp":case(t?"ArrowLeft":"ArrowRight"):e.preventDefault(),r=this.clampAndRoundToStep(i+this.step);break;case"ArrowDown":case(t?"ArrowRight":"ArrowLeft"):e.preventDefault(),r=this.clampAndRoundToStep(i-this.step);break;case"Home":e.preventDefault(),r=this.isRange&&this.activeThumb==="min"?this.min:this.isRange?this.minValue:this.min;break;case"End":e.preventDefault(),r=this.isRange&&this.activeThumb==="max"?this.max:this.isRange?this.maxValue:this.max;break;case"PageUp":e.preventDefault();let n=Math.max(i+(this.max-this.min)/10,i+this.step);r=this.clampAndRoundToStep(n);break;case"PageDown":e.preventDefault();let a=Math.min(i-(this.max-this.min)/10,i-this.step);r=this.clampAndRoundToStep(a);break;case"Enter":jo(e,this);return}r!==i&&(this.isRange?(this.activeThumb==="min"?r>this.maxValue?(this.maxValue=r,this.minValue=r):this.minValue=Math.max(this.min,r):r<this.minValue?(this.minValue=r,this.maxValue=r):this.maxValue=Math.min(this.max,r),this.updateFormValue()):this.value=Ne(r,this.min,this.max),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0)}handleLabelPointerDown(e){e.preventDefault(),this.disabled||(this.isRange?this.thumbMin?.focus():this.slider.focus())}setValueFromCoordinates(e,t){let o=this.value;this.value=this.getValueFromCoordinates(e,t),this.value!==o&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})}setThumbValueFromCoordinates(e,t,o){let i=this.getValueFromCoordinates(e,t),r=o==="min"?this.minValue:this.maxValue;o==="min"?i>this.maxValue?(this.maxValue=i,this.minValue=i):this.minValue=Math.max(this.min,i):i<this.minValue?(this.minValue=i,this.maxValue=i):this.maxValue=Math.min(this.max,i),r!==(o==="min"?this.minValue:this.maxValue)&&(this.updateFormValue(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}showTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!0)}hideTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!1)}showRangeTooltips(){if(!this.withTooltip)return;let e=this.shadowRoot?.getElementById("tooltip-thumb-min"),t=this.shadowRoot?.getElementById("tooltip-thumb-max");this.activeThumb==="min"?(e&&(e.open=!0),t&&(t.open=!1)):this.activeThumb==="max"&&(t&&(t.open=!0),e&&(e.open=!1))}hideRangeTooltips(){if(!this.withTooltip)return;let e=this.shadowRoot?.getElementById("tooltip-thumb-min"),t=this.shadowRoot?.getElementById("tooltip-thumb-max");e&&(e.open=!1),t&&(t.open=!1)}updateFormValue(e){if(this.isRange){let t=new FormData;t.append(this.name||"",String(this.minValue)),t.append(this.name||"",String(this.maxValue)),this.setValue(t,t);return}super.updateFormValue(e)}focus(){this.isRange?this.thumbMin?.focus():this.slider.focus()}blur(){if(this.isRange){for(let e of Ko())if(e===this.thumbMin){this.thumbMin.blur();break}else if(e===this.thumbMax){this.thumbMax.blur();break}}else this.slider.blur()}stepDown(){if(this.isRange){let e=this.clampAndRoundToStep(this.minValue-this.step);this.minValue=Ne(e,this.min,this.maxValue),this.updateFormValue()}else{let e=this.clampAndRoundToStep(this.value-this.step);this.value=e}}stepUp(){if(this.isRange){let e=this.clampAndRoundToStep(this.maxValue+this.step);this.maxValue=Ne(e,this.minValue,this.max),this.updateFormValue()}else{let e=this.clampAndRoundToStep(this.value+this.step);this.value=e}}render(){let e=this.hasSlotController.test("label","withLabel"),t=this.hasSlotController.test("hint","withHint"),o=this.label?!0:!!e,i=this.hint?!0:!!t,r=this.hasSlotController.test("reference"),n=T({xs:this.size==="xs",s:this.size==="s"||this.size==="small",m:this.size==="m"||this.size==="medium",l:this.size==="l"||this.size==="large",xl:this.size==="xl",small:this.size==="small"||this.size==="s",medium:this.size==="medium"||this.size==="m",large:this.size==="large"||this.size==="l",horizontal:this.orientation==="horizontal",vertical:this.orientation==="vertical",disabled:this.disabled}),a=[];if(this.withMarkers)for(let p=this.min;p<=this.max;p+=this.step)a.push(this.getPercentageFromValue(p));let s=b`
      <label
        id="label"
        part="label"
        for=${this.isRange?"thumb-min":"text-box"}
        class=${T({vh:!o,"has-label":o})}
        @pointerdown=${this.handleLabelPointerDown}
      >
        <slot name="label">${this.label}</slot>
      </label>
    `,c=b`
      <div
        id="hint"
        part="hint"
        class=${T({"has-slotted":i})}
      >
        <slot name="hint">${this.hint}</slot>
      </div>
    `,d=this.withMarkers?b`
          <div id="markers" part="markers">
            ${a.map(p=>b`<span part="marker" class="marker" style=${Ke({"--position":`${p}%`})}></span>`)}
          </div>
        `:"",h=r?b`
          <div id="references" part="references" aria-hidden="true">
            <slot name="reference"></slot>
          </div>
        `:"",m=(p,f)=>this.withTooltip?b`
            <wa-tooltip
              id=${`tooltip${p!=="thumb"?"-"+p:""}`}
              part="tooltip"
              exportparts="
                base:tooltip__base,
                tooltip:tooltip__tooltip,
                body:tooltip__body,
                arrow:tooltip__arrow
              "
              trigger="manual"
              distance=${this.tooltipDistance}
              placement=${this.tooltipPlacement}
              for=${p}
              activation="manual"
              dir=${this.localize.dir()}
            >
              <span aria-hidden="true">
                ${typeof this.valueFormatter=="function"?this.valueFormatter(f):this.localize.number(f)}
              </span>
            </wa-tooltip>
          `:"";if(this.isRange){let p=Ne(this.getPercentageFromValue(this.minValue),0,100),f=Ne(this.getPercentageFromValue(this.maxValue),0,100);return b`
        ${s}

        <div id="slider" part="slider" class=${n}>
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style=${Ke({"--start":`${Math.min(p,f)}%`,"--end":`${Math.max(p,f)}%`})}
            ></div>

            ${d}

            <span
              id="thumb-min"
              part="thumb thumb-min"
              style=${Ke({"--position":`${p}%`})}
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
              style=${Ke({"--position":`${f}%`})}
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

          ${h} ${c}
        </div>

        ${m("thumb-min",this.minValue)} ${m("thumb-max",this.maxValue)}
      `}else{let p=Ne(this.getPercentageFromValue(this.value),0,100),f=Ne(this.getPercentageFromValue(typeof this.indicatorOffset=="number"?this.indicatorOffset:this.min),0,100);return b`
        ${s}

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
              style=${Ke({"--start":`${f}%`,"--end":`${p}%`})}
            ></div>

            ${d}
            <span id="thumb" part="thumb" style=${Ke({"--position":`${p}%`})}></span>
          </div>

          ${h} ${c}
        </div>

        ${m("thumb",this.value)}
      `}}};J.formAssociated=!0;J.observeSlots=!0;J.css=[oe,ye,Nd];l([_("#slider")],J.prototype,"slider",2);l([_("#thumb")],J.prototype,"thumb",2);l([_("#thumb-min")],J.prototype,"thumbMin",2);l([_("#thumb-max")],J.prototype,"thumbMax",2);l([_("#track")],J.prototype,"track",2);l([_("#tooltip")],J.prototype,"tooltip",2);l([u()],J.prototype,"label",2);l([u({attribute:"hint"})],J.prototype,"hint",2);l([u({reflect:!0})],J.prototype,"name",2);l([u({type:Number,attribute:"min-value"})],J.prototype,"minValue",2);l([u({type:Number,attribute:"max-value"})],J.prototype,"maxValue",2);l([u({attribute:"value",reflect:!0,type:Number})],J.prototype,"defaultValue",2);l([I()],J.prototype,"value",1);l([u({type:Boolean,reflect:!0})],J.prototype,"range",2);l([u({type:Boolean})],J.prototype,"disabled",2);l([u({type:Boolean,reflect:!0})],J.prototype,"readonly",2);l([u({reflect:!0})],J.prototype,"orientation",2);l([u({reflect:!0})],J.prototype,"size",2);l([S("size")],J.prototype,"handleSizeChange",1);l([u({attribute:"indicator-offset",type:Number})],J.prototype,"indicatorOffset",2);l([u({type:Number})],J.prototype,"min",2);l([u({type:Number})],J.prototype,"max",2);l([u({type:Number})],J.prototype,"step",2);l([u({type:Boolean})],J.prototype,"autofocus",2);l([u({attribute:"tooltip-distance",type:Number})],J.prototype,"tooltipDistance",2);l([u({attribute:"tooltip-placement",reflect:!0})],J.prototype,"tooltipPlacement",2);l([u({attribute:"with-markers",type:Boolean})],J.prototype,"withMarkers",2);l([u({attribute:"with-tooltip",type:Boolean})],J.prototype,"withTooltip",2);l([u({attribute:"with-label",type:Boolean})],J.prototype,"withLabel",2);l([u({attribute:"with-hint",type:Boolean})],J.prototype,"withHint",2);l([u({attribute:!1})],J.prototype,"valueFormatter",2);J=l([F("wa-slider")],J);var Wd=class extends Event{constructor(e){super("wa-sort-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Ud=class extends Event{constructor(e){super("wa-row-collapse",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var jd=class extends Event{constructor(e){super("wa-row-expand",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Gd=class extends Event{constructor(e){super("wa-row-select",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Kd=class extends Event{constructor(e){super("wa-filter-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Yd=class extends Event{constructor(e){super("wa-data-error",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Xd=class extends Event{constructor(e){super("wa-data-request",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var sa=class extends Event{constructor(e){super("wa-cell-click",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var la=class extends Event{constructor(e){super("wa-cell-contextmenu",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=e}};var Qd=class extends Event{constructor(e){super("wa-column-move",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Di=class extends Event{constructor(e){super("wa-column-pin",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var ca=class extends Event{constructor(e){super("wa-column-resize",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var da=class extends Event{constructor(e){super("wa-column-visibility-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Jo=class extends Event{constructor(e){super("wa-page-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Ng=4,Ii=48,Jd="column-reordering",ua=160,eu=class{constructor(e,t){this.pending=!1,this.startX=0,this.startColumnId="",this.activePointerId=-1,this.settling=!1,this.dragging=!1,this.orderedIds=[],this.fromIndex=-1,this.toIndex=-1,this.draggedWidth=0,this.cellCenters=new Map,this.cellLefts=new Map,this.cellWidths=new Map,this.lastClientX=0,this.lastClientY=0,this.rafHandle=0,this.autoScrollRaf=0,this.ghost=null,this.onPointerMove=o=>{if(o.pointerId===this.activePointerId){if(this.lastClientX=o.clientX,this.lastClientY=o.clientY,this.pending){if(Math.abs(o.clientX-this.startX)<Ng)return;this.startDrag()}this.dragging&&(o.preventDefault(),this.scheduleUpdate(),this.updateAutoScroll())}},this.onPointerUp=o=>{if(o.pointerId===this.activePointerId){if(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),!this.dragging){this.pending=!1,this.activePointerId=-1;return}this.commitAndCleanup()}},this.onPointerCancel=o=>{o.pointerId===this.activePointerId&&(this.dragging&&(this.clearVisuals(),window.setTimeout(()=>this.host.setSuppressNextHeaderClick(!1),0)),this.teardown())},this.lastEmittedToIndex=-1,this.autoScrollDir=0,this.autoScrollSpeed=0,e.addController(this),this.host=t}hostDisconnected(){this.teardown()}get isDragging(){return this.dragging}get draggingColumnId(){return this.dragging?this.startColumnId:""}onHeaderPointerDown(e,t){e.target.closest(".resize-handle")||this.host.columnMovable(t)&&e.button===0&&(this.pending||this.dragging||this.settling||(this.pending=!0,this.activePointerId=e.pointerId,this.startX=e.clientX,this.startColumnId=t,this.lastClientX=e.clientX,this.lastClientY=e.clientY,window.addEventListener("pointermove",this.onPointerMove),window.addEventListener("pointerup",this.onPointerUp),window.addEventListener("pointercancel",this.onPointerCancel)))}startDrag(){this.pending=!1,this.dragging=!0,this.host.setSuppressNextHeaderClick(!0),this.orderedIds=this.host.orderedColumnIds(),this.fromIndex=this.orderedIds.indexOf(this.startColumnId),this.toIndex=this.fromIndex,this.lastEmittedToIndex=this.fromIndex;let e=this.host.scrollerEl(),t=e?.getBoundingClientRect(),o=e?.scrollLeft??0;this.cellCenters.clear(),this.cellLefts.clear(),this.cellWidths.clear();for(let i of this.orderedIds){let r=this.host.headerCellEl(i);if(!r||!t)continue;let n=r.getBoundingClientRect(),a=n.left-t.left+o;this.cellLefts.set(i,a),this.cellWidths.set(i,n.width),this.cellCenters.set(i,a+n.width/2),i===this.startColumnId&&(this.draggedWidth=n.width)}e?.classList.add(Jd),this.host.toggleHostClass("is-dragging",!0),this.createGhost(),this.scheduleUpdate()}createGhost(){let e=document.createElement("div");e.setAttribute("part","drag-ghost"),e.classList.add("drag-ghost"),e.popover="manual",e.textContent=this.host.columnLabel(this.startColumnId),this.host.attachGhost(e),this.ghost=e,this.positionGhost();try{e.showPopover()}catch{}}positionGhost(){this.ghost&&(this.ghost.style.transform=`translate(${this.lastClientX+12}px, ${this.lastClientY+8}px)`)}scheduleUpdate(){this.rafHandle||(this.rafHandle=requestAnimationFrame(()=>{this.rafHandle=0,this.applyDrag()}))}applyDrag(){if(!this.dragging)return;let e=this.host.scrollerEl();if(!e)return;let t=e.getBoundingClientRect(),o=this.lastClientX-t.left+e.scrollLeft,i=this.host.isRtl(),r=this.orderedIds.findIndex(n=>{let a=this.cellCenters.get(n);return a==null?!1:i?o>a:o<a});if(r===-1&&(r=this.orderedIds.length-1),this.toIndex=r,this.stampTransforms(),this.positionGhost(),r!==this.lastEmittedToIndex){this.lastEmittedToIndex=r;let n=Ir(this.orderedIds,this.fromIndex,r);this.host.commitColumnOrder(this.startColumnId,n,!1)}}stampTransforms(){if(!this.dragging)return;let e=this.host.isRtl()?this.toIndex<this.fromIndex:this.toIndex>this.fromIndex;for(let t=0;t<this.orderedIds.length;t++){let o=this.orderedIds[t],i=0;t===this.fromIndex?i=this.dropOffset():this.fromIndex<this.toIndex&&t>this.fromIndex&&t<=this.toIndex?i=e?-this.draggedWidth:this.draggedWidth:this.fromIndex>this.toIndex&&t<this.fromIndex&&t>=this.toIndex&&(i=e?-this.draggedWidth:this.draggedWidth),this.applyTransform(o,i)}}dropOffset(){if(this.toIndex===this.fromIndex)return 0;let e=this.cellLefts.get(this.startColumnId)??0,t=this.orderedIds[this.toIndex],o=this.cellLefts.get(t)??e,i=this.cellWidths.get(t)??0;return(o>e?o+i-this.draggedWidth:o)-e}applyTransform(e,t){let o=t===0?"":`translateX(${t}px)`,i=this.host.headerCellEl(e);i&&(i.style.transform=o);for(let r of this.host.bodyCellEls(e))r.style.transform=o}updateAutoScroll(){let e=this.host.scrollerEl();if(!e)return;let t=e.getBoundingClientRect(),o=this.lastClientX-t.left,i=t.right-this.lastClientX,r=0,n=0;if(o<Ii?(r=-1,n=Zd(Ii-o)):i<Ii&&(r=1,n=Zd(Ii-i)),this.autoScrollDir=r,this.autoScrollSpeed=n,r===0){this.autoScrollRaf&&(cancelAnimationFrame(this.autoScrollRaf),this.autoScrollRaf=0);return}if(this.autoScrollRaf)return;let a=()=>{if(!this.dragging||this.autoScrollDir===0){this.autoScrollRaf=0;return}e.scrollLeft+=this.autoScrollDir*this.autoScrollSpeed,this.applyDrag(),this.autoScrollRaf=requestAnimationFrame(a)};this.autoScrollRaf=requestAnimationFrame(a)}commitAndCleanup(){this.dragging=!1,this.settling=!0,this.rafHandle&&cancelAnimationFrame(this.rafHandle),this.autoScrollRaf&&cancelAnimationFrame(this.autoScrollRaf),this.rafHandle=0,this.autoScrollRaf=0;let e=Ir(this.orderedIds,this.fromIndex,this.toIndex),t=this.toIndex!==this.fromIndex,o=this.startColumnId,i=()=>{this.clearVisuals(),t&&this.host.commitColumnOrder(o,e,!0),this.teardown()};window.setTimeout(()=>this.host.setSuppressNextHeaderClick(!1),0);let r=this.ghost,n=this.ghostDropTarget();if(!r||!n){i();return}let a=!1,s=()=>{a||(a=!0,r.removeEventListener("transitionend",c),i())},c=d=>{d.propertyName==="opacity"&&s()};r.addEventListener("transitionend",c),window.setTimeout(s,ua+60),r.style.transition=`transform ${ua}ms ease, opacity ${ua}ms ease`,r.offsetWidth,r.style.transform=`translate(${n.x}px, ${n.y}px)`,r.style.opacity="0"}ghostDropTarget(){let e=this.host.scrollerEl(),t=this.host.headerCellEl(this.startColumnId);if(!e||!t)return null;let o=e.getBoundingClientRect(),i=t.getBoundingClientRect(),r=(this.cellLefts.get(this.startColumnId)??0)+this.dropOffset();return{x:o.left-e.scrollLeft+r,y:i.top}}clearVisuals(){this.host.scrollerEl()?.classList.remove(Jd),this.host.toggleHostClass("is-dragging",!1);for(let t of this.orderedIds)this.applyTransform(t,0);this.removeGhost()}removeGhost(){if(this.ghost){try{this.ghost.hidePopover()}catch{}this.ghost.remove(),this.ghost=null}}teardown(){window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),this.rafHandle&&cancelAnimationFrame(this.rafHandle),this.autoScrollRaf&&cancelAnimationFrame(this.autoScrollRaf),this.rafHandle=0,this.autoScrollRaf=0,this.autoScrollDir=0,this.autoScrollSpeed=0,this.removeGhost(),this.pending=!1,this.dragging=!1,this.settling=!1,this.activePointerId=-1,this.orderedIds=[],this.cellCenters.clear(),this.cellLefts.clear(),this.cellWidths.clear()}};function Ir(e,t,o){let i=e.slice();if(t<0||t>=i.length)return i;let r=Math.max(0,Math.min(o,i.length-1)),[n]=i.splice(t,1);return i.splice(r,0,n),i}function Zd(e){return 4+Math.min(1,Math.max(0,e/Ii))*14}var tu=E`
  :host {
    --accent-color: var(--wa-color-brand-fill-loud);
    --background-color: var(--wa-color-surface-default);
    --text-color: var(--wa-color-text-normal);
    --border-color: var(--wa-color-surface-border);
    --border-width: var(--wa-border-width-s);
    --border-radius: var(--wa-border-radius-m);
    --max-height: 30rem;
    --row-height: 3.5rem;
    --header-row-height: var(--row-height);
    --cell-padding: var(--wa-space-m);
    /* Opaque so scrolled rows don't bleed through the sticky header/footer. */
    --header-background: var(--wa-color-surface-lowered);
    --header-text-color: var(--wa-color-text-normal);
    /* Matches the header so hovered rows read as part of the same surface system. */
    --row-hover-background: var(--wa-color-surface-lowered);
    --stripe-background: var(--wa-color-neutral-fill-quiet);
    --selected-background: var(--wa-color-brand-fill-quiet);
    --selected-border-color: var(--wa-color-brand-border-quiet);
    --focus-ring: var(--wa-focus-ring);
    --transition-duration: var(--wa-transition-normal);
    /* em so the per-level tree indent tracks the grid's font scale (and therefore its size attribute). */
    --indent-size: 1.25em;

    /* The accent drives the form controls the grid renders (checkboxes, inputs) through the shared control token. */
    --wa-form-control-activated-color: var(--accent-color);

    display: block;
    color: var(--text-color);
    font-family: var(--wa-font-family-body);
    font-size: var(--wa-font-size-m);
  }

  /* Size drives row height + cell padding (font scale comes from shared size.styles). */
  :host([size='xs']) {
    --row-height: 2.25rem;
    --cell-padding: var(--wa-space-xs);
  }
  :host([size='s']),
  :host([size='small']) {
    --row-height: 2.5rem;
    --cell-padding: var(--wa-space-s);
  }
  :host([size='m']),
  :host([size='medium']) {
    --row-height: 3.5rem;
    --cell-padding: var(--wa-space-m);
  }
  :host([size='l']),
  :host([size='large']) {
    --row-height: 4rem;
    --cell-padding: var(--wa-space-m);
  }
  :host([size='xl']) {
    --row-height: 4.5rem;
    --cell-padding: var(--wa-space-l);
  }

  [part~='data-grid'] {
    position: relative;
    display: flex;
    flex-direction: column;
    border: var(--border-width) solid var(--border-color);
    border-radius: var(--border-radius);
    overflow: hidden;
    background-color: var(--background-color);
  }

  :host([appearance='plain']) [part~='data-grid'] {
    border: none;
    border-radius: 0;
    background-color: transparent;
  }

  /* Owns vertical scrolling for virtualization; default max-height gives the virtualizer a measurable viewport
     (override --max-height, or none for natural height). display:grid drops table semantics — ARIA roles set in
     the template. */
  [part~='table'] {
    display: grid;
    width: 100%;
    max-height: var(--max-height);
    overflow: auto;
  }

  [part~='header'] {
    display: grid;
    position: sticky;
    inset-block-start: 0;
    z-index: 1;
    background-color: var(--header-background);
    color: var(--header-text-color);
  }

  [part~='body'] {
    display: grid;
    position: relative;
  }

  /* An initial load has no rows and no empty message, which would collapse the body and leave the loading overlay
     covering nothing but the header. The is-empty class is set by the template rather than using :empty, which
     whitespace text nodes in the markup would defeat. */
  [part~='body'].is-empty {
    min-height: 8rem;
  }

  .row {
    display: flex;
    position: absolute;
    inset-inline: 0;
    width: 100%;
    height: var(--row-height);
    box-sizing: border-box;
    border-block-end: var(--border-width) solid var(--border-color);
  }

  [part~='header'] .row {
    position: relative;
    height: var(--header-row-height);
  }

  /* Data rows wrap cells in row-main so an optional detail panel can stack beneath (header/filter rows place cells
     directly). Cells stretch to the full row height — each centers its own content — so the pinned-edge divider
     spans the row and a sticky pinned cell's opaque background fully masks the columns sliding beneath it. */
  .row-main {
    display: flex;
    align-items: stretch;
    width: 100%;
    height: var(--row-height);
  }

  .row.has-detail {
    flex-direction: column;
    height: auto;
    align-items: stretch;
  }

  [part~='row-detail'] {
    padding: var(--wa-space-m);
    background-color: var(--wa-color-neutral-fill-quiet);
    border-block-start: var(--border-width) var(--wa-border-style) var(--border-color);
  }

  .cell {
    display: flex;
    flex: 1 1 0;
    align-items: center;
    min-width: 0;
    box-sizing: border-box;
    padding-inline: var(--cell-padding);
    overflow: hidden;
  }

  /* min-width:0 lets it shrink below content width so a text child can truncate. */
  .cell-content {
    flex: 1 1 0;
    min-width: 0;
  }

  /* Single-line ellipsis for plain-string cells. Lives here, not on the flex .cell where text-overflow would
     no-op. */
  .cell-content-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .cell[data-align='center'] {
    justify-content: center;
    text-align: center;
  }

  .cell[data-align='end'] {
    justify-content: flex-end;
    text-align: end;
  }

  /* Header cells */
  [part~='header-cell'] {
    position: relative;
    font-weight: var(--wa-font-weight-semibold);
    color: var(--header-text-color);
    user-select: none;
  }

  [part~='header-cell'][data-sortable] {
    cursor: pointer;
  }

  .sort-indicator {
    display: inline-flex;
    margin-inline-start: var(--wa-space-xs);
    font-size: var(--wa-font-size-smaller);
    opacity: 0;
    transition: opacity var(--wa-transition-fast);
  }

  /* Faint on hover; full-strength when sorted. */
  @media (hover: hover) {
    [part~='header-cell'][data-sortable]:hover .sort-indicator {
      opacity: 0.4;
    }
  }

  .sort-indicator.is-sorted {
    opacity: 1;
  }

  /* Numbered priority badge for multi-column sort. */
  .sort-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.25em;
    height: 1.25em;
    margin-inline-start: var(--wa-space-2xs);
    padding-inline: 0.25em;
    border-radius: var(--wa-border-radius-pill);
    background-color: var(--wa-color-neutral-fill-quiet);
    color: var(--wa-color-text-quiet);
    font-size: 0.7em;
    font-weight: var(--wa-font-weight-semibold);
  }

  .header-label {
    flex: 1 1 auto; /* grow so the trailing actions group is pushed to the inline-end edge */
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /* Shown in a pinned column's header; click to unpin. Spacing comes from the actions group gap. */
  .pin-indicator {
    flex: 0 0 auto;
    font-size: var(--wa-font-size-smaller);
    color: var(--wa-color-text-quiet);
  }

  .pin-indicator wa-icon {
    transform: rotate(45deg);
  }

  @media (hover: hover) {
    .pin-indicator:hover {
      color: var(--accent-color);
    }
  }

  .pin-indicator:focus-visible {
    color: var(--accent-color);
    outline: var(--focus-ring);
    outline-offset: 2px;
  }

  /* Trailing header controls (pin indicator + kebab menu), pushed to the inline-end edge. The start padding matches
     the sort indicator's own start margin so label → sort → filter spacing reads evenly in end-aligned columns. */
  .header-actions {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    gap: var(--wa-space-2xs);
    margin-inline-start: auto; /* push to the end, after label + sort indicators */
    padding-inline-start: var(--wa-space-xs);
  }

  .column-menu {
    flex: 0 0 auto;
    /* The menu renders inside the header cell, so its items would inherit the header's semibold — like the filter
       panel, menu content is body text. */
    font-weight: var(--wa-font-weight-normal);
  }

  /* Visible overflow so the resize handle and in-header control focus rings aren't clipped; text ellipsis is
     handled by header-label's own overflow:hidden. */
  [part~='header-cell'] {
    overflow: visible;
  }

  .resize-handle {
    position: absolute;
    inset-block: 0;
    inset-inline-end: -0.25rem;
    width: 0.5rem;
    cursor: col-resize;
    touch-action: none;
    user-select: none;
    z-index: 1;
  }

  /* Visible divider is one line-height tall and centered; the full-height .resize-handle is the larger grab target. */
  .resize-handle::after {
    content: '';
    position: absolute;
    inset-block-start: 50%;
    inset-inline: 0;
    margin-inline: auto;
    width: var(--border-width);
    height: 1lh;
    transform: translateY(-50%);
    background-color: var(--border-color);
  }

  /* The last column's handle straddles no boundary — pull it fully inside the cell (its overhang would otherwise
     add phantom scrollable space past the last column) and pin its divider to the column's true edge. */
  [part~='header-cell']:last-child .resize-handle {
    inset-inline-end: 0;
  }

  [part~='header-cell']:last-child .resize-handle::after {
    margin-inline-end: 0;
  }

  /* Column reordering: columns glide to previewed positions during a drag to open a gap; a top-layer ghost tracks
     the cursor. */
  [part~='table'].column-reordering .cell {
    transition: transform var(--transition-duration) var(--wa-transition-easing, ease);
  }

  :host(.is-dragging),
  :host(.is-dragging) * {
    user-select: none;
    cursor: grabbing;
  }

  /* The reorder drag ghost: lives in the shadow root (so ::part(drag-ghost) works and theme tokens resolve from
     the grid) but paints in the top layer via the Popover API. These override the UA [popover] defaults; the
     cursor-tracking transform is stamped inline per frame. */
  .drag-ghost {
    position: fixed;
    inset: auto;
    top: 0;
    left: 0;
    margin: 0;
    width: max-content;
    height: auto;
    overflow: visible;
    padding: var(--wa-space-2xs) var(--wa-space-xs);
    border: 1px solid var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    background: var(--wa-color-surface-raised);
    color: var(--wa-color-text-normal);
    box-shadow: var(--wa-shadow-m);
    font-size: var(--wa-font-size-s);
    white-space: nowrap;
    pointer-events: none;
    /* No transform transition while dragging — the ghost must track the cursor 1:1. The drop animation enables it
       inline. */
    transition: opacity 150ms ease;
    will-change: transform;
  }

  /* Per-column header filter: a compact funnel button + popover panel. */
  .filter-trigger {
    position: relative; /* anchors the active-filter dot */
    flex: 0 0 auto;
    font-size: var(--wa-font-size-smaller);
    color: var(--wa-color-text-quiet);
  }

  /* The compact icon-button shared by the header funnel, pin indicator, and row expand toggle: a native button
     (real focus + accessible name — wa-icon's label watcher owns role/aria-label/aria-hidden on its own host, so
     the name must live on a wrapper) around a decorative icon, without wa-button's form-control height.
     The glyphs are only ~12px, so pad the hit area out to ~24px and pull the padding back with negative margins —
     the header's layout (and the measured header floor, which sums layout boxes) is unchanged. Adjacent targets'
     hit boxes meet in the middle of the actions gap without covering each other's glyphs. */
  .filter-trigger,
  .pin-indicator,
  .expand-toggle {
    appearance: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: 0;
    font: inherit;
    cursor: pointer;
    padding: var(--wa-space-xs) var(--wa-space-2xs);
    margin: calc(-1 * var(--wa-space-xs)) calc(-1 * var(--wa-space-2xs));
    border-radius: var(--wa-border-radius-s);
  }

  /* Row expand/collapse toggle — the same compact icon-button pattern as the header funnel and pin. */
  .expand-toggle {
    flex: 0 0 auto;
    font-size: inherit;
    color: var(--wa-color-text-quiet);
  }

  .expand-toggle:focus-visible {
    color: var(--accent-color);
    outline: var(--focus-ring);
    outline-offset: 2px;
  }

  @media (hover: hover) {
    .filter-trigger:hover {
      color: var(--accent-color);
    }
  }

  .filter-trigger:focus-visible {
    color: var(--accent-color);
    outline: var(--focus-ring);
    outline-offset: 2px;
  }

  .filter-trigger.is-filtered {
    color: var(--accent-color);
  }

  /* A dot badge marks an active filter, so the state doesn't rely on the icon's color alone. The insets subtract
     the hit-area padding so the dot hugs the glyph's corner, not the padded box's. */
  .filter-trigger.is-filtered::after {
    content: '';
    position: absolute;
    inset-block-start: calc(var(--wa-space-xs) - 0.2em);
    inset-inline-end: calc(var(--wa-space-2xs) - 0.25em);
    width: 0.35rem;
    height: 0.35rem;
    border-radius: var(--wa-border-radius-pill);
    background-color: var(--accent-color);
    pointer-events: none;
  }

  /* The popover's default space-l padding is oversized for a compact control panel. */
  .filter-panel::part(body) {
    padding: var(--wa-space-m);
  }

  /* Fixed panel width: filter controls size to the panel, never to the column that anchors them. */
  .filter-panel-content {
    display: flex;
    flex-direction: column;
    gap: var(--wa-space-s);
    width: 15rem;
    max-width: 85vw;
    font-weight: var(--wa-font-weight-normal);
    white-space: normal;
  }

  .filter-options {
    display: flex;
    flex-direction: column;
    gap: var(--wa-space-2xs);
    max-height: 14rem;
    overflow: auto;
  }

  /* Spread each option's label and count across the row. */
  .filter-options wa-checkbox {
    width: 100%;
  }

  .filter-options wa-checkbox::part(label) {
    display: flex;
    flex: 1 1 auto;
    gap: var(--wa-space-s);
    min-width: 0;
  }

  .filter-option-label {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .filter-option-count {
    flex: 0 0 auto;
    color: var(--wa-color-text-quiet);
    font-variant-numeric: tabular-nums;
  }

  .filter-options-empty {
    color: var(--wa-color-text-quiet);
    padding-block: var(--wa-space-2xs);
  }

  .filter-panel-footer {
    display: flex;
    justify-content: flex-end;
  }

  /* Pinned cells (position:sticky set inline) need an opaque background so the scrolling center band doesn't show
     through. */
  [part~='cell'][data-pinned],
  [part~='header-cell'][data-pinned] {
    background-color: var(--background-color);
  }

  [part~='header-cell'][data-pinned] {
    background-color: var(--header-background);
  }

  /* Divider on the inner edge of each pinned section. Box-shadow offsets are physical while the pinned sections
     stick to logical edges (pinnedStyle uses inset-inline), so RTL swaps the offsets. */
  [data-pinned='left'] {
    box-shadow: inset calc(-1 * var(--border-width)) 0 0 0 var(--border-color);
  }

  [data-pinned='right'] {
    box-shadow: inset var(--border-width) 0 0 0 var(--border-color);
  }

  [data-pinned='left']:dir(rtl) {
    box-shadow: inset var(--border-width) 0 0 0 var(--border-color);
  }

  [data-pinned='right']:dir(rtl) {
    box-shadow: inset calc(-1 * var(--border-width)) 0 0 0 var(--border-color);
  }

  /* Pinned body cells re-assert the row's state background (a sticky cell paints its own bg over the row's). Order
     matters: selected > hover > stripe. */
  [part~='row'][data-stripe='odd'] [part~='cell'][data-pinned] {
    background-color: var(--stripe-background, var(--background-color));
  }

  @media (hover: hover) {
    [part~='row']:hover [part~='cell'][data-pinned] {
      background-color: var(--row-hover-background);
    }
  }

  [part~='row'][data-selected] [part~='cell'][data-pinned] {
    background-color: var(--selected-background);
  }

  /* Striping off: odd pinned cells fall back to the plain body bg. The :not([data-selected]) guard stops this
     higher-specificity rule from overriding the selected re-assertion above; the hover re-assertion is hover-gated
     (a bare :not(:hover) would blank tapped rows on touch, where :hover sticks). */
  :host(:not([striped])) [part~='row'][data-stripe='odd']:not([data-selected]) [part~='cell'][data-pinned] {
    background-color: var(--background-color);
  }

  @media (hover: hover) {
    :host(:not([striped])) [part~='row'][data-stripe='odd']:not([data-selected]):hover [part~='cell'][data-pinned] {
      background-color: var(--row-hover-background);
    }
  }

  /* Column footer rowgroup: sticky to the bottom so totals stay visible while the body scrolls. Mirrors the header. */
  .table-footer {
    display: grid;
    position: sticky;
    inset-block-end: 0;
    z-index: 1;
    background-color: var(--header-background);
    border-block-start: var(--border-width) solid var(--border-color);
    /* Overlap the last body row's bottom border so the boundary stays one border-width thick. */
    margin-block-start: calc(-1 * var(--border-width));
  }

  .table-footer .row {
    position: relative;
    height: var(--row-height);
    border-block-end: none;
    font-weight: var(--wa-font-weight-semibold);
  }

  /* Sticky footer cells paint over the scrolling band, so re-assert the footer bg. */
  [part~='footer-cell'][data-pinned] {
    background-color: var(--header-background);
  }

  /* Group rows: flex so a long value truncates while the member count stays visible. */
  .cell-content-group {
    display: flex;
    align-items: center;
    min-width: 0;
  }

  .group-value {
    font-weight: var(--wa-font-weight-semibold);
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .group-count {
    flex: none;
    margin-inline-start: var(--wa-space-2xs);
    color: var(--wa-color-text-quiet);
  }

  /* Body rows */
  @media (hover: hover) {
    [part~='row']:hover {
      background-color: var(--row-hover-background);
    }
  }

  /* Stripe keys off the row's real data index (set in the template), not DOM position, since virtualization
     recycles a rolling window. The :not([data-selected]) guard keeps the stripe (whose :host() selector carries
     higher specificity) from painting over the selected state; the :not(:hover) guard exists only for the hover
     background, so it's hover-gated — on touch devices :hover sticks to the last-tapped row, which would
     otherwise blank its stripe. */
  :host([striped]) [part~='row'][data-stripe='odd']:not([data-selected]) {
    background-color: var(--stripe-background);
  }

  @media (hover: hover) {
    :host([striped]) [part~='row'][data-stripe='odd']:not([data-selected]):hover {
      background-color: var(--row-hover-background);
    }
  }

  [part~='row'][data-selected] {
    background-color: var(--selected-background);
    /* Soft primary divider so a run of selected rows reads as a contiguous block, not gray grid lines. */
    border-block-end-color: var(--selected-border-color);
  }

  /* A selected row's TOP edge is drawn by the previous row's bottom border — recolor it too so the selected band
     is framed on both edges. Virtualized rows render in index order, so the DOM sibling is the row above. */
  [part~='row']:has(+ [part~='row'][data-selected]) {
    border-block-end-color: var(--selected-border-color);
  }

  /* Selection + expand cells hug their control: a cell-padding inset at the start, a content-width control, and
     the NEXT cell's own start padding provides the separation — the same rhythm as data cells, in every variation
     (expand only, select only, both, or neither). The min-width keeps empty control cells (leaf rows without a
     toggle, header/footer placeholders) exactly as wide as ones holding a 1.25em icon so columns align across
     rows. */
  .cell-control {
    flex: 0 0 auto;
    width: auto;
    min-width: calc(var(--cell-padding) + 1.25em);
    justify-content: flex-start;
    padding-inline: var(--cell-padding) 0;
    /* The cell box hugs its checkbox/toggle exactly, so the inherited overflow:hidden would clip the control's
       focus ring; there's no text to truncate here, so let it show. */
    overflow: visible;
    /* Shift-clicking checkboxes to range-select must not also select text across rows. */
    user-select: none;
  }

  /* Consecutive control cells (expand toggle + checkbox) sit close together, reading as one leading control unit. */
  .cell-control + .cell-control {
    min-width: calc(var(--wa-space-xs) + 1.25em);
    padding-inline-start: var(--wa-space-xs);
  }

  /* The row-select checkbox's label is visually hidden, which leaves the control's built-in label margin dangling
     at its inline end — trim it so the cell's width is the control alone. */
  .cell-control wa-checkbox::part(control) {
    margin-inline-end: 0;
  }

  /* Roving cell focus ring (active cell carries tabindex=0). */
  .cell:focus-visible,
  [part~='header-cell']:focus-visible {
    outline: var(--focus-ring);
    outline-offset: calc(-1 * var(--wa-focus-ring-width, 0.1875rem));
    z-index: 2;
  }

  /* Footer / pager. Top border marks the scroll-area boundary — needed even when rows fill the viewport, since a
     mid-scroll last row is clipped and has no divider to lean on. */
  [part~='footer'] {
    display: flex;
    /* Lifted so the border paints over the scroll area's rows (and the sticky column footer, also z-index 1 but
       earlier in the tree) in the overlap strip below. */
    position: relative;
    z-index: 1;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wa-space-2xs) var(--wa-space-m);
    border-block-start: var(--border-width) solid var(--border-color);
    /* Overlap the last body row's bottom border so the boundary stays one border-width thick. */
    margin-block-start: calc(-1 * var(--border-width));
    /* Same uniform inset as the toolbar so both bars share the table's rhythm. */
    padding: var(--cell-padding);
    background-color: var(--header-background);
    container-type: inline-size;
  }

  /* Narrow footers drop the pager's first/last edge buttons so the page numbers stay reachable. */
  @container (max-width: 30rem) {
    [part~='pager']::part(first-button),
    [part~='pager']::part(last-button) {
      display: none;
    }
  }

  /* The wa-pagination element sits at the footer's inline-end edge (info + page-size stay at the start) and follows
     the grid's font scale. wa-pagination is display:contents by default, so force it to a flex item for the auto
     margin to act on (the .columns-menu trick). When the footer wraps it onto its own row, it stays end-aligned. */
  [part~='pager'] {
    display: flex;
    margin-inline-start: auto;
    font-size: inherit;
  }

  /* wa-pagination wraps its buttons internally by default; in the footer it must stay one line and wrap as a
     UNIT (the footer's flex-wrap above), never splitting its buttons across rows. */
  [part~='pager']::part(pagination),
  [part~='pager']::part(pages) {
    flex-wrap: nowrap;
  }

  .page-size {
    flex: 0 0 auto;
    width: 6rem;
  }

  .pager-info {
    flex: 0 0 auto;
    color: var(--wa-color-text-quiet);
    font-size: var(--wa-font-size-s);
    white-space: nowrap;
  }

  /* Empty + loading states ("no results" is the filtered-empty variant of the empty state) */
  [part~='empty'],
  [part~='no-results'] {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--wa-space-2xl) var(--wa-space-m);
    color: var(--wa-color-text-quiet);
  }

  [part~='loading-overlay'] {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: color-mix(in srgb, var(--background-color) 60%, transparent);
    z-index: 3;
  }

  /* Toolbar (search + columns menu region). Uniform padding keyed to the cell padding so the controls' insets match
     the table's horizontal rhythm on every axis and scale with the grid's size. */
  [part~='toolbar'] {
    display: flex;
    align-items: center;
    gap: var(--wa-space-s);
    width: 100%;
    padding: var(--cell-padding);
    border-block-end: var(--border-width) solid var(--border-color);
  }

  /* Columns menu sits at the toolbar's inline-end edge (auto margin pushes it there with or without a search box).
     wa-dropdown is display:contents by default, so force it to a flex item for the auto margin to act on. */
  .columns-menu {
    display: flex;
    margin-inline-start: auto;
  }

  .toolbar-search {
    flex: 0 1 20rem;
    max-width: 20rem;
  }

  /* Screen-reader-only text uses the shared wa-visually-hidden utilities (imported in the component's static css):
     .wa-visually-hidden for slotted labels and the live region, .wa-visually-hidden-label to hide an embedded form
     control's label part while keeping its accessible name. */
`;var qg=new Set(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End","PageUp","PageDown","Enter"," ","a","A"]),Wg=new Set(["input","textarea","select","wa-input","wa-select","wa-option","wa-date-input","wa-dropdown","wa-dropdown-item","wa-popover"]),Ug=new Set(["button","wa-button","wa-checkbox"]);function ou(e){return e.localName==="input"&&/^(checkbox|radio)$/.test(e.type)}var iu=class{constructor(e,t){this.selectionAnchor=null,this.focusAttempts=0,this.handleKeyDown=o=>{let i=(o.key==="a"||o.key==="A")&&(o.ctrlKey||o.metaKey),r=(o.key==="c"||o.key==="C")&&(o.ctrlKey||o.metaKey),n=o.key==="ContextMenu"||o.key==="F10"&&o.shiftKey;if(!qg.has(o.key)&&!i&&!r&&!n||/^[ac]$/i.test(o.key)&&!i&&!r)return;let a=o.composedPath().filter(g=>g instanceof Element);if(a.some(g=>Wg.has(g.localName)&&!ou(g))||a.some(g=>Ug.has(g.localName)||ou(g))&&(o.key==="Enter"||o.key===" "))return;if(r){this.host.copySelection()&&o.preventDefault();return}let s=this.host.focusableColumnIds();if(s.length===0)return;let c=this.host.rowCount(),d=this.host.getActiveCell();d||(d={row:-1,col:s[0]});let h=this.host.isRtl(),m=Math.max(0,s.indexOf(d.col)),p=d.row===-1;if(n){p||(o.preventDefault(),this.host.openContextMenu(d.row,d.col,o));return}if(p&&o.shiftKey&&(o.key==="ArrowLeft"||o.key==="ArrowRight")){if(this.host.columnMovable(d.col)){let g=o.key==="ArrowRight"?1:-1,w=h?-g:g;o.preventDefault(),this.host.moveColumnByStep(d.col,w)}return}if(p&&o.altKey&&(o.key==="ArrowLeft"||o.key==="ArrowRight")){if(this.host.columnResizable(d.col)){let g=o.key==="ArrowRight"?1:-1;o.preventDefault(),this.host.resizeColumnByStep(d.col,g)}return}let f={...d};switch(o.key){case"ArrowRight":{let g=h?-1:1;f.col=s[Ro(m+g,0,s.length-1)];break}case"ArrowLeft":{let g=h?1:-1;f.col=s[Ro(m+g,0,s.length-1)];break}case"ArrowDown":{p?f.row=c>0?0:-1:f.row=Ro(d.row+1,0,c-1),o.shiftKey&&!p&&this.host.multiSelectEnabled()&&this.handleRangeExtend(d.row,f.row);break}case"ArrowUp":{p||d.row===0?f.row=-1:f.row=Ro(d.row-1,0,c-1),o.shiftKey&&!p&&f.row!==-1&&this.host.multiSelectEnabled()&&this.handleRangeExtend(d.row,f.row);break}case"Home":{(o.ctrlKey||o.metaKey)&&(f.row=p?-1:c>0?0:-1),f.col=s[0];break}case"End":{(o.ctrlKey||o.metaKey)&&(f.row=c>0?c-1:-1),f.col=s[s.length-1];break}case"PageDown":{let g=this.pageStep();f.row=Ro(p?g-1:d.row+g,0,c-1);break}case"PageUp":{let g=this.pageStep();f.row=p?-1:Ro(d.row-g,0,c-1);break}case"Enter":{p?(o.preventDefault(),this.host.sortColumn(d.col,o.shiftKey)):this.host.toggleRowExpansion(d.row,d.col)?o.preventDefault():(o.preventDefault(),this.host.activateCell(d.row,d.col));return}case" ":{!p&&this.host.selectionEnabled()&&(o.preventDefault(),this.host.toggleRowSelection(d.row));return}default:{if(i){this.host.multiSelectEnabled()&&(o.preventDefault(),this.host.selectAllRows());return}return}}o.preventDefault(),o.shiftKey||(this.selectionAnchor=null),this.moveActiveCell(f)},e.addController(this),this.host=t}hostConnected(){}handleRangeExtend(e,t){this.selectionAnchor===null&&(this.selectionAnchor=e,this.host.beginRangeSelection()),this.host.extendSelectionTo(this.selectionAnchor,t)}pageStep(){let e=this.host.scrollerEl(),t=this.host.rowHeight()||40,o=e?.clientHeight??t*10;return Math.max(1,Math.floor(o/t)-1)}moveActiveCell(e){this.host.setActiveCell(e),e.row>=0&&this.host.scrollRowIntoView(e.row),this.focusAttempts=0,this.host.updateComplete.then(()=>requestAnimationFrame(()=>this.focusActiveCellEl()))}focusActiveCellEl(){let e=this.host.getActiveCell();if(!e)return;let t=this.host.shadowRoot;if(!t)return;let o=`[data-row-index="${e.row}"][data-col-id="${jg(e.col)}"]`,i=t.querySelector(o);if(i){i.focus({preventScroll:!0}),this.host.revealColumn(i);return}this.focusAttempts<2&&(this.focusAttempts+=1,requestAnimationFrame(()=>this.focusActiveCellEl()))}resetRangeAnchor(){this.selectionAnchor=null}clampActiveRow(){let e=this.host.getActiveCell();if(!e||e.row<0)return;let t=this.host.rowCount();e.row>t-1&&this.host.setActiveCell({...e,row:Math.max(-1,t-1)})}};function Ro(e,t,o){return Math.max(t,Math.min(o,e))}function jg(e){return typeof CSS<"u"&&typeof CSS.escape=="function"?CSS.escape(e):e.replace(/["\\]/g,"\\$&")}function nt(e,t){return typeof e=="function"?e(t):e}function ae(e){if(Array.isArray(e))return e.map(ae);if(e&&typeof e=="object"){let t=Object.getPrototypeOf(e);if(t!==Object.prototype&&t!==null)return e;let o=t===null?D():{},i=Object.keys(e);for(let r=0;r<i.length;r++){let n=i[r];Object.defineProperty(o,n,{configurable:!0,enumerable:!0,value:ae(e[n]),writable:!0})}return o}return e}function $i(e,t){let o=Object.keys(t),i=e;for(let r=0;r<o.length;r++){let n=o[r];!n.startsWith("_memo_")&&n!=="_cellsCache"&&(i[n]=t[n])}return e}function D(){return Object.create(null)}function Ce(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function me(e,t){return o=>{(t.options.atoms?.[e]??t.baseAtoms[e]).set(i=>nt(o,i))}}function ru(e){if(typeof e!="object"||e===null)return!1;if(Array.isArray(e))return!0;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null}function nu(e){return Reflect.ownKeys(e).filter(t=>Object.prototype.propertyIsEnumerable.call(e,t))}var Gg=3;function au(e,t){return su(e,t,Gg)}function su(e,t,o){if(Object.is(e,t))return!0;if(o<=0||!ru(e)||!ru(t)||(Array.isArray(e)||Array.isArray(t))&&(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length))return!1;let i=nu(e),r=nu(t);if(i.length!==r.length)return!1;let n=e,a=t;for(let s=0;s<i.length;s++){let c=i[s];if(!Object.prototype.propertyIsEnumerable.call(t,c)||!su(n[c],a[c],o-1))return!1}return!0}function Me(e,t,o,i=au){let r=`on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`,n=e.options[r];n&&n(a=>{let s=nt(o,a);return i(a,s)?a:s})}function Ao(e){return e instanceof Function}function ha(e,t){let o=[],i=r=>{r.forEach(n=>{o.push(n);let a=t(n);a.length&&i(a)})};return i(e),o}var lu=({fn:e,memoDeps:t,onAfterCompare:o,onAfterUpdate:i,onBeforeCompare:r,onBeforeUpdate:n})=>{let a=[],s;return d=>{r?.();let h=t?.(d),m=!h||h.length!==a?.length;if(!m&&h){for(let p=0;p<h.length;p++)if(h[p]!==a[p]){m=!0;break}}return o?.(m),m&&(a=h,n?.(),s=e(...h??[]),i?.(s)),s}};function zo(e){let t=!1;return()=>{if(!t){t=!0;return}e()}}var Kg=(e,t)=>{for(e=String(e);e.length<t;)e=" "+e;return e};function Re({feature:e,fnName:t,objectId:o,onAfterUpdate:i,table:r,...n}){let a,s,c=0,d;function h(f,g){let w=c===0?"(1st run)":g?"(rerun #"+c+")":"(cache)";c++,console.groupCollapsed(`%c\u23F1 ${Kg(`${f.toFixed(1)} ms`,12)} %c${w}%c ${t}%c ${o?`(${t.split(".")[0]}Id: ${o})`:""}`,`font-size: .6rem; font-weight: bold; ${g?`color: hsl(
        ${Math.max(0,Math.min(120-Math.log10(f)*60,120))}deg 100% 31%);`:""} `,`color: ${c<2?"#FF00FF":"#FF1493"}`,"color: #666","color: #87CEEB"),console.info({feature:e,state:r.store.state,deps:n.memoDeps?.toString()}),console.trace(),console.groupEnd()}let m=()=>{if(!i)return;let{schedule:f,untrack:g}=r._reactivity;f(()=>g(()=>i()))};return lu({...n,...{onAfterUpdate:()=>{m()}}})}function pa(e,t="_"){let[o,i]=e.split(t);return{fnKey:i,fnName:`${o}.${i}`,parentName:o}}function Z(e,t,o){for(let[i,{fn:r,memoDeps:n}]of Object.entries(o)){let{fnKey:a,fnName:s}=pa(i);t[a]=n?Re({memoDeps:n,fn:r,fnName:s,table:t,feature:e}):r}}function j(e,t,o,i){for(let[r,{fn:n,memoDeps:a}]of Object.entries(i)){let{fnKey:s,fnName:c}=pa(r);if(a){let d=`_memo_${s}`;t[s]=function(...h){if(!this[d]){let m=this;this[d]=Re({memoDeps:p=>a(m,p),fn:(...p)=>n(m,...p),fnName:c,objectId:m.id,table:o,feature:e})}return this[d](...h)}}else t[s]=function(...d){return n(this,...d)}}}function R(e,t,o,...i){return e[t]?.(...i)??o(e,...i)}function cu(e){return e.row.getValue(e.column.id)}function du(e){return e.getValue()??e.table.options.renderFallbackValue}function uu(e){return{table:e.table,column:e.column,row:e.row,cell:e,getValue:()=>e.getValue(),renderValue:()=>e.renderValue()}}var hu={assignCellPrototype:(e,t)=>{j("coreCellsFeature",e,t,{cell_getValue:{fn:o=>cu(o)},cell_renderValue:{fn:o=>du(o)},cell_getContext:{fn:o=>uu(o),memoDeps:o=>[o]}})}};function Yg(e){if(!e._headerPrototype){e._headerPrototype={table:e};let t=Object.values(e._features);for(let o=0;o<t.length;o++)t[o].assignHeaderPrototype?.(e._headerPrototype,e)}return e._headerPrototype}function ma(e,t,o){let i=Yg(e),r=Object.create(i);r.colSpan=0,r.column=t,r.depth=o.depth,r.headerGroup=null,r.id=o.id??t.id,r.index=o.index,r.isPlaceholder=!!o.isPlaceholder,r.placeholderId=o.placeholderId,r.rowSpan=0,r.subHeaders=[];let n=e._headerInstanceInitFns;for(let a=0;a<n.length;a++)n[a](r);return r}function He(){return{start:[],end:[]}}function pu(e,t){let o=e.getLeafColumns(),i=[];for(let r=0;r<o.length;r++){let n=o[r].id;n&&i.push(n)}$r(e.table,r=>t==="end"?{start:r.start.filter(n=>!i.includes(n)),end:[...r.end.filter(n=>!i.includes(n)),...i]}:t==="start"?{start:[...r.start.filter(n=>!i.includes(n)),...i],end:r.end.filter(n=>!i.includes(n))}:{start:r.start.filter(n=>!i.includes(n)),end:r.end.filter(n=>!i.includes(n))})}function mu(e){return e.getLeafColumns().some(t=>(t.columnDef.enablePinning??!0)&&(e.table.options.enableColumnPinning??!0))}function fa(e){let t=e.getLeafColumns(),{start:o,end:i}=e.table.atoms.columnPinning?.get()??He();for(let r=0;r<t.length;r++)if(o.includes(t[r].id))return"start";for(let r=0;r<t.length;r++)if(i.includes(t[r].id))return"end";return!1}function fu(e){let t=fa(e);return t?e.table.atoms.columnPinning?.get()?.[t].indexOf(e.id)??-1:0}function gu(e){let t=R(e,"getVisibleCells",Lr),{start:o,end:i}=e.table.atoms.columnPinning?.get()??He();if(!o.length&&!i.length)return t;let r=[...o,...i];return t.filter(n=>!r.includes(n.column.id))}function bu(e){let{start:t}=e.table.atoms.columnPinning?.get()??He();if(!t.length)return[];let o=R(e,"getVisibleCellsByColumnId",Zo),i=[];for(let r=0;r<t.length;r++){let n=o[t[r]];n&&(n.position="start",i.push(n))}return i}function wu(e){let{end:t}=e.table.atoms.columnPinning?.get()??He();if(!t.length)return[];let o=R(e,"getVisibleCellsByColumnId",Zo),i=[];for(let r=0;r<t.length;r++){let n=o[t[r]];n&&(n.position="end",i.push(n))}return i}function $r(e,t){Me(e,"columnPinning",t)}function vu(e,t){$r(e,t?He():ae(e.initialState.columnPinning??He()))}function yu(e,t){let o=e.atoms.columnPinning?.get();return t?!!o?.[t].length:!!(o?.start.length||o?.end.length)}function qt(e){let t=e.getAllColumns(),o=e.getAllLeafColumnsById(),{start:i}=e.atoms.columnPinning?.get()??He(),r=[];for(let n=0;n<i.length;n++){let a=o[i[n]];a&&R(a,"getIsVisible",ge)&&r.push(a)}return Fo(t,r,e,"start")}function Wt(e){let t=e.getAllColumns(),o=e.getAllLeafColumnsById(),{end:i}=e.atoms.columnPinning?.get()??He(),r=[];for(let n=0;n<i.length;n++){let a=o[i[n]];a&&R(a,"getIsVisible",ge)&&r.push(a)}return Fo(t,r,e,"end")}function Ut(e){let t=e.getAllColumns(),o=R(e,"getVisibleLeafColumns",wt),{start:i,end:r}=e.atoms.columnPinning?.get()??He();if(i.length||r.length){let n=[...i,...r];o=o.filter(a=>!n.includes(a.id))}return Fo(t,o,e,"center")}function xu(e){return[...R(e,"getStartHeaderGroups",qt)].reverse()}function Cu(e){return[...R(e,"getEndHeaderGroups",Wt)].reverse()}function Su(e){return[...R(e,"getCenterHeaderGroups",Ut)].reverse()}function ga(e){let t=R(e,"getStartHeaderGroups",qt),o=[];for(let i=0;i<t.length;i++){let r=t[i].headers;for(let n=0;n<r.length;n++)o.push(r[n])}return o}function ba(e){let t=R(e,"getEndHeaderGroups",Wt),o=[];for(let i=0;i<t.length;i++){let r=t[i].headers;for(let n=0;n<r.length;n++)o.push(r[n])}return o}function wa(e){let t=R(e,"getCenterHeaderGroups",Ut),o=[];for(let i=0;i<t.length;i++){let r=t[i].headers;for(let n=0;n<r.length;n++)o.push(r[n])}return o}function _u(e){return R(e,"getStartFlatHeaders",ga).filter(t=>!t.subHeaders.length)}function ku(e){return R(e,"getEndFlatHeaders",ba).filter(t=>!t.subHeaders.length)}function Eu(e){return R(e,"getCenterFlatHeaders",wa).filter(t=>!t.subHeaders.length)}function Mr(e){let{start:t}=e.atoms.columnPinning?.get()??He(),o=e.getAllLeafColumnsById(),i=[];for(let r=0;r<t.length;r++){let n=o[t[r]];n&&i.push(n)}return i}function Or(e){let{end:t}=e.atoms.columnPinning?.get()??He(),o=e.getAllLeafColumnsById(),i=[];for(let r=0;r<t.length;r++){let n=o[t[r]];n&&i.push(n)}return i}function Tr(e){let{start:t,end:o}=e.atoms.columnPinning?.get()??He();if(!t.length&&!o.length)return e.getAllLeafColumns();let i=[...t,...o];return e.getAllLeafColumns().filter(r=>!i.includes(r.id))}function Ru(e,t){return t?t==="start"?R(e,"getStartLeafColumns",Mr):t==="end"?R(e,"getEndLeafColumns",Or):R(e,"getCenterLeafColumns",Tr):e.getAllLeafColumns()}function va(e){return R(e,"getStartLeafColumns",Mr).filter(t=>R(t,"getIsVisible",ge))}function ya(e){return R(e,"getEndLeafColumns",Or).filter(t=>R(t,"getIsVisible",ge))}function xa(e){return R(e,"getCenterLeafColumns",Tr).filter(t=>R(t,"getIsVisible",ge))}function tt(e,t){return t?t==="start"?R(e,"getStartVisibleLeafColumns",va):t==="end"?R(e,"getEndVisibleLeafColumns",ya):R(e,"getCenterVisibleLeafColumns",xa):R(e,"getVisibleLeafColumns",wt)}function Au(){return D()}function Ca(e,t){Mi(e)&&Oi(e.table,o=>{let i=Object.assign(D(),o),r=t??!R(e,"getIsVisible",ge),n=e.getLeafColumns();for(let a=0;a<n.length;a++){let s=n[a];Mi(s)&&(i[s.id]=r)}return i})}function ge(e){let t=e.table.atoms.columnVisibility?.get();if(!t)return!0;let o=e.columns;return o.length?o.some(i=>R(i,"getIsVisible",ge)):(Ce(t,e.id)?t[e.id]:void 0)??!0}function Mi(e){return(e.columnDef.enableHiding??!0)&&(e.table.options.enableHiding??!0)}function zu(e){return t=>{Ca(e,t.target.checked)}}function Lr(e){let t=e.getAllCells(),o=[];for(let d=0;d<t.length;d++){let h=t[d];R(h.column,"getIsVisible",ge)&&o.push(h)}let{start:i,end:r}=e.table.atoms.columnPinning?.get()??He();if(!i.length&&!r.length)return o;let n=R(e,"getVisibleCellsByColumnId",Zo),a=[];for(let d=0;d<i.length;d++){let h=n[i[d]];h&&a.push(h)}let s=[];for(let d=0;d<r.length;d++){let h=n[r[d]];h&&s.push(h)}let c=[];for(let d=0;d<o.length;d++){let h=o[d],m=h.column.id;!i.includes(m)&&!r.includes(m)&&c.push(h)}return[...a,...c,...s]}function Zo(e){let t=D(),o=e.getAllCells();for(let i=0;i<o.length;i++){let r=o[i];R(r.column,"getIsVisible",ge)&&(t[r.column.id]=r)}return t}function Fu(e){return e.getAllFlatColumns().filter(t=>R(t,"getIsVisible",ge))}function wt(e){return e.getAllLeafColumns().filter(t=>R(t,"getIsVisible",ge))}function Oi(e,t){Me(e,"columnVisibility",t)}function Du(e,t){Oi(e,t?D():Object.assign(D(),ae(e.initialState.columnVisibility??{})))}function Sa(e,t){t=t??!_a(e);let o=D(),i=e.getAllLeafColumns();for(let r=0;r<i.length;r++){let n=i[r];o[n.id]=t||!Mi(n)}Oi(e,o)}function _a(e){return!e.getAllLeafColumns().some(t=>!R(t,"getIsVisible",ge))}function Iu(e){return e.getAllLeafColumns().some(t=>R(t,"getIsVisible",ge))}function $u(e){return t=>{Sa(e,t.target.checked)}}function Mu(e,t=1){let o=t;for(let i=0;i<e.length;i++){let r=e[i];R(r,"getIsVisible",ge)&&r.columns.length&&(o=Math.max(o,Mu(r.columns,t+1)))}return o}function Xg(e,t){return e?`${e}_${t}`:String(t)}function Qg(e,t,o,i){let r=e??"";return t&&(r=r?`${r}_${t}`:String(t)),o&&(r=r?`${r}_${o}`:o),i&&(r=r?`${r}_${i}`:i),r}function Jg(e,t){let o=0;for(let i=0;i<e.length;i++)e[i].column===t&&o++;return o}function Ou(e,t,o,i,r,n){let a={depth:t,id:Xg(i,t),headers:[]},s=[];for(let c=0;c<e.length;c++){if(!(c in e))continue;let d=e[c],h=s[s.length-1],m=d.column.depth===a.depth,p,f=!1;if(m&&d.column.parent?p=d.column.parent:(p=d.column,f=!0),h&&h.column===p)h.subHeaders.push(d);else{let g=ma(o,p,{id:Qg(i,t,p.id,d.id),isPlaceholder:f,placeholderId:f?String(Jg(s,p)):void 0,depth:t,index:s.length});g.subHeaders.push(d),s.push(g)}a.headers.push(d),d.headerGroup=a}for(let c=0;c<n.length;c++)n[c](a);r.push(a),t>0&&Ou(s,t-1,o,i,r,n)}function Tu(e){for(let t=0;t<e.length;t++){let o=e[t];if(!R(o.column,"getIsVisible",ge))continue;let i=0;if(o.subHeaders.length){Tu(o.subHeaders);for(let r=0;r<o.subHeaders.length;r++){let n=o.subHeaders[r];R(n.column,"getIsVisible",ge)&&(i+=n.colSpan)}}else i=1;if(o.colSpan=i,o.isPlaceholder&&o.subHeaders.length===1&&o.subHeaders[0].column===o.column){let r=1,n=o.subHeaders[0];for(;n;)n.rowSpan=0,r++,n=n.subHeaders.length===1&&n.subHeaders[0].column===o.column?n.subHeaders[0]:void 0;o.rowSpan=r}else o.rowSpan=1}}function Fo(e,t,o,i){let r=Mu(e),n=[],a=o._headerGroupInstanceInitFns,s=new Array(t.length);for(let c=0;c<t.length;c++)c in t&&(s[c]=ma(o,t[c],{depth:r,index:c}));return Ou(s,r-1,o,i,n,a),n.reverse(),Tu(n[0]?.headers??[]),n}function Zg(e){if(!e._columnPrototype){e._columnPrototype={table:e};let t=Object.values(e._features);for(let o=0;o<t.length;o++)t[o].assignColumnPrototype?.(e._columnPrototype,e)}return e._columnPrototype}function Lu(e,t,o,i){let r={...e.getDefaultColumnDef(),...t},n=r.accessorKey,a=n===void 0?void 0:String(n),s=r.id??a?.replaceAll(".","_")??(typeof r.header=="string"?r.header:void 0),c;if(r.accessorFn)c=r.accessorFn;else if(n!==void 0)if(typeof n=="string"&&n.includes(".")){let p=n.split(".");c=f=>{let g=f;for(let w=0;w<p.length;w++){let x=p[w];g=g?.[x]}return g}}else c=p=>p[r.accessorKey];if(!s)throw new Error;let d=Zg(e),h=Object.create(d);h.accessorFn=c,h.columnDef=r,h.columns=[],h.depth=o,h.id=`${String(s)}`,h.parent=i;let m=e._columnInstanceInitFns;for(let p=0;p<m.length;p++)m[p](h);return h}function Pu(){return[]}function ka(e){let t=o=>{let i=D();for(let r=0;r<o.length;r++)i[o[r].id]=r;return i};return{all:t(tt(e)),center:t(tt(e,"center")),start:t(tt(e,"start")),end:t(tt(e,"end"))}}function Vu(e,t){return R(e.table,"getColumnIndexes",ka)[t==="start"?"start":t==="end"?"end":t==="center"?"center":"all"][e.id]??-1}function Bu(e,t){return tt(e.table,t)[0]?.id===e.id}function Hu(e,t){let o=tt(e.table,t);return o[o.length-1]?.id===e.id}function Ea(e,t){Me(e,"columnOrder",t)}function Nu(e,t){Ea(e,t?[]:ae(e.initialState.columnOrder??[]))}function Ti(e){let t=e.atoms.columnOrder?.get();return o=>{let i=[];if(!t?.length)i=o;else{let r=new Map;for(let n=0;n<o.length;n++){let a=o[n];r.set(a.id,a)}for(let n=0;n<t.length;n++){let a=t[n],s=r.get(a);s&&(i.push(s),r.delete(a))}for(let n=0;n<o.length;n++){let a=o[n];r.has(a.id)&&i.push(a)}}return eb(e,i)}}function eb(e,t){let o=e.atoms.grouping?.get()??[],{groupedColumnMode:i}=e.options;if(!o.length||!i)return t;let r=t.filter(s=>!o.includes(s.id));if(i==="remove")return r;let n=new Map;for(let s=0;s<t.length;s++){let c=t[s];n.set(c.id,c)}let a=[];for(let s=0;s<o.length;s++){let c=n.get(o[s]);c&&a.push(c)}return[...a,...r]}function qu(e){return[e,...e.columns.flatMap(t=>t.getFlatColumns())]}function Wu(e){if(e.columns.length){let t=e.columns.flatMap(o=>o.getLeafColumns());return R(e.table,"getOrderColumns",Ti)(t)}return[e]}function Uu(e){return{header:t=>{let o=t.header.column.columnDef;return o.accessorKey?o.accessorKey:o.accessorFn?o.id:null},cell:t=>t.renderValue()?.toString?.()??null,...Object.values(e._features).reduce((t,o)=>Object.assign(t,o.getDefaultColumnDef?.()),{}),...e.options.defaultColumn}}function ju(e,t,o,i=0){let r=new Array(t.length);for(let n=0;n<t.length;n++){if(!(n in t))continue;let a=t[n],s=Lu(e,a,i,o),c=a;s.columns=c.columns?ju(e,c.columns,s,i+1):[],r[n]=s}return r}function Gu(e){return ju(e,e.options.columns)}function Ku(e){return e.getAllColumns().flatMap(t=>t.getFlatColumns())}function Yu(e){let t=D(),o=e.getAllFlatColumns();for(let i=0;i<o.length;i++){let r=o[i];t[r.id]=r}return t}function Xu(e){let t=e.getAllColumns().flatMap(o=>o.getLeafColumns());return R(e,"getOrderColumns",Ti)(t)}function Qu(e){let t=D(),o=e.getAllLeafColumns();for(let i=0;i<o.length;i++){let r=o[i];t[r.id]=r}return t}function Do(e,t){return e.getAllFlatColumnsById()[t]}var Ju={assignColumnPrototype:(e,t)=>{j("coreColumnsFeature",e,t,{column_getFlatColumns:{fn:o=>qu(o),memoDeps:o=>[o.table.options.columns]},column_getLeafColumns:{fn:o=>Wu(o),memoDeps:o=>[o.table.atoms.columnOrder?.get(),o.table.atoms.grouping?.get(),o.table.options.columns,o.table.options.groupedColumnMode]}})},constructTableAPIs:e=>{Z("coreColumnsFeature",e,{table_getDefaultColumnDef:{fn:()=>Uu(e),memoDeps:()=>[e.options.defaultColumn]},table_getAllColumns:{fn:()=>Gu(e),memoDeps:()=>[e.options.columns]},table_getAllFlatColumns:{fn:()=>Ku(e),memoDeps:()=>[e.options.columns]},table_getAllFlatColumnsById:{fn:()=>Yu(e),memoDeps:()=>[e.options.columns]},table_getAllLeafColumns:{fn:()=>Xu(e),memoDeps:()=>[e.atoms.columnOrder?.get(),e.atoms.grouping?.get(),e.options.columns,e.options.groupedColumnMode]},table_getAllLeafColumnsById:{fn:()=>Qu(e),memoDeps:()=>[e.getAllLeafColumns()]},table_getColumn:{fn:t=>Do(e,t)}})}};function Zu(e,t){for(let o=0;o<e.subHeaders.length;o++)Zu(e.subHeaders[o],t);t.push(e)}function eh(e){let t=[];return Zu(e,t),t}function th(e){return{column:e.column,header:e,table:e.column.table}}function oh(e){let{start:t,end:o}=e.atoms.columnPinning?.get()??He(),i=e.getAllColumns(),r=R(e,"getVisibleLeafColumns",wt);if(!t.length&&!o.length)return Fo(i,r,e);let n=e.getAllLeafColumnsById(),a=[];for(let d=0;d<t.length;d++){let h=n[t[d]];h&&R(h,"getIsVisible",ge)&&a.push(h)}let s=[];for(let d=0;d<o.length;d++){let h=n[o[d]];h&&R(h,"getIsVisible",ge)&&s.push(h)}let c=r.filter(d=>!t.includes(d.id)&&!o.includes(d.id));return Fo(i,[...a,...c,...s],e)}function ih(e){return[...e.getHeaderGroups()].reverse()}function rh(e){let t=e.getHeaderGroups(),o=[];for(let i=0;i<t.length;i++){let r=t[i].headers;for(let n=0;n<r.length;n++)o.push(r[n])}return o}function nh(e){let t=e.getHeaderGroups()[0]?.headers??[],o=[];for(let i=0;i<t.length;i++){let r=t[i].getLeafHeaders();for(let n=0;n<r.length;n++)o.push(r[n])}return o}var ah={assignHeaderPrototype:(e,t)=>{j("coreHeadersFeature",e,t,{header_getLeafHeaders:{fn:o=>eh(o),memoDeps:o=>[o.column.table.options.columns]},header_getContext:{fn:o=>th(o),memoDeps:o=>[o.column.table.options.columns]}})},constructTableAPIs:e=>{Z("coreHeadersFeature",e,{table_getHeaderGroups:{fn:()=>oh(e),memoDeps:()=>[e.options.columns,e.atoms.columnOrder?.get(),e.atoms.grouping?.get(),e.atoms.columnPinning?.get(),e.atoms.columnVisibility?.get(),e.options.groupedColumnMode]},table_getFooterGroups:{fn:()=>ih(e),memoDeps:()=>[e.getHeaderGroups()]},table_getFlatHeaders:{fn:()=>rh(e),memoDeps:()=>[e.getHeaderGroups()]},table_getLeafHeaders:{fn:()=>nh(e),memoDeps:()=>[e.getHeaderGroups()]}})}};function tb(e){if(!e._rowPrototype){e._rowPrototype={table:e};let t=Object.values(e._features);for(let o=0;o<t.length;o++)t[o].assignRowPrototype?.(e._rowPrototype,e)}return e._rowPrototype}var Io=(e,t,o,i,r,n,a)=>{let s=tb(e),c=Object.create(s);c._displayIndexCache=-1,c._uniqueValuesCache=D(),c._valuesCache=D(),c.depth=r,c.id=t,c.index=i,c.original=o,c.parentId=a,c.subRows=n??[];let d=e._rowInstanceInitFns;for(let h=0;h<d.length;h++)d[h](c);return c};var Aa=/([0-9]+)/gm;function $o(e){let t=Object.assign((o,i,r)=>{let n=o.getValue(r),a=i.getValue(r),s=t.resolveDataValue;return s&&(n=s(n),a=s(a)),t.sort(n,a,o,i,r)},e);return t}var za=$o({resolveDataValue:e=>Vr(e).toLowerCase(),sort:(e,t)=>ch(e,t)}),Fa=$o({resolveDataValue:e=>Vr(e),sort:(e,t)=>ch(e,t)}),Da=$o({resolveDataValue:e=>Vr(e).toLowerCase(),sort:(e,t)=>Ma(e,t)}),Ia=$o({resolveDataValue:e=>Vr(e),sort:(e,t)=>Ma(e,t)}),$a=$o({resolveDataValue:e=>ob(e),sort:(e,t)=>e>t?1:e<t?-1:0}),ei=$o({sort:(e,t)=>Ma(e,t)});function Ma(e,t){return e===t?0:e>t?1:-1}function ob(e){return e instanceof Date?e.getTime():e}function Vr(e){return typeof e=="number"?isNaN(e)||e===1/0||e===-1/0?"":String(e):typeof e=="string"?e:""}function ch(e,t){let o=0,i=0,r=e.length,n=t.length;for(;o<r&&i<n;){let a=Pr(e.charCodeAt(o)),s=Pr(t.charCodeAt(i)),c=Ra(e,o,a),d=Ra(t,i,s);if(!a&&!s){let m=ib(e,o,c,t,i,d);if(m)return m;o=c,i=d;continue}if(a!==s)return a?1:-1;let h=rb(e,o,c,t,i,d);if(h)return h;o=c,i=d}return lh(e,o)-lh(t,i)}function Pr(e){return e>=48&&e<=57}function Ra(e,t,o){let i=t+1;for(;i<e.length&&Pr(e.charCodeAt(i))===o;)i++;return i}function ib(e,t,o,i,r,n){let a=o-t,s=n-r,c=a<s?a:s;for(let d=0;d<c;d++){let h=e.charCodeAt(t+d),m=i.charCodeAt(r+d);if(h>m)return 1;if(m>h)return-1}return a>s?1:s>a?-1:0}function rb(e,t,o,i,r,n){let a=t;for(;a<o&&e.charCodeAt(a)===48;)a++;let s=r;for(;s<n&&i.charCodeAt(s)===48;)s++;let c=o-a,d=n-s;if(c===0&&d===0)return 0;if(c<=15&&d<=15){let p=sh(e,a,o),f=sh(i,s,n);return p>f?1:f>p?-1:0}let h=parseInt(e.slice(t,o),10),m=parseInt(i.slice(r,n),10);return h>m?1:m>h?-1:0}function sh(e,t,o){let i=0;for(let r=t;r<o;r++)i=i*10+e.charCodeAt(r)-48;return i}function lh(e,t){let o=0,i=t;for(;i<e.length;)o++,i=Ra(e,i,Pr(e.charCodeAt(i)));return o}function dh(){return[]}function nb(e,t){Me(e,"cellSelection",t?dh():ae(e.initialState.cellSelection)??dh())}function uh(e){e.atoms.cellSelection&&(e.options.autoResetAll??e.options.autoResetCellSelection??!0)&&e._reactivity.schedule(()=>nb(e))}function hh(){return D()}function ti(e){e.atoms.expanded&&(e.options.autoResetAll??e.options.autoResetExpanded??!e.options.manualExpanding)&&e._reactivity.schedule(()=>La(e))}function Li(e,t){e.options.onExpandedChange?.(t)}function Ta(e,t){let o=e.atoms.expanded?.get()??{};if(t??!Va(e)){if(o===!0||!Pa(e))return;Li(e,!0)}else{if(o!==!0&&!Object.keys(o).length)return;Li(e,D())}}function La(e,t){let o=e.initialState.expanded;Me(e,"expanded",t?D():o===!0?!0:Object.assign(D(),ae(o??{})))}function Pa(e){return e.getPrePaginatedRowModel().flatRows.some(t=>so(t))}function ph(e){return t=>{Ta(e)}}function mh(e){let t=e.atoms.expanded?.get()??{};return t===!0||Object.values(t).some(Boolean)}function Va(e){let t=e.atoms.expanded?.get()??{};if(t===!0)return!0;if(!Object.keys(t).length)return!1;let o=e.getRowModel().flatRows.filter(i=>so(i));return!(!o.length||o.some(i=>!oi(i)))}function fh(e){let t=0,o=e.atoms.expanded?.get();return(o===!0?Object.values(e.getRowModel().rowsById).filter(i=>so(i)).map(i=>i.id):Object.keys(o??{})).forEach(i=>{let r=i.split(".");t=Math.max(t,r.length)}),t}function Ba(e,t){let o=e.table.atoms.expanded?.get()??{},i=o===!0||Oa(o,e.id),r=t??!i;r!==i&&(r&&!so(e)||Li(e.table,n=>{let a=n===!0?!0:Oa(n,e.id),s=D();if(n===!0?Object.values(e.table.getRowModel().rowsById).forEach(c=>{so(c)&&(s[c.id]=!0)}):s=Object.assign(D(),n),!a&&r)return s[e.id]=!0,s;if(a&&!r){let c=D(),d=Object.keys(s);for(let h=0;h<d.length;h++){let m=d[h];m!==e.id&&s[m]&&(c[m]=!0)}return c}return n}))}function oi(e){let t=e.table.atoms.expanded?.get()??{};return!!(e.table.options.getIsRowExpanded?.(e)??(t===!0||Oa(t,e.id)))}function Oa(e,t){return!!(e&&e!==!0&&Ce(e,t)&&e[t])}function so(e){return e.table.options.getRowCanExpand?.(e)??((e.table.options.enableExpanding??!0)&&!!e.subRows.length)}function gh(e){let t=!0,o=e;for(;t&&o.parentId;)o=e.table.getRow(o.parentId,!0),t=oi(o);return t}function bh(e){let t=so(e);return()=>{t&&Ba(e)}}var Mo=0,Br=10;function ii(){return{pageIndex:Mo,pageSize:Br}}function zt(e){if(e.options.autoResetAll??e.options.autoResetPageIndex??!e.options.manualPagination){if((e.atoms.pagination?.get()?.pageIndex??Mo)===Mo)return;Ha(e,!0)}}function Pi(e,t){Me(e,"pagination",t)}function wh(e,t){Pi(e,t?ii():ae(e.initialState.pagination??ii()))}function Oo(e,t){Pi(e,o=>{let i=nt(t,o.pageIndex),r=typeof e.options.pageCount>"u"||e.options.pageCount===-1?Number.MAX_SAFE_INTEGER:e.options.pageCount-1;return i=Math.max(0,Math.min(i,r)),{...o,pageIndex:i}})}function Ha(e,t){Oo(e,t?Mo:e.initialState.pagination?.pageIndex??Mo)}function vh(e,t){Na(e,t?Br:e.initialState.pagination?.pageSize??Br)}function Na(e,t){Pi(e,o=>{let i=Math.max(1,nt(t,o.pageSize)),r=o.pageSize===1/0?0:o.pageSize*o.pageIndex,n=i===1/0?0:Math.floor(r/i);return{...o,pageIndex:n,pageSize:i}})}function yh(e){let t=ri(e),o=[];return t&&t>0&&(o=[...new Array(t)].fill(null).map((i,r)=>r)),o}function xh(e){return(e.atoms.pagination?.get()?.pageIndex??0)>0}function Ch(e){let t=e.atoms.pagination?.get()?.pageIndex??Mo,o=ri(e);return o===-1?!0:o===0?!1:t<o-1}function Sh(e){let t=e.atoms.pagination?.get()?.pageIndex??Mo,o=ri(e);return Number.isFinite(o)&&o>0&&t<o-1}function _h(e){return Oo(e,t=>t-1)}function kh(e){return Oo(e,t=>t+1)}function Eh(e){return Oo(e,0)}function Rh(e){let t=ri(e);if(!(!Number.isFinite(t)||t<=0))return Oo(e,t-1)}function ri(e){let t=e.options.pageCount;if(t!=null)return t;let o=qa(e),i=e.atoms.pagination?.get()?.pageSize??Br;return i===1/0&&Number.isFinite(o)&&o>0?1:Math.ceil(o/i)}function qa(e){return e.options.rowCount??e.getPrePaginatedRowModel().rows.length}function Ah(){return[]}function Bi(e,t){Me(e,"sorting",t)}function Wa(e,t){Bi(e,t?[]:ae(e.initialState.sorting??[]))}function zh(e){e.atoms.sorting&&(e.options.autoResetAll??e.options.autoResetSorting??!1)&&Wa(e)}function Ua(e){let t=e.table._rowModelFns.sortFns,o=e.table.getFilteredRowModel().flatRows.slice(0,10),i,r=!1;for(let n=0;n<o.length;n++){let a=o[n].getValue(e.id);if(Object.prototype.toString.call(a)==="[object Date]"){i="datetime";break}if(typeof a=="string"&&(r=!0,a.split(Aa).length>1)){i="alphanumeric";break}}if(!i&&r&&(i="text"),i){let n=t?.[i];if(n||i==="alphanumeric"&&(n=t?.text),n)return n}return ei}function ja(e){let t=e.table.getFilteredRowModel().flatRows.slice(0,10);for(let o=0;o<t.length;o++){let i=t[o].getValue(e.id);if(i!=null)return typeof i=="string"?"asc":"desc"}return"desc"}function Hr(e){let t=e.table._rowModelFns.sortFns;return Ao(e.columnDef.sortFn)?e.columnDef.sortFn:e.columnDef.sortFn==="auto"?Ua(e):t?.[e.columnDef.sortFn]??ei}function Ga(e,t,o){let i=Ya(e,o&&Vi(e)),r=typeof t<"u";Bi(e.table,n=>{let a=n.findIndex(p=>p.id===e.id),s=a===-1?void 0:n[a],c=[],d,h=r?t:i==="desc",m=!!(n.length&&Vi(e)&&o);return m?s?d="toggle":d="add":s?d="toggle":d="replace",d==="toggle"&&(r||i||(d="remove")),d==="add"?(c=[...n,{id:e.id,desc:h}],c.splice(0,c.length-(e.table.options.maxMultiSortColCount??Number.MAX_SAFE_INTEGER))):d==="toggle"?c=m?n.map(p=>p.id===e.id?{...p,desc:h}:p):[{id:e.id,desc:h}]:d==="remove"?c=m?n.filter(p=>p.id!==e.id):[]:c=[{id:e.id,desc:h}],c})}function Ka(e){return e.columnDef.sortDescFirst??e.table.options.sortDescFirst??ja(e)==="desc"?"desc":"asc"}function Ya(e,t){let o=Ka(e),i=Xa(e);return i?i!==o&&(e.table.options.enableSortingRemoval??!0)&&(!t||(e.table.options.enableMultiRemove??!0))?!1:i==="desc"?"asc":"desc":o}function Hi(e){return(e.columnDef.enableSorting??!0)&&(e.table.options.enableSorting??!0)&&!!e.accessorFn}function Vi(e){return e.columnDef.enableMultiSort??e.table.options.enableMultiSort??!!e.accessorFn}function Xa(e){let t=e.table.atoms.sorting?.get()?.find(o=>o.id===e.id);return t?t.desc?"desc":"asc":!1}function Fh(e){return e.table.atoms.sorting?.get()?.findIndex(t=>t.id===e.id)??-1}function Dh(e){Bi(e.table,t=>t.length?t.filter(o=>o.id!==e.id):[])}function Ih(e){let t=Hi(e);return o=>{t&&Ga(e,void 0,Vi(e)?e.table.options.isMultiSortEvent?.(o):!1)}}function $h(){return e=>Re({feature:"coreRowModelsFeature",table:e,fnName:"table.getCoreRowModel",memoDeps:()=>[e.options.data],fn:()=>ab(e,e.options.data),onAfterUpdate:zo(()=>{ti(e),zt(e),zh(e),uh(e)})})}function Mh(e,t,o,i=0,r){let n=[];for(let a=0;a<o.length;a++){let s=o[a],c=Io(e,e.getRowId(s,a,r),s,a,i,void 0,r?.id);t.flatRows.push(c),t.rowsById[c.id]=c,n.push(c),e.options.getSubRows&&(c.originalSubRows=e.options.getSubRows(s,a),c.originalSubRows?.length&&(c.subRows=Mh(e,t,c.originalSubRows,i+1,c)))}return n}function ab(e,t){let o={rows:[],flatRows:[],rowsById:D()};return o.rows=Mh(e,o,t),o}function Oh(e){return e._rowModels.coreRowModel||(e._rowModels.coreRowModel=e.options.features.coreRowModel?.(e)??$h()(e)),e._rowModels.coreRowModel()}function Th(e){return e.getCoreRowModel()}function Lh(e){return e._rowModels.filteredRowModel||(e._rowModels.filteredRowModel=e.options.features.filteredRowModel?.(e)),e.options.manualFiltering||!e._rowModels.filteredRowModel?e.getPreFilteredRowModel():e._rowModels.filteredRowModel()}function Ph(e){return e.getFilteredRowModel()}function Vh(e){return e._rowModels.groupedRowModel||(e._rowModels.groupedRowModel=e.options.features.groupedRowModel?.(e)),e.options.manualGrouping||!e._rowModels.groupedRowModel?e.getPreGroupedRowModel():e._rowModels.groupedRowModel()}function Bh(e){return e.getGroupedRowModel()}function Hh(e){return e._rowModels.sortedRowModel||(e._rowModels.sortedRowModel=e.options.features.sortedRowModel?.(e)),e.options.manualSorting||!e._rowModels.sortedRowModel?e.getPreSortedRowModel():e._rowModels.sortedRowModel()}function Nh(e){return e.getSortedRowModel()}function qh(e){return e._rowModels.expandedRowModel||(e._rowModels.expandedRowModel=e.options.features.expandedRowModel?.(e)),e.options.manualExpanding||!e._rowModels.expandedRowModel?e.getPreExpandedRowModel():e._rowModels.expandedRowModel()}function Wh(e){return e.getExpandedRowModel()}function Uh(e){return e._rowModels.paginatedRowModel||(e._rowModels.paginatedRowModel=e.options.features.paginatedRowModel?.(e)),e.options.manualPagination||!e._rowModels.paginatedRowModel?e.getPrePaginatedRowModel():e._rowModels.paginatedRowModel()}function jh(e){return e.getPaginatedRowModel()}var Gh={constructTableAPIs:e=>{Z("coreRowModelsFeature",e,{table_getCoreRowModel:{fn:()=>Oh(e)},table_getPreFilteredRowModel:{fn:()=>Th(e)},table_getFilteredRowModel:{fn:()=>Lh(e)},table_getPreGroupedRowModel:{fn:()=>Ph(e)},table_getGroupedRowModel:{fn:()=>Vh(e)},table_getPreSortedRowModel:{fn:()=>Bh(e)},table_getSortedRowModel:{fn:()=>Hh(e)},table_getPreExpandedRowModel:{fn:()=>Nh(e)},table_getExpandedRowModel:{fn:()=>qh(e)},table_getPrePaginatedRowModel:{fn:()=>Wh(e)},table_getPaginatedRowModel:{fn:()=>Uh(e)},table_getRowModel:{fn:()=>jh(e)}})}};function sb(e){if(!e._cellPrototype){e._cellPrototype={table:e};let t=Object.values(e._features);for(let o=0;o<t.length;o++)t[o].assignCellPrototype?.(e._cellPrototype,e)}return e._cellPrototype}function Kh(e,t,o){let i=sb(o),r=Object.create(i);r.column=e,r.id=`${t.id}_${e.id}`,r.row=t;let n=o._cellInstanceInitFns;for(let a=0;a<n.length;a++)n[a](r);return r}function Yh(e){let t=e.table.getRowsInDisplayOrder(),o=e._displayIndexCache;return t[o]===e?o:-1}function Xh(e){let t=e.getPrePaginatedRowModel().rows;if(e.options.paginateExpandedRows===!1){let o=[],i=r=>{r._displayIndexCache=o.length,o.push(r),r.subRows.length&&r.getIsExpanded?.()&&r.subRows.forEach(i)};return t.forEach(i),o}for(let o=0;o<t.length;o++)t[o]._displayIndexCache=o;return t}function Qh(e,t){if(Ce(e._valuesCache,t))return e._valuesCache[t];let o=e.table.getColumn(t);if(o?.accessorFn)return e._valuesCache[t]=o.accessorFn(e.original,e.index),e._valuesCache[t]}function Jh(e,t){if(Ce(e._uniqueValuesCache,t))return e._uniqueValuesCache[t];let o=e.table.getColumn(t);if(o?.accessorFn)return o.columnDef.getUniqueValues?(e._uniqueValuesCache[t]=o.columnDef.getUniqueValues(e.original,e.index),e._uniqueValuesCache[t]):(e._uniqueValuesCache[t]=[e.getValue(t)],e._uniqueValuesCache[t])}function Zh(e,t){return e.getValue(t)??e.table.options.renderFallbackValue}function ep(e){return ha(e.subRows,t=>t.subRows)}function tp(e){let t=e.getCoreRowModel().flatRows,o=0;for(let i=0;i<t.length;i++)o=Math.max(o,t[i].depth);return o}function op(e){if(e.parentId)return e.table.getCoreRowModel().rowsById[e.parentId]??e.table.getRow(e.parentId,!0)}function ip(e){let t=[],o=e;for(;;){let i=o.getParentRow();if(!i)break;t.push(i),o=i}return t.reverse()}function rp(e){let t=e.table.getAllLeafColumns(),o=e._cellsCache;o||(o=e._cellsCache=new WeakMap);let i=new Array(t.length);for(let r=0;r<t.length;r++){let n=t[r],a=o.get(n);a||(a=Kh(n,e,e.table),o.set(n,a)),i[r]=a}return i}function np(e){let t=D(),o=e.getAllCells();for(let i=0;i<o.length;i++){let r=o[i];t[r.column.id]=r}return t}function ap(e,t,o,i){return t.options.getRowId?.(e,o,i)??(i?`${i.id}.${o}`:String(o))}function sp(e,t,o){let i=(o?e.getPrePaginatedRowModel():e.getRowModel()).rowsById[t];if(!i&&(i=e.getCoreRowModel().rowsById[t],!i))throw new Error;return i}var lp={assignRowPrototype:(e,t)=>{j("coreRowsFeature",e,t,{row_getDisplayIndex:{fn:o=>Yh(o)},row_getAllCellsByColumnId:{fn:o=>np(o),memoDeps:o=>[o.getAllCells()]},row_getAllCells:{fn:o=>rp(o),memoDeps:o=>[o.table.getAllLeafColumns()]},row_getLeafRows:{fn:o=>ep(o),memoDeps:o=>[o.subRows]},row_getParentRow:{fn:o=>op(o)},row_getParentRows:{fn:o=>ip(o)},row_getUniqueValues:{fn:(o,i)=>Jh(o,i)},row_getValue:{fn:(o,i)=>Qh(o,i)},row_renderValue:{fn:(o,i)=>Zh(o,i)}})},constructTableAPIs:e=>{Z("coreRowsFeature",e,{table_getRowsInDisplayOrder:{fn:()=>Xh(e),memoDeps:()=>[e.getPrePaginatedRowModel().rows,e.options.paginateExpandedRows,e.options.paginateExpandedRows===!1?e.atoms.expanded?.get():void 0]},table_getRowId:{fn:(t,o,i)=>ap(t,e,o,i)},table_getRow:{fn:(t,o)=>sp(e,t,o)},table_getMaxSubRowDepth:{fn:()=>tp(e),memoDeps:()=>[e.getCoreRowModel()]}})}};function Qa(e,t,o=(i,r)=>i===r){let i=t===void 0?e.options.state:t;e._reactivity.batch(()=>{if(i)for(let r in i){let n=e.baseAtoms[r];if(!n)continue;let a=i[r],s=a===void 0?e.initialState[r]:a;o(e._reactivity.untrack(()=>n.get()),s)||n.set(()=>s)}})}function lb(e,t,o=(i,r)=>i===r){e._reactivity.batch(()=>{Qa(e,t,o),e._reactivity.commit?.()})}function cp(e){let t=ae(e.initialState);e._reactivity.batch(()=>{let i=Object.keys(t);for(let r=0;r<i.length;r++){let n=i[r];e.baseAtoms[n].set(t[n])}});let o=Object.values(e._features);for(let i=0;i<o.length;i++)o[i].resetTableInstanceData?.(e)}function cb(e,t){let{features:o,atoms:i,initialState:r}=e.options;if(!e.options.mergeOptions)return{...e.options,...t,features:o,atoms:i,initialState:r};let n=e.options.mergeOptions(e.options,t),a={...Object.getOwnPropertyDescriptors(n)};return Object.defineProperties(Object.create(Object.getPrototypeOf(n)),{...a,features:{value:o,enumerable:!0,configurable:!0,writable:!0},atoms:{value:i,enumerable:!0,configurable:!0,writable:!0},initialState:{value:r,enumerable:!0,configurable:!0,writable:!0}})}function dp(e,t,o){let i=cb(e,nt(t,e.options));e.optionsStore?e.optionsStore.set(()=>i):e.options=i,o?.syncExternalState!==!1&&lb(e,i.state??null)}var up={constructTableAPIs:e=>{Z("coreTablesFeature",e,{table_reset:{fn:()=>cp(e)},table_setOptions:{fn:t=>dp(e,t)}})}};var hp={coreCellsFeature:hu,coreColumnsFeature:Ju,coreHeadersFeature:ah,coreRowModelsFeature:Gh,coreRowsFeature:lp,coreTablesFeature:up};function pp(e){let t=e;return Object.defineProperty(e,"state",{get(){return e.get()}}),"set"in e&&(t.setState=e.set.bind(e)),t}function mp({update:e,notify:t,unwatched:o}){return{link:i,unlink:r,propagate:n,checkDirty:a,shallowPropagate:s};function i(d,h,m){let p=h.depsTail;if(p!==void 0&&p.dep===d)return;let f=p!==void 0?p.nextDep:h.deps;if(f!==void 0&&f.dep===d){f.version=m,h.depsTail=f;return}let g=d.subsTail;if(g!==void 0&&g.version===m&&g.sub===h)return;let w=h.depsTail=d.subsTail={version:m,dep:d,sub:h,prevDep:p,nextDep:f,prevSub:g,nextSub:void 0};f!==void 0&&(f.prevDep=w),p!==void 0?p.nextDep=w:h.deps=w,g!==void 0?g.nextSub=w:d.subs=w}function r(d,h=d.sub){let m=d.dep,p=d.prevDep,f=d.nextDep,g=d.nextSub,w=d.prevSub;return f!==void 0?f.prevDep=p:h.depsTail=p,p!==void 0?p.nextDep=f:h.deps=f,g!==void 0?g.prevSub=w:m.subsTail=w,w!==void 0?w.nextSub=g:(m.subs=g)===void 0&&o(m),f}function n(d){let h=d.nextSub,m;e:do{let p=d.sub,f=p.flags;if(f&60?f&12?f&4?!(f&48)&&c(d,p)?(p.flags=f|40,f&=1):f=0:p.flags=f&-9|32:f=0:p.flags=f|32,f&2&&t(p),f&1){let g=p.subs;if(g!==void 0){let w=(d=g).nextSub;w!==void 0&&(m={value:h,prev:m},h=w);continue}}if((d=h)!==void 0){h=d.nextSub;continue}for(;m!==void 0;)if(d=m.value,m=m.prev,d!==void 0){h=d.nextSub;continue e}break}while(!0)}function a(d,h){let m,p=0,f=!1;e:do{let g=d.dep,w=g.flags;if(h.flags&16)f=!0;else if((w&17)===17){if(e(g)){let x=g.subs;x.nextSub!==void 0&&s(x),f=!0}}else if((w&33)===33){(d.nextSub!==void 0||d.prevSub!==void 0)&&(m={value:d,prev:m}),d=g.deps,h=g,++p;continue}if(!f){let x=d.nextDep;if(x!==void 0){d=x;continue}}for(;p--;){let x=h.subs,y=x.nextSub!==void 0;if(y?(d=m.value,m=m.prev):d=x,f){if(e(h)){y&&s(x),h=d.sub;continue}f=!1}else h.flags&=-33;h=d.sub;let C=d.nextDep;if(C!==void 0){d=C;continue e}}return f}while(!0)}function s(d){do{let h=d.sub,m=h.flags;(m&48)===32&&(h.flags=m|16,(m&6)===2&&t(h))}while((d=d.nextSub)!==void 0)}function c(d,h){let m=h.depsTail;for(;m!==void 0;){if(m===d)return!0;m=m.prevDep}return!1}}function bp(e,t,o){let i=typeof e=="object",r=i?e:void 0;return{next:(i?e.next:e)?.bind(r),error:(i?e.error:t)?.bind(r),complete:(i?e.complete:o)?.bind(r)}}var Ja=[],qr=0,{link:fp,unlink:db,propagate:ub,checkDirty:wp,shallowPropagate:gp}=mp({update(e){return e._update()},notify(e){Ja[Za++]=e,e.flags&=-3},unwatched(e){e.depsTail!==void 0&&(e.depsTail=void 0,e.flags=17,Wr(e))}}),Nr=0,Za=0,Ft,es=0;function ts(e){try{++es,e()}finally{--es||os()}}function Wr(e){let t=e.depsTail,o=t!==void 0?t.nextDep:e.deps;for(;o!==void 0;)o=db(o,e)}function os(){if(!(es>0)){for(;Nr<Za;){let e=Ja[Nr];Ja[Nr++]=void 0,e.notify()}Nr=0,Za=0}}function Ur(e,t){let o=typeof e=="function",i=e,r={_snapshot:o?void 0:e,subs:void 0,subsTail:void 0,deps:void 0,depsTail:void 0,flags:o?0:1,get(){return Ft!==void 0&&fp(r,Ft,qr),r._snapshot},subscribe(n){let a=bp(n),s={current:!1},c=hb(()=>{r.get(),s.current?a.next?.(r._snapshot):s.current=!0});return{unsubscribe:()=>{c.stop()}}},_update(n){let a=Ft,s=t?.compare??Object.is;if(o)Ft=r,++qr,r.depsTail=void 0;else if(n===void 0)return!1;o&&(r.flags=5);try{let c=r._snapshot,d=typeof n=="function"?n(c):n===void 0&&o?i(c):n;return c===void 0||!s(c,d)?(r._snapshot=d,!0):!1}finally{Ft=a,o&&(r.flags&=-5),Wr(r)}}};return o?(r.flags=17,r.get=function(){let n=r.flags;if(n&16||n&32&&wp(r.deps,r)){if(r._update()){let a=r.subs;a!==void 0&&gp(a)}}else n&32&&(r.flags=n&-33);return Ft!==void 0&&fp(r,Ft,qr),r._snapshot}):r.set=function(n){if(r._update(n)){let a=r.subs;a!==void 0&&(ub(a),gp(a),os())}},r}function hb(e){let t=()=>{let i=Ft;Ft=o,++qr,o.depsTail=void 0,o.flags=6;try{return e()}finally{Ft=i,o.flags&=-5,Wr(o)}},o={deps:void 0,depsTail:void 0,subs:void 0,subsTail:void 0,flags:6,notify(){let i=this.flags;i&16||i&32&&wp(this.deps,this)?t():this.flags=2},stop(){this.flags=0,this.depsTail=void 0,Wr(this)}};return t(),o}function is(e,t){if(Object.is(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;if(e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(let[i,r]of e)if(!t.has(i)||!Object.is(r,t.get(i)))return!1;return!0}if(e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(let i of e)if(!t.has(i))return!1;return!0}if(e instanceof Date&&t instanceof Date)return e.getTime()===t.getTime();let o=vp(e);if(o.length!==vp(t).length)return!1;for(let i=0;i<o.length;i++)if(!Object.prototype.hasOwnProperty.call(t,o[i])||!Object.is(e[o[i]],t[o[i]]))return!1;return!0}function vp(e){return Object.keys(e).concat(Object.getOwnPropertySymbols(e))}function yp(e,t={}){return Object.values(e).forEach(o=>{t=o.getInitialState?.(t)??t}),ae(t)}function rs(e){let t=e.features.coreReactivityFeature,{aggregationFns:o,columnMeta:i,coreRowModel:r,expandedRowModel:n,facetedMinMaxValues:a,facetedRowModel:s,facetedUniqueValues:c,filterFns:d,filterMeta:h,filteredRowModel:m,groupedRowModel:p,paginatedRowModel:f,sortFns:g,sortedRowModel:w,tableMeta:x,...y}=e.features,C={_cellInstanceInitFns:[],_columnInstanceInitFns:[],_features:{...hp,...y},_headerGroupInstanceInitFns:[],_headerInstanceInitFns:[],_reactivity:t,_rowInstanceInitFns:[],_rowModelFns:{aggregationFns:o,filterFns:d,sortFns:g},_rowModels:{},atoms:{},baseAtoms:{}},L=Object.values(C._features),M={...L.reduce((A,v)=>Object.assign(A,v.getDefaultTableOptions?.(C)),{}),...e};if(t.wrapExternalAtoms&&M.atoms)for(let[A,v]of Object.entries(M.atoms)){let O=v,Y=t.createWritableAtom(O.get(),{debugName:`externalAtom/${A}`});M.atoms[A]=Y;let U=!1,he=O.subscribe(pe=>{U||Y.set(pe)}),Q=Y.subscribe(pe=>{U=!0,O.set(pe),U=!1});t.addSubscription(he),t.addSubscription(Q)}t.createOptionsStore?(C.optionsStore=t.createWritableAtom(M,{debugName:"table/optionsStore"}),Object.defineProperty(C,"options",{configurable:!0,enumerable:!0,get(){return C.optionsStore.get()},set(A){C.optionsStore.set(()=>A)}})):C.options=M,C.initialState=yp(C._features,C.options.initialState);let $=Object.keys(C.initialState);for(let A=0;A<$.length;A++){let v=$[A];C.baseAtoms[v]=t.createWritableAtom(C.initialState[v],{debugName:`table/baseAtoms/${v}`}),C.atoms[v]=t.createReadonlyAtom(()=>{let O=C.options,Y=O.atoms?.[v],U=Y?Y.get():C.baseAtoms[v].get();if(Y)return U;let he=O.state;if(he&&Ce(he,v)){let Q=he[v];return Q===void 0?C.initialState[v]:Q}return U},{debugName:`table/atoms/${v}`})}Qa(C),C.store=pp(t.createReadonlyAtom(()=>{let A={};for(let v=0;v<$.length;v++){let O=$[v];A[O]=C.atoms[O].get()}return A},{compare:is,debugName:"table/store"}));for(let A=0;A<L.length;A++){let v=L[A];v.initTableInstanceData?.(C),v.initCellInstanceData&&C._cellInstanceInitFns.push(v.initCellInstanceData.bind(v)),v.initColumnInstanceData&&C._columnInstanceInitFns.push(v.initColumnInstanceData.bind(v)),v.initHeaderGroupInstanceData&&C._headerGroupInstanceInitFns.push(v.initHeaderGroupInstanceData.bind(v)),v.initHeaderInstanceData&&C._headerInstanceInitFns.push(v.initHeaderInstanceData.bind(v)),v.initRowInstanceData&&C._rowInstanceInitFns.push(v.initRowInstanceData.bind(v)),v.constructTableAPIs?.(C)}return C}function xp(e,t){let o=t._rowModels.facetedMinMaxValues??=D(),i=o[e.id];return i||(i=o[e.id]=t.options.features.facetedMinMaxValues?.(t,e.id)??(()=>{})),i()}function ni(e,t){let o=e?.id??"",i=t._rowModels.facetedRowModels??=D(),r=i[o];return r||(r=i[o]=t.options.features.facetedRowModel?.(t,o)??(()=>t.getPreFilteredRowModel())),r()}function Cp(e,t){let o=t._rowModels.facetedUniqueValues??=D(),i=o[e.id];return i||(i=o[e.id]=t.options.features.facetedUniqueValues?.(t,e.id)??Sp()),i()}function Sp(){let e=new Map;return()=>e}function _p(e){e._rowModels.globalFacetedMinMaxValues||(e._rowModels.globalFacetedMinMaxValues=e.options.features.facetedMinMaxValues?.(e,"__global__")??(()=>{}));let t=e._rowModels.globalFacetedMinMaxValues;return t()}function ai(e){e._rowModels.globalFacetedRowModel||(e._rowModels.globalFacetedRowModel=e.options.features.facetedRowModel?.(e,"__global__")??(()=>e.getPreFilteredRowModel()));let t=e._rowModels.globalFacetedRowModel;return t()}function kp(e){e._rowModels.globalFacetedUniqueValues||(e._rowModels.globalFacetedUniqueValues=e.options.features.facetedUniqueValues?.(e,"__global__")??Sp());let t=e._rowModels.globalFacetedUniqueValues;return t()}var ns={assignColumnPrototype:(e,t)=>{j("columnFacetingFeature",e,t,{column_getFacetedRowModel:{fn:o=>ni(o,o.table)},column_getFacetedMinMaxValues:{fn:o=>xp(o,o.table)},column_getFacetedUniqueValues:{fn:o=>Cp(o,o.table)}})},constructTableAPIs:e=>{Z("columnFacetingFeature",e,{table_getGlobalFacetedRowModel:{fn:()=>ai(e)},table_getGlobalFacetedMinMaxValues:{fn:()=>_p(e)},table_getGlobalFacetedUniqueValues:{fn:()=>kp(e)}})}};function pb(e){return!!e&&typeof e=="object"&&"aggregate"in e}function as(e){return!!e&&typeof e=="object"&&"id"in e&&"aggregationFn"in e}function Gr(e){return e===void 0||Number.isNaN(e)?0:Math.max(0,Math.floor(e))}function Rp(e,t,o,i,r){if(e.subRows.length&&t<o){for(let n=0;n<e.subRows.length;n++)Rp(e.subRows[n],t+1,o,i,r);return}i.has(e.id)||(i.add(e.id),r.push(e))}function Ap(e,t,o,i){if(e.subRows.length&&t<o){for(let r=0;r<e.subRows.length;r++)Ap(e.subRows[r],t+1,o,i);return}i.push(e)}function mb(e,t=0){let o=[],i=new Set,r=Gr(t);for(let n=0;n<e.length;n++)Rp(e[n],0,r,i,o);return o}function ss(e,t=0){let o=Gr(t),i=!1;if(o>0){for(let n=0;n<e.length;n++)if(e[n].subRows.length){i=!0;break}}if(!i)return e;let r=[];for(let n=0;n<e.length;n++)Ap(e[n],0,o,r);return r}function fb(e){if(typeof e=="number")return"sum";if(e instanceof Date&&!Number.isNaN(e.getTime()))return"extent"}function ls(e){let t=e.table.getCoreRowModel().flatRows[0]?.getValue(e.id),o=fb(t);if(!o)return;let i=e.table._rowModelFns.aggregationFns?.[o];return i||(`${o}${e.id}`,void 0),i}function Ep(e,t){if(pb(t))return t;if(t==="auto")return ls(e);let o=e.table._rowModelFns.aggregationFns?.[t];return o||(`${String(t)}${e.id}`,void 0),o}function Kr(e){let t=e.columnDef.aggregationFn,o=e.table._rowModelFns.aggregationFns,i=e.table.getCoreRowModel(),r=e._resolvedAggregationFnsCache;if(r&&r.option===t&&r.registry===o&&r.coreRowModel===i)return r.value;let n=c=>(e._resolvedAggregationFnsCache={coreRowModel:i,option:t,registry:o,value:c},c);if(t==null)return n([]);if(!Array.isArray(t))return n([{aggregationFn:Ep(e,t),id:typeof t=="string"?t:void 0}]);let a=D();for(let c=0;c<t.length;c++){let d=t[c],h=typeof d=="string"?d:as(d)?d.id:void 0;h!==void 0&&(a[h]=(a[h]??0)+1)}let s=[];for(let c=0;c<t.length;c++){let d=t[c],h=typeof d=="string"?d:as(d)?d.id:void 0;if(h===void 0){`${c}${e.id}`,s.push({aggregationFn:void 0,id:void 0});continue}if(a[h]>1){`${h}${e.id}`,s.push({aggregationFn:void 0,id:h});continue}let m=as(d)?d.aggregationFn:d;s.push({aggregationFn:Ep(e,m),id:h})}return n(s)}function gb(e,t,o){if(!t)return e;if(!(!o||!e||typeof e!="object"))return Ce(e,o)?e[o]:void 0}function jr(e){let{subRows:t,column:o,groupingRow:i,rows:r,uniqueRows:n}=e,a=o,s=Gr(e.maxDepth??a.columnDef.maxAggregationDepth),c=n?ss(r,s):mb(r,s),d=Kr(a),h=Array.isArray(a.columnDef.aggregationFn),m=!!t?.length&&t.every(w=>!!w.groupingColumnId&&w.groupingColumnId!==o.id),p=w=>w.getValue(o.id),f=w=>{let x=w.aggregationFn;if(!x)return;let y={...t?{subRows:t}:{},column:o,columnId:o.id,getValue:p,...i?{groupingRow:i}:{},maxDepth:s,rows:c,table:o.table};return m&&x.merge?x.merge({...y,subRowResults:t.map(C=>gb(C.getValue(o.id),h,w.id)),subRows:t}):x.aggregate(y)};if(!h)return d[0]?f(d[0]):void 0;let g=D();for(let w=0;w<d.length;w++){let x=d[w];x.id!==void 0&&(g[x.id]=f(x))}return g}function zp(e,t){let o=t?.rows,i=Gr(t?.maxDepth??e.columnDef.maxAggregationDepth),r=e.columnDef.getAggregationValue?.({column:e,maxDepth:i,rows:o,table:e.table});if(r)return r.value;if(e.table.options.manualAggregation)return;if(o!==void 0)return jr({column:e,maxDepth:i,rows:o});let n=e.table.getPreGroupedRowModel(),a=e._aggregationValueCache,s=e.table._rowModelFns.aggregationFns,c=e.columnDef.aggregationFn;if(a&&a.dependency===n&&a.maxDepth===i&&a.registry===s&&a.aggregationFnOption===c)return a.value;let d=jr({column:e,maxDepth:i,rows:n.rows,uniqueRows:!0});return e._aggregationValueCache={aggregationFnOption:c,dependency:n,maxDepth:i,registry:s,value:d},d}function Fp(e){let t=e.row.groupingColumnId;return!t||t===e.column.id||e.column.table.atoms.grouping?.get?.()?.includes(e.column.id)?!1:Kr(e.column).some(o=>!!o.aggregationFn)}function Dp(e,t){return e==null?null:Array.isArray(t)&&typeof e=="object"?Object.keys(e).map(o=>`${o}: ${String(e[o])}`).join(", "):String(e)}var cs={getDefaultColumnDef:()=>({aggregatedCell:({column:e,getValue:t})=>Dp(t(),e.columnDef.aggregationFn),aggregationFn:"auto",maxAggregationDepth:0}),getDefaultTableOptions:()=>({manualAggregation:!1}),assignCellPrototype:(e,t)=>{j("rowAggregationFeature",e,t,{cell_getIsAggregated:{fn:o=>Fp(o)}})},assignColumnPrototype:(e,t)=>{j("rowAggregationFeature",e,t,{column_getAggregationFns:{fn:o=>Kr(o)},column_getAggregationValue:{fn:(o,i)=>zp(o,i)},column_getAutoAggregationFn:{fn:o=>ls(o),memoDeps:o=>[o.table.getCoreRowModel(),o.table._rowModelFns.aggregationFns]}})},initColumnInstanceData:e=>{e._aggregationValueCache=void 0,e._resolvedAggregationFnsCache=void 0}};function Ip(){return[]}function ds(e){let t=e.table._rowModelFns.filterFns,o=e.table.getCoreRowModel().flatRows,i;for(let a=0;a<o.length;a++){let s=o[a].getValue(e.id);if(s!=null){i=s;break}}let r;return typeof i=="string"?r="includesString":typeof i=="number"?r="inNumberRange":typeof i=="boolean"?r="equals":Array.isArray(i)?r="arrIncludes":Object.prototype.toString.call(i)==="[object Date]"?r="inDateRange":i!==null&&typeof i=="object"?r="equals":r="weakEquals",t?.[r]}function si(e){let t=null,o=e.table._rowModelFns.filterFns;return t=Ao(e.columnDef.filterFn)?e.columnDef.filterFn:e.columnDef.filterFn==="auto"?ds(e):o?.[e.columnDef.filterFn],t??void 0}function $p(e){return(e.columnDef.enableColumnFilter??!0)&&(e.table.options.enableColumnFilters??!0)&&(e.table.options.enableFilters??!0)&&!!e.accessorFn}function Mp(e){return us(e)>-1}function Op(e){return e.table.atoms.columnFilters?.get()?.find(t=>t.id===e.id)?.value}function us(e){return e.table.atoms.columnFilters?.get()?.findIndex(t=>t.id===e.id)??-1}function Tp(e,t){Yr(e.table,o=>{let i=si(e),r=o.find(s=>s.id===e.id),n=nt(t,r?r.value:void 0);if(Pp(i,n,e))return o.filter(s=>s.id!==e.id);let a={id:e.id,value:n};return r?o.map(s=>s.id===e.id?a:s):o.length?[...o,a]:[a]})}function Yr(e,t){let o=e.getAllLeafColumnsById();Me(e,"columnFilters",r=>nt(t,r).filter(n=>{let a=o[n.id];return!(a&&Pp(si(a),n.value,a))}))}function Lp(e,t){Yr(e,t?[]:ae(e.initialState.columnFilters??[]))}function Pp(e,t,o){return typeof t>"u"?!0:e?.autoRemove?!!e.autoRemove(t,o):typeof t=="string"&&!t}var hs={getInitialState:e=>({columnFilters:Ip(),...e}),getDefaultColumnDef:()=>({filterFn:"auto"}),getDefaultTableOptions:e=>({onColumnFiltersChange:me("columnFilters",e),filterFromLeafRows:!1,maxLeafRowFilterDepth:100}),assignColumnPrototype:(e,t)=>{j("columnFilteringFeature",e,t,{column_getAutoFilterFn:{fn:o=>ds(o)},column_getFilterFn:{fn:o=>si(o)},column_getCanFilter:{fn:o=>$p(o)},column_getIsFiltered:{fn:o=>Mp(o)},column_getFilterValue:{fn:o=>Op(o)},column_getFilterIndex:{fn:o=>us(o)},column_setFilterValue:{fn:(o,i)=>Tp(o,i)}})},initRowInstanceData:e=>{e.columnFilters=D(),e.columnFiltersMeta=D()},constructTableAPIs:e=>{Z("columnFilteringFeature",e,{table_setColumnFilters:{fn:t=>Yr(e,t)},table_resetColumnFilters:{fn:t=>Lp(e,t)}})}};function Vp(){return[]}function ps(e){Qr(e.table,t=>t.includes(e.id)?t.filter(o=>o!==e.id):[...t,e.id])}function ms(e){return(e.columnDef.enableGrouping??!0)&&(e.table.options.enableGrouping??!0)&&(!!e.accessorFn||!!e.columnDef.getGroupingValue)}function Xr(e){return!!e.table.atoms.grouping?.get()?.includes(e.id)}function Bp(e){return e.table.atoms.grouping?.get()?.indexOf(e.id)??-1}function Hp(e){let t=ms(e);return()=>{t&&ps(e)}}function Qr(e,t){Me(e,"grouping",t)}function Np(e,t){Qr(e,t?[]:ae(e.initialState.grouping??[]))}function qp(e){return!!e.groupingColumnId}function Wp(e,t){if(e._groupingValuesCache&&Ce(e._groupingValuesCache,t))return e._groupingValuesCache[t];let o=e.table.getColumn(t);return o.columnDef.getGroupingValue?(e._groupingValuesCache&&(e._groupingValuesCache[t]=o.columnDef.getGroupingValue(e.original,e.index,e)),e._groupingValuesCache?.[t]):e.getValue(t)}function fs(e){let t=e.row;return Xr(e.column)&&e.column.id===t.groupingColumnId}function Up(e){return!fs(e)&&Xr(e.column)}var gs={getInitialState:e=>({grouping:Vp(),...e}),getDefaultTableOptions:e=>({onGroupingChange:me("grouping",e),groupedColumnMode:"reorder"}),assignCellPrototype:(e,t)=>{j("columnGroupingFeature",e,t,{cell_getIsGrouped:{fn:o=>fs(o)},cell_getIsPlaceholder:{fn:o=>Up(o)}})},assignColumnPrototype:(e,t)=>{j("columnGroupingFeature",e,t,{column_toggleGrouping:{fn:o=>ps(o)},column_getCanGroup:{fn:o=>ms(o)},column_getIsGrouped:{fn:o=>Xr(o)},column_getGroupedIndex:{fn:o=>Bp(o)},column_getToggleGroupingHandler:{fn:o=>Hp(o)}})},assignRowPrototype:(e,t)=>{j("columnGroupingFeature",e,t,{row_getIsGrouped:{fn:o=>qp(o)},row_getGroupingValue:{fn:(o,i)=>Wp(o,i)}})},initRowInstanceData:e=>{e._groupingValuesCache=D()},constructTableAPIs:e=>{Z("columnGroupingFeature",e,{table_setGrouping:{fn:t=>Qr(e,t)},table_resetGrouping:{fn:t=>Np(e,t)}})}};var bs={getInitialState:e=>({columnOrder:Pu(),...e}),getDefaultTableOptions:e=>({onColumnOrderChange:me("columnOrder",e)}),assignColumnPrototype:(e,t)=>{j("columnOrderingFeature",e,t,{column_getIndex:{fn:(o,i)=>Vu(o,i)},column_getIsFirstColumn:{fn:(o,i)=>Bu(o,i)},column_getIsLastColumn:{fn:(o,i)=>Hu(o,i)}})},constructTableAPIs:e=>{Z("columnOrderingFeature",e,{table_getColumnIndexes:{fn:()=>ka(e),memoDeps:()=>[e.options.columns,e.atoms.columnOrder?.get(),e.atoms.columnPinning?.get(),e.atoms.columnVisibility?.get(),e.atoms.grouping?.get(),e.options.groupedColumnMode]},table_setColumnOrder:{fn:t=>Ea(e,t)},table_resetColumnOrder:{fn:t=>Nu(e,t)},table_getOrderColumnsFn:{fn:()=>Ti(e),memoDeps:()=>[e.atoms.columnOrder?.get(),e.atoms.grouping?.get(),e.options.groupedColumnMode]}})}};var ws={getInitialState:e=>({columnPinning:{...He(),...e.columnPinning},...e}),getDefaultTableOptions:e=>({onColumnPinningChange:me("columnPinning",e)}),assignColumnPrototype:(e,t)=>{j("columnPinningFeature",e,t,{column_pin:{fn:(o,i)=>pu(o,i)},column_getCanPin:{fn:o=>mu(o)},column_getPinnedIndex:{fn:o=>fu(o)},column_getIsPinned:{fn:o=>fa(o)}})},assignRowPrototype:(e,t)=>{j("columnPinningFeature",e,t,{row_getCenterVisibleCells:{fn:o=>gu(o),memoDeps:o=>[o.getAllCells(),o.table.atoms.columnPinning?.get(),o.table.atoms.columnVisibility?.get()]},row_getStartVisibleCells:{fn:o=>bu(o),memoDeps:o=>[o.getAllCells(),o.table.atoms.columnPinning?.get()?.start,o.table.atoms.columnVisibility?.get()]},row_getEndVisibleCells:{fn:o=>wu(o),memoDeps:o=>[o.getAllCells(),o.table.atoms.columnPinning?.get()?.end,o.table.atoms.columnVisibility?.get()]}})},constructTableAPIs:e=>{Z("columnPinningFeature",e,{table_setColumnPinning:{fn:t=>$r(e,t)},table_resetColumnPinning:{fn:t=>vu(e,t)},table_getIsSomeColumnsPinned:{fn:t=>yu(e,t)},table_getStartHeaderGroups:{fn:()=>qt(e),memoDeps:()=>[e.getAllColumns(),R(e,"getVisibleLeafColumns",wt),e.atoms.columnPinning?.get()?.start,e.atoms.columnOrder?.get()]},table_getCenterHeaderGroups:{fn:()=>Ut(e),memoDeps:()=>[e.getAllColumns(),R(e,"getVisibleLeafColumns",wt),e.atoms.columnPinning?.get(),e.atoms.columnOrder?.get()]},table_getEndHeaderGroups:{fn:()=>Wt(e),memoDeps:()=>[e.getAllColumns(),R(e,"getVisibleLeafColumns",wt),e.atoms.columnPinning?.get()?.end,e.atoms.columnOrder?.get()]},table_getStartFooterGroups:{fn:()=>xu(e),memoDeps:()=>[R(e,"getStartHeaderGroups",qt)]},table_getCenterFooterGroups:{fn:()=>Su(e),memoDeps:()=>[R(e,"getCenterHeaderGroups",Ut)]},table_getEndFooterGroups:{fn:()=>Cu(e),memoDeps:()=>[R(e,"getEndHeaderGroups",Wt)]},table_getStartFlatHeaders:{fn:()=>ga(e),memoDeps:()=>[R(e,"getStartHeaderGroups",qt)]},table_getEndFlatHeaders:{fn:()=>ba(e),memoDeps:()=>[R(e,"getEndHeaderGroups",Wt)]},table_getCenterFlatHeaders:{fn:()=>wa(e),memoDeps:()=>[R(e,"getCenterHeaderGroups",Ut)]},table_getStartLeafHeaders:{fn:()=>_u(e),memoDeps:()=>[R(e,"getStartHeaderGroups",qt)]},table_getEndLeafHeaders:{fn:()=>ku(e),memoDeps:()=>[R(e,"getEndHeaderGroups",Wt)]},table_getCenterLeafHeaders:{fn:()=>Eu(e),memoDeps:()=>[R(e,"getCenterHeaderGroups",Ut)]},table_getStartLeafColumns:{fn:()=>Mr(e),memoDeps:()=>[e.options.columns,e.atoms.columnPinning?.get(),e.atoms.columnOrder?.get(),e.atoms.grouping?.get(),e.options.groupedColumnMode]},table_getEndLeafColumns:{fn:()=>Or(e),memoDeps:()=>[e.options.columns,e.atoms.columnPinning?.get(),e.atoms.columnOrder?.get(),e.atoms.grouping?.get(),e.options.groupedColumnMode]},table_getCenterLeafColumns:{fn:()=>Tr(e),memoDeps:()=>[e.options.columns,e.atoms.columnPinning?.get(),e.atoms.columnOrder?.get(),e.atoms.grouping?.get(),e.options.groupedColumnMode]},table_getPinnedLeafColumns:{fn:t=>Ru(e,t)},table_getStartVisibleLeafColumns:{fn:()=>va(e),memoDeps:()=>[e.options.columns,e.atoms.columnPinning?.get(),e.atoms.columnVisibility?.get(),e.atoms.columnOrder?.get(),e.atoms.grouping?.get(),e.options.groupedColumnMode]},table_getCenterVisibleLeafColumns:{fn:()=>xa(e),memoDeps:()=>[e.options.columns,e.atoms.columnPinning?.get(),e.atoms.columnVisibility?.get(),e.atoms.columnOrder?.get(),e.atoms.grouping?.get(),e.options.groupedColumnMode]},table_getEndVisibleLeafColumns:{fn:()=>ya(e),memoDeps:()=>[e.options.columns,e.atoms.columnPinning?.get(),e.atoms.columnVisibility?.get(),e.atoms.columnOrder?.get(),e.atoms.grouping?.get(),e.options.groupedColumnMode]},table_getPinnedVisibleLeafColumns:{fn:t=>tt(e,t)}})}};function jp(){return D()}function vs(){return{size:150,minSize:20,maxSize:Number.MAX_SAFE_INTEGER}}function li(e){let t=vs(),o=e.table.atoms.columnSizing?.get(),i=o&&Ce(o,e.id)?o[e.id]:void 0;return Math.min(Math.max(e.columnDef.minSize??t.minSize,i??e.columnDef.size??t.size),e.columnDef.maxSize??t.maxSize)}function Jr(e){let t=D(),o=D(),i=new Array(e.length),r=0;for(let a=0;a<e.length;a++){let s=e[a],c=R(s,"getSize",li);i[a]=c,t[s.id]=r,r+=c}let n=0;for(let a=e.length-1;a>=0;a--)o[e[a].id]=n,n+=i[a];return{starts:t,afters:o}}function Zr(e){return{all:Jr(tt(e)),center:Jr(tt(e,"center")),start:Jr(tt(e,"start")),end:Jr(tt(e,"end"))}}function Gp(e){return e==="start"?"start":e==="end"?"end":e==="center"?"center":"all"}function Kp(e,t){return R(e.table,"getColumnOffsets",Zr)[Gp(t)].starts[e.id]??0}function Yp(e,t){return R(e.table,"getColumnOffsets",Zr)[Gp(t)].afters[e.id]??0}function Xp(e){ci(e.table,t=>{let o=D(),i=Object.keys(t);for(let r=0;r<i.length;r++){let n=i[r];n!==e.id&&(o[n]=t[n])}return o})}function Qp(e){if(!e.subHeaders.length)return li(e.column);let t=0;for(let o=0;o<e.subHeaders.length;o++)t+=Qp(e.subHeaders[o]);return t}function jt(e){return Qp(e)}function ys(e){if(e.index>0){let t=e.headerGroup?.headers[e.index-1];if(t)return R(t,"getStart",ys)+R(t,"getSize",jt)}return 0}function ci(e,t){e.options.onColumnSizingChange?.(t)}function Jp(e,t){ci(e,t?D():Object.assign(D(),ae(e.initialState.columnSizing??{})))}function Zp(e){return e.getHeaderGroups()[0]?.headers.reduce((t,o)=>t+jt(o),0)??0}function em(e){return R(e,"getStartHeaderGroups",qt)[0]?.headers.reduce((t,o)=>t+jt(o),0)??0}function tm(e){return R(e,"getCenterHeaderGroups",Ut)[0]?.headers.reduce((t,o)=>t+jt(o),0)??0}function om(e){return R(e,"getEndHeaderGroups",Wt)[0]?.headers.reduce((t,o)=>t+jt(o),0)??0}function tn(){return{startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,isResizingColumn:!1,columnSizingStart:[]}}function Cs(e){return(e.columnDef.enableResizing??!0)&&(e.table.options.enableColumnResizing??!0)}function im(e){return e.table.atoms.columnResizing?.get()?.isResizingColumn===e.id}function rm(e,t){let o=e.table.getColumn(e.column.id),i=Cs(o);return r=>{if(!i||xs(r)&&r.touches.length>1)return;let n=jt(e),a=e.getLeafHeaders().map($=>[$.column.id,li($.column)]),s=xs(r)?Math.round(r.touches[0].clientX):r.clientX,c=D(),d=($,A)=>{if(typeof A!="number")return;let v=o.table,O=v.options.columnResizeMode==="onChange"||$==="end";v._reactivity.batch(()=>{di(v,Y=>{let U=v.options.columnResizeDirection==="rtl"?-1:1,he=(A-(Y.startOffset??0))*U,Q=Y.startSize??0,pe=Math.max(Q>0?he/Q:0,-.999999);if(O){let _e=Y.columnSizingStart;for(let ke=0;ke<_e.length;ke++){let le=_e[ke],We=le[1];c[le[0]]=Math.round(Math.max(We>0?We+We*pe:he/_e.length,0)*100)/100}}return{...Y,deltaOffset:he,deltaPercentage:pe}}),O&&ci(v,Y=>Object.assign(D(),Y,c))})},h=null,m=!1,p,f=()=>{m?(m=!1,d("move",p),h=requestAnimationFrame(f)):h=null},g=$=>{if(p=$,typeof requestAnimationFrame!="function"){d("move",$);return}if(h!==null){m=!0;return}d("move",$),h=requestAnimationFrame(f)},w=$=>{h!==null&&(cancelAnimationFrame(h),h=null,m=!1),o.table._reactivity.batch(()=>{d("end",$??p),di(o.table,A=>({...A,isResizingColumn:!1,startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,columnSizingStart:[]}))})},x=t||(typeof document<"u"?document:null),y={moveHandler:$=>g($.clientX),upHandler:$=>{x?.removeEventListener("mousemove",y.moveHandler),x?.removeEventListener("mouseup",y.upHandler),w($.clientX)}},C={moveHandler:$=>($.cancelable&&($.preventDefault(),$.stopPropagation()),g($.touches[0].clientX),!1),upHandler:$=>{L(),$.cancelable&&($.preventDefault(),$.stopPropagation()),w($.touches[0]?.clientX)},cancelHandler:()=>{L(),w()}},L=()=>{x?.removeEventListener("touchmove",C.moveHandler),x?.removeEventListener("touchend",C.upHandler),x?.removeEventListener("touchcancel",C.cancelHandler)},M=bb()?{passive:!1}:!1;xs(r)?(x?.addEventListener("touchmove",C.moveHandler,M),x?.addEventListener("touchend",C.upHandler,M),x?.addEventListener("touchcancel",C.cancelHandler,M)):(x?.addEventListener("mousemove",y.moveHandler,M),x?.addEventListener("mouseup",y.upHandler,M)),di(o.table,$=>({...$,startOffset:s,startSize:n,deltaOffset:0,deltaPercentage:0,columnSizingStart:a,isResizingColumn:o.id}))}}function di(e,t){e.options.onColumnResizingChange?.(t)}function nm(e,t){di(e,t?tn():ae(e.initialState.columnResizing??tn()))}var en=null;function bb(){if(typeof en=="boolean")return en;let e=!1;try{let t={get passive(){return e=!0,!1}},o=()=>{};window.addEventListener("test",o,t),window.removeEventListener("test",o)}catch{e=!1}return en=e,en}function xs(e){return e.type==="touchstart"}var Ss={getInitialState:e=>({columnResizing:tn(),...e}),getDefaultTableOptions:e=>({columnResizeMode:"onEnd",columnResizeDirection:"ltr",onColumnResizingChange:me("columnResizing",e)}),assignColumnPrototype:(e,t)=>{j("columnResizingFeature",e,t,{column_getCanResize:{fn:o=>Cs(o)},column_getIsResizing:{fn:o=>im(o)}})},assignHeaderPrototype:(e,t)=>{j("columnResizingFeature",e,t,{header_getResizeHandler:{fn:(o,i)=>rm(o,i)}})},constructTableAPIs:e=>{Z("columnResizingFeature",e,{table_setColumnResizing:{fn:t=>di(e,t)},table_resetHeaderSizeInfo:{fn:t=>nm(e,t)}})}};var _s={getInitialState:e=>({columnSizing:jp(),...e}),getDefaultColumnDef:()=>vs(),getDefaultTableOptions:e=>({onColumnSizingChange:me("columnSizing",e)}),assignColumnPrototype:(e,t)=>{j("columnSizingFeature",e,t,{column_getSize:{fn:o=>li(o),memoDeps:o=>[t.options.columns,t.atoms.columnSizing?.get()?.[o.id]]},column_getStart:{fn:(o,i)=>Kp(o,i)},column_getAfter:{fn:(o,i)=>Yp(o,i)},column_resetSize:{fn:o=>Xp(o)}})},assignHeaderPrototype:(e,t)=>{j("columnSizingFeature",e,t,{header_getSize:{fn:o=>jt(o),memoDeps:o=>[t.options.columns,o.column.columns.length>0?t.atoms.columnSizing?.get():t.atoms.columnSizing?.get()?.[o.column.id]]},header_getStart:{fn:o=>ys(o),memoDeps:()=>[t.options.columns,t.atoms.columnSizing?.get(),t.atoms.columnOrder?.get(),t.atoms.columnPinning?.get(),t.atoms.columnVisibility?.get(),t.atoms.grouping?.get(),t.options.groupedColumnMode]}})},constructTableAPIs:e=>{Z("columnSizingFeature",e,{table_getColumnOffsets:{fn:()=>Zr(e),memoDeps:()=>[e.options.columns,e.atoms.columnSizing?.get(),e.atoms.columnOrder?.get(),e.atoms.columnPinning?.get(),e.atoms.columnVisibility?.get(),e.atoms.grouping?.get(),e.options.groupedColumnMode]},table_setColumnSizing:{fn:t=>ci(e,t)},table_resetColumnSizing:{fn:t=>Jp(e,t)},table_getTotalSize:{fn:()=>Zp(e),memoDeps:()=>[e.atoms.columnSizing?.get(),e.getHeaderGroups()]},table_getStartTotalSize:{fn:()=>em(e),memoDeps:()=>[e.atoms.columnSizing?.get(),e.getHeaderGroups()]},table_getCenterTotalSize:{fn:()=>tm(e),memoDeps:()=>[e.atoms.columnSizing?.get(),e.getHeaderGroups()]},table_getEndTotalSize:{fn:()=>om(e),memoDeps:()=>[e.atoms.columnSizing?.get(),e.getHeaderGroups()]}})}};var ks={getInitialState:e=>({columnVisibility:Au(),...e}),getDefaultTableOptions:e=>({onColumnVisibilityChange:me("columnVisibility",e)}),assignColumnPrototype:(e,t)=>{j("columnVisibilityFeature",e,t,{column_getIsVisible:{fn:o=>ge(o),memoDeps:o=>[t.options.columns,t.atoms.columnVisibility?.get(),o.columns]},column_getCanHide:{fn:o=>Mi(o)},column_getToggleVisibilityHandler:{fn:o=>zu(o)},column_toggleVisibility:{fn:(o,i)=>Ca(o,i)}})},assignRowPrototype:(e,t)=>{j("columnVisibilityFeature",e,t,{row_getVisibleCells:{fn:o=>Lr(o),memoDeps:o=>[o.getAllCells(),t.atoms.columnPinning?.get(),t.atoms.columnVisibility?.get()]},row_getVisibleCellsByColumnId:{fn:o=>Zo(o),memoDeps:o=>[o.getAllCells(),t.atoms.columnVisibility?.get()]}})},constructTableAPIs:e=>{Z("columnVisibilityFeature",e,{table_getVisibleFlatColumns:{fn:()=>Fu(e),memoDeps:()=>[e.atoms.columnVisibility?.get(),e.atoms.columnOrder?.get(),e.atoms.grouping?.get(),e.options.columns,e.options.groupedColumnMode]},table_getVisibleLeafColumns:{fn:()=>wt(e),memoDeps:()=>[e.atoms.columnVisibility?.get(),e.atoms.columnOrder?.get(),e.atoms.grouping?.get(),e.options.columns,e.options.groupedColumnMode]},table_setColumnVisibility:{fn:t=>Oi(e,t)},table_resetColumnVisibility:{fn:t=>Du(e,t)},table_toggleAllColumnsVisible:{fn:t=>Sa(e,t)},table_getIsAllColumnsVisible:{fn:()=>_a(e)},table_getIsSomeColumnsVisible:{fn:()=>Iu(e)},table_getToggleAllColumnsVisibilityHandler:{fn:()=>$u(e)}})}};function be(e){let t=Object.assign((o,i,r,n)=>{let a=o.getValue(i),s=t.resolveDataValue?t.resolveDataValue(a):a;return t.filter(s,r,o,i,n)},e);return t}var wb=be({filter:(e,t)=>e===t,autoRemove:e=>ue(e)}),vb=be({filter:(e,t)=>e==t,autoRemove:e=>ue(e)}),yb=be({filter:(e,t)=>!!e?.includes(t),autoRemove:e=>ue(e),resolveFilterValue:e=>String(e),resolveDataValue:e=>e==null?void 0:String(e)}),qi=be({filter:(e,t)=>!!e?.includes(t),autoRemove:e=>ue(e),resolveFilterValue:e=>String(e).toLowerCase(),resolveDataValue:e=>e==null?void 0:String(e).toLowerCase()}),Rs=be({filter:(e,t)=>e===t,autoRemove:e=>ue(e),resolveFilterValue:e=>String(e).toLowerCase(),resolveDataValue:e=>e==null?void 0:String(e).toLowerCase()}),xb=be({filter:(e,t)=>e===t,autoRemove:e=>ue(e),resolveFilterValue:e=>String(e),resolveDataValue:e=>e==null?void 0:String(e)}),Cb=be({filter:(e,t)=>!!e?.startsWith(t),autoRemove:e=>ue(e),resolveFilterValue:e=>String(e).toLowerCase(),resolveDataValue:e=>e==null?void 0:String(e).toLowerCase()}),Sb=be({filter:(e,t)=>!!e?.endsWith(t),autoRemove:e=>ue(e),resolveFilterValue:e=>String(e).toLowerCase(),resolveDataValue:e=>e==null?void 0:String(e).toLowerCase()}),_b=be({filter:e=>am(e),autoRemove:e=>ue(e)||e===!1}),kb=be({filter:e=>!am(e),autoRemove:e=>ue(e)||e===!1}),Eb=be({filter:(e,t)=>Ni(e,t),autoRemove:e=>ue(e)}),Rb=be({filter:(e,t)=>on(e,t),autoRemove:e=>ue(e)}),Ab=be({filter:(e,t)=>!on(e,t),autoRemove:e=>ue(e)}),zb=be({filter:(e,t)=>!Ni(e,t),autoRemove:e=>ue(e)}),Fb=be({filter:(e,t)=>sm(e,t,!1),autoRemove:e=>ue(e)||Array.isArray(e)&&ue(e[0])&&ue(e[1])}),Db=be({filter:(e,t)=>sm(e,t,!0),autoRemove:e=>ue(e)||Array.isArray(e)&&ue(e[0])&&ue(e[1])}),As=be({filter:(e,t)=>{if(typeof e!="number"||Number.isNaN(e))return!1;let[o,i]=t;return e>=o&&e<=i},resolveFilterValue:e=>{let[t,o]=e,i=typeof t!="number"?parseFloat(t):t,r=typeof o!="number"?parseFloat(o):o,n=t===null||Number.isNaN(i)?-1/0:i,a=o===null||Number.isNaN(r)?1/0:r;if(n>a){let s=n;n=a,a=s}return[n,a]},autoRemove:e=>ue(e)||Array.isArray(e)&&ue(e[0])&&ue(e[1])}),Ib=be({filter:(e,t)=>{let[o,i]=t;return e>=o&&e<=i},resolveFilterValue:e=>{let[t,o]=e,i=Es(t),r=Es(o),n=Number.isNaN(i)?-1/0:i,a=Number.isNaN(r)?1/0:r;if(n>a){let s=n;n=a,a=s}return[n,a]},resolveDataValue:e=>Es(e),autoRemove:e=>ue(e)||Array.isArray(e)&&ue(e[0])&&ue(e[1])}),$b=be({filter:(e,t)=>{for(let o=0;o<t.length;o++)if(e===t[o])return!0;return!1},autoRemove:e=>ue(e)||!e?.length}),Mb=be({filter:(e,t)=>{if(typeof e!="string"&&!Array.isArray(e))return!1;for(let o=0;o<t.length;o++)if(e.includes(t[o]))return!0;return!1},autoRemove:e=>ue(e)||!e?.length}),zs=be({filter:(e,t)=>{if(!Array.isArray(e))return!1;for(let o=0;o<t.length;o++)if(!e.includes(t[o]))return!1;return!0},autoRemove:e=>ue(e)||!e?.length}),Fs=be({filter:(e,t)=>{if(!Array.isArray(e))return!1;for(let o=0;o<t.length;o++)if(e.includes(t[o]))return!0;return!1},autoRemove:e=>ue(e)||!e?.length});function ue(e){return e==null||e===""}function am(e){return e==null||String(e).trim()===""}function Es(e){return e instanceof Date?e.getTime():typeof e=="number"?e:e==null||e===""?NaN:new Date(e).getTime()}function Ni(e,t){let o=e==null?0:+e,i=Number(t);return!isNaN(i)&&!isNaN(o)?o>i:String(e??"").toLowerCase().trim()>String(t).toLowerCase().trim()}function on(e,t){return e===t||Ni(e,t)}function sm(e,t,o){let i=t[0],r=i!==""&&i!==void 0;if(r&&!(o?on(e,i):Ni(e,i)))return!1;let n=t[1];if(n===""||n===void 0)return!0;if(r){let a=Number(i),s=Number(n);if(!isNaN(a)&&!isNaN(s)&&a>s)return!0}return o?!Ni(e,n):!on(e,n)}function lo(e){return(e.columnDef.enableGlobalFilter??!0)&&(e.table.options.enableGlobalFilter??!0)&&(e.table.options.enableFilters??!0)&&(e.table.options.getColumnCanGlobalFilter?.(e)??!0)&&!!e.accessorFn}function Ds(){return qi}function rn(e){let{globalFilterFn:t}=e.options,o=e._rowModelFns.filterFns;return Ao(t)?t:t==="auto"?Ds():o?.[t]}function Is(e,t){e.options.onGlobalFilterChange?.(t)}function lm(e,t){Is(e,t?void 0:ae(e.initialState.globalFilter))}var $s={getInitialState:e=>({globalFilter:void 0,...e}),getDefaultTableOptions:e=>({onGlobalFilterChange:me("globalFilter",e),globalFilterFn:"auto",getColumnCanGlobalFilter:t=>{if("enableGlobalFilter"in t.columnDef&&t.columnDef.enableGlobalFilter===!0)return!0;let o=e.getCoreRowModel().flatRows.find(i=>i.getAllCellsByColumnId()[t.id]?.getValue()!=null)?.getAllCellsByColumnId()[t.id]?.getValue();return typeof o=="string"||typeof o=="number"}}),assignColumnPrototype:(e,t)=>{j("globalFilteringFeature",e,t,{column_getCanGlobalFilter:{fn:o=>lo(o)}})},constructTableAPIs:e=>{Z("globalFilteringFeature",e,{table_getGlobalAutoFilterFn:{fn:()=>Ds()},table_getGlobalFilterFn:{fn:()=>rn(e)},table_setGlobalFilter:{fn:t=>Is(e,t)},table_resetGlobalFilter:{fn:t=>lm(e,t)}})}};var Ms={getInitialState:e=>({expanded:hh(),...e}),getDefaultTableOptions:e=>({onExpandedChange:me("expanded",e),paginateExpandedRows:!0}),assignRowPrototype:(e,t)=>{j("rowExpandingFeature",e,t,{row_toggleExpanded:{fn:(o,i)=>Ba(o,i)},row_getIsExpanded:{fn:o=>oi(o)},row_getCanExpand:{fn:o=>so(o)},row_getIsAllParentsExpanded:{fn:o=>gh(o)},row_getToggleExpandedHandler:{fn:o=>bh(o)}})},constructTableAPIs:e=>{Z("rowExpandingFeature",e,{table_autoResetExpanded:{fn:()=>ti(e)},table_setExpanded:{fn:t=>Li(e,t)},table_toggleAllRowsExpanded:{fn:t=>Ta(e,t)},table_resetExpanded:{fn:t=>La(e,t)},table_getCanSomeRowsExpand:{fn:()=>Pa(e)},table_getToggleAllRowsExpandedHandler:{fn:()=>ph(e)},table_getIsSomeRowsExpanded:{fn:()=>mh(e)},table_getIsAllRowsExpanded:{fn:()=>Va(e)},table_getExpandedDepth:{fn:()=>fh(e)}})}};var Os={getInitialState:e=>({...e,pagination:{...ii(),...e.pagination}}),getDefaultTableOptions:e=>({onPaginationChange:me("pagination",e)}),constructTableAPIs:e=>{Z("rowPaginationFeature",e,{table_autoResetPageIndex:{fn:()=>zt(e)},table_setPagination:{fn:t=>Pi(e,t)},table_resetPagination:{fn:t=>wh(e,t)},table_setPageIndex:{fn:t=>Oo(e,t)},table_resetPageIndex:{fn:t=>Ha(e,t)},table_setPageSize:{fn:t=>Na(e,t)},table_getPageCount:{fn:()=>ri(e)},table_resetPageSize:{fn:t=>vh(e,t)},table_getPageOptions:{fn:()=>yh(e)},table_getCanPreviousPage:{fn:()=>xh(e)},table_getCanNextPage:{fn:()=>Ch(e)},table_getCanLastPage:{fn:()=>Sh(e)},table_previousPage:{fn:()=>_h(e)},table_nextPage:{fn:()=>kh(e)},table_firstPage:{fn:()=>Eh(e)},table_lastPage:{fn:()=>Rh(e)},table_getRowCount:{fn:()=>qa(e)}})}};function cm(){return D()}function To(e,t){e.options.onRowSelectionChange?.(t)}function dm(e,t){e._lastSelectedRowId=null,To(e,t?D():Object.assign(D(),ae(e.initialState.rowSelection??{})))}function Ts(e,t,o){e._lastSelectedRowId=null,To(e,i=>{if(t=typeof t<"u"?t:!R(e,"getIsAllRowsSelected",Vs),o?.deselectAll&&!t)return D();let r=Object.assign(D(),i),n=e.getPreGroupedRowModel().flatRows;if(t){let a=new Map;n.forEach(s=>{nn(s,a)&&(r[s.id]=!0)})}else n.forEach(a=>{Dt(a)&&delete r[a.id]});return r})}function Ls(e,t,o){e._lastSelectedRowId=null,To(e,i=>{let r=typeof t<"u"?t:!R(e,"getIsAllPageRowsSelected",Bs);if(o?.deselectAll&&!r)return D();let n=Object.assign(D(),i);return e.getRowModel().rows.forEach(a=>{ln(n,a.id,r,!0,e,!0)}),n})}function um(e){return e.getCoreRowModel()}function hm(e){let t=e.getCoreRowModel();return R(e,"getIsSomeRowsSelected",Wi)?qs(t,e):{rows:[],flatRows:[],rowsById:D()}}function pm(e){let t=e.getFilteredRowModel();return R(e,"getIsSomeRowsSelected",Wi)?qs(t,e):{rows:[],flatRows:[],rowsById:D()}}function mm(e){let t=e.getSortedRowModel();return R(e,"getIsSomeRowsSelected",Wi)?qs(t,e):{rows:[],flatRows:[],rowsById:D()}}function Ps(e){return Object.keys(e.atoms.rowSelection?.get()??{})}function Vs(e){let t=e.getFilteredRowModel().flatRows,o=e.atoms.rowSelection?.get()??{},i=!!(t.length&&Object.keys(o).length);if(i){let r=new Map;t.some(n=>!Ui(n,o)&&nn(n,r))&&(i=!1)}return i}function Bs(e){let t=e.getPaginatedRowModel().flatRows,o=e.atoms.rowSelection?.get()??{},i=new Map,r=!1;for(let n=0;n<t.length;n++){let a=t[n];if(Ui(a,o))!r&&nn(a,i)&&(r=!0);else if(nn(a,i))return!1}return r}function Wi(e){return R(e,"getSelectedRowIds",Ps).length>0}function fm(e){return e.getPaginatedRowModel().flatRows.filter(t=>Dt(t)).some(t=>an(t)||R(t,"getIsSomeSelected",Ns))}function gm(e){return t=>{Ts(e,t.target.checked)}}function bm(e){return t=>{Ls(e,t.target.checked)}}function Hs(e,t,o){let i=an(e);To(e.table,r=>{t=typeof t<"u"?t:!i;let n=Object.assign(D(),r);return ln(n,e.id,t,(o?.selectChildren??!0)&&co(e),e.table),!t&&o?.deselectParents&&ym(n,e),n})}function an(e){return Ui(e,e.table.atoms.rowSelection?.get()??{})}function Ns(e){return Ws(e)==="some"}function wm(e){return Ws(e)==="all"}function Dt(e){let t=e.table.options;return typeof t.enableRowSelection=="function"?t.enableRowSelection(e):t.enableRowSelection??!0}function sn(e){let t=e.table.options;return typeof t.enableSubRowSelection=="function"?t.enableSubRowSelection(e):t.enableSubRowSelection??!0}function co(e){let t=e.table.options;return typeof t.enableMultiRowSelection=="function"?t.enableMultiRowSelection(e):t.enableMultiRowSelection??!0}function vm(e,t){let o=Dt(e);return i=>{if(!o)return;let r=i,n=e.table,a=r.target.checked,s=n._lastSelectedRowId;(!(n.options.enableRowRangeSelection!==!1&&s!==null&&co(e)&&(n.options.isRowRangeSelectionEvent?.(i)??!1))||!Ob(e,s,a,t))&&Hs(e,a,t),n._lastSelectedRowId=e.id}}function Ob(e,t,o,i){let r=i?.selectChildren??!0,n=e.table,a=n.getRowsInDisplayOrder(),s=n.getPrePaginatedRowModel().rowsById[t]??n.getCoreRowModel().rowsById[t];if(!s)return!1;let c=s.getDisplayIndex(),d=e.getDisplayIndex(),h=a[c],m=a[d];if(c<0||d<0||c>=a.length||d>=a.length||h?.id!==s.id||m?.id!==e.id||!co(s)||!co(e))return!1;let p=Math.min(c,d),f=Math.max(c,d);return To(n,g=>{let w=Object.assign(D(),g);for(let x=p;x<=f;x++){let y=a[x];!Dt(y)||!co(y)||(ln(w,y.id,o,r,n),!o&&i?.deselectParents&&ym(w,y))}return w}),!0}function ln(e,t,o,i,r,n){let a=r.getRow(t,!0);o?(co(a)||Object.keys(e).forEach(s=>delete e[s]),Dt(a)&&(e[t]=!0)):(!n||Dt(a))&&delete e[t],i&&a.subRows.length&&sn(a)&&a.subRows.forEach(s=>ln(e,s.id,o,i,r,n))}function nn(e,t){if(!Dt(e))return!1;let o=e.table;if(o.options.enableSubRowSelection===!0)return!0;let i=e.parentId;if(i===void 0)return!0;let r=t.get(i);if(r!==void 0)return r;let n=o.getCoreRowModel().rowsById,a=[],s=!0,c=i;for(;c!==void 0;){let d=t.get(c);if(d!==void 0){s=d;break}a.push(c);let h=n[c]??o.getRow(c,!0);if(!sn(h)){s=!1;break}c=h.parentId}return a.forEach(d=>t.set(d,s)),s}function ym(e,t){let o=t.table.getCoreRowModel().rowsById,i=t.parentId;for(;i!==void 0;)delete e[i],i=(o[i]??t.table.getRow(i,!0)).parentId}function xm(e,t,o,i){let r=[];for(let n=0;n<e.length;n++){let a=e[n],s=Ui(a,t);if(s&&(o.push(a),i[a.id]=a),a.subRows.length){let c=xm(a.subRows,t,o,i);if(s){let d=Object.create(Object.getPrototypeOf(a));$i(d,a),d.subRows=c,r.push(d)}}else s&&r.push(a)}return r}function qs(e,t){let o=[],i=D(),r=t.atoms.rowSelection?.get()??{};return{rows:xm(e.rows,r,o,i),flatRows:o,rowsById:i}}function Ui(e,t){return!!(Ce(t,e.id)&&t[e.id])}function Ws(e){if(!e.subRows.length)return!1;let t=e.table.atoms.rowSelection?.get()??{},o=!1,i=!0,r=!1;for(let n=0;n<e.subRows.length;n++){let a=e.subRows[n];if(o&&!i)break;if(Dt(a)&&(r=!0,Ui(a,t)?o=!0:i=!1),a.subRows.length){let s=Ws(a);s==="all"?(o=!0,r=!0):s==="some"?(o=!0,i=!1,r=!0):i=!1}}return r?i?"all":o?"some":!1:!1}var Us={initTableInstanceData:e=>{e._lastSelectedRowId=null},resetTableInstanceData:e=>{e._lastSelectedRowId=null},getInitialState:e=>({rowSelection:cm(),...e}),getDefaultTableOptions:e=>({onRowSelectionChange:me("rowSelection",e),enableRowSelection:!0,enableMultiRowSelection:!0,enableRowRangeSelection:!0,enableSubRowSelection:!0,isRowRangeSelectionEvent:t=>{let o=t;return!!(o.shiftKey||o.nativeEvent?.shiftKey)}}),assignRowPrototype:(e,t)=>{j("rowSelectionFeature",e,t,{row_toggleSelected:{fn:(o,i,r)=>Hs(o,i,r)},row_getIsSelected:{fn:o=>an(o)},row_getIsSomeSelected:{fn:o=>Ns(o),memoDeps:o=>[o.subRows,o.table.atoms.rowSelection?.get(),o.table.options.enableRowSelection]},row_getIsAllSubRowsSelected:{fn:o=>wm(o),memoDeps:o=>[o.subRows,o.table.atoms.rowSelection?.get(),o.table.options.enableRowSelection]},row_getCanSelect:{fn:o=>Dt(o)},row_getCanSelectSubRows:{fn:o=>sn(o)},row_getCanMultiSelect:{fn:o=>co(o)},row_getToggleSelectedHandler:{fn:(o,i)=>vm(o,i)}})},constructTableAPIs:e=>{Z("rowSelectionFeature",e,{table_setRowSelection:{fn:t=>To(e,t)},table_resetRowSelection:{fn:t=>dm(e,t)},table_toggleAllRowsSelected:{fn:(t,o)=>Ts(e,t,o)},table_toggleAllPageRowsSelected:{fn:(t,o)=>Ls(e,t,o)},table_getPreSelectedRowModel:{fn:()=>um(e)},table_getSelectedRowModel:{fn:()=>hm(e),memoDeps:()=>[e.atoms.rowSelection?.get(),e.getCoreRowModel()]},table_getFilteredSelectedRowModel:{fn:()=>pm(e),memoDeps:()=>[e.atoms.rowSelection?.get(),e.getFilteredRowModel()]},table_getGroupedSelectedRowModel:{fn:()=>mm(e),memoDeps:()=>[e.atoms.rowSelection?.get(),e.getSortedRowModel()]},table_getSelectedRowIds:{fn:()=>Ps(e),memoDeps:()=>[e.atoms.rowSelection?.get()]},table_getIsAllRowsSelected:{fn:()=>Vs(e),memoDeps:()=>[e.atoms.rowSelection?.get(),e.getFilteredRowModel(),e.options.enableRowSelection,e.options.enableSubRowSelection]},table_getIsAllPageRowsSelected:{fn:()=>Bs(e),memoDeps:()=>[e.atoms.rowSelection?.get(),e.getPaginatedRowModel(),e.options.enableRowSelection,e.options.enableSubRowSelection]},table_getIsSomeRowsSelected:{fn:()=>Wi(e),memoDeps:()=>[e.atoms.rowSelection?.get()]},table_getIsSomePageRowsSelected:{fn:()=>fm(e),memoDeps:()=>[e.atoms.rowSelection?.get(),e.getPaginatedRowModel(),e.options.enableRowSelection]},table_getToggleAllRowsSelectedHandler:{fn:()=>gm(e)},table_getToggleAllPageRowsSelectedHandler:{fn:()=>bm(e)}})}};var js={getInitialState(e){return{sorting:Ah(),...e}},getDefaultColumnDef(){return{sortFn:"auto",sortUndefined:1}},getDefaultTableOptions(e){return{autoResetSorting:!1,onSortingChange:me("sorting",e),isMultiSortEvent:t=>t.shiftKey}},assignColumnPrototype(e,t){j("rowSortingFeature",e,t,{column_getAutoSortFn:{fn:o=>Ua(o)},column_getAutoSortDir:{fn:o=>ja(o)},column_getSortFn:{fn:o=>Hr(o)},column_toggleSorting:{fn:(o,i,r)=>Ga(o,i,r)},column_getFirstSortDir:{fn:o=>Ka(o)},column_getNextSortingOrder:{fn:(o,i)=>Ya(o,i)},column_getCanSort:{fn:o=>Hi(o)},column_getCanMultiSort:{fn:o=>Vi(o)},column_getIsSorted:{fn:o=>Xa(o)},column_getSortIndex:{fn:o=>Fh(o)},column_clearSorting:{fn:o=>Dh(o)},column_getToggleSortingHandler:{fn:o=>Ih(o)}})},constructTableAPIs(e){Z("rowSortingFeature",e,{table_setSorting:{fn:t=>Bi(e,t)},table_resetSorting:{fn:t=>Wa(e,t)}})}};function Gs(e){return typeof e=="number"}function Tb(e){return e instanceof Date&&!Number.isNaN(e.getTime())}function ui(e){if(Gs(e))return"number";if(Tb(e))return"date"}function cn(e,t){return(e instanceof Date?e.getTime():e)-(t instanceof Date?t.getTime():t)}function Ks(e){return e instanceof Date?e.getTime():e}var Ys={aggregate:e=>{let t=e.rows,o=0;for(let i=0;i<t.length;i++){let r=e.getValue(t[i]);o+=typeof r=="number"?r:0}return o},merge:({subRowResults:e})=>{let t=0;for(let o=0;o<e.length;o++){let i=e[o];Gs(i)&&(t+=i)}return t}},Xs={aggregate:e=>{let t=e.rows,o,i,r=0;for(let n=0;n<t.length;n++){let a=e.getValue(t[n]),s=ui(a);if(!s||o!==void 0&&s!==o)continue;let c=Ks(a);o===void 0?(o=s,i=a,r=c):c-r<0&&(i=a,r=c)}return i},merge:({subRowResults:e})=>{let t,o;for(let i=0;i<e.length;i++){let r=e[i],n=ui(r);n&&r!==void 0&&(o??=n,o===n&&(t===void 0||cn(r,t)<0)&&(t=r))}return t}},Qs={aggregate:e=>{let t=e.rows,o,i,r=0;for(let n=0;n<t.length;n++){let a=e.getValue(t[n]),s=ui(a);if(!s||o!==void 0&&s!==o)continue;let c=Ks(a);o===void 0?(o=s,i=a,r=c):c-r>0&&(i=a,r=c)}return i},merge:({subRowResults:e})=>{let t,o;for(let i=0;i<e.length;i++){let r=e[i],n=ui(r);n&&r!==void 0&&(o??=n,o===n&&(t===void 0||cn(r,t)>0)&&(t=r))}return t}},Js={aggregate:e=>{let t=e.rows,o,i,r,n=0,a=0;for(let s=0;s<t.length;s++){let c=e.getValue(t[s]),d=ui(c);if(!d||o!==void 0&&d!==o)continue;let h=Ks(c);o===void 0?(o=d,i=r=c,n=a=h):(h-n<0&&(i=c,n=h),h-a>0&&(r=c,a=h))}return o===void 0?[void 0,void 0]:[i,r]},merge:({subRowResults:e})=>{let t=[void 0,void 0],o;for(let i=0;i<e.length;i++){let r=e[i],n=r[0],a=r[1],s=ui(n);if(!(!s||n===void 0||a===void 0)&&(o??=s,o===s))if(t[0]===void 0)t=[n,a];else{cn(n,t[0])<0&&(t[0]=n);let c=t[1];(c===void 0||cn(a,c)>0)&&(t[1]=a)}}return t}},Zs={aggregate:e=>{let t=e.rows,o=0,i=0;for(let r=0;r<t.length;r++){let n=e.getValue(t[r]);if(n==null)continue;let a=typeof n=="number"?n:+n;Number.isNaN(a)||(o++,i+=a)}return o?i/o:void 0}},el={aggregate:e=>{let t=e.rows,o=[];for(let r=0;r<t.length;r++){let n=e.getValue(t[r]);typeof n=="number"&&o.push(n)}if(!o.length)return;o.sort((r,n)=>r-n);let i=Math.floor(o.length/2);return o.length%2?o[i]:(o[i-1]+o[i])/2}},tl={aggregate:e=>{let t=e.rows,o=new Set;for(let i=0;i<t.length;i++)o.add(e.getValue(t[i]));return Array.from(o)}},ol={aggregate:e=>{let t=e.rows,o=new Set;for(let i=0;i<t.length;i++)o.add(e.getValue(t[i]));return o.size}},il={aggregate:({rows:e})=>e.length,merge:({subRowResults:e})=>{let t=0;for(let o=0;o<e.length;o++){let i=e[o];Gs(i)&&(t+=i)}return t}},Lb={aggregate:e=>e.rows[0]?e.getValue(e.rows[0]):void 0,merge:({subRowResults:e})=>e[0]},Pb={aggregate:e=>{let t=e.rows[e.rows.length-1];return t?e.getValue(t):void 0},merge:({subRowResults:e})=>e[e.length-1]};function rl(){return(e,t)=>{let o=e;return Re({feature:"columnFacetingFeature",fn:i=>Vb(o,t,i),fnName:"table.getFacetedMinMaxValues",memoDeps:()=>{if(t==="__global__")return[R(o,"getGlobalFacetedRowModel",ai).flatRows];let i=o.getColumn(t);return i?[R(i,"getFacetedRowModel",ni,o).flatRows]:[o.getPreFilteredRowModel().flatRows]},table:o})}}function Vb(e,t,o){if(!o.length)return;let i=t==="__global__"?e.getAllLeafColumns().filter(s=>lo(s)).map(s=>s.id):[t],r=Number.POSITIVE_INFINITY,n=Number.NEGATIVE_INFINITY,a=!1;for(let s=0;s<o.length;s++)for(let c=0;c<i.length;c++){let d=Number(o[s].getValue(i[c]));Number.isNaN(d)||(a=!0,d<r&&(r=d),d>n&&(n=d))}if(a)return[r,n]}function dn(e,t,o){return o.options.filterFromLeafRows?Bb(e,t,o):Hb(e,t,o)}function Bb(e,t,o){let i=[],r=D(),n=o.options.maxLeafRowFilterDepth??100,a=(c,d=0)=>{let h=[];for(let m of c){let p=Io(o,m.id,m.original,m.index,m.depth,void 0,m.parentId);p.columnFilters=m.columnFilters,p.columnFiltersMeta=m.columnFiltersMeta,m.subRows.length&&d<n?(p.subRows=a(m.subRows,d+1),(p.subRows.length||t(p))&&h.push(p)):t(p)&&(p.subRows=m.subRows,h.push(p))}return h},s=a(e);return nl(s,i,r),{rows:s,flatRows:i,rowsById:r}}function Hb(e,t,o){let i=[],r=D(),n=o.options.maxLeafRowFilterDepth??100,a=(s,c=0)=>{let d=[];for(let h of s)if(t(h))if(h.subRows.length&&c<n){let m=Io(o,h.id,h.original,h.index,h.depth,void 0,h.parentId),p=h;m.columnFilters=p.columnFilters,m.columnFiltersMeta=p.columnFiltersMeta,d.push(m),i.push(m),r[m.id]=m,m.subRows=a(h.subRows,c+1)}else d.push(h),i.push(h),r[h.id]=h,h.subRows.length&&c>=n&&nl(h.subRows,i,r);return d};return{rows:a(e),flatRows:i,rowsById:r}}function nl(e,t,o){for(let i of e)t.push(i),o[i.id]=i,i.subRows.length&&nl(i.subRows,t,o)}function al(){return(e,t)=>{let o=e;return Re({feature:"columnFacetingFeature",table:o,fnName:"createFacetedRowModel",memoDeps:()=>[o.getPreFilteredRowModel(),o.atoms.columnFilters?.get(),o.atoms.globalFilter?.get(),o.getFilteredRowModel()],fn:(i,r,n)=>Nb(o,t,i,r,n)})}}function Nb(e,t,o,i,r){let n=r!=null&&r!=="";if(!o.rows.length||!i?.length&&!n)return o;let a=[];if(i)for(let c=0;c<i.length;c++){let d=i[c].id;d!==t&&a.push(d)}if(n&&t!=="__global__"&&a.push("__global__"),!a.length)return o;let s=c=>{for(let d=0;d<a.length;d++)if(c.columnFilters?.[a[d]]===!1)return!1;return!0};return dn(o.rows,s,e)}function sl(){return(e,t)=>{let o=e;return Re({feature:"columnFacetingFeature",table:o,fnName:"table.getFacetedUniqueValues",memoDeps:()=>{if(t==="__global__")return[R(o,"getGlobalFacetedRowModel",ai).flatRows];let i=o.getColumn(t);return i?[R(i,"getFacetedRowModel",ni,o).flatRows]:[o.getPreFilteredRowModel().flatRows]},fn:i=>qb(o,t,i)})}}function qb(e,t,o){let i=t==="__global__"?e.getAllLeafColumns().filter(n=>lo(n)).map(n=>n.id):[t],r=new Map;for(let n=0;n<o.length;n++)for(let a=0;a<i.length;a++){let s=o[n].getUniqueValues(i[a]);if(s)for(let c=0;c<s.length;c++){let d=s[c],h=r.get(d);r.set(d,h===void 0?1:h+1)}}return r}function ll(){return e=>{let t=e;return Re({feature:"columnFilteringFeature",table:t,fnName:"table.getFilteredRowModel",memoDeps:()=>[t.getPreFilteredRowModel(),t.atoms.columnFilters?.get(),t.atoms.globalFilter?.get()],fn:()=>Wb(t),onAfterUpdate:zo(()=>zt(t))})}}function Wb(e){let t=e.getPreFilteredRowModel(),o=e.atoms.columnFilters?.get(),i=e.atoms.globalFilter?.get(),r=i!=null&&i!=="";if(!t.rows.length||!o?.length&&!r){let p=t.flatRows;for(let f=0;f<p.length;f++){let g=p[f];g.columnFilters=D(),g.columnFiltersMeta=D()}return t}let n=[],a=[];o?.forEach(p=>{let f=Do(e,p.id);if(!f)return;let g=si(f);g&&n.push({id:p.id,filterFn:g,resolvedValue:g.resolveFilterValue?.(p.value)??p.value})});let s=o?.map(p=>p.id)??[],c=rn(e),d=e.getAllLeafColumns().filter(p=>lo(p));r&&c&&d.length&&(s.push("__global__"),d.forEach(p=>{a.push({id:p.id,filterFn:c,resolvedValue:c.resolveFilterValue?.(i)??i})}));let h=t.flatRows;for(let p=0;p<h.length;p++){let f=h[p];if(f.columnFilters=D(),f.columnFiltersMeta=D(),n.length)for(let g=0;g<n.length;g++){let w=n[g],x=w.id;f.columnFilters[x]=w.filterFn(f,x,w.resolvedValue,y=>{f.columnFiltersMeta||(f.columnFiltersMeta=D()),f.columnFiltersMeta[x]=y})}if(a.length){for(let g=0;g<a.length;g++){let w=a[g],x=w.id;if(w.filterFn(f,x,w.resolvedValue,y=>{f.columnFiltersMeta||(f.columnFiltersMeta=D()),f.columnFiltersMeta[x]=y})){f.columnFilters.__global__=!0;break}}f.columnFilters.__global__!==!0&&(f.columnFilters.__global__=!1)}}let m=p=>{for(let f=0;f<s.length;f++)if(p.columnFilters[s[f]]===!1)return!1;return!0};return dn(t.rows,m,e)}function cl(){return e=>{let t=e,o=!1,i,r;return Re({feature:"columnGroupingFeature",table:t,fnName:"table.getGroupedRowModel",memoDeps:()=>[t.atoms.grouping?.get(),t.getPreGroupedRowModel(),t.options.columns],fn:()=>Ub(t),onAfterUpdate:()=>{let n=t.atoms.grouping?.get(),a=t.getPreGroupedRowModel(),s=o&&(n!==i||a!==r);i=n,r=a,o=!0,s&&(ti(t),zt(t))}})}}function Ub(e){let t=e.getPreGroupedRowModel(),o=e.atoms.grouping?.get();if(!t.rows.length||!o?.length)return Cm(t.rows,0,void 0),t;let i=o.filter(s=>Do(e,s)),r=[],n=D(),a=(s,c=0,d)=>{if(c>=i.length)return s.map(p=>(p.depth=c,r.push(p),n[p.id]=p,p.subRows.length&&(p.subRows=a(p.subRows,c+1,p.id)),p));let h=i[c],m=jb(e,s,h);return Array.from(m.entries()).map(([p,f],g)=>{let w=`${h}:${p}`;w=d?`${d}>${w}`:w;let x=r.length;r.push(void 0);let y=a(f,c+1,w);y.forEach(M=>{M.parentId=w});let C=ss(f,1/0),L=Io(e,w,C[0].original,g,c,void 0,d);return Object.assign(L,{groupingColumnId:h,groupingValue:p,subRows:y,leafRows:C,getValue:M=>{let $=i.indexOf(M);if($!==-1&&$<=c)return Ce(L._valuesCache,M)||f[0]&&(L._valuesCache[M]=f[0].getValue(M)??void 0),L._valuesCache[M];let A=L._aggregationValuesCache;if(A&&Ce(A,M))return A[M];let v=e.getColumn(M);if(typeof v.getAggregationFns!="function")return;let O=L._aggregationValuesCache??=D();return O[M]=jr({subRows:y,column:v,groupingRow:L,rows:f,uniqueRows:!0}),O[M]}}),r[x]=L,n[w]=L,L})};return{rows:a(t.rows,0),flatRows:r,rowsById:n}}function Cm(e,t,o){for(let i=0;i<e.length;i++){let r=e[i];r.depth=t,r.parentId=o,r.subRows.length&&Cm(r.subRows,t+1,r.id)}}function jb(e,t,o){let i=new Map,r=Do(e,o)?.columnDef.getGroupingValue;for(let n=0;n<t.length;n++){let a=t[n],s;if(r){let h=a._groupingValuesCache;h&&Ce(h,o)?s=h[o]:h&&(s=h[o]=r(a.original,a.index,a))}else s=a.getValue(o);let c=`${s}`,d=i.get(c);d?d.push(a):i.set(c,[a])}return i}function dl(){return e=>{let t=e;return Re({feature:"rowExpandingFeature",table:t,fnName:"table.getExpandedRowModel",memoDeps:()=>[t.atoms.expanded?.get(),t.getPreExpandedRowModel(),t.options.paginateExpandedRows,t.options.manualPagination],fn:()=>Gb(t)})}}function Gb(e){let t=e.getPreExpandedRowModel(),o=e.atoms.expanded?.get();return!t.rows.length||o!==!0&&!Object.keys(o??{}).length||!e.options.paginateExpandedRows&&!e.options.manualPagination?t:un(t)}function un(e){let t=[],o=i=>{t.push(i),i.subRows.length&&oi(i)&&i.subRows.forEach(o)};return e.rows.forEach(o),{rows:t,flatRows:e.flatRows,rowsById:e.rowsById}}function ul(){return e=>{let t=e;return Re({feature:"rowPaginationFeature",table:t,fnName:"table.getPaginatedRowModel",memoDeps:()=>[t.getPrePaginatedRowModel(),t.atoms.pagination?.get(),t.options.paginateExpandedRows?void 0:t.atoms.expanded?.get()],fn:()=>Kb(t)})}}function Kb(e){let t=e.getPrePaginatedRowModel(),o=e.atoms.pagination?.get();if(!t.rows.length)return t;let{pageSize:i,pageIndex:r}=o??ii(),{rows:n,flatRows:a,rowsById:s}=t,c=n;if(i!==1/0||r!==0){let p=i*r,f=p+i;c=n.slice(p,f)}let d;e.options.paginateExpandedRows?d={rows:c,flatRows:a,rowsById:s}:d=un({rows:c,flatRows:a,rowsById:s}),d.flatRows=[];let h=new Set,m=p=>{h.has(p.id)||(h.add(p.id),d.flatRows.push(p),p.subRows.length&&p.subRows.forEach(m))};return d.rows.forEach(m),d}function hl(){return e=>{let t=e;return Re({feature:"rowSortingFeature",table:t,fnName:"table.getSortedRowModel",memoDeps:()=>[t.atoms.sorting?.get(),t.getPreSortedRowModel()],fn:()=>Yb(t),onAfterUpdate:zo(()=>zt(t))})}}function Yb(e){let t=e.getPreSortedRowModel(),o=e.atoms.sorting?.get();if(!t.rows.length||!o?.length)return t;let i=[],r=o.filter(c=>{let d=e.getColumn(c.id);return d?Hi(d):!1});if(!r.length)return t;let n=[];for(let c=0;c<r.length;c++){let d=r[c],h=e.getColumn(d.id);h&&n.push({id:d.id,desc:d.desc,sortUndefined:h.columnDef.sortUndefined,invertSorting:h.columnDef.invertSorting,sortFn:Hr(h)})}let a=(c,d)=>{for(let h=0;h<n.length;h++){let m=n[h],p=m.sortUndefined,f=m.desc,g=0;if(p){let w=c.getValue(m.id),x=d.getValue(m.id),y=w===void 0,C=x===void 0;if(y&&C)continue;if(y||C){if(p==="first")return y?-1:1;if(p==="last")return y?1:-1;g=y?p:-p}}if(g===0&&(g=m.sortFn(c,d,m.id)),g!==0)return f&&(g*=-1),m.invertSorting&&(g*=-1),g}return c.index-d.index},s=c=>{let d=c.slice();d.sort(a);let h=!1;for(let m=0;m<d.length;m++){let p=d[m];p!==c[m]&&(h=!0);let f=i.length;if(i.push(p),p.subRows.length){let g=s(p.subRows);if(g.changed){let w=Object.create(Object.getPrototypeOf(p));$i(w,p),w.subRows=g.rows,d[m]=w,i[f]=w,h=!0}}}return{rows:d,changed:h}};return{rows:s(t.rows).rows,flatRows:i,rowsById:t.rowsById}}function Sm(){return{createOptionsStore:!0,wrapExternalAtoms:!1,addSubscription:()=>{throw new Error("Feature not supported in current reactivity implementation")},unmount:()=>{throw new Error("Feature not supported in current reactivity implementation")},batch:ts,schedule:e=>queueMicrotask(e),untrack:e=>e(),createReadonlyAtom:(e,t)=>Ur(()=>e(),{compare:t?.compare}),createWritableAtom:(e,t)=>Ur(e,{compare:t?.compare})}}var Xb={coreReactivityFeature:Sm(),rowSortingFeature:js,columnFilteringFeature:hs,globalFilteringFeature:$s,rowSelectionFeature:Us,rowExpandingFeature:Ms,rowPaginationFeature:Os,columnGroupingFeature:gs,rowAggregationFeature:cs,columnFacetingFeature:ns,columnOrderingFeature:bs,columnPinningFeature:ws,columnVisibilityFeature:ks,columnSizingFeature:_s,columnResizingFeature:Ss,sortedRowModel:hl(),filteredRowModel:ll(),paginatedRowModel:ul(),expandedRowModel:dl(),groupedRowModel:cl(),facetedRowModel:al(),facetedUniqueValues:sl(),facetedMinMaxValues:rl(),sortFns:{alphanumeric:za,alphanumericCaseSensitive:Fa,basic:ei,datetime:$a,text:Da,textCaseSensitive:Ia},filterFns:{arrIncludesAll:zs,arrIncludesSome:Fs,equalsString:Rs,includesString:qi,inNumberRange:As},aggregationFns:{count:il,extent:Js,max:Qs,mean:Zs,median:el,min:Xs,sum:Ys,unique:tl,uniqueCount:ol}},_m=class{constructor(e){this.table=null,this.state=null,this.changeHandlers={onSortingChange:this.sliceUpdater("sorting"),onColumnFiltersChange:this.sliceUpdater("columnFilters"),onGlobalFilterChange:this.sliceUpdater("globalFilter"),onRowSelectionChange:this.sliceUpdater("rowSelection"),onExpandedChange:this.sliceUpdater("expanded"),onPaginationChange:this.sliceUpdater("pagination"),onGroupingChange:this.sliceUpdater("grouping"),onColumnOrderChange:this.sliceUpdater("columnOrder"),onColumnPinningChange:this.sliceUpdater("columnPinning"),onColumnVisibilityChange:this.sliceUpdater("columnVisibility"),onColumnSizingChange:this.sliceUpdater("columnSizing"),onColumnResizingChange:this.sliceUpdater("columnResizing")},(this.host=e).addController(this)}sliceUpdater(e){return t=>{this.state={...this.state,[e]:nt(t,this.state[e])},this.host.requestUpdate()}}hostDisconnected(){this.table=null,this.state=null}getTable(e){return this.table===null&&(this.table=rs(this.resolveOptions(e)),this.state={...this.table.initialState}),this.state={...this.state,...e.controlledState??{}},this.table.setOptions(t=>({...t,...this.resolveOptions(e)})),this.table}resolveOptions(e){let{enablePagination:t,controlledState:o,...i}=e;return{...i,features:Xb,state:this.state??{},...this.changeHandlers}}};function km(e,t,o){let i=new Array(e);return new Proxy(i,{get(r,n,a){if(typeof n=="string"){let s=n.charCodeAt(0);if(s>=48&&s<=57){let c=+n;if(Number.isInteger(c)&&c>=0&&c<e){let d=r[c];if(!d){let h=t[c*2];d=r[c]={index:c,key:o(c),start:h,size:t[c*2+1],end:h+t[c*2+1],lane:0}}return d}}if(n==="length")return e}return Reflect.get(r,n,a)}})}function Lo(e,t,o){let i=o.initialDeps??[],r,n=!0;function a(){var s;let d=0,h=e();if(!(h.length!==i.length||h.some((f,g)=>i[g]!==f)))return r;i=h;let p=0;return r=t(...h),o?.onChange&&!(n&&o.skipInitialOnChange)&&o.onChange(r),n=!1,r}return a.updateDeps=s=>{i=s},a}function pl(e,t){if(e===void 0)throw new Error(`Unexpected undefined${t?`: ${t}`:""}`);return e}var Em=(e,t)=>Math.abs(e-t)<1.01,Rm=(e,t,o)=>{let i;return Object.assign(function(...r){e.clearTimeout(i),i=e.setTimeout(()=>t.apply(this,r),o)},{cancel:()=>{e.clearTimeout(i)}})};var ji,ml=()=>{if(ji!==void 0)return ji;if(typeof navigator>"u")return ji=!1;if(/iP(hone|od|ad)/.test(navigator.userAgent))return ji=!0;let e=navigator.maxTouchPoints;return ji=navigator.platform==="MacIntel"&&e!==void 0&&e>0};var Am=e=>{let{offsetWidth:t,offsetHeight:o}=e;return{width:t,height:o}},Qb=e=>e,fl=e=>{let t=Math.max(e.startIndex-e.overscan,0),i=Math.min(e.endIndex+e.overscan,e.count-1)-t+1,r=new Array(i);for(let n=0;n<i;n++)r[n]=t+n;return r},zm=(e,t)=>{let o=e.scrollElement;if(!o)return;let i=e.targetWindow;if(!i)return;let r=a=>{let{width:s,height:c}=a;t({width:Math.round(s),height:Math.round(c)})};if(r(Am(o)),!i.ResizeObserver)return()=>{};let n=new i.ResizeObserver(a=>{let s=()=>{let c=a[0];if(c?.borderBoxSize){let d=c.borderBoxSize[0];if(d){r({width:d.inlineSize,height:d.blockSize});return}}r(Am(o))};e.options.useAnimationFrameWithResizeObserver?requestAnimationFrame(s):s()});return n.observe(o,{box:"border-box"}),()=>{n.unobserve(o)}},hn={passive:!0};var Jb=typeof window>"u"?!0:"onscrollend"in window,Zb=(e,t,o)=>{let i=e.scrollElement;if(!i)return;let r=e.targetWindow;if(!r)return;let n=e.options.useScrollendEvent&&Jb,a=0,s=n?null:Rm(r,()=>t(a,!1),e.options.isScrollingResetDelay),c=m=>()=>{a=o(i),s?.(),t(a,m)},d=c(!0),h=c(!1);return i.addEventListener("scroll",d,hn),n&&i.addEventListener("scrollend",h,hn),()=>{i.removeEventListener("scroll",d),n&&i.removeEventListener("scrollend",h),s?.cancel()}},Fm=(e,t)=>Zb(e,t,o=>{let{horizontal:i,isRtl:r}=e.options;return i?o.scrollLeft*(r&&-1||1):o.scrollTop});var ew=(e,t,o)=>{if(o.options.useCachedMeasurements){let i=o.indexFromElement(e),r=o.options.getItemKey(i);return o.itemSizeCache.get(r)??o.options.estimateSize(i)}if(t?.borderBoxSize){let i=t.borderBoxSize[0];if(i)return Math.round(i[o.options.horizontal?"inlineSize":"blockSize"])}if(!t){let i=o.indexFromElement(e),r=o.options.getItemKey(i),n=o.itemSizeCache.get(r);if(n!==void 0)return n}return e[o.options.horizontal?"offsetWidth":"offsetHeight"]},tw=(e,{adjustments:t=0,behavior:o},i)=>{var r,n;(n=(r=i.scrollElement)==null?void 0:r.scrollTo)==null||n.call(r,{[i.options.horizontal?"left":"top"]:e+t,behavior:o})};var Dm=tw,pn=class{constructor(t){this.unsubs=[],this.scrollElement=null,this.targetWindow=null,this.isScrolling=!1,this.scrollState=null,this.measurementsCache=[],this._flatMeasurements=null,this.itemSizeCache=new Map,this.itemSizeCacheVersion=0,this.laneAssignments=new Map,this.pendingMin=null,this.prevLanes=void 0,this.lanesChangedFlag=!1,this.lanesSettling=!1,this.pendingScrollAnchor=null,this.scrollRect=null,this.scrollOffset=null,this.scrollDirection=null,this.scrollAdjustments=0,this._iosDeferredAdjustment=0,this._iosTouching=!1,this._iosJustTouchEnded=!1,this._iosTouchEndTimerId=null,this._intendedScrollOffset=null,this.elementsCache=new Map,this.now=()=>{var o,i,r;return((r=(i=(o=this.targetWindow)==null?void 0:o.performance)==null?void 0:i.now)==null?void 0:r.call(i))??Date.now()},this.observer=(()=>{let o=null,i=()=>o||(!this.targetWindow||!this.targetWindow.ResizeObserver?null:o=new this.targetWindow.ResizeObserver(r=>{r.forEach(n=>{let a=()=>{let s=n.target,c=this.indexFromElement(s);if(!s.isConnected){this.observer.unobserve(s);for(let[d,h]of this.elementsCache)if(h===s){this.elementsCache.delete(d);break}return}this.isIndexInRange(c)&&this.shouldMeasureDuringScroll(c)&&this.resizeItem(c,this.options.measureElement(s,n,this))};this.options.useAnimationFrameWithResizeObserver?requestAnimationFrame(a):a()})}));return{disconnect:()=>{var r;(r=i())==null||r.disconnect(),o=null},observe:r=>{var n;return(n=i())==null?void 0:n.observe(r,{box:"border-box"})},unobserve:r=>{var n;return(n=i())==null?void 0:n.unobserve(r)}}})(),this.range=null,this.setOptions=o=>{var i,r;let n={debug:!1,initialOffset:0,overscan:1,paddingStart:0,paddingEnd:0,scrollPaddingStart:0,scrollPaddingEnd:0,horizontal:!1,getItemKey:Qb,rangeExtractor:fl,onChange:()=>{},measureElement:ew,initialRect:{width:0,height:0},scrollMargin:0,gap:0,indexAttribute:"data-index",initialMeasurementsCache:[],lanes:1,anchorTo:"start",followOnAppend:!1,scrollEndThreshold:1,isScrollingResetDelay:150,enabled:!0,isRtl:!1,useScrollendEvent:!1,useAnimationFrameWithResizeObserver:!1,laneAssignmentMode:"estimate",useCachedMeasurements:!1};for(let p in o){let f=o[p];f!==void 0&&(n[p]=f)}let a=this.options,s=null,c=null,d=!1;if(a!==void 0&&a.enabled&&n.enabled&&n.anchorTo==="end"&&this.scrollElement!==null){let p=a.count,f=n.count,g=this.getMeasurements(),w=p>0?((i=g[0])==null?void 0:i.key)??a.getItemKey(0):null,x=p>0?((r=g[p-1])==null?void 0:r.key)??a.getItemKey(p-1):null;if(f!==p||p>0&&f>0&&(n.getItemKey(0)!==w||n.getItemKey(f-1)!==x)){d=!0;let L=p>0?this.getVirtualItemForOffset(this.getScrollOffset())??g[0]:null;L&&(s=[L.key,this.getScrollOffset()-L.start]);let M=n.followOnAppend===!0?"auto":n.followOnAppend||null;M&&f>p&&this.isAtEnd(a.scrollEndThreshold)&&(p===0||n.getItemKey(f-1)!==x)&&(c=M)}}this.options=n,d&&(this.pendingMin=0,this.itemSizeCacheVersion++);let h=!1,m=0;if(s&&this.scrollOffset!==null){let[p,f]=s,g=this.getMeasurements(),{count:w,getItemKey:x}=this.options,y=0;for(;y<w&&x(y)!==p;)y++;if(y<w){let C=g[y];if(C){let L=Math.max(0,C.start+f);L!==this.scrollOffset&&(m=L-this.scrollOffset,this.scrollOffset=L,h=!0)}}}(h||c)&&(this.pendingScrollAnchor=[h?s[0]:null,h?s[1]:0,c,m])},this.notify=o=>{var i,r;(r=(i=this.options).onChange)==null||r.call(i,this,o)},this.maybeNotify=Lo(()=>(this.calculateRange(),[this.isScrolling,this.range?this.range.startIndex:null,this.range?this.range.endIndex:null]),o=>{this.notify(o)},{key:!1,debug:()=>this.options.debug,initialDeps:[this.isScrolling,this.range?this.range.startIndex:null,this.range?this.range.endIndex:null]}),this.cleanup=()=>{this.unsubs.filter(Boolean).forEach(o=>o()),this.unsubs=[],this.observer.disconnect(),this.rafId!=null&&this.targetWindow&&(this.targetWindow.cancelAnimationFrame(this.rafId),this.rafId=null),this.scrollState=null,this.isScrolling=!1,this.scrollDirection=null,this._iosDeferredAdjustment=0,this._iosTouching=!1,this._iosJustTouchEnded=!1,this.scrollElement=null,this.targetWindow=null},this._didMount=()=>()=>{this.cleanup()},this._willUpdate=()=>{var o;let i=this.options.enabled?this.options.getScrollElement():null;if(this.scrollElement!==i){if(this.cleanup(),!i){this.maybeNotify();return}if(this.scrollElement=i,this.scrollElement&&"ownerDocument"in this.scrollElement?this.targetWindow=this.scrollElement.ownerDocument.defaultView:this.targetWindow=((o=this.scrollElement)==null?void 0:o.window)??null,this.elementsCache.forEach(n=>{this.observer.observe(n)}),this.unsubs.push(this.options.observeElementRect(this,n=>{this.scrollRect=n,this.maybeNotify()})),this.unsubs.push(this.options.observeElementOffset(this,(n,a)=>{if(a&&this._intendedScrollOffset===null&&n===this.scrollOffset)return;this._intendedScrollOffset!==null&&Math.abs(n-this._intendedScrollOffset)<1.5&&(n=this._intendedScrollOffset),this._intendedScrollOffset=null,this.scrollAdjustments=0;let s=this.getScrollOffset();this.scrollDirection=a?s===n?this.scrollDirection:s<n?"forward":"backward":null,this.scrollOffset=n,this.isScrolling=a,this._flushIosDeferredIfReady(),this.scrollState&&this.scheduleScrollReconcile(),this.maybeNotify()})),"addEventListener"in this.scrollElement){let n=this.scrollElement,a=()=>{this._iosTouching=!0,this._iosJustTouchEnded=!1,this._iosTouchEndTimerId!==null&&this.targetWindow!=null&&(this.targetWindow.clearTimeout(this._iosTouchEndTimerId),this._iosTouchEndTimerId=null)},s=()=>{this._iosTouching=!1,!(!ml()||this.targetWindow==null)&&(this._iosJustTouchEnded=!0,this._iosTouchEndTimerId=this.targetWindow.setTimeout(()=>{this._iosJustTouchEnded=!1,this._iosTouchEndTimerId=null,this._flushIosDeferredIfReady()},150))};n.addEventListener("touchstart",a,hn),n.addEventListener("touchend",s,hn),this.unsubs.push(()=>{n.removeEventListener("touchstart",a),n.removeEventListener("touchend",s),this._iosTouchEndTimerId!==null&&this.targetWindow!=null&&(this.targetWindow.clearTimeout(this._iosTouchEndTimerId),this._iosTouchEndTimerId=null)})}this._scrollToOffset(this.getScrollOffset(),{adjustments:void 0,behavior:void 0})}let r=this.pendingScrollAnchor;if(this.pendingScrollAnchor=null,r&&this.scrollElement&&this.options.enabled){let[n,a,s,c]=r;n!==null&&!s&&(ml()&&(this.isScrolling||this._iosTouching||this._iosJustTouchEnded)?c!==0&&(this._iosDeferredAdjustment+=c):this._scrollToOffset(this.getScrollOffset(),{adjustments:void 0,behavior:void 0})),s&&this.scrollToEnd({behavior:s})}},this._flushIosDeferredIfReady=()=>{if(this._iosDeferredAdjustment===0||this.isScrolling||this._iosTouching||this._iosJustTouchEnded)return;let o=this.getScrollOffset(),i=this.getMaxScrollOffset();if(o<0||o>i)return;if(this._iosDeferredAdjustment<0&&o>=i-1){this._iosDeferredAdjustment=0;return}let r=this._iosDeferredAdjustment;this._iosDeferredAdjustment=0,this._scrollToOffset(o,{adjustments:this.scrollAdjustments+=r,behavior:void 0})},this.rafId=null,this.getSize=()=>this.options.enabled?(this.scrollRect=this.scrollRect??this.options.initialRect,this.scrollRect[this.options.horizontal?"width":"height"]):(this.scrollRect=null,0),this.getScrollOffset=()=>this.options.enabled?(this.scrollOffset=this.scrollOffset??(typeof this.options.initialOffset=="function"?this.options.initialOffset():this.options.initialOffset),this.scrollOffset):(this.scrollOffset=null,0),this.getMeasurementOptions=Lo(()=>[this.options.count,this.options.paddingStart,this.options.scrollMargin,this.options.getItemKey,this.options.enabled,this.options.lanes,this.options.laneAssignmentMode,this.options.gap],(o,i,r,n,a,s,c,d)=>(this.prevLanes!==void 0&&this.prevLanes!==s&&(this.lanesChangedFlag=!0),this.prevLanes=s,this.pendingMin=null,{count:o,paddingStart:i,scrollMargin:r,getItemKey:n,enabled:a,lanes:s,laneAssignmentMode:c,gap:d}),{key:!1}),this.isIndexInRange=o=>o>=0&&o<this.options.count,this.getMeasurements=Lo(()=>[this.getMeasurementOptions(),this.itemSizeCacheVersion],({count:o,paddingStart:i,scrollMargin:r,getItemKey:n,enabled:a,lanes:s,laneAssignmentMode:c,gap:d},h)=>{let m=this.itemSizeCache;if(!a)return this.measurementsCache=[],this.itemSizeCache.clear(),this.laneAssignments.clear(),[];if(this.laneAssignments.size>o)for(let y of this.laneAssignments.keys())y>=o&&this.laneAssignments.delete(y);this.lanesChangedFlag&&(this.lanesChangedFlag=!1,this.lanesSettling=!0,this.measurementsCache=[],this.itemSizeCache.clear(),this.laneAssignments.clear(),this.pendingMin=null),this.measurementsCache.length===0&&!this.lanesSettling&&(this.measurementsCache=this.options.initialMeasurementsCache,this.measurementsCache.forEach(y=>{this.itemSizeCache.set(y.key,y.size)}));let p=this.lanesSettling?0:this.pendingMin??0;if(this.pendingMin=null,this.lanesSettling&&this.measurementsCache.length===o&&(this.lanesSettling=!1),s===1){let y=o*2,C=this._flatMeasurements;if(!C||C.length<y){let $=new Float64Array(y);C&&p>0&&$.set(C.subarray(0,p*2)),C=$,this._flatMeasurements=C}let L;if(p===0)L=i+r;else{let $=p-1;L=C[$*2]+C[$*2+1]+d}for(let $=p;$<o;$++){let A=n($),v=m.get(A),O=typeof v=="number"?v:this.options.estimateSize($);C[$*2]=L,C[$*2+1]=O,L+=O+d}let M=km(o,C,n);return this.measurementsCache=M,M}let f=this.measurementsCache.slice(0,p),g=new Array(s).fill(void 0),w=new Float64Array(s),x=0;for(let y=0;y<p;y++){let C=f[y];C&&(g[C.lane]===void 0&&x++,g[C.lane]=y,w[C.lane]=C.end)}for(let y=p;y<o;y++){let C=n(y),L=this.laneAssignments.get(y),M,$,A=c==="estimate"||m.has(C);if(L!==void 0&&this.options.lanes>1){M=L;let U=g[M],he=U!==void 0?f[U]:void 0;$=he?he.end+d:i+r}else if(x===s){let U=0,he=w[0],Q=g[0];for(let pe=1;pe<s;pe++){let _e=w[pe];(_e<he||_e===he&&g[pe]<Q)&&(U=pe,he=_e,Q=g[pe])}M=U,$=he+d,A&&this.laneAssignments.set(y,M)}else M=y%this.options.lanes,$=i+r,A&&this.laneAssignments.set(y,M);let v=m.get(C),O=typeof v=="number"?v:this.options.estimateSize(y),Y=$+O;f[y]={index:y,start:$,size:O,end:Y,key:C,lane:M},g[M]===void 0&&x++,g[M]=y,w[M]=Y}return this.measurementsCache=f,f},{key:!1,debug:()=>this.options.debug}),this.calculateRange=Lo(()=>[this.getMeasurements(),this.getSize(),this.getScrollOffset(),this.options.lanes],(o,i,r,n)=>o.length===0||i===0?(this.range=null,null):(this.range=iw(o,i,r,n,n===1&&this._flatMeasurements!=null?this._flatMeasurements:null),this.range),{key:!1,debug:()=>this.options.debug}),this.getVirtualIndexes=Lo(()=>{let o=null,i=null,r=this.calculateRange();return r&&(o=r.startIndex,i=r.endIndex),this.maybeNotify.updateDeps([this.isScrolling,o,i]),[this.options.rangeExtractor,this.options.overscan,this.options.count,o,i]},(o,i,r,n,a)=>n===null||a===null?[]:o({startIndex:n,endIndex:a,overscan:i,count:r}),{key:!1,debug:()=>this.options.debug}),this.indexFromElement=o=>{let i=this.options.indexAttribute,r=o.getAttribute(i);return r?parseInt(r,10):(console.warn(`Missing attribute name '${i}={index}' on measured element.`),-1)},this.shouldMeasureDuringScroll=o=>{var i;if(!this.scrollState||this.scrollState.behavior!=="smooth")return!0;let r=this.scrollState.index??((i=this.getVirtualItemForOffset(this.scrollState.lastTargetOffset))==null?void 0:i.index);if(r!==void 0&&this.range){let n=Math.max(this.options.overscan,Math.ceil((this.range.endIndex-this.range.startIndex)/2)),a=Math.max(0,r-n),s=Math.min(this.options.count-1,r+n);return o>=a&&o<=s}return!0},this.measureElement=o=>{if(!o){this.elementsCache.forEach((a,s)=>{a.isConnected||(this.observer.unobserve(a),this.elementsCache.delete(s))});return}let i=this.indexFromElement(o);if(!this.isIndexInRange(i))return;let r=this.options.getItemKey(i),n=this.elementsCache.get(r);n!==o&&(n&&this.observer.unobserve(n),this.observer.observe(o),this.elementsCache.set(r,o)),(!this.isScrolling||this.scrollState)&&this.shouldMeasureDuringScroll(i)&&this.resizeItem(i,this.options.measureElement(o,void 0,this))},this.resizeItem=(o,i)=>{var r,n;if(!this.isIndexInRange(o))return;let a,s,c,d=this._flatMeasurements;if(this.options.lanes===1&&d!==null)c=this.options.getItemKey(o),s=d[o*2],a=d[o*2+1];else{let p=this.measurementsCache[o];if(!p)return;c=p.key,s=p.start,a=p.size}let h=this.itemSizeCache.get(c)??a,m=i-h;if(m!==0){let p=this.options.anchorTo==="end"&&((r=this.scrollState)==null?void 0:r.behavior)!=="smooth"&&this.getVirtualDistanceFromEnd()<=this.options.scrollEndThreshold,f=p?this.getTotalSize():0,g=this.getScrollOffset()+this.scrollAdjustments,x=!this.itemSizeCache.has(c)?s<g:s+h<=g&&this.scrollDirection!=="backward",y=((n=this.scrollState)==null?void 0:n.behavior)!=="smooth"&&(this.shouldAdjustScrollPositionOnItemSizeChange!==void 0?this.shouldAdjustScrollPositionOnItemSizeChange(this.measurementsCache[o]??{index:o,key:c,start:s,size:a,end:s+a,lane:0},m,this):x);(this.pendingMin===null||o<this.pendingMin)&&(this.pendingMin=o),this.itemSizeCache.set(c,i),this.itemSizeCacheVersion++;let C=!1;p?C=this.applyScrollAdjustment(this.getTotalSize()-f):y&&(C=this.applyScrollAdjustment(m)),this.notify(C)}},this.getVirtualItems=Lo(()=>[this.getVirtualIndexes(),this.getMeasurements()],(o,i)=>{let r=[];for(let n=0,a=o.length;n<a;n++){let s=o[n],c=i[s];r.push(c)}return r},{key:!1,debug:()=>this.options.debug}),this.getVirtualItemForOffset=o=>{let i=this.getMeasurements();if(i.length===0)return;let r=this._flatMeasurements,n=this.options.lanes===1&&r!=null,a=Im(0,i.length-1,n?s=>r[s*2]:s=>pl(i[s]).start,o);return pl(i[a])},this.getMaxScrollOffset=()=>{if(!this.scrollElement)return 0;if("scrollHeight"in this.scrollElement)return this.options.horizontal?this.scrollElement.scrollWidth-this.scrollElement.clientWidth:this.scrollElement.scrollHeight-this.scrollElement.clientHeight;{let o=this.scrollElement.document.documentElement;return this.options.horizontal?o.scrollWidth-this.scrollElement.innerWidth:o.scrollHeight-this.scrollElement.innerHeight}},this.getVirtualDistanceFromEnd=()=>Math.max(this.getTotalSize()-this.getSize()-this.getScrollOffset(),0),this.getDistanceFromEnd=()=>Math.max(this.getMaxScrollOffset()-this.getScrollOffset(),0),this.isAtEnd=(o=this.options.scrollEndThreshold)=>this.getDistanceFromEnd()<=o,this.getOffsetForAlignment=(o,i,r=0)=>{if(!this.scrollElement)return 0;let n=this.getSize(),a=this.getScrollOffset();i==="auto"&&(i=o>=a+n?"end":"start"),i==="center"?o+=(r-n)/2:i==="end"&&(o-=n);let s=this.getMaxScrollOffset();return Math.max(Math.min(s,o),0)},this.getOffsetForIndex=(o,i="auto")=>{o=Math.max(0,Math.min(o,this.options.count-1));let r=this.getSize(),n=this.getScrollOffset(),a=this.measurementsCache[o];if(!a)return;if(i==="auto")if(a.end>=n+r-this.options.scrollPaddingEnd)i="end";else if(a.start<=n+this.options.scrollPaddingStart)i="start";else return[n,i];if(i==="end"&&o===this.options.count-1)return[this.getMaxScrollOffset(),i];let s=i==="end"?a.end+this.options.scrollPaddingEnd:a.start-this.options.scrollPaddingStart;return[this.getOffsetForAlignment(s,i,a.size),i]},this.scrollToOffset=(o,{align:i="start",behavior:r="auto"}={})=>{this._iosDeferredAdjustment=0;let n=this.getOffsetForAlignment(o,i),a=this.now();this.scrollState={index:null,align:i,behavior:r,startedAt:a,lastTargetOffset:n,stableFrames:0},this._scrollToOffset(n,{adjustments:void 0,behavior:r}),this.scheduleScrollReconcile()},this.scrollToIndex=(o,{align:i="auto",behavior:r="auto"}={})=>{this._iosDeferredAdjustment=0,o=Math.max(0,Math.min(o,this.options.count-1));let n=this.getOffsetForIndex(o,i);if(!n)return;let[a,s]=n,c=this.now();this.scrollState={index:o,align:s,behavior:r,startedAt:c,lastTargetOffset:a,stableFrames:0},this._scrollToOffset(a,{adjustments:void 0,behavior:r}),this.scheduleScrollReconcile()},this.scrollBy=(o,{behavior:i="auto"}={})=>{let r=this.getScrollOffset()+o,n=this.now();this.scrollState={index:null,align:"start",behavior:i,startedAt:n,lastTargetOffset:r,stableFrames:0},this._scrollToOffset(r,{adjustments:void 0,behavior:i}),this.scheduleScrollReconcile()},this.scrollToEnd=({behavior:o="auto"}={})=>{if(this.options.count>0){this.scrollToIndex(this.options.count-1,{align:"end",behavior:o});return}this.scrollToOffset(Math.max(this.getTotalSize()-this.getSize(),0),{behavior:o})},this.getTotalSize=()=>{var o;let i=this.getMeasurements(),r;if(i.length===0)r=this.options.paddingStart;else if(this.options.lanes===1){let n=i.length-1,a=this._flatMeasurements;a!=null?r=a[n*2]+a[n*2+1]:r=((o=i[n])==null?void 0:o.end)??0}else{let n=Array(this.options.lanes).fill(null),a=i.length-1;for(;a>=0&&n.some(s=>s===null);){let s=i[a];n[s.lane]===null&&(n[s.lane]=s.end),a--}r=Math.max(...n.filter(s=>s!==null))}return Math.max(r-this.options.scrollMargin+this.options.paddingEnd,0)},this.takeSnapshot=()=>{let o=[];if(this.itemSizeCache.size===0)return o;let i=this.getMeasurements();for(let r of i)r&&this.itemSizeCache.has(r.key)&&o.push({index:r.index,key:r.key,start:r.start,size:r.size,end:r.end,lane:r.lane});return o},this._scrollToOffset=(o,{adjustments:i,behavior:r})=>{this._intendedScrollOffset=o+(i??0),this.options.scrollToFn(o,{behavior:r,adjustments:i},this)},this.measure=()=>{this.pendingMin=null,this.itemSizeCache.clear(),this.laneAssignments.clear(),this.itemSizeCacheVersion++,this.notify(!1)},this.setOptions(t)}applyScrollAdjustment(t,o){return t===0?!1:ml()&&(this.isScrolling||this._iosTouching||this._iosJustTouchEnded)?(this._iosDeferredAdjustment+=t,!1):(this._scrollToOffset(this.getScrollOffset(),{adjustments:this.scrollAdjustments+=t,behavior:o}),this.scrollOffset!==null&&(this.scrollOffset+=this.scrollAdjustments,this.scrollOffset<0&&(this.scrollOffset=0),this.scrollAdjustments=0),!0)}scheduleScrollReconcile(){if(!this.targetWindow){this.scrollState=null;return}this.rafId==null&&(this.rafId=this.targetWindow.requestAnimationFrame(()=>{this.rafId=null,this.reconcileScroll()}))}reconcileScroll(){if(!this.scrollState||!this.scrollElement)return;if(this.now()-this.scrollState.startedAt>5e3){this.scrollState=null;return}let i=this.scrollState.index!=null?this.getOffsetForIndex(this.scrollState.index,this.scrollState.align):void 0,r=i?i[0]:this.scrollState.lastTargetOffset,n=1,a=r!==this.scrollState.lastTargetOffset;if(!a&&Em(r,this.getScrollOffset())){if(this.scrollState.stableFrames++,this.scrollState.stableFrames>=n){this.getScrollOffset()!==r&&this._scrollToOffset(r,{adjustments:void 0,behavior:"auto"}),this.scrollState=null;return}}else if(this.scrollState.stableFrames=0,a){let s=this.getSize()||600,c=Math.abs(r-this.getScrollOffset()),d=this.scrollState.behavior==="smooth"&&c>s;this.scrollState.lastTargetOffset=r,d||(this.scrollState.behavior="auto"),this._scrollToOffset(r,{adjustments:void 0,behavior:d?"smooth":"auto"})}this.scheduleScrollReconcile()}},Im=(e,t,o,i)=>{for(;e<=t;){let r=(e+t)/2|0,n=o(r);if(n<i)e=r+1;else if(n>i)t=r-1;else return r}return e>0?e-1:0};function ow(e,t,o){let i=0;for(;i<=t;){let r=(i+t)/2|0,n=e[r*2];if(n<o)i=r+1;else if(n>o)t=r-1;else return r}return i>0?i-1:0}function iw(e,t,o,i,r){let n=e.length-1;if(e.length<=i)return{startIndex:0,endIndex:n};if(i===1&&r!==null){let d=ow(r,n,o),h=d,m=o+t;for(;h<n&&r[h*2]+r[h*2+1]<m;)h++;return{startIndex:d,endIndex:h}}let s=Im(0,n,d=>e[d].start,o),c=s;if(i===1)for(;c<n&&e[c].end<o+t;)c++;else if(i>1){let d=Array(i).fill(0);for(;c<n&&d.some(m=>m<o+t);){let m=e[c];d[m.lane]=m.end,c++}let h=Array(i).fill(o+t);for(;s>=0&&h.some(m=>m>=o);){let m=e[s];h[m.lane]=m.start,s--}s=Math.max(0,s-s%i),c=Math.min(n,c+(i-1-c%i))}return{startIndex:s,endIndex:c}}var rw=150,$m=class{constructor(e){this.virtualizer=null,this.cleanup=null,this.count=0,this.pinnedIndex=null,this.extractRange=t=>{let o=fl(t),i=this.pinnedIndex;return i!=null&&i>=0&&i<this.count&&!o.includes(i)?[...o,i].sort((r,n)=>r-n):o},this.resizing=!1,this.resizeTimer=null,this.onResizeSettled=null,this.observeRectDebounced=(t,o)=>{let i=null,r=null,n=!1,a=zm(t,s=>{if(i=s,!n){n=!0,r=s,o(s);return}r&&s.width===r.width&&s.height===r.height||(this.resizing=!0,this.resizeTimer!==null&&clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(()=>{this.resizeTimer=null,this.resizing=!1,i&&(r=i,o(i)),this.onResizeSettled?.()},rw))});return()=>{this.resizeTimer!==null&&clearTimeout(this.resizeTimer),this.resizeTimer=null,this.resizing=!1,a?.()}},this.measureElement=t=>{this.virtualizer?.measureElement(t)},(this.host=e).addController(this)}hostConnected(){this.host.requestUpdate()}hostDisconnected(){this.cleanup?.(),this.cleanup=null,this.virtualizer=null,this.resizeTimer!==null&&clearTimeout(this.resizeTimer),this.resizeTimer=null,this.resizing=!1}get isResizing(){return this.resizing}setResizeSettledCallback(e){this.onResizeSettled=e}configure(e,t){if(this.count=e,this.pinnedIndex=t.pinnedIndex??null,this.virtualizer===null){this.virtualizer=new pn({count:e,getScrollElement:t.getScrollElement,estimateSize:t.estimateSize,overscan:t.overscan??8,scrollMargin:t.scrollMargin??0,scrollPaddingStart:t.scrollPaddingStart??0,scrollPaddingEnd:t.scrollPaddingEnd??0,scrollToFn:Dm,observeElementRect:this.observeRectDebounced,observeElementOffset:Fm,rangeExtractor:this.extractRange,onChange:()=>{this.resizing||queueMicrotask(()=>{this.resizing||this.host.requestUpdate()})}}),this.cleanup=this.virtualizer._didMount(),this.virtualizer._willUpdate();return}this.virtualizer.setOptions({...this.virtualizer.options,count:e,getScrollElement:t.getScrollElement,estimateSize:t.estimateSize,overscan:t.overscan??8,scrollMargin:t.scrollMargin??0,scrollPaddingStart:t.scrollPaddingStart??0,scrollPaddingEnd:t.scrollPaddingEnd??0,rangeExtractor:this.extractRange}),this.virtualizer._willUpdate()}get scrollMargin(){return this.virtualizer?.options.scrollMargin??0}getVirtualItems(){return this.virtualizer?.getVirtualItems()??[]}getTotalSize(){return this.virtualizer?.getTotalSize()??0}clearMeasurements(){this.virtualizer?.measure()}scrollToIndex(e,t="auto"){let o=typeof t=="string"?{align:t}:t;this.virtualizer?.scrollToIndex(e,o)}get rowCount(){return this.count}};var Mm=(e,t,o)=>{let i=new Map;for(let r=t;r<=o;r++)i.set(e[r],r);return i},Om=xt(class extends st{constructor(e){if(super(e),e.type!==Ye.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,o){let i;o===void 0?o=t:t!==void 0&&(i=t);let r=[],n=[],a=0;for(let s of e)r[a]=i?i(s,a):a,n[a]=o(s,a),a++;return{values:n,keys:r}}render(e,t,o){return this.dt(e,t,o).values}update(e,[t,o,i]){let r=cc(e),{values:n,keys:a}=this.dt(t,o,i);if(!Array.isArray(r))return this.ut=a,n;let s=this.ut??=[],c=[],d,h,m=0,p=r.length-1,f=0,g=n.length-1;for(;m<=p&&f<=g;)if(r[m]===null)m++;else if(r[p]===null)p--;else if(s[m]===a[f])c[f]=Yt(r[m],n[f]),m++,f++;else if(s[p]===a[g])c[g]=Yt(r[p],n[g]),p--,g--;else if(s[m]===a[g])c[g]=Yt(r[m],n[g]),Ho(e,c[g+1],r[m]),m++,g--;else if(s[p]===a[f])c[f]=Yt(r[p],n[f]),Ho(e,r[m],r[p]),p--,f++;else if(d===void 0&&(d=Mm(a,f,g),h=Mm(s,m,p)),d.has(s[m]))if(d.has(s[p])){let w=h.get(a[f]),x=w!==void 0?r[w]:null;if(x===null){let y=Ho(e,r[m]);Yt(y,n[f]),c[f]=y}else c[f]=Yt(x,n[f]),Ho(e,r[m],x),r[w]=null;f++}else cr(r[p]),p--;else cr(r[m]),m++;for(;f<=g;){let w=Ho(e,c[g+1]);Yt(w,n[f]),c[f++]=w}for(;m<=p;){let w=r[m++];w!==null&&cr(w)}return this.ut=a,lr(e,c),Ae}});var dt="__select__",It="__expand__",nw=[],B=class extends V{constructor(){super(...arguments),this.localize=new N(this),this.tableController=new _m(this),this.virtualizer=new $m(this),this.nav=new iu(this,this.navAdapter()),this.reorder=new eu(this,this.reorderAdapter()),this.measuredRowHeight=0,this.columnDefsCache=null,this.columnDefsKey="",this.renderTable=null,this.suppressNextHeaderClick=!1,this.data=[],this.columns=[],this.rowKey=null,this.selectableRows=null,this.selectable="none",this.paginate=!1,this.pageSize=20,this.pageSizeOptions=[10,20,50,100],this.page=0,this.withoutSortRemoval=!1,this.sortDescFirst=!1,this.maxMultiSort=0,this.withSearch=!1,this.searchTerm="",this.resizable=!1,this.reorderable=!1,this.pinnable=!1,this.withColumnMenu=!1,this.withColumnsMenu=!1,this.striped=!1,this.rowDetail=null,this.rowClass=null,this.childRows=null,this.filterFromLeafRows=!1,this.groupBy=null,this.dataSource=null,this.server=!1,this.filterDebounce=250,this.searchFn=null,this.total=-1,this.loading=!1,this.label=null,this.appearance="outlined",this.size="m",this.selectionState={},this.selectionAnchorIndex=null,this.sortingState=[],this.columnFiltersState=[],this.openFilterColumn=null,this.filterOptionQuery="",this.columnVisibilityState={},this.columnSizingState={},this.headerMinWidths={},this.columnPinningState={left:[],right:[]},this.expandedState={},this.columnOrderState=[],this.activeCell=null,this.liveAnnouncement="",this.requestToken=0,this.abortController=null,this.pageResetPending=!1,this.suppressPageReset=!1,this.getRowId=(e,t,o)=>this.rowKey&&e[this.rowKey]!=null?String(e[this.rowKey]):o?`${o.id}.${t}`:String(t),this.groupingCache=null,this.subRowsAccessorCache=null,this.columnMap=new Map,this.functionIds=new WeakMap,this.nextFunctionId=1,this.searchFnCache=null,this.visibilityCache=null,this.paginationSliceCache={pageIndex:0,pageSize:Number.MAX_SAFE_INTEGER},this.pinningSliceCache=null,this.inRenderPass=!1,this.hydrationStash=null,this.headerMinWidthsDirty=!1,this.seededPinIds=new Set,this.measuredHeaderHeight=0,this.detailHeights=new Map,this.detailResizeObserver=null,this.rangeBaseSelection=null,this.fetchDebounceTimer=null,this.fetchQueued=!1,this.fetchForce=!1,this.lastRequestKey=null,this.cancelResizeDrag=null,this.handleCellPointerOver=e=>{let t=e.target.closest?.(".cell-content-text");if(t)if(t.scrollWidth>t.clientWidth+1){let o=t.textContent?.trim()??"";o&&t.title!==o&&(t.title=o)}else t.title&&t.removeAttribute("title")},this.announceTick=!1,this.previousRows=null,this.handleTableFocusIn=e=>{let t=e.target?.closest?.("[data-row-index][data-col-id]");if(!t)return;let o=Number(t.dataset.rowIndex),i=t.dataset.colId;!Number.isNaN(o)&&!this.isActive(o,i)&&(this.activeCell={row:o,col:i})}}connectedCallback(){super.connectedCallback(),this.isSelectable&&!this.rowKey&&console.warn("<wa-data-grid> with `selectable` should set `row-key` for stable selection across sort and pages.")}get isSelectable(){return this.selectable===""||this.selectable==="single"||this.selectable==="multiple"}get selectionMode(){return this.selectable==="single"?"single":this.selectable===""||this.selectable==="multiple"?"multiple":"none"}get controlSize(){return bc(this.size)}get hasTreeRows(){return this.childRows!==null}get grouping(){if(this.groupBy==null||this.hasTreeRows||this.isManual)return nw;let e=Array.isArray(this.groupBy)?this.groupBy:this.groupBy.split(/[\s,]+/).filter(Boolean),t=e.join(" ");return this.groupingCache?.key!==t&&(this.groupingCache={key:t,value:e}),this.groupingCache.value}get isGrouped(){return this.grouping.length>0}get hasHierarchy(){return this.hasTreeRows||this.isGrouped}get hasExpandColumn(){return this.rowDetail!==null||this.hasHierarchy}subRowsAccessor(){let e=this.childRows;if(e==null)return;if(this.subRowsAccessorCache?.key===e)return this.subRowsAccessorCache.fn;let t=typeof e=="function"?e:i=>Lm(i,e),o=i=>{let r=t(i);return Array.isArray(r)?r:void 0};return this.subRowsAccessorCache={key:e,fn:o},o}columnId(e,t){return e.id??e.field??`col-${t}`}rebuildColumnMap(){this.columnMap.clear(),this.columns.forEach((e,t)=>this.columnMap.set(this.columnId(e,t),e))}columnById(e){let t=this.columnMap.get(e);return t||this.columns.find((o,i)=>this.columnId(o,i)===e)}columnResizable(e){return e.resizable??this.resizable}columnMovableFor(e){return e.movable??this.reorderable}columnPinnableFor(e){return e.pinnable??this.pinnable}pinColumn(e,t){if(t!==!1&&this.columnSizingState[e]==null&&this.columnById(e)?.width==null){let r=this.headerCellEl(e)?.getBoundingClientRect().width;r&&r>0&&(this.columnSizingState={...this.columnSizingState,[e]:Math.round(r)})}let o=(this.columnPinningState.left??[]).filter(r=>r!==e),i=(this.columnPinningState.right??[]).filter(r=>r!==e);t==="left"?o.push(e):t==="right"&&i.unshift(e),this.columnPinningState={left:o,right:i}}getColumnPin(e){return(this.columnPinningState.left??[]).includes(e)?"left":(this.columnPinningState.right??[]).includes(e)?"right":!1}buildColumnDefs(){let e=this.columnDefsSignature();if(this.columnDefsCache&&this.columnDefsKey===e)return this.columnDefsCache;let t=this.buildColumnDefsUncached();return this.columnDefsCache=t,this.columnDefsKey=e,t}functionId(e){let t=this.functionIds.get(e);return t==null&&(t=this.nextFunctionId++,this.functionIds.set(e,t)),t}columnDefsSignature(){let e=this.columns.map((t,o)=>{let i=t.comparator?this.functionId(t.comparator):0,r=t.filterFn?this.functionId(t.filterFn):0,n=t.value?this.functionId(t.value):0,a=typeof t.aggregation=="function"?this.functionId(t.aggregation):t.aggregation??"";return[this.columnId(t,o),t.field??"",t.label??"",t.sortable??"",t.sortFn??"",t.sortDescFirst??"",t.sortUndefined??"",t.filterable??"",t.filterType??"",t.hideable??"",t.resizable??"",t.width??"",t.minWidth??"",t.maxWidth??"",i,r,a,n]});return JSON.stringify([this.resizable,e])}buildColumnDefsUncached(){return this.columns.map((e,t)=>{let o=this.columnId(e,t);return{id:o,header:e.label??"",enableSorting:e.sortable??!!(e.field||e.value),...e.sortDescFirst!=null?{sortDescFirst:e.sortDescFirst}:{},...e.sortUndefined!=null?{sortUndefined:e.sortUndefined}:{},enableColumnFilter:!!e.filterable,enableHiding:e.hideable??!0,enableResizing:this.columnResizable(e),...e.value?{accessorFn:r=>e.value(r)}:e.field?{accessorFn:r=>Lm(r,e.field)}:{},...e.width?{size:e.width}:{},...e.minWidth?{minSize:e.minWidth}:{},...e.maxWidth?{maxSize:e.maxWidth}:{},...e.comparator?{sortFn:(r,n)=>e.comparator(r.getValue(o),n.getValue(o),r.original,n.original)}:e.sortFn?{sortFn:e.sortFn}:{},...e.filterable?{filterFn:this.resolveFilterFn(e)}:{},...e.aggregation?{aggregationFn:typeof e.aggregation=="function"?{aggregate:({rows:r,getValue:n})=>e.aggregation(r.map(a=>n(a)),r.map(a=>a.original))}:e.aggregation}:{}}})}resolveSearchFn(){let e=this.searchFn;if(this.searchFnCache?.key===e)return this.searchFnCache.fn;let t=(o,i,r)=>e(o.getValue(i),String(r??""),o.original);return this.searchFnCache={key:e,fn:t},t}resolveFilterFn(e){if(e.filterFn)return(o,i,r)=>e.filterFn(o.getValue(i),r,o.original);switch(e.filterType){case"equals":return"equalsString";case"number-range":return"inNumberRange";case"date-range":return(o,i,r)=>{if(!Array.isArray(r))return!0;let[n,a]=r,s=bl(o.getValue(i));if(s==null)return!1;let c=n?bl(n):null,d=a?bl(a):null;return!(c!=null&&s<c||d!=null&&s>d)};case"includes-any":return"arrIncludesSome";case"includes-all":return"arrIncludesAll";case"set":return(o,i,r)=>Array.isArray(r)&&r.map(String).includes(String(o.getValue(i)));default:return"includesString"}}get effectiveVisibility(){let e=this.columns.map((i,r)=>`${this.columnId(i,r)}:${i.hidden?1:0}`).join("|");if(this.visibilityCache?.key===e&&this.visibilityCache.state===this.columnVisibilityState)return this.visibilityCache.value;let t={};this.columns.forEach((i,r)=>{i.hidden&&(t[this.columnId(i,r)]=!1)});let o={...t,...this.columnVisibilityState};return this.visibilityCache={key:e,state:this.columnVisibilityState,value:o},o}get paginationSlice(){let e=this.paginate?this.page:0,t=this.paginate?this.pageSize:Number.MAX_SAFE_INTEGER;return(this.paginationSliceCache.pageIndex!==e||this.paginationSliceCache.pageSize!==t)&&(this.paginationSliceCache={pageIndex:e,pageSize:t}),this.paginationSliceCache}get pinningSlice(){return this.pinningSliceCache?.key!==this.columnPinningState&&(this.pinningSliceCache={key:this.columnPinningState,value:{start:[...this.columnPinningState.left??[]],end:[...this.columnPinningState.right??[]]}}),this.pinningSliceCache.value}get isManual(){return this.server||this.dataSource!==null}syncTable(){if(this.inRenderPass&&this.renderTable)return this.renderTable;let e=this.isManual,t=this.tableController.getTable({data:this.data??[],columns:this.buildColumnDefs(),getRowId:this.getRowId,enableSorting:!0,enableMultiSort:!0,enableSortingRemoval:!this.withoutSortRemoval,sortDescFirst:this.sortDescFirst,...this.maxMultiSort>0?{maxMultiSortColCount:this.maxMultiSort}:{},enableRowSelection:o=>o.getIsGrouped()?!1:this.isSelectable&&(this.selectableRows?this.selectableRows(o.original):!0),enableMultiRowSelection:this.selectionMode==="multiple",enableColumnResizing:!0,columnResizeMode:"onChange",enableColumnPinning:!0,enablePagination:this.paginate,enableGlobalFilter:!0,getColumnCanGlobalFilter:o=>{let i=this.columnById(o.id);return!!(i?.field||i?.value)&&(i?.searchable??!0)},...this.searchFn?{globalFilterFn:this.resolveSearchFn()}:{},enableExpanding:this.hasHierarchy,...this.hasTreeRows?{getSubRows:this.subRowsAccessor()}:{},enableGrouping:this.isGrouped,groupedColumnMode:!1,paginateExpandedRows:!this.paginate||e,filterFromLeafRows:this.filterFromLeafRows,autoResetExpanded:!1,autoResetPageIndex:!1,manualSorting:e,manualFiltering:e,manualPagination:e,...e&&this.total>=0?{rowCount:this.total}:{},controlledState:{sorting:this.sortingState,rowSelection:this.selectionState,pagination:this.paginationSlice,globalFilter:this.searchTerm,columnFilters:this.columnFiltersState,columnVisibility:this.effectiveVisibility,columnSizing:this.columnSizingState,columnOrder:this.columnOrderState,columnPinning:this.pinningSlice,expanded:this.expandedState,grouping:this.grouping}});return this.inRenderPass&&(this.renderTable=t),t}firstUpdated(){if(!!1){if(!this.activeCell){let e=this.focusableColumnIds();e.length>0&&(this.activeCell={row:-1,col:e[0]})}this.virtualizer.setResizeSettledCallback(()=>{this.measuredRowHeight=0,this.measuredHeaderHeight=0,this.virtualizer.clearMeasurements(),this.requestUpdate()}),this.requestUpdate(),this.freezePinnedColumnWidths(),this.refreshHeaderMinWidths(),this.isManual&&this.requestServerData({force:!0}),this.restoreHydrationStash()}}freezePinnedColumnWidths(){let e=[...this.columnPinningState.left??[],...this.columnPinningState.right??[]],t=null;for(let o of e){if(this.columnSizingState[o]!=null||this.columnById(o)?.width!=null)continue;let i=this.headerCellEl(o)?.getBoundingClientRect().width;i&&i>0&&(t??(t={...this.columnSizingState}),t[o]=Math.round(i))}t&&(this.columnSizingState=t)}refreshHeaderMinWidths(){if(!this.shadowRoot)return;let e={},t=!1;if(this.columns.forEach((o,i)=>{let r=this.columnId(o,i);if(o.flex!=null)return;let n=this.measureHeaderMinWidth(r);n>0&&(e[r]=n,this.headerMinWidths[r]!==n&&(t=!0))}),!t){for(let o of Object.keys(this.headerMinWidths))if(e[o]==null){t=!0;break}}t&&(this.headerMinWidths=e)}focus(e){if(!1)return;if(!this.activeCell){let o=this.focusableColumnIds();o.length>0&&(this.activeCell={row:-1,col:o[0]})}let t=()=>{let o=this.activeCell;if(!o)return super.focus(e),!1;let i=this.shadowRoot?.querySelector(`[data-row-index="${o.row}"][data-col-id="${Gi(o.col)}"]`);return i?(i.focus(e),!0):!1};t()||this.updateComplete.then(()=>t())}willUpdate(e){super.willUpdate(e),!!1&&this.didSSR&&!this.hasUpdated&&this.stashForHydration(),this.hasUpdated||this.seedDeclarativePins()}stashForHydration(){if(this.hydrationStash)return;let e={data:[],columns:[],pageSizeOptions:[10,20,50,100],selectableRows:null,rowDetail:null,rowClass:null,dataSource:null,searchFn:null,searchTerm:"",childRows:this.getAttribute("child-rows"),groupBy:this.getAttribute("group-by"),loading:this.hasAttribute("loading")};this.hydrationStash=new Map;for(let[t,o]of Object.entries(e))this.hydrationStash.set(t,this[t]),this[t]=o}restoreHydrationStash(){if(!this.hydrationStash)return;let e=this.hydrationStash;this.hydrationStash=null;for(let[t,o]of e)this[t]=o;if(!this.activeCell){let t=this.focusableColumnIds();t.length>0&&(this.activeCell={row:-1,col:t[0]})}}update(e){try{super.update(e)}finally{this.inRenderPass=!1,this.renderTable=null}}updated(){this.suppressPageReset=!1,this.reorder.isDragging&&this.reorder.stampTransforms(),this.measureRenderedDetailPanels(),this.headerMinWidthsDirty&&this.hasUpdated&&(this.headerMinWidthsDirty=!1,this.refreshHeaderMinWidths())}disconnectedCallback(){super.disconnectedCallback(),this.abortController?.abort(),this.abortController=null,this.fetchDebounceTimer!==null&&(clearTimeout(this.fetchDebounceTimer),this.fetchDebounceTimer=null),this.detailResizeObserver?.disconnect(),this.detailResizeObserver=null,this.cancelResizeDrag?.()}handleDataSourceChange(){this.isManual?this.requestServerData({force:!0}):(this.abortController?.abort(),this.abortController=null,this.requestToken++,this.lastRequestKey=null,this.loading=!1)}handlePageChange(){if(this.clampPage())return;this.resetSelectionAnchor(),this.nav.clampActiveRow();let e=this.pageResetPending;this.pageResetPending=!1,this.requestServerData({debounce:e})}clampPage(){if(this.paginate&&(!this.isManual||this.total>=0)){let e=Math.max(0,Math.min(this.page,this.pageCount-1));if(e!==this.page)return this.page=e,!0}return!1}handlePageSizeWatch(){this.clampPage()||(this.resetSelectionAnchor(),this.nav.clampActiveRow(),this.requestServerData())}handleGroupByWatch(){this.clampPage(),this.nav.clampActiveRow()}handleTotalChange(){this.isManual&&this.clampPage()}handleSearchTermChange(){this.resetPage(),this.resetSelectionAnchor(),this.nav.clampActiveRow(),this.requestServerData({debounce:!0})}resetPage(){if(this.suppressPageReset){this.suppressPageReset=!1;return}!this.paginate||this.page===0||(this.pageResetPending=!0,this.page=0,this.dispatchEvent(new Jo({page:this.page,pageSize:this.pageSize})))}handleDataChange(){this.paginate&&!this.isManual&&this.page>0&&(this.page=Math.min(this.page,this.pageCount-1)),this.nav.clampActiveRow(),this.warnOnDuplicateRowKeys()}warnOnDuplicateRowKeys(){if(!this.rowKey||!Array.isArray(this.data))return;let e=new Set;for(let t of this.data){let o=t?.[this.rowKey];if(o==null)continue;let i=String(o);if(e.has(i)){console.warn(`<wa-data-grid> duplicate row-key value "${i}" \u2014 row keys must uniquely identify each row.`);return}e.add(i)}}handleSizeChange(){te(this.localName,this.size),this.headerMinWidthsDirty=!0,this.setAttribute("size",this.size),this.measuredRowHeight=0,this.measuredHeaderHeight=0,this.virtualizer.clearMeasurements()}handleColumnsChange(){let e=new Set(this.columns.map((n,a)=>this.columnId(n,a)));if(this.columnOrderState.length>0){let n=this.columnOrderState.filter(s=>e.has(s)),a=[...e].filter(s=>!n.includes(s));this.columnOrderState=[...n,...a]}let t={};for(let n of Object.keys(this.columnSizingState))e.has(n)&&(t[n]=this.columnSizingState[n]);this.columnSizingState=t;let o={};for(let n of Object.keys(this.columnVisibilityState))e.has(n)&&(o[n]=this.columnVisibilityState[n]);this.columnVisibilityState=o;let i=(this.columnPinningState.left??[]).filter(n=>e.has(n)),r=(this.columnPinningState.right??[]).filter(n=>e.has(n));(i.length!==(this.columnPinningState.left??[]).length||r.length!==(this.columnPinningState.right??[]).length)&&(this.columnPinningState={left:i,right:r}),this.sortingState.some(n=>!e.has(n.id))&&(this.sortingState=this.sortingState.filter(n=>e.has(n.id))),this.columnFiltersState.some(n=>!e.has(n.id))&&(this.columnFiltersState=this.columnFiltersState.filter(n=>e.has(n.id)));for(let n of[...this.seededPinIds])e.has(n)||this.seededPinIds.delete(n);this.seedDeclarativePins(),this.reseatActiveColumn(),this.headerMinWidthsDirty=!0}seedDeclarativePins(){this.columns.forEach((e,t)=>{let o=this.columnId(e,t);!e.pinned||this.seededPinIds.has(o)||(this.seededPinIds.add(o),this.getColumnPin(o)||this.pinColumn(o,e.pinned))})}measureHeaderHeight(){if(this.measuredHeaderHeight>0)return this.measuredHeaderHeight;if(!1)return 0;let e=this.shadowRoot?.querySelector('[part~="header"]');return e&&(this.measuredHeaderHeight=e.offsetHeight),this.measuredHeaderHeight}measureRowHeight(){if(this.measuredRowHeight>0)return this.measuredRowHeight;if(!1)return 40;let e=this.shadowRoot?.querySelector('[part~="body"] .row-main'),t=null;if(!e&&this.shadowRoot&&(t=document.createElement("div"),t.style.cssText="position: absolute; visibility: hidden; pointer-events: none; width: 0; height: var(--row-height)",this.shadowRoot.appendChild(t),e=t),e){let o=Math.round(e.getBoundingClientRect().height);o>0&&(this.measuredRowHeight=o)}return t?.remove(),this.measuredRowHeight||40}estimateDetailHeight(e){return this.detailHeights.get(e)??80}measureDetailHeights(){let e=!1;for(let t of this.shadowRoot.querySelectorAll(".detail-content[data-row-id]")){let o=t.dataset.rowId,i=Math.round(t.getBoundingClientRect().height);i>0&&Math.abs((this.detailHeights.get(o)??0)-i)>1&&(this.detailHeights.set(o,i),e=!0)}return e}measureRenderedDetailPanels(){if(!(this.rowDetail===null||!this.shadowRoot||this.virtualizer.isResizing)){this.detailResizeObserver??(this.detailResizeObserver=new ResizeObserver(()=>{this.virtualizer.isResizing||this.measureDetailHeights()&&this.virtualizer.clearMeasurements()})),this.detailResizeObserver.disconnect();for(let e of this.shadowRoot.querySelectorAll(".detail-content[data-row-id]"))this.detailResizeObserver.observe(e);this.measureDetailHeights()&&this.virtualizer.clearMeasurements()}}handleHeaderClick(e,t){if(this.suppressNextHeaderClick){this.suppressNextHeaderClick=!1;return}this.handleSort(e,t)}firstSortDesc(e){return this.columnById(e)?.sortDescFirst??this.sortDescFirst}handleSort(e,t){let o=this.sortingState.find(n=>n.id===e),i=this.firstSortDesc(e),r;if(o)if(o.desc===i){let n={id:e,desc:!i};r=t?this.sortingState.map(a=>a.id===e?n:a):[n]}else if(!this.withoutSortRemoval)r=this.sortingState.filter(n=>n.id!==e);else{let n={id:e,desc:i};r=t?this.sortingState.map(a=>a.id===e?n:a):[n]}else{let n={id:e,desc:i};if(t){let a=this.sortingState;this.maxMultiSort>0&&a.length>=this.maxMultiSort&&(a=a.slice(a.length-(this.maxMultiSort-1))),r=[...a,n]}else r=[n]}this.commitSort(r)}setColumnSort(e,t){this.commitSort([{id:e,desc:t}])}clearColumnSort(e){this.commitSort(this.sortingState.filter(t=>t.id!==e))}commitSort(e){this.sortingState=e,this.resetSelectionAnchor(),this.dispatchEvent(new Wd({sort:e.map(t=>({id:t.id,desc:t.desc}))})),this.requestServerData()}get sort(){return this.sortingState}set sort(e){this.sortingState=e??[],this.resetSelectionAnchor(),this.requestServerData()}get columnOrder(){return this.columnOrderState}set columnOrder(e){this.columnOrderState=e??[]}orderedColumnIds(){return this.visibleColumnsInRenderOrder().map(e=>e.id)}visibleColumnsInRenderOrder(){let e=this.syncTable();return[...e.getStartVisibleLeafColumns(),...e.getCenterVisibleLeafColumns(),...e.getEndVisibleLeafColumns()]}commitColumnOrder(e,t,o){let i=this.mergeHiddenColumnsIntoOrder(t);o&&(this.columnOrderState=i),this.dispatchEvent(new Qd({column:e,toIndex:i.indexOf(e),columnOrder:i,finished:o}))}mergeHiddenColumnsIntoOrder(e){let t=this.columns.map((c,d)=>this.columnId(c,d)),o=new Set(t),i=this.columnOrderState.length>0?this.columnOrderState.filter(c=>o.has(c)):[...t];for(let c of t)i.includes(c)||i.push(c);let r=new Set(e);if(i.length===r.size)return[...e];let n=new Map,a=null;for(let c of i){if(r.has(c)){a=c;continue}let d=n.get(a)??[];d.push(c),n.set(a,d)}let s=[...n.get(null)??[]];for(let c of e)s.push(c,...n.get(c)??[]);return s}moveColumnByStep(e,t){let o=this.orderedColumnIds(),i=o.indexOf(e);if(i===-1)return;let r=Math.max(0,Math.min(i+t,o.length-1));if(r===i)return;this.commitColumnOrder(e,Ir(o,i,r),!0);let n=this.columnById(e)?.label??e;this.announce(this.localize.term("columnMovedToPosition",n,r+1,o.length)),this.updateComplete.then(()=>{this.headerCellEl(e)?.scrollIntoView({inline:"nearest",block:"nearest"}),this.nav.focusActiveCellEl()})}handleRowToggle(e,t){let o;if(this.selectionMode==="single")o=t?{[e]:!0}:{};else{o={...this.selectionState};let i=r=>{t?o[r]=!0:delete o[r]};if(i(e),this.hasHierarchy)for(let r of this.rowByIdAnyDepth(e)?.getLeafRows()??[])(!t||r.getCanSelect())&&i(r.id)}this.setSelection(o)}rowByIdAnyDepth(e){let t=this.syncTable();return t.getCoreRowModel().rowsById[e]??t.getRowModel().rowsById[e]}handleGroupRowToggle(e,t){let o={...this.selectionState};for(let i of e.getLeafRows())i.getIsGrouped()||(t&&i.getCanSelect()?o[i.id]=!0:t||delete o[i.id]);this.setSelection(o)}handleRowCheckboxClick(e,t,o,i){if(i&&this.selectionMode==="multiple"&&this.selectionAnchorIndex!==null){let r=this.syncTable().getRowModel().rows,n=Math.min(this.selectionAnchorIndex,e),a=Math.max(this.selectionAnchorIndex,e),s={...this.selectionState};for(let c=n;c<=a;c++){let d=r[c];!d||!d.getCanSelect()||(o?s[d.id]=!0:delete s[d.id])}this.setSelection(s);return}this.handleRowToggle(t,o),this.selectionAnchorIndex=e}resetSelectionAnchor(){this.selectionAnchorIndex=null,this.rangeBaseSelection=null,this.nav.resetRangeAnchor()}handleSelectAll(e){let t=this.syncTable(),o={...this.selectionState},i=r=>{e?o[r]=!0:delete o[r]};for(let r of t.getRowModel().rows)if(!r.getIsGrouped()&&(!e||r.getCanSelect())&&i(r.id),this.hasHierarchy)for(let n of r.getLeafRows())!n.getIsGrouped()&&(!e||n.getCanSelect())&&i(n.id);this.setSelection(o)}setSelection(e){this.selectionState=e,this.announce(this.localize.term("numRowsSelected",this.selectedKeys.length)),this.dispatchEvent(new Gd({selectedKeys:this.selectedKeys,selectedRows:this.selectedRows}))}get selectedKeys(){return Object.keys(this.selectionState).filter(e=>this.selectionState[e])}set selectedKeys(e){let t={};(e??[]).forEach(o=>t[String(o)]=!0),this.selectionState=this.dropLockedKeys(t)}dropLockedKeys(e){if(!this.selectableRows)return e;let t=this.syncTable().getCoreRowModel().rowsById,o={};for(let i of Object.keys(e)){if(!e[i])continue;let r=t[i];r&&!this.selectableRows(r.original)||(o[i]=!0)}return o}get selectedRows(){let e=new Set(this.selectedKeys.map(String));return this.syncTable().getCoreRowModel().flatRows.filter(t=>e.has(t.id)).map(t=>t.original)}set selectedRows(e){let t=new Set(e??[]);this.selectedKeys=this.syncTable().getCoreRowModel().flatRows.filter(o=>t.has(o.original)).map(o=>o.id)}isRowExpanded(e){return this.expandedState===!0?!0:!!this.expandedState[e]}expandedRecord(){if(this.expandedState!==!0)return{...this.expandedState};let e=this.syncTable(),t=this.isGrouped?e.getGroupedRowModel():e.getCoreRowModel(),o={};for(let i of t.flatRows)(this.rowDetail!==null||i.getCanExpand())&&(o[i.id]=!0);return o}setRowExpansion(e,t,o){if(this.isRowExpanded(e)===o)return;let i=this.expandedRecord();o?i[e]=!0:delete i[e],this.expandedState=i,this.dispatchEvent(o?new jd({row:t}):new Ud({row:t})),this.rowDetail!==null&&this.virtualizer.clearMeasurements(),this.resetSelectionAnchor(),o||this.nav.clampActiveRow()}toggleRowExpansion(e,t){this.setRowExpansion(e,t,!this.isRowExpanded(e))}get expandedKeys(){return this.expandedState===!0?Object.keys(this.expandedRecord()):Object.keys(this.expandedState).filter(e=>this.expandedState[e])}set expandedKeys(e){let t={};(e??[]).forEach(o=>t[String(o)]=!0),this.expandedState=t,this.rowDetail!==null&&this.virtualizer.clearMeasurements(),this.nav.clampActiveRow()}expandRow(e){let t=this.expandedRecord();t[String(e)]=!0,this.expandedState=t,this.rowDetail!==null&&this.virtualizer.clearMeasurements()}collapseRow(e){let t=this.expandedRecord();delete t[String(e)],this.expandedState=t,this.rowDetail!==null&&this.virtualizer.clearMeasurements()}expandAllRows(){this.expandedState=!0,this.rowDetail!==null&&this.virtualizer.clearMeasurements()}collapseAllRows(){this.expandedState={},this.rowDetail!==null&&this.virtualizer.clearMeasurements(),this.nav.clampActiveRow()}goToPage(e){let t=Math.max(0,Math.min(e,this.pageCount-1));t!==this.page&&(this.page=t,this.resetSelectionAnchor(),this.nav.clampActiveRow(),this.dispatchEvent(new Jo({page:this.page,pageSize:this.pageSize})),this.requestServerData())}handlePageSizeChange(e){!e||e===this.pageSize||(this.pageSize=e,this.page=0,this.resetSelectionAnchor(),this.nav.clampActiveRow(),this.dispatchEvent(new Jo({page:this.page,pageSize:this.pageSize})),this.requestServerData())}get pageCount(){return this.paginate?Math.max(1,Math.ceil(this.filteredRowCount/this.pageSize)):1}get filteredCount(){return this.filteredRowCount}getVisibleRows(){return this.syncTable().getRowModel().rows.filter(e=>!e.getIsGrouped()).map(e=>e.original)}getProcessedRows(){return this.processedDataRows().map(e=>e.original)}processedDataRows(){let e=this.syncTable(),t=[],o=i=>{for(let r of i)r.getIsGrouped()||t.push(r),r.subRows?.length&&o(r.subRows)};return o(this.isManual?e.getRowModel().rows:e.getSortedRowModel().rows),t}get filteredRowCount(){if(this.isManual)return this.total>=0?this.total:this.data?.length??0;let e=this.syncTable();return this.isGrouped?e.getGroupedRowModel().rows.length:e.getFilteredRowModel().rows.length}handleSearchInput(e){e!==this.searchTerm&&(this.searchTerm=e,this.emitFilterChange(),this.isManual||this.updateComplete.then(()=>{this.announce(this.localize.term("showingNofMRows",this.filteredRowCount,this.data?.length??0))}))}handleColumnFilter(e,t){let o=this.columnFiltersState.filter(i=>i.id!==e);gl(t)||o.push({id:e,value:t}),this.columnFiltersState=o,this.resetPage(),this.resetSelectionAnchor(),this.nav.clampActiveRow(),this.emitFilterChange(),this.requestServerData({debounce:!0})}get filters(){return this.columnFiltersState.map(e=>({id:e.id,value:e.value}))}set filters(e){this.columnFiltersState=(e??[]).filter(t=>!gl(t.value)).map(t=>({...t})),this.resetPage(),this.resetSelectionAnchor(),this.nav.clampActiveRow(),this.requestServerData()}getColumnFacets(e){if(this.isManual)return{uniqueValues:new Map,minMax:void 0};let t=this.syncTable().getColumn(e);return t?{uniqueValues:t.getFacetedUniqueValues(),minMax:t.getFacetedMinMaxValues()}:{uniqueValues:new Map,minMax:void 0}}emitFilterChange(){this.dispatchEvent(new Kd({search:this.searchTerm,filters:this.columnFiltersState.map(e=>({id:e.id,value:e.value}))}))}get currentRequest(){return{sort:this.sortingState.map(e=>({id:e.id,desc:e.desc})),filters:this.columnFiltersState.map(e=>({id:e.id,value:e.value})),search:this.searchTerm,page:this.page,pageSize:this.pageSize}}requestServerData(e={}){if(!this.isManual||!1)return;this.fetchForce||(this.fetchForce=e.force??!1),this.fetchDebounceTimer!==null&&(clearTimeout(this.fetchDebounceTimer),this.fetchDebounceTimer=null);let t=e.debounce?Math.max(0,this.filterDebounce):0;if(t>0){this.fetchDebounceTimer=setTimeout(()=>{this.fetchDebounceTimer=null,this.flushServerRequest()},t);return}this.fetchQueued||(this.fetchQueued=!0,queueMicrotask(()=>{this.fetchQueued=!1,this.flushServerRequest()}))}reload(){this.requestServerData({force:!0})}async flushServerRequest(){if(!this.isManual||!1||!this.isConnected)return;let e=this.fetchForce;this.fetchForce=!1;let t=this.currentRequest,o=JSON.stringify(t);if(!e&&o===this.lastRequestKey)return;this.lastRequestKey=o,this.abortController?.abort();let i=new AbortController;this.abortController=i;let r=++this.requestToken,n={...t,signal:i.signal};if(this.dispatchEvent(new Xd(n)),!!this.dataSource){this.loading=!0;try{let a=await this.dataSource(n);if(r!==this.requestToken)return;this.data=a.rows??[],this.total=a.total??-1,this.searchTerm&&this.announce(this.localize.term("showingNofMRows",this.data.length,this.total))}catch(a){r===this.requestToken&&!i.signal.aborted&&(this.dispatchEvent(new Yd({error:a,request:t})),console.error("<wa-data-grid> dataSource request failed:",a))}finally{r===this.requestToken&&(this.loading=!1)}}}toggleColumn(e,t){let o=this.effectiveVisibility[e]!==!1,i=t??!o;this.columnVisibilityState={...this.columnVisibilityState,[e]:i},i||this.reseatActiveColumn()}reseatActiveColumn(){let e=this.activeCell,t=e?this.focusableColumnIds().indexOf(e.col):-1;this.updateComplete.then(()=>{let o=this.activeCell;if(!o)return;let i=this.focusableColumnIds();if(i.length===0||i.includes(o.col))return;let r=t>=0?i[Math.min(t,i.length-1)]:i[0];this.activeCell={...o,col:r}})}resizeColumnTo(e,t,o){let i=this.columnById(e),r=i?.minWidth??40,n=i?.maxWidth??1/0,a=Math.max(r,Math.min(n,t));this.columnSizingState={...this.columnSizingState,[e]:a},this.dispatchEvent(new ca({column:e,width:a,finished:o}))}handleResizeStart(e,t){if(e.button!==0)return;e.preventDefault(),e.stopPropagation(),this.cancelResizeDrag?.();let o=e.clientX,i=e.pointerId,r=this.localize.dir()==="rtl"?-1:1,a=e.target.closest('[part~="header-cell"]')?.getBoundingClientRect().width??this.columnById(t)?.width??150,s=this.columnSizingState,c={...s};this.shadowRoot?.querySelectorAll('[part~="header-cell"][data-col-id]').forEach(w=>{let x=w.dataset.colId;c[x]==null&&(c[x]=w.getBoundingClientRect().width)}),c[t]=a,this.columnSizingState=c;let d=this.shadowRoot?.querySelector('[part~="header"]');d&&this.scroller&&(d.style.minWidth=`${this.scroller.scrollWidth}px`);let h=!1,m=w=>{w.pointerId===i&&(!h&&Math.abs(w.clientX-o)<4||(h=!0,this.resizeColumnTo(t,a+(w.clientX-o)*r,!1)))},p=w=>{w.pointerId===i&&(g(),h&&this.resizeColumnTo(t,a+(w.clientX-o)*r,!0))},f=w=>{w.pointerId===i&&g()},g=()=>{window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",p),window.removeEventListener("pointercancel",f),this.columnSizingState=s,d&&(d.style.minWidth=""),this.cancelResizeDrag=null};this.cancelResizeDrag=g,window.addEventListener("pointermove",m),window.addEventListener("pointerup",p),window.addEventListener("pointercancel",f)}measureHeaderMinWidth(e){if(!1)return 0;let t=this.shadowRoot?.querySelector(`[part~="header-cell"][data-col-id="${Gi(e)}"]`);if(!t)return 0;let o=Pm();if(o){let c=getComputedStyle(t);o.font=`${c.fontStyle} ${c.fontWeight} ${c.fontSize} ${c.fontFamily}`,o.letterSpacing=c.letterSpacing==="normal"?"0px":c.letterSpacing}let i=this.columnById(e)?.label??"",n=(c=>o?o.measureText(c).width:c.length*8)(i);for(let c of Array.from(t.children)){if(c.classList.contains("header-label")||c.classList.contains("resize-handle"))continue;let d=getComputedStyle(c);n+=c.getBoundingClientRect().width+(parseFloat(d.marginInlineStart)||0)+(parseFloat(d.marginInlineEnd)||0)}let a=getComputedStyle(t),s=(parseFloat(a.paddingInlineStart)||0)+(parseFloat(a.paddingInlineEnd)||0);return Math.ceil(n+s)+2}autoSizeColumn(e){if(!1)return;let t=this.shadowRoot;if(!t)return;let o=Array.from(t.querySelectorAll(`[part~="cell"][data-col-id="${Gi(e)}"]`)),i=Pm(),r=s=>i?i.measureText(s).width:s.length*8,n=0;if(i){let s=new Map;for(let c of o){let d=s.get(c.className);if(!d){let h=getComputedStyle(c);d={font:`${h.fontStyle} ${h.fontWeight} ${h.fontSize} ${h.fontFamily}`,letterSpacing:h.letterSpacing==="normal"?"0px":h.letterSpacing},s.set(c.className,d)}i.font=d.font,i.letterSpacing=d.letterSpacing,n=Math.max(n,r(c.textContent?.trim()??""))}}else for(let s of o)n=Math.max(n,r(s.textContent?.trim()??""));if(n>0){let s=getComputedStyle(o[0]);n+=(parseFloat(s.paddingInlineStart)||0)+(parseFloat(s.paddingInlineEnd)||0)+2}let a=Math.max(this.measureHeaderMinWidth(e),Math.ceil(n));a>0&&this.resizeColumnTo(e,a,!0)}autoSizeColumns(){for(let e of this.columns){let t=this.columns.indexOf(e),o=this.columnId(e,t);this.columnResizable(e)&&this.autoSizeColumn(o)}}sizeColumnsToFit(){if(!this.scroller)return;let e=this.syncTable().getVisibleLeafColumns();if(e.length===0)return;let t=0;(this.shadowRoot?.querySelectorAll('[part~="header"] .cell-control')??[]).forEach(s=>t+=s.getBoundingClientRect().width);let i=this.scroller.clientWidth-t;if(i<=0)return;let r=e.map(s=>{let c=this.columnById(s.id);return{id:s.id,flex:c?.flex??1,min:c?.minWidth??40,max:c?.maxWidth??1/0}}),n=r.reduce((s,c)=>s+c.flex,0)||1,a={...this.columnSizingState};for(let s of r){let c=Math.max(s.min,Math.min(s.max,i*s.flex/n));a[s.id]=Math.floor(c)}this.columnSizingState=a;for(let s of r)this.dispatchEvent(new ca({column:s.id,width:a[s.id],finished:!0}))}scrollToIndex(e,t){this.virtualizer.scrollToIndex(e,t??{align:"auto"})}revealColumn(e){if(!this.scroller||e.hasAttribute("data-pinned"))return;let t=this.scroller.getBoundingClientRect(),o=0,i=0;this.shadowRoot?.querySelectorAll('[part~="header"] [data-pinned]').forEach(c=>{c.getAttribute("data-pinned")==="left"?o+=c.offsetWidth:i+=c.offsetWidth});let r=this.localize.dir()==="rtl",n=e.getBoundingClientRect(),a=t.left+(r?i:o),s=t.right-(r?o:i);n.left<a?this.scroller.scrollLeft-=a-n.left:n.right>s&&(this.scroller.scrollLeft+=n.right-s)}getDataAsCsv(e){let t=e?.delimiter??",",o=e?.includeHeaders!==!1,i=this.processedDataRows(),r=this.visibleColumnsInRenderOrder().filter(s=>!e?.columnIds||e.columnIds.includes(s.id)),n=s=>{let c=s;return e?.escapeFormulas&&(c=Tm(c)),c.includes(t)||c.includes('"')||c.includes(`
`)||c.includes("\r")?`"${c.replace(/"/g,'""')}"`:c},a=[];o&&a.push(r.map(s=>n(this.columnById(s.id)?.label??s.id)).join(t));for(let s of i){let c=r.map(d=>n(this.cellText(d.id,s)));a.push(c.join(t))}return a.join(`\r
`)}cellText(e,t){let o=t.getValue(e),i=this.columnById(e);if(i?.formatter){let r=i.formatter(o,t.original);if(typeof r=="string")return r}return o==null?"":String(o)}exportDataAsCsv(e){if(!1)return;let t=this.getDataAsCsv(e),o=new Blob([t],{type:"text/csv;charset=utf-8;"}),i=URL.createObjectURL(o),r=document.createElement("a");r.href=i,r.download=e?.fileName??"data.csv",document.body.append(r),r.click(),r.remove(),URL.revokeObjectURL(i)}async copySelectedRows(e){if(!1)return 0;let t=e?.format==="csv"?",":"	",o=e?.includeHeaders!==!1,i=new Set(this.selectedKeys.map(String)),r=this.processedDataRows().filter(c=>i.size===0||i.has(c.id)),n=this.visibleColumnsInRenderOrder().filter(c=>!e?.columnIds||e.columnIds.includes(c.id)),a=c=>{let d=e?.escapeFormulas?Tm(c):c;return t===","&&/[",\n\r]/.test(d)&&(d=`"${d.replace(/"/g,'""')}"`),t==="	"&&(d=d.replace(/[\t\n\r]+/g," ")),d},s=[];o&&s.push(n.map(c=>a(this.columnById(c.id)?.label??c.id)).join(t));for(let c of r)s.push(n.map(d=>a(this.cellText(d.id,c))).join(t));return await navigator.clipboard.writeText(s.join(`
`)),this.announce(this.localize.term("numRowsCopied",r.length)),r.length}getState(){let e=new Set(this.columns.map((t,o)=>this.columnId(t,o)));return{version:1,columnOrder:this.columnOrderState.filter(t=>e.has(t)),columnWidths:{...this.columnSizingState},columnVisibility:{...this.effectiveVisibility},columnPinning:{left:(this.columnPinningState.left??[]).filter(t=>e.has(t)),right:(this.columnPinningState.right??[]).filter(t=>e.has(t))},sort:this.sortingState.map(t=>({id:t.id,desc:t.desc})),filters:this.columnFiltersState.map(t=>({id:t.id,value:t.value})),search:this.searchTerm,selectedKeys:this.selectedKeys,expandedKeys:this.expandedKeys,page:this.page,pageSize:this.pageSize}}setState(e){if(!e||e.version!==1)return;let t=new Set(this.columns.map((o,i)=>this.columnId(o,i)));e.columnOrder&&(this.columnOrderState=e.columnOrder.filter(o=>t.has(o))),e.columnWidths&&(this.columnSizingState={...e.columnWidths}),e.columnVisibility&&(this.columnVisibilityState={...e.columnVisibility}),e.columnPinning&&(this.columnPinningState={left:(e.columnPinning.left??[]).filter(o=>t.has(o)),right:(e.columnPinning.right??[]).filter(o=>t.has(o))}),e.sort&&(this.sortingState=e.sort.map(o=>({id:o.id,desc:o.desc}))),e.filters&&(this.columnFiltersState=e.filters.map(o=>({id:o.id,value:o.value}))),e.search!=null&&(this.searchTerm=e.search),e.selectedKeys&&(this.selectedKeys=e.selectedKeys),e.expandedKeys&&(this.expandedKeys=e.expandedKeys),e.pageSize!=null&&(this.pageSize=e.pageSize),e.page!=null&&(this.page=e.page),e.page!=null&&e.search!=null&&(this.suppressPageReset=!0),this.requestServerData({force:!0})}resetState(){this.resetColumns(),this.sortingState=[],this.columnFiltersState=[],this.searchTerm="",this.expandedState={},this.requestServerData({force:!0})}resetColumns(){this.columnOrderState=[],this.columnSizingState={},this.columnVisibilityState={},this.columnPinningState={left:[],right:[]},this.seededPinIds.clear(),this.seedDeclarativePins(),this.updateComplete.then(()=>this.freezePinnedColumnWidths())}announce(e){this.announceTick=!this.announceTick,this.liveAnnouncement=e+(this.announceTick?"\u200B":"")}headerRowCount(){return 1}controlColumnCount(){return(this.hasExpandColumn?1:0)+(this.isSelectable?1:0)}colIndexOf(e){return this.focusableColumnIds().indexOf(e)+1}focusableColumnIds(){let e=[];return this.hasExpandColumn&&e.push(It),this.isSelectable&&e.push(dt),[...e,...this.orderedColumnIds()]}headerCellEl(e){return this.shadowRoot?.querySelector(`[part~="header-cell"][data-col-id="${Gi(e)}"]`)??null}bodyCellEls(e){let t=Gi(e);return Array.from(this.shadowRoot?.querySelectorAll(`[part~="cell"][data-col-id="${t}"], [part~="footer-cell"][data-col-id="${t}"], .filter-cell[data-col-id="${t}"]`)??[])}columnMovable(e){if(this.getColumnPin(e))return!1;let t=this.columnById(e);return t?this.columnMovableFor(t):!1}navAdapter(){let e=this;return{get shadowRoot(){return e.shadowRoot},get updateComplete(){return e.updateComplete},focusableColumnIds:()=>e.focusableColumnIds(),rowCount:()=>e.syncTable().getRowModel().rows.length,getActiveCell:()=>e.activeCell,setActiveCell:t=>{e.activeCell=t},scrollerEl:()=>e.scroller??null,rowHeight:()=>e.measureRowHeight(),scrollRowIntoView:t=>e.virtualizer.scrollToIndex(t,{align:"auto"}),isRtl:()=>e.localize.dir()==="rtl",sortColumn:(t,o)=>e.handleSort(t,o),toggleRowSelection:t=>{let o=e.syncTable().getRowModel().rows[t];if(o){if(o.getIsGrouped()){e.handleGroupRowToggle(o,!o.getIsAllSubRowsSelected());return}o.getCanSelect()&&e.handleRowToggle(o.id,!e.selectionState[o.id])}},beginRangeSelection:()=>{e.rangeBaseSelection={...e.selectionState}},extendSelectionTo:(t,o)=>{let i=e.syncTable().getRowModel().rows,r=Math.min(t,o),n=Math.max(t,o),a={...e.rangeBaseSelection??e.selectionState};for(let s=r;s<=n;s++){let c=i[s];c&&c.getCanSelect()&&(a[c.id]=!0)}e.setSelection(a)},selectAllRows:()=>e.handleSelectAll(!0),selectionEnabled:()=>e.isSelectable,multiSelectEnabled:()=>e.selectionMode==="multiple",moveColumnByStep:(t,o)=>e.moveColumnByStep(t,o),resizeColumnByStep:(t,o)=>{let i=e.headerCellEl(t)?.getBoundingClientRect().width??150;e.resizeColumnTo(t,i+o*16,!0)},columnMovable:t=>e.columnMovable(t),columnResizable:t=>{let o=e.columnById(t);return o?e.columnResizable(o):!1},toggleRowExpansion:(t,o)=>{if(o!==It)return!1;let i=e.syncTable().getRowModel().rows[t];return!i||e.rowDetail===null&&!i.getCanExpand()?!1:(e.toggleRowExpansion(i.id,i.original),!0)},activateCell:(t,o)=>{let i=e.syncTable().getRowModel().rows[t];!i||i.getIsGrouped()||o===dt||o===It||e.dispatchEvent(new sa({column:o,value:(()=>{let r=e.columnById(o);return r?.field!=null||r?.value!=null?i.getValue(o):void 0})(),row:i.original,rowIndex:t}))},revealColumn:t=>e.revealColumn(t),copySelection:()=>!e.isSelectable||e.selectedKeys.length===0?!1:(e.copySelectedRows(),!0),openContextMenu:(t,o,i)=>{let r=e.syncTable().getRowModel().rows[t];!r||r.getIsGrouped()||o===dt||o===It||e.dispatchEvent(new la({column:o,value:(()=>{let n=e.columnById(o);return n?.field!=null||n?.value!=null?r.getValue(o):void 0})(),row:r.original,rowIndex:t,originalEvent:i}))},announce:t=>e.announce(t)}}reorderAdapter(){let e=this;return{toggleHostClass:(t,o)=>e.classList.toggle(t,o),orderedColumnIds:()=>e.orderedColumnIds(),headerCellEl:t=>e.headerCellEl(t),bodyCellEls:t=>e.bodyCellEls(t),scrollerEl:()=>e.scroller??null,columnLabel:t=>e.columnById(t)?.label??t,columnMovable:t=>e.columnMovable(t),isRtl:()=>e.localize.dir()==="rtl",commitColumnOrder:(t,o,i)=>e.commitColumnOrder(t,o,i),setSuppressNextHeaderClick:t=>{e.suppressNextHeaderClick=t},attachGhost:t=>e.shadowRoot?.append(t)}}render(){this.inRenderPass=!0,this.renderTable=null,this.rebuildColumnMap();let e=this.syncTable(),t=e.getHeaderGroups(),o=e.getRowModel().rows,i=this.isSelectable,r=this.rowDetail!==null,n=this.hasHierarchy,a=this.isGrouped,s=this.hasExpandColumn,c=this.headerRowCount(),d=this.controlColumnCount(),h=e.getVisibleLeafColumns().length;r&&o!==this.previousRows&&this.virtualizer.clearMeasurements(),this.previousRows=o,this.virtualizer.configure(o.length,{pinnedIndex:this.activeCell&&this.activeCell.row>=0?this.activeCell.row:null,getScrollElement:()=>this.scroller,scrollMargin:this.measureHeaderHeight(),scrollPaddingStart:this.measureHeaderHeight(),scrollPaddingEnd:this.hasFooterRow&&o.length>0?this.measureRowHeight():0,estimateSize:A=>{let v=this.measureRowHeight(),O=o[A];return r&&O&&!O.getIsGrouped()&&this.isRowExpanded(O.id)?v+this.estimateDetailHeight(O.id):v}});let m=this.virtualizer.getVirtualItems(),p=this.virtualizer.getTotalSize(),f=i?o.flatMap(A=>A.getIsGrouped()?A.getLeafRows().filter(v=>!v.getIsGrouped()):[A]).filter(A=>A.getCanSelect()):[],g=f.length>0&&f.every(A=>this.selectionState[A.id]),w=i&&f.some(A=>this.selectionState[A.id])&&!g,x=this.withSearch||this.withColumnsMenu,y=this.sortingState.length>1,C=!n&&this.paginate?this.page*this.pageSize:0,L=this.hasFooterRow,M=L&&o.length>0,$=(n?c+o.length:c+this.filteredRowCount)+(M?1:0);return b`
      <div part="data-grid">
        ${x?this.renderToolbar():k}
        <div
          part="table"
          role=${n?"treegrid":"grid"}
          aria-label=${this.label??k}
          aria-rowcount=${$}
          aria-colcount=${d+h}
          aria-multiselectable=${this.selectionMode==="multiple"?"true":k}
          @keydown=${this.nav.handleKeyDown}
          @focusin=${this.handleTableFocusIn}
          @pointerover=${this.handleCellPointerOver}
        >
          <div part="header" role="rowgroup">
            ${t.map(A=>b`
                <div class="row" role="row" aria-rowindex="1">
                  ${s?this.renderHeaderControlCell(It):k}
                  ${i?b`
                        <div
                          class="cell cell-control"
                          role="columnheader"
                          data-row-index="-1"
                          data-col-id=${dt}
                          aria-colindex=${this.colIndexOf(dt)}
                          tabindex=${this.isActive(-1,dt)?"0":"-1"}
                        >
                          ${this.selectionMode==="multiple"?b`<wa-checkbox
                                exportparts="base:select-all-checkbox"
                                size=${this.controlSize}
                                tabindex=${this.isActive(-1,dt)?"0":"-1"}
                                .checked=${g}
                                .indeterminate=${w}
                                @input=${v=>this.handleSelectAll(v.target.checked)}
                              >
                                <span class="wa-visually-hidden"
                                  >${g?this.localize.term("deselectAllRows"):this.localize.term("selectAllRows")}</span
                                >
                              </wa-checkbox>`:b`<span class="wa-visually-hidden">${this.localize.term("selectRow")}</span>`}
                        </div>
                      `:k}
                  ${A.headers.map(v=>{let O=this.columnById(v.column.id),Y=v.column.getCanSort(),U=this.sortingState.find(Q=>Q.id===v.column.id),he=this.sortingState.findIndex(Q=>Q.id===v.column.id);return b`
                      <div
                        part="header-cell"
                        class="cell"
                        role="columnheader"
                        data-row-index="-1"
                        data-col-id=${v.column.id}
                        data-align=${O?.headerAlign??O?.align??k}
                        data-pinned=${this.getColumnPin(v.column.id)||k}
                        ?data-sortable=${Y}
                        ?data-sorted=${!!U}
                        aria-colindex=${this.colIndexOf(v.column.id)}
                        aria-sort=${U?U.desc?"descending":"ascending":Y?"none":k}
                        style=${Ke(this.columnStyle(v.column.id,v.getSize()))}
                        tabindex=${this.isActive(-1,v.column.id)?"0":"-1"}
                        @click=${Y?Q=>this.handleHeaderClick(v.column.id,Q.shiftKey):k}
                        @pointerdown=${this.columnMovable(v.column.id)?Q=>this.reorder.onHeaderPointerDown(Q,v.column.id):k}
                      >
                        <span class="header-label">${O?.label??""}</span>
                        ${Y?b`<wa-icon
                              part="sort-indicator"
                              class="sort-indicator ${U?"is-sorted":""}"
                              name=${U?U.desc?"arrow-down":"arrow-up":"up-down"}
                            ></wa-icon>`:k}
                        ${U&&y?b`<span part="sort-number" class="sort-number" aria-hidden="true"
                              >${he+1}</span
                            >`:k}
                        ${this.getColumnPin(v.column.id)||this.withColumnMenu||O?.filterable?b`<span class="header-actions">
                              ${O?.filterable?this.renderFilterButton(v.column.id,O):k}
                              ${this.getColumnPin(v.column.id)?b`<button
                                    part="pin-indicator"
                                    class="pin-indicator"
                                    type="button"
                                    tabindex=${this.isActive(-1,v.column.id)?"0":"-1"}
                                    aria-label=${this.localize.term("unpinColumn")}
                                    @click=${Q=>{Q.stopPropagation(),this.pinColumn(v.column.id,!1),this.dispatchEvent(new Di({column:v.column.id,side:!1}))}}
                                  >
                                    <wa-icon name="thumbtack"></wa-icon>
                                  </button>`:k}
                              ${this.withColumnMenu?this.renderColumnMenu(v.column.id):k}
                            </span>`:k}
                        ${O&&this.columnResizable(O)?b`<span
                              part="resize-handle"
                              class="resize-handle"
                              role="separator"
                              aria-orientation="vertical"
                              aria-label=${this.localize.term("resizeColumn")}
                              @click=${Q=>Q.stopPropagation()}
                              @pointerdown=${Q=>this.handleResizeStart(Q,v.column.id)}
                              @dblclick=${()=>this.autoSizeColumn(v.column.id)}
                            ></span>`:k}
                      </div>
                    `})}
                </div>
              `)}
          </div>

          <div
            part="body"
            role="rowgroup"
            class=${o.length===0&&this.loading?"is-empty":""}
            style=${Ke(o.length===0?{}:{height:`${p}px`})}
          >
            ${o.length===0?this.loading?k:this.searchTerm!==""||this.columnFiltersState.length>0?b`<div part="no-results" class="no-results">
                      <slot name="no-results">${this.localize.term("noResults")}</slot>
                    </div>`:b`<div part="empty"><slot name="empty">${this.localize.term("noData")}</slot></div>`:Om(m,A=>o[A.index].id,A=>{let v=o[A.index],O=a&&v.getIsGrouped(),Y=i&&n&&v.subRows.length>0&&v.getLeafRows().some(le=>!le.getIsGrouped()&&le.getCanSelect()),U=O?Y&&v.getIsAllSubRowsSelected():!!this.selectionState[v.id],he=r||n&&v.getCanExpand(),Q=he&&this.isRowExpanded(v.id),pe=r&&!O&&Q,_e=c+C+A.index+1,ke=n&&v.depth>0?`calc(${v.depth} * var(--indent-size))`:null;return b`
                      <div
                        part="row${O?" group-row":""}"
                        class="row ${r?"has-detail":""} ${!O&&this.rowClass?.(v.original)||""}"
                        role="row"
                        aria-rowindex=${_e}
                        aria-level=${n?v.depth+1:k}
                        aria-expanded=${n&&v.getCanExpand()?Q?"true":"false":k}
                        ?data-selected=${U&&!O}
                        ?data-expanded=${Q}
                        ?data-grouped=${O}
                        aria-selected=${i&&!O?U:k}
                        data-index=${A.index}
                        data-depth=${n?v.depth:k}
                        data-stripe=${A.index%2===0?"even":"odd"}
                        style=${Ke({transform:`translateY(${A.start-this.virtualizer.scrollMargin}px)`})}
                      >
                        <div class="row-main">
                          ${s?b`<div
                                class="cell cell-control"
                                role="gridcell"
                                data-row-index=${A.index}
                                data-col-id=${It}
                                aria-colindex=${this.colIndexOf(It)}
                                aria-expanded=${he&&!(n&&v.getCanExpand())?Q?"true":"false":k}
                                tabindex=${this.isActive(A.index,It)?"0":"-1"}
                                style=${ke?Ke({marginInlineStart:ke}):k}
                              >
                                ${he?b`<button
                                      part="expand-button"
                                      class="expand-toggle"
                                      type="button"
                                      tabindex=${this.isActive(A.index,It)?"0":"-1"}
                                      aria-label=${Q?this.localize.term("collapseRow"):this.localize.term("expandRow")}
                                      @click=${()=>this.toggleRowExpansion(v.id,v.original)}
                                    >
                                      <wa-icon
                                        name=${Q?"chevron-down":this.localize.dir()==="rtl"?"chevron-left":"chevron-right"}
                                      ></wa-icon>
                                    </button>`:k}
                              </div>`:k}
                          ${i?b`<div
                                class="cell cell-control"
                                role="gridcell"
                                data-row-index=${A.index}
                                data-col-id=${dt}
                                aria-colindex=${this.colIndexOf(dt)}
                                tabindex=${this.isActive(A.index,dt)?"0":"-1"}
                                style=${ke&&!s?Ke({marginInlineStart:ke}):k}
                              >
                                <wa-checkbox
                                  size=${this.controlSize}
                                  tabindex=${this.isActive(A.index,dt)?"0":"-1"}
                                  .checked=${U}
                                  .indeterminate=${n&&!U&&(v.getIsSomeSelected()||!O&&Y&&v.getIsAllSubRowsSelected())}
                                  ?disabled=${O?!Y:this.selectableRows!=null&&!v.getCanSelect()}
                                  @click=${le=>{let We=le.target.checked;O?this.handleGroupRowToggle(v,We):this.handleRowCheckboxClick(A.index,v.id,We,le.shiftKey)}}
                                >
                                  <span class="wa-visually-hidden"
                                    >${this.localize.term(O?"selectGroup":"selectRow")}</span
                                  >
                                </wa-checkbox>
                              </div>`:k}
                          ${v.getVisibleCells().map((le,We)=>{let ve=this.columnById(le.column.id),Ze=O&&le.getIsGrouped(),Xi=O&&!Ze&&!!ve?.aggregation,ho=!O||Ze||Xi?le.getValue():void 0,Ef=typeof ve?.cellClass=="function"?ve.cellClass(ho,v.original):ve?.cellClass??"",Po;if(O)if(Ze){let Gt=v.getLeafRows().filter(xn=>!xn.getIsGrouped()).length;Po=b`<span part="group-value" class="group-value"
                                    >${this.renderCell(ve,ho,v.original)}</span
                                  >
                                  <span part="group-count" class="group-count">(${Gt})</span>`}else Xi?Po=ve?.aggregatedFormatter?ve.aggregatedFormatter(ho,v.getLeafRows().filter(Gt=>!Gt.getIsGrouped()).map(Gt=>Gt.original)):this.renderCell(ve,ho,v.original):Po="";else Po=this.renderCell(ve,ho,v.original);let Rf=typeof Po=="string",Af=ke&&We===0?s||i?{marginInlineEnd:`calc(-1 * ${ke})`}:{marginInlineStart:ke}:{},zf=ke&&O&&Ze?{marginInlineStart:ke}:{};return b`
                              <div
                                part="cell"
                                class="cell ${Ef}"
                                role="gridcell"
                                data-row-index=${A.index}
                                data-col-id=${le.column.id}
                                data-align=${ve?.align??k}
                                data-pinned=${this.getColumnPin(le.column.id)||k}
                                aria-colindex=${this.colIndexOf(le.column.id)}
                                tabindex=${this.isActive(A.index,le.column.id)?"0":"-1"}
                                style=${Ke({...this.columnStyle(le.column.id,le.column.getSize()),...Af})}
                                @click=${O?k:()=>this.dispatchEvent(new sa({column:le.column.id,value:ho,row:v.original,rowIndex:A.index}))}
                                @contextmenu=${O?k:Gt=>{let xn=new la({column:le.column.id,value:ho,row:v.original,rowIndex:A.index,originalEvent:Gt});this.dispatchEvent(xn)||Gt.preventDefault()}}
                              >
                                <div
                                  class="cell-content ${Rf?"cell-content-text":""} ${Ze?"cell-content-group":""}"
                                  style=${Ke(zf)}
                                >
                                  ${Po}
                                </div>
                              </div>
                            `})}
                        </div>
                        ${pe?b`<div part="row-detail" class="detail-content" data-row-id=${v.id} role="gridcell">
                              ${this.rowDetail(v.original)}
                            </div>`:k}
                      </div>
                    `})}
          </div>
          ${L&&o.length>0?this.renderFooterRow(i,s,$):k}
        </div>

        ${this.loading?b`<div part="loading-overlay">
              <slot name="loading"><wa-spinner></wa-spinner></slot>
            </div>`:k}
        ${this.paginate&&o.length>0?this.renderPager():k}

        <div part="live-region" class="wa-visually-hidden-force" aria-live="polite" aria-atomic="true">
          ${this.liveAnnouncement}
        </div>
      </div>
    `}isActive(e,t){return this.activeCell?.row===e&&this.activeCell?.col===t}renderHeaderControlCell(e){return b`<div
      class="cell cell-control"
      role="columnheader"
      data-row-index="-1"
      data-col-id=${e}
      aria-colindex=${this.colIndexOf(e)}
      tabindex=${this.isActive(-1,e)?"0":"-1"}
    >
      <span class="wa-visually-hidden">${this.localize.term("expandRow")}</span>
    </div>`}columnStyle(e,t){let o=this.columnSizingState[e],i=this.columnById(e),r=o??(t&&t!==150?i?.width??t:i?.width);if(o==null&&r!=null){let a=this.headerMinWidths[e];a!=null&&a>r&&(r=a)}let n;return r!=null?n={flex:`0 0 ${r}px`,width:`${r}px`}:i?.flex!=null?n={flex:`${i.flex} 1 0`,minWidth:`${i.minWidth??0}px`,...i.maxWidth!=null?{maxWidth:`${i.maxWidth}px`}:{}}:n={flex:"1 1 0",minWidth:"0"},{...n,...this.pinnedStyle(e)}}pinnedStyle(e){let t=this.getColumnPin(e);if(t===!1)return{};let o=this.syncTable().getColumn(e);if(!o)return{};let i=t==="left"?o.getStart("start"):o.getAfter("end");return{position:"sticky",[t==="left"?"insetInlineStart":"insetInlineEnd"]:`${i}px`,zIndex:"3"}}renderCell(e,t,o){return e?.formatter?e.formatter(t,o):t==null?"":String(t)}get hasFooterRow(){return this.columns.some((e,t)=>e.footer!=null&&this.effectiveVisibility[this.columnId(e,t)]!==!1)}footerRows(){let e=this.syncTable();return(this.isManual?e.getRowModel().rows:this.isGrouped?e.getFilteredRowModel().rows:e.getSortedRowModel().rows).map(o=>o.original)}renderFooterRow(e,t,o){let i=this.footerRows();return b`
      <div class="table-footer" role="rowgroup">
        <div part="footer-row" class="row" role="row" aria-rowindex=${o}>
          ${t?b`<div class="cell cell-control" role="gridcell" aria-colindex=${this.colIndexOf(It)}></div>`:k}
          ${e?b`<div class="cell cell-control" role="gridcell" aria-colindex=${this.colIndexOf(dt)}></div>`:k}
          ${this.visibleColumnsInRenderOrder().map(r=>{let n=this.columnById(r.id),a=n?.footer,s=typeof a=="function"?a(i):a??"";return b`
              <div
                part="footer-cell"
                class="cell"
                role="gridcell"
                data-col-id=${r.id}
                data-align=${n?.align??k}
                data-pinned=${this.getColumnPin(r.id)||k}
                aria-colindex=${this.colIndexOf(r.id)}
                style=${Ke(this.columnStyle(r.id,r.getSize()))}
              >
                <div class="cell-content ${typeof s=="string"?"cell-content-text":""}">${s}</div>
              </div>
            `})}
        </div>
      </div>
    `}renderToolbar(){return b`
      <div part="toolbar">
        ${this.withSearch?b`<wa-input
              part="search"
              class="toolbar-search wa-visually-hidden-label"
              type="search"
              size=${this.controlSize}
              label=${this.localize.term("search")}
              placeholder=${this.localize.term("search")}
              with-clear
              .value=${this.searchTerm}
              @input=${e=>this.handleSearchInput(e.target.value)}
            >
              <wa-icon slot="start" name="magnifying-glass"></wa-icon>
            </wa-input>`:k}
        ${this.withColumnsMenu?this.renderColumnsMenu():k}
      </div>
    `}renderColumnsMenu(){return b`
      <wa-dropdown
        part="columns-menu"
        class="columns-menu"
        @wa-select=${e=>{e.stopPropagation();let t=e.detail.item;if(t.dataset.action==="reset-columns"){this.resetColumns();return}e.preventDefault();let o=t.dataset.columnId;o&&(this.toggleColumn(o,t.checked),this.dispatchEvent(new da({column:o,visible:t.checked})))}}
      >
        <wa-button slot="trigger" size=${this.controlSize} appearance="plain" with-caret>
          <wa-icon slot="start" name="table-columns"></wa-icon>
          ${this.localize.term("columns")}
        </wa-button>
        ${this.columns.map((e,t)=>{if((e.hideable??!0)===!1)return k;if(!e.label?.trim())return k;let o=this.columnId(e,t),i=this.effectiveVisibility[o]!==!1;return b`<wa-dropdown-item type="checkbox" ?checked=${i} data-column-id=${o}>
            ${e.label??o}
          </wa-dropdown-item>`})}
        <wa-divider></wa-divider>
        <wa-dropdown-item data-action="reset-columns">${this.localize.term("resetColumns")}</wa-dropdown-item>
      </wa-dropdown>
    `}renderColumnMenu(e){let t=this.columnById(e);if(!t)return k;let o=this.syncTable().getColumn(e)?.getCanSort()??!1,i=t.hideable??!0,r=this.columnPinnableFor(t),n=this.columnResizable(t),a=this.getColumnPin(e),s=this.sortingState.find(d=>d.id===e);if(!o&&!i&&!r&&!n)return k;let c=d=>{switch(d){case"pin-left":this.pinColumn(e,"left"),this.dispatchEvent(new Di({column:e,side:"left"}));break;case"pin-right":this.pinColumn(e,"right"),this.dispatchEvent(new Di({column:e,side:"right"}));break;case"unpin":this.pinColumn(e,!1),this.dispatchEvent(new Di({column:e,side:!1}));break;case"sort-asc":this.setColumnSort(e,!1);break;case"sort-desc":this.setColumnSort(e,!0);break;case"clear-sort":this.clearColumnSort(e);break;case"hide":this.toggleColumn(e,!1),this.dispatchEvent(new da({column:e,visible:!1}));break;case"autosize":this.autoSizeColumn(e);break}};return b`
      <wa-dropdown
        part="column-menu"
        class="column-menu"
        @wa-select=${d=>{d.stopPropagation();let m=d.detail.item?.dataset.action;m&&c(m)}}
        @click=${d=>d.stopPropagation()}
        @pointerdown=${d=>d.stopPropagation()}
      >
        <wa-button
          slot="trigger"
          class="column-menu-trigger"
          part="column-menu-button"
          size=${this.controlSize}
          appearance="plain"
          tabindex=${this.isActive(-1,e)?"0":"-1"}
        >
          <wa-icon name="ellipsis-vertical" label=${this.localize.term("columnMenu")}></wa-icon>
        </wa-button>
        ${o?b`
              <wa-dropdown-item data-action="sort-asc" ?checked=${!!s&&!s.desc}>
                ${this.localize.term("sortAscending")}
              </wa-dropdown-item>
              <wa-dropdown-item data-action="sort-desc" ?checked=${!!s&&s.desc}>
                ${this.localize.term("sortDescending")}
              </wa-dropdown-item>
              ${s?b`<wa-dropdown-item data-action="clear-sort">${this.localize.term("clearSort")}</wa-dropdown-item>`:k}
            `:k}
        ${r?b`
              ${o?b`<wa-divider></wa-divider>`:k}
              <wa-dropdown-item data-action="pin-left" ?checked=${a==="left"}>
                ${this.localize.term("pinLeft")}
              </wa-dropdown-item>
              <wa-dropdown-item data-action="pin-right" ?checked=${a==="right"}>
                ${this.localize.term("pinRight")}
              </wa-dropdown-item>
              ${a?b`<wa-dropdown-item data-action="unpin">${this.localize.term("unpin")}</wa-dropdown-item>`:k}
            `:k}
        ${i||n?b`
              ${o||r?b`<wa-divider></wa-divider>`:k}
              ${n?b`<wa-dropdown-item data-action="autosize"
                    >${this.localize.term("autosizeColumn")}</wa-dropdown-item
                  >`:k}
              ${i?b`<wa-dropdown-item data-action="hide">${this.localize.term("hideColumn")}</wa-dropdown-item>`:k}
            `:k}
      </wa-dropdown>
    `}renderFilterButton(e,t){let o=this.columnFiltersState.some(r=>r.id===e),i=this.openFilterColumn===e;return b`
      <button
        id="filter-trigger-${e}"
        part="filter-button"
        class="filter-trigger ${o?"is-filtered":""}"
        type="button"
        tabindex=${this.isActive(-1,e)?"0":"-1"}
        aria-label=${this.localize.term("filterByColumn",t.label??e)}
        aria-haspopup="dialog"
        aria-expanded=${i?"true":"false"}
        @click=${r=>r.stopPropagation()}
        @pointerdown=${r=>r.stopPropagation()}
      >
        <wa-icon name="filter"></wa-icon>
      </button>
      <wa-popover
        for="filter-trigger-${e}"
        exportparts="dialog:filter-panel"
        class="filter-panel"
        placement="bottom-end"
        without-arrow
        distance="4"
        @wa-show=${r=>{r.stopPropagation(),this.filterOptionQuery="",this.openFilterColumn=e}}
        @wa-after-show=${r=>{r.stopPropagation(),this.focusFilterPanel(r.target)}}
        @wa-hide=${r=>{r.stopPropagation(),this.openFilterColumn===e&&(this.openFilterColumn=null)}}
        @wa-after-hide=${r=>r.stopPropagation()}
        @click=${r=>r.stopPropagation()}
        @pointerdown=${r=>r.stopPropagation()}
      >
        ${i?this.renderFilterPanel(e,t):k}
      </wa-popover>
    `}async focusFilterPanel(e){await this.updateComplete,e.querySelector("wa-input, wa-date-input, wa-checkbox, wa-button")?.focus({preventScroll:!0})}renderFilterPanel(e,t){let o=t.filterType??"text";this.isManual&&!t.filterOptions&&(o==="set"||o==="includes-any"||o==="includes-all")&&(o="text");let i=this.columnFiltersState.find(n=>n.id===e)?.value,r;if(o==="set"||o==="includes-any"||o==="includes-all")r=this.renderFilterOptions(e,t,o,i);else if(o==="date-range"){let n=Array.isArray(i)?i:[],a=(s,c)=>{let d=this.columnFiltersState.find(p=>p.id===e)?.value,h=Array.isArray(d)?d:[],m=[h[0],h[1]];m[s]=c===""?void 0:c,this.handleColumnFilter(e,m)};r=b`
        <wa-date-input
          size=${this.controlSize}
          with-clear
          label=${this.localize.term("filterFrom")}
          .value=${n[0]??""}
          @change=${s=>a(0,s.target.value)}
        ></wa-date-input>
        <wa-date-input
          size=${this.controlSize}
          with-clear
          label=${this.localize.term("filterTo")}
          .value=${n[1]??""}
          @change=${s=>a(1,s.target.value)}
        ></wa-date-input>
      `}else if(o==="number-range"){let n=Array.isArray(i)?i:[],a=(s,c)=>{let d=this.columnFiltersState.find(p=>p.id===e)?.value,h=Array.isArray(d)?d:[],m=[h[0],h[1]];m[s]=c===""?void 0:Number(c),this.handleColumnFilter(e,m)};r=b`
        <wa-input
          type="number"
          size=${this.controlSize}
          label=${this.localize.term("filterMin")}
          .value=${n[0]!=null?String(n[0]):""}
          @input=${s=>a(0,s.target.value)}
        ></wa-input>
        <wa-input
          type="number"
          size=${this.controlSize}
          label=${this.localize.term("filterMax")}
          .value=${n[1]!=null?String(n[1]):""}
          @input=${s=>a(1,s.target.value)}
        ></wa-input>
      `}else r=b`
        <wa-input
          class="wa-visually-hidden-label"
          size=${this.controlSize}
          label=${this.localize.term("filterByColumn",t.label??e)}
          placeholder=${this.localize.term("search")}
          with-clear
          .value=${i??""}
          @input=${n=>this.handleColumnFilter(e,n.target.value)}
        ></wa-input>
      `;return b`
      <div class="filter-panel-content">
        ${r}
        <div class="filter-panel-footer">
          <wa-button
            size=${this.controlSize}
            appearance="filled"
            ?disabled=${gl(i)}
            @click=${n=>{this.handleColumnFilter(e,void 0);let a=n.target.closest("wa-popover");a&&this.focusFilterPanel(a)}}
          >
            ${this.localize.term("clearFilter")}
          </wa-button>
        </div>
      </div>
    `}renderFilterOptions(e,t,o,i){let r;if(t.filterOptions)r=t.filterOptions.map(d=>({value:String(d.value),label:d.label??String(d.value),count:d.count}));else{let d=new Map;if(o==="set")for(let[h,m]of this.getColumnFacets(e).uniqueValues){if(h==null||h==="")continue;let p=String(h);d.set(p,(d.get(p)??0)+m)}else for(let h of this.syncTable().getCoreRowModel().flatRows){let m=h.getValue(e);if(Array.isArray(m))for(let p of new Set(m.map(f=>f==null?"":String(f))))p!==""&&d.set(p,(d.get(p)??0)+1)}r=[...d.entries()].sort((h,m)=>h[0].localeCompare(m[0])).map(([h,m])=>({value:h,label:h,count:m}))}let n=Array.isArray(i)?i.map(String):[],a=this.filterOptionQuery.trim().toLowerCase(),s=a?r.filter(d=>d.label.toLowerCase().includes(a)):r,c=(d,h)=>{let m=this.columnFiltersState.find(g=>g.id===e)?.value,p=Array.isArray(m)?m.map(String):[],f=h?[...p.filter(g=>g!==d),d]:p.filter(g=>g!==d);this.handleColumnFilter(e,f)};return b`
      ${r.length>10?b`<wa-input
            class="wa-visually-hidden-label"
            size=${this.controlSize}
            label=${this.localize.term("search")}
            placeholder=${this.localize.term("search")}
            with-clear
            .value=${this.filterOptionQuery}
            @input=${d=>this.filterOptionQuery=d.target.value}
          ></wa-input>`:k}
      <div class="filter-options">
        ${s.map(d=>b`
            <wa-checkbox
              size=${this.controlSize}
              .checked=${n.includes(d.value)}
              @input=${h=>c(d.value,h.target.checked)}
            >
              <span class="filter-option-label">${d.label}</span>
              ${d.count!=null?b`<span class="filter-option-count">${this.localize.number(d.count)}</span>`:k}
            </wa-checkbox>
          `)}
        ${s.length===0?b`<div class="filter-options-empty">${this.localize.term("empty")}</div>`:k}
      </div>
    `}renderPager(){let e=this.filteredRowCount,t=e===0?0:this.page*this.pageSize+1,o=Math.min(e,(this.page+1)*this.pageSize),i=this.pageSizeOptions;return b`
      <div part="footer">
        <span class="pager-info">${this.localize.term("showingXtoYofZ",t,o,e)}</span>
        ${i.length>1?b`<wa-select
              part="page-size"
              class="page-size wa-visually-hidden-label"
              size=${this.controlSize}
              label=${this.localize.term("rowsPerPage")}
              .value=${String(this.pageSize)}
              @change=${r=>this.handlePageSizeChange(Number(r.target.value))}
            >
              ${i.map(r=>b`<wa-option value=${r}>${r}</wa-option>`)}
            </wa-select>`:k}
        <wa-pagination
          part="pager"
          class="pager"
          exportparts="button:pager-button, previous-button, next-button, first-button, last-button, page, page-current, ellipsis"
          appearance="plain"
          with-edges
          sibling-count="1"
          .total=${e}
          .pageSize=${this.pageSize}
          .page=${this.page+1}
          @wa-before-page-change=${r=>r.stopPropagation()}
          @wa-page-change=${r=>{r.stopPropagation(),this.goToPage((r.target.page??1)-1)}}
        ></wa-pagination>
      </div>
    `}};B.css=[oe,Bo,tu];l([_('[part~="table"]')],B.prototype,"scroller",2);l([u({attribute:!1,hasChanged:()=>!0})],B.prototype,"data",2);l([u({attribute:!1,hasChanged:()=>!0})],B.prototype,"columns",2);l([u({attribute:"row-key"})],B.prototype,"rowKey",2);l([u({attribute:!1})],B.prototype,"selectableRows",2);l([u({reflect:!0})],B.prototype,"selectable",2);l([u({type:Boolean,reflect:!0})],B.prototype,"paginate",2);l([u({attribute:"page-size",type:Number})],B.prototype,"pageSize",2);l([u({attribute:!1})],B.prototype,"pageSizeOptions",2);l([u({type:Number,reflect:!0})],B.prototype,"page",2);l([u({attribute:"without-sort-removal",type:Boolean,reflect:!0})],B.prototype,"withoutSortRemoval",2);l([u({attribute:"sort-desc-first",type:Boolean})],B.prototype,"sortDescFirst",2);l([u({attribute:"max-multi-sort",type:Number})],B.prototype,"maxMultiSort",2);l([u({attribute:"with-search",type:Boolean,reflect:!0})],B.prototype,"withSearch",2);l([u({attribute:!1})],B.prototype,"searchTerm",2);l([u({type:Boolean,reflect:!0})],B.prototype,"resizable",2);l([u({type:Boolean,reflect:!0})],B.prototype,"reorderable",2);l([u({type:Boolean,reflect:!0})],B.prototype,"pinnable",2);l([u({attribute:"with-column-menu",type:Boolean,reflect:!0})],B.prototype,"withColumnMenu",2);l([u({attribute:"with-columns-menu",type:Boolean,reflect:!0})],B.prototype,"withColumnsMenu",2);l([u({type:Boolean,reflect:!0})],B.prototype,"striped",2);l([u({attribute:!1})],B.prototype,"rowDetail",2);l([u({attribute:!1})],B.prototype,"rowClass",2);l([u({attribute:"child-rows"})],B.prototype,"childRows",2);l([u({attribute:"filter-from-leaf-rows",type:Boolean})],B.prototype,"filterFromLeafRows",2);l([u({attribute:"group-by"})],B.prototype,"groupBy",2);l([u({attribute:!1})],B.prototype,"dataSource",2);l([u({type:Boolean,reflect:!0})],B.prototype,"server",2);l([u({attribute:"filter-debounce",type:Number})],B.prototype,"filterDebounce",2);l([u({attribute:!1})],B.prototype,"searchFn",2);l([u({type:Number})],B.prototype,"total",2);l([u({type:Boolean,reflect:!0})],B.prototype,"loading",2);l([u()],B.prototype,"label",2);l([u({reflect:!0})],B.prototype,"appearance",2);l([u({reflect:!0})],B.prototype,"size",2);l([I()],B.prototype,"selectionState",2);l([I()],B.prototype,"sortingState",2);l([I()],B.prototype,"columnFiltersState",2);l([I()],B.prototype,"openFilterColumn",2);l([I()],B.prototype,"filterOptionQuery",2);l([I()],B.prototype,"columnVisibilityState",2);l([I()],B.prototype,"columnSizingState",2);l([I()],B.prototype,"headerMinWidths",2);l([I()],B.prototype,"columnPinningState",2);l([I()],B.prototype,"expandedState",2);l([I()],B.prototype,"columnOrderState",2);l([I()],B.prototype,"activeCell",2);l([I()],B.prototype,"liveAnnouncement",2);l([S(["dataSource","server"],{waitUntilFirstUpdate:!0})],B.prototype,"handleDataSourceChange",1);l([S("page",{waitUntilFirstUpdate:!0})],B.prototype,"handlePageChange",1);l([S("pageSize",{waitUntilFirstUpdate:!0})],B.prototype,"handlePageSizeWatch",1);l([S("groupBy",{waitUntilFirstUpdate:!0})],B.prototype,"handleGroupByWatch",1);l([S("total",{waitUntilFirstUpdate:!0})],B.prototype,"handleTotalChange",1);l([S("searchTerm",{waitUntilFirstUpdate:!0})],B.prototype,"handleSearchTermChange",1);l([S("data",{waitUntilFirstUpdate:!0})],B.prototype,"handleDataChange",1);l([S("size",{waitUntilFirstUpdate:!0})],B.prototype,"handleSizeChange",1);l([S("columns",{waitUntilFirstUpdate:!0})],B.prototype,"handleColumnsChange",1);B=l([F("wa-data-grid")],B);B.disableWarning?.("change-in-update");function gl(e){return e==null||e===""?!0:Array.isArray(e)?e.length===0||e.every(t=>t==null||t===""):!1}function Tm(e){return!/^[=+\-@]/.test(e)||/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(e)?e:`'${e}`}function bl(e){if(e==null||e==="")return null;if(typeof e=="string"){let o=/^(\d{4})-(\d{2})-(\d{2})(?:$|[T\s])/.exec(e);if(o)return Number(o[1])*1e4+Number(o[2])*100+Number(o[3])}let t=e instanceof Date?e:new Date(e);return Number.isNaN(t.getTime())?null:t.getFullYear()*1e4+(t.getMonth()+1)*100+t.getDate()}function Lm(e,t){return t in e?e[t]:t.split(".").reduce((o,i)=>{if(o!=null&&typeof o=="object")return o[i]},e)}function Gi(e){return typeof CSS<"u"&&typeof CSS.escape=="function"?CSS.escape(e):e.replace(/["\\]/g,"\\$&")}var wl=null;function Pm(){return typeof document>"u"?null:(wl||(wl=document.createElement("canvas")),wl.getContext("2d"))}var Vm=class extends Event{constructor(e){super("wa-before-page-change",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=e}};var Bm=E`
  @layer wa-component {
    :host {
      display: contents;
    }
  }

  .container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    /* Sizing is relative to the current font size, so we use em rather than spacing tokens */
    gap: 1em;
  }

  .summary {
    font-size: 0.875em;
    color: var(--wa-color-text-quiet);
    white-space: nowrap;
  }

  /* Compact layout */
  .label {
    display: inline-flex;
    align-items: center;
    min-height: max(2.16em, 24px);
    padding-inline: 0.75em;
    color: var(--wa-color-text-normal);
    white-space: nowrap;
  }

  .pagination {
    display: flex;
  }

  .pages {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.25em;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .pages li {
    display: flex;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    /* Guarantee a minimum 24×24px target (WCAG 2.5.8) while still scaling with font-size. */
    min-width: max(2.16em, 24px);
    min-height: max(2.16em, 24px);
    padding-inline: 0.25em;

    font: inherit;
    font-size: inherit;
    line-height: 1;
    color: var(--wa-color-text-normal);
    text-decoration: none;

    background-color: transparent;
    /* Default (outlined) appearance */
    border: solid var(--wa-border-width-s) var(--wa-color-neutral-border-quiet);
    border-radius: var(--wa-border-radius-m);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    transition:
      background-color var(--wa-transition-fast),
      border-color var(--wa-transition-fast),
      color var(--wa-transition-fast);
  }

  /* Ellipsis */
  .button.ellipsis {
    color: var(--wa-color-text-quiet);
    position: relative;
  }

  .button.ellipsis:hover,
  .button.ellipsis:focus-visible {
    color: var(--wa-color-text-normal);
  }

  .button:hover {
    background-color: var(--wa-color-neutral-fill-quiet);
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Current page */
  .button.current {
    font-weight: var(--wa-font-weight-bold);
    color: var(--wa-color-brand-on-loud);
    background-color: var(--wa-form-control-activated-color);
    /* Read as a solid chip: drop the outlined border so it doesn't double up against the fill. */
    border-color: transparent;
  }

  .button.current:hover {
    background-color: var(--wa-form-control-activated-color);
  }

  /* Disabled (pagination buttons use aria-disabled so they stay focusable) */
  .button[aria-disabled='true'] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .button[aria-disabled='true']:hover {
    background-color: transparent;
  }

  wa-icon {
    font-size: 0.875em;
  }

  /* Filled */
  :host([appearance='filled']) .button {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: transparent;
  }

  :host([appearance='filled']) .button:hover {
    background-color: var(--wa-color-neutral-fill-normal);
  }

  :host([appearance='filled']) .button.current,
  :host([appearance='filled']) .button.current:hover {
    background-color: var(--wa-form-control-activated-color);
  }

  /* Plain */
  :host([appearance='plain']) .button {
    background-color: transparent;
    border-color: transparent;
  }

  :host([appearance='plain']) .button:hover {
    background-color: transparent;
  }

  :host([appearance='plain']) .button.current {
    color: var(--wa-color-brand-on-loud);
    background-color: var(--wa-form-control-activated-color);
  }
`;var vl=null,yl=null,aw=7e3;function Hm(e){let t=document.createElement("div");return t.setAttribute("role","log"),t.setAttribute("aria-live",e),t.setAttribute("aria-relevant","additions"),Object.assign(t.style,{position:"absolute",width:"1px",height:"1px",margin:"-1px",padding:"0",border:"0",overflow:"hidden",clip:"rect(0 0 0 0)",clipPath:"inset(50%)",whiteSpace:"nowrap"}),t}function sw(e){return e==="assertive"?(yl??(yl=document.body.appendChild(Hm("assertive"))),yl):(vl??(vl=document.body.appendChild(Hm("polite"))),vl)}function Nm(e,t="polite"){if(!e)return;let o=sw(t),i=document.createElement("div");i.textContent=e,o.appendChild(i),setTimeout(()=>i.remove(),aw)}function mn(e,t){let o=t-e+1;return o>0?Array.from({length:o},(i,r)=>e+r):[]}function lw(e){let t=Math.max(1,Math.trunc(e.totalPages)),o=Math.min(Math.max(1,Math.trunc(e.page)),t),i=Math.max(0,Math.trunc(e.siblingCount)),r=Math.max(0,Math.trunc(e.boundaryCount));if(i*2+r*2+3>=t)return mn(1,t).map(g=>({type:"page",value:g}));let a=r+1,s=t-r,c=o-i,d=o+i;c<a&&(d+=a-c,c=a),d>s&&(c-=d-s,d=s),c=Math.max(c,a),d=Math.min(d,s);let h=(c>a?0:1)+(d<s?0:1);for(;h>0;){if(d<s)d++;else if(c>a)c--;else break;h--}let m=c>a,p=d<s,f=[];return mn(1,r).forEach(g=>f.push({type:"page",value:g})),m&&f.push({type:"ellipsis",position:"start"}),mn(c,d).forEach(g=>f.push({type:"page",value:g})),p&&f.push({type:"ellipsis",position:"end"}),mn(t-r+1,t).forEach(g=>f.push({type:"page",value:g})),f}var Se=class extends V{constructor(){super(...arguments),this.localize=new N(this),this.total=0,this.pageSize=10,this.page=1,this.siblingCount=2,this.boundaryCount=1,this.withoutNav=!1,this.withEdges=!1,this.withSummary=!1,this.format="standard",this.hrefTemplate="",this.hideSinglePage=!1,this.label="",this.appearance="outlined",this.disabled=!1,this.shouldRestoreFocus=!1}get totalPages(){return this.pageSize<=0?1:Math.max(1,Math.ceil(this.total/this.pageSize))}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}handlePageBoundsChange(){let e=Ne(Math.trunc(this.page)||1,1,this.totalPages);e!==this.page&&(this.page=e)}getHref(e){if(this.hrefTemplate)return typeof this.hrefTemplate=="function"?this.hrefTemplate(e):this.hrefTemplate.split("{page}").join(String(e))}async requestPage(e,t){let o=Ne(e,1,this.totalPages);if(this.disabled||o===this.page)return;let i=new Vm({page:o,pageSize:this.pageSize});this.dispatchEvent(i),!i.defaultPrevented&&(this.shouldRestoreFocus=t,this.page=o,await this.updateComplete,this.dispatchEvent(new Jo({page:this.page,pageSize:this.pageSize})),this.announcePage())}restoreFocusToCurrentPage(){let e=this.shadowRoot?.querySelector('[part~="page-current"]'),t=Hc();e&&t&&this.shadowRoot?.contains(t)&&e.focus()}announcePage(){Nm(this.localize.term("pageXOfY",this.page,this.totalPages),"polite")}updated(){this.shouldRestoreFocus&&(this.shouldRestoreFocus=!1,this.restoreFocusToCurrentPage())}renderNavButton(e){let{part:t,targetPage:o,enabled:i,label:r,icon:n,slotName:a}=e,s=this.disabled||!i,c=this.getHref(o);return c!==void 0?b`
        <li role="listitem">
          <a
            part="button ${t}"
            class="button nav-button"
            href=${z(s?void 0:c)}
            aria-label=${r}
            aria-disabled=${s?"true":"false"}
          >
            <slot name=${a}><wa-icon library="system" name=${n}></wa-icon></slot>
          </a>
        </li>
      `:b`
      <li role="listitem">
        <button
          part="button ${t}"
          class="button nav-button"
          type="button"
          aria-label=${r}
          aria-disabled=${s?"true":"false"}
          @click=${s?null:()=>this.requestPage(o,!0)}
        >
          <slot name=${a}><wa-icon library="system" name=${n}></wa-icon></slot>
        </button>
      </li>
    `}renderPage(e){let t=e===this.page,o=this.getHref(e),i=this.localize.number(e),r=`button page${t?" page-current":""}`;return o!==void 0?b`
        <li role="listitem">
          <a
            part=${r}
            class=${T({button:!0,page:!0,current:t})}
            href=${z(t||this.disabled?void 0:o)}
            aria-current=${z(t?"page":void 0)}
            aria-disabled=${z(this.disabled?"true":void 0)}
            >${i}</a
          >
        </li>
      `:b`
      <li role="listitem">
        <button
          part=${r}
          class=${T({button:!0,page:!0,current:t})}
          type="button"
          aria-current=${z(t?"page":void 0)}
          aria-disabled=${z(this.disabled?"true":void 0)}
          @click=${this.disabled||t?null:()=>this.requestPage(e,!0)}
        >
          ${i}
        </button>
      </li>
    `}renderEllipsis(e,t){let o=Se.jumpDistance,i=e==="start",r=Ne(i?this.page-o:this.page+o,1,this.totalPages),n=this.localize.term(i?"jumpBackwardX":"jumpForwardX",o),a=this.getHref(r),s=b`
      <wa-icon class="ellipsis-default" library="system" name="ellipsis" label=${n}></wa-icon>
    `;return a!==void 0?b`
        <li role="listitem">
          <a
            part="ellipsis"
            class="button ellipsis"
            data-ellipsis=${t}
            href=${z(this.disabled?void 0:a)}
            aria-label=${n}
            aria-disabled=${z(this.disabled?"true":void 0)}
          >
            ${s}
          </a>
        </li>
      `:b`
      <li role="listitem">
        <button
          part="ellipsis"
          class="button ellipsis"
          data-ellipsis=${t}
          type="button"
          aria-label=${n}
          aria-disabled=${z(this.disabled?"true":void 0)}
          @click=${this.disabled?null:()=>this.requestPage(r,!0)}
        >
          ${s}
        </button>
      </li>
    `}render(){let e=this.totalPages;if(this.hideSinglePage&&e<=1)return b``;let t=this.localize.dir()==="rtl",o=this.page<=1,i=this.page>=e;if(this.format==="compact")return b`
        <div class="container">
          ${this.renderSummary()}
          <nav part="base pagination" class="pagination" aria-label=${this.label||this.localize.term("pagination")}>
            <ul part="pages" class="pages" role="list">
              ${this.renderNavButton({part:"previous-button",targetPage:this.page-1,enabled:!o,label:this.localize.term("previousPage"),icon:t?"chevron-right":"chevron-left",slotName:"previous-icon"})}
              <li role="listitem">
                <span part="label" class="label" aria-current="page">
                  ${this.localize.term("compactPageXOfY",this.page,e)}
                </span>
              </li>
              ${this.renderNavButton({part:"next-button",targetPage:this.page+1,enabled:!i,label:this.localize.term("nextPage"),icon:t?"chevron-left":"chevron-right",slotName:"next-icon"})}
            </ul>
          </nav>
        </div>
      `;let r=lw({page:this.page,totalPages:e,siblingCount:this.siblingCount,boundaryCount:this.boundaryCount}),n=0;return b`
      <div class="container">
        ${this.renderSummary()}
        <nav part="base pagination" class="pagination" aria-label=${this.label||this.localize.term("pagination")}>
          <ul part="pages" class="pages" role="list">
            ${this.withEdges?this.renderNavButton({part:"first-button",targetPage:1,enabled:!o,label:this.localize.term("firstPage"),icon:t?"angles-right":"angles-left",slotName:"first-icon"}):""}
            ${this.withoutNav?"":this.renderNavButton({part:"previous-button",targetPage:this.page-1,enabled:!o,label:this.localize.term("previousPage"),icon:t?"chevron-right":"chevron-left",slotName:"previous-icon"})}
            ${r.map(a=>a.type==="ellipsis"?(n++,this.renderEllipsis(a.position,n)):this.renderPage(a.value))}
            ${this.withoutNav?"":this.renderNavButton({part:"next-button",targetPage:this.page+1,enabled:!i,label:this.localize.term("nextPage"),icon:t?"chevron-left":"chevron-right",slotName:"next-icon"})}
            ${this.withEdges?this.renderNavButton({part:"last-button",targetPage:e,enabled:!i,label:this.localize.term("lastPage"),icon:t?"angles-left":"angles-right",slotName:"last-icon"}):""}
          </ul>
        </nav>
      </div>
    `}renderSummary(){if(!this.withSummary)return"";let e=this.total===0?0:(this.page-1)*this.pageSize+1,t=Math.min(this.page*this.pageSize,this.total);return b`
      <span part="summary" class="summary"> ${this.localize.term("showingXtoYofZ",e,t,this.total)} </span>
    `}};Se.css=Bm;Se.jumpDistance=5;l([u({type:Number})],Se.prototype,"total",2);l([u({attribute:"page-size",type:Number})],Se.prototype,"pageSize",2);l([u({type:Number,reflect:!0})],Se.prototype,"page",2);l([u({attribute:"sibling-count",type:Number})],Se.prototype,"siblingCount",2);l([u({attribute:"boundary-count",type:Number})],Se.prototype,"boundaryCount",2);l([u({attribute:"without-nav",type:Boolean})],Se.prototype,"withoutNav",2);l([u({attribute:"with-edges",type:Boolean})],Se.prototype,"withEdges",2);l([u({attribute:"with-summary",type:Boolean})],Se.prototype,"withSummary",2);l([u({reflect:!0})],Se.prototype,"format",2);l([u({attribute:"href-template"})],Se.prototype,"hrefTemplate",2);l([u({attribute:"hide-single-page",type:Boolean})],Se.prototype,"hideSinglePage",2);l([u()],Se.prototype,"label",2);l([u({reflect:!0})],Se.prototype,"appearance",2);l([u({type:Boolean,reflect:!0})],Se.prototype,"disabled",2);l([I()],Se.prototype,"shouldRestoreFocus",2);l([S("disabled",{waitUntilFirstUpdate:!0})],Se.prototype,"handleDisabledChange",1);l([S("page"),S("total"),S("pageSize")],Se.prototype,"handlePageBoundsChange",1);Se=l([F("wa-pagination")],Se);var qm=E`
  :host {
    --arrow-size: 0.375rem;
    --max-width: 25rem;
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);

    display: contents;

    /** Defaults for inherited CSS properties */
    font-size: var(--wa-font-size-m);
    line-height: var(--wa-line-height-normal);
    text-align: start;
    white-space: normal;
  }

  /* The native dialog element */
  .dialog {
    display: none;
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    overflow: visible;
    pointer-events: none;

    &:focus {
      outline: none;
    }

    &[open] {
      display: block;
    }
  }

  /* The <wa-popup> element */
  .popover {
    --arrow-size: inherit;
    --popup-border-width: var(--wa-panel-border-width);
    --show-duration: inherit;
    --hide-duration: inherit;

    pointer-events: auto;

    /* Inset box-shadow, not a border: Safari seams a clip-path edge that runs along a border. */
    &::part(arrow) {
      background-color: var(--wa-color-surface-default);
      border: none;
      box-shadow: inset calc(-1 * var(--wa-panel-border-width)) calc(-1 * var(--wa-panel-border-width)) 0 0
        var(--wa-color-surface-border);
    }
  }

  .popover[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .popover[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .popover[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .popover[placement^='right']::part(popup) {
    transform-origin: left;
  }

  /* Body */
  .body {
    display: flex;
    flex-direction: column;
    width: auto;
    max-width: min(var(--max-width), 100vw);
    padding: var(--wa-space-l);
    background-color: var(--wa-color-surface-default);
    border: var(--wa-panel-border-width) solid var(--wa-color-surface-border);
    border-radius: var(--wa-panel-border-radius);
    border-style: var(--wa-panel-border-style);
    box-shadow: var(--wa-shadow-l);
    color: var(--wa-color-text-normal);
    user-select: none;
    -webkit-user-select: none;
  }
`;var xl=new Set,qe=class extends V{constructor(){super(...arguments),this.anchor=null,this.placement="top",this.open=!1,this.distance=8,this.skidding=0,this.for=null,this.withoutArrow=!1,this.eventController=new AbortController,this.handleAnchorClick=()=>{this.open=!this.open},this.handleBodyClick=e=>{e.target.closest('[data-popover="close"]')&&(e.stopPropagation(),this.open=!1)},this.handleDocumentKeyDown=e=>{e.key==="Escape"&&this.open&&Be(this)&&(e.preventDefault(),e.stopPropagation(),this.open=!1,this.anchor&&typeof this.anchor.focus=="function"&&this.anchor.focus({preventScroll:!0}))},this.handleDocumentClick=e=>{this.anchor&&e.composedPath().includes(this.anchor)||e.composedPath().includes(this)||(this.open=!1)}}connectedCallback(){super.connectedCallback(),this.id||(this.id=to("wa-popover-")),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.for&&this.anchor&&(this.anchor=null,this.handleForChange())}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),ze(this),this.eventController.abort()}firstUpdated(e){super.firstUpdated(e),this.open&&(this.dialog.show(),this.popup.active=!0,this.popup.reposition())}updated(e){e.has("open")&&this.customStates.set("open",this.open)}async handleOpenChange(){if(this.open){let e=new Te;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}xl.forEach(t=>t.open=!1),document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),document.addEventListener("click",this.handleDocumentClick,{signal:this.eventController.signal}),this.dialog.setAttribute("open",""),this.popup.active=!0,xl.add(this),Ue(this),requestAnimationFrame(()=>{let t=this.querySelector("[autofocus]");t&&typeof t.focus=="function"?t.focus({preventScroll:!0}):this.dialog.focus({preventScroll:!0})}),await se(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new Ve)}else{let e=new Le;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("click",this.handleDocumentClick),xl.delete(this),ze(this),await se(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.dialog.close(),this.dispatchEvent(new Pe)}}handleForChange(){let e=this.getRootNode();if(!e)return;let t=this.for?e.getElementById(this.for):null,o=this.anchor;if(t===o)return;let{signal:i}=this.eventController;t&&t.addEventListener("click",this.handleAnchorClick,{signal:i}),o&&o.removeEventListener("click",this.handleAnchorClick),this.anchor=t,this.for&&!t&&console.warn(`A popover was assigned to an element with an ID of "${this.for}" but the element could not be found.`,this)}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}async show(){if(!this.open)return this.open=!0,Ee(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,Ee(this,"wa-after-hide")}render(){return b`
      <dialog part="dialog" class="dialog">
        <wa-popup
          part="popup"
          exportparts="
            popup:popup__popup,
            arrow:popup__arrow
          "
          class=${T({popover:!0,"popover-open":this.open})}
          placement=${this.placement}
          distance=${this.distance}
          skidding=${this.skidding}
          flip
          shift
          shift-padding="8"
          ?arrow=${!this.withoutArrow}
          .anchor=${this.anchor}
        >
          <div part="body" class="body" @click=${this.handleBodyClick}>
            <slot></slot>
          </div>
        </wa-popup>
      </dialog>
    `}};qe.css=qm;qe.dependencies={"wa-popup":ne};l([_("dialog")],qe.prototype,"dialog",2);l([_(".body")],qe.prototype,"body",2);l([_("wa-popup")],qe.prototype,"popup",2);l([I()],qe.prototype,"anchor",2);l([u()],qe.prototype,"placement",2);l([u({type:Boolean,reflect:!0})],qe.prototype,"open",2);l([u({type:Number})],qe.prototype,"distance",2);l([u({type:Number})],qe.prototype,"skidding",2);l([u()],qe.prototype,"for",2);l([u({attribute:"without-arrow",type:Boolean,reflect:!0})],qe.prototype,"withoutArrow",2);l([S("open",{waitUntilFirstUpdate:!0})],qe.prototype,"handleOpenChange",1);l([S("for")],qe.prototype,"handleForChange",1);l([S(["distance","placement","skidding"])],qe.prototype,"handleOptionsChange",1);qe=l([F("wa-popover")],qe);var cw=/^\d{4}-\d{2}-\d{2}$/;function Wm(e,t,o){let i=document.createElement("input");return i.type="date",t&&(i.min=t),o&&(i.max=o),i.value=e,i.checkValidity(),i.validationMessage}var Um=()=>({observedAttributes:["min","max"],checkValidity(e){let t={message:"",isValid:!0,invalidKeys:[]},{min:o,max:i}=e,r=e.value;if(!r||!o&&!i)return t;let n=e.mode==="range"?r.split("/"):[r];for(let a of n)if(cw.test(a)){if(o&&a<o)return t.isValid=!1,t.invalidKeys.push("rangeUnderflow"),t.message=Wm(a,o,i),t;if(i&&a>i)return t.isValid=!1,t.invalidKeys.push("rangeOverflow"),t.message=Wm(a,o,i),t}return t}});var dw=/^(\d{4})-(\d{2})-(\d{2})$/;function q(e){if(!e)return null;let t=dw.exec(e.trim());if(!t)return null;let o=Number(t[1]),i=Number(t[2]),r=Number(t[3]);if(i<1||i>12||r<1||r>31)return null;let n=new Date(o,i-1,r);return n.getFullYear()!==o||n.getMonth()!==i-1||n.getDate()!==r?null:n}function we(e){if(!e||isNaN(e.getTime()))return"";let t=String(e.getFullYear()).padStart(4,"0"),o=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${t}-${o}-${i}`}function fn(e){return e==null?null:e instanceof Date?isNaN(e.getTime())?null:new Date(e.getFullYear(),e.getMonth(),e.getDate()):q(e)}function $t(e){if(!e)return{from:null,to:null};let t=e.split("/");if(t.length===1)return{from:q(t[0]),to:null};let o=q(t[0]),i=q(t[1]);return!o||!i?{from:o,to:i}:o.getTime()<=i.getTime()?{from:o,to:i}:{from:i,to:o}}function gn(e){if(!e)return"";let{from:t,to:o}=e;return!t&&!o?"":t&&!o?we(t):!t&&o?we(o):`${we(t)}/${we(o)}`}function Mt(e,t){return!e||!t?!1:e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function jm(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()}function at(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()+t)}function hi(e,t){let o=new Date(e.getFullYear(),e.getMonth()+t,1),i=uo(o.getFullYear(),o.getMonth());return new Date(o.getFullYear(),o.getMonth(),Math.min(e.getDate(),i))}function Ki(e,t){return hi(e,t*12)}function uo(e,t){return new Date(e,t+1,0).getDate()}function Gm(){let e=new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function vt(e,t,o){return t&&e.getTime()<t.getTime()?t:o&&e.getTime()>o.getTime()?o:e}var Ym=/[\s\/\.\-,;:،年月日]+/u,Km=new Map;function Cl(e){return e.normalize("NFD").replace(/\p{M}+/gu,"").toLocaleLowerCase("en")}function uw(e){let t=new Map;try{let o=new Intl.NumberFormat(e,{useGrouping:!1});for(let i=0;i<10;i++){let n=[...o.format(i)][0];n&&n!==String(i)&&t.set(n,String(i))}}catch{}return{digitMap:t}}function hw(e,t){if(t.size===0)return e;let o="";for(let i of e)o+=t.get(i)??i;return o}function pw(e){return e.replace(/[‎‏‪-‮⁦-⁩]/g,"").replace(/[     \t]/g," ").replace(/\s+/g," ").trim()}function mw(e,t){let o=`${e}|${t}`,i=Km.get(o);if(i)return i;let r=new Intl.DateTimeFormat(e||"en",{year:"numeric",month:t,day:"2-digit",calendar:"gregory",numberingSystem:"latn"}),n=[];for(let c of r.formatToParts(new Date(2026,0,23)))(c.type==="year"||c.type==="month"||c.type==="day")&&n.push(c.type);let a=new Map;for(let c of["long","short"]){let d=new Intl.DateTimeFormat(e||"en",{month:c,calendar:"gregory"});for(let h=0;h<12;h++){let m=d.formatToParts(new Date(2023,h,15)).find(f=>f.type==="month");if(!m)continue;let p=Cl(m.value);p&&!a.has(p)&&a.set(p,h+1)}}for(let c of["long","short"]){let d=new Intl.DateTimeFormat("en",{month:c,calendar:"gregory"});for(let h=0;h<12;h++){let m=d.formatToParts(new Date(2023,h,15)).find(f=>f.type==="month");if(!m)continue;let p=Cl(m.value);p&&!a.has(p)&&a.set(p,h+1)}}let s={order:n,monthNames:a,digitMap:uw(e).digitMap};return Km.set(o,s),s}function Xm(e,t,o){if(e<1||e>9999||t<0||t>11||o<1||o>31)return null;let i=new Date(e,t,o);return i.getFullYear()!==e||i.getMonth()!==t||i.getDate()!==o?null:i}function Qm(e,t){let i=Math.floor(t/100)*100+e;return i-t>49?i-=100:i-t<-50&&(i+=100),i}function Yi(e,t){if(!e)return null;let o=e.trim();if(!o)return null;let i=q(o);if(i)return i;let r=/^(\d{4}-\d{2}-\d{2})T/.exec(o);if(r){let h=q(r[1]);if(h)return h}let n=mw(t.locale||"en",t.monthFormat),a=t.referenceYear??new Date().getFullYear(),s=pw(hw(o,n.digitMap)),c=fw(s,n,a);if(c)return c;let d=s.split(Ym).filter(Boolean);return d.length!==3||!d.every(h=>/^\d+$/.test(h))?null:gw(d,n.order,a)}function fw(e,t,o){let i=e.split(Ym).filter(Boolean);if(i.length!==3)return null;let r=null,n=-1;for(let m=0;m<i.length;m++){let p=Cl(i[m]),f=t.monthNames.get(p);if(f!=null){r=f-1,n=m;break}}if(r==null)return null;let a=i.filter((m,p)=>p!==n);if(!a.every(m=>/^\d+$/.test(m)))return null;let s,c,d=Number(a[0]),h=Number(a[1]);if(a[0].length===4||d>31)s=d,c=h;else if(a[1].length===4||h>31)s=h,c=d;else{let m=t.order.filter(g=>g!=="month"),p=i.map((g,w)=>({t:g,i:w})).filter(g=>g.i!==n).map(g=>g.t),f=m[0]==="year";s=Number(f?p[0]:p[1]),c=Number(f?p[1]:p[0])}return s<100&&(s=Qm(s,o)),Xm(s,r,c)}function gw(e,t,o){let i={year:0,month:0,day:0};for(let s=0;s<3;s++)i[t[s]]=Number(e[s]);let{year:r,month:n,day:a}=i;return e[t.indexOf("year")].length<=2&&(r=Qm(r,o)),Xm(r,n-1,a)}function Jm(e,t){if(!e||!e.trim())return{from:null,to:null};let o=e.trim(),i=/^(\d{4}-\d{2}-\d{2})\/(\d{4}-\d{2}-\d{2})$/.exec(o);if(i){let a=q(i[1]),s=q(i[2]);return a&&s&&a.getTime()>s.getTime()?{from:s,to:a}:{from:a,to:s}}let r=[/\s+to\s+/i,/\s*[–—]\s*/,/\s+-\s+/,/\s*\/\s*/,/\s*\.\.\s*/];for(let a of r){let s=o.split(a);if(s.length===2&&s[0]&&s[1]){let c=Yi(s[0],t),d=Yi(s[1],t);if(c||d)return c&&d&&c.getTime()>d.getTime()?{from:d,to:c}:{from:c,to:d}}}return{from:Yi(o,t),to:null}}var Sl=new Map;function Zm(e){let t=e||"en",o=Sl.get(t);if(o)return o;let r=new Intl.DateTimeFormat(t,{year:"numeric",month:"2-digit",day:"2-digit",calendar:"gregory",numberingSystem:"latn"}).formatToParts(new Date(2026,0,23)),n=[],a=[];for(let c of r)c.type==="year"||c.type==="month"||c.type==="day"?(n.push({kind:"segment",field:c.type}),a.push(c.type)):c.type==="literal"&&n.push({kind:"literal",text:c.value});if(a.length!==3){let c={tokens:[{kind:"segment",field:"month"},{kind:"literal",text:"/"},{kind:"segment",field:"day"},{kind:"literal",text:"/"},{kind:"segment",field:"year"}],order:["month","day","year"]};return Sl.set(t,c),c}let s={tokens:n,order:a};return Sl.set(t,s),s}function yt(e){let t=q(e??"");return t?{year:t.getFullYear(),month:t.getMonth()+1,day:t.getDate()}:{year:null,month:null,day:null}}function bw(e){return e.year!=null&&e.month!=null&&e.day!=null}function wn(e){return e.year==null&&e.month==null&&e.day==null}function bn(e){if(!bw(e))return"";let{year:t,month:o,day:i}=e;if(t<1||t>9999||o<1||o>12||i<1||i>31)return"";let r=new Date(2e3,o-1,i);return r.setFullYear(t),r.getFullYear()!==t||r.getMonth()!==o-1||r.getDate()!==i?"":`${String(t).padStart(4,"0")}-${String(o).padStart(2,"0")}-${String(i).padStart(2,"0")}`}var ww=1,vw=9999;function vn(e,t){return e==="year"?{min:ww,max:vw}:e==="month"?{min:1,max:12}:t.month!=null&&t.year!=null?{min:1,max:uo(t.year,t.month-1)}:t.month!=null?{min:1,max:uo(2024,t.month-1)}:{min:1,max:31}}function yn(e){if(e.day==null||e.month==null||e.year==null)return e;let t=uo(e.year,e.month-1);return e.day>t?{...e,day:t}:e}function ef(e,t,o,i){let r=e[t],{min:n,max:a}=vn(t,e),s;if(r==null){let d=t==="year"?i.getFullYear():t==="month"?i.getMonth()+1:i.getDate();s=_l(d,n,a)}else if(t==="year")s=_l(r+o,n,a);else{let d=a-n+1;s=((r-n+o)%d+d)%d+n}let c={...e,[t]:s};return t==="year"||t==="month"?yn(c):c}function _l(e,t,o){return Math.min(o,Math.max(t,e))}function tf(e,t,o){if(!/^[0-9]$/.test(o))return{value:El(t),buffer:t,advance:!1};if(e==="year"){let i=t.length>=4?o:t+o;return{value:i?Number(i):null,buffer:i,advance:i.length>=4}}return e==="month"?kl(t,o,1,12):kl(t,o,1,31)}function kl(e,t,o,i){let r=Number(t);if(e==="")return r===0?{value:null,buffer:"0",advance:!1}:r*10>i?{value:_l(r,o,i),buffer:"",advance:!0}:{value:r,buffer:t,advance:!1};let n=Number(e+t);return n>=o&&n<=i?{value:n,buffer:"",advance:!0}:e==="0"&&r===0?{value:null,buffer:"0",advance:!1}:kl("",t,o,i)}function El(e){if(!e)return null;let t=Number(e);return Number.isFinite(t)&&t>0?t:null}function of(e,t){let o=bn(e),i=bn(t);if(o&&i){let r=q(o),n=q(i);return r.getTime()<=n.getTime()?`${o}/${i}`:`${i}/${o}`}return o||i||""}function rf(e){if(!e)return{from:yt(null),to:yt(null)};let[t,o]=e.split("/");return{from:yt(t),to:yt(o)}}function nf(e,t,o,i){return o?e==="year"?o:o.padStart(2,"0"):t==null?i:e==="year"?String(t).padStart(4,"0"):String(t).padStart(2,"0")}var yw=["/",".","-",":",","," "],af=class{constructor(e,t){this.buffers=new Map,this.active=null,this.handleFocus=o=>{let i=o.currentTarget,r=i.dataset.group,n=i.dataset.segment;this.active={group:r,field:n};for(let a of this.segmentElements())a.tabIndex=a===i?0:-1},this.handleBlur=o=>{let i=o.currentTarget,r=i.dataset.group,n=i.dataset.segment;this.getBuffer(r,n)&&this.flushBuffer(r,n)},this.handleKeyDown=o=>{let i=o.currentTarget??o.composedPath().find(s=>s instanceof HTMLElement&&s.dataset.group&&s.dataset.segment)??null;if(!i)return;let r=i.dataset.group,n=i.dataset.segment;if(!r||!n)return;if(o.key==="ArrowUp"||o.key==="ArrowDown"){if(o.preventDefault(),this.isReadonlyOrDisabled())return;this.getBuffer(r,n)&&this.flushBuffer(r,n);let s=o.key==="ArrowUp"?1:-1,c=this.config.rules.step(r,n,s);c&&this.config.onCommit?.(r,n,c.value);return}if(o.key==="ArrowLeft"||o.key==="ArrowRight"){o.preventDefault(),this.getBuffer(r,n)&&this.flushBuffer(r,n);let s=o.key==="ArrowLeft",c=this.config.isRtl()?!s:s;this.moveFocus(i,c?-1:1);return}if(o.key==="Home"){o.preventDefault(),this.segmentElements()[0]?.focus({preventScroll:!0});return}if(o.key==="End"){o.preventDefault();let s=this.segmentElements();s[s.length-1]?.focus({preventScroll:!0});return}if(o.key==="Tab"){this.getBuffer(r,n)&&this.flushBuffer(r,n);return}if(o.key==="Backspace"||o.key==="Delete"){if(o.preventDefault(),this.isReadonlyOrDisabled())return;this.getBuffer(r,n)?(this.setBuffer(r,n,""),this.config.onCommit?.(r,n,null)):this.config.rules.clear(r,n)?this.config.onCommit?.(r,n,null):o.key==="Backspace"&&this.moveFocus(i,-1);return}if(/^[0-9]$/.test(o.key)){if(o.preventDefault(),this.isReadonlyOrDisabled())return;let s=this.getBuffer(r,n),c=this.config.rules.typeDigit(r,n,s,o.key);this.setBuffer(r,n,c.buffer),this.config.onCommit?.(r,n,c.value),c.advance&&this.moveFocus(i,1);return}if((this.config.separatorKeys??yw).includes(o.key)){o.preventDefault(),this.getBuffer(r,n)&&this.flushBuffer(r,n),this.moveFocus(i,1);return}},this.host=e,this.config=t,e.addController(this)}hostConnected(){}hostDisconnected(){this.buffers.clear(),this.active=null}getBuffer(e,t){return this.buffers.get(this.key(e,t))??""}setBuffer(e,t,o){let i=this.key(e,t);o?this.buffers.set(i,o):this.buffers.delete(i)}clearBuffers(){this.buffers.clear()}getActiveSegment(){return this.active}setActiveSegment(e,t){this.active={group:e,field:t}}segmentElements(){let e=this.host.shadowRoot;return e?Array.from(e.querySelectorAll("[data-segment][data-group]")):[]}segmentElementFor(e,t){let o=this.host.shadowRoot;return o?o.querySelector(`[data-group="${e}"][data-segment="${t}"]`):null}findFocusableSegment(e){let t=this.segmentElements();return t.length===0?null:t.find(i=>{let r=i.dataset.group,n=i.dataset.segment;return e(r,n)&&!this.getBuffer(r,n)})??t[0]}focusActiveSegment(e){if(this.active){let t=this.segmentElementFor(this.active.group,this.active.field);if(t){t.focus({preventScroll:!0,...e});return}}this.segmentElements()[0]?.focus({preventScroll:!0,...e})}moveFocus(e,t,o){let i=this.segmentElements(),r=i.indexOf(e);if(r<0)return;let n=i[r+t];n&&n.focus({preventScroll:!0,...o})}flushBuffer(e,t){let o=this.getBuffer(e,t);if(!o)return!1;let i=this.config.rules.commitBuffer(e,t,o);return this.setBuffer(e,t,""),this.config.onCommit?.(e,t,i),!0}flushAllBuffers(){for(let[e,t]of this.buffers){if(!t)continue;let[o,i]=e.split(":"),r=this.config.rules.commitBuffer(o,i,t);this.config.onCommit?.(o,i,r)}this.buffers.clear()}eventHandlers(){return{keydown:this.handleKeyDown,focus:this.handleFocus,blur:this.handleBlur}}handleKeyDownEvent(e){let t=e.defaultPrevented;return this.handleKeyDown(e),e.defaultPrevented&&!t}key(e,t){return`${e}:${t}`}isReadonlyOrDisabled(){return!!(this.config.isReadonly?.()||this.config.isDisabled?.())}},sf=E`
  /* font: inherit lifts the UA default button font-size so children that size with em
     (e.g. the expand icon) resolve against the host size-driven font-size instead of ~13px. */
  [part~='clear-button'],
  [part~='expand-button'] {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--wa-color-text-quiet);
    font: inherit;
    padding: 0.25em;
    /* Trailing padding overhangs the content edge rather than displacing the glyph. */
    margin-inline-end: -0.25em;
    border-radius: var(--wa-border-radius-s);
    transition: color var(--wa-transition-fast);
  }

  /* Fixed widths (= glyph + 2×0.25em padding) keep each glyph centered on the trailing axis
     regardless of the slotted icon's intrinsic width. */
  [part~='expand-button'] {
    inline-size: 1.75em;
    /* Leading gap that lands the clear button on <wa-select>'s clear axis. Scales with the
       form-control padding token (like select's own spacing) so it holds across themes; the
       0.125em offset accounts for the fixed button widths. */
    margin-inline-start: calc(var(--wa-form-control-padding-inline) - 0.125em);
  }

  [part~='clear-button'] {
    inline-size: 1.5em;
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  [part~='clear-button']:hover,
  [part~='expand-button']:hover {
    color: var(--wa-color-text-loud);
  }

  [part~='expand-button']:focus-visible {
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) var(--wa-color-focus);
    outline-offset: 2px;
  }

  /* font-size scales the glyph with the host size attribute; the button width handles centering. */
  [part~='expand-icon'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--wa-color-text-quiet);
    font-size: 1.25em;
  }

  /* Start / end decoration slots. Spaced with the same --wa-form-control-padding-inline gap as
     <wa-input>/<wa-select> so slotted icons line up with the rest of the form controls, rather
     than the tighter 0.25em the pickers used before. */
  [part~='start'],
  [part~='end'] {
    display: inline-flex;
    align-items: center;
    color: var(--wa-color-text-quiet);
  }

  [part~='start']::slotted(*) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  [part~='end']::slotted(*) {
    margin-inline-start: var(--wa-form-control-padding-inline);
  }
`;var lf=E`
  :host {
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);
  }

  :host(:state(disabled)) {
    cursor: not-allowed;
  }

  /* Popup */
  .date-input-popup {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
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

  /* Popup body — transparent positioning wrapper. The date picker handles its own border,
     background, and padding. We give the date picker a sensible default width per mode;
     multi-month layouts widen proportionally because the date picker's internal grids each take
     a fraction of the host width. Authors can override via the date-picker part.

     Inherit font-size from the host so the content scales with the picker's size attribute via em. */
  .popup-body {
    display: inline-block;
    font-size: inherit;
  }

  /* Cap at the requested em width but never exceed the viewport — the popup is positioned in the
     viewport, so on narrow screens we let the date picker shrink and its own container query collapse
     the multi-month layout to a single column. */
  .popup-body wa-date-picker {
    width: min(20em, 100vw - 2 * var(--wa-space-s));
    font-size: inherit;
  }

  /* Shadow is applied only when the date picker is within the popup —  standalone date pickers don't
     assume elevation. */
  .popup-body wa-date-picker::part(base) {
    box-shadow: var(--wa-shadow-m);
  }

  /* Multi-month layouts (range mode or months=2) need extra space for side-by-side grids. */
  :host([mode='range']) .popup-body wa-date-picker,
  :host([months='2']) .popup-body wa-date-picker {
    width: min(40em, 100vw - 2 * var(--wa-space-s));
  }

  /* Input wrapper */
  .input-wrapper {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    align-items: center;
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
    padding: 0 var(--wa-form-control-padding-inline);
    transition:
      background-color var(--wa-transition-normal),
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);
  }

  :host([pill]) .input-wrapper {
    border-radius: var(--wa-border-radius-pill);
  }

  :host(:focus-within) .input-wrapper {
    outline-color: var(--wa-color-focus);
  }

  :host(:state(disabled)) .input-wrapper {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Appearance variants */
  :host([appearance='filled']) .input-wrapper,
  :host([appearance='filled-outlined']) .input-wrapper {
    background-color: var(--wa-color-surface-lowered);
  }

  :host([appearance='filled']) .input-wrapper {
    border-color: transparent;
  }

  /* Segmented input — the role=group container holding all segments + literals. */
  .segments {
    flex: 1;
    min-width: 0;
    display: inline-flex;
    align-items: center;
    flex-wrap: nowrap;
    color: inherit;
    font: inherit;
    font-variant-numeric: tabular-nums;
    /* Caret should look like a text field even though we don't render one. */
    caret-color: transparent;
  }

  /* Each editable segment is a focusable spinbutton rendered as inline text. tabular-nums on the segments container
     keeps all digits the same width; the segment itself uses no width-locking tricks. The placeholder text (mm, dd,
     yyyy) and committed digits are visually close enough that the natural width is stable.
  */
  .segment {
    display: inline-block;
    padding: 0 0.15em;
    margin: 0;
    background: transparent;
    border: none;
    outline: none;
    color: inherit;
    font: inherit;
    text-align: center;
    cursor: text;
    user-select: none;
    white-space: nowrap;
    border-radius: var(--wa-border-radius-s);
    transition:
      background-color var(--wa-transition-fast),
      color var(--wa-transition-fast);
  }

  .segment.empty {
    color: var(--wa-form-control-placeholder-color);
  }

  /* Focus style — applies to keyboard and pointer focus so a click always shows the selection. Soft brand fill reads
     as "selected" without competing with the popup's loud selected items. */
  .segment:focus {
    background-color: var(--wa-color-brand-fill-quiet);
    color: var(--wa-color-brand-on-quiet);
    outline: none;
  }

  .segment.empty:focus {
    color: var(--wa-color-brand-on-quiet);
  }

  /* Inert literal text between segments — separators like / or . or CJK suffixes. */
  .segment-literal {
    display: inline-block;
    color: var(--wa-color-text-quiet);
    white-space: pre;
    user-select: none;
  }

  /* Disabled / readonly styling for segments. */
  :host([disabled]) .segment,
  :host([readonly]) .segment {
    cursor: inherit;
  }

  /* Hidden form value input (for native form validity anchoring) */
  .value-input {
    position: absolute;
    inset-inline-start: var(--wa-form-control-padding-inline);
    inset-block-start: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
    border: none;
    padding: 0;
    margin: 0;
  }

  /* Trailing buttons (.clear-button, .expand-button), the .expand-icon box, and the start/end
     decoration slots are shared with <wa-time-input> via segmentedFieldStyles so both pickers
     stay on <wa-select>'s trailing optical axis. See segmented-field.styles.ts. */

  /* Animations */
  .date-input-popup::part(popup).show {
    animation: wa-date-input-show var(--show-duration) var(--wa-transition-easing);
  }

  .date-input-popup::part(popup).hide {
    animation: wa-date-input-hide var(--hide-duration) var(--wa-transition-easing);
  }

  @keyframes wa-date-input-show {
    from {
      opacity: 0;
      transform: scale(0.97);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes wa-date-input-hide {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.97);
    }
  }

  /* Visually hidden helper for sr-only content */
  .visually-hidden {
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

  /* Hidden children — used only to receive light-DOM slot changes (per-day named slots). */
  .hidden-children {
    display: none;
  }
`;var xw=0,Cw=()=>`wa-date-input-${++xw}`,H=class extends G{constructor(){super(),this.assumeInteractionOn=["input"],this.hasSlotController=new ce(this,"hint","label"),this.localize=new N(this),this.pendingValue=null,this.moveFocusToCalendarOnShow=!1,this.lastEmittedValue="",this.segmentsController=new af(this,{getLayout:()=>this.getLayout(),isRtl:()=>this.isRtl,isReadonly:()=>this.readonly,isDisabled:()=>this.disabled,rules:{typeDigit:(t,o,i,r)=>{let n=tf(o,i,r),s={...this.getGroupSegments(t),[o]:n.value};return(o==="year"||o==="month")&&(s=yn(s)),this.setGroupSegments(t,s),n},step:(t,o,i)=>{let r=this.today?q(this.today)??new Date:new Date,n=ef(this.getGroupSegments(t),o,i,r);return this.setGroupSegments(t,n),{value:n[o]}},bounds:(t,o)=>vn(o,this.getGroupSegments(t)),commitBuffer:(t,o,i)=>{let r=El(i),a={...this.getGroupSegments(t),[o]:r};return(o==="year"||o==="month")&&(a=yn(a)),this.setGroupSegments(t,a),r},clear:(t,o)=>{let i=this.getGroupSegments(t);return i[o]==null?!1:(this.setGroupSegments(t,{...i,[o]:null}),!0)}},onCommit:()=>{this.recomputeValue(),this.requestUpdate()}}),this.forwardedDaySlots=[],this.segments={year:null,month:null,day:null},this.fromSegments={year:null,month:null,day:null},this.toSegments={year:null,month:null,day:null},this.name="",this._value="",this.defaultValue=this.getAttribute("value")??"",this.disabled=!1,this.required=!1,this.readonly=!1,this.size="m",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.autocomplete="",this.withClear=!1,this.withLabel=!1,this.withHint=!1,this.mode="single",this.min="",this.max="",this.today="",this.firstDayOfWeek="auto",this.disabledDates="",this.disabledDaysOfWeek="",this.disablePast=!1,this.disableFuture=!1,this.minRange=0,this.maxRange=0,this.months=1,this.pageBy="months",this.withOutsideDays=!1,this.withWeekNumbers=!1,this.weekdayFormat="short",this.open=!1,this.placement="bottom-start",this.distance=0,this.handleDocumentFocusIn=t=>{t.composedPath().includes(this)||this.hide()},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&Be(this)&&(t.stopPropagation(),t.preventDefault(),this.hide())},this.handleDocumentMouseDown=t=>{t.composedPath().includes(this)||this.hide()},this.handleSegmentFocus=t=>{this.segmentsController.eventHandlers().focus(t)},this.handleSegmentBlur=t=>{this.segmentsController.eventHandlers().blur(t)},this.handleInputWrapperPointerDown=t=>{if(!(this.disabled||this.readonly||this.open)){for(let o of t.composedPath()){if(o===this)break;if(!(o instanceof Element))continue;let i=o.tagName;if(i==="BUTTON"||i==="A"||o.getAttribute("role")==="button")return}this.show()}},this.handleSegmentKeyDown=t=>{let o=t.currentTarget,i=o.dataset.group,r=o.dataset.segment;if(t.altKey&&t.key==="ArrowDown"){t.preventDefault(),this.moveFocusToCalendarOnShow=!0,this.open?this.calendar?.focus({preventScroll:!0}):this.show();return}if(t.altKey&&t.key==="ArrowUp"){t.preventDefault(),this.hide();return}if(t.key==="Enter"){t.preventDefault(),this.getBuffer(i,r)&&(this.segmentsController.flushBuffer(i,r),this.recomputeValue()),this.open&&this.hide();return}this.segmentsController.eventHandlers().keydown(t)},this.handleSegmentPaste=t=>{let o=t.clipboardData?.getData("text");if(!o||(t.preventDefault(),this.readonly))return;let r=t.currentTarget.dataset.group;if(this.mode==="range"){let n=Jm(o,{locale:this.resolvedLocale,monthFormat:"2-digit"});n.from&&(this.fromSegments=yt(we(n.from))),n.to?this.toSegments=yt(we(n.to)):n.from&&!n.to&&r==="to"&&(this.toSegments=yt(we(n.from)),this.fromSegments=yt(this._value.split("/")[0]??null))}else{let n=Yi(o,{locale:this.resolvedLocale,monthFormat:"2-digit"});n&&(this.segments=yt(we(n)))}this.segmentsController.clearBuffers(),this.recomputeValue(),this.requestUpdate()},this.handleExpandButtonClick=()=>{this.open?this.hide():(this.moveFocusToCalendarOnShow=!0,this.show())},this.handleClearClick=t=>{t.stopPropagation(),this.clearValue()},this.handleClearMouseDown=t=>{t.preventDefault(),t.stopPropagation()},this.handleCalendarChange=t=>{t.stopPropagation();let o=this.calendar.value;this._value=o,this.valueHasChanged=!0,this.segmentsController.clearBuffers(),this.syncSegmentsFromCanonical(),this.requestUpdate(),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),o!==this.lastEmittedValue&&(this.lastEmittedValue=o,this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))),(this.mode==="range"?o.includes("/"):o)&&this.open&&this.hide()},this.handleCalendarInput=t=>{t.stopPropagation(),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))},this.handleDefaultSlotChange=()=>{if(this.didSSR&&!this.hasUpdated){this.updateComplete.then(()=>this.handleDefaultSlotChange());return}this.updateForwardedDaySlots()};let e=this.shadowRoot?.querySelector?.("[part~='popup']")?.id;this.popupId=e||Cw(),this.keyboardHelpId=`${this.popupId}-help`}static get validators(){let e=[St({validationElement:Object.assign(document.createElement("input"),{required:!0})}),Um()];return[...super.validators,...e]}term(e,t){return this.localize.term(e)||t}get validationTarget(){return this.valueInput}get value(){return this.valueHasChanged?this._value:this._value||this.defaultValue||""}set value(e){let t=this.normalizeIncomingValue(e);if(t===this._value)return;let o=this._value;this._value=t,this.valueHasChanged=!0,this.hasUpdated?this.syncSegmentsFromCanonical():this.pendingValue=this._value,this.requestUpdate("value",o)}handleSizeChange(){te(this.localName,this.size)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners()}firstUpdated(){this.pendingValue!=null?(this._value=this.pendingValue,this.pendingValue=null):!this._value&&this.defaultValue&&(this._value=this.defaultValue),this.syncSegmentsFromCanonical(),this.updateForwardedDaySlots(),this.updateValidity(),this.lastEmittedValue=this._value}updated(e){super.updated?.(e),(e.has("mode")||e.has("value"))&&(this.customStates.set("blank",!this.value),this.customStates.set("range",this.mode==="range")),e.has("open")&&this.customStates.set("open",this.open)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleModeChange(){this.hasUpdated&&this.syncSegmentsFromCanonical()}async handleOpenChange(){if(this.open&&!this.disabled){let e=new Te;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.popup.active=!0,await this.updateComplete,await se(this.popup.popup,"show"),this.moveFocusToCalendarOnShow&&(this.moveFocusToCalendarOnShow=!1,this.calendar?.focus({preventScroll:!0})),this.dispatchEvent(new Ve)}else{let e=new Le;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0;return}this.removeOpenListeners(),await se(this.popup.popup,"hide"),this.popup.active=!1,this.dispatchEvent(new Pe);let t=this.shadowRoot?.activeElement;t&&this.popup?.contains(t)&&this.focusActiveSegment()}}focus(e){this.segmentsController.findFocusableSegment((o,i)=>this.getGroupSegments(o)[i]==null)?.focus(e)}blur(){this.shadowRoot?.activeElement?.blur()}async show(){this.open||this.disabled||(this.open=!0,await Ee(this,"wa-after-show"))}async hide(){!this.open||this.disabled||(this.open=!1,await Ee(this,"wa-after-hide"))}get valueAsDate(){return this.mode!=="single"?null:q(this.value)}get valueAsRange(){return this.mode!=="range"?{from:null,to:null}:$t(this.value)}clear(){this.disabled||this.readonly||this.clearValue()}formResetCallback(){this._value=this.defaultValue,this.valueHasChanged=!1,this.segmentsController.clearBuffers(),this.syncSegmentsFromCanonical(),super.formResetCallback(),this.lastEmittedValue=this._value,this.requestUpdate()}formStateRestoreCallback(e){typeof e=="string"&&(this._value=e,this.hasUpdated?this.syncSegmentsFromCanonical():this.pendingValue=e,this.requestUpdate()),this.updateValidity()}get resolvedLocale(){return this.localize.lang()||"en"}get isRtl(){return this.localize.dir()==="rtl"}getLayout(){return Zm(this.resolvedLocale)}normalizeIncomingValue(e){if(e==null)return"";if(typeof e=="string")return e;if(e instanceof Date)return we(e);if(typeof e=="object"&&e!==null){let t=e,o=t.from?this.normalizeIncomingValue(t.from):"",i=t.to?this.normalizeIncomingValue(t.to):"";return o&&i?`${o}/${i}`:o||i||""}return""}syncSegmentsFromCanonical(){if(this.segmentsController.clearBuffers(),this.mode==="range"){let e=rf(this._value);this.fromSegments=e.from,this.toSegments=e.to,this.segments={year:null,month:null,day:null}}else this.segments=yt(this._value),this.fromSegments={year:null,month:null,day:null},this.toSegments={year:null,month:null,day:null};this.updateHiddenInput()}updateHiddenInput(){this.valueInput&&(this.valueInput.value=this._value),this.setValue(this._value||null)}recomputeValue(){let e=this._value,t;if(this.mode==="range"?t=of(this.fromSegments,this.toSegments):t=bn(this.segments),t!==e&&(this._value=t,this.valueHasChanged=!0,this.updateHiddenInput(),this.updateValidity()),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),t!==this.lastEmittedValue&&(this.lastEmittedValue=t,this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))),this.mode==="single"){let o=q(t);o&&this.calendar?.goToDate(o)}}getGroupSegments(e){return e==="from"?this.fromSegments:e==="to"?this.toSegments:this.segments}setGroupSegments(e,t){e==="from"?this.fromSegments=t:e==="to"?this.toSegments=t:this.segments=t}getBuffer(e,t){return this.segmentsController.getBuffer(e,t)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),Ue(this)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),ze(this)}focusActiveSegment(){let e=this.segmentsController.getActiveSegment();if(e){let t=this.segmentsController.segmentElementFor(e.group,e.field);if(t){t.focus({preventScroll:!0});return}}this.segmentsController.findFocusableSegment((t,o)=>this.getGroupSegments(t)[o]==null)?.focus({preventScroll:!0})}clearValue(){!this._value&&wn(this.segments)&&wn(this.fromSegments)&&wn(this.toSegments)||(this._value="",this.valueHasChanged=!0,this.segmentsController.clearBuffers(),this.syncSegmentsFromCanonical(),this.updateValidity(),this.dispatchEvent(new ro),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.lastEmittedValue="",this.focus())}updateForwardedDaySlots(){let e=/^day-\d{4}-\d{2}-\d{2}$/,t=new Set;for(let i of Array.from(this.children)){let r=i.getAttribute("slot");r&&e.test(r)&&t.add(r)}let o=Array.from(t).sort();o.join(",")!==this.forwardedDaySlots.join(",")&&(this.forwardedDaySlots=o)}placeholderFor(e){return e==="year"?"yyyy":e==="month"?"mm":"dd"}fieldLabelFor(e){let t=e==="year"?"Year":e==="month"?"Month":"Day";return this.term(e,t)}segmentAriaLabel(e,t){let o=this.fieldLabelFor(t);return e==="from"?`${this.term("startDate","Start date")} ${o}`:e==="to"?`${this.term("endDate","End date")} ${o}`:o}segmentAriaValueText(e,t){let o=this.getGroupSegments(e)[t],i=this.getBuffer(e,t);if(i)return i;if(o==null)return this.term("empty","Empty");if(t==="month")try{return new Intl.DateTimeFormat(this.resolvedLocale,{month:"long",calendar:"gregory"}).format(new Date(2026,o-1,1))}catch{return String(o)}return String(o)}render(){let e=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,t=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,o=!!this.label||!!e,i=!!this.hint||!!t,r=!!this._value,n=this.getLayout(),a=this.label||this.term("date","Date");return b`
      <div
        part="form-control"
        class=${T({"form-control":!0,"form-control-has-label":o})}
      >
        <label
          id="label"
          part="form-control-label label"
          class=${T({label:!0,"has-label":o})}
          aria-hidden=${o?"false":"true"}
          @click=${()=>this.focus()}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${T({"date-input-popup":!0,open:this.open})}
            placement=${this.placement}
            distance=${this.distance}
            ?active=${this.open}
            flip
            shift
          >
            <div
              part="base date-input input-wrapper"
              class="input-wrapper"
              slot="anchor"
              @pointerdown=${this.handleInputWrapperPointerDown}
            >
              <slot name="start" part="start" class="start"></slot>

              <div
                part="input"
                class="segments"
                role="group"
                aria-labelledby=${o?"label":k}
                aria-label=${o?k:a}
              >
                ${this.mode==="range"?this.renderRangeSegments(n):this.renderSegmentGroup("single",n)}
              </div>

              <span id=${this.keyboardHelpId} class="visually-hidden">
                ${this.term("datePickerKeyboardHelp","Use arrow keys to change values; press Alt+Down Arrow to open the calendar.")}
              </span>

              <input
                class="value-input"
                type="text"
                tabindex="-1"
                aria-hidden="true"
                .value=${this._value}
                value=${this._value}
                ?disabled=${this.disabled}
                ?required=${this.required}
                autocomplete=${z(this.autocomplete||void 0)}
              />

              ${this.withClear&&r?b`<button
                    part="clear-button"
                    type="button"
                    class="clear-button"
                    aria-label=${this.localize.term("clearEntry")}
                    tabindex="-1"
                    @mousedown=${this.handleClearMouseDown}
                    @click=${this.handleClearClick}
                  >
                    <slot name="clear-icon">
                      <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                    </slot>
                  </button>`:k}

              <slot name="end" part="end" class="end"></slot>

              <button
                part="expand-button"
                type="button"
                class="expand-button"
                aria-label=${this.open?this.term("closeCalendar","Close calendar"):this.term("chooseDate","Choose date")}
                aria-haspopup="dialog"
                aria-expanded=${this.open?"true":"false"}
                aria-controls=${this.popupId}
                ?disabled=${this.disabled}
                @click=${this.handleExpandButtonClick}
              >
                <slot name="expand-icon" part="expand-icon" class="expand-icon">
                  <wa-icon library="system" name="calendar"></wa-icon>
                </slot>
              </button>
            </div>

            <div
              id=${this.popupId}
              part="popup"
              class="popup-body"
              role="dialog"
              aria-modal="true"
              aria-label=${this.term("chooseDate","Choose date")}
            >
              <wa-date-picker
                part="date-picker"
                exportparts="base:date-picker__base,header:date-picker__header,title:date-picker__title,nav:date-picker__nav,previous:date-picker__previous,next:date-picker__next,months:date-picker__months,month:date-picker__month,month-label:date-picker__month-label,weekdays:date-picker__weekdays,weekday:date-picker__weekday,weeknumbers:date-picker__weeknumbers,weeknumber:date-picker__weeknumber,grid:date-picker__grid,day:date-picker__day,day-today:date-picker__day-today,day-outside:date-picker__day-outside,day-weekend:date-picker__day-weekend,day-disabled:date-picker__day-disabled,day-selected:date-picker__day-selected,day-range-start:date-picker__day-range-start,day-range-end:date-picker__day-range-end,day-range-inner:date-picker__day-range-inner,day-range-preview:date-picker__day-range-preview,day-label:date-picker__day-label,day-placeholder:date-picker__day-placeholder,view-grid:date-picker__view-grid,view-row:date-picker__view-row,view-cell:date-picker__view-cell,view-item:date-picker__view-item,view-item-today:date-picker__view-item-today,view-item-selected:date-picker__view-item-selected,view-item-disabled:date-picker__view-item-disabled,footer:date-picker__footer"
                .mode=${this.mode}
                .value=${this._value}
                value=${this._value}
                min=${this.min}
                max=${this.max}
                today=${this.today}
                first-day-of-week=${this.firstDayOfWeek}
                .disabledDates=${this.disabledDates}
                disabled-days-of-week=${this.disabledDaysOfWeek}
                ?disable-past=${this.disablePast}
                ?disable-future=${this.disableFuture}
                min-range=${this.minRange}
                max-range=${this.maxRange}
                .isDateDisabled=${this.isDateDisabled}
                .dayContent=${this.dayContent}
                months=${this.months}
                page-by=${this.pageBy}
                ?with-outside-days=${this.withOutsideDays}
                ?with-week-numbers=${this.withWeekNumbers}
                weekday-format=${this.weekdayFormat}
                ?readonly=${this.readonly}
                @change=${this.handleCalendarChange}
                @input=${this.handleCalendarInput}
              >
                <slot name="footer" slot="footer"></slot>
                <slot name="previous-icon" slot="previous-icon">
                  <wa-icon library="system" name="chevron-left" variant="solid"></wa-icon>
                </slot>
                <slot name="next-icon" slot="next-icon">
                  <wa-icon library="system" name="chevron-right" variant="solid"></wa-icon>
                </slot>
                ${this.forwardedDaySlots.map(s=>b`<slot name=${s} slot=${s}></slot>`)}
              </wa-date-picker>
            </div>
          </wa-popup>
        </div>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${T({"has-slotted":i})}
          aria-hidden=${i?"false":"true"}
        >
          ${this.hint}
        </slot>

        <slot class="hidden-children" @slotchange=${this.handleDefaultSlotChange}></slot>
      </div>
    `}renderSegmentGroup(e,t){let o=!1,i=[];for(let r=0;r<t.tokens.length;r++){let n=t.tokens[r];if(n.kind==="literal")i.push(this.renderLiteral(n.text));else{let a=this.segmentsController.getActiveSegment(),s=!o&&(a==null?e===(this.mode==="range"?"from":"single"):a.group===e&&a.field===n.field);s&&(o=!0),i.push(this.renderSegment(e,n.field,s))}}return i}renderRangeSegments(e){return[...this.renderSegmentGroup("from",e),b`<span part="range-separator segment-literal" class="segment-literal range-separator" aria-hidden="true"
        >&nbsp;–&nbsp;</span
      >`,...this.renderSegmentGroup("to",e)]}renderLiteral(e){return b`<span part="segment-literal" class="segment-literal" aria-hidden="true">${e}</span>`}renderSegment(e,t,o){let i=this.getGroupSegments(e),r=this.getBuffer(e,t),n=i[t],a=this.placeholderFor(t),s=nf(t,n,r,a),c=n==null&&!r,d=vn(t,i),h=this.segmentAriaValueText(e,t);return b`<span
      part="segment"
      class=${T({segment:!0,empty:c,[`segment-${t}`]:!0})}
      data-group=${e}
      data-segment=${t}
      role="spinbutton"
      tabindex=${this.disabled?-1:o?0:-1}
      aria-label=${this.segmentAriaLabel(e,t)}
      aria-valuemin=${d.min}
      aria-valuemax=${d.max}
      aria-valuenow=${z(n??void 0)}
      aria-valuetext=${h}
      aria-readonly=${this.readonly?"true":"false"}
      aria-disabled=${this.disabled?"true":"false"}
      aria-describedby=${this.keyboardHelpId}
      inputmode="numeric"
      @keydown=${this.handleSegmentKeyDown}
      @focus=${this.handleSegmentFocus}
      @blur=${this.handleSegmentBlur}
      @paste=${this.handleSegmentPaste}
      >${s}</span
    >`}};H.css=[oe,ye,sf,lf];H.shadowRootOptions={...G.shadowRootOptions,delegatesFocus:!0};l([_(".date-input-popup")],H.prototype,"popup",2);l([_(".value-input")],H.prototype,"valueInput",2);l([_('[part~="input"]')],H.prototype,"inputGroup",2);l([_("wa-date-picker")],H.prototype,"calendar",2);l([I()],H.prototype,"forwardedDaySlots",2);l([I()],H.prototype,"segments",2);l([I()],H.prototype,"fromSegments",2);l([I()],H.prototype,"toSegments",2);l([u({reflect:!0})],H.prototype,"name",2);l([I()],H.prototype,"value",1);l([u({attribute:"value",reflect:!0})],H.prototype,"defaultValue",2);l([u({type:Boolean})],H.prototype,"disabled",2);l([u({type:Boolean,reflect:!0})],H.prototype,"required",2);l([u({type:Boolean,reflect:!0})],H.prototype,"readonly",2);l([u({reflect:!0})],H.prototype,"size",2);l([S("size")],H.prototype,"handleSizeChange",1);l([u({reflect:!0})],H.prototype,"appearance",2);l([u({type:Boolean,reflect:!0})],H.prototype,"pill",2);l([u()],H.prototype,"label",2);l([u({attribute:"hint"})],H.prototype,"hint",2);l([u()],H.prototype,"autocomplete",2);l([u({attribute:"with-clear",type:Boolean})],H.prototype,"withClear",2);l([u({attribute:"with-label",type:Boolean})],H.prototype,"withLabel",2);l([u({attribute:"with-hint",type:Boolean})],H.prototype,"withHint",2);l([u({reflect:!0})],H.prototype,"mode",2);l([u({reflect:!0})],H.prototype,"min",2);l([u({reflect:!0})],H.prototype,"max",2);l([u({reflect:!0})],H.prototype,"today",2);l([u({attribute:"first-day-of-week",reflect:!0})],H.prototype,"firstDayOfWeek",2);l([u({attribute:"disabled-dates"})],H.prototype,"disabledDates",2);l([u({attribute:"disabled-days-of-week"})],H.prototype,"disabledDaysOfWeek",2);l([u({attribute:"disable-past",type:Boolean,reflect:!0})],H.prototype,"disablePast",2);l([u({attribute:"disable-future",type:Boolean,reflect:!0})],H.prototype,"disableFuture",2);l([u({attribute:"min-range",type:Number,reflect:!0})],H.prototype,"minRange",2);l([u({attribute:"max-range",type:Number,reflect:!0})],H.prototype,"maxRange",2);l([u({attribute:!1})],H.prototype,"isDateDisabled",2);l([u({attribute:!1})],H.prototype,"dayContent",2);l([u({type:Number,reflect:!0})],H.prototype,"months",2);l([u({attribute:"page-by",reflect:!0})],H.prototype,"pageBy",2);l([u({attribute:"with-outside-days",type:Boolean,reflect:!0})],H.prototype,"withOutsideDays",2);l([u({attribute:"with-week-numbers",type:Boolean,reflect:!0})],H.prototype,"withWeekNumbers",2);l([u({attribute:"weekday-format",reflect:!0})],H.prototype,"weekdayFormat",2);l([u({type:Boolean,reflect:!0})],H.prototype,"open",2);l([u({reflect:!0})],H.prototype,"placement",2);l([u({type:Number,reflect:!0})],H.prototype,"distance",2);l([S("disabled",{waitUntilFirstUpdate:!0})],H.prototype,"handleDisabledChange",1);l([S("mode")],H.prototype,"handleModeChange",1);l([S("open",{waitUntilFirstUpdate:!0})],H.prototype,"handleOpenChange",1);H=l([F("wa-date-input")],H);var cf=class extends Event{constructor(e){super("wa-view-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Rl=class extends Event{constructor(e){super("wa-focus-day",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};function uf(e){let{min:t,max:o,disabledDates:i,disabledDaysOfWeek:r,disablePast:n,disableFuture:a,today:s,isDateDisabled:c}=e,d=t?.getTime()??-1/0,h=o?.getTime()??1/0,m=s.getTime(),p=new Set(r),f=new Set(i.map(g=>g.getTime()));return function(w){let x=w.getTime();return!!(x<d||x>h||n&&x<m||a&&x>m||p.size&&p.has(w.getDay())||f.size&&f.has(x)||c&&c(w))}}function hf(e){if(e==null||e==="")return[];let t=Array.isArray(e)?e:e.split(/\s+/),o=[];for(let i of t){if(i instanceof Date){isNaN(i.getTime())||o.push(new Date(i.getFullYear(),i.getMonth(),i.getDate()));continue}let r=q(String(i).trim());r&&o.push(r)}return o}var df={sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6};function pf(e){if(e==null||e==="")return[];let t=String(e).toLowerCase().split(/\s+/).filter(Boolean),o=new Set;for(let i of t)i in df&&o.add(df[i]);return[...o]}var Sw=new Set(["US","CA","MX","BR","JP","PH","IL","AU","NZ","ZA","CO","VE","PE","EC","GT","HN","NI","SV","CR","PA","DO","PR","JM","TT","BS","BB","BZ","BO","BM","TW","HK","MO","SG","TH","ET","KE"]),_w=new Set(["SA","AE","QA","KW","BH","OM","YE","JO","SY","IQ","EG","SD","DZ","LY"]),kw=new Set(["SA","AE","QA","KW","BH","OM","YE","JO","EG","SD","DZ","LY","SY","IQ","IL"]);function Ew(e){try{return new Intl.Locale(e).maximize().region??null}catch{return null}}function Rw(e){let t=Ew(e),o=1;t&&Sw.has(t)?o=7:t&&_w.has(t)&&(o=6);let i=t&&kw.has(t)?[5,6]:[6,7];return{firstDay:o,weekend:i}}function Al(e){try{let t=new Intl.Locale(e),o=typeof t.getWeekInfo=="function"?t.getWeekInfo():t.weekInfo;if(o&&typeof o.firstDay=="number"&&Array.isArray(o.weekend))return{firstDay:o.firstDay,weekend:o.weekend}}catch{}return Rw(e)}function zl(e){return e===7?0:e}function mf(e){return e.map(zl)}var ff=E`
  :host {
    /* @internal Base size of a single cell */
    --cell-size: 2.5em;

    /* @internal Height of one day-grid row: the day button's min-height plus its cell padding. The weekday header row
       is pinned to the same height below. */
    --row-height: calc(var(--cell-size) + 2 * var(--wa-space-3xs));

    /* @internal Intrinsic height of the day grid: 1 weekday header row + 6 week rows. The months and years views are
       pinned to this so switching views never shifts the calendar's height. */
    --grid-height: calc(7 * var(--row-height));

    display: block;
    color: var(--wa-color-text-normal);
    font-family: var(--wa-font-family-body);
    line-height: var(--wa-line-height-normal);
    container-type: inline-size;
    container-name: date-picker;
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: 0.5;
  }

  [part~='base'] {
    display: flex;
    flex-direction: column;
    gap: var(--wa-space-s);
    padding: var(--wa-space-s);
    background-color: var(--wa-color-surface-default);
    border: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    user-select: none;
    -webkit-user-select: none;
  }

  /* Header */
  [part~='header'] {
    display: flex;
    align-items: center;
    gap: var(--wa-space-2xs);
  }

  [part~='title'] {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.25em;
    background: transparent;
    border: none;
    border-radius: var(--wa-form-control-border-radius);
    padding: var(--wa-space-2xs) var(--wa-space-s);
    color: inherit;
    font: inherit;
    font-weight: var(--wa-font-weight-semibold);
    cursor: pointer;
    text-align: center;
    min-height: var(--cell-size);
  }

  [part~='title']:hover {
    background-color: var(--wa-color-neutral-fill-quiet);
  }

  [part~='title']:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  [part~='nav'] {
    display: inline-flex;
    gap: var(--wa-space-2xs);
  }

  [part~='previous'],
  [part~='next'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: var(--wa-form-control-border-radius);
    padding: 0;
    color: inherit;
    cursor: pointer;
    width: var(--cell-size);
    height: var(--cell-size);
    font-size: inherit;
  }

  [part~='previous']:hover:not(:disabled),
  [part~='next']:hover:not(:disabled) {
    background-color: var(--wa-color-neutral-fill-quiet);
  }

  [part~='previous']:focus-visible,
  [part~='next']:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  [part~='previous']:disabled,
  [part~='next']:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* Months container */
  [part~='months'] {
    display: flex;
    gap: var(--wa-space-m);
    width: 100%;
  }

  /* When the calendar isn't wide enough to fit two months side-by-side, stack them vertically so each
     month still has room to render comfortably. */
  @container date-picker (max-width: 32em) {
    [part~='months'] {
      flex-direction: column;
    }
  }

  [part~='month'] {
    display: flex;
    flex-direction: column;
    gap: var(--wa-space-2xs);
    flex: 1 1 0;
    min-width: 0;
  }

  [part~='month-label'] {
    text-align: center;
    font-weight: var(--wa-font-weight-semibold);
    font-size: 0.875em;
    color: var(--wa-color-text-quiet);
  }

  /* Day grid. Pinned to --grid-height (the same height the months/years view uses) so the calendar never shifts when
     switching views. A table given an explicit height distributes it across its rows; the row heights below keep the
     distribution predictable. */
  [part~='grid'] {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    height: var(--grid-height);
  }

  [part~='grid'] th,
  [part~='grid'] td {
    padding: var(--wa-space-3xs) 0;
    text-align: center;
  }

  [part~='weekday'] {
    /* Pinned to the same row height as a day row so the grid is a predictable 7 × --row-height. */
    height: var(--row-height);
    box-sizing: border-box;
    font-size: 0.75em;
    font-weight: var(--wa-font-weight-normal);
    color: var(--wa-color-text-quiet);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  [part~='weeknumber'] {
    font-size: 0.75em;
    font-weight: var(--wa-font-weight-normal);
    color: var(--wa-color-text-quiet);
    padding-inline-end: var(--wa-space-2xs) !important;
    border-inline-end: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
  }

  /* Day-cell placeholder used by trailing rows so the grid is always 6 rows tall. Matches the day button's vertical
     footprint so the overall calendar height never shifts. */
  [part~='day-placeholder'] {
    display: block;
    min-height: var(--cell-size);
  }

  /* Day cell button */
  [part~='day'] {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: var(--cell-size);
    background: transparent;
    border: none;
    border-radius: var(--wa-form-control-border-radius);
    color: inherit;
    font: inherit;
    font-size: inherit;
    cursor: pointer;
    padding: 0;
  }

  [part~='day']:hover:not([data-disabled]):not([data-out-of-reach]):not([data-selected]):not([data-range-start]):not(
      [data-range-end]
    ):not([data-range-inner]):not([data-range-preview]) {
    background-color: var(--wa-color-neutral-fill-quiet);
  }

  [part~='day'][data-out-of-reach] {
    cursor: not-allowed;
  }

  [part~='day']:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: calc(-1 * var(--wa-focus-ring-width, 2px));
  }

  [part~='day'][data-today] {
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-neutral-border-quiet);
  }

  [part~='day'][data-outside] {
    color: var(--wa-color-text-quiet);
    opacity: 0.6;
  }

  [part~='day'][data-disabled] {
    color: var(--wa-color-text-quiet);
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* Selection styling */
  [part~='day'][data-selected],
  [part~='day'][data-range-start],
  [part~='day'][data-range-end] {
    background-color: var(--wa-color-brand-fill-loud);
    border: none;
    color: var(--wa-color-brand-on-loud);
  }

  [part~='day'][data-selected]:hover,
  [part~='day'][data-range-start]:hover,
  [part~='day'][data-range-end]:hover {
    background-color: var(--wa-color-brand-fill-loud);
  }

  /* Range middle + hover preview */
  [part~='day'][data-range-inner],
  [part~='day'][data-range-preview] {
    background-color: var(--wa-color-brand-fill-quiet);
    color: var(--wa-color-brand-on-quiet);
    border-radius: 0;
  }

  /* Interior range cells are square by default; the row-edge and endpoint rules below selectively restore radii. Each
     selector here is written with matching specificity so source order alone decides the winner — later rules (row
     edges, then endpoints) override earlier ones. */
  td[data-in-range] [part~='day'] {
    border-radius: 0;
  }

  td[data-in-range] [part~='day']:hover:not([data-selected]):not([data-disabled]) {
    background-color: var(--wa-color-brand-fill-normal);
  }

  /* Soften the range fill where it meets a row edge. When a range spans multiple weeks, the fill block ends abruptly at
     the first/last cell of a row, leaving sharp corners. Round the leading edge of a range cell that starts a row (or
     follows a non-range cell), and the trailing edge of one that ends a row (or precedes a non-range cell). The
     "th + td" selector covers the case where the week-numbers column shifts the first day cell off :first-child. */
  td[data-in-range]:first-child [part~='day'],
  th + td[data-in-range] [part~='day'],
  td:not([data-in-range]) + td[data-in-range] [part~='day'] {
    border-start-start-radius: var(--wa-form-control-border-radius);
    border-end-start-radius: var(--wa-form-control-border-radius);
  }

  td[data-in-range]:last-child [part~='day'],
  td[data-in-range]:has(+ td:not([data-in-range])) [part~='day'] {
    border-start-end-radius: var(--wa-form-control-border-radius);
    border-end-end-radius: var(--wa-form-control-border-radius);
  }

  /* Range endpoints: round the outward-facing side fully, square the side facing the range fill. These come last so
     they win over the row-edge rules above at the true endpoints. */
  td[data-range-start] [part~='day'] {
    border-start-start-radius: var(--wa-form-control-border-radius);
    border-end-start-radius: var(--wa-form-control-border-radius);
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  td[data-range-end] [part~='day'] {
    border-start-end-radius: var(--wa-form-control-border-radius);
    border-end-end-radius: var(--wa-form-control-border-radius);
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* Single-day range (start === end, e.g. hovering the anchor itself): restore full radius. */
  td[data-range-start][data-range-end] [part~='day'] {
    border-radius: var(--wa-form-control-border-radius);
  }

  /* Year / month grid view. Pinned to the day grid's height (--grid-height) and given equal auto-rows so its 4 rows
     stretch to fill that space — switching views never shifts height. min-height keeps it flexible if the grid's content
     ever needs more room. */
  [part~='view-grid'] {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 1fr;
    gap: var(--wa-space-2xs);
    min-height: var(--grid-height);
  }

  /* The row and cell wrappers exist only to satisfy the ARIA grid structure (grid → row → gridcell);
     both stay transparent to layout so the view-item buttons remain direct CSS Grid items of view-grid. */
  [part~='view-row'],
  [part~='view-cell'] {
    display: contents;
  }

  [part~='view-item'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: var(--wa-form-control-border-radius);
    color: inherit;
    font: inherit;
    cursor: pointer;
    padding: var(--wa-space-s);
    min-height: 3em;
  }

  [part~='view-item']:hover:not([data-disabled]):not([data-selected]) {
    background-color: var(--wa-color-neutral-fill-quiet);
  }

  [part~='view-item'][data-selected]:hover {
    background-color: var(--wa-color-brand-fill-loud);
    color: var(--wa-color-brand-on-loud);
  }

  [part~='view-item']:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* "Today" = the current month/year. Matches today's day in the day grid with a subtle, neutral border. */
  [part~='view-item'][data-today] {
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-neutral-border-quiet);
  }

  [part~='view-item'][data-selected] {
    background-color: var(--wa-color-brand-fill-loud);
    color: var(--wa-color-brand-on-loud);
  }

  [part~='view-item'][data-disabled] {
    opacity: 0.4;
    cursor: not-allowed;
  }

  [part~='footer']:not(:empty) {
    display: flex;
    align-items: center;
    gap: var(--wa-space-s);
    padding-top: var(--wa-space-s);
    border-top: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
  }

  /* Visually hidden status text used for announcements */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;var ee=class extends V{constructor(){super(...arguments),this.localize=new N(this),this.mode="single",this._value="",this.min="",this.max="",this.today="",this.focusedDate="",this.view="days",this.months=1,this.pageBy="months",this.firstDayOfWeek="auto",this.withOutsideDays=!1,this.withWeekNumbers=!1,this.weekdayFormat="short",this.disabled=!1,this.readonly=!1,this._disabledDatesRaw="",this._disabledDates=[],this.disabledDaysOfWeek="",this.disablePast=!1,this.disableFuture=!1,this.minRange=0,this.maxRange=0,this.size="m",this.locale="",this.rangeAnchor=null,this.rangeCommittedValue="",this.hoverDate=null,this.viewAnchor=null,this.focusedMonth=null,this.focusedYear=null,this.liveAnnouncement="",this.handleGridMouseLeave=()=>{this.mode==="range"&&this.rangeAnchor&&(this.hoverDate=null)}}get value(){return this._value}set value(e){let t=this.normalizeValue(e);if(t===this._value)return;let o=this._value;this._value=t,this.requestUpdate("value",o)}get disabledDates(){return this._disabledDatesRaw}set disabledDates(e){this._disabledDatesRaw=e??"",this._disabledDates=hf(e),this.requestUpdate("disabledDates")}handleSizeChange(){te(this.localName,this.size)}connectedCallback(){super.connectedCallback(),this.updateCustomStates(),this.didSSR&&!this.hasUpdated&&this.updateComplete.then(()=>{this.requestUpdate()})}willUpdate(e){if(super.willUpdate(e),(e.has("disabled")||e.has("readonly")||e.has("mode"))&&this.updateCustomStates(),!this.viewAnchor){let t=this.resolvedFocusedDate();this.viewAnchor=new Date(t.getFullYear(),t.getMonth(),1)}}updateCustomStates(){this.customStates.set("disabled",this.disabled),this.customStates.set("readonly",this.readonly),this.customStates.set("range",this.mode==="range")}handleModeChange(e,t){if(this.rangeAnchor=null,this.hoverDate=null,this.rangeCommittedValue="",this.liveAnnouncement="",this.viewAnchor=null,t!==void 0){let o=this.normalizeValue(this._value);o!==this._value&&(this._value=o)}}focus(e){let t=this.base?.querySelector('[part~="day"][tabindex="0"]');t?t.focus(e):super.focus(e)}goToDate(e){let t=fn(e);t&&(this.focusedDate=we(t),this.setViewAnchor(new Date(t.getFullYear(),t.getMonth(),1)))}goToToday(){this.goToDate(this.resolvedToday())}clear(){this.disabled||this.readonly||!this._value&&!this.rangeAnchor||(this._value="",this.rangeAnchor=null,this.hoverDate=null,this.rangeCommittedValue="",this.liveAnnouncement="",this.requestUpdate(),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.announceSelection())}get valueAsDate(){return this.mode!=="single"?null:q(this._value)}get valueAsRange(){return this.mode!=="range"?{from:null,to:null}:$t(this._value)}normalizeValue(e){if(e==null||e==="")return"";if(this.mode==="single"){if(e instanceof Date)return we(e);if(typeof e=="string"){let t=$t(e).from;return t?we(t):""}return""}if(typeof e=="string"){let t=$t(e);return gn(t)}if(e instanceof Date)return we(e);if(typeof e=="object"){let t=e,o=fn(t.from??null),i=fn(t.to??null);return gn({from:o,to:i})}return""}resolvedLocale(){return this.didSSR&&!this.hasUpdated?this.locale||this.lang||"en":this.locale||this.lang||(typeof document<"u"?document.documentElement.lang:"")||"en"}resolvedToday(){return q(this.today)??Gm()}resolvedFirstDay(){let e={sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6},t=String(this.firstDayOfWeek??"").toLowerCase();if(t in e)return e[t];if(this.didSSR&&!this.hasUpdated){let o=this.shadowRoot?.querySelector?.("[data-first-day]")?.getAttribute?.("data-first-day");if(o!=null)return Number(o)}return zl(Al(this.resolvedLocale()).firstDay)}resolvedWeekendDays(){if(this.didSSR&&!this.hasUpdated){let e=this.shadowRoot?.querySelector?.("[data-weekend-days]")?.getAttribute("data-weekend-days");if(e)return e.split(/\s+/).map(Number)}return mf(Al(this.resolvedLocale()).weekend)}resolvedFocusedDate(){let e=q(this.min),t=q(this.max),o=q(this.focusedDate);if(o)return vt(o,e,t);if(this.mode==="single"){let i=q(this._value);if(i)return vt(i,e,t)}else{let i=$t(this._value);if(i.from)return vt(i.from,e,t)}return vt(this.resolvedToday(),e,t)}resolvedViewAnchor(){let e=q(this.min),t=q(this.max);return this.viewAnchor?vt(this.viewAnchor,e,t):this.resolvedFocusedDate()}isInVisibleRange(e){let t=this.resolvedViewAnchor(),o=this.resolvedMonthCount(),i=new Date(t.getFullYear(),t.getMonth(),1),r=new Date(t.getFullYear(),t.getMonth()+o,0);return e.getTime()>=i.getTime()&&e.getTime()<=r.getTime()}resolvedRovingFocus(){let e=this.resolvedFocusedDate();if(this.isInVisibleRange(e))return e;let t=this.resolvedViewAnchor();return new Date(t.getFullYear(),t.getMonth(),1)}resolvedFocusedMonth(){return this.focusedMonth!==null?this.focusedMonth:this.resolvedFocusedDate().getMonth()}resolvedFocusedYear(){return this.focusedYear!==null?this.focusedYear:this.resolvedFocusedDate().getFullYear()}buildDisabledChecker(){return uf({min:q(this.min),max:q(this.max),disabledDates:this._disabledDates,disabledDaysOfWeek:pf(this.disabledDaysOfWeek),disablePast:this.disablePast,disableFuture:this.disableFuture,today:this.resolvedToday(),isDateDisabled:this.isDateDisabled})}resolvedMonthCount(e=this.months){return Number(e)===2?2:1}pageStep(){return this.pageBy==="months"?this.resolvedMonthCount():1}handlePrevious(){if(this.disabled)return;let e=this.resolvedViewAnchor(),t=q(this.min),o=q(this.max);t&&this.isPageOutsideRange("previous",e,t,o)||this.setViewAnchor(this.getPageAnchor("previous",e))}handleNext(){if(this.disabled)return;let e=this.resolvedViewAnchor(),t=q(this.min),o=q(this.max);o&&this.isPageOutsideRange("next",e,t,o)||this.setViewAnchor(this.getPageAnchor("next",e))}getPageAnchor(e,t){let o=e==="previous"?-1:1;return this.view==="days"?hi(t,o*this.pageStep()):this.view==="months"?Ki(t,o*1):Ki(t,o*12)}isPageOutsideRange(e,t,o,i){if(e==="previous"&&!o||e==="next"&&!i)return!1;if(this.view==="days"){let a=this.pageStep();if(e==="previous"){let c=at(new Date(t.getFullYear(),t.getMonth(),1),-1);return!!o&&c.getTime()<o.getTime()}let s=new Date(t.getFullYear(),t.getMonth()+a,1);return!!i&&s.getTime()>i.getTime()}if(this.view==="months"){let a=t.getFullYear();if(e==="previous"){let c=new Date(a-1,11,31);return!!o&&c.getTime()<o.getTime()}let s=new Date(a+1,0,1);return!!i&&s.getTime()>i.getTime()}let r=Math.floor(t.getFullYear()/12)*12;if(e==="previous"){let a=new Date(r-1,11,31);return!!o&&a.getTime()<o.getTime()}let n=new Date(r+12,0,1);return!!i&&n.getTime()>i.getTime()}setViewAnchor(e){let t=q(this.min),o=q(this.max);this.viewAnchor=vt(e,t,o)}handleTitleClick(){this.disabled||(this.view==="days"?(this.setView("months"),this.queueFocus('[part~="view-item"][tabindex="0"]')):this.view==="months"?(this.setView("years"),this.queueFocus('[part~="view-item"][tabindex="0"]')):(this.setView("days"),this.queueFocus('[part~="day"][tabindex="0"]')))}handleTitleKeydown(e){this.disabled||!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)||(e.preventDefault(),this.view==="days"?this.queueFocus('[part~="day"][tabindex="0"]'):this.view==="months"?this.queueFocus('[part~="view-item"][tabindex="0"]'):this.queueFocus('[part~="view-item"][tabindex="0"]'))}setView(e){if(this.view===e)return;let t=this.view;this.view=e,e==="months"?t==="days"&&(this.focusedMonth=this.resolvedFocusedDate().getMonth()):e==="years"?this.focusedYear=this.resolvedViewAnchor().getFullYear():(this.focusedMonth=null,this.focusedYear=null),this.dispatchEvent(new cf({view:e,date:this.resolvedFocusedDate()}))}handleDayClick(e,t){if(this.disabled||this.readonly||t)return;if(this.mode==="single"&&!this.isInVisibleRange(e)){let c=q(this.min),d=q(this.max);this.viewAnchor=vt(new Date(e.getFullYear(),e.getMonth(),1),c,d)}if(this.mode==="single"){let c=we(e);c!==this._value&&(this._value=c,this.focusedDate=c,this.requestUpdate(),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.announceSelection());return}if(!this.rangeAnchor){this.rangeCommittedValue=this._value,this.rangeAnchor=e,this.hoverDate=e,this.liveAnnouncement="",this._value=we(e),this.focusedDate=this._value,this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}));return}let o=this.rangeAnchor,i=e,r=o.getTime()<=i.getTime()?o:i,n=o.getTime()<=i.getTime()?i:o,a=Math.round((n.getTime()-r.getTime())/864e5)+1;if(this.maxRange>0&&a>this.maxRange){this.rangeAnchor=null,this.hoverDate=null;let c=this.rangeCommittedValue;this.rangeCommittedValue="",this.liveAnnouncement="",c!==this._value&&(this._value=c,this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})));return}if(this.minRange>0&&a<this.minRange){this.announce(this.localize.term("rangeTooShort",this.minRange));return}let s=gn({from:r,to:n});this.rangeAnchor=null,this.hoverDate=null,this.rangeCommittedValue="",this.liveAnnouncement="",this._value=s,this.focusedDate=we(n),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.announceSelection()}announce(e){this.liveAnnouncement=this.liveAnnouncement.endsWith("\u200B")?e:e+"\u200B"}announceSelection(){let e=this.resolvedLocale();if(this.mode==="range"){let{from:i,to:r}=$t(this._value);if(!i&&!r){this.announce(this.localize.term("selectionCleared"));return}let n=new Intl.DateTimeFormat(e,{month:"long",day:"numeric",year:"numeric"}),a=i&&r?`${n.format(i)} \u2013 ${n.format(r)}`:n.format(i??r);this.announce(this.localize.term("selectedRangeLabel",a));return}let t=q(this._value);if(!t){this.announce(this.localize.term("selectionCleared"));return}let o=new Intl.DateTimeFormat(e,{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(t);this.announce(this.localize.term("selectedDateLabel",o))}handleDayHover(e){if(this.mode!=="range"||!this.rangeAnchor)return;let t=this.clampHoverDate(e);this.hoverDate&&Mt(this.hoverDate,t)||(this.hoverDate=t,this.dispatchEvent(new Rl({date:t})))}clampHoverDate(e){let t=vt(e,q(this.min),q(this.max));if(!this.rangeAnchor)return t;let o=this.rangeAnchor,i=t.getTime()>=o.getTime()?1:-1;if(this.maxRange>0){let r=(this.maxRange-1)*i,n=at(o,r);i>0&&t.getTime()>n.getTime()&&(t=n),i<0&&t.getTime()<n.getTime()&&(t=n)}if(this.minRange>0){let r=(this.minRange-1)*i,n=at(o,r);i>0&&t.getTime()<n.getTime()&&(t=n),i<0&&t.getTime()>n.getTime()&&(t=n)}return vt(t,q(this.min),q(this.max))}isOutOfReach(e){return this.mode!=="range"||!this.rangeAnchor||this.maxRange<=0?!1:Math.abs(Math.round((e.getTime()-this.rangeAnchor.getTime())/864e5))+1>this.maxRange}handleEscape(){if(this.mode==="range"&&this.rangeAnchor){this.rangeAnchor=null,this.hoverDate=null;let e=this.rangeCommittedValue;this.rangeCommittedValue="",e!==this._value&&(this._value=e,this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})))}}handleDayKeydown(e,t,o){if(this.disabled||!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","PageUp","PageDown","Enter"," ","Escape"].includes(e.key))return;if(e.preventDefault(),e.key==="Escape"){this.handleEscape();return}if(e.key==="Enter"||e.key===" "){this.handleDayClick(t,o);return}let r=this.localize.dir()==="rtl",n=t;switch(e.key){case"ArrowLeft":n=at(t,r?1:-1);break;case"ArrowRight":n=at(t,r?-1:1);break;case"ArrowUp":n=at(t,-7);break;case"ArrowDown":n=at(t,7);break;case"Home":{let c=this.resolvedFirstDay(),d=(t.getDay()-c+7)%7;n=at(t,-d);break}case"End":{let c=this.resolvedFirstDay(),d=6-(t.getDay()-c+7)%7;n=at(t,d);break}case"PageUp":n=e.shiftKey?Ki(t,-1):hi(t,-1);break;case"PageDown":n=e.shiftKey?Ki(t,1):hi(t,1);break}let a=q(this.min),s=q(this.max);n=vt(n,a,s),this.focusedDate=we(n),this.isInVisibleRange(n)||(this.viewAnchor=new Date(n.getFullYear(),n.getMonth(),1)),this.dispatchEvent(new Rl({date:n})),this.updateComplete.then(()=>{this.base.querySelector(`[data-date="${we(n)}"]`)?.focus()}),this.mode==="range"&&this.rangeAnchor&&(this.hoverDate=n)}render(){let e=this.resolvedViewAnchor(),t=this.buildDisabledChecker(),o=this.resolvedLocale();return b`
      <div part="base date-picker" @mouseleave=${this.handleGridMouseLeave}>
        <slot name="header"> ${this.renderHeader(e,t)} </slot>

        ${this.view==="days"?this.renderDaysView(e,t,o):this.view==="months"?this.renderMonthsView(e,t,o):this.renderYearsView(e,t)}

        <slot name="footer" part="footer"></slot>

        <span class="visually-hidden" aria-live="polite">${this.liveAnnouncement}</span>
      </div>
    `}renderHeader(e,t){let o=this.resolvedLocale(),i=q(this.min),r=q(this.max),n="",a="";if(this.view==="days"){let m=this.resolvedMonthCount()>1;n=new Intl.DateTimeFormat(o,{month:m?void 0:"long",year:"numeric"}).format(e),a=this.localize.term("chooseMonth")}else if(this.view==="months")n=new Intl.DateTimeFormat(o,{year:"numeric"}).format(e),a=this.localize.term("chooseYear");else{let m=Math.floor(e.getFullYear()/12)*12;n=`${m} \u2013 ${m+11}`,a=this.localize.term("chooseDecade")}let s=!!i&&this.isPageOutsideRange("previous",e,i,r),c=!!r&&this.isPageOutsideRange("next",e,i,r),d=this.view==="days"?this.localize.term("previousMonth")||"Previous month":this.view==="months"?this.localize.term("previousYear")||"Previous year":this.localize.term("previousDecade")||"Previous decade",h=this.view==="days"?this.localize.term("nextMonth")||"Next month":this.view==="months"?this.localize.term("nextYear")||"Next year":this.localize.term("nextDecade")||"Next decade";return b`
      <div part="header">
        <button
          type="button"
          part="previous"
          aria-label=${d}
          ?disabled=${s||this.disabled}
          @click=${this.handlePrevious}
        >
          <slot name="previous-icon">
            <wa-icon name="chevron-left" library="system" variant="solid"></wa-icon>
          </slot>
        </button>

        <button
          type="button"
          part="title"
          aria-live="polite"
          aria-label=${a}
          ?disabled=${this.disabled}
          @click=${this.handleTitleClick}
          @keydown=${this.handleTitleKeydown}
        >
          ${n}
        </button>

        <button
          type="button"
          part="next"
          aria-label=${h}
          ?disabled=${c||this.disabled}
          @click=${this.handleNext}
        >
          <slot name="next-icon">
            <wa-icon name="chevron-right" library="system" variant="solid"></wa-icon>
          </slot>
        </button>
      </div>
    `}renderDaysView(e,t,o){let i=this.resolvedMonthCount();if(this.didSSR&&!this.hasUpdated){let r=this.shadowRoot?.querySelector?.("[part~='months']")?.getAttribute("data-month-count");r&&(i=this.resolvedMonthCount(Number(r)))}return b`
      <div part="months" data-month-count="${i}">
        ${Array.from({length:i},(r,n)=>this.renderMonth(hi(e,n),t,o,i>1))}
      </div>
    `}renderMonth(e,t,o,i){let r=this.resolvedFirstDay(),n=new Set(this.resolvedWeekendDays()),a=new Date(e.getFullYear(),e.getMonth(),1),s=(a.getDay()-r+7)%7,c=at(a,-s),d=42,h=[];for(let w=0;w<d/7;w++){let x=[];for(let y=0;y<7;y++)x.push(at(c,w*7+y));h.push(x)}let m=new Intl.DateTimeFormat(o,{weekday:this.weekdayFormat}),p=[];for(let w=0;w<7;w++){let x=at(c,w);p.push({label:m.format(x),long:new Intl.DateTimeFormat(o,{weekday:"long"}).format(x)})}let f=new Intl.DateTimeFormat(o,{month:"long",year:"numeric"}),g=this.readonly?`${f.format(e)}, ${this.localize.term("readonly")}`:f.format(e);return b`
      <div part="month" data-first-day="${r}" data-weekend-days="${[...n.values()].join(" ")}">
        ${i?b`<div part="month-label">${f.format(e)}</div>`:k}
        <table part="grid" role="grid" aria-label=${g} aria-readonly=${this.readonly?"true":"false"}>
          <thead>
            <tr part="weekdays">
              ${this.withWeekNumbers?b`<th part="weeknumbers" scope="col" aria-label="Week"></th>`:k}
              ${p.map(w=>b`<th part="weekday" scope="col" aria-label=${w.long}>${w.label}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${h.map(w=>this.renderWeek(w,e,t,n,o))}
          </tbody>
        </table>
      </div>
    `}renderWeek(e,t,o,i,r){let n=this.withWeekNumbers?this.computeIsoWeek(e):null;return b`
      <tr role="row">
        ${n!==null?b`<th part="weeknumber" scope="row">${n}</th>`:k}
        ${e.map(a=>this.renderDay(a,t,o,i,r))}
      </tr>
    `}computeIsoWeek(e){let t=e.find(a=>a.getDay()===4)??e[3],o=new Date(t.getFullYear(),t.getMonth(),t.getDate()),i=new Date(o.getFullYear(),0,4),r=(i.getDay()+6)%7;i.setDate(i.getDate()-r+3);let n=(o.getDay()+6)%7;return o.setDate(o.getDate()-n+3),1+Math.round((o.getTime()-i.getTime())/(7*864e5))}renderDay(e,t,o,i,r){let n=!jm(e,t),a=n&&!this.withOutsideDays,s=we(e),c=this.resolvedToday(),d=Mt(e,c),h=o(e),m=this.resolvedRovingFocus(),p=Mt(e,m)&&!n,f=this.computeSelectionState(e),g=this.isOutOfReach(e),w=`day-${s}`,x={"data-in-range":f.inner||f.preview||f.start||f.end?"":void 0,"data-range-start":f.start?"":void 0,"data-range-end":f.end?"":void 0};if(a)return b`<td role="gridcell" aria-hidden="true"><span part="day-placeholder"></span></td>`;let y=["day"];return d&&y.push("day-today"),n&&y.push("day-outside"),i.has(e.getDay())&&y.push("day-weekend"),h&&y.push("day-disabled"),f.selected&&y.push("day-selected"),f.start&&y.push("day-range-start"),f.end&&y.push("day-range-end"),f.inner&&y.push("day-range-inner"),f.preview&&y.push("day-range-preview"),b`
      <td
        role="gridcell"
        aria-selected=${f.selected?"true":"false"}
        data-in-range=${z(x["data-in-range"])}
        data-range-start=${z(x["data-range-start"])}
        data-range-end=${z(x["data-range-end"])}
      >
        <button
          type="button"
          part=${y.join(" ")}
          data-date=${s}
          data-day-of-week=${["sun","mon","tue","wed","thu","fri","sat"][e.getDay()]}
          ?data-today=${d}
          ?data-outside=${n}
          ?data-weekend=${i.has(e.getDay())}
          ?data-disabled=${h}
          ?data-selected=${f.selected}
          ?data-range-start=${f.start}
          ?data-range-end=${f.end}
          ?data-range-inner=${f.inner}
          ?data-range-preview=${f.preview}
          ?data-out-of-reach=${g}
          aria-label=${this.dayAriaLabel(e,f,d)}
          aria-disabled=${h?"true":"false"}
          aria-current=${z(d?"date":void 0)}
          tabindex=${p?0:-1}
          @click=${()=>this.handleDayClick(e,h)}
          @mouseenter=${()=>this.handleDayHover(e)}
          @keydown=${C=>this.handleDayKeydown(C,e,h)}
        >
          <span part="day-label">
            <slot name=${w}>${this.renderDayFallback(e)}</slot>
          </span>
        </button>
      </td>
    `}dayAriaLabel(e,t,o){let i=this.resolvedLocale(),r=[new Intl.DateTimeFormat(i,{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(e)];return o&&r.push(this.localize.term("today")),this.mode==="single"&&t.selected&&r.push(this.localize.term("selected")),r.join(", ")}renderDayFallback(e){if(this.dayContent){let t=this.dayContent(e);if(t!=null)return typeof t=="string"?Xt(t):t}return e.getDate()}computeSelectionState(e){if(this.mode==="single"){let a=q(this._value);return{selected:!!a&&Mt(a,e),start:!1,end:!1,inner:!1,preview:!1}}if(this.rangeAnchor){let a=this.hoverDate??this.rangeAnchor,s=this.rangeAnchor,c=s.getTime()<=a.getTime()?s:a,d=s.getTime()<=a.getTime()?a:s,h=Mt(c,e),m=Mt(d,e),p=e.getTime()>c.getTime()&&e.getTime()<d.getTime();return{selected:h||m,start:h,end:m,inner:!1,preview:p}}let{from:t,to:o}=$t(this._value),i=!!t&&Mt(t,e),r=!!o&&Mt(o,e),n=!!t&&!!o&&e.getTime()>t.getTime()&&e.getTime()<o.getTime();return{selected:i||r,start:i,end:r,inner:n,preview:!1}}selectedMonthForView(e){let t=this.selectedDateForHighlight();return t&&t.getFullYear()===e?t.getMonth():null}selectedYearForView(){let e=this.selectedDateForHighlight();return e?e.getFullYear():null}selectedDateForHighlight(){return this.mode==="single"?q(this._value):$t(this._value).from}renderMonthsView(e,t,o){let i=e.getFullYear(),r=new Intl.DateTimeFormat(o,{month:"short"}),n=new Intl.DateTimeFormat(o,{month:"long",year:"numeric"}),a=new Intl.DateTimeFormat(o,{year:"numeric"}).format(e),s=this.resolvedFocusedMonth(),c=this.selectedMonthForView(i),d=this.resolvedToday(),h=d.getFullYear()===i?d.getMonth():-1,m=p=>{let f=new Date(i,p,1),g=this.isMonthFullyDisabled(i,p,t),w=c===p,x=s===p,y=h===p,C=["view-item"];return y&&C.push("view-item-today"),w&&C.push("view-item-selected"),g&&C.push("view-item-disabled"),b`
        <div role="gridcell" part="view-cell" aria-selected=${w?"true":"false"}>
          <button
            type="button"
            part=${C.join(" ")}
            data-month=${p}
            ?data-disabled=${g}
            ?data-selected=${w}
            ?data-today=${y}
            aria-disabled=${g?"true":"false"}
            aria-current=${z(y?"date":void 0)}
            aria-label=${n.format(f)}
            tabindex=${x?0:-1}
            @click=${()=>this.handleMonthPick(i,p,g)}
            @keydown=${L=>this.handleMonthKeydown(L,i,p,g)}
          >
            ${r.format(f)}
          </button>
        </div>
      `};return b`
      <div part="view-grid" role="grid" aria-label="${this.localize.term("chooseMonth")}, ${a}">
        ${this.renderViewRows(12,m)}
      </div>
    `}renderViewRows(e,t){let i=[];for(let r=0;r<e;r+=3){let n=Array.from({length:Math.min(3,e-r)},(a,s)=>t(r+s));i.push(b`<div part="view-row" role="row">${n}</div>`)}return i}renderYearsView(e,t){let o=Math.floor(e.getFullYear()/12)*12,i=o+11,r=this.resolvedFocusedYear(),n=this.selectedYearForView(),a=this.resolvedToday().getFullYear(),s=c=>{let d=o+c,h=this.isYearFullyDisabled(d,t),m=n===d,p=r===d,f=a===d,g=["view-item"];return f&&g.push("view-item-today"),m&&g.push("view-item-selected"),h&&g.push("view-item-disabled"),b`
        <div role="gridcell" part="view-cell" aria-selected=${m?"true":"false"}>
          <button
            type="button"
            part=${g.join(" ")}
            data-year=${d}
            ?data-disabled=${h}
            ?data-selected=${m}
            ?data-today=${f}
            aria-disabled=${h?"true":"false"}
            aria-current=${z(f?"date":void 0)}
            aria-label=${String(d)}
            tabindex=${p?0:-1}
            @click=${()=>this.handleYearPick(d,h)}
            @keydown=${w=>this.handleYearKeydown(w,d,h)}
          >
            ${d}
          </button>
        </div>
      `};return b`
      <div
        part="view-grid"
        role="grid"
        aria-label="${this.localize.term("chooseYear")}, ${o}–${i}"
      >
        ${this.renderViewRows(12,s)}
      </div>
    `}handleMonthKeydown(e,t,o,i){if(this.disabled||!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","PageUp","PageDown","Enter"," ","Escape"].includes(e.key))return;if(e.preventDefault(),e.key==="Escape"){this.setView("days"),this.queueFocus('[part~="day"][tabindex="0"]');return}if(e.key==="Enter"||e.key===" "){this.handleMonthPick(t,o,i);return}let n=this.localize.dir()==="rtl",a=t,s=o;switch(e.key){case"ArrowLeft":s=o+(n?1:-1),s<0&&(s=0),s>11&&(s=11);break;case"ArrowRight":s=o+(n?-1:1),s<0&&(s=0),s>11&&(s=11);break;case"ArrowUp":s=Math.max(0,o-3);break;case"ArrowDown":s=Math.min(11,o+3);break;case"Home":{let c=Math.floor(o/3)*3;s=e.ctrlKey||e.metaKey?0:c;break}case"End":{let c=Math.floor(o/3)*3+2;s=e.ctrlKey||e.metaKey?11:c;break}case"PageUp":a=t-1;break;case"PageDown":a=t+1;break}a!==t&&this.setViewAnchor(new Date(a,o,1)),this.focusedMonth=s,this.queueFocus(`[part~="view-item"][data-month="${s}"]`)}handleYearKeydown(e,t,o){if(this.disabled||!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","PageUp","PageDown","Enter"," ","Escape"].includes(e.key))return;if(e.preventDefault(),e.key==="Escape"){this.setView("months"),this.queueFocus('[part~="view-item"][tabindex="0"]');return}if(e.key==="Enter"||e.key===" "){this.handleYearPick(t,o);return}let r=this.localize.dir()==="rtl",n=Math.floor(t/12)*12,a=t-n,s=t;switch(e.key){case"ArrowLeft":s=t+(r?1:-1);break;case"ArrowRight":s=t+(r?-1:1);break;case"ArrowUp":s=t-3;break;case"ArrowDown":s=t+3;break;case"Home":{let d=n+Math.floor(a/3)*3;s=e.ctrlKey||e.metaKey?n:d;break}case"End":{let d=n+Math.floor(a/3)*3+2;s=e.ctrlKey||e.metaKey?n+11:d;break}case"PageUp":s=t-12;break;case"PageDown":s=t+12;break}if(Math.floor(s/12)*12!==n){let d=this.resolvedViewAnchor();this.setViewAnchor(new Date(s,d.getMonth(),1))}this.focusedYear=s,this.queueFocus(`[part~="view-item"][data-year="${s}"]`)}queueFocus(e){this.updateComplete.then(()=>{this.base.querySelector(e)?.focus()})}isMonthFullyDisabled(e,t,o){let i=new Date(e,t,1),r=new Date(e,t+1,0);return!this.anyEnabledInRange(i,r,o)}isYearFullyDisabled(e,t){let o=new Date(e,0,1),i=new Date(e,11,31);return!this.anyEnabledInRange(o,i,t)}anyEnabledInRange(e,t,o){let i=new Date(e.getFullYear(),e.getMonth(),e.getDate());for(;i.getTime()<=t.getTime();){if(!o(i))return!0;i.setDate(i.getDate()+1)}return!1}handleMonthPick(e,t,o){if(o||this.disabled)return;this.setViewAnchor(new Date(e,t,1));let i=this.resolvedFocusedDate().getDate(),r=Math.min(i,uo(e,t));this.focusedDate=we(new Date(e,t,r)),this.setView("days"),this.queueFocus('[part~="day"][tabindex="0"]')}handleYearPick(e,t){if(t||this.disabled)return;let o=this.resolvedFocusedDate(),i=o.getMonth();this.setViewAnchor(new Date(e,i,1));let r=Math.min(o.getDate(),uo(e,i));this.focusedDate=we(new Date(e,i,r)),this.setView("months"),this.queueFocus('[part~="view-item"][tabindex="0"]')}};ee.css=[ff,oe];l([_('[part~="base"]')],ee.prototype,"base",2);l([u({reflect:!0})],ee.prototype,"mode",2);l([u({reflect:!0})],ee.prototype,"value",1);l([u({reflect:!0})],ee.prototype,"min",2);l([u({reflect:!0})],ee.prototype,"max",2);l([u({reflect:!0})],ee.prototype,"today",2);l([u({attribute:"focused-date",reflect:!0})],ee.prototype,"focusedDate",2);l([u({reflect:!0})],ee.prototype,"view",2);l([u({type:Number,reflect:!0})],ee.prototype,"months",2);l([u({attribute:"page-by",reflect:!0})],ee.prototype,"pageBy",2);l([u({attribute:"first-day-of-week",reflect:!0})],ee.prototype,"firstDayOfWeek",2);l([u({attribute:"with-outside-days",type:Boolean,reflect:!0})],ee.prototype,"withOutsideDays",2);l([u({attribute:"with-week-numbers",type:Boolean,reflect:!0})],ee.prototype,"withWeekNumbers",2);l([u({attribute:"weekday-format",reflect:!0})],ee.prototype,"weekdayFormat",2);l([u({type:Boolean,reflect:!0})],ee.prototype,"disabled",2);l([u({type:Boolean,reflect:!0})],ee.prototype,"readonly",2);l([u({attribute:"disabled-dates"})],ee.prototype,"disabledDates",1);l([u({attribute:"disabled-days-of-week"})],ee.prototype,"disabledDaysOfWeek",2);l([u({attribute:"disable-past",type:Boolean,reflect:!0})],ee.prototype,"disablePast",2);l([u({attribute:"disable-future",type:Boolean,reflect:!0})],ee.prototype,"disableFuture",2);l([u({attribute:"min-range",type:Number,reflect:!0})],ee.prototype,"minRange",2);l([u({attribute:"max-range",type:Number,reflect:!0})],ee.prototype,"maxRange",2);l([u({reflect:!0})],ee.prototype,"size",2);l([S("size")],ee.prototype,"handleSizeChange",1);l([u({reflect:!0})],ee.prototype,"locale",2);l([u({attribute:!1})],ee.prototype,"isDateDisabled",2);l([u({attribute:!1})],ee.prototype,"dayContent",2);l([I()],ee.prototype,"rangeAnchor",2);l([I()],ee.prototype,"hoverDate",2);l([I()],ee.prototype,"viewAnchor",2);l([I()],ee.prototype,"focusedMonth",2);l([I()],ee.prototype,"focusedYear",2);l([I()],ee.prototype,"liveAnnouncement",2);l([S("mode")],ee.prototype,"handleModeChange",1);ee=l([F("wa-date-picker")],ee);var gf=class extends Event{constructor(e){super("wa-after-collapse",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var bf=class extends Event{constructor(e){super("wa-after-expand",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var wf=class extends Event{constructor(e){super("wa-collapse",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=e}};var vf=class extends Event{constructor(e){super("wa-expand",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=e}};var yf=E`
  @layer wa-component {
    :host {
      display: block;
      border: var(--wa-panel-border-width) var(--wa-panel-border-style) var(--wa-color-surface-border);
      border-radius: var(--wa-panel-border-radius);
      overflow: hidden;
    }

    /* Appearance modifiers */
    :host([appearance='outlined']) {
      background-color: var(--wa-color-surface-default);
      border-color: var(--wa-color-surface-border);
    }

    :host([appearance='filled']) {
      border-color: transparent;
    }

    :host([appearance='filled-outlined']) {
      background-color: var(--wa-color-neutral-fill-quiet);
      border-color: var(--wa-color-neutral-border-quiet);
    }

    :host([appearance='plain']) {
      background-color: transparent;
      border-color: transparent;
      border-radius: 0;
    }
  }
`;var ut=class extends V{constructor(){super(...arguments),this.mode="multiple",this.iconPlacement="end",this.headingLevel="3",this.appearance="outlined"}getAllItems(){return this.defaultSlot.assignedElements({flatten:!0}).filter(e=>e.tagName.toLowerCase()==="wa-accordion-item")}getFocusableItems(){return this.getAllItems().filter(e=>!e.disabled)}ownsItem(e){return e.closest("wa-accordion")===this}initRovingTabIndex(){this.getFocusableItems().forEach((e,t)=>{e.isTabbable=t===0})}handleSlotChange(){if(this.didSSR){let e=[];if(this.getAllItems().forEach(t=>{t.didSSR&&!t.hasUpdated&&e.push(t.updateComplete)}),e.length>0){Promise.allSettled(e).then(()=>{this.handleSlotChange()});return}}this.syncIconPlacement(),this.syncHeadingLevel(),this.syncAppearance(),this.initRovingTabIndex()}handleFocusIn(e){let t=this.getFocusableItems(),i=e.composedPath().find(n=>n instanceof Element&&n.tagName.toLowerCase()==="wa-accordion-item");if(!i||!this.ownsItem(i))return;let r=t.find(n=>n===i);r&&t.forEach(n=>n.isTabbable=n===r)}handleKeyDown(e){let t=this.getFocusableItems();if(!t.length)return;let i=e.composedPath().find(a=>a instanceof Element&&a.tagName.toLowerCase()==="wa-accordion-item");if(!i||!this.ownsItem(i))return;let r=t.findIndex(a=>a.isTabbable),n=r;switch(e.key){case"ArrowDown":e.preventDefault(),n=(r+1)%t.length;break;case"ArrowUp":e.preventDefault(),n=(r-1+t.length)%t.length;break;case"Home":e.preventDefault(),n=0;break;case"End":e.preventDefault(),n=t.length-1;break;default:return}t.forEach((a,s)=>a.isTabbable=s===n),t[n].focus()}syncIconPlacement(){this.getAllItems().forEach(e=>e.iconPlacement=this.iconPlacement)}syncHeadingLevel(){this.getAllItems().forEach(e=>e.headingLevel=this.headingLevel)}syncAppearance(){this.getAllItems().forEach(e=>e.appearance=this.appearance)}async handleItemTrigger(e){let{item:t}=e.detail;if(this.ownsItem(t)&&(e.stopPropagation(),!t.disabled))if(t.expanded){if(this.mode==="single")return;let o=new wf({item:t});if(this.dispatchEvent(o),o.defaultPrevented)return;await t.collapse(),this.dispatchEvent(new gf({item:t}))}else{(this.mode==="single"||this.mode==="single-collapsible")&&this.getAllItems().filter(i=>i!==t&&i.expanded).forEach(i=>i.collapse());let o=new vf({item:t});if(this.dispatchEvent(o),o.defaultPrevented)return;await t.expand(),this.dispatchEvent(new bf({item:t}))}}expandAll(){this.mode==="single"||this.mode==="single-collapsible"||this.getAllItems().filter(e=>!e.disabled&&!e.expanded).forEach(e=>e.expand())}collapseAll(){this.getAllItems().filter(e=>e.expanded).forEach(e=>e.collapse())}render(){return b`
      <slot
        @slotchange=${this.handleSlotChange}
        @wa-accordion-item-trigger=${this.handleItemTrigger}
        @focusin=${this.handleFocusIn}
        @keydown=${this.handleKeyDown}
      ></slot>
    `}};ut.css=yf;l([_("slot")],ut.prototype,"defaultSlot",2);l([u({reflect:!0})],ut.prototype,"mode",2);l([u({attribute:"icon-placement",reflect:!0})],ut.prototype,"iconPlacement",2);l([u({attribute:"heading-level",reflect:!0})],ut.prototype,"headingLevel",2);l([u({reflect:!0})],ut.prototype,"appearance",2);l([S("iconPlacement",{waitUntilFirstUpdate:!0})],ut.prototype,"syncIconPlacement",1);l([S("headingLevel",{waitUntilFirstUpdate:!0})],ut.prototype,"syncHeadingLevel",1);l([S("appearance",{waitUntilFirstUpdate:!0})],ut.prototype,"syncAppearance",1);ut=l([F("wa-accordion")],ut);var xf=class extends Event{constructor(){super("wa-accordion-item-expanded",{bubbles:!1,cancelable:!1,composed:!1})}};var Cf=class extends Event{constructor(e){super("wa-accordion-item-trigger",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Sf=class extends Event{constructor(){super("wa-accordion-item-collapsed",{bubbles:!1,cancelable:!1,composed:!1})}};var _f=E`
  @layer wa-component {
    :host {
      --spacing: var(--wa-space-m);
      --show-duration: var(--wa-transition-normal);
      --hide-duration: var(--wa-transition-normal);
      --easing: var(--wa-transition-easing);

      display: block;
    }

    :host(:not(:first-child)) {
      border-top: var(--wa-panel-border-width) var(--wa-panel-border-style) var(--wa-color-surface-border);
    }

    :host([appearance='filled']) {
      background-color: var(--wa-color-neutral-fill-quiet);
    }

    :host([appearance='filled']:not(:first-child)) {
      margin-block-start: var(--wa-panel-border-width);
      border-top: none;
    }

    [part~='heading'] {
      margin: 0;
      font: inherit;
    }

    [part~='button'] {
      display: flex;
      align-items: center;
      gap: var(--spacing);
      padding: var(--spacing);
      width: 100%;
      background: none;
      border: none;
      cursor: pointer;
      text-align: start;
      color: var(--wa-color-text-normal);
      font: inherit;
      font-weight: var(--wa-font-weight-semibold);

      &:focus {
        outline: none;
      }

      &:focus-visible {
        outline: var(--wa-focus-ring);
        /* Inset by the full ring width + offset so the parent's overflow:hidden doesn't clip it */
        outline-offset: calc(0px - var(--wa-focus-ring-width) - var(--wa-focus-ring-offset));
      }
    }

    /* Icon at end (default) */
    :host([icon-placement='end']) [part~='button'] {
      justify-content: space-between;
    }

    /* Icon at start */
    :host([icon-placement='start']) [part~='button'] {
      flex-direction: row-reverse;
      justify-content: flex-end;
    }

    :host([disabled]) {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :host([disabled]) [part~='button'] {
      cursor: not-allowed;
      pointer-events: none;
    }

    :host(:first-child) [part~='button'] {
      border-top-left-radius: var(--wa-panel-border-radius);
      border-top-right-radius: var(--wa-panel-border-radius);
    }

    :host(:last-child:not([expanded])) [part~='button'] {
      border-bottom-left-radius: var(--wa-panel-border-radius);
      border-bottom-right-radius: var(--wa-panel-border-radius);
    }

    [part~='icon'] {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      color: var(--wa-color-text-quiet);
      transition: rotate var(--hide-duration) var(--easing);
    }

    :host([expanded]) [part~='icon'] {
      rotate: 90deg;
      transition-duration: var(--show-duration);
    }

    :host([expanded]:dir(rtl)) [part~='icon'] {
      rotate: -90deg;
    }

    .body {
      overflow: hidden;
      color: var(--wa-color-text-quiet);
    }

    :host([expanded]) .body:not(.animating) {
      overflow: visible;
    }

    .content {
      display: block;
      padding: 0 var(--spacing) var(--spacing);
    }
  }
`;var Je=class extends V{constructor(){super(...arguments),this.animationGeneration=0,this.localize=new N(this),this.isAnimating=!1,this.label="",this.expanded=!1,this.disabled=!1,this.headingLevel="3",this.isTabbable=!0,this.iconPlacement="end",this.appearance="outlined"}firstUpdated(e){super.firstUpdated(e),this.body.style.height=this.expanded?"auto":"0"}updated(){this.customStates.set("animating",this.isAnimating)}handleTriggerClick(){this.disabled||this.dispatchEvent(new Cf({item:this}))}handleTriggerKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.handleTriggerClick())}async handleExpandedChange(){this.animationGeneration++;let e=this.animationGeneration;if(this.expanded){this.isAnimating=!0;let t=qo(getComputedStyle(this.body).getPropertyValue("--show-duration")||"200ms"),o=getComputedStyle(this.body).getPropertyValue("--easing")||"ease";if(await No(this.body,[{height:"0",opacity:"0"},{height:`${this.body.scrollHeight}px`,opacity:"1"}],{duration:t,easing:o}),this.animationGeneration!==e)return;this.body.style.height="auto",this.isAnimating=!1,this.dispatchEvent(new xf)}else{this.isAnimating=!0;let t=qo(getComputedStyle(this.body).getPropertyValue("--hide-duration")||"200ms"),o=getComputedStyle(this.body).getPropertyValue("--easing")||"ease";if(await No(this.body,[{height:`${this.body.scrollHeight}px`,opacity:"1"},{height:"0",opacity:"0"}],{duration:t,easing:o}),this.animationGeneration!==e)return;this.body.style.height="0",this.isAnimating=!1,this.dispatchEvent(new Sf)}}async expand(){if(!(this.expanded||this.disabled))return this.expanded=!0,Ee(this,"wa-accordion-item-expanded")}async collapse(){if(!(!this.expanded||this.disabled))return this.expanded=!1,Ee(this,"wa-accordion-item-collapsed")}async toggle(){return this.expanded?this.collapse():this.expand()}focus(e){this.triggerButton?.focus(e)}renderHeadingWrapper(e){let t=parseInt(this.headingLevel,10);switch(t>=1&&t<=6?t:3){case 1:return b`<h1 part="heading">${e}</h1>`;case 2:return b`<h2 part="heading">${e}</h2>`;case 4:return b`<h4 part="heading">${e}</h4>`;case 5:return b`<h5 part="heading">${e}</h5>`;case 6:return b`<h6 part="heading">${e}</h6>`;default:return b`<h3 part="heading">${e}</h3>`}}render(){let e=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl",t=b`
      <button
        part="button"
        type="button"
        id="trigger"
        aria-expanded=${this.expanded?"true":"false"}
        aria-controls="panel"
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled||!this.isTabbable?"-1":"0"}
        @click=${this.handleTriggerClick}
        @keydown=${this.handleTriggerKeyDown}
      >
        <slot name="label" part="label">${this.label}</slot>
        <span part="icon">
          <slot name="icon">
            <wa-icon library="system" variant="solid" name=${e?"chevron-left":"chevron-right"}></wa-icon>
          </slot>
        </span>
      </button>
    `;return b`
      <div part="base accordion-item">
        ${this.headingLevel==="none"?t:this.renderHeadingWrapper(t)}
        <div
          part="panel"
          id="panel"
          class=${T({body:!0,animating:this.isAnimating})}
          role="region"
          aria-labelledby="trigger"
        >
          <slot part="content" class="content"></slot>
        </div>
      </div>
    `}};Je.css=_f;l([_(".body")],Je.prototype,"body",2);l([_('[part~="button"]')],Je.prototype,"triggerButton",2);l([I()],Je.prototype,"isAnimating",2);l([u()],Je.prototype,"label",2);l([u({type:Boolean,reflect:!0})],Je.prototype,"expanded",2);l([u({type:Boolean,reflect:!0})],Je.prototype,"disabled",2);l([u({attribute:"heading-level",reflect:!0})],Je.prototype,"headingLevel",2);l([u({type:Boolean,attribute:!1})],Je.prototype,"isTabbable",2);l([u({attribute:"icon-placement",reflect:!0})],Je.prototype,"iconPlacement",2);l([u({reflect:!0})],Je.prototype,"appearance",2);l([S("expanded",{waitUntilFirstUpdate:!0})],Je.prototype,"handleExpandedChange",1);Je=l([F("wa-accordion-item")],Je);var zW=new MutationObserver(e=>{for(let{addedNodes:t}of e)for(let o of t)o.nodeType===Node.ELEMENT_NODE&&kf(o)});async function kf(e){let t=e instanceof Element?e.tagName.toLowerCase():"",o=t?.startsWith("wa-"),i=[...e.querySelectorAll(":not(:defined)")].map(c=>c.tagName.toLowerCase()).filter(c=>c.startsWith("wa-"));o&&!customElements.get(t)&&i.push(t);let r=e.querySelectorAll("[data-wa-preload]"),n=e instanceof Element&&e.hasAttribute("data-wa-preload")?[e,...r]:r;for(let c of n)i.push(...c.getAttribute("data-wa-preload").split(/\s+/).filter(d=>d.startsWith("wa-")));let a=[...new Set(i)],s=await Promise.allSettled(a.map(c=>Aw(c)));for(let c of s)c.status==="rejected"&&console.warn(c.reason);await new Promise(requestAnimationFrame),e.dispatchEvent(new CustomEvent("wa-discovery-complete",{bubbles:!1,cancelable:!1,composed:!0}))}function Aw(e){if(customElements.get(e))return Promise.resolve();let t=e.replace(/^wa-/i,""),o=Nn(`components/${t}/${t}.js`);return new Promise((i,r)=>{import(o).then(()=>i()).catch(()=>r(new Error(`Unable to autoload <${e}> from ${o}`)))})}br("ion",{resolver:e=>`https://cdn.jsdelivr.net/npm/ionicons@5.1.2/dist/ionicons/svg/${e}.svg`,mutator:e=>{e.setAttribute("fill","currentColor"),e.setAttribute("stroke","currentColor"),[...e.querySelectorAll(".ionicon-fill-none")].map(t=>t.setAttribute("fill","none")),[...e.querySelectorAll(".ionicon-stroke-width")].map(t=>t.setAttribute("stroke-width","32px"))}});br("remix",{resolver:e=>{let t=e.match(/^(.*?)\/(.*?)?$/);return t[1]=t[1].charAt(0).toUpperCase()+t[1].slice(1),`https://cdn.jsdelivr.net/npm/remixicon@4.6.0/icons/${t[1]}/${t[2]}.svg`},mutator:e=>e.setAttribute("fill","currentColor")});export{E as a,b,k as c,Kt as d,z as e,W as f,B as g};
/*! Bundled license information:

@awesome.me/webawesome-pro/dist/chunks/chunk.WKDY3BS6.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.NSKMM5IJ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.G43BFAJO.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.7VGCIHDG.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.SPMLOO35.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.NAEBLGKB.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.BDIIJDR2.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.TW3VXPTP.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.XVEB6SVR.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.HQKLFGS3.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.OCXPLMDW.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.ADZNIDEZ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.IXFCHTNQ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.HOKX4ZNE.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.H5UCAMJQ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.5FXMXJDZ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.ZRLIH7NU.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.U7CMGUQU.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.XJWIHWA3.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.XFHYDY5T.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.HWO5CYJM.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.E3UENDF5.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.S7GU24DN.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.GB3TYL3J.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.ECSOHKJN.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.7TN7YXGH.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.ITHNGWNG.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.MFAIEGTH.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.XASHEDKI.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.UOGHRTLZ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.6FHKPFZ2.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.ESI5P3UH.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.WOJAFYXB.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.U6B4Y4O7.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.KNQBIPHQ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.T4BDDOW4.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.R7MGR6UV.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.64HETXJV.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.3U2ABNE4.js:
@awesome.me/webawesome-pro/dist/components/page/page.js:
@awesome.me/webawesome-pro/dist/components/button/button.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.ND5IN7MJ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.XEV4YER7.js:
@awesome.me/webawesome-pro/dist/components/button-group/button-group.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.2D3ERBJH.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.YJJNN2TQ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.XEXW3Z4R.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.CZQV5LGW.js:
@awesome.me/webawesome-pro/dist/components/number-input/number-input.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.VRT3QD64.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.MWNUUDQJ.js:
@awesome.me/webawesome-pro/dist/components/card/card.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.QZLTFEB2.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.SLVLKNDZ.js:
@awesome.me/webawesome-pro/dist/components/callout/callout.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.XDKUXEMR.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.X73BGBMJ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.2HGWIBER.js:
@awesome.me/webawesome-pro/dist/components/checkbox/checkbox.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.5A7MB27P.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.572W6XBT.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.KPXPJOJ7.js:
@awesome.me/webawesome-pro/dist/components/details/details.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.SNSRGDVZ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.FU735BUR.js:
@awesome.me/webawesome-pro/dist/components/dialog/dialog.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.2QTEMNXU.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.R3KSCCCR.js:
@awesome.me/webawesome-pro/dist/components/divider/divider.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.Y3TFP662.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.XIQTTEGO.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.3KILWJPC.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.4SJJHQXE.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.GA7QPJQ4.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.ZSXDEHHC.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.QC4SEWKT.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.HQLDMDWB.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.KE3P7GQ6.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.2YFBUTFX.js:
@awesome.me/webawesome-pro/dist/components/dropdown/dropdown.js:
@awesome.me/webawesome-pro/dist/components/dropdown-item/dropdown-item.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.6WKRMMNM.js:
@awesome.me/webawesome-pro/dist/components/format-date/format-date.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.PEREL67M.js:
@awesome.me/webawesome-pro/dist/components/format-number/format-number.js:
@awesome.me/webawesome-pro/dist/components/icon/icon.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.KLUNXUJW.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.V6242M3W.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.3UR7XKQK.js:
@awesome.me/webawesome-pro/dist/components/input/input.js:
@awesome.me/webawesome-pro/dist/components/popup/popup.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.4VU3CRUY.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.RIFSNB2S.js:
@awesome.me/webawesome-pro/dist/components/radio/radio.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.34OXEDTL.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.UREKAEDM.js:
@awesome.me/webawesome-pro/dist/components/radio-group/radio-group.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.NVYORNDJ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.GRTNR5G3.js:
@awesome.me/webawesome-pro/dist/components/scroller/scroller.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.PJSKMRWI.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.5CSFKC23.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.M2YXIHNH.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.XGZ6HLMO.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.2CTTMJFH.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.FC4XZEKF.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.TULBD6HN.js:
@awesome.me/webawesome-pro/dist/components/select/select.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.WFODKN2M.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.N6EHUO3R.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.HYTAIWXE.js:
@awesome.me/webawesome-pro/dist/components/combobox/combobox.js:
@awesome.me/webawesome-pro/dist/components/option/option.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.YKA2SNX2.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.JVXCFJOV.js:
@awesome.me/webawesome-pro/dist/components/tooltip/tooltip.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.NSXAMHEV.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.6HYO7E4F.js:
@awesome.me/webawesome-pro/dist/components/switch/switch.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.UQS3OLCC.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.A65DYQ7U.js:
@awesome.me/webawesome-pro/dist/components/badge/badge.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.TLMI2LBT.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.GGYLVOKD.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.65TQYUUX.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.JXKU6VLG.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.6GL42UHU.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.IOXIO4OS.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.RAHK3WM5.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.HJPXIL55.js:
@awesome.me/webawesome-pro/dist/components/tab-group/tab-group.js:
@awesome.me/webawesome-pro/dist/components/tab/tab.js:
@awesome.me/webawesome-pro/dist/components/tab-panel/tab-panel.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.6ZLHC566.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.YIEXWZ6G.js:
@awesome.me/webawesome-pro/dist/components/textarea/textarea.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.H5NKZCQW.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.FTQL6MVS.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.L7UY2NHQ.js:
@awesome.me/webawesome-pro/dist/components/slider/slider.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.455GWQR6.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.IH4MZ3VJ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.N7VNMWU5.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.HVMXE2RX.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.JK4TQUZJ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.ALF4VCKI.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.UHBMJLON.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.4K7J7YQ2.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.I3RXBDXD.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.6HEL2B57.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.JW4RCUPC.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.MNFPEYIL.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.URVB4D5Y.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.YZ7B5BWF.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.PCPZO5YO.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.L5NRQ45W.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.OHTGMDO6.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.YILGMYWL.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.GHEYBJRO.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.WSQOVIHE.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.THJG7U73.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.QGPIOOSK.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.ABTEE2GJ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.OOEVED5Q.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.2BAIA3DQ.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.4UQGLNWM.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.AHK46OHH.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.4RAXYMTU.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.4U5URNF6.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.GE3JDILO.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.5WT2M45B.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.JCV4S65C.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.F4ZCPI3U.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.5Q3C7XRF.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.2W5ICYYR.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.T2PA53U2.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.QNBIIK3Q.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.W3U4GULP.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.YRRAFIFT.js:
@awesome.me/webawesome-pro/dist/components/data-grid/data-grid.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.JKAIKVYF.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.626A6PZB.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.SF3DBTGM.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.HOAMYZ22.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.ZZ4LI6DX.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.OMVNS6JM.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.47HBOVIB.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.EV63AK6U.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.KYIDN5J2.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.7M7T6YPR.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.3BJXF5V7.js:
@awesome.me/webawesome-pro/dist/components/accordion/accordion.js:
@awesome.me/webawesome-pro/dist/components/accordion-item/accordion-item.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.ZLRJC3XT.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.ZPFMW2MO.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.B33XGFTV.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.CTR7ORUU.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.YOU5ZTWW.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.62JD4PXP.js:
@awesome.me/webawesome-pro/dist/chunks/chunk.G2VK2FBZ.js:
@awesome.me/webawesome-pro/dist/webawesome.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

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
lit-html/directives/repeat.js:
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

@lit/reactive-element/decorators/query-assigned-elements.js:
lit-html/directives/when.js:
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
//# sourceMappingURL=chunk-N2YU2LXN.mjs.map
