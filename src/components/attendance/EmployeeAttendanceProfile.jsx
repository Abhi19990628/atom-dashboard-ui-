import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    Activity,
    ArrowLeft,
    Bell,
    Building2,
    CalendarDays,
    Check,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Download,
    Edit3,
    Factory,
    HeartPulse,
    History,
    LayoutGrid,
    Moon,
    MoreVertical,
    Sun,
    Timer,
    User,
    Users,
    X,
} from "lucide-react";

import Sidebar from "../Sidebar";
import { fetchEmployeeCalendar, fetchEmployeeProfile } from "./attendanceApi";
import "./EmployeeAttendanceProfile.css";

const show = (value, fallback = "--") =>
    value === undefined || value === null || value === "" ? fallback : value;

const monthLabel = (date) =>
    date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

const statusClass = (status) =>
    String(status || "UNKNOWN").toLowerCase().replace(/\s+/g, "-");

const statusCode = (status) => {
    const value = String(status || "").toUpperCase();

    if (value.includes("HALF")) return "HD";
    if (value.includes("GATE")) return "G";
    if (value.includes("LATE")) return "L";
    if (value.includes("PRESENT")) return "P";
    if (value.includes("ABSENT")) return "A";
    if (value.includes("LEAVE")) return "LV";
    if (value.includes("HOLIDAY")) return "H";
    if (value.includes("WEEK OFF") || value.includes("WEEKOFF") || value === "OFF") return "W";

    return "";
};

const getInitialCalendarMonth = (profileDate) => {
    if (profileDate) {
        const parsed = new Date(`${profileDate}T00:00:00`);

        if (!Number.isNaN(parsed.getTime())) {
            return new Date(parsed.getFullYear(), parsed.getMonth(), 1);
        }
    }

    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
};

const getDisplayType = (profile) => {
    if (!profile) return "--";

    if (profile.typeDisplay) return profile.typeDisplay;

    if (profile.employeeType === "Employee") {
        return "Office Employee";
    }

    if (profile.vendorName) {
        return "Vendor Worker";
    }

    return profile.workerCategory || "Company Worker";
};

const getActiveBadgeText = (profile) => {
    if (profile?.activeText) return profile.activeText;
    if (profile?.isActive === false || profile?.active === "N") return "Inactive";
    return "Active";
};

const normalizeAttendanceHealth = (profile) => {
    const monthly = profile?.monthlyAttendance || {};
    const health = profile?.attendanceHealth || {};

    return {
        score: Number(health.score ?? monthly.attendancePercentage ?? 0),
        totalDays: Number(monthly.totalDays ?? health.totalDays ?? 0),
        presentDays: Number(health.presentDays ?? monthly.presentDays ?? 0),
        lateArrivals: Number(health.lateArrivals ?? monthly.lateDays ?? 0),
        gatePassDays: Number(health.gatePassDays ?? monthly.gatePassDays ?? 0),
        halfDays: Number(health.halfDays ?? monthly.halfDays ?? 0),
        absentDays: Number(health.absentDays ?? monthly.absentDays ?? 0),
        previousMonthDifference: Number(health.previousMonthDifference ?? 0),
    };
};

const getPunchHistoryRows = (profile, calendarRecords) => {
    if (Array.isArray(calendarRecords) && calendarRecords.length) {
        return calendarRecords.map((record) => ({
            date: record.displayDate || record.date,
            inTime: record.punchIn,
            outTime: record.punchOut,
            hours: record.workingHours,
            late: record.remark || record.late || (record.lateMinutes ? `${record.lateMinutes}m` : null),
            status: record.status,
        }));
    }

    return Array.isArray(profile?.history) ? profile.history : [];
};

