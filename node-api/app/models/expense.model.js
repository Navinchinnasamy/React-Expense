const conn = require("./db.js");

// Constructor
const Expense = function(expense){
	this.title = expense.title,
	this.description = expense.description,
	this.amount = expense.amount,
	this.active = expense.active
};

Expense.create = (newExpense, result) => {
	conn.query("INSERT INTO expenses SET ?", newExpense, (err, res) => {
		if(err){
			console.log(err);
			result(err, null);
			return;
		}
		
		console.log("created expense: ", { id: res.insertId, ...newExpense });
		result(null, { id: res.insertId, ...newExpense });
	});
};

Expense.findById = (expenseId, result) => {
	conn.query(`SELECT * FROM expenses WHERE id = ${expenseId}`, (err, res) => {
		if(err){
			console.log(err);
			result(err, null);
			return;
		}
		
		if(res.length){
			console.log("Found Expense: ", res[0]);
			result(null, res[0]);
			return;
		}
		
		// Not found Expense with the id
		result({ kind: "not_found" }, null);
	});
};

Expense.getAll = result => {
	conn.query("SELECT * FROM expenses", (err, res) => {
		if(err){
			console.log(err);
			result(err, null);
			return;
		}
		
		console.log("Expenses: ", res);
		result(null, res);
	});
};

Expense.updateById = (id, expense, result) => {
	conn.query(
		"UPDATE expenses SET title = ?, description = ?, amount = ? WHERE id = ?", 
		[expense.title, expense.description, expense.amount, expense.id],
		(err, res) => {
			if(err){
				console.log(err);
				result(err, null);
				return;
			}
			
			if(res.affectedRows == 0){
				// not found expense with the id
				console.log(res);
				result({ kind: "not_found" }, null);
				return;
			}
			
			console.log("Updated Expense: ", { id: id, ...expense});
			result(null, {id: id, ...expense});
		}
	);
};

Expense.remove = (id, result) => {
	conn.query("DELETE FROM expenses WHERE id = ?", id, (err, res) => {
		if(err){
			console.log(err);
			result(err, null);
			return;
		}
		
		if(res.affectedRows == 0){
			// not found expense with the id
			result({ kind: "not_found" }, null);
			return;
		}
		
		console.log("Deleted Expense with id: ", id);
		result(null, res);
	});
};

Expense.removeAll = result => {
	conn.query("DELETE FROM expenses", (err, res) => {
		if(err){
			console.log(err);
			result(err, null);
			return;
		}
		
		console.log(`Deleted ${res.affectedRows} Expenses`);
		result(null, res);
	});
};

module.exports = Expense;