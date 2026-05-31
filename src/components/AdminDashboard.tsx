import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

type CollectionName = 'wachtlijst' | 'ouders' | 'leerlingen' | 'lessen' | 'instructeurs' | 'facturen' | 'settings' | 'niveaus' | 'emailTemplates' | 'content' | 'gesprekken';

const COLLECTION_NAMES: CollectionName[] = [
  'wachtlijst', 'ouders', 'leerlingen', 'lessen', 'instructeurs', 
  'facturen', 'settings', 'niveaus', 'emailTemplates', 'content', 'gesprekken'
];

export default function AdminDashboard() {
  const [selectedCollection, setSelectedCollection] = useState<CollectionName>('wachtlijst');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});

  const fetchData = async (name: CollectionName) => {
    setLoading(true);
    setError('');
    setSelectedCollection(name);
    setEditingId(null);
    try {
      const snapshot = await getDocs(collection(db, name));
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setData(docs);
      if (docs.length === 0) {
        setError(`Collectie "${name}" is leeg.`);
      }
    } catch (err: any) {
      console.error(err);
      setError(`Fout bij ophalen: ${err.message}`);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Laad eerste collectie bij mount
  useEffect(() => {
    fetchData('wachtlijst');
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Weet je zeker dat je dit document wilt verwijderen?')) return;
    try {
      await deleteDoc(doc(db, selectedCollection, id));
      fetchData(selectedCollection);
    } catch (err: any) {
      alert(`Fout bij verwijderen: ${err.message}`);
    }
  };

  const handleEdit = (doc: any) => {
    setEditingId(doc.id);
    const { id, ...rest } = doc;
    setEditData(rest);
  };

  const handleSave = async () => {
    if (!editingId) return;
    try {
      await updateDoc(doc(db, selectedCollection, editingId), editData);
      setEditingId(null);
      fetchData(selectedCollection);
    } catch (err: any) {
      alert(`Fout bij opslaan: ${err.message}`);
    }
  };

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return '-';
    if (value instanceof Date || (typeof value === 'object' && value?.seconds)) {
      const d = value instanceof Date ? value : new Date(value.seconds * 1000);
      return d.toLocaleString();
    }
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  // Verzamel alle unieke keys uit de data
  const allKeys = data.length > 0 
    ? Array.from(new Set(data.flatMap(d => Object.keys(d)))).filter(k => k !== 'id')
    : [];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 space-y-2 overflow-y-auto">
        <h2 className="text-xl font-black text-primary mb-4">🐬 Admin Panel</h2>
        {COLLECTION_NAMES.map(name => (
          <button
            key={name}
            onClick={() => fetchData(name)}
            className={`w-full text-left px-4 py-2 rounded-xl font-bold text-sm transition ${
              selectedCollection === name ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📁 {name}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-x-auto">
        <h3 className="text-2xl font-black mb-2 capitalize">📋 {selectedCollection}</h3>
        <p className="text-sm text-gray-400 mb-4">{data.length} documenten</p>

        {loading && (
          <div className="flex items-center gap-3 text-gray-500">
            <div className="w-5 h-5 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            Laden...
          </div>
        )}

        {!loading && error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-xl">
            {error}
          </div>
        )}

        {!loading && !error && data.length === 0 && (
          <div className="bg-gray-100 text-gray-500 p-4 rounded-xl">
            Geen documenten gevonden.
          </div>
        )}

        {!loading && data.length > 0 && (
          <div className="overflow-x-auto bg-white rounded-2xl shadow">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-100">
                  {allKeys.map(key => (
                    <th key={key} className="px-4 py-3 font-bold capitalize text-xs">{key}</th>
                  ))}
                  <th className="px-4 py-3 font-bold text-xs w-32">Acties</th>
                </tr>
              </thead>
              <tbody>
                {data.map(doc => (
                  <tr key={doc.id} className="border-t hover:bg-gray-50">
                    {allKeys.map(key => (
                      <td key={key} className="px-4 py-2 max-w-xs truncate">
                        {editingId === doc.id ? (
                          <input
                            value={editData[key] ?? ''}
                            onChange={e => setEditData(prev => ({ ...prev, [key]: e.target.value }))}
                            className="w-full border px-2 py-1 rounded text-xs"
                          />
                        ) : (
                          <span title={formatValue(doc[key])}>{formatValue(doc[key])}</span>
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-2 space-x-2">
                      {editingId === doc.id ? (
                        <>
                          <button onClick={handleSave} className="text-green-600 font-bold text-xs hover:underline">💾 Save</button>
                          <button onClick={() => setEditingId(null)} className="text-gray-500 text-xs hover:underline">Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(doc)} className="text-blue-600 font-bold text-xs hover:underline">✏️ Edit</button>
                          <button onClick={() => handleDelete(doc.id)} className="text-red-600 font-bold text-xs hover:underline">🗑️ Del</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}