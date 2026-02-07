(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,90363,e=>{"use strict";var t=e.i(43476),i=e.i(71645),r=e.i(90072),s=e.i(8560);let o=["#5227FF","#FF9FFC","#B19EEF"];function n({mouseForce:e=20,cursorSize:n=100,isViscous:a=!1,viscous:u=30,iterationsViscous:l=32,iterationsPoisson:c=32,dt:h=.014,BFECC:v=!0,resolution:p=.5,isBounce:d=!1,colors:m=o,style:f={},className:y="",autoDemo:g=!0,autoSpeed:x=.5,autoIntensity:w=2.2,takeoverDuration:_=.25,autoResumeDelay:b=1e3,autoRampDuration:S=.6}){let D=(0,i.useRef)(null),T=(0,i.useRef)(null),C=(0,i.useRef)(null),M=(0,i.useRef)(null),z=(0,i.useRef)(null),F=(0,i.useRef)(!0),A=(0,i.useRef)(null);return(0,i.useEffect)(()=>{if(!D.current)return;let t=function(e){let t,i=(t=Array.isArray(e)&&e.length>0?1===e.length?[e[0],e[0]]:e:["#ffffff","#ffffff"]).length,s=new Uint8Array(4*i);for(let e=0;e<i;e++){let i=new r.Color(t[e]);s[4*e+0]=Math.round(255*i.r),s[4*e+1]=Math.round(255*i.g),s[4*e+2]=Math.round(255*i.b),s[4*e+3]=255}let o=new r.DataTexture(s,i,1,r.RGBAFormat);return o.magFilter=r.LinearFilter,o.minFilter=r.LinearFilter,o.wrapS=r.ClampToEdgeWrapping,o.wrapT=r.ClampToEdgeWrapping,o.generateMipmaps=!1,o.needsUpdate=!0,o}(m),i=new r.Vector4(0,0,0,0),o=new class{width=0;height=0;aspect=1;pixelRatio=1;isMobile=!1;breakpoint=768;fboWidth=null;fboHeight=null;time=0;delta=0;container=null;renderer=null;clock=null;init(e){this.container=e,this.pixelRatio=Math.min(window.devicePixelRatio||1,2),this.resize(),this.renderer=new s.WebGLRenderer({antialias:!0,alpha:!0}),this.renderer.autoClear=!1,this.renderer.setClearColor(new r.Color(0),0),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(this.width,this.height);let t=this.renderer.domElement;t.style.width="100%",t.style.height="100%",t.style.display="block",this.clock=new r.Clock,this.clock.start()}resize(){if(!this.container)return;let e=this.container.getBoundingClientRect();this.width=Math.max(1,Math.floor(e.width)),this.height=Math.max(1,Math.floor(e.height)),this.aspect=this.width/this.height,this.renderer&&this.renderer.setSize(this.width,this.height,!1)}update(){this.clock&&(this.delta=this.clock.getDelta(),this.time+=this.delta)}};class f{mouseMoved=!1;coords=new r.Vector2;coords_old=new r.Vector2;diff=new r.Vector2;timer=null;container=null;docTarget=null;listenerTarget=null;isHoverInside=!1;hasUserControl=!1;isAutoActive=!1;autoIntensity=2;takeoverActive=!1;takeoverStartTime=0;takeoverDuration=.25;takeoverFrom=new r.Vector2;takeoverTo=new r.Vector2;onInteract=null;_onMouseMove=this.onDocumentMouseMove.bind(this);_onTouchStart=this.onDocumentTouchStart.bind(this);_onTouchMove=this.onDocumentTouchMove.bind(this);_onTouchEnd=this.onTouchEnd.bind(this);_onDocumentLeave=this.onDocumentLeave.bind(this);init(e){this.container=e,this.docTarget=e.ownerDocument||null;let t=this.docTarget?.defaultView||window;t&&(this.listenerTarget=t,this.listenerTarget.addEventListener("mousemove",this._onMouseMove),this.listenerTarget.addEventListener("touchstart",this._onTouchStart,{passive:!0}),this.listenerTarget.addEventListener("touchmove",this._onTouchMove,{passive:!0}),this.listenerTarget.addEventListener("touchend",this._onTouchEnd),this.docTarget?.addEventListener("mouseleave",this._onDocumentLeave))}dispose(){this.listenerTarget&&(this.listenerTarget.removeEventListener("mousemove",this._onMouseMove),this.listenerTarget.removeEventListener("touchstart",this._onTouchStart),this.listenerTarget.removeEventListener("touchmove",this._onTouchMove),this.listenerTarget.removeEventListener("touchend",this._onTouchEnd)),this.docTarget&&this.docTarget.removeEventListener("mouseleave",this._onDocumentLeave),this.listenerTarget=null,this.docTarget=null,this.container=null}isPointInside(e,t){if(!this.container)return!1;let i=this.container.getBoundingClientRect();return 0!==i.width&&0!==i.height&&e>=i.left&&e<=i.right&&t>=i.top&&t<=i.bottom}updateHoverState(e,t){return this.isHoverInside=this.isPointInside(e,t),this.isHoverInside}setCoords(e,t){if(!this.container)return;this.timer&&window.clearTimeout(this.timer);let i=this.container.getBoundingClientRect();if(0===i.width||0===i.height)return;let r=(e-i.left)/i.width,s=(t-i.top)/i.height;this.coords.set(2*r-1,-(2*s-1)),this.mouseMoved=!0,this.timer=window.setTimeout(()=>{this.mouseMoved=!1},100)}setNormalized(e,t){this.coords.set(e,t),this.mouseMoved=!0}onDocumentMouseMove(e){if(this.updateHoverState(e.clientX,e.clientY)){if(this.onInteract&&this.onInteract(),this.isAutoActive&&!this.hasUserControl&&!this.takeoverActive){if(!this.container)return;let t=this.container.getBoundingClientRect(),i=(e.clientX-t.left)/t.width,r=(e.clientY-t.top)/t.height;this.takeoverFrom.copy(this.coords),this.takeoverTo.set(2*i-1,-(2*r-1)),this.takeoverStartTime=performance.now(),this.takeoverActive=!0,this.hasUserControl=!0,this.isAutoActive=!1;return}this.setCoords(e.clientX,e.clientY),this.hasUserControl=!0}}onDocumentTouchStart(e){if(1!==e.touches.length)return;let t=e.touches[0];this.updateHoverState(t.clientX,t.clientY)&&(this.onInteract&&this.onInteract(),this.setCoords(t.clientX,t.clientY),this.hasUserControl=!0)}onDocumentTouchMove(e){if(1!==e.touches.length)return;let t=e.touches[0];this.updateHoverState(t.clientX,t.clientY)&&(this.onInteract&&this.onInteract(),this.setCoords(t.clientX,t.clientY))}onTouchEnd(){this.isHoverInside=!1}onDocumentLeave(){this.isHoverInside=!1}update(){if(this.takeoverActive){let e=(performance.now()-this.takeoverStartTime)/(1e3*this.takeoverDuration);e>=1?(this.takeoverActive=!1,this.coords.copy(this.takeoverTo),this.coords_old.copy(this.coords),this.diff.set(0,0)):this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo,e*e*(3-2*e))}this.diff.subVectors(this.coords,this.coords_old),this.coords_old.copy(this.coords),0===this.coords_old.x&&0===this.coords_old.y&&this.diff.set(0,0),this.isAutoActive&&!this.takeoverActive&&this.diff.multiplyScalar(this.autoIntensity)}}let y=new f;class E{mouse;manager;enabled;speed;resumeDelay;rampDurationMs;active=!1;current=new r.Vector2(0,0);target=new r.Vector2;lastTime=performance.now();activationTime=0;margin=.2;_tmpDir=new r.Vector2;constructor(e,t,i){this.mouse=e,this.manager=t,this.enabled=i.enabled,this.speed=i.speed,this.resumeDelay=i.resumeDelay||3e3,this.rampDurationMs=1e3*(i.rampDuration||0),this.pickNewTarget()}pickNewTarget(){let e=Math.random;this.target.set((2*e()-1)*(1-this.margin),(2*e()-1)*(1-this.margin))}forceStop(){this.active=!1,this.mouse.isAutoActive=!1}update(){if(!this.enabled)return;let e=performance.now();if(e-this.manager.lastUserInteraction<this.resumeDelay||this.mouse.isHoverInside){this.active&&this.forceStop();return}if(this.active||(this.active=!0,this.current.copy(this.mouse.coords),this.lastTime=e,this.activationTime=e),!this.active)return;this.mouse.isAutoActive=!0;let t=(e-this.lastTime)/1e3;this.lastTime=e,t>.2&&(t=.016);let i=this._tmpDir.subVectors(this.target,this.current),r=i.length();if(r<.01)return void this.pickNewTarget();i.normalize();let s=1;if(this.rampDurationMs>0){let t=Math.min(1,(e-this.activationTime)/this.rampDurationMs);s=t*t*(3-2*t)}let o=Math.min(this.speed*t*s,r);this.current.addScaledVector(i,o),this.mouse.setNormalized(this.current.x,this.current.y)}}let R=`
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
`,k=`
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
`,V=`
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
`,B=`
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
`,I=`
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
`,L=`
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
`,U=`
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
`,G=`
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
`;class W{props;uniforms;scene=null;camera=null;material=null;geometry=null;plane=null;constructor(e){this.props=e||{},this.uniforms=this.props.material?.uniforms}init(){this.scene=new r.Scene,this.camera=new r.Camera,this.uniforms&&(this.material=new r.RawShaderMaterial(this.props.material),this.geometry=new r.PlaneGeometry(2,2),this.plane=new r.Mesh(this.geometry,this.material),this.scene.add(this.plane))}update(){o.renderer&&this.scene&&this.camera&&(o.renderer.setRenderTarget(this.props.output||null),o.renderer.render(this.scene,this.camera),o.renderer.setRenderTarget(null))}}class N extends W{line;constructor(e){super({material:{vertexShader:R,fragmentShader:B,uniforms:{boundarySpace:{value:e.cellScale},px:{value:e.cellScale},fboSize:{value:e.fboSize},velocity:{value:e.src.texture},dt:{value:e.dt},isBFECC:{value:!0}}},output:e.dst}),this.uniforms=this.props.material.uniforms,this.init()}init(){super.init(),this.createBoundary()}createBoundary(){let e=new r.BufferGeometry,t=new Float32Array([-1,-1,0,-1,1,0,-1,1,0,1,1,0,1,1,0,1,-1,0,1,-1,0,-1,-1,0]);e.setAttribute("position",new r.BufferAttribute(t,3));let i=new r.RawShaderMaterial({vertexShader:k,fragmentShader:B,uniforms:this.uniforms});this.line=new r.LineSegments(e,i),this.scene.add(this.line)}update(...e){let{dt:t,isBounce:i,BFECC:r}=e[0]||{};this.uniforms&&("number"==typeof t&&(this.uniforms.dt.value=t),"boolean"==typeof i&&(this.line.visible=i),"boolean"==typeof r&&(this.uniforms.isBFECC.value=r),super.update())}}class O extends W{mouse;constructor(e){super({output:e.dst}),this.init(e)}init(e){super.init();let t=new r.PlaneGeometry(1,1),i=new r.RawShaderMaterial({vertexShader:V,fragmentShader:P,blending:r.AdditiveBlending,depthWrite:!1,uniforms:{px:{value:e.cellScale},force:{value:new r.Vector2(0,0)},center:{value:new r.Vector2(0,0)},scale:{value:new r.Vector2(e.cursor_size,e.cursor_size)}}});this.mouse=new r.Mesh(t,i),this.scene.add(this.mouse)}update(...e){let t=e[0]||{},i=y.diff.x/2*(t.mouse_force||0),r=y.diff.y/2*(t.mouse_force||0),s=t.cellScale||{x:1,y:1},o=t.cursor_size||0,n=o*s.x,a=o*s.y,u=Math.min(Math.max(y.coords.x,-1+n+2*s.x),1-n-2*s.x),l=Math.min(Math.max(y.coords.y,-1+a+2*s.y),1-a-2*s.y),c=this.mouse.material.uniforms;c.force.value.set(i,r),c.center.value.set(u,l),c.scale.value.set(o,o),super.update()}}class X extends W{constructor(e){super({material:{vertexShader:R,fragmentShader:G,uniforms:{boundarySpace:{value:e.boundarySpace},velocity:{value:e.src.texture},velocity_new:{value:e.dst_.texture},v:{value:e.viscous},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst,output0:e.dst_,output1:e.dst}),this.init()}update(...e){let t,i,{viscous:r,iterations:s,dt:o}=e[0]||{};if(!this.uniforms)return;"number"==typeof r&&(this.uniforms.v.value=r);let n=s??0;for(let e=0;e<n;e++)e%2==0?(t=this.props.output0,i=this.props.output1):(t=this.props.output1,i=this.props.output0),this.uniforms.velocity_new.value=t.texture,this.props.output=i,"number"==typeof o&&(this.uniforms.dt.value=o),super.update();return i}}class Y extends W{constructor(e){super({material:{vertexShader:R,fragmentShader:L,uniforms:{boundarySpace:{value:e.boundarySpace},velocity:{value:e.src.texture},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst}),this.init()}update(...e){let{vel:t}=e[0]||{};this.uniforms&&t&&(this.uniforms.velocity.value=t.texture),super.update()}}class $ extends W{constructor(e){super({material:{vertexShader:R,fragmentShader:U,uniforms:{boundarySpace:{value:e.boundarySpace},pressure:{value:e.dst_.texture},divergence:{value:e.src.texture},px:{value:e.cellScale}}},output:e.dst,output0:e.dst_,output1:e.dst}),this.init()}update(...e){let t,i,{iterations:r}=e[0]||{},s=r??0;for(let e=0;e<s;e++)e%2==0?(t=this.props.output0,i=this.props.output1):(t=this.props.output1,i=this.props.output0),this.uniforms&&(this.uniforms.pressure.value=t.texture),this.props.output=i,super.update();return i}}class j extends W{constructor(e){super({material:{vertexShader:R,fragmentShader:H,uniforms:{boundarySpace:{value:e.boundarySpace},pressure:{value:e.src_p.texture},velocity:{value:e.src_v.texture},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst}),this.init()}update(...e){let{vel:t,pressure:i}=e[0]||{};this.uniforms&&t&&i&&(this.uniforms.velocity.value=t.texture,this.uniforms.pressure.value=i.texture),super.update()}}class q{options;fbos={vel_0:null,vel_1:null,vel_viscous0:null,vel_viscous1:null,div:null,pressure_0:null,pressure_1:null};fboSize=new r.Vector2;cellScale=new r.Vector2;boundarySpace=new r.Vector2;advection;externalForce;viscous;divergence;poisson;pressure;constructor(e){this.options={iterations_poisson:32,iterations_viscous:32,mouse_force:20,resolution:.5,cursor_size:100,viscous:30,isBounce:!1,dt:.014,isViscous:!1,BFECC:!0,...e},this.init()}init(){this.calcSize(),this.createAllFBO(),this.createShaderPass()}getFloatType(){return/(iPad|iPhone|iPod)/i.test(navigator.userAgent)?r.HalfFloatType:r.FloatType}createAllFBO(){let e={type:this.getFloatType(),depthBuffer:!1,stencilBuffer:!1,minFilter:r.LinearFilter,magFilter:r.LinearFilter,wrapS:r.ClampToEdgeWrapping,wrapT:r.ClampToEdgeWrapping};for(let t in this.fbos)this.fbos[t]=new r.WebGLRenderTarget(this.fboSize.x,this.fboSize.y,e)}createShaderPass(){this.advection=new N({cellScale:this.cellScale,fboSize:this.fboSize,dt:this.options.dt,src:this.fbos.vel_0,dst:this.fbos.vel_1}),this.externalForce=new O({cellScale:this.cellScale,cursor_size:this.options.cursor_size,dst:this.fbos.vel_1}),this.viscous=new X({cellScale:this.cellScale,boundarySpace:this.boundarySpace,viscous:this.options.viscous,src:this.fbos.vel_1,dst:this.fbos.vel_viscous1,dst_:this.fbos.vel_viscous0,dt:this.options.dt}),this.divergence=new Y({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src:this.fbos.vel_viscous0,dst:this.fbos.div,dt:this.options.dt}),this.poisson=new $({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src:this.fbos.div,dst:this.fbos.pressure_1,dst_:this.fbos.pressure_0}),this.pressure=new j({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src_p:this.fbos.pressure_0,src_v:this.fbos.vel_viscous0,dst:this.fbos.vel_0,dt:this.options.dt})}calcSize(){let e=Math.max(1,Math.round(this.options.resolution*o.width)),t=Math.max(1,Math.round(this.options.resolution*o.height));this.cellScale.set(1/e,1/t),this.fboSize.set(e,t)}resize(){for(let e in this.calcSize(),this.fbos)this.fbos[e].setSize(this.fboSize.x,this.fboSize.y)}update(){this.options.isBounce?this.boundarySpace.set(0,0):this.boundarySpace.copy(this.cellScale),this.advection.update({dt:this.options.dt,isBounce:this.options.isBounce,BFECC:this.options.BFECC}),this.externalForce.update({cursor_size:this.options.cursor_size,mouse_force:this.options.mouse_force,cellScale:this.cellScale});let e=this.fbos.vel_1;this.options.isViscous&&(e=this.viscous.update({viscous:this.options.viscous,iterations:this.options.iterations_viscous,dt:this.options.dt})),this.divergence.update({vel:e});let t=this.poisson.update({iterations:this.options.iterations_poisson});this.pressure.update({vel:e,pressure:t})}}class K{simulation;scene;camera;output;constructor(){this.simulation=new q,this.scene=new r.Scene,this.camera=new r.Camera,this.output=new r.Mesh(new r.PlaneGeometry(2,2),new r.RawShaderMaterial({vertexShader:R,fragmentShader:I,transparent:!0,depthWrite:!1,uniforms:{velocity:{value:this.simulation.fbos.vel_0.texture},boundarySpace:{value:new r.Vector2},palette:{value:t},bgColor:{value:i}}})),this.scene.add(this.output)}resize(){this.simulation.resize()}render(){o.renderer&&(o.renderer.setRenderTarget(null),o.renderer.render(this.scene,this.camera))}update(){this.simulation.update(),this.render()}}class J{props;output;autoDriver;lastUserInteraction=performance.now();running=!1;_loop=this.loop.bind(this);_resize=this.resize.bind(this);_onVisibility;constructor(e){this.props=e,o.init(e.$wrapper),y.init(e.$wrapper),y.autoIntensity=e.autoIntensity,y.takeoverDuration=e.takeoverDuration,y.onInteract=()=>{this.lastUserInteraction=performance.now(),this.autoDriver&&this.autoDriver.forceStop()},this.autoDriver=new E(y,this,{enabled:e.autoDemo,speed:e.autoSpeed,resumeDelay:e.autoResumeDelay,rampDuration:e.autoRampDuration}),this.init(),window.addEventListener("resize",this._resize),this._onVisibility=()=>{document.hidden?this.pause():F.current&&this.start()},document.addEventListener("visibilitychange",this._onVisibility)}init(){o.renderer&&(this.props.$wrapper.prepend(o.renderer.domElement),this.output=new K)}resize(){o.resize(),this.output.resize()}render(){this.autoDriver&&this.autoDriver.update(),y.update(),o.update(),this.output.update()}loop(){this.running&&(this.render(),M.current=requestAnimationFrame(this._loop))}start(){this.running||(this.running=!0,this._loop())}pause(){this.running=!1,M.current&&(cancelAnimationFrame(M.current),M.current=null)}dispose(){try{if(window.removeEventListener("resize",this._resize),this._onVisibility&&document.removeEventListener("visibilitychange",this._onVisibility),y.dispose(),o.renderer){let e=o.renderer.domElement;e&&e.parentNode&&e.parentNode.removeChild(e),o.renderer.dispose()}}catch{}}}let Q=D.current;Q.style.position=Q.style.position||"relative",Q.style.overflow=Q.style.overflow||"hidden";let Z=new J({$wrapper:Q,autoDemo:g,autoSpeed:x,autoIntensity:w,takeoverDuration:_,autoResumeDelay:b,autoRampDuration:S});T.current=Z,(()=>{if(!T.current)return;let t=T.current.output?.simulation;if(!t)return;let i=t.options.resolution;Object.assign(t.options,{mouse_force:e,cursor_size:n,isViscous:a,viscous:u,iterations_viscous:l,iterations_poisson:c,dt:h,BFECC:v,resolution:p,isBounce:d}),p!==i&&t.resize()})(),Z.start();let ee=new IntersectionObserver(e=>{let t=e[0],i=t.isIntersecting&&t.intersectionRatio>0;F.current=i,T.current&&(i&&!document.hidden?T.current.start():T.current.pause())},{threshold:[0,.01,.1]});ee.observe(Q),z.current=ee;let et=new ResizeObserver(()=>{T.current&&(A.current&&cancelAnimationFrame(A.current),A.current=requestAnimationFrame(()=>{T.current&&T.current.resize()}))});return et.observe(Q),C.current=et,()=>{if(M.current&&cancelAnimationFrame(M.current),C.current)try{C.current.disconnect()}catch{}if(z.current)try{z.current.disconnect()}catch{}T.current&&T.current.dispose(),T.current=null}},[v,n,h,d,a,c,l,e,p,u,m,g,x,w,_,b,S]),(0,i.useEffect)(()=>{let t=T.current;if(!t)return;let i=t.output?.simulation;if(!i)return;let r=i.options.resolution;Object.assign(i.options,{mouse_force:e,cursor_size:n,isViscous:a,viscous:u,iterations_viscous:l,iterations_poisson:c,dt:h,BFECC:v,resolution:p,isBounce:d}),t.autoDriver&&(t.autoDriver.enabled=g,t.autoDriver.speed=x,t.autoDriver.resumeDelay=b,t.autoDriver.rampDurationMs=1e3*S,t.autoDriver.mouse&&(t.autoDriver.mouse.autoIntensity=w,t.autoDriver.mouse.takeoverDuration=_)),p!==r&&i.resize()},[e,n,a,u,l,c,h,v,p,d,g,x,w,_,b,S]),(0,t.jsx)("div",{ref:D,className:`w-full h-full relative overflow-hidden pointer-events-none touch-none ${y||""}`,style:f})}e.s(["default",()=>n])},9176,e=>{e.n(e.i(90363))}]);