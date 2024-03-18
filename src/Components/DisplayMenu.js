import '../Styles/DisplayMenu.css'
// Library Imports
import React, { useEffect, useState, setState, useCallback, useRef } from 'react'
import { Button, Tooltip, OverlayTrigger, Form } from 'react-bootstrap'
import $ from 'jquery'
import anime from 'animejs'
// Custom Component Imports

// API import
import { MenuApi } from '../Api/MenuApi'
import { UserApi } from '../Api/UserApi'

export default function DisplayMenu({ userID }) {
    const [menuID, setMenuID] = useState('');
    const [menuObj, setMenuObj] = useState({})
    const [breakfast, setBreakfast] = useState({})
    const [lunch, setLunch] = useState({})
    const [dinner, setDinner] = useState({})
    const [err, setErr] = useState('')
    const hasLoadedBefore = useRef(true)

    // Functions to run on component render
    useEffect(() => {
        if (hasLoadedBefore.current) {
            //  Adds event handler animation
            $(".option").on('click', function () {
                $(".option").removeClass("active");
                $(this).addClass("active");
            });

            // API call to retrieve the day's menu
            MenuApi.getTodaysMenu()
                .then(data => {
                    setMenuObj(data)
                    setMenuID(data._id)
                    setBreakfast(data.breakfast)
                    setLunch(data.lunch)
                    setDinner(data.dinner)
                })
                .catch(err => { console.log('Could not retrieve MENU data') })
            hasLoadedBefore.current = false;



        }

    }, [])


    // Sets user to attend a meal  
    function isAttending(meal) {
        const mealStr = meal.toLowerCase()
        const mealObj = menuObj[mealStr]

        if (mealObj.attending.indexOf(userID) === -1) {
            MenuApi.attend(menuID, meal, userID)
                .then((data) => {
                    setMenuObj(data)
                    eval(`set${meal}(data.${mealStr})`)
                }).catch(err => console.log(err))
        }
    }

    function updateSnacksAndBev(meal, snacksAndBev) {

        MenuApi.updateSnacksAndBev(menuID, meal, snacksAndBev)
            .then((data) => {
                console.log(data, 'returned from api call')
            }).catch(err => console.log(err))
    }


    return (

        <div className='p-4 card'>
            <h2 id="menu-header text-light-emphasis">Jaime's Kitchen</h2>
            <div className="options h-100" >
                <MenuToggle userID={userID} optClass={'option active'} iconClass={'fa fa-coffee'} isAttending={isAttending} updateSnacksAndBev={updateSnacksAndBev} meal={'Breakfast'} {...breakfast} />
                <MenuToggle userID={userID} optClass={'option'} iconClass={'fa fa-heart'} isAttending={isAttending} updateSnacksAndBev={updateSnacksAndBev} meal={'Lunch'} {...lunch} />
                <MenuToggle userID={userID} optClass={'option'} iconClass={"fa fa-cutlery"} isAttending={isAttending} updateSnacksAndBev={updateSnacksAndBev} meal={'Dinner'} {...dinner} />

            </div>

        </div>
    )
}


///////////////////////////////////////
// Toggles betweem different components
///////////////////////////////////////
function MenuToggle({ userID, entree, info, time, img, optClass, iconClass, meal, isAttending, attending, updateSnacksAndBev, snacksAndBev }) {
    const [toggle, setToggle] = useState(true);
    const toggleChecked = () => setToggle(toggle => !toggle)
    // Temporary bug fix and resets toggle to display original card component
    // $(".option").on('click', () => setToggle(true));

    return (
        <>
            <div className={optClass} style={{ backgroundImage: `url(${img})` }}>
                {toggle && <MenuFront entree={entree} img={img} iconClass={iconClass} toggleCheck={toggleChecked} meal={meal} />}
                {!toggle && <MenuBack toggleCheck={toggleChecked} time={time} info={info} entree={entree} meal={meal} isAttending={isAttending} attending={attending} userID={userID} snacksAndBev={snacksAndBev} updateSnacksAndBev={updateSnacksAndBev} />}
            </div>
        </>
    );
}
/////////////////////////
// Basic menu details
/////////////////////////
function MenuFront({ entree, toggleCheck, iconClass, meal }) {
    return (
        <div className='front-card'>
            <div className="shadow"></div>
            <div className="label">
                <div className="icon">
                    <i className={iconClass}></i>
                </div>
                <div className="info">
                    <div className="main">{meal}</div>
                    <div className="sub">{entree}</div>
                </div>

                <div className="icon me-3 ms-auto" onClick={toggleCheck}>
                    <i className="fa fa-share"></i>
                </div>
            </div>
        </div>
    )
}

