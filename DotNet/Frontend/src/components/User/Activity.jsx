import React, { useEffect, useState, useContext } from "react";
import "../../../Styles/activity.css";
import api from "../../Services/api";


function Activity() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const { token } = useContext(AuthContext); // 🔹 Get token from context

    useEffect(() => {
        if (!token) return; // Ensure token is available

        // Fetch received requests using the token
        api.get("/friend-requests/received", {
            headers: { Authorization: `Bearer ${token}` } // Attach token
        })
            .then(response => {
                setRequests(response.data);
                setLoading(false); // Set loading to false once the data is fetched
            })
            .catch(error => {
                console.error("Error fetching requests:", error);
                setLoading(false); // Stop loading on error
            });
    }, [token]);

    const updateRequestStatus = (requestId, status) => {
        if (!token) return; // Ensure token is available

        // Update request status (Accept/Reject) using the token
        api.patch(`/friend-requests/update-status/${requestId}`, { status }, {
            headers: { Authorization: `Bearer ${token}` } // Attach token
        })
            .then(response => {
                alert(response.data);
                setRequests(requests.filter(req => req.id !== requestId)); // Remove the updated request from the list
            })
            .catch(error => console.error("Error updating status:", error));
    };

    if (loading) return <p>Loading...</p>; // Show loading message if data is being fetched

    return (
        <div className="activity-container">
            <h2 className="activity-title">Received Requests</h2>
            <div className="request-grid">
                {requests.length > 0 ? (
                    requests.map(request => (
                        <div className="request-card" key={request.id}>
                            <h3>{request.sender.name}</h3>
                            <p>Wants to connect with you</p>
                            <div className="action-buttons">
                                <button className="accept-btn" onClick={() => updateRequestStatus(request.id, "ACCEPTED")}>
                                    Accept
                                </button>
                                <button className="delete-btn" onClick={() => updateRequestStatus(request.id, "DELETED")}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No pending requests</p>
                )}
            </div>
        </div>
    );
}

export default Activity;
