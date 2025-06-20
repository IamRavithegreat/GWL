import { Footer } from "@/layouts/footer";
import { PencilLine, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";
import axios from "axios";

const LowerManagerCompanyPage = () => {
    const { companydata, fetchallcompany } = useAuth()
    const softdeletecompany = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:4000/api/deletecompany/${id}`,
            );
            await fetchallcompany();
            toast.success('company deleted Successfully!');
        } catch (err) {
            const message = "deletion failed";
            toast.error(message);
            console.error("delete error:", err);
        }
    }
    return (
        <div className="flex flex-col gap-y-4 p-6 min-h-screen">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">All Company</h1>
                <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-4">
                    <div className="flex lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
                        <p className="lg:text-lg sm:text-sm font-semibold dark:text-white">Showing {companydata.length} Company</p>
                        <Link to={"/LowerManagerlayout/add-company"}>
                            <button className="bg-green-500 py-1 px-2 rounded-full hover:bg-green-600 text-white font-medium">Add Company</button>
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-gray-200 text-sm">
                            <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold">#</th>
                                    <th className="px-4 py-2 text-left font-semibold">Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Company_Id</th>
                                    <th className="px-4 py-2 text-left font-semibold">Customers Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Customers_Id</th>
                                    <th className="px-4 py-2 text-left font-semibold">Points</th>
                                    <th className="px-4 py-2 text-left font-semibold">Status</th>
                                    <th className="px-4 py-2 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {companydata.map((company, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                        <td className="px-4 py-3 dark:text-white">{company.name}</td>
                                        <td className="px-4 py-3 dark:text-white">{company.companyId}</td>

                                        <td className="px-4 py-3 dark:text-white">
                                            {company.customers.map((data, idx) => (
                                                <div key={idx} >{data.firstname}{" "}{data.lastname}
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-4 py-3 dark:text-white">
                                            {company.customers.map((data, idx) => (
                                                <div key={idx}>{data.customerid}</div>
                                            ))}
                                        </td>
                                        <td className="px-4 py-3 dark:text-white">{company.points}</td>
                                        <td className="px-4 py-3 dark:text-white">{company.status}</td>
                                        <td className="px-4 py-3 flex gap-2">
                                            <Link to={"/LowerManagerlayout/update-company"}
                                                state={{ LManagerCompId: company._id }}>
                                                <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded">
                                                    <PencilLine size={16} /> Manage
                                                </button>
                                            </Link>
                                            <button onClick={() => softdeletecompany(company._id)} className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded">
                                                <Trash size={16} /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LowerManagerCompanyPage;




