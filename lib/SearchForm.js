import { useState } from 'react';
import Image from 'next/image';

export default function SearchForm() {
  // need state to represent results from search engine
  const [hits, setHits] = useState([]);

  // search function
  const search = async (event) => {
    console.log('search function event...');
    const q = event.target.value;

    // only execute code if query length is greater than 2
    if (q.length > 3) {
      // passing params to redis
      const params = new URLSearchParams({ q });
      console.log('ur params:', params);
      // need to implement debounce code

      const res = await fetch('/api/search?' + params);

      // result will be an array of cars that we set as state on component
      const result = await res.json();
      console.log('result from api/search:', result);
      setHits(result['cars']);
    }
  };

  return (
    <div>
      {/* input triggers a search function, whenever user types in input */}
      <input onChange={search} type='text' />
      <ul>
        {hits.map((hit) => (
          <li key={hit.entityId} className='search-container'>
            {hit.make} {hit.model} {hit.year}
            <p></p>
            <Image
              src={hit.image}
              alt={hit.make + hit.model}
              height={240}
              width={320}
            />
            <p></p>
            <div className='desc-box'>{hit.description}</div>
            <p></p>
          </li>
        ))}
      </ul>
    </div>
  );
}
