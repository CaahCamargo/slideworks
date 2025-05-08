export interface ApiItem {
  id: number;
  title: string;
  image_url: string;
  rating: string;
  year: string;
  crew: string;
}

export interface Pagination {
  limit: number;
  page: number;
  maxPage: number;
  total: number;
}

export interface ApiResponse {
  data: ApiItem[];
  pagination: Pagination;
}

export const fetchItems = async (page: number): Promise<ApiResponse> => {
  try {
    const response = await fetch(`https://movies.slideworks.cc/movies?page=${page}`);

    if (!response.ok) {
      throw new Error('Falha ao buscar itens da API');
    }

    const result: ApiResponse = await response.json();

    return result;
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    throw error; 
  }
};
