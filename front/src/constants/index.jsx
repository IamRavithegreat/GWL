import {
    ChartColumn,
    Home,
    NotepadText,
    Package,
    PackagePlus,
    Settings,
    ShoppingBag,
    UserCheck,
    UserPlus,
    Users,
    UserPen,
    LogOut,
    User,
} from "lucide-react";

import ProductImage from "@/assets/product-image.jpg";

export const navbarLinks = [
    {
        title: "Dashboard",
        links: [
            {
                label: "Dashboard",
                icon: Home,
                path: "/layout",
            },
        ],
    },
    {
        title: "Customers",
        links: [
            {
                label: "All Customer",
                icon: UserPen,
                path: "/layout/edit-customer",
            },
        ],
    },
    {
        title: "Employees",
        links: [
            {
                label: "All Employee",
                icon: PackagePlus,
                path: "/layout/edit-employee",
            },
        ],
    },
    {
        title: "Manager",
        links: [
            {
                label: "All Manager",
                icon: UserPen,
                path: "/layout/edit-manager",
            },
        ],
    },
    {
        title: "Super Manager",
        links: [
            {
                label: "All Super Manager",
                icon: UserPen,
                path: "/layout/edit-supermanager",
            },
        ],
    },
    {
        title: "Company",
        links: [
            {
                label: "All Company",
                icon: Package,
                path: "/layout/edit-company",
            },
        ],
    },
    {
        title: "Offers",
        links: [
            {
                label: "All Offer",
                icon: Package,
                path: "/layout/all-offers",
            },
            {
                label: "Add Customer Offers",
                icon: Package,
                path: "/layout/add-offers",
            },
            {
                label: "Add Employee Offers",
                icon: Package,
                path: "/layout/add-employee-offers",
            },
        ],
    },
    {
        title: "Upcoming Offers",
        links: [
            {
                label: "All UpcomingOffer",
                icon: Package,
                path: "/layout/all-upcomingoffers",
            },
            {
                label: "Add Customer Upcom..",
                icon: Package,
                path: "/layout/add-upcomingoffers",
            },
            {
                label: "Add Employee Upcom..",
                icon: Package,
                path: "/layout/add-employee-upcomingoffers",
            },
        ],
    },
    {
        title: "Profile",
        links: [
            {
                label: "Profile",
                icon: User,
                path: "/layout/profile",
            },
        ],
    },
    {
        title: "Relationship",
        links: [
            {
                label: "Relation",
                icon: User,
                path: "/layout/relation",
            },
        ],
    },
    {
        title: "Logout",
        links: [
            {
                label: "Logout",
                icon: LogOut,
                path: "/layout/Logout",
            },
        ],
    },
];

export const customernavbarLinks = [
    {
        links: [
            {
                label: "Dashboard",
                icon: User,
                path: "/Customerlayout",
            },
            {
                label: "Edit Profile",
                icon: UserPen,
                path: "/Customerlayout/edit-profile",
            },
            {
                label: "Company Profile",
                icon: UserPen,
                path: "/Customerlayout/company-profile",
            },
            {
                label: "Logout",
                icon: LogOut,
                path: "/Customerlayout/logout",
            },
        ],
    },
];

export const employeenavbarLinks = [
    {
        links: [
            {
                label: "Dashboard",
                icon: User,
                path: "/Employeelayout",
            },
            {
                label: "Edit Profile",
                icon: UserPen,
                path: "/Employeelayout/edit-profile",
            },
            {
                label: "Monthly Sale",
                icon: UserPen,
                path: "/Employeelayout/monthlysaleform",
            },
            {
                label: "Logout",
                icon: LogOut,
                path: "/Employeelayout/logout",
            },
        ],
    },
];

