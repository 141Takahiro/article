import React, { useState } from 'react';

function View({ id, initialPosts, onListClick, onEditClick }) {
    const [posts, setPosts] = useState(initialPosts);
    const post = posts.find(post => post.id === id);


    return (
        <div>
            <h1 className="block w-full px-4 py-2 rounded-md text-3xl">{post.title}</h1>
            <p className="
                block w-full 
                px-4 py-2 
                rounded-md text-xl
                whitespace-pre-line
            "
            >
                {post.content}
            </p>

            <div className="mx-4 mt-2">
                {post.tags.length === 0 ? (
                    <p className="text-gray-400">タグはありません。</p>
                ) : (
                    <ul className="flex">
                        {post.tags.map((tag, index) => (
                            <li key={index} className="px-1 text-sm text-gray-400">
                                #{tag}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="w-full flex justify-center mt-8">
            <button className="btn btn-outline m-2" onClick={onListClick}>
                一覧へ戻る
            </button>
            <button className="btn btn-outline m-2" onClick={() => onEditClick(id)}>
                修正画面へ
            </button>
            </div>
        </div>
    );
}

export default View;