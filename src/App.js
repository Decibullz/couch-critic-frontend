import { useState, useEffect } from 'react';
import Aside from './components/Aside';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import Nav from './components/Nav';
import './App.css';

function App() {
  const [reviewsState, setReviewsState] = useState({ reviews: [] });
  useEffect(()=>{
    getReviews()
  },[])
  
  function handleAdd(event, formInputs) {
    event.preventDefault()
    fetch('/entertainments', {
      body: JSON.stringify(formInputs),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdReview => createdReview.json())
    .then(jsonedReview => { setReviewsState(prevState => 
      ({ reviews: [jsonedReview, ...prevState.reviews] }))
    })
    .catch(error => console.log(error))
  }
  
  function getReviews() {
    fetch('/entertainments')
    .then(res => res.json())
    .then(data => setReviewsState({reviews: data}))
    .catch(error => console.error(error));
  }
  
  function handleDelete(deletedReview) {
    // might be /entertainments
    fetch(`/entertainments/${deletedReview.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      getReviews();
    })
    .catch(error => console.log(error));
  }
  
  
  function handleUpdate(event, formInputs){
    event.preventDefault()
      fetch(`/entertainments/${formInputs.id}`,{
        method:'PUT',
        body: JSON.stringify(formInputs),
        headers:{
          'Content-Type':'Application/json'
        }
      })
      .then(()=>{
        getReviews()
      })
      .catch(err=>console.log(err))
  }

  return (
    <div className="App">
      <div className='container'>
        <Header />
        <Aside handleSubmit={handleAdd} />
        <Main reviews={reviewsState.reviews} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
        <Nav />
        <Footer />
      </div>
    </div>
  );
}

export default App;
