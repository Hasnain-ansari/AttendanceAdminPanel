import { getDatabase, ref, onValue } from "firebase/database";
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import 'firebase/compat/database';

export const AttendanceTable = () => {

    const [subjectData, setSubjectData] = useState([])
    const [attendanceRecord, setAttendanceRecord] = useState([])
    const [monthData, setMonthData] = useState([]);

    const [activeTab, setActiveTab] = useState(0);
    const [activeSub, setActiveSub] = useState([]);
    const uuid = "4YON5CG6rXdRdHvVBTYiZM5Hwft2";


    useEffect(() => {
        const db = getDatabase();

        const starCountRef = ref(db, 'users/' + uuid + '/subject/');

        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();

            // Assuming the provided data is stored in a variable called "data"
            const subjectKeys = Object.keys(data);

            const subjectsData = subjectKeys.map((key) => {
                const subject = data[key];

                return {
                    id: key,
                    subjectName: subject.subjectName
                };
            });



            // Update the state with the subjects data
            setSubjectData(subjectsData);

            //=========================



        });
    }, [])


    // useEffect(() => {
    //     console.log("======subjectData", monthData);
    // }, [monthData])

    const OnSubClick = (index, item) => {
        setActiveSub(item)
        setActiveTab(index)
    }

    return (
        <>

            <div className="h-full w-full flex">
                {subjectData.map((item, index) =>
                    <>

                        <div class="max-w-sm rounded overflow-hidden shadow-lg" onClick={() => OnSubClick(index, item)}>

                            <div class="px-6 py-4">
                                <div class="font-bold text-xl mb-2">{item.subjectName}</div>

                            </div>

                        </div>
                    </>
                )}


            </div>

            <MyComponent activeTab={activeTab} activeSub={activeSub} uuid={uuid} />
        </>
    )
}


const MyComponent = ({ activeTab, activeSub, uuid }) => {
    // Your component logic goes here
    const [subUserData, setSubUserData] = useState([])
    const [selectedMonth, setSelectedMonth] = useState('');
    const [dayData, setDayData] = useState([])

    useEffect(() => {
        const db = getDatabase();

        const starCountRef = ref(db, 'users/' + uuid + '/subject/' + activeSub.id + '/AttendanceRecord');

        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {

                // Assuming the provided data is stored in a variable called "data"
                const subUserKeys = Object.keys(data);

                const subjectUserData = subUserKeys.map((key) => {
                    const user = data[key];
                    if (user && user.AttendanceRecord) {
                        // console.log("=====user", data[key]);

                        // Retrieve the month data for the user
                        const monthData = user?.AttendanceRecord["2023"]?.monthsData[selectedMonth]?.dayData || {};

                        // // Get an array of months
                        // const months = Object.keys(monthData);

                        const MonthlyDayData = monthData.map((key, value) => {

                            return {
                                date: value,
                                attendance: key
                            };
                        });

                        setDayData(MonthlyDayData);
                        // console.log("=====user", data[key]);
                        console.log("=====monthData", monthData);
                        console.log("=====MonthlyDayData", MonthlyDayData);


                    }

                    return {
                        userid: key,
                        userName: user.fullname

                    };
                });

                // Update the state with the subjects data
                setSubUserData(subjectUserData === undefined ? [] : subjectUserData);

                //=========================
            }else{
                setSubUserData([])
                setDayData([]);
            }
        });
    }, [activeTab, selectedMonth])



    // useEffect(() => {
    //     console.log("======subUSer", subUserData);
    // }, [subUserData])


    const days = Array.from({ length: 30 }, (_, index) => index + 1); // Generate an array of numbers from 1 to 30

    return (
        <div className="h-full w-full">
            <MonthSelector setSelectedMonth={setSelectedMonth} selectedMonth={selectedMonth} />
            <div>
                {days.map((day) => (
                    <span key={day}>{day} </span>
                ))}
            </div>
            {subUserData.map((item, index) =>
                <>

                    <div class="max-w-sm rounded overflow-hidden shadow-lg" >

                        <div class="px-6 py-4 flex">
                            <div class="font-bold text-xl mb-2">{item?.userName}</div>
                            {dayData.map((item, index) =>
                                <>
                                    <div class="font-bold text-xl mb-2">{item?.attendance}</div>
                                </>
                            )}

                        </div>

                    </div>
                </>
            )}


        </div>
    );
};



const MonthSelector = ({ selectedMonth, setSelectedMonth }) => {


    const handleMonthChange = (event) => {
        const selectedMonthIndex = event.target.selectedIndex - 1;
        setSelectedMonth(selectedMonthIndex);
    };

    return (
        <div>
            <label htmlFor="monthSelect">Select a month:</label>
            <select id="monthSelect" value={selectedMonth} onChange={handleMonthChange}>
                <option value="">-- Select Month --</option>
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">January</option>
                <option value="4">February</option>
                <option value="5">May</option>
                {/* Add more months here */}
            </select>
            <p>Selected month index: {selectedMonth}</p>
        </div>
    );
};




