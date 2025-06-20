import React, { useEffect, useState } from "react";
import { Footer } from "@/layouts/footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
const UpdateCompany = () => {
    //const [usersession, setsession] = useState(sessionStorage.getItem("id"));
    const { fetchallcompany, lowermanager } = useAuth();
    const [data, setData] = useState({
        name: "",
        companyId: ""
    });

    const location = useLocation();
    const {LManagerCompId} = location.state;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleUpdateCompany = async (e) => {
        e.preventDefault();
        const updatedData = {
            name: data.name,
            companyId: data.companyId,
        };

        try {
            const response = await axios.put(`http://localhost:4000/api/updatecompany/${data.companyId}`, updatedData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            setData({
                name: "",
                companyId: ""
            })
            toast.success('Successfully updated!')
            await fetchallcompany();
            //console.log( response.data);
        } catch (err) {
            const message = "updation failed";
            toast.error(message);
            console.error("update error:", err);
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:4000/api/getCompany/${LManagerCompId}`)
            .then(res => {
                setData({
                    name: res.data.compData.name,
                    companyId: res.data.compData.companyId
                })
            }).catch(err => {
                console.log(err);
            })
    }, [])
    
    const [companyId, setcompanyId] = useState('');
    const [type, setType] = useState('add');
    const [value, setValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/api/companypoints',
                {
                    companyId,
                    type,
                    value: parseInt(value),
                    manager: `${lowermanager.firstname} ${lowermanager.lastname}`
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            toast.success('Request sent for admin approval');
        }
        catch (err) {
            toast.error(err.response.data.message);
            console.error(err);
        }
    };

    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Company</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">

                <form>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* First and Last Name */}
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                value={data.name}
                                onChange={handleChange}
                                name="name"
                                id="name"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Company ID</label>
                            <input
                                type="text"
                                placeholder="Company ID"
                                value={data.companyId}
                                onChange={handleChange}
                                name="companyId"
                                id="companyId"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <button className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700" onClick={handleUpdateCompany}>Submit</button>
                    </div>
                </form>
            </div>
            {/* give points */}
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">New Points</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Company_Id</label>
                            <input type="text"
                                placeholder="Company ID"
                                value={companyId}
                                onChange={(e) => setcompanyId(e.target.value)}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Points</label>
                            <input
                                type="number"
                                placeholder="Points"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                            />
                        </div>
                    </div>

                    <select value={type} onChange={(e) => setType(e.target.value)}
                        className="mt-4 p-1">
                        <option value="add">Add</option>
                        <option value="deduct">Deduct</option>
                    </select>

                    <div className="mt-6">
                        <button
                            type="submit"
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

export default UpdateCompany;
