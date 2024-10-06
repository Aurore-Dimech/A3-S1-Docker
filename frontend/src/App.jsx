import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [setName, setSetName] = useState('');
  const [setType, setSetType] = useState('');
  const [animals, setAnimals] = useState(null)
  const [editAnimal, setEditAnimal] = useState({ id: null, name: '', type: '' });
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SOME_KEY}/api`)
      const data = await response.json()
      setAnimals(data)
      setLoading(false)
    } catch (error) {
      setError('Error fetching data: ' + error.message)
      setLoading(false)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'setName') {
      setSetName(value);
    } else if (name === 'setType') {
      setSetType(value);
    }
  };

  const handleChange2 = (event) => {
    setAnimalUpdate(event.target.value);
  };

  const submit = () => {
    const state = { setName, setType, animalUpdate };

    fetch(`${import.meta.env.VITE_SOME_KEY}/add-animal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        alert('Animal ajouté post');
        document.location.reload();
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  const deleteAnimal = (id) => {
    if (confirm("Do you want to delete? ")) {
      fetch(`${import.meta.env.VITE_SOME_KEY}/delete-animal/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(() => {
          alert('Animal supprimé');
          document.location.reload();
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });
    }
  }

  return (
    <>
      <h1>Vive la ferme</h1>
      <div className='add-animal'>
        <h2>Ajouter un animal</h2>
        <div className='form'>
          <input name='setName' placeholder='Nom' onChange={handleChange}/>
          <input name='setType' placeholder='Type' onChange={handleChange} />
        </div>
        <button className='my-2 button-add' onClick={submit}>Submit</button>
      </div>

      <div className="animals-container">
        <h2>Liste d'animaux :</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {animals && animals.map((animal) => (
          <div key={animal.id} className="animal-card">
            <div>
              <h3>{animal.name}</h3>
              <p>Type: {animal.type}</p>
            </div>
            <div>
              <button onClick={() => deleteAnimal(animal.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
