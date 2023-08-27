"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const top3_service_1 = __importDefault(require("../services/top3.service"));
class Top3 {
}
_a = Top3;
Top3.top3UsersByPosr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const top3 = yield (0, top3_service_1.default)();
        return res.status(200).json({
            message: `Top 3 users by post listed`,
            data: top3.rows
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: `System error, unable to list top 3`,
            data: null
        });
    }
});
exports.default = Top3;
