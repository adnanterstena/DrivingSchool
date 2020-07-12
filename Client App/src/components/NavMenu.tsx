import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { getJwt } from '../getJWT';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean, LogedIn: boolean }> {
    public state = {
        isOpen: false,
        LogedIn: false
    };
    componentDidMount() {
        this.checkLogin();
    }
    componentDidUpdate(){
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

    logOut = () => {
    localStorage.removeItem("keytoken-jwt-jwt")
    window.location.reload(false);
    this.setState({LogedIn: false})    
    }

    public render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Driving School</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Instructors</NavLink>
                                </NavItem>
                                {this.state.LogedIn ?                                
                                    <button className="text-dark" onClick={this.logOut}>Log out</button>
                                 :
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/login">Log in</NavLink>
                                </NavItem>
                                }
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
