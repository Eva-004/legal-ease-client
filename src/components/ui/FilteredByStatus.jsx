'use client'
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from 'react';

const FilteredByStatus = () => {
  const sortByStatus = [
  { key: "Available", label: "Available" },
  { key: "Busy", label: "Busy" }
];
  const router = useRouter();
     const searchParams = useSearchParams()
     const [selectedCategory, setSelectedCategory] = useState(
         searchParams.get('status') || ''
     );
      const handleFilter = (key) => {
        const value=String(key)
        setSelectedCategory(value);
        if (key === 'default') {
            router.push('/lawyers')
        } else {
            router.push(`/lawyers?status=${value}`);
            router.refresh();
            console.log("STATUS CLICKED:", value);
        }
    }
    return (
        <div className="">
            <div className="dropdown dropdown-start">
                <div tabIndex={0} role="button" className="btn  font-bold m-1">Sort By Status</div>
                <ul tabIndex="-1" className="dropdown-content menu bg-base-100 dark:bg-gray-800  rounded-box z-40 w-52 p-2 shadow-sm">
                   <li>
                     <button  onClick={() => handleFilter('default')}
                       className={selectedCategory === 'default' ? 'active bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white' : ''} > Default</button>
                   </li>
                    {
                        sortByStatus.map(status => <li  key={status.key}>
                            <button onClick={() => handleFilter(status.key)} className={selectedCategory === status.key ? 'active bg-gradient-to-r from-[#1a2137] to-[#2563EB] text-white' : ''}>
                            {status.label}
                        </button>
                        </li>)
                    }
                </ul>
            </div>
        </div>
    );
};

export default FilteredByStatus;