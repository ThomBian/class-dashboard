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
          <div className="student-info student-lastname">{this.props.lastname}</div>
          <div className="student-info student-firstname">{this.props.firstname}</div>
        </div>
        <div className="sc-footer">
          <div className="marks">
            <div className={`mark ${getClassFromAverage(this.props.average)}`}>{this.props.average} / 20</div>
          </div>
          <div className="actions-student">
            <button className="btn edit-student-btn" onClick={() => this.props.onEditClick()} >Edit</button>
            <div className="empty-space"></div>
            <button className="btn delete-student-btn" onClick={() => this.props.onDeleteClick()}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

class Classroom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      students: props.students
    };
  }

  createStudentCards(){
    return this.state.students.map(student => 
      <StudentCard key={student.id}
                    sex={student.sex} 
                    average={student.average} 
                    lastname={student.lastname} 
                    firstname={student.firstname}
                    onDeleteClick={() => this.handleDeleteClick(student.id)}
                    onEditClick={() => this.handleEditClick(student)}
      /> );
  };

  handleAddClick() {
    document.getElementById('modal').style.visibility = 'visible';
  }

  handleDeleteClick(id) {
     this.setState({students: this.state.students.slice().filter(student => student.id !== id)});
  }

  handleEditClick(student) {
    alert(JSON.stringify(student));
  }

  render() {
    return (
      <div className="classroom">
        <div className="cl-header">
          <div className="center">
            <h1>My Classroom</h1>
          </div>
          <div className="right">
            <button className="btn add-student" onClick={this.handleAddClick}>Add Student</button>
          </div>
        </div>
        <div className="students">
          {this.createStudentCards()}
        </div>
        <div className="footer">
          <Modal />
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
              <form>
              <div>
                  <label htmlFor="lastname">Lastname :</label>
                  <input type="text" id="lastname" />
              </div>
              <div>
                  <label htmlFor="firstname">Firstname :</label>
                  <input type="text" id="firstname" />
              </div>
              <div>
                  <label htmlFor="mark">Average :</label>
                  <input type="text" id="mark"></input>
              </div>
              
              <div className="button">
                  <button className="btn" type="submit">Add</button>
                  <button className="btn" type="reset">Cancel</button>
              </div>
              </form>
              </div>
          </div>
      );
  }
}

  // ========================================
  const studentsMock = [{
    id:0,
    sex:'boy',
    average:12,
    lastname:'Bianchini',
    firstname:'Thomas'
  },{
    id:1,
    sex:'girl',
    average: 16,
    lastname:'Roques',
    firstname:'Chloé'
  },{
    id:2,
    sex:'girl',
    average: 18,
    lastname:'Zgueg',
    firstname:'Malika'
  },{
    id:3,
    sex:'girl',
    average: 8,
    lastname:'Alice',
    firstname:'Coraya'
  },{
    id:4,
    sex:'boy',
    average: 14,
    lastname:'Francois',
    firstname:'Timoté'
  },];
  ReactDOM.render(
    <Classroom students={studentsMock}/>,
    document.getElementById('root')
  );
  
  