import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chart from './components/Chart';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const App = () => {
  const [entries,setEntries] = useState([]);
  const [week,setWeek] = useState('');

  useEffect(() => {
    const getEntries = async () => {
      const chart = await fetch('http://localhost:5000/hot100');
      const chartData = await chart.json();
      const favs = await fetch('http://localhost:5000/favorites');
      const favData = await favs.json();
      if( chartData){
        if( chartData.songs && chartData.songs.length){
          let songs = chartData.songs;
          for( let i = 0; i < favData.length; i++ ){
            let fav = favData[i];
            let foundEntry = songs.findIndex((ent) => {
              return ent.rank===fav.rank && ent.title===fav.title && ent.cover===fav.cover
            });
            if( foundEntry !== -1 ){
              songs[foundEntry].isFavorite = true;
              songs[foundEntry].id = fav._id;
            }
          }
          setEntries(songs);
        }
        setWeek(chartData.week)
      }
    };
    getEntries();
  },[]);

  const setFavorite = async ( fav ) => {
    // console.log('ADDING FAVORITE:')
    // console.log(fav);
    let bodyObj = { ...fav, isFavorite : true };
    const res = await fetch('http://localhost:5000/favorites/add',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(bodyObj)
    });
    const resObject = await res.json();
    setEntries(entries.map((ent) => {
      if( ent.rank===fav.rank && ent.title===fav.title && ent.cover===fav.cover )
        return { ...ent, isFavorite : true, id : resObject.id }
      return ent;
    }));
  }

  const deleteFavorite = async ( fav ) => {
    let recordIndex = entries.findIndex((ent) => ent.rank===fav.rank && ent.title===fav.title && ent.cover===fav.cover)
    let record = entries[recordIndex]
    await fetch(`http://localhost:5000/favorites/${record.id}`,{ method:'DELETE' })
    setEntries(entries.map((ent) => {
      if( ent.id === record.id )
        return { ...ent, id : null, isFavorite : false };
      return ent;
    }))
  }

  return ( 
      <div className="container">
        <Tabs defaultActiveKey="home" className='mb-3' id='tabs'>
          <Tab eventKey="home" title="Home">
            <>
              { entries && entries.length > 0 ? <Chart entries={entries} week={week} onlyFavorites={false} onSetFavorite={setFavorite} onDeleteFavorite={deleteFavorite} /> : `No Chart to show` }
            </>
          </Tab>
          <Tab eventKey="favorites" title="Favorites">
            <>
            { entries && entries.length > 0 ?  <Chart entries={entries.filter(ent => ent.isFavorite === true)} onlyFavorites={true} onSetFavorite={setFavorite} onDeleteFavorite={deleteFavorite} /> : 'No favorites selected'}
            </>
          </Tab>
        </Tabs>
        <footer>
          <p>  Casey Nitz &copy; 2022</p>
        </footer>
      </div>
  );
}

export default App;
