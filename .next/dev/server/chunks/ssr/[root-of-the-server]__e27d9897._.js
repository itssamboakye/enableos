module.exports = [
"[project]/dist/esm/api/resources/empathicVoice/resources/chat/client/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/** THIS FILE IS MANUALLY MAINTAINED: see .fernignore */ __turbopack_context__.s([]);
;
;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/dist/esm/core/runtime/runtime.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * A constant that indicates which environment and version the SDK is running in.
 */ __turbopack_context__.s([
    "RUNTIME",
    ()=>RUNTIME
]);
const RUNTIME = evaluateRuntime();
function evaluateRuntime() {
    var _a, _b, _c, _d, _e;
    /**
     * A constant that indicates whether the environment the code is running is a Web Browser.
     */ const isBrowser = ("TURBOPACK compile-time value", "undefined") !== "undefined" && typeof window.document !== "undefined";
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    /**
     * A constant that indicates whether the environment the code is running is Cloudflare.
     * https://developers.cloudflare.com/workers/runtime-apis/web-standards/#navigatoruseragent
     */ const isCloudflare = typeof globalThis !== "undefined" && ((_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) === "Cloudflare-Workers";
    if (isCloudflare) {
        return {
            type: "workerd"
        };
    }
    /**
     * A constant that indicates whether the environment the code is running is Edge Runtime.
     * https://vercel.com/docs/functions/runtimes/edge-runtime#check-if-you're-running-on-the-edge-runtime
     */ const isEdgeRuntime = typeof EdgeRuntime === "string";
    if (isEdgeRuntime) {
        return {
            type: "edge-runtime"
        };
    }
    /**
     * A constant that indicates whether the environment the code is running is a Web Worker.
     */ const isWebWorker = typeof self === "object" && typeof (self === null || self === void 0 ? void 0 : self.importScripts) === "function" && (((_b = self.constructor) === null || _b === void 0 ? void 0 : _b.name) === "DedicatedWorkerGlobalScope" || ((_c = self.constructor) === null || _c === void 0 ? void 0 : _c.name) === "ServiceWorkerGlobalScope" || ((_d = self.constructor) === null || _d === void 0 ? void 0 : _d.name) === "SharedWorkerGlobalScope");
    if (isWebWorker) {
        return {
            type: "web-worker"
        };
    }
    /**
     * A constant that indicates whether the environment the code is running is Deno.
     * FYI Deno spoofs process.versions.node, see https://deno.land/std@0.177.0/node/process.ts?s=versions
     */ const isDeno = typeof Deno !== "undefined" && typeof Deno.version !== "undefined" && typeof Deno.version.deno !== "undefined";
    if (isDeno) {
        return {
            type: "deno",
            version: Deno.version.deno
        };
    }
    /**
     * A constant that indicates whether the environment the code is running is Bun.sh.
     */ const isBun = typeof Bun !== "undefined" && typeof Bun.version !== "undefined";
    if (isBun) {
        return {
            type: "bun",
            version: Bun.version
        };
    }
    /**
     * A constant that indicates whether the environment the code is running is Node.JS.
     */ const isNode = typeof process !== "undefined" && "version" in process && !!process.version && "versions" in process && !!((_e = process.versions) === null || _e === void 0 ? void 0 : _e.node);
    if (isNode) {
        return {
            type: "node",
            version: process.versions.node,
            parsedVersion: Number(process.versions.node.split(".")[0])
        };
    }
    /**
     * A constant that indicates whether the environment the code is running is in React-Native.
     * https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Core/setUpNavigator.js
     */ const isReactNative = typeof navigator !== "undefined" && (navigator === null || navigator === void 0 ? void 0 : navigator.product) === "ReactNative";
    if (isReactNative) {
        return {
            type: "react-native"
        };
    }
    return {
        type: "unknown"
    };
}
}),
"[project]/dist/esm/core/url/qs.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toQueryString",
    ()=>toQueryString
]);
const defaultQsOptions = {
    arrayFormat: "indices",
    encode: true
};
function encodeValue(value, shouldEncode) {
    if (value === undefined) {
        return "";
    }
    if (value === null) {
        return "";
    }
    const stringValue = String(value);
    return shouldEncode ? encodeURIComponent(stringValue) : stringValue;
}
function stringifyObject(obj, prefix = "", options) {
    const parts = [];
    for (const [key, value] of Object.entries(obj)){
        const fullKey = prefix ? `${prefix}[${key}]` : key;
        if (value === undefined) {
            continue;
        }
        if (Array.isArray(value)) {
            if (value.length === 0) {
                continue;
            }
            for(let i = 0; i < value.length; i++){
                const item = value[i];
                if (item === undefined) {
                    continue;
                }
                if (typeof item === "object" && !Array.isArray(item) && item !== null) {
                    const arrayKey = options.arrayFormat === "indices" ? `${fullKey}[${i}]` : fullKey;
                    parts.push(...stringifyObject(item, arrayKey, options));
                } else {
                    const arrayKey = options.arrayFormat === "indices" ? `${fullKey}[${i}]` : fullKey;
                    const encodedKey = options.encode ? encodeURIComponent(arrayKey) : arrayKey;
                    parts.push(`${encodedKey}=${encodeValue(item, options.encode)}`);
                }
            }
        } else if (typeof value === "object" && value !== null) {
            if (Object.keys(value).length === 0) {
                continue;
            }
            parts.push(...stringifyObject(value, fullKey, options));
        } else {
            const encodedKey = options.encode ? encodeURIComponent(fullKey) : fullKey;
            parts.push(`${encodedKey}=${encodeValue(value, options.encode)}`);
        }
    }
    return parts;
}
function toQueryString(obj, options) {
    if (obj == null || typeof obj !== "object") {
        return "";
    }
    const parts = stringifyObject(obj, "", Object.assign(Object.assign({}, defaultQsOptions), options));
    return parts.join("&");
}
}),
"[project]/dist/esm/core/websocket/events.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CloseEvent",
    ()=>CloseEvent,
    "ErrorEvent",
    ()=>ErrorEvent,
    "Event",
    ()=>Event
]);
class Event {
    constructor(type, target){
        this.target = target;
        this.type = type;
    }
}
class ErrorEvent extends Event {
    constructor(error, target){
        super("error", target);
        this.message = error.message;
        this.error = error;
    }
}
class CloseEvent extends Event {
    constructor(code = 1000, reason = "", target){
        super("close", target);
        this.wasClean = true;
        this.code = code;
        this.reason = reason;
    }
}
}),
"[project]/dist/esm/version.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SDK_VERSION",
    ()=>SDK_VERSION
]);
const SDK_VERSION = "0.15.9";
}),
"[project]/dist/esm/core/websocket/ws.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReconnectingWebSocket",
    ()=>ReconnectingWebSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ws$40$8$2e$18$2e$3$2f$node_modules$2f$ws$2f$wrapper$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ws@8.18.3/node_modules/ws/wrapper.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ws$40$8$2e$18$2e$3$2f$node_modules$2f$ws$2f$lib$2f$websocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__WebSocket$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ws@8.18.3/node_modules/ws/lib/websocket.js [app-ssr] (ecmascript) <export default as WebSocket>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$runtime$2f$runtime$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/runtime/runtime.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$url$2f$qs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/url/qs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$websocket$2f$events$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/websocket/events.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$version$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/version.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
const getGlobalWebSocket = ()=>{
    if (typeof WebSocket !== "undefined") {
        // @ts-ignore
        return WebSocket;
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$runtime$2f$runtime$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RUNTIME"].type === "node") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ws$40$8$2e$18$2e$3$2f$node_modules$2f$ws$2f$lib$2f$websocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__WebSocket$3e$__["WebSocket"];
    }
    return undefined;
};
/**
 * Returns true if given argument looks like a WebSocket class
 */ const isWebSocket = (w)=>typeof w !== "undefined" && !!w && w.CLOSING === 2;
const DEFAULT_OPTIONS = {
    maxReconnectionDelay: 10000,
    minReconnectionDelay: 1000 + Math.random() * 4000,
    minUptime: 5000,
    reconnectionDelayGrowFactor: 1.3,
    connectionTimeout: 4000,
    maxRetries: Infinity,
    maxEnqueuedMessages: Infinity,
    startClosed: false,
    debug: false
};
function addApiKeyFromHeader({ headers, queryParameters }) {
    var _a;
    const apiKeyValue = (_a = Object.entries(headers !== null && headers !== void 0 ? headers : {}).find(([k])=>k.toLowerCase() === "x-hume-api-key")) === null || _a === void 0 ? void 0 : _a[1];
    if (apiKeyValue && !(queryParameters === null || queryParameters === void 0 ? void 0 : queryParameters["api_key"])) {
        return Object.assign(Object.assign({}, queryParameters), {
            api_key: apiKeyValue
        });
    }
    return queryParameters;
}
function addAccessTokenFromHeader({ headers, queryParameters }) {
    const authHeaderValue = (headers === null || headers === void 0 ? void 0 : headers["Authorization"]) || (headers === null || headers === void 0 ? void 0 : headers["authorization"]);
    if (!authHeaderValue) {
        return queryParameters;
    }
    if (!authHeaderValue.startsWith("Bearer ")) {
        return queryParameters;
    }
    if (queryParameters === null || queryParameters === void 0 ? void 0 : queryParameters["access_token"]) {
        return queryParameters;
    }
    const token = authHeaderValue.substring("Bearer ".length);
    return Object.assign(Object.assign({}, queryParameters), {
        access_token: token
    });
}
function addSdkTracking(queryParameters) {
    return Object.assign(Object.assign({}, queryParameters), {
        fernSdkLanguage: "JavaScript",
        fernSdkVersion: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$version$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SDK_VERSION"]
    });
}
class ReconnectingWebSocket {
    constructor({ url, protocols, options, headers, queryParameters }){
        this._listeners = {
            error: [],
            message: [],
            open: [],
            close: []
        };
        this._retryCount = -1;
        this._shouldReconnect = true;
        this._connectLock = false;
        this._binaryType = "blob";
        this._closeCalled = false;
        this._messageQueue = [];
        /**
         * An event listener to be called when the WebSocket connection's readyState changes to CLOSED
         */ this.onclose = null;
        /**
         * An event listener to be called when an error occurs
         */ this.onerror = null;
        /**
         * An event listener to be called when a message is received from the server
         */ this.onmessage = null;
        /**
         * An event listener to be called when the WebSocket connection's readyState changes to OPEN;
         * this indicates that the connection is ready to send and receive data
         */ this.onopen = null;
        this._handleOpen = (event)=>{
            this._debug("open event");
            const { minUptime = DEFAULT_OPTIONS.minUptime } = this._options;
            clearTimeout(this._connectTimeout);
            this._uptimeTimeout = setTimeout(()=>this._acceptOpen(), minUptime);
            this._ws.binaryType = this._binaryType;
            // send enqueued messages (messages sent before websocket open event)
            this._messageQueue.forEach((message)=>{
                var _a;
                return (_a = this._ws) === null || _a === void 0 ? void 0 : _a.send(message);
            });
            this._messageQueue = [];
            if (this.onopen) {
                this.onopen(event);
            }
            this._listeners.open.forEach((listener)=>this._callEventListener(event, listener));
        };
        this._handleMessage = (event)=>{
            this._debug("message event");
            if (this.onmessage) {
                this.onmessage(event);
            }
            this._listeners.message.forEach((listener)=>this._callEventListener(event, listener));
        };
        this._handleError = (event)=>{
            this._debug("error event", event.message);
            this._disconnect(undefined, event.message === "TIMEOUT" ? "timeout" : undefined);
            if (this.onerror) {
                this.onerror(event);
            }
            this._debug("exec error listeners");
            this._listeners.error.forEach((listener)=>this._callEventListener(event, listener));
            this._connect();
        };
        this._handleClose = (event)=>{
            this._debug("close event");
            this._clearTimeouts();
            if (event.code === 1000) {
                this._shouldReconnect = false;
            }
            if (this._shouldReconnect) {
                this._connect();
            }
            if (this.onclose) {
                this.onclose(event);
            }
            this._listeners.close.forEach((listener)=>this._callEventListener(event, listener));
        };
        this._url = url;
        this._protocols = protocols;
        this._options = options !== null && options !== void 0 ? options : DEFAULT_OPTIONS;
        this._headers = headers;
        this._queryParameters = addSdkTracking(addAccessTokenFromHeader({
            headers,
            queryParameters: addApiKeyFromHeader({
                headers,
                queryParameters
            })
        }));
        if (this._options.startClosed) {
            this._shouldReconnect = false;
        }
        this._connect();
    }
    static get CONNECTING() {
        return 0;
    }
    static get OPEN() {
        return 1;
    }
    static get CLOSING() {
        return 2;
    }
    static get CLOSED() {
        return 3;
    }
    get CONNECTING() {
        return ReconnectingWebSocket.CONNECTING;
    }
    get OPEN() {
        return ReconnectingWebSocket.OPEN;
    }
    get CLOSING() {
        return ReconnectingWebSocket.CLOSING;
    }
    get CLOSED() {
        return ReconnectingWebSocket.CLOSED;
    }
    get binaryType() {
        return this._ws ? this._ws.binaryType : this._binaryType;
    }
    set binaryType(value) {
        this._binaryType = value;
        if (this._ws) {
            this._ws.binaryType = value;
        }
    }
    /**
     * Returns the number or connection retries
     */ get retryCount() {
        return Math.max(this._retryCount, 0);
    }
    /**
     * The number of bytes of data that have been queued using calls to send() but not yet
     * transmitted to the network. This value resets to zero once all queued data has been sent.
     * This value does not reset to zero when the connection is closed; if you keep calling send(),
     * this will continue to climb. Read only
     */ get bufferedAmount() {
        const bytes = this._messageQueue.reduce((acc, message)=>{
            if (typeof message === "string") {
                acc += message.length; // not byte size
            } else if (message instanceof Blob) {
                acc += message.size;
            } else {
                acc += message.byteLength;
            }
            return acc;
        }, 0);
        return bytes + (this._ws ? this._ws.bufferedAmount : 0);
    }
    /**
     * The extensions selected by the server. This is currently only the empty string or a list of
     * extensions as negotiated by the connection
     */ get extensions() {
        return this._ws ? this._ws.extensions : "";
    }
    /**
     * A string indicating the name of the sub-protocol the server selected;
     * this will be one of the strings specified in the protocols parameter when creating the
     * WebSocket object
     */ get protocol() {
        return this._ws ? this._ws.protocol : "";
    }
    /**
     * The current state of the connection; this is one of the Ready state constants
     */ get readyState() {
        if (this._ws) {
            return this._ws.readyState;
        }
        return this._options.startClosed ? ReconnectingWebSocket.CLOSED : ReconnectingWebSocket.CONNECTING;
    }
    /**
     * The URL as resolved by the constructor
     */ get url() {
        return this._ws ? this._ws.url : "";
    }
    /**
     * Closes the WebSocket connection or connection attempt, if any. If the connection is already
     * CLOSED, this method does nothing
     */ close(code = 1000, reason) {
        this._closeCalled = true;
        this._shouldReconnect = false;
        this._clearTimeouts();
        if (!this._ws) {
            this._debug("close enqueued: no ws instance");
            return;
        }
        if (this._ws.readyState === this.CLOSED) {
            this._debug("close: already closed");
            return;
        }
        this._ws.close(code, reason);
    }
    /**
     * Closes the WebSocket connection or connection attempt and connects again.
     * Resets retry counter;
     */ reconnect(code, reason) {
        this._shouldReconnect = true;
        this._closeCalled = false;
        this._retryCount = -1;
        if (!this._ws || this._ws.readyState === this.CLOSED) {
            this._connect();
        } else {
            this._disconnect(code, reason);
            this._connect();
        }
    }
    /**
     * Enqueue specified data to be transmitted to the server over the WebSocket connection
     */ send(data) {
        if (this._ws && this._ws.readyState === this.OPEN) {
            this._debug("send", data);
            this._ws.send(data);
        } else {
            const { maxEnqueuedMessages = DEFAULT_OPTIONS.maxEnqueuedMessages } = this._options;
            if (this._messageQueue.length < maxEnqueuedMessages) {
                this._debug("enqueue", data);
                this._messageQueue.push(data);
            }
        }
    }
    /**
     * Register an event handler of a specific event type
     */ addEventListener(type, listener) {
        if (this._listeners[type]) {
            // @ts-ignore
            this._listeners[type].push(listener);
        }
    }
    dispatchEvent(event) {
        const listeners = this._listeners[event.type];
        if (listeners) {
            for (const listener of listeners){
                this._callEventListener(event, listener);
            }
        }
        return true;
    }
    /**
     * Removes an event listener
     */ removeEventListener(type, listener) {
        if (this._listeners[type]) {
            // @ts-ignore
            this._listeners[type] = this._listeners[type].filter(// @ts-ignore
            (l)=>l !== listener);
        }
    }
    _debug(...args) {
        if (this._options.debug) {
            // not using spread because compiled version uses Symbols
            // tslint:disable-next-line
            // biome-ignore lint/suspicious/noConsole: allow console
            console.log.apply(console, [
                "RWS>",
                ...args
            ]);
        }
    }
    _getNextDelay() {
        const { reconnectionDelayGrowFactor = DEFAULT_OPTIONS.reconnectionDelayGrowFactor, minReconnectionDelay = DEFAULT_OPTIONS.minReconnectionDelay, maxReconnectionDelay = DEFAULT_OPTIONS.maxReconnectionDelay } = this._options;
        let delay = 0;
        if (this._retryCount > 0) {
            delay = minReconnectionDelay * Math.pow(reconnectionDelayGrowFactor, this._retryCount - 1);
            if (delay > maxReconnectionDelay) {
                delay = maxReconnectionDelay;
            }
        }
        this._debug("next delay", delay);
        return delay;
    }
    _wait() {
        return new Promise((resolve)=>{
            setTimeout(resolve, this._getNextDelay());
        });
    }
    _getNextUrl(urlProvider) {
        if (typeof urlProvider === "string") {
            return Promise.resolve(urlProvider);
        }
        if (typeof urlProvider === "function") {
            const url = urlProvider();
            if (typeof url === "string") {
                return Promise.resolve(url);
            }
            // @ts-ignore redundant check
            if (url.then) {
                return url;
            }
        }
        throw Error("Invalid URL");
    }
    _connect() {
        if (this._connectLock || !this._shouldReconnect) {
            return;
        }
        this._connectLock = true;
        const { maxRetries = DEFAULT_OPTIONS.maxRetries, connectionTimeout = DEFAULT_OPTIONS.connectionTimeout, WebSocket: WebSocket1 = getGlobalWebSocket() } = this._options;
        if (this._retryCount >= maxRetries) {
            this._debug("max retries reached", this._retryCount, ">=", maxRetries);
            return;
        }
        this._retryCount++;
        this._debug("connect", this._retryCount);
        this._removeListeners();
        if (!isWebSocket(WebSocket1)) {
            throw Error("No valid WebSocket class provided");
        }
        this._wait().then(()=>this._getNextUrl(this._url)).then((url)=>{
            if (this._closeCalled) {
                return;
            }
            const options = {};
            if (this._headers) {
                options.headers = this._headers;
            }
            if (this._queryParameters && Object.keys(this._queryParameters).length > 0) {
                const queryString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$url$2f$qs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toQueryString"])(this._queryParameters, {
                    arrayFormat: "repeat"
                });
                if (queryString) {
                    url = `${url}?${queryString}`;
                }
            }
            this._ws = new WebSocket1(url, this._protocols, options);
            this._ws.binaryType = this._binaryType;
            this._connectLock = false;
            this._addListeners();
            this._connectTimeout = setTimeout(()=>this._handleTimeout(), connectionTimeout);
        });
    }
    _handleTimeout() {
        this._debug("timeout event");
        this._handleError(new __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$websocket$2f$events$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ErrorEvent"](Error("TIMEOUT"), this));
    }
    _disconnect(code = 1000, reason) {
        this._clearTimeouts();
        if (!this._ws) {
            return;
        }
        this._removeListeners();
        try {
            this._ws.close(code, reason);
            this._handleClose(new __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$websocket$2f$events$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CloseEvent"](code, reason, this));
        } catch (error) {
        // ignore
        }
    }
    _acceptOpen() {
        this._debug("accept open");
        this._retryCount = 0;
    }
    _callEventListener(event, listener) {
        if ("handleEvent" in listener) {
            // @ts-ignore
            listener.handleEvent(event);
        } else {
            // @ts-ignore
            listener(event);
        }
    }
    _removeListeners() {
        if (!this._ws) {
            return;
        }
        this._debug("removeListeners");
        this._ws.removeEventListener("open", this._handleOpen);
        this._ws.removeEventListener("close", this._handleClose);
        this._ws.removeEventListener("message", this._handleMessage);
        // @ts-ignore
        this._ws.removeEventListener("error", this._handleError);
    }
    _addListeners() {
        if (!this._ws) {
            return;
        }
        this._debug("addListeners");
        this._ws.addEventListener("open", this._handleOpen);
        this._ws.addEventListener("close", this._handleClose);
        this._ws.addEventListener("message", this._handleMessage);
        // @ts-ignore
        this._ws.addEventListener("error", this._handleError);
    }
    _clearTimeouts() {
        clearTimeout(this._connectTimeout);
        clearTimeout(this._uptimeTimeout);
    }
}
}),
"[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/dist/esm/core/schemas/builders/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/dist/esm/core/schemas/builders/bigint/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/dist/esm/core/schemas/Schema.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SchemaType",
    ()=>SchemaType
]);
const SchemaType = {
    BIGINT: "bigint",
    DATE: "date",
    ENUM: "enum",
    LIST: "list",
    STRING_LITERAL: "stringLiteral",
    BOOLEAN_LITERAL: "booleanLiteral",
    OBJECT: "object",
    ANY: "any",
    BOOLEAN: "boolean",
    NUMBER: "number",
    STRING: "string",
    UNKNOWN: "unknown",
    RECORD: "record",
    SET: "set",
    UNION: "union",
    UNDISCRIMINATED_UNION: "undiscriminatedUnion",
    NULLABLE: "nullable",
    OPTIONAL: "optional",
    OPTIONAL_NULLABLE: "optionalNullable"
};
}),
"[project]/dist/esm/core/schemas/utils/getErrorMessageForIncorrectType.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getErrorMessageForIncorrectType",
    ()=>getErrorMessageForIncorrectType
]);
function getErrorMessageForIncorrectType(value, expectedType) {
    return `Expected ${expectedType}. Received ${getTypeAsString(value)}.`;
}
function getTypeAsString(value) {
    if (Array.isArray(value)) {
        return "list";
    }
    if (value === null) {
        return "null";
    }
    if (value instanceof BigInt) {
        return "BigInt";
    }
    switch(typeof value){
        case "string":
            return `"${value}"`;
        case "bigint":
        case "number":
        case "boolean":
        case "undefined":
            return `${value}`;
    }
    return typeof value;
}
}),
"[project]/dist/esm/core/schemas/utils/maybeSkipValidation.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "maybeSkipValidation",
    ()=>maybeSkipValidation
]);
function maybeSkipValidation(schema) {
    return Object.assign(Object.assign({}, schema), {
        json: transformAndMaybeSkipValidation(schema.json),
        parse: transformAndMaybeSkipValidation(schema.parse)
    });
}
function transformAndMaybeSkipValidation(transform) {
    return (value, opts)=>{
        const transformed = transform(value, opts);
        const { skipValidation = false } = opts !== null && opts !== void 0 ? opts : {};
        if (!transformed.ok && skipValidation) {
            // biome-ignore lint/suspicious/noConsole: allow console
            console.warn([
                "Failed to validate.",
                ...transformed.errors.map((error)=>"  - " + (error.path.length > 0 ? `${error.path.join(".")}: ${error.message}` : error.message))
            ].join("\n"));
            return {
                ok: true,
                value: value
            };
        } else {
            return transformed;
        }
    };
}
}),
"[project]/dist/esm/core/schemas/builders/schema-utils/stringifyValidationErrors.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "stringifyValidationError",
    ()=>stringifyValidationError
]);
function stringifyValidationError(error) {
    if (error.path.length === 0) {
        return error.message;
    }
    return `${error.path.join(" -> ")}: ${error.message}`;
}
}),
"[project]/dist/esm/core/schemas/builders/schema-utils/JsonError.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JsonError",
    ()=>JsonError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$stringifyValidationErrors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/stringifyValidationErrors.mjs [app-ssr] (ecmascript)");
