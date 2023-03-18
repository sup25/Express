const express = require('express')
const router = express.Router();
const employeesController = require('../../controllers/employeesController')

router.route('/')
    //chain different http methods
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee);

//show parameter directly at url
router.route('/:id')
    .get(employeesController.getEmployee)

module.exports = router