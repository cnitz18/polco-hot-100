import { FaRegStar, FaStar } from 'react-icons/fa'

const ChartEntry = ({ entry, onSetFavorite, onDeleteFavorite }) => {
  return (
    <div className = "chart-entry">
            <div>
              <span className="rank">#{entry.rank == "1" ? entry.rank + " " : entry.rank}</span>
              <img src={entry.cover}></img> 
            </div>
            <div className="description">
              <span className='title'>{entry.title}</span>
              <span style={{display:'block'}}>{entry.artist}</span>
            </div>
            <div>

              {
                entry.isFavorite ? 
                <FaStar style={{cursor: 'pointer', float:'right', color : 'yellow'}} onClick={() => onDeleteFavorite(entry)}></FaStar> :
                <FaRegStar style={{cursor: 'pointer', float:'right'}} onClick={() => onSetFavorite(entry)}/>
              }
            </div>
    </div>
  )
}

export default ChartEntry;
