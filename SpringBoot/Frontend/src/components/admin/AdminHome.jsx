import React from 'react';
// import Navbar from './AdminNavbar';
import AdminNavbar from './AdminNavbar';


function AdminHome({Toggle}){
    return (
        <div className='px-3'>
            <AdminNavbar Toggle={Toggle}/>
            <div className='container-fluid'>
                <div className='row g-3 my-2'>
                    <div className='col-md-4 p-1'>
                        <div className='p-5 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                            <h3 className='fs-2'>Users</h3>  
                        </div>
                    </div>
                    <div className='col-md-4 p-1'>
                        <div className='p-5 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                            <h3 className='fs-2'>Enquiries</h3>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminHome;