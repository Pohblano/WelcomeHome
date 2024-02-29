import '../Styles/DisplayMenu.css'
// Library Imports
import React, { useEffect, useState, setState } from 'react'
import $, { contains } from 'jquery'
import { Button } from 'react-bootstrap'
// Custom Component Imports

// API import
import { MenuApi } from '../Api/MenuApi'
import { UserApi } from '../Api/UserApi'




export default function DisplayMenu({ userID }) {
    const [menuID, setMenuID] = useState('');
    // const [menuObj, setMenuObj] = useState({})
    const [breakfast, setBreakfast] = useState({})
    const [lunch, setLunch] = useState({})
    const [dinner, setDinner] = useState({})
    // const [attending, setAttending] = useState([])
    const [err, setErr] = useState('')


    useEffect(() => {
        // Adds event handler animation
        $(".option").on('click', function () {
            $(".option").removeClass("active");
            $(this).addClass("active");
        });

        // API call to retrieve the day's menu
        MenuApi.getTodaysMenu()
            .then(data => {
                // setMenuObj(data)
                setMenuID(data._id)
                setBreakfast(data.breakfast)
                setLunch(data.lunch)
                setDinner(data.dinner)
            })
            .catch(err => { console.log('Could not retrieve MENU data') })
    }, [])

    // Sets user to attend a meal
    function isAttending(meal) {
        if (breakfast.attending.indexOf(userID) === -1) {
            MenuApi.attend(menuID, meal, userID)
                .then(() => {
                    breakfast.attending.push(userID)
                    setBreakfast(breakfast)
                })
                .catch(err => console.log(err))
        }

    }

    return (
        <div className='p-4 card'>
            <h2 id="menu-header text-light-emphasis">Jaime's Kitchen</h2>
            <div className="options" >
                <MenuToggle userID={userID} optClass={'option active'} iconClass={'fa fa-coffee'} meal={'Breakfast'} isAttending={isAttending} {...breakfast} />
                <MenuToggle userID={userID} optClass={'option'} iconClass={'fa fa-heart'} isAttending={isAttending} meal={'Lunch'} {...lunch} />
                <MenuToggle userID={userID} optClass={'option'} iconClass={"fa fa-cutlery"} isAttending={isAttending} meal={'Dinner'} {...dinner} />
            </div>
        </div>
    )
}


// Basic menu details
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

                <div className="icon me-sm-3 ms-sm-auto" onClick={toggleCheck}>
                    <i className="fa fa-share"></i>
                </div>
            </div>
        </div>
    )
}

// Additional menu details and functions
function MenuBack({ userID, time, info, entree, meal, toggleCheck, isAttending, attending }) {
    let newTime = (time.split(':')[0] - 12 > 0) ? `${time.split(':')[0] - 12}:${time.split(':')[1]} PM` : `${time.split(':')[0]}:${time.split(':')[1]} AM`


    // UserApi.getAllAvatars(attending)
    //     .then(results => {
    //         console.log(results)
    //     })
    useEffect(() => {
        UserApi.getAllAvatars(attending)
        .then(results => {
            console.log(results)
        })
    },[])


    return (
        <div className='back-card'>
            <div className=''>
                <span className='d-flex align-items-baseline mb-3'><h1>{meal}</h1><h2 className='ms-2'>@ {newTime}</h2> </span>

                <h5 className=''>{entree}</h5>
                <p className=''>{info}</p>
                {(attending.indexOf(userID) === -1) ? <Button className='btn-warning' size="md" onClick={() => isAttending(meal)}>Attend</Button>
                    :
                    <Button className='btn-dark disabled'>Attending</Button>
                }

            </div>
            <div className='icon-tray'>

                <div className='avatar-icons align-items-baseline'>
                    {/* <p></p> */}
                    <div className='icon' style={{ backgroundImage: `url()` }} >
                        <i className="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <div className='icon' >
                        <i className="fa fa-user" aria-hidden="true"></i>
                    </div>
                    {/* 
                    {if users are more than a certain amount then display this button} */}
                    <div className='icon icon-users text-bold' >
                        {(attending.length > 0) ? `+${attending.length}` : <i className="fas fa-user-times" aria-hidden="true"></i>}

                    </div>
                    {/* display 5 user then anything extra display '{+ amount of users not displayed}' */}
                    {/* <div className='icon' >
                        +20
                    </div> */}

                </div>
                <div className="icon ms-sm-auto" onClick={toggleCheck}>
                    <i className="fa fa-share"></i>
                </div>

            </div>
        </div>
    )
}

// Toggles betweem different components
function MenuToggle({ userID, entree, info, time, img, optClass, iconClass, meal, isAttending, attending }) {
    const [toggle, setToggle] = useState(true);
    const toggleChecked = () => {
        setToggle(toggle => !toggle);
    }
    return (
        <div className={optClass} style={{ backgroundImage: `url(${img})` }}>
            {toggle && <MenuFront entree={entree} img={img} iconClass={iconClass} toggleCheck={toggleChecked} meal={meal} />}
            {!toggle && <MenuBack toggleCheck={toggleChecked} time={time} info={info} entree={entree} meal={meal} isAttending={isAttending} attending={attending} userID={userID} />}
        </div>
    );
}

