import FilteredLayers from '@/components/ui/FilteredLayers';
import SearchBar from '@/components/ui/SearchBar';
import React from 'react';
import FilteredByStatus from '../../components/ui/FilteredByStatus';
import LawyerCard from '@/components/ui/LawyerCard';
import EmptyState from '@/components/ui/EmptyState';


const LawyersPage = async({searchParams}) => {
    const params = await searchParams;
    const search = params?.search || ""
    const specialization = params?.specialization || ""
    const status = params?.status || ""

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lawyers?search=${search}&specialization=${specialization}&status=${status}`,{
        cache: "no-store"
    });
    const data = await res.json();
    console.log(data);
    return (
        <div className='py-10   w-11/12 mx-auto'>
            <div className='text-center space-y-2'>
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#2563EB]">
                    Find Trusted Lawyers
                </h2>
                <p className="text-gray-700">
                    Explore verified legal experts, check their specialization, and hire the right lawyer for your case with confidence.
                </p>
            </div>
            <div className=' flex flex-col md:flex-row gap-4 items-center mt-4'>
                <SearchBar></SearchBar>

               <div className='md:mt-8 flex items-center'>
                  <FilteredLayers/>
                  <FilteredByStatus/>
               </div>
             

            </div>
            {
                data.length===0 ? <EmptyState/>:
                <div className='mt-10  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {
                    data.map(lawyer => <LawyerCard key={lawyer._id} lawyer={lawyer}></LawyerCard>)
                }
            </div>
            }
        </div>
    );
};

export default LawyersPage;