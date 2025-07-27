import React, { useState } from 'react';

function List({ onViewClick, onEditClick, initialPosts }) {

    const [posts, setPosts] = useState(initialPosts);

    const handleDelete = id => {
        if (!window.confirm('本当に削除しますか？')) return;
        const newPosts = posts.filter(post => post.id !== id);
        setPosts(newPosts);
        localStorage.setItem('posts', JSON.stringify(newPosts));
    };

    return (
        <div>
            <h1 className="text-3xl mt-2 mb-4">投稿一覧</h1>

            {posts.length === 0 ? (
                <p>まだ投稿はありません。</p>
            ) : (
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <div className="flex">
                                <div className="w-full mt-2 flex justify-between">
                                    <p
                                        className="text-2xl m-2 cursor-pointer transition-colors duration-200 hover:text-blue-600"
                                        onClick={() => onViewClick(post.id)}
                                    >
                                        ・ {post.title}
                                    </p>
                                    <div className="flex">
                                        <button className="btn btn-outline m-1" onClick={() => onEditClick(post.id)}>修正</button>
                                        <button className="btn btn-outline m-1" onClick={() => handleDelete(post.id)}>削除</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default List;