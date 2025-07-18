'use client'
import CourseContent from '@/app/components/Course/CourseContent';
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useRouter } from 'next/navigation'; // useRouter for client-side routing
import React, { useEffect } from 'react';

type Props = {
    params: any;
};

const Page = ({ params }: Props) => {
    const id = params.id;
    const { isLoading, error, data } = useLoadUserQuery(undefined, {});
    const router = useRouter(); // Use useRouter for navigation

    useEffect(() => {
        if (data) {
            const isPurchased = data.user.courses.find((item: any) => item._id === id);
            if (!isPurchased || error) {
                router.push("/"); // Use router.push instead of redirect
            }
        }
    }, [data, error, id, router]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <CourseContent id={id} user={data?.user} />
                </div>
            )}
        </>
    );
};

export default Page;

// 'use client'
// import CourseContent from '@/app/components/Course/CourseContent';
// import Loader from '@/app/components/Loader/Loader';
// import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
// import { redirect } from 'next/navigation';
// import React, { useEffect } from 'react';

// type Props = {
//     params:any;
// };

// const page = ({params}: Props) => {
//     const id = params.id;
//     const {isLoading,error,data} = useLoadUserQuery(undefined,{});

//     useEffect(()=> {
//         if(data){
//             const isPurchased = data.user.courses.find((item:any)=> item._id === id);
//             if(!isPurchased){
//                 redirect("/");
//             }
//             if(error){
//                 redirect("/");
//             }
//         }
//     },[data, error, id])


//   return (
//     <>
//     {
//         isLoading ? (
//             <Loader/>
//         ):(
//             <div>
//                 <CourseContent id={id}/>
//             </div>
//         )
//     }
//     </>
//   );
// };

// export default page;
