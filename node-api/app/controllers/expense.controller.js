const Expense = require("../models/expense.model.js");

// Create and Save a new Expense
exports.create = (req, res) => {
	// Validate the request
	if(!req.body){
		res.status(400).send({
			message: "Content cannot be empty!"
		});
	}
	
	// Create an Expense
	const expense = new Expense({
		title: req.body.title,
		description: req.body.description,
		amount: req.body.amount,
		active: req.body.active
	});
	
	// Save Expense in the database
	Expense.create(expense, (err, data) => {
		if(err){
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Expense."
			});
		} else {
			res.send(data);
		}
	});
};

// Retrieve all Expenses from the database.
exports.findAll = (req, res) => {
	Expense.getAll((err, data) => {
		if(err){
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Expense."
			});
		} else {
			res.send(data);
		}
	});
};

// Find a single Expense with expenseId
exports.findOne = (req, res) => {
	Expense.findById(req.params.expenseId, (err, data) => {
		if(err){
			if(err.kind && err.kind === "not_found"){
				res.status(404).send({
					message: `Not found Expense with id ${req.params.expenseId}.`
				});
			} else {
				res.status(500).send({
					message: "Error retrieving Expense with id "+req.params.expenseId
				});
			}
		} else {
			res.send(data);
		}
	});
};

// Update an Expense identified by the expenseId in the request
exports.update = (req, res) => {
	// Validate the request
	if(!req.body){
		res.status(400).send({
			message: "Content cannot be empty!"
		});
	}
	
	Expense.updateById(
		req.params.expenseId,
		new Expense(req.body),
		(err, data) => {
			if(err){
				if(err.kind && err.kind === "not_found"){
					res.status(404).send({
						message: `Not found Expense with id ${req.params.expenseId}.`
					});
				} else {
					res.status(500).send({
						message: "Error updating Expense with id "+req.params.expenseId
					});
				}
			} else {
				res.send(data);
			}
		}
	);
};

// Delete an Expense identified by the expenseId in the request
exports.delete = (req, res) => {
	Expense.remove(req.params.expenseId, (err, data) => {
		if(err){
			if(err.kind && err.kind === "not_found"){
				res.status(404).send({
					message: `Not found Expense with id ${req.params.expenseId}.`
				});
			} else {
				res.status(500).send({
					message: "Could not delete Expense with id "+req.params.expenseId
				});
			}
		} else {
			res.send({ message: `Expense was deleted successfully!` });
		}
	});
};

// Delete all Expensea from the database.
exports.deleteAll = (req, res) => {
	Expense.removeAll((err, data) => {
		if(err){
			res.status(500).send({
				message: err.message || "Some error occurred while removing all Expenses."
			});
		} else {
			res.send({ message: `All Expenses were deleted successfully!` });
		}
	});
};
