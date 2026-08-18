import axios from "axios";

import attendanceDummyData from "./attendanceDummyData";

const API_BASE =
    process.env.REACT_APP_API_URL ||
    "http://localhost:8000";

/*
|--------------------------------------------------------------------------
| FRONTEND DEVELOPMENT MODE
|--------------------------------------------------------------------------
|
| For now:
|
| true  = use dummy frontend data
| false = use Django API
|
| Since you are currently working only on frontend,
| keep this TRUE.
|
*/

const USE_DUMMY_DATA = true;

/*
|--------------------------------------------------------------------------
| API PATHS
|--------------------------------------------------------------------------
*/

const ATTENDANCE_DASHBOARD_PATH =
    "/api/attendance/";

const ATTENDANCE_PROFILE_PATH =
    "/api/attendance/employees";


const getHeaders = () => {
    const token =
        localStorage.getItem("access_token");

    if (!token) {
        return {};
    }

    return {
        Authorization: `Bearer ${token}`,
    };
};


/*
|--------------------------------------------------------------------------
| HELPER
|--------------------------------------------------------------------------
*/

const wait = (time = 250) =>
    new Promise((resolve) =>
        setTimeout(resolve, time)
    );


const normalizeStatus = (status) => {
    if (!status) return "UNKNOWN";

    return String(status)
        .trim()
        .toUpperCase()
        .replace(/_/g, " ");
};


/*
|--------------------------------------------------------------------------
| DASHBOARD
|--------------------------------------------------------------------------
*/

export const fetchAttendanceDashboard =
    async ({
        plant,
        employeeType,
        shift,
        date,
    }) => {

        /*
        ========================================================
        FRONTEND / DUMMY MODE
        ========================================================
        */

        if (USE_DUMMY_DATA) {

            await wait();

            const filtered =
                attendanceDummyData.filter(
                    (person) => {

                        const samePlant =
                            person.plant === plant;

                        const sameType =
                            person.employeeType ===
                            employeeType;

                        const sameShift =
                            person.shift === shift;

                        return (
                            samePlant &&
                            sameType &&
                            sameShift
                        );
                    }
                );


            const summary = {
                total: filtered.length,

                present:
                    filtered.filter(
                        (person) =>
                            person.status ===
                            "PRESENT"
                    ).length,

                absent:
                    filtered.filter(
                        (person) =>
                            person.status ===
                            "ABSENT"
                    ).length,

                leave:
                    filtered.filter(
                        (person) =>
                            person.status ===
                            "ON LEAVE"
                    ).length,

                late:
                    filtered.filter(
                        (person) =>
                            person.status ===
                            "LATE"
                    ).length,
            };


            return {
                rows: filtered,

                summary,
            };
        }


        /*
        ========================================================
        BACKEND MODE
        ========================================================
        */

        const response =
            await axios.get(
                `${API_BASE}${ATTENDANCE_DASHBOARD_PATH}`,
                {
                    headers: getHeaders(),

                    params: {
                        plant,
                        employee_type:
                            employeeType,
                        shift,
                        date,
                    },
                }
            );


        const data =
            response.data;


        const rows =
            data.results ||
            data.employees ||
            data.workers ||
            data.records ||
            data.data ||
            [];


        return {
            rows,

            summary:
                data.summary || {
                    total: rows.length,

                    present:
                        rows.filter(
                            (person) =>
                                normalizeStatus(
                                    person.status
                                ) === "PRESENT"
                        ).length,

                    absent:
                        rows.filter(
                            (person) =>
                                normalizeStatus(
                                    person.status
                                ) === "ABSENT"
                        ).length,

                    leave:
                        rows.filter(
                            (person) =>
                                normalizeStatus(
                                    person.status
                                ) === "ON LEAVE"
                        ).length,

                    late:
                        rows.filter(
                            (person) =>
                                normalizeStatus(
                                    person.status
                                ) === "LATE"
                        ).length,
                },
        };
    };


