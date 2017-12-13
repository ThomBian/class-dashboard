import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class StudentCard extends React.Component {
  render() {
    const getClassFromAverage = (average) => {
        if (average <= 8) return 'average-bad';
        if (average <= 12) return 'average-ok';
        return 'average-top';
    };
    return (
      <div className="student-card">
        <div className={`sc-body ${this.props.sex}`}>
          <div className="student-info student-lastname editable">{this.props.lastname}</div>
          <div className="student-info student-firstname editable">{this.props.firstname}</div>
        </div>
        <div className="sc-footer">
          <div className="marks">
            <div className={`mark editable ${getClassFromAverage(this.props.average)}`}>{this.props.average} / 20</div>
          </div>
          <div className="actions-student">
            <button className="btn btn-action delete-student-btn" onClick={() => this.props.onDeleteClick()}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

class Classroom extends React.Component {

  constructor(props) {
    super(props);
    const firstId = props.students.length;
    this.state = {
      students: props.students,
      id: firstId
    };
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  createStudentCards(){
    return this.state.students.map(student => 
      <StudentCard key={student.id}
                    ref={student.id}
                    sex={student.sex} 
                    average={student.average} 
                    lastname={student.lastname} 
                    firstname={student.firstname}
                    onDeleteClick={() => this.handleDeleteClick(student.id)}
      /> );
  };

  handleAddClick() {
    this.setState({
      modalState: 'Add'
    });
    this.showHideModal(true);
  }

  handleCancel() {
    this.setState({
      modalState: ''
    });
    this.showHideModal(false);
  }

  showHideModal(show) {
    document.getElementById('modal').style.visibility = show ? 'visible' : 'hidden';
    Array.from(document.getElementsByClassName('btn-action')).forEach(btn => {
      btn.disabled = show;
    });
  }
  handleDeleteClick(id) {
     this.setState({students: this.state.students.slice().filter(student => student.id !== id)});
  }

  createStudent(studentValues) {
    const students = this.state.students.slice();
    let id = this.state.id;
    id++;
    const newStudent = Object.assign(studentValues, {id});
    students.push(newStudent);
    this.setState({
      students: students,
      id
    })
  }

  handleModalSubmit(studentValues) {
    this.showHideModal(false);
    this.createStudent(studentValues);
  }

  render() {
    return (
      <div className="classroom">
        <div className="cl-header">
          <div className="center">
            <h1>My Classroom</h1>
          </div>
          <div className="right">
            <button className="btn btn-action add-student" onClick={this.handleAddClick}></button>
          </div>
        </div>
        <div className="students">
          {this.createStudentCards()}
        </div>
        <div className="footer">
        <Modal 
          onSubmit={this.handleModalSubmit}
          onCancel={this.handleCancel}
        />
        </div>
      </div>
    );
  } 
}

class Modal extends React.Component {
  render() {
      return (
          <div id="modal" className="modal">
              <div className="modal-header"> 
                  <h1>Add Student</h1>
              </div>
              <div className="body">
                <StudentActionForm 
                  onSubmit={this.props.onSubmit}
                  onCancel={this.props.onCancel} />
              </div>
          </div>
      );
  }
}

class StudentActionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastname: '',
      firstname: '',
      average: '',
      sex: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  assertInputIsValid(stateKey) {
    if (!this.state[stateKey]) {
      return false;
    }
    return true;
  }

  handleSubmit(e, callback = console.log) {
    const errorDiv = document.getElementById('error');
    errorDiv.innerHTML = '';
    const allValid = Object.keys(this.state).reduce((acc, key) => acc & this.assertInputIsValid(key), true);
    if (!allValid) {
      errorDiv.innerHTML = 'All fields must be filled';
    } else {
      callback(this.state);
    }
    e.preventDefault();
  }

  handleChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    return (
      <div className="form">
        <div id="error"></div>
        <form onSubmit={(e) => this.handleSubmit(e, this.props.onSubmit)}>
          <FormInputText 
          id="lastname"
          name="lastname" 
          label="Lastname"
          type="text"
          value={this.state.lastname}
          onChange={this.handleChange}/>
          <FormInputText 
            id="firstname"
            name="firstname" 
            label="Firstname" 
            type="text"
            value={this.state.firstname}
            onChange={this.handleChange}/>
          <FormInputNumber 
            id="mark"
            name="average" 
            label="Average"
            type="number"
            max="20" 
            value={this.state.avg}
            onChange={this.handleChange}/>
          <FormSexChoice
            onChange={this.handleChange}/>
          <div className="button">
              <button className="btn add-student-modal-btn" type="submit">Add</button>
              <button className="btn" type="reset" onClick={this.props.onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

function FormInputText(props) {
  return (
      <div>
        <label htmlFor={props.id}>{props.label} :</label>
        <input name={props.name} value={props.value} type="text" id={props.id} onChange={(e) => props.onChange(e)}></input>
      </div>
  );
}

function FormInputNumber(props) {
  return (
      <div>
        <label htmlFor={props.id}>{props.label} :</label>
        <input name={props.name} value={props.value} type="number" max={props.max} id={props.id} onChange={(e) => props.onChange(e)}></input>
      </div>
  );
}

function FormSexChoice(props) {
  return (
    <div>
      <label>
        Girl
        <input type="radio" name="sex" value="girl" onChange={(e) => props.onChange(e)} />
      </label>
      <label>
        Boy
        <input type="radio" name="sex" value="boy" onChange={(e) => props.onChange(e)}/>
      </label>
    </div>
  );
}

  // ========================================
  const studentsMock = [{
    id:0,
    sex:'boy',
    average:12,
    lastname:'Von Basten',
    firstname:'Klyde'
  },{
    id:1,
    sex:'girl',
    average: 16,
    lastname:'Antalrinoa',
    firstname:'Julie'
  },{
    id:2,
    sex:'girl',
    average: 18,
    lastname:'Ben Yeder',
    firstname:'Sarah'
  },{
    id:3,
    sex:'girl',
    average: 8,
    lastname:'Coraya',
    firstname:'Alice'
  },{
    id:4,
    sex:'boy',
    average: 14,
    lastname:'Mozigonacci',
    firstname:'Kirikus'
  },];
  ReactDOM.render(
    <Classroom students={studentsMock}/>,
    document.getElementById('root')
  );
  
  