import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export function useSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoc(doc(db, 'settings', 'general'))
      .then(snap => snap.exists() ? setSettings(snap.data()) : console.log('No settings found'))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { settings, loading };
}

export function useInstructeurs() {
  const [instructeurs, setInstructeurs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, 'instructeurs'))
      .then(snap => setInstructeurs(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { instructeurs, loading };
}

export function useNiveaus() {
  const [niveaus, setNiveaus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, 'niveaus'))
      .then(snap => {
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        data.sort((a, b) => (a.volgorde || 0) - (b.volgorde || 0));
        setNiveaus(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { niveaus, loading };
}