/*
|--------------------------------------------------------------------------
| FIND ONE PERSON
|--------------------------------------------------------------------------
*/

const findPerson = (
    employeeId
) => {

    return attendanceDummyData.find(
        (person) =>
            person.id === employeeId
    );
};


/*
|--------------------------------------------------------------------------
| EMPLOYEE PROFILE
|--------------------------------------------------------------------------
*/

export const fetchEmployeeProfile =
    async (employeeId) => {

        /*
        ========================================================
        DUMMY MODE
        ========================================================
        */

        if (USE_DUMMY_DATA) {

            await wait();

            const person =
                findPerson(employeeId);


            if (!person) {

                throw new Error(
                    "Employee not found"
                );
            }


            const isNight =
                person.shift === "Night";


            return {

                ...person,


                manager:
                    person.plant === "Plant 1"
                        ? "Rajesh Shah"
                        : "Vikas Patel",


                joiningDate:
                    "10 Jan 2024",


                mobile:
                    "9876543210",


                email:
                    `${person.name
                        .toLowerCase()
                        .replace(/\s+/g, ".")}@atomone.com`,


                shiftTiming:
                    isNight
                        ? "08:00 PM - 06:00 AM"
                        : "09:00 AM - 06:00 PM",


                today: {

                    punchIn:
                        person.inTime === "--"
                            ? null
                            : person.inTime,

                    punchOut:
                        person.outTime === "--"
                            ? null
                            : person.outTime,

                    workingHours:
                        person.workingHours === "--"
                            ? null
                            : person.workingHours,

                    status:
                        person.status,

                    shiftStart:
                        isNight
                            ? "08:00 PM"
                            : "09:00 AM",

                    shiftEnd:
                        isNight
                            ? "06:00 AM"
                            : "06:00 PM",
                },


                /*
                ====================================================
                ACTUAL MACHINE WORKING DATA
                ====================================================
                */

                machineWorking:
                    person.status ===
                        "PRESENT"
                        ? {
                            machineName:
                                person.plant ===
                                    "Plant 1"
                                    ? "Power Press 04"
                                    : "CNC Machine 02",

                            punchIn:
                                person.inTime === "--"
                                    ? null
                                    : person.inTime,

                            punchOut:
                                person.outTime === "--"
                                    ? null
                                    : person.outTime,

                            workingHours:
                                person.workingHours === "--"
                                    ? null
                                    : person.workingHours,

                            isWorking:
                                person.outTime === "--",
                        }
                        : null,


                attendanceHealth: {

                    score:
                        person.attendancePercentage,

                    presentDays:
                        person.status ===
                            "PRESENT"
                            ? 22
                            : 20,

                    lateArrivals:
                        person.status ===
                            "LATE"
                            ? 4
                            : 2,

                    absentDays:
                        person.status ===
                            "ABSENT"
                            ? 3
                            : 1,

                    previousMonthDifference:
                        2.1,
                },


                history: [

                    {
                        date: "18 Aug",

                        inTime:
                            person.inTime,

                        outTime:
                            person.outTime,

                        hours:
                            person.workingHours,

                        late:
                            person.status ===
                                "LATE"
                                ? "12m"
                                : null,

                        status:
                            person.status,
                    },

                    {
                        date: "17 Aug",

                        inTime: "08:55 AM",

                        outTime: "06:02 PM",

                        hours: "09h 07m",

                        late: null,

                        status: "PRESENT",
                    },

                    {
                        date: "16 Aug",

                        inTime: null,

                        outTime: null,

                        hours: null,

                        late: null,

                        status: "WEEK OFF",
                    },

                    {
                        date: "15 Aug",

                        inTime: null,

                        outTime: null,

                        hours: null,

                        late: null,

                        status: "HOLIDAY",
                    },

                    {
                        date: "14 Aug",

                        inTime: null,

                        outTime: null,

                        hours: null,

                        late: null,

                        status: "ABSENT",
                    },

                ],


                shiftInformation: {

                    shift:
                        person.shift,

                    timing:
                        isNight
                            ? "08:00 PM - 06:00 AM"
                            : "09:00 AM - 06:00 PM",

                    breakTime:
                        "01h 00m",

                    gracePeriod:
                        "10 min",

                    weeklyOff:
                        "Sunday",

                    fullDayMinimum:
                        "08h 00m",

                    halfDayMinimum:
                        "04h 00m",

                    nextShift: {

                        time:
                            isNight
                                ? "08:00 PM"
                                : "09:00 AM",

                        date:
                            "Tomorrow",
                    },
                },


                recentActivity: [

                    {
                        date: "Today",

                        text:
                            person.inTime !== "--"
                                ? `Punched in at ${person.inTime}`
                                : "No punch-in recorded",

                        type:
                            person.inTime !== "--"
                                ? "success"
                                : "danger",
                    },

                    {
                        date: "Today",

                        text:
                            person.outTime !== "--"
                                ? `Punched out at ${person.outTime}`
                                : "Punch-out pending",

                        type:
                            person.outTime !== "--"
                                ? "success"
                                : "warning",
                    },

                    {
                        date: "17 Aug",

                        text:
                            "Attendance updated",

                        type:
                            "info",
                    },

                ],

            };
        }


        /*
        ========================================================
        BACKEND MODE
        ========================================================
        */

        const response =
            await axios.get(
                `${API_BASE}${ATTENDANCE_PROFILE_PATH}/${employeeId}/`,
                {
                    headers:
                        getHeaders(),
                }
            );


        return response.data;
    };


