import { FaMapMarkerAlt } from 'react-icons/fa';

function StoreLocation({ className = '' }) {
    return (
        <section className={`flex items-center text-gray-500 text-sm ${className}`}>
            <FaMapMarkerAlt className="mr-1" />
            매장 위치
        </section>
    );
}

export default StoreLocation;