const EmployeeAttendanceProfile = ({ onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { employeeId } = useParams();

    const profileDate =
        new URLSearchParams(location.search).get("date") || "";

    const [theme, setTheme] = useState(
        () => localStorage.getItem("atomone-theme") || "dark"
    );
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("Overview");

    const [calendarMonth, setCalendarMonth] = useState(() => getInitialCalendarMonth(profileDate));
    const [calendarRecords, setCalendarRecords] = useState([]);
    const [calendarLoading, setCalendarLoading] = useState(false);
    const [calendarError, setCalendarError] = useState("");

    const overviewRef = useRef(null);
    const attendanceRef = useRef(null);
    const todayRef = useRef(null);
    const punchHistoryRef = useRef(null);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("atomone-theme", theme);
    }, [theme]);

    useEffect(() => {
        setCalendarMonth(getInitialCalendarMonth(profileDate));
    }, [profileDate]);

    useEffect(() => {
        let active = true;

        const load = async () => {
            setLoading(true);
            setError("");

            try {
                const data = await fetchEmployeeProfile(employeeId, profileDate);
                if (active) setProfile(data);
            } catch (err) {
                console.error("Employee profile:", err);

                if (active) {
                    setProfile(null);
                    setError(
                        err?.response?.data?.detail ||
                        err?.response?.data?.message ||
                        "Unable to load employee details."
                    );
                }
            } finally {
                if (active) setLoading(false);
            }
        };

        load();

        return () => {
            active = false;
        };
    }, [employeeId, profileDate]);

    useEffect(() => {
        let active = true;

        const loadCalendar = async () => {
            setCalendarLoading(true);
            setCalendarError("");

            try {
                const data = await fetchEmployeeCalendar(
                    employeeId,
                    calendarMonth.getFullYear(),
                    calendarMonth.getMonth() + 1
                );

                if (active) setCalendarRecords(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Attendance calendar:", err);

                if (active) {
                    setCalendarRecords([]);
                    setCalendarError(
                        err?.response?.data?.detail ||
                        err?.response?.data?.message ||
                        "Calendar data is not available for this month."
                    );
                }
            } finally {
                if (active) setCalendarLoading(false);
            }
        };

        loadCalendar();

        return () => {
            active = false;
        };
    }, [employeeId, calendarMonth]);

    const calendarMap = useMemo(() => {
        const map = new Map();

        calendarRecords.forEach((record) => {
            if (!record.date) return;

            const date = new Date(`${record.date}T00:00:00`);
            if (Number.isNaN(date.getTime())) return;

            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
                date.getDate()
            ).padStart(2, "0")}`;

            map.set(key, record);
        });

        return map;
    }, [calendarRecords]);

    const calendarCells = useMemo(() => {
        const year = calendarMonth.getFullYear();
        const month = calendarMonth.getMonth();
        const firstWeekday = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPreviousMonth = new Date(year, month, 0).getDate();
        const cells = [];

        for (let i = firstWeekday - 1; i >= 0; i -= 1) {
            cells.push({ day: daysInPreviousMonth - i, muted: true, record: null });
        }

        for (let day = 1; day <= daysInMonth; day += 1) {
            const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            cells.push({ day, muted: false, record: calendarMap.get(key) || null });
        }

        let nextDay = 1;

        while (cells.length % 7 !== 0) {
            cells.push({ day: nextDay, muted: true, record: null });
            nextDay += 1;
        }

        return cells;
    }, [calendarMonth, calendarMap]);

    const moveMonth = (change) => {
        setCalendarMonth(
            (current) => new Date(current.getFullYear(), current.getMonth() + change, 1)
        );
    };

    const scrollTo = (name, ref) => {
        setActiveTab(name);
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const downloadReport = () => {
        if (!profile) return;

        const health = normalizeAttendanceHealth(profile);
        const rows = [
            ["Employee Attendance Report"],
            [],
            ["Paycode", profile.paycode || profile.id],
            ["Card No", profile.cardNo],
            ["Employee Name", profile.name],
            ["Type", getDisplayType(profile)],
            ["Plant", profile.plant],
            ["Department", profile.department],
            ["Designation", profile.designation],
            ["Shift", profile.shift],
            ["Joining Date", profile.joiningDate || profile.dateOfJoining],
            ["Date of Birth", profile.dateOfBirth],
            ["Status", getActiveBadgeText(profile)],
            ["Guardian", profile.guardianName],
            [],
            ["Today Punch In", profile.today?.punchIn],
            ["Today Punch Out", profile.today?.punchOut],
            ["Today Working Hours", profile.today?.workingHours],
            ["Today Status", profile.today?.status],
            [],
            ["Month Total Days", health.totalDays],
            ["Month Present Days", health.presentDays],
            ["Month Late Arrivals", health.lateArrivals],
            ["Month Gate Pass", health.gatePassDays],
            ["Month Half Day", health.halfDays],
            ["Month Absent Days", health.absentDays],
            ["Month Attendance %", `${health.score}%`],
        ];

        const csv = rows.map((row) => row.map((value) => `"${value ?? ""}"`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `${profile.paycode || profile.id}-attendance-report.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    if (loading) {
        return (
            <div className="eap-layout">
                <Sidebar onLogout={onLogout} />
                <main className="eap-main">
                    <div className="eap-not-found">
                        <Activity size={42} />
                        <h2>Loading employee...</h2>
                    </div>
                </main>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="eap-layout">
                <Sidebar onLogout={onLogout} />
                <main className="eap-main">
                    <div className="eap-not-found">
                        <User size={42} />
                        <h2>Employee not found</h2>
                        <p>{error || `No employee exists with ID ${employeeId}.`}</p>
                        <button onClick={() => navigate("/attendance")}>
                            <ArrowLeft size={17} /> Back to Attendance
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    const isOfficeEmployee = profile.employeeType === "Employee";
    const machine = profile.machineWorking;
    const health = normalizeAttendanceHealth(profile);
    const punchHistoryRows = getPunchHistoryRows(profile, calendarRecords);
    const today = profile.today || {};
    const machineOut = machine?.punchOut
        ? machine.punchOut
        : machine?.isWorking
            ? "Currently working"
            : "Not available";

    return (
        <div className="eap-layout">
            <Sidebar onLogout={onLogout} />

            <main className="eap-main">
                <section className="eap-topbar">
                    <button className="eap-back-button" onClick={() => navigate("/attendance")}>
                        <ArrowLeft size={17} /> Employees
                    </button>

                    <div className="eap-topbar-actions">
                        <button
                            className="eap-icon-button"
                            onClick={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
                            title="Change theme"
                        >
                            {theme === "dark" ? <Moon size={17} /> : <Sun size={17} />}
                        </button>

                        <button className="eap-icon-button" title="Notifications">
                            <Bell size={17} />
                        </button>

                        <div className="eap-admin-mini">
                            <img src={localStorage.getItem("profile_image") || "/default-avatar.png"} alt="Admin" />
                            <span>{localStorage.getItem("full_name") || localStorage.getItem("username") || "Admin"}</span>
                            <ChevronDown size={14} />
                        </div>
                    </div>
                </section>

                <section className="eap-employee-header" ref={overviewRef}>
                    <div className="eap-employee-main">
                        <img
                            className="eap-profile-image"
                            src={profile.avatar || "/default-avatar.png"}
                            alt={profile.name}
                            onError={(event) => { event.currentTarget.src = "/default-avatar.png"; }}
                        />

                        <div className="eap-employee-info">
                            <h1>{show(profile.name, "Employee")}</h1>
                            <div className="eap-employee-subtitle">
                                <span>{show(profile.paycode || profile.id)}</span><i />
                                <span>{show(getDisplayType(profile))}</span><i />
                                <span>{show(profile.department)}</span><i />
                                <span>{show(profile.designation)}</span>
                            </div>

                            <div className="eap-employee-badges">
                                <span
                                    className={`eap-badge ${
                                        profile.isActive === false
                                            ? "eap-badge-inactive"
                                            : "eap-badge-active"
                                    }`}
                                >
                                    {show(getActiveBadgeText(profile))}
                                </span>

                                <span className="eap-badge eap-badge-shift">
                                    <CalendarDays size={13} /> {show(profile.shift)}
                                </span>

                                <span className={`eap-badge ${today.status === "PRESENT" ? "eap-badge-present" : "eap-badge-neutral"}`}>
                                    <Check size={13} /> {show(today.status)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="eap-header-buttons">
                        <button className="eap-edit-button" onClick={() => alert("Connect this button to your existing employee edit flow.")}>
                            <Edit3 size={16} /> Edit Employee
                        </button>
                        <button className="eap-download-button" onClick={downloadReport}>
                            <Download size={16} /> Download Report
                        </button>
                    </div>

                    <div className="eap-header-meta">
                        <span><Building2 size={14} />{show(profile.plant)}</span>
                        <span><Users size={14} />Type: <strong>{show(getDisplayType(profile))}</strong></span>
                        <span><Clock3 size={14} />{show(profile.shiftTiming)}</span>
                    </div>
                </section>

                <section className="eap-tabs">
                    <button className={activeTab === "Overview" ? "active" : ""} onClick={() => scrollTo("Overview", overviewRef)}>
                        <LayoutGrid size={15} /> Overview
                    </button>
                    <button className={activeTab === "Attendance" ? "active" : ""} onClick={() => scrollTo("Attendance", attendanceRef)}>
                        <CalendarDays size={15} /> Attendance
                    </button>
                    <button className={activeTab === "Punch History" ? "active" : ""} onClick={() => scrollTo("Punch History", punchHistoryRef)}>
                        <History size={15} /> Punch History
                    </button>
                </section>

                <section className={`eap-grid eap-grid-top ${isOfficeEmployee ? "eap-grid-top-office" : ""}`}>
                    <article className="eap-card">
                        <div className="eap-card-title"><span><User size={15} />PERSONAL / JOB DETAILS</span><MoreVertical size={15} /></div>
                        <div className="eap-personal-grid">
                            <div className="eap-detail-row"><span>Paycode</span><strong>{show(profile.paycode || profile.id)}</strong></div>
                            <div className="eap-detail-row"><span>Card No</span><strong>{show(profile.cardNo)}</strong></div>
                            <div className="eap-detail-row"><span>Type</span><strong>{show(getDisplayType(profile))}</strong></div>
                            {!isOfficeEmployee && <div className="eap-detail-row"><span>Vendor</span><strong>{show(profile.vendorName)}</strong></div>}
                            <div className="eap-detail-row"><span>Department</span><strong>{show(profile.department)}</strong></div>
                            <div className="eap-detail-row"><span>Designation</span><strong>{show(profile.designation)}</strong></div>
                            <div className="eap-detail-row"><span>Shift</span><strong>{show(profile.shift)}</strong></div>
                            <div className="eap-detail-row"><span>Status</span><strong>{show(getActiveBadgeText(profile))}</strong></div>
                            <div className="eap-detail-row"><span>Joining Date</span><strong>{show(profile.joiningDate || profile.dateOfJoining)}</strong></div>
                            <div className="eap-detail-row"><span>DOB</span><strong>{show(profile.dateOfBirth)}</strong></div>
                            <div className="eap-detail-row"><span>Gender</span><strong>{show(profile.gender)}</strong></div>
                            <div className="eap-detail-row"><span>Guardian</span><strong>{show(profile.guardianName)}</strong></div>
                            <div className="eap-detail-row"><span>Mobile</span><strong>{show(profile.mobile)}</strong></div>
                            <div className="eap-detail-row"><span>Email</span><strong className="eap-email">{show(profile.email)}</strong></div>
                        </div>
                    </article>

                    <article className="eap-card" ref={todayRef}>
                        <div className="eap-card-title"><span><CalendarDays size={15} />TODAY ATTENDANCE</span><MoreVertical size={15} /></div>
                        <div className="eap-today-stats">
                            <div className="eap-today-stat punch-in"><Clock3 size={17} /><span>Punch In</span><strong>{show(today.punchIn)}</strong></div>
                            <div className="eap-today-stat punch-out"><Clock3 size={17} /><span>Punch Out</span><strong>{today.punchOut || "--"}</strong></div>
                            <div className="eap-today-stat work-hours"><Timer size={17} /><span>Work Hours</span><strong>{show(today.workingHours)}</strong></div>
                            <div className="eap-today-stat status"><Check size={17} /><span>Status</span><strong>{show(today.status)}</strong></div>
                        </div>
                        <div className="eap-day-timeline">
                            <div className="eap-timeline-labels"><span>{show(today.shiftStart)}</span><span>{show(today.shiftEnd)}</span></div>
                            <div className="eap-timeline-track"><span className="eap-dot start" /><div className="eap-worked-track" /><span className="eap-dot end" /></div>
                            <div className="eap-timeline-punches"><span>In: {show(today.punchIn)}</span><span>Out: {today.punchOut || "--"}</span></div>
                        </div>
                    </article>

                    {!isOfficeEmployee && (
                        <article className="eap-card eap-machine-card">
                            <div className="eap-card-title"><span><Factory size={15} />ACTUAL WORKING HOURS ON MACHINE</span><MoreVertical size={15} /></div>
                            {machine ? (
                                <>
                                    {machine.machineName && (
                                        <div className="eap-machine-name"><Factory size={14} /><span>Machine</span><strong>{machine.machineName}</strong></div>
                                    )}
                                    <div className="eap-machine-stats">
                                        <div className="eap-machine-stat in"><Clock3 size={18} /><span>Punch In</span><strong>{show(machine.punchIn)}</strong></div>
                                        <div className="eap-machine-stat out"><Clock3 size={18} /><span>Punch Out</span><strong>{machineOut}</strong></div>
                                        <div className="eap-machine-stat hours"><Timer size={18} /><span>Working Hours</span><strong>{show(machine.workingHours, machine.isWorking ? "In progress" : "Not available")}</strong></div>
                                    </div>
                                    {machine.isWorking && !machine.punchOut && (
                                        <div className="eap-working-now"><span />Employee is currently working on the machine.</div>
                                    )}
                                </>
                            ) : (
                                <div className="eap-machine-empty"><Factory size={26} /><div><strong>Machine working data not available</strong><span>No machine punch information was returned for this worker.</span></div></div>
                            )}
                        </article>
                    )}
                </section>

                <section className="eap-grid eap-grid-middle" ref={attendanceRef}>
                    <article className="eap-card">
                        <div className="eap-card-title"><span><HeartPulse size={15} />ATTENDANCE HEALTH</span><MoreVertical size={15} /></div>
                        <div className="eap-health-content">
                            <div className="eap-score-circle" style={{ "--score": `${Math.max(0, Math.min(100, health.score)) * 3.6}deg` }}>
                                <div><strong>{health.score}%</strong><span>Month Score</span></div>
                            </div>
                            <div className="eap-health-details">
                                <span className="eap-health-good">{monthLabel(calendarMonth)} Till Date <Check size={13} /></span>
                                <p><i className="green" /><strong>{health.totalDays}</strong>Total Days</p>
                                <p><i className="green" /><strong>{health.presentDays}</strong>Present Days</p>
                                <p><i className="orange" /><strong>{health.lateArrivals}</strong>Late Arrivals</p>
                                <p><i className="orange" /><strong>{health.gatePassDays}</strong>Gate Pass</p>
                                <p><i className="orange" /><strong>{health.halfDays}</strong>Half Day</p>
                                <p><i className="red" /><strong>{health.absentDays}</strong>Absent Days</p>
                                <div className="eap-health-comparison">Previous month difference: <strong className={health.previousMonthDifference >= 0 ? "positive" : "negative"}>{health.previousMonthDifference >= 0 ? "+" : ""}{health.previousMonthDifference}%</strong></div>
                            </div>
                        </div>
                    </article>

                    <article className="eap-card eap-calendar-card">
                        <div className="eap-card-title">
                            <span><CalendarDays size={15} />ATTENDANCE CALENDAR</span>
                            <div className="eap-calendar-heading">
                                <button onClick={() => moveMonth(-1)} aria-label="Previous month"><ChevronLeft size={15} /></button>
                                <strong>{monthLabel(calendarMonth)}</strong>
                                <button onClick={() => moveMonth(1)} aria-label="Next month"><ChevronRight size={15} /></button>
                            </div>
                        </div>

                        {calendarError && <div className="eap-calendar-message">{calendarError}</div>}

                        <div className="eap-calendar">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <div className="eap-calendar-weekday" key={day}>{day}</div>)}
                            {calendarCells.map((cell, index) => {
                                const code = cell.record ? statusCode(cell.record.status) : "";
                                return (
                                    <div className={`eap-calendar-day ${cell.muted ? "muted" : ""}`} key={`${calendarMonth.getTime()}-${index}`}>
                                        <span>{cell.day}</span>
                                        {code && <i className={`eap-calendar-status ${statusClass(cell.record.status)}`}>{code}</i>}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="eap-calendar-legend eap-calendar-legend-wide">
                            <span><i className="eap-calendar-status present">P</i>Present</span>
                            <span><i className="eap-calendar-status late">L</i>Late</span>
                            <span><i className="eap-calendar-status gate-pass">G</i>Gate Pass</span>
                            <span><i className="eap-calendar-status half-day">HD</i>Half Day</span>
                            <span><i className="eap-calendar-status absent">A</i>Absent</span>
                            <span><i className="eap-calendar-status on-leave">LV</i>Leave</span>
                            <span><i className="eap-calendar-status holiday">H</i>Holiday</span>
                            <span><i className="eap-calendar-status week-off">W</i>Week Off</span>
                        </div>

                        {calendarLoading && <div className="eap-calendar-loading">Loading {monthLabel(calendarMonth)}...</div>}
                    </article>

                    <article className="eap-card" ref={punchHistoryRef}>
                        <div className="eap-card-title"><span><History size={15} />MONTH PUNCH HISTORY</span><MoreVertical size={15} /></div>
                        <div className="eap-history-table-wrapper">
                            <table className="eap-history-table">
                                <thead><tr><th>Date</th><th>In</th><th>Out</th><th>Hours</th><th>Late / Gate Pass</th><th>Status</th></tr></thead>
                                <tbody>
                                    {punchHistoryRows.length ? punchHistoryRows.map((row, index) => (
                                        <tr key={`${row.date}-${index}`}>
                                            <td>{show(row.date)}</td>
                                            <td>{show(row.inTime)}</td>
                                            <td>{show(row.outTime)}</td>
                                            <td>{show(row.hours)}</td>
                                            <td className={row.late ? "eap-late-text" : ""}>{show(row.late)}</td>
                                            <td><span className={`eap-history-status ${statusClass(row.status)}`}>{show(row.status)}</span></td>
                                        </tr>
                                    )) : <tr><td colSpan="6" className="eap-empty-row">No punch history available for this month.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </article>
                </section>

                <section className="eap-grid eap-grid-bottom">
                    <article className="eap-card">
                        <div className="eap-card-title"><span><Clock3 size={15} />SHIFT INFORMATION</span><MoreVertical size={15} /></div>
                        <div className="eap-shift-details">
                            <p><span>Shift</span><strong>{show(profile.shiftInformation?.shift || profile.shift)}</strong></p>
                            <p><span>Shift Timing</span><strong>{show(profile.shiftInformation?.timing || profile.shiftTiming)}</strong></p>
                            <p><span>Break</span><strong>{show(profile.shiftInformation?.breakTime)}</strong></p>
                            <p><span>Grace Period</span><strong>{show(profile.shiftInformation?.gracePeriod)}</strong></p>
                            <p><span>Weekly Off</span><strong>{show(profile.shiftInformation?.weeklyOff)}</strong></p>
                            <p><span>Full Day Min</span><strong>{show(profile.shiftInformation?.fullDayMinimum)}</strong></p>
                            <p><span>Half Day Rule</span><strong>{show(profile.shiftInformation?.halfDayMinimum)}</strong></p>
                        </div>
                    </article>

                    <article className="eap-card">
                        <div className="eap-card-title"><span><Activity size={15} />RECENT ACTIVITY</span><MoreVertical size={15} /></div>
                        <div className="eap-activity-list">
                            {Array.isArray(profile.recentActivity) && profile.recentActivity.length ? profile.recentActivity.map((activity, index) => {
                                const type = String(activity.type || "info").toLowerCase();
                                const cls = type.includes("success") ? "success" : type.includes("warning") || type.includes("late") ? "warning" : type.includes("danger") || type.includes("error") ? "danger" : "info";

                                return (
                                    <div className="eap-activity-item" key={`${activity.date}-${index}`}>
                                        <div className={`eap-activity-dot ${cls}`}>{cls === "success" ? <Check size={10} /> : cls === "danger" ? <X size={10} /> : <Clock3 size={10} />}</div>
                                        <span>{show(activity.date)}</span><p>{show(activity.text)}</p>
                                    </div>
                                );
                            }) : <div className="eap-empty-activity">No recent activity available.</div>}
                        </div>
                    </article>
                </section>
            </main>
        </div>
    );
};

export default EmployeeAttendanceProfile;