export const managernavbarLinks = [
    {
        links: [
            {
                label: "Dashboard",
                icon: User,
                path: "/Managerlayout",
            },
        ],
    },
    {
        title: "Customers",
        links: [
            {
                label: "Cust. Notification",
                icon: UserPen,
                path: "/Managerlayout/edit-customer",
            },
            {
                label: "Add Customer",
                icon: UserPen,
                path: "/Managerlayout/add-customer",
            },
            {
                label: "All Customer",
                icon: UserPen,
                path: "/Managerlayout/all-customer",
            },
        ],
    },
    {
        title: "Employees",
        links: [
            {
                label: "Empl. Notification",
                icon: PackagePlus,
                path: "/Managerlayout/edit-employee",
            },
            {
                label: "Add Employee",
                icon: PackagePlus,
                path: "/Managerlayout/add-employee",
            },
            {
                label: "All Employee",
                icon: PackagePlus,
                path: "/Managerlayout/all-employee",
            },
        ],
    },
    {
        title: "Company",
        links: [
            {
                label: "Comp. Notification",
                icon: Package,
                path: "/Managerlayout/edit-company",
            },
            {
                label: "Add Company",
                icon: Package,
                path: "/Managerlayout/add-company",
            },
            {
                label: "All Company",
                icon: Package,
                path: "/Managerlayout/all-company",
            },
        ],
    },
    {
        title: "Offers",
        links: [
            {
                label: "Offer Notification",
                icon: Package,
                path: "/Managerlayout/all-offers",
            },
            {
                label: "Add Customer Offers",
                icon: Package,
                path: "/Managerlayout/add-offers",
            },
            {
                label: "Add Employee Offers",
                icon: Package,
                path: "/Managerlayout/add-employee-offers",
            },
        ],
    },
    {
        title: "Upcoming Offers",
        links: [
            {
                label: "Upcoming Offer Noti.",
                icon: Package,
                path: "/Managerlayout/all-upcomingoffers",
            },
            {
                label: "Add Customer Upcom..",
                icon: Package,
                path: "/Managerlayout/add-upcomingoffers",
            },
            {
                label: "Add Employee Upcom..",
                icon: Package,
                path: "/Managerlayout/add-employee-upcomingoffers",
            },
        ],
    },
    {
        title: "Profile",
        links: [
            {
                label: "Profile",
                icon: UserPen,
                path: "/Managerlayout/edit-manager",
            },
        ],
    },
    {
        title: "Realtionship",
        links: [
            {
                label: "Relation",
                icon: User,
                path: "/Managerlayout/relation",
            },
        ],
    },
    {
        title: "Logout",
        links: [
            {
                label: "Logout",
                icon: LogOut,
                path: "/Managerlayout/logout",
            },
        ],
    },
];

export const lowermanagernavbarLinks = [
    {
        links: [
            {
                label: "Dashboard",
                icon: User,
                path: "/LowerManagerlayout",
            },
        ],
    },
    {
        title: "Customers",
        links: [
            {
                label: "Customer",
                icon: UserPen,
                path: "/LowerManagerlayout/edit-customer",
            },
        ],
    },
    {
        title: "Employees",
        links: [
            {
                label: "Employee",
                icon: PackagePlus,
                path: "/LowerManagerlayout/edit-employee",
            },
        ],
    },
    {
        title: "Company",
        links: [
            {
                label: "Company",
                icon: Package,
                path: "/LowerManagerlayout/edit-company",
            },
        ],
    },
    {
        title: "Offers",
        links: [
            {
                label: "All Offers",
                icon: Package,
                path: "/LowerManagerlayout/all-offers",
            },
            {
                label: "Add Customer Offers",
                icon: Package,
                path: "/LowerManagerlayout/add-offers",
            },
            {
                label: "Add Employee Offers",
                icon: Package,
                path: "/LowerManagerlayout/add-employee-offers",
            },
        ],
    },
    {
        title: "Upcoming Offers",
        links: [
            {
                label: "All Upcoming Offer",
                icon: Package,
                path: "/LowerManagerlayout/all-upcomingoffers",
            },
            {
                label: "Add Customer Upcom..",
                icon: Package,
                path: "/LowerManagerlayout/add-upcomingoffers",
            },
            {
                label: "Add Employee Upcom..",
                icon: Package,
                path: "/LowerManagerlayout/add-employee-upcomingoffers",
            },
        ],
    },
    {
        title: "Profile",
        links: [
            {
                label: "Profile",
                icon: UserPen,
                path: "/LowerManagerlayout/edit-manager",
            },
        ],
    },
    {
        title: "Realtionship",
        links: [
            {
                label: "Relation",
                icon: User,
                path: "/LowerManagerlayout/relation",
            },
        ],
    },
    {
        title: "Logout",
        links: [
            {
                label: "Logout",
                icon: LogOut,
                path: "/LowerManagerlayout/logout",
            },
        ],
    },
];

