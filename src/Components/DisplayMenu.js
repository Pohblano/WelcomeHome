import '../Styles/DisplayMenu.css'
import extra from '../Photos/extra.jpg'
// Library Imports
import React, { useEffect, useState, setState, useCallback, useRef } from 'react'
import $ from 'jquery'
import { Button, Tooltip, OverlayTrigger, Form } from 'react-bootstrap'
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material'
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
    const [foodList, setFoodList] = useState({})
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
                    setFoodList(data.snacksAndBev)
                })
                .catch(err => { console.log('Could not retrieve MENU data') })
            hasLoadedBefore.current = false;
        } else {
            //subsequent renders
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

    return (

        <div className='p-4 card'>
            <h2 id="menu-header text-light-emphasis">Jaime's Kitchen</h2>
            <div className="options" >

                <MenuToggle userID={userID} optClass={'option active'} iconClass={'fa fa-coffee'} meal={'Breakfast'} isAttending={isAttending} {...breakfast} />
                <MenuToggle userID={userID} optClass={'option'} iconClass={'fa fa-heart'} isAttending={isAttending} meal={'Lunch'} {...lunch} />
                <MenuToggle userID={userID} optClass={'option'} iconClass={"fa fa-cutlery"} isAttending={isAttending} meal={'Dinner'} {...dinner} />
                <MenuToggle userID={userID} optClass={'option'} iconClass={"fas fa-cookie-bite"} meal={'extra'} foodList={foodList} />

            </div>

        </div>
    )
}

/////////////////////////
// Basic menu details
/////////////////////////
function MenuFront({ entree, img, toggleCheck, iconClass, meal }) {
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
function MenuBack({ userID, time, info, entree, meal, toggleCheck, isAttending, attending }) {
    const [users, setUsers] = useState([])
    // const [formData, setFormData] = useState({});
    const amString = `${time.split(':')[0]}:${time.split(':')[1]} AM`
    const pmString = `${time.split(':')[0] - 12}:${time.split(':')[1]} PM`
    const newTime = (time.split(':')[0] - 12 > 0) ? pmString : amString

    // Retrieve list of users upon render 
    useEffect(() => {
        UserApi.getAllAvatars(attending)
            .then(results => setUsers(results))
    }, [attending])

    return (
        <div className='back-card'>

            <div className='d-grid'>

                <span className='d-flex align-items-baseline mb-sm-3'><h1>{meal}</h1><h2 className='ms-2'>@ {newTime}</h2> </span>
                <h5 className=''>{entree}</h5>
                <p id='style-8'>{info}</p>

                {/* Checks if user is attending the meal in view */}
                {(attending.indexOf(userID) === -1) ?
                    <Button className='btn-warning' size="md" onClick={() => isAttending(meal)}>Attend</Button>
                    :
                    <Button className='btn-dark disabled'>Attending</Button>
                }
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

///////////////////////////////////////
// Toggles betweem different components
///////////////////////////////////////
function MenuToggle({ userID, entree, info, time, img, optClass, iconClass, meal, isAttending, attending, foodList }) {
    const [toggle, setToggle] = useState(true);
    const toggleChecked = () => setToggle(toggle => !toggle)
    // Temporary bug fix and resets toggle to display original card component
    // $(".option").on('click', () => setToggle(true));

    return (
        <>
            {(meal !== 'extra') ? (
                <div className={optClass} style={{ backgroundImage: `url(${img})` }}>
                    {toggle && <MenuFront entree={entree} img={img} iconClass={iconClass} toggleCheck={toggleChecked} meal={meal} />}
                    {!toggle && <MenuBack toggleCheck={toggleChecked} time={time} info={info} entree={entree} meal={meal} isAttending={isAttending} attending={attending} userID={userID} />}
                </div>
            ) : (
                <div className={optClass} style={{ backgroundImage: `url(${extra})` }}>
                    {toggle && <MenuFront entree={entree} img={img} iconClass={iconClass} toggleCheck={toggleChecked} meal={'Snacks & Beverages'} />}
                    {!toggle && <ExtraBack toggleCheck={toggleChecked} meal={meal} iconClass={iconClass} foodList={foodList}/>}
                </div>
            )}


        </>
    );
}

function ExtraBack({ iconClass, meal, toggleCheck, foodList }) {
    const [formData, setFormData] = useState({});
    // Handles general input events
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    console.log(foodList)

    // Submits form data to backend
    const handleSubmit = (e) => {
        // e.preventDefault();

        console.log(formData)
    };
    return (

        <Form className='back-card' onSubmit={handleSubmit}>

            <FormGroup>
                {foodList.map((item, idx)=> {
                   return <FormControlLabel key={idx} control={<Checkbox />} label={item} />
                })}
            </FormGroup>

            {/* <Form.Group id='extra-grid' className='d-flex'>
                <Form.Check // prettier-ignore
                    type="checkbox"
                    id='default-checkbox'
                    label='Cookie'
                />
                <Form.Check // prettier-ignore
                    type="checkbox"
                    id='default-checkbox'
                    label='Shake'
                />
            </Form.Group> */}

            <div className='icon-tray'>
                <Button variant="primary" type="submit" className="w-100 mt-4 mb-3">Submit</Button>
                <div className="icon ms-sm-auto" onClick={toggleCheck}>
                    <i className="fa fa-share"></i>
                </div>

            </div>


        </Form>

    )
}

