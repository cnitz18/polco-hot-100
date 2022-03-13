import ChartEntry from './ChartEntry';

const Chart = ({ entries, onSetFavorite, onDeleteFavorite, onlyFavorites, week }) => {
    let weekString="";
    let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    if( week ){
        let d = new Date(week);
        weekString = d.toLocaleDateString(undefined,dateOptions);
    }
    return (
        <div>
            <div style={{ textAlign:'center' }}>

                <h1>{onlyFavorites ?'My Favorites' :  `Billboard Hot 100`}</h1>
                {!onlyFavorites && <h6>Week of {weekString}</h6>}
            </div>
            <p style={{textAlign:'center'}}>{entries.length == 0 && "No entries to display" }</p>
            {entries.map((ent) => (
                <ChartEntry key={ent.rank} entry={ent} onSetFavorite={onSetFavorite} onDeleteFavorite={onDeleteFavorite} />
            ))}
        </div>
    );
}

export default Chart;
