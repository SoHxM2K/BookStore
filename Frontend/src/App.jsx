


import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import BookDetails from './pages/BookDetails';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';

export default function App() {
  

  return (
    <main className="container mx-auto">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/books/create" element={<CreateBook/>} />
        <Route path="/books/details/:id" element={<BookDetails/>} />
        <Route path="/books/edit/:id" element={<EditBook/>} />
        <Route path="/books/delete/:id" element={<DeleteBook/>} />
      </Routes>
    </main>
  )
}


