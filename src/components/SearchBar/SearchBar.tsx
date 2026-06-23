import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

// 1. Типізуємо пропси компонента за схемою Ім’яКомпонентаProps
interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  
  // 2. Функція-екшн для обробки форми (Form Action)
  const handleSearchAction = (formData: FormData) => {
    // Отримуємо значення з інпуту за його атрибутом name="query"
    const searchQuery = formData.get('query') as string;

    // Перевірка на порожній рядок (видаляємо пробіли)
    if (!searchQuery || searchQuery.trim() === '') {
      toast.error('Please enter your search query.');
      return;
    }

    // Передаємо чисте значення в компонент App
    onSubmit(searchQuery.trim());
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        
        {/* Використовуємо вбудований action замість onSubmit функцій */}
        <form action={handleSearchAction} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;