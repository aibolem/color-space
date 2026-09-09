const n = document.createElement("div");
n.id = "tip", n.setAttribute("role", "tooltip"), n.setAttribute("aria-hidden", "true"), document.body.appendChild(n);
let s = null,
    l = 0;
const h = e => {
        const t = e.getBoundingClientRect(),
            i = n.getBoundingClientRect();
        let a = t.left + t.width / 2 - i.width / 2;
        a = Math.max(6, Math.min(a, innerWidth - i.width - 6));
        let o = t.top - i.height - 8;
        o < 6 && (o = t.bottom + 8), o = Math.max(6, Math.min(o, innerHeight - i.height - 6)), n.style.left = a + "px", n.style.top = o + "px"
    },
    d = () => {
        const e = s && s.getAttribute("data-tip");
        if (!e) return;
        n.textContent = e;
        const t = s.getAttribute("data-tip-tags");
        if (t) {
            const i = document.createElement("span");
            i.className = "tags";
            for (const a of t.split(" \xB7 ")) {
                const o = document.createElement("i");
                o.textContent = a, i.append(o)
            }
            n.append(i)
        }
        n.setAttribute("aria-hidden", "false"), n.classList.add("on"), h(s)
    },
    r = () => {
        n.classList.remove("on"), n.setAttribute("aria-hidden", "true"), s = null, clearTimeout(l)
    },
    c = e => e.hasAttribute("data-tip") || getComputedStyle(e).cursor === "help",
    u = e => {
        const t = e.getAttribute("title");
        t != null && (e.setAttribute("data-tip", t), e.removeAttribute("title"))
    },
    p = e => {
        if (!e.target.closest) return null;
        const t = e.target.closest("[title],[data-tip]"),
            i = e.target.closest("select");
        return i && t !== i ? null : t
    };
addEventListener("pointerover", e => {
    const t = p(e);
    !t || t === s || !c(t) || (u(t), s = t, clearTimeout(l), l = setTimeout(d, 300))
}, {
    passive: !0
}), addEventListener("pointerout", e => {
    s && !s.contains(e.relatedTarget) && r()
}, {
    passive: !0
}), addEventListener("focusin", e => {
    const t = p(e);
    t && c(t) && (u(t), s = t, d())
}), addEventListener("focusout", r), addEventListener("scroll", r, !0), addEventListener("keydown", e => {
    e.key === "Escape" && r()
});
