import { useEffect, useState } from 'react';

export function useAnchorPositions() {
  let anchorPositions: number[] = [];

  useEffect(() => {
    function calculateAnchorPositions() {
      const anchor = document.querySelectorAll('.anchor');
      let anchorLocation = [];

      if (!anchor) return;

      for (let i = 0; i < anchor.length; i++) {
        anchorLocation.push(anchor[i].getBoundingClientRect().top + window.scrollY);
      }

      anchorPositions = anchorLocation;
    }

    calculateAnchorPositions();

    window.addEventListener('scroll', calculateAnchorPositions);

    return () => {
      window.removeEventListener('scroll', calculateAnchorPositions);
    };
  }, []);

  return anchorPositions;
}
