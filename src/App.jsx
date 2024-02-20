import { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle, faCircle } from "@fortawesome/free-regular-svg-icons";

function App() {
  const [items, setItems] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const [totalItemCount, setTotalItemCount] = useState(0);

  const handleAddButtonClick = () => {
    const newItem = {
      itemName: inputValue,
      quantity: 1,
      isSelected: false,
    };
    const newItems = [...items, newItem];

    setItems(newItems);
    setInputValue("");
  };

  const handleQuantityIncrease = (index) => {
    const newItems = [...items];
    newItems[index].quantity++;
    setItems(newItems);
    calculateTotal();
  };

  const handleQuantityDecrease = (index) => {
    const newItems = [...items];
    if (newItems[index].quantity > 0) {
      newItems[index].quantity--;
      setItems(newItems);
    }
    calculateTotal();
  };

  const toggleComplete = (index) => {
    const newItems = [...items];
    newItems[index].isSelected = !newItems[index].isSelected;

    setItems(newItems);
  };

  const calculateTotal = () => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    setTotalItemCount(totalItemCount);
  };

  return (
    <div className="container">
      <div
        className="app-background"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <div className="main-container">
          <div className="add-item-box">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="add-item-input"
              placeholder="add an item..."
              type="text"
            />
            <FontAwesomeIcon
            className="addBtn"
              icon={faPlus}
              onClick={() => handleAddButtonClick()}
            />
          </div>
          <div className="item-list">
            {items.map((item, index) => (
              <div className="item-container">
                <div
                  className="item-name"
                  onClick={() => toggleComplete(index)}
                >
                  {item.isSelected ? (
                    <>
                      <FontAwesomeIcon className="cheakbox" icon={faCheckCircle} />
                      <span className="completed">{item.itemName}</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon className="cheakbox" icon={faCircle} />
                      <span>{item.itemName}</span>
                    </>
                  )}
                </div>
                <div className="quantity">

                  <button>
                  <FontAwesomeIcon 
                  className="incDecreBtn"
                   icon={faMinus}
                   onClick={() => handleQuantityDecrease(index)}
                   />
                  </button>
                  <span className="qtn">{item.quantity}</span>

                  <button>
                  <FontAwesomeIcon icon={faPlus}
                  className="incDecreBtn"
                  onClick={() => handleQuantityIncrease(index)} />
                  </button>

                </div>
              </div>
            ))}
          </div>
          <div className="total">Total : {totalItemCount} </div>
        </div>
      </div>
    </div>
  );
}

export default App;
