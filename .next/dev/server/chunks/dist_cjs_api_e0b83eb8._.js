module.exports = [
"[project]/dist/cjs/api/resources/empathicVoice/resources/chat/client/Socket.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** THIS FILE IS MANUALLY MAINTAINED: see .fernignore */ var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChatSocket = void 0;
const core = __importStar(__turbopack_context__.r("[project]/dist/cjs/core/index.js [app-route] (ecmascript)"));
const PublishEvent_js_1 = __turbopack_context__.r("[project]/dist/cjs/serialization/resources/empathicVoice/resources/chat/types/PublishEvent.js [app-route] (ecmascript)");
const json_js_1 = __turbopack_context__.r("[project]/dist/cjs/core/json.js [app-route] (ecmascript)");
const serializers = __importStar(__turbopack_context__.r("[project]/dist/cjs/serialization/index.js [app-route] (ecmascript)"));
class ChatSocket {
    constructor(args){
        this.eventHandlers = {};
        this.handleOpen = ()=>{
            var _a, _b;
            (_b = (_a = this.eventHandlers).open) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        this.handleMessage = (event)=>{
            var _a, _b, _c, _d;
            const data = (0, json_js_1.fromJson)(event.data);
            const parsedResponse = serializers.empathicVoice.ChatSocketResponse.parse(data, {
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
        const jsonPayload = PublishEvent_js_1.PublishEvent.jsonOrThrow(message, {
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
            if (this.socket.readyState === core.ReconnectingWebSocket.OPEN) {
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
        if (this.socket.readyState !== core.ReconnectingWebSocket.OPEN) {
            throw new Error("Socket is not open.");
        }
    }
    /** Send a binary payload to the websocket. */ sendBinary(payload) {
        this.socket.send(payload);
    }
}
exports.ChatSocket = ChatSocket;
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/chat/client/Client.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** THIS FILE IS MANUALLY MAINTAINED: see .fernignore */ var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Chat = void 0;
const environments = __importStar(__turbopack_context__.r("[project]/dist/cjs/environments.js [app-route] (ecmascript)"));
const core = __importStar(__turbopack_context__.r("[project]/dist/cjs/core/index.js [app-route] (ecmascript)"));
const headers_js_1 = __turbopack_context__.r("[project]/dist/cjs/core/headers.js [app-route] (ecmascript)");
const serializers = __importStar(__turbopack_context__.r("[project]/dist/cjs/serialization/index.js [app-route] (ecmascript)"));
const Socket_js_1 = __turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/chat/client/Socket.js [app-route] (ecmascript)");
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
            _queryParams["session_settings"] = serializers.empathicVoice.ConnectSessionSettings.jsonOrThrow(sessionSettings, {
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
        let _headers = (0, headers_js_1.mergeHeaders)((0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, this._getCustomAuthorizationHeaders())), headers);
        const socket = new core.ReconnectingWebSocket({
            url: core.url.join((_a = core.Supplier.get(this._options["baseUrl"])) !== null && _a !== void 0 ? _a : ((_b = core.Supplier.get(this._options["environment"])) !== null && _b !== void 0 ? _b : environments.HumeEnvironment.Prod).evi, "/chat"),
            protocols: [],
            queryParameters: _queryParams,
            headers: _headers,
            options: {
                debug: debug !== null && debug !== void 0 ? debug : false,
                maxRetries: reconnectAttempts !== null && reconnectAttempts !== void 0 ? reconnectAttempts : 30
            }
        });
        return new Socket_js_1.ChatSocket({
            socket
        });
    }
    _getCustomAuthorizationHeaders() {
        var _a;
        const apiKeyValue = core.Supplier.get(this._options.apiKey);
        // This `authHeaderValue` is manually added as if you don't provide it it will
        // be omitted from the headers which means it won't reach the logic in ws.ts that
        // extracts values from the headers and adds them to query parameters.
        const authHeaderValue = core.Supplier.get((_a = this._options.headers) === null || _a === void 0 ? void 0 : _a.authorization);
        return {
            "X-Hume-Api-Key": apiKeyValue,
            Authorization: authHeaderValue
        };
    }
}
exports.Chat = Chat;
}),
"[project]/dist/cjs/api/resources/empathicVoice/client/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/errors/BadRequestError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BadRequestError = void 0;
const errors = __importStar(__turbopack_context__.r("[project]/dist/cjs/errors/index.js [app-route] (ecmascript)"));
class BadRequestError extends errors.HumeError {
    constructor(body, rawResponse){
        super({
            message: "BadRequestError",
            statusCode: 400,
            body: body,
            rawResponse: rawResponse
        });
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
exports.BadRequestError = BadRequestError;
}),
"[project]/dist/cjs/api/resources/empathicVoice/errors/UnprocessableEntityError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UnprocessableEntityError = void 0;
const errors = __importStar(__turbopack_context__.r("[project]/dist/cjs/errors/index.js [app-route] (ecmascript)"));
class UnprocessableEntityError extends errors.HumeError {
    constructor(body, rawResponse){
        super({
            message: "UnprocessableEntityError",
            statusCode: 422,
            body: body,
            rawResponse: rawResponse
        });
        Object.setPrototypeOf(this, UnprocessableEntityError.prototype);
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
}),
"[project]/dist/cjs/api/resources/empathicVoice/errors/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/errors/BadRequestError.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/errors/UnprocessableEntityError.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/chat/types/PublishEvent.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/chat/types/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/chat/types/PublishEvent.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/chat/client/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Chat = exports.ChatSocket = void 0;
/** THIS FILE IS MANUALLY MAINTAINED: see .fernignore */ var Socket_js_1 = __turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/chat/client/Socket.js [app-route] (ecmascript)");
Object.defineProperty(exports, "ChatSocket", {
    enumerable: true,
    get: function() {
        return Socket_js_1.ChatSocket;
    }
});
var Client_js_1 = __turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/chat/client/Client.js [app-route] (ecmascript)");
Object.defineProperty(exports, "Chat", {
    enumerable: true,
    get: function() {
        return Client_js_1.Chat;
    }
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/chat/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/chat/types/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/chat/client/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/chatGroups/client/requests/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/chatGroups/client/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/chatGroups/client/requests/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/chatGroups/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/chatGroups/client/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/chats/client/requests/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/chats/client/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/chats/client/requests/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/chats/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/chats/client/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/configs/client/requests/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/configs/client/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/configs/client/requests/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/configs/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/configs/client/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/controlPlane/client/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/controlPlane/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/controlPlane/client/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/prompts/client/requests/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/prompts/client/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/prompts/client/requests/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/prompts/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/prompts/client/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/tools/client/requests/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/tools/client/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/tools/client/requests/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/tools/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/tools/client/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tools = exports.prompts = exports.controlPlane = exports.configs = exports.chats = exports.chatGroups = exports.chat = void 0;
exports.chat = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/chat/index.js [app-route] (ecmascript)"));
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/chat/types/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/chatGroups/client/requests/index.js [app-route] (ecmascript)"), exports);
exports.chatGroups = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/chatGroups/index.js [app-route] (ecmascript)"));
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/chats/client/requests/index.js [app-route] (ecmascript)"), exports);
exports.chats = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/chats/index.js [app-route] (ecmascript)"));
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/configs/client/requests/index.js [app-route] (ecmascript)"), exports);
exports.configs = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/configs/index.js [app-route] (ecmascript)"));
exports.controlPlane = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/controlPlane/index.js [app-route] (ecmascript)"));
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/prompts/client/requests/index.js [app-route] (ecmascript)"), exports);
exports.prompts = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/prompts/index.js [app-route] (ecmascript)"));
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/tools/client/requests/index.js [app-route] (ecmascript)"), exports);
exports.tools = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/tools/index.js [app-route] (ecmascript)"));
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/AssistantEnd.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/AssistantInput.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/AssistantMessage.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/AssistantProsody.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/AudioConfiguration.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/AudioInput.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/AudioOutput.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/BuiltInTool.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BuiltInTool = void 0;
exports.BuiltInTool = {
    WebSearch: "web_search",
    HangUp: "hang_up"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/BuiltinToolConfig.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ChatMessage.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ChatMessageToolResult.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ChatMetadata.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ConnectSessionSettings.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ConnectSessionSettingsAudio.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ConnectSessionSettingsContext.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ConnectSessionSettingsVariablesValue.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/Context.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ContextType.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ContextType = void 0;
exports.ContextType = {
    Persistent: "persistent",
    Temporary: "temporary"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ControlPlanePublishEvent.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/EmotionScores.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/Encoding.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ErrorLevel.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ErrorResponse.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/HttpValidationError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/Inference.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/JsonMessage.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/LanguageModelType.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LanguageModelType = void 0;
exports.LanguageModelType = {
    Claude37SonnetLatest: "claude-3-7-sonnet-latest",
    Claude35SonnetLatest: "claude-3-5-sonnet-latest",
    Claude35HaikuLatest: "claude-3-5-haiku-latest",
    Claude35Sonnet20240620: "claude-3-5-sonnet-20240620",
    Claude3Opus20240229: "claude-3-opus-20240229",
    Claude3Sonnet20240229: "claude-3-sonnet-20240229",
    Claude3Haiku20240307: "claude-3-haiku-20240307",
    ClaudeSonnet420250514: "claude-sonnet-4-20250514",
    ClaudeSonnet4520250929: "claude-sonnet-4-5-20250929",
    ClaudeHaiku4520251001: "claude-haiku-4-5-20251001",
    UsAnthropicClaude35Haiku20241022V10: "us.anthropic.claude-3-5-haiku-20241022-v1:0",
    UsAnthropicClaude35Sonnet20240620V10: "us.anthropic.claude-3-5-sonnet-20240620-v1:0",
    UsAnthropicClaude3Haiku20240307V10: "us.anthropic.claude-3-haiku-20240307-v1:0",
    GptOss120B: "gpt-oss-120b",
    Qwen3235Ba22B: "qwen-3-235b-a22b",
    Qwen3235Ba22BInstruct2507: "qwen-3-235b-a22b-instruct-2507",
    Qwen3235Ba22BThinking2507: "qwen-3-235b-a22b-thinking-2507",
    Gemini15Pro: "gemini-1.5-pro",
    Gemini15Flash: "gemini-1.5-flash",
    Gemini15Pro002: "gemini-1.5-pro-002",
    Gemini15Flash002: "gemini-1.5-flash-002",
    Gemini20Flash: "gemini-2.0-flash",
    Gemini25Flash: "gemini-2.5-flash",
    Gemini25FlashPreview0417: "gemini-2.5-flash-preview-04-17",
    Gpt4Turbo: "gpt-4-turbo",
    Gpt4TurboPreview: "gpt-4-turbo-preview",
    Gpt35Turbo0125: "gpt-3.5-turbo-0125",
    Gpt35Turbo: "gpt-3.5-turbo",
    Gpt4O: "gpt-4o",
    Gpt4OMini: "gpt-4o-mini",
    Gpt41: "gpt-4.1",
    Gpt5: "gpt-5",
    Gpt5Mini: "gpt-5-mini",
    Gpt5Nano: "gpt-5-nano",
    Gpt4OPriority: "gpt-4o-priority",
    Gpt4OMiniPriority: "gpt-4o-mini-priority",
    Gpt41Priority: "gpt-4.1-priority",
    Gpt5Priority: "gpt-5-priority",
    Gpt5MiniPriority: "gpt-5-mini-priority",
    Gpt5NanoPriority: "gpt-5-nano-priority",
    Gemma7BIt: "gemma-7b-it",
    Llama38B8192: "llama3-8b-8192",
    Llama370B8192: "llama3-70b-8192",
    Llama3170BVersatile: "llama-3.1-70b-versatile",
    Llama3370BVersatile: "llama-3.3-70b-versatile",
    Llama318BInstant: "llama-3.1-8b-instant",
    MoonshotaiKimiK2Instruct: "moonshotai/kimi-k2-instruct",
    AccountsFireworksModelsMixtral8X7BInstruct: "accounts/fireworks/models/mixtral-8x7b-instruct",
    AccountsFireworksModelsLlamaV3P1405BInstruct: "accounts/fireworks/models/llama-v3p1-405b-instruct",
    AccountsFireworksModelsLlamaV3P170BInstruct: "accounts/fireworks/models/llama-v3p1-70b-instruct",
    AccountsFireworksModelsLlamaV3P18BInstruct: "accounts/fireworks/models/llama-v3p1-8b-instruct",
    Sonar: "sonar",
    SonarPro: "sonar-pro",
    Sambanova: "sambanova",
    DeepSeekR1DistillLlama70B: "DeepSeek-R1-Distill-Llama-70B",
    Llama4Maverick17B128EInstruct: "Llama-4-Maverick-17B-128E-Instruct",
    Qwen332B: "Qwen3-32B",
    Grok4FastNonReasoningLatest: "grok-4-fast-non-reasoning-latest",
    Ellm: "ellm",
    CustomLanguageModel: "custom-language-model",
    HumeEvi3WebSearch: "hume-evi-3-web-search"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/MillisecondInterval.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ModelProviderEnum.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ModelProviderEnum = void 0;
exports.ModelProviderEnum = {
    Groq: "GROQ",
    OpenAi: "OPEN_AI",
    Fireworks: "FIREWORKS",
    Anthropic: "ANTHROPIC",
    CustomLanguageModel: "CUSTOM_LANGUAGE_MODEL",
    Google: "GOOGLE",
    HumeAi: "HUME_AI",
    AmazonBedrock: "AMAZON_BEDROCK",
    Perplexity: "PERPLEXITY",
    Sambanova: "SAMBANOVA",
    Cerebras: "CEREBRAS"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/PauseAssistantMessage.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/PostedBuiltinTool.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/PostedBuiltinToolName.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PostedBuiltinToolName = void 0;
/**
 * Name of the built-in tool to use. Hume supports the following built-in tools:
 *
 * - **web_search:** enables EVI to search the web for up-to-date information when applicable.
 * - **hang_up:** closes the WebSocket connection when appropriate (e.g., after detecting a farewell in the conversation).
 *
 * For more information, see our guide on [using built-in tools](/docs/speech-to-speech-evi/features/tool-use#using-built-in-tools).
 */ exports.PostedBuiltinToolName = {
    WebSearch: "web_search",
    HangUp: "hang_up"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/PostedConfigPromptSpec.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/PostedEllmModel.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/PostedEventMessageSpec.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/PostedEventMessageSpecs.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/PostedLanguageModel.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/PostedNudgeSpec.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/PostedTimeoutSpec.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/PostedTimeoutSpecs.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/PostedTimeoutSpecsInactivity.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/PostedTimeoutSpecsMaxDuration.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/PostedUserDefinedToolSpec.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/PostedWebhookEventType.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PostedWebhookEventType = void 0;
/** Events this URL is subscribed to */ exports.PostedWebhookEventType = {
    ChatStarted: "chat_started",
    ChatEnded: "chat_ended",
    ToolCall: "tool_call"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/PostedWebhookSpec.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ProsodyInference.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ResumeAssistantMessage.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnBuiltinTool.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnBuiltinToolToolType.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReturnBuiltinToolToolType = void 0;
/** Type of Tool. Either `BUILTIN` for natively implemented tools, like web search, or `FUNCTION` for user-defined tools. */ exports.ReturnBuiltinToolToolType = {
    Builtin: "BUILTIN",
    Function: "FUNCTION"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChat.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatAudioReconstruction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatAudioReconstructionStatus.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReturnChatAudioReconstructionStatus = void 0;
/**
 * Indicates the current state of the audio reconstruction job. There are five possible statuses:
 *
 * - `QUEUED`: The reconstruction job is waiting to be processed.
 *
 * - `IN_PROGRESS`: The reconstruction is currently being processed.
 *
 * - `COMPLETE`: The audio reconstruction is finished and ready for download.
 *
 * - `ERROR`: An error occurred during the reconstruction process.
 *
 * - `CANCELED`: The reconstruction job has been canceled.
 */ exports.ReturnChatAudioReconstructionStatus = {
    Queued: "QUEUED",
    InProgress: "IN_PROGRESS",
    Complete: "COMPLETE",
    Error: "ERROR",
    Cancelled: "CANCELLED"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatEvent.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatEventRole.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReturnChatEventRole = void 0;
/**
 * The role of the entity which generated the Chat Event. There are four possible values:
 * - `USER`: The user, capable of sending user messages and interruptions.
 * - `AGENT`: The assistant, capable of sending agent messages.
 * - `SYSTEM`: The backend server, capable of transmitting errors.
 * - `TOOL`: The function calling mechanism.
 */ exports.ReturnChatEventRole = {
    User: "USER",
    Agent: "AGENT",
    System: "SYSTEM",
    Tool: "TOOL"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatEventType.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReturnChatEventType = void 0;
/**
 * Type of Chat Event. There are eleven Chat Event types:
 * - `SYSTEM_PROMPT`: The system prompt used to initialize the session.
 * - `CHAT_START_MESSAGE`: Marks the beginning of the chat session.
 * - `USER_RECORDING_START_MESSAGE`: Marks when the client began streaming audio and the start of audio processing.
 * - `USER_MESSAGE`: A message sent by the user.
 * - `USER_INTERRUPTION`: A user-initiated interruption while the assistant is speaking.
 * - `AGENT_MESSAGE`: A response generated by the assistant.
 * - `FUNCTION_CALL`: A record of a tool invocation by the assistant.
 * - `FUNCTION_CALL_RESPONSE`: The result of a previously invoked function or tool.
 * - `PAUSE_ONSET`: Marks when the client sent a `pause_assistant_message` to pause the assistant.
 * - `RESUME_ONSET`: Marks when the client sent a `resume_assistant_message` to resume the assistant.
 * - `CHAT_END_MESSAGE`: Indicates the end of the chat session.
 */ exports.ReturnChatEventType = {
    FunctionCall: "FUNCTION_CALL",
    FunctionCallResponse: "FUNCTION_CALL_RESPONSE",
    ChatEndMessage: "CHAT_END_MESSAGE",
    AgentMessage: "AGENT_MESSAGE",
    SystemPrompt: "SYSTEM_PROMPT",
    UserRecordingStartMessage: "USER_RECORDING_START_MESSAGE",
    ResumeOnset: "RESUME_ONSET",
    UserInterruption: "USER_INTERRUPTION",
    ChatStartMessage: "CHAT_START_MESSAGE",
    PauseOnset: "PAUSE_ONSET",
    UserMessage: "USER_MESSAGE"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatGroup.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatGroupPagedAudioReconstructions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatGroupPagedAudioReconstructionsPaginationDirection.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReturnChatGroupPagedAudioReconstructionsPaginationDirection = void 0;
/**
 * Indicates the order in which the paginated results are presented, based on their creation date.
 *
 * It shows `ASC` for ascending order (chronological, with the oldest records first) or `DESC` for descending order (reverse-chronological, with the newest records first). This value corresponds to the `ascending_order` query parameter used in the request.
 */ exports.ReturnChatGroupPagedAudioReconstructionsPaginationDirection = {
    Asc: "ASC",
    Desc: "DESC"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatGroupPagedChats.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatGroupPagedChatsPaginationDirection.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReturnChatGroupPagedChatsPaginationDirection = void 0;
/**
 * Indicates the order in which the paginated results are presented, based on their creation date.
 *
 * It shows `ASC` for ascending order (chronological, with the oldest records first) or `DESC` for descending order (reverse-chronological, with the newest records first). This value corresponds to the `ascending_order` query parameter used in the request.
 */ exports.ReturnChatGroupPagedChatsPaginationDirection = {
    Asc: "ASC",
    Desc: "DESC"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatGroupPagedEvents.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatGroupPagedEventsPaginationDirection.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReturnChatGroupPagedEventsPaginationDirection = void 0;
/**
 * Indicates the order in which the paginated results are presented, based on their creation date.
 *
 * It shows `ASC` for ascending order (chronological, with the oldest records first) or `DESC` for descending order (reverse-chronological, with the newest records first). This value corresponds to the `ascending_order` query parameter used in the request.
 */ exports.ReturnChatGroupPagedEventsPaginationDirection = {
    Asc: "ASC",
    Desc: "DESC"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatPagedEvents.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatPagedEventsPaginationDirection.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReturnChatPagedEventsPaginationDirection = void 0;
/**
 * Indicates the order in which the paginated results are presented, based on their creation date.
 *
 * It shows `ASC` for ascending order (chronological, with the oldest records first) or `DESC` for descending order (reverse-chronological, with the newest records first). This value corresponds to the `ascending_order` query parameter used in the request.
 */ exports.ReturnChatPagedEventsPaginationDirection = {
    Asc: "ASC",
    Desc: "DESC"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatPagedEventsStatus.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReturnChatPagedEventsStatus = void 0;
/**
 * Indicates the current state of the chat. There are six possible statuses:
 *
 * - `ACTIVE`: The chat is currently active and ongoing.
 *
 * - `USER_ENDED`: The chat was manually ended by the user.
 *
 * - `USER_TIMEOUT`: The chat ended due to a user-defined timeout.
 *
 * - `MAX_DURATION_TIMEOUT`: The chat ended because it reached the maximum allowed duration.
 *
 * - `INACTIVITY_TIMEOUT`: The chat ended due to an inactivity timeout.
 *
 * - `ERROR`: The chat ended unexpectedly due to an error.
 */ exports.ReturnChatPagedEventsStatus = {
    Active: "ACTIVE",
    UserEnded: "USER_ENDED",
    UserTimeout: "USER_TIMEOUT",
    MaxDurationTimeout: "MAX_DURATION_TIMEOUT",
    InactivityTimeout: "INACTIVITY_TIMEOUT",
    Error: "ERROR"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatStatus.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReturnChatStatus = void 0;
/**
 * Indicates the current state of the chat. There are six possible statuses:
 *
 * - `ACTIVE`: The chat is currently active and ongoing.
 *
 * - `USER_ENDED`: The chat was manually ended by the user.
 *
 * - `USER_TIMEOUT`: The chat ended due to a user-defined timeout.
 *
 * - `MAX_DURATION_TIMEOUT`: The chat ended because it reached the maximum allowed duration.
 *
 * - `INACTIVITY_TIMEOUT`: The chat ended due to an inactivity timeout.
 *
 * - `ERROR`: The chat ended unexpectedly due to an error.
 */ exports.ReturnChatStatus = {
    Active: "ACTIVE",
    UserEnded: "USER_ENDED",
    UserTimeout: "USER_TIMEOUT",
    MaxDurationTimeout: "MAX_DURATION_TIMEOUT",
    InactivityTimeout: "INACTIVITY_TIMEOUT",
    Error: "ERROR"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnConfig.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnConfigSpec.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnEllmModel.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnEventMessageSpec.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnEventMessageSpecs.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnLanguageModel.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnNudgeSpec.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnPagedChatGroups.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnPagedChatGroupsPaginationDirection.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReturnPagedChatGroupsPaginationDirection = void 0;
/**
 * Indicates the order in which the paginated results are presented, based on their creation date.
 *
 * It shows `ASC` for ascending order (chronological, with the oldest records first) or `DESC` for descending order (reverse-chronological, with the newest records first). This value corresponds to the `ascending_order` query parameter used in the request.
 */ exports.ReturnPagedChatGroupsPaginationDirection = {
    Asc: "ASC",
    Desc: "DESC"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnPagedChats.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnPagedChatsPaginationDirection.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReturnPagedChatsPaginationDirection = void 0;
/**
 * Indicates the order in which the paginated results are presented, based on their creation date.
 *
 * It shows `ASC` for ascending order (chronological, with the oldest records first) or `DESC` for descending order (reverse-chronological, with the newest records first). This value corresponds to the `ascending_order` query parameter used in the request.
 */ exports.ReturnPagedChatsPaginationDirection = {
    Asc: "ASC",
    Desc: "DESC"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnPagedConfigs.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnPagedPrompts.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnPagedUserDefinedTools.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnPrompt.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnPromptVersionType.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReturnPromptVersionType = void 0;
/** Versioning method for a Prompt. Either `FIXED` for using a fixed version number or `LATEST` for auto-updating to the latest version. */ exports.ReturnPromptVersionType = {
    Fixed: "FIXED",
    Latest: "LATEST"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnTimeoutSpec.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnTimeoutSpecs.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnUserDefinedTool.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnUserDefinedToolToolType.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReturnUserDefinedToolToolType = void 0;
/** Type of Tool. Either `BUILTIN` for natively implemented tools, like web search, or `FUNCTION` for user-defined tools. */ exports.ReturnUserDefinedToolToolType = {
    Builtin: "BUILTIN",
    Function: "FUNCTION"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnUserDefinedToolVersionType.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReturnUserDefinedToolVersionType = void 0;
/** Versioning method for a Tool. Either `FIXED` for using a fixed version number or `LATEST` for auto-updating to the latest version. */ exports.ReturnUserDefinedToolVersionType = {
    Fixed: "FIXED",
    Latest: "LATEST"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnVoice.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnWebhookEventType.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReturnWebhookEventType = void 0;
/** Events this URL is subscribed to */ exports.ReturnWebhookEventType = {
    ChatStarted: "chat_started",
    ChatEnded: "chat_ended",
    ToolCall: "tool_call"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ReturnWebhookSpec.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/Role.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Role = void 0;
exports.Role = {
    Assistant: "assistant",
    System: "system",
    User: "user",
    All: "all",
    Tool: "tool",
    Context: "context"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/SessionSettings.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/SessionSettingsVariablesValue.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/SubscribeEvent.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/Tool.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ToolCallMessage.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ToolErrorMessage.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ToolResponseMessage.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ToolType.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ToolType = void 0;
exports.ToolType = {
    Builtin: "builtin",
    Function: "function"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/UserInput.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/UserInterruption.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/UserMessage.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ValidationError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/ValidationErrorLocItem.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/VoiceId.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/VoiceName.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/VoiceProvider.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VoiceProvider = void 0;
exports.VoiceProvider = {
    HumeAi: "HUME_AI",
    CustomVoice: "CUSTOM_VOICE"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/VoiceRef.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/WebhookEvent.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/WebhookEventBase.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/WebhookEventChatEnded.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/WebhookEventChatStarted.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/WebhookEventChatStartType.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebhookEventChatStartType = void 0;
exports.WebhookEventChatStartType = {
    NewChatGroup: "new_chat_group",
    ResumedChatGroup: "resumed_chat_group"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/WebhookEventChatStatus.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebhookEventChatStatus = void 0;
exports.WebhookEventChatStatus = {
    Active: "ACTIVE",
    UserEnded: "USER_ENDED",
    UserTimeout: "USER_TIMEOUT",
    InactivityTimeout: "INACTIVITY_TIMEOUT",
    MaxDurationTimeout: "MAX_DURATION_TIMEOUT",
    SilenceTimeout: "SILENCE_TIMEOUT",
    Error: "ERROR"
};
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/WebhookEventToolCall.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/WebSocketError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/empathicVoice/types/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/AssistantEnd.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/AssistantInput.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/AssistantMessage.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/AssistantProsody.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/AudioConfiguration.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/AudioInput.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/AudioOutput.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/BuiltInTool.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/BuiltinToolConfig.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ChatMessage.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ChatMessageToolResult.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ChatMetadata.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ConnectSessionSettings.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ConnectSessionSettingsAudio.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ConnectSessionSettingsContext.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ConnectSessionSettingsVariablesValue.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/Context.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ContextType.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ControlPlanePublishEvent.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/EmotionScores.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/Encoding.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ErrorLevel.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ErrorResponse.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/HttpValidationError.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/Inference.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/JsonMessage.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/LanguageModelType.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/MillisecondInterval.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ModelProviderEnum.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/PauseAssistantMessage.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/PostedBuiltinTool.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/PostedBuiltinToolName.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/PostedConfigPromptSpec.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/PostedEllmModel.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/PostedEventMessageSpec.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/PostedEventMessageSpecs.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/PostedLanguageModel.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/PostedNudgeSpec.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/PostedTimeoutSpec.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/PostedTimeoutSpecs.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/PostedTimeoutSpecsInactivity.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/PostedTimeoutSpecsMaxDuration.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/PostedUserDefinedToolSpec.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/PostedWebhookEventType.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/PostedWebhookSpec.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ProsodyInference.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ResumeAssistantMessage.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnBuiltinTool.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnBuiltinToolToolType.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChat.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatAudioReconstruction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatAudioReconstructionStatus.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatEvent.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatEventRole.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatEventType.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatGroup.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatGroupPagedAudioReconstructions.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatGroupPagedAudioReconstructionsPaginationDirection.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatGroupPagedChats.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatGroupPagedChatsPaginationDirection.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatGroupPagedEvents.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatGroupPagedEventsPaginationDirection.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatPagedEvents.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatPagedEventsPaginationDirection.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatPagedEventsStatus.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnChatStatus.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnConfig.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnConfigSpec.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnEllmModel.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnEventMessageSpec.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnEventMessageSpecs.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnLanguageModel.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnNudgeSpec.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnPagedChatGroups.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnPagedChatGroupsPaginationDirection.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnPagedChats.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnPagedChatsPaginationDirection.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnPagedConfigs.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnPagedPrompts.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnPagedUserDefinedTools.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnPrompt.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnPromptVersionType.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnTimeoutSpec.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnTimeoutSpecs.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnUserDefinedTool.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnUserDefinedToolToolType.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnUserDefinedToolVersionType.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnVoice.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnWebhookEventType.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ReturnWebhookSpec.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/Role.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/SessionSettings.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/SessionSettingsVariablesValue.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/SubscribeEvent.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/Tool.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ToolCallMessage.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ToolErrorMessage.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ToolResponseMessage.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ToolType.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/UserInput.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/UserInterruption.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/UserMessage.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ValidationError.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/ValidationErrorLocItem.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/VoiceId.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/VoiceName.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/VoiceProvider.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/VoiceRef.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/WebhookEvent.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/WebhookEventBase.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/WebhookEventChatEnded.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/WebhookEventChatStarted.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/WebhookEventChatStartType.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/WebhookEventChatStatus.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/WebhookEventToolCall.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/WebSocketError.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/empathicVoice/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/client/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/errors/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/types/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/client/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/client/requests/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/client/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/client/requests/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Alternative.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Bcp47Tag.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Bcp47Tag = void 0;
exports.Bcp47Tag = {
    Zh: "zh",
    Da: "da",
    Nl: "nl",
    En: "en",
    EnAu: "en-AU",
    EnIn: "en-IN",
    EnNz: "en-NZ",
    EnGb: "en-GB",
    Fr: "fr",
    FrCa: "fr-CA",
    De: "de",
    Hi: "hi",
    HiLatn: "hi-Latn",
    Id: "id",
    It: "it",
    Ja: "ja",
    Ko: "ko",
    No: "no",
    Pl: "pl",
    Pt: "pt",
    PtBr: "pt-BR",
    PtPt: "pt-PT",
    Ru: "ru",
    Es: "es",
    Es419: "es-419",
    Sv: "sv",
    Ta: "ta",
    Tr: "tr",
    Uk: "uk"
};
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/BoundingBox.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/BurstPrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Classification.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CompletedEmbeddingGeneration.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CompletedInference.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CompletedState.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CompletedTlInference.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CompletedTraining.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CustomModel.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CustomModelId.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CustomModelPrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CustomModelRequest.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CustomModelsInferenceJob.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CustomModelsTrainingJob.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CustomModelVersionId.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Dataset.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/DatasetId.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/DatasetVersionId.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/DescriptionsScore.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Direction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Direction = void 0;
exports.Direction = {
    Asc: "asc",
    Desc: "desc"
};
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/EmbeddingGenerationBaseRequest.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/EmbeddingGenerationJob.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/EmotionScore.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Error_.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/EvaluationArgs.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Face.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/FacemeshPrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/FacePrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/FacsScore.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Failed.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/FailedState.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/File_.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Granularity.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Granularity = void 0;
/**
 * The granularity at which to generate predictions. The `granularity` field is ignored if transcription is not enabled or if the `window` field has been set.
 *
 * - `word`: At the word level, our model provides a separate output for each word, offering the most granular insight into emotional expression during speech.
 *
 * - `sentence`: At the sentence level of granularity, we annotate the emotional tone of each spoken sentence with our Prosody and Emotional Language models.
 *
 * - `utterance`: Utterance-level granularity is between word- and sentence-level. It takes into account natural pauses or breaks in speech, providing more rapidly updated measures of emotional expression within a flowing conversation. For text inputs, utterance-level granularity will produce results identical to sentence-level granularity.
 *
 * - `conversational_turn`: Conversational turn-level granularity provides a distinct output for each change in speaker. It captures the full sequence of words and sentences spoken uninterrupted by each person. This approach provides a higher-level view of the emotional dynamics in a multi-participant dialogue. For text inputs, specifying conversational turn-level granularity for our Emotional Language model will produce results for the entire passage.
 */ exports.Granularity = {
    Word: "word",
    Sentence: "sentence",
    Utterance: "utterance",
    ConversationalTurn: "conversational_turn"
};
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/GroupedPredictionsBurstPrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/GroupedPredictionsFacemeshPrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/GroupedPredictionsFacePrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/GroupedPredictionsLanguagePrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/GroupedPredictionsNerPrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/GroupedPredictionsProsodyPrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/InferenceBaseRequest.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/InferenceJob.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/InferencePrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/InferenceRequest.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/InferenceResults.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/InferenceSourcePredictResult.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/InProgress.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/InProgressState.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/JobEmbeddingGeneration.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/JobId.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/JobInference.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/JobTlInference.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/JobTraining.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Language.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/LanguagePrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Models.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/ModelsPredictions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Ner.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/NerPrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Null.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/PositionInterval.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/PredictionsOptionalNullBurstPrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/PredictionsOptionalNullFacemeshPrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/PredictionsOptionalNullFacePrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/PredictionsOptionalTranscriptionMetadataLanguagePrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/PredictionsOptionalTranscriptionMetadataNerPrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/PredictionsOptionalTranscriptionMetadataProsodyPrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Prosody.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/ProsodyPrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Queued.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/QueuedState.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/RegistryFileDetail.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Regression.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/SentimentScore.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/SortBy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SortBy = void 0;
exports.SortBy = {
    Created: "created",
    Started: "started",
    Ended: "ended"
};
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Source.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/SourceFile.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/SourceTextSource.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/SourceUrl.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateEmbeddingGeneration.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateEmbeddingGenerationCompletedEmbeddingGeneration.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateEmbeddingGenerationFailed.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateEmbeddingGenerationInProgress.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateEmbeddingGenerationQueued.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateInference.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateTlInference.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateTlInferenceCompletedTlInference.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateTlInferenceFailed.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateTlInferenceInProgress.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateTlInferenceQueued.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateTraining.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateTrainingCompletedTraining.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateTrainingFailed.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateTrainingInProgress.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateTrainingQueued.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Status.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Status = void 0;
exports.Status = {
    Queued: "QUEUED",
    InProgress: "IN_PROGRESS",
    Completed: "COMPLETED",
    Failed: "FAILED"
};
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Tag.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Target.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Task.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TaskClassification.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TaskRegression.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TextSource.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TimeInterval.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TlInferenceBaseRequest.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TlInferencePrediction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TlInferenceResults.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TlInferenceSourcePredictResult.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/ToxicityScore.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TrainingBaseRequest.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TrainingCustomModel.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Transcription.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TranscriptionMetadata.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Type.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Type = void 0;
exports.Type = {
    EmbeddingGeneration: "EMBEDDING_GENERATION",
    Inference: "INFERENCE",
    TlInference: "TL_INFERENCE",
    Training: "TRAINING"
};
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Unconfigurable.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/UnionJob.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/UnionPredictResult.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Url.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/ValidationArgs.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/When.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.When = void 0;
exports.When = {
    CreatedBefore: "created_before",
    CreatedAfter: "created_after"
};
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Window.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Alternative.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Bcp47Tag.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/BoundingBox.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/BurstPrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Classification.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CompletedEmbeddingGeneration.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CompletedInference.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CompletedState.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CompletedTlInference.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CompletedTraining.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CustomModel.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CustomModelId.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CustomModelPrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CustomModelRequest.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CustomModelsInferenceJob.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CustomModelsTrainingJob.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/CustomModelVersionId.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Dataset.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/DatasetId.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/DatasetVersionId.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/DescriptionsScore.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Direction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/EmbeddingGenerationBaseRequest.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/EmbeddingGenerationJob.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/EmotionScore.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Error_.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/EvaluationArgs.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Face.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/FacemeshPrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/FacePrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/FacsScore.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Failed.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/FailedState.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/File_.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Granularity.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/GroupedPredictionsBurstPrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/GroupedPredictionsFacemeshPrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/GroupedPredictionsFacePrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/GroupedPredictionsLanguagePrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/GroupedPredictionsNerPrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/GroupedPredictionsProsodyPrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/InferenceBaseRequest.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/InferenceJob.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/InferencePrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/InferenceRequest.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/InferenceResults.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/InferenceSourcePredictResult.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/InProgress.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/InProgressState.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/JobEmbeddingGeneration.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/JobId.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/JobInference.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/JobTlInference.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/JobTraining.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Language.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/LanguagePrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Models.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/ModelsPredictions.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Ner.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/NerPrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Null.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/PositionInterval.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/PredictionsOptionalNullBurstPrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/PredictionsOptionalNullFacemeshPrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/PredictionsOptionalNullFacePrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/PredictionsOptionalTranscriptionMetadataLanguagePrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/PredictionsOptionalTranscriptionMetadataNerPrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/PredictionsOptionalTranscriptionMetadataProsodyPrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Prosody.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/ProsodyPrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Queued.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/QueuedState.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/RegistryFileDetail.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Regression.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/SentimentScore.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/SortBy.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Source.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/SourceFile.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/SourceTextSource.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/SourceUrl.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateEmbeddingGeneration.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateEmbeddingGenerationCompletedEmbeddingGeneration.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateEmbeddingGenerationFailed.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateEmbeddingGenerationInProgress.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateEmbeddingGenerationQueued.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateInference.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateTlInference.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateTlInferenceCompletedTlInference.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateTlInferenceFailed.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateTlInferenceInProgress.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateTlInferenceQueued.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateTraining.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateTrainingCompletedTraining.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateTrainingFailed.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateTrainingInProgress.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/StateTrainingQueued.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Status.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Tag.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Target.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Task.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TaskClassification.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TaskRegression.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TextSource.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TimeInterval.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TlInferenceBaseRequest.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TlInferencePrediction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TlInferenceResults.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TlInferenceSourcePredictResult.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/ToxicityScore.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TrainingBaseRequest.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TrainingCustomModel.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Transcription.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/TranscriptionMetadata.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Type.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Unconfigurable.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/UnionJob.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/UnionPredictResult.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Url.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/ValidationArgs.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/When.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/Window.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/client/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/types/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/client/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/Config.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/JobDetails.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamErrorMessage.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamFace.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamLanguage.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsBurst.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsBurstPredictionsItem.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsFace.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsFacemesh.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsFacemeshPredictionsItem.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsFacePredictionsItem.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsJobDetails.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsLanguage.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsLanguagePredictionsItem.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsProsody.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsProsodyPredictionsItem.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelsEndpointPayload.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamWarningMessage.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamWarningMessageJobDetails.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/SubscribeEvent.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/Config.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/JobDetails.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamErrorMessage.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamFace.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamLanguage.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictions.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsBurst.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsBurstPredictionsItem.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsFace.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsFacemesh.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsFacemeshPredictionsItem.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsFacePredictionsItem.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsJobDetails.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsLanguage.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsLanguagePredictionsItem.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsProsody.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelPredictionsProsodyPredictionsItem.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamModelsEndpointPayload.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamWarningMessage.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/StreamWarningMessageJobDetails.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/SubscribeEvent.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/client/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stream = void 0;
exports.stream = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/index.js [app-route] (ecmascript)"));
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/stream/types/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/types/EmotionEmbedding.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/types/EmotionEmbeddingItem.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/types/Sentiment.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/types/SentimentItem.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/types/StreamBoundingBox.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/types/TextPosition.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/types/TimeRange.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/types/Toxicity.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/types/ToxicityItem.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/types/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/types/EmotionEmbedding.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/types/EmotionEmbeddingItem.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/types/Sentiment.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/types/SentimentItem.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/types/StreamBoundingBox.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/types/TextPosition.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/types/TimeRange.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/types/Toxicity.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/types/ToxicityItem.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/resources/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/types/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stream = exports.batch = void 0;
exports.batch = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/index.js [app-route] (ecmascript)"));
exports.stream = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/stream/index.js [app-route] (ecmascript)"));
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/client/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/tts/client/requests/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/client/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/client/requests/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/tts/errors/BadRequestError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BadRequestError = void 0;
const errors = __importStar(__turbopack_context__.r("[project]/dist/cjs/errors/index.js [app-route] (ecmascript)"));
class BadRequestError extends errors.HumeError {
    constructor(body, rawResponse){
        super({
            message: "BadRequestError",
            statusCode: 400,
            body: body,
            rawResponse: rawResponse
        });
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
exports.BadRequestError = BadRequestError;
}),
"[project]/dist/cjs/api/resources/tts/errors/UnprocessableEntityError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UnprocessableEntityError = void 0;
const errors = __importStar(__turbopack_context__.r("[project]/dist/cjs/errors/index.js [app-route] (ecmascript)"));
class UnprocessableEntityError extends errors.HumeError {
    constructor(body, rawResponse){
        super({
            message: "UnprocessableEntityError",
            statusCode: 422,
            body: body,
            rawResponse: rawResponse
        });
        Object.setPrototypeOf(this, UnprocessableEntityError.prototype);
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
}),
"[project]/dist/cjs/api/resources/tts/errors/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/errors/BadRequestError.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/errors/UnprocessableEntityError.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/tts/resources/streamInput/client/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/resources/voices/client/requests/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/resources/voices/client/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/resources/voices/client/requests/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/tts/resources/voices/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/resources/voices/client/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/tts/resources/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.voices = exports.streamInputClient = void 0;
exports.streamInputClient = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/resources/streamInput/client/index.js [app-route] (ecmascript)"));
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/resources/voices/client/requests/index.js [app-route] (ecmascript)"), exports);
exports.voices = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/resources/voices/index.js [app-route] (ecmascript)"));
}),
"[project]/dist/cjs/api/resources/tts/types/AudioEncoding.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/AudioFormatType.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AudioFormatType = void 0;
exports.AudioFormatType = {
    Mp3: "mp3",
    Pcm: "pcm",
    Wav: "wav"
};
}),
"[project]/dist/cjs/api/resources/tts/types/ErrorResponse.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/Format.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/FormatMp3.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/FormatPcm.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/FormatWav.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/HttpValidationError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/MillisecondInterval.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/OctaveVersion.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OctaveVersion = void 0;
/**
 * Selects the Octave model version used to synthesize speech for this request. If you omit this field, Hume automatically routes the request to the most appropriate model. Setting a specific version ensures stable and repeatable behavior across requests.
 *
 * Use `2` to opt into the latest Octave capabilities. When you specify version `2`, you must also provide a `voice`. Requests that set `version: 2` without a voice will be rejected.
 *
 * For a comparison of Octave versions, see the [Octave versions](/docs/text-to-speech-tts/overview#octave-versions) section in the TTS overview.
 */ exports.OctaveVersion = {
    One: "1",
    Two: "2"
};
}),
"[project]/dist/cjs/api/resources/tts/types/PostedContext.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/PostedContextWithGenerationId.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/PostedContextWithUtterances.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/PostedTts.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/PostedUtterance.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/PostedUtteranceVoice.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/PostedUtteranceVoiceWithId.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/PostedUtteranceVoiceWithName.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/PublishTts.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/ReturnGeneration.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/ReturnPagedVoices.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/ReturnTts.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/ReturnVoice.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/Snippet.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/SnippetAudioChunk.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/Timestamp.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/TimestampMessage.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/TimestampType.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TimestampType = void 0;
exports.TimestampType = {
    Word: "word",
    Phoneme: "phoneme"
};
}),
"[project]/dist/cjs/api/resources/tts/types/TtsOutput.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/ValidationError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/ValidationErrorLocItem.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dist/cjs/api/resources/tts/types/VoiceProvider.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VoiceProvider = void 0;
exports.VoiceProvider = {
    HumeAi: "HUME_AI",
    CustomVoice: "CUSTOM_VOICE"
};
}),
"[project]/dist/cjs/api/resources/tts/types/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/AudioEncoding.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/AudioFormatType.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/ErrorResponse.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/Format.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/FormatMp3.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/FormatPcm.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/FormatWav.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/HttpValidationError.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/MillisecondInterval.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/OctaveVersion.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/PostedContext.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/PostedContextWithGenerationId.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/PostedContextWithUtterances.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/PostedTts.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/PostedUtterance.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/PostedUtteranceVoice.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/PostedUtteranceVoiceWithId.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/PostedUtteranceVoiceWithName.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/PublishTts.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/ReturnGeneration.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/ReturnPagedVoices.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/ReturnTts.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/ReturnVoice.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/Snippet.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/SnippetAudioChunk.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/Timestamp.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/TimestampMessage.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/TimestampType.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/TtsOutput.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/ValidationError.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/ValidationErrorLocItem.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/VoiceProvider.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/tts/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/client/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/errors/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/resources/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/types/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tts = exports.expressionMeasurement = exports.empathicVoice = void 0;
exports.empathicVoice = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/index.js [app-route] (ecmascript)"));
exports.expressionMeasurement = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/index.js [app-route] (ecmascript)"));
exports.tts = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/tts/index.js [app-route] (ecmascript)"));
}),
"[project]/dist/cjs/api/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dist/cjs/api/resources/index.js [app-route] (ecmascript)"), exports);
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/chatGroups/client/Client.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChatGroups = void 0;
const headers_js_1 = __turbopack_context__.r("[project]/dist/cjs/core/headers.js [app-route] (ecmascript)");
const core = __importStar(__turbopack_context__.r("[project]/dist/cjs/core/index.js [app-route] (ecmascript)"));
const environments = __importStar(__turbopack_context__.r("[project]/dist/cjs/environments.js [app-route] (ecmascript)"));
const errors = __importStar(__turbopack_context__.r("[project]/dist/cjs/errors/index.js [app-route] (ecmascript)"));
const serializers = __importStar(__turbopack_context__.r("[project]/dist/cjs/serialization/index.js [app-route] (ecmascript)"));
const Hume = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/index.js [app-route] (ecmascript)"));
class ChatGroups {
    constructor(_options = {}){
        this._options = _options;
    }
    /**
     * Fetches a paginated list of **Chat Groups**.
     *
     * @param {Hume.empathicVoice.ChatGroupsListChatGroupsRequest} request
     * @param {ChatGroups.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.chatGroups.listChatGroups({
     *         pageNumber: 0,
     *         pageSize: 1,
     *         ascendingOrder: true,
     *         configId: "1b60e1a0-cc59-424a-8d2c-189d354db3f3"
     *     })
     */ listChatGroups() {
        return __awaiter(this, arguments, void 0, function*(request = {}, requestOptions) {
            const list = core.HttpResponsePromise.interceptFunction((request)=>__awaiter(this, void 0, void 0, function*() {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                    const { pageNumber, pageSize, ascendingOrder, configId } = request;
                    const _queryParams = {};
                    if (pageNumber != null) {
                        _queryParams.page_number = pageNumber.toString();
                    }
                    if (pageSize != null) {
                        _queryParams.page_size = pageSize.toString();
                    }
                    if (ascendingOrder != null) {
                        _queryParams.ascending_order = ascendingOrder.toString();
                    }
                    if (configId != null) {
                        _queryParams.config_id = configId;
                    }
                    const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
                    const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                        url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, "v0/evi/chat_groups"),
                        method: "GET",
                        headers: _headers,
                        queryParameters: Object.assign(Object.assign({}, _queryParams), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams),
                        timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                        maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                        fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                        logging: this._options.logging
                    });
                    if (_response.ok) {
                        return {
                            data: serializers.empathicVoice.ReturnPagedChatGroups.parseOrThrow(_response.body, {
                                unrecognizedObjectKeys: "passthrough",
                                allowUnrecognizedUnionMembers: true,
                                allowUnrecognizedEnumValues: true,
                                skipValidation: true,
                                breadcrumbsPrefix: [
                                    "response"
                                ]
                            }),
                            rawResponse: _response.rawResponse
                        };
                    }
                    if (_response.error.reason === "status-code") {
                        switch(_response.error.statusCode){
                            case 400:
                                throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                                    unrecognizedObjectKeys: "passthrough",
                                    allowUnrecognizedUnionMembers: true,
                                    allowUnrecognizedEnumValues: true,
                                    skipValidation: true,
                                    breadcrumbsPrefix: [
                                        "response"
                                    ]
                                }), _response.rawResponse);
                            default:
                                throw new errors.HumeError({
                                    statusCode: _response.error.statusCode,
                                    body: _response.error.body,
                                    rawResponse: _response.rawResponse
                                });
                        }
                    }
                    switch(_response.error.reason){
                        case "non-json":
                            throw new errors.HumeError({
                                statusCode: _response.error.statusCode,
                                body: _response.error.rawBody,
                                rawResponse: _response.rawResponse
                            });
                        case "timeout":
                            throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/chat_groups.");
                        case "unknown":
                            throw new errors.HumeError({
                                message: _response.error.errorMessage,
                                rawResponse: _response.rawResponse
                            });
                    }
                }));
            let _offset = (request === null || request === void 0 ? void 0 : request.pageNumber) != null ? request === null || request === void 0 ? void 0 : request.pageNumber : 0;
            const dataWithRawResponse = yield list(request).withRawResponse();
            return new core.Page({
                response: dataWithRawResponse.data,
                rawResponse: dataWithRawResponse.rawResponse,
                hasNextPage: (response)=>{
                    var _a;
                    return ((_a = response === null || response === void 0 ? void 0 : response.chatGroupsPage) !== null && _a !== void 0 ? _a : []).length > 0;
                },
                getItems: (response)=>{
                    var _a;
                    return (_a = response === null || response === void 0 ? void 0 : response.chatGroupsPage) !== null && _a !== void 0 ? _a : [];
                },
                loadPage: (_response)=>{
                    _offset += 1;
                    return list(core.setObjectProperty(request, "pageNumber", _offset));
                }
            });
        });
    }
    /**
     * Fetches a **ChatGroup** by ID, including a paginated list of **Chats** associated with the **ChatGroup**.
     *
     * @param {string} id - Identifier for a Chat Group. Formatted as a UUID.
     * @param {Hume.empathicVoice.ChatGroupsGetChatGroupRequest} request
     * @param {ChatGroups.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.chatGroups.getChatGroup("697056f0-6c7e-487d-9bd8-9c19df79f05f", {
     *         pageNumber: 0,
     *         pageSize: 1,
     *         ascendingOrder: true
     *     })
     */ getChatGroup(id, request = {}, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__getChatGroup(id, request, requestOptions));
    }
    __getChatGroup(id_1) {
        return __awaiter(this, arguments, void 0, function*(id, request = {}, requestOptions) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const { status, pageSize, pageNumber, ascendingOrder } = request;
            const _queryParams = {};
            if (status != null) {
                _queryParams.status = status;
            }
            if (pageSize != null) {
                _queryParams.page_size = pageSize.toString();
            }
            if (pageNumber != null) {
                _queryParams.page_number = pageNumber.toString();
            }
            if (ascendingOrder != null) {
                _queryParams.ascending_order = ascendingOrder.toString();
            }
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/chat_groups/${core.url.encodePathParam(id)}`),
                method: "GET",
                headers: _headers,
                queryParameters: Object.assign(Object.assign({}, _queryParams), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams),
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.empathicVoice.ReturnChatGroupPagedChats.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/chat_groups/{id}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Fetches a paginated list of audio for each **Chat** within the specified **Chat Group**. For more details, see our guide on audio reconstruction [here](/docs/speech-to-speech-evi/faq#can-i-access-the-audio-of-previous-conversations-with-evi).
     *
     * @param {string} id - Identifier for a Chat Group. Formatted as a UUID.
     * @param {Hume.empathicVoice.ChatGroupsGetAudioRequest} request
     * @param {ChatGroups.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.chatGroups.getAudio("369846cf-6ad5-404d-905e-a8acb5cdfc78", {
     *         pageNumber: 0,
     *         pageSize: 10,
     *         ascendingOrder: true
     *     })
     */ getAudio(id, request = {}, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__getAudio(id, request, requestOptions));
    }
    __getAudio(id_1) {
        return __awaiter(this, arguments, void 0, function*(id, request = {}, requestOptions) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const { pageNumber, pageSize, ascendingOrder } = request;
            const _queryParams = {};
            if (pageNumber != null) {
                _queryParams.page_number = pageNumber.toString();
            }
            if (pageSize != null) {
                _queryParams.page_size = pageSize.toString();
            }
            if (ascendingOrder != null) {
                _queryParams.ascending_order = ascendingOrder.toString();
            }
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/chat_groups/${core.url.encodePathParam(id)}/audio`),
                method: "GET",
                headers: _headers,
                queryParameters: Object.assign(Object.assign({}, _queryParams), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams),
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.empathicVoice.ReturnChatGroupPagedAudioReconstructions.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/chat_groups/{id}/audio.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Fetches a paginated list of **Chat** events associated with a **Chat Group**.
     *
     * @param {string} id - Identifier for a Chat Group. Formatted as a UUID.
     * @param {Hume.empathicVoice.ChatGroupsListChatGroupEventsRequest} request
     * @param {ChatGroups.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.chatGroups.listChatGroupEvents("697056f0-6c7e-487d-9bd8-9c19df79f05f", {
     *         pageNumber: 0,
     *         pageSize: 3,
     *         ascendingOrder: true
     *     })
     */ listChatGroupEvents(id_1) {
        return __awaiter(this, arguments, void 0, function*(id, request = {}, requestOptions) {
            const list = core.HttpResponsePromise.interceptFunction((request)=>__awaiter(this, void 0, void 0, function*() {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                    const { pageSize, pageNumber, ascendingOrder } = request;
                    const _queryParams = {};
                    if (pageSize != null) {
                        _queryParams.page_size = pageSize.toString();
                    }
                    if (pageNumber != null) {
                        _queryParams.page_number = pageNumber.toString();
                    }
                    if (ascendingOrder != null) {
                        _queryParams.ascending_order = ascendingOrder.toString();
                    }
                    const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
                    const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                        url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/chat_groups/${core.url.encodePathParam(id)}/events`),
                        method: "GET",
                        headers: _headers,
                        queryParameters: Object.assign(Object.assign({}, _queryParams), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams),
                        timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                        maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                        fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                        logging: this._options.logging
                    });
                    if (_response.ok) {
                        return {
                            data: serializers.empathicVoice.ReturnChatGroupPagedEvents.parseOrThrow(_response.body, {
                                unrecognizedObjectKeys: "passthrough",
                                allowUnrecognizedUnionMembers: true,
                                allowUnrecognizedEnumValues: true,
                                skipValidation: true,
                                breadcrumbsPrefix: [
                                    "response"
                                ]
                            }),
                            rawResponse: _response.rawResponse
                        };
                    }
                    if (_response.error.reason === "status-code") {
                        switch(_response.error.statusCode){
                            case 400:
                                throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                                    unrecognizedObjectKeys: "passthrough",
                                    allowUnrecognizedUnionMembers: true,
                                    allowUnrecognizedEnumValues: true,
                                    skipValidation: true,
                                    breadcrumbsPrefix: [
                                        "response"
                                    ]
                                }), _response.rawResponse);
                            default:
                                throw new errors.HumeError({
                                    statusCode: _response.error.statusCode,
                                    body: _response.error.body,
                                    rawResponse: _response.rawResponse
                                });
                        }
                    }
                    switch(_response.error.reason){
                        case "non-json":
                            throw new errors.HumeError({
                                statusCode: _response.error.statusCode,
                                body: _response.error.rawBody,
                                rawResponse: _response.rawResponse
                            });
                        case "timeout":
                            throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/chat_groups/{id}/events.");
                        case "unknown":
                            throw new errors.HumeError({
                                message: _response.error.errorMessage,
                                rawResponse: _response.rawResponse
                            });
                    }
                }));
            let _offset = (request === null || request === void 0 ? void 0 : request.pageNumber) != null ? request === null || request === void 0 ? void 0 : request.pageNumber : 0;
            const dataWithRawResponse = yield list(request).withRawResponse();
            return new core.Page({
                response: dataWithRawResponse.data,
                rawResponse: dataWithRawResponse.rawResponse,
                hasNextPage: (response)=>{
                    var _a;
                    return ((_a = response === null || response === void 0 ? void 0 : response.eventsPage) !== null && _a !== void 0 ? _a : []).length > 0;
                },
                getItems: (response)=>{
                    var _a;
                    return (_a = response === null || response === void 0 ? void 0 : response.eventsPage) !== null && _a !== void 0 ? _a : [];
                },
                loadPage: (_response)=>{
                    _offset += 1;
                    return list(core.setObjectProperty(request, "pageNumber", _offset));
                }
            });
        });
    }
    _getCustomAuthorizationHeaders() {
        return __awaiter(this, void 0, void 0, function*() {
            const apiKeyValue = yield core.Supplier.get(this._options.apiKey);
            return {
                "X-Hume-Api-Key": apiKeyValue
            };
        });
    }
}
exports.ChatGroups = ChatGroups;
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/chats/client/Client.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Chats = void 0;
const headers_js_1 = __turbopack_context__.r("[project]/dist/cjs/core/headers.js [app-route] (ecmascript)");
const core = __importStar(__turbopack_context__.r("[project]/dist/cjs/core/index.js [app-route] (ecmascript)"));
const environments = __importStar(__turbopack_context__.r("[project]/dist/cjs/environments.js [app-route] (ecmascript)"));
const errors = __importStar(__turbopack_context__.r("[project]/dist/cjs/errors/index.js [app-route] (ecmascript)"));
const serializers = __importStar(__turbopack_context__.r("[project]/dist/cjs/serialization/index.js [app-route] (ecmascript)"));
const Hume = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/index.js [app-route] (ecmascript)"));
class Chats {
    constructor(_options = {}){
        this._options = _options;
    }
    /**
     * Fetches a paginated list of **Chats**.
     *
     * @param {Hume.empathicVoice.ChatsListChatsRequest} request
     * @param {Chats.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.chats.listChats({
     *         pageNumber: 0,
     *         pageSize: 1,
     *         ascendingOrder: true
     *     })
     */ listChats() {
        return __awaiter(this, arguments, void 0, function*(request = {}, requestOptions) {
            const list = core.HttpResponsePromise.interceptFunction((request)=>__awaiter(this, void 0, void 0, function*() {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                    const { pageNumber, pageSize, ascendingOrder, configId, status } = request;
                    const _queryParams = {};
                    if (pageNumber != null) {
                        _queryParams.page_number = pageNumber.toString();
                    }
                    if (pageSize != null) {
                        _queryParams.page_size = pageSize.toString();
                    }
                    if (ascendingOrder != null) {
                        _queryParams.ascending_order = ascendingOrder.toString();
                    }
                    if (configId != null) {
                        _queryParams.config_id = configId;
                    }
                    if (status != null) {
                        _queryParams.status = status;
                    }
                    const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
                    const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                        url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, "v0/evi/chats"),
                        method: "GET",
                        headers: _headers,
                        queryParameters: Object.assign(Object.assign({}, _queryParams), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams),
                        timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                        maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                        fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                        logging: this._options.logging
                    });
                    if (_response.ok) {
                        return {
                            data: serializers.empathicVoice.ReturnPagedChats.parseOrThrow(_response.body, {
                                unrecognizedObjectKeys: "passthrough",
                                allowUnrecognizedUnionMembers: true,
                                allowUnrecognizedEnumValues: true,
                                skipValidation: true,
                                breadcrumbsPrefix: [
                                    "response"
                                ]
                            }),
                            rawResponse: _response.rawResponse
                        };
                    }
                    if (_response.error.reason === "status-code") {
                        switch(_response.error.statusCode){
                            case 400:
                                throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                                    unrecognizedObjectKeys: "passthrough",
                                    allowUnrecognizedUnionMembers: true,
                                    allowUnrecognizedEnumValues: true,
                                    skipValidation: true,
                                    breadcrumbsPrefix: [
                                        "response"
                                    ]
                                }), _response.rawResponse);
                            default:
                                throw new errors.HumeError({
                                    statusCode: _response.error.statusCode,
                                    body: _response.error.body,
                                    rawResponse: _response.rawResponse
                                });
                        }
                    }
                    switch(_response.error.reason){
                        case "non-json":
                            throw new errors.HumeError({
                                statusCode: _response.error.statusCode,
                                body: _response.error.rawBody,
                                rawResponse: _response.rawResponse
                            });
                        case "timeout":
                            throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/chats.");
                        case "unknown":
                            throw new errors.HumeError({
                                message: _response.error.errorMessage,
                                rawResponse: _response.rawResponse
                            });
                    }
                }));
            let _offset = (request === null || request === void 0 ? void 0 : request.pageNumber) != null ? request === null || request === void 0 ? void 0 : request.pageNumber : 0;
            const dataWithRawResponse = yield list(request).withRawResponse();
            return new core.Page({
                response: dataWithRawResponse.data,
                rawResponse: dataWithRawResponse.rawResponse,
                hasNextPage: (response)=>{
                    var _a;
                    return ((_a = response === null || response === void 0 ? void 0 : response.chatsPage) !== null && _a !== void 0 ? _a : []).length > 0;
                },
                getItems: (response)=>{
                    var _a;
                    return (_a = response === null || response === void 0 ? void 0 : response.chatsPage) !== null && _a !== void 0 ? _a : [];
                },
                loadPage: (_response)=>{
                    _offset += 1;
                    return list(core.setObjectProperty(request, "pageNumber", _offset));
                }
            });
        });
    }
    /**
     * Fetches a paginated list of **Chat** events.
     *
     * @param {string} id - Identifier for a Chat. Formatted as a UUID.
     * @param {Hume.empathicVoice.ChatsListChatEventsRequest} request
     * @param {Chats.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.chats.listChatEvents("470a49f6-1dec-4afe-8b61-035d3b2d63b0", {
     *         pageNumber: 0,
     *         pageSize: 3,
     *         ascendingOrder: true
     *     })
     */ listChatEvents(id_1) {
        return __awaiter(this, arguments, void 0, function*(id, request = {}, requestOptions) {
            const list = core.HttpResponsePromise.interceptFunction((request)=>__awaiter(this, void 0, void 0, function*() {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                    const { pageSize, pageNumber, ascendingOrder } = request;
                    const _queryParams = {};
                    if (pageSize != null) {
                        _queryParams.page_size = pageSize.toString();
                    }
                    if (pageNumber != null) {
                        _queryParams.page_number = pageNumber.toString();
                    }
                    if (ascendingOrder != null) {
                        _queryParams.ascending_order = ascendingOrder.toString();
                    }
                    const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
                    const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                        url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/chats/${core.url.encodePathParam(id)}`),
                        method: "GET",
                        headers: _headers,
                        queryParameters: Object.assign(Object.assign({}, _queryParams), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams),
                        timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                        maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                        fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                        logging: this._options.logging
                    });
                    if (_response.ok) {
                        return {
                            data: serializers.empathicVoice.ReturnChatPagedEvents.parseOrThrow(_response.body, {
                                unrecognizedObjectKeys: "passthrough",
                                allowUnrecognizedUnionMembers: true,
                                allowUnrecognizedEnumValues: true,
                                skipValidation: true,
                                breadcrumbsPrefix: [
                                    "response"
                                ]
                            }),
                            rawResponse: _response.rawResponse
                        };
                    }
                    if (_response.error.reason === "status-code") {
                        switch(_response.error.statusCode){
                            case 400:
                                throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                                    unrecognizedObjectKeys: "passthrough",
                                    allowUnrecognizedUnionMembers: true,
                                    allowUnrecognizedEnumValues: true,
                                    skipValidation: true,
                                    breadcrumbsPrefix: [
                                        "response"
                                    ]
                                }), _response.rawResponse);
                            default:
                                throw new errors.HumeError({
                                    statusCode: _response.error.statusCode,
                                    body: _response.error.body,
                                    rawResponse: _response.rawResponse
                                });
                        }
                    }
                    switch(_response.error.reason){
                        case "non-json":
                            throw new errors.HumeError({
                                statusCode: _response.error.statusCode,
                                body: _response.error.rawBody,
                                rawResponse: _response.rawResponse
                            });
                        case "timeout":
                            throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/chats/{id}.");
                        case "unknown":
                            throw new errors.HumeError({
                                message: _response.error.errorMessage,
                                rawResponse: _response.rawResponse
                            });
                    }
                }));
            let _offset = (request === null || request === void 0 ? void 0 : request.pageNumber) != null ? request === null || request === void 0 ? void 0 : request.pageNumber : 0;
            const dataWithRawResponse = yield list(request).withRawResponse();
            return new core.Page({
                response: dataWithRawResponse.data,
                rawResponse: dataWithRawResponse.rawResponse,
                hasNextPage: (response)=>{
                    var _a;
                    return ((_a = response === null || response === void 0 ? void 0 : response.eventsPage) !== null && _a !== void 0 ? _a : []).length > 0;
                },
                getItems: (response)=>{
                    var _a;
                    return (_a = response === null || response === void 0 ? void 0 : response.eventsPage) !== null && _a !== void 0 ? _a : [];
                },
                loadPage: (_response)=>{
                    _offset += 1;
                    return list(core.setObjectProperty(request, "pageNumber", _offset));
                }
            });
        });
    }
    /**
     * Fetches the audio of a previous **Chat**. For more details, see our guide on audio reconstruction [here](/docs/speech-to-speech-evi/faq#can-i-access-the-audio-of-previous-conversations-with-evi).
     *
     * @param {string} id - Identifier for a chat. Formatted as a UUID.
     * @param {Chats.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.chats.getAudio("470a49f6-1dec-4afe-8b61-035d3b2d63b0")
     */ getAudio(id, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__getAudio(id, requestOptions));
    }
    __getAudio(id, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/chats/${core.url.encodePathParam(id)}/audio`),
                method: "GET",
                headers: _headers,
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.empathicVoice.ReturnChatAudioReconstruction.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/chats/{id}/audio.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    _getCustomAuthorizationHeaders() {
        return __awaiter(this, void 0, void 0, function*() {
            const apiKeyValue = yield core.Supplier.get(this._options.apiKey);
            return {
                "X-Hume-Api-Key": apiKeyValue
            };
        });
    }
}
exports.Chats = Chats;
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/configs/client/Client.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Configs = void 0;
const headers_js_1 = __turbopack_context__.r("[project]/dist/cjs/core/headers.js [app-route] (ecmascript)");
const core = __importStar(__turbopack_context__.r("[project]/dist/cjs/core/index.js [app-route] (ecmascript)"));
const environments = __importStar(__turbopack_context__.r("[project]/dist/cjs/environments.js [app-route] (ecmascript)"));
const errors = __importStar(__turbopack_context__.r("[project]/dist/cjs/errors/index.js [app-route] (ecmascript)"));
const serializers = __importStar(__turbopack_context__.r("[project]/dist/cjs/serialization/index.js [app-route] (ecmascript)"));
const Hume = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/index.js [app-route] (ecmascript)"));
class Configs {
    constructor(_options = {}){
        this._options = _options;
    }
    /**
     * Fetches a paginated list of **Configs**.
     *
     * For more details on configuration options and how to configure EVI, see our [configuration guide](/docs/speech-to-speech-evi/configuration).
     *
     * @param {Hume.empathicVoice.ConfigsListConfigsRequest} request
     * @param {Configs.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.configs.listConfigs({
     *         pageNumber: 0,
     *         pageSize: 1
     *     })
     */ listConfigs() {
        return __awaiter(this, arguments, void 0, function*(request = {}, requestOptions) {
            const list = core.HttpResponsePromise.interceptFunction((request)=>__awaiter(this, void 0, void 0, function*() {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                    const { pageNumber, pageSize, restrictToMostRecent, name } = request;
                    const _queryParams = {};
                    if (pageNumber != null) {
                        _queryParams.page_number = pageNumber.toString();
                    }
                    if (pageSize != null) {
                        _queryParams.page_size = pageSize.toString();
                    }
                    if (restrictToMostRecent != null) {
                        _queryParams.restrict_to_most_recent = restrictToMostRecent.toString();
                    }
                    if (name != null) {
                        _queryParams.name = name;
                    }
                    const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
                    const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                        url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, "v0/evi/configs"),
                        method: "GET",
                        headers: _headers,
                        queryParameters: Object.assign(Object.assign({}, _queryParams), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams),
                        timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                        maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                        fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                        logging: this._options.logging
                    });
                    if (_response.ok) {
                        return {
                            data: serializers.empathicVoice.ReturnPagedConfigs.parseOrThrow(_response.body, {
                                unrecognizedObjectKeys: "passthrough",
                                allowUnrecognizedUnionMembers: true,
                                allowUnrecognizedEnumValues: true,
                                skipValidation: true,
                                breadcrumbsPrefix: [
                                    "response"
                                ]
                            }),
                            rawResponse: _response.rawResponse
                        };
                    }
                    if (_response.error.reason === "status-code") {
                        switch(_response.error.statusCode){
                            case 400:
                                throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                                    unrecognizedObjectKeys: "passthrough",
                                    allowUnrecognizedUnionMembers: true,
                                    allowUnrecognizedEnumValues: true,
                                    skipValidation: true,
                                    breadcrumbsPrefix: [
                                        "response"
                                    ]
                                }), _response.rawResponse);
                            default:
                                throw new errors.HumeError({
                                    statusCode: _response.error.statusCode,
                                    body: _response.error.body,
                                    rawResponse: _response.rawResponse
                                });
                        }
                    }
                    switch(_response.error.reason){
                        case "non-json":
                            throw new errors.HumeError({
                                statusCode: _response.error.statusCode,
                                body: _response.error.rawBody,
                                rawResponse: _response.rawResponse
                            });
                        case "timeout":
                            throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/configs.");
                        case "unknown":
                            throw new errors.HumeError({
                                message: _response.error.errorMessage,
                                rawResponse: _response.rawResponse
                            });
                    }
                }));
            let _offset = (request === null || request === void 0 ? void 0 : request.pageNumber) != null ? request === null || request === void 0 ? void 0 : request.pageNumber : 0;
            const dataWithRawResponse = yield list(request).withRawResponse();
            return new core.Page({
                response: dataWithRawResponse.data,
                rawResponse: dataWithRawResponse.rawResponse,
                hasNextPage: (response)=>{
                    var _a;
                    return ((_a = response === null || response === void 0 ? void 0 : response.configsPage) !== null && _a !== void 0 ? _a : []).length > 0;
                },
                getItems: (response)=>{
                    var _a;
                    return (_a = response === null || response === void 0 ? void 0 : response.configsPage) !== null && _a !== void 0 ? _a : [];
                },
                loadPage: (_response)=>{
                    _offset += 1;
                    return list(core.setObjectProperty(request, "pageNumber", _offset));
                }
            });
        });
    }
    /**
     * Creates a **Config** which can be applied to EVI.
     *
     * For more details on configuration options and how to configure EVI, see our [configuration guide](/docs/speech-to-speech-evi/configuration).
     *
     * @param {Hume.empathicVoice.PostedConfig} request
     * @param {Configs.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.configs.createConfig({
     *         name: "Weather Assistant Config",
     *         prompt: {
     *             id: "af699d45-2985-42cc-91b9-af9e5da3bac5",
     *             version: 0
     *         },
     *         eviVersion: "3",
     *         voice: {
     *             provider: "HUME_AI",
     *             name: "Ava Song"
     *         },
     *         languageModel: {
     *             modelProvider: "ANTHROPIC",
     *             modelResource: "claude-3-7-sonnet-latest",
     *             temperature: 1
     *         },
     *         eventMessages: {
     *             onNewChat: {
     *                 enabled: false,
     *                 text: ""
     *             },
     *             onInactivityTimeout: {
     *                 enabled: false,
     *                 text: ""
     *             },
     *             onMaxDurationTimeout: {
     *                 enabled: false,
     *                 text: ""
     *             }
     *         }
     *     })
     */ createConfig(request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__createConfig(request, requestOptions));
    }
    __createConfig(request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, "v0/evi/configs"),
                method: "POST",
                headers: _headers,
                contentType: "application/json",
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "json",
                body: serializers.empathicVoice.PostedConfig.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                }),
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.empathicVoice.ReturnConfig.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling POST /v0/evi/configs.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Fetches a list of a **Config's** versions.
     *
     * For more details on configuration options and how to configure EVI, see our [configuration guide](/docs/speech-to-speech-evi/configuration).
     *
     * @param {string} id - Identifier for a Config. Formatted as a UUID.
     * @param {Hume.empathicVoice.ConfigsListConfigVersionsRequest} request
     * @param {Configs.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.configs.listConfigVersions("1b60e1a0-cc59-424a-8d2c-189d354db3f3")
     */ listConfigVersions(id_1) {
        return __awaiter(this, arguments, void 0, function*(id, request = {}, requestOptions) {
            const list = core.HttpResponsePromise.interceptFunction((request)=>__awaiter(this, void 0, void 0, function*() {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                    const { pageNumber, pageSize, restrictToMostRecent } = request;
                    const _queryParams = {};
                    if (pageNumber != null) {
                        _queryParams.page_number = pageNumber.toString();
                    }
                    if (pageSize != null) {
                        _queryParams.page_size = pageSize.toString();
                    }
                    if (restrictToMostRecent != null) {
                        _queryParams.restrict_to_most_recent = restrictToMostRecent.toString();
                    }
                    const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
                    const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                        url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/configs/${core.url.encodePathParam(id)}`),
                        method: "GET",
                        headers: _headers,
                        queryParameters: Object.assign(Object.assign({}, _queryParams), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams),
                        timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                        maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                        fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                        logging: this._options.logging
                    });
                    if (_response.ok) {
                        return {
                            data: serializers.empathicVoice.ReturnPagedConfigs.parseOrThrow(_response.body, {
                                unrecognizedObjectKeys: "passthrough",
                                allowUnrecognizedUnionMembers: true,
                                allowUnrecognizedEnumValues: true,
                                skipValidation: true,
                                breadcrumbsPrefix: [
                                    "response"
                                ]
                            }),
                            rawResponse: _response.rawResponse
                        };
                    }
                    if (_response.error.reason === "status-code") {
                        switch(_response.error.statusCode){
                            case 400:
                                throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                                    unrecognizedObjectKeys: "passthrough",
                                    allowUnrecognizedUnionMembers: true,
                                    allowUnrecognizedEnumValues: true,
                                    skipValidation: true,
                                    breadcrumbsPrefix: [
                                        "response"
                                    ]
                                }), _response.rawResponse);
                            default:
                                throw new errors.HumeError({
                                    statusCode: _response.error.statusCode,
                                    body: _response.error.body,
                                    rawResponse: _response.rawResponse
                                });
                        }
                    }
                    switch(_response.error.reason){
                        case "non-json":
                            throw new errors.HumeError({
                                statusCode: _response.error.statusCode,
                                body: _response.error.rawBody,
                                rawResponse: _response.rawResponse
                            });
                        case "timeout":
                            throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/configs/{id}.");
                        case "unknown":
                            throw new errors.HumeError({
                                message: _response.error.errorMessage,
                                rawResponse: _response.rawResponse
                            });
                    }
                }));
            let _offset = (request === null || request === void 0 ? void 0 : request.pageNumber) != null ? request === null || request === void 0 ? void 0 : request.pageNumber : 0;
            const dataWithRawResponse = yield list(request).withRawResponse();
            return new core.Page({
                response: dataWithRawResponse.data,
                rawResponse: dataWithRawResponse.rawResponse,
                hasNextPage: (response)=>{
                    var _a;
                    return ((_a = response === null || response === void 0 ? void 0 : response.configsPage) !== null && _a !== void 0 ? _a : []).length > 0;
                },
                getItems: (response)=>{
                    var _a;
                    return (_a = response === null || response === void 0 ? void 0 : response.configsPage) !== null && _a !== void 0 ? _a : [];
                },
                loadPage: (_response)=>{
                    _offset += 1;
                    return list(core.setObjectProperty(request, "pageNumber", _offset));
                }
            });
        });
    }
    /**
     * Updates a **Config** by creating a new version of the **Config**.
     *
     * For more details on configuration options and how to configure EVI, see our [configuration guide](/docs/speech-to-speech-evi/configuration).
     *
     * @param {string} id - Identifier for a Config. Formatted as a UUID.
     * @param {Hume.empathicVoice.PostedConfigVersion} request
     * @param {Configs.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.configs.createConfigVersion("1b60e1a0-cc59-424a-8d2c-189d354db3f3", {
     *         versionDescription: "This is an updated version of the Weather Assistant Config.",
     *         eviVersion: "3",
     *         prompt: {
     *             id: "af699d45-2985-42cc-91b9-af9e5da3bac5",
     *             version: 0
     *         },
     *         voice: {
     *             provider: "HUME_AI",
     *             name: "Ava Song"
     *         },
     *         languageModel: {
     *             modelProvider: "ANTHROPIC",
     *             modelResource: "claude-3-7-sonnet-latest",
     *             temperature: 1
     *         },
     *         ellmModel: {
     *             allowShortResponses: true
     *         },
     *         eventMessages: {
     *             onNewChat: {
     *                 enabled: false,
     *                 text: ""
     *             },
     *             onInactivityTimeout: {
     *                 enabled: false,
     *                 text: ""
     *             },
     *             onMaxDurationTimeout: {
     *                 enabled: false,
     *                 text: ""
     *             }
     *         }
     *     })
     */ createConfigVersion(id, request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__createConfigVersion(id, request, requestOptions));
    }
    __createConfigVersion(id, request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/configs/${core.url.encodePathParam(id)}`),
                method: "POST",
                headers: _headers,
                contentType: "application/json",
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "json",
                body: serializers.empathicVoice.PostedConfigVersion.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                }),
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.empathicVoice.ReturnConfig.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling POST /v0/evi/configs/{id}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Deletes a **Config** and its versions.
     *
     * For more details on configuration options and how to configure EVI, see our [configuration guide](/docs/speech-to-speech-evi/configuration).
     *
     * @param {string} id - Identifier for a Config. Formatted as a UUID.
     * @param {Configs.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.configs.deleteConfig("1b60e1a0-cc59-424a-8d2c-189d354db3f3")
     */ deleteConfig(id, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__deleteConfig(id, requestOptions));
    }
    __deleteConfig(id, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/configs/${core.url.encodePathParam(id)}`),
                method: "DELETE",
                headers: _headers,
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: undefined,
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling DELETE /v0/evi/configs/{id}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Updates the name of a **Config**.
     *
     * For more details on configuration options and how to configure EVI, see our [configuration guide](/docs/speech-to-speech-evi/configuration).
     *
     * @param {string} id - Identifier for a Config. Formatted as a UUID.
     * @param {Hume.empathicVoice.PostedConfigName} request
     * @param {Configs.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.configs.updateConfigName("1b60e1a0-cc59-424a-8d2c-189d354db3f3", {
     *         name: "Updated Weather Assistant Config Name"
     *     })
     */ updateConfigName(id, request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__updateConfigName(id, request, requestOptions));
    }
    __updateConfigName(id, request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/configs/${core.url.encodePathParam(id)}`),
                method: "PATCH",
                headers: _headers,
                contentType: "application/json",
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "json",
                body: serializers.empathicVoice.PostedConfigName.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                }),
                responseType: "text",
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: _response.body,
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling PATCH /v0/evi/configs/{id}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Fetches a specified version of a **Config**.
     *
     * For more details on configuration options and how to configure EVI, see our [configuration guide](/docs/speech-to-speech-evi/configuration).
     *
     * @param {string} id - Identifier for a Config. Formatted as a UUID.
     * @param {number} version - Version number for a Config.
     *
     *                           Configs, Prompts, Custom Voices, and Tools are versioned. This versioning system supports iterative development, allowing you to progressively refine configurations and revert to previous versions if needed.
     *
     *                           Version numbers are integer values representing different iterations of the Config. Each update to the Config increments its version number.
     * @param {Configs.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.configs.getConfigVersion("1b60e1a0-cc59-424a-8d2c-189d354db3f3", 1)
     */ getConfigVersion(id, version, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__getConfigVersion(id, version, requestOptions));
    }
    __getConfigVersion(id, version, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/configs/${core.url.encodePathParam(id)}/version/${core.url.encodePathParam(version)}`),
                method: "GET",
                headers: _headers,
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.empathicVoice.ReturnConfig.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/configs/{id}/version/{version}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Deletes a specified version of a **Config**.
     *
     * For more details on configuration options and how to configure EVI, see our [configuration guide](/docs/speech-to-speech-evi/configuration).
     *
     * @param {string} id - Identifier for a Config. Formatted as a UUID.
     * @param {number} version - Version number for a Config.
     *
     *                           Configs, Prompts, Custom Voices, and Tools are versioned. This versioning system supports iterative development, allowing you to progressively refine configurations and revert to previous versions if needed.
     *
     *                           Version numbers are integer values representing different iterations of the Config. Each update to the Config increments its version number.
     * @param {Configs.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.configs.deleteConfigVersion("1b60e1a0-cc59-424a-8d2c-189d354db3f3", 1)
     */ deleteConfigVersion(id, version, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__deleteConfigVersion(id, version, requestOptions));
    }
    __deleteConfigVersion(id, version, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/configs/${core.url.encodePathParam(id)}/version/${core.url.encodePathParam(version)}`),
                method: "DELETE",
                headers: _headers,
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: undefined,
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling DELETE /v0/evi/configs/{id}/version/{version}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Updates the description of a **Config**.
     *
     * For more details on configuration options and how to configure EVI, see our [configuration guide](/docs/speech-to-speech-evi/configuration).
     *
     * @param {string} id - Identifier for a Config. Formatted as a UUID.
     * @param {number} version - Version number for a Config.
     *
     *                           Configs, Prompts, Custom Voices, and Tools are versioned. This versioning system supports iterative development, allowing you to progressively refine configurations and revert to previous versions if needed.
     *
     *                           Version numbers are integer values representing different iterations of the Config. Each update to the Config increments its version number.
     * @param {Hume.empathicVoice.PostedConfigVersionDescription} request
     * @param {Configs.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.configs.updateConfigDescription("1b60e1a0-cc59-424a-8d2c-189d354db3f3", 1, {
     *         versionDescription: "This is an updated version_description."
     *     })
     */ updateConfigDescription(id, version, request = {}, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__updateConfigDescription(id, version, request, requestOptions));
    }
    __updateConfigDescription(id_1, version_1) {
        return __awaiter(this, arguments, void 0, function*(id, version, request = {}, requestOptions) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/configs/${core.url.encodePathParam(id)}/version/${core.url.encodePathParam(version)}`),
                method: "PATCH",
                headers: _headers,
                contentType: "application/json",
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "json",
                body: serializers.empathicVoice.PostedConfigVersionDescription.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                }),
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.empathicVoice.ReturnConfig.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling PATCH /v0/evi/configs/{id}/version/{version}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    _getCustomAuthorizationHeaders() {
        return __awaiter(this, void 0, void 0, function*() {
            const apiKeyValue = yield core.Supplier.get(this._options.apiKey);
            return {
                "X-Hume-Api-Key": apiKeyValue
            };
        });
    }
}
exports.Configs = Configs;
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/controlPlane/client/Socket.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ControlPlaneSocket = void 0;
const core = __importStar(__turbopack_context__.r("[project]/dist/cjs/core/index.js [app-route] (ecmascript)"));
const json_js_1 = __turbopack_context__.r("[project]/dist/cjs/core/json.js [app-route] (ecmascript)");
const serializers = __importStar(__turbopack_context__.r("[project]/dist/cjs/serialization/index.js [app-route] (ecmascript)"));
const ControlPlanePublishEvent_js_1 = __turbopack_context__.r("[project]/dist/cjs/serialization/resources/empathicVoice/types/ControlPlanePublishEvent.js [app-route] (ecmascript)");
class ControlPlaneSocket {
    constructor(args){
        this.eventHandlers = {};
        this.handleOpen = ()=>{
            var _a, _b;
            (_b = (_a = this.eventHandlers).open) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        this.handleMessage = (event)=>{
            var _a, _b, _c, _d;
            const data = (0, json_js_1.fromJson)(event.data);
            const parsedResponse = serializers.empathicVoice.ControlPlaneSocketResponse.parse(data, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                omitUndefined: true
            });
            if (parsedResponse.ok) {
                (_b = (_a = this.eventHandlers).message) === null || _b === void 0 ? void 0 : _b.call(_a, parsedResponse.value);
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
        const jsonPayload = ControlPlanePublishEvent_js_1.ControlPlanePublishEvent.jsonOrThrow(message, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            omitUndefined: true
        });
        this.socket.send(JSON.stringify(jsonPayload));
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
            if (this.socket.readyState === core.ReconnectingWebSocket.OPEN) {
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
    /** Asserts that the websocket is open. */ assertSocketIsOpen() {
        if (!this.socket) {
            throw new Error("Socket is not connected.");
        }
        if (this.socket.readyState !== core.ReconnectingWebSocket.OPEN) {
            throw new Error("Socket is not open.");
        }
    }
    /** Send a binary payload to the websocket. */ sendBinary(payload) {
        this.socket.send(payload);
    }
}
exports.ControlPlaneSocket = ControlPlaneSocket;
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/controlPlane/client/Client.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ControlPlane = void 0;
const headers_js_1 = __turbopack_context__.r("[project]/dist/cjs/core/headers.js [app-route] (ecmascript)");
const core = __importStar(__turbopack_context__.r("[project]/dist/cjs/core/index.js [app-route] (ecmascript)"));
const environments = __importStar(__turbopack_context__.r("[project]/dist/cjs/environments.js [app-route] (ecmascript)"));
const errors = __importStar(__turbopack_context__.r("[project]/dist/cjs/errors/index.js [app-route] (ecmascript)"));
const serializers = __importStar(__turbopack_context__.r("[project]/dist/cjs/serialization/index.js [app-route] (ecmascript)"));
const Hume = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/index.js [app-route] (ecmascript)"));
const Socket_js_1 = __turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/controlPlane/client/Socket.js [app-route] (ecmascript)");
class ControlPlane {
    constructor(_options = {}){
        this._options = _options;
    }
    /**
     * Send a message to a specific chat.
     *
     * @param {string} chatId
     * @param {Hume.empathicVoice.ControlPlanePublishEvent} request
     * @param {ControlPlane.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.UnprocessableEntityError}
     *
     * @example
     *     await client.empathicVoice.controlPlane.send("chat_id", {
     *         type: "session_settings"
     *     })
     */ send(chatId, request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__send(chatId, request, requestOptions));
    }
    __send(chatId, request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/chat/${core.url.encodePathParam(chatId)}/send`),
                method: "POST",
                headers: _headers,
                contentType: "application/json",
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "json",
                body: serializers.empathicVoice.ControlPlanePublishEvent.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                }),
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: undefined,
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 422:
                        throw new Hume.empathicVoice.UnprocessableEntityError(serializers.empathicVoice.HttpValidationError.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling POST /v0/evi/chat/{chat_id}/send.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    connect(args) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b;
            const { chat_id, accessToken, headers, debug, reconnectAttempts } = args;
            const _queryParams = {};
            if (accessToken != null) {
                _queryParams.access_token = accessToken;
            }
            const _headers = (0, headers_js_1.mergeHeaders)((0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), headers);
            const socket = new core.ReconnectingWebSocket({
                url: core.url.join((_a = yield core.Supplier.get(this._options.baseUrl)) !== null && _a !== void 0 ? _a : ((_b = yield core.Supplier.get(this._options.environment)) !== null && _b !== void 0 ? _b : environments.HumeEnvironment.Prod).evi, `/chat/${core.url.encodePathParam(chat_id)}/connect`),
                protocols: [],
                queryParameters: _queryParams,
                headers: _headers,
                options: {
                    debug: debug !== null && debug !== void 0 ? debug : false,
                    maxRetries: reconnectAttempts !== null && reconnectAttempts !== void 0 ? reconnectAttempts : 30
                }
            });
            return new Socket_js_1.ControlPlaneSocket({
                socket
            });
        });
    }
    _getCustomAuthorizationHeaders() {
        return __awaiter(this, void 0, void 0, function*() {
            var _a;
            const apiKeyValue = core.Supplier.get(this._options.apiKey);
            // This `authHeaderValue` is manually added as if you don't provide it it will
            // be omitted from the headers which means it won't reach the logic in ws.ts that
            // extracts values from the headers and adds them to query parameters.
            const authHeaderValue = core.Supplier.get((_a = this._options.headers) === null || _a === void 0 ? void 0 : _a.authorization);
            return {
                "X-Hume-Api-Key": apiKeyValue,
                Authorization: authHeaderValue
            };
        });
    }
}
exports.ControlPlane = ControlPlane;
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/prompts/client/Client.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Prompts = void 0;
const headers_js_1 = __turbopack_context__.r("[project]/dist/cjs/core/headers.js [app-route] (ecmascript)");
const core = __importStar(__turbopack_context__.r("[project]/dist/cjs/core/index.js [app-route] (ecmascript)"));
const environments = __importStar(__turbopack_context__.r("[project]/dist/cjs/environments.js [app-route] (ecmascript)"));
const errors = __importStar(__turbopack_context__.r("[project]/dist/cjs/errors/index.js [app-route] (ecmascript)"));
const serializers = __importStar(__turbopack_context__.r("[project]/dist/cjs/serialization/index.js [app-route] (ecmascript)"));
const Hume = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/index.js [app-route] (ecmascript)"));
class Prompts {
    constructor(_options = {}){
        this._options = _options;
    }
    /**
     * Fetches a paginated list of **Prompts**.
     *
     * See our [prompting guide](/docs/speech-to-speech-evi/guides/phone-calling) for tips on crafting your system prompt.
     *
     * @param {Hume.empathicVoice.PromptsListPromptsRequest} request
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.prompts.listPrompts({
     *         pageNumber: 0,
     *         pageSize: 2
     *     })
     */ listPrompts() {
        return __awaiter(this, arguments, void 0, function*(request = {}, requestOptions) {
            const list = core.HttpResponsePromise.interceptFunction((request)=>__awaiter(this, void 0, void 0, function*() {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                    const { pageNumber, pageSize, restrictToMostRecent, name } = request;
                    const _queryParams = {};
                    if (pageNumber != null) {
                        _queryParams.page_number = pageNumber.toString();
                    }
                    if (pageSize != null) {
                        _queryParams.page_size = pageSize.toString();
                    }
                    if (restrictToMostRecent != null) {
                        _queryParams.restrict_to_most_recent = restrictToMostRecent.toString();
                    }
                    if (name != null) {
                        _queryParams.name = name;
                    }
                    const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
                    const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                        url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, "v0/evi/prompts"),
                        method: "GET",
                        headers: _headers,
                        queryParameters: Object.assign(Object.assign({}, _queryParams), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams),
                        timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                        maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                        fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                        logging: this._options.logging
                    });
                    if (_response.ok) {
                        return {
                            data: serializers.empathicVoice.ReturnPagedPrompts.parseOrThrow(_response.body, {
                                unrecognizedObjectKeys: "passthrough",
                                allowUnrecognizedUnionMembers: true,
                                allowUnrecognizedEnumValues: true,
                                skipValidation: true,
                                breadcrumbsPrefix: [
                                    "response"
                                ]
                            }),
                            rawResponse: _response.rawResponse
                        };
                    }
                    if (_response.error.reason === "status-code") {
                        switch(_response.error.statusCode){
                            case 400:
                                throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                                    unrecognizedObjectKeys: "passthrough",
                                    allowUnrecognizedUnionMembers: true,
                                    allowUnrecognizedEnumValues: true,
                                    skipValidation: true,
                                    breadcrumbsPrefix: [
                                        "response"
                                    ]
                                }), _response.rawResponse);
                            default:
                                throw new errors.HumeError({
                                    statusCode: _response.error.statusCode,
                                    body: _response.error.body,
                                    rawResponse: _response.rawResponse
                                });
                        }
                    }
                    switch(_response.error.reason){
                        case "non-json":
                            throw new errors.HumeError({
                                statusCode: _response.error.statusCode,
                                body: _response.error.rawBody,
                                rawResponse: _response.rawResponse
                            });
                        case "timeout":
                            throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/prompts.");
                        case "unknown":
                            throw new errors.HumeError({
                                message: _response.error.errorMessage,
                                rawResponse: _response.rawResponse
                            });
                    }
                }));
            let _offset = (request === null || request === void 0 ? void 0 : request.pageNumber) != null ? request === null || request === void 0 ? void 0 : request.pageNumber : 0;
            const dataWithRawResponse = yield list(request).withRawResponse();
            return new core.Page({
                response: dataWithRawResponse.data,
                rawResponse: dataWithRawResponse.rawResponse,
                hasNextPage: (response)=>{
                    var _a;
                    return ((_a = response === null || response === void 0 ? void 0 : response.promptsPage) !== null && _a !== void 0 ? _a : []).length > 0;
                },
                getItems: (response)=>{
                    var _a;
                    return (_a = response === null || response === void 0 ? void 0 : response.promptsPage) !== null && _a !== void 0 ? _a : [];
                },
                loadPage: (_response)=>{
                    _offset += 1;
                    return list(core.setObjectProperty(request, "pageNumber", _offset));
                }
            });
        });
    }
    /**
     * Creates a **Prompt** that can be added to an [EVI configuration](/reference/speech-to-speech-evi/configs/create-config).
     *
     * See our [prompting guide](/docs/speech-to-speech-evi/guides/phone-calling) for tips on crafting your system prompt.
     *
     * @param {Hume.empathicVoice.PostedPrompt} request
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.prompts.createPrompt({
     *         name: "Weather Assistant Prompt",
     *         text: "<role>You are an AI weather assistant providing users with accurate and up-to-date weather information. Respond to user queries concisely and clearly. Use simple language and avoid technical jargon. Provide temperature, precipitation, wind conditions, and any weather alerts. Include helpful tips if severe weather is expected.</role>"
     *     })
     */ createPrompt(request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__createPrompt(request, requestOptions));
    }
    __createPrompt(request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, "v0/evi/prompts"),
                method: "POST",
                headers: _headers,
                contentType: "application/json",
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "json",
                body: serializers.empathicVoice.PostedPrompt.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                }),
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.empathicVoice.prompts.createPrompt.Response.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling POST /v0/evi/prompts.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Fetches a list of a **Prompt's** versions.
     *
     * See our [prompting guide](/docs/speech-to-speech-evi/guides/phone-calling) for tips on crafting your system prompt.
     *
     * @param {string} id - Identifier for a Prompt. Formatted as a UUID.
     * @param {Hume.empathicVoice.PromptsListPromptVersionsRequest} request
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.prompts.listPromptVersions("af699d45-2985-42cc-91b9-af9e5da3bac5")
     */ listPromptVersions(id, request = {}, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__listPromptVersions(id, request, requestOptions));
    }
    __listPromptVersions(id_1) {
        return __awaiter(this, arguments, void 0, function*(id, request = {}, requestOptions) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const { pageNumber, pageSize, restrictToMostRecent } = request;
            const _queryParams = {};
            if (pageNumber != null) {
                _queryParams.page_number = pageNumber.toString();
            }
            if (pageSize != null) {
                _queryParams.page_size = pageSize.toString();
            }
            if (restrictToMostRecent != null) {
                _queryParams.restrict_to_most_recent = restrictToMostRecent.toString();
            }
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/prompts/${core.url.encodePathParam(id)}`),
                method: "GET",
                headers: _headers,
                queryParameters: Object.assign(Object.assign({}, _queryParams), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams),
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.empathicVoice.ReturnPagedPrompts.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/prompts/{id}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Updates a **Prompt** by creating a new version of the **Prompt**.
     *
     * See our [prompting guide](/docs/speech-to-speech-evi/guides/phone-calling) for tips on crafting your system prompt.
     *
     * @param {string} id - Identifier for a Prompt. Formatted as a UUID.
     * @param {Hume.empathicVoice.PostedPromptVersion} request
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.prompts.createPromptVersion("af699d45-2985-42cc-91b9-af9e5da3bac5", {
     *         text: "<role>You are an updated version of an AI weather assistant providing users with accurate and up-to-date weather information. Respond to user queries concisely and clearly. Use simple language and avoid technical jargon. Provide temperature, precipitation, wind conditions, and any weather alerts. Include helpful tips if severe weather is expected.</role>",
     *         versionDescription: "This is an updated version of the Weather Assistant Prompt."
     *     })
     */ createPromptVersion(id, request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__createPromptVersion(id, request, requestOptions));
    }
    __createPromptVersion(id, request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/prompts/${core.url.encodePathParam(id)}`),
                method: "POST",
                headers: _headers,
                contentType: "application/json",
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "json",
                body: serializers.empathicVoice.PostedPromptVersion.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                }),
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.empathicVoice.prompts.createPromptVersion.Response.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling POST /v0/evi/prompts/{id}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Deletes a **Prompt** and its versions.
     *
     * See our [prompting guide](/docs/speech-to-speech-evi/guides/phone-calling) for tips on crafting your system prompt.
     *
     * @param {string} id - Identifier for a Prompt. Formatted as a UUID.
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.prompts.deletePrompt("af699d45-2985-42cc-91b9-af9e5da3bac5")
     */ deletePrompt(id, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__deletePrompt(id, requestOptions));
    }
    __deletePrompt(id, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/prompts/${core.url.encodePathParam(id)}`),
                method: "DELETE",
                headers: _headers,
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: undefined,
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling DELETE /v0/evi/prompts/{id}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Updates the name of a **Prompt**.
     *
     * See our [prompting guide](/docs/speech-to-speech-evi/guides/phone-calling) for tips on crafting your system prompt.
     *
     * @param {string} id - Identifier for a Prompt. Formatted as a UUID.
     * @param {Hume.empathicVoice.PostedPromptName} request
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.prompts.updatePromptName("af699d45-2985-42cc-91b9-af9e5da3bac5", {
     *         name: "Updated Weather Assistant Prompt Name"
     *     })
     */ updatePromptName(id, request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__updatePromptName(id, request, requestOptions));
    }
    __updatePromptName(id, request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/prompts/${core.url.encodePathParam(id)}`),
                method: "PATCH",
                headers: _headers,
                contentType: "application/json",
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "json",
                body: serializers.empathicVoice.PostedPromptName.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                }),
                responseType: "text",
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: _response.body,
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling PATCH /v0/evi/prompts/{id}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Fetches a specified version of a **Prompt**.
     *
     * See our [prompting guide](/docs/speech-to-speech-evi/guides/phone-calling) for tips on crafting your system prompt.
     *
     * @param {string} id - Identifier for a Prompt. Formatted as a UUID.
     * @param {number} version - Version number for a Prompt.
     *
     *                           Prompts, Configs, Custom Voices, and Tools are versioned. This versioning system supports iterative development, allowing you to progressively refine prompts and revert to previous versions if needed.
     *
     *                           Version numbers are integer values representing different iterations of the Prompt. Each update to the Prompt increments its version number.
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.prompts.getPromptVersion("af699d45-2985-42cc-91b9-af9e5da3bac5", 0)
     */ getPromptVersion(id, version, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__getPromptVersion(id, version, requestOptions));
    }
    __getPromptVersion(id, version, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/prompts/${core.url.encodePathParam(id)}/version/${core.url.encodePathParam(version)}`),
                method: "GET",
                headers: _headers,
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.empathicVoice.prompts.getPromptVersion.Response.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/prompts/{id}/version/{version}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Deletes a specified version of a **Prompt**.
     *
     * See our [prompting guide](/docs/speech-to-speech-evi/guides/phone-calling) for tips on crafting your system prompt.
     *
     * @param {string} id - Identifier for a Prompt. Formatted as a UUID.
     * @param {number} version - Version number for a Prompt.
     *
     *                           Prompts, Configs, Custom Voices, and Tools are versioned. This versioning system supports iterative development, allowing you to progressively refine prompts and revert to previous versions if needed.
     *
     *                           Version numbers are integer values representing different iterations of the Prompt. Each update to the Prompt increments its version number.
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.prompts.deletePromptVersion("af699d45-2985-42cc-91b9-af9e5da3bac5", 1)
     */ deletePromptVersion(id, version, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__deletePromptVersion(id, version, requestOptions));
    }
    __deletePromptVersion(id, version, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/prompts/${core.url.encodePathParam(id)}/version/${core.url.encodePathParam(version)}`),
                method: "DELETE",
                headers: _headers,
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: undefined,
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling DELETE /v0/evi/prompts/{id}/version/{version}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Updates the description of a **Prompt**.
     *
     * See our [prompting guide](/docs/speech-to-speech-evi/guides/phone-calling) for tips on crafting your system prompt.
     *
     * @param {string} id - Identifier for a Prompt. Formatted as a UUID.
     * @param {number} version - Version number for a Prompt.
     *
     *                           Prompts, Configs, Custom Voices, and Tools are versioned. This versioning system supports iterative development, allowing you to progressively refine prompts and revert to previous versions if needed.
     *
     *                           Version numbers are integer values representing different iterations of the Prompt. Each update to the Prompt increments its version number.
     * @param {Hume.empathicVoice.PostedPromptVersionDescription} request
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.prompts.updatePromptDescription("af699d45-2985-42cc-91b9-af9e5da3bac5", 1, {
     *         versionDescription: "This is an updated version_description."
     *     })
     */ updatePromptDescription(id, version, request = {}, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__updatePromptDescription(id, version, request, requestOptions));
    }
    __updatePromptDescription(id_1, version_1) {
        return __awaiter(this, arguments, void 0, function*(id, version, request = {}, requestOptions) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/prompts/${core.url.encodePathParam(id)}/version/${core.url.encodePathParam(version)}`),
                method: "PATCH",
                headers: _headers,
                contentType: "application/json",
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "json",
                body: serializers.empathicVoice.PostedPromptVersionDescription.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                }),
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.empathicVoice.prompts.updatePromptDescription.Response.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling PATCH /v0/evi/prompts/{id}/version/{version}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    _getCustomAuthorizationHeaders() {
        return __awaiter(this, void 0, void 0, function*() {
            const apiKeyValue = yield core.Supplier.get(this._options.apiKey);
            return {
                "X-Hume-Api-Key": apiKeyValue
            };
        });
    }
}
exports.Prompts = Prompts;
}),
"[project]/dist/cjs/api/resources/empathicVoice/resources/tools/client/Client.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tools = void 0;
const headers_js_1 = __turbopack_context__.r("[project]/dist/cjs/core/headers.js [app-route] (ecmascript)");
const core = __importStar(__turbopack_context__.r("[project]/dist/cjs/core/index.js [app-route] (ecmascript)"));
const environments = __importStar(__turbopack_context__.r("[project]/dist/cjs/environments.js [app-route] (ecmascript)"));
const errors = __importStar(__turbopack_context__.r("[project]/dist/cjs/errors/index.js [app-route] (ecmascript)"));
const serializers = __importStar(__turbopack_context__.r("[project]/dist/cjs/serialization/index.js [app-route] (ecmascript)"));
const Hume = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/index.js [app-route] (ecmascript)"));
class Tools {
    constructor(_options = {}){
        this._options = _options;
    }
    /**
     * Fetches a paginated list of **Tools**.
     *
     * Refer to our [tool use](/docs/speech-to-speech-evi/features/tool-use#function-calling) guide for comprehensive instructions on defining and integrating tools into EVI.
     *
     * @param {Hume.empathicVoice.ToolsListToolsRequest} request
     * @param {Tools.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.tools.listTools({
     *         pageNumber: 0,
     *         pageSize: 2
     *     })
     */ listTools() {
        return __awaiter(this, arguments, void 0, function*(request = {}, requestOptions) {
            const list = core.HttpResponsePromise.interceptFunction((request)=>__awaiter(this, void 0, void 0, function*() {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                    const { pageNumber, pageSize, restrictToMostRecent, name } = request;
                    const _queryParams = {};
                    if (pageNumber != null) {
                        _queryParams.page_number = pageNumber.toString();
                    }
                    if (pageSize != null) {
                        _queryParams.page_size = pageSize.toString();
                    }
                    if (restrictToMostRecent != null) {
                        _queryParams.restrict_to_most_recent = restrictToMostRecent.toString();
                    }
                    if (name != null) {
                        _queryParams.name = name;
                    }
                    const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
                    const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                        url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, "v0/evi/tools"),
                        method: "GET",
                        headers: _headers,
                        queryParameters: Object.assign(Object.assign({}, _queryParams), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams),
                        timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                        maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                        fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                        logging: this._options.logging
                    });
                    if (_response.ok) {
                        return {
                            data: serializers.empathicVoice.ReturnPagedUserDefinedTools.parseOrThrow(_response.body, {
                                unrecognizedObjectKeys: "passthrough",
                                allowUnrecognizedUnionMembers: true,
                                allowUnrecognizedEnumValues: true,
                                skipValidation: true,
                                breadcrumbsPrefix: [
                                    "response"
                                ]
                            }),
                            rawResponse: _response.rawResponse
                        };
                    }
                    if (_response.error.reason === "status-code") {
                        switch(_response.error.statusCode){
                            case 400:
                                throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                                    unrecognizedObjectKeys: "passthrough",
                                    allowUnrecognizedUnionMembers: true,
                                    allowUnrecognizedEnumValues: true,
                                    skipValidation: true,
                                    breadcrumbsPrefix: [
                                        "response"
                                    ]
                                }), _response.rawResponse);
                            default:
                                throw new errors.HumeError({
                                    statusCode: _response.error.statusCode,
                                    body: _response.error.body,
                                    rawResponse: _response.rawResponse
                                });
                        }
                    }
                    switch(_response.error.reason){
                        case "non-json":
                            throw new errors.HumeError({
                                statusCode: _response.error.statusCode,
                                body: _response.error.rawBody,
                                rawResponse: _response.rawResponse
                            });
                        case "timeout":
                            throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/tools.");
                        case "unknown":
                            throw new errors.HumeError({
                                message: _response.error.errorMessage,
                                rawResponse: _response.rawResponse
                            });
                    }
                }));
            let _offset = (request === null || request === void 0 ? void 0 : request.pageNumber) != null ? request === null || request === void 0 ? void 0 : request.pageNumber : 0;
            const dataWithRawResponse = yield list(request).withRawResponse();
            return new core.Page({
                response: dataWithRawResponse.data,
                rawResponse: dataWithRawResponse.rawResponse,
                hasNextPage: (response)=>{
                    var _a;
                    return ((_a = response === null || response === void 0 ? void 0 : response.toolsPage) !== null && _a !== void 0 ? _a : []).length > 0;
                },
                getItems: (response)=>{
                    var _a;
                    return (_a = response === null || response === void 0 ? void 0 : response.toolsPage) !== null && _a !== void 0 ? _a : [];
                },
                loadPage: (_response)=>{
                    _offset += 1;
                    return list(core.setObjectProperty(request, "pageNumber", _offset));
                }
            });
        });
    }
    /**
     * Creates a **Tool** that can be added to an [EVI configuration](/reference/speech-to-speech-evi/configs/create-config).
     *
     * Refer to our [tool use](/docs/speech-to-speech-evi/features/tool-use#function-calling) guide for comprehensive instructions on defining and integrating tools into EVI.
     *
     * @param {Hume.empathicVoice.PostedUserDefinedTool} request
     * @param {Tools.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.tools.createTool({
     *         name: "get_current_weather",
     *         parameters: "{ \"type\": \"object\", \"properties\": { \"location\": { \"type\": \"string\", \"description\": \"The city and state, e.g. San Francisco, CA\" }, \"format\": { \"type\": \"string\", \"enum\": [\"celsius\", \"fahrenheit\"], \"description\": \"The temperature unit to use. Infer this from the users location.\" } }, \"required\": [\"location\", \"format\"] }",
     *         versionDescription: "Fetches current weather and uses celsius or fahrenheit based on location of user.",
     *         description: "This tool is for getting the current weather.",
     *         fallbackContent: "Unable to fetch current weather."
     *     })
     */ createTool(request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__createTool(request, requestOptions));
    }
    __createTool(request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, "v0/evi/tools"),
                method: "POST",
                headers: _headers,
                contentType: "application/json",
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "json",
                body: serializers.empathicVoice.PostedUserDefinedTool.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                }),
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.empathicVoice.tools.createTool.Response.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling POST /v0/evi/tools.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Fetches a list of a **Tool's** versions.
     *
     * Refer to our [tool use](/docs/speech-to-speech-evi/features/tool-use#function-calling) guide for comprehensive instructions on defining and integrating tools into EVI.
     *
     * @param {string} id - Identifier for a Tool. Formatted as a UUID.
     * @param {Hume.empathicVoice.ToolsListToolVersionsRequest} request
     * @param {Tools.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.tools.listToolVersions("00183a3f-79ba-413d-9f3b-609864268bea")
     */ listToolVersions(id_1) {
        return __awaiter(this, arguments, void 0, function*(id, request = {}, requestOptions) {
            const list = core.HttpResponsePromise.interceptFunction((request)=>__awaiter(this, void 0, void 0, function*() {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                    const { pageNumber, pageSize, restrictToMostRecent } = request;
                    const _queryParams = {};
                    if (pageNumber != null) {
                        _queryParams.page_number = pageNumber.toString();
                    }
                    if (pageSize != null) {
                        _queryParams.page_size = pageSize.toString();
                    }
                    if (restrictToMostRecent != null) {
                        _queryParams.restrict_to_most_recent = restrictToMostRecent.toString();
                    }
                    const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
                    const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                        url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/tools/${core.url.encodePathParam(id)}`),
                        method: "GET",
                        headers: _headers,
                        queryParameters: Object.assign(Object.assign({}, _queryParams), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams),
                        timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                        maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                        fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                        logging: this._options.logging
                    });
                    if (_response.ok) {
                        return {
                            data: serializers.empathicVoice.ReturnPagedUserDefinedTools.parseOrThrow(_response.body, {
                                unrecognizedObjectKeys: "passthrough",
                                allowUnrecognizedUnionMembers: true,
                                allowUnrecognizedEnumValues: true,
                                skipValidation: true,
                                breadcrumbsPrefix: [
                                    "response"
                                ]
                            }),
                            rawResponse: _response.rawResponse
                        };
                    }
                    if (_response.error.reason === "status-code") {
                        switch(_response.error.statusCode){
                            case 400:
                                throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                                    unrecognizedObjectKeys: "passthrough",
                                    allowUnrecognizedUnionMembers: true,
                                    allowUnrecognizedEnumValues: true,
                                    skipValidation: true,
                                    breadcrumbsPrefix: [
                                        "response"
                                    ]
                                }), _response.rawResponse);
                            default:
                                throw new errors.HumeError({
                                    statusCode: _response.error.statusCode,
                                    body: _response.error.body,
                                    rawResponse: _response.rawResponse
                                });
                        }
                    }
                    switch(_response.error.reason){
                        case "non-json":
                            throw new errors.HumeError({
                                statusCode: _response.error.statusCode,
                                body: _response.error.rawBody,
                                rawResponse: _response.rawResponse
                            });
                        case "timeout":
                            throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/tools/{id}.");
                        case "unknown":
                            throw new errors.HumeError({
                                message: _response.error.errorMessage,
                                rawResponse: _response.rawResponse
                            });
                    }
                }));
            let _offset = (request === null || request === void 0 ? void 0 : request.pageNumber) != null ? request === null || request === void 0 ? void 0 : request.pageNumber : 0;
            const dataWithRawResponse = yield list(request).withRawResponse();
            return new core.Page({
                response: dataWithRawResponse.data,
                rawResponse: dataWithRawResponse.rawResponse,
                hasNextPage: (response)=>{
                    var _a;
                    return ((_a = response === null || response === void 0 ? void 0 : response.toolsPage) !== null && _a !== void 0 ? _a : []).length > 0;
                },
                getItems: (response)=>{
                    var _a;
                    return (_a = response === null || response === void 0 ? void 0 : response.toolsPage) !== null && _a !== void 0 ? _a : [];
                },
                loadPage: (_response)=>{
                    _offset += 1;
                    return list(core.setObjectProperty(request, "pageNumber", _offset));
                }
            });
        });
    }
    /**
     * Updates a **Tool** by creating a new version of the **Tool**.
     *
     * Refer to our [tool use](/docs/speech-to-speech-evi/features/tool-use#function-calling) guide for comprehensive instructions on defining and integrating tools into EVI.
     *
     * @param {string} id - Identifier for a Tool. Formatted as a UUID.
     * @param {Hume.empathicVoice.PostedUserDefinedToolVersion} request
     * @param {Tools.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.tools.createToolVersion("00183a3f-79ba-413d-9f3b-609864268bea", {
     *         parameters: "{ \"type\": \"object\", \"properties\": { \"location\": { \"type\": \"string\", \"description\": \"The city and state, e.g. San Francisco, CA\" }, \"format\": { \"type\": \"string\", \"enum\": [\"celsius\", \"fahrenheit\", \"kelvin\"], \"description\": \"The temperature unit to use. Infer this from the users location.\" } }, \"required\": [\"location\", \"format\"] }",
     *         versionDescription: "Fetches current weather and uses celsius, fahrenheit, or kelvin based on location of user.",
     *         fallbackContent: "Unable to fetch current weather.",
     *         description: "This tool is for getting the current weather."
     *     })
     */ createToolVersion(id, request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__createToolVersion(id, request, requestOptions));
    }
    __createToolVersion(id, request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/tools/${core.url.encodePathParam(id)}`),
                method: "POST",
                headers: _headers,
                contentType: "application/json",
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "json",
                body: serializers.empathicVoice.PostedUserDefinedToolVersion.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                }),
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.empathicVoice.tools.createToolVersion.Response.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling POST /v0/evi/tools/{id}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Deletes a **Tool** and its versions.
     *
     * Refer to our [tool use](/docs/speech-to-speech-evi/features/tool-use#function-calling) guide for comprehensive instructions on defining and integrating tools into EVI.
     *
     * @param {string} id - Identifier for a Tool. Formatted as a UUID.
     * @param {Tools.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.tools.deleteTool("00183a3f-79ba-413d-9f3b-609864268bea")
     */ deleteTool(id, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__deleteTool(id, requestOptions));
    }
    __deleteTool(id, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/tools/${core.url.encodePathParam(id)}`),
                method: "DELETE",
                headers: _headers,
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: undefined,
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling DELETE /v0/evi/tools/{id}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Updates the name of a **Tool**.
     *
     * Refer to our [tool use](/docs/speech-to-speech-evi/features/tool-use#function-calling) guide for comprehensive instructions on defining and integrating tools into EVI.
     *
     * @param {string} id - Identifier for a Tool. Formatted as a UUID.
     * @param {Hume.empathicVoice.PostedUserDefinedToolName} request
     * @param {Tools.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.tools.updateToolName("00183a3f-79ba-413d-9f3b-609864268bea", {
     *         name: "get_current_temperature"
     *     })
     */ updateToolName(id, request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__updateToolName(id, request, requestOptions));
    }
    __updateToolName(id, request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/tools/${core.url.encodePathParam(id)}`),
                method: "PATCH",
                headers: _headers,
                contentType: "application/json",
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "json",
                body: serializers.empathicVoice.PostedUserDefinedToolName.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                }),
                responseType: "text",
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: _response.body,
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling PATCH /v0/evi/tools/{id}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Fetches a specified version of a **Tool**.
     *
     * Refer to our [tool use](/docs/speech-to-speech-evi/features/tool-use#function-calling) guide for comprehensive instructions on defining and integrating tools into EVI.
     *
     * @param {string} id - Identifier for a Tool. Formatted as a UUID.
     * @param {number} version - Version number for a Tool.
     *
     *                           Tools, Configs, Custom Voices, and Prompts are versioned. This versioning system supports iterative development, allowing you to progressively refine tools and revert to previous versions if needed.
     *
     *                           Version numbers are integer values representing different iterations of the Tool. Each update to the Tool increments its version number.
     * @param {Tools.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.tools.getToolVersion("00183a3f-79ba-413d-9f3b-609864268bea", 1)
     */ getToolVersion(id, version, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__getToolVersion(id, version, requestOptions));
    }
    __getToolVersion(id, version, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/tools/${core.url.encodePathParam(id)}/version/${core.url.encodePathParam(version)}`),
                method: "GET",
                headers: _headers,
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.empathicVoice.tools.getToolVersion.Response.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/tools/{id}/version/{version}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Deletes a specified version of a **Tool**.
     *
     * Refer to our [tool use](/docs/speech-to-speech-evi/features/tool-use#function-calling) guide for comprehensive instructions on defining and integrating tools into EVI.
     *
     * @param {string} id - Identifier for a Tool. Formatted as a UUID.
     * @param {number} version - Version number for a Tool.
     *
     *                           Tools, Configs, Custom Voices, and Prompts are versioned. This versioning system supports iterative development, allowing you to progressively refine tools and revert to previous versions if needed.
     *
     *                           Version numbers are integer values representing different iterations of the Tool. Each update to the Tool increments its version number.
     * @param {Tools.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.tools.deleteToolVersion("00183a3f-79ba-413d-9f3b-609864268bea", 1)
     */ deleteToolVersion(id, version, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__deleteToolVersion(id, version, requestOptions));
    }
    __deleteToolVersion(id, version, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/tools/${core.url.encodePathParam(id)}/version/${core.url.encodePathParam(version)}`),
                method: "DELETE",
                headers: _headers,
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: undefined,
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling DELETE /v0/evi/tools/{id}/version/{version}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Updates the description of a specified **Tool** version.
     *
     * Refer to our [tool use](/docs/speech-to-speech-evi/features/tool-use#function-calling) guide for comprehensive instructions on defining and integrating tools into EVI.
     *
     * @param {string} id - Identifier for a Tool. Formatted as a UUID.
     * @param {number} version - Version number for a Tool.
     *
     *                           Tools, Configs, Custom Voices, and Prompts are versioned. This versioning system supports iterative development, allowing you to progressively refine tools and revert to previous versions if needed.
     *
     *                           Version numbers are integer values representing different iterations of the Tool. Each update to the Tool increments its version number.
     * @param {Hume.empathicVoice.PostedUserDefinedToolVersionDescription} request
     * @param {Tools.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.tools.updateToolDescription("00183a3f-79ba-413d-9f3b-609864268bea", 1, {
     *         versionDescription: "Fetches current temperature, precipitation, wind speed, AQI, and other weather conditions. Uses Celsius, Fahrenheit, or kelvin depending on user's region."
     *     })
     */ updateToolDescription(id, version, request = {}, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__updateToolDescription(id, version, request, requestOptions));
    }
    __updateToolDescription(id_1, version_1) {
        return __awaiter(this, arguments, void 0, function*(id, version, request = {}, requestOptions) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/evi/tools/${core.url.encodePathParam(id)}/version/${core.url.encodePathParam(version)}`),
                method: "PATCH",
                headers: _headers,
                contentType: "application/json",
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "json",
                body: serializers.empathicVoice.PostedUserDefinedToolVersionDescription.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                }),
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.empathicVoice.tools.updateToolDescription.Response.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling PATCH /v0/evi/tools/{id}/version/{version}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    _getCustomAuthorizationHeaders() {
        return __awaiter(this, void 0, void 0, function*() {
            const apiKeyValue = yield core.Supplier.get(this._options.apiKey);
            return {
                "X-Hume-Api-Key": apiKeyValue
            };
        });
    }
}
exports.Tools = Tools;
}),
"[project]/dist/cjs/api/resources/empathicVoice/client/Client.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EmpathicVoice = void 0;
const Client_js_1 = __turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/chat/client/Client.js [app-route] (ecmascript)");
const Client_js_2 = __turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/chatGroups/client/Client.js [app-route] (ecmascript)");
const Client_js_3 = __turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/chats/client/Client.js [app-route] (ecmascript)");
const Client_js_4 = __turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/configs/client/Client.js [app-route] (ecmascript)");
const Client_js_5 = __turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/controlPlane/client/Client.js [app-route] (ecmascript)");
const Client_js_6 = __turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/prompts/client/Client.js [app-route] (ecmascript)");
const Client_js_7 = __turbopack_context__.r("[project]/dist/cjs/api/resources/empathicVoice/resources/tools/client/Client.js [app-route] (ecmascript)");
class EmpathicVoice {
    constructor(_options = {}){
        this._options = _options;
    }
    get controlPlane() {
        var _a;
        return (_a = this._controlPlane) !== null && _a !== void 0 ? _a : this._controlPlane = new Client_js_5.ControlPlane(this._options);
    }
    get chatGroups() {
        var _a;
        return (_a = this._chatGroups) !== null && _a !== void 0 ? _a : this._chatGroups = new Client_js_2.ChatGroups(this._options);
    }
    get chats() {
        var _a;
        return (_a = this._chats) !== null && _a !== void 0 ? _a : this._chats = new Client_js_3.Chats(this._options);
    }
    get configs() {
        var _a;
        return (_a = this._configs) !== null && _a !== void 0 ? _a : this._configs = new Client_js_4.Configs(this._options);
    }
    get prompts() {
        var _a;
        return (_a = this._prompts) !== null && _a !== void 0 ? _a : this._prompts = new Client_js_6.Prompts(this._options);
    }
    get tools() {
        var _a;
        return (_a = this._tools) !== null && _a !== void 0 ? _a : this._tools = new Client_js_7.Tools(this._options);
    }
    get chat() {
        var _a;
        return (_a = this._chat) !== null && _a !== void 0 ? _a : this._chat = new Client_js_1.Chat(this._options);
    }
}
exports.EmpathicVoice = EmpathicVoice;
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/client/Client.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Batch = void 0;
const headers_js_1 = __turbopack_context__.r("[project]/dist/cjs/core/headers.js [app-route] (ecmascript)");
const core = __importStar(__turbopack_context__.r("[project]/dist/cjs/core/index.js [app-route] (ecmascript)"));
const json_js_1 = __turbopack_context__.r("[project]/dist/cjs/core/json.js [app-route] (ecmascript)");
const environments = __importStar(__turbopack_context__.r("[project]/dist/cjs/environments.js [app-route] (ecmascript)"));
const errors = __importStar(__turbopack_context__.r("[project]/dist/cjs/errors/index.js [app-route] (ecmascript)"));
const serializers = __importStar(__turbopack_context__.r("[project]/dist/cjs/serialization/index.js [app-route] (ecmascript)"));
class Batch {
    constructor(_options = {}){
        this._options = _options;
    }
    /**
     * Sort and filter jobs.
     *
     * @param {Hume.expressionMeasurement.batch.BatchListJobsRequest} request
     * @param {Batch.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.expressionMeasurement.batch.listJobs()
     */ listJobs(request = {}, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__listJobs(request, requestOptions));
    }
    __listJobs() {
        return __awaiter(this, arguments, void 0, function*(request = {}, requestOptions) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const { limit, status, when, timestampMs, sortBy, direction } = request;
            const _queryParams = {};
            if (limit != null) {
                _queryParams.limit = limit.toString();
            }
            if (status != null) {
                if (Array.isArray(status)) {
                    _queryParams.status = status.map((item)=>serializers.expressionMeasurement.batch.Status.jsonOrThrow(item, {
                            unrecognizedObjectKeys: "strip",
                            omitUndefined: true
                        }));
                } else {
                    _queryParams.status = serializers.expressionMeasurement.batch.Status.jsonOrThrow(status, {
                        unrecognizedObjectKeys: "strip",
                        omitUndefined: true
                    });
                }
            }
            if (when != null) {
                _queryParams.when = serializers.expressionMeasurement.batch.When.jsonOrThrow(when, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                });
            }
            if (timestampMs != null) {
                _queryParams.timestamp_ms = timestampMs.toString();
            }
            if (sortBy != null) {
                _queryParams.sort_by = serializers.expressionMeasurement.batch.SortBy.jsonOrThrow(sortBy, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                });
            }
            if (direction != null) {
                _queryParams.direction = serializers.expressionMeasurement.batch.Direction.jsonOrThrow(direction, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                });
            }
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, "v0/batch/jobs"),
                method: "GET",
                headers: _headers,
                queryParameters: Object.assign(Object.assign({}, _queryParams), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams),
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.expressionMeasurement.batch.listJobs.Response.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                throw new errors.HumeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.body,
                    rawResponse: _response.rawResponse
                });
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/batch/jobs.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Start a new measurement inference job.
     *
     * @param {Hume.expressionMeasurement.batch.InferenceBaseRequest} request
     * @param {Batch.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.expressionMeasurement.batch.startInferenceJob({
     *         urls: ["https://hume-tutorials.s3.amazonaws.com/faces.zip"],
     *         notify: true
     *     })
     */ startInferenceJob(request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__startInferenceJob(request, requestOptions));
    }
    __startInferenceJob(request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, "v0/batch/jobs"),
                method: "POST",
                headers: _headers,
                contentType: "application/json",
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "json",
                body: serializers.expressionMeasurement.batch.InferenceBaseRequest.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                }),
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.expressionMeasurement.batch.JobId.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                throw new errors.HumeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.body,
                    rawResponse: _response.rawResponse
                });
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling POST /v0/batch/jobs.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Get the request details and state of a given job.
     *
     * @param {string} id - The unique identifier for the job.
     * @param {Batch.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.expressionMeasurement.batch.getJobDetails("job_id")
     */ getJobDetails(id, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__getJobDetails(id, requestOptions));
    }
    __getJobDetails(id, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/batch/jobs/${core.url.encodePathParam(id)}`),
                method: "GET",
                headers: _headers,
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.expressionMeasurement.batch.UnionJob.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                throw new errors.HumeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.body,
                    rawResponse: _response.rawResponse
                });
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/batch/jobs/{id}.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Get the JSON predictions of a completed inference job.
     *
     * @param {string} id - The unique identifier for the job.
     * @param {Batch.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.expressionMeasurement.batch.getJobPredictions("job_id")
     */ getJobPredictions(id, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__getJobPredictions(id, requestOptions));
    }
    __getJobPredictions(id, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/batch/jobs/${core.url.encodePathParam(id)}/predictions`),
                method: "GET",
                headers: _headers,
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.expressionMeasurement.batch.getJobPredictions.Response.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                throw new errors.HumeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.body,
                    rawResponse: _response.rawResponse
                });
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/batch/jobs/{id}/predictions.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Get the artifacts ZIP of a completed inference job.
     */ getJobArtifacts(id, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__getJobArtifacts(id, requestOptions));
    }
    __getJobArtifacts(id, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, `v0/batch/jobs/${core.url.encodePathParam(id)}/artifacts`),
                method: "GET",
                headers: _headers,
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                responseType: "binary-response",
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: _response.body,
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                throw new errors.HumeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.body,
                    rawResponse: _response.rawResponse
                });
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/batch/jobs/{id}/artifacts.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Start a new batch inference job.
     *
     * @param {Hume.expressionMeasurement.batch.BatchStartInferenceJobFromLocalFileRequest} request
     * @param {Batch.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     import { createReadStream } from "fs";
     *     await client.expressionMeasurement.batch.startInferenceJobFromLocalFile({
     *         file: [fs.createReadStream("/path/to/your/file")]
     *     })
     */ startInferenceJobFromLocalFile(request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__startInferenceJobFromLocalFile(request, requestOptions));
    }
    __startInferenceJobFromLocalFile(request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _request = yield core.newFormData();
            if (request.json != null) {
                _request.append("json", (0, json_js_1.toJson)(serializers.expressionMeasurement.batch.InferenceBaseRequest.jsonOrThrow(request.json, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                })));
            }
            for (const _file of request.file){
                yield _request.appendFile("file", _file);
            }
            const _maybeEncodedRequest = yield _request.getRequest();
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign(Object.assign({}, (yield this._getCustomAuthorizationHeaders())), _maybeEncodedRequest.headers)), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, "v0/batch/jobs"),
                method: "POST",
                headers: _headers,
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "file",
                duplex: _maybeEncodedRequest.duplex,
                body: _maybeEncodedRequest.body,
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.expressionMeasurement.batch.JobId.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                throw new errors.HumeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.body,
                    rawResponse: _response.rawResponse
                });
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling POST /v0/batch/jobs.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    _getCustomAuthorizationHeaders() {
        return __awaiter(this, void 0, void 0, function*() {
            const apiKeyValue = yield core.Supplier.get(this._options.apiKey);
            return {
                "X-Hume-Api-Key": apiKeyValue
            };
        });
    }
}
exports.Batch = Batch;
}),
"[project]/dist/cjs/api/resources/expressionMeasurement/client/Client.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExpressionMeasurement = void 0;
const Client_js_1 = __turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/client/Client.js [app-route] (ecmascript)");
class ExpressionMeasurement {
    constructor(_options = {}){
        this._options = _options;
    }
    get batch() {
        var _a;
        return (_a = this._batch) !== null && _a !== void 0 ? _a : this._batch = new Client_js_1.Batch(this._options);
    }
}
exports.ExpressionMeasurement = ExpressionMeasurement;
}),
"[project]/dist/cjs/api/resources/tts/resources/streamInput/client/Socket.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StreamInputSocket = void 0;
const core = __importStar(__turbopack_context__.r("[project]/dist/cjs/core/index.js [app-route] (ecmascript)"));
const json_js_1 = __turbopack_context__.r("[project]/dist/cjs/core/json.js [app-route] (ecmascript)");
const serializers = __importStar(__turbopack_context__.r("[project]/dist/cjs/serialization/index.js [app-route] (ecmascript)"));
const PublishTts_js_1 = __turbopack_context__.r("[project]/dist/cjs/serialization/resources/tts/types/PublishTts.js [app-route] (ecmascript)");
class StreamInputSocket {
    constructor(args){
        this.eventHandlers = {};
        this.handleOpen = ()=>{
            var _a, _b;
            (_b = (_a = this.eventHandlers).open) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        this.handleMessage = (event)=>{
            var _a, _b, _c, _d;
            const data = (0, json_js_1.fromJson)(event.data);
            const parsedResponse = serializers.tts.StreamInputSocketResponse.parse(data, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                omitUndefined: true
            });
            if (parsedResponse.ok) {
                (_b = (_a = this.eventHandlers).message) === null || _b === void 0 ? void 0 : _b.call(_a, parsedResponse.value);
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
        const jsonPayload = PublishTts_js_1.PublishTts.jsonOrThrow(message, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            omitUndefined: true
        });
        this.socket.send(JSON.stringify(jsonPayload));
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
            if (this.socket.readyState === core.ReconnectingWebSocket.OPEN) {
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
    /** Asserts that the websocket is open. */ assertSocketIsOpen() {
        if (!this.socket) {
            throw new Error("Socket is not connected.");
        }
        if (this.socket.readyState !== core.ReconnectingWebSocket.OPEN) {
            throw new Error("Socket is not open.");
        }
    }
    /** Send a binary payload to the websocket. */ sendBinary(payload) {
        this.socket.send(payload);
    }
}
exports.StreamInputSocket = StreamInputSocket;
}),
"[project]/dist/cjs/api/resources/tts/resources/streamInput/client/Client.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StreamInputClient = void 0;
const BaseClient_js_1 = __turbopack_context__.r("[project]/dist/cjs/BaseClient.js [app-route] (ecmascript)");
const headers_js_1 = __turbopack_context__.r("[project]/dist/cjs/core/headers.js [app-route] (ecmascript)");
const core = __importStar(__turbopack_context__.r("[project]/dist/cjs/core/index.js [app-route] (ecmascript)"));
const environments = __importStar(__turbopack_context__.r("[project]/dist/cjs/environments.js [app-route] (ecmascript)"));
const serializers = __importStar(__turbopack_context__.r("[project]/dist/cjs/serialization/index.js [app-route] (ecmascript)"));
const Socket_js_1 = __turbopack_context__.r("[project]/dist/cjs/api/resources/tts/resources/streamInput/client/Socket.js [app-route] (ecmascript)");
class StreamInputClient {
    constructor(options = {}){
        this._options = (0, BaseClient_js_1.normalizeClientOptions)(options);
    }
    connect() {
        return __awaiter(this, arguments, void 0, function*(args = {}) {
            var _a, _b;
            const { accessToken, contextGenerationId, formatType, includeTimestampTypes, instantMode, noBinary, stripHeaders, version, apiKey, headers, debug, reconnectAttempts } = args;
            const _queryParams = {};
            if (accessToken != null) {
                _queryParams.access_token = accessToken;
            }
            if (contextGenerationId != null) {
                _queryParams.context_generation_id = contextGenerationId;
            }
            if (formatType != null) {
                _queryParams.format_type = serializers.tts.AudioFormatType.jsonOrThrow(formatType, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                });
            }
            if (includeTimestampTypes != null) {
                if (Array.isArray(includeTimestampTypes)) {
                    _queryParams.include_timestamp_types = includeTimestampTypes.map((item)=>serializers.tts.TimestampType.jsonOrThrow(item, {
                            unrecognizedObjectKeys: "strip",
                            omitUndefined: true
                        }));
                } else {
                    _queryParams.include_timestamp_types = serializers.tts.TimestampType.jsonOrThrow(includeTimestampTypes, {
                        unrecognizedObjectKeys: "strip",
                        omitUndefined: true
                    });
                }
            }
            if (instantMode != null) {
                _queryParams.instant_mode = instantMode.toString();
            }
            if (noBinary != null) {
                _queryParams.no_binary = noBinary.toString();
            }
            if (stripHeaders != null) {
                _queryParams.strip_headers = stripHeaders.toString();
            }
            if (version != null) {
                _queryParams.version = serializers.tts.OctaveVersion.jsonOrThrow(version, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                });
            }
            if (apiKey != null) {
                _queryParams.api_key = apiKey;
            }
            const _headers = (0, headers_js_1.mergeHeaders)((0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), headers);
            const socket = new core.ReconnectingWebSocket({
                url: core.url.join((_a = yield core.Supplier.get(this._options.baseUrl)) !== null && _a !== void 0 ? _a : ((_b = yield core.Supplier.get(this._options.environment)) !== null && _b !== void 0 ? _b : environments.HumeEnvironment.Prod).tts, "/stream/input"),
                protocols: [],
                queryParameters: _queryParams,
                headers: _headers,
                options: {
                    debug: debug !== null && debug !== void 0 ? debug : false,
                    maxRetries: reconnectAttempts !== null && reconnectAttempts !== void 0 ? reconnectAttempts : 30
                }
            });
            return new Socket_js_1.StreamInputSocket({
                socket
            });
        });
    }
    _getCustomAuthorizationHeaders() {
        return __awaiter(this, void 0, void 0, function*() {
            var _a;
            const apiKeyValue = core.Supplier.get(this._options.apiKey);
            // This `authHeaderValue` is manually added as if you don't provide it it will
            // be omitted from the headers which means it won't reach the logic in ws.ts that
            // extracts values from the headers and adds them to query parameters.
            const authHeaderValue = core.Supplier.get((_a = this._options.headers) === null || _a === void 0 ? void 0 : _a.authorization);
            return {
                "X-Hume-Api-Key": apiKeyValue,
                Authorization: authHeaderValue
            };
        });
    }
}
exports.StreamInputClient = StreamInputClient;
}),
"[project]/dist/cjs/api/resources/tts/resources/voices/client/Client.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Voices = void 0;
const headers_js_1 = __turbopack_context__.r("[project]/dist/cjs/core/headers.js [app-route] (ecmascript)");
const core = __importStar(__turbopack_context__.r("[project]/dist/cjs/core/index.js [app-route] (ecmascript)"));
const environments = __importStar(__turbopack_context__.r("[project]/dist/cjs/environments.js [app-route] (ecmascript)"));
const errors = __importStar(__turbopack_context__.r("[project]/dist/cjs/errors/index.js [app-route] (ecmascript)"));
const serializers = __importStar(__turbopack_context__.r("[project]/dist/cjs/serialization/index.js [app-route] (ecmascript)"));
const Hume = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/index.js [app-route] (ecmascript)"));
class Voices {
    constructor(_options = {}){
        this._options = _options;
    }
    /**
     * Lists voices you have saved in your account, or voices from the [Voice Library](https://platform.hume.ai/tts/voice-library).
     *
     * @param {Hume.tts.VoicesListRequest} request
     * @param {Voices.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.tts.BadRequestError}
     *
     * @example
     *     await client.tts.voices.list({
     *         provider: "CUSTOM_VOICE"
     *     })
     */ list(request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            const list = core.HttpResponsePromise.interceptFunction((request)=>__awaiter(this, void 0, void 0, function*() {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                    const { provider, pageNumber, pageSize, ascendingOrder, filterTag } = request;
                    const _queryParams = {};
                    _queryParams.provider = serializers.tts.VoiceProvider.jsonOrThrow(provider, {
                        unrecognizedObjectKeys: "strip",
                        omitUndefined: true
                    });
                    if (pageNumber != null) {
                        _queryParams.page_number = pageNumber.toString();
                    }
                    if (pageSize != null) {
                        _queryParams.page_size = pageSize.toString();
                    }
                    if (ascendingOrder != null) {
                        _queryParams.ascending_order = ascendingOrder.toString();
                    }
                    if (filterTag != null) {
                        if (Array.isArray(filterTag)) {
                            _queryParams.filter_tag = filterTag.map((item)=>item);
                        } else {
                            _queryParams.filter_tag = filterTag;
                        }
                    }
                    const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
                    const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                        url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, "v0/tts/voices"),
                        method: "GET",
                        headers: _headers,
                        queryParameters: Object.assign(Object.assign({}, _queryParams), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams),
                        timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                        maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                        fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                        logging: this._options.logging
                    });
                    if (_response.ok) {
                        return {
                            data: serializers.tts.ReturnPagedVoices.parseOrThrow(_response.body, {
                                unrecognizedObjectKeys: "passthrough",
                                allowUnrecognizedUnionMembers: true,
                                allowUnrecognizedEnumValues: true,
                                skipValidation: true,
                                breadcrumbsPrefix: [
                                    "response"
                                ]
                            }),
                            rawResponse: _response.rawResponse
                        };
                    }
                    if (_response.error.reason === "status-code") {
                        switch(_response.error.statusCode){
                            case 400:
                                throw new Hume.tts.BadRequestError(serializers.tts.ErrorResponse.parseOrThrow(_response.error.body, {
                                    unrecognizedObjectKeys: "passthrough",
                                    allowUnrecognizedUnionMembers: true,
                                    allowUnrecognizedEnumValues: true,
                                    skipValidation: true,
                                    breadcrumbsPrefix: [
                                        "response"
                                    ]
                                }), _response.rawResponse);
                            default:
                                throw new errors.HumeError({
                                    statusCode: _response.error.statusCode,
                                    body: _response.error.body,
                                    rawResponse: _response.rawResponse
                                });
                        }
                    }
                    switch(_response.error.reason){
                        case "non-json":
                            throw new errors.HumeError({
                                statusCode: _response.error.statusCode,
                                body: _response.error.rawBody,
                                rawResponse: _response.rawResponse
                            });
                        case "timeout":
                            throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/tts/voices.");
                        case "unknown":
                            throw new errors.HumeError({
                                message: _response.error.errorMessage,
                                rawResponse: _response.rawResponse
                            });
                    }
                }));
            let _offset = (request === null || request === void 0 ? void 0 : request.pageNumber) != null ? request === null || request === void 0 ? void 0 : request.pageNumber : 0;
            const dataWithRawResponse = yield list(request).withRawResponse();
            return new core.Page({
                response: dataWithRawResponse.data,
                rawResponse: dataWithRawResponse.rawResponse,
                hasNextPage: (response)=>{
                    var _a;
                    return ((_a = response === null || response === void 0 ? void 0 : response.voicesPage) !== null && _a !== void 0 ? _a : []).length > 0;
                },
                getItems: (response)=>{
                    var _a;
                    return (_a = response === null || response === void 0 ? void 0 : response.voicesPage) !== null && _a !== void 0 ? _a : [];
                },
                loadPage: (_response)=>{
                    _offset += 1;
                    return list(core.setObjectProperty(request, "pageNumber", _offset));
                }
            });
        });
    }
    /**
     * Saves a new custom voice to your account using the specified TTS generation ID.
     *
     * Once saved, this voice can be reused in subsequent TTS requests, ensuring consistent speech style and prosody. For more details on voice creation, see the [Voices Guide](/docs/text-to-speech-tts/voices).
     *
     * @param {Hume.tts.PostedVoice} request
     * @param {Voices.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.tts.UnprocessableEntityError}
     *
     * @example
     *     await client.tts.voices.create({
     *         generationId: "795c949a-1510-4a80-9646-7d0863b023ab",
     *         name: "David Hume"
     *     })
     */ create(request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__create(request, requestOptions));
    }
    __create(request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, "v0/tts/voices"),
                method: "POST",
                headers: _headers,
                contentType: "application/json",
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "json",
                body: serializers.tts.PostedVoice.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                }),
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.tts.ReturnVoice.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 422:
                        throw new Hume.tts.UnprocessableEntityError(serializers.tts.HttpValidationError.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling POST /v0/tts/voices.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Deletes a previously generated custom voice.
     *
     * @param {Hume.tts.VoicesDeleteRequest} request
     * @param {Voices.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.tts.BadRequestError}
     *
     * @example
     *     await client.tts.voices.delete({
     *         name: "David Hume"
     *     })
     */ delete(request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__delete(request, requestOptions));
    }
    __delete(request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const { name } = request;
            const _queryParams = {};
            _queryParams.name = name;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, "v0/tts/voices"),
                method: "DELETE",
                headers: _headers,
                queryParameters: Object.assign(Object.assign({}, _queryParams), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams),
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: undefined,
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 400:
                        throw new Hume.tts.BadRequestError(serializers.tts.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling DELETE /v0/tts/voices.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    _getCustomAuthorizationHeaders() {
        return __awaiter(this, void 0, void 0, function*() {
            const apiKeyValue = yield core.Supplier.get(this._options.apiKey);
            return {
                "X-Hume-Api-Key": apiKeyValue
            };
        });
    }
}
exports.Voices = Voices;
}),
"[project]/dist/cjs/api/resources/tts/client/Client.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file was auto-generated by Fern from our API Definition.
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tts = void 0;
const headers_js_1 = __turbopack_context__.r("[project]/dist/cjs/core/headers.js [app-route] (ecmascript)");
const core = __importStar(__turbopack_context__.r("[project]/dist/cjs/core/index.js [app-route] (ecmascript)"));
const json_js_1 = __turbopack_context__.r("[project]/dist/cjs/core/json.js [app-route] (ecmascript)");
const environments = __importStar(__turbopack_context__.r("[project]/dist/cjs/environments.js [app-route] (ecmascript)"));
const errors = __importStar(__turbopack_context__.r("[project]/dist/cjs/errors/index.js [app-route] (ecmascript)"));
const serializers = __importStar(__turbopack_context__.r("[project]/dist/cjs/serialization/index.js [app-route] (ecmascript)"));
const Hume = __importStar(__turbopack_context__.r("[project]/dist/cjs/api/index.js [app-route] (ecmascript)"));
const Client_js_1 = __turbopack_context__.r("[project]/dist/cjs/api/resources/tts/resources/streamInput/client/Client.js [app-route] (ecmascript)");
const Client_js_2 = __turbopack_context__.r("[project]/dist/cjs/api/resources/tts/resources/voices/client/Client.js [app-route] (ecmascript)");
class Tts {
    constructor(_options = {}){
        this._options = _options;
    }
    get voices() {
        var _a;
        return (_a = this._voices) !== null && _a !== void 0 ? _a : this._voices = new Client_js_2.Voices(this._options);
    }
    get streamInput() {
        var _a;
        return (_a = this._streamInput) !== null && _a !== void 0 ? _a : this._streamInput = new Client_js_1.StreamInputClient(this._options);
    }
    /**
     * Synthesizes one or more input texts into speech using the specified voice. If no voice is provided, a novel voice will be generated dynamically. Optionally, additional context can be included to influence the speech's style and prosody.
     *
     * The response includes the base64-encoded audio and metadata in JSON format.
     *
     * @param {Hume.tts.PostedTts} request
     * @param {Tts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.tts.UnprocessableEntityError}
     *
     * @example
     *     await client.tts.synthesizeJson({
     *         context: {
     *             utterances: [{
     *                     text: "How can people see beauty so differently?",
     *                     description: "A curious student with a clear and respectful tone, seeking clarification on Hume's ideas with a straightforward question."
     *                 }]
     *         },
     *         format: {
     *             type: "mp3"
     *         },
     *         numGenerations: 1,
     *         utterances: [{
     *                 text: "Beauty is no quality in things themselves: It exists merely in the mind which contemplates them.",
     *                 description: "Middle-aged masculine voice with a clear, rhythmic Scots lilt, rounded vowels, and a warm, steady tone with an articulate, academic quality."
     *             }]
     *     })
     */ synthesizeJson(request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__synthesizeJson(request, requestOptions));
    }
    __synthesizeJson(request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, "v0/tts"),
                method: "POST",
                headers: _headers,
                contentType: "application/json",
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "json",
                body: serializers.tts.PostedTts.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                }),
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: serializers.tts.ReturnTts.parseOrThrow(_response.body, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: [
                            "response"
                        ]
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 422:
                        throw new Hume.tts.UnprocessableEntityError(serializers.tts.HttpValidationError.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling POST /v0/tts.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Synthesizes one or more input texts into speech using the specified voice. If no voice is provided, a novel voice will be generated dynamically. Optionally, additional context can be included to influence the speech's style and prosody.
     *
     * The response contains the generated audio file in the requested format.
     * @throws {@link Hume.tts.UnprocessableEntityError}
     */ synthesizeFile(request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__synthesizeFile(request, requestOptions));
    }
    __synthesizeFile(request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, "v0/tts/file"),
                method: "POST",
                headers: _headers,
                contentType: "application/json",
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "json",
                body: serializers.tts.PostedTts.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                }),
                responseType: "binary-response",
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: _response.body,
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 422:
                        throw new Hume.tts.UnprocessableEntityError(serializers.tts.HttpValidationError.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling POST /v0/tts/file.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Streams synthesized speech using the specified voice. If no voice is provided, a novel voice will be generated dynamically. Optionally, additional context can be included to influence the speech's style and prosody.
     * @throws {@link Hume.tts.UnprocessableEntityError}
     */ synthesizeFileStreaming(request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__synthesizeFileStreaming(request, requestOptions));
    }
    __synthesizeFileStreaming(request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, "v0/tts/stream/file"),
                method: "POST",
                headers: _headers,
                contentType: "application/json",
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "json",
                body: serializers.tts.PostedTts.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                }),
                responseType: "binary-response",
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: _response.body,
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 422:
                        throw new Hume.tts.UnprocessableEntityError(serializers.tts.HttpValidationError.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling POST /v0/tts/stream/file.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * Streams synthesized speech using the specified voice. If no voice is provided, a novel voice will be generated dynamically. Optionally, additional context can be included to influence the speech's style and prosody.
     *
     * The response is a stream of JSON objects including audio encoded in base64.
     */ synthesizeJsonStreaming(request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__synthesizeJsonStreaming(request, requestOptions));
    }
    __synthesizeJsonStreaming(request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign({}, (yield this._getCustomAuthorizationHeaders()))), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, "v0/tts/stream/json"),
                method: "POST",
                headers: _headers,
                contentType: "application/json",
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "json",
                body: serializers.tts.PostedTts.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true
                }),
                responseType: "sse",
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: new core.Stream({
                        stream: _response.body,
                        parse: (data)=>__awaiter(this, void 0, void 0, function*() {
                                return serializers.tts.TtsOutput.parseOrThrow(data, {
                                    unrecognizedObjectKeys: "passthrough",
                                    allowUnrecognizedUnionMembers: true,
                                    allowUnrecognizedEnumValues: true,
                                    skipValidation: true,
                                    breadcrumbsPrefix: [
                                        "response"
                                    ]
                                });
                            }),
                        signal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                        eventShape: {
                            type: "json",
                            messageTerminator: "\n"
                        }
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 422:
                        throw new Hume.tts.UnprocessableEntityError(serializers.tts.HttpValidationError.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling POST /v0/tts/stream/json.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    /**
     * @throws {@link Hume.tts.UnprocessableEntityError}
     */ convertVoiceFile(request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__convertVoiceFile(request, requestOptions));
    }
    __convertVoiceFile(request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _request = yield core.newFormData();
            if (request.stripHeaders != null) {
                _request.append("strip_headers", request.stripHeaders.toString());
            }
            yield _request.appendFile("audio", request.audio);
            if (request.context != null) {
                _request.append("context", (()=>{
                    const mapped = serializers.tts.PostedContext.jsonOrThrow(request.context, {
                        unrecognizedObjectKeys: "strip",
                        omitUndefined: true
                    });
                    return typeof mapped === "string" ? mapped : (0, json_js_1.toJson)(mapped);
                })());
            }
            if (request.voice != null) {
                _request.append("voice", (()=>{
                    const mapped = serializers.tts.PostedUtteranceVoice.jsonOrThrow(request.voice, {
                        unrecognizedObjectKeys: "strip",
                        omitUndefined: true
                    });
                    return typeof mapped === "string" ? mapped : (0, json_js_1.toJson)(mapped);
                })());
            }
            if (request.format != null) {
                _request.append("format", (()=>{
                    const mapped = serializers.tts.Format.jsonOrThrow(request.format, {
                        unrecognizedObjectKeys: "strip",
                        omitUndefined: true
                    });
                    return typeof mapped === "string" ? mapped : (0, json_js_1.toJson)(mapped);
                })());
            }
            if (request.includeTimestampTypes != null) {
                for (const _item of request.includeTimestampTypes){
                    _request.append("include_timestamp_types", serializers.tts.TimestampType.jsonOrThrow(_item, {
                        unrecognizedObjectKeys: "strip",
                        omitUndefined: true
                    }));
                }
            }
            const _maybeEncodedRequest = yield _request.getRequest();
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign(Object.assign({}, (yield this._getCustomAuthorizationHeaders())), _maybeEncodedRequest.headers)), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, "v0/tts/voice_conversion/file"),
                method: "POST",
                headers: _headers,
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "file",
                duplex: _maybeEncodedRequest.duplex,
                body: _maybeEncodedRequest.body,
                responseType: "binary-response",
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: _response.body,
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 422:
                        throw new Hume.tts.UnprocessableEntityError(serializers.tts.HttpValidationError.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling POST /v0/tts/voice_conversion/file.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    convertVoiceJson(request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(this.__convertVoiceJson(request, requestOptions));
    }
    __convertVoiceJson(request, requestOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const _request = yield core.newFormData();
            if (request.stripHeaders != null) {
                _request.append("strip_headers", request.stripHeaders.toString());
            }
            if (request.audio != null) {
                yield _request.appendFile("audio", request.audio);
            }
            if (request.context != null) {
                _request.append("context", (()=>{
                    const mapped = serializers.tts.PostedContext.jsonOrThrow(request.context, {
                        unrecognizedObjectKeys: "strip",
                        omitUndefined: true
                    });
                    return typeof mapped === "string" ? mapped : (0, json_js_1.toJson)(mapped);
                })());
            }
            if (request.voice != null) {
                _request.append("voice", (()=>{
                    const mapped = serializers.tts.PostedUtteranceVoice.jsonOrThrow(request.voice, {
                        unrecognizedObjectKeys: "strip",
                        omitUndefined: true
                    });
                    return typeof mapped === "string" ? mapped : (0, json_js_1.toJson)(mapped);
                })());
            }
            if (request.format != null) {
                _request.append("format", (()=>{
                    const mapped = serializers.tts.Format.jsonOrThrow(request.format, {
                        unrecognizedObjectKeys: "strip",
                        omitUndefined: true
                    });
                    return typeof mapped === "string" ? mapped : (0, json_js_1.toJson)(mapped);
                })());
            }
            if (request.includeTimestampTypes != null) {
                for (const _item of request.includeTimestampTypes){
                    _request.append("include_timestamp_types", serializers.tts.TimestampType.jsonOrThrow(_item, {
                        unrecognizedObjectKeys: "strip",
                        omitUndefined: true
                    }));
                }
            }
            const _maybeEncodedRequest = yield _request.getRequest();
            const _headers = (0, headers_js_1.mergeHeaders)((_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, (0, headers_js_1.mergeOnlyDefinedHeaders)(Object.assign(Object.assign({}, (yield this._getCustomAuthorizationHeaders())), _maybeEncodedRequest.headers)), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
            const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : core.fetcher)({
                url: core.url.join((_c = yield core.Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : ((_d = yield core.Supplier.get(this._options.environment)) !== null && _d !== void 0 ? _d : environments.HumeEnvironment.Prod).base, "v0/tts/voice_conversion/json"),
                method: "POST",
                headers: _headers,
                queryParameters: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams,
                requestType: "file",
                duplex: _maybeEncodedRequest.duplex,
                body: _maybeEncodedRequest.body,
                responseType: "sse",
                timeoutMs: ((_g = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _e !== void 0 ? _e : (_f = this._options) === null || _f === void 0 ? void 0 : _f.timeoutInSeconds) !== null && _g !== void 0 ? _g : 60) * 1000,
                maxRetries: (_h = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _h !== void 0 ? _h : (_j = this._options) === null || _j === void 0 ? void 0 : _j.maxRetries,
                abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                fetchFn: (_k = this._options) === null || _k === void 0 ? void 0 : _k.fetch,
                logging: this._options.logging
            });
            if (_response.ok) {
                return {
                    data: new core.Stream({
                        stream: _response.body,
                        parse: (data)=>__awaiter(this, void 0, void 0, function*() {
                                return serializers.tts.TtsOutput.parseOrThrow(data, {
                                    unrecognizedObjectKeys: "passthrough",
                                    allowUnrecognizedUnionMembers: true,
                                    allowUnrecognizedEnumValues: true,
                                    skipValidation: true,
                                    breadcrumbsPrefix: [
                                        "response"
                                    ]
                                });
                            }),
                        signal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
                        eventShape: {
                            type: "json",
                            messageTerminator: "\n"
                        }
                    }),
                    rawResponse: _response.rawResponse
                };
            }
            if (_response.error.reason === "status-code") {
                switch(_response.error.statusCode){
                    case 422:
                        throw new Hume.tts.UnprocessableEntityError(serializers.tts.HttpValidationError.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [
                                "response"
                            ]
                        }), _response.rawResponse);
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                            rawResponse: _response.rawResponse
                        });
                }
            }
            switch(_response.error.reason){
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                        rawResponse: _response.rawResponse
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling POST /v0/tts/voice_conversion/json.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                        rawResponse: _response.rawResponse
                    });
            }
        });
    }
    _getCustomAuthorizationHeaders() {
        return __awaiter(this, void 0, void 0, function*() {
            const apiKeyValue = yield core.Supplier.get(this._options.apiKey);
            return {
                "X-Hume-Api-Key": apiKeyValue
            };
        });
    }
}
exports.Tts = Tts;
}),
];

//# sourceMappingURL=dist_cjs_api_e0b83eb8._.js.map