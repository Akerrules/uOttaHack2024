// NearbyPlaceCard.jsx
const NearbyPlaceCard = ({ place }) => {
    return (
      <div className="flex items-center bg-white p-4 mb-4 rounded-lg">
        {/* Image */}
        <img 
          src={place.imageUrl} 
          alt={place.name} 
          className="w-20 h-20 object-cover mr-4 rounded-full" 
        />
        {/* Details */}
        <div>
          <h3 className="text-lg font-bold">{place.name}</h3>
          <p className="text-gray-600">{place.address}</p>
        </div>
      </div>
    );
  };
  
  // NearbyPlacesList.jsx
  const NearbyPlacesList = ({ places }) => {
    return (
      <div className="flex flex-col max-h-[35rem] min-w-96 overflow-y-auto">
        {places.map((place) => (
          <NearbyPlaceCard key={place.id} place={place} />
        ))}
      </div>
    );
  };
  
  export default NearbyPlacesList;
  