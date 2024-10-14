/** @jsx jsx */
import { jsx } from '@emotion/react';
import { OptimoBlock } from '#app/models/types/optimo';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import TopStoriesSection from '../PagePromoSections/TopStoriesSection';
import styles from '../ArticlePage.styles';

export const experimentTopStoriesConfig = {
  topStoriesExperiment: {
    variants: {
      control: 50,
      show_at_halfway: 50,
    },
  },
};

export const enableExperimentTopStories = ({
  isAmp,
  service,
  pathname,
}: {
  isAmp: boolean;
  service: string;
  pathname: string;
}) => {
  if (!isAmp || !service || !pathname) return false;
  const urn = pathname.split('/')[3].slice(0, -4); // .slice() to remove '.amp' at the end of pathname
  const newsTestAsset = 'c6v11qzyv8po';
  const newsAsset = 'cz7xywn940ro';
  const sportAsset = 'cpgw0xjmpd3o';
  const experimentAssets = [newsAsset, newsTestAsset, sportAsset];
  const experimentServices = ['news', 'sport'];

  return (
    isAmp &&
    urn &&
    experimentServices.includes(service) &&
    experimentAssets.includes(urn)
  );
};

export const ExperimentTopStories = ({
  topStoriesContent,
}: {
  topStoriesContent: TopStoryItem[];
}) => {
  return (
    <div
      css={styles.experimentTopStoriesSection}
      data-testid="experiment-top-stories"
      data-vars-top-stories-position="experiment"
    >
      <TopStoriesSection content={topStoriesContent} />
    </div>
  );
};

export const insertExperimentTopStories = ({
  blocks,
  topStoriesContent,
}: {
  blocks: OptimoBlock[];
  topStoriesContent: TopStoryItem[];
}) => {
  const insertIndex = Math.floor(blocks.length * 0.5); // halfway index of blocks array
  const experimentTopStoriesBlock = {
    type: 'experimentTopStories',
    model: topStoriesContent,
    id: `experimentTopStories-${insertIndex}`,
  };

  const blocksClone = [...blocks];

  blocksClone.splice(insertIndex, 0, experimentTopStoriesBlock);
  return blocksClone;
};
