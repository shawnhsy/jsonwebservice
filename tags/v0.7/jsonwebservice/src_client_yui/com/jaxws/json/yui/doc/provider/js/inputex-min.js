/* 
Distributed under the MIT License :
Visit http://neyric.github.com/inputex for more informations

Copyright (c) 2007-2011, Eric Abouaf <eric.abouaf at gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
(function(){var A=YAHOO.lang;inputEx=function(B,D){var C=null,E;if(B.type){C=inputEx.getFieldClass(B.type);if(C===null){C=inputEx.StringField}}else{C=B.fieldClass?B.fieldClass:inputEx.StringField}if(A.isObject(B.inputParams)){E=new C(B.inputParams)}else{E=new C(B)}if(D){E.setParentField(D)}return E};A.augmentObject(inputEx,{VERSION:"0.7.1",spacerUrl:"images/space.gif",stateEmpty:"empty",stateRequired:"required",stateValid:"valid",stateInvalid:"invalid",messages:{required:"This field is required",invalid:"This field is invalid",valid:"This field is valid",defaultDateFormat:"m/d/Y",months:["January","February","March","April","May","June","July","August","September","October","November","December"],timeUnits:{SECOND:"seconds",MINUTE:"minutes",HOUR:"hours",DAY:"days",MONTH:"months",YEAR:"years"}},widget:{},mixin:{},regexps:{email:/^[a-z0-9!\#\$%&'\*\-\/=\?\+\-\^_`\{\|\}~]+(?:\.[a-z0-9!\#\$%&'\*\-\/=\?\+\-\^_`\{\|\}~]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,6}$/i,url:/^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(\:[0-9]{1,5})?(([0-9]{1,5})?\/.*)?$/i,password:/^[0-9a-zA-Z\x20-\x7E]*$/},typeClasses:{},browserAutocomplete:true,registerType:function(C,E,B,F){if(!A.isString(C)){throw new Error("inputEx.registerType: first argument must be a string")}if(!A.isFunction(E)){throw new Error("inputEx.registerType: second argument must be a function")}this.typeClasses[C]=E;var D=[];if(A.isArray(B)){D=B}if(E.superclass&&!F&&A.isArray(E.superclass.constructor.groupOptions)){D=E.superclass.constructor.groupOptions.concat(D)}E.groupOptions=D},getFieldClass:function(B){return A.isFunction(this.typeClasses[B])?this.typeClasses[B]:null},getType:function(B){for(var C in this.typeClasses){if(this.typeClasses.hasOwnProperty(C)){if(this.typeClasses[C]==B){return C}}}return null},buildField:function(B){return inputEx(B)},sn:function(E,D,B){if(!E){return }var C;if(D){for(C in D){var G=D[C];if(A.isFunction(G)){continue}if(C=="className"){C="class";E.className=G}if(G!==E.getAttribute(C)){try{if(G===false){E.removeAttribute(C)}else{E.setAttribute(C,G)}}catch(F){}}}}if(B){for(C in B){if(A.isFunction(B[C])){continue}if(E.style[C]!=B[C]){E.style[C]=B[C]}}}},cn:function(B,F,C,H){if(B=="input"&&YAHOO.env.ua.ie&&YAHOO.env.ua.ie<9){var E="<"+B;if(F!=="undefined"){for(var D in F){E+=" "+(D==="className"?"class":D)+'="'+F[D]+'"'}}E+="/>";return document.createElement(E)}else{var G=document.createElement(B);this.sn(G,F,C);if(H){G.innerHTML=H}return G}},indexOf:function(F,B,E){var C=B.length,D;if(!A.isFunction(E)){E=function(G,H){return G===H}}for(D=0;D<C;D++){if(E.call({},F,B[D])){return D}}return -1},compactArray:function(B){var E=[],C=B.length,D;for(D=0;D<C;D++){if(!A.isNull(B[D])&&!A.isUndefined(B[D])){E.push(B[D])}}return E},removeAccents:function(B){return B.replace(/[àáâãäå]/g,"a").replace(/[èéêë]/g,"e").replace(/[ìíîï]/g,"i").replace(/[òóôõö]/g,"o").replace(/[ùúûü]/g,"u").replace(/[ýÿ]/g,"y").replace(/[ñ]/g,"n").replace(/[ç]/g,"c").replace(/[œ]/g,"oe").replace(/[æ]/g,"ae")},htmlEntities:function(B){return B.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}})})();YAHOO.inputEx=inputEx;(function(){var A=YAHOO.lang;inputEx.visus={trimpath:function(D,E){if(!TrimPath){alert("TrimPath is not on the page. Please load inputex/lib/trimpath-template.js");return null}var C=TrimPath.parseTemplate(D.template);var B=C.process(E);return B},func:function(B,C){return B.func(C)},dump:function(B,C){return A.dump(C)}};inputEx.renderVisu=function(H,D,E){var B=H||{};var I=B.visuType||"dump";if(!inputEx.visus.hasOwnProperty(I)){throw new Error("inputEx: no visu for visuType: "+I)}var F=inputEx.visus[I];if(!A.isFunction(F)){throw new Error("inputEx: no visu for visuType: "+I)}var J=null;try{J=F(B,D)}catch(G){throw new Error("inputEx: error while running visu "+I+" : "+G.message)}var C=null;if(E){if(A.isString(E)){C=YAHOO.util.Dom.get(E)}else{C=E}}if(C){if(YAHOO.lang.isObject(J)&&J.tagName){C.innerHTML="";C.appendChild(J)}else{C.innerHTML=J}}return J}})();(function(){var A=YAHOO.lang;inputEx.JsonSchema={inputExToSchema:function(B){var E=B.type||"string",G=(A.isObject(B.inputParams)?B.inputParams:B)||{};if(E=="group"){var C={type:"object",title:G.legend,properties:{}};for(var D=0;D<G.fields.length;D++){var F=G.fields[D];var H=A.isObject(F.inputParams)?F.inputParams.name:F.name;C.properties[H]=inputEx.JsonSchema.inputExToSchema(F)}return C}else{if(E=="number"){return{type:"number",optional:typeof G.required=="undefined"?true:!G.required,title:G.label}}else{if(E=="string"){return{type:"string",optional:typeof G.required=="undefined"?true:!G.required,title:G.label}}else{if(E=="text"){return{type:"string",format:"text",optional:typeof G.required=="undefined"?true:!G.required,title:G.label,_inputex:{rows:5,cols:50}}}else{if(E=="html"){return{type:"string",format:"html",optional:typeof G.required=="undefined"?true:!G.required,title:G.label,_inputex:{}}}else{if(E=="list"){return{type:"array",title:G.label,items:inputEx.JsonSchema.inputExToSchema(G.elementType),_inputex:{}}}else{if(E=="email"){return{type:"string",optional:typeof G.required=="undefined"?true:!G.required,title:G.label,format:"email"}}else{if(E=="url"){return{type:"string",optional:typeof G.required=="undefined"?true:!G.required,title:G.label,format:"url"}}else{if(E=="time"){return{type:"string",optional:typeof G.required=="undefined"?true:!G.required,title:G.label,format:"time"}}else{if(E=="IPv4"){return{type:"string",optional:typeof G.required=="undefined"?true:!G.required,title:G.label,format:"ip-address"}}else{if(E=="color"){return{type:"string",optional:typeof G.required=="undefined"?true:!G.required,title:G.label,format:"color"}}else{if(E=="date"){return{type:"string",optional:typeof G.required=="undefined"?true:!G.required,title:G.label,format:"date"}}else{if(E=="multiselect"||E=="multiautocomplete"){return{type:"array",optional:typeof G.required=="undefined"?true:!G.required,title:G.label,items:typeof G.jsonSchemaRef=="undefined"?{type:"string"}:G.jsonSchemaRef,_inputex:G}}else{return{type:"string",title:G.label,optional:typeof G.required=="undefined"?true:!G.required,_inputex:G}}}}}}}}}}}}}}}};inputEx.JsonSchema.Builder=function(C){var B=C||{};this.options=B;this.schemaToParamMap=B.schemaToParamMap||{title:"label",description:"description",_inputex:null};this.referenceResolver=B.referenceResolver||null;this.defaultOptions=B.defaultOptions||{};this.schemaIdentifierMap=B.schemaIdentifierMap||{}};inputEx.JsonSchema.Builder.prototype={defaultReferenceResolver:function(B){return this.schemaIdentifierMap[B]||null},schemaToInputEx:function(D,M){var G={label:M,name:M};var N=this.schemaToParamMap;var F=D["$ref"];var Q;if(F){var K=null;if(this.referenceResolver){K=this.referenceResolver(F)}if(K===null){K=this.defaultReferenceResolver(F)}if(K===null){throw new Error('Schema for property : "'+M+'" $references "'+F+'", not found')}K=A.merge(K);for(var H in D){if(D.hasOwnProperty(H)&&A.isUndefined(K[H])&&H!="$ref"){K[H]=D[H]}}D=K}if(!D.optional){G.required=true}for(Q in N){if(N.hasOwnProperty(Q)){var J=N[Q];var P=D[Q];if(!A.isUndefined(P)){if(J===null){if(A.isObject(P)){for(var B in P){if(P.hasOwnProperty(B)){G[B]=P[B]}}}}else{G[J]=P}}}}if(!D.type){D.type="object"}var O=D.type;if(A.isArray(O)){if(O.length===0||(O.length==1&&O[0]=="any")){O="array"}else{O=O[0]}}G.type=O;if(!A.isUndefined(D["default"])){G.value=D["default"]}if(O=="array"){G.type="list";if(A.isObject(D.items)&&!A.isArray(D.items)){G.elementType=this.schemaToInputEx(D.items,M)}if(D.minItems){G.minItems=D.minItems}if(D.maxItems){G.maxItems=D.maxItems}}else{if(O=="object"){G.type="group";if(D.title&&A.isUndefined(G.legend)){G.legend=D.title}var L=[];if(M){G.name=M}for(Q in D.properties){if(D.properties.hasOwnProperty(Q)){L.push(this.schemaToInputEx(D.properties[Q],Q))}}G.fields=L}else{if(O=="string"&&(D["enum"]||D.choices)){G.type="select";if(D.choices){G.choices=[];for(var I=0;I<D.choices.length;I++){var E=D.choices[I];G.choices[I]={label:E.label,value:E.value}}}else{G.choices=[];for(var I=0;I<D["enum"].length;I++){var E=D["enum"][I];if(YAHOO.lang.isObject(E)){G.choices[I]={label:E.label,value:E.value}}else{G.choices[I]={value:E}}}}}else{if(O=="string"){if(!A.isUndefined(D.pattern)&&A.isUndefined(G.regexp)){if(A.isString(D.pattern)){G.regexp=new RegExp(D.pattern)}else{G.regexp=D.pattern}}if(!A.isUndefined(D.maxLength)&&A.isUndefined(G.maxLength)){G.maxLength=D.maxLength}if(!A.isUndefined(D.minLength)&&A.isUndefined(G.minLength)){G.minLength=D.minLength}if(!A.isUndefined(D.readonly)&&A.isUndefined(G.readonly)){G.readonly=D.readonly}if(D.format){if(D.format=="html"){G.type="html"}else{if(D.format=="date"){G.type="date";G.tooltipIcon=true}else{if(D.format=="url"){G.type="url"}else{if(D.format=="email"){G.type="email"}else{if(D.format=="text"){G.type="text"}else{if(D.format=="time"){G.type="time"}else{if(D.format=="ip-address"){G.type="IPv4"}else{if(D.format=="color"){G.type="color"}}}}}}}}}}}}}if(!!D._inputex&&!!D._inputex["_type"]){G.type=D._inputex["_type"]}for(var C in this.defaultOptions){if(this.defaultOptions.hasOwnProperty(C)&&A.isUndefined(G[C])){G[C]=this.defaultOptions[C]}}return G},formFromInstance:function(E){if(!E||!E["$schema"]){throw new Error("Invalid json schema instance object. Object must have a '$schema' property.")}var B=this.schemaToInputEx(E["$schema"]);for(var C=0;C<B.fields.length;C++){var D=B.fields[C].name;B.fields[C].value=E[D]}return B}}})();(function(){var A=YAHOO.lang;inputEx.mixin.choice={addChoice:function(D){var C,B,E;if(!A.isObject(D)){D={value:D}}C={value:D.value,label:A.isString(D.label)?D.label:""+D.value,visible:true};C.node=this.createChoiceNode(C);B=this.getChoicePosition({position:D.position,label:D.before||D.after});if(B===-1){B=this.choicesList.length}else{if(A.isString(D.after)){B+=1}}this.choicesList.splice(B,0,C);this.appendChoiceNode(C.node,B);if(!!D.selected){E=this;setTimeout(function(){E.setValue(C.value)},0)}return C},removeChoice:function(D){var B,C;B=this.getChoicePosition(D);if(B===-1){throw new Error("SelectField : invalid or missing position, label or value in removeChoice")}C=this.choicesList[B];if(this.getValue()===C.value){this.clear()}this.choicesList.splice(B,1);this.removeChoiceNode(C.node)},hideChoice:function(E,D){var B,C;B=this.getChoicePosition(E);if(B!==-1){C=this.choicesList[B];if(C.visible){C.visible=false;if(this.getValue()===C.value){this.clear(D)}this.removeChoiceNode(C.node)}}},showChoice:function(D){var B,C;B=this.getChoicePosition(D);if(B!==-1){C=this.choicesList[B];if(!C.visible){C.visible=true;this.appendChoiceNode(C.node,B)}}},disableChoice:function(E,D){var B,C;if(A.isUndefined(D)||!A.isBoolean(D)){D=true}B=this.getChoicePosition(E);if(B!==-1){C=this.choicesList[B];this.disableChoiceNode(C.node);if(D&&this.getValue()===C.value){this.clear()}}},enableChoice:function(D){var B,C;B=this.getChoicePosition(D);if(B!==-1){C=this.choicesList[B];this.enableChoiceNode(C.node)}},getChoicePosition:function(C){var D,B=-1;D=this.choicesList.length;if(A.isNumber(C.position)&&C.position>=0&&C.position<D){B=parseInt(C.position,10)}else{if(!A.isUndefined(C.value)){B=inputEx.indexOf(C.value,this.choicesList,function(F,E){return E.value===F})}else{if(A.isString(C.label)){B=inputEx.indexOf(C.label,this.choicesList,function(E,F){return F.label===E})}}}return B}}}());(function(){var B=YAHOO.util.Dom,C=YAHOO.lang,A=YAHOO.util;inputEx.Field=function(D){this.setOptions(D||{});this.render();this.updatedEvt=new A.CustomEvent("updated",this);this.initEvents();if(!C.isUndefined(this.options.value)){this.setValue(this.options.value,false)}if(D.parentEl){if(C.isString(D.parentEl)){B.get(D.parentEl).appendChild(this.getEl())}else{D.parentEl.appendChild(this.getEl())}}};inputEx.Field.prototype={setOptions:function(D){this.options={};this.options.name=D.name;this.options.value=D.value;this.options.id=D.id||B.generateId();this.options.label=D.label;this.options.description=D.description;this.options.messages={};this.options.messages.required=(D.messages&&D.messages.required)?D.messages.required:inputEx.messages.required;this.options.messages.invalid=(D.messages&&D.messages.invalid)?D.messages.invalid:inputEx.messages.invalid;this.options.className=D.className?D.className:"inputEx-Field";this.options.required=C.isUndefined(D.required)?false:D.required;this.options.showMsg=C.isUndefined(D.showMsg)?false:D.showMsg},setFieldName:function(D){},render:function(){this.divEl=inputEx.cn("div",{className:"inputEx-fieldWrapper"});if(this.options.id){this.divEl.id=this.options.id}if(this.options.required){B.addClass(this.divEl,"inputEx-required")}if(YAHOO.lang.isString(this.options.label)){this.labelDiv=inputEx.cn("div",{id:this.divEl.id+"-label",className:"inputEx-label","for":this.divEl.id+"-field"});this.labelEl=inputEx.cn("label",null,null,this.options.label===""?"&nbsp;":this.options.label);this.labelDiv.appendChild(this.labelEl);this.divEl.appendChild(this.labelDiv)}this.fieldContainer=inputEx.cn("div",{className:this.options.className});this.renderComponent();if(this.options.description){this.fieldContainer.appendChild(inputEx.cn("div",{id:this.divEl.id+"-desc",className:"inputEx-description"},null,this.options.description))}this.divEl.appendChild(this.fieldContainer);this.divEl.appendChild(inputEx.cn("div",null,{clear:"both"}," "))},fireUpdatedEvt:function(){var D=this;setTimeout(function(){D.updatedEvt.fire(D.getValue(),D)},50)},renderComponent:function(){},getEl:function(){return this.divEl},initEvents:function(){},getValue:function(){},setValue:function(E,D){this.setClassFromState();if(D!==false){this.fireUpdatedEvt()}},setClassFromState:function(){var D;if(this.previousState){D="inputEx-"+((this.previousState==inputEx.stateRequired)?inputEx.stateInvalid:this.previousState);B.removeClass(this.divEl,D)}var E=this.getState();if(!(E==inputEx.stateEmpty&&B.hasClass(this.divEl,"inputEx-focused"))){D="inputEx-"+((E==inputEx.stateRequired)?inputEx.stateInvalid:E);B.addClass(this.divEl,D)}if(this.options.showMsg){this.displayMessage(this.getStateString(E))}this.previousState=E},getStateString:function(D){if(D==inputEx.stateRequired){return this.options.messages.required}else{if(D==inputEx.stateInvalid){return this.options.messages.invalid}else{return""}}},getState:function(){if(this.isEmpty()){return this.options.required?inputEx.stateRequired:inputEx.stateEmpty}return this.validate()?inputEx.stateValid:inputEx.stateInvalid},validate:function(){return true},onFocus:function(E){var D=this.getEl();B.removeClass(D,"inputEx-empty");B.addClass(D,"inputEx-focused")},onBlur:function(D){B.removeClass(this.getEl(),"inputEx-focused");this.setClassFromState()},onChange:function(D){this.fireUpdatedEvt()},close:function(){},disable:function(){},enable:function(){},isDisabled:function(){return false},focus:function(){},destroy:function(){var D=this.getEl();this.updatedEvt.unsubscribeAll();A.Event.purgeElement(D,true);if(B.inDocument(D)){D.parentNode.removeChild(D)}},displayMessage:function(F){if(!this.fieldContainer){return }if(!this.msgEl){this.msgEl=inputEx.cn("div",{className:"inputEx-message"});try{var D=this.divEl.getElementsByTagName("div");this.divEl.insertBefore(this.msgEl,D[(D.length-1>=0)?D.length-1:0])}catch(E){alert(E)}}this.msgEl.innerHTML=F},show:function(){this.divEl.style.display=""},hide:function(){this.divEl.style.display="none"},clear:function(D){this.setValue(C.isUndefined(this.options.value)?"":this.options.value,D)},isEmpty:function(){return this.getValue()===""},setParentField:function(D){this.parentField=D},getParentField:function(){return this.parentField}};inputEx.Field.groupOptions=[{type:"string",label:"Name",name:"name",value:"",required:true},{type:"string",label:"Label",name:"label",value:""},{type:"string",label:"Description",name:"description",value:""},{type:"boolean",label:"Required?",name:"required",value:false},{type:"boolean",label:"Show messages",name:"showMsg",value:false}]})();(function(){var C=YAHOO.lang,B=YAHOO.util.Dom,A=YAHOO.util.Event;inputEx.Group=function(D){inputEx.Group.superclass.constructor.call(this,D);if(!this.options.value){this.runFieldsInteractions()}};C.extend(inputEx.Group,inputEx.Field,{setOptions:function(D){inputEx.Group.superclass.setOptions.call(this,D);this.options.className=D.className||"inputEx-Group";this.options.fields=D.fields;this.options.flatten=D.flatten;this.options.legend=D.legend||"";this.options.collapsible=C.isUndefined(D.collapsible)?false:D.collapsible;this.options.collapsed=C.isUndefined(D.collapsed)?false:D.collapsed;this.options.disabled=C.isUndefined(D.disabled)?false:D.disabled;this.inputs=[];this.inputsNames={}},render:function(){this.divEl=inputEx.cn("div",{className:this.options.className});if(this.options.id){this.divEl.id=this.options.id}this.renderFields(this.divEl);if(this.options.disabled){this.disable()}},renderFields:function(F){this.fieldset=inputEx.cn("fieldset");this.legend=inputEx.cn("legend",{className:"inputEx-Group-legend"});if(this.options.collapsible){var G=inputEx.cn("div",{className:"inputEx-Group-collapseImg"},null," ");this.legend.appendChild(G);inputEx.sn(this.fieldset,{className:"inputEx-Expanded"})}if(!C.isUndefined(this.options.legend)&&this.options.legend!==""){this.legend.appendChild(inputEx.cn("span",null,null," "+this.options.legend))}if(this.options.collapsible||(!C.isUndefined(this.options.legend)&&this.options.legend!=="")){this.fieldset.appendChild(this.legend)}for(var E=0;E<this.options.fields.length;E++){var D=this.options.fields[E];if(!D){throw new Error("inputEx.Form: One of the provided fields is undefined ! (check trailing comma)")}this.addField(D)}if(this.options.collapsed){this.toggleCollapse()}F.appendChild(this.fieldset)},addField:function(D){var E=this.renderField(D);this.fieldset.appendChild(E.getEl())},renderField:function(E){var D=inputEx(E,this);this.inputs.push(D);if(D.options.name){this.inputsNames[D.options.name]=D}if(!this.hasInteractions&&E.interactions){this.hasInteractions=true}D.updatedEvt.subscribe(this.onChange,this,true);return D},initEvents:function(){if(this.options.collapsible){A.addListener(this.legend,"click",this.toggleCollapse,this,true)}},toggleCollapse:function(){if(B.hasClass(this.fieldset,"inputEx-Expanded")){B.replaceClass(this.fieldset,"inputEx-Expanded","inputEx-Collapsed")}else{B.replaceClass(this.fieldset,"inputEx-Collapsed","inputEx-Expanded")}},validate:function(){var E=true;for(var F=0;F<this.inputs.length;F++){var D=this.inputs[F];if(!D.isDisabled()){D.setClassFromState();var G=D.getState();if(G==inputEx.stateRequired||G==inputEx.stateInvalid){E=false}}}return E},getFieldsStates:function(){var D,E,I,H,G={fields:{},validate:true};for(var F=0;F<this.inputs.length;F++){D=this.inputs[F];E=D.options.name;I=D.getState();H=D.getStateString(I);G.fields[E]={};G.fields[E].valid=true;G.fields[E].message=H;if(I==inputEx.stateRequired||I==inputEx.stateInvalid){G.fields[E].valid=false;G.validate=false}}return G},enable:function(){for(var D=0;D<this.inputs.length;D++){this.inputs[D].enable()}},disable:function(){for(var D=0;D<this.inputs.length;D++){this.inputs[D].disable()}},setValue:function(G,E){if(!G){return }for(var F=0;F<this.inputs.length;F++){var H=this.inputs[F];var D=H.options.name;if(D&&!C.isUndefined(G[D])){H.setValue(G[D],false)}else{H.clear(false)}}this.runFieldsInteractions();if(E!==false){this.fireUpdatedEvt()}},getValue:function(){var F={};for(var E=0;E<this.inputs.length;E++){var D=this.inputs[E].getValue();if(this.inputs[E].options.name){if(this.inputs[E].options.flatten&&C.isObject(D)){C.augmentObject(F,D)}else{F[this.inputs[E].options.name]=D}}}return F},close:function(){for(var D=0;D<this.inputs.length;D++){this.inputs[D].close()}},focus:function(){if(this.inputs.length>0){this.inputs[0].focus()}},getFieldByName:function(D){if(!this.inputsNames.hasOwnProperty(D)){return null}return this.inputsNames[D]},onChange:function(E,F){var G=F[0];var D=F[1];this.runInteractions(D,G);this.fireUpdatedEvt()},runAction:function(D,F){var E=this.getFieldByName(D.name);if(YAHOO.lang.isFunction(E[D.action])){E[D.action].call(E)}else{if(YAHOO.lang.isFunction(D.action)){D.action.call(E,F)}else{throw new Error("action "+D.action+" is not a valid action for field "+D.name)}}},runInteractions:function(E,J){var G=inputEx.indexOf(E,this.inputs);var I=this.options.fields[G];if(YAHOO.lang.isUndefined(I.interactions)){return }var K=I.interactions;for(var H=0;H<K.length;H++){var D=K[H];if(D.valueTrigger===J){for(var F=0;F<D.actions.length;F++){this.runAction(D.actions[F],J)}}}},runFieldsInteractions:function(){if(this.hasInteractions){for(var D=0;D<this.inputs.length;D++){this.runInteractions(this.inputs[D],this.inputs[D].getValue())}}},clear:function(D){for(var E=0;E<this.inputs.length;E++){this.inputs[E].clear(false)}if(D!==false){this.fireUpdatedEvt()}},setErrors:function(F){var E,D;if(YAHOO.lang.isArray(F)){for(E=0;E<F.length;E++){D=F[E][0];value=F[E][1];if(this.inputsNames[D]){if(this.inputsNames[D].options.showMsg){this.inputsNames[D].displayMessage(value);B.replaceClass(this.inputsNames[D].divEl,"inputEx-valid","inputEx-invalid")}}}}else{if(YAHOO.lang.isObject(F)){for(D in F){if(F.hasOwnProperty(D)){if(this.inputsNames[D]){if(this.inputsNames[D].options.showMsg){this.inputsNames[D].displayMessage(F[D]);B.replaceClass(this.inputsNames[D].divEl,"inputEx-valid","inputEx-invalid")}}}}}}},destroy:function(){var D,E,F;for(D=0,E=this.inputs.length;D<E;D++){F=this.inputs[D];F.destroy()}inputEx.Group.superclass.destroy.call(this)}});inputEx.registerType("group",inputEx.Group,[{type:"string",label:"Name",name:"name",value:""},{type:"string",label:"Legend",name:"legend"},{type:"boolean",label:"Collapsible",name:"collapsible",value:false},{type:"boolean",label:"Collapsed",name:"collapsed",value:false},{type:"list",label:"Fields",name:"fields",elementType:{type:"type"}}],true)})();(function(){var B=YAHOO.util,D=YAHOO.lang,A=B.Event,C=B.Dom;inputEx.widget.Button=function(E){this.setOptions(E||{});if(!!this.options.parentEl){this.render(this.options.parentEl)}};D.augmentObject(inputEx.widget.Button.prototype,{setOptions:function(E){this.options={};this.options.id=D.isString(E.id)?E.id:C.generateId();this.options.className=E.className||"inputEx-Button";this.options.parentEl=D.isString(E.parentEl)?C.get(E.parentEl):E.parentEl;this.options.type=(E.type==="link"||E.type==="submit-link")?E.type:"submit";this.options.value=E.value;this.options.disabled=!!E.disabled;if(D.isFunction(E.onClick)){this.options.onClick={fn:E.onClick,scope:this}}else{if(D.isObject(E.onClick)){this.options.onClick={fn:E.onClick.fn,scope:E.onClick.scope||this}}}},render:function(F){var E;if(this.options.type==="link"||this.options.type==="submit-link"){this.el=inputEx.cn("a",{className:this.options.className,id:this.options.id,href:"#"});C.addClass(this.el,this.options.type==="link"?"inputEx-Button-Link":"inputEx-Button-Submit-Link");E=inputEx.cn("span",null,null,this.options.value);this.el.appendChild(E)}else{this.el=inputEx.cn("input",{type:"submit",value:this.options.value,className:this.options.className,id:this.options.id});C.addClass(this.el,"inputEx-Button-Submit")}F.appendChild(this.el);if(this.options.disabled){this.disable()}this.initEvents();return this.el},initEvents:function(){this.clickEvent=new B.CustomEvent("click");this.submitEvent=new B.CustomEvent("submit");A.addListener(this.el,"click",function(F){var E;A.stopEvent(F);if(this.disabled){E=false}else{E=this.clickEvent.fire()}if(this.options.type==="link"){E=false}if(E){this.submitEvent.fire()}},this,true);if(this.options.onClick){this.clickEvent.subscribe(this.options.onClick.fn,this.options.onClick.scope,true)}},disable:function(){this.disabled=true;C.addClass(this.el,"inputEx-Button-disabled");if(this.options.type==="submit"){this.el.disabled=true}},enable:function(){this.disabled=false;C.removeClass(this.el,"inputEx-Button-disabled");if(this.options.type==="submit"){this.el.disabled=false}},destroy:function(){this.clickEvent.unsubscribeAll();this.submitEvent.unsubscribeAll();B.Event.purgeElement(this.el,true);if(C.inDocument(this.el)){this.el.parentNode.removeChild(this.el)}}})})();(function(){var B=YAHOO.util,D=YAHOO.lang,A=B.Event,C=B.Dom;inputEx.Form=function(E){inputEx.Form.superclass.constructor.call(this,E)};D.extend(inputEx.Form,inputEx.Group,{setOptions:function(E){inputEx.Form.superclass.setOptions.call(this,E);this.buttons=[];this.options.buttons=E.buttons||[];this.options.action=E.action;this.options.method=E.method;this.options.className=E.className||"inputEx-Group";this.options.autocomplete=D.isUndefined(E.autocomplete)?inputEx.browserAutocomplete:(E.autocomplete===false||E.autocomplete==="off")?false:true;this.options.enctype=E.enctype;if(E.ajax){this.options.ajax={};this.options.ajax.method=E.ajax.method||"POST";this.options.ajax.uri=E.ajax.uri||"default.php";this.options.ajax.callback=E.ajax.callback||{};this.options.ajax.callback.scope=E.ajax.callback.scope||this;this.options.ajax.showMask=D.isUndefined(E.ajax.showMask)?false:E.ajax.showMask;this.options.ajax.contentType=E.ajax.contentType||"application/json";this.options.ajax.wrapObject=E.ajax.wrapObject}if(D.isFunction(E.onSubmit)){this.options.onSubmit=E.onSubmit}},render:function(){this.divEl=inputEx.cn("div",{className:this.options.className});if(this.options.id){this.divEl.id=this.options.id}this.form=inputEx.cn("form",{method:this.options.method||"POST",action:this.options.action||"",className:this.options.className||"inputEx-Form"});this.divEl.appendChild(this.form);if(this.options.enctype){this.form.setAttribute("enctype",this.options.enctype)}this.form.setAttribute("autocomplete",this.options.autocomplete?"on":"off");if(this.options.formName){this.form.name=this.options.formName}this.renderFields(this.form);this.renderButtons();if(this.options.disabled){this.disable()}},renderButtons:function(){var E,H,G,F=this.options.buttons.length;this.buttonDiv=inputEx.cn("div",{className:"inputEx-Form-buttonBar"});for(G=0;G<F;G++){E=this.options.buttons[G];if(!E){throw new Error("inputEx.Form: One of the provided button is undefined ! (check trailing comma)")}H=new inputEx.widget.Button(E);H.render(this.buttonDiv);this.buttons.push(H)}this.buttonDiv.appendChild(inputEx.cn("div",null,{clear:"both"}));this.form.appendChild(this.buttonDiv)},initEvents:function(){var E,F;inputEx.Form.superclass.initEvents.call(this);this.submitEvent=new B.CustomEvent("submit");A.addListener(this.form,"submit",function(G){A.stopEvent(G);this.submitEvent.fire()},this,true);for(E=0,F=this.buttons.length;E<F;E++){this.buttons[E].submitEvent.subscribe(function(){this.submitEvent.fire()},this,true)}this.submitEvent.subscribe(this.options.onSubmit||this.onSubmit,this,true)},onSubmit:function(E){if(!this.validate()){return }if(this.options.ajax){this.asyncRequest();return }this.form.submit()},asyncRequest:function(){if(this.options.ajax.showMask){this.showMask()}var M=this.getValue();var H=D.isFunction(this.options.ajax.uri)?this.options.ajax.uri(M):this.options.ajax.uri;var E=D.isFunction(this.options.ajax.method)?this.options.ajax.method(M):this.options.ajax.method;var G=null;if(this.options.ajax.contentType=="application/x-www-form-urlencoded"&&E!="PUT"){var J=[];for(var L in M){if(M.hasOwnProperty(L)){var K=(this.options.ajax.wrapObject?this.options.ajax.wrapObject+"[":"")+L+(this.options.ajax.wrapObject?"]":"");J.push(K+"="+window.encodeURIComponent(M[L]))}}G=J.join("&")}else{YAHOO.util.Connect.initHeader("Content-Type","application/json",false);if(E=="PUT"){var I=this.getValue();var F;if(this.options.ajax.wrapObject){F={};F[this.options.ajax.wrapObject]=I}else{F=I}G=D.JSON.stringify(F)}else{G="value="+window.encodeURIComponent(D.JSON.stringify(this.getValue()))}}B.Connect.asyncRequest(E,H,{success:function(N){if(this.options.ajax.showMask){this.hideMask()}if(D.isFunction(this.options.ajax.callback.success)){this.options.ajax.callback.success.call(this.options.ajax.callback.scope,N)}},failure:function(N){if(this.options.ajax.showMask){this.hideMask()}if(D.isFunction(this.options.ajax.callback.failure)){this.options.ajax.callback.failure.call(this.options.ajax.callback.scope,N)}},scope:this},G)},renderMask:function(){if(this.maskRendered){return }C.setStyle(this.divEl,"position","relative");if(YAHOO.env.ua.ie){C.setStyle(this.divEl,"zoom",1)}this.formMask=inputEx.cn("div",{className:"inputEx-Form-Mask"},{display:"none",width:this.divEl.offsetWidth+"px",height:this.divEl.offsetHeight+"px"},"<div class='inputEx-Form-Mask-bg'/><center><br/><div class='inputEx-Form-Mask-spinner'></div><br /><span>"+inputEx.messages.ajaxWait+"</span></div>");this.divEl.appendChild(this.formMask);this.maskRendered=true},showMask:function(){this.renderMask();this.toggleSelectsInIE(false);this.formMask.style.display=""},hideMask:function(){this.toggleSelectsInIE(true);this.formMask.style.display="none"},toggleSelectsInIE:function(E){if(!!YAHOO.env.ua.ie&&YAHOO.env.ua.ie<7){var G=!!E?YAHOO.util.Dom.removeClass:YAHOO.util.Dom.addClass;var F=this;YAHOO.util.Dom.getElementsBy(function(){return true},"select",this.divEl,function(H){G.call(F,H,"inputEx-hidden")})}},enable:function(){inputEx.Form.superclass.enable.call(this);for(var E=0;E<this.buttons.length;E++){this.buttons[E].enable()}},disable:function(){inputEx.Form.superclass.disable.call(this);for(var E=0;E<this.buttons.length;E++){this.buttons[E].disable()}},destroy:function(){var F,G,E;this.submitEvent.unsubscribeAll();for(F=0,G=this.buttons.length;F<G;F++){E=this.buttons[F];E.destroy()}inputEx.Form.superclass.destroy.call(this)}});inputEx.messages.ajaxWait="Please wait...";inputEx.registerType("form",inputEx.Form,[{type:"list",label:"Buttons",name:"buttons",elementType:{type:"group",fields:[{label:"Label",name:"value"},{type:"select",label:"Type",name:"type",choices:[{value:"button"},{value:"submit"}]}]}}])})();(function(){var C=YAHOO.lang,B=YAHOO.util.Dom,A=YAHOO.util.Event;inputEx.CombineField=function(D){inputEx.CombineField.superclass.constructor.call(this,D)};C.extend(inputEx.CombineField,inputEx.Group,{setOptions:function(D){inputEx.CombineField.superclass.setOptions.call(this,D);this.options.className=D.className?D.className:"inputEx-CombineField";this.options.separators=D.separators},render:function(){this.divEl=inputEx.cn("div",{className:this.options.className});if(this.options.id){this.divEl.id=this.options.id}if(YAHOO.lang.isString(this.options.label)){this.labelDiv=inputEx.cn("div",{id:this.divEl.id+"-label",className:"inputEx-label","for":this.divEl.id+"-field"});this.labelEl=inputEx.cn("label",null,null,this.options.label===""?"&nbsp;":this.options.label);this.labelDiv.appendChild(this.labelEl);this.divEl.appendChild(this.labelDiv)}this.renderFields(this.divEl);if(this.options.disabled){this.disable()}this.divEl.appendChild(inputEx.cn("div",{className:"inputEx-clear-div"},null," "))},renderFields:function(F){this.appendSeparator(0);if(!this.options.fields){return }var E,J=this.options.fields.length,G,I,H,D;for(E=0;E<J;E++){G=this.options.fields[E];if(this.options.required){G.required=true}I=this.renderField(G);H=I.getEl();D=G.type;if(D!="group"&&D!="form"){I.divEl.removeChild(H.childNodes[H.childNodes.length-1])}B.setStyle(H,"float","left");this.divEl.appendChild(H);this.appendSeparator(E+1)}this.setFieldName(this.options.name)},renderField:function(D){if(this.options.required){D.required=true}return inputEx.CombineField.superclass.renderField.call(this,D)},setFieldName:function(E){if(E){for(var F=0;F<this.inputs.length;F++){var D="";if(this.inputs[F].options.name){D=E+"["+this.inputs[F].options.name+"]"}else{D=E+"["+F+"]"}this.inputs[F].setFieldName(D)}}},appendSeparator:function(E){if(this.options.separators&&this.options.separators[E]){var D=inputEx.cn("div",{className:"inputEx-CombineField-separator"},null,this.options.separators[E]);this.divEl.appendChild(D)}},initEvents:function(){var D=this,E;inputEx.CombineField.superclass.initEvents.apply(this,arguments);A.addListener(this.divEl,"focusout",function(F){F=C.merge(F);E=window.setTimeout(function(){E=null;D.onBlur(F)},25)});A.addListener(this.divEl,"focusin",function(F){if(E!==null){window.clearTimeout(E);E=null}else{D.onFocus(F)}})},setValue:function(D,E){if(!D){return }var F,G=this.inputs.length;for(F=0;F<G;F++){this.inputs[F].setValue(D[F],false)}this.runFieldsInteractions();if(E!==false){this.fireUpdatedEvt()}},getValue:function(){var D=[],E,F=this.inputs.length;for(E=0;E<F;E++){D.push(this.inputs[E].getValue())}return D}});inputEx.registerType("combine",inputEx.CombineField,[{type:"list",name:"fields",label:"Elements",required:true,elementType:{type:"type"}},{type:"list",name:"separators",label:"Separators",required:true}])})();(function(){var C=YAHOO.lang,A=YAHOO.util.Event,B=YAHOO.util.Dom;inputEx.StringField=function(D){inputEx.StringField.superclass.constructor.call(this,D);if(this.options.typeInvite){this.updateTypeInvite()}};C.extend(inputEx.StringField,inputEx.Field,{setOptions:function(D){inputEx.StringField.superclass.setOptions.call(this,D);this.options.regexp=D.regexp;this.options.size=D.size;this.options.maxLength=D.maxLength;this.options.minLength=D.minLength;this.options.typeInvite=D.typeInvite;this.options.readonly=D.readonly;this.options.autocomplete=C.isUndefined(D.autocomplete)?inputEx.browserAutocomplete:(D.autocomplete===false||D.autocomplete==="off")?false:true;this.options.trim=(D.trim===true)?true:false},renderComponent:function(){this.wrapEl=inputEx.cn("div",{className:"inputEx-StringField-wrapper"});var D={};D.type="text";D.id=this.divEl.id?this.divEl.id+"-field":YAHOO.util.Dom.generateId();if(this.options.size){D.size=this.options.size}if(this.options.name){D.name=this.options.name}if(this.options.readonly){D.readonly="readonly"}if(this.options.maxLength){D.maxLength=this.options.maxLength}D.autocomplete=this.options.autocomplete?"on":"off";this.el=inputEx.cn("input",D);this.wrapEl.appendChild(this.el);this.fieldContainer.appendChild(this.wrapEl)},setFieldName:function(D){this.el.name=D},initEvents:function(){A.addListener(this.el,"change",this.onChange,this,true);if(YAHOO.env.ua.ie){var D=this.el;new YAHOO.util.KeyListener(this.el,{keys:[13]},{fn:function(){D.blur();D.focus()}}).enable()}A.addFocusListener(this.el,this.onFocus,this,true);A.addBlurListener(this.el,this.onBlur,this,true);A.addListener(this.el,"keypress",this.onKeyPress,this,true);A.addListener(this.el,"keyup",this.onKeyUp,this,true)},getValue:function(){var D;D=(this.options.typeInvite&&this.el.value==this.options.typeInvite)?"":this.el.value;if(this.options.trim){D=YAHOO.lang.trim(D)}return D},setValue:function(E,D){this.el.value=(C.isNull(E)||C.isUndefined(E))?"":E;inputEx.StringField.superclass.setValue.call(this,E,D)},validate:function(){var E=this.getValue();if(E===""){return !this.options.required}var D=true;if(this.options.regexp){D=D&&E.match(this.options.regexp)}if(this.options.minLength){D=D&&E.length>=this.options.minLength}return D},disable:function(){this.el.disabled=true},enable:function(){this.el.disabled=false},isDisabled:function(){return this.el.disabled},focus:function(){if(!!this.el&&!C.isUndefined(this.el.focus)){this.el.focus()}},getStateString:function(D){if(D==inputEx.stateInvalid&&this.options.minLength&&this.el.value.length<this.options.minLength){return inputEx.messages.stringTooShort[0]+this.options.minLength+inputEx.messages.stringTooShort[1]}return inputEx.StringField.superclass.getStateString.call(this,D)},setClassFromState:function(){inputEx.StringField.superclass.setClassFromState.call(this);if(this.options.typeInvite){this.updateTypeInvite()}},updateTypeInvite:function(){if(!B.hasClass(this.divEl,"inputEx-focused")){if(this.isEmpty()){B.addClass(this.divEl,"inputEx-typeInvite");this.el.value=this.options.typeInvite}else{B.removeClass(this.divEl,"inputEx-typeInvite")}}else{if(B.hasClass(this.divEl,"inputEx-typeInvite")){this.el.value="";this.previousState=null;B.removeClass(this.divEl,"inputEx-typeInvite")}}},onFocus:function(D){inputEx.StringField.superclass.onFocus.call(this,D);if(this.options.typeInvite){this.updateTypeInvite()}},onKeyPress:function(D){},onKeyUp:function(D){}});inputEx.messages.stringTooShort=["This field should contain at least "," numbers or characters"];inputEx.registerType("string",inputEx.StringField,[{type:"string",label:"Type invite",name:"typeInvite",value:""},{type:"integer",label:"Size",name:"size",value:20},{type:"integer",label:"Min. length",name:"minLength",value:0}])})();(function(){var C=YAHOO.lang,A=YAHOO.util.Event,B=YAHOO.util.Dom;inputEx.AutoComplete=function(D){inputEx.AutoComplete.superclass.constructor.call(this,D)};C.extend(inputEx.AutoComplete,inputEx.StringField,{setOptions:function(D){inputEx.AutoComplete.superclass.setOptions.call(this,D);this.options.className=D.className?D.className:"inputEx-Field inputEx-AutoComplete";this.options.datasource=D.datasource;this.options.autoComp=D.autoComp;this.options.returnValue=D.returnValue;this.options.generateRequest=D.generateRequest;this.options.datasourceParameters=D.datasourceParameters},initEvents:function(){inputEx.AutoComplete.superclass.initEvents.call(this)},renderComponent:function(){this.wrapEl=inputEx.cn("div",{className:"inputEx-StringField-wrapper"});var D={type:"text",id:YAHOO.util.Dom.generateId()};if(this.options.size){D.size=this.options.size}if(this.options.readonly){D.readonly="readonly"}if(this.options.maxLength){D.maxLength=this.options.maxLength}this.el=inputEx.cn("input",D);var E={type:"hidden",value:""};if(this.options.name){E.name=this.options.name}this.hiddenEl=inputEx.cn("input",E);this.wrapEl.appendChild(this.el);this.wrapEl.appendChild(this.hiddenEl);this.fieldContainer.appendChild(this.wrapEl);this.listEl=inputEx.cn("div",{id:B.generateId()});this.fieldContainer.appendChild(this.listEl);A.onAvailable([this.el,this.listEl],this.buildAutocomplete,this,true)},buildAutocomplete:function(){if(!this._nElementsReady){this._nElementsReady=0}this._nElementsReady++;if(this._nElementsReady!=2){return }if(!C.isUndefined(this.options.datasourceParameters)){for(param in this.options.datasourceParameters){this.options.datasource[param]=this.options.datasourceParameters[param]}}this.oAutoComp=new YAHOO.widget.AutoComplete(this.el.id,this.listEl.id,this.options.datasource,this.options.autoComp);if(!C.isUndefined(this.options.generateRequest)){this.oAutoComp.generateRequest=this.options.generateRequest}this.oAutoComp.itemSelectEvent.subscribe(this.itemSelectHandler,this,true);this.oAutoComp.textboxBlurEvent.subscribe(this.onBlur,this,true)},itemSelectHandler:function(F,E){var D=E[2];this.setValue(this.options.returnValue?this.options.returnValue(D):D[0])},onBlur:function(D){if(this.hiddenEl.value!=this.el.value&&this.el.value!=this.options.typeInvite){this.el.value=this.hiddenEl.value}if(this.el.value==""&&this.options.typeInvite){B.addClass(this.divEl,"inputEx-typeInvite");if(this.el.value==""){this.el.value=this.options.typeInvite}}},onChange:function(D){this.setClassFromState();if(this.hiddenEl.value!=this.el.value){this.hiddenEl.value=this.el.value}C.later(50,this,function(){if(this.el.value==""){this.setValue("")}})},setValue:function(E,D){this.hiddenEl.value=E||"";this.el.value=E||"";this.setClassFromState();if(D!==false){this.fireUpdatedEvt()}},getValue:function(){return this.hiddenEl.value}});inputEx.registerType("autocomplete",inputEx.AutoComplete)})();(function(){var C=YAHOO.lang,A=YAHOO.util.Event,B=YAHOO.util.Dom;inputEx.CheckBox=function(D){inputEx.CheckBox.superclass.constructor.call(this,D)};C.extend(inputEx.CheckBox,inputEx.Field,{setOptions:function(D){inputEx.CheckBox.superclass.setOptions.call(this,D);this.options.className=D.className?D.className:"inputEx-Field inputEx-CheckBox";this.options.rightLabel=D.rightLabel||"";this.sentValues=D.sentValues||[true,false];this.options.sentValues=this.sentValues;this.checkedValue=this.sentValues[0];this.uncheckedValue=this.sentValues[1]},renderComponent:function(){var D=this.divEl.id?this.divEl.id+"-field":YAHOO.util.Dom.generateId();this.el=inputEx.cn("input",{id:D,type:"checkbox"});this.fieldContainer.appendChild(this.el);this.rightLabelEl=inputEx.cn("label",{"for":D,className:"inputEx-CheckBox-rightLabel"},null,this.options.rightLabel);this.fieldContainer.appendChild(this.rightLabelEl);this.hiddenEl=inputEx.cn("input",{type:"hidden",name:this.options.name||"",value:this.uncheckedValue});this.fieldContainer.appendChild(this.hiddenEl)},initEvents:function(){if(YAHOO.env.ua.ie){A.addListener(this.el,"click",function(D){YAHOO.lang.later(10,this,function(){this.onChange(D)})},this,true)}else{A.addListener(this.el,"change",this.onChange,this,true)}A.addFocusListener(this.el,this.onFocus,this,true);A.addBlurListener(this.el,this.onBlur,this,true)},onChange:function(D){this.hiddenEl.value=this.el.checked?this.checkedValue:this.uncheckedValue;inputEx.CheckBox.superclass.onChange.call(this,D)},getValue:function(){return this.el.checked?this.checkedValue:this.uncheckedValue},setValue:function(E,D){if(E===this.checkedValue||(typeof (E)=="string"&&typeof (this.checkedValue)=="boolean"&&E===String(this.checkedValue))){this.hiddenEl.value=this.checkedValue;this.el.checked=true;if(YAHOO.env.ua.ie===6){this.el.setAttribute("defaultChecked","checked")}}else{this.hiddenEl.value=this.uncheckedValue;this.el.checked=false;if(YAHOO.env.ua.ie===6){this.el.removeAttribute("defaultChecked")}}inputEx.CheckBox.superclass.setValue.call(this,E,D)},disable:function(){this.el.disabled=true},enable:function(){this.el.disabled=false}});inputEx.registerType("boolean",inputEx.CheckBox,[{type:"string",label:"Right Label",name:"rightLabel"}])})();(function(){var C=YAHOO.lang,A=YAHOO.util.Event,B=YAHOO.util.Dom;inputEx.ColorField=function(D){inputEx.ColorField.superclass.constructor.call(this,D)};C.extend(inputEx.ColorField,inputEx.Field,{setOptions:function(D){inputEx.ColorField.superclass.setOptions.call(this,D);this.options.className=D.className?D.className:"inputEx-Field inputEx-ColorField inputEx-PickerField";this.options.palette=D.palette;this.options.colors=D.colors;if(D.ratio){this.options.ratio=D.ratio}if(D.cellPerLine){this.options.cellPerLine=D.cellPerLine}},renderComponent:function(){this.el=inputEx.cn("input",{type:"hidden",name:this.options.name||"",value:this.options.value||"#FFFFFF"});this.colorEl=inputEx.cn("div",{className:"inputEx-ColorField-button"},{backgroundColor:this.el.value});this.wrapEl=inputEx.cn("div",{className:"inputEx-PickerField-wrapper"});this.wrapEl.appendChild(this.el);this.wrapEl.appendChild(this.colorEl);this.oOverlay=new YAHOO.widget.Overlay(B.generateId(),{visible:false});this.oOverlay.setBody(" ");this.oOverlay.body.id=B.generateId();this.button=new YAHOO.widget.Button({type:"menu",menu:this.oOverlay,label:"&nbsp;&nbsp;&nbsp;&nbsp;"});this.button.appendTo(this.wrapEl);this.oOverlay.render(this.wrapEl);B.setStyle(this.oOverlay.body.parentNode,"position","absolute");A.addListener(this.colorEl,"mousedown",function(D){if(!this.oOverlay.cfg.getProperty("visible")){A.stopEvent(D);this.renderPalette();this.button._showMenu()}},this,true);this.button.on("mousedown",this.renderPalette,this,true);this.fieldContainer.appendChild(this.wrapEl)},renderPalette:function(){var E,D;if(this.paletteRendered){return }E=this.options.palette||1;this.colors=this.options.colors||this.setDefaultColors(E);this.length=this.colors.length;this.ratio=this.options.ratio||[16,9];this.cellPerLine=this.options.cellPerLine||Math.ceil(Math.sqrt(this.length*this.ratio[0]/this.ratio[1]));this.cellPerColumn=Math.ceil(this.length/this.cellPerLine);D=document.getElementById(this.oOverlay.body.id);this.colorGrid=this.renderColorGrid();D.appendChild(this.colorGrid);this.button.unsubscribe("mousedown",this.renderPalette);this.paletteRendered=true;this.markSelectedColor()},setDefaultColors:function(D){return inputEx.ColorField.palettes[D-1]},renderColorGrid:function(){var F,D,G,E;this.squares=[];F=inputEx.cn("div",{className:"inputEx-ColorField-Grid"});D=!C.isUndefined(A.delegate);for(E=0;E<this.length;E++){G=inputEx.cn("div",{className:"inputEx-ColorField-square"},{backgroundColor:this.colors[E]});F.appendChild(G);this.squares.push(G);if(!D){A.addListener(G,"mousedown",function(I){var H=A.getTarget(I);this.onColorClick(I,H,F)},this,true)}if(E%this.cellPerLine===this.cellPerLine-1||E===this.length-1){F.appendChild(inputEx.cn("br",{clear:"both"}))}}if(D){if(!C.isUndefined(YAHOO.util.Selector)){A.delegate(F,"mousedown",this.onColorClick,"div.inputEx-ColorField-square",this,true)}else{A.delegate(F,"mousedown",this.onColorClick,function(H){if(H.nodeName==="DIV"&&YAHOO.util.Dom.hasClass(H,"inputEx-ColorField-square")){return H}},this,true)}}return F},onColorClick:function(H,G,E){A.stopEvent(H);this.oOverlay.hide();var F=B.getStyle(G,"background-color");var D=inputEx.ColorField.ensureHexa(F);this.setValue(D)},setValue:function(E,D){this.el.value=E;this.markSelectedColor(E);inputEx.ColorField.superclass.setValue.call(this,E,D)},getValue:function(){return this.el.value},close:function(){this.oOverlay.hide()},destroy:function(){A.purgeElement(this.colorEl);if(this.colorGrid){A.purgeElement(this.colorGrid,true)}inputEx.ColorField.superclass.destroy.call(this)},markSelectedColor:function(E){var D;E=E||this.getValue();if(!!E&&this.paletteRendered){E=E.toLowerCase();for(D=0;D<this.length;D++){if(this.colors[D].toLowerCase()===E){YAHOO.util.Dom.addClass(this.squares[D],"selected")}else{YAHOO.util.Dom.removeClass(this.squares[D],"selected")}}}B.setStyle(this.colorEl,"background-color",this.el.value)}});inputEx.messages.selectColor="Select a color :";inputEx.ColorField.palettes=[["#FFEA99","#FFFF66","#FFCC99","#FFCAB2","#FF99AD","#FFD6FF","#FF6666","#E8EEF7","#ADC2FF","#ADADFF","#CCFFFF","#D6EAAD","#B5EDBC","#CCFF99"],["#DEDFDE","#FFFF6B","#EFCB7B","#FFBE94","#FFB6B5","#A5E3FF","#A5CBFF","#99ABEF","#EFB2E7","#FF9AAD","#94E7C6","#A5FFD6","#CEFFA5","#E7EF9C","#FFE38C"],["#000000","#993300","#333300","#003300","#003366","#000080","#333399","#333333","#800000","#FF6600","#808000","#008000","#008080","#0000FF","#666699","#808080","#FF0000","#FF9900","#99CC00","#339966","#33CCCC","#3366FF","#800080","#969696","#FF00FF","#FFCC00","#FFFF00","#00FF00","#00FFFF","#00CCFF","#993366","#C0C0C0","#FF99CC","#FFCC99","#FFFF99","#CCFFCC","#CCFFFF","#99CCFF","#CC99FF","#F0F0F0"],["#FFFFCC","#FFFF99","#CCFFCC","#CCFF66","#99FFCC","#CCFFFF","#66CCCC","#CCCCFF","#99CCFF","#9999FF","#6666CC","#9966CC","#CC99FF","#FFCCFF","#FF99FF","#CC66CC","#FFCCCC","#FF99CC","#FFCCCC","#CC6699","#FF9999","#FF9966","#FFCC99","#FFFFCC","#FFCC66","#FFFF99","#CCCC66"],["#D0D0D0","#31A8FA","#8EC1E5","#58D7CF","#89E2BB","#A7F7F8","#F6B77C","#FE993F","#FE6440","#F56572","#FA9AA3","#F7B1CA","#E584AF","#D1C3EF","#AB77B8","#C69FE7","#90D28A","#C2F175","#EDEA9A","#F3DF70","#F8D1AE","#F98064","#F54F5E","#EC9099","#F0B5BA","#EDA0BB","#D375AC","#BC8DBE","#8C77B8"],["#EEEEEE","#84CBFC","#BCDAF0","#9BE7E3","#B9EED7","#CBFBFB","#FAD4B1","#FFC28C","#FFA28D","#F9A3AB","#FCC3C8","#FBD1E0","#F0B6CF","#E4DBF6","#CDAED5","#DDC6F1","#BDE4B9","#DBF7AD","#F5F3C3","#F8ECAA","#FBE4CF","#FCB3A2","#F9969F","#F4BDC2","#F6D3D6","#F5C6D7","#E5ADCE","#D7BBD8","#BAAED5"]];inputEx.ColorField.ensureHexa=function(E){var F,D;E=E.replace(/\s/g,"");if(!!E.match(/^rgb\((?:\d{1,3},){2}\d{1,3}\)$/)){var G=function(I){var H=parseInt(I,10).toString(16);if(H.length==1){H="0"+H}return H};F=E.split(/([(,)])/);D="#"+G(F[2])+G(F[4])+G(F[6])}else{if(!!E.match(/^#[\da-fA-F]{6}$/)){D=E}else{D="#FFFFFF"}}return D};inputEx.registerType("color",inputEx.ColorField,[])})();(function(){var C=YAHOO.lang,A=YAHOO.util.Event,B=YAHOO.util.Dom;inputEx.DateField=function(D){inputEx.DateField.superclass.constructor.call(this,D)};C.extend(inputEx.DateField,inputEx.StringField,{setOptions:function(D){inputEx.DateField.superclass.setOptions.call(this,D);this.options.className=D.className?D.className:"inputEx-Field inputEx-DateField";this.options.messages.invalid=inputEx.messages.invalidDate?inputEx.messages.invalidDate:"Invalid date, ex: 03/27/2008";this.options.dateFormat=D.dateFormat||inputEx.messages.defaultDateFormat;this.options.valueFormat=D.valueFormat},validate:function(){var L=this.el.value;var I=this.options.dateFormat.match(/[^Ymd ]/g)[0];var M=L.split(I);if(M.length!=3){return false}if(isNaN(parseInt(M[0],10))||isNaN(parseInt(M[1],10))||isNaN(parseInt(M[2],10))){return false}var H=this.options.dateFormat.split(I);var D=inputEx.indexOf("Y",H);if(M[D].length!=4){return false}var K=parseInt(M[inputEx.indexOf("d",H)],10);var E=parseInt(M[D],10);var G=parseInt(M[inputEx.indexOf("m",H)],10)-1;var J=new Date(E,G,K);var F=J.getFullYear();return((J.getDate()==K)&&(J.getMonth()==G)&&(F==E))},setValue:function(G,E){if(G===""){inputEx.DateField.superclass.setValue.call(this,"",E);return }var F="";if(G instanceof Date){F=inputEx.DateField.formatDate(G,this.options.dateFormat)}else{if(this.options.valueFormat){var D=inputEx.DateField.parseWithFormat(G,this.options.valueFormat);F=inputEx.DateField.formatDate(D,this.options.dateFormat)}else{F=G}}inputEx.DateField.superclass.setValue.call(this,F,E)},getValue:function(D){var F=inputEx.DateField.superclass.getValue.call(this);if(F===""){return""}var E=inputEx.DateField.parseWithFormat(F,this.options.dateFormat);if(!D&&this.options.valueFormat){return inputEx.DateField.formatDate(E,this.options.valueFormat)}return E}});inputEx.DateField.parseWithFormat=function(I,H){var G=H.match(/[^Ymd ]/g)[0];var E=I.split(G);var F=H.split(G);var K=parseInt(E[inputEx.indexOf("d",F)],10);var J=parseInt(E[inputEx.indexOf("Y",F)],10);var D=parseInt(E[inputEx.indexOf("m",F)],10)-1;return(new Date(J,D,K))};inputEx.DateField.formatDate=function(H,F){var G=F.replace("Y",H.getFullYear());var D=H.getMonth()+1;G=G.replace("m",((D<10)?"0":"")+D);var E=H.getDate();G=G.replace("d",((E<10)?"0":"")+E);return G};inputEx.registerType("date",inputEx.DateField,[{type:"select",label:"Date format",name:"dateFormat",choices:[{value:"m/d/Y"},{value:"d/m/Y"}]}])})();(function(){var B=YAHOO.lang,A=YAHOO.util.Event;inputEx.DateSplitField=function(C){if(!C.dateFormat){C.dateFormat=inputEx.messages.defaultDateFormat}var E=C.dateFormat.split("/");this.yearIndex=inputEx.indexOf("Y",E);this.monthIndex=inputEx.indexOf("m",E);this.dayIndex=inputEx.indexOf("d",E);C.fields=[];for(var D=0;D<3;D++){if(D==this.dayIndex){C.fields.push({type:"integer",typeInvite:inputEx.messages.dayTypeInvite,size:2,trim:true})}else{if(D==this.yearIndex){C.fields.push({type:"integer",typeInvite:inputEx.messages.yearTypeInvite,size:4,trim:true})}else{C.fields.push({type:"integer",typeInvite:inputEx.messages.monthTypeInvite,size:2,trim:true})}}}C.separators=C.separators||[false,"&nbsp;","&nbsp;",false];inputEx.DateSplitField.superclass.constructor.call(this,C);this.initAutoTab()};B.extend(inputEx.DateSplitField,inputEx.CombineField,{setValue:function(F,D){var C=[];if(!F||!B.isFunction(F.getTime)||!B.isNumber(F.getTime())){C[this.monthIndex]="";C[this.yearIndex]="";C[this.dayIndex]=""}else{for(var E=0;E<3;E++){C.push(E==this.dayIndex?F.getDate():(E==this.yearIndex?F.getFullYear():F.getMonth()+1))}}inputEx.DateSplitField.superclass.setValue.call(this,C,D)},getValue:function(){if(this.isEmpty()){return""}var C=inputEx.DateSplitField.superclass.getValue.call(this);return new Date(C[this.yearIndex],C[this.monthIndex]-1,C[this.dayIndex])},validate:function(){var E=inputEx.DateSplitField.superclass.validate.call(this);if(!E){return false}var D=inputEx.DateSplitField.superclass.getValue.call(this);var C=D[this.dayIndex];var G=D[this.monthIndex];var F=D[this.yearIndex];var H=this.getValue();if(H==""){return true}if(C==""||G==""||F==""){return false}if(F<0||F>9999||C<1||C>31||G<1||G>12){return false}return(H!="Invalid Date")},isEmpty:function(){var C=inputEx.DateSplitField.superclass.getValue.call(this);return(C[this.monthIndex]==""&&C[this.yearIndex]==""&&C[this.dayIndex]=="")},initAutoTab:function(){var C=[48,49,50,51,52,53,54,55,56,57];var F=function(G){for(var H=0,I=C.length;H<I;H++){if(G==C[H]){return true}}return false};var E=this;var D=function(G){B.later(0,E,function(){var H=E.inputs[G];if(H.el.value.length==H.options.size){E.inputs[G+1].focus()}})};A.addListener(this.inputs[0].el,"keypress",function(G){if(F(A.getCharCode(G))){D(0)}},this,true);A.addListener(this.inputs[1].el,"keypress",function(G){if(F(A.getCharCode(G))){D(1)}},this,true)}});inputEx.messages.monthTypeInvite="Month";inputEx.messages.dayTypeInvite="Day";inputEx.messages.yearTypeInvite="Year";inputEx.registerType("datesplit",inputEx.DateSplitField)})();(function(){var C=YAHOO.lang,A=YAHOO.util.Event,B=YAHOO.util.Dom;inputEx.DatePickerField=function(D){inputEx.DatePickerField.superclass.constructor.call(this,D)};C.extend(inputEx.DatePickerField,inputEx.DateField,{setOptions:function(D){inputEx.DatePickerField.superclass.setOptions.call(this,D);this.options.className=D.className?D.className:"inputEx-Field inputEx-DateField inputEx-PickerField inputEx-DatePickerField";this.options.readonly=YAHOO.lang.isUndefined(D.readonly)?true:D.readonly;this.options.calendar=D.calendar||inputEx.messages.defautCalendarOpts},renderComponent:function(){inputEx.DatePickerField.superclass.renderComponent.call(this);this.oOverlay=new YAHOO.widget.Overlay(B.generateId(),{visible:false});this.oOverlay.setBody(" ");this.oOverlay.body.id=B.generateId();this.button=new YAHOO.widget.Button({type:"menu",menu:this.oOverlay,label:"&nbsp;&nbsp;&nbsp;&nbsp;"});this.button.appendTo(this.wrapEl);this.oOverlay.render(this.wrapEl);B.setStyle(this.oOverlay.body.parentNode,"position","absolute");if(this.options.readonly){A.addListener(this.el,"click",function(){this.renderCalendar();if(!this.oOverlay.justHidden){this.button._showMenu()}},this,true)}this.oOverlay.hideEvent.subscribe(function(){this.oOverlay.justHidden=true;YAHOO.lang.later(250,this,function(){this.oOverlay.justHidden=false})},this,true);this.button.on("click",this.renderCalendar,this,true)},renderCalendar:function(){if(!!this.calendarRendered){return }var E=B.generateId();this.calendar=new YAHOO.widget.Calendar(E,this.oOverlay.body.id,this.options.calendar);if(inputEx.messages.shortMonths){this.calendar.cfg.setProperty("MONTHS_SHORT",inputEx.messages.shortMonths)}if(inputEx.messages.months){this.calendar.cfg.setProperty("MONTHS_LONG",inputEx.messages.months)}if(inputEx.messages.weekdays1char){this.calendar.cfg.setProperty("WEEKDAYS_1CHAR",inputEx.messages.weekdays1char)}if(inputEx.messages.shortWeekdays){this.calendar.cfg.setProperty("WEEKDAYS_SHORT",inputEx.messages.shortWeekdays)}var D=function(){var H=B.get(E).tBodies[0],G=H.getElementsByTagName("a"),F;if(G.length>0){B.batch(G,function(I){if(B.hasClass(I.parentNode,"today")){F=I}});if(!F){F=G[0]}C.later(0,F,function(){try{F.focus()}catch(I){}})}};this.calendar.renderEvent.subscribe(D,this.calendar,true);this.oOverlay.beforeShowEvent.subscribe(this.beforeShowOverlay,this,true);this.beforeShowOverlay();this.calendar.selectEvent.subscribe(function(J,H,L){if(!!this.ignoreBeforeShowOverlayCall){return }this.oOverlay.hide();var G=H[0][0];var I=G[0],K=G[1],F=G[2];this.setValue(new Date(I,K-1,F))},this,true);this.button.unsubscribe("click",this.renderCalendar);this.calendarRendered=true;this.oOverlay.hide();this.button._showMenu()},beforeShowOverlay:function(E){var D=this.getValue(true);if(!!this.calendar){if(!!D){this.ignoreBeforeShowOverlayCall=true;this.calendar.select(D);this.ignoreBeforeShowOverlayCall=false;this.calendar.cfg.setProperty("pagedate",(D.getMonth()+1)+"/"+D.getFullYear())}this.calendar.render()}},disable:function(){inputEx.DatePickerField.superclass.disable.call(this);this.button.set("disabled",true)},enable:function(){inputEx.DatePickerField.superclass.enable.call(this);this.button.set("disabled",false)}});inputEx.messages.defautCalendarOpts={navigator:true};inputEx.registerType("datepicker",inputEx.DatePickerField)})();(function(){inputEx.EmailField=function(A){inputEx.EmailField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.EmailField,inputEx.StringField,{setOptions:function(A){inputEx.EmailField.superclass.setOptions.call(this,A);this.options.messages.invalid=inputEx.messages.invalidEmail;this.options.regexp=inputEx.regexps.email;this.options.fixdomain=(YAHOO.lang.isUndefined(A.fixdomain)?false:!!A.fixdomain)},validateDomain:function(){var F,D,A,C,H,E,B,J;A=this.getValue();C=A.split("@")[1];H=[["gmail.com","gmail.com.br","_gmail.com","g-mail.com","g.mail.com","g_mail.com","gamail.com","gamil.com","gemail.com","ggmail.com","gimail.com","gmai.com","gmail.cim","gmail.co","gmaill.com","gmain.com","gmaio.com","gmal.com","gmali.com","gmeil.com","gmial.com","gmil.com","gtmail.com","igmail.com","gmail.fr"],["hotmail.co.uk","hotmail.com.uk"],["hotmail.com","hotmail.com.br","hotmail.br","0hotmail.com","8hotmail.com","_hotmail.com","ahotmail.com","ghotmail.com","gotmail.com","hatmail.com","hhotmail.com","ho0tmail.com","hogmail.com","hoimail.com","hoitmail.com","homail.com","homtail.com","hootmail.com","hopmail.com","hoptmail.com","hormail.com","hot.mail.com","hot_mail.com","hotail.com","hotamail.com","hotamil.com","hotemail.com","hotimail.com","hotlmail.com","hotmaail.com","hotmael.com","hotmai.com","hotmaial.com","hotmaiil.com","hotmail.acom","hotmail.bom","hotmail.ccom","hotmail.cm","hotmail.co","hotmail.coml","hotmail.comm","hotmail.con","hotmail.coom","hotmail.copm","hotmail.cpm","hotmail.lcom","hotmail.ocm","hotmail.om","hotmail.xom","hotmail2.com","hotmail_.com","hotmailc.com","hotmaill.com","hotmailo.com","hotmaio.com","hotmaiol.com","hotmais.com","hotmal.com","hotmall.com","hotmamil.com","hotmaol.com","hotmayl.com","hotmeil.com","hotmial.com","hotmil.com","hotmmail.com","hotmnail.com","hotmsil.com","hotnail.com","hotomail.com","hottmail.com","hotymail.com","hoymail.com","hptmail.com","htmail.com","htomail.com","ohotmail.com","otmail.com","rotmail.com","shotmail.com","hotmain.com"],["hotmail.fr","hotmail.ffr","hotmail.frr","hotmail.fr.br","hotmail.br","0hotmail.fr","8hotmail.fr","_hotmail.fr","ahotmail.fr","ghotmail.fr","gotmail.fr","hatmail.fr","hhotmail.fr","ho0tmail.fr","hogmail.fr","hoimail.fr","hoitmail.fr","homail.fr","homtail.fr","hootmail.fr","hopmail.fr","hoptmail.fr","hormail.fr","hot.mail.fr","hot_mail.fr","hotail.fr","hotamail.fr","hotamil.fr","hotemail.fr","hotimail.fr","hotlmail.fr","hotmaail.fr","hotmael.fr","hotmai.fr","hotmaial.fr","hotmaiil.fr","hotmail.frl","hotmail.frm","hotmail2.fr","hotmail_.fr","hotmailc.fr","hotmaill.fr","hotmailo.fr","hotmaio.fr","hotmaiol.fr","hotmais.fr","hotmal.fr","hotmall.fr","hotmamil.fr","hotmaol.fr","hotmayl.fr","hotmeil.fr","hotmial.fr","hotmil.fr","hotmmail.fr","hotmnail.fr","hotmsil.fr","hotnail.fr","hotomail.fr","hottmail.fr","hotymail.fr","hoymail.fr","hptmail.fr","htmail.fr","htomail.fr","ohotmail.fr","otmail.fr","rotmail.fr","shotmail.fr","hotmain.fr"],["yahoo.co.in","yaho.co.in","yahoo.co.cn","yahoo.co.n","yahoo.co.on","yahoo.coin","yahoo.com.in","yahoo.cos.in","yahoo.oc.in","yaoo.co.in","yhoo.co.in"],["yahoo.com.br","1yahoo.com.br","5yahoo.com.br","_yahoo.com.br","ayhoo.com.br","tahoo.com.br","uahoo.com.br","yagoo.com.br","yahho.com.br","yaho.com.br","yahoo.cm.br","yahoo.co.br","yahoo.com.ar","yahoo.com.b","yahoo.com.be","yahoo.com.ber","yahoo.com.bl","yahoo.com.brr","yahoo.com.brv","yahoo.com.bt","yahoo.com.nr","yahoo.coml.br","yahoo.con.br","yahoo.om.br","yahool.com.br","yahooo.com.br","yahoou.com.br","yaoo.com.br","yaroo.com.br","yhaoo.com.br","yhoo.com.br","yuhoo.com.br"],["yahoo.com","yahoomail.com","_yahoo.com","ahoo.com","ayhoo.com","eyahoo.com","hahoo.com","sahoo.com","yahho.com","yaho.com","yahol.com","yahoo.co","yahoo.con","yahoo.vom","yahoo0.com","yahoo1.com","yahool.com","yahooo.com","yahoou.com","yahoow.com","yahopo.com","yaloo.com","yaoo.com","yaroo.com","yayoo.com","yhaoo.com","yhoo.com","yohoo.com"],["yahoo.fr","yahoomail.fr","_yahoo.fr","ahoo.fr","ayhoo.fr","eyahoo.fr","hahoo.fr","sahoo.fr","yahho.fr","yaho.fr","yahol.fr","yahoo.co","yahoo.con","yahoo.vom","yahoo0.fr","yahoo1.fr","yahool.fr","yahooo.fr","yahoou.fr","yahoow.fr","yahopo.fr","yaloo.fr","yaoo.fr","yaroo.fr","yayoo.fr","yhaoo.fr","yhoo.fr","yohoo.fr"],["wanadoo.fr","wanadoo.frr","wanadoo.ffr","wanado.fr","wanadou.fr","wanadop.fr","wandoo.fr","wanaoo.fr","wannadoo.fr","wanadoo.com","wananadoo.fr","wanadoo.fe","wanaddo.fr","wanadoo.orange","waqnadoo.fr","wandaoo.fr","wannado.fr"],["msn.com","mns.com","msn.co"],["aol.com","aoel.com","aol.co"]];for(F=0,E=H.length;F<E;F++){B=H[F];for(D=0,J=B.length;D<J;D++){if(B.indexOf(C)===0){if(C===B[D]){return true}}else{if(C===B[D]){var I=YAHOO.util.Dom.generateId();var G=this;YAHOO.util.Event.addListener(I,"click",function(M){YAHOO.util.Event.stopEvent(M);var L=new RegExp(C,"i");var K=A.replace(L,B[0]);G.setValue(K)});this.options.messages.invalid=inputEx.messages.didYouMeant+"<a href='' id='"+I+"' style='color:blue;'>@"+B[0]+" ?</a>";return false}}}}return true},validate:function(){var A=inputEx.EmailField.superclass.validate.call(this);if(!!this.options.fixdomain){this.options.messages.invalid=inputEx.messages.invalidEmail;return A&&this.validateDomain()}else{return A}},getValue:function(){var A;A=inputEx.EmailField.superclass.getValue.call(this);return inputEx.removeAccents(A.toLowerCase())}});inputEx.messages.invalidEmail="Invalid email, ex: sample@test.com";inputEx.messages.didYouMeant="Did you mean : ";inputEx.registerType("email",inputEx.EmailField,[])})();(function(){inputEx.HiddenField=function(A){inputEx.HiddenField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.HiddenField,inputEx.Field,{render:function(){this.type=inputEx.HiddenField;this.divEl=inputEx.cn("div",null,{display:"none"});this.el=inputEx.cn("input",{type:"hidden"});this.rawValue="";if(this.options.name){this.el.name=this.options.name}this.divEl.appendChild(this.el)},setValue:function(B,A){this.el.value=B;this.rawValue=B;inputEx.HiddenField.superclass.setValue.call(this,B,A)},getValue:function(){return this.rawValue}});inputEx.registerType("hidden",inputEx.HiddenField)})();(function(){var D=YAHOO.lang,A=YAHOO.util.Event,B=YAHOO.util.Dom,C="inputEx-InPlaceEdit-";inputEx.InPlaceEdit=function(E){inputEx.InPlaceEdit.superclass.constructor.call(this,E)};D.extend(inputEx.InPlaceEdit,inputEx.Field,{setOptions:function(E){inputEx.InPlaceEdit.superclass.setOptions.call(this,E);this.options.visu=E.visu;this.options.editorField=E.editorField;this.options.buttonTypes=E.buttonTypes||{ok:"submit",cancel:"link"};this.options.animColors=E.animColors||null},renderComponent:function(){this.renderVisuDiv();this.renderEditor()},renderEditor:function(){this.editorContainer=inputEx.cn("div",{className:C+"editor"},{display:"none"});this.editorField=inputEx(this.options.editorField,this);var E=this.editorField.getEl();this.editorContainer.appendChild(E);B.addClass(E,C+"editorDiv");this.okButton=new inputEx.widget.Button({type:this.options.buttonTypes.ok,parentEl:this.editorContainer,value:inputEx.messages.okEditor,className:"inputEx-Button "+C+"OkButton",onClick:{fn:this.onOkEditor,scope:this}});this.cancelLink=new inputEx.widget.Button({type:this.options.buttonTypes.cancel,parentEl:this.editorContainer,value:inputEx.messages.cancelEditor,className:"inputEx-Button "+C+"CancelLink",onClick:{fn:this.onCancelEditor,scope:this}});this.editorContainer.appendChild(inputEx.cn("div",null,{clear:"both"}));this.fieldContainer.appendChild(this.editorContainer)},onVisuMouseOver:function(E){if(this.colorAnim){this.colorAnim.stop(true)}inputEx.sn(this.formattedContainer,null,{backgroundColor:this.options.animColors.from})},onVisuMouseOut:function(E){if(this.colorAnim){this.colorAnim.stop(true)}this.colorAnim=new YAHOO.util.ColorAnim(this.formattedContainer,{backgroundColor:this.options.animColors},1);this.colorAnim.onComplete.subscribe(function(){B.setStyle(this.formattedContainer,"background-color","")},this,true);this.colorAnim.animate()},renderVisuDiv:function(){this.formattedContainer=inputEx.cn("div",{className:"inputEx-InPlaceEdit-visu"});if(D.isFunction(this.options.formatDom)){this.formattedContainer.appendChild(this.options.formatDom(this.options.value))}else{if(D.isFunction(this.options.formatValue)){this.formattedContainer.innerHTML=this.options.formatValue(this.options.value)}else{this.formattedContainer.innerHTML=D.isUndefined(this.options.value)?inputEx.messages.emptyInPlaceEdit:this.options.value}}this.fieldContainer.appendChild(this.formattedContainer)},initEvents:function(){A.addListener(this.formattedContainer,"click",this.openEditor,this,true);if(this.options.animColors){A.addListener(this.formattedContainer,"mouseover",this.onVisuMouseOver,this,true);A.addListener(this.formattedContainer,"mouseout",this.onVisuMouseOut,this,true)}if(this.editorField.el){A.addListener(this.editorField.el,"keyup",this.onKeyUp,this,true);A.addListener(this.editorField.el,"keydown",this.onKeyDown,this,true)}},onKeyUp:function(E){if(E.keyCode==13){this.onOkEditor(E)}if(E.keyCode==27){this.onCancelEditor(E)}},onKeyDown:function(E){if(E.keyCode==9){this.onOkEditor(E)}},onOkEditor:function(G){A.stopEvent(G);var F=this.editorField.getValue();this.setValue(F);this.editorContainer.style.display="none";this.formattedContainer.style.display="";var E=this;setTimeout(function(){E.updatedEvt.fire(F)},50)},onCancelEditor:function(E){A.stopEvent(E);this.editorContainer.style.display="none";this.formattedContainer.style.display=""},openEditor:function(){var E=this.getValue();this.editorContainer.style.display="";this.formattedContainer.style.display="none";if(!D.isUndefined(E)){this.editorField.setValue(E)}this.editorField.focus();if(this.editorField.el&&D.isFunction(this.editorField.el.setSelectionRange)&&(!!E&&!!E.length)){this.editorField.el.setSelectionRange(0,E.length)}},getValue:function(){var E=(this.editorContainer.style.display=="");return E?this.editorField.getValue():this.value},setValue:function(F,E){this.value=F;if(D.isUndefined(F)||F==""){inputEx.renderVisu(this.options.visu,inputEx.messages.emptyInPlaceEdit,this.formattedContainer)}else{inputEx.renderVisu(this.options.visu,this.value,this.formattedContainer)}if(this.editorContainer.style.display==""){this.editorField.setValue(F)}inputEx.InPlaceEdit.superclass.setValue.call(this,F,E)},close:function(){this.editorContainer.style.display="none";this.formattedContainer.style.display=""}});inputEx.messages.emptyInPlaceEdit="(click to edit)";inputEx.messages.cancelEditor="cancel";inputEx.messages.okEditor="Ok";inputEx.registerType("inplaceedit",inputEx.InPlaceEdit,[{type:"type",label:"Editor",name:"editorField"}])})();(function(){var B=YAHOO.lang,A=YAHOO.util.Event;inputEx.IntegerField=function(C){inputEx.IntegerField.superclass.constructor.call(this,C)};YAHOO.lang.extend(inputEx.IntegerField,inputEx.StringField,{setOptions:function(C){inputEx.IntegerField.superclass.setOptions.call(this,C);this.options.negative=B.isUndefined(C.negative)?false:C.negative;this.options.min=B.isUndefined(C.min)?(this.options.negative?-Infinity:0):parseInt(C.min,10);this.options.max=B.isUndefined(C.max)?Infinity:parseInt(C.max,10)},getValue:function(){var C;C=inputEx.IntegerField.superclass.getValue.call(this);if(C===""){return""}return parseInt(C,10)},validate:function(){var C=this.getValue(),D=inputEx.IntegerField.superclass.getValue.call(this);if(C===""){return !this.options.required}if(isNaN(C)){return false}return !!D.match(/^[\+\-]?[0-9]+$/)&&(this.options.negative?true:C>=0)&&C>=this.options.min&&C<=this.options.max}});inputEx.registerType("integer",inputEx.IntegerField,[{type:"boolean",label:"Accept negative",name:"negative",value:false}])})();(function(){var C=YAHOO.lang,A=YAHOO.util.Event,B=YAHOO.util.Dom;inputEx.ListField=function(D){this.subFields=[];inputEx.ListField.superclass.constructor.call(this,D)};C.extend(inputEx.ListField,inputEx.Field,{arrowAnimColors:{from:"#eeee33",to:"#eeeeee"},setOptions:function(D){inputEx.ListField.superclass.setOptions.call(this,D);this.options.className=D.className?D.className:"inputEx-Field inputEx-ListField";this.options.sortable=C.isUndefined(D.sortable)?false:D.sortable;this.options.elementType=D.elementType||{type:"string"};this.options.useButtons=C.isUndefined(D.useButtons)?false:D.useButtons;this.options.unique=C.isUndefined(D.unique)?false:D.unique;this.options.listAddLabel=D.listAddLabel||inputEx.messages.listAddLink;this.options.listRemoveLabel=D.listRemoveLabel||inputEx.messages.listRemoveLink;this.options.maxItems=D.maxItems;this.options.minItems=D.minItems},renderComponent:function(){if(this.options.useButtons){this.addButton=inputEx.cn("img",{src:inputEx.spacerUrl,className:"inputEx-ListField-addButton"});this.fieldContainer.appendChild(this.addButton)}this.fieldContainer.appendChild(inputEx.cn("span",null,{marginLeft:"4px"},this.options.listLabel));this.childContainer=inputEx.cn("div",{className:"inputEx-ListField-childContainer"});this.fieldContainer.appendChild(this.childContainer);if(!this.options.useButtons){this.addButton=inputEx.cn("a",{className:"inputEx-List-link"},null,this.options.listAddLabel);this.fieldContainer.appendChild(this.addButton)}},initEvents:function(){A.addListener(this.addButton,"click",this.onAddButton,this,true)},validate:function(){var F=true;var J={};var D=this.subFields.length;if(C.isNumber(this.options.minItems)&&D<this.options.minItems){F=false}if(C.isNumber(this.options.maxItems)&&D>this.options.maxItems){F=false}for(var G=0;G<D&&F;G++){var E=this.subFields[G];E.setClassFromState();var H=E.getState();if(H==inputEx.stateRequired||H==inputEx.stateInvalid){F=false}if(this.options.unique){var I=C.dump(E.getValue());if(J[I]){F=false}else{J[I]=true}}}return F},setValue:function(G,D){if(!C.isArray(G)){throw new Error("inputEx.ListField.setValue expected an array, got "+(typeof G))}for(var F=0;F<G.length;F++){if(F==this.subFields.length){this.addElement(G[F])}else{this.subFields[F].setValue(G[F],false)}}var E=this.subFields.length-G.length;if(E>0){for(F=0;F<E;F++){this.removeElement(G.length)}}inputEx.ListField.superclass.setValue.call(this,G,D)},getValue:function(){var D=[];for(var E=0;E<this.subFields.length;E++){D[E]=this.subFields[E].getValue()}return D},addElement:function(E){var D=this.renderSubField(E);if(this.options.name){D.setFieldName(this.options.name+"["+this.subFields.length+"]")}this.subFields.push(D);return D},resetAllNames:function(){if(this.options.name){for(var E=0;E<this.subFields.length;E++){var D=this.subFields[E];D.setFieldName(this.options.name+"["+E+"]")}}},onAddButton:function(E){A.stopEvent(E);if(C.isNumber(this.options.maxItems)&&this.subFields.length>=this.options.maxItems){return }var D=this.addElement();D.focus();this.fireUpdatedEvt()},renderSubField:function(K){var G=inputEx.cn("div"),E;if(this.options.useButtons){E=inputEx.cn("img",{src:inputEx.spacerUrl,className:"inputEx-ListField-delButton"});A.addListener(E,"click",this.onDelete,this,true);G.appendChild(E)}var J=C.merge({},this.options.elementType);if(C.isObject(J.inputParams)&&!C.isUndefined(K)){J.inputParams.value=K}else{if(!C.isUndefined(K)){J.value=K}}var H=inputEx(J,this);var F=H.getEl();YAHOO.util.Dom.addClass(F,"inputEx-ListField-subFieldEl");G.appendChild(F);H.updatedEvt.subscribe(this.onChange,this,true);if(this.options.sortable){var I=inputEx.cn("div",{className:"inputEx-ListField-Arrow inputEx-ListField-ArrowUp"});A.addListener(I,"click",this.onArrowUp,this,true);var D=inputEx.cn("div",{className:"inputEx-ListField-Arrow inputEx-ListField-ArrowDown"});A.addListener(D,"click",this.onArrowDown,this,true);G.appendChild(I);G.appendChild(D)}if(!this.options.useButtons){E=inputEx.cn("a",{className:"inputEx-List-link"},null,this.options.listRemoveLabel);A.addListener(E,"click",this.onDelete,this,true);G.appendChild(E)}G.appendChild(inputEx.cn("div",null,{clear:"both"}));this.childContainer.appendChild(G);return H},onArrowUp:function(J){var G=A.getTarget(J).parentNode;var E=null;var F=-1;for(var H=1;H<G.parentNode.childNodes.length;H++){var D=G.parentNode.childNodes[H];if(D==G){E=G.parentNode.childNodes[H-1];F=H;break}}if(E){var K=this.childContainer.removeChild(G);var I=this.childContainer.insertBefore(K,E);var L=this.subFields[F];this.subFields[F]=this.subFields[F-1];this.subFields[F-1]=L;this.resetAllNames();if(this.arrowAnim){this.arrowAnim.stop(true)}this.arrowAnim=new YAHOO.util.ColorAnim(I,{backgroundColor:this.arrowAnimColors},0.4);this.arrowAnim.onComplete.subscribe(function(){B.setStyle(I,"background-color","")});this.arrowAnim.animate();this.fireUpdatedEvt()}},onArrowDown:function(J){var F=A.getTarget(J).parentNode;var E=-1;var I=null;for(var G=0;G<F.parentNode.childNodes.length;G++){var D=F.parentNode.childNodes[G];if(D==F){I=F.parentNode.childNodes[G+1];E=G;break}}if(I){var K=this.childContainer.removeChild(F);var H=B.insertAfter(K,I);var L=this.subFields[E];this.subFields[E]=this.subFields[E+1];this.subFields[E+1]=L;this.resetAllNames();if(this.arrowAnim){this.arrowAnim.stop(true)}this.arrowAnim=new YAHOO.util.ColorAnim(H,{backgroundColor:this.arrowAnimColors},1);this.arrowAnim.onComplete.subscribe(function(){B.setStyle(H,"background-color","")});this.arrowAnim.animate();this.fireUpdatedEvt()}},onDelete:function(H){A.stopEvent(H);if(C.isNumber(this.options.minItems)&&this.subFields.length<=this.options.minItems){return }var E=A.getTarget(H).parentNode;var D=-1;var G=E.childNodes[this.options.useButtons?1:0];for(var F=0;F<this.subFields.length;F++){if(this.subFields[F].getEl()==G){D=F;break}}if(D!=-1){this.removeElement(D)}this.resetAllNames();this.fireUpdatedEvt()},removeElement:function(E){var D=this.subFields[E].getEl().parentNode;this.subFields[E]=undefined;this.subFields=inputEx.compactArray(this.subFields);D.parentNode.removeChild(D)}});inputEx.registerType("list",inputEx.ListField,[{type:"string",label:"List label",name:"listLabel",value:""},{type:"type",label:"List element type",required:true,name:"elementType"}]);inputEx.messages.listAddLink="Add";inputEx.messages.listRemoveLink="remove"})();(function(){var A=YAHOO.util.Event,B=YAHOO.lang;inputEx.NumberField=function(C){inputEx.NumberField.superclass.constructor.call(this,C)};YAHOO.lang.extend(inputEx.NumberField,inputEx.StringField,{setOptions:function(C){inputEx.NumberField.superclass.setOptions.call(this,C);this.options.min=B.isUndefined(C.min)?-Infinity:parseFloat(C.min);this.options.max=B.isUndefined(C.max)?Infinity:parseFloat(C.max)},getValue:function(){var C;C=inputEx.NumberField.superclass.getValue.call(this);if(C===""){return""}return parseFloat(C)},validate:function(){var C=this.getValue(),D=inputEx.NumberField.superclass.getValue.call(this);if(C===""){return !this.options.required}if(isNaN(C)){return false}return !!D.match(/^([\+\-]?((([0-9]+(\.)?)|([0-9]*\.[0-9]+))([eE][+-]?[0-9]+)?))$/)&&C>=this.options.min&&C<=this.options.max}});inputEx.registerType("number",inputEx.NumberField,[])})();(function(){var A=YAHOO.util.Event,B=YAHOO.lang;inputEx.PasswordField=function(C){inputEx.PasswordField.superclass.constructor.call(this,C)};inputEx.PasswordField.byId={};B.extend(inputEx.PasswordField,inputEx.StringField,{setOptions:function(C){inputEx.PasswordField.superclass.setOptions.call(this,C);this.options.className=C.className?C.className:"inputEx-Field inputEx-PasswordField";this.options.regexp=C.regexp||inputEx.regexps.password;this.options.strengthIndicator=YAHOO.lang.isUndefined(C.strengthIndicator)?false:C.strengthIndicator;this.options.capsLockWarning=YAHOO.lang.isUndefined(C.capsLockWarning)?false:C.capsLockWarning;inputEx.PasswordField.byId[C.id]=this;var D;if(C.confirm&&(D=inputEx.PasswordField.byId[C.confirm])){this.setConfirmationField(D)}},renderComponent:function(){this.wrapEl=inputEx.cn("div",{className:"inputEx-StringField-wrapper"});var C={};C.type="password";C.size=this.options.size;if(this.options.name){C.name=this.options.name}this.el=inputEx.cn("input",C);this.wrapEl.appendChild(this.el);this.fieldContainer.appendChild(this.wrapEl);if(this.options.capsLockWarning){this.capsLockWarning=inputEx.cn("div",{className:"capsLockWarning"},{display:"none"},inputEx.messages.capslockWarning);this.wrapEl.appendChild(this.capsLockWarning)}if(this.options.strengthIndicator){this.strengthEl=inputEx.cn("div",{className:"inputEx-Password-StrengthIndicator"},null,inputEx.messages.passwordStrength);this.strengthBlocks=[];for(var D=0;D<4;D++){this.strengthBlocks[D]=inputEx.cn("div",{className:"inputEx-Password-StrengthIndicatorBlock"});this.strengthEl.appendChild(this.strengthBlocks[D])}this.wrapEl.appendChild(this.strengthEl)}},setConfirmationField:function(C){this.options.confirmPasswordField=C;this.options.messages.invalid=inputEx.messages.invalidPasswordConfirmation;this.options.confirmPasswordField.options.confirmationPasswordField=this},validate:function(){if(this.options.confirmPasswordField){if(this.options.confirmPasswordField.getValue()!=this.getValue()){return false}}return inputEx.PasswordField.superclass.validate.call(this)},getStateString:function(C){if(C==inputEx.stateInvalid&&this.options.minLength&&this.el.value.length<this.options.minLength){return inputEx.messages.invalidPassword[0]+this.options.minLength+inputEx.messages.invalidPassword[1]}return inputEx.StringField.superclass.getStateString.call(this,C)},onInput:function(C){inputEx.PasswordField.superclass.onInput.call(this,C);if(this.options.confirmationPasswordField){this.options.confirmationPasswordField.setClassFromState()}},onKeyPress:function(G){inputEx.PasswordField.superclass.onKeyPress.call(this,G);if(this.options.capsLockWarning){var F=G?G:window.event;if(!F){return }var D=F.target?F.target:F.srcElement;var H=-1;if(F.which){H=F.which}else{if(F.keyCode){H=F.keyCode}}var E=false;if(F.shiftKey){E=F.shiftKey}else{if(F.modifiers){E=!!(F.modifiers&4)}}var C=((H>=65&&H<=90)&&!E)||((H>=97&&H<=122)&&E);this.setCapsLockWarning(C)}},onKeyUp:function(C){inputEx.PasswordField.superclass.onKeyUp.call(this,C);if(this.options.strengthIndicator){B.later(0,this,this.updateStrengthIndicator)}},setCapsLockWarning:function(C){this.capsLockWarning.style.display=C?"":"none"},updateStrengthIndicator:function(){var E=inputEx.PasswordField.getPasswordStrength(this.getValue());for(var D=0;D<4;D++){var C=(E>=D*25)&&(E>0);YAHOO.util.Dom.setStyle(this.strengthBlocks[D],"background-color",C?"#4AE817":"#FFFFFF")}}});inputEx.PasswordField.getPasswordStrength=function(J){var F=(J.length);if(F>7){F=7}var H=J.replace(/[0-9]/g,"");var I=(J.length-H.length);if(I>3){I=3}var C=J.replace(/\W/g,"");var E=(J.length-C.length);if(E>3){E=3}var D=J.replace(/[A-Z]/g,"");var K=(J.length-D.length);if(K>3){K=3}var G=((F*10)-20)+(I*10)+(E*20)+(K*10);if(G<0){G=0}if(G>100){G=100}return G};inputEx.messages.invalidPassword=["The password schould contain at least "," numbers or characters"];inputEx.messages.invalidPasswordConfirmation="Passwords are different !";inputEx.messages.capslockWarning="Warning: CapsLock is on";inputEx.messages.passwordStrength="Password Strength";inputEx.registerType("password",inputEx.PasswordField,[{type:"boolean",label:"Strength indicator",name:"strengthIndicator",value:false},{type:"boolean",label:"CapsLock warning",name:"capsLockWarning",value:false}])})();(function(){var C=YAHOO.lang,A=YAHOO.util.Event,B=YAHOO.util.Dom;inputEx.RadioField=function(D){inputEx.RadioField.superclass.constructor.call(this,D);if(YAHOO.env.ua.ie&&!C.isUndefined(this.options.value)){var E=this;setTimeout(function(){E.setValue(E.options.value,false)},0)}};C.extend(inputEx.RadioField,inputEx.Field,{setOptions:function(D){var E,F;inputEx.RadioField.superclass.setOptions.call(this,D);this.options.display=D.display==="vertically"?"vertically":"inline";this.options.className=D.className?D.className:"inputEx-Field inputEx-RadioField";if(this.options.display==="vertically"){this.options.className+=" inputEx-RadioField-Vertically"}if(C.isArray(D.values)){this.options.choices=[];for(E=0,F=D.values.length;E<F;E+=1){this.options.choices.push({value:D.values[E],label:D.choices[E]})}}else{this.options.choices=D.choices}if(C.isUndefined(D.allowAny)||D.allowAny===false){this.options.allowAny=false}else{this.options.allowAny={};if(C.isArray(D.allowAny.separators)){this.options.allowAny.separators=D.allowAny.separators}this.options.allowAny.validator=C.isFunction(D.allowAny.validator)?D.allowAny.validator:function(G){return true};this.options.allowAny.value=!C.isUndefined(D.allowAny.value)?D.allowAny.value:"";this.options.allowAny.field=C.isUndefined(D.allowAny.field)?{type:"string",value:this.options.allowAny.value}:D.allowAny.field}},renderComponent:function(){var G,F,E,D;this.choicesList=[];G=this.options.choices;for(E=0,F=G.length;E<F;E+=1){this.addChoice(G[E])}if(this.options.allowAny){this.allowAnyChoice=this.addChoice({value:this.options.allowAny.value,label:""});this.radioAny=this.allowAnyChoice.node.firstChild;this.anyField=new inputEx(this.options.allowAny.field);this.anyField.disable();B.setStyle(this.radioAny,"float","left");B.setStyle(this.anyField.getEl(),"float","left");if(YAHOO.env.ua.gecko>=1.91){B.setStyle(this.radioAny,"marginTop","0.2em")}if(this.options.allowAny.separators){D=inputEx.cn("div",null,{marginRight:"3px"},this.options.allowAny.separators[0]||"");B.setStyle(D,"float","left");this.allowAnyChoice.node.appendChild(D)}this.allowAnyChoice.node.appendChild(this.anyField.getEl());if(this.options.allowAny.separators){D=inputEx.cn("div",null,{marginLeft:"3px"},this.options.allowAny.separators[1]||"");B.setStyle(D,"float","left");this.allowAnyChoice.node.appendChild(D)}}},initEvents:function(){A.delegate(this.fieldContainer,YAHOO.env.ua.ie?"click":"change",function(F,E,D){this.onChange(F)},"input.inputEx-RadioField-radio",this,true);A.delegate(this.fieldContainer,"focusin",function(F,E,D){this.onFocus(F)},"input.inputEx-RadioField-radio",this,true);A.delegate(this.fieldContainer,"focusout",function(F,E,D){this.onBlur(F)},"input.inputEx-RadioField-radio",this,true);if(this.allowAnyChoice){this.anyField.updatedEvt.subscribe(function(E,F){var D=F[0];this.radioAny.value=D;this.setClassFromState();inputEx.RadioField.superclass.onChange.call(this,E)},this,true);A.addBlurListener(this.anyField.el,this.onBlur,this,true)}},setSelectedClass:function(){var D,E;for(D=0,E=this.choicesList.length;D<E;D+=1){if(this.choicesList[D].node.firstChild.checked){B.addClass(this.choicesList[D].node,"inputEx-selected")}else{B.removeClass(this.choicesList[D].node,"inputEx-selected")}}},setClassFromState:function(){inputEx.RadioField.superclass.setClassFromState.call(this);this.setSelectedClass()},onChange:function(E){var D=A.getTarget(E);if(this.allowAnyChoice){if(inputEx.indexOf(D,this.choicesList,function(G,F){return G===F.node.firstChild})!==-1&&this.radioAny!==D){this.anyField.disable()}else{this.anyField.enable();C.later(50,this.anyField,"focus")}}this.setSelectedClass();inputEx.RadioField.superclass.onChange.call(this,E)},getValue:function(){var D,E;for(D=0,E=this.choicesList.length;D<E;D+=1){if(this.choicesList[D].node.firstChild.checked){if(this.radioAny&&this.radioAny==this.choicesList[D].node.firstChild){return this.anyField.getValue()}return this.choicesList[D].value}}return""},setValue:function(I,E){var G=true,D=false,F,H;for(F=0,H=this.choicesList.length;F<H;F+=1){if(I===this.choicesList[F].value&&!D){this.choicesList[F].node.firstChild.checked=true;D=true;G=false}else{this.choicesList[F].node.firstChild.checked=false}}if(this.radioAny){if(G){this.radioAny.checked=true;this.radioAny.value=I;this.anyField.enable();this.anyField.setValue(I,false)}else{this.anyField.disable()}}inputEx.RadioField.superclass.setValue.call(this,I,E)},clear:function(D){if(this.radioAny){this.anyField.setValue(this.options.allowAny.value,false)}inputEx.RadioField.superclass.clear.call(this,D)},isEmpty:function(){var D,E,F;for(D=0,E=this.choicesList.length;D<E;D+=1){F=this.choicesList[D].node.firstChild;if(F.checked){if(this.radioAny&&this.radioAny==F){return this.anyField.getValue()===""}else{return false}}}return true},validate:function(){var D,E,F,G;if(this.options.allowAny){for(D=0,E=this.choicesList.length;D<E;D+=1){F=this.choicesList[D].node.firstChild;if(F.checked){if(this.radioAny&&this.radioAny==F){G=this.anyField.getValue();return this.anyField.validate()&&this.options.allowAny.validator(G)}}}}return true},disable:function(){var D,E;for(D=0,E=this.choicesList.length;D<E;D+=1){this.disableChoice(this.choicesList[D],false)}},enable:function(){var D,E;for(D=0,E=this.choicesList.length;D<E;D+=1){this.enableChoice(this.choicesList[D])}},createChoiceNode:function(D){var H,F,G,E;H=inputEx.cn("div",{className:"inputEx-RadioField-choice"});F=YAHOO.util.Dom.generateId();G=inputEx.cn("input",{id:F,type:"radio",name:this.options.name,value:D.value,className:"inputEx-RadioField-radio"});H.appendChild(G);if(D.label.length>0){E=inputEx.cn("label",{"for":F,className:"inputEx-RadioField-rightLabel"},null,""+D.label);H.appendChild(E)}return H},removeChoiceNode:function(D){this.fieldContainer.removeChild(D)},disableChoiceNode:function(D){D.firstChild.disabled=true},enableChoiceNode:function(D){D.firstChild.disabled=false},appendChoiceNode:function(F,D){var G,E;G=0;for(E=0;E<D;E+=1){if(this.choicesList[E].visible){G+=1}}if(G<this.fieldContainer.childNodes.length){YAHOO.util.Dom.insertBefore(F,this.fieldContainer.childNodes[G])}else{this.fieldContainer.appendChild(F)}}});C.augmentObject(inputEx.RadioField.prototype,inputEx.mixin.choice);inputEx.registerType("radio",inputEx.RadioField,[{type:"list",name:"choices",label:"Choices",elementType:{type:"group",fields:[{label:"Value",name:"value",value:""},{label:"Label",name:"label"}]},value:[],required:true},{type:"boolean",label:"Allow custom value",name:"allowAny",value:false}])})();(function(){var A=YAHOO.lang;inputEx.RTEField=function(B){inputEx.RTEField.superclass.constructor.call(this,B)};A.extend(inputEx.RTEField,inputEx.Field,{setOptions:function(B){inputEx.RTEField.superclass.setOptions.call(this,B);this.options.opts=B.opts||{};this.options.editorType=B.editorType},renderComponent:function(){if(!inputEx.RTEfieldsNumber){inputEx.RTEfieldsNumber=0}var G="inputEx-RTEField-"+inputEx.RTEfieldsNumber;var C={id:G};if(this.options.name){C.name=this.options.name}this.el=inputEx.cn("textarea",C);inputEx.RTEfieldsNumber+=1;this.fieldContainer.appendChild(this.el);var E={height:"300px",width:"580px",dompath:true,filterWord:true};var F=this.options.opts;for(var D in F){if(A.hasOwnProperty(F,D)){E[D]=F[D]}}var B=((this.options.editorType&&(this.options.editorType=="simple"))?YAHOO.widget.SimpleEditor:YAHOO.widget.Editor);if(B){this.editor=new B(G,E);this.editor.render()}else{alert("Editor is not on the page")}this.editor.filter_msword=function(H){H=B.prototype.filter_msword.call(this,H);if(!this.get("filterWord")){return H}H=H.replace(/<!--[^>][\s\S]*-->/gi,"");H=H.replace(/<\/?meta[^>]*>/gi,"");H=H.replace(/<\/?link[^>]*>/gi,"");H=H.replace(/ class=('|")?MsoNormal('|")?/gi,"");H=YAHOO.lang.trim(H);return H}},setValue:function(C,B){if(this.editor){var D=this.el.id+"_editor";if(!YAHOO.util.Dom.get(D)){this.el.value=C}else{this.editor.setEditorHTML(C)}}if(B!==false){this.fireUpdatedEvt()}},getValue:function(){var C;try{C=this.editor.saveHTML();return C}catch(B){return null}}});inputEx.registerType("html",inputEx.RTEField,[])})();(function(){var A=YAHOO.util.Event,B=YAHOO.lang;inputEx.SelectField=function(C){inputEx.SelectField.superclass.constructor.call(this,C)};B.extend(inputEx.SelectField,inputEx.Field,{setOptions:function(C){var D,E;inputEx.SelectField.superclass.setOptions.call(this,C);this.options.choices=B.isArray(C.choices)?C.choices:[];if(B.isArray(C.selectValues)){for(D=0,E=C.selectValues.length;D<E;D+=1){this.options.choices.push({value:C.selectValues[D],label:""+((C.selectOptions&&!B.isUndefined(C.selectOptions[D]))?C.selectOptions[D]:C.selectValues[D])})}}},renderComponent:function(){var C,D;this.el=inputEx.cn("select",{id:this.divEl.id?this.divEl.id+"-field":YAHOO.util.Dom.generateId(),name:this.options.name||""});this.choicesList=[];for(C=0,D=this.options.choices.length;C<D;C+=1){this.addChoice(this.options.choices[C])}this.fieldContainer.appendChild(this.el)},initEvents:function(){A.addListener(this.el,"change",this.onChange,this,true);A.addFocusListener(this.el,this.onFocus,this,true);A.addBlurListener(this.el,this.onBlur,this,true)},setValue:function(H,D){var E,G,C,F,I=false;for(E=0,G=this.choicesList.length;E<G;E+=1){if(this.choicesList[E].visible){C=this.choicesList[E];if(H===C.value){C.node.selected="selected";I=true;break}else{if(B.isUndefined(F)){F=E}}}}if(!I&&!B.isUndefined(F)){C=this.choicesList[F];C.node.selected="selected";H=C.value}inputEx.SelectField.superclass.setValue.call(this,H,D)},getValue:function(){var C;if(this.el.selectedIndex>=0){C=inputEx.indexOf(this.el.childNodes[this.el.selectedIndex],this.choicesList,function(E,D){return E===D.node});return this.choicesList[C].value}else{return""}},disable:function(){this.el.disabled=true},enable:function(){this.el.disabled=false},createChoiceNode:function(C){return inputEx.cn("option",{value:C.value},null,C.label)},removeChoiceNode:function(C){this.el.removeChild(C)},disableChoiceNode:function(C){C.disabled="disabled"},enableChoiceNode:function(C){C.removeAttribute("disabled")},appendChoiceNode:function(E,C){var F,D;F=0;for(D=0;D<C;D+=1){if(this.choicesList[D].visible){F+=1}}if(F<this.el.childNodes.length){YAHOO.util.Dom.insertBefore(E,this.el.childNodes[F])}else{this.el.appendChild(E)}}});B.augmentObject(inputEx.SelectField.prototype,inputEx.mixin.choice);inputEx.registerType("select",inputEx.SelectField,[{type:"list",name:"choices",label:"Choices",elementType:{type:"group",fields:[{label:"Value",name:"value",value:""},{label:"Label",name:"label"}]},value:[],required:true}])}());(function(){var A=YAHOO.util.Event;inputEx.Textarea=function(B){inputEx.Textarea.superclass.constructor.call(this,B)};YAHOO.lang.extend(inputEx.Textarea,inputEx.StringField,{setOptions:function(B){inputEx.Textarea.superclass.setOptions.call(this,B);this.options.rows=B.rows||6;this.options.cols=B.cols||23;this.options.readonly=!!B.readonly},renderComponent:function(){this.wrapEl=inputEx.cn("div",{className:"inputEx-StringField-wrapper"});var B={};B.id=this.divEl.id?this.divEl.id+"-field":YAHOO.util.Dom.generateId();B.rows=this.options.rows;B.cols=this.options.cols;if(this.options.name){B.name=this.options.name}if(this.options.readonly){B.readonly="readonly"}this.el=inputEx.cn("textarea",B,null,this.options.value);this.wrapEl.appendChild(this.el);this.fieldContainer.appendChild(this.wrapEl)},validate:function(){var B=inputEx.Textarea.superclass.validate.call(this);if(this.options.maxLength){B=B&&this.getValue().length<=this.options.maxLength}return B},getStateString:function(B){if(B==inputEx.stateInvalid&&this.options.minLength&&this.el.value.length<this.options.minLength){return inputEx.messages.stringTooShort[0]+this.options.minLength+inputEx.messages.stringTooShort[1]}else{if(B==inputEx.stateInvalid&&this.options.maxLength&&this.el.value.length>this.options.maxLength){return inputEx.messages.stringTooLong[0]+this.options.maxLength+inputEx.messages.stringTooLong[1]}}return inputEx.Textarea.superclass.getStateString.call(this,B)},insert:function(E){var D,C,B;if(document.selection){this.el.focus();D=document.selection.createRange();D.text=E}else{if(this.el.selectionStart||this.el.selectionStart=="0"){C=this.el.selectionStart;B=this.el.selectionEnd;this.el.value=this.el.value.substring(0,C)+E+this.el.value.substring(B,this.el.value.length)}else{this.el.value+=E}}}});inputEx.messages.stringTooLong=["This field should contain at most "," numbers or characters"];inputEx.registerType("text",inputEx.Textarea,[{type:"integer",label:"Rows",name:"rows",value:6},{type:"integer",label:"Cols",name:"cols",value:23}])})();(function(){var A=YAHOO.util.Event,B=YAHOO.lang;inputEx.TimeField=function(D){var H=[],F,C=[],E=[],G;for(F=0;F<24;F++){G="";if(F<10){G="0"}G+=F;H.push({value:G})}for(F=0;F<60;F++){G="";if(F<10){G="0"}G+=F;C.push({value:G});E.push({value:G})}D.fields=[{type:"select",choices:H},{type:"select",choices:C},{type:"select",choices:E}];D.separators=D.separators||[false,":",":",false];inputEx.TimeField.superclass.constructor.call(this,D)};B.extend(inputEx.TimeField,inputEx.CombineField,{getValue:function(){var C=inputEx.TimeField.superclass.getValue.call(this);return C.join(":")},setValue:function(D,C){inputEx.TimeField.superclass.setValue.call(this,D.split(":"),C)}});inputEx.registerType("time",inputEx.TimeField)})();(function(){var A=YAHOO.util.Event,B=YAHOO.lang;inputEx.DateTimeField=function(C){C.fields=[{type:"datepicker"},{type:"time"}];if(C.dateFormat){C.fields[0].dateFormat=C.dateFormat}C.separators=C.separators||[false,"&nbsp;&nbsp;",false];inputEx.DateTimeField.superclass.constructor.call(this,C)};B.extend(inputEx.DateTimeField,inputEx.CombineField,{getValue:function(){var D=this.inputs[0].getValue();if(D==""){return null}var C=this.inputs[1].getValue().split(":");D.setHours(C[0]);D.setMinutes(C[1]);D.setSeconds(C[2]);return D},setValue:function(H,D){if(!B.isObject(H)){return }var F=H.getHours();var C=H.getMinutes();var E=H.getSeconds();var G=([(F<10?"0":"")+F,(C<10?"0":"")+C,(E<10?"0":"")+E]).join(":");inputEx.DateTimeField.superclass.setValue.call(this,[H,G],D)}});inputEx.registerType("datetime",inputEx.DateTimeField)})();(function(){inputEx.UneditableField=function(A){inputEx.UneditableField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.UneditableField,inputEx.Field,{setOptions:function(A){inputEx.UneditableField.superclass.setOptions.call(this,A);this.options.visu=A.visu},setValue:function(B,A){this.value=B;inputEx.renderVisu(this.options.visu,B,this.fieldContainer);inputEx.UneditableField.superclass.setValue.call(this,B,A)},getValue:function(){return this.value}});inputEx.registerType("uneditable",inputEx.UneditableField)})();(function(){var A=YAHOO.lang;inputEx.UrlField=function(B){inputEx.UrlField.superclass.constructor.call(this,B)};A.extend(inputEx.UrlField,inputEx.StringField,{setOptions:function(B){inputEx.UrlField.superclass.setOptions.call(this,B);this.options.className=B.className?B.className:"inputEx-Field inputEx-UrlField";this.options.messages.invalid=inputEx.messages.invalidUrl;this.options.favicon=A.isUndefined(B.favicon)?(("https:"==document.location.protocol)?false:true):B.favicon;this.options.size=B.size||50;this.options.regexp=inputEx.regexps.url},render:function(){inputEx.UrlField.superclass.render.call(this);this.el.size=this.options.size;if(!this.options.favicon){YAHOO.util.Dom.addClass(this.el,"nofavicon")}if(this.options.favicon){this.favicon=inputEx.cn("img",{src:inputEx.spacerUrl});this.fieldContainer.insertBefore(this.favicon,this.fieldContainer.childNodes[0]);YAHOO.util.Event.addListener(this.favicon,"click",function(){this.focus()},this,true)}},setClassFromState:function(){inputEx.UrlField.superclass.setClassFromState.call(this);if(this.options.favicon){this.updateFavicon((this.previousState==inputEx.stateValid)?this.getValue():null)}},updateFavicon:function(C){var B=C?C.match(/https?:\/\/[^\/]*/)+"/favicon.ico":inputEx.spacerUrl;if(B!=this.favicon.src){inputEx.sn(this.favicon,null,{visibility:"hidden"});this.favicon.src=B;if(this.timer){clearTimeout(this.timer)}var D=this;this.timer=setTimeout(function(){D.displayFavicon()},1000)}},displayFavicon:function(){inputEx.sn(this.favicon,null,{visibility:(this.favicon.naturalWidth!=0)?"visible":"hidden"})}});inputEx.messages.invalidUrl="Invalid URL, ex: http://www.test.com";inputEx.registerType("url",inputEx.UrlField,[{type:"boolean",label:"Display favicon",name:"favicon",value:true}])})();(function(){var B=YAHOO.util.DragDropMgr,C=YAHOO.util.Dom,A=YAHOO.util.Event,D=YAHOO.lang;inputEx.widget.DDListItem=function(E){inputEx.widget.DDListItem.superclass.constructor.call(this,E);this.setXConstraint(0,0);this.goingUp=false;this.lastY=0};YAHOO.extend(inputEx.widget.DDListItem,YAHOO.util.DDProxy,{startDrag:function(F,H){var E=this.getDragEl();var G=this.getEl();C.setStyle(G,"visibility","hidden");this._originalIndex=inputEx.indexOf(G,G.parentNode.childNodes);E.className=G.className;E.innerHTML=G.innerHTML},endDrag:function(F){C.setStyle(this.id,"visibility","");var G=this.getEl();var E=inputEx.indexOf(G,G.parentNode.childNodes);if(this._originalIndex!=E){this._list.onReordered(this._originalIndex,E)}},onDragDrop:function(I,J){if(B.interactionInfo.drop.length===1){var H=B.interactionInfo.point;var G=B.interactionInfo.sourceRegion;if(!G.intersect(H)){var E=C.get(J);if(E.nodeName.toLowerCase()!="li"){var F=B.getDDById(J);E.appendChild(this.getEl());F.isEmpty=false;B.refreshCache()}}}},onDrag:function(E){var F=A.getPageY(E);if(F<this.lastY){this.goingUp=true}else{if(F>this.lastY){this.goingUp=false}}this.lastY=F},onDragOver:function(I,J){var G=this.getEl();var F=C.get(J);if(F.nodeName.toLowerCase()=="li"){var E=G.parentNode;var H=F.parentNode;if(this.goingUp){H.insertBefore(G,F)}else{H.insertBefore(G,F.nextSibling)}B.refreshCache()}}});inputEx.widget.DDList=function(E){this.ul=inputEx.cn("ul");this.items=[];this.setOptions(E);this.itemRemovedEvt=new YAHOO.util.CustomEvent("itemRemoved",this);this.listReorderedEvt=new YAHOO.util.CustomEvent("listReordered",this);if(E.parentEl){if(D.isString(E.parentEl)){C.get(E.parentEl).appendChild(this.ul)}else{E.parentEl.appendChild(this.ul)}}};inputEx.widget.DDList.prototype={setOptions:function(E){this.options={};this.options.allowDelete=D.isUndefined(E.allowDelete)?true:E.allowDelete;if(E.id){this.ul.id=E.id}if(E.value){this.setValue(E.value)}},addItem:function(G){var E=inputEx.cn("li",{className:"inputEx-DDList-item"});E.appendChild(inputEx.cn("span",null,null,(typeof G=="object")?G.label:G));if(!!this.options.allowDelete){var H=inputEx.cn("a",null,null,"remove");E.appendChild(H);A.addListener(H,"click",function(K){var J=A.getTarget(K);var I=J.parentNode;this.removeItem(inputEx.indexOf(I,this.ul.childNodes))},this,true)}var F=new inputEx.widget.DDListItem(E);F._list=this;this.items.push((typeof G=="object")?G.value:G);this.ul.appendChild(E)},_removeItem:function(E){var F=this.items[E];this.ul.removeChild(this.ul.childNodes[E]);this.items[E]=null;this.items=inputEx.compactArray(this.items);return F},removeItem:function(E){var F=this._removeItem(E);this.itemRemovedEvt.fire(F)},onReordered:function(F,E){if(F<E){this.items.splice(E+1,0,this.items[F]);this.items[F]=null}else{this.items.splice(E,0,this.items[F]);this.items[F+1]=null}this.items=inputEx.compactArray(this.items);this.listReorderedEvt.fire()},getValue:function(){return this.items},updateItem:function(E,F){this.items[E]=(typeof F=="object")?F.value:F;this.ul.childNodes[E].childNodes[0].innerHTML=(typeof F=="object")?F.label:F},setValue:function(H){if(!D.isArray(H)){H=[]}var I=this.ul.childNodes.length;var G=H.length;for(var F=0;F<G;F++){if(F<I){this.updateItem(F,H[F])}else{this.addItem(H[F])}}for(var E=G;E<I;E++){this._removeItem(G)}}}})();(function(){inputEx.MultiSelectField=function(A){inputEx.MultiSelectField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.MultiSelectField,inputEx.SelectField,{renderComponent:function(){inputEx.MultiSelectField.superclass.renderComponent.call(this);this.ddlist=new inputEx.widget.DDList({parentEl:this.fieldContainer})},initEvents:function(){YAHOO.util.Event.addListener(this.el,"change",this.onAddNewItem,this,true);this.ddlist.itemRemovedEvt.subscribe(this.onItemRemoved,this,true);this.ddlist.listReorderedEvt.subscribe(this.fireUpdatedEvt,this,true)},onItemRemoved:function(A,B){this.showChoice({value:B[0]});this.el.selectedIndex=0;this.fireUpdatedEvt()},onAddNewItem:function(){var C,A,B;if(this.el.selectedIndex!==0){C=inputEx.MultiSelectField.superclass.getValue.call(this);A=this.getChoicePosition({value:C});B=this.choicesList[A];this.ddlist.addItem({value:C,label:B.label});this.hideChoice({position:A});this.el.selectedIndex=0;this.fireUpdatedEvt()}},setValue:function(F,C){var D,E,A,B,G=[];if(!YAHOO.lang.isArray(F)){return }for(D=0,E=this.choicesList.length;D<E;D+=1){this.showChoice({position:D})}for(D=0,E=F.length;D<E;D+=1){A=this.getChoicePosition({value:F[D]});B=this.choicesList[A];G.push({value:B.value,label:B.label});this.hideChoice({position:A})}this.ddlist.setValue(G);this.el.selectedIndex=0;if(C!==false){this.fireUpdatedEvt()}},getValue:function(){return this.ddlist.getValue()}});inputEx.registerType("multiselect",inputEx.MultiSelectField)}());(function(){var C=YAHOO.lang,A=YAHOO.util.Event,B=YAHOO.util.Dom;inputEx.AutoComplete=function(D){inputEx.AutoComplete.superclass.constructor.call(this,D)};C.extend(inputEx.AutoComplete,inputEx.StringField,{setOptions:function(D){inputEx.AutoComplete.superclass.setOptions.call(this,D);this.options.className=D.className?D.className:"inputEx-Field inputEx-AutoComplete";this.options.datasource=D.datasource;this.options.autoComp=D.autoComp;this.options.returnValue=D.returnValue;this.options.generateRequest=D.generateRequest;this.options.datasourceParameters=D.datasourceParameters},initEvents:function(){inputEx.AutoComplete.superclass.initEvents.call(this)},renderComponent:function(){this.wrapEl=inputEx.cn("div",{className:"inputEx-StringField-wrapper"});var D={type:"text",id:YAHOO.util.Dom.generateId()};if(this.options.size){D.size=this.options.size}if(this.options.readonly){D.readonly="readonly"}if(this.options.maxLength){D.maxLength=this.options.maxLength}this.el=inputEx.cn("input",D);var E={type:"hidden",value:""};if(this.options.name){E.name=this.options.name}this.hiddenEl=inputEx.cn("input",E);this.wrapEl.appendChild(this.el);this.wrapEl.appendChild(this.hiddenEl);this.fieldContainer.appendChild(this.wrapEl);this.listEl=inputEx.cn("div",{id:B.generateId()});this.fieldContainer.appendChild(this.listEl);A.onAvailable([this.el,this.listEl],this.buildAutocomplete,this,true)},buildAutocomplete:function(){if(!this._nElementsReady){this._nElementsReady=0}this._nElementsReady++;if(this._nElementsReady!=2){return }if(!C.isUndefined(this.options.datasourceParameters)){for(param in this.options.datasourceParameters){this.options.datasource[param]=this.options.datasourceParameters[param]}}this.oAutoComp=new YAHOO.widget.AutoComplete(this.el.id,this.listEl.id,this.options.datasource,this.options.autoComp);if(!C.isUndefined(this.options.generateRequest)){this.oAutoComp.generateRequest=this.options.generateRequest}this.oAutoComp.itemSelectEvent.subscribe(this.itemSelectHandler,this,true);this.oAutoComp.textboxBlurEvent.subscribe(this.onBlur,this,true)},itemSelectHandler:function(F,E){var D=E[2];this.setValue(this.options.returnValue?this.options.returnValue(D):D[0])},onBlur:function(D){if(this.hiddenEl.value!=this.el.value&&this.el.value!=this.options.typeInvite){this.el.value=this.hiddenEl.value}if(this.el.value==""&&this.options.typeInvite){B.addClass(this.divEl,"inputEx-typeInvite");if(this.el.value==""){this.el.value=this.options.typeInvite}}},onChange:function(D){this.setClassFromState();if(this.hiddenEl.value!=this.el.value){this.hiddenEl.value=this.el.value}C.later(50,this,function(){if(this.el.value==""){this.setValue("")}})},setValue:function(E,D){this.hiddenEl.value=E||"";this.el.value=E||"";this.setClassFromState();if(D!==false){this.fireUpdatedEvt()}},getValue:function(){return this.hiddenEl.value}});inputEx.registerType("autocomplete",inputEx.AutoComplete)})();(function(){var A=YAHOO.lang;inputEx.MultiAutoComplete=function(B){inputEx.MultiAutoComplete.superclass.constructor.call(this,B)};A.extend(inputEx.MultiAutoComplete,inputEx.AutoComplete,{renderComponent:function(){inputEx.MultiAutoComplete.superclass.renderComponent.call(this);this.ddlist=new inputEx.widget.DDList({parentEl:this.fieldContainer});this.ddlist.itemRemovedEvt.subscribe(function(){this.setClassFromState();this.fireUpdatedEvt()},this,true);this.ddlist.listReorderedEvt.subscribe(this.fireUpdatedEvt,this,true)},setOptions:function(B){inputEx.MultiAutoComplete.superclass.setOptions.call(this,B);this.options.returnLabel=B.returnLabel},itemSelectHandler:function(F,E){var C=E[2];var D=A.isFunction(this.options.returnValue)?this.options.returnValue(C):C[0];var B=A.isFunction(this.options.returnLabel)?this.options.returnLabel(C):D;this.ddlist.addItem({label:B,value:D});this.el.value="";this.fireUpdatedEvt()},setValue:function(C,B){this.ddlist.setValue(C);this.setClassFromState();if(B!==false){this.fireUpdatedEvt()}},getValue:function(){return this.ddlist.getValue()},getState:function(){var B=this.getValue();if(B.length===0){return this.options.required?inputEx.stateRequired:inputEx.stateEmpty}return this.validate()?inputEx.stateValid:inputEx.stateInvalid},validate:function(){return true},onChange:function(B){}});inputEx.registerType("multiautocomplete",inputEx.MultiAutoComplete)})();(function(){inputEx.UneditableField=function(A){inputEx.UneditableField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.UneditableField,inputEx.Field,{setOptions:function(A){inputEx.UneditableField.superclass.setOptions.call(this,A);this.options.visu=A.visu},setValue:function(B,A){this.value=B;inputEx.renderVisu(this.options.visu,B,this.fieldContainer);inputEx.UneditableField.superclass.setValue.call(this,B,A)},getValue:function(){return this.value}});inputEx.registerType("uneditable",inputEx.UneditableField)})();(function(){var A=YAHOO.lang;inputEx.SliderField=function(B){inputEx.SliderField.superclass.constructor.call(this,B)};YAHOO.lang.extend(inputEx.SliderField,inputEx.Field,{setOptions:function(B){inputEx.SliderField.superclass.setOptions.call(this,B);this.options.className=B.className?B.className:"inputEx-SliderField";this.options.minValue=A.isUndefined(B.minValue)?0:B.minValue;this.options.maxValue=A.isUndefined(B.maxValue)?100:B.maxValue;this.options.displayValue=A.isUndefined(B.displayValue)?true:B.displayValue},renderComponent:function(){this.sliderbg=inputEx.cn("div",{id:YAHOO.util.Dom.generateId(),className:"inputEx-SliderField-bg"});this.sliderthumb=inputEx.cn("div",{className:"inputEx-SliderField-thumb"});this.sliderbg.appendChild(this.sliderthumb);this.fieldContainer.appendChild(this.sliderbg);if(this.options.displayValue){this.valueDisplay=inputEx.cn("div",{className:"inputEx-SliderField-value"},null,String(this.options.minValue));this.fieldContainer.appendChild(this.valueDisplay)}this.fieldContainer.appendChild(inputEx.cn("div",null,{clear:"both"}));this.slider=YAHOO.widget.Slider.getHorizSlider(this.sliderbg,this.sliderthumb,0,100)},initEvents:function(){this.slider.on("slideEnd",this.fireUpdatedEvt,this,true);if(this.options.displayValue){this.updatedEvt.subscribe(function(B,D){var C=D[0];this.valueDisplay.innerHTML=C},this,true)}},setValue:function(E,C){var B=E;if(B<this.options.minValue){B=this.options.minValue}if(B>this.options.maxValue){B=this.options.maxValue}var D=Math.floor(B-this.options.minValue)*100/this.options.maxValue;this.slider.setValue(D);inputEx.SliderField.superclass.setValue.call(this,E,C)},getValue:function(){var B=Math.floor(this.options.minValue+(this.options.maxValue-this.options.minValue)*this.slider.getValue()/100);return B}});inputEx.registerType("slider",inputEx.SliderField,[{type:"integer",label:"Min. value",name:"minValue",value:0},{type:"integer",label:"Max. value",name:"maxValue",value:100}])})();

