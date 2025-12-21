var __create=Object.create,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty,__require=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),__esm=(e,t)=>function(){return e&&(t=(0,e[__getOwnPropNames(e)[0]])(e=0)),t},__commonJS=(e,t)=>function(){return t||(0,e[__getOwnPropNames(e)[0]])((t={exports:{}}).exports,t),t.exports},__export=(e,t)=>{for(var r in t)__defProp(e,r,{get:t[r],enumerable:!0})},__copyProps=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let u of __getOwnPropNames(t))!__hasOwnProp.call(e,u)&&u!==r&&__defProp(e,u,{get:()=>t[u],enumerable:!(o=__getOwnPropDesc(t,u))||o.enumerable});return e},__toESM=(e,t,r)=>(r=e!=null?__create(__getProtoOf(e)):{},__copyProps(!e||!e.__esModule?__defProp(r,"default",{value:e,enumerable:!0}):r,e)),__toCommonJS=e=>__copyProps(__defProp({},"__esModule",{value:!0}),e),backends,backendsSortedByPriority,registerBackend,tryResolveAndInitializeBackend,resolveBackendAndExecutionProviders,init_backend_impl=__esm({"common/dist/esm/backend-impl.js"(){backends=new Map,backendsSortedByPriority=[],registerBackend=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){const o=backends.get(e);if(o===void 0)backends.set(e,{backend:t,priority:r});else{if(o.priority>r)return;if(o.priority===r&&o.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){const u=backendsSortedByPriority.indexOf(e);u!==-1&&backendsSortedByPriority.splice(u,1);for(let l=0;l<backendsSortedByPriority.length;l++)if(backends.get(backendsSortedByPriority[l]).priority<=r){backendsSortedByPriority.splice(l,0,e);return}backendsSortedByPriority.push(e)}return}throw new TypeError("not a valid backend")},tryResolveAndInitializeBackend=async e=>{const t=backends.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{const r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(o){return r||(t.error=`${o}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},resolveBackendAndExecutionProviders=async e=>{const t=e.executionProviders||[],r=t.map(i=>typeof i=="string"?i:i.name),o=r.length===0?backendsSortedByPriority:r;let u;const l=[],c=new Set;for(const i of o){const a=await tryResolveAndInitializeBackend(i);typeof a=="string"?l.push({name:i,err:a}):(u||(u=a),u===a&&c.add(i))}if(!u)throw new Error(`no available backend found. ERR: ${l.map(i=>`[${i.name}] ${i.err}`).join(", ")}`);for(const{name:i,err:a}of l)r.includes(i)&&console.warn(`removing requested execution provider "${i}" from session options because it is not available: ${a}`);const d=t.filter(i=>c.has(typeof i=="string"?i:i.name));return[u,new Proxy(e,{get:(i,a)=>a==="executionProviders"?d:Reflect.get(i,a)})]}}}),init_backend=__esm({"common/dist/esm/backend.js"(){init_backend_impl()}}),version,init_version=__esm({"common/dist/esm/version.js"(){version="1.23.2"}}),logLevelValue,env,init_env_impl=__esm({"common/dist/esm/env-impl.js"(){init_version(),logLevelValue="warning",env={wasm:{},webgl:{},webgpu:{},versions:{common:version},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);logLevelValue=e}},get logLevel(){return logLevelValue}},Object.defineProperty(env,"logLevel",{enumerable:!0})}}),env2,init_env=__esm({"common/dist/esm/env.js"(){init_env_impl(),env2=env}}),tensorToDataURL,tensorToImageData,init_tensor_conversion_impl=__esm({"common/dist/esm/tensor-conversion-impl.js"(){tensorToDataURL=(e,t)=>{const r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];const o=r.getContext("2d");if(o!=null){let u,l;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(u=e.dims[2],l=e.dims[3]):(u=e.dims[3],l=e.dims[2]);const c=t?.format!==void 0?t.format:"RGB",d=t?.norm;let i,a;d===void 0||d.mean===void 0?i=[255,255,255,255]:typeof d.mean=="number"?i=[d.mean,d.mean,d.mean,d.mean]:(i=[d.mean[0],d.mean[1],d.mean[2],0],d.mean[3]!==void 0&&(i[3]=d.mean[3])),d===void 0||d.bias===void 0?a=[0,0,0,0]:typeof d.bias=="number"?a=[d.bias,d.bias,d.bias,d.bias]:(a=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(a[3]=d.bias[3]));const n=l*u;let s=0,p=n,f=n*2,h=-1;c==="RGBA"?(s=0,p=n,f=n*2,h=n*3):c==="RGB"?(s=0,p=n,f=n*2):c==="RBG"&&(s=0,f=n,p=n*2);for(let m=0;m<l;m++)for(let _=0;_<u;_++){const y=(e.data[s++]-a[0])*i[0],g=(e.data[p++]-a[1])*i[1],b=(e.data[f++]-a[2])*i[2],v=h===-1?255:(e.data[h++]-a[3])*i[3];o.fillStyle="rgba("+y+","+g+","+b+","+v+")",o.fillRect(_,m,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},tensorToImageData=(e,t)=>{const r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d");let o;if(r!=null){let u,l,c;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(u=e.dims[2],l=e.dims[1],c=e.dims[3]):(u=e.dims[3],l=e.dims[2],c=e.dims[1]);const d=t!==void 0&&t.format!==void 0?t.format:"RGB",i=t?.norm;let a,n;i===void 0||i.mean===void 0?a=[255,255,255,255]:typeof i.mean=="number"?a=[i.mean,i.mean,i.mean,i.mean]:(a=[i.mean[0],i.mean[1],i.mean[2],255],i.mean[3]!==void 0&&(a[3]=i.mean[3])),i===void 0||i.bias===void 0?n=[0,0,0,0]:typeof i.bias=="number"?n=[i.bias,i.bias,i.bias,i.bias]:(n=[i.bias[0],i.bias[1],i.bias[2],0],i.bias[3]!==void 0&&(n[3]=i.bias[3]));const s=l*u;if(t!==void 0&&(t.format!==void 0&&c===4&&t.format!=="RGBA"||c===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");const p=4;let f=0,h=1,m=2,_=3,y=0,g=s,b=s*2,v=-1;d==="RGBA"?(y=0,g=s,b=s*2,v=s*3):d==="RGB"?(y=0,g=s,b=s*2):d==="RBG"&&(y=0,b=s,g=s*2),o=r.createImageData(u,l);for(let w=0;w<l*u;f+=p,h+=p,m+=p,_+=p,w++)o.data[f]=(e.data[y++]-n[0])*a[0],o.data[h]=(e.data[g++]-n[1])*a[1],o.data[m]=(e.data[b++]-n[2])*a[2],o.data[_]=v===-1?255:(e.data[v++]-n[3])*a[3]}else throw new Error("Can not access image data");return o}}}),bufferToTensor,tensorFromImage,tensorFromTexture,tensorFromGpuBuffer,tensorFromMLTensor,tensorFromPinnedBuffer,init_tensor_factory_impl=__esm({"common/dist/esm/tensor-factory-impl.js"(){init_tensor_impl(),bufferToTensor=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");const{height:r,width:o}=t,u=t.norm??{mean:255,bias:0};let l,c;typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:l=[u.mean[0],u.mean[1],u.mean[2],u.mean[3]??255],typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:c=[u.bias[0],u.bias[1],u.bias[2],u.bias[3]??0];const d=t.format!==void 0?t.format:"RGBA",i=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",a=r*o,n=i==="RGBA"?new Float32Array(a*4):new Float32Array(a*3);let s=4,p=0,f=1,h=2,m=3,_=0,y=a,g=a*2,b=-1;d==="RGB"&&(s=3,p=0,f=1,h=2,m=-1),i==="RGBA"?b=a*3:i==="RBG"?(_=0,g=a,y=a*2):i==="BGR"&&(g=0,y=a,_=a*2);for(let w=0;w<a;w++,p+=s,h+=s,f+=s,m+=s)n[_++]=(e[p]+c[0])/l[0],n[y++]=(e[f]+c[1])/l[1],n[g++]=(e[h]+c[2])/l[2],b!==-1&&m!==-1&&(n[b++]=(e[m]+c[3])/l[3]);return i==="RGBA"?new Tensor("float32",n,[1,4,r,o]):new Tensor("float32",n,[1,3,r,o])},tensorFromImage=async(e,t)=>{const r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,o=typeof ImageData<"u"&&e instanceof ImageData,u=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,l=typeof e=="string";let c,d=t??{};const i=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},a=n=>typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||n instanceof OffscreenCanvas?n.getContext("2d"):null;if(r){const n=i();n.width=e.width,n.height=e.height;const s=a(n);if(s!=null){let p=e.height,f=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(p=t.resizedHeight,f=t.resizedWidth),t!==void 0){if(d=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");d.tensorFormat="RGBA",d.height=p,d.width=f}else d.tensorFormat="RGBA",d.height=p,d.width=f;s.drawImage(e,0,0),c=s.getImageData(0,0,f,p).data}else throw new Error("Can not access image data")}else if(o){let n,s;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(n=t.resizedHeight,s=t.resizedWidth):(n=e.height,s=e.width),t!==void 0&&(d=t),d.format="RGBA",d.height=n,d.width=s,t!==void 0){const p=i();p.width=s,p.height=n;const f=a(p);if(f!=null)f.putImageData(e,0,0),c=f.getImageData(0,0,s,n).data;else throw new Error("Can not access image data")}else c=e.data}else if(u){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");const n=i();n.width=e.width,n.height=e.height;const s=a(n);if(s!=null){const p=e.height,f=e.width;return s.drawImage(e,0,0,f,p),c=s.getImageData(0,0,f,p).data,d.height=p,d.width=f,bufferToTensor(c,d)}else throw new Error("Can not access image data")}else{if(l)return new Promise((n,s)=>{const p=i(),f=a(p);if(!e||!f)return s();const h=new Image;h.crossOrigin="Anonymous",h.src=e,h.onload=()=>{p.width=h.width,p.height=h.height,f.drawImage(h,0,0,p.width,p.height);const m=f.getImageData(0,0,p.width,p.height);d.height=p.height,d.width=p.width,n(bufferToTensor(m.data,d))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(c!==void 0)return bufferToTensor(c,d);throw new Error("Input data provided is not supported - aborted tensor creation")},tensorFromTexture=(e,t)=>{const{width:r,height:o,download:u,dispose:l}=t,c=[1,o,r,4];return new Tensor({location:"texture",type:"float32",texture:e,dims:c,download:u,dispose:l})},tensorFromGpuBuffer=(e,t)=>{const{dataType:r,dims:o,download:u,dispose:l}=t;return new Tensor({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:o,download:u,dispose:l})},tensorFromMLTensor=(e,t)=>{const{dataType:r,dims:o,download:u,dispose:l}=t;return new Tensor({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:o,download:u,dispose:l})},tensorFromPinnedBuffer=(e,t,r)=>new Tensor({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}}),NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP,NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP,isTypedArrayChecked,checkTypedArray,init_tensor_impl_type_mapping=__esm({"common/dist/esm/tensor-impl-type-mapping.js"(){NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),isTypedArrayChecked=!1,checkTypedArray=()=>{if(!isTypedArrayChecked){isTypedArrayChecked=!0;const e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,o=typeof r<"u"&&r.from;e&&(NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("int64",BigInt64Array),NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigInt64Array,"int64")),t&&(NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("uint64",BigUint64Array),NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigUint64Array,"uint64")),o?(NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("float16",r),NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(r,"float16")):NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("float16",Uint16Array)}}}}),calculateSize,tensorReshape,init_tensor_utils_impl=__esm({"common/dist/esm/tensor-utils-impl.js"(){init_tensor_impl(),calculateSize=e=>{let t=1;for(let r=0;r<e.length;r++){const o=e[r];if(typeof o!="number"||!Number.isSafeInteger(o))throw new TypeError(`dims[${r}] must be an integer, got: ${o}`);if(o<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${o}`);t*=o}return t},tensorReshape=(e,t)=>{switch(e.location){case"cpu":return new Tensor(e.type,e.data,t);case"cpu-pinned":return new Tensor({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Tensor({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Tensor({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Tensor({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}}),Tensor,init_tensor_impl=__esm({"common/dist/esm/tensor-impl.js"(){init_tensor_conversion_impl(),init_tensor_factory_impl(),init_tensor_impl_type_mapping(),init_tensor_utils_impl(),Tensor=class{constructor(e,t,r){checkTypedArray();let o,u;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,o=e.type,u=e.dims,e.location){case"cpu-pinned":{const c=NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.get(o);if(!c)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(e.data instanceof c))throw new TypeError(`buffer should be of type ${c.name}`);this.cpuData=e.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let c,d;if(typeof e=="string")if(o=e,d=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");c=t}else{const i=NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.get(e);if(i===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&i===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${i.name} as data.`);e==="uint64"||e==="int64"?c=i.from(t,BigInt):c=i.from(t)}else if(t instanceof i)c=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")c=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&i!==Uint16Array)c=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${o} tensor's data must be type of ${i}`)}else if(d=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");const i=typeof e[0];if(i==="string")o="string",c=e;else if(i==="boolean")o="bool",c=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${i}.`)}else if(e instanceof Uint8ClampedArray)o="uint8",c=Uint8Array.from(e);else{const i=NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.get(e.constructor);if(i===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);o=i,c=e}if(d===void 0)d=[c.length];else if(!Array.isArray(d))throw new TypeError("A tensor's dims must be a number array");u=d,this.cpuData=c,this.dataLocation="cpu"}const l=calculateSize(u);if(this.cpuData&&l!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(l/2)===this.cpuData.length))throw new Error(`Tensor's size(${l}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=u,this.size=l}static async fromImage(e,t){return tensorFromImage(e,t)}static fromTexture(e,t){return tensorFromTexture(e,t)}static fromGpuBuffer(e,t){return tensorFromGpuBuffer(e,t)}static fromMLTensor(e,t){return tensorFromMLTensor(e,t)}static fromPinnedBuffer(e,t,r){return tensorFromPinnedBuffer(e,t,r)}toDataURL(e){return tensorToDataURL(this,e)}toImageData(e){return tensorToImageData(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;const t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return tensorReshape(this,e)}}}}),Tensor2,init_tensor=__esm({"common/dist/esm/tensor.js"(){init_tensor_impl(),Tensor2=Tensor}}),TRACE,TRACE_FUNC,TRACE_FUNC_BEGIN,TRACE_FUNC_END,TRACE_EVENT_BEGIN,TRACE_EVENT_END,init_trace=__esm({"common/dist/esm/trace.js"(){init_env_impl(),TRACE=(e,t)=>{(typeof env.trace>"u"?!env.wasm.trace:!env.trace)||console.timeStamp(`${e}::ORT::${t}`)},TRACE_FUNC=(e,t)=>{const r=new Error().stack?.split(/\r\n|\r|\n/g)||[];let o=!1;for(let u=0;u<r.length;u++){if(o&&!r[u].includes("TRACE_FUNC")){let l=`FUNC_${e}::${r[u].trim().split(" ")[1]}`;t&&(l+=`::${t}`),TRACE("CPU",l);return}r[u].includes("TRACE_FUNC")&&(o=!0)}},TRACE_FUNC_BEGIN=e=>{(typeof env.trace>"u"?!env.wasm.trace:!env.trace)||TRACE_FUNC("BEGIN",e)},TRACE_FUNC_END=e=>{(typeof env.trace>"u"?!env.wasm.trace:!env.trace)||TRACE_FUNC("END",e)},TRACE_EVENT_BEGIN=e=>{(typeof env.trace>"u"?!env.wasm.trace:!env.trace)||console.time(`ORT::${e}`)},TRACE_EVENT_END=e=>{(typeof env.trace>"u"?!env.wasm.trace:!env.trace)||console.timeEnd(`ORT::${e}`)}}}),InferenceSession,init_inference_session_impl=__esm({"common/dist/esm/inference-session-impl.js"(){init_backend_impl(),init_tensor(),init_trace(),InferenceSession=class Re{constructor(t){this.handler=t}async run(t,r,o){TRACE_FUNC_BEGIN(),TRACE_EVENT_BEGIN("InferenceSession.run");const u={};let l={};if(typeof t!="object"||t===null||t instanceof Tensor2||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let c=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Tensor2)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");c=!1;for(const a of r){if(typeof a!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(a)===-1)throw new RangeError(`'fetches' contains invalid output name: ${a}.`);u[a]=null}if(typeof o=="object"&&o!==null)l=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else{let a=!1;const n=Object.getOwnPropertyNames(r);for(const s of this.outputNames)if(n.indexOf(s)!==-1){const p=r[s];(p===null||p instanceof Tensor2)&&(a=!0,c=!1,u[s]=p)}if(a){if(typeof o=="object"&&o!==null)l=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else l=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(const a of this.inputNames)if(typeof t[a]>"u")throw new Error(`input '${a}' is missing in 'feeds'.`);if(c)for(const a of this.outputNames)u[a]=null;const d=await this.handler.run(t,u,l),i={};for(const a in d)if(Object.hasOwnProperty.call(d,a)){const n=d[a];n instanceof Tensor2?i[a]=n:i[a]=new Tensor2(n.type,n.data,n.dims)}return TRACE_EVENT_END("InferenceSession.run"),TRACE_FUNC_END(),i}async release(){return this.handler.dispose()}static async create(t,r,o,u){TRACE_FUNC_BEGIN(),TRACE_EVENT_BEGIN("InferenceSession.create");let l,c={};if(typeof t=="string"){if(l=t,typeof r=="object"&&r!==null)c=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(l=t,typeof r=="object"&&r!==null)c=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){const n=t;let s=0,p=t.byteLength;if(typeof r=="object"&&r!==null)c=r;else if(typeof r=="number"){if(s=r,!Number.isSafeInteger(s))throw new RangeError("'byteOffset' must be an integer.");if(s<0||s>=n.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${n.byteLength}).`);if(p=t.byteLength-s,typeof o=="number"){if(p=o,!Number.isSafeInteger(p))throw new RangeError("'byteLength' must be an integer.");if(p<=0||s+p>n.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${n.byteLength-s}].`);if(typeof u=="object"&&u!==null)c=u;else if(typeof u<"u")throw new TypeError("'options' must be an object.")}else if(typeof o<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");l=new Uint8Array(n,s,p)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");const[d,i]=await resolveBackendAndExecutionProviders(c),a=await d.createInferenceSessionHandler(l,i);return TRACE_EVENT_END("InferenceSession.create"),TRACE_FUNC_END(),new Re(a)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}}),InferenceSession2,init_inference_session=__esm({"common/dist/esm/inference-session.js"(){init_inference_session_impl(),InferenceSession2=InferenceSession}}),init_tensor_conversion=__esm({"common/dist/esm/tensor-conversion.js"(){}}),init_tensor_factory=__esm({"common/dist/esm/tensor-factory.js"(){}}),init_onnx_model=__esm({"common/dist/esm/onnx-model.js"(){}}),init_onnx_value=__esm({"common/dist/esm/onnx-value.js"(){}}),esm_exports={};__export(esm_exports,{InferenceSession:()=>InferenceSession2,TRACE:()=>TRACE,TRACE_EVENT_BEGIN:()=>TRACE_EVENT_BEGIN,TRACE_EVENT_END:()=>TRACE_EVENT_END,TRACE_FUNC_BEGIN:()=>TRACE_FUNC_BEGIN,TRACE_FUNC_END:()=>TRACE_FUNC_END,Tensor:()=>Tensor2,env:()=>env2,registerBackend:()=>registerBackend});var init_esm=__esm({"common/dist/esm/index.js"(){init_backend(),init_env(),init_inference_session(),init_tensor(),init_tensor_conversion(),init_tensor_factory(),init_trace(),init_onnx_model(),init_onnx_value()}});function log(e,t,r,o){if(t===void 0)return createCategorizedLogger(e);if(r===void 0)logInternal(e,t);else if(typeof r=="number"&&o===void 0)logInternal(e,t);else if(typeof r=="string"&&o===void 0)logInternal(e,r,1,t);else if(typeof r=="string"&&typeof o=="number")logInternal(e,r,o,t);else throw new TypeError("input is valid")}function createCategorizedLogger(e){return{verbose:log.verbose.bind(null,e),info:log.info.bind(null,e),warning:log.warning.bind(null,e),error:log.error.bind(null,e),fatal:log.fatal.bind(null,e)}}function logInternal(e,t,r,o){const u=LOGGER_CONFIG_MAP[o||""]||LOGGER_CONFIG_MAP[""];SEVERITY_VALUE[e]<SEVERITY_VALUE[u.minimalSeverity]||(u.logDateTime&&(t=`${new Date().toISOString()}|${t}`),u.logSourceLocation,LOGGER_PROVIDER_MAP[u.provider].log(e,t,o))}var NoOpLoggerProvider,ConsoleLoggerProvider,SEVERITY_VALUE,LOGGER_PROVIDER_MAP,LOGGER_DEFAULT_CONFIG,LOGGER_CONFIG_MAP,Logger,Event,EventRecord,Profiler,now,init_instrument=__esm({"web/lib/onnxjs/instrument.ts"(){NoOpLoggerProvider=class{log(e,t,r){}},ConsoleLoggerProvider=class{log(e,t,r){console.log(`${this.color(e)} ${r?"\x1B[35m"+r+"\x1B[0m ":""}${t}`)}color(e){switch(e){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${e}`)}}},SEVERITY_VALUE={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},LOGGER_PROVIDER_MAP={none:new NoOpLoggerProvider,console:new ConsoleLoggerProvider},LOGGER_DEFAULT_CONFIG={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},LOGGER_CONFIG_MAP={"":LOGGER_DEFAULT_CONFIG},(e=>{function t(a,n){e("verbose",a,n)}e.verbose=t;function r(a,n){e("info",a,n)}e.info=r;function o(a,n){e("warning",a,n)}e.warning=o;function u(a,n){e("error",a,n)}e.error=u;function l(a,n){e("fatal",a,n)}e.fatal=l;function c(a){LOGGER_CONFIG_MAP={},d("",a||{})}e.reset=c;function d(a,n){if(a==="*")c(n);else{const s=LOGGER_CONFIG_MAP[a]||LOGGER_DEFAULT_CONFIG;LOGGER_CONFIG_MAP[a]={provider:n.provider||s.provider,minimalSeverity:n.minimalSeverity||s.minimalSeverity,logDateTime:n.logDateTime===void 0?s.logDateTime:n.logDateTime,logSourceLocation:n.logSourceLocation===void 0?s.logSourceLocation:n.logSourceLocation}}}e.set=d;function i(a){const n={};a.logLevel&&(n.minimalSeverity=a.logLevel),d("",n)}e.setWithEnv=i})(log||(log={})),Logger=log,Event=class{constructor(e,t,r,o,u,l){this.category=e,this.name=t,this.startTime=r,this.endCallback=o,this.timer=u,this.ctx=l}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},EventRecord=class{constructor(e,t,r,o){this.category=e,this.name=t,this.startTime=r,this.endTime=o}},Profiler=class{constructor(e,t,r){this._started=!1,this._flushPointer=0,this._started=!1,this._maxNumberEvents=e===void 0?1e4:e,this._flushBatchSize=t===void 0?10:t,this._flushIntervalInMilliseconds=r===void 0?5e3:r}static create(e){return e===void 0?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=now(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,t,r,o){const u=this._started?this.begin(e,t,o):void 0;let l=!1;const c=r();if(c&&typeof c.then=="function")return l=!0,new Promise((d,i)=>{c.then(async a=>{u&&await u.end(),d(a)},async a=>{u&&await u.end(),i(a)})});if(!l&&u){const d=u.end();if(d&&typeof d.then=="function")return new Promise((i,a)=>{d.then(()=>{i(c)},n=>{a(n)})})}return c}begin(e,t,r){if(!this._started)throw new Error("profiler is not started yet");if(r===void 0){const o=now();return this.flush(o),new Event(e,t,o,u=>this.endSync(u))}else{const o=r.beginTimer();return new Event(e,t,0,async u=>this.end(u),o,r)}}async end(e){const t=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new EventRecord(e.category,e.name,e.startTime,t)),this.flush(t))}endSync(e){const t=now();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new EventRecord(e.category,e.name,e.startTime,t)),this.flush(t))}logOneEvent(e){Logger.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(const t=this._flushPointer;this._flushPointer<t+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=now()}}get started(){return this._started}},now=typeof performance<"u"&&performance.now?()=>performance.now():Date.now}});function resolveOperator(e,t,r){for(const o of r){const u=o[0],l=o[1],c=o[2],d=o[3],i=o[4];if(e.opType===u){for(const a of t)if((a.domain===l||a.domain==="ai.onnx"&&l==="")&&matchSelector(a.version,c))return{opImpl:d,opInit:i}}}throw new TypeError(`cannot resolve operator '${e.opType}' with opsets: ${t.map(o=>`${o.domain||"ai.onnx"} v${o.version}`).join(", ")}`)}function matchSelector(e,t){if(t.endsWith("+")){const r=Number.parseInt(t.substring(0,t.length-1),10);return!isNaN(r)&&r<=e}else if(t.split("-").length===2){const r=t.split("-"),o=Number.parseInt(r[0],10),u=Number.parseInt(r[1],10);return!isNaN(o)&&!isNaN(u)&&o<=e&&e<=u}else return Number.parseInt(t,10)===e}var init_opset=__esm({"web/lib/onnxjs/opset.ts"(){}}),require_guid=__commonJS({"web/node_modules/guid-typescript/dist/guid.js"(e){e.__esModule=!0;var t=(function(){function r(o){if(!o)throw new TypeError("Invalid argument; `value` has no value.");this.value=r.EMPTY,o&&r.isGuid(o)&&(this.value=o)}return r.isGuid=function(o){var u=o.toString();return o&&(o instanceof r||r.validator.test(u))},r.create=function(){return new r([r.gen(2),r.gen(1),r.gen(1),r.gen(1),r.gen(3)].join("-"))},r.createEmpty=function(){return new r("emptyguid")},r.parse=function(o){return new r(o)},r.raw=function(){return[r.gen(2),r.gen(1),r.gen(1),r.gen(1),r.gen(3)].join("-")},r.gen=function(o){for(var u="",l=0;l<o;l++)u+=((1+Math.random())*65536|0).toString(16).substring(1);return u},r.prototype.equals=function(o){return r.isGuid(o)&&this.value===o.toString()},r.prototype.isEmpty=function(){return this.value===r.EMPTY},r.prototype.toString=function(){return this.value},r.prototype.toJSON=function(){return{value:this.value}},r.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),r.EMPTY="00000000-0000-0000-0000-000000000000",r})();e.Guid=t}});function Long(e,t,r){this.low=e|0,this.high=t|0,this.unsigned=!!r}function isLong(e){return(e&&e.__isLong__)===!0}function ctz32(e){var t=Math.clz32(e&-e);return e?31-t:t}function fromInt(e,t){var r,o,u;return t?(e>>>=0,(u=0<=e&&e<256)&&(o=UINT_CACHE[e],o)?o:(r=fromBits(e,0,!0),u&&(UINT_CACHE[e]=r),r)):(e|=0,(u=-128<=e&&e<128)&&(o=INT_CACHE[e],o)?o:(r=fromBits(e,e<0?-1:0,!1),u&&(INT_CACHE[e]=r),r))}function fromNumber(e,t){if(isNaN(e))return t?UZERO:ZERO;if(t){if(e<0)return UZERO;if(e>=TWO_PWR_64_DBL)return MAX_UNSIGNED_VALUE}else{if(e<=-TWO_PWR_63_DBL)return MIN_VALUE;if(e+1>=TWO_PWR_63_DBL)return MAX_VALUE}return e<0?fromNumber(-e,t).neg():fromBits(e%TWO_PWR_32_DBL|0,e/TWO_PWR_32_DBL|0,t)}function fromBits(e,t,r){return new Long(e,t,r)}function fromString(e,t,r){if(e.length===0)throw Error("empty string");if(typeof t=="number"?(r=t,t=!1):t=!!t,e==="NaN"||e==="Infinity"||e==="+Infinity"||e==="-Infinity")return t?UZERO:ZERO;if(r=r||10,r<2||36<r)throw RangeError("radix");var o;if((o=e.indexOf("-"))>0)throw Error("interior hyphen");if(o===0)return fromString(e.substring(1),t,r).neg();for(var u=fromNumber(pow_dbl(r,8)),l=ZERO,c=0;c<e.length;c+=8){var d=Math.min(8,e.length-c),i=parseInt(e.substring(c,c+d),r);if(d<8){var a=fromNumber(pow_dbl(r,d));l=l.mul(a).add(fromNumber(i))}else l=l.mul(u),l=l.add(fromNumber(i))}return l.unsigned=t,l}function fromValue(e,t){return typeof e=="number"?fromNumber(e,t):typeof e=="string"?fromString(e,t):fromBits(e.low,e.high,typeof t=="boolean"?t:e.unsigned)}var wasm,INT_CACHE,UINT_CACHE,pow_dbl,TWO_PWR_16_DBL,TWO_PWR_24_DBL,TWO_PWR_32_DBL,TWO_PWR_64_DBL,TWO_PWR_63_DBL,TWO_PWR_24,ZERO,UZERO,ONE,UONE,NEG_ONE,MAX_VALUE,MAX_UNSIGNED_VALUE,MIN_VALUE,LongPrototype,long_default,init_long=__esm({"web/node_modules/long/index.js"(){wasm=null;try{wasm=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}Long.prototype.__isLong__,Object.defineProperty(Long.prototype,"__isLong__",{value:!0}),Long.isLong=isLong,INT_CACHE={},UINT_CACHE={},Long.fromInt=fromInt,Long.fromNumber=fromNumber,Long.fromBits=fromBits,pow_dbl=Math.pow,Long.fromString=fromString,Long.fromValue=fromValue,TWO_PWR_16_DBL=65536,TWO_PWR_24_DBL=1<<24,TWO_PWR_32_DBL=TWO_PWR_16_DBL*TWO_PWR_16_DBL,TWO_PWR_64_DBL=TWO_PWR_32_DBL*TWO_PWR_32_DBL,TWO_PWR_63_DBL=TWO_PWR_64_DBL/2,TWO_PWR_24=fromInt(TWO_PWR_24_DBL),ZERO=fromInt(0),Long.ZERO=ZERO,UZERO=fromInt(0,!0),Long.UZERO=UZERO,ONE=fromInt(1),Long.ONE=ONE,UONE=fromInt(1,!0),Long.UONE=UONE,NEG_ONE=fromInt(-1),Long.NEG_ONE=NEG_ONE,MAX_VALUE=fromBits(-1,2147483647,!1),Long.MAX_VALUE=MAX_VALUE,MAX_UNSIGNED_VALUE=fromBits(-1,-1,!0),Long.MAX_UNSIGNED_VALUE=MAX_UNSIGNED_VALUE,MIN_VALUE=fromBits(0,-2147483648,!1),Long.MIN_VALUE=MIN_VALUE,LongPrototype=Long.prototype,LongPrototype.toInt=function(){return this.unsigned?this.low>>>0:this.low},LongPrototype.toNumber=function(){return this.unsigned?(this.high>>>0)*TWO_PWR_32_DBL+(this.low>>>0):this.high*TWO_PWR_32_DBL+(this.low>>>0)},LongPrototype.toString=function(t){if(t=t||10,t<2||36<t)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(MIN_VALUE)){var r=fromNumber(t),o=this.div(r),u=o.mul(r).sub(this);return o.toString(t)+u.toInt().toString(t)}else return"-"+this.neg().toString(t);for(var l=fromNumber(pow_dbl(t,6),this.unsigned),c=this,d="";;){var i=c.div(l),a=c.sub(i.mul(l)).toInt()>>>0,n=a.toString(t);if(c=i,c.isZero())return n+d;for(;n.length<6;)n="0"+n;d=""+n+d}},LongPrototype.getHighBits=function(){return this.high},LongPrototype.getHighBitsUnsigned=function(){return this.high>>>0},LongPrototype.getLowBits=function(){return this.low},LongPrototype.getLowBitsUnsigned=function(){return this.low>>>0},LongPrototype.getNumBitsAbs=function(){if(this.isNegative())return this.eq(MIN_VALUE)?64:this.neg().getNumBitsAbs();for(var t=this.high!=0?this.high:this.low,r=31;r>0&&(t&1<<r)==0;r--);return this.high!=0?r+33:r+1},LongPrototype.isZero=function(){return this.high===0&&this.low===0},LongPrototype.eqz=LongPrototype.isZero,LongPrototype.isNegative=function(){return!this.unsigned&&this.high<0},LongPrototype.isPositive=function(){return this.unsigned||this.high>=0},LongPrototype.isOdd=function(){return(this.low&1)===1},LongPrototype.isEven=function(){return(this.low&1)===0},LongPrototype.equals=function(t){return isLong(t)||(t=fromValue(t)),this.unsigned!==t.unsigned&&this.high>>>31===1&&t.high>>>31===1?!1:this.high===t.high&&this.low===t.low},LongPrototype.eq=LongPrototype.equals,LongPrototype.notEquals=function(t){return!this.eq(t)},LongPrototype.neq=LongPrototype.notEquals,LongPrototype.ne=LongPrototype.notEquals,LongPrototype.lessThan=function(t){return this.comp(t)<0},LongPrototype.lt=LongPrototype.lessThan,LongPrototype.lessThanOrEqual=function(t){return this.comp(t)<=0},LongPrototype.lte=LongPrototype.lessThanOrEqual,LongPrototype.le=LongPrototype.lessThanOrEqual,LongPrototype.greaterThan=function(t){return this.comp(t)>0},LongPrototype.gt=LongPrototype.greaterThan,LongPrototype.greaterThanOrEqual=function(t){return this.comp(t)>=0},LongPrototype.gte=LongPrototype.greaterThanOrEqual,LongPrototype.ge=LongPrototype.greaterThanOrEqual,LongPrototype.compare=function(t){if(isLong(t)||(t=fromValue(t)),this.eq(t))return 0;var r=this.isNegative(),o=t.isNegative();return r&&!o?-1:!r&&o?1:this.unsigned?t.high>>>0>this.high>>>0||t.high===this.high&&t.low>>>0>this.low>>>0?-1:1:this.sub(t).isNegative()?-1:1},LongPrototype.comp=LongPrototype.compare,LongPrototype.negate=function(){return!this.unsigned&&this.eq(MIN_VALUE)?MIN_VALUE:this.not().add(ONE)},LongPrototype.neg=LongPrototype.negate,LongPrototype.add=function(t){isLong(t)||(t=fromValue(t));var r=this.high>>>16,o=this.high&65535,u=this.low>>>16,l=this.low&65535,c=t.high>>>16,d=t.high&65535,i=t.low>>>16,a=t.low&65535,n=0,s=0,p=0,f=0;return f+=l+a,p+=f>>>16,f&=65535,p+=u+i,s+=p>>>16,p&=65535,s+=o+d,n+=s>>>16,s&=65535,n+=r+c,n&=65535,fromBits(p<<16|f,n<<16|s,this.unsigned)},LongPrototype.subtract=function(t){return isLong(t)||(t=fromValue(t)),this.add(t.neg())},LongPrototype.sub=LongPrototype.subtract,LongPrototype.multiply=function(t){if(this.isZero())return this;if(isLong(t)||(t=fromValue(t)),wasm){var r=wasm.mul(this.low,this.high,t.low,t.high);return fromBits(r,wasm.get_high(),this.unsigned)}if(t.isZero())return this.unsigned?UZERO:ZERO;if(this.eq(MIN_VALUE))return t.isOdd()?MIN_VALUE:ZERO;if(t.eq(MIN_VALUE))return this.isOdd()?MIN_VALUE:ZERO;if(this.isNegative())return t.isNegative()?this.neg().mul(t.neg()):this.neg().mul(t).neg();if(t.isNegative())return this.mul(t.neg()).neg();if(this.lt(TWO_PWR_24)&&t.lt(TWO_PWR_24))return fromNumber(this.toNumber()*t.toNumber(),this.unsigned);var o=this.high>>>16,u=this.high&65535,l=this.low>>>16,c=this.low&65535,d=t.high>>>16,i=t.high&65535,a=t.low>>>16,n=t.low&65535,s=0,p=0,f=0,h=0;return h+=c*n,f+=h>>>16,h&=65535,f+=l*n,p+=f>>>16,f&=65535,f+=c*a,p+=f>>>16,f&=65535,p+=u*n,s+=p>>>16,p&=65535,p+=l*a,s+=p>>>16,p&=65535,p+=c*i,s+=p>>>16,p&=65535,s+=o*n+u*a+l*i+c*d,s&=65535,fromBits(f<<16|h,s<<16|p,this.unsigned)},LongPrototype.mul=LongPrototype.multiply,LongPrototype.divide=function(t){if(isLong(t)||(t=fromValue(t)),t.isZero())throw Error("division by zero");if(wasm){if(!this.unsigned&&this.high===-2147483648&&t.low===-1&&t.high===-1)return this;var r=(this.unsigned?wasm.div_u:wasm.div_s)(this.low,this.high,t.low,t.high);return fromBits(r,wasm.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?UZERO:ZERO;var o,u,l;if(this.unsigned){if(t.unsigned||(t=t.toUnsigned()),t.gt(this))return UZERO;if(t.gt(this.shru(1)))return UONE;l=UZERO}else{if(this.eq(MIN_VALUE)){if(t.eq(ONE)||t.eq(NEG_ONE))return MIN_VALUE;if(t.eq(MIN_VALUE))return ONE;var c=this.shr(1);return o=c.div(t).shl(1),o.eq(ZERO)?t.isNegative()?ONE:NEG_ONE:(u=this.sub(t.mul(o)),l=o.add(u.div(t)),l)}else if(t.eq(MIN_VALUE))return this.unsigned?UZERO:ZERO;if(this.isNegative())return t.isNegative()?this.neg().div(t.neg()):this.neg().div(t).neg();if(t.isNegative())return this.div(t.neg()).neg();l=ZERO}for(u=this;u.gte(t);){o=Math.max(1,Math.floor(u.toNumber()/t.toNumber()));for(var d=Math.ceil(Math.log(o)/Math.LN2),i=d<=48?1:pow_dbl(2,d-48),a=fromNumber(o),n=a.mul(t);n.isNegative()||n.gt(u);)o-=i,a=fromNumber(o,this.unsigned),n=a.mul(t);a.isZero()&&(a=ONE),l=l.add(a),u=u.sub(n)}return l},LongPrototype.div=LongPrototype.divide,LongPrototype.modulo=function(t){if(isLong(t)||(t=fromValue(t)),wasm){var r=(this.unsigned?wasm.rem_u:wasm.rem_s)(this.low,this.high,t.low,t.high);return fromBits(r,wasm.get_high(),this.unsigned)}return this.sub(this.div(t).mul(t))},LongPrototype.mod=LongPrototype.modulo,LongPrototype.rem=LongPrototype.modulo,LongPrototype.not=function(){return fromBits(~this.low,~this.high,this.unsigned)},LongPrototype.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32},LongPrototype.clz=LongPrototype.countLeadingZeros,LongPrototype.countTrailingZeros=function(){return this.low?ctz32(this.low):ctz32(this.high)+32},LongPrototype.ctz=LongPrototype.countTrailingZeros,LongPrototype.and=function(t){return isLong(t)||(t=fromValue(t)),fromBits(this.low&t.low,this.high&t.high,this.unsigned)},LongPrototype.or=function(t){return isLong(t)||(t=fromValue(t)),fromBits(this.low|t.low,this.high|t.high,this.unsigned)},LongPrototype.xor=function(t){return isLong(t)||(t=fromValue(t)),fromBits(this.low^t.low,this.high^t.high,this.unsigned)},LongPrototype.shiftLeft=function(t){return isLong(t)&&(t=t.toInt()),(t&=63)===0?this:t<32?fromBits(this.low<<t,this.high<<t|this.low>>>32-t,this.unsigned):fromBits(0,this.low<<t-32,this.unsigned)},LongPrototype.shl=LongPrototype.shiftLeft,LongPrototype.shiftRight=function(t){return isLong(t)&&(t=t.toInt()),(t&=63)===0?this:t<32?fromBits(this.low>>>t|this.high<<32-t,this.high>>t,this.unsigned):fromBits(this.high>>t-32,this.high>=0?0:-1,this.unsigned)},LongPrototype.shr=LongPrototype.shiftRight,LongPrototype.shiftRightUnsigned=function(t){return isLong(t)&&(t=t.toInt()),(t&=63)===0?this:t<32?fromBits(this.low>>>t|this.high<<32-t,this.high>>>t,this.unsigned):t===32?fromBits(this.high,0,this.unsigned):fromBits(this.high>>>t-32,0,this.unsigned)},LongPrototype.shru=LongPrototype.shiftRightUnsigned,LongPrototype.shr_u=LongPrototype.shiftRightUnsigned,LongPrototype.rotateLeft=function(t){var r;return isLong(t)&&(t=t.toInt()),(t&=63)===0?this:t===32?fromBits(this.high,this.low,this.unsigned):t<32?(r=32-t,fromBits(this.low<<t|this.high>>>r,this.high<<t|this.low>>>r,this.unsigned)):(t-=32,r=32-t,fromBits(this.high<<t|this.low>>>r,this.low<<t|this.high>>>r,this.unsigned))},LongPrototype.rotl=LongPrototype.rotateLeft,LongPrototype.rotateRight=function(t){var r;return isLong(t)&&(t=t.toInt()),(t&=63)===0?this:t===32?fromBits(this.high,this.low,this.unsigned):t<32?(r=32-t,fromBits(this.high<<r|this.low>>>t,this.low<<r|this.high>>>t,this.unsigned)):(t-=32,r=32-t,fromBits(this.low<<r|this.high>>>t,this.high<<r|this.low>>>t,this.unsigned))},LongPrototype.rotr=LongPrototype.rotateRight,LongPrototype.toSigned=function(){return this.unsigned?fromBits(this.low,this.high,!1):this},LongPrototype.toUnsigned=function(){return this.unsigned?this:fromBits(this.low,this.high,!0)},LongPrototype.toBytes=function(t){return t?this.toBytesLE():this.toBytesBE()},LongPrototype.toBytesLE=function(){var t=this.high,r=this.low;return[r&255,r>>>8&255,r>>>16&255,r>>>24,t&255,t>>>8&255,t>>>16&255,t>>>24]},LongPrototype.toBytesBE=function(){var t=this.high,r=this.low;return[t>>>24,t>>>16&255,t>>>8&255,t&255,r>>>24,r>>>16&255,r>>>8&255,r&255]},Long.fromBytes=function(t,r,o){return o?Long.fromBytesLE(t,r):Long.fromBytesBE(t,r)},Long.fromBytesLE=function(t,r){return new Long(t[0]|t[1]<<8|t[2]<<16|t[3]<<24,t[4]|t[5]<<8|t[6]<<16|t[7]<<24,r)},Long.fromBytesBE=function(t,r){return new Long(t[4]<<24|t[5]<<16|t[6]<<8|t[7],t[0]<<24|t[1]<<16|t[2]<<8|t[3],r)},long_default=Long}}),require_arg_type=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/arg-type.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.ArgType=void 0;var t;(function(r){r[r.INPUT=0]="INPUT",r[r.OUTPUT=1]="OUTPUT"})(t||(e.ArgType=t={}))}}),require_constants=__commonJS({"web/node_modules/flatbuffers/js/constants.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.SIZE_PREFIX_LENGTH=e.FILE_IDENTIFIER_LENGTH=e.SIZEOF_INT=e.SIZEOF_SHORT=void 0,e.SIZEOF_SHORT=2,e.SIZEOF_INT=4,e.FILE_IDENTIFIER_LENGTH=4,e.SIZE_PREFIX_LENGTH=4}}),require_utils=__commonJS({"web/node_modules/flatbuffers/js/utils.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.isLittleEndian=e.float64=e.float32=e.int32=void 0,e.int32=new Int32Array(2),e.float32=new Float32Array(e.int32.buffer),e.float64=new Float64Array(e.int32.buffer),e.isLittleEndian=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1}}),require_encoding=__commonJS({"web/node_modules/flatbuffers/js/encoding.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.Encoding=void 0;var t;(function(r){r[r.UTF8_BYTES=1]="UTF8_BYTES",r[r.UTF16_STRING=2]="UTF16_STRING"})(t||(e.Encoding=t={}))}}),require_byte_buffer=__commonJS({"web/node_modules/flatbuffers/js/byte-buffer.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.ByteBuffer=void 0;var t=require_constants(),r=require_utils(),o=require_encoding(),u=class ze{constructor(c){this.bytes_=c,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(c){return new ze(new Uint8Array(c))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(c){this.position_=c}capacity(){return this.bytes_.length}readInt8(c){return this.readUint8(c)<<24>>24}readUint8(c){return this.bytes_[c]}readInt16(c){return this.readUint16(c)<<16>>16}readUint16(c){return this.bytes_[c]|this.bytes_[c+1]<<8}readInt32(c){return this.bytes_[c]|this.bytes_[c+1]<<8|this.bytes_[c+2]<<16|this.bytes_[c+3]<<24}readUint32(c){return this.readInt32(c)>>>0}readInt64(c){return BigInt.asIntN(64,BigInt(this.readUint32(c))+(BigInt(this.readUint32(c+4))<<BigInt(32)))}readUint64(c){return BigInt.asUintN(64,BigInt(this.readUint32(c))+(BigInt(this.readUint32(c+4))<<BigInt(32)))}readFloat32(c){return r.int32[0]=this.readInt32(c),r.float32[0]}readFloat64(c){return r.int32[r.isLittleEndian?0:1]=this.readInt32(c),r.int32[r.isLittleEndian?1:0]=this.readInt32(c+4),r.float64[0]}writeInt8(c,d){this.bytes_[c]=d}writeUint8(c,d){this.bytes_[c]=d}writeInt16(c,d){this.bytes_[c]=d,this.bytes_[c+1]=d>>8}writeUint16(c,d){this.bytes_[c]=d,this.bytes_[c+1]=d>>8}writeInt32(c,d){this.bytes_[c]=d,this.bytes_[c+1]=d>>8,this.bytes_[c+2]=d>>16,this.bytes_[c+3]=d>>24}writeUint32(c,d){this.bytes_[c]=d,this.bytes_[c+1]=d>>8,this.bytes_[c+2]=d>>16,this.bytes_[c+3]=d>>24}writeInt64(c,d){this.writeInt32(c,Number(BigInt.asIntN(32,d))),this.writeInt32(c+4,Number(BigInt.asIntN(32,d>>BigInt(32))))}writeUint64(c,d){this.writeUint32(c,Number(BigInt.asUintN(32,d))),this.writeUint32(c+4,Number(BigInt.asUintN(32,d>>BigInt(32))))}writeFloat32(c,d){r.float32[0]=d,this.writeInt32(c,r.int32[0])}writeFloat64(c,d){r.float64[0]=d,this.writeInt32(c,r.int32[r.isLittleEndian?0:1]),this.writeInt32(c+4,r.int32[r.isLittleEndian?1:0])}getBufferIdentifier(){if(this.bytes_.length<this.position_+t.SIZEOF_INT+t.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let c="";for(let d=0;d<t.FILE_IDENTIFIER_LENGTH;d++)c+=String.fromCharCode(this.readInt8(this.position_+t.SIZEOF_INT+d));return c}__offset(c,d){const i=c-this.readInt32(c);return d<this.readInt16(i)?this.readInt16(i+d):0}__union(c,d){return c.bb_pos=d+this.readInt32(d),c.bb=this,c}__string(c,d){c+=this.readInt32(c);const i=this.readInt32(c);c+=t.SIZEOF_INT;const a=this.bytes_.subarray(c,c+i);return d===o.Encoding.UTF8_BYTES?a:this.text_decoder_.decode(a)}__union_with_string(c,d){return typeof c=="string"?this.__string(d):this.__union(c,d)}__indirect(c){return c+this.readInt32(c)}__vector(c){return c+this.readInt32(c)+t.SIZEOF_INT}__vector_len(c){return this.readInt32(c+this.readInt32(c))}__has_identifier(c){if(c.length!=t.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+t.FILE_IDENTIFIER_LENGTH);for(let d=0;d<t.FILE_IDENTIFIER_LENGTH;d++)if(c.charCodeAt(d)!=this.readInt8(this.position()+t.SIZEOF_INT+d))return!1;return!0}createScalarList(c,d){const i=[];for(let a=0;a<d;++a){const n=c(a);n!==null&&i.push(n)}return i}createObjList(c,d){const i=[];for(let a=0;a<d;++a){const n=c(a);n!==null&&i.push(n.unpack())}return i}};e.ByteBuffer=u}}),require_builder=__commonJS({"web/node_modules/flatbuffers/js/builder.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.Builder=void 0;var t=require_byte_buffer(),r=require_constants(),o=class Me{constructor(l){this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder;let c;l?c=l:c=1024,this.bb=t.ByteBuffer.allocate(c),this.space=c}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(l){this.force_defaults=l}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(l,c){l>this.minalign&&(this.minalign=l);const d=~(this.bb.capacity()-this.space+c)+1&l-1;for(;this.space<d+l+c;){const i=this.bb.capacity();this.bb=Me.growByteBuffer(this.bb),this.space+=this.bb.capacity()-i}this.pad(d)}pad(l){for(let c=0;c<l;c++)this.bb.writeInt8(--this.space,0)}writeInt8(l){this.bb.writeInt8(this.space-=1,l)}writeInt16(l){this.bb.writeInt16(this.space-=2,l)}writeInt32(l){this.bb.writeInt32(this.space-=4,l)}writeInt64(l){this.bb.writeInt64(this.space-=8,l)}writeFloat32(l){this.bb.writeFloat32(this.space-=4,l)}writeFloat64(l){this.bb.writeFloat64(this.space-=8,l)}addInt8(l){this.prep(1,0),this.writeInt8(l)}addInt16(l){this.prep(2,0),this.writeInt16(l)}addInt32(l){this.prep(4,0),this.writeInt32(l)}addInt64(l){this.prep(8,0),this.writeInt64(l)}addFloat32(l){this.prep(4,0),this.writeFloat32(l)}addFloat64(l){this.prep(8,0),this.writeFloat64(l)}addFieldInt8(l,c,d){(this.force_defaults||c!=d)&&(this.addInt8(c),this.slot(l))}addFieldInt16(l,c,d){(this.force_defaults||c!=d)&&(this.addInt16(c),this.slot(l))}addFieldInt32(l,c,d){(this.force_defaults||c!=d)&&(this.addInt32(c),this.slot(l))}addFieldInt64(l,c,d){(this.force_defaults||c!==d)&&(this.addInt64(c),this.slot(l))}addFieldFloat32(l,c,d){(this.force_defaults||c!=d)&&(this.addFloat32(c),this.slot(l))}addFieldFloat64(l,c,d){(this.force_defaults||c!=d)&&(this.addFloat64(c),this.slot(l))}addFieldOffset(l,c,d){(this.force_defaults||c!=d)&&(this.addOffset(c),this.slot(l))}addFieldStruct(l,c,d){c!=d&&(this.nested(c),this.slot(l))}nested(l){if(l!=this.offset())throw new TypeError("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw new TypeError("FlatBuffers: object serialization must not be nested.")}slot(l){this.vtable!==null&&(this.vtable[l]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(l){const c=l.capacity();if(c&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");const d=c<<1,i=t.ByteBuffer.allocate(d);return i.setPosition(d-c),i.bytes().set(l.bytes(),d-c),i}addOffset(l){this.prep(r.SIZEOF_INT,0),this.writeInt32(this.offset()-l+r.SIZEOF_INT)}startObject(l){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=l;for(let c=0;c<l;c++)this.vtable[c]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);const l=this.offset();let c=this.vtable_in_use-1;for(;c>=0&&this.vtable[c]==0;c--);const d=c+1;for(;c>=0;c--)this.addInt16(this.vtable[c]!=0?l-this.vtable[c]:0);const i=2;this.addInt16(l-this.object_start);const a=(d+i)*r.SIZEOF_SHORT;this.addInt16(a);let n=0;const s=this.space;e:for(c=0;c<this.vtables.length;c++){const p=this.bb.capacity()-this.vtables[c];if(a==this.bb.readInt16(p)){for(let f=r.SIZEOF_SHORT;f<a;f+=r.SIZEOF_SHORT)if(this.bb.readInt16(s+f)!=this.bb.readInt16(p+f))continue e;n=this.vtables[c];break}}return n?(this.space=this.bb.capacity()-l,this.bb.writeInt32(this.space,n-l)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-l,this.offset()-l)),this.isNested=!1,l}finish(l,c,d){const i=d?r.SIZE_PREFIX_LENGTH:0;if(c){const a=c;if(this.prep(this.minalign,r.SIZEOF_INT+r.FILE_IDENTIFIER_LENGTH+i),a.length!=r.FILE_IDENTIFIER_LENGTH)throw new TypeError("FlatBuffers: file identifier must be length "+r.FILE_IDENTIFIER_LENGTH);for(let n=r.FILE_IDENTIFIER_LENGTH-1;n>=0;n--)this.writeInt8(a.charCodeAt(n))}this.prep(this.minalign,r.SIZEOF_INT+i),this.addOffset(l),i&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(l,c){this.finish(l,c,!0)}requiredField(l,c){const d=this.bb.capacity()-l,i=d-this.bb.readInt32(d);if(!(c<this.bb.readInt16(i)&&this.bb.readInt16(i+c)!=0))throw new TypeError("FlatBuffers: field "+c+" must be set")}startVector(l,c,d){this.notNested(),this.vector_num_elems=c,this.prep(r.SIZEOF_INT,l*c),this.prep(d,l*c)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(l){if(!l)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(l))return this.string_maps.get(l);const c=this.createString(l);return this.string_maps.set(l,c),c}createString(l){if(l==null)return 0;let c;return l instanceof Uint8Array?c=l:c=this.text_encoder.encode(l),this.addInt8(0),this.startVector(1,c.length,1),this.bb.setPosition(this.space-=c.length),this.bb.bytes().set(c,this.space),this.endVector()}createByteVector(l){return l==null?0:(this.startVector(1,l.length,1),this.bb.setPosition(this.space-=l.length),this.bb.bytes().set(l,this.space),this.endVector())}createObjectOffset(l){return l===null?0:typeof l=="string"?this.createString(l):l.pack(this)}createObjectOffsetList(l){const c=[];for(let d=0;d<l.length;++d){const i=l[d];if(i!==null)c.push(this.createObjectOffset(i));else throw new TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return c}createStructOffsetList(l,c){return c(this,l.length),this.createObjectOffsetList(l.slice().reverse()),this.endVector()}};e.Builder=o}}),require_flatbuffers=__commonJS({"web/node_modules/flatbuffers/js/flatbuffers.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.ByteBuffer=e.Builder=e.Encoding=e.isLittleEndian=e.float64=e.float32=e.int32=e.SIZE_PREFIX_LENGTH=e.FILE_IDENTIFIER_LENGTH=e.SIZEOF_INT=e.SIZEOF_SHORT=void 0;var t=require_constants();Object.defineProperty(e,"SIZEOF_SHORT",{enumerable:!0,get:function(){return t.SIZEOF_SHORT}});var r=require_constants();Object.defineProperty(e,"SIZEOF_INT",{enumerable:!0,get:function(){return r.SIZEOF_INT}});var o=require_constants();Object.defineProperty(e,"FILE_IDENTIFIER_LENGTH",{enumerable:!0,get:function(){return o.FILE_IDENTIFIER_LENGTH}});var u=require_constants();Object.defineProperty(e,"SIZE_PREFIX_LENGTH",{enumerable:!0,get:function(){return u.SIZE_PREFIX_LENGTH}});var l=require_utils();Object.defineProperty(e,"int32",{enumerable:!0,get:function(){return l.int32}}),Object.defineProperty(e,"float32",{enumerable:!0,get:function(){return l.float32}}),Object.defineProperty(e,"float64",{enumerable:!0,get:function(){return l.float64}}),Object.defineProperty(e,"isLittleEndian",{enumerable:!0,get:function(){return l.isLittleEndian}});var c=require_encoding();Object.defineProperty(e,"Encoding",{enumerable:!0,get:function(){return c.Encoding}});var d=require_builder();Object.defineProperty(e,"Builder",{enumerable:!0,get:function(){return d.Builder}});var i=require_byte_buffer();Object.defineProperty(e,"ByteBuffer",{enumerable:!0,get:function(){return i.ByteBuffer}})}}),require_arg_type_and_index=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/arg-type-and-index.js"(e){var t=e&&e.__createBinding||(Object.create?function(d,i,a,n){n===void 0&&(n=a);var s=Object.getOwnPropertyDescriptor(i,a);(!s||("get"in s?!i.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return i[a]}}),Object.defineProperty(d,n,s)}:function(d,i,a,n){n===void 0&&(n=a),d[n]=i[a]}),r=e&&e.__setModuleDefault||(Object.create?function(d,i){Object.defineProperty(d,"default",{enumerable:!0,value:i})}:function(d,i){d.default=i}),o=e&&e.__importStar||function(d){if(d&&d.__esModule)return d;var i={};if(d!=null)for(var a in d)a!=="default"&&Object.prototype.hasOwnProperty.call(d,a)&&t(i,d,a);return r(i,d),i};Object.defineProperty(e,"__esModule",{value:!0}),e.ArgTypeAndIndex=void 0;var u=o(require_flatbuffers()),l=require_arg_type(),c=class te{constructor(){this.bb=null,this.bb_pos=0}__init(i,a){return this.bb_pos=i,this.bb=a,this}static getRootAsArgTypeAndIndex(i,a){return(a||new te).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsArgTypeAndIndex(i,a){return i.setPosition(i.position()+u.SIZE_PREFIX_LENGTH),(a||new te).__init(i.readInt32(i.position())+i.position(),i)}argType(){const i=this.bb.__offset(this.bb_pos,4);return i?this.bb.readInt8(this.bb_pos+i):l.ArgType.INPUT}index(){const i=this.bb.__offset(this.bb_pos,6);return i?this.bb.readUint32(this.bb_pos+i):0}static startArgTypeAndIndex(i){i.startObject(2)}static addArgType(i,a){i.addFieldInt8(0,a,l.ArgType.INPUT)}static addIndex(i,a){i.addFieldInt32(1,a,0)}static endArgTypeAndIndex(i){return i.endObject()}static createArgTypeAndIndex(i,a,n){return te.startArgTypeAndIndex(i),te.addArgType(i,a),te.addIndex(i,n),te.endArgTypeAndIndex(i)}};e.ArgTypeAndIndex=c}}),require_attribute_type=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/attribute-type.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.AttributeType=void 0;var t;(function(r){r[r.UNDEFINED=0]="UNDEFINED",r[r.FLOAT=1]="FLOAT",r[r.INT=2]="INT",r[r.STRING=3]="STRING",r[r.TENSOR=4]="TENSOR",r[r.GRAPH=5]="GRAPH",r[r.FLOATS=6]="FLOATS",r[r.INTS=7]="INTS",r[r.STRINGS=8]="STRINGS",r[r.TENSORS=9]="TENSORS",r[r.GRAPHS=10]="GRAPHS",r[r.SPARSE_TENSOR=11]="SPARSE_TENSOR",r[r.SPARSE_TENSORS=12]="SPARSE_TENSORS"})(t||(e.AttributeType=t={}))}}),require_node_type=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/node-type.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.NodeType=void 0;var t;(function(r){r[r.Primitive=0]="Primitive",r[r.Fused=1]="Fused"})(t||(e.NodeType=t={}))}}),require_node=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/node.js"(e){var t=e&&e.__createBinding||(Object.create?function(i,a,n,s){s===void 0&&(s=n);var p=Object.getOwnPropertyDescriptor(a,n);(!p||("get"in p?!a.__esModule:p.writable||p.configurable))&&(p={enumerable:!0,get:function(){return a[n]}}),Object.defineProperty(i,s,p)}:function(i,a,n,s){s===void 0&&(s=n),i[s]=a[n]}),r=e&&e.__setModuleDefault||(Object.create?function(i,a){Object.defineProperty(i,"default",{enumerable:!0,value:a})}:function(i,a){i.default=a}),o=e&&e.__importStar||function(i){if(i&&i.__esModule)return i;var a={};if(i!=null)for(var n in i)n!=="default"&&Object.prototype.hasOwnProperty.call(i,n)&&t(a,i,n);return r(a,i),a};Object.defineProperty(e,"__esModule",{value:!0}),e.Node=void 0;var u=o(require_flatbuffers()),l=require_attribute(),c=require_node_type(),d=class j{constructor(){this.bb=null,this.bb_pos=0}__init(a,n){return this.bb_pos=a,this.bb=n,this}static getRootAsNode(a,n){return(n||new j).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsNode(a,n){return a.setPosition(a.position()+u.SIZE_PREFIX_LENGTH),(n||new j).__init(a.readInt32(a.position())+a.position(),a)}name(a){const n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,a):null}docString(a){const n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,a):null}domain(a){const n=this.bb.__offset(this.bb_pos,8);return n?this.bb.__string(this.bb_pos+n,a):null}sinceVersion(){const a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readInt32(this.bb_pos+a):0}index(){const a=this.bb.__offset(this.bb_pos,12);return a?this.bb.readUint32(this.bb_pos+a):0}opType(a){const n=this.bb.__offset(this.bb_pos,14);return n?this.bb.__string(this.bb_pos+n,a):null}type(){const a=this.bb.__offset(this.bb_pos,16);return a?this.bb.readInt32(this.bb_pos+a):c.NodeType.Primitive}executionProviderType(a){const n=this.bb.__offset(this.bb_pos,18);return n?this.bb.__string(this.bb_pos+n,a):null}inputs(a,n){const s=this.bb.__offset(this.bb_pos,20);return s?this.bb.__string(this.bb.__vector(this.bb_pos+s)+a*4,n):null}inputsLength(){const a=this.bb.__offset(this.bb_pos,20);return a?this.bb.__vector_len(this.bb_pos+a):0}outputs(a,n){const s=this.bb.__offset(this.bb_pos,22);return s?this.bb.__string(this.bb.__vector(this.bb_pos+s)+a*4,n):null}outputsLength(){const a=this.bb.__offset(this.bb_pos,22);return a?this.bb.__vector_len(this.bb_pos+a):0}attributes(a,n){const s=this.bb.__offset(this.bb_pos,24);return s?(n||new l.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+s)+a*4),this.bb):null}attributesLength(){const a=this.bb.__offset(this.bb_pos,24);return a?this.bb.__vector_len(this.bb_pos+a):0}inputArgCounts(a){const n=this.bb.__offset(this.bb_pos,26);return n?this.bb.readInt32(this.bb.__vector(this.bb_pos+n)+a*4):0}inputArgCountsLength(){const a=this.bb.__offset(this.bb_pos,26);return a?this.bb.__vector_len(this.bb_pos+a):0}inputArgCountsArray(){const a=this.bb.__offset(this.bb_pos,26);return a?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}implicitInputs(a,n){const s=this.bb.__offset(this.bb_pos,28);return s?this.bb.__string(this.bb.__vector(this.bb_pos+s)+a*4,n):null}implicitInputsLength(){const a=this.bb.__offset(this.bb_pos,28);return a?this.bb.__vector_len(this.bb_pos+a):0}static startNode(a){a.startObject(13)}static addName(a,n){a.addFieldOffset(0,n,0)}static addDocString(a,n){a.addFieldOffset(1,n,0)}static addDomain(a,n){a.addFieldOffset(2,n,0)}static addSinceVersion(a,n){a.addFieldInt32(3,n,0)}static addIndex(a,n){a.addFieldInt32(4,n,0)}static addOpType(a,n){a.addFieldOffset(5,n,0)}static addType(a,n){a.addFieldInt32(6,n,c.NodeType.Primitive)}static addExecutionProviderType(a,n){a.addFieldOffset(7,n,0)}static addInputs(a,n){a.addFieldOffset(8,n,0)}static createInputsVector(a,n){a.startVector(4,n.length,4);for(let s=n.length-1;s>=0;s--)a.addOffset(n[s]);return a.endVector()}static startInputsVector(a,n){a.startVector(4,n,4)}static addOutputs(a,n){a.addFieldOffset(9,n,0)}static createOutputsVector(a,n){a.startVector(4,n.length,4);for(let s=n.length-1;s>=0;s--)a.addOffset(n[s]);return a.endVector()}static startOutputsVector(a,n){a.startVector(4,n,4)}static addAttributes(a,n){a.addFieldOffset(10,n,0)}static createAttributesVector(a,n){a.startVector(4,n.length,4);for(let s=n.length-1;s>=0;s--)a.addOffset(n[s]);return a.endVector()}static startAttributesVector(a,n){a.startVector(4,n,4)}static addInputArgCounts(a,n){a.addFieldOffset(11,n,0)}static createInputArgCountsVector(a,n){a.startVector(4,n.length,4);for(let s=n.length-1;s>=0;s--)a.addInt32(n[s]);return a.endVector()}static startInputArgCountsVector(a,n){a.startVector(4,n,4)}static addImplicitInputs(a,n){a.addFieldOffset(12,n,0)}static createImplicitInputsVector(a,n){a.startVector(4,n.length,4);for(let s=n.length-1;s>=0;s--)a.addOffset(n[s]);return a.endVector()}static startImplicitInputsVector(a,n){a.startVector(4,n,4)}static endNode(a){return a.endObject()}static createNode(a,n,s,p,f,h,m,_,y,g,b,v,w,x){return j.startNode(a),j.addName(a,n),j.addDocString(a,s),j.addDomain(a,p),j.addSinceVersion(a,f),j.addIndex(a,h),j.addOpType(a,m),j.addType(a,_),j.addExecutionProviderType(a,y),j.addInputs(a,g),j.addOutputs(a,b),j.addAttributes(a,v),j.addInputArgCounts(a,w),j.addImplicitInputs(a,x),j.endNode(a)}};e.Node=d}}),require_edge_end=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/edge-end.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.EdgeEnd=void 0;var t=class{constructor(){this.bb=null,this.bb_pos=0}__init(r,o){return this.bb_pos=r,this.bb=o,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static sizeOf(){return 12}static createEdgeEnd(r,o,u,l){return r.prep(4,12),r.writeInt32(l),r.writeInt32(u),r.writeInt32(o),r.offset()}};e.EdgeEnd=t}}),require_node_edge=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/node-edge.js"(e){var t=e&&e.__createBinding||(Object.create?function(d,i,a,n){n===void 0&&(n=a);var s=Object.getOwnPropertyDescriptor(i,a);(!s||("get"in s?!i.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return i[a]}}),Object.defineProperty(d,n,s)}:function(d,i,a,n){n===void 0&&(n=a),d[n]=i[a]}),r=e&&e.__setModuleDefault||(Object.create?function(d,i){Object.defineProperty(d,"default",{enumerable:!0,value:i})}:function(d,i){d.default=i}),o=e&&e.__importStar||function(d){if(d&&d.__esModule)return d;var i={};if(d!=null)for(var a in d)a!=="default"&&Object.prototype.hasOwnProperty.call(d,a)&&t(i,d,a);return r(i,d),i};Object.defineProperty(e,"__esModule",{value:!0}),e.NodeEdge=void 0;var u=o(require_flatbuffers()),l=require_edge_end(),c=class J{constructor(){this.bb=null,this.bb_pos=0}__init(i,a){return this.bb_pos=i,this.bb=a,this}static getRootAsNodeEdge(i,a){return(a||new J).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsNodeEdge(i,a){return i.setPosition(i.position()+u.SIZE_PREFIX_LENGTH),(a||new J).__init(i.readInt32(i.position())+i.position(),i)}nodeIndex(){const i=this.bb.__offset(this.bb_pos,4);return i?this.bb.readUint32(this.bb_pos+i):0}inputEdges(i,a){const n=this.bb.__offset(this.bb_pos,6);return n?(a||new l.EdgeEnd).__init(this.bb.__vector(this.bb_pos+n)+i*12,this.bb):null}inputEdgesLength(){const i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__vector_len(this.bb_pos+i):0}outputEdges(i,a){const n=this.bb.__offset(this.bb_pos,8);return n?(a||new l.EdgeEnd).__init(this.bb.__vector(this.bb_pos+n)+i*12,this.bb):null}outputEdgesLength(){const i=this.bb.__offset(this.bb_pos,8);return i?this.bb.__vector_len(this.bb_pos+i):0}static startNodeEdge(i){i.startObject(3)}static addNodeIndex(i,a){i.addFieldInt32(0,a,0)}static addInputEdges(i,a){i.addFieldOffset(1,a,0)}static startInputEdgesVector(i,a){i.startVector(12,a,4)}static addOutputEdges(i,a){i.addFieldOffset(2,a,0)}static startOutputEdgesVector(i,a){i.startVector(12,a,4)}static endNodeEdge(i){return i.endObject()}static createNodeEdge(i,a,n,s){return J.startNodeEdge(i),J.addNodeIndex(i,a),J.addInputEdges(i,n),J.addOutputEdges(i,s),J.endNodeEdge(i)}};e.NodeEdge=c}}),require_nodes_to_optimize_indices=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/nodes-to-optimize-indices.js"(e){var t=e&&e.__createBinding||(Object.create?function(c,d,i,a){a===void 0&&(a=i);var n=Object.getOwnPropertyDescriptor(d,i);(!n||("get"in n?!d.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return d[i]}}),Object.defineProperty(c,a,n)}:function(c,d,i,a){a===void 0&&(a=i),c[a]=d[i]}),r=e&&e.__setModuleDefault||(Object.create?function(c,d){Object.defineProperty(c,"default",{enumerable:!0,value:d})}:function(c,d){c.default=d}),o=e&&e.__importStar||function(c){if(c&&c.__esModule)return c;var d={};if(c!=null)for(var i in c)i!=="default"&&Object.prototype.hasOwnProperty.call(c,i)&&t(d,c,i);return r(d,c),d};Object.defineProperty(e,"__esModule",{value:!0}),e.NodesToOptimizeIndices=void 0;var u=o(require_flatbuffers()),l=class K{constructor(){this.bb=null,this.bb_pos=0}__init(d,i){return this.bb_pos=d,this.bb=i,this}static getRootAsNodesToOptimizeIndices(d,i){return(i||new K).__init(d.readInt32(d.position())+d.position(),d)}static getSizePrefixedRootAsNodesToOptimizeIndices(d,i){return d.setPosition(d.position()+u.SIZE_PREFIX_LENGTH),(i||new K).__init(d.readInt32(d.position())+d.position(),d)}nodeIndices(d){const i=this.bb.__offset(this.bb_pos,4);return i?this.bb.readUint32(this.bb.__vector(this.bb_pos+i)+d*4):0}nodeIndicesLength(){const d=this.bb.__offset(this.bb_pos,4);return d?this.bb.__vector_len(this.bb_pos+d):0}nodeIndicesArray(){const d=this.bb.__offset(this.bb_pos,4);return d?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+d),this.bb.__vector_len(this.bb_pos+d)):null}numInputs(){const d=this.bb.__offset(this.bb_pos,6);return d?this.bb.readUint32(this.bb_pos+d):0}numOutputs(){const d=this.bb.__offset(this.bb_pos,8);return d?this.bb.readUint32(this.bb_pos+d):0}hasVariadicInput(){const d=this.bb.__offset(this.bb_pos,10);return d?!!this.bb.readInt8(this.bb_pos+d):!1}hasVariadicOutput(){const d=this.bb.__offset(this.bb_pos,12);return d?!!this.bb.readInt8(this.bb_pos+d):!1}numVariadicInputs(){const d=this.bb.__offset(this.bb_pos,14);return d?this.bb.readUint32(this.bb_pos+d):0}numVariadicOutputs(){const d=this.bb.__offset(this.bb_pos,16);return d?this.bb.readUint32(this.bb_pos+d):0}static startNodesToOptimizeIndices(d){d.startObject(7)}static addNodeIndices(d,i){d.addFieldOffset(0,i,0)}static createNodeIndicesVector(d,i){d.startVector(4,i.length,4);for(let a=i.length-1;a>=0;a--)d.addInt32(i[a]);return d.endVector()}static startNodeIndicesVector(d,i){d.startVector(4,i,4)}static addNumInputs(d,i){d.addFieldInt32(1,i,0)}static addNumOutputs(d,i){d.addFieldInt32(2,i,0)}static addHasVariadicInput(d,i){d.addFieldInt8(3,+i,0)}static addHasVariadicOutput(d,i){d.addFieldInt8(4,+i,0)}static addNumVariadicInputs(d,i){d.addFieldInt32(5,i,0)}static addNumVariadicOutputs(d,i){d.addFieldInt32(6,i,0)}static endNodesToOptimizeIndices(d){return d.endObject()}static createNodesToOptimizeIndices(d,i,a,n,s,p,f,h){return K.startNodesToOptimizeIndices(d),K.addNodeIndices(d,i),K.addNumInputs(d,a),K.addNumOutputs(d,n),K.addHasVariadicInput(d,s),K.addHasVariadicOutput(d,p),K.addNumVariadicInputs(d,f),K.addNumVariadicOutputs(d,h),K.endNodesToOptimizeIndices(d)}};e.NodesToOptimizeIndices=l}}),require_runtime_optimization_record=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/runtime-optimization-record.js"(e){var t=e&&e.__createBinding||(Object.create?function(d,i,a,n){n===void 0&&(n=a);var s=Object.getOwnPropertyDescriptor(i,a);(!s||("get"in s?!i.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return i[a]}}),Object.defineProperty(d,n,s)}:function(d,i,a,n){n===void 0&&(n=a),d[n]=i[a]}),r=e&&e.__setModuleDefault||(Object.create?function(d,i){Object.defineProperty(d,"default",{enumerable:!0,value:i})}:function(d,i){d.default=i}),o=e&&e.__importStar||function(d){if(d&&d.__esModule)return d;var i={};if(d!=null)for(var a in d)a!=="default"&&Object.prototype.hasOwnProperty.call(d,a)&&t(i,d,a);return r(i,d),i};Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizationRecord=void 0;var u=o(require_flatbuffers()),l=require_nodes_to_optimize_indices(),c=class Se{constructor(){this.bb=null,this.bb_pos=0}__init(i,a){return this.bb_pos=i,this.bb=a,this}static getRootAsRuntimeOptimizationRecord(i,a){return(a||new Se).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsRuntimeOptimizationRecord(i,a){return i.setPosition(i.position()+u.SIZE_PREFIX_LENGTH),(a||new Se).__init(i.readInt32(i.position())+i.position(),i)}actionId(i){const a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__string(this.bb_pos+a,i):null}nodesToOptimizeIndices(i){const a=this.bb.__offset(this.bb_pos,6);return a?(i||new l.NodesToOptimizeIndices).__init(this.bb.__indirect(this.bb_pos+a),this.bb):null}producedOpIds(i,a){const n=this.bb.__offset(this.bb_pos,10);return n?this.bb.__string(this.bb.__vector(this.bb_pos+n)+i*4,a):null}producedOpIdsLength(){const i=this.bb.__offset(this.bb_pos,10);return i?this.bb.__vector_len(this.bb_pos+i):0}static startRuntimeOptimizationRecord(i){i.startObject(4)}static addActionId(i,a){i.addFieldOffset(0,a,0)}static addNodesToOptimizeIndices(i,a){i.addFieldOffset(1,a,0)}static addProducedOpIds(i,a){i.addFieldOffset(3,a,0)}static createProducedOpIdsVector(i,a){i.startVector(4,a.length,4);for(let n=a.length-1;n>=0;n--)i.addOffset(a[n]);return i.endVector()}static startProducedOpIdsVector(i,a){i.startVector(4,a,4)}static endRuntimeOptimizationRecord(i){return i.endObject()}};e.RuntimeOptimizationRecord=c}}),require_runtime_optimization_record_container_entry=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/runtime-optimization-record-container-entry.js"(e){var t=e&&e.__createBinding||(Object.create?function(d,i,a,n){n===void 0&&(n=a);var s=Object.getOwnPropertyDescriptor(i,a);(!s||("get"in s?!i.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return i[a]}}),Object.defineProperty(d,n,s)}:function(d,i,a,n){n===void 0&&(n=a),d[n]=i[a]}),r=e&&e.__setModuleDefault||(Object.create?function(d,i){Object.defineProperty(d,"default",{enumerable:!0,value:i})}:function(d,i){d.default=i}),o=e&&e.__importStar||function(d){if(d&&d.__esModule)return d;var i={};if(d!=null)for(var a in d)a!=="default"&&Object.prototype.hasOwnProperty.call(d,a)&&t(i,d,a);return r(i,d),i};Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizationRecordContainerEntry=void 0;var u=o(require_flatbuffers()),l=require_runtime_optimization_record(),c=class ne{constructor(){this.bb=null,this.bb_pos=0}__init(i,a){return this.bb_pos=i,this.bb=a,this}static getRootAsRuntimeOptimizationRecordContainerEntry(i,a){return(a||new ne).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsRuntimeOptimizationRecordContainerEntry(i,a){return i.setPosition(i.position()+u.SIZE_PREFIX_LENGTH),(a||new ne).__init(i.readInt32(i.position())+i.position(),i)}optimizerName(i){const a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__string(this.bb_pos+a,i):null}runtimeOptimizationRecords(i,a){const n=this.bb.__offset(this.bb_pos,6);return n?(a||new l.RuntimeOptimizationRecord).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+i*4),this.bb):null}runtimeOptimizationRecordsLength(){const i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__vector_len(this.bb_pos+i):0}static startRuntimeOptimizationRecordContainerEntry(i){i.startObject(2)}static addOptimizerName(i,a){i.addFieldOffset(0,a,0)}static addRuntimeOptimizationRecords(i,a){i.addFieldOffset(1,a,0)}static createRuntimeOptimizationRecordsVector(i,a){i.startVector(4,a.length,4);for(let n=a.length-1;n>=0;n--)i.addOffset(a[n]);return i.endVector()}static startRuntimeOptimizationRecordsVector(i,a){i.startVector(4,a,4)}static endRuntimeOptimizationRecordContainerEntry(i){const a=i.endObject();return i.requiredField(a,4),a}static createRuntimeOptimizationRecordContainerEntry(i,a,n){return ne.startRuntimeOptimizationRecordContainerEntry(i),ne.addOptimizerName(i,a),ne.addRuntimeOptimizationRecords(i,n),ne.endRuntimeOptimizationRecordContainerEntry(i)}};e.RuntimeOptimizationRecordContainerEntry=c}}),require_runtime_optimizations=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/runtime-optimizations.js"(e){var t=e&&e.__createBinding||(Object.create?function(d,i,a,n){n===void 0&&(n=a);var s=Object.getOwnPropertyDescriptor(i,a);(!s||("get"in s?!i.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return i[a]}}),Object.defineProperty(d,n,s)}:function(d,i,a,n){n===void 0&&(n=a),d[n]=i[a]}),r=e&&e.__setModuleDefault||(Object.create?function(d,i){Object.defineProperty(d,"default",{enumerable:!0,value:i})}:function(d,i){d.default=i}),o=e&&e.__importStar||function(d){if(d&&d.__esModule)return d;var i={};if(d!=null)for(var a in d)a!=="default"&&Object.prototype.hasOwnProperty.call(d,a)&&t(i,d,a);return r(i,d),i};Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizations=void 0;var u=o(require_flatbuffers()),l=require_runtime_optimization_record_container_entry(),c=class de{constructor(){this.bb=null,this.bb_pos=0}__init(i,a){return this.bb_pos=i,this.bb=a,this}static getRootAsRuntimeOptimizations(i,a){return(a||new de).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsRuntimeOptimizations(i,a){return i.setPosition(i.position()+u.SIZE_PREFIX_LENGTH),(a||new de).__init(i.readInt32(i.position())+i.position(),i)}records(i,a){const n=this.bb.__offset(this.bb_pos,4);return n?(a||new l.RuntimeOptimizationRecordContainerEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+i*4),this.bb):null}recordsLength(){const i=this.bb.__offset(this.bb_pos,4);return i?this.bb.__vector_len(this.bb_pos+i):0}static startRuntimeOptimizations(i){i.startObject(1)}static addRecords(i,a){i.addFieldOffset(0,a,0)}static createRecordsVector(i,a){i.startVector(4,a.length,4);for(let n=a.length-1;n>=0;n--)i.addOffset(a[n]);return i.endVector()}static startRecordsVector(i,a){i.startVector(4,a,4)}static endRuntimeOptimizations(i){return i.endObject()}static createRuntimeOptimizations(i,a){return de.startRuntimeOptimizations(i),de.addRecords(i,a),de.endRuntimeOptimizations(i)}};e.RuntimeOptimizations=c}}),require_tensor_data_type=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/tensor-data-type.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.TensorDataType=void 0;var t;(function(r){r[r.UNDEFINED=0]="UNDEFINED",r[r.FLOAT=1]="FLOAT",r[r.UINT8=2]="UINT8",r[r.INT8=3]="INT8",r[r.UINT16=4]="UINT16",r[r.INT16=5]="INT16",r[r.INT32=6]="INT32",r[r.INT64=7]="INT64",r[r.STRING=8]="STRING",r[r.BOOL=9]="BOOL",r[r.FLOAT16=10]="FLOAT16",r[r.DOUBLE=11]="DOUBLE",r[r.UINT32=12]="UINT32",r[r.UINT64=13]="UINT64",r[r.COMPLEX64=14]="COMPLEX64",r[r.COMPLEX128=15]="COMPLEX128",r[r.BFLOAT16=16]="BFLOAT16",r[r.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",r[r.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",r[r.FLOAT8E5M2=19]="FLOAT8E5M2",r[r.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"})(t||(e.TensorDataType=t={}))}}),require_tensor=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/tensor.js"(e){var t=e&&e.__createBinding||(Object.create?function(d,i,a,n){n===void 0&&(n=a);var s=Object.getOwnPropertyDescriptor(i,a);(!s||("get"in s?!i.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return i[a]}}),Object.defineProperty(d,n,s)}:function(d,i,a,n){n===void 0&&(n=a),d[n]=i[a]}),r=e&&e.__setModuleDefault||(Object.create?function(d,i){Object.defineProperty(d,"default",{enumerable:!0,value:i})}:function(d,i){d.default=i}),o=e&&e.__importStar||function(d){if(d&&d.__esModule)return d;var i={};if(d!=null)for(var a in d)a!=="default"&&Object.prototype.hasOwnProperty.call(d,a)&&t(i,d,a);return r(i,d),i};Object.defineProperty(e,"__esModule",{value:!0}),e.Tensor=void 0;var u=o(require_flatbuffers()),l=require_tensor_data_type(),c=class H{constructor(){this.bb=null,this.bb_pos=0}__init(i,a){return this.bb_pos=i,this.bb=a,this}static getRootAsTensor(i,a){return(a||new H).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsTensor(i,a){return i.setPosition(i.position()+u.SIZE_PREFIX_LENGTH),(a||new H).__init(i.readInt32(i.position())+i.position(),i)}name(i){const a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__string(this.bb_pos+a,i):null}docString(i){const a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__string(this.bb_pos+a,i):null}dims(i){const a=this.bb.__offset(this.bb_pos,8);return a?this.bb.readInt64(this.bb.__vector(this.bb_pos+a)+i*8):BigInt(0)}dimsLength(){const i=this.bb.__offset(this.bb_pos,8);return i?this.bb.__vector_len(this.bb_pos+i):0}dataType(){const i=this.bb.__offset(this.bb_pos,10);return i?this.bb.readInt32(this.bb_pos+i):l.TensorDataType.UNDEFINED}rawData(i){const a=this.bb.__offset(this.bb_pos,12);return a?this.bb.readUint8(this.bb.__vector(this.bb_pos+a)+i):0}rawDataLength(){const i=this.bb.__offset(this.bb_pos,12);return i?this.bb.__vector_len(this.bb_pos+i):0}rawDataArray(){const i=this.bb.__offset(this.bb_pos,12);return i?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+i),this.bb.__vector_len(this.bb_pos+i)):null}stringData(i,a){const n=this.bb.__offset(this.bb_pos,14);return n?this.bb.__string(this.bb.__vector(this.bb_pos+n)+i*4,a):null}stringDataLength(){const i=this.bb.__offset(this.bb_pos,14);return i?this.bb.__vector_len(this.bb_pos+i):0}externalDataOffset(){const i=this.bb.__offset(this.bb_pos,16);return i?this.bb.readInt64(this.bb_pos+i):BigInt("-1")}static startTensor(i){i.startObject(7)}static addName(i,a){i.addFieldOffset(0,a,0)}static addDocString(i,a){i.addFieldOffset(1,a,0)}static addDims(i,a){i.addFieldOffset(2,a,0)}static createDimsVector(i,a){i.startVector(8,a.length,8);for(let n=a.length-1;n>=0;n--)i.addInt64(a[n]);return i.endVector()}static startDimsVector(i,a){i.startVector(8,a,8)}static addDataType(i,a){i.addFieldInt32(3,a,l.TensorDataType.UNDEFINED)}static addRawData(i,a){i.addFieldOffset(4,a,0)}static createRawDataVector(i,a){i.startVector(1,a.length,1);for(let n=a.length-1;n>=0;n--)i.addInt8(a[n]);return i.endVector()}static startRawDataVector(i,a){i.startVector(1,a,1)}static addStringData(i,a){i.addFieldOffset(5,a,0)}static createStringDataVector(i,a){i.startVector(4,a.length,4);for(let n=a.length-1;n>=0;n--)i.addOffset(a[n]);return i.endVector()}static startStringDataVector(i,a){i.startVector(4,a,4)}static addExternalDataOffset(i,a){i.addFieldInt64(6,a,BigInt("-1"))}static endTensor(i){return i.endObject()}static createTensor(i,a,n,s,p,f,h,m){return H.startTensor(i),H.addName(i,a),H.addDocString(i,n),H.addDims(i,s),H.addDataType(i,p),H.addRawData(i,f),H.addStringData(i,h),H.addExternalDataOffset(i,m),H.endTensor(i)}};e.Tensor=c}}),require_sparse_tensor=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/sparse-tensor.js"(e){var t=e&&e.__createBinding||(Object.create?function(d,i,a,n){n===void 0&&(n=a);var s=Object.getOwnPropertyDescriptor(i,a);(!s||("get"in s?!i.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return i[a]}}),Object.defineProperty(d,n,s)}:function(d,i,a,n){n===void 0&&(n=a),d[n]=i[a]}),r=e&&e.__setModuleDefault||(Object.create?function(d,i){Object.defineProperty(d,"default",{enumerable:!0,value:i})}:function(d,i){d.default=i}),o=e&&e.__importStar||function(d){if(d&&d.__esModule)return d;var i={};if(d!=null)for(var a in d)a!=="default"&&Object.prototype.hasOwnProperty.call(d,a)&&t(i,d,a);return r(i,d),i};Object.defineProperty(e,"__esModule",{value:!0}),e.SparseTensor=void 0;var u=o(require_flatbuffers()),l=require_tensor(),c=class Te{constructor(){this.bb=null,this.bb_pos=0}__init(i,a){return this.bb_pos=i,this.bb=a,this}static getRootAsSparseTensor(i,a){return(a||new Te).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsSparseTensor(i,a){return i.setPosition(i.position()+u.SIZE_PREFIX_LENGTH),(a||new Te).__init(i.readInt32(i.position())+i.position(),i)}values(i){const a=this.bb.__offset(this.bb_pos,4);return a?(i||new l.Tensor).__init(this.bb.__indirect(this.bb_pos+a),this.bb):null}indices(i){const a=this.bb.__offset(this.bb_pos,6);return a?(i||new l.Tensor).__init(this.bb.__indirect(this.bb_pos+a),this.bb):null}dims(i){const a=this.bb.__offset(this.bb_pos,8);return a?this.bb.readInt64(this.bb.__vector(this.bb_pos+a)+i*8):BigInt(0)}dimsLength(){const i=this.bb.__offset(this.bb_pos,8);return i?this.bb.__vector_len(this.bb_pos+i):0}static startSparseTensor(i){i.startObject(3)}static addValues(i,a){i.addFieldOffset(0,a,0)}static addIndices(i,a){i.addFieldOffset(1,a,0)}static addDims(i,a){i.addFieldOffset(2,a,0)}static createDimsVector(i,a){i.startVector(8,a.length,8);for(let n=a.length-1;n>=0;n--)i.addInt64(a[n]);return i.endVector()}static startDimsVector(i,a){i.startVector(8,a,8)}static endSparseTensor(i){return i.endObject()}};e.SparseTensor=c}}),require_map_type=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/map-type.js"(e){var t=e&&e.__createBinding||(Object.create?function(i,a,n,s){s===void 0&&(s=n);var p=Object.getOwnPropertyDescriptor(a,n);(!p||("get"in p?!a.__esModule:p.writable||p.configurable))&&(p={enumerable:!0,get:function(){return a[n]}}),Object.defineProperty(i,s,p)}:function(i,a,n,s){s===void 0&&(s=n),i[s]=a[n]}),r=e&&e.__setModuleDefault||(Object.create?function(i,a){Object.defineProperty(i,"default",{enumerable:!0,value:a})}:function(i,a){i.default=a}),o=e&&e.__importStar||function(i){if(i&&i.__esModule)return i;var a={};if(i!=null)for(var n in i)n!=="default"&&Object.prototype.hasOwnProperty.call(i,n)&&t(a,i,n);return r(a,i),a};Object.defineProperty(e,"__esModule",{value:!0}),e.MapType=void 0;var u=o(require_flatbuffers()),l=require_tensor_data_type(),c=require_type_info(),d=class Ie{constructor(){this.bb=null,this.bb_pos=0}__init(a,n){return this.bb_pos=a,this.bb=n,this}static getRootAsMapType(a,n){return(n||new Ie).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsMapType(a,n){return a.setPosition(a.position()+u.SIZE_PREFIX_LENGTH),(n||new Ie).__init(a.readInt32(a.position())+a.position(),a)}keyType(){const a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt32(this.bb_pos+a):l.TensorDataType.UNDEFINED}valueType(a){const n=this.bb.__offset(this.bb_pos,6);return n?(a||new c.TypeInfo).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startMapType(a){a.startObject(2)}static addKeyType(a,n){a.addFieldInt32(0,n,l.TensorDataType.UNDEFINED)}static addValueType(a,n){a.addFieldOffset(1,n,0)}static endMapType(a){return a.endObject()}};e.MapType=d}}),require_sequence_type=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/sequence-type.js"(e){var t=e&&e.__createBinding||(Object.create?function(d,i,a,n){n===void 0&&(n=a);var s=Object.getOwnPropertyDescriptor(i,a);(!s||("get"in s?!i.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return i[a]}}),Object.defineProperty(d,n,s)}:function(d,i,a,n){n===void 0&&(n=a),d[n]=i[a]}),r=e&&e.__setModuleDefault||(Object.create?function(d,i){Object.defineProperty(d,"default",{enumerable:!0,value:i})}:function(d,i){d.default=i}),o=e&&e.__importStar||function(d){if(d&&d.__esModule)return d;var i={};if(d!=null)for(var a in d)a!=="default"&&Object.prototype.hasOwnProperty.call(d,a)&&t(i,d,a);return r(i,d),i};Object.defineProperty(e,"__esModule",{value:!0}),e.SequenceType=void 0;var u=o(require_flatbuffers()),l=require_type_info(),c=class pe{constructor(){this.bb=null,this.bb_pos=0}__init(i,a){return this.bb_pos=i,this.bb=a,this}static getRootAsSequenceType(i,a){return(a||new pe).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsSequenceType(i,a){return i.setPosition(i.position()+u.SIZE_PREFIX_LENGTH),(a||new pe).__init(i.readInt32(i.position())+i.position(),i)}elemType(i){const a=this.bb.__offset(this.bb_pos,4);return a?(i||new l.TypeInfo).__init(this.bb.__indirect(this.bb_pos+a),this.bb):null}static startSequenceType(i){i.startObject(1)}static addElemType(i,a){i.addFieldOffset(0,a,0)}static endSequenceType(i){return i.endObject()}static createSequenceType(i,a){return pe.startSequenceType(i),pe.addElemType(i,a),pe.endSequenceType(i)}};e.SequenceType=c}}),require_dimension_value_type=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/dimension-value-type.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.DimensionValueType=void 0;var t;(function(r){r[r.UNKNOWN=0]="UNKNOWN",r[r.VALUE=1]="VALUE",r[r.PARAM=2]="PARAM"})(t||(e.DimensionValueType=t={}))}}),require_dimension_value=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/dimension-value.js"(e){var t=e&&e.__createBinding||(Object.create?function(d,i,a,n){n===void 0&&(n=a);var s=Object.getOwnPropertyDescriptor(i,a);(!s||("get"in s?!i.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return i[a]}}),Object.defineProperty(d,n,s)}:function(d,i,a,n){n===void 0&&(n=a),d[n]=i[a]}),r=e&&e.__setModuleDefault||(Object.create?function(d,i){Object.defineProperty(d,"default",{enumerable:!0,value:i})}:function(d,i){d.default=i}),o=e&&e.__importStar||function(d){if(d&&d.__esModule)return d;var i={};if(d!=null)for(var a in d)a!=="default"&&Object.prototype.hasOwnProperty.call(d,a)&&t(i,d,a);return r(i,d),i};Object.defineProperty(e,"__esModule",{value:!0}),e.DimensionValue=void 0;var u=o(require_flatbuffers()),l=require_dimension_value_type(),c=class Y{constructor(){this.bb=null,this.bb_pos=0}__init(i,a){return this.bb_pos=i,this.bb=a,this}static getRootAsDimensionValue(i,a){return(a||new Y).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsDimensionValue(i,a){return i.setPosition(i.position()+u.SIZE_PREFIX_LENGTH),(a||new Y).__init(i.readInt32(i.position())+i.position(),i)}dimType(){const i=this.bb.__offset(this.bb_pos,4);return i?this.bb.readInt8(this.bb_pos+i):l.DimensionValueType.UNKNOWN}dimValue(){const i=this.bb.__offset(this.bb_pos,6);return i?this.bb.readInt64(this.bb_pos+i):BigInt("0")}dimParam(i){const a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__string(this.bb_pos+a,i):null}static startDimensionValue(i){i.startObject(3)}static addDimType(i,a){i.addFieldInt8(0,a,l.DimensionValueType.UNKNOWN)}static addDimValue(i,a){i.addFieldInt64(1,a,BigInt("0"))}static addDimParam(i,a){i.addFieldOffset(2,a,0)}static endDimensionValue(i){return i.endObject()}static createDimensionValue(i,a,n,s){return Y.startDimensionValue(i),Y.addDimType(i,a),Y.addDimValue(i,n),Y.addDimParam(i,s),Y.endDimensionValue(i)}};e.DimensionValue=c}}),require_dimension=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/dimension.js"(e){var t=e&&e.__createBinding||(Object.create?function(d,i,a,n){n===void 0&&(n=a);var s=Object.getOwnPropertyDescriptor(i,a);(!s||("get"in s?!i.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return i[a]}}),Object.defineProperty(d,n,s)}:function(d,i,a,n){n===void 0&&(n=a),d[n]=i[a]}),r=e&&e.__setModuleDefault||(Object.create?function(d,i){Object.defineProperty(d,"default",{enumerable:!0,value:i})}:function(d,i){d.default=i}),o=e&&e.__importStar||function(d){if(d&&d.__esModule)return d;var i={};if(d!=null)for(var a in d)a!=="default"&&Object.prototype.hasOwnProperty.call(d,a)&&t(i,d,a);return r(i,d),i};Object.defineProperty(e,"__esModule",{value:!0}),e.Dimension=void 0;var u=o(require_flatbuffers()),l=require_dimension_value(),c=class re{constructor(){this.bb=null,this.bb_pos=0}__init(i,a){return this.bb_pos=i,this.bb=a,this}static getRootAsDimension(i,a){return(a||new re).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsDimension(i,a){return i.setPosition(i.position()+u.SIZE_PREFIX_LENGTH),(a||new re).__init(i.readInt32(i.position())+i.position(),i)}value(i){const a=this.bb.__offset(this.bb_pos,4);return a?(i||new l.DimensionValue).__init(this.bb.__indirect(this.bb_pos+a),this.bb):null}denotation(i){const a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__string(this.bb_pos+a,i):null}static startDimension(i){i.startObject(2)}static addValue(i,a){i.addFieldOffset(0,a,0)}static addDenotation(i,a){i.addFieldOffset(1,a,0)}static endDimension(i){return i.endObject()}static createDimension(i,a,n){return re.startDimension(i),re.addValue(i,a),re.addDenotation(i,n),re.endDimension(i)}};e.Dimension=c}}),require_shape=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/shape.js"(e){var t=e&&e.__createBinding||(Object.create?function(d,i,a,n){n===void 0&&(n=a);var s=Object.getOwnPropertyDescriptor(i,a);(!s||("get"in s?!i.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return i[a]}}),Object.defineProperty(d,n,s)}:function(d,i,a,n){n===void 0&&(n=a),d[n]=i[a]}),r=e&&e.__setModuleDefault||(Object.create?function(d,i){Object.defineProperty(d,"default",{enumerable:!0,value:i})}:function(d,i){d.default=i}),o=e&&e.__importStar||function(d){if(d&&d.__esModule)return d;var i={};if(d!=null)for(var a in d)a!=="default"&&Object.prototype.hasOwnProperty.call(d,a)&&t(i,d,a);return r(i,d),i};Object.defineProperty(e,"__esModule",{value:!0}),e.Shape=void 0;var u=o(require_flatbuffers()),l=require_dimension(),c=class fe{constructor(){this.bb=null,this.bb_pos=0}__init(i,a){return this.bb_pos=i,this.bb=a,this}static getRootAsShape(i,a){return(a||new fe).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsShape(i,a){return i.setPosition(i.position()+u.SIZE_PREFIX_LENGTH),(a||new fe).__init(i.readInt32(i.position())+i.position(),i)}dim(i,a){const n=this.bb.__offset(this.bb_pos,4);return n?(a||new l.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+i*4),this.bb):null}dimLength(){const i=this.bb.__offset(this.bb_pos,4);return i?this.bb.__vector_len(this.bb_pos+i):0}static startShape(i){i.startObject(1)}static addDim(i,a){i.addFieldOffset(0,a,0)}static createDimVector(i,a){i.startVector(4,a.length,4);for(let n=a.length-1;n>=0;n--)i.addOffset(a[n]);return i.endVector()}static startDimVector(i,a){i.startVector(4,a,4)}static endShape(i){return i.endObject()}static createShape(i,a){return fe.startShape(i),fe.addDim(i,a),fe.endShape(i)}};e.Shape=c}}),require_tensor_type_and_shape=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/tensor-type-and-shape.js"(e){var t=e&&e.__createBinding||(Object.create?function(i,a,n,s){s===void 0&&(s=n);var p=Object.getOwnPropertyDescriptor(a,n);(!p||("get"in p?!a.__esModule:p.writable||p.configurable))&&(p={enumerable:!0,get:function(){return a[n]}}),Object.defineProperty(i,s,p)}:function(i,a,n,s){s===void 0&&(s=n),i[s]=a[n]}),r=e&&e.__setModuleDefault||(Object.create?function(i,a){Object.defineProperty(i,"default",{enumerable:!0,value:a})}:function(i,a){i.default=a}),o=e&&e.__importStar||function(i){if(i&&i.__esModule)return i;var a={};if(i!=null)for(var n in i)n!=="default"&&Object.prototype.hasOwnProperty.call(i,n)&&t(a,i,n);return r(a,i),a};Object.defineProperty(e,"__esModule",{value:!0}),e.TensorTypeAndShape=void 0;var u=o(require_flatbuffers()),l=require_shape(),c=require_tensor_data_type(),d=class $e{constructor(){this.bb=null,this.bb_pos=0}__init(a,n){return this.bb_pos=a,this.bb=n,this}static getRootAsTensorTypeAndShape(a,n){return(n||new $e).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsTensorTypeAndShape(a,n){return a.setPosition(a.position()+u.SIZE_PREFIX_LENGTH),(n||new $e).__init(a.readInt32(a.position())+a.position(),a)}elemType(){const a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt32(this.bb_pos+a):c.TensorDataType.UNDEFINED}shape(a){const n=this.bb.__offset(this.bb_pos,6);return n?(a||new l.Shape).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startTensorTypeAndShape(a){a.startObject(2)}static addElemType(a,n){a.addFieldInt32(0,n,c.TensorDataType.UNDEFINED)}static addShape(a,n){a.addFieldOffset(1,n,0)}static endTensorTypeAndShape(a){return a.endObject()}};e.TensorTypeAndShape=d}}),require_type_info_value=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/type-info-value.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.unionListToTypeInfoValue=e.unionToTypeInfoValue=e.TypeInfoValue=void 0;var t=require_map_type(),r=require_sequence_type(),o=require_tensor_type_and_shape(),u;(function(d){d[d.NONE=0]="NONE",d[d.tensor_type=1]="tensor_type",d[d.sequence_type=2]="sequence_type",d[d.map_type=3]="map_type"})(u||(e.TypeInfoValue=u={}));function l(d,i){switch(u[d]){case"NONE":return null;case"tensor_type":return i(new o.TensorTypeAndShape);case"sequence_type":return i(new r.SequenceType);case"map_type":return i(new t.MapType);default:return null}}e.unionToTypeInfoValue=l;function c(d,i,a){switch(u[d]){case"NONE":return null;case"tensor_type":return i(a,new o.TensorTypeAndShape);case"sequence_type":return i(a,new r.SequenceType);case"map_type":return i(a,new t.MapType);default:return null}}e.unionListToTypeInfoValue=c}}),require_type_info=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/type-info.js"(e){var t=e&&e.__createBinding||(Object.create?function(d,i,a,n){n===void 0&&(n=a);var s=Object.getOwnPropertyDescriptor(i,a);(!s||("get"in s?!i.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return i[a]}}),Object.defineProperty(d,n,s)}:function(d,i,a,n){n===void 0&&(n=a),d[n]=i[a]}),r=e&&e.__setModuleDefault||(Object.create?function(d,i){Object.defineProperty(d,"default",{enumerable:!0,value:i})}:function(d,i){d.default=i}),o=e&&e.__importStar||function(d){if(d&&d.__esModule)return d;var i={};if(d!=null)for(var a in d)a!=="default"&&Object.prototype.hasOwnProperty.call(d,a)&&t(i,d,a);return r(i,d),i};Object.defineProperty(e,"__esModule",{value:!0}),e.TypeInfo=void 0;var u=o(require_flatbuffers()),l=require_type_info_value(),c=class Q{constructor(){this.bb=null,this.bb_pos=0}__init(i,a){return this.bb_pos=i,this.bb=a,this}static getRootAsTypeInfo(i,a){return(a||new Q).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsTypeInfo(i,a){return i.setPosition(i.position()+u.SIZE_PREFIX_LENGTH),(a||new Q).__init(i.readInt32(i.position())+i.position(),i)}denotation(i){const a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__string(this.bb_pos+a,i):null}valueType(){const i=this.bb.__offset(this.bb_pos,6);return i?this.bb.readUint8(this.bb_pos+i):l.TypeInfoValue.NONE}value(i){const a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__union(i,this.bb_pos+a):null}static startTypeInfo(i){i.startObject(3)}static addDenotation(i,a){i.addFieldOffset(0,a,0)}static addValueType(i,a){i.addFieldInt8(1,a,l.TypeInfoValue.NONE)}static addValue(i,a){i.addFieldOffset(2,a,0)}static endTypeInfo(i){return i.endObject()}static createTypeInfo(i,a,n,s){return Q.startTypeInfo(i),Q.addDenotation(i,a),Q.addValueType(i,n),Q.addValue(i,s),Q.endTypeInfo(i)}};e.TypeInfo=c}}),require_value_info=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/value-info.js"(e){var t=e&&e.__createBinding||(Object.create?function(d,i,a,n){n===void 0&&(n=a);var s=Object.getOwnPropertyDescriptor(i,a);(!s||("get"in s?!i.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return i[a]}}),Object.defineProperty(d,n,s)}:function(d,i,a,n){n===void 0&&(n=a),d[n]=i[a]}),r=e&&e.__setModuleDefault||(Object.create?function(d,i){Object.defineProperty(d,"default",{enumerable:!0,value:i})}:function(d,i){d.default=i}),o=e&&e.__importStar||function(d){if(d&&d.__esModule)return d;var i={};if(d!=null)for(var a in d)a!=="default"&&Object.prototype.hasOwnProperty.call(d,a)&&t(i,d,a);return r(i,d),i};Object.defineProperty(e,"__esModule",{value:!0}),e.ValueInfo=void 0;var u=o(require_flatbuffers()),l=require_type_info(),c=class Pe{constructor(){this.bb=null,this.bb_pos=0}__init(i,a){return this.bb_pos=i,this.bb=a,this}static getRootAsValueInfo(i,a){return(a||new Pe).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsValueInfo(i,a){return i.setPosition(i.position()+u.SIZE_PREFIX_LENGTH),(a||new Pe).__init(i.readInt32(i.position())+i.position(),i)}name(i){const a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__string(this.bb_pos+a,i):null}docString(i){const a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__string(this.bb_pos+a,i):null}type(i){const a=this.bb.__offset(this.bb_pos,8);return a?(i||new l.TypeInfo).__init(this.bb.__indirect(this.bb_pos+a),this.bb):null}static startValueInfo(i){i.startObject(3)}static addName(i,a){i.addFieldOffset(0,a,0)}static addDocString(i,a){i.addFieldOffset(1,a,0)}static addType(i,a){i.addFieldOffset(2,a,0)}static endValueInfo(i){return i.endObject()}};e.ValueInfo=c}}),require_graph=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/graph.js"(e){var t=e&&e.__createBinding||(Object.create?function(p,f,h,m){m===void 0&&(m=h);var _=Object.getOwnPropertyDescriptor(f,h);(!_||("get"in _?!f.__esModule:_.writable||_.configurable))&&(_={enumerable:!0,get:function(){return f[h]}}),Object.defineProperty(p,m,_)}:function(p,f,h,m){m===void 0&&(m=h),p[m]=f[h]}),r=e&&e.__setModuleDefault||(Object.create?function(p,f){Object.defineProperty(p,"default",{enumerable:!0,value:f})}:function(p,f){p.default=f}),o=e&&e.__importStar||function(p){if(p&&p.__esModule)return p;var f={};if(p!=null)for(var h in p)h!=="default"&&Object.prototype.hasOwnProperty.call(p,h)&&t(f,p,h);return r(f,p),f};Object.defineProperty(e,"__esModule",{value:!0}),e.Graph=void 0;var u=o(require_flatbuffers()),l=require_node(),c=require_node_edge(),d=require_runtime_optimizations(),i=require_sparse_tensor(),a=require_tensor(),n=require_value_info(),s=class Ee{constructor(){this.bb=null,this.bb_pos=0}__init(f,h){return this.bb_pos=f,this.bb=h,this}static getRootAsGraph(f,h){return(h||new Ee).__init(f.readInt32(f.position())+f.position(),f)}static getSizePrefixedRootAsGraph(f,h){return f.setPosition(f.position()+u.SIZE_PREFIX_LENGTH),(h||new Ee).__init(f.readInt32(f.position())+f.position(),f)}initializers(f,h){const m=this.bb.__offset(this.bb_pos,4);return m?(h||new a.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+m)+f*4),this.bb):null}initializersLength(){const f=this.bb.__offset(this.bb_pos,4);return f?this.bb.__vector_len(this.bb_pos+f):0}nodeArgs(f,h){const m=this.bb.__offset(this.bb_pos,6);return m?(h||new n.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+m)+f*4),this.bb):null}nodeArgsLength(){const f=this.bb.__offset(this.bb_pos,6);return f?this.bb.__vector_len(this.bb_pos+f):0}nodes(f,h){const m=this.bb.__offset(this.bb_pos,8);return m?(h||new l.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+m)+f*4),this.bb):null}nodesLength(){const f=this.bb.__offset(this.bb_pos,8);return f?this.bb.__vector_len(this.bb_pos+f):0}maxNodeIndex(){const f=this.bb.__offset(this.bb_pos,10);return f?this.bb.readUint32(this.bb_pos+f):0}nodeEdges(f,h){const m=this.bb.__offset(this.bb_pos,12);return m?(h||new c.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+m)+f*4),this.bb):null}nodeEdgesLength(){const f=this.bb.__offset(this.bb_pos,12);return f?this.bb.__vector_len(this.bb_pos+f):0}inputs(f,h){const m=this.bb.__offset(this.bb_pos,14);return m?this.bb.__string(this.bb.__vector(this.bb_pos+m)+f*4,h):null}inputsLength(){const f=this.bb.__offset(this.bb_pos,14);return f?this.bb.__vector_len(this.bb_pos+f):0}outputs(f,h){const m=this.bb.__offset(this.bb_pos,16);return m?this.bb.__string(this.bb.__vector(this.bb_pos+m)+f*4,h):null}outputsLength(){const f=this.bb.__offset(this.bb_pos,16);return f?this.bb.__vector_len(this.bb_pos+f):0}sparseInitializers(f,h){const m=this.bb.__offset(this.bb_pos,18);return m?(h||new i.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+m)+f*4),this.bb):null}sparseInitializersLength(){const f=this.bb.__offset(this.bb_pos,18);return f?this.bb.__vector_len(this.bb_pos+f):0}runtimeOptimizations(f){const h=this.bb.__offset(this.bb_pos,20);return h?(f||new d.RuntimeOptimizations).__init(this.bb.__indirect(this.bb_pos+h),this.bb):null}static startGraph(f){f.startObject(9)}static addInitializers(f,h){f.addFieldOffset(0,h,0)}static createInitializersVector(f,h){f.startVector(4,h.length,4);for(let m=h.length-1;m>=0;m--)f.addOffset(h[m]);return f.endVector()}static startInitializersVector(f,h){f.startVector(4,h,4)}static addNodeArgs(f,h){f.addFieldOffset(1,h,0)}static createNodeArgsVector(f,h){f.startVector(4,h.length,4);for(let m=h.length-1;m>=0;m--)f.addOffset(h[m]);return f.endVector()}static startNodeArgsVector(f,h){f.startVector(4,h,4)}static addNodes(f,h){f.addFieldOffset(2,h,0)}static createNodesVector(f,h){f.startVector(4,h.length,4);for(let m=h.length-1;m>=0;m--)f.addOffset(h[m]);return f.endVector()}static startNodesVector(f,h){f.startVector(4,h,4)}static addMaxNodeIndex(f,h){f.addFieldInt32(3,h,0)}static addNodeEdges(f,h){f.addFieldOffset(4,h,0)}static createNodeEdgesVector(f,h){f.startVector(4,h.length,4);for(let m=h.length-1;m>=0;m--)f.addOffset(h[m]);return f.endVector()}static startNodeEdgesVector(f,h){f.startVector(4,h,4)}static addInputs(f,h){f.addFieldOffset(5,h,0)}static createInputsVector(f,h){f.startVector(4,h.length,4);for(let m=h.length-1;m>=0;m--)f.addOffset(h[m]);return f.endVector()}static startInputsVector(f,h){f.startVector(4,h,4)}static addOutputs(f,h){f.addFieldOffset(6,h,0)}static createOutputsVector(f,h){f.startVector(4,h.length,4);for(let m=h.length-1;m>=0;m--)f.addOffset(h[m]);return f.endVector()}static startOutputsVector(f,h){f.startVector(4,h,4)}static addSparseInitializers(f,h){f.addFieldOffset(7,h,0)}static createSparseInitializersVector(f,h){f.startVector(4,h.length,4);for(let m=h.length-1;m>=0;m--)f.addOffset(h[m]);return f.endVector()}static startSparseInitializersVector(f,h){f.startVector(4,h,4)}static addRuntimeOptimizations(f,h){f.addFieldOffset(8,h,0)}static endGraph(f){return f.endObject()}};e.Graph=s}}),require_attribute=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/attribute.js"(e){var t=e&&e.__createBinding||(Object.create?function(a,n,s,p){p===void 0&&(p=s);var f=Object.getOwnPropertyDescriptor(n,s);(!f||("get"in f?!n.__esModule:f.writable||f.configurable))&&(f={enumerable:!0,get:function(){return n[s]}}),Object.defineProperty(a,p,f)}:function(a,n,s,p){p===void 0&&(p=s),a[p]=n[s]}),r=e&&e.__setModuleDefault||(Object.create?function(a,n){Object.defineProperty(a,"default",{enumerable:!0,value:n})}:function(a,n){a.default=n}),o=e&&e.__importStar||function(a){if(a&&a.__esModule)return a;var n={};if(a!=null)for(var s in a)s!=="default"&&Object.prototype.hasOwnProperty.call(a,s)&&t(n,a,s);return r(n,a),n};Object.defineProperty(e,"__esModule",{value:!0}),e.Attribute=void 0;var u=o(require_flatbuffers()),l=require_attribute_type(),c=require_graph(),d=require_tensor(),i=class Oe{constructor(){this.bb=null,this.bb_pos=0}__init(n,s){return this.bb_pos=n,this.bb=s,this}static getRootAsAttribute(n,s){return(s||new Oe).__init(n.readInt32(n.position())+n.position(),n)}static getSizePrefixedRootAsAttribute(n,s){return n.setPosition(n.position()+u.SIZE_PREFIX_LENGTH),(s||new Oe).__init(n.readInt32(n.position())+n.position(),n)}name(n){const s=this.bb.__offset(this.bb_pos,4);return s?this.bb.__string(this.bb_pos+s,n):null}docString(n){const s=this.bb.__offset(this.bb_pos,6);return s?this.bb.__string(this.bb_pos+s,n):null}type(){const n=this.bb.__offset(this.bb_pos,8);return n?this.bb.readInt32(this.bb_pos+n):l.AttributeType.UNDEFINED}f(){const n=this.bb.__offset(this.bb_pos,10);return n?this.bb.readFloat32(this.bb_pos+n):0}i(){const n=this.bb.__offset(this.bb_pos,12);return n?this.bb.readInt64(this.bb_pos+n):BigInt("0")}s(n){const s=this.bb.__offset(this.bb_pos,14);return s?this.bb.__string(this.bb_pos+s,n):null}t(n){const s=this.bb.__offset(this.bb_pos,16);return s?(n||new d.Tensor).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}g(n){const s=this.bb.__offset(this.bb_pos,18);return s?(n||new c.Graph).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}floats(n){const s=this.bb.__offset(this.bb_pos,20);return s?this.bb.readFloat32(this.bb.__vector(this.bb_pos+s)+n*4):0}floatsLength(){const n=this.bb.__offset(this.bb_pos,20);return n?this.bb.__vector_len(this.bb_pos+n):0}floatsArray(){const n=this.bb.__offset(this.bb_pos,20);return n?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+n),this.bb.__vector_len(this.bb_pos+n)):null}ints(n){const s=this.bb.__offset(this.bb_pos,22);return s?this.bb.readInt64(this.bb.__vector(this.bb_pos+s)+n*8):BigInt(0)}intsLength(){const n=this.bb.__offset(this.bb_pos,22);return n?this.bb.__vector_len(this.bb_pos+n):0}strings(n,s){const p=this.bb.__offset(this.bb_pos,24);return p?this.bb.__string(this.bb.__vector(this.bb_pos+p)+n*4,s):null}stringsLength(){const n=this.bb.__offset(this.bb_pos,24);return n?this.bb.__vector_len(this.bb_pos+n):0}tensors(n,s){const p=this.bb.__offset(this.bb_pos,26);return p?(s||new d.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+p)+n*4),this.bb):null}tensorsLength(){const n=this.bb.__offset(this.bb_pos,26);return n?this.bb.__vector_len(this.bb_pos+n):0}graphs(n,s){const p=this.bb.__offset(this.bb_pos,28);return p?(s||new c.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+p)+n*4),this.bb):null}graphsLength(){const n=this.bb.__offset(this.bb_pos,28);return n?this.bb.__vector_len(this.bb_pos+n):0}static startAttribute(n){n.startObject(13)}static addName(n,s){n.addFieldOffset(0,s,0)}static addDocString(n,s){n.addFieldOffset(1,s,0)}static addType(n,s){n.addFieldInt32(2,s,l.AttributeType.UNDEFINED)}static addF(n,s){n.addFieldFloat32(3,s,0)}static addI(n,s){n.addFieldInt64(4,s,BigInt("0"))}static addS(n,s){n.addFieldOffset(5,s,0)}static addT(n,s){n.addFieldOffset(6,s,0)}static addG(n,s){n.addFieldOffset(7,s,0)}static addFloats(n,s){n.addFieldOffset(8,s,0)}static createFloatsVector(n,s){n.startVector(4,s.length,4);for(let p=s.length-1;p>=0;p--)n.addFloat32(s[p]);return n.endVector()}static startFloatsVector(n,s){n.startVector(4,s,4)}static addInts(n,s){n.addFieldOffset(9,s,0)}static createIntsVector(n,s){n.startVector(8,s.length,8);for(let p=s.length-1;p>=0;p--)n.addInt64(s[p]);return n.endVector()}static startIntsVector(n,s){n.startVector(8,s,8)}static addStrings(n,s){n.addFieldOffset(10,s,0)}static createStringsVector(n,s){n.startVector(4,s.length,4);for(let p=s.length-1;p>=0;p--)n.addOffset(s[p]);return n.endVector()}static startStringsVector(n,s){n.startVector(4,s,4)}static addTensors(n,s){n.addFieldOffset(11,s,0)}static createTensorsVector(n,s){n.startVector(4,s.length,4);for(let p=s.length-1;p>=0;p--)n.addOffset(s[p]);return n.endVector()}static startTensorsVector(n,s){n.startVector(4,s,4)}static addGraphs(n,s){n.addFieldOffset(12,s,0)}static createGraphsVector(n,s){n.startVector(4,s.length,4);for(let p=s.length-1;p>=0;p--)n.addOffset(s[p]);return n.endVector()}static startGraphsVector(n,s){n.startVector(4,s,4)}static endAttribute(n){return n.endObject()}};e.Attribute=i}}),require_deprecated_kernel_create_infos=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/deprecated-kernel-create-infos.js"(e){var t=e&&e.__createBinding||(Object.create?function(c,d,i,a){a===void 0&&(a=i);var n=Object.getOwnPropertyDescriptor(d,i);(!n||("get"in n?!d.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return d[i]}}),Object.defineProperty(c,a,n)}:function(c,d,i,a){a===void 0&&(a=i),c[a]=d[i]}),r=e&&e.__setModuleDefault||(Object.create?function(c,d){Object.defineProperty(c,"default",{enumerable:!0,value:d})}:function(c,d){c.default=d}),o=e&&e.__importStar||function(c){if(c&&c.__esModule)return c;var d={};if(c!=null)for(var i in c)i!=="default"&&Object.prototype.hasOwnProperty.call(c,i)&&t(d,c,i);return r(d,c),d};Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedKernelCreateInfos=void 0;var u=o(require_flatbuffers()),l=class ie{constructor(){this.bb=null,this.bb_pos=0}__init(d,i){return this.bb_pos=d,this.bb=i,this}static getRootAsDeprecatedKernelCreateInfos(d,i){return(i||new ie).__init(d.readInt32(d.position())+d.position(),d)}static getSizePrefixedRootAsDeprecatedKernelCreateInfos(d,i){return d.setPosition(d.position()+u.SIZE_PREFIX_LENGTH),(i||new ie).__init(d.readInt32(d.position())+d.position(),d)}nodeIndices(d){const i=this.bb.__offset(this.bb_pos,4);return i?this.bb.readUint32(this.bb.__vector(this.bb_pos+i)+d*4):0}nodeIndicesLength(){const d=this.bb.__offset(this.bb_pos,4);return d?this.bb.__vector_len(this.bb_pos+d):0}nodeIndicesArray(){const d=this.bb.__offset(this.bb_pos,4);return d?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+d),this.bb.__vector_len(this.bb_pos+d)):null}kernelDefHashes(d){const i=this.bb.__offset(this.bb_pos,6);return i?this.bb.readUint64(this.bb.__vector(this.bb_pos+i)+d*8):BigInt(0)}kernelDefHashesLength(){const d=this.bb.__offset(this.bb_pos,6);return d?this.bb.__vector_len(this.bb_pos+d):0}static startDeprecatedKernelCreateInfos(d){d.startObject(2)}static addNodeIndices(d,i){d.addFieldOffset(0,i,0)}static createNodeIndicesVector(d,i){d.startVector(4,i.length,4);for(let a=i.length-1;a>=0;a--)d.addInt32(i[a]);return d.endVector()}static startNodeIndicesVector(d,i){d.startVector(4,i,4)}static addKernelDefHashes(d,i){d.addFieldOffset(1,i,0)}static createKernelDefHashesVector(d,i){d.startVector(8,i.length,8);for(let a=i.length-1;a>=0;a--)d.addInt64(i[a]);return d.endVector()}static startKernelDefHashesVector(d,i){d.startVector(8,i,8)}static endDeprecatedKernelCreateInfos(d){return d.endObject()}static createDeprecatedKernelCreateInfos(d,i,a){return ie.startDeprecatedKernelCreateInfos(d),ie.addNodeIndices(d,i),ie.addKernelDefHashes(d,a),ie.endDeprecatedKernelCreateInfos(d)}};e.DeprecatedKernelCreateInfos=l}}),require_deprecated_node_index_and_kernel_def_hash=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/deprecated-node-index-and-kernel-def-hash.js"(e){var t=e&&e.__createBinding||(Object.create?function(c,d,i,a){a===void 0&&(a=i);var n=Object.getOwnPropertyDescriptor(d,i);(!n||("get"in n?!d.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return d[i]}}),Object.defineProperty(c,a,n)}:function(c,d,i,a){a===void 0&&(a=i),c[a]=d[i]}),r=e&&e.__setModuleDefault||(Object.create?function(c,d){Object.defineProperty(c,"default",{enumerable:!0,value:d})}:function(c,d){c.default=d}),o=e&&e.__importStar||function(c){if(c&&c.__esModule)return c;var d={};if(c!=null)for(var i in c)i!=="default"&&Object.prototype.hasOwnProperty.call(c,i)&&t(d,c,i);return r(d,c),d};Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedNodeIndexAndKernelDefHash=void 0;var u=o(require_flatbuffers()),l=class oe{constructor(){this.bb=null,this.bb_pos=0}__init(d,i){return this.bb_pos=d,this.bb=i,this}static getRootAsDeprecatedNodeIndexAndKernelDefHash(d,i){return(i||new oe).__init(d.readInt32(d.position())+d.position(),d)}static getSizePrefixedRootAsDeprecatedNodeIndexAndKernelDefHash(d,i){return d.setPosition(d.position()+u.SIZE_PREFIX_LENGTH),(i||new oe).__init(d.readInt32(d.position())+d.position(),d)}nodeIndex(){const d=this.bb.__offset(this.bb_pos,4);return d?this.bb.readUint32(this.bb_pos+d):0}kernelDefHash(){const d=this.bb.__offset(this.bb_pos,6);return d?this.bb.readUint64(this.bb_pos+d):BigInt("0")}static startDeprecatedNodeIndexAndKernelDefHash(d){d.startObject(2)}static addNodeIndex(d,i){d.addFieldInt32(0,i,0)}static addKernelDefHash(d,i){d.addFieldInt64(1,i,BigInt("0"))}static endDeprecatedNodeIndexAndKernelDefHash(d){return d.endObject()}static createDeprecatedNodeIndexAndKernelDefHash(d,i,a){return oe.startDeprecatedNodeIndexAndKernelDefHash(d),oe.addNodeIndex(d,i),oe.addKernelDefHash(d,a),oe.endDeprecatedNodeIndexAndKernelDefHash(d)}};e.DeprecatedNodeIndexAndKernelDefHash=l}}),require_deprecated_sub_graph_session_state=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/deprecated-sub-graph-session-state.js"(e){var t=e&&e.__createBinding||(Object.create?function(d,i,a,n){n===void 0&&(n=a);var s=Object.getOwnPropertyDescriptor(i,a);(!s||("get"in s?!i.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return i[a]}}),Object.defineProperty(d,n,s)}:function(d,i,a,n){n===void 0&&(n=a),d[n]=i[a]}),r=e&&e.__setModuleDefault||(Object.create?function(d,i){Object.defineProperty(d,"default",{enumerable:!0,value:i})}:function(d,i){d.default=i}),o=e&&e.__importStar||function(d){if(d&&d.__esModule)return d;var i={};if(d!=null)for(var a in d)a!=="default"&&Object.prototype.hasOwnProperty.call(d,a)&&t(i,d,a);return r(i,d),i};Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedSubGraphSessionState=void 0;var u=o(require_flatbuffers()),l=require_deprecated_session_state(),c=class Ae{constructor(){this.bb=null,this.bb_pos=0}__init(i,a){return this.bb_pos=i,this.bb=a,this}static getRootAsDeprecatedSubGraphSessionState(i,a){return(a||new Ae).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsDeprecatedSubGraphSessionState(i,a){return i.setPosition(i.position()+u.SIZE_PREFIX_LENGTH),(a||new Ae).__init(i.readInt32(i.position())+i.position(),i)}graphId(i){const a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__string(this.bb_pos+a,i):null}sessionState(i){const a=this.bb.__offset(this.bb_pos,6);return a?(i||new l.DeprecatedSessionState).__init(this.bb.__indirect(this.bb_pos+a),this.bb):null}static startDeprecatedSubGraphSessionState(i){i.startObject(2)}static addGraphId(i,a){i.addFieldOffset(0,a,0)}static addSessionState(i,a){i.addFieldOffset(1,a,0)}static endDeprecatedSubGraphSessionState(i){const a=i.endObject();return i.requiredField(a,4),a}};e.DeprecatedSubGraphSessionState=c}}),require_deprecated_session_state=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/deprecated-session-state.js"(e){var t=e&&e.__createBinding||(Object.create?function(i,a,n,s){s===void 0&&(s=n);var p=Object.getOwnPropertyDescriptor(a,n);(!p||("get"in p?!a.__esModule:p.writable||p.configurable))&&(p={enumerable:!0,get:function(){return a[n]}}),Object.defineProperty(i,s,p)}:function(i,a,n,s){s===void 0&&(s=n),i[s]=a[n]}),r=e&&e.__setModuleDefault||(Object.create?function(i,a){Object.defineProperty(i,"default",{enumerable:!0,value:a})}:function(i,a){i.default=a}),o=e&&e.__importStar||function(i){if(i&&i.__esModule)return i;var a={};if(i!=null)for(var n in i)n!=="default"&&Object.prototype.hasOwnProperty.call(i,n)&&t(a,i,n);return r(a,i),a};Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedSessionState=void 0;var u=o(require_flatbuffers()),l=require_deprecated_kernel_create_infos(),c=require_deprecated_sub_graph_session_state(),d=class ae{constructor(){this.bb=null,this.bb_pos=0}__init(a,n){return this.bb_pos=a,this.bb=n,this}static getRootAsDeprecatedSessionState(a,n){return(n||new ae).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsDeprecatedSessionState(a,n){return a.setPosition(a.position()+u.SIZE_PREFIX_LENGTH),(n||new ae).__init(a.readInt32(a.position())+a.position(),a)}kernels(a){const n=this.bb.__offset(this.bb_pos,4);return n?(a||new l.DeprecatedKernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}subGraphSessionStates(a,n){const s=this.bb.__offset(this.bb_pos,6);return s?(n||new c.DeprecatedSubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+s)+a*4),this.bb):null}subGraphSessionStatesLength(){const a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}static startDeprecatedSessionState(a){a.startObject(2)}static addKernels(a,n){a.addFieldOffset(0,n,0)}static addSubGraphSessionStates(a,n){a.addFieldOffset(1,n,0)}static createSubGraphSessionStatesVector(a,n){a.startVector(4,n.length,4);for(let s=n.length-1;s>=0;s--)a.addOffset(n[s]);return a.endVector()}static startSubGraphSessionStatesVector(a,n){a.startVector(4,n,4)}static endDeprecatedSessionState(a){return a.endObject()}static createDeprecatedSessionState(a,n,s){return ae.startDeprecatedSessionState(a),ae.addKernels(a,n),ae.addSubGraphSessionStates(a,s),ae.endDeprecatedSessionState(a)}};e.DeprecatedSessionState=d}}),require_kernel_type_str_args_entry=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/kernel-type-str-args-entry.js"(e){var t=e&&e.__createBinding||(Object.create?function(d,i,a,n){n===void 0&&(n=a);var s=Object.getOwnPropertyDescriptor(i,a);(!s||("get"in s?!i.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return i[a]}}),Object.defineProperty(d,n,s)}:function(d,i,a,n){n===void 0&&(n=a),d[n]=i[a]}),r=e&&e.__setModuleDefault||(Object.create?function(d,i){Object.defineProperty(d,"default",{enumerable:!0,value:i})}:function(d,i){d.default=i}),o=e&&e.__importStar||function(d){if(d&&d.__esModule)return d;var i={};if(d!=null)for(var a in d)a!=="default"&&Object.prototype.hasOwnProperty.call(d,a)&&t(i,d,a);return r(i,d),i};Object.defineProperty(e,"__esModule",{value:!0}),e.KernelTypeStrArgsEntry=void 0;var u=o(require_flatbuffers()),l=require_arg_type_and_index(),c=class se{constructor(){this.bb=null,this.bb_pos=0}__init(i,a){return this.bb_pos=i,this.bb=a,this}static getRootAsKernelTypeStrArgsEntry(i,a){return(a||new se).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsKernelTypeStrArgsEntry(i,a){return i.setPosition(i.position()+u.SIZE_PREFIX_LENGTH),(a||new se).__init(i.readInt32(i.position())+i.position(),i)}kernelTypeStr(i){const a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__string(this.bb_pos+a,i):null}args(i,a){const n=this.bb.__offset(this.bb_pos,6);return n?(a||new l.ArgTypeAndIndex).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+i*4),this.bb):null}argsLength(){const i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__vector_len(this.bb_pos+i):0}static startKernelTypeStrArgsEntry(i){i.startObject(2)}static addKernelTypeStr(i,a){i.addFieldOffset(0,a,0)}static addArgs(i,a){i.addFieldOffset(1,a,0)}static createArgsVector(i,a){i.startVector(4,a.length,4);for(let n=a.length-1;n>=0;n--)i.addOffset(a[n]);return i.endVector()}static startArgsVector(i,a){i.startVector(4,a,4)}static endKernelTypeStrArgsEntry(i){const a=i.endObject();return i.requiredField(a,4),a}static createKernelTypeStrArgsEntry(i,a,n){return se.startKernelTypeStrArgsEntry(i),se.addKernelTypeStr(i,a),se.addArgs(i,n),se.endKernelTypeStrArgsEntry(i)}};e.KernelTypeStrArgsEntry=c}}),require_op_id_kernel_type_str_args_entry=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/op-id-kernel-type-str-args-entry.js"(e){var t=e&&e.__createBinding||(Object.create?function(d,i,a,n){n===void 0&&(n=a);var s=Object.getOwnPropertyDescriptor(i,a);(!s||("get"in s?!i.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return i[a]}}),Object.defineProperty(d,n,s)}:function(d,i,a,n){n===void 0&&(n=a),d[n]=i[a]}),r=e&&e.__setModuleDefault||(Object.create?function(d,i){Object.defineProperty(d,"default",{enumerable:!0,value:i})}:function(d,i){d.default=i}),o=e&&e.__importStar||function(d){if(d&&d.__esModule)return d;var i={};if(d!=null)for(var a in d)a!=="default"&&Object.prototype.hasOwnProperty.call(d,a)&&t(i,d,a);return r(i,d),i};Object.defineProperty(e,"__esModule",{value:!0}),e.OpIdKernelTypeStrArgsEntry=void 0;var u=o(require_flatbuffers()),l=require_kernel_type_str_args_entry(),c=class ue{constructor(){this.bb=null,this.bb_pos=0}__init(i,a){return this.bb_pos=i,this.bb=a,this}static getRootAsOpIdKernelTypeStrArgsEntry(i,a){return(a||new ue).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsOpIdKernelTypeStrArgsEntry(i,a){return i.setPosition(i.position()+u.SIZE_PREFIX_LENGTH),(a||new ue).__init(i.readInt32(i.position())+i.position(),i)}opId(i){const a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__string(this.bb_pos+a,i):null}kernelTypeStrArgs(i,a){const n=this.bb.__offset(this.bb_pos,6);return n?(a||new l.KernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+i*4),this.bb):null}kernelTypeStrArgsLength(){const i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__vector_len(this.bb_pos+i):0}static startOpIdKernelTypeStrArgsEntry(i){i.startObject(2)}static addOpId(i,a){i.addFieldOffset(0,a,0)}static addKernelTypeStrArgs(i,a){i.addFieldOffset(1,a,0)}static createKernelTypeStrArgsVector(i,a){i.startVector(4,a.length,4);for(let n=a.length-1;n>=0;n--)i.addOffset(a[n]);return i.endVector()}static startKernelTypeStrArgsVector(i,a){i.startVector(4,a,4)}static endOpIdKernelTypeStrArgsEntry(i){const a=i.endObject();return i.requiredField(a,4),a}static createOpIdKernelTypeStrArgsEntry(i,a,n){return ue.startOpIdKernelTypeStrArgsEntry(i),ue.addOpId(i,a),ue.addKernelTypeStrArgs(i,n),ue.endOpIdKernelTypeStrArgsEntry(i)}};e.OpIdKernelTypeStrArgsEntry=c}}),require_kernel_type_str_resolver=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/kernel-type-str-resolver.js"(e){var t=e&&e.__createBinding||(Object.create?function(d,i,a,n){n===void 0&&(n=a);var s=Object.getOwnPropertyDescriptor(i,a);(!s||("get"in s?!i.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return i[a]}}),Object.defineProperty(d,n,s)}:function(d,i,a,n){n===void 0&&(n=a),d[n]=i[a]}),r=e&&e.__setModuleDefault||(Object.create?function(d,i){Object.defineProperty(d,"default",{enumerable:!0,value:i})}:function(d,i){d.default=i}),o=e&&e.__importStar||function(d){if(d&&d.__esModule)return d;var i={};if(d!=null)for(var a in d)a!=="default"&&Object.prototype.hasOwnProperty.call(d,a)&&t(i,d,a);return r(i,d),i};Object.defineProperty(e,"__esModule",{value:!0}),e.KernelTypeStrResolver=void 0;var u=o(require_flatbuffers()),l=require_op_id_kernel_type_str_args_entry(),c=class he{constructor(){this.bb=null,this.bb_pos=0}__init(i,a){return this.bb_pos=i,this.bb=a,this}static getRootAsKernelTypeStrResolver(i,a){return(a||new he).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsKernelTypeStrResolver(i,a){return i.setPosition(i.position()+u.SIZE_PREFIX_LENGTH),(a||new he).__init(i.readInt32(i.position())+i.position(),i)}opKernelTypeStrArgs(i,a){const n=this.bb.__offset(this.bb_pos,4);return n?(a||new l.OpIdKernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+i*4),this.bb):null}opKernelTypeStrArgsLength(){const i=this.bb.__offset(this.bb_pos,4);return i?this.bb.__vector_len(this.bb_pos+i):0}static startKernelTypeStrResolver(i){i.startObject(1)}static addOpKernelTypeStrArgs(i,a){i.addFieldOffset(0,a,0)}static createOpKernelTypeStrArgsVector(i,a){i.startVector(4,a.length,4);for(let n=a.length-1;n>=0;n--)i.addOffset(a[n]);return i.endVector()}static startOpKernelTypeStrArgsVector(i,a){i.startVector(4,a,4)}static endKernelTypeStrResolver(i){return i.endObject()}static createKernelTypeStrResolver(i,a){return he.startKernelTypeStrResolver(i),he.addOpKernelTypeStrArgs(i,a),he.endKernelTypeStrResolver(i)}};e.KernelTypeStrResolver=c}}),require_operator_set_id=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/operator-set-id.js"(e){var t=e&&e.__createBinding||(Object.create?function(c,d,i,a){a===void 0&&(a=i);var n=Object.getOwnPropertyDescriptor(d,i);(!n||("get"in n?!d.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return d[i]}}),Object.defineProperty(c,a,n)}:function(c,d,i,a){a===void 0&&(a=i),c[a]=d[i]}),r=e&&e.__setModuleDefault||(Object.create?function(c,d){Object.defineProperty(c,"default",{enumerable:!0,value:d})}:function(c,d){c.default=d}),o=e&&e.__importStar||function(c){if(c&&c.__esModule)return c;var d={};if(c!=null)for(var i in c)i!=="default"&&Object.prototype.hasOwnProperty.call(c,i)&&t(d,c,i);return r(d,c),d};Object.defineProperty(e,"__esModule",{value:!0}),e.OperatorSetId=void 0;var u=o(require_flatbuffers()),l=class le{constructor(){this.bb=null,this.bb_pos=0}__init(d,i){return this.bb_pos=d,this.bb=i,this}static getRootAsOperatorSetId(d,i){return(i||new le).__init(d.readInt32(d.position())+d.position(),d)}static getSizePrefixedRootAsOperatorSetId(d,i){return d.setPosition(d.position()+u.SIZE_PREFIX_LENGTH),(i||new le).__init(d.readInt32(d.position())+d.position(),d)}domain(d){const i=this.bb.__offset(this.bb_pos,4);return i?this.bb.__string(this.bb_pos+i,d):null}version(){const d=this.bb.__offset(this.bb_pos,6);return d?this.bb.readInt64(this.bb_pos+d):BigInt("0")}static startOperatorSetId(d){d.startObject(2)}static addDomain(d,i){d.addFieldOffset(0,i,0)}static addVersion(d,i){d.addFieldInt64(1,i,BigInt("0"))}static endOperatorSetId(d){return d.endObject()}static createOperatorSetId(d,i,a){return le.startOperatorSetId(d),le.addDomain(d,i),le.addVersion(d,a),le.endOperatorSetId(d)}};e.OperatorSetId=l}}),require_string_string_entry=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/string-string-entry.js"(e){var t=e&&e.__createBinding||(Object.create?function(c,d,i,a){a===void 0&&(a=i);var n=Object.getOwnPropertyDescriptor(d,i);(!n||("get"in n?!d.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return d[i]}}),Object.defineProperty(c,a,n)}:function(c,d,i,a){a===void 0&&(a=i),c[a]=d[i]}),r=e&&e.__setModuleDefault||(Object.create?function(c,d){Object.defineProperty(c,"default",{enumerable:!0,value:d})}:function(c,d){c.default=d}),o=e&&e.__importStar||function(c){if(c&&c.__esModule)return c;var d={};if(c!=null)for(var i in c)i!=="default"&&Object.prototype.hasOwnProperty.call(c,i)&&t(d,c,i);return r(d,c),d};Object.defineProperty(e,"__esModule",{value:!0}),e.StringStringEntry=void 0;var u=o(require_flatbuffers()),l=class ce{constructor(){this.bb=null,this.bb_pos=0}__init(d,i){return this.bb_pos=d,this.bb=i,this}static getRootAsStringStringEntry(d,i){return(i||new ce).__init(d.readInt32(d.position())+d.position(),d)}static getSizePrefixedRootAsStringStringEntry(d,i){return d.setPosition(d.position()+u.SIZE_PREFIX_LENGTH),(i||new ce).__init(d.readInt32(d.position())+d.position(),d)}key(d){const i=this.bb.__offset(this.bb_pos,4);return i?this.bb.__string(this.bb_pos+i,d):null}value(d){const i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__string(this.bb_pos+i,d):null}static startStringStringEntry(d){d.startObject(2)}static addKey(d,i){d.addFieldOffset(0,i,0)}static addValue(d,i){d.addFieldOffset(1,i,0)}static endStringStringEntry(d){return d.endObject()}static createStringStringEntry(d,i,a){return ce.startStringStringEntry(d),ce.addKey(d,i),ce.addValue(d,a),ce.endStringStringEntry(d)}};e.StringStringEntry=l}}),require_model=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/model.js"(e){var t=e&&e.__createBinding||(Object.create?function(a,n,s,p){p===void 0&&(p=s);var f=Object.getOwnPropertyDescriptor(n,s);(!f||("get"in f?!n.__esModule:f.writable||f.configurable))&&(f={enumerable:!0,get:function(){return n[s]}}),Object.defineProperty(a,p,f)}:function(a,n,s,p){p===void 0&&(p=s),a[p]=n[s]}),r=e&&e.__setModuleDefault||(Object.create?function(a,n){Object.defineProperty(a,"default",{enumerable:!0,value:n})}:function(a,n){a.default=n}),o=e&&e.__importStar||function(a){if(a&&a.__esModule)return a;var n={};if(a!=null)for(var s in a)s!=="default"&&Object.prototype.hasOwnProperty.call(a,s)&&t(n,a,s);return r(n,a),n};Object.defineProperty(e,"__esModule",{value:!0}),e.Model=void 0;var u=o(require_flatbuffers()),l=require_graph(),c=require_operator_set_id(),d=require_string_string_entry(),i=class ke{constructor(){this.bb=null,this.bb_pos=0}__init(n,s){return this.bb_pos=n,this.bb=s,this}static getRootAsModel(n,s){return(s||new ke).__init(n.readInt32(n.position())+n.position(),n)}static getSizePrefixedRootAsModel(n,s){return n.setPosition(n.position()+u.SIZE_PREFIX_LENGTH),(s||new ke).__init(n.readInt32(n.position())+n.position(),n)}irVersion(){const n=this.bb.__offset(this.bb_pos,4);return n?this.bb.readInt64(this.bb_pos+n):BigInt("0")}opsetImport(n,s){const p=this.bb.__offset(this.bb_pos,6);return p?(s||new c.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+p)+n*4),this.bb):null}opsetImportLength(){const n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__vector_len(this.bb_pos+n):0}producerName(n){const s=this.bb.__offset(this.bb_pos,8);return s?this.bb.__string(this.bb_pos+s,n):null}producerVersion(n){const s=this.bb.__offset(this.bb_pos,10);return s?this.bb.__string(this.bb_pos+s,n):null}domain(n){const s=this.bb.__offset(this.bb_pos,12);return s?this.bb.__string(this.bb_pos+s,n):null}modelVersion(){const n=this.bb.__offset(this.bb_pos,14);return n?this.bb.readInt64(this.bb_pos+n):BigInt("0")}docString(n){const s=this.bb.__offset(this.bb_pos,16);return s?this.bb.__string(this.bb_pos+s,n):null}graph(n){const s=this.bb.__offset(this.bb_pos,18);return s?(n||new l.Graph).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}graphDocString(n){const s=this.bb.__offset(this.bb_pos,20);return s?this.bb.__string(this.bb_pos+s,n):null}metadataProps(n,s){const p=this.bb.__offset(this.bb_pos,22);return p?(s||new d.StringStringEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+p)+n*4),this.bb):null}metadataPropsLength(){const n=this.bb.__offset(this.bb_pos,22);return n?this.bb.__vector_len(this.bb_pos+n):0}static startModel(n){n.startObject(10)}static addIrVersion(n,s){n.addFieldInt64(0,s,BigInt("0"))}static addOpsetImport(n,s){n.addFieldOffset(1,s,0)}static createOpsetImportVector(n,s){n.startVector(4,s.length,4);for(let p=s.length-1;p>=0;p--)n.addOffset(s[p]);return n.endVector()}static startOpsetImportVector(n,s){n.startVector(4,s,4)}static addProducerName(n,s){n.addFieldOffset(2,s,0)}static addProducerVersion(n,s){n.addFieldOffset(3,s,0)}static addDomain(n,s){n.addFieldOffset(4,s,0)}static addModelVersion(n,s){n.addFieldInt64(5,s,BigInt("0"))}static addDocString(n,s){n.addFieldOffset(6,s,0)}static addGraph(n,s){n.addFieldOffset(7,s,0)}static addGraphDocString(n,s){n.addFieldOffset(8,s,0)}static addMetadataProps(n,s){n.addFieldOffset(9,s,0)}static createMetadataPropsVector(n,s){n.startVector(4,s.length,4);for(let p=s.length-1;p>=0;p--)n.addOffset(s[p]);return n.endVector()}static startMetadataPropsVector(n,s){n.startVector(4,s,4)}static endModel(n){return n.endObject()}};e.Model=i}}),require_inference_session=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/inference-session.js"(e){var t=e&&e.__createBinding||(Object.create?function(i,a,n,s){s===void 0&&(s=n);var p=Object.getOwnPropertyDescriptor(a,n);(!p||("get"in p?!a.__esModule:p.writable||p.configurable))&&(p={enumerable:!0,get:function(){return a[n]}}),Object.defineProperty(i,s,p)}:function(i,a,n,s){s===void 0&&(s=n),i[s]=a[n]}),r=e&&e.__setModuleDefault||(Object.create?function(i,a){Object.defineProperty(i,"default",{enumerable:!0,value:a})}:function(i,a){i.default=a}),o=e&&e.__importStar||function(i){if(i&&i.__esModule)return i;var a={};if(i!=null)for(var n in i)n!=="default"&&Object.prototype.hasOwnProperty.call(i,n)&&t(a,i,n);return r(a,i),a};Object.defineProperty(e,"__esModule",{value:!0}),e.InferenceSession=void 0;var u=o(require_flatbuffers()),l=require_kernel_type_str_resolver(),c=require_model(),d=class De{constructor(){this.bb=null,this.bb_pos=0}__init(a,n){return this.bb_pos=a,this.bb=n,this}static getRootAsInferenceSession(a,n){return(n||new De).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsInferenceSession(a,n){return a.setPosition(a.position()+u.SIZE_PREFIX_LENGTH),(n||new De).__init(a.readInt32(a.position())+a.position(),a)}static bufferHasIdentifier(a){return a.__has_identifier("ORTM")}ortVersion(a){const n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,a):null}model(a){const n=this.bb.__offset(this.bb_pos,6);return n?(a||new c.Model).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}kernelTypeStrResolver(a){const n=this.bb.__offset(this.bb_pos,10);return n?(a||new l.KernelTypeStrResolver).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startInferenceSession(a){a.startObject(4)}static addOrtVersion(a,n){a.addFieldOffset(0,n,0)}static addModel(a,n){a.addFieldOffset(1,n,0)}static addKernelTypeStrResolver(a,n){a.addFieldOffset(3,n,0)}static endInferenceSession(a){return a.endObject()}static finishInferenceSessionBuffer(a,n){a.finish(n,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(a,n){a.finish(n,"ORTM",!0)}};e.InferenceSession=d}}),import_attribute,import_attribute_type,import_graph,import_inference_session,import_node,import_tensor_data_type,import_tensor_type_and_shape,import_type_info_value,init_fbs=__esm({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs.ts"(){__toESM(require_arg_type()),__toESM(require_arg_type_and_index()),import_attribute=__toESM(require_attribute()),import_attribute_type=__toESM(require_attribute_type()),__toESM(require_deprecated_kernel_create_infos()),__toESM(require_deprecated_node_index_and_kernel_def_hash()),__toESM(require_deprecated_session_state()),__toESM(require_deprecated_sub_graph_session_state()),__toESM(require_dimension()),__toESM(require_dimension_value()),__toESM(require_dimension_value_type()),__toESM(require_edge_end()),import_graph=__toESM(require_graph()),import_inference_session=__toESM(require_inference_session()),__toESM(require_kernel_type_str_args_entry()),__toESM(require_kernel_type_str_resolver()),__toESM(require_map_type()),__toESM(require_model()),import_node=__toESM(require_node()),__toESM(require_node_edge()),__toESM(require_node_type()),__toESM(require_nodes_to_optimize_indices()),__toESM(require_op_id_kernel_type_str_args_entry()),__toESM(require_operator_set_id()),__toESM(require_runtime_optimization_record()),__toESM(require_runtime_optimization_record_container_entry()),__toESM(require_runtime_optimizations()),__toESM(require_sequence_type()),__toESM(require_shape()),__toESM(require_sparse_tensor()),__toESM(require_string_string_entry()),__toESM(require_tensor()),import_tensor_data_type=__toESM(require_tensor_data_type()),import_tensor_type_and_shape=__toESM(require_tensor_type_and_shape()),__toESM(require_type_info()),import_type_info_value=__toESM(require_type_info_value()),__toESM(require_value_info())}}),init_ort_generated=__esm({"web/lib/onnxjs/ort-schema/flatbuffers/ort-generated.ts"(){init_fbs()}}),require_aspromise=__commonJS({"web/node_modules/@protobufjs/aspromise/index.js"(e,t){t.exports=r;function r(o,u){for(var l=new Array(arguments.length-1),c=0,d=2,i=!0;d<arguments.length;)l[c++]=arguments[d++];return new Promise(function(n,s){l[c]=function(f){if(i)if(i=!1,f)s(f);else{for(var h=new Array(arguments.length-1),m=0;m<h.length;)h[m++]=arguments[m];n.apply(null,h)}};try{o.apply(u||null,l)}catch(p){i&&(i=!1,s(p))}})}}}),require_base64=__commonJS({"web/node_modules/@protobufjs/base64/index.js"(e){var t=e;t.length=function(d){var i=d.length;if(!i)return 0;for(var a=0;--i%4>1&&d.charAt(i)==="=";)++a;return Math.ceil(d.length*3)/4-a};var r=new Array(64),o=new Array(123);for(u=0;u<64;)o[r[u]=u<26?u+65:u<52?u+71:u<62?u-4:u-59|43]=u++;var u;t.encode=function(d,i,a){for(var n=null,s=[],p=0,f=0,h;i<a;){var m=d[i++];switch(f){case 0:s[p++]=r[m>>2],h=(m&3)<<4,f=1;break;case 1:s[p++]=r[h|m>>4],h=(m&15)<<2,f=2;break;case 2:s[p++]=r[h|m>>6],s[p++]=r[m&63],f=0;break}p>8191&&((n||(n=[])).push(String.fromCharCode.apply(String,s)),p=0)}return f&&(s[p++]=r[h],s[p++]=61,f===1&&(s[p++]=61)),n?(p&&n.push(String.fromCharCode.apply(String,s.slice(0,p))),n.join("")):String.fromCharCode.apply(String,s.slice(0,p))};var l="invalid encoding";t.decode=function(d,i,a){for(var n=a,s=0,p,f=0;f<d.length;){var h=d.charCodeAt(f++);if(h===61&&s>1)break;if((h=o[h])===void 0)throw Error(l);switch(s){case 0:p=h,s=1;break;case 1:i[a++]=p<<2|(h&48)>>4,p=h,s=2;break;case 2:i[a++]=(p&15)<<4|(h&60)>>2,p=h,s=3;break;case 3:i[a++]=(p&3)<<6|h,s=0;break}}if(s===1)throw Error(l);return a-n},t.test=function(d){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(d)}}}),require_eventemitter=__commonJS({"web/node_modules/@protobufjs/eventemitter/index.js"(e,t){t.exports=r;function r(){this._listeners={}}r.prototype.on=function(u,l,c){return(this._listeners[u]||(this._listeners[u]=[])).push({fn:l,ctx:c||this}),this},r.prototype.off=function(u,l){if(u===void 0)this._listeners={};else if(l===void 0)this._listeners[u]=[];else for(var c=this._listeners[u],d=0;d<c.length;)c[d].fn===l?c.splice(d,1):++d;return this},r.prototype.emit=function(u){var l=this._listeners[u];if(l){for(var c=[],d=1;d<arguments.length;)c.push(arguments[d++]);for(d=0;d<l.length;)l[d].fn.apply(l[d++].ctx,c)}return this}}}),require_float=__commonJS({"web/node_modules/@protobufjs/float/index.js"(e,t){t.exports=r(r);function r(d){return typeof Float32Array<"u"?(function(){var i=new Float32Array([-0]),a=new Uint8Array(i.buffer),n=a[3]===128;function s(m,_,y){i[0]=m,_[y]=a[0],_[y+1]=a[1],_[y+2]=a[2],_[y+3]=a[3]}function p(m,_,y){i[0]=m,_[y]=a[3],_[y+1]=a[2],_[y+2]=a[1],_[y+3]=a[0]}d.writeFloatLE=n?s:p,d.writeFloatBE=n?p:s;function f(m,_){return a[0]=m[_],a[1]=m[_+1],a[2]=m[_+2],a[3]=m[_+3],i[0]}function h(m,_){return a[3]=m[_],a[2]=m[_+1],a[1]=m[_+2],a[0]=m[_+3],i[0]}d.readFloatLE=n?f:h,d.readFloatBE=n?h:f})():(function(){function i(n,s,p,f){var h=s<0?1:0;if(h&&(s=-s),s===0)n(1/s>0?0:2147483648,p,f);else if(isNaN(s))n(2143289344,p,f);else if(s>34028234663852886e22)n((h<<31|2139095040)>>>0,p,f);else if(s<11754943508222875e-54)n((h<<31|Math.round(s/1401298464324817e-60))>>>0,p,f);else{var m=Math.floor(Math.log(s)/Math.LN2),_=Math.round(s*Math.pow(2,-m)*8388608)&8388607;n((h<<31|m+127<<23|_)>>>0,p,f)}}d.writeFloatLE=i.bind(null,o),d.writeFloatBE=i.bind(null,u);function a(n,s,p){var f=n(s,p),h=(f>>31)*2+1,m=f>>>23&255,_=f&8388607;return m===255?_?NaN:h*(1/0):m===0?h*1401298464324817e-60*_:h*Math.pow(2,m-150)*(_+8388608)}d.readFloatLE=a.bind(null,l),d.readFloatBE=a.bind(null,c)})(),typeof Float64Array<"u"?(function(){var i=new Float64Array([-0]),a=new Uint8Array(i.buffer),n=a[7]===128;function s(m,_,y){i[0]=m,_[y]=a[0],_[y+1]=a[1],_[y+2]=a[2],_[y+3]=a[3],_[y+4]=a[4],_[y+5]=a[5],_[y+6]=a[6],_[y+7]=a[7]}function p(m,_,y){i[0]=m,_[y]=a[7],_[y+1]=a[6],_[y+2]=a[5],_[y+3]=a[4],_[y+4]=a[3],_[y+5]=a[2],_[y+6]=a[1],_[y+7]=a[0]}d.writeDoubleLE=n?s:p,d.writeDoubleBE=n?p:s;function f(m,_){return a[0]=m[_],a[1]=m[_+1],a[2]=m[_+2],a[3]=m[_+3],a[4]=m[_+4],a[5]=m[_+5],a[6]=m[_+6],a[7]=m[_+7],i[0]}function h(m,_){return a[7]=m[_],a[6]=m[_+1],a[5]=m[_+2],a[4]=m[_+3],a[3]=m[_+4],a[2]=m[_+5],a[1]=m[_+6],a[0]=m[_+7],i[0]}d.readDoubleLE=n?f:h,d.readDoubleBE=n?h:f})():(function(){function i(n,s,p,f,h,m){var _=f<0?1:0;if(_&&(f=-f),f===0)n(0,h,m+s),n(1/f>0?0:2147483648,h,m+p);else if(isNaN(f))n(0,h,m+s),n(2146959360,h,m+p);else if(f>17976931348623157e292)n(0,h,m+s),n((_<<31|2146435072)>>>0,h,m+p);else{var y;if(f<22250738585072014e-324)y=f/5e-324,n(y>>>0,h,m+s),n((_<<31|y/4294967296)>>>0,h,m+p);else{var g=Math.floor(Math.log(f)/Math.LN2);g===1024&&(g=1023),y=f*Math.pow(2,-g),n(y*4503599627370496>>>0,h,m+s),n((_<<31|g+1023<<20|y*1048576&1048575)>>>0,h,m+p)}}}d.writeDoubleLE=i.bind(null,o,0,4),d.writeDoubleBE=i.bind(null,u,4,0);function a(n,s,p,f,h){var m=n(f,h+s),_=n(f,h+p),y=(_>>31)*2+1,g=_>>>20&2047,b=4294967296*(_&1048575)+m;return g===2047?b?NaN:y*(1/0):g===0?y*5e-324*b:y*Math.pow(2,g-1075)*(b+4503599627370496)}d.readDoubleLE=a.bind(null,l,0,4),d.readDoubleBE=a.bind(null,c,4,0)})(),d}function o(d,i,a){i[a]=d&255,i[a+1]=d>>>8&255,i[a+2]=d>>>16&255,i[a+3]=d>>>24}function u(d,i,a){i[a]=d>>>24,i[a+1]=d>>>16&255,i[a+2]=d>>>8&255,i[a+3]=d&255}function l(d,i){return(d[i]|d[i+1]<<8|d[i+2]<<16|d[i+3]<<24)>>>0}function c(d,i){return(d[i]<<24|d[i+1]<<16|d[i+2]<<8|d[i+3])>>>0}}}),require_inquire=__commonJS({"web/node_modules/@protobufjs/inquire/index.js"(exports$1,module){module.exports=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(e){}return null}}}),require_utf8=__commonJS({"web/node_modules/@protobufjs/utf8/index.js"(e){var t=e;t.length=function(o){for(var u=0,l=0,c=0;c<o.length;++c)l=o.charCodeAt(c),l<128?u+=1:l<2048?u+=2:(l&64512)===55296&&(o.charCodeAt(c+1)&64512)===56320?(++c,u+=4):u+=3;return u},t.read=function(o,u,l){var c=l-u;if(c<1)return"";for(var d=null,i=[],a=0,n;u<l;)n=o[u++],n<128?i[a++]=n:n>191&&n<224?i[a++]=(n&31)<<6|o[u++]&63:n>239&&n<365?(n=((n&7)<<18|(o[u++]&63)<<12|(o[u++]&63)<<6|o[u++]&63)-65536,i[a++]=55296+(n>>10),i[a++]=56320+(n&1023)):i[a++]=(n&15)<<12|(o[u++]&63)<<6|o[u++]&63,a>8191&&((d||(d=[])).push(String.fromCharCode.apply(String,i)),a=0);return d?(a&&d.push(String.fromCharCode.apply(String,i.slice(0,a))),d.join("")):String.fromCharCode.apply(String,i.slice(0,a))},t.write=function(o,u,l){for(var c=l,d,i,a=0;a<o.length;++a)d=o.charCodeAt(a),d<128?u[l++]=d:d<2048?(u[l++]=d>>6|192,u[l++]=d&63|128):(d&64512)===55296&&((i=o.charCodeAt(a+1))&64512)===56320?(d=65536+((d&1023)<<10)+(i&1023),++a,u[l++]=d>>18|240,u[l++]=d>>12&63|128,u[l++]=d>>6&63|128,u[l++]=d&63|128):(u[l++]=d>>12|224,u[l++]=d>>6&63|128,u[l++]=d&63|128);return l-c}}}),require_pool=__commonJS({"web/node_modules/@protobufjs/pool/index.js"(e,t){t.exports=r;function r(o,u,l){var c=l||8192,d=c>>>1,i=null,a=c;return function(s){if(s<1||s>d)return o(s);a+s>c&&(i=o(c),a=0);var p=u.call(i,a,a+=s);return a&7&&(a=(a|7)+1),p}}}}),require_longbits=__commonJS({"web/node_modules/protobufjs/src/util/longbits.js"(e,t){t.exports=o;var r=require_minimal();function o(d,i){this.lo=d>>>0,this.hi=i>>>0}var u=o.zero=new o(0,0);u.toNumber=function(){return 0},u.zzEncode=u.zzDecode=function(){return this},u.length=function(){return 1};var l=o.zeroHash="\0\0\0\0\0\0\0\0";o.fromNumber=function(i){if(i===0)return u;var a=i<0;a&&(i=-i);var n=i>>>0,s=(i-n)/4294967296>>>0;return a&&(s=~s>>>0,n=~n>>>0,++n>4294967295&&(n=0,++s>4294967295&&(s=0))),new o(n,s)},o.from=function(i){if(typeof i=="number")return o.fromNumber(i);if(r.isString(i))if(r.Long)i=r.Long.fromString(i);else return o.fromNumber(parseInt(i,10));return i.low||i.high?new o(i.low>>>0,i.high>>>0):u},o.prototype.toNumber=function(i){if(!i&&this.hi>>>31){var a=~this.lo+1>>>0,n=~this.hi>>>0;return a||(n=n+1>>>0),-(a+n*4294967296)}return this.lo+this.hi*4294967296},o.prototype.toLong=function(i){return r.Long?new r.Long(this.lo|0,this.hi|0,!!i):{low:this.lo|0,high:this.hi|0,unsigned:!!i}};var c=String.prototype.charCodeAt;o.fromHash=function(i){return i===l?u:new o((c.call(i,0)|c.call(i,1)<<8|c.call(i,2)<<16|c.call(i,3)<<24)>>>0,(c.call(i,4)|c.call(i,5)<<8|c.call(i,6)<<16|c.call(i,7)<<24)>>>0)},o.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)},o.prototype.zzEncode=function(){var i=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^i)>>>0,this.lo=(this.lo<<1^i)>>>0,this},o.prototype.zzDecode=function(){var i=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^i)>>>0,this.hi=(this.hi>>>1^i)>>>0,this},o.prototype.length=function(){var i=this.lo,a=(this.lo>>>28|this.hi<<4)>>>0,n=this.hi>>>24;return n===0?a===0?i<16384?i<128?1:2:i<2097152?3:4:a<16384?a<128?5:6:a<2097152?7:8:n<128?9:10}}}),require_minimal=__commonJS({"web/node_modules/protobufjs/src/util/minimal.js"(e){var t=e;t.asPromise=require_aspromise(),t.base64=require_base64(),t.EventEmitter=require_eventemitter(),t.float=require_float(),t.inquire=require_inquire(),t.utf8=require_utf8(),t.pool=require_pool(),t.LongBits=require_longbits(),t.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node),t.global=t.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||e,t.emptyArray=Object.freeze?Object.freeze([]):[],t.emptyObject=Object.freeze?Object.freeze({}):{},t.isInteger=Number.isInteger||function(l){return typeof l=="number"&&isFinite(l)&&Math.floor(l)===l},t.isString=function(l){return typeof l=="string"||l instanceof String},t.isObject=function(l){return l&&typeof l=="object"},t.isset=t.isSet=function(l,c){var d=l[c];return d!=null&&l.hasOwnProperty(c)?typeof d!="object"||(Array.isArray(d)?d.length:Object.keys(d).length)>0:!1},t.Buffer=(function(){try{var u=t.inquire("buffer").Buffer;return u.prototype.utf8Write?u:null}catch{return null}})(),t._Buffer_from=null,t._Buffer_allocUnsafe=null,t.newBuffer=function(l){return typeof l=="number"?t.Buffer?t._Buffer_allocUnsafe(l):new t.Array(l):t.Buffer?t._Buffer_from(l):typeof Uint8Array>"u"?l:new Uint8Array(l)},t.Array=typeof Uint8Array<"u"?Uint8Array:Array,t.Long=t.global.dcodeIO&&t.global.dcodeIO.Long||t.global.Long||t.inquire("long"),t.key2Re=/^true|false|0|1$/,t.key32Re=/^-?(?:0|[1-9][0-9]*)$/,t.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/,t.longToHash=function(l){return l?t.LongBits.from(l).toHash():t.LongBits.zeroHash},t.longFromHash=function(l,c){var d=t.LongBits.fromHash(l);return t.Long?t.Long.fromBits(d.lo,d.hi,c):d.toNumber(!!c)};function r(u,l,c){for(var d=Object.keys(l),i=0;i<d.length;++i)(u[d[i]]===void 0||!c)&&(u[d[i]]=l[d[i]]);return u}t.merge=r,t.lcFirst=function(l){return l.charAt(0).toLowerCase()+l.substring(1)};function o(u){function l(c,d){if(!(this instanceof l))return new l(c,d);Object.defineProperty(this,"message",{get:function(){return c}}),Error.captureStackTrace?Error.captureStackTrace(this,l):Object.defineProperty(this,"stack",{value:new Error().stack||""}),d&&r(this,d)}return l.prototype=Object.create(Error.prototype,{constructor:{value:l,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return u},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),l}t.newError=o,t.ProtocolError=o("ProtocolError"),t.oneOfGetter=function(l){for(var c={},d=0;d<l.length;++d)c[l[d]]=1;return function(){for(var i=Object.keys(this),a=i.length-1;a>-1;--a)if(c[i[a]]===1&&this[i[a]]!==void 0&&this[i[a]]!==null)return i[a]}},t.oneOfSetter=function(l){return function(c){for(var d=0;d<l.length;++d)l[d]!==c&&delete this[l[d]]}},t.toJSONOptions={longs:String,enums:String,bytes:String,json:!0},t._configure=function(){var u=t.Buffer;if(!u){t._Buffer_from=t._Buffer_allocUnsafe=null;return}t._Buffer_from=u.from!==Uint8Array.from&&u.from||function(c,d){return new u(c,d)},t._Buffer_allocUnsafe=u.allocUnsafe||function(c){return new u(c)}}}}),require_writer=__commonJS({"web/node_modules/protobufjs/src/writer.js"(e,t){t.exports=n;var r=require_minimal(),o,u=r.LongBits,l=r.base64,c=r.utf8;function d(g,b,v){this.fn=g,this.len=b,this.next=void 0,this.val=v}function i(){}function a(g){this.head=g.head,this.tail=g.tail,this.len=g.len,this.next=g.states}function n(){this.len=0,this.head=new d(i,0,0),this.tail=this.head,this.states=null}var s=function(){return r.Buffer?function(){return(n.create=function(){return new o})()}:function(){return new n}};n.create=s(),n.alloc=function(b){return new r.Array(b)},r.Array!==Array&&(n.alloc=r.pool(n.alloc,r.Array.prototype.subarray)),n.prototype._push=function(b,v,w){return this.tail=this.tail.next=new d(b,v,w),this.len+=v,this};function p(g,b,v){b[v]=g&255}function f(g,b,v){for(;g>127;)b[v++]=g&127|128,g>>>=7;b[v]=g}function h(g,b){this.len=g,this.next=void 0,this.val=b}h.prototype=Object.create(d.prototype),h.prototype.fn=f,n.prototype.uint32=function(b){return this.len+=(this.tail=this.tail.next=new h((b=b>>>0)<128?1:b<16384?2:b<2097152?3:b<268435456?4:5,b)).len,this},n.prototype.int32=function(b){return b<0?this._push(m,10,u.fromNumber(b)):this.uint32(b)},n.prototype.sint32=function(b){return this.uint32((b<<1^b>>31)>>>0)};function m(g,b,v){for(;g.hi;)b[v++]=g.lo&127|128,g.lo=(g.lo>>>7|g.hi<<25)>>>0,g.hi>>>=7;for(;g.lo>127;)b[v++]=g.lo&127|128,g.lo=g.lo>>>7;b[v++]=g.lo}n.prototype.uint64=function(b){var v=u.from(b);return this._push(m,v.length(),v)},n.prototype.int64=n.prototype.uint64,n.prototype.sint64=function(b){var v=u.from(b).zzEncode();return this._push(m,v.length(),v)},n.prototype.bool=function(b){return this._push(p,1,b?1:0)};function _(g,b,v){b[v]=g&255,b[v+1]=g>>>8&255,b[v+2]=g>>>16&255,b[v+3]=g>>>24}n.prototype.fixed32=function(b){return this._push(_,4,b>>>0)},n.prototype.sfixed32=n.prototype.fixed32,n.prototype.fixed64=function(b){var v=u.from(b);return this._push(_,4,v.lo)._push(_,4,v.hi)},n.prototype.sfixed64=n.prototype.fixed64,n.prototype.float=function(b){return this._push(r.float.writeFloatLE,4,b)},n.prototype.double=function(b){return this._push(r.float.writeDoubleLE,8,b)};var y=r.Array.prototype.set?function(b,v,w){v.set(b,w)}:function(b,v,w){for(var x=0;x<b.length;++x)v[w+x]=b[x]};n.prototype.bytes=function(b){var v=b.length>>>0;if(!v)return this._push(p,1,0);if(r.isString(b)){var w=n.alloc(v=l.length(b));l.decode(b,w,0),b=w}return this.uint32(v)._push(y,v,b)},n.prototype.string=function(b){var v=c.length(b);return v?this.uint32(v)._push(c.write,v,b):this._push(p,1,0)},n.prototype.fork=function(){return this.states=new a(this),this.head=this.tail=new d(i,0,0),this.len=0,this},n.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new d(i,0,0),this.len=0),this},n.prototype.ldelim=function(){var b=this.head,v=this.tail,w=this.len;return this.reset().uint32(w),w&&(this.tail.next=b.next,this.tail=v,this.len+=w),this},n.prototype.finish=function(){for(var b=this.head.next,v=this.constructor.alloc(this.len),w=0;b;)b.fn(b.val,v,w),w+=b.len,b=b.next;return v},n._configure=function(g){o=g,n.create=s(),o._configure()}}}),require_writer_buffer=__commonJS({"web/node_modules/protobufjs/src/writer_buffer.js"(e,t){t.exports=u;var r=require_writer();(u.prototype=Object.create(r.prototype)).constructor=u;var o=require_minimal();function u(){r.call(this)}u._configure=function(){u.alloc=o._Buffer_allocUnsafe,u.writeBytesBuffer=o.Buffer&&o.Buffer.prototype instanceof Uint8Array&&o.Buffer.prototype.set.name==="set"?function(d,i,a){i.set(d,a)}:function(d,i,a){if(d.copy)d.copy(i,a,0,d.length);else for(var n=0;n<d.length;)i[a++]=d[n++]}},u.prototype.bytes=function(d){o.isString(d)&&(d=o._Buffer_from(d,"base64"));var i=d.length>>>0;return this.uint32(i),i&&this._push(u.writeBytesBuffer,i,d),this};function l(c,d,i){c.length<40?o.utf8.write(c,d,i):d.utf8Write?d.utf8Write(c,i):d.write(c,i)}u.prototype.string=function(d){var i=o.Buffer.byteLength(d);return this.uint32(i),i&&this._push(l,i,d),this},u._configure()}}),require_reader=__commonJS({"web/node_modules/protobufjs/src/reader.js"(e,t){t.exports=d;var r=require_minimal(),o,u=r.LongBits,l=r.utf8;function c(f,h){return RangeError("index out of range: "+f.pos+" + "+(h||1)+" > "+f.len)}function d(f){this.buf=f,this.pos=0,this.len=f.length}var i=typeof Uint8Array<"u"?function(h){if(h instanceof Uint8Array||Array.isArray(h))return new d(h);throw Error("illegal buffer")}:function(h){if(Array.isArray(h))return new d(h);throw Error("illegal buffer")},a=function(){return r.Buffer?function(m){return(d.create=function(y){return r.Buffer.isBuffer(y)?new o(y):i(y)})(m)}:i};d.create=a(),d.prototype._slice=r.Array.prototype.subarray||r.Array.prototype.slice,d.prototype.uint32=(function(){var h=4294967295;return function(){if(h=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(h=(h|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(h=(h|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(h=(h|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(h=(h|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return h;if((this.pos+=5)>this.len)throw this.pos=this.len,c(this,10);return h}})(),d.prototype.int32=function(){return this.uint32()|0},d.prototype.sint32=function(){var h=this.uint32();return h>>>1^-(h&1)|0};function n(){var f=new u(0,0),h=0;if(this.len-this.pos>4){for(;h<4;++h)if(f.lo=(f.lo|(this.buf[this.pos]&127)<<h*7)>>>0,this.buf[this.pos++]<128)return f;if(f.lo=(f.lo|(this.buf[this.pos]&127)<<28)>>>0,f.hi=(f.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return f;h=0}else{for(;h<3;++h){if(this.pos>=this.len)throw c(this);if(f.lo=(f.lo|(this.buf[this.pos]&127)<<h*7)>>>0,this.buf[this.pos++]<128)return f}return f.lo=(f.lo|(this.buf[this.pos++]&127)<<h*7)>>>0,f}if(this.len-this.pos>4){for(;h<5;++h)if(f.hi=(f.hi|(this.buf[this.pos]&127)<<h*7+3)>>>0,this.buf[this.pos++]<128)return f}else for(;h<5;++h){if(this.pos>=this.len)throw c(this);if(f.hi=(f.hi|(this.buf[this.pos]&127)<<h*7+3)>>>0,this.buf[this.pos++]<128)return f}throw Error("invalid varint encoding")}d.prototype.bool=function(){return this.uint32()!==0};function s(f,h){return(f[h-4]|f[h-3]<<8|f[h-2]<<16|f[h-1]<<24)>>>0}d.prototype.fixed32=function(){if(this.pos+4>this.len)throw c(this,4);return s(this.buf,this.pos+=4)},d.prototype.sfixed32=function(){if(this.pos+4>this.len)throw c(this,4);return s(this.buf,this.pos+=4)|0};function p(){if(this.pos+8>this.len)throw c(this,8);return new u(s(this.buf,this.pos+=4),s(this.buf,this.pos+=4))}d.prototype.float=function(){if(this.pos+4>this.len)throw c(this,4);var h=r.float.readFloatLE(this.buf,this.pos);return this.pos+=4,h},d.prototype.double=function(){if(this.pos+8>this.len)throw c(this,4);var h=r.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,h},d.prototype.bytes=function(){var h=this.uint32(),m=this.pos,_=this.pos+h;if(_>this.len)throw c(this,h);if(this.pos+=h,Array.isArray(this.buf))return this.buf.slice(m,_);if(m===_){var y=r.Buffer;return y?y.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,m,_)},d.prototype.string=function(){var h=this.bytes();return l.read(h,0,h.length)},d.prototype.skip=function(h){if(typeof h=="number"){if(this.pos+h>this.len)throw c(this,h);this.pos+=h}else do if(this.pos>=this.len)throw c(this);while(this.buf[this.pos++]&128);return this},d.prototype.skipType=function(f){switch(f){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(f=this.uint32()&7)!==4;)this.skipType(f);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+f+" at offset "+this.pos)}return this},d._configure=function(f){o=f,d.create=a(),o._configure();var h=r.Long?"toLong":"toNumber";r.merge(d.prototype,{int64:function(){return n.call(this)[h](!1)},uint64:function(){return n.call(this)[h](!0)},sint64:function(){return n.call(this).zzDecode()[h](!1)},fixed64:function(){return p.call(this)[h](!0)},sfixed64:function(){return p.call(this)[h](!1)}})}}}),require_reader_buffer=__commonJS({"web/node_modules/protobufjs/src/reader_buffer.js"(e,t){t.exports=u;var r=require_reader();(u.prototype=Object.create(r.prototype)).constructor=u;var o=require_minimal();function u(l){r.call(this,l)}u._configure=function(){o.Buffer&&(u.prototype._slice=o.Buffer.prototype.slice)},u.prototype.string=function(){var c=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+c,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+c,this.len))},u._configure()}}),require_service=__commonJS({"web/node_modules/protobufjs/src/rpc/service.js"(e,t){t.exports=o;var r=require_minimal();(o.prototype=Object.create(r.EventEmitter.prototype)).constructor=o;function o(u,l,c){if(typeof u!="function")throw TypeError("rpcImpl must be a function");r.EventEmitter.call(this),this.rpcImpl=u,this.requestDelimited=!!l,this.responseDelimited=!!c}o.prototype.rpcCall=function u(l,c,d,i,a){if(!i)throw TypeError("request must be specified");var n=this;if(!a)return r.asPromise(u,n,l,c,d,i);if(!n.rpcImpl){setTimeout(function(){a(Error("already ended"))},0);return}try{return n.rpcImpl(l,c[n.requestDelimited?"encodeDelimited":"encode"](i).finish(),function(p,f){if(p)return n.emit("error",p,l),a(p);if(f===null){n.end(!0);return}if(!(f instanceof d))try{f=d[n.responseDelimited?"decodeDelimited":"decode"](f)}catch(h){return n.emit("error",h,l),a(h)}return n.emit("data",f,l),a(null,f)})}catch(s){n.emit("error",s,l),setTimeout(function(){a(s)},0);return}},o.prototype.end=function(l){return this.rpcImpl&&(l||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}}}),require_rpc=__commonJS({"web/node_modules/protobufjs/src/rpc.js"(e){var t=e;t.Service=require_service()}}),require_roots=__commonJS({"web/node_modules/protobufjs/src/roots.js"(e,t){t.exports={}}}),require_index_minimal=__commonJS({"web/node_modules/protobufjs/src/index-minimal.js"(e){var t=e;t.build="minimal",t.Writer=require_writer(),t.BufferWriter=require_writer_buffer(),t.Reader=require_reader(),t.BufferReader=require_reader_buffer(),t.util=require_minimal(),t.rpc=require_rpc(),t.roots=require_roots(),t.configure=r;function r(){t.util._configure(),t.Writer._configure(t.BufferWriter),t.Reader._configure(t.BufferReader)}r()}}),require_minimal2=__commonJS({"web/node_modules/protobufjs/minimal.js"(e,t){t.exports=require_index_minimal()}}),require_onnx=__commonJS({"web/lib/onnxjs/ort-schema/protobuf/onnx.js"(e,t){var r=require_minimal2(),o=r.Reader,u=r.Writer,l=r.util,c=r.roots.default||(r.roots.default={});c.onnx=(function(){var d={};return d.Version=(function(){var i={},a=Object.create(i);return a[i[0]="_START_VERSION"]=0,a[i[1]="IR_VERSION_2017_10_10"]=1,a[i[2]="IR_VERSION_2017_10_30"]=2,a[i[3]="IR_VERSION_2017_11_3"]=3,a[i[4]="IR_VERSION_2019_1_22"]=4,a[i[5]="IR_VERSION_2019_3_18"]=5,a[i[6]="IR_VERSION_2019_9_19"]=6,a[i[7]="IR_VERSION_2020_5_8"]=7,a[i[8]="IR_VERSION_2021_7_30"]=8,a[i[9]="IR_VERSION"]=9,a})(),d.AttributeProto=(function(){function i(a){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],a)for(var n=Object.keys(a),s=0;s<n.length;++s)a[n[s]]!=null&&(this[n[s]]=a[n[s]])}return i.prototype.name="",i.prototype.refAttrName="",i.prototype.docString="",i.prototype.type=0,i.prototype.f=0,i.prototype.i=l.Long?l.Long.fromBits(0,0,!1):0,i.prototype.s=l.newBuffer([]),i.prototype.t=null,i.prototype.g=null,i.prototype.sparseTensor=null,i.prototype.tp=null,i.prototype.floats=l.emptyArray,i.prototype.ints=l.emptyArray,i.prototype.strings=l.emptyArray,i.prototype.tensors=l.emptyArray,i.prototype.graphs=l.emptyArray,i.prototype.sparseTensors=l.emptyArray,i.prototype.typeProtos=l.emptyArray,i.create=function(n){return new i(n)},i.encode=function(n,s){if(s||(s=u.create()),n.name!=null&&Object.hasOwnProperty.call(n,"name")&&s.uint32(10).string(n.name),n.f!=null&&Object.hasOwnProperty.call(n,"f")&&s.uint32(21).float(n.f),n.i!=null&&Object.hasOwnProperty.call(n,"i")&&s.uint32(24).int64(n.i),n.s!=null&&Object.hasOwnProperty.call(n,"s")&&s.uint32(34).bytes(n.s),n.t!=null&&Object.hasOwnProperty.call(n,"t")&&c.onnx.TensorProto.encode(n.t,s.uint32(42).fork()).ldelim(),n.g!=null&&Object.hasOwnProperty.call(n,"g")&&c.onnx.GraphProto.encode(n.g,s.uint32(50).fork()).ldelim(),n.floats!=null&&n.floats.length){s.uint32(58).fork();for(var p=0;p<n.floats.length;++p)s.float(n.floats[p]);s.ldelim()}if(n.ints!=null&&n.ints.length){s.uint32(66).fork();for(var p=0;p<n.ints.length;++p)s.int64(n.ints[p]);s.ldelim()}if(n.strings!=null&&n.strings.length)for(var p=0;p<n.strings.length;++p)s.uint32(74).bytes(n.strings[p]);if(n.tensors!=null&&n.tensors.length)for(var p=0;p<n.tensors.length;++p)c.onnx.TensorProto.encode(n.tensors[p],s.uint32(82).fork()).ldelim();if(n.graphs!=null&&n.graphs.length)for(var p=0;p<n.graphs.length;++p)c.onnx.GraphProto.encode(n.graphs[p],s.uint32(90).fork()).ldelim();if(n.docString!=null&&Object.hasOwnProperty.call(n,"docString")&&s.uint32(106).string(n.docString),n.tp!=null&&Object.hasOwnProperty.call(n,"tp")&&c.onnx.TypeProto.encode(n.tp,s.uint32(114).fork()).ldelim(),n.typeProtos!=null&&n.typeProtos.length)for(var p=0;p<n.typeProtos.length;++p)c.onnx.TypeProto.encode(n.typeProtos[p],s.uint32(122).fork()).ldelim();if(n.type!=null&&Object.hasOwnProperty.call(n,"type")&&s.uint32(160).int32(n.type),n.refAttrName!=null&&Object.hasOwnProperty.call(n,"refAttrName")&&s.uint32(170).string(n.refAttrName),n.sparseTensor!=null&&Object.hasOwnProperty.call(n,"sparseTensor")&&c.onnx.SparseTensorProto.encode(n.sparseTensor,s.uint32(178).fork()).ldelim(),n.sparseTensors!=null&&n.sparseTensors.length)for(var p=0;p<n.sparseTensors.length;++p)c.onnx.SparseTensorProto.encode(n.sparseTensors[p],s.uint32(186).fork()).ldelim();return s},i.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},i.decode=function(n,s){n instanceof o||(n=o.create(n));for(var p=s===void 0?n.len:n.pos+s,f=new c.onnx.AttributeProto;n.pos<p;){var h=n.uint32();switch(h>>>3){case 1:{f.name=n.string();break}case 21:{f.refAttrName=n.string();break}case 13:{f.docString=n.string();break}case 20:{f.type=n.int32();break}case 2:{f.f=n.float();break}case 3:{f.i=n.int64();break}case 4:{f.s=n.bytes();break}case 5:{f.t=c.onnx.TensorProto.decode(n,n.uint32());break}case 6:{f.g=c.onnx.GraphProto.decode(n,n.uint32());break}case 22:{f.sparseTensor=c.onnx.SparseTensorProto.decode(n,n.uint32());break}case 14:{f.tp=c.onnx.TypeProto.decode(n,n.uint32());break}case 7:{if(f.floats&&f.floats.length||(f.floats=[]),(h&7)===2)for(var m=n.uint32()+n.pos;n.pos<m;)f.floats.push(n.float());else f.floats.push(n.float());break}case 8:{if(f.ints&&f.ints.length||(f.ints=[]),(h&7)===2)for(var m=n.uint32()+n.pos;n.pos<m;)f.ints.push(n.int64());else f.ints.push(n.int64());break}case 9:{f.strings&&f.strings.length||(f.strings=[]),f.strings.push(n.bytes());break}case 10:{f.tensors&&f.tensors.length||(f.tensors=[]),f.tensors.push(c.onnx.TensorProto.decode(n,n.uint32()));break}case 11:{f.graphs&&f.graphs.length||(f.graphs=[]),f.graphs.push(c.onnx.GraphProto.decode(n,n.uint32()));break}case 23:{f.sparseTensors&&f.sparseTensors.length||(f.sparseTensors=[]),f.sparseTensors.push(c.onnx.SparseTensorProto.decode(n,n.uint32()));break}case 15:{f.typeProtos&&f.typeProtos.length||(f.typeProtos=[]),f.typeProtos.push(c.onnx.TypeProto.decode(n,n.uint32()));break}default:n.skipType(h&7);break}}return f},i.decodeDelimited=function(n){return n instanceof o||(n=new o(n)),this.decode(n,n.uint32())},i.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.name!=null&&n.hasOwnProperty("name")&&!l.isString(n.name))return"name: string expected";if(n.refAttrName!=null&&n.hasOwnProperty("refAttrName")&&!l.isString(n.refAttrName))return"refAttrName: string expected";if(n.docString!=null&&n.hasOwnProperty("docString")&&!l.isString(n.docString))return"docString: string expected";if(n.type!=null&&n.hasOwnProperty("type"))switch(n.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(n.f!=null&&n.hasOwnProperty("f")&&typeof n.f!="number")return"f: number expected";if(n.i!=null&&n.hasOwnProperty("i")&&!l.isInteger(n.i)&&!(n.i&&l.isInteger(n.i.low)&&l.isInteger(n.i.high)))return"i: integer|Long expected";if(n.s!=null&&n.hasOwnProperty("s")&&!(n.s&&typeof n.s.length=="number"||l.isString(n.s)))return"s: buffer expected";if(n.t!=null&&n.hasOwnProperty("t")){var s=c.onnx.TensorProto.verify(n.t);if(s)return"t."+s}if(n.g!=null&&n.hasOwnProperty("g")){var s=c.onnx.GraphProto.verify(n.g);if(s)return"g."+s}if(n.sparseTensor!=null&&n.hasOwnProperty("sparseTensor")){var s=c.onnx.SparseTensorProto.verify(n.sparseTensor);if(s)return"sparseTensor."+s}if(n.tp!=null&&n.hasOwnProperty("tp")){var s=c.onnx.TypeProto.verify(n.tp);if(s)return"tp."+s}if(n.floats!=null&&n.hasOwnProperty("floats")){if(!Array.isArray(n.floats))return"floats: array expected";for(var p=0;p<n.floats.length;++p)if(typeof n.floats[p]!="number")return"floats: number[] expected"}if(n.ints!=null&&n.hasOwnProperty("ints")){if(!Array.isArray(n.ints))return"ints: array expected";for(var p=0;p<n.ints.length;++p)if(!l.isInteger(n.ints[p])&&!(n.ints[p]&&l.isInteger(n.ints[p].low)&&l.isInteger(n.ints[p].high)))return"ints: integer|Long[] expected"}if(n.strings!=null&&n.hasOwnProperty("strings")){if(!Array.isArray(n.strings))return"strings: array expected";for(var p=0;p<n.strings.length;++p)if(!(n.strings[p]&&typeof n.strings[p].length=="number"||l.isString(n.strings[p])))return"strings: buffer[] expected"}if(n.tensors!=null&&n.hasOwnProperty("tensors")){if(!Array.isArray(n.tensors))return"tensors: array expected";for(var p=0;p<n.tensors.length;++p){var s=c.onnx.TensorProto.verify(n.tensors[p]);if(s)return"tensors."+s}}if(n.graphs!=null&&n.hasOwnProperty("graphs")){if(!Array.isArray(n.graphs))return"graphs: array expected";for(var p=0;p<n.graphs.length;++p){var s=c.onnx.GraphProto.verify(n.graphs[p]);if(s)return"graphs."+s}}if(n.sparseTensors!=null&&n.hasOwnProperty("sparseTensors")){if(!Array.isArray(n.sparseTensors))return"sparseTensors: array expected";for(var p=0;p<n.sparseTensors.length;++p){var s=c.onnx.SparseTensorProto.verify(n.sparseTensors[p]);if(s)return"sparseTensors."+s}}if(n.typeProtos!=null&&n.hasOwnProperty("typeProtos")){if(!Array.isArray(n.typeProtos))return"typeProtos: array expected";for(var p=0;p<n.typeProtos.length;++p){var s=c.onnx.TypeProto.verify(n.typeProtos[p]);if(s)return"typeProtos."+s}}return null},i.fromObject=function(n){if(n instanceof c.onnx.AttributeProto)return n;var s=new c.onnx.AttributeProto;switch(n.name!=null&&(s.name=String(n.name)),n.refAttrName!=null&&(s.refAttrName=String(n.refAttrName)),n.docString!=null&&(s.docString=String(n.docString)),n.type){default:if(typeof n.type=="number"){s.type=n.type;break}break;case"UNDEFINED":case 0:s.type=0;break;case"FLOAT":case 1:s.type=1;break;case"INT":case 2:s.type=2;break;case"STRING":case 3:s.type=3;break;case"TENSOR":case 4:s.type=4;break;case"GRAPH":case 5:s.type=5;break;case"SPARSE_TENSOR":case 11:s.type=11;break;case"TYPE_PROTO":case 13:s.type=13;break;case"FLOATS":case 6:s.type=6;break;case"INTS":case 7:s.type=7;break;case"STRINGS":case 8:s.type=8;break;case"TENSORS":case 9:s.type=9;break;case"GRAPHS":case 10:s.type=10;break;case"SPARSE_TENSORS":case 12:s.type=12;break;case"TYPE_PROTOS":case 14:s.type=14;break}if(n.f!=null&&(s.f=Number(n.f)),n.i!=null&&(l.Long?(s.i=l.Long.fromValue(n.i)).unsigned=!1:typeof n.i=="string"?s.i=parseInt(n.i,10):typeof n.i=="number"?s.i=n.i:typeof n.i=="object"&&(s.i=new l.LongBits(n.i.low>>>0,n.i.high>>>0).toNumber())),n.s!=null&&(typeof n.s=="string"?l.base64.decode(n.s,s.s=l.newBuffer(l.base64.length(n.s)),0):n.s.length>=0&&(s.s=n.s)),n.t!=null){if(typeof n.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");s.t=c.onnx.TensorProto.fromObject(n.t)}if(n.g!=null){if(typeof n.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");s.g=c.onnx.GraphProto.fromObject(n.g)}if(n.sparseTensor!=null){if(typeof n.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");s.sparseTensor=c.onnx.SparseTensorProto.fromObject(n.sparseTensor)}if(n.tp!=null){if(typeof n.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");s.tp=c.onnx.TypeProto.fromObject(n.tp)}if(n.floats){if(!Array.isArray(n.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");s.floats=[];for(var p=0;p<n.floats.length;++p)s.floats[p]=Number(n.floats[p])}if(n.ints){if(!Array.isArray(n.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");s.ints=[];for(var p=0;p<n.ints.length;++p)l.Long?(s.ints[p]=l.Long.fromValue(n.ints[p])).unsigned=!1:typeof n.ints[p]=="string"?s.ints[p]=parseInt(n.ints[p],10):typeof n.ints[p]=="number"?s.ints[p]=n.ints[p]:typeof n.ints[p]=="object"&&(s.ints[p]=new l.LongBits(n.ints[p].low>>>0,n.ints[p].high>>>0).toNumber())}if(n.strings){if(!Array.isArray(n.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");s.strings=[];for(var p=0;p<n.strings.length;++p)typeof n.strings[p]=="string"?l.base64.decode(n.strings[p],s.strings[p]=l.newBuffer(l.base64.length(n.strings[p])),0):n.strings[p].length>=0&&(s.strings[p]=n.strings[p])}if(n.tensors){if(!Array.isArray(n.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");s.tensors=[];for(var p=0;p<n.tensors.length;++p){if(typeof n.tensors[p]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");s.tensors[p]=c.onnx.TensorProto.fromObject(n.tensors[p])}}if(n.graphs){if(!Array.isArray(n.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");s.graphs=[];for(var p=0;p<n.graphs.length;++p){if(typeof n.graphs[p]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");s.graphs[p]=c.onnx.GraphProto.fromObject(n.graphs[p])}}if(n.sparseTensors){if(!Array.isArray(n.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");s.sparseTensors=[];for(var p=0;p<n.sparseTensors.length;++p){if(typeof n.sparseTensors[p]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");s.sparseTensors[p]=c.onnx.SparseTensorProto.fromObject(n.sparseTensors[p])}}if(n.typeProtos){if(!Array.isArray(n.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");s.typeProtos=[];for(var p=0;p<n.typeProtos.length;++p){if(typeof n.typeProtos[p]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");s.typeProtos[p]=c.onnx.TypeProto.fromObject(n.typeProtos[p])}}return s},i.toObject=function(n,s){s||(s={});var p={};if((s.arrays||s.defaults)&&(p.floats=[],p.ints=[],p.strings=[],p.tensors=[],p.graphs=[],p.typeProtos=[],p.sparseTensors=[]),s.defaults){if(p.name="",p.f=0,l.Long){var f=new l.Long(0,0,!1);p.i=s.longs===String?f.toString():s.longs===Number?f.toNumber():f}else p.i=s.longs===String?"0":0;s.bytes===String?p.s="":(p.s=[],s.bytes!==Array&&(p.s=l.newBuffer(p.s))),p.t=null,p.g=null,p.docString="",p.tp=null,p.type=s.enums===String?"UNDEFINED":0,p.refAttrName="",p.sparseTensor=null}if(n.name!=null&&n.hasOwnProperty("name")&&(p.name=n.name),n.f!=null&&n.hasOwnProperty("f")&&(p.f=s.json&&!isFinite(n.f)?String(n.f):n.f),n.i!=null&&n.hasOwnProperty("i")&&(typeof n.i=="number"?p.i=s.longs===String?String(n.i):n.i:p.i=s.longs===String?l.Long.prototype.toString.call(n.i):s.longs===Number?new l.LongBits(n.i.low>>>0,n.i.high>>>0).toNumber():n.i),n.s!=null&&n.hasOwnProperty("s")&&(p.s=s.bytes===String?l.base64.encode(n.s,0,n.s.length):s.bytes===Array?Array.prototype.slice.call(n.s):n.s),n.t!=null&&n.hasOwnProperty("t")&&(p.t=c.onnx.TensorProto.toObject(n.t,s)),n.g!=null&&n.hasOwnProperty("g")&&(p.g=c.onnx.GraphProto.toObject(n.g,s)),n.floats&&n.floats.length){p.floats=[];for(var h=0;h<n.floats.length;++h)p.floats[h]=s.json&&!isFinite(n.floats[h])?String(n.floats[h]):n.floats[h]}if(n.ints&&n.ints.length){p.ints=[];for(var h=0;h<n.ints.length;++h)typeof n.ints[h]=="number"?p.ints[h]=s.longs===String?String(n.ints[h]):n.ints[h]:p.ints[h]=s.longs===String?l.Long.prototype.toString.call(n.ints[h]):s.longs===Number?new l.LongBits(n.ints[h].low>>>0,n.ints[h].high>>>0).toNumber():n.ints[h]}if(n.strings&&n.strings.length){p.strings=[];for(var h=0;h<n.strings.length;++h)p.strings[h]=s.bytes===String?l.base64.encode(n.strings[h],0,n.strings[h].length):s.bytes===Array?Array.prototype.slice.call(n.strings[h]):n.strings[h]}if(n.tensors&&n.tensors.length){p.tensors=[];for(var h=0;h<n.tensors.length;++h)p.tensors[h]=c.onnx.TensorProto.toObject(n.tensors[h],s)}if(n.graphs&&n.graphs.length){p.graphs=[];for(var h=0;h<n.graphs.length;++h)p.graphs[h]=c.onnx.GraphProto.toObject(n.graphs[h],s)}if(n.docString!=null&&n.hasOwnProperty("docString")&&(p.docString=n.docString),n.tp!=null&&n.hasOwnProperty("tp")&&(p.tp=c.onnx.TypeProto.toObject(n.tp,s)),n.typeProtos&&n.typeProtos.length){p.typeProtos=[];for(var h=0;h<n.typeProtos.length;++h)p.typeProtos[h]=c.onnx.TypeProto.toObject(n.typeProtos[h],s)}if(n.type!=null&&n.hasOwnProperty("type")&&(p.type=s.enums===String?c.onnx.AttributeProto.AttributeType[n.type]===void 0?n.type:c.onnx.AttributeProto.AttributeType[n.type]:n.type),n.refAttrName!=null&&n.hasOwnProperty("refAttrName")&&(p.refAttrName=n.refAttrName),n.sparseTensor!=null&&n.hasOwnProperty("sparseTensor")&&(p.sparseTensor=c.onnx.SparseTensorProto.toObject(n.sparseTensor,s)),n.sparseTensors&&n.sparseTensors.length){p.sparseTensors=[];for(var h=0;h<n.sparseTensors.length;++h)p.sparseTensors[h]=c.onnx.SparseTensorProto.toObject(n.sparseTensors[h],s)}return p},i.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},i.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.AttributeProto"},i.AttributeType=(function(){var a={},n=Object.create(a);return n[a[0]="UNDEFINED"]=0,n[a[1]="FLOAT"]=1,n[a[2]="INT"]=2,n[a[3]="STRING"]=3,n[a[4]="TENSOR"]=4,n[a[5]="GRAPH"]=5,n[a[11]="SPARSE_TENSOR"]=11,n[a[13]="TYPE_PROTO"]=13,n[a[6]="FLOATS"]=6,n[a[7]="INTS"]=7,n[a[8]="STRINGS"]=8,n[a[9]="TENSORS"]=9,n[a[10]="GRAPHS"]=10,n[a[12]="SPARSE_TENSORS"]=12,n[a[14]="TYPE_PROTOS"]=14,n})(),i})(),d.ValueInfoProto=(function(){function i(a){if(a)for(var n=Object.keys(a),s=0;s<n.length;++s)a[n[s]]!=null&&(this[n[s]]=a[n[s]])}return i.prototype.name="",i.prototype.type=null,i.prototype.docString="",i.create=function(n){return new i(n)},i.encode=function(n,s){return s||(s=u.create()),n.name!=null&&Object.hasOwnProperty.call(n,"name")&&s.uint32(10).string(n.name),n.type!=null&&Object.hasOwnProperty.call(n,"type")&&c.onnx.TypeProto.encode(n.type,s.uint32(18).fork()).ldelim(),n.docString!=null&&Object.hasOwnProperty.call(n,"docString")&&s.uint32(26).string(n.docString),s},i.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},i.decode=function(n,s){n instanceof o||(n=o.create(n));for(var p=s===void 0?n.len:n.pos+s,f=new c.onnx.ValueInfoProto;n.pos<p;){var h=n.uint32();switch(h>>>3){case 1:{f.name=n.string();break}case 2:{f.type=c.onnx.TypeProto.decode(n,n.uint32());break}case 3:{f.docString=n.string();break}default:n.skipType(h&7);break}}return f},i.decodeDelimited=function(n){return n instanceof o||(n=new o(n)),this.decode(n,n.uint32())},i.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.name!=null&&n.hasOwnProperty("name")&&!l.isString(n.name))return"name: string expected";if(n.type!=null&&n.hasOwnProperty("type")){var s=c.onnx.TypeProto.verify(n.type);if(s)return"type."+s}return n.docString!=null&&n.hasOwnProperty("docString")&&!l.isString(n.docString)?"docString: string expected":null},i.fromObject=function(n){if(n instanceof c.onnx.ValueInfoProto)return n;var s=new c.onnx.ValueInfoProto;if(n.name!=null&&(s.name=String(n.name)),n.type!=null){if(typeof n.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");s.type=c.onnx.TypeProto.fromObject(n.type)}return n.docString!=null&&(s.docString=String(n.docString)),s},i.toObject=function(n,s){s||(s={});var p={};return s.defaults&&(p.name="",p.type=null,p.docString=""),n.name!=null&&n.hasOwnProperty("name")&&(p.name=n.name),n.type!=null&&n.hasOwnProperty("type")&&(p.type=c.onnx.TypeProto.toObject(n.type,s)),n.docString!=null&&n.hasOwnProperty("docString")&&(p.docString=n.docString),p},i.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},i.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.ValueInfoProto"},i})(),d.NodeProto=(function(){function i(a){if(this.input=[],this.output=[],this.attribute=[],a)for(var n=Object.keys(a),s=0;s<n.length;++s)a[n[s]]!=null&&(this[n[s]]=a[n[s]])}return i.prototype.input=l.emptyArray,i.prototype.output=l.emptyArray,i.prototype.name="",i.prototype.opType="",i.prototype.domain="",i.prototype.attribute=l.emptyArray,i.prototype.docString="",i.create=function(n){return new i(n)},i.encode=function(n,s){if(s||(s=u.create()),n.input!=null&&n.input.length)for(var p=0;p<n.input.length;++p)s.uint32(10).string(n.input[p]);if(n.output!=null&&n.output.length)for(var p=0;p<n.output.length;++p)s.uint32(18).string(n.output[p]);if(n.name!=null&&Object.hasOwnProperty.call(n,"name")&&s.uint32(26).string(n.name),n.opType!=null&&Object.hasOwnProperty.call(n,"opType")&&s.uint32(34).string(n.opType),n.attribute!=null&&n.attribute.length)for(var p=0;p<n.attribute.length;++p)c.onnx.AttributeProto.encode(n.attribute[p],s.uint32(42).fork()).ldelim();return n.docString!=null&&Object.hasOwnProperty.call(n,"docString")&&s.uint32(50).string(n.docString),n.domain!=null&&Object.hasOwnProperty.call(n,"domain")&&s.uint32(58).string(n.domain),s},i.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},i.decode=function(n,s){n instanceof o||(n=o.create(n));for(var p=s===void 0?n.len:n.pos+s,f=new c.onnx.NodeProto;n.pos<p;){var h=n.uint32();switch(h>>>3){case 1:{f.input&&f.input.length||(f.input=[]),f.input.push(n.string());break}case 2:{f.output&&f.output.length||(f.output=[]),f.output.push(n.string());break}case 3:{f.name=n.string();break}case 4:{f.opType=n.string();break}case 7:{f.domain=n.string();break}case 5:{f.attribute&&f.attribute.length||(f.attribute=[]),f.attribute.push(c.onnx.AttributeProto.decode(n,n.uint32()));break}case 6:{f.docString=n.string();break}default:n.skipType(h&7);break}}return f},i.decodeDelimited=function(n){return n instanceof o||(n=new o(n)),this.decode(n,n.uint32())},i.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.input!=null&&n.hasOwnProperty("input")){if(!Array.isArray(n.input))return"input: array expected";for(var s=0;s<n.input.length;++s)if(!l.isString(n.input[s]))return"input: string[] expected"}if(n.output!=null&&n.hasOwnProperty("output")){if(!Array.isArray(n.output))return"output: array expected";for(var s=0;s<n.output.length;++s)if(!l.isString(n.output[s]))return"output: string[] expected"}if(n.name!=null&&n.hasOwnProperty("name")&&!l.isString(n.name))return"name: string expected";if(n.opType!=null&&n.hasOwnProperty("opType")&&!l.isString(n.opType))return"opType: string expected";if(n.domain!=null&&n.hasOwnProperty("domain")&&!l.isString(n.domain))return"domain: string expected";if(n.attribute!=null&&n.hasOwnProperty("attribute")){if(!Array.isArray(n.attribute))return"attribute: array expected";for(var s=0;s<n.attribute.length;++s){var p=c.onnx.AttributeProto.verify(n.attribute[s]);if(p)return"attribute."+p}}return n.docString!=null&&n.hasOwnProperty("docString")&&!l.isString(n.docString)?"docString: string expected":null},i.fromObject=function(n){if(n instanceof c.onnx.NodeProto)return n;var s=new c.onnx.NodeProto;if(n.input){if(!Array.isArray(n.input))throw TypeError(".onnx.NodeProto.input: array expected");s.input=[];for(var p=0;p<n.input.length;++p)s.input[p]=String(n.input[p])}if(n.output){if(!Array.isArray(n.output))throw TypeError(".onnx.NodeProto.output: array expected");s.output=[];for(var p=0;p<n.output.length;++p)s.output[p]=String(n.output[p])}if(n.name!=null&&(s.name=String(n.name)),n.opType!=null&&(s.opType=String(n.opType)),n.domain!=null&&(s.domain=String(n.domain)),n.attribute){if(!Array.isArray(n.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");s.attribute=[];for(var p=0;p<n.attribute.length;++p){if(typeof n.attribute[p]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");s.attribute[p]=c.onnx.AttributeProto.fromObject(n.attribute[p])}}return n.docString!=null&&(s.docString=String(n.docString)),s},i.toObject=function(n,s){s||(s={});var p={};if((s.arrays||s.defaults)&&(p.input=[],p.output=[],p.attribute=[]),s.defaults&&(p.name="",p.opType="",p.docString="",p.domain=""),n.input&&n.input.length){p.input=[];for(var f=0;f<n.input.length;++f)p.input[f]=n.input[f]}if(n.output&&n.output.length){p.output=[];for(var f=0;f<n.output.length;++f)p.output[f]=n.output[f]}if(n.name!=null&&n.hasOwnProperty("name")&&(p.name=n.name),n.opType!=null&&n.hasOwnProperty("opType")&&(p.opType=n.opType),n.attribute&&n.attribute.length){p.attribute=[];for(var f=0;f<n.attribute.length;++f)p.attribute[f]=c.onnx.AttributeProto.toObject(n.attribute[f],s)}return n.docString!=null&&n.hasOwnProperty("docString")&&(p.docString=n.docString),n.domain!=null&&n.hasOwnProperty("domain")&&(p.domain=n.domain),p},i.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},i.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.NodeProto"},i})(),d.TrainingInfoProto=(function(){function i(a){if(this.initializationBinding=[],this.updateBinding=[],a)for(var n=Object.keys(a),s=0;s<n.length;++s)a[n[s]]!=null&&(this[n[s]]=a[n[s]])}return i.prototype.initialization=null,i.prototype.algorithm=null,i.prototype.initializationBinding=l.emptyArray,i.prototype.updateBinding=l.emptyArray,i.create=function(n){return new i(n)},i.encode=function(n,s){if(s||(s=u.create()),n.initialization!=null&&Object.hasOwnProperty.call(n,"initialization")&&c.onnx.GraphProto.encode(n.initialization,s.uint32(10).fork()).ldelim(),n.algorithm!=null&&Object.hasOwnProperty.call(n,"algorithm")&&c.onnx.GraphProto.encode(n.algorithm,s.uint32(18).fork()).ldelim(),n.initializationBinding!=null&&n.initializationBinding.length)for(var p=0;p<n.initializationBinding.length;++p)c.onnx.StringStringEntryProto.encode(n.initializationBinding[p],s.uint32(26).fork()).ldelim();if(n.updateBinding!=null&&n.updateBinding.length)for(var p=0;p<n.updateBinding.length;++p)c.onnx.StringStringEntryProto.encode(n.updateBinding[p],s.uint32(34).fork()).ldelim();return s},i.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},i.decode=function(n,s){n instanceof o||(n=o.create(n));for(var p=s===void 0?n.len:n.pos+s,f=new c.onnx.TrainingInfoProto;n.pos<p;){var h=n.uint32();switch(h>>>3){case 1:{f.initialization=c.onnx.GraphProto.decode(n,n.uint32());break}case 2:{f.algorithm=c.onnx.GraphProto.decode(n,n.uint32());break}case 3:{f.initializationBinding&&f.initializationBinding.length||(f.initializationBinding=[]),f.initializationBinding.push(c.onnx.StringStringEntryProto.decode(n,n.uint32()));break}case 4:{f.updateBinding&&f.updateBinding.length||(f.updateBinding=[]),f.updateBinding.push(c.onnx.StringStringEntryProto.decode(n,n.uint32()));break}default:n.skipType(h&7);break}}return f},i.decodeDelimited=function(n){return n instanceof o||(n=new o(n)),this.decode(n,n.uint32())},i.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.initialization!=null&&n.hasOwnProperty("initialization")){var s=c.onnx.GraphProto.verify(n.initialization);if(s)return"initialization."+s}if(n.algorithm!=null&&n.hasOwnProperty("algorithm")){var s=c.onnx.GraphProto.verify(n.algorithm);if(s)return"algorithm."+s}if(n.initializationBinding!=null&&n.hasOwnProperty("initializationBinding")){if(!Array.isArray(n.initializationBinding))return"initializationBinding: array expected";for(var p=0;p<n.initializationBinding.length;++p){var s=c.onnx.StringStringEntryProto.verify(n.initializationBinding[p]);if(s)return"initializationBinding."+s}}if(n.updateBinding!=null&&n.hasOwnProperty("updateBinding")){if(!Array.isArray(n.updateBinding))return"updateBinding: array expected";for(var p=0;p<n.updateBinding.length;++p){var s=c.onnx.StringStringEntryProto.verify(n.updateBinding[p]);if(s)return"updateBinding."+s}}return null},i.fromObject=function(n){if(n instanceof c.onnx.TrainingInfoProto)return n;var s=new c.onnx.TrainingInfoProto;if(n.initialization!=null){if(typeof n.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");s.initialization=c.onnx.GraphProto.fromObject(n.initialization)}if(n.algorithm!=null){if(typeof n.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");s.algorithm=c.onnx.GraphProto.fromObject(n.algorithm)}if(n.initializationBinding){if(!Array.isArray(n.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");s.initializationBinding=[];for(var p=0;p<n.initializationBinding.length;++p){if(typeof n.initializationBinding[p]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");s.initializationBinding[p]=c.onnx.StringStringEntryProto.fromObject(n.initializationBinding[p])}}if(n.updateBinding){if(!Array.isArray(n.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");s.updateBinding=[];for(var p=0;p<n.updateBinding.length;++p){if(typeof n.updateBinding[p]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");s.updateBinding[p]=c.onnx.StringStringEntryProto.fromObject(n.updateBinding[p])}}return s},i.toObject=function(n,s){s||(s={});var p={};if((s.arrays||s.defaults)&&(p.initializationBinding=[],p.updateBinding=[]),s.defaults&&(p.initialization=null,p.algorithm=null),n.initialization!=null&&n.hasOwnProperty("initialization")&&(p.initialization=c.onnx.GraphProto.toObject(n.initialization,s)),n.algorithm!=null&&n.hasOwnProperty("algorithm")&&(p.algorithm=c.onnx.GraphProto.toObject(n.algorithm,s)),n.initializationBinding&&n.initializationBinding.length){p.initializationBinding=[];for(var f=0;f<n.initializationBinding.length;++f)p.initializationBinding[f]=c.onnx.StringStringEntryProto.toObject(n.initializationBinding[f],s)}if(n.updateBinding&&n.updateBinding.length){p.updateBinding=[];for(var f=0;f<n.updateBinding.length;++f)p.updateBinding[f]=c.onnx.StringStringEntryProto.toObject(n.updateBinding[f],s)}return p},i.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},i.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.TrainingInfoProto"},i})(),d.ModelProto=(function(){function i(a){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],a)for(var n=Object.keys(a),s=0;s<n.length;++s)a[n[s]]!=null&&(this[n[s]]=a[n[s]])}return i.prototype.irVersion=l.Long?l.Long.fromBits(0,0,!1):0,i.prototype.opsetImport=l.emptyArray,i.prototype.producerName="",i.prototype.producerVersion="",i.prototype.domain="",i.prototype.modelVersion=l.Long?l.Long.fromBits(0,0,!1):0,i.prototype.docString="",i.prototype.graph=null,i.prototype.metadataProps=l.emptyArray,i.prototype.trainingInfo=l.emptyArray,i.prototype.functions=l.emptyArray,i.create=function(n){return new i(n)},i.encode=function(n,s){if(s||(s=u.create()),n.irVersion!=null&&Object.hasOwnProperty.call(n,"irVersion")&&s.uint32(8).int64(n.irVersion),n.producerName!=null&&Object.hasOwnProperty.call(n,"producerName")&&s.uint32(18).string(n.producerName),n.producerVersion!=null&&Object.hasOwnProperty.call(n,"producerVersion")&&s.uint32(26).string(n.producerVersion),n.domain!=null&&Object.hasOwnProperty.call(n,"domain")&&s.uint32(34).string(n.domain),n.modelVersion!=null&&Object.hasOwnProperty.call(n,"modelVersion")&&s.uint32(40).int64(n.modelVersion),n.docString!=null&&Object.hasOwnProperty.call(n,"docString")&&s.uint32(50).string(n.docString),n.graph!=null&&Object.hasOwnProperty.call(n,"graph")&&c.onnx.GraphProto.encode(n.graph,s.uint32(58).fork()).ldelim(),n.opsetImport!=null&&n.opsetImport.length)for(var p=0;p<n.opsetImport.length;++p)c.onnx.OperatorSetIdProto.encode(n.opsetImport[p],s.uint32(66).fork()).ldelim();if(n.metadataProps!=null&&n.metadataProps.length)for(var p=0;p<n.metadataProps.length;++p)c.onnx.StringStringEntryProto.encode(n.metadataProps[p],s.uint32(114).fork()).ldelim();if(n.trainingInfo!=null&&n.trainingInfo.length)for(var p=0;p<n.trainingInfo.length;++p)c.onnx.TrainingInfoProto.encode(n.trainingInfo[p],s.uint32(162).fork()).ldelim();if(n.functions!=null&&n.functions.length)for(var p=0;p<n.functions.length;++p)c.onnx.FunctionProto.encode(n.functions[p],s.uint32(202).fork()).ldelim();return s},i.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},i.decode=function(n,s){n instanceof o||(n=o.create(n));for(var p=s===void 0?n.len:n.pos+s,f=new c.onnx.ModelProto;n.pos<p;){var h=n.uint32();switch(h>>>3){case 1:{f.irVersion=n.int64();break}case 8:{f.opsetImport&&f.opsetImport.length||(f.opsetImport=[]),f.opsetImport.push(c.onnx.OperatorSetIdProto.decode(n,n.uint32()));break}case 2:{f.producerName=n.string();break}case 3:{f.producerVersion=n.string();break}case 4:{f.domain=n.string();break}case 5:{f.modelVersion=n.int64();break}case 6:{f.docString=n.string();break}case 7:{f.graph=c.onnx.GraphProto.decode(n,n.uint32());break}case 14:{f.metadataProps&&f.metadataProps.length||(f.metadataProps=[]),f.metadataProps.push(c.onnx.StringStringEntryProto.decode(n,n.uint32()));break}case 20:{f.trainingInfo&&f.trainingInfo.length||(f.trainingInfo=[]),f.trainingInfo.push(c.onnx.TrainingInfoProto.decode(n,n.uint32()));break}case 25:{f.functions&&f.functions.length||(f.functions=[]),f.functions.push(c.onnx.FunctionProto.decode(n,n.uint32()));break}default:n.skipType(h&7);break}}return f},i.decodeDelimited=function(n){return n instanceof o||(n=new o(n)),this.decode(n,n.uint32())},i.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.irVersion!=null&&n.hasOwnProperty("irVersion")&&!l.isInteger(n.irVersion)&&!(n.irVersion&&l.isInteger(n.irVersion.low)&&l.isInteger(n.irVersion.high)))return"irVersion: integer|Long expected";if(n.opsetImport!=null&&n.hasOwnProperty("opsetImport")){if(!Array.isArray(n.opsetImport))return"opsetImport: array expected";for(var s=0;s<n.opsetImport.length;++s){var p=c.onnx.OperatorSetIdProto.verify(n.opsetImport[s]);if(p)return"opsetImport."+p}}if(n.producerName!=null&&n.hasOwnProperty("producerName")&&!l.isString(n.producerName))return"producerName: string expected";if(n.producerVersion!=null&&n.hasOwnProperty("producerVersion")&&!l.isString(n.producerVersion))return"producerVersion: string expected";if(n.domain!=null&&n.hasOwnProperty("domain")&&!l.isString(n.domain))return"domain: string expected";if(n.modelVersion!=null&&n.hasOwnProperty("modelVersion")&&!l.isInteger(n.modelVersion)&&!(n.modelVersion&&l.isInteger(n.modelVersion.low)&&l.isInteger(n.modelVersion.high)))return"modelVersion: integer|Long expected";if(n.docString!=null&&n.hasOwnProperty("docString")&&!l.isString(n.docString))return"docString: string expected";if(n.graph!=null&&n.hasOwnProperty("graph")){var p=c.onnx.GraphProto.verify(n.graph);if(p)return"graph."+p}if(n.metadataProps!=null&&n.hasOwnProperty("metadataProps")){if(!Array.isArray(n.metadataProps))return"metadataProps: array expected";for(var s=0;s<n.metadataProps.length;++s){var p=c.onnx.StringStringEntryProto.verify(n.metadataProps[s]);if(p)return"metadataProps."+p}}if(n.trainingInfo!=null&&n.hasOwnProperty("trainingInfo")){if(!Array.isArray(n.trainingInfo))return"trainingInfo: array expected";for(var s=0;s<n.trainingInfo.length;++s){var p=c.onnx.TrainingInfoProto.verify(n.trainingInfo[s]);if(p)return"trainingInfo."+p}}if(n.functions!=null&&n.hasOwnProperty("functions")){if(!Array.isArray(n.functions))return"functions: array expected";for(var s=0;s<n.functions.length;++s){var p=c.onnx.FunctionProto.verify(n.functions[s]);if(p)return"functions."+p}}return null},i.fromObject=function(n){if(n instanceof c.onnx.ModelProto)return n;var s=new c.onnx.ModelProto;if(n.irVersion!=null&&(l.Long?(s.irVersion=l.Long.fromValue(n.irVersion)).unsigned=!1:typeof n.irVersion=="string"?s.irVersion=parseInt(n.irVersion,10):typeof n.irVersion=="number"?s.irVersion=n.irVersion:typeof n.irVersion=="object"&&(s.irVersion=new l.LongBits(n.irVersion.low>>>0,n.irVersion.high>>>0).toNumber())),n.opsetImport){if(!Array.isArray(n.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");s.opsetImport=[];for(var p=0;p<n.opsetImport.length;++p){if(typeof n.opsetImport[p]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");s.opsetImport[p]=c.onnx.OperatorSetIdProto.fromObject(n.opsetImport[p])}}if(n.producerName!=null&&(s.producerName=String(n.producerName)),n.producerVersion!=null&&(s.producerVersion=String(n.producerVersion)),n.domain!=null&&(s.domain=String(n.domain)),n.modelVersion!=null&&(l.Long?(s.modelVersion=l.Long.fromValue(n.modelVersion)).unsigned=!1:typeof n.modelVersion=="string"?s.modelVersion=parseInt(n.modelVersion,10):typeof n.modelVersion=="number"?s.modelVersion=n.modelVersion:typeof n.modelVersion=="object"&&(s.modelVersion=new l.LongBits(n.modelVersion.low>>>0,n.modelVersion.high>>>0).toNumber())),n.docString!=null&&(s.docString=String(n.docString)),n.graph!=null){if(typeof n.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");s.graph=c.onnx.GraphProto.fromObject(n.graph)}if(n.metadataProps){if(!Array.isArray(n.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");s.metadataProps=[];for(var p=0;p<n.metadataProps.length;++p){if(typeof n.metadataProps[p]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");s.metadataProps[p]=c.onnx.StringStringEntryProto.fromObject(n.metadataProps[p])}}if(n.trainingInfo){if(!Array.isArray(n.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");s.trainingInfo=[];for(var p=0;p<n.trainingInfo.length;++p){if(typeof n.trainingInfo[p]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");s.trainingInfo[p]=c.onnx.TrainingInfoProto.fromObject(n.trainingInfo[p])}}if(n.functions){if(!Array.isArray(n.functions))throw TypeError(".onnx.ModelProto.functions: array expected");s.functions=[];for(var p=0;p<n.functions.length;++p){if(typeof n.functions[p]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");s.functions[p]=c.onnx.FunctionProto.fromObject(n.functions[p])}}return s},i.toObject=function(n,s){s||(s={});var p={};if((s.arrays||s.defaults)&&(p.opsetImport=[],p.metadataProps=[],p.trainingInfo=[],p.functions=[]),s.defaults){if(l.Long){var f=new l.Long(0,0,!1);p.irVersion=s.longs===String?f.toString():s.longs===Number?f.toNumber():f}else p.irVersion=s.longs===String?"0":0;if(p.producerName="",p.producerVersion="",p.domain="",l.Long){var f=new l.Long(0,0,!1);p.modelVersion=s.longs===String?f.toString():s.longs===Number?f.toNumber():f}else p.modelVersion=s.longs===String?"0":0;p.docString="",p.graph=null}if(n.irVersion!=null&&n.hasOwnProperty("irVersion")&&(typeof n.irVersion=="number"?p.irVersion=s.longs===String?String(n.irVersion):n.irVersion:p.irVersion=s.longs===String?l.Long.prototype.toString.call(n.irVersion):s.longs===Number?new l.LongBits(n.irVersion.low>>>0,n.irVersion.high>>>0).toNumber():n.irVersion),n.producerName!=null&&n.hasOwnProperty("producerName")&&(p.producerName=n.producerName),n.producerVersion!=null&&n.hasOwnProperty("producerVersion")&&(p.producerVersion=n.producerVersion),n.domain!=null&&n.hasOwnProperty("domain")&&(p.domain=n.domain),n.modelVersion!=null&&n.hasOwnProperty("modelVersion")&&(typeof n.modelVersion=="number"?p.modelVersion=s.longs===String?String(n.modelVersion):n.modelVersion:p.modelVersion=s.longs===String?l.Long.prototype.toString.call(n.modelVersion):s.longs===Number?new l.LongBits(n.modelVersion.low>>>0,n.modelVersion.high>>>0).toNumber():n.modelVersion),n.docString!=null&&n.hasOwnProperty("docString")&&(p.docString=n.docString),n.graph!=null&&n.hasOwnProperty("graph")&&(p.graph=c.onnx.GraphProto.toObject(n.graph,s)),n.opsetImport&&n.opsetImport.length){p.opsetImport=[];for(var h=0;h<n.opsetImport.length;++h)p.opsetImport[h]=c.onnx.OperatorSetIdProto.toObject(n.opsetImport[h],s)}if(n.metadataProps&&n.metadataProps.length){p.metadataProps=[];for(var h=0;h<n.metadataProps.length;++h)p.metadataProps[h]=c.onnx.StringStringEntryProto.toObject(n.metadataProps[h],s)}if(n.trainingInfo&&n.trainingInfo.length){p.trainingInfo=[];for(var h=0;h<n.trainingInfo.length;++h)p.trainingInfo[h]=c.onnx.TrainingInfoProto.toObject(n.trainingInfo[h],s)}if(n.functions&&n.functions.length){p.functions=[];for(var h=0;h<n.functions.length;++h)p.functions[h]=c.onnx.FunctionProto.toObject(n.functions[h],s)}return p},i.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},i.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.ModelProto"},i})(),d.StringStringEntryProto=(function(){function i(a){if(a)for(var n=Object.keys(a),s=0;s<n.length;++s)a[n[s]]!=null&&(this[n[s]]=a[n[s]])}return i.prototype.key="",i.prototype.value="",i.create=function(n){return new i(n)},i.encode=function(n,s){return s||(s=u.create()),n.key!=null&&Object.hasOwnProperty.call(n,"key")&&s.uint32(10).string(n.key),n.value!=null&&Object.hasOwnProperty.call(n,"value")&&s.uint32(18).string(n.value),s},i.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},i.decode=function(n,s){n instanceof o||(n=o.create(n));for(var p=s===void 0?n.len:n.pos+s,f=new c.onnx.StringStringEntryProto;n.pos<p;){var h=n.uint32();switch(h>>>3){case 1:{f.key=n.string();break}case 2:{f.value=n.string();break}default:n.skipType(h&7);break}}return f},i.decodeDelimited=function(n){return n instanceof o||(n=new o(n)),this.decode(n,n.uint32())},i.verify=function(n){return typeof n!="object"||n===null?"object expected":n.key!=null&&n.hasOwnProperty("key")&&!l.isString(n.key)?"key: string expected":n.value!=null&&n.hasOwnProperty("value")&&!l.isString(n.value)?"value: string expected":null},i.fromObject=function(n){if(n instanceof c.onnx.StringStringEntryProto)return n;var s=new c.onnx.StringStringEntryProto;return n.key!=null&&(s.key=String(n.key)),n.value!=null&&(s.value=String(n.value)),s},i.toObject=function(n,s){s||(s={});var p={};return s.defaults&&(p.key="",p.value=""),n.key!=null&&n.hasOwnProperty("key")&&(p.key=n.key),n.value!=null&&n.hasOwnProperty("value")&&(p.value=n.value),p},i.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},i.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.StringStringEntryProto"},i})(),d.TensorAnnotation=(function(){function i(a){if(this.quantParameterTensorNames=[],a)for(var n=Object.keys(a),s=0;s<n.length;++s)a[n[s]]!=null&&(this[n[s]]=a[n[s]])}return i.prototype.tensorName="",i.prototype.quantParameterTensorNames=l.emptyArray,i.create=function(n){return new i(n)},i.encode=function(n,s){if(s||(s=u.create()),n.tensorName!=null&&Object.hasOwnProperty.call(n,"tensorName")&&s.uint32(10).string(n.tensorName),n.quantParameterTensorNames!=null&&n.quantParameterTensorNames.length)for(var p=0;p<n.quantParameterTensorNames.length;++p)c.onnx.StringStringEntryProto.encode(n.quantParameterTensorNames[p],s.uint32(18).fork()).ldelim();return s},i.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},i.decode=function(n,s){n instanceof o||(n=o.create(n));for(var p=s===void 0?n.len:n.pos+s,f=new c.onnx.TensorAnnotation;n.pos<p;){var h=n.uint32();switch(h>>>3){case 1:{f.tensorName=n.string();break}case 2:{f.quantParameterTensorNames&&f.quantParameterTensorNames.length||(f.quantParameterTensorNames=[]),f.quantParameterTensorNames.push(c.onnx.StringStringEntryProto.decode(n,n.uint32()));break}default:n.skipType(h&7);break}}return f},i.decodeDelimited=function(n){return n instanceof o||(n=new o(n)),this.decode(n,n.uint32())},i.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.tensorName!=null&&n.hasOwnProperty("tensorName")&&!l.isString(n.tensorName))return"tensorName: string expected";if(n.quantParameterTensorNames!=null&&n.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(n.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var s=0;s<n.quantParameterTensorNames.length;++s){var p=c.onnx.StringStringEntryProto.verify(n.quantParameterTensorNames[s]);if(p)return"quantParameterTensorNames."+p}}return null},i.fromObject=function(n){if(n instanceof c.onnx.TensorAnnotation)return n;var s=new c.onnx.TensorAnnotation;if(n.tensorName!=null&&(s.tensorName=String(n.tensorName)),n.quantParameterTensorNames){if(!Array.isArray(n.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");s.quantParameterTensorNames=[];for(var p=0;p<n.quantParameterTensorNames.length;++p){if(typeof n.quantParameterTensorNames[p]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");s.quantParameterTensorNames[p]=c.onnx.StringStringEntryProto.fromObject(n.quantParameterTensorNames[p])}}return s},i.toObject=function(n,s){s||(s={});var p={};if((s.arrays||s.defaults)&&(p.quantParameterTensorNames=[]),s.defaults&&(p.tensorName=""),n.tensorName!=null&&n.hasOwnProperty("tensorName")&&(p.tensorName=n.tensorName),n.quantParameterTensorNames&&n.quantParameterTensorNames.length){p.quantParameterTensorNames=[];for(var f=0;f<n.quantParameterTensorNames.length;++f)p.quantParameterTensorNames[f]=c.onnx.StringStringEntryProto.toObject(n.quantParameterTensorNames[f],s)}return p},i.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},i.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.TensorAnnotation"},i})(),d.GraphProto=(function(){function i(a){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],a)for(var n=Object.keys(a),s=0;s<n.length;++s)a[n[s]]!=null&&(this[n[s]]=a[n[s]])}return i.prototype.node=l.emptyArray,i.prototype.name="",i.prototype.initializer=l.emptyArray,i.prototype.sparseInitializer=l.emptyArray,i.prototype.docString="",i.prototype.input=l.emptyArray,i.prototype.output=l.emptyArray,i.prototype.valueInfo=l.emptyArray,i.prototype.quantizationAnnotation=l.emptyArray,i.create=function(n){return new i(n)},i.encode=function(n,s){if(s||(s=u.create()),n.node!=null&&n.node.length)for(var p=0;p<n.node.length;++p)c.onnx.NodeProto.encode(n.node[p],s.uint32(10).fork()).ldelim();if(n.name!=null&&Object.hasOwnProperty.call(n,"name")&&s.uint32(18).string(n.name),n.initializer!=null&&n.initializer.length)for(var p=0;p<n.initializer.length;++p)c.onnx.TensorProto.encode(n.initializer[p],s.uint32(42).fork()).ldelim();if(n.docString!=null&&Object.hasOwnProperty.call(n,"docString")&&s.uint32(82).string(n.docString),n.input!=null&&n.input.length)for(var p=0;p<n.input.length;++p)c.onnx.ValueInfoProto.encode(n.input[p],s.uint32(90).fork()).ldelim();if(n.output!=null&&n.output.length)for(var p=0;p<n.output.length;++p)c.onnx.ValueInfoProto.encode(n.output[p],s.uint32(98).fork()).ldelim();if(n.valueInfo!=null&&n.valueInfo.length)for(var p=0;p<n.valueInfo.length;++p)c.onnx.ValueInfoProto.encode(n.valueInfo[p],s.uint32(106).fork()).ldelim();if(n.quantizationAnnotation!=null&&n.quantizationAnnotation.length)for(var p=0;p<n.quantizationAnnotation.length;++p)c.onnx.TensorAnnotation.encode(n.quantizationAnnotation[p],s.uint32(114).fork()).ldelim();if(n.sparseInitializer!=null&&n.sparseInitializer.length)for(var p=0;p<n.sparseInitializer.length;++p)c.onnx.SparseTensorProto.encode(n.sparseInitializer[p],s.uint32(122).fork()).ldelim();return s},i.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},i.decode=function(n,s){n instanceof o||(n=o.create(n));for(var p=s===void 0?n.len:n.pos+s,f=new c.onnx.GraphProto;n.pos<p;){var h=n.uint32();switch(h>>>3){case 1:{f.node&&f.node.length||(f.node=[]),f.node.push(c.onnx.NodeProto.decode(n,n.uint32()));break}case 2:{f.name=n.string();break}case 5:{f.initializer&&f.initializer.length||(f.initializer=[]),f.initializer.push(c.onnx.TensorProto.decode(n,n.uint32()));break}case 15:{f.sparseInitializer&&f.sparseInitializer.length||(f.sparseInitializer=[]),f.sparseInitializer.push(c.onnx.SparseTensorProto.decode(n,n.uint32()));break}case 10:{f.docString=n.string();break}case 11:{f.input&&f.input.length||(f.input=[]),f.input.push(c.onnx.ValueInfoProto.decode(n,n.uint32()));break}case 12:{f.output&&f.output.length||(f.output=[]),f.output.push(c.onnx.ValueInfoProto.decode(n,n.uint32()));break}case 13:{f.valueInfo&&f.valueInfo.length||(f.valueInfo=[]),f.valueInfo.push(c.onnx.ValueInfoProto.decode(n,n.uint32()));break}case 14:{f.quantizationAnnotation&&f.quantizationAnnotation.length||(f.quantizationAnnotation=[]),f.quantizationAnnotation.push(c.onnx.TensorAnnotation.decode(n,n.uint32()));break}default:n.skipType(h&7);break}}return f},i.decodeDelimited=function(n){return n instanceof o||(n=new o(n)),this.decode(n,n.uint32())},i.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.node!=null&&n.hasOwnProperty("node")){if(!Array.isArray(n.node))return"node: array expected";for(var s=0;s<n.node.length;++s){var p=c.onnx.NodeProto.verify(n.node[s]);if(p)return"node."+p}}if(n.name!=null&&n.hasOwnProperty("name")&&!l.isString(n.name))return"name: string expected";if(n.initializer!=null&&n.hasOwnProperty("initializer")){if(!Array.isArray(n.initializer))return"initializer: array expected";for(var s=0;s<n.initializer.length;++s){var p=c.onnx.TensorProto.verify(n.initializer[s]);if(p)return"initializer."+p}}if(n.sparseInitializer!=null&&n.hasOwnProperty("sparseInitializer")){if(!Array.isArray(n.sparseInitializer))return"sparseInitializer: array expected";for(var s=0;s<n.sparseInitializer.length;++s){var p=c.onnx.SparseTensorProto.verify(n.sparseInitializer[s]);if(p)return"sparseInitializer."+p}}if(n.docString!=null&&n.hasOwnProperty("docString")&&!l.isString(n.docString))return"docString: string expected";if(n.input!=null&&n.hasOwnProperty("input")){if(!Array.isArray(n.input))return"input: array expected";for(var s=0;s<n.input.length;++s){var p=c.onnx.ValueInfoProto.verify(n.input[s]);if(p)return"input."+p}}if(n.output!=null&&n.hasOwnProperty("output")){if(!Array.isArray(n.output))return"output: array expected";for(var s=0;s<n.output.length;++s){var p=c.onnx.ValueInfoProto.verify(n.output[s]);if(p)return"output."+p}}if(n.valueInfo!=null&&n.hasOwnProperty("valueInfo")){if(!Array.isArray(n.valueInfo))return"valueInfo: array expected";for(var s=0;s<n.valueInfo.length;++s){var p=c.onnx.ValueInfoProto.verify(n.valueInfo[s]);if(p)return"valueInfo."+p}}if(n.quantizationAnnotation!=null&&n.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(n.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var s=0;s<n.quantizationAnnotation.length;++s){var p=c.onnx.TensorAnnotation.verify(n.quantizationAnnotation[s]);if(p)return"quantizationAnnotation."+p}}return null},i.fromObject=function(n){if(n instanceof c.onnx.GraphProto)return n;var s=new c.onnx.GraphProto;if(n.node){if(!Array.isArray(n.node))throw TypeError(".onnx.GraphProto.node: array expected");s.node=[];for(var p=0;p<n.node.length;++p){if(typeof n.node[p]!="object")throw TypeError(".onnx.GraphProto.node: object expected");s.node[p]=c.onnx.NodeProto.fromObject(n.node[p])}}if(n.name!=null&&(s.name=String(n.name)),n.initializer){if(!Array.isArray(n.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");s.initializer=[];for(var p=0;p<n.initializer.length;++p){if(typeof n.initializer[p]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");s.initializer[p]=c.onnx.TensorProto.fromObject(n.initializer[p])}}if(n.sparseInitializer){if(!Array.isArray(n.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");s.sparseInitializer=[];for(var p=0;p<n.sparseInitializer.length;++p){if(typeof n.sparseInitializer[p]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");s.sparseInitializer[p]=c.onnx.SparseTensorProto.fromObject(n.sparseInitializer[p])}}if(n.docString!=null&&(s.docString=String(n.docString)),n.input){if(!Array.isArray(n.input))throw TypeError(".onnx.GraphProto.input: array expected");s.input=[];for(var p=0;p<n.input.length;++p){if(typeof n.input[p]!="object")throw TypeError(".onnx.GraphProto.input: object expected");s.input[p]=c.onnx.ValueInfoProto.fromObject(n.input[p])}}if(n.output){if(!Array.isArray(n.output))throw TypeError(".onnx.GraphProto.output: array expected");s.output=[];for(var p=0;p<n.output.length;++p){if(typeof n.output[p]!="object")throw TypeError(".onnx.GraphProto.output: object expected");s.output[p]=c.onnx.ValueInfoProto.fromObject(n.output[p])}}if(n.valueInfo){if(!Array.isArray(n.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");s.valueInfo=[];for(var p=0;p<n.valueInfo.length;++p){if(typeof n.valueInfo[p]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");s.valueInfo[p]=c.onnx.ValueInfoProto.fromObject(n.valueInfo[p])}}if(n.quantizationAnnotation){if(!Array.isArray(n.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");s.quantizationAnnotation=[];for(var p=0;p<n.quantizationAnnotation.length;++p){if(typeof n.quantizationAnnotation[p]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");s.quantizationAnnotation[p]=c.onnx.TensorAnnotation.fromObject(n.quantizationAnnotation[p])}}return s},i.toObject=function(n,s){s||(s={});var p={};if((s.arrays||s.defaults)&&(p.node=[],p.initializer=[],p.input=[],p.output=[],p.valueInfo=[],p.quantizationAnnotation=[],p.sparseInitializer=[]),s.defaults&&(p.name="",p.docString=""),n.node&&n.node.length){p.node=[];for(var f=0;f<n.node.length;++f)p.node[f]=c.onnx.NodeProto.toObject(n.node[f],s)}if(n.name!=null&&n.hasOwnProperty("name")&&(p.name=n.name),n.initializer&&n.initializer.length){p.initializer=[];for(var f=0;f<n.initializer.length;++f)p.initializer[f]=c.onnx.TensorProto.toObject(n.initializer[f],s)}if(n.docString!=null&&n.hasOwnProperty("docString")&&(p.docString=n.docString),n.input&&n.input.length){p.input=[];for(var f=0;f<n.input.length;++f)p.input[f]=c.onnx.ValueInfoProto.toObject(n.input[f],s)}if(n.output&&n.output.length){p.output=[];for(var f=0;f<n.output.length;++f)p.output[f]=c.onnx.ValueInfoProto.toObject(n.output[f],s)}if(n.valueInfo&&n.valueInfo.length){p.valueInfo=[];for(var f=0;f<n.valueInfo.length;++f)p.valueInfo[f]=c.onnx.ValueInfoProto.toObject(n.valueInfo[f],s)}if(n.quantizationAnnotation&&n.quantizationAnnotation.length){p.quantizationAnnotation=[];for(var f=0;f<n.quantizationAnnotation.length;++f)p.quantizationAnnotation[f]=c.onnx.TensorAnnotation.toObject(n.quantizationAnnotation[f],s)}if(n.sparseInitializer&&n.sparseInitializer.length){p.sparseInitializer=[];for(var f=0;f<n.sparseInitializer.length;++f)p.sparseInitializer[f]=c.onnx.SparseTensorProto.toObject(n.sparseInitializer[f],s)}return p},i.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},i.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.GraphProto"},i})(),d.TensorProto=(function(){function i(a){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],a)for(var n=Object.keys(a),s=0;s<n.length;++s)a[n[s]]!=null&&(this[n[s]]=a[n[s]])}return i.prototype.dims=l.emptyArray,i.prototype.dataType=0,i.prototype.segment=null,i.prototype.floatData=l.emptyArray,i.prototype.int32Data=l.emptyArray,i.prototype.stringData=l.emptyArray,i.prototype.int64Data=l.emptyArray,i.prototype.name="",i.prototype.docString="",i.prototype.rawData=l.newBuffer([]),i.prototype.externalData=l.emptyArray,i.prototype.dataLocation=0,i.prototype.doubleData=l.emptyArray,i.prototype.uint64Data=l.emptyArray,i.create=function(n){return new i(n)},i.encode=function(n,s){if(s||(s=u.create()),n.dims!=null&&n.dims.length){s.uint32(10).fork();for(var p=0;p<n.dims.length;++p)s.int64(n.dims[p]);s.ldelim()}if(n.dataType!=null&&Object.hasOwnProperty.call(n,"dataType")&&s.uint32(16).int32(n.dataType),n.segment!=null&&Object.hasOwnProperty.call(n,"segment")&&c.onnx.TensorProto.Segment.encode(n.segment,s.uint32(26).fork()).ldelim(),n.floatData!=null&&n.floatData.length){s.uint32(34).fork();for(var p=0;p<n.floatData.length;++p)s.float(n.floatData[p]);s.ldelim()}if(n.int32Data!=null&&n.int32Data.length){s.uint32(42).fork();for(var p=0;p<n.int32Data.length;++p)s.int32(n.int32Data[p]);s.ldelim()}if(n.stringData!=null&&n.stringData.length)for(var p=0;p<n.stringData.length;++p)s.uint32(50).bytes(n.stringData[p]);if(n.int64Data!=null&&n.int64Data.length){s.uint32(58).fork();for(var p=0;p<n.int64Data.length;++p)s.int64(n.int64Data[p]);s.ldelim()}if(n.name!=null&&Object.hasOwnProperty.call(n,"name")&&s.uint32(66).string(n.name),n.rawData!=null&&Object.hasOwnProperty.call(n,"rawData")&&s.uint32(74).bytes(n.rawData),n.doubleData!=null&&n.doubleData.length){s.uint32(82).fork();for(var p=0;p<n.doubleData.length;++p)s.double(n.doubleData[p]);s.ldelim()}if(n.uint64Data!=null&&n.uint64Data.length){s.uint32(90).fork();for(var p=0;p<n.uint64Data.length;++p)s.uint64(n.uint64Data[p]);s.ldelim()}if(n.docString!=null&&Object.hasOwnProperty.call(n,"docString")&&s.uint32(98).string(n.docString),n.externalData!=null&&n.externalData.length)for(var p=0;p<n.externalData.length;++p)c.onnx.StringStringEntryProto.encode(n.externalData[p],s.uint32(106).fork()).ldelim();return n.dataLocation!=null&&Object.hasOwnProperty.call(n,"dataLocation")&&s.uint32(112).int32(n.dataLocation),s},i.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},i.decode=function(n,s){n instanceof o||(n=o.create(n));for(var p=s===void 0?n.len:n.pos+s,f=new c.onnx.TensorProto;n.pos<p;){var h=n.uint32();switch(h>>>3){case 1:{if(f.dims&&f.dims.length||(f.dims=[]),(h&7)===2)for(var m=n.uint32()+n.pos;n.pos<m;)f.dims.push(n.int64());else f.dims.push(n.int64());break}case 2:{f.dataType=n.int32();break}case 3:{f.segment=c.onnx.TensorProto.Segment.decode(n,n.uint32());break}case 4:{if(f.floatData&&f.floatData.length||(f.floatData=[]),(h&7)===2)for(var m=n.uint32()+n.pos;n.pos<m;)f.floatData.push(n.float());else f.floatData.push(n.float());break}case 5:{if(f.int32Data&&f.int32Data.length||(f.int32Data=[]),(h&7)===2)for(var m=n.uint32()+n.pos;n.pos<m;)f.int32Data.push(n.int32());else f.int32Data.push(n.int32());break}case 6:{f.stringData&&f.stringData.length||(f.stringData=[]),f.stringData.push(n.bytes());break}case 7:{if(f.int64Data&&f.int64Data.length||(f.int64Data=[]),(h&7)===2)for(var m=n.uint32()+n.pos;n.pos<m;)f.int64Data.push(n.int64());else f.int64Data.push(n.int64());break}case 8:{f.name=n.string();break}case 12:{f.docString=n.string();break}case 9:{f.rawData=n.bytes();break}case 13:{f.externalData&&f.externalData.length||(f.externalData=[]),f.externalData.push(c.onnx.StringStringEntryProto.decode(n,n.uint32()));break}case 14:{f.dataLocation=n.int32();break}case 10:{if(f.doubleData&&f.doubleData.length||(f.doubleData=[]),(h&7)===2)for(var m=n.uint32()+n.pos;n.pos<m;)f.doubleData.push(n.double());else f.doubleData.push(n.double());break}case 11:{if(f.uint64Data&&f.uint64Data.length||(f.uint64Data=[]),(h&7)===2)for(var m=n.uint32()+n.pos;n.pos<m;)f.uint64Data.push(n.uint64());else f.uint64Data.push(n.uint64());break}default:n.skipType(h&7);break}}return f},i.decodeDelimited=function(n){return n instanceof o||(n=new o(n)),this.decode(n,n.uint32())},i.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.dims!=null&&n.hasOwnProperty("dims")){if(!Array.isArray(n.dims))return"dims: array expected";for(var s=0;s<n.dims.length;++s)if(!l.isInteger(n.dims[s])&&!(n.dims[s]&&l.isInteger(n.dims[s].low)&&l.isInteger(n.dims[s].high)))return"dims: integer|Long[] expected"}if(n.dataType!=null&&n.hasOwnProperty("dataType")&&!l.isInteger(n.dataType))return"dataType: integer expected";if(n.segment!=null&&n.hasOwnProperty("segment")){var p=c.onnx.TensorProto.Segment.verify(n.segment);if(p)return"segment."+p}if(n.floatData!=null&&n.hasOwnProperty("floatData")){if(!Array.isArray(n.floatData))return"floatData: array expected";for(var s=0;s<n.floatData.length;++s)if(typeof n.floatData[s]!="number")return"floatData: number[] expected"}if(n.int32Data!=null&&n.hasOwnProperty("int32Data")){if(!Array.isArray(n.int32Data))return"int32Data: array expected";for(var s=0;s<n.int32Data.length;++s)if(!l.isInteger(n.int32Data[s]))return"int32Data: integer[] expected"}if(n.stringData!=null&&n.hasOwnProperty("stringData")){if(!Array.isArray(n.stringData))return"stringData: array expected";for(var s=0;s<n.stringData.length;++s)if(!(n.stringData[s]&&typeof n.stringData[s].length=="number"||l.isString(n.stringData[s])))return"stringData: buffer[] expected"}if(n.int64Data!=null&&n.hasOwnProperty("int64Data")){if(!Array.isArray(n.int64Data))return"int64Data: array expected";for(var s=0;s<n.int64Data.length;++s)if(!l.isInteger(n.int64Data[s])&&!(n.int64Data[s]&&l.isInteger(n.int64Data[s].low)&&l.isInteger(n.int64Data[s].high)))return"int64Data: integer|Long[] expected"}if(n.name!=null&&n.hasOwnProperty("name")&&!l.isString(n.name))return"name: string expected";if(n.docString!=null&&n.hasOwnProperty("docString")&&!l.isString(n.docString))return"docString: string expected";if(n.rawData!=null&&n.hasOwnProperty("rawData")&&!(n.rawData&&typeof n.rawData.length=="number"||l.isString(n.rawData)))return"rawData: buffer expected";if(n.externalData!=null&&n.hasOwnProperty("externalData")){if(!Array.isArray(n.externalData))return"externalData: array expected";for(var s=0;s<n.externalData.length;++s){var p=c.onnx.StringStringEntryProto.verify(n.externalData[s]);if(p)return"externalData."+p}}if(n.dataLocation!=null&&n.hasOwnProperty("dataLocation"))switch(n.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(n.doubleData!=null&&n.hasOwnProperty("doubleData")){if(!Array.isArray(n.doubleData))return"doubleData: array expected";for(var s=0;s<n.doubleData.length;++s)if(typeof n.doubleData[s]!="number")return"doubleData: number[] expected"}if(n.uint64Data!=null&&n.hasOwnProperty("uint64Data")){if(!Array.isArray(n.uint64Data))return"uint64Data: array expected";for(var s=0;s<n.uint64Data.length;++s)if(!l.isInteger(n.uint64Data[s])&&!(n.uint64Data[s]&&l.isInteger(n.uint64Data[s].low)&&l.isInteger(n.uint64Data[s].high)))return"uint64Data: integer|Long[] expected"}return null},i.fromObject=function(n){if(n instanceof c.onnx.TensorProto)return n;var s=new c.onnx.TensorProto;if(n.dims){if(!Array.isArray(n.dims))throw TypeError(".onnx.TensorProto.dims: array expected");s.dims=[];for(var p=0;p<n.dims.length;++p)l.Long?(s.dims[p]=l.Long.fromValue(n.dims[p])).unsigned=!1:typeof n.dims[p]=="string"?s.dims[p]=parseInt(n.dims[p],10):typeof n.dims[p]=="number"?s.dims[p]=n.dims[p]:typeof n.dims[p]=="object"&&(s.dims[p]=new l.LongBits(n.dims[p].low>>>0,n.dims[p].high>>>0).toNumber())}if(n.dataType!=null&&(s.dataType=n.dataType|0),n.segment!=null){if(typeof n.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");s.segment=c.onnx.TensorProto.Segment.fromObject(n.segment)}if(n.floatData){if(!Array.isArray(n.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");s.floatData=[];for(var p=0;p<n.floatData.length;++p)s.floatData[p]=Number(n.floatData[p])}if(n.int32Data){if(!Array.isArray(n.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");s.int32Data=[];for(var p=0;p<n.int32Data.length;++p)s.int32Data[p]=n.int32Data[p]|0}if(n.stringData){if(!Array.isArray(n.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");s.stringData=[];for(var p=0;p<n.stringData.length;++p)typeof n.stringData[p]=="string"?l.base64.decode(n.stringData[p],s.stringData[p]=l.newBuffer(l.base64.length(n.stringData[p])),0):n.stringData[p].length>=0&&(s.stringData[p]=n.stringData[p])}if(n.int64Data){if(!Array.isArray(n.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");s.int64Data=[];for(var p=0;p<n.int64Data.length;++p)l.Long?(s.int64Data[p]=l.Long.fromValue(n.int64Data[p])).unsigned=!1:typeof n.int64Data[p]=="string"?s.int64Data[p]=parseInt(n.int64Data[p],10):typeof n.int64Data[p]=="number"?s.int64Data[p]=n.int64Data[p]:typeof n.int64Data[p]=="object"&&(s.int64Data[p]=new l.LongBits(n.int64Data[p].low>>>0,n.int64Data[p].high>>>0).toNumber())}if(n.name!=null&&(s.name=String(n.name)),n.docString!=null&&(s.docString=String(n.docString)),n.rawData!=null&&(typeof n.rawData=="string"?l.base64.decode(n.rawData,s.rawData=l.newBuffer(l.base64.length(n.rawData)),0):n.rawData.length>=0&&(s.rawData=n.rawData)),n.externalData){if(!Array.isArray(n.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");s.externalData=[];for(var p=0;p<n.externalData.length;++p){if(typeof n.externalData[p]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");s.externalData[p]=c.onnx.StringStringEntryProto.fromObject(n.externalData[p])}}switch(n.dataLocation){default:if(typeof n.dataLocation=="number"){s.dataLocation=n.dataLocation;break}break;case"DEFAULT":case 0:s.dataLocation=0;break;case"EXTERNAL":case 1:s.dataLocation=1;break}if(n.doubleData){if(!Array.isArray(n.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");s.doubleData=[];for(var p=0;p<n.doubleData.length;++p)s.doubleData[p]=Number(n.doubleData[p])}if(n.uint64Data){if(!Array.isArray(n.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");s.uint64Data=[];for(var p=0;p<n.uint64Data.length;++p)l.Long?(s.uint64Data[p]=l.Long.fromValue(n.uint64Data[p])).unsigned=!0:typeof n.uint64Data[p]=="string"?s.uint64Data[p]=parseInt(n.uint64Data[p],10):typeof n.uint64Data[p]=="number"?s.uint64Data[p]=n.uint64Data[p]:typeof n.uint64Data[p]=="object"&&(s.uint64Data[p]=new l.LongBits(n.uint64Data[p].low>>>0,n.uint64Data[p].high>>>0).toNumber(!0))}return s},i.toObject=function(n,s){s||(s={});var p={};if((s.arrays||s.defaults)&&(p.dims=[],p.floatData=[],p.int32Data=[],p.stringData=[],p.int64Data=[],p.doubleData=[],p.uint64Data=[],p.externalData=[]),s.defaults&&(p.dataType=0,p.segment=null,p.name="",s.bytes===String?p.rawData="":(p.rawData=[],s.bytes!==Array&&(p.rawData=l.newBuffer(p.rawData))),p.docString="",p.dataLocation=s.enums===String?"DEFAULT":0),n.dims&&n.dims.length){p.dims=[];for(var f=0;f<n.dims.length;++f)typeof n.dims[f]=="number"?p.dims[f]=s.longs===String?String(n.dims[f]):n.dims[f]:p.dims[f]=s.longs===String?l.Long.prototype.toString.call(n.dims[f]):s.longs===Number?new l.LongBits(n.dims[f].low>>>0,n.dims[f].high>>>0).toNumber():n.dims[f]}if(n.dataType!=null&&n.hasOwnProperty("dataType")&&(p.dataType=n.dataType),n.segment!=null&&n.hasOwnProperty("segment")&&(p.segment=c.onnx.TensorProto.Segment.toObject(n.segment,s)),n.floatData&&n.floatData.length){p.floatData=[];for(var f=0;f<n.floatData.length;++f)p.floatData[f]=s.json&&!isFinite(n.floatData[f])?String(n.floatData[f]):n.floatData[f]}if(n.int32Data&&n.int32Data.length){p.int32Data=[];for(var f=0;f<n.int32Data.length;++f)p.int32Data[f]=n.int32Data[f]}if(n.stringData&&n.stringData.length){p.stringData=[];for(var f=0;f<n.stringData.length;++f)p.stringData[f]=s.bytes===String?l.base64.encode(n.stringData[f],0,n.stringData[f].length):s.bytes===Array?Array.prototype.slice.call(n.stringData[f]):n.stringData[f]}if(n.int64Data&&n.int64Data.length){p.int64Data=[];for(var f=0;f<n.int64Data.length;++f)typeof n.int64Data[f]=="number"?p.int64Data[f]=s.longs===String?String(n.int64Data[f]):n.int64Data[f]:p.int64Data[f]=s.longs===String?l.Long.prototype.toString.call(n.int64Data[f]):s.longs===Number?new l.LongBits(n.int64Data[f].low>>>0,n.int64Data[f].high>>>0).toNumber():n.int64Data[f]}if(n.name!=null&&n.hasOwnProperty("name")&&(p.name=n.name),n.rawData!=null&&n.hasOwnProperty("rawData")&&(p.rawData=s.bytes===String?l.base64.encode(n.rawData,0,n.rawData.length):s.bytes===Array?Array.prototype.slice.call(n.rawData):n.rawData),n.doubleData&&n.doubleData.length){p.doubleData=[];for(var f=0;f<n.doubleData.length;++f)p.doubleData[f]=s.json&&!isFinite(n.doubleData[f])?String(n.doubleData[f]):n.doubleData[f]}if(n.uint64Data&&n.uint64Data.length){p.uint64Data=[];for(var f=0;f<n.uint64Data.length;++f)typeof n.uint64Data[f]=="number"?p.uint64Data[f]=s.longs===String?String(n.uint64Data[f]):n.uint64Data[f]:p.uint64Data[f]=s.longs===String?l.Long.prototype.toString.call(n.uint64Data[f]):s.longs===Number?new l.LongBits(n.uint64Data[f].low>>>0,n.uint64Data[f].high>>>0).toNumber(!0):n.uint64Data[f]}if(n.docString!=null&&n.hasOwnProperty("docString")&&(p.docString=n.docString),n.externalData&&n.externalData.length){p.externalData=[];for(var f=0;f<n.externalData.length;++f)p.externalData[f]=c.onnx.StringStringEntryProto.toObject(n.externalData[f],s)}return n.dataLocation!=null&&n.hasOwnProperty("dataLocation")&&(p.dataLocation=s.enums===String?c.onnx.TensorProto.DataLocation[n.dataLocation]===void 0?n.dataLocation:c.onnx.TensorProto.DataLocation[n.dataLocation]:n.dataLocation),p},i.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},i.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.TensorProto"},i.DataType=(function(){var a={},n=Object.create(a);return n[a[0]="UNDEFINED"]=0,n[a[1]="FLOAT"]=1,n[a[2]="UINT8"]=2,n[a[3]="INT8"]=3,n[a[4]="UINT16"]=4,n[a[5]="INT16"]=5,n[a[6]="INT32"]=6,n[a[7]="INT64"]=7,n[a[8]="STRING"]=8,n[a[9]="BOOL"]=9,n[a[10]="FLOAT16"]=10,n[a[11]="DOUBLE"]=11,n[a[12]="UINT32"]=12,n[a[13]="UINT64"]=13,n[a[14]="COMPLEX64"]=14,n[a[15]="COMPLEX128"]=15,n[a[16]="BFLOAT16"]=16,n[a[17]="FLOAT8E4M3FN"]=17,n[a[18]="FLOAT8E4M3FNUZ"]=18,n[a[19]="FLOAT8E5M2"]=19,n[a[20]="FLOAT8E5M2FNUZ"]=20,n})(),i.Segment=(function(){function a(n){if(n)for(var s=Object.keys(n),p=0;p<s.length;++p)n[s[p]]!=null&&(this[s[p]]=n[s[p]])}return a.prototype.begin=l.Long?l.Long.fromBits(0,0,!1):0,a.prototype.end=l.Long?l.Long.fromBits(0,0,!1):0,a.create=function(s){return new a(s)},a.encode=function(s,p){return p||(p=u.create()),s.begin!=null&&Object.hasOwnProperty.call(s,"begin")&&p.uint32(8).int64(s.begin),s.end!=null&&Object.hasOwnProperty.call(s,"end")&&p.uint32(16).int64(s.end),p},a.encodeDelimited=function(s,p){return this.encode(s,p).ldelim()},a.decode=function(s,p){s instanceof o||(s=o.create(s));for(var f=p===void 0?s.len:s.pos+p,h=new c.onnx.TensorProto.Segment;s.pos<f;){var m=s.uint32();switch(m>>>3){case 1:{h.begin=s.int64();break}case 2:{h.end=s.int64();break}default:s.skipType(m&7);break}}return h},a.decodeDelimited=function(s){return s instanceof o||(s=new o(s)),this.decode(s,s.uint32())},a.verify=function(s){return typeof s!="object"||s===null?"object expected":s.begin!=null&&s.hasOwnProperty("begin")&&!l.isInteger(s.begin)&&!(s.begin&&l.isInteger(s.begin.low)&&l.isInteger(s.begin.high))?"begin: integer|Long expected":s.end!=null&&s.hasOwnProperty("end")&&!l.isInteger(s.end)&&!(s.end&&l.isInteger(s.end.low)&&l.isInteger(s.end.high))?"end: integer|Long expected":null},a.fromObject=function(s){if(s instanceof c.onnx.TensorProto.Segment)return s;var p=new c.onnx.TensorProto.Segment;return s.begin!=null&&(l.Long?(p.begin=l.Long.fromValue(s.begin)).unsigned=!1:typeof s.begin=="string"?p.begin=parseInt(s.begin,10):typeof s.begin=="number"?p.begin=s.begin:typeof s.begin=="object"&&(p.begin=new l.LongBits(s.begin.low>>>0,s.begin.high>>>0).toNumber())),s.end!=null&&(l.Long?(p.end=l.Long.fromValue(s.end)).unsigned=!1:typeof s.end=="string"?p.end=parseInt(s.end,10):typeof s.end=="number"?p.end=s.end:typeof s.end=="object"&&(p.end=new l.LongBits(s.end.low>>>0,s.end.high>>>0).toNumber())),p},a.toObject=function(s,p){p||(p={});var f={};if(p.defaults){if(l.Long){var h=new l.Long(0,0,!1);f.begin=p.longs===String?h.toString():p.longs===Number?h.toNumber():h}else f.begin=p.longs===String?"0":0;if(l.Long){var h=new l.Long(0,0,!1);f.end=p.longs===String?h.toString():p.longs===Number?h.toNumber():h}else f.end=p.longs===String?"0":0}return s.begin!=null&&s.hasOwnProperty("begin")&&(typeof s.begin=="number"?f.begin=p.longs===String?String(s.begin):s.begin:f.begin=p.longs===String?l.Long.prototype.toString.call(s.begin):p.longs===Number?new l.LongBits(s.begin.low>>>0,s.begin.high>>>0).toNumber():s.begin),s.end!=null&&s.hasOwnProperty("end")&&(typeof s.end=="number"?f.end=p.longs===String?String(s.end):s.end:f.end=p.longs===String?l.Long.prototype.toString.call(s.end):p.longs===Number?new l.LongBits(s.end.low>>>0,s.end.high>>>0).toNumber():s.end),f},a.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},a.getTypeUrl=function(s){return s===void 0&&(s="type.googleapis.com"),s+"/onnx.TensorProto.Segment"},a})(),i.DataLocation=(function(){var a={},n=Object.create(a);return n[a[0]="DEFAULT"]=0,n[a[1]="EXTERNAL"]=1,n})(),i})(),d.SparseTensorProto=(function(){function i(a){if(this.dims=[],a)for(var n=Object.keys(a),s=0;s<n.length;++s)a[n[s]]!=null&&(this[n[s]]=a[n[s]])}return i.prototype.values=null,i.prototype.indices=null,i.prototype.dims=l.emptyArray,i.create=function(n){return new i(n)},i.encode=function(n,s){if(s||(s=u.create()),n.values!=null&&Object.hasOwnProperty.call(n,"values")&&c.onnx.TensorProto.encode(n.values,s.uint32(10).fork()).ldelim(),n.indices!=null&&Object.hasOwnProperty.call(n,"indices")&&c.onnx.TensorProto.encode(n.indices,s.uint32(18).fork()).ldelim(),n.dims!=null&&n.dims.length){s.uint32(26).fork();for(var p=0;p<n.dims.length;++p)s.int64(n.dims[p]);s.ldelim()}return s},i.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},i.decode=function(n,s){n instanceof o||(n=o.create(n));for(var p=s===void 0?n.len:n.pos+s,f=new c.onnx.SparseTensorProto;n.pos<p;){var h=n.uint32();switch(h>>>3){case 1:{f.values=c.onnx.TensorProto.decode(n,n.uint32());break}case 2:{f.indices=c.onnx.TensorProto.decode(n,n.uint32());break}case 3:{if(f.dims&&f.dims.length||(f.dims=[]),(h&7)===2)for(var m=n.uint32()+n.pos;n.pos<m;)f.dims.push(n.int64());else f.dims.push(n.int64());break}default:n.skipType(h&7);break}}return f},i.decodeDelimited=function(n){return n instanceof o||(n=new o(n)),this.decode(n,n.uint32())},i.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.values!=null&&n.hasOwnProperty("values")){var s=c.onnx.TensorProto.verify(n.values);if(s)return"values."+s}if(n.indices!=null&&n.hasOwnProperty("indices")){var s=c.onnx.TensorProto.verify(n.indices);if(s)return"indices."+s}if(n.dims!=null&&n.hasOwnProperty("dims")){if(!Array.isArray(n.dims))return"dims: array expected";for(var p=0;p<n.dims.length;++p)if(!l.isInteger(n.dims[p])&&!(n.dims[p]&&l.isInteger(n.dims[p].low)&&l.isInteger(n.dims[p].high)))return"dims: integer|Long[] expected"}return null},i.fromObject=function(n){if(n instanceof c.onnx.SparseTensorProto)return n;var s=new c.onnx.SparseTensorProto;if(n.values!=null){if(typeof n.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");s.values=c.onnx.TensorProto.fromObject(n.values)}if(n.indices!=null){if(typeof n.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");s.indices=c.onnx.TensorProto.fromObject(n.indices)}if(n.dims){if(!Array.isArray(n.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");s.dims=[];for(var p=0;p<n.dims.length;++p)l.Long?(s.dims[p]=l.Long.fromValue(n.dims[p])).unsigned=!1:typeof n.dims[p]=="string"?s.dims[p]=parseInt(n.dims[p],10):typeof n.dims[p]=="number"?s.dims[p]=n.dims[p]:typeof n.dims[p]=="object"&&(s.dims[p]=new l.LongBits(n.dims[p].low>>>0,n.dims[p].high>>>0).toNumber())}return s},i.toObject=function(n,s){s||(s={});var p={};if((s.arrays||s.defaults)&&(p.dims=[]),s.defaults&&(p.values=null,p.indices=null),n.values!=null&&n.hasOwnProperty("values")&&(p.values=c.onnx.TensorProto.toObject(n.values,s)),n.indices!=null&&n.hasOwnProperty("indices")&&(p.indices=c.onnx.TensorProto.toObject(n.indices,s)),n.dims&&n.dims.length){p.dims=[];for(var f=0;f<n.dims.length;++f)typeof n.dims[f]=="number"?p.dims[f]=s.longs===String?String(n.dims[f]):n.dims[f]:p.dims[f]=s.longs===String?l.Long.prototype.toString.call(n.dims[f]):s.longs===Number?new l.LongBits(n.dims[f].low>>>0,n.dims[f].high>>>0).toNumber():n.dims[f]}return p},i.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},i.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.SparseTensorProto"},i})(),d.TensorShapeProto=(function(){function i(a){if(this.dim=[],a)for(var n=Object.keys(a),s=0;s<n.length;++s)a[n[s]]!=null&&(this[n[s]]=a[n[s]])}return i.prototype.dim=l.emptyArray,i.create=function(n){return new i(n)},i.encode=function(n,s){if(s||(s=u.create()),n.dim!=null&&n.dim.length)for(var p=0;p<n.dim.length;++p)c.onnx.TensorShapeProto.Dimension.encode(n.dim[p],s.uint32(10).fork()).ldelim();return s},i.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},i.decode=function(n,s){n instanceof o||(n=o.create(n));for(var p=s===void 0?n.len:n.pos+s,f=new c.onnx.TensorShapeProto;n.pos<p;){var h=n.uint32();switch(h>>>3){case 1:{f.dim&&f.dim.length||(f.dim=[]),f.dim.push(c.onnx.TensorShapeProto.Dimension.decode(n,n.uint32()));break}default:n.skipType(h&7);break}}return f},i.decodeDelimited=function(n){return n instanceof o||(n=new o(n)),this.decode(n,n.uint32())},i.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.dim!=null&&n.hasOwnProperty("dim")){if(!Array.isArray(n.dim))return"dim: array expected";for(var s=0;s<n.dim.length;++s){var p=c.onnx.TensorShapeProto.Dimension.verify(n.dim[s]);if(p)return"dim."+p}}return null},i.fromObject=function(n){if(n instanceof c.onnx.TensorShapeProto)return n;var s=new c.onnx.TensorShapeProto;if(n.dim){if(!Array.isArray(n.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");s.dim=[];for(var p=0;p<n.dim.length;++p){if(typeof n.dim[p]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");s.dim[p]=c.onnx.TensorShapeProto.Dimension.fromObject(n.dim[p])}}return s},i.toObject=function(n,s){s||(s={});var p={};if((s.arrays||s.defaults)&&(p.dim=[]),n.dim&&n.dim.length){p.dim=[];for(var f=0;f<n.dim.length;++f)p.dim[f]=c.onnx.TensorShapeProto.Dimension.toObject(n.dim[f],s)}return p},i.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},i.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.TensorShapeProto"},i.Dimension=(function(){function a(s){if(s)for(var p=Object.keys(s),f=0;f<p.length;++f)s[p[f]]!=null&&(this[p[f]]=s[p[f]])}a.prototype.dimValue=null,a.prototype.dimParam=null,a.prototype.denotation="";var n;return Object.defineProperty(a.prototype,"value",{get:l.oneOfGetter(n=["dimValue","dimParam"]),set:l.oneOfSetter(n)}),a.create=function(p){return new a(p)},a.encode=function(p,f){return f||(f=u.create()),p.dimValue!=null&&Object.hasOwnProperty.call(p,"dimValue")&&f.uint32(8).int64(p.dimValue),p.dimParam!=null&&Object.hasOwnProperty.call(p,"dimParam")&&f.uint32(18).string(p.dimParam),p.denotation!=null&&Object.hasOwnProperty.call(p,"denotation")&&f.uint32(26).string(p.denotation),f},a.encodeDelimited=function(p,f){return this.encode(p,f).ldelim()},a.decode=function(p,f){p instanceof o||(p=o.create(p));for(var h=f===void 0?p.len:p.pos+f,m=new c.onnx.TensorShapeProto.Dimension;p.pos<h;){var _=p.uint32();switch(_>>>3){case 1:{m.dimValue=p.int64();break}case 2:{m.dimParam=p.string();break}case 3:{m.denotation=p.string();break}default:p.skipType(_&7);break}}return m},a.decodeDelimited=function(p){return p instanceof o||(p=new o(p)),this.decode(p,p.uint32())},a.verify=function(p){if(typeof p!="object"||p===null)return"object expected";var f={};if(p.dimValue!=null&&p.hasOwnProperty("dimValue")&&(f.value=1,!l.isInteger(p.dimValue)&&!(p.dimValue&&l.isInteger(p.dimValue.low)&&l.isInteger(p.dimValue.high))))return"dimValue: integer|Long expected";if(p.dimParam!=null&&p.hasOwnProperty("dimParam")){if(f.value===1)return"value: multiple values";if(f.value=1,!l.isString(p.dimParam))return"dimParam: string expected"}return p.denotation!=null&&p.hasOwnProperty("denotation")&&!l.isString(p.denotation)?"denotation: string expected":null},a.fromObject=function(p){if(p instanceof c.onnx.TensorShapeProto.Dimension)return p;var f=new c.onnx.TensorShapeProto.Dimension;return p.dimValue!=null&&(l.Long?(f.dimValue=l.Long.fromValue(p.dimValue)).unsigned=!1:typeof p.dimValue=="string"?f.dimValue=parseInt(p.dimValue,10):typeof p.dimValue=="number"?f.dimValue=p.dimValue:typeof p.dimValue=="object"&&(f.dimValue=new l.LongBits(p.dimValue.low>>>0,p.dimValue.high>>>0).toNumber())),p.dimParam!=null&&(f.dimParam=String(p.dimParam)),p.denotation!=null&&(f.denotation=String(p.denotation)),f},a.toObject=function(p,f){f||(f={});var h={};return f.defaults&&(h.denotation=""),p.dimValue!=null&&p.hasOwnProperty("dimValue")&&(typeof p.dimValue=="number"?h.dimValue=f.longs===String?String(p.dimValue):p.dimValue:h.dimValue=f.longs===String?l.Long.prototype.toString.call(p.dimValue):f.longs===Number?new l.LongBits(p.dimValue.low>>>0,p.dimValue.high>>>0).toNumber():p.dimValue,f.oneofs&&(h.value="dimValue")),p.dimParam!=null&&p.hasOwnProperty("dimParam")&&(h.dimParam=p.dimParam,f.oneofs&&(h.value="dimParam")),p.denotation!=null&&p.hasOwnProperty("denotation")&&(h.denotation=p.denotation),h},a.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},a.getTypeUrl=function(p){return p===void 0&&(p="type.googleapis.com"),p+"/onnx.TensorShapeProto.Dimension"},a})(),i})(),d.TypeProto=(function(){function i(n){if(n)for(var s=Object.keys(n),p=0;p<s.length;++p)n[s[p]]!=null&&(this[s[p]]=n[s[p]])}i.prototype.tensorType=null,i.prototype.sequenceType=null,i.prototype.mapType=null,i.prototype.optionalType=null,i.prototype.sparseTensorType=null,i.prototype.denotation="";var a;return Object.defineProperty(i.prototype,"value",{get:l.oneOfGetter(a=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:l.oneOfSetter(a)}),i.create=function(s){return new i(s)},i.encode=function(s,p){return p||(p=u.create()),s.tensorType!=null&&Object.hasOwnProperty.call(s,"tensorType")&&c.onnx.TypeProto.Tensor.encode(s.tensorType,p.uint32(10).fork()).ldelim(),s.sequenceType!=null&&Object.hasOwnProperty.call(s,"sequenceType")&&c.onnx.TypeProto.Sequence.encode(s.sequenceType,p.uint32(34).fork()).ldelim(),s.mapType!=null&&Object.hasOwnProperty.call(s,"mapType")&&c.onnx.TypeProto.Map.encode(s.mapType,p.uint32(42).fork()).ldelim(),s.denotation!=null&&Object.hasOwnProperty.call(s,"denotation")&&p.uint32(50).string(s.denotation),s.sparseTensorType!=null&&Object.hasOwnProperty.call(s,"sparseTensorType")&&c.onnx.TypeProto.SparseTensor.encode(s.sparseTensorType,p.uint32(66).fork()).ldelim(),s.optionalType!=null&&Object.hasOwnProperty.call(s,"optionalType")&&c.onnx.TypeProto.Optional.encode(s.optionalType,p.uint32(74).fork()).ldelim(),p},i.encodeDelimited=function(s,p){return this.encode(s,p).ldelim()},i.decode=function(s,p){s instanceof o||(s=o.create(s));for(var f=p===void 0?s.len:s.pos+p,h=new c.onnx.TypeProto;s.pos<f;){var m=s.uint32();switch(m>>>3){case 1:{h.tensorType=c.onnx.TypeProto.Tensor.decode(s,s.uint32());break}case 4:{h.sequenceType=c.onnx.TypeProto.Sequence.decode(s,s.uint32());break}case 5:{h.mapType=c.onnx.TypeProto.Map.decode(s,s.uint32());break}case 9:{h.optionalType=c.onnx.TypeProto.Optional.decode(s,s.uint32());break}case 8:{h.sparseTensorType=c.onnx.TypeProto.SparseTensor.decode(s,s.uint32());break}case 6:{h.denotation=s.string();break}default:s.skipType(m&7);break}}return h},i.decodeDelimited=function(s){return s instanceof o||(s=new o(s)),this.decode(s,s.uint32())},i.verify=function(s){if(typeof s!="object"||s===null)return"object expected";var p={};if(s.tensorType!=null&&s.hasOwnProperty("tensorType")){p.value=1;{var f=c.onnx.TypeProto.Tensor.verify(s.tensorType);if(f)return"tensorType."+f}}if(s.sequenceType!=null&&s.hasOwnProperty("sequenceType")){if(p.value===1)return"value: multiple values";p.value=1;{var f=c.onnx.TypeProto.Sequence.verify(s.sequenceType);if(f)return"sequenceType."+f}}if(s.mapType!=null&&s.hasOwnProperty("mapType")){if(p.value===1)return"value: multiple values";p.value=1;{var f=c.onnx.TypeProto.Map.verify(s.mapType);if(f)return"mapType."+f}}if(s.optionalType!=null&&s.hasOwnProperty("optionalType")){if(p.value===1)return"value: multiple values";p.value=1;{var f=c.onnx.TypeProto.Optional.verify(s.optionalType);if(f)return"optionalType."+f}}if(s.sparseTensorType!=null&&s.hasOwnProperty("sparseTensorType")){if(p.value===1)return"value: multiple values";p.value=1;{var f=c.onnx.TypeProto.SparseTensor.verify(s.sparseTensorType);if(f)return"sparseTensorType."+f}}return s.denotation!=null&&s.hasOwnProperty("denotation")&&!l.isString(s.denotation)?"denotation: string expected":null},i.fromObject=function(s){if(s instanceof c.onnx.TypeProto)return s;var p=new c.onnx.TypeProto;if(s.tensorType!=null){if(typeof s.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");p.tensorType=c.onnx.TypeProto.Tensor.fromObject(s.tensorType)}if(s.sequenceType!=null){if(typeof s.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");p.sequenceType=c.onnx.TypeProto.Sequence.fromObject(s.sequenceType)}if(s.mapType!=null){if(typeof s.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");p.mapType=c.onnx.TypeProto.Map.fromObject(s.mapType)}if(s.optionalType!=null){if(typeof s.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");p.optionalType=c.onnx.TypeProto.Optional.fromObject(s.optionalType)}if(s.sparseTensorType!=null){if(typeof s.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");p.sparseTensorType=c.onnx.TypeProto.SparseTensor.fromObject(s.sparseTensorType)}return s.denotation!=null&&(p.denotation=String(s.denotation)),p},i.toObject=function(s,p){p||(p={});var f={};return p.defaults&&(f.denotation=""),s.tensorType!=null&&s.hasOwnProperty("tensorType")&&(f.tensorType=c.onnx.TypeProto.Tensor.toObject(s.tensorType,p),p.oneofs&&(f.value="tensorType")),s.sequenceType!=null&&s.hasOwnProperty("sequenceType")&&(f.sequenceType=c.onnx.TypeProto.Sequence.toObject(s.sequenceType,p),p.oneofs&&(f.value="sequenceType")),s.mapType!=null&&s.hasOwnProperty("mapType")&&(f.mapType=c.onnx.TypeProto.Map.toObject(s.mapType,p),p.oneofs&&(f.value="mapType")),s.denotation!=null&&s.hasOwnProperty("denotation")&&(f.denotation=s.denotation),s.sparseTensorType!=null&&s.hasOwnProperty("sparseTensorType")&&(f.sparseTensorType=c.onnx.TypeProto.SparseTensor.toObject(s.sparseTensorType,p),p.oneofs&&(f.value="sparseTensorType")),s.optionalType!=null&&s.hasOwnProperty("optionalType")&&(f.optionalType=c.onnx.TypeProto.Optional.toObject(s.optionalType,p),p.oneofs&&(f.value="optionalType")),f},i.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},i.getTypeUrl=function(s){return s===void 0&&(s="type.googleapis.com"),s+"/onnx.TypeProto"},i.Tensor=(function(){function n(s){if(s)for(var p=Object.keys(s),f=0;f<p.length;++f)s[p[f]]!=null&&(this[p[f]]=s[p[f]])}return n.prototype.elemType=0,n.prototype.shape=null,n.create=function(p){return new n(p)},n.encode=function(p,f){return f||(f=u.create()),p.elemType!=null&&Object.hasOwnProperty.call(p,"elemType")&&f.uint32(8).int32(p.elemType),p.shape!=null&&Object.hasOwnProperty.call(p,"shape")&&c.onnx.TensorShapeProto.encode(p.shape,f.uint32(18).fork()).ldelim(),f},n.encodeDelimited=function(p,f){return this.encode(p,f).ldelim()},n.decode=function(p,f){p instanceof o||(p=o.create(p));for(var h=f===void 0?p.len:p.pos+f,m=new c.onnx.TypeProto.Tensor;p.pos<h;){var _=p.uint32();switch(_>>>3){case 1:{m.elemType=p.int32();break}case 2:{m.shape=c.onnx.TensorShapeProto.decode(p,p.uint32());break}default:p.skipType(_&7);break}}return m},n.decodeDelimited=function(p){return p instanceof o||(p=new o(p)),this.decode(p,p.uint32())},n.verify=function(p){if(typeof p!="object"||p===null)return"object expected";if(p.elemType!=null&&p.hasOwnProperty("elemType")&&!l.isInteger(p.elemType))return"elemType: integer expected";if(p.shape!=null&&p.hasOwnProperty("shape")){var f=c.onnx.TensorShapeProto.verify(p.shape);if(f)return"shape."+f}return null},n.fromObject=function(p){if(p instanceof c.onnx.TypeProto.Tensor)return p;var f=new c.onnx.TypeProto.Tensor;if(p.elemType!=null&&(f.elemType=p.elemType|0),p.shape!=null){if(typeof p.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");f.shape=c.onnx.TensorShapeProto.fromObject(p.shape)}return f},n.toObject=function(p,f){f||(f={});var h={};return f.defaults&&(h.elemType=0,h.shape=null),p.elemType!=null&&p.hasOwnProperty("elemType")&&(h.elemType=p.elemType),p.shape!=null&&p.hasOwnProperty("shape")&&(h.shape=c.onnx.TensorShapeProto.toObject(p.shape,f)),h},n.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},n.getTypeUrl=function(p){return p===void 0&&(p="type.googleapis.com"),p+"/onnx.TypeProto.Tensor"},n})(),i.Sequence=(function(){function n(s){if(s)for(var p=Object.keys(s),f=0;f<p.length;++f)s[p[f]]!=null&&(this[p[f]]=s[p[f]])}return n.prototype.elemType=null,n.create=function(p){return new n(p)},n.encode=function(p,f){return f||(f=u.create()),p.elemType!=null&&Object.hasOwnProperty.call(p,"elemType")&&c.onnx.TypeProto.encode(p.elemType,f.uint32(10).fork()).ldelim(),f},n.encodeDelimited=function(p,f){return this.encode(p,f).ldelim()},n.decode=function(p,f){p instanceof o||(p=o.create(p));for(var h=f===void 0?p.len:p.pos+f,m=new c.onnx.TypeProto.Sequence;p.pos<h;){var _=p.uint32();switch(_>>>3){case 1:{m.elemType=c.onnx.TypeProto.decode(p,p.uint32());break}default:p.skipType(_&7);break}}return m},n.decodeDelimited=function(p){return p instanceof o||(p=new o(p)),this.decode(p,p.uint32())},n.verify=function(p){if(typeof p!="object"||p===null)return"object expected";if(p.elemType!=null&&p.hasOwnProperty("elemType")){var f=c.onnx.TypeProto.verify(p.elemType);if(f)return"elemType."+f}return null},n.fromObject=function(p){if(p instanceof c.onnx.TypeProto.Sequence)return p;var f=new c.onnx.TypeProto.Sequence;if(p.elemType!=null){if(typeof p.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");f.elemType=c.onnx.TypeProto.fromObject(p.elemType)}return f},n.toObject=function(p,f){f||(f={});var h={};return f.defaults&&(h.elemType=null),p.elemType!=null&&p.hasOwnProperty("elemType")&&(h.elemType=c.onnx.TypeProto.toObject(p.elemType,f)),h},n.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},n.getTypeUrl=function(p){return p===void 0&&(p="type.googleapis.com"),p+"/onnx.TypeProto.Sequence"},n})(),i.Map=(function(){function n(s){if(s)for(var p=Object.keys(s),f=0;f<p.length;++f)s[p[f]]!=null&&(this[p[f]]=s[p[f]])}return n.prototype.keyType=0,n.prototype.valueType=null,n.create=function(p){return new n(p)},n.encode=function(p,f){return f||(f=u.create()),p.keyType!=null&&Object.hasOwnProperty.call(p,"keyType")&&f.uint32(8).int32(p.keyType),p.valueType!=null&&Object.hasOwnProperty.call(p,"valueType")&&c.onnx.TypeProto.encode(p.valueType,f.uint32(18).fork()).ldelim(),f},n.encodeDelimited=function(p,f){return this.encode(p,f).ldelim()},n.decode=function(p,f){p instanceof o||(p=o.create(p));for(var h=f===void 0?p.len:p.pos+f,m=new c.onnx.TypeProto.Map;p.pos<h;){var _=p.uint32();switch(_>>>3){case 1:{m.keyType=p.int32();break}case 2:{m.valueType=c.onnx.TypeProto.decode(p,p.uint32());break}default:p.skipType(_&7);break}}return m},n.decodeDelimited=function(p){return p instanceof o||(p=new o(p)),this.decode(p,p.uint32())},n.verify=function(p){if(typeof p!="object"||p===null)return"object expected";if(p.keyType!=null&&p.hasOwnProperty("keyType")&&!l.isInteger(p.keyType))return"keyType: integer expected";if(p.valueType!=null&&p.hasOwnProperty("valueType")){var f=c.onnx.TypeProto.verify(p.valueType);if(f)return"valueType."+f}return null},n.fromObject=function(p){if(p instanceof c.onnx.TypeProto.Map)return p;var f=new c.onnx.TypeProto.Map;if(p.keyType!=null&&(f.keyType=p.keyType|0),p.valueType!=null){if(typeof p.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");f.valueType=c.onnx.TypeProto.fromObject(p.valueType)}return f},n.toObject=function(p,f){f||(f={});var h={};return f.defaults&&(h.keyType=0,h.valueType=null),p.keyType!=null&&p.hasOwnProperty("keyType")&&(h.keyType=p.keyType),p.valueType!=null&&p.hasOwnProperty("valueType")&&(h.valueType=c.onnx.TypeProto.toObject(p.valueType,f)),h},n.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},n.getTypeUrl=function(p){return p===void 0&&(p="type.googleapis.com"),p+"/onnx.TypeProto.Map"},n})(),i.Optional=(function(){function n(s){if(s)for(var p=Object.keys(s),f=0;f<p.length;++f)s[p[f]]!=null&&(this[p[f]]=s[p[f]])}return n.prototype.elemType=null,n.create=function(p){return new n(p)},n.encode=function(p,f){return f||(f=u.create()),p.elemType!=null&&Object.hasOwnProperty.call(p,"elemType")&&c.onnx.TypeProto.encode(p.elemType,f.uint32(10).fork()).ldelim(),f},n.encodeDelimited=function(p,f){return this.encode(p,f).ldelim()},n.decode=function(p,f){p instanceof o||(p=o.create(p));for(var h=f===void 0?p.len:p.pos+f,m=new c.onnx.TypeProto.Optional;p.pos<h;){var _=p.uint32();switch(_>>>3){case 1:{m.elemType=c.onnx.TypeProto.decode(p,p.uint32());break}default:p.skipType(_&7);break}}return m},n.decodeDelimited=function(p){return p instanceof o||(p=new o(p)),this.decode(p,p.uint32())},n.verify=function(p){if(typeof p!="object"||p===null)return"object expected";if(p.elemType!=null&&p.hasOwnProperty("elemType")){var f=c.onnx.TypeProto.verify(p.elemType);if(f)return"elemType."+f}return null},n.fromObject=function(p){if(p instanceof c.onnx.TypeProto.Optional)return p;var f=new c.onnx.TypeProto.Optional;if(p.elemType!=null){if(typeof p.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");f.elemType=c.onnx.TypeProto.fromObject(p.elemType)}return f},n.toObject=function(p,f){f||(f={});var h={};return f.defaults&&(h.elemType=null),p.elemType!=null&&p.hasOwnProperty("elemType")&&(h.elemType=c.onnx.TypeProto.toObject(p.elemType,f)),h},n.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},n.getTypeUrl=function(p){return p===void 0&&(p="type.googleapis.com"),p+"/onnx.TypeProto.Optional"},n})(),i.SparseTensor=(function(){function n(s){if(s)for(var p=Object.keys(s),f=0;f<p.length;++f)s[p[f]]!=null&&(this[p[f]]=s[p[f]])}return n.prototype.elemType=0,n.prototype.shape=null,n.create=function(p){return new n(p)},n.encode=function(p,f){return f||(f=u.create()),p.elemType!=null&&Object.hasOwnProperty.call(p,"elemType")&&f.uint32(8).int32(p.elemType),p.shape!=null&&Object.hasOwnProperty.call(p,"shape")&&c.onnx.TensorShapeProto.encode(p.shape,f.uint32(18).fork()).ldelim(),f},n.encodeDelimited=function(p,f){return this.encode(p,f).ldelim()},n.decode=function(p,f){p instanceof o||(p=o.create(p));for(var h=f===void 0?p.len:p.pos+f,m=new c.onnx.TypeProto.SparseTensor;p.pos<h;){var _=p.uint32();switch(_>>>3){case 1:{m.elemType=p.int32();break}case 2:{m.shape=c.onnx.TensorShapeProto.decode(p,p.uint32());break}default:p.skipType(_&7);break}}return m},n.decodeDelimited=function(p){return p instanceof o||(p=new o(p)),this.decode(p,p.uint32())},n.verify=function(p){if(typeof p!="object"||p===null)return"object expected";if(p.elemType!=null&&p.hasOwnProperty("elemType")&&!l.isInteger(p.elemType))return"elemType: integer expected";if(p.shape!=null&&p.hasOwnProperty("shape")){var f=c.onnx.TensorShapeProto.verify(p.shape);if(f)return"shape."+f}return null},n.fromObject=function(p){if(p instanceof c.onnx.TypeProto.SparseTensor)return p;var f=new c.onnx.TypeProto.SparseTensor;if(p.elemType!=null&&(f.elemType=p.elemType|0),p.shape!=null){if(typeof p.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");f.shape=c.onnx.TensorShapeProto.fromObject(p.shape)}return f},n.toObject=function(p,f){f||(f={});var h={};return f.defaults&&(h.elemType=0,h.shape=null),p.elemType!=null&&p.hasOwnProperty("elemType")&&(h.elemType=p.elemType),p.shape!=null&&p.hasOwnProperty("shape")&&(h.shape=c.onnx.TensorShapeProto.toObject(p.shape,f)),h},n.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},n.getTypeUrl=function(p){return p===void 0&&(p="type.googleapis.com"),p+"/onnx.TypeProto.SparseTensor"},n})(),i})(),d.OperatorSetIdProto=(function(){function i(a){if(a)for(var n=Object.keys(a),s=0;s<n.length;++s)a[n[s]]!=null&&(this[n[s]]=a[n[s]])}return i.prototype.domain="",i.prototype.version=l.Long?l.Long.fromBits(0,0,!1):0,i.create=function(n){return new i(n)},i.encode=function(n,s){return s||(s=u.create()),n.domain!=null&&Object.hasOwnProperty.call(n,"domain")&&s.uint32(10).string(n.domain),n.version!=null&&Object.hasOwnProperty.call(n,"version")&&s.uint32(16).int64(n.version),s},i.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},i.decode=function(n,s){n instanceof o||(n=o.create(n));for(var p=s===void 0?n.len:n.pos+s,f=new c.onnx.OperatorSetIdProto;n.pos<p;){var h=n.uint32();switch(h>>>3){case 1:{f.domain=n.string();break}case 2:{f.version=n.int64();break}default:n.skipType(h&7);break}}return f},i.decodeDelimited=function(n){return n instanceof o||(n=new o(n)),this.decode(n,n.uint32())},i.verify=function(n){return typeof n!="object"||n===null?"object expected":n.domain!=null&&n.hasOwnProperty("domain")&&!l.isString(n.domain)?"domain: string expected":n.version!=null&&n.hasOwnProperty("version")&&!l.isInteger(n.version)&&!(n.version&&l.isInteger(n.version.low)&&l.isInteger(n.version.high))?"version: integer|Long expected":null},i.fromObject=function(n){if(n instanceof c.onnx.OperatorSetIdProto)return n;var s=new c.onnx.OperatorSetIdProto;return n.domain!=null&&(s.domain=String(n.domain)),n.version!=null&&(l.Long?(s.version=l.Long.fromValue(n.version)).unsigned=!1:typeof n.version=="string"?s.version=parseInt(n.version,10):typeof n.version=="number"?s.version=n.version:typeof n.version=="object"&&(s.version=new l.LongBits(n.version.low>>>0,n.version.high>>>0).toNumber())),s},i.toObject=function(n,s){s||(s={});var p={};if(s.defaults)if(p.domain="",l.Long){var f=new l.Long(0,0,!1);p.version=s.longs===String?f.toString():s.longs===Number?f.toNumber():f}else p.version=s.longs===String?"0":0;return n.domain!=null&&n.hasOwnProperty("domain")&&(p.domain=n.domain),n.version!=null&&n.hasOwnProperty("version")&&(typeof n.version=="number"?p.version=s.longs===String?String(n.version):n.version:p.version=s.longs===String?l.Long.prototype.toString.call(n.version):s.longs===Number?new l.LongBits(n.version.low>>>0,n.version.high>>>0).toNumber():n.version),p},i.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},i.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.OperatorSetIdProto"},i})(),d.OperatorStatus=(function(){var i={},a=Object.create(i);return a[i[0]="EXPERIMENTAL"]=0,a[i[1]="STABLE"]=1,a})(),d.FunctionProto=(function(){function i(a){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],a)for(var n=Object.keys(a),s=0;s<n.length;++s)a[n[s]]!=null&&(this[n[s]]=a[n[s]])}return i.prototype.name="",i.prototype.input=l.emptyArray,i.prototype.output=l.emptyArray,i.prototype.attribute=l.emptyArray,i.prototype.attributeProto=l.emptyArray,i.prototype.node=l.emptyArray,i.prototype.docString="",i.prototype.opsetImport=l.emptyArray,i.prototype.domain="",i.create=function(n){return new i(n)},i.encode=function(n,s){if(s||(s=u.create()),n.name!=null&&Object.hasOwnProperty.call(n,"name")&&s.uint32(10).string(n.name),n.input!=null&&n.input.length)for(var p=0;p<n.input.length;++p)s.uint32(34).string(n.input[p]);if(n.output!=null&&n.output.length)for(var p=0;p<n.output.length;++p)s.uint32(42).string(n.output[p]);if(n.attribute!=null&&n.attribute.length)for(var p=0;p<n.attribute.length;++p)s.uint32(50).string(n.attribute[p]);if(n.node!=null&&n.node.length)for(var p=0;p<n.node.length;++p)c.onnx.NodeProto.encode(n.node[p],s.uint32(58).fork()).ldelim();if(n.docString!=null&&Object.hasOwnProperty.call(n,"docString")&&s.uint32(66).string(n.docString),n.opsetImport!=null&&n.opsetImport.length)for(var p=0;p<n.opsetImport.length;++p)c.onnx.OperatorSetIdProto.encode(n.opsetImport[p],s.uint32(74).fork()).ldelim();if(n.domain!=null&&Object.hasOwnProperty.call(n,"domain")&&s.uint32(82).string(n.domain),n.attributeProto!=null&&n.attributeProto.length)for(var p=0;p<n.attributeProto.length;++p)c.onnx.AttributeProto.encode(n.attributeProto[p],s.uint32(90).fork()).ldelim();return s},i.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},i.decode=function(n,s){n instanceof o||(n=o.create(n));for(var p=s===void 0?n.len:n.pos+s,f=new c.onnx.FunctionProto;n.pos<p;){var h=n.uint32();switch(h>>>3){case 1:{f.name=n.string();break}case 4:{f.input&&f.input.length||(f.input=[]),f.input.push(n.string());break}case 5:{f.output&&f.output.length||(f.output=[]),f.output.push(n.string());break}case 6:{f.attribute&&f.attribute.length||(f.attribute=[]),f.attribute.push(n.string());break}case 11:{f.attributeProto&&f.attributeProto.length||(f.attributeProto=[]),f.attributeProto.push(c.onnx.AttributeProto.decode(n,n.uint32()));break}case 7:{f.node&&f.node.length||(f.node=[]),f.node.push(c.onnx.NodeProto.decode(n,n.uint32()));break}case 8:{f.docString=n.string();break}case 9:{f.opsetImport&&f.opsetImport.length||(f.opsetImport=[]),f.opsetImport.push(c.onnx.OperatorSetIdProto.decode(n,n.uint32()));break}case 10:{f.domain=n.string();break}default:n.skipType(h&7);break}}return f},i.decodeDelimited=function(n){return n instanceof o||(n=new o(n)),this.decode(n,n.uint32())},i.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.name!=null&&n.hasOwnProperty("name")&&!l.isString(n.name))return"name: string expected";if(n.input!=null&&n.hasOwnProperty("input")){if(!Array.isArray(n.input))return"input: array expected";for(var s=0;s<n.input.length;++s)if(!l.isString(n.input[s]))return"input: string[] expected"}if(n.output!=null&&n.hasOwnProperty("output")){if(!Array.isArray(n.output))return"output: array expected";for(var s=0;s<n.output.length;++s)if(!l.isString(n.output[s]))return"output: string[] expected"}if(n.attribute!=null&&n.hasOwnProperty("attribute")){if(!Array.isArray(n.attribute))return"attribute: array expected";for(var s=0;s<n.attribute.length;++s)if(!l.isString(n.attribute[s]))return"attribute: string[] expected"}if(n.attributeProto!=null&&n.hasOwnProperty("attributeProto")){if(!Array.isArray(n.attributeProto))return"attributeProto: array expected";for(var s=0;s<n.attributeProto.length;++s){var p=c.onnx.AttributeProto.verify(n.attributeProto[s]);if(p)return"attributeProto."+p}}if(n.node!=null&&n.hasOwnProperty("node")){if(!Array.isArray(n.node))return"node: array expected";for(var s=0;s<n.node.length;++s){var p=c.onnx.NodeProto.verify(n.node[s]);if(p)return"node."+p}}if(n.docString!=null&&n.hasOwnProperty("docString")&&!l.isString(n.docString))return"docString: string expected";if(n.opsetImport!=null&&n.hasOwnProperty("opsetImport")){if(!Array.isArray(n.opsetImport))return"opsetImport: array expected";for(var s=0;s<n.opsetImport.length;++s){var p=c.onnx.OperatorSetIdProto.verify(n.opsetImport[s]);if(p)return"opsetImport."+p}}return n.domain!=null&&n.hasOwnProperty("domain")&&!l.isString(n.domain)?"domain: string expected":null},i.fromObject=function(n){if(n instanceof c.onnx.FunctionProto)return n;var s=new c.onnx.FunctionProto;if(n.name!=null&&(s.name=String(n.name)),n.input){if(!Array.isArray(n.input))throw TypeError(".onnx.FunctionProto.input: array expected");s.input=[];for(var p=0;p<n.input.length;++p)s.input[p]=String(n.input[p])}if(n.output){if(!Array.isArray(n.output))throw TypeError(".onnx.FunctionProto.output: array expected");s.output=[];for(var p=0;p<n.output.length;++p)s.output[p]=String(n.output[p])}if(n.attribute){if(!Array.isArray(n.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");s.attribute=[];for(var p=0;p<n.attribute.length;++p)s.attribute[p]=String(n.attribute[p])}if(n.attributeProto){if(!Array.isArray(n.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");s.attributeProto=[];for(var p=0;p<n.attributeProto.length;++p){if(typeof n.attributeProto[p]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");s.attributeProto[p]=c.onnx.AttributeProto.fromObject(n.attributeProto[p])}}if(n.node){if(!Array.isArray(n.node))throw TypeError(".onnx.FunctionProto.node: array expected");s.node=[];for(var p=0;p<n.node.length;++p){if(typeof n.node[p]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");s.node[p]=c.onnx.NodeProto.fromObject(n.node[p])}}if(n.docString!=null&&(s.docString=String(n.docString)),n.opsetImport){if(!Array.isArray(n.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");s.opsetImport=[];for(var p=0;p<n.opsetImport.length;++p){if(typeof n.opsetImport[p]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");s.opsetImport[p]=c.onnx.OperatorSetIdProto.fromObject(n.opsetImport[p])}}return n.domain!=null&&(s.domain=String(n.domain)),s},i.toObject=function(n,s){s||(s={});var p={};if((s.arrays||s.defaults)&&(p.input=[],p.output=[],p.attribute=[],p.node=[],p.opsetImport=[],p.attributeProto=[]),s.defaults&&(p.name="",p.docString="",p.domain=""),n.name!=null&&n.hasOwnProperty("name")&&(p.name=n.name),n.input&&n.input.length){p.input=[];for(var f=0;f<n.input.length;++f)p.input[f]=n.input[f]}if(n.output&&n.output.length){p.output=[];for(var f=0;f<n.output.length;++f)p.output[f]=n.output[f]}if(n.attribute&&n.attribute.length){p.attribute=[];for(var f=0;f<n.attribute.length;++f)p.attribute[f]=n.attribute[f]}if(n.node&&n.node.length){p.node=[];for(var f=0;f<n.node.length;++f)p.node[f]=c.onnx.NodeProto.toObject(n.node[f],s)}if(n.docString!=null&&n.hasOwnProperty("docString")&&(p.docString=n.docString),n.opsetImport&&n.opsetImport.length){p.opsetImport=[];for(var f=0;f<n.opsetImport.length;++f)p.opsetImport[f]=c.onnx.OperatorSetIdProto.toObject(n.opsetImport[f],s)}if(n.domain!=null&&n.hasOwnProperty("domain")&&(p.domain=n.domain),n.attributeProto&&n.attributeProto.length){p.attributeProto=[];for(var f=0;f<n.attributeProto.length;++f)p.attributeProto[f]=c.onnx.AttributeProto.toObject(n.attributeProto[f],s)}return p},i.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},i.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.FunctionProto"},i})(),d})(),t.exports=c}});function assert(e,t){if(!e)throw new Error(typeof t=="string"?t:t())}function decodeUtf8String(e){return new TextDecoder().decode(e)}var import_onnx,ArrayUtil,MatMulUtil,BroadcastUtil,GemmUtil,ProtoUtil,LongUtil,ShapeUtil,SplitUtil,PoolConvUtil,MIN_CLIP,MAX_CLIP,init_util=__esm({"web/lib/onnxjs/util.ts"(){init_long(),import_onnx=__toESM(require_onnx()),init_tensor2(),ArrayUtil=class{static arraysEqual(e,t){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}},MatMulUtil=class{static preprocessInputShapes(e,t){const r=e.length===1?[1,e[0]]:e,o=t.length===1?[t[0],1]:t;return[r,o]}static postprocessOutputShape(e,t,r){t===1&&e.splice(e.length-2,1),r===1&&e.pop()}static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},BroadcastUtil=class me{static calcShape(t,r,o=!1){const u=t.length,l=r.length;if(u===0)return r;if(l===0)return t;const c=Math.max(t.length,r.length),d=new Array(c);if(o){if(u<2||l<2)return;const i=MatMulUtil.calcMatMulShape([t[u-2],t[u-1]],[r[l-2],r[l-1]]);if(i===void 0)return;[d[c-2],d[c-1]]=i}for(let i=o?3:1;i<=c;i++){const a=u-i<0?1:t[u-i],n=l-i<0?1:r[l-i];if(a!==n&&a>1&&n>1)return;d[c-i]=Math.max(a,n)}return d}static index(t,r){const o=new Array(r.length);return me.fillIndex(t,r,o),o}static fillIndex(t,r,o){const u=t.length-r.length;for(let l=0;l<r.length;l++)o[l]=t[u+l]%r[l]}static calc(t,r,o,u,l){const c=me.calcShape(t.dims,r.dims);if(c){if(u&&!ShapeUtil.areEqual(c,t.dims))return;const d=ShapeUtil.size(c),i=u?t:new Tensor4(c,l||t.type);if(c.length===0)i.set([],o(t.get([]),r.get([])));else{const a=new Array(c.length),n=new Array(t.dims.length),s=new Array(r.dims.length);let p=0,f=0,h=!1,m=!1;t.dims.length===0&&(p=t.get([]),h=!0),r.dims.length===0&&(f=r.get([]),m=!0);let _;for(let y=0;y<d;y++){_=y;for(let g=c.length-1;g>=0;g--)a[g]=_%c[g],_=Math.floor(_/c[g]);h||(me.fillIndex(a,t.dims,n),p=t.get(n)),m||(me.fillIndex(a,r.dims,s),f=r.get(s)),i.set(a,o(p,f))}}return i}}static isValidBroadcast(t,r){const o=t.length,u=r.length;if(o>u)return!1;for(let l=1;l<=o;l++)if(t[o-l]!==1&&t[o-l]!==r[u-l])return!1;return!0}static getBroadcastDims(t,r){const o=t.length,u=[];for(let l=0;l<o;l++){const c=o-1-l,d=t[c]||1;(r[r.length-1-l]||1)>1&&d===1&&u.unshift(c)}return u}},GemmUtil=class{static getShapeOfGemmResult(e,t,r,o,u){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let l,c,d;t?(l=e[1],c=e[0]):(l=e[0],c=e[1]);let i=-1;if(o?(d=r[0],i=1):(d=r[1],i=0),r[i]!==c)throw new Error("dimension mismatch");if(l<=0||d<=0||c<=0)throw new Error("invalid shape specified");if(u&&!BroadcastUtil.isValidBroadcast(u,[l,d]))throw new Error("gemm: invalid bias shape for broadcast");return[l,d,c]}},ProtoUtil=class Ce{static tensorDataTypeFromProto(t){switch(t){case import_onnx.onnx.TensorProto.DataType.INT8:return"int8";case import_onnx.onnx.TensorProto.DataType.UINT8:return"uint8";case import_onnx.onnx.TensorProto.DataType.BOOL:return"bool";case import_onnx.onnx.TensorProto.DataType.INT16:return"int16";case import_onnx.onnx.TensorProto.DataType.UINT16:return"uint16";case import_onnx.onnx.TensorProto.DataType.INT32:return"int32";case import_onnx.onnx.TensorProto.DataType.UINT32:return"uint32";case import_onnx.onnx.TensorProto.DataType.FLOAT:return"float32";case import_onnx.onnx.TensorProto.DataType.DOUBLE:return"float64";case import_onnx.onnx.TensorProto.DataType.STRING:return"string";case import_onnx.onnx.TensorProto.DataType.INT64:return"int32";case import_onnx.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${import_onnx.onnx.TensorProto.DataType[t]}`)}}static tensorDataTypeStringToEnum(t){switch(t){case"int8":return import_onnx.onnx.TensorProto.DataType.INT8;case"uint8":return import_onnx.onnx.TensorProto.DataType.UINT8;case"bool":return import_onnx.onnx.TensorProto.DataType.BOOL;case"int16":return import_onnx.onnx.TensorProto.DataType.INT16;case"uint16":return import_onnx.onnx.TensorProto.DataType.UINT16;case"int32":return import_onnx.onnx.TensorProto.DataType.INT32;case"uint32":return import_onnx.onnx.TensorProto.DataType.UINT32;case"float32":return import_onnx.onnx.TensorProto.DataType.FLOAT;case"float64":return import_onnx.onnx.TensorProto.DataType.DOUBLE;case"string":return import_onnx.onnx.TensorProto.DataType.STRING;case"int64":return import_onnx.onnx.TensorProto.DataType.INT64;case"uint64":return import_onnx.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${t}`)}}static tensorDimsFromProto(t){return t.map(r=>long_default.isLong(r)?r.toNumber():r)}static tensorValueTypeFromProto(t){return{tensorType:Ce.tensorDataTypeFromProto(t.elemType),shape:{dims:Ce.tensorDimsFromProto(t.shape.dim.map(r=>r.dimValue))}}}static tensorDimsFromORTFormat(t){const r=[];for(let o=0;o<t.dimsLength();o++)r.push(LongUtil.longToNumber(t.dims(o)));return r}static tensorAttributesFromORTFormat(t){const r=[];for(let o=0;o<t.attributesLength();o++)r.push(t.attributes(o));return r}},LongUtil=class{static longToNumber(e){return long_default.isLong(e)?e.toNumber():typeof e=="bigint"?Number(e):e}static isLong(e){return long_default.isLong(e)||typeof e=="bigint"}},ShapeUtil=class ee{static size(t){return ee.getSizeFromDimensionRange(t,0,t.length)}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return ee.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return ee.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,o){let u=1;for(let l=r;l<o;l++){if(t[l]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");u*=t[l]}return u}static computeStrides(t){const r=t.length;if(r===0)return[];if(r===1)return[1];const o=new Array(r);o[r-1]=1,o[r-2]=t[r-1];for(let u=r-3;u>=0;--u)o[u]=o[u+1]*t[u+1];return o}static transpose(t){return t.slice().reverse()}static indicesToOffset(t,r,o){o===void 0&&(o=t.length);let u=0;for(let l=0;l<o;++l)u+=r[l]*t[l];return u}static offsetToIndices(t,r){const o=r.length;if(o===0)return[];if(o===1)return[t*r[0]];const u=new Array(r.length);for(let l=0;l<u.length-1;++l)u[l]=Math.floor(t/r[l]),t-=u[l]*r[l];return u[u.length-1]=t,u}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(o=>this.normalizeAxis(o,r))}static incrementIndex(t,r,o){if(r.length===0||t.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(o===void 0)o=r.length;else if(o<=0||o>r.length)throw new Error("Incorrect axis to increment on");for(let u=o-1;u>=0&&(t[u]++,!(t[u]<r[u]));--u)t[u]=0}static calculateReshapedDims(t,r){if(r.length===0){if(t.length===0||ee.size(t)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}const o=r.length,u=new Array(o);let l=-1,c=1;for(let i=0;i<o;i++){if(r[i]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(r[i]===-1){if(l!==-1)throw new Error("at most one dimension in shape hints can be -1");l=i}else{if(r[i]===0){if(i>=t.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");u[i]=t[i]}else u[i]=r[i];c*=u[i]}}const d=ee.size(t);if(l!==-1){if(d%c!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${t}] Output shape: [${r}]`);u[l]=d/c}else if(c!==d)throw new Error("reshapedDims and originalDims don't have matching sizes");return u}static sortBasedOnPerm(t,r){return r?r.map(o=>t[o]):t.slice().reverse()}static padShape(t,r){const o=t.length;return t.map((u,l)=>u+r[l]+r[l+o])}static areEqual(t,r){return t.length!==r.length?!1:t.every((o,u)=>o===r[u])}static validateDimsAndCalcSize(t){if(t.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let r=1;for(const o of t){if(!Number.isInteger(o))throw new TypeError(`Invalid shape: ${o} is not an integer`);if(o<0||o>2147483647)throw new TypeError(`Invalid shape: length ${o} is not allowed`);r*=o}return r}static flattenShape(t,r){r<0&&(r+=t.length);const o=t.reduce((c,d)=>c*d,1),u=t.slice(r).reduce((c,d)=>c*d,1);return[o/u,u]}static squeezeShape(t,r){const o=new Array;r=ee.normalizeAxes(r,t.length);for(let u=0;u<t.length;u++){const l=r.indexOf(u)>=0;if(l&&t[u]!==1)throw new Error("squeeze an axis of size different than 1");(r.length===0&&t[u]>1||r.length>0&&!l)&&o.push(t[u])}return o}static unsqueezeShape(t,r){const o=new Array(t.length+r.length);o.fill(0);for(let l=0;l<r.length;l++){const c=ee.normalizeAxis(r[l],o.length);if(c>=o.length)throw new Error("'axes' has an out of range axis");if(o[c]!==0)throw new Error("'axes' has a duplicate axis");o[c]=1}let u=0;for(let l=0;l<o.length;l++)o[l]===0&&(o[l]=t[u++]);if(u!==t.length)throw new Error("the unsqueezed dimension could not be established");return o}},SplitUtil=class Le{static splitShape(t,r,o,u){if(o.length===0){if(!u)throw new Error("need to know number of outputs when the 'split' attribute is not specified");Le.determineSplit(t[r],u,o)}const l=[],c=[0];for(let d=0;d<o.length;++d){d!==0&&c.push(c[d-1]+o[d-1]);const i=t.slice();i[r]=o[d],l.push(i)}return[l,c]}static determineSplit(t,r,o){if(t%r!==0)throw new Error("cannot split tensor to equal sized parts");for(let u=0;u<r;++u)o.push(t/r)}},PoolConvUtil=class _e{static adjustPoolAttributes(t,r,o,u,l,c){if(!t&&o.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let d=0;d<r.length-2;d++)d>=o.length?o.push(r[d+2]):o[d]=r[d+2];for(let d=0;d<o.length;d++)if(d<u.length){if(u[d]<0)throw new Error("strides should be greater than or equal to 1")}else u.push(1);for(let d=0;d<o.length;d++)if(d<l.length){if(l[d]<0)throw new Error("dilations should be greater than or equal to 1")}else l.push(1);for(let d=0;d<o.length*2;d++)if(d<c.length){if(c[d]<0)throw new Error("pad should be greater than or equal to 1")}else c.push(0);for(let d=0;d<o.length;d++){if(o[d]<=0)throw new Error("kernel shapes need to be greater than 0");if(c[d]>=o[d]||c[d+o.length]>=o[d])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,o,u,l,c){if(c){if(l.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(u.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let d=0;d<t.length-2;d++)_e.adjustPadAndReturnShape(t[d+2],r[d],o[d],u[d],l,d,d+t.length-2,c)}}static computePoolOutputShape(t,r,o,u,l,c,d){if(r.length<=0)throw new Error("input shape must be of size greater than 0");const i=[r[0],r[1]];return _e.computeShapeHelper(t,r,i,o,u,l,c,d),i}static computeConvOutputShape(t,r,o,u,l,c,d){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");const i=[t[0],r[0]];return _e.computeShapeHelper(!1,t,i,o,u,l,c,d),i}static computeShapeHelper(t,r,o,u,l,c,d,i){if(t)for(let a=0;a<r.length-2;a++)o.push(1);else for(let a=0;a<r.length-2;a++)o.push(_e.adjustPadAndReturnShape(r[a+2],u[a],l[a],c[a],d,a,a+r.length-2,i))}static adjustPadAndReturnShape(t,r,o,u,l,c,d,i){const a=o*(u-1)+1;if(i&&i!=="NOTSET")switch(i){case"VALID":return l[c]=0,l[d]=0,Math.floor((t-a)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(o!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{const s=((t+r-1)/r-1)*r+u-t;return l[c]=Math.floor(i==="SAME_LOWER"?(s+1)/2:s/2),l[d]=s-l[c],Math.floor((t+s-u)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+l[c]+l[d]-a)/r+1)}},MIN_CLIP=-34028234663852886e22,MAX_CLIP=34028234663852886e22}});function sizeof(e){switch(e){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${e}`)}}function sizeofProto(e){switch(e){case import_onnx2.onnx.TensorProto.DataType.UINT8:case import_onnx2.onnx.TensorProto.DataType.INT8:case import_onnx2.onnx.TensorProto.DataType.BOOL:return 1;case import_onnx2.onnx.TensorProto.DataType.UINT16:case import_onnx2.onnx.TensorProto.DataType.INT16:return 2;case import_onnx2.onnx.TensorProto.DataType.FLOAT:case import_onnx2.onnx.TensorProto.DataType.INT32:case import_onnx2.onnx.TensorProto.DataType.UINT32:return 4;case import_onnx2.onnx.TensorProto.DataType.INT64:case import_onnx2.onnx.TensorProto.DataType.DOUBLE:case import_onnx2.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${import_onnx2.onnx.TensorProto.DataType[e]}`)}}function createView(e,t){return new(dataviewConstructor(t))(e)}function dataviewConstructor(e){switch(e){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function longToNumber(e,t){if(t===import_onnx2.onnx.TensorProto.DataType.INT64||t===import_tensor_data_type.TensorDataType.INT64){if(e.greaterThanOrEqual(2147483648)||e.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(t===import_onnx2.onnx.TensorProto.DataType.UINT32||t===import_tensor_data_type.TensorDataType.UINT32||t===import_onnx2.onnx.TensorProto.DataType.UINT64||t===import_tensor_data_type.TensorDataType.UINT64){if(e.greaterThanOrEqual(4294967296)||e.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${import_onnx2.onnx.TensorProto.DataType[t]}`);return e.toNumber()}function readProto(e,t,r){switch(t){case import_onnx2.onnx.TensorProto.DataType.BOOL:case import_onnx2.onnx.TensorProto.DataType.UINT8:return e.getUint8(r);case import_onnx2.onnx.TensorProto.DataType.INT8:return e.getInt8(r);case import_onnx2.onnx.TensorProto.DataType.UINT16:return e.getUint16(r,!0);case import_onnx2.onnx.TensorProto.DataType.INT16:return e.getInt16(r,!0);case import_onnx2.onnx.TensorProto.DataType.FLOAT:return e.getFloat32(r,!0);case import_onnx2.onnx.TensorProto.DataType.INT32:return e.getInt32(r,!0);case import_onnx2.onnx.TensorProto.DataType.UINT32:return e.getUint32(r,!0);case import_onnx2.onnx.TensorProto.DataType.INT64:return longToNumber(long_default.fromBits(e.getUint32(r,!0),e.getUint32(r+4,!0),!1),t);case import_onnx2.onnx.TensorProto.DataType.DOUBLE:return e.getFloat64(r,!0);case import_onnx2.onnx.TensorProto.DataType.UINT64:return longToNumber(long_default.fromBits(e.getUint32(r,!0),e.getUint32(r+4,!0),!0),t);default:throw new Error(`cannot read from DataView for type ${import_onnx2.onnx.TensorProto.DataType[t]}`)}}var import_guid_typescript,import_onnx2,Tensor4,init_tensor2=__esm({"web/lib/onnxjs/tensor.ts"(){import_guid_typescript=__toESM(require_guid()),init_long(),init_ort_generated(),import_onnx2=__toESM(require_onnx()),init_util(),Tensor4=class ve{constructor(t,r,o,u,l,c=import_guid_typescript.Guid.create()){this.dims=t,this.type=r,this.dataProvider=o,this.asyncDataProvider=u,this.cache=l,this.dataId=c,this.size=ShapeUtil.validateDimsAndCalcSize(t);const d=this.size,i=o===void 0&&u===void 0&&l===void 0;if(l!==void 0&&l.length!==d)throw new RangeError("Input dims doesn't match data length.");if(r==="string"){if(l!==void 0&&(!Array.isArray(l)||!l.every(a=>typeof a=="string")))throw new TypeError("cache should be a string array");i&&(this.cache=new Array(d))}else{if(l!==void 0){const a=dataviewConstructor(r);if(!(l instanceof a))throw new TypeError(`cache should be type ${a.name}`)}if(i){const a=new ArrayBuffer(d*sizeof(r));this.cache=createView(a,r)}}}get data(){if(this.cache===void 0){const t=this.dataProvider(this.dataId);if(t.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=t}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(t){return this.data[ShapeUtil.indicesToOffset(t,this.strides)]}set(t,r){this.data[ShapeUtil.indicesToOffset(t,this.strides)]=r}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=ShapeUtil.computeStrides(this.dims)),this._strides}static fromProto(t){if(!t)throw new Error("cannot construct Value from an empty tensor");const r=ProtoUtil.tensorDataTypeFromProto(t.dataType),o=ProtoUtil.tensorDimsFromProto(t.dims),u=new ve(o,r);if(r==="string")t.stringData.forEach((l,c)=>{u.data[c]=decodeUtf8String(l)});else if(t.rawData&&typeof t.rawData.byteLength=="number"&&t.rawData.byteLength>0){const l=u.data,c=new DataView(t.rawData.buffer,t.rawData.byteOffset,t.rawData.byteLength),d=sizeofProto(t.dataType),i=t.rawData.byteLength/d;if(t.rawData.byteLength%d!==0)throw new Error("invalid buffer length");if(l.length!==i)throw new Error("buffer length mismatch");for(let a=0;a<i;a++){const n=readProto(c,t.dataType,a*d);l[a]=n}}else{let l;switch(t.dataType){case import_onnx2.onnx.TensorProto.DataType.FLOAT:l=t.floatData;break;case import_onnx2.onnx.TensorProto.DataType.INT32:case import_onnx2.onnx.TensorProto.DataType.INT16:case import_onnx2.onnx.TensorProto.DataType.UINT16:case import_onnx2.onnx.TensorProto.DataType.INT8:case import_onnx2.onnx.TensorProto.DataType.UINT8:case import_onnx2.onnx.TensorProto.DataType.BOOL:l=t.int32Data;break;case import_onnx2.onnx.TensorProto.DataType.INT64:l=t.int64Data;break;case import_onnx2.onnx.TensorProto.DataType.DOUBLE:l=t.doubleData;break;case import_onnx2.onnx.TensorProto.DataType.UINT32:case import_onnx2.onnx.TensorProto.DataType.UINT64:l=t.uint64Data;break;default:throw new Error("unspecific error")}if(l==null)throw new Error("failed to populate data from a tensorproto value");const c=u.data;if(c.length!==l.length)throw new Error("array length mismatch");for(let d=0;d<l.length;d++){const i=l[d];long_default.isLong(i)?c[d]=longToNumber(i,t.dataType):c[d]=i}}return u}static fromData(t,r,o){return new ve(r,o,void 0,void 0,t)}static fromOrtTensor(t){if(!t)throw new Error("cannot construct Value from an empty tensor");const r=ProtoUtil.tensorDimsFromORTFormat(t),o=ProtoUtil.tensorDataTypeFromProto(t.dataType()),u=new ve(r,o);if(o==="string")for(let l=0;l<t.stringDataLength();l++)u.data[l]=t.stringData(l);else if(t.rawDataArray()&&typeof t.rawDataLength()=="number"&&t.rawDataLength()>0){const l=u.data,c=new DataView(t.rawDataArray().buffer,t.rawDataArray().byteOffset,t.rawDataLength()),d=sizeofProto(t.dataType()),i=t.rawDataLength()/d;if(t.rawDataLength()%d!==0)throw new Error("invalid buffer length");if(l.length!==i)throw new Error("buffer length mismatch");for(let a=0;a<i;a++){const n=readProto(c,t.dataType(),a*d);l[a]=n}}return u}}}});function getGlsl(e){return e===1?GLSL_ES_2_0:GLSL_ES_3_0}function getVertexShaderSource(e){const t=getGlsl(e);return`${t.version}
      precision highp float;
      ${t.attribute} vec3 position;
      ${t.attribute} vec2 textureCoord;

      ${t.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function getFragShaderPreamble(e){const t=getGlsl(e);return`${t.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${t.varyingFrag} vec2 TexCoords;
    ${t.outputDeclaration}
    const vec2 halfCR = vec2(0.5, 0.5);

    // Custom vector types to handle higher dimenalities.
    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    `}function getDefaultFragShaderMain(e,t){const r=getGlsl(e);return`
  void main() {
    int indices[${t}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${r.output} = result;
  }
  `}var GLSL_ES_2_0,GLSL_ES_3_0,init_glsl_source=__esm({"web/lib/onnxjs/backends/webgl/glsl-source.ts"(){GLSL_ES_2_0={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},GLSL_ES_3_0={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}}}),init_types=__esm({"web/lib/onnxjs/backends/webgl/types.ts"(){}});async function repeatedTry(e,t=o=>0,r){return new Promise((o,u)=>{let l=0;const c=()=>{if(e()){o();return}l++;const d=t(l);setTimeout(c,d)};c()})}function generateShaderFuncNameFromInputSamplerName(e){return assert(typeof e<"u"&&e.length!==0,()=>"empty string found for sampler name"),"get"+e.charAt(0).toUpperCase()+e.slice(1)}function generateShaderFuncNameFromInputSamplerNameAtOutCoords(e){return assert(typeof e<"u"&&e.length!==0,()=>"empty string found for sampler name"),"get"+e.charAt(0).toUpperCase()+e.slice(1)+"AtOutCoords"}function squeezeInputShape(e,t){let r=JSON.parse(JSON.stringify(e));return r=t,r}function getSqueezedParams(e,t){return t.map(r=>e[r]).join(", ")}function getCoordsDataType(e){if(e<=1)return"int";if(e===2)return"ivec2";if(e===3)return"ivec3";if(e===4)return"ivec4";if(e===5)return"ivec5";if(e===6)return"ivec6";throw Error(`GPU for rank ${e} is not yet supported`)}function getGlChannels(e=6){return["x","y","z","w","u","v"].slice(0,e)}var init_utils=__esm({"web/lib/onnxjs/backends/webgl/utils.ts"(){init_util()}});function getVecChannels(e,t){return getGlChannels(t).map(r=>`${e}.${r}`)}function getChannels(e,t){return t===1?[e]:getVecChannels(e,t)}function unpackFromChannel(){return`
    float getChannel(vec4 frag, int dim) {
      int modCoord = imod(dim, 2);
      return modCoord == 0 ? frag.r : frag.g;
    }

    float getChannel(vec4 frag, vec2 innerDims) {
      vec2 modCoord = mod(innerDims, 2.);
      return modCoord.x == 0. ?
        (modCoord.y == 0. ? frag.r : frag.g) :
        (modCoord.y == 0. ? frag.b : frag.a);
    }
  `}var init_packing_utils=__esm({"web/lib/onnxjs/backends/webgl/ops/packing-utils.ts"(){init_utils()}});function getOutOfBoundsCondition(e,t,r){if(e===0)return"false";if(e===1)return`rc > ${t[0]}`;let o="";for(let u=e-2;u<e;u++)o+=`${r[u]} >= ${t[u-e+2]}`,u<e-1&&(o+="||");return o}function getOutput(e,t){const r=e.length;if(r===0)return"getA(), 0, 0, 0";if(r===1)return`getA(rc),
            rc + 1 >= ${e[0]} ? 0. : getA(rc + 1),
            0, 0`;const o="r, c",u="r, cp1",l="rp1, c",c="rp1, cp1";let d="";if(r>2)for(let i=0;i<r-2;++i)d=d+`${t[i]},`;return`getA(${d}${o}),
          rEdge ? 0. : getA(${d}${l}),
          cEdge ? 0. : getA(${d}${u}),
          rEdge || cEdge ? 0. : getA(${d}${c})`}function getSetup(e,t,r,o){return e===0||e===1?"":`
    int r = ${t[e-2]};
    int c = ${t[e-1]};
    int rp1 = ${t[e-2]} + 1;
    int cp1 = ${t[e-1]} + 1;
    bool rEdge = rp1 >= ${o};
    bool cEdge = cp1 >= ${r};
    `}var packProgramMetadata,createPackProgramInfo,createPackProgramInfoLoader,init_pack=__esm({"web/lib/onnxjs/backends/webgl/ops/pack.ts"(){init_glsl_source(),init_types(),init_utils(),init_packing_utils(),packProgramMetadata={name:"pack",inputNames:["A"],inputTypes:[1]},createPackProgramInfo=(e,t)=>{const r=getGlsl(e.session.backend.glContext.version),o=t.dims,u=o.length,l=t.dims.length,c=getCoordsDataType(l),d=getChannels("rc",l),i=getSetup(l,d,o[o.length-2],o[o.length-1]);let a;u===0?a=[1,1]:u===1?a=[o[0],1]:a=[o[l-1],o[l-2]];const n=getOutOfBoundsCondition(l,a,d),s=getOutput(o,d),p=`
        void main() {
          ${c} rc = getOutputCoords();

          if(${n}) {
            ${r.output} = vec4(0);
          } else {
            ${i}

            ${r.output} = vec4(${s});
          }
        }
      `;return{...packProgramMetadata,hasMain:!0,output:{dims:t.dims,type:t.type,textureType:2},shaderSource:p}},createPackProgramInfoLoader=(e,t)=>({...packProgramMetadata,get:()=>createPackProgramInfo(e,t)})}});function processDims3D(e){if(e.length===0)return[1,1,1];let t=1;for(let r=0;r<e.length-2;++r)t*=e[r];return[t,e.length>1?e[e.length-2]:1,e[e.length-1]]}function isReshapeCheap(e,t){let r=!1;return e.length===0||t.length===0?r=!0:e.length<2||t.length<2?r=e[e.length-1]===t[t.length-1]:r=e[e.length-1]===t[t.length-1]&&e[e.length-2]===t[t.length-2],r}function getReshapedInputCoords(e){const t=ShapeUtil.computeStrides(e),r=["b","r","c"],o="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${t.map((l,c)=>{const d=`int ${r[c]} = ${o} / ${l}`,i=c===t.length-1?`int ${r[c+1]} = ${o} - ${r[c]} * ${l}`:`index -= ${r[c]} * ${l}`;return`${d}; ${i};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function getFlattenedIndexFrom3D(e){const t=ShapeUtil.computeStrides(e);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${t[0]} + coords.z * ${t[1]} + coords.y;
  }
`}var createPackedReshape3DProgramMetadata,createPackedReshape3DProgramInfo,createPackedReshape3DProgramInfoLoader,init_reshape_packed=__esm({"web/lib/onnxjs/backends/webgl/ops/reshape-packed.ts"(){init_util(),init_glsl_source(),init_types(),init_packing_utils(),createPackedReshape3DProgramMetadata=e=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${e}`}),createPackedReshape3DProgramInfo=(e,t,r,o)=>{const u=t.dims,l=o;let c="";for(let a=0;a<4;a++){let n="";switch(a){case 0:n="outputCoords = rc;";break;case 1:n="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:n="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:n="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}c+=`
        ${n}
        ${a>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${a}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${a>0?"}":""}
      `}const d=getGlsl(e.session.backend.glContext.version),i=`
      ${getReshapedInputCoords(u)}
      ${getFlattenedIndexFrom3D(l)}
      ${unpackFromChannel()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${l[2]};
        int cols = ${l[1]};

        ${c}
        ${d.output} = result;
      }
    `;return{...r,output:{dims:l,type:t.type,textureType:2},shaderSource:i,hasMain:!0}},createPackedReshape3DProgramInfoLoader=(e,t,r)=>{const o=createPackedReshape3DProgramMetadata(r);return{...o,get:()=>createPackedReshape3DProgramInfo(e,t,o,r)}}}}),encodeAsUint8,init_uint8_encode=__esm({"web/lib/onnxjs/backends/webgl/ops/uint8-encode.ts"(){init_glsl_source(),init_types(),encodeAsUint8=(e,t)=>{const r=t.shape,o=getGlsl(e.session.backend.glContext.version),u=`
    const float FLOAT_MAX = 1.70141184e38;
    const float FLOAT_MIN = 1.17549435e-38;

    bool isNaN(float val) {
      return (val < 1.0 || 0.0 < val || val == 0.0) ? false : true;
    }

    highp vec4 encodeAsUint8(highp float v) {
      if (isNaN(v)) {
        return vec4(255, 255, 255, 255);
      }

      highp float av = abs(v);

      if(av < FLOAT_MIN) {
        return vec4(0.0, 0.0, 0.0, 0.0);
      } else if(v > FLOAT_MAX) {
        return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
      } else if(v < -FLOAT_MAX) {
        return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
      }

      highp vec4 c = vec4(0,0,0,0);

      highp float e = floor(log2(av));
      highp float m = exp2(fract(log2(av))) - 1.0;

      c[2] = floor(128.0 * m);
      m -= c[2] / 128.0;
      c[1] = floor(32768.0 * m);
      m -= c[1] / 32768.0;
      c[0] = floor(8388608.0 * m);

      highp float ebias = e + 127.0;
      c[3] = floor(ebias / 2.0);
      ebias -= c[3] * 2.0;
      c[2] += floor(ebias) * 128.0;

      c[3] += 128.0 * step(0.0, -v);

      return c / 255.0;
    }

    void main() {
      float value = ${o.texture2D}(X,TexCoords).r;
      ${o.output} = encodeAsUint8(value);
    }`,l={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:r,type:t.tensor.type,textureType:3},shaderSource:u,hasMain:!0};return e.executeProgram(l,[t.tensor])}}});function getSourceCoords(e,t){if(e===1)return"rc";let r="";for(let o=0;o<e;o++)r+=t[o],o<e-1&&(r+=",");return r}var unpackProgramMetadata,createUnpackProgramInfo,createUnpackProgramInfoLoader,init_unpack=__esm({"web/lib/onnxjs/backends/webgl/ops/unpack.ts"(){init_glsl_source(),init_types(),init_utils(),init_packing_utils(),unpackProgramMetadata={name:"unpack",inputNames:["A"],inputTypes:[2]},createUnpackProgramInfo=(e,t)=>{const r=t.dims.length,o=getChannels("rc",r),u=o.slice(-2),l=getCoordsDataType(r),c=unpackFromChannel(),i=t.dims.length===0?"":getSourceCoords(r,o),a=r<=1?"rc":`vec2(${u.join(",")})`,n=getGlsl(e.session.backend.glContext.version),s=`
    ${c}
    void main() {
      ${l} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${i});

       ${n.output} = vec4(getChannel(packedInput, ${a}), 0, 0, 0);
     }
   `;return{...unpackProgramMetadata,hasMain:!0,output:{dims:t.dims,type:t.type,textureType:0},shaderSource:s}},createUnpackProgramInfoLoader=(e,t)=>({...unpackProgramMetadata,get:()=>createUnpackProgramInfo(e,t)})}}),RedFloat32DataEncoder,RGBAFloatDataEncoder,Uint8DataEncoder,init_texture_data_encoder=__esm({"web/lib/onnxjs/backends/webgl/texture-data-encoder.ts"(){init_instrument(),RedFloat32DataEncoder=class{constructor(e,t=1){if(t===1)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=t;else if(t===4)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=t;else throw new Error(`Invalid number of channels: ${t}`)}encode(e,t){let r,o;return e.constructor!==Float32Array&&(Logger.warning("Encoder","data was not of type Float32; creating new Float32Array"),o=new Float32Array(e)),t*this.channelSize>e.length?(Logger.warning("Encoder","Source data too small. Allocating larger array"),o=e,r=this.allocate(t*this.channelSize),o.forEach((u,l)=>r[l]=u)):(o=e,r=o),r}allocate(e){return new Float32Array(e*4)}decode(e,t){return this.channelSize===1?e.filter((o,u)=>u%4===0).subarray(0,t):e.subarray(0,t)}},RGBAFloatDataEncoder=class{constructor(e,t=1,r){if(t!==1&&t!==4)throw new Error(`Invalid number of channels: ${t}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=t,this.textureType=r||e.FLOAT}encode(e,t){let r=e;return this.channelSize===1&&(Logger.verbose("Encoder","Exploding into a larger array"),r=this.allocate(t),e.forEach((o,u)=>r[u*4]=o)),r}allocate(e){return new Float32Array(e*4)}decode(e,t){return this.channelSize===1?e.filter((o,u)=>u%4===0).subarray(0,t):e.subarray(0,t)}},Uint8DataEncoder=class{constructor(e,t=1){if(this.channelSize=4,t===1)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=t;else if(t===4)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=t;else throw new Error(`Invalid number of channels: ${t}`)}encode(e,t){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,t){if(e instanceof Uint8Array)return e.subarray(0,t);throw new Error(`Invalid array type: ${e.constructor}`)}}}}),createTextureLayoutFromTextureType,calculateTextureWidthAndHeight,createTextureLayoutFromShape,init_texture_layout=__esm({"web/lib/onnxjs/backends/webgl/texture-layout.ts"(){init_util(),init_types(),createTextureLayoutFromTextureType=(e,t,r)=>{const o=r===0||r===1?1:4,u=r===2,l=r===1||r===2,c=r===4?t.length-1:void 0,d=r===4?t.map((i,a)=>a===t.length-1?i*4:i):void 0;return createTextureLayoutFromShape(e,t,o,d,{isPacked:u,reverseWH:l,breakAxis:c})},calculateTextureWidthAndHeight=(e,t,r)=>{const o=createTextureLayoutFromTextureType(e,t,r);return[o.width,o.height]},createTextureLayoutFromShape=(e,t,r=1,o,u)=>{const l=!!(u&&u.isPacked),[c,d]=e.computeTextureWH(l&&o||t,u),i=t.length;let a=t.slice(0);if(i===0&&(a=[1]),r===1)o=t;else if(l){if(r!==4)throw new Error("a packed texture must be 4-channel");o=t,i>0&&(a[i-1]=Math.ceil(a[i-1]/2)),i>1&&(a[i-2]=Math.ceil(a[i-2]/2))}else if(!o)throw new Error("Unpacked shape is needed when using channels > 1");return{width:c,height:d,channels:r,isPacked:l,shape:a,strides:ShapeUtil.computeStrides(a),unpackedShape:o,reversedWH:u&&u.reverseWH}}}}),getProgramInfoUniqueKey,WebGLInferenceHandler,init_inference_handler=__esm({"web/lib/onnxjs/backends/webgl/inference-handler.ts"(){init_instrument(),init_tensor2(),init_util(),init_pack(),init_reshape_packed(),init_uint8_encode(),init_unpack(),init_texture_data_encoder(),init_texture_layout(),init_types(),getProgramInfoUniqueKey=(e,t)=>{const r=t.map(u=>`${u.unpackedShape.join(",")};${u.width}x${u.height}`).join("_");let o=e.name;return e.cacheHint&&(o+="["+e.cacheHint+"]"),o+=":"+r,o},WebGLInferenceHandler=class{constructor(e){this.session=e,this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,t){return calculateTextureWidthAndHeight(this.session.layoutStrategy,e,t)}executeProgram(e,t){if(t.length<e.inputNames.length)throw new Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw new Error("input names size does not match input types");const r=[];for(let i=0;i<e.inputNames.length;++i)r[i]=this.getOrCreateTextureData(t[i],e.inputTypes[i]);const o=getProgramInfoUniqueKey(e,r);let u=this.session.programManager.getArtifact(o);const l=u?u.programInfo:typeof e.get=="function"?e.get():e,c=createTextureLayoutFromTextureType(this.session.layoutStrategy,l.output.dims,l.output.textureType),d=this.createTextureData(c,l.output.type);return u||(u=this.session.programManager.build(l,r,d),this.session.programManager.setArtifact(o,u)),this.runProgram(u,r,d),d}run(e,t){return this.executeProgram(e,t).tensor}runProgram(e,t,r){for(let o=0;o<t.length;++o)if(!!t[o].isPacked!=(e.programInfo.inputTypes[o]===2))throw new Error(`input[${o}] property packed inconsistent`);if(!!r.isPacked!=(e.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(e,t,r)}getOrCreateTextureData(e,t){let r=this.getTextureData(e.dataId,t===2);if(!r&&(r=this.getTextureData(e.dataId,t!==2),r))return t===2?this.pack(r):this.unpack(r);if(!r){const o=createTextureLayoutFromTextureType(this.session.layoutStrategy,e.dims,t);if(t===4){const c=e.dims;if(c.length===4){const d=[c[0],Math.ceil(c[1]*c[2]*c[3]/4)],i=createTextureLayoutFromTextureType(this.session.layoutStrategy,d,t);let a=e.numberData;if(c[1]*c[2]*c[3]%4!==0){const n=c[0],s=c[1]*c[2]*c[3],p=Math.ceil(s*1/4)*4,f=n*p;a=new Float32Array(f);for(let h=0;h<n;++h){const m=h*s,_=h*p+h%1*s;a.set(e.numberData.subarray(m,m+s),_)}}return this.createTextureData(i,e.type,a,e,1)}}if(t===2){const u=createTextureLayoutFromShape(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),l=this.createTextureData(u,e.type,e.numberData,e,1);r=this.pack(l)}else r=this.createTextureData(o,e.type,e.numberData,e,1)}return r}createTextureDataFromLayoutBindTensor(e,t,r,o){return this.createTextureData(e,t,r,o,1)}createTextureData(e,t,r,o,u){Logger.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);const l=this.session.textureManager.createTextureFromLayout(t,e,r,u);return this.createTextureDataFromTexture(e,t,l,o)}reshapeUnpacked(e,t){const r=this.getOrCreateTextureData(e,0),o={channels:r.channels,height:r.height,width:r.width,shape:t.length!==0?t:[1],strides:ShapeUtil.computeStrides(t),unpackedShape:t};return this.createTextureDataFromTexture(o,e.type,r.texture).tensor}reshapePacked(e,t){const r=this.getOrCreateTextureData(e,2);if(isReshapeCheap(e.dims,t)){const i={channels:r.channels,height:r.height,width:r.width,shape:t.length!==0?t:[1],strides:ShapeUtil.computeStrides(t),unpackedShape:t,isPacked:!0};return this.createTextureDataFromTexture(i,e.type,r.texture).tensor}const o=processDims3D(e.dims),u=processDims3D(t),l=this.reshapePacked(e,o),c=this.run(createPackedReshape3DProgramInfoLoader(this,l,u),[l]);return this.reshapePacked(c,t)}cast(e,t){const r=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(r,t,r.texture).tensor}createTextureDataFromTexture(e,t,r,o,u){const l={...e,tensor:o||new Tensor4(e.unpackedShape,t,c=>this.readTexture(l),async c=>this.readTextureAsync(l),void 0,u),texture:r};return this.setTextureData(l.tensor.dataId,l,e.isPacked),l}getTextureData(e,t=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,t):t?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,t,r=!1){this.session.isInitializer(e)?this.session.setTextureData(e,t,r):(r?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,t)}isTextureLayoutCached(e,t=!1){return!!this.getTextureData(e.dataId,t)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(encodeAsUint8(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(encodeAsUint8(this,e))}pack(e){return this.executeProgram(createPackProgramInfoLoader(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(createUnpackProgramInfoLoader(this,e.tensor),[e.tensor])}}}}),AttributeWithCacheKeyImpl,createAttributeWithCacheKey,init_attribute_with_cache_key=__esm({"web/lib/onnxjs/attribute-with-cache-key.ts"(){AttributeWithCacheKeyImpl=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},createAttributeWithCacheKey=e=>new AttributeWithCacheKeyImpl(e)}}),batchNormalizationProgramMetadata,batchNormalization,parseBatchNormalizationAttributes,createBatchNormalizationProgramInfo,validateInputs,init_batch_normalization=__esm({"web/lib/onnxjs/backends/webgl/ops/batch-normalization.ts"(){init_attribute_with_cache_key(),init_glsl_source(),init_types(),batchNormalizationProgramMetadata={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},batchNormalization=(e,t,r)=>(validateInputs(t),[e.run({...batchNormalizationProgramMetadata,cacheHint:r.cacheKey,get:()=>createBatchNormalizationProgramInfo(e,t,r)},t)]),parseBatchNormalizationAttributes=e=>{const t=e.attributes.getFloat("epsilon",1e-5),r=e.attributes.getFloat("momentum",.9),o=e.attributes.getInt("spatial",1);return createAttributeWithCacheKey({epsilon:t,momentum:r,spatial:o})},createBatchNormalizationProgramInfo=(e,t,r)=>{const o=getGlsl(e.session.backend.glContext.version),u=t[0].dims.length,[l,c]=e.calculateTextureWidthAndHeight(t[1].dims,0),d=`
  float process(int[${u}] indices) {
    vec2 position = offsetToCoords(indices[1], ${l}, ${c});
    float scale = getColorAsFloat(${o.texture2D}(Scale, position));
    float mean = getColorAsFloat(${o.texture2D}(Mean, position));
    float variance = getColorAsFloat(${o.texture2D}(Variance, position));
    float b = getColorAsFloat(${o.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${r.epsilon})) ) + b;
  }`;return{...batchNormalizationProgramMetadata,output:{dims:t[0].dims,type:t[0].type,textureType:0},shaderSource:d}},validateInputs=e=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs.");const t=e[0],r=e[1],o=e[2],u=e[3],l=e[4];if(t.dims.length<3||r.dims.length!==1||o.dims.length!==1||u.dims.length!==1||l.dims.length!==1)throw new Error("invalid input shape.");if(r.dims[0]!==t.dims[1]||o.dims[0]!==t.dims[1]||u.dims[0]!==t.dims[1]||l.dims[0]!==t.dims[1])throw new Error("invalid input shape.");if(t.type!=="float32"&&t.type!=="float64"||r.type!=="float32"&&r.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||u.type!=="float32"&&u.type!=="float64"||l.type!=="float32"&&l.type!=="float64")throw new Error("invalid input tensor types.")}}}),GlslContext,GlslLib,GlslLibRoutine,GlslLibRoutineNode,TopologicalSortGlslRoutines,init_glsl_definitions=__esm({"web/lib/onnxjs/backends/webgl/glsl-definitions.ts"(){GlslContext=class{constructor(e,t,r,o){this.glContext=e,this.programInfo=t,this.inputTextureLayouts=r,this.outputTextureLayout=o}},GlslLib=class{constructor(e){this.context=e}},GlslLibRoutine=class{constructor(e,t){this.routineBody=e,this.dependencies=t}},GlslLibRoutineNode=class{constructor(e,t,r){this.name=e,r?this.dependencies=r:this.dependencies=[],t&&(this.routineBody=t)}addDependency(e){e&&this.dependencies.push(e)}},TopologicalSortGlslRoutines=class{static returnOrderedNodes(e){if(!e||e.length===0)return[];if(e.length===1)return e;const t=new Set,r=new Set,o=new Array;return this.createOrderedNodes(e,t,r,o),o}static createOrderedNodes(e,t,r,o){for(let u=0;u<e.length;++u)this.dfsTraverse(e[u],t,r,o)}static dfsTraverse(e,t,r,o){if(!e||r.has(e.name))return;if(t.has(e.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");t.add(e.name);const u=e.dependencies;if(u&&u.length>0)for(let l=0;l<u.length;++l)this.dfsTraverse(u[l],t,r,o);o.push(e),r.add(e.name),t.delete(e.name)}}}});function glslAdd(){const e="add_";return{body:`
  float ${e}(float a, float b) {
    return a + b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:e,type:0}}function glslDiv(){const e="div_";return{body:`
  float ${e}(float a, float b) {
    return a / b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:e,type:0}}function glslMul(){const e="mul_";return{body:`
  float ${e}(float a, float b) {
    return a * b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:e,type:0}}function glslSub(){const e="sub_";return{body:`
  float ${e}(float a, float b) {
    return a - b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:e,type:0}}function glslEqual(){const e="equal_";return{body:`
  float ${e}(float a, float b) {
    return float(a == b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:e,type:0}}function glslGreater(){const e="greater_";return{body:`
  float ${e}(float a, float b) {
    return float(a > b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:e,type:0}}function glslLess(){const e="less_";return{body:`
  float ${e}(float a, float b) {
    return float(a < b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:e,type:0}}function glslAnd(){const e="and_";return{body:`
  float ${e}(float a, float b) {
    return float( bool(a) && bool(b) );
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r && b2.r ,
                b1.g && b2.g,
                b1.b && b2.b,
                b1.a && b2.a );
  }
  `,name:e,type:0}}function glslOr(){return{body:`
  float or_(float a, float b) {
    return float( bool(a) || bool(b) );
  }
  vec4 or_(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r || b2.r ,
                b1.g || b2.g,
                b1.b || b2.b,
                b1.a || b2.a );
  }
  `,name:"or_",type:0}}function glslXor(){const e="xor_";return{body:`
  float ${e}(float a, float b) {
    return float( bool(a) ^^ bool(b) );
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r ^^ b2.r ,
                b1.g ^^ b2.g,
                b1.b ^^ b2.b,
                b1.a ^^ b2.a );
  }
  `,name:e,type:0}}function glslPow(){return glslBuiltinBinary("pow")}function glslPRelu(){const e="prelu_";return{body:`
  float ${e}(float a, float b) {
    return a < 0.0 ? a * b: a;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4(
      v1.r < 0.0 ? v1.r * v2.r: v1.r,
      v1.g < 0.0 ? v1.g * v2.g: v1.g,
      v1.b < 0.0 ? v1.b * v2.b: v1.b,
      v1.a < 0.0 ? v1.a * v2.a: v1.a
      );
  }
  `,name:e,type:0}}function glslBuiltinBinary(e){const t=`${e}_`;return{body:`
  float ${t}(float a, float b) {
    return ${e}(a, b);
  }
  vec4 ${t}(vec4 v1, vec4 v2) {
    return ${e}(v1, v2);
  }
  `,name:t,type:0}}var createBinaryProgramInfoLoader,createBinaryProgramInfo,add2,and2,div,equal,greater,less,mul,or2,pow,pRelu,sub,xor2,init_binary_op=__esm({"web/lib/onnxjs/backends/webgl/ops/binary-op.ts"(){init_util(),init_glsl_definitions(),init_glsl_source(),init_types(),createBinaryProgramInfoLoader=(e,t,r,o=t[0].type,u)=>{const l=e.session.pack?2:0;return{name:r.name,inputNames:["A","B"],inputTypes:[l,l],cacheHint:u,get:()=>createBinaryProgramInfo(e,t,r,o)}},createBinaryProgramInfo=(e,t,r,o=t[0].type)=>{const u=e.session.pack?2:0,l=!ShapeUtil.areEqual(t[0].dims,t[1].dims);let c=t[0].dims;const d=e.session.pack;if(l){const n=BroadcastUtil.calcShape(t[0].dims,t[1].dims,!1);if(!n)throw new Error("Can't perform binary op on the given tensors");c=n;const s=c.length,p=t[0].dims.length!==0?t[0].dims.length:1,f=t[1].dims.length!==0?t[1].dims.length:1,h=t[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",m=t[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",_=getGlsl(e.session.backend.glContext.version),y=d?`
      ${r.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${r.name}(a, b);
        ${_.output} = result;
      }`:`
      ${r.body}
      float process(int indices[${s}]) {
        int aindices[${p}];
        int bindices[${f}];
        ${h}
        ${m}
        return ${r.name}(_A(aindices), _B(bindices));
      }`;return{name:r.name,inputNames:["A","B"],inputTypes:[u,u],output:{dims:c,type:o,textureType:u},shaderSource:y,hasMain:d}}const i=getGlsl(e.session.backend.glContext.version),a=`
    ${r.body}
    void main() {
      vec4 v1 = ${i.texture2D}(A, TexCoords);
      vec4 v2 = ${i.texture2D}(B, TexCoords);
      vec4 result = ${r.name}(v1, v2);
      ${i.output} = result;
    }
    `;return{name:r.name,inputNames:["A","B"],inputTypes:[u,u],output:{dims:t[0].dims,type:o,textureType:u},shaderSource:a,hasMain:!0}},add2=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslAdd()),t)],and2=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslAnd(),"bool"),t)],div=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslDiv()),t)],equal=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslEqual(),"bool"),t)],greater=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslGreater(),"bool"),t)],less=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslLess(),"bool"),t)],mul=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslMul()),t)],or2=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslOr(),"bool"),t)],pow=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslPow()),t)],pRelu=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslPRelu()),t)],sub=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslSub()),t)],xor2=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslXor(),"bool"),t)]}}),cast,parseCastAttributes,validateInputs2,init_cast=__esm({"web/lib/onnxjs/backends/webgl/ops/cast.ts"(){init_util(),cast=(e,t,r)=>(validateInputs2(t),[e.cast(t[0],r)]),parseCastAttributes=e=>ProtoUtil.tensorDataTypeFromProto(e.attributes.getInt("to")),validateInputs2=e=>{if(!e||e.length!==1)throw new Error("Cast requires 1 input.");if(e[0].type==="string")throw new Error("Invalid input type.")}}}),createPackedConcatProgramMetadata,createPackedConcatProgramInfo,createPackedConcatProgramInfoLoader,getShiftedChannelsSnippet,init_concat_packed=__esm({"web/lib/onnxjs/backends/webgl/ops/concat-packed.ts"(){init_glsl_source(),init_types(),init_utils(),init_packing_utils(),createPackedConcatProgramMetadata=(e,t)=>({name:"Concat (packed)",inputNames:Array.from({length:e},(r,o)=>`X${o}`),inputTypes:Array(e).fill(2),cacheHint:t}),createPackedConcatProgramInfo=(e,t,r,o)=>{const u=r[0].dims.slice();if(o>=u.length||o<-1*u.length)throw new Error("axis specified for concat doesn't match input dimensionality");o<0&&(o=u.length+o);const l=u.slice(0);for(let w=1;w<r.length;w++){const x=r[w].dims.slice();for(let S=0;S<u.length;S++)if(S===o)l[o]+=x[S];else if(u[S]!==x[S])throw new Error("non concat dimensions must match")}const c=l.length,d=getChannels("coords",c),i=getCoordsDataType(c),a=unpackFromChannel(),n=r.map(w=>w.dims),s=getGlChannels(c),p=new Array(n.length-1);p[0]=n[0][o];for(let w=1;w<p.length;w++)p[w]=p[w-1]+n[w][o];const f=s[o],h=s.slice(-2),m=s.join();let _=`if (${f} < ${p[0]}) {
        return getChannel(
            getX0(${m}), vec2(${h.join()}));
        }`;for(let w=1;w<p.length;w++){const x=p[w-1];_+=`
            if (${f} < ${p[w]}  && ${f} >= ${p[w-1]}) {
              return getChannel(
                getX${w}(${getShiftedChannelsSnippet(s,f,x)}),
                vec2(${getShiftedChannelsSnippet(h,f,x)}));
            }`}const y=p.length,g=p[p.length-1];_+=`
            return getChannel(
              getX${y}(${getShiftedChannelsSnippet(s,f,g)}),
              vec2(${getShiftedChannelsSnippet(h,f,g)}));`;const b=getGlsl(e.session.backend.glContext.version),v=`
          ${a}
          float getValue(${s.map(w=>"int "+w)}) {
            ${_}
          }

          void main() {
            ${i} coords = getOutputCoords();
            int lastDim = coords.${s[c-1]};
            coords.${s[c-1]} = coords.${s[c-2]};
            coords.${s[c-2]} = lastDim;

            vec4 result = vec4(getValue(${d}), 0., 0., 0.);

            ${d[c-1]} = ${d[c-1]} + 1;
            if (${d[c-1]} < ${l[c-1]}) {
              result.g = getValue(${d});
            }

            ${d[c-2]} = ${d[c-2]} + 1;
            if (${d[c-2]} < ${l[c-2]}) {
              result.a = getValue(${d});
            }

            ${d[c-1]} = ${d[c-1]} - 1;
            if (${d[c-2]} < ${l[c-2]} &&
                ${d[c-1]} < ${l[c-1]}) {
              result.b = getValue(${d});
            }
            ${b.output} = result;
          }
        `;return{...t,output:{dims:l,type:r[0].type,textureType:2},shaderSource:v,hasMain:!0}},createPackedConcatProgramInfoLoader=(e,t,r)=>{const o=createPackedConcatProgramMetadata(t.length,r.cacheKey);return{...o,get:()=>createPackedConcatProgramInfo(e,o,t,r.axis)}},getShiftedChannelsSnippet=(e,t,r)=>{const o=e.indexOf(t);return e.map((l,c)=>c===o?`${l} - ${r}`:l).join()}}}),concat,createUnpackedConcatProgramMetadata,createUnpackedConcatProgramInfo,createUnpackedConcatProgramInfoLoader,getTextureIndexWhereDataResidesLinearSearch,getTextureIndexWhereDataResidesBinarySearch,getFetchDataFromCorrectTextureMethod,getGetSizeInConcatAxisValueFromIndexMethod,parseConcatAttributes,validateInputs3,init_concat=__esm({"web/lib/onnxjs/backends/webgl/ops/concat.ts"(){init_attribute_with_cache_key(),init_types(),init_concat_packed(),concat=(e,t,r)=>(validateInputs3(t),e.session.pack&&t[0].dims.length>1?[e.run(createPackedConcatProgramInfoLoader(e,t,r),t)]:[e.run(createUnpackedConcatProgramInfoLoader(e,t,r),t)]),createUnpackedConcatProgramMetadata=(e,t)=>({name:"Concat",inputNames:Array.from({length:e},(r,o)=>`X${o}`),inputTypes:Array(e).fill(0),cacheHint:t}),createUnpackedConcatProgramInfo=(e,t,r,o)=>{const u=r[0].dims.slice();if(o>=u.length||o<-1*u.length)throw new Error("axis specified for concat doesn't match input dimensionality");o<0&&(o=u.length+o);const l=u.slice(0);for(let f=1;f<r.length;f++){const h=r[f].dims.slice();for(let m=0;m<u.length;m++)if(m===o)l[o]+=h[m];else if(u[m]!==h[m])throw new Error("non concat dimensions must match")}const c=l.length,d=new Array(r.length);let i=0;for(let f=0;f<d.length;++f)i+=r[f].dims[o],d[f]=i;let a="";r.length<5?a=getTextureIndexWhereDataResidesLinearSearch(d):a=getTextureIndexWhereDataResidesBinarySearch(d);const n=getFetchDataFromCorrectTextureMethod(r.length,c),s=getGetSizeInConcatAxisValueFromIndexMethod(d),p=`
        ${n}
        ${s}
        ${a}
        float process(int indices[${c}]) {
          int textureIndex = getTextureWhereDataResides (indices[${o}]);

          if(textureIndex != 0) {
            indices[${o}] = indices[${o}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...t,output:{dims:l,type:r[0].type,textureType:0},shaderSource:p}},createUnpackedConcatProgramInfoLoader=(e,t,r)=>{const o=createUnpackedConcatProgramMetadata(t.length,r.cacheKey);return{...o,get:()=>createUnpackedConcatProgramInfo(e,o,t,r.axis)}},getTextureIndexWhereDataResidesLinearSearch=e=>`int getTextureWhereDataResides(int index) {
      ${e.map((r,o)=>`if(index<${r}) {return ${o};}
`).join("")}
    }`,getTextureIndexWhereDataResidesBinarySearch=e=>getTextureIndexWhereDataResidesLinearSearch(e),getFetchDataFromCorrectTextureMethod=(e,t)=>{const r=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${t}]) {`];for(let o=0;o<e;++o)o===0?r.push(`	if (textureIndex == ${o}) { return _X${o}(indices); }`):o===e-1?r.push(`	else { return _X${o}(indices); }`):r.push(`	else if (textureIndex == ${o}) { return _X${o}(indices); }`);return r.push("	}"),r.join(`
`)},getGetSizeInConcatAxisValueFromIndexMethod=e=>{const t=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let r=0;r<e.length;++r)r===0?t.push(`	if (index == ${r}) { return ${e[r]}; }`):r===e.length-1?t.push(`	else { return ${e[r]}; }`):t.push(`	else if (index == ${r}) { return ${e[r]}; }`);return t.push("	}"),t.join(`
`)},parseConcatAttributes=e=>createAttributeWithCacheKey({axis:e.attributes.getInt("axis")}),validateInputs3=e=>{if(!e||e.length<1)throw new Error("too few inputs");const t=e[0].type,r=e[0].dims.length;if(t==="string")throw new Error("string tensor is not supported yet");for(const o of e){if(o.type!==t)throw new Error("input tensors should be one type");if(o.dims.length!==r)throw new Error("input tensors should have the same shape")}}}});function glslAbs(){return glslBuiltinUnary("abs")}function glslAcos(){return glslBuiltinUnary("acos")}function glslAsin(){return glslBuiltinUnary("asin")}function glslAtan(){return glslBuiltinUnary("atan")}function glslCeil(){return glslBuiltinUnary("ceil")}function glslCos(){return glslBuiltinUnary("cos")}function glslElu(e){return{body:`
  const float alpha = float(${e});

  float elu_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 elu_(vec4 v) {
    return vec4(elu_(v.x), elu_(v.y), elu_(v.z), elu_(v.w));
  }
  `,name:"elu",type:0}}function glslExp(){return glslBuiltinUnary("exp")}function glslFloor(){return glslBuiltinUnary("floor")}function glslClip(e,t){const r="clip";return{body:`
  const float min = float(${e});
  const float max = float(${t});

  float ${r}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${r}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:r,type:0}}function glslIdentity(){const e="indentity";return{body:`
  float ${e}_(float a) {
    return a;
  }
  vec4 ${e}_(vec4 v) {
    return v;
  }
  `,name:e,type:0}}function glslLeakyRelu(e){const t="leakyRelu";return{body:`
  const float alpha = float(${e});

  float ${t}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${t}_(vec4 v) {
    return vec4(${t}_(v.x), ${t}_(v.y), ${t}_(v.z), ${t}_(v.w));
  }
  `,name:t,type:0}}function glslLog(){return glslBuiltinUnary("log")}function glslNeg(){return{body:`
  float neg_(float a) {
    return -a;
  }
  vec4 neg_(vec4 v) {
    return -v;
  }
  `,name:"neg",type:0}}function glslNot(){return{body:`
  float not_(float a) {
    return float( ! bool(a) );
  }
  bool not_(bool a) {
    return !a;
  }
  vec4 not_(vec4 v) {
    return vec4(!bool(v.x), !bool(v.y), !bool(v.z), !bool(v.w));
  }
  bvec4 not_(bvec4 v) {
    return bvec4(!v.x, !v.y, !v.z, !v.w);
  }
  `,name:"not",type:0}}function glslSin(){return glslBuiltinUnary("sin")}function glslRelu(){const e="relu";return{body:`
  float ${e}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${e}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:e,type:0}}function glslSigmoid(){const e="sigmoid";return{body:`
  float ${e}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${e}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:e,type:0}}function glslSqrt(){return glslBuiltinUnary("sqrt")}function glslTan(){return glslBuiltinUnary("tan")}function glslTanh(){const e="tanh";return{body:`
  float ${e}_(float a) {
    a = clamp(a, -10., 10.);
    a = exp(2.*a);
    return (a - 1.) / (a + 1.);
  }
  vec4 ${e}_(vec4 v) {
    v = clamp(v, -10., 10.);
    v = exp(2.*v);
    return (v - 1.) / (v + 1.);
  }
  `,name:e,type:0}}function glslBuiltinUnary(e){return{body:`
  float ${e}_(float a) {
    return ${e}(a);
  }
  vec4 ${e}_(vec4 v) {
    return ${e}(v);
  }
  `,name:e,type:0}}var createElementwiseProgramInfo,createElementwiseProgramInfoLoader,abs,acos,asin,atan,clip,parseClipAttributes,clipV11,generateClipAttributesFromInputs,ceil,cos,elu,parseEluAttributes,exp,floor,identity,leakyRelu,parseLeakyReluAttributes,log2,neg,not2,relu,sigmoid,sin,sqrt,tan,tanh,init_unary_op=__esm({"web/lib/onnxjs/backends/webgl/ops/unary-op.ts"(){init_attribute_with_cache_key(),init_util(),init_glsl_definitions(),init_glsl_source(),init_types(),createElementwiseProgramInfo=(e,t,r,o)=>{const u=e.session.pack?2:0,l=getGlsl(e.session.backend.glContext.version);return{...t,output:{dims:r.dims,type:r.type,textureType:u},shaderSource:`
     ${o.body}
     void main() {
       vec4 v = ${l.texture2D}(A, TexCoords);
       v = ${o.name}_(v);
       ${l.output} = v;
     }
     `,hasMain:!0}},createElementwiseProgramInfoLoader=(e,t,r,o)=>{const u=e.session.pack?2:0,l={name:r.name,inputTypes:[u],inputNames:["A"],cacheHint:o};return{...l,get:()=>createElementwiseProgramInfo(e,l,t,r)}},abs=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslAbs()),t)],acos=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslAcos()),t)],asin=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslAsin()),t)],atan=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslAtan()),t)],clip=(e,t,r)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslClip(r.min,r.max),r.cacheKey),t)],parseClipAttributes=e=>createAttributeWithCacheKey({min:e.attributes.getFloat("min",MIN_CLIP),max:e.attributes.getFloat("max",MAX_CLIP)}),clipV11=(e,t)=>{const r=generateClipAttributesFromInputs(e,t);return clip(e,[t[0]],r)},generateClipAttributesFromInputs=(e,t)=>{if(t.length>=3&&(!e.session.isInitializer(t[1].dataId)||!e.session.isInitializer(t[2].dataId)))throw new Error("dynamic clip attributes are not allowed");const r=t.length>=3?t[1].numberData[0]:MIN_CLIP,o=t.length>=3?t[2].numberData[0]:MAX_CLIP;return createAttributeWithCacheKey({min:r,max:o})},ceil=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslCeil()),t)],cos=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslCos()),t)],elu=(e,t,r)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslElu(r.alpha),r.cacheKey),t)],parseEluAttributes=e=>createAttributeWithCacheKey({alpha:e.attributes.getFloat("alpha",1)}),exp=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslExp()),t)],floor=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslFloor()),t)],identity=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslIdentity()),t)],leakyRelu=(e,t,r)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslLeakyRelu(r.alpha),r.cacheKey),t)],parseLeakyReluAttributes=e=>createAttributeWithCacheKey({alpha:e.attributes.getFloat("alpha",.01)}),log2=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslLog()),t)],neg=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslNeg()),t)],not2=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslNot()),t)],relu=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslRelu()),t)],sigmoid=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslSigmoid()),t)],sin=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslSin()),t)],sqrt=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslSqrt()),t)],tan=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslTan()),t)],tanh=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslTanh()),t)]}});function getActivationSnippet(e){let t;switch(e.activation){case"Relu":t=glslRelu();break;case"Sigmoid":t=glslSigmoid();break;case"Clip":t=glslClip(e.clipMin,e.clipMax);break;default:return{activationFunction:"",applyActivation:""}}const r=t.name,o=t.body,u=`value = ${r}_(value);`;return{activationFunction:o,applyActivation:u}}var parseInternalActivationAttributes,init_fuse_utils=__esm({"web/lib/onnxjs/backends/webgl/ops/fuse-utils.ts"(){init_util(),init_unary_op(),parseInternalActivationAttributes=e=>{const t=e.getString("activation","");if(t==="Clip"){const[r,o]=e.getFloats("activation_params",[MIN_CLIP,MAX_CLIP]);return{activation:t,clipMax:o,clipMin:r,activationCacheKey:`${t}:${r},${o}`}}return{activation:t,activationCacheKey:t}}}}),createUnpackedGroupedConvProgramMetadata,createUnpackedGroupedConvProgramInfo,createUnpackedGroupedConvProgramInfoLoader,init_conv_grouped=__esm({"web/lib/onnxjs/backends/webgl/ops/conv-grouped.ts"(){init_instrument(),init_glsl_source(),init_types(),init_conv(),init_fuse_utils(),createUnpackedGroupedConvProgramMetadata=(e,t)=>({name:"GroupedConv",inputNames:e?["X","W","Bias"]:["X","W"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),createUnpackedGroupedConvProgramInfo=(e,t,r,o)=>{const l=t.length>2?"value += getBias(output_channel);":"",c=t[0].dims.slice(),d=t[1].dims.slice(),i=d[0]/o.group;Logger.verbose("GroupedConv",`autpPad:${o.autoPad}, dilations:${o.dilations}, group:${o.group}, kernelShape:${o.kernelShape}, pads:${o.pads}, strides:${o.strides}`);const a=calculateOutputShape(c,d,o.dilations,o.pads,o.strides),n=getGlsl(e.session.backend.glContext.version),{activationFunction:s,applyActivation:p}=getActivationSnippet(o),f=`
  const ivec2 strides = ivec2(${o.strides[0]}, ${o.strides[1]});
  const ivec2 pads = ivec2(${o.pads[0]}, ${o.pads[1]});
  ${s}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;
    ivec2 xRCCorner = coords.zw * strides - pads;
    int group_id = output_channel / ${i};

    float value = 0.0;
    for (int wInChannel = 0; wInChannel < ${d[1]}; wInChannel++) {
      int input_channel = group_id * ${d[1]} + wInChannel;
      for (int wHeight = 0; wHeight < ${d[2]}; wHeight++) {
        int xHeight = xRCCorner.x + wHeight * ${o.dilations[0]};

        if (xHeight < 0 || xHeight >= ${c[2]}) {
          continue;
        }

        for (int wWidth = 0; wWidth < ${d[3]}; wWidth++) {
          int xWidth = xRCCorner.y + wWidth * ${o.dilations[1]};
          if (xWidth < 0 || xWidth >= ${c[3]}) {
            continue;
          }

          float xVal = getX(batch, input_channel, xWidth, xHeight);
          float wVal = getW(output_channel, wInChannel, wWidth, wHeight);
          value += xVal*wVal;
        }
      }
    }
    ${l}
    ${p}
    ${n.output} = vec4(value, .0, .0, .0);
  }
`;return{...r,output:{dims:a,type:t[0].type,textureType:0},shaderSource:f,hasMain:!0}},createUnpackedGroupedConvProgramInfoLoader=(e,t,r)=>{const o=createUnpackedGroupedConvProgramMetadata(t.length>2,r.cacheKey);return{...o,get:()=>createUnpackedGroupedConvProgramInfo(e,t,o,r)}}}}),createPackedIm2ColProgramMetadata,createPackedIm2ColProgramInfo,createPackedIm2ColProgramInfoLoader,init_im2col_pack=__esm({"web/lib/onnxjs/backends/webgl/ops/im2col-pack.ts"(){init_glsl_source(),init_types(),init_packing_utils(),createPackedIm2ColProgramMetadata=e=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:e}),createPackedIm2ColProgramInfo=(e,t,r,o,u,l)=>{const c=r.dims,d=o.dims,i=2,a=3,n=u.length,s=[d[1]*d[2]*d[3],u[2]*u[3]],p=d[2]*d[3],f=unpackFromChannel(),h=getGlsl(e.session.backend.glContext.version);let m="";for(let y=0;y<=1;y++)for(let g=0;g<=1;g++)m+=`
            blockIndex = rc.x + ${g};
            pos = rc.y + ${y};

            if(blockIndex < ${s[1]} && pos < ${s[0]}) {
              offsetY = int(blockIndex / (${u[n-1]})) * ${l.strides[0]} -
                ${l.pads[0]};
              d0 = offsetY + ${l.dilations[0]} * (imod(pos, ${p}) / ${d[2]});

              if(d0 < ${c[i]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${u[n-1]}) * ${l.strides[1]} -
                  ${l.pads[1]};
                d1 = offsetX + ${l.dilations[1]} * imod(imod(pos, ${p}), ${d[2]});

                if(d1 < ${c[a]} && d1 >= 0) {

                  ch = int(float(pos)/ ${p}.);
                    innerDims = vec2(d0, d1);
                    result[${y*2+g}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;const _=`
      ${f}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${m}
          ${h.output} = result;
      }
            `;return{...t,output:{dims:s,type:r.type,textureType:2},shaderSource:_,hasMain:!0}},createPackedIm2ColProgramInfoLoader=(e,t,r,o,u)=>{const l=createPackedIm2ColProgramMetadata(u.cacheKey);return{...l,get:()=>createPackedIm2ColProgramInfo(e,l,t,r,o,u)}}}});function createMatmulProgramInfo(e,t,r){const o=t[0].dims,u=t[1].dims,l=BroadcastUtil.calcShape(o,u,!0);if(!l)throw new Error("Can't use matmul on the given tensors");const c=getCoordsDataType(l.length),d=getGlChannels(),{activationFunction:i,applyActivation:a}=getActivationSnippet(r),n=t.length>2,s=n?"value += getBiasForMatmul();":"",p=n?`${getBiasForMatmul(c,d,t[2].dims,l,!1)}`:"",f=l.length,h=o.length,m=u.length,_=o[o.length-1],y=`
    ${i}
    ${p}
    float process(int indices[${f}]) {
        int a[${h}];
        int b[${m}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${_}; ++k) {
            a[${h-1}] = k;
            b[${m-2}] = k;
            value += _A(a) * _B(b);
        }
        ${s}
        ${a}
        return value;
    }`;return{...e,output:{dims:l,type:t[0].type,textureType:0},shaderSource:y}}function createMatmulProgramInfoLoader(e,t){const r=createMatmulProgramMetadata(e.length>2,t.activationCacheKey);return{...r,get:()=>createMatmulProgramInfo(r,e,t)}}function getBiasForMatmul(e,t,r,o,u){let l="";const c=r.length,d=o.length,i=d-c;d<2&&c>0?l="coords":l=r.map((m,_)=>`coords.${t[_+i]}`).join(", ");const n=BroadcastUtil.getBroadcastDims(r,o).map(m=>`coords.${t[m+i]} = 0;`).join(`
`),p=ShapeUtil.size(r)===1;let f="vec4(outputValue.xx, outputValue.yy)";return p&&(f="vec4(outputValue.x)"),u?`
vec4 getBiasForMatmul() {
  ${e} coords = getOutputCoords();
  ${n}
  vec4 outputValue = getBias(${l});
  return ${f};
}`:`
float getBiasForMatmul() {
  ${e} coords = getOutputCoords();
  ${n}
  return getBias(coords.x);
}`}var matMul,parseMatMulAttributes,createMatmulProgramMetadata,validateInputs4,init_matmul=__esm({"web/lib/onnxjs/backends/webgl/ops/matmul.ts"(){init_util(),init_types(),init_utils(),init_fuse_utils(),init_matmul_pack(),matMul=(e,t,r)=>(validateInputs4(t),e.session.pack?[e.run(createPackedMatmulProgramInfoLoader(e,t,r),t)]:[e.run(createMatmulProgramInfoLoader(t,r),t)]),parseMatMulAttributes=e=>parseInternalActivationAttributes(e.attributes),createMatmulProgramMetadata=(e,t)=>({name:"MatMul",inputNames:e?["A","B","Bias"]:["A","B"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),validateInputs4=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.");if(e[0].type!=="float32"&&e[0].type!=="float64"||e[1].type!=="float32"&&e[1].type!=="float64")throw new Error("inputs should be float type");if(e[0].type!==e[1].type)throw new Error("inputs types should match")}}});function getBcastSamplerForMatmul(e,t,r,o){let u=[],l=[];const c=r[0].dims,d=r[1].dims,i=c.length,a=d.length,n=o.length,s=n-i,p=n-a;u=c.map((b,v)=>`coords.${t[v+s]}`),u[i-1]="i*2",u.join(", "),l=d.map((b,v)=>`coords.${t[v+p]}`),l[a-2]="i*2",l.join(", ");const f=BroadcastUtil.getBroadcastDims(c,o),h=BroadcastUtil.getBroadcastDims(d,o),m=f.map(b=>`coords.${t[b+s]} = 0;`).join(`
`),_=h.map(b=>`coords.${t[b+p]} = 0;`).join(`
`),y=`int lastDim = coords.${t[n-1]};
  coords.${t[n-1]} = coords.${t[n-2]};
  coords.${t[n-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${e} coords = getOutputCoords();
  ${y}
  ${m}
  vec4 outputValue = getA(${u});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${e} coords = getOutputCoords();
  ${y}
  ${_}
  vec4 outputValue = getB(${l});
  return outputValue;
}`}function getA(e,t){let r="";for(let o=0;o<t-2;o++)r+=`rc.${e[o]}, `;return r+=`rc.${e[t-2]}, i*2`,r}function getB(e,t){let r="";for(let o=0;o<t-2;o++)r+=`rc.${e[o]}, `;return r+=`i*2, rc.${e[t-1]}`,r}var createPackedMatmulProgramMetadata,createPackedMatmulProgramInfo,createPackedMatmulProgramInfoLoader,init_matmul_pack=__esm({"web/lib/onnxjs/backends/webgl/ops/matmul-pack.ts"(){init_util(),init_glsl_source(),init_types(),init_utils(),init_fuse_utils(),init_matmul(),createPackedMatmulProgramMetadata=(e,t)=>({name:"MatMul (packed)",inputNames:e?["A","B","Bias"]:["A","B"],inputTypes:e?[2,2,2]:[2,2],cacheHint:t}),createPackedMatmulProgramInfo=(e,t,r,o)=>{const u=r.length>2,l=u?"value += getBiasForMatmul();":"",c=r[0].dims,d=r[1].dims,i=BroadcastUtil.calcShape(c,d,!0),a=!ShapeUtil.areEqual(r[0].dims,r[1].dims);if(!i)throw new Error("Can't use matmul on the given tensors");const n=c[c.length-1],s=Math.ceil(n/2),p=c.length,f=d.length,h=getGlsl(e.session.backend.glContext.version),m=getCoordsDataType(i.length),_=i.length,y=getGlChannels(),{activationFunction:g,applyActivation:b}=getActivationSnippet(o),v=u?`${getBiasForMatmul(m,y,r[2].dims,i,!0)}`:"",w=a?`${getBcastSamplerForMatmul(m,y,r,i)}`:"",x=a?"getAAtOutCoordsMatmul(i)":`getA(${getA(y,p)})`,S=a?"getBAtOutCoordsMatmul(i)":`getB(${getB(y,f)})`,T=a?"":`${m} rc =
          getOutputCoords(); int lastDim = rc.${y[_-1]}; rc.${y[_-1]} =
          rc.${y[_-2]}; rc.${y[_-2]} = lastDim;
      `,I=`
            ${w}
            ${v}
            ${g}
            void main() {
              ${T}

              vec4 value = vec4(0);
              for (int i = 0; i < ${s}; i++) {
                vec4 a = ${x};
                vec4 b = ${S};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${l}
              ${b}
              ${h.output} = value;
            }`;return{...t,output:{dims:i,type:r[0].type,textureType:2},shaderSource:I,hasMain:!0}},createPackedMatmulProgramInfoLoader=(e,t,r)=>{const o=createPackedMatmulProgramMetadata(t.length>2,r.activationCacheKey);return{...o,get:()=>createPackedMatmulProgramInfo(e,o,t,r)}}}}),conv2DPacked,init_conv_pack=__esm({"web/lib/onnxjs/backends/webgl/ops/conv-pack.ts"(){init_conv(),init_im2col_pack(),init_matmul_pack(),conv2DPacked=(e,t,r)=>{const o=t[0].dims,u=t[1].dims,l=calculateOutputShape(o,u,r.dilations,r.pads,r.strides),c=e.run(createPackedIm2ColProgramInfoLoader(e,t[0],t[1],l,r),[t[0]]),d=e.reshapePacked(t[1],[u[0],u[1]*u[2]*u[3]]),i=t.length===3?[d,c,t[2]]:[d,c],a=e.run(createPackedMatmulProgramInfoLoader(e,i,r),i);return e.reshapePacked(a,l)}}}),createIm2ColProgramMetadata,createIm2ColProgramInfo,createIm2ColProgramInfoLoader,calculateIm2ColDims,init_im2col=__esm({"web/lib/onnxjs/backends/webgl/ops/im2col.ts"(){init_types(),createIm2ColProgramMetadata=e=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:e}),createIm2ColProgramInfo=(e,t,r,o,u,l)=>{const c=r.dims,d=o.dims,i=u.length,a=calculateIm2ColDims(c,d,u,4),n=`
        const int XC = ${c[1]};
        const int XH = ${c[2]};
        const int XW = ${c[3]};
        const int KH = ${l.kernelShape[0]};
        const int KW = ${l.kernelShape[1]};
        const int dilationH = ${l.dilations[0]};
        const int dilationW = ${l.dilations[1]};
        const int strideH = ${l.strides[0]};
        const int strideW = ${l.strides[1]};
        const int padH = ${l.pads[0]};
        const int padW = ${l.pads[1]};
        const int KHKW = KH*KW;
        const int XCKHKW = XC * KHKW;
        const int outputChannels = 4;
        vec4 process(int indices[${i}]) {
          int b  = indices[0]; // batch size
          int oh = indices[1] * strideH - padH; //output height
          int ow = indices[2] * strideW - padW; //output width
          int p = indices[3] * outputChannels; //patch
          vec4 value = vec4(0.0);
          for(int i=0; i < outputChannels; ++i) {
            if(p < XCKHKW) {
              int patchC = p / KHKW;
              int patchH = (p - patchC*KHKW) / KW;
              int patchW = (p - patchC*KHKW) - patchH * KW;
              int xh2 = oh + patchH * dilationH;
              int xw2 = ow + patchW * dilationW;
              int x[${c.length}];
              x[0] = b;
              x[1] = patchC;
              x[2] = xh2;
              x[3] = xw2;
              if(xh2 >= 0 &&
                  xh2 < XH &&
                  xw2 >= 0 &&
                  xw2 < XW) {
                value[i] = _X(x);
              }
            }
            ++p;
          }
          return value;
        }
        `;return{...t,output:{dims:a,type:r.type,textureType:4},shaderSource:n}},createIm2ColProgramInfoLoader=(e,t,r,o,u)=>{const l=createIm2ColProgramMetadata(u.cacheKey);return{...l,get:()=>createIm2ColProgramInfo(e,l,t,r,o,u)}},calculateIm2ColDims=(e,t,r,o=4)=>[r[0],r[2],r[3],Math.ceil(e[1]*t[2]*t[3]/o)]}}),createDotProductProgramMetadata,createDotProductProgramInfo,createDotProductProgramInfoLoader,init_dot_product=__esm({"web/lib/onnxjs/backends/webgl/ops/dot-product.ts"(){init_util(),init_glsl_source(),init_types(),init_fuse_utils(),init_im2col(),createDotProductProgramMetadata=(e,t)=>({name:"ConvDotProduct",inputNames:e?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:e?[0,4,0]:[0,4],cacheKey:t.activationCacheKey}),createDotProductProgramInfo=(e,t,r,o,u)=>{const l=r[0].dims,c=r[1].dims,d=[c[0],Math.ceil(l[1]*c[2]*c[3]/4)],i=calculateIm2ColDims(l,c,o),[a,n]=e.calculateTextureWidthAndHeight(d,4),s=ShapeUtil.computeStrides(i),[p,f]=e.calculateTextureWidthAndHeight(i,4),h=o.length,m=r.length<3?"0.0":"_B(b)",_=Math.ceil(l[1]*c[2]*c[3]/4),{activationFunction:y,applyActivation:g}=getActivationSnippet(u),b=getGlsl(e.session.backend.glContext.version),v=`
${y}
float process(int indices[${h}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${s[0]} + im2col[1] * ${s[1]} + im2col[2] * ${s[2]};
  int kernelOffset = indices[1] * ${d[1]};
  float value = ${m};
  for (int i = 0; i < ${_}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${p}, ${f});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${a}, ${n});
    value += dot(${b.texture2D}(Im2Col, im2colCoords), ${b.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${g}
  return value;
}`;return{...t,output:{dims:o,type:r[0].type,textureType:0},shaderSource:v}},createDotProductProgramInfoLoader=(e,t,r,o)=>{const u=createDotProductProgramMetadata(t.length>2,o);return{...u,get:()=>createDotProductProgramInfo(e,u,t,r,o)}}}}),calculateOutputShape,conv,conv2d,conv2DUnpackedPointwise,conv2DUnpacked,getAdjustedConvAttributes,parseConvAttributes,validateInputs5,init_conv=__esm({"web/lib/onnxjs/backends/webgl/ops/conv.ts"(){init_attribute_with_cache_key(),init_util(),init_conv_grouped(),init_conv_pack(),init_dot_product(),init_fuse_utils(),init_im2col(),init_matmul(),calculateOutputShape=(e,t,r,o,u)=>{const l=e[0],c=e.slice(2),d=c.length,i=t[0],n=t.slice(2).map((h,m)=>h+(h-1)*(r[m]-1)),p=c.map((h,m)=>h+o[m]+o[m+d]).map((h,m)=>Math.floor((h-n[m]+u[m])/u[m]));return[l,i].concat(...p)},conv=(e,t,r)=>(validateInputs5(t,r),conv2d(e,t,r)),conv2d=(e,t,r)=>{const o=getAdjustedConvAttributes(r,t),u=e.session.pack,l=o.kernelShape[0]===1&&o.kernelShape[1]===1;return o.group>1?[e.run(createUnpackedGroupedConvProgramInfoLoader(e,t,o),t)]:l&&u?[conv2DUnpackedPointwise(e,t,o)]:u&&t[0].dims.length===4&&t[0].dims[0]===1&&!l?[conv2DPacked(e,t,o)]:[conv2DUnpacked(e,t,o)]},conv2DUnpackedPointwise=(e,t,r)=>{const o=t[0].dims,u=t[1].dims,l=calculateOutputShape(o,u,r.dilations,r.pads,r.strides),c=e.reshapeUnpacked(t[0],[o[1],o[2]*o[3]]),d=e.reshapeUnpacked(t[1],[u[0],u[1]]),i=t.length>2?[d,c,t[2]]:[d,c],a=e.run(createMatmulProgramInfoLoader(i,r),i);return e.reshapeUnpacked(a,l)},conv2DUnpacked=(e,t,r)=>{const o=t[0].dims,u=t[1].dims,l=calculateOutputShape(o,u,r.dilations,r.pads,r.strides),c=e.run(createIm2ColProgramInfoLoader(e,t[0],t[1],l,r),[t[0]]),d=t.length===3?[c,t[1],t[2]]:[c,t[1]];return e.run(createDotProductProgramInfoLoader(e,t,l,r),d)},getAdjustedConvAttributes=(e,t)=>{const r=e.kernelShape.slice();if(e.kernelShape.length===0)for(let l=2;l<t[1].dims.length;++l)r.push(t[1].dims[l]);const o=e.pads.slice();PoolConvUtil.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,o,e.autoPad);const u=Object.assign({},e);return Object.assign(u,{kernelShape:r,pads:o,cacheKey:e.cacheKey}),u},parseConvAttributes=e=>{const t=e.attributes,r=parseInternalActivationAttributes(t),o=t.getString("auto_pad","NOTSET"),u=t.getInts("dilations",[1,1]),l=t.getInt("group",1),c=t.getInts("kernel_shape",[]),d=t.getInts("pads",[0,0,0,0]),i=t.getInts("strides",[1,1]);return createAttributeWithCacheKey({autoPad:o,dilations:u,group:l,kernelShape:c,pads:d,strides:i,...r})},validateInputs5=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4||e[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");const r=e[0].dims[1],o=e[1].dims[1]*t.group;if(r!==o)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");const u=e[0].dims.length-2;if(t.dilations.length!==u)throw new Error(`dilations should be ${u}D`);if(t.strides.length!==u)throw new Error(`strides should be ${u}D`);if(t.pads.length!==u*2)throw new Error(`pads should be ${u*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(e[0].type!=="float32"||e[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(e.length===3&&e[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}}}),computeTotalPad,distributePadding,calculateOutputShapeAndPads,convTranspose,convTranspose2d,createConvTransposeProgramMetadata,createUnpackedConvTransposeProgramInfo,createUnpackedConvTransposeProgramInfoLoader,convTranspose2DUnpacked,getAdjustedConvTransposeAttributes,parseConvTransposeAttributes,validateInputs6,init_conv_transpose=__esm({"web/lib/onnxjs/backends/webgl/ops/conv-transpose.ts"(){init_attribute_with_cache_key(),init_glsl_source(),init_types(),init_fuse_utils(),computeTotalPad=(e,t,r,o,u,l)=>(e-1)*t+r+(o-1)*u+1-l,distributePadding=(e,t,r,o,u)=>{const l=Math.floor(e/2);t==="SAME_UPPER"?(r[o]=l,r[u]=e-l):t==="SAME_LOWER"&&(r[o]=e-l,r[u]=l)},calculateOutputShapeAndPads=(e,t,r,o,u,l,c,d)=>{const i=e.length-2,a=d.length===0;for(let n=0;n<i;++n){const s=a?e[n+2]*l[n]:d[n],p=computeTotalPad(e[n+2],l[n],u[n],t[n],r[n],s);distributePadding(p,o,u,n,n+i),a&&d.push(l[n]*(e[n+2]-1)+c[n]+(t[n]-1)*r[n]+1-u[n]-u[n+i])}},convTranspose=(e,t,r)=>(validateInputs6(t,r),convTranspose2d(e,t,r)),convTranspose2d=(e,t,r)=>{const o=getAdjustedConvTransposeAttributes(r,t);return[convTranspose2DUnpacked(e,t,o)]},createConvTransposeProgramMetadata=(e,t)=>({name:"ConvTranspose",inputNames:e?["X","W","B"]:["X","W"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),createUnpackedConvTransposeProgramInfo=(e,t,r,o)=>{const l=t.length>2?"getB(output_channel)":"0.0",c=t[0].dims,d=t[1].dims,i=d[1],a=d[0]/o.group,n=[t[0].dims[0],t[1].dims[1]*o.group,...o.outputShape],s=getGlsl(e.session.backend.glContext.version),{activationFunction:p,applyActivation:f}=getActivationSnippet(o),h=`
  const ivec2 strides = ivec2(${o.strides[0]}, ${o.strides[1]});
  const ivec2 pads = ivec2(${o.pads[0]}, ${o.pads[1]});
  ${p}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;

    ivec2 loc = coords.zw + pads;

    int group_id = output_channel / ${i};
    int wOutChannel = output_channel - group_id * ${i};

    float value = ${l};
    for (int inChannelOffset = 0; inChannelOffset < ${a}; inChannelOffset++) {
      int input_channel = group_id * ${a} + inChannelOffset;
      for (int wWOff = 0; wWOff < ${d[2]}; wWOff++) {
        for (int wHOff = 0; wHOff < ${d[3]}; wHOff++) {
          ivec2 wOff = ivec2(wWOff * ${o.dilations[0]}, wHOff * ${o.dilations[1]});
          ivec2 wLoc = loc - wOff;
          ivec2 wLocIn = wLoc / strides;
          if (
            wLocIn * strides == wLoc &&
            wLocIn.x >= 0 && wLocIn.x < ${c[2]} &&
            wLocIn.y >= 0 && wLocIn.y < ${c[3]}
          ) {
            float xVal = getX(batch, input_channel, wLocIn.y, wLocIn.x);
            float wVal = getW(input_channel, wOutChannel, wHOff, wWOff);
            value += xVal * wVal;
          }
        }
      }
    }
    ${f}
    ${s.output} = vec4(value, .0, .0, .0);
  }
`;return{...r,output:{dims:n,type:t[0].type,textureType:0},shaderSource:h,hasMain:!0}},createUnpackedConvTransposeProgramInfoLoader=(e,t,r)=>{const o=createConvTransposeProgramMetadata(t.length>2,r.cacheKey);return{...o,get:()=>createUnpackedConvTransposeProgramInfo(e,t,o,r)}},convTranspose2DUnpacked=(e,t,r)=>e.run(createUnpackedConvTransposeProgramInfoLoader(e,t,r),t),getAdjustedConvTransposeAttributes=(e,t)=>{const r=e.kernelShape.slice();if(e.kernelShape.length===0)for(let d=2;d<t[1].dims.length;++d)r.push(t[1].dims[d]);const o=e.pads.slice(),u=e.outputShape.slice(),l=t[0].dims;calculateOutputShapeAndPads(l,r,e.dilations,e.autoPad,o,e.strides,e.outputPadding,u);const c=Object.assign({},e);return Object.assign(c,{kernelShape:r,pads:o,outputShape:u,cacheKey:e.cacheKey}),c},parseConvTransposeAttributes=e=>{const t=e.attributes,r=parseInternalActivationAttributes(t),o=t.getString("auto_pad","NOTSET"),u=t.getInts("dilations",[1,1]),l=t.getInt("group",1),c=t.getInts("kernel_shape",[]),d=t.getInts("output_padding",[0,0]),i=t.getInts("output_shape",[]),a=t.getInts("pads",[0,0,0,0]),n=t.getInts("strides",[1,1]);return createAttributeWithCacheKey({autoPad:o,dilations:u,group:l,kernelShape:c,outputPadding:d,outputShape:i,pads:a,strides:n,...r})},validateInputs6=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4||e[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");const r=e[0].dims[1],o=e[1].dims[0];if(r!==o)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");const u=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==u))throw new Error("invalid bias");const l=e[0].dims.length-2;if(t.dilations.length!==l)throw new Error(`dilations should be ${l}D`);if(t.strides.length!==l)throw new Error(`strides should be ${l}D`);if(t.pads.length!==l*2)throw new Error(`pads should be ${l*2}D`);if(t.outputPadding.length!==l)throw new Error(`output_padding should be ${l}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape");if(e[0].type!=="float32"||e[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(e.length===3&&e[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}}}),transposeProgramMetadata,transpose,parseTransposeAttributes,createTransposeProgramInfo,getAdjustedPerm,getOutputShape,getPermFunctionBody,validateInputs7,init_transpose=__esm({"web/lib/onnxjs/backends/webgl/ops/transpose.ts"(){init_attribute_with_cache_key(),init_util(),init_types(),transposeProgramMetadata={name:"Transpose",inputNames:["A"],inputTypes:[0]},transpose=(e,t,r)=>(validateInputs7(t),[e.run({...transposeProgramMetadata,cacheHint:r.cacheKey,get:()=>createTransposeProgramInfo(e,t[0],r.perm)},t)]),parseTransposeAttributes=e=>createAttributeWithCacheKey({perm:e.attributes.getInts("perm",[])}),createTransposeProgramInfo=(e,t,r)=>{const o=t.dims;r=getAdjustedPerm(o,r);const u=getOutputShape(o,r),l=o.length,c=`
      ${getPermFunctionBody("perm",r,l)}
      float process(int indices[${l}]) {
        int a[${l}];
        perm(a, indices);
        return _A(a);
      }`;return{...transposeProgramMetadata,output:{dims:u,type:t.type,textureType:0},shaderSource:c}},getAdjustedPerm=(e,t)=>(t&&t.length!==e.length&&(t=[...e.keys()].reverse()),t),getOutputShape=(e,t)=>(t=getAdjustedPerm(e,t),ShapeUtil.sortBasedOnPerm(e,t)),getPermFunctionBody=(e,t,r)=>{const o=[];o.push(`void ${e}(out int a[${r}], int src[${r}]) {`);for(let u=0;u<r;++u)o.push(`	a[${t[u]}]=src[${u}];`);return o.push("	}"),o.join(`
`)},validateInputs7=e=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(e[0].type!=="float32"&&e[0].type!=="float64")throw new Error("input should be float tensor")}}}),depthToSpace,parseDepthToSpaceAttributes,validateInputs8,init_depth_to_space=__esm({"web/lib/onnxjs/backends/webgl/ops/depth-to-space.ts"(){init_transpose(),depthToSpace=(e,t,r)=>{validateInputs8(t);const o=r.blocksize,u=o*o,l=r.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],c=r.mode==="DCR"?[t[0].dims[0],o,o,t[0].dims[1]/u,t[0].dims[2],t[0].dims[3]]:[t[0].dims[0],t[0].dims[1]/u,o,o,t[0].dims[2],t[0].dims[3]],d=e.reshapeUnpacked(t[0],c),i={perm:l,cacheKey:`${l}`},[a]=transpose(e,[d],i),n=[t[0].dims[0],t[0].dims[1]/u,t[0].dims[2]*o,t[0].dims[3]*o];return[e.reshapeUnpacked(a,n)]},parseDepthToSpaceAttributes=e=>{const t=e.attributes.getInt("blocksize");if(t<1)throw new Error(`blocksize must be >= 1, but got : ${t} for DepthToSpace`);const r=e.attributes.getString("mode","DCR");if(r!=="DCR"&&r!=="CRD")throw new Error(`unrecognized mode: ${r} for DepthToSpace`);return{mode:r,blocksize:t}},validateInputs8=e=>{if(e.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${e.length}`);if(e[0].type==="string"||e[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}}}),flatten,parseFlattenAttributes,validateInputs9,init_flatten=__esm({"web/lib/onnxjs/backends/webgl/ops/flatten.ts"(){init_util(),flatten=(e,t,r)=>{validateInputs9(t,r);const o=ShapeUtil.flattenShape(t[0].dims,r);return[e.reshapeUnpacked(t[0],o)]},parseFlattenAttributes=e=>e.attributes.getInt("axis",1),validateInputs9=(e,t)=>{if(!e||e.length!==1)throw new Error("Flatten requires 1 input.");const r=e[0].dims.length;if(r===0)throw new Error("scalar tensor is not supported.");if(t<-r||t>r)throw new Error("Invalid axis");if(e[0].type==="string")throw new Error("string tensor is not supported.")}}}),NUMBER_TYPES,init_operators=__esm({"web/lib/onnxjs/operators.ts"(){NUMBER_TYPES=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]}}),gather,parseGatherAttributes,gatherProgramMetadata,createGatherProgramInfo,createGatherProgramInfoLoader,validateInputs10,init_gather=__esm({"web/lib/onnxjs/backends/webgl/ops/gather.ts"(){init_attribute_with_cache_key(),init_operators(),init_util(),init_types(),gather=(e,t,r)=>(validateInputs10(t,r.axis),[e.run(createGatherProgramInfoLoader(e,t,r),t)]),parseGatherAttributes=e=>createAttributeWithCacheKey({axis:e.attributes.getInt("axis",0)}),gatherProgramMetadata={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},createGatherProgramInfo=(e,t,r,o)=>{const u=r[0].dims.slice(),l=r[1].dims.slice(),c=new Array(u.length+l.length-1);o=ShapeUtil.normalizeAxis(o,u.length);const d=[];for(let p=0;p<c.length;p++)p<o?(c[p]=u[p],d.push(`inputIdx[${p}] = outputIdx[${p}];`)):p<o+l.length?(c[p]=l[p-o],d.push(`indexDataIdx[${p-o}] = outputIdx[${p}];`)):(c[p]=u[p-l.length+1],d.push(`inputIdx[${p-l.length+1}] = outputIdx[${p}];`));const i=c.length||1,a=u.length,n=l.length||1,s=`
      float process(int outputIdx[${i}]) {
        int inputIdx[${a}];
        int indexDataIdx[${n}];
        indexDataIdx[0] = 0;
        ${d.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${o}] = idx < 0 ? idx + ${u[o]} : idx;
        return _A(inputIdx);
      }`;return{...t,output:{dims:c,type:r[0].type,textureType:0},shaderSource:s}},createGatherProgramInfoLoader=(e,t,r)=>{const o={...gatherProgramMetadata,cacheHint:r.cacheKey};return{...o,get:()=>createGatherProgramInfo(e,o,t,r.axis)}},validateInputs10=(e,t)=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.");const r=e[0].dims.length;if(r<1)throw new Error("Invalid input shape.");if(t<-r||t>r-1)throw new Error("Invalid axis.");if(NUMBER_TYPES.indexOf(e[0].type)===-1)throw new Error("Invaid input type.");if(e[1].type!=="int32"&&e[1].type!=="int16")throw new Error("Invaid input type.")}}}),gemm,parseGemmAttributes,parseGemmAttributesV7,parseGemmAttributesV11,createGemmProgramInfoLoader,createGemmProgramInfo,validateInputs11,init_gemm=__esm({"web/lib/onnxjs/backends/webgl/ops/gemm.ts"(){init_attribute_with_cache_key(),init_util(),init_types(),gemm=(e,t,r)=>(validateInputs11(t,r),[e.run(createGemmProgramInfoLoader(t,r),t)]),parseGemmAttributes=(e,t)=>{const r=e.attributes.getInt("transA",0)!==0,o=e.attributes.getInt("transB",0)!==0,u=e.attributes.getFloat("alpha",1),l=e.attributes.getFloat("beta",1);return createAttributeWithCacheKey({transA:r,transB:o,alpha:u,beta:l,isOptionalC:t})},parseGemmAttributesV7=e=>parseGemmAttributes(e,!1),parseGemmAttributesV11=e=>parseGemmAttributes(e,!0),createGemmProgramInfoLoader=(e,t)=>{const r={name:"Gemm",inputNames:e.length===3?["A","B","C"]:["A","B"],inputTypes:e.length===3?[0,0,0]:[0,0],key:t.cacheKey};return{...r,get:()=>createGemmProgramInfo(r,e,t)}},createGemmProgramInfo=(e,t,r)=>{const o=t[0].dims.slice(),u=t[1].dims.slice(),[l,c]=GemmUtil.getShapeOfGemmResult(o,r.transA,u,r.transB,t.length===3?t[2].dims:void 0),d=[l,c];if(!d)throw new Error("Can't use gemm on the given tensors");let i=o[o.length-1],a="";r.transA&&(i=o[0]),r.transA&&r.transB?a="value += _A_T(a) * _B_T(b);":r.transA&&!r.transB?a="value += _A_T(a) * _B(b);":!r.transA&&r.transB?a="value += _A(a) * _B_T(b);":!r.transA&&!r.transB&&(a="value += _A(a) * _B(b);");const n=d.length,s=t.length===3?`int c[${t[2].dims.length}];`:"",p=t.length===3?"bcastIndices_C(indices, c);":"",f=t.length===3?"value += beta * _C(c);":"",h=`
      float process(int indices[${n}]) {
          int a[${n}];
          int b[${n}];
          ${s}

          copyVec(indices, a);
          copyVec(indices, b);
          ${p}

          float value = 0.0;
          for (int k=0; k<${i}; ++k) {
              a[${n-1}] = k;
              b[${n-2}] = k;
              ${a}
          }

          value = value * alpha;
          ${f}
          return value;
      }`;return{...e,output:{dims:d,type:t[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:r.alpha},{name:"beta",type:"float",data:r.beta}],shaderSource:h}},validateInputs11=(e,t)=>{if(!e)throw new Error("Input is missing");if(t.isOptionalC&&(e.length<2||e.length>3))throw new Error("Invaid input shape.");if(!t.isOptionalC&&e.length!==3)throw new Error("Gemm requires 3 inputs");if(e.length===3&&e[2].dims.length!==1&&e[2].dims.length!==2)throw new Error("Invalid input shape of C");if(e[0].type!=="float32"&&e[0].type!=="float64"||e[1].type!=="float32"&&e[1].type!=="float64"||e.length===3&&e[2].type!=="float32"&&e[2].type!=="float64")throw new Error("Invalid input type.");if(e[0].type!==e[1].type||e.length===3&&e[0].type!==e[2].type)throw new Error("Input types are mismatched")}}}),imageScaler,parseImageScalerAttributes,imageScalerProgramMetadata,createImageScalerProgramInfo,createImageScalerProgramInfoLoader,createGetBiasMethod,validateInputs12,init_image_scaler=__esm({"web/lib/onnxjs/backends/webgl/ops/image-scaler.ts"(){init_attribute_with_cache_key(),init_types(),imageScaler=(e,t,r)=>(validateInputs12(t),[e.run(createImageScalerProgramInfoLoader(e,t,r),t)]),parseImageScalerAttributes=e=>{const t=e.attributes.getFloat("scale"),r=e.attributes.getFloats("bias");return createAttributeWithCacheKey({scale:t,bias:r})},imageScalerProgramMetadata={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},createImageScalerProgramInfo=(e,t,r,o)=>{const u=r[0].dims.slice(),l=u.length,d=`
      ${createGetBiasMethod(o.bias.length)}
      float process(int indices[${l}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...t,output:{dims:u,type:r[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:o.bias.length,data:o.bias},{name:"scale",type:"float",data:o.scale}],shaderSource:d}},createImageScalerProgramInfoLoader=(e,t,r)=>{const o={...imageScalerProgramMetadata,cacheHint:r.cacheKey};return{...o,get:()=>createImageScalerProgramInfo(e,o,t,r)}},createGetBiasMethod=e=>{const t=[`float getBias(float bias[${e}], int channel) {`];for(let r=0;r<e;++r)r===0?t.push(`	if (channel == ${r}) { return bias[${r}]; }`):r===e-1?t.push(`	else { return bias[${r}]; }`):t.push(`	else if (channel == ${r}) { return bias[${r}]; }`);return t.push("	}"),t.join(`
`)},validateInputs12=e=>{if(!e||e.length!==1)throw new Error("ImageScaler requires 1 input.");if(e[0].dims.length!==4)throw new Error("Invalid input shape.");if(e[0].type!=="float32"&&e[0].type!=="float64")throw new Error("Invalid input type.")}}}),instanceNormalization,parseInstanceNormalizationAttributes,meanAndVarianceProgramMetadata,createMeanAndVarianceProgramInfo,createMeanAndVarianceProgramInfoLoader,computeOutputProgramMetadata,createComputeOutputProgramInfo,createComputeOutputProgramInfoLoader,validateInputs13,init_instance_normalization=__esm({"web/lib/onnxjs/backends/webgl/ops/instance-normalization.ts"(){init_glsl_source(),init_types(),instanceNormalization=(e,t,r)=>{validateInputs13(t);const o=e.run(createMeanAndVarianceProgramInfoLoader(t[0]),t);return[e.run(createComputeOutputProgramInfoLoader(e,t[0],r,o.dims),[t[0],o,t[1],t[2]])]},parseInstanceNormalizationAttributes=e=>e.attributes.getFloat("epsilon",1e-5),meanAndVarianceProgramMetadata={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},createMeanAndVarianceProgramInfo=(e,t)=>{const r=t.dims.slice(),o=r[1],u=r[2]*r[3],l=[r[0],o],c=`
      vec4 process(int[2] indices) {
        vec4 v = vec4(0.0);
        int a[4];
        a[0] = indices[0];
        a[1] = indices[1];
        float temp = 0.0;
        for(int a2=0; a2<${r[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${r[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += x;
          }
        }
        float mean = temp / float(${u});
        temp = 0.0;
        for(int a2=0; a2<${r[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${r[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += (x - mean) * (x - mean);
          }
        }
        v.r = mean;
        v.g = temp / float(${u});

        return v;
      }`;return{...e,output:{dims:l,type:t.type,textureType:4},shaderSource:c}},createMeanAndVarianceProgramInfoLoader=e=>({...meanAndVarianceProgramMetadata,get:()=>createMeanAndVarianceProgramInfo(meanAndVarianceProgramMetadata,e)}),computeOutputProgramMetadata={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},createComputeOutputProgramInfo=(e,t,r,o,u)=>{const l=getGlsl(e.session.backend.glContext.version),[c,d]=e.calculateTextureWidthAndHeight(u,4),[i,a]=[c/4,d],n=`
      vec4 get_MeanAndVariance(int[2] mv) {
        int offset = indicesToOffset_MeanAndVariance(mv);
        vec2 coords = offsetToCoords(offset, ${i}, ${a});
        return ${l.texture2D}(MeanAndVariance, coords);
      }

      float process(int[4] indices) {
        int mv[2];
        mv[0] = indices[0];
        mv[1] = indices[1];
        vec4 mean_and_variance = get_MeanAndVariance(mv);
        float mean = mean_and_variance.r;
        float variance = mean_and_variance.g;

        int sb[1];
        sb[0] = indices[1];
        float scale = _Scale(sb);
        float b = _B(sb);

        return scale * (_X(indices) - mean) / sqrt(variance + epsilon) + b;
      }`;return{...t,output:{dims:r.dims,type:r.type,textureType:0},variables:[{name:"epsilon",type:"float",data:o}],shaderSource:n}},createComputeOutputProgramInfoLoader=(e,t,r,o)=>{const u={...computeOutputProgramMetadata,cacheHint:`${r}`};return{...u,get:()=>createComputeOutputProgramInfo(e,u,t,r,o)}},validateInputs13=e=>{if(!e||e.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");const t=e[0],r=e[1],o=e[2];if(t.dims.length<3||r.dims.length!==1||o.dims.length!==1)throw new Error("Invalid input shape.");if(r.dims[0]!==t.dims[1]||o.dims[0]!==t.dims[1])throw new Error("Input shapes are mismatched.");if(t.type!=="float32"&&t.type!=="float64"||r.type!=="float32"&&r.type!=="float64"||o.type!=="float32"&&o.type!=="float64")throw new Error("Invalid input type.");if(e[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}}});function createLrnProgramInfo(e,t){const r=e[0].dims[1],o=e[0].dims.length,u=-Math.floor((t.size-1)/2),l=Math.ceil((t.size-1)/2),c=`float(${t.alpha}) / float(${t.size})`,d=`float(${t.bias})`,i=`float(${t.beta})`,a=`
    float process(int indices[${o}]) {
        int c = indices[1];
        float x = _X(indices);
        float square_sum = 0.0;

        for (int i = ${u}; i <= ${l}; i++) {
          int idx = c + i;
          if (c >= 0 && c < ${r}) {
            indices[1] = idx;
            float j = _X(indices);
            square_sum += j * j;
          }
        }
        return x / pow(${d} + ${c} * square_sum, ${i});
    }`;return{...lrnProgramMetadata,cacheHint:t.cacheKey,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:a}}function createLrnProgramInfoLoader(e,t){return{...lrnProgramMetadata,cacheHint:t.cacheKey,get:()=>createLrnProgramInfo(e,t)}}var lrn,parseLrnAttributes,lrnProgramMetadata,validateInputs14,init_lrn=__esm({"web/lib/onnxjs/backends/webgl/ops/lrn.ts"(){init_attribute_with_cache_key(),init_types(),lrn=(e,t,r)=>(validateInputs14(t),[e.run(createLrnProgramInfoLoader(t,r),t)]),parseLrnAttributes=e=>{const t=e.attributes.getFloat("alpha",1e-4),r=e.attributes.getFloat("beta",.75),o=e.attributes.getFloat("bias",1),u=e.attributes.getInt("size");return createAttributeWithCacheKey({alpha:t,beta:r,bias:o,size:u})},lrnProgramMetadata={name:"LRN",inputNames:["X"],inputTypes:[0]},validateInputs14=e=>{if(!e||e.length!==1)throw new Error("LRN requires 1 input.");if(e[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(e[0].type!=="float32")throw new Error("input should be float type")}}}),padProgramMetadata,padV2,parsePadAttributesV2,padV11,parsePadAttributesV11,generatePadAttributesFromInputs,createPadProgramInfo,validateInputsV2,validateInputsV11,getPadFunction,getPadConstant,getPadReflect,getPadEdge,init_pad=__esm({"web/lib/onnxjs/backends/webgl/ops/pad.ts"(){init_attribute_with_cache_key(),init_util(),init_glsl_source(),init_types(),padProgramMetadata={name:"Pad",inputNames:["A"],inputTypes:[0]},padV2=(e,t,r)=>(validateInputsV2(t),[e.run({...padProgramMetadata,cacheHint:r.cacheKey,get:()=>createPadProgramInfo(e,t[0],r)},t)]),parsePadAttributesV2=e=>{const t=e.attributes.getString("mode","constant"),r=e.attributes.getFloat("value",0),o=e.attributes.getInts("pads");return createAttributeWithCacheKey({mode:t,value:r,pads:o})},padV11=(e,t,r)=>{validateInputsV11(t);const o=generatePadAttributesFromInputs(e,t,r);return padV2(e,[t[0]],o)},parsePadAttributesV11=e=>e.attributes.getString("mode","constant"),generatePadAttributesFromInputs=(e,t,r)=>{if(!e.session.isInitializer(t[1].dataId)||t.length>=3&&!e.session.isInitializer(t[2].dataId))throw new Error("dynamic pad attributes are not allowed");const o=Array.from(t[1].integerData),u=t.length>=3?t[2].floatData[0]:0;return createAttributeWithCacheKey({mode:r,pads:o,value:u})},createPadProgramInfo=(e,t,r)=>{const o=ShapeUtil.padShape(t.dims.slice(),r.pads),u=o.length,c=`
      ${getPadFunction(e,t,r)}
      float process(int[${u}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:o,type:t.type,textureType:0},shaderSource:c}},validateInputsV2=e=>{if(!e||e.length!==1)throw new Error("Pad requires 1 input");if(e[0].type!=="float32"&&e[0].type!=="float64")throw new Error("Invalid input type.")},validateInputsV11=e=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(e[1].type!=="int32")throw new Error("Invalid input type.");if(e.length>=3&&e[2].type==="string")throw new Error("Invalid input type.")},getPadFunction=(e,t,r)=>{const o=getGlsl(e.session.backend.glContext.version),[u,l]=e.calculateTextureWidthAndHeight(t.dims,0),c=ShapeUtil.computeStrides(t.dims);switch(r.mode){case"constant":return getPadConstant(o,t.dims,c,u,l,r.pads,r.value);case"reflect":return getPadReflect(o,t.dims,c,u,l,r.pads);case"edge":return getPadEdge(o,t.dims,c,u,l,r.pads);default:throw new Error("Invalid mode")}},getPadConstant=(e,t,r,o,u,l,c)=>{const d=t.length;let i="";for(let a=d-1;a>=0;--a)i+=`
        k = m[${a}] - ${l[a]};
        if (k < 0)  return constant;
        if (k >= ${t[a]}) return constant;
        offset += k * ${r[a]};
        `;return`
      float padA(int m[${d}]) {
        const float constant = float(${c});
        int offset = 0;
        int k = 0;
        ${i}
        vec2 coords = offsetToCoords(offset, ${o}, ${u});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `},getPadReflect=(e,t,r,o,u,l)=>{const c=t.length;let d="";for(let i=c-1;i>=0;--i)d+=`
        k = m[${i}] - ${l[i]};
        if (k < 0) { k = -k; }
        {
          const int _2n_1 = ${2*(t[i]-1)};
          k = int( mod( float(k), float(_2n_1) ) ) ;
          if(k >= ${t[i]}) { k = _2n_1 - k; }
        }
        offset += k * ${r[i]};
        `;return`
      float padA(int m[${c}]) {
        int offset = 0;
        int k = 0;
        ${d}
        vec2 coords = offsetToCoords(offset, ${o}, ${u});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `},getPadEdge=(e,t,r,o,u,l)=>{const c=t.length;let d="";for(let i=c-1;i>=0;--i)d+=`
        k = m[${i}] - ${l[i]};
        if (k < 0)  k = 0;
        if (k >= ${t[i]}) k = ${t[i]-1};
        offset += k * ${r[i]};
      `;return`
      float padA(int m[${c}]) {
        int offset = 0;
        int k = 0;
        ${d}
        vec2 coords = offsetToCoords(offset, ${o}, ${u});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `}}}),averagePool,parseAveragePoolAttributes,createAveragePoolProgramInfo,globalAveragePool,parseGlobalAveragePoolAttributes,maxPool,parseMaxPoolAttributes,createMaxPoolProgramInfo,getAdjustedPoolAttributesAndOutputShape,globalMaxPoolAttributes,globalMaxPoolMetadata,globalMaxPool,validateInputs15,generatePoolingCode,copyArray,offsetToIndices,init_pool=__esm({"web/lib/onnxjs/backends/webgl/ops/pool.ts"(){init_attribute_with_cache_key(),init_util(),init_types(),averagePool=(e,t,r)=>{validateInputs15(t);const o={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[e.run({...o,get:()=>createAveragePoolProgramInfo(t,o,!1,r)},t)]},parseAveragePoolAttributes=e=>{const t=e.attributes.getString("auto_pad","NOTSET"),r=e.attributes.getInt("ceil_mode",0),o=e.attributes.getInt("count_include_pad",0)!==0,u=e.attributes.getInts("kernel_shape"),l=e.attributes.getInts("strides",[]),c=e.attributes.getInts("pads",[]);if(r!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return createAttributeWithCacheKey({autoPad:t,ceilMode:r,countIncludePad:o,kernelShape:u,strides:l,pads:c})},createAveragePoolProgramInfo=(e,t,r,o)=>{const[u,l]=getAdjustedPoolAttributesAndOutputShape(e,o,r),c=ShapeUtil.size(u.kernelShape),d="value += _X(x);";let i="";u.countIncludePad?i+=`value /= float(${c});`:i+=`value /= float(${c} - pad);`;const n=`
        ${generatePoolingCode(e[0].dims,u,d,i,"0.0")}
      `;return{...t,output:{dims:l,type:e[0].type,textureType:0},shaderSource:n}},globalAveragePool=(e,t,r)=>{validateInputs15(t);const o={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${r.countIncludePad}`};return[e.run({...o,get:()=>createAveragePoolProgramInfo(t,o,!0,r)},t)]},parseGlobalAveragePoolAttributes=e=>{const t=e.attributes.getInt("count_include_pad",0)!==0;return createAttributeWithCacheKey({autoPad:"",ceilMode:0,countIncludePad:t,kernelShape:[],strides:[],pads:[]})},maxPool=(e,t,r)=>{validateInputs15(t);const o={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[e.run({...o,get:()=>createMaxPoolProgramInfo(t,o,!1,r)},t)]},parseMaxPoolAttributes=e=>{const t=e.attributes.getString("auto_pad","NOTSET"),r=e.attributes.getInt("ceil_mode",0),o=e.attributes.getInts("kernel_shape"),u=e.attributes.getInts("strides",[]),l=e.attributes.getInts("pads",[]),c=e.attributes.getInt("storage_order",0),d=e.attributes.getInts("dilations",[]);if(c!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return createAttributeWithCacheKey({autoPad:t,ceilMode:r,countIncludePad:!1,kernelShape:o,strides:u,pads:l,storageOrder:c,dilations:d})},createMaxPoolProgramInfo=(e,t,r,o)=>{const[u,l]=getAdjustedPoolAttributesAndOutputShape(e,o,r),a=`
      ${generatePoolingCode(e[0].dims,u,`
      value = max(_X(x), value);
    `,"","-1e5")}
    `;return{...t,output:{dims:l,type:e[0].type,textureType:0},shaderSource:a}},getAdjustedPoolAttributesAndOutputShape=(e,t,r)=>{const o=e[0].dims.slice(),u=Object.hasOwnProperty.call(t,"dilations"),l=t.kernelShape.slice(),c=t.strides.slice(),d=u?t.dilations.slice():[],i=t.pads.slice();PoolConvUtil.adjustPoolAttributes(r,o,l,c,d,i);const a=PoolConvUtil.computePoolOutputShape(r,o,c,d,l,i,t.autoPad),n=Object.assign({},t);return u?Object.assign(n,{kernelShape:l,strides:c,pads:i,dilations:d,cacheKey:t.cacheKey}):Object.assign(n,{kernelShape:l,strides:c,pads:i,cacheKey:t.cacheKey}),[n,a]},globalMaxPoolAttributes={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},globalMaxPoolMetadata={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},globalMaxPool=(e,t)=>(validateInputs15(t),[e.run({...globalMaxPoolMetadata,get:()=>createMaxPoolProgramInfo(t,globalMaxPoolMetadata,!0,globalMaxPoolAttributes)},t)]),validateInputs15=e=>{if(!e||e.length!==1)throw new Error("Pool ops requires 1 input.");if(e[0].type!=="float32"&&e[0].type!=="float64")throw new Error("Invalid input type.")},generatePoolingCode=(e,t,r,o,u)=>{const l=e.length;if(t.kernelShape.length<=2){const c=t.kernelShape[t.kernelShape.length-1],d=t.strides[t.strides.length-1],i=t.pads[t.pads.length/2-1],a=t.pads[t.pads.length-1],n=e[l-1];let s="",p="",f="";if(i+a!==0?s=`
          for (int i = 0; i < ${c}; i++) {
            x[${l} - 1] = indices[${l} - 1] * ${d} - ${i} + i;
            if (x[${l} - 1] < 0 || x[${l} - 1] >= ${n}) {
              pad++;
              continue;
            }
            ${r}
          }`:s=`
          for (int i = 0; i < ${c}; i++) {
            x[${l} - 1] = indices[${l} - 1] * ${d} - ${i} + i;
            ${r}
          }`,t.kernelShape.length===2){const m=t.kernelShape[t.kernelShape.length-2],_=t.strides[t.strides.length-2],y=t.pads[t.pads.length/2-2],g=t.pads[t.pads.length-2],b=e[l-2];y+g!==0?p=`
            for (int j = 0; j < ${m}; j++) {
              x[${l} - 2] = indices[${l} - 2] * ${_} - ${y} + j;
              if (x[${l} - 2] < 0 || x[${l} - 2] >= ${b}) {
                pad+= ${c};
                continue;
              }
          `:p=`
            for (int j = 0; j < ${m}; j++) {
              x[${l} - 2] = indices[${l} - 2] * ${_} - ${y} + j;
            `,f=`
          }
        `}return`
        float process(int indices[${l}]) {
          int x[${l}];
          copyVec(indices, x);

          float value = ${u};
          int pad = 0;
          ${p}
          ${s}
          ${f}
          ${o}
          return value;
        }
      `}else{const c=ShapeUtil.size(t.kernelShape),d=ShapeUtil.computeStrides(t.kernelShape),i=d.length,a=t.pads.length,n=offsetToIndices(i),s=copyArray(e,"inputDims"),p=copyArray(t.pads,"pads"),f=copyArray(d,"kernelStrides"),h=copyArray(t.strides,"strides"),m=t.pads.reduce((g,b)=>g+b);let _="";return m?_=`
            if (x[j] >= inputDims[j] || x[j] < 0) {
              pad++;
              isPad = true;
              break;
            }
          }
          if (!isPad) {
            ${r}
          }`:_=`
          }
          ${r}
        `,`
        ${n}
        float process(int indices[${l}]) {
          int x[${l}];
          copyVec(indices, x);
          int offset[${i}];
          int pads[${a}];
          int inputDims[${l}];
          int kernelStrides[${i}];
          int strides[${i}];
          ${p}
          ${s}
          ${h}
          ${f}

          float value = ${u};
          int pad = 0;
          bool isPad = false;
          for (int i = 0; i < ${c}; i++) {
            offsetToIndices(i, kernelStrides, offset);
            isPad = false;
            for (int j = ${l} - ${i}; j < ${l}; j++) {
              x[j] = indices[j] * strides[j - ${l} + ${i}]
                + offset[j - ${l} + ${i}] - pads[j - 2];
              ${_}
          }
          ${o}

          return value;
        }
      `}},copyArray=(e,t)=>{let r="";for(let o=0;o<e.length;o++)r+=`
      ${t}[${o}] = ${e[o]};
    `;return r},offsetToIndices=e=>`
  void offsetToIndices(int offset, int[${e}] strides, out int[${e}] indices) {
    if (${e} == 0) {
      return;
    }
    for (int i = 0; i < ${e} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${e} - 1] = offset;
  }`}}),reduce,parseReduceAttributes,createReduceProgramInfo,validateInputs16,reduceSum,reduceMean,reduceMax,reduceMin,reduceProd,reduceLogSum,reduceLogSumSquare,init_reduce=__esm({"web/lib/onnxjs/backends/webgl/ops/reduce.ts"(){init_attribute_with_cache_key(),init_operators(),init_util(),init_types(),reduce=(e,t,r,o,u)=>{validateInputs16(t);const l={name:o,inputNames:["A"],inputTypes:[0]};return[e.run({...l,cacheHint:r.cacheKey,get:()=>createReduceProgramInfo(e,t,r,o,u,l)},t)]},parseReduceAttributes=e=>{const t=e.attributes.getInts("axes",[]),r=e.attributes.getInt("keepdims",1)===1;return createAttributeWithCacheKey({axes:t,keepDims:r})},createReduceProgramInfo=(e,t,r,o,u,l)=>{const c=[],d=t[0].dims.length||1,i=[],a=ShapeUtil.normalizeAxes(r.axes,t[0].dims.length),n=u(t,a);let s=n[1];for(let h=0;h<t[0].dims.length;h++)a.indexOf(h)>=0||a.length===0?(r.keepDims&&c.push(1),s=`
          for(int j${h} = 0; j${h} < ${t[0].dims[h]}; j${h}++) {
            inputIdx[${h}] = j${h};
            ${s}
          }`):(i.push(`inputIdx[${h}] = outputIdx[${c.length}];`),c.push(t[0].dims[h]));const f=`
      float process(int outputIdx[${c.length||1}]) {
        float value;                 // final result
        int inputIdx[${d}];      // addressing input data
        ${i.join(`
`)}
        ${n[0]}       // init ops for reduce max/min
        ${s}
        ${n[2]}       // final computation for reduce mean
        return value;
      }`;return{...l,output:{dims:c,type:t[0].type,textureType:0},shaderSource:f}},validateInputs16=e=>{if(!e||e.length!==1)throw new Error("Reduce op requires 1 input.");if(NUMBER_TYPES.indexOf(e[0].type)===-1)throw new Error("Invalid input type.")},reduceSum=(e,t,r)=>reduce(e,t,r,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),reduceMean=(e,t,r)=>reduce(e,t,r,"ReduceMean",(u,l)=>{let c=1;for(let d=0;d<u[0].dims.length;d++)(l.indexOf(d)>=0||l.length===0)&&(c*=u[0].dims[d]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${c}.;`]}),reduceMax=(e,t,r)=>reduce(e,t,r,"ReduceMax",(u,l)=>{const c=[];for(let d=0;d<u[0].dims.length;d++)(l.indexOf(d)>=0||l.length===0)&&c.push(`inputIdx[${d}] = 0;`);return[`${c.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),reduceMin=(e,t,r)=>reduce(e,t,r,"ReduceMin",(u,l)=>{const c=[];for(let d=0;d<u[0].dims.length;d++)(l.indexOf(d)>=0||l.length===0)&&c.push(`inputIdx[${d}] = 0;`);return[`${c.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),reduceProd=(e,t,r)=>reduce(e,t,r,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),reduceLogSum=(e,t,r)=>reduce(e,t,r,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),reduceLogSumSquare=(e,t,r)=>reduce(e,t,r,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])}}),reshape,init_reshape=__esm({"web/lib/onnxjs/backends/webgl/ops/reshape.ts"(){init_util(),reshape=(e,t)=>{const r=ShapeUtil.calculateReshapedDims(t[0].dims,t[1].integerData);return e.session.pack?[e.reshapePacked(t[0],r)]:[e.reshapeUnpacked(t[0],r)]}}}),upsampleProgramMetadata,upsample,parseUpsampleAttributesV7,parseUpsampleAttributesV9,parseUpsampleAttributes,createUpsampleProgramInfo,validateInputs17,scalesValidation,init_upsample=__esm({"web/lib/onnxjs/backends/webgl/ops/upsample.ts"(){init_attribute_with_cache_key(),init_glsl_source(),init_types(),upsampleProgramMetadata={name:"Upsample",inputNames:["X"],inputTypes:[0]},upsample=(e,t,r)=>(validateInputs17(t,r),[e.run({...upsampleProgramMetadata,cacheHint:r.cacheKey,get:()=>createUpsampleProgramInfo(e,t,r)},t)]),parseUpsampleAttributesV7=e=>parseUpsampleAttributes(e,7),parseUpsampleAttributesV9=e=>parseUpsampleAttributes(e,9),parseUpsampleAttributes=(e,t)=>{const r=t>=10,o=e.attributes.getString("mode","nearest");if(o!=="nearest"&&o!=="linear"&&(t<11||o!=="cubic"))throw new Error(`unrecognized mode: ${o}`);let u=[];t<9&&(u=e.attributes.getFloats("scales"),scalesValidation(u,o,r));const l=e.attributes.getFloat("extrapolation_value",0),c=t>10?e.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(c)===-1)throw new Error(`coordinate_transform_mode '${c}' is not supported`);const d=c==="tf_crop_and_resize",i=d,a=o==="nearest"&&t>=11?e.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(a)===-1)throw new Error(`nearest_mode '${a}' is not supported`);const n=e.attributes.getFloat("cubic_coeff_a",-.75),s=e.attributes.getInt("exclude_outside",0)!==0;if(s&&o!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");const p=t<11?!0:o==="nearest"&&c==="asymmetric"&&a==="floor";let f=0,h=0,m=0;return t>10?e.inputs.length>2?(f=1,h=2,m=3):(h=1,m=2):t===9&&(h=1),createAttributeWithCacheKey({opset:t,isResize:r,mode:o,scales:u,extrapolationValue:l,coordinateTransformMode:c,useExtrapolation:i,needRoiInput:d,nearestMode:a,cubicCoefficientA:n,excludeOutside:s,useNearest2xOptimization:p,roiInputIdx:f,scalesInputIdx:h,sizesInputIdx:m})},createUpsampleProgramInfo=(e,t,r)=>{const o=getGlsl(e.session.backend.glContext.version),[u,l]=e.calculateTextureWidthAndHeight(t[0].dims,0),c=t[0].dims.map((m,_)=>Math.floor(m*r.scales[_])),[d,i]=e.calculateTextureWidthAndHeight(c,0),a=c.length,n=new Array(a),s=new Array(a);let p=`
      int output_pitches[${a}];
      int input_pitches[${a}];
      `;for(let m=a-1;m>=0;m--)n[m]=m===a-1?1:n[m+1]*c[m+1],s[m]=m===a-1?1:s[m+1]*t[0].dims[m+1],p+=`
        output_pitches[${m}] = ${n[m]};
        input_pitches[${m}] = ${s[m]};
        `;const f=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${u}, ${l});
        float value = getColorAsFloat(${o.texture2D}(X, coords));
        return value;
      }
      `,h=r.mode==="nearest"?`
    ${f}
    float process(int indices[${a}]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${d}, ${i});

      ${p}

      int d, m;
      for (int dim = 0; dim < ${a}; ++dim) {
        d = output_index / output_pitches[dim];
        m = output_index - d * output_pitches[dim];
        output_index = m;

        if (scales[dim] != 1 && d > 0) {
          int d2 = d / scales[dim];
          m = d - d2 * scales[dim];
          d = d2;
        }
        input_index += input_pitches[dim] * d;
      }

      return getInputFloat(input_index);
    }`:a===4?`
    ${f}
    float process(int indices[4]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${d}, ${i});

      ${p}

      int m;
      int index_of_dim0, index_of_dim1, index_of_dim2, index_of_dim3;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m / output_pitches[1];
      m = m - index_of_dim1 * output_pitches[1];
      index_of_dim2 = m / output_pitches[2];
      m = m - index_of_dim2 * output_pitches[2];
      index_of_dim3 = m;

      int index_of_input_dim2, index_of_input_dim3, x_offset, y_offset;
      index_of_input_dim2 = index_of_dim2 / scales[2];
      y_offset = index_of_dim2 - index_of_input_dim2 * scales[2];
      index_of_input_dim3 = index_of_dim3 / scales[3];
      x_offset = index_of_dim3 - index_of_input_dim3 * scales[3];

      input_index = index_of_dim0 * input_pitches[0] +
            index_of_dim1 * input_pitches[1] +
            index_of_input_dim2 * input_pitches[2] +
            index_of_input_dim3;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim2 = false;
      if (index_of_input_dim2 == (${t[0].dims[2]} - 1)) {
        // It's the end in dimension 2
        x01 = x00;
        end_of_dim2 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[2]);
      }

      if (index_of_input_dim3 == (input_pitches[2] - 1)) {
        // It's the end in dimension 3
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim2 ? x10 : getInputFloat(input_index + input_pitches[2] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[2]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[2]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[3]);
    }`:`
    ${f}
    float process(int indices[2]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${d}, ${i});

      ${p}

      int m;
      int index_of_dim0, index_of_dim1;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m;

      int index_of_input_dim0, index_of_input_dim1, x_offset, y_offset;
      index_of_input_dim0 = index_of_dim0 / scales[0];
      y_offset = index_of_dim0 - index_of_input_dim0 * scales[0];
      index_of_input_dim1 = index_of_dim1 / scales[1];
      x_offset = index_of_dim1 - index_of_input_dim1 * scales[1];

      input_index = index_of_input_dim0 * input_pitches[0] + index_of_input_dim1;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim0 = false;
      if (index_of_input_dim0 == (${t[0].dims[0]} - 1)) {
        // It's the end in dimension 0
        x01 = x00;
        end_of_dim0 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[0]);
      }

      if (index_of_input_dim1 == (input_pitches[0] - 1)) {
        // It's the end in dimension 1
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim0 ? x10 : getInputFloat(input_index + input_pitches[0] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[0]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[0]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[1]);
    }`;return{...upsampleProgramMetadata,output:{dims:c,type:t[0].type,textureType:0},shaderSource:h,variables:[{name:"scales",type:"int",arrayLength:r.scales.length,data:r.scales.map(m=>Math.ceil(m))}]}},validateInputs17=(e,t)=>{if(!e||t.opset<9&&e.length!==1||t.opset>=9&&t.opset<11&&e.length!==2||t.opset>=11&&e.length<2)throw new Error("invalid inputs.");if(t.scales.length>0&&e[0].dims.length!==t.scales.length)throw new Error("Invalid input shape.");if(e[0].type==="string")throw new Error("Invalid input tensor types.")},scalesValidation=(e,t,r)=>{if(r){for(const o of e)if(o<=0)throw new Error("Scale value should be greater than 0.")}else for(const o of e)if(o<1)throw new Error("Scale value should be greater than or equal to 1.");if((t==="linear"||t==="cubic")&&e.length!==2&&(e.length!==4||e[0]!==1||e[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${r?"Resize":"Upsample"} opeartor.`)}}}),resizeProgramMetadata,resize,parseResizeAttributesV10,parseResizeAttributesV11,createPackedResizeProgramInfo,prepareInputs,parseScalesData,parseScalesDataFromOutputSize,init_resize_packed=__esm({"web/lib/onnxjs/backends/webgl/ops/resize-packed.ts"(){init_glsl_source(),init_types(),init_utils(),init_packing_utils(),init_upsample(),resizeProgramMetadata={name:"Resize",inputNames:["A"],inputTypes:[2]},resize=(e,t,r)=>(validateInputs17(t,r),[e.run({...resizeProgramMetadata,cacheHint:r.cacheKey,get:()=>createPackedResizeProgramInfo(e,t,r)},t)]),parseResizeAttributesV10=e=>parseUpsampleAttributes(e,10),parseResizeAttributesV11=e=>parseUpsampleAttributes(e,11),createPackedResizeProgramInfo=(e,t,r)=>{const o=getGlsl(e.session.backend.glContext.version),[u,l]=prepareInputs(t,r);if(u.every(b=>b===1)&&r.coordinateTransformMode!=="tf_crop_and_resize")return{...resizeProgramMetadata,output:{dims:l,type:t[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${o.texture2D}(X, TexCoords);
                    ${o.output} = v;
                }`};const d=l.length;if(d<2)throw new Error(`output dimension should be at least 2, but got ${d}`);const i=l[d-2],a=l[d-1],n=t[0].dims;if(d!==n.length)throw new Error(`output dimension should match input ${n.length}, but got ${d}`);const s=n[d-2],p=n[d-1],f=u[d-2],h=u[d-1];let m="";if(r.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${r.mode}'`);switch(r.coordinateTransformMode){case"asymmetric":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${a}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${i}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${a}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${i}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${a}.0 - 1.0, ${i}.0 - 1.0, ${a}.0 - 1.0,
                            ${i}.0 - 1.0);
                        vec4 original = vec4(${p}.0 - 1.0, ${s}.0 - 1.0, ${p}.0 - 1.0,
                            ${s}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${r.coordinateTransformMode}'`)}const _=getCoordsDataType(d),y=unpackFromChannel(),g=`
            const vec2 inputWH = vec2(${s}.0, ${p}.0);
            const vec4 scaleWHWH = vec4(float(${f}), float(${h}), float(${f}), float(${h}));
            ${y}
            ${m}
            float getAValue(int x10, int r, int c, int d) {
                return getChannel(getA(x10, r, c, d), vec2(c, d));
            }
            void main() {
                ${_} rc = getOutputCoords();

                int batch = rc[0];
                int depth = rc[1];

                // retrieve the 4 coordinates that is used in the 4 packed output values.
                ivec4 coords = ivec4(rc.wz, rc.w + 1, rc.z + 1);

                // calculate the source index in fraction
                vec4 sourceFrac = getSourceFracIndex(coords);

                // get the lower and upper bound of the 4 values that will be packed into one texel.
                ivec4 x00 = ivec4(max(sourceFrac.xy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xy)));
                ivec4 x01 = ivec4(max(sourceFrac.xw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xw)));
                ivec4 x10 = ivec4(max(sourceFrac.zy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zy)));
                ivec4 x11 = ivec4(max(sourceFrac.zw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zw)));

                bool hasNextRow = rc.w < ${i-1};
                bool hasNextCol = rc.z < ${a-1};

                // pack x00, x01, x10, x11's top-left corner into one vec4 structure
                vec4 topLeft = vec4(
                    getAValue(batch, depth, x00.x, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.y) : 0.0);

                // pack x00, x01, x10, x11's top-right corner into one vec4 structure
                vec4 topRight = vec4(
                    getAValue(batch, depth, x00.x, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.w) : 0.0);

                // pack x00, x01, x10, x11's bottom-left corner into one vec4 structure
                vec4 bottomLeft = vec4(
                    getAValue(batch, depth, x00.z, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.y) : 0.0);

                // pack x00, x01, x10, x11's bottom-right corner into one vec4 structure
                vec4 bottomRight = vec4(
                    getAValue(batch, depth, x00.z, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.w) : 0.0);

                // calculate the interpolation fraction on u and v direction
                vec4 frac = vec4(sourceFrac) - floor(sourceFrac);
                vec4 clampFrac = clamp(frac, vec4(0.0), vec4(1.0));

                vec4 top = mix(topLeft, topRight, clampFrac.ywyw);
                vec4 bottom = mix(bottomLeft, bottomRight, clampFrac.ywyw);
                vec4 newValue = mix(top, bottom, clampFrac.xxzz);

                ${o.output} = vec4(newValue);
            }
        `;return{...resizeProgramMetadata,output:{dims:l,type:t[0].type,textureType:2},hasMain:!0,shaderSource:g}},prepareInputs=(e,t)=>{const o=e[0].dims;let u=t.scales,l;if(u.length===0){const d=e[t.scalesInputIdx];if(d&&d.size!==0){if(e[t.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");u=parseScalesData(d,t.mode,t.isResize)}else{const i=e[t.sizesInputIdx];if(!i||i.size===0)throw new Error("Either scales or sizes MUST be provided as input.");l=Array.from(i.integerData),u=parseScalesDataFromOutputSize(l,o,t.mode,t.isResize)}}else if(e[t.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");const c=l||o.map((d,i)=>Math.floor(d*u[i]));return[u,c]},parseScalesData=(e,t,r)=>{const o=Array.from(e.floatData);return scalesValidation(o,t,r),o},parseScalesDataFromOutputSize=(e,t,r,o)=>{const u=t.length,l=new Array(u);for(let c=0,d=u;c<d;c++)if(t[c]===0){if(e[c]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");l[c]=1}else l[c]=e[c]/t[c];return scalesValidation(l,r,o),l}}}),shape,validateInputs18,init_shape=__esm({"web/lib/onnxjs/backends/webgl/ops/shape.ts"(){init_tensor2(),shape=(e,t)=>(validateInputs18(t),[new Tensor4([t[0].dims.length],"int32",void 0,void 0,new Int32Array(t[0].dims))]),validateInputs18=e=>{if(!e||e.length!==1)throw new Error("Shape requires 1 input.")}}}),sliceProgramMetadata,slice,parseSliceAttributes,createSliceProgramInfo,validateInputs19,sliceV10,generateSliceAttributesFromInputs,validateInputsV10,init_slice=__esm({"web/lib/onnxjs/backends/webgl/ops/slice.ts"(){init_attribute_with_cache_key(),init_operators(),init_util(),init_types(),sliceProgramMetadata={name:"Slice",inputNames:["A"],inputTypes:[0]},slice=(e,t,r)=>(validateInputs19(t),[e.run({...sliceProgramMetadata,cacheHint:r.cacheKey,get:()=>createSliceProgramInfo(e,t[0],r)},t)]),parseSliceAttributes=e=>{const t=e.attributes.getInts("starts"),r=e.attributes.getInts("ends"),o=e.attributes.getInts("axes",[]);return createAttributeWithCacheKey({starts:t,ends:r,axes:o})},createSliceProgramInfo=(e,t,r)=>{const o=r.axes.length===0?t.dims.slice(0).map((s,p)=>p):r.axes,u=ShapeUtil.normalizeAxes(o,t.dims.length),l=r.starts.map((s,p)=>s>t.dims[u[p]]-1?t.dims[u[p]]:ShapeUtil.normalizeAxis(s,t.dims[u[p]])),c=r.ends.map((s,p)=>s>t.dims[u[p]]-1?t.dims[u[p]]:ShapeUtil.normalizeAxis(s,t.dims[u[p]])),d=t.dims.slice(),i=[];for(let s=0;s<u.length;s++)d[u[s]]=c[s]-l[s],l[s]>0&&i.push(`outputIdx[${u[s]}] += ${l[s]};`);const n=`
      float process(int outputIdx[${d.length}]) {
        ${i.join(`
      `)}
        return _A(outputIdx);
      }`;return{...sliceProgramMetadata,output:{dims:d,type:t.type,textureType:0},shaderSource:n}},validateInputs19=e=>{if(!e||e.length!==1)throw new Error("Slice requires 1 input.");if(NUMBER_TYPES.indexOf(e[0].type)===-1)throw new Error("Invalid input type.")},sliceV10=(e,t)=>{validateInputsV10(t);const r=generateSliceAttributesFromInputs(e,t);return[e.run({...sliceProgramMetadata,cacheHint:r.cacheKey,get:()=>createSliceProgramInfo(e,t[0],r)},[t[0]])]},generateSliceAttributesFromInputs=(e,t)=>{if(!e.session.isInitializer(t[1].dataId)||!e.session.isInitializer(t[2].dataId)||t.length>=4&&!e.session.isInitializer(t[3].dataId)||t.length>=5&&!e.session.isInitializer(t[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(t.length>=5&&t[4].integerData.some(c=>c!==1))throw new Error("currently non-1 steps is not supported for Slice");const r=Array.from(t[1].integerData),o=Array.from(t[2].integerData),u=t.length>=4?Array.from(t[3].integerData):[],l=`${u};${r};${o}`;return{starts:r,ends:o,axes:u,cacheKey:l}},validateInputsV10=e=>{if(!e||e.length<3||e.length>5)throw new Error("Invalid input number.");if(e[1].type!=="int32"||e[1].dims.length!==1)throw new Error("Invalid input type.");if(e[2].type!=="int32"||e[2].dims.length!==1)throw new Error("Invalid input type.");if(e.length>=4&&(e[3].type!=="int32"||e[3].dims.length!==1))throw new Error("Invalid input type.");if(e.length>=5&&(e[4].type!=="int32"||e[4].dims.length!==1))throw new Error("Invalid input type.")}}}),softmaxComputeMaxProgramMetadata,softmaxComputeScaleProgramMetadata,softmaxProgramMetadata,softmax,parseSoftmaxAttributes,parseSoftmaxAttributesV13,softmaxV13,computeSoftmax,createComputeMaxProgramInfo,createComputScaleProgramInfo,createSoftMaxProgramInfo,validateInputs20,init_softmax=__esm({"web/lib/onnxjs/backends/webgl/ops/softmax.ts"(){init_attribute_with_cache_key(),init_util(),init_glsl_source(),init_types(),init_transpose(),softmaxComputeMaxProgramMetadata={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},softmaxComputeScaleProgramMetadata={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},softmaxProgramMetadata={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},softmax=(e,t,r)=>{validateInputs20(t);const o=t[0].dims.slice(),u=ShapeUtil.normalizeAxis(r.axis,o.length),l=ShapeUtil.sizeToDimension(o,u),c=ShapeUtil.sizeFromDimension(o,u);return computeSoftmax(e,t,r,l,c)},parseSoftmaxAttributes=e=>createAttributeWithCacheKey({axis:e.attributes.getInt("axis",1)}),parseSoftmaxAttributesV13=e=>createAttributeWithCacheKey({axis:e.attributes.getInt("axis",-1)}),softmaxV13=(e,t,r)=>{validateInputs20(t);const o=t[0].dims.slice(),u=ShapeUtil.normalizeAxis(r.axis,o.length),l=o.length,c=u!==l-1,d=[];let i=[],a=[],n;c&&(i=Array.from({length:l}).map((h,m)=>m),i[u]=l-1,i[l-1]=u,i.map(h=>d.push(o[h])),n=createAttributeWithCacheKey({perm:i}),a=transpose(e,t,n));const s=c?ShapeUtil.sizeToDimension(d,l-1):ShapeUtil.sizeToDimension(o,l-1),p=c?ShapeUtil.sizeFromDimension(d,l-1):ShapeUtil.sizeFromDimension(o,l-1),f=computeSoftmax(e,c?a:t,r,s,p);return c?transpose(e,f,n):f},computeSoftmax=(e,t,r,o,u)=>{const l=createComputeMaxProgramInfo(e,t[0],o,u,[o]),c=e.run({...softmaxComputeMaxProgramMetadata,cacheHint:r.cacheKey,get:()=>l},t),d=createComputScaleProgramInfo(e,t[0],o,u,l.output.dims,[o]),i=e.run({...softmaxComputeScaleProgramMetadata,cacheHint:r.cacheKey,get:()=>d},[t[0],c]),a=createSoftMaxProgramInfo(e,t[0],o,u,l.output.dims,d.output.dims);return[e.run({...softmaxProgramMetadata,cacheHint:r.cacheKey,get:()=>a},[t[0],c,i])]},createComputeMaxProgramInfo=(e,t,r,o,u)=>{const[l,c]=e.calculateTextureWidthAndHeight(t.dims,0),d=u.length;if(r<1||o<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(u.length!==1)throw new Error("Dimensionality of the output should be 1");if(u[0]!==r)throw new Error("Shape of the output should be equal to logical row count");const i=getGlsl(e.session.backend.glContext.version),a=`
      float process(int[${d}] indices) {
        int logical_row_start_offset = indices[0] * ${o};

        float max = getColorAsFloat(${i.texture2D}(A, offsetToCoords(logical_row_start_offset, ${l},
        ${c} )));
        for(int i=1; i<${o}; ++i)
        {
          float current = getColorAsFloat(${i.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${l}, ${c})));
          if(current > max)
          max = current;
        }

        return max;
      }`;return{...softmaxComputeMaxProgramMetadata,output:{dims:u,type:t.type,textureType:0},shaderSource:a}},createComputScaleProgramInfo=(e,t,r,o,u,l)=>{const[c,d]=e.calculateTextureWidthAndHeight(t.dims,0),i=l.length;if(r<1||o<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(l.length!==1)throw new Error("Dimensionality of the output should be 1");if(l[0]!==r)throw new Error("Shape of the output should be equal to logical row count");if(u.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(u[0]!==r)throw new Error("Shape of the intermediate results should be equal to logical row count");const a=getGlsl(e.session.backend.glContext.version),n=`
      float process(int[${i}] indices) {
        int logical_row_start_offset = indices[0] * ${o};

        float norm_factor = 0.0;
        float max = _Max(indices);
        for(int i=0; i<${o}; ++i)
        {
          norm_factor += exp(getColorAsFloat(${a.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${c}, ${d}))) - max);
        }

        return norm_factor;
      }`;return{...softmaxComputeScaleProgramMetadata,output:{dims:l,type:t.type,textureType:0},shaderSource:n}},createSoftMaxProgramInfo=(e,t,r,o,u,l)=>{const[c,d]=e.calculateTextureWidthAndHeight(t.dims,0),i=t.dims.length;if(r<1||o<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(u.length!==1||l.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(u[0]!==r||l[0]!==r)throw new Error("Shape of the intermediate results should be equal to logical row count");const a=`
      float process(int[${i}] indices) {

      // get offset of current logical tensor index from the 2-D texture coordinates (TexCoords)
      int offset = coordsToOffset(TexCoords, ${c}, ${d});

      //determine the logical row for this index
      int logical_row_index[1];
      logical_row_index[0] = offset / ${o};

      float norm_factor = _Norm(logical_row_index);

      // avoid possible division by 0
      // if norm_facor is 0, all elements are zero
      // if so, return 0
      if(norm_factor == 0.0)
        return 0.0;

      return exp(_A(indices) - _Max(logical_row_index)) / norm_factor;
    }`;return{...softmaxProgramMetadata,output:{dims:t.dims,type:t.type,textureType:0},shaderSource:a}},validateInputs20=e=>{if(!e||e.length!==1)throw new Error("Softmax requires 1 input.");if(e[0].type!=="float32"&&e[0].type!=="float64")throw new Error("Invalid input type")}}}),splitProgramMetadata,split,parseSplitAttributes,getProgramCount,createSplitProgramInfo,validateInputs21,init_split=__esm({"web/lib/onnxjs/backends/webgl/ops/split.ts"(){init_attribute_with_cache_key(),init_util(),init_types(),splitProgramMetadata={name:"Split",inputNames:["A"],inputTypes:[0]},split=(e,t,r)=>{validateInputs21(t);const o=ShapeUtil.normalizeAxis(r.axis,t[0].dims.length),u=getProgramCount(e,t,o,r),l=[];for(let c=0;c<u;++c)l.push(e.run({...splitProgramMetadata,cacheHint:`${r.cacheKey};${c}`,get:()=>createSplitProgramInfo(e,t[0],r,o,c)},t));return l},parseSplitAttributes=e=>{const t=e.attributes.getInt("axis",0),r=e.attributes.getInts("split",[]),o=e.outputs.length;return createAttributeWithCacheKey({axis:t,split:r,numOutputs:o})},getProgramCount=(e,t,r,o)=>{const[,u]=SplitUtil.splitShape(t[0].dims,r,o.split,o.numOutputs);return u.length},createSplitProgramInfo=(e,t,r,o,u)=>{const[l,c]=SplitUtil.splitShape(t.dims,o,r.split,r.numOutputs),d=c[u],i=l[u],n=`
      float process(int indices[${i.length}]) {
        indices[${o}] += ${d};
        return _A(indices);
      }
    `;return{...splitProgramMetadata,cacheHint:`${r.cacheKey}:${u}`,output:{dims:i,type:t.type,textureType:0},shaderSource:n}},validateInputs21=e=>{if(!e||e.length!==1)throw new Error("Split requires one input.");if(e[0].type!=="int8"&&e[0].type!=="uint8"&&e[0].type!=="int16"&&e[0].type!=="uint16"&&e[0].type!=="int32"&&e[0].type!=="uint32"&&e[0].type!=="float32"&&e[0].type!=="float64"&&e[0].type!=="bool")throw new Error("Invalid input type.")}}}),squeeze,squeezeV13,parseSqueezeAttributes,validateInputs22,validateInputsV13,init_squeeze=__esm({"web/lib/onnxjs/backends/webgl/ops/squeeze.ts"(){init_util(),squeeze=(e,t,r)=>{validateInputs22(t);const o=ShapeUtil.squeezeShape(t[0].dims,r);return[e.reshapeUnpacked(t[0],o)]},squeezeV13=(e,t)=>(validateInputsV13(t),squeeze(e,[t[0]],Array.from(t[1].integerData))),parseSqueezeAttributes=e=>e.attributes.getInts("axes"),validateInputs22=e=>{if(!e||e.length!==1)throw new Error("Squeeze requires 1 input.");if(e[0].type==="string")throw new Error("invalid input tensor types.")},validateInputsV13=e=>{if(!e||e.length!==2)throw new Error("Squeeze requires 2 inputs.");if(e[1].type!=="int32")throw new Error("Invalid input type.")}}}),sum,createSumProgramInfo,validateInputs23,init_sum=__esm({"web/lib/onnxjs/backends/webgl/ops/sum.ts"(){init_glsl_source(),init_types(),sum=(e,t)=>{validateInputs23(t);const r={name:"Sum",inputNames:t.map((u,l)=>`X${l}`),inputTypes:new Array(t.length).fill(0)};return[e.run({...r,get:()=>createSumProgramInfo(e,t,r)},t)]},createSumProgramInfo=(e,t,r)=>{const o=getGlsl(e.session.backend.glContext.version),u=t[0].dims.slice(),c=`
      void main() {
        vec4 result = ${t.map((d,i)=>`${o.texture2D}(X${i},TexCoords)`).join(" + ")};
        ${o.output} = result;
      }
    `;return{...r,output:{dims:u,type:t[0].type,textureType:0},hasMain:!0,shaderSource:c}},validateInputs23=e=>{if(!e||e.length===0)throw new Error("Sum requires inputs.");const t=e[0].dims.length;for(let r=1;r<e.length;r++){if(t!==e[r].dims.length)throw new Error("Input shapes are mismatched.");for(let o=0;o<t;o++)if(e[0].dims[o]!==e[r].dims[o])throw new Error("Input shapes are not matched.")}if(e[0].type!=="float32"&&e[0].type!=="float64")throw new Error("Invalid input type.");for(let r=1;r<e.length;r++)if(e[0].type!==e[r].type)throw new Error("Input types are not matched.")}}}),tile,createTileProgramInfo,validateInputs24,init_tile=__esm({"web/lib/onnxjs/backends/webgl/ops/tile.ts"(){init_operators(),init_types(),tile=(e,t)=>{validateInputs24(t);const r={name:"Tile",inputNames:["A"],inputTypes:[0]};return[e.run({...r,get:()=>createTileProgramInfo(e,t,r)},t)]},createTileProgramInfo=(e,t,r)=>{const o=t[0].dims.slice(),u=new Array(o.length),l=[];for(let i=0;i<o.length;i++)u[i]=o[i]*t[1].numberData[i],l.push(`inputIdx[${i}] = int(mod(float(outputIdx[${i}]), ${o[i]}.));`);const c=u.length,d=`
      float process(int outputIdx[${c}]) {
        int inputIdx[${c}];
        ${l.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...r,output:{dims:u,type:t[0].type,textureType:0},shaderSource:d}},validateInputs24=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 input.");if(e[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(e[1].dims[0]!==e[0].dims.length)throw new Error("Invalid input shape.");if(NUMBER_TYPES.indexOf(e[0].type)===-1)throw new Error("Invalid input type.");if(e[1].type!=="int32"&&e[1].type!=="int16")throw new Error("Invalid repeat type.")}}}),unsqueeze,unsqueezeV13,parseUnsqueezeAttributes,validateInputs25,validateInputsV132,init_unsqueeze=__esm({"web/lib/onnxjs/backends/webgl/ops/unsqueeze.ts"(){init_util(),unsqueeze=(e,t,r)=>{validateInputs25(t);const o=ShapeUtil.unsqueezeShape(t[0].dims,r);return[e.reshapeUnpacked(t[0],o)]},unsqueezeV13=(e,t)=>(validateInputsV132(t),unsqueeze(e,[t[0]],Array.from(t[1].integerData))),parseUnsqueezeAttributes=e=>e.attributes.getInts("axes"),validateInputs25=e=>{if(!e||e.length!==1)throw new Error("Unsqueeze requires 1 input.");if(e[0].type==="string")throw new Error("invalid input tensor types.")},validateInputsV132=e=>{if(!e||e.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(e[1].type!=="int32")throw new Error("Invalid input type.")}}}),WEBGL_OP_RESOLVE_RULES,init_op_resolve_rules=__esm({"web/lib/onnxjs/backends/webgl/op-resolve-rules.ts"(){init_batch_normalization(),init_binary_op(),init_cast(),init_concat(),init_conv(),init_conv_transpose(),init_depth_to_space(),init_flatten(),init_gather(),init_gemm(),init_image_scaler(),init_instance_normalization(),init_lrn(),init_matmul(),init_pad(),init_pool(),init_reduce(),init_reshape(),init_resize_packed(),init_shape(),init_slice(),init_softmax(),init_split(),init_squeeze(),init_sum(),init_tile(),init_transpose(),init_unary_op(),init_unsqueeze(),init_upsample(),WEBGL_OP_RESOLVE_RULES=[["Abs","","6+",abs],["Acos","","7+",acos],["Add","","7+",add2],["And","","7+",and2],["Asin","","7+",asin],["Atan","","7+",atan],["AveragePool","","7+",averagePool,parseAveragePoolAttributes],["BatchNormalization","","7+",batchNormalization,parseBatchNormalizationAttributes],["Cast","","6+",cast,parseCastAttributes],["Ceil","","6+",ceil],["Clip","","6-10",clip,parseClipAttributes],["Clip","","11+",clipV11],["Concat","","4+",concat,parseConcatAttributes],["Conv","","1+",conv,parseConvAttributes],["ConvTranspose","","1+",convTranspose,parseConvTransposeAttributes],["Cos","","7+",cos],["Div","","7+",div],["Dropout","","7+",identity],["DepthToSpace","","1+",depthToSpace,parseDepthToSpaceAttributes],["Equal","","7+",equal],["Elu","","6+",elu,parseEluAttributes],["Exp","","6+",exp],["Flatten","","1+",flatten,parseFlattenAttributes],["Floor","","6+",floor],["FusedConv","com.microsoft","1+",conv,parseConvAttributes],["Gather","","1+",gather,parseGatherAttributes],["Gemm","","7-10",gemm,parseGemmAttributesV7],["Gemm","","11+",gemm,parseGemmAttributesV11],["GlobalAveragePool","","1+",globalAveragePool,parseGlobalAveragePoolAttributes],["GlobalMaxPool","","1+",globalMaxPool],["Greater","","7+",greater],["Identity","","1+",identity],["ImageScaler","","1+",imageScaler,parseImageScalerAttributes],["InstanceNormalization","","6+",instanceNormalization,parseInstanceNormalizationAttributes],["LeakyRelu","","6+",leakyRelu,parseLeakyReluAttributes],["Less","","7+",less],["LRN","","1+",lrn,parseLrnAttributes],["Log","","6+",log2],["MatMul","","1+",matMul,parseMatMulAttributes],["MaxPool","","1+",maxPool,parseMaxPoolAttributes],["Mul","","7+",mul],["Neg","","6+",neg],["Not","","1+",not2],["Or","","7+",or2],["Pad","","2-10",padV2,parsePadAttributesV2],["Pad","","11+",padV11,parsePadAttributesV11],["Pow","","7+",pow],["PRelu","","7+",pRelu],["ReduceLogSum","","1+",reduceLogSum,parseReduceAttributes],["ReduceMax","","1+",reduceMax,parseReduceAttributes],["ReduceMean","","1+",reduceMean,parseReduceAttributes],["ReduceMin","","1+",reduceMin,parseReduceAttributes],["ReduceProd","","1+",reduceProd,parseReduceAttributes],["ReduceSum","","1-12",reduceSum,parseReduceAttributes],["ReduceSumSquare","","1+",reduceLogSumSquare,parseReduceAttributes],["Relu","","6+",relu],["Reshape","","5+",reshape],["Resize","","10",resize,parseResizeAttributesV10],["Resize","","11+",resize,parseResizeAttributesV11],["Shape","","1+",shape],["Sigmoid","","6+",sigmoid],["Sin","","7+",sin],["Slice","","10+",sliceV10],["Slice","","1-9",slice,parseSliceAttributes],["Softmax","","1-12",softmax,parseSoftmaxAttributes],["Softmax","","13+",softmaxV13,parseSoftmaxAttributesV13],["Split","","2-12",split,parseSplitAttributes],["Sqrt","","6+",sqrt],["Squeeze","","1-12",squeeze,parseSqueezeAttributes],["Squeeze","","13+",squeezeV13],["Sub","","7+",sub],["Sum","","6+",sum],["Tan","","7+",tan],["Tanh","","6+",tanh],["Tile","","6+",tile],["Transpose","","1+",transpose,parseTransposeAttributes],["Upsample","","7-8",upsample,parseUpsampleAttributesV7],["Upsample","","9",upsample,parseUpsampleAttributesV9],["Unsqueeze","","1-12",unsqueeze,parseUnsqueezeAttributes],["Unsqueeze","","13+",unsqueezeV13],["Xor","","7+",xor2]]}});function replaceInlines(e){const t={};let r;for(;(r=INLINE_FUNC_DEF_REGEX.exec(e))!==null;){const o=r[3].split(",").map(u=>{const l=u.trim().split(" ");return l&&l.length===2?{type:l[0],name:l[1]}:null}).filter(u=>u!==null);t[r[2]]={params:o,body:r[4]}}for(const o in t){const u=FUNC_CALL_REGEX.replace("__FUNC__",o),l=new RegExp(u,"gm");for(;(r=l.exec(e))!==null;){const c=r[1],d=r[2],i=r[3].split(","),a=c?`${c} ${d};`:"";let n=t[o].body,s="";t[o].params.forEach((f,h)=>{f&&(s+=`${f.type} ${f.name} = ${i[h]};
`)}),n=`${s}
 ${n}`,n=n.replace("return",`${d} = `);const p=`
      ${a}
      {
        ${n}
      }
      `;e=e.replace(r[0],p)}}return e=e.replace(INLINE_FUNC_DEF_REGEX,""),e}var INLINE_FUNC_DEF_REGEX,FUNC_CALL_REGEX,init_glsl_function_inliner=__esm({"web/lib/onnxjs/backends/webgl/glsl-function-inliner.ts"(){INLINE_FUNC_DEF_REGEX=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,FUNC_CALL_REGEX="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"}});function squeezeShape(e,t){const r=[],o=[];for(let u=0;u<e.length;++u)e[u]!==1&&(r.push(e[u]),o.push(u));return{newShape:r,keptDims:o}}function sizeFromShape(e){if(e.length===0)return 1;let t=e[0];for(let r=1;r<e.length;r++)t*=e[r];return t}function sizeToSquarishShape(e){const t=Math.ceil(Math.sqrt(e));return[t,Math.ceil(e/t)]}var PreferLogicalStrategy,init_texture_layout_strategy=__esm({"web/lib/onnxjs/backends/webgl/texture-layout-strategy.ts"(){init_instrument(),init_util(),PreferLogicalStrategy=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,t){const r=this.computeTexture(e,t);return t&&t.isPacked&&(r[0]/=2,r[1]/=2),t&&t.reverseWH?[r[1],r[0]]:r}computeTexture(e,t){const r=t&&t.isPacked;if(e.length===0)return r?[2,2]:[1,1];let o=this.maxTextureSize;if(t&&t.breakAxis!==void 0){const c=t.breakAxis>=e.length?1:e.slice(t.breakAxis).reduce((i,a)=>i*a),d=t.breakAxis<=0?1:e.slice(0,t.breakAxis).reduce((i,a)=>i*a);if(c>o||d>o)Logger.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${t.breakAxis}`);else return[c,d]}let u=e.slice(0);r&&(o=o*2,u=u.map((c,d)=>d>=u.length-2?u[d]%2===0?u[d]:u[d]+1:u[d]),u.length===1&&(u=[2,u[0]])),u.length!==2&&(u=squeezeShape(u).newShape);const l=sizeFromShape(u);return u.length<=1&&l<=o?[1,l]:u.length===2&&u[0]<=o&&u[1]<=o?u:u.length===3&&u[0]*u[1]<=o&&u[2]<=o?[u[0]*u[1],u[2]]:u.length===3&&u[0]<=o&&u[1]*u[2]<=o?[u[0],u[1]*u[2]]:u.length===4&&u[0]*u[1]*u[2]<=o&&u[3]<=o?[u[0]*u[1]*u[2],u[3]]:u.length===4&&u[0]<=o&&u[1]*u[2]*u[3]<=o?[u[0],u[1]*u[2]*u[3]]:r?sizeToSquarishShape(l/4).map(c=>c*2):sizeToSquarishShape(l)}}}}),CoordsGlslLib,init_glsl_coordinate_lib=__esm({"web/lib/onnxjs/backends/webgl/glsl-coordinate-lib.ts"(){init_util(),init_glsl_definitions(),init_glsl_source(),init_texture_layout_strategy(),init_utils(),CoordsGlslLib=class extends GlslLib{constructor(e){super(e)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){const e="offsetToCoords";return{offsetToCoords:new GlslLibRoutine(`
      vec2 ${e}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){const e="coordsToOffset";return{coordsToOffset:new GlslLibRoutine(`
      int ${e}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){const e=this.context.outputTextureLayout;return e.isPacked?this.getPackedOutputSamplingSnippet(e):this.getUnpackedOutputSamplingSnippet(e)}getPackedOutputSamplingSnippet(e){const t=e.unpackedShape,r=[e.width,e.height],o={},u="getOutputCoords";switch(t.length){case 0:o[u]=this.getOutputScalarCoords();break;case 1:o[u]=this.getOutputPacked1DCoords(t,r);break;case 2:o[u]=this.getOutputPacked2DCoords(t,r);break;case 3:o[u]=this.getOutputPacked3DCoords(t,r);break;default:o[u]=this.getOutputPackedNDCoords(t,r)}const c=`
      void setOutput(vec4 val) {
        ${getGlsl(this.context.glContext.version).output} = val;
      }
    `,d="floatTextureSetRGBA";return o[d]=new GlslLibRoutine(c),o}getUnpackedOutputSamplingSnippet(e){const t=e.unpackedShape,r=[e.width,e.height],o={},u="getOutputCoords";switch(t.length){case 0:o[u]=this.getOutputScalarCoords();break;case 1:o[u]=this.getOutputUnpacked1DCoords(t,r);break;case 2:o[u]=this.getOutputUnpacked2DCoords(t,r);break;case 3:o[u]=this.getOutputUnpacked3DCoords(t,r);break;case 4:o[u]=this.getOutputUnpacked4DCoords(t,r);break;case 5:o[u]=this.getOutputUnpacked5DCoords(t,r);break;case 6:o[u]=this.getOutputUnpacked6DCoords(t,r);break;default:throw new Error(`Unsupported output dimensionality: ${t.length}`)}const c=`
        void setOutput(float val) {
          ${getGlsl(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,d="floatTextureSetR";return o[d]=new GlslLibRoutine(c),o}getOutputScalarCoords(){return new GlslLibRoutine(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(e,t){const r=t;let o="";return r[0]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${r[1]}.0);
          }
        `,new GlslLibRoutine(o)):r[1]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${r[0]}.0);
          }
        `,new GlslLibRoutine(o)):(o=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${r[0]}, ${r[1]}));
          return 2 * (resTexRC.y * ${r[0]} + resTexRC.x);
        }
      `,new GlslLibRoutine(o))}getOutputPacked2DCoords(e,t){let r="";if(ArrayUtil.arraysEqual(e,t))return r=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${t[0]}, ${t[1]}));
        }
      `,new GlslLibRoutine(r);const o=t,u=Math.ceil(e[1]/2);return r=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${o[0]}, ${o[1]}));

          int index = resTexRC.y * ${o[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${u}) * 2;
          int c = 2 * (index / ${u});

          return ivec2(r, c);
        }
      `,new GlslLibRoutine(r)}getOutputPacked3DCoords(e,t){const r=[t[0],t[1]],o=Math.ceil(e[2]/2),u=o*Math.ceil(e[1]/2),l=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;

          int b = index / ${u};
          index -= b * ${u};

          // reverse r and c order for packed texture
          int r = imod(index, ${o}) * 2;
          int c = 2 * (index / ${o});

          return ivec3(b, r, c);
        }
      `;return new GlslLibRoutine(l)}getOutputPackedNDCoords(e,t){const r=[t[0],t[1]],o=Math.ceil(e[e.length-1]/2),u=o*Math.ceil(e[e.length-2]/2);let l=u,c="",d="b, r, c";for(let a=2;a<e.length-1;a++)l*=e[e.length-a-1],c=`
      int b${a} = index / ${l};
      index -= b${a} * ${l};
    `+c,d=`b${a}, `+d;const i=`
      ivec${e.length} getOutputCoords() {
        ivec2 resTexRC = ivec2(TexCoords.xy *
                              vec2(${r[0]}, ${r[1]}));
        int index = resTexRC.y * ${r[0]} + resTexRC.x;

        ${c}

        int b = index / ${u};
        index -= b * ${u};

        // reverse r and c order for packed texture
        int r = imod(index, ${o}) * 2;
        int c = 2 * (index / ${o});

        return ivec${e.length}(${d});
      }
    `;return new GlslLibRoutine(i)}getOutputUnpacked1DCoords(e,t){const r=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          return resTexRC.y * ${t[0]} + resTexRC.x;
        }
      `;return new GlslLibRoutine(r)}getOutputUnpacked2DCoords(e,t){const r=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          int r = index / ${e[1]};
          int c = index - r * ${e[1]};
          return ivec2(r, c);
        }
      `;return new GlslLibRoutine(r)}getOutputUnpacked3DCoords(e,t){let r="";const o=e.length;let u=null;o<2&&(u=[]),u=new Array(o-1),u[o-2]=e[o-1];for(let d=o-3;d>=0;--d)u[d]=u[d+1]*e[d+1];const l=["r","c","d"],c=u.map((d,i)=>{const a=`int ${l[i]} = index / ${d}`,n=i===u.length-1?`int ${l[i+1]} = index - ${l[i]} * ${d}`:`index -= ${l[i]} * ${d}`;return`${a}; ${n};`}).join("");return r=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${c}
          return ivec3(r, c, d);
        }
      `,new GlslLibRoutine(r)}getOutputUnpacked4DCoords(e,t){let r="";const o=e.length;let u=null;o<2&&(u=[]),u=new Array(o-1),u[o-2]=e[o-1];for(let d=o-3;d>=0;--d)u[d]=u[d+1]*e[d+1];const l=["r","c","d","d2"],c=u.map((d,i)=>{const a=`int ${l[i]} = index / ${d}`,n=i===u.length-1?`int ${l[i+1]} = index - ${l[i]} * ${d}`:`index -= ${l[i]} * ${d}`;return`${a}; ${n};`}).join("");return r=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${c}
          return ivec4(r, c, d, d2);
        }
      `,new GlslLibRoutine(r)}getOutputUnpacked5DCoords(e,t){let r="";const o=e.length;let u=null;o<2&&(u=[]),u=new Array(o-1),u[o-2]=e[o-1];for(let d=o-3;d>=0;--d)u[d]=u[d+1]*e[d+1];const l=["r","c","d","d2","d3"],c=u.map((d,i)=>{const a=`int ${l[i]} = index / ${d}`,n=i===u.length-1?`int ${l[i+1]} = index - ${l[i]} * ${d}`:`index -= ${l[i]} * ${d}`;return`${a}; ${n};`}).join("");return r=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${c}
          return ivec5(r, c, d, d2, d3);
        }
      `,new GlslLibRoutine(r)}getOutputUnpacked6DCoords(e,t){let r="";const o=e.length;let u=null;o<2&&(u=[]),u=new Array(o-1),u[o-2]=e[o-1];for(let d=o-3;d>=0;--d)u[d]=u[d+1]*e[d+1];const l=["r","c","d","d2","d3","d4"],c=u.map((d,i)=>{const a=`int ${l[i]} = index / ${d}`,n=i===u.length-1?`int ${l[i+1]} = index - ${l[i]} * ${d}`:`index -= ${l[i]} * ${d}`;return`${a}; ${n};`}).join("");return r=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${t[0]}, ${t[1]}));
         int index = resTexRC.y * ${t[0]} + resTexRC.x;
         ${c}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new GlslLibRoutine(r)}getCommonUtilFuncs(){const e={};let t="uvFromFlat";e[t]=new GlslLibRoutine(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),t="packedUVfrom1D",e[t]=new GlslLibRoutine(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="packedUVfrom2D",e[t]=new GlslLibRoutine(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="packedUVfrom3D",e[t]=new GlslLibRoutine(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="sampleTexture";const r=getGlsl(this.context.glContext.version);return e[t]=new GlslLibRoutine(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${r.texture2D}(textureSampler, uv).r;
        }`),e}getInputsSamplingSnippets(){const e={},t=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((r,o)=>{const u=this.context.inputTextureLayouts[o],l=generateShaderFuncNameFromInputSamplerName(r);u.isPacked?e[l]=this.getPackedSamplerFromInput(l,r,u):e[l]=this.getUnpackedSamplerFromInput(l,r,u);const c=generateShaderFuncNameFromInputSamplerNameAtOutCoords(r);u.unpackedShape.length<=t.unpackedShape.length&&(u.isPacked?e[c]=this.getPackedSamplerAtOutputCoords(c,u,t,r):e[c]=this.getUnpackedSamplerAtOutputCoords(c,u,t,r))}),e}getPackedSamplerAtOutputCoords(e,t,r,o){const u=t.unpackedShape,l=r.unpackedShape,d=generateShaderFuncNameFromInputSamplerName(o),i=u.length,a=l.length,n=BroadcastUtil.getBroadcastDims(u,l),s=getCoordsDataType(a),p=a-i;let f;const h=getGlChannels();i===0?f="":a<2&&n.length>=1?f="coords = 0;":f=n.map(S=>`coords.${h[S+p]} = 0;`).join(`
`);let m="";a<2&&i>0?m="coords":m=u.map((S,T)=>`coords.${h[T+p]}`).join(", ");let _="return outputValue;";const g=ShapeUtil.size(u)===1,v=ShapeUtil.size(l)===1;if(i===1&&!g&&!v)_=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if(g&&!v)a===1?_=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:_=`
          return vec4(outputValue.x);
        `;else if(n.length){const S=i-2,T=i-1;n.indexOf(S)>-1&&n.indexOf(T)>-1?_="return vec4(outputValue.x);":n.indexOf(S)>-1?_="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":n.indexOf(T)>-1&&(_="return vec4(outputValue.xx, outputValue.zz);")}const w=`
        int lastDim = coords.${h[a-1]};
        coords.${h[a-1]} = coords.${h[a-2]};
        coords.${h[a-2]} = lastDim;
      `,x=`
      vec4 ${e}() {
        ${s} coords = getOutputCoords();
        ${w}
        ${f}
        vec4 outputValue = ${d}(${m});
        ${_}
      }
    `;return new GlslLibRoutine(x,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(e,t,r,o){const u=[r.width,r.height],l=[t.width,t.height],c=t.unpackedShape.length,d=r.unpackedShape.length,i=t.unpackedShape,a=r.unpackedShape,n=generateShaderFuncNameFromInputSamplerName(o);if(c===d&&ArrayUtil.arraysEqual(l,u)){const g=`
          float ${e}() {
            return sampleTexture(${o}, TexCoords);
          }
        `;return new GlslLibRoutine(g,["coordinates.sampleTexture"])}const s=getCoordsDataType(d),p=BroadcastUtil.getBroadcastDims(i,a),f=d-c;let h;const m=getGlChannels();c===0?h="":d<2&&p.length>=1?h="coords = 0;":h=p.map(g=>`coords.${m[g+f]} = 0;`).join(`
`);let _="";d<2&&c>0?_="coords":_=t.unpackedShape.map((g,b)=>`coords.${m[b+f]}`).join(", ");const y=`
        float ${e}() {
          ${s} coords = getOutputCoords();
          ${h}
          return ${n}(${_});
        }
      `;return new GlslLibRoutine(y,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(e,t,r){switch(r.unpackedShape.length){case 0:return this.getPackedSamplerScalar(e,t);case 1:return this.getPackedSampler1D(e,t,r);case 2:return this.getPackedSampler2D(e,t,r);case 3:return this.getPackedSampler3D(e,t,r);default:return this.getPackedSamplerND(e,t,r)}}getUnpackedSamplerFromInput(e,t,r){const o=r.unpackedShape;switch(o.length){case 0:return this.getUnpackedSamplerScalar(e,t,r);case 1:return this.getUnpackedSampler1D(e,t,r);case 2:return this.getUnpackedSampler2D(e,t,r);case 3:return this.getUnpackedSampler3D(e,t,r);case 4:return this.getUnpackedSampler4D(e,t,r);case 5:return this.getUnpackedSampler5D(e,t,r);case 6:return this.getUnpackedSampler6D(e,t,r);default:throw new Error(`Unsupported dimension ${o.length}-D`)}}getPackedSamplerScalar(e,t){const r=getGlsl(this.context.glContext.version),o=`
          vec4 ${e}() {
            return ${r.texture2D}(${t}, halfCR);
          }
        `;return new GlslLibRoutine(o)}getPackedSampler1D(e,t,r){const o=[r.width,r.height],u=[o[1],o[0]],l=getGlsl(this.context.glContext.version),d=`vec4 ${e}(int index) {
      vec2 uv = packedUVfrom1D(
      ${u[0]}, ${u[1]}, index);
      return ${l.texture2D}(${t}, uv);
    }`;return new GlslLibRoutine(d,["coordinates.packedUVfrom1D"])}getPackedSampler2D(e,t,r){const o=r.unpackedShape,u=[r.width,r.height],l=getGlsl(this.context.glContext.version),c=u[0],d=u[1];if(u!=null&&ArrayUtil.arraysEqual(o,u)){const p=`vec4 ${e}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${d}.0, ${c}.0);
        return ${l.texture2D}(${t}, uv);
      }`;return new GlslLibRoutine(p)}const i=u,a=Math.ceil(o[1]/2),s=`vec4 ${e}(int row, int col) {
      vec2 uv = packedUVfrom2D(${i[1]}, ${i[0]}, ${a}, row, col);
      return ${l.texture2D}(${t}, uv);
    }`;return new GlslLibRoutine(s,["coordinates.packedUVfrom2D"])}getPackedSampler3D(e,t,r){const o=r.unpackedShape,u=[r.width,r.height],l=[u[0],u[1]],c=getGlsl(this.context.glContext.version);if(o[0]===1){const f=o.slice(1),h=[1,2],m=squeezeInputShape(o,f),_=["b","row","col"],y=JSON.parse(JSON.stringify(r));y.unpackedShape=m;const g=this.getPackedSamplerFromInput(e,t,y),v=`${g.routineBody}
      vec4 ${e}(int b, int row, int col) {
        return ${e}(${getSqueezedParams(_,h)});
      } `;return new GlslLibRoutine(v,g.dependencies)}const d=l[0],i=l[1],a=Math.ceil(o[2]/2),n=a*Math.ceil(o[1]/2),p=`vec4 ${e}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${i}, ${d}, ${n}, ${a}, b, row, col);
      return ${c.texture2D}(${t}, uv);}`;return new GlslLibRoutine(p,["coordinates.packedUVfrom3D"])}getPackedSamplerND(e,t,r){const o=r.unpackedShape,u=o.length,l=[r.width,r.height],c=getGlsl(this.context.glContext.version),d=[l[0],l[1]],i=d[1],a=d[0],n=Math.ceil(o[u-1]/2);let s=n*Math.ceil(o[u-2]/2),p="int b, int row, int col",f=`b * ${s} + (row / 2) * ${n} + (col / 2)`;for(let _=2;_<u-1;_++)p=`int b${_}, `+p,s*=o[u-_-1],f=`b${_} * ${s} + `+f;const m=`vec4 ${e}(${p}) {
      int index = ${f};
      int texR = index / ${a};
      int texC = index - texR * ${a};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${a}, ${i});
      return ${c.texture2D}(${t}, uv);
    }`;return new GlslLibRoutine(m)}getUnpackedSamplerScalar(e,t,r){const[o,u]=[r.width,r.height];if(o===1&&u===1){const c=`
          float ${e}() {
            return sampleTexture(${t}, halfCR);
          }
        `;return new GlslLibRoutine(c,["coordinates.sampleTexture"])}const l=`
        float ${e}() {
          int offset_${t} = coordsToOffset(TexCoords, ${o}, ${u});
          vec2 uv = uvFromFlat(${o}, ${u}, offset_${t});
          return sampleTexture(${t}, uv);
        }
      `;return new GlslLibRoutine(l,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(e,t,r){const o=r.width,u=r.height;if(u===1&&o===1){const c=`
        float ${e}(int index) {
          return sampleTexture(${t}, halfCR);
        }
      `;return new GlslLibRoutine(c,["coordinates.sampleTexture"])}if(u===1){const c=`
          float ${e}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${o}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new GlslLibRoutine(c,["coordinates.sampleTexture"])}if(o===1){const c=`
          float ${e}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${u}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new GlslLibRoutine(c,["coordinates.sampleTexture"])}const l=`
        float ${e}(int index) {
          vec2 uv = uvFromFlat(${o}, ${u}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new GlslLibRoutine(l,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(e,t,r){const o=r.unpackedShape,u=[r.height,r.width];if(u!=null&&ArrayUtil.arraysEqual(o,u)){const s=u[1],p=u[0],f=`
          float ${e}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${s}.0, ${p}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new GlslLibRoutine(f,["coordinates.sampleTexture"])}const{newShape:l,keptDims:c}=squeezeShape(o),d=l;if(d.length<o.length){const s=squeezeInputShape(o,d),p=JSON.parse(JSON.stringify(r));p.unpackedShape=s;const f=["col","row"],h=`
          ${this.getUnpackedSamplerFromInput(e,t,p).routineBody}
          float ${e}(int row, int col) {
            return ${e}(${getSqueezedParams(f,c)});
          }
        `;return new GlslLibRoutine(h,["coordinates.sampleTexture"])}const i=u[1],a=u[0];if(a===1){const s=`
          float ${e}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${i}, ${a});
            float index = dot(vec3(row, col, offset_${t}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${i}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new GlslLibRoutine(s,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(i===1){const s=`
          float ${e}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${i}, ${a});
            float index = dot(vec3(row, col, offset_${t}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${a}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new GlslLibRoutine(s,["coordinates.sampleTexture","coordinates.coordsToOffset"])}const n=`
        float ${e}(int row, int col) {
          int index = col * ${o[1]} + row;
          vec2 uv = uvFromFlat(${i}, ${a}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new GlslLibRoutine(n,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(e,t,r){const o=r.unpackedShape,u=o[1]*o[2],l=o[2],{newShape:c,keptDims:d}=squeezeShape(o),i=c;if(i.length<o.length){const p=squeezeInputShape(o,i),f=["batch","col","row"],h=JSON.parse(JSON.stringify(r));h.unpackedShape=p;const m=this.getUnpackedSamplerFromInput(e,t,h),_=d.reverse(),y=`
          ${m.routineBody}
          float ${e}(int batch, int row, int col) {
            return ${e}(${getSqueezedParams(f,_)});
          }
        `;return new GlslLibRoutine(y,m.dependencies)}const a=r.width,n=r.height,s=`
          float ${e}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${u} + col * ${l} + row;
            vec2 uv = uvFromFlat(${a}, ${n}, index);
            return sampleTexture(${t}, uv);
          }
      `;return new GlslLibRoutine(s,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(e,t,r){const o=r.unpackedShape,u=o[3],l=o[2]*u,c=o[1]*l,d=r.width,i=r.height,a=`
        float ${e}(int row, int col, int depth, int depth2) {
          int index = row * ${c} + col * ${l} +
              depth2 * ${u} + depth;
          vec2 uv = uvFromFlat(${d}, ${i}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new GlslLibRoutine(a,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(e,t,r){const o=r.unpackedShape,u=o[4],l=o[3]*u,c=o[2]*l,d=o[1]*c,{newShape:i,keptDims:a}=squeezeShape(o);if(i.length<o.length){const f=squeezeInputShape(o,i),h=["row","col","depth","depth2","depth3"],m=JSON.parse(JSON.stringify(r));m.unpackedShape=f;const _=`
          ${this.getUnpackedSamplerFromInput(e,t,m).routineBody}
          float ${e}(int row, int col, int depth, int depth2, int depth3) {
            return ${e}(${getSqueezedParams(h,a)});
          }
        `;return new GlslLibRoutine(_,["coordinates.sampleTexture","coordinates.uvFromFlat"])}const n=r.width,s=r.height,p=`
        float ${e}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${d} + col * ${c} + depth * ${l} +
          depth3 * ${u} + depth2;
          vec2 uv = uvFromFlat(${n}, ${s}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new GlslLibRoutine(p,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(e,t,r){const o=r.unpackedShape,u=o[5],l=o[4]*u,c=o[3]*l,d=o[2]*c,i=o[1]*d,{newShape:a,keptDims:n}=squeezeShape(o);if(a.length<o.length){const h=squeezeInputShape(o,a),m=["row","col","depth","depth2","depth3","depth4"],_=JSON.parse(JSON.stringify(r));_.unpackedShape=h;const y=`
            ${this.getUnpackedSamplerFromInput(e,t,_).routineBody}
            float ${e}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${e}(${getSqueezedParams(m,n)});
            }
          `;return new GlslLibRoutine(y,["coordinates.sampleTexture","coordinates.uvFromFlat"])}const s=r.width,p=r.height,f=`
          float ${e}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${i} + col * ${d} + depth * ${c} +
            depth2 * ${l} + depth3 * ${u} + depth4;
            vec2 uv = uvFromFlat(${s}, ${p}, index);
            return sampleTexture(${t}, uv);
          }
        `;return new GlslLibRoutine(f,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){const e=this.context.outputTextureLayout,t=e.shape.length,r=e.strides,o=e.width,u=e.height,l=[];for(let d=0;d<t-1;++d)l.push(`
        c[${d}] = offset / ${r[d]};`),l.push(`
        offset -= c[${d}] * ${r[d]};`);l.push(`
        c[${t-1}] = offset;`);const c=`
      void toVec(vec2 texCoords, out int c[${t}]) {
        int offset = coordsToOffset(texCoords, ${o}, ${u});
        ${l.join("")}
      }
      void toVec(int offset, out int c[${t}]) {
        ${l.join("")}
      }
    `;return{toVec:new GlslLibRoutine(c,["coordinates.coordsToOffset"])}}valueFrom(){const e={};return this.context.programInfo.inputNames.forEach((t,r)=>{const o=this.context.inputTextureLayouts[r],l=(o.unpackedShape.length>0?o.unpackedShape:o.shape).length;let c=`_${t}`;e[c]=new GlslLibRoutine(this.getValueFromSingle(t,l,o.width,o.height,!1),[`shapeUtils.indicesToOffset${c}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),c=c+"_T",e[c]=new GlslLibRoutine(this.getValueFromSingle(t,l,o.width,o.height,!0),[`shapeUtils.indicesToOffset${c}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),e}getValueFromSingle(e,t,r,o,u){let l=`_${e}`;u&&(l=l+"_T");const c=getGlsl(this.context.glContext.version);return`
        float ${l}(int m[${t}]) {
          int offset = indicesToOffset${l}(m);
          vec2 coords = offsetToCoords(offset, ${r}, ${o});
          float value = getColorAsFloat(${c.texture2D}(${e}, coords));
          return value;
        }
        `}getPackedValueFrom(e,t,r,o,u){let l=`_${e}_Pack`;u&&(l=l+"_T");const c=getGlsl(this.context.glContext.version);return`
        vec4 ${l}(int m[${t}]) {
          int offset = indicesToOffset_${e}(m);
          vec2 coords = offsetToCoords(offset, ${r}, ${o});
          return ${c.texture2D}(${e}, coords);
        }
        `}}}}),EncodingGlslLib,init_glsl_encoding_lib=__esm({"web/lib/onnxjs/backends/webgl/glsl-encoding-lib.ts"(){init_glsl_definitions(),EncodingGlslLib=class Ne extends GlslLib{constructor(t){super(t)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new GlslLibRoutine(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new GlslLibRoutine(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){const t=Ne.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new GlslLibRoutine(`
      highp vec4 encode(highp float f) {
        highp float F = abs(f);
        highp float Sign = step(0.0,-f);
        highp float Exponent = floor(log2(F));
        highp float Mantissa = (exp2(- Exponent) * F);
        Exponent = floor(log2(F) + 127.0) + floor(log2(Mantissa));
        highp vec4 rgba;
        rgba[0] = 128.0 * Sign  + floor(Exponent*exp2(-1.0));
        rgba[1] = 128.0 * mod(Exponent,2.0) + mod(floor(Mantissa*128.0),128.0);
        rgba[2] = floor(mod(floor(Mantissa*exp2(23.0 -8.0)),exp2(8.0)));
        rgba[3] = floor(exp2(23.0)*mod(Mantissa,exp2(-15.0)));
        ${t}
        rgba = rgba / 255.0; // values need to be normalized to [0,1]
        return rgba;
    }
        `)}}decodeUint8(){const t=Ne.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new GlslLibRoutine(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${t}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){const t=new ArrayBuffer(4),r=new Uint32Array(t),o=new Uint8Array(t);if(r[0]=3735928559,o[0]===239)return!0;if(o[0]===222)return!1;throw new Error("unknown endianness")}}}}),FragColorGlslLib,init_glsl_fragcolor_lib=__esm({"web/lib/onnxjs/backends/webgl/glsl-fragcolor-lib.ts"(){init_glsl_definitions(),init_glsl_source(),FragColorGlslLib=class extends GlslLib{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){const e=getGlsl(this.context.glContext.version);return{setFragColor:new GlslLibRoutine(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new GlslLibRoutine(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}}}),ShapeUtilsGlslLib,init_glsl_shape_utils_lib=__esm({"web/lib/onnxjs/backends/webgl/glsl-shape-utils-lib.ts"(){init_glsl_definitions(),ShapeUtilsGlslLib=class ge extends GlslLib{constructor(t){super(t)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){const t=this.context.outputTextureLayout.shape.length,r={};return this.context.programInfo.inputNames.forEach((o,u)=>{const l=this.context.inputTextureLayouts[u].unpackedShape;if(l.length<=t){const c=l.length,d=t-c,i=`bcastIndices_${o}`;let a="";for(let s=0;s<c;++s)a+=`
          realIndices[${s}] = int( mod(float(bcastedIndices[${d+s}]), ${l[s]}.0) );
          `;const n=`
        void ${i} (int bcastedIndices[${t}], out int realIndices[${c}]) {
          ${a}
        }
        `;r[i]=new GlslLibRoutine(n)}}),r}bcastMatmulIndex(){const t=this.context.outputTextureLayout.shape.length,r={};return this.context.programInfo.inputNames.forEach((o,u)=>{const l=this.context.inputTextureLayouts[u].shape;if(!(l.length<2||l.length>t)){const c=l.length,d=t-c,i=`bcastMatmulIndices_${o}`;let a="";for(let s=0;s<c-2;++s)a+=`
          realIndices[${s}] = int( mod(float(bcastedIndices[${d+s}]), ${l[s]}.0) );
          `;const n=`
        void ${i}(int bcastedIndices[${t}], out int realIndices[${c}]) {
          ${a}
          realIndices[${c-1}] = bcastedIndices[${t-1}];
          realIndices[${c-2}] = bcastedIndices[${t-2}];
        }
        `;r[i]=new GlslLibRoutine(n)}}),r}indicesToOffset(){const t={};return this.context.programInfo.inputNames.forEach((r,o)=>{const u=this.context.inputTextureLayouts[o].shape,l=this.context.inputTextureLayouts[o].strides,c=u.length;let d=`indicesToOffset_${r}`;t[d]=new GlslLibRoutine(ge.indexToOffsetSingle(d,c,l)),d=`indicesToOffset_${r}_T`,t[d]=new GlslLibRoutine(ge.indexToOffsetSingle(d,c,l.slice().reverse()))}),t}static indexToOffsetSingle(t,r,o){let u="";for(let l=r-1;l>=0;--l)u+=`
        offset += indices[${l}] * ${o[l]};
        `;return`
      int ${t}(int indices[${r}]) {
        int offset = 0;
        ${u}
        return offset;
      }
      `}offsetToIndices(){const t={};return this.context.programInfo.inputNames.forEach((r,o)=>{const u=this.context.inputTextureLayouts[o].shape,l=this.context.inputTextureLayouts[o].strides,c=u.length;let d=`offsetToIndices_${r}`;t[d]=new GlslLibRoutine(ge.offsetToIndicesSingle(d,c,l)),d=`offsetToIndices_${r}_T`,t[d]=new GlslLibRoutine(ge.offsetToIndicesSingle(d,c,l.slice().reverse()))}),t}static offsetToIndicesSingle(t,r,o){const u=[];for(let l=0;l<r-1;++l)u.push(`
      indices[${l}] = offset / ${o[l]};`),u.push(`
        offset -= indices[${l}] * ${o[l]};`);return u.push(`
      indices[${r-1}] = offset;`),`
      void ${t}(int offset, out int indices[${r}]) {
        ${u.join("")}
      }
      `}incrementIndices(){const t={};return this.context.programInfo.inputNames.forEach((r,o)=>{const u=this.context.inputTextureLayouts[o].shape,l=u.length,c=`incrementIndices_${r}`;let d="";for(let a=0;a<l;++a)d+=`
        shape[${a}] = ${u[a]};`;const i=`
        void ${c}(int axis, out int indices[${l}]) {
          int shape[${l}];
          ${d};
          for(int i = ${l} -1 ; i >= 0; --i) {
            if(i > axis) continue;
            indices[i] += 1;
            if(indices[i] < shape[i]) {
              break;
            }
            indices[i] = 0;
          }
        }
        `;t[c]=new GlslLibRoutine(i)}),t}}}}),VecGlslLib,init_glsl_vec_lib=__esm({"web/lib/onnxjs/backends/webgl/glsl-vec-lib.ts"(){init_glsl_definitions(),VecGlslLib=class extends GlslLib{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){const t=this.context.outputTextureLayout.shape.length,r={add:"+=",sub:"-=",mul:"*=",div:"/="},o={};for(const u in r){const l=`${u}Vec`;let c="";for(let i=0;i<t;++i)c+=`
          dest[${i}] ${r[u]} src[${i}];
          `;const d=`
        void ${l}(int src[${t}], out int dest[${t}]) {
          ${c}
        }
        `;o[l]=new GlslLibRoutine(d)}return o}copyVec(){const t=this.context.outputTextureLayout.shape.length;let r="";for(let u=0;u<t;++u)r+=`
        dest[${u}] = src[${u}];
        `;const o=`
      void copyVec(int src[${t}], out int dest[${t}]) {
        ${r}
      }
      `;return{copyVec:new GlslLibRoutine(o)}}setVecItem(){const t=this.context.outputTextureLayout.shape.length;let r=`
        if(index < 0)
            index =${t} + index;
        if (index == 0)
            m[0] = value;
        `;for(let u=1;u<t-1;++u)r+=`
        else if (index == ${u})
            m[${u}] = value;
            `;r+=`
        else
            m[${t-1}] = value;
        `;const o=`
      void setVecItem(out int m[${t}], int index, int value) {
        ${r}
      }
        `;return{setVecItem:new GlslLibRoutine(o)}}getVecItem(){const t=this.context.outputTextureLayout.shape.length;let r=`
        if(index < 0)
            index = ${t} + index;
        if (index == 0)
            return m[0];
      `;for(let u=1;u<t-1;++u)r+=`
        else if (index == ${u})
            return m[${u}];
      `;r+=`
        else
            return m[${t-1}];
        `;const o=`
      int getVecItem(int m[${t}], int index) {
        ${r}
      }
    `;return{getVecItem:new GlslLibRoutine(o)}}}}}),glslRegistry,init_glsl_registered_libs=__esm({"web/lib/onnxjs/backends/webgl/glsl-registered-libs.ts"(){init_glsl_coordinate_lib(),init_glsl_encoding_lib(),init_glsl_fragcolor_lib(),init_glsl_shape_utils_lib(),init_glsl_vec_lib(),glslRegistry={encoding:EncodingGlslLib,fragcolor:FragColorGlslLib,vec:VecGlslLib,shapeUtils:ShapeUtilsGlslLib,coordinates:CoordsGlslLib}}}),GlslPreprocessor,init_glsl_preprocessor=__esm({"web/lib/onnxjs/backends/webgl/glsl-preprocessor.ts"(){init_glsl_definitions(),init_glsl_function_inliner(),init_glsl_registered_libs(),init_glsl_source(),GlslPreprocessor=class{constructor(e,t,r,o){this.libs={},this.glslLibRoutineDependencyGraph={},this.context=new GlslContext(e,t,r,o),Object.keys(glslRegistry).forEach(l=>{const c=new glslRegistry[l](this.context);this.libs[l]=c});const u=this.glslLibRoutineDependencyGraph;for(const l in this.libs){const d=this.libs[l].getFunctions();for(const i in d){const a=l+"."+i;let n;u[a]?(n=u[a],n.routineBody=d[i].routineBody):(n=new GlslLibRoutineNode(a,d[i].routineBody),u[a]=n);const s=d[i].dependencies;if(s)for(let p=0;p<s.length;++p)if(u[s[p]])n.addDependency(u[s[p]]);else{const f=new GlslLibRoutineNode(s[p]);u[s[p]]=f,n.addDependency(f)}}}}preprocess(){const e=this.context.programInfo;let t=e.shaderSource;return this.context.programInfo.hasMain||(t=`${t}
      ${getDefaultFragShaderMain(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),t=replaceInlines(t),`${getFragShaderPreamble(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(t)}
    ${t}`}getImports(e){const t=this.selectGlslLibRoutinesToBeIncluded(e);if(t.length===0)return"";let r="";for(let o=0;o<t.length;++o)if(t[o].routineBody)r+=t[o].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${t[o].name}`);return r}selectGlslLibRoutinesToBeIncluded(e){const t=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(r=>{const o=r.split(".")[1];e.indexOf(o)!==-1&&t.push(this.glslLibRoutineDependencyGraph[r])}),TopologicalSortGlslRoutines.returnOrderedNodes(t)}getUniforms(e,t){const r=[];if(e)for(const o of e)r.push(`uniform sampler2D ${o};`);if(t)for(const o of t)r.push(`uniform ${o.type} ${o.name}${o.arrayLength?`[${o.arrayLength}]`:""};`);return r.join(`
`)}}}}),ProgramManager,init_program_manager=__esm({"web/lib/onnxjs/backends/webgl/program-manager.ts"(){init_esm(),init_instrument(),init_glsl_preprocessor(),init_glsl_source(),ProgramManager=class{constructor(e,t,r){this.profiler=e,this.glContext=t,this.textureLayoutStrategy=r,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{const o=this.glContext.gl,u=e.program;o.useProgram(u);try{this.bindOutput(r),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],t)}catch(l){throw Logger.error("ProgramManager",e.programInfo.shaderSource),l}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,t,r){return this.profiler.event("backend","ProgramManager.build",()=>{const o=new GlslPreprocessor(this.glContext,e,t,r),u=o.preprocess(),l=this.compile(u);return{programInfo:e,program:l,uniformLocations:this.getUniformLocations(l,o.context.programInfo.inputNames,o.context.programInfo.variables),attribLocations:this.getAttribLocations(l)}})}compile(e){if(!this.vertexShader){Logger.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");const o=getVertexShaderSource(this.glContext.version);this.vertexShader=this.glContext.compileShader(o,this.glContext.gl.VERTEX_SHADER)}env2.debug&&Logger.verbose("ProrgramManager",`FragShader:
${e}
`);const t=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),r=this.glContext.createProgram(this.vertexShader,t);return this.glContext.deleteShader(t),r}bindOutput(e){const t=e.width,r=e.height;Logger.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${t}/${r}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,t,r)}bindAttributes(e){const t=e.position,r=e.textureCoord;this.glContext.setVertexAttributes(t,r),this.attributesBound=!0}bindUniforms(e,t,r){const o=this.glContext.gl;let u=0;for(const{name:l,type:c,location:d,arrayLength:i}of e){const a=t.find(n=>n.name===l)?.data;if(c!=="sampler2D"&&!a)throw new Error(`variable '${l}' does not have data defined in program info`);switch(c){case"sampler2D":this.bindTexture(r[u],d,u),u++;break;case"float":i?o.uniform1fv(d,a):o.uniform1f(d,a);break;case"int":i?o.uniform1iv(d,a):o.uniform1i(d,a);break;default:throw new Error(`Uniform not implemented: ${c}`)}}}bindTexture(e,t,r){this.glContext.bindTextureToUniform(e.texture,r,t)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,t,r){const o=[];if(t)for(const u of t)o.push({name:u,type:"sampler2D",location:this.getUniformLocation(e,u)});if(r)for(const u of r)o.push({...u,location:this.getUniformLocation(e,u.name)});return o}getUniformLocation(e,t){const o=this.glContext.gl.getUniformLocation(e,t);if(o===null)throw new Error(`Uniform ${t} not found.`);return o}getAttribLocation(e,t){return this.glContext.gl.getAttribLocation(e,t)}}}}),TextureManager,init_texture_manager=__esm({"web/lib/onnxjs/backends/webgl/texture-manager.ts"(){init_instrument(),init_texture_data_encoder(),TextureManager=class{constructor(e,t,r,o){this.glContext=e,this.layoutStrategy=t,this.profiler=r,this.config=o,this.pendingRead=new Map,o.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,t,r,o){const u=this.toEncoderType(e),l=this.glContext.getEncoder(u,t.channels||1,o);if(t.isPacked&&o===1)throw new Error("not implemented");const c=t.width,d=t.height;let i,a;if(this.config.reuseTextures){i=`${c}x${d}_${l.format}_${l.internalFormat}_${l.textureType}`,a=this.inUseTextures.get(i),a||(a=[],this.inUseTextures.set(i,a));const s=this.idleTextures.get(i);if(s&&s.length>0){const p=s.pop();return a.push(p),o===1&&this.glContext.updateTexture(p,c,d,l,this.toTextureData(e,r)),p}}Logger.verbose("TextureManager",`Creating new texture of size ${t.width}x${t.height}`);const n=this.glContext.allocateTexture(c,d,l,this.toTextureData(e,r));return this.config.reuseTextures&&(a.push(n),this.textureLookup.set(n,i)),n}readTexture(e,t,r){return r||(r=1),this.profiler.event("backend","TextureManager.readTexture",()=>{const o=e.shape.reduce((l,c)=>l*c)*r,u=this.glContext.readTexture(e.texture,e.width,e.height,o,this.toEncoderType(t),r);return this.toTensorData(t,u)})}async readTextureAsync(e,t,r){const o=e.tensor.dataId;if(r||(r=1),this.pendingRead.has(o)){const u=this.pendingRead.get(o);return new Promise(l=>u?.push(l))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(o,[]);const u=e.shape.reduce((i,a)=>i*a)*r;await this.glContext.createAndWaitForFence();const l=this.glContext.readTexture(e.texture,e.width,e.height,u,this.toEncoderType(t),r),c=this.toTensorData(t,l),d=this.pendingRead.get(o);return this.pendingRead.delete(o),d?.forEach(i=>i(c)),c})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{const t=e.shape.reduce((o,u)=>o*u),r=this.glContext.readTexture(e.texture,e.width,e.height,t*4,"byte",4);return new Float32Array(r.buffer,r.byteOffset,t)})}releaseTexture(e,t){let r;if(this.config.reuseTextures&&(r=this.textureLookup.get(e.texture),r)){t&&this.textureLookup.delete(r);const o=this.inUseTextures.get(r);if(o){const u=o.indexOf(e.texture);if(u!==-1){o.splice(u,1);let l=this.idleTextures.get(r);l||(l=[],this.idleTextures.set(r,l)),l.push(e.texture)}}}(!r||t)&&(Logger.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,t){switch(e){case"int16":return t instanceof Int16Array?t:Int16Array.from(t);case"int32":return t instanceof Int32Array?t:Int32Array.from(t);case"int8":return t instanceof Int8Array?t:Int8Array.from(t);case"uint16":return t instanceof Uint16Array?t:Uint16Array.from(t);case"uint32":return t instanceof Uint32Array?t:Uint32Array.from(t);case"uint8":case"bool":return t instanceof Uint8Array?t:Uint8Array.from(t);case"float32":return t instanceof Float32Array?t:Float32Array.from(t);case"float64":return t instanceof Float64Array?t:Float64Array.from(t);default:throw new Error(`TensorData type ${e} is not supported`)}}toTextureData(e,t){if(t)return t instanceof Float32Array?t:new Float32Array(t)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}}}),WebGLSessionHandler,init_session_handler=__esm({"web/lib/onnxjs/backends/webgl/session-handler.ts"(){init_instrument(),init_opset(),init_inference_handler(),init_op_resolve_rules(),init_program_manager(),init_texture_layout_strategy(),init_texture_manager(),WebGLSessionHandler=class{constructor(e,t){this.backend=e,this.context=t,this.layoutStrategy=new PreferLogicalStrategy(e.glContext.maxTextureSize),this.programManager=new ProgramManager(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new TextureManager(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:e.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new WebGLInferenceHandler(this)}onGraphInitialized(e){const t=e.getValues().filter(r=>r.from===-1&&r.tensor).map(r=>r.tensor.dataId);this.initializers=new Set(t)}isInitializer(e){return this.initializers?this.initializers.has(e):!1}addInitializer(e){this.initializers.add(e)}getTextureData(e,t){return t?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,t,r=!1){Logger.verbose("WebGLSessionHandler","Storing Texture data in cache"),r?this.packedTextureDataCache.set(e,t):this.unpackedTextureDataCache.set(e,t)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,t,r){const o=resolveOperator(e,t,WEBGL_OP_RESOLVE_RULES);return{impl:o.opImpl,context:o.opInit?o.opInit(e,r):e}}}}});function linearSearchLastTrue(e){let t=0;for(;t<e.length&&e[t]();++t);return t-1}var WebGLContext,init_webgl_context=__esm({"web/lib/onnxjs/backends/webgl/webgl-context.ts"(){init_esm(),init_texture_data_encoder(),init_texture_data_encoder(),init_utils(),WebGLContext=class{constructor(e,t){this.frameBufferBound=!1,this.itemsToPoll=[],this.gl=e,this.version=t,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,t,r,o){const u=this.gl,l=u.createTexture();u.bindTexture(u.TEXTURE_2D,l),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MIN_FILTER,u.NEAREST),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MAG_FILTER,u.NEAREST),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_S,u.CLAMP_TO_EDGE),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_T,u.CLAMP_TO_EDGE);const c=o?r.encode(o,e*t):null;return u.texImage2D(u.TEXTURE_2D,0,r.internalFormat,e,t,0,r.format,r.textureType,c),this.checkError(),l}updateTexture(e,t,r,o,u){const l=this.gl;l.bindTexture(l.TEXTURE_2D,e);const c=o.encode(u,t*r);l.texSubImage2D(l.TEXTURE_2D,0,0,0,t,r,o.format,o.textureType,c),this.checkError()}attachFramebuffer(e,t,r){const o=this.gl;o.bindTexture(o.TEXTURE_2D,e),o.bindFramebuffer(o.FRAMEBUFFER,this.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0),this.checkError(),o.viewport(0,0,t,r),o.scissor(0,0,t,r)}readTexture(e,t,r,o,u,l){const c=this.gl;l||(l=1),this.frameBufferBound||this.attachFramebuffer(e,t,r);const d=this.getEncoder(u,l),i=d.allocate(t*r);return c.bindTexture(c.TEXTURE_2D,e),c.framebufferTexture2D(c.FRAMEBUFFER,c.COLOR_ATTACHMENT0,c.TEXTURE_2D,e,0),c.readPixels(0,0,t,r,c.RGBA,d.textureType,i),this.checkError(),d.decode(i,o)}isFramebufferReady(){return!0}getActiveTexture(){const e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,t){const r=this.gl;r.vertexAttribPointer(e,3,r.FLOAT,!1,20,0),r.enableVertexAttribArray(e),t!==-1&&(r.vertexAttribPointer(t,2,r.FLOAT,!1,20,12),r.enableVertexAttribArray(t)),this.checkError()}createProgram(e,t){const r=this.gl,o=r.createProgram();return r.attachShader(o,e),r.attachShader(o,t),r.linkProgram(o),o}compileShader(e,t){const r=this.gl,o=r.createShader(t);if(!o)throw new Error(`createShader() returned null with type ${t}`);if(r.shaderSource(o,e),r.compileShader(o),r.getShaderParameter(o,r.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${r.getShaderInfoLog(o)}
Shader source:
${e}`);return o}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,t,r){const o=this.gl;o.activeTexture(o.TEXTURE0+t),this.checkError(),o.bindTexture(o.TEXTURE_2D,e),this.checkError(),o.uniform1i(r,t),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(env2.debug){const e=this.gl,t=e.getError();let r="";switch(t){case e.NO_ERROR:return;case e.INVALID_ENUM:r="INVALID_ENUM";break;case e.INVALID_VALUE:r="INVALID_VALUE";break;case e.INVALID_OPERATION:r="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:r="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:r="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:r="CONTEXT_LOST_WEBGL";break;default:r=`Unknown WebGL Error: ${t.toString(16)}`}throw new Error(r)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,t,r=0){if(this.version===2)return new RedFloat32DataEncoder(this.gl,t);switch(e){case"float":return r===1||this.isRenderFloat32Supported?new RGBAFloatDataEncoder(this.gl,t):new RGBAFloatDataEncoder(this.gl,t,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new Uint8DataEncoder(this.gl,t);default:throw new Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){const e=this.gl;for(let t=0;t<this.maxTextureImageUnits;++t)e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;const e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){const e=this.gl,t=e.createBuffer();if(!t)throw new Error("createBuffer() returned null");const r=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,r,e.STATIC_DRAW),this.checkError(),t}createFramebuffer(){const e=this.gl.createFramebuffer();if(!e)throw new Error("createFramebuffer returned null");return e}queryVitalParameters(){const e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){const e=this.gl,t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t);const r=this.version===2?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,r,1,1,0,e.RGBA,e.FLOAT,null);const o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0);const u=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(t),e.deleteFramebuffer(o),u}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){const e=this.gl;let t,r,o,u,l;try{t=e.createTexture(),r=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,t);const c=this.version===2?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,c,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),e.enable(e.BLEND),o=e.createShader(e.VERTEX_SHADER),!o||(e.shaderSource(o,"void main(){}"),e.compileShader(o),u=e.createShader(e.FRAGMENT_SHADER),!u)||(e.shaderSource(u,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(u),l=e.createProgram(),!l)?!1:(e.attachShader(l,o),e.attachShader(l,u),e.linkProgram(l),e.useProgram(l),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),l&&e.deleteProgram(l),o&&e.deleteShader(o),u&&e.deleteShader(u),r&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(r)),t&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(t))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){const e=this.gl,t=this.disjointTimerQueryWebgl2Extension,r=e.createQuery();return e.beginQuery(t.TIME_ELAPSED_EXT,r),r}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){const e=this.gl,t=this.disjointTimerQueryWebgl2Extension;e.endQuery(t.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let t=!1,r=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){const o=this.gl,u=this.disjointTimerQueryWebgl2Extension;t=o.getQueryParameter(e,o.QUERY_RESULT_AVAILABLE),r=o.getParameter(u.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return t&&!r}getTimerResult(e){let t=0;if(this.version===2){const r=this.gl;t=r.getQueryParameter(e,r.QUERY_RESULT),r.deleteQuery(e)}else throw new Error("WebGL1 profiling currently not supported");return t/1e6}async waitForQueryAndGetTime(e){return await repeatedTry(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){const e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let t;const r=e,o=r.fenceSync(r.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),o===null?t=()=>!0:t=()=>{const u=r.clientWaitSync(o,0,0);return u===r.ALREADY_SIGNALED||u===r.CONDITION_SATISFIED},{query:o,isFencePassed:t}}async pollFence(e){return new Promise(t=>{this.addItemToPoll(()=>e.isFencePassed(),()=>t())})}pollItems(){const e=linearSearchLastTrue(this.itemsToPoll.map(t=>t.isDoneFn));for(let t=0;t<=e;++t){const{resolveFn:r}=this.itemsToPoll[t];r()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,t){this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),!(this.itemsToPoll.length>1)&&await repeatedTry(()=>(this.pollItems(),this.itemsToPoll.length===0))}}}});function createWebGLContext(e){let t;if((!e||e==="webgl2")&&"webgl2"in cache?t=cache.webgl2:(!e||e==="webgl")&&"webgl"in cache&&(t=cache.webgl),!t)try{const o=createOffscreenCanvas();t=createNewWebGLContext(o,e)}catch{const u=createCanvas();t=createNewWebGLContext(u,e)}e=e||t.version===1?"webgl":"webgl2";const r=t.gl;return cache[e]=t,r.isContextLost()?(delete cache[e],createWebGLContext(e)):(r.disable(r.DEPTH_TEST),r.disable(r.STENCIL_TEST),r.disable(r.BLEND),r.disable(r.DITHER),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SAMPLE_COVERAGE),r.enable(r.SCISSOR_TEST),r.enable(r.CULL_FACE),r.cullFace(r.BACK),t)}function createNewWebGLContext(e,t){const r={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1};let o;const u=r;if((!t||t==="webgl2")&&(o=e.getContext("webgl2",u),o))try{return new WebGLContext(o,2)}catch(l){Logger.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${l}`)}if((!t||t==="webgl")&&(o=e.getContext("webgl",u)||e.getContext("experimental-webgl",u),o))try{return new WebGLContext(o,1)}catch(l){Logger.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${l}`)}throw new Error("WebGL is not supported")}function createCanvas(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");const e=document.createElement("canvas");return e.width=1,e.height=1,e}function createOffscreenCanvas(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var cache,init_webgl_context_factory=__esm({"web/lib/onnxjs/backends/webgl/webgl-context-factory.ts"(){init_instrument(),init_webgl_context(),cache={}}}),WebGLBackend,init_backend_webgl=__esm({"web/lib/onnxjs/backends/backend-webgl.ts"(){init_esm(),init_instrument(),init_session_handler(),init_webgl_context_factory(),WebGLBackend=class{get contextId(){return env2.webgl.contextId}set contextId(e){env2.webgl.contextId=e}get matmulMaxBatchSize(){return env2.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){env2.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return env2.webgl.textureCacheMode}set textureCacheMode(e){env2.webgl.textureCacheMode=e}get pack(){return env2.webgl.pack}set pack(e){env2.webgl.pack=e}get async(){return env2.webgl.async}set async(e){env2.webgl.async=e}initialize(){try{return this.glContext=createWebGLContext(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),Logger.setWithEnv(env2),env2.webgl.context||Object.defineProperty(env2.webgl,"context",{value:this.glContext.gl}),Logger.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return Logger.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new WebGLSessionHandler(this,e)}dispose(){this.glContext.dispose()}}}});async function resolveBackend(e){if(e){const t=typeof e=="string"?[e]:e;for(const r of t){const o=backendsCache.get(r);if(o)return o;const u=await tryLoadBackend(r);if(u)return u}}else return resolveBackend(["webgl"]);throw new Error("no available backend to use")}async function tryLoadBackend(e){const t=backend;if(typeof t[e]<"u"&&isBackend(t[e])){const r=t[e];let o=r.initialize();if(typeof o=="object"&&"then"in o&&(o=await o),o)return backendsCache.set(e,r),r}}function isBackend(e){const t=e;return"initialize"in t&&typeof t.initialize=="function"&&"createSessionHandler"in t&&typeof t.createSessionHandler=="function"&&"dispose"in t&&typeof t.dispose=="function"}var backendsCache,backend,init_backend2=__esm({"web/lib/onnxjs/backend.ts"(){init_backend_webgl(),backendsCache=new Map,backend={webgl:new WebGLBackend}}}),KernelOp,ExecutionPlan,init_execution_plan=__esm({"web/lib/onnxjs/execution-plan.ts"(){init_instrument(),KernelOp=class{constructor(e,t){this.op=e,this.node=t}},ExecutionPlan=class{constructor(e,t,r){this.graph=e,this.profiler=r,this.initialize(t)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{const t=this.graph.getNodes();if(t.length!==e.length)throw new Error("The size of nodes and OPs do not match.");this._ops=e.map((r,o)=>new KernelOp(r,t[o])),this.reset(),this._starter=[],this._ops.forEach((r,o)=>{let u=!0;for(const l of r.node.inputs)if(!this._values[l]&&this.graph.getInputIndices().indexOf(l)===-1){u=!1;break}u&&this._starter.push(o)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,t){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();const r=e.createInferenceHandler(),o=this.graph.getInputIndices();if(t.length!==o.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${t.length} expected: ${o.length}`);t.forEach((a,n)=>{const s=o[n];this._values[s]=a});const u=this._starter.slice(0),l=this.graph.getValues(),c=this.graph.getNodes();let d=0;for(;d<u.length;){const a=u[d++],n=this._ops[a],s=n.node.inputs.map(m=>this._values[m]);if(s.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${n.node}`);const p=s;Logger.verbose("ExecPlan",`Running op:${n.node.name} (${p.map((m,_)=>`'${n.node.inputs[_]}': ${m.type}[${m.dims.join(",")}]`).join(", ")})`);const f=await this.profiler.event("node",n.node.name,async()=>n.op.impl(r,p,n.op.context));if(f.length!==n.node.outputs.length)throw new Error("the size of output does not match model definition.");f.forEach((m,_)=>{const y=n.node.outputs[_];if(this._values[y])throw new Error(`output [${y}] already has value: op:${n.node.name}`);this._values[y]=m});const h=new Set;f.forEach((m,_)=>{const y=n.node.outputs[_];for(const g of l[y].to){const b=c[g];let v=!0;for(const w of b.inputs)if(!this._values[w]){v=!1;break}v&&h.add(g)}}),u.push(...h)}const i=[];for(let a=0;a<this.graph.getOutputIndices().length;a++){const n=this.graph.getOutputIndices()[a],s=this._values[n];if(s===void 0)throw new Error(`required output [${n}] does not have value`);n===0?await s.getData():s.data,i.push(s)}return Logger.verbose("ExecPlan","disposing of inferenceHandler"),r.dispose(),i})}}}}),import_onnx3,Attribute2,init_attribute=__esm({"web/lib/onnxjs/attribute.ts"(){init_ort_generated(),import_onnx3=__toESM(require_onnx()),init_tensor2(),init_util(),Attribute2=class ye{constructor(t){if(this._attributes=new Map,t!=null){for(const r of t)r instanceof import_onnx3.onnx.AttributeProto?this._attributes.set(r.name,[ye.getValue(r),ye.getType(r)]):r instanceof import_attribute.Attribute&&this._attributes.set(r.name(),[ye.getValue(r),ye.getType(r)]);if(this._attributes.size<t.length)throw new Error("duplicated attribute names")}}set(t,r,o){this._attributes.set(t,[o,r])}delete(t){this._attributes.delete(t)}getFloat(t,r){return this.get(t,"float",r)}getInt(t,r){return this.get(t,"int",r)}getString(t,r){return this.get(t,"string",r)}getTensor(t,r){return this.get(t,"tensor",r)}getFloats(t,r){return this.get(t,"floats",r)}getInts(t,r){return this.get(t,"ints",r)}getStrings(t,r){return this.get(t,"strings",r)}getTensors(t,r){return this.get(t,"tensors",r)}get(t,r,o){const u=this._attributes.get(t);if(u===void 0){if(o!==void 0)return o;throw new Error(`required attribute not found: ${t}`)}if(u[1]!==r)throw new Error(`type mismatch: expected ${r} but got ${u[1]}`);return u[0]}static getType(t){const r=t instanceof import_onnx3.onnx.AttributeProto?t.type:t.type();switch(r){case import_onnx3.onnx.AttributeProto.AttributeType.FLOAT:return"float";case import_onnx3.onnx.AttributeProto.AttributeType.INT:return"int";case import_onnx3.onnx.AttributeProto.AttributeType.STRING:return"string";case import_onnx3.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case import_onnx3.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case import_onnx3.onnx.AttributeProto.AttributeType.INTS:return"ints";case import_onnx3.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case import_onnx3.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${import_onnx3.onnx.AttributeProto.AttributeType[r]}`)}}static getValue(t){const r=t instanceof import_onnx3.onnx.AttributeProto?t.type:t.type();if(r===import_onnx3.onnx.AttributeProto.AttributeType.GRAPH||r===import_onnx3.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");const o=this.getValueNoCheck(t);if(r===import_onnx3.onnx.AttributeProto.AttributeType.INT&&LongUtil.isLong(o))return LongUtil.longToNumber(o);if(r===import_onnx3.onnx.AttributeProto.AttributeType.INTS){const u=o,l=new Array(u.length);for(let c=0;c<u.length;c++){const d=u[c];l[c]=LongUtil.longToNumber(d)}return l}if(r===import_onnx3.onnx.AttributeProto.AttributeType.TENSOR)return t instanceof import_onnx3.onnx.AttributeProto?Tensor4.fromProto(o):Tensor4.fromOrtTensor(o);if(r===import_onnx3.onnx.AttributeProto.AttributeType.TENSORS){if(t instanceof import_onnx3.onnx.AttributeProto)return o.map(l=>Tensor4.fromProto(l));if(t instanceof import_attribute.Attribute)return o.map(l=>Tensor4.fromOrtTensor(l))}return r===import_onnx3.onnx.AttributeProto.AttributeType.STRING&&t instanceof import_onnx3.onnx.AttributeProto?decodeUtf8String(o):r===import_onnx3.onnx.AttributeProto.AttributeType.STRINGS&&t instanceof import_onnx3.onnx.AttributeProto?o.map(decodeUtf8String):o}static getValueNoCheck(t){return t instanceof import_onnx3.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(t):this.getValueNoCheckFromOrtFormat(t)}static getValueNoCheckFromOnnxFormat(t){switch(t.type){case import_onnx3.onnx.AttributeProto.AttributeType.FLOAT:return t.f;case import_onnx3.onnx.AttributeProto.AttributeType.INT:return t.i;case import_onnx3.onnx.AttributeProto.AttributeType.STRING:return t.s;case import_onnx3.onnx.AttributeProto.AttributeType.TENSOR:return t.t;case import_onnx3.onnx.AttributeProto.AttributeType.GRAPH:return t.g;case import_onnx3.onnx.AttributeProto.AttributeType.FLOATS:return t.floats;case import_onnx3.onnx.AttributeProto.AttributeType.INTS:return t.ints;case import_onnx3.onnx.AttributeProto.AttributeType.STRINGS:return t.strings;case import_onnx3.onnx.AttributeProto.AttributeType.TENSORS:return t.tensors;case import_onnx3.onnx.AttributeProto.AttributeType.GRAPHS:return t.graphs;default:throw new Error(`unsupported attribute type: ${import_onnx3.onnx.AttributeProto.AttributeType[t.type]}`)}}static getValueNoCheckFromOrtFormat(t){switch(t.type()){case import_attribute_type.AttributeType.FLOAT:return t.f();case import_attribute_type.AttributeType.INT:return t.i();case import_attribute_type.AttributeType.STRING:return t.s();case import_attribute_type.AttributeType.TENSOR:return t.t();case import_attribute_type.AttributeType.GRAPH:return t.g();case import_attribute_type.AttributeType.FLOATS:return t.floatsArray();case import_attribute_type.AttributeType.INTS:{const r=[];for(let o=0;o<t.intsLength();o++)r.push(t.ints(o));return r}case import_attribute_type.AttributeType.STRINGS:{const r=[];for(let o=0;o<t.stringsLength();o++)r.push(t.strings(o));return r}case import_attribute_type.AttributeType.TENSORS:{const r=[];for(let o=0;o<t.tensorsLength();o++)r.push(t.tensors(o));return r}default:throw new Error(`unsupported attribute type: ${import_attribute_type.AttributeType[t.type()]}`)}}}}}),import_onnx4,Graph2,Value,Node2,GraphImpl,init_graph=__esm({"web/lib/onnxjs/graph.ts"(){init_attribute(),init_ort_generated(),import_onnx4=__toESM(require_onnx()),init_tensor2(),init_util(),Graph2={from:(e,t)=>new GraphImpl(e,t)},Value=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=ProtoUtil.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},Node2=class{constructor(e,t){e instanceof import_onnx4.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new Attribute2(e.attribute)):e instanceof import_node.Node&&(this.name=t??e.name(),this.opType=e.opType(),this.attributes=new Attribute2(ProtoUtil.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},GraphImpl=class{constructor(e,t){if(!e)throw new TypeError("graph is empty");this.buildGraph(e),this.transformGraph(t),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof import_onnx4.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof import_graph.Graph)this.buildGraphFromOrtFormat(e);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){const t=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];const r=new Map;if(!e.input)throw new Error("missing information in graph: input");const o=[];for(const u of e.input){if(t.has(u.name))throw new Error(`duplicated input name: ${u.name}`);const l=this._allData.push(new Value(u))-1;t.set(u.name,l),o.push(u.name)}if(!e.initializer)throw new Error("missing information in graph: initializer");for(const u of e.initializer){let l=t.get(u.name);if(l===void 0){const c=new Value;c.type={shape:{dims:ProtoUtil.tensorDimsFromProto(u.dims)},tensorType:ProtoUtil.tensorDataTypeFromProto(u.dataType)},l=this._allData.push(c)-1,t.set(u.name,l)}this._allData[l]._from=-1,this._allData[l].tensor=Tensor4.fromProto(u)}for(let u=0;u<this._allData.length;u++)this._allData[u].tensor||(this._allInputIndices.push(u),this._allInputNames.push(o[u]));if(!e.output)throw new Error("missing information in graph: output");for(const u of e.output){if(t.has(u.name))throw new Error(`duplicated output name: ${u.name}`);const l=this._allData.push(new Value(u))-1;t.set(u.name,l),this._allOutputIndices.push(l),this._allOutputNames.push(u.name)}if(!e.node)throw new Error("missing information in graph: node");for(const u of e.node){if(!u.name)for(let c=0;;c++){const d=`unnamed_${u.opType}_${c}`;if(!r.has(d)){u.name=d;break}}if(r.has(u.name))throw new Error(`duplicated node name: ${u.name}`);const l=this._nodes.push(new Node2(u))-1;r.set(u.name,l)}for(let u=0;u<this._nodes.length;u++){const l=this._nodes[u],c=e.node[u];if(!c.output)throw new Error(`missing output for node: ${c.name}`);for(const d of c.output){let i=t.get(d);if(typeof i>"u"&&(i=this._allData.push(new Value)-1,t.set(d,i)),l.outputs.push(i),this._allData[i]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${i}`);if(this._allData[i]._from=u,c.opType==="Constant"){if(!c.attribute||c.attribute.length!==1||!c.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!c.output||c.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");l.outputs.pop(),l.executeNode=!1,this._allData[i]._from=-1,this._allData[i].tensor=Tensor4.fromProto(c.attribute[0].t)}}}for(let u=0;u<this._nodes.length;u++){const l=this._nodes[u],c=e.node[u];if(!c.input)throw new Error(`missing input for node: ${c.name}`);for(const d of c.input){const i=t.get(d);if(typeof i>"u"){if(d===""&&(c.input.length===3||c.input.length===4)&&c.opType==="Resize")continue;throw new Error(`unrecognized input '${d}' for node: ${c.name}`)}l.inputs.push(i),this._allData[i]._to.push(u)}}return!0}buildGraphFromOrtFormat(e){const t=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];const r=new Map,o=[];for(let u=0;u<e.inputsLength();u++){const l=e.inputs(u);if(t.has(l))throw new Error(`duplicated input name: ${l}`);for(let c=0;c<e.nodeArgsLength();c++)if(e.nodeArgs(c)?.name()===l){const d=new Value;if(e.nodeArgs(c)?.type()?.valueType()!==import_type_info_value.TypeInfoValue.tensor_type)throw new Error("Unexpected value type for the nodeArg.");const a=e.nodeArgs(c).type().value(new import_tensor_type_and_shape.TensorTypeAndShape),n=ProtoUtil.tensorDataTypeFromProto(a.elemType()),s=a.shape(),p=[];for(let h=0;h<s.dimLength();h++)p.push(LongUtil.longToNumber(s.dim(h).value().dimValue()));d.type={shape:{dims:p},tensorType:n};const f=this._allData.push(d)-1;t.set(l,f),o.push(l)}}for(let u=0;u<e.initializersLength();u++){const l=e.initializers(u);let c=t.get(l.name());if(c===void 0){const d=new Value,i=ProtoUtil.tensorDimsFromORTFormat(l),a=ProtoUtil.tensorDataTypeFromProto(l.dataType());d.type={shape:{dims:i},tensorType:a},c=this._allData.push(d)-1,t.set(l.name(),c)}this._allData[c]._from=-1,this._allData[c].tensor=Tensor4.fromOrtTensor(l)}for(let u=0;u<this._allData.length;u++)this._allData[u].tensor||(this._allInputIndices.push(u),this._allInputNames.push(o[u]));for(let u=0;u<e.outputsLength();u++){const l=e.outputs(u);if(t.has(l))throw new Error(`duplicated output name: ${l}`);const c=this._allData.push(new Value)-1;t.set(l,c),this._allOutputIndices.push(c),this._allOutputNames.push(l)}if(!e.nodes)throw new Error("missing information in graph: node");for(let u=0;u<e.nodesLength();u++){const l=e.nodes(u);let c=l.name();if(!c)for(let i=0;c=`unnamed_${l.opType()}_${i}`,!!r.has(c);i++);if(r.has(c))throw new Error(`duplicated node name: ${c}`);const d=this._nodes.push(new Node2(l,c))-1;r.set(c,d)}for(let u=0;u<this._nodes.length;u++){const l=this._nodes[u],c=e.nodes(u);if(c==null)throw new Error(`No node exists at index ${u}`);if(c?.outputsLength()===0)throw new Error(`missing output for node: ${c.name}`);for(let d=0;d<c?.outputsLength();d++){const i=c?.outputs(d);let a=t.get(i);if(typeof a>"u"&&(a=this._allData.push(new Value)-1,t.set(i,a)),l.outputs.push(a),this._allData[a]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${a}`);if(this._allData[a]._from=u,c.opType()==="Constant"){if(c.attributesLength()!==1||!c.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(c.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");l.outputs.pop(),l.executeNode=!1,this._allData[a]._from=-1,this._allData[a].tensor=Tensor4.fromOrtTensor(c.attributes(0).t())}}}for(let u=0;u<this._nodes.length;u++){const l=this._nodes[u],c=e.nodes(u);if(c.inputsLength()===0)throw new Error(`missing input for node: ${c.name}`);for(let d=0;d<c.inputsLength();d++){const i=c.inputs(d),a=t.get(i);if(typeof a>"u")throw new Error(`unrecognized input '${i}' for node: ${c.name()}`);l.inputs.push(a),this._allData[a]._to.push(u)}}}checkIsAcyclic(){const e=new Set;this._allInputIndices.forEach(o=>{this._allData[o]._to.forEach(l=>{e.add(l)})});const t=Array.from(e),r=new Array(this._nodes.length).fill("white");for(;t.length>0;){const o=t.pop();r[o]==="gray"?r[o]="black":(t.push(o),r[o]="gray",this._nodes[o].outputs.forEach(u=>{const l=this._allData[u];if(typeof l.tensor<"u")throw new Error("node outputs should not be initialized");if(l._from!==o)throw new Error("from property of the Value object doesn't match index of Node being processed");l._to.forEach(c=>{if(r[c]==="gray")throw new Error("model graph is cyclic");r[c]==="white"&&t.push(c)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0;const t=new Array(this._nodes.length,0);let r=0;for(let o=0;o<this._nodes.length;o++)t[o]=r,this._nodes[o].executeNode?(r!==o&&(this._nodes[r]=this._nodes[o]),r++):this._nodes[o].outputs.forEach(u=>{this._allData[u]._from=-2});this._nodes.splice(r,this._nodes.length-r);for(let o=0;o<this._allData.length;o++){const u=this._allData[o];u._from!==void 0&&u._from!==-1&&u._from!==-2&&(u._from=t[u._from]);for(let l=0;l<u._to.length;l++)if(u._to[l]>=0)u._to[l]=t[u._to[l]];else throw new Error("Trying to update a removed node")}e=0;for(let o=0;o<this._allData.length;o++){if(this._allData[o].from===-2&&this._allOutputIndices.indexOf(o+e)===-1){e++,this._allData.splice(o,1),o--;continue}if(e>0){let u=-1;this._allData[o].from!==void 0&&this._allData[o].from!==-1?(u=this._nodes[this._allData[o].from].outputs.indexOf(o+e),u!==-1&&(this._nodes[this._allData[o].from].outputs[u]=o)):(u=this._allInputIndices.indexOf(o+e),u!==-1&&(this._allInputIndices[u]=o)),this._allData[o].to.forEach(l=>{u=this._nodes[l].inputs.indexOf(o+e),u!==-1&&(this._nodes[l].inputs[u]=o)}),this._allData[o].to.length===0&&(u=this._allOutputIndices.indexOf(o+e),u!==-1&&(this._allOutputIndices[u]=o))}}}deleteNode(e){const t=this._nodes[e];if(t.outputs.length>1){for(let c=1;c<t.outputs.length;c++)if(this._allData[t.outputs[c]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}t.executeNode=!1;const r=t.inputs[0],o=t.outputs[0],u=this._allData[o].to;for(let c=0;c<t.inputs.length;c++){const d=this._allData[t.inputs[c]].to.indexOf(e);if(d===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[t.inputs[c]].to.splice(d,1)}this._allData[o]._to=[];const l=this._allOutputIndices.indexOf(o);if(l!==-1&&(this._allOutputIndices[l]=r),u&&u.length>0)for(const c of u){const d=this._nodes[c].inputs.indexOf(o);if(d===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[c].inputs[d]=r,this._allData[r].to.push(c)}}removeAllDropoutNodes(){let e=0;for(const t of this._nodes){if(t.opType==="Dropout"){if(t.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(t.outputs.length!==1&&t.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(t.outputs.length===2&&this._allData[t.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(const t of this._nodes)t.opType==="Identity"&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(const e of this._nodes)if(e.opType==="Conv"){const t=this._allData[e.outputs[0]]._to;if(t.length===1&&this.isActivation(this._nodes[t[0]])){const r=this._nodes[t[0]];if(r.opType==="Clip")if(r.inputs.length===1)try{e.attributes.set("activation_params","floats",[r.attributes.getFloat("min"),r.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[MIN_CLIP,MAX_CLIP])}else if(r.inputs.length>=3&&this._allData[r.inputs[1]].tensor!==void 0&&this._allData[r.inputs[2]].tensor!==void 0)e.attributes.set("activation_params","floats",[this._allData[r.inputs[1]].tensor.floatData[0],this._allData[r.inputs[2]].tensor.floatData[0]]);else continue;e.attributes.set("activation","string",r.opType),this.deleteNode(t[0])}}}}}}),flatbuffers,import_onnx5,Model2,init_model=__esm({"web/lib/onnxjs/model.ts"(){flatbuffers=__toESM(require_flatbuffers()),init_graph(),init_ort_generated(),import_onnx5=__toESM(require_onnx()),init_util(),Model2=class{constructor(){}load(e,t,r){let o;if(!r)try{this.loadFromOnnxFormat(e,t);return}catch(u){if(r!==void 0)throw u;o=u}try{this.loadFromOrtFormat(e,t)}catch(u){throw r!==void 0?u:new Error(`Failed to load model as ONNX format: ${o}
as ORT format: ${u}`)}}loadFromOnnxFormat(e,t){const r=import_onnx5.onnx.ModelProto.decode(e);if(LongUtil.longToNumber(r.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=r.opsetImport.map(u=>({domain:u.domain,version:LongUtil.longToNumber(u.version)})),this._graph=Graph2.from(r.graph,t)}loadFromOrtFormat(e,t){const r=new flatbuffers.ByteBuffer(e),o=import_inference_session.InferenceSession.getRootAsInferenceSession(r).model();if(LongUtil.longToNumber(o.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let l=0;l<o.opsetImportLength();l++){const c=o.opsetImport(l);this._opsets.push({domain:c?.domain(),version:LongUtil.longToNumber(c.version())})}this._graph=Graph2.from(o.graph(),t)}get graph(){return this._graph}get opsets(){return this._opsets}}}}),Session,init_session=__esm({"web/lib/onnxjs/session.ts"(){init_backend2(),init_execution_plan(),init_instrument(),init_model(),Session=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=Profiler.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,t,r){await this.profiler.event("session","Session.loadModel",async()=>{const o=await resolveBackend(this.backendHint);if(this.sessionHandler=o.createSessionHandler(this.context),this._model=new Model2,typeof e=="string"){const u=e.endsWith(".ort");{const c=await(await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(c),u)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{const u=new Uint8Array(e,t||0,r||e.byteLength);this.initialize(u)}})}initialize(e,t){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{const r=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,r,t),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new ExecutionPlan(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{const t=this.normalizeAndValidateInputs(e),r=await this._executionPlan.execute(this.sessionHandler,t);return this.createOutput(r)})}normalizeAndValidateInputs(e){const t=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==t.length)throw new Error(`incorrect input array length: expected ${t.length} but got ${e.length}`)}else{if(e.size!==t.length)throw new Error(`incorrect input map size: expected ${t.length} but got ${e.size}`);const r=new Array(e.size);let o=0;for(let u=0;u<t.length;++u){const l=e.get(t[u]);if(!l)throw new Error(`missing input tensor for: '${name}'`);r[o++]=l}e=r}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){const r=this._model.graph.getInputIndices(),o=this._model.graph.getValues(),u=new Array(r.length);for(let l=0;l<r.length;++l){const c=o[r[l]];u[l]=c.type.shape.dims,this.context.graphInputTypes.push(c.type.tensorType),this.context.graphInputDims.push(e[l].dims)}this.validateInputTensorDims(u,e,!0)}else this.validateInputTensorDims(this.context.graphInputDims,e,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,t){for(let r=0;r<t.length;r++){const o=e[r],u=t[r].type;if(o!==u)throw new Error(`input tensor[${r}] check failed: expected type '${o}' but got ${u}`)}}validateInputTensorDims(e,t,r){for(let o=0;o<t.length;o++){const u=e[o],l=t[o].dims;if(!this.compareTensorDims(u,l,r))throw new Error(`input tensor[${o}] check failed: expected shape '[${u.join(",")}]' but got [${l.join(",")}]`)}}compareTensorDims(e,t,r){if(e.length!==t.length)return!1;for(let o=0;o<e.length;++o)if(e[o]!==t[o]&&(!r||e[o]!==0))return!1;return!0}createOutput(e){const t=this._model.graph.getOutputNames();if(e.length!==t.length)throw new Error("expected number of outputs do not match number of generated outputs");const r=new Map;for(let o=0;o<t.length;++o)r.set(t[o],e[o]);return r}initializeOps(e){const t=e.getNodes();this._ops=new Array(t.length);for(let r=0;r<t.length;r++)this._ops[r]=this.sessionHandler.resolve(t[r],this._model.opsets,e)}}}}),OnnxjsSessionHandler,init_session_handler_inference=__esm({"web/lib/onnxjs/session-handler-inference.ts"(){init_esm(),init_tensor2(),OnnxjsSessionHandler=class{constructor(e){this.session=e,this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}get inputMetadata(){throw new Error("Getting model metadata is not supported in webgl backend.")}get outputMetadata(){throw new Error("Getting model metadata is not supported in webgl backend.")}async dispose(){}async run(e,t,r){const o=new Map;for(const c in e)if(Object.hasOwnProperty.call(e,c)){const d=e[c];o.set(c,new Tensor4(d.dims,d.type,void 0,void 0,d.data))}const u=await this.session.run(o),l={};return u.forEach((c,d)=>{l[d]=new Tensor2(c.type,c.data,c.dims)}),l}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}}}),backend_onnxjs_exports={};__export(backend_onnxjs_exports,{onnxjsBackend:()=>onnxjsBackend});var OnnxjsBackend,onnxjsBackend,init_backend_onnxjs=__esm({"web/lib/backend-onnxjs.ts"(){init_session(),init_session_handler_inference(),OnnxjsBackend=class{async init(){}async createInferenceSessionHandler(e,t){const r=new Session(t);return typeof e=="string"?await r.loadModel(e):await r.loadModel(e),new OnnxjsSessionHandler(r)}},onnxjsBackend=new OnnxjsBackend}}),isNode,init_wasm_utils_env=__esm({"web/lib/wasm/wasm-utils-env.ts"(){isNode=!1}}),main_exports={};__export(main_exports,{default:()=>main_default});var WORKER_NAME,isProxyWorker,main_default,init_main=__esm({"web/lib/wasm/proxy-worker/main.ts"(){init_wasm_core_impl(),init_wasm_factory(),init_wasm_utils_import(),WORKER_NAME="ort-wasm-proxy-worker",isProxyWorker=globalThis.self?.name===WORKER_NAME,isProxyWorker&&(self.onmessage=e=>{const{type:t,in:r}=e.data;try{switch(t){case"init-wasm":initializeWebAssembly(r.wasm).then(()=>{initRuntime(r).then(()=>{postMessage({type:t})},o=>{postMessage({type:t,err:o})})},o=>{postMessage({type:t,err:o})});break;case"init-ep":{const{epName:o,env:u}=r;initEp(u,o).then(()=>{postMessage({type:t})},l=>{postMessage({type:t,err:l})});break}case"copy-from":{const{buffer:o}=r,u=copyFromExternalBuffer(o);postMessage({type:t,out:u});break}case"create":{const{model:o,options:u}=r;createSession(o,u).then(l=>{postMessage({type:t,out:l})},l=>{postMessage({type:t,err:l})});break}case"release":releaseSession(r),postMessage({type:t});break;case"run":{const{sessionId:o,inputIndices:u,inputs:l,outputIndices:c,options:d}=r;run(o,u,l,c,new Array(c.length).fill(null),d).then(i=>{i.some(a=>a[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:i},extractTransferableBuffers([...l,...i]))},i=>{postMessage({type:t,err:i})});break}case"end-profiling":endProfiling(r),postMessage({type:t});break;default:}}catch(o){postMessage({type:t,err:o})}}),main_default=isProxyWorker?null:e=>new Worker(e??scriptSrc,{type:"module",name:WORKER_NAME})}}),origin,isEsmImportMetaUrlHardcodedAsFileUri,getScriptSrc,scriptSrc,inferWasmPathPrefixFromScriptSrc,isSameOrigin,normalizeUrl,fallbackUrl,preload,dynamicImportDefault,createProxyWorker,importProxyWorker,embeddedWasmModule,importWasmModule,init_wasm_utils_import=__esm({"web/lib/wasm/wasm-utils-import.ts"(){init_wasm_utils_env(),origin=isNode||typeof location>"u"?void 0:location.origin,isEsmImportMetaUrlHardcodedAsFileUri=import.meta.url>"file:"&&import.meta.url<"file;",getScriptSrc=()=>{if(!isNode){if(isEsmImportMetaUrlHardcodedAsFileUri){const e=URL;return new URL(new e("ort.all.mjs",import.meta.url).href,origin).href}return import.meta.url}},scriptSrc=getScriptSrc(),inferWasmPathPrefixFromScriptSrc=()=>{if(scriptSrc&&!scriptSrc.startsWith("blob:"))return scriptSrc.substring(0,scriptSrc.lastIndexOf("/")+1)},isSameOrigin=(e,t)=>{try{const r=t??scriptSrc;return(r?new URL(e,r):new URL(e)).origin===origin}catch{return!1}},normalizeUrl=(e,t)=>{const r=t??scriptSrc;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},fallbackUrl=(e,t)=>`${t??"./"}${e}`,preload=async e=>{const r=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},dynamicImportDefault=async e=>(await import(e)).default,createProxyWorker=(init_main(),__toCommonJS(main_exports)).default,importProxyWorker=async()=>{if(!scriptSrc)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(isSameOrigin(scriptSrc))return[void 0,createProxyWorker()];const e=await preload(scriptSrc);return[e,createProxyWorker(e)]},embeddedWasmModule=void 0,importWasmModule=async(e,t,r,o)=>{let u=embeddedWasmModule&&!(e||t);if(u)if(scriptSrc)u=isSameOrigin(scriptSrc);else if(o&&!r)u=!0;else throw new Error("cannot determine the script source URL.");if(u)return[void 0,embeddedWasmModule];{const l="ort-wasm-simd-threaded.jsep.mjs",c=e??normalizeUrl(l,t),d=!isNode&&r&&c&&!isSameOrigin(c,t),i=d?await preload(c):c??fallbackUrl(l,t);return[d?i:void 0,await dynamicImportDefault(i)]}}}}),wasm2,initialized,initializing,aborted,isMultiThreadSupported,isSimdSupported,isRelaxedSimdSupported,initializeWebAssembly,getInstance,init_wasm_factory=__esm({"web/lib/wasm/wasm-factory.ts"(){init_wasm_utils_import(),initialized=!1,initializing=!1,aborted=!1,isMultiThreadSupported=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},isSimdSupported=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},isRelaxedSimdSupported=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},initializeWebAssembly=async e=>{if(initialized)return Promise.resolve();if(initializing)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(aborted)throw new Error("previous call to 'initializeWebAssembly()' failed.");initializing=!0;const t=e.initTimeout;let r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!isRelaxedSimdSupported())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!isSimdSupported())throw new Error("WebAssembly SIMD is not supported in the current environment.")}const o=isMultiThreadSupported();r>1&&!o&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);const u=e.wasmPaths,l=typeof u=="string"?u:void 0,c=u?.mjs,d=c?.href??c,i=u?.wasm,a=i?.href??i,n=e.wasmBinary,[s,p]=await importWasmModule(d,l,r>1,!!n||!!a);let f=!1;const h=[];if(t>0&&h.push(new Promise(m=>{setTimeout(()=>{f=!0,m()},t)})),h.push(new Promise((m,_)=>{const y={numThreads:r};if(n)y.wasmBinary=n;else if(a||l)y.locateFile=g=>a??l+g;else if(d&&d.indexOf("blob:")!==0)y.locateFile=g=>new URL(g,d).href;else if(s){const g=inferWasmPathPrefixFromScriptSrc();g&&(y.locateFile=b=>g+b)}p(y).then(g=>{initializing=!1,initialized=!0,wasm2=g,m(),s&&URL.revokeObjectURL(s)},g=>{initializing=!1,aborted=!0,_(g)})})),await Promise.race(h),f)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},getInstance=()=>{if(initialized&&wasm2)return wasm2;throw new Error("WebAssembly is not initialized yet.")}}}),allocWasmString,iterateExtraOptions,checkLastError,init_wasm_utils=__esm({"web/lib/wasm/wasm-utils.ts"(){init_wasm_factory(),allocWasmString=(e,t)=>{const r=getInstance(),o=r.lengthBytesUTF8(e)+1,u=r._malloc(o);return r.stringToUTF8(e,u,o),t.push(u),u},iterateExtraOptions=(e,t,r,o)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([u,l])=>{const c=t?t+u:u;if(typeof l=="object")iterateExtraOptions(l,c+".",r,o);else if(typeof l=="string"||typeof l=="number")o(c,l.toString());else if(typeof l=="boolean")o(c,l?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof l}`)})},checkLastError=e=>{const t=getInstance(),r=t.stackSave();try{const o=t.PTR_SIZE,u=t.stackAlloc(2*o);t._OrtGetLastError(u,u+o);const l=Number(t.getValue(u,o===4?"i32":"i64")),c=t.getValue(u+o,"*"),d=c?t.UTF8ToString(c):"";throw new Error(`${e} ERROR_CODE: ${l}, ERROR_MESSAGE: ${d}`)}finally{t.stackRestore(r)}}}}),setRunOptions,init_run_options=__esm({"web/lib/wasm/run-options.ts"(){init_wasm_factory(),init_wasm_utils(),setRunOptions=e=>{const t=getInstance();let r=0;const o=[],u=e||{};try{if(e?.logSeverityLevel===void 0)u.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)u.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(u.terminate=!1);let l=0;return e?.tag!==void 0&&(l=allocWasmString(e.tag,o)),r=t._OrtCreateRunOptions(u.logSeverityLevel,u.logVerbosityLevel,!!u.terminate,l),r===0&&checkLastError("Can't create run options."),e?.extra!==void 0&&iterateExtraOptions(e.extra,"",new WeakSet,(c,d)=>{const i=allocWasmString(c,o),a=allocWasmString(d,o);t._OrtAddRunConfigEntry(r,i,a)!==0&&checkLastError(`Can't set a run config entry: ${c} - ${d}.`)}),[r,o]}catch(l){throw r!==0&&t._OrtReleaseRunOptions(r),o.forEach(c=>t._free(c)),l}}}}),getGraphOptimzationLevel,getExecutionMode,appendDefaultOptions,appendSessionConfig,setExecutionProviders,setSessionOptions,init_session_options=__esm({"web/lib/wasm/session-options.ts"(){init_wasm_factory(),init_wasm_utils(),getGraphOptimzationLevel=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},getExecutionMode=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},appendDefaultOptions=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});const t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},appendSessionConfig=(e,t,r,o)=>{const u=allocWasmString(t,o),l=allocWasmString(r,o);getInstance()._OrtAddSessionConfigEntry(e,u,l)!==0&&checkLastError(`Can't set a session config entry: ${t} - ${r}.`)},setExecutionProviders=async(e,t,r)=>{for(const o of t){let u=typeof o=="string"?o:o.name;const l=[];switch(u){case"webnn":if(u="WEBNN",typeof o!="string"){const s=o?.deviceType;s&&appendSessionConfig(e,"deviceType",s,r)}break;case"webgpu":if(u="JS",typeof o!="string"){const n=o;if(n?.preferredLayout){if(n.preferredLayout!=="NCHW"&&n.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${n.preferredLayout}`);appendSessionConfig(e,"preferredLayout",n.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${u}`)}const c=allocWasmString(u,r),d=l.length;let i=0,a=0;if(d>0){i=getInstance()._malloc(d*getInstance().PTR_SIZE),r.push(i),a=getInstance()._malloc(d*getInstance().PTR_SIZE),r.push(a);for(let n=0;n<d;n++)getInstance().setValue(i+n*getInstance().PTR_SIZE,l[n][0],"*"),getInstance().setValue(a+n*getInstance().PTR_SIZE,l[n][1],"*")}await getInstance()._OrtAppendExecutionProvider(e,c,i,a,d)!==0&&checkLastError(`Can't append execution provider: ${u}.`)}},setSessionOptions=async e=>{const t=getInstance();let r=0;const o=[],u=e||{};appendDefaultOptions(u);try{const l=getGraphOptimzationLevel(u.graphOptimizationLevel??"all"),c=getExecutionMode(u.executionMode??"sequential"),d=typeof u.logId=="string"?allocWasmString(u.logId,o):0,i=u.logSeverityLevel??2;if(!Number.isInteger(i)||i<0||i>4)throw new Error(`log severity level is not valid: ${i}`);const a=u.logVerbosityLevel??0;if(!Number.isInteger(a)||a<0||a>4)throw new Error(`log verbosity level is not valid: ${a}`);const n=typeof u.optimizedModelFilePath=="string"?allocWasmString(u.optimizedModelFilePath,o):0;if(r=t._OrtCreateSessionOptions(l,!!u.enableCpuMemArena,!!u.enableMemPattern,c,!!u.enableProfiling,0,d,i,a,n),r===0&&checkLastError("Can't create session options."),u.executionProviders&&await setExecutionProviders(r,u.executionProviders,o),u.enableGraphCapture!==void 0){if(typeof u.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${u.enableGraphCapture}`);appendSessionConfig(r,"enableGraphCapture",u.enableGraphCapture.toString(),o)}if(u.freeDimensionOverrides)for(const[s,p]of Object.entries(u.freeDimensionOverrides)){if(typeof s!="string")throw new Error(`free dimension override name must be a string: ${s}`);if(typeof p!="number"||!Number.isInteger(p)||p<0)throw new Error(`free dimension override value must be a non-negative integer: ${p}`);const f=allocWasmString(s,o);t._OrtAddFreeDimensionOverride(r,f,p)!==0&&checkLastError(`Can't set a free dimension override: ${s} - ${p}.`)}return u.extra!==void 0&&iterateExtraOptions(u.extra,"",new WeakSet,(s,p)=>{appendSessionConfig(r,s,p,o)}),[r,o]}catch(l){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&checkLastError("Can't release session options."),o.forEach(c=>t._free(c)),l}}}}),tensorDataTypeStringToEnum,tensorDataTypeEnumToString,calculateTensorSizeInBytes,tensorTypeToTypedArrayConstructor,logLevelStringToEnum,isGpuBufferSupportedType,isMLTensorSupportedType,dataLocationStringToEnum,init_wasm_common=__esm({"web/lib/wasm/wasm-common.ts"(){tensorDataTypeStringToEnum=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},tensorDataTypeEnumToString=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},calculateTensorSizeInBytes=(e,t)=>{const r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],o=typeof t=="number"?t:t.reduce((u,l)=>u*l,1);return r>0?Math.ceil(o*r):void 0},tensorTypeToTypedArrayConstructor=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},logLevelStringToEnum=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},isGpuBufferSupportedType=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",isMLTensorSupportedType=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",dataLocationStringToEnum=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}}),loadFile,init_wasm_utils_load_file=__esm({"web/lib/wasm/wasm-utils-load-file.ts"(){init_wasm_utils_env(),loadFile=async e=>{if(typeof e=="string")if(isNode)try{const{readFile:t}=__require("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){const{createReadStream:r}=__require("node:fs"),o=r(e),u=[];for await(const l of o)u.push(l);return new Uint8Array(Buffer.concat(u))}throw t}else{const t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);const r=t.headers.get("Content-Length"),o=r?parseInt(r,10):0;if(o<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);const u=t.body.getReader();let l;try{l=new ArrayBuffer(o)}catch(d){if(d instanceof RangeError){const i=Math.ceil(o/65536);l=new WebAssembly.Memory({initial:i,maximum:i}).buffer}else throw d}let c=0;for(;;){const{done:d,value:i}=await u.read();if(d)break;const a=i.byteLength;new Uint8Array(l,c,a).set(i),c+=a}return new Uint8Array(l,0,o)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}}),logLevelPrefix,doLog,configLogLevel,debug,configureLogger,LOG,LOG_DEBUG,init_log=__esm({"web/lib/wasm/jsep/log.ts"(){init_wasm_common(),logLevelPrefix=["V","I","W","E","F"],doLog=(e,t)=>{console.log(`[${logLevelPrefix[e]},${new Date().toISOString()}]${t}`)},configureLogger=(e,t)=>{configLogLevel=e,debug=t},LOG=(e,t)=>{const r=logLevelStringToEnum(e),o=logLevelStringToEnum(configLogLevel);r>=o&&doLog(r,typeof t=="function"?t():t)},LOG_DEBUG=(...e)=>{debug&&LOG(...e)}}}),MatMulUtil2,BroadcastUtil2,ShapeUtil2,PoolConvUtil2,GemmUtil2,MIN_CLIP2,MAX_CLIP2,init_util2=__esm({"web/lib/wasm/jsep/util.ts"(){MatMulUtil2=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},BroadcastUtil2=class{static calcShape(e,t,r=!1){const o=e.length,u=t.length;if(o===0)return t;if(u===0)return e;const l=Math.max(e.length,t.length),c=new Array(l);if(r){if(o<2||u<2)return;const d=MatMulUtil2.calcMatMulShape([e[o-2],e[o-1]],[t[u-2],t[u-1]]);if(d===void 0)return;[c[l-2],c[l-1]]=d}for(let d=r?3:1;d<=l;d++){const i=o-d<0?1:e[o-d],a=u-d<0?1:t[u-d];if(i!==a&&i>1&&a>1)return;const n=Math.max(i,a);if(i&&a)c[l-d]=Math.max(i,a);else{if(n>1)return;c[l-d]=0}}return c}static isValidBroadcast(e,t){const r=e.length,o=t.length;if(r>o)return!1;for(let u=1;u<=r;u++)if(e[r-u]!==1&&e[r-u]!==t[o-u])return!1;return!0}},ShapeUtil2=class we{static size(t){return we.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){const o=t.length;if(o===0)return[];const u=new Array(o);let l=o-1;for(;l>=0;){if(t[l]%r===0){u[l]=t[l]/r;break}if(r%t[l]!==0)throw new Error("cannot convert shape");u[l]=1,r/=t[l],l--}for(l--;l>=0;l--)u[l]=t[l];return u}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return we.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return we.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,o){let u=1;for(let l=r;l<o;l++){if(t[l]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");u*=Number(t[l])}return u}static computeStrides(t){const r=t.length;if(r===0)return[];if(r===1)return[1];const o=new Array(r);o[r-1]=1,o[r-2]=t[r-1];for(let u=r-3;u>=0;--u)o[u]=o[u+1]*t[u+1];return o}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(o=>this.normalizeAxis(o,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(o=>t[o]):t.slice().reverse()}static padShape(t,r){const o=t.length;return t.map((u,l)=>u+r[l]+r[l+o])}static areEqual(t,r){return t.length!==r.length?!1:t.every((o,u)=>o===r[u])}},PoolConvUtil2=class be{static adjustPoolAttributes(t,r,o,u,l,c){if(!t&&o.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let d=0;d<r.length-2;d++)d>=o.length?o.push(r[d+2]):o[d]=r[d+2];for(let d=0;d<o.length;d++)if(d<u.length){if(u[d]<0)throw new Error("strides should be greater than or equal to 1")}else u.push(1);for(let d=0;d<o.length;d++)if(d<l.length){if(l[d]<0)throw new Error("dilations should be greater than or equal to 1")}else l.push(1);for(let d=0;d<o.length*2;d++)if(d<c.length){if(c[d]<0)throw new Error("pad should be greater than or equal to 1")}else c.push(0);for(let d=0;d<o.length;d++){if(o[d]<=0)throw new Error("kernel shapes need to be greater than 0");if(c[d]>=o[d]||c[d+o.length]>=o[d])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,o,u,l,c,d){if(d){if(l.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(u.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let i=0;i<t.length-2;i++)be.adjustPadAndReturnShape(t[i+(c?1:2)],r[i],o[i],u[i],l,i,i+t.length-2,d)}}static computePoolOutputShape(t,r,o,u,l,c,d){if(r.length<=0)throw new Error("input shape must be of size greater than 0");const i=[r[0],r[1]];return be.computeShapeHelper(t,r,i,o,u,l,c,d),i}static computeConvOutputShape(t,r,o,u,l,c,d){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");const i=[t[0],r[0]];return be.computeShapeHelper(!1,t,i,o,u,l,c,d),i}static computeShapeHelper(t,r,o,u,l,c,d,i){if(t)for(let a=0;a<r.length-2;a++)o.push(1);else for(let a=0;a<r.length-2;a++)o.push(be.adjustPadAndReturnShape(r[a+2],u[a],l[a],c[a],d,a,a+r.length-2,i))}static adjustPadAndReturnShape(t,r,o,u,l,c,d,i){const a=o*(u-1)+1;if(i&&i!=="NOTSET")switch(i){case"VALID":return l[c]=0,l[d]=0,Math.floor((t-a)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(o!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{const s=((t+r-1)/r-1)*r+u-t;return l[c]=Math.floor(i==="SAME_LOWER"?(s+1)/2:s/2),l[d]=s-l[c],Math.floor((t+s-u)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+l[c]+l[d]-a)/r+1)}},GemmUtil2=class{static getShapeOfGemmResult(e,t,r,o,u){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let l,c,d;t?(l=e[1],c=e[0]):(l=e[0],c=e[1]);let i=-1;if(o?(d=r[0],i=1):(d=r[1],i=0),r[i]!==c)throw new Error("dimension mismatch");if(l<=0||d<=0||c<=0)throw new Error("invalid shape specified");if(u&&!BroadcastUtil2.isValidBroadcast(u,[l,d]))throw new Error("gemm: invalid bias shape for broadcast");return[l,d,c]}},MIN_CLIP2=-34028234663852886e22,MAX_CLIP2=34028234663852886e22}}),createView2,init_tensor_view=__esm({"web/lib/wasm/jsep/tensor-view.ts"(){init_wasm_common(),createView2=(e,t)=>new(tensorTypeToTypedArrayConstructor(t))(e)}}),webnnDataTypeToSize,convertDataToInt32,convertInt32ToData,tensorGuid,createNewTensorId,webnnDataTypeToFallback,calculateByteLength,TensorWrapper,TensorIdTracker,TensorManagerImpl,createTensorManager,init_tensor_manager=__esm({"web/lib/wasm/jsep/webnn/tensor-manager.ts"(){init_wasm_common(),init_log(),webnnDataTypeToSize=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),convertDataToInt32=(e,t)=>{if(t==="int32")return e;const r=webnnDataTypeToSize.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);const o=r/8;if(e.byteLength%o!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${o}.`);const u=e.byteLength/o,l=new(tensorTypeToTypedArrayConstructor(t))(e.buffer,e.byteOffset,u);switch(t){case"int64":case"uint64":{const c=new Int32Array(u);for(let d=0;d<u;d++){const i=l[d];if(i>2147483647n||i<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");c[d]=Number(i)}return new Uint8Array(c.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&l.some(d=>d>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");const c=Int32Array.from(l,Number);return new Uint8Array(c.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},convertInt32ToData=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");const r=e.byteLength/4,o=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{const u=BigInt64Array.from(o,BigInt);return new Uint8Array(u.buffer)}case"uint64":{if(o.some(l=>l<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");const u=BigUint64Array.from(o,BigInt);return new Uint8Array(u.buffer)}case"int8":{if(o.some(l=>l<-128||l>127))throw new Error("Can not convert int32 data to int8 - value out of range.");const u=Int8Array.from(o,Number);return new Uint8Array(u.buffer)}case"uint8":{if(o.some(u=>u<0||u>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(o,Number)}case"uint32":{if(o.some(l=>l<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");const u=Uint32Array.from(o,Number);return new Uint8Array(u.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},tensorGuid=1,createNewTensorId=()=>tensorGuid++,webnnDataTypeToFallback=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),calculateByteLength=(e,t)=>{const r=webnnDataTypeToSize.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((o,u)=>o*u)*r/8):0},TensorWrapper=class{constructor(e){this.isDataConverted=!1;const{sessionId:t,context:r,tensor:o,dataType:u,shape:l,fallbackDataType:c}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=o,this.dataType=u,this.tensorShape=l,this.fallbackDataType=c}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return calculateByteLength(this.dataType,this.tensorShape)}destroy(){LOG_DEBUG("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){const t=await this.mlContext.readTensor(this.mlTensor),r=convertInt32ToData(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return r.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((o,u)=>o===r[u])}setIsDataConverted(e){this.isDataConverted=e}},TensorIdTracker=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,o){const u=this.tensorManager.getMLContext(e);let l;if(!u.opSupportLimits().input.dataTypes.includes(t)){if(l=webnnDataTypeToFallback.get(t),!l||!u.opSupportLimits().input.dataTypes.includes(l))throw new Error(`WebNN backend does not support data type: ${t}`);LOG_DEBUG("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${l}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(u,t,r))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==calculateByteLength(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}const c=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,c,!0,!0,l),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=convertDataToInt32(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else LOG_DEBUG("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){const t=this.wrapper?.isDataConverted?convertInt32ToData(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},TensorManagerImpl=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){const t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}reserveTensorId(){const e=createNewTensorId();return this.tensorTrackersById.set(e,new TensorIdTracker(this)),e}releaseTensorId(e){const t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,o,u){LOG_DEBUG("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${o}, copyOld: ${u}}`);const l=this.tensorTrackersById.get(t);if(!l)throw new Error("Tensor not found.");return l.ensureTensor(e,r,o,u)}upload(e,t){const r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){LOG_DEBUG("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);const r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(const t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,o){const u=this.getMLContext(e),l=createNewTensorId(),c=new TensorWrapper({sessionId:e,context:u,tensor:t,dataType:r,shape:o});return this.tensorTrackersById.set(l,new TensorIdTracker(this,c)),this.externalTensors.add(c),l}async getCachedTensor(e,t,r,o,u,l,c){const d=this.getMLContext(e);for(const[a,n]of this.freeTensors.entries())if(n.canReuseTensor(d,t,r)){LOG_DEBUG("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${c?`fallbackDataType: ${c},`:""} shape: ${r}`);const s=this.freeTensors.splice(a,1)[0];return s.sessionId=e,s}LOG_DEBUG("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${c?`fallbackDataType: ${c},`:""} shape: ${r}}`);const i=await d.createTensor({dataType:c??t,shape:r,dimensions:r,usage:o,writable:u,readable:l});return new TensorWrapper({sessionId:e,context:d,tensor:i,dataType:t,shape:r,fallbackDataType:c})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},createTensorManager=(...e)=>new TensorManagerImpl(...e)}}),onnxDataTypeToWebnnDataType,compareMLContextOptions,WebNNBackend,init_backend_webnn=__esm({"web/lib/wasm/jsep/backend-webnn.ts"(){init_wasm_common(),init_wasm_factory(),init_tensor_view(),init_tensor_manager(),init_log(),onnxDataTypeToWebnnDataType=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),compareMLContextOptions=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;const r=Object.keys(e).sort(),o=Object.keys(t).sort();return r.length===o.length&&r.every((u,l)=>u===o[l]&&e[u]===t[u])},WebNNBackend=class{constructor(e){this.tensorManager=createTensorManager(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,configureLogger(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){LOG_DEBUG("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){LOG_DEBUG("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);const t=this.temporarySessionTensorIds.get(e);if(t){for(const r of t)LOG_DEBUG("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){const r=this.mlContextCache.findIndex(o=>o.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{const o=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:o}),o}}else if(e===void 0){const r=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{const o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}const t=this.mlContextCache.findIndex(r=>compareMLContextOptions(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{const r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);const t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);const r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);const o=this.mlContextCache.findIndex(u=>u.mlContext===t);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){LOG_DEBUG("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,o,u){const l=onnxDataTypeToWebnnDataType.get(r);if(!l)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,l,o,u)}async createTemporaryTensor(e,t,r){LOG_DEBUG("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);const o=onnxDataTypeToWebnnDataType.get(t);if(!o)throw new Error(`Unsupported ONNX data type: ${t}`);const u=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,u,o,r,!1);const l=this.temporarySessionTensorIds.get(e);return l?l.push(u):this.temporarySessionTensorIds.set(e,[u]),u}uploadTensor(e,t){if(!getInstance().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");LOG_DEBUG("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{const r=await this.tensorManager.download(e);return createView2(r,t)}}registerMLTensor(e,t,r,o){const u=onnxDataTypeToWebnnDataType.get(r);if(!u)throw new Error(`Unsupported ONNX data type: ${r}`);const l=this.tensorManager.registerTensor(e,t,u,o);return LOG_DEBUG("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${u}, dimensions: ${o}} -> {tensorId: ${l}}`),l}registerMLConstant(e,t,r,o,u,l,c=!1){if(!l)throw new Error("External mounted files are not available.");let d=e;e.startsWith("./")&&(d=e.substring(2));const i=l.get(d);if(!i)throw new Error(`File with name ${d} not found in preloaded files.`);if(t+r>i.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");const a=i.slice(t,t+r).buffer;let n;switch(u.dataType){case"float32":n=new Float32Array(a);break;case"float16":n=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(a):new Uint16Array(a);break;case"int32":n=new Int32Array(a);break;case"uint32":n=new Uint32Array(a);break;case"int64":if(c){const s=convertDataToInt32(new Uint8Array(a),"int64");n=new Int32Array(s.buffer),u.dataType="int32"}else n=new BigInt64Array(a);break;case"uint64":n=new BigUint64Array(a);break;case"int8":n=new Int8Array(a);break;case"int4":case"uint4":case"uint8":n=new Uint8Array(a);break;default:throw new Error(`Unsupported data type: ${u.dataType} in creating WebNN Constant from external data.`)}return LOG_DEBUG("verbose",()=>`[WebNN] registerMLConstant {dataType: ${u.dataType}, shape: ${u.shape}}} ${c?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),o.constant(u,n)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){const r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){const r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){const o=this.mlContextBySessionId.get(e),u=onnxDataTypeToWebnnDataType.get(tensorDataTypeStringToEnum(t));return typeof u>"u"?!1:r?!!o?.opSupportLimits().input.dataTypes.includes(u):!!o?.opSupportLimits().output.dataTypes.includes(u)}flush(){}}}}),init_types2=__esm({"web/lib/wasm/jsep/webgpu/types.ts"(){}}),bucketFreelist,bucketArr,calcNormalizedBufferSize,calcBucketBufferSize,guid,createNewGpuDataId,downloadGpuData,GpuDataManagerImpl,createGpuDataManager,init_gpu_data_manager=__esm({"web/lib/wasm/jsep/webgpu/gpu-data-manager.ts"(){init_log(),init_types2(),bucketFreelist=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),bucketArr=[],calcNormalizedBufferSize=e=>Math.ceil(Number(e)/16)*16,calcBucketBufferSize=e=>{for(let t=0;t<bucketArr.length;t++){const r=bucketArr[t];if(e<=r)return r}return Math.ceil(e/16)*16},guid=1,createNewGpuDataId=()=>guid++,downloadGpuData=async(e,t,r,o)=>{const u=calcNormalizedBufferSize(r),l=e.device.createBuffer({size:u,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{const c=e.getCommandEncoder();e.endComputePass(),c.copyBufferToBuffer(t,0,l,0,u),e.flush(),await l.mapAsync(GPUMapMode.READ);const d=l.getMappedRange();if(o){const i=o();return i.set(new Uint8Array(d,0,r)),i}else return new Uint8Array(d.slice(0,r))}finally{l.destroy()}},GpuDataManagerImpl=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(const[t]of bucketFreelist)bucketArr.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){const r=t.buffer,o=t.byteOffset,u=t.byteLength,l=calcNormalizedBufferSize(u),c=this.storageCache.get(e);if(!c)throw new Error("gpu data for uploading does not exist");if(Number(c.originalSize)!==u)throw new Error(`inconsistent data size. gpu data size=${c.originalSize}, data size=${u}`);const d=this.backend.device.createBuffer({mappedAtCreation:!0,size:l,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),i=d.getMappedRange();new Uint8Array(i).set(new Uint8Array(r,o,u)),d.unmap();const a=this.backend.device.createCommandEncoder();a.copyBufferToBuffer(d,0,c.gpuData.buffer,0,l),this.backend.device.queue.submit([a.finish()]),d.destroy(),LOG_DEBUG("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){const r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");const o=this.storageCache.get(t);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");const u=calcNormalizedBufferSize(r.originalSize),l=this.backend.getCommandEncoder();this.backend.endComputePass(),l.copyBufferToBuffer(r.gpuData.buffer,0,o.gpuData.buffer,0,u)}registerExternalBuffer(e,t,r){let o;if(r){if(o=r[0],e===r[1])return LOG_DEBUG("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=createNewGpuDataId();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:e},originalSize:t}),LOG_DEBUG("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${o}, registered.`),o}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),LOG_DEBUG("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){const r=calcBucketBufferSize(e);let o;const u=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,l=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(u||l){const i=(u?this.freeBuffers:this.freeUniformBuffers).get(r);i?i.length>0?o=i.pop():o=this.backend.device.createBuffer({size:r,usage:t}):o=this.backend.device.createBuffer({size:r,usage:t})}else o=this.backend.device.createBuffer({size:r,usage:t});const c={id:createNewGpuDataId(),type:0,buffer:o};return this.storageCache.set(c.id,{gpuData:c,originalSize:Number(e)}),LOG_DEBUG("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${c.id}`),c}get(e){return this.storageCache.get(e)?.gpuData}release(e){const t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return LOG_DEBUG("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){const r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await downloadGpuData(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(const e of this.buffersPending){const t=bucketFreelist.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){const r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){const r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(const t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){const t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(LOG_DEBUG("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},createGpuDataManager=(...e)=>new GpuDataManagerImpl(...e)}}),AttributeWithCacheKeyImpl2,createAttributeWithCacheKey2,init_attribute_with_cache_key2=__esm({"web/lib/wasm/jsep/webgpu/attribute-with-cache-key.ts"(){AttributeWithCacheKeyImpl2=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},createAttributeWithCacheKey2=e=>new AttributeWithCacheKeyImpl2(e)}}),WORKGROUP_SIZE,getWgslMappedType,tensorTypeToWsglStorageType,tensorTypeToWsglValueType,createTensorShapeVariables,getMaxComponents,fillVector,castToF32,sumVector,getElementAt,createIndicesHelper,inputVariable,outputVariable,atomicOutputVariable,internalVariable,ShaderHelperImpl,createShaderHelper,init_common=__esm({"web/lib/wasm/jsep/webgpu/ops/common.ts"(){init_wasm_common(),init_util2(),WORKGROUP_SIZE=64,getWgslMappedType=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},tensorTypeToWsglStorageType=(e,t=1)=>{const r=getWgslMappedType(e,t);return typeof r=="string"?r:r[0]},tensorTypeToWsglValueType=(e,t=1)=>{const r=getWgslMappedType(e,t);return typeof r=="string"?r:r[1]},createTensorShapeVariables=(...e)=>{const t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:ShapeUtil2.computeStrides(r)})}),t},getMaxComponents=e=>e%4===0?4:e%2===0?2:1,fillVector=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,castToF32=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,sumVector=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,getElementAt=(e,t,r,o)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?o==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:o==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,createIndicesHelper=(e,t,r,o,u)=>{const l=typeof r=="number",c=l?r:r.length,d=[...new Array(c).keys()],i=c<2?"u32":c<=4?`vec${c}<u32>`:`array<u32, ${c}>`,a=getWgslMappedType(t,u),n=typeof a=="string"?a:a[1],s=typeof a=="string"?a:a[0],p={indices:i,value:n,storage:s,tensor:t},f=$=>typeof $=="string"?$:`${$}u`,h={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},m=l?"uniforms.":"",_=`${m}${e}_shape`,y=`${m}${e}_strides`;let g="";for(let $=0;$<c-1;$++)g+=`
    let dim${$} = current / ${getElementAt(y,$,c)};
    let rest${$} = current % ${getElementAt(y,$,c)};
    indices[${$}] = dim${$};
    current = rest${$};
    `;g+=`indices[${c-1}] = current;`;const b=c<2?"":`
  fn o2i_${e}(offset: u32) -> ${p.indices} {
    var indices: ${p.indices};
    var current = offset;
    ${g}
    return indices;
  }`,v=$=>(h.offsetToIndices=!0,c<2?$:`o2i_${e}(${$})`),w=[];if(c>=2)for(let $=c-1;$>=0;$--)w.push(`${getElementAt(y,$,c)} * (indices[${$}])`);const x=c<2?"":`
  fn i2o_${e}(indices: ${p.indices}) -> u32 {
    return ${w.join("+")};
  }`,S=$=>(h.indicesToOffset=!0,c<2?$:`i2o_${e}(${$})`),T=(...$)=>c===0?"0u":`${p.indices}(${$.map(f).join(",")})`,I=($,C)=>c<2?`${$}`:`${getElementAt($,C,c)}`,P=($,C,V)=>c<2?`${$}=${V};`:`${getElementAt($,C,c)}=${V};`,k={},D=($,C)=>{h.broadcastedIndicesToOffset=!0;const V=`${C.name}broadcastedIndicesTo${e}Offset`;if(V in k)return`${V}(${$})`;const W=[];for(let X=c-1;X>=0;X--){const G=C.indicesGet("outputIndices",X+C.rank-c);W.push(`${I(y,X)} * (${G} % ${I(_,X)})`)}return k[V]=`fn ${V}(outputIndices: ${C.type.indices}) -> u32 {
             return ${W.length>0?W.join("+"):"0u"};
           }`,`${V}(${$})`},z=($,C)=>(()=>{if(p.storage===p.value)return`${e}[${$}]=${C};`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`${e}[${$}]=vec2<u32>(u32(${C}), select(0u, 0xFFFFFFFFu, ${C} < 0));`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`${e}[${$}]=vec2<u32>(u32(${C}), 0u);`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`${e}[${$}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${C}));`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),E=$=>(()=>{if(p.storage===p.value)return`${e}[${$}]`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`i32(${e}[${$}].x)`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`u32(${e}[${$}].x)`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${$}] & 0xFFu), bool(${e}[${$}] & 0xFF00u), bool(${e}[${$}] & 0xFF0000u), bool(${e}[${$}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),B=c<2?"":`
  fn get_${e}ByIndices(indices: ${p.indices}) -> ${n} {
    return ${E(`i2o_${e}(indices)`)};
  }`,N=c<2?"":(()=>{const $=d.map(V=>`d${V}: u32`).join(", "),C=d.map(V=>`d${V}`).join(", ");return`
  fn get_${e}(${$}) -> ${n} {
    return get_${e}ByIndices(${T(C)});
  }`})(),O=(...$)=>{if($.length!==c)throw new Error(`indices length must be ${c}`);const C=$.map(f).join(",");return c===0?E("0u"):c===1?E(C[0]):(h.get=!0,h.getByIndices=!0,h.indicesToOffset=!0,`get_${e}(${C})`)},M=$=>c<2?E($):(h.getByIndices=!0,h.indicesToOffset=!0,`get_${e}ByIndices(${$})`),A=c<2?"":`
  fn set_${e}ByIndices(indices: ${p.indices}, value: ${n}) {
    ${z(`i2o_${e}(indices)`,"value")}
  }`,L=c<2?"":(()=>{const $=d.map(V=>`d${V}: u32`).join(", "),C=d.map(V=>`d${V}`).join(", ");return`
  fn set_${e}(${$}, value: ${n}) {
    set_${e}ByIndices(${T(C)}, value);
  }`})();return{impl:()=>{const $=[];let C=!1;return h.offsetToIndices&&($.push(b),C=!0),h.indicesToOffset&&($.push(x),C=!0),h.broadcastedIndicesToOffset&&(Object.values(k).forEach(V=>$.push(V)),C=!0),h.set&&($.push(L),C=!0),h.setByIndices&&($.push(A),C=!0),h.get&&($.push(N),C=!0),h.getByIndices&&($.push(B),C=!0),!l&&C&&$.unshift(`const ${_} = ${p.indices}(${r.join(",")});`,`const ${y} = ${p.indices}(${ShapeUtil2.computeStrides(r).join(",")});`),$.join(`
`)},type:p,offsetToIndices:v,indicesToOffset:S,broadcastedIndicesToOffset:D,indices:T,indicesGet:I,indicesSet:P,set:(...$)=>{if($.length!==c+1)throw new Error(`indices length must be ${c}`);const C=$[c];if(typeof C!="string")throw new Error("value must be string");const V=$.slice(0,c).map(f).join(",");return c===0?z("0u",C):c===1?z(V[0],C):(h.set=!0,h.setByIndices=!0,h.indicesToOffset=!0,`set_${e}(${V}, ${C})`)},setByOffset:z,setByIndices:($,C)=>c<2?z($,C):(h.setByIndices=!0,h.indicesToOffset=!0,`set_${e}ByIndices(${$}, ${C});`),get:O,getByOffset:E,getByIndices:M,usage:o,name:e,strides:y,shape:_,rank:c}},inputVariable=(e,t,r,o=1)=>createIndicesHelper(e,t,r,"input",o),outputVariable=(e,t,r,o=1)=>createIndicesHelper(e,t,r,"output",o),atomicOutputVariable=(e,t,r)=>createIndicesHelper(e,t,r,"atomicOutput",1),internalVariable=(e,t,r,o=1)=>createIndicesHelper(e,t,r,"internal",o),ShaderHelperImpl=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=WORKGROUP_SIZE){const t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],o=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);const u=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,l=u?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,c=u?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*o}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${o})
  fn main(${l}) {
    ${c}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);const r=e.usage==="input"?"read":"read_write",o=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${o}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";const e=[];for(const{name:t,type:r,length:o}of this.uniforms)if(o&&o>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(o/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(o/4)}>`);else{const u=o==null||o===1?r:`vec${o}<${r}>`;e.push(`${t}:${u}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;const e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},createShaderHelper=(e,t)=>new ShaderHelperImpl(e,t)}}),validateInputs26,getAdjustedPerm2,getOutputShape2,permFunctionBody,squeezeShape2,isTransposeReshape,createTransposeProgramInfo2,transpose2,parseTransposeAttributes2,init_transpose2=__esm({"web/lib/wasm/jsep/webgpu/ops/transpose.ts"(){init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs26=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},getAdjustedPerm2=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),getOutputShape2=(e,t)=>ShapeUtil2.sortBasedOnPerm(e,getAdjustedPerm2(e.length,t)),permFunctionBody=(e,t,r,o)=>{let u=`fn perm(i: ${o.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let l=0;l<t;++l)u+=`a[${e[l]}]=i[${l}];`;return u+="return a;}"},squeezeShape2=(e,t)=>{const r=[],o=[];for(let u=0;u<e.length;++u)e[u]!==1&&r.push(e[u]),e[t[u]]!==1&&o.push(t[u]);return{newShape:r,newPerm:o}},isTransposeReshape=(e,t)=>{let r=0;for(let o=0;o<e.length;++o)if(t[e[o]]!==1){if(e[o]<r)return!1;r=e[o]}return!0},createTransposeProgramInfo2=(e,t)=>{const r=e.dataType,o=e.dims.length,u=getAdjustedPerm2(o,t),l=getOutputShape2(e.dims,u);let c=e.dims,d=l;const i=o<2||isTransposeReshape(u,e.dims);let a;if(i)return a=m=>{const _=inputVariable("input",r,c,4),y=outputVariable("output",r,d,4);return`
  ${m.registerUniform("output_size","u32").declareVariables(_,y)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{const m=ShapeUtil2.size(l);return{outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64/4)},programUniforms:[{type:12,data:Math.ceil(m/4)}]}},getShaderSource:a};const{newShape:n,newPerm:s}=squeezeShape2(e.dims,u),p=ShapeUtil2.areEqual(s,[2,3,1]),f=ShapeUtil2.areEqual(s,[3,1,2]);if(n.length===2||p||f){c=p?[n[0],n[1]*n[2]]:f?[n[0]*n[1],n[2]]:n,d=[c[1],c[0]];const m=16;return a=_=>{const y=inputVariable("a",r,c.length),g=outputVariable("output",r,d.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(y,g)}
  var<workgroup> tile : array<array<${g.type.value}, ${m+1}>, ${m}>;
  ${_.mainStart([m,m,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${m} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${m}u + local_id.x;
    let input_row = workgroup_id_x * ${m}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${y.getByIndices(`${y.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${m}u + local_id.x;
    let output_row = workgroup_id_y * ${m}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${g.setByIndices(`${g.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{const _=ShapeUtil2.size(l);return{outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(d[1]/m),y:Math.ceil(d[0]/m)},programUniforms:[{type:12,data:_},...createTensorShapeVariables(c,d)]}},getShaderSource:a}}return a=m=>{const _=inputVariable("a",r,c.length),y=outputVariable("output",r,d.length);return`
  ${m.registerUniform("output_size","u32").declareVariables(_,y)}

  ${permFunctionBody(u,o,_,y)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${y.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${y.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{const m=ShapeUtil2.size(l);return{outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...createTensorShapeVariables(c,d)]}},getShaderSource:a}},transpose2=(e,t)=>{validateInputs26(e.inputs,t.perm),e.compute(createTransposeProgramInfo2(e.inputs[0],t.perm))},parseTransposeAttributes2=e=>createAttributeWithCacheKey2({perm:e.perm})}}),reduceOps,reduceSharedOps,reduceInitValues,reduceOutputValues,getInnerMostAxes,computeOutAndReduceShapes,expandShapeToKeepDim,areAxesInnerMostDims,getAxesPermutation,createReduceSharedProgramInfo,reduceCommon,reduceMeanShared,reduceL1Shared,reduceL2Shared,reduceLogSumExpShared,reduceMaxShared,reduceMinShared,reduceProdShared,reduceSumShared,reduceSumSquareShared,reduceLogSumShared,init_reduce_shared=__esm({"web/lib/wasm/jsep/webgpu/ops/reduce-shared.ts"(){init_wasm_common(),init_util2(),init_common(),init_reduce2(),init_transpose2(),reduceOps={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},reduceSharedOps={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},reduceInitValues={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},reduceOutputValues={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},getInnerMostAxes=(e,t)=>{const r=[];for(let o=t-e;o<t;++o)r.push(o);return r},computeOutAndReduceShapes=(e,t)=>{const r=[],o=e.length;for(let l=0;l<o;l++)t.indexOf(l)===-1&&r.push(e[l]);const u=t.map(l=>e[l]);return[r,u]},expandShapeToKeepDim=(e,t)=>{const r=e.length+t.length,o=[];let u=0;for(let l=0;l<r;l++)t.indexOf(l)===-1?o.push(e[u++]):o.push(1);return o},areAxesInnerMostDims=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},getAxesPermutation=(e,t)=>{const r=[];if(!areAxesInnerMostDims(e,t)){for(let o=0;o<t;++o)e.indexOf(o)===-1&&r.push(o);e.forEach(o=>r.push(o))}return r},createReduceSharedProgramInfo=(e,t,r,o,u,l,c)=>{const d=r[0].dims,i=ShapeUtil2.size(l),a=ShapeUtil2.size(c),n=inputVariable("_A",r[0].dataType,d),s=outputVariable("output",u,l);let p=64;i===1&&(p=256);const f=`
          var<workgroup> aBestValues : array<f32, ${p}>;
       `,h=m=>`
        ${m.registerUniform("reduceSize","u32").declareVariables(n,s)}
        ${f}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${m.mainStart(p)}

          let outputIndex = global_idx / ${p};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${reduceInitValues[o]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${p}) {
           let candidate = f32(${n.getByOffset("offset + k")});
           bestValue = ${reduceOps[o]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${p}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${reduceSharedOps[o]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${s.setByOffset("outputIndex",`${o==="mean"?`${s.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${s.type.storage}(${reduceOutputValues[o]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${p}`,inputDependencies:["type"]},getShaderSource:h,getRunData:()=>({outputs:[{dims:l,dataType:u}],dispatchGroup:{x:i},programUniforms:[{type:12,data:a}]})}},reduceCommon=(e,t,r,o)=>{const u=e.inputs.length===1?r:createReduceAttributesFromInputs(e.inputs,r);let l=u.axes;l.length===0&&!u.noopWithEmptyAxes&&(l=e.inputs[0].dims.map((f,h)=>h));const c=ShapeUtil2.normalizeAxes(l,e.inputs[0].dims.length);let d=c,i=e.inputs[0];const a=getAxesPermutation(d,e.inputs[0].dims.length);a.length>0&&(i=e.compute(createTransposeProgramInfo2(e.inputs[0],a),{inputs:[0],outputs:[-1]})[0],d=getInnerMostAxes(d.length,i.dims.length));const[n,s]=computeOutAndReduceShapes(i.dims,d);let p=n;u.keepDims&&(p=expandShapeToKeepDim(n,c)),e.compute(createReduceSharedProgramInfo(t,u.cacheKey,[i],o,e.inputs[0].dataType,p,s),{inputs:[i]})},reduceMeanShared=(e,t)=>{reduceCommon(e,"ReduceMeanShared",t,"mean")},reduceL1Shared=(e,t)=>{reduceCommon(e,"ReduceL1Shared",t,"l1")},reduceL2Shared=(e,t)=>{reduceCommon(e,"ReduceL2Shared",t,"l2")},reduceLogSumExpShared=(e,t)=>{reduceCommon(e,"ReduceLogSumExpShared",t,"logSumExp")},reduceMaxShared=(e,t)=>{reduceCommon(e,"ReduceMaxShared",t,"max")},reduceMinShared=(e,t)=>{reduceCommon(e,"ReduceMinShared",t,"min")},reduceProdShared=(e,t)=>{reduceCommon(e,"ReduceProdShared",t,"prod")},reduceSumShared=(e,t)=>{reduceCommon(e,"ReduceSumShared",t,"sum")},reduceSumSquareShared=(e,t)=>{reduceCommon(e,"ReduceSumSquareShared",t,"sumSquare")},reduceLogSumShared=(e,t)=>{reduceCommon(e,"ReduceLogSumShared",t,"logSum")}}}),validateInputs27,noOp,createReduceProgramInfo2,createReduceAttributesFromInputs,runReduceProgram,reduceLogSumNaive,reduceL1Naive,reduceL2Naive,reduceLogSumExpNaive,reduceMaxNaive,reduceMeanNaive,reduceMinNaive,reduceProdNaive,reduceSumNaive,reduceSumSquareNaive,useNaiveReduceMethod,reduceMean2,reduceL1,reduceL2,reduceLogSumExp,reduceMax2,reduceMin2,reduceProd2,reduceSum2,reduceSumSquare,reduceLogSum2,init_reduce2=__esm({"web/lib/wasm/jsep/webgpu/ops/reduce.ts"(){init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),init_reduce_shared(),validateInputs27=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},noOp=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],createReduceProgramInfo2=(e,t,r,o,u,l,c=!1,d=!1)=>{const i=[],a=r[0].dims,n=a.length,s=ShapeUtil2.normalizeAxes(u,n),p=!d&&s.length===0;a.forEach((_,y)=>{p||s.indexOf(y)>=0?c&&i.push(1):i.push(_)});const f=i.length,h=ShapeUtil2.size(i);return{name:e,shaderCache:t,getShaderSource:_=>{const y=[],g=inputVariable("_A",r[0].dataType,n),b=outputVariable("output",l,f),v=o(g,b,s);let w=v[2];for(let x=0,S=0;x<n;x++)p||s.indexOf(x)>=0?(c&&S++,w=`for(var j${x}: u32 = 0; j${x} < ${a[x]}; j${x}++) {
                  ${v[2].includes("last_index")?`let last_index = j${x};`:""}
                  ${g.indicesSet("input_indices",x,`j${x}`)}
                  ${w}
                }`):(y.push(`${g.indicesSet("input_indices",x,b.indicesGet("output_indices",S))};`),S++);return`

        ${_.registerUniform("output_size","u32").declareVariables(g,b)}

        ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${g.type.indices};
          let output_indices = ${b.offsetToIndices("global_idx")};

          ${y.join(`
`)}
          ${v[0]}       // init ops for reduce max/min
          ${v[1]}
          ${w}
          ${v[3]}
          ${v.length===4?b.setByOffset("global_idx","value"):v.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:i,dataType:l}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},...createTensorShapeVariables(a,i)]})}},createReduceAttributesFromInputs=(e,t)=>{const r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(o=>r.push(Number(o))),createAttributeWithCacheKey2({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},runReduceProgram=(e,t,r,o)=>{const u=e.inputs,l=u.length===1?r:createReduceAttributesFromInputs(u,r);e.compute(createReduceProgramInfo2(t,{hint:l.cacheKey,inputDependencies:["rank"]},[u[0]],l.noopWithEmptyAxes&&l.axes.length===0?noOp:o,l.axes,u[0].dataType,l.keepDims,l.noopWithEmptyAxes),{inputs:[0]})},reduceLogSumNaive=(e,t)=>{validateInputs27(e.inputs),runReduceProgram(e,"ReduceLogSum",t,(o,u)=>[`var value = ${u.type.storage}(0);`,"",`value += ${o.getByIndices("input_indices")};`,"value = log(value);"])},reduceL1Naive=(e,t)=>{validateInputs27(e.inputs),runReduceProgram(e,"ReduceL1",t,(o,u)=>[`var value = ${u.type.storage}(0);`,"",`value += abs(${o.getByIndices("input_indices")});`,""])},reduceL2Naive=(e,t)=>{validateInputs27(e.inputs),runReduceProgram(e,"ReduceL2",t,(o,u)=>[`var t = ${u.type.value}(0); var value = ${u.type.value}(0);`,"",`t = ${o.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},reduceLogSumExpNaive=(e,t)=>{validateInputs27(e.inputs),runReduceProgram(e,"ReduceLogSumExp",t,(o,u)=>[`var value = ${u.type.storage}(0);`,"",`value += exp(${o.getByIndices("input_indices")});`,"value = log(value);"])},reduceMaxNaive=(e,t)=>{validateInputs27(e.inputs),runReduceProgram(e,"ReduceMax",t,(o,u,l)=>{const c=[];for(let d=0;d<o.rank;d++)(l.indexOf(d)>=0||l.length===0)&&c.push(o.indicesSet("input_indices",d,0));return[`${c.join(`
`)}`,`var value = ${o.getByIndices("input_indices")};`,`value = max(value, ${o.getByIndices("input_indices")});`,""]})},reduceMeanNaive=(e,t)=>{validateInputs27(e.inputs),runReduceProgram(e,"ReduceMean",t,(o,u,l)=>{let c=1;for(let d=0;d<o.rank;d++)(l.indexOf(d)>=0||l.length===0)&&(c*=e.inputs[0].dims[d]);return["var sum = f32(0);","",`sum += f32(${o.getByIndices("input_indices")});`,`let value = ${u.type.value}(sum / ${c});`]})},reduceMinNaive=(e,t)=>{validateInputs27(e.inputs),runReduceProgram(e,"ReduceMin",t,(o,u,l)=>{const c=[];for(let d=0;d<o.rank;d++)(l.indexOf(d)>=0||l.length===0)&&c.push(`input_indices[${d}] = 0;`);return[`${c.join(`
`)}`,`var value = ${o.getByIndices("input_indices")};`,`value = min(value, ${o.getByIndices("input_indices")});`,""]})},reduceProdNaive=(e,t)=>{validateInputs27(e.inputs),runReduceProgram(e,"ReduceProd",t,(o,u)=>[`var value = ${u.type.storage}(1);`,"",`value *= ${o.getByIndices("input_indices")};`,""])},reduceSumNaive=(e,t)=>{validateInputs27(e.inputs),runReduceProgram(e,"ReduceSum",t,(o,u)=>[`var value = ${u.type.storage}(0);`,"",`value += ${o.getByIndices("input_indices")};`,""])},reduceSumSquareNaive=(e,t)=>{validateInputs27(e.inputs),runReduceProgram(e,"ReduceSumSquare",t,(o,u)=>[`var t = ${u.type.value}(0); var value = ${u.type.value}(0);`,"",`t = ${o.getByIndices("input_indices")}; value += t * t;`,""])},useNaiveReduceMethod=(e,t,r)=>{if(t.length===0)return r;let o=1,u=1;for(let l=0;l<t.length;l++)t.indexOf(l)===-1?o*=e[l]:u*=e[l];return u<32&&o>1024},reduceMean2=(e,t)=>{useNaiveReduceMethod(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?reduceMeanNaive(e,t):reduceMeanShared(e,t)},reduceL1=(e,t)=>{useNaiveReduceMethod(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?reduceL1Naive(e,t):reduceL1Shared(e,t)},reduceL2=(e,t)=>{useNaiveReduceMethod(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?reduceL2Naive(e,t):reduceL2Shared(e,t)},reduceLogSumExp=(e,t)=>{useNaiveReduceMethod(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?reduceLogSumExpNaive(e,t):reduceLogSumExpShared(e,t)},reduceMax2=(e,t)=>{useNaiveReduceMethod(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?reduceMaxNaive(e,t):reduceMaxShared(e,t)},reduceMin2=(e,t)=>{useNaiveReduceMethod(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?reduceMinNaive(e,t):reduceMinShared(e,t)},reduceProd2=(e,t)=>{useNaiveReduceMethod(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?reduceProdNaive(e,t):reduceProdShared(e,t)},reduceSum2=(e,t)=>{useNaiveReduceMethod(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?reduceSumNaive(e,t):reduceSumShared(e,t)},reduceSumSquare=(e,t)=>{useNaiveReduceMethod(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?reduceSumSquareNaive(e,t):reduceSumSquareShared(e,t)},reduceLogSum2=(e,t)=>{useNaiveReduceMethod(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?reduceLogSumNaive(e,t):reduceLogSumShared(e,t)}}}),validateInputs28,argMin,argMax,parseArgMinMaxAttributes,init_argminmax=__esm({"web/lib/wasm/jsep/webgpu/ops/argminmax.ts"(){init_wasm_common(),init_attribute_with_cache_key2(),init_reduce2(),validateInputs28=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},argMin=(e,t)=>{validateInputs28(e.inputs);const r=(o,u,l)=>{const c=[];for(let d=0;d<o.rank;d++)(l.indexOf(d)>=0||l.length===0)&&c.push(`input_indices[${d}] = 0;`);return[`${c.join(`
`)}`,`var value = ${o.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${o.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${o.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",u.setByOffset("global_idx","best_index")]};e.compute(createReduceProgramInfo2("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},argMax=(e,t)=>{validateInputs28(e.inputs);const r=(o,u,l)=>{const c=[];for(let d=0;d<o.rank;d++)(l.indexOf(d)>=0||l.length===0)&&c.push(`input_indices[${d}] = 0;`);return[`${c.join(`
`)}`,`var value = ${o.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${o.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${o.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",u.setByOffset("global_idx","best_index")]};e.compute(createReduceProgramInfo2("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},parseArgMinMaxAttributes=e=>createAttributeWithCacheKey2(e)}}),validateAttentionInputs,initVarStub,createInPlaceSoftmaxProgramInfo,createAttentionProbsProgramInfo,createVxAttentionScoreProgramInfo,applyAttention,prepare,attention,init_attention=__esm({"web/lib/wasm/jsep/webgpu/ops/attention.ts"(){init_wasm_common(),init_util2(),init_types2(),init_common(),validateAttentionInputs=(e,t)=>{const r=e[0],o=e[1],u=e[2],l=e[3],c=e[4],d=e[5];if(c&&d)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');const i=r.dims[0],a=r.dims[1],n=r.dims[2];if(u.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(o.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(o.dims[0]!==n)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(u.dims[0]!==o.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let s=u.dims[0]/3,p=s,f=p;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(const b of t.qkvHiddenSizes)if(b%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");s=t.qkvHiddenSizes[0],p=t.qkvHiddenSizes[1],f=t.qkvHiddenSizes[2]}const h=a;if(s!==p)throw new Error("qkv_hidden_sizes first element should be same as the second");if(u.dims[0]!==s+p+f)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let m=0;if(c){if(p!==f)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(c.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(c.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(c.dims[1]!==i)throw new Error('Input "past" second dimension must be batch_size');if(c.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(c.dims[4]!==p/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(m=c.dims[3])}const _=h+m,y=-1,g=0;if(l)throw new Error("Mask not supported");if(c)throw new Error("past is not supported");if(d){if(d.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(d.dims[0]!==i||d.dims[1]!==t.numHeads||d.dims[2]!==a||d.dims[3]!==_)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:i,sequenceLength:a,pastSequenceLength:m,kvSequenceLength:h,totalSequenceLength:_,maxSequenceLength:y,inputHiddenSize:n,hiddenSize:s,vHiddenSize:f,headSize:Math.floor(s/t.numHeads),vHeadSize:Math.floor(f/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:g,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},initVarStub=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,createInPlaceSoftmaxProgramInfo=(e,t,r,o,u,l,c,d)=>{const i=getMaxComponents(c?1:l);let a=64;const n=l/i;n<a&&(a=32);const s=Math.ceil(l/i/a),p=[{type:12,data:t},{type:12,data:r},{type:12,data:o},{type:12,data:u},{type:12,data:n},{type:12,data:s}],f=tensorTypeToWsglStorageType(e.dataType,i),h=tensorTypeToWsglValueType(1,i),m=["type"];c&&m.push("type"),d&&m.push("type");const _=y=>{const g=outputVariable("x",e.dataType,e.dims,i),b=[g],v=c?inputVariable("seq_lens",c.dataType,c.dims):void 0;v&&b.push(v);const w=d?inputVariable("total_sequence_length_input",d.dataType,d.dims):void 0;w&&b.push(w);const x=tensorTypeToWsglValueType(e.dataType),S=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${a}>;
  var<workgroup> thread_sum: array<f32, ${a}>;
  ${y.registerUniforms(S).declareVariables(...b)}
  ${y.mainStart([a,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${initVarStub(v,w,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${a}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${c?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${h}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${h}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(i){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${i}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${a}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${h}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${h}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(i){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${i}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${a}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${g.type.value}(${x}(1.0) / ${x}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${h}(x[offset + i]);
        x[offset + i] = ${g.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${c?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${g.type.value}(${x}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${a};${f};${i}`,inputDependencies:m},getShaderSource:_,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:u,z:t*r},programUniforms:p})}},createAttentionProbsProgramInfo=(e,t,r,o,u,l,c,d,i)=>{const a=c+l.kvSequenceLength,n=[l.batchSize,l.numHeads,l.sequenceLength,a],s=e>1&&o,p=l.kvNumHeads?l.kvNumHeads:l.numHeads,f=s?[l.batchSize,p,a,l.headSize]:void 0,h=l.nReps?l.nReps:1,m=l.scale===0?1/Math.sqrt(l.headSize):l.scale,_=getMaxComponents(l.headSize),y=l.headSize/_,g=12,b={x:Math.ceil(a/g),y:Math.ceil(l.sequenceLength/g),z:l.batchSize*l.numHeads},v=[{type:12,data:l.sequenceLength},{type:12,data:y},{type:12,data:a},{type:12,data:l.numHeads},{type:12,data:l.headSize},{type:1,data:m},{type:12,data:c},{type:12,data:l.kvSequenceLength},{type:12,data:h}],w=s&&o&&ShapeUtil2.size(o.dims)>0,x=["type","type"];w&&x.push("type"),u&&x.push("type"),d&&x.push("type"),i&&x.push("type");const S=[{dims:n,dataType:t.dataType,gpuDataType:0}];s&&S.push({dims:f,dataType:t.dataType,gpuDataType:0});const T=I=>{const P=inputVariable("q",t.dataType,t.dims,_),k=inputVariable("key",r.dataType,r.dims,_),D=[P,k];if(w){const A=inputVariable("past_key",o.dataType,o.dims,_);D.push(A)}u&&D.push(inputVariable("attention_bias",u.dataType,u.dims));const z=d?inputVariable("seq_lens",d.dataType,d.dims):void 0;z&&D.push(z);const E=i?inputVariable("total_sequence_length_input",i.dataType,i.dims):void 0;E&&D.push(E);const B=outputVariable("output",t.dataType,n),N=[B];s&&N.push(outputVariable("present_key",t.dataType,f,_));const O=tensorTypeToWsglValueType(1,_),M=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${g}u;

  var<workgroup> tileQ: array<${P.type.storage}, ${g*g}>;
  var<workgroup> tileK: array<${P.type.storage}, ${g*g}>;
  ${I.registerUniforms(M).declareVariables(...D,...N)}
  ${I.mainStart([g,g,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${h===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${h===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${initVarStub(z,E,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${w&&s?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${s?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${O}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${w&&s?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${s?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${O}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(_){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${_}`)}})()};
        output[outputIdx] = ${B.type.value} (sum * uniforms.alpha) + ${u?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${_};${u!==void 0};${o!==void 0};${e}`,inputDependencies:x},getRunData:()=>({outputs:S,dispatchGroup:b,programUniforms:v}),getShaderSource:T}},createVxAttentionScoreProgramInfo=(e,t,r,o,u,l,c=void 0,d=void 0)=>{const i=l+u.kvSequenceLength,a=u.nReps?u.nReps:1,n=u.vHiddenSize*a,s=e>1&&o,p=u.kvNumHeads?u.kvNumHeads:u.numHeads,f=s?[u.batchSize,p,i,u.headSize]:void 0,h=[u.batchSize,u.sequenceLength,n],m=12,_={x:Math.ceil(u.vHeadSize/m),y:Math.ceil(u.sequenceLength/m),z:u.batchSize*u.numHeads},y=[{type:12,data:u.sequenceLength},{type:12,data:i},{type:12,data:u.vHeadSize},{type:12,data:u.numHeads},{type:12,data:u.headSize},{type:12,data:n},{type:12,data:l},{type:12,data:u.kvSequenceLength},{type:12,data:a}],g=s&&o&&ShapeUtil2.size(o.dims)>0,b=["type","type"];g&&b.push("type"),c&&b.push("type"),d&&b.push("type");const v=[{dims:h,dataType:t.dataType,gpuDataType:0}];s&&v.push({dims:f,dataType:t.dataType,gpuDataType:0});const w=x=>{const S=inputVariable("probs",t.dataType,t.dims),T=inputVariable("v",r.dataType,r.dims),I=[S,T];g&&I.push(inputVariable("past_value",o.dataType,o.dims));const P=c?inputVariable("seq_lens",c.dataType,c.dims):void 0;c&&I.push(P);const k=d?inputVariable("total_sequence_length_input",d.dataType,d.dims):void 0;d&&I.push(k);const z=[outputVariable("output",t.dataType,h)];s&&z.push(outputVariable("present_value",t.dataType,f));const E=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${m}u;
  var<workgroup> tileQ: array<${S.type.value}, ${m*m}>;
  var<workgroup> tileV: array<${S.type.value}, ${m*m}>;
  ${x.registerUniforms(E).declareVariables(...I,...z)}
  ${x.mainStart([m,m,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${a===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${a===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${initVarStub(P,k,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${g&&s?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${s?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${S.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${g&&s?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${s?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${o!==void 0};${e}`,inputDependencies:b},getRunData:()=>({outputs:v,dispatchGroup:_,programUniforms:y}),getShaderSource:w}},applyAttention=(e,t,r,o,u,l,c,d,i,a,n=void 0,s=void 0)=>{const p=Math.min(e.outputCount,1+(c?1:0)+(d?1:0)),f=p>1?a.pastSequenceLength:0,h=f+a.kvSequenceLength,m=i&&ShapeUtil2.size(i.dims)>0?i:void 0,_=[t,r];p>1&&c&&ShapeUtil2.size(c.dims)>0&&_.push(c),m&&_.push(m),n&&_.push(n),s&&_.push(s);const y=e.compute(createAttentionProbsProgramInfo(p,t,r,c,m,a,f,n,s),{inputs:_,outputs:p>1?[-1,1]:[-1]})[0];e.compute(createInPlaceSoftmaxProgramInfo(y,a.batchSize,a.numHeads,f,a.sequenceLength,h,n,s),{inputs:n&&s?[y,n,s]:[y],outputs:[]});const g=[y,o];p>1&&d&&ShapeUtil2.size(d.dims)>0&&g.push(d),n&&g.push(n),s&&g.push(s),e.compute(createVxAttentionScoreProgramInfo(p,y,o,d,a,f,n,s),{inputs:g,outputs:p>1?[0,2]:[0]})},prepare=(e,t)=>{const r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],o=t.sequenceLength,u=t.inputHiddenSize,l=t.headSize,c=12,d={x:Math.ceil(t.headSize/c),y:Math.ceil(t.sequenceLength/c),z:t.batchSize*t.numHeads},i=[e.inputs[0],e.inputs[1],e.inputs[2]],a=[{type:12,data:o},{type:12,data:u},{type:12,data:l},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],n=s=>{const p=outputVariable("output_q",i[0].dataType,r),f=outputVariable("output_k",i[0].dataType,r),h=outputVariable("output_v",i[0].dataType,r),m=inputVariable("input",i[0].dataType,i[0].dims),_=inputVariable("weight",i[1].dataType,i[1].dims),y=inputVariable("bias",i[2].dataType,i[2].dims),g=m.type.storage,b=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${c}u;
  var<workgroup> tileInput: array<${g}, ${c*c}>;
  var<workgroup> tileWeightQ: array<${g}, ${c*c}>;
  var<workgroup> tileWeightK: array<${g}, ${c*c}>;
  var<workgroup> tileWeightV: array<${g}, ${c*c}>;
  ${s.registerUniforms(b).declareVariables(m,_,y,p,f,h)}
  ${s.mainStart([c,c,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${g}(0);
    var valueK = ${g}(0);
    var valueV = ${g}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:d,programUniforms:a}),getShaderSource:n},{inputs:i,outputs:[-1,-1,-1]})},attention=(e,t)=>{const r=validateAttentionInputs(e.inputs,t),[o,u,l]=prepare(e,r);return applyAttention(e,o,u,l,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}}),validateInputs29,createBatchNormInferenceProgramInfo,parseBatchNormAttributes,batchNorm,init_batch_norm=__esm({"web/lib/wasm/jsep/webgpu/ops/batch-norm.ts"(){init_esm(),init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs29=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");const r=(o,u,l)=>{const c=u.length;if(c!==o.length)throw new Error(`${l}: num dimensions != ${c}`);u.forEach((d,i)=>{if(d!==o[i])throw new Error(`${l}: dim[${i}] do not match`)})};if(e[0].dims.length>1){const o=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,o,"Invalid input scale"),r(e[2].dims,o,"Invalid input B"),r(e[3].dims,o,"Invalid input mean"),r(e[4].dims,o,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},createBatchNormInferenceProgramInfo=(e,t)=>{const{epsilon:r,spatial:o,format:u}=t,l=e[0].dims,c=o?getMaxComponents(l[l.length-1]):1,d=u==="NHWC"&&l.length>1?c:1,i=ShapeUtil2.size(l)/c,a=o,n=a?l.length:l,s=inputVariable("x",e[0].dataType,e[0].dims,c),p=inputVariable("scale",e[1].dataType,e[1].dims,d),f=inputVariable("bias",e[2].dataType,e[2].dims,d),h=inputVariable("inputMean",e[3].dataType,e[3].dims,d),m=inputVariable("inputVar",e[4].dataType,e[4].dims,d),_=outputVariable("y",e[0].dataType,n,c),y=()=>{let b="";if(o)b=`let cOffset = ${l.length===1?"0u":u==="NHWC"?`outputIndices[${l.length-1}] / ${c}`:"outputIndices[1]"};`;else if(u==="NCHW")b=`
            ${_.indicesSet("outputIndices","0","0")}
            let cOffset = ${_.indicesToOffset("outputIndices")};`;else{b=`var cIndices = ${p.type.indices}(0);
                       cIndices[0] = outputIndices[${l.length-1}];`;for(let v=1;v<p.rank;v++)b+=`cIndices[${v}] = outputIndices[${v}];`;b+=`let cOffset = ${p.indicesToOffset("cIndices")};`}return b},g=b=>`
  const epsilon = ${r};
  ${b.registerUniform("outputSize","u32").declareVariables(s,p,f,h,m,_)}
  ${b.mainStart()}
  ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${_.offsetToIndices(`global_idx * ${c}`)};
    ${y()}
    let scale = ${p.getByOffset("cOffset")};
    let bias = ${f.getByOffset("cOffset")};
    let inputMean = ${h.getByOffset("cOffset")};
    let inputVar = ${m.getByOffset("cOffset")};
    let x = ${s.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${_.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${o}_${c}`,inputDependencies:a?["rank","type","type","type","type"]:void 0},getShaderSource:g,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:a?[{type:12,data:i},...createTensorShapeVariables(l)]:[{type:12,data:i}]})}},parseBatchNormAttributes=e=>createAttributeWithCacheKey2(e),batchNorm=(e,t)=>{const{inputs:r,outputCount:o}=e,u=parseBatchNormAttributes({...t,outputCount:o});if(env2.webgpu.validateInputContent&&validateInputs29(r,u),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(createBatchNormInferenceProgramInfo(r,u))}}}),validateInputs30,createBiasAddProgramInfo,biasAdd,init_bias_add=__esm({"web/lib/wasm/jsep/webgpu/ops/bias-add.ts"(){init_util2(),init_common(),validateInputs30=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},createBiasAddProgramInfo=e=>{const t=e[0].dims,r=e[0].dims[2],o=ShapeUtil2.size(t)/4,u=e[0].dataType,l=inputVariable("input",u,t,4),c=inputVariable("bias",u,[r],4),d=inputVariable("residual",u,t,4),i=outputVariable("output",u,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)}}),getShaderSource:n=>`
  const channels = ${r}u / 4;
  ${n.declareVariables(l,c,d,i)}

  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes(o)}
    let value = ${l.getByOffset("global_idx")}
      + ${c.getByOffset("global_idx % channels")} + ${d.getByOffset("global_idx")};
    ${i.setByOffset("global_idx","value")}
  }`}},biasAdd=e=>{validateInputs30(e.inputs),e.compute(createBiasAddProgramInfo(e.inputs))}}}),createElementwiseProgramShader,createElementwiseProgramInfo2,abs2,acos2,acosh,asin2,asinh,atan2,atanh,parseCastAttributes2,cast2,generateClipAttributesFromInputs2,clip2,ceil2,cos2,cosh,parseAlphaAttributes,elu2,erfImpl,erf,exp2,floor2,gelu,leakyRelu2,not3,neg2,reciprocal,relu2,sigmoid2,parseHardSigmoidAttributes,hardSigmoid,sin2,sinh,sqrt2,tan2,tanhExpression,tanh2,fastGeluImpl,fastGeluExpression,fastGelu,thresholdedRelu,log3,quickGeluImpl,quickGeluExpression,quickgelu,init_unary_op2=__esm({"web/lib/wasm/jsep/webgpu/ops/unary-op.ts"(){init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),createElementwiseProgramShader=(e,t,r,o,u,l,c)=>{const d=Math.ceil(t/4);let i="";typeof u=="string"?i=`${u}(a)`:i=u("a");const a=inputVariable("inputData",r,[d],4),n=outputVariable("outputData",o,[d],4),s=[{name:"vec_size",type:"u32"}];return c&&s.push(...c),`
      ${e.registerUniforms(s).declareVariables(a,n)}

  ${l??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${a.getByOffset("global_idx")};
    ${n.setByOffset("global_idx",i)}
  }`},createElementwiseProgramInfo2=(e,t,r,o,u,l=e.dataType,c,d)=>{const i=[{type:12,data:Math.ceil(ShapeUtil2.size(e.dims)/4)}];return c&&i.push(...c),{name:t,shaderCache:{hint:u,inputDependencies:["type"]},getShaderSource:a=>createElementwiseProgramShader(a,ShapeUtil2.size(e.dims),e.dataType,l,r,o,d),getRunData:a=>({outputs:[{dims:e.dims,dataType:l}],dispatchGroup:{x:Math.ceil(ShapeUtil2.size(a[0].dims)/64/4)},programUniforms:i})}},abs2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Abs","abs"))},acos2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Acos","acos"))},acosh=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Acosh","acosh"))},asin2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Asin","asin"))},asinh=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Asinh","asinh"))},atan2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Atan","atan"))},atanh=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Atanh","atanh"))},parseCastAttributes2=e=>createAttributeWithCacheKey2(e),cast2=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(createElementwiseProgramInfo2(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},generateClipAttributesFromInputs2=e=>{let t,r;const o=e.length>=2&&e[1].data!==0,u=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=o?e[1].getFloat32Array()[0]:-34028234663852886e22,r=u?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=o?e[1].getUint16Array()[0]:64511,r=u?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return createAttributeWithCacheKey2({min:t,max:r})},clip2=(e,t)=>{const r=t||generateClipAttributesFromInputs2(e.inputs),o=tensorTypeToWsglValueType(e.inputs[0].dataType);e.compute(createElementwiseProgramInfo2(e.inputs[0],"Clip",u=>`clamp(${u}, vec4<${o}>(uniforms.min), vec4<${o}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:o},{name:"max",type:o}]),{inputs:[0]})},ceil2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Ceil","ceil"))},cos2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Cos","cos"))},cosh=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Cosh","cosh"))},parseAlphaAttributes=e=>createAttributeWithCacheKey2(e),elu2=(e,t)=>{const r=tensorTypeToWsglValueType(e.inputs[0].dataType);e.compute(createElementwiseProgramInfo2(e.inputs[0],"Elu",o=>`elu_vf32(${o})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},erfImpl=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,erf=e=>{const t=tensorTypeToWsglValueType(e.inputs[0].dataType);e.compute(createElementwiseProgramInfo2(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,erfImpl(t)))},exp2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Exp","exp"))},floor2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Floor","floor"))},gelu=e=>{const t=tensorTypeToWsglValueType(e.inputs[0].dataType);e.compute(createElementwiseProgramInfo2(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,erfImpl(t)))},leakyRelu2=(e,t)=>{const r=tensorTypeToWsglValueType(e.inputs[0].dataType);e.compute(createElementwiseProgramInfo2(e.inputs[0],"LeakyRelu",o=>`select(leaky_relu_alpha_ * ${o}, ${o}, ${o} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},not3=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Not",t=>`!${t}`))},neg2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Neg",t=>`-${t}`))},reciprocal=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},relu2=e=>{const t=tensorTypeToWsglValueType(e.inputs[0].dataType);e.compute(createElementwiseProgramInfo2(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},sigmoid2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},parseHardSigmoidAttributes=e=>createAttributeWithCacheKey2(e),hardSigmoid=(e,t)=>{const r=tensorTypeToWsglValueType(e.inputs[0].dataType);e.compute(createElementwiseProgramInfo2(e.inputs[0],"HardSigmoid",o=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${o} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},sin2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Sin","sin"))},sinh=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Sinh","sinh"))},sqrt2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Sqrt","sqrt"))},tan2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Tan","tan"))},tanhExpression=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,tanh2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Tanh",tanhExpression))},fastGeluImpl=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${tanhExpression("v")};
}
`,fastGeluExpression=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,fastGelu=e=>{const t=tensorTypeToWsglValueType(e.inputs[0].dataType);e.compute(createElementwiseProgramInfo2(e.inputs[0],"FastGelu",fastGeluExpression,fastGeluImpl(t),void 0,e.inputs[0].dataType))},thresholdedRelu=(e,t)=>{const r=tensorTypeToWsglValueType(e.inputs[0].dataType);return e.compute(createElementwiseProgramInfo2(e.inputs[0],"ThresholdedRelu",o=>`select(vec4<${r}>(0.0), ${o}, ${o} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},log3=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Log","log"))},quickGeluImpl=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,quickGeluExpression=e=>`quick_gelu_impl(${e})`,quickgelu=(e,t)=>{const r=tensorTypeToWsglValueType(e.inputs[0].dataType);e.compute(createElementwiseProgramInfo2(e.inputs[0],"QuickGelu",quickGeluExpression,quickGeluImpl(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}}),validateInputs31,createBiasSplitGeluProgramInfo,biasSplitGelu,init_bias_split_gelu=__esm({"web/lib/wasm/jsep/webgpu/ops/bias-split-gelu.ts"(){init_util2(),init_common(),init_unary_op2(),validateInputs31=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},createBiasSplitGeluProgramInfo=e=>{const t=e[0].dims.slice();t[2]=t[2]/2;const r=inputVariable("input",e[0].dataType,e[0].dims,4),o=inputVariable("bias",e[0].dataType,[e[0].dims[2]],4),u=outputVariable("output",e[0].dataType,t,4),l=ShapeUtil2.size(t)/4,c=tensorTypeToWsglStorageType(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)}}),getShaderSource:i=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${i.declareVariables(r,o,u)}

  ${erfImpl(c)}

  ${i.mainStart()}
    ${i.guardAgainstOutOfBoundsWorkgroupSizes(l)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${u.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},biasSplitGelu=e=>{validateInputs31(e.inputs),e.compute(createBiasSplitGeluProgramInfo(e.inputs))}}}),createBinaryOpProgramShader,createBinaryOpProgramInfo,runBinaryOp,add3,div2,equal2,mul2,pow2,sub2,greater2,less2,greaterOrEqual,lessOrEqual,init_binary_op2=__esm({"web/lib/wasm/jsep/webgpu/ops/binary-op.ts"(){init_wasm_common(),init_util2(),init_common(),createBinaryOpProgramShader=(e,t,r,o,u,l,c,d,i,a,n,s)=>{let p,f;typeof d=="string"?p=f=(g,b)=>`${d}((${g}),(${b}))`:typeof d=="function"?p=f=d:(p=d.scalar,f=d.vector);const h=outputVariable("outputData",n,o.length,4),m=inputVariable("aData",i,t.length,4),_=inputVariable("bData",a,r.length,4);let y;if(u)if(l){const g=ShapeUtil2.size(t)===1,b=ShapeUtil2.size(r)===1,v=t.length>0&&t[t.length-1]%4===0,w=r.length>0&&r[r.length-1]%4===0;g||b?y=h.setByOffset("global_idx",f(g?`${m.type.value}(${m.getByOffset("0")}.x)`:m.getByOffset("global_idx"),b?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"))):y=`
            let outputIndices = ${h.offsetToIndices("global_idx * 4u")};
            let offsetA = ${m.broadcastedIndicesToOffset("outputIndices",h)};
            let offsetB = ${_.broadcastedIndicesToOffset("outputIndices",h)};
            ${h.setByOffset("global_idx",f(c||v?m.getByOffset("offsetA / 4u"):`${m.type.value}(${m.getByOffset("offsetA / 4u")}[offsetA % 4u])`,c||w?_.getByOffset("offsetB / 4u"):`${_.type.value}(${_.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else y=h.setByOffset("global_idx",f(m.getByOffset("global_idx"),_.getByOffset("global_idx")));else{if(!l)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");const g=(b,v,w="")=>{const x=`aData[indexA${v}][componentA${v}]`,S=`bData[indexB${v}][componentB${v}]`;return`
            let outputIndices${v} = ${h.offsetToIndices(`global_idx * 4u + ${v}u`)};
            let offsetA${v} = ${m.broadcastedIndicesToOffset(`outputIndices${v}`,h)};
            let offsetB${v} = ${_.broadcastedIndicesToOffset(`outputIndices${v}`,h)};
            let indexA${v} = offsetA${v} / 4u;
            let indexB${v} = offsetB${v} / 4u;
            let componentA${v} = offsetA${v} % 4u;
            let componentB${v} = offsetB${v} % 4u;
            ${b}[${v}] = ${w}(${p(x,S)});
          `};n===9?y=`
            var data = vec4<u32>(0);
            ${g("data",0,"u32")}
            ${g("data",1,"u32")}
            ${g("data",2,"u32")}
            ${g("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:y=`
            ${g("outputData[global_idx]",0)}
            ${g("outputData[global_idx]",1)}
            ${g("outputData[global_idx]",2)}
            ${g("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(m,_,h)}

        ${s??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${y}
      }`},createBinaryOpProgramInfo=(e,t,r,o,u,l,c=r.dataType)=>{const d=r.dims.map(m=>Number(m)??1),i=o.dims.map(m=>Number(m)??1),a=!ShapeUtil2.areEqual(d,i);let n=d,s=ShapeUtil2.size(d),p=!1,f=!1;const h=[a];if(a){const m=BroadcastUtil2.calcShape(d,i,!1);if(!m)throw new Error("Can't perform binary op on the given tensors");n=m.slice(),s=ShapeUtil2.size(n);const _=ShapeUtil2.size(d)===1,y=ShapeUtil2.size(i)===1,g=d.length>0&&d[d.length-1]%4===0,b=i.length>0&&i[i.length-1]%4===0;h.push(_),h.push(y),h.push(g),h.push(b);let v=1;for(let w=1;w<n.length;w++){const x=d[d.length-w],S=i[i.length-w];if(x===S)v*=x;else break}v%4===0?(f=!0,p=!0):(_||y||g||b)&&(p=!0)}else p=!0;return h.push(p),{name:e,shaderCache:{hint:t+h.map(m=>m.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:m=>createBinaryOpProgramShader(m,d,i,n,p,a,f,u,r.dataType,o.dataType,c,l),getRunData:()=>({outputs:[{dims:n,dataType:c}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:Math.ceil(ShapeUtil2.size(n)/4)},...createTensorShapeVariables(d,i,n)]})}},runBinaryOp=(e,t,r,o,u,l)=>{e.compute(createBinaryOpProgramInfo(t,u??"",e.inputs[0],e.inputs[1],r,o,l))},add3=e=>{runBinaryOp(e,"Add",(t,r)=>`${t}+${r}`)},div2=e=>{runBinaryOp(e,"Div",(t,r)=>`${t}/${r}`)},equal2=e=>{runBinaryOp(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},mul2=e=>{runBinaryOp(e,"Mul",(t,r)=>`${t}*${r}`)},pow2=e=>{const t=inputVariable("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;runBinaryOp(e,"Pow",{scalar:(o,u)=>`pow_custom(${o},${u})`,vector:(o,u)=>`pow_vector_custom(${o},${u})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},sub2=e=>{runBinaryOp(e,"Sub",(t,r)=>`${t}-${r}`)},greater2=e=>{runBinaryOp(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},less2=e=>{runBinaryOp(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},greaterOrEqual=e=>{runBinaryOp(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},lessOrEqual=e=>{runBinaryOp(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}}),validateInputs32,calculateInputIndexImpl,assignOutputData,createConcatProgramInfo,concat2,parseConcatAttributes2,init_concat2=__esm({"web/lib/wasm/jsep/webgpu/ops/concat.ts"(){init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs32=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");const r=0,o=e[r],u=o.dataType,l=o.dims.length;e.forEach((c,d)=>{if(d!==r){if(c.dataType!==u)throw new Error("input tensors should be one type");if(c.dims.length!==l)throw new Error("input tensors should have the same shape");c.dims.forEach((i,a)=>{if(a!==t&&i!==o.dims[a])throw new Error("non concat dimensions must match")})}})},calculateInputIndexImpl=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,assignOutputData=(e,t)=>{const r=e.length,o=[];for(let u=0;u<r;++u){const l=t.setByOffset("global_idx",e[u].getByIndices("indices"));r===1?o.push(l):u===0?o.push(`if (inputIndex == ${u}u) { ${l} }`):u===r-1?o.push(`else { ${l} }`):o.push(`else if (inputIndex == ${u}) { ${l} }`)}return o.join(`
`)},createConcatProgramInfo=(e,t,r,o)=>{const u=ShapeUtil2.size(r),l=new Array(e.length),c=new Array(e.length);let d=0;const i=[],a=[],n=[{type:12,data:u}];for(let m=0;m<e.length;++m)d+=e[m].dims[t],l[m]=d,a.push(e[m].dims.length),c[m]=inputVariable(`input${m}`,o,a[m]),i.push("rank"),n.push({type:12,data:l[m]});for(let m=0;m<e.length;++m)n.push(...createTensorShapeVariables(e[m].dims));n.push(...createTensorShapeVariables(r));const s=outputVariable("output",o,r.length),p=s.indicesGet("indices",t),f=Array.from(Array(l.length).keys()).map(m=>`uniforms.sizeInConcatAxis${m}`).join(","),h=m=>`

  ${(()=>{m.registerUniform("outputSize","u32");for(let _=0;_<e.length;_++)m.registerUniform(`sizeInConcatAxis${_}`,"u32");return m.declareVariables(...c,s)})()}

  ${calculateInputIndexImpl(l.length,f)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${s.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${p});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${l.length}u>(${f});
      ${p} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${assignOutputData(c,s)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:i},getRunData:()=>({outputs:[{dims:r,dataType:o}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:n}),getShaderSource:h}},concat2=(e,t)=>{const r=e.inputs,o=r[0].dims,u=ShapeUtil2.normalizeAxis(t.axis,o.length);validateInputs32(r,u);const l=o.slice();l[u]=r.reduce((d,i)=>d+(i.dims.length>u?i.dims[u]:0),0);const c=r.filter(d=>ShapeUtil2.size(d.dims)>0);e.compute(createConcatProgramInfo(c,u,l,r[0].dataType),{inputs:c})},parseConcatAttributes2=e=>createAttributeWithCacheKey2({axis:e.axis})}}),getActivationSnippet2,appendActivationUniformsData,appendActivationUniforms,parseInternalActivationAttributes2,init_fuse_utils2=__esm({"web/lib/wasm/jsep/webgpu/ops/fuse-utils.ts"(){init_wasm_common(),init_util2(),getActivationSnippet2=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},appendActivationUniformsData=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},appendActivationUniforms=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},parseInternalActivationAttributes2=e=>{const t=e?.activation||"";if(t==="HardSigmoid"){const[r,o]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:o}}else if(t==="Clip"){const[r,o]=e?.activation_params||[MIN_CLIP2,MAX_CLIP2];return{activation:t,clipMax:o,clipMin:r}}else if(t==="LeakyRelu"){const[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}}),typeSnippet,biasSnippet,init_activation_util=__esm({"web/lib/wasm/jsep/webgpu/ops/3rd-party/activation_util.ts"(){typeSnippet=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},biasSnippet=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}}),utilFunctions,init_conv_util=__esm({"web/lib/wasm/jsep/webgpu/ops/3rd-party/conv_util.ts"(){utilFunctions=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}}),convertOutputBatchIndicesToInputBatchIndices,createNaiveMatmulProgramInfo,init_matmul_shaders=__esm({"web/lib/wasm/jsep/webgpu/ops/matmul-shaders.ts"(){init_wasm_common(),init_util2(),init_common(),init_fuse_utils2(),convertOutputBatchIndicesToInputBatchIndices=(e,t,r,o,u)=>{const l=o-r;return`
      ${Array.from({length:r}).map((c,d)=>`
      if (${getElementAt(t.shape,d,t.rank)} != 1) {
        ${t.indicesSet(e,d,getElementAt(u,d+l,o))}
      } else {
        ${t.indicesSet(e,d,0)}
      }`).join("")}
`},createNaiveMatmulProgramInfo=(e,t,r,o,u=!1,l)=>{const c=e[0].dims,d=e[1].dims,i=c[c.length-2],a=d[d.length-1],n=c[c.length-1],s=getMaxComponents(a),p=getMaxComponents(n),f=getMaxComponents(i),h=ShapeUtil2.size(r)/s/f,m=e.length>2,_=o?o.slice(0,-2):r.slice(0,-2),g=[ShapeUtil2.size(_),i,a],b=[{type:12,data:h},{type:12,data:i},{type:12,data:a},{type:12,data:n}];appendActivationUniformsData(t,b),b.push(...createTensorShapeVariables(_,c,d)),m&&b.push(...createTensorShapeVariables(e[2].dims)),b.push(...createTensorShapeVariables(g));const v=w=>{const x=internalVariable("batch_dims",e[0].dataType,_.length),S=inputVariable("a",e[0].dataType,c.length,p),T=inputVariable("b",e[1].dataType,d.length,s),I=outputVariable("output",e[0].dataType,g.length,s),P=tensorTypeToWsglStorageType(I.type.tensor),k=getActivationSnippet2(t,I.type.value,P),D=[S,T];let z="";if(m){const N=u?s:1;D.push(inputVariable("bias",e[2].dataType,e[2].dims.length,N)),z=`${u?`value += bias[col / ${N}];`:`value += ${I.type.value}(bias[row + i]);`}`}const E=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];appendActivationUniforms(t,E);const B=()=>{let N=`var a_data: ${S.type.value};`;for(let O=0;O<p;O++)N+=`
              let b_data${O} = b[(b_offset + (k + ${O}) * uniforms.N + col) / ${s}];`;for(let O=0;O<f;O++){N+=`a_data = a[(a_offset + (row + ${O}) * uniforms.K + k) / ${p}];`;for(let M=0;M<p;M++)N+=`
            values[${O}] = fma(${T.type.value}(a_data${p===1?"":`[${M}]`}), b_data${M}, values[${O}]);
`}return N};return`
  ${w.registerUniforms(E).registerInternalVariables(x).declareVariables(...D,I)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${s})) * ${s};
    var index1 = global_idx / (uniforms.N / ${s});
    let stride1 = uniforms.M / ${f};
    let row = (index1 % stride1) * ${f};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${x.offsetToIndices("batch")};`}

    var a_indices: ${S.type.indices};
    ${convertOutputBatchIndicesToInputBatchIndices("a_indices",S,S.rank-2,x.rank,"batch_indices")}
    ${S.indicesSet("a_indices",S.rank-2,0)}
    ${S.indicesSet("a_indices",S.rank-1,0)}
    let a_offset = ${S.indicesToOffset("a_indices")};

    var b_indices: ${T.type.indices};
    ${convertOutputBatchIndicesToInputBatchIndices("b_indices",T,T.rank-2,x.rank,"batch_indices")}
    ${T.indicesSet("b_indices",T.rank-2,0)}
    ${T.indicesSet("b_indices",T.rank-1,0)}
    let b_offset = ${T.indicesToOffset("b_indices")};
    var values: array<${I.type.value}, ${f}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${p}) {
      ${B()}
    }
    for (var i = 0u; i < ${f}u; i++) {
      var value = values[i];
      ${z}
      ${k}
      let cur_indices = ${I.type.indices}(batch, row + i, col);
      let offset = ${I.indicesToOffset("cur_indices")};
      ${I.setByOffset(`offset / ${s}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${s};${p};${f};${u}`,inputDependencies:m?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:b}),getShaderSource:v}}}}),writeDataToSubAVec4Snippet,calculateResultSnippet,makeMatMulPackedVec4Source,writeDataToSubASnippet,readDataFromSubASnippet,makeMatMulPackedSource,matMulReadWriteFnSource,createMatmulProgramInfo2,init_matmul_packed_webgpu=__esm({"web/lib/wasm/jsep/webgpu/ops/3rd-party/matmul_packed_webgpu.ts"(){init_wasm_common(),init_util2(),init_common(),init_fuse_utils2(),init_matmul_shaders(),init_activation_util(),writeDataToSubAVec4Snippet=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,calculateResultSnippet=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,makeMatMulPackedVec4Source=(e,t,r="f32",o,u=!1,l=32,c=!1,d=32)=>{const i=t[1]*e[1],a=t[0]*e[0],n=u?i:l,s=u?l:i,p=n/t[0],f=l/t[1];if(!((u&&p===4&&e[1]===4||!u&&(p===3||p===4))&&n%t[0]===0&&l%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${u} is true, innerElementSize ${p} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${p} must be 3 or 4.
  tileAWidth ${n} must be divisible by workgroupSize[0]${t[0]}. tileInner ${l} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${p}<${r}>, ${n/p}>, ${s}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${a/e[0]}>, ${l}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${p};
const tileInner = ${l};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${c?"0":"i32(globalId.z)"};
  ${o?`let batchIndices = ${o.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${i};

  let num_tiles = ${c?`${Math.ceil(d/l)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${c?`i32(globalId.z) * ${d}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${f};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${writeDataToSubAVec4Snippet(u,o)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${o?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${p===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${calculateResultSnippet(u,p)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},writeDataToSubASnippet=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,readDataFromSubASnippet=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",makeMatMulPackedSource=(e,t,r="f32",o,u=!1,l=32,c=!1,d=32,i=!1)=>{const a=e[1]*t[1],n=e[0]*t[0],s=u?a:l,p=u?l:a;if(!(p%t[1]===0&&s%t[0]===0&&l%t[1]===0))throw new Error(`tileAHight ${p} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${s} must be divisible by workgroupSize[0]${t[0]}, tileInner ${l} must be divisible by workgroupSize[1]${t[1]}`);const f=p/t[1],h=s/t[0],m=l/t[1],_=i?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${a};
    let globalColStart = i32(workgroupId.x) * ${n};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${p}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${s}; inputCol = inputCol + ${t[0]}) {
          ${writeDataToSubASnippet(u,o)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${l}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${n}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${o?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${u?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${a};

let tileRowA = i32(localId.y) * ${f};
let tileColA = i32(localId.x) * ${h};
let tileRowB = i32(localId.y) * ${m};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${h}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${writeDataToSubASnippet(u,o)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${m}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${o?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${readDataFromSubASnippet(u)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${s}>, ${p}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${n}>, ${l}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${l};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${c?"0":"i32(globalId.z)"};
    ${o?`let batchIndices = ${o.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${c?`${Math.ceil(d/l)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${c?`i32(globalId.z) * ${d}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${_}
  }
`},matMulReadWriteFnSource=(e,t,r,o,u=!1)=>{const[l,c,d,i]=o,a=tensorTypeToWsglStorageType(o[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${l.type.indices}) -> ${typeSnippet(e,a)} {
      var value = ${typeSnippet(e,a)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${c.type.indices};
        ${convertOutputBatchIndicesToInputBatchIndices("aIndices",c,c.rank-2,l.rank,"batchIndices")}
        ${c.indicesSet("aIndices",c.rank-2,"u32(row)")}
        ${c.indicesSet("aIndices",c.rank-1,"u32(colIn)")}
        value = ${c.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${l.type.indices}) -> ${typeSnippet(e,a)} {
      var value = ${typeSnippet(e,a)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${d.type.indices};
        ${convertOutputBatchIndicesToInputBatchIndices("bIndices",d,d.rank-2,l.rank,"batchIndices")}
        ${d.indicesSet("bIndices",d.rank-2,"u32(row)")}
        ${d.indicesSet("bIndices",d.rank-1,"u32(colIn)")}
        value = ${d.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${typeSnippet(e,a)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${u?"bias[colIn]":`${typeSnippet(e,a)}(bias[row])`};`:""}
        ${r}
        ${i.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},createMatmulProgramInfo2=(e,t,r,o,u=!1,l)=>{const c=e[0].dims,d=e[1].dims,i=c.slice(0,-2),a=d.slice(0,-2),n=o?o.slice(0,-2):r.slice(0,-2),s=ShapeUtil2.size(n),p=c[c.length-2],f=c[c.length-1],h=d[d.length-1],m=f%4===0&&h%4===0,_=p<=8?[4,1,1]:[4,4,1],y=[8,8,1],g=[Math.ceil(h/y[0]/_[0]),Math.ceil(p/y[1]/_[1]),Math.ceil(s/y[2]/_[2])],b=m?4:1,v=[...i,p,f/b],w=v.length,x=[...a,f,h/b],S=x.length,T=[s,p,h/b],I=[{type:6,data:p},{type:6,data:h},{type:6,data:f}];appendActivationUniformsData(t,I),I.push(...createTensorShapeVariables(n,v,x));const P=["rank","rank"],k=e.length>2;k&&(I.push(...createTensorShapeVariables(e[2].dims)),P.push("rank")),I.push(...createTensorShapeVariables(T));const D=z=>{const E=n.length,B=internalVariable("batchDims",e[0].dataType,E,1),N=tensorTypeToWsglStorageType(e[0].dataType),O=inputVariable("a",e[0].dataType,w,b),M=inputVariable("b",e[1].dataType,S,b),A=outputVariable("result",e[0].dataType,T.length,b),L=[O,M];if(k){const C=u?b:1;L.push(inputVariable("bias",e[2].dataType,e[2].dims.length,C))}const q=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];appendActivationUniforms(t,q);const U=tensorTypeToWsglStorageType(A.type.tensor),R=getActivationSnippet2(t,A.type.value,U),$=matMulReadWriteFnSource(b,k,R,[B,O,M,A],u);return`
  ${z.registerUniforms(q).registerInternalVariables(B).declareVariables(...L,A)}
  ${$}
  ${m?makeMatMulPackedVec4Source(_,y,N,B):makeMatMulPackedSource(_,y,N,B)}
                   `};return{name:"MatMul",shaderCache:{hint:`${_};${t.activation};${m};${u}`,inputDependencies:P},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:g[0],y:g[1],z:g[2]},programUniforms:I}),getShaderSource:D}}}}),conv2dCommonSnippet,createConv2DMatMulProgramInfo,init_conv2d_mm_webgpu=__esm({"web/lib/wasm/jsep/webgpu/ops/3rd-party/conv2d_mm_webgpu.ts"(){init_wasm_common(),init_log(),init_common(),init_fuse_utils2(),init_activation_util(),init_conv_util(),init_matmul_packed_webgpu(),conv2dCommonSnippet=(e,t,r,o,u=!1,l,c=4,d=4,i=4,a="f32")=>{const n=P=>{switch(P){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${a}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},s=P=>{switch(P){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},p=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,f=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,h=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",m=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",_=e?"row":"col",y=e?"col":"row",g=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${_} / outWidth;
    let outCol = ${_} % outWidth;

    let WRow = ${y} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${y} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${y} % inChannels;
    var resData = ${typeSnippet(c,a)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${h} && xCol >= 0 && xCol < ${m}) {
      ${p}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${n(c)}
    }
    return resData;`,b=e?t&&o?`
    let col = colIn * ${c};
    ${g}`:`
    let col = colIn * ${c};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${g}
    }
    return ${typeSnippet(c,a)}(0.0);`:o&&r?`
    let col = colIn * ${c};
    ${g}`:`
    let col = colIn * ${c};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${g}
    }
    return ${typeSnippet(c,a)}(0.0);`,v=e?o&&r?s(d):`
    let col = colIn * ${d};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${s(d)}
    }
    return ${typeSnippet(d,a)}(0.0);`:`
    let col = colIn * ${d};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${s(d)}
    }
    return ${typeSnippet(d,a)}(0.0);`,w=typeSnippet(i,a),x=typeSnippet(e?c:d,a),S=typeSnippet(e?d:c,a),T=getActivationSnippet2(l,w,a);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${x} {
      ${e?b:v}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${S} {
      ${e?v:b}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${w}) {
      let col = colIn * ${i};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${f}
      ${biasSnippet(u)}
      ${T}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},createConv2DMatMulProgramInfo=(e,t,r,o,u,l,c,d,i)=>{const a=t.format==="NHWC",n=a?e[0].dims[3]:e[0].dims[1],s=r[0],p=a?r[2]:r[3],f=a?r[1]:r[2],h=a?r[3]:r[1],m=a&&(n%4===0||n%3===0)&&h%4===0,_=a?h:p*f,y=a?p*f:h,g=[8,8,1],b=o<=8?[4,1,1]:[4,4,1],v=[Math.ceil(_/g[0]/b[0]),Math.ceil(y/g[1]/b[1]),Math.ceil(s/g[2]/b[2])];LOG_DEBUG("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${v}`);const w=m?a&&n%4!==0?3:4:1,x=g[1]*b[1],S=g[0]*b[0],T=Math.max(g[0]*w,g[1]),I=o%x===0,P=u%S===0,k=l%T===0,D=m?[w,4,4]:[1,1,1],z=[{type:6,data:o},{type:6,data:u},{type:6,data:l},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];appendActivationUniformsData(t,z),z.push(...createTensorShapeVariables(e[0].dims,e[1].dims));const E=["rank","rank"];c&&(z.push(...createTensorShapeVariables(e[2].dims)),E.push("rank")),z.push(...createTensorShapeVariables(r));const B=N=>{const O=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];appendActivationUniforms(t,O);const M=m?4:1,A=tensorTypeToWsglStorageType(e[0].dataType);let L=`
      fn setOutputAtIndex(flatIndex : i32, value : ${m?`vec4<${A}>`:A}) {
        result[flatIndex] = ${m?`vec4<${A}>`:A}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${m?`vec4<${A}>`:A}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${m?"/ 4":""}, value);
      }`;const q=inputVariable("x",e[0].dataType,e[0].dims.length,w===3?1:w),U=inputVariable("w",e[1].dataType,e[1].dims.length,M),R=[q,U],$=outputVariable("result",e[0].dataType,r.length,M);if(c){const C=inputVariable("bias",e[2].dataType,e[2].dims.length,M);R.push(C),L+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${m?`vec4<${A}>`:A} {
          return bias[coords.${a?"w":"y"}${m?"/ 4":""}];
        }`}return`
        ${utilFunctions("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${N.registerUniforms(O).declareVariables(...R,$)}
        ${L}
        ${conv2dCommonSnippet(a,I,P,k,c,t,D[0],D[1],D[2],A)}
        ${m?makeMatMulPackedVec4Source(b,g,A,void 0,!a,T):makeMatMulPackedSource(b,g,A,void 0,!a,T,!1,void 0,d)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${w};${m};${I};${P};${k};${x};${S};${T}`,inputDependencies:E},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:z}),getShaderSource:B}}}}),arrayProduct,parse3TupleParam,getEffectiveFilterSize,computeDefaultPad,computeOutputShape4D,get3DPadAndOutInfo,computeConv3DInfo,createConv3DNaiveProgramInfo,init_conv3d_naive_webgpu=__esm({"web/lib/wasm/jsep/webgpu/ops/3rd-party/conv3d_naive_webgpu.ts"(){init_wasm_common(),init_log(),init_util2(),init_common(),init_fuse_utils2(),init_activation_util(),arrayProduct=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},parse3TupleParam=e=>typeof e=="number"?[e,e,e]:e,getEffectiveFilterSize=(e,t)=>t<=1?e:e+(e-1)*(t-1),computeDefaultPad=(e,t,r,o=1)=>{const u=getEffectiveFilterSize(t,o);return Math.floor((e[0]*(r-1)-r+u)/2)},computeOutputShape4D=(e,t,r,o,u)=>{u==null&&(u=computeDefaultPad(e,t[0],o[0]));const l=[0,0,0,r];for(let c=0;c<3;c++)e[c]+2*u>=t[c]&&(l[c]=Math.trunc((e[c]-t[c]+2*u)/o[c]+1));return l},get3DPadAndOutInfo=(e,t,r,o,u,l,c,d,i,a)=>{let n,s,p,f;if(e==="VALID"&&(e=0),typeof e=="number"){n={top:e,bottom:e,left:e,right:e,front:e,back:e};const h=computeOutputShape4D([t,r,o,1],[d,i,a],1,[u,l,c],e);s=h[0],p=h[1],f=h[2]}else if(Array.isArray(e)){if(!e.every((m,_,y)=>m===y[0]))throw Error(`Unsupported padding parameter: ${e}`);n={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};const h=computeOutputShape4D([t,r,o,1],[d,i,a],1,[u,l,c],e[0]);s=h[0],p=h[1],f=h[2]}else if(e==="SAME_UPPER"){s=Math.ceil(t/u),p=Math.ceil(r/l),f=Math.ceil(o/c);const h=(s-1)*u+d-t,m=(p-1)*l+i-r,_=(f-1)*c+a-o,y=Math.floor(h/2),g=h-y,b=Math.floor(m/2),v=m-b,w=Math.floor(_/2),x=_-w;n={top:b,bottom:v,left:w,right:x,front:y,back:g}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:n,outDepth:s,outHeight:p,outWidth:f}},computeConv3DInfo=(e,t,r,o,u,l=!1,c="channelsLast")=>{let d,i,a,n,s;if(c==="channelsLast")[d,i,a,n,s]=e;else if(c==="channelsFirst")[d,s,i,a,n]=e;else throw new Error(`Unknown dataFormat ${c}`);const[p,,f,h,m]=t,[_,y,g]=parse3TupleParam(r),[b,v,w]=parse3TupleParam(o),x=getEffectiveFilterSize(f,b),S=getEffectiveFilterSize(h,v),T=getEffectiveFilterSize(m,w),{padInfo:I,outDepth:P,outHeight:k,outWidth:D}=get3DPadAndOutInfo(u,i,a,n,_,y,g,x,S,T),z=l?p*s:p;let E=[0,0,0,0,0];return c==="channelsFirst"?E=[d,z,P,k,D]:c==="channelsLast"&&(E=[d,P,k,D,z]),{batchSize:d,dataFormat:c,inDepth:i,inHeight:a,inWidth:n,inChannels:s,outDepth:P,outHeight:k,outWidth:D,outChannels:z,padInfo:I,strideDepth:_,strideHeight:y,strideWidth:g,filterDepth:f,filterHeight:h,filterWidth:m,effectiveFilterDepth:x,effectiveFilterHeight:S,effectiveFilterWidth:T,dilationDepth:b,dilationHeight:v,dilationWidth:w,inShape:e,outShape:E,filterShape:t}},createConv3DNaiveProgramInfo=(e,t,r,o,u,l)=>{const c=l==="channelsLast";c?e[0].dims[3]:e[0].dims[1];const d=[64,1,1],i={x:r.map((_,y)=>y)},a=[Math.ceil(arrayProduct(i.x.map(_=>r[_]))/d[0]),1,1];LOG_DEBUG("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${a}`);const n=1,p=[{type:12,data:ShapeUtil2.size(r)},{type:12,data:o},{type:12,data:u},{type:12,data:t.strides},{type:12,data:t.dilations}];appendActivationUniformsData(t,p),p.push(...createTensorShapeVariables(e[0].dims,e[1].dims));const f=["rank","rank"],h=e.length===3;h&&(p.push(...createTensorShapeVariables(e[2].dims)),f.push("rank")),p.push(...createTensorShapeVariables(r));const m=_=>{const y=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:o.length},{name:"pads",type:"u32",length:u.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];appendActivationUniforms(t,y);const g=1,b=tensorTypeToWsglStorageType(e[0].dataType),v=inputVariable("x",e[0].dataType,e[0].dims.length,n),w=inputVariable("W",e[1].dataType,e[1].dims.length,g),x=[v,w],S=outputVariable("result",e[0].dataType,r.length,g);let T="";if(h){const k=inputVariable("bias",e[2].dataType,e[2].dims.length,g);x.push(k),T+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${b} {
          return bias[${c?getElementAt("coords",4,5):getElementAt("coords",1,5)}];
        }`}const I=typeSnippet(n,b),P=getActivationSnippet2(t,I,b);return`
            ${T}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${v.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${w.getByIndices("aIndices")};
            }
          ${_.registerUniforms(y).declareVariables(...x,S)}
          ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${S.offsetToIndices("global_idx")};
              let batch = ${getElementAt("coords",0,v.rank)};
              let d2 = ${c?getElementAt("coords",v.rank-1,v.rank):getElementAt("coords",1,v.rank)};
              let xFRCCorner = vec3<u32>(${c?getElementAt("coords",1,v.rank):getElementAt("coords",2,v.rank)},
              ${c?getElementAt("coords",2,v.rank):getElementAt("coords",3,v.rank)},
              ${c?getElementAt("coords",3,v.rank):getElementAt("coords",4,v.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${c?getElementAt("uniforms.x_shape",1,v.rank):getElementAt("uniforms.x_shape",2,v.rank)};
              let xShapeZ = ${c?getElementAt("uniforms.x_shape",2,v.rank):getElementAt("uniforms.x_shape",3,v.rank)};
              let xShapeW = ${c?getElementAt("uniforms.x_shape",3,v.rank):getElementAt("uniforms.x_shape",4,v.rank)};
              let xShapeU = ${c?getElementAt("uniforms.x_shape",4,v.rank):getElementAt("uniforms.x_shape",1,v.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${c?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${c?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${c?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${c?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${h?"value = value + getBiasByOutputCoords(coords)":""};
              ${P}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${c};${n};${h}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:a[0],y:a[1],z:a[2]},programUniforms:p}),getShaderSource:m}}}}),createGroupedConvProgramInfo,createGroupedConvVectorizeProgramInfo,init_conv_grouped2=__esm({"web/lib/wasm/jsep/webgpu/ops/conv-grouped.ts"(){init_wasm_common(),init_util2(),init_common(),init_fuse_utils2(),createGroupedConvProgramInfo=(e,t,r,o)=>{const u=e.length>2,l=u?"value += b[output_channel];":"",c=e[0].dims,d=e[1].dims,i=t.format==="NHWC",a=i?r[3]:r[1],n=a/t.group,s=i&&n>=4?getMaxComponents(a):1,p=ShapeUtil2.size(r)/s,f=[{type:12,data:p},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:n}];appendActivationUniformsData(t,f),f.push(...createTensorShapeVariables(c,[d[0],d[1],d[2],d[3]/s]));const h=u?["rank","rank","rank"]:["rank","rank"];f.push(...createTensorShapeVariables([r[0],r[1],r[2],r[3]/s]));const m=_=>{const y=outputVariable("output",e[0].dataType,r.length,s),g=tensorTypeToWsglStorageType(y.type.tensor),b=getActivationSnippet2(t,y.type.value,g),v=inputVariable("x",e[0].dataType,c.length),w=inputVariable("w",e[1].dataType,d.length,s),x=[v,w];u&&x.push(inputVariable("b",e[2].dataType,e[2].dims,s));const S=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];appendActivationUniforms(t,S);const T=i?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${v.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${w.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${v.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${w.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${_.registerUniforms(S).declareVariables(...x,y)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${y.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${i?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${i?1:2}], outputIndices[${i?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${s} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${i?2:1}];

    var value: ${y.type.value} = ${y.type.value}(0);
    ${T}
    ${l}
    ${b}
    ${y.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${s}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:o?o(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:m}},createGroupedConvVectorizeProgramInfo=(e,t,r,o)=>{const u=e.length>2,l=getMaxComponents(r[3]),c=getMaxComponents(r[2]),d=ShapeUtil2.size(r)/l/c,i=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/l],a=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/l],n=[r[0],r[1],r[2],r[3]/l],s=[{type:12,data:d},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];appendActivationUniformsData(t,s),s.push(...createTensorShapeVariables(i,a,n));const p=(c-1)*t.strides[1]+a[1],f=h=>{const m=outputVariable("output",e[0].dataType,n.length,l),_=tensorTypeToWsglStorageType(m.type.tensor),y=getActivationSnippet2(t,m.type.value,_),g=inputVariable("x",e[0].dataType,i.length,l),b=inputVariable("w",e[1].dataType,a.length,l),v=[g,b];u&&v.push(inputVariable("b",e[2].dataType,e[2].dims,l));const w=u?"value += b[output_channel];":"",x=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return appendActivationUniforms(t,x),`
  ${h.registerUniforms(x).declareVariables(...v,m)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${c}u;
    let col = (index1 % width1) * ${c}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${g.type.value}, ${p}>;
    var values: array<${m.type.value}, ${c}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${a[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${p}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${g.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${g.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${a[1]}; w_width++) {
          let w_val = ${b.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${c}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${c}u; i++) {
      var value = values[i];
      ${w}
      ${y}
      ${m.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${l};${c};${p};${a[0]};${a[1]}`,inputDependencies:u?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:o?o(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:s}),getShaderSource:f}}}}),calculateOutputShape2,weightTransposeAttribute,validateInputs33,getAdjustedConvAttributes2,parseConvAttributes2,conv2d2,conv1d,conv3d,conv2,init_conv2=__esm({"web/lib/wasm/jsep/webgpu/ops/conv.ts"(){init_util2(),init_conv2d_mm_webgpu(),init_conv3d_naive_webgpu(),init_matmul_packed_webgpu(),init_conv_grouped2(),init_fuse_utils2(),init_matmul_shaders(),init_transpose2(),calculateOutputShape2=(e,t,r,o,u,l)=>{const c=e[0],d=e.slice(l?1:2,l?3:4),i=d.length,a=t[0],s=t.slice(2).map((h,m)=>h+(h-1)*(r[m]-1)),f=d.map((h,m)=>h+o[m]+o[m+i]).map((h,m)=>Math.floor((h-s[m]+u[m])/u[m]));return f.splice(0,0,c),f.splice(l?3:1,0,a),f},weightTransposeAttribute=[2,3,1,0],validateInputs33=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");const r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],o=e[1].dims[1]*t.group;if(r!==o)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");const u=e[0].dims.length-2;if(t.dilations.length!==u)throw new Error(`dilations should be ${u}D`);if(t.strides.length!==u)throw new Error(`strides should be ${u}D`);if(t.pads.length!==u*2)throw new Error(`pads should be ${u*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},getAdjustedConvAttributes2=(e,t)=>{const r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let l=2;l<t[1].dims.length;++l)r[l-2]===0&&(r[l-2]=t[1].dims[l]);const o=e.pads.slice();PoolConvUtil2.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,o,e.format==="NHWC",e.autoPad);const u=Object.assign({},e);return Object.assign(u,{kernelShape:r,pads:o}),u},parseConvAttributes2=e=>{const t=parseInternalActivationAttributes2(e),r=e.format,o=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],u=e.dilations,l=e.group,c=e.kernel_shape,d=e.pads,i=e.strides,a=e.w_is_const();return{autoPad:o,format:r,dilations:u,group:l,kernelShape:c,pads:d,strides:i,wIsConst:a,...t,cacheKey:`${e.format};${t.activation};`}},conv2d2=(e,t,r,o)=>{const u=r.format==="NHWC",l=calculateOutputShape2(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,u);if(r.group!==1){const x=[t[0]];if(u){const T=e.kernelCustomData.wT??e.compute(createTransposeProgramInfo2(t[1],weightTransposeAttribute),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=T),x.push(T)}else x.push(t[1]);t.length===3&&x.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&u&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(createGroupedConvVectorizeProgramInfo(x,r,l,o),{inputs:x}):e.compute(createGroupedConvProgramInfo(x,r,l,o),{inputs:x});return}const c=t.length===3,d=t[0].dims[u?1:2],i=t[0].dims[u?2:3],a=t[0].dims[u?3:1],n=t[1].dims[2],s=t[1].dims[3],p=l[u?1:2],f=l[u?2:3],h=l[u?3:1],m=u&&n===d&&s===i&&r.pads[0]===0&&r.pads[1]===0;if(m||n===1&&s===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){const x=l[0];let S,T,I;const P=[];if(u){const z=e.kernelCustomData.wT??e.compute(createTransposeProgramInfo2(t[1],weightTransposeAttribute),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=z),m){const E=d*i*a;S=t[0].reshape([1,x,E]),T=z.reshape([1,E,h]),I=[1,x,h]}else S=t[0].reshape([x,d*i,a]),T=z.reshape([1,a,h]),I=[x,p*f,h];P.push(S),P.push(T)}else S=t[0].reshape([x,a,d*i]),T=t[1].reshape([1,h,a]),I=[x,h,p*f],P.push(T),P.push(S);c&&P.push(t[2]);const k=I[2],D=P[0].dims[P[0].dims.length-1];k<8&&D<8?e.compute(createNaiveMatmulProgramInfo(P,r,l,I,u,o),{inputs:P}):e.compute(createMatmulProgramInfo2(P,r,l,I,u,o),{inputs:P});return}const _=!0,y=e.kernelCustomData.wT??e.compute(createTransposeProgramInfo2(t[1],weightTransposeAttribute),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=y);const g=[t[0],y];c&&g.push(t[2]);const b=u?p*f:h,v=u?h:p*f,w=n*s*a;e.compute(createConv2DMatMulProgramInfo(g,r,l,b,v,w,c,_,o),{inputs:g})},conv1d=(e,t)=>{const r=t.format==="NHWC",o=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&o.push(e.inputs[2]);const u=[0,t.pads[0],0,t.pads[1]],l=[1].concat(t.strides),c=[1].concat(t.dilations),d=[1].concat(t.kernelShape),i=getAdjustedConvAttributes2({...t,pads:u,strides:l,dilations:c,kernelShape:d},o);conv2d2(e,o,i,a=>r?[a[0],a[2],a[3]]:[a[0],a[1],a[3]])},conv3d=(e,t,r)=>{const o=r.format==="NHWC"?"channelsLast":"channelsFirst",u=getAdjustedConvAttributes2(r,t),l=r.autoPad==="NOTSET"?r.pads:r.autoPad,c=computeConv3DInfo(t[0].dims,t[1].dims,r.strides,r.dilations,l,!1,o);e.compute(createConv3DNaiveProgramInfo(t,u,c.outShape,[c.filterDepth,c.filterHeight,c.filterWidth],[c.padInfo.front,c.padInfo.top,c.padInfo.left],o))},conv2=(e,t)=>{if(validateInputs33(e.inputs,t),e.inputs[0].dims.length===3)conv1d(e,t);else if(e.inputs[0].dims.length===5)conv3d(e,e.inputs,t);else{const r=getAdjustedConvAttributes2(t,e.inputs);conv2d2(e,e.inputs,r)}}}}),createConvTranspose2DProgramInfo,init_conv_backprop_webgpu=__esm({"web/lib/wasm/jsep/webgpu/ops/3rd-party/conv_backprop_webgpu.ts"(){init_wasm_common(),init_log(),init_util2(),init_common(),createConvTranspose2DProgramInfo=(e,t,r)=>{const o=e.length>2,u=t.outputShape,l=t.format==="NHWC",c=t.group,d=e[1].dims,i=d[2]/c,a=d[3],n=l?getMaxComponents(i):1,s=l&&a===1&&i>=4,p=s?Math.floor(i/4)*4:Math.floor(i/n)*n,f=i-p,h=l?getMaxComponents(a):1,m=l?a===1?n:h:1,_=ShapeUtil2.size(u)/h,y=[Math.ceil(_/64),1,1];LOG_DEBUG("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${y}`);const g=["rank","rank"],b=[t.strides[0],t.strides[1]],v=[t.kernelShape[l?1:2],t.kernelShape[l?2:3]],w=[t.dilations[0],t.dilations[1]],x=[v[0]+(t.dilations[0]<=1?0:(t.kernelShape[l?1:2]-1)*(t.dilations[0]-1)),v[1]+(t.dilations[1]<=1?0:(t.kernelShape[l?2:3]-1)*(t.dilations[1]-1))],S=[x[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),x[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],T=[{type:12,data:_},{type:12,data:b},{type:12,data:v},{type:12,data:w},{type:12,data:x},{type:6,data:S},{type:12,data:p},{type:12,data:i},{type:12,data:a},...createTensorShapeVariables(e[0].dims,e[1].dims)];o&&(T.push(...createTensorShapeVariables(e[2].dims)),g.push("rank")),T.push(...createTensorShapeVariables(u));const I=P=>{const k=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:b.length},{name:"filter_dims",type:"u32",length:v.length},{name:"dilations",type:"u32",length:v.length},{name:"effective_filter_dims",type:"u32",length:x.length},{name:"pads",type:"i32",length:S.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],D=tensorTypeToWsglStorageType(e[0].dataType),z=l?1:2,E=l?2:3,B=l?3:1,N=inputVariable("W",e[1].dataType,e[1].dims.length,m),O=inputVariable("Dy",e[0].dataType,e[0].dims.length,n),M=[O,N];o&&M.push(inputVariable("bias",e[2].dataType,[u[B]].length,h));const A=outputVariable("result",e[0].dataType,u.length,h),L=()=>{let R="";if(s)n===4?R+=`
        let xValue = ${O.getByOffset("x_offset")};
        let wValue = ${N.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:n===2?R+=`
          dotProd = dotProd + dot(vec4<${D}>(${O.getByOffset("x_offset")}, ${O.getByOffset("x_offset + 1u")}), vec4<${D}>(${N.getByOffset("w_offset")}, ${N.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:n===1&&(R+=`
          dotProd = dotProd + dot(vec4<${D}>(${O.getByOffset("x_offset")}, ${O.getByOffset("x_offset + 1u")}, ${O.getByOffset("x_offset + 2u")}, ${O.getByOffset("x_offset + 3u")}), vec4<${D}>(${N.getByOffset("w_offset")}, ${N.getByOffset("w_offset + 1u")}, ${N.getByOffset("w_offset + 2u")}, ${N.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(R+=`
                  let xValue = ${l?O.getByOffset(`${O.indicesToOffset(`${O.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${n}`):O.get("batch","inputChannel","idyR","idyC")};
        `,n===1)R+=`
          let w_offset = ${N.indicesToOffset(`${N.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${N.getByOffset(`w_offset / ${m}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let $=0;$<n;$++)R+=`
            let wValue${$} = ${N.getByOffset(`${N.indicesToOffset(`${N.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${$}, wOutChannel)`)} / ${m}`)};
            dotProd = dotProd + xValue[${$}] * wValue${$};`;return R},q=()=>{if(f===0)return"";if(!s)throw new Error(`packInputAs4 ${s} is not true.`);let R="";if(n===1){R+="dotProd = dotProd";for(let $=0;$<f;$++)R+=`
            + ${O.getByOffset(`x_offset + ${$}`)} * ${N.getByOffset(`w_offset + ${$}`)}`;R+=";"}else if(n===2){if(f!==2)throw new Error(`Invalid inputChannelsRemainder ${f}.`);R+=`
          let xValue = ${O.getByOffset("x_offset")};
          let wValue = ${N.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return R},U=`
            let outputIndices = ${A.offsetToIndices(`global_idx * ${h}`)};
            let batch = ${A.indicesGet("outputIndices",0)};
            let d1 = ${A.indicesGet("outputIndices",B)};
            let r = ${A.indicesGet("outputIndices",z)};
            let c = ${A.indicesGet("outputIndices",E)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${A.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${D}(dyRCorner) + ${D}(wR)) / ${D}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${D}(uniforms.Dy_shape[${z}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${D}(dyCCorner) + ${D}(wC)) / ${D}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${D}(uniforms.Dy_shape[${E}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${s?`
                var x_offset = ${O.indicesToOffset(`${O.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${n};
                var w_offset = ${N.indicesToOffset(`${N.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${m};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${s?4:n}) {
                  ${L()}
                  inputChannel = inputChannel + ${s?4:n};
                }
                ${q()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${o?` + bias[d1 / ${h}]`:""};
            ${A.setByOffset("global_idx","value")};
          `;return`
    ${P.registerUniforms(k).declareVariables(...M,A)}
      ${P.mainStart()}
      ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${U}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${n}${m}${h}${s}${f}`,inputDependencies:g},getRunData:()=>({dispatchGroup:{x:y[0],y:y[1],z:y[2]},outputs:[{dims:r?r(u):u,dataType:e[0].dataType}],programUniforms:T}),getShaderSource:I}}}}),computeTotalPad2,distributePadding2,calculateOutputShapeAndPads2,getAdjustedConvTransposeAttributes2,parseConvTransposeAttributes2,validateInputs34,convTranspose2d2,convTranspose1d,convTranspose2,init_conv_transpose2=__esm({"web/lib/wasm/jsep/webgpu/ops/conv-transpose.ts"(){init_conv_backprop_webgpu(),init_fuse_utils2(),init_transpose2(),computeTotalPad2=(e,t,r,o,u,l)=>(e-1)*t+r+(o-1)*u+1-l,distributePadding2=(e,t,r,o,u)=>{const l=Math.floor(e/2);t==="SAME_UPPER"?(r[o]=l,r[u]=e-l):t==="SAME_LOWER"&&(r[o]=e-l,r[u]=l)},calculateOutputShapeAndPads2=(e,t,r,o,u,l,c,d,i,a)=>{const n=e.length-2,s=a.length===0;i.length<n&&i.push(...Array(n-i.length).fill(0));const p=e[0],f=t[d?3:1]*u;for(let h=0,m=e.length-n-(d?1:0);h<n;++h,++m){const _=e[m],y=s?_*c[h]:a[h],g=computeTotalPad2(_,c[h],l[h],t[m],r[h],y);distributePadding2(g,o,l,h,h+n),s&&a.push(c[h]*(_-1)+i[h]+(t[m]-1)*r[h]+1-l[h]-l[h+n])}a.splice(0,0,p),a.splice(d?3:1,0,f)},getAdjustedConvTransposeAttributes2=(e,t)=>{const r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((s,p)=>s*p,1)===0){r.length=0;for(let s=2;s<t[1].dims.length;++s)r.push(t[1].dims[s])}const o=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(o?3:1,0,t[1].dims[1]);const u=e.pads.slice(),l=e.outputShape.slice(),c=e.outputPadding.slice(),d=t[0].dims;let i=e.dilations.slice();if(i.reduce((s,p)=>s+p,0)===0){const s=t[0].dims.length-2;i=new Array(s).fill(1)}let a=e.strides.slice();if(a.reduce((s,p)=>s+p,0)===0){const s=t[0].dims.length-2;a=new Array(s).fill(1)}calculateOutputShapeAndPads2(d,r,i,e.autoPad,e.group,u,a,o,c,l);const n=Object.assign({},e);return Object.assign(n,{kernelShape:r,pads:u,outputPadding:c,outputShape:l,dilations:i,strides:a}),n},parseConvTransposeAttributes2=e=>{const t=parseInternalActivationAttributes2(e),r=e.format,o=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],u=e.dilations,l=e.group,c=e.kernelShape,d=e.pads,i=e.strides,a=e.wIsConst(),n=e.outputPadding,s=e.outputShape;return{autoPad:o,format:r,dilations:u,group:l,kernelShape:c,outputPadding:n,outputShape:s,pads:d,strides:i,wIsConst:a,...t,cacheKey:`${e.format};${t.activation};`}},validateInputs34=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");const r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],o=e[1].dims[0];if(r!==o)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");const u=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==u))throw new Error("invalid bias");const l=e[0].dims.length-2;if(t.dilations.reduce((n,s)=>n+s,0)>0&&t.dilations.length!==l)throw new Error(`dilations should be ${l}D`);if(t.strides.reduce((n,s)=>n+s,0)>0&&t.strides.length!==l)throw new Error(`strides should be ${l}D`);if(t.pads.reduce((n,s)=>n+s,0)>0&&t.pads.length!==l*2)throw new Error(`pads should be ${l*2}D`);if(t.outputPadding.length!==l&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${l}D`);if(t.kernelShape.reduce((n,s)=>n+s,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},convTranspose2d2=(e,t,r,o)=>{const u=e.kernelCustomData.wT??e.compute(createTransposeProgramInfo2(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=u);const l=[t[0],u];t.length===3&&l.push(t[2]),e.compute(createConvTranspose2DProgramInfo(l,r,o),{inputs:l})},convTranspose1d=(e,t)=>{const r=t.format==="NHWC",o=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&o.push(e.inputs[2]);let u=t.kernelShape;(u.length===0||u[0]===0)&&(u=[e.inputs[1].dims[2]]);let l=t.dilations;(l.length===0||l[0]===0)&&(l=[1]);let c=t.strides;(c.length===0||c[0]===0)&&(c=[1]);let d=t.pads;d.length===0&&(d=[0,0]),d=[0,d[0],0,d[1]],c=[1].concat(c),l=[1].concat(l),u=[1].concat(u);let i=t.outputPadding;i=[0].concat(i);const a=getAdjustedConvTransposeAttributes2({...t,pads:d,strides:c,dilations:l,kernelShape:u,outputPadding:i},o);convTranspose2d2(e,o,a,n=>r?[n[0],n[2],n[3]]:[n[0],n[1],n[3]])},convTranspose2=(e,t)=>{if(validateInputs34(e.inputs,t),e.inputs[0].dims.length===3)convTranspose1d(e,t);else{const r=getAdjustedConvTransposeAttributes2(t,e.inputs);convTranspose2d2(e,e.inputs,r)}}}}),createCumsumProgramInfo,cumsum,parseCumSumAttributes,init_cumsum=__esm({"web/lib/wasm/jsep/webgpu/ops/cumsum.ts"(){init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),createCumsumProgramInfo=(e,t,r,o)=>{const u=ShapeUtil2.size(t),l=t.length,c=inputVariable("input",e,l),d=outputVariable("output",e,l),i=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),a=ShapeUtil2.normalizeAxis(i,l),n=s=>{const p=` i32(${c.indicesGet("inputIndices","uniforms.axis")}) `,f=getElementAt("uniforms.input_shape","uniforms.axis",l),h=o.reverse?p+(o.exclusive?" + 1":""):"0",m=o.reverse?f:p+(o.exclusive?"":" + 1");return`
                ${s.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(c,d)}
                ${s.mainStart()}
                  ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${d.offsetToIndices("global_idx")};
                  var sum = ${d.type.value}(0);
                  let first : i32 = ${h};
                  let last : i32 = ${m};
                  for (var i : i32 = first; i < last; i++) {
                    ${c.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${c.getByIndices("inputIndices")};
                  }
                  ${d.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:o.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:[{type:12,data:u},{type:12,data:a},...createTensorShapeVariables(t,t)]}),getShaderSource:n}},cumsum=(e,t)=>{const r=e.inputs[0].dims,o=e.inputs[0].dataType,u=e.inputs[1];e.compute(createCumsumProgramInfo(o,r,u,t),{inputs:[0]})},parseCumSumAttributes=e=>{const t=e.exclusive===1,r=e.reverse===1;return createAttributeWithCacheKey2({exclusive:t,reverse:r})}}}),validateInputs35,permFunctionBody2,createDepthToSpaceProgramInfo,depthToSpace2,parseDepthToSpaceAttributes2,init_depth_to_space2=__esm({"web/lib/wasm/jsep/webgpu/ops/depth-to-space.ts"(){init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs35=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},permFunctionBody2=(e,t,r,o)=>{const u=[];u.push(`fn perm(i: ${o.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let l=0;l<t;++l)u.push(r.indicesSet("a",e[l],`i[${l}]`));return u.push("return a;}"),u.join(`
`)},createDepthToSpaceProgramInfo=(e,t)=>{let r,o,u,l,c,d;const i=t.format==="NHWC",a=t.blocksize,n=t.mode==="DCR";i?([r,o,u,l]=e.dims,c=n?[r,o,u,a,a,l/a**2]:[r,o,u,l/a**2,a,a],d=n?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,o,u,l]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],c=n?[r,a,a,l/a**2,o,u]:[r,l/a**2,a,a,o,u],d=n?[0,3,4,1,5,2]:[0,1,4,2,5,3]);const s=e.reshape(c),p=s.dims.length,f=e.dataType,h=inputVariable("a",f,p),m=outputVariable("output",f,p),_=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(h,m)}

  ${permFunctionBody2(d,p,h,m)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${m.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${m.setByOffset("global_idx",h.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:y=>{const g=i?[r,o*a,u*a,l/a**2]:[r,l/a**2,o*a,u*a],b=ShapeUtil2.size(g),v=s.dims,w=ShapeUtil2.sortBasedOnPerm(v,d);return{outputs:[{dims:g,dataType:y[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...createTensorShapeVariables(v,w)]}},getShaderSource:_}},depthToSpace2=(e,t)=>{validateInputs35(e.inputs),e.compute(createDepthToSpaceProgramInfo(e.inputs[0],t))},parseDepthToSpaceAttributes2=e=>createAttributeWithCacheKey2({blocksize:e.blocksize,mode:e.mode,format:e.format})}}),symbolPattern,termPattern,termPatternOnly,lhsPattern,lhsPatternOnly,EinsumTerm,EinsumEquation,appendMax,createEinsumProgramInfo,einsum,parseEinsumAttributes,init_einsum=__esm({"web/lib/wasm/jsep/webgpu/ops/einsum.ts"(){init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),symbolPattern="[a-zA-Z]|\\.\\.\\.",termPattern="("+symbolPattern+")+",termPatternOnly="^"+termPattern+"$",lhsPattern="("+termPattern+",)*"+termPattern,lhsPatternOnly="^"+lhsPattern+"$",EinsumTerm=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},EinsumEquation=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,o]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(lhsPatternOnly)))throw new Error("Invalid LHS term");if(r.split(",").forEach((c,d)=>{const i=e[d].dims.slice();if(!c.match(RegExp(termPatternOnly)))throw new Error("Invalid LHS term");const a=this.processTerm(c,!0,i,d);this.lhs.push(a)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([c,d])=>d.count===1||c==="...").map(([c])=>c).join("");else if(!o.match(RegExp(termPattern)))throw new Error("Invalid RHS");o.match(RegExp(symbolPattern,"g"))?.forEach(c=>{if(c==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{const d=this.symbolToInfo.get(c);if(d===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(d.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(e,t,r){let o=this.symbolToInfo.get(e);if(o!==void 0){if(o.dimValue!==t&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(r)}else o={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,o)}processTerm(e,t,r,o=-1){const u=r.length;let l=!1,c=[],d=0;if(!e.match(RegExp(termPatternOnly))&&!t&&e!=="")throw new Error("Invalid LHS term");const i=e.match(RegExp(symbolPattern,"g")),a=new EinsumTerm(o);return i?.forEach((n,s)=>{if(n==="..."){if(l)throw new Error("Only one ellipsis is allowed per input term");l=!0;const p=u-i.length+1;if(p<0)throw new Error("Ellipsis out of bounds");if(c=r.slice(d,d+p),this.hasEllipsis){if(this.ellipsisDims.length!==c.length||this.ellipsisDims.toString()!==c.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=c;else throw new Error("Ellipsis must be specified in the LHS");for(let f=0;f<c.length;f++){const h=String.fromCharCode(48+f);a.addSymbol(h,s+f),this.addSymbol(h,r[d++],o)}}else a.addSymbol(n,s+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(n,r[d++],o)}),a}},appendMax=e=>e+"_max",createEinsumProgramInfo=(e,t,r,o)=>{const l=e.map(n=>n.length).map((n,s)=>inputVariable(`input${s}`,t,n)),c=ShapeUtil2.size(o),d=outputVariable("output",t,o.length),i=[...r.symbolToInfo.keys()].filter(n=>!r.rhs.symbolToIndices.has(n)),a=n=>{const s=[],p="var prod = 1.0;",f="var sum = 0.0;",h="sum += prod;",m=[],_=[],y=[],g=[],b=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((w,x)=>{if(r.rhs.symbolToIndices.has(x)){const S=r.rhs.symbolToIndices.get(x)?.[0];S!==void 0&&r.lhs.forEach((T,I)=>{if(w.inputIndices.includes(I)){const P=T.symbolToIndices.get(x);if(P===void 0)throw new Error("Invalid symbol error");P.forEach(k=>{s.push(`${l[I].indicesSet(`input${I}Indices`,k,d.indicesGet("outputIndices",S))}`)})}})}else r.lhs.forEach((S,T)=>{if(w.inputIndices.includes(T)){const I=S.symbolToIndices.get(x);if(I===void 0)throw new Error("Invalid symbol error");I.forEach(P=>{m.push(`${l[T].indicesSet(`input${T}Indices`,P,`${x}`)}`)}),g.push(`prod *= ${l[T].getByIndices(`input${T}Indices`)};`)}}),_.push(`for(var ${x}: u32 = 0; ${x} < uniforms.${appendMax(x)}; ${x}++) {`),y.push("}")});const v=b?[...s,`let sum = ${l.map((w,x)=>w.getByIndices(`input${x}Indices`)).join(" * ")};`]:[...s,f,..._,...m,p,...g,h,...y];return`
            ${n.registerUniforms(i.map(w=>({name:`${appendMax(w)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...l,d)}

            ${n.mainStart()}
            ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${d.offsetToIndices("global_idx")};
            ${l.map((w,x)=>`var input${x}Indices: ${l[x].type.indices};`).join(`
`)}
            ${v.join(`
`)};
            ${d.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{const n=i.filter(p=>r.symbolToInfo.has(p)).map(p=>({type:12,data:r.symbolToInfo.get(p)?.dimValue||0}));n.push({type:12,data:c});const s=e.map((p,f)=>[...createTensorShapeVariables(p)]).reduce((p,f)=>p.concat(f),n);return s.push(...createTensorShapeVariables(o)),{outputs:[{dims:o,dataType:t}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:s}},getShaderSource:a}},einsum=(e,t)=>{const r=new EinsumEquation(e.inputs,t.equation),o=r.outputDims,u=e.inputs.map((l,c)=>l.dims);e.compute(createEinsumProgramInfo(u,e.inputs[0].dataType,r,o))},parseEinsumAttributes=e=>{const t=e.equation.replace(/\s+/g,"");return createAttributeWithCacheKey2({equation:t})}}}),validateInputs36,getAdjustedShape,calculateOutputShape3,createExpandProgramInfo,expand,init_expand=__esm({"web/lib/wasm/jsep/webgpu/ops/expand.ts"(){init_wasm_common(),init_util2(),init_common(),validateInputs36=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");const t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number);let o=r.length<t.length?0:r.length-t.length,u=t.length<r.length?0:t.length-r.length;for(;o<r.length&&u<t.length;++o,++u)if(r[o]!==t[u]&&r[o]!==1&&t[u]!==1)throw new Error("Expand requires shape to be broadcastable to input")},getAdjustedShape=(e,t)=>{const r=e.length-t.length,o=[];for(let u=0;u<r;++u)o.push(e[u]);for(let u=0;u<t.length;++u)o.push(t[u]===1?e[u+r]:t[u]);return o},calculateOutputShape3=(e,t)=>e.length>t.length?getAdjustedShape(e,t):getAdjustedShape(t,e),createExpandProgramInfo=e=>{const t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),o=calculateOutputShape3(t,r),u=e[0].dataType,l=u===9||ShapeUtil2.size(t)===1,c=u===9||t.length>0&&t[t.length-1]%4===0?4:1,d=l||o.length>0&&o[o.length-1]%4===0?4:1,i=Math.ceil(ShapeUtil2.size(o)/d),a=s=>{const p=inputVariable("input",u,t.length,c),f=outputVariable("output",u,o.length,d);let h;if(u===9){const m=(_,y,g="")=>`
          let outputIndices${y} = ${f.offsetToIndices(`outputOffset + ${y}u`)};
          let offset${y} = ${p.broadcastedIndicesToOffset(`outputIndices${y}`,f)};
          let index${y} = offset${y} / 4u;
          let component${y} = offset${y} % 4u;
          ${_}[${y}] = ${g}(${p.getByOffset(`index${y}`)}[component${y}]);
        `;h=`
        let outputOffset = global_idx * ${d};
        var data = vec4<u32>(0);
        ${m("data",0,"u32")}
        ${m("data",1,"u32")}
        ${m("data",2,"u32")}
        ${m("data",3,"u32")}
        ${f.setByOffset("global_idx","data")}
      }`}else h=`
        let outputIndices = ${f.offsetToIndices(`global_idx * ${d}`)};
        let inputOffset = ${p.broadcastedIndicesToOffset("outputIndices",f)};
        let data = ${f.type.value}(${p.getByOffset(`inputOffset / ${c}`)});
        ${f.setByOffset("global_idx","data")}
      }`;return`
    ${s.registerUniform("vec_size","u32").declareVariables(p,f)}
    ${s.mainStart()}
    ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${h}`},n=[{type:12,data:i},...createTensorShapeVariables(t,o)];return{name:"Expand",shaderCache:{hint:`${o.length};${c}${d}`,inputDependencies:["rank"]},getShaderSource:a,getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:n})}},expand=e=>{validateInputs36(e.inputs),e.compute(createExpandProgramInfo(e.inputs),{inputs:[0]})}}}),createFastGeluProgramInfo,fastGelu2,init_fast_gelu=__esm({"web/lib/wasm/jsep/webgpu/ops/fast-gelu.ts"(){init_wasm_common(),init_util2(),init_common(),init_unary_op2(),createFastGeluProgramInfo=e=>{const t=e[0].dataType,r=ShapeUtil2.size(e[0].dims),o=ShapeUtil2.size(e[1].dims),u=o%4===0,l=c=>{const d=inputVariable("x",t,[1],4),i=inputVariable("bias",t,[1],4),a=outputVariable("y",t,[1],4),n=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],s=f=>`
      let bias${f}_offset: u32 = (global_idx * 4 + ${f}) % uniforms.bias_size;
      let bias${f} = ${i.getByOffset(`bias${f}_offset / 4`)}[bias${f}_offset % 4];`,p=u?`
      let bias = ${i.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${s(0)}${s(1)}${s(2)}${s(3)}
      let bias = ${d.type.value}(bias0, bias1, bias2, bias3);`;return`${c.registerUniforms(n).declareVariables(d,i,a)}

    ${fastGeluImpl(tensorTypeToWsglValueType(t))}

    ${c.mainStart(WORKGROUP_SIZE)}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${d.getByOffset("global_idx")};
      ${p}
      let x_in = x + bias;
      ${a.setByOffset("global_idx",fastGeluExpression("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${u}`,inputDependencies:["type","type"]},getShaderSource:l,getRunData:c=>({outputs:[{dims:c[0].dims,dataType:c[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:o}],dispatchGroup:{x:Math.ceil(r/WORKGROUP_SIZE/4)}})}},fastGelu2=e=>{e.inputs.length<2||ShapeUtil2.size(e.inputs[1].dims)===0?fastGelu(e):e.compute(createFastGeluProgramInfo(e.inputs))}}}),validateInputs37,createGatherProgramInfo2,parseGatherAttributes2,gather2,init_gather2=__esm({"web/lib/wasm/jsep/webgpu/ops/gather.ts"(){init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs37=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},createGatherProgramInfo2=(e,t)=>{const r=e[0].dims,o=e[1].dims,u=r.length,l=ShapeUtil2.normalizeAxis(t.axis,u),c=r.slice(0);c.splice(l,1,...o);const d=r[l],i=e[0].dataType===9?4:1,a=Math.ceil(ShapeUtil2.size(c)/i),n=[{type:12,data:a},{type:6,data:d},{type:12,data:l},...createTensorShapeVariables(e[0].dims,e[1].dims,c)],s=p=>{const f=inputVariable("data",e[0].dataType,e[0].dims.length,i),h=inputVariable("inputIndices",e[1].dataType,e[1].dims.length),m=outputVariable("output",e[0].dataType,c.length,i),_=g=>{const b=o.length;let v=`var indicesIndices${g}  = ${h.type.indices}(0);`;for(let w=0;w<b;w++)v+=`${b>1?`indicesIndices${g}[${w}]`:`indicesIndices${g}`} = ${c.length>1?`outputIndices${g}[uniforms.axis + ${w}]`:`outputIndices${g}`};`;v+=`
          var idx${g} = ${h.getByIndices(`indicesIndices${g}`)};
          if (idx${g} < 0) {
            idx${g} = idx${g} + uniforms.axisDimLimit;
          }
          var dataIndices${g} : ${f.type.indices};
        `;for(let w=0,x=0;w<u;w++)w===l?(v+=`${u>1?`dataIndices${g}[${w}]`:`dataIndices${g}`} = u32(idx${g});`,x+=b):(v+=`${u>1?`dataIndices${g}[${w}]`:`dataIndices${g}`} = ${c.length>1?`outputIndices${g}[${x}]`:`outputIndices${g}`};`,x++);return v};let y;if(e[0].dataType===9){const g=(b,v,w="")=>`
          let outputIndices${v} = ${m.offsetToIndices(`outputOffset + ${v}u`)};
          ${_(v)};
          let offset${v} = ${f.indicesToOffset(`dataIndices${v}`)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${b}[${v}] = ${w}(${f.getByOffset(`index${v}`)}[component${v}]);
        `;y=`
        let outputOffset = global_idx * ${i};
        var value = vec4<u32>(0);
        ${g("value",0,"u32")}
        ${g("value",1,"u32")}
        ${g("value",2,"u32")}
        ${g("value",3,"u32")}
        ${m.setByOffset("global_idx","value")}
      `}else y=`
      let outputIndices = ${m.offsetToIndices("global_idx")};
      ${_("")};
      let value = ${f.getByIndices("dataIndices")};
      ${m.setByOffset("global_idx","value")};
      `;return`
      ${p.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,h,m)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${y}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:n}),getShaderSource:s}},parseGatherAttributes2=e=>createAttributeWithCacheKey2({axis:e.axis}),gather2=(e,t)=>{const r=e.inputs;validateInputs37(r),e.compute(createGatherProgramInfo2(e.inputs,t))}}}),computeSliceOffsets,gatherND,parseGatherNDAttributes,init_gather_nd=__esm({"web/lib/wasm/jsep/webgpu/ops/gather-nd.ts"(){init_wasm_common(),init_util2(),init_common(),computeSliceOffsets=(e,t,r,o,u,l,c,d,i)=>{const a=[{type:12,data:l},{type:12,data:o},{type:12,data:u},{type:12,data:r},{type:12,data:c},{type:12,data:d},{type:12,data:i}],n=[l];a.push(...createTensorShapeVariables(t.dims,n));const s=p=>{const f=inputVariable("indices_data",t.dataType,t.dims.length),h=outputVariable("input_slice_offsets_data",12,1,1),m=[f,h],_=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:u.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${p.registerUniforms(_).declareVariables(...m)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${u.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${u.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:a}),getShaderSource:s},{inputs:[t],outputs:[-1]})[0]},gatherND=(e,t)=>{const r=e.inputs,o=r[0].dims,u=r[0].dataType,l=r[1].dims,c=l[l.length-1],d=ShapeUtil2.sizeToDimension(l,l.length-1),i=ShapeUtil2.sizeFromDimension(o,t.batchDims+c),a=ShapeUtil2.sizeToDimension(o,t.batchDims),n=ShapeUtil2.sizeFromDimension(o,t.batchDims),s=d/a,p=new Array(c);let f=i;for(let v=0;v<c;++v)p[c-1-v]=f,f*=o[t.batchDims+c-1-v];const h=computeSliceOffsets(e,r[1],p,t.batchDims,o,d,s,n,c),m=t.batchDims+c;if(m>o.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");const _=l.slice(0,-1).concat(o.slice(m)),y=ShapeUtil2.size(_),g=[{type:12,data:y},{type:12,data:i},...createTensorShapeVariables(r[0].dims,h.dims,_)],b=v=>{const w=inputVariable("data",r[0].dataType,r[0].dims.length),x=inputVariable("slice_offsets",12,h.dims.length),S=outputVariable("output",r[0].dataType,_.length);return`
          ${v.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(w,x,S)}
            ${v.mainStart()}
            ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:_,dataType:u}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:g}),getShaderSource:b},{inputs:[r[0],h]})},parseGatherNDAttributes=e=>({batchDims:e.batch_dims,cacheKey:""})}}),validateInputs38,createGatherBlockQuantizedProgramInfo,gatherBlockQuantized,parseGatherBlockQuantizedAttributes,init_gather_block_quantized=__esm({"web/lib/wasm/jsep/webgpu/ops/gather-block-quantized.ts"(){init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs38=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");const r=ShapeUtil2.normalizeAxis(t.quantizeAxis,e[0].dims.length),o=t.blockSize,u=e[0],l=e[2],c=e.length===4?e[3]:void 0;if(l.dims.length!==u.dims.length||!u.dims.map((d,i)=>i===r?Math.ceil(d/o)===l.dims[i]:d===l.dims[i]).reduce((d,i)=>d&&i,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(c){if(c.dataType!==u.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(c.dims.length!==l.dims.length||!c.dims.map((d,i)=>d===l.dims[i]).reduce((d,i)=>d&&i,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},createGatherBlockQuantizedProgramInfo=(e,t)=>{const r=e[0].dims,o=e[1].dims,u=r.length,l=ShapeUtil2.normalizeAxis(t.gatherAxis,u),c=ShapeUtil2.normalizeAxis(t.quantizeAxis,u),d=r.slice(0);d.splice(l,1,...o);const i=ShapeUtil2.size(d),a=e[2].dataType,s=e[0].dataType===22,p=[{type:12,data:i},{type:12,data:c},{type:12,data:l},{type:12,data:t.blockSize},...createTensorShapeVariables(...e.map((h,m)=>h.dims),d)],f=h=>{const m=inputVariable("data",e[0].dataType,e[0].dims.length),_=inputVariable("inputIndices",e[1].dataType,e[1].dims.length),y=inputVariable("scales",e[2].dataType,e[2].dims.length),g=e.length>3?inputVariable("zeroPoint",e[3].dataType,e[3].dims.length):void 0,b=outputVariable("output",a,d.length),v=[m,_,y];g&&v.push(g);const w=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${h.registerUniforms(w).declareVariables(...v,b)}
        ${h.mainStart()}
        let output_indices = ${b.offsetToIndices("global_idx")};
        var indices_indices = ${_.type.indices}(0);
        ${o.length>1?`
          for (var i: u32 = 0; i < ${o.length}; i++) {
            let index = ${b.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${_.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${b.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${m.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${b.indicesGet("output_indices","i")};
          ${m.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${_.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[l]};
        }
        ${m.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${d.length}; i++) {
          let index = ${b.indicesGet("output_indices",`i + ${o.length} - 1`)};
          ${m.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${m.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${m.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${s?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${y.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${y.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${y.getByIndices("scale_indices")};
        ${g?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${g.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${g.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${s?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${tensorTypeToWsglValueType(a)}(quantized_data - zero_point) * scale;
        ${b.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((h,m)=>m!==1).map(h=>h.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(h,m)=>"rank")},getRunData:()=>({outputs:[{dims:d,dataType:a}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:p}),getShaderSource:f}},gatherBlockQuantized=(e,t)=>{const r=e.inputs;validateInputs38(r,t),e.compute(createGatherBlockQuantizedProgramInfo(e.inputs,t))},parseGatherBlockQuantizedAttributes=e=>createAttributeWithCacheKey2({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}}),validateInputs39,createGatherElementsProgramInfo,parseGatherElementsAttributes,gatherElements,init_gather_elements=__esm({"web/lib/wasm/jsep/webgpu/ops/gather-elements.ts"(){init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs39=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},createGatherElementsProgramInfo=(e,t)=>{const r=e[0].dims,o=e[0].dataType,u=r.length,l=e[1].dims,c=e[1].dataType,d=ShapeUtil2.normalizeAxis(t.axis,u),i=r[d],a=l.slice(0),n=ShapeUtil2.size(a),s=inputVariable("input",o,u),p=inputVariable("indicesInput",c,l.length),f=outputVariable("output",o,a.length),h=[{type:12,data:n},{type:6,data:i},{type:12,data:d}];return h.push(...createTensorShapeVariables(r,l,a)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:h}),getShaderSource:y=>`
      ${y.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(s,p,f)}
      ${y.mainStart()}
      ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${f.offsetToIndices("global_idx")};

      var idx = ${p.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${s.type.indices}(outputIndices);
      ${s.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${s.getByIndices("inputIndices")};

      ${f.setByOffset("global_idx","value")};
  }`}},parseGatherElementsAttributes=e=>createAttributeWithCacheKey2({axis:e.axis}),gatherElements=(e,t)=>{const r=e.inputs;validateInputs39(r),e.compute(createGatherElementsProgramInfo(e.inputs,t))}}}),validateInputs40,createGemmProgramInfo2,parseGemmAttributes2,gemm2,init_gemm2=__esm({"web/lib/wasm/jsep/webgpu/ops/gemm.ts"(){init_wasm_common(),init_util2(),init_common(),validateInputs40=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},createGemmProgramInfo2=(e,t)=>{const r=e[0].dims.slice(),o=e[1].dims.slice(),[u,l,c]=GemmUtil2.getShapeOfGemmResult(r,t.transA,o,t.transB,e.length===3?e[2].dims:void 0),d=[u,l];if(!d)throw new Error("Can't use gemm on the given tensors");const i=16,a=Math.ceil(l/i),n=Math.ceil(u/i),s=!0,p=ShapeUtil2.size(d),f=[{type:12,data:s?a:p},{type:12,data:u},{type:12,data:l},{type:12,data:c},{type:1,data:t.alpha},{type:1,data:t.beta}],h=["type","type"];e.length===3&&(f.push(...createTensorShapeVariables(e[2].dims)),h.push("rank")),f.push(...createTensorShapeVariables(d));const m=_=>{const y=inputVariable("a",e[0].dataType,e[0].dims),g=inputVariable("b",e[1].dataType,e[1].dims);let b=null;const v=[y,g];e.length===3&&(b=inputVariable("c",e[2].dataType,e[2].dims.length),v.push(b));const w=outputVariable("output",e[0].dataType,d.length);v.push(w);const x=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];let S="",T="";t.transA&&t.transB?(T=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${y.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${g.type.value}(0);
      }
      `,S="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(T=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${y.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${g.type.value}(0);
      }
      `,S="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(T=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${y.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${g.type.value}(0);
      }
      `,S="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(T=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${y.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${g.type.value}(0);
      }
      `,S="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");const I=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${_.registerUniforms(x).declareVariables(...v)}
  var<workgroup> tile_a: array<array<${y.type.storage}, ${i}>, ${i}>;
  var<workgroup> tile_b: array<array<${g.type.storage}, ${i}>, ${i}>;
  ${_.mainStart([i,i,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${i};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${i};
    let num_tiles = (uniforms.K - 1) / ${i} + 1;
    var k_start = 0u;
    var value = ${w.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${T}
      k_start = k_start + ${i};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${i}; k++) {
        ${S}
      }
      workgroupBarrier();
    }

    ${I}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${b!=null?`let cOffset = ${b.broadcastedIndicesToOffset("vec2(m, n)",w)}; value += ${w.type.value}(uniforms.beta) * ${b.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:a*n},programUniforms:f}),getShaderSource:m}},parseGemmAttributes2=e=>{const t=e.transA,r=e.transB,o=e.alpha,u=e.beta;return{transA:t,transB:r,alpha:o,beta:u,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},gemm2=(e,t)=>{validateInputs40(e.inputs),e.compute(createGemmProgramInfo2(e.inputs,t))}}}),idxN,idxC,idxH,idxW,validateInputs41,gsGetCubicCoeffs,gsBicubicInterpolate,gsDenormalize,gsReflect,pixelAtGrid,computePixel,createGridSampleProgramInfo,gridSample,parseGridSampleAttributes,init_grid_sample=__esm({"web/lib/wasm/jsep/webgpu/ops/grid-sample.ts"(){init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),[idxN,idxC,idxH,idxW]=[0,1,2,3],validateInputs41=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},gsGetCubicCoeffs=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,gsBicubicInterpolate=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,gsDenormalize=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,gsReflect=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,pixelAtGrid=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${idxN}] = batch;
     indices[${idxC}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${idxH}] = u32(r);
            indices[${idxW}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${idxH}] = u32(clamp(r, 0, H - 1));
          indices[${idxW}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${idxH}] = gs_reflect(r, border[1], border[3]);
          indices[${idxW}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,computePixel=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${idxN}], indices[${idxC}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${idxN}], indices[${idxC}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${idxN}], indices[${idxC}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${idxN}], indices[${idxC}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${idxN}], indices[${idxC}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${idxN}], indices[${idxC}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,createGridSampleProgramInfo=(e,t)=>{const r=inputVariable("x",e[0].dataType,e[0].dims.length),o=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],u=inputVariable("grid",e[1].dataType,o.length,2);let l=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(l=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[idxN,idxC,idxH,idxW]=[0,3,1,2]);const c=outputVariable("output",e[0].dataType,l.length),d=r.type.value,a=[{type:12,data:ShapeUtil2.size(l)},...createTensorShapeVariables(e[0].dims,o,l)],n=s=>`
  ${s.registerUniform("output_size","u32").declareVariables(r,u,c)}
  ${gsGetCubicCoeffs}
  ${gsBicubicInterpolate(d)}
  ${gsDenormalize(t)}
  ${gsReflect(t)}
  ${pixelAtGrid(r,d,t)}

  ${s.mainStart()}
    ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${idxH}]);
      let W_in = i32(uniforms.x_shape[${idxW}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${c.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${idxN}], indices[${idxH}], indices[${idxW}]);
      let nxy = ${u.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${computePixel(c,d,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:s=>{const p=ShapeUtil2.size(l);return{outputs:[{dims:l,dataType:s[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:a}},getShaderSource:n}},gridSample=(e,t)=>{validateInputs41(e.inputs),e.compute(createGridSampleProgramInfo(e.inputs,t))},parseGridSampleAttributes=e=>createAttributeWithCacheKey2({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}}),getInput,validateInputs42,parseMultiHeadAttentionAttributes,weightTransposeAttribute2,addBiasTranspose,maybeTransposeToBNSHAndAddBias,multiHeadAttention,init_multihead_attention=__esm({"web/lib/wasm/jsep/webgpu/ops/multihead-attention.ts"(){init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_types2(),init_attention(),init_common(),init_transpose2(),getInput=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,validateInputs42=(e,t)=>{const r=e[0],o=getInput(e,1),u=getInput(e,2),l=getInput(e,3),c=getInput(e,4),d=getInput(e,5),i=getInput(e,6),a=getInput(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");const n=r.dims[0],s=r.dims[1],p=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4];let f=s,h=0,m=0;const _=Math.floor(p/t.numHeads);if(i&&a&&ShapeUtil2.size(i.dims)&&ShapeUtil2.size(a.dims)){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(i.dims[0]!==n||i.dims[1]!==t.numHeads||i.dims[3]!==_)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(a.dims[0]!==n||a.dims[1]!==t.numHeads||a.dims[3]!==_)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(i.dims[2]!==a.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=i.dims[2],m=i.dims[2]}else if(i&&ShapeUtil2.size(i.dims)||a&&ShapeUtil2.size(a.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let y;if(o&&ShapeUtil2.size(o.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(o.dims.length<3||o.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(o.dims.length===3){if(o.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');y=2,f=o.dims[1]}else if(o.dims.length===5){if(o.dims[2]!==t.numHeads||o.dims[3]!==2||o.dims[4]!==_)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(u)throw new Error('Expect "value" be none when "key" has packed kv format.');y=5,f=o.dims[1]}else{if(o.dims[1]!==t.numHeads||o.dims[3]!==_)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');y=0,f=o.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');y=3}if(l&&ShapeUtil2.size(l.dims)>0){if(l.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(o&&o.dims.length===5&&o.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}const g=h+f;let b=0;if(c&&ShapeUtil2.size(c.dims)>0){b=8;const S=c.dims;throw S.length===1?S[0]===n?b=1:S[0]===3*n+2&&(b=3):S.length===2&&S[0]===n&&S[1]===g&&(b=5),b===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let v=!1,w=p;if(u&&ShapeUtil2.size(u.dims)>0){if(u.dims.length!==3&&u.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==u.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(u.dims.length===3){if(f!==u.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');w=u.dims[2]}else{if(f!==u.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');w=u.dims[1]*u.dims[3],v=!0}}const x=!1;if(c&&ShapeUtil2.size(c.dims)>0)throw new Error("Key padding mask is not supported");if(d&&ShapeUtil2.size(d.dims)>0){if(d.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(d.dims[0]!==n||d.dims[1]!==t.numHeads||d.dims[2]!==s||d.dims[3]!==g)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:n,sequenceLength:s,pastSequenceLength:h,kvSequenceLength:f,totalSequenceLength:g,maxSequenceLength:m,inputHiddenSize:0,hiddenSize:p,vHiddenSize:w,headSize:_,vHeadSize:Math.floor(w/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:b,scale:t.scale,broadcastResPosBias:x,passPastInKv:v,qkvFormat:y}},parseMultiHeadAttentionAttributes=e=>createAttributeWithCacheKey2({...e}),weightTransposeAttribute2=createAttributeWithCacheKey2({perm:[0,2,1,3]}),addBiasTranspose=(e,t,r,o,u,l,c)=>{const d=[o,u,l],i=ShapeUtil2.size(d),a=[{type:12,data:i},{type:12,data:c},{type:12,data:l}],n=s=>{const p=outputVariable("qkv_with_bias",t.dataType,d),f=inputVariable("qkv",t.dataType,d),h=inputVariable("bias",r.dataType,d),m=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${s.registerUniforms(m).declareVariables(f,h,p)}
  ${s.mainStart()}
    ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:d,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:a}),getShaderSource:n},{inputs:[t,r],outputs:[-1]})[0]},maybeTransposeToBNSHAndAddBias=(e,t,r,o,u,l,c,d)=>{let i=l;if(c&&ShapeUtil2.size(c.dims)>0){if(o===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return i=addBiasTranspose(e,l,c,t,o,r*u,d),i=i.reshape([t,o,r,u]),r===1||o===1?i:e.compute(createTransposeProgramInfo2(i,weightTransposeAttribute2.perm),{inputs:[i],outputs:[-1]})[0]}else return l.dims.length===3&&(i=l.reshape([t,o,r,u])),r===1||o===1?i:e.compute(createTransposeProgramInfo2(i,weightTransposeAttribute2.perm),{inputs:[i],outputs:[-1]})[0]},multiHeadAttention=(e,t)=>{const r=validateInputs42(e.inputs,t),o=e.inputs[0],u=getInput(e.inputs,1),l=getInput(e.inputs,2),c=getInput(e.inputs,3),d=getInput(e.inputs,4),i=getInput(e.inputs,5),a=getInput(e.inputs,6),n=getInput(e.inputs,7);if(o.dims.length===5)throw new Error("Packed QKV is not implemented");if(u?.dims.length===5)throw new Error("Packed KV is not implemented");const s=u&&l&&u.dims.length===4&&l.dims.length===4,p=maybeTransposeToBNSHAndAddBias(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,o,c,0);if(s)return applyAttention(e,p,u,l,d,void 0,a,n,i,r);if(!u||!l)throw new Error("key and value must be provided");const f=maybeTransposeToBNSHAndAddBias(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,u,c,r.hiddenSize),h=maybeTransposeToBNSHAndAddBias(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,l,c,2*r.hiddenSize);applyAttention(e,p,f,h,d,void 0,a,n,i,r)}}}),validateInputs43,createSplitAttributesFromInputs,calculateOutputIndexImpl,writeBufferDataImpl,createSplitProgramInfo2,split2,parseSplitAttributes2,init_split2=__esm({"web/lib/wasm/jsep/webgpu/ops/split.ts"(){init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs43=e=>{if(!e||e.length<1)throw new Error("too few inputs")},createSplitAttributesFromInputs=(e,t)=>{const r=[];let o=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(u=>r.push(Number(u))),o=r.length),createAttributeWithCacheKey2({numOutputs:o,axis:t.axis,splitSizes:r})},calculateOutputIndexImpl=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${getElementAt("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,writeBufferDataImpl=e=>{const t=e.length,r=[];for(let o=0;o<t;++o){const u=e[o].setByIndices("indices","input[global_idx]");t===1?r.push(u):o===0?r.push(`if (output_number == ${o}u) { ${u} }`):o===t-1?r.push(`else { ${u} }`):r.push(`else if (output_number == ${o}) { ${u} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},createSplitProgramInfo2=(e,t)=>{const r=e[0].dims,o=ShapeUtil2.size(r),u=e[0].dataType,l=ShapeUtil2.normalizeAxis(t.axis,r.length),c=new Array(t.numOutputs),d=inputVariable("input",u,r.length),i=new Array(t.numOutputs),a=[],n=[];let s=0;const p=[{type:12,data:o}];for(let h=0;h<t.numOutputs;h++){s+=t.splitSizes[h],i[h]=s;const m=r.slice();m[l]=t.splitSizes[h],n.push(m),c[h]=outputVariable(`output${h}`,u,m.length),a.push({dims:n[h],dataType:e[0].dataType})}p.push({type:12,data:i},...createTensorShapeVariables(r,...n));const f=h=>`
  ${h.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",i.length).declareVariables(d,...c)}
  ${calculateOutputIndexImpl(i.length)}
  ${writeBufferDataImpl(c)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${d.offsetToIndices("global_idx")};
    var index = ${d.indicesGet("indices",l)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${getElementAt("uniforms.size_in_split_axis","output_number - 1u",i.length)};
      ${d.indicesSet("indices",l,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:f,getRunData:()=>({outputs:a,dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p})}},split2=(e,t)=>{validateInputs43(e.inputs);const r=e.inputs.length===1?t:createSplitAttributesFromInputs(e.inputs,t);e.compute(createSplitProgramInfo2(e.inputs,r),{inputs:[0]})},parseSplitAttributes2=e=>{const t=e.axis,r=e.splitSizes,o=e.numOutputs<0?r.length:e.numOutputs;if(o!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return createAttributeWithCacheKey2({axis:t,numOutputs:o,splitSizes:r})}}}),validateInputs44,createRotaryEmbeddingProgramInfo,rotaryEmbedding,init_rotary_embedding=__esm({"web/lib/wasm/jsep/webgpu/ops/rotary-embedding.ts"(){init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs44=(e,t)=>{const[r,o,u,l]=e,{numHeads:c,rotaryEmbeddingDim:d}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!ShapeUtil2.areEqual(o.dims,[])&&!ShapeUtil2.areEqual(o.dims,[1])&&o.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${o.dims.length}`);if(u.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${u.dims.length}`);if(l.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${l.dims.length}`);if(!ShapeUtil2.areEqual(u.dims,l.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(d>0&&c===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");const i=r.dims[0],a=r.dims[r.dims.length-2],n=u.dims[0],s=ShapeUtil2.sizeFromDimension(r.dims,1)/a,p=d===0?u.dims[1]*2:s/c;if(d>p)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(o.dims.length===2){if(i!==o.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${o.dims[0]}`);if(a!==o.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${o.dims[1]}`)}if(p/2!==u.dims[1]&&d/2!==u.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${u.dims[1]}`);if(a>n)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},createRotaryEmbeddingProgramInfo=(e,t)=>{const{interleaved:r,numHeads:o,rotaryEmbeddingDim:u,scale:l}=t,c=e[0].dims[0],d=ShapeUtil2.sizeFromDimension(e[0].dims,1),i=e[0].dims[e[0].dims.length-2],a=d/i,n=e[2].dims[1],s=u===0?n*2:a/o,p=new Array(c,i,a/s,s-n),f=ShapeUtil2.computeStrides(p),h=[{type:1,data:l},{type:12,data:p},{type:12,data:f},...e[0].dims.length===3?new Array({type:12,data:[d,a,s,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[d,s,i*s,1]}):[],...createTensorShapeVariables(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],m=_=>{const y=inputVariable("input",e[0].dataType,e[0].dims.length),g=inputVariable("position_ids",e[1].dataType,e[1].dims.length),b=inputVariable("cos_cache",e[2].dataType,e[2].dims.length),v=inputVariable("sin_cache",e[3].dataType,e[3].dims.length),w=outputVariable("output",e[0].dataType,e[0].dims.length);return _.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:p.length},{name:"global_strides",type:"u32",length:f.length},{name:"input_output_strides",type:"u32",length:f.length}]),`
        ${_.declareVariables(y,g,b,v,w)}

        ${_.mainStart(WORKGROUP_SIZE)}
          let half_rotary_emb_dim = uniforms.${b.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${g.broadcastedIndicesToOffset("bsnh.xy",outputVariable("",g.type.tensor,2))};
            let position_id =
                u32(${g.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${y.getByOffset("i")} * ${b.get("position_id","bsnh[3]")} -
                ${y.getByOffset("j")} * ${v.get("position_id","bsnh[3]")};
            ${w.setByOffset("i","re")}
            let im = ${y.getByOffset("i")} * ${v.get("position_id","bsnh[3]")} +
                ${y.getByOffset("j")} * ${b.get("position_id","bsnh[3]")};
            ${w.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${w.setByOffset("k",y.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:createAttributeWithCacheKey2({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(ShapeUtil2.size(p)/WORKGROUP_SIZE)},programUniforms:h})}},rotaryEmbedding=(e,t)=>{validateInputs44(e.inputs,t),e.compute(createRotaryEmbeddingProgramInfo(e.inputs,t))}}}),validateInputs45,weightTransposeAttribute3,maybeTransposeToBNSH,generatePositionIdsProgramInfo,groupQueryAttention,init_group_query_attention=__esm({"web/lib/wasm/jsep/webgpu/ops/group-query-attention.ts"(){init_attribute_with_cache_key2(),init_wasm_common(),init_attention(),init_multihead_attention(),init_split2(),init_transpose2(),init_rotary_embedding(),init_common(),validateInputs45=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");const r=e[0],o=e[1],u=e[2],l=e[3],c=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");const d=!1,i=r.dims[0],a=r.dims[1];let n=r.dims.length===3?d?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],s=a,p=0;const f=!o||o.dims.length===0,h=Math.floor(f?n/(t.numHeads+2*t.kvNumHeads):n/t.numHeads);f&&(n=h*t.numHeads);const m=l&&l.dims.length!==0,_=c&&c.dims.length!==0;if(m&&l.dims.length===4&&l.dims[0]===i&&l.dims[1]!==t.kvNumHeads&&l.dims[2]===t.kvNumHeads&&l.dims[3]===h)throw new Error("BSNH pastKey/pastValue is not supported");if(m&&_){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(c.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');p=l.dims[2]}else if(m||_)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let g=1;if(o&&o.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(o.dims.length<3||o.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(o.dims.length===3){if(r.dims[2]%o.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');s=o.dims[1]}else if(o.dims.length===5){if(o.dims[2]!==t.numHeads||o.dims[3]!==2||o.dims[4]!==h)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(u)throw new Error('Expect "value" be none when "key" has packed kv format.');s=o.dims[1]}else{if(o.dims[1]!==t.numHeads||o.dims[3]!==h)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');s=o.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');g=3}const b=0;let v=!1,w=t.kvNumHeads?h*t.kvNumHeads:n;if(u&&u.dims.length>0){if(u.dims.length!==3&&u.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==u.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(u.dims.length===3){if(s!==u.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');w=u.dims[2]}else{if(s!==u.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');w=u.dims[1]*u.dims[3],v=!0}}const x=e.length>4?e[5]:void 0;if(x&&x.dims.length!==1&&x.dims[0]!==i)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:i,sequenceLength:a,pastSequenceLength:p,kvSequenceLength:s,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:n,vHiddenSize:w,headSize:h,vHeadSize:Math.floor(w/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:b,scale:t.scale,broadcastResPosBias:!1,passPastInKv:v,qkvFormat:g}},weightTransposeAttribute3=createAttributeWithCacheKey2({perm:[0,2,1,3]}),maybeTransposeToBNSH=(e,t,r)=>{let o=t;const u=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(o=t.reshape([r.batchSize,r.kvSequenceLength,u,r.headSize]),o=e.compute(createTransposeProgramInfo2(o,weightTransposeAttribute3.perm),{inputs:[o],outputs:[-1]})[0]),o},generatePositionIdsProgramInfo=(e,t,r,o)=>{const l=["type","type"],c=[e*t],d=e*t,i=[{type:12,data:d},{type:12,data:t},{type:12,data:e}],a=n=>{const s=inputVariable("seq_lens",r.dataType,r.dims),p=inputVariable("total_seq_lens",o.dataType,o.dims),f=outputVariable("pos_ids",7,c),h=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${n.registerUniforms(h).declareVariables(s,p,f)}
  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${p.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${s.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${f.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${f.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${f.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:c,dataType:7}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:i}),getShaderSource:a}},groupQueryAttention=(e,t)=>{const r=validateInputs45(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");const o=e.inputs[0],u=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,l=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,c=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,d=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,i=e.inputs.length>4?e.inputs[5]:void 0,a=e.inputs.length>5?e.inputs[6]:void 0,n=r.kvNumHeads?r.kvNumHeads:r.numHeads,s=createAttributeWithCacheKey2({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,n*r.headSize,n*r.headSize]}),[p,f,h]=!u&&!l?e.compute(createSplitProgramInfo2([o],s),{inputs:[o],outputs:[-1,-1,-1]}):[o,u,l];let m,_;if(t.doRotary){const v=e.compute(generatePositionIdsProgramInfo(r.batchSize,r.sequenceLength,i,a),{inputs:[i,a],outputs:[-1]})[0],w=e.inputs[7],x=e.inputs[8],S=createAttributeWithCacheKey2({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),T=[p,v,w,x],I=[-1];m=e.compute(createRotaryEmbeddingProgramInfo(T,S),{inputs:T,outputs:I})[0],T.splice(0,1,f);const P=createAttributeWithCacheKey2({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});_=e.compute(createRotaryEmbeddingProgramInfo(T,P),{inputs:T,outputs:I})[0]}const y=maybeTransposeToBNSHAndAddBias(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?m:p,void 0,0),g=maybeTransposeToBNSH(e,t.doRotary?_:f,r),b=maybeTransposeToBNSH(e,h,r);applyAttention(e,y,g,b,void 0,void 0,c,d,void 0,r,i,a)}}}),computeChannelScaleShift,createInstanceNormProgramInfo,createInstanceNormNHWCProgramInfo,instanceNorm,init_instance_norm=__esm({"web/lib/wasm/jsep/webgpu/ops/instance-norm.ts"(){init_wasm_common(),init_util2(),init_transpose2(),init_common(),computeChannelScaleShift=(e,t,r,o,u,l,c,d)=>{const i=getMaxComponents(l),a=i===1?"f32":`vec${i}f`,n=i===1?"vec2f":`mat2x${i}f`,s=u*c;let p=64;s===1&&(p=256);const f=[u,c,l/i],h=[u,c,2],m=["rank","type","type"],_=[];_.push(...createTensorShapeVariables(f,h));const y=g=>{const b=inputVariable("x",t.dataType,3,i),v=inputVariable("scale",r.dataType,r.dims),w=inputVariable("bias",o.dataType,o.dims),x=outputVariable("output",1,3,2),S=[b,v,w,x];return`
  var<workgroup> workgroup_shared : array<${n}, ${p}>;
  const workgroup_size = ${p}u;
  ${g.declareVariables(...S)}
  ${g.mainStart(p)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${a}(0);
    var squared_sum = ${a}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${a}(${b.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${n}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${sumVector("workgroup_shared[0][0]",i)} / f32(hight * ${i});
      let squared_sum_final = ${sumVector("workgroup_shared[0][1]",i)} / f32(hight * ${i});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${d}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${i};${d};${p}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:h,dataType:1}],dispatchGroup:{x:s},programUniforms:_}),getShaderSource:y},{inputs:[t,r,o],outputs:[-1]})[0]},createInstanceNormProgramInfo=(e,t,r)=>{const o=t[0].dims,u=o,l=2,c=o[0],d=o[1],i=ShapeUtil2.sizeFromDimension(o,l),a=getMaxComponents(i),n=ShapeUtil2.size(u)/a,s=computeChannelScaleShift(e,t[0],t[1],t[2],c,i,d,r.epsilon),p=[c,d,i/a],f=[c,d],h=["type","none"],m=_=>{const y=inputVariable("x",t[0].dataType,p.length,a),g=inputVariable("scale_shift",1,f.length,2),b=outputVariable("output",t[0].dataType,p.length,a),v=[y,g,b];return`
  ${_.registerUniform("output_size","u32").declareVariables(...v)}
  ${_.mainStart()}
  ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${b.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${g.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${y.getByOffset("global_idx")} * ${b.type.value}(scale_shift.x) + ${b.type.value}(scale_shift.y);
      ${b.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${a}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:u,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},...createTensorShapeVariables(p,f,p)]}),getShaderSource:m},{inputs:[t[0],s]})},createInstanceNormNHWCProgramInfo=(e,t,r)=>{const o=t[0].dims,u=o,l=o[0],c=o[o.length-1],d=ShapeUtil2.sizeFromDimension(o,1)/c,i=getMaxComponents(c),a=ShapeUtil2.size(u)/i,n=[{type:12,data:d},{type:12,data:Math.floor(c/i)}],s=["type","type"];let p=!1;const f=[0,o.length-1];for(let y=0;y<o.length-2;y++)p=p||o[y+1]!==1,f.push(y+1);p=p&&o[o.length-1]!==1;const h=p?e.compute(createTransposeProgramInfo2(e.inputs[0],f),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:o.length},(y,g)=>o[f[g]])),m=computeChannelScaleShift(e,h,t[1],t[2],l,d,c,r.epsilon),_=y=>{const g=tensorTypeToWsglStorageType(t[0].dataType),b=i===1?"vec2f":`mat${i}x2f`,v=S=>{const T=S===0?"x":"y",I=i===1?"f32":`vec${i}f`;switch(i){case 1:return`${g}(${I}(scale.${T}))`;case 2:return`vec2<${g}>(${I}(scale[0].${T}, scale[1].${T}))`;case 4:return`vec4<${g}>(${I}(scale[0].${T}, scale[1].${T}, scale[2].${T}, scale[3].${T}))`;default:throw new Error(`Not supported compoents ${i}`)}},w=inputVariable("input",t[0].dataType,t[0].dims,i),x=outputVariable("output",t[0].dataType,u,i);return`
  @group(0) @binding(0) var<storage, read> input : array<${w.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${b}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${x.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${y.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${v(0)}, ${v(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${i}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:u,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:n}),getShaderSource:_},{inputs:[t[0],m]})},instanceNorm=(e,t)=>{t.format==="NHWC"?createInstanceNormNHWCProgramInfo(e,e.inputs,t):createInstanceNormProgramInfo(e,e.inputs,t)}}}),validateInputs46,createLayerNormProgramInfo,layerNorm,init_layer_norm=__esm({"web/lib/wasm/jsep/webgpu/ops/layer-norm.ts"(){init_wasm_common(),init_util2(),init_common(),validateInputs46=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},createLayerNormProgramInfo=(e,t,r)=>{const o=t.simplified,u=e[0].dims,l=e[1],c=!o&&e[2],d=u,i=ShapeUtil2.normalizeAxis(t.axis,u.length),a=ShapeUtil2.sizeToDimension(u,i),n=ShapeUtil2.sizeFromDimension(u,i),s=ShapeUtil2.size(l.dims),p=c?ShapeUtil2.size(c.dims):0;if(s!==n||c&&p!==n)throw new Error(`Size of X.shape()[axis:] == ${n}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${s} and bias size of ${p}`);const f=[];for(let w=0;w<u.length;++w)w<i?f.push(u[w]):f.push(1);const h=getMaxComponents(n),m=["type","type"],_=[{type:12,data:a},{type:1,data:n},{type:12,data:Math.floor(n/h)},{type:1,data:t.epsilon}];c&&m.push("type");const y=r>1,g=r>2,b=w=>{const x=tensorTypeToWsglStorageType(e[0].dataType),S=[inputVariable("x",e[0].dataType,e[0].dims,h),inputVariable("scale",l.dataType,l.dims,h)];c&&S.push(inputVariable("bias",c.dataType,c.dims,h)),S.push(outputVariable("output",e[0].dataType,d,h)),y&&S.push(outputVariable("mean_data_output",1,f)),g&&S.push(outputVariable("inv_std_output",1,f));const T=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${w.registerUniforms(T).declareVariables(...S)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${fillVector("f32",h)};
    var mean_square_vector = ${fillVector("f32",h)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${castToF32(x,h,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${sumVector("mean_vector",h)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${sumVector("mean_square_vector",h)} / uniforms.norm_size ${o?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${castToF32(x,h,"x[j + offset]")};
      let f32scale = ${castToF32(x,h,"scale[j]")};
      output[j + offset] = ${S[0].type.value}((f32input ${o?"":"- mean"}) * inv_std_dev * f32scale
        ${c?`+ ${castToF32(x,h,"bias[j]")}`:""}
      );
    }

    ${y?"mean_data_output[global_idx] = mean":""};
    ${g?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},v=[{dims:d,dataType:e[0].dataType}];return y&&v.push({dims:f,dataType:1}),g&&v.push({dims:f,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${h};${r};${o}`,inputDependencies:m},getRunData:()=>({outputs:v,dispatchGroup:{x:Math.ceil(a/64)},programUniforms:_}),getShaderSource:b}},layerNorm=(e,t)=>{validateInputs46(e.inputs),e.compute(createLayerNormProgramInfo(e.inputs,t,e.outputCount))}}}),validateInputs47,matMul2,init_matmul2=__esm({"web/lib/wasm/jsep/webgpu/ops/matmul.ts"(){init_util2(),init_matmul_shaders(),init_matmul_packed_webgpu(),validateInputs47=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},matMul2=e=>{validateInputs47(e.inputs);const t=BroadcastUtil2.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");const r=t[t.length-1],o=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&o<8)e.compute(createNaiveMatmulProgramInfo(e.inputs,{activation:""},t));else{const u=t[t.length-2],l=ShapeUtil2.size(e.inputs[0].dims.slice(0,-2)),c=ShapeUtil2.size(e.inputs[1].dims.slice(0,-2));if(l!==1&&u===1&&c===1){const d=e.inputs[0].reshape([1,l,o]),i=e.inputs[1].reshape([1,o,r]),a=[1,l,r],n=[d,i];e.compute(createMatmulProgramInfo2(n,{activation:""},t,a),{inputs:n})}else e.compute(createMatmulProgramInfo2(e.inputs,{activation:""},t))}}}}),validateInputs48,createMatMulNBitsProgramInfo,createMatMulNBitsBlockSize32ProgramInfo,matMulNBits,parseMatMulNBitsAttributes,init_matmulnbits=__esm({"web/lib/wasm/jsep/webgpu/ops/matmulnbits.ts"(){init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs48=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");const r=e[0],o=r.dims.length;if(r.dims[o-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");const u=Math.floor((t.k+t.blockSize-1)/t.blockSize),l=t.blockSize/8*t.bits,c=e[1];if(!ShapeUtil2.areEqual(c.dims,[t.n,u,l]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");const i=e[2].dims;if(ShapeUtil2.size(i)!==t.n*u)throw new Error("scales input size error.");if(e.length===4){const n=e[3].dims,s=t.n*(t.bits===8?u:Math.floor((u*t.bits+7)/8));if(ShapeUtil2.size(n)!==s)throw new Error("zeroPoints input size error.")}},createMatMulNBitsProgramInfo=(e,t)=>{const r=e[0].dims,o=r.length,u=r[o-2],l=t.k,c=t.n,d=r.slice(0,o-2),i=ShapeUtil2.size(d),n=e[1].dims[2]/4,s=e[0].dataType,p=getMaxComponents(t.k),f=getMaxComponents(n),h=getMaxComponents(c),m=d.concat([u,c]),_=u>1&&c/h%2===0?2:1,y=ShapeUtil2.size(m)/h/_,g=64,b=[],v=[i,u,l/p],w=ShapeUtil2.convertShape(e[1].dims).slice();w.splice(-1,1,n/f),b.push(...createTensorShapeVariables(v)),b.push(...createTensorShapeVariables(w)),b.push(...createTensorShapeVariables(e[2].dims)),e.length===4&&b.push(...createTensorShapeVariables(ShapeUtil2.convertShape(e[3].dims)));const x=[i,u,c/h];b.push(...createTensorShapeVariables(x));const S=T=>{const I=v.length,P=inputVariable("a",e[0].dataType,I,p),k=inputVariable("b",12,w.length,f),D=inputVariable("scales",e[2].dataType,e[2].dims.length),z=[P,k,D],E=e.length===4?inputVariable("zero_points",12,e[3].dims.length):void 0;E&&z.push(E);const B=x.length,N=outputVariable("output",e[0].dataType,B,h),O=tensorTypeToWsglStorageType(e[0].dataType),M=(()=>{switch(p){case 1:return`array<${O}, 8>`;case 2:return`mat4x2<${O}>`;case 4:return`mat2x4<${O}>`;default:throw new Error(`${p}-component is not supported.`)}})(),A=()=>{let U=`
          // reuse a data
            var input_offset = ${P.indicesToOffset(`${P.type.indices}(batch, row, word_offset)`)};
            var a_data: ${M};
            for (var j: u32 = 0; j < ${8/p}; j++) {
              a_data[j] = ${P.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let R=0;R<h*_;R++)U+=`
            b_value = ${f===1?`b${R}_data`:`b${R}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${M}(${Array.from({length:4},($,C)=>`${O}(b_value_lower[${C}]), ${O}(b_value_upper[${C}])`).join(", ")});
            b_dequantized_values = ${p===1?`${M}(${Array.from({length:8},($,C)=>`(b_quantized_values[${C}] - ${E?`zero_point${R}`:"zero_point"}) * scale${R}`).join(", ")});`:`(b_quantized_values - ${M}(${Array(8).fill(`${E?`zero_point${R}`:"zero_point"}`).join(",")})) * scale${R};`};
            workgroup_shared[local_id.x * ${_} + ${Math.floor(R/h)}]${h>1?`[${R%h}]`:""} += ${Array.from({length:8/p},($,C)=>`${p===1?`a_data[${C}] * b_dequantized_values[${C}]`:`dot(a_data[${C}], b_dequantized_values[${C}])`}`).join(" + ")};
          `;return U},L=()=>{let U=`
            var col_index = col * ${h};
            ${E?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${O}(8);`}
            `;for(let R=0;R<h*_;R++)U+=`
            let scale${R} = ${D.getByOffset("col_index * nBlocksPerCol + block")};
            ${E?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${E.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${R} = ${O}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return U},q=()=>{let U=`col_index = col * ${h};`;for(let R=0;R<h*_;R++)U+=`
            let b${R}_data = ${k.getByIndices(`${k.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return U+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${M};
            var b_dequantized_values: ${M};`,U};return`
        var<workgroup> workgroup_shared: array<${N.type.value}, ${_*g}>;
        ${T.declareVariables(...z,N)}
        ${T.mainStart([g,1,1])}
          let output_indices = ${N.offsetToIndices(`(global_idx / ${g}) * ${_}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${g}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/p};
            ${L()}
            for (var word: u32 = 0; word < ${n}; word += ${f}) {
              ${q()}
              for (var i: u32 = 0; i < ${f}; i++) {
                ${A()}
                word_offset += ${8/p};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${_}) {
            var output_value: ${N.type.value} = ${N.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${g}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${_};
            }
            ${N.setByIndices(`${N.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${p};${f};${h};${_};${g}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:m,dataType:s}],dispatchGroup:{x:y},programUniforms:b}),getShaderSource:S}},createMatMulNBitsBlockSize32ProgramInfo=(e,t)=>{const r=e[0].dims,o=r.length,u=r[o-2],l=t.k,c=t.n,d=r.slice(0,o-2),i=ShapeUtil2.size(d),n=e[1].dims[2]/4,s=e[0].dataType,p=getMaxComponents(t.k),f=getMaxComponents(n),h=d.concat([u,c]),m=128,_=c%8===0?8:c%4===0?4:1,y=m/_,g=y*f*8,b=g/p,v=g/t.blockSize,w=ShapeUtil2.size(h)/_,x=[],S=[i,u,l/p],T=ShapeUtil2.convertShape(e[1].dims).slice();T.splice(-1,1,n/f),x.push(...createTensorShapeVariables(S)),x.push(...createTensorShapeVariables(T)),x.push(...createTensorShapeVariables(e[2].dims)),e.length===4&&x.push(...createTensorShapeVariables(ShapeUtil2.convertShape(e[3].dims)));const I=[i,u,c];x.push(...createTensorShapeVariables(I));const P=k=>{const D=S.length,z=inputVariable("a",e[0].dataType,D,p),E=inputVariable("b",12,T.length,f),B=inputVariable("scales",e[2].dataType,e[2].dims.length),N=[z,E,B],O=e.length===4?inputVariable("zero_points",12,e[3].dims.length):void 0;O&&N.push(O);const M=I.length,A=outputVariable("output",e[0].dataType,M),L=tensorTypeToWsglStorageType(e[0].dataType),q=()=>{switch(p){case 1:return`
          let a_data0 = vec4<${L}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${L}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${L}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${L}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${p}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${z.type.value}, ${b}>;
        var<workgroup> inter_results: array<array<${A.type.value}, ${y}>, ${_}>;
        ${k.declareVariables(...N,A)}
        ${k.mainStart([y,_,1])}
          let output_indices = ${A.offsetToIndices(`workgroup_index * ${_}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${v} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${b};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${b}; a_offset += ${m})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${z.getByIndices(`${z.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${z.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${v} + local_id.x;
            ${O?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${O.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${L}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${L}(8);`}
            let scale = ${B.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${E.getByIndices(`${E.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/p};
            for (var i: u32 = 0; i < ${f}; i++) {
              ${q()}
              let b_value = ${f===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${L}>(${Array.from({length:4},(U,R)=>`${L}(b_value_lower[${R}]), ${L}(b_value_upper[${R}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${L}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(U,R)=>`${`dot(a_data${R}, b_dequantized_values[${R}])`}`).join(" + ")};
              word_offset += ${8/p};
            }
            workgroupBarrier();
          }

          if (local_idx < ${_}) {
            var output_value: ${A.type.value} = ${A.type.value}(0);
            for (var b = 0u; b < ${y}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${A.setByIndices(`${A.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${p};${f};${y};${_}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:h,dataType:s}],dispatchGroup:{x:w},programUniforms:x}),getShaderSource:P}},matMulNBits=(e,t)=>{validateInputs48(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(createMatMulNBitsBlockSize32ProgramInfo(e.inputs,t)):e.compute(createMatMulNBitsProgramInfo(e.inputs,t))},parseMatMulNBitsAttributes=e=>createAttributeWithCacheKey2(e)}}),validateInputs49,getPadConstant2,getPadReflect2,getPadEdge2,getPadWrap,getPadSnippet,createPadProgramInfo2,createPadAttributesFromInputs,pad,init_pad2=__esm({"web/lib/wasm/jsep/webgpu/ops/pad.ts"(){init_wasm_common(),init_util2(),init_common(),validateInputs49=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},getPadConstant2=(e,t,r)=>{let o="";for(let u=t-1;u>=0;--u)o+=`
            k = i32(${e.indicesGet("indices",u)}) - ${getElementAt("uniforms.pads",u,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${getElementAt("uniforms.x_shape",u,t)})) {
              break;
            }
            offset += k * i32(${getElementAt("uniforms.x_strides",u,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${o}
            value = x[offset];
          }
      `},getPadReflect2=(e,t,r)=>{let o="";for(let u=t-1;u>=0;--u)o+=`
                k = i32(${e.indicesGet("indices",u)}) - ${getElementAt("uniforms.pads",u,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${getElementAt("uniforms.x_shape",u,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${getElementAt("uniforms.x_shape",u,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${getElementAt("uniforms.x_strides",u,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${o}
              value = x[offset];
          `},getPadEdge2=(e,t,r)=>{let o="";for(let u=t-1;u>=0;--u)o+=`
                k = i32(${e.indicesGet("indices",u)}) - ${getElementAt("uniforms.pads",u,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${getElementAt("uniforms.x_shape",u,t)})) {
                  k = i32(${getElementAt("uniforms.x_shape",u,t)}) - 1;
                }
                offset += k * i32(${getElementAt("uniforms.x_strides",u,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${o}
              value = x[offset];
          `},getPadWrap=(e,t,r)=>{let o="";for(let u=t-1;u>=0;--u)o+=`
                k = i32(${e.indicesGet("indices",u)}) - ${getElementAt("uniforms.pads",u,r)};
                if (k < 0)  {
                  k += i32(${getElementAt("uniforms.x_shape",u,t)}]);
                }
                if (k >= i32(${getElementAt("uniforms.x_shape",u,t)})) {
                  k -= i32(${getElementAt("uniforms.x_shape",u,t)});
                }
                offset += k * i32(${getElementAt("uniforms.x_strides",u,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${o}
              value = x[offset];
          `},getPadSnippet=(e,t,r)=>{switch(r.mode){case 0:return getPadConstant2(e,t,r.pads.length);case 1:return getPadReflect2(e,t,r.pads.length);case 2:return getPadEdge2(e,t,r.pads.length);case 3:return getPadWrap(e,t,r.pads.length);default:throw new Error("Invalid mode")}},createPadProgramInfo2=(e,t)=>{const r=ShapeUtil2.padShape(e[0].dims.slice(),t.pads),o=e[0].dims,l=[{type:12,data:ShapeUtil2.size(r)},{type:6,data:t.pads}],c=e.length>=3&&e[2].data;t.mode===0&&l.push({type:c?e[2].dataType:1,data:t.value}),l.push(...createTensorShapeVariables(e[0].dims,r));const d=["rank"],i=a=>{const n=outputVariable("output",e[0].dataType,r.length),s=inputVariable("x",e[0].dataType,o.length),p=s.type.value,f=getPadSnippet(n,o.length,t),h=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&h.push({name:"constant_value",type:c?p:"f32"}),`
            ${a.registerUniforms(h).declareVariables(s,n)}
            ${a.mainStart()}
            ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${n.offsetToIndices("global_idx")};

            var value = ${p}(0);
            ${f}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${c}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(ShapeUtil2.size(r)/64)},programUniforms:l}),getShaderSource:i}},createPadAttributesFromInputs=(e,t)=>{if(e.length>1){const r=e[1].getBigInt64Array(),o=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,u=e[0].dims.length,l=new Int32Array(2*u).fill(0);if(e.length>=4){const d=e[3].getBigInt64Array();for(let i=0;i<d.length;i++)l[Number(d[i])]=Number(r[i]),l[Number(d[i])+u]=Number(r[i+d.length])}else r.forEach((d,i)=>l[Number(i)]=Number(d));const c=[];return l.forEach(d=>c.push(d)),{mode:t.mode,value:o,pads:c}}else return t},pad=(e,t)=>{validateInputs49(e.inputs);const r=createPadAttributesFromInputs(e.inputs,t);e.compute(createPadProgramInfo2(e.inputs,r),{inputs:[0]})}}}),validateInputs50,getAdjustedPoolAttributesAndOutputShape2,getUniformAndPadInfo,generatePoolingCode2,createShaderKeyFromAttributes,createAveragePoolShaderKeyFromAttributes,createMaxPoolShaderKeyFromAttributes,parsePoolCommonAttributes,createAveragePoolProgramInfo2,parseAveragePoolAttributes2,averagePool2,globalPoolAttributes,parseGlobalAveragePoolAttributes2,globalAveragePool2,createMaxPoolProgramInfo2,maxPool2,parseMaxPoolAttributes2,parseGlobalMaxPoolAttributes,globalMaxPool2,init_pool2=__esm({"web/lib/wasm/jsep/webgpu/ops/pool.ts"(){init_esm(),init_wasm_common(),init_util2(),init_common(),validateInputs50=e=>{if(env2.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},getAdjustedPoolAttributesAndOutputShape2=(e,t,r)=>{const o=t.format==="NHWC",u=e.dims.slice();o&&u.splice(1,0,u.pop());const l=Object.hasOwnProperty.call(t,"dilations"),c=t.kernelShape.slice(),d=t.strides.slice(),i=l?t.dilations.slice():[],a=t.pads.slice();PoolConvUtil2.adjustPoolAttributes(r,u,c,d,i,a);const n=PoolConvUtil2.computePoolOutputShape(r,u,d,i,c,a,t.autoPad),s=Object.assign({},t);l?Object.assign(s,{kernelShape:c,strides:d,pads:a,dilations:i,cacheKey:t.cacheKey}):Object.assign(s,{kernelShape:c,strides:d,pads:a,cacheKey:t.cacheKey});const p=n.slice();return p.push(p.splice(1,1)[0]),[s,o?p:n]},getUniformAndPadInfo=(e,t)=>{const r=t.format==="NHWC",o=ShapeUtil2.size(e),u=ShapeUtil2.size(t.kernelShape),l=[{type:12,data:o},{type:12,data:u}],c=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){const d=t.kernelShape[t.kernelShape.length-1],i=t.strides[t.strides.length-1],a=t.pads[t.pads.length/2-1],n=t.pads[t.pads.length-1],s=!!(a+n);l.push({type:12,data:d},{type:12,data:i},{type:12,data:a},{type:12,data:n}),c.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let p=!1;if(t.kernelShape.length===2){const f=t.kernelShape[t.kernelShape.length-2],h=t.strides[t.strides.length-2],m=t.pads[t.pads.length/2-2],_=t.pads[t.pads.length-2];p=!!(m+_),l.push({type:12,data:f},{type:12,data:h},{type:12,data:m},{type:12,data:_}),c.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[l,c,!0,s,p]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");const d=ShapeUtil2.computeStrides(t.kernelShape);l.push({type:12,data:d},{type:12,data:t.pads},{type:12,data:t.strides}),c.push({name:"kernelStrides",type:"u32",length:d.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});const i=t.pads.reduce((a,n)=>a+n);return[l,c,!!i,!1,!1]}},generatePoolingCode2=(e,t,r,o,u,l,c,d,i,a,n,s)=>{const p=u.format==="NHWC",f=t.type.value,h=outputVariable("output",t.type.tensor,o);if(u.kernelShape.length<=2){let m="",_="",y="";const g=r-(p?2:1);if(n?m=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${g}] < 0 || xIndices[${g}]
                      >= uniforms.x_shape[${g}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${l}
                }`:m=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${l}
                }`,u.kernelShape.length===2){const v=r-(p?3:2);s?_=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${v}] < 0 || xIndices[${v}] >= uniforms.x_shape[${v}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:_=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sh - uniforms.phStart + j;
                `,y=`
              }
            `}return`
            ${e.registerUniforms(i).declareVariables(t,h)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${h.offsetToIndices("global_idx")};
              var xIndices = ${h.offsetToIndices("global_idx")};

              var value = ${f}(${d});
              var pad = 0;
              ${_}
              ${m}
              ${y}
              ${c}

              output[global_idx] = value;
            }`}else{if(p)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");const m=u.kernelShape.length,_=u.pads.length;let y="";return a?y=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${l}
              }`:y=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${l}
            `,`
            ${e.registerUniforms(i).declareVariables(t,h)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${h.offsetToIndices("global_idx")};
              var xIndices = ${h.offsetToIndices("global_idx")};

              var offsets: array<u32, ${m}>;

              var value = ${f}(${d});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${m-1}u; j++) {
                  offsets[j] = offset / ${getElementAt("uniforms.kernelStrides","j",m)};
                  offset -= offsets[j] * ${getElementAt("uniforms.kernelStrides","j",m)};
                }
                offsets[${m-1}] = offset;

                isPad = false;
                for (var j = ${r-m}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${getElementAt("uniforms.strides",`j - ${r-m}u`,m)}
                    + offsets[j - ${r-m}u] - ${getElementAt("uniforms.pads","j - 2u",_)};
                  ${y}
              }
              ${c}

              output[global_idx] = value;
            }`}},createShaderKeyFromAttributes=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,createAveragePoolShaderKeyFromAttributes=e=>`${createShaderKeyFromAttributes(e)};${e.countIncludePad}`,createMaxPoolShaderKeyFromAttributes=e=>`${createShaderKeyFromAttributes(e)};${e.storageOrder};${e.dilations}`,parsePoolCommonAttributes=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),createAveragePoolProgramInfo2=(e,t,r,o)=>{const[u,l]=getAdjustedPoolAttributesAndOutputShape2(t,o,r),c=inputVariable("x",t.dataType,t.dims.length),d=c.type.value,i="value += x_val;";let a="";u.countIncludePad?a+=`value /= ${d}(uniforms.kernelSize);`:a+=`value /= ${d}(i32(uniforms.kernelSize) - pad);`;const[n,s,p,f,h]=getUniformAndPadInfo(l,u);n.push(...createTensorShapeVariables(t.dims,l));const m=["rank"];return{name:e,shaderCache:{hint:`${o.cacheKey};${p};${f};${h}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:l,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(ShapeUtil2.size(l)/64)},programUniforms:n}),getShaderSource:_=>generatePoolingCode2(_,c,t.dims.length,l.length,u,i,a,0,s,p,f,h)}},parseAveragePoolAttributes2=e=>{const t=e.count_include_pad!==0,r=parsePoolCommonAttributes(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");const o={countIncludePad:t,...r,cacheKey:""};return{...o,cacheKey:createAveragePoolShaderKeyFromAttributes(o)}},averagePool2=(e,t)=>{validateInputs50(e.inputs),e.compute(createAveragePoolProgramInfo2("AveragePool",e.inputs[0],!1,t))},globalPoolAttributes={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},parseGlobalAveragePoolAttributes2=e=>{const t=e.format;return{format:t,...globalPoolAttributes,cacheKey:t}},globalAveragePool2=(e,t)=>{validateInputs50(e.inputs),e.compute(createAveragePoolProgramInfo2("GlobalAveragePool",e.inputs[0],!0,t))},createMaxPoolProgramInfo2=(e,t,r,o)=>{const[u,l]=getAdjustedPoolAttributesAndOutputShape2(t,o,r),c=`
      value = max(x_val, value);
    `,d="",i=inputVariable("x",t.dataType,t.dims.length),a=["rank"],[n,s,p,f,h]=getUniformAndPadInfo(l,u);return n.push(...createTensorShapeVariables(t.dims,l)),{name:e,shaderCache:{hint:`${o.cacheKey};${p};${f};${h}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:l,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(ShapeUtil2.size(l)/64)},programUniforms:n}),getShaderSource:m=>generatePoolingCode2(m,i,t.dims.length,l.length,u,c,d,t.dataType===10?-65504:-1e5,s,p,f,h)}},maxPool2=(e,t)=>{validateInputs50(e.inputs),e.compute(createMaxPoolProgramInfo2("MaxPool",e.inputs[0],!1,t))},parseMaxPoolAttributes2=e=>{const t=e.storage_order,r=e.dilations,o=parsePoolCommonAttributes(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(o.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");const u={storageOrder:t,dilations:r,...o,cacheKey:""};return{...u,cacheKey:createMaxPoolShaderKeyFromAttributes(u)}},parseGlobalMaxPoolAttributes=e=>{const t=e.format;return{format:t,...globalPoolAttributes,cacheKey:t}},globalMaxPool2=(e,t)=>{validateInputs50(e.inputs),e.compute(createMaxPoolProgramInfo2("GlobalMaxPool",e.inputs[0],!0,t))}}}),validateInputs51,createDequantizeLinearProgramInfo,dequantizeLinear,parseDequantizeLinearAttributes,init_quantize_linear=__esm({"web/lib/wasm/jsep/webgpu/ops/quantize-linear.ts"(){init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs51=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,o)=>r===e[2].dims[o]).reduce((r,o)=>r&&o,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((u,l)=>l===t.axis||u===e[0].dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");const r=e[0].dims[t.axis],o=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/o)||t.blockSize>Math.ceil(r/(o-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},createDequantizeLinearProgramInfo=(e,t)=>{const r=ShapeUtil2.normalizeAxis(t.axis,e[0].dims.length),o=e[0].dataType,u=o===3,l=e[0].dims,c=e[1].dataType,d=ShapeUtil2.size(l),i=o===3||o===2,a=i?[Math.ceil(ShapeUtil2.size(e[0].dims)/4)]:e[0].dims,n=e[1].dims,s=e.length>2?e[2]:void 0,p=s?i?[Math.ceil(ShapeUtil2.size(s.dims)/4)]:s.dims:void 0,f=n.length===0||n.length===1&&n[0]===1,h=f===!1&&n.length===1,m=getMaxComponents(d),_=f&&(!i||m===4),y=_?m:1,g=_&&!i?m:1,b=inputVariable("input",i?12:o,a.length,g),v=inputVariable("scale",c,n.length),w=s?inputVariable("zero_point",i?12:o,p.length):void 0,x=outputVariable("output",c,l.length,y),S=[b,v];w&&S.push(w);const T=[a,n];s&&T.push(p);const I=[{type:12,data:d/y},{type:12,data:r},{type:12,data:t.blockSize},...createTensorShapeVariables(...T,l)],P=k=>{const D=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${k.registerUniforms(D).declareVariables(...S,x)}
      ${k.mainStart()}
          ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${x.offsetToIndices("global_idx")};

          // Set input x
          ${i?`
            let input = ${b.getByOffset("global_idx / 4")};
            let x_vec = ${u?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${y===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${b.getByOffset("global_idx")};`};

          // Set scale input
          ${f?`let scale_value= ${v.getByOffset("0")}`:h?`
            let scale_index = ${x.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${v.getByOffset("scale_index")};`:`
            var scale_indices: ${v.type.indices} = output_indices;
            let index = ${v.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${v.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${v.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${w?f?i?`
                let zero_point_input = ${w.getByOffset("0")};
                let zero_point_vec =  ${u?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${w.getByOffset("0")}`:h?i?`
                let zero_point_index = ${x.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${w.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${u?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${x.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${w.getByOffset("zero_point_index")};`:i?`
                let zero_point_offset = ${v.indicesToOffset("scale_indices")};
                let zero_point_input = ${w.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${u?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${w.getByIndices("scale_indices")};`:`let zero_point_value = ${i?u?"i32":"u32":b.type.value}(0);`};
      // Compute and write output
      ${x.setByOffset("global_idx",`${x.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getShaderSource:P,getRunData:()=>({outputs:[{dims:l,dataType:c}],dispatchGroup:{x:Math.ceil(d/y/64),y:1,z:1},programUniforms:I})}},dequantizeLinear=(e,t)=>{validateInputs51(e.inputs,t),e.compute(createDequantizeLinearProgramInfo(e.inputs,t))},parseDequantizeLinearAttributes=e=>createAttributeWithCacheKey2({axis:e.axis,blockSize:e.blockSize})}}),validateInputsContent,createRangeProgramInfo,range,init_range=__esm({"web/lib/wasm/jsep/webgpu/ops/range.ts"(){init_esm(),init_wasm_common(),init_common(),validateInputsContent=(e,t,r)=>{const o=e===t,u=e<t&&r<0,l=e>t&&r>0;if(o||u||l)throw new Error("Range these inputs' contents are invalid.")},createRangeProgramInfo=(e,t,r,o)=>{const u=Math.abs(Math.ceil((t-e)/r)),l=[u],c=u,d=[{type:12,data:c},{type:o,data:e},{type:o,data:r},...createTensorShapeVariables(l)],i=a=>{const n=outputVariable("output",o,l.length),s=n.type.value,p=[{name:"outputSize",type:"u32"},{name:"start",type:s},{name:"delta",type:s}];return`
        ${a.registerUniforms(p).declareVariables(n)}
        ${a.mainStart()}
        ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${s}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${o}`},getShaderSource:i,getRunData:()=>({outputs:[{dims:l,dataType:o}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:d})}},range=e=>{let t=0,r=0,o=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],o=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],o=e.inputs[2].getFloat32Array()[0]),env2.webgpu.validateInputContent&&validateInputsContent(t,r,o),e.compute(createRangeProgramInfo(t,r,o,e.inputs[0].dataType),{inputs:[]})}}}),atomicReductionSnippet,createScatterNDProgramInfo,parseScatterNDAttributes,scatterND,init_scatter_nd=__esm({"web/lib/wasm/jsep/webgpu/ops/scatter-nd.ts"(){init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),atomicReductionSnippet=(e,t,r,o)=>{if(e!=="none"&&o!=="i32"&&o!=="u32"&&o!=="f32")throw new Error(`Input ${o} is not supported with reduction ${e}.`);const u=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,l=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return o==="i32"||o==="u32"?`atomicAdd(&${t}, bitcast<${o}>(${r}));`:`
              ${u}bitcast<${o}>(oldValue) + (${r})${l}`;case"max":return o==="i32"||o==="u32"?`atomicMax(&${t}, bitcast<${o}>(${r}));`:`
                ${u}max(bitcast<f32>(oldValue), (${r}))${l}`;case"min":return o==="i32"||o==="u32"?`atomicMin(&${t}, bitcast<${o}>(${r}));`:`${u}min(bitcast<${o}>(oldValue), (${r}))${l}`;case"mul":return`${u}(bitcast<${o}>(oldValue) * (${r}))${l}`;default:throw new Error(`Reduction ${e} is not supported.`)}},createScatterNDProgramInfo=(e,t)=>{const r=e[0].dims,o=e[1].dims,u=r,l=1,c=Math.ceil(ShapeUtil2.sizeToDimension(o,o.length-1)/l),d=o[o.length-1],i=ShapeUtil2.sizeFromDimension(r,d),a=[{type:12,data:c},{type:12,data:d},{type:12,data:i},...createTensorShapeVariables(e[1].dims,e[2].dims,u)],n=s=>{const p=inputVariable("indices",e[1].dataType,e[1].dims.length),f=inputVariable("updates",e[2].dataType,e[2].dims.length,l),h=t.reduction!=="none"&&t.reduction!==""?atomicOutputVariable("output",e[0].dataType,u.length):outputVariable("output",e[0].dataType,u.length,l);return`
      ${s.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(p,f,h)}
      ${s.mainStart()}
        ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${atomicReductionSnippet(t.reduction,"output[data_offset + i]","value",h.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:a}),getShaderSource:n}},parseScatterNDAttributes=e=>createAttributeWithCacheKey2({reduction:e.reduction}),scatterND=(e,t)=>{e.compute(createScatterNDProgramInfo(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}}),validateScales,updateScales,validateInputs52,getSafeIntegerDivision,getOriginalCoordinateFromResizedCoordinate,getNearestPixelFromOriginal,updateRoI,initOutputShape,adjustOutputShape,calculateOriginalIndicesFromOutputIndices,calculateInputIndicesFromOutputIndices,checkInputIndices,setChannelAndBatchIndices,bilinearInterpolation,bicubicInterpolation,trilinearInterpolation,createResizeProgramInfo,getOpsetVersionFromCustomDataBuffer,resize2,parseResizeAttributes,init_resize=__esm({"web/lib/wasm/jsep/webgpu/ops/resize.ts"(){init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateScales=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},updateScales=(e,t,r)=>{t.every(u=>u>=0&&u<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));const o=new Array(r).fill(1);return t.forEach((u,l)=>o[u]=e[l]),o},validateInputs52=(e,t,r,o,u,l)=>{const[c,d,i]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],a=e[0].dims.length;if(c>0&&e.length>c&&e[c].dims.length>0)e[c].getFloat32Array().forEach(n=>l.push(n));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0){if(e[d].getFloat32Array().forEach(n=>o.push(n)),o.length!==0&&o.length!==a&&r>=18&&o.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");validateScales(o,t),t.axes.length>0&&updateScales(o,t.axes,a).forEach((n,s)=>o[s]=n)}if(i>0&&e.length>i&&e[i].dims.length===1&&e[i].dims[0]>0&&(e[i].getBigInt64Array().forEach(n=>u.push(Number(n))),u.length!==0&&u.length!==a&&r>=18&&u.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(u.length!==0&&u.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof o<"u"&&typeof u<"u"&&o.length>0&&u.length>a)throw new Error("Resize requires only of scales or sizes to be specified")},getSafeIntegerDivision=(e,t,r,o)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${o}(big / (${r}));
  let fract = ${o}(big % (${r})) / ${o}(${r});
  return whole + fract;
`,getOriginalCoordinateFromResizedCoordinate=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${getSafeIntegerDivision("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${getSafeIntegerDivision("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",getNearestPixelFromOriginal=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",updateRoI=(e,t,r)=>{const o=new Array(r).fill(0).concat(new Array(r).fill(1)),u=e.length===0?o:e.slice();return t.length>0?(t.forEach((l,c)=>{o[l]=u[c],o[c+r]=u[t.length+c]}),o):u},initOutputShape=(e,t,r,o)=>{let u=[];if(r.length>0)if(o.length>0){if(e.forEach(l=>u.push(l)),Math.max(...o)>e.length)throw new Error("axes is out of bound");o.forEach((l,c)=>u[l]=r[c])}else r.forEach(l=>u.push(l));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");u=e.map((l,c)=>Math.round(l*t[c]))}return u},adjustOutputShape=(e,t,r)=>{const o=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(l=>t[l]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(l=>t[l]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);const u=e.slice();return r.axes.length>0?(r.axes.forEach(l=>t[l]=o),r.axes.forEach(l=>u[l]=Math.round(e[l]*t[l]))):(t.fill(o,0,t.length),u.forEach((l,c)=>u[c]=Math.round(l*t[c]))),u},calculateOriginalIndicesFromOutputIndices=(e,t,r,o,u)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${getElementAt("uniforms.scales","i",o)};
        var roi_low = ${getElementAt("uniforms.roi","i",u)};
        var roi_hi = ${getElementAt("uniforms.roi",`i + ${t.length}`,u)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${getElementAt("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${getElementAt("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,calculateInputIndicesFromOutputIndices=(e,t,r,o,u,l,c)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${o.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${getElementAt("uniforms.scales","i",u)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${getElementAt("uniforms.roi","i",l)};
          var roi_hi = ${getElementAt("uniforms.roi",`i + ${r.length}`,l)};
          var input_shape_i = ${getElementAt("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${getElementAt("uniforms.output_shape","i",o.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${c} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,checkInputIndices=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${getElementAt("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,setChannelAndBatchIndices=(e,t,r,o)=>e.rank>o?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",bilinearInterpolation=(e,t,r,o,u)=>{const[l,c,d,i]=r.length===2?[-1,0,1,-1]:[0,2,3,1],a=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${a} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",c,`max(0, min(row, ${r[c]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(col, ${r[d]} - 1))`)};
      ${setChannelAndBatchIndices(e,i,l,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${a} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${a} = originalIndices[${c}];
      var col:${a} = originalIndices[${d}];
      ${o?`if (row < 0 || row > (${r[c]} - 1) || col < 0 || col > (${r[d]} - 1)) {
        return ${u};
      }`:""};
      row = max(0, min(row, ${r[c]} - 1));
      col = max(0, min(col, ${r[d]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${i}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var x11: ${a} = getInputValue(batch, channel, row1, col1);
      var x12: ${a} = getInputValue(batch, channel, row1, col2);
      var x21: ${a} = getInputValue(batch, channel, row2, col1);
      var x22: ${a} = getInputValue(batch, channel, row2, col2);
      var dx1: ${a} = abs(row - ${a}(row1));
      var dx2: ${a} = abs(${a}(row2) - row);
      var dy1: ${a} = abs(col - ${a}(col1));
      var dy2: ${a} = abs(${a}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},bicubicInterpolation=(e,t,r,o,u,l,c,d,i,a)=>{const n=r.length===2,[s,p]=n?[0,1]:[2,3],f=e.type.value,h=m=>{const _=m===s?"row":"col";return`
      fn ${_}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${f} {
        var output_index = ${t.indicesGet("output_indices",m)};
        var originalIdx: ${f} = getOriginalCoordinateFromResizedCoordinate(output_index, ${u[m]},
        ${o[m]}, ${r[m]}, ${l[m]}, ${l[m]} + ${r.length});
        var fractOriginalIdx: ${f} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${d} && (originalIdx < 0 || originalIdx > (${r[m]} - 1))) {
          return ${i};
        }
        var data: array<${f}, 4> = array<${f}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${_}: ${f} = originalIdx + ${f}(i);
          if (${_} < 0 || ${_} >= ${r[m]}) {
            ${a?`coefs[i + 1] = 0.0;
                        continue;`:d?`return ${i};`:`${_} = max(0, min(${_}, ${r[m]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",m,`u32(${_})`)};
          data[i + 1] = ${m===s?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${h(s)};
    ${h(p)};
  fn getCubicInterpolationCoefs(s: ${f}) -> array<${f}, 4> {
    var absS = abs(s);
    var coeffs: array<${f}, 4> = array<${f}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${f} = 1.0 - absS;
    var twoMinusAbsS: ${f} = 2.0 - absS;
    var onePlusAbsS: ${f} = 1.0 + absS;
    coeffs[0] = ((${c} * onePlusAbsS - 5 * ${c}) * onePlusAbsS + 8 * ${c}) * onePlusAbsS - 4 * ${c};
    coeffs[1] = ((${c} + 2) * absS - (${c} + 3)) * absS * absS + 1;
    coeffs[2] = ((${c} + 2) * oneMinusAbsS - (${c} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${c} * twoMinusAbsS - 5 * ${c}) * twoMinusAbsS + 8 * ${c}) * twoMinusAbsS - 4 * ${c};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${f}, 4>, coefs: array<${f}, 4>) -> ${f} {
    var coefsSum: ${f} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${f} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},trilinearInterpolation=(e,t,r,o,u)=>{const[l,c,d,i,a]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],n=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${n} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",c,`max(0, min(depth, ${r[c]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(height, ${r[d]} - 1))`)};
      ${e.indicesSet("input_indices",i,`max(0, min(width, ${r[i]} - 1))`)};
      ${setChannelAndBatchIndices(e,a,l,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${n} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${n} = originalIndices[${c}];
      var height:${n} = originalIndices[${d}];
      var width:${n} = originalIndices[${i}];
      ${o?`if (depth < 0 || depth > (${r[c]} - 1) || height < 0 || height > (${r[d]} - 1) || width < 0 || (width > ${r[i]} - 1)) {
      return ${u};
        }`:""};

    depth = max(0, min(depth, ${r[c]} - 1));
      height = max(0, min(height, ${r[d]} - 1));
      width = max(0, min(width, ${r[i]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${a}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${l}])`:"0"};

      var x111: ${n} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${n} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${n} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${n} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${n} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${n} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${n} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${n} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${n} = abs(depth - ${n}(depth1));
      var dx2: ${n} = abs(${n}(depth2) - depth);
      var dy1: ${n} = abs(height - ${n}(height1));
      var dy2: ${n} = abs(${n}(height2) - height);
      var dz1: ${n} = abs(width - ${n}(width1));
      var dz2: ${n} = abs(${n}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},createResizeProgramInfo=(e,t,r,o,u,l)=>{const c=e.dims,d=updateRoI(l,t.axes,c.length);let i=initOutputShape(c,o,u,t.axes),a=o.slice();o.length===0&&(a=c.map((g,b)=>g===0?1:i[b]/g),t.keepAspectRatioPolicy!=="stretch"&&(i=adjustOutputShape(c,a,t)));const n=outputVariable("output",e.dataType,i.length),s=inputVariable("input",e.dataType,c.length),p=ShapeUtil2.size(i),f=c.length===i.length&&c.every((g,b)=>g===i[b]),h=t.coordinateTransformMode==="tf_crop_and_resize",m=t.extrapolationValue,_=s.type.value,y=g=>`
      ${f?"":`
      ${getOriginalCoordinateFromResizedCoordinate(t.coordinateTransformMode,_)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${checkInputIndices(s,c)};
              ${getNearestPixelFromOriginal(t.nearestMode,r,_)};
              ${calculateInputIndicesFromOutputIndices(s,n,c,i,a.length,d.length,h)};
              `;case"linear":return`
              ${calculateOriginalIndicesFromOutputIndices(n,c,i,a.length,d.length)};
              ${(()=>{if(c.length===2||c.length===4)return`${bilinearInterpolation(s,n,c,h,m)}`;if(c.length===3||c.length===5)return`${trilinearInterpolation(s,n,c,h,m)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(c.length===2||c.length===4)return`${bicubicInterpolation(s,n,c,i,a,d,t.cubicCoeffA,h,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${g.registerUniform("output_size","u32").registerUniform("scales","f32",a.length).registerUniform("roi","f32",d.length).declareVariables(s,n)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${f?"output[global_idx] = input[global_idx];":`
        let output_indices = ${n.offsetToIndices("global_idx")};
        var input_indices: ${s.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${s.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${c.length===2||c.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${a.length>0?t.mode==="cubic"?a:a.length:""}|${u.length>0?u:""}|${d.length>0?d:""}|${f}|${t.mode==="nearest"?c.length:c}`,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},{type:1,data:a},{type:1,data:d},...createTensorShapeVariables(c,i)]})}},getOpsetVersionFromCustomDataBuffer=e=>{const t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},resize2=(e,t)=>{const r=[],o=[],u=[],l=getOpsetVersionFromCustomDataBuffer(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");validateInputs52(e.inputs,t,l,r,o,u),e.compute(createResizeProgramInfo(e.inputs[0],t,l,r,o,u),{inputs:[0]})},parseResizeAttributes=e=>{const t=e.antialias,r=e.axes,o=e.coordinateTransformMode,u=e.cubicCoeffA,l=e.excludeOutside!==0,c=e.extrapolationValue,d=e.keepAspectRatioPolicy,i=e.mode,a=e.nearestMode===""?"simple":e.nearestMode;return createAttributeWithCacheKey2({antialias:t,axes:r,coordinateTransformMode:o,cubicCoeffA:u,excludeOutside:l,extrapolationValue:c,keepAspectRatioPolicy:d,mode:i,nearestMode:a})}}}),validateInputs53,createSkipLayerNormProgramInfo,skipLayerNorm,init_skip_layer_norm=__esm({"web/lib/wasm/jsep/webgpu/ops/skip-layer-norm.ts"(){init_wasm_common(),init_util2(),init_common(),validateInputs53=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");const t=e[0],r=e[1],o=e[2];if(t.dataType!==r.dataType||t.dataType!==o.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");const u=t.dims[t.dims.length-1],l=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==u)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==l)throw new Error("Skip must have the same sequence length as input");if(o.dims.length!==1)throw new Error("Gamma must be 1D");if(o.dims[o.dims.length-1]!==u)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){const c=e[3];if(c.dims.length!==1)throw new Error("Beta must be 1D");if(c.dims[c.dims.length-1]!==u)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){const c=e[4];if(c.dims.length!==1)throw new Error("Bias must be 1D");if(c.dims[c.dims.length-1]!==u)throw new Error("Bias must have the same hidden size as input")}},createSkipLayerNormProgramInfo=(e,t,r,o)=>{const u=t.simplified,l=e[0].dims,c=ShapeUtil2.size(l),d=l,i=c,a=l.slice(-1)[0],n=o?l.slice(0,-1).concat(1):[],s=!u&&e.length>3,p=e.length>4,f=o&&r>1,h=o&&r>2,m=r>3,_=64,y=getMaxComponents(a),g=[{type:12,data:i},{type:12,data:y},{type:12,data:a},{type:1,data:t.epsilon}],b=w=>{const x=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],S=[inputVariable("x",e[0].dataType,e[0].dims,y),inputVariable("skip",e[1].dataType,e[1].dims,y),inputVariable("gamma",e[2].dataType,e[2].dims,y)];s&&S.push(inputVariable("beta",e[3].dataType,e[3].dims,y)),p&&S.push(inputVariable("bias",e[4].dataType,e[4].dims,y)),S.push(outputVariable("output",e[0].dataType,d,y)),f&&S.push(outputVariable("mean_output",1,n)),h&&S.push(outputVariable("inv_std_output",1,n)),m&&S.push(outputVariable("input_skip_bias_sum",e[0].dataType,d,y));const T=tensorTypeToWsglStorageType(e[0].dataType),I=tensorTypeToWsglStorageType(1,y);return`

      ${w.registerUniforms(x).declareVariables(...S)}
      var<workgroup> sum_shared : array<${I}, ${_}>;
      var<workgroup> sum_squared_shared : array<${I}, ${_}>;

      ${w.mainStart([_,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${_};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${_};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${_-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${p?"bias[offset1d + i]":T+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${m?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${castToF32(T,y,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${_};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${sumVector("sum",y)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${sumVector("square_sum",y)} / f32(uniforms.hidden_size) ${u?"":"- mean * mean"} + uniforms.epsilon);
        ${f?"mean_output[global_idx] = mean;":""}
        ${h?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${u?"":`- ${T}(mean)`}) *
            ${T}(inv_std_dev) * gamma[offset1d + i]
            ${s?"+ beta[offset1d + i]":""};
        }
      }`},v=[{dims:d,dataType:e[0].dataType}];return r>1&&v.push({dims:n,dataType:1}),r>2&&v.push({dims:n,dataType:1}),r>3&&v.push({dims:l,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${y};${f};${h};${m}`,inputDependencies:e.map((w,x)=>"type")},getShaderSource:b,getRunData:()=>({outputs:v,dispatchGroup:{x:Math.ceil(i/a)},programUniforms:g})}},skipLayerNorm=(e,t)=>{validateInputs53(e.inputs);const o=[0];e.outputCount>1&&o.push(-3),e.outputCount>2&&o.push(-3),e.outputCount>3&&o.push(3),e.compute(createSkipLayerNormProgramInfo(e.inputs,t,e.outputCount,!1),{outputs:o})}}}),validateInputs54,readInput,createSliceAttributesFromInputs,fixStartEndValues,calculateInputIndicesImpl,createSliceProgramInfo2,slice2,parseSliceAttributes2,init_slice2=__esm({"web/lib/wasm/jsep/webgpu/ops/slice.ts"(){init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs54=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,o)=>{if(e[o+1].dataType!==6&&e[o+1].dataType!==7)throw new Error(`Input ${o} must be an array of int32 or int64`)})},readInput=(e,t)=>{const r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(o=>r.push(Number(o)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(o=>r.push(Number(o)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},createSliceAttributesFromInputs=(e,t)=>{if(e.length>1){const r=readInput(e,1),o=readInput(e,2);let u=readInput(e,3);return u.length===0&&(u=[...Array(e[0].dims.length).keys()]),createAttributeWithCacheKey2({starts:r,ends:o,axes:u})}else return t},fixStartEndValues=(e,t,r,o,u)=>{let l=e;return e<0&&(l+=r[o[t]]),u[t]<0?Math.max(0,Math.min(l,r[o[t]]-1)):Math.max(0,Math.min(l,r[o[t]]))},calculateInputIndicesImpl=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${getElementAt("uniforms.input_shape","i",r.length)};
            let steps_i = ${getElementAt("uniforms.steps","i",r.length)};
            let signs_i = ${getElementAt("uniforms.signs","i",r.length)};
            let starts_i = ${getElementAt("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,createSliceProgramInfo2=(e,t)=>{const r=e[0].dims,o=ShapeUtil2.size(r),u=t.axes.length>0?ShapeUtil2.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()];let l=readInput(e,4);l.forEach(y=>y!==0||(()=>{throw new Error("step cannot be 0")})),l.length===0&&(l=Array(u.length).fill(1));const c=t.starts.map((y,g)=>fixStartEndValues(y,g,r,u,l)),d=t.ends.map((y,g)=>fixStartEndValues(y,g,r,u,l));if(u.length!==c.length||u.length!==d.length)throw new Error("start, ends and axes should have the same number of elements");if(u.length!==r.length)for(let y=0;y<r.length;++y)u.includes(y)||(c.splice(y,0,0),d.splice(y,0,r[y]),l.splice(y,0,1));const i=l.map(y=>Math.sign(y));l.forEach((y,g,b)=>{if(y<0){const v=(d[g]-c[g])/y,w=c[g],x=w+v*l[g];c[g]=x,d[g]=w,b[g]=-y}});const a=r.slice(0);u.forEach((y,g)=>{a[y]=Math.ceil((d[y]-c[y])/l[y])});const n={dims:a,dataType:e[0].dataType},s=outputVariable("output",e[0].dataType,a.length),p=inputVariable("input",e[0].dataType,e[0].dims.length),f=ShapeUtil2.size(a),h=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:c.length},{name:"signs",type:"i32",length:i.length},{name:"steps",type:"u32",length:l.length}],m=[{type:12,data:f},{type:12,data:c},{type:6,data:i},{type:12,data:l},...createTensorShapeVariables(e[0].dims,a)],_=y=>`
      ${y.registerUniforms(h).declareVariables(p,s)}
        ${calculateInputIndicesImpl(p,s,r)}
        ${y.mainStart()}
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${s.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${s.setByOffset("global_idx",p.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${i.length}_${c.length}_${l.length}`,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:[n],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:m})}},slice2=(e,t)=>{validateInputs54(e.inputs,t);const r=createSliceAttributesFromInputs(e.inputs,t);e.compute(createSliceProgramInfo2(e.inputs,r),{inputs:[0]})},parseSliceAttributes2=e=>{const t=e.starts,r=e.ends,o=e.axes;return createAttributeWithCacheKey2({starts:t,ends:r,axes:o})}}}),validateInputs55,createSoftmaxProgramInfo,softmax2,parseSoftmaxAttributes2,init_softmax2=__esm({"web/lib/wasm/jsep/webgpu/ops/softmax.ts"(){init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_transpose2(),init_common(),validateInputs55=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},createSoftmaxProgramInfo=(e,t)=>{const r=e.inputs[0],o=r.dims,u=ShapeUtil2.size(o),l=o.length,c=ShapeUtil2.normalizeAxis(t.axis,l),d=c<o.length-1;let i,a=[];d?(a=Array.from({length:l},(S,T)=>T),a[c]=l-1,a[l-1]=c,i=e.compute(createTransposeProgramInfo2(r,a),{inputs:[r],outputs:[-1]})[0]):i=r;const n=i.dims,s=n[l-1],p=u/s,f=getMaxComponents(s),h=s/f;let m=64;p===1&&(m=256);const _=(S,T)=>T===4?`max(max(${S}.x, ${S}.y), max(${S}.z, ${S}.w))`:T===2?`max(${S}.x, ${S}.y)`:T===3?`max(max(${S}.x, ${S}.y), ${S}.z)`:S,y=inputVariable("x",i.dataType,i.dims,f),g=outputVariable("result",i.dataType,i.dims,f),b=y.type.value,v=tensorTypeToWsglStorageType(i.dataType)==="f32"?`var threadMax = ${b}(-3.402823e+38f);`:`var threadMax = ${b}(-65504.0h);`,w=S=>`
      var<workgroup> rowMaxShared : ${b};
      var<workgroup> rowSumShared : ${b};
      var<workgroup> threadShared : array<${b}, ${m}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${b} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${b}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${S.registerUniform("packedCols","i32").declareVariables(y,g)}
      ${S.mainStart(m)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${m};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${v}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${b}(${_("threadShared[0]",f)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${b}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${b}(${sumVector("threadShared[0]",f)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${b}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,x=e.compute({name:"Softmax",shaderCache:{hint:`${f};${m}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:n,dataType:i.dataType}],dispatchGroup:{x:p},programUniforms:[{type:6,data:h}]}),getShaderSource:w},{inputs:[i],outputs:[d?-1:0]})[0];d&&e.compute(createTransposeProgramInfo2(x,a),{inputs:[x]})},softmax2=(e,t)=>{validateInputs55(e.inputs),createSoftmaxProgramInfo(e,t)},parseSoftmaxAttributes2=e=>createAttributeWithCacheKey2({axis:e.axis})}}),getRepeats,validateInputs56,getOutputShape3,createTileProgramInfo2,tile2,init_tile2=__esm({"web/lib/wasm/jsep/webgpu/ops/tile.ts"(){init_wasm_common(),init_util2(),init_common(),getRepeats=e=>Array.from(e.getBigInt64Array(),Number),validateInputs56=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(getRepeats(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},getOutputShape3=(e,t)=>{const r=[];for(let o=0;o<e.length;++o)r.push(e[o]*t[o]);return r},createTileProgramInfo2=(e,t)=>{const r=e[0].dims,o=t??getRepeats(e[1]),u=getOutputShape3(r,o),l=ShapeUtil2.size(u),c=e[0].dataType,d=inputVariable("input",c,r.length),i=outputVariable("output",c,u.length),a=n=>`
      const inputShape = ${d.indices(...r)};
      ${n.registerUniform("output_size","u32").declareVariables(d,i)}
      ${n.mainStart()}
      ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${i.offsetToIndices("global_idx")};
      var input_indices: ${d.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${d.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${i.indicesGet("output_indices","i")}  % input_dim_i;

        ${d.indicesSet("input_indices","i","input_dim_value")}
      }
      ${i.setByOffset("global_idx",d.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${o}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:[{type:12,data:l},...createTensorShapeVariables(e[0].dims,u)]}),getShaderSource:a}},tile2=e=>{validateInputs56(e.inputs),e.compute(createTileProgramInfo2(e.inputs),{inputs:[0]})}}}),createWhereOpProgramShader,createWhereOpProgramInfo,where,init_where=__esm({"web/lib/wasm/jsep/webgpu/ops/where.ts"(){init_wasm_common(),init_util2(),init_common(),createWhereOpProgramShader=(e,t,r,o,u)=>{const l=outputVariable("output_data",u,r.length,4),c=inputVariable("a_data",t[1].dataType,t[1].dims.length,4),d=inputVariable("b_data",t[2].dataType,t[2].dims.length,4),i=inputVariable("c_data",t[0].dataType,t[0].dims.length,4);let a;const n=(s,p,f)=>`select(${p}, ${s}, ${f})`;if(!o)a=l.setByOffset("global_idx",n(c.getByOffset("global_idx"),d.getByOffset("global_idx"),i.getByOffset("global_idx")));else{const s=(p,f,h="")=>{const m=`a_data[index_a${f}][component_a${f}]`,_=`b_data[index_b${f}][component_b${f}]`,y=`bool(c_data[index_c${f}] & (0xffu << (component_c${f} * 8)))`;return`
            let output_indices${f} = ${l.offsetToIndices(`global_idx * 4u + ${f}u`)};
            let offset_a${f} = ${c.broadcastedIndicesToOffset(`output_indices${f}`,l)};
            let offset_b${f} = ${d.broadcastedIndicesToOffset(`output_indices${f}`,l)};
            let offset_c${f} = ${i.broadcastedIndicesToOffset(`output_indices${f}`,l)};
            let index_a${f} = offset_a${f} / 4u;
            let index_b${f} = offset_b${f} / 4u;
            let index_c${f} = offset_c${f} / 4u;
            let component_a${f} = offset_a${f} % 4u;
            let component_b${f} = offset_b${f} % 4u;
            let component_c${f} = offset_c${f} % 4u;
            ${p}[${f}] = ${h}(${n(m,_,y)});
          `};u===9?a=`
            var data = vec4<u32>(0);
            ${s("data",0,"u32")}
            ${s("data",1,"u32")}
            ${s("data",2,"u32")}
            ${s("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:a=`
            ${s("output_data[global_idx]",0)}
            ${s("output_data[global_idx]",1)}
            ${s("output_data[global_idx]",2)}
            ${s("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(i,c,d,l)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${a}
      }`},createWhereOpProgramInfo=e=>{const t=e[1].dims,r=e[2].dims,o=e[0].dims,u=e[1].dataType,l=!(ShapeUtil2.areEqual(t,r)&&ShapeUtil2.areEqual(r,o));let c=t,d=ShapeUtil2.size(t);if(l){const a=BroadcastUtil2.calcShape(BroadcastUtil2.calcShape(t,r,!1),o,!1);if(!a)throw new Error("Can't perform where op on the given tensors");c=a,d=ShapeUtil2.size(c)}const i=Math.ceil(d/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:a=>createWhereOpProgramShader(a,e,c,l,u),getRunData:()=>({outputs:[{dims:c,dataType:u}],dispatchGroup:{x:Math.ceil(d/64/4)},programUniforms:[{type:12,data:i},...createTensorShapeVariables(o,t,r,c)]})}},where=e=>{e.compute(createWhereOpProgramInfo(e.inputs))}}}),WEBGPU_OP_RESOLVE_RULES,init_op_resolve_rules2=__esm({"web/lib/wasm/jsep/webgpu/op-resolve-rules.ts"(){init_argminmax(),init_attention(),init_batch_norm(),init_bias_add(),init_bias_split_gelu(),init_binary_op2(),init_concat2(),init_conv2(),init_conv_transpose2(),init_cumsum(),init_depth_to_space2(),init_einsum(),init_expand(),init_fast_gelu(),init_gather2(),init_gather_nd(),init_gather_block_quantized(),init_gather_elements(),init_gemm2(),init_grid_sample(),init_group_query_attention(),init_instance_norm(),init_layer_norm(),init_matmul2(),init_matmulnbits(),init_multihead_attention(),init_pad2(),init_pool2(),init_quantize_linear(),init_range(),init_scatter_nd(),init_reduce2(),init_resize(),init_rotary_embedding(),init_skip_layer_norm(),init_slice2(),init_softmax2(),init_split2(),init_tile2(),init_transpose2(),init_unary_op2(),init_where(),WEBGPU_OP_RESOLVE_RULES=new Map([["Abs",[abs2]],["Acos",[acos2]],["Acosh",[acosh]],["Add",[add3]],["ArgMax",[argMax,parseArgMinMaxAttributes]],["ArgMin",[argMin,parseArgMinMaxAttributes]],["Asin",[asin2]],["Asinh",[asinh]],["Atan",[atan2]],["Atanh",[atanh]],["Attention",[attention]],["AveragePool",[averagePool2,parseAveragePoolAttributes2]],["BatchNormalization",[batchNorm]],["BiasAdd",[biasAdd]],["BiasSplitGelu",[biasSplitGelu]],["Cast",[cast2,parseCastAttributes2]],["Ceil",[ceil2]],["Clip",[clip2]],["Concat",[concat2,parseConcatAttributes2]],["Conv",[conv2,parseConvAttributes2]],["ConvTranspose",[convTranspose2,parseConvTransposeAttributes2]],["Cos",[cos2]],["Cosh",[cosh]],["CumSum",[cumsum,parseCumSumAttributes]],["DepthToSpace",[depthToSpace2,parseDepthToSpaceAttributes2]],["DequantizeLinear",[dequantizeLinear,parseDequantizeLinearAttributes]],["Div",[div2]],["Einsum",[einsum,parseEinsumAttributes]],["Elu",[elu2,parseAlphaAttributes]],["Equal",[equal2]],["Erf",[erf]],["Exp",[exp2]],["Expand",[expand]],["FastGelu",[fastGelu2]],["Floor",[floor2]],["FusedConv",[conv2,parseConvAttributes2]],["Gather",[gather2,parseGatherAttributes2]],["GatherElements",[gatherElements,parseGatherElementsAttributes]],["GatherBlockQuantized",[gatherBlockQuantized,parseGatherBlockQuantizedAttributes]],["GatherND",[gatherND,parseGatherNDAttributes]],["Gelu",[gelu]],["Gemm",[gemm2,parseGemmAttributes2]],["GlobalAveragePool",[globalAveragePool2,parseGlobalAveragePoolAttributes2]],["GlobalMaxPool",[globalMaxPool2,parseGlobalMaxPoolAttributes]],["Greater",[greater2]],["GreaterOrEqual",[greaterOrEqual]],["GridSample",[gridSample,parseGridSampleAttributes]],["GroupQueryAttention",[groupQueryAttention]],["HardSigmoid",[hardSigmoid,parseHardSigmoidAttributes]],["InstanceNormalization",[instanceNorm]],["LayerNormalization",[layerNorm]],["LeakyRelu",[leakyRelu2,parseAlphaAttributes]],["Less",[less2]],["LessOrEqual",[lessOrEqual]],["Log",[log3]],["MatMul",[matMul2]],["MatMulNBits",[matMulNBits,parseMatMulNBitsAttributes]],["MaxPool",[maxPool2,parseMaxPoolAttributes2]],["Mul",[mul2]],["MultiHeadAttention",[multiHeadAttention,parseMultiHeadAttentionAttributes]],["Neg",[neg2]],["Not",[not3]],["Pad",[pad]],["Pow",[pow2]],["QuickGelu",[quickgelu,parseAlphaAttributes]],["Range",[range]],["Reciprocal",[reciprocal]],["ReduceMin",[reduceMin2]],["ReduceMean",[reduceMean2]],["ReduceMax",[reduceMax2]],["ReduceSum",[reduceSum2]],["ReduceProd",[reduceProd2]],["ReduceL1",[reduceL1]],["ReduceL2",[reduceL2]],["ReduceLogSum",[reduceLogSum2]],["ReduceLogSumExp",[reduceLogSumExp]],["ReduceSumSquare",[reduceSumSquare]],["Relu",[relu2]],["Resize",[resize2,parseResizeAttributes]],["RotaryEmbedding",[rotaryEmbedding]],["ScatterND",[scatterND,parseScatterNDAttributes]],["Sigmoid",[sigmoid2]],["Sin",[sin2]],["Sinh",[sinh]],["Slice",[slice2,parseSliceAttributes2]],["SkipLayerNormalization",[skipLayerNorm]],["Split",[split2,parseSplitAttributes2]],["Sqrt",[sqrt2]],["Softmax",[softmax2,parseSoftmaxAttributes2]],["Sub",[sub2]],["Tan",[tan2]],["Tanh",[tanh2]],["ThresholdedRelu",[thresholdedRelu,parseAlphaAttributes]],["Tile",[tile2]],["Transpose",[transpose2,parseTransposeAttributes2]],["Where",[where]]])}}),ProgramManager2,init_program_manager2=__esm({"web/lib/wasm/jsep/webgpu/program-manager.ts"(){init_esm(),init_log(),init_common(),ProgramManager2=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,o,u){TRACE_FUNC_BEGIN(e.programInfo.name);const l=this.backend.device,c=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);const d=[];for(const a of t)d.push({binding:d.length,resource:{buffer:a.buffer}});for(const a of r)d.push({binding:d.length,resource:{buffer:a.buffer}});u&&d.push({binding:d.length,resource:u});const i=l.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:d,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){const a={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:i,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(a)}c.setPipeline(e.computePipeline),c.setBindGroup(0,i),c.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),TRACE_FUNC_END(e.programInfo.name)}dispose(){}build(e,t){TRACE_FUNC_BEGIN(e.name);const r=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(n=>{r.features.has(n.feature)&&o.push(`enable ${n.extension};`)});const l=createShaderHelper(t,this.backend.device.limits),c=e.getShaderSource(l),d=`${o.join(`
`)}
${l.additionalImplementations}
${c}`,i=r.createShaderModule({code:d,label:e.name});LOG_DEBUG("verbose",()=>`[WebGPU] ${e.name} shader code: ${d}`);const a=r.createComputePipeline({compute:{module:i,entryPoint:"main"},layout:"auto",label:e.name});return TRACE_FUNC_END(e.name),{programInfo:e,computePipeline:a,uniformVariablesInfo:l.variablesInfo}}normalizeDispatchGroupSize(e){const t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,o=typeof e=="number"?1:e.z||1,u=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=u&&r<=u&&o<=u)return[t,r,o];const l=t*r*o;let c=Math.ceil(Math.sqrt(l));if(c>u){if(c=Math.ceil(Math.cbrt(l)),c>u)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[c,c,c]}else return[c,c,1]}}}}),backend_webgpu_exports={};__export(backend_webgpu_exports,{WebGpuBackend:()=>WebGpuBackend});var getProgramInputTensorInfoDependencyKey,getProgramInfoUniqueKey2,AdapterInfoImpl,WebGpuBackend,init_backend_webgpu=__esm({"web/lib/wasm/jsep/backend-webgpu.ts"(){init_esm(),init_wasm_common(),init_log(),init_tensor_view(),init_gpu_data_manager(),init_op_resolve_rules2(),init_program_manager2(),getProgramInputTensorInfoDependencyKey=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);const r=[];for(let o=0;o<e.length;++o){const u=e[o].dataType;switch(t[o]){case"none":{r.push("");break}case"type":{r.push(`${u}`);break}case"rank":{const l=e[o].dims.length;r.push(`${u};${l}`);break}case"dims":{const l=e[o].dims.join(",");r.push(`${u};${l}`);break}default:throw new Error(`unsupported input dependency: ${t[o]}`)}}return r.join("|")},getProgramInfoUniqueKey2=(e,t,r)=>{let o=e.name;return e.shaderCache?.hint&&(o+="["+e.shaderCache.hint+"]"),o+=":"+r+`:${getProgramInputTensorInfoDependencyKey(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,o},AdapterInfoImpl=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},WebGpuBackend=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;const r=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},u=l=>t.features.has(l)&&r.push(l)&&!0;u("chromium-experimental-timestamp-query-inside-passes")||u("timestamp-query"),u("shader-f16"),u("subgroups"),this.device=await t.requestDevice(o),this.adapterInfo=new AdapterInfoImpl(t.info||await t.requestAdapterInfo()),this.gpuDataManager=createGpuDataManager(this),this.programManager=new ProgramManager2(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,configureLogger(e.logLevel,!!e.debug),this.device.onuncapturederror=l=>{l.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${l.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){const e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;TRACE_FUNC_BEGIN(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{const t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let o=0;o<t.length/2;o++){const u=r[o],l=u.kernelId,c=this.kernels.get(l),d=c.kernelType,i=c.kernelName,a=u.programName,n=u.inputTensorViews,s=u.outputTensorViews,p=t[o*2],f=t[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=p);const h=Number(p-this.queryTimeBase),m=Number(f-this.queryTimeBase);if(!Number.isSafeInteger(h)||!Number.isSafeInteger(m))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:n.map(_=>({dims:_.dims,dataType:tensorDataTypeEnumToString(_.dataType)})),outputsMetadata:s.map(_=>({dims:_.dims,dataType:tensorDataTypeEnumToString(_.dataType)})),kernelId:l,kernelType:d,kernelName:i,programName:a,startTime:h,endTime:m});else{let _="";n.forEach((g,b)=>{_+=`input[${b}]: [${g.dims}] | ${tensorDataTypeEnumToString(g.dataType)}, `});let y="";s.forEach((g,b)=>{y+=`output[${b}]: [${g.dims}] | ${tensorDataTypeEnumToString(g.dataType)}, `}),console.log(`[profiling] kernel "${l}|${d}|${i}|${a}" ${_}${y}start time: ${h} ns, execution time: ${m-h} ns`)}TRACE("GPU",`${a}::${p}::${f}`)}e.unmap(),this.pendingQueries.delete(e)}),TRACE_FUNC_END()}run(e,t,r,o,u,l){TRACE_FUNC_BEGIN(e.name);const c=[];for(let g=0;g<t.length;++g){const b=t[g].data;if(b===0)continue;const v=this.gpuDataManager.get(b);if(!v)throw new Error(`no GPU data for input: ${b}`);c.push(v)}const{outputs:d,dispatchGroup:i,programUniforms:a}=e.getRunData(t),n=r.length===0?d.map((g,b)=>b):r;if(n.length!==d.length)throw new Error(`Output size ${n.length} must be equal to ${d.length}.`);const s=[],p=[];for(let g=0;g<d.length;++g){if(!Number.isInteger(n[g])||n[g]<-3||n[g]>=l)throw new Error(`Invalid output index: ${n[g]}`);if(n[g]===-3)continue;const b=n[g]===-1,v=n[g]===-2,w=b||v?u(d[g].dataType,d[g].dims):o(n[g],d[g].dataType,d[g].dims);if(s.push(w),w.data===0)continue;const x=this.gpuDataManager.get(w.data);if(!x)throw new Error(`no GPU data for output: ${w.data}`);if(b&&this.temporaryData.push(x),v){let S=this.kernelPersistentData.get(this.currentKernelId);S||(S=[],this.kernelPersistentData.set(this.currentKernelId,S)),S.push(x)}p.push(x)}if(c.length!==t.length||p.length!==s.length){if(p.length===0)return TRACE_FUNC_END(e.name),s;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let f;if(a){let g=0;const b=[];a.forEach(S=>{const T=typeof S.data=="number"?[S.data]:S.data;if(T.length===0)return;const I=S.type===10?2:4;let P,k;S.type===10?(k=T.length>4?16:T.length>2?8:T.length*I,P=T.length>4?16:I*T.length):(k=T.length<=2?T.length*I:16,P=16),g=Math.ceil(g/k)*k,b.push(g);const D=S.type===10?8:4;g+=T.length>4?Math.ceil(T.length/D)*P:T.length*I});const v=16;g=Math.ceil(g/v)*v;const w=new ArrayBuffer(g);a.forEach((S,T)=>{const I=b[T],P=typeof S.data=="number"?[S.data]:S.data;if(S.type===6)new Int32Array(w,I,P.length).set(P);else if(S.type===12)new Uint32Array(w,I,P.length).set(P);else if(S.type===10)new Uint16Array(w,I,P.length).set(P);else if(S.type===1)new Float32Array(w,I,P.length).set(P);else throw new Error(`Unsupported uniform type: ${tensorDataTypeEnumToString(S.type)}`)});const x=this.gpuDataManager.create(g,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(x.buffer,0,w,0,g),this.gpuDataManager.release(x.id),f={offset:0,size:g,buffer:x.buffer}}const h=this.programManager.normalizeDispatchGroupSize(i),m=h[1]===1&&h[2]===1,_=getProgramInfoUniqueKey2(e,t,m);let y=this.programManager.getArtifact(_);if(y||(y=this.programManager.build(e,h),this.programManager.setArtifact(_,y),LOG_DEBUG("info",()=>`[artifact] key: ${_}, programName: ${e.name}`)),a&&y.uniformVariablesInfo){if(a.length!==y.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${y.uniformVariablesInfo.length}, got ${a.length} in program "${y.programInfo.name}".`);for(let g=0;g<a.length;g++){const b=a[g],v=b.type,w=typeof b.data=="number"?1:b.data.length,[x,S]=y.uniformVariablesInfo[g];if(v!==x||w!==S)throw new Error(`Uniform variable ${g} mismatch: expect type ${x} with size ${S}, got type ${v} with size ${w} in program "${y.programInfo.name}".`)}}if(LOG_DEBUG("info",()=>`[ProgramManager] run "${e.name}" (key=${_}) with ${h[0]}x${h[1]}x${h[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){const g={kernelId:this.currentKernelId,programName:y.programInfo.name,inputTensorViews:t,outputTensorViews:s};this.pendingKernels.push(g),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(g)}return this.programManager.run(y,c,p,h,f),TRACE_FUNC_END(e.name),s}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,o){const u=WEBGPU_OP_RESOLVE_RULES.get(e);if(!u)throw new Error(`kernel not implemented: ${e}`);const l={kernelType:e,kernelName:o,kernelEntry:u[0],attributes:[u[1],r]};this.kernels.set(t,l)}releaseKernel(e){const t=this.kernelPersistentData.get(e);if(t){for(const r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){const o=this.kernels.get(e);if(!o)throw new Error(`kernel not created: ${e}`);const u=o.kernelType,l=o.kernelName,c=o.kernelEntry,d=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${u}] ${l}" is not allowed to be called recursively`);this.currentKernelId=e,d[0]&&(d[1]=d[0](d[1]),d[0]=void 0),LOG_DEBUG("info",()=>`[WebGPU] Start to run kernel "[${u}] ${l}"...`);const i=this.env.debug;this.temporaryData=[];try{return i&&this.device.pushErrorScope("validation"),c(t,d[1]),0}catch(a){return r.push(Promise.resolve(`[WebGPU] Kernel "[${u}] ${l}" failed. ${a}`)),1}finally{i&&r.push(this.device.popErrorScope().then(a=>a?`GPU validation error for kernel "[${u}] ${l}": ${a.message}`:null));for(const a of this.temporaryData)this.gpuDataManager.release(a.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,o){let u=this.sessionExternalDataMapping.get(e);u||(u=new Map,this.sessionExternalDataMapping.set(e,u));const l=u.get(t),c=this.gpuDataManager.registerExternalBuffer(r,o,l);return u.set(t,[c,r]),c}unregisterBuffers(e){const t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){const t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{const o=await downloadGpuData(this,e,t);return createView2(o.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){LOG_DEBUG("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){LOG_DEBUG("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){LOG_DEBUG("info","replay"),this.sessionStatus="replaying";const e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let o=0;o<r;o++){const u=this.getComputePassEncoder(),l=e[o];this.writeTimestamp(this.pendingDispatchNumber*2),u.setPipeline(l.computePipeline),u.setBindGroup(0,l.bindGroup),u.dispatchWorkgroups(...l.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}}),init_exports={};__export(init_exports,{init:()=>init});var TensorViewImpl,ComputeContextImpl,init,init_init=__esm({"web/lib/wasm/jsep/init.ts"(){init_wasm_common(),init_log(),init_util2(),init_backend_webnn(),TensorViewImpl=class Be{constructor(t,r,o,u){this.module=t,this.dataType=r,this.data=o,this.dims=u}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");const t=ShapeUtil2.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");const t=ShapeUtil2.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");const t=ShapeUtil2.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");const t=ShapeUtil2.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(ShapeUtil2.size(t)!==ShapeUtil2.size(this.dims))throw new Error("Invalid new shape");return new Be(this.module,this.dataType,this.data,t)}},ComputeContextImpl=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;const o=e.PTR_SIZE;let u=r/e.PTR_SIZE;const l=o===4?"i32":"i64";this.opKernelContext=Number(e.getValue(o*u++,l));const c=Number(e.getValue(o*u++,l));this.outputCount=Number(e.getValue(o*u++,l)),this.customDataOffset=Number(e.getValue(o*u++,"*")),this.customDataSize=Number(e.getValue(o*u++,l));const d=[];for(let i=0;i<c;i++){const a=Number(e.getValue(o*u++,l)),n=Number(e.getValue(o*u++,"*")),s=Number(e.getValue(o*u++,l)),p=[];for(let f=0;f<s;f++)p.push(Number(e.getValue(o*u++,l)));d.push(new TensorViewImpl(e,a,n,p))}this.inputs=d}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){const r=t?.inputs?.map(c=>typeof c=="number"?this.inputs[c]:c)??this.inputs,o=t?.outputs??[],u=(c,d,i)=>new TensorViewImpl(this.module,d,this.output(c,i),i),l=(c,d)=>{const i=calculateTensorSizeInBytes(c,d);if(!i)throw new Error(`Unsupported data type: ${c}`);const a=i>0?this.backend.gpuDataManager.create(i).id:0;return new TensorViewImpl(this.module,c,a,d)};return this.backend.run(e,r,o,u,l,this.outputCount)}output(e,t){const r=this.module.stackSave();try{const o=this.module.PTR_SIZE,u=o===4?"i32":"i64",l=this.module.stackAlloc((1+t.length)*o);this.module.setValue(l,t.length,u);for(let c=0;c<t.length;c++)this.module.setValue(l+o*(c+1),t[c],u);return this.module._JsepOutput(this.opKernelContext,e,l)}catch(o){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(r)}}},init=async(e,t,r,o)=>{const u=t.jsepInit;if(!u)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){const l=(init_backend_webgpu(),__toCommonJS(backend_webgpu_exports)).WebGpuBackend,c=new l;await c.initialize(r,o),u("webgpu",[c,d=>c.alloc(Number(d)),d=>c.free(d),(d,i,a,n=!1)=>{if(n)LOG_DEBUG("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(d)}, dst=${Number(i)}, size=${Number(a)}`),c.memcpy(Number(d),Number(i));else{LOG_DEBUG("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(d)}, gpuDataId=${Number(i)}, size=${Number(a)}`);const s=t.HEAPU8.subarray(Number(d>>>0),Number(d>>>0)+Number(a));c.upload(Number(i),s)}},async(d,i,a)=>{LOG_DEBUG("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${d}, dataOffset=${i}, size=${a}`),await c.download(Number(d),()=>t.HEAPU8.subarray(Number(i)>>>0,Number(i+a)>>>0))},(d,i,a)=>c.createKernel(d,Number(i),a,t.UTF8ToString(t._JsepGetNodeName(Number(i)))),d=>c.releaseKernel(d),(d,i,a,n)=>{LOG_DEBUG("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${a}, kernel=${d}, contextDataOffset=${i}`);const s=new ComputeContextImpl(t,c,Number(i));return c.computeKernel(Number(d),s,n)},()=>c.captureBegin(),()=>c.captureEnd(),()=>c.replay()])}else{const l=new WebNNBackend(r);u("webnn",[l,()=>l.reserveTensorId(),c=>l.releaseTensorId(c),async(c,d,i,a,n)=>l.ensureTensor(c,d,i,a,n),(c,d)=>{l.uploadTensor(c,d)},async(c,d)=>l.downloadTensor(c,d),(c,d)=>l.registerMLContext(c,d),!!r.trace])}}}}),initOrt,initRuntime,initEp,activeSessions,getSessionInputOutputCount,getSessionInputOutputMetadata,copyFromExternalBuffer,createSession,releaseSession,prepareInputOutputTensor,run,endProfiling,extractTransferableBuffers,init_wasm_core_impl=__esm({"web/lib/wasm/wasm-core-impl.ts"(){init_esm(),init_run_options(),init_session_options(),init_wasm_common(),init_wasm_factory(),init_wasm_utils(),init_wasm_utils_load_file(),initOrt=(e,t)=>{getInstance()._OrtInit(e,t)!==0&&checkLastError("Can't initialize onnxruntime.")},initRuntime=async e=>{initOrt(e.wasm.numThreads,logLevelStringToEnum(e.logLevel))},initEp=async(e,t)=>{getInstance().asyncInit?.();let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{const o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);const u=e.webgpu.forceFallbackAdapter;if(u!==void 0&&typeof u!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${u}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:u}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{const o=(init_init(),__toCommonJS(init_exports)).init;t==="webgpu"&&await o("webgpu",getInstance(),e,r),t==="webnn"&&await o("webnn",getInstance(),e)}},activeSessions=new Map,getSessionInputOutputCount=e=>{const t=getInstance(),r=t.stackSave();try{const o=t.PTR_SIZE,u=t.stackAlloc(2*o);t._OrtGetInputOutputCount(e,u,u+o)!==0&&checkLastError("Can't get session input/output count.");const c=o===4?"i32":"i64";return[Number(t.getValue(u,c)),Number(t.getValue(u+o,c))]}finally{t.stackRestore(r)}},getSessionInputOutputMetadata=(e,t)=>{const r=getInstance(),o=r.stackSave();let u=0;try{const l=r.PTR_SIZE,c=r.stackAlloc(2*l);r._OrtGetInputOutputMetadata(e,t,c,c+l)!==0&&checkLastError("Can't get session input/output metadata.");const i=Number(r.getValue(c,"*"));u=Number(r.getValue(c+l,"*"));const a=r.HEAP32[u/4];if(a===0)return[i,0];const n=r.HEAPU32[u/4+1],s=[];for(let p=0;p<n;p++){const f=Number(r.getValue(u+8+p*l,"*"));s.push(f!==0?r.UTF8ToString(f):Number(r.getValue(u+8+(p+n)*l,"*")))}return[i,a,s]}finally{r.stackRestore(o),u!==0&&r._OrtFree(u)}},copyFromExternalBuffer=e=>{const t=getInstance(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},createSession=async(e,t)=>{let r,o;const u=getInstance();Array.isArray(e)?[r,o]=e:e.buffer===u.HEAPU8.buffer?[r,o]=[e.byteOffset,e.byteLength]:[r,o]=copyFromExternalBuffer(e);let l=0,c=0,d=0,i=[];const a=[],n=[];try{if([c,i]=await setSessionOptions(t),t?.externalData&&u.mountExternalData){const v=[];for(const w of t.externalData){const x=typeof w=="string"?w:w.path;v.push(loadFile(typeof w=="string"?w:w.data).then(S=>{u.mountExternalData(x,S)}))}await Promise.all(v)}for(const v of t?.executionProviders??[])if((typeof v=="string"?v:v.name)==="webnn"){if(u.shouldTransferToMLTensor=!1,typeof v!="string"){const x=v,S=x?.context,T=x?.gpuDevice,I=x?.deviceType,P=x?.powerPreference;S?u.currentContext=S:T?u.currentContext=await u.webnnCreateMLContext(T):u.currentContext=await u.webnnCreateMLContext({deviceType:I,powerPreference:P})}else u.currentContext=await u.webnnCreateMLContext();break}l=await u._OrtCreateSession(r,o,c),u.webgpuOnCreateSession?.(l),l===0&&checkLastError("Can't create a session."),u.jsepOnCreateSession?.(),u.currentContext&&(u.webnnRegisterMLContext(l,u.currentContext),u.currentContext=void 0,u.shouldTransferToMLTensor=!0);const[s,p]=getSessionInputOutputCount(l),f=!!t?.enableGraphCapture,h=[],m=[],_=[],y=[],g=[];for(let v=0;v<s;v++){const[w,x,S]=getSessionInputOutputMetadata(l,v);w===0&&checkLastError("Can't get an input name."),a.push(w);const T=u.UTF8ToString(w);h.push(T),_.push(x===0?{name:T,isTensor:!1}:{name:T,isTensor:!0,type:tensorDataTypeEnumToString(x),shape:S})}for(let v=0;v<p;v++){const[w,x,S]=getSessionInputOutputMetadata(l,v+s);w===0&&checkLastError("Can't get an output name."),n.push(w);const T=u.UTF8ToString(w);m.push(T),y.push(x===0?{name:T,isTensor:!1}:{name:T,isTensor:!0,type:tensorDataTypeEnumToString(x),shape:S});{if(f&&t?.preferredOutputLocation===void 0){g.push("gpu-buffer");continue}const I=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[T]??"cpu",P=u.webnnIsGraphOutput;if(I==="cpu"&&P&&P(l,T)){g.push("ml-tensor-cpu-output");continue}if(I!=="cpu"&&I!=="cpu-pinned"&&I!=="gpu-buffer"&&I!=="ml-tensor")throw new Error(`Not supported preferred output location: ${I}.`);if(f&&I!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${I}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);g.push(I)}}let b=null;return g.some(v=>v==="gpu-buffer"||v==="ml-tensor"||v==="ml-tensor-cpu-output")&&(d=u._OrtCreateBinding(l),d===0&&checkLastError("Can't create IO binding."),b={handle:d,outputPreferredLocations:g,outputPreferredLocationsEncoded:g.map(v=>v==="ml-tensor-cpu-output"?"ml-tensor":v).map(v=>dataLocationStringToEnum(v))}),activeSessions.set(l,[l,a,n,b,f,!1]),[l,h,m,_,y]}catch(s){throw a.forEach(p=>u._OrtFree(p)),n.forEach(p=>u._OrtFree(p)),d!==0&&u._OrtReleaseBinding(d)!==0&&checkLastError("Can't release IO binding."),l!==0&&u._OrtReleaseSession(l)!==0&&checkLastError("Can't release session."),s}finally{u._free(r),c!==0&&u._OrtReleaseSessionOptions(c)!==0&&checkLastError("Can't release session options."),i.forEach(s=>u._free(s)),u.unmountExternalData?.()}},releaseSession=e=>{const t=getInstance(),r=activeSessions.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);const[o,u,l,c,d]=r;c&&(d&&t._OrtClearBoundOutputs(c.handle)!==0&&checkLastError("Can't clear bound outputs."),t._OrtReleaseBinding(c.handle)!==0&&checkLastError("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),u.forEach(i=>t._OrtFree(i)),l.forEach(i=>t._OrtFree(i)),t._OrtReleaseSession(o)!==0&&checkLastError("Can't release session."),activeSessions.delete(e)},prepareInputOutputTensor=async(e,t,r,o,u,l,c=!1)=>{if(!e){t.push(0);return}const d=getInstance(),i=d.PTR_SIZE,a=e[0],n=e[1],s=e[3];let p=s,f,h;if(a==="string"&&(s==="gpu-buffer"||s==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(c&&s!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${l} when enableGraphCapture is true.`);if(s==="gpu-buffer"){const y=e[2].gpuBuffer;h=calculateTensorSizeInBytes(tensorDataTypeStringToEnum(a),n);{const g=d.jsepRegisterBuffer;if(!g)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');f=g(o,l,y,h)}}else if(s==="ml-tensor"){const y=e[2].mlTensor;h=calculateTensorSizeInBytes(tensorDataTypeStringToEnum(a),n);const g=d.webnnRegisterMLTensor;if(!g)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');f=g(o,y,tensorDataTypeStringToEnum(a),n)}else{const y=e[2];if(Array.isArray(y)){h=i*y.length,f=d._malloc(h),r.push(f);for(let g=0;g<y.length;g++){if(typeof y[g]!="string")throw new TypeError(`tensor data at index ${g} is not a string`);d.setValue(f+g*i,allocWasmString(y[g],r),"*")}}else{const g=d.webnnIsGraphInput,b=d.webnnIsGraphOutput;if(a!=="string"&&g&&b){const v=d.UTF8ToString(u);if(g(o,v)||b(o,v)){const w=tensorDataTypeStringToEnum(a);h=calculateTensorSizeInBytes(w,n),p="ml-tensor";const x=d.webnnCreateTemporaryTensor,S=d.webnnUploadTensor;if(!x||!S)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');const T=await x(o,w,n);S(T,new Uint8Array(y.buffer,y.byteOffset,y.byteLength)),f=T}else h=y.byteLength,f=d._malloc(h),r.push(f),d.HEAPU8.set(new Uint8Array(y.buffer,y.byteOffset,h),f)}else h=y.byteLength,f=d._malloc(h),r.push(f),d.HEAPU8.set(new Uint8Array(y.buffer,y.byteOffset,h),f)}}const m=d.stackSave(),_=d.stackAlloc(4*n.length);try{n.forEach((g,b)=>d.setValue(_+b*i,g,i===4?"i32":"i64"));const y=d._OrtCreateTensor(tensorDataTypeStringToEnum(a),f,h,_,n.length,dataLocationStringToEnum(p));y===0&&checkLastError(`Can't create tensor for input/output. session=${o}, index=${l}.`),t.push(y)}finally{d.stackRestore(m)}},run=async(e,t,r,o,u,l)=>{const c=getInstance(),d=c.PTR_SIZE,i=activeSessions.get(e);if(!i)throw new Error(`cannot run inference. invalid session id: ${e}`);const a=i[0],n=i[1],s=i[2],p=i[3],f=i[4],h=i[5],m=t.length,_=o.length;let y=0,g=[];const b=[],v=[],w=[],x=c.stackSave(),S=c.stackAlloc(m*d),T=c.stackAlloc(m*d),I=c.stackAlloc(_*d),P=c.stackAlloc(_*d);try{[y,g]=setRunOptions(l),TRACE_EVENT_BEGIN("wasm prepareInputOutputTensor");for(let E=0;E<m;E++)await prepareInputOutputTensor(r[E],b,w,e,n[t[E]],t[E],f);for(let E=0;E<_;E++)await prepareInputOutputTensor(u[E],v,w,e,s[o[E]],m+o[E],f);TRACE_EVENT_END("wasm prepareInputOutputTensor");for(let E=0;E<m;E++)c.setValue(S+E*d,b[E],"*"),c.setValue(T+E*d,n[t[E]],"*");for(let E=0;E<_;E++)c.setValue(I+E*d,v[E],"*"),c.setValue(P+E*d,s[o[E]],"*");if(p&&!h){const{handle:E,outputPreferredLocations:B,outputPreferredLocationsEncoded:N}=p;if(n.length!==m)throw new Error(`input count from feeds (${m}) is expected to be always equal to model's input count (${n.length}).`);TRACE_EVENT_BEGIN("wasm bindInputsOutputs");for(let O=0;O<m;O++){const M=t[O];await c._OrtBindInput(E,n[M],b[O])!==0&&checkLastError(`Can't bind input[${O}] for session=${e}.`)}for(let O=0;O<_;O++){const M=o[O];u[O]?.[3]?c._OrtBindOutput(E,s[M],v[O],0)!==0&&checkLastError(`Can't bind pre-allocated output[${O}] for session=${e}.`):c._OrtBindOutput(E,s[M],0,N[M])!==0&&checkLastError(`Can't bind output[${O}] to ${B[O]} for session=${e}.`)}TRACE_EVENT_END("wasm bindInputsOutputs"),activeSessions.set(e,[a,n,s,p,f,!0])}c.jsepOnRunStart?.(a),c.webnnOnRunStart?.(a);let k;p?k=await c._OrtRunWithBinding(a,p.handle,_,I,y):k=await c._OrtRun(a,T,S,m,P,_,I,y),k!==0&&checkLastError("failed to call OrtRun().");const D=[],z=[];TRACE_EVENT_BEGIN("wasm ProcessOutputTensor");for(let E=0;E<_;E++){const B=Number(c.getValue(I+E*d,"*"));if(B===v[E]){D.push(u[E]);continue}const N=c.stackSave(),O=c.stackAlloc(4*d);let M=!1,A,L=0;try{c._OrtGetTensorData(B,O,O+d,O+2*d,O+3*d)!==0&&checkLastError(`Can't access output tensor data on index ${E}.`);const U=d===4?"i32":"i64",R=Number(c.getValue(O,U));L=c.getValue(O+d,"*");const $=c.getValue(O+d*2,"*"),C=Number(c.getValue(O+d*3,U)),V=[];for(let G=0;G<C;G++)V.push(Number(c.getValue($+G*d,U)));c._OrtFree($)!==0&&checkLastError("Can't free memory for tensor dims.");const W=V.reduce((G,F)=>G*F,1);A=tensorDataTypeEnumToString(R);const X=p?.outputPreferredLocations[o[E]];if(A==="string"){if(X==="gpu-buffer"||X==="ml-tensor")throw new Error("String tensor is not supported on GPU.");const G=[];for(let F=0;F<W;F++){const Z=c.getValue(L+F*d,"*"),xe=c.getValue(L+(F+1)*d,"*"),Ve=F===W-1?void 0:xe-Z;G.push(c.UTF8ToString(Z,Ve))}D.push([A,V,G,"cpu"])}else if(X==="gpu-buffer"&&W>0){const G=c.jsepGetBuffer;if(!G)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');const F=G(L),Z=calculateTensorSizeInBytes(R,W);if(Z===void 0||!isGpuBufferSupportedType(A))throw new Error(`Unsupported data type: ${A}`);M=!0,D.push([A,V,{gpuBuffer:F,download:c.jsepCreateDownloader(F,Z,A),dispose:()=>{c._OrtReleaseTensor(B)!==0&&checkLastError("Can't release tensor.")}},"gpu-buffer"])}else if(X==="ml-tensor"&&W>0){const G=c.webnnEnsureTensor,F=c.webnnIsGraphInputOutputTypeSupported;if(!G||!F)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(calculateTensorSizeInBytes(R,W)===void 0||!isMLTensorSupportedType(A))throw new Error(`Unsupported data type: ${A}`);if(!F(e,A,!1))throw new Error(`preferredLocation "ml-tensor" for ${A} output is not supported by current WebNN Context.`);const xe=await G(e,L,R,V,!1);M=!0,D.push([A,V,{mlTensor:xe,download:c.webnnCreateMLTensorDownloader(L,A),dispose:()=>{c.webnnReleaseTensorId(L),c._OrtReleaseTensor(B)}},"ml-tensor"])}else if(X==="ml-tensor-cpu-output"&&W>0){const G=c.webnnCreateMLTensorDownloader(L,A)(),F=D.length;M=!0,z.push((async()=>{const Z=[F,await G];return c.webnnReleaseTensorId(L),c._OrtReleaseTensor(B),Z})()),D.push([A,V,[],"cpu"])}else{const G=tensorTypeToTypedArrayConstructor(A),F=new G(W);new Uint8Array(F.buffer,F.byteOffset,F.byteLength).set(c.HEAPU8.subarray(L,L+F.byteLength)),D.push([A,V,F,"cpu"])}}finally{c.stackRestore(N),A==="string"&&L&&c._free(L),M||c._OrtReleaseTensor(B)}}p&&!f&&(c._OrtClearBoundOutputs(p.handle)!==0&&checkLastError("Can't clear bound outputs."),activeSessions.set(e,[a,n,s,p,f,!1]));for(const[E,B]of await Promise.all(z))D[E][2]=B;return TRACE_EVENT_END("wasm ProcessOutputTensor"),D}finally{c.webnnOnRunEnd?.(a),c.stackRestore(x),b.forEach(k=>c._OrtReleaseTensor(k)),v.forEach(k=>c._OrtReleaseTensor(k)),w.forEach(k=>c._free(k)),y!==0&&c._OrtReleaseRunOptions(y),g.forEach(k=>c._free(k))}},endProfiling=e=>{const t=getInstance(),r=activeSessions.get(e);if(!r)throw new Error("invalid session id");const o=r[0],u=t._OrtEndProfiling(o);u===0&&checkLastError("Can't get an profile file name."),t._OrtFree(u)},extractTransferableBuffers=e=>{const t=[];for(const r of e){const o=r[2];!Array.isArray(o)&&"buffer"in o&&t.push(o.buffer)}return t}}}),isProxy,proxyWorker,initializing2,initialized2,aborted2,temporaryObjectUrl,initWasmCallbacks,queuedCallbacks,enqueueCallbacks,ensureWorker,onProxyWorkerMessage,initializeWebAssemblyAndOrtRuntime,initializeOrtEp,copyFromExternalBuffer2,createSession2,releaseSession2,run2,endProfiling2,init_proxy_wrapper=__esm({"web/lib/wasm/proxy-wrapper.ts"(){init_esm(),init_wasm_core_impl(),init_wasm_factory(),init_wasm_utils_import(),isProxy=()=>!!env2.wasm.proxy&&typeof document<"u",initializing2=!1,initialized2=!1,aborted2=!1,queuedCallbacks=new Map,enqueueCallbacks=(e,t)=>{const r=queuedCallbacks.get(e);r?r.push(t):queuedCallbacks.set(e,[t])},ensureWorker=()=>{if(initializing2||!initialized2||aborted2||!proxyWorker)throw new Error("worker not ready")},onProxyWorkerMessage=e=>{switch(e.data.type){case"init-wasm":initializing2=!1,e.data.err?(aborted2=!0,initWasmCallbacks[1](e.data.err)):(initialized2=!0,initWasmCallbacks[0]()),temporaryObjectUrl&&(URL.revokeObjectURL(temporaryObjectUrl),temporaryObjectUrl=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{const t=queuedCallbacks.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},initializeWebAssemblyAndOrtRuntime=async()=>{if(!initialized2){if(initializing2)throw new Error("multiple calls to 'initWasm()' detected.");if(aborted2)throw new Error("previous call to 'initWasm()' failed.");if(initializing2=!0,isProxy())return new Promise((e,t)=>{proxyWorker?.terminate(),importProxyWorker().then(([r,o])=>{try{proxyWorker=o,proxyWorker.onerror=l=>t(l),proxyWorker.onmessage=onProxyWorkerMessage,initWasmCallbacks=[e,t];const u={type:"init-wasm",in:env2};if(!u.in.wasm.wasmPaths&&r){const l=inferWasmPathPrefixFromScriptSrc();l&&(u.in.wasm.wasmPaths=l)}proxyWorker.postMessage(u),temporaryObjectUrl=r}catch(u){t(u)}},t)});try{await initializeWebAssembly(env2.wasm),await initRuntime(env2),initialized2=!0}catch(e){throw aborted2=!0,e}finally{initializing2=!1}}},initializeOrtEp=async e=>{if(isProxy())return ensureWorker(),new Promise((t,r)=>{enqueueCallbacks("init-ep",[t,r]);const o={type:"init-ep",in:{epName:e,env:env2}};proxyWorker.postMessage(o)});await initEp(env2,e)},copyFromExternalBuffer2=async e=>isProxy()?(ensureWorker(),new Promise((t,r)=>{enqueueCallbacks("copy-from",[t,r]);const o={type:"copy-from",in:{buffer:e}};proxyWorker.postMessage(o,[e.buffer])})):copyFromExternalBuffer(e),createSession2=async(e,t)=>{if(isProxy()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return ensureWorker(),new Promise((r,o)=>{enqueueCallbacks("create",[r,o]);const u={type:"create",in:{model:e,options:{...t}}},l=[];e instanceof Uint8Array&&l.push(e.buffer),proxyWorker.postMessage(u,l)})}else return createSession(e,t)},releaseSession2=async e=>{if(isProxy())return ensureWorker(),new Promise((t,r)=>{enqueueCallbacks("release",[t,r]);const o={type:"release",in:e};proxyWorker.postMessage(o)});releaseSession(e)},run2=async(e,t,r,o,u,l)=>{if(isProxy()){if(r.some(c=>c[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(u.some(c=>c))throw new Error("pre-allocated output tensor is not supported for proxy.");return ensureWorker(),new Promise((c,d)=>{enqueueCallbacks("run",[c,d]);const i=r,a={type:"run",in:{sessionId:e,inputIndices:t,inputs:i,outputIndices:o,options:l}};proxyWorker.postMessage(a,extractTransferableBuffers(i))})}else return run(e,t,r,o,u,l)},endProfiling2=async e=>{if(isProxy())return ensureWorker(),new Promise((t,r)=>{enqueueCallbacks("end-profiling",[t,r]);const o={type:"end-profiling",in:e};proxyWorker.postMessage(o)});endProfiling(e)}}}),encodeTensorMetadata,decodeTensorMetadata,OnnxruntimeWebAssemblySessionHandler,init_session_handler_inference2=__esm({"web/lib/wasm/session-handler-inference.ts"(){init_esm(),init_proxy_wrapper(),init_wasm_common(),init_wasm_utils_env(),init_wasm_utils_load_file(),encodeTensorMetadata=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},decodeTensorMetadata=e=>{switch(e[3]){case"cpu":return new Tensor2(e[0],e[2],e[1]);case"gpu-buffer":{const t=e[0];if(!isGpuBufferSupportedType(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);const{gpuBuffer:r,download:o,dispose:u}=e[2];return Tensor2.fromGpuBuffer(r,{dataType:t,dims:e[1],download:o,dispose:u})}case"ml-tensor":{const t=e[0];if(!isMLTensorSupportedType(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);const{mlTensor:r,download:o,dispose:u}=e[2];return Tensor2.fromMLTensor(r,{dataType:t,dims:e[1],download:o,dispose:u})}default:throw new Error(`invalid data location: ${e[3]}`)}},OnnxruntimeWebAssemblySessionHandler=class{async fetchModelAndCopyToWasmMemory(e){return copyFromExternalBuffer2(await loadFile(e))}async loadModel(e,t){TRACE_FUNC_BEGIN();let r;typeof e=="string"?isNode?r=await loadFile(e):r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await createSession2(r,t),TRACE_FUNC_END()}async dispose(){return releaseSession2(this.sessionId)}async run(e,t,r){TRACE_FUNC_BEGIN();const o=[],u=[];Object.entries(e).forEach(s=>{const p=s[0],f=s[1],h=this.inputNames.indexOf(p);if(h===-1)throw new Error(`invalid input '${p}'`);o.push(f),u.push(h)});const l=[],c=[];Object.entries(t).forEach(s=>{const p=s[0],f=s[1],h=this.outputNames.indexOf(p);if(h===-1)throw new Error(`invalid output '${p}'`);l.push(f),c.push(h)});const d=o.map((s,p)=>encodeTensorMetadata(s,()=>`input "${this.inputNames[u[p]]}"`)),i=l.map((s,p)=>s?encodeTensorMetadata(s,()=>`output "${this.outputNames[c[p]]}"`):null),a=await run2(this.sessionId,u,d,c,i,r),n={};for(let s=0;s<a.length;s++)n[this.outputNames[c[s]]]=l[s]??decodeTensorMetadata(a[s]);return TRACE_FUNC_END(),n}startProfiling(){}endProfiling(){endProfiling2(this.sessionId)}}}}),backend_wasm_exports={};__export(backend_wasm_exports,{OnnxruntimeWebAssemblyBackend:()=>OnnxruntimeWebAssemblyBackend,initializeFlags:()=>initializeFlags,wasmBackend:()=>wasmBackend});var initializeFlags,OnnxruntimeWebAssemblyBackend,wasmBackend,init_backend_wasm=__esm({"web/lib/backend-wasm.ts"(){init_esm(),init_proxy_wrapper(),init_session_handler_inference2(),initializeFlags=()=>{(typeof env2.wasm.initTimeout!="number"||env2.wasm.initTimeout<0)&&(env2.wasm.initTimeout=0);const e=env2.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),env2.wasm.simd=!1),typeof env2.wasm.proxy!="boolean"&&(env2.wasm.proxy=!1),typeof env2.wasm.trace!="boolean"&&(env2.wasm.trace=!1),typeof env2.wasm.numThreads!="number"||!Number.isInteger(env2.wasm.numThreads)||env2.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)env2.wasm.numThreads=1;else{const t=typeof navigator>"u"?__require("node:os").cpus().length:navigator.hardwareConcurrency;env2.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},OnnxruntimeWebAssemblyBackend=class{async init(e){initializeFlags(),await initializeWebAssemblyAndOrtRuntime(),await initializeOrtEp(e)}async createInferenceSessionHandler(e,t){const r=new OnnxruntimeWebAssemblySessionHandler;return await r.loadModel(e,t),r}},wasmBackend=new OnnxruntimeWebAssemblyBackend}});init_esm();init_esm();init_esm();var version2="1.23.2",index_default=esm_exports;{const e=(init_backend_onnxjs(),__toCommonJS(backend_onnxjs_exports)).onnxjsBackend;registerBackend("webgl",e,-10)}{const e=(init_backend_wasm(),__toCommonJS(backend_wasm_exports)).wasmBackend;registerBackend("webgpu",e,5),registerBackend("webnn",e,5),registerBackend("cpu",e,10),registerBackend("wasm",e,10)}Object.defineProperty(env2.versions,"web",{value:version2,enumerable:!0});export{InferenceSession2 as InferenceSession,TRACE,TRACE_EVENT_BEGIN,TRACE_EVENT_END,TRACE_FUNC_BEGIN,TRACE_FUNC_END,Tensor2 as Tensor,index_default as default,env2 as env,registerBackend};
