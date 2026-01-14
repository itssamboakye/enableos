module.exports = [
"[project]/dist/cjs/wrapper/base64Decode.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.base64Decode = base64Decode;
function base64Decode(str) {
    if (typeof Buffer === "function") {
        // Node.js environment
        return Buffer.from(str, "base64");
    } else if (typeof atob === "function") {
        // Browser environment
        return atob(str);
    } else {
        throw new Error("Base64 encoding not supported in this environment.");
    }
}
}),
"[project]/dist/cjs/wrapper/base64Encode.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.base64Encode = base64Encode;
function base64Encode(str) {
    if (typeof Buffer === "function") {
        // Node.js environment
        return Buffer.from(str).toString("base64");
    } else if (typeof btoa === "function") {
        // Browser environment
        return btoa(str);
    } else {
        throw new Error("Base64 encoding not supported in this environment.");
    }
}
}),
"[project]/dist/cjs/wrapper/convertBase64ToBlob.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.convertBase64ToBlob = convertBase64ToBlob;
/**
 * Converts a base64-encoded string into a `Blob` object with the specified content type.
 *
 * @param {string} base64 - The base64-encoded string representing binary data.
 * @param {string} contentType - The MIME type to assign to the resulting `Blob`.
 * @returns {Blob} A `Blob` object containing the binary data from the base64 string.
 */ function convertBase64ToBlob(base64, contentType) {
    // Decode base64 string to a binary string
    const binaryString = window.atob(base64);
    // Create a Uint8Array with the same length as the binary string
    const byteArray = new Uint8Array(binaryString.length);
    // Fill the Uint8Array by converting each character's Unicode value to a byte
    for(let i = 0; i < binaryString.length; i++){
        byteArray[i] = binaryString.charCodeAt(i);
    }
    // Create and return a Blob with the specified content type
    return new Blob([
        byteArray
    ], {
        type: contentType
    });
}
}),
"[project]/dist/cjs/wrapper/convertBlobToBase64.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.convertBlobToBase64 = convertBlobToBase64;
/**
 * Converts a `Blob` object into a base64-encoded string.
 * The resulting string contains the binary data from the `Blob`.
 *
 * @param {Blob} blob - The `Blob` object to convert to base64.
 * @returns {Promise<string>} A promise that resolves to a base64-encoded string representing the `Blob` data.
 */ function convertBlobToBase64(blob) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        // Handle the load event which is triggered when readAsDataURL completes
        reader.onloadend = ()=>{
            // Ensure reader.result is not null and is a string
            if (typeof reader.result === "string") {
                // Extract the Base64 encoded string, skipping the data URL prefix (e.g., "data:image/png;base64,")
                const base64Data = reader.result.split(",")[1];
                if (base64Data) {
                    resolve(base64Data);
                } else {
                    reject(new Error("Failed to split the result into Base64 data."));
                }
            } else {
                reject(new Error("FileReader result is null or not a string."));
            }
        };
        // Handle errors during the read process
        reader.onerror = ()=>{
            var _a;
            reject(new Error(`Error reading blob: ${(_a = reader.error) === null || _a === void 0 ? void 0 : _a.message}`));
        };
        // Initiate reading the blob as a data URL
        reader.readAsDataURL(blob);
    });
}
}),
"[project]/dist/cjs/wrapper/ensureSingleValidAudioTrack.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ensureSingleValidAudioTrack = void 0;
/**
 * Ensures that the given media stream contains exactly one valid audio track.
 * Throws an error if no audio tracks are found, if there is more than one audio track,
 * or if the sole audio track is falsy.
 *
 * @param {MediaStream} stream - The media stream object containing audio tracks to validate.
 * @throws {Error} "No audio tracks" if the stream contains zero audio tracks.
 * @throws {Error} "Multiple audio tracks" if the stream contains more than one audio track.
 * @throws {Error} "No audio track" if the sole audio track is falsy.
 */ const ensureSingleValidAudioTrack = (stream)=>{
    const tracks = stream.getAudioTracks();
    if (tracks.length === 0) {
        throw new Error("No audio tracks available");
    } else if (tracks.length > 1) {
        throw new Error("Multiple audio tracks found");
    } else if (!tracks[0]) {
        throw new Error("The audio track is invalid");
    }
};
exports.ensureSingleValidAudioTrack = ensureSingleValidAudioTrack;
}),
"[project]/dist/cjs/wrapper/checkForAudioTracks.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkForAudioTracks = void 0;
/**
 * @name checkForAudioTracks
 * @description
 * Check if a MediaStream has audio tracks.
 * @param stream
 * The MediaStream to check
 */ const checkForAudioTracks = (stream)=>{
    const tracks = stream.getAudioTracks();
    if (tracks.length === 0) {
        throw new Error("No audio tracks");
    }
    if (tracks.length > 1) {
        throw new Error("Multiple audio tracks");
    }
    const track = tracks[0];
    if (!track) {
        throw new Error("No audio track");
    }
};
exports.checkForAudioTracks = checkForAudioTracks;
}),
"[project]/dist/cjs/wrapper/fetchAccessToken.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

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
exports.fetchAccessToken = void 0;
const base64Encode_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/base64Encode.js [app-route] (ecmascript)");
const zod_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/index.cjs [app-route] (ecmascript)");
/**
 * Fetches a new access token from the Hume API using the provided API key and Secret key.
 *
 * @param args - The arguments for the request.
 * @example
 * ```typescript
 * async function getToken() {
 *   const accessToken = await fetchAccessToken({
 *     apiKey: 'test',
 *     secretKey: 'test',
 *   });
 *
 *   console.log(accessToken); // Outputs the access token
 * }
 * ```
 */ const fetchAccessToken = (_a)=>__awaiter(void 0, [
        _a
    ], void 0, function*({ apiKey, secretKey, host = "api.hume.ai" }) {
        const authString = `${apiKey}:${secretKey}`;
        const encoded = (0, base64Encode_js_1.base64Encode)(authString);
        const res = yield fetch(`https://${host}/oauth2-cc/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${encoded}`
            },
            body: new URLSearchParams({
                grant_type: "client_credentials"
            }).toString()
        });
        return zod_1.z.object({
            access_token: zod_1.z.string()
        }).transform((data)=>{
            return data.access_token;
        }).parse((yield res.json()));
    });
exports.fetchAccessToken = fetchAccessToken;
}),
"[project]/dist/cjs/wrapper/getAudioStream.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

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
exports.getAudioStream = void 0;
/**
 * Requests an audio stream from the user's device using the `getUserMedia` API.
 * The stream will have echo cancellation, noise suppression, and auto gain control enabled.
 *
 * @returns {Promise<MediaStream>} A promise that resolves to a `MediaStream` containing audio data only.
 * @throws {DOMException} If the user denies access or no audio input devices are found.
 */ const getAudioStream = (...args_1)=>__awaiter(void 0, [
        ...args_1
    ], void 0, function*(audioStreamOptions = {}) {
        const { echoCancellation = true, noiseSuppression = true, autoGainControl = true } = audioStreamOptions;
        return navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation,
                noiseSuppression,
                autoGainControl
            },
            video: false
        });
    });
exports.getAudioStream = getAudioStream;
}),
"[project]/dist/cjs/wrapper/getBrowserSupportedMimeType.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MimeType = void 0;
exports.getBrowserSupportedMimeType = getBrowserSupportedMimeType;
/**
 * Enum representing the supported MIME types for audio recording.
 */ var MimeType;
