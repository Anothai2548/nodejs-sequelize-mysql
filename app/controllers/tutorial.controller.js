const db = require("../module/")
const Tutorial = db.tutorial
const Op = db.Sequelize.Op

exports.create = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({massage: "Content can't to be empty!"})

        return
    } 
    
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    Tutorial.create(tutorial)

    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({massage: "Some error occurred while creating the Tutorial."})
    })
}

exports.findAll = (req, res) => {
    const title = req.body.title
    var condition = title ? {title: {[Op.like]: `%${title}%`}} : null

    Tutorial.findAll({where : condition})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({massage: err.meassage || "Some error occurred!"})
        })
}

exports.findAllPublished = (req, res) => {
    Tutorial.findAll({where: {published: true}})

    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({massage: "Error 500"})
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id

    Tutorial.findByPk(id)

    .then(data => {
            
        if(data) {
            res.send(data)
        } else {
            res.status(404).send({massage: `Error 404 not found with id = ${id}.`})
        }
    })
    .catch(err => {
        res.status(500).send({massage: err.massage || `Error 500 with id = ${id}.`})
    })
}

exports.update = (req, res) => {
    const id = req.params.id

    Tutorial.update(req.body, {where: {id : id}})

    .then(num => {

        if(num == 1) {
            res.send({massage: "Tutorial was updated successfuly."})
        } else {
            res.send({massage: `Can't update Tutorial with id = ${id}. Maybe Tutorial was not found or res.body is empty`})
        }
    })
    .catch(err => {
        res.status(500).send({massage: `Error updateing Tutorial with id = ${id}.`})
    })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Tutorial.destroy({where: {id : id}})

    .then(num => {

        if(num == 1) {
            res.send({massage: "Tutorial was deleted successfuly."})
        } else {
            res.send({massage: `Can't delete Tutorial with id = ${id}. Maybe Tutorial was not found.`})
        }
    })
    .catch(err => {
        res.status(500).send({massage: `Error delete Tutorial with id = ${id}.`})
    })
}

exports.deleteAll = (req, res) => {
    Tutorial.destroy({where: {}, truncate: false})

    .then(nums => {
        res.send({massage: `${nums} Tutorials were deleted successfully!`})
    })
    .catch(err => {
        res.status(500).send({massage: err.message || "Some error occurred while removing all tutorials."})
    })
}