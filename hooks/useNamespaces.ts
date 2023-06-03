import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useNamespaces() {
  const [namespaces, setNamespaces] = useState<string[]>([]);
  const [selectedNamespace, setSelectedNamespace] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    const fetchNamespaces = async () => {
      try {
        const response = await fetch(`/api/getNamespaces`);
        const data = await response.json();

        console.log(data);
        if (response.ok) {
          setNamespaces(data);
        } else {
          console.error(data.error);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchNamespaces();
  }, []);

  useEffect(() => {
    const namespaceFromUrl = router.query.namespace;
    if (typeof namespaceFromUrl === 'string') {
      setSelectedNamespace(namespaceFromUrl);
    }
  }, [router.query.namespace]);

  return { namespaces, selectedNamespace, setSelectedNamespace };
}
