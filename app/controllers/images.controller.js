const config = require('../../config/config');
const express = require("express");
const news = require("../models/content_news");
const imgdb = require("../models/content_image");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
const { Op } = require('sequelize');
const Sequelize = require('../../config/mysql');
const uuidv1 = require('uuid/v1');

// Upload Image
uploadImage = async (files) => {
    if (files.image != null) {
        var fileExtention = files.image.name.split(".")[1];
        var nameImg = `${uuidv1()}.${fileExtention}`;
        var newpath =

        path.resolve(`public/${nameImg}`);
            // path.resolve(process.cwd() + "/uploaded/images/") + "/" + nameImg;
        if (fs.exists(newpath)) {
            await fs.remove(newpath);
        }
        await fs.moveSync(files.image.path, newpath);
        return nameImg;
    }
};


exports.postImg = async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (error, fields, files) => {
            let result = await uploadImage(files);
            res.json({
                message: result,
                imgname: files.image.name,
                size: files.image.size,
                type: files.image.type
            });
        })
    } catch (err) {
        next(err);
    }
};


exports.postDb = async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (error, fields, files) => {
            let result = await imgdb.create(fields)
            res.json(result)
        })
    } catch (error) {
        res.json(error) ;
    }
};



exports.findIdHeader = async (req, res, next) => {
    try {
        const allImg = []
        const { count, rows } = await imgdb.findAndCountAll({
            where: {
                event_id: req.params.id,
                image_header: 1
            }
        })
        for (i = 0; i < count; i++) {
            allImg.push(rows[i].image_storage)
        }
        data = {
            "img_header": allImg,
        }
        res.json(data)
    } catch (err) {
        next(err);
    }
};


exports.findIdAll = async (req, res, next) => {
    try {
        const allImg = []
        const { count, rows } = await imgdb.findAndCountAll({
            where: {
                event_id: req.params.id,
                image_header: 0
            }
        })
        for (i = 0; i < count; i++) {
            allImg.push(rows[i].image_storage)
        }
        data = {
            "img_all": allImg,
        }
        res.json(data)
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        await fs.remove ( path.resolve(`public/${ req.params.id}`) )
        await imgdb.destroy({ where: { image_storage: req.params.id } }).then(results => res.json(results)).catch(err => next(err));
    } catch (err) {
        next(err);
    }
};

