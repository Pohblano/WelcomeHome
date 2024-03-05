import '../Styles/Dashboard.css'
import photo from '../avatar.jpg'

// Libraries
import React, { useState, useEffect, useRef } from 'react'
import { Button, Card, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
// Components
import DisplayMenu from './DisplayMenu.js'
// import SliderComponent from './SliderComponent.js';
import Footer from './Utils/Footer.js';
import EnterMenu from './EnterMenu.js';
// API
import { UserApi } from '../Api/UserApi.js';

export default function Dashboard({ token, setToken, deleteToken }) {
    const [user, setUser] = useState({});
    const [err, setErr] = useState('');
    const { _id } = jwtDecode(token);
    const hasLoadedBefore = useRef(true)

    // CHANGED TO THIS CONDITIONING TO ENSURE THE COMPONENT DOES NOT RENDER MULTIPLE TIMES AFTER INITAL RENDER
    useEffect(()=> {
      if(hasLoadedBefore.current){
        //your initializing code runs only once
         // Calls back-end for logged-in user data
         UserApi.getId(_id)
         .then(user => setUser(user))
         .catch(err => setErr(err))

        hasLoadedBefore.current = false;
      } else{
        //subsequent renders
      }
    }, [])

    // useEffect(() => {
    //     UserApi.getId(_id)
    //         .then(user => setUser(user))
    //         .catch(err => setErr(err))
    // }, [])

    return (
        <>
            <div id='dashboard-wrapper'>
                <div id="d-banner">
                    <h1>Dashboard</h1>
                    <section>
                        <div id="d-avatar" className='mx-3'>
                            <img src={photo} alt="Dynamic Image" size="small" />
                            <span className='mx-1'>{user.name}</span>
                        </div>

                        <SignOut deleteToken={deleteToken} />
                    </section>

                </div>

                <div id="d-grid">
                    <div className="w-full p-2 lg:w-2/3 d-grid-item">
                        <DisplayMenu userID={_id} />
                    </div>
                    {/* <div className="w-full p-2 lg:w-1/3 d-grid-item">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://via.placeholder.com/150" />
                            <Card.Body>
                                <Nav variant="tabs" defaultActiveKey="#first">
                                    <Nav.Item>
                                        <Nav.Link href="#first">Breakfast</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="#second">Lunch</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="#third">Dinner</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <div className="tab-content">
                                    Display tab content here
                                </div>
                            </Card.Body>
                        </Card>
                    </div> */}

                    {/* <div className="w-full p-2 lg:w-2/3 d-grid-item">
                        <SliderComponent />
                    </div> */}

                    <EnterMenu />

                </div>

            </div>
            <Footer />
        </>
    )
}

function SignOut({ deleteToken }) {
    return <Button className='btn-sm' as={Link} onClick={() => deleteToken()} to="/">Sign Out</Button>
}



