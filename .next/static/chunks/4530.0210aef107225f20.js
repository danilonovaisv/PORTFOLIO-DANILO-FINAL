"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4530],{24530:(e,t,n)=>{n.r(t),n.d(t,{default:()=>v});var i=n(95155),o=n(12115),a=n(97650);let r={cyan:65535,lime:65280,magenta:0xff00ff,yellow:0xffff00,orange:0xff4500,pink:0xff1493,purple:9699539,blue:33023,green:65408,red:0xff0040,teal:65450,violet:9055202},l={bodyColor:991271,glowColor:"blue",eyeGlowColor:"violet",ghostOpacity:.88,ghostScale:2.4,emissiveIntensity:5.8,pulseSpeed:1.6,pulseIntensity:.6,eyeGlowIntensity:4.5,eyeGlowDecay:.95,eyeGlowResponse:.31,rimLightIntensity:1.8,followSpeed:.05,wobbleAmount:.35,floatSpeed:1.6,movementThreshold:.07,particleDecayRate:.005,particleColor:"violet",particleCreationRate:5,createParticlesOnlyWhenMoving:!0,revealRadius:37,fadeStrength:1.7,baseOpacity:.9,revealOpacity:.05,fireflyGlowIntensity:4.3,fireflySpeed:.09,analogIntensity:.9,analogGrain:.4,analogBleeding:.9,analogVSync:1.7,analogScanlines:1,analogVignette:2.4,analogJitter:.5,limboMode:!1};var s=n(29625),d=n(7167),u=n(81908),c=n(14382),f=n(42861),m=n(77861);let p={uniforms:{tDiffuse:{value:null},uTime:{value:0},uResolution:{value:new a.I9Y(window.innerWidth,window.innerHeight)},uAnalogGrain:{value:.4},uAnalogBleeding:{value:1},uAnalogVSync:{value:1},uAnalogScanlines:{value:1},uAnalogVignette:{value:1},uAnalogJitter:{value:.4},uAnalogIntensity:{value:.6},uLimboMode:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform float uAnalogGrain;
    uniform float uAnalogBleeding;
    uniform float uAnalogVSync;
    uniform float uAnalogScanlines;
    uniform float uAnalogVignette;
    uniform float uAnalogJitter;
    uniform float uAnalogIntensity;
    uniform float uLimboMode;
    varying vec2 vUv;
    
    float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123); }
    float random(float x) { return fract(sin(x) * 43758.5453123); }
    float gaussian(float z, float u, float o) { return (1.0 / (o * sqrt(2.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o)))); }
    
    vec3 grain(vec2 uv, float time, float intensity) {
      float seed = dot(uv, vec2(12.9898, 78.233));
      float noise = fract(sin(seed) * 43758.5453 + time * 2.0);
      noise = gaussian(noise, 0.0, 0.5 * 0.5);
      return vec3(noise) * intensity;
    }
    
    void main() {
      vec2 uv = vUv;
      float time = uTime * 1.8;
      vec2 jitteredUV = uv;
      if (uAnalogJitter > 0.01) {
        float jitterAmount = (random(vec2(floor(time * 60.0))) - 0.5) * 0.003 * uAnalogJitter * uAnalogIntensity;
        jitteredUV.x += jitterAmount;
        jitteredUV.y += (random(vec2(floor(time * 30.0) + 1.0)) - 0.5) * 0.001 * uAnalogJitter * uAnalogIntensity;
      }
      if (uAnalogVSync > 0.01) {
        float vsyncRoll = sin(time * 2.0 + uv.y * 100.0) * 0.02 * uAnalogVSync * uAnalogIntensity;
        float vsyncChance = step(0.95, random(vec2(floor(time * 4.0))));
        jitteredUV.y += vsyncRoll * vsyncChance;
      }
      vec4 color = texture2D(tDiffuse, jitteredUV);
      if (uAnalogBleeding > 0.01) {
        float bleedAmount = 0.012 * uAnalogBleeding * uAnalogIntensity;
        float offsetPhase = time * 1.5 + uv.y * 20.0;
        vec2 redOffset = vec2(sin(offsetPhase) * bleedAmount, 0.0);
        vec2 blueOffset = vec2(-sin(offsetPhase * 1.1) * bleedAmount * 0.8, 0.0);
        float r = texture2D(tDiffuse, jitteredUV + redOffset).r;
        float g = texture2D(tDiffuse, jitteredUV).g;
        float b = texture2D(tDiffuse, jitteredUV + blueOffset).b;
        color = vec4(r, g, b, color.a);
      }
      if (uAnalogGrain > 0.01) {
        vec3 grainEffect = grain(uv, time, 0.075 * uAnalogGrain * uAnalogIntensity);
        grainEffect *= (1.0 - color.rgb);
        color.rgb += grainEffect;
      }
      if (uAnalogScanlines > 0.01) {
        float scanlineFreq = 600.0 + uAnalogScanlines * 400.0;
        float scanlinePattern = sin(uv.y * scanlineFreq) * 0.5 + 0.5;
        float scanlineIntensity = 0.1 * uAnalogScanlines * uAnalogIntensity;
        color.rgb *= (1.0 - scanlinePattern * scanlineIntensity);
        float horizontalLines = sin(uv.y * scanlineFreq * 0.1) * 0.02 * uAnalogScanlines * uAnalogIntensity;
        color.rgb *= (1.0 - horizontalLines);
      }
      if (uAnalogVignette > 0.01) {
        vec2 vignetteUV = (uv - 0.5) * 2.0;
        float vignette = 1.0 - dot(vignetteUV, vignetteUV) * 0.3 * uAnalogVignette * uAnalogIntensity;
        color.rgb *= vignette;
      }
      if (uLimboMode > 0.5) {
        float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        color.rgb = vec3(gray);
      }
      gl_FragColor = color;
    }
  `};function v(){let e=(0,o.useRef)(null),t=(0,o.useRef)(null),n=(0,o.useRef)(null),v=function(){let[e,t]=(0,o.useState)("high");return(0,o.useEffect)(()=>{let e,n=navigator,i=/iPhone|iPad|iPod|Android/i.test(n.userAgent),o=n.hardwareConcurrency&&n.hardwareConcurrency<=4,a=n.deviceMemory&&n.deviceMemory<4;if(i||o||a)return void t("low");if(window.devicePixelRatio>2)return void t("medium");let r=0,l=performance.now(),s=!0,d=()=>{r++;let n=performance.now();n>=l+1e3&&(30>Math.round(1e3*r/(n-l))&&s&&t(e=>"low"===e?"low":"medium"),r=0,l=n),e=requestAnimationFrame(d)};return e=requestAnimationFrame(d),()=>{s=!1,cancelAnimationFrame(e)}},[]),({high:{quality:"high",fireflyCount:20,particleCount:50,enablePostProcessing:!0,pixelRatio:Math.min(window.devicePixelRatio,2)},medium:{quality:"medium",fireflyCount:12,particleCount:25,enablePostProcessing:!1,pixelRatio:1.5},low:{quality:"low",fireflyCount:6,particleCount:10,enablePostProcessing:!1,pixelRatio:1}})[e]}(),w=function(){let[e,t]=(0,o.useState)(0),[n,i]=(0,o.useState)(!1),r=(0,o.useRef)(new a.I9Y),l=(0,o.useRef)(void 0),s="ontouchstart"in window||navigator.maxTouchPoints>0,d=window.innerWidth<=768;return(0,o.useEffect)(()=>{let e=(e,t)=>{i(!0),r.current.x=e/window.innerWidth*2-1,r.current.y=-(2*(t/window.innerHeight))+1,l.current&&clearTimeout(l.current),l.current=setTimeout(()=>{i(!1)},3e3)},n=t=>{e(t.clientX,t.clientY)},o=t=>{t.touches.length>0&&e(t.touches[0].clientX,t.touches[0].clientY)},a=()=>{t(window.scrollY)};return window.addEventListener("mousemove",n),window.addEventListener("touchstart",o,{passive:!0}),window.addEventListener("touchmove",o,{passive:!0}),window.addEventListener("scroll",a,{passive:!0}),()=>{window.removeEventListener("mousemove",n),window.removeEventListener("touchstart",o),window.removeEventListener("touchmove",o),window.removeEventListener("scroll",a),l.current&&clearTimeout(l.current)}},[]),{mouse:r.current,scrollY:e,hasReceivedInput:n,isMobile:s||d}}();return(0,o.useEffect)(()=>{let i,o,y,g,h,M,x,A,P,b,S,E=e.current;if(!E)return;let C=new a.B69,V=new a.Pq0,I={isComplete:!1,updateProgress:e=>{let t=Math.min(e,5);n.current&&(n.current.style.width=`${t/5*100}%`)},complete:e=>{I.isComplete||(I.isComplete=!0,I.updateProgress(5),setTimeout(()=>{t.current&&t.current.classList.add("fade-out"),e.classList.add("fade-in"),setTimeout(()=>{t.current&&(t.current.style.display="none")},1e3)},1500))}},R=new a.Z58,G=((o=new a.ubm(75,window.innerWidth/window.innerHeight,.1,1e3)).position.z=20,o);I.updateProgress(1);let z=((y=new s.WebGLRenderer({antialias:!0,powerPreference:"high-performance",alpha:!0,premultipliedAlpha:!1,stencil:!1,depth:!0,preserveDrawingBuffer:!1})).setSize(window.innerWidth,window.innerHeight),y.toneMapping=a.FV,y.toneMappingExposure=.9,y.setClearColor(0,0),y.domElement.style.position="absolute",y.domElement.style.top="0",y.domElement.style.left="0",y.domElement.style.zIndex="0",y.domElement.style.pointerEvents="none",y.domElement.style.background="transparent",y);E.appendChild(z.domElement),I.updateProgress(2);let{composer:L,bloomPass:U,analogDecayPass:j}=(g=new d.s(z),h=new u.A(R,G),g.addPass(h),M=new c.C(new a.I9Y(window.innerWidth,window.innerHeight),.3,1.25,0),g.addPass(M),x=new m.p(p),g.addPass(x),A=new f.X,g.addPass(A),{composer:g,bloomPass:M,analogDecayPass:x});I.updateProgress(3);let{ambientLight:F,rimLight1:O,rimLight2:W}=(P=new a.$p8(657966,.08),(b=new a.ZyN(4886754,l.rimLightIntensity)).position.set(-8,6,-4),(S=new a.ZyN(5301186,.7*l.rimLightIntensity)).position.set(8,-4,-6),{ambientLight:P,rimLight1:b,rimLight2:S});R.add(F,O,W);let T=function(e=l){let t=new a.bdM(300,300),n=new a.BKk({uniforms:{ghostPosition:{value:new a.Pq0(0,0,0)},revealRadius:{value:e.revealRadius},fadeStrength:{value:e.fadeStrength},baseOpacity:{value:e.baseOpacity},revealOpacity:{value:e.revealOpacity},time:{value:0}},vertexShader:`
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 ghostPosition;
      uniform float revealRadius;
      uniform float fadeStrength;
      uniform float baseOpacity;
      uniform float revealOpacity;
      uniform float time;
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      void main() {
        float dist = distance(vWorldPosition.xy, ghostPosition.xy);
        float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
        float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
        reveal = pow(reveal, fadeStrength);
        float opacity = mix(revealOpacity, baseOpacity, reveal);
        gl_FragColor = vec4(0.001, 0.001, 0.002, opacity);
      }
    `,transparent:!0,depthWrite:!1}),i=new a.eaF(t,n);return i.position.z=-50,i.renderOrder=-100,i}(l);R.add(T);let q=new a.YJl;R.add(q);let B=function(e=l){let t=new a.Gu$(2,40,40),n=t.getAttribute("position").array;for(let e=0;e<n.length;e+=3)if(n[e+1]<-.2){let t=n[e],i=n[e+2],o=.35*Math.sin(5*t),a=.25*Math.cos(4*i),r=.15*Math.sin((t+i)*3);n[e+1]=-2+o+a+r}t.computeVertexNormals();let i=new a._4j({color:e.bodyColor,transparent:!0,opacity:e.ghostOpacity,emissive:r[e.glowColor],emissiveIntensity:e.emissiveIntensity,roughness:.02,metalness:0,side:a.$EB,alphaTest:.1});return new a.eaF(t,i)}(l);q.add(B),I.updateProgress(4);let D=function(e,t=l){let n=new a.YJl;e.add(n);let i=new a.Gu$(.45,16,16),o=new a.V9B({color:0}),s=new a.eaF(i,o);s.position.set(-.7,.6,1.9),s.scale.set(1.1,1,.6),n.add(s);let d=new a.eaF(i,o);d.position.set(.7,.6,1.9),d.scale.set(1.1,1,.6),n.add(d);let u=new a.Gu$(.3,12,12),c=new a.V9B({color:r[t.eyeGlowColor],transparent:!0,opacity:0}),f=new a.eaF(u,c);f.position.set(-.7,.6,2),n.add(f);let m=new a.V9B({color:r[t.eyeGlowColor],transparent:!0,opacity:0}),p=new a.eaF(u,m);p.position.set(.7,.6,2),n.add(p);let v=new a.Gu$(.525,12,12),w=new a.V9B({color:r[t.eyeGlowColor],transparent:!0,opacity:0,side:a.hsX}),y=new a.eaF(v,w);y.position.set(-.7,.6,1.95),n.add(y);let g=new a.V9B({color:r[t.eyeGlowColor],transparent:!0,opacity:0,side:a.hsX}),h=new a.eaF(v,g);return h.position.set(.7,.6,1.95),n.add(h),{leftEyeMaterial:c,rightEyeMaterial:m,leftOuterGlowMaterial:w,rightOuterGlowMaterial:g}}(q,l),H=function(e,t,n=l){let i=new a.Gu$(.035,4,4),o=new a.V9B({color:0xffff88,transparent:!0,opacity:.8}),r=Math.min(t,60),s=new a.ZLX(i,o,r);s.instanceMatrix.setUsage(a.Vnu),e.add(s);let d=[];for(let e=0;e<r;e++)d.push({position:new a.Pq0((Math.random()-.5)*45,(Math.random()-.5)*35,(Math.random()-.5)*25),velocity:new a.Pq0((Math.random()-.5)*n.fireflySpeed*.8,(Math.random()-.5)*n.fireflySpeed*.8,(Math.random()-.5)*n.fireflySpeed*.8),phase:Math.random()*Math.PI*2,speed:.5+.5*Math.random()});let u=new a.HiM(0xffff44,1.5,15,2);return e.add(u),{mesh:s,data:d,light:u,count:r}}(R,5*v.particleCount,l),N=function(e){let t=new a.Gu$(.05,6,6),n=new a.V9B({color:0xffffff,transparent:!0,opacity:1}),i=new a.ZLX(t,n,500);i.instanceMatrix.setUsage(a.Vnu),e.add(i);let o=[],r=new a.B69;for(let e=0;e<500;e++)r.position.set(0,-1e3,0),r.scale.set(0,0,0),r.updateMatrix(),i.setMatrixAt(e,r.matrix),o[e]={velocity:new a.Pq0,currentPos:new a.Pq0,life:0,decay:0,rotationSpeed:{x:0,y:0,z:0}};return{mesh:i,data:o,lastSpawnTime:0}}(R),Y=()=>{G.aspect=window.innerWidth/window.innerHeight,G.updateProjectionMatrix(),z.setSize(window.innerWidth,window.innerHeight),L.setSize(window.innerWidth,window.innerHeight),U.setSize(window.innerWidth,window.innerHeight),j.uniforms.uResolution.value.set(window.innerWidth,window.innerHeight)};window.addEventListener("resize",Y);let $=0,_=0,J=0,k=!1;I.updateProgress(5),setTimeout(()=>{for(let e=0;e<3;e++)L.render();k=!0,I.complete(z.domElement)},100);let X=e=>{let t,n,o;if(i=requestAnimationFrame(X),!k)return;let r=e-_;if(_=e,r>100)return;$+=r/16.67*.01,j.uniforms.uTime.value=$,j.uniforms.uLimboMode.value=+!!l.limboMode;let s=9*Math.sin(.85*$)+2*Math.cos(.85*$*.5),d=6*Math.sin(.85*$*.7+Math.PI/2)+1.5*Math.sin(.85*$*1.3);w.hasReceivedInput?(t=12*w.mouse.x+.1*s,n=8*w.mouse.y+.1*d+-(w.scrollY/window.innerHeight*15)):(t=s,n=d+-(w.scrollY/window.innerHeight*15)),V.copy(q.position),q.position.x+=(t-q.position.x)*l.followSpeed,q.position.y+=(n-q.position.y)*l.followSpeed;let u=V.distanceTo(q.position);J=J*l.eyeGlowDecay+u*(1-l.eyeGlowDecay),q.position.y+=.03*Math.sin($*l.floatSpeed*1.5),function(e,t,n=l){let i=e.material,o=Math.sin(t*n.pulseSpeed)*n.pulseIntensity;i.emissiveIntensity=n.emissiveIntensity+o}(B,$,l),c=q.position,f=$,(o=T.material).uniforms.ghostPosition.value.copy(c),o.uniforms.time.value=f,function(e,t,n=l){let i=t>n.movementThreshold,o=i?2*n.eyeGlowResponse:n.eyeGlowResponse,a=e.leftEyeMaterial.opacity+(!!i-e.leftEyeMaterial.opacity)*o;e.leftEyeMaterial.opacity=a,e.rightEyeMaterial.opacity=a,e.leftOuterGlowMaterial.opacity=.3*a,e.rightOuterGlowMaterial.opacity=.3*a}(D,J,l),function(e,t,n,i,o,r,s,d,u=l){let c=r?n>.003:u.createParticlesOnlyWhenMoving?n>.005&&s:n>.005;if(c&&i-e.lastSpawnTime>100){let o=Math.min(u.particleCreationRate||5,Math.max(1,Math.floor(100*n))),r=0;for(let n=0;n<500&&r<o;n++)e.data[n].life<=0&&(!function(e,t,n,i=l){let o=e.data[t];o.life=1,o.decay=.003*Math.random()+i.particleDecayRate;let r=new a.Pq0;r.copy(n),r.z-=.8+.6*Math.random(),r.x+=(Math.random()-.5)*3.5,r.y+=(Math.random()-.5)*3.5-.8,o.currentPos.copy(r),o.rotationSpeed={x:(Math.random()-.5)*.015,y:(Math.random()-.5)*.015,z:(Math.random()-.5)*.015},o.velocity.set((Math.random()-.5)*.012,(Math.random()-.5)*.012-.002,(Math.random()-.5)*.012-.006)}(e,n,t,u),r++);e.lastSpawnTime=i}let f=0;for(let t=0;t<500;t++){let n=e.data[t];if(n.life>0){f++,n.life-=n.decay;let i=n.currentPos;i.add(n.velocity),i.x+=8e-4*Math.cos(1.8*o+i.y),d.position.copy(i);let a=(.6+.7*Math.random())*(.85*Math.max(0,n.life));d.scale.set(a,a,a),d.rotation.x+=n.rotationSpeed.x,d.rotation.y+=n.rotationSpeed.y,d.rotation.z+=n.rotationSpeed.z,d.updateMatrix(),e.mesh.setMatrixAt(t,d.matrix)}else d.position.set(0,-9999,0),d.scale.set(0,0,0),d.updateMatrix(),e.mesh.setMatrixAt(t,d.matrix)}(f>0||c)&&(e.mesh.instanceMatrix.needsUpdate=!0)}(N,q.position,J,e,$,w.isMobile,w.hasReceivedInput,C,l);var c,f,m=$;for(let e=0;e<H.count;e++){let t=H.data[e];t.position.add(t.velocity),Math.abs(t.position.x)>25&&(t.velocity.x*=-1),Math.abs(t.position.y)>20&&(t.velocity.y*=-1),Math.abs(t.position.z)>15&&(t.velocity.z*=-1),C.position.copy(t.position);let n=1+.3*Math.sin(m*t.speed+t.phase);C.scale.set(n,n,n),C.updateMatrix(),H.mesh.setMatrixAt(e,C.matrix)}H.mesh.instanceMatrix.needsUpdate=!0,H.light.position.x=10*Math.sin(.5*m),H.light.position.y=5*Math.cos(.3*m),v.enablePostProcessing?L.render():z.render(R,G)};return X(0),()=>{cancelAnimationFrame(i),window.removeEventListener("resize",Y),E.contains(z.domElement)&&E.removeChild(z.domElement),R.traverse(e=>{e instanceof a.eaF&&(e.geometry.dispose(),e.material instanceof a.imn?e.material.dispose():Array.isArray(e.material)&&e.material.forEach(e=>e.dispose()))}),z.dispose(),L.dispose()}},[v]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{ref:t,className:"preloader-overlay absolute inset-0 z-50 flex items-center justify-center bg-[#070b15] transition-opacity duration-1000",children:(0,i.jsx)("div",{className:"w-64",children:(0,i.jsx)("div",{className:"h-0.5 w-full overflow-hidden bg-white/10",children:(0,i.jsx)("div",{ref:n,className:"h-full bg-blue-500 transition-all duration-300 ease-out w-0"})})})}),(0,i.jsx)("div",{ref:e,className:"absolute inset-0 z-0 h-full w-full"})]})}}}]);