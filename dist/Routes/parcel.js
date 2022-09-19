"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parcelController_1 = require("../Controllers/parcelController");
const verifyToken_1 = require("../Middleware/verifyToken");
const routers = (0, express_1.Router)();
routers.post('/add', verifyToken_1.VerifyToken, parcelController_1.addParcel);
routers.get('/sentparcels/:Senderemail', parcelController_1.getsentParcels);
routers.get('/receivedparcels/:RecepientEmail', parcelController_1.getrecievedParcels);
routers.put('/edit/:id', parcelController_1.editParcel);
routers.get('/get', verifyToken_1.VerifyToken, parcelController_1.getAllParcels);
routers.put('/update/:id', parcelController_1.updateDelivered);
routers.delete('/delete/:id', parcelController_1.deleteParcel);
routers.post('/sent/:id', parcelController_1.updatesent);
routers.get('/:id', parcelController_1.getParcel);
exports.default = routers;
