import { Package } from "lucide-react";
import { BsTrophyFill } from "react-icons/bs";
import { Footer } from "@/layouts/footer";
import Achivements from "./Achivements";
import { useAuth } from "../../contexts/auth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

const CustomerPage = () => {
    const { user } = useAuth();
    
    // get all offer function
        const [offerdata, setofferdata] = useState([]);
        const fetchalloffer = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/get-approveoffer");
                //console.log(response.data);
                setofferdata(response.data.offer);
            } catch (err) {
                console.error(err);
            }
        };
        useEffect(() => {
            fetchalloffer();
        }, []);
    
    // get all offer function
        const [upcomingofferdata, setupcomingofferdata] = useState([]);
        const fetchallupcomingoffer = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/get-approveupcomingoffer");
                //console.log(response.data);
                setupcomingofferdata(response.data.offer);
            } catch (err) {
                console.error(err);
            }
        };
        useEffect(() => {
            fetchallupcomingoffer();
        }, []);
    
    const getTrophyColor = (points) => {
        if (points <= 300) return "text-green-500";
        if (points <= 1000) return "text-blue-500";
        if (points <= 3000) return "text-zinc-500";
        return "text-yellow-500";
    };

    const [expandedOffers, setExpandedOffers] = useState({});
    const toggleDescription = (key) => {
        setExpandedOffers((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };
    const truncateText = (text, length = 30) => (text.length > length ? text.slice(0, length) + "..." : text);
    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">{user.company?.[0].name}</h1>
            {/* <h1 className="title">Company</h1> */}
            <div className="flex flex-col items-stretch gap-4 md:flex-row">
                {/* 40% Width Box */}
                <div className="w-full md:w-2/5">
                    <div className="card flex h-full flex-col">
                        <div className="card-header">
                            <div className="w-fit rounded-lg bg-red-500/20 p-2 text-red-500">
                                <Package size={26} />
                            </div>
                            <p className="card-title">Total Points</p>
                        </div>
                        <div className="flex-1 rounded-lg bg-slate-100 pb-2 pt-2 dark:bg-slate-950">
                            <div className="flex flex-row gap-x-4">
                                <BsTrophyFill className={`ml-3 text-8xl ${getTrophyColor(user.company?.[0].points)}`} />
                                <div>
                                    <div className="flex flex-row gap-x-2">
                                        <span className="text-xl font-bold text-red-500">{user.points}</span>
                                        <p className="text-xl font-bold text-slate-900 dark:text-slate-50">Total Points</p>
                                    </div>
                                    <p className="font-medium text-slate-900 dark:text-slate-50">Current Balance</p>
                                    <button className="rounded-lg bg-red-500 p-2 font-semibold text-white">Redeem Points</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 60% Width Box */}
                <div className="w-full md:w-3/5">
                    <div className="card flex h-full flex-col">
                        <div className="card-header">
                            <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500">
                                <Package size={26} />
                            </div>
                            <p className="card-title">Notification</p>
                        </div>
                        <div className="card-body flex-1 overflow-auto rounded-lg bg-slate-100 p-0 pb-2 pt-2 dark:bg-slate-950">
                            <p className="p-4 text-slate-900 dark:text-slate-50">
                            <p>1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elaborum.</p>
                                <p>2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elaborum.</p>
                                <p>3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elaborum.</p>
                                {/* {user.notification?.map((notification, index) => (
                                    <div key={index}>
                                        <span>{index + 1}.</span>
                                        <span className="mb-2 ml-2">
                                            {notification.notificationDescription}
                                        </span>
                                    </div>
                                ))} */}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Latest & Upcoming Offers */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                {/* Latest Offers */}
                <div className="card">
                    <div className="card-header">
                        <p className="card-title">Latest Offers</p>
                    </div>
                    <div className="card-body h-[300px] overflow-auto p-0">
                        {offerdata.map((sale, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-y-2 border-b border-slate-200 p-3 dark:border-slate-700"
                            >
                                <p className="font-medium text-slate-900 dark:text-slate-50">{sale.offerTitle}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {expandedOffers[`latest-${sale._id}`] ? sale.offerDescription : truncateText(sale.offerDescription, 50)}
                                    {sale.offerDescription.length > 50 && (
                                        <button
                                            onClick={() => toggleDescription(`latest-${sale._id}`)}
                                            className="ml-1 text-xs font-medium text-red-500 hover:underline"
                                        >
                                            {expandedOffers[`latest-${sale._id}`] ? " Show Less" : " Show More"}
                                        </button>
                                    )}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Offers */}
                <div className="card">
                    <div className="card-header">
                        <p className="card-title">Upcoming Offers</p>
                    </div>
                    <div className="card-body h-[300px] overflow-auto p-0">
                        {upcomingofferdata.map((sale, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-y-2 border-b border-slate-200 p-3 dark:border-slate-700"
                            >
                                <p className="font-medium text-slate-900 dark:text-slate-50">{sale.offerTitle}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {expandedOffers[`latest-${sale._id}`] ? sale.offerDescription : truncateText(sale.offerDescription, 50)}
                                    {sale.offerDescription.length > 50 && (
                                        <button
                                            onClick={() => toggleDescription(`latest-${sale._id}`)}
                                            className="ml-1 text-xs font-medium text-red-500 hover:underline"
                                        >
                                            {expandedOffers[`latest-${sale._id}`] ? " Show Less" : " Show More"}
                                        </button>
                                    )}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Achievements */}
            <div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                    <div className="card col-span-full">
                        <div className="card-header"></div>
                        <div className="card-body overflow-auto p-0">
                            <Achivements />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CustomerPage;