(function(MimeType) {
    MimeType["WEBM"] = "audio/webm";
    MimeType["MP4"] = "audio/mp4";
    MimeType["WAV"] = "audio/wav";
})(MimeType || (exports.MimeType = MimeType = {}));
/**
 * Checks whether the `MediaRecorder` API is supported in the current environment.
 *
 * @returns {boolean} Returns `true` if the `MediaRecorder` API is supported, otherwise `false`.
 */ function isMediaRecorderSupported() {
    return typeof MediaRecorder !== "undefined";
}
/**
 * Finds and returns the first MIME type from the given array that is supported by the `MediaRecorder`.
 *
 * @param {MimeType[]} mimeTypes - An array of MIME types to check for compatibility.
 * @returns {MimeType | null} The first supported MIME type or `null` if none are supported.
 */ function getSupportedMimeType(mimeTypes) {
    return mimeTypes.find((type)=>MediaRecorder.isTypeSupported(type)) || null;
}
/**
 * Determines if the current browser supports any of the predefined audio MIME types
 * (WEBM, MP4, or WAV) via the `MediaRecorder` API.
 *
 * @returns {MimeTypeResult} An object containing the success status and either a supported MIME type or an error.
 * @throws {Error} If the `MediaRecorder` API is not supported by the browser or no compatible types are found.
 */ function getBrowserSupportedMimeType() {
    // Check if the MediaRecorder API is supported in the current environment.
    if (!isMediaRecorderSupported()) {
        return {
            success: false,
            error: new Error("MediaRecorder is not supported")
        };
    }
    const COMPATIBLE_MIME_TYPES = [
        MimeType.WEBM,
        MimeType.MP4,
        MimeType.WAV
    ];
    // Find the first compatible MIME type that the browser's MediaRecorder supports.
    const supportedMimeType = getSupportedMimeType(COMPATIBLE_MIME_TYPES);
    // If no compatible MIME type is found, return a failure result with an appropriate error message.
    if (!supportedMimeType) {
        return {
            success: false,
            error: new Error("Browser does not support any compatible mime types")
        };
    }
    // If a compatible MIME type is found, return a success result with the supported MIME type.
    return {
        success: true,
        mimeType: supportedMimeType
    };
}
}),
"[project]/dist/cjs/wrapper/expressionMeasurement/batch/Job.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
exports.Job = void 0;
const errors = __importStar(__turbopack_context__.r("[project]/dist/cjs/errors/index.js [app-route] (ecmascript)"));
class Job {
    constructor(jobId, client){
        this.jobId = jobId;
        this.client = client;
    }
    awaitCompletion() {
        return __awaiter(this, arguments, void 0, function*(timeoutInSeconds = 300) {
            return new Promise((resolve, reject)=>{
                const poller = new JobCompletionPoller(this.jobId, this.client);
                poller.start(resolve);
                setTimeout(()=>{
                    poller.stop();
                    reject(new errors.HumeTimeoutError("Timeout exceeded when polling for job completion"));
                }, timeoutInSeconds * 1000);
            });
        });
    }
}
exports.Job = Job;
class JobCompletionPoller {
    constructor(jobId, client){
        this.jobId = jobId;
        this.client = client;
        this.isPolling = true;
    }
    start(onTerminal) {
        this.isPolling = true;
        this.poll(onTerminal);
    }
    stop() {
        this.isPolling = false;
    }
    poll(onTerminal) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const jobDetails = yield this.client.getJobDetails(this.jobId);
                if (jobDetails.state.status === "COMPLETED" || jobDetails.state.status === "FAILED") {
                    onTerminal();
                    this.stop();
                }
            } catch (_a) {
            // swallow errors while polling
            }
            if (this.isPolling) {
                setTimeout(()=>this.poll(onTerminal), 1000);
            }
        });
    }
}
}),
"[project]/dist/cjs/wrapper/expressionMeasurement/batch/BatchClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
exports.BatchClient = void 0;
const Client_js_1 = __turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/resources/batch/client/Client.js [app-route] (ecmascript)");
const Job_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/expressionMeasurement/batch/Job.js [app-route] (ecmascript)");
const core = __importStar(__turbopack_context__.r("[project]/dist/cjs/core/index.js [app-route] (ecmascript)"));
class BatchClient extends Client_js_1.Batch {
    // This just wraps the return value of the base class's `startInferenceJob` and `startInferenceJobFromLocalFile` methods
    // and returns a `Job` instance (has helper functions to await the job's result) instead of a raw job ID.
    startInferenceJob(request = {}, requestOptions) {
        return core.HttpResponsePromise.fromPromise(super.startInferenceJob(request, requestOptions).withRawResponse().then((result)=>{
            return {
                data: new Job_js_1.Job(result.data.jobId, this),
                rawResponse: result.rawResponse
            };
        }));
    }
    startInferenceJobFromLocalFile(request, requestOptions) {
        return core.HttpResponsePromise.fromPromise(super.startInferenceJobFromLocalFile(request, requestOptions).withRawResponse().then((result)=>{
            return {
                data: new Job_js_1.Job(result.data.jobId, this),
                rawResponse: result.rawResponse
            };
        }));
    }
}
exports.BatchClient = BatchClient;
}),
"[project]/dist/cjs/wrapper/expressionMeasurement/streaming/StreamSocket.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
var __asyncValues = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__asyncValues || function(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    //TURBOPACK unreachable
    ;
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
};
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StreamSocket = void 0;
const ws_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/ws@8.18.3/node_modules/ws/index.js [app-route] (ecmascript)"));
const uuid_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-node/index.js [app-route] (ecmascript)");
const StreamingClient_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/expressionMeasurement/streaming/StreamingClient.js [app-route] (ecmascript)");
const base64Encode_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/base64Encode.js [app-route] (ecmascript)");
const errors = __importStar(__turbopack_context__.r("[project]/dist/cjs/errors/index.js [app-route] (ecmascript)"));
const serializers = __importStar(__turbopack_context__.r("[project]/dist/cjs/serialization/index.js [app-route] (ecmascript)"));
const fs = __importStar(__turbopack_context__.r("[externals]/fs [external] (fs, cjs)"));
class StreamSocket {
    constructor({ websocket, config, streamWindowMs }){
        this.websocket = websocket;
        this.config = config;
        this.streamWindowMs = streamWindowMs;
    }
    /**
     * Send file on the `StreamSocket`
     *
     * @param file A fs.ReadStream | File | Blob
     * @param config This method is intended for use with a `LanguageConfig`.
     * When the socket is configured for other modalities this method will fail.
     */ sendFile(_a) {
        return __awaiter(this, arguments, void 0, function*({ file, config }) {
            var _b, file_1, file_1_1;
            var _c, e_1, _d, _e;
            if (config != null) {
                this.config = config;
            }
            let contents = "";
            if (file instanceof fs.ReadStream) {
                const chunks = [];
                try {
                    for(_b = true, file_1 = __asyncValues(file); file_1_1 = yield file_1.next(), _c = file_1_1.done, !_c; _b = true){
                        _e = file_1_1.value;
                        _b = false;
                        const chunk = _e;
                        chunks.push(Buffer.from(chunk));
                    }
                } catch (e_1_1) {
                    e_1 = {
                        error: e_1_1
                    };
                } finally{
                    try {
                        if (!_b && !_c && (_d = file_1.return)) yield _d.call(file_1);
                    } finally{
                        if (e_1) throw e_1.error;
                    }
                }
                contents = Buffer.concat(chunks).toString("base64");
            } else if (file instanceof Blob) {
                const toBase64 = (file)=>new Promise((res)=>{
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = ()=>res(reader.result);
                    });
                contents = yield toBase64(file);
            } else {
                throw new errors.HumeError({
                    message: `file must be one of ReadStream or Blob.`
                });
            }
            const request = {
                payloadId: (0, uuid_1.v4)(),
                data: contents,
                models: this.config,
                rawText: false
            };
            if (this.streamWindowMs != null) {
                request.streamWindowMs = this.streamWindowMs;
            }
            const response = yield this.send(request);
            if (response == null) {
                throw new errors.HumeError({
                    message: `Received no response after sending file: ${file}`
                });
            }
            return response;
        });
    }
    /**
     * Send text on the `StreamSocket`
     *
     * @param text Text to send to the language model.
     * @param config This method is intended for use with a `LanguageConfig`.
     * When the socket is configured for other modalities this method will fail.
     */ sendText(_a) {
        return __awaiter(this, arguments, void 0, function*({ text, config }) {
            if (config != null) {
                this.config = config;
            }
            const request = {
                payloadId: (0, uuid_1.v4)(),
                data: text,
                rawText: true,
                models: this.config
            };
            if (this.streamWindowMs != null) {
                request.streamWindowMs = this.streamWindowMs;
            }
            const response = yield this.send(request);
            if (response == null) {
                throw new errors.HumeError({
                    message: `Received no response after sending text: ${text}`
                });
            }
            return response;
        });
    }
    /**
     * Send facemesh landmarks on the `StreamSocket`
     *
     * @param landmarks List of landmark points for multiple faces.
     * The shape of this 3-dimensional list should be (n, 478, 3) where n is the number
     * of faces to be processed, 478 is the number of MediaPipe landmarks per face and 3
     * represents the (x, y, z) coordinates of each landmark.
     * @param config List of model configurations.
     * If set these configurations will overwrite existing configurations
     */ sendFacemesh(_a) {
        return __awaiter(this, arguments, void 0, function*({ landmarks, config }) {
            const response = this.sendText({
                text: (0, base64Encode_js_1.base64Encode)(JSON.stringify(landmarks)),
                config
            });
            return response;
        });
    }
    /**
     *
     * Reset the streaming sliding window.
     *
     * Call this method when some media has been fully processed and you want to continue using the same
     * streaming connection without leaking context across media samples.
     */ reset() {
        return __awaiter(this, void 0, void 0, function*() {
            yield this.send({
                resetStream: true
            });
        });
    }
    /**
     *
     * Get details associated with the current streaming connection.
     *
     */ getJobDetails() {
        return __awaiter(this, void 0, void 0, function*() {
            yield this.send({
                jobDetails: true
            });
        });
    }
    /**
     * Closes the underlying socket.
     */ close() {
        this.websocket.close();
    }
    send(payload) {
        return __awaiter(this, void 0, void 0, function*() {
            yield this.tillSocketOpen();
            const jsonPayload = serializers.expressionMeasurement.stream.StreamModelsEndpointPayload.jsonOrThrow(payload, {
                unrecognizedObjectKeys: "strip"
            });
            this.websocket.send(JSON.stringify(jsonPayload));
            const response = yield new Promise((resolve)=>{
                this.websocket.addEventListener("message", (event)=>{
                    const response = (0, StreamingClient_js_1.parse)(event.data);
                    resolve(response);
                });
            });
            if (response != null && isError(response)) {
                throw new errors.HumeError({
                    message: `CODE ${response.code}: ${response.error}`
                });
            }
            return response;
        });
    }
    tillSocketOpen() {
        return __awaiter(this, void 0, void 0, function*() {
            if (this.websocket.readyState === ws_1.default.OPEN) {
                return this.websocket;
            }
            return new Promise((resolve, reject)=>{
                this.websocket.addEventListener("open", ()=>{
                    resolve(this.websocket);
                });
                this.websocket.addEventListener("error", (event)=>{
                    reject(event);
                });
            });
        });
    }
}
exports.StreamSocket = StreamSocket;
function isError(response) {
    return response.error != null;
}
}),
"[project]/dist/cjs/wrapper/expressionMeasurement/streaming/StreamingClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StreamClient = void 0;
exports.parse = parse;
const serializers = __importStar(__turbopack_context__.r("[project]/dist/cjs/serialization/index.js [app-route] (ecmascript)"));
const StreamSocket_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/expressionMeasurement/streaming/StreamSocket.js [app-route] (ecmascript)");
const ws_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/ws@8.18.3/node_modules/ws/index.js [app-route] (ecmascript)"));
class StreamClient {
    constructor(_options){
        this._options = _options;
    }
    connect(args) {
        const websocket = new ws_1.default(`wss://api.hume.ai/v0/stream/models`, {
            headers: {
                "X-Hume-Api-Key": typeof this._options.apiKey === "string" ? this._options.apiKey : ""
            },
            timeout: 10
        });
        websocket.addEventListener("open", (event)=>{
            var _a;
            (_a = args.onOpen) === null || _a === void 0 ? void 0 : _a.call(args, event);
        });
        websocket.addEventListener("error", (e)=>{
            var _a;
            (_a = args.onError) === null || _a === void 0 ? void 0 : _a.call(args, {
                code: e.type,
                error: e.message
            });
        });
        websocket.addEventListener("message", (_a)=>__awaiter(this, [
                _a
            ], void 0, function*({ data }) {
                parse(data, {
                    onMessage: args.onMessage,
                    onError: args.onError
                });
            }));
        websocket.addEventListener("close", (event)=>{
            var _a;
            (_a = args.onClose) === null || _a === void 0 ? void 0 : _a.call(args, event);
        });
        return new StreamSocket_js_1.StreamSocket({
            websocket,
            streamWindowMs: args.streamWindowMs,
            config: args.config
        });
    }
}
exports.StreamClient = StreamClient;
function parse(data, args = {}) {
    var _a, _b;
    const message = JSON.parse(data);
    const parsedResponse = serializers.expressionMeasurement.stream.Config.parse(message, {
        unrecognizedObjectKeys: "passthrough",
        allowUnrecognizedUnionMembers: true,
        allowUnrecognizedEnumValues: true,
        breadcrumbsPrefix: [
            "response"
        ]
    });
    if (parsedResponse.ok) {
        (_a = args.onMessage) === null || _a === void 0 ? void 0 : _a.call(args, parsedResponse.value);
        return parsedResponse.value;
    }
    const parsedError = serializers.expressionMeasurement.stream.StreamErrorMessage.parse(message, {
        unrecognizedObjectKeys: "passthrough",
        allowUnrecognizedUnionMembers: true,
        allowUnrecognizedEnumValues: true,
        breadcrumbsPrefix: [
            "response"
        ]
    });
    if (parsedError.ok) {
        (_b = args.onError) === null || _b === void 0 ? void 0 : _b.call(args, parsedError.value);
        return parsedError.value;
    }
}
}),
"[project]/dist/cjs/wrapper/expressionMeasurement/ExpressionMeasurementClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExpressionMeasurement = void 0;
const Client_js_1 = __turbopack_context__.r("[project]/dist/cjs/api/resources/expressionMeasurement/client/Client.js [app-route] (ecmascript)");
const BatchClient_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/expressionMeasurement/batch/BatchClient.js [app-route] (ecmascript)");
const StreamingClient_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/expressionMeasurement/streaming/StreamingClient.js [app-route] (ecmascript)");
class ExpressionMeasurement extends Client_js_1.ExpressionMeasurement {
    // BatchClient here is overridden from the generated version, we wrap expression measurement jobs in
    // a helper that makes it easier to await the result of a job.
    get batch() {
        var _a;
        return (_a = this._batch) !== null && _a !== void 0 ? _a : this._batch = new BatchClient_js_1.BatchClient(this._options);
    }
    get stream() {
        var _a;
        return (_a = this._stream) !== null && _a !== void 0 ? _a : this._stream = new StreamingClient_js_1.StreamClient(this._options);
    }
}
exports.ExpressionMeasurement = ExpressionMeasurement;
}),
"[project]/dist/cjs/wrapper/HumeClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
var __rest = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HumeClient = void 0;
const Client_js_1 = __turbopack_context__.r("[project]/dist/cjs/Client.js [app-route] (ecmascript)");
const core = __importStar(__turbopack_context__.r("[project]/dist/cjs/core/index.js [app-route] (ecmascript)"));
const ExpressionMeasurementClient_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/expressionMeasurement/ExpressionMeasurementClient.js [app-route] (ecmascript)");
const version_js_1 = __turbopack_context__.r("[project]/dist/cjs/version.js [app-route] (ecmascript)");
class HumeClient extends Client_js_1.HumeClient {
    constructor(_options){
        var _a;
        let options;
        let oldEnvironment;
        _a = _options || {}, ({ environment: oldEnvironment } = _a), options = __rest(_a, [
            "environment"
        ]);
        // Check if both accessToken and Authorization header are provided (case-insensitive)
        if (_options.accessToken && _options.headers) {
            const hasAuthHeader = Object.keys(_options.headers).some((key)=>key.toLowerCase() === "authorization");
            if (hasAuthHeader) {
                throw new Error("Cannot provide both 'accessToken' and 'headers.Authorization'. Please use only one.");
            }
        }
        if (_options.accessToken) {
            options.headers = Object.assign(Object.assign({}, options.headers), {
                Authorization: core.Supplier.map(_options.accessToken, (token)=>`Bearer ${token}`)
            });
        }
        // Add telemetry headers
        options.headers = Object.assign(Object.assign({}, options.headers), {
            "X-Hume-Client-Name": "typescript_sdk",
            "X-Hume-Client-Version": version_js_1.SDK_VERSION
        });
        // Allow setting a single url http://... or https://... for environment'
        if (oldEnvironment) {
            const environment = _options.environment ? core.Supplier.map(_options.environment, (e)=>{
                if (typeof e === "string") {
                    if (e.startsWith("http://")) {
                        return {
                            base: e,
                            evi: e.replace("http://", "ws://") + "/v0/evi",
                            tts: e.replace("http://", "ws://") + "/v0/tts",
                            stream: e.replace("http://", "ws://") + "/v0/stream"
                        };
                    }
                    if (e.startsWith("https://")) {
                        return {
                            base: e,
                            evi: e.replace("https://", "wss://") + "/v0/evi",
                            tts: e.replace("https://", "wss://") + "/v0/tts",
                            stream: e.replace("https://", "wss://") + "/v0/stream"
                        };
                    }
                    return {
                        base: "https://" + e,
                        evi: "wss://" + e + "/v0/evi",
                        tts: "wss://" + e + "/v0/tts",
                        stream: "wss://" + e + "/v0/stream"
                    };
                } else {
                    return e;
                }
            }) : undefined;
            options.environment = environment;
        }
        super(options);
    }
    get expressionMeasurement() {
        var _a;
        return (_a = this._expressionMeasurement) !== null && _a !== void 0 ? _a : this._expressionMeasurement = new ExpressionMeasurementClient_js_1.ExpressionMeasurement(this._options);
    }
}
exports.HumeClient = HumeClient;
}),
"[project]/dist/cjs/wrapper/convertFrequencyScale.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.convertLinearFrequenciesToBark = convertLinearFrequenciesToBark;
// This function converts linear-scaled frequency decibels from an AnalyserNode's frequncy data to Bark scale [https://en.wikipedia.org/wiki/Bark_scale]
// This implementation uses a simple approach of mapping indices in the linear-scaled array to the closest
// Bark scale center frequency and is not intended to be an accurate representation, but rather "close-enough" for visualization purposes
const barkCenterFrequencies = [
    50,
    150,
    250,
    350,
    450,
    570,
    700,
    840,
    1000,
    1170,
    1370,
    1600,
    1850,
    2150,
    2500,
    2900,
    3400,
    4000,
    4800,
    5800,
    7000,
    8500,
    10500,
    13500
]; // Center frequency value in Hz
// Min/max values from https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData
const minValue = 0;
const maxValue = 255;
function convertLinearFrequenciesToBark(linearData, sampleRate) {
    const maxFrequency = sampleRate / 2;
    const frequencyResolution = maxFrequency / linearData.length;
    const barkFrequencies = barkCenterFrequencies.map((barkFreq)=>{
        var _a;
        const linearDataIndex = Math.round(barkFreq / frequencyResolution);
        if (linearDataIndex >= 0 && linearDataIndex < linearData.length) {
            return (((_a = linearData[linearDataIndex]) !== null && _a !== void 0 ? _a : 0) - minValue) / (maxValue - minValue) * 2;
        } else {
            return 0;
        }
    });
    return barkFrequencies;
}
}),
"[project]/dist/cjs/wrapper/generateEmptyFft.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateEmptyFft = generateEmptyFft;
function generateEmptyFft() {
    return Array.from({
        length: 24
    }).map(()=>0);
}
}),
"[project]/dist/cjs/wrapper/EVIWebAudioPlayer.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

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
var __classPrivateFieldGet = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _EVIWebAudioPlayer_instances, _a, _EVIWebAudioPlayer_DEFAULT_WORKLET_URL, _EVIWebAudioPlayer_DEFAULT_FFT_SIZE, _EVIWebAudioPlayer_DEFAULT_FFT_INTERVAL, _EVIWebAudioPlayer_ctx, _EVIWebAudioPlayer_workletNode, _EVIWebAudioPlayer_analyserNode, _EVIWebAudioPlayer_gainNode, _EVIWebAudioPlayer_initialized, _EVIWebAudioPlayer_playing, _EVIWebAudioPlayer_muted, _EVIWebAudioPlayer_volume, _EVIWebAudioPlayer_disableAudioWorklet, _EVIWebAudioPlayer_fft, _EVIWebAudioPlayer_fftTimer, _EVIWebAudioPlayer_fftOptions, _EVIWebAudioPlayer_clipQueue, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, _EVIWebAudioPlayer_isProcessing, _EVIWebAudioPlayer_lastQueuedChunk, _EVIWebAudioPlayer_chunkBufferQueues, _EVIWebAudioPlayer_startAnalyserPollingIfEnabled, _EVIWebAudioPlayer_emitError, _EVIWebAudioPlayer_convertToAudioBuffer, _EVIWebAudioPlayer_getNextAudioBuffers, _EVIWebAudioPlayer_playNextClip;
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EVIWebAudioPlayer = void 0;
const convertBase64ToBlob_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/convertBase64ToBlob.js [app-route] (ecmascript)");
const convertFrequencyScale_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/convertFrequencyScale.js [app-route] (ecmascript)");
const generateEmptyFft_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/generateEmptyFft.js [app-route] (ecmascript)");
/**
 * A sequential, glitch-free Web-Audio player for **EVI** audio output.
 *
 * - **Decoding & playback**: base-64 PCM chunks feed an `AudioWorkletNode` and play in order, without gaps.
 * - **One-time init**: await {@link init} in a user-gesture to build audio graph and unlock the browser’s
 *  `AudioContext`; later calls are no-ops.
 * - **Optional FFT**: `{ fft: { enabled: true } }` adds an `AnalyserNode` and emits `'fft'` events; omit to skip.
 * - **Controls**: {@link setVolume}, {@link mute}, {@link unmute}, {@link stop}, {@link dispose}.
 * - **Events**: listen for `'play'`, `'stop'`, `'fft'`, `'error'`.
 */ class EVIWebAudioPlayer extends EventTarget {
    /** `true` while any clip is currently audible. */ get playing() {
        return __classPrivateFieldGet(this, _EVIWebAudioPlayer_playing, "f");
    }
    /** `true` if gain is set to 0 via {@link mute}. */ get muted() {
        return __classPrivateFieldGet(this, _EVIWebAudioPlayer_muted, "f");
    }
    /** Current output gain (0‑1). */ get volume() {
        return __classPrivateFieldGet(this, _EVIWebAudioPlayer_volume, "f");
    }
    /** Most recent FFT frame (empty when analyser disabled). */ get fft() {
        return __classPrivateFieldGet(this, _EVIWebAudioPlayer_fft, "f");
    }
    constructor(opts = {}){
        var _b, _c, _d;
        super();
        _EVIWebAudioPlayer_instances.add(this);
        this.opts = opts;
        _EVIWebAudioPlayer_ctx.set(this, null);
        _EVIWebAudioPlayer_workletNode.set(this, null);
        _EVIWebAudioPlayer_analyserNode.set(this, null);
        _EVIWebAudioPlayer_gainNode.set(this, null);
        _EVIWebAudioPlayer_initialized.set(this, false);
        _EVIWebAudioPlayer_playing.set(this, false);
        _EVIWebAudioPlayer_muted.set(this, false);
        _EVIWebAudioPlayer_volume.set(this, void 0);
        _EVIWebAudioPlayer_disableAudioWorklet.set(this, void 0);
        _EVIWebAudioPlayer_fft.set(this, (0, generateEmptyFft_js_1.generateEmptyFft)());
        _EVIWebAudioPlayer_fftTimer.set(this, null);
        _EVIWebAudioPlayer_fftOptions.set(this, null);
        _EVIWebAudioPlayer_clipQueue.set(this, []);
        _EVIWebAudioPlayer_currentlyPlayingAudioBuffer.set(this, null);
        _EVIWebAudioPlayer_isProcessing.set(this, false);
        // chunkBufferQueues and #lastQueuedChunk are used to make sure that
        // we don't play chunks out of order. #chunkBufferQueues is NOT the
        // audio playback queue.
        _EVIWebAudioPlayer_lastQueuedChunk.set(this, null);
        _EVIWebAudioPlayer_chunkBufferQueues.set(this, {});
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_volume, (_b = opts.volume) !== null && _b !== void 0 ? _b : 1.0, "f");
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_disableAudioWorklet, (_c = opts.disableAudioWorklet) !== null && _c !== void 0 ? _c : false, "f");
        // Resolve FFT options if enabled
        if ((_d = opts.fft) === null || _d === void 0 ? void 0 : _d.enabled) {
            const { size, interval, transform } = opts.fft;
            __classPrivateFieldSet(this, _EVIWebAudioPlayer_fftOptions, {
                size: size !== null && size !== void 0 ? size : __classPrivateFieldGet(_a, _a, "f", _EVIWebAudioPlayer_DEFAULT_FFT_SIZE),
                interval: interval !== null && interval !== void 0 ? interval : __classPrivateFieldGet(_a, _a, "f", _EVIWebAudioPlayer_DEFAULT_FFT_INTERVAL),
                transform: transform !== null && transform !== void 0 ? transform : (bins, sampleRate)=>(0, convertFrequencyScale_js_1.convertLinearFrequenciesToBark)(bins, sampleRate)
            }, "f");
        }
    }
    /**
     * * Subscribes to a player event and returns `this` for chaining.
     *
     * @param type One of `'play'`, `'stop'`, `'fft'`, or `'error'`.
     * @param fn Handler invoked with the event’s typed `detail` payload.
     * @param opts Optional `AddEventListenerOptions` (e.g. `{ once: true }`).
     *
     * @example
     *  ```ts
     *  const player = new EVIWebAudioPlayer();
     *  player
     *    .on('play', e => console.log('play',  e.detail.id))
     *    .on('stop', e => console.log('stop',  e.detail.id))
     *    .on('fft', e => console.log('stop',  e.detail.fft))
     *    .on('error', e => console.error('error', e.detail.message));
     *  ```
     */ on(type, fn, opts) {
        super.addEventListener(type, fn, opts);
        return this;
    }
    /**
     * Set up and start the player’s Web-Audio pipeline.
     *
     * - Creates a **suspended** `AudioContext`, loads the worklet processor, wires `AudioWorkletNode → (AnalyserNode?) → GainNode → destination`, then calls `resume()`.
     * - Must be awaited inside a user-gesture (click/tap/key); later calls are no-ops.
     * - If `fft.enabled` is `false` (or `fft` is omitted), no `AnalyserNode` or polling timer is created.
     *
     * **Safari quirk:** Safari locks an `AudioContext` to the device’s current sample rate at creation.
     * If you open a Bluetooth headset mic afterward, the OS may switch to the 16 kHz HFP profile and down-sample playback, which sounds “telephone-y.”
     * To avoid this, call `getUserMedia()` (or otherwise open audio input) **before** `init()`.
     *
     * @throws {Error} If the browser lacks `AudioWorklet` support, or if `AudioContext.resume()` is rejected (autoplay policy, device error).
     */ init() {
        return __awaiter(this, void 0, void 0, function*() {
            if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_initialized, "f")) return;
            // Create the AudioContext
            __classPrivateFieldSet(this, _EVIWebAudioPlayer_ctx, new AudioContext(), "f");
            // Fail fast if AudioWorklet isn’t supported
            if (!__classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").audioWorklet) {
                console.warn("AudioWorklet is not supported in this browser. Falling back to Regular Buffer Mode.");
                __classPrivateFieldSet(this, _EVIWebAudioPlayer_disableAudioWorklet, true, "f");
            }
            try {
                // Build GainNode
                __classPrivateFieldSet(this, _EVIWebAudioPlayer_gainNode, __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").createGain(), "f");
                __classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f").gain.value = __classPrivateFieldGet(this, _EVIWebAudioPlayer_volume, "f");
                // Build AnalyserNode (optional)
                if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_fftOptions, "f")) {
                    __classPrivateFieldSet(this, _EVIWebAudioPlayer_analyserNode, __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").createAnalyser(), "f");
                    __classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f").fftSize = __classPrivateFieldGet(this, _EVIWebAudioPlayer_fftOptions, "f").size;
                } else {
                    // Always create AnalyserNode, even if FFT is disabled, to avoid null checks in Buffer Mode
                    __classPrivateFieldSet(this, _EVIWebAudioPlayer_analyserNode, __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").createAnalyser(), "f");
                    __classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f").fftSize = __classPrivateFieldGet(_a, _a, "f", _EVIWebAudioPlayer_DEFAULT_FFT_SIZE);
                }
                if (!__classPrivateFieldGet(this, _EVIWebAudioPlayer_disableAudioWorklet, "f")) {
                    // Loads the AudioWorklet processor module.
                    yield __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").audioWorklet.addModule(__classPrivateFieldGet(_a, _a, "f", _EVIWebAudioPlayer_DEFAULT_WORKLET_URL));
                    // Build AudioWorkletNode
                    __classPrivateFieldSet(this, _EVIWebAudioPlayer_workletNode, new AudioWorkletNode(__classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f"), "audio-processor"), "f");
                    // When the worklet posts { type: "ended" }, mark playback stopped and emit a `'stop'` event.
                    __classPrivateFieldGet(this, _EVIWebAudioPlayer_workletNode, "f").port.onmessage = (e)=>{
                        if (e.data.type === "ended") {
                            __classPrivateFieldSet(this, _EVIWebAudioPlayer_playing, false, "f");
                            this.dispatchEvent(new CustomEvent("stop", {
                                detail: {
                                    id: "stream"
                                }
                            }));
                        }
                    };
                    // Audio graph nodes
                    const workletNode = __classPrivateFieldGet(this, _EVIWebAudioPlayer_workletNode, "f"); // AudioWorkletNode (PCM processor)
                    const analyserNode = __classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f"); // Optional AnalyserNode (FFT)
                    const gainNode = __classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f"); // GainNode (volume control)
                    const destination = __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").destination; // AudioDestinationNode (speakers)
                    // Analyser node is filtered out of audio graph if null (FFT disabled)
                    const audioGraph = [
                        workletNode,
                        analyserNode,
                        gainNode,
                        destination
                    ].filter(Boolean);
                    // Wire nodes: AudioWorkletNode → (AnalyserNode?) → GainNode → AudioDestinationNode
                    audioGraph.reduce((prev, next)=>(prev.connect(next), next));
                } else {
                    // Regular Buffer Mode
                    const analyserNode = __classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f");
                    const gainNode = __classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f");
                    const destination = __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").destination;
                    // Wire nodes: (AnalyserNode?) → GainNode → AudioDestinationNode
                    const audioGraph = [
                        analyserNode,
                        gainNode,
                        destination
                    ].filter(Boolean);
                    audioGraph.reduce((prev, next)=>(prev.connect(next), next));
                }
                // If an analyser is configured, begin polling it at the resolved interval and dispatching `'fft'` events for each frame.
                __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_startAnalyserPollingIfEnabled).call(this);
                // Resume the AudioContext now that the audio graph is fully wired.
                // Browsers allow `resume()` only inside a user-gesture callback.
                // Any rejection (autoplay policy, hardware issue, etc.) is caught by the outer catch-block below, which emits an 'error' event and re-throws.
                yield __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").resume();
                __classPrivateFieldSet(this, _EVIWebAudioPlayer_initialized, true, "f");
            } catch (err) {
                const suffix = err instanceof Error ? `: ${err.message}` : String(err);
                __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_emitError).call(this, `Failed to initialize audio player${suffix}`);
                throw err;
            }
        });
    }
    /**
     * Queue one {@link AudioOutput} message for playback.
     *
     * Decodes the base-64 PCM data, sends it to the `AudioWorkletNode` for glitch-free, in-order playback, and emits `'play'` for the first chunk of a new stream.
     *
     * @param message The `AudioOutput` message received from EVI’s WebSocket.
     *
     * @see {@link https://dev.hume.ai/reference/empathic-voice-interface-evi/chat/chat#receive.Audio-Output.type API Reference}
     */ enqueue(message) {
        return __awaiter(this, void 0, void 0, function*() {
            if (!__classPrivateFieldGet(this, _EVIWebAudioPlayer_initialized, "f") || !__classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f")) {
                __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_emitError).call(this, "Audio player is not initialized");
                return;
            }
            if (!__classPrivateFieldGet(this, _EVIWebAudioPlayer_disableAudioWorklet, "f")) {
                try {
                    const { data, id } = message;
                    const blob = (0, convertBase64ToBlob_js_1.convertBase64ToBlob)(data);
                    const buffer = yield blob.arrayBuffer();
                    const audio = yield __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").decodeAudioData(buffer);
                    const pcmData = audio.getChannelData(0);
                    __classPrivateFieldGet(this, _EVIWebAudioPlayer_workletNode, "f").port.postMessage({
                        type: "audio",
                        data: pcmData
                    });
                    __classPrivateFieldSet(this, _EVIWebAudioPlayer_playing, true, "f");
                    this.dispatchEvent(new CustomEvent("play", {
                        detail: {
                            id
                        }
                    }));
                } catch (err) {
                    const msg = err instanceof Error ? err.message : "Unknown error";
                    __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_emitError).call(this, `Failed to queue clip: ${msg}`);
                }
            } else {
                // Regular Buffer Mode
                try {
                    const audioBuffer = yield __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_convertToAudioBuffer).call(this, message);
                    if (!audioBuffer) {
                        __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_emitError).call(this, "Failed to convert data to audio buffer");
                        return;
                    }
                    const playableBuffers = __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_getNextAudioBuffers).call(this, message, audioBuffer);
                    if (playableBuffers.length === 0) {
                        return;
                    }
                    for (const nextAudioBufferToPlay of playableBuffers){
                        __classPrivateFieldGet(this, _EVIWebAudioPlayer_clipQueue, "f").push({
                            id: nextAudioBufferToPlay.id,
                            buffer: nextAudioBufferToPlay.buffer,
                            index: nextAudioBufferToPlay.index
                        });
                        if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_clipQueue, "f").length === 1) {
                            __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_playNextClip).call(this);
                        }
                    }
                } catch (e) {
                    const eMessage = e instanceof Error ? e.message : "Unknown error";
                    __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_emitError).call(this, `Failed to add clip to queue: ${eMessage}`);
                }
            }
        });
    }
    /**
     * Flush the worklet queue and output silence.
     */ stop() {
        var _b;
        if (!__classPrivateFieldGet(this, _EVIWebAudioPlayer_disableAudioWorklet, "f")) {
            // Clear buffered audio from the worklet queue
            (_b = __classPrivateFieldGet(this, _EVIWebAudioPlayer_workletNode, "f")) === null || _b === void 0 ? void 0 : _b.port.postMessage({
                type: "fadeAndClear"
            });
        } else {
            // Regular Buffer mode
            if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, "f")) {
                __classPrivateFieldGet(this, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, "f").stop();
                __classPrivateFieldGet(this, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, "f").disconnect();
                __classPrivateFieldSet(this, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, null, "f");
            }
            __classPrivateFieldSet(this, _EVIWebAudioPlayer_clipQueue, [], "f");
            __classPrivateFieldSet(this, _EVIWebAudioPlayer_isProcessing, false, "f");
        }
        // Restart analyser polling so fft events continue after stopping or clearing the queue
        __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_startAnalyserPollingIfEnabled).call(this);
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_playing, false, "f");
        this.dispatchEvent(new CustomEvent("stop", {
            detail: {
                id: "manual"
            }
        }));
    }
    /**
     * Set the master gain ({@link volume}) to a value between `0` (_silent_) and `1` (_full volume_).
     *
     * - Clamps out-of-range values.
     * - If called before {@link init}, stores volume for when `AudioContext` is created.
     * - If currently {@link muted}, updates stored volume but keeps output silent until {@link unmute}.
     *
     * @param volume Desired gain; clamped to [0, 1].
     */ setVolume(volume) {
        const clampedVolume = Math.max(0, Math.min(volume, 1));
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_volume, clampedVolume, "f");
        if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f") && __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f") && !__classPrivateFieldGet(this, _EVIWebAudioPlayer_muted, "f")) {
            __classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f").gain.setValueAtTime(clampedVolume, __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").currentTime);
        }
    }
    /**
     * Mute output instantly by setting the gain to 0. Retains the last volume internally for later restore.
     */ mute() {
        if (!__classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f") || !__classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f")) return;
        __classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f").gain.setValueAtTime(0, __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").currentTime);
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_muted, true, "f");
    }
    /**
     * Restore output gain to the last set volume (via setVolume).
     */ unmute() {
        if (!__classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f") || !__classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f")) return;
        __classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f").gain.setValueAtTime(__classPrivateFieldGet(this, _EVIWebAudioPlayer_volume, "f"), __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").currentTime);
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_muted, false, "f");
    }
    /**
     * Tear down all Web-Audio resources (worklet, analyser, gain, context) and reset state so {@link init} can be called again.
     */ dispose() {
        var _b, _c, _d, _e, _f, _g, _h;
        if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_fftTimer, "f") != null) {
            clearInterval(__classPrivateFieldGet(this, _EVIWebAudioPlayer_fftTimer, "f"));
            __classPrivateFieldSet(this, _EVIWebAudioPlayer_fftTimer, null, "f");
        }
        if (!__classPrivateFieldGet(this, _EVIWebAudioPlayer_disableAudioWorklet, "f")) {
            (_b = __classPrivateFieldGet(this, _EVIWebAudioPlayer_workletNode, "f")) === null || _b === void 0 ? void 0 : _b.port.postMessage({
                type: "fadeAndClear"
            });
            (_c = __classPrivateFieldGet(this, _EVIWebAudioPlayer_workletNode, "f")) === null || _c === void 0 ? void 0 : _c.port.postMessage({
                type: "end"
            });
            (_d = __classPrivateFieldGet(this, _EVIWebAudioPlayer_workletNode, "f")) === null || _d === void 0 ? void 0 : _d.port.close();
            (_e = __classPrivateFieldGet(this, _EVIWebAudioPlayer_workletNode, "f")) === null || _e === void 0 ? void 0 : _e.disconnect();
        } else {
            // Regular Buffer mode
            if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, "f")) {
                __classPrivateFieldGet(this, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, "f").stop();
                __classPrivateFieldGet(this, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, "f").disconnect();
                __classPrivateFieldSet(this, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, null, "f");
            }
            __classPrivateFieldSet(this, _EVIWebAudioPlayer_clipQueue, [], "f");
            __classPrivateFieldSet(this, _EVIWebAudioPlayer_isProcessing, false, "f");
        }
        (_f = __classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f")) === null || _f === void 0 ? void 0 : _f.disconnect();
        (_g = __classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f")) === null || _g === void 0 ? void 0 : _g.disconnect();
        (_h = __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f")) === null || _h === void 0 ? void 0 : _h.close().catch(()=>void 0);
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_initialized, false, "f");
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_playing, false, "f");
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_fft, (0, generateEmptyFft_js_1.generateEmptyFft)(), "f");
    }
}
exports.EVIWebAudioPlayer = EVIWebAudioPlayer;
_a = EVIWebAudioPlayer, _EVIWebAudioPlayer_ctx = new WeakMap(), _EVIWebAudioPlayer_workletNode = new WeakMap(), _EVIWebAudioPlayer_analyserNode = new WeakMap(), _EVIWebAudioPlayer_gainNode = new WeakMap(), _EVIWebAudioPlayer_initialized = new WeakMap(), _EVIWebAudioPlayer_playing = new WeakMap(), _EVIWebAudioPlayer_muted = new WeakMap(), _EVIWebAudioPlayer_volume = new WeakMap(), _EVIWebAudioPlayer_disableAudioWorklet = new WeakMap(), _EVIWebAudioPlayer_fft = new WeakMap(), _EVIWebAudioPlayer_fftTimer = new WeakMap(), _EVIWebAudioPlayer_fftOptions = new WeakMap(), _EVIWebAudioPlayer_clipQueue = new WeakMap(), _EVIWebAudioPlayer_currentlyPlayingAudioBuffer = new WeakMap(), _EVIWebAudioPlayer_isProcessing = new WeakMap(), _EVIWebAudioPlayer_lastQueuedChunk = new WeakMap(), _EVIWebAudioPlayer_chunkBufferQueues = new WeakMap(), _EVIWebAudioPlayer_instances = new WeakSet(), _EVIWebAudioPlayer_startAnalyserPollingIfEnabled = function _EVIWebAudioPlayer_startAnalyserPollingIfEnabled() {
    if (!__classPrivateFieldGet(this, _EVIWebAudioPlayer_fftOptions, "f") || !__classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f")) return;
    if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_fftTimer, "f")) clearInterval(__classPrivateFieldGet(this, _EVIWebAudioPlayer_fftTimer, "f"));
    const { interval, transform } = __classPrivateFieldGet(this, _EVIWebAudioPlayer_fftOptions, "f");
    __classPrivateFieldSet(this, _EVIWebAudioPlayer_fftTimer, window.setInterval(()=>{
        const bins = new Uint8Array(__classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f").frequencyBinCount);
        __classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f").getByteFrequencyData(bins);
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_fft, transform(bins, __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").sampleRate), "f");
        this.dispatchEvent(new CustomEvent("fft", {
            detail: {
                fft: __classPrivateFieldGet(this, _EVIWebAudioPlayer_fft, "f")
            }
        }));
    }, interval), "f");
}, _EVIWebAudioPlayer_emitError = function _EVIWebAudioPlayer_emitError(message) {
    this.dispatchEvent(new CustomEvent("error", {
        detail: {
            message
        }
    }));
}, _EVIWebAudioPlayer_convertToAudioBuffer = function _EVIWebAudioPlayer_convertToAudioBuffer(message) {
    return __awaiter(this, void 0, void 0, function*() {
        if (!__classPrivateFieldGet(this, _EVIWebAudioPlayer_initialized, "f") || !__classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f")) {
            __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_emitError).call(this, "Audio player has not been initialized");
            return;
        }
        const blob = (0, convertBase64ToBlob_js_1.convertBase64ToBlob)(message.data);
        const arrayBuffer = yield blob.arrayBuffer();
        const audioBuffer = yield __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").decodeAudioData(arrayBuffer);
        return audioBuffer;
    });
}, _EVIWebAudioPlayer_getNextAudioBuffers = function _EVIWebAudioPlayer_getNextAudioBuffers(message, audioBuffer) {
    var _b, _c;
    // Prevent prototype pollution by restricting dangerous property names.
    if (message.id === "__proto__" || message.id === "constructor" || message.id === "prototype") {
        __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_emitError).call(this, `Attempted to use a dangerous property name as message ID: ${message.id}`);
        return [];
    }
    //1. Add the current buffer to the queue
    if (!__classPrivateFieldGet(this, _EVIWebAudioPlayer_chunkBufferQueues, "f")[message.id]) {
        __classPrivateFieldGet(this, _EVIWebAudioPlayer_chunkBufferQueues, "f")[message.id] = [];
    }
    // Ensure message.index is a safe, non-negative integer to prevent prototype pollution.
    if (!Number.isInteger(message.index) || message.index < 0) {
        __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_emitError).call(this, `Attempted to use an invalid index: ${message.index}`);
        return [];
    }
    const queueForCurrMessage = __classPrivateFieldGet(this, _EVIWebAudioPlayer_chunkBufferQueues, "f")[message.id] || [];
    queueForCurrMessage[message.index] = audioBuffer;
    // 2. Now collect buffers that are ready to be played
    const lastId = (_b = __classPrivateFieldGet(this, _EVIWebAudioPlayer_lastQueuedChunk, "f")) === null || _b === void 0 ? void 0 : _b.id;
    const buffers = [];
    // If the current message ID is different from the last one that was added
    // to the queue, that means that we're playing a new message now, so the first chunk
    // we play needs to be at index 0.
    if (message.id !== lastId) {
        if (queueForCurrMessage[0]) {
            __classPrivateFieldSet(this, _EVIWebAudioPlayer_lastQueuedChunk, {
                id: message.id,
                index: 0
            }, "f");
            buffers.push({
                id: message.id,
                index: 0,
                buffer: queueForCurrMessage[0]
            });
            queueForCurrMessage[0] = undefined;
        } else {
            return [];
        }
    }
    // Drain the queue - basically if any chunks were received out of order previously,
    // and they're now ready to be played because the earlier chunks
    // have been received, we can add them to the buffers array.
    let nextIdx = (((_c = __classPrivateFieldGet(this, _EVIWebAudioPlayer_lastQueuedChunk, "f")) === null || _c === void 0 ? void 0 : _c.index) || 0) + 1;
    let nextBuf = queueForCurrMessage[nextIdx];
    while(nextBuf){
        buffers.push({
            index: nextIdx,
            buffer: nextBuf,
            id: message.id
        });
        queueForCurrMessage[nextIdx] = undefined;
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_lastQueuedChunk, {
            id: message.id,
            index: nextIdx
        }, "f");
        nextIdx += 1;
        nextBuf = queueForCurrMessage[nextIdx];
    }
    return buffers;
}, _EVIWebAudioPlayer_playNextClip = function _EVIWebAudioPlayer_playNextClip() {
    var _b, _c;
    if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_clipQueue, "f").length === 0 || __classPrivateFieldGet(this, _EVIWebAudioPlayer_isProcessing, "f")) {
        return;
    }
    if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f") === null || __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f") === null) {
        __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_emitError).call(this, "Audio player is not initialized");
        return;
    }
    const nextClip = __classPrivateFieldGet(this, _EVIWebAudioPlayer_clipQueue, "f").shift();
    if (!nextClip) {
        return;
    }
    __classPrivateFieldSet(this, _EVIWebAudioPlayer_isProcessing, true, "f");
    __classPrivateFieldSet(this, _EVIWebAudioPlayer_playing, true, "f");
    const bufferSource = __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").createBufferSource();
    bufferSource.buffer = nextClip.buffer;
    if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f")) {
        bufferSource.connect(__classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f"));
    }
    if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f")) {
        (_b = __classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f")) === null || _b === void 0 ? void 0 : _b.connect(__classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f"));
        __classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f").connect(__classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").destination);
    } else {
        (_c = __classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f")) === null || _c === void 0 ? void 0 : _c.connect(__classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").destination);
    }
    __classPrivateFieldSet(this, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, bufferSource, "f");
    __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_startAnalyserPollingIfEnabled).call(this);
    bufferSource.start(0);
    if (nextClip.index === 0) {
        this.dispatchEvent(new CustomEvent("play", {
            detail: {
                id: nextClip.id
            }
        }));
    }
    bufferSource.onended = ()=>{
        if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_fftTimer, "f")) {
            clearInterval(__classPrivateFieldGet(this, _EVIWebAudioPlayer_fftTimer, "f"));
            __classPrivateFieldSet(this, _EVIWebAudioPlayer_fftTimer, null, "f");
        }
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_fft, (0, generateEmptyFft_js_1.generateEmptyFft)(), "f");
        bufferSource.disconnect();
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_isProcessing, false, "f");
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_playing, false, "f");
        this.dispatchEvent(new CustomEvent("stop", {
            detail: {
                id: nextClip.id
            }
        }));
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, null, "f");
        __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_playNextClip).call(this);
    };
};
/** Default URL of the `audio-worklet.js` processor module, fetched from Hume AI’s CDN. */ _EVIWebAudioPlayer_DEFAULT_WORKLET_URL = {
    value: "https://storage.googleapis.com/evi-react-sdk-assets/audio-worklet-20250506.js"
};
/** Default FFT size (power-of-two). */ _EVIWebAudioPlayer_DEFAULT_FFT_SIZE = {
    value: 2048
};
/** Default analyser poll interval (16 ms). */ _EVIWebAudioPlayer_DEFAULT_FFT_INTERVAL = {
    value: 16
};
}),
"[project]/dist/cjs/wrapper/collate.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __asyncValues = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__asyncValues || function(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    //TURBOPACK unreachable
    ;
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
};
var __await = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__await || function(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
};
var __asyncDelegator = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__asyncDelegator || function(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: false
            } : f ? f(v) : v;
        } : f;
    }
};
var __asyncGenerator = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__asyncGenerator || function(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function awaitReturn(f) {
        return function(v) {
            return Promise.resolve(v).then(f, reject);
        };
    }
    function verb(n, f) {
        if (g[n]) {
            i[n] = function(v) {
                return new Promise(function(a, b) {
                    q.push([
                        n,
                        v,
                        a,
                        b
                    ]) > 1 || resume(n, v);
                });
            };
            if (f) i[n] = f(i[n]);
        }
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.collate = collate;
/**
 * Takes an async iterator that yields interleaved items from different groups
 * and produces an iterator that yields items in group order.
 *
 * Example:
 *   Input:  A1, B1, A2, A3 (final), C1, C2, C3 (final), B2 (final)
 *   Output: A1, A2, A3, B1, B2, C1, C2, C3
 *
 * This is useful when using synthesizeJsonStreaming with num_generations > 1
 *
 * @example
 * ```typescript
 *
 * import { collate } from 'hume';
 *
 * const stream = hume.synthesizeJsonStreaming({
 *   ...
 * })
 *
 * const contiguous = collate(
 *   stream
 *   (chunk) => chunk.generationId,
 *   (chunk) => chunk.isLastChunk
 * );
 *
 * for await (const item of contiguous) {
 *   audioPlayer.write(item.audio)
 * }
 * ```
 *
 * @param source - Async iterable that yields interleaved items.
 * @param groupBy - Function to determine a "key" that determines the group identity for each item.
 * @param isFinal - Function to determine if an item is the final item in its group.
 * @returns An async iterable that yields items in group order.
 */ function collate(source, groupBy, isFinal) {
    return __asyncGenerator(this, arguments, function* collate_1() {
        var _a, e_1, _b, _c;
        const buffers = new Map();
        const order = [];
        let current;
        const ensure = (k)=>{
            if (!buffers.has(k)) {
                buffers.set(k, []);
                order.push(k);
            }
        };
        const flushGroup = function*(k) {
            const buf = buffers.get(k);
            if (!buf) return;
            for (const item of buf)yield item;
            buffers.delete(k);
        };
        const nextGroup = ()=>{
            // pop the next group in first-seen order that still has a buffer
            while(order.length && !buffers.has(order[0]))order.shift();
            return order.shift();
        };
        try {
            for(var _d = true, source_1 = __asyncValues(source), source_1_1; source_1_1 = yield __await(source_1.next()), _a = source_1_1.done, !_a; _d = true){
                _c = source_1_1.value;
                _d = false;
                const item = _c;
                const k = groupBy(item);
                if (current === undefined) current = k;
                ensure(k);
                buffers.get(k).push(item);
                // if we just saw the final item for the current group, flush it and advance
                if (k === current && isFinal(item)) {
                    yield __await((yield* __asyncDelegator(__asyncValues(flushGroup(current)))));
                    current = nextGroup();
                }
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (!_d && !_a && (_b = source_1.return)) yield __await(_b.call(source_1));
            } finally{
                if (e_1) throw e_1.error;
            }
        }
        // stream ended; flush remaining groups in first-seen order
        if (current !== undefined) {
            if (buffers.has(current)) yield __await((yield* __asyncDelegator(__asyncValues(flushGroup(current)))));
            while(true){
                const k = nextGroup();
                if (k === undefined) break;
                yield __await((yield* __asyncDelegator(__asyncValues(flushGroup(k)))));
            }
        }
    });
}
}),
"[project]/dist/cjs/wrapper/SilenceFiller.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UnclockedSilenceFiller = exports.SilenceFiller = void 0;
/**
 * SilenceFiller is a pipeable stream that intersperses incoming audio data
 * with bytes of silence. This is important in some cases to keep an audio
 * stream "alive". Audio players, such as ffmpeg, can interpret inactivity as
 * meaning the stream is ended, or disconnected.
 *
 * This implementation does not depend on Node.js built-ins and can work in
 * any JavaScript environment, while still being pipeable to Node.js streams.
 *
 * @example
 * ```typescript
 * import { SilenceFiller } from 'hume';
 *
 * const BYTES_PER_SAMPLE = 2; // 16-bit samples
 * const SAMPLE_RATE = 48000;
 * const BUFFER_SIZE = Math.floor(SAMPLE_RATE * 0.1 * BYTES_PER_SAMPLE); // 100ms buffer
 * const silenceFiller = new SilenceFiller(BUFFER_SIZE, SAMPLE_RATE, BYTES_PER_SAMPLE, 10);
 *
 * // Pipe silence filler output to audio player stdin
 * silenceFiller.pipe(audioPlayer.stdin);
 *
 * // Handle pipe errors
 * silenceFiller.on('error', (err) => {
 *   console.error("SilenceFiller error:", err);
 * });
 *
 * // Write audio data as it arrives
 * silenceFiller.writeAudio(audioBuffer);
 *
 * // End the stream when done
 * await silenceFiller.endStream();
 * ```
 */ class SilenceFiller {
    /**
     * Creates a new SilenceFiller instance.
     *
     * @param pushIntervalMs - The interval in milliseconds for pushing audio data (default: 5ms).
     * @param sampleRate - The sample rate of the audio (e.g., 48000).
     * @param bytesPerSample - The number of bytes per audio sample (e.g., 2 for 16-bit).
     * @param bufferSize - How much to 'prebuffer'. If you set this too low there
     * is a chance that playback will stutter, but if you set it too high
     * playback will take longer to start.
     */ constructor(pushIntervalMs = 5, sampleRate = 48000, bytesPerSample = 2, bufferSize = 9600){
        this.isStarted = false;
        this.pushIntervalId = null;
        this.destination = null;
        this.eventListeners = new Map();
        this.ended = false;
        this.unclockedSilenceFiller = new UnclockedSilenceFiller(bufferSize, sampleRate, bytesPerSample);
        this.bytesPerSample = bytesPerSample;
        this.pushIntervalMs = pushIntervalMs;
    }
    /**
     * Pipes the output of this SilenceFiller to a writable destination.
     *
     * @param destination - The destination to pipe to (e.g., a Node.js Writable stream).
     * @returns The destination, for chaining.
     */ pipe(destination) {
        this.destination = destination;
        return destination;
    }
    /**
     * Registers an event listener.
     *
     * @param event - The event name ('error', 'end').
     * @param listener - The listener function.
     * @returns This instance, for chaining.
     */ on(event, listener) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, new Set());
        }
        this.eventListeners.get(event).add(listener);
        return this;
    }
    /**
     * Registers a one-time event listener.
     *
     * @param event - The event name ('error', 'end').
     * @param listener - The listener function.
     * @returns This instance, for chaining.
     */ once(event, listener) {
        const onceWrapper = (...args)=>{
            this.off(event, onceWrapper);
            listener(...args);
        };
        return this.on(event, onceWrapper);
    }
    /**
     * Removes an event listener.
     *
     * @param event - The event name.
     * @param listener - The listener function to remove.
     * @returns This instance, for chaining.
     */ off(event, listener) {
        const listeners = this.eventListeners.get(event);
        if (listeners) {
            listeners.delete(listener);
        }
        return this;
    }
    /**
     * Emits an event to all registered listeners.
     *
     * @param event - The event name.
     * @param args - Arguments to pass to listeners.
     */ emit(event, ...args) {
        const listeners = this.eventListeners.get(event);
        if (listeners) {
            for (const listener of listeners){
                try {
                    listener(...args);
                } catch (_a) {
                // Ignore errors in listeners
                }
            }
        }
    }
    /**
     * Writes audio data to the silence filler.
     *
     * @param audioBuffer - The audio buffer to write (Uint8Array or Buffer).
     */ writeAudio(audioBuffer) {
        const now = Date.now();
        try {
            this.unclockedSilenceFiller.writeAudio(audioBuffer, now);
            if (!this.isStarted && this.unclockedSilenceFiller.donePrebuffering) {
                this.isStarted = true;
                this.startPushInterval();
            }
        } catch (error) {
            console.error(`[SilenceFiller] Error writing audio:`, error);
            this.emit("error", error);
        }
    }
    startPushInterval() {
        this.pushIntervalId = setInterval(()=>{
            this.pushData();
        }, this.pushIntervalMs);
    }
    pushData() {
        if (!this.isStarted || !this.destination) return;
        try {
            const now = Date.now();
            const audioChunk = this.unclockedSilenceFiller.readAudio(now);
            if (audioChunk && audioChunk.length > 0) {
                // Ensure chunk size is aligned to bytesPerSample
                const alignedChunkSize = Math.floor(audioChunk.length / this.bytesPerSample) * this.bytesPerSample;
                if (alignedChunkSize > 0) {
                    const chunk = audioChunk.subarray(0, alignedChunkSize);
                    this.destination.write(chunk);
                }
            }
        } catch (error) {
            console.error(`[SilenceFiller] Error pushing data:`, error);
            this.emit("error", error);
        }
    }
    /**
     * Ends the stream and drains all remaining audio data.
     *
     * @returns A promise that resolves when the stream has ended.
     */ endStream() {
        return new Promise((resolve)=>{
            if (this.ended) {
                resolve();
                return;
            }
            this.ended = true;
            // Stop pushing data
            if (this.pushIntervalId) {
                clearInterval(this.pushIntervalId);
                this.pushIntervalId = null;
            }
            // Drain all remaining audio from SilenceFiller
            const now = Date.now();
            // Keep reading until no more audio is available
            while(this.destination){
                const remainingChunk = this.unclockedSilenceFiller.readAudio(now);
                if (!remainingChunk || remainingChunk.length === 0) {
                    break;
                }
                const alignedChunkSize = Math.floor(remainingChunk.length / this.bytesPerSample) * this.bytesPerSample;
                if (alignedChunkSize > 0) {
                    const chunk = remainingChunk.subarray(0, alignedChunkSize);
                    this.destination.write(chunk);
                }
            }
            this.emit("end");
            resolve();
        });
    }
}
exports.SilenceFiller = SilenceFiller;
/**
 * Does the actual calculation of how interspersing audio with silence
 * is "pure" in the sense that it does not rely on the system clock.
 * It's up to the caller to provide timestamps.
 *
 * @internal
 */ class UnclockedSilenceFiller {
    constructor(bufferSize, sampleRate, bytesPerSample){
        this.audioQueue = [];
        this.totalBufferedBytes = 0;
        this.startTimestamp = null;
        this.totalBytesSent = 0;
        this.donePrebuffering = false;
        this.bufferSize = bufferSize;
        this.sampleRate = sampleRate;
        this.bytesPerSample = bytesPerSample;
    }
    writeAudio(audioBuffer, timestamp) {
        this.audioQueue.push(audioBuffer);
        this.totalBufferedBytes += audioBuffer.length;
        if (this.startTimestamp === null) {
            this.startTimestamp = timestamp;
        }
        if (!this.donePrebuffering && this.totalBufferedBytes >= this.bufferSize) {
            this.donePrebuffering = true;
        }
    }
    readAudio(timestamp) {
        if (this.startTimestamp === null || !this.donePrebuffering) {
            return null;
        }
        const elapsedMs = timestamp - this.startTimestamp;
        const targetBytesSent = Math.floor(this.sampleRate * elapsedMs / 1000 * this.bytesPerSample);
        const bytesNeeded = targetBytesSent - this.totalBytesSent;
        if (bytesNeeded <= 0) {
            return null;
        }
        // Ensure bytesNeeded is a multiple of bytesPerSample
        const alignedBytesNeeded = Math.floor(bytesNeeded / this.bytesPerSample) * this.bytesPerSample;
        if (alignedBytesNeeded <= 0) {
            return null;
        }
        let chunk = new Uint8Array(0);
        // Drain from queue until we have enough bytes
        while(chunk.length < alignedBytesNeeded && this.audioQueue.length > 0){
            const nextBuffer = this.audioQueue.shift();
            chunk = concatUint8Arrays(chunk, nextBuffer);
            this.totalBufferedBytes -= nextBuffer.length;
        }
        // If we have more than needed, put the excess back
        if (chunk.length > alignedBytesNeeded) {
            const excess = chunk.subarray(alignedBytesNeeded);
            this.audioQueue.unshift(excess);
            this.totalBufferedBytes += excess.length;
            chunk = chunk.subarray(0, alignedBytesNeeded);
        }
        // Fill remaining with silence if needed
        if (chunk.length < alignedBytesNeeded) {
            const silenceNeeded = new Uint8Array(alignedBytesNeeded - chunk.length); // Uint8Array is zero-filled by default
            chunk = concatUint8Arrays(chunk, silenceNeeded);
        }
        // Update total bytes sent
        this.totalBytesSent += chunk.length;
        return chunk;
    }
}
exports.UnclockedSilenceFiller = UnclockedSilenceFiller;
/**
 * Concatenates two Uint8Arrays into a new Uint8Array.
 */ function concatUint8Arrays(a, b) {
    const result = new Uint8Array(a.length + b.length);
    result.set(a, 0);
    result.set(b, a.length);
    return result;
}
}),
"[project]/dist/cjs/wrapper/monday/MondayClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Monday.com GraphQL API Client
 *
 * This client provides a simple interface to interact with Monday.com's GraphQL API
 * to update tasks, items, and boards.
 */ var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
