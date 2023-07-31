import React, { useState, useEffect } from 'react'
import '../styles/App.css';
import { Loader } from './Loader';
import { PhotoFrame } from './PhotoFrame';

const App = () => {
    const [id, setId] = useState('');
    const [photoData, setPhotoData] = useState(null);
    const [loader, setLoader] = useState(false);

    const handleInputChange = (e) => {
        setId(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            if(id !== ''){
                setLoader(true);
                try {
                    const response = await fetch('https://jsonplaceholder.typicode.com/photos/${id}');
                    const data = await response.json();
                    setPhotoData(data);
                    setLoader(false);
                }
                catch (error) {
                    console.log('Error: ' + error);
                    setLoader(false);
                    setPhotoData(null);
                }
            }
            else{
                setPhotoData(null);
            }
        }

        fetchData();
    }, [id]);

    return (
        <div>
            <input 
                type="number"
                value={id}
                onChange={handleInputChange}
            />
            {loader ? <Loader /> : null}
            {photoData && <PhotoFrame url={photoData.url} title={photoData.title} />}
        </div>
    )
}


export default App;
