import {
    space as W,
    meta as cn,
    clamp as H,
    classify as ut,
    ramp as Yo,
    lensFor as Jo,
    plane as er,
    toSpace as Vt,
    hex as Rt,
    spaceCount as Qo,
    LUTOK as ss,
    LUTTGT as Zo,
    pathToRgb as ta,
    mixInSpace as ea,
    rotateHue as nr,
    visibleXYZ as na,
    inVisSolid as os
} from "./core.js";
import sr from "./lore.js";
import {
    primariesOf as or,
    trcOf as ar
} from "./profile.js";
import as from "./groups.js";
import sa from "./reach.js";
import {
    paintPlaneGL as ir,
    paintBarGL as rr,
    setMeshCloud as Us,
    planeGLStatus as oa,
    hasPlaneGL as is,
    hasGamutGL as aa,
    drawMesh3GL as ia,
    has3dGL as cr,
    mesh3Canvas as ra,
    setGLReady as lr,
    warmGL as ca,
    warmMesh3 as la,
    visSurf as Ns,
    lightSurf as da,
    paintGamutGL as dr,
    gamutPos as ur,
    gamutStatus as ua,
    paintImageChanGL as fr,
    imageChanStatus as hr,
    METRICS as Hs,
    siteDist as pr,
    rtFaithful as fa
} from "./gl.js";
import {
    spaces as ha
} from "../wasm.js";
import {
    table as pa,
    verify as ma,
    cube as ga,
    channelwise as rs
} from "../lut.js";
import {
    profile as cs,
    kind as ya
} from "../icc.js";
import Gs from "./names.js";
import * as mr from "./palettes.js";
import {
    SPACES as be,
    sections as ln,
    cname as $e,
    unit as dn,
    disp as he,
    catHTML as Ws,
    HISTORICAL as va,
    DEFAULT as un,
    fpOf as gr,
    decOf as Te,
    fmtc as ba,
    rgbF as Ut,
    lum as yr,
    ink as xe
} from "./render.js";
import _n from "./barred.js";
for (const t of ["n", "n2"]) document.getElementById(t).textContent = Qo;
let U = {
        s: un.s,
        vals: un.vals.slice()
    },
    lt = "oklch",
    Vs = "shorter",
    fn = "js",
    xa = !1;
const vr = {
        pick: "M13.5 6.5 4 16v4h4l9.25-9.25ZM13.5 6.5l2-2a2.65 2.65 0 0 1 3.75 3.75l-2 2",
        upload: "M12 15V4M7.5 8.5 12 4l4.5 4.5M4.5 20h15",
        x: "M18 6 6 18M6 6l12 12",
        plus: "M12 4v16M4 12h16",
        prev: "M15 18l-6-6 6-6",
        next: "M9 6l6 6-6 6",
        prev2: "M17 18l-6-6 6-6M11 18l-6-6 6-6",
        next2: "M7 6l6 6-6 6M13 6l6 6-6 6"
    },
    Rn = t => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="${vr[t]}"/></svg>`,
    zl = Array.from({
        length: 361
    }, (t, e) => {
        let n;
        try {
            if (e < 300) n = W.wavelength.rgb(380 + 320 * e / 299);
            else {
                const o = (e - 300) / 60,
                    i = W.wavelength.rgb(700),
                    a = W.wavelength.rgb(380);
                n = i.map((s, c) => s * (1 - o) + a[c] * o)
            }
        } catch {
            n = [255, 0, 255]
        }
        return n.map(o => Math.round(Math.max(0, Math.min(255, o))))
    }),
    wa = U,
    br = 50,
    xr = 45e3,
    wr = 2200,
    Sr = W.rgb.oklab(...Ut(un.s, un.vals))[0];
let ee = !1,
    Sa = 0,
    Xs = 0,
    ka = "";
const Ea = t => {
        if (ee) {
            if (!dt && t - Xs >= br) {
                Xs = t;
                const e = t - Sa,
                    n = H(e / wr, 0, 1),
                    o = e / xr * 360 % 360,
                    i = o * Math.PI / 180;
                U = {
                    s: "oklch",
                    vals: [Sr + .08 * Math.sin(2 * i) * n, (.16 + .05 * Math.sin(3 * i)) * n, o]
                }, ka = U.vals.join(), jt(!0)
            }
            requestAnimationFrame(Ea)
        }
    },
    Ks = document.getElementById("toast");
let Ma;
const Xt = (t = "Copied") => {
        Ks.textContent = t, Ks.classList.add("on"), clearTimeout(Ma), Ma = setTimeout(() => Ks.classList.remove("on"), 900)
    },
    kr = t => {
        navigator.clipboard?.writeText(t), Xt()
    };
let qn = null;
const hn = document.getElementById("cd"),
    In = hn?.closest(".cdw"),
    Gt = document.getElementById("cval"),
    pn = document.getElementById("gpill"),
    $a = document.getElementById("ftr"),
    Er = document.querySelector(".hueline"),
    Mr = document.querySelector(".fgrad"),
    $r = [Er, Mr, document.getElementById("lutszL"), document.getElementById("api-tab-core")?.parentElement],
    La = 140;
let Ys = null,
    Js = null,
    Ve = 0;
const Lr = t => {
        Ys?.isConnected || (Ys = document.querySelector(".gtabs")), Js?.isConnected || (Js = document.getElementById("cseg"));
        for (const e of [...$r, Ys, Js]) e && e._cur !== t && (e._cur = t, e.style.setProperty("--cur", t));
        if (dt || ee) {
            Ve && (clearTimeout(Ve), Ve = 0);
            return
        }
        clearTimeout(Ve), Ve = 0, document.documentElement._accent !== t && (Ve = setTimeout(() => {
            Ve = 0, !(dt || ee) && (document.documentElement._accent = t, document.documentElement.style.accentColor = t)
        }, La))
    },
    Ce = document.getElementById("palm");
Ce && (Ce.onclick = () => {
    if (!Ge.has(Z)) return;
    U = {
        s: "rgb",
        vals: ho(Z, Kt(), se).rgb.slice()
    }, jt(), ve()
}), Gt && (Gt.addEventListener("input", t => {
    if (!t.isTrusted || Nt || le) return;
    const e = wo(Gt.value);
    if (e) U = e, jt(), ct() && Qt();
    else {
        const n = vc(Gt.value);
        n?.length && (U = {
            s: n[0].s,
            vals: n[0].vals.slice()
        }, jt(), ct() && Qt())
    }
}), Gt.addEventListener("focus", () => requestAnimationFrame(() => Gt.select())), hn.addEventListener("input", t => {
    if (!t.isTrusted || Nt || le) return;
    const e = hn.value;
    U = {
        s: "rgb",
        vals: [1, 3, 5].map(n => parseInt(e.slice(n, n + 2), 16))
    }, jt(), ct() && Qt()
}), Gt.addEventListener("keydown", t => {
    t.key === "Enter" && Gt.blur()
}), Gt.addEventListener("blur", () => vt()));
const ls = document.getElementById("fmtb"),
    Xe = document.getElementById("fmtp");
if (ls) {
    const t = e => {
        Xe.hidden = !e, ls.setAttribute("aria-expanded", String(e))
    };
    ls.onclick = () => {
        if (!Xe.hidden) {
            t(!1);
            return
        }
        const e = Rt(Kt());
        Xe.innerHTML = ro.map(n => `<button class="fmtr${n===De?" on":""}" role="option" aria-selected="${n===De}" data-v="${n}"><i>${n}</i><b class="tnum">${co(n,e)}</b></button>`).join(""), qn && qn.childElementCount && Xe.append(qn), t(!0)
    }, Xe.addEventListener("click", e => {
        const n = e.target.closest(".fmtr");
        n && (lo(n.dataset.v), t(!1))
    }), addEventListener("pointerdown", e => {
        !Xe.hidden && !e.target.closest(".fmtf") && t(!1)
    }), addEventListener("keydown", e => {
        e.key === "Escape" && !Xe.hidden && (t(!1), ls.focus())
    })
}
const Aa = document.querySelector(".cx"),
    ds = document.getElementById("cvfile"),
    Ke = Object.assign(document.createElement("button"), {
        id: "upfl",
        type: "button",
        ariaLabel: "add an image",
        innerHTML: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 4H18.5a2.5 2.5 0 0 1 2.5 2.5V15"/><rect x="3" y="7" width="15" height="13.5" rx="2.5"/><circle cx="13.6" cy="11.3" r="1.6"/><path d="M5.5 17.8 9.5 13.5l3.6 3.9 1.9-2 2.5 2.6"/></svg>'
    }),
    Ta = "test images \u2013 or drop / paste your own";
Ke.dataset.tip = Ta, document.body.append(Ke);
const Be = Object.assign(document.createElement("div"), {
        id: "uppop",
        hidden: !0,
        ariaLabel: "sample images"
    }),
    us = [
        ["chart", "Signal chart \u2013 bars, ramps, hue, limits"],
        ["img/target.jpg", "Color rendition target"],
        ["contrast", "Simultaneous contrast \u2013 one gray, four surrounds"],
        ["video", "Video calibration \u2013 75% bars, PLUGE, multiburst"],
        ["img/colormaps.png", "Colormap paths \u2013 gray, viridis, plasma, inferno, magma, cool-warm, turbo"],
        ["img/glow.png", "Emissive star \u2013 clipped core and chromatic glow"],
        ["img/wave.jpg", "The Great Wave \u2013 Hokusai"]
    ],
    fs = new Set(["chart", "contrast", "video"]),
    Ar = "cs-imgs",
    Qs = () => new Promise((t, e) => {
        const n = indexedDB.open(Ar, 1);
        n.onupgradeneeded = () => n.result.createObjectStore("imgs"), n.onsuccess = () => t(n.result), n.onerror = () => e(n.error)
    }),
    Tr = (t, e) => Qs().then(n => {
        n.transaction("imgs", "readwrite").objectStore("imgs").put(e, t)
    }).catch(() => {}),
    Cr = t => Qs().then(e => new Promise(n => {
        const o = e.transaction("imgs").objectStore("imgs").get(t);
        o.onsuccess = () => n(o.result || null), o.onerror = () => n(null)
    })).catch(() => null),
    _r = t => Qs().then(e => {
        e.transaction("imgs", "readwrite").objectStore("imgs").delete(t)
    }).catch(() => {}),
    Zs = () => {
        try {
            const t = JSON.parse(localStorage.csImgMru || "[]");
            return Array.isArray(t) ? t.filter(e => typeof e == "string") : []
        } catch {
            return []
        }
    },
    Rr = t => {
        try {
            const e = [t, ...Zs().filter(n => n !== t)];
            for (const n of e.splice(7)) n.startsWith("u:") && _r(n);
            localStorage.csImgMru = JSON.stringify(e)
        } catch {}
    },
    to = new Map(us.filter(([t]) => !fs.has(t))),
    eo = (t, e) => {
        const n = Object.assign(document.createElement("button"), {
            type: "button",
            className: "upim",
            title: t,
            ariaLabel: "use " + t
        });
        return n.addEventListener("click", () => {
            mn(!1), e()
        }), n
    },
    Ca = new Map;
let _a = null;
async function qr() {
    Be.querySelectorAll(".upim").forEach(o => {
        o._url && URL.revokeObjectURL(o._url), o.remove()
    });
    const t = new Map;
    for (const o of Zs())
        if (o.startsWith("u:")) {
            const i = await Cr(o);
            i && t.set(o, i)
        } const e = Zs().filter(o => t.has(o) || to.has(o) || fs.has(o));
    for (const [o] of us) !e.includes(o) && e.length < 7 && e.push(o);
    for (const o of e.slice(0, 7))
        if (to.has(o)) {
            const i = eo(to.get(o), () => fetch(o).then(a => a.blob()).then(a => Je(new File([a], o.split("/").pop(), {
                type: a.type || "image/jpeg"
            }), o)).catch(() => Xt("could not load that image")));
            i.append(Object.assign(document.createElement("img"), {
                src: o,
                alt: "",
                loading: "lazy",
                decoding: "async"
            })), Be.append(i)
        } else if (fs.has(o)) {
        const i = Ca.get(o) ?? ji(o);
        Ca.set(o, i);
        const a = us.find(([c]) => c === o)[1],
            s = eo(a, () => i.toBlob(c => c && Je(new File([c], `${o}.png`, {
                type: "image/png"
            }), o)));
        s.append(i), Be.append(s)
    } else {
        const i = t.get(o),
            a = eo(i.name || "your image", () => Je(i, o));
        a._url = URL.createObjectURL(i), a.append(Object.assign(document.createElement("img"), {
            src: a._url,
            alt: "",
            decoding: "async"
        })), Be.append(a)
    }
    const n = Object.assign(document.createElement("button"), {
        type: "button",
        className: "upim upld",
        title: "upload your own",
        ariaLabel: "upload an image",
        innerHTML: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V4M7.5 8.5 12 4l4.5 4.5"/><path d="M4.5 20h15"/></svg>'
    });
    n.addEventListener("click", () => {
        mn(!1), ds?.click()
    }), Be.append(n)
}
let Pn = !1;
const mn = t => {
    Pn = t, t ? ((_a ??= qr().finally(() => {
        _a = null
    })).then(() => {
        Pn && (Be.hidden = !1)
    }), Ke.dispatchEvent(new PointerEvent("pointerleave", {
        bubbles: !0
    })), document.getElementById("tip")?.setAttribute("aria-hidden", "true"), delete Ke.dataset.tip) : (Ke.dataset.tip = Ta, Be.hidden = !0)
};
Ke.addEventListener("click", () => mn(!Pn)), addEventListener("pointerdown", t => {
    Pn && !t.target.closest("#uppop,#upfl") && mn(!1)
}), addEventListener("keydown", t => {
    t.key === "Escape" && Pn && (mn(!1), Ke.focus())
}), document.body.append(Be);
const qt = Object.assign(document.createElement("canvas"), {
        id: "imgpk"
    }),
    Ra = Object.assign(document.createElement("div"), {
        id: "imgfloat"
    }),
    qa = Object.assign(document.createElement("button"), {
        id: "imgx",
        type: "button",
        title: "remove the image",
        ariaLabel: "remove the image",
        innerHTML: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>'
    });
Ra.append(qt, qa), document.body.append(Ra);
const Ir = () => {
        const t = Lt?.src;
        if (!t) return;
        const e = Math.round(Math.min(280, Math.max(180, t.width), innerWidth * .3)),
            n = Math.round(e * t.height / t.width);
        qt.width = t.width, qt.height = t.height, qt.getContext("2d").drawImage(t, 0, 0), qt.style.width = e + "px", qt.style.height = n + "px"
    },
    Ia = t => {
        const e = qt.getBoundingClientRect(),
            n = Math.floor((t.clientX - e.left) / e.width * qt.width),
            o = Math.floor((t.clientY - e.top) / e.height * qt.height);
        if (n < 0 || o < 0 || n >= qt.width || o >= qt.height) return;
        const i = qt.getContext("2d", {
            willReadFrequently: !0
        }).getImageData(n, o, 1, 1).data;
        U = {
            s: "rgb",
            vals: [i[0], i[1], i[2]]
        }, jt(), ct() && Qt()
    };
let Ye = null;
qt.addEventListener("pointerdown", t => {
    Ye = t.pointerId, qt.setPointerCapture(Ye), Ia(t)
}), qt.addEventListener("pointermove", t => {
    t.pointerId === Ye && Ia(t)
});
const Pa = t => {
    if (t.pointerId === Ye) {
        Ye = null;
        try {
            qt.releasePointerCapture(t.pointerId)
        } catch {}
        vt(), ct() ? (Gi(), Qt()) : es()
    }
};
qt.addEventListener("pointerup", Pa), qt.addEventListener("pointercancel", Pa), qt.title = "press and drag to pick \u2014 the release keeps the colour", qa.addEventListener("click", () => Dr()), ds?.addEventListener("change", () => {
    const t = ds.files?.[0];
    t && Je(t), ds.value = ""
});
const gn = document.getElementById("dropcast"),
    no = t => [...t.dataTransfer?.items || []].some(e => e.kind === "file" && e.type.startsWith("image/")),
    Je = (t, e) => {
        !t || !(/^image\//.test(t.type) || /\.hei[cf]$/i.test(t.name || "")) || (mn(!1), e || (e = "u:" + (t.name || "image") + ":" + (t.size || 0), Tr(e, t)), Rr(e), Pr(t))
    };
async function Pr(t) {
    try {
        const {
            sampleImage: e
        } = await import("./extract.js"), n = await e(t);
        if (!n.length) return Xt("no opaque pixels in that image");
        const o = n.src;
        Qn = o, Et && o && (Et._user != null ? Et[Et._user] = o : (Et.push(o), Et._user = Et.length - 1), $n = Et._user), o && (We = o), Or(n), ct() && Zn(), Xt("histogram from the image")
    } catch {
        Xt("could not read that image")
    }
}
let hs = 0;
addEventListener("dragenter", t => {
    no(t) && (hs++, gn && (gn.hidden = !1))
}), addEventListener("dragleave", () => {
    hs && !--hs && gn && (gn.hidden = !0)
}), addEventListener("dragover", t => {
    no(t) && t.preventDefault()
}), addEventListener("drop", t => {
    if (hs = 0, gn && (gn.hidden = !0), !no(t) || (t.preventDefault(), t.target.closest?.("#detail"))) return;
    const e = [...t.dataTransfer.files].find(n => n.type.startsWith("image/"));
    e && Je(e)
}), addEventListener("paste", t => {
    const e = [...t.clipboardData?.items || []].find(n => n.type.startsWith("image/"));
    e && (t.preventDefault(), Je(e.getAsFile()))
});
const Kt = () => Ut(U.s, U.vals),
    Fr = (t, e) => {
        if (e === t.s) return t.vals;
        try {
            const n = ut(e).ch;
            return Vt(e, Ut(t.s, t.vals)).map((o, i) => {
                const a = n[i];
                return a ? H(o, a.min, a.max) : o
            })
        } catch {
            return null
        }
    },
    yn = 768,
    Br = 24576,
    jr = 8192,
    zr = 8,
    je = window.requestIdleCallback?.bind(window) || (t => setTimeout(() => {
        const e = performance.now();
        t({
            timeRemaining: () => Math.max(0, 8 - (performance.now() - e))
        })
    }, 40));
let Lt = null,
    Qe = 0,
    so = 0;
const _e = new Map,
    we = new Set,
    vn = new Map,
    Se = new Map,
    Dl = "http://www.w3.org/2000/svg",
    ke = new Map;
let Fn = null;
const ps = () => {
        if (!ke.size) return null;
        if (Fn) return Fn;
        let t = null;
        for (const e of ke.values()) {
            const n = Se.get(e.s);
            if (!n) {
                we.add(e.s), bn();
                continue
            }
            const o = ut(e.s),
                i = o.ch[e.i],
                {
                    v: a,
                    dim: s,
                    n: c
                } = n;
            t || (t = new Uint8Array(c).fill(1));
            for (let r = 0; r < c; r++) {
                if (!t[r]) continue;
                const d = (a[r * s + e.i] - i.min) / (i.max - i.min);
                d >= e.lo && d <= e.hi || (t[r] = 0)
            }
        }
        return Fn = t
    },
    Fa = () => {
        if (!Lt) {
            Us(null);
            return
        }
        const t = Lt.length / 3,
            e = Math.min(t, jr),
            n = ps(),
            o = new Float32Array(e * 3);
        let i = 0;
        for (let a = 0; a < e; a++) {
            if (n && !n[a]) continue;
            const s = a * 2654435761 % t;
            o[i * 3] = Lt[s * 3], o[i * 3 + 1] = Lt[s * 3 + 1], o[i * 3 + 2] = Lt[s * 3 + 2], i++
        }
        Us(o.subarray(0, i * 3), Qe + "|" + i), ct() && ue()
    };
let Ba = 0,
    ja = 0;
const za = () => {
        const t = performance.now();
        if (t - Ba < 120) {
            clearTimeout(ja), ja = setTimeout(za, 130);
            return
        }
        Ba = t;
        for (const e of [..._e.keys()]) {
            if (!Ss.has(e) && e !== lt) {
                _e.delete(e), we.add(e);
                continue
            }
            const n = Se.get(e);
            n && _e.set(e, Ua(Oa(n, ut(e), ps())))
        }
        bn(), kt.querySelectorAll(".ent[data-s]").forEach(e => delete e.dataset.v), ae(), vt()
    },
    Da = () => {
        Fn = null, Qe++, Fa(), za(), document.body.classList.toggle("brushed", !!ke.size), G.querySelectorAll(".bar2").forEach(t => {
            t._hist && (t._hist._p = null)
        }), kt.querySelectorAll(".ent[data-s]").forEach(t => delete t.dataset.v), ct() && Qt(), ae(), vt()
    },
    oo = (t, e, n, o) => {
        const i = t + "|" + e;
        o - n < .004 ? ke.delete(i) : ke.set(i, {
            s: t,
            i: e,
            lo: Math.max(0, n),
            hi: Math.min(1, o)
        }), Da()
    };
addEventListener("keydown", t => {
    t.key === "Escape" && ke.size && (ke.clear(), Da())
});
const Dr = () => {
        Lt = null, Qn = null, ke.clear(), Fn = null, Us(null), _e.clear(), we.clear(), vn.clear(), Se.clear(), Qe++, document.body.classList.remove("himg", "brushed"), Et && Et._user != null && (Et.splice(Et._user, 1), Et._user = null, We = Et[0], $n = 0), G.querySelectorAll(".bar2").forEach(t => {
            t._hist && (t._hist._p = null, t._hist.style.display = "none")
        }), kt.querySelectorAll(".ent[data-s]").forEach(t => delete t.dataset.v), ct() ? (fe(!1), Zn()) : ae()
    },
    Or = t => {
        Lt = t, _e.clear(), we.clear(), vn.clear(), Se.clear(), Qe++, document.body.classList.toggle("himg", !!t), Fa(), t?.src && Ir(), ct() ? fe(!1) : ae()
    };

function Oa(t, e, n) {
    const {
        v: o,
        dim: i,
        n: a
    } = t, s = e.ch.map(() => new Float32Array(yn));
    for (let c = 0; c < a; c++)
        if (!(n && !n[c]))
            for (let r = 0; r < e.ch.length; r++) {
                const d = e.ch[r],
                    f = (o[c * i + r] - d.min) / (d.max - d.min);
                if (!(f >= 0 && f <= 1)) continue;
                const l = f * (yn - 1),
                    h = l | 0,
                    S = l - h;
                s[r][h] += 1 - S, h + 1 < yn && (s[r][h + 1] += S)
            }
    return s
}

function Ur(t) {
    let e = vn.get(t);
    if (!e) {
        const s = ut(t),
            c = Lt.length / 3;
        e = {
            cls: s,
            n: c,
            cnt: Math.min(c, Br),
            k: 0,
            dim: s.ch.length
        }, e.v = new Float32Array(e.cnt * e.dim), vn.set(t, e)
    }
    const {
        cls: n,
        n: o,
        cnt: i
    } = e, a = performance.now();
    for (; e.k < i; e.k++) {
        if (!(e.k & 31) && performance.now() - a > zr) return !1;
        const s = e.k * 2654435761 % o;
        let c;
        try {
            c = Vt(t, [Lt[s * 3], Lt[s * 3 + 1], Lt[s * 3 + 2]])
        } catch {
            continue
        }
        for (let r = 0; r < e.dim; r++) e.v[e.k * e.dim + r] = c[r]
    }
    return vn.delete(t), Se.set(t, {
        v: e.v,
        dim: e.dim,
        n: i
    }), _e.set(t, Ua(Oa(Se.get(t), n, ps()))), Se.size > 10 && Se.delete(Se.keys().next().value), !0
}
const Ua = t => t.map(e => {
        const n = Float32Array.from(e).sort(),
            o = n[Math.floor(yn * .97)] || n[yn - 1];
        if (!o) return null;
        const i = yn,
            a = 64,
            s = Object.assign(document.createElement("canvas"), {
                width: i,
                height: a
            }),
            c = s.getContext("2d"),
            r = c.createLinearGradient(0, 0, 0, a);
        r.addColorStop(0, "rgba(0,0,0,.9)"), r.addColorStop(.8, "rgba(0,0,0,.82)"), r.addColorStop(1, "rgba(0,0,0,.74)"), c.fillStyle = r;
        for (let d = 0; d < i; d++) {
            const f = Math.min(1, e[d] / o) * a;
            f > 0 && c.fillRect(d, a - f, 1, f)
        }
        c.fillStyle = "#000";
        for (let d = 0; d < i; d++) {
            const f = Math.min(1, e[d] / o) * a;
            f > 0 && c.fillRect(d, Math.max(0, a - f - 1.2), 1, 1.2)
        }
        return "url(" + s.toDataURL() + ")"
    }),
    bn = () => {
        so || (so = je(t => {
            if (so = 0, dt) {
                bn();
                return
            }
            let e = !1;
            for (const n of we) {
                if (t.didTimeout && e || !t.didTimeout && t.timeRemaining() < 3) break;
                e = !0;
                let o;
                try {
                    o = Ur(n)
                } catch {
                    o = !0, _e.set(n, null)
                }
                if (!o) break;
                we.delete(n);
                const i = kt.querySelector('.ent[data-s="' + CSS.escape(n) + '"]');
                i && (delete i.dataset.v, ae([i])), ct() && lt === n && fe(!1)
            }
            we.size && bn()
        }, {
            timeout: 400
        }))
    };
let Bn = {},
    jn = null;
const At = t => (jn !== U && (jn = U, Bn = {}), Bn[t] ??= Fr(U, t)),
    Nr = () => {
        const {
            s: t,
            vals: e
        } = U, n = 1e-4, o = (a, s) => a.every(c => c >= -n && c <= s + n), i = a => t === a ? e : W[t][a](...e);
        try {
            if (o(i("rgb"), 255)) return "srgb";
            if (o(i("p3"), 1)) return "p3";
            if (o(i("rec2020"), 1)) return "rec2020"
        } catch {}
        try {
            const a = t === "xyz" ? e : W[t].xyz(...e);
            if (a.every(isFinite) && na(...a)) return os(...a) ? "vis" : "locus"
        } catch {}
        return "clip"
    },
    ze = t => +t.toFixed(1) + "",
    zn = t => +t.toFixed(2) + "",
    Re = t => +t.toFixed(3) + "",
    Hr = new Set(["slog3", "sgamut3cine", "logc3", "clog2", "clog3", "vlog", "log3g10"]),
    ms = {
        rgb: t => `rgb(${t.map(e=>Math.round(e)).join(" ")})`,
        hsl: t => `hsl(${ze(t[0])} ${ze(t[1])}% ${ze(t[2])}%)`,
        hwb: t => `hwb(${ze(t[0])} ${ze(t[1])}% ${ze(t[2])}%)`,
        lab: t => `lab(${zn(t[0])} ${zn(t[1])} ${zn(t[2])})`,
        lchab: t => `lch(${zn(t[0])} ${zn(t[1])} ${ze(t[2])})`,
        oklab: t => `oklab(${t.map(Re).join(" ")})`,
        oklch: t => `oklch(${Re(t[0])} ${Re(t[1])} ${ze(t[2])})`,
        lrgb: t => `color(srgb-linear ${t.map(Re).join(" ")})`,
        p3: t => `color(display-p3 ${t.map(Re).join(" ")})`,
        a98rgb: t => `color(a98-rgb ${t.map(Re).join(" ")})`,
        prophoto: t => `color(prophoto-rgb ${t.map(Re).join(" ")})`,
        rec2020: t => `color(rec2020 ${t.map(Re).join(" ")})`,
        xyz: t => `color(xyz-d65 ${t.map(e=>Re(e/100)).join(" ")})`
    };
let gs = location.pathname.replace(/index\.html$/, "");
{
    const t = gs.match(/([^/]+?)(?:\.html)?\/?$/),
        e = t && t[1];
    e && be.includes(e) && (gs = gs.slice(0, t.index))
}
const ys = t => gs + (t || ""),
    Na = t => {
        t = t.replace(/%(?![0-9a-fA-F]{2})/g, "%25");
        try {
            return decodeURIComponent(t)
        } catch {
            return t
        }
    },
    ne = {
        hash: Na(location.hash.slice(1)),
        q: new URLSearchParams(location.search).get("s"),
        seg: (location.pathname.match(/([^/]+?)(?:\.html)?\/?$/) || [])[1],
        sw: new URLSearchParams(location.search).has("sw")
    };
let Ha = performance.now(),
    qe = "";
const ao = () => {
        const t = Rt(Kt()).toLowerCase();
        return De === "hex" ? t.slice(1) : co(De, t).replace(/%/g, "%25").replace(/ /g, "%20")
    },
    io = () => {
        try {
            const t = new URLSearchParams(location.search);
            t.delete("sw"), t.delete("s");
            const e = t.toString();
            return e ? "?" + e : ""
        } catch {
            return ""
        }
    };

function Gr(t) {
    const e = performance.now();
    if (e - Ha < 250 || location.hash && location.hash !== (qe.split("#")[1] != null ? "#" + qe.split("#")[1] : "")) return;
    const n = ys(ct() ? lt : "") + io() + "#" + ao();
    n !== qe && (Ha = e, qe = n, history.replaceState(null, "", n))
}
const Wr = document.querySelector('link[rel="icon"]');
let Ga = 0,
    Wa = "";

function Vr(t) {
    const e = performance.now();
    e - Ga < 250 || t === Wa || (Ga = e, Wa = t, Wr.href = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><rect x='2.34' y='2.34' width='11.32' height='11.32' fill='${encodeURIComponent(t)}' transform='rotate(45 8 8)'/></svg>`)
}

function Ol(t, e) {
    const n = ut(t);
    return e.map((o, i) => `${n.ch[i].sym}${pe(o,n.ch[i])}${dn(n.ch[i])}`).join(" ")
}

function Xr(t, e) {
    const n = ut(t);
    return `${t}(${e.map((o,i)=>pe(o,n.ch[i])+dn(n.ch[i])).join(" ")})`
}
const Kr = new Set(["rgb", "hsl", "hwb", "lab", "lchab", "oklab", "oklch", "p3", "a98rgb", "prophoto", "rec2020", "xyz", "xyz-d50", "lrgb"]);

