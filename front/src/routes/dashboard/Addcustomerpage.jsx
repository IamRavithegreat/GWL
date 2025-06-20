import React, { useState } from "react";
import { Footer } from "@/layouts/footer";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth";
import API from "../../API/Api";

const AddcustomerPage = () => {

    const { fetchalluser, lowermanager } = useAuth();
    const [data, setdata] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        customerid: "",
        employeeid: "",
        companyId: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setdata((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
          await API.post(
                "/signup",
                {
                    ...data,
                    manager:
                        lowermanager && lowermanager.firstname && lowermanager.lastname
                            ? `${lowermanager.firstname} ${lowermanager.lastname}`
                            : "Created by Super Manager / Admin",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                },
            );
            setdata({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                customerid: "",
                employeeid: "",
                companyId: "",
            });
            await fetchalluser();
            toast.success("customer created successfully !");
        } catch (err) {
            const message = err.response?.data?.message || "Signup failed";
            toast.error(message);
            console.error("Signup error:", err);
        }
    };
    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Add Customer</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">
                <form>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* First and Last Name */}
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">First Name</label>
                            <input
                                name="firstname"
                                id="firstname"
                                value={data.firstname}
                                onChange={handleChange}
                                type="text"
                                placeholder="First Name"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Last Name</label>
                            <input
                                name="lastname"
                                id="lastname"
                                value={data.lastname}
                                onChange={handleChange}
                                type="text"
                                placeholder="Last Name"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        {/* Email and Password */}
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Email ID</label>
                            <input
                                name="email"
                                id="email"
                                value={data.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="Email ID"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Password</label>
                            <input
                                name="password"
                                id="password"
                                value={data.password}
                                onChange={handleChange}
                                type="text"
                                placeholder="Password"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        {/* Customer ID and Employee */}
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Customer ID</label>
                            <input
                                name="customerid"
                                id="customerid"
                                value={data.customerid}
                                onChange={handleChange}
                                type="text"
                                placeholder="Customer ID"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Employee ID</label>
                            <input
                                name="employeeid"
                                id="employeeid"
                                value={data.employeeid}
                                onChange={handleChange}
                                type="text"
                                placeholder="Employee ID"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Company ID</label>
                            <input
                                name="companyId"
                                id="companyId"
                                value={data.companyId}
                                onChange={handleChange}
                                type="text"
                                placeholder="Company ID"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={handlesubmit}
                            className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default AddcustomerPage;
