import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Activity,
    Building2,
    Calendar,
    CalendarDays,
    Clock3,
    Eye,
    Search,
    UserCheck,
    Users,
    UserX,
} from "lucide-react";

import Sidebar from "../Sidebar";
import { fetchAttendanceDashboard } from "./attendanceApi";
import "./AttendanceDashboard.css";

const todayInput = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
        now.getDate()
    ).padStart(2, "0")}`;
};

const show = (value, fallback = "--") =>
    value === undefined || value === null || value === "" ? fallback : value;

const AttendanceDashboard = ({ onLogout }) => {
    const navigate = useNavigate();

    const [selectedPlant, setSelectedPlant] = useState("Plant 1");
    const [employeeType, setEmployeeType] = useState("Worker");
    const [shift, setShift] = useState("Day");
    const [selectedDate, setSelectedDate] = useState(todayInput);
    const [search, setSearch] = useState("");

    const [employees, setEmployees] = useState([]);
    const [summary, setSummary] = useState({
        total: 0,
        present: 0,
        absent: 0,
        leave: 0,
        late: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        let active = true;

        const load = async () => {
            setLoading(true);
            setError("");

            try {
                const data = await fetchAttendanceDashboard({
                    plant: selectedPlant,
                    employeeType,
                    shift,
                    date: selectedDate,
                });

                if (!active) return;
                setEmployees(data.rows);
                setSummary(data.summary);
            } catch (err) {
                console.error("Attendance dashboard:", err);
                if (!active) return;
                setEmployees([]);
                setSummary({ total: 0, present: 0, absent: 0, leave: 0, late: 0 });
                setError(
                    err?.response?.data?.detail ||
                    err?.response?.data?.message ||
                    "Unable to load attendance data."
                );
            } finally {
                if (active) setLoading(false);
            }
        };

        load();
        return () => {
            active = false;
        };
    }, [selectedPlant, employeeType, shift, selectedDate]);

    useEffect(() => {
        setSearch("");
        setCurrentPage(1);
    }, [selectedPlant, employeeType, shift]);

    useEffect(() => setCurrentPage(1), [search, selectedDate]);

    const filteredEmployees = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return employees;

        return employees.filter((employee) =>
            [
                employee.name,
                employee.id,
                employee.department,
                employee.designation,
                employee.plant,
                employee.employeeType,
            ].some((value) => String(value || "").toLowerCase().includes(query))
        );
    }, [employees, search]);

    const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / rowsPerPage));
    const currentEmployees = filteredEmployees.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const percentage = (value) =>
        summary.total ? ((value / summary.total) * 100).toFixed(1) : "0.0";

    const cards = [
        {
            label: employeeType === "Worker" ? "Total Workers" : "Total Employees",
            value: summary.total,
            note: `${selectedPlant} • ${employeeType}`,
            icon: Users,
            type: "cyan",
        },
        {
            label: "Present Today",
            value: summary.present,
            note: `${percentage(summary.present)}% of total`,
            icon: UserCheck,
            type: "green",
        },
        {
            label: "Absent Today",
            value: summary.absent,
            note: `${percentage(summary.absent)}% of total`,
            icon: UserX,
            type: "red",
        },
        {
            label: "On Leave",
            value: summary.leave,
            note: `${percentage(summary.leave)}% of total`,
            icon: CalendarDays,
            type: "orange",
        },
        {
            label: "Late Today",
            value: summary.late,
            note: `${percentage(summary.late)}% of total`,
            icon: Clock3,
            type: "purple",
        },
    ];

    const dateLabel = new Date(`${selectedDate}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const statusClass = (status) =>
        String(status || "UNKNOWN").toLowerCase().replace(/\s+/g, "-");

    const openEmployee = (employee) =>
        navigate(`/attendance/employee/${encodeURIComponent(employee.id)}`);

    return (
        <div className="attendance-layout">
            <Sidebar onLogout={onLogout} />

            <main className="attendance-main">
                <section className="attendance-header">
                    <div className="attendance-title-group">
                        <div className="attendance-title-icon">
                            <Activity size={28} />
                        </div>
                        <div>
                            <h1>Attendance Hub</h1>
                            <p>Overview of employee attendance and status</p>
                        </div>
                    </div>

                    <div className="attendance-plant-control">
                        <div className="attendance-plant-label">
                            <Building2 size={16} />
                            <span>Plant</span>
                        </div>

                        <div className="attendance-segmented-control">
                            <button
                                type="button"
                                className={selectedPlant === "Plant 1" ? "active" : ""}
                                onClick={() => setSelectedPlant("Plant 1")}
                            >
                                Plant 1
                            </button>
                            <button
                                type="button"
                                className={selectedPlant === "Plant 2" ? "active" : ""}
                                onClick={() => setSelectedPlant("Plant 2")}
                            >
                                Plant 2
                            </button>
                        </div>
                    </div>
                </section>

                <section className="attendance-stats-grid">
                    {cards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <article className="attendance-stat-card" key={card.label}>
                                <div className={`attendance-stat-icon attendance-stat-${card.type}`}>
                                    <Icon size={28} />
                                </div>
                                <div>
                                    <p className="attendance-stat-label">{card.label}</p>
                                    <h2>{loading ? "..." : card.value}</h2>
                                    <span className="attendance-stat-note">{card.note}</span>
                                </div>
                            </article>
                        );
                    })}
                </section>

                <section className="attendance-filter-panel">
                    <div className="attendance-search">
                        <Search size={18} />
                        <input
                            value={search}
                            placeholder="Search by name, ID, role..."
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>

                    <div className="attendance-filter-field">
                        <label>Department</label>
                        <select value={employeeType} onChange={(event) => setEmployeeType(event.target.value)}>
                            <option value="Worker">Worker</option>
                            <option value="Employee">Employee</option>
                        </select>
                    </div>

                    <div className="attendance-filter-field">
                        <label>Shift</label>
                        <select value={shift} onChange={(event) => setShift(event.target.value)}>
                            <option value="Day">Day</option>
                            <option value="Night">Night</option>
                        </select>
                    </div>

                    <div className="attendance-filter-field">
                        <label>Date</label>
                        <div className="attendance-date-input">
                            <Calendar size={17} />
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(event) => setSelectedDate(event.target.value)}
                            />
                        </div>
                    </div>
                </section>

                <section className="attendance-table-card">
                    <div className="attendance-table-title">
                        <div>
                            <h3>
                                {employeeType === "Worker" ? "Workers" : "Employees"} ({filteredEmployees.length})
                            </h3>
                            <p>
                                {selectedPlant} • {employeeType} • {shift} Shift • {dateLabel}
                            </p>
                        </div>
                    </div>

                    {error && <div className="attendance-message attendance-message-error">{error}</div>}

                    <div className="attendance-table-wrapper">
                        <table className="attendance-table">
                            <thead>
                                <tr>
                                    <th>Person</th>
                                    <th>ID</th>
                                    <th>Department</th>
                                    <th>Shift</th>
                                    <th>Punch In</th>
                                    <th>Punch Out</th>
                                    <th>Working Hours</th>
                                    <th>Status</th>
                                    <th>Attendance %</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="10" className="attendance-no-data">Loading attendance...</td></tr>
                                ) : currentEmployees.length ? (
                                    currentEmployees.map((employee) => (
                                        <tr key={employee.id}>
                                            <td>
                                                <button className="attendance-employee-button" onClick={() => openEmployee(employee)}>
                                                    <img
                                                        src={employee.avatar || "/default-avatar.png"}
                                                        alt={employee.name}
                                                        onError={(event) => { event.currentTarget.src = "/default-avatar.png"; }}
                                                    />
                                                    <div>
                                                        <strong>{employee.name}</strong>
                                                        <span>{employee.designation || employee.employeeType || "--"}</span>
                                                    </div>
                                                </button>
                                            </td>
                                            <td>{show(employee.id)}</td>
                                            <td>{show(employee.department)}</td>
                                            <td>{show(employee.shift)}</td>
                                            <td className="att-time-green">{show(employee.inTime)}</td>
                                            <td className="att-time-red">{show(employee.outTime)}</td>
                                            <td>{show(employee.workingHours)}</td>
                                            <td>
                                                <span className={`attendance-status att-status-${statusClass(employee.status)}`}>
                                                    {show(employee.status)}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="attendance-percentage">
                                                    <div className="attendance-percentage-track">
                                                        <div
                                                            className="attendance-percentage-fill"
                                                            style={{
                                                                width: `${Math.min(100, Math.max(0, employee.attendancePercentage || 0))}%`,
                                                            }}
                                                        />
                                                    </div>
                                                    <span>
                                                        {employee.attendancePercentage ? `${employee.attendancePercentage}%` : "--"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <button className="attendance-view-button" onClick={() => openEmployee(employee)} title="View details">
                                                    <Eye size={17} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10" className="attendance-no-data">
                                            {error ? "Attendance data could not be loaded." : `No ${employeeType.toLowerCase()} records found.`}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="attendance-pagination">
                        <span>
                            Showing {filteredEmployees.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} -{" "}
                            {Math.min(currentPage * rowsPerPage, filteredEmployees.length)} of {filteredEmployees.length}
                        </span>
                        <div className="attendance-pagination-controls">
                            <button
                                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                                disabled={currentPage === 1}
                            >
                                ‹
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => index + 1)
                                .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                                .map((page) => (
                                    <button
                                        key={page}
                                        className={page === currentPage ? "active" : ""}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
                            <button
                                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                                disabled={currentPage === totalPages}
                            >
                                ›
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AttendanceDashboard;
