import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import './App.css';

import AddExpense from './components/add-expense.component.js';
import Expense from './components/expense.component.js';
import ExpenseList from './components/expense-list.component.js';

class App extends Component {
  render(){
	return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
		<a href="/expenses" className="navbar-brand">
			Navin
		</a>
		<div className="navbar-nav mr-auto">
			<li className="nav-item">
				<Link to={"/expenses"} className="nav-link">Expenses</Link>
			</li>
			<li className="nav-item">
				<Link to={"/add"} className="nav-link">Add</Link>
			</li>
		</div>
	  </nav>
	  
	  <div className="container mt-3">
		<Switch>
			<Route exact path={["/", "/expenses"]} component={ExpenseList} />
			<Route exact path="/add" component={AddExpense} />
			<Route exact path="/expenses/:id" component={Expense} />
		</Switch>
	  </div>
    </div>
    );
  }
}

export default App;
