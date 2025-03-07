import { useState, useEffect } from 'react';
import { fetchApod, ApodData } from '../services/nasaApi';
import ApodCard from '../components/ApodCard';

const HomePage: React.FC  = () => {
  const [apod, setApod] = useState<ApodData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');  // YYYY-MM-DD format

  // Fetch today's APOD on initial render
  useEffect(() => {
    const loadTodayApod = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchApod();      // no date => fetch today
        console.log('APOD Data:', data);  // <-- Add this
        setApod(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch APOD');
      } finally {
        setLoading(false);
      }
    };
    loadTodayApod();
  }, []);

    // Handler for fetching APOD of a specific date
    const handleFetchByDate = async () => {
      if (!selectedDate) return;
      try {
        setLoading(true);
        setError(null);
        const data = await fetchApod(selectedDate);
        setApod(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch APOD');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="p-4">
        {/* Search by date */}
        <div className="mb-4">
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)} 
            className="input input-bordered mr-2"
          />
          <button onClick={handleFetchByDate} className="btn btn-primary">
            Load APOD
          </button>
        </div>
  
        {/* Display states: loading, error, or content */}
        {loading && <p>Loading...</p>}
        {error && <p className="text-error">Error: {error}</p>}
        {apod && !error && !loading && (
          <ApodCard apod={apod} />
        )}
      </div>
    );
}

export default HomePage
