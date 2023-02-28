"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const start_1 = require("./rpc/start");
(0, dotenv_1.config)();
new start_1.LastFmPrincipal(process.env.CLIENT_ID).start().catch(() => ({}));
//# sourceMappingURL=index.js.map