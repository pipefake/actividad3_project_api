import { useEffect, useState } from "react";

export const FuturamaCharactersGalleryFetch = () => {

    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');


    const fetchData = async () => {
        try {
            const response = await fetch('https://api.sampleapis.com/futurama/characters');

            // Convertimos la respuesta a JSON
            const data = await response.json();

            // Setear la variable de estado de las cervezas a través de su método setcharacters con los datos recibidos de la API
            setCharacters(data);
        } catch (error) {
            console.log('Error al realizar la solicitud', error);
            setError('Error al realizar la solicitud');
        }
    };

    // useEffect ejecuta el método fetchData la primera vez que se monta el componente, hace la petición a la API.
    useEffect(() => {
        fetchData();
    }, []);

    // Si hay error, que muestre el mensaje
    if (error) {
        return(
            <div className="alert alert-danger text-center" role='alert'>
                {error}
            </div>
        );
    }
    const filteredFuturamaCharacters = characters.filter(characters =>
        characters.name.first.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h2 className="text-center text-white mb-4">Personajes de futurama</h2>
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por nombre de personaje:"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <div className="row overflow-auto vh-80" style={{ maxHeight: '80vh', overflowY: 'scroll' }}>
                {filteredFuturamaCharacters.map((characters, index) => (
                    <div className="col-md-4 mb-4"  key={characters.id}>
                        <div className="card">
                            <div className="card-characters">
                                <img src={characters.images.main} className="card-img-top object-fit-cover image" alt={characters.name} />
                            </div>
                            <div className="card-body">
                                <h5 class="display-1">{characters.name.first}</h5>
                                <div>
                                    <p className="card-text">gender: {characters.gender} |</p>
                                    <p className="card-text">{characters.age} años</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}