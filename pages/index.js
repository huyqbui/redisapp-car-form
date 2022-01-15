import CarForm from '../lib/CarForm';
import SearchForm from '../lib/SearchForm';

export default function Home() {
  return (
    <div>
      <h1>Create a Car</h1>
      <CarForm />
      <p></p>
      <h2>Search a Car</h2>
      Search here:
      <SearchForm />
    </div>
  );
}
