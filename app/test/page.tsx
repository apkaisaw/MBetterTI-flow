'use client';

import { useState } from 'react';

export default function TestPage() {
  const [inputData, setInputData] = useState('');
  const [apiPath, setApiPath] = useState('/api/test');
  const [method, setMethod] = useState('GET');
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        ...(method !== 'GET' && { body: inputData }),
      };

      const res = await fetch(apiPath, options);
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">API Test Page</h1>
      
      <div className="space-y-4 mb-4">
        <div>
          <label className="block mb-2">API Path:</label>
          <input
            type="text"
            value={apiPath}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setApiPath(e.target.value)}
            placeholder="/api/your-endpoint"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Method:</label>
          <select
            value={method}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setMethod(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Request Body (JSON):</label>
          <textarea
            value={inputData}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputData(e.target.value)}
            placeholder="Enter JSON data"
            rows={4}
            className="w-full p-2 border rounded"
          />
        </div>

        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          {loading ? 'Sending...' : 'Send Request'}
        </button>
      </div>

      {error && (
        <div className="p-4 mb-4 border border-red-500 rounded">
          <h2 className="text-lg font-bold text-red-500 mb-2">Error</h2>
          <pre className="bg-red-50 p-4 rounded">{error}</pre>
        </div>
      )}

      {response && (
        <div className="p-4 border rounded">
          <h2 className="text-lg font-bold mb-2">Response</h2>
          <pre className="bg-gray-50 p-4 rounded overflow-auto">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 