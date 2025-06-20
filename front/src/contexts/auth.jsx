import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const AuthProvier = ({ children }) => {

    // *************************************customer***********************************************
    // function to store token in local storage
    const [token, settoken] = useState(localStorage.getItem("token") || null);
    const storetoken = (serverToken) => {
        return localStorage.setItem("token", serverToken);
    };

    // logic to check if user is logged in or not
    let isloggedin = !!token;
    const logoutuser = () => {
        settoken("");
        sessionStorage.removeItem("id");
        return localStorage.removeItem("token");
    };

    // fetch all customer data
    const [customersdata, setCustomersdata] = useState([]);
    const fetchalluser = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/alluser");
            //console.log(response.data.customer);
            setCustomersdata(response.data.customer);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchalluser();
    }, []);

    // get single customer data
    const [user, setuser] = useState({});
    const [userid, setuserid] = useState(sessionStorage.getItem("id"))
    const fetchcustomerData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/user/${userid}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            setuser(response.data.userdata);
        } catch (err) {
            console.log("Error fetching user data:", err.response?.status || err.message);
        }
    };
    useEffect(() => {
        fetchcustomerData();
    }, []);

    // *************************************employee***********************************************

    // function to store employee token in local storage
    const [employeetoken, setemployeetoken] = useState(localStorage.getItem("employeetoken") || null);
    const storeemployeetoken = (serveremployeeToken) => {
        return localStorage.setItem("employeetoken", serveremployeeToken);
    };

    // logic to check if admin is logged in or not
    let isloggedemployee = !!employeetoken;
    const logoutemployee = () => {
        setemployeetoken("");
        sessionStorage.removeItem("employeeid");
        return localStorage.removeItem("employeetoken");
    };
    // fetch all employee data
    const [employeedata, setemployeedata] = useState([]);
    const fetchallemployee = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/allemployee");
            //console.log(response.data.employees);
            setemployeedata(response.data.employees);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchallemployee();
    }, []);

    // get single employee data
    const [singleemployee, setsingleemployee] = useState({});
    const fetchuserData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/employee/${sessionStorage.getItem("employeeid")}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            //console.log(response.data);
            setsingleemployee(response.data.employeedata);
        } catch (err) {
            console.log("Error fetching user data:", err.response?.status || err.message);
        }
    };
    useEffect(() => {
        fetchuserData();
    }, []);

    // ************************************lowermanager*******************************************
    // function to store manager token in local storage
    const [lowermanagertoken, setlowermanagertoken] = useState(localStorage.getItem("lowermanagertoken") || null);
    const storelowermanagertoken = (serverlowermanagerToken) => {
        return localStorage.setItem("lowermanagertoken", serverlowermanagerToken);
    };
    // logic to check if manager is logged in or not
    let isloggedlowermanager = !!lowermanagertoken;
    const logoutlowermanager = () => {
        setlowermanagertoken("");
        return localStorage.removeItem("lowermanagertoken");
    };
    // function to fetch single manager from the server
    const [lowermanager, setlowermanager] = useState({});
    const [lowermanagerid, setlowermanagerid] = useState(sessionStorage.getItem("lowermanagerid"));
    const fetchlowermanagerData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/getlowermanager/${lowermanagerid}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            //console.log(response.data.managerdata);
            setlowermanager(response.data.managerdata);
        } catch (err) {
            console.log(err.response?.status || err.message);
        }
    };
    useEffect(() => {
        fetchlowermanagerData();
    }, []);

    //fetch all lower manager data
    const [lowermanagerdata, setlowermanagerdata] = useState([]);
    const fetchallLowermanager = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/allLowermanager");
            //console.log(response.data.manager);
            setlowermanagerdata(response.data.manager);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchallLowermanager();
    }, []);

    // *************************************manager***********************************************
    // function to store manager token in local storage
    const [managertoken, setmanagertoken] = useState(localStorage.getItem("managertoken") || null);
    const storemanagertoken = (servermanagerToken) => {
        return localStorage.setItem("managertoken", servermanagerToken);
    };
    // logic to check if manager is logged in or not
    let isloggedmanager = !!managertoken;
    const logoutmanager = () => {
        setmanagertoken("");
        return localStorage.removeItem("managertoken");
    };
    // fetch all manager data
    const [managerdata, setmanagerdata] = useState([]);
    const fetchallmanager = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/allmanager");
            //console.log(response.data.manager);
            setmanagerdata(response.data.manager);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchallmanager();
    }, []);

    // function to fetch single manager from the server
    const [manager, setmanager] = useState({});
    const fetchmanagerData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/manager/${sessionStorage.getItem("managerid")}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            //console.log(response.data);
            setmanager(response.data.managerdata);
        } catch (err) {
            console.log("Error fetching user data:", err.response?.status || err.message);
        }
    };
    useEffect(() => {
        fetchmanagerData();
    }, []);
    // *************************************admin***********************************************

    // function to store admin token in local storage
    const [admintoken, setadmintoken] = useState(localStorage.getItem("admintoken") || null);
    const storeadmintoken = (serveradminToken) => {
        return localStorage.setItem("admintoken", serveradminToken);
    };
    // logic to check if admin is logged in or not
    let isloggedadmin = !!admintoken;
    const logoutadmin = () => {
        setadmintoken("");
        sessionStorage.removeItem("adminid");
        return localStorage.removeItem("admintoken");
    };

    // *************************************offer***************************************************
    // get all offer function
    const [offerdata, setofferdata] = useState([]);
    const fetchalloffer = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/get-offer");
            //console.log(response.data.offer);
            setofferdata(response.data.offer);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchalloffer();
    }, []);


    // get all employee offer function
    const [employeeofferdata, setemployeeofferdata] = useState([]);
    const fetchallemployeeoffer = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/getall-employee-offer");
            //console.log(response.data.offer);
            setemployeeofferdata(response.data.offer);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchallemployeeoffer();
    }, []);
    

    // *************************************upcoming-offer***************************************************
    // get all upcoming offer function
    const [Upcomimgofferdata, setUpcomimgofferdata] = useState([]);
    const fetchupcomingalloffer = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/getupcoming-offer");
            //console.log(response.data.offer);
            setUpcomimgofferdata(response.data.offer);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchupcomingalloffer();
    }, []);

    // get all employee upcoming offer function
    const [employeeUpcomimgofferdata, setemployeeUpcomimgofferdata] = useState([]);
    const fetchemployeeallupcomingoffer = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/getupcoming-employee-offer");
            //console.log(response.data.offer);
            setemployeeUpcomimgofferdata(response.data.offer);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchemployeeallupcomingoffer();
    }, []);

    // *************************************company***************************************************
    // get all company
    const [companydata, setcompanydata] = useState([]);
    const fetchallcompany = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/getallcompany");
            //console.log(response.data.company);
            setcompanydata(response.data.company);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchallcompany();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                storetoken,
                logoutuser,
                isloggedin,
                logoutadmin,
                isloggedadmin,
                storeadmintoken,
                storeemployeetoken,
                isloggedemployee,
                logoutemployee,
                logoutmanager,
                isloggedmanager,
                customersdata,
                employeedata,
                offerdata,
                fetchalloffer,
                fetchalluser,
                managerdata,
                fetchallmanager,
                Upcomimgofferdata,
                fetchupcomingalloffer,
                fetchallemployee,
                singleemployee,
                user,
                fetchcustomerData,
                employeeofferdata,
                fetchallemployeeoffer,
                employeeUpcomimgofferdata,
                fetchemployeeallupcomingoffer,
                companydata,
                fetchallcompany,
                fetchuserData,
                manager,
                logoutlowermanager,
                storelowermanagertoken,
                lowermanager,
                fetchlowermanagerData,
                fetchallLowermanager,
                lowermanagerdata,
                fetchmanagerData,
                storemanagertoken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of AuthProvider");
    }
    return authContextValue;
};
