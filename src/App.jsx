import { useState } from 'react'
import Post from './pages/Post';
import List from './pages/List';
import View from './pages/View';

function App() {
  const [currentPage, setCurrentPage] = useState('list');
  const [selectedId, setSelectedId] = useState(null);
  const initialPosts = JSON.parse(localStorage.getItem('posts') || '[]');

  const goToList = () => {
    setCurrentPage('list');
  }

  const goToPost = () => {
    setSelectedId(null);
    setCurrentPage('post');
  }

  const goToView = id => {
    setSelectedId(id);
    setCurrentPage('view');
  }

  const goToEdit = id => {
    setSelectedId(id);
    setCurrentPage('post')
  }

  return (
    <div>
      <header className="bg-base-100 shadow-lg px-4 py-8">
        <div className="flex justify-between">
          <h1 className="mt-4 text-5xl font-bold">
            Article
          </h1>
          <div className="flex gap-1 m-4">
            <button className="
              ml-8
              btn btn-ghost
              hover:bg-gray-900
              text-l
              transition-colors duration-200
              "
              onClick={goToList}
            >
              一覧
            </button>
            <button className="
              mr-8
              btn btn-ghost
              hover:bg-gray-900
              text-l
              transition-colors duration-200
              "
              onClick={goToPost}>
              投稿
            </button>
          </div>
        </div>
      </header>

      <main className="bg-gray-900">
        <div className="flex-1 container mx-auto max-w-[21cm] px-4 py-8">
          {currentPage === 'list' && (
            <List
              onPostClick={goToPost}
              onViewClick={goToView}
              onEditClick={goToEdit}
              initialPosts={initialPosts}
            />
          )}
          {currentPage === 'post' && (
            <Post
              onListClick={goToList}
              onViewClick={goToView}
              id={selectedId}
              initialPosts={initialPosts}

            />
          )}
          {currentPage === 'view' && (
            <View
              onPostClick={goToPost}
              onListClick={goToList}
              onViewClick={goToView}
              onEditClick={goToEdit}
              id={selectedId}
              initialPosts={initialPosts}
            />
          )}
        </div>
      </main>

      <footer className="footer bg-base-100 px-4">
        <div className="flex w-full justify-center">
          <p>created by Takahiro Ishii</p>
        </div>
      </footer>
    </div>

  );
}

export default App