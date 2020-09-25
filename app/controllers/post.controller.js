const config = require('../../config/config');
const express = require("express");
const news = require("../models/content_news");
const image = require("../models/content_image");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
const { Op } = require('sequelize');
const Sequelize = require('../../config/mysql');

exports.findId = (req, res, next) => {
    try {
        news.findByPk(req.params.id).then(results => res.json(results)).catch(err => next(err));
    } catch (err) {
        next(err);
    }
};

exports.find = (req, res, next) => {
    try {
        news.findAll({
            where: {

                active: {
                    [Op.or]: [1, 2]
                },
            },
            order: Sequelize.literal("published_date DESC"),
            limit: 50,


        }).then(results => res.json(results)).catch(err => next(err));

    } catch (err) {
        next(err);
    }
};

exports.findJob = (req, res, next) => {
    try {
        news.findAll({
            where: {
                active: {
                    [Op.or]: [3, 4]
                },
            },
            order: [
                ['active', 'ASC'],
                ['post_date', 'DESC'],

            ],

            limit: 50,


        }).then(results => {
            console.log(JSON.stringify(news))
            res.json(results)

        }).catch(err => next(err));

    } catch (err) {
        next(err);
    }
};



exports.findSetting = (req, res, next) => {

    try {
        news.findAll({
            where: {
                active: 5
            },
    
        }).then(results => {

            res.json(results)

        }).catch(err => next(err));

    } catch (err) {
        next(err);
    }
};



exports.add = async (req, res) => {

    try {
        console.log(req.body.published_date )
        let fields = req.body || {};
        console.log( fields)
        let result = await news.create(fields)
        res.json({
            message: JSON.stringify(result.event_id)
        });

    } catch (error) {
        res.json(error);
    }

};


exports.findContentId = (req, res) => {


    try {
        let result = news.findOne({ where: { event_id: req.params.id } })
        if (result) {
            res.json(result)
        } else {
            res.json({});
        }
    } catch (error) {
        res.json({});
    }
};

exports.updateContent = (req, res) => {
    try {
        var form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            let result = news.update(fields, { where: { event_id: fields.id } });
            res.json(result);
        });
    } catch (err) {
        res.json(err);
    }
};


exports.deleteContent = async (req, res) => {
    try {
        const { id } = req.params
        const rows = await image.findAll({ where: { event_id: id } })
        for (i = 0; i < rows.length; i++) {
            // await fs.remove(__dirname + "/uploaded/images/" + rows[i].image_storage)
            const img_number = JSON.stringify(rows[i].image_id)
            await image.update({ active: 0 }, { where: { image_id: img_number } })
        }
        const result = await news.update({ active: 0 }, { where: { event_id: id } })
        // await image.destroy({ where: { event_id: id } })
        // result = await news.destroy({ where: { event_id: id } });

        res.json(result);
    } catch (err) {
        res.json(err);
    }
};


exports.getType = async (req, res) => {
    const { id } = req.params
    const attr = req.params.id
    try {

        if (attr == "com_news") {

            let result = await news.findAll({
                where: {
                    com_news: 1,
                    active: {
                        [Op.or]: [1, 2]
                    }
                },
                limit: 50
            })

            if (result) {
                res.json(result)

            } else {
                res.json({});
            }

        }
        if (attr == "csr") {

            let result = await news.findAll({
                where: {
                    csr: 1,
                    active: {
                        [Op.or]: [1, 2]
                    }
                }
            })
            if (result) {
                res.json(result)
            } else {
                res.json({});
            }

        }
        if (attr == "events") {

            let result = await news.findAll({
                where: {
                    events: 1,
                    active: {
                        [Op.or]: [1, 2]
                    }
                }
            })
            if (result) {
                res.json(result)
            } else {
                res.json({});
            }
        }

    } catch (error) {
        res.json({});
    }

};