function Va(t, e) {
    const n = i => Math.round(i),
        o = (i, a) => i.toFixed(a);
    switch (t) {
        case "rgb":
            return `rgb(${n(e[0])} ${n(e[1])} ${n(e[2])})`;
        case "hsl":
            return `hsl(${n(e[0])} ${o(e[1],1)}% ${o(e[2],1)}%)`;
        case "hwb":
            return `hwb(${n(e[0])} ${o(e[1],1)}% ${o(e[2],1)}%)`;
        case "lab":
            return `lab(${o(e[0],2)}% ${o(e[1],2)} ${o(e[2],2)})`;
        case "lchab":
            return `lch(${o(e[0],2)}% ${o(e[1],2)} ${o(e[2],2)})`;
        case "oklab":
            return `oklab(${o(e[0],4)} ${o(e[1],4)} ${o(e[2],4)})`;
        case "oklch":
            return `oklch(${o(e[0],4)} ${o(e[1],4)} ${o(e[2],1)})`;
        case "p3":
            return `color(display-p3 ${e.map(i=>o(i,4)).join(" ")})`;
        case "a98rgb":
            return `color(a98-rgb ${e.map(i=>o(i,3)).join(" ")})`;
        case "prophoto":
            return `color(prophoto-rgb ${e.map(i=>o(i,3)).join(" ")})`;
        case "rec2020":
            return `color(rec2020 ${e.map(i=>o(i,3)).join(" ")})`;
        case "xyz":
            return `color(xyz-d65 ${e.map(i=>o(i/100,3)).join(" ")})`;
        case "xyz-d50":
            return `color(xyz-d50 ${e.map(i=>o(i/100,3)).join(" ")})`;
        case "lrgb":
            return `color(srgb-linear ${e.map(i=>o(i,3)).join(" ")})`;
        case "cmyk":
            return `device-cmyk(${e.map(i=>n(i)+"%").join(" ")})`;
        default:
            return Xr(t, e)
    }
}
const ro = ["hex", "rgb", "hsl", "oklch", "oklab", "lab", "lch", "p3"];
let De = ro.includes(localStorage.csFmt) ? localStorage.csFmt : "hex";
const Yr = {
        lch: "lchab"
    },
    co = (t, e) => {
        if (t === "hex") return e;
        try {
            const n = Yr[t] || t;
            return Va(n, Vt(n, Kt()))
        } catch {
            return e
        }
    },
    lo = t => {
        De = t, localStorage.csFmt = t, vt()
    },
    Xa = t => co(De, t),
    Jr = t => {
        if (t > 3) return [
            [0, 1],
            [1, 2],
            [2, 0]
        ];
        const e = [];
        for (let n = 0; n < t; n++)
            for (let o = n + 1; o < t; o++) e.push([n, o]);
        return e.slice(0, 3)
    },
    Dn = t => t.angle ? t.angle.i : t.ch.length !== 3 ? -1 : t.ch.findIndex(e => /hue/i.test(e.name || "")),
    uo = t => {
        const e = Dn(t);
        if (e < 0) return {
            ai: -1,
            ti: t.tone ? t.tone.i : 0,
            mi: -1
        };
        const n = [0, 1, 2].filter(i => i !== e),
            o = t.tone && t.tone.i !== e ? t.tone.i : n[1];
        return {
            ai: e,
            ti: o,
            mi: n.find(i => i !== o)
        }
    },
    Qr = t => {
        const e = ut(t),
            n = Dn(e),
            o = e.tone?.i ?? (n < 0 && e.ch.length === 3 ? 0 : void 0);
        return Jr(e.ch.length).map(([i, a]) => n === a || o === i ? [a, i] : [i, a])
    },
    Ka = (t, e, n) => {
        const o = Dn(t);
        return o >= 0 && e === o && t.ch.length === 3
    },
    Zr = {
        hsv: 1,
        okhsv: 1,
        hsl: 2,
        okhsl: 2,
        hcl: 2,
        hcy: 2,
        hwb: 3,
        okhwb: 3,
        ostwald: 3
    },
    fo = (t, e, n, o) => {
        const i = Zr[t];
        if (!i) return 0;
        const a = Dn(e);
        return n === a || o === a ? 0 : i
    },
    vs = (t, e, n) => {
        if (t.ch.length !== 3) return 0;
        if (Dn(t) >= 0) {
            const i = t.ch.findIndex(a => /Black/i.test(a.name || ""));
            return i >= 0 && t.ch.some(a => /White/i.test(a.name || "")) && n === i ? 2 : 0
        }
        const o = [0, 1, 2].filter(i => i !== (t.tone?.i ?? 0));
        return (e === o[1] ? 1 : 0) | (n === o[1] ? 2 : 0)
    };
let bs = {};
try {
    bs = JSON.parse(localStorage.csPolarP || "{}")
} catch {}
let xs = {};
try {
    xs = JSON.parse(localStorage.csTriP || "{}")
} catch {}
const Ya = (t, e, n) => xs[`${t}:${e},${n}`] ?? !1,
    Ja = (t, e, n, o) => bs[`${t}:${n},${o}`] ?? o !== uo(e).ti,
    Yt = t => t.map(e => H(Math.round(e), 0, 255)),
    Qa = t => t[0] << 16 | t[1] << 8 | t[2],
    tc = {},
    Za = t => Za[t] ??= (t === "names" ? Object.entries(Gs) : mr[t]).map(([e, n]) => ({
        n: e,
        rgb: n,
        ok: W.rgb.oklab(...n),
        lab: W.rgb.lab(...n)
    }));

function ho(t, e, n = se) {
    const o = Yt(e),
        i = Qa(o),
        a = tc[t + ":" + n] ??= new Map,
        s = a.get(i);
    if (s) return s;
    a.size > 65536 && a.clear();
    const c = {
        rgb: o,
        ok: W.rgb.oklab(...o),
        lab: W.rgb.lab(...o)
    };
    let r = null,
        d = 1e9;
    for (const f of Za(t)) {
        const l = pr(n, c, f);
        l < d && (d = l, r = f)
    }
    return a.set(i, r), r
}
const ec = {
        rgb: "CSS \xB7 canvas \xB7 the web default",
        hsl: "CSS \xB7 quick pickers",
        hsv: "design-tool pickers",
        hwb: "intuitive mixing \xB7 CSS",
        hsi: "machine vision",
        oklab: "gradients \xB7 gamut mapping",
        oklch: "design tokens \xB7 CSS palettes",
        okhsl: "perceptual pickers",
        okhsv: "perceptual pickers",
        okhwb: "perceptual pickers",
        oklrab: "picker internals",
        oklrch: "picker internals",
        lab: "\u0394E \xB7 print QC \xB7 interchange",
        lchab: "perceptual palettes",
        "lab-d65": "display-native \u0394E",
        "lch-d65": "display-native palettes",
        luv: "additive light \xB7 lighting",
        lchuv: "lighting \xB7 displays",
        hsluv: "accessible palettes",
        hpluv: "pastel palettes",
        cam16: "appearance modeling",
        "cam16-ucs": "\u0394E \xB7 gamut mapping",
        "cam16-lcd": "large-\u0394E metrics",
        "cam16-scd": "small-\u0394E metrics",
        ciecam02: "ICC v4 profiles",
        "cam02-ucs": "\u0394E research",
        "cam02-lcd": "large-\u0394E metrics",
        "cam02-scd": "small-\u0394E metrics",
        hct: "Material Design theming",
        hellwig2022: "appearance research",
        zcam: "HDR appearance",
        rlab: "appearance (Fairchild)",
        xyz: "colorimetry hub \xB7 calibration",
        "xyz-d50": "ICC interchange",
        "xyz-abs-d65": "absolute luminance",
        xyy: "chromaticity diagrams",
        lms: "chromatic adaptation",
        uv: "CCT \xB7 LED binning",
        macboyn: "vision science",
        dkl: "cone-opponent vision",
        dsh: "dominant wavelength",
        gray: "luminance ops",
        kelvin: "color temperature",
        wavelength: "spectral colors",
        ycbcr: "JPEG \xB7 MPEG \xB7 H.264",
        jpeg: "JPEG encoding",
        yuv: "analog PAL",
        yiq: "NTSC",
        ydbdr: "SECAM",
        ypbpr: "component video",
        ycgco: "lossless codecs",
        yccbccrc: "BT.2020 video",
        xvycc: "extended-gamut video",
        "smpte-c": "legacy broadcast",
        photoycc: "Photo CD archives",
        rec709: "HDTV cameras",
        rec2020: "UHD masters",
        "rec2020-linear": "UHD compositing",
        "rec2100-pq": "HDR10 \xB7 Dolby Vision",
        "rec2100-hlg": "broadcast HDR",
        "rec2100-linear": "HDR compositing",
        ictcp: "HDR grading \xB7 \u0394E ITP",
        jzazbz: "HDR uniform math",
        jzczhz: "HDR palettes",
        ipt: "hue-preserving ops",
        izazbz: "HDR research",
        "hdr-ipt": "HDR appearance",
        "hdr-cie-lab": "HDR reflectance",
        icacb: "HDR \u0394E",
        acescg: "CGI \xB7 compositing",
        acescc: "cinema grading",
        acescct: "grading with toe",
        "aces2065-1": "archival masters",
        logc3: "ARRI workflows",
        logc4: "ARRI ALEXA 35",
        slog2: "Sony cameras",
        slog3: "Sony cine cameras",
        vlog: "Panasonic cameras",
        log3g10: "RED cameras",
        clog: "Canon cameras",
        clog2: "Canon cine",
        clog3: "Canon cine",
        flog: "Fujifilm cameras",
        flog2: "Fujifilm cameras",
        nlog: "Nikon cameras",
        applelog: "iPhone ProRes Log",
        bmdfilm: "Blackmagic cameras",
        dlog: "DJI drones",
        cineon: "film scans \xB7 DPX",
        p3: "Apple displays \xB7 wide CSS",
        "p3-linear": "wide-gamut math",
        "dci-p3": "cinema projection",
        a98rgb: "photo print workflows",
        prophoto: "photo editing",
        rimm: "scene-referred photo",
        scrgb: "Windows HDR",
        lrgb: "physically-correct blending",
        cmyk: "print separation",
        cmy: "subtractive teaching",
        munsell: "soil \xB7 art \xB7 standards",
        "ral-design": "industrial coatings",
        coloroid: "architecture",
        ryb: "artist color mixing",
        tsl: "skin detection",
        yes: "face detection",
        hsm: "skin segmentation",
        ohta: "image segmentation",
        rg: "illumination-invariant vision",
        hcg: "pickers",
        hcl: "legacy pickers",
        hcy: "shader luma pickers",
        hsp: "perceived brightness",
        xyb: "JPEG XL",
        osaucs: "uniform-scales research",
        ucs: "CIE history",
        uvw: "CIE history",
        labh: "reflectance QC",
        "din99o-lab": "\u0394E99o difference",
        "din99o-lch": "\u0394E99o palettes",
        din99d: "\u0394E99d difference",
        prolab: "projective perceptual math",
        sucs: "lightweight uniform math",
        anlab: "historical \u0394E",
        srlab2: "Lab-successor math",
        "cie-rgb": "colorimetry history",
        ntsc: "gamut benchmark",
        "apple-rgb": "legacy Mac",
        pal: "legacy PAL",
        "smpte-240m": "early HDTV"
    },
    nc = t => ec[t] || (t.endsWith("-linear") ? "linear-light math" : {
        polar: "pickers \xB7 palettes",
        opponent: "perceptual math",
        additive: "device RGB",
        strips: "component work"
    } [ut(t).archetype]),
    ws = t => ({
        polar: "polar",
        opponent: "opponent",
        additive: "component",
        strips: "component"
    })[ut(t).archetype],
    ti = t => /linear|^lrgb$|scrgb|acescg|aces2065|rec2100-linear/.test(t) ? "linear" : /pq|jz|izaz|zcam|ictcp|icacb/.test(t) ? "PQ" : /hlg/.test(t) ? "HLG" : /log|cineon|acescc|acescct|bmdfilm|davinci|filmicpro|protune|viper|panalog|flog|clog|nlog|dlog|tlog|vlog|applelog|milog|olog/.test(t) ? "log" : /rgb|p3|rec709|rec2020|prophoto|rimm|ntsc|pal|smpte|dci/.test(t) ? "gamma" : /ycbcr|yuv|yiq|ypbpr|jpeg|ycc|ycgco|xvycc|photoycc/.test(t) ? "luma / chroma" : /lab|luv|ok|cam|hct|din|ipt|ucs|osa|munsell|coloroid|ral/.test(t) ? "perceptual" : "",
    sc = (t, e) => e.sin || (/^(hsl|hsv|hwb|hsi|hcg|hcy|hsp|hsm)$/.test(t) ? "equal numeric steps do not look visually even \u2013 for perceptual steps use OKLab/OKLCH or a uniform space" : ""),
    ei = t => (t = t.trim(), /^[a-z][a-z]/.test(t) && (t = t[0].toUpperCase() + t.slice(1)), /[.!?…]$/.test(t) ? t : t + "."),
    Ze = {
        display: "display-referred \u2013 values describe light emitted by a display",
        scene: "scene-referred \u2013 values describe light in the scene, as a camera sees it",
        SDR: "standard dynamic range \u2013 bounded display signals",
        HDR: "high dynamic range \u2013 extended or unbounded luminance",
        polar: "polar geometry \u2013 a hue angle plus radial chroma/saturation",
        opponent: "opponent geometry \u2013 two signed color axes around a neutral center",
        component: "component geometry \u2013 independent channels, no hue axis",
        historical: "shipped as working history \u2013 superseded in practice, kept faithful",
        css: "expressible as a native CSS color \u2013 rgb()/hsl()/lab()/oklch()/color(\u2026)",
        1: "one channel \u2013 a scalar scale (gray, kelvin, wavelength)",
        2: "two channels \u2013 chromaticity pairs",
        3: "three channels \u2013 the tristimulus norm",
        4: "four channels \u2013 cmyk",
        linear: "code proportional to physical light \u2013 no transfer curve",
        PQ: "PQ (SMPTE ST 2084) \u2013 absolute-luminance HDR encoding, up to 10,000 nits",
        HLG: "hybrid log-gamma (BBC/NHK) \u2013 backward-compatible broadcast HDR",
        log: "logarithmic camera encoding \u2013 wide scene range packed into a small code range",
        gamma: "gamma-companded RGB \u2013 a power-law curve over linear light",
        "luma / chroma": "luma plus two chroma differences \u2013 the broadcast / compression layout",
        perceptual: "coordinates modeled on human vision \u2013 equal numeric steps aim to look equal",
        D65: "CIE standard illuminant D65 \u2013 average daylight, \u22486504 K; the sRGB / Rec.709 / Rec.2020 reference white. 2\xB0 standard observer",
        D50: "CIE standard illuminant D50 \u2013 horizon daylight, \u22485003 K; the print and ICC-PCS white. 2\xB0 standard observer",
        D60: "\u22486000 K daylight \u2013 the ACES white point (x 0.32168, y 0.33767). 2\xB0 standard observer",
        DCI: "the cinema-projector white (x 0.314, y 0.351, SMPTE RP 431-2) \u2013 greener than daylight. 2\xB0 standard observer",
        C: "CIE illuminant C \u2013 1931 average-daylight approximation, \u22486774 K; legacy: NTSC 1953, the Munsell renotation. 2\xB0 standard observer",
        E: "CIE illuminant E \u2013 equal-energy white, x = y = \u2153; a theoretical reference. 2\xB0 standard observer",
        A: "CIE standard illuminant A \u2013 tungsten incandescent light, \u22482856 K. 2\xB0 standard observer",
        wasm: "covered by the prebuilt WASM batch kernel \u2013 whole buffers, zero-copy",
        lut: "exports as a verified .cube LUT \u2013 Resolve, Premiere, Final Cut, OBS, ffmpeg"
    },
    oc = {
        "untagged images": "images with no embedded color profile \u2013 browsers assume they are sRGB",
        "white point": "the reference white a space adapts to \u2013 D65 \u2248 daylight, D50 \u2248 print viewing, E = equal energy",
        illuminant: "the standardized light source a space assumes \u2013 D65 daylight, D50 print viewing, E equal energy",
        chromaticity: "color with luminance factored out \u2013 the (x, y) spot on the CIE horseshoe",
        "chromatic adaptation": "the re-balancing of colors when the light source changes, so white stays white",
        "perceptually uniform": "equal numeric steps look like equal color steps \u2013 distance in the space matches what eyes report",
        "scene-linear": "values proportional to physical light in the scene, before any display encoding",
        "gamut mapping": "squeezing colors a display cannot show into its reachable set without breaking the image",
        "dynamic range": "the luminance span between the darkest and brightest values a signal can carry",
        "color difference": "how far apart two colors look \u2013 \u0394E metrics score it; \u22481 is the smallest visible step",
        OETF: "opto-electronic transfer function \u2013 scene light in, code value out (the camera curve)",
        EOTF: "electro-optical transfer function \u2013 code value in, display light out (the display curve)",
        PQ: "perceptual quantizer (SMPTE ST 2084) \u2013 the absolute-luminance HDR curve, up to 10,000 nits",
        "standard observer": "the CIE-averaged human eye \u2013 the color-matching functions colorimetry is built on"
    },
    Ul = {
        srgb: "does the current color fit inside sRGB \u2013 the standard web gamut",
        p3: "does it fit inside Display-P3 \u2013 wide-gamut Apple & modern displays",
        rec2020: "does it fit inside Rec.2020 \u2013 the UHD wide gamut"
    },
    kt = document.getElementById("cat"),
    On = () => {
        On.done || (On.done = !0, kt.dataset.fp !== gr(Ws()) && (kt.innerHTML = Ws(un), colize(), wireToc()), xn())
    };
wireToc(), addEventListener("resize", layoutToc);
const po = t => document.readyState === "complete" ? t() : addEventListener("load", () => t());
document.fonts?.ready.then(layoutToc), requestAnimationFrame(layoutToc), po(layoutToc);
const Ss = new Set,
    ks = new Set,
    Es = new Map,
    ni = t => [...t].map(e => Es.get(e)).filter(Boolean),
    si = () => ni(Ss),
    Un = () => ni(ks),
    ac = new IntersectionObserver(t => {
        const e = [];
        t.forEach(n => {
            const o = n.target.dataset.s;
            n.isIntersecting ? (Ss.add(o), e.push(n.target)) : Ss.delete(o)
        }), e.length && (ae(e), je(() => {
            dt || ve(e)
        }))
    }, {
        rootMargin: "300px"
    }),
    ic = new IntersectionObserver(t => {
        const e = [];
        t.forEach(n => {
            const o = n.target.dataset.s;
            n.isIntersecting ? (ks.add(o), e.push(n.target)) : ks.delete(o)
        }), e.length && (ae(e, {
            thumbs: !1
        }), No(e))
    });
document.addEventListener("copy", t => {
    const e = getSelection();
    if (!e.rangeCount || e.isCollapsed) return;
    const n = e.getRangeAt(0),
        o = n.commonAncestorContainer.nodeType === 1 ? n.commonAncestorContainer : n.commonAncestorContainer.parentElement;
    if (!o || !kt.contains(o) && !G.contains(o) || o.closest("pre")) return;
    const i = [];
    let a = null;
    const s = document.createTreeWalker(o, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    for (let c = s.currentNode; c; c = s.nextNode()) {
        if (!n.intersectsNode(c)) continue;
        const r = c.nodeType === 1 ? c : c.parentElement;
        if (!r || getComputedStyle(r).userSelect === "none" || !r.offsetParent && r.tagName !== "INPUT") continue;
        let d = "";
        if (c.nodeType === 1)
            if (c.tagName === "INPUT") d = c.value;
            else continue;
        else d = c.textContent, c === n.startContainer && (d = d.slice(n.startOffset)), c === n.endContainer && (d = d.slice(0, n.endOffset - (c === n.startContainer ? n.startOffset : 0)));
        if (d = d.trim(), !d) continue;
        const f = Math.round(r.getBoundingClientRect().top);
        a != null && Math.abs(f - a) > 10 && i.push(`
`), a = f, i.push(d)
    }
    i.length && (t.clipboardData.setData("text/plain", i.join(" ").replace(/ ?\n ?/g, `
`)), t.preventDefault())
});
let mo = !1,
    tn = null;
const Ms = () => {
    tn && (tn.classList.remove("pop"), tn = null)
};

function oi(t, e, n, o, i) {
    t.preventDefault(), t.stopPropagation();
    const a = e.getBoundingClientRect(),
        s = ke.get(n + "|" + o),
        c = H((t.clientX - a.left) / a.width, 0, 1);
    e.setPointerCapture?.(t.pointerId);
    const r = f => {
        const l = H((f.clientX - a.left) / a.width, 0, 1);
        i === "lo" ? oo(n, o, Math.min(l, s.hi), s.hi) : i === "hi" ? oo(n, o, s.lo, Math.max(l, s.lo)) : oo(n, o, Math.min(c, l), Math.max(c, l))
    };
    r(t), e.onpointermove = r;
    const d = () => {
        e.onpointermove = null, e.onpointerup = null, e.onpointercancel = null
    };
    e.onpointerup = d, e.onpointercancel = d
}
const rc = t => {
    tn !== t && (Ms(), tn = t, t.classList.add("pop"), ve([t]), ae([t]))
};
addEventListener("keydown", t => {
    t.key === "Escape" && tn && (document.activeElement?.blur?.(), Ms())
}), kt.addEventListener("input", t => {
    const e = t.target;
    if (!e.classList?.contains("nrg")) return;
    const n = e.closest(".ent");
    if (!n) return;
    const o = n.dataset.s;
    if (U.s !== o) {
        const i = At(o);
        if (!i) return;
        U = {
            s: o,
            vals: i
        }
    }
    He = +e.dataset.i, U.vals[He] = +e.value, le = n, jt()
});
const ai = t => {
    const e = t.closest(".ent"),
        n = +t.dataset.i;
    if (e !== le || n !== He) return;
    const o = e.dataset.s;
    vt(), Si(), qs(t, o, n), es(), jt(), ct() && fe(!1)
};
kt.addEventListener("change", t => {
    t.target.classList?.contains("nrg") && ai(t.target)
}), kt.addEventListener("pointercancel", t => {
    t.target.classList?.contains("nrg") && ai(t.target)
});

function xn() {
    Es.clear(), kt.querySelectorAll(".nrg").forEach(e => {
        e.style.removeProperty("--tkc"), e.style.removeProperty("--tki"), e.style.removeProperty("--tkv")
    }), kt.querySelectorAll(".ent[data-s]").forEach(e => {
        Es.set(e.dataset.s, e), ac.observe(e), ic.observe(e)
    });
    const t = e => {
        const n = e.dataset.s;
        e.querySelector(".nm").addEventListener("click", () => {
            mo || Gn(n)
        });
        let o = 0;
        e.addEventListener("pointerenter", () => {
            const a = () => {
                if (dt) {
                    o = setTimeout(a, 300);
                    return
                }
                o = 0, ca(n), la(n, de)
            };
            o = setTimeout(a, 300)
        }), e.addEventListener("pointerleave", () => {
            clearTimeout(o), o = 0
        }), e.addEventListener("focusout", a => {
            tn === e && !e.contains(a.relatedTarget) && Ms()
        });
        const i = () => {
            if (U.s !== n) {
                const a = At(n);
                if (!a) return !1;
                U = {
                    s: n,
                    vals: a
                }
            }
            return !0
        };
        e.querySelectorAll(".cv").forEach(a => {
            const s = +a.dataset.i,
                c = () => {
                    const l = parseFloat(a.value);
                    if (!isFinite(l)) return;
                    const h = ut(n).ch[s];
                    i(), U.vals[s] = H(l, h.min, h.max), jt()
                };
            a.addEventListener("pointerdown", l => l.stopPropagation()), a.addEventListener("click", l => l.stopPropagation()), a.addEventListener("focus", () => {
                requestAnimationFrame(() => a.select()), e.querySelectorAll(".ch")[s]?.classList.add("live"), (e.classList.contains("lite") || getComputedStyle(e.querySelector(".chs")).display === "none") && rc(e)
            }), a.addEventListener("blur", () => e.querySelectorAll(".ch")[s]?.classList.remove("live")), a.closest(".cvp")?.querySelector(".cl")?.addEventListener("pointerdown", l => {
                l.preventDefault(), a.focus()
            }), a.addEventListener("input", l => {
                l.isTrusted && c()
            }), a.addEventListener("blur", () => vt()), a.addEventListener("change", () => {
                ct() && fe(!1)
            });
            const r = ut(n).ch[s],
                d = l => {
                    const h = parseFloat(a.value),
                        S = isFinite(h) ? h : At(n)?.[s] ?? r.min;
                    a.value = ba(H(S + l * 10 ** -Te(r), r.min, r.max), r), c(), vt()
                };
            a.addEventListener("keydown", l => {
                l.stopPropagation(), l.key === "Enter" ? (l.preventDefault(), c(), a.blur()) : l.key === "Escape" ? (l.preventDefault(), vt(), a.blur()) : (l.key === "ArrowUp" || l.key === "ArrowDown") && (l.preventDefault(), d(l.key === "ArrowUp" ? 1 : -1))
            });
            const f = a.nextElementSibling;
            if (f?.classList.contains("stk")) {
                f.addEventListener("click", $ => $.stopPropagation());
                const l = ($, L) => $.addEventListener("pointerdown", w => {
                        w.stopPropagation(), w.preventDefault(), d(L);
                        const T = setTimeout(() => {
                                $._iv = setInterval(() => d(L), 70)
                            }, 400),
                            u = () => {
                                clearTimeout(T), clearInterval($._iv), removeEventListener("pointerup", u), removeEventListener("pointercancel", u)
                            };
                        addEventListener("pointerup", u), addEventListener("pointercancel", u)
                    }),
                    [h, S] = f.querySelectorAll("button");
                l(h, 1), l(S, -1)
            }
        }), e.querySelectorAll(".ch").forEach(a => {
            const s = +a.dataset.i,
                c = e.querySelectorAll(".cv")[s]?.closest(".cvp");
            a.addEventListener("pointerenter", () => c?.classList.add("on")), a.addEventListener("pointerleave", () => c?.classList.remove("on")), a.addEventListener("pointerdown", r => {
                const d = r.target.closest?.(".rh");
                if (d && ke.has(n + "|" + s)) {
                    oi(r, a, n, s, d.classList.contains("rlo") ? "lo" : "hi");
                    return
                }
                if (r.altKey && Lt) {
                    r.preventDefault(), oi(r, a, n, s);
                    return
                }
                if (r.target.classList?.contains("nrg")) return;
                r.preventDefault();
                const f = ut(n),
                    l = f.ch[s];
                let h = !1;
                const S = r.clientX,
                    $ = w => {
                        const T = a.getBoundingClientRect(),
                            u = H((w.clientX - T.left) / T.width, 0, 1);
                        U.vals[s] = l.min + (l.max - l.min) * u, jt()
                    };
                a.setPointerCapture(r.pointerId), i(), le = e, He = s, $(r);
                const L = w => {
                    !h && Math.abs(w.clientX - S) > 4 && (h = !0, a.style.cursor = "none", c?.classList.add("on"), a.classList.add("live")), $(w)
                };
                a.onpointermove = L, a.onpointerup = () => {
                    a.onpointermove = null, a.onpointerup = null, a.onpointercancel = null, a.style.cursor = "", c?.classList.remove("on"), a.classList.remove("live"), mo = !0, setTimeout(() => mo = !1, 0), vt(), Si(), qs(a.querySelector(".nrg"), n, s), es(), jt(), ct() && fe(!1)
                }, a.onpointercancel = a.onpointerup
            })
        })
    };
    xn._gen = (xn._gen || 0) + 1;
    {
        const e = xn._gen,
            n = [...kt.querySelectorAll(".ent[data-s]")],
            o = -innerHeight * .5,
            i = innerHeight * 1.5,
            a = [];
        for (const r of n) {
            const d = r.getBoundingClientRect();
            d.bottom > o && d.top < i ? t(r) : a.push(r)
        }
        let s = 0;
        const c = r => {
            if (e === xn._gen) {
                if (dt) {
                    je(c);
                    return
                }
                for (; s < a.length && r.timeRemaining() > 3;) t(a[s++]);
                s < a.length && je(c)
            }
        };
        a.length && je(c)
    }
}
const cc = !1;
document.body.classList.remove("alls"), addEventListener("keydown", t => {
    t.key === "/" && !ct() && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || "") && (t.preventDefault(), document.getElementById("q").focus())
});
const ii = document.getElementById("nq");
ii.textContent = be.length;
const en = document.getElementById("q"),
    lc = (t, e) => {
        const n = t.dataset.s,
            o = t.querySelector(".nm");
        if (!o || n == null) return;
        const i = he(n),
            a = e ? i.toLowerCase().indexOf(e) : -1;
        o.innerHTML = a < 0 ? i : i.slice(0, a) + "<mark>" + i.slice(a, a + e.length) + "</mark>" + i.slice(a + e.length)
    },
    go = ["channels", "range", "geometry", "signal", "encoding", "white point", "export", "status"],
    dc = t => {
        const e = cn[t];
        return [
            [String(ut(t).ch.length)],
            [e.dynamic && e.dynamic.toUpperCase()],
            [ws(t)],
            [e.referred],
            [ti(t)],
            [e.illuminant],
            [ha.includes(t) && "wasm", ss.has(t) && "lut", !!ms[t] && "css"],
            [va.has(t) && "historical"]
        ].map(n => new Set(n.filter(Boolean)))
    },
    ri = new Map(be.map(t => [t, dc(t)]));
let Nn = "family";
const uc = new Map(be.map(t => {
        const e = ut(t).ch;
        return [t, (t + " " + he(t) + " " + e.map(n => $e(n) + " " + n.sym).join(" ")).toLowerCase()]
    })),
    Ee = go.map(() => new Set);
let It = 0,
    Pt = 1;
const Hn = () => It > 0 || Pt < 1,
    ci = () => It > 0 && Pt < 1 ? `${It*100|0}\u2013${Pt*100|0}% of visible` : It > 0 ? `\u2265${It*100|0}% of visible` : Pt < 1 ? `\u2264${Pt*100|0}% of visible` : "any",
    li = document.getElementById("fchipsH"),
    di = Rn("x"),
    fc = () => {
        li.innerHTML = Ee.flatMap((t, e) => [...t].map(n => `<button class="fchip" data-f="${e}" data-t="${n}" aria-label="remove filter: ${n}" title="remove \u2018${n}\u2019">${n}${di}</button>`)).join("") + (Hn() ? `<button class="fchip" data-cov="1" aria-label="remove the coverage filter" title="remove the coverage interval">${ci()}${di}</button>` : "")
    };

function yo(t) {
    if (!(t === Nn || !as[t])) {
        Nn = t, Ms(), kt.innerHTML = Ws(U, as[t]()), colize(), wireToc(), xn(), Oe(), document.querySelectorAll(".gtag").forEach(e => {
            const n = e.dataset.g === t;
            e.classList.toggle("on", n), e.setAttribute("aria-pressed", String(n))
        }), document.querySelectorAll(".gsel").forEach(e => {
            e.value = t
        });
        try {
            const e = new URLSearchParams(location.search);
            e.delete("g"), e.delete("sw"), t !== "family" && e.set("g", t);
            const n = e.toString();
            history.replaceState(null, "", location.pathname + (n ? "?" + n : "") + location.hash)
        } catch {}
    }
}
kt.addEventListener("click", t => {
    const e = t.target.closest(".gtag");
    e && yo(e.dataset.g)
}), kt.addEventListener("change", t => {
    t.target.classList?.contains("gsel") && yo(t.target.value)
});