exports.MondayClient = void 0;
class MondayClient {
    constructor(options){
        this.apiToken = options.apiToken;
        this.apiVersion = options.apiVersion || "2023-10";
        this.apiUrl = "https://api.monday.com/v2";
    }
    /**
     * Execute a GraphQL query or mutation
     */ executeQuery(query, variables) {
        return __awaiter(this, void 0, void 0, function*() {
            const response = yield fetch(this.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": this.apiToken,
                    "API-Version": this.apiVersion
                },
                body: JSON.stringify({
                    query,
                    variables
                })
            });
            if (!response.ok) {
                throw new Error(`Monday.com API error: ${response.status} ${response.statusText}`);
            }
            const result = yield response.json();
            if (result.errors) {
                throw new Error(`Monday.com GraphQL error: ${JSON.stringify(result.errors)}`);
            }
            return result.data;
        });
    }
    /**
     * Get an item by ID
     */ getItem(itemId, boardId) {
        return __awaiter(this, void 0, void 0, function*() {
            const query = `
            query GetItem($itemId: [ID!], $boardId: [ID!]) {
                items(ids: $itemId, board_ids: $boardId) {
                    id
                    name
                    column_values {
                        id
                        text
                        value
                    }
                    board {
                        id
                        name
                    }
                }
            }
        `;
            const result = yield this.executeQuery(query, {
                itemId: [
                    itemId
                ],
                boardId: [
                    boardId
                ]
            });
            return result.items[0] || null;
        });
    }
    /**
     * Update an item's status column
     */ updateItemStatus(options) {
        return __awaiter(this, void 0, void 0, function*() {
            const mutation = `
            mutation ChangeColumnValue($boardId: ID!, $itemId: ID!, $columnId: String!, $value: JSON!) {
                change_column_value(
                    board_id: $boardId,
                    item_id: $itemId,
                    column_id: $columnId,
                    value: $value
                ) {
                    id
                }
            }
        `;
            // Monday.com status columns expect JSON with index and post_id
            // Common status values: "Done", "Working on it", "Stuck", etc.
            const statusValue = JSON.stringify({
                index: this.getStatusIndex(options.status),
                post_id: null
            });
            const result = yield this.executeQuery(mutation, {
                boardId: options.boardId,
                itemId: options.itemId,
                columnId: options.statusColumnId,
                value: statusValue
            });
            return result.change_column_value;
        });
    }
    /**
     * Update an item to "Done" status
     */ markItemAsDone(itemId, boardId, statusColumnId) {
        return __awaiter(this, void 0, void 0, function*() {
            yield this.updateItemStatus({
                itemId,
                boardId,
                statusColumnId,
                status: "Done"
            });
        });
    }
    /**
     * Create a new item in a board
     */ createItem(options) {
        return __awaiter(this, void 0, void 0, function*() {
            const mutation = `
            mutation CreateItem($boardId: ID!, $groupId: String, $itemName: String!, $columnValues: JSON) {
                create_item(
                    board_id: $boardId,
                    group_id: $groupId,
                    item_name: $itemName,
                    column_values: $columnValues
                ) {
                    id
                }
            }
        `;
            const columnValues = options.columnValues ? JSON.stringify(options.columnValues) : undefined;
            const result = yield this.executeQuery(mutation, {
                boardId: options.boardId,
                groupId: options.groupId || null,
                itemName: options.itemName,
                columnValues
            });
            return result.create_item;
        });
    }
    /**
     * Search for items by name
     */ searchItems(boardId, searchTerm) {
        return __awaiter(this, void 0, void 0, function*() {
            const query = `
            query SearchItems($boardId: [ID!], $searchTerm: String!) {
                items_by_column_values(
                    board_id: $boardId,
                    column_id: "name",
                    column_value: $searchTerm
                ) {
                    id
                    name
                    column_values {
                        id
                        text
                        value
                    }
                    board {
                        id
                        name
                    }
                }
            }
        `;
            const result = yield this.executeQuery(query, {
                boardId: [
                    boardId
                ],
                searchTerm
            });
            return result.items_by_column_values || [];
        });
    }
    /**
     * Get board information
     */ getBoard(boardId) {
        return __awaiter(this, void 0, void 0, function*() {
            const query = `
            query GetBoard($boardId: [ID!]) {
                boards(ids: $boardId) {
                    id
                    name
                    columns {
                        id
                        title
                        type
                    }
                }
            }
        `;
            const result = yield this.executeQuery(query, {
                boardId: [
                    boardId
                ]
            });
            return result.boards[0] || null;
        });
    }
    /**
     * Helper to get status index for common status values
     */ getStatusIndex(status) {
        var _a;
        const statusMap = {
            "Done": 0,
            "Working on it": 1,
            "Stuck": 2,
            "Not started": 3
        };
        return (_a = statusMap[status]) !== null && _a !== void 0 ? _a : 0;
    }
}
exports.MondayClient = MondayClient;
}),
"[project]/dist/cjs/wrapper/monday/TaskSync.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Task Sync Utility
 *
 * Detects completed tasks from git commits and updates Monday.com accordingly.
 * Supports parsing commit messages, branch names, and file changes to identify tasks.
 */ var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
