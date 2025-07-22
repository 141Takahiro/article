import React from 'react';

export default function TagModal({ onAdd, onClose, onTagInput, tagInput, tags, setTags }) {


    const removeTag = (tagToRemove) =>
        setTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));

    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-gray-400/50 flex items-center justify-center">
                <div className="relative z-10 bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-xl">
                    <label className="text-l">タグを修正</label>
                    <div className="flex justify-center mt-4 my-2">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={e => onTagInput(e.target.value)}
                            className="block w-full px-4 bg-white border border-gray-300 rounded-md text-black"
                            placeholder="タグを入力"
                        />
                        <button
                            className="
                                mx-2
                                btn btn-ghost
                                hover:bg-gray-900
                                text-l
                                transition-colors duration-200"
                            type="button" onClick={onAdd}>
                            追加
                        </button>
                    </div>
                    <div className="mt-2">
                        {tags.length === 0 ? (
                            <p>登録されているタグはありません</p>
                        ) : (

                            <ul className="flex gap-2">
                                <p>登録済み：</p>
                                {tags.map((tag, id) => (
                                    <li key={id}>
                                        #{tag}
                                        <button onClick={() => removeTag(tag)} className="hover:cursor-pointer">
                                            ×
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}

                    </div>
                    <div className="flex justify-end mt-2">
                        <button className="btn btn-outline m-2" type="button" onClick={onClose}>
                            登録
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}