import { useEffect, useState } from 'react';
import { Employee, Relationship } from '../interfaces/interfaces';
import { API_URL } from '../urls';
import generateRandomRgbValueArray from '../util/random-rgb';

const useFetchData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Employee[]>([]);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);

      try {
        const res = await fetch(API_URL);
        const json = await res.json();

        // @TODO: possibly pass remapping function as a callback
        setData(
          json.data.map((item: Employee) => {
            const relationship = json.included.find((i: Relationship) => {
              return i.id === item.relationships.account.data.id;
            });
            const email = relationship?.attributes.email;

            return {
              ...item,
              email,
              rgbColorArray: generateRandomRgbValueArray(),
            };
          })
        );
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return { loading, data, error };
};

export default useFetchData;
