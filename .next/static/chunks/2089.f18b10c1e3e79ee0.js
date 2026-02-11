"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2089],{22089:(e,t,i)=>{i.r(t),i.d(t,{default:()=>u});var s=i(95155),r=i(12115),o=i(97650),n=i(29625);let a=["#5227FF","#FF9FFC","#B19EEF"];function u({mouseForce:e=20,cursorSize:t=100,isViscous:i=!1,viscous:u=30,iterationsViscous:l=32,iterationsPoisson:c=32,dt:h=.014,BFECC:v=!0,resolution:p=.5,isBounce:d=!1,colors:m=a,style:f={},className:y="",autoDemo:g=!0,autoSpeed:x=.5,autoIntensity:w=2.2,takeoverDuration:_=.25,autoResumeDelay:b=1e3,autoRampDuration:S=.6}){let D=(0,r.useRef)(null),T=(0,r.useRef)(null),z=(0,r.useRef)(null),C=(0,r.useRef)(null),M=(0,r.useRef)(null),F=(0,r.useRef)(!0),I=(0,r.useRef)(null);return(0,r.useEffect)(()=>{if(!D.current)return;let s=function(e){let t,i=(t=Array.isArray(e)&&e.length>0?1===e.length?[e[0],e[0]]:e:["#ffffff","#ffffff"]).length,s=new Uint8Array(4*i);for(let e=0;e<i;e++){let i=new o.Q1f(t[e]);s[4*e+0]=Math.round(255*i.r),s[4*e+1]=Math.round(255*i.g),s[4*e+2]=Math.round(255*i.b),s[4*e+3]=255}let r=new o.GYF(s,i,1,o.GWd);return r.magFilter=o.k6q,r.minFilter=o.k6q,r.wrapS=o.ghU,r.wrapT=o.ghU,r.generateMipmaps=!1,r.needsUpdate=!0,r}(m),r=new o.IUQ(0,0,0,0);class a{init(e){this.container=e,this.pixelRatio=Math.min(window.devicePixelRatio||1,2),this.resize(),this.renderer=new n.WebGLRenderer({antialias:!0,alpha:!0}),this.renderer.autoClear=!1,this.renderer.setClearColor(new o.Q1f(0),0),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(this.width,this.height);let t=this.renderer.domElement;t.style.width="100%",t.style.height="100%",t.style.display="block",this.clock=new o.zD7,this.clock.start()}resize(){if(!this.container)return;let e=this.container.getBoundingClientRect();this.width=Math.max(1,Math.floor(e.width)),this.height=Math.max(1,Math.floor(e.height)),this.aspect=this.width/this.height,this.renderer&&this.renderer.setSize(this.width,this.height,!1)}update(){this.clock&&(this.delta=this.clock.getDelta(),this.time+=this.delta)}constructor(){this.width=0,this.height=0,this.aspect=1,this.pixelRatio=1,this.isMobile=!1,this.breakpoint=768,this.fboWidth=null,this.fboHeight=null,this.time=0,this.delta=0,this.container=null,this.renderer=null,this.clock=null}}let f=new a;class y{init(e){this.container=e,this.docTarget=e.ownerDocument||null;let t=this.docTarget?.defaultView||window;t&&(this.listenerTarget=t,this.listenerTarget.addEventListener("mousemove",this._onMouseMove),this.listenerTarget.addEventListener("touchstart",this._onTouchStart,{passive:!0}),this.listenerTarget.addEventListener("touchmove",this._onTouchMove,{passive:!0}),this.listenerTarget.addEventListener("touchend",this._onTouchEnd),this.docTarget?.addEventListener("mouseleave",this._onDocumentLeave))}dispose(){this.listenerTarget&&(this.listenerTarget.removeEventListener("mousemove",this._onMouseMove),this.listenerTarget.removeEventListener("touchstart",this._onTouchStart),this.listenerTarget.removeEventListener("touchmove",this._onTouchMove),this.listenerTarget.removeEventListener("touchend",this._onTouchEnd)),this.docTarget&&this.docTarget.removeEventListener("mouseleave",this._onDocumentLeave),this.listenerTarget=null,this.docTarget=null,this.container=null}isPointInside(e,t){if(!this.container)return!1;let i=this.container.getBoundingClientRect();return 0!==i.width&&0!==i.height&&e>=i.left&&e<=i.right&&t>=i.top&&t<=i.bottom}updateHoverState(e,t){return this.isHoverInside=this.isPointInside(e,t),this.isHoverInside}setCoords(e,t){if(!this.container)return;this.timer&&window.clearTimeout(this.timer);let i=this.container.getBoundingClientRect();if(0===i.width||0===i.height)return;let s=(e-i.left)/i.width,r=(t-i.top)/i.height;this.coords.set(2*s-1,-(2*r-1)),this.mouseMoved=!0,this.timer=window.setTimeout(()=>{this.mouseMoved=!1},100)}setNormalized(e,t){this.coords.set(e,t),this.mouseMoved=!0}onDocumentMouseMove(e){if(this.updateHoverState(e.clientX,e.clientY)){if(this.onInteract&&this.onInteract(),this.isAutoActive&&!this.hasUserControl&&!this.takeoverActive){if(!this.container)return;let t=this.container.getBoundingClientRect(),i=(e.clientX-t.left)/t.width,s=(e.clientY-t.top)/t.height;this.takeoverFrom.copy(this.coords),this.takeoverTo.set(2*i-1,-(2*s-1)),this.takeoverStartTime=performance.now(),this.takeoverActive=!0,this.hasUserControl=!0,this.isAutoActive=!1;return}this.setCoords(e.clientX,e.clientY),this.hasUserControl=!0}}onDocumentTouchStart(e){if(1!==e.touches.length)return;let t=e.touches[0];this.updateHoverState(t.clientX,t.clientY)&&(this.onInteract&&this.onInteract(),this.setCoords(t.clientX,t.clientY),this.hasUserControl=!0)}onDocumentTouchMove(e){if(1!==e.touches.length)return;let t=e.touches[0];this.updateHoverState(t.clientX,t.clientY)&&(this.onInteract&&this.onInteract(),this.setCoords(t.clientX,t.clientY))}onTouchEnd(){this.isHoverInside=!1}onDocumentLeave(){this.isHoverInside=!1}update(){if(this.takeoverActive){let e=(performance.now()-this.takeoverStartTime)/(1e3*this.takeoverDuration);e>=1?(this.takeoverActive=!1,this.coords.copy(this.takeoverTo),this.coords_old.copy(this.coords),this.diff.set(0,0)):this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo,e*e*(3-2*e))}this.diff.subVectors(this.coords,this.coords_old),this.coords_old.copy(this.coords),0===this.coords_old.x&&0===this.coords_old.y&&this.diff.set(0,0),this.isAutoActive&&!this.takeoverActive&&this.diff.multiplyScalar(this.autoIntensity)}constructor(){this.mouseMoved=!1,this.coords=new o.I9Y,this.coords_old=new o.I9Y,this.diff=new o.I9Y,this.timer=null,this.container=null,this.docTarget=null,this.listenerTarget=null,this.isHoverInside=!1,this.hasUserControl=!1,this.isAutoActive=!1,this.autoIntensity=2,this.takeoverActive=!1,this.takeoverStartTime=0,this.takeoverDuration=.25,this.takeoverFrom=new o.I9Y,this.takeoverTo=new o.I9Y,this.onInteract=null,this._onMouseMove=this.onDocumentMouseMove.bind(this),this._onTouchStart=this.onDocumentTouchStart.bind(this),this._onTouchMove=this.onDocumentTouchMove.bind(this),this._onTouchEnd=this.onTouchEnd.bind(this),this._onDocumentLeave=this.onDocumentLeave.bind(this)}}let k=new y;class E{constructor(e,t,i){this.active=!1,this.current=new o.I9Y(0,0),this.target=new o.I9Y,this.lastTime=performance.now(),this.activationTime=0,this.margin=.2,this._tmpDir=new o.I9Y,this.mouse=e,this.manager=t,this.enabled=i.enabled,this.speed=i.speed,this.resumeDelay=i.resumeDelay||3e3,this.rampDurationMs=1e3*(i.rampDuration||0),this.pickNewTarget()}pickNewTarget(){let e=Math.random;this.target.set((2*e()-1)*(1-this.margin),(2*e()-1)*(1-this.margin))}forceStop(){this.active=!1,this.mouse.isAutoActive=!1}update(){if(!this.enabled)return;let e=performance.now();if(e-this.manager.lastUserInteraction<this.resumeDelay||this.mouse.isHoverInside){this.active&&this.forceStop();return}if(this.active||(this.active=!0,this.current.copy(this.mouse.coords),this.lastTime=e,this.activationTime=e),!this.active)return;this.mouse.isAutoActive=!0;let t=(e-this.lastTime)/1e3;this.lastTime=e,t>.2&&(t=.016);let i=this._tmpDir.subVectors(this.target,this.current),s=i.length();if(s<.01)return void this.pickNewTarget();i.normalize();let r=1;if(this.rampDurationMs>0){let t=Math.min(1,(e-this.activationTime)/this.rampDurationMs);r=t*t*(3-2*t)}let o=Math.min(this.speed*t*r,s);this.current.addScaledVector(i,o),this.mouse.setNormalized(this.current.x,this.current.y)}}let A=`
  attribute vec3 position;
  uniform vec2 px;
  uniform vec2 boundarySpace;
  varying vec2 uv;
  precision highp float;
  void main(){
  vec3 pos = position;
  vec2 scale = 1.0 - boundarySpace * 2.0;
  pos.xy = pos.xy * scale;
  uv = vec2(0.5)+(pos.xy)*0.5;
  gl_Position = vec4(pos, 1.0);
}
`,R=`
  attribute vec3 position;
  uniform vec2 px;
  precision highp float;
  varying vec2 uv;
  void main(){
  vec3 pos = position;
  uv = 0.5 + pos.xy * 0.5;
  vec2 n = sign(pos.xy);
  pos.xy = abs(pos.xy) - px * 1.0;
  pos.xy *= n;
  gl_Position = vec4(pos, 1.0);
}
`,B=`
    precision highp float;
    attribute vec3 position;
    attribute vec2 uv;
    uniform vec2 center;
    uniform vec2 scale;
    uniform vec2 px;
    varying vec2 vUv;
    void main(){
    vec2 pos = position.xy * scale * 2.0 * px + center;
    vUv = uv;
    gl_Position = vec4(pos, 0.0, 1.0);
}
`,Y=`
    precision highp float;
    uniform sampler2D velocity;
    uniform float dt;
    uniform bool isBFECC;
    uniform vec2 fboSize;
    uniform vec2 px;
    varying vec2 uv;
    void main(){
    vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
    if(isBFECC == false){
        vec2 vel = texture2D(velocity, uv).xy;
        vec2 uv2 = uv - vel * dt * ratio;
        vec2 newVel = texture2D(velocity, uv2).xy;
        gl_FragColor = vec4(newVel, 0.0, 0.0);
    } else {
        vec2 spot_new = uv;
        vec2 vel_old = texture2D(velocity, uv).xy;
        vec2 spot_old = spot_new - vel_old * dt * ratio;
        vec2 vel_new1 = texture2D(velocity, spot_old).xy;
        vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
        vec2 error = spot_new2 - spot_new;
        vec2 spot_new3 = spot_new - error / 2.0;
        vec2 vel_2 = texture2D(velocity, spot_new3).xy;
        vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
        vec2 newVel2 = texture2D(velocity, spot_old2).xy; 
        gl_FragColor = vec4(newVel2, 0.0, 0.0);
    }
}
`,L=`
    precision highp float;
    uniform sampler2D velocity;
    uniform sampler2D palette;
    uniform vec4 bgColor;
    varying vec2 uv;
    void main(){
    vec2 vel = texture2D(velocity, uv).xy;
    float lenv = clamp(length(vel), 0.0, 1.0);
    vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;
    vec3 outRGB = mix(bgColor.rgb, c, lenv);
    float outA = mix(bgColor.a, 1.0, lenv);
    gl_FragColor = vec4(outRGB, outA);
}
`,U=`
    precision highp float;
    uniform sampler2D velocity;
    uniform float dt;
    uniform vec2 px;
    varying vec2 uv;
    void main(){
    float x0 = texture2D(velocity, uv-vec2(px.x, 0.0)).x;
    float x1 = texture2D(velocity, uv+vec2(px.x, 0.0)).x;
    float y0 = texture2D(velocity, uv-vec2(0.0, px.y)).y;
    float y1 = texture2D(velocity, uv+vec2(0.0, px.y)).y;
    float divergence = (x1 - x0 + y1 - y0) / 2.0;
    gl_FragColor = vec4(divergence / dt);
}
`,P=`
    precision highp float;
    uniform vec2 force;
    uniform vec2 center;
    uniform vec2 scale;
    uniform vec2 px;
    varying vec2 vUv;
    void main(){
    vec2 circle = (vUv - 0.5) * 2.0;
    float d = 1.0 - min(length(circle), 1.0);
    d *= d;
    gl_FragColor = vec4(force * d, 0.0, 1.0);
}
`,V=`
    precision highp float;
    uniform sampler2D pressure;
    uniform sampler2D divergence;
    uniform vec2 px;
    varying vec2 uv;
    void main(){
    float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;
    float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;
    float div = texture2D(divergence, uv).r;
    float newP = (p0 + p1 + p2 + p3) / 4.0 - div;
    gl_FragColor = vec4(newP);
}
`,H=`
    precision highp float;
    uniform sampler2D pressure;
    uniform sampler2D velocity;
    uniform vec2 px;
    uniform float dt;
    varying vec2 uv;
    void main(){
    float step = 1.0;
    float p0 = texture2D(pressure, uv + vec2(px.x * step, 0.0)).r;
    float p1 = texture2D(pressure, uv - vec2(px.x * step, 0.0)).r;
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * step)).r;
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * step)).r;
    vec2 v = texture2D(velocity, uv).xy;
    vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;
    v = v - gradP * dt;
    gl_FragColor = vec4(v, 0.0, 1.0);
}
`,N=`
    precision highp float;
    uniform sampler2D velocity;
    uniform sampler2D velocity_new;
    uniform float v;
    uniform vec2 px;
    uniform float dt;
    varying vec2 uv;
    void main(){
    vec2 old = texture2D(velocity, uv).xy;
    vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;
    vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;
    vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;
    vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;
    vec2 newv = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);
    newv /= 4.0 * (1.0 + v * dt);
    gl_FragColor = vec4(newv, 0.0, 0.0);
}
`;class ${constructor(e){this.scene=null,this.camera=null,this.material=null,this.geometry=null,this.plane=null,this.props=e||{},this.uniforms=this.props.material?.uniforms}init(){this.scene=new o.Z58,this.camera=new o.i7d,this.uniforms&&(this.material=new o.D$Q(this.props.material),this.geometry=new o.bdM(2,2),this.plane=new o.eaF(this.geometry,this.material),this.scene.add(this.plane))}update(){f.renderer&&this.scene&&this.camera&&(f.renderer.setRenderTarget(this.props.output||null),f.renderer.render(this.scene,this.camera),f.renderer.setRenderTarget(null))}}class Q extends ${constructor(e){super({material:{vertexShader:A,fragmentShader:Y,uniforms:{boundarySpace:{value:e.cellScale},px:{value:e.cellScale},fboSize:{value:e.fboSize},velocity:{value:e.src.texture},dt:{value:e.dt},isBFECC:{value:!0}}},output:e.dst}),this.uniforms=this.props.material.uniforms,this.init()}init(){super.init(),this.createBoundary()}createBoundary(){let e=new o.LoY,t=new Float32Array([-1,-1,0,-1,1,0,-1,1,0,1,1,0,1,1,0,1,-1,0,1,-1,0,-1,-1,0]);e.setAttribute("position",new o.THS(t,3));let i=new o.D$Q({vertexShader:R,fragmentShader:Y,uniforms:this.uniforms});this.line=new o.DXC(e,i),this.scene.add(this.line)}update(...e){let{dt:t,isBounce:i,BFECC:s}=e[0]||{};this.uniforms&&("number"==typeof t&&(this.uniforms.dt.value=t),"boolean"==typeof i&&(this.line.visible=i),"boolean"==typeof s&&(this.uniforms.isBFECC.value=s),super.update())}}class X extends ${constructor(e){super({output:e.dst}),this.init(e)}init(e){super.init();let t=new o.bdM(1,1),i=new o.D$Q({vertexShader:B,fragmentShader:P,blending:o.EZo,depthWrite:!1,uniforms:{px:{value:e.cellScale},force:{value:new o.I9Y(0,0)},center:{value:new o.I9Y(0,0)},scale:{value:new o.I9Y(e.cursor_size,e.cursor_size)}}});this.mouse=new o.eaF(t,i),this.scene.add(this.mouse)}update(...e){let t=e[0]||{},i=k.diff.x/2*(t.mouse_force||0),s=k.diff.y/2*(t.mouse_force||0),r=t.cellScale||{x:1,y:1},o=t.cursor_size||0,n=o*r.x,a=o*r.y,u=Math.min(Math.max(k.coords.x,-1+n+2*r.x),1-n-2*r.x),l=Math.min(Math.max(k.coords.y,-1+a+2*r.y),1-a-2*r.y),c=this.mouse.material.uniforms;c.force.value.set(i,s),c.center.value.set(u,l),c.scale.value.set(o,o),super.update()}}class q extends ${constructor(e){super({material:{vertexShader:A,fragmentShader:N,uniforms:{boundarySpace:{value:e.boundarySpace},velocity:{value:e.src.texture},velocity_new:{value:e.dst_.texture},v:{value:e.viscous},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst,output0:e.dst_,output1:e.dst}),this.init()}update(...e){let t,i,{viscous:s,iterations:r,dt:o}=e[0]||{};if(!this.uniforms)return;"number"==typeof s&&(this.uniforms.v.value=s);let n=r??0;for(let e=0;e<n;e++)e%2==0?(t=this.props.output0,i=this.props.output1):(t=this.props.output1,i=this.props.output0),this.uniforms.velocity_new.value=t.texture,this.props.output=i,"number"==typeof o&&(this.uniforms.dt.value=o),super.update();return i}}class O extends ${constructor(e){super({material:{vertexShader:A,fragmentShader:U,uniforms:{boundarySpace:{value:e.boundarySpace},velocity:{value:e.src.texture},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst}),this.init()}update(...e){let{vel:t}=e[0]||{};this.uniforms&&t&&(this.uniforms.velocity.value=t.texture),super.update()}}class W extends ${constructor(e){super({material:{vertexShader:A,fragmentShader:V,uniforms:{boundarySpace:{value:e.boundarySpace},pressure:{value:e.dst_.texture},divergence:{value:e.src.texture},px:{value:e.cellScale}}},output:e.dst,output0:e.dst_,output1:e.dst}),this.init()}update(...e){let t,i,{iterations:s}=e[0]||{},r=s??0;for(let e=0;e<r;e++)e%2==0?(t=this.props.output0,i=this.props.output1):(t=this.props.output1,i=this.props.output0),this.uniforms&&(this.uniforms.pressure.value=t.texture),this.props.output=i,super.update();return i}}class G extends ${constructor(e){super({material:{vertexShader:A,fragmentShader:H,uniforms:{boundarySpace:{value:e.boundarySpace},pressure:{value:e.src_p.texture},velocity:{value:e.src_v.texture},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst}),this.init()}update(...e){let{vel:t,pressure:i}=e[0]||{};this.uniforms&&t&&i&&(this.uniforms.velocity.value=t.texture,this.uniforms.pressure.value=i.texture),super.update()}}class j{constructor(e){this.fbos={vel_0:null,vel_1:null,vel_viscous0:null,vel_viscous1:null,div:null,pressure_0:null,pressure_1:null},this.fboSize=new o.I9Y,this.cellScale=new o.I9Y,this.boundarySpace=new o.I9Y,this.options={iterations_poisson:32,iterations_viscous:32,mouse_force:20,resolution:.5,cursor_size:100,viscous:30,isBounce:!1,dt:.014,isViscous:!1,BFECC:!0,...e},this.init()}init(){this.calcSize(),this.createAllFBO(),this.createShaderPass()}getFloatType(){return/(iPad|iPhone|iPod)/i.test(navigator.userAgent)?o.ix0:o.RQf}createAllFBO(){let e={type:this.getFloatType(),depthBuffer:!1,stencilBuffer:!1,minFilter:o.k6q,magFilter:o.k6q,wrapS:o.ghU,wrapT:o.ghU};for(let t in this.fbos)this.fbos[t]=new o.nWS(this.fboSize.x,this.fboSize.y,e)}createShaderPass(){this.advection=new Q({cellScale:this.cellScale,fboSize:this.fboSize,dt:this.options.dt,src:this.fbos.vel_0,dst:this.fbos.vel_1}),this.externalForce=new X({cellScale:this.cellScale,cursor_size:this.options.cursor_size,dst:this.fbos.vel_1}),this.viscous=new q({cellScale:this.cellScale,boundarySpace:this.boundarySpace,viscous:this.options.viscous,src:this.fbos.vel_1,dst:this.fbos.vel_viscous1,dst_:this.fbos.vel_viscous0,dt:this.options.dt}),this.divergence=new O({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src:this.fbos.vel_viscous0,dst:this.fbos.div,dt:this.options.dt}),this.poisson=new W({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src:this.fbos.div,dst:this.fbos.pressure_1,dst_:this.fbos.pressure_0}),this.pressure=new G({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src_p:this.fbos.pressure_0,src_v:this.fbos.vel_viscous0,dst:this.fbos.vel_0,dt:this.options.dt})}calcSize(){let e=Math.max(1,Math.round(this.options.resolution*f.width)),t=Math.max(1,Math.round(this.options.resolution*f.height));this.cellScale.set(1/e,1/t),this.fboSize.set(e,t)}resize(){for(let e in this.calcSize(),this.fbos)this.fbos[e].setSize(this.fboSize.x,this.fboSize.y)}update(){this.options.isBounce?this.boundarySpace.set(0,0):this.boundarySpace.copy(this.cellScale),this.advection.update({dt:this.options.dt,isBounce:this.options.isBounce,BFECC:this.options.BFECC}),this.externalForce.update({cursor_size:this.options.cursor_size,mouse_force:this.options.mouse_force,cellScale:this.cellScale});let e=this.fbos.vel_1;this.options.isViscous&&(e=this.viscous.update({viscous:this.options.viscous,iterations:this.options.iterations_viscous,dt:this.options.dt})),this.divergence.update({vel:e});let t=this.poisson.update({iterations:this.options.iterations_poisson});this.pressure.update({vel:e,pressure:t})}}class Z{constructor(){this.simulation=new j,this.scene=new o.Z58,this.camera=new o.i7d,this.output=new o.eaF(new o.bdM(2,2),new o.D$Q({vertexShader:A,fragmentShader:L,transparent:!0,depthWrite:!1,uniforms:{velocity:{value:this.simulation.fbos.vel_0.texture},boundarySpace:{value:new o.I9Y},palette:{value:s},bgColor:{value:r}}})),this.scene.add(this.output)}resize(){this.simulation.resize()}render(){f.renderer&&(f.renderer.setRenderTarget(null),f.renderer.render(this.scene,this.camera))}update(){this.simulation.update(),this.render()}}class J{constructor(e){this.lastUserInteraction=performance.now(),this.running=!1,this._loop=this.loop.bind(this),this._resize=this.resize.bind(this),this.props=e,f.init(e.$wrapper),k.init(e.$wrapper),k.autoIntensity=e.autoIntensity,k.takeoverDuration=e.takeoverDuration,k.onInteract=()=>{this.lastUserInteraction=performance.now(),this.autoDriver&&this.autoDriver.forceStop()},this.autoDriver=new E(k,this,{enabled:e.autoDemo,speed:e.autoSpeed,resumeDelay:e.autoResumeDelay,rampDuration:e.autoRampDuration}),this.init(),window.addEventListener("resize",this._resize),this._onVisibility=()=>{document.hidden?this.pause():F.current&&this.start()},document.addEventListener("visibilitychange",this._onVisibility)}init(){f.renderer&&(this.props.$wrapper.prepend(f.renderer.domElement),this.output=new Z)}resize(){f.resize(),this.output.resize()}render(){this.autoDriver&&this.autoDriver.update(),k.update(),f.update(),this.output.update()}loop(){this.running&&(this.render(),C.current=requestAnimationFrame(this._loop))}start(){this.running||(this.running=!0,this._loop())}pause(){this.running=!1,C.current&&(cancelAnimationFrame(C.current),C.current=null)}dispose(){try{if(window.removeEventListener("resize",this._resize),this._onVisibility&&document.removeEventListener("visibilitychange",this._onVisibility),k.dispose(),f.renderer){let e=f.renderer.domElement;e&&e.parentNode&&e.parentNode.removeChild(e),f.renderer.dispose()}}catch{}}}let K=D.current;K.style.position=K.style.position||"relative",K.style.overflow=K.style.overflow||"hidden";let ee=new J({$wrapper:K,autoDemo:g,autoSpeed:x,autoIntensity:w,takeoverDuration:_,autoResumeDelay:b,autoRampDuration:S});T.current=ee,(()=>{if(!T.current)return;let s=T.current.output?.simulation;if(!s)return;let r=s.options.resolution;Object.assign(s.options,{mouse_force:e,cursor_size:t,isViscous:i,viscous:u,iterations_viscous:l,iterations_poisson:c,dt:h,BFECC:v,resolution:p,isBounce:d}),p!==r&&s.resize()})(),ee.start();let et=new IntersectionObserver(e=>{let t=e[0],i=t.isIntersecting&&t.intersectionRatio>0;F.current=i,T.current&&(i&&!document.hidden?T.current.start():T.current.pause())},{threshold:[0,.01,.1]});et.observe(K),M.current=et;let ei=new ResizeObserver(()=>{T.current&&(I.current&&cancelAnimationFrame(I.current),I.current=requestAnimationFrame(()=>{T.current&&T.current.resize()}))});return ei.observe(K),z.current=ei,()=>{if(C.current&&cancelAnimationFrame(C.current),z.current)try{z.current.disconnect()}catch{}if(M.current)try{M.current.disconnect()}catch{}T.current&&T.current.dispose(),T.current=null}},[v,t,h,d,i,c,l,e,p,u,m,g,x,w,_,b,S]),(0,r.useEffect)(()=>{let s=T.current;if(!s)return;let r=s.output?.simulation;if(!r)return;let o=r.options.resolution;Object.assign(r.options,{mouse_force:e,cursor_size:t,isViscous:i,viscous:u,iterations_viscous:l,iterations_poisson:c,dt:h,BFECC:v,resolution:p,isBounce:d}),s.autoDriver&&(s.autoDriver.enabled=g,s.autoDriver.speed=x,s.autoDriver.resumeDelay=b,s.autoDriver.rampDurationMs=1e3*S,s.autoDriver.mouse&&(s.autoDriver.mouse.autoIntensity=w,s.autoDriver.mouse.takeoverDuration=_)),p!==o&&r.resize()},[e,t,i,u,l,c,h,v,p,d,g,x,w,_,b,S]),(0,s.jsx)("div",{ref:D,className:`w-full h-full relative overflow-hidden pointer-events-none touch-none ${y||""}`,style:f})}}}]);