import React from "react";
import { RouteComponentProps } from 'react-router';
import { connect } from "react-redux";
import { ApplicationState } from '../store';
import * as DrivingInstructorsStore from '../store/DrivingInstructors';

type DrivingInstructorsProps =
DrivingInstructorsStore.DrivingInstructorsState // ... state we've requested from the Redux store
  & typeof DrivingInstructorsStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters

class Home extends React.PureComponent<DrivingInstructorsProps> {
 

  componentDidMount(){
    this.ensureDataFetched();
  }
  // This method is called when the route parameters change
 

  private ensureDataFetched() {
    this.props.requestDrivingInstructors();
  }


  render() {    
    return (     
        <div>
          <br />
          {this.props.isLoading ? 
            <div>
            {this.props.instructors.map((item:  DrivingInstructorsStore.DrivingInstructor) => (
              <div key={item.id}>
                <div  className="row"> 
                  <div className="col-md-5">
                    <h2>{item.name} {item.surname}</h2>
                  </div>
                  <div className="col-md-7">
                    <p>{item.characteristics}</p>
                    <div className="btn-info float-right">{item.postDate}</div>
                  </div>                  
                </div>
                <hr />
              </div>
            ))}
          </div>
          :
          <div className="row">           
            <div className="col-md-5">
              <p className="text ">If you are logged in, please wait...</p>
            </div>
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>        
          }
        </div>
    )
  }
}

export default connect(
  (state: ApplicationState) => state.drivingInstructors, // Selects which state properties are merged into the component's props
  DrivingInstructorsStore.actionCreators // Selects which action creators are merged into the component's props
)(Home as any);
