import React, { useEffect } from 'react';
import { FaAngleDoubleLeft,FaAngleDoubleRight } from 'react-icons/fa';


const Pagination = ({page,setPage,totalPage,className}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);
    // console.log(page);
    const pages = [];
    for (let i = 2; i < totalPage; i++) {
        pages.push(i);
    };
    const startIndex = (p)=> {
        if (p<=3) {
            return 0;
        }
        else if (p>3 && p<(totalPage-2)) {
            return p-3
        }
        else if (p>=(totalPage-2)) {
            return (totalPage-5)
        }
    };

    const endIndex = (p)=> {
        if (p<=3) {
            return 3;
        }
        else if (p>3 && p<(totalPage-2)) {
            return p;
        }
        else if (p>=(totalPage-2)) {
            return totalPage
        }
    }



    return (
        <div className={`btn-group ${className}`}>
                <button onClick={()=>setPage(1)} className="btn bg-white hover:bg-white text-gray-950 btn-sm px-2">
                    <FaAngleDoubleLeft/>
                </button>

                <button
                onClick={()=>setPage(1)}
                className={`btn btn-sm ${1===page? 'bg-indigo-500':'btnPage'}`}>
                    1
                </button>
                
                {
                    page > 3 &&
                    <button className="btn btn-sm btn-disabled text-white">...</button>
                }
                
                {
                    pages.slice(startIndex(page),endIndex(page)).map((p,i)=> 
                    <button
                    key={i}
                    onClick={()=>setPage(p)} 
                    className={`btn btn-sm ${p===page? 'bg-indigo-500':'btnPage'}`}>
                        {p}
                    </button>)
                }
                
                {
                    page<(totalPage-2) && 
                    <button className="btn btn-sm btn-disabled text-white">...</button>
                }
                
                {
                    totalPage>1 &&
                    <button
                onClick={()=>setPage(totalPage)}
                className={`btn btn-sm ${totalPage===page? 'bg-indigo-500':'btnPage'}`}>
                    {totalPage}
                </button>}
                
                <button onClick={()=>setPage(totalPage)} className="btn bg-white hover:bg-white text-gray-950 btn-sm px-2">
                    <FaAngleDoubleRight/>
                </button>
            </div>
    );
};

export default Pagination;