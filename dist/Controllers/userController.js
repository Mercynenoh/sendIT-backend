"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = exports.getProfiles = exports.getUsers = exports.loginUser = exports.addProfile = exports.addUser = void 0;
const mssql_1 = __importStar(require("mssql"));
const Config_1 = require("../Config/Config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userValidator_1 = require("../Helper/userValidator");
const userValidator_2 = require("../Helper/userValidator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../DatabaseHelpers/database"));
const db = new database_1.default();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        const { Firstname, Lastname, Senderemail, Password } = req.body;
        const { error, value } = userValidator_1.UserSchema.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        const hashedpassword = yield bcrypt_1.default.hash(Password, 10);
        yield pool.request()
            .input('Firstname', mssql_1.default.VarChar, Firstname)
            .input('Lastname', mssql_1.default.VarChar, Lastname)
            .input('Senderemail', mssql_1.default.VarChar, Senderemail)
            .input('Password', mssql_1.default.VarChar, hashedpassword)
            .execute('addUser');
        res.json({ message: 'Registered...' });
    }
    catch (error) {
        console.log(error);
        if (error instanceof mssql_1.RequestError) {
            res.json({ message: error.message });
        }
    }
});
exports.addUser = addUser;
const addProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { Profile } = req.body;
        const { recordset } = yield db.exec('addUserProfile', { id, Profile });
        return res.json({ message: 'Updated...' });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.addProfile = addProfile;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Senderemail, Password } = req.body;
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        const { error, value } = userValidator_2.UserSchemas.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        const usersResult = yield (yield pool.request()
            .input('Senderemail', mssql_1.default.VarChar, Senderemail)
            .execute('getUser')).recordset;
        const user = usersResult[0];
        if (!user) {
            res.status(400).json({ message: 'Invalid Email' });
        }
        const validPassword = yield bcrypt_1.default.compare(Password, user.Password);
        if (!validPassword) {
            res.status(400).json({ message: 'Invalid Password' });
        }
        const { Password: _ } = user, rest = __rest(user, ["Password"]);
        const token = jsonwebtoken_1.default.sign(rest, process.env.KEY, { expiresIn: '3600s' });
        res.json({
            message: 'Logged in',
            user: rest,
            token
        });
    }
    catch (error) {
        res.json({ error });
        console.log(error);
    }
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { recordset } = yield db.exec('getUsers');
        res.json(recordset);
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getUsers = getUsers;
const getProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        const users = yield pool.request().execute('seeProfile');
        const { recordset } = users;
        res.json(recordset);
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getProfiles = getProfiles;
const checkUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        res.json({ name: req.info.name, role: req.info.role });
    }
});
exports.checkUser = checkUser;
