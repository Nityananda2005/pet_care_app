import React, { useState, useEffect } from 'react';
import { ShieldAlert, MapPin, AlertCircle, Clock, CheckCircle, Navigation } from 'lucide-react';
import { fetchRescueOperations, updateRescueStatus } from '../../api';

const RescueOperations = () => {
    const [rescues, setRescues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadRescues = async () => {
        try {
            const { data } = await fetchRescueOperations();
            setRescues(data.rescues);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to load rescue operations');
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRescues();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateRescueStatus(id, newStatus);
            loadRescues(); // Refresh the list
        } catch (err) {
            console.error('Failed to update status', err);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-red-100 text-red-700 border-red-200';
            case 'Responding': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Resolved': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    if (loading) return <div className="p-8 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00A99D]"></div></div>;
    if (error) return <div className="p-8 text-red-500 text-center font-medium">{error}</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg text-red-600">
                            <ShieldAlert size={24} />
                        </div>
                        Rescue Operations
                    </h1>
                    <p className="text-gray-500 mt-1">Manage and respond to emergency animal rescue reports</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
                {rescues.length === 0 ? (
                    <div className="col-span-full bg-white p-12 rounded-2xl text-center shadow-sm border border-gray-100">
                        <ShieldAlert size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 font-medium text-lg">No active rescue alerts at the moment.</p>
                        <p className="text-gray-400">All clear!</p>
                    </div>
                ) : (
                    rescues.map((rescue) => (
                        <div key={rescue._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-all">
                            {rescue.image && (
                                <div className="h-48 rounded-xl overflow-hidden mb-5 bg-gray-100 border border-gray-100">
                                    <img src={rescue.image} alt="Rescue subject" className="w-full h-full object-cover" />
                                </div>
                            )}

                            <div className="flex justify-between items-center mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(rescue.status)}`}>
                                    {rescue.status}
                                </span>
                                <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
                                    <Clock size={14} />
                                    {new Date(rescue.createdAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 truncate flex items-center gap-2">
                                <AlertCircle className="text-red-500" size={20} />
                                {rescue.condition}
                            </h3>

                            <div className="flex items-start gap-3 text-gray-700 mb-3 text-sm font-medium">
                                <MapPin size={18} className="mt-0.5 text-gray-400 flex-shrink-0" />
                                <p className="line-clamp-2 leading-relaxed">{rescue.location}</p>
                            </div>

                            {rescue.description && (
                                <div className="flex items-start gap-3 text-gray-600 mb-5 text-sm bg-gray-50 p-4 rounded-xl flex-1 border border-gray-100">
                                    <p className="leading-relaxed whitespace-pre-wrap">{rescue.description}</p>
                                </div>
                            )}

                            <div className="mt-auto pt-5 border-t border-gray-100 flex gap-3">
                                {rescue.status === 'Pending' && (
                                    <button
                                        onClick={() => handleStatusChange(rescue._id, 'Responding')}
                                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl text-sm font-bold transition-colors flex justify-center items-center gap-2 shadow-sm shadow-amber-500/20"
                                    >
                                        <Navigation size={18} /> Deploy Team
                                    </button>
                                )}
                                {rescue.status === 'Responding' && (
                                    <button
                                        onClick={() => handleStatusChange(rescue._id, 'Resolved')}
                                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-sm font-bold transition-colors flex justify-center items-center gap-2 shadow-sm shadow-green-500/20"
                                    >
                                        <CheckCircle size={18} /> Mark as Resolved
                                    </button>
                                )}
                                {rescue.status === 'Resolved' && (
                                    <div className="flex-1 bg-gray-100 text-gray-500 py-3 rounded-xl text-sm font-bold flex justify-center items-center gap-2">
                                        <CheckCircle size={18} /> Case Closed
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RescueOperations;