;
class JsonError extends Error {
    constructor(errors){
        super(errors.map(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$stringifyValidationErrors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringifyValidationError"]).join("; "));
        this.errors = errors;
        Object.setPrototypeOf(this, JsonError.prototype);
    }
}
}),
"[project]/dist/esm/core/schemas/builders/schema-utils/ParseError.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ParseError",
    ()=>ParseError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$stringifyValidationErrors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/stringifyValidationErrors.mjs [app-ssr] (ecmascript)");
;
class ParseError extends Error {
    constructor(errors){
        super(errors.map(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$stringifyValidationErrors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringifyValidationError"]).join("; "));
        this.errors = errors;
        Object.setPrototypeOf(this, ParseError.prototype);
    }
}
}),
"[project]/dist/esm/core/schemas/builders/schema-utils/getSchemaUtils.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSchemaUtils",
    ()=>getSchemaUtils,
    "nullable",
    ()=>nullable,
    "optional",
    ()=>optional,
    "optionalNullable",
    ()=>optionalNullable,
    "transform",
    ()=>transform
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/Schema.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$JsonError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/JsonError.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$ParseError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/ParseError.mjs [app-ssr] (ecmascript)");
;
;
;
function getSchemaUtils(schema) {
    return {
        nullable: ()=>nullable(schema),
        optional: ()=>optional(schema),
        optionalNullable: ()=>optionalNullable(schema),
        transform: (transformer)=>transform(schema, transformer),
        parseOrThrow: (raw, opts)=>{
            const parsed = schema.parse(raw, opts);
            if (parsed.ok) {
                return parsed.value;
            }
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$ParseError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ParseError"](parsed.errors);
        },
        jsonOrThrow: (parsed, opts)=>{
            const raw = schema.json(parsed, opts);
            if (raw.ok) {
                return raw.value;
            }
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$JsonError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonError"](raw.errors);
        }
    };
}
function nullable(schema) {
    const baseSchema = {
        parse: (raw, opts)=>{
            if (raw == null) {
                return {
                    ok: true,
                    value: null
                };
            }
            return schema.parse(raw, opts);
        },
        json: (parsed, opts)=>{
            if (parsed == null) {
                return {
                    ok: true,
                    value: null
                };
            }
            return schema.json(parsed, opts);
        },
        getType: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].NULLABLE
    };
    return Object.assign(Object.assign({}, baseSchema), getSchemaUtils(baseSchema));
}
function optional(schema) {
    const baseSchema = {
        parse: (raw, opts)=>{
            if (raw == null) {
                return {
                    ok: true,
                    value: undefined
                };
            }
            return schema.parse(raw, opts);
        },
        json: (parsed, opts)=>{
            if ((opts === null || opts === void 0 ? void 0 : opts.omitUndefined) && parsed === undefined) {
                return {
                    ok: true,
                    value: undefined
                };
            }
            if (parsed == null) {
                return {
                    ok: true,
                    value: null
                };
            }
            return schema.json(parsed, opts);
        },
        getType: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].OPTIONAL
    };
    return Object.assign(Object.assign({}, baseSchema), getSchemaUtils(baseSchema));
}
function optionalNullable(schema) {
    const baseSchema = {
        parse: (raw, opts)=>{
            if (raw === undefined) {
                return {
                    ok: true,
                    value: undefined
                };
            }
            if (raw === null) {
                return {
                    ok: true,
                    value: null
                };
            }
            return schema.parse(raw, opts);
        },
        json: (parsed, opts)=>{
            if (parsed === undefined) {
                return {
                    ok: true,
                    value: undefined
                };
            }
            if (parsed === null) {
                return {
                    ok: true,
                    value: null
                };
            }
            return schema.json(parsed, opts);
        },
        getType: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].OPTIONAL_NULLABLE
    };
    return Object.assign(Object.assign({}, baseSchema), getSchemaUtils(baseSchema));
}
function transform(schema, transformer) {
    const baseSchema = {
        parse: (raw, opts)=>{
            const parsed = schema.parse(raw, opts);
            if (!parsed.ok) {
                return parsed;
            }
            return {
                ok: true,
                value: transformer.transform(parsed.value)
            };
        },
        json: (transformed, opts)=>{
            const parsed = transformer.untransform(transformed);
            return schema.json(parsed, opts);
        },
        getType: ()=>schema.getType()
    };
    return Object.assign(Object.assign({}, baseSchema), getSchemaUtils(baseSchema));
}
}),
"[project]/dist/esm/core/schemas/builders/bigint/bigint.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bigint",
    ()=>bigint
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/Schema.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/getErrorMessageForIncorrectType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$maybeSkipValidation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/maybeSkipValidation.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/getSchemaUtils.mjs [app-ssr] (ecmascript)");
;
;
;
;
function bigint() {
    const baseSchema = {
        parse: (raw, { breadcrumbsPrefix = [] } = {})=>{
            if (typeof raw === "bigint") {
                return {
                    ok: true,
                    value: raw
                };
            }
            if (typeof raw === "number") {
                return {
                    ok: true,
                    value: BigInt(raw)
                };
            }
            return {
                ok: false,
                errors: [
                    {
                        path: breadcrumbsPrefix,
                        message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorMessageForIncorrectType"])(raw, "bigint | number")
                    }
                ]
            };
        },
        json: (bigint, { breadcrumbsPrefix = [] } = {})=>{
            if (typeof bigint !== "bigint") {
                return {
                    ok: false,
                    errors: [
                        {
                            path: breadcrumbsPrefix,
                            message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorMessageForIncorrectType"])(bigint, "bigint")
                        }
                    ]
                };
            }
            return {
                ok: true,
                value: bigint
            };
        },
        getType: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].BIGINT
    };
    return Object.assign(Object.assign({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$maybeSkipValidation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maybeSkipValidation"])(baseSchema)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSchemaUtils"])(baseSchema));
}
}),
"[project]/dist/esm/core/schemas/builders/bigint/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bigint",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$bigint$2f$bigint$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bigint"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$bigint$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/bigint/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$bigint$2f$bigint$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/bigint/bigint.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/core/schemas/builders/date/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/dist/esm/core/schemas/builders/date/date.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "date",
    ()=>date
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/Schema.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/getErrorMessageForIncorrectType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$maybeSkipValidation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/maybeSkipValidation.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/getSchemaUtils.mjs [app-ssr] (ecmascript)");
;
;
;
;
// https://stackoverflow.com/questions/12756159/regex-and-iso8601-formatted-datetime
const ISO_8601_REGEX = /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
function date() {
    const baseSchema = {
        parse: (raw, { breadcrumbsPrefix = [] } = {})=>{
            if (typeof raw !== "string") {
                return {
                    ok: false,
                    errors: [
                        {
                            path: breadcrumbsPrefix,
                            message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorMessageForIncorrectType"])(raw, "string")
                        }
                    ]
                };
            }
            if (!ISO_8601_REGEX.test(raw)) {
                return {
                    ok: false,
                    errors: [
                        {
                            path: breadcrumbsPrefix,
                            message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorMessageForIncorrectType"])(raw, "ISO 8601 date string")
                        }
                    ]
                };
            }
            return {
                ok: true,
                value: new Date(raw)
            };
        },
        json: (date, { breadcrumbsPrefix = [] } = {})=>{
            if (date instanceof Date) {
                return {
                    ok: true,
                    value: date.toISOString()
                };
            } else {
                return {
                    ok: false,
                    errors: [
                        {
                            path: breadcrumbsPrefix,
                            message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorMessageForIncorrectType"])(date, "Date object")
                        }
                    ]
                };
            }
        },
        getType: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].DATE
    };
    return Object.assign(Object.assign({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$maybeSkipValidation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maybeSkipValidation"])(baseSchema)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSchemaUtils"])(baseSchema));
}
}),
"[project]/dist/esm/core/schemas/builders/date/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "date",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$date$2f$date$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["date"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$date$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/date/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$date$2f$date$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/date/date.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/core/schemas/builders/enum/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/dist/esm/core/schemas/utils/createIdentitySchemaCreator.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createIdentitySchemaCreator",
    ()=>createIdentitySchemaCreator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/getSchemaUtils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$maybeSkipValidation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/maybeSkipValidation.mjs [app-ssr] (ecmascript)");
;
;
function createIdentitySchemaCreator(schemaType, validate) {
    return ()=>{
        const baseSchema = {
            parse: validate,
            json: validate,
            getType: ()=>schemaType
        };
        return Object.assign(Object.assign({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$maybeSkipValidation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maybeSkipValidation"])(baseSchema)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSchemaUtils"])(baseSchema));
    };
}
}),
"[project]/dist/esm/core/schemas/builders/enum/enum.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "enum_",
    ()=>enum_
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/Schema.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$createIdentitySchemaCreator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/createIdentitySchemaCreator.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/getErrorMessageForIncorrectType.mjs [app-ssr] (ecmascript)");
;
;
;
function enum_(values) {
    const validValues = new Set(values);
    const schemaCreator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$createIdentitySchemaCreator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createIdentitySchemaCreator"])(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].ENUM, (value, { allowUnrecognizedEnumValues, breadcrumbsPrefix = [] } = {})=>{
        if (typeof value !== "string") {
            return {
                ok: false,
                errors: [
                    {
                        path: breadcrumbsPrefix,
                        message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorMessageForIncorrectType"])(value, "string")
                    }
                ]
            };
        }
        if (!validValues.has(value) && !allowUnrecognizedEnumValues) {
            return {
                ok: false,
                errors: [
                    {
                        path: breadcrumbsPrefix,
                        message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorMessageForIncorrectType"])(value, "enum")
                    }
                ]
            };
        }
        return {
            ok: true,
            value: value
        };
    });
    return schemaCreator();
}
}),
"[project]/dist/esm/core/schemas/builders/enum/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "enum_",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$enum$2f$enum$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enum_"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$enum$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/enum/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$enum$2f$enum$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/enum/enum.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/core/schemas/builders/lazy/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
}),
"[project]/dist/esm/core/schemas/builders/lazy/lazy.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "constructLazyBaseSchema",
    ()=>constructLazyBaseSchema,
    "getMemoizedSchema",
    ()=>getMemoizedSchema,
    "lazy",
    ()=>lazy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/getSchemaUtils.mjs [app-ssr] (ecmascript)");