exports.updateType = async (req, res) => {
    try {
        var form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            var attr = fields.type
            if (attr == "com_news") {
                await news.update({ active: 1 }, { where: { com_news: 1 } })
                let result = await news.update({ active: 2 }, { where: { event_id: fields.id } })
                if (result) {
                    res.json(result)

                } else {
                    res.json({});
                }

            }
            if (attr == "csr") {
                await news.update({ active: 1 }, { where: { csr: 1 } })
                let result = await news.update({ active: 2 }, { where: { event_id: fields.id } })
                if (result) {
                    res.json(result)
                } else {
                    res.json({});
                }

            }
            if (attr == "events") {
                await news.update({ active: 1 }, { where: { events: 1 } })
                let result = await news.update({ active: 2 }, { where: { event_id: fields.id } })
                if (result) {
                    res.json(result)
                } else {
                    res.json({});
                }
            }


        });
    } catch (err) {
        res.json(err);
    }
};



exports.getMain = async (req, res, next) => {
    try {
        let com_news = await news.findAll({ where: [{ active: 2 }, { com_news: 1 }] })
        let csr = await news.findAll({ where: [{ active: 2 }, { csr: 1 }] })
        let event = await news.findAll({ where: [{ active: 2 }, { events: 1 }] })
        let result = [];
        result.push(com_news)
        result.push(csr)
        result.push(event)
        res.json(result);
    } catch (err) {
        next(err);
    }
};


exports.updateAuto = async (req, res) => {
    try {
        //Auto company _news 
        const count = await news.count({
            where: [{ active: 2 }, { com_news: 1 }]
        });
        if (count == 0) {
            let result = await news.findOne({
                attributes: [
                    'event_id'
                ],
                where: [{
                    published_date: {
                        [Op.lte]: new Date()
                    },
                }, { active: 1 }, { com_news: 1 }],
                order: Sequelize.literal("published_date DESC")

            })
            let id = JSON.stringify(result.event_id)
            await news.update({ active: 2 }, { where: { event_id: id } })
        }

        // // Auto Company _ CSR 
        const count1 = await news.count({
            where: [{ active: 2 }, { csr: 1 }]
        });
        if (count1 == 0) {
            let result = await news.findOne({
                attributes: [
                    'event_id'
                ],
                where: [{
                    published_date: {
                        [Op.lte]: new Date()
                    },
                }, { active: 1 }, { csr: 1 }],
                order: Sequelize.literal("published_date DESC")

            })
            let id = JSON.stringify(result.event_id)
            await news.update({ active: 2 }, { where: { event_id: id } })
        }

        // // Auto Company Event 
        const count2 = await news.count({
            where: [{ active: 2 }, { events: 1 }]
        });
        if (count2 == 0) {
            let result = await news.findOne({
                attributes: [
                    'event_id'
                ],
                where: [{
                    published_date: {
                        [Op.lte]: new Date()
                    },
                }, { active: 1 }, { events: 1 }],
                order: Sequelize.literal("published_date DESC")
            })
            let id = JSON.stringify(result.event_id)
            await news.update({ active: 2 }, { where: { event_id: id } })
        }
        res.json();

    } catch (err) {
        res.json(err);
    }


};



exports.getkeyword = async (req, res) => {
    const { keyword } = req.params;
    try {
        let result = await news.findAll({

            where: {
                [Op.or]: [
                    {
                        event_name_en: {
                            [Op.like]: `%${keyword}%`
                        },

                    },
                    {
                        event_name_th: { [Op.like]: `%${keyword}%` }
                    },
                ],
                [Op.and]: [
                    {
                        active: {
                            [Op.or]: [1, 2]
                        },

                    },

                ],


            }
        });
        res.json(result);
    } catch (error) {
        res.json({});
    }
};

exports.getkeywordType = async (req, res) => {
    const keyword = req.params.keyword;
    try {
        if (req.params.type == "com_news") {
            let result = await news.findAll({

                where: {
                    [Op.or]: [
                        {
                            event_name_en: {
                                [Op.like]: `%${keyword}%`
                            },

                        },
                        {
                            event_name_th: { [Op.like]: `%${keyword}%` }
                        },
                    ],
                    [Op.and]: [

                        {
                            active: { [Op.or]: [1, 2] }
                        },
                        {
                            com_news: 1
                        }

                    ],


                }
            });
            res.json(result);
        }
        if (req.params.type == "csr") {

            let result = await news.findAll({

                where: {
                    [Op.or]: [
                        {
                            event_name_en: {
                                [Op.like]: `%${keyword}%`
                            },

                        },
                        {
                            event_name_th: { [Op.like]: `%${keyword}%` }
                        },
                    ],
                    [Op.and]: [

                        {
                            active: { [Op.or]: [1, 2] }
                        },
                        {
                            csr: 1
                        }

                    ],


                }
            });
            res.json(result);
        }
        if (req.params.type == "events") {
            let result = await news.findAll({

                where: {
                    [Op.or]: [
                        {
                            event_name_en: {
                                [Op.like]: `%${keyword}%`
                            },

                        },
                        {
                            event_name_th: { [Op.like]: `%${keyword}%` }
                        },
                    ],
                    [Op.and]: [

                        {
                            active: { [Op.or]: [1, 2] }
                        },
                        {
                            events: 1
                        }

                    ],


                }
            });
            res.json(result);
        }


    } catch (error) {
        res.json({});
    }
};

