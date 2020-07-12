import React, { Component } from 'react';
import axios from "axios";
import { getJwt } from '../getJWT';

interface IProps {
}


interface IState {
    email?: string;
    password?: string;
    error?: boolean;
    LogedIn?: boolean
}

class Login extends Component<IProps, IState>  {    

  constructor(props: any) {
    super(props);

    this.state = {
        email: '',
        password: '',
        error: false,
        LogedIn: false
    };
  }

  componentDidMount() {
    this.checkLogin();
  }
  
  checkLogin() {
    const jwt = getJwt();
    if (jwt !== "bearer null") {
      this.setState({
        LogedIn: true
      });
      return;
    }
  }

  change(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();   

    axios.post('https://localhost:44362/identity/SignIn', {
        emailAdd: this.state.email,
        pass: this.state.password
    })
    .then(res => {
        localStorage.setItem('keytoken-jwt-jwt', res.data.token);
        this.setState({ LogedIn: true })
    })
    .catch(() => this.setState({

        error: true
    })); 
    window.location.reload(false);       

  }

  render() {
    const { error } = this.state;
    return (
      <div style={{margin: "auto", width: "50%"}}>
        <br />
        <br />
          {this.state.LogedIn ? 
          <div className="col-md-7">
            <h3>You are Logged In</h3>       
          </div> :
          <div className="col-md-7" >
              <form onSubmit={e => this.submit(e)} className="form-group">
              <label className="form-check-label">email</label>
              <input className="form-control" type="text" name="email" onChange={e => this.change(e)} />
              <br />
              <label className="form-check-label">password</label>
              <input className="form-control" type="password" name="password" onChange={e => this.change(e)} />
              <br />
              <button className="btn btn-primary" type="submit">Log in</button>
              </form>  
              <div className="text-danger float-right">             
              {error && <p>Invalid Credentials</p>}
              </div>
          </div>
          }
                 
      </div>
    );
  }
}

export default Login;