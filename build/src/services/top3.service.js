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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const getTop3UsersByPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield database_1.default.query(`SELECT U.id as user_id, U.email, U.name, COUNT(P.id) AS post_count, C.comment AS recent_comment FROM users U 
    LEFT JOIN posts P 
    ON U.id = P.user_id 
    LEFT JOIN (SELECT C.user_id, C.comment FROM comments C 
      INNER JOIN (SELECT user_id, MAX(created_at) AS max_created_at FROM comments GROUP BY user_id) CX 
      ON C.user_id = CX.user_id AND C.created_at = CX.max_created_at) C 
      ON U.id = C.user_id 
      GROUP BY U.id, U.email, U.name, C.comment 
      ORDER BY post_count DESC LIMIT 3`, null);
    return result;
});
exports.default = getTop3UsersByPosts;
