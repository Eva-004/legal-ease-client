'use client'
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from 'react';

const FilteredByStatus = () => {
  const sortByStatus = [
  { key: "available", label: "Available" },
  { key: "busy", label: "Busy" }
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
        }
    }
    return (
        <div className="">
            <div className="dropdown dropdown-start">
                <div tabIndex={0} role="button" className="btn  font-bold m-1">Sort By Status</div>
                <ul tabIndex="-1" className="dropdown-content menu bg-base-100 dark:bg-gray-800  rounded-box z-40 w-52 p-2 shadow-sm">
                    <li  onClick={() => handleFilter('default')}
                       className={selectedCategory === 'default' ? 'active bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white' : ''} > <a>Default</a></li>
                    {
                        sortByStatus.map(status => <li key={status.key} onClick={() => handleFilter(status.key)} className={selectedCategory === status.key ? 'active bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white' : ''}>
                            <a >{status.label}</a>
                        </li>)
                    }
                </ul>
            </div>
        </div>
    );
};

export default FilteredByStatus;