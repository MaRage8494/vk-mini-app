import React from 'react';
import { Cell, Footer, Header, List } from '@vkontakte/vkui';
import { getComment } from '../features/api/index';
import PropTypes from 'prop-types';

const Comment = ({ comment, level }) => {
  const [isVisible, setVisible] = React.useState(false);
  const [expandedComments, setExpandedComments] = React.useState([]);

  const loadExpandedComments = async (expandedComments) => {
    try {
      const commentsInfo = [];
      if (expandedComments && expandedComments.length >= 1) {
        for (let i = 0; i < expandedComments.length; i++) {
          const commentsTemp = await getComment(expandedComments[i]);
          if (!commentsTemp.deleted) {
            commentsInfo.push(commentsTemp);
          }
        }
      }
      console.log(comment);
      setExpandedComments(commentsInfo);
    } catch (err) {
      console.log('Ошибка', err);
    } finally {
      setVisible(true);
    }
  };

  const getIndentation = (level) => {
    return `${level * 32}px`;
  };

  return (
    <>
      <Cell
        key={comment.id}
        onClick={() => loadExpandedComments(comment.kids)}
        style={{ paddingLeft: getIndentation(level) }}>
        <Header mode="secondary">
          {`Date: ${new Date(comment.time * 1000).toLocaleString()}`} • {`Comment by ${comment.by}`}
        </Header>
        <div dangerouslySetInnerHTML={{ __html: comment.text }} />
        <Footer style={{ float: 'left' }}>{`${comment.kids?.length || 0} Replies`}</Footer>
      </Cell>
      {isVisible && (
        <List>
          {expandedComments.map((expandedComment) => (
            <Comment
              key={expandedComment.id}
              comment={expandedComment}
              loadExpandedComments={loadExpandedComments}
              level={level + 1}
            />
          ))}
        </List>
      )}
    </>
  );
};

export default Comment;

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
};
