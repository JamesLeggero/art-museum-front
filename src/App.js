import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import MyCollection from './components/MyCollection';
import Searchbars from './components/Searchbars'
import Navbar from './components/Navbar';
// import Button from 'react-bootstrap/Button'
// import Card from 'react-bootstrap/Card'
// import CardColumns from 'react-bootstrap/CardColumns'
import ComingSoon from './img/imageComingSoon.png'
import ReturnedSearchItems from './components/ReturnedSearchItems'

function App(props) {

  const APIKEY = process.env.REACT_APP_APIKEY

  const [allReturnedObjects, setAllReturnedObjects] = useState({})
  
  const [query, updateQuery] = useState({
    baseURL: 'https://api.harvardartmuseums.org/object?',
    apiKey: `apikey=${APIKEY}`,
    categories: '',
    searchURL: ''
  })
  
  const [myCollection, setMyCollection] = useState([])

  useEffect(() => {
		query.searchURL.length > 0 &&
			(async () => {
				try {
          // console.log(query.searchURL)
          const response = await axios.get(query.searchURL)
          setAllReturnedObjects({ ...allReturnedObjects, ...response.data });
          await updateQuery({ ...query, categories: '', searchURL: '' });
          await console.log(query.searchURL.length)

				} catch (error) {
					console.error(error);
				}
			})();
  }, [query]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await axios.get("https://harvard-art-museum-backend.herokuapp.com/api/");
  //     await setMyCollection(response.data);
  //     await setMyCollection([])
  //   }
  //   fetchData();
  // }, [myCollection]);

  useEffect(() => {
    // myCollection.length > 0 && 

    (async () => {
   
      const response = await axios.get("https://harvard-art-museum-backend.herokuapp.com/api/");
      await setMyCollection(response.data);
      
    })()
    
  }, [myCollection]);

  const handleNext = event => {
    event.preventDefault()
    updateQuery({...query, searchURL: `${allReturnedObjects.info.next}`})
    console.log(query.searchURL)
  }

  const handlePrevious = event =>{
    event.preventDefault()
    updateQuery({...query, searchURL: `${allReturnedObjects.info.prev}`})
    console.log(query.searchURL)

  }
  
  const handleSubmit = event => {
    event.preventDefault();

    const returnedClassificationValue = 'classification=' + document.getElementById('classificationSelect').value + '&'

    const returnedCultureValue = 
      document.getElementById('cultureSelect').value === '' ?
      'culture=any' : 
    'culture=' + document.getElementById('cultureSelect').value;
    
    updateQuery({
      ...query, ...query.categories = returnedClassificationValue + returnedCultureValue
    })
    query.categories.length > 0 ?
		updateQuery({
			...query,
      // searchURL: `${query.baseURL}q=${query.categories}&${query.apiKey}`}) : 
      //without q=
      searchURL: `${query.baseURL}${query.categories}&${query.apiKey}`}) :
    
      updateQuery({
        ...query,
        searchURL: `${query.baseURL}${query.apiKey}`

    });
  
    
  };
  
  const handleChange = event => {
		updateQuery({ ...query, ...{ [event.target.id]: event.target.value } });
  };
  
  // const handlePreviousPage = async event => {
  //   event.preventDefault()
  //   const response = await axios.get()
  // }

  const handleAddToCollection = async (event) => {

    const harvardResponse = await axios.get(`https://api.harvardartmuseums.org/object/${event.target.id}?apikey=${APIKEY}`)
    
    const dbresponse = await axios.post('https://harvard-art-museum-backend.herokuapp.com/api', {
      culture: harvardResponse.data.culture,
      classification: harvardResponse.data.classification,
      description: harvardResponse.data.description,
      title: harvardResponse.data.title,
      img: harvardResponse.data.primaryimageurl,
      personalThoughts: ''
    })
  }

  return (
    <div className="d-flex">

      <div className="mr-5 border">
      <Navbar />
      </div>

      <div className="">

      <Searchbars handleChange={handleChange} handleSubmit={handleSubmit} />

      <ReturnedSearchItems allReturnedObjects={allReturnedObjects} handleAddToCollection={handleAddToCollection} /* handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} */ setAllReturnedObjects={setAllReturnedObjects} handleNext={handleNext}handlePrevious={handlePrevious} ComingSoon={ComingSoon} />

      
      <hr />
      
        <MyCollection myCollection={myCollection} ComingSoon={ComingSoon}/>

    </div>
    
    </div>
  )
}


export default App;