(function () {
	var util = YAHOO.util, lang = YAHOO.lang, Event = util.Event, Dom = util.Dom;
	
	inputEx.JSONForm = function(options) {
	   inputEx.JSONForm.superclass.constructor.call(this, options);
	};

	lang.extend(inputEx.JSONForm, inputEx.Form, {
		 /**
		    * Send the form value in JSON through an ajax request
		    */
		   asyncRequest: function() {
		      if(this.options.ajax.showMask) { this.showMask(); }
			
				var formValue = this.inputs[0].getValue();
			
				// options.ajax.uri and options.ajax.method can also be functions that return a the uri/method depending of the value of the form
				var uri = lang.isFunction(this.options.ajax.uri) ? this.options.ajax.uri(formValue) : this.options.ajax.uri;
				var method = lang.isFunction(this.options.ajax.method) ? this.options.ajax.method(formValue) : this.options.ajax.method;
			
				var postData = null;
				
				// Classic application/x-www-form-urlencoded (like html forms)
				if(this.options.ajax.contentType == "application/x-www-form-urlencoded" && method != "PUT") {
					var params = [];
					for(var key in formValue) {
						if(formValue.hasOwnProperty(key)) {
							var pName = (this.options.ajax.wrapObject ? this.options.ajax.wrapObject+'[' : '')+key+(this.options.ajax.wrapObject ? ']' : '');
							params.push( pName+"="+window.encodeURIComponent(formValue[key]));
						}
					}
					postData = params.join('&');
				}
				// The only other contentType available is "application/json"
				else {
					util.Connect.setDefaultPostHeader(false);
					util.Connect.initHeader("Content-Type" , "application/json" , false);
					var p;
					if(this.options.ajax.wrapObject) {
						p = {};
						p[this.options.ajax.wrapObject] = formValue;
					}
					else {
						p = formValue;
					}
					postData = lang.JSON.stringify(p);
				}
				
		      util.Connect.asyncRequest( method, uri, {
		         success: function(o) {
		            if(this.options.ajax.showMask) { this.hideMask(); }
		            if( lang.isFunction(this.options.ajax.callback.success) ) {
		               this.options.ajax.callback.success.call(this.options.ajax.callback.scope,o);
		            }
		         },

		         failure: function(o) {
		            if(this.options.ajax.showMask) { this.hideMask(); }
		            if( lang.isFunction(this.options.ajax.callback.failure) ) {
		               this.options.ajax.callback.failure.call(this.options.ajax.callback.scope,o);
		            }
		         },

		         scope:this
		      }, postData);
		   }
	});
})();


