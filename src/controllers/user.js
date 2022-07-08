const db = require('../models');
const { Op }= require('sequelize');

//-----------GET LIST OF ALL THE USERS-------------------------
exports.getAllUsers = async (req, res) => {
    const user = await db.User.findAll();
    try {
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  //----------GET EMPLOYEE DETAILS BY ID-------------------
exports.getUsersById = async (req, res) => {
  try {
    let id = Number(req.params.id);
    let data = await db.User.findAll({where:{id: id}});   
    if (data) {
      res.status(200).send({
        message: `Employee details wrt to id ${id}`,
        data,
      });
    } else {
      res.status(404).send({
        message: `No Employee found with id ${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({ message: `Error retriving with id ${id}` }, error);
  }
};

/* CREATE EMPLOYEE -- Check whether the employee is already registered & if employee is already registered,
then return a message, else create a new employee in the database.   */
exports.createUsers = async (req, res) => {
  try {
    const existingUser = await db.User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return res.status(409).send({ message: "Employee already registered" });
    }
    try {
      const data = {
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email,
      };
      let user = await db.User.create(data);
      return res.status(201).json({
        message: "Employee added to database successfully",
        result: user,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//-------------UPDATE EMPLOYEE DETAILS--------------------------
exports.updateUsers = async (req, res) => {
  try {
    let id = req.params.id;
    //let body = req.body;
    let body = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };
    let user = await db.User.update(body, {
      where: { id: id },
    });
    return res.status(201).json({
      message: "Users details updated",
      result: body,
    });
  } catch (error) {
    res.status(500).send({ message: "Unable to update" }, error);
  }
};

//---------------DELETE AN EMPLOYEE BY IT'S ID, IF FOUND-------------
exports.deleteUsers = async (req, res) => {
  try {
    const existingUser = await db.User.findByPk(req.params.id);
    if (!existingUser) {
      return res
        .status(404)
        .send({ message: "User not found with given id" });
    }
    try {
      let data = await User.destroy({
        where: { id: req.params.id },
      });
      return res.status(200).send({ message: "deleted" });
    } catch (error) {
      res.status(500).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};


