import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import {
  CanonicalMediaPlayer,
  AmpMediaPlayer,
} from '@bbc/psammead-media-player';
import Metadata from './Metadata';
import embedUrl from './helpers/embedUrl';
import getPlaceholderSrc from './helpers/placeholder';
import { getPlaceholderSrcSet } from '../../lib/utilities/srcSet';
import filterForBlockType from '#lib/utilities/blockHandlers';
import useToggle from '../Toggle/useToggle';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';

const MediaPlayerContainer = ({ blocks, placeholder }) => {
  const { id, platform, origin } = useContext(RequestContext);
  const { lang } = useContext(ServiceContext);
  const { enabled } = useToggle('mediaPlayer');
  const isAmp = platform === 'amp';

  if (!enabled || !blocks) {
    return null;
  }

  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');

  if (!aresMediaBlock) {
    return null;
  }

  const imageUrl = pathOr(
    null,
    ['model', 'blocks', 1, 'model', 'blocks', 0, 'model', 'locator'],
    aresMediaBlock,
  );
  const versionId = pathOr(
    null,
    ['model', 'blocks', 0, 'model', 'versions', 0, 'versionId'],
    aresMediaBlock,
  );

  if (!versionId) {
    return null; // this should be the holding image with an error overlay
  }

  const defaultWidth = 512;
  const placeholderSrc = getPlaceholderSrc(imageUrl, defaultWidth);
  const placeholderSrcset = getPlaceholderSrcSet(imageUrl).join(',');

  const embedSource = embedUrl({
    requestUrl: `${id}/${versionId}/${lang}`,
    type: 'articles',
    isAmp,
    origin,
  });

  console.log(placeholderSrcset, 'jjjjjjjj');
  return (
    <GridItemConstrainedMedium>
      <Metadata aresMediaBlock={aresMediaBlock} />
      {isAmp ? (
        <AmpMediaPlayer
          src={embedSource}
          placeholderSrc={placeholderSrc}
          placeholderSrcset={placeholderSrcset}
        />
      ) : (
        <CanonicalMediaPlayer
          src={embedSource}
          placeholder={placeholder}
          placeholderSrc={placeholder ? placeholderSrc : ''}
          placeholderSrcset={placeholderSrcset}
        />
      )}
    </GridItemConstrainedMedium>
  );
};

MediaPlayerContainer.propTypes = mediaPlayerPropTypes;
MediaPlayerContainer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
  placeholder: true,
};

export default MediaPlayerContainer;
