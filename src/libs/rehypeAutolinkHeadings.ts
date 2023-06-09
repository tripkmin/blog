import { type Options } from 'rehype-autolink-headings';

export const rehypeAutolinkHeadingsOptions: Partial<Options> = {
  properties: {
    className: ['anchor'],
  },
  behavior: 'wrap',
  // content: {
  //   type: 'element',
  //   tagName: 'a',
  //   properties: {
  //     className: 'round-btn',
  //   },
  //   children: [
  //     {
  //       type: 'text',
  //       value: '#',
  //     },
  //   ],
  // },
};
