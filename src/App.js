import { useState, useEffect } from 'react';
import Aside from './components/Aside';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import styled from 'styled-components';
import './App.css';

const Atag = styled.a`
  color:Black;
  font-size: 100px;
  font-family: East Sea Dokdo;
`
const Btag = styled.b`
  color:#black;
  font-size: 50px;
  font-family: East Sea Dokdo;

`
// const Ctag = styled.c`
//   color:black;
//   font-size: 75px;
//   font-family: East Sea Dokdo;

// `

function App() {
  const [reviewsState, setReviewsState] = useState({ reviews: [] });
  useEffect(()=>{
    getReviews()
  },[])
  
  function handleAdd(event, formInputs) {
    event.preventDefault()
    fetch('https://couch-critic-api.herokuapp.com/entertainments', {
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
    fetch('https://couch-critic-api.herokuapp.com/entertainments')
    .then(res => res.json())
    .then(data => setReviewsState({reviews: data}))
    .catch(error => console.error(error));
  }
  
  function handleDelete(deletedReview) {
    // might be https://couch-critic-api.herokuapp.com/entertainments
    fetch(`https://couch-critic-api.herokuapp.com/entertainments/${deletedReview.id}`, {
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
      fetch(`https://couch-critic-api.herokuapp.com/entertainments/${formInputs.id}`,{
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
      <div>
        
        <Atag>
        <Header />
        </Atag>

        <Atag>
        <Aside handleSubmit={handleAdd} />
        </Atag>

        <div>
         <Main reviews={reviewsState.reviews} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
        </div>

        <Btag>
        <Footer />
        </Btag>

      </div>
    </div>
  );
}

export default App;
