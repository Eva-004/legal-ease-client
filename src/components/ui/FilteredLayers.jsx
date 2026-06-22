'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
const FilteredLayers = () => {
   const lawyerSpecializationCategories = [
  { key: "corporate-law", label: "Corporate Law" },
  { key: "family-law", label: "Family Law" },
  { key: "criminal-law", label: "Criminal Law" },
  { key: "property-law", label: "Property Law" },
  { key: "cyber-law", label: "Cyber Law" },
  { key: "civil-law", label: "Civil Law" },
  { key: "tax-law", label: "Tax Law" },
  { key: "immigration-law", label: "Immigration Law" }
];
    const router = useRouter();
    const searchParams = useSearchParams()
    const [selectedCategory, setSelectedCategory] = useState(
        searchParams.get('specialization') || ''
    );

    const handleFilter = (key) => {
        const value=String(key)
        setSelectedCategory(value);
        if (key === 'all') {
            router.push('/lawyers')
        } else {
            router.push(`/lawyers?specialization=${value}`);
        }
    }


    return (
        <div className="">
            <div className="dropdown dropdown-start">
                <div tabIndex={0} role="button" className="btn bg-[#9badd9]  font-bold m-1">Specialization</div>
                <ul tabIndex="-1" className="dropdown-content menu bg-base-100 dark:bg-gray-800  rounded-box z-40 w-52 p-2 shadow-sm">
                    <li  onClick={() => handleFilter('all')}
                       className={selectedCategory === 'all' ? 'active bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white' : ''} > <a>All</a></li>
                    {
                        lawyerSpecializationCategories.map(category => <li key={category.key} onClick={() => handleFilter(category.key)} className={selectedCategory === category.key ? 'active bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white' : ''}>
                            <a >{category.label}</a>
                        </li>)
                    }
                </ul>
            </div>
        </div>
    );
};

export default FilteredLayers;