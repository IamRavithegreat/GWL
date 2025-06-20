import { Footer } from "@/layouts/footer";
import { PencilLine, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
const Allupcomingoffer = () => {
    const { Upcomimgofferdata, fetchupcomingalloffer, employeeUpcomimgofferdata, fetchemployeeallupcomingoffer } = useAuth();
    const [expandedOffers, setExpandedOffers] = useState({});
    // customer upcoming offer soft delete
    const softdeleteoffer = async (id) => {
        try {
            const response = await axios.patch(
                `http://localhost:4000/api/upcomingdelete-offer/${id}`,
                null, // no request body
            );
            toast.success("Upcoming offer deleted Successfully!");
            await fetchupcomingalloffer();
        } catch (err) {
            const message = err.response?.data?.extradetails || err.response?.data?.message || "deletion failed";
            toast.error(message);
            console.error("delete error:", err);
        }
    };
    // approve offer
    const approveoffer = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:4000/api/approveupcomingoffer/${id}`
            );
            await fetchupcomingalloffer();
            toast.success(response.data.message); // use backend message directly
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Approve failed";
            toast.error(errorMessage);
            console.error(err);
        }
    };
    // decline offer
    const declineoffer = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:4000/api/rejectupcomingoffer/${id}`
            );
            await fetchupcomingalloffer();
            toast.success(response.data.message); // use backend message directly
        } catch (err) {
            const errorMessage = err.response?.data?.message || "reject failed";
            toast.error(errorMessage);
            console.error(err);
        }
    };
    // soft delete employee upcoming offer 
    const employeesoftdeleteoffer = async (id) => {
        try {
            const response = await axios.patch(
                `http://localhost:4000/api/upcomingdelete-employee-offer/${id}`,
                null, // no request body
            );
            toast.success("Employee Upcoming offer deleted Successfully!");
            await fetchemployeeallupcomingoffer();
        } catch (err) {
            const message = err.response?.data?.extradetails || err.response?.data?.message || "deletion failed";
            toast.error(message);
            console.error("delete error:", err);
        }
    };
    // approve offer
    const approveupcomingoffer = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:4000/api/approveemployeeupcomingoffer/${id}`
            );
            await fetchemployeeallupcomingoffer();
            toast.success(response.data.message); // use backend message directly
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Approve failed";
            toast.error(errorMessage);
            console.error(err);
        }
    };
    // decline offer
    const declineupcomingoffer = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:4000/api/rejectemployeeupcomingoffer/${id}`
            );
            await fetchemployeeallupcomingoffer();
            toast.success(response.data.message); // use backend message directly
        } catch (err) {
            const errorMessage = err.response?.data?.message || "reject failed";
            toast.error(errorMessage);
            console.error(err);
        }
    };

    const truncateText = (text, length = 20) => (text.length > length ? text.slice(0, length) + "..." : text);
    const toggleDescription = (key) => {
        setExpandedOffers((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Customer Upcoming Offers</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
                <div className="mb-4 flex items-start justify-between gap-4 lg:flex-row lg:items-center">
                    <p className="font-semibold dark:text-white sm:text-sm lg:text-lg">Showing {Upcomimgofferdata.length} Upcoming Offers </p>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-gray-200 text-sm">
                        <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">#</th>
                                <th className="px-4 py-2 text-left font-semibold">Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Offer ID</th>
                                <th className="px-4 py-2 text-left font-semibold">Start Date</th>
                                <th className="px-4 py-2 text-left font-semibold">End Date</th>
                                <th className="px-4 py-2 text-left font-semibold">Status</th>
                                <th className="px-4 py-2 text-left font-semibold">Manager_Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {Upcomimgofferdata.map((customer, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-x-4">
                                            <div className="flex flex-col gap-y-2">
                                                <p className="font-medium text-slate-900 dark:text-slate-50">{customer.offerTitle}</p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {expandedOffers[`latest-${customer._id}`] ? customer.offerDescription : truncateText(customer.offerDescription, 20)}
                                                    {customer.offerDescription.length > 20 && (
                                                        <button
                                                            onClick={() => toggleDescription(`latest-${customer._id}`)}
                                                            className="ml-1 text-xs font-medium text-red-500 hover:underline"
                                                        >
                                                            {expandedOffers[`latest-${customer._id}`] ? " Show Less" : " Show More"}
                                                        </button>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{customer.offerid}</td>
                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">
                                        {customer.startDate.slice(0, 10).split("-").reverse().join("-")}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">
                                        {customer.endDate.slice(0, 10).split("-").reverse().join("-")}
                                    </td>

                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{customer.status}</td>
                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{customer.manager}</td>

                                    <td className="flex gap-2 px-4 py-3">
                                        <button onClick={() => approveoffer(customer._id)}
                                            className="my-2 flex items-center gap-1 rounded bg-green-500 px-3 py-1 text-white">
                                            <PencilLine size={16} /> Approve
                                        </button>
                                        <button onClick={() => declineoffer(customer._id)}
                                            className="my-2 flex items-center gap-1 rounded bg-orange-500 px-4 py-1 text-white">
                                            <Trash size={16} /> Decline
                                        </button>
                                        <button onClick={() => softdeleteoffer(customer._id)}
                                            className="my-2 flex items-center gap-1 rounded bg-red-500 px-4 py-1 text-white">
                                            <Trash size={16} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* employee offer */}
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Employee Upcoming Offers</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
                <div className="mb-4 flex items-start justify-between gap-4 lg:flex-row lg:items-center">
                    <p className="font-semibold dark:text-white sm:text-sm lg:text-lg">Showing {employeeUpcomimgofferdata.length} Upcoming Offers </p>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-gray-200 text-sm">
                        <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">#</th>
                                <th className="px-4 py-2 text-left font-semibold">Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Offer ID</th>
                                <th className="px-4 py-2 text-left font-semibold">Start Date</th>
                                <th className="px-4 py-2 text-left font-semibold">End Date</th>
                                <th className="px-4 py-2 text-left font-semibold">Status</th>
                                <th className="px-4 py-2 text-left font-semibold">Manager_Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {employeeUpcomimgofferdata.map((customer, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-x-4">
                                            <div className="flex flex-col gap-y-2">
                                                <p className="font-medium text-slate-900 dark:text-slate-50">{customer.offerTitle}</p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {expandedOffers[`latest-${customer._id}`] ? customer.offerDescription : truncateText(customer.offerDescription, 20)}
                                                    {customer.offerDescription.length > 20 && (
                                                        <button
                                                            onClick={() => toggleDescription(`latest-${customer._id}`)}
                                                            className="ml-1 text-xs font-medium text-red-500 hover:underline"
                                                        >
                                                            {expandedOffers[`latest-${customer._id}`] ? " Show Less" : " Show More"}
                                                        </button>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{customer.offerid}</td>
                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">
                                        {customer.startDate.slice(0, 10).split("-").reverse().join("-")}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">
                                        {customer.endDate.slice(0, 10).split("-").reverse().join("-")}
                                    </td>

                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{customer.status}</td>
                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{customer.manager}</td>

                                    <td className="flex gap-2 px-4 py-3">
                                        <button onClick={() => approveupcomingoffer(customer._id)}
                                            className="my-2 flex items-center gap-1 rounded bg-green-500 px-4 py-1 text-white">
                                            <PencilLine size={16} /> Approve
                                        </button>
                                        <button onClick={() => declineupcomingoffer(customer._id)}
                                            className="my-2 flex items-center gap-1 rounded bg-orange-500 px-4 py-1 text-white">
                                            <Trash size={16} /> Decline
                                        </button>
                                        {/* <button className="my-2 flex items-center gap-1 rounded bg-blue-500 px-3 py-1 text-white">
                                                <PencilLine size={16} /> Manage
                                            </button> */}
                                        <button onClick={() => employeesoftdeleteoffer(customer._id)}
                                            className="my-2 flex items-center gap-1 rounded bg-red-500 px-4 py-1 text-white">
                                            <Trash size={16} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Allupcomingoffer;
