import { getInlineLinkStyles } from '#app/components/InlineLink/index.styles';
import { css, Theme } from '@emotion/react';

export default {
  outerContainer: ({ palette, fontVariants }: Theme) =>
    css({
      a: {
        ...getInlineLinkStyles(palette),
        ...fontVariants.sansBold,
      },
    }),
  messageContainer: () =>
    css({
      display: 'flex',
      flexWrap: 'wrap',
    }),
  messageTextContainer: () =>
    css({
      display: 'flex',
      alignItems: 'center',
    }),
  tickIcon: ({ spacings, mq, palette }: Theme) =>
    css({
      marginRight: `${spacings.FULL}rem`,
      fill: palette.SUCCESS_CORE,
      [mq.HIGH_CONTRAST]: {
        path: {
          fill: 'currentColor',
        },
      },
    }),
  descriptionContainer: ({ spacings }: Theme) =>
    css({
      '& > p, & > div': {
        marginTop: `${spacings.DOUBLE}rem`,
      },
    }),
};