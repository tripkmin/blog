import dayjs from 'dayjs';
import { allPosts, Post } from 'contentlayer/generated';
import ListLayout from '@/components/layouts/ListLayout';

export default function Post() {
  const getPosts = () => {
    const filteredPosts = allPosts.filter(post => !post.draft);
    const sortedPost = [...filteredPosts].sort((a, b) => dayjs(b.date).diff(a.date));
    return sortedPost;
  };

  const posts = getPosts();

  return (
    <>
      <ListLayout posts={posts}></ListLayout>
    </>
  );
}
