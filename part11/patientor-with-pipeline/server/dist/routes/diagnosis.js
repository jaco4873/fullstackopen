"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosisService_1 = __importDefault(require("../services/diagnosisService"));
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(diagnosisService_1.default.getDiagnoses());
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const diagnosis = diagnosisService_1.default.getDiagnosisByCode(id);
    res.send(diagnosis);
});
exports.default = router;
