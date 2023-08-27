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
exports.postComment = exports.listUserPosts = exports.addPost = exports.getPost = void 0;
const database_1 = __importDefault(require("../config/database"));
const getPost = (post_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield database_1.default.query(`SELECT id, user_id, title, content, created_at FROM posts WHERE id = $1 LIMIT 1`, [post_id]);
    return result;
});
exports.getPost = getPost;
const addPost = (user_id, title, content) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield database_1.default.query('INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3)', [user_id, title, content]);
    return result;
});
exports.addPost = addPost;
const listUserPosts = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield database_1.default.query(`SELECT id, user_id, title, content, created_at FROM posts WHERE user_id = $1 ORDER BY id DESC LIMIT 50`, [user_id]);
    return result;
});
exports.listUserPosts = listUserPosts;
const postComment = (user_id, post_id, comment) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield database_1.default.query('INSERT INTO comments (user_id, post_id, comment) VALUES ($1, $2, $3)', [user_id, post_id, comment]);
    return result;
});
exports.postComment = postComment;