////////////////////////////////////////
// Additional menu details and functions
////////////////////////////////////////
function MenuBack({ userID, time, info, entree, meal, toggleCheck, isAttending, attending, updateSnacksAndBev, snacksAndBev }) {
    const [users, setUsers] = useState([])
    const amString = `${time.split(':')[0]}:${time.split(':')[1]} AM`
    const pmString = `${time.split(':')[0] - 12}:${time.split(':')[1]} PM`
    const newTime = (time.split(':')[0] - 12 > 0) ? pmString : amString
    const hasLoadedBefore = useRef(true)
    const options = { hour12: false, hour: '2-digit', minute: '2-digit' };
    const dateData = new Date()
    const timeData = new Date(dateData).toLocaleTimeString('en-US', options);
    const mealTime = timeToMinutes(time)  //meal time
    const currentTime = timeToMinutes(timeData) //current time

    // Retrieve list of users upon render 
    useEffect(() => {
        UserApi.getAllAvatars(attending)
            .then(results => setUsers(results))

    }, [attending])

    // Update snacks and beverages based on changes
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target
        console.log(value, checked)
        snacksAndBev.map(entry => {
            if (entry.name === value && checked) entry.count++
            if (entry.name === value && !checked) entry.count--
        })
    }

    // Updates menu record snacksAndBev and attending props
    const handleSubmit = (e) => {
        updateSnacksAndBev(meal, snacksAndBev)
        isAttending(meal)
    }

    // Converts 'HH:mm' time to minutes
    function timeToMinutes(timeString) {
        var splitTime = timeString.split(":");
        var hours = parseInt(splitTime[0], 10);
        var minutes = parseInt(splitTime[1], 10);
        return hours * 60 + minutes;
    }

    return (
        <div className='back-card'>

            <div className='d-grid'>
                <span className='d-flex align-items-baseline'><h3 className='mb-0'>{meal}</h3><h4 className='ms-2 mb-0'>@ {newTime}</h4> </span>
                <h5 className=''>{entree}</h5>
                <p id='style-8' className='text-body'>{info}</p>
                <Form className='d-flex h-100 flex-column align-self-center justify-content-end'>
                    <div className='d-flex flex-wrap justify-content-evenly overflow-x-hidden h-25'>
                        {snacksAndBev.map((obj, idx) =>

                            ((attending.indexOf(userID) === -1 && currentTime < mealTime)) ?
                                <Form.Check // prettier-ignore
                                    key={idx}
                                    type='checkbox'
                                    className='me-2'
                                    label={obj.name}
                                    value={obj.name}
                                    onChange={handleCheckboxChange}
                                /> :
                                <Form.Check // prettier-ignore
                                    key={idx}
                                    type='checkbox'
                                    className='me-2'
                                    label={obj.name}
                                    value={obj.name}
                                    onChange={handleCheckboxChange}
                                    disabled
                                />

                        )}
                    </div>

                    {/* Checks if user is attending the meal in view */}
                    {(attending.indexOf(userID) === -1 && currentTime < mealTime) ?
                        // <Button className='btn-warning' size="md" type="submit" onClick={() => isAttending(meal)}>Attend</Button>
                        <Button className='btn-warning' size="md" onClick={() => handleSubmit()} >Attend</Button>
                        :
                        <Button className='btn-dark disabled'>Attending</Button>
                    }

                </Form>
                <sub className='h-100 text-end mt-1'>*Make sure you make your selections before Attending</sub>
            </div>

            <div className='icon-tray'>
                <div className='avatar-icons'>
                    {/* Creates user avatars to display based on users attending specific meal */}
                    {(attending.length > 0) ?
                        users.map((user, idx) => {
                            if (idx < 4) {
                                return <OverlayTrigger key={user.name} placement='bottom' overlay={<Tooltip>{user.name}</Tooltip>}>
                                    <div key={user._id} className='icon' style={{ backgroundImage: `url(${user.img})` }}></div>
                                </OverlayTrigger>
                            }
                        }) : null
                    }
                    {/* Displays total amount of users attending specific meal */}
                    <div className='icon icon-users text-bold' >
                        {(attending.length > 0) ? `+${attending.length}` : <i className="fas fa-user-times" aria-hidden="true"></i>}
                    </div>
                </div>

                <div className="icon ms-sm-auto" onClick={toggleCheck}>
                    <i className="fa fa-share"></i>
                </div>

            </div>
        </div>
    )
}


