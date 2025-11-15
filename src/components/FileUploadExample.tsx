import { useState } from 'react';
import { readExcelFile, readWordFile, readExcelFileAllSheets, readWordFileAsText } from '../utils/fileReaders';

export function FileUploadExample() {
  const [excelData, setExcelData] = useState<any[]>([]);
  const [wordContent, setWordContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      const data = await readExcelFile(file);
      setExcelData(data);
      console.log('Excel data:', data);
    } catch (err) {
      setError('Error reading Excel file');
      console.error('Error reading Excel:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleWordUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      const html = await readWordFile(file);
      setWordContent(html);
      console.log('Word HTML:', html);
    } catch (err) {
      setError('Error reading Word file');
      console.error('Error reading Word:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">File Upload Example</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Excel Upload */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Upload Excel File</h2>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleExcelUpload}
          disabled={loading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {excelData.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Data Preview:</h3>
            <div className="overflow-auto max-h-96 border rounded">
              <pre className="p-4 text-sm">
                {JSON.stringify(excelData, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Word Upload */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Upload Word Document</h2>
        <input
          type="file"
          accept=".docx"
          onChange={handleWordUpload}
          disabled={loading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-green-50 file:text-green-700
            hover:file:bg-green-100"
        />
        {wordContent && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Document Content:</h3>
            <div
              className="border rounded p-4 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: wordContent }}
            />
          </div>
        )}
      </div>

      {loading && (
        <div className="text-center text-gray-600">
          Processing file...
        </div>
      )}
    </div>
  );
}