exports.getLast = async (req, res) => {
    try {
        let result = await news.findAll({
            where: {
                published_date: {
                    [Op.lte]: new Date()
                },

                active: {
                    [Op.or]: [1, 2]
                },

            }, order: Sequelize.literal("published_date DESC")
            , limit: 20
        })
        res.json(result)
    } catch (error) {

    }

};


exports.getCsr = async (req, res) => {
    try {
        let result = await news.findAll({
            where: {
                published_date: {
                    [Op.lte]: new Date()
                },
                active: {
                    [Op.or]: [1, 2]
                },
                csr: 1

            }, order: Sequelize.literal("published_date DESC")
            , limit: 20
        })

        res.json(result);

    } catch (error) {

    }

};


exports.getNews = async (req, res) => {
    try {
        let result = await news.findAll({
            where: {
                published_date: {
                    [Op.lte]: new Date()
                },
                active: {
                    [Op.or]: [1, 2]
                },
                com_news: 1

            }, order: Sequelize.literal("published_date DESC")
            , limit: 20
        })

        res.json(result);

    } catch (error) {

    }

};
exports.getEvents = async (req, res) => {
    try {
        let result = await news.findAll({
            where: {
                published_date: {
                    [Op.lte]: new Date()
                },
                active: {
                    [Op.or]: [1, 2]
                },
                events: 1

            }, order: Sequelize.literal("published_date DESC")
            , limit: 20
        })

        res.json(result);

    } catch (error) {

    }

};


exports.getRecent = async (req, res) => {
    try {
        let result = await news.findAll({
            where: {
                published_date: {
                    [Op.lte]: new Date()
                },
                active: {
                    [Op.or]: [1, 2]
                },


            }, order: Sequelize.literal("published_date DESC")
            , limit: 5
        })
        res.json(result);

    } catch (error) {

    }

};



exports.getMonth = async (req, res) => {
    let min = await news.findAll({
        attributes: [[Sequelize.fn('min', Sequelize.col('published_date')), 'date']],
    });

    let max = await news.findAll({
        attributes: [[Sequelize.fn('max', Sequelize.col('published_date')), 'date']],
    });
    var a = min[0].dataValues.date.split("-");
    var b = max[0].dataValues.date.split("-");
    var findValue = parseInt(b[0]) - parseInt(a[0]) + 1
    var findMonth = [];
    for (let i = 0; i < findValue; i++) {
        let month = await news.findAll({
            attributes: [[Sequelize.fn('month', Sequelize.col('published_date')), 'month']],
            where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('published_date')), parseInt(a[0]) + i)
        });
        const allMonth = [];
        for (let i = 0; i < month.length; i++) {
            allMonth.push(month[i].dataValues.month)
        }

        let c = Array.from(new Set(allMonth))
        let s = c.sort()
        findMonth.push(s)

    }

    res.json(findMonth);
};


exports.getStart = async (req, res) => {
    let min = await news.findAll({
        attributes: [[Sequelize.fn('min', Sequelize.col('published_date')), 'date']],

    });
    var a = min[0].dataValues.date.split("-");
    res.json(a);
};
exports.getEnd = async (req, res) => {
    let min = await news.findAll({
        attributes: [[Sequelize.fn('max', Sequelize.col('published_date')), 'date']]
    });
    var a = min[0].dataValues.date.split("-");
    res.json(a);
};