export const overviewData = [
    {
        name: "Jan",
        total: 1500,
    },
    {
        name: "Feb",
        total: 2000,
    },
    {
        name: "Mar",
        total: 1000,
    },
    {
        name: "Apr",
        total: 5000,
    },
    {
        name: "May",
        total: 2000,
    },
    {
        name: "Jun",
        total: 5900,
    },
    {
        name: "Jul",
        total: 2000,
    },
    {
        name: "Aug",
        total: 5500,
    },
    {
        name: "Sep",
        total: 2000,
    },
    {
        name: "Oct",
        total: 4000,
    },
    {
        name: "Nov",
        total: 1500,
    },
    {
        name: "Dec",
        total: 2500,
    },
];

export const recentSalesData = [
    {
        id: 1,
        name: "10% off on Dubai Export",
        email: "Book the service now",
        total: "Read More",
    },
    {
        id: 2,
        name: "10% off on Dubai Export",
        email: "Book the service now",
        total: "Read More",
    },
    {
        id: 3,
        name: "10% off on Dubai Export",
        email: "Book the service now",
        total: "Read More",
    },
    {
        id: 4,
        name: "10% off on Dubai Export",
        email: "Book the service now",
        total: "Read More",
    },
    {
        id: 5,
        name: "10% off on Dubai Export",
        email: "Book the service now",
        total: "Read More",
    },
    {
        id: 6,
        name: "10% off on Dubai Export",
        email: "Book the service now",
        total: "Read More",
    },
    {
        id: 7,
        name: "10% off on Dubai Export",
        email: "Book the service now",
        total: "Read More",
    },
];

export const topProducts = [
    {
        number: 1,
        name: "Iron Man",
        image: ProductImage,
        description: "High-quality noise-canceling wireless headphones.",
        email: "wwl123@gmail.com",
        status: "Active",
        rating: 4.5,
    },
    {
        number: 2,
        name: "Captain India",
        image: ProductImage,
        description: "Latest 5G smartphone with excellent camera features.",
        email: "wwl123@gmail.com",
        status: "Inactive",
        rating: 4.7,
    },
    {
        number: 3,
        name: "Pad Man",
        image: ProductImage,
        description: "Powerful gaming laptop with high-end graphics.",
        email: "wwl123@gmail.com",
        status: "Inactive",
        rating: 4.8,
    },
    {
        number: 4,
        name: "Bat Man",
        image: ProductImage,
        description: "Stylish smartwatch with fitness tracking features.",
        email: "wwl123@gmail.com",
        status: "Active",
        rating: 4.4,
    },
    {
        number: 5,
        name: "Super Man",
        image: ProductImage,
        description: "Portable Bluetooth speaker with deep bass sound.",
        email: "wwl123@gmail.com",
        status: "Inactive",
        rating: 4.3,
    },
    {
        number: 6,
        name: "Spider Man",
        image: ProductImage,
        description: "Ultra HD 4K monitor with stunning color accuracy.",
        email: "wwl123@gmail.com",
        status: "Inactive",
        rating: 4.6,
    },
    {
        number: 7,
        name: "Hulk",
        image: ProductImage,
        description: "Mechanical keyboard with customizable RGB lighting.",
        email: "wwl123@gmail.com",
        status: "Inactive",
        rating: 4.7,
    },
    {
        number: 8,
        name: "Thor",
        image: ProductImage,
        description: "Ergonomic wireless mouse with precision tracking.",
        email: "wwl123@gmail.com",
        status: "Inactive",
        rating: 4.5,
    },
    {
        number: 9,
        name: "Black Widow",
        image: ProductImage,
        description: "Waterproof action camera with 4K video recording.",
        email: "wwl123@gmail.com",
        status: "Inactive",
        rating: 4.8,
    },
    {
        number: 10,
        name: "Aqua Man",
        image: ProductImage,
        description: "Portable 2TB external hard drive for data storage.",
        email: "wwl123@gmail.com",
        status: "Active",
        rating: 4.5,
    },
];
