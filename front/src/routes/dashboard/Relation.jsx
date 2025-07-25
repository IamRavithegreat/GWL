import { Footer } from "@/layouts/footer";
import { useAuth } from "../../contexts/auth";

const Relation = () => {
    const { employeedata,customersdata } = useAuth();
    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Relation</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
                <div className="mb-4 flex items-start justify-between gap-4 lg:flex-row lg:items-center">
                    <p className="font-semibold dark:text-white sm:text-sm lg:text-lg">Showing {employeedata.length} Employee</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-gray-200 text-sm">
                        <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">#</th>
                                <th className="px-4 py-2 text-left font-semibold">Employee Id</th>
                                <th className="px-4 py-2 text-left font-semibold">Employee Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Company Id</th>
                                <th className="px-4 py-2 text-left font-semibold">company Name</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {employeedata.map((data, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                    <td className="px-4 py-3">
                                        <span className="dark:text-white">{data.employeeid}</span>
                                    </td>
                                    <td className="px-4 py-3 dark:text-white">
                                        {data.firstname} {data.lastname}
                                    </td>
                                    <td className="px-4 py-3 dark:text-white">
                                        {data.customers.map((customer, index) => (
                                            <div key={index}>{customer.customerid}</div>
                                        ))}
                                    </td>
                                    <td className="px-4 py-3 dark:text-white">
                                        {data.customers.map((customer, index) => (
                                            <div key={index}>{customer.firstname}{" "}{customer.lastname}</div>
                                        ))}
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

export default Relation;