;
function lazy(getter) {
    const baseSchema = constructLazyBaseSchema(getter);
    return Object.assign(Object.assign({}, baseSchema), (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSchemaUtils"])(baseSchema));
}
function constructLazyBaseSchema(getter) {
    return {
        parse: (raw, opts)=>getMemoizedSchema(getter).parse(raw, opts),
        json: (parsed, opts)=>getMemoizedSchema(getter).json(parsed, opts),
        getType: ()=>getMemoizedSchema(getter).getType()
    };
}
function getMemoizedSchema(getter) {
    const castedGetter = getter;
    if (castedGetter.__zurg_memoized == null) {
        castedGetter.__zurg_memoized = getter();
    }
    return castedGetter.__zurg_memoized;
}
}),
"[project]/dist/esm/core/schemas/utils/entries.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "entries",
    ()=>entries
]);
function entries(object) {
    return Object.entries(object);
}
}),
"[project]/dist/esm/core/schemas/utils/filterObject.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "filterObject",
    ()=>filterObject
]);
function filterObject(obj, keysToInclude) {
    const keysToIncludeSet = new Set(keysToInclude);
    return Object.entries(obj).reduce((acc, [key, value])=>{
        if (keysToIncludeSet.has(key)) {
            acc[key] = value;
        }
        return acc;
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
    }, {});
}
}),
"[project]/dist/esm/core/schemas/utils/isPlainObject.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// borrowed from https://github.com/lodash/lodash/blob/master/isPlainObject.js
__turbopack_context__.s([
    "isPlainObject",
    ()=>isPlainObject
]);
function isPlainObject(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    if (Object.getPrototypeOf(value) === null) {
        return true;
    }
    let proto = value;
    while(Object.getPrototypeOf(proto) !== null){
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(value) === proto;
}
}),
"[project]/dist/esm/core/schemas/utils/keys.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "keys",
    ()=>keys
]);
function keys(object) {
    return Object.keys(object);
}
}),
"[project]/dist/esm/core/schemas/utils/partition.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "partition",
    ()=>partition
]);
function partition(items, predicate) {
    const trueItems = [], falseItems = [];
    for (const item of items){
        if (predicate(item)) {
            trueItems.push(item);
        } else {
            falseItems.push(item);
        }
    }
    return [
        trueItems,
        falseItems
    ];
}
}),
"[project]/dist/esm/core/schemas/builders/object-like/getObjectLikeUtils.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getObjectLikeUtils",
    ()=>getObjectLikeUtils,
    "withParsedProperties",
    ()=>withParsedProperties
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$filterObject$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/filterObject.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/getErrorMessageForIncorrectType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$isPlainObject$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/isPlainObject.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/getSchemaUtils.mjs [app-ssr] (ecmascript)");
;
;
;
;
function getObjectLikeUtils(schema) {
    return {
        withParsedProperties: (properties)=>withParsedProperties(schema, properties)
    };
}
function withParsedProperties(objectLike, properties) {
    const objectSchema = {
        parse: (raw, opts)=>{
            const parsedObject = objectLike.parse(raw, opts);
            if (!parsedObject.ok) {
                return parsedObject;
            }
            const additionalProperties = Object.entries(properties).reduce((processed, [key, value])=>{
                return Object.assign(Object.assign({}, processed), {
                    [key]: typeof value === "function" ? value(parsedObject.value) : value
                });
            }, {});
            return {
                ok: true,
                value: Object.assign(Object.assign({}, parsedObject.value), additionalProperties)
            };
        },
        json: (parsed, opts)=>{
            var _a;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$isPlainObject$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPlainObject"])(parsed)) {
                return {
                    ok: false,
                    errors: [
                        {
                            path: (_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [],
                            message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorMessageForIncorrectType"])(parsed, "object")
                        }
                    ]
                };
            }
            // strip out added properties
            const addedPropertyKeys = new Set(Object.keys(properties));
            const parsedWithoutAddedProperties = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$filterObject$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["filterObject"])(parsed, Object.keys(parsed).filter((key)=>!addedPropertyKeys.has(key)));
            return objectLike.json(parsedWithoutAddedProperties, opts);
        },
        getType: ()=>objectLike.getType()
    };
    return Object.assign(Object.assign(Object.assign({}, objectSchema), (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSchemaUtils"])(objectSchema)), getObjectLikeUtils(objectSchema));
}
}),
"[project]/dist/esm/core/schemas/builders/object/property.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isProperty",
    ()=>isProperty,
    "property",
    ()=>property
]);
function property(rawKey, valueSchema) {
    return {
        rawKey,
        valueSchema,
        isProperty: true
    };
}
function isProperty(maybeProperty) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return maybeProperty.isProperty;
}
}),
"[project]/dist/esm/core/schemas/builders/object/object.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getObjectUtils",
    ()=>getObjectUtils,
    "object",
    ()=>object
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/Schema.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$entries$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/entries.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$filterObject$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/filterObject.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/getErrorMessageForIncorrectType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$isPlainObject$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/isPlainObject.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$keys$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/keys.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$maybeSkipValidation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/maybeSkipValidation.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$partition$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/partition.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2d$like$2f$getObjectLikeUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/object-like/getObjectLikeUtils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/getSchemaUtils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$property$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/object/property.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
function object(schemas) {
    const baseSchema = {
        _getRawProperties: ()=>Object.entries(schemas).map(([parsedKey, propertySchema])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$property$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isProperty"])(propertySchema) ? propertySchema.rawKey : parsedKey),
        _getParsedProperties: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$keys$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keys"])(schemas),
        parse: (raw, opts)=>{
            const rawKeyToProperty = {};
            const requiredKeys = [];
            for (const [parsedKey, schemaOrObjectProperty] of (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$entries$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["entries"])(schemas)){
                const rawKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$property$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isProperty"])(schemaOrObjectProperty) ? schemaOrObjectProperty.rawKey : parsedKey;
                const valueSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$property$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isProperty"])(schemaOrObjectProperty) ? schemaOrObjectProperty.valueSchema : schemaOrObjectProperty;
                const property = {
                    rawKey,
                    parsedKey: parsedKey,
                    valueSchema
                };
                rawKeyToProperty[rawKey] = property;
                if (isSchemaRequired(valueSchema)) {
                    requiredKeys.push(rawKey);
                }
            }
            return validateAndTransformObject({
                value: raw,
                requiredKeys,
                getProperty: (rawKey)=>{
                    const property = rawKeyToProperty[rawKey];
                    if (property == null) {
                        return undefined;
                    }
                    return {
                        transformedKey: property.parsedKey,
                        transform: (propertyValue)=>{
                            var _a;
                            return property.valueSchema.parse(propertyValue, Object.assign(Object.assign({}, opts), {
                                breadcrumbsPrefix: [
                                    ...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [],
                                    rawKey
                                ]
                            }));
                        }
                    };
                },
                unrecognizedObjectKeys: opts === null || opts === void 0 ? void 0 : opts.unrecognizedObjectKeys,
                skipValidation: opts === null || opts === void 0 ? void 0 : opts.skipValidation,
                breadcrumbsPrefix: opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix,
                omitUndefined: opts === null || opts === void 0 ? void 0 : opts.omitUndefined
            });
        },
        json: (parsed, opts)=>{
            const requiredKeys = [];
            for (const [parsedKey, schemaOrObjectProperty] of (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$entries$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["entries"])(schemas)){
                const valueSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$property$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isProperty"])(schemaOrObjectProperty) ? schemaOrObjectProperty.valueSchema : schemaOrObjectProperty;
                if (isSchemaRequired(valueSchema)) {
                    requiredKeys.push(parsedKey);
                }
            }
            return validateAndTransformObject({
                value: parsed,
                requiredKeys,
                getProperty: (parsedKey)=>{
                    const property = schemas[parsedKey];
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    if (property == null) {
                        return undefined;
                    }
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$property$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isProperty"])(property)) {
                        return {
                            transformedKey: property.rawKey,
                            transform: (propertyValue)=>{
                                var _a;
                                return property.valueSchema.json(propertyValue, Object.assign(Object.assign({}, opts), {
                                    breadcrumbsPrefix: [
                                        ...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [],
                                        parsedKey
                                    ]
                                }));
                            }
                        };
                    } else {
                        return {
                            transformedKey: parsedKey,
                            transform: (propertyValue)=>{
                                var _a;
                                return property.json(propertyValue, Object.assign(Object.assign({}, opts), {
                                    breadcrumbsPrefix: [
                                        ...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [],
                                        parsedKey
                                    ]
                                }));
                            }
                        };
                    }
                },
                unrecognizedObjectKeys: opts === null || opts === void 0 ? void 0 : opts.unrecognizedObjectKeys,
                skipValidation: opts === null || opts === void 0 ? void 0 : opts.skipValidation,
                breadcrumbsPrefix: opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix,
                omitUndefined: opts === null || opts === void 0 ? void 0 : opts.omitUndefined
            });
        },
        getType: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].OBJECT
    };
    return Object.assign(Object.assign(Object.assign(Object.assign({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$maybeSkipValidation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maybeSkipValidation"])(baseSchema)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSchemaUtils"])(baseSchema)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2d$like$2f$getObjectLikeUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getObjectLikeUtils"])(baseSchema)), getObjectUtils(baseSchema));
}
function validateAndTransformObject({ value, requiredKeys, getProperty, unrecognizedObjectKeys = "fail", skipValidation = false, breadcrumbsPrefix = [] }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$isPlainObject$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPlainObject"])(value)) {
        return {
            ok: false,
            errors: [
                {
                    path: breadcrumbsPrefix,
                    message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorMessageForIncorrectType"])(value, "object")
                }
            ]
        };
    }
    const missingRequiredKeys = new Set(requiredKeys);
    const errors = [];
    const transformed = {};
    for (const [preTransformedKey, preTransformedItemValue] of Object.entries(value)){
        const property = getProperty(preTransformedKey);
        if (property != null) {
            missingRequiredKeys.delete(preTransformedKey);
            const value = property.transform(preTransformedItemValue);
            if (value.ok) {
                transformed[property.transformedKey] = value.value;
            } else {
                transformed[preTransformedKey] = preTransformedItemValue;
                errors.push(...value.errors);
            }
        } else {
            switch(unrecognizedObjectKeys){
                case "fail":
                    errors.push({
                        path: [
                            ...breadcrumbsPrefix,
                            preTransformedKey
                        ],
                        message: `Unexpected key "${preTransformedKey}"`
                    });
                    break;
                case "strip":
                    break;
                case "passthrough":
                    transformed[preTransformedKey] = preTransformedItemValue;
                    break;
            }
        }
    }
    errors.push(...requiredKeys.filter((key)=>missingRequiredKeys.has(key)).map((key)=>({
            path: breadcrumbsPrefix,
            message: `Missing required key "${key}"`
        })));
    if (errors.length === 0 || skipValidation) {
        return {
            ok: true,
            value: transformed
        };
    } else {
        return {
            ok: false,
            errors
        };
    }
}
function getObjectUtils(schema) {
    return {
        extend: (extension)=>{
            const baseSchema = {
                _getParsedProperties: ()=>[
                        ...schema._getParsedProperties(),
                        ...extension._getParsedProperties()
                    ],
                _getRawProperties: ()=>[
                        ...schema._getRawProperties(),
                        ...extension._getRawProperties()
                    ],
                parse: (raw, opts)=>{
                    return validateAndTransformExtendedObject({
                        extensionKeys: extension._getRawProperties(),
                        value: raw,
                        transformBase: (rawBase)=>schema.parse(rawBase, opts),
                        transformExtension: (rawExtension)=>extension.parse(rawExtension, opts)
                    });
                },
                json: (parsed, opts)=>{
                    return validateAndTransformExtendedObject({
                        extensionKeys: extension._getParsedProperties(),
                        value: parsed,
                        transformBase: (parsedBase)=>schema.json(parsedBase, opts),
                        transformExtension: (parsedExtension)=>extension.json(parsedExtension, opts)
                    });
                },
                getType: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].OBJECT
            };
            return Object.assign(Object.assign(Object.assign(Object.assign({}, baseSchema), (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSchemaUtils"])(baseSchema)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2d$like$2f$getObjectLikeUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getObjectLikeUtils"])(baseSchema)), getObjectUtils(baseSchema));
        },
        passthrough: ()=>{
            const baseSchema = {
                _getParsedProperties: ()=>schema._getParsedProperties(),
                _getRawProperties: ()=>schema._getRawProperties(),
                parse: (raw, opts)=>{
                    const transformed = schema.parse(raw, Object.assign(Object.assign({}, opts), {
                        unrecognizedObjectKeys: "passthrough"
                    }));
                    if (!transformed.ok) {
                        return transformed;
                    }
                    return {
                        ok: true,
                        value: Object.assign(Object.assign({}, raw), transformed.value)
                    };
                },
                json: (parsed, opts)=>{
                    const transformed = schema.json(parsed, Object.assign(Object.assign({}, opts), {
                        unrecognizedObjectKeys: "passthrough"
                    }));
                    if (!transformed.ok) {
                        return transformed;
                    }
                    return {
                        ok: true,
                        value: Object.assign(Object.assign({}, parsed), transformed.value)
                    };
                },
                getType: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].OBJECT
            };
            return Object.assign(Object.assign(Object.assign(Object.assign({}, baseSchema), (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSchemaUtils"])(baseSchema)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2d$like$2f$getObjectLikeUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getObjectLikeUtils"])(baseSchema)), getObjectUtils(baseSchema));
        }
    };
}
function validateAndTransformExtendedObject({ extensionKeys, value, transformBase, transformExtension }) {
    const extensionPropertiesSet = new Set(extensionKeys);
    const [extensionProperties, baseProperties] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$partition$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["partition"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$keys$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keys"])(value), (key)=>extensionPropertiesSet.has(key));
    const transformedBase = transformBase((0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$filterObject$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["filterObject"])(value, baseProperties));
    const transformedExtension = transformExtension((0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$filterObject$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["filterObject"])(value, extensionProperties));
    if (transformedBase.ok && transformedExtension.ok) {
        return {
            ok: true,
            value: Object.assign(Object.assign({}, transformedBase.value), transformedExtension.value)
        };
    } else {
        return {
            ok: false,
            errors: [
                ...transformedBase.ok ? [] : transformedBase.errors,
                ...transformedExtension.ok ? [] : transformedExtension.errors
            ]
        };
    }
}
function isSchemaRequired(schema) {
    return !isSchemaOptional(schema);
}
function isSchemaOptional(schema) {
    switch(schema.getType()){
        case __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].ANY:
        case __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].UNKNOWN:
        case __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].OPTIONAL:
        case __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].OPTIONAL_NULLABLE:
            return true;
        default:
            return false;
    }
}
}),
"[project]/dist/esm/core/schemas/builders/lazy/lazyObject.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "lazyObject",
    ()=>lazyObject
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$object$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/object/object.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2d$like$2f$getObjectLikeUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/object-like/getObjectLikeUtils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/getSchemaUtils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$lazy$2f$lazy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/lazy/lazy.mjs [app-ssr] (ecmascript)");
;
;
;
;
function lazyObject(getter) {
    const baseSchema = Object.assign(Object.assign({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$lazy$2f$lazy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["constructLazyBaseSchema"])(getter)), {
        _getRawProperties: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$lazy$2f$lazy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMemoizedSchema"])(getter)._getRawProperties(),
        _getParsedProperties: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$lazy$2f$lazy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMemoizedSchema"])(getter)._getParsedProperties()
    });
    return Object.assign(Object.assign(Object.assign(Object.assign({}, baseSchema), (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSchemaUtils"])(baseSchema)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2d$like$2f$getObjectLikeUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getObjectLikeUtils"])(baseSchema)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$object$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getObjectUtils"])(baseSchema));
}
}),
"[project]/dist/esm/core/schemas/builders/lazy/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "lazy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$lazy$2f$lazy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"],
    "lazyObject",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$lazy$2f$lazyObject$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazyObject"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$lazy$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/lazy/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$lazy$2f$lazy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/lazy/lazy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$lazy$2f$lazyObject$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/lazy/lazyObject.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/core/schemas/builders/list/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/dist/esm/core/schemas/builders/list/list.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "list",
    ()=>list
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/Schema.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/getErrorMessageForIncorrectType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$maybeSkipValidation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/maybeSkipValidation.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/getSchemaUtils.mjs [app-ssr] (ecmascript)");
;
;
;
;
function list(schema) {
    const baseSchema = {
        parse: (raw, opts)=>validateAndTransformArray(raw, (item, index)=>{
                var _a;
                return schema.parse(item, Object.assign(Object.assign({}, opts), {
                    breadcrumbsPrefix: [
                        ...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [],
                        `[${index}]`
                    ]
                }));
            }),
        json: (parsed, opts)=>validateAndTransformArray(parsed, (item, index)=>{
                var _a;
                return schema.json(item, Object.assign(Object.assign({}, opts), {
                    breadcrumbsPrefix: [
                        ...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [],
                        `[${index}]`
                    ]
                }));
            }),
        getType: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].LIST
    };
    return Object.assign(Object.assign({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$maybeSkipValidation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maybeSkipValidation"])(baseSchema)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSchemaUtils"])(baseSchema));
}
function validateAndTransformArray(value, transformItem) {
    if (!Array.isArray(value)) {
        return {
            ok: false,
            errors: [
                {
                    message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorMessageForIncorrectType"])(value, "list"),
                    path: []
                }
            ]
        };
    }
    const maybeValidItems = value.map((item, index)=>transformItem(item, index));
    return maybeValidItems.reduce((acc, item)=>{
        if (acc.ok && item.ok) {
            return {
                ok: true,
                value: [
                    ...acc.value,
                    item.value
                ]
            };
        }
        const errors = [];
        if (!acc.ok) {
            errors.push(...acc.errors);
        }
        if (!item.ok) {
            errors.push(...item.errors);
        }
        return {
            ok: false,
            errors
        };
    }, {
        ok: true,
        value: []
    });
}
}),
"[project]/dist/esm/core/schemas/builders/list/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "list",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$list$2f$list$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["list"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$list$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/list/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$list$2f$list$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/list/list.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/core/schemas/builders/literals/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
}),
"[project]/dist/esm/core/schemas/builders/literals/booleanLiteral.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "booleanLiteral",
    ()=>booleanLiteral
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/Schema.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$createIdentitySchemaCreator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/createIdentitySchemaCreator.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/getErrorMessageForIncorrectType.mjs [app-ssr] (ecmascript)");
;
;
;
function booleanLiteral(literal) {
    const schemaCreator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$createIdentitySchemaCreator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createIdentitySchemaCreator"])(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].BOOLEAN_LITERAL, (value, { breadcrumbsPrefix = [] } = {})=>{
        if (value === literal) {
            return {
                ok: true,
                value: literal
            };
        } else {
            return {
                ok: false,
                errors: [
                    {
                        path: breadcrumbsPrefix,
                        message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorMessageForIncorrectType"])(value, `${literal.toString()}`)
                    }
                ]
            };
        }
    });
    return schemaCreator();
}
}),
"[project]/dist/esm/core/schemas/builders/literals/stringLiteral.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "stringLiteral",
    ()=>stringLiteral
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/Schema.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$createIdentitySchemaCreator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/createIdentitySchemaCreator.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/getErrorMessageForIncorrectType.mjs [app-ssr] (ecmascript)");
;
;
;
function stringLiteral(literal) {
    const schemaCreator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$createIdentitySchemaCreator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createIdentitySchemaCreator"])(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].STRING_LITERAL, (value, { breadcrumbsPrefix = [] } = {})=>{
        if (value === literal) {
            return {
                ok: true,
                value: literal
            };
        } else {
            return {
                ok: false,
                errors: [
                    {
                        path: breadcrumbsPrefix,
                        message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorMessageForIncorrectType"])(value, `"${literal}"`)
                    }
                ]
            };
        }
    });
    return schemaCreator();
}
}),
"[project]/dist/esm/core/schemas/builders/literals/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "booleanLiteral",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$literals$2f$booleanLiteral$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanLiteral"],
    "stringLiteral",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$literals$2f$stringLiteral$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringLiteral"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$literals$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/literals/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$literals$2f$booleanLiteral$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/literals/booleanLiteral.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$literals$2f$stringLiteral$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/literals/stringLiteral.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/core/schemas/builders/object/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
}),
"[project]/dist/esm/core/schemas/builders/object/objectWithoutOptionalProperties.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "objectWithoutOptionalProperties",
    ()=>objectWithoutOptionalProperties
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$object$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/object/object.mjs [app-ssr] (ecmascript)");
;
function objectWithoutOptionalProperties(schemas) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$object$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"])(schemas);
}
}),
"[project]/dist/esm/core/schemas/builders/object/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getObjectUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$object$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getObjectUtils"],
    "isProperty",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$property$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isProperty"],
    "object",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$object$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"],
    "objectWithoutOptionalProperties",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$objectWithoutOptionalProperties$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["objectWithoutOptionalProperties"],
    "property",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$property$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["property"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/object/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$object$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/object/object.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$objectWithoutOptionalProperties$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/object/objectWithoutOptionalProperties.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$property$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/object/property.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/core/schemas/builders/object-like/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/dist/esm/core/schemas/builders/object-like/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getObjectLikeUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2d$like$2f$getObjectLikeUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getObjectLikeUtils"],
    "withParsedProperties",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2d$like$2f$getObjectLikeUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withParsedProperties"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2d$like$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/object-like/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2d$like$2f$getObjectLikeUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/object-like/getObjectLikeUtils.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/core/schemas/builders/primitives/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
}),
"[project]/dist/esm/core/schemas/builders/primitives/any.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "any",
    ()=>any
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/Schema.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$createIdentitySchemaCreator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/createIdentitySchemaCreator.mjs [app-ssr] (ecmascript)");
;
;
const any = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$createIdentitySchemaCreator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createIdentitySchemaCreator"])(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].ANY, (value)=>({
        ok: true,
        value
    }));
}),
"[project]/dist/esm/core/schemas/builders/primitives/boolean.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "boolean",
    ()=>boolean
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/Schema.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$createIdentitySchemaCreator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/createIdentitySchemaCreator.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/getErrorMessageForIncorrectType.mjs [app-ssr] (ecmascript)");
;
;
;
const boolean = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$createIdentitySchemaCreator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createIdentitySchemaCreator"])(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].BOOLEAN, (value, { breadcrumbsPrefix = [] } = {})=>{
    if (typeof value === "boolean") {
        return {
            ok: true,
            value
        };
    } else {
        return {
            ok: false,
            errors: [
                {
                    path: breadcrumbsPrefix,
                    message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorMessageForIncorrectType"])(value, "boolean")
                }
            ]
        };
    }
});
}),
"[project]/dist/esm/core/schemas/builders/primitives/number.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "number",
    ()=>number
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/Schema.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$createIdentitySchemaCreator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/createIdentitySchemaCreator.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/getErrorMessageForIncorrectType.mjs [app-ssr] (ecmascript)");
;
;
;
const number = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$createIdentitySchemaCreator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createIdentitySchemaCreator"])(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].NUMBER, (value, { breadcrumbsPrefix = [] } = {})=>{
    if (typeof value === "number") {
        return {
            ok: true,
            value
        };
    } else {
        return {
            ok: false,
            errors: [
                {
                    path: breadcrumbsPrefix,
                    message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorMessageForIncorrectType"])(value, "number")
                }
            ]
        };
    }
});
}),
"[project]/dist/esm/core/schemas/builders/primitives/string.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "string",
    ()=>string
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/Schema.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$createIdentitySchemaCreator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/createIdentitySchemaCreator.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/getErrorMessageForIncorrectType.mjs [app-ssr] (ecmascript)");
;
;
;
const string = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$createIdentitySchemaCreator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createIdentitySchemaCreator"])(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].STRING, (value, { breadcrumbsPrefix = [] } = {})=>{
    if (typeof value === "string") {
        return {
            ok: true,
            value
        };
    } else {
        return {
            ok: false,
            errors: [
                {
                    path: breadcrumbsPrefix,
                    message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorMessageForIncorrectType"])(value, "string")
                }
            ]
        };
    }
});
}),
"[project]/dist/esm/core/schemas/builders/primitives/unknown.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "unknown",
    ()=>unknown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/Schema.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$createIdentitySchemaCreator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/createIdentitySchemaCreator.mjs [app-ssr] (ecmascript)");
;
;
const unknown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$createIdentitySchemaCreator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createIdentitySchemaCreator"])(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].UNKNOWN, (value)=>({
        ok: true,
        value
    }));
}),
"[project]/dist/esm/core/schemas/builders/primitives/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "any",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$primitives$2f$any$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["any"],
    "boolean",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$primitives$2f$boolean$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
    "number",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$primitives$2f$number$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
    "string",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$primitives$2f$string$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"],
    "unknown",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$primitives$2f$unknown$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unknown"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$primitives$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/primitives/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$primitives$2f$any$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/primitives/any.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$primitives$2f$boolean$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/primitives/boolean.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$primitives$2f$number$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/primitives/number.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$primitives$2f$string$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/primitives/string.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$primitives$2f$unknown$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/primitives/unknown.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/core/schemas/builders/record/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/dist/esm/core/schemas/builders/record/record.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "record",
    ()=>record
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/Schema.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$entries$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/entries.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/getErrorMessageForIncorrectType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$isPlainObject$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/isPlainObject.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$maybeSkipValidation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/maybeSkipValidation.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/getSchemaUtils.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
function record(keySchema, valueSchema) {
    const baseSchema = {
        parse: (raw, opts)=>{
            return validateAndTransformRecord({
                value: raw,
                isKeyNumeric: keySchema.getType() === __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].NUMBER,
                transformKey: (key)=>{
                    var _a;
                    return keySchema.parse(key, Object.assign(Object.assign({}, opts), {
                        breadcrumbsPrefix: [
                            ...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [],
                            `${key} (key)`
                        ]
                    }));
                },
                transformValue: (value, key)=>{
                    var _a;
                    return valueSchema.parse(value, Object.assign(Object.assign({}, opts), {
                        breadcrumbsPrefix: [
                            ...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [],
                            `${key}`
                        ]
                    }));
                },
                breadcrumbsPrefix: opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix
            });
        },
        json: (parsed, opts)=>{
            return validateAndTransformRecord({
                value: parsed,
                isKeyNumeric: keySchema.getType() === __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].NUMBER,
                transformKey: (key)=>{
                    var _a;
                    return keySchema.json(key, Object.assign(Object.assign({}, opts), {
                        breadcrumbsPrefix: [
                            ...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [],
                            `${key} (key)`
                        ]
                    }));
                },
                transformValue: (value, key)=>{
                    var _a;
                    return valueSchema.json(value, Object.assign(Object.assign({}, opts), {
                        breadcrumbsPrefix: [
                            ...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [],
                            `${key}`
                        ]
                    }));
                },
                breadcrumbsPrefix: opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix
            });
        },
        getType: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].RECORD
    };
    return Object.assign(Object.assign({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$maybeSkipValidation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maybeSkipValidation"])(baseSchema)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSchemaUtils"])(baseSchema));
}
function validateAndTransformRecord({ value, isKeyNumeric, transformKey, transformValue, breadcrumbsPrefix = [] }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$isPlainObject$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPlainObject"])(value)) {
        return {
            ok: false,
            errors: [
                {
                    path: breadcrumbsPrefix,
                    message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorMessageForIncorrectType"])(value, "object")
                }
            ]
        };
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$entries$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["entries"])(value).reduce((accPromise, [stringKey, value])=>{
        if (value === undefined) {
            return accPromise;
        }
        const acc = accPromise;
        let key = stringKey;
        if (isKeyNumeric) {
            const numberKey = stringKey.length > 0 ? Number(stringKey) : NaN;
            if (!Number.isNaN(numberKey)) {
                key = numberKey;
            }
        }
        const transformedKey = transformKey(key);
        const transformedValue = transformValue(value, key);
        if (acc.ok && transformedKey.ok && transformedValue.ok) {
            return {
                ok: true,
                value: Object.assign(Object.assign({}, acc.value), {
                    [transformedKey.value]: transformedValue.value
                })
            };
        }
        const errors = [];
        if (!acc.ok) {
            errors.push(...acc.errors);
        }
        if (!transformedKey.ok) {
            errors.push(...transformedKey.errors);
        }
        if (!transformedValue.ok) {
            errors.push(...transformedValue.errors);
        }
        return {
            ok: false,
            errors
        };
    }, {
        ok: true,
        value: {}
    });
}
}),
"[project]/dist/esm/core/schemas/builders/record/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "record",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$record$2f$record$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["record"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$record$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/record/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$record$2f$record$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/record/record.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/core/schemas/builders/schema-utils/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
}),
"[project]/dist/esm/core/schemas/builders/schema-utils/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JsonError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$JsonError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonError"],
    "ParseError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$ParseError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ParseError"],
    "getSchemaUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSchemaUtils"],
    "optional",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["optional"],
    "transform",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transform"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/getSchemaUtils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$JsonError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/JsonError.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$ParseError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/ParseError.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/core/schemas/builders/set/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/dist/esm/core/schemas/builders/set/set.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "set",
    ()=>set
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/Schema.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/getErrorMessageForIncorrectType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$maybeSkipValidation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/maybeSkipValidation.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$list$2f$list$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/list/list.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/getSchemaUtils.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
function set(schema) {
    const listSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$list$2f$list$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["list"])(schema);
    const baseSchema = {
        parse: (raw, opts)=>{
            const parsedList = listSchema.parse(raw, opts);
            if (parsedList.ok) {
                return {
                    ok: true,
                    value: new Set(parsedList.value)
                };
            } else {
                return parsedList;
            }
        },
        json: (parsed, opts)=>{
            var _a;
            if (!(parsed instanceof Set)) {
                return {
                    ok: false,
                    errors: [
                        {
                            path: (_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [],
                            message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorMessageForIncorrectType"])(parsed, "Set")
                        }
                    ]
                };
            }
            const jsonList = listSchema.json([
                ...parsed
            ], opts);
            return jsonList;
        },
        getType: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].SET
    };
    return Object.assign(Object.assign({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$maybeSkipValidation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maybeSkipValidation"])(baseSchema)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSchemaUtils"])(baseSchema));
}
}),
"[project]/dist/esm/core/schemas/builders/set/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "set",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$set$2f$set$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["set"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$set$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/set/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$set$2f$set$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/set/set.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/core/schemas/builders/undiscriminated-union/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/dist/esm/core/schemas/builders/undiscriminated-union/undiscriminatedUnion.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "undiscriminatedUnion",
    ()=>undiscriminatedUnion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/Schema.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$maybeSkipValidation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/maybeSkipValidation.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/getSchemaUtils.mjs [app-ssr] (ecmascript)");
