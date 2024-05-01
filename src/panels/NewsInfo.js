import {
  Button,
  ButtonGroup,
  Div,
  Group,
  Header,
  Link,
  List,
  Panel,
  PanelHeader,
  Spinner,
  Title,
  View,
} from '@vkontakte/vkui';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import React from 'react';
import { getNews, getComment } from '../features/api/index';
import Comment from '../widgets/Comment';

export const NewsInfo = () => {
  const { id } = useParams();

  const routeNavigator = useRouteNavigator();
  const [isLoading, setLoading] = React.useState(true);
  const [isCommentsLoading, setCommentsLoading] = React.useState(false);
  const [news, setNews] = React.useState([]);
  const [comments, setComments] = React.useState([]);

  const loadNews = async () => {
    try {
      const newsInfo = await getNews(id);
      const commentsInfo = [];
      if (newsInfo.kids?.length >= 1) {
        for (let i = 0; i < newsInfo.kids.length; i++) {
          const commentsTemp = await getNews(newsInfo.kids[i]);
          commentsInfo.push(commentsTemp);
        }
      }
      console.log(commentsInfo);
      console.log(newsInfo);
      setNews(newsInfo);
      setComments(commentsInfo);
    } catch (err) {
      console.log('Ошибка', err);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      setCommentsLoading(true);
      const commentsInfo = [];
      if (news.kids?.length >= 1) {
        for (let i = 0; i < news.kids.length; i++) {
          const commentsTemp = await getComment(news.kids[i]);
          commentsInfo.push(commentsTemp);
        }
      }
      setComments(commentsInfo);
    } catch (err) {
      console.log('Ошибка', err);
    } finally {
      setCommentsLoading(false);
    }
  };

  React.useEffect(() => {
    loadNews();
  }, []);

  return (
    <View id={id} activePanel="comments">
      <Panel id="comments">
        <PanelHeader>Комментарии</PanelHeader>
        <Button size="xl" onClick={() => routeNavigator.back()}>
          Назад к списку новостей
        </Button>
        {isLoading ? (
          <Spinner size="large" style={{ marginTop: 20 }} />
        ) : (
          <Group>
            <Div>
              <Title level="1">{news.title}</Title>
              <Header mode="secondary" style={{ marginBottom: 16 }}>
                {`Date: ${new Date(news.time * 1000).toLocaleString()}`} • {`Author: ${news.by}`}
              </Header>
              <ButtonGroup mode="vertical" gap="m" stretched>
                <Link href={news.url} target="_blank">
                  <Button size="m" appearance="accent-invariable">
                    Ссылка на новость
                  </Button>
                </Link>
                <Button size="m" onClick={() => loadComments()}>
                  Обновить комментарии ({news.kids?.length || 0})
                </Button>
              </ButtonGroup>
            </Div>
            {isCommentsLoading ? (
              <Spinner size="large" style={{ marginTop: 20 }} />
            ) : (
              <Group>
                <List>
                  {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} level={0} />
                  ))}
                </List>
              </Group>
            )}
          </Group>
        )}
      </Panel>
    </View>
  );
};

NewsInfo.propTypes = {
  id: PropTypes.string.isRequired,
};
