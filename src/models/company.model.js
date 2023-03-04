"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = ({
    companyname: {
        type: String,
        required: true
    },
    email: String,
    password: String,
    rol: String,
});

module.exports = mongoose.model("companys", CompanySchema);
