(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  19017,
  (e) => {
    'use strict';
    var t = e.i(77579),
      i = e.i(46858),
      r = e.i(95535);
    function o(e, t, i) {
      return Math.max(e, Math.min(t, i));
    }
    var s = class {
        isRunning = !1;
        value = 0;
        from = 0;
        to = 0;
        currentTime = 0;
        lerp;
        duration;
        easing;
        onUpdate;
        advance(e) {
          if (!this.isRunning) return;
          let t = !1;
          if (this.duration && this.easing) {
            this.currentTime += e;
            let i = o(0, this.currentTime / this.duration, 1),
              r = (t = i >= 1) ? 1 : this.easing(i);
            this.value = this.from + (this.to - this.from) * r;
          } else if (this.lerp) {
            var i, r, s, a;
            ((this.value =
              ((i = this.value),
              (r = this.to),
              (s = 60 * this.lerp),
              (1 - (a = 1 - Math.exp(-s * e))) * i + a * r)),
              Math.round(this.value) === this.to &&
                ((this.value = this.to), (t = !0)));
          } else ((this.value = this.to), (t = !0));
          (t && this.stop(), this.onUpdate?.(this.value, t));
        }
        stop() {
          this.isRunning = !1;
        }
        fromTo(
          e,
          t,
          { lerp: i, duration: r, easing: o, onStart: s, onUpdate: a }
        ) {
          ((this.from = this.value = e),
            (this.to = t),
            (this.lerp = i),
            (this.duration = r),
            (this.easing = o),
            (this.currentTime = 0),
            (this.isRunning = !0),
            s?.(),
            (this.onUpdate = a));
        }
      },
      a = class {
        constructor(e, t, { autoResize: i = !0, debounce: r = 250 } = {}) {
          ((this.wrapper = e),
            (this.content = t),
            i &&
              ((this.debouncedResize = (function (e, t) {
                let i;
                return function (...r) {
                  let o = this;
                  (clearTimeout(i),
                    (i = setTimeout(() => {
                      ((i = void 0), e.apply(o, r));
                    }, t)));
                };
              })(this.resize, r)),
              this.wrapper instanceof Window
                ? window.addEventListener('resize', this.debouncedResize, !1)
                : ((this.wrapperResizeObserver = new ResizeObserver(
                    this.debouncedResize
                  )),
                  this.wrapperResizeObserver.observe(this.wrapper)),
              (this.contentResizeObserver = new ResizeObserver(
                this.debouncedResize
              )),
              this.contentResizeObserver.observe(this.content)),
            this.resize());
        }
        width = 0;
        height = 0;
        scrollHeight = 0;
        scrollWidth = 0;
        debouncedResize;
        wrapperResizeObserver;
        contentResizeObserver;
        destroy() {
          (this.wrapperResizeObserver?.disconnect(),
            this.contentResizeObserver?.disconnect(),
            this.wrapper === window &&
              this.debouncedResize &&
              window.removeEventListener('resize', this.debouncedResize, !1));
        }
        resize = () => {
          (this.onWrapperResize(), this.onContentResize());
        };
        onWrapperResize = () => {
          this.wrapper instanceof Window
            ? ((this.width = window.innerWidth),
              (this.height = window.innerHeight))
            : ((this.width = this.wrapper.clientWidth),
              (this.height = this.wrapper.clientHeight));
        };
        onContentResize = () => {
          this.wrapper instanceof Window
            ? ((this.scrollHeight = this.content.scrollHeight),
              (this.scrollWidth = this.content.scrollWidth))
            : ((this.scrollHeight = this.wrapper.scrollHeight),
              (this.scrollWidth = this.wrapper.scrollWidth));
        };
        get limit() {
          return {
            x: this.scrollWidth - this.width,
            y: this.scrollHeight - this.height,
          };
        }
      },
      n = class {
        events = {};
        emit(e, ...t) {
          let i = this.events[e] || [];
          for (let e = 0, r = i.length; e < r; e++) i[e]?.(...t);
        }
        on(e, t) {
          return (
            this.events[e]?.push(t) || (this.events[e] = [t]),
            () => {
              this.events[e] = this.events[e]?.filter((e) => t !== e);
            }
          );
        }
        off(e, t) {
          this.events[e] = this.events[e]?.filter((e) => t !== e);
        }
        destroy() {
          this.events = {};
        }
      },
      l = 100 / 6,
      c = { passive: !1 },
      d = class {
        constructor(e, t = { wheelMultiplier: 1, touchMultiplier: 1 }) {
          ((this.element = e),
            (this.options = t),
            window.addEventListener('resize', this.onWindowResize, !1),
            this.onWindowResize(),
            this.element.addEventListener('wheel', this.onWheel, c),
            this.element.addEventListener('touchstart', this.onTouchStart, c),
            this.element.addEventListener('touchmove', this.onTouchMove, c),
            this.element.addEventListener('touchend', this.onTouchEnd, c));
        }
        touchStart = { x: 0, y: 0 };
        lastDelta = { x: 0, y: 0 };
        window = { width: 0, height: 0 };
        emitter = new n();
        on(e, t) {
          return this.emitter.on(e, t);
        }
        destroy() {
          (this.emitter.destroy(),
            window.removeEventListener('resize', this.onWindowResize, !1),
            this.element.removeEventListener('wheel', this.onWheel, c),
            this.element.removeEventListener(
              'touchstart',
              this.onTouchStart,
              c
            ),
            this.element.removeEventListener('touchmove', this.onTouchMove, c),
            this.element.removeEventListener('touchend', this.onTouchEnd, c));
        }
        onTouchStart = (e) => {
          let { clientX: t, clientY: i } = e.targetTouches
            ? e.targetTouches[0]
            : e;
          ((this.touchStart.x = t),
            (this.touchStart.y = i),
            (this.lastDelta = { x: 0, y: 0 }),
            this.emitter.emit('scroll', { deltaX: 0, deltaY: 0, event: e }));
        };
        onTouchMove = (e) => {
          let { clientX: t, clientY: i } = e.targetTouches
              ? e.targetTouches[0]
              : e,
            r = -(t - this.touchStart.x) * this.options.touchMultiplier,
            o = -(i - this.touchStart.y) * this.options.touchMultiplier;
          ((this.touchStart.x = t),
            (this.touchStart.y = i),
            (this.lastDelta = { x: r, y: o }),
            this.emitter.emit('scroll', { deltaX: r, deltaY: o, event: e }));
        };
        onTouchEnd = (e) => {
          this.emitter.emit('scroll', {
            deltaX: this.lastDelta.x,
            deltaY: this.lastDelta.y,
            event: e,
          });
        };
        onWheel = (e) => {
          let { deltaX: t, deltaY: i, deltaMode: r } = e,
            o = 1 === r ? l : 2 === r ? this.window.width : 1,
            s = 1 === r ? l : 2 === r ? this.window.height : 1;
          ((t *= o),
            (i *= s),
            (t *= this.options.wheelMultiplier),
            (i *= this.options.wheelMultiplier),
            this.emitter.emit('scroll', { deltaX: t, deltaY: i, event: e }));
        };
        onWindowResize = () => {
          this.window = {
            width: window.innerWidth,
            height: window.innerHeight,
          };
        };
      },
      u = (e) => Math.min(1, 1.001 - Math.pow(2, -10 * e)),
      h = class {
        _isScrolling = !1;
        _isStopped = !1;
        _isLocked = !1;
        _preventNextNativeScrollEvent = !1;
        _resetVelocityTimeout = null;
        _rafId = null;
        isTouching;
        time = 0;
        userData = {};
        lastVelocity = 0;
        velocity = 0;
        direction = 0;
        options;
        targetScroll;
        animatedScroll;
        animate = new s();
        emitter = new n();
        dimensions;
        virtualScroll;
        constructor({
          wrapper: e = window,
          content: t = document.documentElement,
          eventsTarget: i = e,
          smoothWheel: r = !0,
          syncTouch: o = !1,
          syncTouchLerp: s = 0.075,
          touchInertiaExponent: n = 1.7,
          duration: l,
          easing: c,
          lerp: h = 0.1,
          infinite: p = !1,
          orientation: m = 'vertical',
          gestureOrientation: f = 'horizontal' === m ? 'both' : 'vertical',
          touchMultiplier: g = 1,
          wheelMultiplier: v = 1,
          autoResize: b = !0,
          prevent: x,
          virtualScroll: w,
          overscroll: y = !0,
          autoRaf: S = !1,
          anchors: E = !1,
          autoToggle: k = !1,
          allowNestedScroll: j = !1,
          __experimental__naiveDimensions: M = !1,
          naiveDimensions: N = M,
          stopInertiaOnNavigate: R = !1,
        } = {}) {
          ((window.lenisVersion = '1.3.17'),
            (e && e !== document.documentElement) || (e = window),
            'number' == typeof l && 'function' != typeof c
              ? (c = u)
              : 'function' == typeof c && 'number' != typeof l && (l = 1),
            (this.options = {
              wrapper: e,
              content: t,
              eventsTarget: i,
              smoothWheel: r,
              syncTouch: o,
              syncTouchLerp: s,
              touchInertiaExponent: n,
              duration: l,
              easing: c,
              lerp: h,
              infinite: p,
              gestureOrientation: f,
              orientation: m,
              touchMultiplier: g,
              wheelMultiplier: v,
              autoResize: b,
              prevent: x,
              virtualScroll: w,
              overscroll: y,
              autoRaf: S,
              anchors: E,
              autoToggle: k,
              allowNestedScroll: j,
              naiveDimensions: N,
              stopInertiaOnNavigate: R,
            }),
            (this.dimensions = new a(e, t, { autoResize: b })),
            this.updateClassName(),
            (this.targetScroll = this.animatedScroll = this.actualScroll),
            this.options.wrapper.addEventListener(
              'scroll',
              this.onNativeScroll,
              !1
            ),
            this.options.wrapper.addEventListener(
              'scrollend',
              this.onScrollEnd,
              { capture: !0 }
            ),
            (this.options.anchors || this.options.stopInertiaOnNavigate) &&
              this.options.wrapper.addEventListener('click', this.onClick, !1),
            this.options.wrapper.addEventListener(
              'pointerdown',
              this.onPointerDown,
              !1
            ),
            (this.virtualScroll = new d(i, {
              touchMultiplier: g,
              wheelMultiplier: v,
            })),
            this.virtualScroll.on('scroll', this.onVirtualScroll),
            this.options.autoToggle &&
              (this.checkOverflow(),
              this.rootElement.addEventListener(
                'transitionend',
                this.onTransitionEnd,
                { passive: !0 }
              )),
            this.options.autoRaf &&
              (this._rafId = requestAnimationFrame(this.raf)));
        }
        destroy() {
          (this.emitter.destroy(),
            this.options.wrapper.removeEventListener(
              'scroll',
              this.onNativeScroll,
              !1
            ),
            this.options.wrapper.removeEventListener(
              'scrollend',
              this.onScrollEnd,
              { capture: !0 }
            ),
            this.options.wrapper.removeEventListener(
              'pointerdown',
              this.onPointerDown,
              !1
            ),
            (this.options.anchors || this.options.stopInertiaOnNavigate) &&
              this.options.wrapper.removeEventListener(
                'click',
                this.onClick,
                !1
              ),
            this.virtualScroll.destroy(),
            this.dimensions.destroy(),
            this.cleanUpClassName(),
            this._rafId && cancelAnimationFrame(this._rafId));
        }
        on(e, t) {
          return this.emitter.on(e, t);
        }
        off(e, t) {
          return this.emitter.off(e, t);
        }
        onScrollEnd = (e) => {
          e instanceof CustomEvent ||
            ('smooth' !== this.isScrolling && !1 !== this.isScrolling) ||
            e.stopPropagation();
        };
        dispatchScrollendEvent = () => {
          this.options.wrapper.dispatchEvent(
            new CustomEvent('scrollend', {
              bubbles: this.options.wrapper === window,
              detail: { lenisScrollEnd: !0 },
            })
          );
        };
        get overflow() {
          let e = this.isHorizontal ? 'overflow-x' : 'overflow-y';
          return getComputedStyle(this.rootElement)[e];
        }
        checkOverflow() {
          ['hidden', 'clip'].includes(this.overflow)
            ? this.internalStop()
            : this.internalStart();
        }
        onTransitionEnd = (e) => {
          e.propertyName.includes('overflow') && this.checkOverflow();
        };
        setScroll(e) {
          this.isHorizontal
            ? this.options.wrapper.scrollTo({ left: e, behavior: 'instant' })
            : this.options.wrapper.scrollTo({ top: e, behavior: 'instant' });
        }
        onClick = (e) => {
          let t = e
            .composedPath()
            .filter(
              (e) => e instanceof HTMLAnchorElement && e.getAttribute('href')
            );
          if (this.options.anchors) {
            let e = t.find((e) => e.getAttribute('href')?.includes('#'));
            if (e) {
              let t = e.getAttribute('href');
              if (t) {
                let e =
                    'object' == typeof this.options.anchors &&
                    this.options.anchors
                      ? this.options.anchors
                      : void 0,
                  i = `#${t.split('#')[1]}`;
                this.scrollTo(i, e);
              }
            }
          }
          this.options.stopInertiaOnNavigate &&
            t.find((e) => e.host === window.location.host) &&
            this.reset();
        };
        onPointerDown = (e) => {
          1 === e.button && this.reset();
        };
        onVirtualScroll = (e) => {
          if (
            'function' == typeof this.options.virtualScroll &&
            !1 === this.options.virtualScroll(e)
          )
            return;
          let { deltaX: t, deltaY: i, event: r } = e;
          if (
            (this.emitter.emit('virtual-scroll', {
              deltaX: t,
              deltaY: i,
              event: r,
            }),
            r.ctrlKey || r.lenisStopPropagation)
          )
            return;
          let o = r.type.includes('touch'),
            s = r.type.includes('wheel');
          this.isTouching = 'touchstart' === r.type || 'touchmove' === r.type;
          let a = 0 === t && 0 === i;
          if (
            this.options.syncTouch &&
            o &&
            'touchstart' === r.type &&
            a &&
            !this.isStopped &&
            !this.isLocked
          )
            return void this.reset();
          let n =
            ('vertical' === this.options.gestureOrientation && 0 === i) ||
            ('horizontal' === this.options.gestureOrientation && 0 === t);
          if (a || n) return;
          let l = r.composedPath();
          l = l.slice(0, l.indexOf(this.rootElement));
          let c = this.options.prevent;
          if (
            l.find(
              (e) =>
                e instanceof HTMLElement &&
                (('function' == typeof c && c?.(e)) ||
                  e.hasAttribute?.('data-lenis-prevent') ||
                  (o && e.hasAttribute?.('data-lenis-prevent-touch')) ||
                  (s && e.hasAttribute?.('data-lenis-prevent-wheel')) ||
                  (this.options.allowNestedScroll &&
                    this.checkNestedScroll(e, { deltaX: t, deltaY: i })))
            )
          )
            return;
          if (this.isStopped || this.isLocked) {
            r.cancelable && r.preventDefault();
            return;
          }
          if (
            !((this.options.syncTouch && o) || (this.options.smoothWheel && s))
          ) {
            ((this.isScrolling = 'native'),
              this.animate.stop(),
              (r.lenisStopPropagation = !0));
            return;
          }
          let d = i;
          ('both' === this.options.gestureOrientation
            ? (d = Math.abs(i) > Math.abs(t) ? i : t)
            : 'horizontal' === this.options.gestureOrientation && (d = t),
            (!this.options.overscroll ||
              this.options.infinite ||
              (this.options.wrapper !== window &&
                this.limit > 0 &&
                ((this.animatedScroll > 0 &&
                  this.animatedScroll < this.limit) ||
                  (0 === this.animatedScroll && i > 0) ||
                  (this.animatedScroll === this.limit && i < 0)))) &&
              (r.lenisStopPropagation = !0),
            r.cancelable && r.preventDefault());
          let u = o && this.options.syncTouch,
            h = o && 'touchend' === r.type;
          (h &&
            (d =
              Math.sign(this.velocity) *
              Math.pow(
                Math.abs(this.velocity),
                this.options.touchInertiaExponent
              )),
            this.scrollTo(this.targetScroll + d, {
              programmatic: !1,
              ...(u
                ? { lerp: h ? this.options.syncTouchLerp : 1 }
                : {
                    lerp: this.options.lerp,
                    duration: this.options.duration,
                    easing: this.options.easing,
                  }),
            }));
        };
        resize() {
          (this.dimensions.resize(),
            (this.animatedScroll = this.targetScroll = this.actualScroll),
            this.emit());
        }
        emit() {
          this.emitter.emit('scroll', this);
        }
        onNativeScroll = () => {
          if (
            (null !== this._resetVelocityTimeout &&
              (clearTimeout(this._resetVelocityTimeout),
              (this._resetVelocityTimeout = null)),
            this._preventNextNativeScrollEvent)
          ) {
            this._preventNextNativeScrollEvent = !1;
            return;
          }
          if (!1 === this.isScrolling || 'native' === this.isScrolling) {
            let e = this.animatedScroll;
            ((this.animatedScroll = this.targetScroll = this.actualScroll),
              (this.lastVelocity = this.velocity),
              (this.velocity = this.animatedScroll - e),
              (this.direction = Math.sign(this.animatedScroll - e)),
              this.isStopped || (this.isScrolling = 'native'),
              this.emit(),
              0 !== this.velocity &&
                (this._resetVelocityTimeout = setTimeout(() => {
                  ((this.lastVelocity = this.velocity),
                    (this.velocity = 0),
                    (this.isScrolling = !1),
                    this.emit());
                }, 400)));
          }
        };
        reset() {
          ((this.isLocked = !1),
            (this.isScrolling = !1),
            (this.animatedScroll = this.targetScroll = this.actualScroll),
            (this.lastVelocity = this.velocity = 0),
            this.animate.stop());
        }
        start() {
          if (this.isStopped) {
            if (this.options.autoToggle)
              return void this.rootElement.style.removeProperty('overflow');
            this.internalStart();
          }
        }
        internalStart() {
          this.isStopped && (this.reset(), (this.isStopped = !1), this.emit());
        }
        stop() {
          if (!this.isStopped) {
            if (this.options.autoToggle)
              return void this.rootElement.style.setProperty(
                'overflow',
                'clip'
              );
            this.internalStop();
          }
        }
        internalStop() {
          this.isStopped || (this.reset(), (this.isStopped = !0), this.emit());
        }
        raf = (e) => {
          let t = e - (this.time || e);
          ((this.time = e),
            this.animate.advance(0.001 * t),
            this.options.autoRaf &&
              (this._rafId = requestAnimationFrame(this.raf)));
        };
        scrollTo(
          e,
          {
            offset: t = 0,
            immediate: i = !1,
            lock: r = !1,
            programmatic: s = !0,
            lerp: a = s ? this.options.lerp : void 0,
            duration: n = s ? this.options.duration : void 0,
            easing: l = s ? this.options.easing : void 0,
            onStart: c,
            onComplete: d,
            force: h = !1,
            userData: p,
          } = {}
        ) {
          if ((!this.isStopped && !this.isLocked) || h) {
            if (
              'string' == typeof e &&
              ['top', 'left', 'start', '#'].includes(e)
            )
              e = 0;
            else if (
              'string' == typeof e &&
              ['bottom', 'right', 'end'].includes(e)
            )
              e = this.limit;
            else {
              let i;
              if (
                ('string' == typeof e
                  ? (i = document.querySelector(e)) ||
                    ('#top' === e
                      ? (e = 0)
                      : console.warn('Lenis: Target not found', e))
                  : e instanceof HTMLElement && e?.nodeType && (i = e),
                i)
              ) {
                if (this.options.wrapper !== window) {
                  let e = this.rootElement.getBoundingClientRect();
                  t -= this.isHorizontal ? e.left : e.top;
                }
                let r = i.getBoundingClientRect();
                e = (this.isHorizontal ? r.left : r.top) + this.animatedScroll;
              }
            }
            if ('number' == typeof e) {
              if (((e += t), (e = Math.round(e)), this.options.infinite)) {
                if (s) {
                  this.targetScroll = this.animatedScroll = this.scroll;
                  let t = e - this.animatedScroll;
                  t > this.limit / 2
                    ? (e -= this.limit)
                    : t < -this.limit / 2 && (e += this.limit);
                }
              } else e = o(0, e, this.limit);
              if (e === this.targetScroll) {
                (c?.(this), d?.(this));
                return;
              }
              if (((this.userData = p ?? {}), i)) {
                ((this.animatedScroll = this.targetScroll = e),
                  this.setScroll(this.scroll),
                  this.reset(),
                  this.preventNextNativeScrollEvent(),
                  this.emit(),
                  d?.(this),
                  (this.userData = {}),
                  requestAnimationFrame(() => {
                    this.dispatchScrollendEvent();
                  }));
                return;
              }
              (s || (this.targetScroll = e),
                'number' == typeof n && 'function' != typeof l
                  ? (l = u)
                  : 'function' == typeof l && 'number' != typeof n && (n = 1),
                this.animate.fromTo(this.animatedScroll, e, {
                  duration: n,
                  easing: l,
                  lerp: a,
                  onStart: () => {
                    (r && (this.isLocked = !0),
                      (this.isScrolling = 'smooth'),
                      c?.(this));
                  },
                  onUpdate: (e, t) => {
                    ((this.isScrolling = 'smooth'),
                      (this.lastVelocity = this.velocity),
                      (this.velocity = e - this.animatedScroll),
                      (this.direction = Math.sign(this.velocity)),
                      (this.animatedScroll = e),
                      this.setScroll(this.scroll),
                      s && (this.targetScroll = e),
                      t || this.emit(),
                      t &&
                        (this.reset(),
                        this.emit(),
                        d?.(this),
                        (this.userData = {}),
                        requestAnimationFrame(() => {
                          this.dispatchScrollendEvent();
                        }),
                        this.preventNextNativeScrollEvent()));
                  },
                }));
            }
          }
        }
        preventNextNativeScrollEvent() {
          ((this._preventNextNativeScrollEvent = !0),
            requestAnimationFrame(() => {
              this._preventNextNativeScrollEvent = !1;
            }));
        }
        checkNestedScroll(e, { deltaX: t, deltaY: i }) {
          let r,
            o,
            s,
            a,
            n,
            l,
            c,
            d,
            u,
            h,
            p,
            m,
            f,
            g,
            v = Date.now(),
            b = (e._lenis ??= {}),
            x = this.options.gestureOrientation;
          if (v - (b.time ?? 0) > 2e3) {
            b.time = Date.now();
            let t = window.getComputedStyle(e);
            b.computedStyle = t;
            let i = t.overflowX,
              u = t.overflowY;
            if (
              ((r = ['auto', 'overlay', 'scroll'].includes(i)),
              (o = ['auto', 'overlay', 'scroll'].includes(u)),
              (b.hasOverflowX = r),
              (b.hasOverflowY = o),
              (!r && !o) ||
                ('vertical' === x && !o) ||
                ('horizontal' === x && !r))
            )
              return !1;
            ((n = e.scrollWidth),
              (l = e.scrollHeight),
              (c = e.clientWidth),
              (d = e.clientHeight),
              (s = n > c),
              (a = l > d),
              (b.isScrollableX = s),
              (b.isScrollableY = a),
              (b.scrollWidth = n),
              (b.scrollHeight = l),
              (b.clientWidth = c),
              (b.clientHeight = d));
          } else
            ((s = b.isScrollableX),
              (a = b.isScrollableY),
              (r = b.hasOverflowX),
              (o = b.hasOverflowY),
              (n = b.scrollWidth),
              (l = b.scrollHeight),
              (c = b.clientWidth),
              (d = b.clientHeight));
          if (
            (!r && !o) ||
            (!s && !a) ||
            ('vertical' === x && (!o || !a)) ||
            ('horizontal' === x && (!r || !s)) ||
            ('horizontal' === x
              ? (u = 'x')
              : 'vertical' === x
                ? (u = 'y')
                : (0 !== t && r && s && (u = 'x'),
                  0 !== i && o && a && (u = 'y')),
            !u)
          )
            return !1;
          if ('x' === u)
            ((h = e.scrollLeft), (p = n - c), (m = t), (f = r), (g = s));
          else {
            if ('y' !== u) return !1;
            ((h = e.scrollTop), (p = l - d), (m = i), (f = o), (g = a));
          }
          return (m > 0 ? h < p : h > 0) && f && g;
        }
        get rootElement() {
          return this.options.wrapper === window
            ? document.documentElement
            : this.options.wrapper;
        }
        get limit() {
          return this.options.naiveDimensions
            ? this.isHorizontal
              ? this.rootElement.scrollWidth - this.rootElement.clientWidth
              : this.rootElement.scrollHeight - this.rootElement.clientHeight
            : this.dimensions.limit[this.isHorizontal ? 'x' : 'y'];
        }
        get isHorizontal() {
          return 'horizontal' === this.options.orientation;
        }
        get actualScroll() {
          let e = this.options.wrapper;
          return this.isHorizontal
            ? (e.scrollX ?? e.scrollLeft)
            : (e.scrollY ?? e.scrollTop);
        }
        get scroll() {
          var e;
          return this.options.infinite
            ? ((this.animatedScroll % (e = this.limit)) + e) % e
            : this.animatedScroll;
        }
        get progress() {
          return 0 === this.limit ? 1 : this.scroll / this.limit;
        }
        get isScrolling() {
          return this._isScrolling;
        }
        set isScrolling(e) {
          this._isScrolling !== e &&
            ((this._isScrolling = e), this.updateClassName());
        }
        get isStopped() {
          return this._isStopped;
        }
        set isStopped(e) {
          this._isStopped !== e &&
            ((this._isStopped = e), this.updateClassName());
        }
        get isLocked() {
          return this._isLocked;
        }
        set isLocked(e) {
          this._isLocked !== e &&
            ((this._isLocked = e), this.updateClassName());
        }
        get isSmooth() {
          return 'smooth' === this.isScrolling;
        }
        get className() {
          let e = 'lenis';
          return (
            this.options.autoToggle && (e += ' lenis-autoToggle'),
            this.isStopped && (e += ' lenis-stopped'),
            this.isLocked && (e += ' lenis-locked'),
            this.isScrolling && (e += ' lenis-scrolling'),
            'smooth' === this.isScrolling && (e += ' lenis-smooth'),
            e
          );
        }
        updateClassName() {
          (this.cleanUpClassName(),
            (this.rootElement.className =
              `${this.rootElement.className} ${this.className}`.trim()));
        }
        cleanUpClassName() {
          this.rootElement.className = this.rootElement.className
            .replace(/lenis(-\w+)?/g, '')
            .trim();
        }
      },
      p = e.i(7684),
      m = e.i(94134);
    function f({ children: e }) {
      let { flags: o } = (0, m.useAntigravityStore)(),
        s = (0, r.usePathname)(),
        a = (0, i.useMemo)(() => s?.startsWith('/admin') ?? !1, [s]),
        [n, l] = (0, i.useState)(null);
      return (
        (0, i.useEffect)(() => {
          a
            ? document.documentElement.classList.add('admin-page')
            : document.documentElement.classList.remove('admin-page');
        }, [a]),
        (0, i.useEffect)(() => {
          if (o.reducedMotion || a) return void l(null);
          let e = new h({
            lerp: 0.08,
            wheelMultiplier: 1,
            touchMultiplier: 1.2,
          });
          return (
            l(e),
            requestAnimationFrame(function t(i) {
              (e.raf(i), requestAnimationFrame(t));
            }),
            () => {
              (e.destroy(), l(null));
            }
          );
        }, [o.reducedMotion, a]),
        (0, t.jsx)(p.ScrollContext.Provider, {
          value: { lenis: a ? null : n },
          children: e,
        })
      );
    }
    e.s(['default', () => f], 19017);
  },
  14072,
  (e) => {
    e.v({
      fallbackBackground:
        'DesktopFluidHeader-module__0IvcRG__fallbackBackground',
      headerContainer: 'DesktopFluidHeader-module__0IvcRG__headerContainer',
      headerDark: 'DesktopFluidHeader-module__0IvcRG__headerDark',
      headerLight: 'DesktopFluidHeader-module__0IvcRG__headerLight',
      subtleBorder: 'DesktopFluidHeader-module__0IvcRG__subtleBorder',
    });
  },
  66058,
  (e) => {
    'use strict';
    var t = e.i(77579),
      i = e.i(46858),
      r = e.i(51395),
      o = e.i(11795),
      s = e.i(12559);
    async function a() {
      let e = (0, o.createClientComponentClient)(),
        { data: t, error: i } = await e
          .from('site_assets')
          .select('*')
          .order('page', { ascending: !0 })
          .order('sort_order', { ascending: !0, nullsFirst: !1 });
      if (i) throw i;
      return (function (e, t = {}) {
        let { onlyActive: i = !1, dropInvalid: r = !0 } = t,
          o = new Map(),
          a = new Map(),
          n = (e) => {
            if (!e) return !0;
            let t = e.trim().toLowerCase();
            return (
              !t ||
              t.startsWith('updated_at:') ||
              t.startsWith('key:') ||
              t.startsWith('file_path:') ||
              '.keep' === t ||
              '.emptyfolderplaceholder' === t
            );
          },
          l = (e) => {
            if (!e) return e;
            let t = e.trim();
            if (!t) return e;
            let i = t.includes('/') ? '/' : '.',
              r = t.split(i).filter(Boolean);
            if (r.length < 4) return e;
            let o = Math.min(3, Math.floor(r.length / 2));
            for (let e = 1; e <= o; e++)
              if (
                r.slice(0, e).join('|').toLowerCase() ===
                r
                  .slice(e, 2 * e)
                  .join('|')
                  .toLowerCase()
              )
                return [...r.slice(0, e), ...r.slice(2 * e)].join(i);
            return e;
          },
          c = (e) =>
            4 * !!e.is_active +
            2 * !!e.publicUrl +
            +!!e.file_path?.includes('/') -
            0.01 * Math.min(e.key?.length ?? 0, 60);
        for (let t of e) {
          let e = (function (e) {
              let t = (e.bucket || 'site-assets')
                  .replace(/^bucket:\s*/i, '')
                  .replace(/^"+|"+$/g, '')
                  .replace(/^'+|'+$/g, '')
                  .replace(/^\/+|\/+$/g, ''),
                i = e.key
                  ?.replace(/^key:\s*/i, '')
                  .replace(/^"+|"+$/g, '')
                  .replace(/^'+|'+$/g, '')
                  .replace(/,+$/g, '')
                  .trim(),
                r = (0, s.normalizeStoragePath)(e.file_path, t),
                o = r
                  ? /^clients\.clients\.strip\./.test(r)
                    ? r.replace(
                        /^clients\.clients\.strip\./,
                        'clients/clients.strip.'
                      )
                    : /^clients\.strip\./.test(r)
                      ? r.replace(/^clients\.strip\./, 'clients/clients.strip.')
                      : r
                  : r,
                a =
                  'site-assets' === t && o?.startsWith('projects/')
                    ? 'portfolio-media'
                    : t,
                n = (e) => {
                  if (!e) return;
                  let t = e
                    .replace(/^page:\s*/i, '')
                    .replace(/^"+|"+$/g, '')
                    .replace(/^'+|'+$/g, '')
                    .replace(/,+$/g, '')
                    .trim();
                  if (!t || /^updated_at:/i.test(t) || /^key:/i.test(t)) return;
                  let i = t.includes('/') ? '/' : '.',
                    r = t.split(i)[0];
                  return r?.toLowerCase();
                },
                l = n(e.page) || n(o) || n(i) || 'global',
                c =
                  (0, s.buildSupabaseStorageUrl)(a, o) ||
                  (e.file_path?.startsWith('http') ? e.file_path : '') ||
                  '',
                d = {
                  ...e,
                  key: i ?? e.key,
                  bucket: a,
                  file_path: r ?? '',
                  page: l,
                  resolvedPage: l,
                  publicUrl: c,
                };
              if (e.href) {
                let t = (0, s.validateExternalUrl)(e.href);
                t && (d = { ...d, href: t });
              }
              return d;
            })({
              ...t,
              key: l(t.key) ?? t.key,
              file_path: l(t.file_path) ?? t.file_path,
            }),
            d = e.key?.trim();
          if (!d || (r && (n(d) || n(e.file_path))) || (i && !e.is_active))
            continue;
          let u = !!(e.publicUrl || 'font' === e.asset_type || e.href);
          if (r && !u) continue;
          let h = (e, t) => {
              if (!e) return t;
              let i = c(e),
                r = c(t);
              return r > i || (r === i && t.key.length < e.key.length) ? t : e;
            },
            p = h(o.get(d), e);
          o.set(d, p);
          let m = e.file_path || '';
          if (m) {
            let t = h(a.get(m), e);
            a.set(m, t);
          }
        }
        let d = new Map();
        for (let e of o.values()) d.set(e.id, e);
        for (let e of a.values()) d.set(e.id, e);
        return Array.from(d.values()).sort((e, t) => {
          let i = e.page ?? '',
            r = t.page ?? '';
          if (i === r) {
            let i = e.sort_order ?? Number.MAX_SAFE_INTEGER,
              r = t.sort_order ?? Number.MAX_SAFE_INTEGER;
            return i === r ? e.key.localeCompare(t.key) : i - r;
          }
          return i.localeCompare(r);
        });
      })(t ?? [], { onlyActive: !0 });
    }
    e.i(1921);
    var n = e.i(95535),
      l = e.i(19017),
      c = e.i(40022),
      d = e.i(60649),
      u = e.i(82970),
      h = e.i(89668),
      p = e.i(70315),
      m = e.i(14072);
    function f({
      navItems: e,
      logoUrl: r,
      onNavigate: o,
      activeHref: s,
      isLight: a,
      isPageActive: n,
    }) {
      let l = (0, i.useRef)(null),
        c = (0, i.useMemo)(() => e, [e]),
        d = !!n;
      return (0, t.jsx)('header', {
        className: `hidden lg:block fixed top-6 left-0 right-0 z-40 w-full pointer-events-none transition-all duration-300 ease-in-out ${a ? 'header--light' : ''}`,
        children: (0, t.jsx)('div', {
          className:
            'flex justify-center w-full max-w-[1680px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24',
          children: (0, t.jsx)('div', {
            ref: l,
            className: 'pointer-events-auto w-full relative',
            children: (0, t.jsx)('div', {
              className: `${m.default.headerContainer} ${a ? m.default.headerLight : m.default.headerDark} h-16 w-[calc(100%+5rem)] -ml-10 rounded-4xl backdrop-blur-md border border-white/10 bg-black/20 transition-all duration-300`,
              children: (0, t.jsxs)('div', {
                className:
                  'relative z-10 h-full px-10 flex items-center justify-between gap-6',
                children: [
                  (0, t.jsx)(h.default, {
                    href: '/',
                    'aria-label': 'Ir para Home',
                    className:
                      'flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-full',
                    children: (0, t.jsx)(p.default, {
                      src: r,
                      alt: 'Danilo',
                      width: 32,
                      height: 32,
                      className:
                        'h-22 w-22 object-contain transition-colors duration-300',
                    }),
                  }),
                  (0, t.jsx)('nav', {
                    'aria-label': 'Navegação principal',
                    className: 'flex items-center gap-7',
                    children: c.map((e) => {
                      var i;
                      let r =
                          s ===
                          (e.href.startsWith('/#')
                            ? e.href.substring(1)
                            : e.href),
                        n =
                          'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md text-xs uppercase tracking-[0.2em]',
                        l = r
                          ? `${a ? 'text-blueAccent' : 'text-bluePrimary'} font-semibold`
                          : `${a ? 'text-white' : 'text-white/70'} ${a ? 'hover:text-blueAccent' : 'hover:text-white'} font-medium`,
                        c = d ? 'text-bluePrimary font-semibold' : '',
                        u = r
                          ? 'after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-current'
                          : 'after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-current group-hover:after:w-full after:transition-all after:duration-300';
                      return ((i = e.href),
                      /^https?:\/\//.test(i) ||
                        i.startsWith('mailto:') ||
                        i.startsWith('tel:') ||
                        e.external)
                        ? (0, t.jsxs)(
                            'a',
                            {
                              href: e.href,
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              className: `group ${n} ${l} ${c} relative flex items-center`,
                              children: [
                                (0, t.jsx)('span', {
                                  className: 'tracking-tight',
                                  children: e.label,
                                }),
                                (0, t.jsx)('span', { className: u }),
                              ],
                            },
                            e.href
                          )
                        : (0, t.jsxs)(
                            'button',
                            {
                              type: 'button',
                              onClick: () => o(e.href),
                              className: `group ${n} ${l} ${c} relative flex items-center`,
                              children: [
                                (0, t.jsx)('span', {
                                  className: 'tracking-tight',
                                  children: e.label,
                                }),
                                (0, t.jsx)('span', { className: u }),
                              ],
                            },
                            e.href
                          );
                    }),
                  }),
                ],
              }),
            }),
          }),
        }),
      });
    }
    let g = (0, i.forwardRef)(
      (
        {
          open: e,
          textLines: i,
          textInnerRef: r,
          iconRef: o,
          plusHRef: s,
          plusVRef: a,
          onToggle: n,
        },
        l
      ) =>
        (0, t.jsxs)('button', {
          ref: l,
          type: 'button',
          onClick: n,
          'aria-label': e ? 'Fechar menu' : 'Abrir menu',
          'aria-expanded': e ? 'true' : 'false',
          className: `relative inline-flex items-center justify-center gap-2 bg-transparent border-0 cursor-pointer font-medium leading-none overflow-visible z-110 min-h-12 min-w-12 px-3 transition-colors duration-300 ${e ? 'text-white' : 'text-white hover:text-primary'}`,
          children: [
            (0, t.jsx)('span', {
              className:
                'relative inline-block h-[1em] overflow-hidden whitespace-nowrap',
              'aria-hidden': 'true',
              children: (0, t.jsx)('span', {
                ref: r,
                className: 'flex flex-col leading-none',
                children: i.map((e, r) =>
                  (0, t.jsx)(
                    'span',
                    {
                      className: `block h-[1em] leading-none text-sm tracking-wide ${r === i.length - 1 ? 'visible' : 'invisible'}`,
                      children: e,
                    },
                    `${e}-${r}`
                  )
                ),
              }),
            }),
            (0, t.jsxs)('span', {
              ref: o,
              className:
                'relative w-[18px] h-[18px] shrink-0 inline-flex items-center justify-center will-change-transform',
              'aria-hidden': 'true',
              children: [
                (0, t.jsx)('span', {
                  ref: s,
                  className:
                    'absolute left-1/2 top-1/2 w-full h-[1.5px] bg-current rounded-sm -translate-x-1/2 -translate-y-1/2 will-change-transform',
                }),
                (0, t.jsx)('span', {
                  ref: a,
                  className:
                    'absolute left-1/2 top-1/2 w-full h-[1.5px] bg-current rounded-sm -translate-x-1/2 -translate-y-1/2 will-change-transform',
                }),
              ],
            }),
          ],
        })
    );
    g.displayName = 'MobileMenuButton';
    var v = e.i(62897),
      b = e.i(77358),
      x = e.i(89361),
      w = e.i(5519),
      y = e.i(39995);
    let S = (0, i.forwardRef)(
      (
        {
          navItems: e,
          accentColor: i,
          open: r,
          socialsRef: o,
          onNavigate: s,
          onClose: a,
          activeHref: n,
          isPageActive: l,
        },
        c
      ) =>
        (0, t.jsxs)('nav', {
          ref: c,
          id: 'mobile-menu-panel',
          className:
            'fixed inset-0 bg-[#0048ff] backdrop-blur-xl flex flex-col justify-center px-8 z-50 pointer-events-auto sm:px-12 md:px-16',
          style: {
            paddingTop: 'env(safe-area-inset-top, 2rem)',
            paddingBottom: 'env(safe-area-inset-bottom, 2rem)',
            paddingLeft: 'max(2rem, env(safe-area-inset-left, 2rem))',
            paddingRight: 'max(2rem, env(safe-area-inset-right, 2rem))',
          },
          'aria-hidden': r ? 'false' : 'true',
          onClick: (e) => {
            e.target === e.currentTarget && a();
          },
          children: [
            (0, t.jsx)('ul', {
              className: 'flex flex-col gap-4',
              role: 'list',
              children: e.map((e) => {
                let i = e.href.startsWith('/#') ? e.href.substring(1) : e.href;
                return (0, t.jsx)(
                  'li',
                  {
                    className: 'overflow-hidden leading-none',
                    children: (0, t.jsx)('button', {
                      onClick: () => s(e.href),
                      className: `sm-panel-item w-full py-4 text-4xl sm:text-5xl font-light tracking-wide transition-all text-left leading-none uppercase will-change-transform origin-bottom min-h-[56px] active:translate-x-2 active:opacity-70 ${(l ? 'text-blueAccent font-semibold' : '') || (n === i ? 'text-blueAccent font-medium underline underline-offset-4' : 'text-white/80 hover:text-white')}`,
                      children: e.label,
                    }),
                  },
                  e.href
                );
              }),
            }),
            (0, t.jsxs)('div', {
              ref: o,
              className:
                'mt-12 pt-8 border-t border-white/10 flex flex-col gap-4',
              children: [
                (0, t.jsx)(v.motion.h3, {
                  className:
                    'sm-social-title text-sm font-medium uppercase tracking-wider',
                  initial: !1,
                  animate: { color: i },
                  children: 'Connect',
                }),
                (0, t.jsx)('div', {
                  className: 'flex gap-4',
                  children: [
                    {
                      label: 'LinkedIn',
                      href: y.SOCIALS.linkedin,
                      icon: (0, t.jsx)(x.Linkedin, { className: 'w-5 h-5' }),
                    },
                    {
                      label: 'Instagram',
                      href: y.SOCIALS.instagram,
                      icon: (0, t.jsx)(b.Instagram, { className: 'w-5 h-5' }),
                    },
                    {
                      label: 'Email',
                      href: y.SOCIALS.emailPrimary,
                      icon: (0, t.jsx)(w.Mail, { className: 'w-5 h-5' }),
                    },
                  ].map((e) =>
                    (0, t.jsx)(
                      'a',
                      {
                        href: e.href,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        'aria-label': e.label,
                        className:
                          'sm-social-link flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-primary hover:border-primary hover:scale-105 active:scale-95',
                        children: e.icon,
                      },
                      e.label
                    )
                  ),
                }),
              ],
            }),
          ],
        })
    );
    S.displayName = 'MobileMenuPanel';
    let E = (0, i.forwardRef)((e, i) =>
      (0, t.jsx)('div', {
        ref: i,
        className:
          'fixed top-0 right-0 bottom-0 w-full pointer-events-none z-49',
        'aria-hidden': 'true',
        children: ['#4fe6ff', '#8705f2', '#f501d3'].map((e, i) =>
          (0, t.jsx)(
            v.motion.div,
            {
              className: 'sm-prelayer absolute top-0 right-0 h-full w-full',
              initial: !1,
              animate: { backgroundColor: e },
            },
            i
          )
        ),
      })
    );
    function k({ logoUrl: e, onLogoClick: i, children: r, isLight: o = !1 }) {
      let s = {
        hidden: { opacity: 0, y: -15, filter: 'blur(8px)' },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
      };
      return (0, t.jsx)(v.motion.header, {
        variants: {
          hidden: { y: -64, opacity: 0 },
          show: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              staggerChildren: 0.1,
              delayChildren: 0.2,
            },
          },
        },
        initial: 'hidden',
        animate: 'show',
        className: `fixed top-0 left-0 right-0 z-50 pointer-events-none ${o ? 'header--light' : ''}`,
        children: (0, t.jsx)('div', {
          className: `w-full h-[60px] pointer-events-auto transition-colors duration-300 ${o ? 'bg-background/40 border-b border-white/10 shadow-xl' : 'bg-background/40 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20'}`,
          children: (0, t.jsxs)('div', {
            className:
              'flex items-center justify-between h-full w-full max-w-[1680px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24',
            children: [
              (0, t.jsx)(v.motion.div, {
                variants: s,
                children: (0, t.jsx)(h.default, {
                  href: '/',
                  onClick: i,
                  children: (0, t.jsx)(p.default, {
                    src: e,
                    alt: 'Danilo',
                    width: 32,
                    height: 32,
                    className: 'h-20 w-20 object-contain',
                    unoptimized: !0,
                    loading: 'eager',
                  }),
                }),
              }),
              (0, t.jsx)(v.motion.div, { variants: s, children: r }),
            ],
          }),
        }),
      });
    }
    E.displayName = 'MobilePreLayers';
    var j = e.i(35259),
      M = e.i(94608);
    function N({
      navItems: e,
      logoUrl: r,
      isLight: o = !1,
      accentColor: s = '#0057FF',
      isOpen: a,
      onOpen: n,
      onClose: l,
      onNavigate: c,
      activeHref: d,
      isPageActive: u,
    }) {
      let {
        refs: {
          panelRef: h,
          preLayersRef: p,
          socialsRef: m,
          toggleBtnRef: f,
          plusHRef: v,
          plusVRef: b,
          iconRef: x,
          textInnerRef: w,
        },
        state: { open: y, textLines: N },
        actions: { toggleMenu: R, syncState: T },
      } = (function (e, t, r) {
        let o = (0, M.useMotionGate)(),
          s = (0, i.useRef)(null),
          a = (0, i.useRef)(null),
          n = (0, i.useRef)([]),
          l = (0, i.useRef)(null),
          c = (0, i.useRef)(null),
          d = (0, i.useRef)(null),
          u = (0, i.useRef)(null),
          h = (0, i.useRef)(null),
          p = (0, i.useRef)(null),
          [m, f] = (0, i.useState)(['Menu', 'Close']),
          g = (0, i.useRef)(null),
          v = (0, i.useRef)(null),
          b = (0, i.useRef)(null),
          x = (0, i.useRef)(null),
          [w, y] = (0, i.useState)(!1),
          S = (0, i.useRef)(!1);
        (0, i.useLayoutEffect)(() => {
          if (o) return;
          let e = j.gsap.context(() => {
            let e = s.current,
              t = a.current,
              i = d.current,
              r = u.current,
              o = h.current,
              l = p.current;
            if (!e || !i || !r || !o || !l) return;
            let c = [];
            (t && (c = Array.from(t.querySelectorAll('.sm-prelayer'))),
              (n.current = c),
              j.gsap.set([e, ...c], {
                opacity: 0,
                xPercent: 100,
                filter: 'blur(10px)',
                pointerEvents: 'none',
              }),
              j.gsap.set(i, { transformOrigin: '50% 50%', rotate: 0 }),
              j.gsap.set(r, { transformOrigin: '50% 50%', rotate: 90 }),
              j.gsap.set(o, { rotate: 0, transformOrigin: '50% 50%' }),
              j.gsap.set(l, { yPercent: 0 }));
          });
          return () => e.revert();
        }, [o]);
        let E = (0, i.useCallback)((e) => {
            if (o) return;
            let t = h.current,
              i = d.current,
              r = u.current;
            t &&
              i &&
              r &&
              (b.current?.kill(),
              e
                ? (j.gsap.set(t, { rotate: 0, transformOrigin: '50% 50%' }),
                  (b.current = j.gsap
                    .timeline({ defaults: { ease: 'expo.out' } })
                    .to(i, { rotate: 45, duration: 0.6 }, 0)
                    .to(r, { rotate: -45, duration: 0.6 }, 0)))
                : (b.current = j.gsap
                    .timeline({ defaults: { ease: 'expo.inOut' } })
                    .to(i, { rotate: 0, duration: 0.45 }, 0)
                    .to(r, { rotate: 90, duration: 0.45 }, 0)
                    .to(t, { rotate: 0, duration: 0.001 }, 0)));
          }, []),
          k = (0, i.useCallback)((e) => {
            if (o) return void f([e ? 'Close' : 'Menu']);
            let t = p.current;
            if (!t) return;
            x.current?.kill();
            let i = e ? 'Menu' : 'Close',
              r = [i],
              s = i;
            for (let e = 0; e < 1; e++) s = 'Menu' === s ? 'Close' : 'Menu';
            (r.push(e ? 'Close' : 'Menu'),
              f(r),
              j.gsap.set(t, { yPercent: 0 }));
            let a = r.length;
            x.current = j.gsap.to(t, {
              yPercent: -(((a - 1) / a) * 100),
              duration: 0.6,
              ease: 'expo.out',
            });
          }, []),
          N = (0, i.useCallback)(() => {
            if (o) return null;
            let e = s.current,
              t = n.current;
            if (!e) return null;
            (g.current?.kill(), v.current?.kill());
            let i = e.querySelectorAll('.sm-panel-item'),
              r = l.current,
              a = r ? Array.from(r.querySelectorAll('.sm-social-link')) : [],
              c = r?.querySelector('.sm-social-title');
            (i.length &&
              j.gsap.set(i, { x: 40, opacity: 0, filter: 'blur(8px)' }),
              c && j.gsap.set(c, { opacity: 0, filter: 'blur(4px)' }),
              a.length && j.gsap.set(a, { x: 20, opacity: 0 }));
            let d = j.gsap.timeline({ paused: !0 });
            if (
              (t.length &&
                d.to(t, {
                  opacity: 0.9,
                  xPercent: 0,
                  filter: 'blur(0px)',
                  duration: 0.8,
                  ease: 'expo.out',
                  stagger: 0.08,
                }),
              d.to(
                e,
                {
                  opacity: 1,
                  xPercent: 0,
                  filter: 'blur(0px)',
                  duration: 0.8,
                  ease: 'expo.out',
                  pointerEvents: 'auto',
                },
                t.length ? '-=0.5' : 0
              ),
              i.length &&
                d.to(
                  i,
                  {
                    x: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1,
                    ease: 'expo.out',
                    stagger: 0.06,
                  },
                  '-=0.4'
                ),
              c || a.length)
            ) {
              let e = '-=0.4';
              (c &&
                d.to(c, { opacity: 1, filter: 'blur(0px)', duration: 0.6 }, e),
                a.length &&
                  d.to(
                    a,
                    {
                      x: 0,
                      opacity: 1,
                      duration: 0.8,
                      ease: 'expo.out',
                      stagger: 0.06,
                    },
                    e + '+=0.1'
                  ));
            }
            return ((g.current = d), d);
          }, []),
          R = (0, i.useCallback)(() => {
            if (o) return;
            v.current && (v.current.kill(), (v.current = null));
            let e = N();
            e && e.play(0);
          }, [N]),
          T = (0, i.useCallback)(() => {
            if (o) return;
            (g.current?.kill(), (g.current = null));
            let e = s.current,
              t = n.current;
            if (!e) return;
            let i = [...t, e];
            (v.current?.kill(),
              (v.current = j.gsap.to(i, {
                opacity: 0,
                xPercent: 100,
                filter: 'blur(10px)',
                duration: 0.5,
                ease: 'expo.in',
                pointerEvents: 'none',
                overwrite: 'auto',
                onComplete: () => {
                  let t = e.querySelectorAll('.sm-panel-item');
                  t.length &&
                    j.gsap.set(t, { x: 40, opacity: 0, filter: 'blur(8px)' });
                  let i = l.current;
                  if (i) {
                    let e = i.querySelector('.sm-social-title'),
                      t = Array.from(i.querySelectorAll('.sm-social-link'));
                    (e && j.gsap.set(e, { opacity: 0 }),
                      t.length && j.gsap.set(t, { x: 20, opacity: 0 }));
                  }
                },
              })));
          }, []),
          C = (0, i.useCallback)(() => {
            e !== S.current &&
              (e
                ? ((S.current = !0),
                  y(!0),
                  o ? (t(), f(['Close'])) : (R(), E(!0), k(!0)))
                : ((S.current = !1),
                  y(!1),
                  o ? (r(), f(['Menu'])) : (T(), E(!1), k(!1))));
          }, [e, R, T, E, k, o, r, t]);
        return {
          refs: {
            panelRef: s,
            preLayersRef: a,
            socialsRef: l,
            toggleBtnRef: c,
            plusHRef: d,
            plusVRef: u,
            iconRef: h,
            textInnerRef: p,
          },
          state: { open: w, textLines: m },
          actions: {
            toggleMenu: (0, i.useCallback)(() => {
              let e = !S.current;
              if (e !== S.current) {
                if (((S.current = e), y(e), o)) {
                  (e ? t() : r(), f([e ? 'Close' : 'Menu']));
                  return;
                }
                (e ? (t(), R()) : (r(), T()), E(e), k(e));
              }
            }, [t, r, R, T, E, k, o]),
            syncState: C,
          },
        };
      })(a, n, l);
      return (
        (0, i.useEffect)(() => {
          T();
        }, [a, T]),
        (0, i.useEffect)(
          () => (
            y
              ? (document.body.style.overflow = 'hidden')
              : (document.body.style.overflow = ''),
            () => {
              document.body.style.overflow = '';
            }
          ),
          [y]
        ),
        (0, i.useEffect)(() => {
          let e = (e) => {
            'Escape' === e.key && y && l();
          };
          return (
            window.addEventListener('keydown', e),
            () => window.removeEventListener('keydown', e)
          );
        }, [l]),
        (0, i.useEffect)(() => {
          if (!y || !h.current) return;
          let e = h.current.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            ),
            t = e[0],
            i = e[e.length - 1],
            r = (e) => {
              'Tab' === e.key &&
                (e.shiftKey
                  ? document.activeElement === t &&
                    (i.focus(), e.preventDefault())
                  : document.activeElement === i &&
                    (t.focus(), e.preventDefault()));
            };
          return (
            t?.focus(),
            window.addEventListener('keydown', r),
            () => window.removeEventListener('keydown', r)
          );
        }, [y]),
        (0, t.jsxs)('div', {
          className: 'lg:hidden relative z-60',
          children: [
            (0, t.jsx)(k, {
              logoUrl: r,
              onLogoClick: l,
              isLight: !y && o,
              children: (0, t.jsx)(g, {
                ref: f,
                open: y,
                textLines: N,
                textInnerRef: w,
                iconRef: x,
                plusHRef: v,
                plusVRef: b,
                onToggle: R,
              }),
            }),
            (0, t.jsx)(E, { ref: p, accentColor: s }),
            (0, t.jsx)(S, {
              ref: h,
              navItems: e,
              accentColor: s,
              open: y,
              socialsRef: m,
              onNavigate: c,
              onClose: l,
              activeHref: d,
              isPageActive: u,
            }),
          ],
        })
      );
    }
    function R(e) {
      return e.startsWith('/#') ? e.substring(1) : e.startsWith('#') ? e : '';
    }
    function T({ navItems: e, gradient: o, accentColor: s }) {
      let a = (0, n.useRouter)(),
        [l, h] = (0, i.useState)(!1),
        [p, m] = (0, i.useState)(!1),
        [g, v] = (0, i.useState)(!1),
        b = (0, d.useMediaQuery)('(min-width: 1024px)');
      (0, i.useEffect)(() => {
        v(!0);
      }, []);
      let x = (function (e, t = '-45% 0px -45% 0px') {
          let [r, o] = (0, i.useState)('#hero');
          return (
            (0, i.useEffect)(() => {
              let i = e.map((e) => document.getElementById(e)).filter(Boolean);
              if (!i.length) return;
              let r = new IntersectionObserver(
                (e) => {
                  let t = e
                    .filter((e) => e.isIntersecting)
                    .sort(
                      (e, t) =>
                        (t.intersectionRatio ?? 0) - (e.intersectionRatio ?? 0)
                    )[0];
                  t?.target?.id && o(`#${t.target.id}`);
                },
                { root: null, threshold: [0.15, 0.25, 0.35], rootMargin: t }
              );
              return (i.forEach((e) => r.observe(e)), () => r.disconnect());
            }, [t, e]),
            r
          );
        })(
          (0, i.useMemo)(
            () =>
              e
                .filter((e) => {
                  var t;
                  return (t = e.href).startsWith('#') || t.startsWith('/#');
                })
                .map((e) => R(e.href).replace('#', '')),
            [e]
          )
        ),
        w = (0, n.usePathname)(),
        y = (0, i.useMemo)(() => ('/' === w ? x : (w ?? void 0)), [w, x]),
        S = w?.startsWith('/sobre'),
        E = (0, i.useCallback)(
          (e) => {
            let t = R(e);
            if (t) {
              let i = '/' === window.location.pathname;
              if (e.startsWith('#') || (e.startsWith('/#') && i)) {
                let e, i;
                ((e = t.replace('#', '')),
                  (i = document.getElementById(e)) &&
                    i.scrollIntoView({ behavior: 'smooth', block: 'start' }),
                  h(!1));
                return;
              }
            }
            if (
              /^https?:\/\//.test(e) ||
              e.startsWith('mailto:') ||
              e.startsWith('tel:')
            ) {
              (window.open(e, '_blank', 'noopener,noreferrer'), h(!1));
              return;
            }
            (a.push(e), h(!1));
          },
          [a]
        ),
        k = (0, i.useMemo)(() => e, [e]);
      (0, i.useEffect)(() => {
        let e = Array.from(document.querySelectorAll('[data-light-section]'));
        if (!e.length) return;
        let t = new IntersectionObserver(
          (e) => {
            m(e.some((e) => e.isIntersecting));
          },
          { threshold: 0.12, rootMargin: '-60px 0px 0px 0px' }
        );
        return (e.forEach((e) => t.observe(e)), () => t.disconnect());
      }, []);
      let j =
        (0, r.useSiteAssetUrl)(
          u.SITE_ASSET_KEYS.logos.headerLight,
          c.BRAND.assets.logos.logoLight
        ) ?? c.BRAND.assets.logos.logoLight;
      return g
        ? (0, t.jsx)(t.Fragment, {
            children: b
              ? (0, t.jsx)(f, {
                  navItems: k,
                  logoUrl: j,
                  isLight: p,
                  isPageActive: S,
                  onNavigate: E,
                  activeHref: y,
                })
              : (0, t.jsx)(N, {
                  navItems: k,
                  logoUrl: j,
                  isLight: p,
                  gradient: o,
                  accentColor: s,
                  isOpen: l,
                  onOpen: () => h(!0),
                  onClose: () => h(!1),
                  onNavigate: E,
                  activeHref: y,
                  isPageActive: S,
                }),
          })
        : null;
    }
    function C() {
      return (0, t.jsx)(T, {
        navItems: y.NAVIGATION.header || [],
        gradient: ['rgba(0,87,255,0.55)', 'rgba(82,39,255,0.45)'],
        accentColor: c.BRAND.colors.bluePrimary,
      });
    }
    var O = e.i(94134);
    let _ = [
      {
        id: 'PROMPT_01',
        title: 'Unificar grid global e margens laterais',
        severity: 'critical',
        category: 'layout',
        objective:
          'Garantir que Home, Sobre e Portfólio usem exatamente o mesmo container (largura útil, gutters e paddings) para obter alinhamento "duas laterais" perfeito em todo o scroll.',
        files: [
          'src/app/layout.tsx',
          'src/components/layout/ClientLayout.tsx',
          'src/components/layout/Container.tsx',
          'src/app/page.tsx',
          'src/app/sobre/page.tsx',
          'src/app/portfolio/page.tsx',
        ],
        actions: [
          'Padronizar um único componente Container com Tailwind (ex.: mx-auto max-w-screen-xl px-4 md:px-6) para refletir exatamente o grid das imagens Ghost.',
          'Garantir que todas as seções principais de Home, Sobre e Portfólio sejam diretamente embrulhadas por esse Container, sem paddings laterais adicionais em cada seção.',
          'Ajustar ClientLayout (se usado) para não duplicar margens/paddings já definidos em Container.',
          'Confirmar que globals.css e Tailwind estão corretamente importados em layout.tsx.',
        ],
        rules: [
          'Mobile-first',
          'Apenas ajustes de layout (sem alterar textos)',
          'Manter o grid idêntico às imagens em docs/HOME, docs/SOBRE e docs/PORTFOLIO',
        ],
        acceptanceCriteria: [
          'Ao rolar de cima a baixo em /, /sobre e /portfolio, as bordas esquerda/direita de títulos, textos e cards mantêm alinhamento perfeito',
          'O item "grid e margens laterais correspondem exatamente à imagem?" pode ser marcado como Sim para todas as seções',
        ],
        status: 'pending',
      },
      {
        id: 'PROMPT_02',
        title: 'Corrigir Header e comportamento de clique em mobile',
        severity: 'critical',
        category: 'mobile',
        objective:
          'Garantir que o Header tenha área de clique/touch consistente, sem interferência na rolagem ou nos CTAs em mobile.',
        files: [
          'src/components/layout/Header.tsx',
          'src/components/layout/header/*',
          'src/app/layout.tsx',
        ],
        actions: [
          'Revisar estrutura de nav e botões de menu (hamburger) para garantir que nenhum elemento overlay capture cliques fora da área esperada.',
          'Em mobile, assegurar que cada item de navegação tenha área mínima de 44×44px (via Tailwind, ex.: px-3 py-2).',
          'Validar se existe algum pointer-events indevido em wrappers do Header que interfiram em cliques no Hero e nas seções abaixo.',
        ],
        rules: [
          'Não alterar o conteúdo textual nem adicionar links novos',
          'Apenas ajustar estrutura e classes Tailwind',
        ],
        acceptanceCriteria: [
          'Em dispositivos touch, todos os links do Header respondem com precisão, sem áreas "mortas" ou cliques acidentais',
          'Nenhum overflow horizontal é introduzido pelo Header',
          'O item "mobile livre de overflow e com touch targets adequados?" pode ser marcado como Sim para Home',
        ],
        status: 'pending',
      },
      {
        id: 'PROMPT_03',
        title: 'Travar Home Hero + GhostScene na referência HERO.jpg',
        severity: 'critical',
        category: 'layout',
        objective:
          'Ajustar tipografia, espaçamento e cena 3D do Hero para ficar 1:1 com docs/HOME/HERO.jpg e o blueprint Ghost.',
        files: [
          'src/components/home/hero/*',
          'src/components/canvas/home/hero/GhostScene.tsx',
        ],
        actions: [
          'Equalizar hierarquia tipográfica (h1, h2/h3, body) com o blueprint, ajustando apenas classes Tailwind (weights, tracking, line-height), sem alterar o texto.',
          'Revisar espaçamentos verticais entre título/subtítulo/CTA para que as distâncias visuais coincidam com a imagem de referência.',
          'Em GhostScene.tsx, ajustar posição, escala e intensidade de luz/materiais para obter o mesmo enquadramento e "glow" do Ghost na HERO.jpg.',
        ],
        rules: [
          'Não mexer no copy',
          'Qualquer ajuste 3D deve preservar performance (usar useFrame apenas quando necessário e memoizar materiais)',
        ],
        acceptanceCriteria: [
          'Comparando a Home Hero com docs/HOME/HERO.jpg, espaçamentos, tipografia e enquadramento do Ghost são indistinguíveis a olho nu',
          'Parallax leve do Ghost permanece suave, sem jitter',
        ],
        status: 'pending',
        dependsOn: ['PROMPT_01'],
      },
      {
        id: 'PROMPT_04',
        title: 'Manifesto: áudio + scroll e grid alinhado',
        severity: 'high',
        category: 'motion',
        objective:
          'Fazer o Manifesto respeitar o grid global e implementar lógica de áudio que auto-mute/unmute conforme a seção entra/sai da viewport.',
        files: [
          'src/components/home/hero/*',
          'src/components/home/ManifestoSection.tsx',
        ],
        actions: [
          'Garantir que o container do Manifesto esteja dentro do mesmo Container global, sem paddings extras.',
          'Implementar observer de scroll (ex.: IntersectionObserver no client) para mutar o áudio quando a seção estiver abaixo de um certo threshold de visibilidade.',
          'Em desktop, permitir que o áudio inicie ao entrar na seção; em mobile, respeitar a necessidade de interação explícita do usuário para iniciar áudio.',
        ],
        rules: [
          'Não alterar o conteúdo do Manifesto',
          'Manter a UI atual, refinando apenas comportamento e layout',
        ],
        acceptanceCriteria: [
          'Manifesto ocupa a mesma largura da Hero/Featured Projects',
          'Áudio nunca continua tocando enquanto a seção está completamente fora de viewport',
          'O checklist de grid/alinhamento e mobile pode ser marcado como Sim para Manifesto',
        ],
        status: 'pending',
        dependsOn: ['PROMPT_01'],
      },
      {
        id: 'PROMPT_05',
        title: 'Featured Projects: grid 100% horizontal e mobile centrado',
        severity: 'critical',
        category: 'layout',
        objective:
          'Fazer os cards de projetos em destaque preencherem 100% da largura do container, com alturas equalizadas por linha e CTAs/textos centralizados em mobile.',
        files: ['src/components/home/featured-projects/*'],
        actions: [
          'Modelar o grid com Tailwind usando combinações de grid-cols-* e auto-fit/auto-fill (ou flex com flex-[x]) para reproduzir a distribuição de larguras da referência, sem espaços vazios.',
          'Garantir que todos os cards de uma mesma linha compartilhem a mesma altura (via items-stretch + conteúdo interno com h-full).',
          'Em mobile, centralizar títulos/descrições/CTAs dos cards e revisar paddings para remover qualquer overflow horizontal.',
        ],
        rules: [
          'Mobile-first',
          'Sem alterar textos',
          'Comparação constante com docs/HOME/HOME-PORTFOLIO-BLACK---GHOST.jpg e docs/HOME/HOME-PORTFOLIO-LAYOUYT-MOBILE---GHOST.jpg',
        ],
        acceptanceCriteria: [
          'Não há gaps horizontais no fim de nenhuma linha',
          'Todos os cards têm mesma altura visual por linha',
          'Em mobile, os CTAs ficam centralizados e facilmente clicáveis',
        ],
        status: 'pending',
        dependsOn: ['PROMPT_01'],
      },
      {
        id: 'PROMPT_06',
        title: 'Portfólio (/portfolio): Mosaic Grid + parallax estilo CodePen',
        severity: 'critical',
        category: 'layout',
        objective:
          'Ajustar o grid de /portfolio para preencher 100% da largura, equalizar alturas por linha e implementar parallax/hover inspirado no CodePen de referência.',
        files: [
          'src/app/portfolio/page.tsx',
          'src/components/portfolio/PortfolioMosaicGrid.tsx',
          'src/components/portfolio/MosaicCard.tsx',
          'src/components/portfolio/PortfolioCard.tsx',
        ],
        actions: [
          'Refatorar PortfolioMosaicGrid para calcular larguras relativas por linha (ex.: colunas flex com basis-* e grow) de forma a sempre fechar 100% da largura do container.',
          'Garantir que todos os cards de uma mesma linha tenham altura igual (via h-full + wrappers internos com flex flex-col e justify-between).',
          'Implementar animações de hover/parallax nos cards usando Framer Motion (ex.: leve translateZ em perspectiva simulada, com easing cubic-bezier(0.22, 1, 0.36, 1)) para aproximar o efeito do CodePen.',
        ],
        rules: [
          'Não alterar estrutura de conteúdo dos cards (título, descrição, tags)',
          'Apenas layout e motion',
        ],
        acceptanceCriteria: [
          'Qualquer linha de cards ocupa 100% da largura do container',
          'Nenhuma linha apresenta gaps residuais',
          'Hover/parallax são fluidos, sem overshoot ou bounce exagerado, replicando a fluidez do CodePen',
        ],
        status: 'pending',
        dependsOn: ['PROMPT_01'],
      },
      {
        id: 'PROMPT_07',
        title: 'About Hero (tipografia) + About Closed (vídeo Supabase)',
        severity: 'critical',
        category: 'accessibility',
        objective:
          'Corrigir a visibilidade do texto em About Hero e implementar troca dinâmica de vídeo Desktop/Mobile em About Closed usando URLs do Supabase.',
        files: [
          'src/components/sobre/AboutHero.tsx',
          'src/components/sobre/AboutClosing.tsx',
        ],
        actions: [
          'Em AboutHero, aplicar classes Tailwind para que o subtítulo/h3 use cor branca e contraste adequado sobre o background, respeitando a escala tipográfica Ghost.',
          'Identificar no Supabase as chaves/URLs de vídeo para Desktop e Mobile (por ex.: colunas about_closed_desktop_url e about_closed_mobile_url).',
          'Em AboutClosing, implementar lógica client-side (hook de breakpoint ou matchMedia) para escolher a URL correta no player de vídeo sem duplicar o componente.',
        ],
        rules: [
          'Não mudar o texto dos títulos',
          'Apenas cores/tailwind para visibilidade e seleção dinâmica de mídia',
        ],
        acceptanceCriteria: [
          'Em qualquer breakpoint, o subtítulo de About Hero é claramente legível',
          'O About Closed carrega automaticamente a versão de vídeo adequada ao viewport (Desktop vs Mobile), sem que o usuário perceba troca de layout',
        ],
        status: 'pending',
      },
      {
        id: 'PROMPT_08',
        title:
          'About Origin / Method / What I Do: scroll animations e glow roxo',
        severity: 'medium',
        category: 'motion',
        objective:
          'Refinar animações de scroll em Origin e Method e implementar/ajustar glow roxo + ícones redondos em What I Do, seguindo a especificação Ghost.',
        files: [
          'src/components/sobre/AboutOrigin.tsx',
          'src/components/sobre/AboutMethod.tsx',
          'src/components/sobre/AboutWhatIDo.tsx',
          'src/components/sobre/motion.ts',
        ],
        actions: [
          'Centralizar as variantes do Framer Motion em motion.ts com um set de easings premium (por exemplo, curvas suaves sem overshoot) e reutilizá-las em todas as seções.',
          'Em Origin/Method, disparar animações apenas quando o bloco estiver parcialmente visível (ex.: 25–30% em viewport) para evitar disparos prematuros.',
          'Em What I Do, ajustar o glow roxo para que o efeito seja suave, sem serrilhado, e centralizar os ícones em círculos perfeitos, respeitando o grid lateral.',
        ],
        rules: [
          'Não alterar textos',
          'Evitar qualquer animação que cause "bounce" exagerado ou fadiga visual',
        ],
        acceptanceCriteria: [
          'As animações de entrada seguem o mesmo timing e easing em todas as seções',
          'O glow roxo nos ícones é sutil mas perceptível, alinhado ao look Ghost',
          'O item "animação de parallax/hover segue a fluidez Ghost?" pode ser marcado como Sim para essas seções',
        ],
        status: 'pending',
        dependsOn: ['PROMPT_07'],
      },
      {
        id: 'PROMPT_09',
        title: 'Centralização absoluta de mídia nos cards de portfólio',
        severity: 'medium',
        category: 'layout',
        objective:
          'Garantir que todas as imagens e vídeos dentro dos cards de portfólio estejam sempre centralizados e preencham o card de forma consistente, independentemente da proporção.',
        files: [
          'src/components/portfolio/PortfolioCard.tsx',
          'src/components/portfolio/ProjectsGallery.tsx',
        ],
        actions: [
          'Envolver a mídia (img/video) em um wrapper com relative overflow-hidden e altura fixa ou proporcional à linha (para suportar alturas equalizadas).',
          'Definir mídia com object-cover object-center w-full h-full para garantir que sempre preencha o espaço sem distorção.',
          'Validar casos extremos de proporção (super wide vs super vertical) para garantir que o recorte preserve a parte visual mais importante do conteúdo.',
        ],
        rules: [
          'Não alterar textos ou ordem de informações do card',
          'Apenas o container de mídia',
        ],
        acceptanceCriteria: [
          'Nenhum card mostra barras pretas/brancas laterais ou em cima/baixo',
          'Todas as mídias parecem perfeitamente centradas e recortadas, mantendo a altura dos cards uniforme por linha',
        ],
        status: 'pending',
        dependsOn: ['PROMPT_06'],
      },
      {
        id: 'PROMPT_10',
        title:
          'Eliminar overflow horizontal e validar touch targets em todo o site',
        severity: 'high',
        category: 'mobile',
        objective:
          'Garantir que todas as páginas estejam livres de scroll horizontal acidental e que todos os CTAs/cards tenham zonas de toque confortáveis em mobile.',
        files: [
          'src/app/page.tsx',
          'src/app/sobre/page.tsx',
          'src/app/portfolio/page.tsx',
          'src/components/home/*',
          'src/components/sobre/*',
          'src/components/portfolio/*',
        ],
        actions: [
          'Auditar todos os wrappers horizontais (carrosséis, grids) para remover larguras fixas que ultrapassem 100vw em mobile.',
          'Garantir que todos os botões/links tenham px-3 py-2 ou superior em mobile, mantendo a identidade Ghost.',
          'Testar manualmente em breakpoints principais (sm/md/lg) para confirmar ausência total de scroll horizontal.',
        ],
        rules: [
          'Não remover seções para resolver overflow',
          'A correção deve ser via layout/responsividade',
        ],
        acceptanceCriteria: [
          'Nenhuma página apresenta scroll horizontal em qualquer breakpoint',
          'Todos os CTAs e cards são facilmente clicáveis em touchscreen',
          'O item "mobile livre de overflow e com touch targets adequados?" pode ser marcado como Sim em todas as seções',
        ],
        status: 'pending',
        dependsOn: ['PROMPT_02', 'PROMPT_05', 'PROMPT_06'],
      },
    ];
    function P({ children: e }) {
      let r = (0, n.usePathname)(),
        o = (0, i.useMemo)(() => r?.startsWith('/admin') ?? !1, [r]);
      return (!(function (e = !0) {
        let t = (0, O.useAntigravityStore)((e) => e.setFlags),
          r = (0, O.useAntigravityStore)((e) => e.setViewport);
        (0, i.useEffect)(() => {
          if (!e) return;
          let i = () => {
            let e = window.innerWidth;
            (r(e, window.innerHeight),
              t(
                (({ viewport: e, prefersReducedMotion: t }) => {
                  let i = {
                    mountWebGL: !0,
                    enableManifestoScroll: !0,
                    enableHoverInteractions: !0,
                    reducedMotion: t,
                    debugMode: !1,
                  };
                  return (
                    'mobile' === e && (i.mountWebGL = !1),
                    t &&
                      ((i.mountWebGL = !1),
                      (i.enableManifestoScroll = !1),
                      (i.enableHoverInteractions = !1)),
                    i
                  );
                })({
                  viewport:
                    e >= 1024 ? 'desktop' : e >= 640 ? 'tablet' : 'mobile',
                  prefersReducedMotion: window.matchMedia(
                    '(prefers-reduced-motion: reduce)'
                  ).matches,
                })
              ));
          };
          return (
            i(),
            window.addEventListener('resize', i),
            () => window.removeEventListener('resize', i)
          );
        }, [e, t, r]);
      })(!o),
      (0, i.useEffect)(() => {
        if (o)
          return (
            document.documentElement.classList.add('admin-page'),
            () => {
              document.documentElement.classList.remove('admin-page');
            }
          );
      }, [o]),
      o)
        ? (0, t.jsx)('main', {
            id: 'main-content',
            className:
              'admin-surface relative min-h-screen bg-slate-950 text-slate-50',
            children: e,
          })
        : (0, t.jsxs)(l.default, {
            children: [
              (0, t.jsx)(C, {}),
              (0, t.jsx)('main', {
                id: 'main-content',
                className: 'relative grow',
                children: e,
              }),
              !1,
            ],
          });
    }
    (_.filter((e) =>
      ['PROMPT_01', 'PROMPT_02', 'PROMPT_05', 'PROMPT_06'].includes(e.id)
    ),
      _.filter((e) => ['PROMPT_03', 'PROMPT_04', 'PROMPT_07'].includes(e.id)),
      _.filter((e) => ['PROMPT_08', 'PROMPT_09', 'PROMPT_10'].includes(e.id)));
    var A = i;
    class z extends A.Component {
      constructor(e) {
        (super(e),
          (this.state = { hasError: !1, error: null, errorInfo: null }));
      }
      static getDerivedStateFromError(e) {
        return { hasError: !0, error: e };
      }
      componentDidCatch(e, t) {
        (console.error('=== ERROR BOUNDARY CAUGHT ==='),
          console.error('Error:', e),
          console.error('Error Message:', e.message),
          console.error('Error Stack:', e.stack),
          console.error('Component Stack:', t.componentStack),
          console.error('=== END ERROR BOUNDARY ==='),
          this.setState({ errorInfo: t }));
      }
      render() {
        return this.state.hasError
          ? (0, t.jsx)('div', {
              className:
                'min-h-screen bg-red-900/20 flex items-center justify-center p-8',
              children: (0, t.jsxs)('div', {
                className:
                  'max-w-2xl w-full bg-black/90 text-white p-8 rounded-xl',
                children: [
                  (0, t.jsx)('h1', {
                    className: 'text-2xl font-bold mb-4 text-red-400',
                    children: '🚨 Something went wrong',
                  }),
                  (0, t.jsx)('div', {
                    className: 'mb-4 p-4 bg-red-900/30 rounded-lg',
                    children: (0, t.jsxs)('p', {
                      className: 'font-mono text-sm break-all',
                      children: [
                        (0, t.jsx)('strong', { children: 'Error:' }),
                        ' ',
                        this.state.error?.message,
                      ],
                    }),
                  }),
                  this.state.error?.stack &&
                    (0, t.jsxs)('details', {
                      className: 'mb-4',
                      children: [
                        (0, t.jsx)('summary', {
                          className:
                            'cursor-pointer text-yellow-400 hover:text-yellow-300',
                          children: 'View full error stack',
                        }),
                        (0, t.jsx)('pre', {
                          className:
                            'mt-2 p-4 bg-gray-900 text-xs overflow-auto max-h-64 rounded',
                          children: this.state.error.stack,
                        }),
                      ],
                    }),
                  this.state.errorInfo?.componentStack &&
                    (0, t.jsxs)('details', {
                      className: 'mb-4',
                      children: [
                        (0, t.jsx)('summary', {
                          className:
                            'cursor-pointer text-yellow-400 hover:text-yellow-300',
                          children: 'View component stack',
                        }),
                        (0, t.jsx)('pre', {
                          className:
                            'mt-2 p-4 bg-gray-900 text-xs overflow-auto max-h-64 rounded whitespace-pre-wrap',
                          children: this.state.errorInfo.componentStack,
                        }),
                      ],
                    }),
                  (0, t.jsxs)('div', {
                    className: 'flex gap-4 mt-6',
                    children: [
                      (0, t.jsx)('button', {
                        onClick: () => window.location.reload(),
                        className:
                          'px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-medium',
                        children: 'Reload Page',
                      }),
                      (0, t.jsx)('button', {
                        onClick: () => {
                          this.setState({
                            hasError: !1,
                            error: null,
                            errorInfo: null,
                          });
                        },
                        className:
                          'px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white font-medium',
                        children: 'Try Again',
                      }),
                    ],
                  }),
                ],
              }),
            })
          : this.props.children;
      }
    }
    function L({ children: e }) {
      let [o, s] = (0, i.useState)([]),
        [n, l] = (0, i.useState)(!1);
      return ((0, i.useEffect)(() => {
        (async () => {
          try {
            let e = await a();
            s(e);
          } catch (e) {
            console.error(
              'Falha ao carregar site_assets:',
              e instanceof Error ? e.message : e
            );
            try {
              let e = await fetch('/api/site-assets');
              if (e.ok) {
                let t = await e.json();
                s(t);
              } else
                console.error(
                  'Erro ao buscar site_assets via API:',
                  e.status,
                  e.statusText
                );
            } catch (e) {
              console.error(
                'Erro fallback de site_assets:',
                e instanceof Error ? e.message : e
              );
            }
          } finally {
            l(!0);
          }
        })();
      }, []),
      n)
        ? (0, t.jsx)(z, {
            children: (0, t.jsx)(r.SiteAssetsProvider, {
              assets: o,
              children: (0, t.jsx)(P, { children: e }),
            }),
          })
        : (0, t.jsx)(P, { children: e });
    }
    e.s(['default', () => L], 66058);
  },
]);
