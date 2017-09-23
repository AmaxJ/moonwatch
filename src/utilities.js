
export function isMobile() {
    return /Mobi/.test(navigator.userAgent);
}

export function noop() {
    return () => {};
}
