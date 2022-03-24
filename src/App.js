
import { useEffect, useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import randomColor from 'randomcolor';
import Draggable from 'react-draggable';

const App = () => {

    const [todo, setTodo] = useState('')
    const [items, setItems] = useState(
        JSON.parse(localStorage.getItem('items')) || []
    )

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items))
    }, [items])


    const onChangeInput = (e) => {
        setTodo(e.target.value)
    }

    const addNewItem = () => {

        const newItem = {
            id: uuidv4(),
            message: todo,
            color: randomColor({
                luminosity: 'light',
                hue: 'blue'
            }),
            defaultPos:
            {
                x: 1000,
                y: -800
            },

        }

        setItems([...items, newItem])
        setTodo('')

    }

    const deleteTodo = (id) => {
        setItems([...items].filter((item) => {
            return item.id !== id
        }))
    }



    return (
        <div className="App">
            <div>
                <div className="wrapper">
                    <input
                        value={todo}
                        type="text"
                        placeholder='Enter something...'
                        className='input-add'
                        onChange={onChangeInput}

                    />
                    <button onClick={addNewItem} className="button-add">
                        ENTER
                    </button>
                </div>

            </div>
            {
                items.map((item, idx) => {
                    return (
                        <Draggable
                            key={idx}
                            defaultPosition={item.defaultPos}

                        >
                            <div className='todo-item' style={{ backgroundColor: item.color }} >
                                <span> {item.message}  </span>
                                <button className='delete-btn' onClick={() => deleteTodo(item.id)}>
                                    X
                                </button>
                            </div>

                        </Draggable>
                    )
                })
            }
        </div>
    )
}


export default App