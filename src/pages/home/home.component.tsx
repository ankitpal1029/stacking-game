import {useQuery} from '@apollo/client';
import React, {useEffect} from 'react';
import { useHistory} from 'react-router';
import {IS_LOGGED_IN} from '../../hooks/user/isUserLoggedIn';


const Home: React.FC = () => {

    const { loading, data } = useQuery(IS_LOGGED_IN);
    const history = useHistory();
    
    function clickHandler(){
        history.push('/game');
    }




    return (
        <div>

        {loading ? (<p>Loading ...</p>):


            (<div className="center">
                <div className="container">
                     <div className="row">
                        <div className="col s12">
                          <div className="card">
                            <div className="card-image">
                              <span className="card-title">Card Title</span>
                            </div>
                            <div className="card-content">
                                <h3>Your Current HighScore is 
                                    { data && data.me }
                                </h3>
                            </div>

                              <button onClick={clickHandler} className="btn lighten-1 z-depth-0">
                                  Click To Start Playing
                                  </button>
                          </div>
                        </div>
                      </div>
            
                    
                </div>
            </div>)




        }
        </div>
        
    )
}

export default Home;
