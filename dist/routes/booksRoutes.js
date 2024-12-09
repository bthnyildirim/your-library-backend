"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booksController_1 = require("../controllers/booksController");
const router = express_1.default.Router();
exports.bookRoutes = router;
router.get("/", booksController_1.getBooks); // Get all books
router.post("/", booksController_1.addBook); // Add a new book
