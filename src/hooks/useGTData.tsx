import { useState, useEffect } from 'react';

const useGTData = () => {
  const [cars, setCars] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGTData = async () => {
      try {
        const carsResponse = await fetch('/cars.json');
        const tracksResponse = await fetch('/tracks.json');

        const carsData = await carsResponse.json();
        const tracksData = await tracksResponse.json();

        setCars(
          carsData.cars.map((car: any) => {
            car.label = car.car;
            return car;
          })
        );

        setTracks(
          tracksData.tracks.map((track: any) => {
            track.label = track.course;
            return track;
          })
        );
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GT data:', error);
        setLoading(false);
      }
    };

    fetchGTData();
  }, []);

  return { cars, tracks, loading };
};

export default useGTData;
