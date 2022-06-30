export interface SearchType {
  title: string;
  year: string;
  type: string;
}

export interface AlertType {
  type: string;
  message: string;
  open: boolean;
}

export interface MovieListProps {
  results: { Title: string; Poster: string; imdbID: string; Year: string }[];
  alert: AlertType;
}

export interface SelectType {
  id: string;
  showInfo: boolean;
}

export interface SearchProps {
  search: SearchType;
  setSearch: React.Dispatch<React.SetStateAction<SearchType>>;
}
