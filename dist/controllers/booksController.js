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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBook = exports.getBooks = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield prisma.book.findMany();
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch books" });
    }
});
exports.getBooks = getBooks;
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, description, publisher } = req.body;
        const newBook = yield prisma.book.create({
            data: { title, author, description, publisher },
        });
        res.status(201).json(newBook);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to add book" });
    }
});
exports.addBook = addBook;
