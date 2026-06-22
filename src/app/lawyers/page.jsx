import FilteredLayers from '@/components/ui/FilteredLayers';
import SearchBar from '@/components/ui/SearchBar';
import React from 'react';

const LawyersPage = () => {
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

               <FilteredLayers/>

            </div>
            <div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-6'>
                {
                    // data.map(idea => <IdeaCard key={idea._id} idea={idea}></IdeaCard>)
                }
            </div>
        </div>
    );
};

export default LawyersPage;