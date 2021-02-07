module.exports = router => {
	const expenses = require("../controllers/expense.controller.js");
	
	// Create a new Expense
	router.post("/expenses", expenses.create);
	
	// Retrieve all Expenses
	router.get("/expenses", expenses.findAll);
	
	// Retrieve a single Expense with expenseId
	router.get("/expenses/:expenseId", expenses.findOne);
	
	// Update an Expense with expenseId
	router.put("/expenses/:expenseId", expenses.update);
	
	// Delete an Expense with expenseId
	router.delete("/expenses/:expenseId", expenses.delete);
	
	// Delete all Expenses
	router.delete("/expenses", expenses.deleteAll);
};