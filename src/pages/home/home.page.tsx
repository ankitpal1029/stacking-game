import React from 'react';
import {Post} from '../../common/interface/post.interface';
import PostsGrid from '../../components/posts-grid/posts-grid.component';

const Home: React.FC = () => {
    const posts: Post[] = [
        {
            id:'1',
            title: 'Post 1',
            body: 'body 1'
        },

        {
            id:'2',
            title: 'Post 2',
            body: 'body 2'
        }
    ]
    return (
        <div className="home">
            <PostsGrid posts={posts}/>

        </div>
    )
}

export default Home;
