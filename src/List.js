import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CloseIcon from '@material-ui/icons/Close';
import { red } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#049842',
    },
  },
});
const BootstrapButton = withStyles({
  root: {
    fontWeight: 100,
    fontSize: 16,
  },
})(Button);
class List extends Component {
	render() {
		return (

			<div>
			<ThemeProvider theme={theme}>
			<Container maxWidth="sm">
				<Card>
			      <CardContent>
						<TextField id="outlined-basic" label="Task" size="small" variant="outlined" className="new-task" onKeyDown={this.props.handleKeyDownMethod} onChange={this.props.inputTextMethod} value={this.props.value} />
					    <Button style={{fontWeight: 100 }} variant="outlined" size="large" color="primary" onClick={this.props.buttonAddClickMethod}>Add</Button>
					    <div className={`task-list ${this.props.isLoadingChangeStatus ? 'task-list--loading' : ''}`} >
					        {
					            this.props.tasks.map((task, index) => 
					                <div key={task.id} className="task">
					                <FormControlLabel
						          		value="end"
							          	control={<Checkbox key={`task-$(task.id)`} onChange={(e) => this.props.onChangeCheckboxMethod(e, task.id)} checked={task.checkbox}/>}
							          	label={task.topic}
							          	labelPlacement="end"
							        />
					                    <CloseIcon fontSize="small" style={{ color: red[500] }} className={`task-but--delete`} onClick={(e) => this.props.buttonTaskDeleteMethod(e, task.id)} />
					                </div>
					            )
					        }
					    </div>
			      </CardContent>
			    </Card>
      		</Container>

		    </ThemeProvider>
		    </div>
		);
	}
}

export default List;
