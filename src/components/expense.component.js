import React, { Component } from 'react';
import ExpenseDataService from '../services/expense.service';
import { Link } from 'react-router-dom';

export default class Expense extends Component {
	constructor(props){
		super(props);
		
		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeAmount = this.onChangeAmount.bind(this);
		this.getExpense = this.getExpense.bind(this);
		this.updateExpense = this.updateExpense.bind(this);
		this.deleteExpense = this.deleteExpense.bind(this);
			
		this.state = {
			currentExpense: {
				id: null,
				title: "",
				description: "",
				amount: 0
			},
			message: ""
		};
	}
	
	componentDidMount(){
		this.getExpense(this.props.match.params.id);
	}
	
	onChangeTitle(e){
		const title = e.target.value;
		
		this.setState(function(prevState){
			return {
				currentExpense: {
					...prevState.currentExpense,
					title: title
				}
			};
		});
	}
	
	onChangeDescription(e){
		const description = e.target.value;
		
		this.setState(function(prevState){
			return {
				currentExpense: {
					...prevState.currentExpense,
					description: description
				}
			};
		});
	}
	
	onChangeAmount(e){
		const amount = e.target.value;
		
		this.setState(function(prevState){
			return {
				currentExpense: {
					...prevState.currentExpense,
					amount: amount
				}
			};
		});
	}
	
	getExpense(id) {
		ExpenseDataService.get(id)
			.then(response => {
				this.setState({
					currentExpense: response.data
				});
				console.log(response.data);
			})
			.catch(e => {
				console.log(e);
			});
	}
	
	updateExpense(){
		ExpenseDataService.update(
			this.state.currentExpense.id,
			this.state.currentExpense
		)
		.then(response => {
			console.log(response.data);
			this.setState({
				message: "The expense was updated successfully!"
			});
		})
		.catch(e => {
			console.log(e);
		});
	}
	
	deleteExpense(){
		ExpenseDataService.delete(this.state.currentExpense.id)
			.then(response => {
				console.log(response.data);
				this.props.history.push('/expenses');
			})
			.catch(e => {
				console.log(e);
			});
	}
	
	render(){
		const { currentExpense } = this.state;
		return (
			<div>
			  {currentExpense ? (
			    <div className="edit-form">
					<h4>Expense</h4>
					<form>
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input
							  type="text"
							  className="form-control"
							  id="title"
							  value={currentExpense.title}
							  onChange={this.onChangeTitle}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="description">Description</label>
							<input
							  type="text"
							  className="form-control"
							  id="description"
							  value={currentExpense.description}
							  onChange={this.onChangeDescription}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="amount">Amount</label>
							<input
							  type="text"
							  className="form-control"
							  id="amount"
							  value={currentExpense.amount}
							  onChange={this.onChangeAmount}
							/>
						</div> 
					</form>
					
					<button
					  className="btn btn-danger mr-2"
					  onClick={this.deleteExpense}
					>
					  Delete Expense
					</button>
					
					<button
					  type="submit"
					  className="btn btn-success"
					  onClick={this.updateExpense}
					>
					  Update Expense
					</button>
					<p>{this.state.message}</p>
				</div>
			  ) : (
				<div>
					<br />
					<p>Please click on a Expense...</p>
				</div>
			  )}
			</div>
		);
	}
}