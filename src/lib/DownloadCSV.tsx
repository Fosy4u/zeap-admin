import { Button } from 'flowbite-react';

interface DownloadCSVProps {
  data: any[];
  fileName: string;
}

const DownloadCSV = ({ data, fileName }: DownloadCSVProps) => {
  // Function to convert the JSON(Array of objects) to CSV.
  interface Header {
    label: string;
    key: string;
  }

  const arrayToCsv = (headers: Header[], data: any[]): string => {
    const csvRows: string[] = [];
    // getting headers.
    const headerValues = headers.map((header) => header.label);
    csvRows.push(headerValues.join(','));
    // Getting rows.
    for (const row of data) {
      const rowValues = headers.map((header) => {
        const escaped = ('' + row[header.key]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(rowValues.join(','));
    }
    return csvRows.join('\n');
  };

  const downloadCSV = () => {
    const headers: Header[] = [];
    if (data.length > 0) {
      for (const key in data[0]) {
        headers.push({ label: key, key: key });
      }
    }
    const csvData = arrayToCsv(headers, data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Button color="info" size="sm" onClick={downloadCSV}>
      Export
    </Button>
  );
};

export default DownloadCSV;
