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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const date_fns_1 = require("date-fns");
const config_1 = __importDefault(require("../config"));
const users_service_1 = require("../services/users.service");
const posts_service_1 = require("../services/posts.service");
class Users {
}
_a = Users;
Users.addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    try {
        const user = yield (0, users_service_1.getUser)(email);
        if (user.rowCount > 0) {
            return res.status(400).json({
                message: `User already exists`,
                data: null,
            });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        yield (0, users_service_1.createUser)(email, hashedPassword, name);
        const newUserDetails = yield (0, users_service_1.getUser)(email);
        const { id } = newUserDetails.rows[0];
        const userData = {
            user_id: id,
            email,
            name,
        };
        const token = jsonwebtoken_1.default.sign(userData, config_1.default.SERVER.KEY, {
            algorithm: 'HS256',
            expiresIn: '12h',
        });
        return res.status(200).json({
            message: `User registered successfully`,
            token,
            data: userData,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: `System error, unable to register user`,
            data: null
        });
    }
});
Users.listUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield (0, users_service_1.listUser)();
        const count = allUsers.rowCount;
        const list = allUsers.rows.map((user) => {
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                registered: (0, date_fns_1.format)(user.created_at, "MMM d, yyyy - h:mma")
            };
        });
        return res.status(200).json({
            message: `User list fetched successufully`,
            data: {
                count, list
            }
        });
    }
    catch (error) {
        return res.status(400).json({
            message: `Unable to get user's list`,
            data: null
        });
    }
});
Users.allUserPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { user_id } = req.user;
    try {
        if (id != user_id) {
            return res.status(400).json({
                message: `Path userId(${id}) is different from authenticated userId(${user_id})`,
                data: null
            });
        }
        const userPosts = yield (0, posts_service_1.listUserPosts)(id);
        const count = userPosts.rowCount;
        const list = userPosts.rows.map((post) => {
            return {
                post_id: post.id,
                user_id: post.user_id,
                title: post.title,
                content: post.content,
                posted_on: (0, date_fns_1.format)(post.created_at, "MMM d, yyyy - h:mma")
            };
        });
        return res.status(200).json({
            message: `User posts fetched successufully`,
            data: {
                count, list
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: `System error, unable to list user posts`,
            data: null
        });
    }
});
Users.addUserPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content } = req.body;
    const { user_id } = req.user;
    try {
        if (id != user_id) {
            return res.status(400).json({
                message: `Path userId(${id}) is different from authenticated userId(${user_id})`,
                data: null
            });
        }
        const post = yield (0, posts_service_1.addPost)(id, title, content);
        console.log(post);
        return res.status(200).json({
            message: `User post added successfully`,
            data: {}
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: `System error, unable to add user posts`,
            data: null
        });
    }
});
Users.loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield (0, users_service_1.getUser)(email);
        if (user.rowCount === 0) {
            return res.status(400).json({
                message: `User does not exists`,
                data: null,
            });
        }
        const { id, name, password: hashedPassword } = user.rows[0];
        const passwordCheckk = yield bcryptjs_1.default.compare(password, hashedPassword);
        if (!passwordCheckk) {
            return res.status(400).json({
                message: `Incorrect email or password`,
                data: null,
            });
        }
        const userData = {
            user_id: id,
            email,
            name,
        };
        const token = jsonwebtoken_1.default.sign(userData, config_1.default.SERVER.KEY, {
            algorithm: 'HS256',
            expiresIn: '12h',
        });
        return res.status(200).json({
            message: `User logged in successufully`,
            data: userData,
            token,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: `Unable to login user`,
            data: null
        });
    }
});
exports.default = Users;
