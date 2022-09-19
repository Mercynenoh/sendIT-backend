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
exports.getrecievedParcels = exports.getsentParcels = exports.getAllParcels = exports.updatesent = exports.deleteParcel = exports.updateDelivered = exports.getParcel = exports.editParcel = exports.addParcel = void 0;
const mssql_1 = require("mssql");
const database_1 = __importDefault(require("../DatabaseHelpers/database"));
const parcelvalidator_1 = require("../Helper/parcelvalidator");
const db = new database_1.default();
const addParcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, Adress, Senderemail, RecepientEmail, parcelname, weight, Date, lat, lng, TruckNo, TrackingNo, Price } = req.body;
        const { error, value } = parcelvalidator_1.parcelSchema.validate(req.body);
        if (error) {
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
        }
        db.exec('insertUpdateParcel', { id, Adress, Senderemail, RecepientEmail, parcelname, weight, Date, lat, lng, TruckNo, TrackingNo, Price });
        res.status(200).json({ message: 'Parcel Inserted Successfully' });
    }
    catch (error) {
        console.log(error);
        if (error instanceof mssql_1.RequestError) {
            res.status(400).json({ message: error.message });
        }
    }
});
exports.addParcel = addParcel;
const editParcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { Adress, Senderemail, RecepientEmail, parcelname, weight, Date, lat, lng, TruckNo, TrackingNo, Price } = req.body;
        const { recordset } = yield db.exec("getOneParcel", { id });
        if (!recordset[0]) {
            res.status(404).json({ message: "Parcel Not Found" });
        }
        else {
            db.exec('insertUpdateParcel', { id, Adress, Senderemail, RecepientEmail, parcelname, weight, Date, lat, lng, TruckNo, TrackingNo, Price });
            res.json({ message: 'Parcel updated Successfully' });
        }
    }
    catch (error) {
        res.status(400).json({ message: "Parcel Not Found" });
    }
});
exports.editParcel = editParcel;
const getParcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { recordset } = yield db.exec('getOneParcel', { id });
        if (!recordset[0]) {
            res.status(400).json({ message: "No Parcels Found!" });
        }
        else {
            res.status(200).json(recordset);
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getParcel = getParcel;
const updateDelivered = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { recordset } = yield db.exec('updateParcel', { id });
        return res.json({ message: 'Updated...' });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.updateDelivered = updateDelivered;
const deleteParcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { recordset } = yield db.exec('deleteParcel', { id });
        return res.json({ message: 'deleted successfully' });
    }
    catch (error) {
        if (error instanceof mssql_1.RequestError) {
            res.json({ message: error.message });
        }
    }
});
exports.deleteParcel = deleteParcel;
const updatesent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { recordset } = yield db.exec('updateSent', { id });
        return res.json({ message: 'Updated...' });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.updatesent = updatesent;
const getAllParcels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { recordset } = yield db.exec('getallParcels');
        res.status(200).json(recordset);
    }
    catch (error) {
        res.status(400).json({ message: "No Parcels Found!" });
    }
});
exports.getAllParcels = getAllParcels;
const getsentParcels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Senderemail = req.params.Senderemail;
        const { recordset } = yield db.exec('getsentParcels', { Senderemail });
        res.status(200).json(recordset);
    }
    catch (error) {
        res.status(400).json({ message: "No Parcels Found!" });
    }
});
exports.getsentParcels = getsentParcels;
const getrecievedParcels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const RecepientEmail = req.params.RecepientEmail;
        const { recordset } = yield db.exec('getReceivedParcels', { RecepientEmail });
        res.status(200).json(recordset);
    }
    catch (error) {
        res.status(400).json({ message: "No Parcels Found!" });
    }
});
exports.getrecievedParcels = getrecievedParcels;