function Oe() {
    const t = en.value.trim().toLowerCase(),
        e = Ee.some(s => s.size) || Hn();
    let n = 0;
    kt.querySelectorAll(".ent").forEach(s => {
        const c = s.dataset.s;
        let r;
        if (c) {
            const d = ri.get(c),
                f = sa[c]?.[0] ?? -1;
            r = (!t || uc.get(c).includes(t)) && Ee.every((l, h) => !l.size || [...l].some(S => d[h].has(S))) && (!Hn() || f >= It && f <= Pt), r && n++
        } else r = !e && (!t || s.querySelector(".nm")?.textContent.toLowerCase().includes(t));
        s.style.display = r ? "" : "none", lc(s, r && t && c ? t : null)
    }), kt.querySelectorAll("[data-sec]").forEach((s, c) => {
        const r = [...s.querySelectorAll(".ent")].some(d => d.style.display !== "none");
        s.style.display = r ? "" : "none", kt.querySelectorAll(".ti")[c]?.classList.toggle("off", !r)
    }), layoutToc(), trackAct();
    const o = document.getElementById("nores");
    if (o) {
        const s = (t || e) && !n;
        o.hidden = !s, s && (o.textContent = t ? `no space matches \u201C${t}\u201D \u2013 search covers names, channels and symbols` : "no space matches these filters \u2013 remove one to widen")
    }
    const i = document.getElementById("n");
    i && (i.textContent = t || e ? n : Qo), ii.textContent = "", document.body.classList.toggle("flt", !!(t || e)), en.closest(".qx").classList.toggle("flt", e), fc();
    const a = [...kt.querySelectorAll(".ent[data-s]")].filter(s => s.style.display !== "none").map(s => s.dataset.s).join();
    a !== Oe._fp && (Oe._fp = a, colize(!0), ve(), ae()), Ac()
}
en.addEventListener("input", Oe), document.getElementById("qclr").addEventListener("click", () => {
    en.value = "", Oe(), en.focus()
}), (() => {
    const t = document.getElementById("tfb"),
        e = document.getElementById("tfp");
    if (!t) return;
    const n = go.map((l, h) => {
        const S = [...new Set(be.flatMap($ => [...ri.get($)[h]]))];
        return l === "channels" ? S.sort() : S
    });
    e.innerHTML = go.map((l, h) => n[h].length ? `<div class="frow"><i>${l}</i><span class="fchips">${n[h].map(S=>`<button class="tag" data-f="${h}" data-t="${S}" aria-pressed="false" title="${Ze[S]||""}">${S}</button>`).join("")}</span></div>` : "").join("") + '<div class="frow"><i>coverage</i><span class="fcov"><span class="dual"><input type="range" id="fcov" min="0" max="95" step="5" value="0" aria-label="minimum share of the visible gamut" title="from \u2013 keep spaces reaching at least this share of visible colors"><input type="range" id="fcov1" min="5" max="100" step="5" value="100" aria-label="maximum share of the visible gamut" title="to \u2013 keep spaces reaching at most this share"></span><b class="tnum" id="fcovv">any</b></span></div>';
    const o = e.querySelector("#fcov"),
        i = e.querySelector("#fcov1"),
        a = e.querySelector("#fcovv"),
        s = e.querySelector(".fcov .dual"),
        c = () => t.classList.toggle("on", Ee.some(l => l.size) || Hn()),
        r = () => {
            s.style.setProperty("--lo", It * 100 + "%"), s.style.setProperty("--hi", Pt * 100 + "%")
        },
        d = () => {
            r(), a.textContent = ci(), c(), Oe()
        };
    o.oninput = () => {
        It = +o.value / 100, It > Pt && (Pt = It, i.value = Pt * 100), d()
    }, i.oninput = () => {
        Pt = +i.value / 100, Pt < It && (It = Pt, o.value = It * 100), d()
    }, e.querySelectorAll("button[data-t]").forEach(l => l.onclick = () => {
        const h = +l.dataset.f,
            S = l.dataset.t;
        Ee[h].has(S) ? Ee[h].delete(S) : Ee[h].add(S);
        const $ = Ee[h].has(S);
        l.classList.toggle("on", $), l.setAttribute("aria-pressed", String($)), c(), Oe()
    }), li.addEventListener("click", l => {
        const h = l.target.closest(".fchip");
        if (!h) return;
        if (h.dataset.cov) {
            It = 0, Pt = 1, o.value = 0, i.value = 100, d();
            return
        }
        const S = +h.dataset.f,
            $ = h.dataset.t;
        Ee[S].delete($);
        const L = e.querySelector(`.tag[data-f="${S}"][data-t="${CSS.escape($)}"]`);
        L && (L.classList.remove("on"), L.setAttribute("aria-pressed", "false")), c(), Oe()
    });
    try {
        const l = new URLSearchParams(location.search),
            h = l.get("t"),
            S = l.get("cov"),
            $ = l.get("find");
        if (h || S || $) {
            if (h)
                for (const L of h.split(",")) {
                    const w = e.querySelector(`.tag[data-t="${CSS.escape(L)}"]`);
                    w && (Ee[+w.dataset.f].add(L), w.classList.add("on"), w.setAttribute("aria-pressed", "true"))
                }
            if (S) {
                const L = S.match(/^(\d+)-(\d+)$/);
                L && (It = H(+L[1], 0, 100) / 100, Pt = H(+L[2], 0, 100) / 100, Pt < It && (Pt = It), o.value = It * 100, i.value = Pt * 100)
            }
            $ != null && (en.value = $), d()
        }
    } catch {}
    const f = l => {
        e.hidden = !l, t.setAttribute("aria-expanded", String(l))
    };
    t.onclick = () => f(e.hidden), addEventListener("pointerdown", l => {
        !e.hidden && !l.target.closest(".tagf") && f(!1)
    }), addEventListener("keydown", l => {
        l.key === "Escape" && !e.hidden && (f(!1), t.focus())
    })
})(), colize();
const Le = document.getElementById("modal"),
    G = document.getElementById("detail"),
    $s = matchMedia("(max-width:640px)"),
    ui = () => {
        const t = G.querySelector("#pl3d")?.closest(".vgrp");
        if (!t) return;
        const e = G.querySelector(".dviz2"),
            n = G.querySelector(".dpick");
        $s.matches ? e && t.parentElement !== e && e.prepend(t) : n && t.parentElement !== n && n.append(t)
    };
$s.addEventListener("change", ui);
const fi = document.querySelector(".page");
G.addEventListener("click", t => {
    const e = t.target.closest(".mnav");
    if (e) {
        "cdir" in e.dataset ? wc(+e.dataset.cdir) : So(+e.dataset.dir);
        return
    }
    const n = t.target.closest("#cssv");
    n && navigator.clipboard && navigator.clipboard.writeText(n.textContent).then(() => Xt())
}), G.addEventListener("keydown", t => {
    (t.key === "Enter" || t.key === " ") && t.target.matches("#cssv") && (t.preventDefault(), t.target.click())
});
let vo = null;
const ct = () => !Le.hidden,
    hi = t => xo.get(t)?.nm || he(t),
    hc = `<button class="mnav prev" data-dir="-1" aria-label="previous color space">${Rn("prev")}<span class="mn mprevn"></span></button>`,
    pc = `<button class="mnav next" data-dir="1" aria-label="next color space"><span class="mn mnextn"></span>${Rn("next")}</button>`,
    mc = `<button class="mnav mcat prev" data-cdir="-1" aria-label="previous category">${Rn("prev2")}<span class="mstack"><i class="catn catprev"></i><span class="mn mprevc"></span></span></button>`,
    gc = `<button class="mnav mcat next" data-cdir="1" aria-label="next category"><span class="mstack"><i class="catn catnext"></i><span class="mn mnextc"></span></span>${Rn("next2")}</button>`,
    pi = (t, e) => `<nav class="mnavbar ${t}" aria-label="adjacent color spaces"><span class="ngrp">${e?mc:""}${hc}</span><span class="ngrp">${pc}${e?gc:""}</span></nav>`;

function Gn(t) {
    Le.hidden && (vo = document.activeElement, document.body.style.paddingRight = innerWidth - document.documentElement.clientWidth + "px");
    const e = xo.get(t);
    lt = t, !e && Z != null && Rs(), Le.hidden = !1, Le.classList.toggle("barred", !!e), document.body.classList.add("mopen"), document.body.style.overflow = "hidden";
    for (const r of fi.children) r.inert = !r.classList.contains("mhead");
    qe = ys(t) + io() + "#" + ao(), history.replaceState(null, "", qe), e ? yc(e) : (Xc(), vt(), fe(!1)), G.dataset.wired = 1;
    const n = [...Wn().flatMap(r => r.spaces), ..._n.map(r => r.key)],
        o = n.indexOf(t),
        i = n.length;
    G.querySelectorAll(".mprevn").forEach(r => r.textContent = hi(n[(o - 1 + i) % i])), G.querySelectorAll(".mnextn").forEach(r => r.textContent = hi(n[(o + 1) % i]));
    const a = Wn(),
        s = a.findIndex(r => r.spaces.includes(t)),
        c = a.length;
    if (s >= 0) {
        const r = a[(s - 1 + c) % c],
            d = a[(s + 1) % c];
        G.querySelectorAll(".catprev").forEach(f => f.textContent = r.name), G.querySelectorAll(".mprevc").forEach(f => f.textContent = he(r.spaces[0])), G.querySelectorAll(".catnext").forEach(f => f.textContent = d.name), G.querySelectorAll(".mnextc").forEach(f => f.textContent = he(d.spaces[0]))
    }
    requestAnimationFrame(() => G.focus({
        preventScroll: !0
    })), e || setTimeout(() => {
        if (lt === t)
            for (const r of [n[(o - 1 + i) % i], n[(o + 1) % i]]) Ue(r) || (ca(r), la(r, de))
    }, 400)
}

function yc(t) {
    const e = t.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
    G.innerHTML = `<div class="dh"><h1 id="dtitle">${t.nm.toUpperCase()}${t.mark?`<sup>${t.mark}</sup>`:""}</h1></div>
	 <div class="dpills"><span class="tag" title="a licensed, sample-defined system \u2013 the authoritative colour data isn't openly redistributable">proprietary</span></div>
	 <hr class="dhr">
	 <section class="dhero"><div class="dmain"><div class="props props3">
		<div class="pcol"><div><i>channels</i><p>${t.ch}</p></div></div>
		<div class="pcol">${t.since||t.by?`<div><i>origin</i><p>${[t.since,t.by].filter(Boolean).join(", ")}</p></div>`:""}<div><i>reference</i><p><a href="${t.url}" target="_blank" rel="nofollow">${e}</a></p></div></div>
	 </div>
	 <div class="dgrid2 dstack"><div><i class="plab">description</i>
		<div class="desc">${t.why}</div></div></div>
	 </div></section>
	 ${pi("mfoot")}`
}

function bo() {
    On(), Le.hidden = !0;
    for (const t of fi.children) t.inert = !1;
    document.body.classList.remove("mopen"), document.body.style.overflow = "", document.body.style.paddingRight = "", ae(), ve(), qe = ys("") + io() + "#" + ao(), history.replaceState(null, "", qe), vo?.focus?.({
        preventScroll: !0
    }), vo = null
}
Le.addEventListener("click", t => {
    t.target === Le && bo()
}), document.getElementById("mx").onclick = bo;
const xo = new Map(_n.map(t => [t.key, t])),
    Ue = t => xo.has(t),
    Nl = [...ln.flatMap(t => t.spaces), ..._n.map(t => t.key)];

function wo(t) {
    if (t = t.trim().toLowerCase(), !t) return null;
    if (t[0] === "#") {
        const i = t.length === 4 ? "#" + [...t.slice(1)].map(a => a + a).join("") : t;
        if (/^#[0-9a-f]{6}$/.test(i)) return {
            s: "rgb",
            vals: gi(i)
        }
    }
    if (Gs[t]) return {
        s: "rgb",
        vals: Gs[t].slice()
    };
    const e = t.match(/^([a-z][a-z0-9-]*)\s*\(([^)]*)\)$/);
    if (e) {
        let i = e[1];
        const a = e[2].split("/")[0];
        if (i === "rgba" && (i = "rgb"), i === "hsla" && (i = "hsl"), i === "color") {
            const d = a.trim().split(/[\s,]+/).filter(Boolean);
            i = {
                "display-p3": "p3",
                "a98-rgb": "a98rgb",
                "prophoto-rgb": "prophoto",
                "xyz-d65": "xyz",
                xyz: "xyz",
                "srgb-linear": "lrgb",
                srgb: "rgb"
            } [d[0]] || d[0];
            const f = d.slice(1, 4).map(parseFloat);
            return i === "rgb" ? f.forEach((l, h) => {
                d[h + 1]?.includes("%") ? f[h] = l * 2.55 : l <= 1 && (f[h] = l * 255)
            }) : ["p3", "rec2020", "a98rgb", "prophoto", "lrgb"].includes(i) ? f.forEach((l, h) => {
                d[h + 1]?.includes("%") && (f[h] = l / 100)
            }) : (i === "xyz" || i === "xyz-d50") && f.forEach((l, h) => {
                !d[h + 1]?.includes("%") && Math.abs(l) <= 1.5 && (f[h] = l * 100)
            }), be.includes(i) && f.length === 3 && f.every(isFinite) ? {
                s: i,
                vals: f
            } : null
        }
        i === "lch" && (i = "lchab");
        const s = a.trim().split(/[\s,]+/).filter(Boolean),
            c = s.slice(0, 4).map(parseFloat).filter(isFinite),
            r = ut(be.includes(i) ? i : "rgb").ch.length;
        if (be.includes(i) && c.length >= r) {
            const d = c.slice(0, r);
            return (i === "oklch" || i === "oklab") && s[0]?.includes("%") && (d[0] /= 100), i === "rgb" && d.forEach((f, l) => {
                s[l]?.includes("%") && (d[l] = f * 2.55)
            }), {
                s: i,
                vals: d
            }
        }
    }
    const n = t.match(/^([a-z][a-z0-9-]*)[\s:]+(.+)$/);
    if (n && be.includes(n[1])) {
        const i = ut(n[1]).ch.length,
            a = (n[2].match(/-?\d*\.?\d+/g) || []).map(Number).filter(isFinite);
        if (a.length >= i) return {
            s: n[1],
            vals: a.slice(0, i)
        }
    }
    const o = [...t.matchAll(/(?:^|\s)([a-z][a-z0-9]*)[\s:=]+(-?\d*\.?\d+)/g)].map(i => [i[1], +i[2]]);
    if (o.length >= 1) {
        const i = o.map(c => c[0]),
            a = o.map(c => c[1]),
            s = be.filter(c => {
                const r = ut(c).ch;
                return r.length === i.length && r.every((d, f) => {
                    const l = d.sym.toLowerCase();
                    return (l === i[f] || l.slice(0, 2) === i[f]) && a[f] >= d.min - 1e-9 && a[f] <= d.max + 1e-9
                })
            });
        if (s.length) {
            const c = f => ut(f).ch.reduce((l, h, S) => l + (a[S] === 0 || Math.abs(a[S]) >= .02 * Math.max(Math.abs(h.min), Math.abs(h.max))), 0),
                r = Math.max(...s.map(c)),
                d = s.filter(f => c(f) === r);
            return {
                s: d.includes(lt) ? lt : d.includes(U.s) ? U.s : d[0],
                vals: a
            }
        }
    }
    return null
}

function vc(t) {
    let e = [],
        n = 0,
        o = "";
    for (const a of t) a === "(" ? n++ : a === ")" && (n = Math.max(0, n - 1)), (a === "," || a === `
` || a === ";") && !n ? (e.push(o), o = "") : o += a;
    if (e.push(o), e = e.map(a => a.trim()).filter(Boolean), e.length < 2) {
        const a = t.trim().split(/\s+/);
        a.length > 1 && a.every(s => /^#?[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(s)) && (e = a.map(s => s[0] === "#" ? s : "#" + s))
    }
    if (e.length < 2) return null;
    const i = e.map(wo);
    return i.every(Boolean) ? i : null
}
const bc = /(?<![\w-])-?\d+(?:\.\d+)?/g;

function xc(t) {
    const e = t.value,
        n = t.selectionStart ?? e.length,
        o = [...e.matchAll(bc)].map(a => ({
            raw: a[0],
            start: a.index,
            end: a.index + a[0].length
        }));
    if (!o.length) return null;
    const i = a => Math.min(Math.abs(a.start - n), Math.abs(a.end - n));
    return o.find(a => n >= a.start && n <= a.end) || o.sort((a, s) => i(a) - i(s))[0]
}

function Hl(t, e) {
    const n = xc(t);
    if (!n) return !1;
    const o = (n.raw.split(".")[1] || "").length,
        i = (parseFloat(n.raw) + e * 10 ** -o).toFixed(o);
    return t.value = t.value.slice(0, n.start) + i + t.value.slice(n.end), t.setSelectionRange(n.start, n.start + i.length), !0
}
const Wn = () => {
        try {
            return Nn !== "family" && as[Nn] ? as[Nn]() : ln
        } catch {
            return ln
        }
    },
    So = t => {
        const e = [...Wn().flatMap(o => o.spaces), ..._n.map(o => o.key)],
            n = e.indexOf(lt);
        Gn(e[(n + t + e.length) % e.length])
    },
    wc = t => {
        const e = Wn(),
            n = e.findIndex(i => i.spaces.includes(lt));
        if (n < 0) return;
        const o = e[(n + t + e.length) % e.length];
        Gn(o.spaces[0])
    };
addEventListener("keydown", t => {
    if (ct()) {
        if (t.key === "Escape") {
            t.preventDefault(), bo();
            return
        }
        if (t.key === "Tab") {
            const e = [...Le.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),[tabindex="0"]')].filter(n => n.offsetParent !== null);
            if (e.length) {
                const n = e[0],
                    o = e.at(-1);
                document.activeElement === G ? (t.preventDefault(), (t.shiftKey ? o : n).focus()) : t.shiftKey && document.activeElement === n ? (t.preventDefault(), o.focus()) : !t.shiftKey && document.activeElement === o && (t.preventDefault(), n.focus())
            }
            return
        }(t.metaKey || t.ctrlKey) && (t.key === "ArrowLeft" && (t.preventDefault(), So(-1)), t.key === "ArrowRight" && (t.preventDefault(), So(1)))
    }
});
const pe = (t, e) => dn(e) === "%" ? t.toFixed(1) : (+t.toFixed(Te(e))).toString(),
    mi = (t, e, n, o, i, a) => {
        const s = Jo(t, a);
        return Array.from({
            length: i
        }, (c, r) => {
            const d = e.slice();
            d[n] = o.min + (o.max - o.min) * (r + .5) / i;
            const f = s ? s(d) : 1;
            return `rgb(${Ut(t,d).map(h=>+h.toFixed(2)).join(" ")}${f===1?"":` / ${f}`})`
        })
    },
    Ls = t => {
        const e = t.length;
        return `linear-gradient(90deg, ${t.map((n,o)=>`${n} ${(o/e*100).toFixed(2)}% ${((o+1)/e*100).toFixed(2)}%`).join(",")})`
    },
    wn = t => t.replace(/-(\w)/g, (e, n) => n.toUpperCase()),
    Ne = t => /^[a-z_$][\w$]*$/i.test(t) ? `.${t}` : `['${t}']`,
    gi = t => [1, 3, 5].map(e => parseInt(t.slice(e, e + 2), 16)),
    ko = t => t.every(e => e >= -.002 && e <= 1.002);

function Sc() {
    try {
        const t = U.s === "xyz" ? U.vals : W[U.s].xyz(...U.vals);
        return {
            srgb: ko(W.xyz.lrgb(...t)),
            p3: ko(W.xyz["p3-linear"](...t)),
            rec2020: ko(W.xyz["rec2020-linear"](...t))
        }
    } catch {
        return null
    }
}
let As = null;
const yi = ["oklab", "lrgb", "lab", "oklch", "rgb", "hsl"];
let Eo = 0;
const vi = [
        ["", [
            [null, "smooth"]
        ]],
        ["steps", [
            [10, "10-step"],
            [20, "20-step"],
            ["565", "16-bit"],
            ["jnd", "JND"]
        ]],
        ["Palettes", [
            ["web", "safe"],
            ["names", "names"],
            ["xkcd", "xkcd"],
            ["tailwind", "tailwind"],
            ["pico8", "pico-8"],
            ["ansi", "ANSI"]
        ]]
    ],
    bi = vi.flatMap(([, t]) => t),
    xi = {
        smooth: "continuous, unquantized",
        10: "10 native-channel cell centers",
        20: "20 native-channel cell centers",
        565: "16-bit RGB565 depth",
        jnd: "just-noticeable OKLab steps",
        web: "216 web-safe colors",
        names: "CSS named colors",
        xkcd: "xkcd survey names",
        tailwind: "Tailwind tokens",
        pico8: "PICO-8 palette",
        ansi: "terminal 256 palette"
    },
    nn = t => t == null ? "smooth" : String(t),
    wi = t => t === "smooth" ? null : t === "10" ? 10 : t === "20" ? 20 : t;
let Nt = null,
    le = null,
    He = -1;

function Si() {
    const t = le;
    if (le = null, He = -1, t) {
        t._tk = "", t._cur = "";
        for (const e of ["--tkc", "--tki", "--tkv", "--cur"]) t.style.removeProperty(e)
    }
}
let se = "oklab";
const ki = {
        oklab: "modern perceptual distance",
        de2000: "CIE industry standard",
        de76: "plain CIELAB distance",
        redmean: "classic RGB heuristic"
    },
    Mo = {
        oklab: "OKLab",
        de2000: "\u0394E2000",
        de76: "\u0394E76",
        redmean: "Redmean"
    };
let Z = null,
    Ts = 0;
try {
    localStorage.removeItem("csQ")
} catch {}
const $o = ["srgb", "p3", "rec2020"],
    Lo = {
        srgb: "sRGB",
        p3: "P3",
        rec2020: "Rec.2020",
        vis: "surface",
        locus: "light",
        clip: "\u26A0"
    },
    kc = {
        srgb: "fits sRGB \u2013 every standard display shows it losslessly",
        p3: "beyond sRGB, fits P3 \u2013 needs a wide-gamut display; sRGB screens clip it",
        rec2020: "beyond P3, fits Rec.2020 \u2013 most displays clip it",
        vis: "beyond every display, yet a lit surface can show it \u2013 inside the object-color solid",
        locus: "no surface shows it, but it is a real light \u2013 on the spectral locus",
        clip: "outside the locus \u2013 not a color; the preview clips"
    };
let de = [...$o, "vis", "locus"].includes(localStorage.csGm) ? localStorage.csGm : "vis";
const Ec = t => t.ch.length > 1 ? de : de === "vis" || de === "locus" ? "off" : de,
    Ei = {
        srgb: t => W.xyz.lrgb(...t),
        p3: t => W.xyz["p3-linear"](...t),
        rec2020: t => W.xyz["rec2020-linear"](...t)
    },
    Mc = (t, e, n = de) => {
        if (t === "rgb") return !0;
        try {
            const o = t === "xyz" ? e : W[t].xyz(...e);
            if (n === "locus") return na(...o);
            if (cn[t]?.method === "chromaticity") {
                if (n === "vis") {
                    const s = 50 / Math.max(o[1], 1e-4);
                    return os(o[0] * s, 50, o[2] * s)
                }
                const i = Ei[n](o),
                    a = Math.max(i[0], i[1], i[2]);
                return a > 0 && i.every(s => s >= -.005 * a)
            }
            return n === "vis" ? os(...o) : Ei[n](o).every(i => i >= -.005 && i <= 1.005)
        } catch {
            return !0
        }
    },
    Gl = t => yr(t) < .6 ? [255, 255, 255] : [27, 20, 8],
    Cs = new Map;

function $c(t) {
    const e = Yt(t),
        n = Qa(e),
        o = Cs.get(n);
    if (o) return o;
    Cs.size > 65536 && Cs.clear();
    const [i, a, s] = W.rgb.oklab(...e), c = W.oklab.rgb((Math.floor(Math.min(i, .9999) / .023) + .5) * .023, Math.round(a / .023) * .023, Math.round(s / .023) * .023).map(r => H(Math.round(r), 0, 255));
    return Cs.set(n, c), c
}
const Lc = t => Yt(t).map((e, n) => {
        const o = [31, 63, 31][n];
        return Math.round(Math.round(e / 255 * o) / o * 255)
    }),
    Ge = new Set(["names", "xkcd", "tailwind", "pico8", "ansi"]),
    Ct = t => Ge.has(t) ? e => ho(t, e).rgb : t === "jnd" ? $c : t === "565" ? Lc : t === "web" ? e => e.map(n => Math.round(n / 51) * 51) : null;
let Mi = null;
{
    const t = document.getElementById("vctl");
    if (t) {
        const e = ([l, h]) => `<option value="${nn(l)}" title="${xi[nn(l)]}">${h}</option>`,
            n = bi.map(([l, h]) => `${h} \u2013 ${xi[nn(l)]}`).join(`
`),
            o = Hs.map(l => `${Mo[l]} \u2013 ${ki[l]}`).join(`
`),
            i = l => ({
                srgb: "standard web gamut",
                p3: "wide Apple-display gamut",
                rec2020: "ultra-wide UHD gamut",
                vis: "colors a lit surface can show \u2013 the object-color solid",
                locus: "every real light \u2013 the full spectral reach, no limit"
            })[l],
            a = [...$o, "vis", "locus"].map(l => `${Lo[l]} \u2013 ${i(l)}`).join(`
`);
        t.innerHTML = `<select id="qseg" aria-label="segmented rendering mode" title="${n}">${vi.map(([l,h])=>l?`<optgroup label="${l}">${h.map(e).join("")}</optgroup>`:h.map(e).join("")).join("")}</select><select id="mseg" aria-label="palette distance metric" title="${o}" hidden>${Hs.map(l=>`<option value="${l}" title="${ki[l]}">${Mo[l]}</option>`).join("")}</select><select id="gseg" aria-label="dossier gamut limits" title="${a}">${[...$o,"vis","locus"].map(l=>`<option value="${l}" title="${i(l)}"${l===de?" selected":""}>${Lo[l]}</option>`).join("")}</select>`;
        const s = t.querySelector("#qseg"),
            c = t.querySelector("#mseg"),
            r = t.querySelector("#gseg");
        r.onchange = () => {
            de = r.value;
            try {
                localStorage.csGm = de
            } catch {}
            ct() && (Ii(), vt(), Qt())
        }, qn = Object.assign(document.createElement("div"), {
            className: "dctl vrow"
        });
        const d = () => {
            const l = $s.matches ? qn : t;
            s.parentElement !== l && l.append(s, c, r)
        };
        $s.addEventListener("change", d), d();
        const f = () => {
            Sn(), Rs(), cancelAnimationFrame(Ts), Ts = requestAnimationFrame(() => {
                vt(), Ts = requestAnimationFrame(() => {
                    Ts = 0, ct() && Qt()
                })
            }), ct() || (ve(), ae())
        };
        s.onchange = () => {
            Z = wi(s.value), c.hidden = !Ge.has(Z), f(), $i()
        }, c.onchange = () => {
            se = c.value, f(), $i()
        }, Mi = () => {
            const l = new URLSearchParams(location.search),
                h = l.get("q"),
                S = l.get("m");
            h && bi.some(([$]) => nn($) === h) && h !== "smooth" && (s.value = h, Z = wi(h), c.hidden = !Ge.has(Z)), S && Hs.includes(S) && (c.value = S, se = S)
        }, Mi()
    }
}
const $i = () => {
        try {
            const t = new URLSearchParams(location.search);
            t.delete("q"), t.delete("m"), t.delete("sw"), Z != null && t.set("q", nn(Z)), Ge.has(Z) && se !== "oklab" && t.set("m", se);
            const e = t.toString();
            history.replaceState(null, "", location.pathname + (e ? "?" + e : "") + location.hash)
        } catch {}
    },
    Ac = () => {
        try {
            const t = new URLSearchParams(location.search);
            t.delete("t"), t.delete("cov"), t.delete("find"), t.delete("sw");
            const e = Ee.flatMap(i => [...i]);
            e.length && t.set("t", e.join(",")), Hn() && t.set("cov", Math.round(It * 100) + "-" + Math.round(Pt * 100));
            const n = en.value.trim();
            n && t.set("find", n);
            const o = t.toString();
            history.replaceState(null, "", location.pathname + (o ? "?" + o : "") + location.hash)
        } catch {}
    },
    _s = (t, e) => t.every((n, o) => n === e[o]),
    Me = 256,
    Li = (t, e, n, o, i) => {
        const a = [];
        for (let s = 0; s < Me; s++) {
            const c = e.slice();
            c[n] = o.min + (o.max - o.min) * (s + .5) / Me;
            const r = Yt(i(Ut(t, c))),
                d = a.at(-1);
            d && _s(d.rgb, r) ? d.hi = s + 1 : a.push({
                rgb: r,
                lo: s,
                hi: s + 1
            })
        }
        return a
    },
    Ai = (t, e, n, o, i, a) => {
        const s = a ? Jo(t, a) : null,
            c = [];
        for (let r = 0; r < Me; r++) {
            const d = e.slice();
            d[n] = o.min + (o.max - o.min) * (r + .5) / Me;
            const f = Yt(i(Ut(t, d))),
                l = s ? s(d) : 1,
                h = c[c.length - 1];
            h && h.a === l && _s(h.rgb, f) ? h.hi = r + 1 : c.push({
                rgb: f,
                a: l,
                lo: r,
                hi: r + 1
            })
        }
        return `linear-gradient(90deg, ${c.flatMap(r=>{const d=(r.lo/Me*100).toFixed(2),f=(r.hi/Me*100).toFixed(2),l=`rgb(${r.rgb.join(" ")}${r.a===1?"":` / ${r.a}`})`;return[`${l} ${d}%`,`${l} ${f}%`]}).join(",")})`
    },
    Tc = (t, e, n) => {
        const o = t.querySelector(".bgc");
        if (!o || o.style.display === "none" || !o.width) return null;
        let i;
        try {
            i = o.getContext("2d", {
                willReadFrequently: !0
            }).getImageData(0, 0, o.width, 1).data
        } catch {
            return null
        }
        const a = d => {
                const f = d * 4;
                return i[f + 3] > 32 && Math.abs(i[f] - e[0]) <= 1 && Math.abs(i[f + 1] - e[1]) <= 1 && Math.abs(i[f + 2] - e[2]) <= 1
            },
            s = [];
        let c = -1;
        for (let d = 0; d <= o.width; d++) {
            const f = d < o.width && a(d);
            f && c < 0 && (c = d), !f && c >= 0 && (s.push([c, d]), c = -1)
        }
        if (!s.length) return null;
        const r = s.sort((d, f) => Math.abs((d[0] + d[1]) / (2 * o.width) - n) - Math.abs((f[0] + f[1]) / (2 * o.width) - n))[0];
        return (r[0] + r[1]) / (2 * o.width)
    },
    Cc = (t, e, n, o, i, a) => {
        const s = Yt(a(Ut(t, e))),
            c = H((e[n] - o.min) / (o.max - o.min), 0, 1),
            r = 256;
        for (let d = 1; d <= r; d++) {
            const f = H(c + i * d / r, 0, 1),
                l = e.slice();
            l[n] = o.min + (o.max - o.min) * f;
            const h = Yt(a(Ut(t, l)));
            if (!_s(s, h)) return h;
            if (f === 0 || f === 1) break
        }
        return s
    },
    Ti = (t, e) => (Math.min(e - 1, Math.floor(H(t, 0, 1) * e)) + .5) / e,
    Sn = () => {
        G.querySelectorAll(".bar2").forEach(t => {
            t._snapKey = t._snapF = t._snapHint = null
        }), G.querySelectorAll(".pl").forEach(t => {
            t._snap = t._snapSeed = null
        })
    };

function _c() {
    if (Z == null) return null;
    if (typeof Z == "number") {
        const e = ct() ? lt : U.s;
        let n;
        try {
            n = U.s === e ? U.vals.slice() : Vt(e, Kt())
        } catch {
            return null
        }
        const o = ut(e);
        return {
            s: e,
            vals: n.map((i, a) => {
                const s = o.ch[a];
                return s.min + (s.max - s.min) * Ti((i - s.min) / (s.max - s.min), Z)
            })
        }
    }
    const t = Ct(Z);
    return t ? {
        s: "rgb",
        vals: t(Kt()).map(e => H(Math.round(e), 0, 255))
    } : null
}

function Rs() {
    const t = _c();
    t && (U = t)
}
const Rc = (t, e, n, o, i) => {
    const a = Li(t, e, n, o, i);
    if (!a.length) return e[n];
    const s = (e[n] - o.min) / (o.max - o.min) * Me,
        c = a.find(r => s >= r.lo && s < r.hi) || a[a.length - 1];
    return o.min + (o.max - o.min) * ((c.lo + c.hi) / (2 * Me))
};

function qc(t, e) {
    const n = +t.value;
    if (!isFinite(e) || Math.abs(e - n) < 1e-9) {
        t._glide = !1;
        return
    }
    t._glide = !0;
    const o = performance.now(),
        i = 150,
        a = s => {
            const c = Math.min(1, (s - o) / i);
            t.value = n + (e - n) * (c < .5 ? 4 * c * c * c : 1 - (-2 * c + 2) ** 3 / 2), c < 1 ? requestAnimationFrame(a) : t._glide = !1
        };
    requestAnimationFrame(a)
}

function qs(t, e, n) {
    if (!t) {
        Ao(e, n);
        return
    }
    t._glide = !0;
    const o = +t.value;
    Ao(e, n);
    const i = At(e)?.[n];
    isFinite(i) && isFinite(o) ? (t.value = o, qc(t, i)) : t._glide = !1
}

function Ao(t, ...e) {
    if (Z == null) return;
    if (U.s !== t) {
        const i = At(t);
        if (!i) return;
        U = {
            s: t,
            vals: i
        }
    }
    const n = ut(t),
        o = Ct(Z);
    for (const i of e.filter(a => a >= 0)) {
        const a = n.ch[i];
        typeof Z == "number" ? U.vals[i] = a.min + (a.max - a.min) * Ti((U.vals[i] - a.min) / (a.max - a.min), Z) : o && (U.vals[i] = Rc(t, U.vals, i, a, o))
    }
    jt()
}
const Ic = new Set(["lrgb", "p3", "p3-linear", "rec2020", "rec2020-linear", "a98rgb", "a98rgb-linear", "prophoto", "prophoto-linear", "xyz", "xyz-d50", "lab", "lab-d65", "lchab", "luv", "lchuv", "oklab", "oklch", "hsl", "hsv", "hwb", "jzazbz", "jzczhz", "ictcp", "acescg", "acescc", "cam16", "rec2100-pq", "rec2100-hlg"]),
    Ci = t => t.replace(/&/g, "&amp;").replace(/</g, "&lt;"),
    Vn = t => `<span class="fl">${t}</span>`,
    Pc = Vn('<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" fill="#f7df1e"/><text x="21" y="20.5" text-anchor="end" font-family="Inter,system-ui,sans-serif" font-size="11" font-weight="800" fill="#0b0b0b">JS</text></svg>'),
    Fc = Vn('<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" fill="#654ff0"/><text x="12" y="16.5" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="9.5" font-weight="800" letter-spacing="-.5" fill="#fff">wa</text></svg>'),
    Bc = Vn('<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="fl-glsl2" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ff5f6d"/><stop offset=".5" stop-color="#845ec2"/><stop offset="1" stop-color="#00c2d1"/></linearGradient></defs><rect width="24" height="24" fill="url(#fl-glsl2)"/></svg>'),
    jc = Vn('<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" fill="#264de4"/><text x="12" y="16.5" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="8.5" font-weight="800" fill="#fff">CSS</text></svg>'),
    zc = Vn('<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" fill="#3a3f4b"/><text x="12" y="17" text-anchor="middle" font-family="ui-monospace,monospace" font-size="13" font-weight="700" fill="#fff">{}</text></svg>'),
    kn = t => t.split(`
`).map(e => {
        const n = e.indexOf("//");
        let o = n < 0 ? e : e.slice(0, n),
            i = n < 0 ? "" : e.slice(n);
        return o = Ci(o).replace(/'[^']*'/g, a => `${a}`).replace(/\b(import|from)\b/g, '<span class="tok-k">$1</span>').replace(/(?<![\w."'])-?\d+\.?\d*(?![\w])/g, '<span class="tok-n">$&</span>').replace(/\x01([^\x02]*)\x02/g, '<span class="tok-s">$1</span>'), o + (i ? `<span class="tok-c">${Ci(i)}</span>` : "")
    }).join(`
`);
let at = {
        a: -.6,
        b: .42
    },
    it = null,
    Dc = 0,
    sn = null,
    En = null,
    oe = null,
    me = null,
    on = null,
    Is = null,
    Ps = null,
    Jt = null,
    St = null,
    Xn = 0;