/*
 * DataTable
 */
(function() {

	   var util = YAHOO.util, lang = YAHOO.lang, Dom = util.Dom, Event = util.Event, msgs = inputEx.messages;

	/**
	 * Create an editable datatable
	 * @class inputEx.widget.DataTable
	 * @constructor
	 * @param {Object} options Options:
	 * <ul>
	 *    <li>parentEl: DOMelement in which we have to insert the datatable</li>
	 *
	 *		<li>datasource (or datasourceConfig)</li>
	 *    <li>datatableOpts: additionnal datatable options</li>
	 *    <li>fields: inputEx fields</li>
	 *    <li>dialogLabel: title of the dialog</li>
	 *    <li>columnDefs: YUI datatable columnDefs</li>
	 *
	 *    <li>id: (optional, default is autogenerated) sets the id of the div wrapper around the widget</li>
	 *    <li>allowInsert: adds the 'Insert' button (optional, default true)</li>
	 *    <li>allowModify: default true</li>
	 *    <li>allowDelete: default true</li>
	 *    <li>showHideColumnsDlg: add a link to a dialog to show/hide columns</li>
	 * 	<li>panelConfig: (optional) YUI's dialog panelConfig object</li>
	 *
	 * </ul>
	 */
	inputEx.widget.DataTable = function(options) {
	   
	   this.setOptions(options);
	   
	   this.render();
	   
	   this.initEvents();
		
	};

	inputEx.widget.DataTable.prototype = {
	   
	   /**
	    * Set the options
	    */
	   setOptions: function(options) {

	      this.options = {};
	      this.options.id = options.id || Dom.generateId();
	      this.options.parentEl = lang.isString(options.parentEl) ? Dom.get(options.parentEl) : options.parentEl;
	      
			this.options.columnDefs = options.columnDefs;

	      this.options.allowInsert = lang.isUndefined(options.allowInsert) ? true : options.allowInsert;
	      this.options.allowModify = lang.isUndefined(options.allowModify) ? true : options.allowModify;
	      this.options.allowDelete = lang.isUndefined(options.allowDelete) ? true : options.allowDelete; 
	      
	      this.options.showHideColumnsDlg = lang.isUndefined(options.showHideColumnsDlg) ? false : options.showHideColumnsDlg; 
	      
	      this.options.datasource = options.datasource;

			// Create a datasource if it does not exist, from the datasourceConfig Object
			if(!options.datasource && options.datasourceConfig) {
				var ds = new YAHOO.util.DataSource(options.datasourceConfig.url), fields = [];
				if(options.datasourceConfig.keys) {
					for ( var i = 0 ; i < options.datasourceConfig.keys.length ; i++ ) {
		         	fields.push({ key: options.datasourceConfig.keys[i] });
		      	}
				}
		      ds.responseType = options.datasourceConfig.responseType || YAHOO.util.DataSource.TYPE_JSON;
		      ds.responseSchema = options.datasourceConfig.responseSchema || { resultsList : "Result", fields : fields};
				this.options.datasource = ds;
			}

	      this.options.datatableOpts = options.datatableOpts;
	      this.options.fields = options.fields;

			this.options.dialogId = options.dialogId || null;
			this.options.dialogLabel = options.dialogLabel || "";
			
			this.options.panelConfig = options.panelConfig || {
				constraintoviewport: true, 
				underlay:"shadow", 
				close:true, 
				fixedcenter: true,
				visible:true, 
				draggable:true,
				modal: true
			};
	   },
	   
	   
	   /**
	    * Init the events
	    */
	   initEvents: function() {
	      
	      // Call the rendering method when the container is available
	      Event.onAvailable(this.options.id, this.renderDatatable, this, true);
	      
	      // Table options
	      if(this.options.showHideColumnsDlg) {
	         Event.addListener(this.tableOptions, 'click', this.showTableOptions, this, true);
	      }

	      /**
	   	 * @event Event fired when an item is removed
	   	 * @param {YAHOO.widget.Record} Removed record
	   	 * @desc YAHOO custom event fired when an item is removed
	   	 */
	    	this.itemRemovedEvt = new util.CustomEvent('itemRemoved', this);

	      /**
	   	 * @event Event fired when an item is added
	    	 * @param {YAHOO.widget.Record} Added record
	   	 * @desc YAHOO custom event fired when an item is added
	   	 */
	    	this.itemAddedEvt = new util.CustomEvent('itemAdded', this);

	      /**
	   	 * @event Event fired when an item is modified
	    	 * @param {YAHOO.widget.Record} Modified record
	   	 * @desc YAHOO custom event fired when an item is modified
	   	 */
	    	this.itemModifiedEvt = new util.CustomEvent('itemModified', this);
	   },
	   
	   /**
	    * Render the main container only (not the datatable)
	    */
	   render: function() {
	      
	      /**
	       * Main container 
	       */
	      this.element = inputEx.cn('div', {id: this.options.id });
	      
	      if(this.options.showHideColumnsDlg) {
	         this.renderShowHideColumnsDlg();
	      }

	      // append it immediatly to the parent DOM element
	      this.options.parentEl.appendChild(this.element);
	      
	   },
	   
	   
	   /**
	    * Render the datatable
	    */
	   renderDatatable: function() {
	      
	      var columndefs = this.setColumnDefs();

			/**
			 * YUI's datatable instance
			 */
	      this.datatable = new YAHOO.widget.DataTable(this.element, columndefs, this.options.datasource, this.options.datatableOpts);
	      this.datatable.subscribe('cellClickEvent', this._onCellClick, this, true);

			// Automatically set up the paginator
			if(this.options.datatableOpts && this.options.datatableOpts.paginator) {
				this.datatable.handleDataReturnPayload = function(oRequest, oResponse, oPayload) {
					if(oPayload) {
		        		oPayload.totalRecords = oResponse.meta.totalRecords;
					}
		        	return oPayload;
		    	};
			}
	            
	      // Insert button
	      if ( this.options.allowInsert ){
	         this.insertButton = inputEx.cn('input', {type:'button', value:msgs.insertItemText}, null, null);
	         Event.addListener(this.insertButton, 'click', this.onInsertButton, this, true);
	         this.options.parentEl.appendChild(this.insertButton);
	      }

			
	      // Set up editing flow
	      var highlightEditableCell = function(oArgs) {
	          var elCell = oArgs.target;
	          if(Dom.hasClass(elCell, "yui-dt-editable") || Dom.hasClass(elCell,"yui-dt-col-delete") || Dom.hasClass(elCell,"yui-dt-col-modify") ) {
	              this.highlightCell(elCell);
	          }
	      };
			
			// Locals
			this.datatable.set("MSG_LOADING", msgs.loadingText );
			this.datatable.set("MSG_EMPTY", msgs.emptyDataText );
			this.datatable.set("MSG_ERROR", msgs.errorDataText );

	      this.datatable.subscribe("cellMouseoverEvent", highlightEditableCell);
	      this.datatable.subscribe("cellMouseoutEvent", this.datatable.onEventUnhighlightCell);

	   },

		/**
		 * Set the column definitions, create them if none from the fields, adds the modify and delete buttons
		 */
		setColumnDefs: function() {
			
			var columndefs = this.options.columnDefs || this.fieldsToColumndefs(this.options.fields);

	    	// Adding modify column if we use form editing and if allowModify is true
	      if(this.options.allowModify ) {
	    	   columndefs = columndefs.concat([{
	    	      key:'modify',
	    	      label:' ',
	    	      formatter:function(elCell) {
	               elCell.innerHTML = msgs.modifyText;
	               elCell.style.cursor = 'pointer';
	            }
	         }]);
	      }
	      
	      // Adding delete column
	      if(this.options.allowDelete) {
	      	 columndefs = columndefs.concat([{
	      	    key:'delete',
	      	    label:' ',
	      	    formatter:function(elCell) {
	               elCell.innerHTML = msgs.deleteText;
	               elCell.style.cursor = 'pointer';
	            }
	         }]);
	      }
			
			return columndefs;
		},
		
	   /**
	    * Render the dialog for row edition
	    */
	   renderDialog: function() {
	      
	     var that = this;
	      
	     this.dialog = new inputEx.widget.Dialog({
					id: this.options.dialogId,
					inputExDef: {
					         type: 'form',
				            fields: this.options.fields,
				            buttons: [
				               {type: 'submit', value: msgs.saveText, onClick: function() { that.onDialogSave(); return false; /* prevent form submit */} },
				               {type: 'link', value: msgs.cancelText, onClick: function() { that.onDialogCancel(); } }
				            ]
					      },
					title: this.options.dialogLabel,
					panelConfig: this.options.panelConfig
			});
			
			// Add a listener on the closing button and hook it to onDialogCancel()
			YAHOO.util.Event.addListener(that.dialog.close,"click",function(){
				that.onDialogCancel();
			},that);
			
	   },

		/**
	    * When saving the Dialog
	    */
	   onDialogSave: function() {
			
			var newvalues, record;
			
		  	//Validate the Form
		  	if ( !this.dialog.getForm().validate() ) return ;
		   
			// Update the record
			if(!this.insertNewRecord){
							
				// Update the row
				newvalues = this.dialog.getValue();
				this.datatable.updateRow( this.selectedRecord , newvalues );

				// Get the new record
				record = this.datatable.getRecord(this.selectedRecord);
				
				// Fire the modify event
	         this.itemModifiedEvt.fire(record);

			}
			// Adding new record
			else{
				// Insert a new row
		      this.datatable.addRow({});

				// Set the Selected Record
				var rowIndex = this.datatable.getRecordSet().getLength() - 1;
				this.selectedRecord = rowIndex;
				
				// Update the row
				newvalues = this.dialog.getValue();
				this.datatable.updateRow( this.selectedRecord , newvalues );
				
				// Get the new record
				record = this.datatable.getRecord(this.selectedRecord);
							
				// Fire the add event
	         this.itemAddedEvt.fire(record);
			}
	      
	      this.dialog.hide();
	   },

		/**
	    * When canceling the Dialog
	    */
		onDialogCancel: function(){
			this.insertNewRecord = false;
			this.dialog.hide();
		},

	   
	   /**
	    * Handling cell click events
	    */
	   _onCellClick: function(ev,args) {
	      var target = Event.getTarget(ev);
	      var column = this.datatable.getColumn(target);      
	      var rowIndex = this.datatable.getTrIndex(target);
	      if (column.key == 'delete') {
	         if (confirm(msgs.confirmDeletion)) {
	            var record = this.datatable.getRecord(target);
	            if(this.editingNewRecord) {
	               this.editingNewRecord = false;
	            }
	            else {
	               this.itemRemovedEvt.fire( record );
	            }
	            this.datatable.deleteRow(target);
	            this.hideSubform();
	         }
	      }
	      else if(column.key == 'modify') {
	         this.onClickModify(rowIndex);
	      } 
	      else {				
	      	this.onCellClick(ev,rowIndex);
	      }
	   },

	   /**
	    * Public cell click handler
	    */
	   onCellClick: function(ev, rowIndex) {

	   },
	   
	   /**
	    * Opens the Dialog to edit the row
	    * Called when the user clicked on modify button
	    */
	   onClickModify: function(rowIndex) {

	      if(!this.dialog) {
	         this.renderDialog();
	      }

	      // NOT Inserting new record
			this.insertNewRecord = false;
			
			// Set the selected Record
			this.selectedRecord = rowIndex;
			
			// Get the selected Record
			var record = this.datatable.getRecord(this.selectedRecord);
			
			this.dialog.whenFormAvailable({
				fn: function() {
					this.dialog.setValue(record.getData());
					this.dialog.show();
				},
				scope: this
			});
			
		},
	   
	   /**
	    * Insert button event handler
	    */
	   onInsertButton: function(e) {

	      if(!this.dialog) {
	         this.renderDialog();
	      }
			
			// Inserting new record
			this.insertNewRecord = true;
			
			this.dialog.whenFormAvailable({
				fn: function() {
					this.dialog.getForm().clear();
					this.dialog.show();
				},
				scope: this
			});
			
	   },
	   
	   /**
	    * Remove the record that has not been saved
	    */
	   removeUnsavedRecord: function(record) {
	      this.datatable.deleteRow(record);
	   },
	   
	   /**
	    * Cancel row edition
	    */
	   onCancelForm: function(e) {
	      Event.stopEvent(e); 
	      this.hideSubform();
	      
	      if(this.editingNewRecord) {
	         this.removeUnsavedRecord();
	         this.editingNewRecord = false;
	      }
	   },
	   
	   
	   /**
	    * Convert an inputEx fields definition to a DataTable columns definition
	    */
	   fieldsToColumndefs: function(fields) {
	      var columndefs = [];
	    	for(var i = 0 ; i < fields.length ; i++) {
	    		columndefs.push( this.fieldToColumndef(fields[i]) );
	    	}
	    	return columndefs;
	   },

	   /**
	    * Convert a single inputEx field definition to a DataTable column definition
	    */
	   fieldToColumndef: function(field) {
	      
	      var key, label, colmunDef;
	      
	      // Retro-compatibility with inputParms
	      if (lang.isObject(field.inputParams)) {
	         key = field.inputParams.name;
	         label = field.inputParams.label;
	      
	      // New prefered way to set options of a field
	      } else {
	         key = field.name;
	         label = field.label;
	      }
	      
	      columnDef = {
	         key: key,
	         label: label,
	         sortable: true, 
	         resizeable: true
	      };

	      // Field formatter
	      if(field.type == "date") {
	      	columnDef.formatter = YAHOO.widget.DataTable.formatDate;
	      }
			else if(field.type == "integer" || field.type == "number") {
				columnDef.formatter = YAHOO.widget.DataTable.formatNumber;
				/*columnDef.sortOptions = {
					defaultDir: "asc",
					sortFunction: // TODO: sort numbers !!!
				}*/
			}
	      // TODO: other formatters
	      return columnDef;
	   },
	   
	   /**
	    * Render the dialog (+link) to show/hide columns
	    */
	   renderShowHideColumnsDlg: function() {
	      this.tableOptions = inputEx.cn('a', {href: '#'}, null, msgs.tableOptions);
	      this.options.parentEl.appendChild(this.tableOptions);
	      
	      this.tableOptionsDlg = new YAHOO.widget.SimpleDialog( Dom.generateId(), {
	              width: "30em",
			        visible: false,
			        modal: true,
			        buttons: [ 
					      { text:msgs.columnDialogCloseButton,  handler: function(e) { this.hide(); } }
	              ],
	              fixedcenter: true,
	              constrainToViewport: true
		   });
		
			Dom.addClass(this.tableOptionsDlg.element.firstChild, "inputex-datatable-columnsDlg");
			
		   this.tableOptionsDlg.bodyId = Dom.generateId();
		   this.tableOptionsDlg.setHeader(msgs.columnDialogTitle);
		   this.tableOptionsDlg.setBody("<div id='"+this.tableOptionsDlg.bodyId+"'></div>");
		   this.tableOptionsDlg.render(document.body);
	   },
	   
	   /**
	    * Display the dialog to show/hide fields
	    */
	   showTableOptions: function(e) {
	      
	      Event.stopEvent(e);
	      
	      if(!this.noNewCols) {
	          
	          var that = this;
	          var handleButtonClick = function(e, oSelf) {
	              var sKey = this.get("name");
	              if(this.get("value") === "Hide") {
	                  // Hides a Column
	                  that.datatable.hideColumn(sKey);
	              }
	              else {
	                  // Shows a Column
	                  that.datatable.showColumn(sKey);
	              }
	          };
	          
	           // Populate Dialog
	           // Using a template to create elements for the SimpleDialog
	           var allColumns = this.datatable.getColumnSet().keys;
	           var elPicker = Dom.get(this.tableOptionsDlg.bodyId);
	           
	           var elTemplateCol = document.createElement("div");
	           Dom.addClass(elTemplateCol, "dt-dlg-pickercol");
	           var elTemplateKey = elTemplateCol.appendChild(document.createElement("span"));
	           Dom.addClass(elTemplateKey, "dt-dlg-pickerkey");
	           var elTemplateBtns = elTemplateCol.appendChild(document.createElement("span"));
	           Dom.addClass(elTemplateBtns, "dt-dlg-pickerbtns");
	           var onclickObj = {fn:handleButtonClick, obj:this, scope:false };
	           
	           // Create one section in the SimpleDialog for each Column
	           var elColumn, elKey, elButton, oButtonGrp;
	           for(var i=0,l=allColumns.length;i<l;i++) {
	               var oColumn = allColumns[i];
	               
	               // Use the template
	               elColumn = elTemplateCol.cloneNode(true);
	               
	               // Write the Column key
	               elKey = elColumn.firstChild;
	               elKey.innerHTML = (oColumn.label && oColumn.label !== "") ? oColumn.label : oColumn.getKey();
	               
	               if(oColumn.getKey() != "delete" && oColumn.getKey() != "modify") {
	               
	                  // Create a ButtonGroup
	                  oButtonGrp = new YAHOO.widget.ButtonGroup({ 
	                                  id: "buttongrp"+i, 
	                                  name: oColumn.getKey(), 
	                                  container: elKey.nextSibling
	                  });
	                  oButtonGrp.addButtons([
	                      { label: msgs.showColumnButton, value: "Show", checked: ((!oColumn.hidden)), onclick: onclickObj},
	                      { label: msgs.hideColumnButton, value: "Hide", checked: ((oColumn.hidden)), onclick: onclickObj}
	                  ]);
	                    
	                  elPicker.appendChild(elColumn);
	               
	               }
	           }
	           this.noNewCols = true;
	   	}
	       this.tableOptionsDlg.show();
	      
	   }
	   
	};


	msgs.saveText = "Save";
	msgs.cancelText = "Cancel";
	msgs.deleteText = "delete";
	msgs.modifyText = "modify";
	msgs.insertItemText = "Insert";
	msgs.addButtonText = "Add";
	msgs.loadingText = "Loading...";
	msgs.emptyDataText = "No records found.";
	msgs.errorDataText = "Data error.";
	msgs.confirmDeletion = "Are you sure?";

	msgs.tableOptions = "Table options";
	msgs.showColumnButton = "Show";
	msgs.hideColumnButton = "Hide";
	msgs.columnDialogTitle = "Choose which columns you would like to see";
	msgs.columnDialogCloseButton = "Close";

	})();


