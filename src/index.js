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
          <button className="btn edit-student-btn"><img src={edit} alt=""/></button>
          <div className="empty-space"></div>
          <button className="btn delete-student-btn"><img src={deletePicture} alt=""/></button>
        </div>
      </div>
    );
  }
}

function Classroom (props) {
  const studentsGiven = props.students;
  const students = studentsGiven.map(student => 
    <StudentCard key={student.id}
                  sex={student.sex} 
                  average={student.average} 
                  lastname={student.lastname} 
                  firstname={student.firstname} 
                  birthdate={student.birthdate}
    />
  );
  return (
    <div className="classroom">
      <div className="cl-header">
        <h1>My Classroom</h1>
      </div>
      <div className="students">
        {students}
      </div>
      <div className="footer">
      </div>
    </div>
  );
}


  // ========================================
  const studentsMock = [{
    id:0,
    sex:'boy',
    average:12,
    lastname:'Bianchini',
    firstname:'Thomas',
    birthdate:'01/09/1993'
  },{
    id:0,
    sex:'girl',
    average: 16,
    lastname:'Roques',
    firstname:'Chloé',
    birthdate:'15/02/1996'
  },{
    id:1,
    sex:'girl',
    average: 18,
    lastname:'Zgueg',
    firstname:'Malika',
    birthdate:'08/05/1995'
  },{
    id:2,
    sex:'girl',
    average: 8,
    lastname:'Alice',
    firstname:'Coraya',
    birthdate:'10/12/1993'
  },{
    id:3,
    sex:'boy',
    average: 14,
    lastname:'Francois',
    firstname:'Timoté',
    birthdate:'22/06/1993'
  },];
  ReactDOM.render(
    <Classroom students={studentsMock}/>,
    document.getElementById('root')
  );
  
  