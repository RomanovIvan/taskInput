import React, { Component } from 'react';
import List from './List';
import axios from 'axios';
import './App.css';

require('dotenv').config();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            value: '',
            editValue: '',
            isLoading: false,
            isLoadingChangeStatus: false,
            editTask: false
        }
    }
    async componentDidMount() {
        this.setState({ isLoading: true });
        await axios.get(process.env.REACT_APP_URL_API).then(resp => {this.setState({ tasks: resp.data });})
        this.setState({ isLoading: false });
    }
    onChangeCheckbox = async(e, taskId) => {
        this.setState({ isLoadingChangeStatus: true });
        if(e.target.checked) {
            await axios.patch(process.env.REACT_APP_URL_API + taskId, { checkbox: true });
        } else {
            await axios.patch(process.env.REACT_APP_URL_API + taskId, { checkbox: false });
        }
        await axios.get(process.env.REACT_APP_URL_API).then(resp => {this.setState({ tasks: resp.data });})
        this.setState({ isLoadingChangeStatus: false });
        
    }
    inputText = (e) => {
        this.setState({ value: e.target.value })
    }
    buttonAddClick = async() => {
        this.setState({ isLoadingChangeStatus: true });
        if(this.state.value !== '') await axios.post(process.env.REACT_APP_URL_API, { checkbox: false, topic: this.state.value });
        await axios.get(process.env.REACT_APP_URL_API).then(resp => {this.setState({ tasks: resp.data });})
        this.setState({ isLoadingChangeStatus: false });
    }
    handleKeyDown = async(e) => {
        if (e.keyCode === 13)  {
            this.setState({ isLoadingChangeStatus: true });
            await axios.post(process.env.REACT_APP_URL_API, { checkbox: false, topic: this.state.value });
            await axios.get(process.env.REACT_APP_URL_API).then(resp => {this.setState({ tasks: resp.data });})
            this.setState({ isLoadingChangeStatus: false });
        }
    }
    buttonTaskDelete = async(e, taskId) => {
        this.setState({ isLoadingChangeStatus: true });
        await axios.delete(process.env.REACT_APP_URL_API + taskId)
        await axios.get(process.env.REACT_APP_URL_API).then(resp => {this.setState({ tasks: resp.data });})
        this.setState({ isLoadingChangeStatus: false });
    }
    onChangeEditTask = async(e, taskId) => {
        this.setState({ editTask: true, });
        this.setState({ isLoadingChangeStatus: false });
    }
    render() {
        if(this.state.isLoading) return (<div>Loading...</div>);

        return (
            <div className="App">
                <List 
                    handleKeyDownMethod={this.handleKeyDown}
                    buttonAddClickMethod={this.buttonAddClick}
                    onChangeCheckboxMethod={this.onChangeCheckbox}
                    buttonTaskDeleteMethod={this.buttonTaskDelete}
                    inputTextMethod={this.inputText}
                    value={this.state.value}
                    isLoadingChangeStatus={this.state.isLoadingChangeStatus}
                    tasks={this.state.tasks}
                />
            </div>
        );

    }
}

export default App;
