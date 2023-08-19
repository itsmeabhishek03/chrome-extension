import React, { useState } from 'react';
import axios from 'axios';
const ipInfoAccessToken = process.env.REACT_APP_IPINFO_ACCESS_TOKEN;
import config from '~config';

const IpComponent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const fetchIpAddress = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://api64.ipify.org?format=json');
      setIpAddress(response.data.ip);
      fetchLocationInfo(response.data.ip);
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
    setLoading(false);
  };

  const fetchLocationInfo = async (ip: string) => {
    try {
      const response = await axios.get(`https://ipinfo.io/${ip}/json?token=${config.ipInfoAccessToken}`);
      console.log("url :" ,response.data);
      setCountry(response.data.country);
      setCity(response.data.city);
    } catch (error) {
      console.error('Error fetching location info:', error);
    }
  };

  return (
    <div className='plasmo-text-center plasmo-p-14 plasmo-border-r-10 plasmo-bg-white'>
      <button
        className={`plasmo-bg-blue-500 plasmo-text-xl plasmo-text-white plasmo-px-4 plasmo-py-2 plasmo-rounded ${loading? 'plasmo-opacity-50 plasmo-cursor-not-allowed':''}`}
        onClick={fetchIpAddress}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Show My Location'}
      </button>
      <p className='plasmo-mt-4 plasmo-text-xl plasmo-text-gray-700'>
      {country && <p>Your country is {country} and city is {city}</p>}
      </p>
    </div>
  );
};

export default IpComponent;
