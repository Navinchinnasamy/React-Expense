import React, { Component } from 'react';
import ExpenseDataService from '../services/expense.service';

export default class AddExpense extends Component {
	constructor(props){
		super(props);
		
		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeAmount = this.onChangeAmount.bind(this);
		this.saveExpense = this.saveExpense.bind(this);
		this.newExpense = this.newExpense.bind(this);
		
		this.state = {
			id: null,
			title: "",
			description: "",
			amount: 0,
			submitted: false
		};
	}
	
	onChangeTitle(e){
		this.setState({
			title: e.target.value
		});
	}
	
	onChangeDescription(e){
		this.setState({
			description: e.target.value
		});
	}
	
	onChangeAmount(e){
		this.setState({
			amount: e.target.value
		});
	}
	
	saveExpense(){
		var data = {
			title: this.state.title,
			description: this.state.description,
			amount: this.state.amount
		};
		
		ExpenseDataService.create(data)
			.then(response => {
				this.setState({
					id: response.data.id,
					title: response.data.title,
					description: response.data.description,
					amount: response.data.amount,
					submitted: true
				});
				console.log(response.data);
			}).catch(e => {
				console.log(e);
			});
	}
	
	newExpense(){
		console.log("Add new Button clicked");
		this.setState({
			id: null,
			title: "",
			description: "",
			amount: 0,
			submitted: false
		});
	}
	
	render(){
		return (
			<div className="submit-form">
			{this.state.submitted ? (
				<div>
				  <h4>You submitted successfully!</h4>
				  <button className="btn btn-success" onClick={this.newExpense}>
				    Add Expense
				  </button>
				</div>
			  ) : (
			    <div>
				  <div className="form-group">
				    <label htmlFor="title">Title</label>
					<input 
					  type="text"
					  className="form-control"
					  id="title"
					  required
					  value={this.state.title}
					  name="title"
					  onChange={this.onChangeTitle}
					/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="description">Description</label>
					<input 
					  type="text"
					  className="form-control"
					  id="description"
					  required
					  value={this.state.description}
					  name="description"
					  onChange={this.onChangeDescription}
					/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="amount">Amount</label>
					<input 
					  type="text"
					  className="form-control"
					  id="amount"
					  required
					  value={this.state.amount}
					  name="amount"
					  onChange={this.onChangeAmount}
					/>
				  </div>
				  
				  <button onClick={this.saveExpense} className="btn btn-success">
				    Submit
				  </button>
				</div>
			  )}
			</div>
		);
	}
}