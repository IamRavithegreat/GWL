import { Footer } from "@/layouts/footer";
import { PencilLine, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";
import axios from "axios";

const ManagerCustomer = () => {
    const {customersdata,fetchalluser}=useAuth()
    const softdeleteCustomer = async (id) => {  
    try {
        const response = await axios.patch(
            `http://localhost:4000/api/deleteuser/${id}`,
            null,  
        );
        await fetchalluser(); 
        toast.success('Customer deleted Successfully!');
    } catch (err) {
        const message = err.response?.data?.message || "deletion failed";
        toast.error(message);
        console.error(err);
    }
    }
 
    // approve customer
 const approveCustomer = async (id) => {  
  try {
    const response = await axios.put(
      `http://localhost:4000/api/approvecustomer/${id}`
    );
    await fetchalluser(); 
    toast.success(response.data.message); // use backend message directly
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Approve failed";
    toast.error(errorMessage);
    console.error(err);
  }
};
const declineCustomer = async (id) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/api/rejectcustomer/${id}`
    );
    await fetchalluser(); // or your function to refresh customer list
    toast.success(response.data.message); // Show success message from backend
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Delete failed";
    toast.error(errorMessage);
    console.error(err);
  }
};

    return (
        <div className="flex flex-col gap-y-4 p-6 min-h-screen">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Edit Customer</h1>
                <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-4">
                    <div className="flex lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
                        <p className="lg:text-lg sm:text-sm font-semibold dark:text-white">Showing {customersdata.length} Customer</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-gray-200 text-sm">
                            <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold">#</th>
                                    <th className="px-4 py-2 text-left font-semibold">Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Email</th>
                                    <th className="px-4 py-2 text-left font-semibold">Customer_ID</th>
                                    <th className="px-4 py-2 text-left font-semibold">Manager_Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Status</th>
                                    <th className="px-4 py-2 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {customersdata.map((customer, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-3 dark:text-white">{index+1}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <span className="dark:text-white">{customer.firstname}{" "}{customer.lastname}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 dark:text-white">{customer.email}</td>
                                        <td className="px-4 py-3 dark:text-white">{customer.customerid}</td>
                                        <td className="px-4 py-3 dark:text-white">{customer.manager}</td>
                                        <td className="px-4 py-3 dark:text-white">{customer.status}</td>
                                        <td className="px-4 py-3 flex gap-2">
                                            <button onClick={()=>approveCustomer(customer._id)} className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded my-2">
                                                <Trash size={16} /> Approve
                                            </button>
                                            <button onClick={()=>declineCustomer(customer._id)} className="flex items-center gap-1 px-4 py-1 bg-orange-500 text-white rounded my-2">
                                                <Trash size={16} /> Decline
                                            </button>
                                            {/* <Link to={"/Managerlayout/manage-customer"}>
                                                <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded my-2">
                                                    <PencilLine size={16} /> Manage
                                                </button>
                                            </Link> */}
                                            <button onClick={()=>softdeleteCustomer(customer._id)} className="flex items-center gap-1 px-4 py-1 bg-red-500 text-white rounded my-2">
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

export default ManagerCustomer;