/*
|--------------------------------------------------------------------------
| ATTENDANCE CALENDAR
|--------------------------------------------------------------------------
*/

export const fetchEmployeeCalendar =
    async (
        employeeId,
        year,
        month
    ) => {

        /*
        ========================================================
        DUMMY MODE
        ========================================================
        */

        if (USE_DUMMY_DATA) {

            await wait(150);


            const person =
                findPerson(employeeId);


            if (!person) {

                return [];
            }


            const daysInMonth =
                new Date(
                    year,
                    month,
                    0
                ).getDate();


            const records = [];


            for (
                let day = 1;
                day <= daysInMonth;
                day++
            ) {

                const date =
                    new Date(
                        year,
                        month - 1,
                        day
                    );


                const weekDay =
                    date.getDay();


                let status =
                    "PRESENT";


                /*
                Sunday
                */

                if (weekDay === 0) {

                    status =
                        "WEEK OFF";
                }


                /*
                Demo absent
                */

                else if (
                    day === 7 ||
                    day === 21
                ) {

                    status =
                        "ABSENT";
                }


                /*
                Demo leave
                */

                else if (
                    day === 12
                ) {

                    status =
                        "ON LEAVE";
                }


                /*
                Demo holiday
                */

                else if (
                    day === 15
                ) {

                    status =
                        "HOLIDAY";
                }


                const formattedDate =
                    `${year}-${String(
                        month
                    ).padStart(
                        2,
                        "0"
                    )}-${String(
                        day
                    ).padStart(
                        2,
                        "0"
                    )}`;


                records.push({

                    date:
                        formattedDate,

                    status,

                    punchIn:
                        status ===
                            "PRESENT"
                            ? person.inTime
                            : null,

                    punchOut:
                        status ===
                            "PRESENT"
                            ? person.outTime
                            : null,

                    workingHours:
                        status ===
                            "PRESENT"
                            ? person.workingHours
                            : null,

                });

            }


            return records;
        }


        /*
        ========================================================
        BACKEND MODE
        ========================================================
        */

        const response =
            await axios.get(

                `${API_BASE}${ATTENDANCE_PROFILE_PATH}/${employeeId}/calendar/`,

                {
                    headers:
                        getHeaders(),

                    params: {
                        year,
                        month,
                    },
                }

            );


        return (
            response.data.results ||
            response.data.records ||
            response.data.calendar ||
            response.data.data ||
            response.data ||
            []
        );
    };