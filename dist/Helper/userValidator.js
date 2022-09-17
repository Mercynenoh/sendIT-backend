"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchemas = exports.UserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UserSchema = joi_1.default.object({
    Firstname: joi_1.default.string().required(),
    Lastname: joi_1.default.string().required(),
    Senderemail: joi_1.default.string().required().email(),
    Password: joi_1.default.string().required()
});
exports.UserSchemas = joi_1.default.object({
    Senderemail: joi_1.default.string().required().email(),
    Password: joi_1.default.string().required()
});
