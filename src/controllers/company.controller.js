"use strict";

const Company = require("../models/company.model");
const bcrypt = require("bcrypt");

//CREATE READ UPDATE DELETE

const createCompany = async (req, res) => {
    const { email, password } = req.body;
    try {
        let company = await Company.findOne({ email: email });
        if (company) {
            return res.status(400).send({
                message: "Correo en uso",
                ok: false,
                company: company,
            });
        }
        company = new Company(req.body);

        //Encriptar password
        const saltarin = bcrypt.genSaltSync();
        company.password = bcrypt.hashSync(password, saltarin);

        //Guardar Company
        company = await company.save();
        res.status(200).send({
            message: `compañía ${company.companyname} creado!!`,
            company,
        });
    } catch (err) {
        throw new Error (err);
    }
};

const readCompanys = async (req, res) => {
    try {
        const companys = await Company.find();

        if (!companys) {
            res.status(404).send({message: "Compañías no disponibles"});
        } else {
            res.status(200).json({ "Empresas Encontradas": companys });
        }
    } catch (err) {
        throw new Error (err);
    }
};

const updateCompany = async (req, res) => {
    try {
        const id = req.params.id;
            const companyEdit = { ...req.body };
            //Encriptar Contraseña
            companyEdit.password = companyEdit.password
            ? bcrypt.hashSync(companyEdit.password, bcrypt.genSaltSync())
            : companyEdit.password;
            const companyComplete = await Company.findByIdAndUpdate(id, companyEdit, {
                new: true,
            });
            if (companyComplete) {
                return res
                    .status(200)
                    .send({ message: "Empresa actualizada!", companyComplete });
            } else {
                res
                    .status(404)
                    .send({ message:"Compañía Inexistente",
                    });
            }
    } catch (err) {
        throw new Error (err);
    }
};

const deleteCompany = async (req, res) => {
    try {
        const id = req.params.id;
        const companyDelete = await Company.findByIdAndDelete(id);
        return res
            .status(200)
            .send({ message: "Empresa Eliminada!", companyDelete });
    } catch (err) {
        throw new Error (err);
    }
};

module.exports = {
    createCompany,
    readCompanys,
    updateCompany,
    deleteCompany,
}