exports.TaskSync = void 0;
const MondayClient_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/monday/MondayClient.js [app-route] (ecmascript)");
const child_process_1 = __turbopack_context__.r("[externals]/child_process [external] (child_process, cjs)");
class TaskSync {
    constructor(config){
        this.config = Object.assign({
            taskIdPattern: /#(\d+)|(?:TASK|MON|ITEM)[-:](\d+)/i,
            completionKeywords: [
                "done",
                "complete",
                "finished",
                "completed",
                "fixed",
                "resolved"
            ]
        }, config);
        this.mondayClient = new MondayClient_js_1.MondayClient({
            apiToken: config.mondayApiToken
        });
    }
    /**
     * Parse commit message to extract task information
     */ parseCommitMessage(commitMessage) {
        const taskIdMatch = commitMessage.match(this.config.taskIdPattern);
        if (!taskIdMatch) {
            return null;
        }
        const taskId = taskIdMatch[1] || taskIdMatch[2] || taskIdMatch[3];
        const hasCompletionKeyword = this.config.completionKeywords.some((keyword)=>commitMessage.toLowerCase().includes(keyword.toLowerCase()));
        if (!hasCompletionKeyword) {
            return null;
        }
        // Extract task name from commit message (everything after the task ID)
        const taskNameMatch = commitMessage.match(new RegExp(`${this.config.taskIdPattern.source}\\s*[:-]?\\s*(.+)`, "i"));
        const taskName = taskNameMatch ? taskNameMatch[1].trim() : undefined;
        return {
            itemId: taskId,
            taskName,
            boardId: this.config.boardId
        };
    }
    /**
     * Get the current git branch name
     */ getCurrentBranch() {
        try {
            return (0, child_process_1.execSync)("git rev-parse --abbrev-ref HEAD", {
                encoding: "utf-8"
            }).trim();
        } catch (_a) {
            return "";
        }
    }
    /**
     * Get the latest commit message
     */ getLatestCommitMessage() {
        try {
            return (0, child_process_1.execSync)("git log -1 --pretty=%B", {
                encoding: "utf-8"
            }).trim();
        } catch (_a) {
            return "";
        }
    }
    /**
     * Check if a commit message indicates task completion
     */ checkAndUpdateFromCommit(commitMessage) {
        return __awaiter(this, void 0, void 0, function*() {
            const message = commitMessage || this.getLatestCommitMessage();
            const taskInfo = this.parseCommitMessage(message);
            if (!taskInfo || !taskInfo.itemId) {
                return false;
            }
            try {
                yield this.mondayClient.markItemAsDone(taskInfo.itemId, taskInfo.boardId, this.config.statusColumnId);
                console.log(`✅ Updated Monday.com item ${taskInfo.itemId} to "Done"`);
                return true;
            } catch (error) {
                console.error(`❌ Failed to update Monday.com item ${taskInfo.itemId}:`, error);
                return false;
            }
        });
    }
    /**
     * Update task based on branch name (if mapped)
     */ updateFromBranch(branchName) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a;
            const branch = branchName || this.getCurrentBranch();
            const itemId = (_a = this.config.branchToItemMap) === null || _a === void 0 ? void 0 : _a[branch];
            if (!itemId) {
                return false;
            }
            try {
                yield this.mondayClient.markItemAsDone(itemId, this.config.boardId, this.config.statusColumnId);
                console.log(`✅ Updated Monday.com item ${itemId} from branch ${branch}`);
                return true;
            } catch (error) {
                console.error(`❌ Failed to update Monday.com item ${itemId}:`, error);
                return false;
            }
        });
    }
    /**
     * Sync task from current git state (commit message + branch)
     */ syncCurrentState() {
        return __awaiter(this, void 0, void 0, function*() {
            const commitUpdated = yield this.checkAndUpdateFromCommit();
            if (commitUpdated) {
                return true;
            }
            return yield this.updateFromBranch();
        });
    }
    /**
     * Manually mark a task as done
     */ markTaskDone(itemId) {
        return __awaiter(this, void 0, void 0, function*() {
            yield this.mondayClient.markItemAsDone(itemId, this.config.boardId, this.config.statusColumnId);
            console.log(`✅ Manually updated Monday.com item ${itemId} to "Done"`);
        });
    }
}
exports.TaskSync = TaskSync;
}),
"[project]/dist/cjs/wrapper/monday/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TaskSync = exports.MondayClient = void 0;
var MondayClient_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/monday/MondayClient.js [app-route] (ecmascript)");
Object.defineProperty(exports, "MondayClient", {
    enumerable: true,
    get: function() {
        return MondayClient_js_1.MondayClient;
    }
});
var TaskSync_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/monday/TaskSync.js [app-route] (ecmascript)");
Object.defineProperty(exports, "TaskSync", {
    enumerable: true,
    get: function() {
        return TaskSync_js_1.TaskSync;
    }
});
}),
"[project]/dist/cjs/wrapper/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
exports.TaskSync = exports.MondayClient = exports.createSilenceFiller = exports.SilenceFiller = exports.collate = exports.EVIWebAudioPlayer = exports.ExpressionMeasurement = exports.HumeClient = exports.getBrowserSupportedMimeType = exports.MimeType = exports.getAudioStream = exports.fetchAccessToken = exports.checkForAudioTracks = exports.ensureSingleValidAudioTrack = exports.convertBlobToBase64 = exports.convertBase64ToBlob = exports.base64Encode = exports.base64Decode = void 0;
var base64Decode_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/base64Decode.js [app-route] (ecmascript)");
Object.defineProperty(exports, "base64Decode", {
    enumerable: true,
    get: function() {
        return base64Decode_js_1.base64Decode;
    }
});
var base64Encode_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/base64Encode.js [app-route] (ecmascript)");
Object.defineProperty(exports, "base64Encode", {
    enumerable: true,
    get: function() {
        return base64Encode_js_1.base64Encode;
    }
});
var convertBase64ToBlob_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/convertBase64ToBlob.js [app-route] (ecmascript)");
Object.defineProperty(exports, "convertBase64ToBlob", {
    enumerable: true,
    get: function() {
        return convertBase64ToBlob_js_1.convertBase64ToBlob;
    }
});
var convertBlobToBase64_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/convertBlobToBase64.js [app-route] (ecmascript)");
Object.defineProperty(exports, "convertBlobToBase64", {
    enumerable: true,
    get: function() {
        return convertBlobToBase64_js_1.convertBlobToBase64;
    }
});
var ensureSingleValidAudioTrack_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/ensureSingleValidAudioTrack.js [app-route] (ecmascript)");
Object.defineProperty(exports, "ensureSingleValidAudioTrack", {
    enumerable: true,
    get: function() {
        return ensureSingleValidAudioTrack_js_1.ensureSingleValidAudioTrack;
    }
});
var checkForAudioTracks_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/checkForAudioTracks.js [app-route] (ecmascript)");
Object.defineProperty(exports, "checkForAudioTracks", {
    enumerable: true,
    get: function() {
        return checkForAudioTracks_js_1.checkForAudioTracks;
    }
});
var fetchAccessToken_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/fetchAccessToken.js [app-route] (ecmascript)");
Object.defineProperty(exports, "fetchAccessToken", {
    enumerable: true,
    get: function() {
        return fetchAccessToken_js_1.fetchAccessToken;
    }
});
var getAudioStream_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/getAudioStream.js [app-route] (ecmascript)");
Object.defineProperty(exports, "getAudioStream", {
    enumerable: true,
    get: function() {
        return getAudioStream_js_1.getAudioStream;
    }
});
var getBrowserSupportedMimeType_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/getBrowserSupportedMimeType.js [app-route] (ecmascript)");
Object.defineProperty(exports, "MimeType", {
    enumerable: true,
    get: function() {
        return getBrowserSupportedMimeType_js_1.MimeType;
    }
});
Object.defineProperty(exports, "getBrowserSupportedMimeType", {
    enumerable: true,
    get: function() {
        return getBrowserSupportedMimeType_js_1.getBrowserSupportedMimeType;
    }
});
var HumeClient_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/HumeClient.js [app-route] (ecmascript)");
Object.defineProperty(exports, "HumeClient", {
    enumerable: true,
    get: function() {
        return HumeClient_js_1.HumeClient;
    }
});
var ExpressionMeasurementClient_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/expressionMeasurement/ExpressionMeasurementClient.js [app-route] (ecmascript)");
Object.defineProperty(exports, "ExpressionMeasurement", {
    enumerable: true,
    get: function() {
        return ExpressionMeasurementClient_js_1.ExpressionMeasurement;
    }
});
var EVIWebAudioPlayer_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/EVIWebAudioPlayer.js [app-route] (ecmascript)");
Object.defineProperty(exports, "EVIWebAudioPlayer", {
    enumerable: true,
    get: function() {
        return EVIWebAudioPlayer_js_1.EVIWebAudioPlayer;
    }
});
var collate_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/collate.js [app-route] (ecmascript)");
Object.defineProperty(exports, "collate", {
    enumerable: true,
    get: function() {
        return collate_js_1.collate;
    }
});
var SilenceFiller_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/SilenceFiller.js [app-route] (ecmascript)");
Object.defineProperty(exports, "SilenceFiller", {
    enumerable: true,
    get: function() {
        return SilenceFiller_js_1.SilenceFiller;
    }
});
/**
 * @deprecated SilenceFiller no longer requires dynamic import. Use `import { SilenceFiller } from 'hume'` directly.
 */ const createSilenceFiller = ()=>__awaiter(void 0, void 0, void 0, function*() {
        const { SilenceFiller } = yield Promise.resolve().then(()=>__importStar(__turbopack_context__.r("[project]/dist/cjs/wrapper/SilenceFiller.js [app-route] (ecmascript)")));
        return SilenceFiller;
    });
exports.createSilenceFiller = createSilenceFiller;
// Monday.com integration
var index_js_1 = __turbopack_context__.r("[project]/dist/cjs/wrapper/monday/index.js [app-route] (ecmascript)");
Object.defineProperty(exports, "MondayClient", {
    enumerable: true,
    get: function() {
        return index_js_1.MondayClient;
    }
});
Object.defineProperty(exports, "TaskSync", {
    enumerable: true,
    get: function() {
        return index_js_1.TaskSync;
    }
});
}),
];

//# sourceMappingURL=dist_cjs_wrapper_30fb1b6f._.js.map