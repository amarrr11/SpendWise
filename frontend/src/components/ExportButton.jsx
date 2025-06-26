export default function ExportButton() {
  const handleExport = () => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    window.open(`${apiUrl}/export`, '_blank');
  };

  return (
    <button onClick={handleExport} className="btn btn-success">
      📥 Export to Excel
    </button>
  );
}