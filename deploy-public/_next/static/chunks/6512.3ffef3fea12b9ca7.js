"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6512],{36512:(e,t,o)=>{o.r(t),o.d(t,{default:()=>f});var i=o(95155),n=o(12115),a=o(97650),r=o(29625),l=o(7167),s=o(81908),d=o(14382),u=o(42861),c=o(77861);function f(){let e=(0,n.useRef)(null),t=(0,n.useRef)(null),o=(0,n.useRef)(null),f=function(){let[e,t]=(0,n.useState)("high");return(0,n.useEffect)(()=>{let e,o=navigator,i=/iPhone|iPad|iPod|Android/i.test(o.userAgent),n=o.hardwareConcurrency&&o.hardwareConcurrency<=4,a=o.deviceMemory&&o.deviceMemory<4;if(i||n||a)return void t("low");if(window.devicePixelRatio>2)return void t("medium");let r=0,l=performance.now(),s=!0,d=()=>{r++;let o=performance.now();o>=l+1e3&&(30>Math.round(1e3*r/(o-l))&&s&&t(e=>"low"===e?"low":"medium"),r=0,l=o),e=requestAnimationFrame(d)};return e=requestAnimationFrame(d),()=>{s=!1,cancelAnimationFrame(e)}},[]),({high:{quality:"high",fireflyCount:20,particleCount:50,enablePostProcessing:!0,pixelRatio:Math.min(window.devicePixelRatio,2)},medium:{quality:"medium",fireflyCount:12,particleCount:25,enablePostProcessing:!1,pixelRatio:1.5},low:{quality:"low",fireflyCount:6,particleCount:10,enablePostProcessing:!1,pixelRatio:1}})[e]}();return(0,n.useEffect)(()=>{let i,n,p,m,v,g,w,h,y,M,x,b,A,P,S,E,C,D=e.current;if(!D)return;let V={loadingSteps:0,totalSteps:5,isComplete:!1,updateProgress:e=>{let t=Math.min(e,5);o.current&&(o.current.style.width=`${t/5*100}%`)},complete:e=>{V.isComplete||(V.isComplete=!0,V.updateProgress(5),setTimeout(()=>{t.current&&t.current.classList.add("fade-out"),e.classList.add("fade-in"),setTimeout(()=>{t.current&&(t.current.style.display="none")},1e3)},1500))}},I=new a.Z58,G=new a.ubm(75,window.innerWidth/window.innerHeight,.1,1e3);G.position.z=20,V.updateProgress(1);let R=new r.WebGLRenderer({antialias:!0,powerPreference:"high-performance",alpha:!0,premultipliedAlpha:!1,stencil:!1,depth:!0,preserveDrawingBuffer:!1});R.setSize(window.innerWidth,window.innerHeight),R.toneMapping=a.FV,R.toneMappingExposure=.9,R.setClearColor(0,0),R.domElement.style.position="absolute",R.domElement.style.top="0",R.domElement.style.left="0",R.domElement.style.zIndex="0",R.domElement.style.pointerEvents="none",R.domElement.style.background="transparent",D.appendChild(R.domElement),V.updateProgress(2);let j=new l.s(R),F=new s.A(I,G);j.addPass(F);let L=new d.C(new a.I9Y(window.innerWidth,window.innerHeight),.3,1.25,0);j.addPass(L),V.updateProgress(3);let O={uniforms:{tDiffuse:{value:null},uTime:{value:0},uResolution:{value:new a.I9Y(window.innerWidth,window.innerHeight)},uAnalogGrain:{value:.4},uAnalogBleeding:{value:1},uAnalogVSync:{value:1},uAnalogScanlines:{value:1},uAnalogVignette:{value:1},uAnalogJitter:{value:.4},uAnalogIntensity:{value:.6},uLimboMode:{value:0}},vertexShader:`
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
      `},z=new c.p(O);j.addPass(z);let U=new u.X;j.addPass(U);let W={bodyColor:991271,glowColor:"blue",eyeGlowColor:"violet",ghostOpacity:.88,ghostScale:2.4,emissiveIntensity:5.8,pulseSpeed:1.6,pulseIntensity:.6,eyeGlowIntensity:4.5,eyeGlowDecay:.95,eyeGlowResponse:.31,rimLightIntensity:1.8,followSpeed:.05,wobbleAmount:.35,floatSpeed:1.6,movementThreshold:.07,particleCount:5*f.particleCount,particleDecayRate:.005,particleColor:"violet",createParticlesOnlyWhenMoving:!0,particleCreationRate:"low"===f.quality?2:5,revealRadius:37,fadeStrength:1.7,baseOpacity:.9,revealOpacity:.05,fireflyGlowIntensity:4.3,fireflySpeed:.09,analogIntensity:.9,analogGrain:.4,analogBleeding:.9,analogVSync:1.7,analogScanlines:1,analogVignette:2.4,analogJitter:.5,limboMode:!1},B={cyan:65535,lime:65280,magenta:0xff00ff,yellow:0xffff00,orange:0xff4500,pink:0xff1493,purple:9699539,blue:33023,green:65408,red:0xff0040,teal:65450,violet:9055202},N=new a.bdM(300,300),T=new a.BKk({uniforms:{ghostPosition:{value:new a.Pq0(0,0,0)},revealRadius:{value:W.revealRadius},fadeStrength:{value:W.fadeStrength},baseOpacity:{value:W.baseOpacity},revealOpacity:{value:W.revealOpacity},time:{value:0}},vertexShader:`
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
      `,transparent:!0,depthWrite:!1}),H=new a.eaF(N,T);H.position.z=-50,H.renderOrder=-100,I.add(H);let q=new a.$p8(657966,.08);I.add(q);let J=new a.YJl;I.add(J);let Y=new a.Gu$(2,40,40),$=Y.getAttribute("position").array;for(let e=0;e<$.length;e+=3)if($[e+1]<-.2){let t=$[e],o=$[e+2],i=.35*Math.sin(5*t),n=.25*Math.cos(4*o),a=.15*Math.sin((t+o)*3);$[e+1]=-2+i+n+a}Y.computeVertexNormals();let k=new a._4j({color:W.bodyColor,transparent:!0,opacity:W.ghostOpacity,emissive:B[W.glowColor],emissiveIntensity:W.emissiveIntensity,roughness:.02,metalness:0,side:a.$EB,alphaTest:.1}),_=new a.eaF(Y,k);J.add(_);let X=new a.ZyN(4886754,W.rimLightIntensity);X.position.set(-8,6,-4),I.add(X);let Z=new a.ZyN(5301186,.7*W.rimLightIntensity);Z.position.set(8,-4,-6),I.add(Z),V.updateProgress(4);let K=(p=new a.YJl,J.add(p),m=new a.Gu$(.45,16,16),v=new a.V9B({color:0}),(g=new a.eaF(m,v)).position.set(-.7,.6,1.9),g.scale.set(1.1,1,.6),p.add(g),(w=new a.eaF(m,v)).position.set(.7,.6,1.9),w.scale.set(1.1,1,.6),p.add(w),h=new a.Gu$(.3,12,12),y=new a.V9B({color:B[W.eyeGlowColor],transparent:!0,opacity:0}),(M=new a.eaF(h,y)).position.set(-.7,.6,2),p.add(M),x=new a.V9B({color:B[W.eyeGlowColor],transparent:!0,opacity:0}),(b=new a.eaF(h,x)).position.set(.7,.6,2),p.add(b),A=new a.Gu$(.525,12,12),P=new a.V9B({color:B[W.eyeGlowColor],transparent:!0,opacity:0,side:a.hsX}),(S=new a.eaF(A,P)).position.set(-.7,.6,1.95),p.add(S),E=new a.V9B({color:B[W.eyeGlowColor],transparent:!0,opacity:0,side:a.hsX}),(C=new a.eaF(A,E)).position.set(.7,.6,1.95),p.add(C),{leftEyeMaterial:y,rightEyeMaterial:x,leftOuterGlowMaterial:P,rightOuterGlowMaterial:E}),Q=[],ee=new a.YJl;I.add(ee);let et=f.fireflyCount;for(let e=0;e<et;e++){let e=new a.Gu$(.02,2,2),t=new a.V9B({color:0xffff44,transparent:!0,opacity:.9}),o=new a.eaF(e,t);o.position.set((Math.random()-.5)*40,(Math.random()-.5)*30,(Math.random()-.5)*20);let i=new a.Gu$(.08,8,8),n=new a.V9B({color:0xffff88,transparent:!0,opacity:.4,side:a.hsX}),r=new a.eaF(i,n);o.add(r);let l=new a.HiM(0xffff44,.8,3,2);o.add(l),o.userData={velocity:new a.Pq0((Math.random()-.5)*W.fireflySpeed,(Math.random()-.5)*W.fireflySpeed,(Math.random()-.5)*W.fireflySpeed),phase:Math.random()*Math.PI*2,pulseSpeed:2+3*Math.random(),glowMat:n,fireflyMat:t,light:l},ee.add(o),Q.push(o)}let eo=[],ei=new a.YJl;I.add(ei);let en=[],ea=[new a.Gu$(.05,6,6),new a.Zpd(.04,0),new a.Ufg(.045,0)],er=new a.V9B({color:B[W.particleColor],transparent:!0,opacity:0,alphaTest:.1});for(let e=0;e<100;e++){let e=ea[Math.floor(Math.random()*ea.length)],t=new a.eaF(e,er.clone());t.visible=!1,ei.add(t),en.push(t)}function el(){let e;if(en.length>0)(e=en.pop())&&(e.visible=!0);else{if(!(eo.length<W.particleCount))return null;let t=ea[Math.floor(Math.random()*ea.length)];e=new a.eaF(t,er.clone()),ei.add(e)}if(!e)return null;let t=new a.Q1f(B[W.particleColor]);t.offsetHSL(.1*Math.random()-.05,0,0);let o=e.material;o.color=t,e.position.copy(J.position),e.position.z-=.8+.6*Math.random(),e.position.x+=(Math.random()-.5)*3.5,e.position.y+=(Math.random()-.5)*3.5-.8;let i=.6+.7*Math.random();e.scale.set(i,i,i),e.rotation.set(6*Math.random(),6*Math.random(),6*Math.random()),e.userData.life=1,e.userData.decay=.003*Math.random()+W.particleDecayRate,e.userData.rotationSpeed={x:(Math.random()-.5)*.015,y:(Math.random()-.5)*.015,z:(Math.random()-.5)*.015},e.userData.velocity={x:(Math.random()-.5)*.012,y:(Math.random()-.5)*.012-.002,z:(Math.random()-.5)*.012-.006},o.opacity=.9*Math.random(),eo.push(e)}let es="ontouchstart"in window||navigator.maxTouchPoints>0,ed=window.innerWidth<=768,eu=es||ed,ec=0,ef=()=>{ec=window.scrollY};window.addEventListener("scroll",ef,{passive:!0});let ep=new a.I9Y,em=!1,ev=(e,t)=>{em=!0,ep.x=e/window.innerWidth*2-1,ep.y=-(2*(t/window.innerHeight))+1,clearTimeout(i),i=setTimeout(()=>{em=!1},3e3)},eg=e=>{ev(e.clientX,e.clientY)},ew=e=>{e.touches.length>0&&ev(e.touches[0].clientX,e.touches[0].clientY)};window.addEventListener("mousemove",eg),window.addEventListener("touchstart",ew,{passive:!0}),window.addEventListener("touchmove",ew,{passive:!0});let eh=()=>{G.aspect=window.innerWidth/window.innerHeight,G.updateProjectionMatrix(),R.setSize(window.innerWidth,window.innerHeight),j.setSize(window.innerWidth,window.innerHeight),L.setSize(window.innerWidth,window.innerHeight),z.uniforms.uResolution.value.set(window.innerWidth,window.innerHeight)};window.addEventListener("resize",eh);let ey=0,eM=0,ex=0,eb=!1,eA=0;V.updateProgress(5),setTimeout(()=>{for(let e=0;e<3;e++)j.render();for(let e=0;e<10;e++)el();j.render(),eb=!0,V.complete(R.domElement)},100);let eP=e=>{let t,o;if(n=requestAnimationFrame(eP),!eb)return;let i=e-eM;if(eM=e,i>100)return;ey+=i/16.67*.01,T.uniforms.time.value=ey,z.uniforms.uTime.value=ey,z.uniforms.uLimboMode.value=+!!W.limboMode;let a=9*Math.sin(.85*ey)+2*Math.cos(.85*ey*.5),r=6*Math.sin(.85*ey*.7+Math.PI/2)+1.5*Math.sin(.85*ey*1.3);em?(t=12*ep.x+.1*a,o=8*ep.y+.1*r+-(ec/window.innerHeight*15)):(t=a,o=r+-(ec/window.innerHeight*15));let l=J.position.clone();J.position.x+=(t-J.position.x)*W.followSpeed,J.position.y+=(o-J.position.y)*W.followSpeed,T.uniforms.ghostPosition.value.copy(J.position);let s=l.distanceTo(J.position);ex=ex*W.eyeGlowDecay+s*(1-W.eyeGlowDecay),J.position.y+=.03*Math.sin(ey*W.floatSpeed*1.5);let d=Math.sin(ey*W.pulseSpeed)*W.pulseIntensity;k.emissiveIntensity=W.emissiveIntensity+d;let u=ex>W.movementThreshold,c=u?2*W.eyeGlowResponse:W.eyeGlowResponse,p=K.leftEyeMaterial.opacity+(!!u-K.leftEyeMaterial.opacity)*c;K.leftEyeMaterial.opacity=p,K.rightEyeMaterial.opacity=p,K.leftOuterGlowMaterial.opacity=.3*p,K.rightOuterGlowMaterial.opacity=.3*p,(eu?ex>.003:W.createParticlesOnlyWhenMoving?ex>.005&&em:ex>.005)&&e-eA>100&&(Array.from({length:Math.min(W.particleCreationRate,Math.max(1,Math.floor(100*s)))}).forEach(()=>el()),eA=e),eo.forEach(e=>{if(!e.visible)return;e.userData.life-=e.userData.decay;let t=e.material;t.opacity=.85*e.userData.life,e.userData.velocity&&(e.position.add(e.userData.velocity),e.position.x+=8e-4*Math.cos(1.8*ey+e.position.y)),e.userData.rotationSpeed&&(e.rotation.x+=e.userData.rotationSpeed.x,e.rotation.y+=e.userData.rotationSpeed.y,e.rotation.z+=e.userData.rotationSpeed.z),e.userData.life<=0&&(e.visible=!1,t.opacity=0,en.push(e))});for(let e=eo.length-1;e>=0;e--)eo[e].visible||eo.splice(e,1);f.enablePostProcessing?j.render():R.render(I,G)};return eP(0),()=>{window.removeEventListener("scroll",ef),window.removeEventListener("mousemove",eg),window.removeEventListener("touchstart",ew),window.removeEventListener("touchmove",ew),window.removeEventListener("resize",eh),cancelAnimationFrame(n),N.dispose(),T.dispose(),Y.dispose(),k.dispose(),K.leftEyeMaterial.dispose(),K.rightEyeMaterial.dispose(),K.leftOuterGlowMaterial.dispose(),K.rightOuterGlowMaterial.dispose(),Q.forEach(e=>{e.geometry.dispose(),e.material.dispose(),e.userData.glowMat&&e.userData.glowMat.dispose(),e.userData.fireflyMat&&e.userData.fireflyMat.dispose()}),ea.forEach(e=>e.dispose()),er.dispose(),en.forEach(e=>{e.geometry.dispose(),e.material.dispose()}),eo.forEach(e=>{e.geometry.dispose(),e.material.dispose()}),R.dispose(),L.dispose&&L.dispose(),F.dispose&&F.dispose(),D&&R.domElement&&D.removeChild(R.domElement)}},[]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{ref:e,className:"w-full h-full absolute top-0 left-0"}),(0,i.jsx)("div",{ref:t,className:"preloader",id:"preloader",children:(0,i.jsxs)("div",{className:"preloader-content",children:[(0,i.jsx)("div",{className:"ghost-loader",children:(0,i.jsxs)("svg",{className:"ghost-svg",height:"80",viewBox:"0 0 512 512",width:"80",xmlns:"http://www.w3.org/2000/svg",children:[(0,i.jsx)("path",{className:"ghost-body",d:"m508.374 432.802s-46.6-39.038-79.495-275.781c-8.833-87.68-82.856-156.139-172.879-156.139-90.015 0-164.046 68.458-172.879 156.138-32.895 236.743-79.495 275.782-79.495 275.782-15.107 25.181 20.733 28.178 38.699 27.94 35.254-.478 35.254 40.294 70.516 40.294 35.254 0 35.254-35.261 70.508-35.261s37.396 45.343 72.65 45.343 37.389-45.343 72.651-45.343c35.254 0 35.254 35.261 70.508 35.261s35.27-40.772 70.524-40.294c17.959.238 53.798-2.76 38.692-27.94z",fill:"white"}),(0,i.jsx)("circle",{className:"ghost-eye left-eye",cx:"208",cy:"225",r:"22",fill:"black"}),(0,i.jsx)("circle",{className:"ghost-eye right-eye",cx:"297",cy:"225",r:"22",fill:"black"})]})}),(0,i.jsx)("div",{className:"loading-text",children:"Summoning spirits"}),(0,i.jsx)("div",{className:"loading-progress",children:(0,i.jsx)("div",{ref:o,className:"progress-bar"})})]})})]})}}}]);