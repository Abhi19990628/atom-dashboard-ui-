const people = [
    // =====================================================
    // PLANT 1 - WORKERS - DAY
    // =====================================================
    {
        id: "WRK001",
        name: "Aman Pal",
        designation: "Machine Operator",
        department: "Production",
        employeeType: "Worker",
        plant: "Plant 1",
        shift: "Day",
        inTime: "08:58 AM",
        outTime: "06:02 PM",
        workingHours: "09h 04m",
        status: "PRESENT",
        attendancePercentage: 91.3,
        avatar: "/Aman.jpg",
    },

    {
        id: "WRK002",
        name: "Ravi Shah",
        designation: "Assembly Worker",
        department: "Production",
        employeeType: "Worker",
        plant: "Plant 1",
        shift: "Day",
        inTime: "09:12 AM",
        outTime: "06:05 PM",
        workingHours: "08h 53m",
        status: "LATE",
        attendancePercentage: 88.2,
        avatar: "/AshokSir.jpg",
    },

    {
        id: "WRK003",
        name: "Jay Mehta",
        designation: "Press Operator",
        department: "Production",
        employeeType: "Worker",
        plant: "Plant 1",
        shift: "Day",
        inTime: "--",
        outTime: "--",
        workingHours: "--",
        status: "ABSENT",
        attendancePercentage: 80.5,
        avatar: "/rajeshsir.jpg",
    },

    {
        id: "WRK004",
        name: "Ketan Modi",
        designation: "Packing Worker",
        department: "Dispatch",
        employeeType: "Worker",
        plant: "Plant 1",
        shift: "Day",
        inTime: "08:52 AM",
        outTime: "06:00 PM",
        workingHours: "09h 08m",
        status: "PRESENT",
        attendancePercentage: 94.6,
        avatar: "/india.jpg",
    },

    // =====================================================
    // PLANT 1 - WORKERS - NIGHT
    // =====================================================
    {
        id: "WRK005",
        name: "Sanjay Parmar",
        designation: "Machine Operator",
        department: "Production",
        employeeType: "Worker",
        plant: "Plant 1",
        shift: "Night",
        inTime: "07:55 PM",
        outTime: "05:58 AM",
        workingHours: "10h 03m",
        status: "PRESENT",
        attendancePercentage: 93.1,
        avatar: "/default-avatar.png",
    },

    {
        id: "WRK006",
        name: "Mahesh Chauhan",
        designation: "Line Worker",
        department: "Production",
        employeeType: "Worker",
        plant: "Plant 1",
        shift: "Night",
        inTime: "--",
        outTime: "--",
        workingHours: "--",
        status: "ON LEAVE",
        attendancePercentage: 89.4,
        avatar: "/default-avatar.png",
    },

    // =====================================================
    // PLANT 1 - EMPLOYEES - DAY
    // =====================================================
    {
        id: "EMP001",
        name: "Neha Desai",
        designation: "Production Engineer",
        department: "Production",
        employeeType: "Employee",
        plant: "Plant 1",
        shift: "Day",
        inTime: "08:48 AM",
        outTime: "06:04 PM",
        workingHours: "09h 16m",
        status: "PRESENT",
        attendancePercentage: 96.4,
        avatar: "/default-avatar.png",
    },

    {
        id: "EMP002",
        name: "Vikram Singh",
        designation: "Quality Engineer",
        department: "Quality",
        employeeType: "Employee",
        plant: "Plant 1",
        shift: "Day",
        inTime: "09:18 AM",
        outTime: "06:10 PM",
        workingHours: "08h 52m",
        status: "LATE",
        attendancePercentage: 89.3,
        avatar: "/default-avatar.png",
    },

    {
        id: "EMP003",
        name: "Pooja Joshi",
        designation: "HR Executive",
        department: "HR",
        employeeType: "Employee",
        plant: "Plant 1",
        shift: "Day",
        inTime: "08:56 AM",
        outTime: "06:00 PM",
        workingHours: "09h 04m",
        status: "PRESENT",
        attendancePercentage: 95.7,
        avatar: "/default-avatar.png",
    },

    // =====================================================
    // PLANT 1 - EMPLOYEES - NIGHT
    // =====================================================
    {
        id: "EMP004",
        name: "Harsh Patel",
        designation: "Shift Supervisor",
        department: "Production",
        employeeType: "Employee",
        plant: "Plant 1",
        shift: "Night",
        inTime: "07:50 PM",
        outTime: "06:00 AM",
        workingHours: "10h 10m",
        status: "PRESENT",
        attendancePercentage: 92.8,
        avatar: "/default-avatar.png",
    },

    // =====================================================
    // PLANT 2 - WORKERS - DAY
    // =====================================================
    {
        id: "WRK101",
        name: "Rajesh Kumar",
        designation: "Machine Operator",
        department: "Production",
        employeeType: "Worker",
        plant: "Plant 2",
        shift: "Day",
        inTime: "08:50 AM",
        outTime: "06:01 PM",
        workingHours: "09h 11m",
        status: "PRESENT",
        attendancePercentage: 93.5,
        avatar: "/default-avatar.png",
    },

    {
        id: "WRK102",
        name: "Dhaval Patel",
        designation: "Assembly Worker",
        department: "Production",
        employeeType: "Worker",
        plant: "Plant 2",
        shift: "Day",
        inTime: "09:20 AM",
        outTime: "06:05 PM",
        workingHours: "08h 45m",
        status: "LATE",
        attendancePercentage: 86.2,
        avatar: "/default-avatar.png",
    },

    {
        id: "WRK103",
        name: "Manish Solanki",
        designation: "Helper",
        department: "Production",
        employeeType: "Worker",
        plant: "Plant 2",
        shift: "Day",
        inTime: "--",
        outTime: "--",
        workingHours: "--",
        status: "ABSENT",
        attendancePercentage: 77.4,
        avatar: "/default-avatar.png",
    },

    // =====================================================
    // PLANT 2 - WORKERS - NIGHT
    // =====================================================
    {
        id: "WRK104",
        name: "Vishal Makwana",
        designation: "CNC Operator",
        department: "Production",
        employeeType: "Worker",
        plant: "Plant 2",
        shift: "Night",
        inTime: "07:56 PM",
        outTime: "06:02 AM",
        workingHours: "10h 06m",
        status: "PRESENT",
        attendancePercentage: 94.2,
        avatar: "/default-avatar.png",
    },

    {
        id: "WRK105",
        name: "Hitesh Rathod",
        designation: "Line Worker",
        department: "Production",
        employeeType: "Worker",
        plant: "Plant 2",
        shift: "Night",
        inTime: "--",
        outTime: "--",
        workingHours: "--",
        status: "ON LEAVE",
        attendancePercentage: 90.1,
        avatar: "/default-avatar.png",
    },

    // =====================================================
    // PLANT 2 - EMPLOYEES - DAY
    // =====================================================
    {
        id: "EMP101",
        name: "Priya Shah",
        designation: "Quality Engineer",
        department: "Quality",
        employeeType: "Employee",
        plant: "Plant 2",
        shift: "Day",
        inTime: "08:45 AM",
        outTime: "06:03 PM",
        workingHours: "09h 18m",
        status: "PRESENT",
        attendancePercentage: 97.1,
        avatar: "/default-avatar.png",
    },

    {
        id: "EMP102",
        name: "Rahul Joshi",
        designation: "Maintenance Engineer",
        department: "Maintenance",
        employeeType: "Employee",
        plant: "Plant 2",
        shift: "Day",
        inTime: "09:10 AM",
        outTime: "06:08 PM",
        workingHours: "08h 58m",
        status: "LATE",
        attendancePercentage: 90.6,
        avatar: "/default-avatar.png",
    },

    // =====================================================
    // PLANT 2 - EMPLOYEES - NIGHT
    // =====================================================
    {
        id: "EMP103",
        name: "Suresh Sharma",
        designation: "Shift Supervisor",
        department: "Production",
        employeeType: "Employee",
        plant: "Plant 2",
        shift: "Night",
        inTime: "07:48 PM",
        outTime: "06:00 AM",
        workingHours: "10h 12m",
        status: "PRESENT",
        attendancePercentage: 94.8,
        avatar: "/default-avatar.png",
    },
];

export default people;