const _i = 300;
let Fs = !1,
    Mn = 0,
    Ri = 0;
const To = new Map;

function qi(t) {
    if (To.has(t)) return To.get(t);
    const e = ut(t);
    let n = e.archetype !== "additive";
    if (n) try {
        for (let o = 0; o < 5 && n; o++)
            for (let i = 0; i < 5 && n; i++)
                for (let a = 0; a < 5 && n; a++) {
                    const s = e.ch.map((r, d) => r.min + (r.max - r.min) * [o, i, a][d] / 4);
                    W[t].rgb(...s).every(r => isFinite(r) && r > -2.5 && r < 258) || (n = !1)
                }
    } catch {
        n = !1
    }
    return To.set(t, n), n
}
const Kn = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : .0015;
let Ie = Kn,
    ge = null;

function Co() {
    if (cancelAnimationFrame(Mn), Mn = 0, !Ie && !ge) return;
    const t = () => {
        if (!ct() || !it) {
            Mn = 0;
            return
        }
        if (!Fs && !dt) {
            if (ge) {
                const e = ge.a - at.a,
                    n = ge.b - at.b;
                Math.abs(e) < .002 && Math.abs(n) < .002 ? (at.a = ge.a, at.b = ge.b, ge = null) : (at.a += e * .22, at.b += n * .22)
            } else at.a += Ie;
            ue()
        }
        ge || Ie ? Mn = requestAnimationFrame(t) : Mn = 0
    };
    Mn = requestAnimationFrame(t)
}

function Ii() {
    const t = G.querySelector("#pl3d");
    if (!t) {
        it = sn = En = null;
        return
    }
    const e = lt,
        n = ut(e),
        o = [],
        i = [];
    let a = de;
    const s = qi(e);
    s && (a = "srgb");
    const c = a === "vis" || a === "locus",
        r = a === "srgb" ? (p => Vt(e, p)) : c ? (p => e === "xyz" ? p.slice() : W.xyz[e](...p)) : (p => W[a][e](...p.map(v => v / 255))),
        d = p => {
            const v = H(.2126 * p[0] + .7152 * p[1] + .0722 * p[2], 0, 255);
            let b = 1;
            for (let M = 0; M < 3; M++) {
                const j = p[M] - v;
                p[M] > 255 ? b = Math.min(b, (255 - v) / j) : p[M] < 0 && (b = Math.min(b, -v / j))
            }
            const A = Math.pow(H(b, 0, 1), .4);
            return p.map(M => H(v + (M - v) * A, 0, 255))
        },
        f = a === "srgb" ? (p => p) : c ? (p => d(W.xyz.rgb(...p))) : (p => d(W[a].rgb(...p.map(v => v / 255)))),
        S = c ? p => {
            const v = H(p[1] / 7, 0, 1);
            return v * v * (3 - 2 * v)
        } : p => {
            const v = Math.max(...p),
                b = v - Math.min(...p);
            return Math.min(H(b / 2.5, 0, 1), H((v - 2) / 6, 0, 1))
        },
        $ = s ? (p => S(p) < 1 ? 0 : 1) : S,
        {
            ai: L,
            ti: w,
            mi: T
        } = uo(n),
        u = L < 0 ? null : L,
        m = [n.ch.map((p, v) => p.min - (p.max - p.min) * (v !== u && n.archetype === "additive" ? .02 : 1)), n.ch.map(p => p.max + (p.max - p.min))],
        g = n.ch.map(p => p.min),
        y = n.ch.map(p => p.max),
        k = g.slice(),
        F = y.slice();
    let q = 0,
        N = 0,
        V = !1;
    const O = n.ch.findIndex(p => /White/i.test(p.name)),
        P = n.ch.findIndex(p => /Black/i.test(p.name)),
        tt = u != null && O >= 0 && P >= 0;
    {
        const A = ((M, j, I) => {
            const et = [
                    [],
                    [],
                    []
                ],
                nt = [];
            for (const st of M) {
                let rt;
                try {
                    rt = j(st)
                } catch {
                    continue
                }
                const gt = I(st);
                if (gt < 1) {
                    u != null && !tt && T != null && (rt[T] *= gt);
                    for (const $t of n.bips) rt[$t.i] *= gt
                }
                rt.every(isFinite) && nt.push(rt);
                for (let $t = 0; $t < 3; $t++) isFinite(rt[$t]) && et[$t].push(rt[$t])
            }
            return {
                smp: et,
                pts: nt
            }
        })(c ? (() => {
            const M = [],
                j = (a === "locus" ? da : Ns)(12).pos;
            for (let I = 0; I < j.length; I += 3) M.push([j[I], j[I + 1], j[I + 2]]);
            return M
        })() : (() => {
            const M = [];
            for (let j = 0; j < 6; j++)
                for (let I = 0; I <= 12; I++)
                    for (let et = 0; et <= 12; et++) {
                        const nt = I / 12 * 255,
                            st = et / 12 * 255;
                        M.push([
                            [0, nt, st],
                            [255, nt, st],
                            [nt, 0, st],
                            [nt, 255, st],
                            [nt, st, 0],
                            [nt, st, 255]
                        ][j])
                    }
            return M
        })(), r, $);
        n.ch.forEach((M, j) => {
            const I = A.smp[j].sort((st, rt) => st - rt);
            if (j === u || I.length < 24) return;
            let et = I[0],
                nt = I[I.length - 1];
            if (s) {
                const st = Math.max(et, M.min),
                    rt = Math.min(nt, M.max);
                st > et + 1e-9 && (N |= 1 << j * 2), rt < nt - 1e-9 && (N |= 1 << j * 2 + 1), et = st, nt = rt
            } else(et < M.min - (M.max - M.min) * .004 || nt > M.max + (M.max - M.min) * .004) && (V = !0);
            nt - et < (M.max - M.min) * .05 || (k[j] = et, F[j] = nt)
        });
        for (let M = 0; M < 3 && !(u != null || n.archetype === "additive"); M++) {
            let j = 0,
                I = 0;
            for (const et of A.pts) {
                const nt = (et[M] - g[M]) / (y[M] - g[M]);
                nt < .06 ? j++ : nt > .94 && I++
            }
            j >= 30 && (q |= 1 << M * 2), I >= 30 && (q |= 1 << M * 2 + 1)
        }
        q |= N, c && (q = 0, n.ch.forEach((M, j) => {
            if (j === u) return;
            const I = (M.max - M.min) * .004;
            k[j] < M.min - I && (q |= 1 << j * 2), F[j] > M.max + I && (q |= 1 << j * 2 + 1)
        }))
    }
    q = N, n.ch.forEach((p, v) => {
        if (v === u) return;
        const b = (p.max - p.min) * .004;
        k[v] < p.min - b && (q |= 1 << v * 2), F[v] > p.max + b && (q |= 1 << v * 2 + 1)
    }), s && u != null && w != null && (q |= 1 << w * 2 + 1);
    const R = (p, v) => H((p[v] - g[v]) / (y[v] - g[v]), -.2, 1.2),
        X = s ? (p => n.ch.some((v, b) => {
            if (b === u) return !1;
            const A = (p[b] - k[b]) / (F[b] - k[b]);
            return !(A >= -.012 && A <= 1.012)
        })) : (p => !1),
        J = [0, 1, 2].filter(p => p !== w),
        Q = p => (p[u] - g[u]) / (y[u] - g[u]) * 2 * Math.PI,
        bt = p => {
            if (tt) {
                const b = Math.max(0, 1 - R(p, O) - R(p, P)) * .55,
                    A = Q(p);
                return [.5 - R(p, P), b * Math.cos(A), b * Math.sin(A)]
            }
            const v = R(p, w) - .5;
            if (u != null) {
                const b = R(p, T) * .55,
                    A = Q(p);
                return [v, b * Math.cos(A), b * Math.sin(A)]
            }
            return [v, R(p, J[0]) - .5, R(p, J[1]) - .5]
        };
    me = bt, on = p => {
        const v = (A, M) => g[M] + A * (y[M] - g[M]),
            b = [0, 0, 0];
        if (tt) {
            const A = .5 - p[0],
                M = Math.hypot(p[1], p[2]) / .55,
                j = 1 - A - M;
            let I = Math.atan2(p[2], p[1]) / (2 * Math.PI);
            return I < 0 && (I += 1), b[P] = v(A, P), b[O] = v(j, O), b[u] = v(I, u), b
        }
        if (u != null) {
            let A = Math.atan2(p[2], p[1]) / (2 * Math.PI);
            return A < 0 && (A += 1), b[w] = v(p[0] + .5, w), b[T] = v(Math.hypot(p[1], p[2]) / .55, T), b[u] = v(A, u), b
        }
        return b[w] = v(p[0] + .5, w), b[J[0]] = v(p[1] + .5, J[0]), b[J[1]] = v(p[2] + .5, J[1]), b
    };
    const Zt = p => p.every((v, b) => isFinite(v) && v > m[0][b] && v < m[1][b]),
        Mt = p => {
            let v;
            try {
                v = r(p)
            } catch {
                return null
            }
            if (!Zt(v)) {
                const A = c ? [p[1] * .9504559, p[1], p[1] * 1.0890578] : Array(3).fill((p[0] + p[1] + p[2]) / 3);
                let M = 0,
                    j = 1;
                for (let I = 0; I < 18; I++) {
                    const et = (M + j) / 2;
                    let nt;
                    try {
                        nt = r(A.map((st, rt) => st + (p[rt] - st) * et))
                    } catch {
                        nt = null
                    }
                    nt && Zt(nt) ? M = et : j = et
                }
                try {
                    v = r(A.map((I, et) => I + (p[et] - I) * M))
                } catch {
                    return null
                }
                if (!Zt(v)) return null
            } {
                const A = $(p);
                if (A < 1) {
                    u != null && !tt && T != null && (v[T] *= A);
                    for (const M of n.bips) v[M.i] *= A
                }
            }
            if (X(v)) return null;
            const b = bt(v);
            return b.every(isFinite) ? {
                n: b,
                v
            } : null
        },
        x = p => {
            const v = Mt(p);
            if (!v) return null;
            let b;
            try {
                b = f(p)
            } catch {
                return null
            }
            return o.push({
                n: v.n,
                src: p,
                rgb: b.map(A => H(Math.round(A), 0, 255)),
                h: u != null ? ((v.v[u] - g[u]) / (y[u] - g[u]) * 360 % 360 + 360) % 360 : 0
            }), o.length - 1
        },
        E = (p, v, b) => {
            if (!(p == null || v == null || b == null)) {
                if (u != null) {
                    const A = [o[p].h, o[v].h, o[b].h],
                        M = Math.max(...A) - Math.min(...A),
                        j = Math.max(...[p, v, b].map(I => Math.hypot(o[I].n[1], o[I].n[2])));
                    if (Math.min(M, 360 - M) > 60 && j > .08) return
                }
                i.push([p, v, b])
            }
        },
        z = (p, v) => {
            const b = o[p].n,
                A = o[v].n;
            return (b[0] - A[0]) ** 2 + (b[1] - A[1]) ** 2 + (b[2] - A[2]) ** 2
        },
        B = (p, v, b, A) => {
            p == null || v == null || b == null || A == null || (z(p, A) <= z(v, b) ? (E(p, v, A), E(p, A, b)) : (E(p, v, b), E(v, A, b)))
        },
        D = (p, v) => {
            const b = [];
            for (let A = 0; A <= p; A++) {
                b[A] = [];
                for (let M = 0; M <= p; M++) b[A][M] = v(A / p, M / p)
            }
            if (!Y)
                for (let A = 0; A < 2; A++) {
                    const M = b.map(j => j.map(I => I == null ? null : o[I].n.slice()));
                    for (let j = 1; j < p; j++)
                        for (let I = 1; I < p; I++) {
                            const et = b[j][I];
                            if (et == null) continue;
                            const nt = [M[j - 1][I], M[j + 1][I], M[j][I - 1], M[j][I + 1]];
                            if (!nt.some(st => !st))
                                for (let st = 0; st < 3; st++) o[et].n[st] = M[j][I][st] * .4 + (nt[0][st] + nt[1][st] + nt[2][st] + nt[3][st]) * .15
                        }
                }
            for (let A = 0; A < p; A++)
                for (let M = 0; M < p; M++) {
                    const j = b[A][M],
                        I = b[A + 1][M],
                        et = b[A][M + 1],
                        nt = b[A + 1][M + 1];
                    B(j, I, et, nt)
                }
        },
        ot = c && ["hsm"].includes(e),
        Y = cr(e) && !ot;
    if (Y) {
        const p = t.querySelector(".mesh3");
        p !== ra() && p.replaceWith(ra())
    }
    const C = () => {
        const p = Y ? 12 : 64;
        if (c) {
            const _ = (a === "locus" ? da : Ns)(Y ? 12 : 48),
                K = _.G;
            D(K, (ht, pt) => {
                const mt = (Math.round(ht * K) * (K + 1) + Math.round(pt * K)) * 3;
                return x([_.pos[mt], _.pos[mt + 1], _.pos[mt + 2]])
            })
        } else
            for (let _ = 0; _ < 6; _++) D(p, (K, ht) => {
                const pt = K * 255,
                    mt = ht * 255;
                return x([
                    [0, pt, mt],
                    [255, pt, mt],
                    [pt, 0, mt],
                    [pt, 255, mt],
                    [pt, mt, 0],
                    [pt, mt, 255]
                ][_])
            });
        const v = fa(e) ? (_, K) => {
                let ht;
                try {
                    ht = Vt(e, K.map(pt => H(pt, 0, 255)))
                } catch {
                    return !1
                }
                return n.ch.every((pt, mt) => {
                    let Dt = Math.abs(ht[mt] - _[mt]);
                    return pt.max === 360 && (Dt = Math.min(Dt, 360 - Dt)), Dt <= (pt.max - pt.min) * .03
                })
            } : () => !0,
            b = _ => {
                let K;
                try {
                    K = W[e].rgb(..._)
                } catch {
                    return null
                }
                if (!K.every(isFinite) || !Mc(e, _, a) || !v(_, K)) return null;
                const ht = bt(_);
                return ht.every(isFinite) ? (o.push({
                    n: ht,
                    rgb: K.map(pt => H(Math.round(pt), 0, 255)),
                    h: u != null ? ((_[u] - g[u]) / (y[u] - g[u]) * 360 % 360 + 360) % 360 : 0
                }), o.length - 1) : null
            },
            A = .012;
        if (!Y && e !== "rgb" && a !== "vis")
            for (let _ = 0; _ < 3; _++)
                for (let K = 0; K < 2; K++) {
                    if (!(q >> _ * 2 + K & 1)) continue;
                    const [ht, pt] = [0, 1, 2].filter(mt => mt !== _);
                    D(36, (mt, Dt) => {
                        const re = [0, 0, 0];
                        return re[_] = K ? 1 - A : A, re[ht] = mt, re[pt] = Dt, b(n.ch.map((Bt, ce) => k[ce] + (F[ce] - k[ce]) * re[ce]))
                    })
                }
        const M = 0,
            j = i.map(_ => {
                const [K, ht, pt] = _.map(Ot => o[Ot].n), mt = ht[0] - K[0], Dt = ht[1] - K[1], re = ht[2] - K[2], Bt = pt[0] - K[0], ce = pt[1] - K[1], Fe = pt[2] - K[2];
                return Math.hypot(Dt * Fe - re * ce, re * Bt - mt * Fe, mt * ce - Dt * Bt) / 2
            }),
            I = j.reduce((_, K) => _ + K, 0) || 1;
        let et = 88172645;
        const nt = () => (et = et * 1664525 + 1013904223 >>> 0) / 4294967296,
            st = [],
            rt = [];
        let gt = 0;
        i.forEach((_, K) => {
            const ht = M * j[K] / I + gt,
                pt = Math.floor(ht);
            gt = ht - pt;
            const [mt, Dt, re] = _.map(Bt => o[Bt]);
            for (let Bt = 0; Bt < pt; Bt++) {
                let ce = nt(),
                    Fe = nt();
                ce + Fe > 1 && (ce = 1 - ce, Fe = 1 - Fe);
                for (let Ot = 0; Ot < 3; Ot++) st.push(mt.n[Ot] + ce * (Dt.n[Ot] - mt.n[Ot]) + Fe * (re.n[Ot] - mt.n[Ot]));
                for (let Ot = 0; Ot < 3; Ot++) rt.push((mt.rgb[Ot] + ce * (Dt.rgb[Ot] - mt.rgb[Ot]) + Fe * (re.rgb[Ot] - mt.rgb[Ot])) / 255)
            }
        });
        const $t = [],
            Tt = [];
        for (const _ of i)
            for (const K of _) {
                const ht = o[K];
                $t.push(ht.n[0], ht.n[1], ht.n[2]), Tt.push(ht.rgb[0] / 255, ht.rgb[1] / 255, ht.rgb[2] / 255)
            }
        const zt = a === "locus" ? m : c ? [n.ch.map((_, K) => K === u ? m[0][K] : k[K] - (_.max - _.min) * .08), n.ch.map((_, K) => K === u ? m[1][K] : F[K] + (_.max - _.min) * .08)] : m;
        it = {
            rev: ++Dc,
            verts: o,
            tris: i,
            ev: Mt,
            pos: new Float32Array(st),
            col: new Float32Array(rt),
            tpos: new Float32Array($t),
            tcol: new Float32Array(Tt),
            r: .001,
            f0: .5,
            gpu: Y,
            g3: a,
            map: Y ? {
                gam: a,
                win: zt,
                min: g,
                max: y,
                caps: q,
                cmin: k.map((_, K) => Math.max(_, n.ch[K].min)),
                cmax: F.map((_, K) => Math.min(_, n.ch[K].max)),
                dcl: [n.ch.map(_ => _.min), n.ch.map(_ => _.max)],
                out: V,
                clip: s,
                ti: w,
                ai: u ?? -1,
                mi: T ?? 0,
                wI: tt ? O : -1,
                bI: tt ? P : -1,
                bip: n.bips.slice(0, 2).map(_ => _.i)
            } : null
        }, sn = o, En = i, oe = e;
        const Wt = (_, K, ht = 4) => {
            const pt = K - _ || 1,
                mt = 10 ** Math.floor(Math.log10(pt / ht)),
                Dt = [1, 2, 5, 10].map(Bt => Bt * mt).find(Bt => pt / Bt <= ht * 1.5) || mt * 10,
                re = [];
            for (let Bt = Math.ceil(_ / Dt - 1e-9) * Dt; Bt <= K + pt * 1e-9; Bt += Dt) re.push({
                v: Math.abs(Bt) < Dt / 1e6 ? 0 : Bt,
                f: (Bt - _) / pt
            });
            return re
        };
        it.gd = u != null ? {
            kind: "cyl",
            R: .55,
            deg: n.ch[u].max === 360,
            ysym: n.ch[tt ? P : w].sym,
            hsym: n.ch[u].sym,
            ty: Wt(g[tt ? P : w], y[tt ? P : w]).map(_ => ({
                ..._,
                y: tt ? .5 - _.f : _.f - .5
            })),
            th: (y[u] - g[u] === 360 ? Array.from({
                length: 12
            }, (_, K) => ({
                v: g[u] + K * 30,
                f: K / 12
            })) : Wt(g[u], y[u], 8).filter(_ => _.f < .999)).map(_ => ({
                ..._,
                a: _.f * 2 * Math.PI
            })),
            tr: tt ? [.25, .5, .75].map(_ => ({
                r: _ * .55
            })) : Wt(g[T], y[T]).map(_ => ({
                ..._,
                r: _.f * .55
            }))
        } : {
            kind: "box",
            dims: [w, J[0], J[1]].map(_ => ({
                sym: n.ch[_].sym,
                t: Wt(g[_], y[_]).map(K => ({
                    ...K,
                    x: K.f - .5
                }))
            }))
        };
        const ft = Math.cos(at.a),
            _t = Math.sin(at.a),
            xt = Math.cos(at.b),
            Ht = Math.sin(at.b),
            yt = _ => {
                const K = _[1] * ft + _[2] * _t,
                    ht = -_[1] * _t + _[2] * ft;
                return Math.max(Math.abs(K), Math.abs(_[0] * xt - ht * Ht))
            };
        for (const _ of o) {
            const K = Math.hypot(_.n[0], _.n[1], _.n[2]);
            K > it.r && (it.r = K)
        }
        const wt = [];
        if (u != null)
            for (let _ = 0; _ < 12; _++) {
                const K = _ / 12 * 2 * Math.PI;
                wt.push([-.5, .55 * Math.cos(K), .55 * Math.sin(K)], [.5, .55 * Math.cos(K), .55 * Math.sin(K)])
            } else
                for (let _ = 0; _ < 8; _++) wt.push([_ & 1 ? .5 : -.5, _ & 2 ? .5 : -.5, _ & 4 ? .5 : -.5]);
        for (const _ of wt) {
            const K = yt(_) * 1.14;
            K > it.f0 && (it.f0 = K)
        }
        let te = 0,
            rn = 0,
            ns = 0,
            Ds = 0,
            Os = -1 / 0,
            Ko = 1;
        t.onpointerdown = _ => {
            Fs = !0, Ie = 0, ge = null, Os = -1 / 0, te = ns = _.clientX, rn = Ds = _.clientY, t.setPointerCapture(_.pointerId)
        }, t.onpointermove = _ => {
            if (!Fs) return;
            at.a += (_.clientX - te) * .011, at.b = H(at.b + (_.clientY - rn) * .011, -Math.PI / 2, Math.PI / 2), te = _.clientX, rn = _.clientY;
            let K = !1;
            (Math.abs(_.clientX - ns) > 5 || Math.abs(_.clientY - Ds) > 5) && (Ko = _.clientX < ns ? -1 : 1, ns = _.clientX, Ds = _.clientY, K = !0), ue(), K && (Os = performance.now())
        }, t.onpointerup = () => {
            Fs = !1;
            const _ = Math.PI / 2,
                K = Math.round(at.a / _) * _,
                ht = Math.round(at.b / _) * _,
                pt = it && it.gd && it.gd.kind === "cyl",
                mt = performance.now();
            (pt || Math.abs(at.a - K) < .14) && Math.abs(at.b - ht) < .14 ? (Ie = 0, Kn === 0 ? (pt || (at.a = K), at.b = ht, ue()) : ge = {
                a: pt ? at.a : K,
                b: H(ht, -Math.PI / 2, Math.PI / 2)
            }) : mt - Os >= 100 ? Ie = 0 : Ie = Kn * Ko, Co()
        }, t.onpointercancel = t.onpointerup, t.ondblclick = () => {
            at = {
                a: -.65,
                b: .5
            }, ge = null, Ie = Kn, ue(), Co()
        }, ue(), Co()
    };
    if (Y) C();
    else {
        it = null;
        const p = ++Ri;
        setTimeout(() => {
            p === Ri && lt === e && ct() && C()
        }, 30)
    }
}

function Oc(t) {
    if (t._gl3d !== void 0) return t._gl3d;
    const e = t.getContext("webgl", {
        alpha: !0,
        antialias: !0,
        stencil: !0
    }) || t.getContext("experimental-webgl", {
        alpha: !0,
        antialias: !0,
        stencil: !0
    });
    if (!e) return t._gl3d = null;
    const n = (s, c) => {
            const r = e.createShader(s);
            return e.shaderSource(r, c), e.compileShader(r), e.getShaderParameter(r, e.COMPILE_STATUS) ? r : null
        },
        o = n(e.VERTEX_SHADER, `
		attribute vec3 a_pos;
		attribute vec3 a_rgb;
		uniform vec2 u_rot;
		uniform float u_scale;
		uniform float u_ps;
		uniform float u_zoff;
		varying vec3 v_rgb;
		void main(){
			float y=a_pos.x, x=a_pos.y, z=a_pos.z;
			float ca=cos(u_rot.x), sa=sin(u_rot.x), cb=cos(u_rot.y), sb=sin(u_rot.y);
			float X1=x*ca+z*sa;
			float Z1=-x*sa+z*ca;
			float Y=y*cb-Z1*sb;
			float D=y*sb+Z1*cb;
			gl_Position=vec4(X1*u_scale,Y*u_scale,-D*.7-u_zoff,1.0);
			gl_PointSize=u_ps;
			v_rgb=a_rgb;
		}`),
        i = n(e.FRAGMENT_SHADER, `precision mediump float;
		varying vec3 v_rgb;
		uniform float u_dim;
		uniform float u_alpha;
		void main(){ gl_FragColor=vec4(v_rgb*u_dim,u_alpha); }`);
    if (!o || !i) return t._gl3d = null;
    const a = e.createProgram();
    return e.attachShader(a, o), e.attachShader(a, i), e.linkProgram(a), e.getProgramParameter(a, e.LINK_STATUS) ? t._gl3d = {
        gl: e,
        pr: a,
        pos: e.getAttribLocation(a, "a_pos"),
        rgb: e.getAttribLocation(a, "a_rgb"),
        rot: e.getUniformLocation(a, "u_rot"),
        scale: e.getUniformLocation(a, "u_scale"),
        ps: e.getUniformLocation(a, "u_ps"),
        zoff: e.getUniformLocation(a, "u_zoff"),
        dim: e.getUniformLocation(a, "u_dim"),
        alpha: e.getUniformLocation(a, "u_alpha"),
        pb: e.createBuffer(),
        cb: e.createBuffer(),
        tb: e.createBuffer(),
        tcb: e.createBuffer(),
        sb: e.createBuffer(),
        swb: e.createBuffer(),
        sn: 0,
        mesh: null,
        count: 0,
        tcount: 0
    } : t._gl3d = null
}

function Pi(t, e, n, o, i) {
    const a = Oc(t);
    if (!a || !e.tpos.length) return !1;
    const {
        gl: s,
        pr: c
    } = a;
    a.mesh !== e && (s.bindBuffer(s.ARRAY_BUFFER, a.pb), s.bufferData(s.ARRAY_BUFFER, e.pos, s.STATIC_DRAW), s.bindBuffer(s.ARRAY_BUFFER, a.cb), s.bufferData(s.ARRAY_BUFFER, e.col, s.STATIC_DRAW), s.bindBuffer(s.ARRAY_BUFFER, a.tb), s.bufferData(s.ARRAY_BUFFER, e.tpos, s.STATIC_DRAW), s.bindBuffer(s.ARRAY_BUFFER, a.tcb), s.bufferData(s.ARRAY_BUFFER, e.tcol, s.STATIC_DRAW), a.mesh = e, a.count = e.pos.length / 3, a.tcount = e.tpos.length / 3), s.viewport(0, 0, t.width, t.height), s.clearColor(0, 0, 0, 0), s.clearDepth(1), s.clear(s.COLOR_BUFFER_BIT | s.DEPTH_BUFFER_BIT), s.enable(s.DEPTH_TEST), s.depthFunc(s.LEQUAL), s.disable(s.CULL_FACE), s.useProgram(c), s.uniform2f(a.rot, at.a, at.b), s.uniform1f(a.scale, n);
    const r = (d, f, l, h) => {
        s.bindBuffer(s.ARRAY_BUFFER, d), s.enableVertexAttribArray(a.pos), s.vertexAttribPointer(a.pos, 3, s.FLOAT, !1, 0, 0), s.bindBuffer(s.ARRAY_BUFFER, f), s.enableVertexAttribArray(a.rgb), s.vertexAttribPointer(a.rgb, 3, s.FLOAT, !1, 0, 0), s.drawArrays(l, 0, h)
    };
    if (s.uniform1f(a.zoff, 0), s.uniform1f(a.ps, 1), s.uniform1f(a.dim, 1), s.uniform1f(a.alpha, 1), r(a.tb, a.tcb, s.TRIANGLES, a.tcount), o && o.length && (s.bindBuffer(s.ARRAY_BUFFER, a.sb), s.bufferData(s.ARRAY_BUFFER, o, s.DYNAMIC_DRAW), a.sn !== o.length && (s.bindBuffer(s.ARRAY_BUFFER, a.swb), s.bufferData(s.ARRAY_BUFFER, new Float32Array(o.length).fill(1), s.DYNAMIC_DRAW), a.sn = o.length), s.enable(s.BLEND), s.blendFuncSeparate(s.SRC_ALPHA, s.ONE_MINUS_SRC_ALPHA, s.ONE, s.ONE_MINUS_SRC_ALPHA), s.uniform1f(a.alpha, .5), s.depthMask(!1), r(a.sb, a.swb, s.TRIANGLES, o.length / 3), s.depthMask(!0), s.disable(s.BLEND), s.uniform1f(a.alpha, 1)), i) {
        if (a.fpr === void 0) {
            const d = (S, $) => {
                    const L = s.createShader(S);
                    return s.shaderSource(L, $), s.compileShader(L), s.getShaderParameter(L, s.COMPILE_STATUS) ? L : null
                },
                f = d(s.VERTEX_SHADER, "attribute vec3 aPos; void main(){ gl_Position=vec4(aPos,1.0); }"),
                l = d(s.FRAGMENT_SHADER, "precision mediump float; uniform vec4 uTint; void main(){ gl_FragColor=uTint; }"),
                h = f && l && s.createProgram();
            h && (s.attachShader(h, f), s.attachShader(h, l), s.linkProgram(h)), a.fpr = h && s.getProgramParameter(h, s.LINK_STATUS) ? h : null, a.fpr && (a.fpos = s.getAttribLocation(a.fpr, "aPos"), a.ftint = s.getUniformLocation(a.fpr, "uTint"), a.fb = s.createBuffer())
        }
        if (a.fpr) {
            s.useProgram(a.fpr), s.disableVertexAttribArray(a.rgb), s.bindBuffer(s.ARRAY_BUFFER, a.fb), s.enableVertexAttribArray(a.fpos), s.vertexAttribPointer(a.fpos, 3, s.FLOAT, !1, 0, 0), s.enable(s.BLEND), s.blendFuncSeparate(s.SRC_ALPHA, s.ONE_MINUS_SRC_ALPHA, s.ONE, s.ONE_MINUS_SRC_ALPHA), s.depthMask(!1), s.enable(s.STENCIL_TEST), s.stencilFunc(s.EQUAL, 0, 255), s.stencilOp(s.KEEP, s.KEEP, s.INCR);
            const d = (S, $, L, w, T) => {
                    S.length && (s.uniform4f(a.ftint, $, L, w, T), s.bufferData(s.ARRAY_BUFFER, S, s.DYNAMIC_DRAW), s.clear(s.STENCIL_BUFFER_BIT), s.drawArrays(s.TRIANGLES, 0, S.length / 3))
                },
                [f, l, h] = i.tint;
            d(i.fr, 1, 1, 1, .85), d(i.co, f, l, h, 1), s.depthFunc(s.GREATER), d(i.fr, 1, 1, 1, .38), d(i.co, f, l, h, .2), s.depthFunc(s.LEQUAL), s.disable(s.STENCIL_TEST), s.depthMask(!0), s.disable(s.BLEND)
        }
    }
    return !0
}
let Ft = null,
    Yn = null,
    Jn = null;
