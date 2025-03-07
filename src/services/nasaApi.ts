export interface ApodData {
    title: string;
    date: string;
    explanation: string;
    url: string;
    media_type: string;       // "image" or "video"
    hdurl?: string;           // high-res image URL (if available)
    thumbnail_url?: string;   // thumbnail for videos (if media_type is "video")
    copyright?: string;
  }

  // NASA APOD API endpoint base URL
const APOD_URL = 'https://api.nasa.gov/planetary/apod';

export const fetchApod = async (date?: string): Promise<ApodData> => {
    const apiKey = import.meta.env.VITE_APP_KEY;
    let endpoint = `${APOD_URL}?api_key=${apiKey}`;
    if (date) {
      endpoint += `&date=${date}`;  // Request APOD for a specific date
    }
    const res = await fetch(endpoint);
    if (!res.ok) {
      // If the response is not OK, throw an error to be caught by caller
      throw new Error(`API request failed with status ${res.status}`);
    }
    const data: ApodData = await res.json();  // parse JSON and typecast to ApodData
    return data;
  };