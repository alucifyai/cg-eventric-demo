import * as XLSX from 'xlsx';
import mammoth from 'mammoth';

/**
 * Read and parse an Excel file (.xlsx or .xls)
 * @param file - File object from input[type="file"]
 * @returns Promise with parsed data as array of objects
 */
export async function readExcelFile(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        // Get first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
}

/**
 * Get all sheets from an Excel file
 * @param file - File object from input[type="file"]
 * @returns Promise with object containing all sheets as arrays
 */
export async function readExcelFileAllSheets(file: File): Promise<Record<string, any[]>> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        const result: Record<string, any[]> = {};

        // Convert all sheets to JSON
        workbook.SheetNames.forEach((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          result[sheetName] = XLSX.utils.sheet_to_json(worksheet);
        });

        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
}

/**
 * Read a Word document (.docx) and convert to HTML
 * @param file - File object from input[type="file"]
 * @returns Promise with HTML string
 */
export async function readWordFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const result = await mammoth.convertToHtml({ arrayBuffer });
        resolve(result.value); // The generated HTML
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Read a Word document (.docx) and extract plain text
 * @param file - File object from input[type="file"]
 * @returns Promise with plain text string
 */
export async function readWordFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const result = await mammoth.extractRawText({ arrayBuffer });
        resolve(result.value); // The raw text
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Example React component usage:
 *
 * ```tsx
 * import { readExcelFile, readWordFile } from './utils/fileReaders';
 *
 * function FileUploader() {
 *   const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
 *     const file = e.target.files?.[0];
 *     if (!file) return;
 *
 *     try {
 *       const data = await readExcelFile(file);
 *       console.log('Excel data:', data);
 *     } catch (error) {
 *       console.error('Error reading Excel:', error);
 *     }
 *   };
 *
 *   const handleWordUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
 *     const file = e.target.files?.[0];
 *     if (!file) return;
 *
 *     try {
 *       const html = await readWordFile(file);
 *       console.log('Word HTML:', html);
 *     } catch (error) {
 *       console.error('Error reading Word:', error);
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       <input type="file" accept=".xlsx,.xls" onChange={handleExcelUpload} />
 *       <input type="file" accept=".docx" onChange={handleWordUpload} />
 *     </div>
 *   );
 * }
 * ```
 */