const _o = (t, e, n, o) => {
    try {
        if (gH) {
            const s = t === "xyz" ? o : W[t].xyz(...o);
            return s.every(isFinite) && os(...s)
        }
        if (!(n === "srgb" ? W[t].rgb(...o).map(s => s / 255) : W[t][n](...o)).every(s => isFinite(s) && s >= -.002 && s <= 1.002)) return !1;
        if (t === "xyz" || !fa(t)) return !0;
        const a = W.xyz[t](...W[t].xyz(...o));
        return e.ch.every((s, c) => {
            let r = Math.abs(a[c] - o[c]);
            return s.max === 360 && (r = Math.min(r, 360 - r)), isFinite(r) && r <= (s.max - s.min) * .03
        })
    } catch {
        return !1
    }
};

function Uc(t, e, n, o, i) {
    const s = l => t.map((h, S) => h + (e[S] - h) * l),
        c = l => {
            if (!on) return !1;
            const h = on(s(l));
            return h.every(isFinite) && _o(n, o, i, h)
        },
        r = [];
    let d = 0,
        f = c(0);
    for (let l = 1; l <= 24; l++) {
        const h = l / 24,
            S = c(h);
        if (S !== f) {
            let $ = (l - 1) / 24,
                L = h;
            for (let T = 0; T < 5; T++) {
                const u = ($ + L) / 2;
                c(u) === f ? $ = u : L = u
            }
            const w = ($ + L) / 2;
            r.push({
                a: s(d),
                b: s(w),
                in: f
            }), d = w, f = S
        }
    }
    return r.push({
        a: s(d),
        b: s(1),
        in: f
    }), r
}

function Nc(t, e, n) {
    if (!sn || !En || !on || !it) return [];
    const o = t.ch[n],
        i = o.max - o.min || 1,
        a = o.max === 360 || t.angle?.i === n,
        s = w => {
            if (a && Math.hypot(w[1], w[2]) < .02) return 0;
            const T = on(w)[n];
            return a ? ((T - e[n]) % i + i * 1.5) % i - i / 2 : T - e[n]
        },
        c = sn.map(w => s(w.n)),
        r = En.length < 5e3 ? it.ev : null,
        d = (w, T) => w < 0 != T < 0 && (!a || Math.abs(w) + Math.abs(T) < i / 2),
        f = (w, T) => {
            if (r && w.src && T.src) {
                let m = w,
                    g = T;
                for (let k = 0; k < 7; k++) {
                    const F = m.src.map((V, O) => (V + g.src[O]) / 2),
                        q = r(F);
                    if (!q) break;
                    const N = {
                        n: q.n,
                        src: F,
                        d: s(q.n)
                    };
                    N.d < 0 == m.d < 0 ? m = N : g = N
                }
                const y = m.d / (m.d - g.d) || 0;
                return m.n.map((k, F) => k + (g.n[F] - k) * y)
            }
            const u = w.d / (w.d - T.d) || 0;
            return w.n.map((m, g) => m + (T.n[g] - m) * u)
        },
        l = [0, 1, 2].filter(w => w !== n),
        h = (w, T, u) => {
            let m = w,
                g = T;
            for (let y = 0; y < 8; y++) {
                const k = m.map((F, q) => (F + g[q]) / 2);
                u(k) >= 0 ? m = k : g = k
            }
            return m.map((y, k) => (y + g[k]) / 2)
        },
        S = w => {
            for (const T of l) {
                const u = t.ch[T];
                if (u.max === 360 || t.angle?.i === T) continue;
                const m = (u.max - u.min) * .008;
                for (const g of [0, 1]) {
                    const y = g ? u.max - m : u.min + m,
                        k = N => g ? y - on(N)[T] : on(N)[T] - y,
                        F = k(w[0]),
                        q = k(w[1]);
                    if (F < 0 && q < 0) return null;
                    F < 0 ? w = [h(w[1], w[0], k), w[1]] : q < 0 && (w = [w[0], h(w[0], w[1], k)])
                }
            }
            return w
        },
        $ = [],
        L = (w, T, u) => {
            const m = [];
            for (const [g, y] of [
                    [w, T],
                    [T, u],
                    [u, w]
                ]) d(g.d, y.d) && m.push(f(g, y));
            if (m.length >= 2) {
                const g = S([m[0], m[1]]);
                g && $.push(g)
            }
        };
    for (const w of En) {
        const T = c[w[0]],
            u = c[w[1]],
            m = c[w[2]];
        if (!d(T, u) && !d(u, m) && !d(m, T)) continue;
        const g = sn[w[0]],
            y = sn[w[1]],
            k = sn[w[2]],
            F = {
                n: g.n,
                src: g.src,
                d: T
            },
            q = {
                n: y.n,
                src: y.src,
                d: u
            },
            N = {
                n: k.n,
                src: k.src,
                d: m
            };
        if (r && g.src && y.src && k.src) {
            const V = (R, X) => {
                    const J = R.src.map((bt, ie) => (bt + X.src[ie]) / 2),
                        Q = r(J);
                    return Q && {
                        n: Q.n,
                        src: J,
                        d: s(Q.n)
                    }
                },
                O = V(F, q),
                P = V(q, N),
                tt = V(N, F);
            if (O && P && tt) {
                L(F, O, tt), L(O, q, P), L(tt, P, N), L(O, P, tt);
                continue
            }
        }
        L(F, q, N)
    }
    return $
}

function Hc(t, e, n, o) {
    const i = t.ch[n],
        a = t.ch[o],
        s = 24,
        c = (d, f) => {
            const l = e.slice();
            return l[n] = i.min + (i.max - i.min) * d, l[o] = a.min + (a.max - a.min) * f, l
        },
        r = [];
    for (let d = 0; d <= s; d++) r.push([d / s, 0]);
    for (let d = 1; d <= s; d++) r.push([1, d / s]);
    for (let d = 1; d <= s; d++) r.push([1 - d / s, 1]);
    for (let d = 1; d <= s; d++) r.push([0, 1 - d / s]);
    return r.map(([d, f]) => {
        const l = me(c(d, f));
        return l.every(isFinite) ? l : null
    })
}
const Gc = (() => {
    try {
        return W.oklch.rgb(.32, .012, 70).map(t => H(t, 0, 255) / 255)
    } catch {
        return [.19, .18, .16]
    }
})();

function Wc(t, e, n, o) {
    const i = t.ch[n],
        a = t.ch[o],
        s = 24,
        c = (f, l) => {
            const h = e.slice();
            return h[n] = i.min + (i.max - i.min) * f, h[o] = a.min + (a.max - a.min) * l, h
        },
        r = [];
    for (let f = 0; f <= s; f++) {
        r[f] = [];
        for (let l = 0; l <= s; l++) {
            const h = me(c(l / s, f / s));
            r[f][l] = h.every(isFinite) ? h : null
        }
    }
    const d = [];
    for (let f = 0; f < s; f++)
        for (let l = 0; l < s; l++) {
            const h = [r[f][l], r[f][l + 1], r[f + 1][l + 1], r[f + 1][l]];
            h.some(S => !S) || d.push(...h[0], ...h[1], ...h[2], ...h[0], ...h[2], ...h[3])
        }
    return new Float32Array(d)
}

function Vc(t, e = t?._sceneKey) {
    if (!t || !e) return t;
    const n = Ps || (Ps = document.createElement("canvas")),
        o = t.width;
    n.width !== o && (n.width = n.height = o);
    const i = n.getContext("2d");
    return i.clearRect(0, 0, o, o), i.drawImage(t, 0, 0), n._sceneKey = e, n
}

function ue() {
    if (!it || !ct()) return;
    const t = G.querySelector("#pl3d");
    if (!t) return;
    const e = t.querySelector(".mesh3"),
        n = t.querySelector(".hud3"),
        o = t.querySelector(".grid3"),
        i = (t.clientWidth || 352) * 1.36,
        a = Math.min(Math.round(i * (devicePixelRatio || 1)), 1200);
    a && n.width !== a && (n.width = n.height = e.width = e.height = o.width = o.height = a);
    const s = n.getContext("2d"),
        c = n.width,
        r = c / i,
        d = Math.cos(at.a),
        f = Math.sin(at.a),
        l = Math.cos(at.b),
        h = Math.sin(at.b),
        S = x => {
            const E = x[0],
                z = x[1] ?? 0,
                B = x[2] ?? 0,
                D = z * d + B * f,
                ot = -z * f + B * d;
            return {
                x: D,
                y: E * l - ot * h,
                z: E * h + ot * l
            }
        },
        $ = At(oe);
    let L = null;
    $ && me && (L = me($));
    const w = G.querySelector("#gam2d canvas") || G.querySelector("#tcv"),
        T = it.gd?.kind === "cyl" ? 1.02 : 1,
        u = Math.min(w ? 1.335 * w.clientWidth / ((t.clientWidth || 352) * T) : .66 / it.f0, 1.4 / T),
        m = c * u / 2;
    e._scale3 = u, e._markerDp = r;
    let g = null,
        y = null,
        k = null;
    if (St && St.i == null && $ && me) {
        const x = ut(oe),
            E = [0, 1, 2].find(C => C !== St.a && C !== St.b),
            z = uo(x),
            B = z.ai >= 0 && E === z.mi,
            D = x.ch[E];
        k = {
            axis: E,
            val: $[E],
            span: D.max - D.min || 1,
            wrap: D.max === 360 || x.angle?.i === E
        };
        const ot = `${oe}|${it.g3}|${St.a},${St.b}|${$[E]}`;
        (!Ft || Ft.key !== ot) && (Ft = {
            key: ot,
            sheet: Wc(x, $, St.a, St.b),
            cut: it.gpu ? null : Nc(x, $, E),
            per: B ? null : Hc(x, $, St.a, St.b)
        }), g = Ft.sheet;
        const Y = `${at.a},${at.b}|${u}|${c}`;
        if (Ft.per && Ft.frK !== Y) {
            const C = Ft.per.map(M => {
                if (!M) return null;
                const j = S(M);
                return [j.x * u, j.y * u, -.7 * j.z - .0015]
            });
            let p = 0;
            for (let M = 0; M < C.length - 1; M++) {
                const j = C[M],
                    I = C[M + 1];
                j && I && (p += j[0] * I[1] - I[0] * j[1])
            }
            const v = p > 0 ? -1 : 1,
                b = 2 / c,
                A = (M, j) => {
                    const I = [];
                    for (let et = 0; et < C.length - 1; et++) {
                        const nt = C[et],
                            st = C[et + 1];
                        if (!nt || !st) continue;
                        let rt = st[0] - nt[0],
                            gt = st[1] - nt[1];
                        const $t = Math.hypot(rt, gt) || 1;
                        rt /= $t, gt /= $t;
                        const Tt = -gt * v,
                            zt = rt * v,
                            Wt = j * b,
                            ft = nt[0] - rt * Wt,
                            _t = nt[1] - gt * Wt,
                            xt = st[0] + rt * Wt,
                            Ht = st[1] + gt * Wt,
                            yt = (M - j) * b,
                            wt = (M + j) * b;
                        I.push(ft + Tt * yt, _t + zt * yt, nt[2], xt + Tt * yt, Ht + zt * yt, st[2], ft + Tt * wt, _t + zt * wt, nt[2], ft + Tt * wt, _t + zt * wt, nt[2], xt + Tt * yt, Ht + zt * yt, st[2], xt + Tt * wt, Ht + zt * wt, st[2])
                    }
                    return new Float32Array(I)
                };
            Ft.frK = Y, Ft.frame = {
                fr: A(.75 * r, .75 * r),
                co: A(0, .6 * r),
                tint: Gc
            }
        }
        y = Ft.per ? Ft.frame : null
    }
    const F = `${it.rev}|${at.a},${at.b}|${u}|${c}|${Z}|${se}|${Lt?Qe:"-"}|${g||y?Ft?.key:""}`;
    let q = !!(e && e._sceneKey === F),
        N = Ps?._sceneKey === F ? Ps : e;
    q || (q = !!(e && (it.gpu ? ia(e, oe, it.map, at, u, null, null, null, Z, se) : Pi(e, it, u))), N = e, q && (dt || g || y) && (N = Vc(e, F)), q && (g || y) && (it.gpu ? ia(e, oe, it.map, at, u, g, y, k, Z, se) : Pi(e, it, u, g, y)), q && (e._sceneKey = F)), s.clearRect(0, 0, c, c);
    const V = x => {
        const E = S(x);
        return {
            x: c / 2 + E.x * m,
            y: c / 2 - E.y * m,
            z: E.z
        }
    };
    if (!q && !it.gpu) {
        const x = (En || []).map(E => {
            const z = E.map(D => V(it.verts[D].n)),
                B = [0, 1, 2].map(D => Math.round(E.reduce((ot, Y) => ot + it.verts[Y].rgb[D], 0) / 3));
            return {
                ps: z,
                z: (z[0].z + z[1].z + z[2].z) / 3,
                hex: Rt(B)
            }
        }).sort((E, z) => E.z - z.z);
        for (const E of x) s.fillStyle = E.hex, s.beginPath(), s.moveTo(E.ps[0].x, E.ps[0].y), s.lineTo(E.ps[1].x, E.ps[1].y), s.lineTo(E.ps[2].x, E.ps[2].y), s.closePath(), s.fill()
    }
    const O = it.gd,
        P = o.getContext("2d"),
        tt = "oklch(0.32 0.012 70)",
        R = "#fff",
        X = "oklch(0.5 0.01 70/.6)",
        J = `${it.rev}|${at.a},${at.b}|${u}|${c}`,
        Q = O?.kind === "box" ? [0, 1, 2].map(x => {
            const E = [0, 0, 0];
            return E[x] = 1, S(E).z < 0 ? .5 : -.5
        }) : null,
        bt = O && O.kind !== "box" && S([1, 0, 0]).z < 0 ? .5 : -.5;
    if (o._gridKey !== J) {
        o._gridKey = J, P.clearRect(0, 0, c, c);
        const x = "oklch(0.5 0.01 70/.15)",
            E = "oklch(0.5 0.01 70/.34)",
            z = "oklch(0.5 0.01 70/.85)",
            B = C => String(Math.abs(C) >= 1e3 ? Math.round(C) : +C.toPrecision(3)),
            D = (C, p) => {
                const v = V(C),
                    b = V(p);
                P.moveTo(v.x, v.y), P.lineTo(b.x, b.y)
            };
        P.lineWidth = r, P.textAlign = "center", P.textBaseline = "middle";
        const ot = `600 ${Math.round(9.5*r)}px Inter,sans-serif`,
            Y = `700 ${Math.round(10.5*r)}px Inter,sans-serif`;
        if (P.font = ot, O && O.kind === "box") {
            const C = (v, b, A, M, j, I) => {
                const et = [0, 0, 0];
                return et[v] = b, et[A] = M, et[j] = I, et
            };
            P.strokeStyle = x, P.beginPath();
            for (let v = 0; v < 3; v++) {
                const [b, A] = [0, 1, 2].filter(M => M !== v);
                for (const M of O.dims[b].t) D(C(v, Q[v], b, M.x, A, -.5), C(v, Q[v], b, M.x, A, .5));
                for (const M of O.dims[A].t) D(C(v, Q[v], A, M.x, b, -.5), C(v, Q[v], A, M.x, b, .5))
            }
            P.stroke(), P.strokeStyle = E, P.beginPath();
            for (let v = 0; v < 3; v++) {
                const [b, A] = [0, 1, 2].filter(M => M !== v);
                for (const M of [-.5, .5]) D(C(v, Q[v], b, M, A, -.5), C(v, Q[v], b, M, A, .5)), D(C(v, Q[v], A, M, b, -.5), C(v, Q[v], A, M, b, .5))
            }
            P.stroke(), P.fillStyle = z;
            const p = it.hys || (it.hys = {
                edge: [],
                step: []
            });
            for (let v = 0; v < 3; v++) {
                const [b, A] = [0, 1, 2].filter(yt => yt !== v), M = (yt, wt) => yt === Q[b] != (wt === Q[A]), j = p.edge[v];
                let I = j && M(j.se, j.sf) ? j : null;
                if (!I)
                    for (const yt of [-.5, .5])
                        for (const wt of [-.5, .5]) {
                            if (!M(yt, wt)) continue;
                            const te = V(C(v, 0, b, yt, A, wt)),
                                rn = te.y + Math.abs(te.x - c / 2) * .6;
                            (!I || rn > I.score) && (I = {
                                se: yt,
                                sf: wt,
                                score: rn
                            })
                        }
                p.edge[v] = {
                    se: I.se,
                    sf: I.sf
                };
                const et = V(C(v, 0, b, I.se, A, I.sf)),
                    nt = et.x - c / 2,
                    st = et.y - c / 2,
                    rt = Math.hypot(nt, st) || 1,
                    gt = 12 * r,
                    $t = V(C(v, -.5, b, I.se, A, I.sf)),
                    Tt = V(C(v, .5, b, I.se, A, I.sf)),
                    zt = Math.hypot(Tt.x - $t.x, Tt.y - $t.y),
                    Wt = H(zt / c * 9 - .35, 0, 1);
                if (Wt <= .03) continue;
                const ft = Math.max(1, Math.ceil(O.dims[v].t.length * 16 * r / Math.max(zt, 1))),
                    _t = p.step[v] = ft > (p.step[v] || 1) || ft <= (p.step[v] || 1) * .55 ? ft : p.step[v],
                    xt = yt => H(yt, 9 * r, c - 9 * r);
                P.globalAlpha = Wt, O.dims[v].t.forEach((yt, wt) => {
                    if (wt % _t) return;
                    const te = V(C(v, yt.x, b, I.se, A, I.sf));
                    P.fillText(B(yt.v), xt(te.x + nt / rt * gt), xt(te.y + st / rt * gt))
                });
                const Ht = V(C(v, .5, b, I.se, A, I.sf));
                P.font = Y, P.fillText(O.dims[v].sym, xt(Ht.x + nt / rt * gt * 2.1), xt(Ht.y + st / rt * gt * 2.1)), P.font = ot, P.globalAlpha = 1
            }
        } else if (O) {
            const C = O.R,
                p = ft => S([0, Math.cos(ft), Math.sin(ft)]).z < 0,
                v = (ft, _t, xt) => {
                    let Ht = !1;
                    for (let yt = 0; yt <= 96; yt++) {
                        const wt = yt / 96 * 2 * Math.PI;
                        if (xt && !p(wt)) {
                            Ht = !1;
                            continue
                        }
                        const te = V([ft, _t * Math.cos(wt), _t * Math.sin(wt)]);
                        Ht ? P.lineTo(te.x, te.y) : (P.moveTo(te.x, te.y), Ht = !0)
                    }
                };
            P.strokeStyle = x, P.beginPath();
            for (const ft of O.tr) ft.r > .01 && ft.r < C - .01 && v(bt, ft.r);
            for (const ft of O.th) {
                const _t = Math.cos(ft.a),
                    xt = Math.sin(ft.a);
                D([bt, 0, 0], [bt, C * _t, C * xt]), p(ft.a) && D([-.5, C * _t, C * xt], [.5, C * _t, C * xt])
            }
            for (const ft of O.ty) Math.abs(ft.y) < .49 && v(ft.y, C, !0);
            P.stroke(), P.strokeStyle = E, P.beginPath(), v(bt, C), v(-bt, C, !0), P.stroke(), P.fillStyle = z;
            const b = it.hys || (it.hys = {
                    edge: [],
                    step: []
                }),
                A = at.a + Math.PI,
                M = at.a + Math.PI / 2,
                j = Math.cos(A),
                I = Math.sin(A);
            P.textAlign = "right";
            const et = V([-.5, C * j, C * I]),
                nt = V([.5, C * j, C * I]),
                st = H(Math.abs(Math.cos(at.b)) * 4 - .15, 0, 1),
                rt = Math.max(1, Math.ceil(O.ty.length * 13 * r / Math.max(Math.abs(nt.y - et.y), 1))),
                gt = b.step[3] = rt > (b.step[3] || 1) || rt <= (b.step[3] || 1) * .55 ? rt : b.step[3],
                $t = [];
            st > .03 && (P.globalAlpha = st, O.ty.forEach((ft, _t) => {
                if (_t % gt) return;
                const xt = V([ft.y, C * j, C * I]);
                $t.push(xt), P.fillText(B(ft.v), xt.x - 7 * r, xt.y)
            }), P.globalAlpha = 1), P.textAlign = "center";
            const Tt = H(Math.abs(Math.sin(at.b)) * 4 - .15, 0, 1),
                zt = Math.ceil(O.th.length / 6);
            if (Tt > .03 && O.th.forEach((ft, _t) => {
                    if (_t % zt) return;
                    const xt = V([bt, C * 1.16 * Math.cos(ft.a), C * 1.16 * Math.sin(ft.a)]);
                    let Ht = 0;
                    for (const wt of $t) Ht = Math.max(Ht, 1 - Math.max(Math.abs(xt.x - wt.x) / (30 * r), Math.abs(xt.y - wt.y) / (13 * r)));
                    const yt = H(1 - Ht * 1.5, 0, 1) * Tt;
                    yt <= .03 || (P.globalAlpha = yt, P.fillText(B(ft.v) + (O.deg ? "\xB0" : ""), xt.x, xt.y), P.globalAlpha = 1)
                }), P.font = Y, P.textAlign = "right", st > .03) {
                P.globalAlpha = Math.max(st, .5);
                const ft = V([.5, C * j, C * I]);
                P.fillText(O.ysym, ft.x - 7 * r, ft.y - 15 * r), P.globalAlpha = 1
            }
            P.textAlign = "center";
            const Wt = V([bt, C * 1.34 * Math.cos(M), C * 1.34 * Math.sin(M)]);
            Tt > .03 && (P.globalAlpha = Math.max(Tt, .5), P.fillText(O.hsym, Wt.x, Wt.y), P.globalAlpha = 1)
        }
    }
    const ie = !0;
    if (q && O) {
        const x = Is || (Is = document.createElement("canvas"));
        x.width !== c && (x.width = x.height = c);
        const E = x.getContext("2d");
        E.clearRect(0, 0, c, c), E.drawImage(o, 0, 0), E.globalCompositeOperation = "destination-in", E.drawImage(N, 0, 0), ie && (E.globalCompositeOperation = "source-in", E.fillStyle = "#fff", E.fillRect(0, 0, c, c)), E.globalCompositeOperation = "source-over", s.globalAlpha = ie ? .65 : .22, s.drawImage(x, 0, 0), s.globalAlpha = 1
    }
    const Zt = (x, E) => {
        if (!q || !e) {
            x(s);
            return
        }
        const z = Is || (Is = document.createElement("canvas"));
        z.width !== c && (z.width = z.height = c);
        const B = z.getContext("2d");
        B.clearRect(0, 0, c, c), B.lineJoin = B.lineCap = "round", x(B), B.globalCompositeOperation = "destination-out", B.drawImage(N, 0, 0), B.globalCompositeOperation = "source-over", s.drawImage(z, 0, 0), B.clearRect(0, 0, c, c), x(B), B.globalCompositeOperation = "destination-in", B.drawImage(N, 0, 0), ie && (B.globalCompositeOperation = "source-in", B.fillStyle = "#fff", B.fillRect(0, 0, c, c)), B.globalCompositeOperation = "source-over", s.globalAlpha = E ?? (ie ? .4 : .22), s.drawImage(z, 0, 0), s.globalAlpha = 1
    };
    let Mt = null;
    if (L && L.every(isFinite) && (Mt = V(L)), St && $ && me) {
        const x = ut(oe),
            E = x.ch,
            z = B => {
                const D = me(B);
                return D.every(isFinite) ? V(D) : null
            };
        if (s.save(), s.lineJoin = s.lineCap = "round", St.i != null) {
            const B = E[St.i],
                D = 72,
                ot = C => {
                    const p = $.slice();
                    return p[St.i] = B.min + (B.max - B.min) * C, p
                },
                Y = `${oe}|${it.g3}|L${St.i}|${$.map((C,p)=>p===St.i?"":C).join(",")}`;
            if (!Yn || Yn.key !== Y) {
                const C = [];
                let p = null,
                    v = null;
                for (let b = 0; b <= D; b++) {
                    const A = b / D,
                        M = ot(A),
                        j = me(M);
                    if (!j.every(isFinite)) {
                        p = null, v = null;
                        continue
                    }
                    const I = _o(oe, x, it.g3, M);
                    if (p && p.in !== I && v) {
                        let et = v.f,
                            nt = A;
                        for (let rt = 0; rt < 5; rt++) {
                            const gt = (et + nt) / 2;
                            _o(oe, x, it.g3, ot(gt)) === v.in ? et = gt : nt = gt
                        }
                        const st = me(ot((et + nt) / 2));
                        st.every(isFinite) ? (p.pts.push(st), p = {
                            in: I,
                            pts: [st]
                        }, C.push(p)) : p = null
                    }(!p || p.in !== I) && (p = {
                        in: I,
                        pts: []
                    }, C.push(p)), p.pts.push(j), v = {
                        f: A,
                        in: I
                    }
                }
                Yn = {
                    key: Y,
                    runs: C
                }
            }
            Zt(C => {
                C.setLineDash([3 * r, 3.5 * r]), C.lineWidth = r, C.strokeStyle = X, C.beginPath();
                for (const p of Yn.runs) p.pts.forEach((v, b) => {
                    const A = V(v);
                    b ? C.lineTo(A.x, A.y) : C.moveTo(A.x, A.y)
                });
                C.stroke()
            }, .85);
            for (const C of Yn.runs) !C.in || C.pts.length < 2 || (s.beginPath(), C.pts.forEach((p, v) => {
                const b = V(p);
                v ? s.lineTo(b.x, b.y) : s.moveTo(b.x, b.y)
            }), s.strokeStyle = R, s.globalAlpha = .85, s.lineWidth = 3.2 * r, s.stroke(), s.strokeStyle = tt, s.globalAlpha = 1, s.lineWidth = 1.4 * r, s.stroke())
        } else {
            if (Ft && Ft.cut) {
                s.strokeStyle = R, s.lineWidth = 1.2 * r;
                for (const [B, D] of Ft.cut) {
                    const ot = V(B),
                        Y = V(D),
                        C = H((ot.z + Y.z) / 2 / (it.r || 1) * 1.2 + .5, 0, 1);
                    s.globalAlpha = .3 + C * .6, s.beginPath(), s.moveTo(ot.x, ot.y), s.lineTo(Y.x, Y.y), s.stroke()
                }
                s.globalAlpha = 1
            }
            if (!q && Ft && Ft.per) {
                s.beginPath();
                let B = !1;
                for (const D of Ft.per) {
                    if (!D) {
                        B = !1;
                        continue
                    }
                    const ot = V(D);
                    B ? s.lineTo(ot.x, ot.y) : (s.moveTo(ot.x, ot.y), B = !0)
                }
                B && Ft.per[0] && s.closePath(), s.strokeStyle = R, s.globalAlpha = .85, s.lineWidth = 3 * r, s.stroke(), s.strokeStyle = tt, s.globalAlpha = 1, s.lineWidth = 1.2 * r, s.stroke(), s.globalAlpha = 1
            }
        }
        s.restore()
    }
    if (Mt && O && (!St || St.i == null)) {
        s.save(), s.lineWidth = r, s.setLineDash([3 * r, 3.5 * r]);
        const x = ut(oe),
            E = `${oe}|${it.g3}|${$?$.join(","):""}`;
        (!Jn || Jn.key !== E) && (Jn = {
            key: E,
            lines: {}
        });
        const z = [],
            B = [],
            D = (Y, C) => {
                const p = Y.join(",") + "|" + C.join(","),
                    v = Jn.lines[p] || (Jn.lines[p] = Uc(Y, C, oe, x, it.g3));
                for (const b of v) {
                    const A = V(b.a),
                        M = V(b.b);
                    b.in ? (s.strokeStyle = R, s.globalAlpha = .8, s.beginPath(), s.moveTo(A.x, A.y), s.lineTo(M.x, M.y), s.stroke(), s.globalAlpha = 1) : B.push([A, M])
                }
            },
            ot = Y => {
                const C = V(Y);
                return D(L, Y), z.push(C), C
            };
        if (O.kind === "box")
            for (let Y = 0; Y < 3; Y++) {
                const C = L.slice();
                C[Y] = Q[Y], ot(C)
            } else ot([bt, L[1], L[2]]), D([bt, L[1], L[2]], [bt, 0, 0]);
        (B.length || z.length) && Zt(Y => {
            Y.setLineDash([3 * r, 3.5 * r]), Y.lineWidth = r, Y.strokeStyle = X, Y.beginPath();
            for (const [C, p] of B) Y.moveTo(C.x, C.y), Y.lineTo(p.x, p.y);
            Y.stroke(), Y.setLineDash([]), Y.fillStyle = X;
            for (const C of z) Y.beginPath(), Y.arc(C.x, C.y, 2 * r, 0, 7), Y.fill()
        }, .85), s.restore()
    }
    Fi()
}

function Fi() {
    if (!it || !ct() || !me) return;
    const t = G.querySelector("#pl3d"),
        e = t?.querySelector(".mesh3"),
        n = t?.querySelector(".marker3");
    if (!t || !e || !n || !e._scale3) return;
    n.width !== e.width && (n.width = e.width, n.height = e.height);
    const o = n.getContext("2d"),
        i = n.width;
    o.clearRect(0, 0, i, i);
    const a = At(oe);
    if (!a) return;
    const s = me(a);
    if (!s?.every(isFinite)) return;
    const c = Math.cos(at.a),
        r = Math.sin(at.a),
        d = Math.cos(at.b),
        f = Math.sin(at.b),
        l = s[0],
        h = s[1] ?? 0,
        S = s[2] ?? 0,
        $ = h * c + S * r,
        L = -h * r + S * c,
        w = i * e._scale3 / 2,
        T = i / 2 + $ * w,
        u = i / 2 - (l * d - L * f) * w,
        m = e._markerDp || 1,
        g = Kt();
    o.save(), o.translate(T, u), o.rotate(Math.PI / 4), o.fillStyle = Rt(g), o.strokeStyle = "#fff", o.lineWidth = .85 * m;
    const y = 4 * m;
    o.fillRect(-y, -y, 2 * y, 2 * y), o.strokeRect(-y, -y, 2 * y, 2 * y), o.restore()
}

