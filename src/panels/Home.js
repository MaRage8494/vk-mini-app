import {
  AdaptivityProvider,
  Button,
  CardGrid,
  ContentCard,
  Group,
  Pagination,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Spinner,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import React from 'react';
import { getAllNews } from '../features/api/getAllNews';
import { getNews } from '../features/api/getNews';

export const Home = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [isLoading, setLoading] = React.useState(true);
  const [news, setNews] = React.useState([]);

  const sizeY = 'compact';
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isDisabled, setDisabled] = React.useState(false);
  const siblingCount = 1;
  const boundaryCount = 1;
  const totalPages = 10;

  const demoContainerStyles = {
    flexGrow: 2,
    paddingTop: 24,
    paddingBottom: 24,
  };

  const handleChange = React.useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const loadNews = React.useCallback(async (currentPage) => {
    try {
      setLoading(true);
      setDisabled(true);
      const allNews = [];
      const fetchedNews = await getAllNews();
      for (let i = (currentPage - 1) * 10; i < currentPage * 10; i++) {
        const temp = await getNews(fetchedNews[i]);
        allNews.push(temp);
      }
      setNews(allNews);
    } catch (err) {
      console.log('Ошибка', err);
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  }, []);

  React.useEffect(() => {
    loadNews(currentPage);
    setInterval(() => loadNews(currentPage), 60000);
  }, [currentPage, loadNews]);
  return (
    <>
      <Panel id={id}>
        <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
          Новости
        </PanelHeader>
        <Button size="xl" onClick={() => loadNews(currentPage)}>
          Обновить список новостей
        </Button>
        <Group>
          <CardGrid size="l">
            {isLoading ? (
              <Spinner size="large" style={{ margin: '20px 0' }} />
            ) : (
              news.map((el) => (
                <ContentCard
                  key={el.id}
                  onClick={() => routeNavigator.push(`news_info/${el.id}`)}
                  subtitle={`Date: ${el.time ? new Date(el.time * 1000).toLocaleString() : 'X'}`}
                  header={el.title ? el.title : 'Untitled'}
                  caption={`Author: ${el.by ? el.by : 'anonim'} | Rating: ${
                    el.score ? el.score : '0'
                  }`}
                  maxHeight={150}
                />
              ))
            )}
          </CardGrid>
        </Group>
        <AdaptivityProvider sizeY={sizeY}>
          <div style={demoContainerStyles}>
            <Pagination
              currentPage={currentPage}
              siblingCount={siblingCount}
              boundaryCount={boundaryCount}
              totalPages={totalPages}
              onChange={handleChange}
              disabled={isDisabled}
            />
          </div>
        </AdaptivityProvider>
      </Panel>
    </>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
};
