import { View, SplitLayout, SplitCol } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { NewsInfo, Home } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
// import NewsFeed from './pages/feed/NewsFeed';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" />
          <NewsInfo id="news_info" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
