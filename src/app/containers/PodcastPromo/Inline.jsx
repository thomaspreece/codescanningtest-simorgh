import React, { useContext } from 'react';
import styled from '@emotion/styled';
import path from 'ramda/src/path';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MAX,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { getPica } from '@bbc/gel-foundations/typography';
import { getSerifMedium } from '@bbc/psammead-styles/font-styles';
import { C_LUNAR } from '@bbc/psammead-styles/colours';
import getPromo from './shared';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import PromoComponent from './components';

import { ServiceContext } from '#contexts/ServiceContext';
import ImageWithPlaceholder from '#containers/ImageWithPlaceholder';
import SkipLinkWrapper from '#components/SkipLinkWrapper';

const GEL_GROUP_1_WIDTH_260PX = '16.25rem';
const GEL_GROUP_1_WIDTH_320PX = '20rem';
const GEL_GROUP_1_WIDTH_360PX = '22.5rem';

const ResponsivePodcastPromoWrapper = styled.div`
  ${({ dir }) => (dir === 'ltr' ? 'float: right;' : 'float: left;')}
  background: ${C_LUNAR};
  margin: ${GEL_SPACING_TRPL} 0;
  height: auto;

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    width: 7.06rem; /* 113px */
    margin: ${GEL_SPACING_TRPL} ${GEL_SPACING_HLF};
  }

  @media (min-width: ${GEL_GROUP_1_WIDTH_260PX}) {
    width: 7.63rem; /* 122px */
    margin: ${GEL_SPACING_TRPL} ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_1_WIDTH_320PX}) {
    width: 9.25rem; /* 148px */
  }

  @media (min-width: ${GEL_GROUP_1_WIDTH_360PX}) {
    width: 10.94rem; /* 175px */
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 17.25rem; /* 276px */
    margin: ${GEL_SPACING_TRPL} ${GEL_SPACING_DBL};
  }
`;

const StyledPromoComponent = styled(PromoComponent)`
  padding: ${GEL_SPACING_DBL} ${GEL_SPACING} ${GEL_SPACING} ${GEL_SPACING};
`;

const StyledImageWrapper = styled(PromoComponent.Card.ImageWrapper)`
  display: inline-block;
  margin: ${GEL_SPACING};

  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    display: none;
  }

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    display: inline-block;
    width: 5.13rem; /* 82px */
  }

  @media (min-width: ${GEL_GROUP_1_WIDTH_260PX}) {
    display: inline-block;
    width: 5.63rem; /* 90px */
  }

  @media (min-width: ${GEL_GROUP_1_WIDTH_320PX}) {
    display: inline-block;
    width: 7.25rem; /* 116px */
  }

  @media (min-width: ${GEL_GROUP_1_WIDTH_360PX}) {
    display: inline-block;
    width: 8.94rem; /* 143px */
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    display: inline-block;
    margin: ${GEL_SPACING};
    width: 15.19rem; /* 243px */
  }
`;

const StyledCardContentWrapper = styled(PromoComponent.Card.Content)`
  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    padding: ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_SPACING} ${GEL_SPACING} ${GEL_SPACING};
  }
`;

const StyledCardDescriptionWrapper = styled(PromoComponent.Card.Description)`
  margin: ${GEL_SPACING} 0;
  overflow-wrap: break-word;
`;

const StyledEpisodeTextWrapper = styled(PromoComponent.Card.EpisodesText)`
  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    margin: 0 ${GEL_SPACING_HLF};
  }

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    margin: 0;
  }

  @media (min-width: ${GEL_GROUP_1_WIDTH_260PX}) {
    margin: 0;
  }

  @media (min-width: ${GEL_GROUP_1_WIDTH_320PX}) {
    margin: 0 ${GEL_SPACING_HLF};
  }

  @media (min-width: ${GEL_GROUP_1_WIDTH_360PX}) {
    margin: 0;
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin: 0 ${GEL_SPACING_HLF};
  }
`;

const StyledCardLink = styled(PromoComponent.Card.Link)`
  ${({ script }) => getPica(script)}
  ${({ service }) => getSerifMedium(service)}
  display: block;
`;

const Promo = () => {
  const { podcastPromo, script, service, dir } = useContext(ServiceContext);

  const {
    podcastPromoTitle,
    podcastBrandTitle,
    description,
    imgSrc,
    alt,
    url,
    label,
    showPromo,
    eventTrackingData,
    sizes,
    srcset,
  } = getPromo(podcastPromo);

  const viewTrackerRef = useViewTracker(eventTrackingData);
  const clickTrackerRef = useClickTrackerHandler(eventTrackingData);

  if (!showPromo) {
    return null;
  }

  const { text, endTextVisuallyHidden } = path(['skipLink'], podcastPromo);

  const terms = {
    '%title%': podcastPromoTitle,
  };

  const skipLink = {
    endTextId: 'end-of-podcasts',
    terms,
    text,
    endTextVisuallyHidden,
  };

  return (
    <ResponsivePodcastPromoWrapper ref={viewTrackerRef} dir={dir}>
      <StyledPromoComponent
        script={script}
        service={service}
        role="region"
        aria-labelledby="podcast-promo"
      >
        <SkipLinkWrapper service={service} {...skipLink}>
          <PromoComponent.Title id="podcast-promo" dir={dir} as="strong">
            {podcastPromoTitle}
          </PromoComponent.Title>
          <PromoComponent.Card inlinePromo>
            <StyledImageWrapper>
              <ImageWithPlaceholder
                src={imgSrc}
                srcset={srcset}
                sizes={sizes}
                alt={alt}
                height={1}
                width={1}
                ratio={100}
                lazyLoad
              />
            </StyledImageWrapper>
            <StyledCardContentWrapper>
              <StyledCardLink
                href={url}
                onClick={clickTrackerRef}
                script={script}
                service={service}
              >
                <span className="podcast-promo--hover podcast-promo--focus podcast-promo--visited">
                  {podcastBrandTitle}
                </span>
              </StyledCardLink>
              <StyledCardDescriptionWrapper>
                {description}
              </StyledCardDescriptionWrapper>
              <StyledEpisodeTextWrapper dir={dir}>
                {label}
              </StyledEpisodeTextWrapper>
            </StyledCardContentWrapper>
          </PromoComponent.Card>
        </SkipLinkWrapper>
      </StyledPromoComponent>
    </ResponsivePodcastPromoWrapper>
  );
};

export default Promo;