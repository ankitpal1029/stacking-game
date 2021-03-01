import React from 'react';
import {Post} from '../../common/interface/post.interface';
import PostsGridItem from './post-grid-item/post-grid-item.component';

interface PostsGridProps{
    posts: Post[]
}
const PostsGrid: React.FC<PostsGridProps> = ({ posts }: PostsGridProps) => {
    return (<div className="posts-grid">
        {posts.map(post => {
            return(
                <div key={post.id}>
                    <PostsGridItem post={post}/>
                </div>
            )
        })}
        </div>)
}

export default PostsGrid;
