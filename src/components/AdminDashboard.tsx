import { useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

type CollectionName = 'wachtlijst' | 'ouders' | 'leerlingen' | 'lessen' | 'instructeurs' | 'facturen';

const COLLECTION_NAMES: CollectionName[] = ['wachtlijst', 'ouders', 'leerlingen', 'lessen', 'instructeurs', 'facturen'];

export default function AdminDashboard() {
  const [selectedCollection, setSelectedCollection] = useState<CollectionName>('wachtlijst');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});

  const fetchData = async (name: CollectionName) => {
    setLoading(true);
    setSelectedCollection(name);
    const snapshot = await getDocs(collection(db, name));
    const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    setData(docs);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    await deleteDoc(doc(db, selectedCollection, id));
    fetchData(selectedCollection);
  };

  const handleEdit = (doc: any) => {
    setEditingId(doc.id);
    setEditData({ ...doc });
    delete editData.id;
  };

  const handleSave = async () => {
    if (!editingId) return;
    await updateDoc(doc(db, selectedCollection, editingId), editData);
    setEditingId(null);
    fetchData(selectedCollection);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 space-y-2">
        <h2 className="text-xl font-black text-primary mb-4">Admin Panel</h2>
        {COLLECTION_NAMES.map(name => (
          <button
            key={name}
            onClick={() => fetchData(name)}
            className={`w-full text-left px-4 py-2 rounded-xl font-bold text-sm transition ${
              selectedCollection === name ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <h3 className="text-2xl font-black mb-4 capitalize">{selectedCollection}</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-200">
                  {data.length > 0 &&
                    Object.keys(data[0])
                      .filter(k => k !== 'id')
                      .map(key => (
                        <th key={key} className="px-4 py-2 font-bold capitalize">{key}</th>
                      ))}
                  <th className="px-4 py-2">Acties</th>
                </tr>
              </thead>
              <tbody>
                {data.map(doc => (
                  <tr key={doc.id} className="border-t hover:bg-gray-50">
                    {Object.entries(doc)
                      .filter(([k]) => k !== 'id')
                      .map(([key, value]) => (
                        <td key={key} className="px-4 py-2">
                          {editingId === doc.id ? (
                            <input
                              value={editData[key] ?? ''}
                              onChange={e => setEditData(prev => ({ ...prev, [key]: e.target.value }))}
                              className="w-full border px-2 py-1 rounded"
                            />
                          ) : (
                            String(value)
                          )}
                        </td>
                      ))}
                    <td className="px-4 py-2 space-x-2">
                      {editingId === doc.id ? (
                        <>
                          <button onClick={handleSave} className="text-green-600 font-bold">Save</button>
                          <button onClick={() => setEditingId(null)} className="text-gray-500">Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(doc)} className="text-blue-600 font-bold">Edit</button>
                          <button onClick={() => handleDelete(doc.id)} className="text-red-600 font-bold">Delete</button>
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