function Xc() {
    const t = lt,
        e = ut(t),
        n = cn[t];
    Ie = Kn, ge = null;
    const o = ta(t),
        i = or(t),
        a = ar(t),
        s = x => (+x).toFixed(4),
        c = (n.neighbors || []).filter(x => x !== t && cn[x] && !(o || []).includes(x)),
        r = c.length && c.length <= 14,
        d = sr[t] || {},
        f = sa[t],
        l = "share of the visible gamut this space can encode \u2013 Monte-Carlo volume of the optimal-color solid in CIELAB; sRGB measures ~36% by the same yardstick",
        h = f ? `${Math.round(f[0]*100)}% of visible colors` : "",
        S = ti(t),
        $ = sc(t, d);
    let L = null;
    try {
        const x = Array.from({
                length: 145
            }, (B, D) => t === "lrgb" ? [D / 144, D / 144, D / 144] : W.lrgb[t](D / 144, D / 144, D / 144)),
            E = e.ch.filter(B => B.type !== "angle").map(B => {
                const D = x.map(v => v[B.i]);
                if (!D.every(isFinite)) return null;
                const ot = Math.min(...D),
                    Y = Math.max(...D),
                    C = D.every((v, b) => !b || v >= D[b - 1] - 1e-4),
                    p = D.every((v, b) => !b || v <= D[b - 1] + 1e-4);
                return (C || p) && Y - ot > .05 * Math.abs(B.max - B.min) ? {
                    c: B,
                    pts: D,
                    lo: ot,
                    hi: Y,
                    up: C
                } : null
            }).filter(Boolean),
            z = E.find(B => B.c === e.tone) || E.find(B => B.up) || E[0];
        z && (L = {
            pts: z.pts,
            lo: z.lo,
            hi: z.hi,
            ylab: e.ch.length > 1 && E.length === e.ch.length ? "code" : z.c.sym
        })
    } catch {}
    const w = !!L && L.ylab !== "code" && !/^(gamma|linear|chromaticity)$/.test(n.encoding || "") && (L.pts[26] - L.lo) / (L.hi - L.lo) > .3,
        T = e.ch.length === 3,
        u = (() => {
            try {
                return ya(W[t], {
                    xyz: W.xyz
                })
            } catch {
                return null
            }
        })(),
        m = T ? '<div class="vgrp"><div class="pl3d" id="pl3d" title="the gamut solid in this space \u2013 sRGB \xB7 P3 \xB7 Rec.2020 \xB7 human, per the gamut switch; the render-mode switch fills native 10/20 cells or safe/names/even palette regions here too; drag to rotate \u2013 hover a slider or plane to see its line or slice inside"><canvas class="grid3" width="320" height="320"></canvas><canvas class="mesh3" width="320" height="320"></canvas><canvas class="hud3" width="320" height="320"></canvas><canvas class="marker3" width="320" height="320"></canvas></div></div>' : "",
        g = t === "wavelength",
        y = !!W[t]?.xyz,
        k = i ? `

primaries, xy \u2013 computed from the shipped conversion${i.adapted?`, Bradford-adapted from the native ${i.ill} white to the D65 hub (the ICC colorant convention)`:""}:
R ${i.r.map(s).join(" ")}
G ${i.g.map(s).join(" ")}
B ${i.b.map(s).join(" ")}` : "",
        F = a ? `

${a.name}: ${a.par.map(([x,E])=>`${x} ${E}`).join(", ")} \u2013 constants from the defining specification, cross-checked against the shipped conversion on the neutral axis` : "",
        q = `<div class="dviz2">${aa(t)||g||y?`<div class="vgrp"><div class="gam2d" id="gam2d" title="gamut \u2013 this space's channel ranges on the CIE xy plane: vivid where it reaches real colours, ghost where the eye sees but this space doesn't, gray veil where its channel limits still encode beyond the visible \u2013 the box's shape, though no colour lives there.${k}"><canvas width="320" height="352"></canvas><span class="cx"></span></div>${f?`<span class="grch tnum" title="${l}">reaches ${h}</span>`:""}</div>`:""}${L?`<div class="vgrp"><div class="tcvw" title="transfer \u2013 the space's curve \u2013 scene-linear light across (0\u20131), ${t}'s ${w?"perceptual lightness":"code value"} up; the dashed diagonal is linear. ${w?"The bow above the diagonal is why equal steps in this space look even to the eye.":L.ylab==="code"?"RGB-model spaces map every channel through this same curve.":L.ylab+" is this space's tone channel."}${F}"><canvas class="tcv" id="tcv" width="320" height="176"></canvas></div><span class="grch tnum" id="tcap" title="the current color, met on the curve by its linear luminance \u2013 the diamond; the hollow notch is 18% gray (middle gray), a fixed landmark on the curve"></span></div>`:""}</div>`,
        N = `<h2 class="sec2" id="compare"><span class="term" title="the blend to the endpoint colour, stepped in this space \u2013 the row below repeats it through another space for comparison">interpolate to</span><button class="ipick" id="ipick" title="the colour this blend ends on" aria-label="pick the interpolation endpoint"><span class="dia" id="idia"></span></button>${e.angle?'<button type="button" class="hp" id="hp" title="hue arc direction" aria-label="toggle hue arc direction">\u21C4</button>':""}<input type="color" class="pinb" id="pinb" tabindex="-1" aria-label="interpolation endpoint color"></h2>
	 <div class="istack">
		<div class="irow" id="irow" title="blend from the current color, in ${t}"><span class="isp" id="isp0"></span></div>
		<button type="button" class="irow icmp" id="icmp" title="the same blend through another space \u2013 click to compare against oklch, oklab, lab, \u2026"><span class="isp" id="ispc"></span></button>
	 </div>`,
        V = x => {
            const E = e.ch[x];
            return `<div class="bar2" data-i="${x}"><div class="bg"></div><canvas class="bgc" width="512" height="1"></canvas>
		<span class="cnm" title="${$e(E)}">${E.sym}</span>
		<span class="sv lo tnum">${pe(E.min,E)}</span><span class="sv md tnum">${pe((E.min+E.max)/2,E)}</span><span class="sv hi tnum">${pe(E.max,E)}${dn(E)}</span>
		<input type="range" class="nrg" data-i="${x}" min="${E.min}" max="${E.max}" step="any" tabindex="-1" aria-label="${$e(E)} slider"></div>`
        },
        O = `<div class="bigch" id="bigch">${e.ch.map((x,E)=>`<label class="bch" data-i="${E}" title="${$e(x)} \xB7 ${x.sym}"><i class="bnm">${x.sym}</i><span class="nvw"><input class="nv" type="text" inputmode="decimal" spellcheck="false" autocomplete="off" aria-label="${$e(x)}"><i class="u">${dn(x)}</i><span class="stk"><button class="up" tabindex="-1">\u2303</button><button class="dn" tabindex="-1">\u2303</button></span></span></label>`).join("")}</div>`,
        P = Qr(t),
        tt = Wn().find(x => x.spaces.includes(t))?.name || "";
    G.innerHTML = `<div class="dh"><h1 id="dtitle">${tt?`<span class="dcat">${tt}</span>`:""}${he(t)}${va.has(t)?`<span class="tag htag" title="${Ze.historical}">historical</span>`:""}</h1></div>
	 <hr class="dhr">
	 <div class="chead">${O}</div>
	 <section class="dpick${T?"":" nod3"}" id="explore">
		<div class="dmain">
		<div class="pick" id="pick">${e.ch.map((x,E)=>V(E)).join("")}</div>
		${e.ch.length>1?`<div class="planes" id="planes">${P.map(([x,E])=>`<div class="pl" data-a="${x}" data-b="${E}" title="drag to pick \xB7 pinch or ctrl+wheel to zoom, wheel to pan, double-click to reset"><canvas width="216" height="216"></canvas><div class="cx"></div><span class="laby" title="${$e(e.ch[E])}">${e.ch[E].sym}</span><span class="labx" title="${$e(e.ch[x])}">${e.ch[x].sym}</span>${Ka(e,x,E)?'<button class="pmode" title="disc \u27F7 square"></button>':fo(t,e,x,E)?`<button class="pmode tri t${fo(t,e,x,E)}" title="triangle \u27F7 square"></button>`:""}</div>`).join("")}</div>`:""}
		</div>
		${m}
	 </section>
	 <section class="dhero" id="overview">
		${q}
		<div class="dmain"><div class="props props3">
			<div class="pcol"><!-- the instrument: its axes, its notation, its shape, its signal (reference white included), its derivation, its cost, its reach \u2013 the name closes the column -->
				<div><i>channels</i><div class="chlist">${e.ch.map(x=>`<span class="cn" title="${$e(x)} \xB7 ${x.sym}">${$e(x)}, <i class="csym">${x.sym}</i></span><span class="tnum rmn">${pe(x.min,x)}</span><span class="rsep">\u2026</span><span class="tnum rmx">${pe(x.max,x)}${dn(x)}</span>`).join("")}</div></div>
				${ms[t]?'<div><i>css</i><p class="cssv tnum" id="cssv" role="button" tabindex="0" title="this color, CSS-notated \u2013 click to copy"></p></div>':""}
				${ws(t)?`<div><i>geometry</i><p class="dpills"><span class="tag" title="${Ze[ws(t)]||""}">${ws(t)}</span></p></div>`:""}
				${n.referred||n.dynamic||S||n.illuminant?`<div><i>signal</i><p class="dpills">${[n.referred&&`<span class="tag" title="${Ze[n.referred]||""}">${n.referred}-referred</span>`,n.dynamic&&`<span class="tag" title="${Ze[n.dynamic.toUpperCase()]||""}">${n.dynamic.toUpperCase()}</span>`,S&&`<span class="tag" title="${Ze[S]||""}">${S}</span>`,n.illuminant&&`<span class="tag" title="${Ze[n.illuminant]||""}${i?`
white point XYZ ${i.w.map(s).join(" ")} \u2013 ${i.wSrc==="cie"?`CIE 15 tabulated for ${i.ill}, 2\xB0 observer`:"computed from the shipped conversion at Y = 1"}`:""}">${n.illuminant}</span>`].filter(Boolean).join("")}</p></div>`:""}
				${o&&o.length>1?`<div><i title="the conversion route down to rgb \u2013 each space is defined through the next">lineage</i><p class="fam">${o.map((x,E)=>E?`<a href="#${x}" title="${x}">${he(x)}</a>`:he(x)).join(" \u2192 ")}</p></div>`:""}
				${r?`<div><i title="directly convertible neighbors in the conversion graph, beyond the lineage">related</i><p class="fam">${c.map(x=>`<a href="#${x}" title="${x}">${he(x)}</a>`).join(", ")}</p></div>`:""}
				${n.loss?`<div><i>loss</i><p>${n.lossNote?`<span class="term" title="${n.lossNote}">${n.loss}</span>`:n.loss}</p></div>`:""}
				${f&&!is(t)?`<div><i>reach</i><p title="${l}">${h}</p></div>`:""}
				${d.nm?`<div><i>etymology</i><p>${d.nm}</p></div>`:""}
			</div>
			<div class="pcol"><!-- the record: when and who, then the citation cluster (test \xB7 reference \xB7 source), the exports closing the column -->
				${n.year||n.by?`<div><i>origin</i><p>${[n.year,n.by].filter(Boolean).join(", ")}</p></div>`:""}
				${n.refs||n.wiki?`<div><i>reference</i><p>${[...new Set([...n.refs||[],...n.wiki?[n.wiki]:[]])].map(x=>`<a href="${x}" target="_blank">${/wikipedia\.org/.test(x)?"wikipedia":x.replace(/^https?:\/\/(www\.)?/,"").split("/")[0]}</a>`).join(", ")}</p></div>`:""}
				${Ic.has(t)?`<div><i>test</i><p><a href="https://github.com/colorjs/color-space/blob/master/test/reference.js" target="_blank" title="this space's bidirectional colorjs.io differential test, at 1/255 tolerance">reference values</a></p></div>`:""}
				<div><i>source</i><p><a href="https://github.com/colorjs/color-space/blob/master/spaces/${t}.js" target="_blank" title="the implementation \u2013 spaces/${t}.js on GitHub">spaces/${t}.js</a></p></div>
				${u?`<div><i title="the ICC profile class this space exports as">icc</i><p>${{mntr:"mntr \xB7 matrix + TRC display",spac:"spac \xB7 CLUT, both directions",scnr:"scnr \xB7 CLUT, device \u2192 PCS"}[u]||u}</p></div>`:""}
				${ss.has(t)||u?'<div class="export dex" id="dex"></div>':""}
			</div>
	 </div></div>
	 </section>
	 <div class="dgrid2"><!-- the story, full measure \u2013 after the features and their plots -->
		<div><i class="plab">description</i>
		<div class="desc">${(n.description||"").replace(/(https?:\/\/[^\s)]+)/g,'<a href="$1" target="_blank">$1</a>').replace(/`([^`]+)`/g,"<code>$1</code>")}</div></div>
		<div class="pcol">
			<div><i>used for</i><p>${ei(n.use||nc(t))}</p></div>
			${$?`<div><i>caveat</i><p>${ei($)}</p></div>`:""}
		</div>
	 </div>
	 ${is(t)?`<h2 class="sec2" id="image"><span class="term" title="each panel keeps one channel and neutralises the rest \u2013 what that channel alone carries">image</span><button class="upbtn" id="imgadd" title="open an image of yours \u2013 or just drop one anywhere" aria-label="open an image"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V4M7.5 8.5 12 4l4.5 4.5M4.5 20h15"/></svg></button><input type="file" id="imgfile" accept="image/*" hidden></h2>
	 <div class="imgrow" id="imgrow" title="click the source panel for the next test image \xB7 drop your own image anywhere"></div>`:""}
	 ${N}
	 <h2 class="sec2" id="code"><span class="tabrow" id="cseg" role="group" aria-label="code backends"><button data-t="js" class="on" aria-pressed="true">${Pc}JS</button>${ha.includes(t)?`<button data-t="wasm" aria-pressed="false">${Fc}WASM</button>`:""}${is(t)?`<button data-t="gl" aria-pressed="false">${Bc}GL</button>`:""}<button data-t="meta" aria-pressed="false">${zc}JSON</button><button data-t="css" aria-pressed="false">${jc}CSS</button></span></h2>
	 <div class="snipwrap"><button class="cpyi" id="csnip" title="copy"><svg class="ic" viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="1.5"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg></button><pre class="snip" id="snip"></pre></div>
	 ${pi("mfoot",1)}`,ui(),Le.scrollTop=0;for(const x of G.querySelectorAll(".desc, .dgrid2 p"))for(const[E,z]of Object.entries(oc)){const B=new RegExp(`(?<![\\w-])${E.replace(/[.*+?^$\{\}()|[\]\\]/g,"\\$&")}(?![\\w-])`,"i"),D=document.createTreeWalker(x,NodeFilter.SHOW_TEXT);let ot;for(;ot=D.nextNode();){if(ot.parentNode.closest(".term,a"))continue;const Y=B.exec(ot.nodeValue);if(!Y)continue;ot.splitText(Y.index+Y[0].length);const C=ot.splitText(Y.index),p=document.createElement("span");p.className="term",p.title=z,p.tabIndex=0,p.textContent=C.nodeValue,C.replaceWith(p);break}}if(G.querySelectorAll(".tag[title]").forEach(x=>{x.matches("button")||(x.tabIndex=0)}),G.querySelectorAll(".bar2").forEach(x=>Kc(x,t)),!G._nrgWired){G._nrgWired=!0,G.addEventListener("input",E=>{const z=E.target;if(!z.classList?.contains("nrg"))return;const B=z.closest(".bar2");if(!B)return;const D=lt,ot=+B.dataset.i;if(U.s!==D){const C=At(D);if(!C)return;U={s:D,vals:C}}const Y=ut(D).ch[ot];Nt!==B&&(Sn(),Nt=B,B.classList.add("live")),U.vals[ot]=+z.value,B._dragF=H((+z.value-Y.min)/(Y.max-Y.min),0,1),jt()});const x=E=>{const z=E.closest(".bar2");if(!z||Nt!==z)return;const B=lt,D=+z.dataset.i,ot=ut(B).ch[D];z.classList.remove("live"),z._snapHint=z._dragF,qs(E,B,D),Nt=null;const Y=G.querySelector(`
    #bigch.bch[data - i = "${D}"].nv`),C=At(B)?.[D];Y&&isFinite(C)&&(Y.value=C.toFixed(Te(ot))),vt(!1),Qt(),Ro()};G.addEventListener("change",E=>{E.target.classList?.contains("nrg")&&x(E.target)}),G.addEventListener("pointercancel",E=>{E.target.classList?.contains("nrg")&&x(E.target)})}G.querySelectorAll("#bigch .bch").forEach(x=>{const E=G.querySelector(`.bar2[data - i = "${x.dataset.i}"] `);if(!E)return;const z=()=>E.classList.toggle("live",x.matches(":hover")||x.contains(document.activeElement));x.addEventListener("pointerenter",z),x.addEventListener("pointerleave",z),x.addEventListener("focusin",z),x.addEventListener("focusout",()=>setTimeout(z,0))}),G.querySelectorAll(".pl").forEach(x=>Yc(x)),G.querySelectorAll(".pmode").forEach(x=>{const E=x.closest(".pl"),z=+E.dataset.a,B=+E.dataset.b,D=x.classList.contains("tri"),ot=`
    $ {
        t
    }: $ {
        z
    }, $ {
        B
    }
    `,Y=()=>D?Ya(t,z,B):Ja(t,e,z,B),C=()=>x.classList.toggle("sq",Y());C(),x.onpointerdown=p=>p.stopPropagation(),x.onclick=p=>{if(p.stopPropagation(),D){xs[ot]=!Y();try{localStorage.csTriP=JSON.stringify(xs)}catch{}}else{bs[ot]=!Y();try{localStorage.csPolarP=JSON.stringify(bs)}catch{}}C(),vt(),Qt()}}),St=null,G.querySelectorAll(".bar2").forEach(x=>{x.addEventListener("pointerenter",()=>{St={i:+x.dataset.i},ue()}),x.addEventListener("pointerleave",()=>{St=null,ue()})}),G.querySelectorAll(".pl").forEach(x=>{x.addEventListener("pointerenter",()=>{const E={a:+x.dataset.a,b:+x.dataset.b};clearTimeout(Xn);const z=()=>{if(x.matches(":hover")){if(dt){Xn=setTimeout(z,_i);return}St=E,ue()}};Xn=setTimeout(z,_i)}),x.addEventListener("pointerleave",()=>{clearTimeout(Xn),Xn=0,St?.a===+x.dataset.a&&St?.b===+x.dataset.b&&(St=null,ue())})}),Ii(),qo(),Zn(),Jt=L,Bi();const R=G.querySelector("#imgrow");if(R){const x=()=>{Et&&($n=($n+1)%Et.length,We=Et[$n],Zn())};R.onclick=D=>{D.target.closest(".imgp")===R.firstElementChild&&x()},R.onkeydown=D=>{(D.key==="Enter"||D.key===" ")&&D.target===R.firstElementChild&&(D.preventDefault(),x())};const E=Je;R.ondragover=D=>D.preventDefault(),R.ondrop=D=>{D.preventDefault(),E(D.dataTransfer.files&&D.dataTransfer.files[0])};const z=G.querySelector("#imgfile"),B=G.querySelector("#imgadd");B&&(B.onclick=()=>z.click()),z&&(z.onchange=()=>{E(z.files&&z.files[0]),z.value=""})}const X=G.querySelector("#hp");X&&(X.onclick=()=>{Vs=Vs==="shorter"?"longer":"shorter",vt()});const J=G.querySelector("#pinb"),Q=G.querySelector("#ipick");J&&(J.oninput=x=>{As=gi(x.target.value),vt()}),Q&&J&&(Q.onclick=()=>J.click());const bt=()=>{const x=yi.filter(E=>E!==t);x.length&&(Eo=(Eo+1)%x.length,vt())},ie=G.querySelector("#icmp");ie&&(ie.onclick=bt);const Zt=G.querySelector("#csnip");Zt.onclick=()=>kr(G.querySelector("#snip").textContent),fn="js",G.querySelectorAll("#cseg button").forEach(x=>x.onclick=()=>{fn=x.dataset.t,G.querySelectorAll("#cseg button").forEach(E=>{const z=E===x;E.classList.toggle("on",z),E.setAttribute("aria-pressed",String(z))}),vt()});const Mt=G.querySelector("#dex");if(Mt){const x=(A,M,j)=>{const I=document.createElement("a");I.href=URL.createObjectURL(new Blob([A],{type:j})),I.download=M,I.click(),setTimeout(()=>URL.revokeObjectURL(I.href),4e3)},E=A=>ln.map(M=>{const j=M.spaces.filter(A);return j.length?` < optgroup label = "${M.name}" > $ {
        j.map(I => `<option value="${I}">${he(I)}</option>`).join("")
    } < /optgroup>`:""}).join(""),z=A=>A===0?"0":A.toExponential(1),B=u==="mntr"?`${t} as an .icc v2 matrix+TRC display profile \u2014 Photoshop, macOS/Windows
    colour management`:u==="spac"?`
    $ {
        t
    }
    as an.icc v2 CLUT colour - space profile \u2014 device\u2194Lab lattices both ways;
    lcms, ArgyllCMS, ImageMagick`:`
    $ {
        t
    }
    as an.icc v2 CLUT input profile \u2014 device\u2192Lab only: a lattice cannot carry this inverse;
    lcms, ArgyllCMS, ImageMagick`;Mt.innerHTML=(ss.has(t)?` < div class = "dexp" >
    <
    i title = "${t} \u2192 any space as a .cube conversion LUT \u2013 DaVinci Resolve, Premiere, Final Cut, OBS, ffmpeg${Hr.has(t)?";
    verified against the Academy 's official ACES vendor transform (docs/formula-verification.md)":""}">conversion LUT</i> <
        div class = "exrow" > < select id = "dlto"
    aria - label = "LUT target space"
    title = "target space \u2013 the .cube converts ${t} into this space" > < /select><select id="dlsz" aria-label="LUT size" title="lattice size \u2013 17\xB3 draft, 33\xB3 standard, 65\xB3 fine; larger is more accurate and a bigger file"><option value="17">17\xB3</option > < option value = "33"
    selected > 33\ xB3 < /option><option value="65">65\xB3</option > < /select><span class="ex1d" id="dl1d" style="display:none" title="same primaries \u2013 a per-channel transfer curve, so a 4096-point 1D LUT (no 3D lattice needed)">1D</span > < button class = "exdl"
    id = "dldl"
    type = "button" > \u2193.cube < /button><span class="exstat tnum" id="dlstat" aria-live="polite"></span > < /div></div > `:"")+(u?` < div class = "dexp" >
        <
        i title = "${B}" > icc profile < /i> <
        div class = "exrow" > < button class = "exdl"
    id = "didl"
    type = "button"
    title = "${B}" > \u2193.icc < /button><span class="exstat tnum" id="distat" aria-live="polite"></span > < /div></div > `:"");const D=Mt.querySelector("#dlto"),ot=Mt.querySelector("#dlsz"),Y=Mt.querySelector("#dl1d"),C=Mt.querySelector("#dldl"),p=Mt.querySelector("#dlstat");if(D){let A=33,M=0,j=!1;D.innerHTML=E(et=>Zo.has(et)&&et!==t),D.value=(et=>[...D.options].some(nt=>nt.value===et)?et:D.options[0]?.value)(cn[t]?.referred==="scene"&&t!=="rec709"?"rec709":t==="rgb"?"p3":"rgb");const I=()=>{j=!0;const et=D.value,nt=++M;p.textContent="measuring\u2026",C.disabled=!1,setTimeout(()=>{if(nt===M)try{const st=rs(W[t],W[et]),rt=pa(W[t],W[et],st?{}:{size:A}),gt=ma(rt,400),$t=gt.in.share>0&&gt.in.share<.999,Tt=$t?gt.in:gt,zt=(rt.dims===3?rt.size**3:rt.size)*21+430;ot.style.display=st?"none":"",Y.style.display=st?"":"none",p.textContent=zt>1e6?(zt/1e6).toFixed(1)+" MB":Math.round(zt/1e3)+" kB",p.title=`
    $ {
        st ? rt.size + "-pt 1D" : rt.size + "\xB3"
    }
    lattice vs the direct conversion, 400 off - lattice samples \u2014 median $ {
        z(Tt.median)
    }, max $ {
        z(Tt.max)
    }, fractions of full scale`}catch(st){C.disabled=!0,p.textContent=String(st&&st.message||"no finite LUT for this pair")}},0)};D.onchange=I,ot.onchange=()=>{A=+ot.value,I()},C.onclick=()=>{const et=D.value;try{const nt=rs(W[t],W[et]);x(ga(W[t],W[et],nt?{}:{size:A}),`
    $ {
        t
    } - to - $ {
        et
    }
    $ {
        nt ? "" : "-" + A
    }.cube`,"text/plain"),Xt("LUT saved")}catch{Xt("No LUT for this pair")}},Mt._lut=()=>{j||I()}}const v=Mt.querySelector("#didl"),b=Mt.querySelector("#distat");if(v){let A=!1;v.onclick=()=>{try{x(cs(W[t],{xyz:W.xyz}),`
    $ {
        t
    }.icc`,"application/vnd.iccprofile"),Xt("ICC saved")}catch{Xt("No profile for this space")}},Mt._icc=()=>{A||(A=!0,b.textContent="\u2026",setTimeout(()=>{try{const M=cs(W[t],{xyz:W.xyz});b.textContent=`
    $ {
        (M.length / 1024).toFixed(1)
    }
    kB`,b.title=`
    D50 PCS\ xB7 $ {
        {
            mntr: "v2 matrix+TRC display",
            spac: "v2 CLUT, device\u2194Lab both ways",
            scnr: "v2 CLUT, device\u2192Lab (one-way)"
        } [u] || ""
    }
    `}catch(M){v.disabled=!0,b.textContent=String(M&&M.message||"no profile")}},0))}}G._dexIO?.disconnect(),G._dexIO=new IntersectionObserver((A,M)=>{A.some(j=>j.isIntersecting)&&(M.disconnect(),Mt._lut?.(),Mt._icc?.())}),G._dexIO.observe(Mt)}G.querySelectorAll("#bigch .bch").forEach(x=>{const E=+x.dataset.i,z=e.ch[E],B=x.querySelector(".nv"),D=10**-Te(z),ot=Te(z),Y=()=>{if(U.s!==t){const b=At(t);if(!b)return!1;U={s:t,vals:b}}return!0};B.addEventListener("input",b=>{if(!b.isTrusted)return;const A=parseFloat(B.value);isFinite(A)&&(Sn(),Y(),U.vals[E]=H(A,z.min,z.max),jt())}),B.addEventListener("change",()=>{if(Z!=null){Rs();const b=At(t)?.[E];isFinite(b)&&(B.value=b.toFixed(Te(z))),vt()}Qt()}),B.addEventListener("focus",()=>requestAnimationFrame(()=>{try{const b=B.value.length;B.selectionStart===0&&B.selectionEnd===b&&b&&B.setSelectionRange(b,b)}catch{}}));const C=b=>{const A=parseFloat(B.value),M=isFinite(A)?A:At(t)?.[E]??z.min;if(Sn(),!Y())return;typeof Z=="number"?U.vals[E]=H(M+b*(z.max-z.min)/Z,z.min,z.max):Ct(Z)?U={s:"rgb",vals:Cc(t,U.vals,E,z,b,Ct(Z))}:U.vals[E]=H(M+b*D,z.min,z.max),typeof Z=="number"&&Rs();const j=At(t)?.[E];isFinite(j)&&(B.value=j.toFixed(Te(z))),vt(),Qt()};B.addEventListener("keydown",b=>{(b.key==="ArrowUp"||b.key==="ArrowDown")&&(b.preventDefault(),C(b.key==="ArrowUp"?1:-1))});const[p,v]=x.querySelectorAll(".stk button");p.onclick=b=>{b.stopPropagation(),C(1)},v.onclick=b=>{b.stopPropagation(),C(-1)}})}function Kc(t,e){const n=()=>document.querySelector(`
    #bigch.bch[data - i = "${t.dataset.i}"] `);t.addEventListener("pointerenter",()=>n()?.classList.add("on")),t.addEventListener("pointerleave",()=>n()?.classList.remove("on")),t.addEventListener("pointerdown",o=>{if(o.target.closest(".nvw")||o.target.classList?.contains("nrg"))return;const i=ut(e),a=+t.dataset.i,s=i.ch[a];let c=!1;const r=o.clientX,d=()=>{if(U.s!==e){const S=At(e);if(!S)return!1;U={s:e,vals:S}}return!0},f=S=>{const $=t.getBoundingClientRect();let L=H((S.clientX-$.left)/$.width,0,1);Math.abs(L-.5)*$.width<1&&(L=.5),U.vals[a]=s.min+(s.max-s.min)*L,t._dragF=L,jt()};if(!d())return;Sn(),t.setPointerCapture(o.pointerId),Nt=t,f(o);const l=S=>{!c&&Math.abs(S.clientX-r)>3&&(c=!0,t.style.cursor="none",n()?.classList.add("on"),t.classList.add("live")),f(S)},h=()=>{t.onpointermove=null,t.onpointerup=null,t.onpointercancel=null,t.style.cursor="",n()?.classList.remove("on"),t.classList.remove("live"),t._snapHint=t._dragF,qs(t.querySelector(".nrg"),e,a),Nt=null;const S=G.querySelector(`
    #bigch.bch[data - i = "${a}"].nv`),$=At(e)?.[a];S&&isFinite($)&&(S.value=$.toFixed(Te(s))),vt(!1),Qt(),Ro()};t.onpointermove=l,t.onpointerup=h,t.onpointercancel=h})}const Ro=()=>{ct()&&es()};let ye=null;function Yc(t){t.querySelector("canvas").getContext("2d",{willReadFrequently:!0});const e=o=>{const i=ut(lt),a=+t.dataset.a,s=+t.dataset.b;if(U.s!==lt){const l=At(lt);if(!l)return;U={s:lt,vals:l}}const c=t.getBoundingClientRect(),r=t._vw;let d,f;if(t._polar){const l=H((o.clientX-c.left)/c.width,0,1)*2-1,h=H(1-(o.clientY-c.top)/c.height,0,1)*2-1;d=(-Math.atan2(h,l)/(2*Math.PI)%1+1)%1,f=Math.min(1,Math.hypot(l,h)),f*c.width/2<3&&(f=0)}else if(t._tri){const l=t.querySelector("canvas").getBoundingClientRect(),h=H(1-(o.clientY-l.top)/l.height,0,1),S=H((o.clientX-l.left)/l.width,0,1);if(t._tri===3){let $=H(h-.5*S,0,1),L=H(1-h-.5*S,0,1);const w=$+L;w>1&&($/=w,L/=w),d=$,f=L}else{const $=t._tri===1?h:1-Math.abs(2*h-1),L=.5-.5*$;d=$<=0?0:H((S-L)/$,0,1),f=h}}else{d=r.x0+(r.x1-r.x0)*H((o.clientX-c.left)/c.width,0,1),f=r.y0+(r.y1-r.y0)*H(1-(o.clientY-c.top)/c.height,0,1);const l=vs(i,a,s);l&1&&(d=1-d),l&2&&(f=1-f),Math.abs(d-.5)*c.width/(r.x1-r.x0)<3&&(d=.5),Math.abs(f-.5)*c.height/(r.y1-r.y0)<3&&(f=.5)}U.vals[a]=i.ch[a].min+(i.ch[a].max-i.ch[a].min)*d,U.vals[s]=i.ch[s].min+(i.ch[s].max-i.ch[s].min)*f,t._snapSeed={x:H((o.clientX-c.left)/c.width,0,1),y:H((o.clientY-c.top)/c.height,0,1)},ye=t,jt()};t._vw={x0:0,x1:1,y0:0,y1:1},t.addEventListener("pointerdown",o=>{Sn(),t.setPointerCapture(o.pointerId),t.style.cursor="none",t.classList.add("live"),e(o),t.onpointermove=e});const n=()=>{t.onpointermove=null,t.style.cursor="",t.classList.remove("live"),ye=null,Ao(lt,+t.dataset.a,+t.dataset.b),t.classList.add("parking"),setTimeout(()=>t.classList.remove("parking"),220),vt(!1),Qt(),Ro()};t.addEventListener("pointerup",n),t.addEventListener("pointercancel",n),t.addEventListener("wheel",o=>{if(t._polar||t._tri){o.ctrlKey&&o.preventDefault();return}const i=t._vw,a=i.x1-i.x0<.999||i.y1-i.y0<.999;if(!(!o.ctrlKey&&!a)){if(o.preventDefault(),o.ctrlKey){const s=t.getBoundingClientRect(),c=H((o.clientX-s.left)/s.width,0,1),r=H(1-(o.clientY-s.top)/s.height,0,1),d=Math.exp(o.deltaY*.0024),f=(l,h,S)=>{const $=l+(h-l)*S;let L=H((h-l)*d,.02,1),w=$-L*S;return w<0&&(w=0),w+L>1&&(w=1-L),[w,w+L]};[i.x0,i.x1]=f(i.x0,i.x1,c),[i.y0,i.y1]=f(i.y0,i.y1,r)}else{const s=i.x1-i.x0,c=i.y1-i.y0;let r=H(i.x0+o.deltaX/600*s,0,1-s),d=H(i.y0-o.deltaY/600*c,0,1-c);i.x0=r,i.x1=r+s,i.y0=d,i.y1=d+c}Ae=0,jt()}},{passive:!1}),t.addEventListener("dblclick",()=>{t._vw={x0:0,x1:1,y0:0,y1:1},Ae=0,jt()})}function qo(){const t=G.querySelector("#gam2d");if(!t)return;if(lt==="wavelength"){Jc(t);return}if(!aa(lt)||ua(lt)==="no"){Qc(t);return}if(ua(lt)!=="ready")return;const e=t.querySelector("canvas"),n=Math.round((e.clientWidth||320)*(devicePixelRatio||1));n&&e.width!==n&&(e.width=n,e.height=Math.round(n*352/320)),dr(e,lt)&&Fo(e),Bs()}function Jc(t){const e=t.querySelector("canvas"),n=Math.round((e.clientWidth||320)*(devicePixelRatio||1));n&&e.width!==n&&(e.width=n,e.height=Math.round(n*352/320));const o=e.getContext("2d"),i=e.width,a=e.height;o.clearRect(0,0,i,a);const s=d=>(d+.107)/.857*i,c=d=>(1-(d+.055)/.955)*a,r=[];for(let d=0;d<=160;d++){const f=380+320*d/160;let l,h,S;try{[l,h,S]=W.wavelength.xyz(f)}catch{continue}const $=l+h+S;if(!$)continue;let L;try{L=W.wavelength.rgb(f).map(T=>Math.max(0,T))}catch{L=[128,128,128]}const w=Math.max(...L);w>1e-6&&(L=L.map(T=>T*255/w)),r.push({x:s(l/$),y:c(h/$),c:L.map(T=>Math.max(0,Math.min(255,Math.round(T))))})}o.lineWidth=Math.max(2,i/110),o.lineCap="round";for(let d=1;d<r.length;d++){const f=r[d-1],l=r[d];o.strokeStyle=`
    rgb($ {
            l.c[0]
        }
        $ {
            l.c[1]
        }
        $ {
            l.c[2]
        })`,o.beginPath(),o.moveTo(f.x,f.y),o.lineTo(l.x,l.y),o.stroke()}if(r.length>1){const d=r[r.length-1],f=r[0];o.save(),o.setLineDash([i/64,i/64]),o.lineWidth=Math.max(1,i/220),o.strokeStyle="oklch(0.5 0.01 70/.5)",o.beginPath(),o.moveTo(d.x,d.y),o.lineTo(f.x,f.y),o.stroke(),o.restore()}Fo(e),Bs()}const Io=new Map,Po=new Set;function Qc(t){const e=t.querySelector("canvas"),n=lt,o=Math.round((e.clientWidth||320)*(devicePixelRatio||1));o&&e.width!==o&&(e.width=o,e.height=Math.round(o*352/320));const i=e.getContext("2d"),a=e.width,s=e.height;i.clearRect(0,0,a,s);const c=Io.get(n);if(!c)Zc(n);else{const r=l=>(l+.107)/.857*a,d=l=>(1-(l+.055)/.955)*s,f=Math.max(2,a/130);i.globalAlpha=.55;for(let l=0;l<c.length;l+=5)i.fillStyle=`
    rgb($ {
            c[l + 2]
        }
        $ {
            c[l + 3]
        }
        $ {
            c[l + 4]
        })`,i.fillRect(r(c[l])-f/2,d(c[l+1])-f/2,f,f);i.globalAlpha=1}Fo(e),Bs()}function Zc(t){if(Po.has(t)||Io.has(t)||!W[t]?.xyz)return;Po.add(t);const e=ut(t),n=e.ch.length,o=n<=1?96:n===2?48:n===3?15:8,i=o**n,a={i:0,out:[]},s=()=>{const c=performance.now();for(;a.i<i;a.i++){if(!(a.i&31)&&performance.now()-c>8){je(s,{timeout:300});return}let r=a.i;const d=e.ch.map(S=>{const $=r%o;return r=r/o|0,S.min+(S.max-S.min)*($+.5)/o});let f;try{f=W[t].xyz(...d)}catch{continue}if(!f.every(isFinite))continue;const l=f[0]+f[1]+f[2];if(!(l>0))continue;let h;try{h=Ut(t,d)}catch{h=[128,128,128]}a.out.push(f[0]/l,f[1]/l,...h.map(S=>Math.max(0,Math.min(255,Math.round(S)))))}Io.set(t,a.out),Po.delete(t),ct()&&lt===t&&qo()};je(s,{timeout:300})}function Fo(t){const e=t.getContext("2d"),n=t.width,o=t.height,i=n/320,a=n/(t.clientWidth||320),s=r=>(r+.107)/.857*n,c=r=>(1-(r+.055)/.955)*o;e.save(),e.globalCompositeOperation="destination-over",e.lineWidth=a,e.strokeStyle="oklch(0.5 0.01 70/.15)";for(let r=0;r<=.7001;r+=.1)e.beginPath(),e.moveTo(s(r),c(0)),e.lineTo(s(r),0),e.stroke();for(let r=0;r<=.9001;r+=.1)e.beginPath(),e.moveTo(s(0),c(r)),e.lineTo(n,c(r)),e.stroke();e.strokeStyle="oklch(0.5 0.01 70/.34)",e.strokeRect(s(0)+a/2,a/2,n-s(0)-a,c(0)-a),e.font=`
    600 $ {
        16 * i
    }
    px Inter, sans - serif`,e.fillStyle="oklch(0.5 0.01 70/.8)",e.textAlign="center";for(let r=.2;r<=.601;r+=.2)e.fillText(r.toFixed(1),s(r),c(0)+16*i);e.textAlign="right";for(let r=.2;r<=.801;r+=.2)e.fillText(r.toFixed(1),s(0)-4*i,c(r)+5*i);e.font=`
    italic 600 $ {
        16 * i
    }
    px Inter, sans - serif`,e.textAlign="right",e.fillText("y",s(0)-5*i,16*i),e.textAlign="left",e.fillText("x",n-11*i,c(0)+16*i),e.restore()}let an=null;function tl(t){if(!an){an=new Float32Array(1024);const{pos:a}=Ns(96);for(let s=0;s<a.length;s+=3){const c=a[s]+a[s+1]+a[s+2];if(c<=0)continue;const r=H(Math.floor(a[s]/c*32),0,31),f=H(Math.floor(a[s+1]/c*32),0,31)*32+r;a[s+1]>an[f]&&(an[f]=a[s+1])}for(let s=380;s<=700;s++)try{const c=W.wavelength.xyz(s),r=c[0]+c[1]+c[2];if(!(r>0))continue;const d=H(Math.floor(c[0]/r*32),0,31),l=H(Math.floor(c[1]/r*32),0,31)*32+d;c[1]>an[l]&&(an[l]=c[1])}catch{}}const e=t[0]+t[1]+t[2];if(!(e>0)||t[1]<0)return!0;const n=H(Math.floor(t[0]/e*32),0,31),o=H(Math.floor(t[1]/e*32),0,31);let i=0;for(let a=-1;a<=1;a++)for(let s=-1;s<=1;s++){const c=n+s,r=o+a;c>=0&&c<32&&r>=0&&r<32&&(i=Math.max(i,an[r*32+c]))}return i<=0||t[1]>i*1.03+.5}function Bi(){const t=G.querySelector("#tcv");if(!t||!Jt)return;const e=(t.clientWidth||320)*(devicePixelRatio||1)/320;e&&Math.abs(t.width-320*e)>1&&(t.width=Math.round(320*e),t.height=Math.round(176*e));const n=t.getContext("2d"),o=320,i=176,a=40,s=21,c=1;n.setTransform(t.width/320,0,0,t.width/320,0,0);const r=(devicePixelRatio||1)/(t.width/320),d=getComputedStyle(document.documentElement).getPropertyValue("--ink").trim()||"#1b1408",f=k=>a+k*(o-a-1),l=k=>i-s-(k-Jt.lo)/(Jt.hi-Jt.lo)*(i-s-c),h=Jt.pts.length-1,S=k=>{const F=H(k,0,1)*h,q=Math.floor(F);return Jt.pts[q]+(Jt.pts[Math.min(q+1,h)]-Jt.pts[q])*(F-q)};n.clearRect(0,0,o,i),n.lineWidth=r,n.strokeStyle="oklch(0.5 0.01 70/.15)";for(const k of[.25,.5,.75])n.beginPath(),n.moveTo(f(k),c),n.lineTo(f(k),i-s),n.stroke(),n.beginPath(),n.moveTo(a,c+k*(i-s-c)),n.lineTo(o,c+k*(i-s-c)),n.stroke();n.strokeStyle="oklch(0.5 0.01 70/.34)",n.strokeRect(a+r/2,c+r/2,o-a-r,i-s-c-r),n.setLineDash([4,4]),n.strokeStyle="oklch(0.5 0.01 70/.3)",n.beginPath(),n.moveTo(a,i-s),n.lineTo(o-1,c),n.stroke(),n.setLineDash([]),n.strokeStyle=d,n.lineWidth=2,n.beginPath(),Jt.pts.forEach((k,F)=>{const q=f(F/h),N=l(k);F?n.lineTo(q,N):n.moveTo(q,N)}),n.stroke(),n.beginPath(),n.arc(f(.18),l(S(.18)),2.6,0,7),n.strokeStyle=d,n.lineWidth=1.1,n.stroke();const $=k=>String(Math.abs(k)<(Jt.hi-Jt.lo)*1e-6?0:+k.toPrecision(3));n.font="600 15px Inter,sans-serif",n.fillStyle="oklch(0.5 0.01 70/.9)",n.textAlign="left",n.fillText($(Jt.hi),a+4,c+16),n.fillText($(Jt.lo),a+4,i-s-6),n.fillStyle="oklch(0.5 0.01 70/.75)",n.textAlign="right",n.fillText("light",o-3,i-3),n.fillText(Jt.ylab||"code",a-6,c+16);const L=Kt(),w=W.rgb.lrgb(...L),T=.2126*w[0]+.7152*w[1]+.0722*w[2],u=S(T),m=H(f(T),a+5,o-6),g=H(l(u),c+6,i-s-5);n.save(),n.setLineDash([3,3]),n.lineWidth=1,n.strokeStyle="oklch(0.5 0.01 70/.55)",n.beginPath(),n.moveTo(m,g),n.lineTo(m,i-s),n.stroke(),n.beginPath(),n.moveTo(m,g),n.lineTo(a,g),n.stroke(),n.restore(),n.save(),n.translate(m,g),n.rotate(Math.PI/4),n.fillStyle=Rt(L),n.strokeStyle=xe(L)==="#fff"?"#fff":"#1b1408",n.lineWidth=1,n.fillRect(-4,-4,8,8),n.strokeRect(-4,-4,8,8),n.restore();const y=G.querySelector("#tcap");y&&(y.textContent=`
    linear $ {
        Math.round(T * 100)
    } % \u2192 encoded $ {
        +u.toPrecision(3)
    }
    `)}function Bs(t=!1){const e=G.querySelector("#gam2d");if(!e)return;const n=e.querySelector(".cx"),o=Kt();let i=null;try{i=U.s==="xyz"?U.vals:W[U.s].xyz(...U.vals)}catch{}if(!i||!i.every(isFinite)||Math.abs(i[0]+i[1]+i[2])<1e-9)try{i=W.rgb.xyz(...o)}catch{return}try{const a=i[0]+i[1]+i[2]||1,[s,c]=ur(i[0]/a,i[1]/a);if(n.style.left=H(s,0,1)*100+"%",n.style.top=H(c,0,1)*100+"%",!t){let f="";if(ut(U.s).ch.length>1&&(f=tl(i)?"not a visible color \u2013 brighter than the MacAdam limit at this chromaticity":"",!f&&qi(U.s)))try{(U.s==="rgb"?U.vals:W[U.s].rgb(...U.vals)).every(h=>isFinite(h)&&h>-2.5&&h<258)||(f="no such color \u2013 these coordinates decode outside sRGB, which this space is defined on")}catch{}n.classList.toggle("ghost",!!f),n.title=f}const r=Ct(Z),d=r?Yt(r(o)):o;n.style.background=n.classList.contains("ghost")?"transparent":Rt(d),n.style.borderColor=xe(d)}catch{}}let We=null,$n=0,Et=null,Qn=null;function el(){const t=document.createElement("canvas");t.width=640,t.height=480;const e=t.getContext("2d"),n=(a,s,c,r,d)=>{e.fillStyle=`
    rgb($ {
            a[0]
        }
        $ {
            a[1]
        }
        $ {
            a[2]
        })`,e.fillRect(s,c,r,d)};[[255,255,255],[255,255,0],[0,255,255],[0,255,0],[255,0,255],[255,0,0],[0,0,255],[0,0,0]].forEach((a,s)=>n(a,s*80,0,80,144));for(let a=0;a<640;a++){const s=a/639,c=Math.round(s*255),r=Math.round(255*(s<=.0031308?12.92*s:1.055*s**(1/2.4)-.055));n([c,c,c],a,144,1,72),n([r,r,r],a,216,1,72)}for(let a=0;a<640;a++)n(W.hsl.rgb(a/640*360,100,50),a,288,1,112);return[0,1,2,4,8,16,32,64,96,128,160,192,224,247,254,255].forEach((a,s)=>n([a,a,a],s*40,400,40,80)),t}function nl(){const t=document.createElement("canvas");t.width=640,t.height=480;const e=t.getContext("2d"),n=[[224,58,52],[24,148,168],[232,208,42],[76,54,180]],o=[128,128,128];return n.forEach((i,a)=>{const s=a%2*320,c=Math.floor(a/2)*240;e.fillStyle=`
    rgb($ {
        i.join(" ")
    })`,e.fillRect(s,c,320,240),e.fillStyle=`
    rgb($ {
        o.join(" ")
    })`,e.fillRect(s+104,c+72,112,96)}),t}function sl(){const t=document.createElement("canvas");t.width=640,t.height=480;const e=t.getContext("2d"),n=(s,c,r,d,f)=>{e.fillStyle=`
    rgb($ {
        s.join(" ")
    })`,e.fillRect(c,r,d,f)};return[[180,180,180],[180,180,16],[16,180,180],[16,180,16],[180,16,180],[180,16,16],[16,16,180]].forEach((s,c)=>n(s,Math.floor(c*640/7),0,Math.ceil((c+1)*640/7)-Math.floor(c*640/7),224)),[[16,16,180],[16,16,16],[180,16,180],[16,16,16],[16,180,180],[16,16,16],[180,180,180]].forEach((s,c)=>n(s,Math.floor(c*640/7),224,Math.ceil((c+1)*640/7)-Math.floor(c*640/7),80)),n([16,16,64],0,304,160,80),n([235,235,235],160,304,160,80),n([64,16,64],320,304,160,80),n([16,16,16],480,304,160,80),[[7,520],[16,560],[26,600]].forEach(([s,c])=>n([s,s,s],c,320,40,48)),[32,16,8,4,2,1].forEach((s,c)=>{const r=Math.floor(c*640/6),d=Math.floor((c+1)*640/6);for(let f=r;f<d;f++)n(Math.floor((f-r)/s)&1?[180,180,16]:[16,16,180],f,384,1,48),n(Math.floor((f-r)/s)&1?[16,180,180]:[180,16,16],f,432,1,48)}),t}const ji=t=>({chart:el,contrast:nl,video:sl})[t]();function ol(t){if(Et){t();return}Promise.all(us.map(([e])=>fs.has(e)?Promise.resolve(ji(e)):new Promise(n=>{const o=new Image;o.src=e,o.onload=()=>n(o),o.onerror=()=>n(null)}))).then(e=>{Et=e.filter(Boolean),Qn?(Et.push(Qn),Et._user=Et.length-1,We=Qn,$n=Et._user):We=Et[0],t()})}function Zn(){const t=G.querySelector("#imgrow");if(!t)return;const e=lt;hr(e)==="ready"&&ol(()=>{if(lt!==e||!ct())return;const n=ut(e),o=n.ch.length;if(t._n!==o+1){t.innerHTML="";for(let l=-1;l<o;l++){const h=document.createElement("div");h.className="imgp",l<0&&(h.tabIndex=0,h.setAttribute("role","button"),h.setAttribute("aria-label","show the next test image"));const S=document.createElement("canvas"),$=document.createElement("span");$.className="implb",S.getContext("2d",{willReadFrequently:!0}),$.textContent=l<0?"source":$e(n.ch[l]).toLowerCase(),h.append(S,$),t.append(h)}t._n=o+1}const i=Math.min(640,Math.round(300*(devicePixelRatio||1))),a=Math.round(i*We.height/We.width);let s;try{s=Vt(e,[128,128,128])}catch{s=n.ch.map(l=>(l.min+l.max)/2)}const c=[...t.children];t.classList.add("busy");let r=0;const d=()=>{if(lt!==e||!ct()||!t.isConnected){t.classList.remove("busy");return}f(c[r],r),++r<c.length?requestAnimationFrame(d):t.classList.remove("busy")},f=(l,h)=>{const S=h-1,$=l.querySelector("canvas");($.width!==i||$.height!==a)&&($.width=i,$.height=a);const L=s.slice();if(n.angle&&S===n.angle.i){const w=n.mags[0];w&&(L[w.i]=w.min+(w.max-w.min)*.55);try{const T=L.slice();T[n.angle.i]=180;const u=Ut(e,T);if(Math.max(...u)-Math.min(...u)<24){const m=Vt(e,[228,26,26]);n.ch.forEach((g,y)=>{y!==n.angle.i&&isFinite(m[y])&&(L[y]=m[y])})}}catch{}}fr($,e,We,S,L);try{const w=$.getContext("2d").getImageData(0,0,Math.max(1,i>>3),Math.max(1,a>>3)).data;let T=0,u=0,m=0,g=0;for(let y=0;y<w.length;y+=4)T+=w[y],u+=w[y+1],m+=w[y+2],g++;l.querySelector(".implb").style.color=g?xe([T/g,u/g,m/g]):"#fff"}catch{}};d()})}const al=t=>{const e=performance.now();if(t._fd!=null&&(dt||(t._fdT??0)+400>e))return t._fd;t._fdT=e;try{const n=t.querySelector("canvas");if(!n?.width)return t._fd??=!0;const o=n.getContext("2d",{willReadFrequently:!0}).getImageData(0,0,n.width,n.height).data;let i=0,a=0;for(let s=0;s<o.length;s+=64)o[s+3]<128||(i+=.2126*o[s]+.7152*o[s+1]+.0722*o[s+2],a++);return t._fd=!a||i/a>153}catch{return t._fd??=!0}};function il(t,e,n,o,i,a,s){const c=Se.get(e);if(!c)return null;const r=t._vw||{x0:0,x1:1,y0:0,y1:1},d=vs(i,n,o),f=t._polar,l=t._tri,h=al(t),S=e+"|"+n+","+o+"|"+(f?"p":l?"t"+l:"r")+"|"+r.x0+","+r.x1+","+r.y0+","+r.y1+"|"+a+"x"+s+"|"+Qe+"|"+h;if(t._dk===S)return t._dc;t._dk=S,t._dc=null;const{v:$,dim:L,n:w}=c,T=i.ch[n],u=i.ch[o],m=ps(),g=Object.assign(document.createElement("canvas"),{width:a,height:s}),y=g.getContext("2d");y.fillStyle=h?"#16161a":"#fff",y.globalAlpha=.2;const k=Math.max(2,a/190),F=k/2;let q=0;for(let N=0;N<w;N++){if(m&&!m[N])continue;let V=($[N*L+n]-T.min)/(T.max-T.min),O=($[N*L+o]-u.min)/(u.max-u.min),P,tt;if(f){if(!(V>=0&&O>=0&&V<=1))continue;const R=-V*6.283185307179586,X=Math.min(1,O);P=(X*Math.cos(R)+1)/2,tt=1-(X*Math.sin(R)+1)/2}else if(l===3){const R=1-V-O;if(!(R>=0&&R<=1))continue;P=R,tt=1-(V+.5*R)}else if(l){const R=O;if(!(R>=0&&R<=1))continue;const X=l===1?R:1-Math.abs(2*R-1);if(X<=0)continue;P=.5-.5*X+V*X,tt=1-R}else d&1&&(V=1-V),d&2&&(O=1-O),P=(V-r.x0)/(r.x1-r.x0),tt=1-(O-r.y0)/(r.y1-r.y0);P>=0&&P<=1&&tt>=0&&tt<=1&&(y.fillRect(P*a-F,tt*s-F,k,k),q++)}return y.globalAlpha=1,q?(t._dc=g,g):null}function rl(t,e,n,o,i,a,s){const c=il(t,e,n,o,i,a,s);let r=t._density;if(!c){r&&(r.style.display="none");return}if(r||(r=t._density=document.createElement("canvas"),r.className="density",r.setAttribute("aria-hidden","true"),t.querySelector("canvas").after(r)),(r.width!==a||r.height!==s)&&(r.width=a,r.height=s,r._dk=""),r._dk!==t._dk){const d=r.getContext("2d");d.clearRect(0,0,a,s),d.drawImage(c,0,0),r._dk=t._dk}r.style.display=""}const zi={};let Ae=0,Di=0,cl=0,Bo=!1,Oi=0;function Qt(){const t=++Oi;Ae=1/0,setTimeout(()=>je(()=>{if(t===Oi){if(!ct()||Ue(lt)){Ae=0;return}if(dt){Qt();return}Ae=0,fe(!1)}}),80)}function ll(t,e){const n=t.querySelector("canvas"),o=n.width,i=n.height;if(!o||!i)return;let a;try{a=n.getContext("2d",{willReadFrequently:!0}).getImageData(0,0,o,i).data}catch{return}const s=t.getBoundingClientRect(),c=n.getBoundingClientRect(),r=t._snapSeed,d=r?(s.left+r.x*s.width-c.left)/c.width*o:(t.querySelector(".cx").getBoundingClientRect().left+4-c.left)/c.width*o,f=r?(s.top+r.y*s.height-c.top)/c.height*i:(t.querySelector(".cx").getBoundingClientRect().top+4-c.top)/c.height*i,l=R=>{const X=R*4;return a[X+3]>32&&Math.abs(a[X]-e[0])<=1&&Math.abs(a[X+1]-e[1])<=1&&Math.abs(a[X+2]-e[2])<=1};let h=-1,S=1/0;for(let R=0;R<o*i;R++)if(l(R)){const X=R%o,J=R/o|0,Q=(X-d)**2+(J-f)**2;Q<S&&(S=Q,h=R)}if(h<0){t._snap=null,t._snapSeed=null;return}const $=new Uint8Array(o*i),L=new Int32Array(o*i),w=[];let T=0,u=0,m=0;for(L[T++]=h,$[h]=1;T;){const R=L[--T],X=R%o,J=R/o|0;w.push(R),u+=X,m+=J;for(const Q of[R-1,R+1,R-o,R+o])Q>=0&&Q<o*i&&!$[Q]&&l(Q)&&(Q%o===X||(Q/o|0)===J)&&($[Q]=1,L[T++]=Q)}const g=1<<28,y=new Int32Array(o*i);y.fill(g);for(const R of w){const X=R%o,J=R/o|0;(X===0||X===o-1||J===0||J===i-1||!$[R-1]||!$[R+1]||!$[R-o]||!$[R+o])&&(y[R]=0)}for(let R=0;R<i;R++)for(let X=0;X<o;X++){const J=R*o+X;if(!$[J]||y[J]===0)continue;let Q=y[J];X&&(Q=Math.min(Q,y[J-1]+3)),R&&(Q=Math.min(Q,y[J-o]+3)),X&&R&&(Q=Math.min(Q,y[J-o-1]+4)),X+1<o&&R&&(Q=Math.min(Q,y[J-o+1]+4)),y[J]=Q}for(let R=i-1;R>=0;R--)for(let X=o-1;X>=0;X--){const J=R*o+X;if(!$[J]||y[J]===0)continue;let Q=y[J];X+1<o&&(Q=Math.min(Q,y[J+1]+3)),R+1<i&&(Q=Math.min(Q,y[J+o]+3)),X&&R+1<i&&(Q=Math.min(Q,y[J+o-1]+4)),X+1<o&&R+1<i&&(Q=Math.min(Q,y[J+o+1]+4)),y[J]=Q}const k=u/w.length,F=m/w.length;let q=w[0],N=-1,V=1/0;for(const R of w){const X=(R%o-k)**2+((R/o|0)-F)**2;(y[R]>N||y[R]===N&&X<V)&&(N=y[R],V=X,q=R)}const O=c.left+(q%o+.5)/o*c.width,P=c.top+((q/o|0)+.5)/i*c.height;t._snap={left:(O-s.left)/s.width*100,top:(P-s.top)/s.height*100,key:e.join(",")},t._snapSeed=null;const tt=t.querySelector(".cx");tt.style.display="",tt.style.left=t._snap.left+"%",tt.style.top=t._snap.top+"%"}function fe(t,e=!1){if(!ct()||Ue(lt))return;const n=lt,o=ut(n),i=At(n),a=Z??0,s=[...G.querySelectorAll(".pl")],c=a!==null&&is(n)?oa(n):null,r=c==="ready";if(c==="pending"){Bo=!1,Ae=performance.now()+200,!t&&!Nt&&!ye&&ue();return}if(e&&!r&&performance.now()<Di)return;const f=zi[n],l=!!(e||Nt||ye),h=Math.min(432,Math.round(216*(devicePixelRatio||1))),S=r?l?96:h:l?96:f==null?48:Math.round(H(216*Math.sqrt(250/f),96,216)/2)*2,$=typeof Z=="number"?Z:Ct(Z),L=performance.now(),w=e&&ye?s.filter(m=>m!==ye):null,T=w?.length?w[cl++%w.length]:null;if(s.forEach(m=>{if(m===ye||T&&m!==T)return;const g=+m.dataset.a,y=+m.dataset.b,k=m.querySelector("canvas"),F=m._vw||{x0:0,x1:1,y0:0,y1:1},q=(J,Q,bt)=>[J.min+(J.max-J.min)*Q,J.min+(J.max-J.min)*bt],N=vs(o,g,y),V=q(o.ch[g],N&1?1-F.x0:F.x0,N&1?1-F.x1:F.x1),O=q(o.ch[y],N&2?1-F.y0:F.y0,N&2?1-F.y1:F.y1),P=m._polar=r&&Ka(o,g,y)&&Ja(n,o,g,y),tt=m._tri=r&&!P&&Ya(n,g,y)?fo(n,o,g,y):0;m.classList.toggle("polar",!!P),m.classList.toggle("tric",tt===1),m.classList.toggle("triw",tt===3),m.classList.toggle("trid",tt===2);const R=tt===3?Math.round(S*.8660254):S,X=tt===1?Math.round(S*.8660254):S;(k.width!==R||k.height!==X)&&(k.width=R,k.height=X),r&&ir(k,n,i,g,y,P||tt?[o.ch[g].min,o.ch[g].max]:V,P||tt?[o.ch[y].min,o.ch[y].max]:O,de,a,P,tt,se,!Lt&&!Ct(Z))||er(k.getContext("2d"),S,n,i,g,y,V,O,!0,de,$),Lt?e||rl(m,n,g,y,o,k.width,k.height):m._density&&(m._density.style.display="none")}),Lt&&!Se.has(n)&&!vn.has(n)&&!we.has(n)&&(we.add(n),bn()),Bo=r,Bo)Ae=0;else{const m=performance.now()-L;zi[n]=Math.max(m,.5)*(216/S)**2,Ae=performance.now()+Math.max(120,m*1.8),e&&(Di=performance.now()+Math.max(80,m*1.5)),!t&&f==null&&setTimeout(()=>fe(!1),30)}const u=Ct(Z);if(u&&!l){const m=Yt(u(Kt()));s.forEach(g=>ll(g,m))}else u||s.forEach(m=>{m._snap=null,m._snapSeed=null});!t&&!Nt&&!ye&&ue()}let jo=0;lr(()=>{jo||(jo=requestAnimationFrame(()=>{if(jo=0,!dt&&ct()&&!Ue(lt)){const t=G.querySelector(".mesh3");t&&(t._sceneKey=""),Ae=0,fe(!1),qo(),Zn(),vt()}}))});const js=t=>!cc&&t.classList.contains("lite")&&!t.classList.contains("fea");let dt=!1;addEventListener("pointerdown",t=>{t.isPrimary&&(dt=!0,t.target.closest?.(".ch,.bar2,.pl,.nv,.cv,.cd,#imgpk")&&(ee=!1))},!0),addEventListener("pointerup",t=>{t.isPrimary&&(dt=!1)},!0),addEventListener("pointercancel",t=>{t.isPrimary&&(dt=!1)},!0),addEventListener("blur",()=>dt=!1);const Ln=48,zo=16,dl=8,ul=t=>{const e=getComputedStyle(t).transitionDuration.split(",")[0].trim();return parseFloat(e)*(e.endsWith("ms")?1:1e3)||0},fl=(t,e,n=!0)=>{if(!n){t.style.background=e,t._gradStack?.forEach(r=>{clearTimeout(r._timer),r.remove()}),t._gradStack=null;return}if(!t._gradStack){const r=document.createElement("i");r.className="gbg on",r.setAttribute("aria-hidden","true"),r.style.background=t.style.background,t.prepend(r),t.style.background="var(--panel)",t._gradStack=[r]}const o=document.createElement("i");o.className="gbg",o.setAttribute("aria-hidden","true"),o.style.background=e,t._gradStack.at(-1).after(o),t._gradStack.push(o),o.offsetWidth;let i=!1;const a=()=>{if(i)return;i=!0,o.removeEventListener("transitionend",s),clearTimeout(o._timer);const r=t._gradStack,d=r?.indexOf(o)??-1;d<0||(r.slice(0,d).forEach(f=>{clearTimeout(f._timer),f.remove()}),t._gradStack=r.slice(d))},s=r=>{r.propertyName==="opacity"&&a()};o.addEventListener("transitionend",s),o.classList.add("on");const c=ul(o);c?o._timer=setTimeout(a,c*2):a()},Do=()=>ct()&&!Ue(lt)?lt:U.s;function ve(t,e=-1,n=dt||ee?zo:Ln,o=!0){const i=Rt(Kt()),a=Do();(t||si()).forEach(s=>{const c=s.dataset.s;if(js(s)&&!s.classList.contains("pop"))return;const r=ut(c),d=At(c),f=c==="rgb"?1:n,l=c===a,h="off";if(!d)return;const S=(l?U.s+"|"+U.vals.join():i)+`: 0: $ {
        f
    }: $ {
        h
    }: $ {
        nn(Z)
    }
    $ {
        Ge.has(Z) ? ":" + se : ""
    }
    `;if(e<0&&s.dataset.g===S)return;let $=!0;(s._chs??=s.querySelectorAll(".ch")).forEach((L,w)=>{if(w===e){$=!1;return}if(L._g===S)return;const T=r.ch[w],u=typeof Z=="number"?Ls(mi(c,d,w,T,Z,h)):Z!=null&&Ct(Z)?Ai(c,d,w,T,Ct(Z),h):`
    linear - gradient(90 deg, $ {
        Yo(c, d, w, T.min, T.max, f, h).join(",")
    })`;fl(L,u+", var(--checker)",o),L._g=S}),$&&(s.dataset.g=S)})}const Oo=new Set,Uo=(t,e,n)=>{t._tk!==e&&(t._tk=e,t.style.setProperty("--tkc",e),t.style.setProperty("--tki",n),t.style.setProperty("--tkv",n==="#fff"?"var(--dark)":"#fff"))},Ui=(t,e)=>{t._cur!==e&&(t._cur=e,t.style.setProperty("--cur",e))},hl=()=>{for(const t of Oo){t._tk=t._cur="";for(const e of["--tkc","--tki","--tkv","--cur"])t.style.removeProperty(e)}Oo.clear()},Ni=(t,e)=>{dt||ee||(Uo(kt,t,e),Ui(kt,t),hl())},Hi=(t,e)=>{G.querySelectorAll(".bar2,.pl").forEach(n=>Uo(n,t,e))};function ae(t,{values:e=!0,thumbs:n=!0}={}){const o=Kt(),i=U.s+"|"+U.vals.join(),a=Ct(Z),s=a?Yt(a(o)):o,c=Rt(s),r=xe(s);n&&Ni(c,r),ct()&&Hi(c,r),(t||si()).forEach(d=>{const f=d.dataset.s,l=!js(d)||d.classList.contains("pop"),h=i,S=d._cvs??=d.querySelectorAll(".cv"),$=At(f),L=ut(f);if(e&&(d._vv!==h||d.contains(document.activeElement))&&(S.forEach((u,m)=>{const g=$?ba($[m],L.ch[m]):"";u.value!==g&&(document.activeElement!==u||d===le)&&(u.value=g)}),d._vv=h),!n)return;const w=l?h+"|"+Qe:h+":l";if(d.dataset.v===w&&!d.contains(document.activeElement)||(S.forEach((u,m)=>{const g=u.nextElementSibling,y=L.ch[m];g&&g.classList.contains("stk")&&(g.firstElementChild.classList.toggle("lim",!!$&&$[m]>=y.max-1e-9),g.lastElementChild.classList.toggle("lim",!!$&&$[m]<=y.min+1e-9))}),d.dataset.v=w,!l))return;const T=Lt?_e.get(f):null;Lt&&!T&&!we.has(f)&&(we.add(f),bn()),(d._chs??=d.querySelectorAll(".ch")).forEach((u,m)=>{const g=L.ch[m];if(T||u._hist){const k=T?.[m]||null;let F=u._hist;F||(F=u._hist=document.createElement("i"),F.className="hist",F.setAttribute("aria-hidden","true"),u.insertBefore(F,u.firstChild)),F._p!==k&&(F._p=k,k&&(F.style.webkitMaskImage=k,F.style.maskImage=k),F.style.display=k?"":"none")}const y=ke.get(f+"|"+m);if(y||u._rng){const k=u._rng||(u._rng=u.appendChild(Object.assign(document.createElement("i"),{className:"rng"})));k.style.display=y?"":"none",u.classList.toggle("ranged",!!y),u._rlo||(u._rlo=u.appendChild(Object.assign(document.createElement("i"),{className:"rh rlo"})),u._rlo.append(document.createElement("i")),u._rhi=u.appendChild(Object.assign(document.createElement("i"),{className:"rh rhi"})),u._rhi.append(document.createElement("i"))),u._rlo.style.display=u._rhi.style.display=y?"":"none",y&&(k.style.setProperty("--rlo",(y.lo*100).toFixed(2)+"%"),k.style.setProperty("--rhi",(y.hi*100).toFixed(2)+"%"),u._rlo.style.left=(y.lo*100).toFixed(2)+"%",u._rhi.style.left=(y.hi*100).toFixed(2)+"%")}if(u.classList.toggle("noval",!$),$){const k=u._nrg??=u.querySelector(".nrg");k&&(k.style.length&&(k.style.removeProperty("--tkc"),k.style.removeProperty("--tki")),!k._glide&&!(dt&&d===le&&m===He&&document.activeElement===k)&&+k.value!==$[m]&&(k.value=$[m]))}})})}function No(t,e,n){if(!e){const s=Kt(),c=Ct(Z);e=c?Yt(c(s)):s,n=Rt(e)}const o=xe(e),i=t||Un();dt||ee?i.forEach(s=>{Uo(s,n,o),Ui(s,n),Oo.add(s)}):Ni(n,o),i.forEach(s=>{if(js(s)&&!s.classList.contains("pop"))return;const c=At(s.dataset.s);c&&(s._chs??=s.querySelectorAll(".ch")).forEach((r,d)=>{const f=r._nrg??=r.querySelector(".nrg");f&&(f.style.length&&(f.style.removeProperty("--tkc"),f.style.removeProperty("--tki")),!f._glide&&!(dt&&s===le&&d===He&&document.activeElement===f)&&+f.value!==c[d]&&(f.value=c[d]))})})}const pl=100,ml=300;let Ho=0,An=0,Go=0,Tn=0,gl=0,Wo="",Cn=0;const ts=()=>{const t=le||Es.get(Do());return t&&ks.has(t.dataset.s)?t:null},Gi=()=>{clearTimeout(An),An=0,Ho=performance.now(),Bn={},jn=U;const t=Un(),e=Kt(),n=Ct(Z),o=n?Yt(n(e)):e;ae(t,{thumbs:!1}),No(t,o,Rt(o))},yl=(t=!1)=>{const e=pl-(performance.now()-Ho),n=()=>{clearTimeout(An),An=0,Bn={},jn=U;const o=t?null:ts(),i=Un().filter(a=>a!==o);ae(i,{thumbs:!1}),Ho=performance.now()};e<=0?n():An||(An=setTimeout(n,e))},Vo=t=>Un().filter(e=>e!==t&&(!js(e)||e.classList.contains("pop"))),Wi=()=>Do()+"|"+U.s+"|"+U.vals.join()+"|"+nn(Z)+"|"+(Ge.has(Z)?se:"");function vl(){clearTimeout(Tn),Tn=0,Go=performance.now();const t=ct()?null:ts(),e=Vo(t);if(!e.length)return;const n=e[gl++%e.length];ve([n],-1,dt||ee?dl:Ln,!0),Cn=Math.max(0,Cn-1),Cn&&Vi()}function Vi(){const t=ct()?null:ts(),e=Vo(t).length;if(!e)return;const n=Wi();if(n!==Wo&&(Wo=n,Cn=e),!Cn)return;const o=Math.max(0,ml/e-(performance.now()-Go));Tn||(Tn=setTimeout(vl,o))}const es=()=>{clearTimeout(Tn),Tn=0,Go=performance.now(),Gi();const t=ct()?null:ts(),e=Vo(t);ve(e,-1,Ln,!0),t&&ve([t],-1,Ln,!1),Wo=Wi(),Cn=0};function vt(t=!0){Bn={},jn=U;const e=Kt(),n=Rt(e),o=Ct(Z),i=o?Yt(o(e)):e,a=o?Rt(i):n;if(hn&&document.activeElement!==hn&&(hn.value=a.toLowerCase()),In&&In._hx!==a&&(In._hx=a,In.style.setProperty("--sw",a),In.style.setProperty("--swk",xe(i)),$a)){const u=i.reduce((m,g,y)=>{const k=g/255;return m+[.2126,.7152,.0722][y]*(k<=.03928?k/12.92:((k+.055)/1.055)**2.4)},0);$a.style.color=u>=.18?"#000":"#fff"}Lr(a);const s=U.vals.join(),c=!ne.hash&&(U===wa&&s===un.vals.join()||ee&&s===ka);if(c!==xa&&(xa=c,document.body.classList.toggle("virgin",c),!c&&Gt&&(Gt.placeholder="")),Aa&&Aa.classList.toggle("inv",c),Gt&&document.activeElement!==Gt&&(Gt.value=c?"":Xa(a)),c&&Gt&&(Gt.placeholder=Xa(a)),!c&&!dt&&(Vr(a),Gr(n)),pn){const u=c?null:Nr();pn.hidden=!u,u&&pn.dataset.g!==u&&(pn.textContent=Lo[u],pn.title=kc[u],pn.dataset.g=u)}if(Ce){const u=Ge.has(Z)&&!c;if(Ce.hidden=!u,u){const m=ho(Z,e,se);Ce._n!==m.n&&(Ce._n=m.n,Ce.lastElementChild.textContent=m.n,Ce.title=`
    nearest $ {
        Z
    }
    entry($ {
        Mo[se]
    }) \u2013 click to snap to $ {
        m.n
    }
    `,Ce.removeAttribute("data-tip"))}}{const u=ts(),m=ct();u&&!m&&(ae([u]),ve([u],le?He:-1,dt||ee?zo:Ln,!1)),No(Un(),i,a),yl(m),Vi()}if(!ct()||Ue(lt))return;Hi(a,xe(i));const r=lt,d=ut(r),f=At(r),l=f;let h=l;if(l&&r!==U.s)try{h=Vt(r,e)}catch{}const S=document.getElementById("cssv");S&&h&&ms[r]&&(S.textContent=ms[r](h));const $=oa(r)==="ready",L=Ec(d),w=Lt?_e.get(r):null;if(G.querySelectorAll(".bar2").forEach(u=>{const m=+u.dataset.i,g=d.ch[m];if(!dt&&(w||u._hist)){const q=w?.[m]||null;let N=u._hist;N||(N=u._hist=document.createElement("i"),N.className="hist",N.setAttribute("aria-hidden","true"),u.append(N)),N._p!==q&&(N._p=q,q&&(N.style.webkitMaskImage=q,N.style.maskImage=q),N.style.display=q?"":"none")}if(u!==Nt){let q;const N=u.querySelector(".bg"),V=u.querySelector(".bgc");$&&rr(V,r,l,m,[g.min,g.max],L,Z??0,dt||!Lt&&!Ct(Z))?(V.style.display="block",N.style.backgroundImage="none",N.style.webkitMaskImage=N.style.maskImage="none"):(V.style.display="none",typeof Z=="number"?q=Ls(mi(r,l,m,g,Z,L)):Ct(Z)?q=Ai(r,l,m,g,Ct(Z),L):q=`
    linear - gradient(90 deg, $ {
        Yo(r, l, m, g.min, g.max, r === "rgb" ? 1 : dt || ee ? zo : Ln, L).join(",")
    })`,N.style.backgroundImage=q,N.style.webkitMaskImage=N.style.maskImage="none")}if(!dt){const q=V=>xe(Ut(r,d.ch.map((O,P)=>P===m?O.min+(O.max-O.min)*V:l[P]))),N=q(0);u.querySelector(".cnm").style.color=N,u.querySelector(".sv.lo").style.color=N,u.querySelector(".sv.md").style.color=q(.5),u.querySelector(".sv.hi").style.color=q(1)}let y=H((l[m]-g.min)/(g.max-g.min),0,1);const k=Ct(Z);if(k&&u!==Nt&&!dt){const q=Yt(k(e)),N=l.map((O,P)=>P===m?"":O).join(","),V=`
    $ {
        Z
    } | $ {
        q.join(",")
    } | $ {
        N
    }
    `;if(u._snapKey===V&&u._snapHint==null)y=u._snapF;else{const O=u._snapHint??y,P=Tc(u,q,O);if(P!=null)y=P;else{const tt=Li(r,l,m,g,k).filter(R=>_s(R.rgb,q)).sort((R,X)=>Math.abs((R.lo+R.hi)/(2*Me)-O)-Math.abs((X.lo+X.hi)/(2*Me)-O))[0];tt&&(y=(tt.lo+tt.hi)/(2*Me))}u._snapKey=V,u._snapF=y,u._snapHint=null}}else k||(u._snapKey=u._snapF=u._snapHint=null);const F=u._nrg??=u.querySelector(".nrg");F&&!F._glide&&!(dt&&document.activeElement===F)&&(F.value=g.min+y*(g.max-g.min))}),G.querySelectorAll("#bigch .bch").forEach(u=>{const m=+u.dataset.i,g=d.ch[m],y=u.querySelector(".nv");(document.activeElement!==y||Nt&&+Nt.dataset.i===m)&&(y.value=l[m].toFixed(Te(g)));const k=u.querySelector(".stk"),F=typeof Z=="number"?(g.max-g.min)/(2*Z):0;k.firstElementChild.classList.toggle("lim",l[m]>=g.max-F-1e-9),k.lastElementChild.classList.toggle("lim",l[m]<=g.min+F+1e-9)}),G.querySelectorAll(".pl").forEach(u=>{const m=+u.dataset.a,g=+u.dataset.b,y=u._vw||{x0:0,x1:1,y0:0,y1:1},k=u.querySelector(".cx"),F=H((l[m]-d.ch[m].min)/(d.ch[m].max-d.ch[m].min),0,1),q=H((l[g]-d.ch[g].min)/(d.ch[g].max-d.ch[g].min),0,1);if(u._polar){const O=F*2*Math.PI;k.style.display="",k.style.left=50+q*50*Math.cos(O)+"%",k.style.top=50+q*50*Math.sin(O)+"%"}else if(u._tri){k.style.display="";const O=u._tri===3?.866:1,P=u._tri===1?.866:1;if(u._tri===3){const tt=H(1-F-q,0,1);k.style.left=tt*O*100+"%",k.style.top=(1-(F+.5*tt))*P*100+"%"}else{const tt=u._tri===1?q:1-Math.abs(2*q-1);k.style.left=(.5-.5*tt+F*tt)*O*100+"%",k.style.top=(1-q)*P*100+"%"}}else{const O=vs(d,m,g),P=O&1?1-F:F,tt=O&2?1-q:q,R=(P-y.x0)/(y.x1-y.x0),X=(tt-y.y0)/(y.y1-y.y0);k.style.display=R<-.01||R>1.01||X<-.01||X>1.01?"none":"",k.style.left=H(R,0,1)*100+"%",k.style.top=(1-H(X,0,1))*100+"%"}const N=Ct(Z),V=N?Yt(N(e)).join(","):"";if(N&&u._snap&&u._snap.key===V&&u!==ye&&(k.style.display="",k.style.left=u._snap.left+"%",k.style.top=u._snap.top+"%"),!dt){const O=u.querySelector("canvas"),P=O.getContext("2d"),tt=(X,J)=>{let Q=0,bt=0,ie=0,Zt=0;try{for(const[Mt,x]of J){const E=P.getImageData(Math.round(Mt*(O.width-1)),Math.round(x*(O.height-1)),1,1).data;E[3]<40||(Q+=E[0],bt+=E[1],ie+=E[2],Zt++)}}catch{}X.style.color=Zt?xe([Q/Zt,bt/Zt,ie/Zt]):"var(--ink)"};tt(u.querySelector(".laby"),[[.03,.06],[.08,.06],[.13,.06]]),tt(u.querySelector(".labx"),[[.96,.96],[.84,.96],[.72,.96]]);const R=u.querySelector(".pmode");R&&R.style.color&&(R.style.color="")}}),f&&!dt){let u;if(As)try{u=Vt(r,As)}catch{u=null}if(!u&&(u=nr(d,f,180),!u))try{u=Vt(r,e.map(g=>255-g))}catch{u=null}const m=G.querySelector("#irow");if(u&&m){const g=As||Ut(r,u),y=G.querySelector("#pinb");y&&document.activeElement!==y&&(y.value=Rt(g));const k=G.querySelector("#idia");k&&(k.style.background=Rt(g));const F=G.querySelector("#isp0");F&&(F.textContent=r,F.style.color=xe(e));const q=X=>Ut(r,ea(r,f,u,X,Vs)),N=Ct(Z);let V;if(typeof Z=="number"){const X=[];for(let J=0;J<Z;J++)X.push(Rt(q((J+.5)/Z).map(Q=>H(Math.round(Q),0,255))));V=Ls(X)}else if(N){const X=[];for(let J=0;J<20;J++)X.push(Rt(N(q((J+.5)/20).map(Q=>H(Math.round(Q),0,255))).map(Q=>H(Math.round(Q),0,255))));V=Ls(X)}else{const X=[];for(let J=0;J<=14;J++)X.push(Rt(q(J/14)));V=`
    linear - gradient(90 deg, $ {
        X.join(",")
    })`}m.style.background=V;const O=G.querySelector("#icmp"),P=G.querySelector("#ispc"),tt=yi.filter(X=>X!==r),R=tt.length?tt[Eo%tt.length]:null;if(O&&R)try{const X=Vt(R,e),J=Vt(R,g),Q=[];for(let bt=0;bt<=14;bt++)Q.push(Rt(Ut(R,ea(R,X,J,bt/14))));O.style.background=`
    linear - gradient(90 deg, $ {
        Q.join(",")
    })`,P&&(P.textContent=he(R),P.style.color=xe(Ut(R,X)))}catch{O.style.background="none"}}}const T=G.querySelector("#snip");if(T&&!dt)if(fn==="css"){const u=Sc();let m=null,g=null;try{m=r==="oklch"?h:W[r].oklch(...h)}catch{}try{g=r==="xyz"?h:W[r].xyz(...h)}catch{}const y=k=>`
    $ {
        k
    }
    `;T.innerHTML=kn(Kr.has(r)?` /* ${r} is a native CSS notation */
    color: $ {
        y(Va(r, h))
    };
    color: $ {
        y(n)
    };
    $ {
        u && !u.srgb ? "                 /* nearest sRGB fallback */" : "                 /* sRGB hex */"
    }
    `:` /* CSS cannot name ${r} directly */

    /* proposal \u2014 CSS Color 5 custom spaces (no browser ships this yet):
    @color-profile --${r} { src: url('${r}.icc'); }
    color: color(--${r} ${h.map((k,F)=>pe(k,d.ch[F])).join(" ")}); */
    `).replace(/\x03/g,'<span class="cval" title="click selects the value">').replace(/\x04/g,"</span>").replace(/\x05/g,'<span class="icclnk" role="link" tabindex="0" title="download the ICC profile">').replace(/\x06/g,"</span>"),T.onclick=k=>{const F=k.target.closest(".cval");if(F){const q=document.createRange();q.selectNodeContents(F);const N=getSelection();N.removeAllRanges(),N.addRange(q);return}if(k.target.closest(".icclnk")){const q=G.querySelector("#didl");q?q.click():Xt("No ICC for this space")}}}else if(fn==="meta"){const u=(m,g="")=>{if(Array.isArray(m))return m.every(y=>typeof y!="object"||y===null)?JSON.stringify(m):` [
        `+m.map(y=>g+"  "+u(y,g+"  ")).join(`,
        `)+`
        `+g+"]";if(m&&typeof m=="object"){const y=Object.entries(m);return y.every(([,k])=>typeof k!="object"||k===null)?"{ "+y.map(([k,F])=>`
        $ {
            k
        }: $ {
            JSON.stringify(F)
        }
        `).join(", ")+" }":` {
            `+y.map(([k,F])=>g+"  "+k+": "+u(F,g+"  ")).join(`,
            `)+`
            `+g+"}"}return JSON.stringify(m)};T.innerHTML=kn(`
            import data from 'color-space/data.json'
            with {
                type: 'json'
            }

            data.spaces$ {
                Ne(r)
            }
            `+u(cn[r]||{}).split(`
            `).map(m=>"// "+m).join(`
            `))}else if(fn==="wasm"){const u=h.map((y,k)=>pe(y,d.ch[k])).join(", "),m=r==="rgb"?".oklch":".rgb",g=r==="rgb"?".rgb.oklch":`.rgb$ {
                Ne(r)
            }
            `;T.innerHTML=kn(`
            import space,
            {
                alloc
            } from 'color-space/wasm'

            space$ {
                Ne(r)
            }
            $ {
                m
            }($ {
                u
            }) // scalar \u2014 the JS API's exact shape

            const buf = alloc(n) // Float64Array(n\xB73) living in WASM memory
            // \u2026 write rgb 0-255 pixels into buf \u2026
            space$ {
                g
            }(buf) // the whole buffer, in place, zero-copy

            // same verified formulas as the JS API, compiled ahead-of-time (~1.4\xD7 faster)`)}else if(fn==="gl"){const u={1:"float",2:"vec2",3:"vec3",4:"vec4"}[d.ch.length]||"vec3",m=r.replace(/-/g,""),g=r==="rgb"?"oklch":"rgb";T.innerHTML=kn(`import { glsl, wgsl } from 'color-space/gl'
            import $ {
                wn(r)
            } from 'color-space/gl/${r}'

            glsl($ {
                wn(r)
            }, '${g}') // GLSL: vec3 ${m}_${g}(${u} c) { \u2026 }
            wgsl($ {
                wn(r)
            }, '${g}') // WGSL: fn ${m}_${g}(c: ${u}f) -> vec3f { \u2026 }

            // chunks are pure data \u2013 name the conversion via glsl(), like space${Ne(r)}${Ne(g)}.
            // glsl(${wn(r)}) bundles both ways; any space by name via color-space/gl/all`)}else if(r==="rgb"){const u=l.map(Math.round),m=ut("oklch").ch;let g=null;try{g=Vt("oklch",u)}catch{}const y=g?g.map((F,q)=>pe(F,m[q])).join(", "):"";let k=u;try{k=W.oklch.rgb(...g).map(Math.round)}catch{}T.innerHTML=kn(`import space from 'color-space'

            space.rgb.oklch($ {
                u.join(", ")
            }) // \u2192 [${y}]
            space.oklch.rgb($ {
                y
            }) // \u2192 [${k.join(", ")}]

            // one space, tree-shaken (0.4-1.5 kB):
            import rgb from 'color-space/rgb.js'
            `)}else{const u=ta(r),m=h.map((V,O)=>pe(V,d.ch[O])).join(", "),g=e.map(Math.round),y=Vt(r,g),k=`
            space.rgb$ {
                Ne(r)
            }($ {
                g.join(", ")
            }) // \u2192 [${y.map((V,O)=>pe(V,d.ch[O])).join(", ")}]
            `,F=u&&u[1],q=(()=>{if(!F)return null;try{return W[r][F](...h)}catch{return null}})(),N=F&&q?` // one space, tree-shaken (0.4-1.5 kB) \u2014 its own edge:
            import $ {
                wn(r)
            } from 'color-space/${r}.js'

            $ {
                wn(r)
            }
            $ {
                Ne(F)
            }($ {
                m
            }) // \u2192 [${q.map(V=>+V.toFixed(4)).join(", ")}]

            `:"";T.innerHTML=kn(N+` // any-to-any, both ways \u2014 the wired hub:
            import space from 'color-space'

            space$ {
                Ne(r)
            }.rgb($ {
                m
            }) // \u2192 [${g.join(", ")}]
            `+k+(u&&u.length>2?` // route: ${u.join(" \u2192 ")}`:""))}dt&&(ye||Ye!==null)&&fe(!0,!0),t&&(dt&&(Nt||ye||le||Ye!==null)?Fi():(!Nt&&!ye||it&&it.gpu)&&ue()),Bs(dt),Bi()}let Xi,Ki;const jt=(t=!1)=>{t||(ee=!1),cancelAnimationFrame(Xi),Xi=requestAnimationFrame(()=>{vt(),clearTimeout(Ki),Ki=setTimeout(()=>{!ct()&&!dt&&es()},La),!dt&&performance.now()>Ae&&fe(!0)})},zs=document.getElementById("thm"),bl='<svg width="13.75" height="13.75" viewBox="1 1 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.4"/><path d="M12 2v2.2M12 19.8V22M2 12h2.2M19.8 12H22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"/></svg>',xl='<svg width="12.5" height="12.5" viewBox="2 2 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>',Yi=()=>{const t=document.documentElement.dataset.theme==="dark";zs.innerHTML=t?bl:xl,zs.setAttribute("aria-pressed",String(t)),zs.setAttribute("aria-label",t?"Switch to light theme":"Switch to dark theme")};Yi(),zs.onclick=()=>{const t=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=t,localStorage.csTheme=t,Yi()};const Ji=t=>{const[,e,n]=W.kelvin.oklab(t),o=Math.hypot(e,n);let i=Math.atan2(n,e)*180/Math.PI;return i<0&&(i+=360),{C:o,h:i}},wl=Ji(9500).C;function Xo(t){const e=document.documentElement.style;if(!t){e.removeProperty("--uh"),e.removeProperty("--uk"),delete localStorage.csTemp,delete localStorage.csTempV;return}const{C:n,h:o}=Ji(t=Math.round(H(t,1e3,2e4))),i=Math.min(2.5,n/wl);e.setProperty("--uh",o.toFixed(1)),e.setProperty("--uk",i.toFixed(3)),localStorage.csTemp=t,localStorage.csTempV=`${o.toFixed(1)} ${i.toFixed(3)}`}window.setUITemp=Xo;const Qi=new URLSearchParams(location.search).get("temp");Qi!=null?Xo(+Qi||0):localStorage.csTemp&&Xo(+localStorage.csTemp),(()=>{const t=document.getElementById("apitabs");if(!t)return;const e=[...t.querySelectorAll(":scope > [data-p]")],n=[...t.querySelectorAll(".tabrow button")],o=(i,a=!1)=>{n.forEach(s=>{const c=s.dataset.p===i;s.classList.toggle("on",c),s.setAttribute("aria-selected",String(c)),s.tabIndex=c?0:-1,c&&a&&s.focus({preventScroll:!0})}),e.forEach(s=>s.hidden=s.dataset.p!==i)};n.forEach((i,a)=>{i.onclick=()=>o(i.dataset.p),i.onkeydown=s=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(s.key))return;s.preventDefault();let c=a;s.key==="ArrowLeft"&&(c=(a-1+n.length)%n.length),s.key==="ArrowRight"&&(c=(a+1)%n.length),s.key==="Home"&&(c=0),s.key==="End"&&(c=n.length-1),o(n[c].dataset.p,!0)}})})(),(()=>{const t=document.getElementById("apitabs");if(!t)return;const e=S=>S===0?"0":S.toExponential(1),n=S=>ln.map($=>{const L=$.spaces.filter(S);return L.length?`<optgroup label="${$.name}">${L.map(w=>`<option value="${w}">${he(w)}</option>`).join("")}</optgroup>`:""}).join(""),o=(S,$,L)=>{const w=document.createElement("a");w.href=URL.createObjectURL(new Blob([S],{type:L})),w.download=$,w.click(),setTimeout(()=>URL.revokeObjectURL(w.href),4e3)},i=t.querySelector("#lutfrom"),a=t.querySelector("#lutto"),s=t.querySelector("#lutszL"),c=t.querySelector("#lut1dL"),r=t.querySelector("#lutdlL"),d=t.querySelector("#lutstatL");if(i){let S=33,$=0;i.innerHTML=n(T=>ss.has(T)),a.innerHTML=n(T=>Zo.has(T)),i.value="slog3",a.value="rec709",i.value||(i.selectedIndex=0),a.value||(a.selectedIndex=0);const L=()=>{const T=i.value,u=a.value,m=++$;d.textContent="measuring\u2026",r.disabled=!1,setTimeout(()=>{if(m===$)try{if(T===u)throw new Error("pick two different spaces");const g=rs(W[T],W[u]),y=pa(W[T],W[u],g?{}:{size:S}),k=ma(y,400),F=k.in.share>0&&k.in.share<.999,q=F?k.in:k,N=(y.dims===3?y.size**3:y.size)*21+430;s.style.display=g?"none":"",c.style.display=g?"":"none",d.textContent=`${g?y.size+"-pt 1D":y.size+"\xB3"} \xB7 median ${e(q.median)}, max ${e(q.max)} \xB7 \u2248${N>1e6?(N/1e6).toFixed(1)+" MB":Math.round(N/1e3)+" kB"}`}catch(g){r.disabled=!0,d.textContent=String(g&&g.message||"no finite LUT for this pair")}},0)},w=document.getElementById("api-panel-lut");w?new IntersectionObserver((T,u)=>{T.some(m=>m.isIntersecting)&&(u.disconnect(),L())}).observe(w):L(),i.onchange=a.onchange=L,s.querySelectorAll("button").forEach(T=>T.onclick=()=>{S=+T.dataset.z,s.querySelectorAll("button").forEach(u=>u.classList.toggle("on",u===T)),L()}),r.onclick=()=>{const T=i.value,u=a.value;try{if(T===u)throw 0;const m=rs(W[T],W[u]);o(ga(W[T],W[u],m?{}:{size:S}),`${T}-to-${u}${m?"":"-"+S}.cube`,"text/plain"),Xt("LUT saved")}catch{Xt("No LUT for this pair")}}}const f=t.querySelector("#iccsp"),l=t.querySelector("#iccdlL"),h=t.querySelector("#iccstatL");if(f){const S=ln.flatMap(m=>m.spaces),$={mntr:"v2 matrix+TRC display",spac:"v2 CLUT, device\u2194Lab both ways",scnr:"v2 CLUT, device\u2192Lab (one-way)"},L=m=>{try{return ya(W[m],{xyz:W.xyz})}catch{return null}},w=()=>{const m=f.value;if(!m){h.textContent="\u2014",l.disabled=!0;return}try{const g=cs(W[m],{xyz:W.xyz});l.disabled=!1,h.textContent=`${(g.length/1024).toFixed(1)} kB \xB7 D50 PCS \xB7 ${$[L(m)]||""}`}catch(g){l.disabled=!0,h.textContent=String(g&&g.message||"no profile for this space")}},T=()=>{const m=new Set(S.filter(L));f.innerHTML=n(g=>m.has(g)),f.value=m.has("p3")?"p3":f.options[0]&&f.options[0].value,w()};f.onchange=w,l.onclick=()=>{const m=f.value;try{o(cs(W[m],{xyz:W.xyz}),`${m}.icc`,"application/vnd.iccprofile"),Xt("ICC saved")}catch{Xt("No profile for this space")}};const u=document.getElementById("api-tab-icc");u?u.addEventListener("click",T,{once:!0}):T()}})();const Sl=Array.from({length:721},(t,e)=>Rt(Ut("oklch",[.72,.15,e/720*360]))),kl=t=>Sl[Math.round(H(t,0,1)*720)],El=Ut("oklch",[.72,0,0]).map(t=>H(Math.round(t),0,255));(()=>{const t=document.querySelector(".page").style;t.setProperty("--mline",`linear-gradient(90deg, ${Array.from({length:73},(e,n)=>kl(n/72)).join(",")})`),t.setProperty("--igray",El.join(","))})();const Zi=new IntersectionObserver(t=>t.forEach(e=>{e.isIntersecting&&(e.target.classList.add("typing"),Zi.unobserve(e.target))}),{threshold:.6});document.querySelectorAll(".fnpm").forEach(t=>Zi.observe(t)),vt(),ve(),kt.addEventListener("click",t=>{const e=t.target.closest(".ent.barred");if(!e)return;const n=_n[+e.dataset.b];n&&Gn(n.key)});const Pe=t=>be.includes(t)||Ue(t),tr=t=>{t&&(ee=!1);const e=t?Na(location.hash.slice(1)):ne.hash,n=t?null:ne.q,o=t?null:ne.seg,i=Pe(e)?e:Pe(n)?n:Pe(o)?o:null;if(/^[0-9a-fA-F]{6}$/.test(e))U={s:"rgb",vals:[0,2,4].map(a=>parseInt(e.slice(a,a+2),16))},De!=="hex"&&lo("hex");else if(/^[0-9a-fA-F]{6}(,[0-9a-fA-F]{6})+$/.test(e)){const a=e.split(",")[0];U={s:"rgb",vals:[0,2,4].map(s=>parseInt(a.slice(s,s+2),16))}}else if(e){let a=null;try{a=wo(e)}catch{}if(a){U=a;const s=e.match(/^([a-z][a-z0-9-]*)\(/)?.[1],c=s==="color"?/^color\(\s*display-p3\b/.test(e)?"p3":null:ro.includes(s)?s:null;c&&c!==De&&lo(c)}}n&&history.replaceState(null,"",ys(i||"")+(e?"#"+e:"")),qe=location.pathname+location.search+location.hash,i?Le.hidden||i!==lt||!G.dataset.wired?Gn(i):Ue(i)||(vt(),fe(!1)):(vt(),ve())};try{const t=new URLSearchParams(location.search).get("g");t&&yo(t)}catch{}kt.children.length||!(ne.hash||Pe(ne.q)||Pe(ne.seg))?On():(window.requestIdleCallback||setTimeout)(On),(ne.hash||Pe(ne.q)||Pe(ne.seg))&&tr(),addEventListener("hashchange",tr),po(()=>setTimeout(()=>{!ne.hash&&!Pe(ne.q)&&!Pe(ne.seg)&&U===wa&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&(ee=!0,Sa=Xs=performance.now(),requestAnimationFrame(Ea))},300)),"serviceWorker"in navigator&&location.protocol!=="file:"&&((location.hostname==="localhost"||location.hostname==="127.0.0.1")&&!ne.sw?navigator.serviceWorker.getRegistrations?.().then(e=>e.forEach(n=>n.unregister())):po(()=>navigator.serviceWorker.register("./sw.js")));