;
;
;
function undiscriminatedUnion(schemas) {
    const baseSchema = {
        parse: (raw, opts)=>{
            return validateAndTransformUndiscriminatedUnion((schema, opts)=>schema.parse(raw, opts), schemas, opts);
        },
        json: (parsed, opts)=>{
            return validateAndTransformUndiscriminatedUnion((schema, opts)=>schema.json(parsed, opts), schemas, opts);
        },
        getType: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].UNDISCRIMINATED_UNION
    };
    return Object.assign(Object.assign({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$maybeSkipValidation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maybeSkipValidation"])(baseSchema)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSchemaUtils"])(baseSchema));
}
function validateAndTransformUndiscriminatedUnion(transform, schemas, opts) {
    const errors = [];
    for (const [index, schema] of schemas.entries()){
        const transformed = transform(schema, Object.assign(Object.assign({}, opts), {
            skipValidation: false
        }));
        if (transformed.ok) {
            return transformed;
        } else {
            for (const error of transformed.errors){
                errors.push({
                    path: error.path,
                    message: `[Variant ${index}] ${error.message}`
                });
            }
        }
    }
    return {
        ok: false,
        errors
    };
}
}),
"[project]/dist/esm/core/schemas/builders/undiscriminated-union/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "undiscriminatedUnion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$undiscriminated$2d$union$2f$undiscriminatedUnion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["undiscriminatedUnion"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$undiscriminated$2d$union$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/undiscriminated-union/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$undiscriminated$2d$union$2f$undiscriminatedUnion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/undiscriminated-union/undiscriminatedUnion.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/core/schemas/builders/union/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
}),
"[project]/dist/esm/core/schemas/builders/union/discriminant.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "discriminant",
    ()=>discriminant
]);
function discriminant(parsedDiscriminant, rawDiscriminant) {
    return {
        parsedDiscriminant,
        rawDiscriminant
    };
}
}),
"[project]/dist/esm/core/schemas/builders/union/union.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "union",
    ()=>union
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/Schema.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/getErrorMessageForIncorrectType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$isPlainObject$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/isPlainObject.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$keys$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/keys.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$maybeSkipValidation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/utils/maybeSkipValidation.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$enum$2f$enum$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/enum/enum.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2d$like$2f$getObjectLikeUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/object-like/getObjectLikeUtils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/getSchemaUtils.mjs [app-ssr] (ecmascript)");
var __rest = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};
;
;
;
;
;
;
;
;
function union(discriminant, union) {
    const rawDiscriminant = typeof discriminant === "string" ? discriminant : discriminant.rawDiscriminant;
    const parsedDiscriminant = typeof discriminant === "string" ? discriminant : discriminant.parsedDiscriminant;
    const discriminantValueSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$enum$2f$enum$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enum_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$keys$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keys"])(union));
    const baseSchema = {
        parse: (raw, opts)=>{
            return transformAndValidateUnion({
                value: raw,
                discriminant: rawDiscriminant,
                transformedDiscriminant: parsedDiscriminant,
                transformDiscriminantValue: (discriminantValue)=>{
                    var _a;
                    return discriminantValueSchema.parse(discriminantValue, {
                        allowUnrecognizedEnumValues: opts === null || opts === void 0 ? void 0 : opts.allowUnrecognizedUnionMembers,
                        breadcrumbsPrefix: [
                            ...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [],
                            rawDiscriminant
                        ]
                    });
                },
                getAdditionalPropertiesSchema: (discriminantValue)=>union[discriminantValue],
                allowUnrecognizedUnionMembers: opts === null || opts === void 0 ? void 0 : opts.allowUnrecognizedUnionMembers,
                transformAdditionalProperties: (additionalProperties, additionalPropertiesSchema)=>additionalPropertiesSchema.parse(additionalProperties, opts),
                breadcrumbsPrefix: opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix
            });
        },
        json: (parsed, opts)=>{
            return transformAndValidateUnion({
                value: parsed,
                discriminant: parsedDiscriminant,
                transformedDiscriminant: rawDiscriminant,
                transformDiscriminantValue: (discriminantValue)=>{
                    var _a;
                    return discriminantValueSchema.json(discriminantValue, {
                        allowUnrecognizedEnumValues: opts === null || opts === void 0 ? void 0 : opts.allowUnrecognizedUnionMembers,
                        breadcrumbsPrefix: [
                            ...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [],
                            parsedDiscriminant
                        ]
                    });
                },
                getAdditionalPropertiesSchema: (discriminantValue)=>union[discriminantValue],
                allowUnrecognizedUnionMembers: opts === null || opts === void 0 ? void 0 : opts.allowUnrecognizedUnionMembers,
                transformAdditionalProperties: (additionalProperties, additionalPropertiesSchema)=>additionalPropertiesSchema.json(additionalProperties, opts),
                breadcrumbsPrefix: opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix
            });
        },
        getType: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$Schema$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchemaType"].UNION
    };
    return Object.assign(Object.assign(Object.assign({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$maybeSkipValidation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maybeSkipValidation"])(baseSchema)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$getSchemaUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSchemaUtils"])(baseSchema)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2d$like$2f$getObjectLikeUtils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getObjectLikeUtils"])(baseSchema));
}
function transformAndValidateUnion({ value, discriminant, transformedDiscriminant, transformDiscriminantValue, getAdditionalPropertiesSchema, allowUnrecognizedUnionMembers = false, transformAdditionalProperties, breadcrumbsPrefix = [] }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$isPlainObject$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPlainObject"])(value)) {
        return {
            ok: false,
            errors: [
                {
                    path: breadcrumbsPrefix,
                    message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$utils$2f$getErrorMessageForIncorrectType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorMessageForIncorrectType"])(value, "object")
                }
            ]
        };
    }
    const _a = value, _b = discriminant, discriminantValue = _a[_b], additionalProperties = __rest(_a, [
        typeof _b === "symbol" ? _b : _b + ""
    ]);
    if (discriminantValue == null) {
        return {
            ok: false,
            errors: [
                {
                    path: breadcrumbsPrefix,
                    message: `Missing discriminant ("${discriminant}")`
                }
            ]
        };
    }
    const transformedDiscriminantValue = transformDiscriminantValue(discriminantValue);
    if (!transformedDiscriminantValue.ok) {
        return {
            ok: false,
            errors: transformedDiscriminantValue.errors
        };
    }
    const additionalPropertiesSchema = getAdditionalPropertiesSchema(transformedDiscriminantValue.value);
    if (additionalPropertiesSchema == null) {
        if (allowUnrecognizedUnionMembers) {
            return {
                ok: true,
                value: Object.assign({
                    [transformedDiscriminant]: transformedDiscriminantValue.value
                }, additionalProperties)
            };
        } else {
            return {
                ok: false,
                errors: [
                    {
                        path: [
                            ...breadcrumbsPrefix,
                            discriminant
                        ],
                        message: "Unexpected discriminant value"
                    }
                ]
            };
        }
    }
    const transformedAdditionalProperties = transformAdditionalProperties(additionalProperties, additionalPropertiesSchema);
    if (!transformedAdditionalProperties.ok) {
        return transformedAdditionalProperties;
    }
    return {
        ok: true,
        value: Object.assign({
            [transformedDiscriminant]: discriminantValue
        }, transformedAdditionalProperties.value)
    };
}
}),
"[project]/dist/esm/core/schemas/builders/union/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "discriminant",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$union$2f$discriminant$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["discriminant"],
    "union",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$union$2f$union$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["union"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$union$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/union/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$union$2f$discriminant$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/union/discriminant.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$union$2f$union$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/union/union.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/core/schemas/builders/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JsonError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonError"],
    "ParseError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ParseError"],
    "any",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$primitives$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["any"],
    "bigint",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$bigint$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bigint"],
    "boolean",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$primitives$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
    "booleanLiteral",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$literals$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanLiteral"],
    "date",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$date$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["date"],
    "discriminant",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$union$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["discriminant"],
    "enum_",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$enum$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enum_"],
    "getObjectLikeUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2d$like$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getObjectLikeUtils"],
    "getObjectUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getObjectUtils"],
    "getSchemaUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSchemaUtils"],
    "isProperty",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isProperty"],
    "lazy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$lazy$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"],
    "lazyObject",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$lazy$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazyObject"],
    "list",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$list$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["list"],
    "number",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$primitives$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
    "object",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"],
    "objectWithoutOptionalProperties",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["objectWithoutOptionalProperties"],
    "optional",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["optional"],
    "property",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["property"],
    "record",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$record$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["record"],
    "set",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$set$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["set"],
    "string",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$primitives$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"],
    "stringLiteral",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$literals$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringLiteral"],
    "transform",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transform"],
    "undiscriminatedUnion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$undiscriminated$2d$union$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["undiscriminatedUnion"],
    "union",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$union$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["union"],
    "unknown",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$primitives$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unknown"],
    "withParsedProperties",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2d$like$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withParsedProperties"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$bigint$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/bigint/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$date$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/date/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$enum$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/enum/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$lazy$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/lazy/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$list$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/list/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$literals$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/literals/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/object/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$object$2d$like$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/object-like/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$primitives$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/primitives/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$record$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/record/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$schema$2d$utils$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/schema-utils/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$set$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/set/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$undiscriminated$2d$union$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/undiscriminated-union/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$union$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/union/index.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JsonError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonError"],
    "ParseError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ParseError"],
    "any",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["any"],
    "bigint",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bigint"],
    "boolean",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"],
    "booleanLiteral",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["booleanLiteral"],
    "date",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["date"],
    "discriminant",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["discriminant"],
    "enum_",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enum_"],
    "getObjectLikeUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getObjectLikeUtils"],
    "getObjectUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getObjectUtils"],
    "getSchemaUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSchemaUtils"],
    "isProperty",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isProperty"],
    "lazy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"],
    "lazyObject",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazyObject"],
    "list",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["list"],
    "number",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
    "object",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"],
    "objectWithoutOptionalProperties",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["objectWithoutOptionalProperties"],
    "optional",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["optional"],
    "property",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["property"],
    "record",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["record"],
    "set",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["set"],
    "string",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"],
    "stringLiteral",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringLiteral"],
    "transform",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transform"],
    "undiscriminatedUnion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["undiscriminatedUnion"],
    "union",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["union"],
    "unknown",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unknown"],
    "withParsedProperties",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withParsedProperties"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$builders$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/builders/index.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "serialization",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/AssistantInput.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssistantInput",
    ()=>AssistantInput
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const AssistantInput = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    text: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("assistant_input")
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/AudioInput.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AudioInput",
    ()=>AudioInput
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const AudioInput = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    data: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("audio_input")
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/PauseAssistantMessage.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PauseAssistantMessage",
    ()=>PauseAssistantMessage
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PauseAssistantMessage = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("pause_assistant_message")
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ResumeAssistantMessage.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ResumeAssistantMessage",
    ()=>ResumeAssistantMessage
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ResumeAssistantMessage = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("resume_assistant_message")
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/Encoding.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Encoding",
    ()=>Encoding
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const Encoding = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("linear16");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/AudioConfiguration.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AudioConfiguration",
    ()=>AudioConfiguration
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Encoding$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/Encoding.mjs [app-ssr] (ecmascript)");
;
;
const AudioConfiguration = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    channels: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number(),
    codec: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    encoding: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Encoding$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Encoding"],
    sampleRate: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("sample_rate", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/BuiltInTool.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BuiltInTool",
    ()=>BuiltInTool
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const BuiltInTool = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "web_search",
    "hang_up"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/BuiltinToolConfig.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BuiltinToolConfig",
    ()=>BuiltinToolConfig
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$BuiltInTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/BuiltInTool.mjs [app-ssr] (ecmascript)");
;
;
const BuiltinToolConfig = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    fallbackContent: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("fallback_content", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$BuiltInTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BuiltInTool"]
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ContextType.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContextType",
    ()=>ContextType
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ContextType = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "persistent",
    "temporary"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/Context.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Context",
    ()=>Context
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ContextType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ContextType.mjs [app-ssr] (ecmascript)");
;
;
const Context = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    text: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ContextType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContextType"].optional()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/SessionSettingsVariablesValue.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SessionSettingsVariablesValue",
    ()=>SessionSettingsVariablesValue
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const SessionSettingsVariablesValue = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].undiscriminatedUnion([
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number(),
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].boolean()
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ToolType.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToolType",
    ()=>ToolType
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ToolType = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "builtin",
    "function"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/Tool.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tool",
    ()=>Tool
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolType.mjs [app-ssr] (ecmascript)");
;
;
const Tool = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    description: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    fallbackContent: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("fallback_content", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    parameters: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolType"]
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/SessionSettings.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SessionSettings",
    ()=>SessionSettings
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AudioConfiguration$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/AudioConfiguration.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$BuiltinToolConfig$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/BuiltinToolConfig.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Context$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/Context.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SessionSettingsVariablesValue$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/SessionSettingsVariablesValue.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Tool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/Tool.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
const SessionSettings = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    audio: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AudioConfiguration$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AudioConfiguration"].optional(),
    builtinTools: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("builtin_tools", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$BuiltinToolConfig$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BuiltinToolConfig"]).optional()),
    context: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Context$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Context"].optional(),
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    languageModelApiKey: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("language_model_api_key", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].record(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].unknown()).optional(),
    systemPrompt: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("system_prompt", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    tools: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Tool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tool"]).optional(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("session_settings"),
    variables: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].record(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SessionSettingsVariablesValue$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SessionSettingsVariablesValue"]).optional(),
    voiceId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("voice_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ErrorLevel.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorLevel",
    ()=>ErrorLevel
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ErrorLevel = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("warn");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ToolErrorMessage.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToolErrorMessage",
    ()=>ToolErrorMessage
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ErrorLevel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ErrorLevel.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolType.mjs [app-ssr] (ecmascript)");
;
;
;
const ToolErrorMessage = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    code: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    content: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    error: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    level: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ErrorLevel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ErrorLevel"].optional(),
    toolCallId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("tool_call_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string()),
    toolType: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("tool_type", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolType"].optional()),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("tool_error")
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ToolResponseMessage.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToolResponseMessage",
    ()=>ToolResponseMessage
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolType.mjs [app-ssr] (ecmascript)");
;
;
const ToolResponseMessage = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    content: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    toolCallId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("tool_call_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string()),
    toolName: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("tool_name", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    toolType: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("tool_type", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolType"].optional()),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("tool_response")
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/UserInput.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserInput",
    ()=>UserInput
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const UserInput = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    text: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("user_input")
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/types/PublishEvent.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PublishEvent",
    ()=>PublishEvent
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantInput$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/AssistantInput.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AudioInput$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/AudioInput.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PauseAssistantMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PauseAssistantMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ResumeAssistantMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ResumeAssistantMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SessionSettings$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/SessionSettings.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolErrorMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolErrorMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolResponseMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolResponseMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$UserInput$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/UserInput.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
const PublishEvent = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].undiscriminatedUnion([
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AudioInput$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AudioInput"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SessionSettings$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SessionSettings"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$UserInput$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserInput"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantInput$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssistantInput"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolResponseMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolResponseMessage"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolErrorMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolErrorMessage"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PauseAssistantMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PauseAssistantMessage"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ResumeAssistantMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResumeAssistantMessage"]
]);
}),
"[project]/dist/esm/core/json.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Serialize a value to JSON
 * @param value A JavaScript value, usually an object or array, to be converted.
 * @param replacer A function that transforms the results.
 * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 * @returns JSON string
 */ __turbopack_context__.s([
    "fromJson",
    ()=>fromJson,
    "toJson",
    ()=>toJson
]);
const toJson = (value, replacer, space)=>{
    return JSON.stringify(value, replacer, space);
};
function fromJson(text, reviver) {
    return JSON.parse(text, reviver);
}
}),
"[project]/dist/esm/serialization/resources/empathicVoice/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/client/socket/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/AssistantEnd.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssistantEnd",
    ()=>AssistantEnd
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const AssistantEnd = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("assistant_end")
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ChatMessageToolResult.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatMessageToolResult",
    ()=>ChatMessageToolResult
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolErrorMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolErrorMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolResponseMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolResponseMessage.mjs [app-ssr] (ecmascript)");
;
;
;
const ChatMessageToolResult = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].undiscriminatedUnion([
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolResponseMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolResponseMessage"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolErrorMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolErrorMessage"]
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/Role.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Role",
    ()=>Role
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const Role = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "assistant",
    "system",
    "user",
    "all",
    "tool",
    "context"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ToolCallMessage.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToolCallMessage",
    ()=>ToolCallMessage
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolType.mjs [app-ssr] (ecmascript)");
;
;
const ToolCallMessage = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    parameters: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    responseRequired: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("response_required", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].boolean()),
    toolCallId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("tool_call_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string()),
    toolType: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("tool_type", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolType"]),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("tool_call")
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ChatMessage.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatMessage",
    ()=>ChatMessage
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ChatMessageToolResult$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ChatMessageToolResult.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Role$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/Role.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolCallMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolCallMessage.mjs [app-ssr] (ecmascript)");
;
;
;
;
const ChatMessage = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    content: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    role: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Role$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"],
    toolCall: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("tool_call", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolCallMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolCallMessage"].optional()),
    toolResult: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("tool_result", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ChatMessageToolResult$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatMessageToolResult"].optional())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/EmotionScores.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmotionScores",
    ()=>EmotionScores
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const EmotionScores = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    admiration: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Admiration", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    adoration: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Adoration", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    aestheticAppreciation: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Aesthetic Appreciation", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    amusement: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Amusement", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    anger: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Anger", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    anxiety: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Anxiety", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    awe: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Awe", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    awkwardness: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Awkwardness", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    boredom: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Boredom", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    calmness: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Calmness", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    concentration: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Concentration", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    confusion: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Confusion", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    contemplation: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Contemplation", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    contempt: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Contempt", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    contentment: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Contentment", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    craving: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Craving", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    desire: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Desire", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    determination: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Determination", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    disappointment: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Disappointment", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    disgust: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Disgust", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    distress: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Distress", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    doubt: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Doubt", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    ecstasy: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Ecstasy", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    embarrassment: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Embarrassment", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    empathicPain: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Empathic Pain", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    entrancement: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Entrancement", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    envy: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Envy", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    excitement: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Excitement", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    fear: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Fear", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    guilt: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Guilt", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    horror: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Horror", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    interest: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Interest", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    joy: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Joy", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    love: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Love", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    nostalgia: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Nostalgia", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    pain: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Pain", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    pride: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Pride", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    realization: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Realization", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    relief: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Relief", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    romance: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Romance", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    sadness: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Sadness", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    satisfaction: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Satisfaction", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    shame: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Shame", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    surpriseNegative: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Surprise (negative)", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    surprisePositive: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Surprise (positive)", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    sympathy: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Sympathy", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    tiredness: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Tiredness", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    triumph: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("Triumph", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ProsodyInference.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProsodyInference",
    ()=>ProsodyInference
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$EmotionScores$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/EmotionScores.mjs [app-ssr] (ecmascript)");
;
;
const ProsodyInference = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    scores: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$EmotionScores$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmotionScores"]
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/Inference.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Inference",
    ()=>Inference
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ProsodyInference$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ProsodyInference.mjs [app-ssr] (ecmascript)");
;
;
const Inference = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    prosody: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ProsodyInference$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProsodyInference"].optional()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/AssistantMessage.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssistantMessage",
    ()=>AssistantMessage
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ChatMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ChatMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Inference$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/Inference.mjs [app-ssr] (ecmascript)");
;
;
;
const AssistantMessage = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    fromText: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("from_text", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].boolean()),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    isQuickResponse: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("is_quick_response", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].boolean()),
    language: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    message: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ChatMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatMessage"],
    models: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Inference$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Inference"],
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("assistant_message")
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/AssistantProsody.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssistantProsody",
    ()=>AssistantProsody
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Inference$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/Inference.mjs [app-ssr] (ecmascript)");
;
;
const AssistantProsody = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    models: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Inference$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Inference"],
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("assistant_prosody")
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/AudioOutput.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AudioOutput",
    ()=>AudioOutput
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const AudioOutput = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    data: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    index: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("audio_output")
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ChatMetadata.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatMetadata",
    ()=>ChatMetadata
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ChatMetadata = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    chatGroupId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("chat_group_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string()),
    chatId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("chat_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string()),
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    requestId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("request_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("chat_metadata")
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/UserInterruption.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserInterruption",
    ()=>UserInterruption
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const UserInterruption = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    time: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("user_interruption")
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/MillisecondInterval.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MillisecondInterval",
    ()=>MillisecondInterval
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const MillisecondInterval = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    begin: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number(),
    end: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/UserMessage.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserMessage",
    ()=>UserMessage
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ChatMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ChatMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Inference$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/Inference.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$MillisecondInterval$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/MillisecondInterval.mjs [app-ssr] (ecmascript)");
;
;
;
;
const UserMessage = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    fromText: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("from_text", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].boolean()),
    interim: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].boolean(),
    language: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    message: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ChatMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatMessage"],
    models: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Inference$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Inference"],
    time: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$MillisecondInterval$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MillisecondInterval"],
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("user_message")
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/WebSocketError.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebSocketError",
    ()=>WebSocketError
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const WebSocketError = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    code: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    message: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    requestId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("request_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    slug: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("error")
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/SubscribeEvent.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubscribeEvent",
    ()=>SubscribeEvent
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantEnd$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/AssistantEnd.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/AssistantMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantProsody$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/AssistantProsody.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AudioOutput$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/AudioOutput.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ChatMetadata$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ChatMetadata.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SessionSettings$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/SessionSettings.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolCallMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolCallMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolErrorMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolErrorMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolResponseMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolResponseMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$UserInterruption$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/UserInterruption.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$UserMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/UserMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebSocketError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/WebSocketError.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
const SubscribeEvent = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].undiscriminatedUnion([
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantEnd$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssistantEnd"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssistantMessage"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantProsody$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssistantProsody"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AudioOutput$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AudioOutput"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ChatMetadata$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatMetadata"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebSocketError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebSocketError"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$UserInterruption$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserInterruption"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$UserMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserMessage"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolCallMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolCallMessage"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolResponseMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolResponseMessage"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolErrorMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolErrorMessage"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SessionSettings$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SessionSettings"]
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/client/socket/ChatSocketResponse.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatSocketResponse",
    ()=>ChatSocketResponse
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SubscribeEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/SubscribeEvent.mjs [app-ssr] (ecmascript)");
;
;
const ChatSocketResponse = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].undiscriminatedUnion([
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SubscribeEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubscribeEvent"]
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/client/socket/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatSocketResponse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$client$2f$socket$2f$ChatSocketResponse$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatSocketResponse"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$client$2f$socket$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/client/socket/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$client$2f$socket$2f$ChatSocketResponse$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/client/socket/ChatSocketResponse.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/client/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/client/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatSocketResponse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$client$2f$socket$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatSocketResponse"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/client/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$client$2f$socket$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/client/socket/index.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/types/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/types/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PublishEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$types$2f$PublishEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublishEvent"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/types/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$types$2f$PublishEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/types/PublishEvent.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/types/SubscribeEvent.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubscribeEvent",
    ()=>SubscribeEvent
]);
/**
 * This file was manually added to provide backward compatibility.
 *
 * @deprecated Use `serialization.empathicVoice.SubscribeEvent` instead.
 * This serializer alias will be removed in a future version.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SubscribeEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/SubscribeEvent.mjs [app-ssr] (ecmascript)");
;
const SubscribeEvent = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SubscribeEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubscribeEvent"];
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatSocketResponse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatSocketResponse"],
    "PublishEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublishEvent"],
    "SubscribeEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$types$2f$SubscribeEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubscribeEvent"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/client/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/types/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$types$2f$SubscribeEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/types/SubscribeEvent.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/client/requests/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/PostedBuiltinToolName.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedBuiltinToolName",
    ()=>PostedBuiltinToolName
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PostedBuiltinToolName = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "web_search",
    "hang_up"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/PostedBuiltinTool.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedBuiltinTool",
    ()=>PostedBuiltinTool
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedBuiltinToolName$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedBuiltinToolName.mjs [app-ssr] (ecmascript)");
;
;
const PostedBuiltinTool = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    fallbackContent: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("fallback_content", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedBuiltinToolName$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedBuiltinToolName"]
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/PostedConfigPromptSpec.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedConfigPromptSpec",
    ()=>PostedConfigPromptSpec
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PostedConfigPromptSpec = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    text: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    version: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/PostedEllmModel.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedEllmModel",
    ()=>PostedEllmModel
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PostedEllmModel = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    allowShortResponses: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("allow_short_responses", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].boolean().optional())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/PostedEventMessageSpec.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedEventMessageSpec",
    ()=>PostedEventMessageSpec
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PostedEventMessageSpec = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    enabled: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].boolean(),
    text: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/PostedEventMessageSpecs.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedEventMessageSpecs",
    ()=>PostedEventMessageSpecs
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedEventMessageSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedEventMessageSpec.mjs [app-ssr] (ecmascript)");
;
;
const PostedEventMessageSpecs = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    onInactivityTimeout: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("on_inactivity_timeout", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedEventMessageSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedEventMessageSpec"].optional()),
    onMaxDurationTimeout: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("on_max_duration_timeout", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedEventMessageSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedEventMessageSpec"].optional()),
    onNewChat: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("on_new_chat", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedEventMessageSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedEventMessageSpec"].optional())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/LanguageModelType.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageModelType",
    ()=>LanguageModelType
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const LanguageModelType = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "claude-3-7-sonnet-latest",
    "claude-3-5-sonnet-latest",
    "claude-3-5-haiku-latest",
    "claude-3-5-sonnet-20240620",
    "claude-3-opus-20240229",
    "claude-3-sonnet-20240229",
    "claude-3-haiku-20240307",
    "claude-sonnet-4-20250514",
    "claude-sonnet-4-5-20250929",
    "claude-haiku-4-5-20251001",
    "us.anthropic.claude-3-5-haiku-20241022-v1:0",
    "us.anthropic.claude-3-5-sonnet-20240620-v1:0",
    "us.anthropic.claude-3-haiku-20240307-v1:0",
    "gpt-oss-120b",
    "qwen-3-235b-a22b",
    "qwen-3-235b-a22b-instruct-2507",
    "qwen-3-235b-a22b-thinking-2507",
    "gemini-1.5-pro",
    "gemini-1.5-flash",
    "gemini-1.5-pro-002",
    "gemini-1.5-flash-002",
    "gemini-2.0-flash",
    "gemini-2.5-flash",
    "gemini-2.5-flash-preview-04-17",
    "gpt-4-turbo",
    "gpt-4-turbo-preview",
    "gpt-3.5-turbo-0125",
    "gpt-3.5-turbo",
    "gpt-4o",
    "gpt-4o-mini",
    "gpt-4.1",
    "gpt-5",
    "gpt-5-mini",
    "gpt-5-nano",
    "gpt-4o-priority",
    "gpt-4o-mini-priority",
    "gpt-4.1-priority",
    "gpt-5-priority",
    "gpt-5-mini-priority",
    "gpt-5-nano-priority",
    "gemma-7b-it",
    "llama3-8b-8192",
    "llama3-70b-8192",
    "llama-3.1-70b-versatile",
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
    "moonshotai/kimi-k2-instruct",
    "accounts/fireworks/models/mixtral-8x7b-instruct",
    "accounts/fireworks/models/llama-v3p1-405b-instruct",
    "accounts/fireworks/models/llama-v3p1-70b-instruct",
    "accounts/fireworks/models/llama-v3p1-8b-instruct",
    "sonar",
    "sonar-pro",
    "sambanova",
    "DeepSeek-R1-Distill-Llama-70B",
    "Llama-4-Maverick-17B-128E-Instruct",
    "Qwen3-32B",
    "grok-4-fast-non-reasoning-latest",
    "ellm",
    "custom-language-model",
    "hume-evi-3-web-search"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ModelProviderEnum.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModelProviderEnum",
    ()=>ModelProviderEnum
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ModelProviderEnum = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "GROQ",
    "OPEN_AI",
    "FIREWORKS",
    "ANTHROPIC",
    "CUSTOM_LANGUAGE_MODEL",
    "GOOGLE",
    "HUME_AI",
    "AMAZON_BEDROCK",
    "PERPLEXITY",
    "SAMBANOVA",
    "CEREBRAS"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/PostedLanguageModel.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedLanguageModel",
    ()=>PostedLanguageModel
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$LanguageModelType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/LanguageModelType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ModelProviderEnum$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ModelProviderEnum.mjs [app-ssr] (ecmascript)");
;
;
;
const PostedLanguageModel = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    modelProvider: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("model_provider", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ModelProviderEnum$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModelProviderEnum"].optional()),
    modelResource: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("model_resource", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$LanguageModelType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LanguageModelType"].optional()),
    temperature: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/PostedNudgeSpec.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedNudgeSpec",
    ()=>PostedNudgeSpec
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PostedNudgeSpec = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    enabled: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].boolean().optional(),
    intervalSecs: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("interval_secs", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/PostedTimeoutSpecsInactivity.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedTimeoutSpecsInactivity",
    ()=>PostedTimeoutSpecsInactivity
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PostedTimeoutSpecsInactivity = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    durationSecs: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("duration_secs", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional()),
    enabled: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].boolean()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/PostedTimeoutSpecsMaxDuration.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedTimeoutSpecsMaxDuration",
    ()=>PostedTimeoutSpecsMaxDuration
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PostedTimeoutSpecsMaxDuration = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    durationSecs: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("duration_secs", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional()),
    enabled: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].boolean()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/PostedTimeoutSpecs.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedTimeoutSpecs",
    ()=>PostedTimeoutSpecs
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedTimeoutSpecsInactivity$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedTimeoutSpecsInactivity.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedTimeoutSpecsMaxDuration$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedTimeoutSpecsMaxDuration.mjs [app-ssr] (ecmascript)");
;
;
;
const PostedTimeoutSpecs = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    inactivity: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedTimeoutSpecsInactivity$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedTimeoutSpecsInactivity"].optional(),
    maxDuration: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("max_duration", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedTimeoutSpecsMaxDuration$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedTimeoutSpecsMaxDuration"].optional())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/PostedUserDefinedToolSpec.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedUserDefinedToolSpec",
    ()=>PostedUserDefinedToolSpec
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PostedUserDefinedToolSpec = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    version: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/PostedWebhookEventType.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedWebhookEventType",
    ()=>PostedWebhookEventType
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PostedWebhookEventType = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "chat_started",
    "chat_ended",
    "tool_call"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/PostedWebhookSpec.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedWebhookSpec",
    ()=>PostedWebhookSpec
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedWebhookEventType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedWebhookEventType.mjs [app-ssr] (ecmascript)");
;
;
const PostedWebhookSpec = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    events: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedWebhookEventType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedWebhookEventType"]),
    url: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/VoiceProvider.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VoiceProvider",
    ()=>VoiceProvider
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const VoiceProvider = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "HUME_AI",
    "CUSTOM_VOICE"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/VoiceId.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VoiceId",
    ()=>VoiceId
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceProvider$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/VoiceProvider.mjs [app-ssr] (ecmascript)");
;
;
const VoiceId = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    provider: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceProvider$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceProvider"].optional()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/VoiceName.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VoiceName",
    ()=>VoiceName
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceProvider$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/VoiceProvider.mjs [app-ssr] (ecmascript)");
;
;
const VoiceName = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    provider: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceProvider$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceProvider"].optional()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/VoiceRef.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VoiceRef",
    ()=>VoiceRef
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceId$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/VoiceId.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceName$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/VoiceName.mjs [app-ssr] (ecmascript)");
;
;
;
const VoiceRef = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].undiscriminatedUnion([
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceId$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceId"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceName$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceName"]
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/client/requests/PostedConfig.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedConfig",
    ()=>PostedConfig
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedBuiltinTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedBuiltinTool.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedConfigPromptSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedConfigPromptSpec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedEllmModel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedEllmModel.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedEventMessageSpecs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedEventMessageSpecs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedLanguageModel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedLanguageModel.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedNudgeSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedNudgeSpec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedTimeoutSpecs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedTimeoutSpecs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedUserDefinedToolSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedUserDefinedToolSpec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedWebhookSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedWebhookSpec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceRef$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/VoiceRef.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
const PostedConfig = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    builtinTools: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("builtin_tools", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedBuiltinTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedBuiltinTool"].optional()).optional()),
    ellmModel: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("ellm_model", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedEllmModel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedEllmModel"].optional()),
    eventMessages: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("event_messages", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedEventMessageSpecs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedEventMessageSpecs"].optional()),
    eviVersion: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("evi_version", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string()),
    languageModel: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("language_model", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedLanguageModel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedLanguageModel"].optional()),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    nudges: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedNudgeSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedNudgeSpec"].optional(),
    prompt: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedConfigPromptSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfigPromptSpec"].optional(),
    timeouts: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedTimeoutSpecs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedTimeoutSpecs"].optional(),
    tools: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedUserDefinedToolSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedToolSpec"].optional()).optional(),
    versionDescription: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("version_description", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    voice: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceRef$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceRef"].optional(),
    webhooks: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedWebhookSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedWebhookSpec"].optional()).optional()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/client/requests/PostedConfigName.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedConfigName",
    ()=>PostedConfigName
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PostedConfigName = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/client/requests/PostedConfigVersion.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedConfigVersion",
    ()=>PostedConfigVersion
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedBuiltinTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedBuiltinTool.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedConfigPromptSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedConfigPromptSpec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedEllmModel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedEllmModel.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedEventMessageSpecs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedEventMessageSpecs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedLanguageModel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedLanguageModel.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedNudgeSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedNudgeSpec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedTimeoutSpecs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedTimeoutSpecs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedUserDefinedToolSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedUserDefinedToolSpec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedWebhookSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedWebhookSpec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceRef$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/VoiceRef.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
const PostedConfigVersion = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    builtinTools: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("builtin_tools", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedBuiltinTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedBuiltinTool"].optional()).optional()),
    ellmModel: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("ellm_model", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedEllmModel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedEllmModel"].optional()),
    eventMessages: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("event_messages", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedEventMessageSpecs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedEventMessageSpecs"].optional()),
    eviVersion: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("evi_version", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string()),
    languageModel: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("language_model", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedLanguageModel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedLanguageModel"].optional()),
    nudges: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedNudgeSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedNudgeSpec"].optional(),
    prompt: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedConfigPromptSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfigPromptSpec"].optional(),
    timeouts: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedTimeoutSpecs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedTimeoutSpecs"].optional(),
    tools: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedUserDefinedToolSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedToolSpec"].optional()).optional(),
    versionDescription: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("version_description", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    voice: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceRef$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceRef"].optional(),
    webhooks: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedWebhookSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedWebhookSpec"].optional()).optional()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/client/requests/PostedConfigVersionDescription.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedConfigVersionDescription",
    ()=>PostedConfigVersionDescription
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PostedConfigVersionDescription = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    versionDescription: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("version_description", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/client/requests/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$requests$2f$PostedConfig$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfig"],
    "PostedConfigName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$requests$2f$PostedConfigName$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfigName"],
    "PostedConfigVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$requests$2f$PostedConfigVersion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfigVersion"],
    "PostedConfigVersionDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$requests$2f$PostedConfigVersionDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfigVersionDescription"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/client/requests/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$requests$2f$PostedConfig$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/client/requests/PostedConfig.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$requests$2f$PostedConfigName$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/client/requests/PostedConfigName.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$requests$2f$PostedConfigVersion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/client/requests/PostedConfigVersion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$requests$2f$PostedConfigVersionDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/client/requests/PostedConfigVersionDescription.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/client/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/client/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfig"],
    "PostedConfigName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfigName"],
    "PostedConfigVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfigVersion"],
    "PostedConfigVersionDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfigVersionDescription"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/client/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/client/requests/index.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfig"],
    "PostedConfigName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfigName"],
    "PostedConfigVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfigVersion"],
    "PostedConfigVersionDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfigVersionDescription"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/client/index.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/controlPlane/client/socket/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/controlPlane/client/socket/ControlPlaneSocketResponse.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ControlPlaneSocketResponse",
    ()=>ControlPlaneSocketResponse
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SubscribeEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/SubscribeEvent.mjs [app-ssr] (ecmascript)");
;
;
const ControlPlaneSocketResponse = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].undiscriminatedUnion([
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SubscribeEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubscribeEvent"]
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/controlPlane/client/socket/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ControlPlaneSocketResponse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$controlPlane$2f$client$2f$socket$2f$ControlPlaneSocketResponse$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ControlPlaneSocketResponse"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$controlPlane$2f$client$2f$socket$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/controlPlane/client/socket/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$controlPlane$2f$client$2f$socket$2f$ControlPlaneSocketResponse$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/controlPlane/client/socket/ControlPlaneSocketResponse.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/controlPlane/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/controlPlane/client/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/controlPlane/client/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ControlPlaneSocketResponse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$controlPlane$2f$client$2f$socket$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ControlPlaneSocketResponse"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$controlPlane$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/controlPlane/client/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$controlPlane$2f$client$2f$socket$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/controlPlane/client/socket/index.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/controlPlane/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ControlPlaneSocketResponse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$controlPlane$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ControlPlaneSocketResponse"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$controlPlane$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/controlPlane/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$controlPlane$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/controlPlane/client/index.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/requests/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/requests/PostedPrompt.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedPrompt",
    ()=>PostedPrompt
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PostedPrompt = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    text: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    versionDescription: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("version_description", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/requests/PostedPromptName.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedPromptName",
    ()=>PostedPromptName
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PostedPromptName = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/requests/PostedPromptVersion.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedPromptVersion",
    ()=>PostedPromptVersion
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PostedPromptVersion = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    text: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    versionDescription: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("version_description", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/requests/PostedPromptVersionDescription.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedPromptVersionDescription",
    ()=>PostedPromptVersionDescription
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PostedPromptVersionDescription = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    versionDescription: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("version_description", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/requests/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedPrompt",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$requests$2f$PostedPrompt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedPrompt"],
    "PostedPromptName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$requests$2f$PostedPromptName$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedPromptName"],
    "PostedPromptVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$requests$2f$PostedPromptVersion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedPromptVersion"],
    "PostedPromptVersionDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$requests$2f$PostedPromptVersionDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedPromptVersionDescription"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/requests/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$requests$2f$PostedPrompt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/requests/PostedPrompt.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$requests$2f$PostedPromptName$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/requests/PostedPromptName.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$requests$2f$PostedPromptVersion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/requests/PostedPromptVersion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$requests$2f$PostedPromptVersionDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/requests/PostedPromptVersionDescription.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPrompt.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnPrompt",
    ()=>ReturnPrompt
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnPrompt = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    createdOn: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("created_on", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    modifiedOn: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("modified_on", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    text: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    version: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number(),
    versionDescription: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("version_description", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    versionType: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("version_type", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/createPrompt.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Response",
    ()=>Response
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPrompt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPrompt.mjs [app-ssr] (ecmascript)");
;
const Response = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPrompt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPrompt"].optional();
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/createPromptVersion.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Response",
    ()=>Response
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPrompt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPrompt.mjs [app-ssr] (ecmascript)");
;
const Response = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPrompt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPrompt"].optional();
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/getPromptVersion.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Response",
    ()=>Response
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPrompt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPrompt.mjs [app-ssr] (ecmascript)");
;
const Response = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPrompt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPrompt"].optional();
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/updatePromptDescription.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Response",
    ()=>Response
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPrompt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPrompt.mjs [app-ssr] (ecmascript)");
;
const Response = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPrompt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPrompt"].optional();
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedPrompt",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedPrompt"],
    "PostedPromptName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedPromptName"],
    "PostedPromptVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedPromptVersion"],
    "PostedPromptVersionDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedPromptVersionDescription"],
    "createPrompt",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$createPrompt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    "createPromptVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$createPromptVersion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    "getPromptVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$getPromptVersion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    "updatePromptDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$updatePromptDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$createPrompt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/createPrompt.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$createPromptVersion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/createPromptVersion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$getPromptVersion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/getPromptVersion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/requests/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$updatePromptDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/updatePromptDescription.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedPrompt",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedPrompt"],
    "PostedPromptName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedPromptName"],
    "PostedPromptVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedPromptVersion"],
    "PostedPromptVersionDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedPromptVersionDescription"],
    "createPrompt",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPrompt"],
    "createPromptVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPromptVersion"],
    "getPromptVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPromptVersion"],
    "updatePromptDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updatePromptDescription"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/index.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/requests/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/requests/PostedUserDefinedTool.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedUserDefinedTool",
    ()=>PostedUserDefinedTool
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PostedUserDefinedTool = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    description: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    fallbackContent: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("fallback_content", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    parameters: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    versionDescription: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("version_description", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/requests/PostedUserDefinedToolName.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedUserDefinedToolName",
    ()=>PostedUserDefinedToolName
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PostedUserDefinedToolName = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/requests/PostedUserDefinedToolVersion.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedUserDefinedToolVersion",
    ()=>PostedUserDefinedToolVersion
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PostedUserDefinedToolVersion = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    description: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    fallbackContent: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("fallback_content", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    parameters: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    versionDescription: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("version_description", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/requests/PostedUserDefinedToolVersionDescription.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedUserDefinedToolVersionDescription",
    ()=>PostedUserDefinedToolVersionDescription
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PostedUserDefinedToolVersionDescription = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    versionDescription: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("version_description", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/requests/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedUserDefinedTool",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$requests$2f$PostedUserDefinedTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedTool"],
    "PostedUserDefinedToolName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$requests$2f$PostedUserDefinedToolName$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedToolName"],
    "PostedUserDefinedToolVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$requests$2f$PostedUserDefinedToolVersion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedToolVersion"],
    "PostedUserDefinedToolVersionDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$requests$2f$PostedUserDefinedToolVersionDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedToolVersionDescription"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/requests/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$requests$2f$PostedUserDefinedTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/requests/PostedUserDefinedTool.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$requests$2f$PostedUserDefinedToolName$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/requests/PostedUserDefinedToolName.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$requests$2f$PostedUserDefinedToolVersion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/requests/PostedUserDefinedToolVersion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$requests$2f$PostedUserDefinedToolVersionDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/requests/PostedUserDefinedToolVersionDescription.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnUserDefinedToolToolType.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnUserDefinedToolToolType",
    ()=>ReturnUserDefinedToolToolType
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnUserDefinedToolToolType = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "BUILTIN",
    "FUNCTION"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnUserDefinedToolVersionType.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnUserDefinedToolVersionType",
    ()=>ReturnUserDefinedToolVersionType
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnUserDefinedToolVersionType = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "FIXED",
    "LATEST"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnUserDefinedTool.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnUserDefinedTool",
    ()=>ReturnUserDefinedTool
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedToolToolType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnUserDefinedToolToolType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedToolVersionType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnUserDefinedToolVersionType.mjs [app-ssr] (ecmascript)");
;
;
;
const ReturnUserDefinedTool = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    createdOn: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("created_on", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    fallbackContent: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("fallback_content", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    modifiedOn: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("modified_on", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    parameters: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    toolType: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("tool_type", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedToolToolType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnUserDefinedToolToolType"]),
    version: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number(),
    versionDescription: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("version_description", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    versionType: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("version_type", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedToolVersionType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnUserDefinedToolVersionType"])
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/createTool.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Response",
    ()=>Response
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnUserDefinedTool.mjs [app-ssr] (ecmascript)");
;
const Response = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnUserDefinedTool"].optional();
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/createToolVersion.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Response",
    ()=>Response
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnUserDefinedTool.mjs [app-ssr] (ecmascript)");
;
const Response = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnUserDefinedTool"].optional();
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/getToolVersion.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Response",
    ()=>Response
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnUserDefinedTool.mjs [app-ssr] (ecmascript)");
;
const Response = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnUserDefinedTool"].optional();
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/updateToolDescription.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Response",
    ()=>Response
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnUserDefinedTool.mjs [app-ssr] (ecmascript)");
;
const Response = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnUserDefinedTool"].optional();
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedUserDefinedTool",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedTool"],
    "PostedUserDefinedToolName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedToolName"],
    "PostedUserDefinedToolVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedToolVersion"],
    "PostedUserDefinedToolVersionDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedToolVersionDescription"],
    "createTool",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$createTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    "createToolVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$createToolVersion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    "getToolVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$getToolVersion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    "updateToolDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$updateToolDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$createTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/createTool.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$createToolVersion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/createToolVersion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$getToolVersion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/getToolVersion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/requests/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$updateToolDescription$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/updateToolDescription.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedUserDefinedTool",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedTool"],
    "PostedUserDefinedToolName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedToolName"],
    "PostedUserDefinedToolVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedToolVersion"],
    "PostedUserDefinedToolVersionDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedToolVersionDescription"],
    "createTool",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createTool"],
    "createToolVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createToolVersion"],
    "getToolVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToolVersion"],
    "updateToolDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateToolDescription"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/index.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/resources/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatSocketResponse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$client$2f$socket$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatSocketResponse"],
    "ControlPlaneSocketResponse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$controlPlane$2f$client$2f$socket$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ControlPlaneSocketResponse"],
    "PostedConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfig"],
    "PostedConfigName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfigName"],
    "PostedConfigVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfigVersion"],
    "PostedConfigVersionDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfigVersionDescription"],
    "PostedPrompt",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedPrompt"],
    "PostedPromptName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedPromptName"],
    "PostedPromptVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedPromptVersion"],
    "PostedPromptVersionDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedPromptVersionDescription"],
    "PostedUserDefinedTool",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedTool"],
    "PostedUserDefinedToolName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedToolName"],
    "PostedUserDefinedToolVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedToolVersion"],
    "PostedUserDefinedToolVersionDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedToolVersionDescription"],
    "PublishEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublishEvent"],
    "chat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    "configs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    "controlPlane",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$controlPlane$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    "prompts",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    "tools",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$client$2f$socket$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/client/socket/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/types/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/client/requests/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$configs$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/configs/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$controlPlane$2f$client$2f$socket$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/controlPlane/client/socket/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$controlPlane$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/controlPlane/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/client/requests/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$prompts$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/prompts/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$client$2f$requests$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/client/requests/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$tools$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/tools/index.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ConnectSessionSettingsAudio.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConnectSessionSettingsAudio",
    ()=>ConnectSessionSettingsAudio
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Encoding$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/Encoding.mjs [app-ssr] (ecmascript)");
;
;
const ConnectSessionSettingsAudio = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    channels: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional(),
    encoding: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Encoding$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Encoding"].optional(),
    sampleRate: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("sample_rate", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ConnectSessionSettingsContext.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConnectSessionSettingsContext",
    ()=>ConnectSessionSettingsContext
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ContextType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ContextType.mjs [app-ssr] (ecmascript)");
;
;
const ConnectSessionSettingsContext = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    text: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ContextType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContextType"].optional()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ConnectSessionSettingsVariablesValue.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConnectSessionSettingsVariablesValue",
    ()=>ConnectSessionSettingsVariablesValue
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ConnectSessionSettingsVariablesValue = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].undiscriminatedUnion([
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number(),
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].boolean()
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ConnectSessionSettings.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConnectSessionSettings",
    ()=>ConnectSessionSettings
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ConnectSessionSettingsAudio$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ConnectSessionSettingsAudio.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ConnectSessionSettingsContext$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ConnectSessionSettingsContext.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ConnectSessionSettingsVariablesValue$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ConnectSessionSettingsVariablesValue.mjs [app-ssr] (ecmascript)");
;
;
;
;
const ConnectSessionSettings = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    audio: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ConnectSessionSettingsAudio$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectSessionSettingsAudio"].optional(),
    context: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ConnectSessionSettingsContext$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectSessionSettingsContext"].optional(),
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    eventLimit: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("event_limit", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional()),
    languageModelApiKey: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("language_model_api_key", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    systemPrompt: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("system_prompt", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    voiceId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("voice_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    variables: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].record(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ConnectSessionSettingsVariablesValue$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectSessionSettingsVariablesValue"]).optional()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ControlPlanePublishEvent.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ControlPlanePublishEvent",
    ()=>ControlPlanePublishEvent
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantInput$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/AssistantInput.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PauseAssistantMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PauseAssistantMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ResumeAssistantMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ResumeAssistantMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SessionSettings$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/SessionSettings.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolErrorMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolErrorMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolResponseMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolResponseMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$UserInput$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/UserInput.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
const ControlPlanePublishEvent = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].undiscriminatedUnion([
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SessionSettings$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SessionSettings"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$UserInput$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserInput"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantInput$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssistantInput"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolResponseMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolResponseMessage"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolErrorMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolErrorMessage"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PauseAssistantMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PauseAssistantMessage"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ResumeAssistantMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResumeAssistantMessage"]
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ErrorResponse.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorResponse",
    ()=>ErrorResponse
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ErrorResponse = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    code: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    error: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    message: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ValidationErrorLocItem.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ValidationErrorLocItem",
    ()=>ValidationErrorLocItem
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ValidationErrorLocItem = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].undiscriminatedUnion([
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ValidationError.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ValidationError",
    ()=>ValidationError
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ValidationErrorLocItem$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ValidationErrorLocItem.mjs [app-ssr] (ecmascript)");
;
;
const ValidationError = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    loc: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ValidationErrorLocItem$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ValidationErrorLocItem"]),
    msg: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/HttpValidationError.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HttpValidationError",
    ()=>HttpValidationError
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ValidationError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ValidationError.mjs [app-ssr] (ecmascript)");
;
;
const HttpValidationError = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    detail: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ValidationError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ValidationError"]).optional()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/JsonMessage.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JsonMessage",
    ()=>JsonMessage
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantEnd$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/AssistantEnd.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/AssistantMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantProsody$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/AssistantProsody.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ChatMetadata$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ChatMetadata.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SessionSettings$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/SessionSettings.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolCallMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolCallMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolErrorMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolErrorMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolResponseMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolResponseMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$UserInterruption$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/UserInterruption.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$UserMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/UserMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebSocketError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/WebSocketError.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
const JsonMessage = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].undiscriminatedUnion([
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantEnd$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssistantEnd"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssistantMessage"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantProsody$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssistantProsody"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ChatMetadata$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatMetadata"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebSocketError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebSocketError"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$UserInterruption$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserInterruption"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$UserMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserMessage"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolCallMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolCallMessage"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolResponseMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolResponseMessage"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolErrorMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolErrorMessage"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SessionSettings$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SessionSettings"]
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/PostedTimeoutSpec.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostedTimeoutSpec",
    ()=>PostedTimeoutSpec
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const PostedTimeoutSpec = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    durationSecs: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("duration_secs", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional()),
    enabled: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].boolean()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnBuiltinToolToolType.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnBuiltinToolToolType",
    ()=>ReturnBuiltinToolToolType
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnBuiltinToolToolType = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "BUILTIN",
    "FUNCTION"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnBuiltinTool.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnBuiltinTool",
    ()=>ReturnBuiltinTool
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnBuiltinToolToolType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnBuiltinToolToolType.mjs [app-ssr] (ecmascript)");
;
;
const ReturnBuiltinTool = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    fallbackContent: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("fallback_content", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    toolType: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("tool_type", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnBuiltinToolToolType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnBuiltinToolToolType"])
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatStatus.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnChatStatus",
    ()=>ReturnChatStatus
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnChatStatus = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "ACTIVE",
    "USER_ENDED",
    "USER_TIMEOUT",
    "MAX_DURATION_TIMEOUT",
    "INACTIVITY_TIMEOUT",
    "ERROR"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnConfigSpec.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnConfigSpec",
    ()=>ReturnConfigSpec
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnConfigSpec = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    version: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChat.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnChat",
    ()=>ReturnChat
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatStatus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatStatus.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnConfigSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnConfigSpec.mjs [app-ssr] (ecmascript)");
;
;
;
const ReturnChat = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    chatGroupId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("chat_group_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string()),
    config: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnConfigSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnConfigSpec"].optional(),
    endTimestamp: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("end_timestamp", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional()),
    eventCount: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("event_count", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional()),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    startTimestamp: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("start_timestamp", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatStatus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatStatus"]
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatAudioReconstructionStatus.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnChatAudioReconstructionStatus",
    ()=>ReturnChatAudioReconstructionStatus
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnChatAudioReconstructionStatus = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "QUEUED",
    "IN_PROGRESS",
    "COMPLETE",
    "ERROR",
    "CANCELLED"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatAudioReconstruction.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnChatAudioReconstruction",
    ()=>ReturnChatAudioReconstruction
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatAudioReconstructionStatus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatAudioReconstructionStatus.mjs [app-ssr] (ecmascript)");
;
;
const ReturnChatAudioReconstruction = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    filename: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    modifiedAt: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("modified_at", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional()),
    signedAudioUrl: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("signed_audio_url", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    signedUrlExpirationTimestampMillis: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("signed_url_expiration_timestamp_millis", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional()),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatAudioReconstructionStatus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatAudioReconstructionStatus"],
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("user_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatEventRole.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnChatEventRole",
    ()=>ReturnChatEventRole
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnChatEventRole = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "USER",
    "AGENT",
    "SYSTEM",
    "TOOL"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatEventType.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnChatEventType",
    ()=>ReturnChatEventType
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnChatEventType = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "FUNCTION_CALL",
    "FUNCTION_CALL_RESPONSE",
    "CHAT_END_MESSAGE",
    "AGENT_MESSAGE",
    "SYSTEM_PROMPT",
    "USER_RECORDING_START_MESSAGE",
    "RESUME_ONSET",
    "USER_INTERRUPTION",
    "CHAT_START_MESSAGE",
    "PAUSE_ONSET",
    "USER_MESSAGE"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatEvent.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnChatEvent",
    ()=>ReturnChatEvent
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatEventRole$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatEventRole.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatEventType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatEventType.mjs [app-ssr] (ecmascript)");
;
;
;
const ReturnChatEvent = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    chatId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("chat_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string()),
    emotionFeatures: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("emotion_features", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    messageText: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("message_text", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    relatedEventId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("related_event_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    role: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatEventRole$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatEventRole"],
    timestamp: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatEventType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatEventType"]
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatGroup.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnChatGroup",
    ()=>ReturnChatGroup
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnConfigSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnConfigSpec.mjs [app-ssr] (ecmascript)");
;
;
const ReturnChatGroup = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    active: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].boolean().optional(),
    firstStartTimestamp: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("first_start_timestamp", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    mostRecentChatId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("most_recent_chat_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    mostRecentConfig: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("most_recent_config", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnConfigSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnConfigSpec"].optional()),
    mostRecentStartTimestamp: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("most_recent_start_timestamp", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    numChats: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("num_chats", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatGroupPagedAudioReconstructionsPaginationDirection.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnChatGroupPagedAudioReconstructionsPaginationDirection",
    ()=>ReturnChatGroupPagedAudioReconstructionsPaginationDirection
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnChatGroupPagedAudioReconstructionsPaginationDirection = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "ASC",
    "DESC"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatGroupPagedAudioReconstructions.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnChatGroupPagedAudioReconstructions",
    ()=>ReturnChatGroupPagedAudioReconstructions
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatAudioReconstruction$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatAudioReconstruction.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroupPagedAudioReconstructionsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatGroupPagedAudioReconstructionsPaginationDirection.mjs [app-ssr] (ecmascript)");
;
;
;
const ReturnChatGroupPagedAudioReconstructions = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    audioReconstructionsPage: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("audio_reconstructions_page", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatAudioReconstruction$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatAudioReconstruction"])),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    numChats: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("num_chats", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    pageNumber: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("page_number", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("page_size", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    paginationDirection: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("pagination_direction", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroupPagedAudioReconstructionsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatGroupPagedAudioReconstructionsPaginationDirection"]),
    totalPages: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("total_pages", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("user_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatGroupPagedChatsPaginationDirection.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnChatGroupPagedChatsPaginationDirection",
    ()=>ReturnChatGroupPagedChatsPaginationDirection
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnChatGroupPagedChatsPaginationDirection = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "ASC",
    "DESC"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatGroupPagedChats.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnChatGroupPagedChats",
    ()=>ReturnChatGroupPagedChats
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChat.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroupPagedChatsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatGroupPagedChatsPaginationDirection.mjs [app-ssr] (ecmascript)");
;
;
;
const ReturnChatGroupPagedChats = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    active: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].boolean().optional(),
    chatsPage: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("chats_page", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChat"])),
    firstStartTimestamp: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("first_start_timestamp", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    mostRecentStartTimestamp: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("most_recent_start_timestamp", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    numChats: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("num_chats", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    pageNumber: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("page_number", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("page_size", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    paginationDirection: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("pagination_direction", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroupPagedChatsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatGroupPagedChatsPaginationDirection"]),
    totalPages: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("total_pages", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatGroupPagedEventsPaginationDirection.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnChatGroupPagedEventsPaginationDirection",
    ()=>ReturnChatGroupPagedEventsPaginationDirection
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnChatGroupPagedEventsPaginationDirection = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "ASC",
    "DESC"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatGroupPagedEvents.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnChatGroupPagedEvents",
    ()=>ReturnChatGroupPagedEvents
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatEvent.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroupPagedEventsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatGroupPagedEventsPaginationDirection.mjs [app-ssr] (ecmascript)");
;
;
;
const ReturnChatGroupPagedEvents = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    eventsPage: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("events_page", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatEvent"])),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    pageNumber: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("page_number", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("page_size", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    paginationDirection: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("pagination_direction", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroupPagedEventsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatGroupPagedEventsPaginationDirection"]),
    totalPages: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("total_pages", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatPagedEventsPaginationDirection.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnChatPagedEventsPaginationDirection",
    ()=>ReturnChatPagedEventsPaginationDirection
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnChatPagedEventsPaginationDirection = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "ASC",
    "DESC"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatPagedEventsStatus.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnChatPagedEventsStatus",
    ()=>ReturnChatPagedEventsStatus
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnChatPagedEventsStatus = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "ACTIVE",
    "USER_ENDED",
    "USER_TIMEOUT",
    "MAX_DURATION_TIMEOUT",
    "INACTIVITY_TIMEOUT",
    "ERROR"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatPagedEvents.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnChatPagedEvents",
    ()=>ReturnChatPagedEvents
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatEvent.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatPagedEventsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatPagedEventsPaginationDirection.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatPagedEventsStatus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatPagedEventsStatus.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnConfigSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnConfigSpec.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
const ReturnChatPagedEvents = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    chatGroupId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("chat_group_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string()),
    config: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnConfigSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnConfigSpec"].optional(),
    endTimestamp: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("end_timestamp", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional()),
    eventsPage: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("events_page", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatEvent"])),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string(),
    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    pageNumber: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("page_number", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("page_size", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    paginationDirection: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("pagination_direction", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatPagedEventsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatPagedEventsPaginationDirection"]),
    startTimestamp: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("start_timestamp", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatPagedEventsStatus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatPagedEventsStatus"],
    totalPages: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("total_pages", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnEllmModel.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnEllmModel",
    ()=>ReturnEllmModel
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnEllmModel = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    allowShortResponses: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("allow_short_responses", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].boolean())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnEventMessageSpec.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnEventMessageSpec",
    ()=>ReturnEventMessageSpec
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnEventMessageSpec = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    enabled: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].boolean(),
    text: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnEventMessageSpecs.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnEventMessageSpecs",
    ()=>ReturnEventMessageSpecs
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnEventMessageSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnEventMessageSpec.mjs [app-ssr] (ecmascript)");
;
;
const ReturnEventMessageSpecs = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    onInactivityTimeout: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("on_inactivity_timeout", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnEventMessageSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnEventMessageSpec"].optional()),
    onMaxDurationTimeout: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("on_max_duration_timeout", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnEventMessageSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnEventMessageSpec"].optional()),
    onNewChat: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("on_new_chat", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnEventMessageSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnEventMessageSpec"].optional())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnLanguageModel.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnLanguageModel",
    ()=>ReturnLanguageModel
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$LanguageModelType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/LanguageModelType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ModelProviderEnum$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ModelProviderEnum.mjs [app-ssr] (ecmascript)");
;
;
;
const ReturnLanguageModel = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    modelProvider: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("model_provider", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ModelProviderEnum$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModelProviderEnum"].optional()),
    modelResource: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("model_resource", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$LanguageModelType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LanguageModelType"].optional()),
    temperature: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnNudgeSpec.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnNudgeSpec",
    ()=>ReturnNudgeSpec
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnNudgeSpec = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    enabled: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].boolean(),
    intervalSecs: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("interval_secs", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnTimeoutSpec.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnTimeoutSpec",
    ()=>ReturnTimeoutSpec
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnTimeoutSpec = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    durationSecs: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("duration_secs", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional()),
    enabled: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].boolean()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnTimeoutSpecs.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnTimeoutSpecs",
    ()=>ReturnTimeoutSpecs
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnTimeoutSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnTimeoutSpec.mjs [app-ssr] (ecmascript)");
;
;
const ReturnTimeoutSpecs = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    inactivity: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnTimeoutSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnTimeoutSpec"],
    maxDuration: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("max_duration", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnTimeoutSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnTimeoutSpec"])
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnVoice.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnVoice",
    ()=>ReturnVoice
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceProvider$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/VoiceProvider.mjs [app-ssr] (ecmascript)");
;
;
const ReturnVoice = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    compatibleOctaveModels: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("compatible_octave_models", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string()).optional()),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    provider: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceProvider$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceProvider"].optional()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnWebhookEventType.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnWebhookEventType",
    ()=>ReturnWebhookEventType
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnWebhookEventType = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "chat_started",
    "chat_ended",
    "tool_call"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnWebhookSpec.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnWebhookSpec",
    ()=>ReturnWebhookSpec
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnWebhookEventType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnWebhookEventType.mjs [app-ssr] (ecmascript)");
;
;
const ReturnWebhookSpec = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    events: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnWebhookEventType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnWebhookEventType"]),
    url: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnConfig.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnConfig",
    ()=>ReturnConfig
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnBuiltinTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnBuiltinTool.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnEllmModel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnEllmModel.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnEventMessageSpecs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnEventMessageSpecs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnLanguageModel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnLanguageModel.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnNudgeSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnNudgeSpec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPrompt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPrompt.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnTimeoutSpecs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnTimeoutSpecs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnUserDefinedTool.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnVoice$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnVoice.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnWebhookSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnWebhookSpec.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
const ReturnConfig = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    builtinTools: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("builtin_tools", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnBuiltinTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnBuiltinTool"].optional()).optional()),
    createdOn: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("created_on", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional()),
    ellmModel: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("ellm_model", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnEllmModel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnEllmModel"].optional()),
    eventMessages: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("event_messages", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnEventMessageSpecs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnEventMessageSpecs"].optional()),
    eviVersion: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("evi_version", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    languageModel: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("language_model", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnLanguageModel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnLanguageModel"].optional()),
    modifiedOn: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("modified_on", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional()),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional(),
    nudges: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnNudgeSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnNudgeSpec"].optional(),
    prompt: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPrompt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPrompt"].optional(),
    timeouts: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnTimeoutSpecs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnTimeoutSpecs"].optional(),
    tools: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnUserDefinedTool"].optional()).optional(),
    version: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional(),
    versionDescription: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("version_description", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    voice: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnVoice$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnVoice"].optional(),
    webhooks: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnWebhookSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnWebhookSpec"].optional()).optional()
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPagedChatGroupsPaginationDirection.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnPagedChatGroupsPaginationDirection",
    ()=>ReturnPagedChatGroupsPaginationDirection
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnPagedChatGroupsPaginationDirection = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "ASC",
    "DESC"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPagedChatGroups.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnPagedChatGroups",
    ()=>ReturnPagedChatGroups
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroup$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatGroup.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPagedChatGroupsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPagedChatGroupsPaginationDirection.mjs [app-ssr] (ecmascript)");
;
;
;
const ReturnPagedChatGroups = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    chatGroupsPage: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("chat_groups_page", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroup$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatGroup"])),
    pageNumber: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("page_number", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("page_size", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    paginationDirection: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("pagination_direction", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPagedChatGroupsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPagedChatGroupsPaginationDirection"]),
    totalPages: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("total_pages", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPagedChatsPaginationDirection.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnPagedChatsPaginationDirection",
    ()=>ReturnPagedChatsPaginationDirection
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnPagedChatsPaginationDirection = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "ASC",
    "DESC"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPagedChats.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnPagedChats",
    ()=>ReturnPagedChats
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChat.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPagedChatsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPagedChatsPaginationDirection.mjs [app-ssr] (ecmascript)");
;
;
;
const ReturnPagedChats = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    chatsPage: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("chats_page", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChat"])),
    pageNumber: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("page_number", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("page_size", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    paginationDirection: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("pagination_direction", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPagedChatsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPagedChatsPaginationDirection"]),
    totalPages: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("total_pages", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPagedConfigs.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnPagedConfigs",
    ()=>ReturnPagedConfigs
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnConfig$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnConfig.mjs [app-ssr] (ecmascript)");
;
;
const ReturnPagedConfigs = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    configsPage: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("configs_page", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnConfig$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnConfig"]).optional()),
    pageNumber: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("page_number", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional()),
    pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("page_size", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number().optional()),
    totalPages: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("total_pages", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPagedPrompts.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnPagedPrompts",
    ()=>ReturnPagedPrompts
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPrompt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPrompt.mjs [app-ssr] (ecmascript)");
;
;
const ReturnPagedPrompts = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    pageNumber: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("page_number", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("page_size", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    promptsPage: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("prompts_page", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPrompt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPrompt"].optional())),
    totalPages: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("total_pages", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPagedUserDefinedTools.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnPagedUserDefinedTools",
    ()=>ReturnPagedUserDefinedTools
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnUserDefinedTool.mjs [app-ssr] (ecmascript)");
;
;
const ReturnPagedUserDefinedTools = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    pageNumber: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("page_number", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("page_size", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    toolsPage: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("tools_page", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].list(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnUserDefinedTool"].optional())),
    totalPages: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("total_pages", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPromptVersionType.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReturnPromptVersionType",
    ()=>ReturnPromptVersionType
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const ReturnPromptVersionType = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "FIXED",
    "LATEST"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEventBase.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebhookEventBase",
    ()=>WebhookEventBase
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const WebhookEventBase = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    chatGroupId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("chat_group_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string()),
    chatId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("chat_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string()),
    configId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("config_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional())
});
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEventChatStatus.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebhookEventChatStatus",
    ()=>WebhookEventChatStatus
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const WebhookEventChatStatus = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "ACTIVE",
    "USER_ENDED",
    "USER_TIMEOUT",
    "INACTIVITY_TIMEOUT",
    "MAX_DURATION_TIMEOUT",
    "SILENCE_TIMEOUT",
    "ERROR"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEventChatEnded.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebhookEventChatEnded",
    ()=>WebhookEventChatEnded
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventBase$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEventBase.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventChatStatus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEventChatStatus.mjs [app-ssr] (ecmascript)");
;
;
;
const WebhookEventChatEnded = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    callerNumber: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("caller_number", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    durationSeconds: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("duration_seconds", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    endReason: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("end_reason", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventChatStatus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEventChatStatus"]),
    endTime: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("end_time", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number()),
    eventName: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("event_name", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("chat_ended").optional())
}).extend(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventBase$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEventBase"]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEventChatStartType.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebhookEventChatStartType",
    ()=>WebhookEventChatStartType
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
;
const WebhookEventChatStartType = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].enum_([
    "new_chat_group",
    "resumed_chat_group"
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEventChatStarted.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebhookEventChatStarted",
    ()=>WebhookEventChatStarted
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventBase$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEventBase.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventChatStartType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEventChatStartType.mjs [app-ssr] (ecmascript)");
;
;
;
const WebhookEventChatStarted = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    callerNumber: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("caller_number", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    chatStartType: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("chat_start_type", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventChatStartType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEventChatStartType"]),
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    eventName: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("event_name", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("chat_started").optional()),
    startTime: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("start_time", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number())
}).extend(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventBase$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEventBase"]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEventToolCall.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebhookEventToolCall",
    ()=>WebhookEventToolCall
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolCallMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolCallMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventBase$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEventBase.mjs [app-ssr] (ecmascript)");
;
;
;
const WebhookEventToolCall = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].object({
    callerNumber: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("caller_number", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    customSessionId: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("custom_session_id", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].string().optional()),
    eventName: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("event_name", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].stringLiteral("tool_call").optional()),
    timestamp: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].number(),
    toolCallMessage: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].property("tool_call_message", __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolCallMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolCallMessage"])
}).extend(__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventBase$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEventBase"]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEvent.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebhookEvent",
    ()=>WebhookEvent
]);
// This file was auto-generated by Fern from our API Definition.
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/schemas/index.mjs [app-ssr] (ecmascript) <export * as serialization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventChatEnded$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEventChatEnded.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventChatStarted$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEventChatStarted.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventToolCall$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEventToolCall.mjs [app-ssr] (ecmascript)");
;
;
;
;
const WebhookEvent = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$schemas$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__serialization$3e$__["serialization"].undiscriminatedUnion([
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventChatStarted$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEventChatStarted"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventChatEnded$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEventChatEnded"],
    __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventToolCall$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEventToolCall"]
]);
}),
"[project]/dist/esm/serialization/resources/empathicVoice/types/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssistantEnd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantEnd$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssistantEnd"],
    "AssistantInput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantInput$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssistantInput"],
    "AssistantMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssistantMessage"],
    "AssistantProsody",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantProsody$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssistantProsody"],
    "AudioConfiguration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AudioConfiguration$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AudioConfiguration"],
    "AudioInput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AudioInput$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AudioInput"],
    "AudioOutput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AudioOutput$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AudioOutput"],
    "BuiltInTool",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$BuiltInTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BuiltInTool"],
    "BuiltinToolConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$BuiltinToolConfig$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BuiltinToolConfig"],
    "ChatMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ChatMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatMessage"],
    "ChatMessageToolResult",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ChatMessageToolResult$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatMessageToolResult"],
    "ChatMetadata",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ChatMetadata$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatMetadata"],
    "ConnectSessionSettings",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ConnectSessionSettings$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectSessionSettings"],
    "ConnectSessionSettingsAudio",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ConnectSessionSettingsAudio$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectSessionSettingsAudio"],
    "ConnectSessionSettingsContext",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ConnectSessionSettingsContext$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectSessionSettingsContext"],
    "ConnectSessionSettingsVariablesValue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ConnectSessionSettingsVariablesValue$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectSessionSettingsVariablesValue"],
    "Context",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Context$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Context"],
    "ContextType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ContextType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContextType"],
    "ControlPlanePublishEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ControlPlanePublishEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ControlPlanePublishEvent"],
    "EmotionScores",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$EmotionScores$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmotionScores"],
    "Encoding",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Encoding$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Encoding"],
    "ErrorLevel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ErrorLevel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ErrorLevel"],
    "ErrorResponse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ErrorResponse$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ErrorResponse"],
    "HttpValidationError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$HttpValidationError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HttpValidationError"],
    "Inference",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Inference$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Inference"],
    "JsonMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$JsonMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonMessage"],
    "LanguageModelType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$LanguageModelType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LanguageModelType"],
    "MillisecondInterval",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$MillisecondInterval$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MillisecondInterval"],
    "ModelProviderEnum",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ModelProviderEnum$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModelProviderEnum"],
    "PauseAssistantMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PauseAssistantMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PauseAssistantMessage"],
    "PostedBuiltinTool",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedBuiltinTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedBuiltinTool"],
    "PostedBuiltinToolName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedBuiltinToolName$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedBuiltinToolName"],
    "PostedConfigPromptSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedConfigPromptSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfigPromptSpec"],
    "PostedEllmModel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedEllmModel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedEllmModel"],
    "PostedEventMessageSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedEventMessageSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedEventMessageSpec"],
    "PostedEventMessageSpecs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedEventMessageSpecs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedEventMessageSpecs"],
    "PostedLanguageModel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedLanguageModel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedLanguageModel"],
    "PostedNudgeSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedNudgeSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedNudgeSpec"],
    "PostedTimeoutSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedTimeoutSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedTimeoutSpec"],
    "PostedTimeoutSpecs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedTimeoutSpecs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedTimeoutSpecs"],
    "PostedTimeoutSpecsInactivity",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedTimeoutSpecsInactivity$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedTimeoutSpecsInactivity"],
    "PostedTimeoutSpecsMaxDuration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedTimeoutSpecsMaxDuration$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedTimeoutSpecsMaxDuration"],
    "PostedUserDefinedToolSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedUserDefinedToolSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedToolSpec"],
    "PostedWebhookEventType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedWebhookEventType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedWebhookEventType"],
    "PostedWebhookSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedWebhookSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedWebhookSpec"],
    "ProsodyInference",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ProsodyInference$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProsodyInference"],
    "ResumeAssistantMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ResumeAssistantMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResumeAssistantMessage"],
    "ReturnBuiltinTool",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnBuiltinTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnBuiltinTool"],
    "ReturnBuiltinToolToolType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnBuiltinToolToolType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnBuiltinToolToolType"],
    "ReturnChat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChat"],
    "ReturnChatAudioReconstruction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatAudioReconstruction$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatAudioReconstruction"],
    "ReturnChatAudioReconstructionStatus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatAudioReconstructionStatus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatAudioReconstructionStatus"],
    "ReturnChatEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatEvent"],
    "ReturnChatEventRole",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatEventRole$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatEventRole"],
    "ReturnChatEventType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatEventType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatEventType"],
    "ReturnChatGroup",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroup$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatGroup"],
    "ReturnChatGroupPagedAudioReconstructions",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroupPagedAudioReconstructions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatGroupPagedAudioReconstructions"],
    "ReturnChatGroupPagedAudioReconstructionsPaginationDirection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroupPagedAudioReconstructionsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatGroupPagedAudioReconstructionsPaginationDirection"],
    "ReturnChatGroupPagedChats",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroupPagedChats$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatGroupPagedChats"],
    "ReturnChatGroupPagedChatsPaginationDirection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroupPagedChatsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatGroupPagedChatsPaginationDirection"],
    "ReturnChatGroupPagedEvents",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroupPagedEvents$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatGroupPagedEvents"],
    "ReturnChatGroupPagedEventsPaginationDirection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroupPagedEventsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatGroupPagedEventsPaginationDirection"],
    "ReturnChatPagedEvents",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatPagedEvents$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatPagedEvents"],
    "ReturnChatPagedEventsPaginationDirection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatPagedEventsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatPagedEventsPaginationDirection"],
    "ReturnChatPagedEventsStatus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatPagedEventsStatus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatPagedEventsStatus"],
    "ReturnChatStatus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatStatus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatStatus"],
    "ReturnConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnConfig$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnConfig"],
    "ReturnConfigSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnConfigSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnConfigSpec"],
    "ReturnEllmModel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnEllmModel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnEllmModel"],
    "ReturnEventMessageSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnEventMessageSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnEventMessageSpec"],
    "ReturnEventMessageSpecs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnEventMessageSpecs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnEventMessageSpecs"],
    "ReturnLanguageModel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnLanguageModel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnLanguageModel"],
    "ReturnNudgeSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnNudgeSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnNudgeSpec"],
    "ReturnPagedChatGroups",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPagedChatGroups$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPagedChatGroups"],
    "ReturnPagedChatGroupsPaginationDirection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPagedChatGroupsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPagedChatGroupsPaginationDirection"],
    "ReturnPagedChats",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPagedChats$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPagedChats"],
    "ReturnPagedChatsPaginationDirection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPagedChatsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPagedChatsPaginationDirection"],
    "ReturnPagedConfigs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPagedConfigs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPagedConfigs"],
    "ReturnPagedPrompts",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPagedPrompts$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPagedPrompts"],
    "ReturnPagedUserDefinedTools",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPagedUserDefinedTools$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPagedUserDefinedTools"],
    "ReturnPrompt",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPrompt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPrompt"],
    "ReturnPromptVersionType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPromptVersionType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPromptVersionType"],
    "ReturnTimeoutSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnTimeoutSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnTimeoutSpec"],
    "ReturnTimeoutSpecs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnTimeoutSpecs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnTimeoutSpecs"],
    "ReturnUserDefinedTool",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnUserDefinedTool"],
    "ReturnUserDefinedToolToolType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedToolToolType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnUserDefinedToolToolType"],
    "ReturnUserDefinedToolVersionType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedToolVersionType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnUserDefinedToolVersionType"],
    "ReturnVoice",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnVoice$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnVoice"],
    "ReturnWebhookEventType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnWebhookEventType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnWebhookEventType"],
    "ReturnWebhookSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnWebhookSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnWebhookSpec"],
    "Role",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Role$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"],
    "SessionSettings",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SessionSettings$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SessionSettings"],
    "SessionSettingsVariablesValue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SessionSettingsVariablesValue$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SessionSettingsVariablesValue"],
    "SubscribeEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SubscribeEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubscribeEvent"],
    "Tool",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Tool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tool"],
    "ToolCallMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolCallMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolCallMessage"],
    "ToolErrorMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolErrorMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolErrorMessage"],
    "ToolResponseMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolResponseMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolResponseMessage"],
    "ToolType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolType"],
    "UserInput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$UserInput$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserInput"],
    "UserInterruption",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$UserInterruption$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserInterruption"],
    "UserMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$UserMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserMessage"],
    "ValidationError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ValidationError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ValidationError"],
    "ValidationErrorLocItem",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ValidationErrorLocItem$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ValidationErrorLocItem"],
    "VoiceId",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceId$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceId"],
    "VoiceName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceName$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceName"],
    "VoiceProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceProvider$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceProvider"],
    "VoiceRef",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceRef$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceRef"],
    "WebSocketError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebSocketError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebSocketError"],
    "WebhookEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEvent"],
    "WebhookEventBase",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventBase$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEventBase"],
    "WebhookEventChatEnded",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventChatEnded$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEventChatEnded"],
    "WebhookEventChatStartType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventChatStartType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEventChatStartType"],
    "WebhookEventChatStarted",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventChatStarted$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEventChatStarted"],
    "WebhookEventChatStatus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventChatStatus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEventChatStatus"],
    "WebhookEventToolCall",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventToolCall$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEventToolCall"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantEnd$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/AssistantEnd.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantInput$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/AssistantInput.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/AssistantMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AssistantProsody$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/AssistantProsody.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AudioConfiguration$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/AudioConfiguration.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AudioInput$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/AudioInput.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$AudioOutput$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/AudioOutput.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$BuiltInTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/BuiltInTool.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$BuiltinToolConfig$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/BuiltinToolConfig.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ChatMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ChatMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ChatMessageToolResult$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ChatMessageToolResult.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ChatMetadata$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ChatMetadata.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ConnectSessionSettings$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ConnectSessionSettings.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ConnectSessionSettingsAudio$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ConnectSessionSettingsAudio.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ConnectSessionSettingsContext$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ConnectSessionSettingsContext.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ConnectSessionSettingsVariablesValue$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ConnectSessionSettingsVariablesValue.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Context$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/Context.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ContextType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ContextType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ControlPlanePublishEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ControlPlanePublishEvent.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$EmotionScores$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/EmotionScores.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Encoding$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/Encoding.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ErrorLevel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ErrorLevel.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ErrorResponse$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ErrorResponse.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$HttpValidationError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/HttpValidationError.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Inference$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/Inference.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$JsonMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/JsonMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$LanguageModelType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/LanguageModelType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$MillisecondInterval$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/MillisecondInterval.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ModelProviderEnum$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ModelProviderEnum.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PauseAssistantMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PauseAssistantMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedBuiltinTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedBuiltinTool.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedBuiltinToolName$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedBuiltinToolName.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedConfigPromptSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedConfigPromptSpec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedEllmModel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedEllmModel.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedEventMessageSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedEventMessageSpec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedEventMessageSpecs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedEventMessageSpecs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedLanguageModel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedLanguageModel.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedNudgeSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedNudgeSpec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedTimeoutSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedTimeoutSpec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedTimeoutSpecs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedTimeoutSpecs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedTimeoutSpecsInactivity$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedTimeoutSpecsInactivity.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedTimeoutSpecsMaxDuration$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedTimeoutSpecsMaxDuration.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedUserDefinedToolSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedUserDefinedToolSpec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedWebhookEventType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedWebhookEventType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$PostedWebhookSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/PostedWebhookSpec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ProsodyInference$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ProsodyInference.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ResumeAssistantMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ResumeAssistantMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnBuiltinTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnBuiltinTool.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnBuiltinToolToolType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnBuiltinToolToolType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChat.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatAudioReconstruction$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatAudioReconstruction.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatAudioReconstructionStatus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatAudioReconstructionStatus.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatEvent.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatEventRole$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatEventRole.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatEventType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatEventType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroup$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatGroup.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroupPagedAudioReconstructions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatGroupPagedAudioReconstructions.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroupPagedAudioReconstructionsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatGroupPagedAudioReconstructionsPaginationDirection.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroupPagedChats$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatGroupPagedChats.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroupPagedChatsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatGroupPagedChatsPaginationDirection.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroupPagedEvents$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatGroupPagedEvents.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatGroupPagedEventsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatGroupPagedEventsPaginationDirection.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatPagedEvents$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatPagedEvents.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatPagedEventsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatPagedEventsPaginationDirection.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatPagedEventsStatus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatPagedEventsStatus.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnChatStatus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnChatStatus.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnConfig$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnConfig.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnConfigSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnConfigSpec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnEllmModel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnEllmModel.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnEventMessageSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnEventMessageSpec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnEventMessageSpecs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnEventMessageSpecs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnLanguageModel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnLanguageModel.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnNudgeSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnNudgeSpec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPagedChatGroups$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPagedChatGroups.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPagedChatGroupsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPagedChatGroupsPaginationDirection.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPagedChats$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPagedChats.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPagedChatsPaginationDirection$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPagedChatsPaginationDirection.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPagedConfigs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPagedConfigs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPagedPrompts$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPagedPrompts.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPagedUserDefinedTools$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPagedUserDefinedTools.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPrompt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPrompt.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnPromptVersionType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnPromptVersionType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnTimeoutSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnTimeoutSpec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnTimeoutSpecs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnTimeoutSpecs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedTool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnUserDefinedTool.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedToolToolType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnUserDefinedToolToolType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnUserDefinedToolVersionType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnUserDefinedToolVersionType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnVoice$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnVoice.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnWebhookEventType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnWebhookEventType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ReturnWebhookSpec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ReturnWebhookSpec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Role$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/Role.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SessionSettings$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/SessionSettings.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SessionSettingsVariablesValue$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/SessionSettingsVariablesValue.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$SubscribeEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/SubscribeEvent.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$Tool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/Tool.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolCallMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolCallMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolErrorMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolErrorMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolResponseMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolResponseMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ToolType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ToolType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$UserInput$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/UserInput.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$UserInterruption$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/UserInterruption.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$UserMessage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/UserMessage.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ValidationError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ValidationError.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$ValidationErrorLocItem$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/ValidationErrorLocItem.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceId$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/VoiceId.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceName$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/VoiceName.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceProvider$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/VoiceProvider.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$VoiceRef$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/VoiceRef.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEvent.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventBase$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEventBase.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventChatEnded$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEventChatEnded.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventChatStarted$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEventChatStarted.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventChatStartType$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEventChatStartType.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventChatStatus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEventChatStatus.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebhookEventToolCall$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/WebhookEventToolCall.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$WebSocketError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/WebSocketError.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssistantEnd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssistantEnd"],
    "AssistantInput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssistantInput"],
    "AssistantMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssistantMessage"],
    "AssistantProsody",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssistantProsody"],
    "AudioConfiguration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AudioConfiguration"],
    "AudioInput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AudioInput"],
    "AudioOutput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AudioOutput"],
    "BuiltInTool",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BuiltInTool"],
    "BuiltinToolConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BuiltinToolConfig"],
    "ChatMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatMessage"],
    "ChatMessageToolResult",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatMessageToolResult"],
    "ChatMetadata",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatMetadata"],
    "ChatSocketResponse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatSocketResponse"],
    "ConnectSessionSettings",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectSessionSettings"],
    "ConnectSessionSettingsAudio",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectSessionSettingsAudio"],
    "ConnectSessionSettingsContext",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectSessionSettingsContext"],
    "ConnectSessionSettingsVariablesValue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectSessionSettingsVariablesValue"],
    "Context",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Context"],
    "ContextType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContextType"],
    "ControlPlanePublishEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ControlPlanePublishEvent"],
    "ControlPlaneSocketResponse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ControlPlaneSocketResponse"],
    "EmotionScores",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmotionScores"],
    "Encoding",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Encoding"],
    "ErrorLevel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ErrorLevel"],
    "ErrorResponse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ErrorResponse"],
    "HttpValidationError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HttpValidationError"],
    "Inference",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Inference"],
    "JsonMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonMessage"],
    "LanguageModelType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LanguageModelType"],
    "MillisecondInterval",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MillisecondInterval"],
    "ModelProviderEnum",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModelProviderEnum"],
    "PauseAssistantMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PauseAssistantMessage"],
    "PostedBuiltinTool",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedBuiltinTool"],
    "PostedBuiltinToolName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedBuiltinToolName"],
    "PostedConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfig"],
    "PostedConfigName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfigName"],
    "PostedConfigPromptSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfigPromptSpec"],
    "PostedConfigVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfigVersion"],
    "PostedConfigVersionDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedConfigVersionDescription"],
    "PostedEllmModel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedEllmModel"],
    "PostedEventMessageSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedEventMessageSpec"],
    "PostedEventMessageSpecs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedEventMessageSpecs"],
    "PostedLanguageModel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedLanguageModel"],
    "PostedNudgeSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedNudgeSpec"],
    "PostedPrompt",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedPrompt"],
    "PostedPromptName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedPromptName"],
    "PostedPromptVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedPromptVersion"],
    "PostedPromptVersionDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedPromptVersionDescription"],
    "PostedTimeoutSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedTimeoutSpec"],
    "PostedTimeoutSpecs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedTimeoutSpecs"],
    "PostedTimeoutSpecsInactivity",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedTimeoutSpecsInactivity"],
    "PostedTimeoutSpecsMaxDuration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedTimeoutSpecsMaxDuration"],
    "PostedUserDefinedTool",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedTool"],
    "PostedUserDefinedToolName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedToolName"],
    "PostedUserDefinedToolSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedToolSpec"],
    "PostedUserDefinedToolVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedToolVersion"],
    "PostedUserDefinedToolVersionDescription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedUserDefinedToolVersionDescription"],
    "PostedWebhookEventType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedWebhookEventType"],
    "PostedWebhookSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostedWebhookSpec"],
    "ProsodyInference",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProsodyInference"],
    "PublishEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublishEvent"],
    "ResumeAssistantMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResumeAssistantMessage"],
    "ReturnBuiltinTool",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnBuiltinTool"],
    "ReturnBuiltinToolToolType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnBuiltinToolToolType"],
    "ReturnChat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChat"],
    "ReturnChatAudioReconstruction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatAudioReconstruction"],
    "ReturnChatAudioReconstructionStatus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatAudioReconstructionStatus"],
    "ReturnChatEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatEvent"],
    "ReturnChatEventRole",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatEventRole"],
    "ReturnChatEventType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatEventType"],
    "ReturnChatGroup",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatGroup"],
    "ReturnChatGroupPagedAudioReconstructions",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatGroupPagedAudioReconstructions"],
    "ReturnChatGroupPagedAudioReconstructionsPaginationDirection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatGroupPagedAudioReconstructionsPaginationDirection"],
    "ReturnChatGroupPagedChats",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatGroupPagedChats"],
    "ReturnChatGroupPagedChatsPaginationDirection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatGroupPagedChatsPaginationDirection"],
    "ReturnChatGroupPagedEvents",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatGroupPagedEvents"],
    "ReturnChatGroupPagedEventsPaginationDirection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatGroupPagedEventsPaginationDirection"],
    "ReturnChatPagedEvents",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatPagedEvents"],
    "ReturnChatPagedEventsPaginationDirection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatPagedEventsPaginationDirection"],
    "ReturnChatPagedEventsStatus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatPagedEventsStatus"],
    "ReturnChatStatus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnChatStatus"],
    "ReturnConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnConfig"],
    "ReturnConfigSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnConfigSpec"],
    "ReturnEllmModel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnEllmModel"],
    "ReturnEventMessageSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnEventMessageSpec"],
    "ReturnEventMessageSpecs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnEventMessageSpecs"],
    "ReturnLanguageModel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnLanguageModel"],
    "ReturnNudgeSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnNudgeSpec"],
    "ReturnPagedChatGroups",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPagedChatGroups"],
    "ReturnPagedChatGroupsPaginationDirection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPagedChatGroupsPaginationDirection"],
    "ReturnPagedChats",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPagedChats"],
    "ReturnPagedChatsPaginationDirection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPagedChatsPaginationDirection"],
    "ReturnPagedConfigs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPagedConfigs"],
    "ReturnPagedPrompts",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPagedPrompts"],
    "ReturnPagedUserDefinedTools",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPagedUserDefinedTools"],
    "ReturnPrompt",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPrompt"],
    "ReturnPromptVersionType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnPromptVersionType"],
    "ReturnTimeoutSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnTimeoutSpec"],
    "ReturnTimeoutSpecs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnTimeoutSpecs"],
    "ReturnUserDefinedTool",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnUserDefinedTool"],
    "ReturnUserDefinedToolToolType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnUserDefinedToolToolType"],
    "ReturnUserDefinedToolVersionType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnUserDefinedToolVersionType"],
    "ReturnVoice",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnVoice"],
    "ReturnWebhookEventType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnWebhookEventType"],
    "ReturnWebhookSpec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReturnWebhookSpec"],
    "Role",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"],
    "SessionSettings",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SessionSettings"],
    "SessionSettingsVariablesValue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SessionSettingsVariablesValue"],
    "SubscribeEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubscribeEvent"],
    "Tool",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tool"],
    "ToolCallMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolCallMessage"],
    "ToolErrorMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolErrorMessage"],
    "ToolResponseMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolResponseMessage"],
    "ToolType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolType"],
    "UserInput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserInput"],
    "UserInterruption",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserInterruption"],
    "UserMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserMessage"],
    "ValidationError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ValidationError"],
    "ValidationErrorLocItem",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ValidationErrorLocItem"],
    "VoiceId",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceId"],
    "VoiceName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceName"],
    "VoiceProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceProvider"],
    "VoiceRef",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceRef"],
    "WebSocketError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebSocketError"],
    "WebhookEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEvent"],
    "WebhookEventBase",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEventBase"],
    "WebhookEventChatEnded",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEventChatEnded"],
    "WebhookEventChatStartType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEventChatStartType"],
    "WebhookEventChatStarted",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEventChatStarted"],
    "WebhookEventChatStatus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEventChatStatus"],
    "WebhookEventToolCall",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebhookEventToolCall"],
    "chat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["chat"],
    "configs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["configs"],
    "controlPlane",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["controlPlane"],
    "prompts",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prompts"],
    "tools",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tools"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/types/index.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/serialization/resources/empathicVoice/index.mjs [app-ssr] (ecmascript) <export * as empathicVoice>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "empathicVoice",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/index.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/api/resources/empathicVoice/resources/chat/client/Socket.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatSocket",
    ()=>ChatSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$websocket$2f$ws$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/websocket/ws.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$types$2f$PublishEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/resources/chat/types/PublishEvent.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$json$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/json.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__empathicVoice$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/index.mjs [app-ssr] (ecmascript) <export * as empathicVoice>");
/** THIS FILE IS MANUALLY MAINTAINED: see .fernignore */ var __awaiter = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
;
;
;
;
class ChatSocket {
    constructor(args){
        this.eventHandlers = {};
        this.handleOpen = ()=>{
            var _a, _b;
            (_b = (_a = this.eventHandlers).open) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        this.handleMessage = (event)=>{
            var _a, _b, _c, _d;
            const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$json$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromJson"])(event.data);
            const parsedResponse = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__empathicVoice$3e$__["empathicVoice"].ChatSocketResponse.parse(data, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                omitUndefined: true
            });
            if (parsedResponse.ok) {
                (_b = (_a = this.eventHandlers).message) === null || _b === void 0 ? void 0 : _b.call(_a, Object.assign(Object.assign({}, parsedResponse.value), {
                    receivedAt: new Date()
                }));
            } else {
                (_d = (_c = this.eventHandlers).error) === null || _d === void 0 ? void 0 : _d.call(_c, new Error("Received unknown message type"));
            }
        };
        this.handleClose = (event)=>{
            var _a, _b;
            (_b = (_a = this.eventHandlers).close) === null || _b === void 0 ? void 0 : _b.call(_a, event);
        };
        this.handleError = (event)=>{
            var _a, _b;
            const message = event.message;
            (_b = (_a = this.eventHandlers).error) === null || _b === void 0 ? void 0 : _b.call(_a, new Error(message));
        };
        this.socket = args.socket;
        this.socket.addEventListener("open", this.handleOpen);
        this.socket.addEventListener("message", this.handleMessage);
        this.socket.addEventListener("close", this.handleClose);
        this.socket.addEventListener("error", this.handleError);
    }
    /** The current state of the connection; this is one of the readyState constants. */ get readyState() {
        return this.socket.readyState;
    }
    /**
     * @param event - The event to attach to.
     * @param callback - The callback to run when the event is triggered.
     * Usage:
     * ```typescript
     * this.on('open', () => {
     *     console.log('The websocket is open');
     * });
     * ```
     */ on(event, callback) {
        this.eventHandlers[event] = callback;
    }
    sendPublish(message) {
        this.assertSocketIsOpen();
        const jsonPayload = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$types$2f$PublishEvent$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublishEvent"].jsonOrThrow(message, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            omitUndefined: true
        });
        this.socket.send(JSON.stringify(jsonPayload));
    }
    /**
     * Send audio input
     */ sendAudioInput(message) {
        this.sendPublish(Object.assign({
            type: "audio_input"
        }, message));
    }
    /**
     * Send session settings
     */ sendSessionSettings(message = {}) {
        this.sendPublish(Object.assign({
            type: "session_settings"
        }, message));
    }
    /**
     * Send assistant input
     */ sendAssistantInput(message) {
        this.sendPublish(Object.assign({
            type: "assistant_input"
        }, message));
    }
    /**
     * Send pause assistant message
     */ pauseAssistant(message = {}) {
        this.sendPublish(Object.assign({
            type: "pause_assistant_message"
        }, message));
    }
    /**
     * Send resume assistant message
     */ resumeAssistant(message = {}) {
        this.sendPublish(Object.assign({
            type: "resume_assistant_message"
        }, message));
    }
    /**
     * Send tool response message
     */ sendToolResponseMessage(message) {
        this.sendPublish(Object.assign({
            type: "tool_response"
        }, message));
    }
    /**
     * Send tool error message
     */ sendToolErrorMessage(message) {
        this.sendPublish(Object.assign({
            type: "tool_error"
        }, message));
    }
    /**
     * Send text input
     */ sendUserInput(text) {
        this.sendPublish({
            type: "user_input",
            text
        });
    }
    /** Connect to the websocket and register event handlers. */ connect() {
        this.socket.reconnect();
        this.socket.addEventListener("open", this.handleOpen);
        this.socket.addEventListener("message", this.handleMessage);
        this.socket.addEventListener("close", this.handleClose);
        this.socket.addEventListener("error", this.handleError);
        return this;
    }
    /** Close the websocket and unregister event handlers. */ close() {
        this.socket.close();
        this.handleClose({
            code: 1000
        });
        this.socket.removeEventListener("open", this.handleOpen);
        this.socket.removeEventListener("message", this.handleMessage);
        this.socket.removeEventListener("close", this.handleClose);
        this.socket.removeEventListener("error", this.handleError);
    }
    /** Returns a promise that resolves when the websocket is open. */ waitForOpen() {
        return __awaiter(this, void 0, void 0, function*() {
            if (this.socket.readyState === __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$websocket$2f$ws$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReconnectingWebSocket"].OPEN) {
                return this.socket;
            }
            return new Promise((resolve, reject)=>{
                this.socket.addEventListener("open", ()=>{
                    resolve(this.socket);
                });
                this.socket.addEventListener("error", (event)=>{
                    reject(event);
                });
            });
        });
    }
    /**
     * @deprecated Use waitForOpen() instead
     */ tillSocketOpen() {
        return __awaiter(this, void 0, void 0, function*() {
            return this.waitForOpen();
        });
    }
    /** Asserts that the websocket is open. */ assertSocketIsOpen() {
        if (!this.socket) {
            throw new Error("Socket is not connected.");
        }
        if (this.socket.readyState !== __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$websocket$2f$ws$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReconnectingWebSocket"].OPEN) {
            throw new Error("Socket is not open.");
        }
    }
    /** Send a binary payload to the websocket. */ sendBinary(payload) {
        this.socket.send(payload);
    }
}
}),
"[project]/dist/esm/environments.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
__turbopack_context__.s([
    "HumeEnvironment",
    ()=>HumeEnvironment
]);
const HumeEnvironment = {
    Prod: {
        base: "https://api.hume.ai",
        evi: "wss://api.hume.ai/v0/evi",
        tts: "wss://api.hume.ai/v0/tts",
        stream: "wss://api.hume.ai/v0/stream"
    }
};
}),
"[project]/dist/esm/core/url/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
}),
"[project]/dist/esm/core/url/encodePathParam.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "encodePathParam",
    ()=>encodePathParam
]);
function encodePathParam(param) {
    if (param === null) {
        return "null";
    }
    const typeofParam = typeof param;
    switch(typeofParam){
        case "undefined":
            return "undefined";
        case "string":
        case "number":
        case "boolean":
            break;
        default:
            param = String(param);
            break;
    }
    return encodeURIComponent(param);
}
}),
"[project]/dist/esm/core/url/join.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "join",
    ()=>join
]);
function join(base, ...segments) {
    if (!base) {
        return "";
    }
    if (segments.length === 0) {
        return base;
    }
    if (base.includes("://")) {
        let url;
        try {
            url = new URL(base);
        } catch (_a) {
            // Fallback to path joining if URL is malformed
            return joinPath(base, ...segments);
        }
        const lastSegment = segments[segments.length - 1];
        const shouldPreserveTrailingSlash = lastSegment === null || lastSegment === void 0 ? void 0 : lastSegment.endsWith("/");
        for (const segment of segments){
            const cleanSegment = trimSlashes(segment);
            if (cleanSegment) {
                url.pathname = joinPathSegments(url.pathname, cleanSegment);
            }
        }
        if (shouldPreserveTrailingSlash && !url.pathname.endsWith("/")) {
            url.pathname += "/";
        }
        return url.toString();
    }
    return joinPath(base, ...segments);
}
function joinPath(base, ...segments) {
    if (segments.length === 0) {
        return base;
    }
    let result = base;
    const lastSegment = segments[segments.length - 1];
    const shouldPreserveTrailingSlash = lastSegment === null || lastSegment === void 0 ? void 0 : lastSegment.endsWith("/");
    for (const segment of segments){
        const cleanSegment = trimSlashes(segment);
        if (cleanSegment) {
            result = joinPathSegments(result, cleanSegment);
        }
    }
    if (shouldPreserveTrailingSlash && !result.endsWith("/")) {
        result += "/";
    }
    return result;
}
function joinPathSegments(left, right) {
    if (left.endsWith("/")) {
        return left + right;
    }
    return `${left}/${right}`;
}
function trimSlashes(str) {
    if (!str) return str;
    let start = 0;
    let end = str.length;
    if (str.startsWith("/")) start = 1;
    if (str.endsWith("/")) end = str.length - 1;
    return start === 0 && end === str.length ? str : str.slice(start, end);
}
}),
"[project]/dist/esm/core/url/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "encodePathParam",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$url$2f$encodePathParam$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodePathParam"],
    "join",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$url$2f$join$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["join"],
    "toQueryString",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$url$2f$qs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toQueryString"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$url$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/url/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$url$2f$encodePathParam$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/url/encodePathParam.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$url$2f$join$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/url/join.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$url$2f$qs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/url/qs.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/core/url/index.mjs [app-ssr] (ecmascript) <export * as url>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "url",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$url$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$url$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/url/index.mjs [app-ssr] (ecmascript)");
}),
"[project]/dist/esm/core/fetcher/Supplier.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Supplier",
    ()=>Supplier
]);
const Supplier = {
    get: (supplier)=>{
        if (typeof supplier === "function") {
            return supplier();
        } else {
            return supplier;
        }
    },
    map: (supplier, f)=>{
        if (typeof supplier === "function") {
            return ()=>f(Supplier.get(supplier));
        } else {
            return f(supplier);
        }
    }
};
}),
"[project]/dist/esm/core/headers.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mergeHeaders",
    ()=>mergeHeaders,
    "mergeOnlyDefinedHeaders",
    ()=>mergeOnlyDefinedHeaders
]);
function mergeHeaders(...headersArray) {
    const result = {};
    for (const [key, value] of headersArray.filter((headers)=>headers != null).flatMap((headers)=>Object.entries(headers))){
        const insensitiveKey = key.toLowerCase();
        if (value != null) {
            result[insensitiveKey] = value;
        } else if (insensitiveKey in result) {
            delete result[insensitiveKey];
        }
    }
    return result;
}
function mergeOnlyDefinedHeaders(...headersArray) {
    const result = {};
    for (const [key, value] of headersArray.filter((headers)=>headers != null).flatMap((headers)=>Object.entries(headers))){
        const insensitiveKey = key.toLowerCase();
        if (value != null) {
            result[insensitiveKey] = value;
        }
    }
    return result;
}
}),
"[project]/dist/esm/api/resources/empathicVoice/resources/chat/client/Client.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Chat",
    ()=>Chat
]);
/** THIS FILE IS MANUALLY MAINTAINED: see .fernignore */ var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$environments$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/environments.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$websocket$2f$ws$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/websocket/ws.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$url$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__url$3e$__ = __turbopack_context__.i("[project]/dist/esm/core/url/index.mjs [app-ssr] (ecmascript) <export * as url>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$fetcher$2f$Supplier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/fetcher/Supplier.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$headers$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/core/headers.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__empathicVoice$3e$__ = __turbopack_context__.i("[project]/dist/esm/serialization/resources/empathicVoice/index.mjs [app-ssr] (ecmascript) <export * as empathicVoice>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$api$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$client$2f$Socket$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/api/resources/empathicVoice/resources/chat/client/Socket.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
class Chat {
    constructor(_options = {}){
        this._options = _options;
    }
    connect(args = {}) {
        var _a, _b;
        const { accessToken, configId, configVersion, eventLimit, resumedChatGroupId, verboseTranscription, voiceId, apiKey, sessionSettings, queryParams, headers, debug, reconnectAttempts, allowConnection } = args;
        const _queryParams = {};
        if (accessToken != null) {
            _queryParams["access_token"] = accessToken;
        }
        if (configId != null) {
            _queryParams["config_id"] = configId;
        }
        if (configVersion != null) {
            _queryParams["config_version"] = typeof configVersion === "number" ? configVersion.toString() : configVersion;
        }
        if (eventLimit != null) {
            _queryParams["event_limit"] = eventLimit.toString();
        }
        if (resumedChatGroupId != null) {
            _queryParams["resumed_chat_group_id"] = resumedChatGroupId;
        }
        if (verboseTranscription != null) {
            _queryParams["verbose_transcription"] = verboseTranscription.toString();
        }
        if (voiceId != null) {
            _queryParams["voice_id"] = voiceId;
        }
        if (apiKey != null) {
            _queryParams["api_key"] = apiKey;
        }
        if (allowConnection != null) {
            _queryParams["allow_connection"] = allowConnection === true ? "true" : "false";
        }
        if (sessionSettings != null) {
            _queryParams["session_settings"] = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$serialization$2f$resources$2f$empathicVoice$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__empathicVoice$3e$__["empathicVoice"].ConnectSessionSettings.jsonOrThrow(sessionSettings, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                omitUndefined: true,
                breadcrumbsPrefix: [
                    "request",
                    "sessionSettings"
                ]
            });
        }
        // Merge in any additional query parameters
        if (queryParams != null) {
            for (const [name, value] of Object.entries(queryParams)){
                _queryParams[name] = value;
            }
        }
        let _headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$headers$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeHeaders"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$headers$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeOnlyDefinedHeaders"])(Object.assign({}, this._getCustomAuthorizationHeaders())), headers);
        const socket = new __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$websocket$2f$ws$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReconnectingWebSocket"]({
            url: __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$url$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__url$3e$__["url"].join((_a = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$fetcher$2f$Supplier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Supplier"].get(this._options["baseUrl"])) !== null && _a !== void 0 ? _a : ((_b = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$fetcher$2f$Supplier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Supplier"].get(this._options["environment"])) !== null && _b !== void 0 ? _b : __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$environments$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HumeEnvironment"].Prod).evi, "/chat"),
            protocols: [],
            queryParameters: _queryParams,
            headers: _headers,
            options: {
                debug: debug !== null && debug !== void 0 ? debug : false,
                maxRetries: reconnectAttempts !== null && reconnectAttempts !== void 0 ? reconnectAttempts : 30
            }
        });
        return new __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$api$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$client$2f$Socket$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatSocket"]({
            socket
        });
    }
    _getCustomAuthorizationHeaders() {
        var _a;
        const apiKeyValue = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$fetcher$2f$Supplier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Supplier"].get(this._options.apiKey);
        // This `authHeaderValue` is manually added as if you don't provide it it will
        // be omitted from the headers which means it won't reach the logic in ws.ts that
        // extracts values from the headers and adds them to query parameters.
        const authHeaderValue = __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$core$2f$fetcher$2f$Supplier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Supplier"].get((_a = this._options.headers) === null || _a === void 0 ? void 0 : _a.authorization);
        return {
            "X-Hume-Api-Key": apiKeyValue,
            Authorization: authHeaderValue
        };
    }
}
}),
"[project]/dist/esm/api/resources/empathicVoice/resources/chat/client/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Chat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$api$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$client$2f$Client$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Chat"],
    "ChatSocket",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$api$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$client$2f$Socket$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatSocket"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$api$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dist/esm/api/resources/empathicVoice/resources/chat/client/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$api$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$client$2f$Socket$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/api/resources/empathicVoice/resources/chat/client/Socket.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dist$2f$esm$2f$api$2f$resources$2f$empathicVoice$2f$resources$2f$chat$2f$client$2f$Client$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dist/esm/api/resources/empathicVoice/resources/chat/client/Client.mjs [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e27d9897._.js.map