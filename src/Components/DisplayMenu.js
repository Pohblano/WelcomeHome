import '../Styles/DisplayMenu.css'
// Library Imports
import React, { useEffect, useState, setState, useCallback, useRef } from 'react'
import $, { contains } from 'jquery'
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap'
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

    // 
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
    const [users, setUsers] = useState([])
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

            <div className=''>
                <span className='d-flex align-items-baseline mb-3'><h1>{meal}</h1><h2 className='ms-2'>@ {newTime}</h2> </span>

                <h5 className=''>{entree}</h5>
                <p className=''>{info}</p>

                {(attending.indexOf(userID) === -1) ?
                    <Button className='btn-warning' size="md" onClick={() => isAttending(meal)}>Attend</Button>
                    :
                    <Button className='btn-dark disabled'>Attending</Button>
                }
            </div>

            <div className='icon-tray'>
                <div className='avatar-icons'>

                    {(attending.length > 0) ?
                        users.map((user, idx) => {
                            if (idx < 4) {
                                return <OverlayTrigger key={user.name} placement='bottom' overlay={<Tooltip>{user.name}</Tooltip>}>
                                    <div key={user._id} className='icon' style={{ backgroundImage: `url(${user.img})` }} ></div>
                                </OverlayTrigger>

                            }
                        }) : null
                    }

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

// Toggles betweem different components
function MenuToggle({ userID, entree, info, time, img, optClass, iconClass, meal, isAttending, attending }) {
    const [toggle, setToggle] = useState(true);
    const [userList, setUserList] = useState([])
    const toggleChecked = () => {
        setToggle(toggle => !toggle);
    }
    // console.log('Menutoggle', meal,attending)

    useEffect(() => setUserList(attending))

    return (
        <div className={optClass} style={{ backgroundImage: `url(${img})` }}>
            {toggle && <MenuFront entree={entree} img={img} iconClass={iconClass} toggleCheck={toggleChecked} meal={meal} />}
            {!toggle && <MenuBack toggleCheck={toggleChecked} time={time} info={info} entree={entree} meal={meal} isAttending={isAttending} attending={attending} userID={userID} />}
        </div>
    );
}

