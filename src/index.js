import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import deletePicture from './pictures/cross.png';
import edit from './pictures/edit.png';

class StudentCard extends React.Component {
  render() {
    const getClassFromAverage = (average) => {
        if (average <= 8) return 'average-bad';
        if (average <= 12) return 'average-ok';
        return 'average-top';
    };
    return (
      <div className={`student-card ${this.props.sex}`}>
        <div className="sc-header">
          <h1 className={getClassFromAverage(this.props.average)}>{this.props.average} / 20</h1>
        </div>
        <div className="sc-body">
          <h1 className="student-lastname">{this.props.lastname}</h1>
          <h2 className="student-firstname">{this.props.firstname}</h2>
          <h5 className="student-birthdate">{this.props.birthdate}</h5>
        </div>
        <div className="sc-footer">
          <button className="btn edit-student-btn"><img src={edit} alt=""/></button>
          <div className="empty-space"></div>
          <button className="btn delete-student-btn"><img onClick={() => this.props.onDeleteClick()} src={deletePicture} alt=""/></button>
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
    }
  }

  createStudentCards(){
    return this.state.students.map(student => 
      <StudentCard key={student.id}
                    sex={student.sex} 
                    average={student.average} 
                    lastname={student.lastname} 
                    firstname={student.firstname}
                    onDeleteClick={() => this.handleDeleteClick(student.id)}
      /> );
  };

  handleDeleteClick(id) {
     this.setState({students: this.state.students.slice().filter(student => student.id !== id)});
  }

  render() {
    return (
      <div className="classroom">
        <div className="cl-header">
          <h1>My Classroom</h1>
        </div>
        <div className="students">
          {this.createStudentCards()}
        </div>
        <div className="footer">
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
  
  