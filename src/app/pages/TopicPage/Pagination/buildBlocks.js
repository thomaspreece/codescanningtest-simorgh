/* eslint-disable no-param-reassign */
import pipe from 'ramda/src/pipe';
import findNClosestIndices from '#lib/utilities/findNClosestIndicies';

export const TYPE = {
  ELLIPSIS: 'ELLIPSIS',
  NUMBER: 'NUMBER',
};

export const VISIBILITY = {
  ALL: 'ALL',
  MOBILE_ONLY: 'MOBILE_ONLY',
  TABLET_DOWN: 'TABLET_DOWN',
  TABLET_UP: 'TABLET_UP',
  DESKTOP_ONLY: 'DESKTOP_ONLY',
};

// we're returning an array of page elements to be consumed by the renderer
const createPage = (index, state) => {
  const isActivePage = index + 1 === state.activePage;
  if (isActivePage) {
    state.activePageIndex = index;
  }
  return {
    type: TYPE.NUMBER,
    pageNumber: index + 1,
  };
};

// The first page, last page, and active page should always be visible
const setRequiredVisibility = state => {
  state.result[0].visibility = VISIBILITY.ALL;
  state.result[state.activePageIndex].visibility = VISIBILITY.ALL;
  state.result[state.result.length - 1].visibility = VISIBILITY.ALL;

  return state;
};

// Iteratively radiate out from the active page, setting the visibility of pages
// Pages closer to the active page are visible on more devices
const setDynamicVisibility = state => {
  const iterations = [
    [VISIBILITY.ALL, state.activePageOnEdge ? 1 : 0],
    [VISIBILITY.TABLET_UP, state.activePageOnEdge ? 1 : 2],
    [VISIBILITY.DESKTOP_ONLY, 4],
  ];

  iterations.forEach(([deviceSize, additionalPagesToShow]) =>
    findNClosestIndices({
      n: additionalPagesToShow,
      startingIndex: state.activePageIndex,
      predicate: e => !e.visibility,
      array: state.result,
    }).forEach(index => {
      state.result[index].visibility = deviceSize;
    }),
  );

  return state;
};

// Ensure we do not have an ellipsis replacing a single number
const fillEdges = state => {
  // If page 2 is going to be rendered, it should have the same visibility as page 3
  const secondElement = state.result[1];
  const thirdElement = state.result[2];
  const activePageIsOnRight = state.activePage > 2;
  if (activePageIsOnRight && secondElement.pageNumber === 2) {
    secondElement.visibility = thirdElement.visibility;
  }

  // If page (pagecount - 1) is going to be rendered
  // it should have the same visibility as page (pagecount - 2)
  const secondLastElement = state.result[state.result.length - 2];
  const thirdLastElement = state.result[state.result.length - 3];
  const secondLastPage = state.pageCount - 1;
  const activePageIsOnLeft = state.activePage < secondLastPage;
  if (activePageIsOnLeft && secondLastElement.pageNumber === secondLastPage) {
    secondLastElement.visibility = thirdLastElement.visibility;
  }
  return state;
};

// After setting the visibility of all the pages we want to show, we can remove the others
const pruneInvisible = state => {
  state.result = state.result.filter((page, index) => {
    if (!page.visibility) {
      // if an element is being filtered out, we need to remember we did this
      // this is so we can display an ellipsis in this position
      if (index < state.activePageIndex) {
        state.pagesTruncatedOnLeft = true;
      } else {
        state.pagesTruncatedOnRight = true;
      }
      return false;
    }
    return true;
  });

  return state;
};

// Determine the devices that an ellipsis is displayed on
const getEllipsisVisibility = (side, state) => {
  // If we pruned some pages on this side, we display an ellipsis on all devices
  const wasTruncated =
    side === 'left' ? state.pagesTruncatedOnLeft : state.pagesTruncatedOnRight;
  if (wasTruncated) return VISIBILITY.ALL;

  // Otherwise, the ellipsis visibility is based on the visibility of the page on that edge
  // eg, if page 2 is visible on all devices, there will never be an ellipsis on the left
  // if it is only visible on tablets and up, there will be an ellipsis on mobile
  const edgeVisibility =
    side === 'left'
      ? state.result[1].visibility
      : state.result[state.result.length - 2].visibility;

  if (!edgeVisibility || edgeVisibility === VISIBILITY.ALL) return null;
  if (edgeVisibility === VISIBILITY.TABLET_UP) return VISIBILITY.MOBILE_ONLY;
  if (edgeVisibility === VISIBILITY.DESKTOP_ONLY) return VISIBILITY.TABLET_DOWN;
  return null;
};

// Conditionally adding the ellipsis blocks to our return value
const insertEllipsis = state => {
  const leftEllipsisVisibility = getEllipsisVisibility('left', state);
  const rightEllipsisVisibility = getEllipsisVisibility('right', state);
  if (leftEllipsisVisibility) {
    state.result.splice(1, 0, {
      type: TYPE.ELLIPSIS,
      visibility: leftEllipsisVisibility,
    });
  }

  if (rightEllipsisVisibility) {
    state.result.splice(state.result.length - 1, 0, {
      type: TYPE.ELLIPSIS,
      visibility: rightEllipsisVisibility,
    });
  }

  return state;
};

const addKeys = state => ({
  ...state,
  result: state.result.map((page, i) => ({ ...page, key: i })),
});

export default (activePage, pageCount) => {
  if (pageCount <= 1) return null;
  const initialState = {
    activePage,
    pageCount,
    activePageOnEdge: activePage === 1 || activePage === pageCount,
  };

  initialState.result = Array(pageCount)
    .fill()
    .map((_, i) => createPage(i, initialState));

  return pipe(
    setRequiredVisibility,
    setDynamicVisibility,
    fillEdges,
    pruneInvisible,
    insertEllipsis,
    addKeys,
  )(initialState).result;
};