exports.getYear = async (req, res) => {
    let month = await news.findAll({
        where: {

            published_date: {
                [Op.and]: [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('published_date')), req.params.y.split(',')[0])


                    , Sequelize.where(Sequelize.fn('month', Sequelize.col('published_date')), req.params.y.split(',')[1])]
            }
        }
    });
    res.json(month);
};


exports.getPostYear = async (req, res) => {
    try {
        let month = await news.findAll({
            where: {
                published_date: {
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('published_date')), req.params.y.split(',')[0])
                        , Sequelize.where(Sequelize.fn('month', Sequelize.col('published_date')), req.params.y.split(',')[1]),

                    ]

                },
                active: { [Op.or]: [1, 2] }
            }
        });

        ckmonth = []
        for (let i = 0; i < month.length; i++) {
            ckmonth.push(new Date(month[i].dataValues['published_date']) <= new Date())
        }
        res.json({
            month: month, date: ckmonth
        }
        );

    } catch (error) {
        res.json({});
    }

};



exports.getByDate = async (req, res) => {

    const { id } = req.params

    try {
        let result = await news.findAll({ where: { published_date: req.params.id } })
        if (result) {
            res.json(result)
        } else {
            res.json({});
        }

    } catch (error) {
        res.json({});
    }


};

exports.getType = async (req, res) => {

    const { id } = req.params
    const attr = req.params.id
    try {

        if (attr == "com_news") {

            let result = await news.findAll({
                where: {
                    published_date: {
                        [Op.lte]: new Date()
                    },
                    com_news: 1,
                    active: {
                        [Op.or]: [1, 2]
                    },
                    published_date: {
                        [Op.lte]: new Date()
                    }
                },
                limit: 50
            })

            if (result) {
                res.json(result)

            } else {
                res.json({});
            }

        }
        if (attr == "csr") {

            let result = await news.findAll({
                where: {
                    published_date: {
                        [Op.lte]: new Date()
                    },
                    csr: 1,
                    active: {
                        [Op.or]: [1, 2]
                    }, published_date: {
                        [Op.lte]: new Date()
                    }
                }
            })
            if (result) {
                res.json(result)
            } else {
                res.json({});
            }

        }
        if (attr == "events") {

            let result = await news.findAll({
                where: {
                    published_date: {
                        [Op.lte]: new Date()
                    },
                    events: 1,
                    active: {
                        [Op.or]: [1, 2]
                    }, published_date: {
                        [Op.lte]: new Date()
                    }
                }
            })
            if (result) {
                res.json(result)
            } else {
                res.json({});
            }
        }

    } catch (error) {
        res.json({});
    }


};


exports.getByDateType = async (req, res) => {

    const keyword = req.params.keyword;
    try {
        if (req.params.type == "com_news") {
            let result = await news.findAll({

                where: {

                    [Op.and]: [
                        {
                            "published_date": keyword

                        },
                        {
                            active: { [Op.or]: [1, 2] }
                        },
                        {
                            com_news: 1
                        }

                    ],


                }
            });
            res.json(result);
        }
        if (req.params.type == "csr") {
            let result = await news.findAll({

                where: {

                    [Op.and]: [
                        {
                            "published_date": keyword

                        },
                        {
                            active: { [Op.or]: [1, 2] }
                        },
                        {
                            csr: 1
                        }

                    ],


                }
            });
            res.json(result);
        }
        if (req.params.type == "events") {
            let result = await news.findAll({

                where: {

                    [Op.and]: [
                        {
                            "published_date": keyword

                        },
                        {
                            active: { [Op.or]: [1, 2] }
                        },
                        {
                            events: 1
                        }

                    ],


                }
            });
            res.json(result);
        }


    } catch (error) {
        res.json({});
    }




};

exports.getkeywordJob = async (req, res) => {
    const { keyword } = req.params;
    try {
        let result = await news.findAll({

            where: {
                [Op.or]: [
                    {
                        event_name_en: {
                            [Op.like]: `%${keyword}%`
                        },

                    },
                    {
                        event_name_th: { [Op.like]: `%${keyword}%` }
                    },
                ],
                [Op.and]: [
                    {
                        active: {
                            [Op.or]: [3, 4]
                        },

                    },

                ],


            }
        });
        res.json(result);
    } catch (error) {
        res.json({});
    }
};
