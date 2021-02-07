import React, { Component } from 'react';
import ExpenseDataService from '../services/expense.service';
import { Link } from 'react-router-dom';

export default class ExpenseList extends Component {
	constructor(props){
		super(props);
		
		this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
		this.retrieveExpenses = this.retrieveExpenses.bind(this);
		this.refreshList = this.refreshList.bind(this);
		this.setActiveExpense = this.setActiveExpense.bind(this);
		this.removeAllExpenses = this.removeAllExpenses.bind(this);
		this.searchTitle = this.searchTitle.bind(this);
			
		this.state = {
			searchTitle: "",
			expenses: [],
			currentExpense: null,
			currentIndex: -1
		};
	}
	
	componentDidMount(){
		this.retrieveExpenses();
	}
	
	onChangeSearchTitle(e){
		const searchTitle = e.target.value;
		
		this.setState({
			searchTitle: searchTitle
		});
	}
	
	retrieveExpenses(){
		ExpenseDataService.getAll()
			.then(response => {
				this.setState({
					expenses: response.data
				});
				console.log(response.data);
			})
			.catch(e => {
				console.log(e);
			});
	}
	
	refreshList(){
		this.retrieveExpenses();
		this.setState({
			currentExpense: null,
			currentIndex: -1
		});
	}
	
	setActiveExpense(expense, index){
		this.setState({
			currentExpense: expense,
			currentIndex: index
		});
	}
	
	removeAllExpenses(){
		ExpenseDataService.deleteAll()
		  .then(response => {
			  console.log(response.data);
			  this.refreshList();
		  })
		  .catch(e => {
			  console.log(e);
		  });
	}
	
	searchTitle(){
		ExpenseDataService.findByTitle(this.state.searchTitle)
			.then(response => {
				this.setState({
					expenses: response.data
				});
				console.log(response.data);
			})
			.catch(e => {
				console.log(e);
			});
	}
	
	render(){
		const { searchTitle, expenses, currentExpense, currentIndex } = this.state;
		expenses.map((expense, index) => {
			console.log(expense);
		});
		return (
			<div className="list row">
				<div className="col-md-8">
					<div className="input-group mb-3">
						<input
						  type="text"
						  className="form-control"
						  placeholder="Search by Title"
						  value={searchTitle}
						  onChange={this.onChangeSearchTitle}
						/>
						<div className="input-group-append">
						  <button
						    className="btn btn-outline-secondary"
						    type="button"
						    onClick={this.searchTitle}
						  >
						    Search
						  </button>
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<h4>Expense List</h4>
					<ul className="list-group">
						{expenses &&
						  expenses.map((expense, index) => (
							<li
							  className={
								"list-group-item " +
								(index === currentIndex ? "active" : "")
							  }
							  onClick={() => this.setActiveExpense(expense, index)}
							  key={index}
							>
							  {expense.title}
							</li>
						  ))}
					</ul>
					
					<button
					  className="m-3 btn btn-sm btn-danger"
					  onClick={this.removeAllExpenses}
					>
					  Remove All
					</button>
				</div>
				<div className="col-md-6">
				  {currentExpense ? (
				    <div>
					  <h4>Expense</h4>
					  <div>
					    <label>
						  <strong>Title:</strong>
						</label>{" "}
						{currentExpense.title}
					  </div>
					  <div>
					    <label>
						  <strong>Description:</strong>
						</label>{" "}
						{currentExpense.description}
					  </div>
					  <div>
					    <label>
						  <strong>Amount:</strong>
						</label>{" "}
						{currentExpense.amount}
					  </div>
					  
					  <Link 
						to={"/expenses/" + currentExpense.id}
						className="badge badge-warning"
					  >
					    Edit
					  </Link>
					</div>
				  ) : (
				    <div>
					  <br />
					  <p>Please click on a Expense...</p>
					</div>
				  )}
				</div>
			</div>
		);
	}
}