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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const posts_service_1 = require("../services/posts.service");
class Users {
}
_a = Users;
Users.postUserComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { post_id } = req.params;
    const { comment } = req.body;
    const { user_id } = req.user;
    try {
        const getPostDetails = yield (0, posts_service_1.getPost)(post_id);
        if (getPostDetails.rowCount === 0) {
            return res.status(400).json({
                message: `Post Id does not exist`,
                data: null
            });
        }
        yield (0, posts_service_1.postComment)(user_id, post_id, comment);
        return res.status(200).json({
            message: `Your comment has been posted`,
            data: null
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: `System error, unable to post comment`,
            data: null
        });
    }
});
exports.default = Users;
