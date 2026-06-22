import LawyerDetailsCard from '@/components/ui/LawyerDetailsCard';
import React from 'react';

const LawyerDetailsPage = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lawyers/${id}`);
  const lawyer = await res.json();
  console.log(lawyer);
    return (
        <div>
            <LawyerDetailsCard lawyer={lawyer}/>
        </div>
    );
};

export default LawyerDetailsPage;