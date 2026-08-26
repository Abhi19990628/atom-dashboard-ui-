import axios from "axios";

const API_BASE =
    process.env.REACT_APP_API_URL ||
    "http://127.0.0.1:8000";

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

const normalizeStatus = (status) => {
    if (!status) return "UNKNOWN";

    return String(status)
        .trim()
        .toUpperCase()
        .replace(/_/g, " ");
};

/*
|--------------------------------------------------------------------------
| DASHBOARD - REAL SQL SERVER DATA
|--------------------------------------------------------------------------
*/

export const fetchAttendanceDashboard =
    async ({
        plant,
        employeeType,
        shift,
        date,
        activeStatus = "Y",
    }) => {
        const response =
            await axios.get(
                `${API_BASE}${ATTENDANCE_DASHBOARD_PATH}`,
                {
                    headers: getHeaders(),

                    params: {
                        plant,
                        employee_type: employeeType,
                        shift,
                        date,
                        active: activeStatus,
                    },
                }
            );

        const data = response.data || {};

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
                                normalizeStatus(person.status) === "PRESENT"
                        ).length,

                    absent:
                        rows.filter(
                            (person) =>
                                normalizeStatus(person.status) === "ABSENT"
                        ).length,

                    leave:
                        rows.filter(
                            (person) =>
                                normalizeStatus(person.status) === "ON LEAVE"
                        ).length,

                    late:
                        rows.filter(
                            (person) =>
                                normalizeStatus(person.status) === "LATE"
                        ).length,

                    active:
                        rows.filter(
                            (person) =>
                                person.isActive === true ||
                                String(person.active || "").toUpperCase() === "Y"
                        ).length,

                    inactive:
                        rows.filter(
                            (person) =>
                                person.isActive === false ||
                                String(person.active || "").toUpperCase() === "N"
                        ).length,
                },
        };
    };

/*
|--------------------------------------------------------------------------
| EMPLOYEE PROFILE - REAL SQL SERVER DATA
|--------------------------------------------------------------------------
*/

export const fetchEmployeeProfile =
    async (employeeId, date = "") => {
        const response =
            await axios.get(
                `${API_BASE}${ATTENDANCE_PROFILE_PATH}/${employeeId}/`,
                {
                    headers: getHeaders(),

                    params: {
                        date,
                    },
                }
            );

        return response.data;
    };

/*
|--------------------------------------------------------------------------
| ATTENDANCE CALENDAR - REAL SQL SERVER DATA
|--------------------------------------------------------------------------
*/

export const fetchEmployeeCalendar =
    async (
        employeeId,
        year,
        month
    ) => {
        const response =
            await axios.get(
                `${API_BASE}${ATTENDANCE_PROFILE_PATH}/${employeeId}/calendar/`,
                {
                    headers: getHeaders(),

                    params: {
                        year,
                        month,
                    },
                }
            );

        return (
            response.data?.results ||
            response.data?.records ||
            response.data?.calendar ||
            response.data?.data ||
            response.data ||
            []
        );
    };