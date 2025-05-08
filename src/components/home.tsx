'use client';

import React, { useEffect, useState } from 'react';
import { fetchItems, ApiItem, Pagination } from '@/services/api';

const MovieList: React.FC = () => {
  const [items, setItems] = useState<ApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, maxPage: 1, total: 0 });

  const [currentSlide, setCurrentSlide] = useState(0);

  const getItems = async (page: number) => {
    try {
      const result = await fetchItems(page);
      setItems(result.data);
      setPagination(result.pagination);
    } catch (error) {
      setError('Falha ao carregar os filmes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems(pagination.page);
  }, [pagination.page]);

  const visibleItems = items.slice(0, 4);

  useEffect(() => {
    if (visibleItems.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % visibleItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [visibleItems]);

  const changeSlide = (direction: number) => {
    setCurrentSlide((prev) => {
      const newIndex = (prev + direction + visibleItems.length) % visibleItems.length;
      return newIndex;
    });
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="slider">
        {visibleItems.map((item, index) => (
          <div
            key={item.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url('${item.image_url}')` }}
          >
            <div className="titulo-slider">
              <p>Destaque do mês</p>
              <h2>{item.title}</h2>
              <div className="titulo-slider-flex">
                <span className="tag-cards-movies rating-slider">
                  <i className="fa-solid fa-star"></i>
                  {item.rating}/10
                </span>
                {item.crew}
              </div>
            </div>
          </div>
        ))}

        <div className="nav left" onClick={() => changeSlide(-1)}>
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div className="nav right" onClick={() => changeSlide(1)}>
          <i className="fa-solid fa-chevron-right"></i>
        </div>

        <div className="pagination">
          {visibleItems.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      <div className="movie-list">
        <div className="movies">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="cards-movies">
                <img src={item.image_url} alt={item.title} width={180} height={220} />
                <div className="description-cards-movies">
                  <label className="title-cards-movies">{item.title}</label>
                  <p className="description-auth">Ano de Lançamento: {item.year}</p>
                  <p>{item.crew}</p>
                  <span className="tag-cards-movies">
                    <i className="fa-solid fa-star"></i>
                    {item.rating}/10
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div>Nenhum filme encontrado.</div>
          )}
        </div>

        <div className="pagination-movies">
          <button onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))} disabled={pagination.page <= 1}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <span>{pagination.page} de {pagination.maxPage}</span>
          <button onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))} disabled={pagination.page >= pagination.maxPage}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default MovieList;
