"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
const appPort = config_1.default.SERVER.PORT;
const appVersion = config_1.default.SERVER.VERSION;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.enable('trust proxy');
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(`/${appVersion}`, routes_1.default);
app.get(`/`, (req, res) => {
    res.status(200).json({
        message: 'Risevest Devtest',
        data: null
    });
});
app.all('*', (req, res) => {
    res.status(406).json({
        message: 'Invalid route',
        data: null
    });
});
app.listen(appPort, () => {
    console.log(`Server started on port ${appPort}!`);
});
module.exports = app;
