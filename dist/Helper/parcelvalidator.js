"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcelSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.parcelSchema = joi_1.default.object({
    Adress: joi_1.default.string().required(),
    Senderemail: joi_1.default.string().required().email(),
    RecepientEmail: joi_1.default.string().required().email(),
    parcelname: joi_1.default.string().required(),
    Date: joi_1.default.string().required(),
    weight: joi_1.default.number().required(),
    lat: joi_1.default.number().required(),
    lng: joi_1.default.number().required(),
    TruckNo: joi_1.default.string().required(),
    TrackingNo: joi_1.default.string().required(),
    Price: joi_1.default.number().required(),
});
