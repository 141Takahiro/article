import React, { useEffect, useState } from 'react';
import TagModal from '../components/TagModal';

function Post({ onListClick, id, initialPosts }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);
    const [posts, setPosts] = useState(initialPosts);
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');

    const validation = (value, requiredMessage) => {
        const errorMessage = value.trim() ? '' : requiredMessage;
        return {
            isValid: !errorMessage,
            error: errorMessage,
        };
    };

    const handleSavePost = () => {
        const titleVal = validation(title, 'タイトルを入力してください');
        const contentVal = validation(content, '本文を入力してください');

        setTitleError(titleVal.error);
        setContentError(contentVal.error);

        if (titleVal.error || contentVal.error) {
            return;
        }

        const postId = id ?? Date.now();
        const newPost = { id: postId, title, content, tags };
        const exists = posts.some(post => post.id === postId);

        const nextPosts = exists
            ? posts.map(post => (post.id === postId ? newPost : post))
            : [...posts, newPost];

        setPosts(nextPosts);
        localStorage.setItem('posts', JSON.stringify(nextPosts));
        onListClick();
    }

    const handleAddTag = () => {
        const newTag = tagInput.trim();
        if (!newTag) return;
        if (tags.includes(newTag)) return;
        setTags([...tags, newTag]);
        setTagInput('');
    }

    const post = posts.find(post => post.id === id) || null;
    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
            setTags(post.tags);
        } else {
            setTitle('');
            setContent('');
            setTags([]);
        }
    }, [id, post]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            {isModalOpen && (
                <TagModal
                    onAdd={handleAddTag}
                    onClose={() => setIsModalOpen(false)}
                    tagInput={tagInput}
                    onTagInput={setTagInput}
                    setTags={setTags}
                    tags={tags}
                />
            )}

            <div>
                {titleError && (
                    <p style={{ color: 'red' }}>{titleError}</p>
                )}
                {contentError && (
                    <p style={{ color: 'red' }}>{contentError}</p>
                )}
                <label>タイトル</label>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-black"
                    placeholder="タイトルを入力してください"
                />
            </div>

            <div>
                <label>本文</label>
                <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-black h-[12cm]"
                    placeholder="本文を入力してください"
                />
            </div>

            <div>
                {tags.length === 0 ? (
                    <p className="text-gray-400">登録されているタグはありません</p>
                ) : (
                    <ul className="flex">
                        <p>登録済み：</p>
                        {tags.map((tag, id) => (
                            <li key={id} className="px-1 text-sm text-gray-400">
                                #{tag}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="flex justify-between mt-2">
                <button className="btn btn-outline m-2" type="button" onClick={() => setIsModalOpen(true)}>
                    タグを登録
                </button>
                <button className="btn btn-outline m-2" onClick={handleSavePost}>
                    確定する
                </button>
            </div>
        </div>
    );
}

export default Post;