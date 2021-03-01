import React from 'react';
import {Post} from '../../../common/interface/post.interface';

const PostsGridItem: React.FC<{ post: Post }>= ({ post }: { post:Post }) => {
    return (
    <div className="posts-grid">
        <p>{post.id}</p>
        <p>{post.title}</p>
        <p>{post.body}</p>

    </div>)
}

export default PostsGridItem;
