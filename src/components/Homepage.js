import React, { useEffect, useState } from 'react'
import "../css/Homepage.css"
import Hand from "../assets/hand.png"
import Loading from "../assets/loader.svg"
import Modal from 'react-modal'
import Close from "../assets/close.png"

const Homepage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [item, setItem] = useState('')

    const fetchData = async () => {
        try {
            const url = "https://dev.dashmed.in/sample-data";
            const response = await fetch(url);
            const result = await response.json();
            // console.log(result.data);
            setData(result.data)
        } catch(error){
            console.log(error);
        }
    }  


    const subString = (str) => {
        if (str.length > 35) {
            return (str.substring(0, 35) + "...");
        }
        else {
            return str;
        }
    }

    const handleRefresh = () => {
        window.location.reload();
    }


    useEffect(() => {
        setLoading(true);
        fetchData();
        setTimeout(
            function() {
                setLoading(false);
            }, 5000
        );
    }, [])

    const handleModal = (index) => {
        setItem(data[index]);
        setIsModalOpen(true);
        setTimeout(
            function() {
                setIsModalOpen(false);
            }, 8000
        );
    }

    return (
    <div className='homepage'>
        <div className='header-container'>
            <div className='logo'>MSwasth Tech Assignment</div>
            <div className='hello'>by Saumya Dubey</div>
            <div className='divider'></div>
        </div>
        {
            data.length === 0 ? 
            <div>
                {
                    loading ? 
                        <div className='loading'>
                            <img src={Loading} alt=" " />
                            loadinggg...
                        </div>
                    :
                    <div className='loading'>
                        Please reload the page :)
                        <div onClick={handleRefresh} className="refresh">Refresh</div>
                    </div>
                }
            </div>
            :
            <div>
                <div className='med-tags'>
                    {
                        data.map((item, index) => {
                            return (
                                <div key={index} className='medicine' onClick={() => handleModal(index)}>
                                    <div className='index'>{index + 1}</div>
                                    <div className='med-info'>
                                        <div className='manufactured-by'>
                                            <img src={Hand} alt=" " />
                                            <span>{item.manufacturer}</span>
                                        </div>
                                        <div className='med-name'>{item.medName}</div>
                                        <div className='salt-name'>{subString(item.saltName)}</div>
                                    </div>
                                </div>
                            )
                        })
                        
                    }
                </div>
                <Modal
                    isOpen={isModalOpen}
                    className="modal"   
                    overlayClassName="overlay"   
                    ariaHideApp={false}            
                >
                    <div className='toast'>
                        <span className='item'>
                            <span>{item.medName}</span> clicked
                        </span>
                        <span className='cross'>
                            <img src={Close} alt=" " onClick={() => setIsModalOpen(false)} />
                        </span>
                    </div>
                </Modal>
            </div>
        }
    </div>
  )
}

export default Homepage