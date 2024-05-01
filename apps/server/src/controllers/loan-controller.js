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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoanOffer = exports.deleteLoanRequest = exports.deleteLoanOffer = exports.updateLoanRequest = exports.updateLoanOffer = exports.createLoanRequest = exports.createLoanOffer = exports.getLoanRequests = exports.getLoanOffers = void 0;
// Segregates db I/O logic from the routes and models 
var Loan = require('../models/loan-model');
// May need to validate things later
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;
// Get all loan offers from DB
var getLoanOffers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var offers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Loan.find({})];
            case 1:
                offers = _a.sent();
                res.status(200).json(offers);
                return [2 /*return*/];
        }
    });
}); };
exports.getLoanOffers = getLoanOffers;
// Get all loan requests from DB
var getLoanRequests = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requests;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Loan.find({})];
            case 1:
                requests = _a.sent();
                res.status(200).json(requests);
                return [2 /*return*/];
        }
    });
}); };
exports.getLoanRequests = getLoanRequests;
// TODO: Define CRUD operation for uploading a single loan offer
var createLoanOffer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
exports.createLoanOffer = createLoanOffer;
// TODO: Define CRUD operation for uploading a single loan request
var createLoanRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
exports.createLoanRequest = createLoanRequest;
// TODO: Define CRUD operation for updating a loan offer by ID
var updateLoanOffer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
exports.updateLoanOffer = updateLoanOffer;
// TODO: Define CRUD operation for updating a loan request by ID
var updateLoanRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
exports.updateLoanRequest = updateLoanRequest;
// TODO: Define CRUD operation for deleting a loan offer by ID
var deleteLoanOffer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
exports.deleteLoanOffer = deleteLoanOffer;
// TODO: Define CRUD operation for deleting a loan request by ID
var deleteLoanRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
exports.deleteLoanRequest = deleteLoanRequest;
// TODO: Define CRUD operation to get a single loan offer's info
var getLoanOffer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
exports.getLoanOffer = getLoanOffer;
