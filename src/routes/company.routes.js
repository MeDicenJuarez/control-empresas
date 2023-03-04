"use strict";

const { Router } = require ("express");
const { createCompany, readCompanys, updateCompany, deleteCompany } = require("../controllers/company.controller");

const api = Router();

api.post("/create-company", createCompany);
api.get("/read-companys", readCompanys);
api.put("/update-company/:id", updateCompany);
api.delete("/delete-company/:id", deleteCompany);

module.exports = api;